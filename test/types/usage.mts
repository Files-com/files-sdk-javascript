// Everyday use of the SDK from a TypeScript ES module, type-checked (not run) by `npm run test:types`.
import { createReadStream, createWriteStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { Agent as HttpsAgent } from 'node:https'
import { Readable } from 'node:stream'

import Files from 'files.com'
import type { RequestOptions } from 'files.com'
import { Attachment as IndexAttachment, Files as IndexFiles } from 'files.com/index.js'
import Api from 'files.com/lib/Api.js'
import Attachment from 'files.com/lib/Attachment.js'
import * as FilesErrors from 'files.com/lib/Errors.js'
import FilesClient from 'files.com/lib/FilesClient.js'
import Logger, { LogLevel } from 'files.com/lib/Logger.js'
import AccountLineItem from 'files.com/lib/models/AccountLineItem.js'
import Behavior from 'files.com/lib/models/Behavior.js'
import File from 'files.com/lib/models/File.js'
import FileAction from 'files.com/lib/models/FileAction.js'
import Folder from 'files.com/lib/models/Folder.js'
import Invoice from 'files.com/lib/models/Invoice.js'
import User from 'files.com/lib/models/User.js'
import pathNormalizer from 'files.com/lib/utils/pathNormalizer.js'

Files.setApiKey('YOUR_API_KEY')
Files.setLogLevel(LogLevel.WARN)
Files.configureNetwork({ maxNetworkRetries: 2, networkTimeout: 30 })
IndexFiles.setWorkspaceId(null)

// Any object with the four logging methods is an application logger; null sends messages to the console again.
Files.setLogger(console)
const applicationLogger: Files.ApplicationLogger | null = Files.getLogger()
Files.setLogger(null)

// A client has settings of its own, whatever the global ones are. Its resources are the models' static methods, and the
// models they return keep the client for their own methods.
const client = Files.createClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://MY-SUBDOMAIN.files.com',
  logger: console,
  logLevel: LogLevel.DEBUG,
  workspaceId: 0,
})

// The same kind of client, made directly: new FilesClient() takes what Files.createClient() takes.
const archive: FilesClient = new FilesClient({
  apiKey: process.env.FILES_ARCHIVE_API_KEY,
  baseUrl: 'https://archive.files.com',
  headers: { 'X-Origin': 'archive' },
})

// A client's agent settings choose the agent of each of its requests, redirects included, that the call's own agent
// options leave to it: its getAgentForUrl, then its agent.
const archiveAgent = new HttpsAgent({ keepAlive: true })
const proxied = new FilesClient({
  agent: new HttpsAgent(),
  debugResponseHeaders: true,
  getAgentForUrl: url => (url.startsWith('https://archive.files.com/') ? archiveAgent : undefined),
})
const logsResponseHeaders: boolean = proxied.shouldDebugResponseHeaders()

// Requests can go through an HTTP client of the application's own, with the signature of the standard fetch(): Node.js's
// own fetch as it is, or one that wraps it. A call's own fetch comes before its client's; the global one applies only to
// calls made without a client.
Files.configureNetwork({ fetch })
const instrumented: Files.Fetch = (url, init) => fetch(url, init)
const instrumentedClient = new FilesClient({ fetch: instrumented })
const clientFetch: Files.Fetch | null | undefined = instrumentedClient.getFetch()
const globalFetch: Files.Fetch | null | undefined = Files.getFetch()

export const usersOfEachClient = (): Promise<User[][]> =>
  Promise.all([client, archive, proxied].map(each => each.users.list({ per_page: 1 })))

export const usersThroughOwnFetch = (): Promise<User[]> => instrumentedClient.users.list({}, { fetch })

// A cursor-paginated list also gives its models one at a time.
export const clientUserIterator = (): AsyncIterableIterator<User> => client.users.listIterator({ per_page: 100 })

export const clientUsers = async (): Promise<User[]> => {
  const users = await client.users.list({ per_page: 1 }, { workspaceId: null })
  const saved: true | undefined = await users[0]?.save()
  return saved ? users : []
}

// A client's files resource has File's static methods and its upload, copy and move helpers; the Files it returns keep
// the client. A helper's copy resolves with the API's response, not a model.
export const clientTransfers = async (path: string): Promise<string> => {
  const created: File = await client.files.create(path, { mkdir_parents: true })
  const uploaded: File = await client.files.uploadData(path, 'hello', {}, { headers: { 'X-Call': 'upload' } })
  const copied: File.ActionResponse = await client.files.copyToRemoteServer(path, 1, 'backup/report.txt')
  await uploaded.downloadToFile('copy.txt')
  return `${created.path ?? ''} ${copied.data.status ?? ''}`
}

export const manageUsers = async (): Promise<string[]> => {
  const user = await User.create({ username: 'alice', authenticate_until: '2030-01-01T00:00:00Z' }, { workspaceId: 12 })
  user.setName('Alice')
  const saved: true = await user.save()

  // An attribute's property reads the model's current state, as its getter does.
  const name: string | null | undefined = user.name
  const state: User.Attributes = user.attributes

  // An update that returns the same kind of model updates the object itself.
  const updated: User = await user.update({ email: 'alice@example.com' })

  // An environment variable may be unset: an API key given as undefined is the same as one left out.
  const options: RequestOptions = { apiKey: process.env.FILES_API_KEY, workspaceId: null }
  const found = await User.find(1, {}, options)
  await found.delete({ new_owner_id: updated.getId() ?? 0 })

  const everyone: User[] = await User.list({ per_page: 1000 }, { autoPaginate: true })
  const firstPage: User[] = await User.all({ per_page: 10 }, { autoPaginate: false })

  return [
    found.getName() ?? 'unnamed',
    String(saved),
    name ?? '',
    state.username ?? '',
    ...everyone.map(each => each.getEmail() ?? ''),
    ...firstPage.map(each => each.username ?? `user ${each.id}`),
  ]
}

// Invoice.list() returns account line items, whose amounts are decimal strings.
export const invoiceAmounts = async (): Promise<Files.DecimalString[]> => {
  const items: AccountLineItem[] = await Invoice.list()
  return items.flatMap(item => item.getAmount() ?? [])
}

export const configureWebhook = (path: string): Promise<Behavior> => Behavior.create({
  behavior: 'webhook',
  path,
  value: { method: 'POST', triggers: ['create', 'update'], urls: ['https://example.com/hook'] },
})

// A file parameter takes an Attachment of a Buffer, another Uint8Array or a Node.js Readable stream.
export const configureWatermark = async (path: string): Promise<Behavior> => {
  const image = new Attachment(await readFile('watermark.png'), { filename: 'watermark.png', type: 'image/png' })
  const replayable: boolean = image.isReplayable
  const bytes: number | null = image.byteLength
  Logger.debug(image.filename, image.type, replayable, bytes)

  const behavior = await Behavior.create({
    attachment_file: image,
    behavior: 'watermark',
    path,
    value: { gravity: 'SouthEast', max_height_or_width: 20, transparency: 25 },
  })

  const stream = new IndexAttachment(createReadStream('watermark.png'), { maxBytes: Attachment.DEFAULT_MAX_BYTES })
  return behavior.update({ attachment_file: stream })
}

export const transferFiles = async (path: string): Promise<string> => {
  const uploaded = await File.uploadData(path, 'hello', { mkdir_parents: true })
  await File.uploadData(path, [Buffer.from('a'), new Uint8Array([98]), 'c'])
  await File.uploadData(path, Readable.from(['streamed']))
  await File.uploadStream(path, createReadStream('local.txt'))
  await File.uploadFile(path, 'local.txt', {}, { determinePartUploadUri: part => part.upload_uri ?? '' })
  await File.uploadToRemoteServer(1, 'reports/today.csv', 'local.txt')

  const [first] = await Folder.listFor('reports', { per_page: 10 })
  const copied = await uploaded.copyTo(`${path}.copy`)
  await uploaded.copyToRemoteServer(1, 'backup/report.txt', { overwrite: true })
  await uploaded.downloadToStream(createWriteStream('copy.txt'))
  await uploaded.downloadToFile('copy.txt')

  const same = pathNormalizer.same(first?.path ?? '', path)
  return `${await uploaded.downloadToString()} ${first?.path ?? ''} ${copied.status} ${copied.data.status ?? ''} ${same}`
}

// Source-first uploads, beside the destination-first ones, and transfers that share a job, report progress and pause.
export const transferWithJob = async (path: string): Promise<Files.TransferJobSnapshot> => {
  const job = new Files.TransferJob({ maxBufferBytes: 64 * 1024 * 1024, maxConcurrency: 16, maxConcurrentFiles: 4 })
  const control = new Files.TransferControl()
  const seen: Files.TransferProgress[] = []
  const onProgress = (progress: Files.TransferProgress): void => { seen.push(progress) }

  const uploaded: File = await File.upload('local.txt', path, { mkdir_parents: true }, { job, onProgress, startup: 'aggressive' })
  await File.uploadFromData(new Uint8Array([1, 2, 3]), path, {}, { control, job })
  await File.uploadFromData(new ArrayBuffer(8), path)
  await File.uploadFromStream(createReadStream('local.txt'), path, {}, { maxConcurrency: 4, size: 1024 })
  await File.uploadFileToRemoteServer('local.txt', 1, 'reports/today.csv', {}, { concurrency: 8 })
  await client.files.upload('local.txt', path, { with_rename: true })

  // A source-first upload to an external destination given no destination path goes under the source's own name.
  await File.uploadFileToRemoteServer('local/reports/today.csv', 1)
  await File.uploadFileToSnapshot('local/reports/today.csv', 2)
  await client.files.uploadFileToChildSite('local/reports/today.csv', 3)
  await client.files.uploadFileToRemoteServer('local.txt', 1, undefined, { mkdir_parents: true }, { job })

  control.pause()
  const paused: boolean = control.paused
  control.resume()

  await uploaded.downloadToFile('copy.txt', { control, job, maxConcurrency: 8, onProgress, signal: AbortSignal.timeout(60000) })
  const text: string = await uploaded.downloadToString({ job })
  await uploaded.downloadToStream(createWriteStream('copy.txt'), { onProgress })

  const snapshot = job.snapshot()
  const targets: number[] = snapshot.controllers.map(each => each.target)
  Logger.debug(paused, text.length, targets, seen.map(each => `${each.state} ${each.bytesTransferred}/${each.totalBytes ?? '?'}`))
  return snapshot
}

// A client's filesystem has Node.js's fs/promises conventions over Files.com paths: file handles that read and write
// the remote file, each change published before it resolves, and directories listed a page at a time.
export const portedFileCode = async (path: string): Promise<string> => {
  const handle: Files.RemoteFileHandle = await client.fs.open(path, 'r+')
  const { buffer, bytesRead } = await handle.read(Buffer.alloc(16), 0, 16, null)
  const { bytesWritten } = await handle.write('total', 0, 'utf8')
  const vector = await handle.writev([Buffer.from('a'), Buffer.from('b')], 5)
  await handle.truncate(32)
  const stats: Files.RemoteStats = await handle.stat()
  const text: string = await handle.readFile('utf8')
  const range = handle.createReadStream({ autoClose: false, end: 3, start: 1 })
  await handle.close()

  await client.fs.writeFile(`${path}.copy`, text)
  const copied: Buffer = await client.fs.readFile(`${path}.copy`)
  const writer = await client.fs.open(`${path}.log`, 'w')
  Readable.from(['one\n', 'two\n']).pipe(writer.createWriteStream())

  const names: string[] = []
  const dir: Files.RemoteDir = await client.fs.opendir('reports', { bufferSize: 100 })

  for await (const entry of dir) {
    names.push(`${entry.parentPath}/${entry.name}${entry.isDirectory() ? '/' : ''}`)
  }

  const listed: string[] = await client.fs.readdir('reports', { recursive: true })
  const entries: Files.RemoteDirent[] = await client.fs.readdir('reports', { withFileTypes: true })
  const big: Files.RemoteBigIntStats = await client.fs.stat(path, { bigint: true })

  // A mode with flags that do not create the file is accepted, and ignored, as Node.js ignores it: native-shaped code
  // that passes one keeps compiling. Flags held in a variable of the flags' type open as well.
  const reader = await client.fs.open(path, 'r', 0o644)
  const updater = await client.fs.open(path, 'r+', '644')
  const flags: Files.OpenFlags = 'r'
  const chosen = await client.fs.open(path, flags)
  await Promise.all([reader.close(), updater.close(), chosen.close()])
  await client.fs.writeFile(path, text, { flag: 'r+', mode: 0o600 })
  await client.fs.appendFile(path, text, { flag: 'r+', mode: 0o600 })

  const sizes = [bytesRead, buffer.length, bytesWritten, vector.bytesWritten, stats.size ?? 0, copied.length, range.bytesRead]
  return `${sizes.join(' ')} ${names.length} ${listed.length} ${entries.length} ${String(big.size ?? '')}`
}

// A copy, move or beginDelete, a File's own, resolves as soon as the API accepts it; waitForCompletion() waits for the
// action itself, with an optional timeout and signal. A helper's raw response waits the same way.
export const sequencedActions = async (path: string): Promise<string> => {
  const file = new File({ path }, { client })
  const copied: FileAction = await file.copy({ destination: `${path}.bak` })
  await copied.waitForCompletion({ timeoutMs: 600000 })

  const deleting: FileAction = await file.beginDelete({ recursive: true })
  await deleting.waitForCompletion({ pollIntervalMs: 5000, signal: AbortSignal.timeout(60000) })

  const moved: File.ActionResponse = await File.moveToRemoteServer(`${path}.bak`, 1, 'archive/report.txt')
  const status: string | null | undefined = moved.data.status

  try {
    await moved.waitForCompletion()
    return status ?? 'accepted'
  } catch (error) {
    if (error instanceof FilesErrors.FilesError && error.fileAction) {
      return `${String(error.fileAction.status)} ${JSON.stringify(error.fileMigration)}`
    }

    throw error
  }
}

// An upload whose completion failed says whether it may have completed anyway.
export const uploadOutcome = async (path: string): Promise<string> => {
  try {
    await File.uploadData(path, 'hello')
    return 'completed'
  } catch (error) {
    if (error instanceof FilesErrors.FilesError) {
      const unknown: boolean | undefined = error.completionUnknown
      return unknown === true ? 'check the destination' : error.message
    }

    throw error
  }
}

// A workspace option given as undefined, such as an unset setting, sends no workspace, as null does; leaving the option
// out keeps the configured workspace.
export const listOutsideWorkspace = (workspaceId: number | undefined): Promise<User[]> => User.list({}, { workspaceId })

export const sendRequest = async (): Promise<unknown> => {
  const response = await Api.sendRequest('/users', 'GET', { per_page: 1 }, { timeoutSecs: 10 })
  return response.status === 200 ? response.data : response.headers['content-type']
}

export const handleErrors = async (): Promise<void> => {
  try {
    await User.list({}, { workspaceId: 0 })
  } catch (error) {
    if (error instanceof FilesErrors.NotAuthenticatedError) {
      Logger.error(error.type, error.httpCode)
    } else if (error instanceof FilesErrors.FilesError) {
      Logger.warn(error.message, error.code)
    } else {
      throw error
    }
  }
}

export { applicationLogger, clientFetch, globalFetch, logsResponseHeaders }
