import http from 'http'
import nock from 'nock'

import Api from '../lib/Api'
import { ConfigurationError, FilesApiError } from '../lib/Errors'
import Files from '../lib/Files'
import FilesClient from '../lib/FilesClient'
import { LogLevel } from '../lib/Logger'
import Automation from '../lib/models/Automation'
import User from '../lib/models/User'

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

  it.each([
    ['Files.createClient()', config => Files.createClient(config)],
    ['new FilesClient()', config => new FilesClient(config)],
  ])('%s starts from the declared defaults, not the global settings, and checks its settings', async (_form, make) => {
    // Nothing in this file changes the global user agent, so it is still the declared default.
    const defaultUserAgent = Files.getUserAgent()
    Files.setUserAgent('global-agent')
    Files.setWorkspaceId(9)

    try {
      const client = make({ apiKey: 'own-key' })

      // The declared default site and user agent, and no workspace, whatever the global settings say.
      const request = nock('https://app.files.com', { badheaders: ['X-Files-Workspace-Id'] })
        .get('/api/rest/v1/users/5')
        .query({ id: 5 })
        .matchHeader('X-FilesAPI-Key', 'own-key')
        .matchHeader('User-Agent', defaultUserAgent)
        .reply(200, { id: 5 })

      expect(await client.users.find(5)).toBeInstanceOf(User)
      expect(request.isDone()).toBe(true)

      expect(() => make({ apikey: 'own-key' })).toThrow(new ConfigurationError('Unknown client setting: apikey'))
      expect(() => make('own-key')).toThrow(new ConfigurationError('Client settings must be an object'))
      expect(() => make({ logger: { info: () => {} } }))
        .toThrow(new ConfigurationError('Logger must provide error, warn, info, debug methods'))
    } finally {
      Files.setUserAgent(defaultUserAgent)
      Files.setWorkspaceId(null)
    }
  })

  it('keeps each client, made either way, on its own settings through overlapping calls and their models', async () => {
    // Application loggers that record each message's level and first value.
    const recordingLogger = () => {
      const entries = []
      const record = level => (...messages) => { entries.push(`${level} ${messages[0]}`) }

      return {
        debug: record('debug'),
        entries,
        error: record('error'),
        info: record('info'),
        warn: record('warn'),
      }
    }

    const [logA, logB, globalLog] = [recordingLogger(), recordingLogger(), recordingLogger()]
    const previous = { debugRequest: Files.shouldDebugRequest(), logger: Files.getLogger(), logLevel: Files.getLogLevel() }
    const configA = {
      apiKey: 'key-a',
      baseUrl: 'http://client-a.test',
      debugRequest: true,
      headers: { 'X-Origin': 'a' },
      logger: logA,
      logLevel: LogLevel.DEBUG,
      workspaceId: 0,
    }

    const configB = {
      apiKey: 'key-b',
      baseUrl: 'http://client-b.test',
      headers: { 'X-Origin': 'b' },
      logger: logB,
      logLevel: LogLevel.INFO,
      maxNetworkRetryDelay: 0,
      minNetworkRetryDelay: 0,
      workspaceId: 2,
    }

    const clientA = Files.createClient(configA)
    const clientB = new FilesClient(configB)

    let releaseA
    const heldA = new Promise(resolve => { releaseA = resolve })

    const requestsA = nock('http://client-a.test', {
      reqheaders: { 'X-Files-Workspace-Id': '0', 'X-FilesAPI-Key': 'key-a', 'X-Origin': 'a' },
    })
      .get('/api/rest/v1/users/1')
      .query({ id: 1 })
      .reply((uri, body, callback) => { heldA.then(() => callback(null, [200, { id: 1, name: 'A' }])) })
      .patch('/api/rest/v1/users/1', { id: 1, name: 'A2' })
      .reply(200, { id: 1, name: 'A2' })
      .patch('/api/rest/v1/users/1')
      .reply(200, { id: 1, name: 'A3' })
      .get('/api/rest/v1/users/1')
      .query({ id: 1 })
      .reply(200, { id: 1, name: 'A4' })
      .patch('/api/rest/v1/users/1', { id: 1, name: 'Rejected' })
      .reply(422, {
        error: 'Name is not allowed',
        'http-code': 422,
        title: 'Model Save Error',
        type: 'processing-failure/model-save-error',
      })

    // B's call with overrides of its own, and the follow-up of the model it returns.
    const overrideB = nock('http://client-b.test', { reqheaders: { 'X-Call': 'override', 'X-Origin': 'b' } })
      .get('/api/rest/v1/users/2')
      .query({ id: 2 })
      .matchHeader('X-FilesAPI-Key', 'override-key')
      .matchHeader('X-Files-Workspace-Id', '7')
      .reply(200, { id: 2, name: 'Override' })
      .patch('/api/rest/v1/users/2', { id: 2, name: 'Override2' })
      .matchHeader('X-FilesAPI-Key', 'override-key')
      .matchHeader('X-Files-Workspace-Id', '7')
      .reply(200, { id: 2, name: 'Override2' })

    // B's other calls, with B's own settings.
    const requestsB = nock('http://client-b.test', { badheaders: ['X-Call'], reqheaders: { 'X-Origin': 'b' } })
      .get('/api/rest/v1/users/2')
      .query({ id: 2 })
      .matchHeader('X-FilesAPI-Key', 'key-b')
      .reply(503, { 'http-code': 503, title: 'Service Unavailable', type: 'service-unavailable' })
      .get('/api/rest/v1/users/2')
      .query({ id: 2 })
      .matchHeader('X-FilesAPI-Key', 'key-b')
      .matchHeader('X-Files-Workspace-Id', '2')
      .reply(200, { id: 2, name: 'B' })
      .patch('/api/rest/v1/users/2', { id: 2, name: 'B2' })
      .matchHeader('X-FilesAPI-Key', 'key-b')
      .matchHeader('X-Files-Workspace-Id', '2')
      .reply(200, { id: 2, name: 'B2' })

    try {
      const pendingA = clientA.users.find(1)

      // While A waits, the global settings and the configs both clients were created from change.
      Files.setApiKey('global-key-changed')
      Files.setBaseUrl('http://global.test')
      Files.setWorkspaceId(9)
      Files.setLogger(globalLog)
      Files.setLogLevel(LogLevel.DEBUG)
      Files.configureDebugging({ debugRequest: true })
      configA.apiKey = 'changed-key'
      configA.headers['X-Origin'] = 'changed'
      configA.logger = globalLog
      configA.logLevel = LogLevel.NONE
      configB.apiKey = 'changed-key'
      configB.headers['X-Origin'] = 'changed'
      configB.logger = globalLog

      const producing = new AbortController()
      const overrideOptions = {
        apiKey: 'override-key',
        headers: { 'X-Call': 'override' },
        signal: producing.signal,
        workspaceId: 7,
      }

      const pendingOverride = clientB.users.find(2, {}, overrideOptions)

      // While B's override call waits, its caller changes the options object it passed.
      overrideOptions.apiKey = 'changed-key'
      overrideOptions.headers['X-Call'] = 'changed'
      overrideOptions.workspaceId = 8

      const userOverride = await pendingOverride
      producing.abort()

      const userB = await clientB.users.find(2)
      releaseA()
      const userA = await pendingA

      expect(userA).toBeInstanceOf(User)
      expect(await userA.update({ name: 'A2' })).toBe(userA)
      expect(await userA.save()).toBe(true)

      const userAgain = await clientA.users.find(1)
      const rejected = await userA.update({ name: 'Rejected' }).catch(caught => caught)

      // The generated class for processing-failure/model-save-error, which alone sets this name.
      expect(rejected).toBeInstanceOf(FilesApiError)
      expect([rejected.name, rejected.httpCode, rejected.title, rejected.message])
        .toEqual(['ProcessingFailure_ModelSaveErrorError', 422, 'Model Save Error', 'Name is not allowed'])

      expect([userA.getName(), userAgain.getName(), userB.getName()]).toEqual(['A3', 'A4', 'B'])

      // The model B's override call returned keeps that call's key, workspace and headers as they were when it began,
      // but not its signal, aborted since. B's later calls, and the model one returned, keep B's own settings.
      expect(await userOverride.update({ name: 'Override2' })).toBe(userOverride)
      expect(await userB.update({ name: 'B2' })).toBe(userB)
      expect([userOverride.getName(), userB.getName()]).toEqual(['Override2', 'B2'])
      expect([requestsA.isDone(), overrideB.isDone(), requestsB.isDone()]).toEqual([true, true, true])

      // Each client's messages went to its own logger, at its own level, and none to the global one.
      const userRequestsA = 'http://client-a.test/api/rest/v1/users/1'
      expect(logA.entries.filter(entry => entry.startsWith('debug Sending request #1:'))).toEqual([
        `debug Sending request #1: GET ${userRequestsA}?id=1`,
        `debug Sending request #1: PATCH ${userRequestsA}`,
        `debug Sending request #1: PATCH ${userRequestsA}`,
        `debug Sending request #1: GET ${userRequestsA}?id=1`,
        `debug Sending request #1: PATCH ${userRequestsA}`,
      ])

      expect(logA.entries.filter(entry => entry === 'debug Request Options:')).toHaveLength(5)
      expect(logA.entries).toContain('debug ProcessingFailure_ModelSaveErrorError Exception >')
      expect(logA.entries.some(entry => entry.includes('client-b.test'))).toBe(false)
      expect(logB.entries).toEqual([
        'info Request #1 failed with HTTP 503',
        'info Retrying request (retry 1 of 3) in 0 ms after HTTP 503',
      ])

      expect(globalLog.entries).toEqual([])
    } finally {
      Files.setWorkspaceId(null)
      Files.setLogger(previous.logger)
      Files.setLogLevel(previous.logLevel)
      Files.configureDebugging({ debugRequest: previous.debugRequest })
    }
  })

  it('chooses the call\'s agent first, then its client\'s, for every redirect and returned model', async () => {
    // Agents that record each connection they make, in order: the transport boundary, where an agent is used.
    const connections = []
    class RecordingAgent extends http.Agent {
      constructor(name) {
        super()
        this.name = name
      }

      createConnection(options, callback) {
        connections.push(this.name)
        return super.createConnection(options, callback)
      }
    }

    const agents = ['client', 'moved', 'call'].map(name => new RecordingAgent(name))
    const [clientAgent, movedAgent, callAgent] = agents
    const requests = []
    const server = http.createServer((request, response) => {
      requests.push(`${request.method} ${request.url}`)
      if (request.url === '/api/rest/v1/users/1?id=1') {
        response.writeHead(302, { Location: '/api/rest/v1/moved/users/1' })
        response.end()
        return
      }

      const id = Number(request.url.match(/users\/(\d+)/)[1])
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ id }))
    })

    await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })
    nock.enableNetConnect(/127\.0\.0\.1/)
    const baseUrl = `http://127.0.0.1:${server.address().port}`
    const choices = []
    const client = new FilesClient({
      agent: clientAgent,
      apiKey: 'agent-key',
      baseUrl,
      getAgentForUrl: url => {
        choices.push(url.replace(baseUrl, ''))
        return url.includes('/moved/') ? movedAgent : undefined
      },
      maxNetworkRetries: 0,
    })

    try {
      // The client's getAgentForUrl chooses for each URL, the redirect's included, and its agent when that gives none.
      const user = await client.users.find(1)
      await user.update({ name: 'Renamed' })

      // A call's own agent comes first, and a call's getAgentForUrl that gives none leaves the choice to the client.
      await client.users.find(2, {}, { agent: callAgent })
      await client.users.find(3, {}, { getAgentForUrl: () => undefined })

      // A call given the client directly chooses as its resources do.
      await User.find(4, {}, { client })

      expect(requests).toEqual([
        'GET /api/rest/v1/users/1?id=1',
        'GET /api/rest/v1/moved/users/1',
        'PATCH /api/rest/v1/users/1',
        'GET /api/rest/v1/users/2?id=2',
        'GET /api/rest/v1/users/3?id=3',
        'GET /api/rest/v1/users/4?id=4',
      ])

      expect(connections).toEqual(['client', 'moved', 'client', 'call', 'client', 'client'])
      expect(choices).toEqual([
        '/api/rest/v1/users/1?id=1',
        '/api/rest/v1/moved/users/1',
        '/api/rest/v1/users/1',
        '/api/rest/v1/users/3?id=3',
        '/api/rest/v1/users/4?id=4',
      ])
    } finally {
      agents.forEach(agent => agent.destroy())
      await new Promise(resolve => { server.close(resolve) })
    }
  })
})
