# Files.com paths as native file handles and directories

`client.fs` gives a client's Files.com paths Node.js's `fs/promises` conventions. Code that reads, writes and lists with Node.js's own file handles and directories keeps its shape, and works on Files.com, when it uses `client.fs` in place of `fs.promises`:

```javascript
import FilesClient from 'files.com/lib/FilesClient.js';

const client = new FilesClient({ apiKey: 'YOUR_API_KEY', baseUrl: 'https://MY-SUBDOMAIN.files.com' });

// A file handle: positions, encodings and results as Node.js's FileHandle gives them.
const handle = await client.fs.open('reports/daily.csv', 'r+');
const header = Buffer.alloc(64);
const { bytesRead } = await handle.read(header, 0, 64, null); // from the handle's position, which moves
await handle.write('total', 0, 'utf8');                         // at position 0, which leaves it where it was
await handle.truncate(1024);
const stats = await handle.stat();                              // { size, mtime, birthtime, ... }
await handle.close();

// Whole files.
await client.fs.writeFile('reports/summary.txt', 'All done\n');
const summary = await client.fs.readFile('reports/summary.txt', 'utf8');

// A directory, a page at a time.
const dir = await client.fs.opendir('reports');
for await (const entry of dir) {
  console.log(entry.parentPath, entry.name, entry.isDirectory() ? 'directory' : 'file');
}

const names = await client.fs.readdir('reports', { recursive: true });
```

`client.fs` is Node.js only: in a browser, every method rejects with a `NotImplementedError`, and the API `File` model and its uploads, downloads and attachments are unchanged.

## Paths

Paths are Files.com paths, in the client's site and workspace, sent exactly as given: case, Unicode, spaces and literal `%` characters included. They are never resolved against the local working directory, and never replaced by the path the API returns. A path may be a string or a `Buffer` of its UTF-8. A `URL`, which could name a file on your disk, and bytes that are not UTF-8 reject with a `NotImplementedError` before anything is sent.

## `client.fs`

| Method | Behavior |
| --- | --- |
| `open(path, flags = 'r', mode)` | A file handle (see below). `'r'` and `'r+'` open an existing file; `'w'` and `'w+'` create or empty it, and that is published before the handle is given. A number of `fs.constants`' `O_RDONLY`, `O_WRONLY`, `O_RDWR`, `O_CREAT` and `O_TRUNC` opens it the same way; any other bit, one beyond 32 bits included, is refused (see Limits). A `mode` is ignored for flags that do not create the file, as Node.js ignores it. |
| `readFile(path, options)` | The whole file, a `Buffer` or a string in `encoding`; `flag` and `signal` as Node.js takes them. A file handle is read from its position. |
| `writeFile(path, data, options)` | Text, bytes, an iterable, an async iterable or a stream. With `'w'`, the default, the file is replaced by one upload of the whole data, and left as it was when the data cannot be read. A flag that does not create the file, such as `'r+'`, writes into the existing file, and its `mode` is ignored. A file handle is written at its position. |
| `appendFile(path, data, options)` | Uses the same write path with default flag `'a'`, which is unsupported: it rejects with a `NotImplementedError` before anything is sent (see Limits). A supported non-append flag, such as `'r+'` or `'w'`, follows that flag's behavior. Through a file handle, it writes at the handle's current position. |
| `opendir(path, options)` | A directory (see below), once its metadata shows it is one. `bufferSize`, when given, is how many entries each page of the listing has; `recursive` lists the directories within too. |
| `readdir(path, options)` | The names of the entries, or with `withFileTypes` the entries themselves; with `recursive`, names are paths from the directory. `encoding: 'buffer'` gives `Buffer`s. |
| `stat(path, options)` | The path's stats, from its metadata; `bigint: true` gives bigints and nanosecond times. |

## File handles

A file handle has Node.js's `FileHandle` methods, with their arguments, overloads and results, and is an `EventEmitter` that emits `'close'`.

| Method | Behavior |
| --- | --- |
| `read()`, `readv()` | As `FileHandle`'s: a `null` or missing position reads at the handle's position and moves it; a number reads there and leaves it. Results keep your buffers: `{ bytesRead, buffer }` and `{ bytesRead, buffers }`. |
| `readFile()` | From the handle's position to the end, a `Buffer` or a string in `encoding`. |
| `write()`, `writev()` | As `FileHandle`'s, a string's length counted in bytes of its encoding (`write('é')` writes 2). Resolve with `{ bytesWritten, buffer }` and `{ bytesWritten, buffers }` once published. |
| `writeFile()`, `appendFile()` | Write the data at the handle's position, once published. |
| `truncate(len)` | Shortens the file, or extends it with zero bytes, once published. |
| `stat()` | The remote file's stats, once every change before it has been published. |
| `createReadStream()` | From `start` to `end`, inclusive, leaving the handle's position as it was, or from the handle's position. Closes the handle when it ends, unless `autoClose` is `false`. Destroyed, by its `signal` or otherwise, it stops its own reads and download, and nothing else of the handle's (see Cancellation). |
| `createWriteStream()` | At `start`, or at the handle's position. Each batch of chunks is written to its end and published before its callback: a write of only part of a batch, as Node.js's `writev()` may make, is followed by one of the rest, and one that writes nothing more, or fails, fails the stream. So `'finish'` means every chunk has been written and published. Closes the handle when it finishes, unless `autoClose` is `false`. |
| `readLines()` | Lines of a read stream, as `FileHandle.readLines()` gives them. |
| `readableWebStream()` | A byte stream from the handle's position; the handle is locked while it is read. |
| `close()`, `[Symbol.asyncDispose]()` | See Closing. |
| `chmod()`, `chown()`, `utimes()`, `sync()`, `datasync()` | Reject with a `NotImplementedError`, changing nothing (see Limits). |
| `fd` | Reading it throws a `NotImplementedError`: a Files.com file has no descriptor of your process. |

**How a handle reads and writes.** The handle keeps a stage of the file on local disk, in a directory of its own in the operating system's temporary directory, and reads and changes it with Node.js's own file handle, opened with the handle's flags: so positions, encodings, vectors, zero-filled gaps and truncation behave exactly as Node.js's do. The stage of an existing file is downloaded, by the SDK's download, when the handle first reads or writes it, not at `open()`. Its descriptor is never exposed.

**Publication.** Every change, `write()`, `writev()`, `writeFile()`, `appendFile()`, `truncate()` and a write stream's batches, changes the stage and then uploads the whole stage to the path, by the SDK's upload, and resolves only once that upload has completed. Nothing is published at `close()`, and nothing waits on the stage alone: a change that resolved is on Files.com. Each change uploads the whole file, so for a large file prefer one `writeFile()` or `writev()`, or a write stream, to many small writes.

**Order and failure.** A handle does one thing at a time, in the order asked. A change that fails, locally or remotely, can leave the stage and the remote file apart, so the handle fails: every later call, and `close()`, rejects with that first failure, and nothing the failed change left in the stage is ever published. Only a `write()`, `writev()` or `truncate()` whose arguments Node.js refuses before touching the file, such as an out-of-range offset, changes nothing and leaves the handle usable; a `writeFile()` of an iterable that fails at a later chunk, even for an invalid argument, may have written the earlier ones, and fails the handle. Nothing remote is ever deleted, whatever became of an upload: an upload whose completion's outcome is unknown rejects with `completionUnknown: true`, and the file on Files.com may be either version.

**Cancellation.** A `signal` given to `readFile()`, `writeFile()` or `appendFile()`, of a path or a handle, stops every part of that call: the metadata request, the download, Node.js's own read or write of the stage, and the uploads. The call rejects with the signal's reason, unchanged, whatever it is, `null` and `0` included, rather than Node.js's own `AbortError`, once what it started has stopped and, for a path, its handle has closed. A signal aborted already stops a call before it touches anything; a change stopped while Node.js writes the stage may have written part of it, and fails the handle.

A read stream's `signal` destroys the stream with the signal's reason itself when it is truthy, an `Error` keeping its identity, as the SDK's other Node.js streams fail; only a falsy reason, `null`, `false`, `0`, `NaN` or `''`, with which a Node.js stream cannot fail, becomes an `Error` named `AbortError`, code `ABORT_ERR`, whose `cause` is the reason. A read stream destroyed in any way, by its signal or by its reader's `destroy(error)`, with or without a signal, stops its own work: its reads of the stage and the download one of them makes. Nothing else the handle was asked is stopped, and a read of the stream's still waiting for the handle's earlier calls stops when its turn comes. The stream's destruction settles, with its first failure, only once that work has stopped: with `autoClose`, it then closes the handle, and `close()` waits for the handle's other calls as it always does; with `autoClose: false`, the handle stays usable, and its next call that needs the stage downloads it again. The stream lets go of its signal once it settles.

**Closing.** `close()` waits for everything asked before it, refuses anything asked after it with `EBADF` (`file closed`), as Node.js does, closes and removes the stage, emits `'close'`, and rejects with the handle's first failure, if any. Closing a closed handle resolves at once. `readFile()` of a path rejects with its read's own failure even when closing its handle then fails too; when only closing failed, with that. Close every handle: a handle collected without being closed has its stage removed, as a safety net, never while anything it was asked is still to run or under way, and not when your process exits first.

## Directories

A directory has Node.js's `Dir` methods.

| Method | Behavior |
| --- | --- |
| `path` | The path as given to `opendir()`. |
| `read()`, `read(callback)` | The next entry, or `null` once there are none. The callback is called once, with `(error, entry)`. |
| `close()`, `close(callback)` | Waits for a read under way, then requests nothing more. |
| `for await (const entry of dir)` | Reads every entry, and closes the directory however the loop ends, by its end, `break` or an error. |
| `closeSync()`, `[Symbol.dispose]()` | Close the directory at once; `closeSync()` throws `ERR_DIR_CONCURRENT_OPERATION` while a read is under way. |
| `[Symbol.asyncDispose]()` | Closes the directory, unless it has closed already. |
| `readSync()` | Throws a `NotImplementedError`: listing takes network requests. |

The entries come from the client's lazy Folder listing (`GET /folders/{path}`), the same as `Folder.listForIterator()`: it holds one page at a time and requests the next page only once every entry of the one before has been read, following the API's cursor, an empty page with a cursor included. Reads and `close()` run one at a time, in the order made. Once closed, `read()` and `close()` fail with `ERR_DIR_CLOSED`, as Node.js's do. No order of entries is promised beyond the API's, and the listing is not a snapshot.

Each entry is a `Dirent`-like object: `name`, the API's `display_name`, and `parentPath`, the directory's path as you gave it, never a path the API returns; `isFile()` and `isDirectory()` from the API's type. A Files.com path is a file or a directory, so `isSymbolicLink()`, `isFIFO()`, `isSocket()`, `isBlockDevice()` and `isCharacterDevice()` are `false`: this says nothing about what a remote mount stores behind it. An entry of any other type fails the read with a `FilesError` rather than being guessed.

## Stats

`stat()` gives what the API reports and nothing else: `size`, `mtime` and `mtimeMs`, the modification time on the server, and `birthtime` and `birthtimeMs`, the creation time, each absent when the API gives none, with `isFile()` and `isDirectory()`. The API has no device, inode, mode, link count, owner, block size or count, or access and change times, so those fields are never present. Checksums the API reports later are not part of it.

## Errors

A path that the API says is not there, its error type `not-found/file-not-found` or `not-found/folder-not-found`, fails with an `Error` whose `code` is `ENOENT`, with `errno`, `syscall` and `path` as Node.js gives them, and whose `cause` is the SDK's own error, unchanged, its numeric `code` included. Opening a directory fails with `EISDIR`, and opening a file as a directory with `ENOTDIR`. Any other failure, an authentication error, a lockout region mismatch not followed, a 404 with no such error type or a network failure, rejects with the SDK's own error, as it is: it never becomes `ENOENT`.

## Limits

What the API has no primitive for rejects with the SDK's `NotImplementedError` before anything is changed or sent:

- **Atomic append:** the append flags `'a'`, `'a+'`, `'ax'`, `'as'` and their kin, and `O_APPEND`, so also `appendFile()` of a path with its default flag `'a'`. The API has no atomic append, so writing to the end could lose another writer's data. `appendFile()` given a supported non-append flag, such as `'r+'`, follows that flag instead. Open with `'r+'` and write at the size `stat()` gives, if no one else writes the file.
- **Exclusive creation:** `'wx'`, `'xw'` and their kin, `O_EXCL`. The API has no atomic create-if-absent; an existence check would not be one.
- **Synchronous modes and physical durability:** `'rs+'`, `O_SYNC`, `O_DSYNC`, `sync()`, `datasync()` and `flush: true`. A change has been uploaded when it resolves, but the SDK cannot confirm what the storage behind Files.com has written to a device.
- **Other numeric flags:** any bit besides `O_RDONLY`, `O_WRONLY`, `O_RDWR`, `O_CREAT` and `O_TRUNC`, a number wider than 32 bits included.
- **Modes, owners and times:** a `mode` for a file `open()` or `writeFile()` creates, `chmod()`, `chown()` and `utimes()`. Files.com paths have no POSIX permissions or owners, and the API keeps its own modification time. A `mode` with flags that do not create the file is ignored, as Node.js ignores it.
- **Descriptors and synchronous I/O:** `fd`, and `Dir.readSync()`.
- **Paths:** a `URL`, or bytes that are not UTF-8.

`open()` checks the path's metadata first and then creates or empties it: another writer can change the file between the two, as with any shared remote file. A handle holds a whole copy of the file on local disk while it is open.
