/* eslint-disable max-classes-per-file */
import { EventEmitter } from 'events'
import fs from 'fs'
import os from 'os'
import path from 'path'
import readline from 'readline'
import { Readable, Writable } from 'stream'
import util from 'util'

import * as errors from '../Errors'
import { abortReason } from '../Transfer'

// A client's Files.com filesystem (client.fs, see Filesystem.js), with Node.js's fs/promises conventions: open() gives
// a file handle with FileHandle's methods, results and lifecycle, opendir() a directory with Dir's, and readFile(),
// writeFile(), readdir() and stat() work as theirs do. Paths are Files.com paths, in the client's site and workspace,
// sent as given: never resolved against the local working directory, nor replaced by the paths the API returns.
//
// A file handle keeps a stage of the remote file on local disk: a file of its own in a directory of its own, both the
// handle's, which close() removes. Reads, positions, encodings, vectors and truncation are those of a local FileHandle
// of that stage, opened with the handle's flags, so that they behave exactly as Node.js's own; its descriptor is never
// exposed. The stage of an existing file is downloaded, by the SDK's download owner, when the handle first reads or
// writes it. Every change is published before it resolves: a write, a truncation or a writeFile() changes the stage,
// then uploads the whole stage to the remote path, by the SDK's upload owner, and resolves once that upload has
// completed. open('w') creates or empties the remote file before it resolves. Nothing is ever published at close(), and
// nothing remote is ever deleted, whatever becomes of an upload.
//
// The handle does one thing at a time, in the order asked. A change that fails, locally or remotely, can leave the
// stage and the remote file apart, so the handle fails: every later call rejects with that first failure, and close()
// too, once it has released the stage; only a write(), writev() or truncate() whose arguments Node.js refused, before
// touching the stage, leaves it as it was. close() waits for what was asked before it, refuses anything asked after it,
// and releases the stage however that ends. A signal given to a call stops all of its own work, a metadata request,
// download, local read or write and publication alike: a call that returns a promise rejects with the signal's reason,
// unchanged, and a read stream is destroyed with it, unchanged whenever it is truthy (see readStreamOf). A read stream
// destroyed in any way stops its own reads and download the same way, and nothing else the handle was asked.
//
// What the API has no primitive for is refused with the SDK's NotImplementedError, before anything is changed: file
// modes, owners and times, a physical sync, exclusive creation, atomic appending, synchronous I/O, descriptors, and
// paths given as URLs or as bytes that are not UTF-8.

const File = () => require('../models/File.js').default
const Folder = () => require('../models/Folder.js').default

const asyncDispose = Symbol.asyncDispose ?? Symbol.for('nodejs.asyncDispose')
const syncDispose = Symbol.dispose ?? Symbol.for('nodejs.dispose')

// The prefix of the directory each file handle's stage is in, in the operating system's temporary directory.
const STAGE_PREFIX = 'files-sdk-fs-'

// The errors with which Node.js refuses a call's arguments. Only for a call that checks them all before it touches its
// file, as write(), writev() and truncate() do, does such a failure show that nothing changed (see changed()).
const ARGUMENT_ERRORS = ['ERR_BUFFER_OUT_OF_BOUNDS', 'ERR_INVALID_ARG_TYPE', 'ERR_INVALID_ARG_VALUE', 'ERR_OUT_OF_RANGE']

// The API's error types for a path that is not there. Only these become ENOENT: any other failure, one of
// authentication or routing included, whatever its HTTP status, is the SDK's own error, as it is.
const NOT_FOUND_TYPES = ['not-found/file-not-found', 'not-found/folder-not-found']

// A value, as a message shows it.
const shown = value => (typeof value === 'string' ? `'${value}'` : String(value))

const isSignal = value => typeof value?.aborted === 'boolean' && typeof value.addEventListener === 'function'

const isOptions = value => value !== null && typeof value === 'object' && !Array.isArray(value)

const invalid = message => new errors.InvalidParameterError(`Bad parameter: ${message}`)

const nodeError = (code, message) => Object.assign(new Error(message), { code })

// The errno and description Node.js gives a system error code, such as ENOENT, on this platform.
const systemErrors = new Map()

const systemErrorOf = code => {
  if (!systemErrors.has(code)) {
    const found = [...util.getSystemErrorMap()].find(([, [name]]) => name === code)
    systemErrors.set(code, found ? { description: found[1][1], errno: found[0] } : { description: code, errno: undefined })
  }

  return systemErrors.get(code)
}

// An error as Node.js's own filesystem gives one: its code, errno, syscall and, when given, the path, in its message too.
// cause, when given, is the SDK's own error it stands for, unchanged, its numeric code included.
const fsError = (code, syscall, remotePath, cause) => {
  const { description, errno } = systemErrorOf(code)
  const where = remotePath === undefined ? '' : ` '${remotePath}'`
  const error = new Error(`${code}: ${description}, ${syscall}${where}`, cause === undefined ? undefined : { cause })
  error.errno = errno
  error.code = code
  error.syscall = syscall

  if (remotePath !== undefined) {
    error.path = remotePath
  }

  return error
}

// What a closed handle's methods reject with, as Node.js's FileHandle does.
const closedHandle = syscall => Object.assign(new Error('file closed'), { code: 'EBADF', syscall })

const dirClosed = () => nodeError('ERR_DIR_CLOSED', 'Directory handle was closed')

// Whether error is the SDK's error for a path the API says is not there, by the error type the API gave it.
const isNotFound = error => error instanceof errors.FilesError && NOT_FOUND_TYPES.includes(error.type)

// The error a call on remotePath fails with for error: ENOENT, caused by error, for a path the API says is not there;
// otherwise error itself.
const pathError = (error, syscall, remotePath) => (isNotFound(error) ? fsError('ENOENT', syscall, remotePath, error) : error)

// What a handle's method the API has no primitive for rejects with: the NotImplementedError of message, or, once the
// handle has begun to close, what any of its methods rejects with then.
const notSupported = (state, syscall, message) => Promise.reject(state.status === 'open'
  ? new errors.NotImplementedError(message)
  : closedHandle(syscall))

// A handle's fd, which a Files.com file does not have: reading it throws, whatever the handle's state.
const descriptorOf = state => {
  throw new errors.NotImplementedError(`A Files.com file handle has no file descriptor: ${state.remotePath} is not a file of this process`)
}

// A Files.com path as a method takes it: a string, as given, or bytes of UTF-8, as the string they encode. A URL, which
// could name a file on local disk, and bytes that are not UTF-8 are refused before anything is sent.
const utf8 = new globalThis.TextDecoder('utf-8', { fatal: true })

const remotePathOf = target => {
  let remotePath = target

  if (target instanceof URL) {
    throw new errors.NotImplementedError('A URL is not a Files.com path: give the path itself, as a string')
  }

  if (target instanceof Uint8Array) {
    try {
      remotePath = utf8.decode(target)
    } catch {
      throw new errors.NotImplementedError('A path of bytes that are not UTF-8 is not supported: Files.com paths are text')
    }
  }

  if (typeof remotePath !== 'string') {
    throw invalid(`path must be a string or a Buffer, received ${typeof target}`)
  }

  if (remotePath.includes('\u0000')) {
    throw invalid('path must not contain a null character')
  }

  return remotePath
}

// The flags Node.js accepts as strings, as it reads them. Of these, only r, r+, w and w+ open a Files.com path: the
// others need guarantees the API has no primitive for.
const FLAG_STRINGS = ['a', 'a+', 'as', 'as+', 'ax', 'ax+', 'r', 'r+', 'rs', 'rs+', 'sa', 'sa+', 'sr', 'sr+', 'w', 'w+',
  'wx', 'wx+', 'xa', 'xa+', 'xw', 'xw+']

const STRING_ACCESS = {
  r: {
    create: false, read: true, truncate: false, write: false,
  },
  'r+': {
    create: false, read: true, truncate: false, write: true,
  },
  w: {
    create: true, read: false, truncate: true, write: true,
  },
  'w+': {
    create: true, read: true, truncate: true, write: true,
  },
}

const APPEND = 'Appending is not supported: the API has no atomic append, so a write to the end could lose another writer\'s data'
const EXCLUSIVE = 'Exclusive creation is not supported: the API has no atomic create-if-absent'
const SYNCHRONOUS = 'Synchronous I/O is not supported: the SDK cannot confirm that a write has reached a physical device'

// How flags, a string or a number of fs.constants' O_ flags, open a Files.com path: { create, read, truncate, write },
// with stageFlags, how its stage is opened. Unsupported flags are refused before anything is sent.
const accessOf = (flags = 'r') => {
  let access

  if (flags === null || flags === undefined) {
    access = STRING_ACCESS.r
  } else if (typeof flags === 'string') {
    if (!FLAG_STRINGS.includes(flags)) {
      throw invalid(`flags ${shown(flags)} are not flags Node.js knows`)
    }

    if (flags.includes('a')) {
      throw new errors.NotImplementedError(APPEND)
    }

    if (flags.includes('x')) {
      throw new errors.NotImplementedError(EXCLUSIVE)
    }

    if (flags.includes('s')) {
      throw new errors.NotImplementedError(SYNCHRONOUS)
    }

    access = STRING_ACCESS[flags]
  } else if (Number.isSafeInteger(flags) && flags >= 0) {
    const {
      O_APPEND, O_CREAT, O_DSYNC, O_EXCL, O_RDWR, O_SYNC, O_TRUNC, O_WRONLY,
    } = fs.constants

    // The checks below see only the low 32 bits, as JavaScript's bitwise operators do: a number with bits above them,
    // which no O_ flag is, is refused first, so that those bits are never dropped and the rest taken for supported flags.
    if (flags > 0xFFFFFFFF) {
      throw new errors.NotImplementedError(`Open flags ${flags} include flags a Files.com path does not support`)
    }

    const has = flag => flag !== undefined && (flags & flag) !== 0 // eslint-disable-line no-bitwise

    if (has(O_APPEND)) {
      throw new errors.NotImplementedError(APPEND)
    }

    if (has(O_EXCL)) {
      throw new errors.NotImplementedError(EXCLUSIVE)
    }

    if (has(O_SYNC) || has(O_DSYNC)) {
      throw new errors.NotImplementedError(SYNCHRONOUS)
    }

    // eslint-disable-next-line no-bitwise
    if ((flags & ~(O_WRONLY | O_RDWR | O_CREAT | O_TRUNC)) !== 0) {
      throw new errors.NotImplementedError(`Open flags ${flags} include flags a Files.com path does not support`)
    }

    // eslint-disable-next-line no-bitwise
    const mode = flags & (O_WRONLY | O_RDWR)

    if (mode === (O_WRONLY | O_RDWR)) { // eslint-disable-line no-bitwise
      throw invalid(`flags ${flags} ask for both write-only and read-write access`)
    }

    access = {
      create: has(O_CREAT),
      read: mode !== O_WRONLY,
      truncate: has(O_TRUNC),
      write: mode !== 0,
    }

    if (access.truncate && !access.write) {
      throw new errors.NotImplementedError('Truncating a file opened only for reading is not supported')
    }
  } else {
    throw invalid(`flags must be a string or a number, received ${typeof flags}`)
  }

  const { O_RDONLY, O_RDWR, O_WRONLY } = fs.constants
  let stageFlags = O_RDONLY

  if (access.write) {
    stageFlags = access.read ? O_RDWR : O_WRONLY
  }

  return { ...access, stageFlags }
}

// The type of the entry whose metadata the API gave, 'file' or 'directory'. Any other fails rather than being guessed.
const entryTypeOf = (attributes, remotePath) => {
  const type = attributes?.type

  if (type !== 'file' && type !== 'directory') {
    throw new errors.FilesError(`The API gave ${shown(remotePath)} the type ${shown(type)}, which is neither a file nor a directory`)
  }

  return type
}

// Metadata of remotePath (GET /file_actions/metadata/{path}), as the client's File.find() gives it.
const metadataOf = async (client, remotePath, syscall) => {
  try {
    return (await File().find(remotePath, {}, { client })).attributes
  } catch (error) {
    throw pathError(error, syscall, remotePath)
  }
}

const dateOf = value => {
  const date = typeof value === 'string' && value !== '' ? new Date(value) : null
  return date && !Number.isNaN(date.getTime()) ? date : null
}

/**
 * The stats of a Files.com path, as Node.js's stat() gives a path's, with what the API reports and nothing else: its
 * type; its size; its modification time on the server, mtime; and its creation time, birthtime. With bigint, numbers are
 * bigints, with nanosecond times beside. The API has no device, inode, mode, link count, owner, block size or count, or
 * access and change times: those fields are absent, not made up. A file or a directory is all a Files.com path can be,
 * so the other type predicates are false.
 */
class RemoteStats {
  #type

  constructor(attributes, remotePath, bigint) {
    this.#type = entryTypeOf(attributes, remotePath)
    const number = value => (bigint ? BigInt(value) : value)

    if (Number.isSafeInteger(attributes.size) && attributes.size >= 0) {
      this.size = number(attributes.size)
    }

    const times = { birthtime: dateOf(attributes.created_at), mtime: dateOf(attributes.mtime) }

    Object.entries(times).filter(([, date]) => date !== null).forEach(([name, date]) => {
      this[`${name}Ms`] = number(date.getTime())

      if (bigint) {
        this[`${name}Ns`] = BigInt(date.getTime()) * BigInt(1000000)
      }

      this[name] = date
    })
  }

  isBlockDevice() { return this.#type === 'block-device' }

  isCharacterDevice() { return this.#type === 'character-device' }

  isDirectory() { return this.#type === 'directory' }

  isFIFO() { return this.#type === 'fifo' }

  isFile() { return this.#type === 'file' }

  isSocket() { return this.#type === 'socket' }

  isSymbolicLink() { return this.#type === 'symbolic-link' }
}

const statsOf = async (client, remotePath, syscall, options) => {
  if (options !== undefined && options !== null && !isOptions(options)) {
    throw invalid('options must be an object')
  }

  const attributes = await metadataOf(client, remotePath, syscall)
  return new RemoteStats(attributes, remotePath, options?.bigint === true)
}

// The relative path of each entry from the directory a recursive listing began in, for readdir().
const relativePaths = new WeakMap()

/**
 * An entry of a Files.com directory, as Node.js's Dirent gives one: its name, from the API's display_name, in the
 * directory's encoding, and parentPath, the path of the directory it is in, as the caller gave it, never the path the
 * API returns. A file or a directory is all a Files.com path can be, so the other type predicates are false.
 */
class RemoteDirent {
  #type

  constructor(name, parentPath, type) {
    this.name = name
    this.parentPath = parentPath
    this.#type = type
  }

  isBlockDevice() { return this.#type === 'block-device' }

  isCharacterDevice() { return this.#type === 'character-device' }

  isDirectory() { return this.#type === 'directory' }

  isFIFO() { return this.#type === 'fifo' }

  isFile() { return this.#type === 'file' }

  isSocket() { return this.#type === 'socket' }

  isSymbolicLink() { return this.#type === 'symbolic-link' }
}

// A path within base: name after base's own, with one slash between.
const joined = (base, name) => {
  if (name === '') {
    return base
  }

  if (base === '') {
    return name
  }

  return base.endsWith('/') ? `${base}${name}` : `${base}/${name}`
}

// The name of a listed entry: its display_name, or else the last segment of its path.
const nameOf = attributes => {
  const name = typeof attributes.display_name === 'string' && attributes.display_name !== ''
    ? attributes.display_name
    : `${attributes.path ?? ''}`.split('/').filter(segment => segment !== '').pop()

  if (!name) {
    throw new errors.FilesError('The API listed a directory entry without a name')
  }

  return name
}

// text in encoding: a Buffer for 'buffer', otherwise a string.
const encoded = (text, encoding) => {
  if (encoding === 'buffer') {
    return Buffer.from(text, 'utf8')
  }

  return encoding === 'utf8' ? text : Buffer.from(text, 'utf8').toString(encoding)
}

const encodingOf = encoding => {
  if (encoding === undefined || encoding === null || encoding === 'utf8' || encoding === 'utf-8') {
    return 'utf8'
  }

  if (encoding !== 'buffer' && (typeof encoding !== 'string' || !Buffer.isEncoding(encoding))) {
    throw invalid(`encoding ${shown(encoding)} is not an encoding Node.js knows`)
  }

  return encoding
}

const checkCallback = callback => {
  if (typeof callback !== 'function') {
    throw invalid('callback must be a function')
  }
}

// Runs work once everything the directory was asked before has settled, counting it as busy meanwhile.
const serially = (state, work) => {
  state.busy += 1
  const result = state.tail.then(work)
  state.tail = result.then(() => {}, () => {})
  result.then(() => { state.busy -= 1 }, () => { state.busy -= 1 })
  return result
}

// The next entry of a directory, or null once there are none: from the page its listing holds, or, once that is used
// up, from the next page, which the lazy Folder iterator requests only then (see Api._iterate). A recursive listing then
// lists the directories it found, one after another, each with its own iterator.
const nextEntry = async state => {
  for (;;) {
    if (!state.current) {
      const level = state.levels.shift()

      if (!level) {
        return null
      }

      state.current = {
        ...level,
        iterator: Folder().listForIterator(level.remotePath, state.perPage ? { per_page: state.perPage } : {}, { client: state.client }),
      }
    }

    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await state.current.iterator.next()

    if (!done) {
      const level = state.current
      const attributes = value?.attributes ?? {}
      const type = entryTypeOf(attributes, attributes.path ?? level.remotePath)
      const name = nameOf(attributes)
      const relative = joined(level.relative, name)

      if (state.recursive && type === 'directory') {
        state.levels.push({ relative, remotePath: joined(level.remotePath, name) })
      }

      const entry = new RemoteDirent(encoded(name, state.encoding), joined(state.path, level.relative), type)
      relativePaths.set(entry, relative)
      return entry
    }

    state.current = null
  }
}

/**
 * A Files.com directory, as Node.js's Dir gives one: read() its entries one at a time, by promise or callback, null once
 * there are none, or iterate it with for await, which closes it however the loop ends. The entries come from the
 * client's lazy Folder listing (GET /folders/{path}), which holds one page at a time and requests the next only once the
 * page before has been read; reads and close() run one at a time, in the order asked. close() waits for a read under
 * way, then requests nothing more. A closed directory's read() and close() fail with ERR_DIR_CLOSED.
 */
class RemoteDir {
  #state

  constructor(state) {
    this.#state = state
  }

  get path() {
    return this.#state.path
  }

  read(callback) {
    const state = this.#state

    if (callback === undefined) {
      return state.status === 'open' ? serially(state, () => nextEntry(state)) : Promise.reject(dirClosed())
    }

    checkCallback(callback)

    if (state.status !== 'open') {
      throw dirClosed()
    }

    serially(state, () => nextEntry(state)).then(
      entry => process.nextTick(callback, null, entry),
      error => process.nextTick(callback, error),
    )

    return undefined
  }

  // Reading a Files.com directory takes network requests, which cannot be made synchronously.
  readSync() {
    if (this.#state.status !== 'open') {
      throw dirClosed()
    }

    throw new errors.NotImplementedError('readSync() is not supported: reading a Files.com directory takes network requests, which cannot be made synchronously')
  }

  close(callback) {
    const state = this.#state

    if (callback !== undefined) {
      checkCallback(callback)
    }

    if (state.status !== 'open') {
      if (callback === undefined) {
        return Promise.reject(dirClosed())
      }

      process.nextTick(callback, dirClosed())
      return undefined
    }

    state.status = 'closing'

    const closing = serially(state, async () => {
      const { current } = state
      state.current = null
      state.levels = []
      state.status = 'closed'
      await current?.iterator.return()
    })

    if (callback === undefined) {
      return closing
    }

    closing.then(() => process.nextTick(callback, null), error => process.nextTick(callback, error))
    return undefined
  }

  // Closes the directory at once, which it can only while nothing it was asked is under way.
  closeSync() {
    const state = this.#state

    if (state.status !== 'open') {
      throw dirClosed()
    }

    if (state.busy > 0) {
      throw nodeError('ERR_DIR_CONCURRENT_OPERATION', 'Cannot do synchronous work on directory handle with concurrent asynchronous operations')
    }

    const { current } = state
    state.current = null
    state.levels = []
    state.status = 'closed'
    current?.iterator.return().catch(() => {})
  }

  async* [Symbol.asyncIterator]() {
    try {
      for (;;) {
        // eslint-disable-next-line no-await-in-loop
        const entry = await this.read()

        if (entry === null) {
          break
        }

        yield entry
      }
    } finally {
      await this.close()
    }
  }

  [asyncDispose]() {
    return this.#state.status === 'open' ? this.close() : Promise.resolve()
  }

  [syncDispose]() {
    if (this.#state.status === 'open') {
      this.closeSync()
    }
  }
}

// The options of opendir(): { encoding, bufferSize, recursive }. bufferSize, when given, is how many entries each page
// of the listing has (per_page); without it, the API's own page size.
const dirOptionsOf = options => {
  if (options !== undefined && options !== null && !isOptions(options)) {
    throw invalid('options must be an object')
  }

  const { bufferSize, encoding, recursive = false } = options ?? {}

  if (bufferSize !== undefined && bufferSize !== null && (!Number.isSafeInteger(bufferSize) || bufferSize < 1 || bufferSize > 4294967295)) {
    throw invalid('bufferSize must be a whole number from 1 to 4294967295')
  }

  if (typeof recursive !== 'boolean') {
    throw invalid('recursive must be a boolean')
  }

  return { bufferSize: bufferSize ?? null, encoding: encodingOf(encoding), recursive }
}

const openDir = async (client, target, options) => {
  const remotePath = remotePathOf(target)
  const { bufferSize, encoding, recursive } = dirOptionsOf(options)

  if (entryTypeOf(await metadataOf(client, remotePath, 'opendir'), remotePath) !== 'directory') {
    throw fsError('ENOTDIR', 'opendir', remotePath)
  }

  return new RemoteDir({
    busy: 0,
    client,
    current: null,
    encoding,
    levels: [{ relative: '', remotePath }],
    path: remotePath,
    perPage: bufferSize,
    recursive,
    status: 'open',
    tail: Promise.resolve(),
  })
}

const readDirectory = async (client, target, options) => {
  const given = typeof options === 'string' ? { encoding: options } : options

  if (given !== undefined && given !== null && !isOptions(given)) {
    throw invalid('options must be an object or an encoding')
  }

  const { encoding, recursive = false, withFileTypes = false } = given ?? {}
  const dir = await openDir(client, target, { encoding, recursive })
  const entries = []

  try {
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      const entry = await dir.read()

      if (entry === null) {
        break
      }

      entries.push(withFileTypes ? entry : encoded(relativePaths.get(entry), encodingOf(encoding)))
    }
  } finally {
    await dir.close()
  }

  return entries
}

// The stage's directory is removed when its handle is collected unclosed, as a safety net: close() removes it otherwise.
// A handle cannot be collected while anything it was asked is still to run or under way: its state, which every such
// operation holds, holds the handle too (see RemoteFileHandle), so the directory is never removed beneath one.
const abandoned = typeof globalThis.FinalizationRegistry === 'function'
  ? new globalThis.FinalizationRegistry(directory => {
    try {
      fs.rmSync(directory, { force: true, recursive: true })
    } catch {
      // Nothing more can be done for it.
    }
  })
  : null

// Closes the stage, if it is open, and removes its directory, failing with the first failure of either.
const releaseStage = async state => {
  let failure = null

  if (state.stage) {
    try {
      await state.stage.close()
    } catch (error) {
      failure = { error }
    }

    state.stage = null
  }

  try {
    await fs.promises.rm(state.directory, { force: true, recursive: true })
  } catch (error) {
    failure = failure ?? { error }
  }

  abandoned?.unregister(state)

  if (failure) {
    throw failure.error
  }
}

// Uploads the whole stage to the remote path, as File.uploadFile() does, with the handle's client.
const publish = async (state, signal) => {
  await File().uploadFile(state.remotePath, state.stagePath, {}, signal ? { client: state.client, signal } : { client: state.client })
}

// The stage, open with the handle's flags; downloaded first, as File.downloadToFile() does, when the handle has not
// read or written its file yet. A download that fails leaves no stage, and the next call downloads it again. The
// download is the bound File's own: a File of the handle's path, with its client and the call's signal, whose
// download() (GET /files/{path}) gives the download_uri, and so a File that keeps those same options. The path's
// metadata, known since the handle was opened, is not asked for again.
const staged = async (state, syscall, signal) => {
  if (state.stage) {
    return state.stage
  }

  const options = signal ? { client: state.client, signal } : { client: state.client }
  const RemoteFile = File()
  let file

  try {
    file = await new RemoteFile({ path: state.remotePath }, options).download({})
  } catch (error) {
    throw pathError(error, syscall, state.remotePath)
  }

  try {
    await file.downloadToFile(state.stagePath, signal ? { signal } : undefined)
    state.stage = await fs.promises.open(state.stagePath, state.access.stageFlags)
  } catch (error) {
    await fs.promises.rm(state.stagePath, { force: true }).catch(() => {})
    throw error
  }

  return state.stage
}

// Runs work once everything the handle was asked before has settled, unless it has closed or failed.
const inTurn = (state, syscall, work) => {
  if (state.status !== 'open') {
    return Promise.reject(closedHandle(syscall))
  }

  const result = state.tail.then(() => {
    if (state.failure) {
      throw state.failure.error
    }

    return work()
  })

  state.tail = result.then(() => {}, () => {})
  return result
}

// Whether error is what Node.js's own readFile() or writeFile() of the stage rejects with once signal has stopped it:
// an AbortError whose cause is the signal's reason. A call of the SDK's rejects with that reason itself instead.
const isLocalAbort = (error, signal) => signal?.aborted === true
  && error?.name === 'AbortError'
  && Object.is(error.cause, signal.reason)

// What a local operation of the stage that failed with error, given signal, rejects with: the signal's reason, unchanged,
// whatever it is, null and 0 included, when signal stopped it, or else error itself, any earlier failure included.
const failureOf = (error, signal) => (isLocalAbort(error, signal) ? abortReason(signal) : error)

// A read of the stage, in turn, with signal, when given, for the stage's download and its local read. A signal aborted
// already reads nothing.
const observe = (state, syscall, read, signal) => inTurn(state, syscall, async () => {
  if (signal?.aborted) {
    throw abortReason(signal)
  }

  const stage = await staged(state, syscall, signal)

  try {
    return await read(stage)
  } catch (error) {
    throw failureOf(error, signal)
  }
})

// A change of the stage, in turn, published before it resolves with change's own result, with signal, when given, for
// the stage's download, its change and its publication. A handle not opened for writing refuses it, as Node.js does,
// and a signal aborted already stops it, before anything changes.
//
// validated says whether Node.js checks every argument of the change before it touches the stage, as it does for
// write(), writev() and truncate(), whose one write or truncation comes after: their argument errors changed nothing,
// and leave the handle as it was. Any other failure of a change may follow part of it, such as writeFile()'s of an
// iterable whose later chunk is invalid once earlier ones have been written: it fails the handle, as a publication that
// fails does, so that no later change ever publishes what it left in the stage.
const changed = (state, syscall, change, { signal, validated = false } = {}) => inTurn(state, syscall, async () => {
  if (!state.access.write) {
    throw fsError('EBADF', syscall)
  }

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  const stage = await staged(state, syscall, signal)

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  let result

  try {
    result = await change(stage)
  } catch (error) {
    const failure = failureOf(error, signal)

    if (!(validated && ARGUMENT_ERRORS.includes(error?.code))) {
      state.failure = { error: failure }
    }

    throw failure
  }

  try {
    await publish(state, signal)
  } catch (error) {
    state.failure = { error }
    throw error
  }

  return result
})

const signalOf = options => (isOptions(options) && isSignal(options.signal) ? options.signal : undefined)

// Settles a stream's destruction with error once closing, the handle's close() when the stream closes it, has settled.
const settled = (closing, error, callback) => {
  if (!closing) {
    callback(error)
    return
  }

  closing.then(() => callback(error), closeError => callback(error ?? closeError))
}

const positionOption = (name, value) => {
  if (value !== undefined && (!Number.isSafeInteger(value) || value < 0)) {
    throw invalid(`${name} must be a whole number of 0 or more`)
  }

  return value
}

// What a read stream stopped by its signal fails with, for the signal's reason: the reason itself whenever it is truthy,
// an Error, with its own identity, or any other value, as the SDK's other streams fail (see nodeStreamError in Api.js);
// or, for a falsy reason (null, false, 0, NaN, ''), with which a Node.js stream cannot fail, an Error named AbortError,
// with code ABORT_ERR and the reason as its cause, as Node.js's own addAbortSignal() fails a stream.
const streamFailureOf = reason => reason || Object.assign(new Error('The operation was aborted', { cause: reason }), {
  code: 'ABORT_ERR',
  name: 'AbortError',
})

// A read stream of handle, as FileHandle's createReadStream() gives one: from start, when given, to end, inclusive,
// leaving the handle's position as it was; or else from the handle's position, moving it.
//
// The stream's own work, its reads of the stage, in turn with the handle's other calls, and the stage's download one of
// them may make, stops with the stream: when its signal, if given, aborts, which destroys the stream with the reason
// (see streamFailureOf), and when it is destroyed in any other way, by its reader's destroy(error) included. Nothing else
// the handle was asked is stopped: a read still waiting its turn behind them stops when its turn comes, before it
// downloads or reads anything. The stream's destruction settles only once that work has: with autoClose, the
// default, it then closes the handle, which waits for the handle's other calls as ever; without it, the handle stays
// usable, a stopped download leaving no stage, for the next call to download again. The stream fails with the first
// failure it had, and lets go of its signal as it settles.
const readStreamOf = (handle, state, options) => {
  const given = typeof options === 'string' ? { encoding: options } : options ?? {}
  const {
    autoClose = true, emitClose = true, encoding, highWaterMark = 64 * 1024, signal,
  } = given

  const start = positionOption('start', given.start)
  const end = given.end === undefined || given.end === Infinity ? Infinity : positionOption('end', given.end)

  if (start !== undefined && start > end) {
    throw invalid('start must not be after end')
  }

  if (signal !== undefined && signal !== null && !isSignal(signal)) {
    throw invalid('signal must be an AbortSignal')
  }

  let position = start === undefined ? null : start
  let pending = null
  let onAbort = null
  const owned = new AbortController()

  const stream = new Readable({
    destroy: (error, callback) => {
      signal?.removeEventListener('abort', onAbort)

      if (!owned.signal.aborted) {
        owned.abort(error ?? new Error('The read stream was destroyed'))
      }

      const joined = pending ? pending.then(() => {}, () => {}) : Promise.resolve()
      joined.then(() => settled(autoClose ? handle.close() : null, error, callback))
    },
    emitClose,
    encoding,
    highWaterMark,
    read: size => {
      const length = Math.min(size, position === null ? end - stream.bytesRead + 1 : end - position + 1)

      if (length <= 0) {
        stream.push(null)
        return
      }

      const buffer = Buffer.allocUnsafe(length)
      const reading = observe(state, 'read', stage => stage.read(buffer, 0, length, position), owned.signal)
      pending = reading

      reading.then(({ bytesRead }) => {
        pending = null

        if (position !== null) {
          position += bytesRead
        }

        stream.bytesRead += bytesRead
        stream.push(bytesRead > 0 ? buffer.subarray(0, bytesRead) : null)
      }, error => {
        pending = null
        stream.destroy(error)
      })
    },
  })

  stream.bytesRead = 0

  if (signal) {
    onAbort = () => stream.destroy(streamFailureOf(abortReason(signal)))

    if (signal.aborted) {
      onAbort()
    } else {
      signal.addEventListener('abort', onAbort, { once: true })
    }
  }

  return stream
}

// The views of buffers after their first count bytes, which a write has written already.
const after = (buffers, count) => {
  const rest = []
  let skip = count

  buffers.forEach(buffer => {
    if (skip >= buffer.length) {
      skip -= buffer.length
    } else {
      rest.push(skip > 0 ? buffer.subarray(skip) : buffer)
      skip = 0
    }
  })

  return rest
}

// A write stream of handle, as FileHandle's createWriteStream() gives one: at start, when given, or else at the handle's
// position. Each batch of chunks is written with writev(), each one published before it resolves, until every byte of
// the batch has been written, before the batch's callback: a writev() that writes only part of what it was given, as
// Node.js's may, is followed by one of the rest, and one that writes nothing of it fails the stream, as does one that
// fails, with its own error. So 'finish' comes only once every chunk has been written and published.
const writeStreamOf = (handle, options) => {
  const given = typeof options === 'string' ? { encoding: options } : options ?? {}
  const {
    autoClose = true, emitClose = true, encoding = 'utf8', flush = false, highWaterMark,
  } = given

  const start = positionOption('start', given.start)

  if (flush === true) {
    throw new errors.NotImplementedError('flush is not supported: the SDK cannot confirm that a write has reached a physical device')
  }

  let position = start === undefined ? null : start
  let stream = null

  const writeAll = async buffers => {
    let rest = buffers
    let left = rest.reduce((total, buffer) => total + buffer.length, 0)

    while (left > 0) {
      // eslint-disable-next-line no-await-in-loop
      const { bytesWritten } = await handle.writev(rest, position)

      if (!(bytesWritten > 0)) {
        throw new errors.FilesError(`A write of the stream wrote nothing of the ${left} bytes it had left to write`)
      }

      if (position !== null) {
        position += bytesWritten
      }

      stream.bytesWritten += bytesWritten
      left -= bytesWritten
      rest = after(rest, bytesWritten)
    }
  }

  stream = new Writable({
    decodeStrings: true,
    defaultEncoding: encoding,
    destroy: (error, callback) => settled(autoClose ? handle.close() : null, error, callback),
    emitClose,
    highWaterMark,
    writev: (chunks, callback) => {
      writeAll(chunks.map(({ chunk }) => chunk)).then(() => callback(), callback)
    },
  })

  stream.bytesWritten = 0
  return stream
}

// A WHATWG byte stream of handle's file from its position, as FileHandle's readableWebStream() gives one. The handle is
// locked while it is read.
const webStreamOf = (handle, state, options) => {
  if (state.status !== 'open') {
    throw nodeError('ERR_INVALID_STATE', `Invalid state: The FileHandle is ${state.status}`)
  }

  if (state.locked) {
    throw nodeError('ERR_INVALID_STATE', 'Invalid state: The FileHandle is locked')
  }

  if (options !== undefined && options !== null && options.type !== undefined && options.type !== 'bytes') {
    throw invalid('type must be \'bytes\'')
  }

  state.locked = true
  const unlock = () => { state.locked = false }

  return new globalThis.ReadableStream({
    autoAllocateChunkSize: 16384,
    cancel: unlock,
    pull: async controller => {
      const { view } = controller.byobRequest
      let bytesRead

      try {
        ({ bytesRead } = await handle.read(view, 0, view.byteLength, null))
      } catch (error) {
        unlock()
        throw error
      }

      if (bytesRead === 0) {
        unlock()
        controller.close()
      }

      controller.byobRequest.respond(bytesRead)
    },
    type: 'bytes',
  })
}

/**
 * A Files.com file open for reading, writing or both, as Node.js's FileHandle gives a file, by `client.fs.open()`. See
 * the module's comment for how it reads, publishes and closes, and Files.RemoteFileHandle for each method.
 */
class RemoteFileHandle extends EventEmitter {
  #state

  constructor(state) {
    super()
    this.#state = state

    // The operations admitted in turn hold only the state: through it, they hold the handle as well, so that the
    // handle, whose collection removes the stage's directory, outlives every one of them, queued or under way.
    state.handle = this
    abandoned?.register(this, state.directory, state)
  }

  // A Files.com file has no descriptor of this process: the stage's own is the SDK's, and never exposed.
  get fd() {
    return descriptorOf(this.#state)
  }

  appendFile(data, options) {
    return this.writeFile(data, options)
  }

  chmod() {
    return notSupported(this.#state, 'fchmod', 'chmod() is not supported: Files.com paths have no file modes')
  }

  chown() {
    return notSupported(this.#state, 'fchown', 'chown() is not supported: Files.com paths have no owners')
  }

  // Closes the handle once everything asked before has settled: closes and removes the stage, and emits 'close'.
  // Resolves at once when it has closed already. Rejects with the handle's first failure, or else the stage's.
  close() {
    const state = this.#state

    if (state.status === 'closed') {
      return Promise.resolve()
    }

    if (state.closing) {
      return state.closing
    }

    state.status = 'closing'
    state.closing = state.tail.then(async () => {
      let { failure } = state

      try {
        await releaseStage(state)
      } catch (error) {
        failure = failure ?? { error }
      }

      state.status = 'closed'
      this.emit('close')

      if (failure) {
        throw failure.error
      }
    })

    return state.closing
  }

  createReadStream(options) {
    return readStreamOf(this, this.#state, options)
  }

  createWriteStream(options) {
    return writeStreamOf(this, options)
  }

  datasync() {
    return notSupported(this.#state, 'fdatasync', 'datasync() is not supported: the SDK cannot confirm that a write has reached a physical device')
  }

  read(...args) {
    return observe(this.#state, 'read', stage => stage.read(...args))
  }

  readableWebStream(options) {
    return webStreamOf(this, this.#state, options)
  }

  readFile(options) {
    return observe(this.#state, 'read', stage => stage.readFile(options), signalOf(options))
  }

  readLines(options) {
    return readline.createInterface({ crlfDelay: Infinity, input: this.createReadStream(options) })
  }

  readv(buffers, position) {
    return observe(this.#state, 'read', stage => stage.readv(buffers, position))
  }

  // The remote file's stats (see RemoteStats), as the API has them now: every change before has been published.
  stat(options) {
    const state = this.#state
    return inTurn(state, 'fstat', () => statsOf(state.client, state.remotePath, 'fstat', options))
  }

  sync() {
    return notSupported(this.#state, 'fsync', 'sync() is not supported: the SDK cannot confirm that a write has reached a physical device')
  }

  truncate(len) {
    return changed(this.#state, 'ftruncate', stage => stage.truncate(len), { validated: true })
  }

  utimes() {
    return notSupported(this.#state, 'futime', 'utimes() is not supported: the API keeps its own modification time, and no access time')
  }

  write(...args) {
    return changed(this.#state, 'write', stage => stage.write(...args), { validated: true })
  }

  writeFile(data, options) {
    const signal = signalOf(options)
    return changed(this.#state, 'write', stage => stage.writeFile(data, options), { signal })
  }

  // As Node.js's: it may write fewer bytes than it was given, which bytesWritten says, and publishes what it wrote.
  writev(buffers, position) {
    return changed(this.#state, 'write', stage => stage.writev(buffers, position), { validated: true })
  }

  [asyncDispose]() {
    return this.close()
  }
}

// Opens remotePath with flags (see accessOf), checking its metadata first: a path that is not there fails with ENOENT
// unless the flags create it, and a directory with EISDIR. A path the flags create or truncate is published empty before
// the handle is given, unless publishOnOpen is false, for a writeFile() that publishes its whole data at once. A mode is
// refused for flags that create the file, and ignored otherwise, as Node.js ignores it. signal, a whole-file call's own,
// stops the metadata request and the publication, which then reject with its reason, unchanged, the stage released.
const openHandle = async (client, target, flags, mode, publishOnOpen, signal) => {
  const remotePath = remotePathOf(target)
  const access = accessOf(flags)

  if (access.create && mode !== undefined && mode !== null) {
    throw new errors.NotImplementedError('A file mode is not supported: Files.com paths have no file modes')
  }

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  let existing = null

  try {
    existing = (await File().find(remotePath, {}, signal ? { client, signal } : { client })).attributes
  } catch (error) {
    if (!access.create || !isNotFound(error)) {
      throw pathError(error, 'open', remotePath)
    }
  }

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  if (existing && entryTypeOf(existing, remotePath) === 'directory') {
    throw fsError('EISDIR', 'open', remotePath)
  }

  const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), STAGE_PREFIX))
  const state = {
    access,
    client,
    closing: null,
    directory,
    failure: null,
    locked: false,
    remotePath,
    stage: null,
    stagePath: path.join(directory, 'stage'),
    status: 'open',
    tail: Promise.resolve(),
  }

  try {
    if (!existing || access.truncate) {
      await fs.promises.writeFile(state.stagePath, '', { mode: 0o600 })
      state.stage = await fs.promises.open(state.stagePath, access.stageFlags)

      if (publishOnOpen) {
        try {
          await publish(state, signal)
        } catch (error) {
          throw pathError(error, 'open', remotePath)
        }
      }
    }
  } catch (error) {
    await releaseStage(state).catch(() => {})
    throw error
  }

  return new RemoteFileHandle(state)
}

const readFileOptionsOf = options => {
  const given = typeof options === 'string' ? { encoding: options } : options

  if (given !== undefined && given !== null && !isOptions(given)) {
    throw invalid('options must be an object or an encoding')
  }

  const { encoding = null, flag = 'r', signal } = given ?? {}

  if (encoding !== null) {
    encodingOf(encoding)
  }

  if (signal !== undefined && !isSignal(signal)) {
    throw invalid('signal must be an AbortSignal')
  }

  return { encoding, flag, signal }
}

// readFile(): through the handle given, or else a handle of the path opened with the flag, with signal for its whole
// operation, and closed once read. A read that fails rejects with its own failure, even when closing then fails too,
// which is still awaited; a close that fails after a read that did not rejects with the close's failure.
const readWhole = async (client, target, options) => {
  const { encoding, flag, signal } = readFileOptionsOf(options)

  if (target instanceof RemoteFileHandle) {
    return target.readFile({ encoding, signal })
  }

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  const handle = await openHandle(client, target, flag, undefined, true, signal)
  let contents

  try {
    contents = await handle.readFile({ encoding, signal })
  } catch (error) {
    await handle.close().catch(() => {})
    throw error
  }

  await handle.close()
  return contents
}

const writeFileOptionsOf = (options, defaultFlag) => {
  const given = typeof options === 'string' ? { encoding: options } : options

  if (given !== undefined && given !== null && !isOptions(given)) {
    throw invalid('options must be an object or an encoding')
  }

  const {
    encoding = 'utf8', flag = defaultFlag, flush = false, mode, signal,
  } = given ?? {}

  if (signal !== undefined && !isSignal(signal)) {
    throw invalid('signal must be an AbortSignal')
  }

  return {
    encoding, flag, flush, mode, signal,
  }
}

// writeFile(), and appendFile() with defaultFlag 'a': through the handle given, or else a handle of the path opened
// with the flag, with signal for its whole operation, its metadata request and publications included. appendFile()'s
// default 'a' is refused, as every append flag is; a flag that does not append, given explicitly, works as it does for
// writeFile(). A flag that creates and truncates, such as w, publishes the whole data in one upload, so that the remote
// file is replaced once, and left as it was when the data cannot be written.
const writeWhole = async (client, target, data, options, defaultFlag) => {
  const {
    encoding, flag, flush, mode, signal,
  } = writeFileOptionsOf(options, defaultFlag)

  if (flush === true) {
    throw new errors.NotImplementedError('flush is not supported: the SDK cannot confirm that a write has reached a physical device')
  }

  if (target instanceof RemoteFileHandle) {
    return target.writeFile(data, { encoding, signal })
  }

  const access = accessOf(flag)

  if (signal?.aborted) {
    throw abortReason(signal)
  }

  const handle = await openHandle(client, target, flag, mode, !(access.create && access.truncate), signal)

  try {
    await handle.writeFile(data, { encoding, signal })
  } catch (error) {
    await handle.close().catch(() => {})
    throw error
  }

  return handle.close()
}

const statPath = async (client, target, options) => statsOf(client, remotePathOf(target), 'stat', options)

/**
 * The Files.com filesystem of a client, as `client.fs` gives it (see Files.Filesystem): Node.js's fs/promises
 * conventions over the client's Files.com paths.
 */
class RemoteFilesystem {
  #client

  constructor(client) {
    this.#client = client
  }

  appendFile(file, data, options) {
    return writeWhole(this.#client, file, data, options, 'a')
  }

  open(file, flags, mode) {
    return openHandle(this.#client, file, flags, mode, true)
  }

  opendir(dirPath, options) {
    return openDir(this.#client, dirPath, options)
  }

  readdir(dirPath, options) {
    return readDirectory(this.#client, dirPath, options)
  }

  readFile(file, options) {
    return readWhole(this.#client, file, options)
  }

  stat(file, options) {
    return statPath(this.#client, file, options)
  }

  writeFile(file, data, options) {
    return writeWhole(this.#client, file, data, options, 'w')
  }
}

export {
  RemoteDir,
  RemoteDirent,
  RemoteFileHandle,
  RemoteFilesystem,
  RemoteStats,
}
