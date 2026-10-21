"use strict";

exports.__esModule = true;
exports.unanswered = exports.silentLog = exports.pump = exports.openUploadFile = exports.openDiskFileWriteStream = exports.openDiskFileReadStream = exports.nodeReadableOf = exports.nodeReadableCarrierOf = exports.logDownloadResponse = exports.isPermanent = exports.httpsExchange = exports.downloadUrlToString = exports.downloadUrlToStream = exports.downloadUrlToFile = exports.WRITE_BATCH_BYTES = exports.RANGE_BYTES = void 0;
var errors = _interopRequireWildcard(require("../Errors"));
var _Transfer = require("../Transfer");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// An upload reads its file from disk 5 MiB at a time.
const openDiskFileReadStream = sourceFilePath => {
  const fs = require('fs');
  return fs.createReadStream(sourceFilePath, {
    highWaterMark: 5242880
  });
};
exports.openDiskFileReadStream = openDiskFileReadStream;
const openDiskFileWriteStream = destination => {
  const fs = require('fs');
  return fs.createWriteStream(destination);
};

// A file on disk as an upload's source (see Upload.js), opened only by prepare(), once the upload's file has been
// admitted, so that an upload waiting for its admission holds no file open; failing to open it fails the upload before
// it begins. Its size is the file's as it was opened, null until then; read(length) reads its next length bytes from
// their own position into memory of their own, fewer only at the file's end, or null once none are left. Reads go as
// far as the file goes, so that a file that grew after it was opened shows its extra bytes rather than having them
// dropped. close() closes it, if it was opened.
exports.openDiskFileWriteStream = openDiskFileWriteStream;
const openUploadFile = sourceFilePath => {
  const fs = require('fs');
  let handle = null;
  let size = null;
  let position = 0;
  return {
    close: async () => {
      await handle?.close();
    },
    prepare: async () => {
      const opened = await fs.promises.open(sourceFilePath, 'r');
      try {
        ({
          size
        } = await opened.stat());
      } catch (error) {
        await opened.close().catch(() => {});
        throw error;
      }
      handle = opened;
    },
    read: async length => {
      const buffer = Buffer.allocUnsafe(length);
      let filled = 0;
      let ended = false;
      while (filled < length && !ended) {
        // eslint-disable-next-line no-await-in-loop
        const {
          bytesRead
        } = await handle.read(buffer, filled, length - filled, position + filled);
        filled += bytesRead;
        ended = bytesRead === 0;
      }
      position += filled;
      return filled === 0 ? null : buffer.subarray(0, filled);
    },
    get size() {
      return size;
    }
  };
};

// A download's log: debug(...messages), which logs at DEBUG with the File's log settings, and enabled, whether DEBUG is
// on for it, as it was when the download began (see File._downloadLog); or one that logs nothing.
exports.openUploadFile = openUploadFile;
const silentLog = exports.silentLog = {
  debug: () => {},
  enabled: false
};

// Logs, at DEBUG, as the API's requests are logged, each request to storage with the headers it is sent with, as the
// number'th request for its bytes, and each response's status and headers, whatever becomes of it. A log that throws
// fails the download.
const logDownloadRequest = (log, url, headers = {}, number = 1) => {
  log.debug(`Sending request #${number}: GET ${url}`);
  log.debug('Sending options:', {
    headers
  });
};
const logDownloadResponse = (log, response) => {
  log.debug(`Status: ${response.statusCode} ${response.statusMessage}`);
  log.debug('Response Headers: ');
  log.debug(response.headers);
};

// Logs, at DEBUG, a chunk of a response's body as it is read, with the bytes of the file it holds, from offset: the
// chunk itself, as it goes to its destination, never a copy held for the log. Below DEBUG, nothing is done for it.
exports.logDownloadResponse = logDownloadResponse;
const logResponseData = (log, chunk, offset) => {
  if (log.enabled && chunk.length > 0) {
    log.debug(`Response Data (bytes ${offset}-${offset + chunk.length - 1}): `, chunk);
  }
};

// A download into stream, which the download takes over: a complete response ends it, then it is closed if it has a
// close method. A failed download stops the transfer and closes the stream, or destroys a stream without a close
// method rather than ending it as though the download completed. The first failure is final. Errors from releasing
// the stream afterwards, thrown or reported before the stream emits 'close', cannot change it or become uncaught; the
// stream still delivers reported errors to the caller's own 'error' listeners.
//
// begin(fail, stopWith, isDone) starts the transfer and gives the promise of its run, which settles only once every
// request it made has closed and its admission has been given back (see run()). The transfer fails the download with
// fail(error), whatever error is, a falsy value included, and names with stopWith(...steps) the steps that stop it when
// the download fails, each taken on its own so that one failure cannot skip the rest; isDone() tells whether the
// stream has failed, closed or finished, so that nothing more is written to it. The download settles only once that run
// has settled: with the first failure, the stream's, the run's, or one thrown as the stream is ended; or, when the run
// has completed and ended the stream, once the stream has finished. Only a finish that follows the download's own end
// completes it: a stream that finishes before, ended by another, takes no more bytes, and the download's outcome is
// then its first failure, such as the stream closing, or the run's failure to write to it; or, when the run had
// already written every byte, its completion.
const deliverToStream = (stream, begin) => new Promise((resolve, reject) => {
  let stopSteps = [];
  let failure = null;
  let finished = false;
  let ending = false;
  let finishedEarly = false;
  let ran = false;
  let settled = false;
  const quietly = release => {
    try {
      release();
    } catch (releaseError) {
      // The download has already failed, or finished, so a failure to release cannot replace its outcome.
    }
  };
  const settle = () => {
    if (settled || !ran || !failure && !finished) {
      return;
    }
    settled = true;
    if (failure) {
      reject(failure.error);
      return;
    }
    resolve();
    quietly(() => {
      if (typeof stream.close === 'function') {
        stream.close();
      }
    });
  };
  const fail = error => {
    if (failure || finished) {
      return;
    }
    failure = {
      error
    };

    // Stop the transfer before releasing the stream.
    stopSteps.forEach(step => quietly(step));
    quietly(() => {
      if (typeof stream.close === 'function') {
        stream.close();
      } else if (typeof stream.destroy === 'function') {
        stream.destroy();
      }
    });
    settle();
  };
  const succeed = () => {
    if (!failure) {
      finished = true;
      settle();
    }
  };

  // The stream's finish: the download's completion only once the download has ended the stream itself.
  const onFinish = () => {
    if (ending) {
      succeed();
    } else {
      finishedEarly = true;
    }
  };
  const onClose = () => {
    fail(new Error('Download destination closed before the download finished'));
    // 'close' is the stream's last event, so the listeners have nothing left to observe.
    stream.removeListener('error', fail);
    stream.removeListener('finish', onFinish);
  };
  stream.on('error', fail);
  stream.on('finish', onFinish);
  stream.once('close', onClose);

  // A stream that finished before the download ended it has every byte the completed run wrote to it.
  const end = () => {
    if (!failure) {
      ending = true;
      if (finishedEarly) {
        succeed();
      } else {
        stream.end();
      }
    }
  };
  begin(fail, (...steps) => {
    stopSteps = steps;
  }, () => failure !== null || finished || finishedEarly).then(end).catch(fail).finally(() => {
    ran = true;
    settle();
  });
});

// The bytes of each range a download to disk can be split into, the last one smaller: the ordinary response gives the
// first, and a request of its own, sent through the same agent, gives each other one (see readRanges()).
const RANGE_BYTES = exports.RANGE_BYTES = 8 * 1024 * 1024;

// How long the request that probes a split, for the second range, may take to answer, while the ordinary response
// waits unread, before the download goes on through the ordinary response alone.
const HELPER_RESPONSE_MS = 2000;

// The wait before a request to storage is sent again after a failure other than a throttle. A wait longer than a timer
// can be set for (MAX_TIMER_MS) is never shortened, and fails the download instead.
const STORAGE_RETRY_MS = 100;

// The header of a response from the Files.com web app, which a download URL that is not a storage URL, or no longer
// one, can answer with: never the file's bytes, so the download is refused before any of its body is used.
const FRONTEND_APP_HEADER = 'x-files-frontend-app';

// The bytes of a response held to be written together (see batchWriter()).
const WRITE_BATCH_BYTES = exports.WRITE_BATCH_BYTES = 1024 * 1024;
const DECIMAL = /^\d+$/;

// A strong entity tag (RFC 9110): a quoted tag without the W/ of a weak one.
const STRONG_ETAG = /^"[\x21\x23-\x7e\x80-\xff]*"$/;
const declaredLength = response => {
  const value = response.headers['content-length'];
  if (typeof value !== 'string' || !DECIMAL.test(value)) {
    return null;
  }
  const length = Number(value);
  return Number.isSafeInteger(length) ? length : null;
};
const hasIdentityEncoding = response => {
  const encoding = response.headers['content-encoding'];
  return encoding === undefined || encoding.trim().toLowerCase() === 'identity';
};

// The length a response declares for its body, which it must then have: its Content-Length, unless a content coding
// makes that the length of other bytes; or null.
const declaredBodyLength = response => hasIdentityEncoding(response) ? declaredLength(response) : null;
const incompleteResponse = () => new Error('Download response ended before it was complete');
const statusError = status => {
  const error = new Error(`Download failed with HTTP status ${status}`);
  error.status = status;
  return error;
};
const expiredUrlError = () => new errors.FilesError('The signed URL had expired before the request could be sent');
const changedFileError = () => new errors.FilesError('The file changed while it was being downloaded');
const frontendRefusal = () => new errors.FilesError('The download URL answered with the Files.com web app rather than the file, so none of its answer was used');
const isFrontendAnswer = opened => opened.headers[FRONTEND_APP_HEADER] !== undefined;

// Whether error, the failure of a request to target, is one no retry can answer.
const isPermanent = (error, target) => error?.code === 'ERR_INVALID_URL' || require('../Api.js').default._isPermanentStorageFailure(error, target);

// What a request to target that had no response leads to: { error, terminal }; for a URL found expired before anything
// of the request was sent, { error, unsent }, to ask again at once, its URL given again, without counting a retry, within
// freshUrl()'s own limit (see run()); or, for one found expired once the request had been sent, as a redirect's,
// { error, expired }, to ask again at once as a retry. A download thread judges its own requests' failures so too (see
// DownloadWorker.node.js).
exports.isPermanent = isPermanent;
const unanswered = (error, target) => {
  const Api = require('../Api.js').default;
  if (Api._isUnsentExpiry(error)) {
    return {
      error,
      unsent: true
    };
  }
  if (Api._isExpiredUrlError(error)) {
    return {
      error,
      expired: true
    };
  }
  return {
    error,
    terminal: isPermanent(error, target)
  };
};

// The version of the file a whole response gives, { etag, total }, which a later request can ask for again from any
// byte: only when it declares the file's exact size, a strong entity tag and no content coding; or null.
exports.unanswered = unanswered;
const versionOf = opened => {
  const total = declaredLength(opened);
  const {
    etag
  } = opened.headers;
  return total !== null && STRONG_ETAG.test(etag ?? '') && hasIdentityEncoding(opened) ? {
    etag,
    total
  } : null;
};

// The headers that ask for bytes start through end of version, and only of that version.
const rangeHeaders = ({
  end,
  start
}, version) => ({
  'If-Match': version.etag,
  Range: `bytes=${start}-${end}`
});

// Whether a response is exactly the range it asked for, of version.
const isExactRange = (opened, {
  end,
  start
}, {
  etag,
  total
}) => {
  const length = opened.headers['content-length'];
  return opened.status === 206 && opened.headers['content-range'] === `bytes ${start}-${end}/${total}` && (length === undefined || length === `${end - start + 1}`) && opened.headers.etag === etag && hasIdentityEncoding(opened);
};

// Whether agent, or https's global agent when none is given, is Node's own https agent, scheduling requests itself
// with no limit on its sockets. Only then is a download to disk split, its range requests never waiting behind another,
// the ordinary response or the caller's other requests; any other agent downloads through the ordinary response alone.
const startsHelpersAtOnce = agent => {
  const https = require('https');
  const chosen = agent ?? https.globalAgent;
  return Boolean(chosen) && chosen.addRequest === https.Agent.prototype.addRequest && chosen.createConnection === https.Agent.prototype.createConnection && chosen.maxSockets === Infinity && chosen.maxTotalSockets === Infinity;
};

// The socket buffer a download to disk asks for on new connections of https's global agent (see diskRequestOptions()).
const DISK_SOCKET_HIGH_WATER_MARK = 4 * 1024 * 1024;

// The options of a download to disk's requests: agent, and, when that is https's global agent as Node gives it, with
// no limit on its sockets and no buffer size, in either direction, chosen for them, a larger buffer for any socket it
// creates for them. A socket the agent already holds keeps the size it has, and a socket made with the larger buffer
// can later serve another request to the same host. The global agent itself is never changed.
const diskRequestOptions = agent => {
  const https = require('https');
  const {
    options
  } = https.globalAgent;
  if (agent === undefined && startsHelpersAtOnce(agent) && options?.highWaterMark === undefined && options?.readableHighWaterMark === undefined && options?.writableHighWaterMark === undefined) {
    return {
      agent,
      highWaterMark: DISK_SOCKET_HIGH_WATER_MARK
    };
  }
  return {
    agent
  };
};

// One GET of url through Node.js's https, with requestOptions, and only the headers given, its response logged to log:
// its response, once it arrives, as { body, complete(), failure(), headers, status, statusText }, whether it is then
// used, refused or left for another, and when its request has closed. A failure is kept for whoever reads the response,
// so one never read cannot become uncaught; a log that throws is the request's failure. Until its response has been
// read to its end, as finish() records, the exchange is broken once the request or response fails or the response
// closes, as it does when its connection is cut even while it waits unread: broken then resolves with that failure, or
// with null for a response that closed without one. stop() ends such a request.
//
// timeoutSecs, when more than 0, is the request's one budget, as an attempt of a request through the SDK's request path
// has (see Api.js): from sending it until its response has been read to its end, never extended by what arrives
// meanwhile. Once it runs out, the request is destroyed, and its failure, whether before its response or while its
// body is read, is the "Request timed out" FilesError.
const httpsExchange = (url, requestOptions, headers, log, timeoutSecs) => {
  const https = require('https');
  let finished = false;
  let intact = true;
  let receive = null;
  let refuse = null;
  let signalBroken = null;
  let timedOut = null;
  let timer = null;
  const endBudget = () => {
    clearTimeout(timer);
    timer = null;
  };
  const response = new Promise((resolve, reject) => {
    receive = resolve;
    refuse = reject;
  });
  response.catch(() => {});
  const broken = new Promise(resolve => {
    signalBroken = resolve;
  });
  const noteBroken = (error = null) => {
    if (!finished) {
      intact = false;
      signalBroken(error);
    }
  };
  const request = https.get(url, {
    ...requestOptions,
    headers
  }, received => {
    try {
      logDownloadResponse(log, received);
    } catch (error) {
      request.destroy(error);
      return;
    }
    received.on('error', noteBroken);
    received.once('close', () => noteBroken());

    // Before Node 16 an interrupted response emits 'aborted' without an error, and through Node 12 it then ends
    // normally, so its completeness is what tells.
    receive({
      body: received,
      complete: () => received.complete,
      failure: error => timedOut ?? error,
      headers: received.headers,
      status: received.statusCode,
      statusText: received.statusMessage
    });
  });
  request.on('error', error => {
    noteBroken(error);
    refuse(timedOut ?? error);
  });
  if (timeoutSecs > 0) {
    timer = setTimeout(() => {
      if (!finished) {
        timedOut = new errors.FilesError('Request timed out');
        request.destroy(timedOut);
      }
    }, timeoutSecs * 1000);
  }
  const closed = new Promise(resolve => {
    request.once('close', resolve);
  });
  closed.then(endBudget);
  return {
    broken,
    closed,
    finish: () => {
      finished = true;
      endBudget();
    },
    isIntact: () => intact,
    response,
    stop: () => {
      if (!finished) {
        request.destroy();
      }
    }
  };
};

// One GET of url, with headers, through a configured HTTP client, with agent, the one chosen for url already, and
// whenSendable, the download's own check of each of its sends, a redirect's included (see Api._downloadGate):
// open(url, headers, signal, agent, whenSendable), which sends it through the SDK's request path as one attempt (see
// File._openDownload and Api._openStorageDownload), stopped by signal as well as by the download's own, resolves with
// its response, its body a Node.js readable stream within the attempt's budget, which the exchange gives as
// httpsExchange() does. stop() stops it whether or not it has been answered, so that a
// request still waiting for its response settles, without a deadline of its own, once the download has failed; closed
// resolves once its request has failed, or, answered, once its attempt has ended and its bodies have had their outcome
// (see Api._openStorageDownload), not merely once they are being destroyed. Such a download is never split; its request
// is logged by the request path, and each chunk of its body as it is read.
exports.httpsExchange = httpsExchange;
const fetchExchange = (open, url, headers, agent, whenSendable) => {
  const stopping = new AbortController();
  let current = null;
  const response = open(url, headers, stopping.signal, agent, whenSendable).then(received => {
    current = received;
    if (stopping.signal.aborted) {
      received.stop();
    }
    return {
      body: received.body,
      complete: () => true,
      failure: received.failure,
      headers: received.headers,
      status: received.status,
      statusText: received.statusText
    };
  });
  response.catch(() => {});
  return {
    broken: new Promise(() => {}),
    closed: response.then(() => current.closed, () => {}),
    finish: () => {},
    isIntact: () => true,
    response,
    stop: () => {
      stopping.abort();
      current?.stop();
    }
  };
};

// What is left of buffers after their first count bytes.
const remainingAfter = (buffers, count) => {
  let skipped = count;
  let index = 0;
  while (index < buffers.length && skipped >= buffers[index].length) {
    skipped -= buffers[index].length;
    index += 1;
  }
  const rest = buffers.slice(index);
  if (rest.length > 0 && skipped > 0) {
    rest[0] = rest[0].subarray(skipped);
  }
  return rest;
};

// Writes buffers, one after another, at position on, however many writes the file takes, each writing what it can.
const writeAll = async (handle, buffers, position) => {
  let rest = buffers;
  let written = 0;
  while (rest.length > 0) {
    // eslint-disable-next-line no-await-in-loop
    const {
      bytesWritten
    } = await handle.writev(rest, position + written);
    if (bytesWritten === 0) {
      throw new Error('Download destination accepted no bytes');
    }
    written += bytesWritten;
    rest = remainingAfter(rest, bytesWritten);
  }
};

// Writes a response's body at position on, in batches: its chunks are held, as they come, until they reach
// WRITE_BATCH_BYTES, then written together, and the response is read no further until they have been. So a stream
// holds less than WRITE_BATCH_BYTES of earlier chunks besides the latest one, however large, and each chunk keeps the
// memory it was read into. add(chunk) returns nothing when it only holds the chunk, and the promise of the batch's write
// when it makes one, so that only a real write is waited for. flush() writes whatever is still held. onWritten(bytes)
// counts each batch once written, and position is where the bytes written so far end.
const batchWriter = (handle, position, onWritten = () => {}) => {
  let held = [];
  let heldBytes = 0;
  let next = position;
  const flush = async () => {
    if (heldBytes === 0) {
      return;
    }
    const buffers = held;
    const bytes = heldBytes;
    held = [];
    heldBytes = 0;
    await writeAll(handle, buffers, next);
    next += bytes;
    onWritten(bytes);
  };
  return {
    add: chunk => {
      if (chunk.length > 0) {
        held.push(chunk);
        heldBytes += chunk.length;
      }
      return heldBytes >= WRITE_BATCH_BYTES ? flush() : undefined;
    },
    flush,
    get position() {
      return next;
    }
  };
};

// The destinations of a download (see run()). writerAt(position, onWritten, signal) gives a writer of the bytes of the
// file from position on, { add(chunk), flush(), position }, which counts each byte with onWritten once its destination
// has it, and which signal, the download's stop, ends any wait of; add(chunk) returns the promise of what it waits for,
// or nothing when it waits for nothing (see batchWriter()). canReset() tells whether the destination can start
// over from its first byte, which reset() does. Only a file can be written at any position, and so be split.
//
// A file, written in batches at each byte's own position (see batchWriter()), which starts over by being emptied.
const fileSink = handle => ({
  canReset: () => true,
  positional: true,
  reset: () => handle.truncate(0),
  writerAt: (position, onWritten) => batchWriter(handle, position, onWritten)
});

// A writable stream, written in order as the download reads it, with the stream's own backpressure: a write it asks
// to wait after is followed by no other until it drains, or closes or fails, which deliverToStream() has then made the
// download's outcome (isDone()), or until the download is stopped, which fails the write with the stop's reason
// rather than waiting for a stream that may never drain. Bytes it has been given cannot be taken back, so it can start
// over only while it has been given none; resuming a download gives it each byte once.
const writableSink = (stream, isDone) => {
  let written = 0;
  const closedError = () => new Error('Download destination closed before the download finished');
  const drained = signal => new Promise(resolve => {
    const events = ['close', 'drain', 'error'];
    const done = () => {
      events.forEach(event => stream.removeListener(event, done));
      signal?.removeEventListener('abort', done);
      resolve();
    };
    events.forEach(event => stream.on(event, done));
    if (signal?.aborted) {
      done();
    } else {
      signal?.addEventListener('abort', done, {
        once: true
      });
    }
  });
  return {
    canReset: () => written === 0,
    positional: false,
    reset: async () => {},
    writerAt: (position, onWritten, signal) => ({
      add: async chunk => {
        if (isDone()) {
          throw closedError();
        }
        written += chunk.length;
        const more = stream.write(chunk);
        onWritten(chunk.length);
        if (!more && !isDone()) {
          await drained(signal);
        }
        if (signal?.aborted) {
          throw (0, _Transfer.abortReason)(signal);
        }
        if (isDone()) {
          throw closedError();
        }
      },
      flush: async () => {},
      get position() {
        return written;
      }
    })
  };
};

// The text of a download, held as copies of its chunks until it is complete, then read as UTF-8.
const textSink = () => {
  let chunks = [];
  let length = 0;
  return {
    canReset: () => true,
    positional: false,
    reset: async () => {
      chunks = [];
      length = 0;
    },
    text: () => Buffer.concat(chunks).toString('utf8'),
    writerAt: (position, onWritten) => ({
      add: async chunk => {
        chunks.push(Buffer.from(chunk));
        length += chunk.length;
        onWritten(chunk.length);
      },
      flush: async () => {},
      get position() {
        return length;
      }
    })
  };
};

// What a body's failure is reported as: what its exchange makes of it (see Api._openStorageDownload), or, for a body
// that closed before its end without an error of its own, the download's incomplete-response error.
const bodyFailureOf = (opened, error) => {
  const failure = opened.failure(error);
  return failure?.code === 'ERR_STREAM_PREMATURE_CLOSE' ? incompleteResponse() : failure;
};

// What a body that closed before its end, without an error of its own, fails with, as Node.js's own stream utilities
// name it: bodyFailureOf() reports it as the download's incomplete-response error.
const prematureClose = () => Object.assign(new Error('Premature close'), {
  code: 'ERR_STREAM_PREMATURE_CLOSE'
});

// Reads the body of opened, a response for the download, into writer, the bytes of the file from offset on: at most
// limit bytes when a limit is given, and then no more of it, or else the body to its end, which must hold exactly
// expected bytes when that is known. Each chunk is logged to log as it is read, counted to progress as received, and,
// once writer has it, as delivered. A chunk that arrives while control is paused, or while the download waits for one,
// is neither delivered nor counted until the download is resumed, and nothing more is read meanwhile; nor is one
// delivered once signal has stopped the download. Resolves with { excludedMs, ok, received }: ok when it has read what
// it was to; otherwise kind, with error, tells what failed: 'body', the response, which asking again may answer;
// 'stopped', the download being stopped, by signal; or 'terminal', its destination, its log or progress callback, or a
// body longer than it declared, which nothing can answer. excludedMs is the time spent waiting for writes or paused,
// which no measurement of the network counts.
//
// The body is read through its public 'data' events, each chunk as the body gives it, never gathered with others: a
// chunk writer only holds is followed by the next at once, while one it must wait for, a write or its destination's
// backpressure, or a pause, pauses the body until that wait is over, so that only that one chunk is being taken
// besides what the body and writer buffer already. The body's 'end', 'error' or 'close' while a chunk is being taken
// waits until that chunk has been, its write included, and is then what happens next, as it was for the for await of
// the body this replaces. Once the pump has read what it was to, or stops before the body's end, it stops listening
// to the body and destroys it, without an error, as leaving that for await early did; its exchange still ends the
// request (see readWhole() and readRangeBytes()).
const pump = ({
  control,
  expected = null,
  limit = null,
  log,
  offset,
  opened,
  progress,
  signal,
  writer
}) => new Promise(resolve => {
  const {
    body
  } = opened;
  const listeners = {};
  let received = 0;
  let excludedMs = 0;
  let settled = false;
  let busy = false;
  let held = false;
  let latched = null;
  const outcomeOf = fields => ({
    excludedMs,
    received,
    ...fields
  });

  // Settles, once, with fields: the pump stops listening to the body, and destroys it if it has neither ended nor
  // closed.
  const finish = fields => {
    if (settled) {
      return;
    }
    settled = true;
    try {
      Object.keys(listeners).forEach(event => body.removeListener(event, listeners[event]));
      if (!body.destroyed && !body.readableEnded) {
        body.destroy();
      }
    } catch {
      // A body that cannot be let go of here is still ended by its exchange's stop(); the outcome stands.
    }
    resolve(outcomeOf(fields));
  };

  // The body's own failure, or an exception of the pump's while it takes the body.
  const thrown = error => finish(signal.aborted ? {
    error,
    kind: 'stopped',
    ok: false
  } : {
    error: bodyFailureOf(opened, error),
    kind: 'body',
    ok: false
  });

  // The body's end: what the pump was to read only when it was to read the body to its end, which is the one the
  // response declared.
  const ended = () => finish(limit !== null || !opened.complete() || expected !== null && received !== expected ? {
    error: incompleteResponse(),
    kind: 'body',
    ok: false
  } : {
    ok: true
  });

  // A close of the body that came before its end or failure.
  const closed = () => thrown(prematureClose());

  // Waits for something before the body's next chunk, which the body gives no more of meanwhile.
  const hold = () => {
    busy = true;
    if (!held) {
      held = true;
      body.pause();
    }
  };

  // Goes on once a chunk has been taken: done when it was the last the pump was to read; else with what the body did
  // meanwhile, if it did anything; else with the body's next chunk.
  const next = () => {
    busy = false;
    if (limit !== null && received >= limit) {
      finish({
        ok: true
      });
    } else if (latched) {
      const happened = latched;
      latched = null;
      happened();
    } else if (held) {
      held = false;
      body.resume();
    }
  };

  // Runs step so that nothing it throws escapes into the body's events, or a promise nobody observes.
  const guarded = step => (...args) => {
    try {
      step(...args);
    } catch (error) {
      busy = false;
      thrown(error);
    }
  };

  // Takes read, a chunk of the body: delivered and counted, or the reason the pump stops instead.
  const take = read => {
    let adding;
    let writing;
    try {
      if (signal.aborted) {
        finish({
          error: (0, _Transfer.abortReason)(signal),
          kind: 'stopped',
          ok: false
        });
        return;
      }
      const chunk = limit === null ? read : read.subarray(0, Math.min(read.length, limit - received));
      if (expected !== null && received + chunk.length > expected) {
        finish({
          error: new Error('Download response was longer than expected'),
          kind: 'terminal',
          ok: false
        });
        return;
      }
      progress.sent(chunk.length);
      try {
        logResponseData(log, chunk, offset + received);
        received += chunk.length;
        writing = _Transfer.systemClock.now();
        adding = writer.add(chunk);
      } catch (error) {
        finish({
          error,
          kind: 'terminal',
          ok: false
        });
        return;
      }
    } catch (error) {
      thrown(error);
      return;
    }
    if (typeof adding?.then !== 'function') {
      excludedMs += _Transfer.systemClock.now() - writing;
      next();
      return;
    }
    hold();
    adding.then(guarded(() => {
      excludedMs += _Transfer.systemClock.now() - writing;
      next();
    }), guarded(error => {
      busy = false;
      finish({
        error,
        kind: 'terminal',
        ok: false
      });
    }));
  };

  // What the body does while a chunk is being taken, the first of it only, waits until that chunk has been.
  const happen = event => {
    if (settled) {
      return;
    }
    if (busy) {
      latched = latched ?? event;
      return;
    }
    event();
  };
  listeners.data = guarded(read => {
    if (settled) {
      return;
    }
    if (!control?.paused) {
      take(read);
      return;
    }
    hold();
    const pausing = _Transfer.systemClock.now();
    control._whenRunning(signal).then(guarded(() => {
      excludedMs += _Transfer.systemClock.now() - pausing;
      busy = false;
      take(read);
    }), guarded(error => {
      busy = false;
      thrown(error);
    }));
  });
  listeners.end = guarded(() => happen(ended));
  listeners.error = guarded(error => happen(() => thrown(error)));
  listeners.close = guarded(() => happen(closed));

  // A body that has failed, ended or closed before its end already gives no event: it is taken as it is.
  try {
    if (body.errored) {
      thrown(body.errored);
    } else if (body.readableEnded) {
      ended();
    } else if (body.destroyed) {
      closed();
    } else {
      Object.keys(listeners).forEach(event => body.on(event, listeners[event]));
      body.resume();
    }
  } catch (error) {
    thrown(error);
  }
});

// Resolves with the response exchange gives, once it arrives intact, or with null once it has failed or broken, or
// signal has aborted, first.
exports.pump = pump;
const answerWithin = (exchange, signal) => new Promise(resolve => {
  if (signal.aborted) {
    resolve(null);
    return;
  }
  const onAbort = () => resolve(null);
  const settle = opened => {
    signal.removeEventListener('abort', onAbort);
    resolve(opened);
  };
  signal.addEventListener('abort', onAbort, {
    once: true
  });
  exchange.broken.then(() => settle(null));
  exchange.response.then(settle, () => settle(null));
});

// One download from storage into the sink destination.open() gives (see the sinks), from url, as File's download
// methods make it (see File._downloadSettingsOf): through Node.js's https, with the agent agentFor(url) chooses for each
// URL it sends a request to and timeoutSecs as each request's budget (see httpsExchange()), or, with openFetch, through
// a configured HTTP client; logged to log; asking again, after a failure, as often as maxRetries allows; renew(signal),
// when given, gives the URL again from the File's own context once it is known to have expired. options are the
// download's own: its signal, onProgress, control, job and maxConcurrency, with control, controller and scope checked
// already. halt, a signal, stops it once its destination has failed.
//
// The destination is opened, a file so replaced, only once the download's file has been admitted, and not at all once
// the download has been stopped, by its signal included, before it is opened, even as that admission was granted; and
// destination.close(), when given, closes it before that admission is given back, once. A failure to close it is the
// download's only when nothing else failed.
//
// The download asks for the whole file first. A response other than 200 fails it, unread, with its status, unless a
// retry may answer it: a 429 or 503 after its Retry-After, or another server error after STORAGE_RETRY_MS. One from
// the Files.com web app is refused, whatever its status, before any of its body is used, and so is any response for a
// range. When the response gives the file's version (see versionOf()), a download that breaks asks for the rest of that
// version from the first byte not yet written, and its destination never gets a byte twice; without one, only a
// destination that can start over (see the sinks) is downloaded again from its first byte, and a writable stream that
// has been given bytes fails. A file of at least two ranges, downloaded to disk through Node.js's own https agent, is
// split when a probe of its second range answers in time (see probeSplit() and readRanges()). Every request, its first
// one included, holds a permit of its scope's download requests and one of the download's own, within its
// maxConcurrency, until it has closed and every byte read from its response has been written to the destination, a
// final batch included, or given up (see permits and staging); and the download holds one of its files until it
// settles. Resolves once every byte has been delivered and every request has closed, and every renewal of its URL has
// settled, a stopped one included; rejects with the download's first failure once they have, or with its signal's
// reason, unchanged, when that cancels it, even when that happened while the last bytes were being written. Through a
// configured HTTP client, each send, a redirect's included, is let go only once every callback of it has run, and only
// while the download is neither paused nor stopped (see whenSendable()).
//
// Split, a range other than the first two can be read on one of the SDK's download threads instead (see
// DownloadWorkers.node.js), which sends its request and reads its body, while everything else stays here: its
// admission, permits, URL, retries, the verdict on its response, every write to the destination and every count of
// progress. choosesAgent() tells, as each such request is about to be sent, whether the download has an agent chooser,
// even one that chooses none, which keeps its requests here.
const run = async (destination, {
  agentFor,
  choosesAgent,
  control,
  controller,
  halt,
  log,
  maxRetries,
  openFetch,
  options,
  renew,
  scope,
  timeoutSecs,
  url: givenUrl
}) => {
  const Api = require('../Api.js').default;
  const {
    onProgress,
    signal
  } = options;
  const limiter = scope.requests.download;
  const stopping = new AbortController();
  const exchanges = new Set();
  const progress = (0, _Transfer.createProgress)({
    control,
    direction: 'download',
    onProgress
  });
  let sink = null;
  let failure = null;
  let url = givenUrl;
  let renewal = null;
  let renewalsWithoutProgress = 0;
  let filesHeld = false;

  // Renewals stopped once no request waited for them any more (see freshUrl()), until they have settled: no other
  // renewal starts before they have, and the download joins them before it gives back its admission and settles.
  const stoppedRenewals = new Set();

  // URLs a download thread found expired, by its own clock, as it was about to send a request to one, which it then did
  // not send: each is taken for expired here too, and so given again (see freshUrl()).
  const knownExpired = new Set();
  const isExpired = target => knownExpired.has(target) || Api._storageExpired({
    url: target
  });

  // The bytes received by each request sent through a download thread, as counted so far to progress: a thread counts
  // each chunk as it takes it, in memory both threads share, and those counts are added to progress here before every
  // report of it, so that every report, the last included, counts every byte received, those then given up included,
  // apart from the bytes delivered.
  const threadReceived = new Map();
  const syncReceived = () => {
    threadReceived.forEach((counted, exchange) => {
      const received = exchange.received();
      if (received > counted) {
        threadReceived.set(exchange, received);
        progress.sent(received - counted);
      }
    });
  };

  // The permits each request of the download holds (see openRequest()): one of its scope's download requests, the hard
  // budget its job or the process shares, and one of the download's own requests, at most its maxConcurrency, the most
  // its controller ever admits, so that its first response, which no controller admits, counts within that cap too. Its
  // own is taken first, so that a request waiting for one of its download's own holds none of the scope's.
  const ownRequests = (0, _Transfer.requestLimiter)(controller.snapshot().maximum);
  const permits = {
    acquire: async waitSignal => {
      await ownRequests.acquire(waitSignal);
      try {
        await limiter.acquire(waitSignal);
      } catch (error) {
        ownRequests.release();
        throw error;
      }
    },
    release: () => {
      limiter.release();
      ownRequests.release();
    },
    tryAcquire: () => {
      if (!ownRequests.tryAcquire()) {
        return false;
      }
      if (!limiter.tryAcquire()) {
        ownRequests.release();
        return false;
      }
      return true;
    }
  };

  // Ties exchange's permits to the writing of what is read from its response, until the function it returns is called,
  // once that writing is done or given up: so that the bytes the download still holds to give its destination, a final
  // batch waiting for its write included, are held only by the requests it may have at once, not only until a
  // response has closed.
  const staging = exchange => {
    let written = null;
    // eslint-disable-next-line no-param-reassign
    exchange.staged = new Promise(resolve => {
      written = resolve;
    });
    return written;
  };

  // Whether a download whose request went through agent, the one chosen for its URL, is split (see
  // startsHelpersAtOnce()).
  const splitsAt = agent => openFetch === null && sink.positional && startsHelpersAtOnce(agent);

  // Stops the download, with its first failure: every request it has open, and every wait.
  const stop = error => {
    if (!failure) {
      failure = {
        error
      };
      stopping.abort();
      exchanges.forEach(exchange => exchange.stop());
    }
  };
  const onAbort = () => stop((0, _Transfer.abortReason)(signal));
  const onHalt = () => stop(new Error('Download destination failed'));
  signal?.addEventListener('abort', onAbort, {
    once: true
  });
  halt?.addEventListener('abort', onHalt, {
    once: true
  });
  if (signal?.aborted) {
    onAbort();
  } else if (halt?.aborted) {
    onHalt();
  }

  // Counts bytes delivered to the destination, which also lets the URL be renewed again.
  const delivered = bytes => {
    if (bytes > 0) {
      renewalsWithoutProgress = 0;
    }
    syncReceived();
    progress.accepted(bytes);
  };

  // The download's URL, given again by renew() first when it is known to have expired, by its own signature: requests
  // that find it so at once share one renewal. Without renew(), with a renewal that gives no URL, or one expired
  // already, or a third renewal without a byte delivered since, the download fails, unsent, with the expired-URL error.
  // A request for what owning stands for, such as a split, stops waiting once owning aborts, rejecting with its reason;
  // and a renewal no request waits for any more, all of theirs having so stopped, is stopped itself, its request to the
  // API included, as it is once the download stops, and kept until it has settled (stoppedRenewals), so that another
  // starts only once it has. One a request still waits for goes on.
  const freshUrl = async (owning = null) => {
    if (!isExpired(url)) {
      return url;
    }
    if (!renew) {
      throw expiredUrlError();
    }
    if (!renewal && stoppedRenewals.size > 0) {
      await Promise.all([...stoppedRenewals]);
      return freshUrl(owning);
    }
    if (!renewal) {
      renewalsWithoutProgress += 1;
      if (renewalsWithoutProgress > 2) {
        throw expiredUrlError();
      }
      const current = {
        stopper: new AbortController(),
        waiting: 0
      };
      current.done = renew((0, _Transfer.linkedSignal)([stopping.signal, current.stopper.signal])).then(renewed => {
        if (typeof renewed !== 'string' || renewed === '' || isExpired(renewed)) {
          throw expiredUrlError();
        }
        url = renewed;
      }).finally(() => {
        if (renewal === current) {
          renewal = null;
        }
      });
      current.done.catch(() => {});
      renewal = current;
    }
    const current = renewal;
    current.waiting += 1;
    try {
      await new Promise((resolve, reject) => {
        const onOwnerAbort = () => reject((0, _Transfer.abortReason)(owning));
        const leave = () => owning?.removeEventListener('abort', onOwnerAbort);
        if (owning?.aborted) {
          onOwnerAbort();
          return;
        }
        owning?.addEventListener('abort', onOwnerAbort, {
          once: true
        });
        current.done.then(() => {
          leave();
          resolve();
        }, error => {
          leave();
          reject(error);
        });
      });
    } finally {
      current.waiting -= 1;
      if (current.waiting === 0 && owning?.aborted && renewal === current) {
        renewal = null;
        current.stopper.abort();
        const settling = current.done.then(() => {}, () => {}).then(() => {
          stoppedRenewals.delete(settling);
        });
        stoppedRenewals.add(settling);
      }
    }
    return url;
  };

  // Decides, as the request path is about to hand a request through a configured HTTP client, or a redirect of it, to
  // that client, once every callback and wait of that send is over, whether it goes now (see Api._downloadGate), at
  // once, so that the request path hands it over in the same turn: nothing, when it may; while the download is paused,
  // the promise of its resumption, or of the stop or waitSignal's abort that ends the wait first, after which it is
  // asked again; and it throws, sending nothing, once the download has stopped, with its first failure, or waitSignal,
  // the attempt's, has aborted.
  const whenSendable = (requestUrl, waitSignal) => {
    if (failure) {
      throw failure.error;
    }
    if (waitSignal?.aborted) {
      throw (0, _Transfer.abortReason)(waitSignal);
    }
    return control?.paused ? control._whenRunning((0, _Transfer.linkedSignal)([stopping.signal, waitSignal])) : null;
  };

  // Whether a request, its agent chosen and its options made, can go through a download thread: only one to https's
  // global agent as Node.js gives it, with the larger socket buffer chosen for it (see diskRequestOptions()), for a
  // download with no agent chooser to ask and DEBUG off, whose chunks are then never logged. Judged as each request is
  // about to be sent, without calling any of the caller's choosers or getters; a chooser that cannot be told of is taken
  // to be there.
  const threadable = (agent, requestOptions) => {
    if (agent !== undefined || requestOptions?.highWaterMark !== DISK_SOCKET_HIGH_WATER_MARK || log.enabled) {
      return false;
    }
    try {
      return !choosesAgent();
    } catch {
      return false;
    }
  };

  // Waits for exchange, a request whose permits are held, its last checks here passed, given to a download thread (see
  // DownloadWorkers.node.js), which checks once more, as nothing is left to call or wait for before it is sent, for the
  // download's stop, its pause and its URL's expiry by its own clock, and sends it only when none has come. Resolves as
  // openRequest() does: with { agent, exchange, url } once sent, its permits then given back once its request has closed
  // and what was read from it has been written (see staging()), its received bytes counted until then (see
  // syncReceived()); or, sending nothing, its permits given back at once, with { paused }, { stopped } or
  // { error, terminal }; or, its URL found expired, with { expired }, its permits still held, for openRequest() to give
  // the URL again and ask anew. A request whose thread stopped before it could tell whether it was sent counts as sent:
  // its response then fails it for good (see DownloadWorkers.node.js). A request sent stays the download's to stop until
  // what was read from it has been written, not only until its request has closed, so that a stop that comes while its
  // last batch is still being written reaches its thread too.
  const sendThrough = async (exchange, target, owning) => {
    exchanges.add(exchange);
    if (failure || owning?.aborted) {
      exchange.stop();
    }
    const decided = await exchange.decision;
    if (decided.unsent) {
      exchanges.delete(exchange);
      if (decided.unsent === 'expired') {
        knownExpired.add(target);
        return {
          expired: true
        };
      }
      permits.release();
      if (decided.unsent === 'refused') {
        return {
          error: decided.error,
          terminal: decided.terminal
        };
      }
      if (failure) {
        return {
          error: failure.error,
          terminal: true
        };
      }
      return decided.unsent === 'paused' && !owning?.aborted ? {
        paused: true
      } : {
        stopped: true
      };
    }
    threadReceived.set(exchange, 0);
    exchange.closed.then(() => exchange.staged).then(() => {
      exchanges.delete(exchange);
      syncReceived();
      threadReceived.delete(exchange);
      permits.release();
    });
    return {
      agent: undefined,
      exchange,
      url: target
    };
  };

  // The last check of a request to target whose permits are held, with nothing left to call or wait for before it is
  // sent, for what owning stands for (see openRequest()): why it is not to be sent now, { error, terminal } once the
  // download has stopped, with its first failure, { stopped } once owning has aborted, { paused } while the download is
  // paused, or { expired } once target has expired (see isExpired()), for its URL to be given again; or null.
  const lastCheck = (target, owning) => {
    if (failure) {
      return {
        error: failure.error,
        terminal: true
      };
    }
    if (owning?.aborted) {
      return {
        stopped: true
      };
    }
    if (control?.paused) {
      return {
        paused: true
      };
    }
    return isExpired(target) ? {
      expired: true
    } : null;
  };

  // Sends a request for the download with headers, as the number'th for its bytes, whose permits are already held, for
  // what owning, a signal, stands for besides the download itself, such as a split or its probe, when given: it
  // resolves with { agent, exchange, url } once sent, the permits given back once its request has closed and what was
  // read from it has been written (see staging()); with { paused } when the download was paused by the time it could be
  // sent; with { stopped } when owning had aborted by then, even while its URL was being given again; or with
  // { error, terminal } when it could not be, the permits given back at once, terminal telling whether no retry could
  // send it. Its URL is given again first when it is known to have expired (see freshUrl()); then every callback the
  // request runs before it is sent does: its agent's choice for that URL, the agent's own options, and its log, a
  // callback that throws failing the download. Only then, with nothing left to call or wait for before it is sent, is
  // it checked (see lastCheck()): for the download's stop, owning's, a pause, and its URL's expiry, which gives it again,
  // within freshUrl()'s own limit, and runs those callbacks and checks again. A request for a range that may be read on
  // a download thread (forRange) goes through one when it can (see threadable() and sendThrough()); one that does not,
  // once that has been told, is checked so once more, just before it is sent here.
  const openRequest = async (headers, number, owning = null, forRange = false) => {
    for (;;) {
      let target;
      let agent;
      let requestOptions = null;
      try {
        if (owning?.aborted) {
          throw (0, _Transfer.abortReason)(owning);
        }

        // eslint-disable-next-line no-await-in-loop
        target = await freshUrl(owning);
        agent = agentFor(target);
        if (!openFetch) {
          requestOptions = sink.positional ? diskRequestOptions(agent) : {
            agent
          };
          logDownloadRequest(log, target, headers, number);
        }
      } catch (error) {
        permits.release();
        if (failure) {
          return {
            error: failure.error,
            terminal: true
          };
        }
        return owning?.aborted ? {
          stopped: true
        } : {
          error,
          terminal: true
        };
      }
      let held = lastCheck(target, owning);
      if (held === null) {
        const lane = forRange && threadable(agent, requestOptions) ? require('./DownloadWorkers.node.js').laneFor() : null;

        // A request no download thread could be given has gone nowhere: it is sent here instead.
        const remote = lane === null ? null : lane.open({
          headers,
          highWaterMark: requestOptions.highWaterMark,
          log,
          paused: control ? control._pausedFlag() : null,
          timeoutSecs,
          url: target
        });
        if (remote) {
          // eslint-disable-next-line no-await-in-loop
          const sent = await sendThrough(remote, target, owning);
          if (!sent.expired) {
            return sent;
          }
        } else {
          // Telling whether a download thread could send it, and giving it to one, takes time of its own, this
          // thread's setup described and its agent's CA certificates copied, in which the download can have stopped or
          // been paused, or the URL expired: it is checked once more, as nothing is left now but to send it.
          held = lastCheck(target, owning);
          if (held === null) {
            let exchange;
            try {
              exchange = openFetch ? fetchExchange(openFetch, target, headers, agent, whenSendable) : httpsExchange(target, requestOptions, headers, log, timeoutSecs);
            } catch (error) {
              permits.release();
              return {
                error,
                terminal: isPermanent(error, target)
              };
            }
            exchanges.add(exchange);
            exchange.closed.then(() => {
              exchanges.delete(exchange);
              return exchange.staged;
            }).then(() => permits.release());

            // A stop that came as the request was made, such as from its agent's own handling of it, stops it at once.
            if (failure || owning?.aborted) {
              exchange.stop();
            }
            return {
              agent,
              exchange,
              url: target
            };
          }
        }
      }

      // Sending nothing, its permits are given back; but for a URL that expired, which is given again with them held.
      if (held !== null && !held.expired) {
        permits.release();
        return held;
      }
    }
  };

  // What a response to a request for the whole file, or with range, for its bytes { end, start, version }, leads to:
  // { ok } to read it; or, its body unread, { error, waitMs, throttled, expired } to ask again after waitMs, { error,
  // changed } when the file is no longer the version asked for, or { error, terminal }.
  const verdictOf = (opened, target, range) => {
    if (isFrontendAnswer(opened)) {
      return {
        error: frontendRefusal(),
        terminal: true
      };
    }
    if (range ? isExactRange(opened, range, range.version) : opened.status === 200) {
      return {
        ok: true
      };
    }
    const {
      status
    } = opened;
    if (status === 429 || status === 503) {
      return {
        error: statusError(status),
        throttled: true,
        waitMs: Api._retryAfterMs(opened.headers['retry-after']) ?? 0
      };
    }
    if (Api._isTransientStatus(status)) {
      return {
        error: statusError(status),
        waitMs: STORAGE_RETRY_MS
      };
    }
    if (Api._storageExpired({
      url: target
    })) {
      return {
        error: expiredUrlError(),
        expired: true,
        waitMs: 0
      };
    }
    if (range && [200, 206, 412, 416].includes(status)) {
      return {
        changed: true,
        error: changedFileError()
      };
    }
    return {
      error: statusError(status),
      terminal: true
    };
  };

  // Whether the download, whose ordinary response has just arrived with version, is split: it asks for the second
  // range at once, in a request of its own, while the ordinary response waits unread, and splits only when the
  // controller admits that request and its permits are free at once (see permits), the scope's and the download's own,
  // which its ordinary response holds one of already, and it answers with exactly that range of the same
  // version, intact, within HELPER_RESPONSE_MS. Resolves with that request, { attempt, exchange, opened }; or with null,
  // having stopped it, its body unread, so that the ordinary response gives the whole file.
  const probeSplit = async version => {
    const range = {
      end: Math.min(version.total, 2 * RANGE_BYTES) - 1,
      start: RANGE_BYTES
    };
    const waiting = new AbortController();
    const deadline = setTimeout(() => waiting.abort(), HELPER_RESPONSE_MS);
    const onStop = () => waiting.abort();
    stopping.signal.addEventListener('abort', onStop, {
      once: true
    });
    let attempt = null;
    let sent = null;
    let opened = null;
    try {
      attempt = await controller.admit(waiting.signal);

      // A paused download sends no probe, and so is not split; nor is one once its probe's time is up, as it waits, nor
      // one whose maxConcurrency, its first response counted, leaves no room for it.
      if (!control?.paused && permits.tryAcquire()) {
        sent = await openRequest(rangeHeaders(range, version), 1, waiting.signal);
        if (sent.exchange) {
          attempt.start();
          opened = await answerWithin(sent.exchange, waiting.signal);
        }
      }
    } catch {
      // Not admitted in time, or the download stopped: it is not split.
    } finally {
      clearTimeout(deadline);
      stopping.signal.removeEventListener('abort', onStop);
    }
    if (opened && sent.exchange.isIntact() && !isFrontendAnswer(opened) && isExactRange(opened, range, version)) {
      return {
        attempt,
        exchange: sent.exchange,
        opened
      };
    }
    sent?.exchange?.stop();
    attempt?.abandon();
    return null;
  };

  // The rest of a split download (see probeSplit()): its file in ranges of RANGE_BYTES, the first read from the ordinary
  // response, first, { exchange, opened, written }, which is then stopped, written() giving its permits back once that
  // range has been written, the second from the probe's, and each other one asked for, of the same version, once the
  // controller admits a request and its permits are free: as many at once as the controller's target, which it
  // learns from their measured throughput. A range whose response breaks is asked for again from the first byte of it
  // not yet written, after storage's wait; its failures are counted on their own, and any byte it gains restores them.
  // One whose response breaks only once every byte of it has been written has nothing left to ask for: its failure ends
  // the split. A response of another version, or for other bytes, ends the split, for the whole download to start over
  // (changed).
  // Resolves with { done } once every range has been written, or with the split's first failure, once every request of
  // it has settled.
  const readRanges = async (version, first, probe) => {
    const {
      total
    } = version;
    const ranges = [];
    for (let start = 0; start < total; start += RANGE_BYTES) {
      ranges.push({
        end: Math.min(total, start + RANGE_BYTES) - 1,
        failures: 0,
        next: start
      });
    }
    const queue = ranges.map((_, index) => index).slice(2);
    const tasks = new Set();
    const splitting = new AbortController();
    let outcome = null;
    let wakeScheduler = null;
    const onStop = () => splitting.abort();
    stopping.signal.addEventListener('abort', onStop, {
      once: true
    });
    const wake = () => {
      const resume = wakeScheduler;
      wakeScheduler = null;
      resume?.();
    };
    const end = result => {
      if (!outcome) {
        outcome = result;
        splitting.abort();
        exchanges.forEach(exchange => exchange.stop());
        wake();
      }
    };
    const track = work => {
      const task = work.catch(error => end({
        error
      })).finally(() => {
        tasks.delete(task);
        wake();
      });
      tasks.add(task);
    };

    // Asks for range index again after waitMs, from its next byte, once its request failed with error: unless it has
    // failed more often than the network retries allow without gaining a byte, or the wait cannot be scheduled.
    const again = (index, error, waitMs) => {
      const range = ranges[index];
      range.failures += 1;
      if (range.failures > maxRetries || waitMs > _Transfer.MAX_TIMER_MS) {
        end({
          error
        });
        return;
      }
      track((0, _Transfer.delay)(waitMs, splitting.signal).then(() => {
        queue.unshift(index);
      }, () => {}));
    };

    // Reads range index's bytes from opened, the response exchange gave for them, stopping the response once they are
    // read when it has more (limited), and settles attempt, if any, with what was measured. The exchange's permits are
    // held until what was read has been written, or given up (see staging()). A response a download thread has read
    // (see DownloadWorkers.node.js) gives its body to the same writer here, one batch at a time, written before the
    // thread may read more, with the same outcome as pump()'s.
    const readRangeBytes = async (index, exchange, opened, attempt, limited) => {
      const range = ranges[index];
      const start = range.next;
      const length = range.end - start + 1;
      const writer = sink.writerAt(start, delivered, splitting.signal);
      const read = exchange.readInto ? await exchange.readInto({
        control,
        expected: length,
        signal: splitting.signal,
        writer
      }) : await pump({
        control,
        expected: limited ? null : length,
        limit: limited ? length : null,
        log,
        offset: start,
        opened,
        progress,
        signal: splitting.signal,
        writer
      });
      if (read.ok || read.kind === 'body') {
        try {
          await writer.flush();
        } catch (error) {
          exchange.stop();
          attempt?.abandon();
          end({
            error
          });
          return;
        }
      }
      if (read.ok) {
        range.next = range.end + 1;
        if (limited) {
          exchange.stop();
        } else {
          exchange.finish();
        }
        attempt?.accept(read.received, read.excludedMs);
        return;
      }
      exchange.stop();
      if (read.kind !== 'body') {
        attempt?.abandon();
        end({
          error: read.error
        });
        return;
      }
      if (writer.position > range.next) {
        range.failures = 0;
      }
      range.next = writer.position;
      attempt?.fail();

      // Every byte of the range has been written, and its response failed after them, as one does that never ends: no
      // request is left to ask for the range again with, so that failure is the split's.
      if (range.next > range.end) {
        end({
          error: read.error
        });
        return;
      }
      again(index, read.error, STORAGE_RETRY_MS);
    };
    const readRange = async (index, exchange, opened, attempt, limited) => {
      const written = staging(exchange);
      try {
        await readRangeBytes(index, exchange, opened, attempt, limited);
      } finally {
        written();
      }
    };

    // Asks for the rest of range index, as attempt, admitted already, once a permit is free: at that actual dispatch,
    // only while the split goes on and the download is not paused; otherwise the permit and attempt are given back and
    // the range waits in the queue again, or, once the split has ended, even while its URL was being given again, sends
    // nothing more.
    const fetchRange = async (index, attempt) => {
      const range = ranges[index];
      try {
        await permits.acquire(splitting.signal);
      } catch {
        attempt.abandon();
        return;
      }
      if (outcome || control?.paused) {
        permits.release();
        attempt.abandon();
        if (!outcome) {
          queue.unshift(index);
        }
        return;
      }
      attempt.start();
      const asked = {
        end: range.end,
        start: range.next,
        version
      };
      const sent = await openRequest(rangeHeaders(asked, version), range.failures + 1, splitting.signal, true);
      if (!sent.exchange) {
        attempt.abandon();
        if (sent.stopped) {
          // The split ended meanwhile, with its outcome: nothing was sent for the range.
          return;
        }
        if (sent.paused) {
          queue.unshift(index);
        } else if (sent.terminal) {
          end({
            error: sent.error
          });
        } else {
          again(index, sent.error, STORAGE_RETRY_MS);
        }
        return;
      }
      let opened;
      try {
        opened = await sent.exchange.response;
      } catch (error) {
        // A download thread judged its own request's failure as unanswered() does (see DownloadWorkers.node.js).
        const failed = sent.exchange.failed?.() ?? unanswered(error, sent.url);
        if (failed.terminal) {
          attempt.abandon();
          end({
            error: failed.error
          });
        } else if (failed.unsent) {
          // Nothing was sent: the range waits in the queue again, its URL to be given again, with no failure counted.
          attempt.abandon();
          queue.unshift(index);
        } else if (failed.expired) {
          attempt.abandon();
          again(index, failed.error, 0);
        } else {
          attempt.fail();
          again(index, failed.error, STORAGE_RETRY_MS);
        }
        return;
      }
      const verdict = verdictOf(opened, sent.url, asked);
      if (verdict.ok) {
        await readRange(index, sent.exchange, opened, attempt, false);
        return;
      }
      sent.exchange.stop();

      // A wait no timer can be set for is refused before it reaches the controller.
      if (verdict.waitMs > _Transfer.MAX_TIMER_MS) {
        attempt.fail({
          throttled: verdict.throttled === true
        });
        end({
          error: verdict.error
        });
        return;
      }
      if (verdict.waitMs !== undefined) {
        if (verdict.expired) {
          attempt.abandon();
        } else {
          attempt.fail({
            retryAfterMs: verdict.waitMs,
            throttled: verdict.throttled === true
          });
        }
        again(index, verdict.error, verdict.waitMs);
        return;
      }
      attempt.abandon();
      end(verdict.changed ? {
        changed: true,
        error: verdict.error
      } : {
        error: verdict.error
      });
    };
    const waitForWake = () => new Promise(resolve => {
      wakeScheduler = resolve;
    });

    // The first range's exchange is staged already (see segment()): its permits come back once that range is written.
    track(readRangeBytes(0, first.exchange, first.opened, null, true).finally(first.written));
    track(readRange(1, probe.exchange, probe.opened, probe.attempt, false));
    try {
      while (!outcome && (queue.length > 0 || tasks.size > 0)) {
        if (queue.length === 0) {
          // eslint-disable-next-line no-await-in-loop
          await waitForWake();
        } else {
          // eslint-disable-next-line no-await-in-loop
          await control?._whenRunning(splitting.signal);
          // eslint-disable-next-line no-await-in-loop
          const attempt = await controller.admit(splitting.signal);
          const index = control?.paused || outcome ? undefined : queue.shift();
          if (index === undefined) {
            attempt.abandon();
          } else {
            track(fetchRange(index, attempt));
          }
        }
      }
    } catch {
      // Stopped while waiting: the split's outcome is already set, or the download's failure is.
    }
    while (tasks.size > 0) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all([...tasks]);
    }
    stopping.signal.removeEventListener('abort', onStop);
    if (outcome) {
      return outcome;
    }
    if (failure || !ranges.every(range => range.next > range.end)) {
      return {
        error: failure ? failure.error : incompleteResponse()
      };
    }
    return {
      done: true
    };
  };

  // One run of the download from its first byte: its ordinary request, then its body read in order into the
  // destination, the rest of the same version asked for again from the first byte not yet written whenever it breaks,
  // unless it breaks only once every byte has been written, which leaves nothing to ask for and fails the run; or, when
  // it can be split, its ranges (see readRanges()). Each request's failures, before or while its body is read,
  // are counted, and any byte gained restores them; a request that sent nothing, paused at its dispatch or its URL
  // found expired before it was sent, counts nothing. Resolves with { done }, or with the run's failure, { error },
  // restart or changed telling whether only starting over from the first byte could answer it.
  const runOnce = async () => {
    let committed = 0;
    let version = null;
    let failures = 0;
    let requests = 0;

    // Reads the body of opened, exchange's response, from the first byte not yet written into the destination, and
    // writes it: the segment's outcome (see segment()).
    const readWhole = async (exchange, opened) => {
      const writer = sink.writerAt(committed, delivered, stopping.signal);
      const read = await pump({
        control,
        expected: version ? version.total - committed : declaredBodyLength(opened),
        log,
        offset: committed,
        opened,
        progress,
        signal: stopping.signal,
        writer
      });
      if (read.ok) {
        try {
          await writer.flush();
        } catch (error) {
          exchange.stop();
          return {
            error
          };
        }
        exchange.finish();
        return {
          done: true
        };
      }
      exchange.stop();
      if (read.kind !== 'body') {
        return {
          error: read.error
        };
      }
      if (!version) {
        return {
          error: read.error,
          restart: true
        };
      }
      try {
        await writer.flush();
      } catch (error) {
        return {
          error
        };
      }
      const progressed = writer.position > committed;
      committed = writer.position;

      // Every byte of the file has been written, and its response failed after them, as one does that never ends: no
      // request is left to ask for the rest with, so that failure is the run's.
      if (committed >= version.total) {
        return {
          error: read.error
        };
      }
      return {
        error: read.error,
        progressed,
        waitMs: STORAGE_RETRY_MS
      };
    };
    const segment = async () => {
      await control?._whenRunning(stopping.signal);
      await permits.acquire(stopping.signal);

      // The actual dispatch: a download paused while it waited for its permits gives them back and waits again.
      if (control?.paused) {
        permits.release();
        return {
          paused: true
        };
      }
      const range = committed > 0 ? {
        end: version.total - 1,
        start: committed,
        version
      } : null;
      requests += 1;
      const sent = await openRequest(range ? rangeHeaders(range, version) : {}, requests);
      if (sent.paused) {
        return {
          paused: true
        };
      }
      if (!sent.exchange) {
        return sent.terminal ? {
          error: sent.error
        } : {
          error: sent.error,
          waitMs: STORAGE_RETRY_MS
        };
      }
      const {
        exchange
      } = sent;
      let opened;
      try {
        opened = await exchange.response;
      } catch (error) {
        const failed = unanswered(error, sent.url);
        if (failed.terminal) {
          return {
            error: failed.error
          };
        }
        if (failed.unsent) {
          return {
            again: true
          };
        }
        return {
          error: failed.error,
          waitMs: failed.expired ? 0 : STORAGE_RETRY_MS
        };
      }
      const verdict = verdictOf(opened, sent.url, range);
      if (!verdict.ok) {
        exchange.stop();
        return verdict;
      }

      // The exchange's permits are held until what was read from it has been written, or given up (see staging()),
      // while a split is probed, and, split, until its first range has been.
      const written = staging(exchange);
      try {
        if (!range) {
          version = versionOf(opened);
          progress.setTotal(version ? version.total : declaredBodyLength(opened));
          if (splitsAt(sent.agent) && version && version.total >= 2 * RANGE_BYTES) {
            const probe = await probeSplit(version);
            if (probe) {
              // The download threads its later ranges may be read on start now, if they are not under way already, so
              // that they can be ready by the time those are asked for.
              if (threadable(sent.agent, diskRequestOptions(sent.agent))) {
                require('./DownloadWorkers.node.js').prepare();
              }
              return await readRanges(version, {
                exchange,
                opened,
                written
              }, probe);
            }
          }
        }
        return await readWhole(exchange, opened);
      } finally {
        written();
      }
    };
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      const result = await segment();

      // A paused segment sent nothing, and starts again once the download is resumed; one whose URL was found expired
      // before anything was sent asks again at once, its URL given again.
      if (!result.paused && !result.again) {
        if (result.waitMs === undefined) {
          return result;
        }
        if (result.progressed) {
          failures = 0;
        }
        failures += 1;
        if (failures > maxRetries || result.waitMs > _Transfer.MAX_TIMER_MS) {
          return {
            error: result.error
          };
        }

        // eslint-disable-next-line no-await-in-loop
        await (0, _Transfer.delay)(result.waitMs, stopping.signal);
      }
    }
  };
  let succeeded = false;
  let closeFailure = null;
  try {
    await scope.files.acquire(stopping.signal);
    filesHeld = true;

    // A stop that came while the admission was being given, or since the call, such as a cancellation right after it,
    // leaves the destination unopened, and so a file as it was.
    if (failure) {
      throw failure.error;
    }
    sink = await destination.open();
    if (failure) {
      throw failure.error;
    }
    progress.start();
    let restarts = 0;
    let result = await runOnce();
    while (!result.done) {
      if (!(result.restart || result.changed) || !sink.canReset() || restarts >= maxRetries) {
        throw result.error;
      }
      restarts += 1;
      // eslint-disable-next-line no-await-in-loop
      await (0, _Transfer.delay)(STORAGE_RETRY_MS, stopping.signal);
      // eslint-disable-next-line no-await-in-loop
      await sink.reset();
      syncReceived();
      progress.reset();
      // eslint-disable-next-line no-await-in-loop
      result = await runOnce();
    }

    // A failure that came while the last bytes were being written, such as the download's cancellation, stands: the
    // download does not complete once it has been stopped.
    if (failure) {
      throw failure.error;
    }
    syncReceived();
    progress.finish('completed');
    succeeded = true;
  } catch (error) {
    syncReceived();
    progress.finish('failed');
    throw failure ? failure.error : error;
  } finally {
    signal?.removeEventListener('abort', onAbort);
    halt?.removeEventListener('abort', onHalt);
    exchanges.forEach(exchange => exchange.stop());
    await Promise.all([...exchanges].map(exchange => exchange.closed));

    // Every renewal of its URL, one stopped once no request waited for it included, has settled before the destination
    // is closed and the download's admission given back, whatever it settled with: the download's outcome stays its own.
    while (stoppedRenewals.size > 0 || renewal) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all([...stoppedRenewals, renewal?.done.catch(() => {})]);
    }
    try {
      if (sink !== null) {
        await destination.close?.();
      }
    } catch (error) {
      closeFailure = succeeded ? {
        error
      } : null;
    } finally {
      if (filesHeld) {
        scope.files.release();
      }
    }
  }
  if (closeFailure) {
    throw closeFailure.error;
  }
};

// Checks a download's settings (see run()) before anything is opened or sent, and gives what starts it:
// start(destination, halt). settings.agentFor(url) chooses the agent of a request to url, or else settings.agent is
// every request's; settings.choosesAgent() tells whether the download has an agent chooser, and settings that do not
// say are taken to have one; settings.timeoutSecs is each request's budget through Node.js's https.
const prepare = settings => {
  const options = settings.options ?? {};
  const control = (0, _Transfer.controlOf)(options.control);
  const scope = (0, _Transfer.scopeOf)(options.job);
  if (options.onProgress !== undefined && options.onProgress !== null && typeof options.onProgress !== 'function') {
    throw new errors.InvalidParameterError('Bad parameter: onProgress must be a function');
  }
  const controller = (0, _Transfer.controllerFor)(scope, {
    direction: 'download',
    maxConcurrency: options.maxConcurrency
  });
  return (destination, halt = null) => run(destination, {
    agentFor: settings.agentFor ?? (() => settings.agent),
    choosesAgent: settings.choosesAgent ?? (() => true),
    control,
    controller,
    halt,
    log: settings.log ?? silentLog,
    maxRetries: settings.maxRetries ?? 0,
    openFetch: settings.openFetch ?? null,
    options,
    renew: settings.renew ?? null,
    scope,
    timeoutSecs: settings.timeoutSecs ?? 0,
    url: settings.url
  });
};

// Downloads settings.url into the file at destinationPath, replacing it (see run()): the file is opened, and so
// emptied, only once the download's file has been admitted and before anything is asked for, and never once the download
// has been cancelled before. Resolves once every byte has been written, every request has closed and the file is
// closed, without flushing it to storage; rejects, having closed the file, left incomplete, with the download's failure,
// or with the file's own when closing it fails. A response other than 200 writes none of its body.
const downloadUrlToFile = async (destinationPath, settings) => {
  const start = prepare(settings);
  const fs = require('fs');
  let handle = null;
  await start({
    close: () => handle?.close(),
    open: async () => {
      handle = await fs.promises.open(destinationPath, 'w');
      return fileSink(handle);
    }
  });
};

// Downloads settings.url into stream (see deliverToStream() and run()), as fast as the stream takes it, ending it once
// every byte has been written to it.
exports.downloadUrlToFile = downloadUrlToFile;
const downloadUrlToStream = async (stream, settings) => {
  const start = prepare(settings);
  return deliverToStream(stream, (fail, stopWith, isDone) => {
    const halt = new AbortController();
    stopWith(() => halt.abort());
    return start({
      open: async () => writableSink(stream, isDone)
    }, halt.signal);
  });
};

// Downloads settings.url as UTF-8 text (see run()).
exports.downloadUrlToStream = downloadUrlToStream;
const downloadUrlToString = async settings => {
  const start = prepare(settings);
  const sink = textSink();
  await start({
    open: async () => sink
  });
  return sink.text();
};

// A response body as a Node.js readable stream: as it is, one made from a WHATWG ReadableStream, or an empty one for
// none.
exports.downloadUrlToString = downloadUrlToString;
const nodeReadableOf = body => {
  const {
    Readable
  } = require('stream');
  if (body === null || body === undefined) {
    return Readable.from([]);
  }
  return typeof body.pipe === 'function' && typeof body.on === 'function' ? body : Readable.fromWeb(body);
};

// A Node.js readable stream of the SDK's own that carries body, a Node.js readable stream, to its reader in body's
// place (see startAttempt in Api.js), as { stop, stream }. stream reads body only once its own reader reads, and no
// faster than that reader takes it, giving body's chunks as they come, in body's own mode and encoding: bytes as bytes,
// objects as objects, and the strings of a body with an encoding, such as one setEncoding('latin1') decodes, as those
// strings. observe(chunk), when given, as at DEBUG, sees each chunk as stream is given it, and keeps none. It ends when
// body ends, fails with body's own error when body fails, and closes early when body closes before its end; destroying
// it destroys body. stop(error) destroys stream, and so body, with body's own error when body has already failed, even
// in the same turn, before stream could observe it, or else with error. stream then fails at once, whatever a destroy()
// of body's own waits for, and nothing body emits from then on, such as an abort error its HTTP client gives it as its
// request is aborted, reaches stream. body's error listener stays, so that such an error never goes unhandled.
exports.nodeReadableOf = nodeReadableOf;
const nodeReadableCarrierOf = (body, observe = null) => {
  const {
    Readable
  } = require('stream');
  let taking = false;
  let detached = false;
  const stream = new Readable({
    // Completes at once, stopping body as it does.
    destroy: (error, callback) => {
      detached = true;
      body.destroy(error);
      callback(error);
    },
    encoding: body.readableEncoding,
    highWaterMark: body.readableHighWaterMark,
    objectMode: body.readableObjectMode,
    read() {
      if (!taking) {
        taking = true;

        // A string chunk is pushed as text in body's encoding, so that it stays as it is while stream has that
        // encoding, and is decoded afresh from its own bytes if stream's reader chooses another. A byte chunk, as a body
        // without an encoding gives, is pushed as it is.
        body.on('data', chunk => {
          observe?.(chunk);
          if (!this.push(chunk, body.readableEncoding)) {
            body.pause?.();
          }
        });
      }
      body.resume?.();
    }
  });
  body.on('error', error => {
    if (!detached) {
      stream.destroy(error);
    }
  });
  body.on('end', () => {
    if (!detached) {
      stream.push(null);
    }
  });
  body.on('close', () => {
    if (!detached && !body.readableEnded) {
      stream.destroy();
    }
  });

  // A body that has failed, ended or closed before its end already.
  if (body.errored) {
    stream.destroy(body.errored);
  } else if (body.readableEnded) {
    stream.push(null);
  } else if (body.destroyed) {
    stream.destroy();
  }
  return {
    stop: error => stream.destroy(body.errored ?? error),
    stream
  };
};
exports.nodeReadableCarrierOf = nodeReadableCarrierOf;