import fetch from 'cross-fetch'

import Files from './Files'
import * as errors from './Errors'
import Logger, { LogLevel } from './Logger'
import { isEmpty, isObject } from './utils'
import { AttachmentBody, jsonBody } from './utils/attachmentBody'

const abortError = () => {
  const error = new Error('The operation was aborted')
  error.name = 'AbortError'
  return error
}

// What a cancelled call rejects with: its signal's reason, unchanged, whatever it is, falsy values included; or, when
// the runtime gives the signal no reason, an Error named AbortError.
const abortReason = signal => {
  if (signal.reason !== undefined) {
    return signal.reason
  }

  return abortError()
}

// A cancellation on its way to the caller. A signal's reason can be any value, even one an ordinary failure could also
// be, so it travels wrapped until Api._sendVerbatim rejects with the reason itself.
const cancellations = new WeakSet()

const cancellation = signal => {
  const wrapper = { reason: abortReason(signal) }
  cancellations.add(wrapper)
  return wrapper
}

const isCancellation = error => cancellations.has(error)

// A failure that is the call's own error, as it is, such as that of the API request that renews a storage URL (see
// storageRetries). It travels wrapped, so that Api._sendVerbatim rejects with it unchanged rather than with a FilesError
// made of it.
const ownFailures = new WeakSet()

const ownFailure = failure => {
  const wrapper = { failure }
  ownFailures.add(wrapper)
  return wrapper
}

// A response body that is a Node Readable stream, rather than, say, a WHATWG stream.
const isNodeReadable = body => typeof body?.on === 'function' && typeof body.destroy === 'function'

// Resolves once a Node Readable body has an outcome, as its public events and state record it: it has ended, having
// been read to its end, or failed, or closed. It neither reads nor stops the body, and it waits for no abort: whatever
// stops the body brings about the outcome. Its error listener stays, so that a later failure is never an unhandled
// stream error.
const readableOutcome = body => new Promise(resolve => {
  body.on('error', resolve)

  if (body.readableEnded || body.closed) {
    resolve()
  } else {
    body.once('end', resolve)
    body.once('close', resolve)
  }
})

// Whether a response body is a WHATWG stream that can be handed on in a stream of the SDK's own (see watchedStream):
// one no reader holds yet, in a runtime with WHATWG streams.
const isWatchableStream = body => typeof body?.getReader === 'function'
  && !body.locked
  && typeof globalThis.ReadableStream === 'function'

// What a Node.js stream is destroyed with, so that it fails with reason: reason itself whenever it is truthy, an Error or
// any other value, which destroy() keeps as it is; or, for a falsy reason (null, false, 0, NaN, ''), which destroy()
// takes for no error at all and would only close the stream early, an Error named AbortError, with code ABORT_ERR and
// reason as its cause, as Node.js's own addAbortSignal() fails a stream.
const nodeStreamError = reason => reason || Object.assign(new Error('The operation was aborted', { cause: reason }), {
  code: 'ABORT_ERR',
  name: 'AbortError',
})

// The Node.js stream to hand a Node.js body on in, as { stop, stream } (see nodeReadableCarrierOf, in
// isomorphic/File.node.js): one of the SDK's own, which stop(error) fails with error at once, or with the body's own
// error when that came first, and which gives each chunk to observe, when given, as its reader takes it; or, without
// Node.js's own streams, as in a browser bundle, which leaves isomorphic/File.node.js out, the body itself, which
// stop(error) destroys with error.
const nodeCarrierOf = (body, observe = null) => {
  const carrierOf = require('./isomorphic/File.node.js')?.nodeReadableCarrierOf
  return carrierOf ? carrierOf(body, observe) : { stop: error => body.destroy(error), stream: body }
}

// The size of the buffer each default read of a byte stream handed on (see watchedStream) reads its source into.
const BYTE_READ_SIZE = 65536

// A WHATWG stream of body's own data, which reads body only as its own reader asks: never ahead of it, and never once
// it is done with. A byte stream is read with a BYOB reader, so that a source that answers BYOB requests alone works as
// well as one that enqueues its bytes, and is handed on as a byte stream, which BYOB and default readers alike can read:
// each read reads body into a buffer as large as the reader's own, or of BYTE_READ_SIZE for a default reader, so body's
// bytes come as they are, in pieces of at most that size. Any other stream is handed on as one of body's own chunks.
//
// onOutcome() is called once, as soon as body has an outcome: read to its end through this stream; failed, which fails
// this stream with body's own error, even while nothing reads it, observed without reading body; or cancelled by this
// stream's reader, which cancels body with the same reason, unchanged. A body that has closed has no outcome until its
// data has been read through this stream.
//
// stopNow(reason) fails this stream with reason, unchanged, and cancels body with it, unless body has had its outcome
// already, which then stands. stop(reason) reads nothing more of body from then on, and does the same once every
// reaction to body's outcome already queued has run. A failure of body reaches this stream only in such a reaction,
// to its reader's closed promise, which runs as a job of its own after body fails, so a body that failed before the
// stop, even in the same turn, keeps its own error.
//
// The reader this stream holds of body is given up, releasing body's lock, once body has had its outcome and no read
// of it is under way: once read to its end, once failed, and once cancelled, by this stream's reader or a stop, once
// that cancellation has settled. body is then left as its outcome left it, for its owner. giveUp(reason) ends this
// stream as one nobody will read: when no read of body is under way, whether or not some of it has been read through
// this stream, it fails this stream with reason and releases body's lock, leaving body as its reader left it, the rest
// of its data unread and its owner's, neither cancelled nor read further, as it would be had this stream never held it;
// otherwise, a read of body still under way, which nothing will take, it stops it, as stop(reason) does.
//
// observe(chunk), when given, as at DEBUG, sees each chunk of body as this stream's reader is given it, and keeps none.
const watchedStream = (body, onOutcome, observe = null) => {
  let byteReader = null

  try {
    byteReader = body.getReader({ mode: 'byob' })
  } catch {
    // Not a byte stream, which a default reader reads.
  }

  const reader = byteReader ?? body.getReader()
  let streamController = null
  let done = false
  let stopping = false
  let released = false
  let reading = false

  const releaseReader = () => {
    if (!released) {
      released = true

      try {
        reader.releaseLock()
      } catch {
        // A runtime that refuses while a read is under way, which none is by then, leaves body locked, as it was.
      }
    }
  }

  // Gives this stream its outcome: false, doing nothing, when it has had one already.
  const finish = () => {
    if (done) {
      return false
    }

    done = true
    onOutcome()
    return true
  }

  // body has failed, which has failed any read of it under way.
  const fail = error => {
    if (finish()) {
      streamController.error(error)
    }

    releaseReader()
  }

  const stopNow = reason => {
    if (finish()) {
      streamController.error(reason)
      reader.cancel(reason).catch(() => {}).then(releaseReader)
    }
  }

  const stream = new globalThis.ReadableStream({
    ...(byteReader ? { autoAllocateChunkSize: BYTE_READ_SIZE, type: 'bytes' } : {}),
    cancel: reason => {
      finish()
      return reader.cancel(reason).finally(releaseReader)
    },
    pull: async controller => {
      // A read of a byte stream always has a request, its own buffer or one of BYTE_READ_SIZE, to fill. A read once
      // this stream is stopping reads nothing of body, and waits for the stop's outcome.
      const request = byteReader ? controller.byobRequest : null

      if (stopping || (byteReader && !request)) {
        return
      }

      let chunk
      reading = true

      try {
        chunk = await (request ? byteReader.read(new Uint8Array(request.view.byteLength)) : reader.read())
      } catch (error) {
        fail(error)
        return
      } finally {
        reading = false
      }

      // Stopped, cancelled or failed meanwhile, this stream has had its outcome, or is stopping: nothing more of body is
      // given.
      if (done || stopping) {
        return
      }

      if (chunk.done) {
        finish()
        releaseReader()
        controller.close()

        // A read still waiting as a byte stream closes is answered with no bytes, as it must be.
        controller.byobRequest?.respond(0)
        return
      }

      observe?.(chunk.value)

      if (request) {
        request.view.set(chunk.value)
        request.respond(chunk.value.byteLength)
      } else {
        controller.enqueue(chunk.value)
      }
    },
    start: controller => {
      streamController = controller
    },
  }, { highWaterMark: 0 })

  // A failure of body, observed even while nothing reads this stream, and without reading body. A body that closes, or
  // is cancelled, fulfils this instead.
  reader.closed.catch(fail)

  const stop = reason => {
    stopping = true

    // A job queued now runs after every reaction already queued, such as one to a failure of body.
    Promise.resolve().then(() => stopNow(reason))
  }

  return {
    giveUp: reason => {
      if (reading) {
        stop(reason)
        return
      }

      stopping = true

      if (finish()) {
        streamController.error(reason)
      }

      releaseReader()
    },
    stop,
    stopNow,
    stream,
  }
}

// A request's stream body as it is sent at DEBUG, as { body, settle(reason) }: a Node.js stream in a carrier of the
// SDK's own (see nodeCarrierOf); a WHATWG one in a stream of the SDK's own that reads it only as the HTTP client reads
// it, a byte stream as a byte stream, which BYOB and default readers alike can read, its source read with a BYOB
// reader (see watchedStream), each chunk given to observe as it goes and kept by neither. The source's failure, and the
// client's cancellation, reach each other unchanged. settle(reason), once the request has ended, gives up the reader the
// observer holds, so that nothing of the SDK's own goes on holding the caller's stream: a body read to its end, failed
// or cancelled has settled already; one the HTTP client never read, or read only in part and then let go, is let go as
// the HTTP client left it, unlocked, neither cancelled nor read further, the rest of its data its owner's, as it is
// below DEBUG; and one whose read, made for the HTTP client, is still under way, which nothing will take, is cancelled
// with reason. A WHATWG body some reader already holds, or any other body, is sent as it is, and settle() does nothing.
const observedRequestBody = (body, observe) => {
  if (isNodeReadable(body)) {
    return { body: nodeCarrierOf(body, observe).stream, settle: () => {} }
  }

  if (!isWatchableStream(body)) {
    return { body, settle: () => {} }
  }

  const watched = watchedStream(body, () => {}, observe)
  return { body: watched.stream, settle: reason => watched.giveUp(reason) }
}

// One attempt of a request, from sending it, through its redirects, until its response body has been read to its end,
// within one timeout budget of timeoutSecs (no limit when it is 0 or less). The attempt's signal aborts when the
// caller's signal does, or already has, or the budget runs out, which stops the attempt wherever it is: waiting for a
// response, reading one or delivering a body handed on unread. end() releases the timer and the caller's signal and
// stops whatever the attempt still has open. endWithBody(body, complete) hands a body on unread, and returns the stream
// to hand on: the attempt keeps it, budget and signal included, until its outcome, which releases the timer and the
// caller's signal, and stopping the attempt before then fails the stream, as the call has already resolved, with the
// caller's signal's reason or the budget's "Request timed out" FilesError; a complete body, of a response without
// content, has its outcome already.
const startAttempt = (callerSignal, timeoutSecs) => {
  const controller = new AbortController()
  let stoppedBy = null
  let released = false
  let handedOn = false
  let handedCarrier = null
  let handedStream = null
  let timer = null
  let onCallerAbort = null

  // What the attempt's end also settles, once: such as the reader a DEBUG observer holds of the request's own body.
  const endings = []

  const release = () => {
    if (!released) {
      released = true
      clearTimeout(timer)
      callerSignal?.removeEventListener('abort', onCallerAbort)
      endings.splice(0).forEach(ending => ending())
    }
  }

  // What a body handed on fails with when the attempt is stopped: the caller's signal's reason itself (see abortReason),
  // or the budget's "Request timed out" FilesError.
  const stopReason = cause => (cause === 'caller' ? abortReason(callerSignal) : new errors.FilesError('Request timed out'))

  const stop = cause => {
    if (!stoppedBy) {
      stoppedBy = cause
      const reason = stopReason(cause)

      // A body already handed on is stopped as well, and its outcome then releases the attempt. A Node.js body, handed
      // on in a stream of the SDK's own (see nodeCarrierOf), stops with the reason, as nodeStreamError gives it, or with
      // the body's own error when that came first, and the request is aborted at once: the stream fails whatever the
      // body's own destruction waits for, and nothing the body emits from then on, such as an abort error its HTTP client
      // gives it as the request is aborted, reaches the stream's reader. A WHATWG body fails with the reason itself, and
      // its source is cancelled with it, unless it has failed first (see watchedStream). Any other body handed on has
      // nothing more for the attempt to wait for.
      if (handedCarrier) {
        handedCarrier.stop(nodeStreamError(reason))
        controller.abort()
      } else {
        handedStream?.stop(reason)
        controller.abort()

        if (handedOn) {
          release()
        }
      }
    }
  }

  onCallerAbort = () => stop('caller')
  callerSignal?.addEventListener('abort', onCallerAbort)

  if (callerSignal?.aborted) {
    stop('caller')
  } else if (!(timeoutSecs <= 0)) {
    timer = setTimeout(() => stop('timeout'), timeoutSecs * 1000)

    // The budget alone never keeps the process running, as it would for a body its caller leaves unread.
    timer.unref?.()
  }

  return {
    end: () => {
      release()
      controller.abort()
    },

    // A complete body, of a response without content (see hasNoContent), is handed on itself, unread and unchanged, and
    // releases the attempt at once: nothing more of it can arrive, nor be stopped. A Node Readable body is handed on in
    // a Node.js stream of the SDK's own (see nodeCarrierOf), of the same chunks, read only as its reader reads, which
    // stays within the attempt until its outcome: read to its end, failed, or closed or destroyed. A WHATWG stream is
    // handed on in a stream of the attempt's own (see watchedStream), of the same kind and bytes, read only as its
    // reader asks, whose outcome is body's: read to its end, failed, or cancelled by its reader, with its reason. Either
    // outcome is observed before anything can stop the body, and a stop that came first stops it at once. Any other
    // body is handed on itself, and can only be stopped, by the budget or the caller's signal. observe(chunk), when
    // given, as at DEBUG, sees each chunk of a Node.js or WHATWG body as its reader takes it.
    endWithBody: (body, complete = false, observe = null) => {
      handedOn = true

      if (complete) {
        release()
        return body
      }

      if (isNodeReadable(body)) {
        handedCarrier = nodeCarrierOf(body, observe)
        readableOutcome(handedCarrier.stream).then(release)

        if (stoppedBy) {
          handedCarrier.stream.destroy(nodeStreamError(stopReason(stoppedBy)))
        }

        return handedCarrier.stream
      }

      if (isWatchableStream(body)) {
        handedStream = watchedStream(body, release, observe)

        if (stoppedBy) {
          handedStream.stopNow(stopReason(stoppedBy))
        }

        return handedStream.stream
      }

      if (stoppedBy) {
        release()
      }

      return body
    },

    // The error the attempt failed with, named for what stopped it. Only an abort of the attempt's own signal is
    // renamed: the caller's cancellation, or the budget running out. A failure of any other kind keeps its own error,
    // even if the caller's signal aborts after it.
    failure: error => {
      if (!stoppedBy || error?.name !== 'AbortError') {
        return error
      }

      return stoppedBy === 'caller' ? cancellation(callerSignal) : new errors.FilesError('Request timed out')
    },

    // Settles ending() once the attempt ends: when it is ended, or a body it handed on has had its outcome; at once when
    // it already has.
    onEnd: ending => {
      if (released) {
        ending()
      } else {
        endings.push(ending)
      }
    },

    signal: controller.signal,
  }
}

// Waits ms milliseconds before a retry. The call's signal ends the wait at once with its cancellation, and one aborted
// already sets no timer at all.
const waitBeforeRetry = (ms, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) {
    reject(cancellation(signal))
    return
  }

  let timer = null
  const onAbort = () => {
    clearTimeout(timer)
    reject(cancellation(signal))
  }

  timer = setTimeout(() => {
    signal?.removeEventListener('abort', onAbort)
    resolve()
  }, ms)

  signal?.addEventListener('abort', onAbort, { once: true })
})

const FILES_AUTH_HEADERS = [
  'X-FilesAPI-Key',
  'X-FilesAPI-Auth',
  'X-Files-Workspace-Id',
]

const NODE_FETCH_SENSITIVE_HEADERS = [
  'authorization',
  'www-authenticate',
  'cookie',
  'cookie2',
]

const REDIRECT_STATUSES = [301, 302, 303, 307, 308]
const MAX_REDIRECTS = 20

// X-Files-Cursor-Next is the documented next-page cursor; X-Files-Cursor is read only when it is absent.
const nextCursorOf = response => response?.headers?.['x-files-cursor-next'] ?? response?.headers?.['x-files-cursor']

// The page requests of item iterators (Api._iterate), and the requests of actions whose completion can be waited for
// (Api._sendAction and Api._continueAction), keyed by the options object each request is made with. Such a request is
// not auto-paginated: its response goes back to the SDK's own caller, which reads the next cursor from it, if any, and
// so does its operation's context.
const pageResponses = new WeakMap()

// The context of a list operation, { credential, headers, origin }, taken when its first request is made, before
// anything else can change the settings: the site it is sent to, a private copy of its headers, and the credential and
// workspace they send. Every later request of the operation, such as its next pages, is sent with that same context
// (see Api.sendRequest), whatever the settings have become since; a lockout region mismatch moves only its origin (see
// Api._sendVerbatim). It is kept only for the SDK's own copies of the operation's options, keyed by the options object
// of the request it belongs to, never by the caller's own, and the request that continues the operation takes it, so
// that nothing else made with the same options, such as a model's later call, continues the operation.
const operationContexts = new WeakMap()

// The credential a request to the API sends, with the workspace it acts in, as Api.sendRequest chooses them and keeps
// them on the SDK's own copy of the call's options: { name, settings, value, workspace }, the X-FilesAPI-Auth or
// X-FilesAPI-Key header and its value, whether both the credential and the workspace are the settings' own rather than
// the call's, and the X-Files-Workspace-Id it sends, or null for none; or null when the request sends no credential, as
// creating a session does.
const requestCredential = Symbol('requestCredential')

// The workspace a request sends as X-Files-Workspace-Id, as a string, or null when it sends none.
const workspaceOf = workspaceId => (workspaceId !== null && workspaceId !== undefined && `${workspaceId}` !== ''
  ? `${workspaceId}`
  : null)

// Whether two requests send the same credential, in the same workspace.
const isSameCredential = (first, second) => Boolean(first && second
  && first.name === second.name
  && first.value === second.value
  && first.workspace === second.workspace)

// The credential and workspace a request made with config's own would send now: its session, or else its API key, in
// its workspace.
const settingsCredentialOf = config => {
  const workspace = workspaceOf(config.getWorkspaceId())
  const sessionId = config.getSessionId()

  if (sessionId) {
    return { name: 'X-FilesAPI-Auth', value: sessionId, workspace }
  }

  const apiKey = config.getApiKey()
  return apiKey ? { name: 'X-FilesAPI-Key', value: apiKey, workspace } : null
}

// The copies of the global settings that item iterators made without a client request their pages with
// (Files._currentSettings()). A request made with one still points to Files' setters when the API key is missing.
const globalSettingsCopies = new WeakSet()

// Plain objects and arrays: the JSON-like containers that params are made of.
const isContainer = value => Array.isArray(value) || (isObject(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value)))

// A copy of value with its JSON-like containers copied at every depth, such as the sort_by or filter map of list params.
// Any other value, such as a string, a Date or a function, is kept as given, and so is a container where it recurs
// within itself, rather than being copied without end.
const copyContainers = (value, ancestors = new Set()) => {
  if (!isContainer(value) || ancestors.has(value)) {
    return value
  }

  ancestors.add(value)
  const copy = Array.isArray(value)
    ? value.map(item => copyContainers(item, ancestors))
    : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, copyContainers(item, ancestors)]))

  ancestors.delete(value)
  return copy
}

const withoutHeaders = (headers, names) => {
  const normalizedNames = names.map(name => name.toLowerCase())
  return Object.fromEntries(
    Object.entries(headers || {}).filter(([name]) => !normalizedNames.includes(name.toLowerCase())),
  )
}

const isDomainOrSubdomain = (originalUrl, destinationUrl) => {
  const originalHostname = new URL(originalUrl).hostname
  const destinationHostname = new URL(destinationUrl).hostname

  return originalHostname === destinationHostname || destinationHostname.endsWith(`.${originalHostname}`)
}

const isSameProtocol = (firstUrl, secondUrl) => (
  new URL(firstUrl).protocol === new URL(secondUrl).protocol
)

// Reads a response body to its end without keeping it, so that its connection can be used again, and resolves once the
// body's outcome has been observed: ended, failed or closed. A Node Readable body is drained, and a WHATWG stream read
// to its end. signal, its attempt's, never ends that wait: when it has aborted, or aborts first (the budget running out
// or the caller's signal), it stops the body, by destroying or cancelling it, and the wait goes on for the outcome that
// brings about. It never rejects. observe(chunk), when given, as at DEBUG, sees each chunk as it is read, and keeps
// none of them.
const drainResponse = async (response, signal, observe = null) => {
  const { body } = response

  if (isNodeReadable(body)) {
    const outcome = readableOutcome(body)
    const stopBody = () => body.destroy()

    if (signal?.aborted) {
      stopBody()
    } else {
      signal?.addEventListener('abort', stopBody, { once: true })

      if (observe) {
        body.on('data', observe)
      }

      body.resume()
    }

    await outcome
    signal?.removeEventListener('abort', stopBody)
    return
  }

  if (typeof body?.getReader !== 'function' || body.locked) {
    return
  }

  const reader = body.getReader()
  const stopBody = () => {
    reader.cancel().catch(() => {})
  }

  if (signal?.aborted) {
    stopBody()
  } else {
    signal?.addEventListener('abort', stopBody, { once: true })
  }

  try {
    let done = false

    while (!done) {
      // eslint-disable-next-line no-await-in-loop
      const read = await reader.read()
      done = read.done

      if (!done) {
        observe?.(read.value)
      }
    }
  } catch {
    // Stopped, or failed: either way, the body's outcome has been observed.
  } finally {
    signal?.removeEventListener('abort', stopBody)
  }
}

// Reads at most limit bytes of a response's body as text, then stops the body, and resolves once its outcome has been
// observed, as drainResponse does, with that text: so that a refused response is settled within a bounded read, which
// signal, its attempt's, can still stop. A body that fails gives what was read before. It never rejects.
const boundedText = async (response, signal, limit) => {
  const { body } = response
  const chunks = []
  let length = 0

  const keep = chunk => {
    if (length < limit) {
      const view = typeof chunk === 'string' ? new globalThis.TextEncoder().encode(chunk) : chunk
      const kept = view.subarray(0, limit - length)
      chunks.push(kept)
      length += kept.length
    }
  }

  if (isNodeReadable(body)) {
    const outcome = readableOutcome(body)
    const stopBody = () => body.destroy()

    if (signal?.aborted) {
      stopBody()
    } else {
      signal?.addEventListener('abort', stopBody, { once: true })
      body.on('data', chunk => {
        keep(chunk)

        if (length >= limit) {
          stopBody()
        }
      })

      body.resume()
    }

    await outcome
    signal?.removeEventListener('abort', stopBody)
  } else if (typeof body?.getReader === 'function' && !body.locked) {
    const reader = body.getReader()
    const stopBody = () => {
      reader.cancel().catch(() => {})
    }

    signal?.addEventListener('abort', stopBody, { once: true })

    try {
      while (length < limit && !signal?.aborted) {
        // eslint-disable-next-line no-await-in-loop
        const read = await reader.read()

        if (read.done) {
          break
        }

        keep(read.value)
      }

      stopBody()
    } catch {
      // Stopped, or failed: what was read before stands.
    } finally {
      signal?.removeEventListener('abort', stopBody)
    }
  }

  const bytes = new Uint8Array(length)
  let offset = 0

  chunks.forEach(chunk => {
    bytes.set(chunk, offset)
    offset += chunk.length
  })

  return new globalThis.TextDecoder().decode(bytes)
}

// The logger for a call's messages: Logger itself, with the global log settings, for a call made without a client, or
// one with the log level and application logger of the call's client.
const loggerFor = config => (config === Files ? Logger : {
  debug: (...messages) => Logger._log(config, LogLevel.DEBUG, ...messages),
  info: (...messages) => Logger._log(config, LogLevel.INFO, ...messages),
})

// At DEBUG, every response's status and headers, whatever the debugging settings (see Files.configureDebugging()).
const logResponseHead = (response, headers, log) => {
  log.debug(`Status: ${response.status} ${response.statusText}`)
  log.debug('Response Headers: ')
  log.debug(headers)
}

// At DEBUG only, what logs each chunk of a payload stream as its reader takes it, the chunk itself, never a copy kept
// for the log: for config's log settings as they are when the stream is handed on; null below DEBUG, so that nothing is
// done for each chunk.
const payloadObserver = (config, prefix) => {
  if (config.getLogLevel() < LogLevel.DEBUG) {
    return null
  }

  const log = loggerFor(config)
  return chunk => log.debug(prefix, chunk)
}

// Whether a response has no content, whatever body its HTTP client gives it: a 204 No Content, a 205 Reset Content, or
// one whose Content-Length is 0. Such a body is empty and complete: nothing more of it can arrive.
const hasNoContent = (status, headers) => status === 204 || status === 205 || headers['content-length'] === '0'

// A retryable response is discarded within its attempt: its JSON or text body is read only at DEBUG, to log it, and any
// other body is drained to its end, each chunk logged as it is drained at DEBUG. Either way it resolves only once the
// body's outcome has been observed, which the attempt's budget or the caller's signal can bring about by stopping it. A
// body that could not be read is stopped, and its outcome awaited too. A failed read never changes the retry, unless the
// caller's signal stopped it: the call is then cancelled, and nothing is retried.
const logAndDiscardResponse = async (response, config, attempt) => {
  const log = loggerFor(config)
  const headers = Object.fromEntries(response.headers.entries())
  logResponseHead(response, headers, log)

  const contentType = headers['content-type'] || ''
  const isReadable = contentType.includes('application/json') || contentType.includes('text/')

  if (!isReadable || config.getLogLevel() < LogLevel.DEBUG) {
    await drainResponse(response, attempt.signal, payloadObserver(config, 'Response Data: '))
    return
  }

  let failure

  try {
    const body = await response.text()
    log.debug('Response Data: ')
    log.debug(body)
    return
  } catch (error) {
    failure = attempt.failure(error)
  }

  if (isNodeReadable(response.body)) {
    response.body.destroy()
  }

  await drainResponse(response, attempt.signal)

  if (isCancellation(failure)) {
    throw failure
  }

  log.debug(`Unable to read response data: ${failure.message}`)
}

const ABSOLUTE_URL = /^[a-z][a-z\d+.-]*:/i

// An absolute URL that is malformed or whose protocol is not HTTP(S) can never be fetched, so retrying it only
// repeats the same failure. Input that does not parse is permanent only when it starts with a scheme; a relative URL
// is left to the platform to resolve, as before.
const isUnfetchableAbsoluteUrl = url => {
  try {
    return !['http:', 'https:'].includes(new URL(url).protocol)
  } catch {
    return ABSOLUTE_URL.test(url)
  }
}

// Failures that a request would meet again however often it were sent, so that it is never sent again: the redirect
// limit reached, a redirect that cannot be followed, a redirect to a URL that can never be fetched or whose signature
// has expired, or an HTTP client that followed a redirect itself (see fetchWithRedirects). Only an object can be
// recorded here; a request's other failures are recognized by what they are (see isPermanentFailure).
const permanentFailures = new WeakSet()

const permanently = error => {
  if (error !== null && typeof error === 'object') {
    permanentFailures.add(error)
  }

  return error
}

// The codes Node.js gives a TLS certificate that failed verification, on the error itself or, through a WHATWG fetch(),
// on its cause.
const TLS_VERIFICATION_FAILURES = new Set([
  'CERT_CHAIN_TOO_LONG',
  'CERT_HAS_EXPIRED',
  'CERT_NOT_YET_VALID',
  'CERT_REJECTED',
  'CERT_REVOKED',
  'CERT_SIGNATURE_FAILURE',
  'CERT_UNTRUSTED',
  'DEPTH_ZERO_SELF_SIGNED_CERT',
  'ERR_TLS_CERT_ALTNAME_INVALID',
  'HOSTNAME_MISMATCH',
  'INVALID_CA',
  'INVALID_PURPOSE',
  'PATH_LENGTH_EXCEEDED',
  'SELF_SIGNED_CERT_IN_CHAIN',
  'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
  'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
  'UNABLE_TO_GET_ISSUER_CERT',
  'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
])

// The codes of network failures that show a request never reached its server: its host was not found, or refused the
// connection. They show nothing of the kind for a failure that came once its server had answered it with a redirect
// (see the answered state of an attempt, in fetchWithRedirects).
const UNSENT_FAILURES = new Set(['EAI_AGAIN', 'ECONNREFUSED', 'ENOTFOUND'])

const failureCodeOf = failure => failure?.code ?? failure?.cause?.code

// The longest wait a timer can be set for, in milliseconds, in Node.js and browsers alike. A longer one would fire at
// once instead.
const MAX_TIMER_MS = 2147483647

// Whether a wait of ms milliseconds can be scheduled as it is: finite, not negative, and no longer than a timer allows.
// A wait that cannot is never shortened to one that can.
const isSchedulable = ms => Number.isFinite(ms) && ms >= 0 && ms <= MAX_TIMER_MS

// Failures of an attempt whose target was found to have expired as it was to be sent, once every caller callback of
// that send had run: nothing of it was sent, and a renewal can still give the attempt another target (see
// fetchWithRetry).
const expiredAtDispatch = new WeakSet()

// Whether a request to url that failed with failure, without a response, would fail the same way if sent again: its URL
// can never be fetched, its server's TLS certificate failed verification, or the failure is one of permanentFailures.
// Nothing else is, an opaque failure such as a browser's TypeError included.
const isPermanentFailure = (failure, url) => permanentFailures.has(failure)
  || isUnfetchableAbsoluteUrl(url)
  || TLS_VERIFICATION_FAILURES.has(failureCodeOf(failure))

// A status that may be different when the request is sent again: 429 Too Many Requests, or a server error other than
// 501 Not Implemented.
const isTransientStatus = status => status === 429 || (status >= 500 && status !== 501)

// How a request is retried, within the settings' maxNetworkRetries, once its attempt has failed with a network failure
// that is not permanent, has run out of time before its response arrived, or has a transient status: whether it may be,
// by mayRetryFailure(failure, answered) or mayRetryStatus(status, answered), where answered tells whether the request's
// server had already answered it in that attempt, with a redirect the SDK then followed; and how long to wait first,
// delayMs(config, retries, response), for its retries'th retry, which is not retried at all when that wait cannot be
// scheduled. If given, beforeSend(url, options, signal, { previousFailure, retries }) resolves before each attempt, the
// first included, once any wait for it is over, with the URL and options to send it with, or rejects instead of
// sending it; and beforeDispatch(url, hop) checks each request of an attempt, its redirects included, as it is about
// to be sent, throwing instead of sending it.
//
// The API's requests, every method alike, wait the settings' minNetworkRetryDelay before their first retry and twice as
// long before each one after it, up to maxNetworkRetryDelay: by default, 100, 200 and 400 ms.
const apiRetries = {
  delayMs: (config, retries) => (
    Math.min(config.getMinNetworkRetryDelay() * 2 ** retries, config.getMaxNetworkRetryDelay()) * 1000
  ),
  mayRetryFailure: () => true,
  mayRetryStatus: isTransientStatus,
}

// An API request whose outcome must be known, such as an upload's finalization, which must never be repeated blindly,
// is retried only after a failure that shows it was not carried out: a 429, or a network failure before it reached the
// server, each only when the server had not already answered the request with a redirect. A server error, a broken
// connection, an attempt that ran out of time, or any failure or status once its server had answered with a redirect,
// leaves its outcome unknown, and the request fails with that failure or status.
const unambiguousApiRetries = {
  ...apiRetries,
  mayRetryFailure: (failure, answered) => !answered && UNSENT_FAILURES.has(failureCodeOf(failure)),
  mayRetryStatus: (status, answered) => !answered && status === 429,
}

// The wait, in milliseconds, that a Retry-After header asks for, as a number of seconds or a date, however long; or null
// when it asks for none that can be read. A wait too long to schedule is given as it is, never shortened, and so fails
// the request rather than retrying it early (see isSchedulable).
const retryAfterMs = value => {
  const given = typeof value === 'string' ? value.trim() : ''

  if (/^\d+$/.test(given)) {
    return Number(given) * 1000
  }

  const time = given === '' ? NaN : Date.parse(given)
  return Number.isFinite(time) ? Math.max(0, time - Date.now()) : null
}

// The query parameters of a signed storage URL that give when it was signed and for how many seconds it is valid: S3's,
// Files.com's and Google Cloud Storage's.
const SIGNED_URL_VALIDITIES = [
  ['x-amz-date', 'x-amz-expires'],
  ['x-files-date', 'x-files-expires'],
  ['x-goog-date', 'x-goog-expires'],
]

// A time a signature gives, in milliseconds: in the basic ISO 8601 form signatures use, such as 20261019T120000Z, or in
// any form Date.parse() reads; or null.
const signedTimeOf = value => {
  const basic = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value ?? '')

  if (basic) {
    const [year, month, day, hours, minutes, seconds] = basic.slice(1).map(Number)
    return Date.UTC(year, month - 1, day, hours, minutes, seconds)
  }

  const time = Date.parse(value ?? '')
  return Number.isFinite(time) ? time : null
}

// When a signed URL expires, in milliseconds, by its own query: its signing time plus its seconds, or, for an Azure
// shared access signature, its se; the earliest, when it gives several; or null when it gives none.
const signedUrlExpiryOf = url => {
  let query
  try {
    query = [...new URL(url).searchParams.entries()]
  } catch {
    return null
  }

  const parameter = name => query.find(([key]) => key.toLowerCase() === name)?.[1] ?? null
  const expiries = SIGNED_URL_VALIDITIES.map(([dateName, secondsName]) => {
    const signedAt = signedTimeOf(parameter(dateName))
    const seconds = parameter(secondsName) ?? ''

    return signedAt !== null && /^\d+$/.test(seconds) ? signedAt + Number(seconds) * 1000 : null
  })

  if (parameter('sig') !== null) {
    expiries.push(signedTimeOf(parameter('se')))
  }

  const known = expiries.filter(expiry => expiry !== null)
  return known.length > 0 ? Math.min(...known) : null
}

// When a storage target expires, in milliseconds: the earlier of the expires the API gave for it, if any, and its URL's
// own; or null when neither is known.
const expiryOf = target => {
  const given = typeof target.expires === 'string' ? Date.parse(target.expires) : NaN
  const known = [Number.isFinite(given) ? given : null, signedUrlExpiryOf(target.url)].filter(expiry => expiry !== null)

  return known.length > 0 ? Math.min(...known) : null
}

const hasExpired = target => {
  const expiry = expiryOf(target)
  return expiry !== null && expiry <= Date.now()
}

// The headers of a request to storage: those given, never the API's credentials or workspace.
const storageHeadersOf = headers => withoutHeaders(headers, FILES_AUTH_HEADERS)

// Every error that a request to storage known to have expired fails with, so that the transfer owning it can renew its
// URL (see storageAttempt).
const expiredUrlErrors = new WeakSet()

const expiredUrlError = () => {
  const error = new errors.FilesError('The signed URL had expired before the request could be sent')
  expiredUrlErrors.add(error)
  return error
}

// Those of them that a download's one attempt failed with before any of its requests was sent (see
// Api._openStorageDownload), so that its transfer can renew the URL without counting the attempt as sent.
const unsentExpiries = new WeakSet()

// How a request to storage, to target ({ agent, expires, headers, method, replay, url }, see Api._sendStorageRequest),
// is retried, separately from the API's requests: a 429 or 503 after the wait its Retry-After asks for, or at once
// without one, so that its signed URL is not left to expire; anything else after 100 ms. With replay false, as when an
// upload's part may not be sent again, it is never retried, and its failure is the caller's to handle.
//
// A target known to have expired, by the API's expires for it or its URL's own signature, whichever is earlier, is
// never sent. That is checked before each attempt, the first included, once any wait for it is over, and again for
// each request of the attempt, its redirects included, as it is about to be sent, once every caller callback of that
// send has run. For an expired target, renew(), when given, resolves with a target to send the request to instead, or
// null for none: at most once for the request's first send and once for each retry, whether its target was found
// expired before the attempt or as its first request was about to be sent. Without a target that has not expired, as
// when the renewed one has expired already, or expires again before that send or retry is made, the request fails
// without being sent. A target found expired as an attempt's first request was about to be sent sent nothing: the
// attempt is made once more, as the same send or retry, to renew it, and that new attempt has a budget of its own
// (see fetchWithRetry). A redirect to an expired URL is never followed. A failure of renew() is the request's, as it
// is.
//
// A retry sends the request's bytes again, which only the target it is then sent to can allow: when a renewal gives
// one with replay false, the request is not sent again, and fails as its last attempt did.
const storageRetries = (target, renew) => {
  let current = target

  // The send or retry, by its retries, that a renewal was last made for, and the one whose attempt was last made once
  // more after its target was found expired as it was to be sent, so that neither happens more than once for the
  // request's first send or any one retry.
  let renewedFor = null
  let redispatchedFor = null

  return {
    // Each request of an attempt, as it is sent: url is its actual URL, the target's own at hop 0, a redirect's after.
    beforeDispatch: (url, hop) => {
      if (!hasExpired({ expires: current.expires, url })) {
        return
      }

      const error = expiredUrlError()

      if (hop === 0) {
        expiredAtDispatch.add(error)
        throw error
      }

      throw permanently(error)
    },

    beforeSend: async (url, options, signal, { previousFailure, retries }) => {
      let next = { options, url }

      if (hasExpired(current)) {
        if (!renew || renewedFor === retries) {
          throw expiredUrlError()
        }

        renewedFor = retries
        let renewed = null

        try {
          renewed = await renew()
        } catch (error) {
          throw signal?.aborted ? cancellation(signal) : ownFailure(error)
        }

        if (signal?.aborted) {
          throw cancellation(signal)
        }

        if (!renewed || hasExpired(renewed)) {
          throw expiredUrlError()
        }

        current = renewed
        next = {
          options: {
            ...options,
            agent: renewed.agent,
            headers: storageHeadersOf(renewed.headers),
            method: renewed.method,
          },
          url: renewed.url,
        }
      }

      if (retries > 0 && current.replay === false) {
        throw previousFailure
      }

      return next
    },

    delayMs: (config, retries, response) => {
      if (response?.status === 429 || response?.status === 503) {
        return retryAfterMs(response.headers.get('retry-after')) ?? 0
      }

      return 100
    },
    mayRetryFailure: () => current.replay !== false,
    mayRetryStatus: status => current.replay !== false && isTransientStatus(status),

    // Whether an attempt, by its retries, whose target was found expired as it was to be sent, may be made once more,
    // which renews its target unless a renewal has been made for those retries already.
    redispatch: retries => {
      if (!renew || redispatchedFor === retries) {
        return false
      }

      redispatchedFor = retries
      return true
    },
  }
}

// How one attempt of a request to storage is sent when the transfer that makes it owns its retries, renewals and
// replay permission (see Upload.js and isomorphic/File.node.js), so that no retry loop runs inside another: never
// retried here, and never sent once target is known to have expired, before the attempt or as each of its requests,
// redirects included, is about to be sent. Such an expiry fails it with the expired-URL FilesError, the redirect never
// followed. dispatched records, for good, whether any request of the attempt has been handed to its HTTP client: once
// one has, the attempt may have been carried out, whatever becomes of it after, an expired redirect's refusal
// included, and only an attempt that sent nothing is unsent, for its owner to renew without counting it as sent.
const storageAttempt = target => {
  const policy = {
    beforeDispatch: url => {
      if (hasExpired({ expires: target.expires, url })) {
        throw expiredUrlError()
      }
    },

    beforeSend: async (url, options) => {
      if (hasExpired(target)) {
        throw expiredUrlError()
      }

      return { options, url }
    },

    delayMs: () => 0,
    dispatched: false,
    mayRetryFailure: () => false,
    mayRetryStatus: () => false,

    onDispatch: () => {
      policy.dispatched = true
    },
  }

  return policy
}

// The request option, on the SDK's own copy of a call's options, with the policy its requests are retried by (see
// apiRetries), when it is not the API's.
const retryPolicy = Symbol('retryPolicy')

// The request option, on the SDK's own copy of a call's options, that has a call whose caller has no use for the body
// it would return unread, such as an upload part's acknowledgement, drain that body, or stop it, and observe its outcome
// within its attempt, before resolving (see Api._sendStorageRequest).
const settlingBody = Symbol('settlingBody')

// The request option, on the SDK's own copy of a call's options, that makes a call to storage one attempt whose outcome
// its transfer classifies itself (see Api._sendStorageAttempt): it resolves with any response's status and headers, its
// body settled, a refused response's text read within REFUSED_TEXT_BYTES, or with the failure of an attempt that had
// no response, instead of rejecting.
const singleAttempt = Symbol('singleAttempt')

// The most of a refused storage response's body read, to classify it and, at DEBUG, to log it.
const REFUSED_TEXT_BYTES = 64 * 1024

// Whether a request body is a stream, which a WHATWG fetch() sends only with duplex: 'half'.
const isStreamBody = body => typeof body?.pipe === 'function' || typeof body?.getReader === 'function'

const REGION_MISMATCH_TYPE = 'not-authenticated/lockout-region-mismatch'
const LEGACY_REGION_MISMATCH_PREFIX = 'You have connected to a URL'

// The host a lockout region mismatch names, as { host }, with host null when it names none, or null for any other
// response. A mismatch is a 403: the typed not-authenticated/lockout-region-mismatch error, whose host is its data.host
// or else its X-Files-Host header, or the legacy plain-text one that begins "You have connected to a URL" and names its
// host in X-Files-Host, without which it is not one.
const regionMismatchOf = (status, headers, data) => {
  if (status !== 403) {
    return null
  }

  const headerHost = headers['x-files-host'] || null
  const errorData = Array.isArray(data) ? data[0] : data

  if (typeof errorData === 'object' && errorData !== null && errorData.type === REGION_MISMATCH_TYPE) {
    const dataHost = errorData.data?.host
    return { host: (typeof dataHost === 'string' && dataHost) || headerHost }
  }

  if (typeof data === 'string' && data.startsWith(LEGACY_REGION_MISMATCH_PREFIX) && headerHost) {
    return { host: headerHost }
  }

  return null
}

// The HTTPS origin of the host a mismatch names, such as https://mysite.files.com for mysite.files.com, or null when it
// is not one: a host with credentials, a path, a query or a fragment, or one of another protocol, http included.
const regionOriginOf = host => {
  if (typeof host !== 'string' || host === '') {
    return null
  }

  let url
  try {
    url = new URL(ABSOLUTE_URL.test(host) ? host : `https://${host}`)
  } catch {
    return null
  }

  const isOriginOnly = url.pathname === '/' && !url.search && !url.hash && !url.username && !url.password
  return url.protocol === 'https:' && isOriginOnly ? url.origin : null
}

// Files.com's own hosts, which a mismatch may move a request's credentials to without asking: files.com and its
// subdomains, on the default HTTPS port.
const isFilesComOrigin = origin => {
  const { hostname, port } = new URL(origin)
  return port === '' && (hostname === 'files.com' || hostname.endsWith('.files.com'))
}

// Whether a request body can be sent again as it was: an attachment body that can still be replayed, or any body that
// is not a stream.
const canResend = body => {
  if (body instanceof AttachmentBody) {
    return body.canReplay()
  }

  return !(typeof body?.pipe === 'function' || typeof body?.getReader === 'function')
}

// Why a lockout region mismatch from from, the origin its request was sent to, is not followed, or null when it is.
const regionRefusalOf = ({ approved, host, origin }, from, config, retries, body) => {
  if (!host) {
    return 'no-host'
  }

  if (!approved) {
    return 'untrusted-host'
  }

  if (origin === from) {
    return 'same-host'
  }

  if (config.getFollowRegionMismatch() === false) {
    return 'disabled'
  }

  if (retries >= config.getMaxNetworkRetries()) {
    return 'retry-budget'
  }

  if (!canResend(body)) {
    return 'body-not-replayable'
  }

  return null
}

// What becomes of a lockout region mismatch from from, the origin its request was sent to, as its retries'th retry:
// its details, as the error keeps them when it is not followed, and whether it is followed, to origin. Only an HTTPS
// host is ever trusted: a Files.com host, or one the settings' trustRegionHost(origin, from) returns true for.
const regionRouteOf = (mismatch, from, config, retries, body) => {
  const origin = regionOriginOf(mismatch.host)
  const trustRegionHost = config.getTrustRegionHost()
  const approved = origin !== null
    && (isFilesComOrigin(origin) || (typeof trustRegionHost === 'function' && trustRegionHost(origin, from) === true))

  const reason = regionRefusalOf({ approved, host: mismatch.host, origin }, from, config, retries, body)

  return {
    details: {
      approved,
      from,
      host: mismatch.host,
      origin,
      reason,
    },
    follow: reason === null,
    origin,
  }
}

// Resolves with the response; url, the URL it answered: the last request's, once every redirect is followed; and
// crossedOrigin, whether any redirect on the way led to another origin, which the credentials were left behind at, even
// when a later one led back. transport is { getAgentForUrl, send, whenSendable }: send(url, init), the HTTP client's
// fetch(), sends each request, redirects included, with the agent getAgentForUrl or the options choose for its URL as
// init.agent. It is called as a function, as fetch() itself is, never as a method of transport, which a browser's own
// fetch() refuses as its receiver; a fetch bound to a receiver of its own keeps it. whenSendable(url, signal), when
// given, by a transfer that owns the request (see Api._openStorageDownload), decides for each request, a redirect's
// included, once every caller callback of that send, its agent's choice included, has run, whether it may be sent now:
// it gives nothing when it may; a promise to wait for while the transfer is paused, after which it is asked again; and
// it throws, so that nothing is sent, once the transfer has stopped or signal, the attempt's, has aborted. The decision
// that lets the request go, then the expiry check, are made in the same turn as the request is handed to the HTTP
// client, with nothing awaited between them, so that nothing queued meanwhile can change what was decided.
//
// Only the SDK follows redirects, so that credentials never cross to another origin: each request is sent with
// redirect: 'manual', and a response that its HTTP client reports as redirected, having followed a redirect itself,
// fails the request.
//
// progress is what the attempt has come to: progress.beforeDispatch(url, hop), if given, checks each request as it is
// about to be sent, once every caller callback of that send has run, and throws instead of sending it (see
// storageRetries); progress.onDispatch(), if given, records each request handed to the HTTP client, before it is (see
// storageAttempt); progress.answered becomes true once the request's server has answered it with a redirect that is
// followed, so that what becomes of the request after that is never taken to show that it was not carried out.
const fetchWithRedirects = async (url, options, transport, progress, redirectCount = 0, crossedOrigin = false) => {
  const agent = transport.getAgentForUrl?.(url) || options.agent || options.httpsAgent || options.httpAgent
  const redirectMode = options.redirect || 'follow'
  const init = {
    ...options,
    agent,
    redirect: redirectMode === 'follow' ? 'manual' : redirectMode,
    ...(isStreamBody(options.body) ? { duplex: 'half' } : {}),
  }

  if (transport.whenSendable) {
    let wait = transport.whenSendable(url, options.signal)

    while (wait) {
      // eslint-disable-next-line no-await-in-loop
      await wait
      wait = transport.whenSendable(url, options.signal)
    }
  }

  // From the decision above to handing the request to the HTTP client, nothing is awaited.
  progress.beforeDispatch?.(url, redirectCount)
  progress.onDispatch?.()

  const { send } = transport
  let response

  try {
    response = await send(url, init)
  } catch (error) {
    // A redirect to a URL that can never be fetched fails the same way however often it is followed.
    throw redirectCount > 0 && isUnfetchableAbsoluteUrl(url) ? permanently(error) : error
  }

  if (response.redirected === true) {
    await drainResponse(response, options.signal)
    throw permanently(new errors.FilesError('The HTTP client followed a redirect itself: it must leave redirects to the SDK'))
  }

  const location = response.headers.get('location')

  if (redirectMode !== 'follow' || !REDIRECT_STATUSES.includes(response.status) || !location) {
    return { crossedOrigin, response, url }
  }

  // The server has answered the request: it may have carried it out, whatever its redirect leads to.
  // eslint-disable-next-line no-param-reassign
  progress.answered = true

  const maxRedirects = options.follow ?? MAX_REDIRECTS

  // A redirect that fails here keeps its own error, which it fails with only once its body's outcome has been observed,
  // within the attempt.
  if (redirectCount >= maxRedirects) {
    await drainResponse(response, options.signal)
    throw permanently(new errors.FilesError(`maximum redirect reached at: ${url}`))
  }

  // A Location that is not a URL, such as http://[::1, leads nowhere however often it is followed.
  let redirectUrl

  try {
    redirectUrl = new URL(location, url).toString()
  } catch {
    await drainResponse(response, options.signal)
    throw permanently(new errors.FilesError(`Invalid redirect location at: ${url}`))
  }

  const staysInOrigin = new URL(url).origin === new URL(redirectUrl).origin
  let redirectedHeaders = staysInOrigin
    ? options.headers
    : withoutHeaders(options.headers, FILES_AUTH_HEADERS)

  if (!isDomainOrSubdomain(url, redirectUrl) || !isSameProtocol(url, redirectUrl)) {
    redirectedHeaders = withoutHeaders(redirectedHeaders, NODE_FETCH_SENSITIVE_HEADERS)
  }

  const redirectedOptions = {
    ...options,
    headers: redirectedHeaders,
  }

  const method = (redirectedOptions.method || 'GET').toUpperCase()

  if (response.status !== 303 && redirectedOptions.body && typeof redirectedOptions.body.pipe === 'function') {
    await drainResponse(response, options.signal)
    throw permanently(new errors.FilesError('Cannot follow redirect with body being a readable stream'))
  }

  if (response.status === 303 || ([301, 302].includes(response.status) && method === 'POST')) {
    redirectedOptions.method = 'GET'
    delete redirectedOptions.body
    redirectedOptions.headers = withoutHeaders(redirectedOptions.headers, ['content-length'])
  }

  // The redirect's own body reaches its outcome, within the attempt, before its next request is sent; and once the
  // attempt has been stopped, none is.
  await drainResponse(response, options.signal)

  if (options.signal?.aborted) {
    throw abortError()
  }

  // A chain that has once led to another origin has crossed one, wherever it leads afterwards.
  return fetchWithRedirects(redirectUrl, redirectedOptions, transport, progress, redirectCount + 1, crossedOrigin || !staysInOrigin)
}

// config is the client that made the call, or Files for the global settings; transport, the HTTP client and agent
// choice its requests are sent with (see fetchWithRedirects); and policy, how it is retried (see apiRetries). Resolves
// with the response and the attempt it belongs to, which is still running, so that the response is read within the
// attempt's budget; the caller must end() it, or endWithBody() it with the body it returns unread. It also resolves with
// responseUrl, the URL that answered, redirects included; crossedOrigin, whether a redirect led to another origin on the
// way, even when a later one led back; and retries, the retry the attempt was, which a lockout region mismatch's reroute
// continues from, so that every retry of a call shares one budget. Each retry is an attempt with a budget of its own,
// and waiting between attempts counts toward none. previousFailure is what the attempt before, if any, failed with,
// which the call fails with when its policy refuses, once that wait is over, to send it again (see storageRetries).
const fetchWithRetry = async (givenUrl, givenOptions, retries, transport, config, policy, previousFailure) => {
  const log = loggerFor(config)
  const maxRetries = config.getMaxNetworkRetries()

  // A call whose own signal has been aborted starts no attempt.
  if (givenOptions.signal?.aborted) {
    throw cancellation(givenOptions.signal)
  }

  // Where each attempt is sent, and with what, is decided only now, once any wait before it is over (see
  // storageRetries).
  const { options, url } = policy.beforeSend
    ? await policy.beforeSend(givenUrl, givenOptions, givenOptions.signal, { previousFailure, retries })
    : { options: givenOptions, url: givenUrl }

  const { timeoutSecs, ...requestOptions } = options
  const { signal } = requestOptions

  // reason is a short classification, such as 'HTTP 503' or 'a network error'; details stay in the DEBUG log. failure
  // is what the attempt failed with.
  const retry = async (reason, delayMs, failure) => {
    // A retry is decided only here, once the failed attempt is done with, its discarded response included, whatever
    // that took or called. A call whose own signal has been aborted by then, by anything, is neither logged as retried
    // nor retried: it is cancelled.
    if (signal?.aborted) {
      throw cancellation(signal)
    }

    const nextRetries = retries + 1
    log.info(`Retrying request (retry ${nextRetries} of ${maxRetries}) in ${delayMs} ms after ${reason}`)

    // That log reaches the application's logger, which may itself cancel the call: the wait then never begins, and an
    // abort while it lasts ends it at once.
    await waitBeforeRetry(delayMs, signal)

    return fetchWithRetry(url, options, nextRetries, transport, config, policy, failure)
  }

  // A wait for a retry that cannot be scheduled, such as a Retry-After of weeks, is never shortened: the request is not
  // retried, and fails as its attempt did.
  const isUnschedulable = delayMs => {
    if (isSchedulable(delayMs)) {
      return false
    }

    log.info(`Request #${retries + 1} is not retried because its wait of ${delayMs} ms cannot be scheduled`)
    return true
  }

  // Nor does one whose signal aborted while its attempt was being prepared.
  if (signal?.aborted) {
    throw cancellation(signal)
  }

  log.debug(`Sending request #${retries + 1}: ${requestOptions.method} ${url}`)
  log.debug('Sending options:', requestOptions)

  // Those logs reach the application's logger, which may itself cancel the call: then no request is sent either.
  if (signal?.aborted) {
    throw cancellation(signal)
  }

  const attempt = startAttempt(signal, timeoutSecs)

  // A body with attachments is encoded afresh for each attempt, and stops with it.
  const attachmentBody = requestOptions.body instanceof AttachmentBody ? requestOptions.body : null
  const attachmentAttempt = attachmentBody?.open(attempt.signal)

  // What the attempt has come to as its requests are sent (see fetchWithRedirects).
  const progress = { answered: false, beforeDispatch: policy.beforeDispatch, onDispatch: policy.onDispatch }

  // At DEBUG, a stream body is sent in a stream of the SDK's own that logs each chunk as the HTTP client reads it (see
  // observedRequestBody), which gives up the caller's stream once the attempt has ended, however it ends: a body the
  // HTTP client read to its end, or cancelled, has settled already.
  const observeRequest = payloadObserver(config, 'Request Data: ')

  const sentBody = body => {
    if (!observeRequest || !isStreamBody(body)) {
      return body
    }

    const observed = observedRequestBody(body, observeRequest)
    attempt.onEnd(() => observed.settle(abortError()))
    return observed.body
  }

  let crossedOrigin
  let response
  let responseUrl
  try {
    let attemptOptions = attachmentAttempt
      ? { ...requestOptions, body: sentBody(attachmentAttempt.body), signal: attachmentAttempt.signal }
      : { ...requestOptions, signal: attempt.signal }

    if (!attachmentAttempt && observeRequest && isStreamBody(requestOptions.body)) {
      attemptOptions = { ...attemptOptions, body: sentBody(requestOptions.body) }
    }

    const received = await fetchWithRedirects(url, attemptOptions, transport, progress)
    crossedOrigin = received.crossedOrigin
    response = received.response
    responseUrl = received.url
  } catch (error) {
    attachmentAttempt?.abort()
    attempt.end()
    log.info(`Request #${retries + 1} failed`)
    log.debug(`Request #${retries + 1} failed: ${error?.message ?? error}`)

    // An attachment that could not be read or encoded is the request's error, rather than the aborted request.
    if (attachmentAttempt?.failure) {
      throw attachmentAttempt.failure
    }

    // Cancelled by the caller's signal while under way, the call is over. An attempt that ran out of time is retried as
    // a network failure is.
    const failure = attempt.failure(error)

    if (isCancellation(failure)) {
      throw failure
    }

    // A target found expired as it was to be sent sent nothing: the attempt is made once more, as the same send or
    // retry, which renews its target, if its policy can. That attempt, like any, starts a budget of its own; the one
    // that ended here had sent nothing.
    if (expiredAtDispatch.has(failure)) {
      if (policy.redispatch?.(retries)) {
        return fetchWithRetry(url, options, retries, transport, config, policy, previousFailure)
      }

      throw failure
    }

    if (retries >= maxRetries || isPermanentFailure(failure, url) || !policy.mayRetryFailure(failure, progress.answered)) {
      throw failure
    }

    // A stream that has been read cannot be sent again, so the request fails with its original error.
    if (attachmentBody && !attachmentBody.canReplay()) {
      log.info(`Request #${retries + 1} is not retried because an attachment stream has already been read`)
      throw failure
    }

    if (!attachmentBody && !canResend(requestOptions.body)) {
      throw failure
    }

    const failureDelayMs = policy.delayMs(config, retries, null)

    if (isUnschedulable(failureDelayMs)) {
      throw failure
    }

    return retry('a network error', failureDelayMs, failure)
  }

  // A request of any method that was rate limited or hit a transient server error is sent again within the same retry
  // budget, unless its policy leaves it, as it does once the request's server has answered it with a redirect when its
  // outcome must be known, or its body cannot be sent again. Nor is it retried once the call's own signal has been
  // aborted: the abort has already stopped the attempt, so reading its response then fails as the call's cancellation.
  // An abort after the response has been discarded is retry()'s to stop.
  const mayRetry = policy.mayRetryStatus(response.status, progress.answered)
    && retries < maxRetries
    && !signal?.aborted
    && canResend(requestOptions.body)

  const statusDelayMs = mayRetry ? policy.delayMs(config, retries, response) : null

  if (mayRetry && !isUnschedulable(statusDelayMs)) {
    log.info(`Request #${retries + 1} failed with HTTP ${response.status}`)

    // What the attempt failed with, should the request not be sent again after all (see storageRetries).
    const failure = {
      response: {
        data: undefined,
        headers: Object.fromEntries(response.headers.entries()),
        reason: response.statusText,
        status: response.status,
      },
    }

    // The discarded body's outcome is observed within its attempt, whether it was read, drained or stopped, before the
    // attempt ends and a retry may start.
    try {
      await logAndDiscardResponse(response, config, attempt)
    } finally {
      attempt.end()
    }

    return retry(`HTTP ${response.status}`, statusDelayMs, failure)
  }

  return {
    attempt,
    crossedOrigin,
    response,
    responseUrl,
    retries,
  }
}

// The option of a storage download (see Api._openStorageDownload) by which the download itself chooses each request's
// agent from its URL, redirects included, and alone: no client's chooser is asked besides, so that the agent the
// download chose for a URL before its last checks, none included, is the one the request is sent with.
const downloadAgents = Symbol('downloadAgents')

// The option of a storage download by which the download lets each of its requests go, a redirect's included, once
// every caller callback of that send has run, deciding in the same turn as the request is handed to the HTTP client
// (see whenSendable in fetchWithRedirects): while it is paused, the request waits; once it has stopped, it is not sent.
const downloadGate = Symbol('downloadGate')

// The transport of a call's requests (see fetchWithRedirects), made with config, its client or Files, client, if any,
// and its own fetch, getAgentForUrl and other options. Each request's agent, redirects included, is the one the call's
// own getAgentForUrl, agent, httpsAgent and httpAgent choose for its URL; only when they choose none do the client's
// settings. Each request is sent by the call's own fetch, or else its settings', or else the SDK's own, cross-fetch.
const transportOf = (config, client, callFetch, getAgentForUrl, options) => {
  const clientAgentChooser = client?._agentChooser()
  const agentForUrl = clientAgentChooser && !(options.agent || options.httpsAgent || options.httpAgent)
    ? requestUrl => getAgentForUrl?.(requestUrl) || clientAgentChooser(requestUrl)
    : getAgentForUrl

  return { getAgentForUrl: agentForUrl, send: callFetch ?? config.getFetch?.() ?? fetch }
}

class Api {
  static _sendVerbatim = async (path, verb, optionsRaw) => {
    // The client is the call's settings, and fetch the HTTP client that sends its requests, not options of the requests.
    const {
      client, fetch: callFetch, getAgentForUrl, ...options
    } = optionsRaw || {}

    const config = client ?? Files
    const log = loggerFor(config)
    const policy = options[retryPolicy] ?? apiRetries
    const settlesBody = options[settlingBody] === true
    const oneAttempt = options[singleAttempt] === true
    delete options[retryPolicy]
    delete options[settlingBody]
    delete options[singleAttempt]

    const transport = transportOf(config, client, callFetch, getAgentForUrl, options)
    const isExternal = /^[a-zA-Z]+:\/\//.test(path)

    // A request of an operation goes to the site its context was taken with, or for a later request, to the host a
    // lockout region mismatch rerouted the operation to (see Api.sendRequest). Any other request goes to its settings'
    // site.
    const credential = optionsRaw?.[requestCredential] ?? null
    const operation = optionsRaw ? operationContexts.get(optionsRaw) : undefined
    const settingsBaseUrl = config.getBaseUrl()
    const baseUrl = operation ? operation.origin : settingsBaseUrl

    if (!isExternal && !baseUrl) {
      throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it')
    }

    const apiUrl = origin => `${origin}${Files.getEndpointPrefix()}${path}`
    const url = isExternal ? path : apiUrl(baseUrl)

    // The settings' site the request is sent to, which a mismatch it follows may move, or null when it is sent elsewhere.
    let settingsSite = baseUrl === settingsBaseUrl ? settingsBaseUrl : null

    let attempt = null
    let handedOn = false

    try {
      const requestOptions = {
        method: verb,
        timeoutSecs: config.getNetworkTimeout(),
        ...options,
      }

      // Sends the request to requestUrl, as its retries'th retry, and reads the response within that attempt. A lockout
      // region mismatch that is followed sends the same request, method, path, query, body, headers and credentials
      // included, to the host the API named, as the next retry, which shares the call's one retry budget.
      const respond = async (requestUrl, retries) => {
        const sent = await fetchWithRetry(requestUrl, requestOptions, retries, transport, config, policy)
        const { response } = sent
        attempt = sent.attempt

        const headers = Object.fromEntries(response.headers.entries())

        logResponseHead(response, headers, log)

        // One attempt to storage resolves with its outcome, for its transfer to classify (see Api._sendStorageAttempt):
        // an accepted response once its body is settled, which stands whatever becomes of that body, or a refused one
        // with what a bounded read of its body gives.
        if (oneAttempt) {
          if (response.ok) {
            await drainResponse(response, attempt.signal, payloadObserver(config, 'Response Data: '))
            return {
              headers,
              ok: true,
              reason: response.statusText,
              status: response.status,
            }
          }

          const text = await boundedText(response, attempt.signal, REFUSED_TEXT_BYTES)
          log.debug('Response Data: ')
          log.debug(text)

          return {
            data: text,
            headers,
            ok: false,
            reason: response.statusText,
            status: response.status,
          }
        }

        // Only the API's own answer can move the call's credentials to another host: a response from the origin the
        // request was sent to, redirects within it included. A request to another site never is, nor is a response
        // after a redirect that led away from that origin, even back to it, which the credentials did not follow.
        const from = isExternal ? null : new URL(requestUrl).origin
        const isOwnAnswer = from !== null && !sent.crossedOrigin && new URL(sent.responseUrl).origin === from

        // The body is read within the same attempt, and so within the same timeout budget, as the response headers.
        const contentType = headers['content-type'] || ''
        let data

        try {
          if (contentType.includes('application/json')) {
            // A response without content (see hasNoContent), whatever its Content-Type says, has no JSON to read: its
            // empty body is returned unread.
            if (hasNoContent(response.status, headers)) {
              data = response.body
            } else {
              data = await response.json()
            }
          } else if (contentType.includes('text/')) {
            data = await response.text()
          } else if (contentType.includes('multipart/form-data')) {
            data = await response.formData()
          } else if (isOwnAnswer && response.status === 403 && !contentType && headers['x-files-host']) {
            // The legacy lockout region mismatch can come without a Content-Type: the API's own 403 that names a host
            // has its text read, so that it can be recognized. Any other body without one stays unread.
            data = await response.text()
          } else {
            data = response.body
          }
        } catch (error) {
          throw attempt.failure(error)
        }

        // Only a body read above is logged; an unread stream stays untouched for the caller.
        if (data !== response.body) {
          log.debug('Response Data: ')
          log.debug(data)
        }

        const normalizedResponse = {
          data,
          headers,
          reason: response.statusText,
          status: response.status,
        }

        const mismatch = isOwnAnswer ? regionMismatchOf(response.status, headers, data) : null

        if (mismatch) {
          const route = regionRouteOf(mismatch, from, config, sent.retries, requestOptions.body)

          if (!route.follow) {
            /* eslint-disable-next-line no-throw-literal */
            throw { regionMismatch: route.details, response: normalizedResponse }
          }

          attempt.end()
          attempt = null

          // As for any retry, a call whose own signal has been aborted by then is cancelled rather than sent again.
          if (options.signal?.aborted) {
            throw cancellation(options.signal)
          }

          // The rest of the operation goes there too, in the context its first request was sent with, so that its later
          // pages keep its credential, workspace and other headers, whatever the settings become. So do the settings'
          // later requests, but only when this request was sent to their site with their own credential and workspace,
          // and they still have all three: a call's own API key, session or workspace, a request that sent no
          // credential, such as a session's creation, and one whose settings have changed since its operation began
          // move only the operation.
          if (operation) {
            operationContexts.set(optionsRaw, { ...operation, origin: route.origin })
          }

          const movesSettings = Boolean(credential?.settings)
            && settingsSite !== null
            && config.getBaseUrl() === settingsSite
            && isSameCredential(settingsCredentialOf(config), credential)

          if (movesSettings) {
            if (config === Files) {
              Files.setBaseUrl(route.origin)
            } else {
              config._useRegionOrigin(route.origin)
            }

            settingsSite = route.origin
          } else {
            settingsSite = null
          }

          const nextRetries = sent.retries + 1
          log.info(`Retrying request (retry ${nextRetries} of ${config.getMaxNetworkRetries()}) at ${route.origin} after a lockout region mismatch`)
          return respond(apiUrl(route.origin), nextRetries)
        }

        if (!response.ok) {
          // A refused response's unread body is settled within a bounded read before the call fails, and logged at
          // DEBUG; the failure is still the response's own.
          if (data && data === response.body) {
            normalizedResponse.data = await boundedText(response, attempt.signal, REFUSED_TEXT_BYTES)
            log.debug('Response Data: ')
            log.debug(normalizedResponse.data)
          }

          /* eslint-disable-next-line no-throw-literal */
          throw { response: normalizedResponse }
        }

        // A body its caller has no use for is drained, or stopped by the attempt's budget or signal, and its outcome
        // observed, before the call resolves, each chunk logged as it is drained at DEBUG. The response has been
        // accepted already, and so stands whatever becomes of its body: the request is never sent again for it.
        if (settlesBody && data === response.body) {
          await drainResponse(response, attempt.signal, payloadObserver(config, 'Response Data: '))
          return { ...normalizedResponse, data: null }
        }

        // A body returned unread, as a stream, is the caller's to read, but it is still read within the attempt, which
        // gives the stream to return (see startAttempt), and at DEBUG each chunk is logged as its reader takes it. A
        // response without content has nothing more to read, so that a call such as a model's delete, whose caller
        // never reads the empty body, holds nothing once it resolves.
        if (data && data === response.body) {
          const body = attempt.endWithBody(data, hasNoContent(response.status, headers), payloadObserver(config, 'Response Data: '))
          handedOn = true
          return { ...normalizedResponse, data: body }
        }

        return normalizedResponse
      }

      const received = await respond(url, 0)
      return received
    } catch (error) {
      // A cancelled call rejects with its signal's reason itself, which is never made a FilesError, and so does a call
      // that fails with an error of its own.
      if (isCancellation(error)) {
        throw error.reason
      }

      if (ownFailures.has(error)) {
        throw error.failure
      }

      // One attempt to storage that had no response resolves with its failure: whether any of its requests had been
      // handed to the HTTP client, so that it may have been carried out (see storageAttempt), which an expired
      // redirect's refusal after an answered request does not undo; whether a URL of it was found expired, which, before
      // anything was sent, leaves it unsent; and whether sending it again would fail the same way.
      if (oneAttempt) {
        return {
          dispatched: policy.dispatched === true,
          expired: expiredUrlErrors.has(error),
          failure: error,
          permanent: isPermanentFailure(error, url),
        }
      }

      errors.handleErrorResponse(error, log)
      return null
    } finally {
      // The timeout budget and the caller's signal keep applying to a body handed on unread until it has been read to
      // its end, fails, closes or is cancelled; stopping it before then fails the stream itself, as the call has
      // already resolved. Any other attempt ends with the call.
      if (!handedOn) {
        attempt?.end()
      }
    }
  }

  static sendFilePart = (externalUrl, verb, data, optionsRaw = {}) => (
    Api._sendStorageRequest({ headers: optionsRaw?.headers, method: verb, url: externalUrl }, data, optionsRaw)
  )

  // Not public: one request to storage, of body, to target: { url, method, headers, agent, expires, replay }, its signed
  // URL, its method and headers, as an upload part's negotiation gives them, the agent to send it through, if chosen
  // already, when the API said it expires, if it did, and whether it may be sent again, true unless false. It is sent
  // with optionsRaw's signal, timeoutSecs, agent options, fetch and client, whose network and log settings apply, but
  // never the API's credentials or workspace, nor any other headers. It is retried as storage is (see storageRetries),
  // in this one loop, and renew(), if given, gives the target to send it to instead of one that has expired.
  //
  // With settleBody, a response body that would be returned unread, such as an upload part's acknowledgement, is
  // drained instead, a Node.js stream and a WHATWG one alike, within the attempt's budget and signal, and the call
  // resolves, with data null, only once its outcome has been observed: an accepted response stands whatever becomes of
  // its body. Without it, such a body is returned unread, as Api.sendFilePart() returns it.
  static _sendStorageRequest = (target, body, optionsRaw = {}, renew = null, { settleBody = false } = {}) => {
    const { headers, ...options } = optionsRaw || {}

    return Api._sendVerbatim(target.url, target.method, {
      ...options,
      ...(target.agent ? { agent: target.agent } : {}),
      body,
      headers: storageHeadersOf(target.headers),
      [retryPolicy]: storageRetries(target, renew),
      [settlingBody]: settleBody,
    })
  }

  // Not public: one attempt of a request to storage, as _sendStorageRequest makes it, for a transfer that owns its
  // retries, renewals and replay permission (see storageAttempt): never retried here, and never sent once target is
  // known to have expired. Resolves with { headers, ok: true, reason, status } once an accepted response's body has been
  // settled; with { data, headers, ok: false, reason, status } for any other response, data the text of at most
  // REFUSED_TEXT_BYTES of its body; or with { dispatched, expired, failure, permanent } when the attempt had no
  // response: failure is what it failed with, the budget's "Request timed out" FilesError included; dispatched whether
  // any of its requests had been handed to the HTTP client, so that it may have been carried out; expired whether a URL
  // of it was known to have expired, its request never sent, which leaves the attempt unsent only when nothing was
  // dispatched before, as a redirect to an expired URL was not; and permanent whether sending it again would fail the
  // same way. Rejects only when cancelled, with the signal's reason.
  static _sendStorageAttempt = (target, body, optionsRaw = {}) => {
    const { headers, ...options } = optionsRaw || {}

    return Api._sendVerbatim(target.url, target.method, {
      ...options,
      ...(target.agent ? { agent: target.agent } : {}),
      body,
      headers: storageHeadersOf(target.headers),
      [retryPolicy]: storageAttempt(target),
      [singleAttempt]: true,
    })
  }

  // Not public: options for a request, of a call made with options, whose outcome must be known, such as an upload's
  // finalization: it is retried only after a failure that shows it was not carried out (see unambiguousApiRetries).
  static _withUnambiguousRetries = options => ({ ...options, [retryPolicy]: unambiguousApiRetries })

  // Not public: what the transfers that own their own retries (see Upload.js and isomorphic/File.node.js) need of the
  // request layer: the logger of a call's settings; whether a storage target, { expires, url }, is known to have
  // expired, and when a signed URL expires by its own signature, in milliseconds; the wait a Retry-After asks for;
  // whether a status may be different when sent again; whether a failure without a response would fail the same way if
  // sent again to url; whether an error is the expired-URL one; and whether a download's attempt failed with it before
  // sending anything (see Api._openStorageDownload).
  static _loggerFor = loggerFor

  static _storageExpired = target => hasExpired(target)

  static _urlExpiresAt = url => signedUrlExpiryOf(url)

  static _retryAfterMs = value => retryAfterMs(value)

  static _isTransientStatus = status => isTransientStatus(status)

  static _isPermanentStorageFailure = (error, url) => isPermanentFailure(error, url)

  static _isExpiredUrlError = error => expiredUrlErrors.has(error)

  static _isUnsentExpiry = error => unsentExpiries.has(error)

  // Not public: the options by which a storage download chooses its requests' agents itself (see downloadAgents), and
  // lets each of them go (see downloadGate).
  static _downloadAgents = downloadAgents

  static _downloadGate = downloadGate

  // Not public: a download from storage at url, one GET with only headers, never the API's credentials or workspace,
  // through the transport optionsRaw choose (see transportOf): their agent options and fetch, or their client's, with
  // their signal and timeoutSecs and their client's network and log settings, or else the global ones; or, with their
  // [Api._downloadAgents] option, the agent it alone chooses for each request's URL; and, with their [Api._downloadGate]
  // option, sent, a redirect's request included, only once that lets it go. It is retried
  // as storage's requests are (see storageRetries), and never sent once its URL is known to have expired. With
  // attemptOnly, as for a download that owns its retries (see isomorphic/File.node.js), it is one attempt, never
  // retried here, which rejects with the failure of an attempt that had no response, such as the expired-URL error.
  //
  // Resolves with its response, whatever its status, once any retries are over: { body, closed, failure, headers,
  // status, statusText, stop }. Its body is unread, made a Node.js readable stream by nodeStream(body) and handed on in
  // its attempt's own (see startAttempt), and stays within its attempt's budget until it has been read to its end, failed
  // or closed. stop() ends the request, its body included, at once. closed resolves once the attempt has ended and both
  // the body handed on and the HTTP client's own body have had their outcome, ended, failed or closed, not merely once
  // either is being destroyed. failure(error) is what reading the body fails with when it failed with error: the
  // budget's "Request timed out" FilesError, or the caller's signal's reason, when either stopped the attempt and its
  // HTTP client reported that as an abort; otherwise error itself. Rejects with the request's failure, or a cancelled
  // one with its signal's reason; with attemptOnly, an expired URL found before any request of the attempt was sent is
  // one that Api._isUnsentExpiry() tells, which renewing it may answer without counting a send.
  static _openStorageDownload = async (url, optionsRaw, headers, nodeStream, { attemptOnly = false } = {}) => {
    const {
      client,
      fetch: callFetch,
      getAgentForUrl,
      [downloadAgents]: agentFor,
      [downloadGate]: whenSendable,
      ...options
    } = optionsRaw || {}

    const config = client ?? Files
    const transport = {
      ...transportOf(config, client, callFetch, getAgentForUrl, options),
      ...(agentFor ? { getAgentForUrl: agentFor } : {}),
      ...(whenSendable ? { whenSendable } : {}),
    }

    const requestOptions = {
      method: 'GET',
      timeoutSecs: config.getNetworkTimeout(),
      ...options,
      headers: storageHeadersOf(headers),
    }

    let sent
    const policy = attemptOnly ? storageAttempt({ method: 'GET', url }) : storageRetries({ method: 'GET', url }, null)

    try {
      sent = await fetchWithRetry(url, requestOptions, 0, transport, config, policy)
    } catch (error) {
      if (isCancellation(error)) {
        throw error.reason
      }

      if (attemptOnly && expiredUrlErrors.has(error) && policy.dispatched !== true) {
        unsentExpiries.add(error)
      }

      throw ownFailures.has(error) ? error.failure : error
    }

    const { attempt, response } = sent
    let body = null

    try {
      const responseHeaders = Object.fromEntries(response.headers.entries())
      logResponseHead(response, responseHeaders, loggerFor(config))
      const received = nodeStream(response.body)
      body = attempt.endWithBody(received)
      const ended = new Promise(resolve => { attempt.onEnd(resolve) })

      return {
        body,
        closed: Promise.all([readableOutcome(body), readableOutcome(received), ended]).then(() => {}),
        failure: error => {
          const failure = attempt.failure(error)
          return isCancellation(failure) ? failure.reason : failure
        },
        headers: responseHeaders,
        status: response.status,
        statusText: response.statusText,
        stop: () => {
          attempt.end()
          body.destroy()
        },
      }
    } catch (error) {
      attempt.end()
      body?.destroy()
      throw error
    }
  }

  static _autoPaginate = async (path, verb, params, options, response, metadata) => {
    if (options.autoPaginate ?? (options.client ?? Files).getAutoPaginate()) {
      const nextCursor = nextCursorOf(response)

      const {
        autoPaginateCount,
        previousAutoPaginateData,
      } = metadata || {}

      if (nextCursor) {
        const nextPage = (Number(params?.page) || 1) + 1
        const nextParams = {
          ...params,
          cursor: nextCursor,
          page: nextPage,
        }

        const nextMetadata = {
          autoPaginateCount: (autoPaginateCount || 1) + 1,
          previousAutoPaginateData: [
            ...previousAutoPaginateData || [],
            ...response?.data || [],
          ],
        }

        return Api.sendRequest(path, verb, nextParams, options, nextMetadata)
      }

      if (previousAutoPaginateData) {
        return {
          ...response,
          autoPaginateRequests: autoPaginateCount,
          data: [...previousAutoPaginateData, ...response?.data || []],
        }
      }
    }

    return response
  }

  static sendRequest = async (path, verb, params = null, options = {}, metadata = null) => {
    // The settings of the client the call was made through, never the global ones; or, for a call made without a
    // client, the global settings of Files.
    const config = options.client ?? Files
    const hasWorkspaceIdOption = Object.prototype.hasOwnProperty.call(options, 'workspaceId')
    const workspaceId = hasWorkspaceIdOption ? options.workspaceId : config.getWorkspaceId()
    const languageHeader = config.getLanguage() ? { 'Accept-Language': config.getLanguage() } : {}
    const isExternal = /^[a-zA-Z]+:\/\//.test(path)

    // A later request of an operation, such as its next page, is sent with the context the operation's first request was
    // sent with: its site, or the host a lockout region mismatch rerouted it to, and a copy of its headers, its credential
    // and workspace included, whatever the settings have become since (see Api._sendVerbatim). It takes the context, so
    // that nothing else made with the same options continues the operation. Any other request is made with the settings
    // and options as they are now, and its context is taken below, before anything else can change them.
    const continued = isExternal ? undefined : operationContexts.get(options)
    operationContexts.delete(options)

    // A client's own headers go under the call's. Files has none: getHeaders is a client's.
    const headers = continued ? { ...continued.headers } : {
      Accept: 'application/json',
      ...languageHeader,
      ...config.getHeaders?.(),
      ...options.headers,
      'User-Agent': config.getUserAgent(),
    }

    // The credential the request sends, in its workspace, which a lockout region mismatch's routing is tied to (see
    // Api._sendVerbatim).
    let credential = continued ? continued.credential : null

    if (!isExternal && !continued) {
      const hasApiKey = options.apiKey !== undefined && options.apiKey !== null
      const callSessionId = hasApiKey ? null : options.sessionId || options.session_id
      const sessionId = hasApiKey ? null : callSessionId || config.getSessionId()
      const workspace = workspaceOf(workspaceId)

      if (sessionId) {
        headers['X-FilesAPI-Auth'] = sessionId
        credential = {
          name: 'X-FilesAPI-Auth',
          settings: !callSessionId && !hasWorkspaceIdOption,
          value: sessionId,
          workspace,
        }
      } else {
        const isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'

        // api key cannot be used when creating a session
        if (!isCreatingSession) {
          const apiKey = options.apiKey || config.getApiKey()

          if (!apiKey) {
            throw new errors.ConfigurationError(config === Files || globalSettingsCopies.has(config)
              ? 'API key has not been set - use Files.setApiKey() to set it'
              : 'API key has not been set - give the client an apiKey or a sessionId')
          }

          headers['X-FilesAPI-Key'] = apiKey
          credential = {
            name: 'X-FilesAPI-Key',
            settings: !options.apiKey && !hasWorkspaceIdOption,
            value: apiKey,
            workspace,
          }
        }
      }

      if (workspace !== null) {
        headers['X-Files-Workspace-Id'] = workspaceId
      }
    }

    // Each request records the credential it sends: its own, or for an operation's later request, the one the
    // operation's first request sent.
    const updatedOptions = {
      ...options,
      headers,
      [requestCredential]: credential,
    }

    // The operation's context, as this request sends it, is taken now, its site included: before its body is prepared
    // or anything is logged, both of which can run the caller's code.
    if (!isExternal) {
      operationContexts.set(updatedOptions, continued ?? { credential, headers: { ...headers }, origin: config.getBaseUrl() })
    }

    let requestPath = path
    const hasParams = isObject(params) && !isEmpty(params)

    if (hasParams) {
      if (verb.toUpperCase() === 'GET') {
        const _params = {}
        for (const [key, value] of Object.entries(params)) {
          if (isObject(value)) {
            for (const [key2, value2] of Object.entries(value)) {
              _params[`${key}[${key2}]`] = value2
            }
          } else {
            _params[key] = value
          }
        }

        const pairs = Object.entries(_params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        requestPath += path.includes('?') ? '&' : '?'
        requestPath += pairs.join('&')
      } else {
        updatedOptions.body = jsonBody(params)
        headers['Content-Type'] = 'application/json'
      }
    }

    // A body with attachments holds its streams from serialization until the request ends, however it ends: everything
    // after serialization, including logging, is inside this try.
    const attachmentBody = updatedOptions.body instanceof AttachmentBody ? updatedOptions.body : null
    let response
    try {
      if (attachmentBody && attachmentBody.length !== null) {
        headers['Content-Length'] = `${attachmentBody.length}`
      }

      if (config.shouldDebugRequest()) {
        const log = loggerFor(config)
        log.debug('Request Options:')
        log.debug({
          ...updatedOptions,
          body: hasParams
            ? `payload keys: ${Object.keys(params).join(', ')}`
            : '(none)',
        })
      }

      response = await Api._sendVerbatim(requestPath, verb, updatedOptions)
    } catch (error) {
      // A failed request closes whatever its latest attempt still has open, and fails with its own error.
      attachmentBody?.abort()
      throw error
    } finally {
      // A stream that was never read can then be sent again.
      attachmentBody?.release()
    }

    // A page an item iterator requested goes back to it, with its operation's context, at the host a lockout region
    // mismatch rerouted it to, if any, and the iterator requests the next page itself.
    const takePage = pageResponses.get(options)
    if (takePage) {
      takePage(response, operationContexts.get(updatedOptions))
      return response
    }

    return Api._autoPaginate(path, verb, params, updatedOptions, response, metadata)
  }

  // Sends an action's request, a copy, a move or a deletion, as sendRequest() sends it, with the caller's options as
  // they are, and resolves with { action, response }: its response, and what waiting for the action's completion needs
  // (see ActionWait.js), which the SDK keeps privately for the FileAction or response that reports it.
  //
  // - action.operation is the context the request was sent with (see sendRequest()), its site, credential, workspace
  //   and other headers, at the host a lockout region mismatch rerouted it to, if any; or null when the request gave
  //   none back.
  // - action.options are the options of the action's later requests: the call's own, its client, credentials and
  //   headers included, but not its signal, which cancels that call alone; and, for a call made without a client, a copy
  //   of the global settings as they are as the action is sent (Files._currentSettings()), so that changing them later
  //   changes no later request of the action.
  static _sendAction = async (path, verb, params, options = {}) => {
    const client = options?.client ?? Files._currentSettings()
    if (client !== options?.client) {
      globalSettingsCopies.add(client)
    }

    const { signal, ...retained } = options ?? {}
    const action = {
      operation: null,
      options: { ...retained, client, headers: { ...retained.headers } },
    }

    const callOptions = { ...options }
    pageResponses.set(callOptions, (response, context) => {
      action.operation = context ?? null
    })

    const response = await Api.sendRequest(path, verb, params, callOptions)
    return { action, response }
  }

  // Sends a later GET request of an action (see _sendAction()) to path, such as a poll of its File Migration, with the
  // action's options and signal, if given, in the context of the action's request before, whatever the settings have
  // become since. Resolves with its response and the context it leaves for the next request, at the host a lockout
  // region mismatch rerouted it to, if any.
  static _continueAction = async (action, path, signal) => {
    const requestOptions = {
      ...action.options,
      headers: { ...action.options?.headers },
      ...(signal ? { signal } : {}),
    }

    let { operation } = action
    pageResponses.set(requestOptions, (response, context) => {
      operation = context ?? operation
    })

    if (operation) {
      operationContexts.set(requestOptions, operation)
    }

    const response = await Api.sendRequest(path, 'GET', {}, requestOptions)
    return { operation, response }
  }

  // The items of a cursor-paginated list operation, one at a time, as an async iterator. listPage(params, options) is
  // the operation's own list method, so each page is checked, requested and made into models just as a list call is;
  // the iterator decides only when to request a page, and with which cursor.
  //
  // - Nothing is requested before the first next(). The call's params, with their JSON-like containers at every depth,
  //   and its options, headers included, are copied now, so changing the caller's objects later changes no page;
  //   agents and other functions are kept as given. Params that are not an object are kept as given too, for the list
  //   method to reject when the first page is requested.
  // - The settings are taken now as well: the call's client, or for a call made without one, a copy of the global
  //   settings as they are now (Files._currentSettings()), so changing them later changes no page. Each page is
  //   requested with them, as a client's call is, and its models keep them, with the call's options but not its signal.
  // - The next page is requested only once every item of the current one has been taken, and only the current page's
  //   remaining items are kept. Each page has its own copy of the headers, which its models keep, so changing one
  //   model's headers changes no other page.
  // - Each cursor is sent as the API returned it. A page without a next cursor is the last, while an empty page with one
  //   is not. A page whose next cursor is the one it was requested with fails, rather than being requested again.
  // - next() and return() calls run one at a time, in the order made, so at most one page is being requested. return(),
  //   as leaving a for await loop calls it, drops the current page and requests nothing more; it waits for a request
  //   already under way, which only options.signal cancels, without a retry. A failed request, a cancelled one
  //   included, rejects next() and ends the iteration.
  // - Once options.signal has aborted, the next next() rejects with its reason, unchanged, even for the rest of a page
  //   already received, which is dropped, and no further page is requested. An iteration already ended stays ended.
  // - Every later page is requested with the context the first page's request was sent with, its headers, credential
  //   and workspace included, at its site, or at the host a lockout region mismatch rerouted an earlier page to (see
  //   Api.sendRequest).
  static _iterate = (params, options, listPage) => {
    const callParams = isObject(params) ? copyContainers({ ...params }) : params
    const client = options?.client ?? Files._currentSettings()
    if (client !== options?.client) {
      globalSettingsCopies.add(client)
    }

    const callOptions = { ...options, client, headers: { ...options?.headers } }
    const { signal } = callOptions
    let items = []
    let requested = false
    let finished = false
    let nextCursor = callParams?.cursor
    let operation
    let queue = Promise.resolve()

    const finish = () => {
      finished = true
      items = []
    }

    // Requests the next page, whose items become the current ones, and reads the cursor of the page after it. Each page
    // after the first is requested in the operation's context, as the page before it left it: from the host a lockout
    // region mismatch rerouted an earlier page to, if any. A page's context is kept only once its request is done, so
    // that a call its models make later, with the same options, changes no page.
    const requestPage = async () => {
      const pageCursor = nextCursor
      const pageOptions = { ...callOptions, headers: { ...callOptions.headers } }
      let pageResponse
      let pageOperation
      pageResponses.set(pageOptions, (response, context) => {
        pageResponse = response
        pageOperation = context
      })

      if (operation) {
        operationContexts.set(pageOptions, operation)
      }

      try {
        items = await listPage(requested ? { ...callParams, cursor: pageCursor } : callParams, pageOptions)
      } catch (error) {
        finish()
        throw error
      }

      requested = true
      operation = pageOperation ?? operation
      nextCursor = nextCursorOf(pageResponse)
      if (nextCursor && nextCursor === pageCursor) {
        finish()
        throw new errors.FilesError('The API gave the same cursor for the next page as for this one, so the list cannot go on')
      }
    }

    // Settles with the next item, or the end, requesting pages one after another until one has items. Each request is
    // made from the callback of the one before and settles this one promise, rather than a promise awaiting the next, so
    // a run of empty pages, however long, holds nothing but the current page and the request under way. Once a page has
    // been received and the call's signal has aborted, the iteration is cancelled before anything more is given or
    // requested: it rejects with the signal's reason, as a cancelled call does, and the current page is dropped. An
    // iteration that has ended already stays ended.
    const take = () => new Promise((resolve, reject) => {
      const step = () => {
        if (finished) {
          resolve({ done: true, value: undefined })
        } else if (requested && signal?.aborted) {
          finish()
          reject(abortReason(signal))
        } else if (items.length > 0) {
          resolve({ done: false, value: items.shift() })
        } else if (requested && !nextCursor) {
          finish()
          resolve({ done: true, value: undefined })
        } else {
          requestPage().then(step).catch(reject)
        }
      }

      step()
    })

    const inTurn = step => {
      const result = queue.then(step)
      queue = result.then(() => {}, () => {})
      return result
    }

    return {
      next: () => inTurn(take),
      return: value => inTurn(() => {
        finish()
        return { done: true, value }
      }),
      [Symbol.asyncIterator]() { return this },
    }
  }
}

export default Api

module.exports = Api
module.exports.default = Api
