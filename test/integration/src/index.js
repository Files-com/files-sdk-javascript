///////////////////////////////////////////////////////////////////////////////
// To run this test suite, first set environment variables:
//
// required:
//   FILES_API_KEY - set to your API key
//   FILES_API_DOMAIN - set to your Files.com subdomain (e.g. mysite.files.com)
//
// required only if testSession() is run, otherwise can be omitted:
//   FILES_SESSION_USERNAME - username to login with
//   FILES_SESSION_PASSWORD - password to login with
//
// optional:
//   USER_COUNT_TO_TRIGGER_PAGINATION - defaults to 1, set to a number that will
//     require multiple page requests to fetch all users, but don't set it too low;
//     if you have many users, then "1" will trigger a fetch for every single user
//
///////////////////////////////////////////////////////////////////////////////
//
// Next, in the ../../../ directory, build the SDK:
//
// npm install
// npm run build
//
// Then, in the ../ directory, build the test suite:
//
// npm install
// npm run build
//
// Finally, execute the current file:
//
// npm run test
//
///////////////////////////////////////////////////////////////////////////////
// Note: you can comment out at the bottom of this file any tests you don't want to run.
///////////////////////////////////////////////////////////////////////////////

import Files from 'files.com/lib/Files'
import Logger, { LogLevel } from 'files.com/lib/Logger'
import ApiKey from 'files.com/lib/models/ApiKey'
import File from 'files.com/lib/models/File'
import Folder from 'files.com/lib/models/Folder'
import Session from 'files.com/lib/models/Session'
import User from 'files.com/lib/models/User'
import { isBrowser } from 'files.com/lib/utils'
import invariant from 'tiny-invariant'

const errors = require('files.com/lib/Errors')

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

if (apiDomain.substr(-10) === 'staging.av') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
}

const DEBUG_MODE = false

// any user count that will require multiple page requests to fetch all users
const USER_COUNT_TO_TRIGGER_PAGINATION = process.env.USER_COUNT_TO_TRIGGER_PAGINATION || 1

Files.setLogLevel(DEBUG_MODE ? LogLevel.DEBUG : LogLevel.INFO)

Files.configureDebugging({
  debugRequest: DEBUG_MODE,
  debugResponseHeaders: DEBUG_MODE,
})

Files.configureNetwork({
  networkTimeout: DEBUG_MODE ? 10 : 30,
})

const testSuite = async () => {
  const nonce = new Date().getTime()

  const testFolderListAutoPagination = async () => {
    Files.configureNetwork({
      autoPaginate: false,
    })

    const firstPageItems = await Folder.listFor('/', { per_page: USER_COUNT_TO_TRIGGER_PAGINATION })

    invariant(firstPageItems.length === 1, 'First page should have 1 item')

    Files.configureNetwork({
      autoPaginate: true,
    })

    // note: this test will fail if the root folder has <= 1 file or folder
    const allPageItems = await Folder.listFor('/', { per_page: 1 })

    // if auto-pagination executed, we'll have found more than just the 1 we requested
    invariant(allPageItems.length > 1, 'Auto-pagination should have found more than 1 item across all pages')

    Logger.info('***** testFolderListAutoPagination() succeeded! *****')
  }

  const testUploadAndDownloadToFile = async () => {
    const sourceFilePath = '../../files.com-logo.png'

    const displayName = `files.com-logo__${nonce}.png`
    const destinationPath = `${SDK_TEST_ROOT_FOLDER}/${displayName}`

    const file = await File.uploadFile(destinationPath, sourceFilePath)

    invariant(!!file.path, 'Uploaded file response object should have a path')
    invariant(file.display_name === displayName, 'Uploaded file response object should have the same display_name as the file we uploaded')

    const foundFile = await File.find(destinationPath)

    invariant(foundFile.path === destinationPath, 'Found file should have the same path as the file we uploaded')
    invariant(foundFile.display_name === displayName, 'Found file should have the same display_name as the file we uploaded')
    invariant(typeof foundFile.getDownloadUri() === 'undefined', 'Found file should not have a download uri yet')

    if (!isBrowser()) {
      const downloadableFile = await foundFile.download()

      invariant(downloadableFile.size > 0, 'Uploaded file should not be empty')
      invariant(typeof downloadableFile.getDownloadUri() !== 'undefined', 'Downloadable file should have a download uri')

      const downloadPath = `./${displayName}`
      await downloadableFile.downloadToFile(downloadPath)

      const fs = require('fs')
      const originalBuffer = fs.readFileSync(sourceFilePath)
      const downloadedBuffer = fs.readFileSync(downloadPath)

      invariant(originalBuffer.length === downloadedBuffer.length, 'Source file length should match downloaded file length')
      invariant(originalBuffer.equals(downloadedBuffer), 'Source file contents should match downloaded file contents')

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

    invariant(!!file.path, 'Uploaded file response object should have a path')
    invariant(file.display_name === displayName, 'Uploaded file response object should have the same display_name as the file we uploaded')

    const foundFile = await File.find(destinationPath)

    invariant(foundFile.path === destinationPath, 'Found file should have the same path as the file we uploaded')
    invariant(foundFile.display_name === displayName, 'Found file should have the same display_name as the file we uploaded')
    invariant(typeof foundFile.getDownloadUri() === 'undefined', 'Found file should not have a download uri yet')

    if (!isBrowser()) {
      const downloadableFile = await foundFile.download()
      invariant(typeof downloadableFile.getDownloadUri() !== 'undefined', 'Downloadable file should have a download uri')

      const downloadedFileContents = await downloadableFile.downloadToString()

      invariant(sourceFileContents === downloadedFileContents, 'Source file contents should match downloaded file contents')
    }

    await file.delete()

    Logger.info('***** testUploadAndDownloadToString() succeeded! *****')
  }

  /* to run this test, put a file (or symlink) at huge-file.ext * /
  const testUploadFileForHugeFile = async () => {
    const sourceFilePath = '../huge-file.ext'

    const displayName = `huge-file__${nonce}.ext`
    const destinationPath = `${SDK_TEST_ROOT_FOLDER}/${displayName}`

    const file = await File.uploadFile(destinationPath, sourceFilePath)

    invariant(!!file.path, 'Uploaded file response object should have a path')
    invariant(file.display_name === displayName, 'Uploaded file response object should have the same display_name as the file we uploaded')

    const foundFile = await File.find(destinationPath)

    invariant(foundFile.path === destinationPath, 'Found file should have the same path as the file we uploaded')
    invariant(foundFile.display_name === displayName, 'Found file should have the same display_name as the file we uploaded')
    invariant(typeof foundFile.getDownloadUri() === 'undefined', 'Found file should not have a download uri yet')

    await file.delete()

    Logger.info('***** testUploadFileForHugeFile() succeeded! *****')
  }

  /* to run this test, put a file (or symlink) at huge-file.ext * /
  const testUploadDataForHugeFile = async () => {
    const sourceFilePath = '../huge-file.ext'

    const displayName = `huge-file__${nonce}.ext`
    const destinationPath = `${SDK_TEST_ROOT_FOLDER}/${displayName}`

    const fs = require('fs/promises')
    const data = await fs.readFile(sourceFilePath, { encoding: "utf8" })

    const file = await File.uploadData(destinationPath, data)

    invariant(!!file.path, 'Uploaded file response object should have a path')
    invariant(file.display_name === displayName, 'Uploaded file response object should have the same display_name as the file we uploaded')

    const foundFile = await File.find(destinationPath)

    invariant(foundFile.path === destinationPath, 'Found file should have the same path as the file we uploaded')
    invariant(foundFile.display_name === displayName, 'Found file should have the same display_name as the file we uploaded')
    invariant(typeof foundFile.getDownloadUri() === 'undefined', 'Found file should not have a download uri yet')

    await file.delete()

    Logger.info('***** testUploadDataForHugeFile() succeeded! *****')
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

    invariant(!!session.id, 'Session should have an id')

    const manual = await ApiKey.list({ user_id: 0 }, { sessionId: session.id })

    Files.setSessionId(session.id)

    const auto = await ApiKey.list({ user_id: 0 })

    invariant(JSON.stringify(manual.attributes) === JSON.stringify(auto.attributes), 'Manual and auto session API key lists should match')

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

    invariant(caughtInvalidCredentialsError === true, 'should have caught an invalid credentials error')

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

    invariant(updatedUser.isLoaded(), 'updated user should be loaded')
    invariant(oldName !== newName, 'old name should not equal new name')
    invariant(updatedUser.name === newName, 'updated user name should match new name')

    Logger.info('***** testUserListAndUpdate() succeeded! *****');
  }

  const testLanguage = async () => {
    Files.setLanguage('es');
    invariant(Files.getLanguage() === 'es');

    const savedLogLevel = Files.getLogLevel()
    const savedDebugRequest = Files.shouldDebugRequest()
    const savedDebugResponseHeaders = Files.shouldDebugResponseHeaders()
    Files.setLogLevel(LogLevel.DEBUG)
    Files.configureDebugging({
      debugRequest: true,
      debugResponseHeaders: true,
    })

    const logs = []
    const savedConsoleLog = console.log
    console.log = (...args) => {
      logs.push(args.map(JSON.stringify).join(' '))
    }

    await ApiKey.list({ user_id: 0 })

    console.log = savedConsoleLog

    Files.setLogLevel(savedLogLevel)
    Files.configureDebugging({
      debugRequest: savedDebugRequest,
      debugResponseHeaders: savedDebugResponseHeaders,
    })

    const allLogs = logs.join('\n')
    invariant(allLogs.includes('"Accept-Language":"es"'), '"Accept-Language: es" header not found in debug output');

    Logger.info('***** testLanguage() succeeded! *****');
  }

  //
  // execute all tests
  //

  try {
    await testFolderListAutoPagination()
    await testUploadAndDownloadToFile()
    await testUploadAndDownloadToString()
    // await testUploadDataForHugeFile() // to run this test, put a file (or symlink) at huge-file.ext
    // await testUploadFileForHugeFile() // to run this test, put a file (or symlink) at huge-file.ext
    await testSession()
    await testFailure()
    await testUserListAndUpdate()
    await testLanguage()
  } catch (error) {
    console.log('*** TEST SUITE FAILED ***')
    console.error(error)
  }
}

export default testSuite
