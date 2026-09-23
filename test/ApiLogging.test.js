import nock from 'nock'

import Api from '../lib/Api'
import { FilesError } from '../lib/Errors'
import Files from '../lib/Files'
import { LogLevel } from '../lib/Logger'

const UPLOAD_URL = 'https://upload.example.test'
const UPLOAD_PATH = '/private-upload-part'
const UPLOAD_QUERY = {
  'X-Amz-Credential': 'test-upload-credential',
  'X-Amz-Signature': 'test-upload-signature',
}

const SIGNED_UPLOAD_URL = `${UPLOAD_URL}${UPLOAD_PATH}?${new URLSearchParams(UPLOAD_QUERY)}`

describe('API retry logging', () => {
  let originalNetworkConfig
  let originalLogLevel
  let consoleSpies

  beforeEach(() => {
    nock.disableNetConnect()
    originalNetworkConfig = {
      maxNetworkRetries: Files.getMaxNetworkRetries(),
      maxNetworkRetryDelay: Files.getMaxNetworkRetryDelay(),
      minNetworkRetryDelay: Files.getMinNetworkRetryDelay(),
    }

    originalLogLevel = Files.getLogLevel()
    Files.configureNetwork({ maxNetworkRetries: 1, maxNetworkRetryDelay: 0, minNetworkRetryDelay: 0 })
    consoleSpies = Object.fromEntries(
      ['error', 'warn', 'info', 'log'].map(method => [method, jest.spyOn(console, method).mockImplementation(() => {})]),
    )
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    Files.configureNetwork(originalNetworkConfig)
    Files.setLogLevel(originalLogLevel)
    jest.restoreAllMocks()
  })

  it('keeps signed upload URLs out of default logs through retry exhaustion', async () => {
    const request = nock(UPLOAD_URL)
      .put(UPLOAD_PATH, 'part contents')
      .query(UPLOAD_QUERY)
      .times(2)
      .replyWithError({ code: 'ECONNRESET', message: 'socket hang up' })

    expect(Files.getLogLevel()).toBe(LogLevel.INFO)

    const error = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', 'part contents').catch(caughtError => caughtError)

    expect(request.isDone()).toBe(true)
    expect(error).toBeInstanceOf(FilesError)
    expect(error.message).toContain(SIGNED_UPLOAD_URL)
    expect(error.message).toContain('socket hang up')

    const output = JSON.stringify(Object.values(consoleSpies).flatMap(spy => spy.mock.calls))
    expect(output).toContain('Request #1 failed')
    expect(output).toContain('Request #2 failed')
    expect(output).toContain('Retrying request (retry 1 of 1)')
    expect(output).not.toContain(UPLOAD_URL)
    expect(output).not.toContain(UPLOAD_PATH)
    expect(output).not.toContain(UPLOAD_QUERY['X-Amz-Credential'])
    expect(output).not.toContain(UPLOAD_QUERY['X-Amz-Signature'])
  })

  it('keeps transport failure details at DEBUG when a signed upload retry succeeds', async () => {
    Files.setLogLevel(LogLevel.DEBUG)

    const request = nock(UPLOAD_URL)
      .put(UPLOAD_PATH, 'part contents')
      .query(UPLOAD_QUERY)
      .replyWithError({ code: 'ECONNRESET', message: 'socket hang up' })
      .put(UPLOAD_PATH, 'part contents')
      .query(UPLOAD_QUERY)
      .reply(200, 'uploaded', { 'Content-Type': 'text/plain' })

    const response = await Api.sendFilePart(SIGNED_UPLOAD_URL, 'PUT', 'part contents')

    expect(request.isDone()).toBe(true)
    expect(response.status).toBe(200)
    expect(response.data).toBe('uploaded')

    const debugOutput = JSON.stringify(consoleSpies.log.mock.calls)
    expect(debugOutput).toContain('Request #1 failed')
    expect(debugOutput).toContain(SIGNED_UPLOAD_URL)
    expect(debugOutput).toContain('socket hang up')

    const infoOutput = JSON.stringify(consoleSpies.info.mock.calls)
    expect(infoOutput).toContain('Request #1 failed')
    expect(infoOutput).toContain('Retrying request (retry 1 of 1)')
    expect(infoOutput).not.toContain(SIGNED_UPLOAD_URL)
    expect(infoOutput).not.toContain('socket hang up')
  })
})
