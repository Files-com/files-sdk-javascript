/* eslint-disable max-classes-per-file */
import * as errors from './Errors'

// The owners shared by uploads (see Upload.js) and downloads (see isomorphic/File.node.js): the concurrency controller
// that measures each transfer's network attempts and chooses how many may run at once; the hard request, byte and file
// budgets that bound them whatever the controller chooses; progress accounting; and the two public objects a caller
// gives transfers, TransferControl, which pauses and resumes them, and TransferJob, a scope in which compatible
// transfers share what their controller learns and one set of budgets.

const MIB = 1024 * 1024

// The clock every measurement uses: a monotonic one, performance.now(), so that a change of the wall clock never
// changes a measured duration or rate; and the timers that wake waits, which a test can replace with its own.
const systemClock = {
  clear: timer => clearTimeout(timer),
  now: () => (typeof globalThis.performance?.now === 'function' ? globalThis.performance.now() : Date.now()),
  schedule: (callback, ms) => setTimeout(callback, ms),
}

// The JavaScript SDK's concurrency policies, by direction. maximum is the default cap on requests at once, start the
// effective policy start: where an Aggressive upload, a promoted Default upload to S3, every upload to a remote server
// integration or Files Agent and every download begin their ordinary policy. minimum is the lowest target that policy
// shrinks to. An upload to S3 with Default startup warms from one request instead (warm), and a judged window
// delivering fastLinkBytesPerSecond promotes it to start at once; the warm start is S3's alone (see createController()).
// Every window closes once at least windowAttempts attempts, and as many as the target, have been accepted.
const POLICIES = Object.freeze({
  download: Object.freeze({
    fastLinkBytesPerSecond: 96 * MIB,
    maximum: 32,
    minimum: 2,
    start: 8,
    warm: false,
    windowAttempts: 8,
  }),
  upload: Object.freeze({
    fastLinkBytesPerSecond: 96 * MIB,
    maximum: 32,
    minimum: 4,
    start: 32,
    warm: true,
    windowAttempts: 8,
  }),
})

// The ordinary policy's rules, the same for every startup choice. A probe adds GROWTH_STEP requests and is kept on a
// judged window that gains PROBE_GAIN over the level it came from, or withdrawn after two that do not. A transient
// failure shrinks the target by FAILURE_SHRINK and a throttle by THROTTLE_SHRINK, once for the epoch the failed attempt
// began in. A window whose estimated queue exceeds LATENCY_QUEUE_RATIO of the target while its throughput falls below
// its level's shrinks it by LATENCY_SHRINK, and one beyond GROWTH_QUEUE_RATIO of it earns no growth. A window is judged
// only when its attempts filled the target for UTILIZATION of its time.
const GROWTH_STEP = 4
const PROBE_GAIN = 0.01
const PROBE_MISSES = 2
const FAILURE_SHRINK = 0.35
const THROTTLE_SHRINK = 0.1
const LATENCY_SHRINK = 0.08
const LATENCY_QUEUE_RATIO = 1
const GROWTH_QUEUE_RATIO = 0.64
const UTILIZATION = 0.75
const WARM_REST_WINDOWS = 2
const LEVEL_WINDOWS = 8
const MAX_DECISIONS = 64

// The highest concurrency any cap may ask for.
const MAX_CONCURRENCY = 1024

// The hard budgets of transfers made without a job: each direction's requests at once, across the process, and the
// bytes of upload parts held at once. A job brings budgets of its own instead.
const DEFAULT_REQUESTS = 32
const DEFAULT_BUFFER_BYTES = 256 * MIB

// How often a transfer reports its progress, at most, besides its start, pauses and end.
const PROGRESS_INTERVAL_MS = 100

const STARTUPS = ['default', 'aggressive']

// What a wait cancelled by signal rejects with: its reason, unchanged, whatever it is; or, when the runtime gives the
// signal none, an Error named AbortError.
const abortReason = signal => {
  if (signal.reason !== undefined) {
    return signal.reason
  }

  const error = new Error('The operation was aborted')
  error.name = 'AbortError'
  return error
}

// A count a caller gives, such as maxConcurrency: undefined or null for none, otherwise a whole number from 1 to limit.
const countOption = (name, value, limit = Number.MAX_SAFE_INTEGER) => {
  if (value === undefined || value === null) {
    return undefined
  }

  if (!Number.isSafeInteger(value) || value < 1 || value > limit) {
    throw new errors.InvalidParameterError(`Bad parameter: ${name} must be a whole number from 1 to ${limit}`)
  }

  return value
}

// An upload's startup choice: 'default' when none is given. Any other value is refused rather than taken for Default.
const startupOption = startup => {
  if (startup === undefined || startup === null) {
    return 'default'
  }

  if (!STARTUPS.includes(startup)) {
    throw new errors.InvalidParameterError('Bad parameter: startup must be \'default\' or \'aggressive\'')
  }

  return startup
}

// A transfer's concurrency options, checked as a whole before anything is sent, whether or not the transfer turns out
// to run in parallel: concurrency, a fixed count, and maxConcurrency, a cap, each a whole number from 1 to
// MAX_CONCURRENCY, and startup, which cannot be chosen with a fixed concurrency. A fixed concurrency above the cap is
// not a conflict: it runs at the cap (see createController()). Resolves them as { fixed, maximum, startup }.
const concurrencyOptions = ({ concurrency, maxConcurrency, startup }) => {
  const fixed = countOption('concurrency', concurrency, MAX_CONCURRENCY) ?? null
  const maximum = countOption('maxConcurrency', maxConcurrency, MAX_CONCURRENCY)
  const chosenStartup = startupOption(startup)

  if (fixed !== null && startup !== undefined && startup !== null) {
    throw new errors.InvalidParameterError('Bad parameter: startup cannot be chosen with a fixed concurrency')
  }

  return { fixed, maximum, startup: chosenStartup }
}

// The longest wait a timer can be set for, in Node.js and browsers alike. A transfer never shortens a longer wait,
// such as a Retry-After of weeks: it fails instead (see Upload.js and isomorphic/File.node.js).
const MAX_TIMER_MS = 2147483647

// Waits in its turn, first come first served: resolves once pump() grants the entry, or rejects with signal's reason
// when it aborts first, leaving the queue as though it had never waited, or with the error pump() refuses it with,
// having taken it from the queue.
const waitInTurn = (waiting, signal, pump, fields = {}) => new Promise((resolve, reject) => {
  if (signal?.aborted) {
    reject(abortReason(signal))
    return
  }

  const entry = { ...fields }

  const onAbort = () => {
    const index = waiting.indexOf(entry)

    if (index !== -1) {
      waiting.splice(index, 1)
      reject(abortReason(signal))
      pump()
    }
  }

  entry.grant = () => {
    signal?.removeEventListener('abort', onAbort)
    resolve()
  }

  entry.refuse = error => {
    signal?.removeEventListener('abort', onAbort)
    reject(error)
  }

  signal?.addEventListener('abort', onAbort, { once: true })
  waiting.push(entry)
  pump()
})

// A hard limit of limit holders at once, granted in the order they ask. Infinity for none.
const requestLimiter = limit => {
  let active = 0
  const waiting = []

  const pump = () => {
    while (waiting.length > 0 && active < limit) {
      active += 1
      waiting.shift().grant()
    }
  }

  return {
    acquire: signal => waitInTurn(waiting, signal, pump),
    get active() { return active },
    limit,
    release: () => {
      active -= 1
      pump()
    },

    // Takes a place at once, if one is free and nobody waits for one, without waiting: whether it did.
    tryAcquire: () => {
      if (waiting.length > 0 || active >= limit) {
        return false
      }

      active += 1
      return true
    },
  }
}

// A signal that aborts as soon as any of signals does, with its reason.
const linkedSignal = signals => {
  const given = signals.filter(Boolean)

  if (typeof AbortSignal.any === 'function') {
    return AbortSignal.any(given)
  }

  const controller = new AbortController()
  const aborted = given.find(signal => signal.aborted)

  if (aborted) {
    controller.abort(aborted.reason)
  } else {
    given.forEach(signal => signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true }))
  }

  return controller.signal
}

// Waits ms, or rejects with signal's reason as soon as it aborts.
const delay = (ms, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) {
    reject(abortReason(signal))
    return
  }

  let timer = null

  const onAbort = () => {
    clearTimeout(timer)
    reject(abortReason(signal))
  }

  timer = setTimeout(() => {
    signal?.removeEventListener('abort', onAbort)
    resolve()
  }, ms)

  signal?.addEventListener('abort', onAbort, { once: true })
})

// A budget of limit bytes held at once, each request admitted before the bytes it is for are allocated, by owner, an
// upload, or else by a request of its own. It is one ceiling for everything its owners hold.
//
// acquire(bytes, signal, own, owner) waits in turn: it is granted, in the order asked, once the bytes fit within the
// limit; a request for nothing at once; and, out of turn, a request of an owner that holds own bytes, when it fits. own
// counts the bytes the owner holds that it alone can give back, and only by going on, such as its copy of data in memory
// or the rest of a stream's chunk copied as it was taken (see Upload.js). What must be allocated at once or not at all
// never waits: admitWithin(bytes, owner) admits bytes only within the limit, or, when they are more than the whole
// budget, only while nothing else is held, so that they are held alone; and admitNow(bytes, owner, own), for the rest of
// a stream's chunk, which must be copied as it is taken, whatever its size, admits them within the limit, or else
// beyond it only while nothing is held but owner's own bytes, own of them, so that owner then holds the budget alone.
// Either admits nothing otherwise, and its caller refuses what it was for.
//
// Beyond its limit, the budget holds the allocations of only one owner at a time, the one that took it there, and is
// open only to that owner until it is back within its limit. An owner that might need to go beyond it, such as a reader
// about to take a stream's chunk whose size it cannot know beforehand, waits with whenOpen(owner, own, signal), holding
// own bytes meanwhile, until the budget is open to it. A request that does not fit is never granted beyond the limit but
// when every byte held belongs to owners waiting for the budget, so that nothing held could be given back otherwise, and
// then only: the request of the owner already beyond the limit, if it waits; or else one that could never fit within
// the limit, its owner's own bytes and it together more than the whole budget, once nothing but those own bytes is
// held, as a request larger than the whole budget is once nothing is held. Any other request waits for room. When
// neither is so, and none of the owners waiting could ever go on, each waiting for bytes another holds, the budget
// refuses, rather than go beyond its limit, the request of the last of them to ask that holds bytes of its own, with a
// FilesError, before anything is allocated for it, so that its upload fails and gives those bytes back. So no owner
// waits forever for bytes others hold while they wait for it, and the budget holds at most its limit, beyond which
// only one owner's allocations, and only as those exceptions allow.
const byteBudget = limit => {
  let held = 0
  let beyond = null
  const waiting = []
  const parked = []

  const fits = bytes => bytes === 0 || held + bytes <= limit
  const isOpen = owner => beyond === null || beyond === owner

  const take = (bytes, owner) => {
    held += bytes

    if (held > limit && beyond === null) {
      beyond = owner
    }
  }

  // The bytes held by owners waiting, which none of them gives back until it has been admitted.
  const blocked = () => [...waiting, ...parked].reduce((total, entry) => total + entry.own, 0)

  const grant = index => {
    const [entry] = waiting.splice(index, 1)
    take(entry.bytes, entry.owner)
    entry.grant()
  }

  // Refuses the request of the last owner waiting that holds bytes of its own, if any.
  const refuseLast = () => {
    let index = waiting.length - 1

    while (index >= 0 && waiting[index].own === 0) {
      index -= 1
    }

    if (index !== -1) {
      const [entry] = waiting.splice(index, 1)

      entry.refuse(new errors.FilesError(`The buffer budget of ${limit} bytes (maxBufferBytes) cannot admit the ${entry.bytes} bytes an upload needs beside the ${entry.own} it holds: the rest is held by uploads waiting for room as well, none of which could go on without going beyond it. Upload it again once room is free, or give the budget more room`))
    }
  }

  const pump = () => {
    while (waiting.length > 0 && fits(waiting[0].bytes)) {
      grant(0)
    }

    // Out of turn: a request for nothing, and one whose owner holds bytes of its own, when it fits.
    let index = 1

    while (index < waiting.length) {
      const entry = waiting[index]

      if ((entry.own > 0 || entry.bytes === 0) && fits(entry.bytes)) {
        grant(index)
      } else {
        index += 1
      }
    }

    // When nothing held can be given back but by an owner waiting for the budget: beyond the limit, only the owner
    // already beyond it, or a request that could never fit within it, alone; otherwise a refusal. Owners parked while
    // another is beyond the limit are opened below, once it no longer is, and go on.
    if (waiting.length > 0 && held <= blocked()) {
      if (beyond !== null) {
        const beyondOwner = waiting.findIndex(entry => entry.owner === beyond)

        if (beyondOwner !== -1) {
          grant(beyondOwner)
        }
      } else if (parked.length === 0) {
        const neverFits = waiting.findIndex(entry => entry.own + entry.bytes > limit && held <= entry.own)

        if (neverFits !== -1) {
          grant(neverFits)
        } else {
          refuseLast()
        }
      }
    }

    parked.filter(entry => isOpen(entry.owner)).forEach(entry => entry.open())
  }

  return {
    acquire: (bytes, signal, own = 0, owner = null) => waitInTurn(waiting, signal, pump, { bytes, own, owner: owner ?? {} }),

    admitNow: (bytes, owner, own = 0) => {
      if (!fits(bytes) && !(held <= own && isOpen(owner))) {
        return false
      }

      take(bytes, owner)
      return true
    },

    admitWithin: (bytes, owner) => {
      if (!fits(bytes) && held > 0) {
        return false
      }

      take(bytes, owner)
      return true
    },

    get held() { return held },
    isOpen,
    limit,

    release: bytes => {
      held -= bytes

      if (held <= limit) {
        beyond = null
      }

      pump()
    },

    whenOpen: (owner, own, signal) => new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(abortReason(signal))
        return
      }

      if (isOpen(owner)) {
        resolve()
        return
      }

      const entry = { own, owner }

      const leave = () => {
        parked.splice(parked.indexOf(entry), 1)
        signal?.removeEventListener('abort', entry.abort)
      }

      entry.open = () => {
        leave()
        resolve()
      }

      entry.abort = () => {
        leave()
        reject(abortReason(signal))
        pump()
      }

      signal?.addEventListener('abort', entry.abort, { once: true })
      parked.push(entry)
      pump()
    }),
  }
}

// The concurrency controller of a transfer, or of the compatible transfers of a job, in one direction. It decides the
// target: how many attempts may be admitted at once. admit(signal) resolves, in turn, with an attempt once fewer than
// the target are admitted and no throttle's cooldown is under way; the attempt holds its place until it is settled.
// attempt.start() marks the start of its request on the network, once any hard budget has granted it; attempt.accept(
// bytes) settles it as accepted, attempt.fail({ throttled, retryAfterMs }) as a transient failure or throttle, and
// attempt.abandon() with no evidence at all, as for a cancellation or a failure of the source. A retry is a new
// attempt, admitted again: no attempt keeps its place through a retry's wait.
//
// fixed, when given, is a fixed target, which nothing changes. Otherwise the controller adapts within maximum, from
// the direction's policy start. Only an upload whose destination is 's3', as its first grant identified it (see
// Upload.js), with Default startup, warms from one instead (see the README's Transfer concurrency): an upload to a
// remote server integration or Files Agent ('remote'), and any controller given no destination, begin the same ordinary
// policy at its start, whatever their startup. maximum, when given, caps either: a fixed target above it is maximum,
// so that maxConcurrency bounds a transfer's requests whether its concurrency is fixed or adaptive. Every decision is
// recorded for snapshot(), with the measurements that led to it.
const createController = ({
  clock = systemClock,
  destination = null,
  direction,
  fixed = null,
  maximum,
  startup = 'default',
}) => {
  const policy = POLICIES[direction]
  const max = Math.min(maximum ?? fixed ?? policy.maximum, MAX_CONCURRENCY)
  const start = Math.min(policy.start, max)
  const min = Math.min(policy.minimum, max)
  const warms = fixed === null && policy.warm && destination === 's3' && startup === 'default' && start > 1

  let phase = 'steady'
  let target = start

  if (fixed !== null) {
    phase = 'fixed'
    target = Math.min(fixed, max)
  } else if (warms) {
    phase = 'warm'
    target = 1
  }

  let admitted = 0
  let inFlight = 0
  let epoch = 0
  let cooldownUntil = -Infinity
  let acceptedBytes = 0
  let peakTarget = target
  let lowestSecondsPerByte = null
  let measuring = null
  let wakeTimer = null
  const decisions = []
  const waiting = []

  const warm = {
    afterRest: false,
    probe: null,
    rest: 0,
    stage: 'connecting',
  }

  const steady = {
    hold: 0,
    level: [],
    probe: null,
  }

  const decide = (decision, measured = {}) => {
    decisions.push({
      at: clock.now(), decision, target, ...measured,
    })

    if (decisions.length > MAX_DECISIONS) {
      decisions.shift()
    }
  }

  // Adds the time since the window's last event to its integrals: attempts in flight over time, and the time during
  // which they filled the target.
  const integrate = at => {
    if (!measuring) {
      return
    }

    const elapsed = at - measuring.lastAt

    if (elapsed > 0) {
      measuring.integral += inFlight * elapsed

      if (inFlight >= target) {
        measuring.fullTime += elapsed
      }
    }

    measuring.lastAt = at
  }

  const openWindow = at => {
    measuring = {
      attempts: 0,
      bytes: 0,
      durationSum: 0,
      fullTime: 0,
      integral: 0,
      lastAt: at,
      openedAt: at,
    }
  }

  let pump = () => {}

  // Wakes the queue once a throttle's cooldown is over: a wait longer than a timer allows is made of several, each
  // admitting nothing until the cooldown is over. The timer is set only while an attempt waits, and cleared as soon as
  // none does, so that a cooldown no one waits for keeps no timer, and the process, alive; the cooldown itself stays,
  // for whatever is admitted next.
  const wake = ms => {
    if (wakeTimer === null) {
      wakeTimer = clock.schedule(() => {
        wakeTimer = null
        pump()
      }, Math.min(MAX_TIMER_MS, Math.max(0, ms)))
    }
  }

  const stopWaking = () => {
    if (wakeTimer !== null) {
      clock.clear(wakeTimer)
      wakeTimer = null
    }
  }

  pump = () => {
    const at = clock.now()

    while (waiting.length > 0 && admitted < target) {
      if (at < cooldownUntil) {
        wake(cooldownUntil - at)
        return
      }

      admitted += 1
      waiting.shift().grant()
    }

    if (waiting.length === 0) {
      stopWaking()
    }
  }

  const setTarget = (next, at) => {
    integrate(at)
    target = Math.max(1, Math.min(next, max))
    peakTarget = Math.max(peakTarget, target)
    pump()
  }

  // A smaller target, at least one fewer than the current one, but never below floor.
  const shrunk = (ratio, floor) => Math.max(floor, Math.min(target - 1, Math.floor(target * (1 - ratio))))

  const restWarm = (decision, measured) => {
    warm.stage = 'resting'
    warm.rest = WARM_REST_WINDOWS
    warm.afterRest = true
    warm.probe = null
    decide(decision, measured)
  }

  const promote = (decision, measured, at) => {
    phase = 'steady'
    warm.probe = null
    steady.level = []
    steady.probe = null
    steady.hold = 0
    setTarget(start, at)
    openWindow(at)
    decide(decision, measured)
  }

  const raiseWarm = (added, baseline, at) => {
    warm.probe = {
      added,
      baseline,
      from: target,
      settling: true,
    }

    warm.stage = 'probing'
    warm.afterRest = false
    setTarget(Math.min(start, target + added), at)
  }

  // Default startup: from one, each successful probe adds about half again, and one after a rest. A raise from n by d
  // is kept on its second judged window if that delivers at least baseline * (1 + 0.5 * d / n) with a queue estimate
  // below 0.5 * d; otherwise the target returns to n and rests for two judged windows, the last of which is the next
  // baseline. The first judged window at one warms its connection only. Reaching the policy start, or a judged window
  // reaching the fast-link rate, ends the warm start.
  const judgeWarm = (measured, at) => {
    if (measured.throughput >= policy.fastLinkBytesPerSecond) {
      promote('WarmStartFastLink', measured, at)
      return
    }

    if (warm.stage === 'connecting') {
      warm.stage = 'baseline'
      decide('WarmStartConnecting', measured)
      return
    }

    if (warm.stage === 'resting') {
      warm.rest -= 1

      if (warm.rest > 0) {
        decide('WarmStartResting', measured)
        return
      }

      warm.stage = 'baseline'
    }

    if (warm.stage === 'baseline') {
      const added = warm.afterRest ? 1 : Math.ceil(target / 2)

      if (measured.queue >= 0.5 * added) {
        restWarm('WarmStartQueued', measured)
        return
      }

      raiseWarm(added, measured.throughput, at)
      decide('WarmStartRaised', measured)
      return
    }

    if (warm.probe.settling) {
      warm.probe.settling = false
      decide('WarmStartSettling', measured)
      return
    }

    const { added, baseline, from } = warm.probe
    const required = baseline * (1 + ((0.5 * added) / from))

    if (measured.throughput >= required && measured.queue < 0.5 * added) {
      if (target >= start) {
        promote('WarmStartReachedStart', measured, at)
        return
      }

      raiseWarm(Math.ceil(target / 2), measured.throughput, at)
      decide('WarmStartRaised', measured)
      return
    }

    setTarget(from, at)
    epoch += 1
    restWarm('WarmStartWithdrawn', { ...measured, required })
  }

  // The ordinary policy: a probe adds GROWTH_STEP and is kept on a window gaining PROBE_GAIN over its level, withdrawn
  // after PROBE_MISSES that do not, holding growth for a window after. Rising queueing with falling throughput backs
  // the target off.
  const judgeSteady = (measured, at) => {
    if (steady.probe) {
      if (measured.throughput >= steady.probe.baseline * (1 + PROBE_GAIN)) {
        steady.probe = null
        steady.level = [measured.throughput]
        decide('ProbeKept', measured)
        return
      }

      steady.probe.misses += 1

      if (steady.probe.misses >= PROBE_MISSES) {
        setTarget(steady.probe.from, at)
        steady.probe = null
        steady.level = []
        steady.hold = 1
        decide('ProbeWithdrawn', measured)
      }

      return
    }

    steady.level.push(measured.throughput)

    if (steady.level.length > LEVEL_WINDOWS) {
      steady.level.shift()
    }

    const levelMean = steady.level.reduce((total, rate) => total + rate, 0) / steady.level.length

    if (measured.queue > LATENCY_QUEUE_RATIO * target && steady.level.length > 1 && measured.throughput < levelMean) {
      setTarget(shrunk(LATENCY_SHRINK, min), at)
      steady.level = []
      decide('LatencyBackoff', measured)
      return
    }

    if (steady.hold > 0) {
      steady.hold -= 1
      decide('Holding', measured)
      return
    }

    if (target >= max) {
      return
    }

    if (measured.queue > GROWTH_QUEUE_RATIO * target) {
      decide('GrowthQueued', measured)
      return
    }

    steady.probe = { baseline: levelMean, from: target, misses: 0 }
    setTarget(target + GROWTH_STEP, at)
    decide('ProbeRaised', measured)
  }

  // Closes the window once it holds enough accepted attempts, the policy's windowAttempts and as many as the target,
  // in the warm start as after it, over at least their mean duration, and judges it. Only a window judged, its attempts
  // having filled the target for enough of its time, can lower the seconds per byte that every later window's queue is
  // estimated from: a window that did not, recorded as not measured, leaves that reference as it was, so that neither a
  // few unusually fast attempts nor a sparse window can set it.
  const closeWindow = at => {
    const needed = Math.max(policy.windowAttempts, target)
    const elapsed = at - measuring.openedAt

    if (measuring.attempts < needed || elapsed <= 0 || elapsed < measuring.durationSum / measuring.attempts) {
      return
    }

    integrate(at)

    const secondsPerByte = measuring.durationSum / 1000 / measuring.bytes
    const averageInFlight = measuring.integral / elapsed
    const utilization = measuring.fullTime / elapsed
    const judged = utilization >= UTILIZATION

    if (judged) {
      lowestSecondsPerByte = lowestSecondsPerByte === null ? secondsPerByte : Math.min(lowestSecondsPerByte, secondsPerByte)
    }

    const reference = lowestSecondsPerByte ?? secondsPerByte
    const measured = {
      averageInFlight,
      queue: Math.max(0, averageInFlight * (1 - (reference / secondsPerByte))),
      throughput: (measuring.bytes * 1000) / elapsed,
      utilization,
    }

    openWindow(at)

    if (!judged) {
      decide('WindowNotMeasured', measured)
      return
    }

    if (phase === 'warm') {
      judgeWarm(measured, at)
    } else {
      judgeSteady(measured, at)
    }
  }

  const attemptOf = () => {
    const attemptEpoch = epoch
    let startedAt = null
    let settled = false

    // Settles the attempt once, giving the time it did so, or null when it already has been.
    const settle = () => {
      if (settled) {
        return null
      }

      settled = true
      const at = clock.now()
      integrate(at)
      admitted -= 1

      if (startedAt !== null) {
        inFlight -= 1
      }

      return at
    }

    return {
      abandon: () => {
        if (settle() !== null) {
          pump()
        }
      },

      // excludedMs is time within the attempt spent on anything but the network, such as waiting for writes to a
      // download's destination, which its duration leaves out.
      accept: (bytes, excludedMs = 0) => {
        const at = settle()

        if (at === null) {
          return
        }

        acceptedBytes += bytes

        // A completion during a throttle's cooldown measures no current capacity.
        if (phase !== 'fixed' && startedAt !== null && bytes > 0 && measuring && at >= cooldownUntil) {
          measuring.attempts += 1
          measuring.bytes += bytes
          measuring.durationSum += Math.max(0, at - startedAt - excludedMs)
          closeWindow(at)
        }

        pump()
      },

      // Every consequence of the failure, its throttle's cooldown included, is in place before anything waiting is
      // admitted, so that no attempt is granted in the moment between. A throttle's cooldown holds back every new
      // admission, of a fixed target as well, until retryAfterMs has passed; its owner refuses a wait no timer can be
      // set for before it gets here.
      fail: ({ retryAfterMs = 0, throttled = false } = {}) => {
        const at = settle()

        if (at === null) {
          return
        }

        if (throttled) {
          const waitMs = Number.isFinite(retryAfterMs) ? Math.max(0, retryAfterMs) : 0
          cooldownUntil = Math.max(cooldownUntil, at + waitMs)
        }

        if (phase !== 'fixed') {
          const backsOff = attemptEpoch === epoch

          if (backsOff) {
            integrate(at)
            target = Math.max(1, Math.min(shrunk(throttled ? THROTTLE_SHRINK : FAILURE_SHRINK, phase === 'warm' ? 1 : min), max))
            epoch += 1
            steady.probe = null
            steady.level = []
            decide(throttled ? 'ThrottleBackoff' : 'FailureBackoff')
          }

          if (phase === 'warm') {
            restWarm('WarmStartFailureRest')
          }

          if (backsOff || throttled) {
            openWindow(at)
          }
        }

        pump()
      },

      start: () => {
        if (startedAt !== null || settled) {
          return
        }

        const at = clock.now()

        if (!measuring) {
          openWindow(at)
        }

        integrate(at)
        startedAt = at
        inFlight += 1
      },
    }
  }

  return {
    admit: async signal => {
      await waitInTurn(waiting, signal, pump)
      return attemptOf()
    },

    snapshot: () => ({
      acceptedBytes,
      admitted,
      cooldownMs: Math.max(0, cooldownUntil - clock.now()),
      decisions: decisions.map(decision => ({ ...decision })),
      direction,
      epoch,
      inFlight,
      maximum: max,
      minimum: min,
      peakTarget,
      phase,
      start,
      startup: fixed === null ? startup : 'fixed',
      target,
    }),

    get target() { return target },
  }
}

// A transfer's progress: bytesTransferred counts each accepted upload part, or each byte delivered to a download's
// destination, once; bytesSent also counts upload bytes sent again, or download bytes received but then discarded.
// elapsedMs and bytesPerSecond use the monotonic clock and leave out the time control was paused. onProgress, if
// given, receives a snapshot as the transfer starts, at most every PROGRESS_INTERVAL_MS as bytes count, and once as it
// ends; an error it throws while the transfer runs fails the transfer, while one thrown by that last report, once the
// transfer's outcome is settled, is ignored.
const createProgress = ({
  clock = systemClock,
  control,
  direction,
  onProgress,
  totalBytes = null,
}) => {
  const startedAt = clock.now()
  const pausedBefore = control ? control._pausedMs(startedAt) : 0
  let bytesTransferred = 0
  let bytesSent = 0
  let state = 'running'
  let lastReport = -Infinity
  let total = totalBytes

  const snapshot = () => {
    const at = clock.now()
    const paused = control ? control._pausedMs(at) - pausedBefore : 0
    const elapsedMs = Math.max(0, at - startedAt - paused)

    return {
      bytesPerSecond: elapsedMs > 0 ? (bytesTransferred * 1000) / elapsedMs : 0,
      bytesSent,
      bytesTransferred,
      direction,
      elapsedMs,
      state: state === 'running' && control?.paused ? 'paused' : state,
      totalBytes: total,
    }
  }

  const report = always => {
    if (typeof onProgress !== 'function') {
      return
    }

    const at = clock.now()

    if (!always && at - lastReport < PROGRESS_INTERVAL_MS) {
      return
    }

    lastReport = at
    onProgress(snapshot())
  }

  return {
    // Counts bytes accepted or delivered once.
    accepted: bytes => {
      bytesTransferred += bytes
      report(false)
    },

    // Ends the transfer's progress, once, as 'completed' or 'failed', with a last report, which cannot change the
    // transfer's outcome.
    finish: outcome => {
      if (state !== 'running') {
        return
      }

      state = outcome

      try {
        report(true)
      } catch {
        // The transfer has its outcome already.
      }
    },

    // Discards what a whole download delivered, when it starts again from its first byte (see File.node.js).
    reset: () => {
      bytesTransferred = 0
      report(true)
    },

    sent: bytes => {
      bytesSent += bytes
    },

    // The transfer's size, once a download's response declares it: a number of bytes, or null while unknown.
    setTotal: bytes => {
      total = bytes
    },

    snapshot,

    start: () => report(true),
  }
}

/**
 * Pauses and resumes the transfers it is given (`options.control`). Paused, a transfer starts no new request and reads
 * no further, while the requests already under way finish; it keeps every part sent, offset written and its upload's
 * `ref`, and resumes where it stopped. Pausing is not cancelling: only a transfer's `signal` cancels it. One control can
 * govern several transfers at once.
 */
class TransferControl {
  #clock

  #paused = false

  #pausedSince = 0

  #pausedTotal = 0

  #waiting = new Set()

  #sharedPaused = null

  constructor(clock = systemClock) {
    this.#clock = clock
  }

  get paused() {
    return this.#paused
  }

  pause() {
    if (!this.#paused) {
      this.#paused = true
      this.#pausedSince = this.#clock.now()

      if (this.#sharedPaused !== null) {
        Atomics.store(this.#sharedPaused, 0, 1)
      }
    }
  }

  resume() {
    if (this.#paused) {
      this.#paused = false
      this.#pausedTotal += this.#clock.now() - this.#pausedSince

      if (this.#sharedPaused !== null) {
        Atomics.store(this.#sharedPaused, 0, 0)
      }

      const waiting = [...this.#waiting]
      this.#waiting.clear()
      waiting.forEach(entry => entry.resolve())
    }
  }

  // Not public: whether this control is paused, for another thread to read, as the one element of an Int32Array in
  // memory threads share: 1 while paused, 0 while running, set before pause() or resume() returns. A download's thread
  // reads it (see isomorphic/DownloadWorkers.node.js). It is made only once a download thread first asks for it.
  _pausedFlag() {
    if (this.#sharedPaused === null) {
      this.#sharedPaused = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT))
      Atomics.store(this.#sharedPaused, 0, this.#paused ? 1 : 0)
    }

    return this.#sharedPaused
  }

  // Not public: how long this control has been paused, in all, by the time at.
  _pausedMs(at) {
    return this.#pausedTotal + (this.#paused ? at - this.#pausedSince : 0)
  }

  // Not public: resolves once this control is not paused, at once when it is not; rejects with signal's reason when
  // it aborts first.
  _whenRunning(signal) {
    if (!this.#paused) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(abortReason(signal))
        return
      }

      const entry = {}

      const onAbort = () => {
        this.#waiting.delete(entry)
        reject(abortReason(signal))
      }

      entry.resolve = () => {
        signal?.removeEventListener('abort', onAbort)
        resolve()
      }

      signal?.addEventListener('abort', onAbort, { once: true })
      this.#waiting.add(entry)
    })
  }
}

// The hard budgets of a scope: its requests at once in each direction; buffers, the one budget of bufferBytes for all
// the upload data the SDK holds (see byteBudget and Upload.js); and the files it transfers at once; and, for a job, the
// controllers its compatible transfers share.
const createScope = ({
  bufferBytes, files, requests, shared,
}) => {
  const controllers = new Map()

  return {
    buffers: byteBudget(bufferBytes),

    // The controller for key: the job's one, made by make() the first time, or, outside a job, a new one each time.
    controllerFor: (key, make) => {
      if (!shared) {
        return make()
      }

      if (!controllers.has(key)) {
        controllers.set(key, make())
      }

      return controllers.get(key)
    },

    controllers,
    files: requestLimiter(files),
    requests: {
      download: requestLimiter(requests),
      upload: requestLimiter(requests),
    },
  }
}

// The scope of every transfer made without a job.
const processScope = createScope({
  bufferBytes: DEFAULT_BUFFER_BYTES,
  files: Infinity,
  requests: DEFAULT_REQUESTS,
  shared: false,
})

/**
 * A scope for the transfers of one job, given to each of them as `options.job`. Its compatible transfers (the same
 * direction, destination kind, startup and concurrency settings) share one concurrency controller, so that what one
 * file's requests teach it carries over to the next, and every transfer of the job shares its budgets:
 * `maxConcurrency` requests at once in each direction (32 by default); `maxBufferBytes` bytes of upload data held at
 * once (256 MiB by default), parts, forms and copies of data alike, beyond which only one upload goes at a time, and
 * only as the README's Buffers section says; and `maxConcurrentFiles` files transferring at once (no limit by
 * default). Downloads are bounded by their requests, not by `maxBufferBytes`. Transfers without a job learn on their
 * own and share only the process's budgets.
 */
class TransferJob {
  #options

  #scope

  constructor({ maxBufferBytes, maxConcurrency, maxConcurrentFiles } = {}) {
    this.#options = {
      maxBufferBytes: countOption('maxBufferBytes', maxBufferBytes) ?? DEFAULT_BUFFER_BYTES,
      maxConcurrency: countOption('maxConcurrency', maxConcurrency, MAX_CONCURRENCY) ?? DEFAULT_REQUESTS,
      maxConcurrentFiles: countOption('maxConcurrentFiles', maxConcurrentFiles) ?? Infinity,
    }

    this.#scope = createScope({
      bufferBytes: this.#options.maxBufferBytes,
      files: this.#options.maxConcurrentFiles,
      requests: this.#options.maxConcurrency,
      shared: true,
    })
  }

  /** The job's budgets, and each of its controllers' current state and recent decisions. */
  snapshot() {
    return {
      ...this.#options,
      controllers: [...this.#scope.controllers.entries()].map(([key, controller]) => ({ key, ...controller.snapshot() })),
    }
  }

  // Not public: the job's scope (see createScope).
  _scope() {
    return this.#scope
  }
}

// The scope of a transfer given job, if any: the job's, or the process's.
const scopeOf = job => {
  if (job === undefined || job === null) {
    return processScope
  }

  if (!(job instanceof TransferJob)) {
    throw new errors.InvalidParameterError('Bad parameter: job must be a Files.TransferJob')
  }

  return job._scope()
}

// A transfer's control, if any, checked.
const controlOf = control => {
  if (control === undefined || control === null) {
    return null
  }

  if (!(control instanceof TransferControl)) {
    throw new errors.InvalidParameterError('Bad parameter: control must be a Files.TransferControl')
  }

  return control
}

// The controller of one transfer in direction, within scope: fixed when concurrency is given, otherwise adaptive with
// startup, warming from one only for an upload to S3 (see createController()); either way within maxConcurrency, when
// given, so that a fixed concurrency above it runs at maxConcurrency. A job's compatible transfers, of the same
// destination too, share one; any other transfer has its own.
const controllerFor = (scope, {
  clock, concurrency, destination = 'storage', direction, maxConcurrency, startup,
}) => {
  const { fixed, maximum, startup: chosenStartup } = concurrencyOptions({ concurrency, maxConcurrency, startup })
  const key = [direction, destination, fixed === null ? chosenStartup : `fixed ${fixed}`, maximum ?? 'default'].join(' ')

  return scope.controllerFor(key, () => createController({
    clock,
    destination,
    direction,
    fixed,
    maximum,
    startup: chosenStartup,
  }))
}

export {
  DEFAULT_BUFFER_BYTES,
  DEFAULT_REQUESTS,
  MAX_CONCURRENCY,
  MAX_TIMER_MS,
  POLICIES,
  TransferControl,
  TransferJob,
  abortReason,
  byteBudget,
  concurrencyOptions,
  controlOf,
  controllerFor,
  countOption,
  createController,
  createProgress,
  delay,
  linkedSignal,
  processScope,
  requestLimiter,
  scopeOf,
  startupOption,
  systemClock,
}
