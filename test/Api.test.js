import { getEventListeners } from 'events'
import http from 'http'
import { Readable } from 'stream'

import fetch from 'cross-fetch'
import nock from 'nock'

import Api from '../lib/Api'
import Attachment from '../lib/Attachment'
import {
  ConfigurationError,
  FilesError,
  InvalidParameterError,
  NotAuthenticated_LockoutRegionMismatchError,
  NotFoundError,
} from '../lib/Errors'
import Files from '../lib/Files'
import { LogLevel } from '../lib/Logger'
import ApiKey from '../lib/models/ApiKey'
import Behavior from '../lib/models/Behavior'
import Folder from '../lib/models/Folder'
import User from '../lib/models/User'

// Every request still goes through the real cross-fetch; the mock only counts how often the SDK calls it.
jest.mock('cross-fetch', () => {
  const actualFetch = jest.requireActual('cross-fetch')
  return Object.assign(jest.fn((...args) => actualFetch(...args)), actualFetch)
})

const API_URL = 'http://example.test'
Files.setBaseUrl(API_URL)
Files.setApiKey('test-key')

describe('API client', () => {
  afterEach(() => {
    Files.setWorkspaceId(null)
  })

  describe('with an unsupported protocol', () => {
    let previousNetwork

    beforeEach(() => {
      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      Files.configureNetwork({ maxNetworkRetries: 2, maxNetworkRetryDelay: 0.001, minNetworkRetryDelay: 0.001 })
      Files.setBaseUrl('ftp://127.0.0.1')
      fetch.mockClear()
    })

    afterEach(() => {
      Files.setBaseUrl(API_URL)
      Files.configureNetwork(previousNetwork)
    })

    it('fails once without retrying a request to an unsupported protocol', async () => {
      const error = await ApiKey.list().catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Only HTTP(S) protocols are supported')
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('with a malformed absolute URL', () => {
    let previousNetwork

    beforeEach(() => {
      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      Files.configureNetwork({ maxNetworkRetries: 2, maxNetworkRetryDelay: 0.001, minNetworkRetryDelay: 0.001 })
      Files.setBaseUrl('http://[127.0.0.1')
      fetch.mockClear()
    })

    afterEach(() => {
      Files.setBaseUrl(API_URL)
      Files.configureNetwork(previousNetwork)
    })

    it('fails once without retrying a request to a malformed absolute URL', async () => {
      const error = await ApiKey.list().catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Invalid URL')
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  it('times out a response whose body stops arriving before it is complete', async () => {
    let requests = 0
    const sockets = new Set()
    const server = http.createServer((incoming, response) => {
      requests += 1
      response.writeHead(200, { 'Content-Length': '100', 'Content-Type': 'application/json' })
      response.write('[{"id":1', () => response.socket.destroy())
    })

    server.on('connection', socket => sockets.add(socket))
    await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })
    const previousNetwork = { maxNetworkRetries: Files.getMaxNetworkRetries(), networkTimeout: Files.getNetworkTimeout() }

    try {
      Files.setBaseUrl(`http://127.0.0.1:${server.address().port}`)
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 0.05 })

      const listing = ApiKey.list()

      await expect(listing).rejects.toBeInstanceOf(FilesError)
      await expect(listing).rejects.toHaveProperty('message', 'Request timed out')
      expect(requests).toBe(1)
    } finally {
      Files.setBaseUrl(API_URL)
      Files.configureNetwork(previousNetwork)
      sockets.forEach(socket => socket.destroy())
      await new Promise(resolve => { server.close(resolve) })
    }
  })

  it('times out an attempt whose headers and body each arrive within the timeout but together take longer', async () => {
    let requests = 0
    let responseClosed
    const closed = new Promise(resolve => { responseClosed = resolve })
    const sockets = new Set()
    const timers = []
    const server = http.createServer((incoming, response) => {
      requests += 1
      response.on('close', () => responseClosed(response.writableFinished))
      timers.push(setTimeout(() => {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.flushHeaders()
        timers.push(setTimeout(() => response.end('[{"id":1}]'), 700))
      }, 700))
    })

    server.on('connection', socket => sockets.add(socket))
    await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })
    const previousNetwork = { maxNetworkRetries: Files.getMaxNetworkRetries(), networkTimeout: Files.getNetworkTimeout() }

    try {
      Files.setBaseUrl(`http://127.0.0.1:${server.address().port}`)
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 1 })

      const listing = ApiKey.list()

      await expect(listing).rejects.toBeInstanceOf(FilesError)
      await expect(listing).rejects.toHaveProperty('message', 'Request timed out')
      expect(requests).toBe(1)

      // The budget stopped the request itself: the server sees its response closed, unfinished, before any cleanup.
      expect(await closed).toBe(false)
    } finally {
      Files.setBaseUrl(API_URL)
      Files.configureNetwork(previousNetwork)
      timers.forEach(timer => clearTimeout(timer))
      sockets.forEach(socket => socket.destroy())
      await new Promise(resolve => { server.close(resolve) })
    }
  })

  describe('with a response body still arriving', () => {
    let previousLogLevel
    let previousNetwork
    let server
    let sockets

    // Answers each request on a local server with answer(request, response, number), numbered from 1.
    const serve = async answer => {
      let requests = 0
      server = http.createServer((request, response) => {
        requests += 1
        answer(request, response, requests)
      })

      server.on('connection', socket => sockets.add(socket))
      await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })
      Files.setBaseUrl(`http://127.0.0.1:${server.address().port}`)
    }

    // A response that sends its headers and a first chunk of a longer body, and then holds the rest. closed resolves,
    // with whether the response had finished, once the server sees it closed.
    const holdBody = (response, status, contentType) => {
      const closed = new Promise(resolve => {
        response.on('close', () => resolve(response.writableFinished))
      })

      response.writeHead(status, { 'Content-Length': '100', 'Content-Type': contentType })
      response.write('{"first":"chunk"')
      return closed
    }

    const readAll = stream => new Promise((resolve, reject) => {
      const chunks = []
      stream.on('data', chunk => chunks.push(chunk))
      stream.once('end', () => resolve(Buffer.concat(chunks).toString()))
      stream.once('error', reject)
    })

    // The listeners the SDK keeps on a caller's signal, which it has while it still owns something the signal can stop.
    const listenersOf = signal => getEventListeners(signal, 'abort').length

    beforeEach(() => {
      sockets = new Set()
      previousLogLevel = Files.getLogLevel()
      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
        networkTimeout: Files.getNetworkTimeout(),
      }

      fetch.mockClear()
    })

    afterEach(async () => {
      Files.setBaseUrl(API_URL)
      Files.configureNetwork(previousNetwork)
      Files.setLogLevel(previousLogLevel)
      Files.setLogger(null)
      sockets.forEach(socket => socket.destroy())
      await new Promise(resolve => { server.close(resolve) })
    })

    it('fails a body returned unread, after the call resolved, once its attempt\'s budget runs out, and stops its response', async () => {
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 0.5 })
      let closed
      await serve((request, response) => {
        closed = holdBody(response, 200, 'application/octet-stream')
      })

      const { data } = await Api.sendRequest('/held', 'GET')
      const failed = new Promise(resolve => { data.once('error', resolve) })
      data.resume()

      // The budget's own error reaches the body's reader before the abort error its HTTP client then gives it.
      const error = await failed
      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Request timed out')
      expect(await closed).toBe(false)
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    // A Node.js stream fails with any truthy value as it is, but takes a falsy one for no error at all, and so fails with
    // an AbortError whose cause is the reason, as Node.js's own addAbortSignal() gives.
    it.each([
      ['an Error', new Error('no longer reading'), true],
      ['an object', { cause: 'no longer reading' }, true],
      ['null', null, false],
      ['0', 0, false],
      ['NaN', NaN, false],
    ])('fails a body returned unread, after the call resolved, with the caller\'s signal\'s reason, %s, once it aborts, and stops its response', async (_, reason, asItIs) => {
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 30 })
      let closed
      await serve((request, response) => {
        closed = holdBody(response, 200, 'application/octet-stream')
      })

      const controller = new AbortController()
      const { data } = await Api.sendRequest('/held', 'GET', {}, { signal: controller.signal })
      const failed = new Promise(resolve => { data.once('error', resolve) })
      data.resume()

      expect(listenersOf(controller.signal)).toBe(1)
      controller.abort(reason)

      const error = await failed

      if (asItIs) {
        expect(error).toBe(reason)
      } else {
        expect([error.name, error.code, Object.is(error.cause, reason)]).toEqual(['AbortError', 'ABORT_ERR', true])
      }

      expect(await closed).toBe(false)
      expect(listenersOf(controller.signal)).toBe(0)
    })

    it('keeps a body returned unread within its attempt until it has been read to its end, lets go of an empty one at once, and stops one left unread past its budget', async () => {
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 1 })
      let finishBody
      await serve((request, response) => {
        if (request.url.endsWith('/empty')) {
          response.writeHead(200, { 'Content-Length': '0', 'Content-Type': 'application/json' })
          response.end()
        } else if (request.url.endsWith('/whole')) {
          response.writeHead(200, { 'Content-Type': 'application/octet-stream' })
          response.end('whole body')
        } else {
          response.writeHead(200, { 'Content-Type': 'application/octet-stream' })
          response.write('first part, ')
          finishBody = () => response.end('last part')
        }
      })

      const controller = new AbortController()
      const options = { signal: controller.signal }

      // Read to its end within the budget, a body is intact, and its attempt then lets go of the caller's signal.
      const held = await Api.sendRequest('/held', 'GET', {}, options)
      expect(listenersOf(controller.signal)).toBe(1)
      finishBody()
      expect(await readAll(held.data)).toBe('first part, last part')
      expect(listenersOf(controller.signal)).toBe(0)

      // A body of Content-Length 0 is complete as it arrives: the attempt has let go of the signal by the time the call
      // resolves, and the body, still returned unread, reads as empty.
      const empty = await Api.sendRequest('/empty', 'GET', {}, options)
      expect(listenersOf(controller.signal)).toBe(0)
      expect(await readAll(empty.data)).toBe('')

      // A body still unread when its budget runs out is stopped: the stream fails, as the call has already resolved.
      const unread = await Api.sendRequest('/whole', 'GET', {}, options)
      const failed = new Promise(resolve => { unread.data.once('error', resolve) })

      expect(await failed).toBeInstanceOf(Error)
      expect(listenersOf(controller.signal)).toBe(0)
    })

    it('resolves a 204 No Content, or a 205 Reset Content, that says it is JSON but has no Content-Length, keeping its status and headers', async () => {
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 1 })
      const requests = []
      await serve((request, response) => {
        requests.push(`${request.method} ${request.url}`)
        response.writeHead(204, { 'Content-Type': 'application/json' })
        response.end()
      })

      const controller = new AbortController()
      const deleted = await Api.sendRequest('/files/demo.txt', 'DELETE', {}, { signal: controller.signal })

      expect(requests).toEqual(['DELETE /api/rest/v1/files/demo.txt'])
      expect([deleted.status, deleted.headers['content-type'], deleted.headers['content-length']]).toEqual([204, 'application/json', undefined])

      // Its empty body is complete as it arrives: still returned unread, it reads as empty, and the attempt has let go of
      // the signal already.
      expect(listenersOf(controller.signal)).toBe(0)
      expect(await readAll(deleted.data)).toBe('')

      // A 205 has no content either: its JSON, which an HTTP client would fail to parse, is never read, and its empty
      // body, returned unread, still reads as empty after a later abort.
      const resetting = Files.createClient({
        apiKey: 'reset-key',
        fetch: async () => ({
          body: Readable.from([]),
          headers: { entries: () => [['content-type', 'application/json']][Symbol.iterator](), get: () => null },
          json: async () => { throw new SyntaxError('Unexpected end of JSON input') },
          ok: true,
          redirected: false,
          status: 205,
          statusText: 'Reset Content',
          text: async () => '',
        }),
        maxNetworkRetries: 0,
        networkTimeout: 0,
      })

      const resetSignal = new AbortController()
      const reset = await Api.sendRequest('/files/demo.txt', 'DELETE', {}, { client: resetting, signal: resetSignal.signal })

      expect([reset.status, reset.headers['content-type'], listenersOf(resetSignal.signal)]).toEqual([205, 'application/json', 0])
      resetSignal.abort(new Error('done resetting'))
      expect(await readAll(reset.data)).toBe('')
    })

    it('lets go of the caller\'s signal as a call answered without content resolves, a model\'s delete included, whose empty body stays intact after an abort', async () => {
      const requests = []
      await serve((request, response) => {
        requests.push(`${request.method} ${request.url}`)
        request.resume()
        request.on('end', () => {
          response.writeHead(204)
          response.end()
        })
      })

      // No budget, as in Root's diagnostic, so that only the caller's signal could ever have let go of the call.
      const client = Files.createClient({ apiKey: 'session-key', baseUrl: Files.getBaseUrl(), maxNetworkRetries: 0, networkTimeout: 0 })
      const controller = new AbortController()

      // A model's method, whose caller has no body to read.
      await client.sessions.delete({ signal: controller.signal })
      expect(listenersOf(controller.signal)).toBe(0)

      // The same response through Api.sendRequest keeps its status and its empty body, unread, which a later abort no
      // longer stops: it still reads as empty.
      const deleted = await Api.sendRequest('/sessions', 'DELETE', {}, { client, signal: controller.signal })
      expect([deleted.status, listenersOf(controller.signal)]).toEqual([204, 0])

      controller.abort(new Error('done with the session'))
      expect(await readAll(deleted.data)).toBe('')
      expect(requests).toEqual(['DELETE /api/rest/v1/sessions', 'DELETE /api/rest/v1/sessions'])
    })

    it('retries a GET only once its discarded body has settled within its attempt, whose budget then stops it, whether it is drained or read to be logged', async () => {
      Files.configureNetwork({
        maxNetworkRetries: 1,
        maxNetworkRetryDelay: 0.05,
        minNetworkRetryDelay: 0.05,
        networkTimeout: 0.5,
      })

      // Each call's first request is answered with a 503 whose body never ends, and its retry with the items.
      const events = []
      await serve((request, response, number) => {
        events.push(`request ${number}`)

        if (number % 2 === 1) {
          holdBody(response, 503, 'application/json').then(finished => events.push(`response ${number} closed, finished: ${finished}`))
        } else {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end('[{"id":1}]')
        }
      })

      // At INFO the discarded body is drained; at DEBUG it is read, to be logged, until the budget stops the read.
      const drained = await ApiKey.list()
      const ignore = () => {}

      Files.setLogger({
        debug: ignore,
        error: ignore,
        info: ignore,
        warn: ignore,
      })

      Files.setLogLevel(LogLevel.DEBUG)
      const read = await ApiKey.list()

      expect([drained, read].map(items => items.map(item => item.id))).toEqual([[1], [1]])
      expect(events).toEqual([
        'request 1',
        'response 1 closed, finished: false',
        'request 2',
        'request 3',
        'response 3 closed, finished: false',
        'request 4',
      ])

      expect(fetch).toHaveBeenCalledTimes(4)
    })

    it('follows a redirect only once its body has settled within the attempt, which times out when the body never ends', async () => {
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 0.5 })
      let closed
      let requests = 0
      await serve((request, response, number) => {
        requests = number

        if (number === 1) {
          response.setHeader('Location', '/api/rest/v1/api_keys?moved=1')
          closed = holdBody(response, 302, 'text/html')
        } else {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end('[{"id":1}]')
        }
      })

      const error = await ApiKey.list().catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Request timed out')
      expect(await closed).toBe(false)
      expect(requests).toBe(1)
    })

    it('fails at the redirect limit with its own error only once the redirect\'s body has ended within the attempt', async () => {
      Files.configureNetwork({ maxNetworkRetries: 0, networkTimeout: 2 })
      let closed
      let requests = 0
      await serve((request, response, number) => {
        requests = number
        closed = new Promise(resolve => {
          response.on('close', () => resolve(response.writableFinished))
        })

        // The redirect's body ends only after a while, so the call fails no sooner than that.
        response.writeHead(302, { 'Content-Type': 'text/html', Location: '/api/rest/v1/api_keys?moved=1' })
        response.write('moved, ')
        setTimeout(() => response.end('for good'), 200)
      })

      const error = await Api.sendRequest('/api_keys', 'GET', {}, { follow: 0 }).catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toMatch(/^maximum redirect reached at: /)
      expect(await closed).toBe(true)
      expect(requests).toBe(1)
    })

    it('rejects with the reason of a signal aborted while a discarded body is still arriving, and sends no retry', async () => {
      Files.configureNetwork({
        maxNetworkRetries: 1,
        maxNetworkRetryDelay: 0.001,
        minNetworkRetryDelay: 0.001,
        networkTimeout: 30,
      })

      let closed
      await serve((request, response, number) => {
        if (number === 1) {
          closed = holdBody(response, 503, 'application/json')
        } else {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end('[{"id":1}]')
        }
      })

      const discarding = new Promise(resolve => {
        const onMessage = message => {
          if (`${message}`.startsWith('Request #1 failed with HTTP 503')) {
            resolve()
          }
        }

        Files.setLogger({
          debug: onMessage,
          error: onMessage,
          info: onMessage,
          warn: onMessage,
        })
      })

      const controller = new AbortController()
      const reason = { cause: 'no longer needed' }
      const listing = ApiKey.list({}, { signal: controller.signal }).catch(caught => caught)

      // The retry would follow 1 ms after the discard, so it would long have been sent were the discard not waited for.
      await discarding
      await new Promise(resolve => { setTimeout(resolve, 200) })
      controller.abort(reason)

      expect(await listing).toBe(reason)
      expect(await closed).toBe(false)
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('with attachments', () => {
    let server
    let sockets
    let requests
    let received
    let replies
    let previousNetwork

    // A stream the SDK borrows; autoDestroy is off so that only an explicit destroy would mark it destroyed.
    const borrowedStream = chunks => {
      const stream = new Readable({ autoDestroy: false, read() {} })
      chunks.forEach(chunk => stream.push(chunk))
      stream.push(null)
      return stream
    }

    // An attachment body up to the Base64 of 'fir', the first three bytes of 'first'.
    const FIRST_PIECE = '{"attachment_file":{"encoded_content":"Zmly'

    beforeEach(async () => {
      requests = []
      received = []
      replies = []
      sockets = new Set()

      // requests holds every request that reached the server, with the body received so far and the close of its
      // connection; received holds those whose body arrived complete. A reply function sees the body as it arrives
      // and may answer or reset early.
      server = http.createServer((incoming, response) => {
        const reply = replies.shift()
        const request = {
          body: '',
          closed: new Promise(resolve => { incoming.socket.once('close', resolve) }),
          complete: false,
          headers: incoming.headers,
        }

        requests.push(request)
        incoming.setEncoding('utf8')
        incoming.on('data', text => {
          request.body += text

          if (typeof reply === 'function') {
            reply(request, incoming, response)
          }
        })

        incoming.on('end', () => {
          request.complete = true
          received.push(request)

          if (reply === 'reset') {
            incoming.socket.destroy()
          } else if (!response.headersSent) {
            response.writeHead(201, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ id: received.length }))
          }
        })
      })

      // The server never closes an idle keep-alive connection itself, so any close comes from the client.
      server.keepAliveTimeout = 0
      server.on('connection', socket => sockets.add(socket))
      await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })

      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      Files.setBaseUrl(`http://127.0.0.1:${server.address().port}`)
      Files.configureNetwork({ maxNetworkRetries: 1, maxNetworkRetryDelay: 0.001, minNetworkRetryDelay: 0.001 })
    })

    afterEach(async () => {
      Files.setBaseUrl(API_URL)
      Files.configureNetwork(previousNetwork)
      sockets.forEach(socket => socket.destroy())
      await new Promise(resolve => { server.close(resolve) })
    })

    it('sends a Buffer as an encoded file object with every other parameter unchanged and an exact length', async () => {
      const bytes = Buffer.from([9, 9, 0, 1, 2, 3, 250, 251, 252, 253]).subarray(2)
      const value = {
        empty_list: [],
        empty_object: {},
        manual_file: { encoded_content: 'AAEC', filename: 'manual.txt' },
        nested: { count: 0, flag: false, missing: null },
      }

      const behavior = await Behavior.create({
        attachment_delete: false,
        attachment_file: new Attachment(bytes, { filename: 'a%20b\\c.png', type: 'image/png' }),
        behavior: 'watermark',
        description: '',
        name: null,
        path: 'folder',
        value,
      })

      const expected = JSON.stringify({
        attachment_delete: false,
        attachment_file: { encoded_content: 'AAECA/r7/P0=', filename: 'a%20b\\c.png', type: 'image/png' },
        behavior: 'watermark',
        description: '',
        name: null,
        path: 'folder',
        value,
      })

      expect(behavior).toBeInstanceOf(Behavior)
      expect(received).toHaveLength(1)
      expect(received[0].body).toBe(expected)
      expect(received[0].headers['content-length']).toBe(`${Buffer.byteLength(expected)}`)
      expect(received[0].headers['content-type']).toBe('application/json')
    })

    it('sends the same bytes again when a request with a Buffer attachment is retried', async () => {
      const bytes = Buffer.from(Array.from({ length: 100001 }, (_, index) => index % 251))
      replies.push('reset')

      await Behavior.create({ attachment_file: new Attachment(bytes), behavior: 'watermark', path: 'folder' })

      const expected = JSON.stringify({
        attachment_file: { encoded_content: bytes.toString('base64') },
        behavior: 'watermark',
        path: 'folder',
      })

      expect(received.map(({ body }) => body)).toEqual([expected, expected])
    })

    it('does not resend a stream that was read, and fails with the original error', async () => {
      const source = borrowedStream([Buffer.from('stream '), Buffer.from('contents')])
      const attachment = new Attachment(source, { filename: 'streamed.txt' })
      replies.push('reset')

      const error = await Behavior.create({ attachment_file: attachment, behavior: 'watermark', path: 'folder' })
        .catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toContain('socket hang up')
      expect(received).toHaveLength(1)
      expect(received[0].headers['transfer-encoding']).toBe('chunked')
      expect(JSON.parse(received[0].body).attachment_file).toEqual({
        encoded_content: Buffer.from('stream contents').toString('base64'),
        filename: 'streamed.txt',
      })

      expect(source.destroyed).toBe(false)

      const reuse = await Behavior.create({ attachment_file: attachment, behavior: 'watermark', path: 'folder' })
        .catch(caught => caught)

      expect(reuse).toBeInstanceOf(InvalidParameterError)
      expect(received).toHaveLength(1)
    })

    it('refuses a stream over its limit while the excess is buffered, so no complete body is sent and it keeps its bytes', async () => {
      expect(() => new Attachment(Buffer.alloc(11), { maxBytes: 10 })).toThrow(InvalidParameterError)
      expect(() => new Attachment('watermark.png')).toThrow(InvalidParameterError)

      const source = borrowedStream([Buffer.alloc(6, 1), Buffer.alloc(6, 2)])

      const error = await Behavior.create({
        attachment_file: new Attachment(source, { maxBytes: 10 }),
        behavior: 'watermark',
        path: 'folder',
      }).catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Bad parameter: attachment stream is larger than its maxBytes of 10')
      expect(received).toHaveLength(0)
      expect(source.destroyed).toBe(false)
      expect(source.read()).toEqual(Buffer.concat([Buffer.alloc(6, 1), Buffer.alloc(6, 2)]))
    })

    it('detaches from a stalled stream when the request fails, leaving later chunks to the caller', async () => {
      const source = new Readable({ read() {} })
      source.push(Buffer.from('header:first'))
      expect(source.read(7).toString()).toBe('header:')

      replies.push((request, incoming) => {
        if (request.body === FIRST_PIECE) {
          incoming.socket.destroy()
        }
      })

      const error = await Behavior.create({ attachment_file: new Attachment(source), behavior: 'watermark', path: 'folder' })
        .catch(caught => caught)

      source.push(Buffer.from('later'))

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toMatch(/^request to \S+ failed, reason: /)
      expect(requests).toHaveLength(1)
      expect(requests[0].body).toBe(FIRST_PIECE)
      expect(source.destroyed).toBe(false)
      expect(source.read().toString()).toBe('later')
    })

    it('reads nothing more once the caller cancels from an earlier listener as a later chunk becomes readable', async () => {
      const cancel = new AbortController()
      const source = new Readable({ read() {} })
      let cancelWhenReadable = false

      // Registered before the SDK's own listener, so it runs first in the same readability notification.
      source.on('readable', () => {
        if (cancelWhenReadable) {
          cancel.abort()
        }
      })

      source.push(Buffer.from('first'))
      const firstPieceArrived = new Promise(resolve => {
        replies.push(request => {
          if (request.body === FIRST_PIECE) {
            resolve()
          }
        })
      })

      const creating = Behavior.create(
        { attachment_file: new Attachment(source), behavior: 'watermark', path: 'folder' },
        { signal: cancel.signal },
      ).catch(caught => caught)

      await firstPieceArrived
      cancelWhenReadable = true
      source.push(Buffer.from('later'))
      const error = await creating
      await requests[0].closed

      expect(error).toBe(cancel.signal.reason)
      expect(requests).toHaveLength(1)
      expect(requests[0]).toMatchObject({ body: FIRST_PIECE, complete: false })
      expect(['close', 'end', 'error', 'readable'].map(event => source.listenerCount(event))).toEqual([0, 0, 0, 1])
      expect(source.destroyed).toBe(false)
      expect(source.read().toString()).toBe('later')
    })

    it('closes an upload the server answered early on a keep-alive connection, keeping the response and later chunks', async () => {
      const agent = new http.Agent({ keepAlive: true })
      const source = new Readable({ read() {} })
      source.push(Buffer.from('first'))

      replies.push((request, incoming, response) => {
        if (request.body === FIRST_PIECE) {
          response.writeHead(201, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify({ id: 42 }))
        }
      })

      try {
        const behavior = await Behavior.create(
          { attachment_file: new Attachment(source), behavior: 'watermark', path: 'folder' },
          { agent },
        )

        source.push(Buffer.from('later'))

        // Neither the server nor this test closes the connection before this point.
        await requests[0].closed

        expect(behavior.attributes).toEqual({ id: 42 })
        expect(requests).toHaveLength(1)
        expect(requests[0]).toMatchObject({ body: FIRST_PIECE, complete: false })
        expect([Object.keys(agent.sockets), Object.keys(agent.freeSockets)]).toEqual([[], []])
        expect(source.destroyed).toBe(false)
        expect(source.read().toString()).toBe('later')
      } finally {
        agent.destroy()
      }
    })

    it('releases an unread stream when the application logger throws before the request is sent', async () => {
      const source = borrowedStream([Buffer.from('kept')])
      const attachment = new Attachment(source)
      const failure = new Error('application logger failed')
      const previous = { debugRequest: Files.shouldDebugRequest(), logger: Files.getLogger(), logLevel: Files.getLogLevel() }
      const send = () => Behavior.create({ attachment_file: attachment, behavior: 'watermark', path: 'folder' })

      Files.setLogger({
        debug() { throw failure },
        error() {},
        info() {},
        warn() {},
      })

      Files.setLogLevel(LogLevel.DEBUG)
      Files.configureDebugging({ debugRequest: true })

      let error
      try {
        error = await send().catch(caught => caught)
      } finally {
        Files.setLogger(previous.logger)
        Files.setLogLevel(previous.logLevel)
        Files.configureDebugging({ debugRequest: previous.debugRequest })
      }

      expect(error).toBe(failure)
      expect(requests).toHaveLength(0)
      expect([source.readableLength, source.destroyed]).toEqual([4, false])

      await send()

      expect(requests).toHaveLength(1)
      expect(JSON.parse(received[0].body).attachment_file).toEqual({ encoded_content: Buffer.from('kept').toString('base64') })
    })

    it('lets one of two concurrent requests read a shared stream and refuses the other before it is sent', async () => {
      const attachment = new Attachment(borrowedStream([Buffer.from('shared contents')]))
      const send = () => Behavior.create({ attachment_file: attachment, behavior: 'watermark', path: 'folder' })

      const [first, second] = await Promise.allSettled([send(), send()])

      expect(first.status).toBe('fulfilled')
      expect(second.reason).toBeInstanceOf(InvalidParameterError)
      expect(requests).toHaveLength(1)
      expect(JSON.parse(received[0].body).attachment_file).toEqual({
        encoded_content: Buffer.from('shared contents').toString('base64'),
      })
    })
  })

  it('lists API keys', () => {
    const params = { user_id: 1 }
    nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .query(params)
      .reply(200, [{
        id: 1,
        name: 'test1',
      }, {
        id: 2,
        name: 'test2',
      }])

    return ApiKey.list(params)
      .then(items => {
        expect(items.length).toBe(2)
        expect(items[0].name).toBe('test1')
        expect(items[0].id).toBe(1)
        expect(items[1].name).toBe('test2')
        expect(items[1].id).toBe(2)
      })
  })

  describe('when rate limited', () => {
    let previousNetwork

    beforeEach(() => {
      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      Files.configureNetwork({ maxNetworkRetries: 2, maxNetworkRetryDelay: 0.001, minNetworkRetryDelay: 0.001 })
    })

    afterEach(() => {
      Files.configureNetwork(previousNetwork)
      nock.cleanAll()
    })

    it('retries a GET until it succeeds within the retry budget', async () => {
      const responses = [429, 429].map(status => nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(status, { 'http-code': status, title: 'Too Many Requests', type: 'too-many-requests' }))

      const success = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(200, [{ id: 1 }])

      const items = await ApiKey.list({ per_page: 1 })

      expect(items.map(item => item.id)).toEqual([1])
      expect([...responses, success].map(response => response.isDone())).toEqual([true, true, true])
    })

    it('raises the rate limit error once the retry budget is spent', async () => {
      Files.configureNetwork({ maxNetworkRetries: 0 })
      const limited = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(429, { 'http-code': 429, title: 'Too Many Requests', type: 'too-many-requests' })

      const unused = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(200, [{ id: 1 }])

      const error = await ApiKey.list({ per_page: 1 }).catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.httpCode ?? error.code).toBe(429)
      expect([limited.isDone(), unused.isDone()]).toEqual([true, false])
    })

    it('replays a POST that was rate limited, or hit a transient server error, with its body, within the retry budget', async () => {
      const failures = [429, 503].map(status => nock(API_URL)
        .post('/api/rest/v1/api_keys', { name: 'testing' })
        .reply(status, { 'http-code': status, title: 'Try Again', type: 'try-again' }))

      const created = nock(API_URL)
        .post('/api/rest/v1/api_keys', { name: 'testing' })
        .reply(201, { id: 1, name: 'testing' })

      const apiKey = await ApiKey.create({ name: 'testing' })

      expect(apiKey.id).toBe(1)
      expect([...failures, created].map(response => response.isDone())).toEqual([true, true, true])
    })

    it('does not replay a request of any method answered with 501 Not Implemented', async () => {
      const notImplemented = nock(API_URL)
        .post('/api/rest/v1/api_keys')
        .reply(501, { 'http-code': 501, title: 'Not Implemented', type: 'not-implemented' })

      const unused = nock(API_URL)
        .post('/api/rest/v1/api_keys')
        .reply(201, { id: 1 })

      const error = await ApiKey.create({ name: 'testing' }).catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect([notImplemented.isDone(), unused.isDone()]).toEqual([true, false])
    })
  })

  describe('when the server errors on a GET', () => {
    let previousNetwork

    beforeEach(() => {
      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      Files.configureNetwork({ maxNetworkRetries: 2, maxNetworkRetryDelay: 0.001, minNetworkRetryDelay: 0.001 })
    })

    afterEach(() => {
      Files.configureNetwork(previousNetwork)
      nock.cleanAll()
    })

    it('retries a 500 until it succeeds within the retry budget', async () => {
      const failures = [500, 500].map(status => nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(status, { 'http-code': status, title: 'Internal Server Error', type: 'internal-server-error' }))

      const success = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(200, [{ id: 1 }])

      const items = await ApiKey.list({ per_page: 1 })

      expect(items.map(item => item.id)).toEqual([1])
      expect([...failures, success].map(response => response.isDone())).toEqual([true, true, true])
    })

    it('does not retry a 501', async () => {
      const notImplemented = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(501, { 'http-code': 501, title: 'Not Implemented', type: 'not-implemented' })

      const unused = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(200, [{ id: 1 }])

      const error = await ApiKey.list({ per_page: 1 }).catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect([notImplemented.isDone(), unused.isDone()]).toEqual([true, false])
    })

    it('raises the last server error once the retry budget is spent', async () => {
      const failures = [1, 2, 3].map(attempt => nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(503, { 'http-code': 503, title: `Unavailable ${attempt}`, type: 'service-unavailable' }))

      const unused = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(200, [{ id: 1 }])

      const error = await ApiKey.list({ per_page: 1 }).catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.title).toBe('Unavailable 3')
      expect([...failures, unused].map(response => response.isDone())).toEqual([true, true, true, false])
    })
  })

  it('waits 100, 200 and 400 ms before the default three retries, giving each attempt a budget of 110 seconds', async () => {
    const client = Files.createClient({ apiKey: 'default-key', baseUrl: API_URL })
    const unavailable = [1, 2, 3].map(() => nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .reply(503, { 'http-code': 503, title: 'Service Unavailable', type: 'service-unavailable' }))

    const success = nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .reply(200, [{ id: 1 }])

    // Observes, and still sets, every timer: the waits before retries and each attempt's budget.
    const timers = jest.spyOn(global, 'setTimeout')

    try {
      const keys = await client.apiKeys.list()
      const delays = timers.mock.calls.map(([, delay]) => delay)

      expect(keys.map(key => key.id)).toEqual([1])
      expect(delays.filter(delay => [100, 200, 400].includes(delay))).toEqual([100, 200, 400])
      expect(delays.filter(delay => delay === 110000)).toHaveLength(4)
      expect([...unavailable, success].map(scope => scope.isDone())).toEqual([true, true, true, true])
    } finally {
      timers.mockRestore()
      nock.cleanAll()
    }
  })

  describe('with a failure that a request meets however often it is sent', () => {
    const quickRetries = {
      apiKey: 'retry-key',
      baseUrl: API_URL,
      maxNetworkRetries: 2,
      maxNetworkRetryDelay: 0.001,
      minNetworkRetryDelay: 0.001,
    }

    beforeEach(() => {
      fetch.mockClear()
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('fails without a retry for a redirect whose Location is not a URL, and at the redirect limit', async () => {
      const client = Files.createClient(quickRetries)

      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(302, '', { Location: 'http://[::1' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 2 })
        .times(2)
        .reply(302, '', { Location: '/api/rest/v1/api_keys?per_page=2' })

      const invalid = await client.apiKeys.list({ per_page: 1 }).catch(caught => caught)
      const invalidRequests = fetch.mock.calls.length
      const looping = await Api.sendRequest('/api_keys', 'GET', { per_page: 2 }, { client, follow: 1 }).catch(caught => caught)

      expect(invalid).toBeInstanceOf(FilesError)
      expect(invalid.message).toBe(`Invalid redirect location at: ${API_URL}/api/rest/v1/api_keys?per_page=1`)
      expect(looping).toBeInstanceOf(FilesError)
      expect(looping.message).toMatch(/^maximum redirect reached at: /)

      // The first request alone, and the request with the one redirect it may follow.
      expect([invalidRequests, fetch.mock.calls.length - invalidRequests]).toEqual([1, 2])
    })

    it('fails without a retry for a TLS certificate that fails verification, and retries a broken connection, through any HTTP client', async () => {
      // An HTTP client that fails as Node.js's own fetch does, with the system error's code on its cause.
      const failingWith = code => {
        const calls = []
        const send = url => {
          calls.push(url)
          return Promise.reject(Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) }))
        }

        return { calls, client: Files.createClient({ ...quickRetries, fetch: send }) }
      }

      const untrusted = failingWith('CERT_HAS_EXPIRED')
      const reset = failingWith('ECONNRESET')

      const errors = [await untrusted.client.apiKeys.list().catch(caught => caught), await reset.client.apiKeys.list().catch(caught => caught)]

      expect(errors.every(error => error instanceof FilesError)).toBe(true)
      expect([untrusted.calls.length, reset.calls.length]).toEqual([1, 3])
      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('with an HTTP client of its own', () => {
    const realFetch = jest.requireActual('cross-fetch')
    let sent
    let receivers

    // A fetch that records each request it is given, by name, and the receiver it is called with, and sends it with
    // cross-fetch. A browser's own fetch() fails when it is called as a method of an object other than its window.
    const recording = name => function recordingFetch(url, init) {
      receivers.push(this)
      sent.push({
        fetch: name,
        key: init.headers['X-FilesAPI-Key'],
        method: init.method,
        redirect: init.redirect,
        url,
      })

      return realFetch(url, init)
    }

    beforeEach(() => {
      sent = []
      receivers = []
      fetch.mockClear()
    })

    afterEach(() => {
      Files.configureNetwork({ fetch: null })
      nock.cleanAll()
    })

    it('sends a call\'s requests and their redirects through its own fetch, else its client\'s, else the global one, each called as a function, never with credentials to another origin', async () => {
      const client = Files.createClient({ apiKey: 'fetch-key', baseUrl: API_URL, fetch: recording('client') })

      // The call's own fetch is bound to a receiver of its own, as `fetch.bind(window)` is.
      const caller = { name: 'the call\'s own receiver' }

      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(302, '', { Location: 'http://moved.test/keys' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 2 })
        .reply(200, [{ id: 2 }])
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 3 })
        .reply(200, [{ id: 3 }])

      const moved = nock('http://moved.test', { badheaders: ['X-FilesAPI-Key'] })
        .get('/keys')
        .reply(200, [{ id: 1 }])

      const redirected = await client.apiKeys.list({ per_page: 1 })
      const ownFetch = await client.apiKeys.list({ per_page: 2 }, { fetch: recording('call').bind(caller) })
      Files.configureNetwork({ fetch: recording('global') })
      const globalFetch = await ApiKey.list({ per_page: 3 })

      const request = (name, key, url) => ({
        fetch: name,
        key,
        method: 'GET',
        redirect: 'manual',
        url,
      })

      expect([redirected, ownFetch, globalFetch].map(keys => keys.map(key => key.id))).toEqual([[1], [2], [3]])
      expect(sent).toEqual([
        request('client', 'fetch-key', `${API_URL}/api/rest/v1/api_keys?per_page=1`),
        request('client', undefined, 'http://moved.test/keys'),
        request('call', 'fetch-key', `${API_URL}/api/rest/v1/api_keys?per_page=2`),
        request('global', 'test-key', `${API_URL}/api/rest/v1/api_keys?per_page=3`),
      ])

      // Each fetch is called as a function, as fetch() itself is, never as a method of an object of the SDK's own,
      // which a browser's own fetch() refuses as its receiver; the bound one keeps its own.
      expect(receivers).toEqual([undefined, undefined, caller, undefined])

      expect([moved.isDone(), fetch.mock.calls.length]).toEqual([true, 0])
      expect(() => Files.createClient({ fetch: 'node-fetch' })).toThrow(new ConfigurationError('fetch must be a function'))
      expect(() => Files.configureNetwork({ fetch: {} })).toThrow(new ConfigurationError('fetch must be a function'))
    })

    it('fails without a retry a response its HTTP client reports as redirected, having followed a redirect itself', async () => {
      let calls = 0

      // A client that follows redirects itself, so that the SDK could not keep credentials from another origin.
      const following = async () => {
        calls += 1

        return {
          body: null,
          headers: { entries: () => [['content-type', 'application/json']][Symbol.iterator](), get: () => null },
          json: async () => [],
          ok: true,
          redirected: true,
          status: 200,
          statusText: 'OK',
          text: async () => '[]',
        }
      }

      const client = Files.createClient({
        apiKey: 'fetch-key',
        baseUrl: API_URL,
        fetch: following,
        maxNetworkRetries: 2,
        maxNetworkRetryDelay: 0.001,
        minNetworkRetryDelay: 0.001,
      })

      const error = await client.apiKeys.list().catch(caught => caught)

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('The HTTP client followed a redirect itself: it must leave redirects to the SDK')
      expect(calls).toBe(1)
    })
  })

  describe('with requests to storage', () => {
    const STORAGE_URL = 'https://storage.example.test'

    // A signing time, in the basic ISO 8601 form of X-Amz-Date, offsetMs from now.
    const signedAt = offsetMs => new Date(Date.now() + offsetMs).toISOString().replace(/[-:]|\.\d{3}/g, '')

    let infoMessages
    let client

    beforeEach(() => {
      infoMessages = []
      const ignore = () => {}

      // The API's retry delays are long, so that a storage retry made with them would show.
      client = Files.createClient({
        apiKey: 'storage-key',
        logger: {
          debug: ignore,
          error: ignore,
          info: message => infoMessages.push(message),
          warn: ignore,
        },
        maxNetworkRetries: 1,
        maxNetworkRetryDelay: 5,
        minNetworkRetryDelay: 5,
      })
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('sends a part again as long after a 429 or 503 as its Retry-After asks, at once without one, and 100 ms after any other failure, with the same bytes and no API credentials', async () => {
      const storage = nock(STORAGE_URL, { badheaders: ['X-FilesAPI-Key', 'X-Files-Workspace-Id'], reqheaders: { 'Content-Type': 'text/plain' } })
        .put('/after', 'part bytes')
        .reply(503, 'busy', { 'Retry-After': '1' })
        .put('/after', 'part bytes')
        .reply(200)
        .put('/none', 'part bytes')
        .reply(429, 'slow down')
        .put('/none', 'part bytes')
        .reply(200)
        .put('/other', 'part bytes')
        .reply(500, 'failed')
        .put('/other', 'part bytes')
        .reply(200)
        .put('/never', 'part bytes')
        .reply(501, 'not here')

      // The caller's own headers go to storage, but never the API's credentials or workspace.
      const send = async urlPath => {
        const started = Date.now()
        const outcome = await Api.sendFilePart(`${STORAGE_URL}${urlPath}`, 'PUT', 'part bytes', {
          client,
          headers: { 'Content-Type': 'text/plain', 'X-Files-Workspace-Id': '7', 'X-FilesAPI-Key': 'leaked-key' },
        }).then(response => response.status, error => error)

        return [outcome, Date.now() - started]
      }

      const [after, afterMs] = await send('/after')
      const [none] = await send('/none')
      const [other] = await send('/other')
      const [never] = await send('/never')

      expect([after, none, other]).toEqual([200, 200, 200])
      expect(afterMs).toBeGreaterThanOrEqual(950)
      expect(never).toBeInstanceOf(FilesError)
      expect(infoMessages.filter(message => message.startsWith('Retrying request'))).toEqual([
        'Retrying request (retry 1 of 1) in 1000 ms after HTTP 503',
        'Retrying request (retry 1 of 1) in 0 ms after HTTP 429',
        'Retrying request (retry 1 of 1) in 100 ms after HTTP 500',
      ])

      expect(storage.isDone()).toBe(true)
    })

    it('never sends a request whose signed URL has expired by its own signature, and sends one still valid', async () => {
      const expired = `${STORAGE_URL}/expired?X-Amz-Date=${signedAt(-7200000)}&X-Amz-Expires=3600&X-Amz-Signature=signed`
      const sharedAccess = `${STORAGE_URL}/azure?se=${encodeURIComponent(new Date(Date.now() - 60000).toISOString())}&sig=signed`
      const valid = `${STORAGE_URL}/valid?X-Amz-Date=${signedAt(-60000)}&X-Amz-Expires=3600&X-Amz-Signature=signed`
      let requests = 0

      const storage = nock(STORAGE_URL)
        .persist()
        .put(/^\//)
        .query(true)
        .reply(() => {
          requests += 1
          return [200]
        })

      const refused = await Promise.all([expired, sharedAccess].map(url => Api.sendFilePart(url, 'PUT', 'part bytes', { client })
        .catch(caught => caught)))

      const accepted = await Api.sendFilePart(valid, 'PUT', 'part bytes', { client })

      expect(refused.every(error => error instanceof FilesError)).toBe(true)
      expect(refused.map(error => error.message)).toEqual(Array(2).fill('The signed URL had expired before the request could be sent'))
      expect([accepted.status, requests, storage.isDone()]).toEqual([200, 1, true])
    })

    it('checks a signed URL\'s expiry as each request is sent, after its agent is chosen, and never follows a redirect to an expired one', async () => {
      const start = Date.now()
      let now = start
      const clock = jest.spyOn(Date, 'now').mockImplementation(() => now)
      const sent = []

      const storage = nock(STORAGE_URL)
        .persist()
        .put(/^\//)
        .query(true)
        .reply(uri => {
          sent.push(uri.split('?')[0])
          return uri.startsWith('/redirecting')
            ? [307, '', { Location: `${STORAGE_URL}/expired?sig=signed&se=${encodeURIComponent(new Date(start - 1000).toISOString())}` }]
            : [200]
        })

      // Valid for a second, by its own signature.
      const shortLived = urlPath => `${STORAGE_URL}${urlPath}?sig=signed&se=${encodeURIComponent(new Date(start + 1000).toISOString())}`

      try {
        // The agent's choice takes the clock past the URL's expiry: the request is not sent.
        const late = await Api.sendFilePart(shortLived('/late'), 'PUT', 'part bytes', {
          client,
          getAgentForUrl: () => {
            now = start + 2000
            return undefined
          },
        }).catch(caught => caught)

        // Still valid as it is sent, the same short-lived URL is: its redirect to an expired URL is not followed.
        now = start
        const timely = await Api.sendFilePart(shortLived('/timely'), 'PUT', 'part bytes', { client })
        const redirected = await Api.sendFilePart(shortLived('/redirecting'), 'PUT', 'part bytes', { client }).catch(caught => caught)

        expect([late, redirected].every(error => error instanceof FilesError)).toBe(true)
        expect([late.message, redirected.message]).toEqual(Array(2).fill('The signed URL had expired before the request could be sent'))
        expect(timely.status).toBe(200)
        expect(sent).toEqual(['/timely', '/redirecting'])
        expect(infoMessages.filter(message => message.startsWith('Retrying request'))).toEqual([])
      } finally {
        clock.mockRestore()
        storage.persist(false)
      }
    })

    it('fails, without sending it again, a request whose Retry-After is longer than a timer can wait, and waits for one just short of that', async () => {
      const warnings = []
      const onWarning = warning => warnings.push(warning.name)
      process.on('warning', onWarning)
      let requests = 0

      const storage = nock(STORAGE_URL)
        .persist()
        .put(/^\//)
        .reply(uri => {
          requests += 1
          const retryAfter = { '/digits': '9'.repeat(30), '/longest': '2147483', '/overflow': '2147484' }[uri]
          return [503, 'busy', { 'Retry-After': retryAfter }]
        })

      try {
        const overflow = await Api.sendFilePart(`${STORAGE_URL}/overflow`, 'PUT', 'part bytes', { client }).catch(caught => caught)
        const digits = await Api.sendFilePart(`${STORAGE_URL}/digits`, 'PUT', 'part bytes', { client }).catch(caught => caught)
        const refusedRequests = requests

        // The longest wait a timer allows is waited for: only the signal then ends it.
        const controller = new AbortController()
        const reason = { cause: 'not waiting weeks' }
        const waiting = Api.sendFilePart(`${STORAGE_URL}/longest`, 'PUT', 'part bytes', { client, signal: controller.signal })
          .catch(caught => caught)

        await new Promise(resolve => { setTimeout(resolve, 50) })
        controller.abort(reason)
        const longest = await waiting

        expect([overflow, digits].every(error => error instanceof FilesError)).toBe(true)
        expect([refusedRequests, requests]).toEqual([2, 3])
        expect(longest).toBe(reason)
        expect(infoMessages.filter(message => message.includes('cannot be scheduled'))).toEqual([
          'Request #1 is not retried because its wait of 2147484000 ms cannot be scheduled',
          `Request #1 is not retried because its wait of ${Number('9'.repeat(30)) * 1000} ms cannot be scheduled`,
        ])

        expect(infoMessages).toContain('Retrying request (retry 1 of 1) in 2147483000 ms after HTTP 503')
        expect(warnings).not.toContain('TimeoutOverflowWarning')
      } finally {
        process.removeListener('warning', onWarning)
        storage.persist(false)
      }
    })

    it('returns a WHATWG body unread as a lazy stream of its own bytes and kind, which lets go of the call\'s signal and budget once read to its end, failed or cancelled, and fails when either stops it first', async () => {
      // A WHATWG body that gives its chunks one at a time, each only once it is read, and then ends, or fails with
      // failure when one is given; a byte stream with type 'bytes'. It records how often it was read and each reason it
      // was cancelled with, and keeps its controller, with which a case can fail it while it is unread.
      const sourceOf = ({ chunks, failure, type }) => {
        const source = { cancelled: [], pulls: 0 }
        source.stream = new ReadableStream({
          cancel: reason => { source.cancelled.push(reason) },
          pull: controller => {
            const chunk = chunks[source.pulls]
            source.pulls += 1

            if (chunk) {
              controller.enqueue(new Uint8Array(chunk))
            } else if (failure) {
              controller.error(failure)
            } else {
              controller.close()
              controller.byobRequest?.respond(0)
            }
          },
          start: controller => { source.controller = controller },
          type,
        }, { highWaterMark: 0 })

        return source
      }

      // A byte source that answers BYOB requests alone, without auto-allocation, so that a default read of it would never
      // be answered: it gives 7, 8 and 9, then ends. It counts the requests it was asked with and those without one.
      const byobSource = () => {
        const source = { byobPulls: 0, defaultPulls: 0 }
        source.stream = new ReadableStream({
          pull: controller => {
            const request = controller.byobRequest

            if (!request) {
              source.defaultPulls += 1
              return
            }

            source.byobPulls += 1
            request.view.set([7, 8, 9])
            request.respond(3)
            controller.close()
          },
          type: 'bytes',
        })

        return source
      }

      // Sends a part through a client whose fetch answers 200 with the source's stream as its body, unread, and records
      // the signal each request was sent with.
      const signals = []
      const send = async (source, networkTimeout, signal) => {
        const answering = Files.createClient({
          fetch: async (url, init) => {
            signals.push(init.signal)
            return {
              body: source.stream,
              headers: { entries: () => [['content-type', 'application/octet-stream']][Symbol.iterator](), get: () => null },
              ok: true,
              redirected: false,
              status: 200,
              statusText: 'OK',
            }
          },
          maxNetworkRetries: 0,
          networkTimeout,
        })

        const { data } = await Api.sendFilePart(`${STORAGE_URL}/part`, 'PUT', 'part bytes', { client: answering, signal })
        return data
      }

      const listeners = signal => getEventListeners(signal, 'abort').length

      // How a first read of stream settles: { reason, rejected: true } when it rejects, with whatever reason, null and
      // other falsy ones included, or { rejected: false, value } when it does not.
      const outcomeOf = stream => stream.getReader().read().then(value => ({ rejected: false, value }), reason => ({ reason, rejected: true }))

      // A byte stream, read by a BYOB reader as such a body can be, gives exactly its bytes, each chunk only once it is
      // asked for, and nothing before. Until its end, the call's signal is held; then it is let go, and so is the finite
      // budget, which never stops the request afterwards.
      const bytes = sourceOf({ chunks: [[1, 2, 3], [4]], type: 'bytes' })
      const reading = new AbortController()
      const read = await send(bytes, 0.2, reading.signal)

      expect(read).toBeInstanceOf(ReadableStream)
      expect([bytes.pulls, listeners(reading.signal)]).toEqual([0, 1])

      const reader = read.getReader({ mode: 'byob' })
      const first = await reader.read(new Uint8Array(8))
      expect([[...first.value], bytes.pulls, listeners(reading.signal)]).toEqual([[1, 2, 3], 1, 1])

      const second = await reader.read(new Uint8Array(8))
      const end = await reader.read(new Uint8Array(8))
      expect([[...second.value], end.done, listeners(reading.signal)]).toEqual([[4], true, 0])

      await new Promise(resolve => { setTimeout(resolve, 400) })
      expect([signals[0].aborted, bytes.cancelled]).toEqual([false, []])

      // A byte source that answers BYOB requests alone gives exactly its bytes, then its end, to a BYOB reader and to a
      // default reader alike: it is always read with a BYOB request, never a default one.
      for (const mode of ['byob', undefined]) {
        const byob = byobSource()
        const byobSignal = new AbortController()
        // eslint-disable-next-line no-await-in-loop
        const byobRead = await send(byob, 0, byobSignal.signal)
        const byobReader = byobRead.getReader({ mode })
        const readOnce = () => (mode ? byobReader.read(new Uint8Array(8)) : byobReader.read())

        // eslint-disable-next-line no-await-in-loop
        const [got, ended] = [await readOnce(), await readOnce()]
        expect([[...got.value], ended.done, byob.byobPulls, byob.defaultPulls, listeners(byobSignal.signal)]).toEqual([[7, 8, 9], true, 1, 0, 0])
      }

      // Any other WHATWG stream is handed on as that kind. Cancelled unread, it cancels the body with the same reason,
      // reads none of it, and lets go of the signal.
      const plain = sourceOf({ chunks: [[5]] })
      const cancelling = new AbortController()
      const reason = { cause: 'not needed' }
      const cancelled = await send(plain, 0, cancelling.signal)

      expect(() => cancelled.getReader({ mode: 'byob' })).toThrow()
      await cancelled.cancel(reason)
      expect([plain.cancelled.length, plain.pulls, listeners(cancelling.signal)]).toEqual([1, 0, 0])
      expect(plain.cancelled[0]).toBe(reason)

      // A body that fails fails the stream with its own error, and lets go of the signal.
      const broken = new Error('connection reset')
      const failing = sourceOf({ chunks: [[6]], failure: broken })
      const failingSignal = new AbortController()
      const failed = await send(failing, 0, failingSignal.signal)
      const failedReader = failed.getReader()

      expect([...(await failedReader.read()).value]).toEqual([6])
      expect(await failedReader.read().then(() => null, error => error)).toBe(broken)
      expect(listeners(failingSignal.signal)).toBe(0)

      // Still unread when the call's signal aborts, the stream fails with the signal's reason itself, whatever it is,
      // which the body is cancelled with too, unread, and the request is stopped.
      for (const signalReason of [new Error('no longer reading'), { cause: 'no longer reading' }, null, false, 0, NaN]) {
        const unread = sourceOf({ chunks: [[7]] })
        const stopping = new AbortController()
        // eslint-disable-next-line no-await-in-loop
        const stopped = await send(unread, 0, stopping.signal)
        stopping.abort(signalReason)

        // eslint-disable-next-line no-await-in-loop
        const stopOutcome = await outcomeOf(stopped)
        expect([stopOutcome.rejected, Object.is(stopOutcome.reason, signalReason), unread.cancelled.length, unread.pulls, listeners(stopping.signal), signals[signals.length - 1].aborted])
          .toEqual([true, true, 1, 0, 0, true])
        expect(Object.is(unread.cancelled[0], signalReason)).toBe(true)
      }

      // A body that fails while nothing reads it is let go of at once, unread, and its failure stands: an abort after it
      // fails the stream with the body's own error, not the abort's reason, and cancels nothing.
      const original = new Error('the body failed first')
      const unreadFailing = sourceOf({ chunks: [[7]] })
      const failingFirst = new AbortController()
      const failedFirst = await send(unreadFailing, 0, failingFirst.signal)

      unreadFailing.controller.error(original)
      await new Promise(resolve => { setImmediate(resolve) })
      expect([unreadFailing.pulls, listeners(failingFirst.signal)]).toEqual([0, 0])

      failingFirst.abort(new Error('aborted after the body failed'))
      const firstOutcome = await outcomeOf(failedFirst)
      expect([firstOutcome.rejected, firstOutcome.reason === original, unreadFailing.pulls, unreadFailing.cancelled]).toEqual([true, true, 0, []])

      // So does a body that fails just before the abort, in the same turn, before anything could observe its failure:
      // the stream still fails with the body's own error, reads none of it, cancels nothing and lets go of the signal.
      const justBefore = new Error('the body failed just before the abort')
      const sameTurn = sourceOf({ chunks: [[7]] })
      const failingJustBefore = new AbortController()
      const failedJustBefore = await send(sameTurn, 0, failingJustBefore.signal)

      sameTurn.controller.error(justBefore)
      failingJustBefore.abort(new Error('aborted in the same turn'))
      const sameTurnOutcome = await outcomeOf(failedJustBefore)
      expect([sameTurnOutcome.rejected, sameTurnOutcome.reason === justBefore, sameTurn.pulls, sameTurn.cancelled, listeners(failingJustBefore.signal)])
        .toEqual([true, true, 0, [], 0])

      // Still unread when its budget runs out, it fails with the budget's FilesError, which the body is cancelled with.
      const late = sourceOf({ chunks: [[8]] })
      const timedOut = await send(late, 0.2, undefined)
      await new Promise(resolve => { setTimeout(resolve, 400) })

      const timeoutOutcome = await outcomeOf(timedOut)
      expect(timeoutOutcome.rejected).toBe(true)
      expect(timeoutOutcome.reason).toBeInstanceOf(FilesError)
      expect([timeoutOutcome.reason.message, late.cancelled.length, late.pulls]).toEqual(['Request timed out', 1, 0])
      expect(late.cancelled[0]).toBe(timeoutOutcome.reason)
    })

    it('carries a Node.js body returned unread in its own chunks and encoding, and fails it with the stop the call\'s signal or budget chose, not the abort error its HTTP client then gives it, stopping the request at once, without waiting for a destruction of the body\'s own that completes later and never emits close', async () => {
      // A Node.js body whose own destruction completes only 30 ms after it begins, and which never emits close, as a
      // stream may be made to. fetch answers 200 with it, unread, and as the request's signal aborts, fails it at once
      // with an abort error of its own, later, and destroys it, as an HTTP client may. The body records each error and
      // close it emits, and whether the request's signal had aborted by the time its destruction completed, which
      // destroyed then resolves.
      const slowlyDestroyed = () => {
        const body = {
          closes: 0,
          errors: [],
          later: Object.assign(new Error('The HTTP client aborted the request'), { name: 'AbortError' }),
        }

        let completeDestruction = null
        body.destroyed = new Promise(resolve => { completeDestruction = resolve })
        body.stream = new Readable({
          destroy: (error, callback) => {
            setTimeout(() => {
              body.abortedByThen = body.signal.aborted
              callback(error)
              completeDestruction()
            }, 30)
          },
          emitClose: false,
          read() {},
        })

        body.stream.on('close', () => { body.closes += 1 })
        body.stream.on('error', error => { body.errors.push(error) })
        body.fetch = async (url, init) => {
          body.signal = init.signal
          body.signal.addEventListener('abort', () => {
            body.stream.emit('error', body.later)
            body.stream.destroy(body.later)
          }, { once: true })

          return {
            body: body.stream,
            headers: { entries: () => [['content-type', 'application/octet-stream']][Symbol.iterator](), get: () => null },
            ok: true,
            redirected: false,
            status: 200,
            statusText: 'OK',
          }
        }

        return body
      }

      const send = async (body, networkTimeout, signal) => {
        const answering = Files.createClient({ fetch: body.fetch, maxNetworkRetries: 0, networkTimeout })
        const { data } = await Api.sendFilePart(`${STORAGE_URL}/part`, 'PUT', 'part bytes', { client: answering, signal })
        return data
      }

      // How a first read of a Node.js stream, through its async iterator, settles: rejected, with whatever reason, or not.
      const outcomeOf = stream => stream[Symbol.asyncIterator]().next()
        .then(value => ({ rejected: false, value }), reason => ({ reason, rejected: true }))

      const listeners = signal => getEventListeners(signal, 'abort').length

      // The caller's signal aborts the request at once, and its HTTP client then fails the body with its own abort error.
      // The stream returned, a Node.js stream, still fails with the signal's reason, an Error as it is, or a falsy one as
      // the cause of an AbortError, as Node.js's own addAbortSignal() gives, and does so before the body's own
      // destruction has completed.
      for (const reason of [new Error('no longer reading'), null]) {
        const cancelled = slowlyDestroyed()
        const cancelling = new AbortController()
        // eslint-disable-next-line no-await-in-loop
        const data = await send(cancelled, 0, cancelling.signal)
        const reading = outcomeOf(data)

        cancelling.abort(reason)
        expect([data instanceof Readable, cancelled.signal.aborted, cancelled.errors[0] === cancelled.later]).toEqual([true, true, true])

        // eslint-disable-next-line no-await-in-loop
        const outcome = await reading
        expect([outcome.rejected, cancelled.abortedByThen]).toEqual([true, undefined])

        if (reason) {
          expect(outcome.reason).toBe(reason)
        } else {
          expect([outcome.reason.name, outcome.reason.code, Object.is(outcome.reason.cause, reason)]).toEqual(['AbortError', 'ABORT_ERR', true])
        }

        // eslint-disable-next-line no-await-in-loop
        await cancelled.destroyed
        expect([cancelled.abortedByThen, cancelled.closes, listeners(cancelling.signal)]).toEqual([true, 0, 0])
      }

      // So does the budget, whose "Request timed out" FilesError the stream fails with, whatever the HTTP client then
      // gives the body.
      const late = slowlyDestroyed()
      const timeoutOutcome = await outcomeOf(await send(late, 0.05))

      expect([timeoutOutcome.rejected, late.errors[0] === late.later, late.abortedByThen]).toEqual([true, true, undefined])
      expect(timeoutOutcome.reason).toBeInstanceOf(FilesError)
      expect(timeoutOutcome.reason.message).toBe('Request timed out')

      await late.destroyed
      expect([late.abortedByThen, late.closes]).toEqual([true, 0])

      // Read to its end, the stream gives a body's chunks as the body gives them, and has its encoding: the strings that
      // a native stream's setEncoding('utf8') or setEncoding('latin1') decodes, as those strings, never encoded again,
      // and the bytes of a body without an encoding as those bytes. Each body holds é, whose latin1 byte is e9 and whose
      // UTF-8 bytes are c3 a9.
      const chunksOf = async stream => {
        const chunks = []

        for await (const chunk of stream) {
          chunks.push(typeof chunk === 'string' ? `text ${chunk}` : `bytes ${Buffer.from(chunk).toString('hex')}`)
        }

        return chunks
      }

      for (const [encoding, bytes, expected] of [['utf8', 'c3a9', ['text é']], ['latin1', 'e9', ['text é']], [null, 'e9', ['bytes e9']]]) {
        const body = Readable.from([Buffer.from(bytes, 'hex')], { objectMode: false })

        if (encoding) {
          body.setEncoding(encoding)
        }

        const answering = Files.createClient({
          fetch: async () => ({
            body,
            headers: { entries: () => [['content-type', 'application/octet-stream']][Symbol.iterator](), get: () => null },
            ok: true,
            redirected: false,
            status: 200,
            statusText: 'OK',
          }),
          maxNetworkRetries: 0,
          networkTimeout: 0,
        })

        // eslint-disable-next-line no-await-in-loop
        const { data } = await Api.sendFilePart(`${STORAGE_URL}/part`, 'PUT', 'part bytes', { client: answering })
        expect([data instanceof Readable, data.readableEncoding]).toEqual([true, encoding])

        // eslint-disable-next-line no-await-in-loop
        expect(await chunksOf(data)).toEqual(expected)
      }
    })
  })

  describe('when a call is cancelled', () => {
    let previousNetwork
    let previousLogLevel
    let releases

    // Holds the next request for API keys unanswered; arrived resolves once it reaches the server.
    const holdRequest = () => {
      let arrive
      const arrived = new Promise(resolve => { arrive = resolve })
      const released = new Promise(resolve => { releases.push(resolve) })

      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .reply((uri, body, callback) => {
          arrive()
          released.then(() => callback(null, [200, []]))
        })

      return arrived
    }

    // An application logger that calls onMessage with each message it is given, at any level.
    const loggerCalling = onMessage => ({
      debug: onMessage,
      error: onMessage,
      info: onMessage,
      warn: onMessage,
    })

    beforeEach(() => {
      releases = []
      previousLogLevel = Files.getLogLevel()
      previousNetwork = {
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      fetch.mockClear()
    })

    afterEach(() => {
      releases.forEach(release => release())
      Files.configureNetwork(previousNetwork)
      Files.setLogLevel(previousLogLevel)
      Files.setLogger(null)
      nock.cleanAll()
    })

    it('ends a wait before a retry as soon as the signal aborts, rejecting with its own reason and sending nothing more', async () => {
      Files.configureNetwork({ maxNetworkRetries: 2, maxNetworkRetryDelay: 60, minNetworkRetryDelay: 60 })
      const unavailable = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .reply(503, { 'http-code': 503, title: 'Service Unavailable', type: 'service-unavailable' })

      const unused = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }])

      // The retry's 60 s wait has begun once the logger has been told of it.
      const retrying = new Promise(resolve => {
        Files.setLogger(loggerCalling(message => {
          if (`${message}`.startsWith('Retrying request')) {
            resolve()
          }
        }))
      })

      const controller = new AbortController()
      const reason = { cause: 'no longer needed' }
      const listing = ApiKey.list({}, { signal: controller.signal }).catch(caught => caught)

      await retrying
      controller.abort(reason)

      expect(await listing).toBe(reason)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect([unavailable.isDone(), unused.isDone()]).toEqual([true, false])
    })

    it('rejects with the signal\'s reason even when it is falsy, and with an AbortError when the signal has none', async () => {
      const firstArrived = holdRequest()
      const controller = new AbortController()
      const listing = ApiKey.list({}, { signal: controller.signal }).catch(caught => caught)

      await firstArrived
      controller.abort(0)

      expect(await listing).toBe(0)

      // A signal of a runtime or polyfill that predates AbortSignal#reason.
      const secondArrived = holdRequest()
      const signal = Object.assign(new EventTarget(), { aborted: false, reason: undefined })
      const legacyListing = ApiKey.list({}, { signal }).catch(caught => caught)

      await secondArrived
      signal.aborted = true
      signal.dispatchEvent(new Event('abort'))

      const error = await legacyListing
      expect(error).toBeInstanceOf(Error)
      expect(error).not.toBeInstanceOf(FilesError)
      expect(error.name).toBe('AbortError')
      expect(fetch).toHaveBeenCalledTimes(2)
    })

    it('sends no request when the application logger cancels the call as it is told of the request, keeping the reason', async () => {
      const unused = nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }])

      // The application logger aborts the signal as it is given the message that starts with logged.
      const cancelledOn = (logged, reason) => {
        const controller = new AbortController()
        Files.setLogger(loggerCalling(message => {
          if (`${message}`.startsWith(logged)) {
            controller.abort(reason)
          }
        }))

        return ApiKey.list({}, { signal: controller.signal }).catch(caught => caught)
      }

      Files.setLogLevel(LogLevel.DEBUG)
      const reason = new Error('not now')

      expect(await cancelledOn('Sending request #1', '')).toBe('')
      expect(await cancelledOn('Sending options:', reason)).toBe(reason)
      expect(fetch).not.toHaveBeenCalled()
      expect(unused.isDone()).toBe(false)
    })

    it('keeps the error of a failure that ended the call before its signal aborted', async () => {
      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .reply(404, {
          error: 'Not Found',
          'http-code': 404,
          title: 'Not Found',
          type: 'not-found',
        })

      // The application logger aborts the signal as it is given the 404's body, which has been read in full by then.
      const controller = new AbortController()
      Files.setLogLevel(LogLevel.DEBUG)
      Files.setLogger(loggerCalling(message => {
        if (message === 'Response Data: ') {
          controller.abort(new Error('too late'))
        }
      }))

      const error = await ApiKey.list({}, { signal: controller.signal }).catch(caught => caught)

      expect(controller.signal.aborted).toBe(true)
      expect(error).toBeInstanceOf(NotFoundError)
    })
  })

  it('lists every page by following the next cursor header', async () => {
    const pages = [
      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ user_id: 1 })
        .reply(200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'next+/= opaque?#' }),
      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'next+/= opaque?#', page: 2, user_id: 1 })
        .reply(200, [{ id: 2 }]),
    ]

    try {
      const items = await ApiKey.list({ user_id: 1 })

      expect(items.map(item => item.id)).toEqual([1, 2])
      expect(pages.map(page => page.isDone())).toEqual([true, true])
    } finally {
      nock.cleanAll()
    }
  })

  it('prefers the next cursor header and still follows the legacy cursor header alone', async () => {
    const pages = [
      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ user_id: 1 })
        .reply(200, [{ id: 1 }], { 'X-Files-Cursor': 'legacy-2', 'X-Files-Cursor-Next': 'next-2' }),
      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'next-2', page: 2, user_id: 1 })
        .reply(200, [{ id: 2 }], { 'X-Files-Cursor': 'legacy-3' }),
      nock(API_URL)
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'legacy-3', page: 3, user_id: 1 })
        .reply(200, [{ id: 3 }]),
    ]

    try {
      const items = await ApiKey.list({ user_id: 1 })

      expect(items.map(item => item.id)).toEqual([1, 2, 3])
      expect(pages.map(page => page.isDone())).toEqual([true, true, true])
    } finally {
      nock.cleanAll()
    }
  })

  it('lists a cursor-paginated collection one page at a time through its iterator, with the settings it was made with', async () => {
    const client = Files.createClient({ apiKey: 'iterator-key', baseUrl: API_URL, workspaceId: 3 })
    const pages = nock(API_URL, { reqheaders: { 'X-Call': 'iterate', 'X-Files-Workspace-Id': '3', 'X-FilesAPI-Key': 'iterator-key' } })
      .get('/api/rest/v1/users')
      .query({ per_page: 2, sort_by: { username: 'asc' } })
      .reply(200, [{ id: 1 }, { id: 2 }], { 'X-Files-Cursor-Next': 'next+/= opaque?#' })
      .get('/api/rest/v1/users')
      .query({ cursor: 'next+/= opaque?#', per_page: 2, sort_by: { username: 'asc' } })
      .reply(200, [{ id: 3 }, { id: 4 }], { 'X-Files-Cursor': 'legacy-3' })
      .get('/api/rest/v1/users')
      .query({ cursor: 'legacy-3', per_page: 2, sort_by: { username: 'asc' } })
      .reply(200, [{ id: 5 }])
      .get('/api/rest/v1/users')
      .query({ per_page: 2 })
      .reply(200, [{ id: 6 }, { id: 7 }], { 'X-Files-Cursor-Next': 'never-requested' })

    // The global settings when the iterator made without a client is created: API_URL, test-key and no workspace.
    const staticPages = nock(API_URL, { badheaders: ['X-Files-Workspace-Id'], reqheaders: { 'X-Call': 'iterate', 'X-FilesAPI-Key': 'test-key' } })
      .get('/api/rest/v1/users')
      .query({ per_page: 1 })
      .reply(200, [{ id: 8 }], { 'X-Files-Cursor-Next': 'static-2' })
      .get('/api/rest/v1/users')
      .query({ cursor: 'static-2', per_page: 1 })
      .reply(200, [{ id: 9 }], { 'X-Files-Cursor-Next': 'never-requested' })

    let requests = 0
    pages.on('request', () => { requests += 1 })
    staticPages.on('request', () => { requests += 1 })

    const models = []
    const take = async iterator => {
      const { done, value } = await iterator.next()
      models.push(value)
      return [done ? 'done' : value.id, requests]
    }

    try {
      const params = { per_page: 2, sort_by: { username: 'asc' } }
      const options = { headers: { 'X-Call': 'iterate' }, signal: new AbortController().signal }
      const users = client.users.listIterator(params, options)
      params.per_page = 9
      params.sort_by.username = 'desc'
      options.headers['X-Call'] = 'changed'

      // Each page is requested only once the items before it have been taken, with the params as they were when the
      // iterator was made, its nested sort_by map included, whatever the caller changes before or between pages.
      expect(requests).toBe(0)
      const firstPage = [await take(users), await take(users)]
      params.sort_by.email = 'asc'
      expect([...firstPage, await take(users), await take(users), await take(users), await take(users)])
        .toEqual([[1, 1], [2, 1], [3, 2], [4, 2], [5, 3], ['done', 3]])

      const users5 = models.slice(0, 5)
      expect(users5.every(user => user instanceof User)).toBe(true)
      expect(users5.every(user => user.options.client === client && user.options.headers['X-Call'] === 'iterate')).toBe(true)
      expect(users5.some(user => 'signal' in user.options)).toBe(false)

      // Leaving after the first item requests nothing more.
      const early = client.users.listIterator({ per_page: 2 }, { headers: { 'X-Call': 'iterate' } })
      expect(await take(early)).toEqual([6, 4])
      expect(await early.return()).toEqual({ done: true, value: undefined })
      expect(await early.next()).toEqual({ done: true, value: undefined })
      expect([requests, pages.isDone()]).toEqual([4, true])

      // Made without a client, an iterator keeps the global settings as they were when it was made, whatever they
      // become before or between its pages. Each page's models have that page's own headers.
      const statics = User.listIterator({ per_page: 1 }, { headers: { 'X-Call': 'iterate' }, signal: new AbortController().signal })
      Files.setApiKey('changed-key')
      Files.setBaseUrl('http://changed.test')
      expect(await take(statics)).toEqual([8, 5])

      const [eight] = models.slice(-1)
      eight.options.headers['X-Call'] = 'changed'
      Files.setWorkspaceId(9)
      expect(await take(statics)).toEqual([9, 6])
      expect(await statics.return()).toEqual({ done: true, value: undefined })
      expect([requests, staticPages.isDone()]).toEqual([6, true])

      const [nine] = models.slice(-1)
      const settings = nine.options.client
      expect([settings.getApiKey(), settings.getBaseUrl(), settings.getWorkspaceId(), 'signal' in nine.options])
        .toEqual(['test-key', API_URL, null, false])

      expect([nine.options.headers['X-Call'], Files.getApiKey(), Files.getBaseUrl()]).toEqual(['iterate', 'changed-key', 'http://changed.test'])
    } finally {
      Files.setApiKey('test-key')
      Files.setBaseUrl(API_URL)
      nock.cleanAll()
    }
  })

  it('iterates past an empty page and fails on invalid params, a repeated cursor, a failed page or a cancelled one, which is not retried, and gives nothing more once cancelled within a page', async () => {
    // The clients keep the default of 3 network retries.
    const client = Files.createClient({ apiKey: 'iterator-key', baseUrl: API_URL })
    let reachedHeld
    let releaseHeld
    const reached = new Promise(resolve => { reachedHeld = resolve })
    const held = new Promise(resolve => { releaseHeld = resolve })

    // At DEBUG, the body of a 503 to be retried is read to log it. The caller cancels once that read has begun, while
    // the body is still arriving; or, through its application logger, once the whole body has been read and is logged.
    // A read that fails logs no Response Data, and discarding has been aborted already when the complete 503 arrives.
    // Or the logger cancels as it is told that a request will be retried, which happens in no case before the last.
    const discarding = new AbortController()
    const readInFull = new AbortController()
    const retrying = new AbortController()
    const infoMessages = []
    const debugClient = Files.createClient({
      apiKey: 'iterator-key',
      baseUrl: API_URL,
      debugResponseHeaders: true,
      logger: {
        debug: (...messages) => {
          if (messages[0] === 'Response Headers: ') {
            setImmediate(() => discarding.abort())
          }

          if (messages[0] === 'Response Data: ') {
            Promise.resolve().then(() => readInFull.abort())
          }
        },
        error: () => {},
        info: (...messages) => {
          const message = messages.join(' ')
          infoMessages.push(message)
          if (message.startsWith('Retrying request')) {
            retrying.abort()
          }
        },
        warn: () => {},
      },
      logLevel: LogLevel.DEBUG,
    })

    const partialBody = new Readable({ read() {} })
    partialBody.push('{"error": "Service Unav')

    const pages = nock(API_URL)
      .get('/api/rest/v1/users')
      .query({ per_page: 2 })
      .reply(200, [], { 'X-Files-Cursor-Next': 'after-empty' })
      .get('/api/rest/v1/users')
      .query({ cursor: 'after-empty', per_page: 2 })
      .reply(200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'after-empty' })
      .get('/api/rest/v1/users')
      .query({ per_page: 3 })
      .reply(200, [{ id: 10 }], { 'X-Files-Cursor-Next': 'missing' })
      .get('/api/rest/v1/users')
      .query({ cursor: 'missing', per_page: 3 })
      .reply(404, {
        error: 'Not Found',
        'http-code': 404,
        title: 'Not Found',
        type: 'not-found',
      })
      .get('/api/rest/v1/users')
      .query({ per_page: 4 })
      .reply((uri, body, callback) => {
        reachedHeld()
        held.then(() => callback(null, [200, [{ id: 20 }]]))
      })
      .get('/api/rest/v1/users')
      .query({ per_page: 5 })
      .reply(503, () => partialBody, { 'Content-Type': 'application/json' })
      .get('/api/rest/v1/users')
      .query({ per_page: 6 })
      .reply(503, { error: 'Service Unavailable' })
      .get('/api/rest/v1/users')
      .query({ per_page: 7 })
      .reply(503, { error: 'Service Unavailable' })
      .get('/api/rest/v1/users')
      .query({ per_page: 8 })
      .reply(200, [{ id: 30 }, { id: 31 }], { 'X-Files-Cursor-Next': 'after-buffered' })
      .get('/api/rest/v1/users')
      .query({ per_page: 9 })
      .reply(200, [{ id: 40 }])

    // The page after one already received, which an iteration cancelled within that page never requests.
    const laterPage = nock(API_URL)
      .get('/api/rest/v1/users')
      .query({ cursor: 'after-buffered', per_page: 8 })
      .reply(200, [{ id: 32 }])

    const finished = { done: true, value: undefined }

    // Observes, and still sets, every timer, so that a retry's backoff timer would be seen.
    const timers = jest.spyOn(global, 'setTimeout')

    try {
      // Params that are not an object reach the list method as given, which rejects them before any request.
      fetch.mockClear()
      const invalid = Behavior.listForIterator('inbox', [])
      const invalidError = await invalid.next().catch(caught => caught)
      expect(invalidError).toBeInstanceOf(InvalidParameterError)
      expect(invalidError.message).toBe('Bad parameter: params must be of type object, received array')
      expect(await invalid.next()).toEqual(finished)
      expect(fetch).not.toHaveBeenCalled()

      // The empty page is passed over; the next one gives back the cursor it was requested with.
      const repeated = client.users.listIterator({ per_page: 2 })
      const repeatError = await repeated.next().catch(caught => caught)
      expect(repeatError).toBeInstanceOf(FilesError)
      expect(repeatError.message).toBe('The API gave the same cursor for the next page as for this one, so the list cannot go on')
      expect(await repeated.next()).toEqual(finished)

      // A later page's error rejects instead of ending the list quietly.
      const failing = client.users.listIterator({ per_page: 3 })
      expect((await failing.next()).value.id).toBe(10)
      expect(await failing.next().catch(caught => caught)).toBeInstanceOf(NotFoundError)
      expect(await failing.next()).toEqual(finished)

      // The caller's signal cancels the page request under way, which is then not retried: fetch is called once.
      const controller = new AbortController()
      const cancelled = client.users.listIterator({ per_page: 4 }, { signal: controller.signal })
      fetch.mockClear()
      const pending = cancelled.next()
      await reached
      controller.abort()

      const cancelError = await pending.catch(caught => caught)
      expect(cancelError).toBe(controller.signal.reason)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(await cancelled.next()).toEqual(finished)

      // Cancelled between two items of a page already received, the iteration gives no more of that page and requests
      // no later one: next() rejects with the signal's own reason, and the iteration is over, return() included.
      const stopping = new AbortController()
      const buffered = client.users.listIterator({ per_page: 8 }, { signal: stopping.signal })
      fetch.mockClear()
      expect((await buffered.next()).value.id).toBe(30)

      const reason = { cause: 'no longer listing' }
      stopping.abort(reason)
      expect(await buffered.next().catch(caught => caught)).toBe(reason)
      expect(await buffered.next()).toEqual(finished)
      expect(await buffered.return()).toEqual(finished)
      expect([fetch.mock.calls.length, laterPage.isDone()]).toEqual([1, false])

      // An iteration that has already ended stays ended when its signal aborts afterwards.
      const ending = new AbortController()
      const ended = client.users.listIterator({ per_page: 9 }, { signal: ending.signal })
      expect((await ended.next()).value.id).toBe(40)
      expect(await ended.next()).toEqual(finished)
      ending.abort()
      expect(await ended.next()).toEqual(finished)

      // Cancelled as a 503's body is read for the DEBUG log, the request is not retried either: the aborted read is its
      // error, and fetch is called once.
      const discarded = debugClient.users.listIterator({ per_page: 5 }, { signal: discarding.signal })
      fetch.mockClear()

      const discardError = await discarded.next().catch(caught => caught)
      expect(discardError).toBe(discarding.signal.reason)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(await discarded.next()).toEqual(finished)

      // Cancelled once a 503's body has been read in full, by the logger the body is logged to, the request is not
      // retried either: no retry is logged or made, and fetch is called once.
      const completed = debugClient.users.listIterator({ per_page: 6 }, { signal: readInFull.signal })
      fetch.mockClear()
      infoMessages.length = 0

      const completedError = await completed.next().catch(caught => caught)
      expect(completedError).toBe(readInFull.signal.reason)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(infoMessages.filter(message => message.startsWith('Retrying request'))).toEqual([])
      expect(await completed.next()).toEqual(finished)

      // Cancelled by the logger as it is told that the request will be retried, the request is not retried either: the
      // retry is logged, but its backoff timer, of 100 ms with the default retry delays, is never set, and fetch is
      // called once.
      const retried = debugClient.users.listIterator({ per_page: 7 }, { signal: retrying.signal })
      fetch.mockClear()
      timers.mockClear()
      infoMessages.length = 0

      const retriedError = await retried.next().catch(caught => caught)
      expect(retriedError).toBe(retrying.signal.reason)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(infoMessages.filter(message => message.startsWith('Retrying request'))).toEqual([
        'Retrying request (retry 1 of 3) in 100 ms after HTTP 503',
      ])

      expect(timers.mock.calls.filter(([, delay]) => delay === 100)).toEqual([])
      expect(await retried.next()).toEqual(finished)
      expect(pages.isDone()).toBe(true)
    } finally {
      timers.mockRestore()
      releaseHeld()
      partialBody.push(null)
      nock.cleanAll()
    }
  })

  it('creates an API key', () => {
    nock(API_URL)
      .post('/api/rest/v1/api_keys')
      .reply(201, {
        id: 123,
        name: 'testing',
      })

    return ApiKey.create({ name: 'testing' })
      .then(apiKey => {
        expect(apiKey.name).toBe('testing')
        expect(apiKey.id).toBe(123)
      })
  })

  it('saves an API key and keeps its getters and properties on the values the server returns', async () => {
    nock(API_URL)
      .patch('/api/rest/v1/api_keys/123', {
        description: 'Submitted Description',
        id: 123,
        name: 'Submitted Name',
      })
      .reply(200, {
        descriptive_label: 'Canonical Label',
        id: 123,
        name: 'Canonical Name',
      })

    const apiKey = new ApiKey({ id: 123, name: 'Original Name' })
    apiKey.setName('Submitted Name')
    apiKey.setDescription('Submitted Description')

    expect([apiKey.getName(), apiKey.name]).toEqual(['Submitted Name', 'Submitted Name'])
    expect([apiKey.getDescription(), apiKey.description]).toEqual(['Submitted Description', 'Submitted Description'])
    expect(await apiKey.save()).toBe(true)
    expect([apiKey.getName(), apiKey.name]).toEqual(['Canonical Name', 'Canonical Name'])
    expect([apiKey.getDescriptiveLabel(), apiKey.descriptive_label]).toEqual(['Canonical Label', 'Canonical Label'])
    expect([apiKey.getDescription(), apiKey.description]).toEqual([undefined, undefined])
    expect([apiKey.getId(), apiKey.id]).toEqual([123, 123])
    expect(() => { apiKey.name = 'Assigned Name' }).toThrow(TypeError)
    expect(apiKey.name).toBe('Canonical Name')
  })

  it('updates an API key in place and returns the same object holding the values the server returns', async () => {
    nock(API_URL)
      .patch('/api/rest/v1/api_keys/123', { id: 123, name: 'Requested Name' })
      .reply(200, { descriptive_label: 'Canonical Label', id: 123, name: 'Canonical Name' })

    const apiKey = new ApiKey({ id: 123, name: 'Original Name' })
    const params = { name: 'Requested Name' }

    expect(await apiKey.update(params)).toBe(apiKey)
    expect(params).toEqual({ name: 'Requested Name' })
    expect([apiKey.getName(), apiKey.name]).toEqual(['Canonical Name', 'Canonical Name'])
    expect([apiKey.getDescriptiveLabel(), apiKey.descriptive_label]).toEqual(['Canonical Label', 'Canonical Label'])
  })

  it('deletes an API key', () => {
    nock(API_URL)
      .delete('/api/rest/v1/api_keys/123')
      .reply(204)

    const apiKey = new ApiKey({ id: 123 })
    return apiKey.delete()
  })

  it('handles empty response', () => {
    const params = { user_id: 1 }
    nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .query(params)
      .reply(200, [])

    return ApiKey.list(params)
      .then(items => {
        expect(items.length).toBe(0)
      })
  })

  it('handles not found', () => {
    nock(API_URL)
      .get('/api/rest/v1/folders/missing')
      .query(true)
      .reply(404, {
        error: 'Not Found.  This may be related to your permissions.',
        'http-code': 404,
        title: 'Not Found',
        type: 'not-found',
      })

    return Folder.listFor('missing')
      .then(() => {
        throw new Error('Missing folder did not throw an error')
      })
      .catch(error => {
        expect(error).toBeInstanceOf(NotFoundError)
        expect(error.error).toBe('Not Found.  This may be related to your permissions.')
        expect(error.httpCode).toBe(404)
        expect(error.title).toBe('Not Found')
        expect(error.type).toBe('not-found')
      })
  })

  it('rejects a falsy value of the wrong type before sending the request', async () => {
    const request = nock(API_URL)
      .get('/api/rest/v1/folders/%2F')
      .query(true)
      .reply(200, [])

    try {
      const params = { per_page: false }
      const error = await Folder.listFor('/', params).catch(caught => caught)

      expect(error).toBeInstanceOf(InvalidParameterError)
      expect(error.message).toBe('Bad parameter: per_page must be of type Int, received boolean')
      expect(request.isDone()).toBe(false)
      expect(params).toEqual({ per_page: false })
    } finally {
      nock.cleanAll()
    }
  })

  it('rejects an array or object for a Boolean parameter before sending it, and still sends false and null', async () => {
    const updates = nock(API_URL)
      .patch('/api/rest/v1/users/77', { disabled: false, id: 77 })
      .reply(200, { disabled: false, id: 77 })
      .patch('/api/rest/v1/users/77', { disabled: null, id: 77 })
      .reply(200, { disabled: false, id: 77 })

    const listing = nock(API_URL)
      .get('/api/rest/v1/folders/%2F')
      .query({ path: '/', with_previews: false })
      .reply(200, [])

    try {
      const user = new User({ id: 77 })
      const rejections = [
        await user.update({ disabled: [false, true] }).catch(caught => caught),
        await Folder.listFor('/', { with_previews: { value: true } }).catch(caught => caught),
      ]

      expect(rejections.every(error => error instanceof InvalidParameterError)).toBe(true)
      expect(rejections.map(error => error.message)).toEqual([
        'Bad parameter: disabled must be of type Boolean, received array',
        'Bad parameter: with_previews must be of type Boolean, received object',
      ])

      expect([updates.isDone(), listing.isDone()]).toEqual([false, false])
      expect(await user.update({ disabled: false })).toBe(user)
      expect(await user.update({ disabled: null })).toBe(user)
      expect(await Folder.listFor('/', { with_previews: false })).toEqual([])
      expect([updates.isDone(), listing.isDone()]).toEqual([true, true])
    } finally {
      nock.cleanAll()
    }
  })

  it('uses configured workspace id', () => {
    Files.setWorkspaceId(123)

    nock(API_URL, {
      reqheaders: {
        'X-Files-Workspace-Id': '123',
      },
    })
      .get('/api/rest/v1/folders/%2F')
      .query(true)
      .reply(200, [])

    return Folder.listFor('/')
  })

  it('uses per-call workspace id', () => {
    Files.setWorkspaceId(123)

    nock(API_URL, {
      reqheaders: {
        'X-Files-Workspace-Id': '456',
      },
    })
      .get('/api/rest/v1/folders/%2F')
      .query(true)
      .reply(200, [])

    return Folder.listFor('/', {}, { workspaceId: 456 })
  })

  it('allows per-call workspace id to be cleared', () => {
    Files.setWorkspaceId(123)

    nock(API_URL, {
      badheaders: ['X-Files-Workspace-Id'],
    })
      .get('/api/rest/v1/folders/%2F')
      .query(true)
      .reply(200, [])

    return Folder.listFor('/', {}, { workspaceId: null })
  })

  it('strips Files.com auth headers on cross-origin redirects', () => {
    const storageUrl = 'http://storage.test'
    Files.setWorkspaceId(123)

    nock(API_URL)
      .get('/api/rest/v1/folders/%2F')
      .query(true)
      .reply(302, '', { Location: `${storageUrl}/download` })

    nock(storageUrl, {
      badheaders: [
        'X-FilesAPI-Key',
        'X-FilesAPI-Auth',
        'X-Files-Workspace-Id',
        'Authorization',
        'Cookie',
      ],
    })
      .get('/download')
      .reply(200, [])

    return Folder.listFor('/', { action: 'redirect' }, {
      headers: {
        Authorization: 'Bearer test-token',
        Cookie: 'session=test-session',
        'X-FilesAPI-Auth': 'test-session',
      },
    })
  })

  it('keeps Files.com auth headers on same-origin redirects', () => {
    Files.setWorkspaceId(123)

    nock(API_URL)
      .get('/api/rest/v1/folders/%2F')
      .query(true)
      .reply(302, '', { Location: '/redirected' })

    nock(API_URL, {
      reqheaders: {
        Authorization: 'Bearer test-token',
        Cookie: 'session=test-session',
        'X-Files-Workspace-Id': '123',
        'X-FilesAPI-Key': 'test-key',
      },
    })
      .get('/redirected')
      .reply(200, [])

    return Folder.listFor('/', { action: 'redirect' }, {
      headers: {
        Authorization: 'Bearer test-token',
        Cookie: 'session=test-session',
      },
    })
  })

  it('handles bad gateway', async () => {
    nock(API_URL)
      .get('/api/rest/v1/api_keys')
      .times(Files.getMaxNetworkRetries() + 1)
      .reply(502, '<html><head><title>502 Bad Gateway</title></head><body><center><h1>502 Bad Gateway</h1></center><hr><center>files.com</center></body></html>')

    const request = ApiKey.list()

    await expect(request).rejects.toBeInstanceOf(FilesError)
    await expect(request).rejects.toHaveProperty('code', 502)
    await expect(request).rejects.toHaveProperty('message', 'Bad Gateway')
  })

  it('handles region mismatch', () => {
    nock(API_URL)
      .get('/api/rest/v1/folders/test')
      .query(true)
      .reply(401, {
        data: {
          host: 'test.host',
        },
        error: 'Your account must login using a different server, test.host.',
        'http-code': 401,
        title: 'Lockout Region Mismatch',
        type: 'not-authenticated/lockout-region-mismatch',
      })

    return Folder.listFor('test')
      .then(() => {
        throw new Error('Missing folder did not throw an error')
      })
      .catch(error => {
        expect(error).toBeInstanceOf(NotAuthenticated_LockoutRegionMismatchError)
        expect(error.error).toBe('Your account must login using a different server, test.host.')
        expect(error.httpCode).toBe(401)
        expect(error.title).toBe('Lockout Region Mismatch')
        expect(error.type).toBe('not-authenticated/lockout-region-mismatch')
        expect(error.data.host).toBe('test.host')
      })
  })

  describe('with a lockout region mismatch', () => {
    const REGION_URL = 'https://region.files.com'
    const LEGACY_TEXT = 'You have connected to a URL that does not match the region of your site.'

    // The typed lockout region mismatch, naming host in its data, or no host at all.
    const typedMismatch = host => ({
      data: host === undefined ? {} : { host },
      error: 'Your account must login using a different server.',
      'http-code': 403,
      title: 'Lockout Region Mismatch',
      type: 'not-authenticated/lockout-region-mismatch',
    })

    let previousApiKey
    let previousBaseUrl
    let previousNetwork

    beforeEach(() => {
      previousApiKey = Files.getApiKey()
      previousBaseUrl = Files.getBaseUrl()
      previousNetwork = {
        followRegionMismatch: Files.getFollowRegionMismatch(),
        maxNetworkRetries: Files.getMaxNetworkRetries(),
        maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
        minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
      }

      fetch.mockClear()
    })

    afterEach(() => {
      Files.setApiKey(previousApiKey)
      Files.setBaseUrl(previousBaseUrl)
      Files.configureNetwork(previousNetwork)
      nock.cleanAll()
    })

    it('sends a POST answered with a typed 403 mismatch again, unchanged, to the host in its data, or else in its X-Files-Host header, even after a redirect within its site, and the client\'s later requests there too', async () => {
      const client = Files.createClient({
        apiKey: 'region-key',
        baseUrl: REGION_URL,
        headers: { 'X-Call': 'region' },
        workspaceId: 7,
      })

      const other = Files.createClient({ apiKey: 'other-key', baseUrl: REGION_URL })
      const sent = { 'X-Call': 'region', 'X-Files-Workspace-Id': '7', 'X-FilesAPI-Key': 'region-key' }

      // The host in the error's data is used rather than the one in its header.
      const mismatched = nock(REGION_URL, { reqheaders: sent })
        .post('/api/rest/v1/api_keys', { name: 'regional' })
        .reply(403, typedMismatch('region-eu.files.com'), { 'X-Files-Host': 'region-other.files.com' })

      const rerouted = nock('https://region-eu.files.com', { reqheaders: sent })
        .post('/api/rest/v1/api_keys', { name: 'regional' })
        .reply(201, { id: 1, name: 'regional' })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 2 }])

      // A typed mismatch whose data names no host names it in its X-Files-Host header.
      const fallback = Files.createClient({ apiKey: 'fallback-key', baseUrl: REGION_URL })
      const unnamed = nock(REGION_URL, { reqheaders: { 'X-FilesAPI-Key': 'fallback-key' } })
        .get('/api/rest/v1/api_keys')
        .reply(403, typedMismatch(undefined), { 'X-Files-Host': 'region-west.files.com' })

      const west = nock('https://region-west.files.com', { reqheaders: { 'X-FilesAPI-Key': 'fallback-key' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 3 }])

      // A mismatch answering a redirect that stayed within the site, credentials included, is still the API's own: the
      // request itself, not the redirect's target, is sent again to the host it names.
      const redirecting = Files.createClient({ apiKey: 'redirect-key', baseUrl: REGION_URL })
      const withinSite = nock(REGION_URL, { reqheaders: { 'X-FilesAPI-Key': 'redirect-key' } })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 10 })
        .reply(302, '', { Location: '/api/rest/v1/api_keys?per_page=11' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 11 })
        .reply(403, typedMismatch('region-north.files.com'))

      const north = nock('https://region-north.files.com', { reqheaders: { 'X-FilesAPI-Key': 'redirect-key' } })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 10 })
        .reply(200, [{ id: 4 }])

      const created = await client.apiKeys.create({ name: 'regional' })
      const listed = await client.apiKeys.list()
      const fellBack = await fallback.apiKeys.list()
      const redirected = await redirecting.apiKeys.list({ per_page: 10 })

      expect([created.id, listed.map(key => key.id), fellBack.map(key => key.id), redirected.map(key => key.id)]).toEqual([1, [2], [3], [4]])
      expect([mismatched.isDone(), rerouted.isDone(), unnamed.isDone(), west.isDone(), withinSite.isDone(), north.isDone(), fetch.mock.calls.length])
        .toEqual([true, true, true, true, true, true, 8])

      // Only those clients moved: another client of the same site, and the global settings, keep theirs.
      expect([client.getBaseUrl(), fallback.getBaseUrl(), redirecting.getBaseUrl(), other.getBaseUrl(), Files.getBaseUrl()])
        .toEqual(['https://region-eu.files.com', 'https://region-west.files.com', 'https://region-north.files.com', REGION_URL, previousBaseUrl])
    })

    it('sends a GET answered with the legacy plain-text 403, with or without a Content-Type, again to its X-Files-Host, query included, and moves only a call\'s own credentials, with its later pages', async () => {
      Files.setBaseUrl('https://legacy.files.com')
      const legacy = { 'Content-Type': 'text/plain', 'X-Files-Host': 'legacy-eu.files.com' }
      const callKey = { reqheaders: { 'X-FilesAPI-Key': 'call-key' } }

      // Only each operation's first request reaches the original host.
      const original = nock('https://legacy.files.com', callKey)
        .get('/api/rest/v1/api_keys')
        .query({ user_id: 1 })
        .reply(403, LEGACY_TEXT, legacy)
        .get('/api/rest/v1/users')
        .query({ per_page: 1 })
        .reply(403, LEGACY_TEXT, legacy)

      const regional = nock('https://legacy-eu.files.com', callKey)
        .get('/api/rest/v1/api_keys')
        .query({ user_id: 1 })
        .reply(200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'keys-2' })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'keys-2', page: 2, user_id: 1 })
        .reply(200, [{ id: 2 }])
        .get('/api/rest/v1/users')
        .query({ per_page: 1 })
        .reply(200, [{ id: 3 }], { 'X-Files-Cursor-Next': 'users-2' })
        .get('/api/rest/v1/users')
        .query({ cursor: 'users-2', per_page: 1 })
        .reply(200, [{ id: 4 }])

      const keys = await ApiKey.list({ user_id: 1 }, { apiKey: 'call-key' })
      const users = User.listIterator({ per_page: 1 }, { apiKey: 'call-key' })
      const userIds = [(await users.next()).value.id, (await users.next()).value.id]

      expect([keys.map(key => key.id), userIds]).toEqual([[1, 2], [3, 4]])
      expect([original.isDone(), regional.isDone()]).toEqual([true, true])

      // The calls' own API key moved no settings: the global site is still the one it was.
      expect(Files.getBaseUrl()).toBe('https://legacy.files.com')

      // A local API site answers with the legacy text and no Content-Type at all, which is still a mismatch: followed by
      // default, and left to the caller, with its approved host, when following is off.
      const sockets = new Set()
      const server = http.createServer((request, response) => {
        response.writeHead(403, { 'X-Files-Host': 'legacy-eu.files.com' })
        response.end(LEGACY_TEXT)
      })

      server.on('connection', socket => sockets.add(socket))
      await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })

      try {
        const local = `http://127.0.0.1:${server.address().port}`
        const following = Files.createClient({ apiKey: 'local-key', baseUrl: local })
        const manual = Files.createClient({ apiKey: 'local-key', baseUrl: local, followRegionMismatch: false })
        const named = nock('https://legacy-eu.files.com', { reqheaders: { 'X-FilesAPI-Key': 'local-key' } })
          .get('/api/rest/v1/api_keys')
          .reply(200, [{ id: 5 }])

        const followed = await following.apiKeys.list()
        const left = await manual.apiKeys.list().catch(caught => caught)

        expect([followed.map(key => key.id), named.isDone(), following.getBaseUrl()]).toEqual([[5], true, 'https://legacy-eu.files.com'])
        expect([left instanceof FilesError, left.code, manual.getBaseUrl()]).toEqual([true, 403, local])
        expect(left.regionMismatch).toEqual({
          approved: true,
          from: local,
          host: 'legacy-eu.files.com',
          origin: 'https://legacy-eu.files.com',
          reason: 'disabled',
        })
      } finally {
        sockets.forEach(socket => socket.destroy())
        await new Promise(resolve => { server.close(resolve) })
      }
    })

    it('keeps a rerouted list in the context its first request was sent with, every later page included, while the global settings change, and a new call uses them', async () => {
      Files.setApiKey('key-a')
      Files.setBaseUrl('https://alpha.files.com')
      Files.setWorkspaceId(1)
      let reachAlpha
      let releaseAlpha
      const reached = new Promise(resolve => { reachAlpha = resolve })
      const released = new Promise(resolve => { releaseAlpha = resolve })
      const contextA = { 'X-Files-Workspace-Id': '1', 'X-FilesAPI-Key': 'key-a' }

      // The first page is held until the global settings have changed, and then answered with a mismatch.
      const alpha = nock('https://alpha.files.com', { reqheaders: contextA })
        .get('/api/rest/v1/api_keys')
        .reply((uri, body, callback) => {
          reachAlpha()
          released.then(() => callback(null, [403, typedMismatch('alpha-eu.files.com')]))
        })

      // The request is sent again, as it was, and every later page with it, with key-a in workspace 1, to the host the
      // mismatch named, with that host's cursors.
      const alphaEu = nock('https://alpha-eu.files.com', { reqheaders: contextA })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'page-2' })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'page-2', page: 2 })
        .reply(200, [{ id: 2 }], { 'X-Files-Cursor-Next': 'page-3' })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'page-3', page: 3 })
        .reply(200, [{ id: 3 }])

      // Only a new call, made with the changed global settings, reaches their site: with no cursor, never one of alpha's.
      const beta = nock('https://beta.files.com', { reqheaders: { 'X-Files-Workspace-Id': '2', 'X-FilesAPI-Key': 'key-b' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 9 }])

      const listing = ApiKey.list()
      await reached
      Files.setApiKey('key-b')
      Files.setBaseUrl('https://beta.files.com')
      Files.setWorkspaceId(2)
      releaseAlpha()

      const routed = await listing
      const fresh = await ApiKey.list()

      expect([routed.map(key => key.id), fresh.map(key => key.id)]).toEqual([[1, 2, 3], [9]])
      expect([alpha.isDone(), alphaEu.isDone(), beta.isDone()]).toEqual([true, true, true])
      expect([Files.getApiKey(), Files.getBaseUrl(), Files.getWorkspaceId()]).toEqual(['key-b', 'https://beta.files.com', 2])
    })

    it('keeps a list in the context its first request was sent with when its first page succeeds and the global settings change, its later pages and their first mismatch included, and a new call uses them', async () => {
      Files.setApiKey('key-a')
      Files.setBaseUrl('https://alpha.files.com')
      Files.setWorkspaceId(1)
      let reachAlpha
      let releaseAlpha
      const reached = new Promise(resolve => { reachAlpha = resolve })
      const released = new Promise(resolve => { releaseAlpha = resolve })
      const contextA = { 'X-Files-Workspace-Id': '1', 'X-FilesAPI-Key': 'key-a' }

      // The first page succeeds once the global settings have changed. The second is still sent to alpha, with alpha's
      // cursor, key-a and workspace 1, and is answered with the list's first mismatch.
      const alpha = nock('https://alpha.files.com', { reqheaders: contextA })
        .get('/api/rest/v1/api_keys')
        .reply((uri, body, callback) => {
          reachAlpha()
          released.then(() => callback(null, [200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'page-2' }]))
        })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'page-2', page: 2 })
        .reply(403, typedMismatch('alpha-eu.files.com'))

      // The second page is sent again, as it was, to the host the mismatch named, and the third after it, all with
      // key-a in workspace 1.
      const alphaEu = nock('https://alpha-eu.files.com', { reqheaders: contextA })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'page-2', page: 2 })
        .reply(200, [{ id: 2 }], { 'X-Files-Cursor-Next': 'page-3' })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'page-3', page: 3 })
        .reply(200, [{ id: 3 }])

      // No page of the list ever reaches the changed global site; only a new call does, with key-b in workspace 2.
      const strayed = nock('https://beta.files.com')
        .get('/api/rest/v1/api_keys')
        .query(query => query.cursor !== undefined)
        .reply(200, [{ id: 8 }])

      const beta = nock('https://beta.files.com', { reqheaders: { 'X-Files-Workspace-Id': '2', 'X-FilesAPI-Key': 'key-b' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 9 }])

      const listing = ApiKey.list()
      await reached
      Files.setApiKey('key-b')
      Files.setBaseUrl('https://beta.files.com')
      Files.setWorkspaceId(2)
      releaseAlpha()

      const listed = await listing
      const fresh = await ApiKey.list()

      expect([listed.map(key => key.id), fresh.map(key => key.id)]).toEqual([[1, 2, 3], [9]])
      expect([alpha.isDone(), alphaEu.isDone(), beta.isDone(), strayed.isDone()]).toEqual([true, true, true, false])

      // The list's own mismatch moved no settings: they had changed since its first request.
      expect([Files.getApiKey(), Files.getBaseUrl(), Files.getWorkspaceId()]).toEqual(['key-b', 'https://beta.files.com', 2])
    })

    it('sends a list\'s first request to the site of the settings its credential came from, even when they change as it is logged', async () => {
      const previousLogging = {
        debugRequest: Files.shouldDebugRequest(),
        logger: Files.getLogger(),
        logLevel: Files.getLogLevel(),
      }

      Files.setApiKey('key-a')
      Files.setBaseUrl('https://alpha.files.com')
      let changed = false
      const ignore = () => {}

      // The application logger changes the global settings as the first request's options are logged, after its
      // headers have been made and before it is sent.
      Files.setLogger({
        debug: (...messages) => {
          if (!changed && messages.some(message => `${message}`.includes('Request Options:'))) {
            changed = true
            Files.setApiKey('key-b')
            Files.setBaseUrl('https://beta.files.com')
          }
        },
        error: ignore,
        info: ignore,
        warn: ignore,
      })

      Files.setLogLevel(LogLevel.DEBUG)
      Files.configureDebugging({ debugRequest: true })

      try {
        // The request, and the next page with it, go to the site whose key they send, never with key-a to beta.
        const alpha = nock('https://alpha.files.com', { reqheaders: { 'X-FilesAPI-Key': 'key-a' } })
          .get('/api/rest/v1/api_keys')
          .reply(200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'page-2' })
          .get('/api/rest/v1/api_keys')
          .query({ cursor: 'page-2', page: 2 })
          .reply(200, [{ id: 2 }])

        const beta = nock('https://beta.files.com', { reqheaders: { 'X-FilesAPI-Key': 'key-b' } })
          .get('/api/rest/v1/api_keys')
          .reply(200, [{ id: 9 }])

        const listed = await ApiKey.list()
        const fresh = await ApiKey.list()

        expect([changed, listed.map(key => key.id), fresh.map(key => key.id)]).toEqual([true, [1, 2], [9]])
        expect([alpha.isDone(), beta.isDone(), Files.getBaseUrl()]).toEqual([true, true, 'https://beta.files.com'])
      } finally {
        Files.configureDebugging({ debugRequest: previousLogging.debugRequest })
        Files.setLogLevel(previousLogging.logLevel)
        Files.setLogger(previousLogging.logger)
      }
    })

    it('sends a session creation answered with a mismatch again with its body and without the client\'s key, and moves no site for the client\'s later key calls', async () => {
      const client = Files.createClient({ apiKey: 'default-key', baseUrl: REGION_URL })
      const login = { password: 'secret', username: 'user' }

      const mismatched = nock(REGION_URL, { badheaders: ['X-FilesAPI-Key', 'X-FilesAPI-Auth'] })
        .post('/api/rest/v1/sessions', login)
        .reply(403, typedMismatch('region-eu.files.com'))

      const created = nock('https://region-eu.files.com', { badheaders: ['X-FilesAPI-Key', 'X-FilesAPI-Auth'] })
        .post('/api/rest/v1/sessions', login)
        .reply(201, { id: 'session-id' })

      // The client's own key is not the session's, so its later calls stay on its site.
      const later = nock(REGION_URL, { reqheaders: { 'X-FilesAPI-Key': 'default-key' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }])

      const session = await Api.sendRequest('/sessions', 'POST', login, { client })
      const keys = await client.apiKeys.list()

      expect([session.data, keys.map(key => key.id)]).toEqual([{ id: 'session-id' }, [1]])
      expect([mismatched.isDone(), created.isDone(), later.isDone(), client.getBaseUrl()]).toEqual([true, true, true, REGION_URL])
    })

    it('moves no client site for a call made in a workspace of its own, and the client\'s later calls in its own workspace stay on its site', async () => {
      const client = Files.createClient({ apiKey: 'region-key', baseUrl: REGION_URL, workspaceId: 1 })

      const mismatched = nock(REGION_URL, { reqheaders: { 'X-Files-Workspace-Id': '2', 'X-FilesAPI-Key': 'region-key' } })
        .get('/api/rest/v1/api_keys')
        .reply(403, typedMismatch('region-eu.files.com'))

      const rerouted = nock('https://region-eu.files.com', { reqheaders: { 'X-Files-Workspace-Id': '2', 'X-FilesAPI-Key': 'region-key' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }])

      const later = nock(REGION_URL, { reqheaders: { 'X-Files-Workspace-Id': '1', 'X-FilesAPI-Key': 'region-key' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 2 }])

      const inOtherWorkspace = await client.apiKeys.list({}, { workspaceId: 2 })
      const inOwnWorkspace = await client.apiKeys.list()

      expect([inOtherWorkspace.map(key => key.id), inOwnWorkspace.map(key => key.id)]).toEqual([[1], [2]])
      expect([mismatched.isDone(), rerouted.isDone(), later.isDone(), client.getBaseUrl()]).toEqual([true, true, true, REGION_URL])
    })

    it('keeps a rerouted list in the workspace its first request was sent in, every later page included, while the global workspace changes with the same key, and a new call uses it', async () => {
      Files.setApiKey('key-w')
      Files.setBaseUrl('https://alpha.files.com')
      Files.setWorkspaceId(1)
      let reachAlpha
      let releaseAlpha
      const reached = new Promise(resolve => { reachAlpha = resolve })
      const released = new Promise(resolve => { releaseAlpha = resolve })

      // The first page, in workspace 1, is held until the global workspace has changed, with the same key.
      const alpha = nock('https://alpha.files.com', { reqheaders: { 'X-Files-Workspace-Id': '1', 'X-FilesAPI-Key': 'key-w' } })
        .get('/api/rest/v1/api_keys')
        .reply((uri, body, callback) => {
          reachAlpha()
          released.then(() => callback(null, [403, typedMismatch('alpha-eu.files.com')]))
        })

      // The request is sent again, as it was, and its next page with it, in workspace 1, to the host the mismatch named.
      const alphaEu = nock('https://alpha-eu.files.com', { reqheaders: { 'X-Files-Workspace-Id': '1', 'X-FilesAPI-Key': 'key-w' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }], { 'X-Files-Cursor-Next': 'page-2' })
        .get('/api/rest/v1/api_keys')
        .query({ cursor: 'page-2', page: 2 })
        .reply(200, [{ id: 2 }])

      // Only a new call, in the changed global workspace, goes to the global site, which the old list did not move.
      const fresh = nock('https://alpha.files.com', { reqheaders: { 'X-Files-Workspace-Id': '2', 'X-FilesAPI-Key': 'key-w' } })
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 9 }])

      const listing = ApiKey.list()
      await reached
      Files.setWorkspaceId(2)
      releaseAlpha()

      const routed = await listing
      const inNewWorkspace = await ApiKey.list()

      expect([routed.map(key => key.id), inNewWorkspace.map(key => key.id)]).toEqual([[1, 2], [9]])
      expect([alpha.isDone(), alphaEu.isDone(), fresh.isDone(), Files.getBaseUrl()]).toEqual([true, true, true, 'https://alpha.files.com'])
    })

    it('sends nothing elsewhere for an unrelated 403, a mismatch from another origin, after a redirect through one or outside the API, or a named host that is missing, not HTTPS or not trusted', async () => {
      const client = Files.createClient({ apiKey: 'region-key', baseUrl: REGION_URL })
      const forbidden = {
        error: 'Not allowed',
        'http-code': 403,
        title: 'Forbidden',
        type: 'not-authorized/forbidden',
      }

      nock(REGION_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(403, forbidden, { 'X-Files-Host': 'region-eu.files.com' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 2 })
        .reply(403, 'Forbidden', { 'Content-Type': 'text/plain', 'X-Files-Host': 'region-eu.files.com' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 3 })
        .reply(403, LEGACY_TEXT, { 'Content-Type': 'text/plain' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 4 })
        .reply(403, typedMismatch(undefined))
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 5 })
        .reply(403, typedMismatch('http://region-eu.files.com'))
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 6 })
        .reply(403, typedMismatch('files.example.com'))
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 7 })
        .reply(302, '', { Location: 'https://region-other.files.com/api/rest/v1/api_keys' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 8 })
        .reply(302, '', { Location: 'https://foreign.example.com/bounce' })

      // A mismatch from the origin a redirect led to.
      nock('https://region-other.files.com')
        .get('/api/rest/v1/api_keys')
        .reply(403, typedMismatch('region-eu.files.com'))

      // A mismatch from the client's own site, after a redirect that left it and led back to it, which the client's
      // credentials did not follow.
      nock('https://foreign.example.com')
        .get('/bounce')
        .reply(302, '', { Location: `${REGION_URL}/api/rest/v1/api_keys?per_page=9` })

      const returnedTo = nock(REGION_URL, { badheaders: ['X-FilesAPI-Key'] })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 9 })
        .reply(403, typedMismatch('region-eu.files.com'), { 'X-Files-Host': 'region-eu.files.com' })

      // A mismatch answering a request outside the API: an upload's part, sent to storage through its public entry.
      nock('https://storage.files.com')
        .put('/part/1', 'part bytes')
        .reply(403, typedMismatch('region-eu.files.com'), { 'X-Files-Host': 'region-eu.files.com' })

      const elsewhere = [
        nock('https://region-eu.files.com').get(() => true).reply(200, []),
        nock('https://region-eu.files.com').put(() => true).reply(200, {}),
        nock('http://region-eu.files.com').get(() => true).reply(200, []),
        nock('https://files.example.com').get(() => true).reply(200, []),
      ]

      const failed = perPage => client.apiKeys.list({ per_page: perPage }).catch(caught => caught)
      const unrelated = [await failed(1), await failed(2), await failed(3)]
      const [missing, downgraded, untrusted, redirected] = [await failed(4), await failed(5), await failed(6), await failed(7)]
      const returned = await failed(8)
      const part = await Api.sendFilePart('https://storage.files.com/part/1', 'PUT', 'part bytes').catch(caught => caught)

      expect(unrelated.every(error => error instanceof FilesError && error.regionMismatch === undefined)).toBe(true)
      expect(unrelated.map(error => error.code)).toEqual([403, 403, 403])
      expect([missing, downgraded, untrusted, redirected, returned, part].every(error => error instanceof NotAuthenticated_LockoutRegionMismatchError)).toBe(true)

      // A mismatch from another origin, after a redirect through one, or outside the API, is not one: it has no
      // regionMismatch.
      const refused = (host, origin, reason) => ({
        approved: false,
        from: REGION_URL,
        host,
        origin,
        reason,
      })

      expect([missing, downgraded, untrusted, redirected, returned, part].map(error => error.regionMismatch)).toEqual([
        refused(null, null, 'no-host'),
        refused('http://region-eu.files.com', null, 'untrusted-host'),
        refused('files.example.com', 'https://files.example.com', 'untrusted-host'),
        undefined,
        undefined,
        undefined,
      ])

      // None of them is sent elsewhere or moves the client's site.
      expect([untrusted.data.host, returnedTo.isDone(), elsewhere.map(scope => scope.isDone()), client.getBaseUrl()])
        .toEqual(['files.example.com', true, [false, false, false, false], REGION_URL])
    })

    it('leaves a mismatch to the caller when following is off, the shared retries are spent or the body cannot be sent again, and follows a custom domain it trusts', async () => {
      const regionKey = { apiKey: 'region-key', baseUrl: REGION_URL }
      const off = Files.createClient({ ...regionKey, followRegionMismatch: false })
      const streaming = Files.createClient(regionKey)
      const spent = Files.createClient({
        ...regionKey,
        maxNetworkRetries: 1,
        maxNetworkRetryDelay: 0.001,
        minNetworkRetryDelay: 0.001,
      })

      const custom = Files.createClient({
        ...regionKey,
        trustRegionHost: (origin, currentOrigin) => origin === 'https://files.acme.test' && currentOrigin === REGION_URL,
      })

      // The second request is the first one's retry after a 503, which spends the one retry the client allows.
      nock(REGION_URL)
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 1 })
        .reply(403, typedMismatch('region-eu.files.com'))
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 2 })
        .reply(503, { 'http-code': 503, title: 'Service Unavailable', type: 'service-unavailable' })
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 2 })
        .reply(403, typedMismatch('region-eu.files.com'))
        .post('/api/rest/v1/behaviors')
        .reply(403, typedMismatch('region-eu.files.com'))
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 3 })
        .reply(403, typedMismatch('files.acme.test'))

      const acme = nock('https://files.acme.test')
        .get('/api/rest/v1/api_keys')
        .query({ per_page: 3 })
        .reply(200, [{ id: 3 }])

      const notSent = nock('https://region-eu.files.com')
        .get(() => true)
        .reply(200, [])
        .post(() => true)
        .reply(201, {})

      const source = new Readable({ read() {} })
      source.push('streamed')
      source.push(null)

      const disabled = await off.apiKeys.list({ per_page: 1 }).catch(caught => caught)
      const exhausted = await spent.apiKeys.list({ per_page: 2 }).catch(caught => caught)
      const unreplayable = await streaming.behaviors.create({
        attachment_file: new Attachment(source),
        behavior: 'watermark',
        path: 'folder',
      }).catch(caught => caught)

      const trusted = await custom.apiKeys.list({ per_page: 3 })

      // An integration can save the approved origin of a mismatch it handles itself.
      const approved = {
        approved: true,
        from: REGION_URL,
        host: 'region-eu.files.com',
        origin: 'https://region-eu.files.com',
      }

      expect([disabled, exhausted, unreplayable].map(error => error.regionMismatch)).toEqual([
        { ...approved, reason: 'disabled' },
        { ...approved, reason: 'retry-budget' },
        { ...approved, reason: 'body-not-replayable' },
      ])

      expect([trusted.map(key => key.id), acme.isDone(), notSent.pendingMocks().length]).toEqual([[3], true, 2])
      expect([custom.getBaseUrl(), off.getBaseUrl(), spent.getBaseUrl(), streaming.getBaseUrl()])
        .toEqual(['https://files.acme.test', REGION_URL, REGION_URL, REGION_URL])
    })

    it('sends nothing more when the caller cancels as it is told of the retry at the named host, rejecting with the signal\'s reason, even a falsy one', async () => {
      const controller = new AbortController()
      const ignore = () => {}

      const client = Files.createClient({
        apiKey: 'region-key',
        baseUrl: REGION_URL,
        logger: {
          debug: ignore,
          error: ignore,
          info: message => {
            if (`${message}`.startsWith('Retrying request')) {
              controller.abort('')
            }
          },
          warn: ignore,
        },
      })

      nock(REGION_URL)
        .get('/api/rest/v1/api_keys')
        .reply(403, typedMismatch('region-eu.files.com'))

      const notSent = nock('https://region-eu.files.com')
        .get('/api/rest/v1/api_keys')
        .reply(200, [{ id: 1 }])

      const error = await client.apiKeys.list({}, { signal: controller.signal }).catch(caught => caught)

      expect(error).toBe('')
      expect([notSent.isDone(), fetch.mock.calls.length]).toEqual([false, 1])
    })
  })
})
