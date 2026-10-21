import nock from 'nock'

import Api from '../lib/Api'
import { FilesError } from '../lib/Errors'
import Files from '../lib/Files'
import FilesClient from '../lib/FilesClient'
import { LogLevel } from '../lib/Logger'
import User from '../lib/models/User'

const UPLOAD_URL = 'https://upload.example.test'
const UPLOAD_PATH = '/private-upload-part'
const UPLOAD_QUERY = {
  'X-Amz-Credential': 'test-upload-credential',
  'X-Amz-Signature': 'test-upload-signature',
}

const SIGNED_UPLOAD_URL = `${UPLOAD_URL}${UPLOAD_PATH}?${new URLSearchParams(UPLOAD_QUERY)}`

describe('API retry logging', () => {
  let originalNetworkConfig
  let originalLogLevel
  let consoleSpies

  beforeEach(() => {
    nock.disableNetConnect()
    originalNetworkConfig = {
      maxNetworkRetries: Files.getMaxNetworkRetries(),
      maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
      minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
    }

    originalLogLevel = Files.getLogLevel()
    Files.configureNetwork({ maxNetworkRetries: 1, maxNetworkRetryDelay: 0, minNetworkRetryDelay: 0 })
    consoleSpies = Object.fromEntries(
      ['error', 'warn', 'info', 'log'].map(method => [method, jest.spyOn(console, method).mockImplementation(() => {})]),
    )
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    Files.configureNetwork(originalNetworkConfig)
    Files.setLogLevel(originalLogLevel)
    jest.restoreAllMocks()
  })

  it('keeps signed upload URLs out of default logs through retry exhaustion', async () => {
    const request = nock(UPLOAD_URL)
      .put(UPLOAD_PATH, 'part contents')
      .query(UPLOAD_QUERY)
      .times(2)
      .replyWithError({ code: 'ECONNRESET', message: 'socket hang up' })

    expect(Files.getLogLevel()).toBe(LogLevel.INFO)

    const error = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', 'part contents').catch(caughtError => caughtError)

    expect(request.isDone()).toBe(true)
    expect(error).toBeInstanceOf(FilesError)
    expect(error.message).toContain(SIGNED_UPLOAD_URL)
    expect(error.message).toContain('socket hang up')

    const output = JSON.stringify(Object.values(consoleSpies).flatMap(spy => spy.mock.calls))
    expect(output).toContain('Request #1 failed')
    expect(output).toContain('Request #2 failed')
    expect(output).toContain('Retrying request (retry 1 of 1)')
    expect(output).not.toContain(UPLOAD_URL)
    expect(output).not.toContain(UPLOAD_PATH)
    expect(output).not.toContain(UPLOAD_QUERY['X-Amz-Credential'])
    expect(output).not.toContain(UPLOAD_QUERY['X-Amz-Signature'])
  })

  it('keeps transport failure details at DEBUG when a signed upload retry succeeds', async () => {
    Files.setLogLevel(LogLevel.DEBUG)

    const request = nock(UPLOAD_URL)
      .put(UPLOAD_PATH, 'part contents')
      .query(UPLOAD_QUERY)
      .replyWithError({ code: 'ECONNRESET', message: 'socket hang up' })
      .put(UPLOAD_PATH, 'part contents')
      .query(UPLOAD_QUERY)
      .reply(200, 'uploaded', { 'Content-Type': 'text/plain' })

    const response = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', 'part contents')

    expect(request.isDone()).toBe(true)
    expect(response.status).toBe(200)
    expect(response.data).toBe('uploaded')

    const debugOutput = JSON.stringify(consoleSpies.log.mock.calls)
    expect(debugOutput).toContain('Request #1 failed')
    expect(debugOutput).toContain(SIGNED_UPLOAD_URL)
    expect(debugOutput).toContain('socket hang up')

    const infoOutput = JSON.stringify(consoleSpies.info.mock.calls)
    expect(infoOutput).toContain('Request #1 failed')
    expect(infoOutput).toContain('Retrying request (retry 1 of 1)')
    expect(infoOutput).not.toContain(SIGNED_UPLOAD_URL)
    expect(infoOutput).not.toContain('socket hang up')
  })

  it('logs each attempt and both responses, their headers included, of a retried GET at DEBUG alone', async () => {
    const originalApiKey = Files.getApiKey()
    Files.setApiKey('test-key')
    Files.setLogLevel(LogLevel.DEBUG)

    try {
      const requestUrl = `${Files.getBaseUrl()}/api/rest/v1/users/17?id=17`
      const request = nock(Files.getBaseUrl())
        .get('/api/rest/v1/users/17')
        .query({ id: 17 })
        .matchHeader('X-Log-Request', 'request-marker')
        .reply(503, { error: 'retried-payload-marker', 'http-code': 503 }, { 'X-Log-Response': 'retried-header-marker' })
        .get('/api/rest/v1/users/17')
        .query({ id: 17 })
        .matchHeader('X-Log-Request', 'request-marker')
        .reply(200, { id: 17, username: 'final-payload-marker' }, { 'X-Log-Response': 'final-header-marker' })

      const user = await User.find(17, {}, { headers: { 'X-Log-Request': 'request-marker' } })

      expect(request.isDone()).toBe(true)
      expect(user).toBeInstanceOf(User)
      expect(user.attributes).toEqual({ id: 17, username: 'final-payload-marker' })
      expect([Files.shouldDebugRequest(), Files.shouldDebugResponseHeaders()]).toEqual([false, false])

      const debugOutput = JSON.stringify(consoleSpies.log.mock.calls)
      expect(debugOutput).toContain(`Sending request #1: GET ${requestUrl}`)
      expect(debugOutput).toContain(`Sending request #2: GET ${requestUrl}`)
      expect(debugOutput).toContain('request-marker')
      expect(debugOutput).toContain('Status: 503')
      expect(debugOutput).toContain('retried-payload-marker')
      expect(debugOutput).toContain('Status: 200')
      expect(debugOutput).toContain('final-payload-marker')

      // DEBUG alone logs every response's headers: debugResponseHeaders, off by default, is not needed for them.
      expect(debugOutput).toContain('retried-header-marker')
      expect(debugOutput).toContain('final-header-marker')

      const infoOutput = JSON.stringify(consoleSpies.info.mock.calls)
      expect(infoOutput).toContain('Request #1 failed with HTTP 503')
      expect(infoOutput).toContain('Retrying request (retry 1 of 1) in 0 ms after HTTP 503')
      expect(infoOutput).not.toContain('retried-header-marker')
    } finally {
      Files.setApiKey(originalApiKey)
    }
  })

  it('logs response headers at DEBUG with or without debugResponseHeaders, globally, per client and kept by an iterator, and never below DEBUG', async () => {
    const originalApiKey = Files.getApiKey()
    Files.setApiKey('test-key')
    Files.setLogLevel(LogLevel.DEBUG)

    // Each client logs to the console with its own log level, which defaults to INFO, not to the global one.
    const clientWith = new FilesClient({ apiKey: 'test-key', debugResponseHeaders: true, logLevel: LogLevel.DEBUG })
    const clientWithout = new FilesClient({ apiKey: 'test-key', logLevel: LogLevel.DEBUG })
    const clientAtInfo = new FilesClient({ apiKey: 'test-key', debugResponseHeaders: true })

    try {
      const request = nock(Files.getBaseUrl())
        .get('/api/rest/v1/users/1')
        .query({ id: 1 })
        .reply(200, { id: 1 }, { 'X-Log-Response': 'global-header-marker' })
        .get('/api/rest/v1/users/2')
        .query({ id: 2 })
        .reply(200, { id: 2 }, { 'X-Log-Response': 'client-header-marker' })
        .get('/api/rest/v1/users/3')
        .query({ id: 3 })
        .reply(200, { id: 3 }, { 'X-Log-Response': 'flagless-header-marker' })
        .get('/api/rest/v1/users/4')
        .query({ id: 4 })
        .reply(200, { id: 4 }, { 'X-Log-Response': 'unlogged-header-marker' })
        .get('/api/rest/v1/users')
        .query(true)
        .reply(200, [], { 'X-Log-Response': 'iterator-header-marker' })

      await User.find(1)
      await clientWith.users.find(2)
      await clientWithout.users.find(3)
      await clientAtInfo.users.find(4)

      // An iterator made without a client keeps the global settings as they were when it was made, DEBUG included.
      const users = User.listIterator({ per_page: 1 })
      Files.setLogLevel(LogLevel.INFO)
      expect(await users.next()).toMatchObject({ done: true })

      expect(request.isDone()).toBe(true)

      const debugOutput = JSON.stringify(consoleSpies.log.mock.calls)
      expect(debugOutput).toContain('global-header-marker')
      expect(debugOutput).toContain('client-header-marker')
      expect(debugOutput).toContain('flagless-header-marker')
      expect(debugOutput).toContain('iterator-header-marker')
      expect(debugOutput).not.toContain('unlogged-header-marker')

      // Every response at DEBUG has its status logged, with its headers.
      expect(debugOutput.match(/Status: 200/g)).toHaveLength(4)
      expect(debugOutput.match(/Response Headers: /g)).toHaveLength(4)
    } finally {
      Files.setApiKey(originalApiKey)
    }
  })
})

describe('A request\'s byte stream body', () => {
  const BYTES = Uint8Array.from([1, 2, 3, 4, 5, 6, 7])
  let consoleSpies

  beforeEach(() => {
    consoleSpies = Object.fromEntries(
      ['error', 'warn', 'info', 'log'].map(method => [method, jest.spyOn(console, method).mockImplementation(() => {})]),
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // A byte stream whose source answers BYOB requests alone, at most three bytes each, never enqueuing bytes of its own,
  // recording in events each pull and each cancellation's reason; with failure, it fails at its second pull.
  const byobOnlyBody = (events, failure = null) => {
    let offset = 0

    return new ReadableStream({
      cancel: reason => {
        events.push({ cancel: reason })
      },
      pull: controller => {
        events.push('pull')
        const request = controller.byobRequest

        if (failure && offset > 0) {
          controller.error(failure)
          return
        }

        if (offset >= BYTES.length) {
          controller.close()
          request.respond(0)
          return
        }

        const length = Math.min(request.view.byteLength, 3, BYTES.length - offset)
        new Uint8Array(request.view.buffer, request.view.byteOffset, length).set(BYTES.subarray(offset, offset + length))
        offset += length
        request.respond(length)
      },
      type: 'bytes',
    })
  }

  // A configured fetch that reads its request's body with a BYOB reader, two bytes at a time, as an HTTP client may,
  // recording in seen whether the body had been pulled before it began, the bytes it read, and how its reading ended;
  // with cancelReason, it cancels the body after its first read.
  const byobFetch = (seen, cancelReason = null) => async (url, init) => {
    Object.assign(seen, { pulledBefore: seen.events.filter(event => event === 'pull').length, read: [] })
    const reader = init.body.getReader({ mode: 'byob' })

    try {
      let done = false

      while (!done) {
        // eslint-disable-next-line no-await-in-loop
        const result = await reader.read(new Uint8Array(2))
        done = result.done

        if (!done) {
          seen.read.push(...result.value)

          if (cancelReason) {
            // eslint-disable-next-line no-await-in-loop
            await reader.cancel(cancelReason)
            done = true
          }
        }
      }

      seen.ended = 'done'
    } catch (error) {
      seen.ended = error
      throw error
    } finally {
      reader.releaseLock()
    }

    return new Response(null, { headers: { ETag: '"e1"' }, status: 200 })
  }

  const clientWith = (fetch, logLevel) => new FilesClient({ apiKey: 'test-key', fetch, logLevel, maxNetworkRetries: 0 })

  it.each([['INFO', LogLevel.INFO], ['DEBUG', LogLevel.DEBUG]])('reaches a configured fetch that reads it with a BYOB reader at %s, with the same bytes and end, pulled only as it is read, and leaves it unlocked', async (_, logLevel) => {
    const seen = { events: [] }
    const body = byobOnlyBody(seen.events)

    const response = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', body, { client: clientWith(byobFetch(seen), logLevel) })

    expect(response.status).toBe(200)
    expect([seen.pulledBefore, seen.read, seen.ended]).toEqual([0, Array.from(BYTES), 'done'])
    expect(body.locked).toBe(false)
    expect(JSON.stringify(consoleSpies.log.mock.calls).includes('Request Data: ')).toBe(logLevel === LogLevel.DEBUG)
  })

  // The configured fetch answers without reading the request's body at all. Below DEBUG the body is never touched; at
  // DEBUG the SDK's observer, which never read it either, lets it go as untouched once the request has ended: neither
  // pulled nor cancelled, and unlocked, so that its owner can still read every byte of it.
  it.each([['INFO', LogLevel.INFO], ['DEBUG', LogLevel.DEBUG]])('leaves a request body its HTTP client never read untouched at %s, unlocked and neither read nor cancelled', async (_, logLevel) => {
    const payload = [0, 1, 127, 128, 254, 255]
    const cancellations = []
    let pulls = 0

    const body = new ReadableStream({
      cancel: reason => {
        cancellations.push(reason)
      },
      pull: controller => {
        pulls += 1

        if (pulls === 1) {
          controller.enqueue(new Uint8Array(payload))
        } else {
          controller.close()
        }
      },
    }, { highWaterMark: 0 })

    const answering = async () => new Response(null, { headers: { 'Content-Length': '0' }, status: 200 })
    const response = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', body, { client: clientWith(answering, logLevel) })
    const untouched = { cancellations: [...cancellations], locked: body.locked, pulls }

    const reader = body.getReader()
    const first = await reader.read()
    const second = await reader.read()
    reader.releaseLock()

    expect(response.status).toBe(200)
    expect(untouched).toEqual({ cancellations: [], locked: false, pulls: 0 })
    expect([Array.from(first.value), second.done]).toEqual([payload, true])
  })

  // The configured fetch reads the request body's first chunk, lets go of its reader and answers, the second chunk left
  // unread. Below DEBUG the rest of the body is its owner's, unread and unlocked; at DEBUG the SDK's observer, which
  // handed that first chunk on and has no read of the body under way, lets it go the same way, cancelling nothing, so
  // that its owner can still read the rest.
  it.each([['INFO', LogLevel.INFO], ['DEBUG', LogLevel.DEBUG]])('leaves the rest of a request body its HTTP client read only in part to its owner at %s, unlocked and not cancelled', async (_, logLevel) => {
    const chunks = [[1, 2, 3], [4, 5, 6]]
    const cancellations = []
    let pulls = 0

    const body = new ReadableStream({
      cancel: reason => {
        cancellations.push(reason)
      },
      pull: controller => {
        pulls += 1

        if (pulls <= chunks.length) {
          controller.enqueue(new Uint8Array(chunks[pulls - 1]))
        } else {
          controller.close()
        }
      },
    }, { highWaterMark: 0 })

    let firstRead = null
    const readingFirstChunk = async (url, init) => {
      const reader = init.body.getReader()
      firstRead = await reader.read()
      reader.releaseLock()
      return new Response(null, { headers: { 'Content-Length': '0' }, status: 200 })
    }

    const response = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', body, { client: clientWith(readingFirstChunk, logLevel) })
    const left = { cancellations: [...cancellations], locked: body.locked, pulls }

    const reader = body.getReader()
    const rest = await reader.read()
    const end = await reader.read()
    reader.releaseLock()

    expect(response.status).toBe(200)
    expect(Array.from(firstRead.value)).toEqual(chunks[0])
    expect(left).toEqual({ cancellations: [], locked: false, pulls: 1 })
    expect([Array.from(rest.value), end.done]).toEqual([chunks[1], true])
  })

  // At DEBUG the body is read through a stream of the SDK's own: the HTTP client's cancellation reaches the body with its
  // reason, and the body's failure reaches the HTTP client, both unchanged, and either way the SDK gives up its reader.
  it('passes a cancellation and a failure through unchanged at DEBUG, giving up its reader of the body after either', async () => {
    const reason = { cause: 'the HTTP client stopped reading' }
    const failure = new Error('the body failed')
    const cancelled = { events: [] }
    const failed = { events: [] }
    const cancelledBody = byobOnlyBody(cancelled.events)
    const failedBody = byobOnlyBody(failed.events, failure)

    await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', cancelledBody, { client: clientWith(byobFetch(cancelled, reason), LogLevel.DEBUG) })
    await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', failedBody, { client: clientWith(byobFetch(failed), LogLevel.DEBUG) }).catch(() => {})

    const cancellations = cancelled.events.filter(event => event !== 'pull')
    expect(cancellations).toHaveLength(1)
    expect(cancellations[0].cancel).toBe(reason)
    expect(cancelled.read).toEqual([1, 2])
    expect(failed.ended).toBe(failure)
    expect([cancelledBody.locked, failedBody.locked]).toEqual([false, false])
  })
})
