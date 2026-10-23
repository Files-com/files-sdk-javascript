'use strict'

// The shared Files.com API scenarios of files and folders (verification/scenarios/api.json), files.owned-binary-roundtrip, files.owned-namespace-extended, files.owned-directory-helpers,
// run through this SDK's public models and helpers against the Files.com Mock API Server, one scenario per launch.
// Rendered from targets/javascript/test/scenarios/__file_scenarios.cjs. test.sh runs it under the Mock's
// with-scenario.rb, loaded with the api-scenarios-canonical preset, which gives it the FILES_MOCK_* variables, with the
// Mock's directory and the scenario's id as its arguments.
//
// Each position is a step of the scenario as the shared binder bound it to this API. An operation step is the call of
// its operation's model, static or through an instance, named and argued as the SDK's own methods are, checked against
// the step's expected status, error, entry or listing, and against the status, method and path of the one request
// Node.js's fetch actually sent for it. An intent step is carried out by the SDK's own helper, and only by it: an
// upload by File.upload() from a local file; by File.uploadFromStream() from a stream of a file on disk, given its
// known size, for a seekable source (a Node.js stream has no generic seek, and the SDK reads it forward as any stream:
// the file it reads is what could be read again), or from a forward-only stream of unknown size giving at most its
// step's bytes at a time; a download by a File's download() and downloadToFile(), or, for an entry a listing returned,
// that entry's own download() and downloadToStream(); a copy or move by a File's copyTo() or moveTo() and
// waitForCompletion(); a folder's upload or download by File.uploadDirectory() or File.downloadDirectory(). This file
// only makes the local files and tree the helpers read, closes the streams it gave them, which the SDK never closes,
// and inspects what each helper returned, wrote or reported.
//
// Every request, a step's own and its helper's, the API's and storage's alike, is checked at the end against the Mock's
// own journal entry for it, and each intent's transfers against what storage's entries show it stored or sent. A
// request that got no answer fails that check, but for a grant an upload asked for ahead that the client saw the SDK
// stop with its own signal, once the upload no longer needed it, and that the upload never used: its record keeps the
// client's view, no answer, and apart from it the server's answer, if the journal has one (see stoppedGrantReason()).
// Positions bound to another backend are recorded as omitted and never run. The Mock's readiness and journal, read at
// the start and at the end, must be those of the server this run's launcher started, reset once with this file's
// definition. The case runs in one owned folder, a new name for each run, which must not exist before the case creates
// it; after a failure, within its reserve and once nothing of the case is still under way, it deletes that folder
// recursively, only when it is known to have created it, and confirms it gone, as the definition's cleanup says, and
// the first failure stays the outcome. The whole run keeps, by the monotonic clock, within the 210 s the launcher gives
// it. Its receipt, javascript-<scenario>-case.json in FILES_MOCK_OUT, records every position, attempt, page and request.

// When this process began its work, on the monotonic clock every deadline here is measured by.
const STARTED = performance.now()

const crypto = require('crypto')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { Readable, Writable } = require('stream')

// The definition, and the Swagger document this SDK and this file were generated from.
const DEFINITION_SHA256 = '5d9b8eff0ef0724a68a458db77dc85784bb7d24436f104b98c2a2fe67086bbe0'
const DEFINITION_FORMAT = 'files-api-scenarios'
const DEFINITION_FORMAT_VERSION = 1
const SWAGGER_SHA256 = 'f50ffc75afaff16a5af583ff65062fd49ee739cab0d8c6387aa34eaa61b1587e'

// The backend the Mock is: positions bound to another are omitted.
const BACKEND = 'simulator'

// The run must end within the 210 s with-scenario.rb gives it, from STARTED: the case, its setup and first reads of the
// Mock included, by 175 s, within the 180 s case work may take; then a reserve for removing the owned folder after a
// failure, reading the Mock at the end and writing the receipt, which ends 30 s after it begins or at 205 s, whichever
// is sooner; the last 5 s are for Node.js to start before STARTED and to exit after the receipt.
const CASE_DEADLINE_MS = 175 * 1000
const RESERVE_MS = 30 * 1000
const RESERVE_DEADLINE_MS = 205 * 1000
const LAUNCHER_SECONDS = 210

// The longest a copy or move is waited for until its migration completes.
const ACTION_WAIT_MS = 60 * 1000

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

// The API's own paths, every other request being one to storage, an upload's part or a file's download.
const API_PREFIX = '/api/rest/v1/'

// The response header in which a page of a list names the cursor of the next page, and the parameter that sends it.
const CURSOR_NEXT = 'x-files-cursor-next'
const CURSOR_PARAMETER = 'cursor'

// The public header that carries the API key (the Swagger document's securityDefinitions), and the credential the
// Mock's journal names for this run's own API key: the first, and the only, one any request since its reset sent.
const API_KEY_HEADER = 'X-FilesAPI-Key'
const FIRST_CREDENTIAL = 1

const RECEIPT_FORMAT = 'files-sdk-javascript-file-case/1'

// The SDK's public modules; a CommonJS module that is also its own default gives the same.
const LIB = path.resolve(__dirname, '..', '..', 'lib')
const exportOf = loaded => (loaded && loaded.default ? loaded.default : loaded)
const FilesClient = exportOf(require(path.join(LIB, 'FilesClient')))
const { FilesApiError } = require(path.join(LIB, 'Errors'))

const MODELS = {
  'File': exportOf(require(path.join(LIB, 'models', 'File'))),
  'Folder': exportOf(require(path.join(LIB, 'models', 'Folder'))),
}

// The definition's recipes: each fixture's bytes, (index * multiplier + offset) % modulus for each index below length,
// with their SHA-256.
const RECIPES = {
  1: {"length":65539,"modulus":251,"multiplier":131,"offset":17,"sha256":"b65094d36ac1009dac9c73c27b48638a47eb7f23d219a80d1b4d05b58f514499"},
  2: {"length":0,"modulus":256,"multiplier":1,"offset":0,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"},
  3: {"length":65537,"modulus":256,"multiplier":29,"offset":101,"sha256":"ed5a86d5b614d5385a85c170c15f25fe75c3faab6a8b29abbb470a6c51faa7f9"},
  4: {"length":1031,"modulus":256,"multiplier":37,"offset":5,"sha256":"29f483b8739ae2de994d4794133a7a858a0f0416caa03e5a96165af41ebdf3e8"},
  5: {"length":2053,"modulus":256,"multiplier":41,"offset":11,"sha256":"83298104fe01d905ee9ce8fae2f23da08007b5e8ab356d5bfc064b49c2664b98"},
  6: {"length":517,"modulus":256,"multiplier":43,"offset":3,"sha256":"b664357b3151e48ca4c5c6c452dd20d58293897f887536f6e0e0627c0d8cd25b"},
  7: {"length":4099,"modulus":256,"multiplier":47,"offset":19,"sha256":"9f251477458622d9da868e31b8708ec638d8ba9a01c9b575bb8c0a0764734521"},
  8: {"length":6291459,"modulus":251,"multiplier":53,"offset":23,"sha256":"4ab1615925cb4b1fa9b9ddc3345a920200888d8ba7d3ae1b880aa6c0c19f87fa"},
  9: {"length":6291461,"modulus":251,"multiplier":59,"offset":29,"sha256":"d7a71574a24faecb2fea4915b8096a86a43b19db98d440f16730caac0a66cfd4"},
  10: {"length":1543,"modulus":256,"multiplier":61,"offset":7,"sha256":"983f31356cea338492c47d6c9c979deb3a45914fe6aa8eafa96cd44e02f08e9d"},
  11: {"length":2089,"modulus":256,"multiplier":67,"offset":13,"sha256":"03e528690696066e61d8a65fa0fac38974bb95cb0d31874240287f325484fddb"},
}

// How a file is described with its download URL: for a path, and for an entry a listing returned.
const describeForDownload = (signal, filePath) => new MODELS['File']({ 'path': filePath }, callOptions(signal))['download']({})
const downloadListed = (entry, signal) => entry['download']({})

// Each scenario: its fixtures, by name, their paths relative to the run's owned folder, whose own path is ''; its every
// position, in order; and how its owned folder is removed recursively after a failure and then looked up.
const SCENARIOS = {
  'files.owned-binary-roundtrip': {
    fixtures: {"folder":{"path":"","recipe":null,"type":"directory"},"binary.bin":{"path":"binary.bin","recipe":1,"type":"file"},"empty.bin":{"path":"empty.bin","recipe":2,"type":"file"},"short-read.bin":{"path":"short-read.bin","recipe":3,"type":"file"}},
    lookupOwned: (signal, ownedPath) => MODELS['File']['find'](ownedPath, {  }, callOptions(signal)),
    lookupOwnedExpect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    lookupOwnedOperationId: 'FileActionFind',
    notFoundError: 'not-found',
    removeOwned: (signal, ownedPath) => new MODELS['File']({ 'path': ownedPath }, callOptions(signal))['delete']({ 'recursive': true }),
    removeOwnedOperationId: 'DeleteFilesPath',
    removeOwnedStatus: 204,
    steps: [
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find']('/', {  }, callOptions(signal)),
        expect: { status: 422, error: 'bad-request/request-params-required', attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': '/' }),
        position: 1,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor']('/', { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: null, perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': '/' }),
        position: 2,
        runs: true,
      },
      {
        backend: 'site',
        kind: 'operation',
        label: 'BehaviorListForPath',
        position: 3,
        runs: false,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 4,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['create'](fixturePath('folder'), { 'mkdir_parents': false }, callOptions(signal)),
        expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'folder' }, listing: null },
        kind: 'operation',
        label: 'PostFoldersPath',
        operationId: 'PostFoldersPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 5,
        runs: true,
      },
      {
        backend: 'site',
        kind: 'operation',
        label: 'FileActionFind',
        position: 6,
        runs: false,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":null,"params":{"provided_mtime":"2026-09-24T00:00:00Z"},"progressFinal":false,"source":"local-file"},
        fixture: 'binary.bin',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 7,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('binary.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {"provided_mtime":{"one_of":["2026-09-24T00:00:00Z",null]}}, fixture: 'binary.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('binary.bin') }),
        position: 8,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":null,"params":{"provided_mtime":"2026-09-24T00:00:00Z"},"progressFinal":false,"source":"seekable-stream"},
        fixture: 'empty.bin',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 9,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('empty.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {"provided_mtime":{"one_of":["2026-09-24T00:00:00Z",null]}}, fixture: 'empty.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('empty.bin') }),
        position: 10,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":3,"minParts":null,"params":{"provided_mtime":"2026-09-24T00:00:00Z"},"progressFinal":false,"source":"forward-only-stream"},
        fixture: 'short-read.bin',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 11,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('short-read.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {"provided_mtime":{"one_of":["2026-09-24T00:00:00Z",null]}}, fixture: 'short-read.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('short-read.bin') }),
        position: 12,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('folder'), { 'per_page': 1, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['binary.bin', 'empty.bin', 'short-read.bin'], perPage: 1, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 13,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'binary.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 14,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'empty.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 15,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'short-read.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 16,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('binary.bin') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('binary.bin') }),
        position: 17,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('binary.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('binary.bin') }),
        position: 18,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('empty.bin') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('empty.bin') }),
        position: 19,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('empty.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('empty.bin') }),
        position: 20,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('short-read.bin') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('short-read.bin') }),
        position: 21,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('short-read.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('short-read.bin') }),
        position: 22,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('folder') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 23,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 24,
        runs: true,
      },
    ],
  },
  'files.owned-namespace-extended': {
    fixtures: {"folder":{"path":"","recipe":null,"type":"directory"},"hash-name":{"path":"a#b.txt","recipe":4,"type":"file"},"percent-name":{"path":"100%.txt","recipe":5,"type":"file"},"unicode-name":{"path":"é +.txt","recipe":6,"type":"file"},"nested":{"path":"nested","recipe":null,"type":"directory"},"inner.bin":{"path":"nested/inner.bin","recipe":7,"type":"file"},"large.bin":{"path":"large.bin","recipe":8,"type":"file"},"copied.bin":{"path":"copied.bin","recipe":7,"type":"file"},"moved.bin":{"path":"nested/moved.bin","recipe":7,"type":"file"},"cancelled.bin":{"path":"cancelled.bin","recipe":9,"type":"file"}},
    lookupOwned: (signal, ownedPath) => MODELS['File']['find'](ownedPath, {  }, callOptions(signal)),
    lookupOwnedExpect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    lookupOwnedOperationId: 'FileActionFind',
    notFoundError: 'not-found',
    removeOwned: (signal, ownedPath) => new MODELS['File']({ 'path': ownedPath }, callOptions(signal))['delete']({ 'recursive': true }),
    removeOwnedOperationId: 'DeleteFilesPath',
    removeOwnedStatus: 204,
    steps: [
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find']('/', {  }, callOptions(signal)),
        expect: { status: 422, error: 'bad-request/request-params-required', attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': '/' }),
        position: 1,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor']('/', { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: null, perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': '/' }),
        position: 2,
        runs: true,
      },
      {
        backend: 'site',
        kind: 'operation',
        label: 'BehaviorListForPath',
        position: 3,
        runs: false,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 4,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['create'](fixturePath('folder'), { 'mkdir_parents': false }, callOptions(signal)),
        expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'folder' }, listing: null },
        kind: 'operation',
        label: 'PostFoldersPath',
        operationId: 'PostFoldersPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 5,
        runs: true,
      },
      {
        backend: 'site',
        kind: 'operation',
        label: 'FileActionFind',
        position: 6,
        runs: false,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":null,"params":{},"progressFinal":false,"source":"local-file"},
        fixture: 'hash-name',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 7,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('hash-name'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'hash-name' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('hash-name') }),
        position: 8,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":null,"params":{},"progressFinal":false,"source":"local-file"},
        fixture: 'percent-name',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 9,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('percent-name'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'percent-name' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('percent-name') }),
        position: 10,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":null,"params":{},"progressFinal":false,"source":"local-file"},
        fixture: 'unicode-name',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 11,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('unicode-name'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'unicode-name' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('unicode-name') }),
        position: 12,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['create'](fixturePath('nested'), { 'mkdir_parents': false }, callOptions(signal)),
        expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'nested' }, listing: null },
        kind: 'operation',
        label: 'PostFoldersPath',
        operationId: 'PostFoldersPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('nested') }),
        position: 13,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":null,"params":{},"progressFinal":false,"source":"seekable-stream"},
        fixture: 'inner.bin',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 14,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('inner.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'inner.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('inner.bin') }),
        position: 15,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":null,"maxRead":null,"minParts":2,"params":{},"progressFinal":true,"source":"local-file"},
        fixture: 'large.bin',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 16,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('large.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'large.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('large.bin') }),
        position: 17,
        runs: true,
      },
      {
        backend: null,
        details: {"from":"inner.bin"},
        fixture: 'copied.bin',
        intent: 'copy',
        kind: 'intent',
        label: 'copy',
        position: 18,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('copied.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'copied.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('copied.bin') }),
        position: 19,
        runs: true,
      },
      {
        backend: null,
        details: {"from":"copied.bin"},
        fixture: 'moved.bin',
        intent: 'move',
        kind: 'intent',
        label: 'move',
        position: 20,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('copied.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('copied.bin') }),
        position: 21,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('moved.bin'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'moved.bin' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved.bin') }),
        position: 22,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('folder'), { 'per_page': 1, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['hash-name', 'percent-name', 'unicode-name', 'nested', 'large.bin'], perPage: 1, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 23,
        runs: true,
      },
      {
        backend: null,
        details: {"source":"listed-entry"},
        fixture: 'hash-name',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 24,
        runs: true,
      },
      {
        backend: null,
        details: {"source":"listed-entry"},
        fixture: 'percent-name',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 25,
        runs: true,
      },
      {
        backend: null,
        details: {"source":"listed-entry"},
        fixture: 'unicode-name',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 26,
        runs: true,
      },
      {
        backend: null,
        details: {"source":"listed-entry"},
        fixture: 'large.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 27,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'inner.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 28,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'moved.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 29,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'large.bin',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 30,
        runs: true,
      },
      {
        backend: null,
        details: {"cancel":"after-first-acknowledged-part","maxRead":null,"minParts":null,"params":{},"progressFinal":false,"source":"local-file"},
        fixture: 'cancelled.bin',
        intent: 'upload',
        kind: 'intent',
        label: 'upload',
        position: 31,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('cancelled.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('cancelled.bin') }),
        position: 32,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('moved.bin') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved.bin') }),
        position: 33,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('moved.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved.bin') }),
        position: 34,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('inner.bin') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('inner.bin') }),
        position: 35,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('inner.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('inner.bin') }),
        position: 36,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('nested') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('nested') }),
        position: 37,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('nested'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('nested') }),
        position: 38,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('large.bin') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('large.bin') }),
        position: 39,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('large.bin'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('large.bin') }),
        position: 40,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('hash-name') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('hash-name') }),
        position: 41,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('hash-name'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('hash-name') }),
        position: 42,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('percent-name') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('percent-name') }),
        position: 43,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('percent-name'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('percent-name') }),
        position: 44,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('unicode-name') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('unicode-name') }),
        position: 45,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('unicode-name'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('unicode-name') }),
        position: 46,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('folder') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 47,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 48,
        runs: true,
      },
    ],
  },
  'files.owned-directory-helpers': {
    fixtures: {"folder":{"path":"","recipe":null,"type":"directory"},"up":{"path":"up","recipe":null,"type":"directory"},"up-a":{"path":"up/a.bin","recipe":10,"type":"file"},"up-sub":{"path":"up/sub","recipe":null,"type":"directory"},"up-b":{"path":"up/sub/b.bin","recipe":11,"type":"file"},"up-empty":{"path":"up/empty","recipe":null,"type":"directory"},"copy":{"path":"copy","recipe":null,"type":"directory"},"copy-b":{"path":"copy/b.bin","recipe":11,"type":"file"},"moved":{"path":"moved","recipe":null,"type":"directory"},"moved-b":{"path":"moved/b.bin","recipe":11,"type":"file"}},
    lookupOwned: (signal, ownedPath) => MODELS['File']['find'](ownedPath, {  }, callOptions(signal)),
    lookupOwnedExpect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
    lookupOwnedOperationId: 'FileActionFind',
    notFoundError: 'not-found',
    removeOwned: (signal, ownedPath) => new MODELS['File']({ 'path': ownedPath }, callOptions(signal))['delete']({ 'recursive': true }),
    removeOwnedOperationId: 'DeleteFilesPath',
    removeOwnedStatus: 204,
    steps: [
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find']('/', {  }, callOptions(signal)),
        expect: { status: 422, error: 'bad-request/request-params-required', attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': '/' }),
        position: 1,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor']('/', { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: null, perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': '/' }),
        position: 2,
        runs: true,
      },
      {
        backend: 'site',
        kind: 'operation',
        label: 'BehaviorListForPath',
        position: 3,
        runs: false,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 4,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['create'](fixturePath('folder'), { 'mkdir_parents': false }, callOptions(signal)),
        expect: { status: 201, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'folder' }, listing: null },
        kind: 'operation',
        label: 'PostFoldersPath',
        operationId: 'PostFoldersPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 5,
        runs: true,
      },
      {
        backend: 'site',
        kind: 'operation',
        label: 'FileActionFind',
        position: 6,
        runs: false,
      },
      {
        backend: null,
        details: {"bytes":3632,"completed":["a.bin","sub/b.bin"],"emptyFolders":1,"files":2,"tree":{"directories":["empty","sub"],"emptyDirectories":["empty"],"files":[{"fixture":"up-a","path":"a.bin"},{"fixture":"up-b","path":"sub/b.bin"}]}},
        fixture: 'up',
        intent: 'upload-directory',
        kind: 'intent',
        label: 'upload-directory',
        position: 7,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'up' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up') }),
        position: 8,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-a'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'up-a' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-a') }),
        position: 9,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-sub'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'up-sub' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-sub') }),
        position: 10,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-b'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'up-b' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-b') }),
        position: 11,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-empty'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'up-empty' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-empty') }),
        position: 12,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('up'), { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['up-a', 'up-sub', 'up-empty'], perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('up') }),
        position: 13,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('up-sub'), { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['up-b'], perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-sub') }),
        position: 14,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('up-empty'), { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: [], perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-empty') }),
        position: 15,
        runs: true,
      },
      {
        backend: null,
        details: {"bytes":3632,"bytesMatch":[{"path":"a.bin","recipe":10},{"path":"sub/b.bin","recipe":11}],"emptyFolders":1,"files":2},
        fixture: 'up',
        intent: 'download-directory',
        kind: 'intent',
        label: 'download-directory',
        position: 16,
        runs: true,
      },
      {
        backend: null,
        details: {"from":"up-sub"},
        fixture: 'copy',
        intent: 'copy',
        kind: 'intent',
        label: 'copy',
        position: 17,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('copy'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'copy' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('copy') }),
        position: 18,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('copy-b'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'copy-b' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('copy-b') }),
        position: 19,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('copy'), { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['copy-b'], perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('copy') }),
        position: 20,
        runs: true,
      },
      {
        backend: null,
        details: {"from":"copy"},
        fixture: 'moved',
        intent: 'move',
        kind: 'intent',
        label: 'move',
        position: 21,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('copy-b'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('copy-b') }),
        position: 22,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('copy'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('copy') }),
        position: 23,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('moved'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'moved' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved') }),
        position: 24,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('moved-b'), {  }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: { fields: {}, fixture: 'moved-b' }, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved-b') }),
        position: 25,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('moved'), { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['moved-b'], perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved') }),
        position: 26,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['Folder']['listFor'](fixturePath('folder'), { 'per_page': 1000, ...page }, callOptions(signal)),
        expect: { status: 200, error: null, attempts: null, intervalSeconds: null, entry: null, listing: { entries: ['up', 'moved'], perPage: 1000, maxPages: 16, maxRecords: null } },
        kind: 'operation',
        label: 'FolderListForPath',
        operationId: 'FolderListForPath',
        operationPath: '/folders/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 27,
        runs: true,
      },
      {
        backend: null,
        details: {"source":null},
        fixture: 'moved-b',
        intent: 'download',
        kind: 'intent',
        label: 'download',
        position: 28,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('moved-b') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved-b') }),
        position: 29,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('moved-b'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved-b') }),
        position: 30,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('moved') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved') }),
        position: 31,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('moved'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('moved') }),
        position: 32,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('up-b') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-b') }),
        position: 33,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-b'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-b') }),
        position: 34,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('up-sub') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-sub') }),
        position: 35,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-sub'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-sub') }),
        position: 36,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('up-empty') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-empty') }),
        position: 37,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-empty'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-empty') }),
        position: 38,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('up-a') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-a') }),
        position: 39,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up-a'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up-a') }),
        position: 40,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('up') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('up') }),
        position: 41,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('up'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('up') }),
        position: 42,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => new MODELS['File']({ 'path': fixturePath('folder') }, callOptions(signal))['delete']({ 'recursive': false }),
        expect: { status: 204, error: null, attempts: null, intervalSeconds: null, entry: null, listing: null },
        kind: 'operation',
        label: 'DeleteFilesPath',
        operationId: 'DeleteFilesPath',
        operationPath: '/files/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 43,
        runs: true,
      },
      {
        backend: null,
        call: (signal, page) => MODELS['File']['find'](fixturePath('folder'), {  }, callOptions(signal)),
        expect: { status: 404, error: 'not-found', attempts: 5, intervalSeconds: 1, entry: null, listing: null },
        kind: 'operation',
        label: 'FileActionFind',
        operationId: 'FileActionFind',
        operationPath: '/file_actions/metadata/{path}',
        pathArguments: () => ({ 'path': fixturePath('folder') }),
        position: 44,
        runs: true,
      },
    ],
  },
}

const nativeFetch = globalThis.fetch

// The scenario this launch runs, the client every call uses, the run's owned folder, a local folder of the run's own
// for what its intents read and write, the Mock's own route for each operation an operation step calls, by
// operationId, and the Mock's whole catalogue of operations, once the Mock has been checked.
let scenario = null
let client = null
let namespaceRoot = null
let scratch = null
let routes = null
let catalogue = null

// The call under way, to which the SDK's fetch assigns each request; and every call not yet settled, which a deadline
// may have stopped waiting for.
let activeCall = null
const pendingCalls = new Set()

// The entries the latest listing of each fixture returned, by fixture: what a listed entry's download downloads.
const listed = {}

// Whether the run's owned folder is the case's own, to remove after a failure. created: the step that creates it got
// a 201 for exactly its path, and the SDK returned, decoded, a folder of exactly that path; only then is it the
// case's. answered and unanswered record only what the wire showed of a request to create it, a 201 or no answer at
// all, which alone never makes it the case's: either without created leaves whether the case owns it uncertain, and it
// is never removed. ownedCreator is the position of the step that creates it.
const owned = { answered: false, created: false, unanswered: false }
let ownedCreator = null

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

const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex')

const callOptions = signal => ({ autoPaginate: false, client, signal })

const fixturePath = name => (scenario.fixtures[name].path === '' ? namespaceRoot : `${namespaceRoot}/${scenario.fixtures[name].path}`)

// A recipe's bytes, refused unless they are those its SHA-256 names.
const recipeBytes = number => {
  const { length, modulus, multiplier, offset, sha256: digest } = RECIPES[number]
  const bytes = Buffer.alloc(length)

  for (let index = 0; index < length; index += 1) {
    bytes[index] = ((index * multiplier) + offset) % modulus
  }

  if (sha256(bytes) !== digest) {
    throw new Error(`Recipe ${number}'s bytes are not those its SHA-256 names`)
  }

  return bytes
}

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

// What is wrong with an operation step's request, if anything, against the Mock's route for its call's operation: its
// method, and the value its path gives the route's parameter, which must be the call's own.
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

// The Mock's route an API request was sent to, of all its catalogue's: the one of the request's method whose own path,
// up to its first parameter, begins the request's decoded path, the longest such; or exactly its path, for a route with
// no parameter. Null for a request no route serves.
const routeFor = record => {
  const decoded = decodePath(record.path)

  if (decoded === null) {
    return null
  }

  return catalogue.reduce((best, route) => {
    if (route.method !== String(record.method).toUpperCase()) {
      return best
    }

    const fits = route.parameterized ? decoded.startsWith(route.prefix) : decoded === route.path
    return fits && (!best || route.prefix.length > best.prefix.length) ? route : best
  }, null)
}

// The most of an API request's body read for what it asks of an upload, in bytes, a text body's counted in UTF-8, as it
// is sent (see sentOf()).
const SENT_LIMIT = 64 * 1024

// What an API request's body asks of an upload, read from init's body, which is left as it is for the SDK and never
// kept. body is how it was read: 'json-object', JSON, as text or bytes of at most SENT_LIMIT bytes, that is an object;
// or, read as asking nothing, 'none', no body, 'unsupported', a body neither text nor bytes, 'over-limit', one of more
// bytes, 'malformed', one that is not JSON, or 'not-object', JSON that is no object. Of an object only, by its own
// fields: the part it asks grants from and how many parts; ref, whether it gives the upload's ref, 'absent', 'valid', a
// string other than '', or 'invalid', any other value; and the SHA-256 of a valid ref, never the ref itself. Each is
// null when the body does not give it: only an object read whole shows a ref absent.
const sentOf = init => {
  const body = init ? init.body : undefined
  const unread = state => ({ body: state, part: null, parts: null, ref: null, ref_sha256: null })
  let text = null

  if (body === undefined || body === null) {
    return unread('none')
  }

  if (typeof body === 'string') {
    // Every code unit is at least one byte in UTF-8: a text of more code units than SENT_LIMIT is not counted.
    if (body.length > SENT_LIMIT || Buffer.byteLength(body, 'utf8') > SENT_LIMIT) {
      return unread('over-limit')
    }

    text = body
  } else if (ArrayBuffer.isView(body)) {
    if (body.byteLength > SENT_LIMIT) {
      return unread('over-limit')
    }

    text = Buffer.from(body.buffer, body.byteOffset, body.byteLength).toString('utf8')
  } else {
    return unread('unsupported')
  }

  let asked = null

  try {
    asked = JSON.parse(text)
  } catch {
    return unread('malformed')
  }

  if (asked === null || typeof asked !== 'object' || Array.isArray(asked)) {
    return unread('not-object')
  }

  const owns = field => Object.prototype.hasOwnProperty.call(asked, field)
  const own = field => (owns(field) ? asked[field] : undefined)
  let ref = 'absent'

  if (owns('ref')) {
    ref = typeof asked.ref === 'string' && asked.ref !== '' ? 'valid' : 'invalid'
  }

  return {
    body: 'json-object',
    part: Number.isSafeInteger(own('part')) ? own('part') : null,
    parts: Number.isSafeInteger(own('parts')) ? own('parts') : null,
    ref,
    ref_sha256: ref === 'valid' ? sha256(asked.ref) : null,
  }
}

// The SDK's HTTP client (Files.NetworkOptions.fetch): transport, Node.js's own fetch unless a test gives another, given
// each request's URL and init exactly as the SDK made them, once, and resolving or rejecting exactly as it did, the
// response's body left unread for the SDK. It records each request with the call it belongs to, whether it is one of
// the API's or one to storage, the cursor it sent and the one its answer named, by SHA-256, whether it sent this run's
// API key, never the key itself, what an API request asks of an upload (sentOf()), and, for a request to storage, the
// ETag its answer gave; for a request that got no answer, how its own signal stood as it rejected (see
// stoppedGrantReason()); and what the wire showed of a request to create the owned folder, a 201 or no answer, which
// never by itself makes that folder the case's (see owned). As storage's answer accepting a part arrives, before the
// SDK is given it, it tells the call (onAccepted), so that a step can act on an accepted part before the SDK can act on
// it. It refuses, sending nothing, a request outside any call under way, to another origin than the Mock's, or beyond
// WIRE_LIMIT.
const observingFetch = (origin, apiKey, createsOwned, transport = nativeFetch) => (url, init) => {
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
  const decoded = decodePath(target.pathname)
  const creating = createsOwned(String(details.method).toUpperCase(), target.pathname)

  // The API key the request sends in the API's public key header, whatever the case of its name, read from a copy of
  // init's headers, theirs left as they are: only whether it sends one, and whether that is this run's own, is kept.
  let sentKey = null

  try {
    sentKey = new Headers(init ? init.headers : undefined).get(API_KEY_HEADER)
  } catch {
    sentKey = null
  }

  // abort, disposition and server_outcome are only ever set for a request that got no answer: how its own signal stood
  // as it rejected, and, for a grant the SDK stopped unused, that disposition and the server's answer the journal shows
  // (see joinJournal()).
  const api = decoded !== null && decoded.startsWith(API_PREFIX)
  const record = {
    ...details,
    abort: null,
    api,
    api_key_matches: sentKey !== null && sentKey === apiKey,
    api_key_sent: sentKey !== null,
    cursor_sha256: sentCursor === null ? null : sha256(sentCursor),
    disposition: null,
    etag: null,
    items: null,
    journal: null,
    journal_seq: null,
    next_cursor_sha256: null,
    operation_id: call.operationId ?? null,
    rejection: null,
    sent: api ? sentOf(init) : null,
    seq: wire.exchanges.length + 1,
    server_outcome: null,
    status: null,
  }
  const exchange = { record, response: null }
  wire.exchanges.push(record)
  call.exchanges.push(exchange)
  wire.in_flight += 1

  return transport(url, init).then(response => {
    wire.in_flight -= 1
    record.status = response.status

    if (creating && response.status === 201) {
      owned.answered = true
    }

    const next = response.headers.get(CURSOR_NEXT)
    record.next_cursor_sha256 = next === null || next === '' ? null : sha256(next)
    exchange.response = response

    if (!record.api) {
      record.etag = response.headers.get('etag')

      if (String(record.method).toUpperCase() === 'PUT' && response.status >= 200 && response.status < 300 && call.onAccepted) {
        call.onAccepted(record)
      }
    }

    return response
  }, error => {
    wire.in_flight -= 1
    record.rejection = describe(error)

    // How the request's own signal, the one the SDK gave it, stood as it rejected: whether it had aborted, whether the
    // rejection is exactly its reason, and that reason's name; whether the call's phase had ended by then; and how many
    // requests had started by then, every one numbered after them started once this one had settled.
    const own = init ? init.signal : undefined
    const aborted = Boolean(own && own.aborted)
    const reason = aborted ? own.reason : undefined
    record.abort = {
      phase_ended: Boolean(call.phaseSignal && call.phaseSignal.aborted),
      reason_name: aborted && reason !== null && typeof reason === 'object' && typeof reason.name === 'string' ? reason.name : null,
      rejected_with_reason: aborted && Object.is(error, reason),
      settled_after: wire.exchanges.length,
      signal_aborted: aborted,
    }

    if (creating) {
      owned.unanswered = true
    }

    throw error
  })
}

// Makes one SDK call for context (its kind, position, attempt or page, and, for an operation step, its operation and
// path), within current's phase: its outcome, with the requests it sent; or, once the phase has ended or ends first,
// its abort, a call already started then left pending, to settle on its own, and unable to send anything more. Its
// requests see the phase's signal (phaseSignal), to record whether it had ended as one of them rejected.
const observe = async (context, call, current) => {
  const entry = { ...context, exchanges: [], phaseSignal: current.signal }

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

// What an operation step's call is, for observe().
const contextOf = (step, kind, attempt, page) => ({
  attempt,
  kind,
  operationId: step.operationId ?? null,
  page,
  pathArguments: step.pathArguments ?? null,
  position: step.position,
})

// The one request an operation step's call sent and the answer it got, settled within current's phase, to the Mock's
// route for the call's operation and exactly the call's own path; anything else fails its position.
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

// Whether value meets matcher, each matcher the definition gives it: one_of, one of its values; includes, every one of
// its values in a list or text; not, any but its value. A field the model does not have is null.
const meets = (value, matcher) => Object.entries(matcher).every(([kind, expected]) => {
  const actual = value === undefined ? null : value
  const same = (first, second) => JSON.stringify(first) === JSON.stringify(second)

  if (kind === 'one_of') {
    return expected.some(candidate => same(candidate, actual))
  }

  if (kind === 'includes') {
    return (Array.isArray(actual) || typeof actual === 'string') && expected.every(item => actual.includes(item))
  }

  if (kind === 'not') {
    return !same(actual, expected)
  }

  return false
})

// An entry as a listing or lookup gives it, its path, type and a file's size, as the expected fixture would be one.
const memberOf = (entryPath, type, size) => JSON.stringify([ entryPath, type, type === 'file' ? size ?? null : null ])

const fixtureMember = name => {
  const fixture = scenario.fixtures[name]
  return memberOf(fixturePath(name), fixture.type, fixture.recipe ? RECIPES[fixture.recipe].length : null)
}

// A returned entry: the model of one of the case's fixtures, its own path, type and, a file's, size, with each of its
// named fields meeting its matchers.
const checkEntry = (value, entry) => {
  const attributes = value && typeof value === 'object' ? value.attributes : null

  if (!attributes || typeof attributes !== 'object') {
    throw new Error(`The call returned no model, not ${fixtureMember(entry.fixture)}`)
  }

  const actual = memberOf(attributes.path, attributes.type, attributes.size)

  if (actual !== fixtureMember(entry.fixture)) {
    throw new Error(`The call returned ${actual}, not ${fixtureMember(entry.fixture)}`)
  }

  Object.entries(entry.fields).forEach(([name, matcher]) => {
    if (!meets(attributes[name], matcher)) {
      throw new Error(`The entry's ${name} is ${JSON.stringify(attributes[name] ?? null)}, which does not meet ${JSON.stringify(matcher)}`)
    }
  })
}

// A position of one operation call; or, when its error may take a while to answer, up to its attempts calls, its
// interval apart, until the error answers: a lookup that still finds what it looks for is tried again, and any other
// outcome ends it. Each call counts only once settled within current's phase.
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

    // The owned folder becomes the case's, to remove after a failure, only here: once the step that creates it got a
    // 201 and the SDK returned, decoded, a folder of exactly its path, as checked above.
    const created = outcome.value?.attributes

    if (step.position === ownedCreator && status === 201 && created?.path === namespaceRoot && created?.type === 'directory') {
      owned.created = true
    }

    return
  }
}

// A listing: pages of at most its per_page items, each one call sending exactly the cursor the page before named, the
// first none, at most maxPages of them and maxRecords items in all, the last naming no next page; then, unless its
// members belong to the site (entries null), exactly its entries, each once, which a listed entry's download then
// takes. Each page counts only once settled within current's phase.
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

    found.push(...outcome.value)
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

  const members = found.map(item => {
    const attributes = item && item.attributes ? item.attributes : {}
    return memberOf(attributes.path, attributes.type, attributes.size)
  })
  const expected = listing.entries.map(fixtureMember)

  if (JSON.stringify([...members].sort()) !== JSON.stringify([...expected].sort())) {
    throw new Error(`The listing holds ${JSON.stringify(members)}, not ${JSON.stringify(expected)}`)
  }

  listing.entries.forEach(name => {
    listed[name] = found[members.indexOf(fixtureMember(name))]
  })
}

// A Node.js stream that gives bytes forward only, never more than maxRead of them at a time.
const forwardOnly = (bytes, maxRead) => {
  let offset = 0

  return new Readable({
    highWaterMark: maxRead,
    read() {
      if (offset >= bytes.length) {
        this.push(null)
        return
      }

      const chunk = Buffer.from(bytes.subarray(offset, offset + maxRead))
      offset += chunk.length
      this.push(chunk)
    },
  })
}

// Runs an intent step's helper as one call within current's phase: its value, once settled within the phase, and the
// requests it sent; its failure is the position's unless expectFailure. hooks are the call's, such as onAccepted (see
// observingFetch()).
const runHelper = async (step, record, current, call, { expectFailure = false, hooks = {} } = {}) => {
  record.attempts = 1
  const outcome = await observe({ ...contextOf(step, 'case', 1, null), ...hooks }, () => call(current.signal), current)
  current.check()
  record.statuses.push(...outcome.exchanges.map(({ record: exchanged }) => exchanged.status))

  if (outcome.failed && !expectFailure) {
    throw new Error(`The ${step.intent} failed: ${describe(outcome.error)}`)
  }

  return outcome
}

// A stream this file gave an upload, which the SDK never closes: destroyed once the upload has settled, and its close
// awaited.
const closeStream = stream => new Promise(resolve => {
  if (stream.closed) {
    resolve()
    return
  }

  stream.once('close', resolve)
  stream.destroy()
})

// An upload of the fixture's recipe bytes, from the source the step names, with its parameters, reporting its
// progress: completed at exactly the fixture's path, its last report, when expected, giving the recipe's length as its
// total and acknowledged bytes; or cancelled as soon as storage has accepted a part of it, before the SDK is given that
// answer and so before it could finalize, rejecting with exactly that cancellation's reason. As that answer arrives,
// before the cancellation is asked for, the step records the boundary of the requests started by then, the seq of the
// last of them (observingFetch() numbers each request as it starts it): every request of the upload numbered after it
// was started once the cancellation had been asked for. Which parts storage accepted, how many distinct ones, what the
// upload published and whether it sent a part after that boundary are storage's own evidence, checked against the
// journal once the case is over (see transferProblems()).
//
// A local file is uploaded by File.upload(). A seekable source is a stream of a file on disk holding the bytes, given to
// File.uploadFromStream() with its known size: a Node.js stream has no generic seek, and the SDK reads it forward as any
// stream; the file on disk is what could be read again. A forward-only source is a stream of unknown size giving at most
// the step's bytes at a time. Either stream stays this file's, which closes it once the upload has settled.
const runUpload = async (step, record, current) => {
  const { details } = step
  const bytes = recipeBytes(scenario.fixtures[step.fixture].recipe)
  const destination = fixturePath(step.fixture)
  const cancelling = new AbortController()
  const reason = new Error(`The upload of ${step.fixture} was cancelled as storage accepted its first part`)
  const cancel = { accepted_seq: null, requested: details.cancel ?? null, started_through_seq: null }
  const reports = []
  const onProgress = progress => { reports.push({ ...progress }) }

  // A cancelled upload sends its parts one at a time, so that no other part of it should be under way as its first is
  // accepted; its evidence relies not on that but on when each of its requests started (see TRANSFER_EVIDENCE).
  const optionsOf = signal => ({
    ...callOptions(details.cancel ? AbortSignal.any([signal, cancelling.signal]) : signal),
    ...(details.cancel ? { concurrency: 1 } : {}),
    onProgress,
  })

  let call
  let stream = null

  if (details.source === 'local-file') {
    const localPath = path.join(scratch, `upload-${step.position}`)
    fs.writeFileSync(localPath, bytes)
    call = signal => MODELS.File.upload(localPath, destination, { ...details.params }, optionsOf(signal))
  } else if (details.source === 'seekable-stream') {
    const localPath = path.join(scratch, `upload-${step.position}`)
    fs.writeFileSync(localPath, bytes)
    stream = fs.createReadStream(localPath)
    call = signal => MODELS.File.uploadFromStream(stream, destination, { ...details.params }, { ...optionsOf(signal), size: bytes.length })
  } else {
    stream = forwardOnly(bytes, details.maxRead)
    call = signal => MODELS.File.uploadFromStream(stream, destination, { ...details.params }, optionsOf(signal))
  }

  // The cancellation is asked for by the observing fetch, as storage's answer accepting a part of this upload arrives,
  // never by a progress report, which may come only once the upload has settled: the first such answer records the seq
  // of the last request started by then, the boundary, and only then cancels.
  const hooks = details.cancel === 'after-first-acknowledged-part'
    ? {
      onAccepted: accepted => {
        if (!cancelling.signal.aborted) {
          cancel.accepted_seq = accepted.seq
          cancel.started_through_seq = wire.exchanges.length
          cancelling.abort(reason)
        }
      },
    }
    : {}

  let outcome = null

  try {
    outcome = await runHelper(step, record, current, call, { expectFailure: Boolean(details.cancel), hooks })
  } finally {
    if (stream !== null) {
      await closeStream(stream)
    }
  }

  // The requests to storage it sent, part attempts sent again included: storage's distinct accepted parts are counted
  // from the journal (see transferProblems()), never from these.
  const storageRequests = outcome.exchanges.filter(({ record: exchanged }) => !exchanged.api).length
  const last = reports.length > 0 ? reports[reports.length - 1] : null
  record.intent = { bytes: bytes.length, cancel, last_report: last, source: details.source, storage_requests: storageRequests }

  // A cancelled upload rejects with exactly the reason it was cancelled with, and only once storage accepted a part, the
  // boundary of the requests started by then recorded.
  if (details.cancel) {
    if (!outcome.failed || !Object.is(outcome.error, reason) || cancel.accepted_seq === null || cancel.started_through_seq === null) {
      throw new Error(`The upload was not cancelled with its own reason as storage accepted its first part: ${outcome.failed ? describe(outcome.error) : 'it completed'}`)
    }

    return
  }

  if (outcome.value?.attributes?.path !== destination) {
    throw new Error(`The upload completed as ${JSON.stringify(outcome.value?.attributes?.path)}, not ${JSON.stringify(destination)}`)
  }

  // Its last report gives the recipe's length as both its total and its acknowledged bytes.
  if (details.progressFinal && !(last && last.totalBytes === bytes.length && last.bytesTransferred === bytes.length)) {
    throw new Error(`The upload's last progress report was ${JSON.stringify(last)}, not ${bytes.length} of ${bytes.length} bytes acknowledged`)
  }
}

// The bytes a File's downloadToStream() gives a writable that holds them.
const streamed = (file, signal) => {
  const chunks = []
  const writable = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(Buffer.from(chunk))
      callback()
    },
  })

  return file.downloadToStream(writable, { signal }).then(() => Buffer.concat(chunks))
}

// A download of the fixture's bytes: of the entry the latest listing returned for it, which describes itself and
// downloads into a stream, or else of a File described by its path, downloaded to a local file; byte for byte its
// recipe's.
const runDownload = async (step, record, current) => {
  const recipe = RECIPES[scenario.fixtures[step.fixture].recipe]
  let call

  if (step.details.source === 'listed-entry') {
    const entry = listed[step.fixture]

    if (!entry) {
      throw new Error(`No listing returned ${step.fixture}, whose entry was to download itself`)
    }

    call = signal => downloadListed(entry, signal).then(file => streamed(file, signal))
  } else {
    const localPath = path.join(scratch, `download-${step.position}`)
    call = signal => describeForDownload(signal, fixturePath(step.fixture))
      .then(file => file.downloadToFile(localPath, { signal }))
      .then(() => fs.readFileSync(localPath))
  }

  const outcome = await runHelper(step, record, current, call)
  const bytes = outcome.value
  record.intent = { bytes: bytes.length, sha256: sha256(bytes) }

  if (bytes.length !== recipe.length || sha256(bytes) !== recipe.sha256) {
    throw new Error(`The download gave ${bytes.length} bytes of SHA-256 ${sha256(bytes)}, not its recipe's ${recipe.length} of ${recipe.sha256}`)
  }
}

// A copy or move of the step's source fixture to its fixture, through a File of the source's path, waited for until
// its migration, if any, completes.
const runAction = async (step, record, current) => {
  const from = fixturePath(step.details.from)
  const to = fixturePath(step.fixture)
  const call = signal => {
    const file = new MODELS.File({ path: from }, callOptions(signal))
    const action = step.intent === 'copy' ? file.copyTo(to) : file.moveTo(to)
    return action.then(response => response.waitForCompletion({ signal, timeoutMs: ACTION_WAIT_MS }))
  }

  await runHelper(step, record, current, call)
}

// The empty folders within folder, at any depth.
const emptyFoldersIn = folder => fs.readdirSync(folder, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .reduce((count, entry) => {
    const inner = path.join(folder, entry.name)
    return count + (fs.readdirSync(inner).length === 0 ? 1 : 0) + emptyFoldersIn(inner)
  }, 0)

// A folder upload of a local tree this file makes of the step's tree, each file its fixture's recipe bytes: what it
// uploaded is exactly the expected files, the folders the tree has, the empty ones among them, and their bytes.
const runUploadDirectory = async (step, record, current) => {
  const { details } = step
  const localRoot = path.join(scratch, `tree-${step.position}`)
  fs.mkdirSync(localRoot)
  details.tree.directories.forEach(directory => fs.mkdirSync(path.join(localRoot, ...directory.split('/')), { recursive: true }))
  details.tree.files.forEach(file => fs.writeFileSync(path.join(localRoot, ...file.path.split('/')), recipeBytes(scenario.fixtures[file.fixture].recipe)))

  const call = signal => MODELS.File.uploadDirectory(localRoot, fixturePath(step.fixture), callOptions(signal))
  const result = (await runHelper(step, record, current, call)).value
  record.intent = { result }

  const files = [...result.files].sort()
  const directories = [...result.directories].sort()
  const emptyFolders = details.tree.emptyDirectories.filter(directory => result.directories.includes(directory)).length
  const actual = { bytes: result.bytes, directories, emptyFolders, files, fileCount: result.files.length }
  const expected = { bytes: details.bytes, directories: [...details.tree.directories].sort(), emptyFolders: details.emptyFolders, files: details.completed, fileCount: details.files }

  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`The folder upload made ${JSON.stringify(actual)}, not ${JSON.stringify(expected)}`)
  }
}

// A folder download into a new local folder: its files, the empty folders it made and their bytes as expected, and
// each file to match byte for byte its recipe's.
const runDownloadDirectory = async (step, record, current) => {
  const { details } = step
  const localRoot = path.join(scratch, `folder-${step.position}`)
  const call = signal => MODELS.File.downloadDirectory(fixturePath(step.fixture), localRoot, callOptions(signal))
  const result = (await runHelper(step, record, current, call)).value
  record.intent = { result }

  const actual = { bytes: result.bytes, emptyFolders: emptyFoldersIn(localRoot), files: result.files.length }
  const expected = { bytes: details.bytes, emptyFolders: details.emptyFolders, files: details.files }

  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`The folder download gave ${JSON.stringify(actual)}, not ${JSON.stringify(expected)}`)
  }

  details.bytesMatch.forEach(({ path: relative, recipe }) => {
    const bytes = fs.readFileSync(path.join(localRoot, ...relative.split('/')))

    if (sha256(bytes) !== RECIPES[recipe].sha256) {
      throw new Error(`The folder download wrote ${relative} with SHA-256 ${sha256(bytes)}, not its recipe's ${RECIPES[recipe].sha256}`)
    }
  })
}

const INTENTS = {
  copy: runAction,
  download: runDownload,
  'download-directory': runDownloadDirectory,
  move: runAction,
  upload: runUpload,
  'upload-directory': runUploadDirectory,
}

// Runs every position of this backend in order, within current's phase, until one fails: that failure, or null. A
// position passes only once it is checked within the phase.
const runCase = async (receipt, current) => {
  for (const [index, step] of scenario.steps.entries()) {
    if (!step.runs) {
      continue
    }

    const record = receipt.positions[index]

    try {
      if (step.kind === 'intent') {
        await INTENTS[step.intent](step, record, current)
      } else if (step.expect.listing === null) {
        await callStep(step, record, current)
      } else {
        await readListing(step, record, current)
      }

      current.check()
      record.outcome = 'passed'
    } catch (error) {
      record.outcome = 'failed'
      return { message: describe(error), where: `position ${step.position} (${step.label})` }
    }
  }

  return null
}

// After a failure, within current's phase, the reserve: once every call and request of the case has settled, deletes
// the owned folder recursively, as the definition's cleanup says, only when the case is known to have created it, and
// then looks it up until it answers 404 with the API's not-found error. Anything else, a late answer included, is a
// failure of the cleanup, never the run's first failure; nothing is removed while a call of the case may still act, and
// nothing outside the owned folder ever is.
const removeAfterFailure = async current => {
  const removal = { absent: false, failures: [], removed: false, settled: false }

  if (!(await settled(current))) {
    removal.failures.push('Calls of the case were still under way when the reserve ran out, so nothing was removed')
    return removal
  }

  removal.settled = true

  if (!owned.created) {
    return removal
  }

  // The owned folder's own path, as the argument of each cleanup call's route.
  const ownedArgument = operationId => () => ({ [routes[operationId].parameter]: namespaceRoot })
  const context = { attempt: 1, kind: 'cleanup', operationId: scenario.removeOwnedOperationId, page: null, pathArguments: ownedArgument(scenario.removeOwnedOperationId), position: null }
  const removed = await observe(context, () => scenario.removeOwned(current.signal, namespaceRoot), current)

  try {
    const { status } = answered(removed, current).record

    if (removed.failed || status !== scenario.removeOwnedStatus) {
      throw new Error(`The recursive removal answered ${status}${removed.failed ? ` with ${describe(removed.error)}` : ''}`)
    }

    removal.removed = true
  } catch (error) {
    removal.failures.push(describe(error))
    return removal
  }

  const expect = scenario.lookupOwnedExpect
  const attempts = expect.attempts ?? 1

  for (let attempt = 1; attempt <= attempts && !removal.absent; attempt += 1) {
    try {
      if (attempt > 1) {
        await delay(expect.intervalSeconds * 1000, current.signal)
      }

      const lookupContext = { attempt, kind: 'cleanup', operationId: scenario.lookupOwnedOperationId, page: null, pathArguments: ownedArgument(scenario.lookupOwnedOperationId), position: null }
      const lookup = await observe(lookupContext, () => scenario.lookupOwned(current.signal, namespaceRoot), current)
      const { status } = answered(lookup, current).record
      removal.absent = lookup.failed && status === 404 && lookup.error instanceof FilesApiError && lookup.error.code === 404 && lookup.error.type === scenario.notFoundError
    } catch (error) {
      removal.failures.push(describe(error))
      return removal
    }
  }

  if (!removal.absent) {
    removal.failures.push(`The owned folder was still found after ${attempts} lookups`)
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

// The Mock's catalogue of operations, each with its method, the semantic operation its journal names, its path and
// that path up to its first parameter.
const catalogueOf = ready => ready.operations.filter(operation => isObject(operation) && typeof operation.id === 'string' &&
  typeof operation.method === 'string' && typeof operation.path === 'string').map(operation => ({
  id: operation.id,
  method: operation.method.toUpperCase(),
  parameterized: operation.path.includes('{'),
  path: operation.path,
  prefix: operation.path.includes('{') ? operation.path.slice(0, operation.path.indexOf('{')) : operation.path,
}))

// The Mock's own route for each operation an operation step calls, from its catalogue: the one operation for its
// operationId, whose path must end with the schema's own path for it, in the route's one parameter.
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
      parameterized: true,
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

// What differs between a journal entry and the API request the SDK sent in its place, as both name it: its order and
// epoch, its method, semantic operation and path, as the Mock's route serving it gives them, its status, its
// credential, both as the journal names it and as the request sent it, the cursor sent, with its wire parameter, and
// the one answered, and a page's number of items. A fault differs too. For a request that got no answer (answered
// false), only what the request itself names is compared, nothing of an answer the client never saw.
const entryProblems = (entry, record, route, lastSeq, { answered = true } = {}) => {
  const target = route.parameterized ? targetOf(entry.path, route) : entry.path
  const sent = route.parameterized ? targetOf(record.path, route) : decodePath(record.path)
  const { credentials } = entry
  const wireCursor = isObject(entry.wire) && has(entry.wire, CURSOR_PARAMETER)

  return [
    typeof entry.seq === 'number' && entry.seq > lastSeq ? null : `seq ${JSON.stringify(entry.seq)} does not follow ${lastSeq}`,
    entry.epoch === 1 ? null : `epoch ${JSON.stringify(entry.epoch)}`,
    String(entry.method).toUpperCase() === String(record.method).toUpperCase()
      ? null : `method ${JSON.stringify(entry.method)}, not ${record.method}`,
    entry.operation === route.id ? null : `operation ${JSON.stringify(entry.operation)}, not ${route.id}`,
    target !== null && target === sent ? null : `path ${JSON.stringify(entry.path)}, not ${record.path}`,
    !answered || entry.status === record.status ? null : `status ${JSON.stringify(entry.status)}, not ${record.status}`,
    entry.fault_id === null ? null : `fault ${JSON.stringify(entry.fault_id)}`,
    isObject(credentials) && Object.keys(credentials).join(',') === 'api_key' && credentials.api_key === FIRST_CREDENTIAL
      ? null : 'a credential other than this run\'s own API key',
    record.api_key_matches === true
      ? null : `a request that sent ${record.api_key_sent ? 'another API key than this run\'s own' : 'no API key'}`,
    sameCursor(entry, 'cursor_sha256', record.cursor_sha256) && wireCursor === (record.cursor_sha256 !== null)
      ? null : 'the cursor sent',
    !answered || sameCursor(entry, 'next_cursor_sha256', record.next_cursor_sha256) ? null : 'the cursor answered',
    !answered || record.items === null || entry.items === record.items ? null : `items ${JSON.stringify(entry.items)}, not ${record.items}`,
  ].filter(problem => problem !== null)
}

// The operation the Mock journals each request to storage as, by its method: a part's PUT to its upload_uri, and a
// file's GET from its download_uri.
const STORAGE_OPERATIONS = { GET: 'transfers.download', PUT: 'transfers.upload_part' }

const HEX64 = /^[0-9a-f]{64}$/
const isCount = value => Number.isSafeInteger(value) && value >= 0
const isId = value => Number.isSafeInteger(value) && value > 0

// What a journal entry shows, kept with the request it joined: its operation and status, the value its path gives its
// route's parameter (target, null for storage's), the type it found, and the upload, part and version it used, with the
// byte count and SHA-256 of the bytes it stored, published or sent. A field the entry lacks is null.
const journalOf = (entry, target) => ({
  bytes: entry.bytes ?? null,
  operation: entry.operation ?? null,
  part: entry.part ?? null,
  seq: entry.seq,
  sha256: entry.sha256 ?? null,
  status: entry.status,
  target,
  type: entry.type ?? null,
  upload: entry.upload ?? null,
  version: entry.version ?? null,
})

// What differs between a journal entry and the request to storage the SDK sent in its place: its order and epoch, its
// method, storage operation and path, its status, no fault, and no credential, as the request must send none; and, for
// an answer that stored or sent bytes, the upload and part, or the version, it used, with the byte count and SHA-256 of
// those bytes, a stored part's SHA-256 being the ETag storage answered the client with.
const storageProblems = (entry, record, lastSeq) => {
  const operation = STORAGE_OPERATIONS[String(record.method).toUpperCase()] ?? null
  const entryPath = typeof entry.path === 'string' ? decodePath(entry.path) : null
  const succeeded = record.status >= 200 && record.status < 300
  let transfer = null

  if (succeeded && operation === 'transfers.upload_part' &&
      !(isId(entry.upload) && isId(entry.part) && isCount(entry.bytes) && HEX64.test(`${entry.sha256}`) && record.etag === `"${entry.sha256}"`)) {
    transfer = `upload ${JSON.stringify(entry.upload)}, part ${JSON.stringify(entry.part)}, bytes ${JSON.stringify(entry.bytes)} and SHA-256 ${JSON.stringify(entry.sha256)}, answered with the ETag ${JSON.stringify(record.etag)}`
  } else if (succeeded && operation === 'transfers.download' &&
      !(isId(entry.version) && isCount(entry.bytes) && HEX64.test(`${entry.sha256}`))) {
    transfer = `version ${JSON.stringify(entry.version)}, bytes ${JSON.stringify(entry.bytes)} and SHA-256 ${JSON.stringify(entry.sha256)}`
  }

  return [
    typeof entry.seq === 'number' && entry.seq > lastSeq ? null : `seq ${JSON.stringify(entry.seq)} does not follow ${lastSeq}`,
    entry.epoch === 1 ? null : `epoch ${JSON.stringify(entry.epoch)}`,
    String(entry.method).toUpperCase() === String(record.method).toUpperCase()
      ? null : `method ${JSON.stringify(entry.method)}, not ${record.method}`,
    operation !== null && entry.operation === operation ? null : `operation ${JSON.stringify(entry.operation)}, not ${operation}`,
    entryPath !== null && entryPath === decodePath(record.path) ? null : `path ${JSON.stringify(entry.path)}, not ${record.path}`,
    entry.status === record.status ? null : `status ${JSON.stringify(entry.status)}, not ${record.status}`,
    entry.fault_id === null ? null : `fault ${JSON.stringify(entry.fault_id)}`,
    !has(entry, 'credentials') && !record.api_key_sent ? null : 'a credential sent to storage',
    transfer,
  ].filter(problem => problem !== null)
}

// The Mock's semantic operations of an upload's begin_upload, which, sent with the upload's ref, asks for the grants of
// further parts, and of its completion.
const BEGIN_UPLOAD = 'files.begin_upload'
const FINALIZE_UPLOAD = 'files.finalize_upload'

// The disposition of a request that got no answer and yet fails nothing: a grant an upload asked for ahead, which the
// SDK stopped once the upload no longer needed it, and which the upload never used (see stoppedGrantReason()).
const STOPPED_UNUSED_GRANT = 'stopped-unused-grant'

// The Mock's route an API request is joined by: an operation step's, the route for its own operation; a helper's, the
// route serving it.
const routeOfRecord = record => (record.operation_id !== null && routes[record.operation_id] ? routes[record.operation_id] : routeFor(record))

// Whether an API request is a begin_upload sent as a JSON object with an upload's valid ref (sentOf()), asking for the
// grants of at least one part from the second on: never an upload's first begin_upload, which grants its first part.
const isFollowUpGrant = record => String(record.method).toUpperCase() === 'POST' && routeOfRecord(record)?.id === BEGIN_UPLOAD &&
  record.sent !== null && record.sent.body === 'json-object' && record.sent.ref === 'valid' && record.sent.ref_sha256 !== null &&
  record.sent.part !== null && record.sent.part >= 2 && record.sent.parts !== null && record.sent.parts >= 1

// The completion of the upload a grant was asked for, by its ref: the request of the grant's own step to the Mock's
// route that finalizes an upload, sent as a JSON object with the same valid ref, answered 200 or 201, and started only
// once the grant had settled; or null.
const completionAfter = record => wire.exchanges.find(other => other.api && other.kind === 'case' &&
  other.position === record.position && String(other.method).toUpperCase() === 'POST' &&
  routeOfRecord(other)?.id === FINALIZE_UPLOAD && (other.status === 200 || other.status === 201) && other.sent !== null &&
  other.sent.body === 'json-object' && other.sent.ref === 'valid' && other.sent.ref_sha256 === record.sent.ref_sha256 &&
  other.seq > record.abort.settled_after) ?? null

// Why a grant asked for ahead that got no answer is not, by what the client saw, one the SDK stopped once its upload no
// longer needed it; null when it is: its own signal had aborted as it rejected, with the AbortError of the SDK's own
// abort without a reason, the fetch rejecting with exactly that reason, never judged by an error's text, while the
// case's phase went on; its step is an upload that is not a cancellation, and passed; and the upload's completion, by
// the grant's ref, answered, started once the grant had settled. What the journal shows of it is checked only once
// every request has been joined (see unusedGrantReason()).
const stoppedGrantReason = (record, positions) => {
  const { abort } = record
  const index = scenario.steps.findIndex(step => step.position === record.position)
  const step = index === -1 ? null : scenario.steps[index]

  if (abort === null || !abort.signal_aborted || !abort.rejected_with_reason) {
    return 'it was not stopped by its own signal'
  }

  if (abort.phase_ended) {
    return 'the case\'s phase had ended when it was stopped'
  }

  if (abort.reason_name !== 'AbortError') {
    return `its own signal stopped it with ${JSON.stringify(abort.reason_name)}, not the AbortError of an abort without a reason`
  }

  if (record.kind !== 'case' || step === null || step.kind !== 'intent' || step.intent !== 'upload' || step.details.cancel) {
    return 'its step is not an upload without a cancellation'
  }

  if (positions[index].outcome !== 'passed') {
    return 'its upload step did not pass'
  }

  return completionAfter(record) === null ? 'no answered completion of its upload by its ref started once it had settled' : null
}

// Whether a journal entry is exactly a stopped grant's own, by everything the grant's request names and nothing of an
// answer the client never saw: of its route and path, its epoch and this run's own credential, with no fault and no
// cursor, after the API entry joined before the grant was sent.
const isStoppedGrantEntry = (entry, grant) => isObject(entry) &&
  entryProblems(entry, grant.record, grant.route, grant.after, { answered: false }).length === 0

// Why a stopped grant, with its own journal entry if the journal has one, is not one its upload never used, by what
// the journal shows of its step; null when it is: the completion its ref started finalized the upload that its step's
// one first begin_upload began, the one sent as a JSON object, read whole, without a ref of its own, as neither a body
// read as asking nothing nor a ref that is no valid one shows a ref absent (sentOf()); its entry, if any, is of that
// upload; and every request of its step to storage was joined with an entry of a part outside those it asked grants
// for.
const unusedGrantReason = ({ entry, record }) => {
  const finalized = completionAfter(record).journal
  const ofStep = wire.exchanges.filter(other => other.kind === 'case' && other.position === record.position)

  if (finalized === null || finalized.operation !== FINALIZE_UPLOAD || !isId(finalized.upload)) {
    return 'the journal has no completion of its upload'
  }

  const { upload } = finalized
  const begun = ofStep.filter(other => other.api && other.sent !== null && other.sent.body === 'json-object' &&
    other.sent.ref === 'absent' && other.journal !== null && other.journal.operation === BEGIN_UPLOAD &&
    other.journal.status === 200 && other.journal.upload === upload).length

  if (begun !== 1) {
    return `${begun} begin_upload requests of its step sent as JSON objects without a ref began upload ${upload}, which its ref finalized, not one`
  }

  if (entry !== null && entry.upload !== upload) {
    return `the journal has it for upload ${JSON.stringify(entry.upload ?? null)}, not upload ${upload}, which its ref finalized`
  }

  const last = record.sent.part + record.sent.parts - 1

  for (const other of ofStep.filter(({ api }) => !api)) {
    if (other.journal === null) {
      return `request ${other.seq} of its step to storage was not joined with the journal`
    }

    const { part } = other.journal

    if (!isId(part)) {
      return `request ${other.seq} of its step to storage shows no part`
    }

    if (part >= record.sent.part && part <= last) {
      return `part ${part}, one it asked a grant for, was sent to storage in request ${other.seq}`
    }
  }

  return null
}

// A request that got no answer, as the join finds it: with the entry the journal has for it, if any, and, for a grant
// asked for ahead, why it is not one the SDK stopped unused.
const noAnswer = (record, entry, reason) => {
  const journaled = entry === null ? 'and the journal does not have it' : `though the journal has it, answered ${JSON.stringify(entry.status)}`
  return `Request ${record.seq} got no answer, ${journaled}${reason === null ? '' : `; it is no unused grant the SDK stopped: ${reason}`}`
}

// Matches every request the SDK sent with the Mock's journal entry for it, the API's and storage's alike, one for one:
// every API request, in the order sent, with the journal's next API entry, by everything both name (see
// entryProblems()); and every request to storage, in the order sent, with the journal's next entry for storage, a
// transfer's, by everything both name (see storageProblems()). Each request joined keeps what its entry shows
// (journalOf()), the evidence its step's transfers are then checked against (see transferProblems()). The problems
// found: none when every request has exactly its entry and the journal holds nothing else. A request that got no
// answer, whatever the journal holds for it, one missing from the journal, one no route of the Mock serves, an entry no
// request accounts for and an entry that differs from its request each leave the join incomplete: nothing stands in for
// evidence the journal does not give.
//
// An API request that got no answer has as its entry only the journal's next API entry exactly of its request, nothing
// of an answer compared. The one exception is a grant the client saw the SDK stop unused (stoppedGrantReason(), by
// positions, the receipt's): as the Mock journals a request only as it answers it, its entry, if any, is the first API
// entry after the one joined before the grant was sent that is exactly of its request and that no other request
// joins, a second such staying unexplained. Once every request to storage has been joined, such a grant its upload
// never used (unusedGrantReason()) keeps its record's status null and rejection, with its disposition and, apart from
// them, its entry's answer as the server's outcome, or null when the final journal shows none, which shows only that,
// never that the grant was not sent; any other fails as any request that got no answer, in the order it was sent.
const joinJournal = (journal, positions) => {
  const problems = []
  const isApiEntry = entry => isObject(entry) && typeof entry.path === 'string' && entry.path.startsWith(API_PREFIX)
  const apiEntries = journal.entries.filter(isApiEntry)
  const otherEntries = journal.entries.filter(entry => !isApiEntry(entry))
  let index = 0
  let lastSeq = 0

  // Each grant asked for ahead that got no answer: one the SDK stopped, with the seq of the API entry joined before it
  // was sent (after), its own entry and its place among the problems, once known; or why it is not one.
  const stopped = []
  const reasons = new Map()

  wire.exchanges.filter(record => record.api && record.status === null && isFollowUpGrant(record)).forEach(record => {
    const reason = stoppedGrantReason(record, positions)

    if (reason === null) {
      stopped.push({ after: null, entry: null, record, route: routeOfRecord(record), slot: null })
    } else {
      reasons.set(record, reason)
    }
  })

  // Gives entry to the first stopped grant already sent and still without its own entry whose entry it exactly is.
  const claim = entry => {
    const grant = stopped.find(candidate => candidate.after !== null && candidate.entry === null && isStoppedGrantEntry(entry, candidate))

    if (grant) {
      grant.entry = entry
    }

    return Boolean(grant)
  }

  // An operation step's request is joined by the Mock's route for its own operation; a helper's, by the route serving it.
  wire.exchanges.filter(record => record.api).forEach(record => {
    const route = routeOfRecord(record)

    if (route === null) {
      problems.push(`Request ${record.seq}, ${record.method} ${record.path}, is served by no route of the Mock's catalogue`)
      return
    }

    const grant = stopped.find(candidate => candidate.record === record)

    if (grant) {
      grant.after = lastSeq
      grant.slot = problems.length
      problems.push(null)
      return
    }

    // An entry ahead of this request's own that is exactly a stopped grant's is that grant's.
    const answered = record.status !== null
    const fits = candidate => isObject(candidate) && entryProblems(candidate, record, route, lastSeq, { answered }).length === 0

    while (index < apiEntries.length && !fits(apiEntries[index]) && claim(apiEntries[index])) {
      index += 1
    }

    const entry = apiEntries[index]

    if (!answered) {
      const own = fits(entry) ? entry : null

      if (own !== null) {
        index += 1
        lastSeq = own.seq
      }

      problems.push(noAnswer(record, own, reasons.get(record) ?? null))
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
      record.journal = journalOf(entry, route.parameterized ? targetOf(entry.path, route) : entry.path)
    }
  })

  const unexplained = apiEntries.slice(index).filter(entry => !claim(entry)).length

  if (unexplained > 0) {
    problems.push(`The journal holds ${unexplained} API requests the SDK was not seen to send`)
  }

  let storageIndex = 0
  let lastStorageSeq = 0

  wire.exchanges.filter(record => !record.api).forEach(record => {
    const entry = otherEntries[storageIndex]
    const operation = STORAGE_OPERATIONS[String(record.method).toUpperCase()] ?? null

    if (record.status === null) {
      if (isObject(entry) && String(entry.method).toUpperCase() === String(record.method).toUpperCase() && entry.operation === operation) {
        storageIndex += 1
        lastStorageSeq = typeof entry.seq === 'number' ? entry.seq : lastStorageSeq
        problems.push(`Request ${record.seq} to storage got no answer, though the journal has it, answered ${JSON.stringify(entry.status)}`)
      } else {
        problems.push(`Request ${record.seq} to storage got no answer, and the journal does not have it`)
      }

      return
    }

    if (!isObject(entry)) {
      problems.push(`Request ${record.seq} to storage is not in the journal`)
      return
    }

    storageIndex += 1
    const differences = storageProblems(entry, record, lastStorageSeq)
    lastStorageSeq = typeof entry.seq === 'number' ? entry.seq : lastStorageSeq

    if (differences.length > 0) {
      problems.push(`Request ${record.seq} to storage and journal entry ${JSON.stringify(entry.seq)} differ: ${differences.join('; ')}`)
    } else {
      record.journal_seq = entry.seq
      record.journal = journalOf(entry, null)
    }
  })

  if (storageIndex < otherEntries.length) {
    problems.push(`The journal holds ${otherEntries.length - storageIndex} other requests the SDK was not seen to send`)
  }

  // Only now, with every request to storage joined, is it known whether each stopped grant's upload never used it.
  stopped.forEach(grant => {
    const reason = unusedGrantReason(grant)

    if (reason === null) {
      grant.record.disposition = STOPPED_UNUSED_GRANT
      grant.record.server_outcome = grant.entry === null ? null : { journal_seq: grant.entry.seq, status: grant.entry.status }
    } else {
      problems[grant.slot] = noAnswer(grant.record, grant.entry, reason)
    }
  })

  return problems.filter(problem => problem !== null)
}

// The uploads a step's requests made, by the upload the journal names for each: its begin_upload requests answered,
// the parts storage accepted, and its finalize requests.
const uploadsOf = records => {
  const uploads = new Map()
  const uploadOf = id => {
    if (!uploads.has(id)) {
      uploads.set(id, { begins: 0, finalized: [], parts: [] })
    }

    return uploads.get(id)
  }

  records.forEach(({ journal }) => {
    if (journal.operation === 'files.begin_upload' && journal.status === 200) {
      uploadOf(journal.upload).begins += 1
    } else if (journal.operation === 'transfers.upload_part' && journal.status === 200) {
      uploadOf(journal.upload).parts.push(journal)
    } else if (journal.operation === 'files.finalize_upload') {
      uploadOf(journal.upload).finalized.push(journal)
    }
  })

  return uploads
}

// What is wrong with an upload's evidence for data: it was begun; storage accepted its parts, distinct by number from 1
// with no gap, every acceptance of one number of the same bytes, each part the bytes at its place in data; and it was
// finalized once, publishing exactly data, or, cancelled, it has a part and no finalize. Gives the problems, and how
// many distinct parts storage accepted, which parts sent again never add to.
const uploadProblems = (id, upload, data, cancelled) => {
  const problems = []
  const byNumber = new Map()

  upload.parts.forEach(part => {
    const same = byNumber.get(part.part)

    if (same && (same.bytes !== part.bytes || same.sha256 !== part.sha256)) {
      problems.push(`part ${part.part} was accepted with other bytes again`)
    } else {
      byNumber.set(part.part, part)
    }
  })

  const numbers = [...byNumber.keys()].sort((first, second) => first - second)
  let offset = 0

  for (const [index, number] of numbers.entries()) {
    const part = byNumber.get(number)

    if (number !== index + 1) {
      problems.push(`its accepted parts skip part ${index + 1}`)
      break
    }

    if (sha256(data.subarray(offset, offset + part.bytes)) !== part.sha256) {
      problems.push(`part ${number}, ${part.bytes} bytes of SHA-256 ${part.sha256}, is not the bytes at ${offset} of the source`)
      break
    }

    offset += part.bytes
  }

  if (!isId(id) || upload.begins === 0) {
    problems.push(`upload ${JSON.stringify(id)} was never begun`)
  }

  if (numbers.length === 0) {
    problems.push(`storage accepted no part of upload ${JSON.stringify(id)}`)
  }

  if (cancelled) {
    if (upload.finalized.length > 0) {
      problems.push(`upload ${id} was finalized though it was cancelled`)
    }

    return { distinct: numbers.length, problems }
  }

  const [finalize, ...others] = upload.finalized

  if (offset !== data.length) {
    problems.push(`its accepted parts hold ${offset} bytes, not ${data.length}`)
  }

  if (!finalize || others.length > 0) {
    problems.push(`upload ${id} was finalized ${upload.finalized.length} times, not once`)
  } else if (!(finalize.status === 200 || finalize.status === 201) || !isId(finalize.version) ||
      finalize.bytes !== data.length || finalize.sha256 !== sha256(data)) {
    problems.push(`its finalize answered ${finalize.status}, publishing version ${JSON.stringify(finalize.version)} of ${JSON.stringify(finalize.bytes)} bytes of SHA-256 ${JSON.stringify(finalize.sha256)}, not ${data.length} bytes of ${sha256(data)}`)
  }

  return { distinct: numbers.length, problems }
}

// What is wrong with a step's downloads, against expected, the recipe of each file it downloads by path: each file
// described by the API with its download URL (files.download), 200, then answered by storage (transfers.download), 200,
// with a whole version of that file's recipe, its length and SHA-256, and every expected file so downloaded once, count
// files in all, of bytes in all. A storage entry is written as its response starts: it shows what storage sent, never
// what the client received, which each download's own output, compared byte for byte as the step ran, shows.
const downloadProblems = (records, expected, { bytes, count }) => {
  const problems = []
  const found = []
  let described = null

  records.forEach(({ journal }) => {
    if (journal.operation === 'files.download') {
      if (described !== null) {
        problems.push(`${described} was described for its download but never downloaded`)
      }

      described = journal.status === 200 ? journal.target : null

      if (described === null) {
        problems.push(`a description for a download answered ${journal.status}`)
      }
    } else if (journal.operation === 'transfers.download') {
      if (described === null) {
        problems.push(`storage sent version ${JSON.stringify(journal.version)} with no file described for it`)
      } else {
        found.push({ entry: journal, path: described })
      }

      described = null
    }
  })

  if (described !== null) {
    problems.push(`${described} was described for its download but never downloaded`)
  }

  found.forEach(({ entry, path: filePath }) => {
    const recipe = expected.get(filePath)

    if (entry.status !== 200) {
      problems.push(`storage answered the download of ${filePath} with ${entry.status}`)
    } else if (recipe === undefined) {
      problems.push(`${filePath} is not a file the step downloads`)
    } else if (entry.bytes !== RECIPES[recipe].length || entry.sha256 !== RECIPES[recipe].sha256) {
      problems.push(`storage sent ${filePath} as ${entry.bytes} bytes of SHA-256 ${entry.sha256}, not its recipe's ${RECIPES[recipe].length} of ${RECIPES[recipe].sha256}`)
    }
  })

  expected.forEach((recipe, filePath) => {
    const times = found.filter(({ path: foundPath }) => foundPath === filePath).length

    if (times !== 1) {
      problems.push(`${filePath} was downloaded ${times} times, not once`)
    }
  })

  const sent = found.reduce((total, { entry }) => total + (isCount(entry.bytes) ? entry.bytes : 0), 0)

  if (found.length !== count || sent !== bytes) {
    problems.push(`storage sent ${found.length} files of ${sent} bytes, not ${count} of ${bytes}`)
  }

  return problems
}

// What the Mock's journal shows of each intent's transfers, by intent, given its step, the requests it sent, each
// joined with its entry, and its position's record: the problems found.
const TRANSFER_EVIDENCE = {
  download: (step, records) => {
    const { recipe } = scenario.fixtures[step.fixture]
    return downloadProblems(records, new Map([[fixturePath(step.fixture), recipe]]), { bytes: RECIPES[recipe].length, count: 1 })
  },

  'download-directory': (step, records) => {
    const folder = fixturePath(step.fixture)
    const expected = new Map(step.details.bytesMatch.map(({ path: relative, recipe }) => [`${folder}/${relative}`, recipe]))
    return downloadProblems(records, expected, { bytes: step.details.bytes, count: step.details.files })
  },

  // One upload, of the fixture's recipe, published at the fixture's path, with at least the distinct parts the step
  // expects; or, cancelled, one whose part storage accepted, the part whose acceptance cancelled it, no finalize, and no
  // part sent once that acceptance arrived. Its requests numbered up to the boundary the step recorded then were started
  // before the cancellation was asked for, and those after it once it had been: a part among the latter fails it, even
  // one storage accepted before the journal was read. Both are kept with the position.
  upload: (step, records, position) => {
    const destination = fixturePath(step.fixture)
    const uploads = [...uploadsOf(records)]

    if (uploads.length !== 1) {
      return [`its requests made ${uploads.length} uploads, not one`]
    }

    const [[id, upload]] = uploads
    const cancelled = Boolean(step.details.cancel)
    const { distinct, problems } = uploadProblems(id, upload, recipeBytes(scenario.fixtures[step.fixture].recipe), cancelled)
    const finalize = upload.finalized[0]
    const boundary = cancelled ? position.intent.cancel?.started_through_seq : null
    const started = Number.isSafeInteger(boundary) ? {
      started_after_cancellation: records.filter(({ seq }) => seq > boundary).map(({ seq }) => seq),
      started_before_cancellation: records.filter(({ seq }) => seq <= boundary).map(({ seq }) => seq),
    } : {}
    // eslint-disable-next-line no-param-reassign
    position.intent = { ...position.intent, ...started, distinct_parts: distinct, upload: id }

    if (cancelled) {
      const accepted = records.find(({ seq }) => seq === position.intent.cancel?.accepted_seq)?.journal
      const laterParts = Number.isSafeInteger(boundary)
        ? records.filter(({ api, method, seq }) => !api && String(method).toUpperCase() === 'PUT' && seq > boundary)
        : []

      if (accepted?.operation !== 'transfers.upload_part' || accepted.status !== 200 || accepted.upload !== id) {
        problems.push('the answer whose acceptance cancelled it is not a part of it storage accepted')
      }

      if (!Number.isSafeInteger(boundary) || boundary < position.intent.cancel.accepted_seq) {
        problems.push('the requests it had started as the answer that cancelled it arrived were not recorded')
      } else if (laterParts.length > 0) {
        problems.push(`it sent ${laterParts.length} parts to storage once its cancellation had been asked for, the first request ${laterParts[0].seq}`)
      }
    } else if (finalize && finalize.target !== destination) {
      problems.push(`it published ${JSON.stringify(finalize.target)}, not ${JSON.stringify(destination)}`)
    }

    if (!cancelled && step.details.minParts !== null && distinct < step.details.minParts) {
      problems.push(`storage accepted ${distinct} distinct parts, fewer than ${step.details.minParts}`)
    }

    return problems
  },

  // Its folder and each folder of its tree created, as folders, and each file of its tree published, once, by an upload
  // whose evidence is its recipe's, the bytes the step expects in all.
  'upload-directory': (step, records) => {
    const folder = fixturePath(step.fixture)
    const problems = []
    const created = records.map(({ journal }) => journal).filter(({ operation }) => operation === 'folders.create')
    const expected = new Map(step.details.tree.files.map(file => [`${folder}/${file.path}`, scenario.fixtures[file.fixture].recipe]))
    const published = new Set()
    let bytes = 0

    if (created.length !== step.details.tree.directories.length + 1 || created.some(({ status, type }) => status !== 201 || type !== 'directory')) {
      problems.push(`its folders were created as ${JSON.stringify(created.map(({ status, target, type }) => [target, status, type]))}`)
    }

    uploadsOf(records).forEach((upload, id) => {
      const target = upload.finalized[0]?.target ?? null
      const recipe = target === null ? undefined : expected.get(target)

      if (recipe === undefined || published.has(target)) {
        problems.push(`upload ${JSON.stringify(id)} published ${JSON.stringify(target)}, not a file of the tree still to publish`)
        return
      }

      published.add(target)
      bytes += upload.finalized[0].bytes ?? 0
      problems.push(...uploadProblems(id, upload, recipeBytes(recipe), false).problems.map(problem => `${target}: ${problem}`))
    })

    if (published.size !== expected.size || bytes !== step.details.bytes) {
      problems.push(`it published ${published.size} of the tree's ${expected.size} files, ${bytes} bytes, not ${step.details.bytes}`)
    }

    return problems
  },
}

// What the Mock's journal shows of each passed intent step's transfers, once every request has been joined with its
// entry (see joinJournal()), against what the step carried out: [{ index, position, problem }].
const transferProblems = positions => {
  const problems = []

  scenario.steps.forEach((step, index) => {
    const check = step.kind === 'intent' ? TRANSFER_EVIDENCE[step.intent] : null

    if (!check || positions[index].outcome !== 'passed') {
      return
    }

    // A grant the SDK stopped unused has no entry joined, and shows nothing of the step's transfers.
    const records = wire.exchanges.filter(record => record.kind === 'case' && record.position === step.position &&
      record.disposition !== STOPPED_UNUSED_GRANT)
    check(step, records, positions[index]).forEach(problem => problems.push({ index, position: step.position, problem }))
  })

  return problems
}

// The Mock the launcher started for this run: on loopback only, with the instance the launcher chose and gave only to
// it, generated from this SDK's own Swagger document, and reporting the schema subset generated from it. The launcher
// ran this file only once the server reported that instance, simulation mode, contract version 3 and that schema.
const checkMock = mockDirectory => {
  const mock = {
    generation: null,
    host: env('FILES_MOCK_SERVER_HOST'),
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
  const scenarioId = process.argv[3]

  if (!Object.prototype.hasOwnProperty.call(SCENARIOS, scenarioId ?? '')) {
    throw new Error(`Give one of ${Object.keys(SCENARIOS).join(', ')} as the scenario to run, not ${JSON.stringify(scenarioId)}`)
  }

  scenario = SCENARIOS[scenarioId]
  const receiptFile = `javascript-${scenarioId}-case.json`
  const receipt = {
    backend: BACKEND,
    budgets: {
      case_deadline_seconds: CASE_DEADLINE_MS / 1000,
      launcher_seconds: LAUNCHER_SECONDS,
      reserve_deadline_seconds: RESERVE_DEADLINE_MS / 1000,
      reserve_seconds: RESERVE_MS / 1000,
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
    owned: owned,
    positions: scenario.steps.map(step => ({
      attempts: 0,
      backend: step.backend,
      intent: null,
      kind: step.kind,
      label: step.label,
      outcome: step.runs ? 'not_run' : 'omitted',
      pages: 0,
      position: step.position,
      records: 0,
      statuses: [],
    })),
    scenario: scenarioId,
    started_at: new Date().toISOString(),
    swagger_sha256: SWAGGER_SHA256,
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

    const operationSteps = scenario.steps.filter(step => step.runs && step.kind === 'operation')
    routes = routesOf(ready, operationSteps)
    catalogue = catalogueOf(ready)
    receipt.control.initial = { instance: ready.instance, journal_epoch: journal.epoch, ready_epoch: ready.epoch, routes }
    namespaceRoot = `js-scenario-${mock.run_id.replace(/[^A-Za-z0-9-]/g, '').slice(0, 64)}-${crypto.randomBytes(6).toString('hex')}`
    receipt.namespace = namespaceRoot
    scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'files-js-scenario-'))

    // The request that creates the owned folder: a POST to the Mock's route that creates a folder, the one the step
    // creating the owned folder calls, for exactly its path.
    const creating = operationSteps.find(step => step.expect.status === 201 && step.expect.entry && scenario.fixtures[step.expect.entry.fixture].path === '')

    if (!creating) {
      throw new Error('No step of the scenario creates its owned folder')
    }

    const createRoute = routes[creating.operationId]
    const createsOwned = (method, raw) => method === createRoute.method && targetOf(raw, createRoute) === namespaceRoot
    ownedCreator = creating.position

    // This run's own API key, read once: the client sends it, and its fetch checks that every request sends exactly it.
    const apiKey = env('FILES_MOCK_API_KEY')
    client = new FilesClient({
      apiKey,
      autoPaginate: false,
      baseUrl: mock.url,
      fetch: observingFetch(mock.url, apiKey, createsOwned),
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

  // The reserve: removing the owned folder after a failure, reading the Mock at the end, and the receipt; it ends
  // RESERVE_MS after it begins or RESERVE_DEADLINE_MS after STARTED, whichever is sooner.
  const reserveEndMs = Math.min(RESERVE_DEADLINE_MS, Math.floor(performance.now() - STARTED) + RESERVE_MS)
  const reserve = phase(reserveEndMs, 'The reserve for ending the run')

  if (receipt.failure !== null && routes !== null) {
    try {
      receipt.cleanup = await removeAfterFailure(reserve)
    } catch (error) {
      receipt.cleanup = { absent: false, failures: [ describe(error) ], removed: false, settled: false }
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
      const problems = joinJournal(journal, receipt.positions)
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

      // Only a journal every request joined is evidence of what each intent's transfers did: a position whose evidence
      // falls short fails, though its step passed as it ran.
      const evidence = transferProblems(receipt.positions)
      receipt.evidence = { problem_count: evidence.length, problems: evidence.slice(0, 100) }

      evidence.forEach(({ index, problem }) => {
        receipt.positions[index].outcome = 'failed'
        receipt.positions[index].evidence = [ ...(receipt.positions[index].evidence ?? []), problem ]
      })

      if (evidence.length > 0) {
        fail('evidence', new Error(`position ${evidence[0].position}: ${evidence[0].problem}`))
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

  const keyedStorage = wire.exchanges.filter(record => !record.api && record.api_key_sent)

  if (keyedStorage.length > 0) {
    fail('credentials', new Error(`${keyedStorage.length} requests to storage sent an API key, the first request ${keyedStorage[0].seq}`))
  }

  if (!owned.created && (owned.answered || owned.unanswered)) {
    fail('ownership', new Error('The owned folder was asked for, but the SDK never returned it created as a folder of exactly its path, so whether the case owns it is uncertain, and it was not removed'))
  }

  try {
    reserve.check()
  } catch (error) {
    fail('deadline', error)
  }

  // The run's last work, removing its scratch folder and serializing, writing and closing its receipt, is the reserve's
  // too: the run ended in time only if all of it was done before the reserve ended, which is known only once the
  // receipt has been closed, and so is checked then. A failure to remove the folder fails the run, after any earlier
  // failure, and is kept in the receipt apart from it, so that it shows either way.
  receipt.scratch = scratch === null ? null : { failure: null, removed: false }

  if (scratch !== null) {
    try {
      fs.rmSync(scratch, { force: true, recursive: true })
      receipt.scratch.removed = true
    } catch (error) {
      receipt.scratch.failure = describe(error)
      fail('scratch', error)
    }
  }

  // elapsed_seconds and ended_at are taken before the receipt is serialized, written and closed, so they cannot show
  // when that was done. completion gives the reserve's end and, only in a receipt written again, when its first write
  // and close were seen done, with the failure of either.
  receipt.outcome = receipt.failure === null ? 'passed' : 'failed'
  receipt.elapsed_seconds = (performance.now() - STARTED) / 1000
  receipt.ended_at = new Date().toISOString()
  receipt.completion = { deadline_seconds: reserveEndMs / 1000, first_closed_seconds: null, first_write_failure: null, rewritten: false }

  const receiptPath = path.join(out, receiptFile)

  // Writes content as the whole file open at descriptor, from its first byte, however few bytes each write takes, and
  // then closes the descriptor, whatever happened: the first failure of either, or null.
  const writeAndClose = (descriptor, content) => {
    let failure = null

    try {
      const bytes = Buffer.from(content)
      let written = 0
      fs.ftruncateSync(descriptor, 0)

      while (written < bytes.length) {
        written += fs.writeSync(descriptor, bytes, written, bytes.length - written, written)
      }
    } catch (error) {
      failure = { error }
    }

    try {
      fs.closeSync(descriptor)
    } catch (error) {
      failure = failure ?? { error }
    }

    return failure
  }

  // The receipt is created by this run alone, and the device and inode it was created as are kept: only that file is
  // ever written again, through its path opened without creating anything and found to be that file still. Its first
  // write and close count only once both are done, before the reserve ended.
  const text = `${JSON.stringify(receipt, null, 2)}\n`
  const created = fs.openSync(receiptPath, 'wx')
  let identity = null
  let firstFailure = null

  try {
    identity = fs.fstatSync(created, { bigint: true })
  } catch (error) {
    firstFailure = { error }
  }

  const written = writeAndClose(created, text)
  firstFailure = firstFailure ?? written
  const closedAt = performance.now()
  const firstClosedSeconds = (closedAt - STARTED) / 1000
  const late = closedAt >= STARTED + reserveEndMs

  if (firstFailure === null && !late) {
    reserve.end()
    return { receipt, receiptFile }
  }

  // The first write or close failed, or was done only once the reserve had ended: the run has failed, after any earlier
  // failure, and its receipt is written again, failed, to say so, if it is still the file this run created. Writing it
  // again and closing it are measured too, and however late that is, the run stays failed; should the receipt not be
  // written again, the run rejects, saying so, rather than leave its first receipt to stand.
  if (firstFailure !== null) {
    fail('receipt', firstFailure.error)
  }

  if (late) {
    fail('deadline', new Error(`The run's receipt was written and closed ${firstClosedSeconds} s after the run began, once its reserve had ended at ${reserveEndMs / 1000} s`))
  }

  receipt.outcome = 'failed'
  receipt.completion = {
    ...receipt.completion,
    first_closed_seconds: firstClosedSeconds,
    first_write_failure: firstFailure === null ? null : describe(firstFailure.error),
    rewritten: true,
  }
  reserve.end()

  let rewriteFailure = null

  try {
    if (identity === null) {
      throw new Error('The receipt this run created could not be identified, so it was not written again')
    }

    const reopened = fs.openSync(receiptPath, 'r+')
    let found = null

    try {
      found = fs.fstatSync(reopened, { bigint: true })
    } catch {
      found = null
    }

    if (found === null || found.dev !== identity.dev || found.ino !== identity.ino) {
      fs.closeSync(reopened)
      throw new Error(`${receiptPath} could not be found to be the receipt this run created, so it was not written again`)
    }

    rewriteFailure = writeAndClose(reopened, `${JSON.stringify(receipt, null, 2)}\n`)
  } catch (error) {
    rewriteFailure = { error }
  }

  const rewrittenSeconds = (performance.now() - STARTED) / 1000

  if (rewriteFailure !== null) {
    throw new Error(`${receipt.failure.where}: ${receipt.failure.message}; the run failed, and its receipt could not be written again to say so, ${rewrittenSeconds} s after the run began: ${describe(rewriteFailure.error)}`)
  }

  process.stderr.write(`The run's receipt was written again, failed, and closed ${rewrittenSeconds} s after the run began\n`)
  return { receipt, receiptFile }
}

// What test/FileScenarioRecorder.test.js runs of this recorder itself, never a copy of it: use() sets up what main()
// sets up from the Mock, the scenario, the client, the owned folder's path, the local scratch folder and the catalogue
// of operations, with nothing owned, no route of an operation step and no call under way, and clears the wire. Run as a
// program, this file runs main().
const use = settings => {
  scenario = SCENARIOS[settings.scenarioId]
  client = settings.client
  namespaceRoot = settings.namespace
  scratch = settings.scratch
  routes = {}
  catalogue = catalogueOf({ operations: settings.operations })
  activeCall = null
  pendingCalls.clear()
  Object.assign(owned, { answered: false, created: false, unanswered: false })
  ownedCreator = null
  wire.exchanges.length = 0
  wire.in_flight = 0
  wire.limit_reached = false
  wire.refused.length = 0
  wire.refused_count = 0
}

module.exports = { SCENARIOS, joinJournal, observingFetch, runUpload, settled, use, wire }

if (require.main === module) {
  main().then(({ receipt, receiptFile }) => {
    const ran = receipt.positions.filter(position => position.outcome !== 'omitted')
    const passed = ran.filter(position => position.outcome === 'passed').length
    const omitted = receipt.positions.length - ran.length
    process.stdout.write(`${receipt.scenario} ${receipt.outcome}: ${passed} of ${ran.length} positions passed and ${omitted} were omitted for the ${BACKEND} backend, with ${wire.exchanges.length} requests; its receipt is ${path.join(process.env.FILES_MOCK_OUT, receiptFile)}\n`)

    if (receipt.failure !== null) {
      process.stderr.write(`${receipt.failure.where}: ${receipt.failure.message}\n`)
    }

    process.exit(receipt.outcome === 'passed' ? 0 : 1)
  }, error => {
    process.stderr.write(`The file scenario could not record its receipt: ${describe(error)}\n`)
    process.exit(1)
  })
}
