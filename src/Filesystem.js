import * as errors from './Errors'
import { isBrowser } from './utils'

// A client's Files.com filesystem, client.fs (see FilesClient.js): Node.js's fs/promises conventions over the paths of
// the client's Files.com site and workspace, with file handles that read and write the remote file and directories that
// list it (see isomorphic/Filesystem.node.js). Node.js only: in a browser, which leaves that module out of its bundle,
// every method rejects with a NotImplementedError, before anything is sent.

const METHODS = ['appendFile', 'open', 'opendir', 'readdir', 'readFile', 'stat', 'writeFile']

const unavailable = () => Object.freeze(Object.fromEntries(METHODS.map(name => [name, async () => {
  throw new errors.NotImplementedError(`client.fs.${name}() is only available in a NodeJS environment`)
}])))

const filesystemOf = client => {
  if (isBrowser()) {
    return unavailable()
  }

  const { RemoteFilesystem } = require('./isomorphic/Filesystem.node.js')
  return new RemoteFilesystem(client)
}

export default filesystemOf
