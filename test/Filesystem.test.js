import { getEventListeners } from 'events'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'

import { FilesApiError, FilesError, InvalidParameterError, NotImplementedError } from '../lib/Errors'
import FilesClient from '../lib/FilesClient'

import { REFERENCE } from './support/filesystem-parity.cjs'

const SITE = 'https://site.files.test'
const STORAGE = 'https://storage.files.test'
const API_PREFIX = '/api/rest/v1'

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  headers: { 'Content-Type': 'application/json', ...headers },
  status,
})

const notFound = () => json({ error: 'File Not Found', 'http-code': 404, title: 'File Not Found', type: 'not-found/file-not-found' }, 404)

const outcomeOf = promise => promise.then(value => ({ value }), error => ({ error }))

const errorOf = async action => {
  try {
    await action()
    return null
  } catch (error) {
    return error
  }
}

// Lets some turns of the event loop pass, so that a call resolving too early would have.
const eventLoopTurns = async (count = 10) => {
  for (let turn = 0; turn < count; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => { setImmediate(resolve) })
  }
}

// The bytes of a request body, as a configured fetch is given it: a string, bytes, or a stream.
const bytesOfBody = async body => {
  if (body === undefined || body === null) {
    return Buffer.alloc(0)
  }

  if (typeof body === 'string' || body instanceof Uint8Array || body instanceof ArrayBuffer) {
    return Buffer.from(body)
  }

  if (typeof body[Symbol.asyncIterator] === 'function') {
    const chunks = []

    for await (const chunk of body) {
      chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks)
  }

  return Buffer.from(await new Response(body).arrayBuffer())
}

const parentOf = entryPath => (entryPath.includes('/') ? entryPath.slice(0, entryPath.lastIndexOf('/')) : '')

// Stands in for a Files.com site and its storage, as a client's HTTP client: its files and folders by path, their
// metadata (GET /file_actions/metadata/{path}) and downloads (GET /files/{path}, then storage), its uploads
// (begin_upload, each part's PUT to storage, then the completion, POST /files/{path}), which replace a file only once
// they complete, and its folder listings (GET /folders/{path}), in pages of per_page by default or as pages plans them,
// with the next page's cursor. A download of a path under broken/ fails with a server error. holdNext(kind) holds the
// next metadata request, download from storage or completion until released, or until the request's own signal aborts
// it, as a fetch must allow, recording it in stopped. Records every request. Nothing here is the SDK's own algorithm:
// it is the service.
const remoteFiles = () => {
  const entries = new Map()
  const pages = new Map()
  const requests = []
  const uploads = new Map()
  const completions = { failures: [] }
  const holds = new Map()
  const stopped = []
  let time = Date.parse('2026-10-19T12:00:00Z')
  let refs = 0

  // Holds the next request of kind ('metadata', 'download' or 'completion'): reached resolves once it has arrived, and
  // release() lets it go on.
  const holdNext = kind => {
    let arrive
    let release
    const reached = new Promise(resolve => { arrive = resolve })
    const released = new Promise(resolve => { release = resolve })
    holds.set(kind, { arrive, released })
    return { reached, release }
  }

  // Waits, when the request of kind with signal is held, until it is released, or rejects as an aborted fetch does.
  const heldAt = async (kind, signal) => {
    const hold = holds.get(kind)

    if (!hold) {
      return
    }

    holds.delete(kind)
    hold.arrive()

    await new Promise((resolve, reject) => {
      const abort = () => {
        stopped.push(kind)
        reject(Object.assign(new Error('The operation was aborted'), { name: 'AbortError' }))
      }

      if (signal?.aborted) {
        abort()
        return
      }

      signal?.addEventListener('abort', abort, { once: true })
      hold.released.then(() => {
        signal?.removeEventListener('abort', abort)
        resolve()
      })
    })
  }

  const now = () => {
    time += 1000
    return new Date(time).toISOString()
  }

  const put = (entryPath, content) => {
    const createdAt = entries.get(entryPath)?.created_at ?? now()
    entries.set(entryPath, { bytes: Buffer.from(content), created_at: createdAt, mtime: now(), type: 'file' })
  }

  const mkdir = entryPath => {
    entries.set(entryPath, { created_at: now(), mtime: now(), type: 'directory' })
  }

  const entityOf = entryPath => {
    const entry = entries.get(entryPath)

    return {
      created_at: entry.created_at,
      display_name: entryPath.split('/').pop(),
      mtime: entry.mtime,
      path: entryPath,
      size: entry.type === 'file' ? entry.bytes.length : null,
      type: entry.type,
    }
  }

  const listing = (folder, query) => {
    const cursor = query.get('cursor')
    const planned = pages.get(folder)

    if (planned) {
      const index = cursor ? Number(cursor.replace('page-', '')) : 0
      const next = index + 1 < planned.length ? { 'X-Files-Cursor-Next': `page-${index + 1}` } : {}
      return json(planned[index].map(name => entityOf(`${folder}/${name}`)), 200, next)
    }

    const children = [...entries.keys()].filter(key => key !== folder && parentOf(key) === folder).sort()
    const perPage = Number(query.get('per_page') ?? 1000)
    const offset = cursor ? Number(cursor.replace('offset-', '')) : 0
    const next = offset + perPage < children.length ? { 'X-Files-Cursor-Next': `offset-${offset + perPage}` } : {}
    return json(children.slice(offset, offset + perPage).map(entityOf), 200, next)
  }

  const fetch = async (url, init) => {
    const { origin, pathname, searchParams } = new URL(url)
    const headers = new Headers(init.headers)
    const body = await bytesOfBody(init.body)
    const site = origin === SITE
    const request = {
      key: headers.get('x-filesapi-key'),
      method: init.method,
      origin,
      path: site ? decodeURIComponent(pathname.slice(API_PREFIX.length)) : pathname,
      query: Object.fromEntries(searchParams),
    }

    requests.push(request)

    if (!site) {
      if (init.method === 'PUT' && pathname === '/part') {
        uploads.get(searchParams.get('ref')).parts.set(Number(searchParams.get('part')), body)
        return new Response(null, { headers: { ETag: `"part-${searchParams.get('part')}"` }, status: 200 })
      }

      const entry = entries.get(searchParams.get('path'))

      if (init.method === 'GET' && pathname === '/download' && entry?.type === 'file') {
        await heldAt('download', init.signal)

        return new Response(entry.bytes, {
          headers: { 'Content-Length': `${entry.bytes.length}`, 'Content-Type': 'application/octet-stream' },
          status: 200,
        })
      }

      return new Response('Not Found', { status: 404 })
    }

    if (request.key === 'refused-key') {
      return json({ error: 'Invalid API key', 'http-code': 401, title: 'Invalid Credentials', type: 'not-authenticated/invalid-credentials' }, 401)
    }

    // A path is the same with or without a trailing slash, as Files.com takes it.
    const [, kind, given] = /^\/(file_actions\/metadata|file_actions\/begin_upload|files|folders)\/(.*)$/.exec(request.path) ?? []
    const entryPath = given?.replace(/\/+$/, '')

    // Paths under unrouted/ have no route: a 404 with no error type, which does not say that a path is not there.
    if (entryPath?.startsWith('unrouted/')) {
      return json({ error: 'Not Found', 'http-code': 404 }, 404)
    }

    if (init.method === 'GET' && kind === 'file_actions/metadata') {
      await heldAt('metadata', init.signal)
      return entries.has(entryPath) ? json(entityOf(entryPath)) : notFound()
    }

    if (init.method === 'GET' && kind === 'files' && entryPath.startsWith('broken/')) {
      return json({ error: 'Server error', 'http-code': 500 }, 500)
    }

    if (init.method === 'GET' && kind === 'files') {
      return entries.get(entryPath)?.type === 'file'
        ? json({ ...entityOf(entryPath), download_uri: `${STORAGE}/download?path=${encodeURIComponent(entryPath)}` })
        : notFound()
    }

    if (init.method === 'GET' && kind === 'folders') {
      return entries.get(entryPath)?.type === 'directory' ? listing(entryPath, searchParams) : notFound()
    }

    if (init.method === 'POST' && kind === 'file_actions/begin_upload') {
      const params = JSON.parse(body.toString() || '{}')
      refs += params.ref ? 0 : 1
      const ref = params.ref ?? `upload-${refs}`

      if (!uploads.has(ref)) {
        uploads.set(ref, { parts: new Map(), path: entryPath })
      }

      const first = params.part ?? 1
      return json(Array.from({ length: params.parts ?? 1 }, (_, index) => ({
        part_number: first + index,
        partsize: 5242880,
        ref,
        upload_uri: `${STORAGE}/part?ref=${ref}&part=${first + index}`,
      })))
    }

    if (init.method === 'POST' && kind === 'files' && JSON.parse(body.toString() || '{}').action === 'end') {
      const params = JSON.parse(body.toString())
      await heldAt('completion', init.signal)

      const failure = completions.failures.shift()

      if (failure) {
        return failure()
      }

      const upload = uploads.get(params.ref)
      put(entryPath, Buffer.concat([...upload.parts.keys()].sort((a, b) => a - b).map(part => upload.parts.get(part))))
      return json(entityOf(entryPath), 201)
    }

    // Any other request has no route: a 404 with no error type, which is not a path that is not there.
    return json({ error: 'Not Found', 'http-code': 404 }, 404)
  }

  // Holds the next upload's completion until release(); reached resolves once it has arrived.
  const holdCompletion = () => holdNext('completion')

  const apiRequests = () => requests.filter(request => request.origin === SITE).map(request => `${request.method} ${request.path}`)
  const bytesOf = entryPath => entries.get(entryPath)?.bytes

  return { apiRequests, bytesOf, completions, entries, fetch, holdCompletion, holdNext, mkdir, pages, put, requests, stopped }
}

// Rejects once ms have passed without promise settling, so that a boundary that never comes fails the test.
const withinDeadline = (promise, description, ms = 2000) => {
  let timer
  const deadline = new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out waiting for ${description}`)), ms)
  })

  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer))
}

// The value promise rejects with, whatever it is, null and 0 included; a promise that resolves fails the test.
const rejectionOf = async promise => {
  const outcome = await outcomeOf(promise)
  expect(Object.keys(outcome)).toEqual(['error'])
  return outcome.error
}

// Wraps the methods of every file handle opened in a stage's directory, the SDK's own local stage of a remote file:
// wrap(method, real) gives each method's replacement, from the real one. The stage's handle is Node.js's own, and the
// replacement calls it, so that what the stage holds is what Node.js wrote.
const wrapStageHandles = (methods, wrap) => {
  const open = fs.promises.open.bind(fs.promises)

  jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
    const handle = await open(...args)

    if (path.basename(path.dirname(String(args[0]))).startsWith('files-sdk-fs-')) {
      methods.forEach(method => {
        handle[method] = wrap(method, handle[method].bind(handle))
      })
    }

    return handle
  })
}

const clientOf = (service, config = {}) => new FilesClient({
  apiKey: 'fs-key',
  baseUrl: SITE,
  fetch: service.fetch,
  maxNetworkRetries: 0,
  ...config,
})

describe('client.fs', () => {
  let localDirectory
  let stages

  beforeAll(() => {
    localDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'files-fs-native-'))
  })

  afterAll(() => {
    fs.rmSync(localDirectory, { force: true, recursive: true })
  })

  // Records each stage directory a file handle makes, without changing it.
  beforeEach(() => {
    stages = []
    const mkdtemp = fs.promises.mkdtemp.bind(fs.promises)

    jest.spyOn(fs.promises, 'mkdtemp').mockImplementation(async (...args) => {
      const made = await mkdtemp(...args)

      if (path.basename(made).startsWith('files-sdk-fs-')) {
        stages.push(made)
      }

      return made
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const nativeSide = name => {
    const root = path.join(localDirectory, name)
    fs.mkdirSync(root)

    return {
      at: entry => path.join(root, entry),
      bytesOf: entry => fs.readFileSync(path.join(root, entry)),
      fsys: fs.promises,
      mkdir: entry => fs.mkdirSync(path.join(root, entry)),
      seed: (entry, content) => fs.writeFileSync(path.join(root, entry), content),
    }
  }

  // The cases of the native reference (test/support/filesystem-parity.cjs), each against Node.js's own fs/promises
  // on a local directory. The filesystem parity case test.sh runs (test/scenarios/filesystem-parity.cjs) runs the same
  // consumers against client.fs on the Files.com Mock API Server, including the Unicode case's metadata lookups.
  describe.each(REFERENCE)('runs the native reference on Node.js\'s own fs/promises: %s', (name, consumer, reference) => {
    it('gives what the native reference recorded', async () => {
      const native = await consumer(nativeSide(name))

      expect(native).toEqual(reference)
      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    })
  })

  it('downloads a file only once its handle first reads or writes it, and publishes every change before it resolves', async () => {
    const service = remoteFiles()
    service.put('reports/a.txt', 'abcdef')
    const handle = await clientOf(service).fs.open('reports/a.txt', 'r+')

    expect(service.apiRequests()).toEqual(['GET /file_actions/metadata/reports/a.txt'])

    await handle.read(Buffer.alloc(2), 0, 2, null)
    await handle.write('XY', 0)
    expect(service.bytesOf('reports/a.txt').toString()).toBe('XYcdef')

    // Calls made at once run in the order made, each published before the next.
    const results = await Promise.all([handle.write('12', 2), handle.write('34', 4), handle.readFile('utf8')])
    expect(results.map(result => result.bytesWritten ?? result)).toEqual([2, 2, 'XY1234'.slice(2)])
    expect(service.bytesOf('reports/a.txt').toString()).toBe('XY1234')

    await handle.close()

    expect(service.apiRequests()).toEqual([
      'GET /file_actions/metadata/reports/a.txt',
      'GET /files/reports/a.txt',
      'POST /file_actions/begin_upload/reports/a.txt',
      'POST /files/reports/a.txt',
      'POST /file_actions/begin_upload/reports/a.txt',
      'POST /files/reports/a.txt',
      'POST /file_actions/begin_upload/reports/a.txt',
      'POST /files/reports/a.txt',
    ])
  })

  it('empties a file as open(\'w\') resolves, and resolves a write only once its upload has completed', async () => {
    const service = remoteFiles()
    service.put('reports/a.txt', 'old content')
    const handle = await clientOf(service).fs.open('reports/a.txt', 'w')

    expect(service.bytesOf('reports/a.txt')).toEqual(Buffer.alloc(0))

    const held = service.holdCompletion()
    let written = false
    const writing = handle.write('hello').then(result => {
      written = true
      return result
    })

    // However the assertions below go, the completion is let go, and the write and close joined, before the test ends.
    let closing = null

    try {
      await withinDeadline(held.reached, 'the write\'s completion')
      await eventLoopTurns()

      expect(written).toBe(false)
      expect(service.bytesOf('reports/a.txt')).toEqual(Buffer.alloc(0))

      // close() waits for the write admitted before it, and refuses anything asked after it.
      let closed = false
      closing = handle.close().then(() => { closed = true })
      const late = await errorOf(() => handle.write('late'))

      expect(late).toMatchObject({ code: 'EBADF', message: 'file closed', syscall: 'write' })

      await eventLoopTurns()
      expect(closed).toBe(false)
      expect(stages.every(stage => fs.existsSync(stage))).toBe(true)

      held.release()

      expect(await writing).toEqual({ buffer: 'hello', bytesWritten: 5 })
      await closing
      expect(service.bytesOf('reports/a.txt').toString()).toBe('hello')
      expect(stages).toHaveLength(1)
      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    } finally {
      held.release()
      await Promise.allSettled([writing, closing ?? handle.close()])
    }
  })

  it('fails a handle whose change could not be published: every later call and close() reject with that first failure', async () => {
    const service = remoteFiles()
    service.put('a.txt', 'old')
    const handle = await clientOf(service).fs.open('a.txt', 'r+')

    service.completions.failures.push(() => json({ error: 'Server error', 'http-code': 500 }, 500))
    const { error } = await outcomeOf(handle.write('new', 0))

    expect(error).toBeInstanceOf(FilesError)
    expect(error.completionUnknown).toBe(true)

    expect((await outcomeOf(handle.read(Buffer.alloc(3), 0, 3, 0))).error).toBe(error)
    expect((await outcomeOf(handle.stat())).error).toBe(error)
    expect((await outcomeOf(handle.close())).error).toBe(error)
    await expect(handle.close()).resolves.toBeUndefined()

    // The remote file keeps what it had, and nothing was deleted to "clean up" an upload of unknown outcome.
    expect(service.bytesOf('a.txt').toString()).toBe('old')
    expect(service.requests.some(request => request.method === 'DELETE')).toBe(false)
    expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
  })

  it('keeps a handle usable after a write whose arguments Node.js refused before touching the file', async () => {
    const service = remoteFiles()
    service.put('a.txt', 'abc')
    const handle = await clientOf(service).fs.open('a.txt', 'r+')

    const refused = await errorOf(() => handle.write(Buffer.from('xy'), 5, 1, 0))
    expect(refused.code).toBe('ERR_OUT_OF_RANGE')

    await handle.write('z', 0)
    await handle.close()
    expect(service.bytesOf('a.txt').toString()).toBe('zbc')
  })

  // Node.js writes an iterable's first chunk before it refuses the next, invalid one, with an argument error as well
  // (native-argument-error-proof-r1: 'original' becomes 'newginal'): what that left in the stage is never published.
  it('fails a handle whose writeFile() of an iterable failed after writing part of it, with that failure, publishing none of it', async () => {
    const service = remoteFiles()
    service.put('a.txt', 'original')
    const handle = await clientOf(service).fs.open('a.txt', 'r+')

    const chunks = (async function* partlyInvalid() {
      yield Buffer.from('new')
      yield { invalid: true }
    }())

    const failure = await rejectionOf(handle.writeFile(chunks))
    expect(failure.code).toBe('ERR_INVALID_ARG_TYPE')

    expect(await rejectionOf(handle.write('later', 0))).toBe(failure)
    expect(await rejectionOf(handle.close())).toBe(failure)

    expect(service.bytesOf('a.txt').toString()).toBe('original')
    expect(service.apiRequests().filter(request => request.startsWith('POST'))).toEqual([])
    expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
  })

  // Node.js's writev() may write fewer bytes than it was given, as the stage's does under a file size limit
  // (native-short-write-proof-r1: 4 of 8). Here the stage's own writev() is given only the first 4 of the stream's 8
  // bytes, once; the write of the rest then completes, fails with its own error, or writes nothing.
  it.each([
    ['completes the rest, finishing only once every byte has been published', 'complete', { bytes: 'abcdefgh', bytesWritten: 8 }],
    ['fails with the rest\'s own error, never finishing', 'fail', { bytes: 'abcd', bytesWritten: 4 }],
    ['fails once a write of the rest writes nothing, never finishing', 'none', { bytes: 'abcd', bytesWritten: 4 }],
  ])('a write stream given a short write %s', async (_, rest, expected) => {
    const service = remoteFiles()
    const failure = Object.assign(new Error('EFBIG: file too large, write'), { code: 'EFBIG' })
    const requested = []

    wrapStageHandles(['writev'], (method, writev) => async (buffers, position) => {
      requested.push(buffers.reduce((total, buffer) => total + buffer.length, 0))

      if (requested.length === 1) {
        const { bytesWritten } = await writev([Buffer.concat(buffers).subarray(0, 4)], position)
        return { buffers, bytesWritten }
      }

      if (rest === 'fail') {
        throw failure
      }

      return rest === 'none' ? { buffers, bytesWritten: 0 } : writev(buffers, position)
    })

    const handle = await clientOf(service).fs.open('stream.txt', 'w')
    const stream = handle.createWriteStream()
    const closed = new Promise(resolve => { stream.once('close', resolve) })
    let finished = false
    stream.on('finish', () => { finished = true })

    const outcome = await outcomeOf(pipeline(Readable.from([Buffer.from('abcdefgh')]), stream))
    await withinDeadline(closed, 'the stream to close')

    expect(requested).toEqual([8, 4])
    expect(stream.bytesWritten).toBe(expected.bytesWritten)
    expect(service.bytesOf('stream.txt').toString()).toBe(expected.bytes)
    expect(finished).toBe(rest === 'complete')

    const errors = {
      complete: undefined,
      fail: failure,
      none: expect.objectContaining({ message: 'A write of the stream wrote nothing of the 4 bytes it had left to write' }),
    }

    expect(outcome.error).toEqual(errors[rest])

    if (rest === 'fail') {
      expect(outcome.error).toBe(failure)
    }

    expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
  })

  // A whole-file call's signal stops its own metadata request and publication: the call rejects with the signal's
  // reason itself, whatever it is, null and 0 included, the request is stopped, and nothing is left behind.
  describe('cancelled by its signal', () => {
    // Calls call(signal), holds the service's next request of kind, aborts with reason once it has arrived, and gives
    // the call's rejection; a call that does not settle once aborted fails the test by the deadline, rather than
    // waiting for a release that only comes after it. However the test goes, lets the request go and joins the call.
    const abortedWhileHeld = async (service, kind, call, reason) => {
      const held = service.holdNext(kind)
      const controller = new AbortController()
      const outcome = outcomeOf(call(controller.signal))

      try {
        await withinDeadline(held.reached, `the ${kind} request`)
        controller.abort(reason)
        const settled = await withinDeadline(outcome, `the call to stop while its ${kind} request was held`)

        expect(Object.keys(settled)).toEqual(['error'])
        return settled.error
      } finally {
        if (!controller.signal.aborted) {
          controller.abort(new Error('the test ended'))
        }

        held.release()
        await outcome
      }
    }

    it.each([['an object', { cause: 'no longer needed' }], ['null', null], ['0', 0]])('readFile() and writeFile() of a path, while their metadata request is held, with the exact reason, %s', async (_, reason) => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const client = clientOf(service)

      const reading = await abortedWhileHeld(service, 'metadata', signal => client.fs.readFile('a.txt', { signal }), reason)
      const writing = await abortedWhileHeld(service, 'metadata', signal => client.fs.writeFile('a.txt', 'new', { signal }), reason)

      expect([Object.is(reading, reason), Object.is(writing, reason)]).toEqual([true, true])
      expect(service.stopped).toEqual(['metadata', 'metadata'])
      expect(service.apiRequests()).toEqual(['GET /file_actions/metadata/a.txt', 'GET /file_actions/metadata/a.txt'])
      expect(stages).toEqual([])
      expect(service.bytesOf('a.txt').toString()).toBe('kept')
    })

    it.each([['an object', { cause: 'no longer needed' }], ['null', null], ['0', 0]])('writeFile() of a path, while its publication is held, its own or the one that creates the file, with the exact reason, %s', async (_, reason) => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const client = clientOf(service)
      const { O_CREAT, O_RDWR } = fs.constants

      const replacing = await abortedWhileHeld(service, 'completion', signal => client.fs.writeFile('a.txt', 'new', { signal }), reason)
      // eslint-disable-next-line no-bitwise
      const creating = await abortedWhileHeld(service, 'completion', signal => client.fs.writeFile('new.txt', 'made', { flag: O_RDWR | O_CREAT, signal }), reason)

      expect([Object.is(replacing, reason), Object.is(creating, reason)]).toEqual([true, true])
      expect(service.stopped).toEqual(['completion', 'completion'])
      expect(service.bytesOf('a.txt').toString()).toBe('kept')
      expect(service.entries.has('new.txt')).toBe(false)
      expect(stages).toHaveLength(2)
      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    })

    // A read stream fails with the reason itself whenever it is truthy, as the SDK's other streams do; only a falsy one,
    // with which a Node.js stream cannot fail, becomes an AbortError whose cause it is.
    it.each([
      ['an object', { cause: 'no longer reading' }],
      ['an Error', new Error('no longer reading')],
      ['null', null],
      ['0', 0],
    ])('a read stream, while its handle\'s download is held, failing with the reason, %s, and stopping the download so that the handle closes', async (_, reason) => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const handle = await clientOf(service).fs.open('a.txt')
      const held = service.holdNext('download')
      const controller = new AbortController()
      const stream = handle.createReadStream({ signal: controller.signal })
      const errored = new Promise(resolve => { stream.once('error', resolve) })
      const closed = new Promise(resolve => { stream.once('close', resolve) })

      try {
        stream.resume()
        await withinDeadline(held.reached, 'the download')
        controller.abort(reason)

        // The stream closes only once the handle has: that is, once the download it waited for has been stopped and the
        // stage released.
        const error = await withinDeadline(errored, 'the stream to fail')
        await withinDeadline(closed, 'the stream to close')

        if (reason) {
          expect(error).toBe(reason)
        } else {
          expect(error).toMatchObject({ code: 'ABORT_ERR', name: 'AbortError' })
          expect(Object.is(error.cause, reason)).toBe(true)
        }

        expect(service.stopped).toEqual(['download'])
        expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)
        expect(await rejectionOf(handle.read(Buffer.alloc(1), 0, 1, 0))).toMatchObject({ code: 'EBADF', message: 'file closed' })
        expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
      } finally {
        if (!controller.signal.aborted) {
          controller.abort(new Error('the test ended'))
        }

        held.release()
        await handle.close().catch(() => {})
      }
    })

    // Its reader's destroy() stops a read stream's own work too, with no signal at all: closing the handle, which waits
    // for what the handle was asked, would otherwise wait for a download only the test's release would end.
    it('a read stream its reader destroys, with no signal, while its handle\'s download is held, stopping the download before it closes the handle', async () => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const handle = await clientOf(service).fs.open('a.txt')
      const held = service.holdNext('download')
      const failure = new Error('the reader gave up')
      const stream = handle.createReadStream()
      const errored = new Promise(resolve => { stream.once('error', resolve) })
      const closed = new Promise(resolve => { stream.once('close', resolve) })

      try {
        stream.resume()
        await withinDeadline(held.reached, 'the download')
        stream.destroy(failure)

        expect(await withinDeadline(errored, 'the stream to fail')).toBe(failure)
        await withinDeadline(closed, 'the stream to close')

        expect(service.stopped).toEqual(['download'])
        expect(await rejectionOf(handle.read(Buffer.alloc(1), 0, 1, 0))).toMatchObject({ code: 'EBADF', message: 'file closed' })
        expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
      } finally {
        held.release()
        await handle.close().catch(() => {})
      }
    })

    it('a read stream without autoClose, destroyed while its download is held, stopping only that download and leaving its handle usable', async () => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const handle = await clientOf(service).fs.open('a.txt')
      const held = service.holdNext('download')
      const stream = handle.createReadStream({ autoClose: false })
      const closed = new Promise(resolve => { stream.once('close', resolve) })

      try {
        stream.resume()
        await withinDeadline(held.reached, 'the download')
        stream.destroy()
        await withinDeadline(closed, 'the stream to close')

        expect(service.stopped).toEqual(['download'])

        // The stopped download left no stage: the handle's next read downloads the file again, and reads all of it.
        const buffer = Buffer.alloc(4)
        expect((await withinDeadline(handle.read(buffer, 0, 4, 0), 'the handle\'s read')).bytesRead).toBe(4)
        expect(buffer.toString()).toBe('kept')
        expect(service.apiRequests()).toEqual(['GET /file_actions/metadata/a.txt', 'GET /files/a.txt', 'GET /files/a.txt'])
      } finally {
        held.release()
        await handle.close().catch(() => {})
      }

      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    })

    it('a read stream destroyed while an earlier call of its handle downloads, stopping none of that call\'s work', async () => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const handle = await clientOf(service).fs.open('a.txt')
      const held = service.holdNext('download')
      const reading = outcomeOf(handle.readFile('utf8'))
      const stream = handle.createReadStream({ autoClose: false })
      const closed = new Promise(resolve => { stream.once('close', resolve) })

      try {
        await withinDeadline(held.reached, 'the readFile() download')

        // The stream's read is asked after the readFile(), and waits its turn; destroying the stream stops that read alone.
        stream.resume()
        await eventLoopTurns()
        stream.destroy()
        await eventLoopTurns()

        expect(service.stopped).toEqual([])

        held.release()

        expect(await withinDeadline(reading, 'the readFile()')).toEqual({ value: 'kept' })
        await withinDeadline(closed, 'the stream to close')

        // The stream's read, stopped at its turn, downloaded nothing: the handle reads the stage the readFile() made.
        const buffer = Buffer.alloc(4)
        expect((await handle.read(buffer, 0, 4, 0)).bytesRead).toBe(4)
        expect(buffer.toString()).toBe('kept')
        expect(service.apiRequests()).toEqual(['GET /file_actions/metadata/a.txt', 'GET /files/a.txt'])
      } finally {
        held.release()
        await reading
        await handle.close().catch(() => {})
      }

      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    })

    it('a read stream letting go of its signal once it settles, read to its end or destroyed', async () => {
      const service = remoteFiles()
      service.put('a.txt', 'kept')
      const handle = await clientOf(service).fs.open('a.txt')
      const controller = new AbortController()

      const ended = handle.createReadStream({ autoClose: false, signal: controller.signal })
      const parts = []
      ended.on('data', chunk => parts.push(chunk))
      await withinDeadline(new Promise(resolve => { ended.once('close', resolve) }), 'the stream to end')

      expect(Buffer.concat(parts).toString()).toBe('kept')
      expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)

      const destroyed = handle.createReadStream({ autoClose: false, signal: controller.signal })
      expect(getEventListeners(controller.signal, 'abort')).toHaveLength(1)
      const closed = new Promise(resolve => { destroyed.once('close', resolve) })
      destroyed.destroy()
      await withinDeadline(closed, 'the stream to close')
      expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0)

      // Aborting the signal once its streams have settled stops nothing of the handle's.
      controller.abort(new Error('after the streams'))
      expect((await handle.read(Buffer.alloc(4), 0, 4, 0)).bytesRead).toBe(4)
      await handle.close()
      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    })

    // Node.js's own readFile() and writeFile() of the stage reject with an AbortError whose cause is the reason
    // (native-local-abort-proof-r1): here the signal aborts as Node.js's call of the staged file begins.
    it.each([['null', null], ['0', 0]])('a staged file\'s readFile() and writeFile(), stopped as Node.js reads or writes it, with the exact reason, %s, not an AbortError', async (_, reason) => {
      const service = remoteFiles()
      service.put('a.txt', 'original')
      let abortNow = null

      wrapStageHandles(['readFile', 'writeFile'], (method, real) => (...args) => {
        abortNow?.()
        return real(...args)
      })

      const handle = await clientOf(service).fs.open('a.txt', 'r+')
      expect(await handle.readFile('utf8')).toBe('original')

      const reading = new AbortController()
      abortNow = () => reading.abort(reason)
      expect(Object.is(await rejectionOf(handle.readFile({ signal: reading.signal })), reason)).toBe(true)

      // A stopped read changes nothing: the handle goes on.
      abortNow = null
      expect(await handle.readFile({ encoding: 'utf8' })).toBe('')

      // A write stopped while Node.js writes may have changed part of the stage: the handle fails with the reason,
      // and nothing is published.
      const writing = new AbortController()
      abortNow = () => writing.abort(reason)
      expect(Object.is(await rejectionOf(handle.writeFile('new', { signal: writing.signal })), reason)).toBe(true)

      abortNow = null
      expect(Object.is(await rejectionOf(handle.read(Buffer.alloc(1), 0, 1, 0)), reason)).toBe(true)
      expect(Object.is(await rejectionOf(handle.close()), reason)).toBe(true)

      // A signal aborted already stops a call before it touches anything: the handle stays usable.
      const again = await clientOf(service).fs.open('a.txt', 'r+')
      expect(await again.readFile('utf8')).toBe('original')
      expect(Object.is(await rejectionOf(again.writeFile('x', { signal: AbortSignal.abort(reason) })), reason)).toBe(true)
      await again.write('O', 0)
      await again.close()

      expect(service.bytesOf('a.txt').toString()).toBe('Original')
      expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
    })
  })

  it('rejects readFile() with its read\'s own failure when closing fails too, and with the close\'s failure when only that failed', async () => {
    const service = remoteFiles()
    service.put('broken/a.txt', 'unreadable')
    service.put('a.txt', 'readable')
    const client = clientOf(service)
    const removal = Object.assign(new Error('EBUSY: resource busy or locked, rmdir'), { code: 'EBUSY' })
    const removals = []
    const rm = fs.promises.rm.bind(fs.promises)

    jest.spyOn(fs.promises, 'rm').mockImplementation(async (target, options) => {
      if (options?.recursive && path.basename(String(target)).startsWith('files-sdk-fs-')) {
        removals.push(target)
        throw removal
      }

      return rm(target, options)
    })

    try {
      const readFailure = await rejectionOf(client.fs.readFile('broken/a.txt'))
      expect(readFailure).toBeInstanceOf(FilesError)
      expect(readFailure.code).toBe(500)

      expect(await rejectionOf(client.fs.readFile('a.txt'))).toBe(removal)
      expect(removals).toHaveLength(2)
    } finally {
      jest.restoreAllMocks()
      stages.forEach(stage => fs.rmSync(stage, { force: true, recursive: true }))
    }
  })

  it('refuses a write through a handle opened only for reading, as Node.js does, sending nothing', async () => {
    const service = remoteFiles()
    service.put('a.txt', 'abc')
    const handle = await clientOf(service).fs.open('a.txt')

    const refused = await errorOf(() => handle.write('x', 0))
    expect(refused).toMatchObject({ code: 'EBADF', syscall: 'write' })
    expect(await handle.readFile('utf8')).toBe('abc')
    await handle.close()

    expect(service.apiRequests()).toEqual(['GET /file_actions/metadata/a.txt', 'GET /files/a.txt'])
  })

  it('lists a directory one page at a time, through an empty page with a cursor, with each entry\'s own name and type', async () => {
    const service = remoteFiles()
    service.mkdir('big')
    service.put('big/a.txt', 'a')
    service.put('big/b.txt', 'b')
    service.mkdir('big/c')
    service.put('big/d.txt', 'd')
    service.pages.set('big', [['a.txt', 'b.txt'], [], ['c'], ['d.txt']])

    const client = clientOf(service)
    const dir = await client.fs.opendir('big')
    const listings = () => service.requests.filter(request => request.path === '/folders/big').map(request => request.query.cursor ?? null)

    expect((await dir.read()).name).toBe('a.txt')
    expect((await dir.read()).name).toBe('b.txt')
    expect(listings()).toEqual([null])

    const third = await dir.read()
    expect([third.name, third.isDirectory(), third.parentPath]).toEqual(['c', true, 'big'])
    expect(listings()).toEqual([null, 'page-1', 'page-2'])

    expect((await dir.read()).name).toBe('d.txt')
    expect(await dir.read()).toBeNull()
    expect(await dir.read()).toBeNull()
    expect(listings()).toEqual([null, 'page-1', 'page-2', 'page-3'])
    await dir.close()

    expect(await client.fs.readdir('big')).toEqual(['a.txt', 'b.txt', 'c', 'd.txt'])
    const dirents = await client.fs.readdir('big', { withFileTypes: true })
    expect(dirents.map(entry => [entry.name, entry.parentPath, entry.isFile(), entry.isDirectory()])).toEqual([
      ['a.txt', 'big', true, false],
      ['b.txt', 'big', true, false],
      ['c', 'big', false, true],
      ['d.txt', 'big', true, false],
    ])

    // Only the directory's metadata and its listings were requested: no search, and no listing after its last page.
    expect(service.apiRequests().filter(request => !request.startsWith('GET /folders/big') && request !== 'GET /file_actions/metadata/big')).toEqual([])
  })

  it('requests no more pages once a for await loop leaves early, or fails, and calls back each read once', async () => {
    const service = remoteFiles()
    service.mkdir('big')
    service.put('big/a.txt', 'a')
    service.put('big/b.txt', 'b')
    service.pages.set('big', [['a.txt'], ['b.txt']])

    const client = clientOf(service)
    const leaving = await client.fs.opendir('big')

    // eslint-disable-next-line no-unreachable-loop
    for await (const entry of leaving) {
      expect(entry.name).toBe('a.txt')
      break
    }

    const failing = await client.fs.opendir('big')
    const thrown = new Error('the loop failed')
    const caught = await errorOf(async () => {
      // eslint-disable-next-line no-unreachable-loop
      for await (const entry of failing) {
        throw Object.assign(thrown, { entry })
      }
    })

    expect(caught).toBe(thrown)
    expect((await errorOf(() => leaving.read())).code).toBe('ERR_DIR_CLOSED')
    expect((await errorOf(() => failing.read())).code).toBe('ERR_DIR_CLOSED')
    expect(service.requests.filter(request => request.path === '/folders/big')).toHaveLength(2)

    const calls = []
    const reading = await client.fs.opendir('big')
    await new Promise(resolve => {
      reading.read((error, entry) => {
        calls.push([error, entry?.name])
        resolve()
      })
    })

    await eventLoopTurns()
    expect(calls).toEqual([[null, 'a.txt']])
    expect(() => reading.closeSync()).not.toThrow()
    expect(() => reading.read(() => {})).toThrow(expect.objectContaining({ code: 'ERR_DIR_CLOSED' }))
  })

  it('lists the directories within too, with recursive, by their path from the directory', async () => {
    const service = remoteFiles()
    service.mkdir('tree')
    service.put('tree/a.txt', 'a')
    service.mkdir('tree/sub')
    service.put('tree/sub/b.txt', 'b')

    const client = clientOf(service)
    expect(await client.fs.readdir('tree', { recursive: true })).toEqual(['a.txt', 'sub', 'sub/b.txt'])

    const dirents = await client.fs.readdir('tree/', { recursive: true, withFileTypes: true })
    expect(dirents.map(entry => [entry.name, entry.parentPath])).toEqual([['a.txt', 'tree/'], ['sub', 'tree/'], ['b.txt', 'tree/sub']])
  })

  it('maps only a path the API says is not there to ENOENT, keeping the SDK\'s error, its numeric code included, as its cause', async () => {
    const service = remoteFiles()
    service.mkdir('reports')
    service.put('reports/a.txt', 'a')
    const client = clientOf(service)

    const missing = await errorOf(() => client.fs.open('reports/missing.txt'))
    expect(missing).toMatchObject({ code: 'ENOENT', path: 'reports/missing.txt', syscall: 'open' })
    expect(missing.cause).toBeInstanceOf(FilesApiError)
    expect(missing.cause.type).toBe('not-found/file-not-found')
    expect(missing.cause.code).toBe(404)

    expect(await errorOf(() => client.fs.opendir('reports/missing'))).toMatchObject({ code: 'ENOENT', syscall: 'opendir' })
    expect(await errorOf(() => client.fs.stat('reports/missing.txt'))).toMatchObject({ code: 'ENOENT', syscall: 'stat' })
    expect(await errorOf(() => client.fs.open('reports'))).toMatchObject({ code: 'EISDIR', syscall: 'open' })
    expect(await errorOf(() => client.fs.open('reports', 'w'))).toMatchObject({ code: 'EISDIR', syscall: 'open' })
    expect(await errorOf(() => client.fs.opendir('reports/a.txt'))).toMatchObject({ code: 'ENOTDIR', syscall: 'opendir' })

    // An authentication failure, or a 404 that names no missing path, is the SDK's own error, as it is.
    const refused = await errorOf(() => clientOf(service, { apiKey: 'refused-key' }).fs.open('reports/a.txt'))
    expect(refused).toBeInstanceOf(FilesApiError)
    expect(refused.type).toBe('not-authenticated/invalid-credentials')
    expect(refused.code).toBe(401)

    const unrouted = await errorOf(() => client.fs.readFile('unrouted/a.txt'))
    expect(unrouted).toBeInstanceOf(FilesError)
    expect(unrouted.code).toBe(404)
    expect(unrouted.cause).toBeUndefined()
  })

  it.each([
    ['appending', fsys => fsys.open('a.txt', 'a')],
    ['appending, as numeric flags', fsys => fsys.open('a.txt', fs.constants.O_WRONLY | fs.constants.O_APPEND)], // eslint-disable-line no-bitwise
    ['exclusive creation', fsys => fsys.open('new.txt', 'wx')],
    ['exclusive creation, as numeric flags', fsys => fsys.open('new.txt', fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL)], // eslint-disable-line no-bitwise
    ['synchronous I/O', fsys => fsys.open('a.txt', 'rs+')],
    // Bits above the 32 that JavaScript's bitwise operators see, beside supported ones that would otherwise truncate.
    ['numeric flags wider than 32 bits', fsys => fsys.open('a.txt', (2 ** 32) + (fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC))], // eslint-disable-line no-bitwise
    ['a file mode', fsys => fsys.open('new.txt', 'w', 0o644)],
    ['appendFile() to a path with its default flag', fsys => fsys.appendFile('a.txt', 'more')],
    ['writeFile() with flush', fsys => fsys.writeFile('a.txt', 'x', { flush: true })],
    ['a URL', fsys => fsys.readFile(new URL('file:///etc/hosts'))],
    ['a path of bytes that are not UTF-8', fsys => fsys.readFile(Buffer.from([0x61, 0xff]))],
  ])('refuses %s with a NotImplementedError before sending anything', async (_, call) => {
    const service = remoteFiles()
    service.put('a.txt', 'kept')

    const error = await errorOf(() => call(clientOf(service).fs))

    expect(error).toBeInstanceOf(NotImplementedError)
    expect(service.requests).toEqual([])
    expect(service.bytesOf('a.txt').toString()).toBe('kept')
  })

  it('refuses what a handle cannot do with a NotImplementedError, changing nothing, and never exposes a descriptor', async () => {
    const service = remoteFiles()
    service.put('a.txt', 'kept')
    service.mkdir('folder')
    const client = clientOf(service)
    const handle = await client.fs.open('a.txt', 'r+')

    const refusals = await Promise.all([
      errorOf(() => handle.chmod(0o600)),
      errorOf(() => handle.chown(1, 1)),
      errorOf(() => handle.utimes(new Date(), new Date())),
      errorOf(() => handle.sync()),
      errorOf(() => handle.datasync()),
      errorOf(() => handle.fd),
      errorOf(() => handle.createWriteStream({ flush: true })),
    ])

    refusals.forEach(error => expect(error).toBeInstanceOf(NotImplementedError))

    const dir = await client.fs.opendir('folder')
    expect(() => dir.readSync()).toThrow(NotImplementedError)
    await dir.close()

    await handle.close()
    expect(service.bytesOf('a.txt').toString()).toBe('kept')
    expect(service.apiRequests()).toEqual(['GET /file_actions/metadata/a.txt', 'GET /file_actions/metadata/folder'])
  })

  it('reads and writes whole files: writeFile() replaces a file with one upload, and leaves it as it was when its data fails', async () => {
    const service = remoteFiles()
    service.put('notes.txt', 'old notes')
    const client = clientOf(service)

    await client.fs.writeFile('notes.txt', 'new notes')
    expect(service.bytesOf('notes.txt').toString()).toBe('new notes')
    expect(service.apiRequests().filter(request => request.startsWith('POST /file_actions/begin_upload'))).toHaveLength(1)

    await client.fs.writeFile('created.txt', Buffer.from('made'))
    expect(await client.fs.readFile('created.txt', 'utf8')).toBe('made')
    expect(await client.fs.readFile('created.txt')).toEqual(Buffer.from('made'))

    const failure = new Error('the source failed')
    const failing = (async function* source() {
      yield 'partial '
      throw failure
    }())

    expect(await errorOf(() => client.fs.writeFile('notes.txt', failing))).toBe(failure)
    expect(service.bytesOf('notes.txt').toString()).toBe('new notes')

    // appendFile() with a flag that does not append, given explicitly, writes as that flag does: 'r+' at the start of
    // the existing file, which a mode, for flags that do not create the file, does not change.
    await client.fs.appendFile('notes.txt', 'NEW', { flag: 'r+', mode: 0o644 })
    expect(service.bytesOf('notes.txt').toString()).toBe('NEW notes')
    expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
  })

  it('streams through a handle: a write stream finishes once every chunk has been published, and lines read in order', async () => {
    const service = remoteFiles()
    const client = clientOf(service)

    const writer = await client.fs.open('stream.txt', 'w')
    const stream = writer.createWriteStream()
    // A plain promise, which never rejects, so that a stream that fails fails the test where it is awaited, rather than
    // rejecting unobserved, as events.once() would on 'error'.
    const closed = new Promise(resolve => { stream.once('close', resolve) })
    await pipeline(Readable.from(['one\n', 'two\n', 'three']), stream)
    await withinDeadline(closed, 'the write stream to close')

    expect(service.bytesOf('stream.txt').toString()).toBe('one\ntwo\nthree')
    expect(stream.bytesWritten).toBe(13)

    // A read stream closes its handle once it ends, by default.
    const reader = await client.fs.open('stream.txt')
    const lineReader = reader.readLines()
    const readerClosed = new Promise(resolve => { lineReader.input.once('close', resolve) })
    const lines = []

    for await (const line of lineReader) {
      lines.push(line)
    }

    await withinDeadline(readerClosed, 'the read stream to close')
    expect(lines).toEqual(['one', 'two', 'three'])
    expect(await errorOf(() => reader.read(Buffer.alloc(1), 0, 1, 0))).toMatchObject({ code: 'EBADF', message: 'file closed' })

    const web = await client.fs.open('stream.txt')
    const webStream = web.readableWebStream()
    expect(() => web.readableWebStream()).toThrow(expect.objectContaining({ code: 'ERR_INVALID_STATE' }))
    expect(Buffer.from(await new Response(webStream).arrayBuffer()).toString()).toBe('one\ntwo\nthree')
    await web.close()
    expect(stages.every(stage => !fs.existsSync(stage))).toBe(true)
  })

  it('gives stats with what the API has, and nothing made up', async () => {
    const service = remoteFiles()
    service.put('a.txt', 'abc')
    service.mkdir('folder')
    const client = clientOf(service)

    const stats = await client.fs.stat('a.txt')
    expect(stats.size).toBe(3)
    expect(stats.mtime).toEqual(new Date(service.entries.get('a.txt').mtime))
    expect(stats.mtimeMs).toBe(stats.mtime.getTime())
    expect(stats.birthtime).toEqual(new Date(service.entries.get('a.txt').created_at))
    expect([stats.isFile(), stats.isDirectory(), stats.isSymbolicLink()]).toEqual([true, false, false])
    expect(['atime', 'ctime', 'dev', 'gid', 'ino', 'mode', 'nlink', 'uid'].filter(field => field in stats)).toEqual([])

    const big = await client.fs.stat('a.txt', { bigint: true })
    expect(big.size).toBe(BigInt(3))
    expect(big.mtimeNs).toBe(BigInt(stats.mtime.getTime()) * BigInt(1000000))
    expect((await client.fs.stat('folder')).isDirectory()).toBe(true)

    await expect(client.fs.readdir('folder', { encoding: 'not-an-encoding' })).rejects.toBeInstanceOf(InvalidParameterError)
  })

  it('rejects every method with a NotImplementedError in a browser, sending nothing', async () => {
    const service = remoteFiles()
    globalThis.self = { document: {} }

    try {
      const client = clientOf(service)
      await expect(client.fs.open('a.txt')).rejects.toBeInstanceOf(NotImplementedError)
      await expect(client.fs.readdir('folder')).rejects.toBeInstanceOf(NotImplementedError)
    } finally {
      delete globalThis.self
    }

    expect(service.requests).toEqual([])
  })
})
