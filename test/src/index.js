import assert from 'assert'
import Files from 'files.com/lib/Files'
import Logger, { LogLevel } from 'files.com/lib/Logger'
import ApiKey from 'files.com/lib/models/ApiKey'
import File from 'files.com/lib/models/File'
import Folder from 'files.com/lib/models/Folder'
import Session from 'files.com/lib/models/Session'
import { isBrowser } from 'files.com/lib/utils'

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

  const testFolderListAutoPagination = async () => {
    Files.configureNetwork({
      autoPaginate: false,
    })
    const firstPageItems = await Folder.listFor('/', { per_page: 1 })

    assert(firstPageItems.length === 1)

    Files.configureNetwork({
      autoPaginate: true,
    })
    // note: this test will fail if the root folder has <= 1 file or folder
    const allPageItems = await Folder.listFor('/', { per_page: 1 })

    // if auto-pagination executed, we'll have found more than just the 1 we requested
    assert(allPageItems.length > 1)

    Logger.info('***** testFolderListAutoPagination() succeeded! *****')
  }

  const testUploadAndDownload = async () => {
    const sourceFilePath = '../files.com-logo.png'

    const displayName = `files.com-logo__${nonce}.png`
    const destinationPath = `${SDK_TEST_ROOT_FOLDER}/${displayName}`

    const file = await File.uploadFile(destinationPath, sourceFilePath)

    assert(!!file.path)
    assert(file.display_name === displayName)

    const foundFile = await File.find(destinationPath)
    
    assert(foundFile.path === destinationPath)
    assert(foundFile.display_name === displayName)
    assert(typeof foundFile.getDownloadUri() === 'undefined')

    if (!isBrowser()) {
      const downloadableFile = await foundFile.download()
      assert(typeof downloadableFile.getDownloadUri() !== 'undefined')

      const downloadPath = `./${displayName}`
      await downloadableFile.downloadToFile(downloadPath)

      const fs = require('fs')
      const originalBuffer = fs.readFileSync(sourceFilePath)
      const downloadedBuffer = fs.readFileSync(downloadPath)

      assert(originalBuffer.equals(downloadedBuffer))

      fs.unlinkSync(downloadPath)
    }

    await file.delete()

    Logger.info('***** testUploadAndDownload() succeeded! *****')
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

  await testFolderListAutoPagination()
  await testUploadAndDownload()
  await testSession()
}

export default testSuite
