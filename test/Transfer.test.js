import { FilesError, InvalidParameterError } from '../lib/Errors'
import Files from '../lib/Files'
import {
  DEFAULT_BUFFER_BYTES,
  DEFAULT_REQUESTS,
  TransferControl,
  TransferJob,
  byteBudget,
  concurrencyOptions,
  controllerFor,
  createController,
  createProgress,
  processScope,
  requestLimiter,
  scopeOf,
} from '../lib/Transfer'

const MIB = 1024 * 1024

// Lets every reaction already queued run.
const settle = async () => {
  for (let turn = 0; turn < 10; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve()
  }
}

// A clock whose time moves only when the test advances it, and whose timers fire only then.
const controlledClock = () => {
  let now = 0
  const timers = new Set()

  return {
    advance: async ms => {
      now += ms
      ;[...timers].filter(timer => timer.due <= now).forEach(timer => {
        timers.delete(timer)
        timer.callback()
      })
      await settle()
    },
    clear: timer => { timers.delete(timer) },
    now: () => now,
    schedule: (callback, ms) => {
      const timer = { callback, due: now + ms }
      timers.add(timer)
      return timer
    },
    timers,
  }
}

// Whether a promise has settled, by the time every reaction already queued has run.
const settledYet = async promise => {
  let settled = false
  promise.then(() => { settled = true }, () => { settled = true })
  await settle()
  return settled
}

// Runs count attempts of bytes each, one after another, each taking ms of the clock, through controller.
const runAttempts = async (controller, clock, count, bytes, ms) => {
  for (let index = 0; index < count; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    const attempt = await controller.admit()
    attempt.start()
    // eslint-disable-next-line no-await-in-loop
    await clock.advance(ms)
    attempt.accept(bytes)
  }
}

// Runs count attempts of bytes each, one after another, each taking ms of the clock and followed by idleMs with none
// under way, through controller: work too sparse to fill even a target of one.
const runSpaced = async (controller, clock, count, bytes, ms, idleMs) => {
  for (let index = 0; index < count; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    const attempt = await controller.admit()
    attempt.start()
    // eslint-disable-next-line no-await-in-loop
    await clock.advance(ms)
    attempt.accept(bytes)
    // eslint-disable-next-line no-await-in-loop
    await clock.advance(idleMs)
  }
}

// Runs count attempts of bytes each through controller, in rounds that fill its target: each round admits as many as
// its target, up to what is left, starts them together, lets ms of the clock pass, and accepts them, so that each part
// takes ms however many are under way, as on a link with room for them all.
const runRounds = async (controller, clock, count, bytes, ms) => {
  let accepted = 0

  while (accepted < count) {
    const size = Math.min(controller.target, count - accepted)
    // eslint-disable-next-line no-await-in-loop
    const attempts = await Promise.all(Array.from({ length: size }, () => controller.admit()))
    attempts.forEach(attempt => attempt.start())
    // eslint-disable-next-line no-await-in-loop
    await clock.advance(ms)
    attempts.forEach(attempt => attempt.accept(bytes))
    accepted += size
  }
}

describe('Transfer concurrency controller', () => {
  // The diagnostic Root ran against the first provisional controller, which admitted the queued attempt at once.
  it('admits no queued attempt before a throttle\'s Retry-After has passed, and admits it once it has', async () => {
    const clock = controlledClock()
    const controller = createController({ clock, destination: 's3', direction: 'upload' })
    const first = await controller.admit()
    first.start()

    const next = controller.admit()
    first.fail({ retryAfterMs: 1000, throttled: true })

    expect(await settledYet(next)).toBe(false)
    expect(controller.snapshot()).toMatchObject({ admitted: 0, cooldownMs: 1000, target: 1 })

    await clock.advance(999)
    expect(await settledYet(next)).toBe(false)

    await clock.advance(1)
    expect(await settledYet(next)).toBe(true)
    ;(await next).abandon()
  })

  it('clears the cooldown\'s wake once its last waiter is cancelled, keeping the cooldown for the next', async () => {
    const clock = controlledClock()
    const controller = createController({ clock, destination: 's3', direction: 'upload' })
    const first = await controller.admit()
    first.start()
    first.fail({ retryAfterMs: 1000, throttled: true })

    const cancel = new AbortController()
    const reason = { cause: 'cancelled while cooling down' }
    const waiting = controller.admit(cancel.signal)
    await settle()
    expect(clock.timers.size).toBe(1)

    cancel.abort(reason)
    await expect(waiting).rejects.toBe(reason)
    expect(clock.timers.size).toBe(0)

    await clock.advance(500)
    const later = controller.admit()
    expect(await settledYet(later)).toBe(false)
    expect(clock.timers.size).toBe(1)

    await clock.advance(500)
    expect(await settledYet(later)).toBe(true)
    ;(await later).abandon()
    expect(clock.timers.size).toBe(0)
  })

  it('backs off once for the attempts that began before a failure, by a tenth for a throttle', async () => {
    const clock = controlledClock()
    const controller = createController({ clock, destination: 's3', direction: 'upload', startup: 'aggressive' })
    const attempts = await Promise.all(Array.from({ length: 4 }, () => controller.admit()))
    attempts.forEach(attempt => attempt.start())

    attempts.forEach(attempt => attempt.fail({ throttled: true }))

    const { decisions, epoch, target } = controller.snapshot()
    expect(decisions.map(({ decision }) => decision)).toEqual(['ThrottleBackoff'])
    expect([epoch, target]).toEqual([1, 28])
  })

  it('warms a Default upload to S3 from one part, raising it as measured throughput gains without queueing', async () => {
    const clock = controlledClock()
    const controller = createController({ clock, destination: 's3', direction: 'upload' })

    expect(controller.snapshot()).toMatchObject({ phase: 'warm', start: 32, target: 1 })

    // Two windows of the policy's eight attempts each: the first warms the connection, the second raises the target.
    await runAttempts(controller, clock, 16, MIB, 100)

    const { decisions, target } = controller.snapshot()
    expect(decisions.map(({ decision }) => decision)).toEqual(['WarmStartConnecting', 'WarmStartRaised'])
    expect(target).toBe(2)
  })

  // Some observations are no measure of the link: a few small parts that happen to finish far faster than the rest, too
  // few to make a window of their own, or fast parts so far apart that they never fill the target. Neither sets the
  // reference later windows' queues are estimated from, so that the link, with room for every part, is still warmed:
  // each judged window gains, and none is taken for queueing.
  it.each([
    ['an early pair of small parts much faster than the rest', (controller, clock) => runAttempts(controller, clock, 2, 64 * 1024, 1), 30, []],
    ['a burst of fast parts too sparse to fill its target', (controller, clock) => runSpaced(controller, clock, 8, MIB, 10, 90), 32, ['WindowNotMeasured']],
  ])('keeps warming a Default upload to S3 after %s, which later windows are not judged by', async (_, leadIn, count, unmeasured) => {
    const clock = controlledClock()
    const controller = createController({ clock, destination: 's3', direction: 'upload' })

    await leadIn(controller, clock)
    await runRounds(controller, clock, count, MIB, 100)

    const { decisions, target } = controller.snapshot()
    expect(decisions.map(({ decision }) => decision)).toEqual([
      ...unmeasured,
      'WarmStartConnecting',
      'WarmStartRaised',
      'WarmStartSettling',
      'WarmStartRaised',
    ])
    expect(target).toBe(3)
  })

  // Raised to two, each part then takes twice as long: nothing is gained, and the parts only queue. The raise is
  // withdrawn on its judged window, below the throughput it required and with a queue estimated, and the warm start
  // rests at one before it tries again.
  it('still withdraws a warm raise that gains nothing but queueing, and rests before raising again', async () => {
    const clock = controlledClock()
    const controller = createController({ clock, destination: 's3', direction: 'upload' })

    await runRounds(controller, clock, 16, MIB, 100)
    await runRounds(controller, clock, 16, MIB, 200)
    await runRounds(controller, clock, 8, MIB, 100)

    const { decisions, epoch, target } = controller.snapshot()
    expect(decisions.map(({ decision }) => decision)).toEqual([
      'WarmStartConnecting',
      'WarmStartRaised',
      'WarmStartSettling',
      'WarmStartWithdrawn',
      'WarmStartResting',
    ])

    const withdrawn = decisions.find(({ decision }) => decision === 'WarmStartWithdrawn')
    expect(withdrawn.throughput).toBeLessThan(withdrawn.required)
    expect(withdrawn.queue).toBeGreaterThan(0)
    expect([epoch, target]).toEqual([1, 1])
  })

  it('ends a Default upload\'s warm start at once on a fast link, at the policy start Aggressive begins with, within the same cap', async () => {
    const clock = controlledClock()
    const fast = createController({ clock, destination: 's3', direction: 'upload' })
    const aggressive = createController({ clock, destination: 's3', direction: 'upload', startup: 'aggressive' })

    // One window of the policy's eight attempts.
    await runAttempts(fast, clock, 8, 100 * MIB, 100)

    expect(fast.snapshot()).toMatchObject({ phase: 'steady', target: 32 })
    expect(fast.snapshot().decisions.map(({ decision }) => decision)).toEqual(['WarmStartFastLink'])
    expect(aggressive.snapshot()).toMatchObject({ maximum: 32, phase: 'steady', target: 32 })
    expect(fast.snapshot().maximum).toBe(aggressive.snapshot().maximum)
  })

  it('starts a download at its own policy start, with no warm start', () => {
    expect(createController({ direction: 'download' }).snapshot()).toMatchObject({ maximum: 32, minimum: 2, phase: 'steady', target: 8 })
  })

  it('keeps a fixed concurrency within maxConcurrency, admitting no more than that at once', async () => {
    const controller = createController({ direction: 'upload', fixed: 4, maximum: 2 })
    const admitted = [await controller.admit(), await controller.admit()]
    const third = controller.admit()

    expect(controller.snapshot()).toMatchObject({ maximum: 2, phase: 'fixed', startup: 'fixed', target: 2 })
    expect(await settledYet(third)).toBe(false)

    admitted[0].accept(1)
    expect(await settledYet(third)).toBe(true)
  })

  it('checks concurrency options as a whole: fixed with startup, and counts out of range, are refused; fixed above the cap is not', () => {
    expect(() => concurrencyOptions({ concurrency: 4, startup: 'default' })).toThrow(InvalidParameterError)
    expect(() => concurrencyOptions({ concurrency: 1025 })).toThrow(InvalidParameterError)
    expect(() => concurrencyOptions({ maxConcurrency: 0 })).toThrow(InvalidParameterError)
    expect(() => concurrencyOptions({ startup: 'fast' })).toThrow(InvalidParameterError)
    expect(concurrencyOptions({ concurrency: 4, maxConcurrency: 2 })).toEqual({ fixed: 4, maximum: 2, startup: 'default' })
  })
})

describe('Transfer budgets', () => {
  it('grants requests in turn, a larger one once nothing else is held, and nothing at once', async () => {
    const limiter = requestLimiter(2)
    await limiter.acquire()
    await limiter.acquire()
    const third = limiter.acquire()

    expect(limiter.tryAcquire()).toBe(false)
    expect(await settledYet(third)).toBe(false)

    limiter.release()
    expect(await settledYet(third)).toBe(true)

    const budget = byteBudget(8)
    await budget.acquire(6)
    const large = budget.acquire(20)
    const none = budget.acquire(0)

    expect(await settledYet(none)).toBe(true)
    expect(await settledYet(large)).toBe(false)

    budget.release(6)
    expect(await settledYet(large)).toBe(true)
    expect(budget.held).toBe(20)
  })

  // Two uploads each hold a copy of their stream's chunk, 3 bytes, and each asks for a part of 4 bytes more: either
  // fits within the budget of 8 alone, but not both together, and neither can give its copy back without its part.
  // Rather than go beyond its limit, the budget refuses the last to ask, before anything is allocated for it; once that
  // upload has given its copy back, the first part fits, and the budget never holds more than its limit.
  it('refuses, rather than go beyond its limit, the last of the owners that wait for room only owners waiting hold', async () => {
    const budget = byteBudget(8)
    const first = {}
    const second = {}

    expect([budget.admitNow(3, first), budget.admitNow(3, second)]).toEqual([true, true])

    const firstPart = budget.acquire(4, undefined, 3, first)
    const secondPart = budget.acquire(4, undefined, 3, second)

    await expect(secondPart).rejects.toThrow(FilesError)
    expect(await settledYet(firstPart)).toBe(false)
    expect([budget.held, budget.isOpen(first), budget.isOpen(second)]).toEqual([6, true, true])

    budget.release(3)
    expect(await settledYet(firstPart)).toBe(true)
    expect(budget.held).toBe(7)
  })

  // An owner holding 6 bytes of its own asks for 4 more: together more than the whole budget of 8, which they could
  // never fit within. While another owner's 2 bytes are held, it waits; once only its own are, it is granted beyond the
  // limit, the budget then open to it alone.
  it('grants beyond its limit only a request that could never fit within it, once nothing but its owner\'s own bytes is held', async () => {
    const budget = byteBudget(8)
    const owner = {}
    const other = {}

    expect(budget.admitNow(6, owner)).toBe(true)
    await budget.acquire(2, undefined, 0, other)

    const part = budget.acquire(4, undefined, 6, owner)
    expect(await settledYet(part)).toBe(false)

    budget.release(2)
    expect(await settledYet(part)).toBe(true)
    expect([budget.held, budget.isOpen(owner), budget.isOpen(other)]).toEqual([10, true, false])
  })

  // What must be allocated at once or not at all, as the rest of a stream's chunk is, is admitted when it fits; when it
  // does not, beyond the limit only while nothing is held but its owner's own bytes, so that the owner holds the budget
  // alone, and only it may then go beyond it; and otherwise refused, as it is beside another owner's bytes, however few.
  // An owner that may need to go beyond the limit waits until the budget is open to it, or until it is cancelled.
  it('admits at once what fits, beyond its limit only for an owner holding it alone, refusing it beside another\'s bytes, and opens again once back within its limit', async () => {
    const budget = byteBudget(4)
    const first = {}
    const second = {}

    expect([budget.admitNow(3, second), budget.admitNow(6, first, 0), budget.held]).toEqual([true, false, 3])

    budget.release(3)
    expect([budget.admitNow(2, first), budget.admitNow(6, first, 2), budget.admitNow(1, second, 0)]).toEqual([true, true, false])
    expect([budget.held, budget.isOpen(first), budget.isOpen(second)]).toEqual([8, true, false])

    const opened = budget.whenOpen(second, 0)
    expect(await settledYet(opened)).toBe(false)

    budget.release(5)
    expect(await settledYet(opened)).toBe(true)

    const cancel = new AbortController()
    const reason = { cause: 'no longer waiting' }
    expect(budget.admitNow(6, first, 3)).toBe(true)

    const stopped = budget.whenOpen(second, 0, cancel.signal)
    cancel.abort(reason)
    await expect(stopped).rejects.toBe(reason)
  })

  // A copy of data in memory, made as its upload is called, is admitted only within the limit, or alone when larger
  // than the whole budget. A part that cannot fit beside a copy held by an upload that does not wait for the budget
  // waits for room, however long that upload goes on: it is never granted beyond the limit for it.
  it('admits within its limit what must be made at once, a larger one only alone, and keeps an ordinary part within the limit', async () => {
    const budget = byteBudget(8)

    expect([budget.admitWithin(6, {}), budget.admitWithin(3, {})]).toEqual([true, false])

    const part = budget.acquire(4, undefined, 0, {})
    expect(await settledYet(part)).toBe(false)
    expect(budget.held).toBe(6)

    budget.release(6)
    expect(await settledYet(part)).toBe(true)
    budget.release(4)

    expect([budget.admitWithin(12, {}), budget.held]).toEqual([true, 12])
  })

  it('pauses and resumes, its paused time left out of a transfer\'s progress, and a final report that cannot fail it', async () => {
    const clock = controlledClock()
    const control = new TransferControl(clock)
    const reports = []
    const progress = createProgress({ clock, control, direction: 'upload', onProgress: report => reports.push(report), totalBytes: 10 })

    progress.start()
    await clock.advance(1000)
    control.pause()
    expect(progress.snapshot().state).toBe('paused')

    const running = control._whenRunning()
    expect(await settledYet(running)).toBe(false)

    await clock.advance(5000)
    control.resume()
    expect(await settledYet(running)).toBe(true)

    await clock.advance(1000)
    progress.sent(10)
    progress.sent(10)
    progress.accepted(10)

    expect(progress.snapshot()).toMatchObject({ bytesPerSecond: 5, bytesSent: 20, bytesTransferred: 10, elapsedMs: 2000, state: 'running' })

    const throwing = createProgress({ clock, direction: 'download', onProgress: () => { throw new Error('report failed') } })
    expect(() => throwing.finish('completed')).not.toThrow()
    expect(throwing.snapshot().state).toBe('completed')
    expect(reports[0]).toMatchObject({ bytesTransferred: 0, state: 'running', totalBytes: 10 })
  })
})

describe('Transfer jobs', () => {
  // What the first file's parts teach the job's controller, a fast link, carries over to the job's next compatible
  // file, and to nothing outside the job or of another kind.
  it('carries what one transfer of a job learns over to its next compatible transfer, and to no other', async () => {
    const clock = controlledClock()
    const job = new TransferJob({ maxConcurrency: 16 })
    const scope = scopeOf(job)
    const settings = { clock, destination: 's3', direction: 'upload' }

    // One window of the policy's eight attempts.
    await runAttempts(controllerFor(scope, settings), clock, 8, 100 * MIB, 100)

    const next = controllerFor(scope, settings)
    const aggressive = controllerFor(scope, { ...settings, startup: 'aggressive' })
    const remote = controllerFor(scope, { ...settings, destination: 'remote' })
    const otherJob = controllerFor(scopeOf(new TransferJob({ maxConcurrency: 16 })), settings)
    const withoutJob = controllerFor(processScope, settings)

    // The job's 16 requests at once are its hard budget; the controller's own cap stays the policy's.
    expect(next.snapshot()).toMatchObject({ acceptedBytes: 800 * MIB, phase: 'steady', target: 32 })
    expect([otherJob, withoutJob].map(controller => controller.snapshot().phase)).toEqual(['warm', 'warm'])
    expect(aggressive.snapshot().acceptedBytes).toBe(0)

    // A Default upload to a remote server integration or Files Agent learns apart from the S3 uploads, and has no warm
    // start, which is S3's alone: it begins the ordinary upload policy at its start, 32, within its maximum of 32 and
    // minimum of 4, as an Aggressive one does, and backs off as S3's ordinary policy does.
    expect(remote.snapshot()).toMatchObject({
      acceptedBytes: 0,
      maximum: 32,
      minimum: 4,
      peakTarget: 32,
      phase: 'steady',
      start: 32,
      startup: 'default',
      target: 32,
    })

    // Outside the job, so that its controllers stay the three below.
    expect(controllerFor(processScope, { ...settings, destination: 'remote', startup: 'aggressive' }).snapshot())
      .toMatchObject({ phase: 'steady', start: 32, target: 32 })

    // Before a caller's cap, which bounds it as it bounds S3's.
    expect(controllerFor(processScope, { ...settings, destination: 'remote', maxConcurrency: 8 }).snapshot())
      .toMatchObject({ maximum: 8, minimum: 4, phase: 'steady', start: 8, target: 8 })

    const attempts = await Promise.all(Array.from({ length: 4 }, () => remote.admit()))
    attempts.forEach(attempt => attempt.start())
    attempts.forEach(attempt => attempt.fail({ throttled: true }))

    expect(remote.snapshot().decisions.map(({ decision }) => decision)).toEqual(['ThrottleBackoff'])
    expect([remote.snapshot().epoch, remote.snapshot().target]).toEqual([1, 28])

    // A fixed concurrency stays fixed for a remote destination too.
    expect(controllerFor(processScope, { ...settings, concurrency: 3, destination: 'remote' }).snapshot())
      .toMatchObject({ phase: 'fixed', startup: 'fixed', target: 3 })

    const snapshot = job.snapshot()
    expect(Object.keys(snapshot).sort()).toEqual(['controllers', 'maxBufferBytes', 'maxConcurrency', 'maxConcurrentFiles'])
    expect(snapshot.controllers.map(({ key }) => key)).toEqual(['upload s3 default default', 'upload s3 aggressive default', 'upload remote default default'])
    expect(Object.keys(snapshot.controllers[0]).sort()).toEqual([
      'acceptedBytes', 'admitted', 'cooldownMs', 'decisions', 'direction', 'epoch', 'inFlight', 'key', 'maximum', 'minimum',
      'peakTarget', 'phase', 'start', 'startup', 'target',
    ])
  })

  it('has the documented defaults, and refuses a bad count or job', () => {
    expect(new Files.TransferJob().snapshot()).toEqual({
      controllers: [],
      maxBufferBytes: 256 * MIB,
      maxConcurrency: 32,
      maxConcurrentFiles: Infinity,
    })

    expect([DEFAULT_BUFFER_BYTES, DEFAULT_REQUESTS]).toEqual([256 * MIB, 32])
    expect(() => new Files.TransferJob({ maxConcurrency: 2000 })).toThrow(InvalidParameterError)
    expect(() => new Files.TransferJob({ maxConcurrentFiles: 0 })).toThrow(InvalidParameterError)
    expect(() => scopeOf({})).toThrow(InvalidParameterError)
  })
})
