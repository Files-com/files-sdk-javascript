import { parentPort, workerData } from 'worker_threads'

import {
  RECEIVED, STOP, describeDefaults, describeError,
} from './DownloadWorkers.node.js'
import {
  httpsExchange, isPermanent, pump, silentLog, unanswered,
} from './File.node.js'

// One of the SDK's download threads (see DownloadWorkers.node.js). It sends each request the download's thread gives it,
// with the same httpsExchange() and its budget as that thread would: everything the request needs made ready first, its
// agent included, then one last check of the download's stop, its pause and its URL's expiry, with nothing between that
// check and the request. It takes the request's body with the same pump(), copying it into the request's one buffer,
// which goes back to the download's thread to be written once it is full, and once the body has been taken, and takes no
// more of the body until it comes back. A request that fails while its body is being taken, or whose response closes
// before it is complete, waits for nothing more, however much of its response had been received or taken: its failure
// is its outcome. The thread writes no file, has no file's descriptor or path, and calls none of the caller's callbacks:
// the download's thread does all of that.

// The requests this thread was given and sent, by number, until nothing more can come of them.
const requests = new Map()

// Agents made as https's global agent is here, with the CA certificates of the download thread's agent, by those.
const agents = new Map()

const post = (message, transfer = []) => parentPort.postMessage(message, transfer)

const isStopped = request => request.stopped || Atomics.load(request.counts, STOP) === 1

const isPaused = request => request.paused !== null && Atomics.load(request.paused, 0) === 1

// What a body that closed before its end without an error of its own fails with, as Node.js's own stream utilities name
// it: pump() reports it as the download's incomplete-response error, or as the budget's error when the budget ended it.
const prematureClose = () => Object.assign(new Error('Premature close'), { code: 'ERR_STREAM_PREMATURE_CLOSE' })

// The agent a request goes through: https's global agent here, which the download's thread found set up as its own (see
// laneFor()), or, with ca, CA certificates of that one's, an agent made as this one is but with them, one for each set
// of them, so that its sockets serve every request with the same.
const agentWith = ca => {
  const https = require('https')

  if (ca === undefined) {
    return https.globalAgent
  }

  const { createHash } = require('crypto')
  const hash = createHash('sha256')
  const parts = Array.isArray(ca) ? ca : [ca]

  parts.forEach(part => {
    if (typeof part === 'string') {
      hash.update(`string ${part.length}\n`)
      hash.update(part)
    } else {
      hash.update(`bytes ${part.byteLength}\n`)
      hash.update(new Uint8Array(part.buffer, part.byteOffset, part.byteLength))
    }
  })

  const key = hash.digest('hex')

  if (!agents.has(key)) {
    agents.set(key, new https.Agent({ ...https.globalAgent.options, ca }))
  }

  return agents.get(key)
}

// Lets a request go once nothing more can come of it: once it has closed and its body has been read, or it was
// stopped, or it failed before it was answered.
const forget = request => {
  if (request.closed && (request.outcome || request.toldToStop || request.refused)) {
    requests.delete(request.id)
  }
}

// Tells the request's witness, which only the SDK's own tests give (see forTests in DownloadWorkers.node.js), how the
// request stood as it broke: whether its response had been received and parsed to its end, whether some of its body
// was still to be taken, and whether a batch of it was waiting to be given back.
const witnessBreak = request => {
  const { witness } = request

  if (witness !== null) {
    Atomics.store(witness, 1, request.opened.complete() ? 1 : 0)
    Atomics.store(witness, 2, request.copied < request.expected ? 1 : 0)
    Atomics.store(witness, 3, request.credit === null ? 0 : 1)
    Atomics.store(witness, 0, 1)
  }
}

// The request broke while its body was being taken: its request or response failed, as the body's own error, failure,
// the first the exchange saw (see httpsExchange()), or its budget's running out tells, however much of its response had
// been received, parsed or taken, every byte it was to read included; or, without a failure, its response closed before
// it was complete. No more of it can come, so the waits that would let more of it be taken end, as that failure: a
// batch waiting to be given back is then given up, paused or not, and the body's failure is the request's outcome (see
// read()). A response that closed complete, without a failure, as one does once read to its end, has not broken.
const breakOff = (request, failure) => {
  if (!request.pumping || request.broken !== null) {
    return
  }

  const failed = request.bodyError ?? failure ?? request.opened.failure(null)

  if (failed === null && request.opened.complete()) {
    return
  }

  witnessBreak(request)
  request.failed = failed
  request.broken = failed ?? prematureClose()
  request.credit?.({ broken: true })
  request.resume?.()
}

// Waits, before the request's body is read any further, for the download to be resumed, when it is paused, telling the
// download's thread so; or for it to be stopped, or the request to have broken.
const running = async request => {
  while (!isStopped(request) && request.broken === null && isPaused(request)) {
    post({ task: request.id, type: 'paused' })

    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => { request.resume = resolve })
    request.resume = null
  }
}

// A writer, for pump(), of a request's body into the request's buffer: each chunk is copied into it as it comes, and,
// once it is full, it goes to the download's thread, and nothing more is taken, the rest of the same chunk included,
// until it comes back, the download running; flush() gives what is held, for the last time. Resolves add() and flush()
// with nothing more done once the request has stopped or broken, and fails them when the download's thread could not
// write the batch.
const batchesOf = request => {
  // Gives the buffer, as far as it is filled, to the download's thread, and resolves with whether the request goes on,
  // the buffer back, and, unless it was the last, the download running and the request not broken. The last comes once
  // the body has been taken, to its end or its failure, so that nothing of the request's breaking concerns it.
  const give = async last => {
    const { buffer, filled } = request
    request.buffer = null
    request.filled = 0
    post({
      buffer, last, length: filled, task: request.id, type: 'batch',
    }, [buffer])

    const answer = await new Promise(resolve => { request.credit = resolve })
    request.credit = null

    if (answer.failed) {
      throw new Error('The download could not write a batch of the response')
    }

    if (answer.broken || answer.buffer === undefined) {
      return false
    }

    request.buffer = answer.buffer

    if (last) {
      return !isStopped(request)
    }

    await running(request)
    return !isStopped(request) && request.broken === null
  }

  return {
    add: chunk => {
      if (chunk.length < request.buffer.byteLength - request.filled) {
        new Uint8Array(request.buffer, request.filled, chunk.length).set(chunk)
        request.filled += chunk.length
        request.copied += chunk.length
        return undefined
      }

      return (async () => {
        let taken = 0

        while (taken < chunk.length) {
          const part = Math.min(request.buffer.byteLength - request.filled, chunk.length - taken)
          new Uint8Array(request.buffer, request.filled, part).set(chunk.subarray(taken, taken + part))
          request.filled += part
          request.copied += part
          taken += part

          // eslint-disable-next-line no-await-in-loop
          if (request.filled === request.buffer.byteLength && !(await give(false))) {
            return
          }
        }
      })()
    },
    flush: async () => (request.buffer === null || request.filled === 0 ? !isStopped(request) : give(true)),
  }
}

const stoppedError = () => new Error('Download request stopped')

// The request's outcome, as pump() gave it, for the download's thread.
const settle = (request, {
  error, excludedMs, kind, ok, received,
}) => {
  request.outcome = true
  post({
    error: ok ? null : describeError(error),
    excludedMs,
    kind: ok ? null : kind,
    ok,
    received,
    task: request.id,
    type: 'outcome',
  })

  forget(request)
}

// Sends a request, unless, at this last check, the download has stopped, is paused, or the URL has expired by this
// thread's clock, telling the download's thread either way; then tells it the request's response, or its failure, as
// unanswered() judges it, and once it has closed. Everything the request needs, its agent included, is made ready
// before that check, so that nothing comes between the check and the request. gate, given only by the SDK's own tests
// (see forTests in DownloadWorkers.node.js), holds the request between the two; witness, given only by them too, is
// told how the request stood if it breaks (see breakOff()).
const send = ({
  ca, counts, gate, headers, highWaterMark, paused, task, timeoutSecs, url, witness,
}) => {
  const request = {
    bodyError: null,
    broken: null,
    buffer: null,
    closed: false,
    copied: 0,
    counts,
    credit: null,
    exchange: null,
    expected: 0,
    failed: null,
    filled: 0,
    id: task,
    opened: null,
    outcome: false,
    paused,
    pumping: false,
    refused: false,
    resume: null,
    stopped: false,
    toldToStop: false,
    witness: witness ?? null,
  }

  let agent = null
  let unsent = null

  try {
    agent = agentWith(ca)

    if (gate !== null && gate !== undefined) {
      Atomics.store(gate, 1, 1)
      Atomics.wait(gate, 0, 0)
    }

    if (isStopped(request)) {
      unsent = 'stopped'
    } else if (isPaused(request)) {
      unsent = 'paused'
    } else if (require('../Api.js').default._storageExpired({ url })) {
      unsent = 'expired'
    } else {
      request.exchange = httpsExchange(url, { agent, highWaterMark }, headers, silentLog, timeoutSecs)
    }
  } catch (error) {
    post({
      error: describeError(error), task, terminal: isPermanent(error, url), type: 'unsent', why: 'refused',
    })

    return
  }

  if (unsent !== null) {
    post({ task, type: 'unsent', why: unsent })
    return
  }

  requests.set(task, request)
  post({ task, type: 'sent' })

  request.exchange.response.then(opened => {
    request.opened = opened

    opened.body.on('error', error => {
      if (request.bodyError === null) {
        request.bodyError = error
      }
    })

    post({
      headers: { ...opened.headers }, status: opened.status, statusText: opened.statusText, task, type: 'head',
    })
  }, error => {
    const failed = unanswered(error, url)
    request.refused = true
    post({
      error: describeError(failed.error),
      expired: failed.expired === true,
      task,
      terminal: failed.terminal === true,
      type: 'failed',
      unsent: failed.unsent === true,
    })

    forget(request)
  })

  request.exchange.broken.then(failure => breakOff(request, failure))

  request.exchange.closed.then(() => {
    request.closed = true
    post({ task, type: 'closed' })
    forget(request)
  })
}

// Reads a request's body, expected bytes, as readRangeBytes() in File.node.js reads one, into buffer, the request's one
// buffer, and gives the rest of it to the download's thread once read to its end or broken; ends the request's budget
// once the body has been read and written, or stops the request otherwise; and tells the download's thread the outcome.
// Once the request has broken, as its pause shows pump(), no chunk of it is taken, and the pause's wait ends as the
// body's failure; one that broke with a failure has that failure, its budget's first, as its outcome.
const read = async ({ buffer, expected, task }) => {
  const request = requests.get(task)

  if (request === undefined) {
    post({
      error: describeError(stoppedError()),
      excludedMs: 0,
      kind: 'stopped',
      ok: false,
      received: 0,
      task,
      type: 'outcome',
    })

    return
  }

  request.buffer = buffer
  request.expected = expected
  request.filled = 0

  if (isStopped(request) || request.opened === null) {
    settle(request, {
      error: stoppedError(), excludedMs: 0, kind: 'stopped', ok: false, received: 0,
    })

    return
  }

  const writer = batchesOf(request)
  request.pumping = true

  let outcome = await pump({
    control: {
      _whenRunning: async () => {
        await running(request)

        if (request.broken !== null) {
          throw request.broken
        }
      },
      get paused() {
        return request.broken !== null || isPaused(request)
      },
    },
    expected,
    log: silentLog,
    offset: 0,
    opened: request.opened,
    progress: {
      sent: bytes => {
        Atomics.add(request.counts, RECEIVED, bytes)
      },
    },
    signal: {
      get aborted() {
        return isStopped(request)
      },
      reason: undefined,
    },
    writer,
  })

  request.pumping = false

  // Whatever pump() made of the end of the body that followed a failure the request broke with, it tells nothing of
  // the body: nothing more of it was taken once the request broke, not even the rest of a chunk pump() had counted.
  if (request.failed !== null && (outcome.ok || outcome.kind === 'body')) {
    outcome = {
      ...outcome, error: request.opened.failure(request.failed), kind: 'body', ok: false,
    }
  }

  if (outcome.ok || outcome.kind === 'body') {
    try {
      if (!(await writer.flush())) {
        outcome = {
          ...outcome, error: stoppedError(), kind: 'stopped', ok: false,
        }
      }
    } catch (error) {
      outcome = {
        ...outcome, error, kind: 'terminal', ok: false,
      }
    }
  }

  if (outcome.ok) {
    request.exchange.finish()
  } else {
    request.exchange.stop()
  }

  settle(request, outcome)
}

const credit = ({ buffer, failed, task }) => {
  requests.get(task)?.credit?.(failed ? { failed: true } : { buffer })
}

// The download's thread has stopped the request: it is stopped here at once, and any wait of its body ends.
const stop = ({ task }) => {
  const request = requests.get(task)

  if (request === undefined) {
    return
  }

  request.stopped = true
  request.toldToStop = true
  request.exchange.stop()
  request.credit?.({})
  request.resume?.()
  forget(request)
}

const resume = ({ task }) => {
  requests.get(task)?.resume?.()
}

if (parentPort !== null && workerData?.filesDownloadThread === true) {
  parentPort.on('message', message => {
    switch (message?.type) {
      case 'send':
        send(message)
        break
      case 'read':
        read(message)
        break
      case 'credit':
        credit(message)
        break
      case 'stop':
        stop(message)
        break
      case 'resume':
        resume(message)
        break
      default:
        break
    }
  })

  // The SDK's own judgments of URLs and failures (see send()) are loaded before the thread is ready, so that none of
  // its requests waits for them, and a thread that cannot load them is never used.
  require('../Api.js')
  post({ defaults: describeDefaults(), type: 'ready' })
}
