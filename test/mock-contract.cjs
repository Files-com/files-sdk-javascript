'use strict'

// The SDK's contract test against the Files.com Mock API Server in simulation mode, generated from the same public
// Swagger document as this SDK. test.sh runs it, never against any other server:
//
//   node test/mock-contract.cjs --check MOCK_DIRECTORY
//     checks that the generated Mock in MOCK_DIRECTORY was generated from the same Swagger document as this SDK, by
//     the document's SHA-256 its lib/simulation/generation.json records, and that the schema subset it validates
//     against, lib/simulation/schema.json, has the SHA-256 recorded there too, which this hashes itself. It prints
//     that subset's SHA-256, which the Mock's with-scenario.rb then requires its server to report.
//
//   ruby MOCK_DIRECTORY/with-scenario.rb --scenario folder-list ... -- node test/mock-contract.cjs
//     runs the test itself against the server with-scenario.rb started, with the variables it sets (see the Mock's
//     README, "Shared scenarios"): this SDK lists the scenario's folder through its Folder iterator, two items a page,
//     and must get its five child folders, in order, once each; then sends GET /users with a per_page that is not an
//     integer through Api.sendRequest(), which only the server can refuse, and must fail with its 422; then the
//     server's journal must hold exactly those four requests, complete.
//
// Generated from a schema that lacks any of what it calls, as a partial one may, it refuses to run in either mode
// (CONTRACT_PROBLEMS). Any failure exits nonzero. The evidence, consumer-result.json, goes to with-scenario.rb's output
// directory.

const assert = require('node:assert/strict')
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

// The SHA-256 of the whole Swagger document this SDK was generated from.
const SWAGGER_SHA256 = 'f50ffc75afaff16a5af583ff65062fd49ee739cab0d8c6387aa34eaa61b1587e'

// What the generator found that schema lacks of this test's contract, or has changed: none for a schema with all of
// it. With any, the test refuses to run (refuseIncompleteContract), and the values below it could not find are null.
const CONTRACT_PROBLEMS = []

// The two operations, as the schema defines them and this SDK names them: Folder's cursor-paginated listing, with the
// client resource and iterator the SDK offers it through, and the user list. The Mock journals them as folders.list
// and users.list.
const FOLDER_LIST = {
  iterator: 'listForIterator',
  method: 'GET',
  operation: 'folders.list',
  path: '/folders/{path}',
  resource: 'folders',
}

const USERS_LIST = {
  method: 'GET',
  operation: 'users.list',
  path: '/users',
}

// What the folder-list scenario holds: one folder, five child folders, listed two a page.
const CHILD_FOLDERS = 5
const PER_PAGE = 2

// The per_page the user list is sent with, which is not an integer.
const MALFORMED_PER_PAGE = 'not-an-integer'

// Each request's budget, with no retry: these requests are made once, to a server on this machine.
const ATTEMPT_TIMEOUT_SECS = 5

// The time and size a control response, such as the journal, may take.
const CONTROL_TIMEOUT_MS = 5000
const CONTROL_LIMIT_BYTES = 1048576

const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex')

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'))

// Fails, before anything is checked or sent, when the schema this SDK was generated from lacks any of this test's
// contract (CONTRACT_PROBLEMS), so that neither mode runs, or passes, against less than it was written for.
const refuseIncompleteContract = () => {
  assert.deepEqual(CONTRACT_PROBLEMS, [], `this SDK's schema lacks what the contract test needs: ${CONTRACT_PROBLEMS.join('; ')}`)
}

// Writes the test's evidence, consumer-result.json, into with-scenario.rb's output directory, out.
const keepEvidence = (out, result) => {
  assert.ok(out, 'FILES_MOCK_OUT is not set, so the evidence has nowhere to go')
  fs.writeFileSync(path.join(out, 'consumer-result.json'), `${JSON.stringify(result, null, 2)}\n`)
}

// Prints the SHA-256 of the schema subset of the generated Mock in mockDirectory, once it has checked that it was
// generated from the same Swagger document as this SDK.
const check = mockDirectory => {
  refuseIncompleteContract()
  assert.ok(mockDirectory, '--check needs the directory of the generated Mock (FILES_CONTRACT_MOCK_SERVER)')

  const directory = path.resolve(mockDirectory)
  const simulation = path.join(directory, 'lib', 'simulation')
  const generation = readJson(path.join(simulation, 'generation.json'))

  assert.equal(generation?.swagger?.sha256, SWAGGER_SHA256, `the Mock in ${directory} was not generated from this SDK's Swagger document`)

  const subset = sha256(fs.readFileSync(path.join(simulation, 'schema.json')))
  assert.equal(generation.schema_sha256, subset, `the schema subset of the Mock in ${directory} is not the one its generation.json records`)

  for (const file of ['with-scenario.rb', path.join('scenarios', 'folder-list.json')]) {
    assert.ok(fs.statSync(path.join(directory, file)).isFile(), `the Mock in ${directory} has no ${file}`)
  }

  process.stdout.write(`${subset}\n`)
}

// A variable with-scenario.rb sets for its command.
const required = name => {
  const value = process.env[name]
  assert.ok(value, `${name} is not set: run this test through the Mock's with-scenario.rb, as test.sh does`)
  return value
}

// A control endpoint's JSON, from the run's own server, within CONTROL_TIMEOUT_MS and CONTROL_LIMIT_BYTES.
const control = async (origin, name) => {
  const response = await fetch(new URL(`/__files_mock/v1/${name}`, origin), { signal: AbortSignal.timeout(CONTROL_TIMEOUT_MS) })
  const reader = response.body.getReader()
  const chunks = []
  let length = 0

  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    length += value.byteLength

    if (length > CONTROL_LIMIT_BYTES) {
      // eslint-disable-next-line no-await-in-loop
      await reader.cancel()
      throw new Error(`the ${name} control response is longer than ${CONTROL_LIMIT_BYTES} bytes`)
    }

    chunks.push(Buffer.from(value))
  }

  assert.equal(response.status, 200, `the ${name} control request answered ${response.status}`)
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

// The test itself, run by with-scenario.rb; result collects its evidence as it goes.
const consume = async result => {
  refuseIncompleteContract()

  const origin = new URL(required('FILES_MOCK_SERVER_URL'))
  assert.equal(origin.protocol, 'http:', 'FILES_MOCK_SERVER_URL is not http')
  assert.equal(origin.hostname, '127.0.0.1', 'FILES_MOCK_SERVER_URL is not on loopback')
  assert.equal(origin.href, `${origin.origin}/`, 'FILES_MOCK_SERVER_URL is not an origin alone')

  const apiKey = required('FILES_MOCK_API_KEY')
  assert.match(apiKey, /^filesmock[A-Za-z0-9]+$/, 'FILES_MOCK_API_KEY is not a synthetic key')
  assert.equal(required('FILES_MOCK_SCENARIO'), 'folder-list', 'this test needs the folder-list scenario')

  const out = required('FILES_MOCK_OUT')
  const scenario = readJson(required('FILES_MOCK_SCENARIO_FILE'))
  const { children, parent } = scenario
  assert.equal(typeof parent, 'string', 'the scenario names no parent folder')
  assert.equal(scenario.per_page, PER_PAGE, `the scenario does not list ${PER_PAGE} items a page`)
  assert.ok(Array.isArray(children) && children.length === CHILD_FOLDERS, `the scenario does not hold ${CHILD_FOLDERS} child folders`)
  assert.equal(new Set(children).size, CHILD_FOLDERS, 'the scenario lists a child folder twice')

  // The reset with-scenario.rb made before running this test, which the journal must follow.
  const { epoch } = readJson(path.join(out, 'reset.json'))
  assert.ok(Number.isInteger(epoch), 'reset.json gives no epoch')

  // The generated SDK, beside this test.
  const lib = path.join(__dirname, '..', 'lib')
  const Api = require(path.join(lib, 'Api')).default
  const Files = require(path.join(lib, 'Files')).default
  const FilesClient = require(path.join(lib, 'FilesClient')).default

  const client = new FilesClient({
    apiKey,
    baseUrl: origin.origin,
    maxNetworkRetries: 0,
    networkTimeout: ATTEMPT_TIMEOUT_SECS,
  })

  // Every child folder, in order, once each, through the SDK's own iterator, a page at a time.
  result.received = []

  for await (const item of client[FOLDER_LIST.resource][FOLDER_LIST.iterator](parent, { per_page: PER_PAGE })) {
    result.received.push({ path: item.path, type: item.type })
  }

  assert.deepEqual(result.received, children.map(child => ({ path: child, type: 'directory' })), 'the listing did not give each child folder once, in order')

  // A per_page that is not an integer, which only the server refuses: the SDK sends Api.sendRequest()'s params as
  // they are.
  let rejection = null

  try {
    await Api.sendRequest(USERS_LIST.path, USERS_LIST.method, { per_page: MALFORMED_PER_PAGE }, { client })
  } catch (error) {
    rejection = error
  }

  result.rejection = rejection && { code: rejection.code, message: rejection.message, name: rejection.name }
  assert.ok(rejection, 'the user list was answered although its per_page is not an integer')
  assert.equal(rejection.code, 422, `the user list failed with ${rejection.code}, not 422`)

  // The server's own record of those requests: exactly the three pages of the listing, each with the cursor the page
  // before it returned, and the refused user list, all with the run's key alone, complete and since this run's reset.
  const journal = await control(origin, 'journal')
  result.journal = journal
  assert.equal(journal.complete, true, 'the journal is incomplete')
  assert.equal(journal.dropped, 0, 'the journal dropped entries')
  assert.equal(journal.epoch, epoch, 'the journal is not of this run\'s reset')

  const prefix = Files.getEndpointPrefix()
  const listed = `${prefix}${FOLDER_LIST.path.replace('{path}', parent)}`
  const pageSizes = Array.from({ length: Math.ceil(CHILD_FOLDERS / PER_PAGE) }, (_, page) => Math.min(PER_PAGE, CHILD_FOLDERS - page * PER_PAGE))
  const { entries } = journal

  assert.deepEqual(
    entries.map(entry => [entry.operation, entry.method, entry.path, entry.status]),
    [
      ...pageSizes.map(() => [FOLDER_LIST.operation, FOLDER_LIST.method, listed, 200]),
      [USERS_LIST.operation, USERS_LIST.method, `${prefix}${USERS_LIST.path}`, 422],
    ],
    'the journal does not hold exactly the listing\'s pages and the refused user list',
  )

  assert.ok(entries.every(entry => entry.epoch === epoch && entry.credentials?.api_key === 1), 'a request was not made with the run\'s key after its reset')

  const pages = entries.slice(0, pageSizes.length)
  assert.deepEqual(pages.map(page => page.items), pageSizes, 'the listing\'s pages did not hold the expected numbers of items')
  assert.ok(pages.every(page => page.wire?.per_page === 'string'), 'a page was requested without per_page')

  pages.forEach((page, index) => {
    const sent = index === 0 ? undefined : pages[index - 1].next_cursor_sha256
    assert.ok(index === 0 || (typeof sent === 'string' && sent !== ''), `page ${index + 1} followed a page that returned no cursor`)
    assert.equal(page.cursor_sha256 ?? undefined, sent, `page ${index + 1} was not requested with the cursor the page before it returned`)
  })

  assert.equal(pages[pages.length - 1].next_cursor_sha256 ?? null, null, 'the listing\'s last page returned a cursor')

  const users = entries[pageSizes.length]
  assert.deepEqual(users.paging?.request?.per_page, {
    integer: null,
    present: true,
    sha256: sha256(MALFORMED_PER_PAGE),
    wire_type: 'string',
  }, 'the user list did not reach the server with the per_page it was sent')
}

const main = async () => {
  const [mode, argument, ...rest] = process.argv.slice(2)

  if (mode === '--check' && rest.length === 0) {
    check(argument)
    return
  }

  assert.equal(mode, undefined, 'usage: node mock-contract.cjs [--check MOCK_DIRECTORY]')

  const result = { outcome: 'failed' }
  const out = process.env.FILES_MOCK_OUT

  try {
    await consume(result)
    result.outcome = 'passed'
  } catch (error) {
    result.failure = { code: error?.code, message: error?.message ?? String(error), name: error?.name }

    // A failed test keeps its evidence when it can, and its own failure either way.
    try {
      keepEvidence(out, result)
    } catch (keepError) {
      console.error(`mock-contract: the evidence was not kept: ${keepError.message}`)
    }

    throw error
  }

  // A passed test keeps its evidence, or fails.
  keepEvidence(out, result)
  console.log(JSON.stringify({
    folders: result.received.length,
    journal: result.journal.entries.length,
    outcome: result.outcome,
    rejected: result.rejection.code,
  }))
}

main().catch(error => {
  console.error(`mock-contract: ${JSON.stringify({ code: error?.code, message: error?.message ?? String(error), name: error?.name })}`)
  process.exitCode = 1
})
