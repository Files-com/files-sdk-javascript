import nock from 'nock'

import Api from '../lib/Api'
import { ConfigurationError } from '../lib/Errors'
import Files from '../lib/Files'
import Automation from '../lib/models/Automation'

const API_URL = 'http://example.test'

describe('API authentication', () => {
  beforeEach(() => {
    nock.disableNetConnect()
    Files.setBaseUrl(API_URL)
    Files.setApiKey('global-key')
    Files.setSessionId(null)
    Files.configureNetwork({ maxNetworkRetries: 0 })
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    Files.setApiKey(null)
    Files.setSessionId(null)
    Files.configureNetwork({ maxNetworkRetries: 3 })
  })

  it.each([null, 'global-key'])('honors session_id when the global key is %s', async globalKey => {
    Files.setApiKey(globalKey)

    const request = nock(API_URL, {
      badheaders: ['X-FilesAPI-Key'],
      reqheaders: { 'X-FilesAPI-Auth': 'request-session' },
    })
      .get('/api/rest/v1/users/123')
      .reply(200, { id: 123 })

    await Api.sendRequest('/users/123', 'GET', {}, { session_id: 'request-session' })

    expect(request.isDone()).toBe(true)
  })

  it.each(['session_id', 'sessionId'])('prefers a per-request %s to the global session', async optionName => {
    Files.setSessionId('global-session')

    const request = nock(API_URL, {
      badheaders: ['X-FilesAPI-Key'],
      reqheaders: { 'X-FilesAPI-Auth': 'request-session' },
    })
      .get('/api/rest/v1/users/123')
      .reply(200, { id: 123 })

    await Api.sendRequest('/users/123', 'GET', {}, { [optionName]: 'request-session' })

    expect(request.isDone()).toBe(true)
  })

  it.each([{}, { session_id: 'request-session' }, { sessionId: 'request-session' }])(
    'prefers an explicit API key to global and per-request sessions: %j',
    async sessionOptions => {
      Files.setSessionId('global-session')

      const request = nock(API_URL, {
        badheaders: ['X-FilesAPI-Auth'],
        reqheaders: { 'X-FilesAPI-Key': 'request-key' },
      })
        .get('/api/rest/v1/users/123')
        .reply(200, { id: 123 })

      await Api.sendRequest('/users/123', 'GET', {}, { ...sessionOptions, apiKey: 'request-key' })

      expect(request.isDone()).toBe(true)
    },
  )

  it.each([undefined, null])('keeps global session authentication when apiKey is %s', async apiKey => {
    Files.setSessionId('global-session')

    const request = nock(API_URL, {
      badheaders: ['X-FilesAPI-Key'],
      reqheaders: { 'X-FilesAPI-Auth': 'global-session' },
    })
      .get('/api/rest/v1/users/123')
      .reply(200, { id: 123 })

    await Api.sendRequest('/users/123', 'GET', {}, { apiKey })

    expect(request.isDone()).toBe(true)
  })

  it.each([
    [undefined, null],
    ['', 'global-session'],
  ])('falls back to the global key for apiKey %s and session %s', async (apiKey, sessionId) => {
    Files.setSessionId(sessionId)

    const request = nock(API_URL, {
      badheaders: ['X-FilesAPI-Auth'],
      reqheaders: { 'X-FilesAPI-Key': 'global-key' },
    })
      .get('/api/rest/v1/users/123')
      .reply(200, { id: 123 })

    await Api.sendRequest('/users/123', 'GET', {}, { apiKey })

    expect(request.isDone()).toBe(true)
  })

  it.each([
    [{ session_id: 'object-session' }, { 'X-FilesAPI-Auth': 'object-session' }, 'X-FilesAPI-Key'],
    [{ apiKey: 'object-key', session_id: 'object-session' }, { 'X-FilesAPI-Key': 'object-key' }, 'X-FilesAPI-Auth'],
  ])('honors per-object authentication: %j', async (options, headers, absentHeader) => {
    Files.setSessionId('global-session')

    const request = nock(API_URL, {
      badheaders: [absentHeader],
      reqheaders: headers,
    })
      .patch('/api/rest/v1/automations/123')
      .reply(200, { id: 123 })

    const automation = new Automation({ id: 123 }, options)
    await automation.update({})

    expect(request.isDone()).toBe(true)
  })

  it('rejects authenticated requests when no credentials are configured', async () => {
    Files.setApiKey(null)

    await expect(Api.sendRequest('/users/123', 'GET')).rejects.toBeInstanceOf(ConfigurationError)
  })

  it.each([{}, { apiKey: 'request-key', session_id: 'request-session' }])(
    'creates sessions without API-key authentication: %j',
    async options => {
      const request = nock(API_URL, {
        badheaders: ['X-FilesAPI-Key', 'X-FilesAPI-Auth'],
      })
        .post('/api/rest/v1/sessions')
        .reply(200, { id: 'new-session' })

      await Api.sendRequest('/sessions', 'POST', { password: 'test-password', username: 'test-user' }, options)

      expect(request.isDone()).toBe(true)
    },
  )

  it('does not add configured credentials to external requests', async () => {
    Files.setSessionId('global-session')

    const request = nock('http://storage.test', {
      badheaders: ['X-FilesAPI-Key', 'X-FilesAPI-Auth'],
    })
      .get('/download')
      .reply(200, {})

    await Api.sendRequest('http://storage.test/download', 'GET', {}, {
      apiKey: 'request-key',
      session_id: 'request-session',
    })

    expect(request.isDone()).toBe(true)
  })
})
