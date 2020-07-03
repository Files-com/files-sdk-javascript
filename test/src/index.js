import assert from 'assert'
import Files from 'files.com/lib/Files'
import Logger, { LogLevel } from 'files.com/lib/Logger'
import ApiKey from 'files.com/lib/models/ApiKey'
import File from 'files.com/lib/models/File'
import Session from 'files.com/lib/models/Session'
// import User from 'files.com/lib/models/User'

// name of an existing folder in your root to create/delete test files and folders
const SDK_TEST_ROOT_FOLDER = 'sdk-test'

const apiKey = process.env.FILES_API_KEY
const apiDomain = process.env.FILES_API_DOMAIN

if (!apiKey) {
  throw Error('ENV variable "FILES_API_KEY" was not found')
}

if (!apiDomain) {
  throw Error('ENV variable "FILES_API_DOMAIN" was not found')
}

Files.setApiKey(apiKey)
Files.setBaseUrl(`https://${apiDomain}`)

// temp for testing against staging
if (apiDomain.substr(-10) === 'staging.av') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
}

Files.setLogLevel(LogLevel.INFO)

Files.configureDebugging({
  debugRequest: false,
  debugResponseHeaders: false,
})

const testSuite = async () => {
  const nonce = new Date().getTime()

  // const testUser = async () => {
  //   const users = await User.list()
  //   User.find(123456)
  // }

  const testUpload = async () => {
    const displayName = `files.com-logo__${nonce}.png`
    const file = await File.uploadFile(`${SDK_TEST_ROOT_FOLDER}/${displayName}`, '../files.com-logo.png')

    assert(!!file.id)
    assert(file.display_name === displayName)

    await file.delete()

    Logger.info('***** testUpload() succeeded! *****')
  }

  const testSession = async () => {
    const username = process.env.FILES_SESSION_USERNAME
    const password = process.env.FILES_SESSION_PASSWORD

    if (!username || !password) {
      Logger.info('Bypassing testSession() - ENV variables "FILES_SESSION_USERNAME" and "FILES_SESSION_PASSWORD" are both required')
      return
    }

    const session = await Session.create({ username, password })

    assert(!!session.id)

    const manual = await ApiKey.list({ user_id: 0 }, { sessionId: session.id })

    Files.setSessionId(session.id)

    const auto = await ApiKey.list({ user_id: 0 })

    assert(JSON.stringify(manual.attributes) === JSON.stringify(auto.attributes))
    
    await Session.destroy()

    Files.setSessionId(null)

    Logger.info('***** testSession() succeeded! *****')
  }

  //
  // execute all tests
  //

  await testUpload()
  await testSession()
}

export default testSuite
