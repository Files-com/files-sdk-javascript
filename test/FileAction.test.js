import { FilesError, InvalidParameterError } from '../lib/Errors'
import Files from '../lib/Files'
import FilesClient from '../lib/FilesClient'
import { LogLevel } from '../lib/Logger'
import File from '../lib/models/File'
import FileAction from '../lib/models/FileAction'

const API_PREFIX = '/api/rest/v1'

const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  headers: { 'Content-Type': 'application/json', ...headers },
  status,
})

// A response that never comes: the request waits until its signal aborts it, as a fetch must allow.
const heldUntilAborted = signal => new Promise((resolve, reject) => {
  const abort = () => reject(Object.assign(new Error('The operation was aborted'), { name: 'AbortError' }))

  if (signal.aborted) {
    abort()
  } else {
    signal.addEventListener('abort', abort, { once: true })
  }
})

const outcomeOf = promise => promise.then(value => ({ value }), error => ({ error }))

// Resolves once service has had count requests, or rejects once ms have passed without them, so that a boundary that
// never comes fails the test rather than leaving it waiting.
const requestsReached = async (service, count, ms = 2000) => {
  const deadline = Date.now() + ms

  while (service.requests.length < count) {
    if (Date.now() >= deadline) {
      throw new Error(`Timed out waiting for request ${count}`)
    }

    // eslint-disable-next-line no-await-in-loop
    await new Promise(resolve => { setTimeout(resolve, 1) })
  }
}

// Stands in for the Files.com API, at any origin, as the HTTP client of a client or of the global settings. A copy, a
// move or a beginDelete (POST /file_actions/{copy,move,delete}/{path}) is answered with action, as the API accepted
// it; an ordinary delete (DELETE /files/{path}) with 204. Each poll of a File Migration (GET /file_migrations/{id}) is
// answered with the next of migrations[id]: a status, a whole File Migration, or 'hold', which never answers but waits
// for the request's signal; the last is repeated once they run out. answer(request), when given, may answer any
// request first. Records every request, with the credential, workspace and headers it was sent with.
const actionService = ({ action = { file_migration_id: 7, status: 'pending' }, answer = () => null, migrations = {} } = {}) => {
  const requests = []
  const polls = {}

  const fetch = async (url, init) => {
    const { origin, pathname } = new URL(url)
    const headers = new Headers(init.headers)
    const request = {
      call: headers.get('x-call'),
      key: headers.get('x-filesapi-key'),
      method: init.method,
      origin,
      path: decodeURIComponent(pathname.slice(API_PREFIX.length)),
      workspace: headers.get('x-files-workspace-id'),
    }

    requests.push(request)

    const answered = answer(request)

    if (answered) {
      return answered
    }

    if (request.method === 'POST' && request.path.startsWith('/file_actions/')) {
      return json(action, 201)
    }

    if (request.method === 'DELETE' && request.path.startsWith('/files/')) {
      return new Response(null, { status: 204 })
    }

    const migration = /^\/file_migrations\/(\d+)$/.exec(request.path)

    if (request.method === 'GET' && migration) {
      const id = Number(migration[1])
      const plan = migrations[id] ?? ['completed']
      const next = plan[Math.min(polls[id] ?? 0, plan.length - 1)]
      polls[id] = (polls[id] ?? 0) + 1

      if (next === 'hold') {
        return heldUntilAborted(init.signal)
      }

      return json(typeof next === 'string' ? { id, status: next } : next)
    }

    return json({ error: 'Not Found', 'http-code': 404, type: 'not-found' }, 404)
  }

  const described = () => requests.map(({ method, path }) => `${method} ${path}`)
  return { described, fetch, requests }
}

const clientOf = (service, config = {}) => new FilesClient({
  apiKey: 'client-key',
  baseUrl: 'https://app.files.com',
  fetch: service.fetch,
  headers: { 'X-Call': 'client' },
  maxNetworkRetries: 0,
  workspaceId: 3,
  ...config,
})

// The File of path, bound to client, with options, the request options of its calls, as an application makes one: its
// copy(), move(), beginDelete() and delete() are its own, made with the client and those options.
const fileOf = (client, path, options = {}) => new File({ path }, { client, ...options })

// An application logger for a client at DEBUG, which the SDK gives each response's data as it logs it, before the call
// that requested it resolves: onMigration(data) is called with the data of each File Migration the API answers with.
const migrationLoggerOf = onMigration => ({
  debug: (...messages) => messages
    .filter(message => message !== null && typeof message === 'object' && typeof message.id === 'number' && 'status' in message)
    .forEach(onMigration),
  error: () => {},
  info: () => {},
  warn: () => {},
})

describe('FileAction.waitForCompletion()', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.useRealTimers()
    Files.setApiKey(null)
    Files.setBaseUrl('https://app.files.com')
    Files.setWorkspaceId(null)
    Files.configureNetwork({ fetch: null, maxNetworkRetries: 3 })
  })

  it('resolves a copy only once its File Migration has gone from pending and processing to completed', async () => {
    const service = actionService({ migrations: { 7: ['pending', 'processing', 'completed'] } })
    const client = clientOf(service)

    const action = await fileOf(client, 'reports/a.csv').copy({ destination: 'reports/b.csv' })

    // The copy resolves as the API accepts it, as it always has: nothing is polled unless the caller waits.
    expect(action).toBeInstanceOf(FileAction)
    expect(action.attributes).toEqual({ file_migration_id: 7, status: 'pending' })
    expect(service.described()).toEqual(['POST /file_actions/copy/reports/a.csv'])

    await action.waitForCompletion({ pollIntervalMs: 1 })

    // The copy is sent once; its migration is polled until completed, each request with the client's credential,
    // workspace, headers and site.
    expect(service.described()).toEqual([
      'POST /file_actions/copy/reports/a.csv',
      'GET /file_migrations/7',
      'GET /file_migrations/7',
      'GET /file_migrations/7',
    ])

    service.requests.forEach(request => {
      expect(request).toMatchObject({ call: 'client', key: 'client-key', origin: 'https://app.files.com', workspace: '3' })
    })
  })

  it('waits for a move and for a beginDelete, while an ordinary delete still resolves on its 204', async () => {
    const service = actionService({ action: { file_migration_id: 9, status: 'processing' }, migrations: { 9: ['processing', 'completed'] } })
    const client = clientOf(service)

    const moved = await fileOf(client, 'reports/a.csv').move({ destination: 'archive/a.csv' })
    await moved.waitForCompletion({ pollIntervalMs: 1 })

    const deleting = await fileOf(client, 'archive').beginDelete({ recursive: true })
    await deleting.waitForCompletion({ pollIntervalMs: 1 })

    expect(await fileOf(client, 'reports/b.csv').delete()).toBeUndefined()

    expect(service.described()).toEqual([
      'POST /file_actions/move/reports/a.csv',
      'GET /file_migrations/9',
      'GET /file_migrations/9',
      'POST /file_actions/delete/archive',
      'GET /file_migrations/9',
      'DELETE /files/reports/b.csv',
    ])
  })

  it('waits through a File it was called on, and through the raw responses of the copy and move helpers', async () => {
    const service = actionService({ migrations: { 7: ['processing', 'completed'] } })
    const client = clientOf(service)
    const file = new File({ path: 'reports/a.csv' }, { client })

    const copied = await file.copy({ destination: 'reports/c.csv' })
    await copied.waitForCompletion({ pollIntervalMs: 1 })

    // A helper resolves with the API's response, as it always has: its own fields, and nothing else enumerable.
    const response = await file.copyTo('reports/d.csv')
    const serialized = JSON.parse(JSON.stringify(response))

    expect(response).not.toBeInstanceOf(FileAction)
    expect(Object.keys(response).sort()).toEqual(['data', 'headers', 'reason', 'status'])
    expect(Object.keys(serialized).sort()).toEqual(['data', 'headers', 'reason', 'status'])
    expect(serialized.data).toEqual({ file_migration_id: 7, status: 'pending' })
    expect(serialized.status).toBe(201)

    await response.waitForCompletion({ pollIntervalMs: 1 })

    const destination = await File.moveToRemoteServer('reports/a.csv', 4, 'backup/a.csv', {}, { client })
    await destination.waitForCompletion({ pollIntervalMs: 1 })

    expect(service.described()).toEqual([
      'POST /file_actions/copy/reports/a.csv',
      'GET /file_migrations/7',
      'GET /file_migrations/7',
      'POST /file_actions/copy/reports/a.csv',
      'GET /file_migrations/7',
      'POST /file_actions/move/reports/a.csv',
      'GET /file_migrations/7',
    ])
  })

  it.each([
    ['failed', { status: 'failed', failure_message: 'The destination is locked' }, 'File Migration 7 failed: The destination is locked'],
    ['cancelled', { status: 'cancelled' }, 'File Migration 7 cancelled'],
    ['the schema example complete', { status: 'complete' }, 'File Migration 7 has status \'complete\', which does not show whether it completed'],
    ['an unknown status', { status: 'skipped' }, 'File Migration 7 has status \'skipped\', which does not show whether it completed'],
    ['no status', {}, 'File Migration 7 has status undefined, which does not show whether it completed'],
  ])('rejects a migration that %s with what it observed, and sends nothing more', async (_, observed, message) => {
    const service = actionService({ migrations: { 7: ['processing', { id: 7, ...observed }] } })
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })

    const { error } = await outcomeOf(action.waitForCompletion({ pollIntervalMs: 1 }))

    expect(error).toBeInstanceOf(FilesError)
    expect(error.message).toBe(message)
    expect(error.fileAction).toEqual({ file_migration_id: 7, status: 'pending' })
    expect(error.fileMigration).toEqual({ id: 7, ...observed })
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7', 'GET /file_migrations/7'])
  })

  it('resolves an action the API reports completed with no File Migration at once, sending nothing', async () => {
    const service = actionService({ action: { status: 'completed' } })
    const action = await fileOf(clientOf(service), 'folder').move({ destination: 'moved' })

    await expect(action.waitForCompletion()).resolves.toBeUndefined()
    expect(service.described()).toEqual(['POST /file_actions/move/folder'])
  })

  it.each([
    ['pending with no File Migration', { status: 'pending' }, 'The action\'s status is \'pending\', and it reports no file_migration_id whose status could confirm its completion'],
    ['skipped with no File Migration', { status: 'skipped' }, 'The action\'s status is \'skipped\', and it reports no file_migration_id whose status could confirm its completion'],
    ['nothing', {}, 'The action\'s status is undefined, and it reports no file_migration_id whose status could confirm its completion'],
    ['a File Migration ID as a string', { file_migration_id: '7', status: 'pending' }, 'The action reports file_migration_id \'7\', which is not a File Migration ID, so its completion cannot be confirmed'],
    ['a File Migration ID of 0', { file_migration_id: 0, status: 'completed' }, 'The action reports file_migration_id 0, which is not a File Migration ID, so its completion cannot be confirmed'],
    ['a fractional File Migration ID', { file_migration_id: 1.5, status: 'pending' }, 'The action reports file_migration_id 1.5, which is not a File Migration ID, so its completion cannot be confirmed'],
    ['a File Migration ID beyond 32 bits', { file_migration_id: 2147483648, status: 'pending' }, 'The action reports file_migration_id 2147483648, which is not a File Migration ID, so its completion cannot be confirmed'],
  ])('rejects an action that reports %s at once, never taking it for completion', async (_, reported, message) => {
    const service = actionService({ action: reported })
    const action = await fileOf(clientOf(service), 'folder').beginDelete()

    const { error } = await outcomeOf(action.waitForCompletion())

    expect(error).toBeInstanceOf(FilesError)
    expect(error.message).toBe(message)
    expect(error.fileAction).toEqual(reported)
    expect(error.fileMigration).toBeUndefined()
    expect(service.described()).toEqual(['POST /file_actions/delete/folder'])
  })

  it('polls a valid File Migration even when the action itself says completed', async () => {
    const service = actionService({ action: { file_migration_id: 7, status: 'completed' }, migrations: { 7: ['processing', 'completed'] } })
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })

    await action.waitForCompletion({ pollIntervalMs: 1 })
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7', 'GET /file_migrations/7'])
  })

  it('rejects with the failure of a poll itself, unchanged, and never sends the action again', async () => {
    const service = actionService({
      answer: request => (request.path === '/file_migrations/7'
        ? json({ error: 'Invalid API key', 'http-code': 401, title: 'Invalid Credentials', type: 'not-authenticated/invalid-credentials' }, 401)
        : null),
    })

    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })
    const { error } = await outcomeOf(action.waitForCompletion({ pollIntervalMs: 1 }))

    expect(error).toBeInstanceOf(FilesError)
    expect(error.type).toBe('not-authenticated/invalid-credentials')
    expect(error.code).toBe(401)
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7'])
  })

  it('polls with the global context the action was sent with, whatever the global settings become before the wait', async () => {
    const service = actionService({ migrations: { 7: ['processing', 'completed'] } })
    const other = actionService()

    Files.setApiKey('global-key')
    Files.setBaseUrl('https://app.files.com')
    Files.setWorkspaceId(5)
    Files.configureNetwork({ fetch: service.fetch, maxNetworkRetries: 0 })

    const action = await new File({ path: 'a.csv' }, { headers: { 'X-Call': 'copy' } }).copy({ destination: 'b.csv' })
    const response = await new File({ path: 'a.csv' }).moveTo('c.csv')

    Files.setApiKey('changed-key')
    Files.setBaseUrl('https://elsewhere.files.com')
    Files.setWorkspaceId(9)
    Files.configureNetwork({ fetch: other.fetch })

    await action.waitForCompletion({ pollIntervalMs: 1 })
    await response.waitForCompletion({ pollIntervalMs: 1 })

    expect(other.requests).toEqual([])
    expect(service.requests).toEqual([
      { call: 'copy', key: 'global-key', method: 'POST', origin: 'https://app.files.com', path: '/file_actions/copy/a.csv', workspace: '5' },
      { call: null, key: 'global-key', method: 'POST', origin: 'https://app.files.com', path: '/file_actions/move/a.csv', workspace: '5' },
      { call: 'copy', key: 'global-key', method: 'GET', origin: 'https://app.files.com', path: '/file_migrations/7', workspace: '5' },
      { call: 'copy', key: 'global-key', method: 'GET', origin: 'https://app.files.com', path: '/file_migrations/7', workspace: '5' },
      { call: null, key: 'global-key', method: 'GET', origin: 'https://app.files.com', path: '/file_migrations/7', workspace: '5' },
    ])

    // That context is the SDK's own: neither the action's attributes nor its options hold it, nor its serialization.
    expect(action.attributes).toEqual({ file_migration_id: 7, status: 'pending' })
    expect(action.options).toEqual({ headers: { 'X-Call': 'copy' } })
    expect(JSON.stringify(action)).not.toContain('global-key')
  })

  it('polls at the host a lockout region mismatch rerouted the action to, with the call\'s own credential', async () => {
    const service = actionService({
      answer: request => (request.origin === 'https://app.files.com'
        ? json({
          data: { host: 'region-b.files.com' },
          error: 'You have connected to a URL that has different security settings than those required for your site.',
          'http-code': 403,
          title: 'Lockout Region Mismatch',
          type: 'not-authenticated/lockout-region-mismatch',
        }, 403, { 'X-Files-Host': 'region-b.files.com' })
        : null),
      migrations: { 7: ['processing', 'completed'] },
    })

    const client = clientOf(service, { maxNetworkRetries: 1 })
    const action = await fileOf(client, 'a.csv', { apiKey: 'call-key', workspaceId: 8 }).copy({ destination: 'b.csv' })
    await action.waitForCompletion({ pollIntervalMs: 1 })

    expect(service.requests.map(({ key, method, origin, path, workspace }) => `${method} ${origin}${path} ${key} ${workspace}`)).toEqual([
      'POST https://app.files.com/file_actions/copy/a.csv call-key 8',
      'POST https://region-b.files.com/file_actions/copy/a.csv call-key 8',
      'GET https://region-b.files.com/file_migrations/7 call-key 8',
      'GET https://region-b.files.com/file_migrations/7 call-key 8',
    ])

    // The call's own credential moved only the action, not the client's site.
    expect(client.getBaseUrl()).toBe('https://app.files.com')
  })

  it('polls with no signal of the call that started the action: the wait has its own', async () => {
    const service = actionService({ migrations: { 7: ['processing', 'completed'] } })
    const starting = new AbortController()
    const action = await fileOf(clientOf(service), 'a.csv', { signal: starting.signal }).copy({ destination: 'b.csv' })

    starting.abort(new Error('the call that started the copy is over'))

    // The action keeps its File's options, as every model a File's call returns does, that signal among them; the wait
    // polls without it, so it is not stopped by it, and every poll is sent.
    expect(action.options.signal).toBe(starting.signal)
    await expect(action.waitForCompletion({ pollIntervalMs: 1 })).resolves.toBeUndefined()
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7', 'GET /file_migrations/7'])
  })

  it.each([
    ['an object', { sentinel: true }],
    ['null', null],
    ['0', 0],
    ['false', false],
    ['an empty string', ''],
  ])('stops at once with the exact reason, %s, when the signal aborts while a poll is under way', async (_, reason) => {
    const service = actionService({ migrations: { 7: ['processing', 'hold'] } })
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })
    const controller = new AbortController()

    const waiting = outcomeOf(action.waitForCompletion({ pollIntervalMs: 1, signal: controller.signal }))

    // However the assertions go, the wait is stopped and joined before the test ends.
    try {
      await requestsReached(service, 3)

      controller.abort(reason)
      const { error } = await waiting

      expect(Object.is(error, reason)).toBe(true)
      expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7', 'GET /file_migrations/7'])
    } finally {
      if (!controller.signal.aborted) {
        controller.abort(new Error('the test ended'))
      }

      await waiting
    }
  })

  it('stops at once with the exact reason when the signal aborts while it waits between polls', async () => {
    const service = actionService({ migrations: { 7: ['pending'] } })
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })
    const controller = new AbortController()
    const started = Date.now()

    const waiting = outcomeOf(action.waitForCompletion({ pollIntervalMs: 60000, signal: controller.signal }))

    try {
      await requestsReached(service, 2)

      controller.abort(0)
      const { error } = await waiting

      expect(error).toBe(0)
      expect(Date.now() - started).toBeLessThan(5000)
      expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7'])
    } finally {
      if (!controller.signal.aborted) {
        controller.abort(new Error('the test ended'))
      }

      await waiting
    }
  })

  it('resolves on a completed migration that a DEBUG logger only observes as it is logged', async () => {
    const service = actionService({ migrations: { 7: ['processing', 'completed'] } })
    const logged = []
    const client = clientOf(service, { logLevel: LogLevel.DEBUG, logger: migrationLoggerOf(migration => logged.push(migration)) })
    const action = await fileOf(client, 'a.csv').copy({ destination: 'b.csv' })
    const controller = new AbortController()

    await expect(action.waitForCompletion({ pollIntervalMs: 1, signal: controller.signal, timeoutMs: 60000 })).resolves.toBeUndefined()

    expect(logged).toEqual([{ id: 7, status: 'processing' }, { id: 7, status: 'completed' }])
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7', 'GET /file_migrations/7'])
  })

  it.each([
    ['an object', { sentinel: true }],
    ['0', 0],
    ['null', null],
    ['an empty string', ''],
  ])('rejects with the exact reason, %s, of a signal a DEBUG logger aborts as the completed migration is logged', async (_, reason) => {
    const service = actionService({ migrations: { 7: ['completed'] } })
    const controller = new AbortController()
    const logged = []
    const client = clientOf(service, {
      logLevel: LogLevel.DEBUG,
      logger: migrationLoggerOf(migration => {
        logged.push(migration)

        if (migration.status === 'completed') {
          controller.abort(reason)
        }
      }),
    })

    const action = await fileOf(client, 'a.csv').copy({ destination: 'b.csv' })
    const setTimer = jest.spyOn(global, 'setTimeout')
    const clearTimer = jest.spyOn(global, 'clearTimeout')

    const outcome = await outcomeOf(action.waitForCompletion({ pollIntervalMs: 5, signal: controller.signal, timeoutMs: 60000 }))

    // The completed answer arrived and was logged, but the wait was stopped before it took that answer.
    expect(Object.keys(outcome)).toEqual(['error'])
    expect(Object.is(outcome.error, reason)).toBe(true)
    expect(logged).toEqual([{ id: 7, status: 'completed' }])
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7'])

    // The wait's own timeout timer is cleared, and nothing more is sent.
    const timeouts = setTimer.mock.calls.flatMap(([, ms], index) => (ms === 60000 ? [setTimer.mock.results[index].value] : []))
    expect(timeouts).toHaveLength(1)
    expect(clearTimer).toHaveBeenCalledWith(timeouts[0])

    await new Promise(resolve => { setTimeout(resolve, 30) })
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7'])
  })

  it('rejects with its own timeout when that runs out as the completed migration is logged', async () => {
    const service = actionService({ migrations: { 7: ['completed'] } })
    const logged = []
    const client = clientOf(service, {
      logLevel: LogLevel.DEBUG,
      logger: migrationLoggerOf(migration => {
        logged.push(migration)
        jest.advanceTimersByTime(50)
      }),
    })

    const action = await fileOf(client, 'a.csv').copy({ destination: 'b.csv' })

    jest.useFakeTimers({ doNotFake: ['nextTick', 'queueMicrotask', 'setImmediate'] })

    // The test's own signal stops the wait, should an assertion fail first; the timeout stays the wait's own.
    const stopping = new AbortController()
    const waiting = outcomeOf(action.waitForCompletion({ signal: stopping.signal, timeoutMs: 50 }))

    try {
      const { error } = await waiting

      expect(error).toBeInstanceOf(FilesError)
      expect(error.message).toBe('Waiting for File Migration 7 to complete timed out after 50 ms')
      expect(error.fileAction).toEqual({ file_migration_id: 7, status: 'pending' })
      expect(error.fileMigration).toBeUndefined()
      expect(logged).toEqual([{ id: 7, status: 'completed' }])
      expect(service.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7'])
      expect(jest.getTimerCount()).toBe(0)
    } finally {
      stopping.abort(new Error('the test ended'))
      await waiting
    }
  })

  it('rejects with the reason of a signal aborted before it is called, sending nothing', async () => {
    const service = actionService()
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })
    const reason = new Error('already cancelled')

    await expect(action.waitForCompletion({ signal: AbortSignal.abort(reason) })).rejects.toBe(reason)
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv'])
  })

  it('rejects with a timeout of its own once a timeoutMs given runs out, between polls or during one', async () => {
    const between = actionService({ migrations: { 7: ['processing'] } })
    const action = await fileOf(clientOf(between), 'a.csv').copy({ destination: 'b.csv' })
    const { error } = await outcomeOf(action.waitForCompletion({ pollIntervalMs: 5, timeoutMs: 40 }))

    expect(error).toBeInstanceOf(FilesError)
    expect(error.message).toBe('Waiting for File Migration 7 to complete timed out after 40 ms')
    expect(error.fileMigration).toEqual({ id: 7, status: 'processing' })

    const during = actionService({ migrations: { 7: ['hold'] } })
    const held = await fileOf(clientOf(during), 'a.csv').copy({ destination: 'b.csv' })
    const timedOut = await outcomeOf(held.waitForCompletion({ timeoutMs: 40 }))

    expect(timedOut.error).toBeInstanceOf(FilesError)
    expect(timedOut.error.message).toBe('Waiting for File Migration 7 to complete timed out after 40 ms')
    expect(during.described()).toEqual(['POST /file_actions/copy/a.csv', 'GET /file_migrations/7'])
  })

  it('has no deadline of its own: without a timeout it polls every second for as long as the migration runs', async () => {
    const minutes = 5
    const service = actionService({ migrations: { 7: [...Array(minutes * 60).fill('processing'), 'completed'] } })
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })

    jest.useFakeTimers({ doNotFake: ['nextTick', 'queueMicrotask', 'setImmediate'] })
    const started = Date.now()

    // A signal of the test's own, which sets no deadline, stops the wait should it still be under way at the end.
    const stopping = new AbortController()
    let outcome = null
    const waiting = outcomeOf(action.waitForCompletion({ signal: stopping.signal })).then(settled => { outcome = settled })

    try {
      // Each step lets the poll under way finish, on the real event loop, before the clock moves on by the default
      // interval, so that each step is one poll.
      for (let step = 0; outcome === null && step < minutes * 60 * 4; step += 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => { setImmediate(resolve) })
        // eslint-disable-next-line no-await-in-loop
        await jest.advanceTimersByTimeAsync(1000)
      }

      expect(outcome).toEqual({ value: undefined })
      expect(Date.now() - started).toBeGreaterThanOrEqual(minutes * 60 * 1000)
      expect(service.described().filter(request => request === 'GET /file_migrations/7')).toHaveLength(minutes * 60 + 1)
    } finally {
      stopping.abort(new Error('the test ended'))
      await waiting
    }
  })

  it.each([
    ['a poll interval of 0', { pollIntervalMs: 0 }],
    ['a negative timeout', { timeoutMs: -1 }],
    ['an infinite timeout', { timeoutMs: Infinity }],
    ['a timeout as a string', { timeoutMs: '1000' }],
    ['a signal that is not one', { signal: { aborted: false } }],
  ])('refuses %s before sending anything', async (_, options) => {
    const service = actionService()
    const action = await fileOf(clientOf(service), 'a.csv').copy({ destination: 'b.csv' })

    await expect(action.waitForCompletion(options)).rejects.toBeInstanceOf(InvalidParameterError)
    expect(service.described()).toEqual(['POST /file_actions/copy/a.csv'])
  })

  it('waits for a FileAction made by hand with its own options', async () => {
    const service = actionService({ migrations: { 5: ['processing', 'completed'] } })
    const client = clientOf(service)
    const action = new FileAction({ file_migration_id: 5, status: 'pending' }, { client })

    await action.waitForCompletion({ pollIntervalMs: 1 })
    expect(service.described()).toEqual(['GET /file_migrations/5', 'GET /file_migrations/5'])
  })
})
