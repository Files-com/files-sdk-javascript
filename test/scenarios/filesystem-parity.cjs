'use strict'

// The filesystem parity case: the cases of the native reference (test/support/filesystem-parity.cjs), each one
// consumer, run unchanged against Node.js's own fs/promises, on a local directory, and against this SDK's client.fs, on
// the Files.com Mock API Server. Rendered from targets/javascript/test/scenarios/__filesystem_parity.cjs. test.sh runs
// it under the Mock's with-scenario.rb, loaded with the api-scenarios-canonical preset, which gives it the FILES_MOCK_*
// variables, with the Mock's directory as its only argument.
//
// client.fs is the SDK's own, on a client of the run's API key and the Mock's URL that sends through Node.js's own
// fetch: nothing stands between it and the Mock. On Files.com each case runs in a folder of its own, under the run's
// owned folder, a new name for each run, which must not exist before the run creates it. The case's files and folders
// are made there, and their bytes read back, by plain requests of the Files.com API (an upload's begin_upload, part
// and completion, a folder's creation, a download's URL and bytes), never through the SDK: they set up and read only
// data, never a file handle, cursor or directory. Node.js's own result must be the reference's, client.fs's must be
// Node.js's, and every stage directory a file handle made during the case must be gone once it ends. For a case that
// names the metadata lookups its client.fs work makes (METADATA_LOOKUPS), the Mock's journal, read and checked just
// before and just after that work, must show exactly those, in order, each answered 200. The Mock's readiness and
// journal, read at the start and at the end, must be those of the server this run's launcher started, reset once with
// the shared definition. Whatever the outcome, the run then removes the owned folder and everything in it, once nothing
// of its cases is still under way, and the local directory and any stage directory left; the first failure stays the
// outcome. The whole run keeps, by the monotonic clock, within the 210 s the launcher gives it. Its receipt,
// javascript-filesystem-parity.json in FILES_MOCK_OUT, records each case and what each side gave. It runs no position
// of the shared scenarios and is evidence for none.

// When this process began its work, on the monotonic clock every deadline here is measured by.
const STARTED = performance.now()

const crypto = require('crypto')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { inspect, isDeepStrictEqual } = require('util')

// The definition the Mock was reset with, and the Swagger document this SDK and this file were generated from.
const DEFINITION_SHA256 = '5d9b8eff0ef0724a68a458db77dc85784bb7d24436f104b98c2a2fe67086bbe0'
const DEFINITION_FORMAT = 'files-api-scenarios'
const DEFINITION_FORMAT_VERSION = 1
const SWAGGER_SHA256 = '97c97b35811dacc1f99889cefbff3ff68d382632814e897a39c0986ffb8be491'

// The cases of the native reference, by id and in its order: the run fails unless the reference holds exactly these.
const CASE_IDS = [
  'position-and-utf8',
  'closed-read',
  'truncate-vectors',
  'directory-read-and-close',
  'directory-iterator-early-exit',
  'handle-stream',
  'unicode-string-and-buffer-path',
]

// The run must end within the 210 s with-scenario.rb gives it, from STARTED: the cases, their setup and the first reads
// of the Mock included, by 175 s, within the 180 s case work may take; then a reserve for removing what the run created,
// reading the Mock at the end and writing the receipt, which ends 30 s after it begins or at 205 s, whichever is sooner,
// so that a run that fails early leaves it no more than its 30 s; the last 5 s are for Node.js to start before STARTED
// and to exit after the receipt.
const CASE_DEADLINE_MS = 175 * 1000
const RESERVE_MS = 30 * 1000
const RESERVE_DEADLINE_MS = 205 * 1000
const LAUNCHER_SECONDS = 210

// How often the end of a side still under way is looked for, before anything is removed or the Mock read at the end.
const SETTLE_POLL_MS = 50

// The contract of the Mock's control routes and journal that this file reads.
const CONTRACT_VERSION = 3
const READY_ROUTE = '/__files_mock/v1/ready'
const JOURNAL_ROUTE = '/__files_mock/v1/journal'

// The Files.com API under the Mock's URL, the answer to a request that creates what it names, and to a lookup of what is
// not there.
const API_PREFIX = '/api/rest/v1'
const CREATED = 201
const NOT_FOUND = 404

// The API key with-scenario.rb makes for a run: synthetic, never one of Files.com's.
const SYNTHETIC_API_KEY = /^filesmock[A-Za-z0-9]+$/

// How the name of each stage directory a file handle of the SDK makes for its file's bytes begins.
const STAGE_PREFIX = 'files-sdk-fs-'

const RECEIPT_FILE = 'javascript-filesystem-parity.json'
const RECEIPT_FORMAT = 'files-sdk-javascript-filesystem-parity/1'

// The SDK's public client, a CommonJS module that is also its own default giving the same, and the native reference.
const LIB = path.resolve(__dirname, '..', '..', 'lib')
const exportOf = loaded => (loaded && loaded.default ? loaded.default : loaded)
const FilesClient = exportOf(require(path.join(LIB, 'FilesClient')))
const { REFERENCE, UNICODE_PATH } = require(path.resolve(__dirname, '..', 'support', 'filesystem-parity.cjs'))

// The API's metadata lookups, by their path below the API, and as the Mock's journal names them, below its URL.
const METADATA_PATH = '/file_actions/metadata/'
const METADATA_ROUTE = `${API_PREFIX}${METADATA_PATH}`

// The metadata lookups a case's client.fs work must make, by case id, in order, as paths in the case's own folder: only
// the Unicode case's, whose two reads, of the path as a string and of a Buffer of its UTF-8 bytes, each look it up once.
const METADATA_LOOKUPS = {
  'unicode-string-and-buffer-path': [ UNICODE_PATH, UNICODE_PATH ],
}

const nativeFetch = globalThis.fetch

// Every side of a case not yet settled, which a deadline may have stopped waiting for; and every stage directory a file
// handle made, in order.
const pendingSides = new Set()
const stages = []

const truncate = text => (text.length > 1000 ? `${text.slice(0, 1000)}...` : text)

const describe = error => {
  if (!(error instanceof Error)) {
    return truncate(String(error))
  }

  const details = [ error.type, error.code ].filter(detail => detail !== undefined && detail !== null).join(' ')
  return truncate(`${error.name}: ${error.message}${details ? ` (${details})` : ''}`)
}

const show = value => truncate(inspect(value, { breakLength: Infinity, depth: 6 }))

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

const env = name => {
  const value = process.env[name]

  if (typeof value !== 'string' || value === '') {
    throw new Error(`${name} is not set: run this file through the Mock's with-scenario.rb`)
  }

  return value
}

// One phase of the run, ending deadlineMs after STARTED by the monotonic clock: its signal aborts then, with what ran
// out of time as its reason, and check() fails anything settling later, before it counts, however late the timer runs.
const phase = (deadlineMs, what) => {
  const controller = new AbortController()
  const deadline = STARTED + deadlineMs
  const expired = () => performance.now() >= deadline
  const stop = () => controller.abort(new Error(`${what} ran out of time, ${deadlineMs / 1000} s after the run began`))
  const timer = setTimeout(stop, Math.max(0, deadline - performance.now()))

  return {
    check: () => {
      if (!controller.signal.aborted && expired()) {
        stop()
      }

      if (controller.signal.aborted) {
        throw controller.signal.reason
      }
    },
    end: () => clearTimeout(timer),
    expired,
    signal: controller.signal,
  }
}

// promise's outcome, or signal's reason once it aborts first, promise then left to settle on its own.
const raceAbort = (promise, signal) => new Promise((resolve, reject) => {
  const onAbort = () => reject(signal.reason)

  promise.then(value => {
    signal.removeEventListener('abort', onAbort)
    resolve(value)
  }, error => {
    signal.removeEventListener('abort', onAbort)
    reject(error)
  })

  if (signal.aborted) {
    onAbort()
    return
  }

  signal.addEventListener('abort', onAbort, { once: true })
})

// Whether every side of the cases has settled, waiting for them until current's phase ends: nothing on the Mock is
// removed, nor the Mock read at the end, while one of them may still act.
const settled = async current => {
  while (pendingSides.size > 0) {
    if (current.expired() || current.signal.aborted) {
      return false
    }

    await new Promise(resolve => { setTimeout(resolve, SETTLE_POLL_MS) })
  }

  return true
}

// Records each stage directory a file handle makes, without changing it, as the unit tests do: fs.promises.mkdtemp
// makes every directory as before, and each whose name is a stage's is recorded. Returns what puts it back.
const observeStages = () => {
  const original = fs.promises.mkdtemp
  const mkdtemp = original.bind(fs.promises)

  fs.promises.mkdtemp = async (...args) => {
    const made = await mkdtemp(...args)

    if (path.basename(made).startsWith(STAGE_PREFIX)) {
      stages.push(made)
    }

    return made
  }

  return () => {
    fs.promises.mkdtemp = original
  }
}

const encodePath = filePath => filePath.split('/').map(encodeURIComponent).join('/')

const parsed = text => {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

// One request of the Files.com API for filePath, within current's phase, sent with the run's API key and, given body,
// that body as JSON: its status and its body, read in full.
const apiRequest = async (site, current, method, route, filePath, { body, query = '' } = {}) => {
  const headers = { Accept: 'application/json', 'X-FilesAPI-Key': site.apiKey }
  const init = { headers, method, signal: current.signal }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const url = `${site.url}${API_PREFIX}/${route}/${encodePath(filePath)}${query}`
  const response = await raceAbort(nativeFetch(url, init), current.signal)
  const text = await raceAbort(response.text(), current.signal)
  current.check()
  return { body: parsed(text), status: response.status }
}

// One request to a transfer URL an answer of the API gave, within current's phase: only on the Mock's own origin, and
// sending no API key, which a transfer URL needs none of. Its status, headers and body's bytes, read in full.
const transferRequest = async (site, current, url, init) => {
  let target = null

  try {
    target = new URL(url)
  } catch {
    target = null
  }

  if (target === null || target.origin !== site.url) {
    throw new Error(`The API gave a transfer URL ${target === null ? 'that is not one' : `on ${target.origin}`}, not on the Mock at ${site.url}`)
  }

  const response = await raceAbort(nativeFetch(target.href, { ...init, signal: current.signal }), current.signal)
  const bytes = Buffer.from(await raceAbort(response.arrayBuffer(), current.signal))
  current.check()
  return { bytes, headers: response.headers, status: response.status }
}

// An answer's status, with the type and title of the API's error when it gives one.
const answerOf = answer => {
  const { body } = answer
  const error = isObject(body) && typeof body.type === 'string' ? ` ${body.type}` : ''
  const title = isObject(body) && typeof body.title === 'string' ? ` (${body.title})` : ''
  return `${answer.status}${error}${title}`
}

const expectStatus = (answer, expected, what) => {
  if (!expected.includes(answer.status)) {
    throw new Error(`${what} answered ${answerOf(answer)}, not ${expected.join(' or ')}`)
  }
}

// Creates the folder folderPath, which must not exist, by the API's own request: answered 201.
const createFolder = async (site, current, folderPath) => {
  const answer = await apiRequest(site, current, 'POST', 'folders', folderPath, { body: {} })
  expectStatus(answer, [ CREATED ], `Creating the folder ${folderPath}`)
}

// Makes the file filePath, which must not exist, holding content's bytes, by the API's own upload: begin_upload of one
// part, that part's bytes sent to the URL it gives, and the upload's completion, which lists the part, numbered 1, by
// the ETag its send answered, answered 201.
const upload = async (site, current, filePath, content) => {
  const bytes = Buffer.from(content)
  const begun = await apiRequest(site, current, 'POST', 'file_actions/begin_upload', filePath, { body: { size: bytes.length } })
  expectStatus(begun, [ 200, CREATED ], `Beginning the upload of ${filePath}`)
  const parts = Array.isArray(begun.body) ? begun.body : [ begun.body ]
  const [part] = parts

  if (parts.length !== 1 || !isObject(part) || typeof part.upload_uri !== 'string' || typeof part.ref !== 'string') {
    throw new Error(`Beginning the upload of ${filePath} gave no one part to send`)
  }

  const sent = await transferRequest(site, current, part.upload_uri, {
    body: bytes,
    headers: { 'Content-Type': 'application/octet-stream' },
    method: typeof part.http_method === 'string' ? part.http_method : 'PUT',
  })
  const etag = sent.headers.get('etag')

  if (sent.status < 200 || sent.status > 299 || etag === null || etag === '') {
    throw new Error(`Sending the bytes of ${filePath} answered ${sent.status}${etag ? '' : ' with no ETag'}`)
  }

  const completed = await apiRequest(site, current, 'POST', 'files', filePath, {
    body: { action: 'end', etags: [ { etag, part: 1 } ], ref: part.ref, size: bytes.length },
  })
  expectStatus(completed, [ CREATED ], `Completing the upload of ${filePath}`)
}

// The bytes of the file filePath as Files.com holds them, by the API's own download: the whole file, from the URL its
// lookup gives.
const download = async (site, current, filePath) => {
  const answer = await apiRequest(site, current, 'GET', 'files', filePath)
  expectStatus(answer, [ 200 ], `Looking up the download of ${filePath}`)

  if (!isObject(answer.body) || typeof answer.body.download_uri !== 'string') {
    throw new Error(`Looking up the download of ${filePath} gave no download URL`)
  }

  const received = await transferRequest(site, current, answer.body.download_uri, { method: 'GET' })

  if (received.status !== 200) {
    throw new Error(`Downloading ${filePath} answered ${received.status}`)
  }

  return received.bytes
}

// Removes the run's owned folder and everything in it by the API's own request, and checks that it is gone: the removal
// answered with success, then a lookup of it with 404.
const removeOwned = async (site, current) => {
  const removal = await apiRequest(site, current, 'DELETE', 'files', site.root, { query: '?recursive=true' })
  expectStatus(removal, [ 200, 204 ], `Removing the owned folder ${site.root}`)
  const lookup = await apiRequest(site, current, 'GET', 'file_actions/metadata', site.root)
  expectStatus(lookup, [ NOT_FOUND ], `Looking up the owned folder ${site.root} once removed`)
}

// Node.js's own fs/promises, in a directory of the case's own under the local directory, which the side's data is made
// in and read back from directly.
const nativeSide = (directory, name) => {
  const root = path.join(directory, name)
  fs.mkdirSync(root)

  return {
    at: entry => path.join(root, entry),
    bytesOf: entry => fs.readFileSync(path.join(root, entry)),
    fsys: fs.promises,
    mkdir: entry => fs.mkdirSync(path.join(root, entry)),
    seed: (entry, content) => fs.writeFileSync(path.join(root, entry), content),
  }
}

// This SDK's client.fs, in a folder of the case's own under the owned folder, created for it, whose data is made and
// read back by the API's own requests (createFolder(), upload() and download()), within current's phase.
const remoteSide = async (site, current, name) => {
  const root = `${site.root}/${name}`
  await createFolder(site, current, root)

  return {
    at: entry => `${root}/${entry}`,
    bytesOf: entry => download(site, current, `${root}/${entry}`),
    fsys: site.client.fs,
    mkdir: entry => createFolder(site, current, `${root}/${entry}`),
    seed: (entry, content) => upload(site, current, `${root}/${entry}`, content),
  }
}

// One side of a case, run within current's phase: what its consumer returned, settled within the phase; or, once the
// phase ends first, its abort, the side then left pending, to settle on its own.
const runSide = async (run, current) => {
  current.check()
  const side = Promise.resolve().then(run)
  const forget = () => {
    pendingSides.delete(side)
  }

  pendingSides.add(side)
  side.then(forget, forget)
  const result = await raceAbort(side, current.signal)
  current.check()
  return result
}

// The native reference: exactly the cases of CASE_IDS, in that order, each with its consumer and its result.
const checkReference = () => {
  const ids = Array.isArray(REFERENCE) ? REFERENCE.map(entry => (Array.isArray(entry) ? entry[0] : null)) : null

  if (!isDeepStrictEqual(ids, CASE_IDS)) {
    throw new Error(`The native reference holds the cases ${show(ids)}, not exactly ${show(CASE_IDS)}`)
  }

  const incomplete = REFERENCE.find(([, consumer, reference]) => typeof consumer !== 'function' || !isObject(reference))

  if (incomplete !== undefined) {
    throw new Error(`The native reference's case ${incomplete[0]} has no consumer or no result`)
  }
}

// Runs every case of the reference in order within current's phase, each against Node.js's own fs/promises and then
// against client.fs: Node.js's result must be the reference's, client.fs's Node.js's, every stage directory a file
// handle made during the case gone once it ends, and, for a case of METADATA_LOOKUPS, the metadata lookups its client.fs
// work made, as the Mock's journal shows them between checked reads of it just before and just after that work, exactly
// those, in order, each answered 200. A failed case is recorded, the first failure the run's, and the next case runs,
// unless a side of it is still under way, the phase then over.
const runCases = async (receipt, site, current) => {
  for (const [index, [id, consumer, reference]] of REFERENCE.entries()) {
    const record = receipt.cases[index]
    const firstStage = stages.length
    const lookups = METADATA_LOOKUPS[id] ?? null

    try {
      const native = await runSide(() => consumer(nativeSide(site.localDirectory, id)), current)
      record.native = native
      const remote = await runSide(async () => {
        const side = await remoteSide(site, current, id)

        if (lookups === null) {
          return consumer(side)
        }

        const before = await readJournal(receipt.mock, current, 'before the case')
        const result = await consumer(side)
        const after = await readJournal(receipt.mock, current, 'after the case')
        record.metadata = metadataLookupsAfter(after, lastSeq(before))
        return result
      }, current)
      record.remote = remote
      const made = stages.slice(firstStage)
      const left = made.filter(stage => fs.existsSync(stage))
      record.stages = { left: left.length, made: made.length }

      if (!isDeepStrictEqual(native, reference)) {
        throw new Error(`Node.js's own fs/promises gave ${show(native)}, not the native reference's ${show(reference)}`)
      }

      if (!isDeepStrictEqual(remote, native)) {
        throw new Error(`client.fs gave ${show(remote)}, not Node.js's own ${show(native)}`)
      }

      if (left.length > 0) {
        throw new Error(`${left.length} of the ${made.length} stage directories its file handles made were left once it ended`)
      }

      if (lookups !== null) {
        const expected = lookups.map(name => ({ path: `GET ${METADATA_PATH}${site.root}/${id}/${name}`, status: 200 }))

        if (!isDeepStrictEqual(record.metadata, expected)) {
          throw new Error(`client.fs's metadata lookups were ${show(record.metadata)}, not ${show(expected)}`)
        }
      }

      current.check()
      record.outcome = 'passed'
    } catch (error) {
      record.outcome = 'failed'
      record.failure = describe(error)

      if (receipt.failure === null) {
        receipt.failure = { message: record.failure, where: `case ${id}` }
      }

      if (pendingSides.size > 0) {
        return
      }
    }
  }
}

// Within current's phase, the reserve, whatever the outcome: once every side of the cases has settled, removes the
// owned folder, which must then be gone; and, settled or not, puts fs.promises.mkdtemp back and removes the local
// directory and every stage directory a file handle left. Nothing on the Mock is removed while a side may still act.
const cleanUp = async (site, restoreStages, current) => {
  const cleanup = { failures: [], local_removed: false, owned: null, settled: false, stages_left: 0 }
  cleanup.settled = await settled(current)

  if (site.owned) {
    if (!cleanup.settled) {
      cleanup.owned = { path: site.root, result: 'kept' }
      cleanup.failures.push(`Sides of the cases were still under way when the reserve ran out, so ${site.root} was not removed`)
    } else {
      try {
        await removeOwned(site, current)
        cleanup.owned = { path: site.root, result: 'removed' }
      } catch (error) {
        cleanup.owned = { path: site.root, result: 'failed' }
        cleanup.failures.push(describe(error))
      }
    }
  }

  restoreStages()
  const left = stages.filter(stage => fs.existsSync(stage))
  cleanup.stages_left = left.length

  try {
    left.forEach(stage => fs.rmSync(stage, { force: true, recursive: true }))

    if (site.localDirectory !== null) {
      fs.rmSync(site.localDirectory, { force: true, recursive: true })
      cleanup.local_removed = true
    }
  } catch (error) {
    cleanup.failures.push(describe(error))
  }

  return cleanup
}

// One of the Mock's control routes, which reading changes nothing, read within current's phase: its JSON.
const readControl = async (origin, route, current) => {
  const response = await raceAbort(nativeFetch(`${origin}${route}`, { signal: current.signal }), current.signal)

  if (response.status !== 200) {
    throw new Error(`The Mock's ${route} answered ${response.status}`)
  }

  const body = await raceAbort(response.json(), current.signal)
  current.check()
  return body
}

// Whether identity names exactly the shared definition, as the Mock names the one it was reset with.
const isDefinition = identity => isObject(identity) &&
  Object.keys(identity).sort().join(',') === 'definition_sha256,format,format_version' &&
  identity.format === DEFINITION_FORMAT && identity.format_version === DEFINITION_FORMAT_VERSION &&
  identity.definition_sha256 === DEFINITION_SHA256

// The Mock's readiness, at the start or at the end: the server this run's launcher started, by its instance, in
// simulation, on the contract this file reads, reporting the schema subset generated from this SDK's Swagger document,
// reset once with exactly the shared definition, with its catalogue of operations.
const checkReady = (ready, mock, when) => {
  if (!isObject(ready)) {
    throw new Error(`The Mock's readiness ${when} is not an object`)
  }

  const problems = [
    ready.status === 'ready' ? null : `status ${JSON.stringify(ready.status)}`,
    ready.mode === 'simulation' ? null : `mode ${JSON.stringify(ready.mode)}`,
    ready.contract_version === CONTRACT_VERSION ? null : `contract version ${JSON.stringify(ready.contract_version)}`,
    ready.instance === mock.instance ? null : `instance ${JSON.stringify(ready.instance)}, not ${mock.instance}`,
    ready.schema_sha256 === mock.schema_sha256 ? null : `schema ${JSON.stringify(ready.schema_sha256)}, not ${mock.schema_sha256}`,
    ready.epoch === 1 ? null : `epoch ${JSON.stringify(ready.epoch)}, not 1`,
    isObject(ready.profile) && isDefinition(ready.profile.api_scenarios) ? null : 'a profile not reset with the shared definition',
    Array.isArray(ready.operations) ? null : 'no catalogue of operations',
  ].filter(problem => problem !== null)

  if (problems.length > 0) {
    throw new Error(`The Mock's readiness ${when} is not this run's: ${problems.join('; ')}`)
  }
}

// The Mock's journal, at the start or at the end: of this run's instance, reset once with exactly the shared
// definition, and complete.
const checkJournalIdentity = (journal, mock, when) => {
  if (!isObject(journal)) {
    throw new Error(`The Mock's journal ${when} is not an object`)
  }

  const problems = [
    journal.instance === mock.instance ? null : `instance ${JSON.stringify(journal.instance)}, not ${mock.instance}`,
    journal.epoch === 1 ? null : `epoch ${JSON.stringify(journal.epoch)}, not 1`,
    isDefinition(journal.api_scenarios) ? null : 'not reset with the shared definition',
    journal.complete === true && journal.dropped === 0
      ? null : `complete ${JSON.stringify(journal.complete)}, dropped ${JSON.stringify(journal.dropped)}`,
    Array.isArray(journal.entries) ? null : 'no entries',
  ].filter(problem => problem !== null)

  if (problems.length > 0) {
    throw new Error(`The Mock's journal ${when} is not this run's: ${problems.join('; ')}`)
  }
}

// The Mock's journal now, read within current's phase and checked as at the start and at the end (see
// checkJournalIdentity()): of this run's instance, reset once with the shared definition, and complete.
const readJournal = async (mock, current, when) => {
  const journal = await readControl(mock.url, JOURNAL_ROUTE, current)
  checkJournalIdentity(journal, mock, when)
  return journal
}

// The sequence number of the last request a journal holds, or 0 when it holds none.
const lastSeq = journal => journal.entries.reduce((last, entry) => Math.max(last, entry.seq), 0)

// The API's metadata lookups a journal holds after the request numbered after: every GET of the metadata route, not only
// those of a path expected, in the journal's order, each as its method and its path below the API, decoded once, as the
// API reads it, with the status it was answered with. A path that cannot be decoded is kept as it came, marked so.
const metadataLookupsAfter = (journal, after) => journal.entries
  .filter(entry => entry.seq > after && entry.method === 'GET' && String(entry.path).startsWith(METADATA_ROUTE))
  .map(entry => {
    let decoded = null

    try {
      decoded = decodeURIComponent(entry.path.slice(API_PREFIX.length))
    } catch {
      decoded = `${entry.path} (not decodable)`
    }

    return { path: `GET ${decoded}`, status: entry.status }
  })

// The Mock the launcher started for this run: on loopback only, with the instance the launcher chose and gave only to
// it, generated from this SDK's own Swagger document, and reporting the schema subset generated from it. The launcher
// ran this file only once the server reported that instance, simulation mode, contract version 3 and that schema.
const checkMock = mockDirectory => {
  const mock = {
    epoch: null,
    generation: null,
    host: env('FILES_MOCK_SERVER_HOST'),
    identity: null,
    instance: env('FILES_MOCK_INSTANCE'),
    port: env('FILES_MOCK_SERVER_PORT'),
    run_id: env('FILES_MOCK_RUN_ID'),
    scenario: env('FILES_MOCK_SCENARIO'),
    schema_sha256: env('FILES_MOCK_SCHEMA_SHA256'),
    url: env('FILES_MOCK_SERVER_URL'),
  }
  const url = new URL(mock.url)

  if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1' || mock.host !== '127.0.0.1' || url.port !== mock.port ||
      url.origin !== mock.url) {
    throw new Error(`The Mock is not on loopback as with-scenario.rb starts it: ${mock.url}`)
  }

  if (!/^[0-9a-f]{12}$/.test(mock.instance)) {
    throw new Error(`The Mock's instance is not one with-scenario.rb chooses: ${mock.instance}`)
  }

  if (!mockDirectory) {
    throw new Error('The Mock\'s directory was not given')
  }

  const generation = JSON.parse(fs.readFileSync(path.join(mockDirectory, 'lib', 'simulation', 'generation.json'), 'utf8'))
  mock.generation = {
    schema_sha256: generation ? generation.schema_sha256 : undefined,
    swagger_sha256: generation && generation.swagger ? generation.swagger.sha256 : undefined,
  }

  if (mock.generation.swagger_sha256 !== SWAGGER_SHA256) {
    throw new Error(`The Mock in ${mockDirectory} was generated from the Swagger document ${mock.generation.swagger_sha256}, not this SDK's ${SWAGGER_SHA256}`)
  }

  if (mock.generation.schema_sha256 !== mock.schema_sha256) {
    throw new Error(`The Mock reported the schema ${mock.schema_sha256}, not ${mock.generation.schema_sha256}, which was generated from this SDK's Swagger document`)
  }

  return mock
}

const main = async () => {
  const out = env('FILES_MOCK_OUT')
  const receipt = {
    budgets: {
      case_deadline_seconds: CASE_DEADLINE_MS / 1000,
      launcher_seconds: LAUNCHER_SECONDS,
      reserve_deadline_seconds: RESERVE_DEADLINE_MS / 1000,
    },
    cases: CASE_IDS.map(id => ({ failure: null, id, native: null, outcome: 'not_run', remote: null, stages: null })),
    cleanup: null,
    control: { final: null, initial: null },
    definition_sha256: DEFINITION_SHA256,
    elapsed_seconds: null,
    ended_at: null,
    failure: null,
    format: RECEIPT_FORMAT,
    journal: null,
    mock: null,
    outcome: 'failed',
    started_at: new Date().toISOString(),
    swagger_sha256: SWAGGER_SHA256,
  }

  const fail = (where, error) => {
    if (receipt.failure === null) {
      receipt.failure = { message: describe(error), where }
    }
  }

  // Where the cases run: the Mock's URL and this run's own API key, which nothing records; the client whose client.fs
  // they use; the owned folder, and whether this run created it; and the local directory of Node.js's own files.
  const site = { apiKey: null, client: null, localDirectory: null, owned: false, root: null, url: null }
  const restoreStages = observeStages()

  // The cases, with their setup and the first reads of the Mock.
  const casePhase = phase(CASE_DEADLINE_MS, 'The cases')

  try {
    const mock = checkMock(process.argv[2])
    receipt.mock = mock
    const ready = await readControl(mock.url, READY_ROUTE, casePhase)
    checkReady(ready, mock, 'at the start')
    const journal = await readControl(mock.url, JOURNAL_ROUTE, casePhase)
    checkJournalIdentity(journal, mock, 'at the start')

    if (journal.entries.length !== 0) {
      throw new Error(`The Mock had already received ${journal.entries.length} API requests`)
    }

    mock.epoch = journal.epoch
    mock.identity = journal.api_scenarios
    receipt.control.initial = { instance: ready.instance, journal_epoch: journal.epoch, ready_epoch: ready.epoch }
    checkReference()
    site.apiKey = env('FILES_MOCK_API_KEY')

    if (!SYNTHETIC_API_KEY.test(site.apiKey)) {
      throw new Error('FILES_MOCK_API_KEY is not an API key with-scenario.rb makes')
    }

    site.url = mock.url
    site.client = new FilesClient({ apiKey: site.apiKey, baseUrl: mock.url, maxNetworkRetries: 0 })
    site.localDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'files-fs-parity-native-'))
    site.root = `js-fs-parity-${mock.run_id.replace(/[^A-Za-z0-9-]/g, '').slice(0, 64)}-${crypto.randomBytes(6).toString('hex')}`
    await createFolder(site, casePhase, site.root)
    site.owned = true
    casePhase.check()
  } catch (error) {
    fail('setup', error)
  }

  if (receipt.failure === null) {
    await runCases(receipt, site, casePhase)
  }

  // Exactly the cases of CASE_IDS, each complete: one missing, failed or never reached fails the run.
  const incomplete = receipt.cases.filter(record => record.outcome !== 'passed')

  if (incomplete.length > 0) {
    const outcomes = incomplete.map(record => `${record.id} ${record.outcome}`).join(', ')
    fail('cases', new Error(`${incomplete.length} of the ${CASE_IDS.length} cases did not pass: ${outcomes}`))
  }

  casePhase.end()

  // The reserve: removing what the run created, reading the Mock at the end, and the receipt; it ends RESERVE_MS after
  // it begins or RESERVE_DEADLINE_MS after STARTED, whichever is sooner.
  const reserveEndMs = Math.min(RESERVE_DEADLINE_MS, Math.floor(performance.now() - STARTED) + RESERVE_MS)
  const reserve = phase(reserveEndMs, 'The reserve for ending the run')

  try {
    receipt.cleanup = await cleanUp(site, restoreStages, reserve)
  } catch (error) {
    receipt.cleanup = { failures: [ describe(error) ], local_removed: false, owned: null, settled: false, stages_left: null }
  }

  if (receipt.cleanup.failures.length > 0) {
    fail('cleanup', new Error(receipt.cleanup.failures[0]))
  }

  if (receipt.mock !== null) {
    try {
      const ready = await readControl(receipt.mock.url, READY_ROUTE, reserve)
      checkReady(ready, receipt.mock, 'at the end')
      const journal = await readControl(receipt.mock.url, JOURNAL_ROUTE, reserve)
      checkJournalIdentity(journal, receipt.mock, 'at the end')
      receipt.control.final = { instance: ready.instance, journal_epoch: journal.epoch, ready_epoch: ready.epoch }
      receipt.journal = { entries: journal.entries.length }
    } catch (error) {
      fail('journal', error)
    }
  } else {
    fail('journal', new Error('The Mock was never checked, so it could not be read at the end'))
  }

  try {
    reserve.check()
  } catch (error) {
    fail('deadline', error)
  }

  reserve.end()
  receipt.outcome = receipt.failure === null ? 'passed' : 'failed'
  receipt.elapsed_seconds = (performance.now() - STARTED) / 1000
  receipt.ended_at = new Date().toISOString()
  fs.writeFileSync(path.join(out, RECEIPT_FILE), `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' })
  return receipt
}

main().then(receipt => {
  const passed = receipt.cases.filter(record => record.outcome === 'passed').length
  process.stdout.write(`The filesystem parity case ${receipt.outcome}: ${passed} of ${CASE_IDS.length} cases passed; its receipt is ${path.join(process.env.FILES_MOCK_OUT, RECEIPT_FILE)}\n`)

  if (receipt.failure !== null) {
    process.stderr.write(`${receipt.failure.where}: ${receipt.failure.message}\n`)
  }

  process.exit(receipt.outcome === 'passed' ? 0 : 1)
}, error => {
  process.stderr.write(`The filesystem parity case could not record its receipt: ${describe(error)}\n`)
  process.exit(1)
})
