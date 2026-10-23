import fs from 'fs'
import os from 'os'
import path from 'path'
import { Readable } from 'stream'

import crossFetch from 'cross-fetch'
import nock from 'nock'

import Api from '../lib/Api'
import { FilesError, InvalidParameterError } from '../lib/Errors'
import Files from '../lib/Files'
import FilesClient from '../lib/FilesClient'
import File from '../lib/models/File'
import { formEnvelopeOf, grantsOf, instructionsOf } from '../lib/Upload'

const API_URL = 'http://example.test'
const STORAGE_URL = 'https://storage.example.test'
const DESTINATION = 'reports/daily.csv'
const DATA = 'date,total\n2026-10-12,3\n'
const BEGIN_PATH = '/api/rest/v1/file_actions/begin_upload/'
const FILES_PATH = '/api/rest/v1/files/'

// The value a request header was sent with. Nock gives a header as its string or as an array of the values it was sent
// with; one value is that value, while no value or several stay an array, so that a missing or repeated header still
// differs from the value expected.
const headerValue = header => (Array.isArray(header) && header.length === 1 ? header[0] : header)

// Data of count parts of four bytes each, such as 'a001a002'.
const partsOf = (letter, count) => Array.from({ length: count }, (_, index) => `${letter}${String(index + 1).padStart(3, '0')}`).join('')

// The bytes stored for one upload, its parts in order.
const storedBytes = parts => Object.keys(parts).sort((first, second) => first - second).map(part => parts[part]).join('')

const outcomeOf = promise => promise.then(value => ({ value }), error => ({ error }))

// Lets the event loop turn until check() holds, or fails after ms.
const waitFor = async (check, ms = 2000) => {
  const deadline = Date.now() + ms

  while (!check()) {
    if (Date.now() > deadline) {
      throw new Error('Timed out waiting for the upload')
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => { setTimeout(resolve, 5) })
  }
}

// A determinePartUploadUri that records each call in events, by the part its grant is for.
const recordingCallback = events => fileUploadPart => {
  events.push(`callback ${fileUploadPart.parameters.part}`)
  return fileUploadPart.upload_uri
}

// Stands in for the API's begin_upload and upload completion, and for the storage its grants sign, for uploads to any
// path. Each grant is for its part of partsize bytes, allowed in parallel unless parallel is false, and, when the upload
// gave its size and fixLength is on, fixes its part's exact Content-Length, so that the API sizes the parts; grant()
// adds fields of a test's own. Records in apiRequests each API request's kind ('begin', 'grants' or 'end'), body, path,
// API key and workspace; in events, as they come, 'begin', 'grants <from>-<to>', 'store <part>' and 'end'; each stored
// body by path and part; each part's grants and sends by path and part; and how many storage requests were under way
// at once, at most. answerGrants(request, answer) answers a request for grants, at once by default: answer(fields,
// status, only) with fields over every grant's, and only the grants of the parts only lists, when given. answerStore(
// store, answer) answers a part's storage, at once by default: answer(status, headers).
const serveTransfers = ({
  answerGrants = (request, answer) => answer(),
  answerStore = (store, answer) => answer(),
  fixLength = true,
  grant = () => ({}),
  parallel = true,
  partsize = 4,
} = {}) => {
  const apiRequests = []
  const events = []
  const stored = {}
  const grants = {}
  const sends = {}
  const sizes = {}
  const counts = { inFlight: 0, mostInFlight: 0 }

  nock(API_URL)
    .persist()
    .post(uri => uri.startsWith(BEGIN_PATH))
    .reply(function answerBegin(uri, body, callback) {
      const uploadPath = decodeURIComponent(uri.replace(BEGIN_PATH, ''))
      const kind = body.ref === undefined ? 'begin' : 'grants'
      const first = body.part ?? 1
      const count = body.parts ?? 1

      if (kind === 'begin') {
        sizes[uploadPath] = body.size ?? null
      }

      apiRequests.push({
        body,
        key: headerValue(this.req.headers['x-filesapi-key']),
        kind,
        path: uploadPath,
        workspace: headerValue(this.req.headers['x-files-workspace-id']),
      })

      events.push(kind === 'begin' ? 'begin' : `grants ${first}-${first + count - 1}`)

      answerGrants({ body, count, first, kind, path: uploadPath }, (fields = {}, status = 200, only = null) => {
        if (status !== 200) {
          callback(null, [status, { 'http-code': status, title: 'Refused', type: 'bad-request' }])
          return
        }

        const answered = Array.from({ length: count }, (_, index) => first + index).filter(part => !only || only.includes(part))

        callback(null, [200, answered.map(part => {
          const key = `${uploadPath} ${part}`
          grants[key] = (grants[key] ?? 0) + 1
          const size = sizes[uploadPath]
          const length = size === null ? null : Math.max(0, Math.min(partsize, size - ((part - 1) * partsize)))

          return {
            parallel_parts: parallel,
            part_number: part,
            partsize,
            ref: 'upload-ref',
            upload_uri: `${STORAGE_URL}/part?path=${encodeURIComponent(uploadPath)}&part=${part}&grant=${grants[key]}`,
            ...(fixLength && length !== null ? { headers: { 'Content-Length': `${length}` } } : {}),
            ...grant({ attempt: grants[key], part, path: uploadPath }),
            ...fields,
          }
        })])
      })
    })

  nock(API_URL)
    .persist()
    .post(uri => uri.startsWith(FILES_PATH))
    .reply(function answerEnd(uri, body) {
      const uploadPath = decodeURIComponent(uri.replace(FILES_PATH, ''))

      apiRequests.push({
        body,
        key: headerValue(this.req.headers['x-filesapi-key']),
        kind: 'end',
        path: uploadPath,
        workspace: headerValue(this.req.headers['x-files-workspace-id']),
      })

      events.push('end')
      return [201, { path: uploadPath, size: body.size, type: 'file' }]
    })

  nock(STORAGE_URL)
    .persist()
    .put('/part')
    .query(true)
    .reply(function store(uri, body, callback) {
      const query = new URL(uri, STORAGE_URL).searchParams
      const uploadPath = query.get('path')
      const part = Number(query.get('part'))
      const key = `${uploadPath} ${part}`
      sends[key] = (sends[key] ?? 0) + 1
      counts.inFlight += 1
      counts.mostInFlight = Math.max(counts.mostInFlight, counts.inFlight)

      const filesHeaders = Object.keys(this.req.headers).filter(name => name.startsWith('x-files'))
      const store = {
        body,
        filesHeaders,
        grant: Number(query.get('grant')),
        part,
        path: uploadPath,
        send: sends[key],
      }

      answerStore(store, (status = 200, headers = {}) => {
        counts.inFlight -= 1

        if (status === 200) {
          stored[uploadPath] = { ...stored[uploadPath], [part]: body }
          events.push(`store ${part}`)
        }

        callback(null, [status, status === 200 ? '' : 'refused', { ETag: `"etag-${part}"`, ...headers }])
      })
    })

  return {
    apiRequests,
    counts,
    events,
    grants,
    sends,
    stored,
  }
}

// An API answer, or a storage answer, from a client's fetch.
const fakeResponse = ({ body = null, data, headers = {}, status = 200 } = {}) => {
  const entries = Object.entries({ ...(data !== undefined ? { 'content-type': 'application/json' } : {}), ...headers })

  return {
    body,
    headers: {
      entries: () => entries[Symbol.iterator](),
      get: name => entries.find(([key]) => key === name.toLowerCase())?.[1] ?? null,
    },
    json: async () => data,
    ok: status >= 200 && status < 300,
    redirected: false,
    status,
    statusText: status === 200 ? 'OK' : 'Status',
    text: async () => (data === undefined ? '' : JSON.stringify(data)),
  }
}

// A grant for part of the upload a client's fetch stands in for.
const grantOf = (part, fields = {}) => ({
  parallel_parts: true,
  part_number: part,
  partsize: 3,
  ref: 'upload-ref',
  upload_uri: `${STORAGE_URL}/part-${part}`,
  ...fields,
})

// A client whose fetch stands in for the API and storage, recording every request in calls with its exact bytes:
// answerApi({ body, kind, url }) and answerStorage({ bytes, part, send, signal, url }) resolve with its answers, by
// default the grants asked for, a 201 completion and a stored part with its ETag; signal is the one the storage
// request was sent with.
const standInClient = ({
  answerApi = ({ body, kind }) => {
    if (kind === 'end') {
      return fakeResponse({ data: { path: DESTINATION, size: body.size, type: 'file' }, status: 201 })
    }

    const first = body.part ?? 1
    return fakeResponse({ data: Array.from({ length: body.parts ?? 1 }, (_, index) => grantOf(first + index)) })
  },
  answerStorage = ({ part }) => fakeResponse({ headers: { etag: `"e${part}"` } }),
  ...settings
} = {}) => {
  const calls = []
  const sends = {}

  const client = new FilesClient({
    apiKey: 'client-key',
    baseUrl: API_URL,
    fetch: async (url, init) => {
      if (url.startsWith(STORAGE_URL)) {
        const part = Number(/part-(\d+)/.exec(url)?.[1])
        sends[part] = (sends[part] ?? 0) + 1
        const bytes = Buffer.from(init.body)
        calls.push({ bytes, kind: 'store', part })
        return answerStorage({ bytes, part, send: sends[part], signal: init.signal, url })
      }

      const body = JSON.parse(init.body)
      let kind = 'end'

      if (url.includes('/file_actions/begin_upload/')) {
        kind = body.ref === undefined ? 'begin' : 'grants'
      }

      calls.push({ body, kind })
      return answerApi({ body, kind, url })
    },
    maxNetworkRetries: 1,
    ...settings,
  })

  return { calls, client, sends }
}

describe('File uploads', () => {
  // Only the stand-in answers, and a request it does not expect fails at once instead of being retried.
  beforeEach(() => {
    nock.disableNetConnect()
    Files.setBaseUrl(API_URL)
    Files.setApiKey('api-key')
    Files.configureNetwork({ maxNetworkRetries: 0 })
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    Files.setApiKey(null)
    Files.configureNetwork({ maxNetworkRetries: 3, maxNetworkRetryDelay: 1.5, minNetworkRetryDelay: 0.1 })
  })

  // With an API key that belongs to a workspace, no workspace is configured, and the API can report a grant's path as
  // the site path of the workspace's file.
  it('begins an upload with its size, and ends it at the path it was started at with its size and ETags, not at the path its grant reports', async () => {
    const { apiRequests, events, stored } = serveTransfers({
      grant: () => ({ path: `_/Workspaces/311/${DESTINATION}` }),
      partsize: 1024,
    })

    const file = await File.uploadData(DESTINATION, DATA)

    expect(apiRequests).toEqual([
      {
        body: { size: DATA.length, with_direct_connection_info: true },
        key: 'api-key',
        kind: 'begin',
        path: DESTINATION,
      },
      {
        body: { action: 'end', etags: [{ etag: '"etag-1"', part: 1 }], ref: 'upload-ref', size: DATA.length },
        key: 'api-key',
        kind: 'end',
        path: DESTINATION,
      },
    ])

    expect(events).toEqual(['begin', 'store 1', 'end'])
    expect(stored[DESTINATION]).toEqual({ 1: DATA })
    expect(file).toBeInstanceOf(File)
    expect(file.getPath()).toBe(DESTINATION)
  })

  it('sends the workspace a call is made in with every API request of its upload, mkdir_parents to begin_upload and its completion, and no Files.com headers to storage', async () => {
    const filesHeaders = []
    const { apiRequests } = serveTransfers({
      answerStore: (store, answer) => {
        filesHeaders.push(store.filesHeaders)
        answer()
      },
      partsize: 1024,
    })

    await File.uploadData(DESTINATION, DATA, { mkdir_parents: true, provided_mtime: '2026-10-12T00:00:00Z' }, { workspaceId: 311 })

    expect(apiRequests.map(({ kind, workspace }) => `${kind} ${workspace}`)).toEqual(['begin 311', 'end 311'])
    expect(apiRequests[0].body).toEqual({ mkdir_parents: true, size: DATA.length, with_direct_connection_info: true })
    expect(apiRequests[1].body).toMatchObject({ action: 'end', mkdir_parents: true, provided_mtime: '2026-10-12T00:00:00Z' })
    expect(filesHeaders).toEqual([[]])
  })

  // One chunk can hold several whole parts. When it ends exactly where a part ends, that part is the upload's last.
  it('uploads a chunk that ends at the end of a part as exactly its parts, sending none of its bytes twice', async () => {
    const { apiRequests, sends, stored } = serveTransfers({ partsize: 8 })

    await File.uploadData(DESTINATION, [Buffer.from('part onepart two')])

    expect(stored[DESTINATION]).toEqual({ 1: 'part one', 2: 'part two' })
    expect(sends).toEqual({ [`${DESTINATION} 1`]: 1, [`${DESTINATION} 2`]: 1 })
    expect(apiRequests.map(({ body, kind }) => (kind === 'grants' ? `grants ${body.part}+${body.parts}` : kind)))
      .toEqual(['begin', 'grants 2+1', 'end'])

    expect(apiRequests[2].body).toMatchObject({ etags: [{ etag: '"etag-1"', part: 1 }, { etag: '"etag-2"', part: 2 }], size: 16 })
  })

  it('sends parts allowed in parallel at once, calls back in part order, and ends once every part is stored', async () => {
    const data = partsOf('p', 10)
    const held = []

    // No part is stored until all ten have been sent.
    const storage = serveTransfers({
      answerStore: (store, answer) => {
        held.push(answer)

        if (held.length === 10) {
          held.splice(0).reverse().forEach(release => release())
        }
      },
    })

    await File.uploadData(DESTINATION, [Buffer.from(data)], {}, {
      determinePartUploadUri: recordingCallback(storage.events),
      startup: 'aggressive',
    })

    expect(storage.events.filter(event => event.startsWith('callback'))).toEqual(
      Array.from({ length: 10 }, (_, index) => `callback ${index + 1}`),
    )

    expect(storage.counts.mostInFlight).toBe(10)
    expect(storage.events.slice(-1)).toEqual(['end'])
    expect(storedBytes(storage.stored[DESTINATION])).toBe(data)
  })

  it('sends one part at a time, in order, when its grants do not allow parts in parallel', async () => {
    const storage = serveTransfers({ parallel: false })

    await File.uploadData(DESTINATION, [Buffer.from(partsOf('s', 3))], {}, { determinePartUploadUri: recordingCallback(storage.events) })

    expect(storage.counts.mostInFlight).toBe(1)
    expect(storage.events.filter(event => event.startsWith('store') || event === 'end')).toEqual(['store 1', 'store 2', 'store 3', 'end'])
    expect(storage.events.filter(event => event.startsWith('callback'))).toEqual(['callback 1', 'callback 2', 'callback 3'])
  })

  // Every storage request waits until all six are under way, so that later parts have been called back for before part
  // 2 fails; nothing more is sent after it, and the upload settles without ending.
  it.each([
    ['its storage refuses it', { status: 403 }],
    ['its callback throws', { throws: true }],
  ])('sends nothing more, and never ends the upload, once part 2 fails because %s', async (_, failure) => {
    const held = []
    const storage = serveTransfers({
      answerStore: ({ part }, answer) => {
        held.push(() => answer(part === 2 && failure.status ? failure.status : 200))

        if (held.length === (failure.throws ? 1 : 6)) {
          held.splice(0).forEach(release => release())
        }
      },
    })

    const record = recordingCallback(storage.events)
    const determinePartUploadUri = fileUploadPart => {
      const uploadUri = record(fileUploadPart)

      if (failure.throws && fileUploadPart.parameters.part === 2) {
        throw new Error('choosing the part URL failed')
      }

      return uploadUri
    }

    const outcome = await outcomeOf(File.uploadData(DESTINATION, [Buffer.from(partsOf('f', 6))], {}, {
      determinePartUploadUri,
      startup: 'aggressive',
    }))

    expect(outcome.error).toBeInstanceOf(FilesError)
    expect(storage.events).not.toContain('end')

    // Part 1 is sent only if it was dispatched before part 2's callback failed.
    if (failure.throws) {
      expect(storage.events.filter(event => event.startsWith('callback'))).toEqual(['callback 1', 'callback 2'])
      expect(Object.keys(storage.sends).every(key => key === `${DESTINATION} 1`)).toBe(true)
    }
  })

  it('sends nothing more once its signal aborts while a part waits to be stored, and never ends the upload', async () => {
    const controller = new AbortController()
    const reason = new Error('no longer needed')

    // Part 1's storage is never answered: the signal aborts as it arrives, while part 2 waits for its turn.
    const storage = serveTransfers({
      answerStore: () => controller.abort(reason),
      parallel: false,
    })

    const outcome = await outcomeOf(File.uploadData(DESTINATION, [Buffer.from(partsOf('c', 3))], {}, { signal: controller.signal }))

    expect(outcome.error).toBe(reason)
    expect(Object.keys(storage.sends)).toEqual([`${DESTINATION} 1`])
    expect(storage.events).not.toContain('end')
  })

  it('sends nothing more once its callback aborts the signal, not even the part it was called for', async () => {
    const controller = new AbortController()
    const storage = serveTransfers({ parallel: false })
    const record = recordingCallback(storage.events)

    const determinePartUploadUri = fileUploadPart => {
      const uploadUri = record(fileUploadPart)
      controller.abort()
      return uploadUri
    }

    const outcome = await outcomeOf(File.uploadData(DESTINATION, [Buffer.from(partsOf('a', 3))], {}, {
      determinePartUploadUri,
      signal: controller.signal,
    }))

    expect(outcome.error?.name).toBe('AbortError')
    expect(storage.events.filter(event => !event.startsWith('grants'))).toEqual(['begin', 'callback 1'])
  })

  it('calls back for and sends no later part once choosing an earlier part\'s agent throws', async () => {
    const storage = serveTransfers()

    const getAgentForUrl = url => {
      if (url.startsWith(STORAGE_URL) && new URL(url).searchParams.get('part') === '1') {
        throw new Error('choosing the agent failed')
      }

      return undefined
    }

    const outcome = await outcomeOf(File.uploadData(DESTINATION, [Buffer.from(partsOf('g', 3))], {}, {
      determinePartUploadUri: recordingCallback(storage.events),
      getAgentForUrl,
      startup: 'aggressive',
    }))

    expect(outcome.error).toBeInstanceOf(FilesError)
    expect(storage.events.filter(event => event.startsWith('callback'))).toEqual(['callback 1'])
    expect(storage.sends).toEqual({})
    expect(storage.events).not.toContain('end')
  })

  it('has no more than 32 storage requests under way across uploads without a job, and completes each of them exactly', async () => {
    const data = { 'reports/a.csv': partsOf('a', 30), 'reports/b.csv': partsOf('b', 30) }
    const held = []
    let released = false

    // Each upload could send all 30 of its parts at once, 60 in all. Storage holds them until 32 are under way, then
    // answers them all, and later ones at once, so that more could only be under way together with those.
    const storage = serveTransfers({
      answerStore: (store, answer) => {
        if (released) {
          answer()
          return
        }

        held.push(answer)

        if (held.length === 32) {
          released = true
          held.splice(0).forEach(release => release())
        }
      },
    })

    await Promise.all(Object.entries(data).map(([uploadPath, bytes]) => File.uploadData(uploadPath, [Buffer.from(bytes)], {}, { startup: 'aggressive' })))

    expect(storage.counts.mostInFlight).toBe(32)
    expect(Object.keys(data).map(uploadPath => storedBytes(storage.stored[uploadPath]))).toEqual(Object.values(data))
    expect(storage.events.filter(event => event === 'end')).toHaveLength(2)
  })

  // Upload A has 32 parts under way, held by storage, when upload B starts: B's part waits for a request permit, and is
  // given the one A's part 1 frees before A's next part, which its controller admits only then.
  it('gives a waiting part of a later upload the next free request before the next part of the upload that had them all', async () => {
    const heldA = new Map()
    const arrivals = []
    let uploadB = null
    let released = false

    const releaseA = part => {
      const answer = heldA.get(part)
      heldA.delete(part)
      answer()
    }

    serveTransfers({
      answerGrants: (request, answer) => {
        answer()

        // Once B has begun, its part waits for a request permit, which A's part 1 then frees.
        if (request.path === 'reports/b.csv' && request.kind === 'begin') {
          setTimeout(() => releaseA(1), 100)
        }
      },
      answerStore: ({ part, path: uploadPath }, answer) => {
        arrivals.push(`${uploadPath} ${part}`)

        if (uploadPath === 'reports/b.csv' || released) {
          answer()
          return
        }

        heldA.set(part, answer)

        if (heldA.size === 32 && !uploadB) {
          uploadB = File.uploadData('reports/b.csv', [Buffer.from(partsOf('b', 1))])
        }

        if (part === 33) {
          released = true
          Array.from(heldA.keys()).forEach(releaseA)
        }
      },
    })

    await File.uploadData('reports/a.csv', [Buffer.from(partsOf('a', 40))], {}, { startup: 'aggressive' })
    await uploadB

    expect(arrivals.slice(0, 32).every(arrival => arrival.startsWith('reports/a.csv '))).toBe(true)
    expect(arrivals.indexOf('reports/b.csv 1')).toBeGreaterThan(-1)
    expect(arrivals.indexOf('reports/b.csv 1')).toBeLessThan(arrivals.indexOf('reports/a.csv 33'))
  })

  it('asks for a part\'s grant again, once, when its URL has expired, and fails unsent when the new one has expired too', async () => {
    const past = new Date(Date.now() - 60000).toISOString()
    const future = new Date(Date.now() + 3600000).toISOString()

    // reports/renewed.csv: its first URL has expired, but its second has not. reports/expired.csv: both have.
    const storage = serveTransfers({
      grant: ({ attempt, path: uploadPath }) => ({ expires: uploadPath === 'reports/renewed.csv' && attempt === 2 ? future : past }),
      partsize: 1024,
    })

    const callbacks = []
    const determinePartUploadUri = fileUploadPart => {
      callbacks.push(fileUploadPart.upload_uri)
      return fileUploadPart.upload_uri
    }

    const renewed = await outcomeOf(File.uploadData('reports/renewed.csv', DATA, {}, { determinePartUploadUri }))
    const expired = await outcomeOf(File.uploadData('reports/expired.csv', DATA, {}, { determinePartUploadUri }))

    expect(renewed.value).toBeInstanceOf(File)
    expect(expired.error).toBeInstanceOf(FilesError)
    expect(storage.grants).toEqual({ 'reports/expired.csv 1': 2, 'reports/renewed.csv 1': 2 })
    expect(callbacks).toEqual([`${STORAGE_URL}/part?path=reports%2Frenewed.csv&part=1&grant=2`])
    expect(storage.sends).toEqual({ 'reports/renewed.csv 1': 1 })
    expect(storage.events.filter(event => event === 'end')).toHaveLength(1)
  })

  // The caller changes its buffer as soon as uploadData() has been called, which the upload copied as it was called;
  // and the whole of its stream's chunk, once part 1 has taken the chunk, while part 1's first send is refused: the
  // chunk was copied whole as it was taken, its rest for parts 2 and 3, and part 1 is sent again as it was taken.
  it('stores the bytes the caller\'s data and stream chunks had when given, whatever the caller does with them afterwards, a part sent again included', async () => {
    Files.configureNetwork({ maxNetworkRetries: 1 })
    const original = partsOf('m', 3)
    const data = Buffer.from(original)
    const chunk = Buffer.from(original)

    const storage = serveTransfers({
      answerStore: ({ part, path: uploadPath, send }, answer) => {
        if (part === 1 && send === 1 && uploadPath === 'reports/stream.csv') {
          chunk.fill('x')
          answer(503)
          return
        }

        answer()
      },
    })

    const fromData = File.uploadData('reports/data.csv', data)
    data.fill('y')
    await fromData

    await File.uploadStream('reports/stream.csv', Readable.from([chunk]))

    expect(storedBytes(storage.stored['reports/data.csv'])).toBe(original)
    expect(storedBytes(storage.stored['reports/stream.csv'])).toBe(original)
    expect(storage.sends['reports/stream.csv 1']).toBe(2)
  })

  it('sends each part with the method and headers its grant gives, never the API\'s credentials, workspace, response headers or the call\'s headers', async () => {
    const stored = []

    nock(API_URL)
      .persist()
      .post(uri => uri.startsWith(BEGIN_PATH))
      .reply(() => [200, [{
        headers: { 'Content-Length': `${Buffer.byteLength(DATA)}`, 'Content-Type': 'text/csv', 'X-Amz-Meta-Origin': 'negotiated' },
        http_method: 'post',
        partsize: 1024,
        ref: 'upload-ref',
        upload_uri: `${STORAGE_URL}/form-part?X-Amz-Signature=signed`,
      }], { 'X-Response-Only': 'negotiation-response-header' }])
      .post(uri => uri.startsWith(FILES_PATH))
      .reply(() => [201, { path: DESTINATION, type: 'file' }])

    nock(STORAGE_URL)
      .post('/form-part')
      .query(true)
      .reply(function storePart(uri, body) {
        stored.push({ body, headers: this.req.headers })
        return [204]
      })

    const file = await File.uploadData(DESTINATION, DATA, {}, { headers: { 'X-Call': 'upload' }, workspaceId: 311 })
    const [{ body, headers }] = stored

    expect(file).toBeInstanceOf(File)
    expect(body).toBe(DATA)
    expect(['content-type', 'x-amz-meta-origin', 'content-length'].map(name => headerValue(headers[name])))
      .toEqual(['text/csv', 'negotiated', `${Buffer.byteLength(DATA)}`])

    expect(Object.keys(headers).filter(name => /^x-(files|call|response)/.test(name))).toEqual([])
  })

  it('sends a part again after a transient storage failure only when its grant allows parallel parts and retrying them', async () => {
    Files.configureNetwork({ maxNetworkRetries: 1 })

    const answers = {
      'reports/no-retry.csv': { parallel_parts: true, retry_parts: false },
      'reports/parallel.csv': { parallel_parts: true },
      'reports/serial.csv': { parallel_parts: false },
    }

    const storage = serveTransfers({
      answerStore: ({ send }, answer) => answer(send === 1 ? 500 : 200),
      grant: ({ path: uploadPath }) => answers[uploadPath],
      partsize: 1024,
    })

    const uploadPaths = Object.keys(answers)
    const outcomes = await Promise.all(uploadPaths.map(uploadPath => outcomeOf(File.uploadData(uploadPath, DATA))))

    expect(outcomes.map(({ value }) => value instanceof File)).toEqual([false, true, false])
    expect(uploadPaths.map(uploadPath => storage.sends[`${uploadPath} 1`])).toEqual([1, 2, 1])
  })

  // An upload of unknown size sends its parts one at a time, but a part its grant allows retrying is still sent again,
  // alone, with its own bytes; the string chunks count as their UTF-8 bytes, wherever a part's size divides them.
  it('sends a part of an upload of unknown size again, alone, as its grant allows, the parts being the UTF-8 bytes of its chunks', async () => {
    const chunks = ['aé', 'b€', 'zz']
    const expected = Buffer.from(chunks.join(''))
    const { calls, client, sends } = standInClient({
      answerStorage: ({ part, send }) => fakeResponse(part === 2 && send === 1
        ? { status: 503 }
        : { headers: { etag: `"e${part}"` } }),
    })

    const file = await client.files.uploadStream(DESTINATION, Readable.from(chunks))
    const stores = calls.filter(({ kind }) => kind === 'store')
    const end = calls.find(({ kind }) => kind === 'end')

    expect(file).toBeInstanceOf(File)
    expect(sends).toEqual({ 1: 1, 2: 2, 3: 1 })
    expect(stores.map(({ part }) => part)).toEqual([1, 2, 2, 3])
    expect(Buffer.concat([1, 2, 3].map(part => stores.find(store => store.part === part).bytes)).equals(expected)).toBe(true)
    expect(stores.filter(({ part }) => part === 2).every(({ bytes }) => bytes.equals(stores[1].bytes))).toBe(true)
    expect(calls[0].body).toEqual({ with_direct_connection_info: true })
    expect(end.body).toMatchObject({ etags: [1, 2, 3].map(part => ({ etag: `"e${part}"`, part })), size: expected.length })
  })

  it('asks for a part\'s grant again when its URL expires while it waits to be sent again, calls back for it again and sends the same bytes there', async () => {
    Files.configureNetwork({ maxNetworkRetries: 1 })

    const callbacks = []
    const storage = serveTransfers({
      answerStore: ({ send }, answer) => (send === 1 ? answer(503, { 'Retry-After': '1' }) : answer()),
      grant: ({ attempt }) => ({ expires: new Date(Date.now() + (attempt === 1 ? 600 : 3600000)).toISOString() }),
      partsize: 1024,
    })

    const determinePartUploadUri = fileUploadPart => {
      callbacks.push(new URL(fileUploadPart.upload_uri).searchParams.get('grant'))
      return fileUploadPart.upload_uri
    }

    const file = await File.uploadData(DESTINATION, DATA, {}, { determinePartUploadUri })

    expect(file).toBeInstanceOf(File)
    expect(storage.grants).toEqual({ [`${DESTINATION} 1`]: 2 })
    expect(callbacks).toEqual(['1', '2'])
    expect(storage.stored[DESTINATION]).toEqual({ 1: DATA })
    expect(storage.sends).toEqual({ [`${DESTINATION} 1`]: 2 })
  })

  it('never sends a part again once its renewed grant forbids retrying parts, yet sends a renewed part never sent before', async () => {
    Files.configureNetwork({ maxNetworkRetries: 1 })

    // Signed two hours ago, valid for one: a URL already expired by its own signature.
    const signedAt = new Date(Date.now() - 7200000).toISOString().replace(/[-:]|\.\d{3}/g, '')

    // reports/withdrawn.csv: the part's first URL expires before its Retry-After is over, and its renewal forbids
    // retrying parts. reports/unsent.csv: the part's first URL has expired by its signature before it is ever sent, and
    // its renewal forbids retrying parts too, which a first send is not.
    const storage = serveTransfers({
      answerStore: ({ grant }, answer) => (grant === 1 ? answer(503, { 'Retry-After': '1' }) : answer()),
      grant: ({ attempt, part, path: uploadPath }) => {
        if (attempt > 1) {
          return { expires: new Date(Date.now() + 3600000).toISOString(), retry_parts: false }
        }

        return uploadPath === 'reports/withdrawn.csv'
          ? { expires: new Date(Date.now() + 600).toISOString() }
          : { upload_uri: `${STORAGE_URL}/part?path=reports%2Funsent.csv&part=${part}&X-Amz-Date=${signedAt}&X-Amz-Expires=3600&X-Amz-Signature=signed` }
      },
      partsize: 1024,
    })

    const withdrawn = await outcomeOf(File.uploadData('reports/withdrawn.csv', DATA))
    const unsent = await outcomeOf(File.uploadData('reports/unsent.csv', DATA))

    expect(withdrawn.error).toBeInstanceOf(FilesError)
    expect(unsent.value).toBeInstanceOf(File)
    expect(storage.grants).toEqual({ 'reports/unsent.csv 1': 2, 'reports/withdrawn.csv 1': 2 })
    expect(storage.sends).toEqual({ 'reports/unsent.csv 1': 1, 'reports/withdrawn.csv 1': 1 })
    expect(storage.events.filter(event => event === 'end')).toHaveLength(1)
  })

  // Part 1's PUT is answered with a redirect to a URL that has expired by its own signature: that URL is never sent to,
  // but the PUT was, and may have been carried out, so the part is not unsent. Without retry_parts, nothing is sent again
  // and no grant renewed, and the upload fails with the expiry itself; with it, the part is sent again, as a retry, to
  // a renewed grant.
  it.each([
    ['forbids', false, ['begin', 'store']],
    ['allows', true, ['begin', 'store', 'grants', 'store', 'end']],
  ])('never follows a redirect to an expired URL, and sends the part it redirected again only as a retry its grant %s', async (_, retryParts, kinds) => {
    const expiredUrl = 'https://expired.example.test/part?X-Amz-Date=20000101T000000Z&X-Amz-Expires=1&X-Amz-Signature=signed'
    const { calls, client } = standInClient({
      answerApi: ({ body, kind }) => (kind === 'end'
        ? fakeResponse({ data: { path: DESTINATION, size: body.size, type: 'file' }, status: 201 })
        : fakeResponse({ data: [grantOf(body.part ?? 1, { partsize: 1024, retry_parts: retryParts })] })),
      answerStorage: ({ send }) => fakeResponse(send === 1
        ? { headers: { location: expiredUrl }, status: 307 }
        : { headers: { etag: '"e1"' } }),
    })

    const outcome = await outcomeOf(client.files.uploadData(DESTINATION, DATA))

    expect(calls.map(({ kind }) => kind)).toEqual(kinds)
    expect(Api._isExpiredUrlError(outcome.error)).toBe(!retryParts)
    expect(outcome.value instanceof File).toBe(retryParts)
  })

  // Part 1's request is under way, never answered, with no request timeout, when storage refuses part 2: the upload
  // stops part 1's request, as the signal its HTTP client was given shows, and fails with part 2's refusal once that
  // request has settled, without completing. Its job, which admits one file at a time, then admits the next upload.
  it('stops its other parts under way once one of its parts fails, failing with that part\'s failure, and leaves its job free', async () => {
    const job = new Files.TransferJob({ maxConcurrentFiles: 1 })
    const stopped = []
    let firstParts = 0
    const { calls, client } = standInClient({
      answerApi: ({ body, kind }) => {
        if (kind === 'end') {
          return fakeResponse({ data: { path: DESTINATION, size: body.size, type: 'file' }, status: 201 })
        }

        const first = body.part ?? 1
        return fakeResponse({ data: Array.from({ length: body.parts ?? 1 }, (_, index) => grantOf(first + index, { headers: { 'Content-Length': '3' } })) })
      },
      // The failing upload's part 1 is held; the next upload's part 1 is stored.
      answerStorage: ({ part, signal }) => {
        if (part === 2) {
          return fakeResponse({ status: 403 })
        }

        firstParts += 1

        if (firstParts > 1) {
          return fakeResponse({ headers: { etag: '"e1"' } })
        }

        return new Promise((resolve, reject) => {
          signal.addEventListener('abort', () => {
            stopped.push(part)
            reject(Object.assign(new Error('The operation was aborted'), { name: 'AbortError' }))
          })
        })
      },
    })

    const outcome = await outcomeOf(client.files.uploadData(DESTINATION, Buffer.from('aaabbb'), {}, { concurrency: 2, job, timeoutSecs: 0 }))
    const kinds = calls.map(({ kind }) => kind)
    const next = await outcomeOf(client.files.uploadData('reports/next.csv', 'ccc', {}, { job, timeoutSecs: 0 }))

    expect(outcome.error).toBeInstanceOf(FilesError)
    expect(outcome.error.message).toMatch(/part 2 with HTTP status 403/)
    expect(stopped).toEqual([1])
    expect(kinds.filter(kind => kind !== 'grants')).toEqual(['begin', 'store', 'store'])
    expect(next.value).toBeInstanceOf(File)
    expect(job._scope().buffers.held).toBe(0)
  })

  it('sends the end of an upload again only when it never reached the API, and not after a failure that leaves its outcome unknown', async () => {
    Files.configureNetwork({ maxNetworkRetries: 2, maxNetworkRetryDelay: 0.001, minNetworkRetryDelay: 0.001 })

    const refused = () => Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' })
    const ends = {}
    let movedRequests = 0
    let limitedAfterRedirect = 0

    nock(API_URL)
      .persist()
      .post(uri => uri.startsWith(BEGIN_PATH))
      .reply(uri => [200, [{
        partsize: 1024,
        ref: 'upload-ref',
        upload_uri: `${STORAGE_URL}/part-1?path=${encodeURIComponent(uri)}&X-Amz-Signature=signed`,
      }]])

    nock(STORAGE_URL)
      .persist()
      .put(/^\/part-/)
      .query(true)
      .reply(200)

    // Each upload's end: refused before reaching the API, then completed; rate limited, then completed; answered with a
    // server error; answered with a redirect whose target then refuses the connection; or answered with a 303 whose
    // target is rate limited, which a retry would answer by completing the upload again.
    nock(API_URL)
      .persist()
      .post(uri => uri.startsWith(FILES_PATH))
      .reply((uri, body, callback) => {
        const uploadPath = decodeURIComponent(uri.replace(FILES_PATH, ''))
        ends[uploadPath] = (ends[uploadPath] ?? 0) + 1
        const first = ends[uploadPath] === 1

        if (uploadPath === 'reports/refused.csv' && first) {
          callback(refused())
        } else if (uploadPath === 'reports/limited.csv' && first) {
          callback(null, [429, { 'http-code': 429, title: 'Too Many Requests', type: 'too-many-requests' }])
        } else if (uploadPath === 'reports/failed.csv') {
          callback(null, [500, { 'http-code': 500, title: 'Internal Server Error', type: 'internal-server-error' }])
        } else if (uploadPath === 'reports/redirected.csv') {
          callback(null, [302, '', { Location: 'https://moved.example.test/end' }])
        } else if (uploadPath === 'reports/redirected-limited.csv' && first) {
          callback(null, [303, '', { Location: 'https://moved.example.test/limited' }])
        } else {
          callback(null, [201, { path: uploadPath, type: 'file' }])
        }
      })

    nock('https://moved.example.test')
      .persist()
      .get('/end')
      .reply((uri, body, callback) => {
        movedRequests += 1
        callback(refused())
      })
      .get('/limited')
      .reply(() => {
        limitedAfterRedirect += 1
        return [429, { 'http-code': 429, title: 'Too Many Requests', type: 'too-many-requests' }]
      })

    const uploadPaths = [
      'reports/refused.csv',
      'reports/limited.csv',
      'reports/failed.csv',
      'reports/redirected.csv',
      'reports/redirected-limited.csv',
    ]

    const outcomes = []

    for (const uploadPath of uploadPaths) {
      // eslint-disable-next-line no-await-in-loop
      outcomes.push(await outcomeOf(File.uploadData(uploadPath, DATA)))
    }

    expect(outcomes.map(({ value }) => value instanceof File)).toEqual([true, true, false, false, false])
    expect(outcomes.slice(2).every(({ error }) => error instanceof FilesError && error.completionUnknown === true)).toBe(true)
    expect(uploadPaths.map(uploadPath => ends[uploadPath])).toEqual([2, 2, 1, 1, 1])
    expect([movedRequests, limitedAfterRedirect]).toEqual([1, 1])
  })

  it.each([['null', null], ['NaN', NaN]])('stops the part being sent when its signal aborts, and rejects with the signal\'s reason itself, even %s', async (_, reason) => {
    const controller = new AbortController()
    let arrive
    const arrived = new Promise(resolve => { arrive = resolve })

    // The part's request is never answered: only its signal can end it.
    const storage = serveTransfers({ answerStore: () => arrive(), partsize: 1024 })

    const outcome = outcomeOf(File.uploadData(DESTINATION, DATA, {}, { signal: controller.signal }))
    await arrived
    controller.abort(reason)

    const settled = await outcome
    expect(Object.keys(settled)).toEqual(['error'])
    expect(Object.is(settled.error, controller.signal.reason)).toBe(true)
    expect(storage.events).not.toContain('end')
  })

  describe('with a part\'s response body still arriving', () => {
    // A response storage gives a part: 200, with a body that ends 100 ms later ('delayed'), or never ('held'), as a
    // Node.js stream or a WHATWG one. state records what becomes of the body.
    const storedResponse = (kind, ending, state) => {
      let body

      if (kind === 'node') {
        body = new Readable({ read() {} })

        if (ending === 'delayed') {
          setTimeout(() => {
            body.push('acknowledged')
            body.push(null)
          }, 100)
        }
      } else {
        body = new ReadableStream({
          cancel: () => { state.cancelled = true },
          start: controller => {
            if (ending === 'delayed') {
              setTimeout(() => {
                controller.enqueue(new TextEncoder().encode('acknowledged'))
                controller.close()
                state.closed = true
              }, 100)
            }
          },
        })
      }

      Object.assign(state, { body })
      return fakeResponse({ body })
    }

    // What the body has come to, by the time the upload ends.
    const settledState = (kind, state) => (kind === 'node'
      ? { destroyed: state.body.destroyed, ended: state.body.readableEnded }
      : { cancelled: Boolean(state.cancelled), closed: Boolean(state.closed) })

    it.each([
      ['node', 'delayed', { destroyed: true, ended: true }],
      ['whatwg', 'delayed', { cancelled: false, closed: true }],
      ['node', 'held', { destroyed: true, ended: false }],
      ['whatwg', 'held', { cancelled: true, closed: false }],
    ])('lets the part go, and ends the upload, only once a %s body %s has been read to its end or stopped by its budget, sending the part once', async (kind, ending, atEnd) => {
      const state = {}
      const events = []

      const { client } = standInClient({
        answerApi: ({ body, kind: request }) => {
          if (request === 'end') {
            events.push({ end: settledState(kind, state) })
            return fakeResponse({ data: { path: DESTINATION, type: 'file' }, status: 201 })
          }

          return fakeResponse({ data: [grantOf(1, { partsize: 1024 })] })
        },
        answerStorage: () => {
          events.push('stored')
          return storedResponse(kind, ending, state)
        },
        networkTimeout: 0.3,
      })

      const file = await client.files.uploadData(DESTINATION, DATA)

      expect(file).toBeInstanceOf(File)
      expect(events).toEqual(['stored', { end: atEnd }])
    })

    it.each([
      ['node', { destroyed: true, ended: false }],
      ['whatwg', { cancelled: true, closed: false }],
    ])('rejects with the signal\'s own reason, and never ends the upload, when its signal aborts while storage\'s accepted answer to a part has a %s body still held, which it stops', async (kind, atStop) => {
      const state = {}
      const controller = new AbortController()
      const reason = { cause: 'no longer uploading' }

      const { calls, client } = standInClient({
        answerApi: ({ kind: request }) => (request === 'end'
          ? fakeResponse({ data: { path: DESTINATION, type: 'file' }, status: 201 })
          : fakeResponse({ data: [grantOf(1, { partsize: 1024 })] })),
        answerStorage: () => {
          setTimeout(() => controller.abort(reason), 50)
          return storedResponse(kind, 'held', state)
        },
        networkTimeout: 30,
      })

      const settled = await outcomeOf(client.files.uploadData(DESTINATION, DATA, {}, { signal: controller.signal }))

      expect(Object.keys(settled)).toEqual(['error'])
      expect(settled.error).toBe(reason)
      expect(calls.map(({ kind: request }) => request)).toEqual(['begin', 'store'])
      expect(settledState(kind, state)).toEqual(atStop)
    })

    // Storage's accepted answer stands whatever its body is: the part is never parsed or sent again for it.
    it('completes the upload, sending the part once, when storage\'s accepted answer to a part has a JSON body that cannot be read', async () => {
      const { calls, client } = standInClient({
        answerApi: ({ kind: request }) => (request === 'end'
          ? fakeResponse({ data: { path: DESTINATION, type: 'file' }, status: 201 })
          : fakeResponse({ data: [grantOf(1, { partsize: 1024 })] })),
        answerStorage: () => ({
          ...fakeResponse({ headers: { 'content-type': 'application/json', etag: '"e1"' } }),
          json: async () => { throw new SyntaxError('Unexpected end of JSON input') },
        }),
      })

      const file = await client.files.uploadData(DESTINATION, DATA)

      expect(file).toBeInstanceOf(File)
      expect(calls.map(({ kind }) => kind)).toEqual(['begin', 'store', 'end'])
    })
  })

  it('sends an upload\'s begin_upload, parts and completion through its client\'s fetch, the parts without the client\'s credentials', async () => {
    const sent = []
    const client = new FilesClient({
      apiKey: 'client-key',
      baseUrl: API_URL,
      fetch: (url, init) => {
        sent.push(`${init.method} ${url.split('?')[0]} ${init.headers['X-FilesAPI-Key'] ?? 'no key'}`)
        return crossFetch(url, init)
      },
      maxNetworkRetries: 0,
    })

    const { stored } = serveTransfers({ partsize: 1024 })
    const file = await client.files.uploadData(DESTINATION, DATA)

    expect(file).toBeInstanceOf(File)
    expect(stored[DESTINATION]).toEqual({ 1: DATA })
    expect(sent).toEqual([
      `POST ${API_URL}${BEGIN_PATH}${encodeURIComponent(DESTINATION)} client-key`,
      `PUT ${STORAGE_URL}/part no key`,
      `POST ${API_URL}${FILES_PATH}${encodeURIComponent(DESTINATION)} client-key`,
    ])
  })

  it('stops a part that has had no response within its client\'s networkTimeout, failing the upload', async () => {
    const client = new FilesClient({ apiKey: 'client-key', baseUrl: API_URL, maxNetworkRetries: 0, networkTimeout: 0.2 })

    nock(API_URL)
      .persist()
      .post(uri => uri.startsWith(BEGIN_PATH))
      .reply(() => [200, [{ partsize: 1024, ref: 'upload-ref', upload_uri: `${STORAGE_URL}/slow-part-1?X-Amz-Signature=signed` }]])

    nock(STORAGE_URL)
      .put(/^\/slow-part-/)
      .query(true)
      .delay(2000)
      .reply(200)

    const error = await client.files.uploadData(DESTINATION, DATA).catch(caught => caught)

    expect(error).toBeInstanceOf(FilesError)
    expect(error.message).toBe('Request timed out')
  })

  describe('negotiation', () => {
    // An upload of unknown size whose source ends exactly where a part ends finds its end before asking for a grant it
    // would not use; a batch asked for ahead, which the API refuses beyond the upload's parts, fails nothing.
    it('finds the end of a source of unknown size without needing a grant for a part past it, a refused batch asked for ahead failing nothing', async () => {
      const storage = serveTransfers({
        answerGrants: (request, answer) => (request.kind === 'grants' && request.first + request.count - 1 > 2
          ? answer({}, 400)
          : answer()),
      })

      const file = await File.uploadStream(DESTINATION, Readable.from([Buffer.from(partsOf('e', 2))]))
      const end = storage.apiRequests.find(({ kind }) => kind === 'end')

      expect(file).toBeInstanceOf(File)
      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('e', 2))
      expect(end.body).toMatchObject({ size: 8 })
      expect(storage.apiRequests.filter(({ kind }) => kind === 'grants').map(({ body }) => body.part)).toEqual([2, 2])
    })

    it('asks for no further grant for an upload of one part, whole or sized by the API', async () => {
      const whole = serveTransfers({
        grant: ({ path: uploadPath }) => (uploadPath === 'reports/whole.csv' ? { send: { file: 'body' } } : {}),
        partsize: 1024,
      })
      await File.uploadData('reports/whole.csv', DATA)
      await File.uploadData('reports/sized.csv', DATA)

      expect(whole.apiRequests.map(({ kind, path: uploadPath }) => `${kind} ${uploadPath}`)).toEqual([
        'begin reports/whole.csv', 'end reports/whole.csv', 'begin reports/sized.csv', 'end reports/sized.csv',
      ])
    })

    // The API never answers the batch of grants asked for ahead of an upload of unknown size: the upload, once its
    // source has ended, stops that request and settles, rather than waiting for it or leaving it under way.
    it('stops a request for grants asked for ahead once the upload no longer needs them, and settles', async () => {
      let pending = 0
      const storage = serveTransfers({
        answerGrants: (request, answer) => {
          if (request.kind === 'begin') {
            answer()
          } else {
            pending += 1
          }
        },
        partsize: 1024,
      })

      const file = await File.uploadStream(DESTINATION, Readable.from([DATA]))

      expect(file).toBeInstanceOf(File)
      expect(pending).toBe(1)
      expect(storage.events).toContain('grants 2-5')
      expect(storage.events.filter(event => event !== 'grants 2-5')).toEqual(['begin', 'store 1', 'end'])
    })

    it('refuses a grant that declares another path before sending anything, at first or when renewed, and keeps a renamed or absent path', async () => {
      const past = new Date(Date.now() - 60000).toISOString()
      const storage = serveTransfers({
        grant: ({ attempt, path: uploadPath }) => ({
          'reports/elsewhere.csv': { path: 'other/file.csv' },
          'reports/renamed.csv': { path: 'reports/renamed (1).csv' },
          'reports/renewed.csv': attempt === 1 ? { expires: past, path: 'reports/renewed.csv' } : { path: 'other/renewed.csv' },
          'reports/unrenamed.csv': { path: 'reports/unrenamed (1).csv' },
        }[uploadPath] ?? {}),
        partsize: 1024,
      })

      const outcomes = {
        absent: await outcomeOf(File.uploadData('reports/absent.csv', DATA)),
        elsewhere: await outcomeOf(File.uploadData('reports/elsewhere.csv', DATA)),
        renamed: await outcomeOf(File.uploadData('reports/renamed.csv', DATA, { with_rename: true })),
        renewed: await outcomeOf(File.uploadData('reports/renewed.csv', DATA)),
        unrenamed: await outcomeOf(File.uploadData('reports/unrenamed.csv', DATA)),
      }

      expect(Object.fromEntries(Object.entries(outcomes).map(([name, { value }]) => [name, value instanceof File]))).toEqual({
        absent: true,
        elsewhere: false,
        renamed: true,
        renewed: false,
        unrenamed: false,
      })

      expect(Object.keys(storage.sends).sort()).toEqual(['reports/absent.csv 1', 'reports/renamed.csv 1'])
      expect(outcomes.elsewhere.error.message).toMatch(/other\/file\.csv/)
    })

    // Part 1 is held by storage when the grants of the rest arrive, no longer allowing parts in parallel: none of them
    // is sent until part 1 has been, and then one at a time.
    it('sends the rest of an upload one part at a time once a later grant no longer allows parallel parts', async () => {
      let releasePart1 = null
      const storage = serveTransfers({
        answerStore: ({ part }, answer) => {
          if (part === 1) {
            releasePart1 = answer
          } else {
            answer()
          }
        },
        grant: ({ part }) => ({ parallel_parts: part === 1 }),
      })

      const upload = File.uploadData(DESTINATION, [Buffer.from(partsOf('w', 5))], {}, { startup: 'aggressive' })
      await waitFor(() => releasePart1 !== null && storage.events.some(event => event.startsWith('grants')))
      await new Promise(resolve => { setTimeout(resolve, 50) })

      expect(Object.keys(storage.sends)).toEqual([`${DESTINATION} 1`])

      releasePart1()
      await upload

      expect(storage.counts.mostInFlight).toBe(1)
      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('w', 5))
    })

    // Part 1 is on the wire, under a grant that allows parallel parts and retrying, when the later grants arrive
    // withdrawing parallel parts; then its first send is refused with a 503. Part 2 waits for part 1's retry.
    it('sends an earlier part again before any later one once a later grant has made the upload go one part at a time', async () => {
      Files.configureNetwork({ maxNetworkRetries: 1 })
      const arrivals = []
      let refusePart1 = null
      const storage = serveTransfers({
        answerStore: ({ part, send }, answer) => {
          arrivals.push(`${part}/${send}`)

          if (part === 1 && send === 1) {
            refusePart1 = () => answer(503)
          } else {
            answer()
          }
        },
        grant: ({ part }) => ({ parallel_parts: part === 1 }),
      })

      const upload = File.uploadData(DESTINATION, [Buffer.from(partsOf('v', 4))], {}, { startup: 'aggressive' })
      await waitFor(() => refusePart1 !== null && storage.events.some(event => event.startsWith('grants')))
      refusePart1()
      await upload

      expect(arrivals).toEqual(['1/1', '1/2', '2/1', '3/1', '4/1'])
      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('v', 4))
    })

    // Asked for parts 2 and 3, the API gives only part 3's grant, every time: the upload fails rather than asking again
    // forever, and sends nothing for part 2.
    it('fails, without sending the part or completing, when the grants a part needs never include its own', async () => {
      const storage = serveTransfers({
        answerGrants: (request, answer) => (request.kind === 'grants'
          ? answer({}, 200, [request.first + 1])
          : answer()),
      })

      const outcome = await outcomeOf(File.uploadData(DESTINATION, [Buffer.from(partsOf('n', 3))]))

      expect(outcome.error).toBeInstanceOf(FilesError)
      expect(outcome.error.message).toMatch(/part 2/)
      expect(Object.keys(storage.sends)).toEqual([`${DESTINATION} 1`])
      expect(storage.apiRequests.filter(({ kind }) => kind === 'grants').length).toBeLessThanOrEqual(2)
      expect(storage.events).not.toContain('end')
    })

    it.each([
      ['a site path in another workspace', { workspaceId: 73 }, '_/Workspaces/99/reports/daily.csv', false],
      ['a site path in another workspace, with with_rename', { workspaceId: 73 }, '_/Workspaces/99/reports/daily (1).csv', false],
      ['the site path of the same file in its own workspace', { workspaceId: 73 }, '_/Workspaces/73/reports/daily.csv', true],
      ['the path within its own workspace', { workspaceId: 73 }, 'reports/daily.csv', true],
      ['a renamed file in the same folder of its own workspace, with with_rename', { workspaceId: 73 }, '_/Workspaces/73/reports/daily (1).csv', true],
      ['the site path of the workspace its API key acts in, when it names none', {}, '_/Workspaces/311/reports/daily.csv', true],
    ])('%s: kept or refused before anything is sent', async (_, options, grantPath, kept) => {
      const storage = serveTransfers({ grant: () => ({ path: grantPath }), partsize: 1024 })
      const params = grantPath.includes('(1)') ? { with_rename: true } : {}

      const outcome = await outcomeOf(File.uploadData(DESTINATION, DATA, params, options))

      expect(outcome.value instanceof File).toBe(kept)
      expect(Object.keys(storage.sends)).toEqual(kept ? [`${DESTINATION} 1`] : [])
    })

    // A later grant of an upload in a workspace the API key names may give the path within it, or the same site path,
    // but not a site path in another workspace.
    it('holds every grant of an upload to the workspace its first declared path names', async () => {
      const storage = serveTransfers({
        grant: ({ part, path: uploadPath }) => {
          if (part === 2) {
            return { path: uploadPath === 'reports/a.csv' ? 'reports/a.csv' : `_/Workspaces/312/${uploadPath}` }
          }

          return { path: `_/Workspaces/311/${uploadPath}` }
        },
      })

      const same = await outcomeOf(File.uploadData('reports/a.csv', [Buffer.from(partsOf('h', 3))]))
      const crossed = await outcomeOf(File.uploadData('reports/b.csv', [Buffer.from(partsOf('h', 3))], {}, { workspaceId: 311 }))

      expect(same.value).toBeInstanceOf(File)
      expect(crossed.error).toBeInstanceOf(FilesError)
      expect(Object.keys(storage.sends).filter(key => key.startsWith('reports/b.csv') && !key.endsWith(' 1'))).toEqual([])
    })

    // The reader waits for the stream's next chunk to find whether it has ended when the upload is paused; the chunk
    // that then arrives is not taken until the upload resumes.
    it('takes nothing from its stream while paused, a look ahead for its end included', async () => {
      const control = new Files.TransferControl()
      const stream = new Readable({ read() {} })
      stream.push(Buffer.from(partsOf('l', 1)))
      let firstStored = false
      const storage = serveTransfers({
        answerStore: (store, answer) => {
          firstStored = true
          answer()
        },
      })

      const upload = File.uploadStream(DESTINATION, stream, {}, { control })
      await waitFor(() => firstStored)
      await new Promise(resolve => { setTimeout(resolve, 20) })

      control.pause()
      stream.push(Buffer.from('l002'))
      await new Promise(resolve => { setTimeout(resolve, 100) })

      expect(stream.readableLength).toBe(4)
      expect(Object.keys(storage.sends)).toEqual([`${DESTINATION} 1`])

      control.resume()
      stream.push(null)
      await upload

      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('l', 2))
    })
  })

  describe('form grants', () => {
    it('sends a part as the last field of a form after the grant\'s fixed fields, its size and type where the grant places them', async () => {
      const { calls, client } = standInClient({
        answerApi: ({ body, kind }) => (kind === 'end'
          ? fakeResponse({ data: { path: DESTINATION, size: body.size, type: 'file' }, status: 201 })
          : fakeResponse({
            data: [grantOf(1, {
              http_method: 'POST',
              parameters: { key: 'uploads/abc', policy: 'signed-policy' },
              partsize: 1024,
              send: { 'Content-Type': 'required-parameter Content-Type', partdata: 'required-parameter file', partsize: 'required-parameter content-length-range' },
            })],
          })),
      })

      await client.files.uploadData(DESTINATION, DATA)
      const text = calls.find(({ kind }) => kind === 'store').bytes.toString()
      // Each field's name parameter, as its Content-Disposition gives it, not the file field's filename parameter.
      const fields = [...text.matchAll(/Content-Disposition: form-data; name="([^"]+)"/g)].map(([, name]) => name)

      expect(fields).toEqual(['key', 'policy', 'content-length-range', 'Content-Type', 'file'])
      expect(text).toContain(`\r\n\r\n${DATA}\r\n--`)
      expect(text).toContain('name="policy"\r\n\r\nsigned-policy\r\n')
      expect(text).toContain(`name="content-length-range"\r\n\r\n${DATA.length}\r\n`)
    })

    it('keeps the boundary a grant\'s own multipart Content-Type gives, and its exact header', async () => {
      const { calls, client } = standInClient({
        answerApi: ({ body, kind }) => (kind === 'end'
          ? fakeResponse({ data: { path: DESTINATION, size: body.size, type: 'file' }, status: 201 })
          : fakeResponse({
            data: [grantOf(1, {
              headers: { 'Content-Type': 'multipart/form-data; boundary=given-boundary' },
              http_method: 'POST',
              parameters: { key: 'uploads/abc' },
              partsize: 1024,
            })],
          })),
      })

      await client.files.uploadData(DESTINATION, DATA)
      const text = calls.find(({ kind }) => kind === 'store').bytes.toString()

      expect(text.startsWith('--given-boundary\r\n')).toBe(true)
      expect(text.endsWith('\r\n--given-boundary--\r\n')).toBe(true)
      expect(text).toContain(`\r\n\r\n${DATA}\r\n--given-boundary--`)
    })

    it.each([
      ['a bare multipart Content-Type, without the boundary its form needs', { headers: { 'Content-Type': 'multipart/form-data' }, parameters: { key: 'k' } }],
      ['a form Content-Type other than multipart/form-data', { headers: { 'Content-Type': 'text/plain' }, parameters: { key: 'k' } }],
      ['a fixed field holding the file\'s data', { parameters: { file: 'fixed' } }],
      ['a fixed size that is not the part\'s', { parameters: { size: '1' }, send: { partsize: 'required-parameter size' } }],
      ['a Content-Length for a form that its envelope makes longer', { headers: { 'Content-Length': `${DATA.length}` }, parameters: { key: 'k' } }],
      ['a raw body whose fixed length is not the part\'s', { headers: { 'Content-Length': '1' } }],
    ])('refuses a grant with %s before sending the part', async (_, fields) => {
      const { calls, client } = standInClient({
        answerApi: () => fakeResponse({ data: [grantOf(1, { partsize: 1024, ...fields })] }),
      })

      const outcome = await outcomeOf(client.files.uploadData(DESTINATION, DATA))

      expect(outcome.error).toBeInstanceOf(FilesError)
      expect(calls.map(({ kind }) => kind)).toEqual(['begin'])
    })
  })

  describe('options and budgets', () => {
    it.each([
      ['a fixed concurrency with a startup', { concurrency: 4, startup: 'default' }],
      ['a concurrency over 1024', { concurrency: 2000 }],
      ['a maxConcurrency of 0', { maxConcurrency: 0 }],
      ['an unknown startup', { startup: 'fast' }],
      ['an onProgress that is not a function', { onProgress: 'log' }],
    ])('refuses %s before any request, for data of known and of unknown size, leaving no listener on the stream', async (_, options) => {
      const storage = serveTransfers()
      const stream = Readable.from([DATA])

      const known = await outcomeOf(File.uploadData(DESTINATION, DATA, {}, options))
      const unknown = await outcomeOf(File.uploadStream(DESTINATION, stream, {}, options))

      expect([known.error, unknown.error].every(error => error instanceof InvalidParameterError)).toBe(true)
      expect(storage.apiRequests).toEqual([])
      expect(['error', 'readable'].map(event => stream.listenerCount(event))).toEqual([0, 0])
    })

    // A fixed concurrency of four within a maxConcurrency of two runs at two, whatever the request budget allows.
    it('keeps a fixed concurrency within maxConcurrency', async () => {
      const held = []
      const storage = serveTransfers({
        answerStore: (store, answer) => {
          held.push(answer)
          setTimeout(() => held.shift()(), 20)
        },
      })

      await File.uploadData(DESTINATION, [Buffer.from(partsOf('k', 8))], {}, { concurrency: 4, maxConcurrency: 2 })

      expect(storage.counts.mostInFlight).toBe(2)
      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('k', 8))
    })

    // A stream's chunk of 24 bytes, three times the budget, is copied whole as part 1 takes it: part 1's 4 bytes into
    // its own admitted buffer, and the other 20 into a copy admitted at once beyond the budget's limit, the upload's
    // alone. Each later part, which takes its bytes from that copy, is admitted only once nothing but that copy is
    // held, so that the budget never holds more than the copy and one part, until part 6 has taken the copy's last
    // bytes and the copy has been given back. The held bytes seen show that the public uploadStream() counts the copy
    // against its job's budget.
    it('copies a stream chunk larger than a small budget whole as it is taken, holding its rest alone beyond the budget until its parts have taken it', async () => {
      const job = new Files.TransferJob({ maxBufferBytes: 8 })
      const held = []
      const storage = serveTransfers({
        answerStore: (store, answer) => {
          held.push(job._scope().buffers.held)
          answer()
        },
      })

      const file = await File.uploadStream(DESTINATION, Readable.from([Buffer.from(partsOf('o', 6))]), {}, { job })

      expect(file).toBeInstanceOf(File)
      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('o', 6))
      expect(held).toEqual([24, 24, 24, 24, 24, 4])
      expect(storage.counts.mostInFlight).toBe(1)
      expect(job._scope().buffers.held).toBe(0)
    })

    // The upload's copy of its 24 bytes of data, three times the budget, is made as it is called, held alone, as nothing
    // else is held: its parts, views of the copy, need no more room. A stream's upload of the same job, whose part needs
    // room, waits for it, holding nothing, and goes on once the first has settled; never are both held at once.
    it('holds a copy of data in memory larger than the budget alone, a stream\'s upload of the same job waiting for room until it is given back', async () => {
      const job = new Files.TransferJob({ maxBufferBytes: 8 })
      const held = []
      const storage = serveTransfers({
        answerStore: ({ path: uploadPath }, answer) => {
          held.push(`${uploadPath} ${job._scope().buffers.held}`)
          answer()
        },
      })

      const sized = File.uploadData('reports/sized.csv', [Buffer.from(partsOf('s', 6))], {}, { job })
      const copied = job._scope().buffers.held
      const streamed = File.uploadStream('reports/streamed.csv', Readable.from([Buffer.from(partsOf('t', 2))]), {}, { job })
      const outcomes = await Promise.all([outcomeOf(sized), outcomeOf(streamed)])

      expect(outcomes.map(({ value }) => value instanceof File)).toEqual([true, true])
      expect(copied).toBe(24)
      expect(held.filter(entry => entry.startsWith('reports/sized.csv')).every(entry => entry.endsWith(' 24'))).toBe(true)
      expect(held.filter(entry => entry.startsWith('reports/streamed.csv')).every(entry => Number(entry.split(' ')[1]) <= 8)).toBe(true)
      expect(storedBytes(storage.stored['reports/sized.csv'])).toBe(partsOf('s', 6))
      expect(storedBytes(storage.stored['reports/streamed.csv'])).toBe(partsOf('t', 2))
      expect(job._scope().buffers.held).toBe(0)
    })

    // The first upload's copy, 8 bytes, is larger than the budget of 4: it is made, held alone, as nothing else is held.
    // While it is held, bytes in memory, of any size, cannot be copied, and are refused as they are given, before anything
    // is sent; strings, which need no copy, are not. Once nothing is held, a copy that fits is made, and one that would
    // not fit in what it leaves is refused, so that the budget is never exceeded but by a copy held alone.
    it('refuses bytes in memory, before sending anything, when their copy would not fit, or larger than the budget, could not be held alone', async () => {
      const job = new Files.TransferJob({ maxBufferBytes: 4, maxConcurrentFiles: 1 })
      const storage = serveTransfers()

      const first = File.uploadData('reports/first.csv', Buffer.from(partsOf('a', 2)), {}, { job })
      const large = File.uploadData('reports/large.csv', Buffer.from(partsOf('b', 2)), {}, { job })
      const small = File.uploadData('reports/small.csv', [Buffer.from('c')], {}, { job })
      const text = File.uploadData('reports/text.csv', partsOf('d', 1), {}, { job })
      const heldAlone = job._scope().buffers.held
      const outcomes = await Promise.all([first, large, small, text].map(outcomeOf))

      // Once nothing is held, a copy that fits is made, and one that would take the budget past its limit is not.
      const fits = File.uploadData('reports/fits.csv', Buffer.from('abc'), {}, { job })
      const over = File.uploadData('reports/over.csv', Buffer.from('xyz'), {}, { job })
      const heldWithin = job._scope().buffers.held
      const later = await Promise.all([fits, over].map(outcomeOf))

      expect([heldAlone, heldWithin]).toEqual([8, 3])
      expect(outcomes.map(({ value }) => value instanceof File)).toEqual([true, false, false, true])
      expect(later.map(({ value }) => value instanceof File)).toEqual([true, false])
      expect([...outcomes.slice(1, 3), later[1]].every(({ error }) => error instanceof FilesError && /cannot be copied now/.test(error.message))).toBe(true)
      expect(storage.apiRequests.filter(({ kind }) => kind === 'begin').map(({ path: uploadPath }) => uploadPath).sort())
        .toEqual(['reports/first.csv', 'reports/fits.csv', 'reports/text.csv'])
      expect(storedBytes(storage.stored['reports/fits.csv'])).toBe('abc')
      expect(job._scope().buffers.held).toBe(0)
    })

    // A stream's upload has the job's only file admission and holds none of its 10 bytes of buffer room yet, its
    // begin_upload unanswered, when 10 bytes in memory, the whole budget, are given to another upload of the job. Their
    // copy could only wait for the file holding room the first upload's parts need: it is refused as it is given, before
    // anything is copied or held. The first upload then goes on, its parts of 8 bytes never held beyond the budget; and
    // the same bytes, given again once it has settled, are copied as they are given, whatever the caller does next.
    it('refuses a copy of data in memory whose file cannot be admitted at once, so that an admitted upload\'s parts stay within the budget', async () => {
      const job = new Files.TransferJob({ maxBufferBytes: 10, maxConcurrentFiles: 1 })
      const held = []
      let answerBegin = null
      const storage = serveTransfers({
        answerGrants: (request, answer) => {
          if (request.kind === 'begin' && request.path === 'reports/streamed.csv') {
            answerBegin = answer
          } else {
            answer()
          }
        },
        answerStore: (store, answer) => {
          held.push(job._scope().buffers.held)
          answer()
        },
        partsize: 8,
      })

      const chunks = [Buffer.from(partsOf('s', 2)), Buffer.from(partsOf('t', 2))]
      const streamed = File.uploadStream('reports/streamed.csv', Readable.from(chunks), {}, { job, size: 16 })
      await waitFor(() => answerBegin !== null)

      const data = Buffer.from('copied-10b')
      const refused = await outcomeOf(File.uploadData('reports/copied.csv', data, {}, { job }))
      const heldAfterRefusal = job._scope().buffers.held

      answerBegin()
      const streamedOutcome = await outcomeOf(streamed)

      const copying = File.uploadData('reports/copied.csv', data, {}, { job })
      data.fill('x')
      const copiedOutcome = await outcomeOf(copying)

      expect(refused.error).toBeInstanceOf(FilesError)
      expect(refused.error.message).toMatch(/cannot be copied now: the transfer job has no file admission free/)
      expect(heldAfterRefusal).toBe(0)
      expect([streamedOutcome.value, copiedOutcome.value].every(file => file instanceof File)).toBe(true)
      expect(held.length).toBeGreaterThan(0)
      expect(held.every(bytes => bytes <= 10)).toBe(true)
      expect(storedBytes(storage.stored['reports/streamed.csv'])).toBe(`${partsOf('s', 2)}${partsOf('t', 2)}`)
      expect(storedBytes(storage.stored['reports/copied.csv'])).toBe('copied-10b')
      expect(storage.apiRequests.filter(({ kind }) => kind === 'begin').map(({ path: uploadPath }) => uploadPath))
        .toEqual(['reports/streamed.csv', 'reports/copied.csv'])
      expect(job._scope().buffers.held).toBe(0)
    })

    // Another upload's part, 16 bytes, is held by storage when an upload whose grants send each part in a form begins:
    // its part must have room for its own buffer and its form together, both alive as the form is made, before it is
    // read, which it finds only once the other part has been answered.
    it('reads a part sent in a form only once there is room for its buffer and its form together, while another upload holds room', async () => {
      const formGrant = part => grantOf(part, { http_method: 'POST', parameters: { key: 'uploads/form' }, partsize: 4 })

      // A form part of 4 bytes needs its own buffer, 4 bytes, and its form, made while that buffer holds them. The
      // budget has room for it, or for the other upload's part of 16 bytes, but not both.
      const [counted] = grantsOf([formGrant(1)], { count: 1, firstPart: 1, ref: null })
      const formCredit = 4 + 4 + formEnvelopeOf({ fileName: 'form.csv', grant: counted, instructions: instructionsOf(counted), length: 4 })
      const job = new Files.TransferJob({ maxBufferBytes: 16 + formCredit - 1 })

      let releaseOther = null
      const events = []
      const { calls, client } = standInClient({
        answerApi: ({ body, kind, url }) => {
          if (kind === 'end') {
            return fakeResponse({ data: { path: DESTINATION, size: body.size, type: 'file' }, status: 201 })
          }

          const first = body.part ?? 1
          const forms = url.includes(encodeURIComponent('reports/form.csv'))
          return fakeResponse({
            data: Array.from({ length: body.parts ?? 1 }, (_, index) => (forms
              ? formGrant(first + index)
              : grantOf(first + index, { partsize: 16, upload_uri: `${STORAGE_URL}/other-part-${first + index}` }))),
          })
        },
        answerStorage: ({ part, url }) => {
          events.push({ held: job._scope().buffers.held, store: url.includes('other') ? `other ${part}` : `form ${part}` })

          if (url.includes('other') && part === 1) {
            return new Promise(resolve => { releaseOther = () => resolve(fakeResponse({ headers: { etag: '"o1"' } })) })
          }

          return fakeResponse({ headers: { etag: `"e${part}"` } })
        },
      })

      const other = client.files.uploadStream('reports/other.csv', Readable.from([Buffer.from(partsOf('o', 4))]), {}, { job })
      await waitFor(() => releaseOther !== null)

      const form = client.files.uploadStream('reports/form.csv', Readable.from([partsOf('f', 2)]), {}, { job })
      await new Promise(resolve => { setTimeout(resolve, 50) })
      const formStoresBefore = events.filter(({ store }) => store.startsWith('form')).length

      releaseOther()
      const outcomes = await Promise.all([outcomeOf(other), outcomeOf(form)])
      const formBodies = calls
        .filter(({ bytes, kind }) => kind === 'store' && bytes.includes('name="key"'))
        .map(({ bytes }) => bytes.toString().match(/\r\n\r\n(f00\d)\r\n--/)?.[1])

      expect(outcomes.map(({ value }) => value instanceof File)).toEqual([true, true])
      expect(formStoresBefore).toBe(0)
      expect(events.map(({ store }) => store)).toEqual(['other 1', 'form 1', 'form 2'])
      expect(events.every(({ held }) => held <= job.snapshot().maxBufferBytes)).toBe(true)
      expect(formBodies).toEqual(['f001', 'f002'])
      expect(job._scope().buffers.held).toBe(0)
    })

    it('releases every buffer and file admission of an upload, whether it completes or fails, for the next upload of its job', async () => {
      const job = new Files.TransferJob({ maxBufferBytes: 8, maxConcurrentFiles: 1 })
      const storage = serveTransfers({ answerStore: ({ part, path: uploadPath }, answer) => answer(uploadPath === 'reports/failed.csv' && part === 2 ? 403 : 200) })

      const failed = await outcomeOf(File.uploadData('reports/failed.csv', [Buffer.from(partsOf('f', 3))], {}, { job }))
      const streamed = await outcomeOf(File.uploadStream('reports/streamed.csv', Readable.from([Buffer.from(partsOf('g', 3))]), {}, { job }))
      const done = await outcomeOf(File.uploadData('reports/done.csv', DATA, {}, { job }))

      expect(failed.error).toBeInstanceOf(FilesError)
      expect(failed.error.message).toMatch(/part 2 with HTTP status 403/)
      expect(streamed.value).toBeInstanceOf(File)
      expect(done.value).toBeInstanceOf(File)
      expect(storage.events.filter(event => event === 'end')).toHaveLength(2)
      expect(job._scope().buffers.held).toBe(0)
    })

    // The grant asks for the whole file in one request, and the stream's size is unknown: the upload holds the whole
    // budget of 16 bytes, of which its source may fill 8.
    it('holds a whole file of unknown size within half its budget, refusing a larger one and unwinding a failed one, both unsent', async () => {
      const job = new Files.TransferJob({ maxBufferBytes: 16 })
      const storage = serveTransfers({ fixLength: false, grant: () => ({ send: { file: 'body' } }), partsize: 1024 })

      // The failing source fails only once its own upload has taken its first bytes and waits for more, as the listener
      // that upload then adds shows, whatever the uploads before it took.
      const failing = new Readable({ read() {} })
      failing.push(Buffer.from('abcd'))
      let failingScheduled = false

      failing.on('newListener', event => {
        if (event === 'readable' && !failingScheduled) {
          failingScheduled = true
          setImmediate(() => failing.destroy(new Error('the source failed')))
        }
      })

      const small = await outcomeOf(File.uploadStream('reports/small.csv', Readable.from([Buffer.from('12345678')]), {}, { job }))
      const large = await outcomeOf(File.uploadStream('reports/large.csv', Readable.from([Buffer.from('123456789')]), {}, { job }))
      const broken = await outcomeOf(File.uploadStream('reports/broken.csv', failing, {}, { job }))
      const after = await outcomeOf(File.uploadStream('reports/after.csv', Readable.from([Buffer.from('1234')]), {}, { job }))

      expect(small.value).toBeInstanceOf(File)
      expect(large.error.message).toMatch(/whole file in one request/)
      expect(broken.error.message).toBe('the source failed')
      expect(after.value).toBeInstanceOf(File)
      expect(Object.keys(storage.sends).sort()).toEqual(['reports/after.csv 1', 'reports/small.csv 1'])
      expect(storage.apiRequests.filter(({ kind }) => kind === 'end').map(({ path: uploadPath }) => uploadPath)).toEqual(['reports/small.csv', 'reports/after.csv'])
      expect(job._scope().buffers.held).toBe(0)
    })

    it('neither reads nor sends a part paused while it waited for a request permit, until resumed', async () => {
      const job = new Files.TransferJob({ maxConcurrency: 1 })
      const control = new Files.TransferControl()
      let releasePart1 = null
      const storage = serveTransfers({
        answerStore: ({ part }, answer) => {
          if (part === 1) {
            releasePart1 = answer
          } else {
            answer()
          }
        },
      })

      const upload = File.uploadData(DESTINATION, [Buffer.from(partsOf('q', 3))], {}, { control, job, startup: 'aggressive' })
      await waitFor(() => releasePart1 !== null)

      control.pause()
      releasePart1()
      await new Promise(resolve => { setTimeout(resolve, 100) })

      expect(Object.keys(storage.sends)).toEqual([`${DESTINATION} 1`])

      control.resume()
      await upload

      expect(storedBytes(storage.stored[DESTINATION])).toBe(partsOf('q', 3))
    })

    it('reports progress: bytes accepted once, bytes sent again counted as sent, and a last report as it completes', async () => {
      Files.configureNetwork({ maxNetworkRetries: 1 })
      const reports = []
      serveTransfers({ answerStore: ({ part, send }, answer) => answer(part === 2 && send === 1 ? 500 : 200) })

      await File.uploadData(DESTINATION, [Buffer.from(partsOf('r', 3))], {}, { onProgress: progress => reports.push(progress) })

      const last = reports[reports.length - 1]
      expect(reports[0]).toMatchObject({ bytesTransferred: 0, direction: 'upload', state: 'running', totalBytes: 12 })
      expect(last).toMatchObject({ bytesSent: 16, bytesTransferred: 12, state: 'completed', totalBytes: 12 })
      expect(reports.every((report, index) => index === 0 || report.bytesTransferred >= reports[index - 1].bytesTransferred)).toBe(true)
    })
  })

  describe('from a borrowed stream that gives nothing more', () => {
    const idleStream = () => {
      const stream = new Readable({ read() {} })
      stream.push(Buffer.from(partsOf('i', 1)))
      return stream
    }

    it('settles at once with the signal\'s reason when it aborts while the upload waits for the stream, leaving the stream open and without its listeners', async () => {
      const controller = new AbortController()
      const reason = { cause: 'stop waiting' }
      const stream = idleStream()
      const listeners = () => ['close', 'end', 'error', 'readable'].map(event => stream.listenerCount(event))
      const before = listeners()
      const storage = serveTransfers({
        answerStore: (store, answer) => {
          answer()
          setTimeout(() => controller.abort(reason), 20)
        },
      })

      const settled = await outcomeOf(File.uploadStream(DESTINATION, stream, {}, { signal: controller.signal }))

      expect(settled.error).toBe(reason)
      expect(stream.destroyed).toBe(false)
      expect(listeners()).toEqual(before)
      expect(storage.events).not.toContain('end')
    })

    it('settles with a part\'s failure while the upload waits for the stream', async () => {
      const storage = serveTransfers({ answerStore: (store, answer) => answer(403) })

      const settled = await outcomeOf(File.uploadStream(DESTINATION, idleStream()))

      expect(settled.error).toBeInstanceOf(FilesError)
      expect(storage.events).not.toContain('end')
    })
  })

  describe('from a file on disk', () => {
    let directory

    beforeEach(() => {
      directory = fs.mkdtempSync(path.join(os.tmpdir(), 'files-upload-'))
    })

    afterEach(() => {
      jest.restoreAllMocks()
      fs.rmSync(directory, { force: true, recursive: true })
    })

    // Records each file the SDK opens, and whether it has closed it.
    const trackOpenedFiles = () => {
      const opened = []
      const open = fs.promises.open.bind(fs.promises)

      jest.spyOn(fs.promises, 'open').mockImplementation(async (...args) => {
        const handle = await open(...args)
        const file = { closed: false }
        const close = handle.close.bind(handle)

        handle.close = async () => {
          await close()
          file.closed = true
        }

        opened.push(file)
        return handle
      })

      return opened
    }

    it('closes the file it reads when the upload fails before reading all of it', async () => {
      const source = path.join(directory, 'source.bin')
      fs.writeFileSync(source, Buffer.alloc(24 * 1024 * 1024, 'u'))

      const opened = trackOpenedFiles()
      const storage = serveTransfers({ answerStore: (store, answer) => answer(403), fixLength: false })

      const outcome = await outcomeOf(File.upload(source, DESTINATION))

      expect(outcome.error).toBeInstanceOf(FilesError)
      expect(opened).toEqual([{ closed: true }])
      expect(Object.values(storage.sends).reduce((total, sends) => total + sends, 0)).toBeLessThan(3)
      expect(storage.events).not.toContain('end')
    })

    it('uploads every byte of a file in the parts it plans, source first or destination first', async () => {
      const source = path.join(directory, 'aligned.bin')
      const partsize = 5 * 1024 * 1024

      // ASCII, so that each stored part is its text, and each eight bytes giving their own offset, so that a byte stored
      // in the wrong place shows.
      const data = Buffer.alloc((2 * partsize) + 1000)

      for (let offset = 0; offset < data.length; offset += 8) {
        data.write(String(offset).padStart(8, '0'), offset, 'latin1')
      }

      fs.writeFileSync(source, data)
      const storage = serveTransfers({ fixLength: false, partsize })

      const sourceFirst = await File.upload(source, 'reports/source-first.bin')
      const destinationFirst = await File.uploadFile('reports/destination-first.bin', source)

      expect([sourceFirst, destinationFirst].every(file => file instanceof File)).toBe(true)
      expect(Object.keys(storage.stored['reports/source-first.bin'])).toEqual(['1', '2'])
      expect(storedBytes(storage.stored['reports/source-first.bin'])).toBe(data.toString('latin1'))
      expect(storedBytes(storage.stored['reports/destination-first.bin'])).toBe(data.toString('latin1'))
    })

    it('fails without beginning the upload when the file cannot be opened', async () => {
      const { apiRequests } = serveTransfers()

      const outcome = await outcomeOf(File.uploadFile(DESTINATION, path.join(directory, 'missing.bin')))

      expect(outcome.error).toBeInstanceOf(FilesError)
      expect(apiRequests).toEqual([])
    })
  })
})

describe('File folder uploads', () => {
  const FOLDERS_PATH = '/api/rest/v1/folders/'
  let directory

  beforeEach(() => {
    nock.disableNetConnect()
    Files.setBaseUrl(API_URL)
    Files.setApiKey('api-key')
    Files.configureNetwork({ maxNetworkRetries: 0 })
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'files-folder-upload-'))
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    Files.setApiKey(null)
    Files.configureNetwork({ maxNetworkRetries: 3, maxNetworkRetryDelay: 1.5, minNetworkRetryDelay: 0.1 })
    fs.rmSync(directory, { force: true, recursive: true })
  })

  // A local tree to upload: a.csv, an empty folder, and sub/b.csv.
  const localTree = () => {
    const source = path.join(directory, 'tree')
    fs.mkdirSync(path.join(source, 'empty'), { recursive: true })
    fs.mkdirSync(path.join(source, 'sub'))
    fs.writeFileSync(path.join(source, 'a.csv'), 'a001')
    fs.writeFileSync(path.join(source, 'sub', 'b.csv'), 'b001b002')
    return source
  }

  // Stands in for the API's folder creation as the Files.com Mock answers it: a folder is made once, and a path already
  // made, or given as existing, is refused with processing-failure/destination-exists. Records each folder asked for,
  // with the API key it was asked with, and calls onAsked(path) as each is asked for, before it is answered.
  const serveFolders = (existing = [], onAsked = () => {}) => {
    const made = new Set(existing)
    const asked = []

    nock(API_URL)
      .persist()
      .post(uri => uri.startsWith(FOLDERS_PATH))
      .reply(function answerFolder(uri) {
        const folderPath = decodeURIComponent(uri.split('?')[0].replace(FOLDERS_PATH, ''))
        asked.push({ key: headerValue(this.req.headers['x-filesapi-key']), path: folderPath })
        onAsked(folderPath)

        if (made.has(folderPath)) {
          return [422, { 'http-code': 422, title: 'Destination Exists', type: 'processing-failure/destination-exists' }]
        }

        made.add(folderPath)
        return [201, { path: folderPath, type: 'directory' }]
      })

    return asked
  }

  it('creates the new folder, then each folder in it, the empty one included, then uploads each file, every API request with the call\'s client, and resolves with what it made', async () => {
    const source = localTree()
    const asked = serveFolders()
    const storage = serveTransfers({ partsize: 1024 })
    const client = new FilesClient({ apiKey: 'client-key', baseUrl: API_URL, maxNetworkRetries: 0 })

    const result = await client.files.uploadDirectory(source, 'reports/tree')

    expect(result).toEqual({ bytes: 12, directories: ['empty', 'sub'], files: ['a.csv', 'sub/b.csv'] })
    expect(asked).toEqual([
      { key: 'client-key', path: 'reports/tree' },
      { key: 'client-key', path: 'reports/tree/empty' },
      { key: 'client-key', path: 'reports/tree/sub' },
    ])
    expect(storage.apiRequests.map(({ key, kind, path: uploadPath }) => `${kind} ${uploadPath} ${key}`)).toEqual([
      'begin reports/tree/a.csv client-key',
      'end reports/tree/a.csv client-key',
      'begin reports/tree/sub/b.csv client-key',
      'end reports/tree/sub/b.csv client-key',
    ])
    expect(storage.stored['reports/tree/a.csv']).toEqual({ 1: 'a001' })
    expect(storage.stored['reports/tree/sub/b.csv']).toEqual({ 1: 'b001b002' })
  })

  it('fails with the API\'s refusal of a destination that already exists, sending nothing more', async () => {
    const source = localTree()
    const asked = serveFolders(['reports/tree'])
    const storage = serveTransfers()

    const outcome = await outcomeOf(File.uploadDirectory(source, 'reports/tree'))

    expect(outcome.error?.type).toBe('processing-failure/destination-exists')
    expect(asked.map(({ path: folderPath }) => folderPath)).toEqual(['reports/tree'])
    expect(storage.apiRequests).toEqual([])
  })

  it.each([
    ['a symbolic link inside it', source => {
      fs.symlinkSync(path.join(source, 'a.csv'), path.join(source, 'sub', 'link.csv'))
      return source
    }],
    ['itself a symbolic link to a folder', source => {
      const link = path.join(directory, 'link')
      fs.symlinkSync(source, link)
      return link
    }],
  ])('refuses a folder that is or holds %s before sending anything, following no link', async (_, shape) => {
    const source = shape(localTree())
    const asked = serveFolders()
    const storage = serveTransfers()

    const outcome = await outcomeOf(File.uploadDirectory(source, 'reports/tree'))

    expect(outcome.error).toBeInstanceOf(InvalidParameterError)
    expect(outcome.error.message).toMatch(/symbolic link/)
    expect(asked).toEqual([])
    expect(storage.apiRequests).toEqual([])
  })

  // The source does not exist: a refusal, rather than its failure to be read, shows that nothing was read first.
  it.each([
    ['a size, which its files each have of their own', 'reports/tree', { size: 12 }],
    ['the root as its destination', '/', {}],
  ])('refuses %s before reading or sending anything', async (_, destination, options) => {
    const asked = serveFolders()

    const outcome = await outcomeOf(File.uploadDirectory(path.join(directory, 'missing'), destination, options))

    expect(outcome.error).toBeInstanceOf(InvalidParameterError)
    expect(asked).toEqual([])
  })

  // The first file's only part is held by storage when the signal aborts: that file's upload, and so the folder's,
  // rejects with the signal's reason itself, and no later file is begun.
  it('rejects with its signal\'s reason, unchanged, once that aborts while a file uploads, beginning no later file', async () => {
    const source = localTree()
    const controller = new AbortController()
    const reason = { cause: 'no longer uploading the folder' }
    serveFolders()
    const storage = serveTransfers({ answerStore: () => controller.abort(reason), partsize: 1024 })

    const outcome = await outcomeOf(File.uploadDirectory(source, 'reports/tree', { signal: controller.signal }))

    expect(outcome.error).toBe(reason)
    expect(storage.apiRequests.map(({ kind, path: uploadPath }) => `${kind} ${uploadPath}`)).toEqual(['begin reports/tree/a.csv'])
    expect(storage.events).not.toContain('end')
  })

  // The signal has aborted before the call, with a falsy reason, and the source does not exist: the upload rejects with
  // that very reason, not with its failure to find the source, which it never looked at, and sends nothing.
  it.each([['null', null], ['false', false], ['0', 0]])('rejects with its signal\'s reason, %s, unchanged, when that aborted before the call, reading and sending nothing', async (_, reason) => {
    const controller = new AbortController()
    controller.abort(reason)
    const asked = serveFolders()
    const storage = serveTransfers()

    const outcome = await outcomeOf(File.uploadDirectory(path.join(directory, 'missing'), 'reports/tree', { signal: controller.signal }))

    expect(Object.keys(outcome)).toEqual(['error'])
    expect(Object.is(outcome.error, reason)).toBe(true)
    expect(asked).toEqual([])
    expect(storage.apiRequests).toEqual([])
  })

  // The tree holds sub/link.csv, a symbolic link, and the signal aborts as that entry's own lstat completes: the upload
  // rejects with the signal's reason itself, not the refusal of the link it would otherwise make, having sent nothing.
  it.each([['an object', { cause: 'no longer reading the tree' }], ['null', null], ['0', 0]])('rejects with its signal\'s reason, %s, unchanged, when that aborts as an entry has been looked at, before what it is decides anything', async (_, reason) => {
    const source = localTree()
    const controller = new AbortController()
    const lstat = fs.promises.lstat.bind(fs.promises)
    fs.symlinkSync(path.join(source, 'a.csv'), path.join(source, 'sub', 'link.csv'))

    jest.spyOn(fs.promises, 'lstat').mockImplementation(async (...args) => {
      const stats = await lstat(...args)

      if (path.basename(`${args[0]}`) === 'link.csv') {
        controller.abort(reason)
      }

      return stats
    })

    try {
      const asked = serveFolders()
      const storage = serveTransfers()

      const outcome = await outcomeOf(File.uploadDirectory(source, 'reports/tree', { signal: controller.signal }))

      expect(Object.keys(outcome)).toEqual(['error'])
      expect(Object.is(outcome.error, reason)).toBe(true)
      expect(asked).toEqual([])
      expect(storage.apiRequests).toEqual([])
    } finally {
      jest.restoreAllMocks()
    }
  })

  // a.csv is removed just as it is to be looked at, and the signal aborts then: looking at it fails, as the file system
  // says, and the upload rejects with that very failure, which came first, not the signal's reason, having sent nothing.
  it('rejects with the failure to look at an entry of its tree, not the signal\'s reason, when that aborts as looking at it fails', async () => {
    const source = localTree()
    const controller = new AbortController()
    const removed = path.join(source, 'a.csv')
    const failures = []
    const lstat = fs.promises.lstat.bind(fs.promises)

    jest.spyOn(fs.promises, 'lstat').mockImplementation(async (...args) => {
      if (`${args[0]}` !== removed) {
        return lstat(...args)
      }

      fs.rmSync(removed)
      controller.abort({ cause: 'no longer reading the tree' })

      return lstat(...args).catch(error => {
        failures.push(error)
        throw error
      })
    })

    try {
      const asked = serveFolders()
      const storage = serveTransfers()

      const outcome = await outcomeOf(File.uploadDirectory(source, 'reports/tree', { signal: controller.signal }))

      expect(failures.map(({ code }) => code)).toEqual(['ENOENT'])
      expect(outcome.error).toBe(failures[0])
      expect(asked).toEqual([])
      expect(storage.apiRequests).toEqual([])
    } finally {
      jest.restoreAllMocks()
    }
  })

  // The signal aborts as the tree's first folder is read: no entry of it is looked at after that, and the upload rejects
  // with the signal's reason, having sent nothing.
  it('reads no more of its tree once its signal aborts while the tree is read, rejecting with the signal\'s reason and sending nothing', async () => {
    const source = localTree()
    const controller = new AbortController()
    const reason = { cause: 'no longer reading the tree' }
    const looked = []
    const readdir = fs.promises.readdir.bind(fs.promises)
    const lstat = fs.promises.lstat.bind(fs.promises)

    jest.spyOn(fs.promises, 'readdir').mockImplementation(async (...args) => {
      const names = await readdir(...args)
      controller.abort(reason)
      return names
    })

    jest.spyOn(fs.promises, 'lstat').mockImplementation(async (...args) => {
      looked.push(path.relative(source, `${args[0]}`))
      return lstat(...args)
    })

    try {
      const asked = serveFolders()
      const storage = serveTransfers()

      const outcome = await outcomeOf(File.uploadDirectory(source, 'reports/tree', { signal: controller.signal }))

      expect(outcome.error).toBe(reason)
      expect(looked).toEqual([''])
      expect(asked).toEqual([])
      expect(storage.apiRequests).toEqual([])
    } finally {
      jest.restoreAllMocks()
    }
  })

  // The tree has been read when sub/b.csv grows, as the folder is created: its upload sends what the file holds then,
  // and the result counts the bytes of the file that upload published, as the API reports it, not the size the tree was
  // read with.
  it('counts each file\'s bytes as its completed upload published them, a file changed after the tree was read included', async () => {
    const source = localTree()
    const grown = 'b001b002b003'

    serveFolders([], folderPath => {
      if (folderPath === 'reports/tree') {
        fs.writeFileSync(path.join(source, 'sub', 'b.csv'), grown)
      }
    })

    const storage = serveTransfers({ partsize: 1024 })

    const result = await File.uploadDirectory(source, 'reports/tree')

    expect(result).toEqual({ bytes: 4 + grown.length, directories: ['empty', 'sub'], files: ['a.csv', 'sub/b.csv'] })
    expect(storage.stored['reports/tree/sub/b.csv']).toEqual({ 1: grown })
    expect(storage.apiRequests.filter(({ kind }) => kind === 'end').map(({ body }) => body.size)).toEqual([4, grown.length])
  })
})
