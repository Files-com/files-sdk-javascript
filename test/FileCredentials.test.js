import { execFileSync } from 'child_process'
import fs from 'fs'
import https from 'https'
import os from 'os'
import path from 'path'
import { Writable } from 'stream'

import Api from '../lib/Api'
import Files from '../lib/Files'
import FilesClient from '../lib/FilesClient'
import File from '../lib/models/File'

describe('File credentials', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('uses the File options for copyTo and moveTo by default', async () => {
    const options = {
      apiKey: 'scoped-key',
      sessionId: 'scoped-session',
      workspaceId: 456,
    }

    const file = new File({ path: 'source.txt' }, options)
    const sendRequest = jest.spyOn(Api, 'sendRequest').mockResolvedValue({ data: {} })

    await file.copyTo('copied.txt')
    await file.moveTo('moved.txt')

    expect(sendRequest).toHaveBeenNthCalledWith(
      1,
      '/file_actions/copy/source.txt',
      'POST',
      { destination: 'copied.txt' },
      options,
    )

    expect(sendRequest).toHaveBeenNthCalledWith(
      2,
      '/file_actions/move/source.txt',
      'POST',
      { destination: 'moved.txt' },
      options,
    )
  })
})

// Real requests through clients, to two APIs and a storage server on this machine, over HTTPS with a certificate made
// for this file that only the agents the tests give trust: TLS verification stays on, and no global trust changes.
describe('File through a client', () => {
  const PAYLOAD = 'stored file contents'

  // A file large enough to be downloaded in ranges, each group of four bytes holding its own offset.
  const LARGE = Buffer.alloc(24 * 1024 * 1024)

  for (let offset = 0; offset < LARGE.length; offset += 4) {
    LARGE.writeUInt32BE(offset, offset)
  }

  const apiRequests = []
  const storageRequests = []
  const connections = []
  const serverNames = {}
  const urls = {}
  let directory
  let cert
  let servers

  // An agent that trusts only this file's certificate, and records each connection it makes and to which server.
  class TrustingAgent extends https.Agent {
    constructor(name) {
      super({ ca: cert })
      this.agentName = name
    }

    createConnection(options, callback) {
      connections.push(`${this.agentName} ${serverNames[Number(options.port)]}`)
      return super.createConnection(options, callback)
    }
  }

  // Answers an upload's begin_upload with the grants it asks for, a copy or move, and any other File request, an
  // upload's completion included, with the File, whose download_uri is on storage: LARGE for a path starting with
  // large, otherwise PAYLOAD. Records each request's credentials, workspace and headers.
  const answerApi = name => (request, response, body) => {
    const { action, destination, part } = body ? JSON.parse(body) : {}
    const filePath = decodeURIComponent(request.url.replace('/api/rest/v1/files/', ''))

    apiRequests.push({
      action,
      api: name,
      call: request.headers['x-call'],
      destination,
      key: request.headers['x-filesapi-key'],
      origin: request.headers['x-origin'],
      part,
      request: `${request.method} ${decodeURIComponent(request.url)}`,
      workspace: request.headers['x-files-workspace-id'],
    })

    response.writeHead(200, { 'Content-Type': 'application/json' })
    if (request.url.startsWith('/api/rest/v1/file_actions/begin_upload/')) {
      response.end(JSON.stringify([{
        part_number: part ?? 1,
        partsize: 5242880,
        ref: 'upload-ref',
        upload_uri: `${urls.storage}/part-${part ?? 1}?X-Amz-Signature=signed`,
      }]))
    } else if (request.url.startsWith('/api/rest/v1/file_actions/')) {
      response.end(JSON.stringify({ status: 'completed' }))
    } else {
      const download = filePath.startsWith('large') ? 'large' : 'download'
      response.end(JSON.stringify({ download_uri: `${urls.storage}/${download}?X-Amz-Signature=signed`, path: filePath, type: 'file' }))
    }
  }

  // Stores a part, or serves the file, LARGE in ranges too, and records each request's body, Range and If-Match, and
  // any of the API's headers sent with it.
  const answerStorage = (request, response, body) => {
    storageRequests.push({
      apiHeaders: Object.keys(request.headers).filter(name => /^x-(files|origin|call)/.test(name)),
      body,
      ifMatch: request.headers['if-match'],
      range: request.headers.range,
      request: `${request.method} ${request.url.split('?')[0]}`,
    })

    const asked = /^bytes=(\d+)-(\d+)$/.exec(request.headers.range ?? '')

    if (request.method === 'PUT') {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end()
    } else if (request.url.startsWith('/large') && asked) {
      const [start, end] = [Number(asked[1]), Number(asked[2])]

      response.writeHead(206, {
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${LARGE.length}`,
        ETag: '"large-v1"',
      })

      response.end(LARGE.subarray(start, end + 1))
    } else if (request.url.startsWith('/large')) {
      response.writeHead(200, { 'Content-Length': LARGE.length, ETag: '"large-v1"' })
      response.end(LARGE)
    } else {
      response.writeHead(200, { 'Content-Length': Buffer.byteLength(PAYLOAD) })
      response.end(PAYLOAD)
    }
  }

  beforeAll(async () => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'files-client-'))
    const configPath = path.join(directory, 'openssl.cnf')
    const keyPath = path.join(directory, 'key.pem')
    const certPath = path.join(directory, 'cert.pem')

    fs.writeFileSync(configPath, [
      '[req]',
      'distinguished_name = subject',
      'x509_extensions = extensions',
      'prompt = no',
      '[subject]',
      'CN = 127.0.0.1',
      '[extensions]',
      'subjectAltName = IP:127.0.0.1',
    ].join('\n'))

    execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '1', '-config', configPath, '-keyout', keyPath, '-out', certPath], { stdio: 'ignore' })
    cert = fs.readFileSync(certPath)
    const key = fs.readFileSync(keyPath)

    const handlers = { a: answerApi('a'), b: answerApi('b'), storage: answerStorage }

    servers = await Promise.all(Object.entries(handlers).map(async ([name, handle]) => {
      const server = https.createServer({ cert, key }, (request, response) => {
        const chunks = []

        request.on('data', chunk => chunks.push(chunk))
        request.on('end', () => handle(request, response, Buffer.concat(chunks).toString()))
      })

      await new Promise(resolve => { server.listen(0, '127.0.0.1', resolve) })
      serverNames[server.address().port] = name === 'storage' ? 'storage' : `api-${name}`
      urls[name] = `https://127.0.0.1:${server.address().port}`
      return server
    }))
  })

  // Global settings that no client's request may use: their site is unreachable, so a request with them fails.
  beforeEach(() => {
    apiRequests.length = 0
    storageRequests.length = 0
    connections.length = 0
    Files.setApiKey('global-key')
    Files.setBaseUrl('https://127.0.0.1:9')
    Files.setWorkspaceId(99)
    Files.configureNetwork({ maxNetworkRetries: 0 })
  })

  afterEach(() => {
    Files.setApiKey(null)
    Files.setBaseUrl('https://app.files.com')
    Files.setWorkspaceId(null)
    Files.configureNetwork({ maxNetworkRetries: 3 })
  })

  afterAll(async () => {
    await Promise.all(servers.map(server => {
      server.closeAllConnections()
      return new Promise(resolve => { server.close(resolve) })
    }))

    fs.rmSync(directory, { force: true, recursive: true })
  })

  it('makes File calls with the client\'s settings, as the Files they return do, unless given another client', async () => {
    const agents = [new TrustingAgent('a'), new TrustingAgent('b')]
    const clientA = new FilesClient({
      agent: agents[0],
      apiKey: 'key-a',
      baseUrl: urls.a,
      headers: { 'X-Origin': 'a' },
      maxNetworkRetries: 0,
      workspaceId: 1,
    })

    const clientB = Files.createClient({
      agent: agents[1],
      apiKey: 'key-b',
      baseUrl: urls.b,
      headers: { 'X-Origin': 'b' },
      maxNetworkRetries: 0,
      workspaceId: 2,
    })

    try {
      // A's File comes from a call with overrides of its own: another API key, workspace and header.
      const file = await clientA.files.create('reports/today.csv', { mkdir_parents: true }, {
        apiKey: 'call-key',
        headers: { 'X-Call': 'create' },
        workspaceId: 5,
      })

      // Without options, the File's move is made with what it keeps: client A and that call's overrides.
      await file.moveTo('reports/moved.csv')

      // Options given to a copy replace the File's own, the call's overrides included, but the File keeps client A.
      const copied = await file.copyTo('reports/copy.csv', { headers: { 'X-Call': 'copy' } })

      // Another client given to a copy is used instead, with none of client A's or the File's own options.
      await file.copyTo('reports/copy-b.csv', { client: clientB })
      await clientB.files.copyToRemoteServer('reports/today.csv', 7, 'backup/today.csv')

      expect(file).toBeInstanceOf(File)
      expect(copied.data).toEqual({ status: 'completed' })
      expect(apiRequests).toEqual([
        {
          api: 'a',
          call: 'create',
          key: 'call-key',
          origin: 'a',
          request: 'POST /api/rest/v1/files/reports/today.csv',
          workspace: '5',
        },
        {
          api: 'a',
          call: 'create',
          destination: 'reports/moved.csv',
          key: 'call-key',
          origin: 'a',
          request: 'POST /api/rest/v1/file_actions/move/reports/today.csv',
          workspace: '5',
        },
        {
          api: 'a',
          call: 'copy',
          destination: 'reports/copy.csv',
          key: 'key-a',
          origin: 'a',
          request: 'POST /api/rest/v1/file_actions/copy/reports/today.csv',
          workspace: '1',
        },
        {
          api: 'b',
          destination: 'reports/copy-b.csv',
          key: 'key-b',
          origin: 'b',
          request: 'POST /api/rest/v1/file_actions/copy/reports/today.csv',
          workspace: '2',
        },
        {
          api: 'b',
          destination: '_/RemoteServers/7/backup/today.csv',
          key: 'key-b',
          origin: 'b',
          request: 'POST /api/rest/v1/file_actions/copy/reports/today.csv',
          workspace: '2',
        },
      ])

      expect(connections).toEqual(['a api-a', 'a api-a', 'a api-a', 'b api-b', 'b api-b'])
    } finally {
      agents.forEach(agent => agent.destroy())
    }
  })

  it('uploads through a client: its settings for begin_upload and completion, only an agent for parts, its client for the File', async () => {
    const agents = [new TrustingAgent('client'), new TrustingAgent('call')]
    const client = new FilesClient({
      agent: agents[0],
      apiKey: 'key-a',
      baseUrl: urls.a,
      headers: { 'X-Origin': 'a' },
      maxNetworkRetries: 0,
      workspaceId: 1,
    })

    try {
      const producing = new AbortController()
      const uploaded = await client.files.uploadData('reports/up.csv', 'first upload', {}, {
        headers: { 'X-Call': 'upload' },
        signal: producing.signal,
      })

      // The File keeps the client and the call's options, but not the call's signal, aborted since.
      producing.abort()
      await uploaded.copyTo('reports/up-copy.csv')

      // A call's own agent comes before the client's, for its API requests and its parts; here from a file on disk,
      // given source first.
      fs.writeFileSync(path.join(directory, 'again.csv'), 'second upload')
      await client.files.upload(path.join(directory, 'again.csv'), 'reports/again.csv', {}, { agent: agents[1] })

      // Every API request is made with the client's key, workspace and headers.
      const clientRequest = (request, fields) => ({
        api: 'a',
        key: 'key-a',
        origin: 'a',
        request,
        workspace: '1',
        ...fields,
      })

      expect(apiRequests).toEqual([
        clientRequest('POST /api/rest/v1/file_actions/begin_upload/reports/up.csv', { call: 'upload' }),
        clientRequest('POST /api/rest/v1/files/reports/up.csv', { action: 'end', call: 'upload' }),
        clientRequest('POST /api/rest/v1/file_actions/copy/reports/up.csv', { call: 'upload', destination: 'reports/up-copy.csv' }),
        clientRequest('POST /api/rest/v1/file_actions/begin_upload/reports/again.csv', {}),
        clientRequest('POST /api/rest/v1/files/reports/again.csv', { action: 'end' }),
      ])

      // Storage gets each part's bytes, with none of the API's headers.
      expect(storageRequests).toEqual([
        { apiHeaders: [], body: 'first upload', request: 'PUT /part-1' },
        { apiHeaders: [], body: 'second upload', request: 'PUT /part-1' },
      ])

      expect(connections).toEqual([
        'client api-a', 'client storage', 'client api-a', 'client api-a',
        'call api-a', 'call storage', 'call api-a',
      ])
    } finally {
      agents.forEach(agent => agent.destroy())
    }
  })

  // The source-first uploads to each external destination, given no destination path, upload the file under its own
  // name at the destination's root; a path given, and the ID-first order, are kept as they are. Every request is the
  // client's, and every part the file's own bytes.
  it('uploads a file on disk to each external destination under its own name when given no destination path, keeping any path given', async () => {
    const agent = new TrustingAgent('client')
    const client = new FilesClient({ agent, apiKey: 'key-a', baseUrl: urls.a, maxNetworkRetries: 0, workspaceId: 1 })
    const nested = path.join(directory, 'nested', 'deep')
    const source = path.join(nested, 'report.csv')
    fs.mkdirSync(nested, { recursive: true })
    fs.writeFileSync(source, 'external contents')

    try {
      const uploaded = [
        await client.files.uploadFileToRemoteServer(source, 7),
        await client.files.uploadFileToSnapshot(source, 8, undefined, { mkdir_parents: true }),
        await File.uploadFileToChildSite(source, 9, undefined, {}, { client }),
        await client.files.uploadFileToRemoteServer(source, 7, 'kept/given.csv'),
        await client.files.uploadToRemoteServer(7, 'legacy/order.csv', source),
      ]

      const uploadPaths = [
        '_/RemoteServers/7/report.csv',
        '_/Snapshots/8/report.csv',
        '_/Sites/9/report.csv',
        '_/RemoteServers/7/kept/given.csv',
        '_/RemoteServers/7/legacy/order.csv',
      ]

      expect(uploaded.every(file => file instanceof File && file.options.client === client)).toBe(true)
      expect(apiRequests).toEqual(uploadPaths.flatMap(uploadPath => [
        { api: 'a', key: 'key-a', request: `POST /api/rest/v1/file_actions/begin_upload/${uploadPath}`, workspace: '1' },
        { action: 'end', api: 'a', key: 'key-a', request: `POST /api/rest/v1/files/${uploadPath}`, workspace: '1' },
      ]))

      expect(storageRequests).toEqual(Array(5).fill({ apiHeaders: [], body: 'external contents', request: 'PUT /part-1' }))
      expect(fs.readFileSync(source, 'utf8')).toBe('external contents')
    } finally {
      agent.destroy()
    }
  })

  it('downloads a client\'s File, by each download method, through the agent its call or client chooses', async () => {
    const agents = [new TrustingAgent('client'), new TrustingAgent('call')]
    const client = new FilesClient({
      agent: agents[0],
      apiKey: 'key-a',
      baseUrl: urls.a,
      maxNetworkRetries: 0,
    })

    const target = path.join(directory, 'downloaded.csv')
    const streamed = []
    const writable = new Writable({
      write: (chunk, encoding, callback) => {
        streamed.push(chunk)
        callback()
      },
    })

    try {
      const file = await client.files.create('reports/today.csv')
      const text = await file.downloadToString()

      await file.downloadToFile(target)
      await file.downloadToStream(writable)

      // A File from a call with an agent of its own downloads through that agent.
      const fromCall = await client.files.create('reports/today.csv', {}, { agent: agents[1] })
      const textFromCall = await fromCall.downloadToString()

      expect([text, fs.readFileSync(target, 'utf8'), Buffer.concat(streamed).toString(), textFromCall])
        .toEqual([PAYLOAD, PAYLOAD, PAYLOAD, PAYLOAD])

      // A download sends none of the API's credentials or headers.
      expect(storageRequests).toEqual(Array(4).fill({ apiHeaders: [], body: '', request: 'GET /download' }))
      expect(connections).toEqual([
        'client api-a', 'client storage', 'client storage', 'client storage', 'call api-a', 'call storage',
      ])
    } finally {
      agents.forEach(agent => agent.destroy())
    }
  })

  const clientWith = agent => new FilesClient({
    agent,
    apiKey: 'key-a',
    baseUrl: urls.a,
    maxNetworkRetries: 0,
  })

  // A request to storage for LARGE, with none of the API's headers, asking for range, if any, of the version etag.
  const largeRequest = (range, etag) => ({
    apiHeaders: [],
    body: '',
    ifMatch: etag,
    range,
    request: 'GET /large',
  })

  it('downloads a large File in ranges through the client\'s own https.Agent, with none of the API\'s headers', async () => {
    // Only this agent trusts the servers' certificate, so every request of the download is made through it.
    const agent = new https.Agent({ ca: cert })
    const target = path.join(directory, 'large.bin')

    try {
      const file = await clientWith(agent).files.create('large.bin')
      await file.downloadToFile(target)

      expect(fs.readFileSync(target).equals(LARGE)).toBe(true)
      expect([...storageRequests].sort((first, second) => (first.range ?? '').localeCompare(second.range ?? '')))
        .toEqual([
          largeRequest(),
          largeRequest('bytes=16777216-25165823', '"large-v1"'),
          largeRequest('bytes=8388608-16777215', '"large-v1"'),
        ])
    } finally {
      agent.destroy()
    }
  })

  it('downloads a large File through one response with an agent of another kind, or one limited to a socket', async () => {
    const custom = new TrustingAgent('custom')
    const limited = new https.Agent({ ca: cert, maxSockets: 1 })
    const targets = [path.join(directory, 'custom.bin'), path.join(directory, 'limited.bin')]

    try {
      await (await clientWith(custom).files.create('large.bin')).downloadToFile(targets[0])
      await (await clientWith(limited).files.create('large.bin')).downloadToFile(targets[1])

      expect(targets.map(target => fs.readFileSync(target).equals(LARGE))).toEqual([true, true])
      expect(storageRequests).toEqual([largeRequest(), largeRequest()])
      expect(connections).toEqual(['custom api-a', 'custom storage'])
    } finally {
      custom.destroy()
      limited.destroy()
    }
  })
})
