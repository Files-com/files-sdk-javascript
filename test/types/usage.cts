// The same SDK from a CommonJS module, with `import = require()`, type-checked (not run) by `npm run test:types`.
import Files = require('files.com')
import FilesIndex = require('files.com/index')
import Attachment = require('files.com/lib/Attachment')
import FilesClient = require('files.com/lib/FilesClient')
import FilesErrors = require('files.com/lib/Errors')
import LibFiles = require('files.com/lib/Files')
import Logger = require('files.com/lib/Logger')
import File = require('files.com/lib/models/File')
import User = require('files.com/lib/models/User')

Files.setApiKey('YOUR_API_KEY')
const requestOptions: Files.RequestOptions = { workspaceId: null }

// A CommonJS module's `.default` is its class, as `require('files.com/lib/Files').default` is. The package root's types
// leave it out, since a bundle's `files.com` has none: files.com/lib/Files declares it.
LibFiles.default.setApiKey('YOUR_API_KEY')
Logger.default.pause()
Logger.unpause()

const level: Logger.LogLevel = Logger.LogLevel.DEBUG
FilesIndex.Files.setLogLevel(level)
FilesIndex.Logger.info('configured')

// A client from the CommonJS module, which is also its own `default`.
const client = new FilesClient({ apiKey: 'YOUR_API_KEY', workspaceId: 0 })
export const defaultClient: FilesClient = new FilesClient.default()

export const clientUserNames = async (): Promise<Array<string | null | undefined>> => {
  const users = await client.users.list({ per_page: 1 }, requestOptions)
  return users.map(user => user.getName())
}

export const firstUserName = async (): Promise<string | undefined> => {
  try {
    const [first] = await User.default.list({ per_page: 1 }, requestOptions)
    return first?.getName() ?? undefined
  } catch (error) {
    if (error instanceof FilesErrors.FilesApiError) {
      return error.title
    }

    throw error
  }
}

export const avatars = (bytes: Uint8Array): Attachment[] => [
  new Attachment(bytes, { filename: 'avatar.png' }),
  new Attachment.default(bytes),
  new FilesIndex.Attachment(bytes, { type: 'image/png' }),
]

// A folder's upload and download from the CommonJS module, whose File is also its own `default`, and through a client.
export const folderBytes = async (): Promise<number> => {
  const uploaded: File.DirectoryTransferResult = await File.uploadDirectory('local/reports', 'reports', requestOptions)
  const downloaded = await File.default.downloadDirectory('reports', 'copies/reports')
  const viaClient = await client.files.downloadDirectory('reports', 'copies/reports-client', { signal: AbortSignal.timeout(60000) })
  return uploaded.bytes + downloaded.bytes + viaClient.files.length
}
