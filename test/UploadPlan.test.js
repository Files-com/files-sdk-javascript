import { Readable } from 'stream'

import { FilesError, InvalidParameterError } from '../lib/Errors'
import { TransferControl, byteBudget } from '../lib/Transfer'
import {
  PREFERRED_PART_BYTES,
  S3_MAX_PARTS,
  S3_MAX_PART_BYTES,
  S3_MIN_PART_BYTES,
  dataSourceOf,
  destinationOf,
  formEnvelopeOf,
  grantsOf,
  instructionsOf,
  partRequestOf,
  pathBindingOf,
  planOf,
  streamSource,
  utf8Length,
  withPartOffset,
} from '../lib/Upload'

const MIB = 1024 * 1024
const TB = 1024 * 1024 * MIB
const STORAGE_URL = 'https://storage.example.test/part?X-Amz-Signature=signed'

const DIRECT = {
  addresses: ['10.0.0.1:443'],
  ca_pem: '-----BEGIN CERTIFICATE-----',
  direct_uri: 'https://agent.example.test/upload',
  server_name: 'agent.example.test',
  version: 1,
}

const grantFrom = (fields = {}, part = 1) => grantsOf([{
  part_number: part,
  partsize: 5 * MIB,
  ref: 'upload-ref',
  upload_uri: STORAGE_URL,
  ...fields,
}], { count: 1, firstPart: part, ref: null })[0]

const planFor = (size, fields = {}) => {
  const grant = grantFrom(fields)
  return planOf({ destination: destinationOf(grant), grant, instructions: instructionsOf(grant), size })
}

const settle = async () => {
  for (let turn = 0; turn < 10; turn += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve()
  }
}

// Whether a promise has settled, by the time every reaction already queued has run.
const settledYet = async promise => {
  let settled = false
  promise.then(() => { settled = true }, () => { settled = true })
  await settle()
  return settled
}

describe('Upload planning', () => {
  it('plans S3 parts of at least 8 MiB, larger to fit 10,000, without allocating anything for a file over 1 TB', () => {
    expect(planFor(0)).toEqual({ mode: 'local', offsets: false, partCount: 1, partSize: PREFERRED_PART_BYTES })
    expect(planFor(100 * MIB)).toMatchObject({ partCount: 13, partSize: 8 * MIB })

    const huge = 2 * TB + 12345
    const plan = planFor(huge)

    expect(Number.isSafeInteger(plan.partSize) && Number.isSafeInteger(plan.partCount)).toBe(true)
    expect(plan.partCount).toBeLessThanOrEqual(S3_MAX_PARTS)
    expect(plan.partSize).toBeGreaterThanOrEqual(S3_MIN_PART_BYTES)
    expect(plan.partSize).toBeLessThanOrEqual(S3_MAX_PART_BYTES)
    expect(plan.partSize * plan.partCount).toBeGreaterThanOrEqual(huge)
    expect(plan.partSize * (plan.partCount - 1)).toBeLessThan(huge)
  })

  it('fits S3 parts to a smaller available_parts, and refuses a file that cannot fit in parts of 5 GiB', () => {
    expect(planFor(100 * MIB, { available_parts: 5 })).toMatchObject({ partCount: 5, partSize: 20 * MIB })
    expect(() => planFor((S3_MAX_PART_BYTES * S3_MAX_PARTS) + 1)).toThrow(FilesError)
  })

  it('keeps the API\'s part size for a remote server or Agent destination, numbered in its URL, with no 10,000-part limit', () => {
    const plan = planFor(2 * TB, { direct_connection_info: DIRECT, partsize: 8 * MIB })

    expect(plan).toEqual({ mode: 'local', offsets: true, partCount: (2 * TB) / (8 * MIB), partSize: 8 * MIB })
    expect(plan.partCount).toBeGreaterThan(S3_MAX_PARTS)
    expect(destinationOf(grantFrom({ direct_connection_info: { ...DIRECT, version: 2 } }))).toBe('s3')
  })

  it('leaves part sizes to the API when the grant fixes a length or a checksum or the size is unknown, and sends a whole-file grant whole', () => {
    expect(planFor(100 * MIB, { headers: { 'Content-Length': `${5 * MIB}` } })).toEqual({ mode: 'server' })
    expect(planFor(100 * MIB, { headers: { 'x-amz-checksum-crc32': 'AAAAAA==' } })).toEqual({ mode: 'server' })
    expect(planFor(100 * MIB, { upload_uri: `${STORAGE_URL}&X-Amz-SignedHeaders=content-length%3Bhost` })).toEqual({ mode: 'server' })
    expect(planFor(null)).toEqual({ mode: 'server' })
    expect(planFor(100 * MIB, { send: { file: 'body' } })).toEqual({ mode: 'whole' })
  })
})

describe('Upload grants', () => {
  it('matches each grant to its part, and refuses one for another upload, another part or the same part twice', () => {
    const grants = grantsOf([
      { part_number: 3, ref: 'r', upload_uri: STORAGE_URL },
      { part_number: 2, ref: 'r', upload_uri: STORAGE_URL },
    ], { count: 2, firstPart: 2, ref: 'r' })

    expect(grants.map(({ partNumber }) => partNumber)).toEqual([3, 2])
    expect(() => grantsOf([{ part_number: 2, ref: 'other', upload_uri: STORAGE_URL }], { count: 1, firstPart: 2, ref: 'r' })).toThrow(/another upload/)
    expect(() => grantsOf([{ part_number: 4, upload_uri: STORAGE_URL }], { count: 2, firstPart: 2, ref: 'r' })).toThrow(/not asked for/)
    expect(() => grantsOf([
      { part_number: 2, upload_uri: STORAGE_URL },
      { part_number: 2, upload_uri: STORAGE_URL },
    ], { count: 2, firstPart: 2, ref: 'r' })).toThrow(/not asked for/)
    expect(() => grantsOf([{ send: { checksum: 'body' }, upload_uri: STORAGE_URL }], { count: 1, firstPart: 1, ref: null })).toThrow(/does not support/)
  })

  it('numbers a remote part in its URL, replacing any alias, and keeps every other byte of the URL', () => {
    expect(withPartOffset('https://agent.example.test/u?token=a%2Bb&partNumber=9&offset=1#f', 3, 16 * MIB))
      .toBe(`https://agent.example.test/u?token=a%2Bb&part_number=3&part_offset=${16 * MIB}#f`)
  })

  it.each([
    ['the request\'s own path', {}, 'reports/a.csv', 'reports/a.csv', true],
    ['its site path in the request\'s workspace', { workspace: 73 }, 'reports/a.csv', '_/Workspaces/73/reports/a.csv', true],
    ['a site path in another workspace', { workspace: 73 }, 'reports/a.csv', '_/Workspaces/99/reports/a.csv', false],
    ['the path within the workspace a site-path request names', {}, '_/Workspaces/73/reports/a.csv', 'reports/a.csv', false],
    ['the site path of the workspace the API key acts in, when the request names none', {}, 'reports/a.csv', '_/Workspaces/311/reports/a.csv', true],
    ['another file without with_rename', {}, 'reports/a.csv', 'reports/a (1).csv', false],
    ['a renamed file in the same folder with with_rename', { renames: true }, 'reports/a.csv', 'reports/a (1).csv', true],
    ['a renamed file in another folder with with_rename', { renames: true }, 'reports/a.csv', 'other/a (1).csv', false],
    ['a renamed file in another workspace with with_rename', { renames: true, workspace: 73 }, 'reports/a.csv', '_/Workspaces/99/reports/a (1).csv', false],
  ])('binds an upload\'s first declared path: %s', (_, binding, destinationPath, declared, kept) => {
    const { bind } = pathBindingOf({ destinationPath, ...binding })
    const attempt = () => bind({ partNumber: 1, path: declared })

    if (kept) {
      expect(attempt).not.toThrow()
    } else {
      expect(attempt).toThrow(FilesError)
    }
  })

  it('holds every later declared path to the first, in its workspace, whichever form it takes, and keeps an absent one', () => {
    const { bind } = pathBindingOf({ destinationPath: 'reports/a.csv' })
    bind({ partNumber: 1, path: '_/Workspaces/311/reports/a.csv' })

    expect(() => bind({ partNumber: 2, path: null })).not.toThrow()
    expect(() => bind({ partNumber: 2, path: 'reports/a.csv' })).not.toThrow()
    expect(() => bind({ partNumber: 3, path: '_/Workspaces/311/reports/a.csv' })).not.toThrow()
    expect(() => bind({ partNumber: 4, path: '_/Workspaces/312/reports/a.csv' })).toThrow(FilesError)

    const renamed = pathBindingOf({ destinationPath: 'reports/a.csv', renames: true })
    renamed.bind({ partNumber: 1, path: 'reports/a (1).csv' })
    expect(() => renamed.bind({ partNumber: 2, path: 'reports/a (2).csv' })).toThrow(FilesError)
  })
})

describe('Upload part requests', () => {
  const bytes = new TextEncoder().encode('date,total\n')

  const requestFor = (fields, partBytes = bytes) => {
    const grant = grantFrom({ partsize: 1024, ...fields })
    return partRequestOf({ bytes: partBytes, fileName: 'daily.csv', grant, instructions: instructionsOf(grant), url: STORAGE_URL })
  }

  it('sends a raw body with the grant\'s exact headers and method, and its size where the grant places it', () => {
    const request = requestFor({
      headers: { 'Content-Length': `${bytes.length}`, 'Content-Type': 'text/csv', 'x-amz-meta-origin': 'granted' },
      http_method: 'post',
      send: { partsize: 'required-header X-Part-Size' },
    })

    expect(request.body).toBe(bytes)
    expect(request.method).toBe('POST')
    expect(request.headers).toEqual({ 'Content-Type': 'text/csv', 'X-Part-Size': `${bytes.length}`, 'x-amz-meta-origin': 'granted' })
  })

  it('sends a form\'s fixed fields, then its placed size and type, then the bytes, last, in a body whose envelope was counted exactly before it was made', () => {
    const fields = {
      http_method: 'POST',
      parameters: { key: 'uploads/a', policy: 'p' },
      send: { 'Content-Type': 'required-parameter Content-Type', partdata: 'required-parameter file', partsize: 'required-parameter size' },
    }

    const grant = grantFrom({ partsize: 1024, ...fields })
    const request = requestFor(fields)
    const text = new TextDecoder().decode(request.body)

    // Each field's name parameter, as its Content-Disposition gives it, not the file field's filename parameter.
    expect([...text.matchAll(/Content-Disposition: form-data; name="([^"]+)"/g)].map(([, name]) => name)).toEqual(['key', 'policy', 'size', 'Content-Type', 'file'])
    expect(request.headers['Content-Type']).toMatch(/^multipart\/form-data; boundary=----FilesSdkBoundary[0-9a-f]{24}$/)
    expect(request.body.subarray(request.dataOffset, request.dataOffset + bytes.length)).toEqual(bytes)
    expect(formEnvelopeOf({ fileName: 'daily.csv', grant, instructions: instructionsOf(grant), length: bytes.length })).toBe(request.body.length - bytes.length)
  })

  it('keeps a grant\'s own boundary and Content-Type exactly, refusing a part that holds that boundary', () => {
    const fields = { headers: { 'Content-Type': 'multipart/form-data; boundary=fixed' }, parameters: { key: 'k' } }
    const request = requestFor(fields)

    expect(request.headers['Content-Type']).toBe('multipart/form-data; boundary=fixed')
    expect(new TextDecoder().decode(request.body).startsWith('--fixed\r\n')).toBe(true)
    expect(() => requestFor(fields, new TextEncoder().encode('a--fixedb'))).toThrow(/boundary/)
  })

  // A renewed grant's form, of no more bytes than the part's earlier form, is made in that form's own memory, the part's
  // bytes moved to where the new form puts them; one that needs more room is refused before anything is changed.
  it('makes a renewed grant\'s form within the part\'s earlier form when it has room, and refuses one that needs more', () => {
    const grantWith = policy => grantFrom({ http_method: 'POST', parameters: { key: 'uploads/a', policy }, partsize: 1024 })
    const build = (grant, partBytes, within = null) => partRequestOf({
      bytes: partBytes,
      fileName: 'daily.csv',
      grant,
      instructions: instructionsOf(grant),
      url: STORAGE_URL,
      within,
    })

    const earlier = build(grantWith('a-long-policy-value'), bytes)
    const renewed = build(grantWith('short'), earlier.body.subarray(earlier.dataOffset, earlier.dataOffset + bytes.length), earlier.body)
    const renewedBytes = renewed.body.subarray(renewed.dataOffset, renewed.dataOffset + bytes.length)
    const renewedText = new TextDecoder().decode(renewed.body)

    expect(renewed.body.buffer).toBe(earlier.body.buffer)
    expect(renewedBytes).toEqual(bytes)
    expect(renewedText).toContain('name="policy"\r\n\r\nshort\r\n')
    expect(() => build(grantWith('a-policy-value-much-longer-than-either'), renewedBytes, earlier.body)).toThrow(/no room/)
    expect(new TextDecoder().decode(renewed.body)).toBe(renewedText)
  })

  it.each([
    ['a bare multipart Content-Type', { headers: { 'Content-Type': 'multipart/form-data' }, parameters: { key: 'k' } }],
    ['a form sent as another type', { headers: { 'Content-Type': 'text/plain' }, parameters: { key: 'k' } }],
    ['a length signed for a form', { parameters: { key: 'k' }, upload_uri: `${STORAGE_URL}&X-Amz-SignedHeaders=content-length` }],
    ['the data in a fixed field', { parameters: { file: 'fixed' } }],
    ['two values in one field', { send: { 'Content-Type': 'required-parameter x', partsize: 'required-parameter x' } }],
    ['the data in a header', { send: { partdata: 'required-header X-Data' } }],
    ['both part and whole-file data', { send: { file: 'body', partdata: 'body' } }],
  ])('refuses a grant with %s', (_, fields) => {
    expect(() => requestFor(fields)).toThrow(FilesError)
  })

  it.each([
    ['a raw length that is not the part\'s', { headers: { 'Content-Length': '1' } }],
    ['a fixed size field that is not the part\'s', { parameters: { size: '1' }, send: { partsize: 'required-parameter size' } }],
    ['a form length its envelope exceeds', { headers: { 'Content-Length': `${bytes.length}` }, parameters: { key: 'k' } }],
    ['a form size in the Content-Length its envelope changes', { parameters: { key: 'k' }, send: { partsize: 'required-header Content-Length' } }],
  ])('refuses a part with %s before it is sent', (_, fields) => {
    expect(() => requestFor(fields)).toThrow(FilesError)
  })
})

describe('Upload sources', () => {
  const noStream = () => { throw new Error('Data in memory should not need a stream factory') }

  // An upload's admission (see uploadSource): budget, its scope's buffer budget, and fileNow(), which here always finds
  // the upload's file admission free.
  const admissionOf = budget => ({ budget, fileNow: () => true })

  // The diagnostic Root ran against the first provisional source, whose copy of a Buffer shared its memory; and the one
  // it ran against the R3 source, which copied a second 8 bytes beyond a 4-byte budget already held beyond its limit.
  // The first copy, larger than the whole budget, is made held alone, as nothing else is held; while it is held, the
  // second is refused, and nothing is copied for it; once the first has been given back, exactly once, the second is
  // made; and a copy that would not fit in what another leaves is refused too.
  it('copies bytes in memory as they are given, within one budget, a copy larger than it held alone, refusing what would exceed it', async () => {
    const budget = byteBudget(4)
    const first = Buffer.alloc(8, 1)
    const second = Buffer.alloc(8, 2)

    const source = dataSourceOf(first, noStream, admissionOf(budget))
    first.fill(9)

    expect(() => dataSourceOf(second, noStream, admissionOf(budget))).toThrow(/cannot be copied now/)
    expect(budget.held).toBe(8)
    expect(Array.from(await source.read(8))).toEqual(Array(8).fill(1))
    expect([source.size, source.views, source.held]).toEqual([8, true, 8])

    source.close()
    source.close()
    expect([budget.held, source.held]).toEqual([0, 0])

    const later = dataSourceOf(second, noStream, admissionOf(budget))
    expect(budget.held).toBe(8)
    later.close()

    const fits = dataSourceOf(Buffer.alloc(3), noStream, admissionOf(budget))
    expect(() => dataSourceOf(Buffer.alloc(2), noStream, admissionOf(budget))).toThrow(/cannot be copied now/)
    expect(budget.held).toBe(3)
    fits.close()
    expect(budget.held).toBe(0)
  })

  // A copy is made only by an upload that has its file admitted at once, so that no upload waits for its file holding
  // room: one larger than the whole budget, held alone, as one that fits. Neither is copied, nor counted, otherwise; a
  // string, which needs no copy, still is not refused.
  it('refuses a copy, of any size, when its upload\'s file cannot be admitted at once, holding nothing for it', async () => {
    const budget = byteBudget(4)
    const noFile = { budget, fileNow: () => false }

    expect(() => dataSourceOf(Buffer.alloc(8), noStream, noFile)).toThrow(/only alone/)
    expect(() => dataSourceOf(Buffer.alloc(3), noStream, noFile)).toThrow(/cannot be copied now: the transfer job has no file admission free/)
    expect(budget.held).toBe(0)

    const text = dataSourceOf('abc', noStream, noFile)
    expect(Buffer.from(await text.read(4)).toString()).toBe('abc')
    expect(budget.held).toBe(0)
  })

  it('sizes strings as their UTF-8, without encoding them, and copies an array of strings and bytes in order', async () => {
    const strings = ['', 'a', 'é', '€', '😀', '\ud800', 'a\udc00b']
    expect(strings.map(utf8Length)).toEqual(strings.map(string => new TextEncoder().encode(string).length))

    const bytes = Buffer.from('b')
    const source = dataSourceOf(['aé', bytes, '€'], noStream)
    bytes.fill('x')

    expect(Buffer.from(await source.read(16)).toString()).toBe('aéb€')
    expect(source.size).toBe(7)
  })

  // Strings cannot change, so they are encoded only as each part is read, with no copy beforehand: but the array that
  // holds them can, and the upload keeps its strings as they were at the call.
  it('reads strings, which need no copy, part by part, keeping an array\'s strings as they were when given', async () => {
    const budget = byteBudget(4)
    const strings = ['aé', '€z']
    const source = dataSourceOf(strings, noStream, admissionOf(budget))
    strings.push('more')
    strings[0] = 'changed'

    const parts = []
    let part = await source.read(3)

    while (part !== null) {
      parts.push(Buffer.from(part).toString('latin1'))
      // eslint-disable-next-line no-await-in-loop
      part = await source.read(3)
    }

    expect(Buffer.from(parts.join(''), 'latin1').toString()).toBe('aé€z')
    expect([source.size, source.views, budget.held]).toEqual([7, false, 0])
  })

  // Parts of two bytes split both é and € between parts, as bytes, never as characters. Part 4 takes the byte chunk,
  // copying its rest, which the caller's change to the chunk then cannot reach.
  it('takes a stream\'s chunks whole as its parts need them, a character\'s UTF-8 split between parts included, each part a buffer of its own', async () => {
    const chunk = Buffer.from('wxyz')
    const source = streamSource(Readable.from(['aé€', chunk]))

    const parts = []
    let part = await source.read(2)

    while (part !== null) {
      parts.push(part)

      if (parts.length === 4) {
        chunk.fill('!')
      }

      // eslint-disable-next-line no-await-in-loop
      part = await source.read(2)
    }

    expect(Buffer.concat(parts.map(each => Buffer.from(each))).equals(Buffer.from('aé€wxyz'))).toBe(true)
    expect(parts.map(each => each.length)).toEqual([2, 2, 2, 2, 2])
    expect(parts.every(each => each.buffer !== chunk.buffer)).toBe(true)
  })

  // A budget of 10 bytes: another upload holds 8, and this upload's part 2. Its stream gives an ordinary chunk of 5
  // bytes: the rest, 3, which must be copied as the chunk is taken, fits neither the budget nor the reader's reserve, of
  // none, and the upload does not hold the budget alone, so the read is refused before anything is copied, counted or
  // kept. Given room besides its part, as its reader reserves for it, the same chunk's rest is copied within that room,
  // the budget never holding more than its limit, and the bytes the parts then take are the chunk's as it was given.
  it('copies the rest of a stream\'s chunk only within room it has, refusing it beside another upload\'s bytes before copying anything', async () => {
    const budget = byteBudget(10)
    const other = admissionOf(budget)
    const refused = admissionOf(budget)
    const reserved = admissionOf(budget)

    await budget.acquire(8, undefined, 0, other)
    await budget.acquire(2, undefined, 0, refused)
    const refusing = streamSource(Readable.from([Buffer.from([1, 2, 3, 4, 5])]), { admission: refused })

    await expect(refusing.read(2, { holding: 2, reserve: 0 })).rejects.toThrow(/has no room for them beside what other uploads hold/)
    expect([budget.held, refusing.held]).toEqual([10, 0])

    budget.release(2)
    budget.release(3)
    await budget.acquire(5, undefined, 0, reserved)
    const chunk = Buffer.from([6, 7, 8, 9, 10])
    const reserving = streamSource(Readable.from([chunk]), { admission: reserved })
    const hooks = { holding: 2, reserve: 3 }

    const first = await reserving.read(2, hooks)
    chunk.fill(0)

    expect([Array.from(first), hooks.reserve, reserving.held, budget.held]).toEqual([[6, 7], 0, 3, 10])
    expect(Array.from(await reserving.read(3, { holding: 0, reserve: 0 }))).toEqual([8, 9, 10])
    expect([reserving.held, budget.held]).toEqual([0, 7])
  })

  // Two uploads share a budget of 4 bytes. The first, holding only its part of 2, takes a chunk of 10 bytes into it: the
  // rest, 8 bytes, is copied at once, admitted beyond the limit, as nothing but the first upload's own bytes is held. The
  // second, about to take a chunk whose size it cannot know, waits without taking it until the first's copy has been
  // taken, all of it, and given back.
  it('admits the rest of a chunk at once, beyond the budget, to one upload at a time, another waiting before it takes anything', async () => {
    const shared = byteBudget(4)
    const firstUpload = admissionOf(shared)
    const secondUpload = admissionOf(shared)
    const firstStream = Readable.from([Buffer.alloc(10, 1)])
    const secondStream = new Readable({ read() {} })
    secondStream.push(Buffer.alloc(2, 2))

    const first = streamSource(firstStream, { admission: firstUpload })
    const second = streamSource(secondStream, { admission: secondUpload })

    await shared.acquire(2, undefined, 0, firstUpload)
    expect(Array.from(await first.read(2, { holding: 2 }))).toEqual([1, 1])
    expect([shared.held, first.held, shared.isOpen(secondUpload)]).toEqual([10, 8, false])

    const waiting = second.read(2, { holding: 0 })
    await settle()

    expect(secondStream.readableLength).toBe(2)
    expect(await settledYet(waiting)).toBe(false)

    shared.release(2)
    const rest = []

    for (let index = 0; index < 4; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      rest.push(...Array.from(await first.read(2, { holding: 0 })))
    }

    expect(rest).toEqual(Array(8).fill(1))
    expect([shared.held, first.held]).toEqual([0, 0])
    expect(Array.from(await waiting)).toEqual([2, 2])
  })

  it('takes nothing from a stream while paused, a look ahead for its end included, and stops a wait with its signal\'s exact reason, leaving no listener', async () => {
    const stream = new Readable({ read() {} })
    const control = new TransferControl()
    const source = streamSource(stream)
    const listeners = () => ['close', 'end', 'readable'].map(event => stream.listenerCount(event))

    control.pause()
    const ended = source.atEnd({ whenRunning: () => control._whenRunning() })
    stream.push('data')
    await settle()

    expect(stream.readableLength).toBe(4)

    control.resume()
    expect(await ended).toBe(false)

    const stop = new AbortController()
    const reason = { cause: 'stopped while waiting' }
    await source.read(4)
    const waiting = source.read(4, { signal: stop.signal })
    await settle()
    stop.abort(reason)

    await expect(waiting).rejects.toBe(reason)
    expect(listeners()).toEqual([0, 0, 0])
    expect(stream.destroyed).toBe(false)

    source.close()
    expect(stream.listenerCount('error')).toBe(0)
  })

  it('refuses a chunk that is neither a string nor bytes', async () => {
    const source = streamSource(Readable.from([{ line: 1 }]))
    await expect(source.read(4)).rejects.toThrow(InvalidParameterError)
  })
})
