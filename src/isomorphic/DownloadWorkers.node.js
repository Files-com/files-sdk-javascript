import { types } from 'util'

import * as errors from '../Errors'
import { abortReason, linkedSignal } from '../Transfer'
import { WRITE_BATCH_BYTES, logDownloadResponse } from './File.node.js'

// The SDK's download threads: at most two, made on the process's main thread only, as a split download to disk first
// needs them, on which the later ranges of such a download can be read (see run() in File.node.js), so that the work of
// the network and of taking response bodies is not all on one thread. A download thread (see DownloadWorker.node.js) only
// sends the request it is given and takes its body. Everything else stays with the download on its own thread: its
// admission and permits, its URL and its renewal, its retries, the verdict on each response, every write to its file,
// every count of its progress and every call of its callbacks. No thread is given the file, its descriptor or its path.
//
// A request's body comes back from its thread one batch at a time, in memory of the download's own: one buffer for the
// request, made as its body is to be read, which is its thread's while it fills it and the download's while it writes
// it. The download gives it back only once that batch has been written, and its progress counted and callbacks run,
// and not while the download is paused or after it has stopped; the thread takes no more of the body until then. So a
// request holds no more of its body than one read on the download's own thread does, and only while it holds its permits.
// A request is the download's until it has closed and its outcome has come, once every batch of it being written has
// been: a stop of the download reaches its thread whenever it comes, and a request that breaks while a batch of it waits
// to be given back ends with that failure, paused or not.
//
// A thread that is not ready yet, or is set up otherwise than the download's own (see describeDefaults()), is not used,
// and a request it is not given is sent on the download's own thread as before, never having gone anywhere. No thread is
// made in a process started to run a program of its own before or in place of a thread's (see startsPrograms()), which
// every thread made with the process's options would run again. A thread that stops unexpectedly fails, for good, every
// request it was given, sent or not, once what of them the download had to write has been written; and no request is
// given to any download thread from then on.

// The most download threads there are at once in the process.
const MAX_THREADS = 2

// How long a download thread with nothing to do is kept before it is stopped.
const IDLE_MS = 5000

// The elements of the counts a request's thread and the download share (see open()): STOP, 1 once the download has
// stopped the request; and RECEIVED, the bytes of its body the thread has taken.
const STOP = 0
const RECEIVED = 1

// The most CA certificates, and bytes of them, a request takes along to its thread (see canonicalCertificates()).
const MAX_CERTIFICATES = 4096
const MAX_CERTIFICATE_BYTES = 16 * 1024 * 1024

// The own properties of https's global agent that hold what it is doing rather than how it is set up: its requests,
// sockets, sessions and listeners, the last described apart, and its options, described apart too.
const AGENT_STATE = ['_events', '_eventsCount', '_sessionCache', 'freeSockets', 'options', 'requests', 'sockets',
  'totalSocketCount']

// The options that make Node.js run a program before a thread's own, or in its place (see startsPrograms()).
const PROGRAM_OPTIONS = ['--eval', '--experimental-loader', '--import', '--loader', '--print', '--require', '-e', '-p',
  '-r']

// The fields of an error a download thread made that a download may read besides its class and message.
const ERROR_FIELDS = ['code', 'errno', 'name', 'syscall']

const ERROR_CLASSES = { Error, RangeError, TypeError }

const PLAIN_TYPES = ['bigint', 'boolean', 'number', 'string', 'undefined']

const TYPED_ARRAY_PROTOTYPE = Object.getPrototypeOf(Uint8Array.prototype)

const isPlainValue = value => value === null || PLAIN_TYPES.includes(typeof value)

const byName = ([left], [right]) => (left < right ? -1 : Number(left > right))

// The own properties of target, but those named in skipped, as [name, value] entries in order of name; or null when any
// is not a plain value: an accessor, a function or an object.
const plainEntries = (target, skipped = []) => {
  const entries = []

  const plain = Reflect.ownKeys(target).filter(key => !skipped.includes(key)).every(key => {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, key)

    if (!('value' in descriptor) || !isPlainValue(descriptor.value)) {
      return false
    }

    entries.push([typeof key === 'symbol' ? `symbol ${key.description}` : `string ${key}`, descriptor.value])
    return true
  })

  return plain ? entries.sort(byName) : null
}

// A typed array's own buffer, byteOffset or byteLength, as the language's own getters give it, whatever the array has
// of its own.
const typedArrayField = (view, name) => Reflect.apply(
  Reflect.getOwnPropertyDescriptor(TYPED_ARRAY_PROTOTYPE, name).get,
  view,
  [],
)

// One CA certificate as data of the SDK's own, with its size: a string, as it is, or a copy of a typed array's bytes, of
// at most room of them; or null for anything else, or anything larger.
const canonicalCertificate = (value, room) => {
  if (typeof value === 'string') {
    return value.length <= room ? { bytes: value.length, certificate: value } : null
  }

  if (!types.isTypedArray(value)) {
    return null
  }

  const bytes = typedArrayField(value, 'byteLength')

  if (bytes > room) {
    return null
  }

  const view = new Uint8Array(typedArrayField(value, 'buffer'), typedArrayField(value, 'byteOffset'), bytes)
  return { bytes, certificate: view.slice() }
}

// The CA certificates of https's global agent's options as data of the SDK's own, which any thread can be given: one
// certificate (see canonicalCertificate()), or an array of them, of at most MAX_CERTIFICATES, every element its own
// value and no other property of its own; MAX_CERTIFICATE_BYTES of them in all at most. Anything else is null, an
// accessor or a proxy included, and nothing of it is called to tell.
const canonicalCertificates = value => {
  if (!Array.isArray(value)) {
    return canonicalCertificate(value, MAX_CERTIFICATE_BYTES)?.certificate ?? null
  }

  if (types.isProxy(value)) {
    return null
  }

  const { value: length } = Reflect.getOwnPropertyDescriptor(value, 'length')

  if (length > MAX_CERTIFICATES || Reflect.ownKeys(value).length !== length + 1) {
    return null
  }

  const certificates = []
  let room = MAX_CERTIFICATE_BYTES

  for (let index = 0; index < length; index += 1) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
    const taken = descriptor && 'value' in descriptor ? canonicalCertificate(descriptor.value, room) : null

    if (taken === null) {
      return null
    }

    room -= taken.bytes
    certificates.push(taken.certificate)
  }

  return certificates
}

// How https's global agent, Node.js's TLS defaults and its DNS lookups' default order are set up on this thread, as
// data another thread can be given and compare with its own: { agent, ca, defaultCA, dnsResultOrder, listeners,
// options, tls }. It is null when that cannot be told so, as when the agent is not Node.js's own https.Agent, or has
// an accessor, a function or an object of its own beyond its options and connection state, an option that is not a
// plain value, or CA certificates other than those canonicalCertificates() takes; or when Node.js does not tell the
// order of its DNS lookups. Nothing of it is called to tell, a getter or a proxy included. ca is its options' CA
// certificates, the one setting a download thread takes on, described apart, as data of the SDK's own. defaultCA is the
// default CA certificates where Node.js lets one thread set its own (tls.setDefaultCACertificates()), as
// tls.getCACertificates() gives them; and else null, as no thread can then have its own. dnsResultOrder is the order
// in which dns.lookup(), and so the agent, gives a host's addresses by default, as dns.getDefaultResultOrder() gives
// it: every thread has its own, which dns.setDefaultResultOrder() on another does not change.
const describeDefaults = () => {
  const dns = require('dns')
  const https = require('https')
  const tls = require('tls')
  const agent = https.globalAgent

  if (typeof agent !== 'object' || agent === null || types.isProxy(agent)
    || Object.getPrototypeOf(agent) !== https.Agent.prototype) {
    return null
  }

  const optionsDescriptor = Reflect.getOwnPropertyDescriptor(agent, 'options')

  if (!optionsDescriptor || !('value' in optionsDescriptor) || typeof optionsDescriptor.value !== 'object'
    || optionsDescriptor.value === null || types.isProxy(optionsDescriptor.value)) {
    return null
  }

  const options = optionsDescriptor.value
  const caDescriptor = Reflect.getOwnPropertyDescriptor(options, 'ca')

  if (caDescriptor && !('value' in caDescriptor)) {
    return null
  }

  const ca = caDescriptor === undefined || caDescriptor.value === undefined
    ? undefined
    : canonicalCertificates(caDescriptor.value)

  if (ca === null) {
    return null
  }

  const agentEntries = plainEntries(agent, AGENT_STATE)
  const optionEntries = plainEntries(options, ['ca'])

  if (agentEntries === null || optionEntries === null || typeof dns.getDefaultResultOrder !== 'function') {
    return null
  }

  let defaultCA = null

  if (typeof tls.setDefaultCACertificates === 'function') {
    defaultCA = typeof tls.getCACertificates === 'function' ? tls.getCACertificates('default') : null

    if (!Array.isArray(defaultCA)) {
      return null
    }
  }

  return {
    agent: agentEntries,
    ca,
    defaultCA,
    dnsResultOrder: dns.getDefaultResultOrder(),
    listeners: agent.eventNames().map(name => [String(name), agent.listenerCount(name)]).sort(byName),
    options: optionEntries,
    tls: [tls.DEFAULT_CIPHERS, tls.DEFAULT_ECDH_CURVE, tls.DEFAULT_MAX_VERSION, tls.DEFAULT_MIN_VERSION],
  }
}

const sameEntries = (left, right) => left.length === right.length
  && left.every(([name, value], index) => name === right[index][0] && Object.is(value, right[index][1]))

// Whether default CA certificates are the same as another thread's, every one, in order: both null, as no thread has
// its own, or both the same.
const sameCertificates = (current, theirs) => {
  if (current === null || theirs === null) {
    return current === theirs
  }

  return current.length === theirs.length && current.every((certificate, index) => certificate === theirs[index])
}

// Whether current, this thread's setup now (see describeDefaults()), is a thread's, theirs, but for the CA certificates
// of the agent's options.
const sameDefaults = (current, theirs) => sameEntries(current.agent, theirs.agent)
  && sameEntries(current.options, theirs.options)
  && sameEntries(current.listeners, theirs.listeners)
  && current.tls.length === theirs.tls.length
  && current.tls.every((value, index) => Object.is(value, theirs.tls[index]))
  && sameCertificates(current.defaultCA, theirs.defaultCA)
  && current.dnsResultOrder === theirs.dnsResultOrder

// Whether an argument of the process's command line, or of its NODE_OPTIONS, is one of PROGRAM_OPTIONS, given as Node.js
// takes it: alone, or with its value after =, a name's _ standing for -, and, in NODE_OPTIONS, quoted.
const isProgramOption = argument => PROGRAM_OPTIONS.includes(argument.replace(/^["']+|["']+$/g, '').split('=')[0]
  .replace(/_/g, '-'))

// Whether the process was started to run a program of its own before a thread's, preloaded with --require or --import,
// or a module loader, or in its place, with --eval or --print: on its command line or in NODE_OPTIONS. A thread made
// with the process's options, as one is by default, would run that program again (see Node.js's worker_threads), so
// such a process makes no download thread, and downloads as it always has, its options all its own.
const startsPrograms = () => process.execArgv.some(isProgramOption)
  || `${process.env.NODE_OPTIONS ?? ''}`.split(/\s+/).filter(Boolean).some(isProgramOption)

// An error a download thread made, as data the download's thread can be given (see errorFrom()): its class, among those
// it can be made again as, its message, and the fields of ERROR_FIELDS a retry's judgment may read.
const describeError = error => {
  if (typeof error !== 'object' || error === null) {
    return { errorClass: 'Error', message: String(error) }
  }

  let errorClass = 'Error'

  if (error instanceof errors.FilesError) {
    errorClass = 'FilesError'
  } else if (error instanceof TypeError) {
    errorClass = 'TypeError'
  } else if (error instanceof RangeError) {
    errorClass = 'RangeError'
  }

  const described = { errorClass, message: String(error.message) }

  ERROR_FIELDS.filter(name => error[name] !== undefined && isPlainValue(error[name])).forEach(name => {
    described[name] = error[name]
  })

  return described
}

// The error a download thread described (see describeError()), made again on this thread: an error of the same class,
// message and fields, not the same object, which never existed here.
const errorFrom = described => {
  const ErrorClass = described.errorClass === 'FilesError'
    ? errors.FilesError
    : (ERROR_CLASSES[described.errorClass] ?? Error)

  const error = new ErrorClass(described.message)

  ERROR_FIELDS.filter(name => described[name] !== undefined && error[name] !== described[name]).forEach(name => {
    error[name] = described[name]
  })

  return error
}

// What a request fails with, for good, when its thread stopped unexpectedly, whatever had become of it.
const threadStopped = () => new errors.FilesError(
  'The download failed because the SDK\'s download thread reading part of it stopped unexpectedly',
)

const threads = []
const readinessWatchers = new Set()
let disabled = false
let lastRequest = 0
let sentRequests = 0
let nextSendGate = null
let nextSendWitness = null

const notifyReadiness = () => [...readinessWatchers].forEach(watch => watch())

// Whether download threads can be made here: only on the process's main thread, so that SDK calls on a thread of the
// application's own make none, where threads can share memory, and in a process started to run no program of its own
// that a thread would run again (see startsPrograms()). Told before any thread is made.
const canMakeThreads = () => {
  const { isMainThread } = require('worker_threads')
  return isMainThread && typeof SharedArrayBuffer === 'function' && typeof Atomics === 'object' && !startsPrograms()
}

// Lets thread go once it has had nothing to do for IDLE_MS, or at once when no download thread is to be used any more,
// keeping the process alive meanwhile no longer.
const idle = thread => {
  if (!thread.alive) {
    return
  }

  thread.worker.unref()
  clearTimeout(thread.idleTimer)

  thread.idleTimer = setTimeout(() => {
    if (thread.alive && thread.tasks.size === 0) {
      thread.retiring = true
      thread.worker.terminate().catch(() => {})
    }
  }, disabled ? 0 : IDLE_MS)

  thread.idleTimer.unref?.()
}

// Keeps thread, and the process, alive while it has a request.
const busy = thread => {
  clearTimeout(thread.idleTimer)
  thread.idleTimer = null
  thread.worker.ref()
}

// A thread that failed or stopped unexpectedly: its requests fail for good, and no download thread is used from then
// on, those idle let go at once.
const failThread = thread => {
  if (thread.failed) {
    return
  }

  thread.failed = true
  disabled = true
  Array.from(thread.tasks.values()).forEach(task => task.crash())
  threads.filter(other => other.alive && other.tasks.size === 0).forEach(idle)
  notifyReadiness()
}

const exited = thread => {
  thread.alive = false
  clearTimeout(thread.idleTimer)

  if (!thread.retiring) {
    failThread(thread)
  }

  Array.from(thread.tasks.values()).forEach(task => task.exit())
  thread.tasks.clear()

  const index = threads.indexOf(thread)

  if (index !== -1) {
    threads.splice(index, 1)
  }

  thread.markExited()
  notifyReadiness()
}

const receive = (thread, message) => {
  if (message?.type === 'ready') {
    thread.ready = true
    thread.defaults = message.defaults ?? null

    if (thread.tasks.size === 0) {
      idle(thread)
    }

    notifyReadiness()
    return
  }

  thread.tasks.get(message?.task)?.receive(message)
}

const startThread = () => {
  const { Worker } = require('worker_threads')
  const thread = {
    alive: true,
    defaults: null,
    failed: false,
    idleTimer: null,
    ready: false,
    retiring: false,
    tasks: new Map(),
  }

  thread.exited = new Promise(resolve => { thread.markExited = resolve })
  thread.worker = new Worker(require.resolve('./DownloadWorker.node.js'), {
    workerData: { filesDownloadThread: true },
  })

  thread.worker.unref()
  thread.worker.on('message', message => receive(thread, message))
  thread.worker.on('error', () => failThread(thread))
  thread.worker.on('messageerror', () => {
    failThread(thread)
    thread.worker.terminate().catch(() => {})
  })

  thread.worker.on('exit', () => exited(thread))

  return thread
}

// Makes the download threads not under way yet, up to MAX_THREADS, when they can be made and are still to be used. A
// thread that cannot be made means that none is used.
const prepare = () => {
  if (disabled || !canMakeThreads()) {
    return
  }

  try {
    while (threads.length < MAX_THREADS) {
      threads.push(startThread())
    }
  } catch {
    disabled = true
    threads.filter(thread => thread.alive && thread.tasks.size === 0).forEach(idle)
    notifyReadiness()
  }
}

// Gives thread a request to send and read: url with headers, through an agent set up as https's global agent is on the
// download's thread, with ca, its CA certificates, as the request's socket buffer, highWaterMark, and its budget of
// timeoutSecs (see httpsExchange() in File.node.js); paused is the download's paused flag (see TransferControl), or
// null. Returns the request as an exchange of File.node.js's, with besides:
// - decision: resolves with { sent } once the thread has sent it; with { unsent, error, terminal } once the thread, at
//   its last check, has not, unsent saying why: 'stopped', 'paused', 'expired' for its URL, or 'refused' with the error
//   sending it failed with; or with { crashed } when the thread stopped before telling.
// - response: its response, { headers, status, statusText }, logged to log as one on the download's thread is, once the
//   thread has it; or it rejects with its failure, which failed() then gives as unanswered() judged it on the thread.
// - readInto({ control, expected, signal, writer }): reads its body, expected bytes, into writer on the download's
//   thread, a batch at a time, writing each before its thread may take more, and resolves with what pump() would have,
//   once every batch of it being written has been. signal, the download's split's, stops the request whenever it
//   aborts, the request closed or not.
// - received(): the bytes of its body its thread has taken.
// Or returns null when the thread could not be given the request at all, which has then gone nowhere. Its budget runs
// on its thread, as httpsExchange() keeps it: through the wait for the download's verdict on its response and every
// wait for a batch to be written, until its body has been read and written, or it has closed; finish() does nothing
// more here.
const open = (thread, {
  ca, headers, highWaterMark, log, paused, timeoutSecs, url,
}) => {
  lastRequest += 1
  const id = lastRequest
  const counts = new Int32Array(new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT))
  const halted = new AbortController()
  const gate = nextSendGate
  const witness = nextSendWitness
  nextSendGate = null
  nextSendWitness = null

  let decide = null
  let answer = null
  let refuse = null
  let markClosed = null
  const decision = new Promise(resolve => { decide = resolve })
  const response = new Promise((resolve, reject) => {
    answer = resolve
    refuse = reject
  })

  const closed = new Promise(resolve => { markClosed = resolve })
  response.catch(() => {})

  let decided = false
  let answered = false
  let refused = false
  let failedAs = null
  let isClosed = false
  let stopped = false
  let crashed = false
  let retired = false
  let reading = null
  let outcome = null

  // Gives the thread a message about the request: whether it could be given. The SDK's own data always can be while the
  // thread is alive (see describeDefaults()).
  const deliver = (message, transfer = []) => {
    if (!thread.alive) {
      return false
    }

    try {
      thread.worker.postMessage({ ...message, task: id }, transfer)
      return true
    } catch {
      return false
    }
  }

  // Gives the thread a message about the request it has been given. One that cannot be given leaves the thread's side
  // of the request unknown, so the thread is stopped, failing its requests for good (see failThread()), rather than
  // waited on.
  const post = (message, transfer = []) => {
    if (!deliver(message, transfer) && thread.alive) {
      failThread(thread)
      thread.worker.terminate().catch(() => {})
    }
  }

  const settleDecision = value => {
    if (!decided) {
      decided = true
      decide(value)
    }
  }

  const respond = opened => {
    if (!answered) {
      answered = true
      answer(opened)
    }
  }

  const refuseWith = (error, judged) => {
    if (!answered) {
      answered = true
      refused = true
      failedAs = judged
      refuse(error)
    }
  }

  const close = () => {
    if (!isClosed) {
      isClosed = true
      markClosed()
    }
  }

  // Lets the request go, its waits ended.
  const forget = () => {
    if (!retired) {
      retired = true
      halted.abort()

      if (thread.tasks.delete(id) && thread.tasks.size === 0) {
        idle(thread)
      }
    }
  }

  // Lets the request go once nothing more can come of it: once it has closed and its body has been read, or it had been
  // stopped, refused or failed with its thread before its body was to be read.
  const retire = () => {
    if (isClosed && (reading === null ? (stopped || refused || crashed) : outcome !== null)) {
      forget()
    }
  }

  const stop = () => {
    if (!stopped) {
      stopped = true
      Atomics.store(counts, STOP, 1)
      post({ type: 'stop' })
      halted.abort()
      retire()
    }
  }

  // Ends the reading of the request's body, with result.
  const finishReading = (current, result) => {
    current.signal.removeEventListener('abort', current.onAbort)
    current.resolve(result)
  }

  // The thread has stopped unexpectedly: the request fails for good, once any batch of it being written here has been.
  // Its first failure stands: a write's or callback's here, when one came before the thread stopped, or else the
  // thread's stopping.
  const crash = () => {
    if (crashed || retired) {
      return
    }

    crashed = true
    const error = threadStopped()
    settleDecision({ crashed: true })
    refuseWith(error, { error, terminal: true })

    const current = reading

    if (current !== null && outcome === null) {
      const first = current.failed ?? { error }
      outcome = { ok: false }
      current.released.abort()

      current.writing.then(() => finishReading(current, {
        error: first.error,
        excludedMs: 0,
        kind: 'terminal',
        ok: false,
        received: Atomics.load(counts, RECEIVED),
      }))
    }

    halted.abort()
  }

  const exit = () => {
    crash()
    close()
    forget()
  }

  const onHead = ({ headers: answeredHeaders, status, statusText }) => {
    try {
      logDownloadResponse(log, { headers: answeredHeaders, statusCode: status, statusMessage: statusText })
    } catch (error) {
      // A log that throws is the request's failure, as it is for a request sent on the download's thread.
      stop()
      refuseWith(error, null)
      return
    }

    respond({
      body: null, complete: () => true, failure: error => error, headers: answeredHeaders, status, statusText,
    })
  }

  // A batch of the body, length bytes of buffer: written to the download's writer, as a batch read on the download's own
  // thread is, then given back to the thread, unless the request has stopped or ended meanwhile, and only once the
  // download is not paused, but for the last, after which the thread reads nothing more. A batch that comes once the
  // request has stopped is not written: its bytes stay received only. A write or callback that fails keeps its own
  // failure for the request, the first one of it, and tells the thread to take no more.
  const onBatch = ({ buffer, last, length }) => {
    const current = reading

    if (current === null || current.holding || outcome !== null || !types.isArrayBuffer(buffer)
      || !Number.isSafeInteger(length) || length <= 0 || length > buffer.byteLength) {
      // No thread gives a batch so: the request fails, as one whose thread failed does.
      if (current !== null && current.failed === null) {
        current.failed = { error: threadStopped() }
      }

      stop()
      return
    }

    // Whether the thread may take more of the body: not once the request has stopped or ended, nor once the download's
    // split has stopped, which stops the request too, so that its thread hears of it.
    const goesOn = () => {
      if (current.signal.aborted) {
        stop()
      }

      return !stopped && !crashed && !current.released.signal.aborted
    }

    current.holding = true
    current.writing = (async () => {
      if (!goesOn()) {
        return
      }

      try {
        // A full batch starts its write as it is added; flush() writes one smaller than that, and waits for any other.
        await current.writer.add(Buffer.from(buffer, 0, length))
        await current.writer.flush()
      } catch (error) {
        if (current.failed === null) {
          current.failed = { error }
        }

        post({ failed: true, type: 'credit' })
        return
      }

      try {
        while (!last && current.control?.paused && goesOn()) {
          // eslint-disable-next-line no-await-in-loop
          await current.control._whenRunning(linkedSignal([current.signal, halted.signal, current.released.signal]))
        }
      } catch {
        // Stopped, or ended otherwise, while paused (see goesOn()).
      }

      if (goesOn()) {
        post({ buffer, type: 'credit' }, [buffer])
      }
    })().finally(() => {
      current.holding = false
    })
  }

  // The thread found the download paused as it was about to take a chunk: it goes on once the download is resumed.
  const onPaused = () => {
    const current = reading

    if (current === null || outcome !== null) {
      return
    }

    const resume = () => {
      if (!stopped && !crashed) {
        post({ type: 'resume' })
      }
    }

    if (!current.control) {
      resume()
      return
    }

    current.control._whenRunning(linkedSignal([current.signal, halted.signal, current.released.signal]))
      .then(resume, () => {})
  }

  // The thread has read what it was to, or stopped, or its request broke: the request's outcome, once any batch of it
  // being written here has been, with the failure of a write or callback here as it was, and the download's own stop as
  // its reason. No batch is given back from then on, a paused one's wait included.
  const onOutcome = ({
    error, excludedMs, kind, ok, received,
  }) => {
    const current = reading

    if (current === null || outcome !== null) {
      return
    }

    outcome = { ok }
    current.released.abort()

    current.writing.then(() => {
      const measured = { excludedMs: excludedMs ?? 0, received: received ?? 0 }

      if (current.failed !== null) {
        finishReading(current, {
          ...measured, error: current.failed.error, kind: 'terminal', ok: false,
        })
      } else if (ok && !stopped) {
        finishReading(current, { ...measured, ok: true })
      } else if (stopped || kind === 'stopped' || current.signal.aborted) {
        const reason = current.signal.aborted
          ? abortReason(current.signal)
          : errorFrom(error ?? { errorClass: 'Error', message: 'Download request stopped' })

        finishReading(current, {
          ...measured, error: reason, kind: 'stopped', ok: false,
        })
      } else {
        finishReading(current, {
          ...measured, error: errorFrom(error), kind, ok: false,
        })
      }
    })

    retire()
  }

  const receiveMessage = message => {
    switch (message.type) {
      case 'unsent':
        settleDecision({
          error: message.error ? errorFrom(message.error) : null,
          terminal: message.terminal === true,
          unsent: message.why,
        })

        close()
        forget()
        break
      case 'sent':
        sentRequests += 1
        settleDecision({ sent: true })
        break
      case 'head':
        onHead(message)
        break
      case 'failed': {
        const error = errorFrom(message.error)

        refuseWith(error, {
          error,
          expired: message.expired === true,
          terminal: message.terminal === true,
          unsent: message.unsent === true,
        })

        retire()
        break
      }

      case 'batch':
        onBatch(message)
        break
      case 'paused':
        onPaused()
        break
      case 'outcome':
        onOutcome(message)
        break
      case 'closed':
        close()
        // A request that closed with neither a response nor a failure fails.
        refuseWith(new Error('Download request closed before it was answered'), null)
        retire()
        break
      default:
        break
    }
  }

  const readInto = ({
    control, expected, signal, writer,
  }) => new Promise(resolve => {
    if (crashed) {
      resolve({
        error: threadStopped(), excludedMs: 0, kind: 'terminal', ok: false, received: 0,
      })

      return
    }

    if (signal.aborted || stopped || reading !== null || !answered || refused) {
      // Nothing of its body is read, and its thread, which may still have the request, is told so.
      if (signal.aborted) {
        stop()
      }

      resolve({
        error: signal.aborted ? abortReason(signal) : new Error('Download request stopped before its body was read'),
        excludedMs: 0,
        kind: 'stopped',
        ok: false,
        received: 0,
      })

      return
    }

    const current = {
      control,
      failed: null,
      holding: false,
      onAbort: () => stop(),
      released: new AbortController(),
      resolve,
      signal,
      writer,
      writing: Promise.resolve(),
    }

    signal.addEventListener('abort', current.onAbort, { once: true })
    reading = current

    // The request's one buffer, made only now that its body is to be read, while it holds its permits.
    const buffer = new ArrayBuffer(Math.max(1, Math.min(WRITE_BATCH_BYTES, expected)))
    post({ buffer, expected, type: 'read' }, [buffer])
  })

  if (thread.tasks.size === 0) {
    busy(thread)
  }

  thread.tasks.set(id, {
    crash, exit, isClosed: () => isClosed, receive: receiveMessage,
  })

  // A request its thread could not be given was never sent: it is let go at once, for the download to send it itself.
  if (!deliver({
    ca, counts, gate, headers, highWaterMark, paused, timeoutSecs, type: 'send', url, witness,
  })) {
    forget()
    return null
  }

  return {
    broken: new Promise(() => {}),
    closed,
    decision,
    failed: () => failedAs,
    finish: () => {},
    isIntact: () => true,
    readInto,
    received: () => Atomics.load(counts, RECEIVED),
    response,
    stop,
  }
}

// A ready download thread to read a request on, the one with the fewest, as { open(request) } (see open()), while
// download threads are used and the download's thread is set up as they are, https's global agent, the TLS defaults and
// the DNS lookups' default order alike but for the agent's CA certificates, which the request takes along; or null, for
// the request to be sent on the download's own thread. It is told for each request, as it is about to be sent, with
// this thread's setup as it is then.
const laneFor = () => {
  if (disabled) {
    return null
  }

  const ready = threads.filter(thread => thread.ready && thread.alive && !thread.retiring && !thread.failed
    && thread.defaults !== null)

  if (ready.length === 0) {
    return null
  }

  const thread = ready.reduce((least, candidate) => (candidate.tasks.size < least.tasks.size ? candidate : least))
  let current = null

  try {
    current = describeDefaults()
  } catch {
    return null
  }

  if (current === null || !sameDefaults(current, thread.defaults)) {
    return null
  }

  return { open: request => open(thread, { ...request, ca: current.ca }) }
}

// Not public: for the SDK's own tests of its download threads.
const forTests = {
  // Holds the next request given to a download thread there, once the thread has made ready all it needs to send it,
  // and before its last checks of the download's stop, pause and URL, until release(); waiting() tells whether it is
  // held there.
  holdNextSend: () => {
    const gate = new Int32Array(new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT))
    nextSendGate = gate

    return {
      release: () => {
        Atomics.store(gate, 0, 1)
        Atomics.notify(gate, 0)
      },
      waiting: () => Atomics.load(gate, 1) === 1,
    }
  },

  // Makes the download threads, and resolves once both are ready, each kept for at least IDLE_MS more; or rejects when
  // none can be used.
  ready: () => new Promise((resolve, reject) => {
    const watch = () => {
      prepare()

      if (disabled || !canMakeThreads()) {
        readinessWatchers.delete(watch)
        reject(new Error('No download thread can be used'))
        return true
      }

      if (threads.length === MAX_THREADS && threads.every(thread => thread.ready && !thread.retiring)) {
        readinessWatchers.delete(watch)
        threads.filter(thread => thread.tasks.size === 0).forEach(idle)
        resolve()
        return true
      }

      return false
    }

    if (!watch()) {
      readinessWatchers.add(watch)
    }
  }),

  // Lets download threads be used again once every one has stopped.
  restore: async () => {
    await Promise.all(threads.map(thread => thread.exited))
    disabled = false
  },

  // The requests given to download threads and not yet let go, whether they are used, how many are ready, how many
  // requests they have sent in all, and how many of the requests not let go have not closed.
  stats: () => ({
    active: threads.reduce((total, thread) => total + thread.tasks.size, 0),
    disabled,
    ready: threads.filter(thread => thread.ready && !thread.retiring).length,
    sent: sentRequests,
    unclosed: threads.reduce((total, thread) => total
      + Array.from(thread.tasks.values()).filter(task => !task.isClosed()).length, 0),
  }),

  // Stops every download thread at once, as a thread that stops unexpectedly does.
  stop: () => Promise.all(threads.map(thread => thread.worker.terminate().catch(() => {}))),

  // Has the next request given to a download thread there tell, if it breaks while its body is being taken, how it
  // stood then (see breakOff() in DownloadWorker.node.js): state() is null until it has, and then whether its response
  // had been received and parsed to its end (complete), whether some of its body was still to be taken (untaken), and
  // whether a batch of it was waiting to be given back (waitingForBatch).
  watchNextBreak: () => {
    const witness = new Int32Array(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT))
    nextSendWitness = witness

    return {
      state: () => (Atomics.load(witness, 0) === 1
        ? {
          complete: Atomics.load(witness, 1) === 1,
          untaken: Atomics.load(witness, 2) === 1,
          waitingForBatch: Atomics.load(witness, 3) === 1,
        }
        : null),
    }
  },
}

export {
  RECEIVED,
  STOP,
  describeDefaults,
  describeError,
  forTests,
  laneFor,
  prepare,
}
