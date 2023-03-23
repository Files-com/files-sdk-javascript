import assert from 'assert'
// import * as errors from 'files.com/lib/Errors'
const errors = require('files.com/lib/Errors')
import Files from 'files.com/lib/Files'
import Logger, { LogLevel } from 'files.com/lib/Logger'
import ApiKey from 'files.com/lib/models/ApiKey'
import File from 'files.com/lib/models/File'
import Folder from 'files.com/lib/models/Folder'
import Session from 'files.com/lib/models/Session'
import User from 'files.com/lib/models/User'
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

  const testUploadAndDownloadToFile = async () => {
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

    Logger.info('***** testUploadAndDownloadToFile() succeeded! *****')
  }

  const testUploadAndDownloadToString = async () => {
    const displayName = `test-text__${nonce}.txt`
    const destinationPath = `${SDK_TEST_ROOT_FOLDER}/${displayName}`

    const sourceFileContents = 'The quick brown fox jumped over the lazy dogs.'
    const file = await File.uploadData(destinationPath, sourceFileContents)

    assert(!!file.path)
    assert(file.display_name === displayName)

    const foundFile = await File.find(destinationPath)

    assert(foundFile.path === destinationPath)
    assert(foundFile.display_name === displayName)
    assert(typeof foundFile.getDownloadUri() === 'undefined')

    if (!isBrowser()) {
      const downloadableFile = await foundFile.download()
      assert(typeof downloadableFile.getDownloadUri() !== 'undefined')

      const downloadedFileContents = await downloadableFile.downloadToString()

      assert(sourceFileContents === downloadedFileContents)
    }

    await file.delete()

    Logger.info('***** testUploadAndDownloadToString() succeeded! *****')
  }

  /* to run this test, put a file (or symlink) at huge-file.ext * /
  const testUploadHugeFile = async () => {
    const sourceFilePath = '../huge-file.ext'

    const displayName = `huge-file__${nonce}.ext`
    const destinationPath = `${SDK_TEST_ROOT_FOLDER}/${displayName}`

    const file = await File.uploadFile(destinationPath, sourceFilePath)

    assert(!!file.path)
    assert(file.display_name === displayName)

    const foundFile = await File.find(destinationPath)

    assert(foundFile.path === destinationPath)
    assert(foundFile.display_name === displayName)
    assert(typeof foundFile.getDownloadUri() === 'undefined')

    await file.delete()

    Logger.info('***** testUploadHugeFile() succeeded! *****')
  }
  /**/

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

  const testFailure = async () => {
    // test invalid api key
    Files.setApiKey('this_is_not_a_valid_api_key')
    Logger.pause()

    let caughtInvalidCredentialsError = false

    try {
      await User.list()
    } catch (error) {
      caughtInvalidCredentialsError = error instanceof errors.NotAuthenticated_InvalidCredentialsError
    }

    assert(caughtInvalidCredentialsError === true)

    // restore valid api key
    Files.setApiKey(apiKey)
    Logger.unpause()

    Logger.info('***** testFailure() succeeded! *****')
  }

  const testUserListAndUpdate = async () => {
    const allUsers = await User.all()
    const firstUser = allUsers[0]
  
    const oldName = firstUser.name
    const newName = `edited name - ${Math.random()}`
  
    firstUser.setName(newName)
    await firstUser.save()
  
    const updatedUser = await User.find(firstUser.id)
  
    assert(updatedUser.isLoaded())
    assert(oldName !== newName)
    assert(updatedUser.name === newName)
  
    Logger.info('***** testUserListAndUpdate() succeeded! *****');
  }

  //
  // execute all tests
  //

  await testFolderListAutoPagination()
  await testUploadAndDownloadToFile()
  await testUploadAndDownloadToString()
  // await testUploadHugeFile() // to run this test, put a file (or symlink) at huge-file.ext
  await testSession()
  await testFailure()
  await testUserListAndUpdate()
}

export default testSuite
