#!/usr/bin/env node
// The shared failure-case matrix (the Mock's scenarios/failure-cases.json) through this SDK's public calls, as built
// in lib/. test.sh runs it through the Mock's launcher, which resets the server to the scenario's users and adds its
// fault rules before this starts:
//
//   ruby with-scenario.rb --scenario failure-cases --out DIR -- node test/failure-cases.cjs
//
// Each case makes its calls as User.find and User#update, with the global network settings' maxNetworkRetries set
// to the definition's max_network_retries, and compares what each call
// returned or threw with the case's expectation: an API error's status, type and message (FilesApiError: the
// validation errors and the seeded random HTTP 422 faults), a dropped connection that got no answer once the retries
// are spent (a FilesError with no response status), or the user found. FILES_MOCK_OUT/failure-cases.json records each
// case's outcome; the launcher's failure
// cases check then requires every case to have passed and compares the journal and the fault rules' decisions with each
// case's expected wire outcome. Exit status: 0 when every case passed, 1 otherwise, 2 when an input is missing.
const fs = require('node:fs')
const path = require('node:path')
const { isDeepStrictEqual } = require('node:util')

const lib = path.join(__dirname, '..', 'lib')
const Files = require(path.join(lib, 'Files')).default
const User = require(path.join(lib, 'models', 'User')).default
const { FilesApiError, FilesError } = require(path.join(lib, 'Errors'))

const inputs = Object.fromEntries(['FILES_MOCK_SERVER_URL', 'FILES_MOCK_API_KEY', 'FILES_MOCK_SCENARIO_FILE', 'FILES_MOCK_OUT']
  .map(name => [name, process.env[name] || '']))
const missing = Object.keys(inputs).filter(name => !inputs[name])
if (missing.length > 0) {
  console.error(`failure cases: ${missing.join(', ')} not set; run this through the Mock's launcher`)
  process.exit(2)
}
const definition = JSON.parse(fs.readFileSync(inputs.FILES_MOCK_SCENARIO_FILE, 'utf8')).failure_cases
if (!definition || !Array.isArray(definition.cases) || !Number.isInteger(definition.max_network_retries)) {
  console.error('failure cases: FILES_MOCK_SCENARIO_FILE defines no failure_cases with max_network_retries')
  process.exit(2)
}

Files.setBaseUrl(inputs.FILES_MOCK_SERVER_URL)
Files.setApiKey(inputs.FILES_MOCK_API_KEY)
Files.configureNetwork({ maxNetworkRetries: definition.max_network_retries })

// What one call did, in the expectation's terms.
const call = async testCase => {
  try {
    if (testCase.call === 'users.update') {
      await new User({ id: testCase.user_id }).update(testCase.params)
      return { updated: true }
    }
    if (testCase.call === 'users.find') {
      const user = await User.find(testCase.user_id)
      return { user: { id: user.id, username: user.username } }
    }
    return { 'unknown call': testCase.call }
  } catch (error) {
    if (error instanceof FilesApiError) {
      return { error: { status: error.httpCode, type: error.type, message: error.error } }
    }
    if (error instanceof FilesError && !error.code) {
      return { error: { network: true } }
    }
    return { unexpected: `${error?.name}: ${error?.message}` }
  }
}

const main = async () => {
  const results = []
  for (const testCase of definition.cases) {
    const problems = []
    for (const [index, expected] of testCase.expect.entries()) {
      // Each call follows the one before it, so the server sees the case's attempts in order.
      // eslint-disable-next-line no-await-in-loop
      const actual = await call(testCase)
      if (!isDeepStrictEqual(actual, expected)) {
        problems.push(`call ${index + 1} gave ${JSON.stringify(actual)}, not ${JSON.stringify(expected)}`)
      }
    }
    results.push({ id: testCase.id, outcome: problems.length ? 'failed' : 'passed', failure: problems.length ? problems.join('; ') : null })
    console.log(`failure cases: ${testCase.id} ${problems.length ? `failed: ${problems.join('; ')}` : 'passed'}`)
  }
  const report = { format: 'files-failure-cases/1', sdk: 'javascript', runtime: process.version, cases: results }
  fs.writeFileSync(path.join(inputs.FILES_MOCK_OUT, 'failure-cases.json'), `${JSON.stringify(report, null, 2)}\n`)
  return results.every(result => result.outcome === 'passed') ? 0 : 1
}

main().then(status => process.exit(status), error => {
  console.error(error)
  process.exit(1)
})
