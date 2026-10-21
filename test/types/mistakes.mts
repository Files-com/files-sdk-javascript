// Mistakes the declarations reject. The line after each `@ts-expect-error` must fail to type-check: if it ever
// compiles, the unused directive is itself an error, so `npm run test:types` fails. How a schema's parameters and fields
// map to types (required, boolean, decimal, file, structured values and their enums, read-only properties, model
// methods) is checked against fixed schemas by spec/javascript_typescript_declarations_spec.rb rather than here, where
// a legitimate change to the live schema would break the check.
import Files from 'files.com'
import Attachment from 'files.com/lib/Attachment.js'
import FilesClient from 'files.com/lib/FilesClient.js'
import Behavior from 'files.com/lib/models/Behavior.js'
import File from 'files.com/lib/models/File.js'
import FileAction from 'files.com/lib/models/FileAction.js'
import User from 'files.com/lib/models/User.js'
// @ts-expect-error The package root is the Files class: models have their own paths.
import { User as RootUser } from 'files.com'

declare const user: User
declare const file: File

// @ts-expect-error Only the CommonJS files.com/lib/Files is its own `default`; the package root's types leave it out.
Files.default.setApiKey('YOUR_API_KEY')

// @ts-expect-error A client has no setting named apikey, and Files.createClient() rejects it at run time too.
Files.createClient({ apikey: 'YOUR_API_KEY' })

// @ts-expect-error An upload's options come after its params, not in their place.
await Files.createClient().files.uploadData('report.txt', 'data', { workspaceId: 0 })

// @ts-expect-error A client's getAgentForUrl, as a call's, must return the agent right away, not a Promise.
new FilesClient({ getAgentForUrl: async () => undefined })

// @ts-expect-error An application logger needs all four methods: error, warn, info and debug.
Files.setLogger({ error: console.error, warn: console.warn })

// @ts-expect-error A client's fetch is the HTTP client function itself, not the name of a package.
new FilesClient({ fetch: 'undici' })

// @ts-expect-error A fetch resolves with a response, so it returns a Promise, not the response itself.
Files.configureNetwork({ fetch: () => ({ status: 200 }) })

// @ts-expect-error A misspelled parameter.
await User.list({ per_pag: 10 })

// @ts-expect-error An iterator gives the users one at a time, for `for await`: not the Promise of User.list()'s array.
const listed: Promise<User[]> = User.listIterator()

// @ts-expect-error An ID is a number.
await User.find('1')

// @ts-expect-error Options go after the params argument, not in its place.
await User.find(1, { workspaceId: 0 })

// @ts-expect-error A date-time is an ISO 8601 string, not a Date.
await User.create({ username: 'alice', authenticate_until: new Date() })

declare const lookalike: { source: Buffer; filename: string; type: undefined; maxBytes: number; byteLength: number; isReplayable: true }

// @ts-expect-error Only an Attachment its class made is sent as a file: an object with the same fields is sent as JSON.
await Behavior.create({ behavior: 'watermark', path: 'inbox', attachment_file: lookalike })

// @ts-expect-error A string is never read as a file path: read the file, or open a stream of it.
new Attachment('watermark.png')

// @ts-expect-error A Web stream is not a Node.js Readable stream.
new Attachment(new ReadableStream())

// @ts-expect-error maxBytes is a number of bytes.
new Attachment(Buffer.from('a'), { maxBytes: '1 MB' })

// @ts-expect-error A getter's field may be missing.
const name: string = user.getName()

// @ts-expect-error copy() returns the copy's FileAction, not the File.
const copy: File = await file.copy({ destination: 'copy.txt' })

// @ts-expect-error An undefined timeoutSecs replaces the configured timeout instead of keeping it: leave it out.
await User.list({}, { timeoutSecs: undefined })

// @ts-expect-error A Web stream is not a Node.js readable stream.
await File.uploadStream('report.txt', new ReadableStream())

// @ts-expect-error Upload chunks are strings or bytes.
await File.uploadData('report.txt', [{ line: 1 }])

// @ts-expect-error Upload data is text or bytes, not a number.
await File.uploadData('report.txt', 42)

// @ts-expect-error determinePartUploadUri must return the URL right away.
await File.uploadFile('report.txt', 'local.txt', {}, { determinePartUploadUri: async part => part.upload_uri ?? '' })

// @ts-expect-error A source-first upload needs its destination too.
await File.upload('local.txt')

// @ts-expect-error The ID-first upload to an external destination keeps its order: the destination path, then the source.
await File.uploadToRemoteServer(1, 'local.txt')

// @ts-expect-error An upload's startup is 'default' or 'aggressive'.
await File.upload('local.txt', 'report.txt', {}, { startup: 'fast' })

// @ts-expect-error A job's counts are numbers.
new Files.TransferJob({ maxConcurrency: '32' })

// @ts-expect-error A transfer's control is a Files.TransferControl, which pauses and resumes it.
await file.downloadToFile('local.txt', { control: { paused: false } })

// @ts-expect-error A Web stream is not a Node.js writable stream.
await file.downloadToStream(new WritableStream())

// @ts-expect-error A download's options are its own, not a call's request options.
await file.downloadToFile('local.txt', { workspaceId: 0 })

// @ts-expect-error A Files.com path cannot be opened for appending: the API has no atomic append.
await Files.createClient().fs.open('report.txt', 'a')

// @ts-expect-error A Files.com path has no file mode to create it with.
await Files.createClient().fs.open('report.txt', 'w', 0o644)

// @ts-expect-error writeFile()'s default flag 'w' creates the file, which a Files.com path has no mode for.
await Files.createClient().fs.writeFile('report.txt', 'data', { mode: 0o644 })

// @ts-expect-error A wait's timeout is a number of milliseconds.
await (await file.copy({ destination: 'copy.txt' })).waitForCompletion({ timeoutMs: '30s' })

// @ts-expect-error A copy helper resolves with the API's response, whose data describes the copy: not a FileAction model.
const action: FileAction = await file.copyTo('copy.txt')

export { RootUser, action, copy, listed, name }
