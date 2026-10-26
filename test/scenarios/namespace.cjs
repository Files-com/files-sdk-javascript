'use strict'

// The shared Files.com API scenario files.owned-folder-namespace (verification/scenarios/api.json), run through this SDK's
// public models against the Files.com Mock API Server. Rendered from targets/javascript/test/scenarios/__namespace.cjs.
// test.sh runs it under the Mock's with-scenario.rb, loaded with the api-scenarios-canonical preset, which gives it the
// FILES_MOCK_* variables, with the Mock's directory as its only argument.
//
// Each position is a step of the scenario as the shared binder bound it to this API: the call of the operation's model,
// static or through an instance, named and argued as the SDK's own methods are, checked against the step's expected
// status, error, entry or listing, against the status, method and path of the one request Node.js's fetch actually
// sent for it, and, at the end, against the Mock's own journal entry for that request. Positions bound to another
// backend are recorded as omitted and never run. The Mock's readiness and journal, read at the start and at the end,
// must be those of the server this run's launcher started, reset once with this file's definition. The case runs in
// one owned folder, a new name for each run, which must not exist before the case creates it; after a failure it
// removes, within its reserve and once nothing of the case is still under way, only what it is known to have created,
// and the first failure stays the outcome. The whole run keeps, by the monotonic clock, within the 210 s the launcher
// gives it. Its receipt, javascript-namespace-case.json in FILES_MOCK_OUT, records every position, attempt, page and
// request.

// When this process began its work, on the monotonic clock every deadline here is measured by.
const STARTED = performance.now()

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// The scenario and its definition, and the Swagger document this SDK and this file were generated from.
const SCENARIO = 'files.owned-folder-namespace'
const DEFINITION_SHA256 = '5d9b8eff0ef0724a68a458db77dc85784bb7d24436f104b98c2a2fe67086bbe0'
const DEFINITION_FORMAT = 'files-api-scenarios'
const DEFINITION_FORMAT_VERSION = 1
const SWAGGER_SHA256 = '04f322c686a819d1188f49d7534efc2d3aba368d308f720871495c7962843848'

// The backend the Mock is: positions bound to another are omitted.
const BACKEND = 'simulator'

// The run must end within the 210 s with-scenario.rb gives it, from STARTED: the case, its setup and first reads of the
// Mock included, by 175 s, within the 180 s case work may take; then a reserve for removing what it created after a
// failure, reading the Mock at the end and writing the receipt, which ends 30 s after it begins or at 205 s, whichever
// is sooner, so that a case that fails early leaves it no more than its 30 s; the last 5 s are for Node.js to start
// before STARTED and to exit after the receipt.
const CASE_DEADLINE_MS = 175 * 1000
const RESERVE_MS = 30 * 1000
const RESERVE_DEADLINE_MS = 205 * 1000
const LAUNCHER_SECONDS = 210

// How often the end of calls still under way is looked for, before anything is removed or the journal read as final.
const SETTLE_POLL_MS = 50

// The most requests the SDK may send to the Mock, the case's and its cleanup's together: a bound for safety, not the
// number of requests expected. Requests refused are all counted, and the first REFUSED_KEPT of them kept.
const WIRE_LIMIT = 400
const REFUSED_KEPT = 50

// The contract of the Mock's control routes and journal that this file reads.
const CONTRACT_VERSION = 3
const READY_ROUTE = '/__files_mock/v1/ready'
const JOURNAL_ROUTE = '/__files_mock/v1/journal'

// The response header in which a page of a list names the cursor of the next page, and the parameter that sends it.
const CURSOR_NEXT = 'x-files-cursor-next'
const CURSOR_PARAMETER = 'cursor'
const CREATED = 201
const NOT_FOUND = 404
const NOT_FOUND_ERROR = 'not-found'

// The credential the Mock's journal names for this run's own API key: the first, and the only, one any request since
// its reset sent.
const FIRST_CREDENTIAL = 1

const RECEIPT_FILE = 'javascript-namespace-case.json'
const RECEIPT_FORMAT = 'files-sdk-javascript-namespace-case/1'

// The SDK's public modules; a CommonJS module that is also its own default gives the same.
const LIB = path.resolve(__dirname, '..', '..', 'lib')
const exportOf = loaded => (loaded && loaded.default ? loaded.default : loaded)
const FilesClient = exportOf(require(path.join(LIB, 'FilesClient')))
const { FilesApiError } = require(path.join(LIB, 'Errors'))

const MODELS = {
  'File': exportOf(require(path.join(LIB, 'models', 'File'))),
  'Folder': exportOf(require(path.join(LIB, 'models', 'Folder'))),
}

// The scenario's fixtures, by name: their paths relative to the run's owned folder, whose own path is ''.
const FIXTURES = {
  'folder': { path: '', type: 'directory' },
  'alpha': { path: 'alpha', type: 'directory' },
  'bravo': { path: 'bravo', type: 'directory' },
  'charlie': { path: 'charlie', type: 'directory' },
  'alpha-inner': { path: 'alpha/inner', type: 'directory' },
}

const nativeFetch = globalThis.fetch

// The client every call uses, the run's owned folder, and the Mock's own route for each operation the case calls, by
// operationId, once the Mock has been checked.
let client = null
let namespaceRoot = null
let routes = null

// The call under way, to which the SDK's fetch assigns each request; and every call not yet settled, which a deadline
// may have stopped waiting for.
let activeCall = null
const pendingCalls = new Set()

// The fixtures the case created: each named by a request of an operation that creates it, for exactly its path, that
// the Mock answered 201, recorded as soon as that status arrives. Creates whose answer never came, or came for another
// path, are listed apart and never removed.
const owned = new Set()
const unknownCreates = new Set()

// Every request the SDK sent, in order, with the call, page or attempt it belongs to; how many still wait for an
// answer; and those it was refused, never sent.
const wire = { exchanges: [], in_flight: 0, limit: WIRE_LIMIT, limit_reached: false, refused: [], refused_count: 0 }

const truncate = text => (text.length > 1000 ? `${text.slice(0, 1000)}...` : text)

const describe = error => {
  if (!(error instanceof Error)) {
    return truncate(String(error))
  }

  const details = [ error.type, error.code ].filter(detail => detail !== undefined && detail !== null).join(' ')
  return truncate(`${error.name}: ${error.message}${details ? ` (${details})` : ''}`)
}

const sha256 = text => crypto.createHash('sha256').update(text).digest('hex')

const callOptions = signal => ({ autoPaginate: false, client, signal })

const fixturePath = name => (FIXTURES[name].path === '' ? namespaceRoot : `${namespaceRoot}/${FIXTURES[name].path}`)

// Every position of the scenario, in order.
const STEPS = [
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find']('/', {  }, callOptions(signal)),
    creates: null,
    expect: { status: 422, error: 'bad-request/request-params-required', attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': '/' }),
    position: 1,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['listFor']('/', { 'per_page': 1000, ...page }, callOptions(signal)),
    creates: null,
    expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: null, perPage: 1000, maxPages: 16, maxRecords: null } },
    operationId: 'FolderListForPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': '/' }),
    position: 2,
    runs: true,
  },
  {
    backend: 'site',
    operationId: 'BehaviorListForPath',
    position: 3,
    runs: false,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 404, error: 'not-found', attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('folder') }),
    position: 4,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['create'](fixturePath('folder'), { 'mkdir_parents': false }, callOptions(signal)),
    creates: 'folder',
    expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'folder' }, listing: null },
    operationId: 'PostFoldersPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('folder') }),
    position: 5,
    runs: true,
  },
  {
    backend: 'site',
    operationId: 'FileActionFind',
    position: 6,
    runs: false,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['create'](fixturePath('alpha'), { 'mkdir_parents': false }, callOptions(signal)),
    creates: 'alpha',
    expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'alpha' }, listing: null },
    operationId: 'PostFoldersPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha') }),
    position: 7,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['create'](fixturePath('bravo'), { 'mkdir_parents': false }, callOptions(signal)),
    creates: 'bravo',
    expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'bravo' }, listing: null },
    operationId: 'PostFoldersPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('bravo') }),
    position: 8,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['create'](fixturePath('charlie'), { 'mkdir_parents': false }, callOptions(signal)),
    creates: 'charlie',
    expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'charlie' }, listing: null },
    operationId: 'PostFoldersPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('charlie') }),
    position: 9,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['create'](fixturePath('alpha-inner'), { 'mkdir_parents': false }, callOptions(signal)),
    creates: 'alpha-inner',
    expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'alpha-inner' }, listing: null },
    operationId: 'PostFoldersPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha-inner') }),
    position: 10,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['create'](fixturePath('alpha'), { 'mkdir_parents': false }, callOptions(signal)),
    creates: 'alpha',
    expect: { status: 422, error: 'processing-failure/destination-exists', attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'PostFoldersPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha') }),
    position: 11,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('alpha'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'alpha' }, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha') }),
    position: 12,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('alpha-inner'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fixture: 'alpha-inner' }, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha-inner') }),
    position: 13,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('folder'), { 'per_page': 1, ...page }, callOptions(signal)),
    creates: null,
    expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['alpha', 'bravo', 'charlie'], perPage: 1, maxPages: 16, maxRecords: null } },
    operationId: 'FolderListForPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('folder') }),
    position: 14,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('alpha'), { 'per_page': 1000, ...page }, callOptions(signal)),
    creates: null,
    expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['alpha-inner'], perPage: 1000, maxPages: 16, maxRecords: null } },
    operationId: 'FolderListForPath',
    operationPath: '/folders/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha') }),
    position: 15,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => new MODELS['File']({ 'path': fixturePath('alpha-inner') }, callOptions(signal))['delete']({ 'recursive': false }),
    creates: null,
    expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'DeleteFilesPath',
    operationPath: '/files/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha-inner') }),
    position: 16,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('alpha-inner'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha-inner') }),
    position: 17,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => new MODELS['File']({ 'path': fixturePath('alpha') }, callOptions(signal))['delete']({ 'recursive': false }),
    creates: null,
    expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'DeleteFilesPath',
    operationPath: '/files/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha') }),
    position: 18,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('alpha'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('alpha') }),
    position: 19,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => new MODELS['File']({ 'path': fixturePath('bravo') }, callOptions(signal))['delete']({ 'recursive': false }),
    creates: null,
    expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'DeleteFilesPath',
    operationPath: '/files/{path}',
    pathArguments: () => ({ 'path': fixturePath('bravo') }),
    position: 20,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('bravo'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('bravo') }),
    position: 21,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => new MODELS['File']({ 'path': fixturePath('charlie') }, callOptions(signal))['delete']({ 'recursive': false }),
    creates: null,
    expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'DeleteFilesPath',
    operationPath: '/files/{path}',
    pathArguments: () => ({ 'path': fixturePath('charlie') }),
    position: 22,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('charlie'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('charlie') }),
    position: 23,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => new MODELS['File']({ 'path': fixturePath('folder') }, callOptions(signal))['delete']({ 'recursive': false }),
    creates: null,
    expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
    operationId: 'DeleteFilesPath',
    operationPath: '/files/{path}',
    pathArguments: () => ({ 'path': fixturePath('folder') }),
    position: 24,
    runs: true,
  },
  {
    backend: null,
    call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
    creates: null,
    expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    operationId: 'FileActionFind',
    operationPath: '/file_actions/metadata/{path}',
    pathArguments: () => ({ 'path': fixturePath('folder') }),
    position: 25,
    runs: true,
  },
]

// After a failure, removes ownedPath, a folder the case created, as the step at REMOVER.position removes the owned
// folder itself.
const REMOVER = {
  operationId: 'DeleteFilesPath',
  operationPath: '/files/{path}',
  pathArguments: ownedPath => ({ 'path': ownedPath }),
  position: 24,
  status: 204,
}
const removeCreated = (signal, ownedPath) => new MODELS['File']({ 'path': ownedPath }, callOptions(signal))['delete']({ 'recursive': false })

const env = name => {
  const value = process.env[name]

  if (typeof value !== 'string' || value === '') {
    throw new Error(`${name} is not set: run this file through the Mock's with-scenario.rb`)
  }

  return value
}

// Waits ms, or rejects with signal's reason once it aborts.
const delay = (ms, signal) => new Promise((resolve, reject) => {
  if (signal.aborted) {
    reject(signal.reason)
    return
  }

  let timer = null

  const onAbort = () => {
    clearTimeout(timer)
    reject(signal.reason)
  }

  timer = setTimeout(() => {
    signal.removeEventListener('abort', onAbort)
    resolve()
  }, ms)

  signal.addEventListener('abort', onAbort, { once: true })
})

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

// Whether every call and request of the case has settled, waiting for them until current's phase ends: nothing is
// removed, nor the journal read as final, while one of them may still act.
const settled = async current => {
  while (pendingCalls.size > 0 || wire.in_flight > 0) {
    if (current.expired() || current.signal.aborted) {
      return false
    }

    await new Promise(resolve => { setTimeout(resolve, SETTLE_POLL_MS) })
  }

  return true
}

// A request path as the Mock's routes name it, every percent-encoded octet decoded; or null when it cannot be.
const decodePath = raw => {
  try {
    return decodeURIComponent(raw)
  } catch {
    return null
  }
}

// The value a request path gives route's one parameter: the path, decoded, must begin with the route's own path up to
// that parameter, and the rest is the value, its slashes at either end aside, as Files.com paths have none; or null
// when the path is not the route's.
const targetOf = (raw, route) => {
  const decoded = typeof raw === 'string' ? decodePath(raw) : null

  if (decoded === null || !decoded.startsWith(route.prefix)) {
    return null
  }

  return decoded.slice(route.prefix.length).replace(/^\/+|\/+$/g, '')
}

// What is wrong with a request, if anything, against the Mock's route for its call's operation: its method, and the
// value its path gives the route's parameter, which must be the call's own.
const requestProblem = (record, call) => {
  const route = routes[call.operationId]
  const expected = String(call.pathArguments()[route.parameter]).replace(/^\/+|\/+$/g, '')
  const actual = targetOf(record.path, route)

  if (String(record.method).toUpperCase() !== route.method) {
    return `The request was a ${record.method}, not the ${route.method} of the Mock's route ${route.path}`
  }

  if (actual === null) {
    return `The request went to ${record.path}, not to the Mock's route ${route.method} ${route.path}`
  }

  return actual === expected ? null : `The request was for ${JSON.stringify(actual)}, not ${JSON.stringify(expected)}`
}

// The SDK's HTTP client (Files.NetworkOptions.fetch): Node.js's own fetch, given each request's URL and init exactly as
// the SDK made them, once, and resolving or rejecting exactly as it did, the response's body left unread for the SDK.
// It records each request with the call it belongs to, the cursor it sent and the one its answer named, by SHA-256,
// and, as soon as a 201 arrives for a create of exactly its fixture's path, that fixture as the case's own. It refuses,
// sending nothing, a request outside any call under way, to another origin than the Mock's, or beyond WIRE_LIMIT.
const observingFetch = (origin, apiKey) => (url, init) => {
  const call = activeCall
  const details = {
    attempt: call ? call.attempt : null,
    kind: call ? call.kind : null,
    method: init ? init.method : null,
    page: call ? call.page : null,
    path: null,
    position: call ? call.position : null,
  }

  const refuse = reason => {
    wire.refused_count += 1

    if (wire.refused.length < REFUSED_KEPT) {
      wire.refused.push({ ...details, reason })
    }

    return Promise.reject(new Error(reason))
  }

  let target = null

  try {
    target = new URL(url)
  } catch {
    return refuse('The SDK sent a request whose URL is not one')
  }

  details.path = target.pathname

  if (call === null) {
    return refuse('The SDK sent a request outside any call of the case')
  }

  if (target.origin !== origin) {
    return refuse(`The SDK sent a request to ${target.origin}, not to the Mock at ${origin}`)
  }

  if (wire.exchanges.length >= WIRE_LIMIT) {
    wire.limit_reached = true
    return refuse(`The SDK sent more than ${WIRE_LIMIT} requests`)
  }

  const sentCursor = target.searchParams.get(CURSOR_PARAMETER)

  // The API key the request sends in the API's public key header, X-FilesAPI-Key, whatever the case of its name, read
  // from a copy of init's headers, theirs left as they are: only whether it sends one, and whether that is this run's
  // own, is kept.
  let sentKey = null

  try {
    sentKey = new Headers(init ? init.headers : undefined).get('X-FilesAPI-Key')
  } catch {
    sentKey = null
  }

  const record = {
    ...details,
    api_key_matches: sentKey !== null && sentKey === apiKey,
    api_key_sent: sentKey !== null,
    cursor_sha256: sentCursor === null ? null : sha256(sentCursor),
    items: null,
    journal_seq: null,
    next_cursor_sha256: null,
    operation_id: call.operationId,
    rejection: null,
    seq: wire.exchanges.length + 1,
    status: null,
  }
  const exchange = { record, response: null }
  wire.exchanges.push(record)
  call.exchanges.push(exchange)
  wire.in_flight += 1

  return nativeFetch(url, init).then(response => {
    wire.in_flight -= 1
    record.status = response.status

    if (response.status === CREATED && call.creates !== null) {
      if (requestProblem(record, call) === null) {
        owned.add(call.creates)
        unknownCreates.delete(call.creates)
      } else if (!owned.has(call.creates)) {
        unknownCreates.add(call.creates)
      }
    }

    const next = response.headers.get(CURSOR_NEXT)
    record.next_cursor_sha256 = next === null || next === '' ? null : sha256(next)
    exchange.response = response
    return response
  }, error => {
    wire.in_flight -= 1
    record.rejection = describe(error)

    if (call.creates !== null && !owned.has(call.creates)) {
      unknownCreates.add(call.creates)
    }

    throw error
  })
}

// Makes one SDK call for context (its kind, position, attempt or page, operation, path and any fixture it creates),
// within current's phase: its outcome, with the requests it sent; or, once the phase has ended or ends first, its
// abort, a call already started then left pending, to settle on its own, and unable to send anything more.
const observe = async (context, call, current) => {
  const entry = { ...context, exchanges: [] }

  try {
    current.check()
  } catch (error) {
    return { context: entry, error, exchanges: entry.exchanges, failed: true, pending: false }
  }

  activeCall = entry
  const sdkCall = Promise.resolve().then(call)
  const forget = () => {
    pendingCalls.delete(sdkCall)
  }

  pendingCalls.add(sdkCall)
  sdkCall.then(forget, forget)

  try {
    const value = await raceAbort(sdkCall, current.signal)
    return { context: entry, exchanges: entry.exchanges, failed: false, pending: false, value }
  } catch (error) {
    return { context: entry, error, exchanges: entry.exchanges, failed: true, pending: pendingCalls.has(sdkCall) }
  } finally {
    activeCall = null
  }
}

// What a step's call is, for observe().
const contextOf = (step, kind, attempt, page) => ({
  attempt,
  creates: step.creates,
  kind,
  operationId: step.operationId,
  page,
  pathArguments: step.pathArguments,
  position: step.position,
})

// The one request a call sent and the answer it got, settled within current's phase, to the Mock's route for the
// call's operation and exactly the call's own path; anything else fails its position.
const answered = (outcome, current) => {
  current.check()

  if (outcome.exchanges.length !== 1) {
    const cause = outcome.failed ? `: ${describe(outcome.error)}` : ''
    throw new Error(`The call sent ${outcome.exchanges.length} requests, not one${cause}`)
  }

  const [exchange] = outcome.exchanges

  if (exchange.record.status === null) {
    throw new Error(`The call's request got no answer: ${exchange.record.rejection}`)
  }

  const problem = requestProblem(exchange.record, outcome.context)

  if (problem !== null) {
    throw new Error(problem)
  }

  return exchange
}

const isExpectedError = (error, expect) => error instanceof FilesApiError && error.type === expect.error &&
  error.code === expect.status

// A returned entry: the model of one of the case's fixtures, its own path and type.
const checkEntry = (value, entry) => {
  const attributes = value && typeof value === 'object' ? value.attributes : null
  const expected = { path: fixturePath(entry.fixture), type: FIXTURES[entry.fixture].type }

  if (!attributes || typeof attributes !== 'object') {
    throw new Error(`The call returned no model, not ${JSON.stringify(expected)}`)
  }

  const actual = { path: attributes.path, type: attributes.type }

  if (actual.path !== expected.path || actual.type !== expected.type) {
    throw new Error(`The call returned ${JSON.stringify(actual)}, not ${JSON.stringify(expected)}`)
  }
}

// Whether two lists hold the same members, as many times each.
const sameMembers = (found, expected) => {
  const sorted = members => members.map(member => JSON.stringify([ member.path, member.type ])).sort()
  const left = sorted(found)
  const right = sorted(expected)
  return left.length === right.length && left.every((member, index) => member === right[index])
}

// A position of one call; or, when its error may take a while to answer, up to its attempts calls, its interval apart,
// until the error answers: a lookup that still finds what it looks for is tried again, and any other outcome ends it.
// Each call counts only once settled within current's phase.
const callStep = async (step, record, current) => {
  const { expect } = step
  const attempts = expect.attempts === null ? 1 : expect.attempts

  for (let attempt = 1; ; attempt += 1) {
    if (attempt > 1) {
      await delay(expect.intervalSeconds * 1000, current.signal)
    }

    record.attempts = attempt
    const outcome = await observe(contextOf(step, 'case', attempt, null), () => step.call(current.signal, {}), current)
    const exchange = answered(outcome, current)
    const { status } = exchange.record
    record.statuses.push(status)

    if (expect.error !== null) {
      if (!outcome.failed && attempt < attempts) {
        continue
      }

      if (!outcome.failed) {
        throw new Error(`The call still answered ${status} after ${attempts} lookups, not ${expect.status} ${expect.error}`)
      }

      if (!isExpectedError(outcome.error, expect) || status !== expect.status) {
        throw new Error(`The call answered ${status} with ${describe(outcome.error)}, not ${expect.status} ${expect.error}`)
      }

      return
    }

    if (outcome.failed) {
      throw new Error(`The call answered ${status} and failed: ${describe(outcome.error)}`)
    }

    if (status !== expect.status) {
      throw new Error(`The call answered ${status}, not ${expect.status}`)
    }

    if (expect.entry !== null) {
      checkEntry(outcome.value, expect.entry)
    }

    return
  }
}

// A listing: pages of at most its per_page items, each one call sending exactly the cursor the page before named, the
// first none, at most maxPages of them and maxRecords items in all, the last naming no next page; then, unless its
// members belong to the site (entries null), exactly its entries, each once. Each page counts only once settled within
// current's phase.
const readListing = async (step, record, current) => {
  const { listing, status } = step.expect
  const found = []
  let page = {}
  let cursorSha256 = null
  record.attempts = 1

  for (;;) {
    record.pages += 1
    const outcome = await observe(contextOf(step, 'case', 1, record.pages), () => step.call(current.signal, page), current)
    const exchange = answered(outcome, current)
    record.statuses.push(exchange.record.status)

    if (outcome.failed) {
      throw new Error(`Page ${record.pages} answered ${exchange.record.status} and failed: ${describe(outcome.error)}`)
    }

    if (exchange.record.status !== status) {
      throw new Error(`Page ${record.pages} answered ${exchange.record.status}, not ${status}`)
    }

    if (exchange.record.cursor_sha256 !== cursorSha256) {
      const sent = exchange.record.cursor_sha256 === null ? 'no cursor' : 'another cursor'
      throw new Error(`Page ${record.pages} sent ${sent}, not ${cursorSha256 === null ? 'none' : 'the one the page before named'}`)
    }

    if (!Array.isArray(outcome.value)) {
      throw new Error(`Page ${record.pages} returned no list`)
    }

    exchange.record.items = outcome.value.length

    if (outcome.value.length > listing.perPage) {
      throw new Error(`Page ${record.pages} holds ${outcome.value.length} items, more than ${listing.perPage}`)
    }

    record.records += outcome.value.length

    if (listing.maxRecords !== null && record.records > listing.maxRecords) {
      throw new Error(`The listing holds more than ${listing.maxRecords} items`)
    }

    if (listing.entries !== null) {
      outcome.value.forEach(item => {
        const attributes = item && item.attributes ? item.attributes : {}
        found.push({ path: attributes.path, type: attributes.type })
      })
    }

    const next = exchange.response.headers.get(CURSOR_NEXT)

    if (next === null || next === '') {
      break
    }

    if (record.pages >= listing.maxPages) {
      throw new Error(`The listing has more than ${listing.maxPages} pages`)
    }

    page = { [CURSOR_PARAMETER]: next }
    cursorSha256 = sha256(next)
  }

  if (listing.entries === null) {
    return
  }

  const expected = listing.entries.map(name => ({ path: fixturePath(name), type: FIXTURES[name].type }))

  if (!sameMembers(found, expected)) {
    throw new Error(`The listing holds ${JSON.stringify(found)}, not ${JSON.stringify(expected)}`)
  }
}

// Runs every position of this backend in order, within current's phase, until one fails: that failure, or null. A
// position passes only once it is checked within the phase.
const runCase = async (receipt, current) => {
  for (const [index, step] of STEPS.entries()) {
    if (!step.runs) {
      continue
    }

    const record = receipt.positions[index]

    try {
      if (step.expect.listing === null) {
        await callStep(step, record, current)
      } else {
        await readListing(step, record, current)
      }

      current.check()
      record.outcome = 'passed'
    } catch (error) {
      record.outcome = 'failed'
      return { message: describe(error), where: `position ${step.position} (${step.operationId})` }
    }
  }

  return null
}

// After a failure, within current's phase, the reserve: once every call and request of the case has settled, removes,
// deepest first and with fresh options, each folder the case is known to have created. A removal counts only when its
// one request was for exactly that folder and settled within the reserve: answered with the removal's own status, or
// with an actual 404 and the API's not-found error, the folder then already gone. Anything else, a late answer
// included, is a failure of the cleanup, never the run's first failure; and nothing is removed while a call of the case
// may still act.
const removeAfterFailure = async current => {
  const removal = { failures: [], paths: [], settled: false }

  if (!(await settled(current))) {
    removal.failures.push('Calls of the case were still under way when the reserve ran out, so nothing was removed')
    return removal
  }

  removal.settled = true
  const depth = ownedPath => ownedPath.split('/').length
  const paths = [ ...owned ].map(fixturePath).sort((left, right) => depth(right) - depth(left) || (left < right ? 1 : -1))

  for (const ownedPath of paths) {
    if (current.expired() || current.signal.aborted) {
      removal.failures.push(`${ownedPath}: the reserve ran out before it could be removed`)
      continue
    }

    const context = {
      attempt: 1,
      creates: null,
      kind: 'cleanup',
      operationId: REMOVER.operationId,
      page: null,
      pathArguments: () => REMOVER.pathArguments(ownedPath),
      position: null,
    }
    const outcome = await observe(context, () => removeCreated(current.signal, ownedPath), current)
    let result = 'failed'
    let problem = null

    try {
      const { status } = answered(outcome, current).record

      if (!outcome.failed && status === REMOVER.status) {
        result = 'removed'
      } else if (outcome.failed && status === NOT_FOUND && outcome.error instanceof FilesApiError &&
          outcome.error.code === NOT_FOUND && outcome.error.type === NOT_FOUND_ERROR) {
        result = 'absent'
      } else {
        problem = outcome.failed ? `answered ${status} with ${describe(outcome.error)}` : `answered ${status}`
      }
    } catch (error) {
      problem = describe(error)
    }

    removal.paths.push({ path: ownedPath, result })

    if (problem !== null) {
      removal.failures.push(`${ownedPath}: ${problem}`)
    }

    if (outcome.pending) {
      removal.failures.push('A removal was still under way when the reserve ran out, so nothing more was removed')
      break
    }
  }

  return removal
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

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

const has = (object, field) => Object.prototype.hasOwnProperty.call(object, field)

// Whether identity names exactly this file's definition, as the Mock names the one it was reset with.
const isDefinition = identity => isObject(identity) &&
  Object.keys(identity).sort().join(',') === 'definition_sha256,format,format_version' &&
  identity.format === DEFINITION_FORMAT && identity.format_version === DEFINITION_FORMAT_VERSION &&
  identity.definition_sha256 === DEFINITION_SHA256

// The Mock's readiness, at the start or at the end: the server this run's launcher started, by its instance, in
// simulation, on the contract this file reads, reporting the schema subset generated from this SDK's Swagger document,
// reset once with exactly this file's definition, with its catalogue of operations.
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
    isObject(ready.profile) && isDefinition(ready.profile.api_scenarios) ? null : 'a profile not reset with this file\'s definition',
    Array.isArray(ready.operations) ? null : 'no catalogue of operations',
  ].filter(problem => problem !== null)

  if (problems.length > 0) {
    throw new Error(`The Mock's readiness ${when} is not this run's: ${problems.join('; ')}`)
  }
}

// The Mock's journal, at the start or at the end: of this run's instance, reset once with exactly this file's
// definition, and complete.
const checkJournalIdentity = (journal, mock, when) => {
  if (!isObject(journal)) {
    throw new Error(`The Mock's journal ${when} is not an object`)
  }

  const problems = [
    journal.instance === mock.instance ? null : `instance ${JSON.stringify(journal.instance)}, not ${mock.instance}`,
    journal.epoch === 1 ? null : `epoch ${JSON.stringify(journal.epoch)}, not 1`,
    isDefinition(journal.api_scenarios) ? null : 'not reset with this file\'s definition',
    journal.complete === true && journal.dropped === 0
      ? null : `complete ${JSON.stringify(journal.complete)}, dropped ${JSON.stringify(journal.dropped)}`,
    Array.isArray(journal.entries) ? null : 'no entries',
  ].filter(problem => problem !== null)

  if (problems.length > 0) {
    throw new Error(`The Mock's journal ${when} is not this run's: ${problems.join('; ')}`)
  }
}

// The Mock's own route for each operation the case calls, from its readiness catalogue: the one operation for its
// operationId, with its method, the semantic operation its journal names, and its path, which must end with the
// schema's own path for it, in the route's one parameter.
const routesOf = (ready, calls) => {
  const result = {}

  calls.forEach(({ operationId, operationPath }) => {
    const matches = ready.operations.filter(operation => isObject(operation) && operation.swagger_operation_id === operationId)
    const parameter = /\{([A-Za-z0-9_]+)\}$/.exec(operationPath)

    if (matches.length !== 1) {
      throw new Error(`The Mock's catalogue has ${matches.length} operations for ${operationId}, not one`)
    }

    const [operation] = matches

    if (typeof operation.id !== 'string' || typeof operation.method !== 'string' || typeof operation.path !== 'string' ||
        parameter === null || !operation.path.endsWith(operationPath)) {
      throw new Error(`The Mock's route for ${operationId}, ${JSON.stringify(operation)}, is not one for ${operationPath}`)
    }

    result[operationId] = {
      id: operation.id,
      method: operation.method.toUpperCase(),
      parameter: parameter[1],
      path: operation.path,
      prefix: operation.path.slice(0, operation.path.length - parameter[0].length),
    }
  })

  return result
}

// A journal entry's SHA-256 of a cursor: present, 64 hexadecimal digits and the request's own when it had one, and
// absent when it had none.
const sameCursor = (entry, field, expected) => (expected === null
  ? !has(entry, field)
  : typeof entry[field] === 'string' && /^[0-9a-f]{64}$/.test(entry[field]) && entry[field] === expected)

// What differs between a journal entry and the request the SDK sent in its place, as both name it: its order and epoch,
// its method, semantic operation and path, as the Mock's route gives them, its status, its credential, the cursor sent,
// with its wire parameter, and the one answered, and a page's number of items. A fault, or any credential but this
// run's own API key, differs too.
const entryProblems = (entry, record, route, lastSeq) => {
  const target = targetOf(entry.path, route)
  const { credentials } = entry
  const wireCursor = isObject(entry.wire) && has(entry.wire, CURSOR_PARAMETER)

  return [
    typeof entry.seq === 'number' && entry.seq > lastSeq ? null : `seq ${JSON.stringify(entry.seq)} does not follow ${lastSeq}`,
    entry.epoch === 1 ? null : `epoch ${JSON.stringify(entry.epoch)}`,
    String(entry.method).toUpperCase() === String(record.method).toUpperCase()
      ? null : `method ${JSON.stringify(entry.method)}, not ${record.method}`,
    entry.operation === route.id ? null : `operation ${JSON.stringify(entry.operation)}, not ${route.id}`,
    target !== null && target === targetOf(record.path, route) ? null : `path ${JSON.stringify(entry.path)}, not ${record.path}`,
    entry.status === record.status ? null : `status ${JSON.stringify(entry.status)}, not ${record.status}`,
    entry.fault_id === null ? null : `fault ${JSON.stringify(entry.fault_id)}`,
    isObject(credentials) && Object.keys(credentials).join(',') === 'api_key' && credentials.api_key === FIRST_CREDENTIAL
      ? null : 'a credential other than this run\'s own API key',
    record.api_key_matches === true
      ? null : `a request that sent ${record.api_key_sent ? 'another API key than this run\'s own' : 'no API key'}`,
    sameCursor(entry, 'cursor_sha256', record.cursor_sha256) && wireCursor === (record.cursor_sha256 !== null)
      ? null : 'the cursor sent',
    sameCursor(entry, 'next_cursor_sha256', record.next_cursor_sha256) ? null : 'the cursor answered',
    record.items === null || entry.items === record.items ? null : `items ${JSON.stringify(entry.items)}, not ${record.items}`,
  ].filter(problem => problem !== null)
}

// Whether a journal entry is a request the SDK sent whose answer never came: its method, operation and path.
const sameRequest = (entry, record, route) => isObject(entry) &&
  String(entry.method).toUpperCase() === String(record.method).toUpperCase() && entry.operation === route.id &&
  targetOf(entry.path, route) !== null && targetOf(entry.path, route) === targetOf(record.path, route)

// Matches every request the SDK sent, in order, with the Mock's journal entry for it, by everything both name (see
// entryProblems()): the problems found, none when every request has exactly its entry. A request that got no answer,
// one missing from the journal, an entry no request accounts for and an entry that differs from its request each leave
// the join incomplete.
const joinJournal = journal => {
  const problems = []
  const { entries } = journal
  let index = 0
  let lastSeq = 0

  wire.exchanges.forEach(record => {
    const route = routes[record.operation_id]
    const entry = entries[index]

    if (record.status === null) {
      if (entry !== undefined && sameRequest(entry, record, route)) {
        index += 1
        lastSeq = typeof entry.seq === 'number' ? entry.seq : lastSeq
        problems.push(`Request ${record.seq} got no answer, though the journal has it, answered ${JSON.stringify(entry.status)}`)
      } else {
        problems.push(`Request ${record.seq} got no answer, and the journal does not have it`)
      }

      return
    }

    if (!isObject(entry)) {
      problems.push(`Request ${record.seq} is not in the journal`)
      return
    }

    index += 1
    const differences = entryProblems(entry, record, route, lastSeq)
    lastSeq = typeof entry.seq === 'number' ? entry.seq : lastSeq

    if (differences.length > 0) {
      problems.push(`Request ${record.seq} and journal entry ${JSON.stringify(entry.seq)} differ: ${differences.join('; ')}`)
    } else {
      record.journal_seq = entry.seq
    }
  })

  if (index < entries.length) {
    problems.push(`The journal holds ${entries.length - index} requests the SDK was not seen to send`)
  }

  return problems
}

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
    backend: BACKEND,
    budgets: {
      case_deadline_seconds: CASE_DEADLINE_MS / 1000,
      launcher_seconds: LAUNCHER_SECONDS,
      reserve_deadline_seconds: RESERVE_DEADLINE_MS / 1000,
    },
    cleanup: null,
    control: { final: null, initial: null },
    definition_sha256: DEFINITION_SHA256,
    elapsed_seconds: null,
    ended_at: null,
    failure: null,
    format: RECEIPT_FORMAT,
    journal: null,
    mock: null,
    namespace: null,
    outcome: 'failed',
    owned: [],
    positions: STEPS.map(step => ({
      attempts: 0,
      backend: step.backend,
      operation_id: step.operationId,
      outcome: step.runs ? 'not_run' : 'omitted',
      pages: 0,
      position: step.position,
      records: 0,
      statuses: [],
    })),
    scenario: SCENARIO,
    started_at: new Date().toISOString(),
    swagger_sha256: SWAGGER_SHA256,
    unknown_creates: [],
    wire,
  }

  const fail = (where, error) => {
    if (receipt.failure === null) {
      receipt.failure = { message: describe(error), where }
    }
  }

  // The case, with its setup and the first reads of the Mock.
  const casePhase = phase(CASE_DEADLINE_MS, 'The case')

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

    routes = routesOf(ready, [ ...STEPS.filter(step => step.runs), REMOVER ])
    mock.epoch = journal.epoch
    mock.identity = journal.api_scenarios
    receipt.control.initial = { instance: ready.instance, journal_epoch: journal.epoch, ready_epoch: ready.epoch, routes }
    namespaceRoot = `js-namespace-${mock.run_id.replace(/[^A-Za-z0-9-]/g, '').slice(0, 64)}-${crypto.randomBytes(6).toString('hex')}`
    receipt.namespace = namespaceRoot
    // This run's own API key, read once: the client sends it, and its fetch checks that every request sends exactly it.
    const apiKey = env('FILES_MOCK_API_KEY')
    client = new FilesClient({
      apiKey,
      autoPaginate: false,
      baseUrl: mock.url,
      fetch: observingFetch(mock.url, apiKey),
      maxNetworkRetries: 0,
    })
    casePhase.check()
  } catch (error) {
    fail('setup', error)
  }

  if (receipt.failure === null) {
    const failure = await runCase(receipt, casePhase)

    if (failure !== null) {
      receipt.failure = failure
    }
  }

  casePhase.end()

  // The reserve: removing what the case created after a failure, reading the Mock at the end, and the receipt; it ends
  // RESERVE_MS after it begins or RESERVE_DEADLINE_MS after STARTED, whichever is sooner.
  const reserveEndMs = Math.min(RESERVE_DEADLINE_MS, Math.floor(performance.now() - STARTED) + RESERVE_MS)
  const reserve = phase(reserveEndMs, 'The reserve for ending the run')

  // After any failure, even with nothing yet known to be created: removeAfterFailure() first waits for every call and
  // request of the case to settle, and only then removes what they are known to have created.
  if (receipt.failure !== null) {
    try {
      receipt.cleanup = await removeAfterFailure(reserve)
    } catch (error) {
      receipt.cleanup = { failures: [ describe(error) ], paths: [], settled: false }
    }
  }

  if (!(await settled(reserve))) {
    fail('settlement', new Error('Calls of the case were still under way when the reserve ran out'))
  }

  if (receipt.mock !== null && routes !== null) {
    try {
      const ready = await readControl(receipt.mock.url, READY_ROUTE, reserve)
      checkReady(ready, receipt.mock, 'at the end')
      const journal = await readControl(receipt.mock.url, JOURNAL_ROUTE, reserve)
      checkJournalIdentity(journal, receipt.mock, 'at the end')
      receipt.control.final = { instance: ready.instance, journal_epoch: journal.epoch, ready_epoch: ready.epoch }
      const problems = joinJournal(journal)
      receipt.journal = {
        entries: journal.entries.length,
        joined: problems.length === 0,
        problem_count: problems.length,
        problems: problems.slice(0, 100),
      }
      reserve.check()

      if (problems.length > 0) {
        throw new Error(`The Mock's journal does not match the requests the SDK sent: ${problems[0]}`)
      }
    } catch (error) {
      fail('journal', error)
    }
  } else {
    fail('journal', new Error('The Mock was never checked, so its journal could not be joined with the requests'))
  }

  if (wire.refused_count > 0) {
    fail('wire', new Error(`The SDK was refused ${wire.refused_count} requests, the first: ${wire.refused[0].reason}`))
  }

  if (unknownCreates.size > 0) {
    fail('ownership', new Error(`${unknownCreates.size} creates got no answer, or one for another path, so what they made is unknown`))
  }

  try {
    reserve.check()
  } catch (error) {
    fail('deadline', error)
  }

  reserve.end()
  receipt.owned = namespaceRoot === null ? [] : [ ...owned ].map(fixturePath)
  receipt.unknown_creates = namespaceRoot === null ? [] : [ ...unknownCreates ].map(fixturePath)
  receipt.outcome = receipt.failure === null ? 'passed' : 'failed'
  receipt.elapsed_seconds = (performance.now() - STARTED) / 1000
  receipt.ended_at = new Date().toISOString()
  fs.writeFileSync(path.join(out, RECEIPT_FILE), `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' })
  return receipt
}

main().then(receipt => {
  const ran = receipt.positions.filter(position => position.outcome !== 'omitted')
  const passed = ran.filter(position => position.outcome === 'passed').length
  const omitted = receipt.positions.length - ran.length
  process.stdout.write(`${SCENARIO} ${receipt.outcome}: ${passed} of ${ran.length} positions passed and ${omitted} were omitted for the ${BACKEND} backend, with ${wire.exchanges.length} requests; its receipt is ${path.join(process.env.FILES_MOCK_OUT, RECEIPT_FILE)}\n`)

  if (receipt.failure !== null) {
    process.stderr.write(`${receipt.failure.where}: ${receipt.failure.message}\n`)
  }

  process.exit(receipt.outcome === 'passed' ? 0 : 1)
}, error => {
  process.stderr.write(`${SCENARIO} could not record its receipt: ${describe(error)}\n`)
  process.exit(1)
})
