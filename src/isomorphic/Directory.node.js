import fs from 'fs'
import path from 'path'

import { FilesError, InvalidParameterError } from '../Errors'

// The local half of File.uploadDirectory() and File.downloadDirectory(), Node.js only (package.json's browser field
// leaves it out of a browser bundle): reading a local folder before anything of it is uploaded, and making a
// downloaded folder's folders and files, each only where nothing is yet.

// How a folder's names are taken, the same on every platform: by their UTF-16 code units, as JavaScript compares
// strings.
const byName = (first, second) => {
  if (first === second) {
    return 0
  }

  return first < second ? -1 : 1
}

// Runs task(item) for each item in turn, each once the one before has settled; the first failure ends it.
const inTurn = (items, task) => items.reduce((previous, item) => previous.then(() => task(item)), Promise.resolve())

// What uploadDirectory() uploads from the local folder sourceDirectoryPath, all read before anything is sent: every
// folder within it, each before those inside it, the empty ones included, and every file, each by its path relative to
// the source, its segments joined by '/', its folder's names taken by byName. Only folders and regular files can be
// uploaded: a symbolic link, which is never followed, the source itself included, and any other kind of entry, such as
// a socket or a device, refuses the upload, naming it, before anything is sent. stopIfAborted() is called before the
// source is looked at, once it has been, before each folder and entry is read, and once each entry has been looked at,
// before what it is decides anything, so that an upload cancelled before or while its tree is read reads no further,
// failing with what it throws; an entry that could not be looked at fails it with that failure still.
export const planUpload = async (sourceDirectoryPath, stopIfAborted = () => {}) => {
  stopIfAborted()
  const sourceStats = await fs.promises.lstat(sourceDirectoryPath)
  stopIfAborted()

  if (!sourceStats.isDirectory()) {
    const kind = sourceStats.isSymbolicLink() ? 'a symbolic link' : 'not a folder'
    throw new InvalidParameterError(`Bad parameter: sourceDirectoryPath ${sourceDirectoryPath} is ${kind}, so it cannot be uploaded as a folder`)
  }

  const directories = []
  const files = []

  const visit = async (localFolder, segments) => {
    stopIfAborted()
    const names = (await fs.promises.readdir(localFolder)).sort(byName)

    await inTurn(names, async name => {
      stopIfAborted()
      const localPath = path.join(localFolder, name)
      const relative = [...segments, name]
      const stats = await fs.promises.lstat(localPath)
      stopIfAborted()

      if (stats.isDirectory()) {
        directories.push(relative.join('/'))
        await visit(localPath, relative)
      } else if (stats.isFile()) {
        files.push({ localPath, relativePath: relative.join('/') })
      } else {
        const kind = stats.isSymbolicLink() ? 'a symbolic link, which a folder upload does not follow' : 'neither a file nor a folder'
        throw new InvalidParameterError(`Bad parameter: ${relative.join('/')} in ${sourceDirectoryPath} is ${kind}, so the folder cannot be uploaded`)
      }
    })
  }

  await visit(sourceDirectoryPath, [])
  return { directories, files }
}

// Makes the local folder folderPath, which must not exist yet, in a folder that must: as Node.js's mkdir() without
// recursive, it fails with EEXIST when anything is there already, a symbolic link included, and ENOENT when its parent
// is missing.
export const makeFolder = folderPath => fs.promises.mkdir(folderPath)

// The names Windows gives a device, whatever extension, after any spaces, follows them.
const WINDOWS_DEVICE = /^(aux|con|conin\$|conout\$|nul|prn|com[0-9¹²³]|lpt[0-9¹²³]) *(\..*)?$/i

// Whether name, an entry's name as the API listed it, can be a local folder's entry as it is on platform: not empty,
// '.' or '..', and holding no slash, backslash or NUL, so that the entry cannot be written anywhere but in its own
// folder. On Windows, whose file systems give other names a meaning of their own, it must also hold none of <>:"|?*
// and no control character, a colon naming an NTFS alternate data stream of another file; must not end with a space
// or a dot, which Windows drops; and must not be a device's name (see WINDOWS_DEVICE). Elsewhere, those are names like
// any other.
const isSafeName = (name, platform) => {
  if (name === '' || name === '.' || name === '..' || /[/\\\0]/.test(name)) {
    return false
  }

  if (platform !== 'win32') {
    return true
  }

  const control = [...name].some(character => character.codePointAt(0) < 32)
  return !control && !/[<>:"|?*]/.test(name) && !/[ .]$/.test(name) && !WINDOWS_DEVICE.test(name)
}

// The local path of name within localFolder, a folder of a download under destinationRoot, refusing with a FilesError a
// name that could not be written there as it is on this platform (see isSafeName), before anything is opened for it,
// or would lead outside destinationRoot: a path relative to it that is its parent, or begins with its parent's
// segment, not a name such as '..report' that only begins with two dots.
export const localPathOf = (destinationRoot, localFolder, name) => {
  const localPath = path.join(localFolder, `${name}`)
  const relative = path.relative(destinationRoot, localPath)
  const outside = relative === '..' || relative.startsWith(`..${path.sep}`)

  if (!isSafeName(`${name}`, process.platform) || relative === '' || outside || path.isAbsolute(relative)) {
    throw new FilesError(`The API listed an entry named ${JSON.stringify(`${name}`)}, which cannot be downloaded as it is into ${destinationRoot}`)
  }

  return localPath
}

// Opens a new local file at filePath for a download to write, exclusively: as Node.js's open() with 'wx', it fails
// with EEXIST when anything is already there, a symbolic link included, and the descriptor it opens is the one the
// download writes to. Gives that file's write stream, which closes the descriptor once it is ended or destroyed, and
// closed, which resolves once it has, never rejecting: with null, or with { error }, error being the first the stream
// gave, such as a failure to close the file. Its listeners are added as the stream is made, before it is used, and
// stay until it has closed, so that no error of the stream is uncaught, whether or not anything was writing to it then.
export const openNewFile = async filePath => {
  const handle = await fs.promises.open(filePath, 'wx')
  const stream = handle.createWriteStream()
  let failure = null

  stream.on('error', error => {
    if (failure === null) {
      failure = { error }
    }
  })

  const closed = new Promise(resolve => { stream.once('close', () => resolve(failure)) })
  return { closed, stream }
}
