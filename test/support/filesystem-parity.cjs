'use strict'

// The cases of the native reference, each one consumer that runs unchanged against Node.js's own fs/promises, on a
// local directory, and against client.fs, on Files.com: the first six as native-filesystem-reference-r1 recorded them,
// Node.js 22 and 24 alike, and a seventh, of a path with Unicode, a space and a literal percent sign. The unit tests
// (test/Filesystem.test.js) run each against Node.js's own files; the filesystem parity case
// (test/scenarios/filesystem-parity.cjs) runs each against both, client.fs on the Files.com Mock API Server. A side is
// { fsys, at(name), seed(name, content), mkdir(name), bytesOf(name) }; seed, mkdir and bytesOf may return a promise, as
// those of a side whose files are on a server do, and each consumer awaits them.
const { types } = require('util')

const errorOf = async action => {
  try {
    await action()
    return null
  } catch (error) {
    return error
  }
}

const positionAndUtf8 = async side => {
  await side.seed('positions.bin', 'abcdef')
  const handle = await side.fsys.open(side.at('positions.bin'), 'r+')
  const first = Buffer.alloc(2)
  const explicit = Buffer.alloc(2)
  const next = Buffer.alloc(2)
  const a = await handle.read(first, 0, 2, null)
  const b = await handle.read(explicit, 0, 2, 4)
  const c = await handle.read(next, 0, 2, null)
  const write = await handle.write('é', 8, 'utf8')
  const remaining = await handle.readFile()
  await handle.close()

  return {
    bufferIdentity: a.buffer === first && b.buffer === explicit && c.buffer === next,
    bytesWritten: write.bytesWritten,
    counts: [a.bytesRead, b.bytesRead, c.bytesRead],
    explicit: explicit.toString(),
    first: first.toString(),
    next: next.toString(),
    remainingHex: remaining.toString('hex'),
    returnedString: write.buffer,
    wholeHex: (await side.bytesOf('positions.bin')).toString('hex'),
  }
}

const closedRead = async side => {
  await side.seed('closed.bin', 'abcdef')
  const handle = await side.fsys.open(side.at('closed.bin'), 'r+')
  await handle.close()

  return {
    error: (await errorOf(() => handle.read(Buffer.alloc(1), 0, 1, 0)))?.code,
    repeatedCloseError: await errorOf(() => handle.close()),
  }
}

const truncateAndVectors = async side => {
  await side.seed('truncate.bin', 'old content')
  const handle = await side.fsys.open(side.at('truncate.bin'), 'w+')
  const sizeAtOpen = (await side.bytesOf('truncate.bin')).length
  const vector = [Buffer.from('ab'), Buffer.from('cd')]
  const written = await handle.writev(vector)
  await handle.truncate(6)
  const readBuffers = [Buffer.alloc(3), Buffer.alloc(3)]
  const read = await handle.readv(readBuffers, 0)
  const tail = await handle.readFile()
  const stat = await handle.stat()
  await handle.close()

  return {
    cursorReadHex: tail.toString('hex'),
    read: read.bytesRead,
    readVectorIdentity: read.buffers === readBuffers,
    sizeAtOpen,
    // Node.js's own Date brand check: native fs's Date comes from Node.js's realm, not the test environment's, so
    // instanceof Date is false for it under Jest (native-date-realm-proof-r1), though it is a Date.
    stat: { isDirectory: stat.isDirectory(), isFile: stat.isFile(), mtimeIsDate: types.isDate(stat.mtime), size: stat.size },
    vectorHex: Buffer.concat(readBuffers).toString('hex'),
    wholeHex: (await side.bytesOf('truncate.bin')).toString('hex'),
    writeVectorIdentity: written.buffers === vector,
    written: written.bytesWritten,
  }
}

const directoryReadAndClose = async side => {
  await side.mkdir('directory')
  await side.seed('directory/file.txt', 'file')
  await side.mkdir('directory/folder')

  const dir = await side.fsys.opendir(side.at('directory'), { bufferSize: 1 })
  const entry1 = await dir.read()
  const entry2 = await new Promise((resolve, reject) => {
    dir.read((error, entry) => (error ? reject(error) : resolve(entry)))
  })

  const eof = await dir.read()
  await new Promise((resolve, reject) => {
    dir.close(error => (error ? reject(error) : resolve()))
  })

  const entries = [entry1, entry2].map(entry => ({
    isDirectory: entry.isDirectory(),
    isFile: entry.isFile(),
    isSymbolicLink: entry.isSymbolicLink(),
    name: entry.name,
    parentPathIsGiven: entry.parentPath === side.at('directory'),
  })).sort((one, other) => one.name.localeCompare(other.name))

  return {
    closedReadError: (await errorOf(() => dir.read()))?.code,
    entries,
    eof,
    pathIsGiven: dir.path === side.at('directory'),
    repeatedCloseError: (await errorOf(() => dir.close()))?.code,
  }
}

const directoryIteratorEarlyExit = async side => {
  await side.mkdir('early')
  await side.seed('early/file.txt', 'file')
  await side.mkdir('early/folder')

  const dir = await side.fsys.opendir(side.at('early'), { bufferSize: 1 })
  let seen = 0

  // eslint-disable-next-line no-unreachable-loop
  for await (const entry of dir) {
    seen += entry.name ? 1 : 0
    break
  }

  return { nextReadError: (await errorOf(() => dir.read()))?.code, seen }
}

const handleStream = async side => {
  await side.seed('stream.bin', 'abcdef')
  const handle = await side.fsys.open(side.at('stream.bin'), 'r')
  const parts = []

  for await (const chunk of handle.createReadStream({ autoClose: false, end: 3, start: 1 })) {
    parts.push(chunk)
  }

  const subsequent = Buffer.alloc(1)
  const afterStream = await handle.read(subsequent, 0, 1, null)
  const stillOpen = (await handle.read(Buffer.alloc(1), 0, 1, 0)).bytesRead === 1
  // Node.js 22's own FileHandle has its asyncDispose under the symbol Node.js registers, nodejs.asyncDispose, while
  // Jest's environment on Node.js 22 has no Symbol.asyncDispose (native-node22-disposal-realm-proof-r1).
  const asyncDispose = typeof handle[Symbol.asyncDispose ?? Symbol.for('nodejs.asyncDispose')]
  await handle.close()

  return {
    asyncDispose,
    nextRead: subsequent.subarray(0, afterStream.bytesRead).toString(),
    range: Buffer.concat(parts).toString(),
    stillOpen,
  }
}

// A path with Unicode, a space and a literal percent sign, in a folder of its own, holding seven bytes: what its file
// gives through the path as a string, and through a Buffer of the path's UTF-8 bytes, each read as UTF-8.
const UNICODE_FOLDER = 'résumé'
const UNICODE_PATH = `${UNICODE_FOLDER}/日本 100%.txt`

const unicodeStringAndBufferPath = async side => {
  await side.mkdir(UNICODE_FOLDER)
  await side.seed(UNICODE_PATH, 'unicode')
  const stringPath = await side.fsys.readFile(side.at(UNICODE_PATH), 'utf8')
  const bufferPath = await side.fsys.readFile(Buffer.from(side.at(UNICODE_PATH)), 'utf8')

  return { bufferPath, stringPath }
}

// What Node.js 22 and 24 gave for each of the first six cases (native-filesystem-reference-r1); the seventh's is below.
const REFERENCE = [
  ['position-and-utf8', positionAndUtf8, {
    bufferIdentity: true,
    bytesWritten: 2,
    counts: [2, 2, 2],
    explicit: 'ef',
    first: 'ab',
    next: 'cd',
    remainingHex: '65660000c3a9',
    returnedString: 'é',
    wholeHex: '6162636465660000c3a9',
  }],
  ['closed-read', closedRead, { error: 'EBADF', repeatedCloseError: null }],
  ['truncate-vectors', truncateAndVectors, {
    cursorReadHex: '0000',
    read: 6,
    readVectorIdentity: true,
    sizeAtOpen: 0,
    stat: { isDirectory: false, isFile: true, mtimeIsDate: true, size: 6 },
    vectorHex: '616263640000',
    wholeHex: '616263640000',
    writeVectorIdentity: true,
    written: 4,
  }],
  ['directory-read-and-close', directoryReadAndClose, {
    closedReadError: 'ERR_DIR_CLOSED',
    entries: [
      { isDirectory: false, isFile: true, isSymbolicLink: false, name: 'file.txt', parentPathIsGiven: true },
      { isDirectory: true, isFile: false, isSymbolicLink: false, name: 'folder', parentPathIsGiven: true },
    ],
    eof: null,
    pathIsGiven: true,
    repeatedCloseError: 'ERR_DIR_CLOSED',
  }],
  ['directory-iterator-early-exit', directoryIteratorEarlyExit, { nextReadError: 'ERR_DIR_CLOSED', seen: 1 }],
  ['handle-stream', handleStream, { asyncDispose: 'function', nextRead: 'a', range: 'bcd', stillOpen: true }],
  // Not part of native-filesystem-reference-r1: what client.fs gave against the stand-in Files.com before this case
  // moved here, which Node.js's own fs/promises must give too, as the native run of each case checks.
  ['unicode-string-and-buffer-path', unicodeStringAndBufferPath, { bufferPath: 'unicode', stringPath: 'unicode' }],
]

module.exports = { REFERENCE, UNICODE_PATH }
