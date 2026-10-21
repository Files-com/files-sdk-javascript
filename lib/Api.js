"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
var _Files = _interopRequireDefault(require("./Files"));
var errors = _interopRequireWildcard(require("./Errors"));
var _Logger = _interopRequireWildcard(require("./Logger"));
var _utils = require("./utils");
var _attachmentBody = require("./utils/attachmentBody");
var _Api;
var _excluded = ["timeoutSecs"],
  _excluded2 = ["client", "fetch", "getAgentForUrl"],
  _excluded3 = ["headers"],
  _excluded4 = ["headers"],
  _excluded5 = ["signal"];
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof3(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof3(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof3(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var abortError = function abortError() {
  var error = new Error('The operation was aborted');
  error.name = 'AbortError';
  return error;
};

// What a cancelled call rejects with: its signal's reason, unchanged, whatever it is, falsy values included; or, when
// the runtime gives the signal no reason, an Error named AbortError.
var abortReason = function abortReason(signal) {
  if (signal.reason !== undefined) {
    return signal.reason;
  }
  return abortError();
};

// A cancellation on its way to the caller. A signal's reason can be any value, even one an ordinary failure could also
// be, so it travels wrapped until Api._sendVerbatim rejects with the reason itself.
var cancellations = new WeakSet();
var cancellation = function cancellation(signal) {
  var wrapper = {
    reason: abortReason(signal)
  };
  cancellations.add(wrapper);
  return wrapper;
};
var isCancellation = function isCancellation(error) {
  return cancellations.has(error);
};

// A failure that is the call's own error, as it is, such as that of the API request that renews a storage URL (see
// storageRetries). It travels wrapped, so that Api._sendVerbatim rejects with it unchanged rather than with a FilesError
// made of it.
var ownFailures = new WeakSet();
var ownFailure = function ownFailure(failure) {
  var wrapper = {
    failure: failure
  };
  ownFailures.add(wrapper);
  return wrapper;
};

// A response body that is a Node Readable stream, rather than, say, a WHATWG stream.
var isNodeReadable = function isNodeReadable(body) {
  return typeof (body === null || body === void 0 ? void 0 : body.on) === 'function' && typeof body.destroy === 'function';
};

// Resolves once a Node Readable body has an outcome, as its public events and state record it: it has ended, having
// been read to its end, or failed, or closed. It neither reads nor stops the body, and it waits for no abort: whatever
// stops the body brings about the outcome. Its error listener stays, so that a later failure is never an unhandled
// stream error.
var readableOutcome = function readableOutcome(body) {
  return new Promise(function (resolve) {
    body.on('error', resolve);
    if (body.readableEnded || body.closed) {
      resolve();
    } else {
      body.once('end', resolve);
      body.once('close', resolve);
    }
  });
};

// Whether a response body is a WHATWG stream that can be handed on in a stream of the SDK's own (see watchedStream):
// one no reader holds yet, in a runtime with WHATWG streams.
var isWatchableStream = function isWatchableStream(body) {
  return typeof (body === null || body === void 0 ? void 0 : body.getReader) === 'function' && !body.locked && typeof globalThis.ReadableStream === 'function';
};

// What a Node.js stream is destroyed with, so that it fails with reason: reason itself whenever it is truthy, an Error or
// any other value, which destroy() keeps as it is; or, for a falsy reason (null, false, 0, NaN, ''), which destroy()
// takes for no error at all and would only close the stream early, an Error named AbortError, with code ABORT_ERR and
// reason as its cause, as Node.js's own addAbortSignal() fails a stream.
var nodeStreamError = function nodeStreamError(reason) {
  return reason || Object.assign(new Error('The operation was aborted', {
    cause: reason
  }), {
    code: 'ABORT_ERR',
    name: 'AbortError'
  });
};

// The Node.js stream to hand a Node.js body on in, as { stop, stream } (see nodeReadableCarrierOf, in
// isomorphic/File.node.js): one of the SDK's own, which stop(error) fails with error at once, or with the body's own
// error when that came first, and which gives each chunk to observe, when given, as its reader takes it; or, without
// Node.js's own streams, as in a browser bundle, which leaves isomorphic/File.node.js out, the body itself, which
// stop(error) destroys with error.
var nodeCarrierOf = function nodeCarrierOf(body) {
  var _require;
  var observe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var carrierOf = (_require = require('./isomorphic/File.node.js')) === null || _require === void 0 ? void 0 : _require.nodeReadableCarrierOf;
  return carrierOf ? carrierOf(body, observe) : {
    stop: function stop(error) {
      return body.destroy(error);
    },
    stream: body
  };
};

// The size of the buffer each default read of a byte stream handed on (see watchedStream) reads its source into.
var BYTE_READ_SIZE = 65536;

// A WHATWG stream of body's own data, which reads body only as its own reader asks: never ahead of it, and never once
// it is done with. A byte stream is read with a BYOB reader, so that a source that answers BYOB requests alone works as
// well as one that enqueues its bytes, and is handed on as a byte stream, which BYOB and default readers alike can read:
// each read reads body into a buffer as large as the reader's own, or of BYTE_READ_SIZE for a default reader, so body's
// bytes come as they are, in pieces of at most that size. Any other stream is handed on as one of body's own chunks.
//
// onOutcome() is called once, as soon as body has an outcome: read to its end through this stream; failed, which fails
// this stream with body's own error, even while nothing reads it, observed without reading body; or cancelled by this
// stream's reader, which cancels body with the same reason, unchanged. A body that has closed has no outcome until its
// data has been read through this stream.
//
// stopNow(reason) fails this stream with reason, unchanged, and cancels body with it, unless body has had its outcome
// already, which then stands. stop(reason) reads nothing more of body from then on, and does the same once every
// reaction to body's outcome already queued has run. A failure of body reaches this stream only in such a reaction,
// to its reader's closed promise, which runs as a job of its own after body fails, so a body that failed before the
// stop, even in the same turn, keeps its own error.
//
// The reader this stream holds of body is given up, releasing body's lock, once body has had its outcome and no read
// of it is under way: once read to its end, once failed, and once cancelled, by this stream's reader or a stop, once
// that cancellation has settled. body is then left as its outcome left it, for its owner. giveUp(reason) ends this
// stream as one nobody will read: when no read of body is under way, whether or not some of it has been read through
// this stream, it fails this stream with reason and releases body's lock, leaving body as its reader left it, the rest
// of its data unread and its owner's, neither cancelled nor read further, as it would be had this stream never held it;
// otherwise, a read of body still under way, which nothing will take, it stops it, as stop(reason) does.
//
// observe(chunk), when given, as at DEBUG, sees each chunk of body as this stream's reader is given it, and keeps none.
var watchedStream = function watchedStream(body, onOutcome) {
  var observe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var byteReader = null;
  try {
    byteReader = body.getReader({
      mode: 'byob'
    });
  } catch (_unused) {
    // Not a byte stream, which a default reader reads.
  }
  var reader = byteReader !== null && byteReader !== void 0 ? byteReader : body.getReader();
  var streamController = null;
  var done = false;
  var stopping = false;
  var released = false;
  var reading = false;
  var releaseReader = function releaseReader() {
    if (!released) {
      released = true;
      try {
        reader.releaseLock();
      } catch (_unused2) {
        // A runtime that refuses while a read is under way, which none is by then, leaves body locked, as it was.
      }
    }
  };

  // Gives this stream its outcome: false, doing nothing, when it has had one already.
  var finish = function finish() {
    if (done) {
      return false;
    }
    done = true;
    onOutcome();
    return true;
  };

  // body has failed, which has failed any read of it under way.
  var fail = function fail(error) {
    if (finish()) {
      streamController.error(error);
    }
    releaseReader();
  };
  var stopNow = function stopNow(reason) {
    if (finish()) {
      streamController.error(reason);
      reader.cancel(reason).catch(function () {}).then(releaseReader);
    }
  };
  var stream = new globalThis.ReadableStream(_objectSpread(_objectSpread({}, byteReader ? {
    autoAllocateChunkSize: BYTE_READ_SIZE,
    type: 'bytes'
  } : {}), {}, {
    cancel: function cancel(reason) {
      finish();
      return reader.cancel(reason).finally(releaseReader);
    },
    pull: function () {
      var _pull = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(controller) {
        var request, chunk, _controller$byobReque, _t;
        return _regenerator.default.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // A read of a byte stream always has a request, its own buffer or one of BYTE_READ_SIZE, to fill. A read once
              // this stream is stopping reads nothing of body, and waits for the stop's outcome.
              request = byteReader ? controller.byobRequest : null;
              if (!(stopping || byteReader && !request)) {
                _context.next = 1;
                break;
              }
              return _context.abrupt("return");
            case 1:
              reading = true;
              _context.prev = 2;
              _context.next = 3;
              return request ? byteReader.read(new Uint8Array(request.view.byteLength)) : reader.read();
            case 3:
              chunk = _context.sent;
              _context.next = 5;
              break;
            case 4:
              _context.prev = 4;
              _t = _context["catch"](2);
              fail(_t);
              return _context.abrupt("return");
            case 5:
              _context.prev = 5;
              reading = false;
              return _context.finish(5);
            case 6:
              if (!(done || stopping)) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return");
            case 7:
              if (!chunk.done) {
                _context.next = 8;
                break;
              }
              finish();
              releaseReader();
              controller.close();

              // A read still waiting as a byte stream closes is answered with no bytes, as it must be.
              (_controller$byobReque = controller.byobRequest) === null || _controller$byobReque === void 0 || _controller$byobReque.respond(0);
              return _context.abrupt("return");
            case 8:
              observe === null || observe === void 0 || observe(chunk.value);
              if (request) {
                request.view.set(chunk.value);
                request.respond(chunk.value.byteLength);
              } else {
                controller.enqueue(chunk.value);
              }
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 4, 5, 6]]);
      }));
      function pull(_x) {
        return _pull.apply(this, arguments);
      }
      return pull;
    }(),
    start: function start(controller) {
      streamController = controller;
    }
  }), {
    highWaterMark: 0
  });

  // A failure of body, observed even while nothing reads this stream, and without reading body. A body that closes, or
  // is cancelled, fulfils this instead.
  reader.closed.catch(fail);
  var stop = function stop(reason) {
    stopping = true;

    // A job queued now runs after every reaction already queued, such as one to a failure of body.
    Promise.resolve().then(function () {
      return stopNow(reason);
    });
  };
  return {
    giveUp: function giveUp(reason) {
      if (reading) {
        stop(reason);
        return;
      }
      stopping = true;
      if (finish()) {
        streamController.error(reason);
      }
      releaseReader();
    },
    stop: stop,
    stopNow: stopNow,
    stream: stream
  };
};

// A request's stream body as it is sent at DEBUG, as { body, settle(reason) }: a Node.js stream in a carrier of the
// SDK's own (see nodeCarrierOf); a WHATWG one in a stream of the SDK's own that reads it only as the HTTP client reads
// it, a byte stream as a byte stream, which BYOB and default readers alike can read, its source read with a BYOB
// reader (see watchedStream), each chunk given to observe as it goes and kept by neither. The source's failure, and the
// client's cancellation, reach each other unchanged. settle(reason), once the request has ended, gives up the reader the
// observer holds, so that nothing of the SDK's own goes on holding the caller's stream: a body read to its end, failed
// or cancelled has settled already; one the HTTP client never read, or read only in part and then let go, is let go as
// the HTTP client left it, unlocked, neither cancelled nor read further, the rest of its data its owner's, as it is
// below DEBUG; and one whose read, made for the HTTP client, is still under way, which nothing will take, is cancelled
// with reason. A WHATWG body some reader already holds, or any other body, is sent as it is, and settle() does nothing.
var observedRequestBody = function observedRequestBody(body, observe) {
  if (isNodeReadable(body)) {
    return {
      body: nodeCarrierOf(body, observe).stream,
      settle: function settle() {}
    };
  }
  if (!isWatchableStream(body)) {
    return {
      body: body,
      settle: function settle() {}
    };
  }
  var watched = watchedStream(body, function () {}, observe);
  return {
    body: watched.stream,
    settle: function settle(reason) {
      return watched.giveUp(reason);
    }
  };
};

// One attempt of a request, from sending it, through its redirects, until its response body has been read to its end,
// within one timeout budget of timeoutSecs (no limit when it is 0 or less). The attempt's signal aborts when the
// caller's signal does, or already has, or the budget runs out, which stops the attempt wherever it is: waiting for a
// response, reading one or delivering a body handed on unread. end() releases the timer and the caller's signal and
// stops whatever the attempt still has open. endWithBody(body, complete) hands a body on unread, and returns the stream
// to hand on: the attempt keeps it, budget and signal included, until its outcome, which releases the timer and the
// caller's signal, and stopping the attempt before then fails the stream, as the call has already resolved, with the
// caller's signal's reason or the budget's "Request timed out" FilesError; a complete body, of a response without
// content, has its outcome already.
var startAttempt = function startAttempt(callerSignal, timeoutSecs) {
  var controller = new AbortController();
  var stoppedBy = null;
  var released = false;
  var handedOn = false;
  var handedCarrier = null;
  var handedStream = null;
  var timer = null;
  var onCallerAbort = null;

  // What the attempt's end also settles, once: such as the reader a DEBUG observer holds of the request's own body.
  var endings = [];
  var release = function release() {
    if (!released) {
      released = true;
      clearTimeout(timer);
      callerSignal === null || callerSignal === void 0 || callerSignal.removeEventListener('abort', onCallerAbort);
      endings.splice(0).forEach(function (ending) {
        return ending();
      });
    }
  };

  // What a body handed on fails with when the attempt is stopped: the caller's signal's reason itself (see abortReason),
  // or the budget's "Request timed out" FilesError.
  var stopReason = function stopReason(cause) {
    return cause === 'caller' ? abortReason(callerSignal) : new errors.FilesError('Request timed out');
  };
  var stop = function stop(cause) {
    if (!stoppedBy) {
      stoppedBy = cause;
      var reason = stopReason(cause);

      // A body already handed on is stopped as well, and its outcome then releases the attempt. A Node.js body, handed
      // on in a stream of the SDK's own (see nodeCarrierOf), stops with the reason, as nodeStreamError gives it, or with
      // the body's own error when that came first, and the request is aborted at once: the stream fails whatever the
      // body's own destruction waits for, and nothing the body emits from then on, such as an abort error its HTTP client
      // gives it as the request is aborted, reaches the stream's reader. A WHATWG body fails with the reason itself, and
      // its source is cancelled with it, unless it has failed first (see watchedStream). Any other body handed on has
      // nothing more for the attempt to wait for.
      if (handedCarrier) {
        handedCarrier.stop(nodeStreamError(reason));
        controller.abort();
      } else {
        var _handedStream;
        (_handedStream = handedStream) === null || _handedStream === void 0 || _handedStream.stop(reason);
        controller.abort();
        if (handedOn) {
          release();
        }
      }
    }
  };
  onCallerAbort = function onCallerAbort() {
    return stop('caller');
  };
  callerSignal === null || callerSignal === void 0 || callerSignal.addEventListener('abort', onCallerAbort);
  if (callerSignal !== null && callerSignal !== void 0 && callerSignal.aborted) {
    stop('caller');
  } else if (!(timeoutSecs <= 0)) {
    var _timer$unref, _timer;
    timer = setTimeout(function () {
      return stop('timeout');
    }, timeoutSecs * 1000);

    // The budget alone never keeps the process running, as it would for a body its caller leaves unread.
    (_timer$unref = (_timer = timer).unref) === null || _timer$unref === void 0 || _timer$unref.call(_timer);
  }
  return {
    end: function end() {
      release();
      controller.abort();
    },
    // A complete body, of a response without content (see hasNoContent), is handed on itself, unread and unchanged, and
    // releases the attempt at once: nothing more of it can arrive, nor be stopped. A Node Readable body is handed on in
    // a Node.js stream of the SDK's own (see nodeCarrierOf), of the same chunks, read only as its reader reads, which
    // stays within the attempt until its outcome: read to its end, failed, or closed or destroyed. A WHATWG stream is
    // handed on in a stream of the attempt's own (see watchedStream), of the same kind and bytes, read only as its
    // reader asks, whose outcome is body's: read to its end, failed, or cancelled by its reader, with its reason. Either
    // outcome is observed before anything can stop the body, and a stop that came first stops it at once. Any other
    // body is handed on itself, and can only be stopped, by the budget or the caller's signal. observe(chunk), when
    // given, as at DEBUG, sees each chunk of a Node.js or WHATWG body as its reader takes it.
    endWithBody: function endWithBody(body) {
      var complete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var observe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      handedOn = true;
      if (complete) {
        release();
        return body;
      }
      if (isNodeReadable(body)) {
        handedCarrier = nodeCarrierOf(body, observe);
        readableOutcome(handedCarrier.stream).then(release);
        if (stoppedBy) {
          handedCarrier.stream.destroy(nodeStreamError(stopReason(stoppedBy)));
        }
        return handedCarrier.stream;
      }
      if (isWatchableStream(body)) {
        handedStream = watchedStream(body, release, observe);
        if (stoppedBy) {
          handedStream.stopNow(stopReason(stoppedBy));
        }
        return handedStream.stream;
      }
      if (stoppedBy) {
        release();
      }
      return body;
    },
    // The error the attempt failed with, named for what stopped it. Only an abort of the attempt's own signal is
    // renamed: the caller's cancellation, or the budget running out. A failure of any other kind keeps its own error,
    // even if the caller's signal aborts after it.
    failure: function failure(error) {
      if (!stoppedBy || (error === null || error === void 0 ? void 0 : error.name) !== 'AbortError') {
        return error;
      }
      return stoppedBy === 'caller' ? cancellation(callerSignal) : new errors.FilesError('Request timed out');
    },
    // Settles ending() once the attempt ends: when it is ended, or a body it handed on has had its outcome; at once when
    // it already has.
    onEnd: function onEnd(ending) {
      if (released) {
        ending();
      } else {
        endings.push(ending);
      }
    },
    signal: controller.signal
  };
};

// Waits ms milliseconds before a retry. The call's signal ends the wait at once with its cancellation, and one aborted
// already sets no timer at all.
var waitBeforeRetry = function waitBeforeRetry(ms, signal) {
  return new Promise(function (resolve, reject) {
    if (signal !== null && signal !== void 0 && signal.aborted) {
      reject(cancellation(signal));
      return;
    }
    var timer = null;
    var onAbort = function onAbort() {
      clearTimeout(timer);
      reject(cancellation(signal));
    };
    timer = setTimeout(function () {
      signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal === null || signal === void 0 || signal.addEventListener('abort', onAbort, {
      once: true
    });
  });
};
var FILES_AUTH_HEADERS = ['X-FilesAPI-Key', 'X-FilesAPI-Auth', 'X-Files-Workspace-Id'];
var NODE_FETCH_SENSITIVE_HEADERS = ['authorization', 'www-authenticate', 'cookie', 'cookie2'];
var REDIRECT_STATUSES = [301, 302, 303, 307, 308];
var MAX_REDIRECTS = 20;

// X-Files-Cursor-Next is the documented next-page cursor; X-Files-Cursor is read only when it is absent.
var nextCursorOf = function nextCursorOf(response) {
  var _response$headers$xF, _response$headers, _response$headers2;
  return (_response$headers$xF = response === null || response === void 0 || (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers['x-files-cursor-next']) !== null && _response$headers$xF !== void 0 ? _response$headers$xF : response === null || response === void 0 || (_response$headers2 = response.headers) === null || _response$headers2 === void 0 ? void 0 : _response$headers2['x-files-cursor'];
};

// The page requests of item iterators (Api._iterate), and the requests of actions whose completion can be waited for
// (Api._sendAction and Api._continueAction), keyed by the options object each request is made with. Such a request is
// not auto-paginated: its response goes back to the SDK's own caller, which reads the next cursor from it, if any, and
// so does its operation's context.
var pageResponses = new WeakMap();

// The context of a list operation, { credential, headers, origin }, taken when its first request is made, before
// anything else can change the settings: the site it is sent to, a private copy of its headers, and the credential and
// workspace they send. Every later request of the operation, such as its next pages, is sent with that same context
// (see Api.sendRequest), whatever the settings have become since; a lockout region mismatch moves only its origin (see
// Api._sendVerbatim). It is kept only for the SDK's own copies of the operation's options, keyed by the options object
// of the request it belongs to, never by the caller's own, and the request that continues the operation takes it, so
// that nothing else made with the same options, such as a model's later call, continues the operation.
var operationContexts = new WeakMap();

// The credential a request to the API sends, with the workspace it acts in, as Api.sendRequest chooses them and keeps
// them on the SDK's own copy of the call's options: { name, settings, value, workspace }, the X-FilesAPI-Auth or
// X-FilesAPI-Key header and its value, whether both the credential and the workspace are the settings' own rather than
// the call's, and the X-Files-Workspace-Id it sends, or null for none; or null when the request sends no credential, as
// creating a session does.
var requestCredential = Symbol('requestCredential');

// The workspace a request sends as X-Files-Workspace-Id, as a string, or null when it sends none.
var workspaceOf = function workspaceOf(workspaceId) {
  return workspaceId !== null && workspaceId !== undefined && "".concat(workspaceId) !== '' ? "".concat(workspaceId) : null;
};

// Whether two requests send the same credential, in the same workspace.
var isSameCredential = function isSameCredential(first, second) {
  return Boolean(first && second && first.name === second.name && first.value === second.value && first.workspace === second.workspace);
};

// The credential and workspace a request made with config's own would send now: its session, or else its API key, in
// its workspace.
var settingsCredentialOf = function settingsCredentialOf(config) {
  var workspace = workspaceOf(config.getWorkspaceId());
  var sessionId = config.getSessionId();
  if (sessionId) {
    return {
      name: 'X-FilesAPI-Auth',
      value: sessionId,
      workspace: workspace
    };
  }
  var apiKey = config.getApiKey();
  return apiKey ? {
    name: 'X-FilesAPI-Key',
    value: apiKey,
    workspace: workspace
  } : null;
};

// The copies of the global settings that item iterators made without a client request their pages with
// (Files._currentSettings()). A request made with one still points to Files' setters when the API key is missing.
var globalSettingsCopies = new WeakSet();

// Plain objects and arrays: the JSON-like containers that params are made of.
var isContainer = function isContainer(value) {
  return Array.isArray(value) || (0, _utils.isObject)(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
};

// A copy of value with its JSON-like containers copied at every depth, such as the sort_by or filter map of list params.
// Any other value, such as a string, a Date or a function, is kept as given, and so is a container where it recurs
// within itself, rather than being copied without end.
var _copyContainers = function copyContainers(value) {
  var ancestors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
  if (!isContainer(value) || ancestors.has(value)) {
    return value;
  }
  ancestors.add(value);
  var copy = Array.isArray(value) ? value.map(function (item) {
    return _copyContainers(item, ancestors);
  }) : Object.fromEntries(Object.entries(value).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      item = _ref2[1];
    return [key, _copyContainers(item, ancestors)];
  }));
  ancestors.delete(value);
  return copy;
};
var withoutHeaders = function withoutHeaders(headers, names) {
  var normalizedNames = names.map(function (name) {
    return name.toLowerCase();
  });
  return Object.fromEntries(Object.entries(headers || {}).filter(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
      name = _ref4[0];
    return !normalizedNames.includes(name.toLowerCase());
  }));
};
var isDomainOrSubdomain = function isDomainOrSubdomain(originalUrl, destinationUrl) {
  var originalHostname = new URL(originalUrl).hostname;
  var destinationHostname = new URL(destinationUrl).hostname;
  return originalHostname === destinationHostname || destinationHostname.endsWith(".".concat(originalHostname));
};
var isSameProtocol = function isSameProtocol(firstUrl, secondUrl) {
  return new URL(firstUrl).protocol === new URL(secondUrl).protocol;
};

// Reads a response body to its end without keeping it, so that its connection can be used again, and resolves once the
// body's outcome has been observed: ended, failed or closed. A Node Readable body is drained, and a WHATWG stream read
// to its end. signal, its attempt's, never ends that wait: when it has aborted, or aborts first (the budget running out
// or the caller's signal), it stops the body, by destroying or cancelling it, and the wait goes on for the outcome that
// brings about. It never rejects. observe(chunk), when given, as at DEBUG, sees each chunk as it is read, and keeps
// none of them.
var drainResponse = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(response, signal) {
    var observe,
      body,
      outcome,
      _stopBody,
      reader,
      stopBody,
      done,
      read,
      _args2 = arguments,
      _t2;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          observe = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : null;
          body = response.body;
          if (!isNodeReadable(body)) {
            _context2.next = 2;
            break;
          }
          outcome = readableOutcome(body);
          _stopBody = function _stopBody() {
            return body.destroy();
          };
          if (signal !== null && signal !== void 0 && signal.aborted) {
            _stopBody();
          } else {
            signal === null || signal === void 0 || signal.addEventListener('abort', _stopBody, {
              once: true
            });
            if (observe) {
              body.on('data', observe);
            }
            body.resume();
          }
          _context2.next = 1;
          return outcome;
        case 1:
          signal === null || signal === void 0 || signal.removeEventListener('abort', _stopBody);
          return _context2.abrupt("return");
        case 2:
          if (!(typeof (body === null || body === void 0 ? void 0 : body.getReader) !== 'function' || body.locked)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return");
        case 3:
          reader = body.getReader();
          stopBody = function stopBody() {
            reader.cancel().catch(function () {});
          };
          if (signal !== null && signal !== void 0 && signal.aborted) {
            stopBody();
          } else {
            signal === null || signal === void 0 || signal.addEventListener('abort', stopBody, {
              once: true
            });
          }
          _context2.prev = 4;
          done = false;
        case 5:
          if (done) {
            _context2.next = 7;
            break;
          }
          _context2.next = 6;
          return reader.read();
        case 6:
          read = _context2.sent;
          done = read.done;
          if (!done) {
            observe === null || observe === void 0 || observe(read.value);
          }
          _context2.next = 5;
          break;
        case 7:
          _context2.next = 9;
          break;
        case 8:
          _context2.prev = 8;
          _t2 = _context2["catch"](4);
        case 9:
          _context2.prev = 9;
          signal === null || signal === void 0 || signal.removeEventListener('abort', stopBody);
          return _context2.finish(9);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 8, 9, 10]]);
  }));
  return function drainResponse(_x2, _x3) {
    return _ref5.apply(this, arguments);
  };
}();

// Reads at most limit bytes of a response's body as text, then stops the body, and resolves once its outcome has been
// observed, as drainResponse does, with that text: so that a refused response is settled within a bounded read, which
// signal, its attempt's, can still stop. A body that fails gives what was read before. It never rejects.
var boundedText = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(response, signal, limit) {
    var body, chunks, length, keep, outcome, stopBody, _reader, _stopBody2, read, bytes, offset, _t3;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          body = response.body;
          chunks = [];
          length = 0;
          keep = function keep(chunk) {
            if (length < limit) {
              var view = typeof chunk === 'string' ? new globalThis.TextEncoder().encode(chunk) : chunk;
              var kept = view.subarray(0, limit - length);
              chunks.push(kept);
              length += kept.length;
            }
          };
          if (!isNodeReadable(body)) {
            _context3.next = 2;
            break;
          }
          outcome = readableOutcome(body);
          stopBody = function stopBody() {
            return body.destroy();
          };
          if (signal !== null && signal !== void 0 && signal.aborted) {
            stopBody();
          } else {
            signal === null || signal === void 0 || signal.addEventListener('abort', stopBody, {
              once: true
            });
            body.on('data', function (chunk) {
              keep(chunk);
              if (length >= limit) {
                stopBody();
              }
            });
            body.resume();
          }
          _context3.next = 1;
          return outcome;
        case 1:
          signal === null || signal === void 0 || signal.removeEventListener('abort', stopBody);
          _context3.next = 10;
          break;
        case 2:
          if (!(typeof (body === null || body === void 0 ? void 0 : body.getReader) === 'function' && !body.locked)) {
            _context3.next = 10;
            break;
          }
          _reader = body.getReader();
          _stopBody2 = function _stopBody2() {
            _reader.cancel().catch(function () {});
          };
          signal === null || signal === void 0 || signal.addEventListener('abort', _stopBody2, {
            once: true
          });
          _context3.prev = 3;
        case 4:
          if (!(length < limit && !(signal !== null && signal !== void 0 && signal.aborted))) {
            _context3.next = 7;
            break;
          }
          _context3.next = 5;
          return _reader.read();
        case 5:
          read = _context3.sent;
          if (!read.done) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("continue", 7);
        case 6:
          keep(read.value);
          _context3.next = 4;
          break;
        case 7:
          _stopBody2();
          _context3.next = 9;
          break;
        case 8:
          _context3.prev = 8;
          _t3 = _context3["catch"](3);
        case 9:
          _context3.prev = 9;
          signal === null || signal === void 0 || signal.removeEventListener('abort', _stopBody2);
          return _context3.finish(9);
        case 10:
          bytes = new Uint8Array(length);
          offset = 0;
          chunks.forEach(function (chunk) {
            bytes.set(chunk, offset);
            offset += chunk.length;
          });
          return _context3.abrupt("return", new globalThis.TextDecoder().decode(bytes));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 8, 9, 10]]);
  }));
  return function boundedText(_x4, _x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();

// The logger for a call's messages: Logger itself, with the global log settings, for a call made without a client, or
// one with the log level and application logger of the call's client.
var loggerFor = function loggerFor(config) {
  return config === _Files.default ? _Logger.default : {
    debug: function debug() {
      for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
        messages[_key] = arguments[_key];
      }
      return _Logger.default._log.apply(_Logger.default, [config, _Logger.LogLevel.DEBUG].concat(messages));
    },
    info: function info() {
      for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        messages[_key2] = arguments[_key2];
      }
      return _Logger.default._log.apply(_Logger.default, [config, _Logger.LogLevel.INFO].concat(messages));
    }
  };
};

// At DEBUG, every response's status and headers, whatever the debugging settings (see Files.configureDebugging()).
var logResponseHead = function logResponseHead(response, headers, log) {
  log.debug("Status: ".concat(response.status, " ").concat(response.statusText));
  log.debug('Response Headers: ');
  log.debug(headers);
};

// At DEBUG only, what logs each chunk of a payload stream as its reader takes it, the chunk itself, never a copy kept
// for the log: for config's log settings as they are when the stream is handed on; null below DEBUG, so that nothing is
// done for each chunk.
var payloadObserver = function payloadObserver(config, prefix) {
  if (config.getLogLevel() < _Logger.LogLevel.DEBUG) {
    return null;
  }
  var log = loggerFor(config);
  return function (chunk) {
    return log.debug(prefix, chunk);
  };
};

// Whether a response has no content, whatever body its HTTP client gives it: a 204 No Content, a 205 Reset Content, or
// one whose Content-Length is 0. Such a body is empty and complete: nothing more of it can arrive.
var hasNoContent = function hasNoContent(status, headers) {
  return status === 204 || status === 205 || headers['content-length'] === '0';
};

// A retryable response is discarded within its attempt: its JSON or text body is read only at DEBUG, to log it, and any
// other body is drained to its end, each chunk logged as it is drained at DEBUG. Either way it resolves only once the
// body's outcome has been observed, which the attempt's budget or the caller's signal can bring about by stopping it. A
// body that could not be read is stopped, and its outcome awaited too. A failed read never changes the retry, unless the
// caller's signal stopped it: the call is then cancelled, and nothing is retried.
var logAndDiscardResponse = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(response, config, attempt) {
    var log, headers, contentType, isReadable, failure, _body, _t4;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          log = loggerFor(config);
          headers = Object.fromEntries(response.headers.entries());
          logResponseHead(response, headers, log);
          contentType = headers['content-type'] || '';
          isReadable = contentType.includes('application/json') || contentType.includes('text/');
          if (!(!isReadable || config.getLogLevel() < _Logger.LogLevel.DEBUG)) {
            _context4.next = 2;
            break;
          }
          _context4.next = 1;
          return drainResponse(response, attempt.signal, payloadObserver(config, 'Response Data: '));
        case 1:
          return _context4.abrupt("return");
        case 2:
          _context4.prev = 2;
          _context4.next = 3;
          return response.text();
        case 3:
          _body = _context4.sent;
          log.debug('Response Data: ');
          log.debug(_body);
          return _context4.abrupt("return");
        case 4:
          _context4.prev = 4;
          _t4 = _context4["catch"](2);
          failure = attempt.failure(_t4);
          if (isNodeReadable(response.body)) {
            response.body.destroy();
          }
          _context4.next = 5;
          return drainResponse(response, attempt.signal);
        case 5:
          if (!isCancellation(failure)) {
            _context4.next = 6;
            break;
          }
          throw failure;
        case 6:
          log.debug("Unable to read response data: ".concat(failure.message));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 4]]);
  }));
  return function logAndDiscardResponse(_x7, _x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();
var ABSOLUTE_URL = /^[a-z][a-z\d+.-]*:/i;

// An absolute URL that is malformed or whose protocol is not HTTP(S) can never be fetched, so retrying it only
// repeats the same failure. Input that does not parse is permanent only when it starts with a scheme; a relative URL
// is left to the platform to resolve, as before.
var isUnfetchableAbsoluteUrl = function isUnfetchableAbsoluteUrl(url) {
  try {
    return !['http:', 'https:'].includes(new URL(url).protocol);
  } catch (_unused5) {
    return ABSOLUTE_URL.test(url);
  }
};

// Failures that a request would meet again however often it were sent, so that it is never sent again: the redirect
// limit reached, a redirect that cannot be followed, a redirect to a URL that can never be fetched or whose signature
// has expired, or an HTTP client that followed a redirect itself (see fetchWithRedirects). Only an object can be
// recorded here; a request's other failures are recognized by what they are (see isPermanentFailure).
var permanentFailures = new WeakSet();
var permanently = function permanently(error) {
  if (error !== null && (0, _typeof2.default)(error) === 'object') {
    permanentFailures.add(error);
  }
  return error;
};

// The codes Node.js gives a TLS certificate that failed verification, on the error itself or, through a WHATWG fetch(),
// on its cause.
var TLS_VERIFICATION_FAILURES = new Set(['CERT_CHAIN_TOO_LONG', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID', 'CERT_REJECTED', 'CERT_REVOKED', 'CERT_SIGNATURE_FAILURE', 'CERT_UNTRUSTED', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'ERR_TLS_CERT_ALTNAME_INVALID', 'HOSTNAME_MISMATCH', 'INVALID_CA', 'INVALID_PURPOSE', 'PATH_LENGTH_EXCEEDED', 'SELF_SIGNED_CERT_IN_CHAIN', 'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY', 'UNABLE_TO_DECRYPT_CERT_SIGNATURE', 'UNABLE_TO_GET_ISSUER_CERT', 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE']);

// The codes of network failures that show a request never reached its server: its host was not found, or refused the
// connection. They show nothing of the kind for a failure that came once its server had answered it with a redirect
// (see the answered state of an attempt, in fetchWithRedirects).
var UNSENT_FAILURES = new Set(['EAI_AGAIN', 'ECONNREFUSED', 'ENOTFOUND']);
var failureCodeOf = function failureCodeOf(failure) {
  var _failure$code, _failure$cause;
  return (_failure$code = failure === null || failure === void 0 ? void 0 : failure.code) !== null && _failure$code !== void 0 ? _failure$code : failure === null || failure === void 0 || (_failure$cause = failure.cause) === null || _failure$cause === void 0 ? void 0 : _failure$cause.code;
};

// The longest wait a timer can be set for, in milliseconds, in Node.js and browsers alike. A longer one would fire at
// once instead.
var MAX_TIMER_MS = 2147483647;

// Whether a wait of ms milliseconds can be scheduled as it is: finite, not negative, and no longer than a timer allows.
// A wait that cannot is never shortened to one that can.
var isSchedulable = function isSchedulable(ms) {
  return Number.isFinite(ms) && ms >= 0 && ms <= MAX_TIMER_MS;
};

// Failures of an attempt whose target was found to have expired as it was to be sent, once every caller callback of
// that send had run: nothing of it was sent, and a renewal can still give the attempt another target (see
// fetchWithRetry).
var expiredAtDispatch = new WeakSet();

// Whether a request to url that failed with failure, without a response, would fail the same way if sent again: its URL
// can never be fetched, its server's TLS certificate failed verification, or the failure is one of permanentFailures.
// Nothing else is, an opaque failure such as a browser's TypeError included.
var isPermanentFailure = function isPermanentFailure(failure, url) {
  return permanentFailures.has(failure) || isUnfetchableAbsoluteUrl(url) || TLS_VERIFICATION_FAILURES.has(failureCodeOf(failure));
};

// A status that may be different when the request is sent again: 429 Too Many Requests, or a server error other than
// 501 Not Implemented.
var isTransientStatus = function isTransientStatus(status) {
  return status === 429 || status >= 500 && status !== 501;
};

// How a request is retried, within the settings' maxNetworkRetries, once its attempt has failed with a network failure
// that is not permanent, has run out of time before its response arrived, or has a transient status: whether it may be,
// by mayRetryFailure(failure, answered) or mayRetryStatus(status, answered), where answered tells whether the request's
// server had already answered it in that attempt, with a redirect the SDK then followed; and how long to wait first,
// delayMs(config, retries, response), for its retries'th retry, which is not retried at all when that wait cannot be
// scheduled. If given, beforeSend(url, options, signal, { previousFailure, retries }) resolves before each attempt, the
// first included, once any wait for it is over, with the URL and options to send it with, or rejects instead of
// sending it; and beforeDispatch(url, hop) checks each request of an attempt, its redirects included, as it is about
// to be sent, throwing instead of sending it.
//
// The API's requests, every method alike, wait the settings' minNetworkRetryDelay before their first retry and twice as
// long before each one after it, up to maxNetworkRetryDelay: by default, 100, 200 and 400 ms.
var apiRetries = {
  delayMs: function delayMs(config, retries) {
    return Math.min(config.getMinNetworkRetryDelay() * Math.pow(2, retries), config.getMaxNetworkRetryDelay()) * 1000;
  },
  mayRetryFailure: function mayRetryFailure() {
    return true;
  },
  mayRetryStatus: isTransientStatus
};

// An API request whose outcome must be known, such as an upload's finalization, which must never be repeated blindly,
// is retried only after a failure that shows it was not carried out: a 429, or a network failure before it reached the
// server, each only when the server had not already answered the request with a redirect. A server error, a broken
// connection, an attempt that ran out of time, or any failure or status once its server had answered with a redirect,
// leaves its outcome unknown, and the request fails with that failure or status.
var unambiguousApiRetries = _objectSpread(_objectSpread({}, apiRetries), {}, {
  mayRetryFailure: function mayRetryFailure(failure, answered) {
    return !answered && UNSENT_FAILURES.has(failureCodeOf(failure));
  },
  mayRetryStatus: function mayRetryStatus(status, answered) {
    return !answered && status === 429;
  }
});

// The wait, in milliseconds, that a Retry-After header asks for, as a number of seconds or a date, however long; or null
// when it asks for none that can be read. A wait too long to schedule is given as it is, never shortened, and so fails
// the request rather than retrying it early (see isSchedulable).
var retryAfterMs = function retryAfterMs(value) {
  var given = typeof value === 'string' ? value.trim() : '';
  if (/^\d+$/.test(given)) {
    return Number(given) * 1000;
  }
  var time = given === '' ? NaN : Date.parse(given);
  return Number.isFinite(time) ? Math.max(0, time - Date.now()) : null;
};

// The query parameters of a signed storage URL that give when it was signed and for how many seconds it is valid: S3's,
// Files.com's and Google Cloud Storage's.
var SIGNED_URL_VALIDITIES = [['x-amz-date', 'x-amz-expires'], ['x-files-date', 'x-files-expires'], ['x-goog-date', 'x-goog-expires']];

// A time a signature gives, in milliseconds: in the basic ISO 8601 form signatures use, such as 20261019T120000Z, or in
// any form Date.parse() reads; or null.
var signedTimeOf = function signedTimeOf(value) {
  var basic = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value !== null && value !== void 0 ? value : '');
  if (basic) {
    var _basic$slice$map = basic.slice(1).map(Number),
      _basic$slice$map2 = (0, _slicedToArray2.default)(_basic$slice$map, 6),
      year = _basic$slice$map2[0],
      month = _basic$slice$map2[1],
      day = _basic$slice$map2[2],
      hours = _basic$slice$map2[3],
      minutes = _basic$slice$map2[4],
      seconds = _basic$slice$map2[5];
    return Date.UTC(year, month - 1, day, hours, minutes, seconds);
  }
  var time = Date.parse(value !== null && value !== void 0 ? value : '');
  return Number.isFinite(time) ? time : null;
};

// When a signed URL expires, in milliseconds, by its own query: its signing time plus its seconds, or, for an Azure
// shared access signature, its se; the earliest, when it gives several; or null when it gives none.
var signedUrlExpiryOf = function signedUrlExpiryOf(url) {
  var query;
  try {
    query = (0, _toConsumableArray2.default)(new URL(url).searchParams.entries());
  } catch (_unused6) {
    return null;
  }
  var parameter = function parameter(name) {
    var _query$find$, _query$find;
    return (_query$find$ = (_query$find = query.find(function (_ref8) {
      var _ref9 = (0, _slicedToArray2.default)(_ref8, 1),
        key = _ref9[0];
      return key.toLowerCase() === name;
    })) === null || _query$find === void 0 ? void 0 : _query$find[1]) !== null && _query$find$ !== void 0 ? _query$find$ : null;
  };
  var expiries = SIGNED_URL_VALIDITIES.map(function (_ref0) {
    var _parameter;
    var _ref1 = (0, _slicedToArray2.default)(_ref0, 2),
      dateName = _ref1[0],
      secondsName = _ref1[1];
    var signedAt = signedTimeOf(parameter(dateName));
    var seconds = (_parameter = parameter(secondsName)) !== null && _parameter !== void 0 ? _parameter : '';
    return signedAt !== null && /^\d+$/.test(seconds) ? signedAt + Number(seconds) * 1000 : null;
  });
  if (parameter('sig') !== null) {
    expiries.push(signedTimeOf(parameter('se')));
  }
  var known = expiries.filter(function (expiry) {
    return expiry !== null;
  });
  return known.length > 0 ? Math.min.apply(Math, (0, _toConsumableArray2.default)(known)) : null;
};

// When a storage target expires, in milliseconds: the earlier of the expires the API gave for it, if any, and its URL's
// own; or null when neither is known.
var expiryOf = function expiryOf(target) {
  var given = typeof target.expires === 'string' ? Date.parse(target.expires) : NaN;
  var known = [Number.isFinite(given) ? given : null, signedUrlExpiryOf(target.url)].filter(function (expiry) {
    return expiry !== null;
  });
  return known.length > 0 ? Math.min.apply(Math, (0, _toConsumableArray2.default)(known)) : null;
};
var hasExpired = function hasExpired(target) {
  var expiry = expiryOf(target);
  return expiry !== null && expiry <= Date.now();
};

// The headers of a request to storage: those given, never the API's credentials or workspace.
var storageHeadersOf = function storageHeadersOf(headers) {
  return withoutHeaders(headers, FILES_AUTH_HEADERS);
};

// Every error that a request to storage known to have expired fails with, so that the transfer owning it can renew its
// URL (see storageAttempt).
var expiredUrlErrors = new WeakSet();
var expiredUrlError = function expiredUrlError() {
  var error = new errors.FilesError('The signed URL had expired before the request could be sent');
  expiredUrlErrors.add(error);
  return error;
};

// Those of them that a download's one attempt failed with before any of its requests was sent (see
// Api._openStorageDownload), so that its transfer can renew the URL without counting the attempt as sent.
var unsentExpiries = new WeakSet();

// How a request to storage, to target ({ agent, expires, headers, method, replay, url }, see Api._sendStorageRequest),
// is retried, separately from the API's requests: a 429 or 503 after the wait its Retry-After asks for, or at once
// without one, so that its signed URL is not left to expire; anything else after 100 ms. With replay false, as when an
// upload's part may not be sent again, it is never retried, and its failure is the caller's to handle.
//
// A target known to have expired, by the API's expires for it or its URL's own signature, whichever is earlier, is
// never sent. That is checked before each attempt, the first included, once any wait for it is over, and again for
// each request of the attempt, its redirects included, as it is about to be sent, once every caller callback of that
// send has run. For an expired target, renew(), when given, resolves with a target to send the request to instead, or
// null for none: at most once for the request's first send and once for each retry, whether its target was found
// expired before the attempt or as its first request was about to be sent. Without a target that has not expired, as
// when the renewed one has expired already, or expires again before that send or retry is made, the request fails
// without being sent. A target found expired as an attempt's first request was about to be sent sent nothing: the
// attempt is made once more, as the same send or retry, to renew it, and that new attempt has a budget of its own
// (see fetchWithRetry). A redirect to an expired URL is never followed. A failure of renew() is the request's, as it
// is.
//
// A retry sends the request's bytes again, which only the target it is then sent to can allow: when a renewal gives
// one with replay false, the request is not sent again, and fails as its last attempt did.
var storageRetries = function storageRetries(target, renew) {
  var current = target;

  // The send or retry, by its retries, that a renewal was last made for, and the one whose attempt was last made once
  // more after its target was found expired as it was to be sent, so that neither happens more than once for the
  // request's first send or any one retry.
  var renewedFor = null;
  var redispatchedFor = null;
  return {
    // Each request of an attempt, as it is sent: url is its actual URL, the target's own at hop 0, a redirect's after.
    beforeDispatch: function beforeDispatch(url, hop) {
      if (!hasExpired({
        expires: current.expires,
        url: url
      })) {
        return;
      }
      var error = expiredUrlError();
      if (hop === 0) {
        expiredAtDispatch.add(error);
        throw error;
      }
      throw permanently(error);
    },
    beforeSend: function () {
      var _beforeSend = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(url, options, signal, _ref10) {
        var previousFailure, retries, next, renewed, _t5;
        return _regenerator.default.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              previousFailure = _ref10.previousFailure, retries = _ref10.retries;
              next = {
                options: options,
                url: url
              };
              if (!hasExpired(current)) {
                _context5.next = 8;
                break;
              }
              if (!(!renew || renewedFor === retries)) {
                _context5.next = 1;
                break;
              }
              throw expiredUrlError();
            case 1:
              renewedFor = retries;
              renewed = null;
              _context5.prev = 2;
              _context5.next = 3;
              return renew();
            case 3:
              renewed = _context5.sent;
              _context5.next = 5;
              break;
            case 4:
              _context5.prev = 4;
              _t5 = _context5["catch"](2);
              throw signal !== null && signal !== void 0 && signal.aborted ? cancellation(signal) : ownFailure(_t5);
            case 5:
              if (!(signal !== null && signal !== void 0 && signal.aborted)) {
                _context5.next = 6;
                break;
              }
              throw cancellation(signal);
            case 6:
              if (!(!renewed || hasExpired(renewed))) {
                _context5.next = 7;
                break;
              }
              throw expiredUrlError();
            case 7:
              current = renewed;
              next = {
                options: _objectSpread(_objectSpread({}, options), {}, {
                  agent: renewed.agent,
                  headers: storageHeadersOf(renewed.headers),
                  method: renewed.method
                }),
                url: renewed.url
              };
            case 8:
              if (!(retries > 0 && current.replay === false)) {
                _context5.next = 9;
                break;
              }
              throw previousFailure;
            case 9:
              return _context5.abrupt("return", next);
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 4]]);
      }));
      function beforeSend(_x0, _x1, _x10, _x11) {
        return _beforeSend.apply(this, arguments);
      }
      return beforeSend;
    }(),
    delayMs: function delayMs(config, retries, response) {
      if ((response === null || response === void 0 ? void 0 : response.status) === 429 || (response === null || response === void 0 ? void 0 : response.status) === 503) {
        var _retryAfterMs;
        return (_retryAfterMs = retryAfterMs(response.headers.get('retry-after'))) !== null && _retryAfterMs !== void 0 ? _retryAfterMs : 0;
      }
      return 100;
    },
    mayRetryFailure: function mayRetryFailure() {
      return current.replay !== false;
    },
    mayRetryStatus: function mayRetryStatus(status) {
      return current.replay !== false && isTransientStatus(status);
    },
    // Whether an attempt, by its retries, whose target was found expired as it was to be sent, may be made once more,
    // which renews its target unless a renewal has been made for those retries already.
    redispatch: function redispatch(retries) {
      if (!renew || redispatchedFor === retries) {
        return false;
      }
      redispatchedFor = retries;
      return true;
    }
  };
};

// How one attempt of a request to storage is sent when the transfer that makes it owns its retries, renewals and
// replay permission (see Upload.js and isomorphic/File.node.js), so that no retry loop runs inside another: never
// retried here, and never sent once target is known to have expired, before the attempt or as each of its requests,
// redirects included, is about to be sent. Such an expiry fails it with the expired-URL FilesError, the redirect never
// followed. dispatched records, for good, whether any request of the attempt has been handed to its HTTP client: once
// one has, the attempt may have been carried out, whatever becomes of it after, an expired redirect's refusal
// included, and only an attempt that sent nothing is unsent, for its owner to renew without counting it as sent.
var storageAttempt = function storageAttempt(target) {
  var policy = {
    beforeDispatch: function beforeDispatch(url) {
      if (hasExpired({
        expires: target.expires,
        url: url
      })) {
        throw expiredUrlError();
      }
    },
    beforeSend: function () {
      var _beforeSend2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(url, options) {
        return _regenerator.default.wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!hasExpired(target)) {
                _context6.next = 1;
                break;
              }
              throw expiredUrlError();
            case 1:
              return _context6.abrupt("return", {
                options: options,
                url: url
              });
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function beforeSend(_x12, _x13) {
        return _beforeSend2.apply(this, arguments);
      }
      return beforeSend;
    }(),
    delayMs: function delayMs() {
      return 0;
    },
    dispatched: false,
    mayRetryFailure: function mayRetryFailure() {
      return false;
    },
    mayRetryStatus: function mayRetryStatus() {
      return false;
    },
    onDispatch: function onDispatch() {
      policy.dispatched = true;
    }
  };
  return policy;
};

// The request option, on the SDK's own copy of a call's options, with the policy its requests are retried by (see
// apiRetries), when it is not the API's.
var retryPolicy = Symbol('retryPolicy');

// The request option, on the SDK's own copy of a call's options, that has a call whose caller has no use for the body
// it would return unread, such as an upload part's acknowledgement, drain that body, or stop it, and observe its outcome
// within its attempt, before resolving (see Api._sendStorageRequest).
var settlingBody = Symbol('settlingBody');

// The request option, on the SDK's own copy of a call's options, that makes a call to storage one attempt whose outcome
// its transfer classifies itself (see Api._sendStorageAttempt): it resolves with any response's status and headers, its
// body settled, a refused response's text read within REFUSED_TEXT_BYTES, or with the failure of an attempt that had
// no response, instead of rejecting.
var singleAttempt = Symbol('singleAttempt');

// The most of a refused storage response's body read, to classify it and, at DEBUG, to log it.
var REFUSED_TEXT_BYTES = 64 * 1024;

// Whether a request body is a stream, which a WHATWG fetch() sends only with duplex: 'half'.
var isStreamBody = function isStreamBody(body) {
  return typeof (body === null || body === void 0 ? void 0 : body.pipe) === 'function' || typeof (body === null || body === void 0 ? void 0 : body.getReader) === 'function';
};
var REGION_MISMATCH_TYPE = 'not-authenticated/lockout-region-mismatch';
var LEGACY_REGION_MISMATCH_PREFIX = 'You have connected to a URL';

// The host a lockout region mismatch names, as { host }, with host null when it names none, or null for any other
// response. A mismatch is a 403: the typed not-authenticated/lockout-region-mismatch error, whose host is its data.host
// or else its X-Files-Host header, or the legacy plain-text one that begins "You have connected to a URL" and names its
// host in X-Files-Host, without which it is not one.
var regionMismatchOf = function regionMismatchOf(status, headers, data) {
  if (status !== 403) {
    return null;
  }
  var headerHost = headers['x-files-host'] || null;
  var errorData = Array.isArray(data) ? data[0] : data;
  if ((0, _typeof2.default)(errorData) === 'object' && errorData !== null && errorData.type === REGION_MISMATCH_TYPE) {
    var _errorData$data;
    var dataHost = (_errorData$data = errorData.data) === null || _errorData$data === void 0 ? void 0 : _errorData$data.host;
    return {
      host: typeof dataHost === 'string' && dataHost || headerHost
    };
  }
  if (typeof data === 'string' && data.startsWith(LEGACY_REGION_MISMATCH_PREFIX) && headerHost) {
    return {
      host: headerHost
    };
  }
  return null;
};

// The HTTPS origin of the host a mismatch names, such as https://mysite.files.com for mysite.files.com, or null when it
// is not one: a host with credentials, a path, a query or a fragment, or one of another protocol, http included.
var regionOriginOf = function regionOriginOf(host) {
  if (typeof host !== 'string' || host === '') {
    return null;
  }
  var url;
  try {
    url = new URL(ABSOLUTE_URL.test(host) ? host : "https://".concat(host));
  } catch (_unused7) {
    return null;
  }
  var isOriginOnly = url.pathname === '/' && !url.search && !url.hash && !url.username && !url.password;
  return url.protocol === 'https:' && isOriginOnly ? url.origin : null;
};

// Files.com's own hosts, which a mismatch may move a request's credentials to without asking: files.com and its
// subdomains, on the default HTTPS port.
var isFilesComOrigin = function isFilesComOrigin(origin) {
  var _URL = new URL(origin),
    hostname = _URL.hostname,
    port = _URL.port;
  return port === '' && (hostname === 'files.com' || hostname.endsWith('.files.com'));
};

// Whether a request body can be sent again as it was: an attachment body that can still be replayed, or any body that
// is not a stream.
var canResend = function canResend(body) {
  if (body instanceof _attachmentBody.AttachmentBody) {
    return body.canReplay();
  }
  return !(typeof (body === null || body === void 0 ? void 0 : body.pipe) === 'function' || typeof (body === null || body === void 0 ? void 0 : body.getReader) === 'function');
};

// Why a lockout region mismatch from from, the origin its request was sent to, is not followed, or null when it is.
var regionRefusalOf = function regionRefusalOf(_ref11, from, config, retries, body) {
  var approved = _ref11.approved,
    host = _ref11.host,
    origin = _ref11.origin;
  if (!host) {
    return 'no-host';
  }
  if (!approved) {
    return 'untrusted-host';
  }
  if (origin === from) {
    return 'same-host';
  }
  if (config.getFollowRegionMismatch() === false) {
    return 'disabled';
  }
  if (retries >= config.getMaxNetworkRetries()) {
    return 'retry-budget';
  }
  if (!canResend(body)) {
    return 'body-not-replayable';
  }
  return null;
};

// What becomes of a lockout region mismatch from from, the origin its request was sent to, as its retries'th retry:
// its details, as the error keeps them when it is not followed, and whether it is followed, to origin. Only an HTTPS
// host is ever trusted: a Files.com host, or one the settings' trustRegionHost(origin, from) returns true for.
var regionRouteOf = function regionRouteOf(mismatch, from, config, retries, body) {
  var origin = regionOriginOf(mismatch.host);
  var trustRegionHost = config.getTrustRegionHost();
  var approved = origin !== null && (isFilesComOrigin(origin) || typeof trustRegionHost === 'function' && trustRegionHost(origin, from) === true);
  var reason = regionRefusalOf({
    approved: approved,
    host: mismatch.host,
    origin: origin
  }, from, config, retries, body);
  return {
    details: {
      approved: approved,
      from: from,
      host: mismatch.host,
      origin: origin,
      reason: reason
    },
    follow: reason === null,
    origin: origin
  };
};

// Resolves with the response; url, the URL it answered: the last request's, once every redirect is followed; and
// crossedOrigin, whether any redirect on the way led to another origin, which the credentials were left behind at, even
// when a later one led back. transport is { getAgentForUrl, send, whenSendable }: send(url, init), the HTTP client's
// fetch(), sends each request, redirects included, with the agent getAgentForUrl or the options choose for its URL as
// init.agent. It is called as a function, as fetch() itself is, never as a method of transport, which a browser's own
// fetch() refuses as its receiver; a fetch bound to a receiver of its own keeps it. whenSendable(url, signal), when
// given, by a transfer that owns the request (see Api._openStorageDownload), decides for each request, a redirect's
// included, once every caller callback of that send, its agent's choice included, has run, whether it may be sent now:
// it gives nothing when it may; a promise to wait for while the transfer is paused, after which it is asked again; and
// it throws, so that nothing is sent, once the transfer has stopped or signal, the attempt's, has aborted. The decision
// that lets the request go, then the expiry check, are made in the same turn as the request is handed to the HTTP
// client, with nothing awaited between them, so that nothing queued meanwhile can change what was decided.
//
// Only the SDK follows redirects, so that credentials never cross to another origin: each request is sent with
// redirect: 'manual', and a response that its HTTP client reports as redirected, having followed a redirect itself,
// fails the request.
//
// progress is what the attempt has come to: progress.beforeDispatch(url, hop), if given, checks each request as it is
// about to be sent, once every caller callback of that send has run, and throws instead of sending it (see
// storageRetries); progress.onDispatch(), if given, records each request handed to the HTTP client, before it is (see
// storageAttempt); progress.answered becomes true once the request's server has answered it with a redirect that is
// followed, so that what becomes of the request after that is never taken to show that it was not carried out.
var _fetchWithRedirects = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(url, options, transport, progress) {
    var _transport$getAgentFo, _progress$beforeDispa, _progress$onDispatch, _options$follow, _options$signal;
    var redirectCount,
      crossedOrigin,
      agent,
      redirectMode,
      init,
      wait,
      send,
      response,
      location,
      maxRedirects,
      redirectUrl,
      staysInOrigin,
      redirectedHeaders,
      redirectedOptions,
      method,
      _args7 = arguments,
      _t6,
      _t7;
    return _regenerator.default.wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          redirectCount = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : 0;
          crossedOrigin = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : false;
          agent = ((_transport$getAgentFo = transport.getAgentForUrl) === null || _transport$getAgentFo === void 0 ? void 0 : _transport$getAgentFo.call(transport, url)) || options.agent || options.httpsAgent || options.httpAgent;
          redirectMode = options.redirect || 'follow';
          init = _objectSpread(_objectSpread({}, options), {}, {
            agent: agent,
            redirect: redirectMode === 'follow' ? 'manual' : redirectMode
          }, isStreamBody(options.body) ? {
            duplex: 'half'
          } : {});
          if (!transport.whenSendable) {
            _context7.next = 3;
            break;
          }
          wait = transport.whenSendable(url, options.signal);
        case 1:
          if (!wait) {
            _context7.next = 3;
            break;
          }
          _context7.next = 2;
          return wait;
        case 2:
          wait = transport.whenSendable(url, options.signal);
          _context7.next = 1;
          break;
        case 3:
          // From the decision above to handing the request to the HTTP client, nothing is awaited.
          (_progress$beforeDispa = progress.beforeDispatch) === null || _progress$beforeDispa === void 0 || _progress$beforeDispa.call(progress, url, redirectCount);
          (_progress$onDispatch = progress.onDispatch) === null || _progress$onDispatch === void 0 || _progress$onDispatch.call(progress);
          send = transport.send;
          _context7.prev = 4;
          _context7.next = 5;
          return send(url, init);
        case 5:
          response = _context7.sent;
          _context7.next = 7;
          break;
        case 6:
          _context7.prev = 6;
          _t6 = _context7["catch"](4);
          throw redirectCount > 0 && isUnfetchableAbsoluteUrl(url) ? permanently(_t6) : _t6;
        case 7:
          if (!(response.redirected === true)) {
            _context7.next = 9;
            break;
          }
          _context7.next = 8;
          return drainResponse(response, options.signal);
        case 8:
          throw permanently(new errors.FilesError('The HTTP client followed a redirect itself: it must leave redirects to the SDK'));
        case 9:
          location = response.headers.get('location');
          if (!(redirectMode !== 'follow' || !REDIRECT_STATUSES.includes(response.status) || !location)) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", {
            crossedOrigin: crossedOrigin,
            response: response,
            url: url
          });
        case 10:
          // The server has answered the request: it may have carried it out, whatever its redirect leads to.
          // eslint-disable-next-line no-param-reassign
          progress.answered = true;
          maxRedirects = (_options$follow = options.follow) !== null && _options$follow !== void 0 ? _options$follow : MAX_REDIRECTS; // A redirect that fails here keeps its own error, which it fails with only once its body's outcome has been observed,
          // within the attempt.
          if (!(redirectCount >= maxRedirects)) {
            _context7.next = 12;
            break;
          }
          _context7.next = 11;
          return drainResponse(response, options.signal);
        case 11:
          throw permanently(new errors.FilesError("maximum redirect reached at: ".concat(url)));
        case 12:
          _context7.prev = 12;
          redirectUrl = new URL(location, url).toString();
          _context7.next = 15;
          break;
        case 13:
          _context7.prev = 13;
          _t7 = _context7["catch"](12);
          _context7.next = 14;
          return drainResponse(response, options.signal);
        case 14:
          throw permanently(new errors.FilesError("Invalid redirect location at: ".concat(url)));
        case 15:
          staysInOrigin = new URL(url).origin === new URL(redirectUrl).origin;
          redirectedHeaders = staysInOrigin ? options.headers : withoutHeaders(options.headers, FILES_AUTH_HEADERS);
          if (!isDomainOrSubdomain(url, redirectUrl) || !isSameProtocol(url, redirectUrl)) {
            redirectedHeaders = withoutHeaders(redirectedHeaders, NODE_FETCH_SENSITIVE_HEADERS);
          }
          redirectedOptions = _objectSpread(_objectSpread({}, options), {}, {
            headers: redirectedHeaders
          });
          method = (redirectedOptions.method || 'GET').toUpperCase();
          if (!(response.status !== 303 && redirectedOptions.body && typeof redirectedOptions.body.pipe === 'function')) {
            _context7.next = 17;
            break;
          }
          _context7.next = 16;
          return drainResponse(response, options.signal);
        case 16:
          throw permanently(new errors.FilesError('Cannot follow redirect with body being a readable stream'));
        case 17:
          if (response.status === 303 || [301, 302].includes(response.status) && method === 'POST') {
            redirectedOptions.method = 'GET';
            delete redirectedOptions.body;
            redirectedOptions.headers = withoutHeaders(redirectedOptions.headers, ['content-length']);
          }

          // The redirect's own body reaches its outcome, within the attempt, before its next request is sent; and once the
          // attempt has been stopped, none is.
          _context7.next = 18;
          return drainResponse(response, options.signal);
        case 18:
          if (!((_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted)) {
            _context7.next = 19;
            break;
          }
          throw abortError();
        case 19:
          return _context7.abrupt("return", _fetchWithRedirects(redirectUrl, redirectedOptions, transport, progress, redirectCount + 1, crossedOrigin || !staysInOrigin));
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[4, 6], [12, 13]]);
  }));
  return function fetchWithRedirects(_x14, _x15, _x16, _x17) {
    return _ref12.apply(this, arguments);
  };
}();

// config is the client that made the call, or Files for the global settings; transport, the HTTP client and agent
// choice its requests are sent with (see fetchWithRedirects); and policy, how it is retried (see apiRetries). Resolves
// with the response and the attempt it belongs to, which is still running, so that the response is read within the
// attempt's budget; the caller must end() it, or endWithBody() it with the body it returns unread. It also resolves with
// responseUrl, the URL that answered, redirects included; crossedOrigin, whether a redirect led to another origin on the
// way, even when a later one led back; and retries, the retry the attempt was, which a lockout region mismatch's reroute
// continues from, so that every retry of a call shares one budget. Each retry is an attempt with a budget of its own,
// and waiting between attempts counts toward none. previousFailure is what the attempt before, if any, failed with,
// which the call fails with when its policy refuses, once that wait is over, to send it again (see storageRetries).
var _fetchWithRetry = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9(givenUrl, givenOptions, retries, transport, config, policy, previousFailure) {
    var _givenOptions$signal;
    var log, maxRetries, _ref14, options, url, timeoutSecs, requestOptions, signal, retry, isUnschedulable, attempt, attachmentBody, attachmentAttempt, progress, observeRequest, sentBody, crossedOrigin, response, responseUrl, attemptOptions, received, _error$message, failure, _policy$redispatch, failureDelayMs, mayRetry, statusDelayMs, _failure, _t8, _t9;
    return _regenerator.default.wrap(function (_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          log = loggerFor(config);
          maxRetries = config.getMaxNetworkRetries(); // A call whose own signal has been aborted starts no attempt.
          if (!((_givenOptions$signal = givenOptions.signal) !== null && _givenOptions$signal !== void 0 && _givenOptions$signal.aborted)) {
            _context9.next = 1;
            break;
          }
          throw cancellation(givenOptions.signal);
        case 1:
          if (!policy.beforeSend) {
            _context9.next = 3;
            break;
          }
          _context9.next = 2;
          return policy.beforeSend(givenUrl, givenOptions, givenOptions.signal, {
            previousFailure: previousFailure,
            retries: retries
          });
        case 2:
          _t8 = _context9.sent;
          _context9.next = 4;
          break;
        case 3:
          _t8 = {
            options: givenOptions,
            url: givenUrl
          };
        case 4:
          _ref14 = _t8;
          options = _ref14.options;
          url = _ref14.url;
          timeoutSecs = options.timeoutSecs, requestOptions = (0, _objectWithoutProperties2.default)(options, _excluded);
          signal = requestOptions.signal; // reason is a short classification, such as 'HTTP 503' or 'a network error'; details stay in the DEBUG log. failure
          // is what the attempt failed with.
          retry = /*#__PURE__*/function () {
            var _ref15 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8(reason, delayMs, failure) {
              var nextRetries;
              return _regenerator.default.wrap(function (_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    if (!(signal !== null && signal !== void 0 && signal.aborted)) {
                      _context8.next = 1;
                      break;
                    }
                    throw cancellation(signal);
                  case 1:
                    nextRetries = retries + 1;
                    log.info("Retrying request (retry ".concat(nextRetries, " of ").concat(maxRetries, ") in ").concat(delayMs, " ms after ").concat(reason));

                    // That log reaches the application's logger, which may itself cancel the call: the wait then never begins, and an
                    // abort while it lasts ends it at once.
                    _context8.next = 2;
                    return waitBeforeRetry(delayMs, signal);
                  case 2:
                    return _context8.abrupt("return", _fetchWithRetry(url, options, nextRetries, transport, config, policy, failure));
                  case 3:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function retry(_x25, _x26, _x27) {
              return _ref15.apply(this, arguments);
            };
          }(); // A wait for a retry that cannot be scheduled, such as a Retry-After of weeks, is never shortened: the request is not
          // retried, and fails as its attempt did.
          isUnschedulable = function isUnschedulable(delayMs) {
            if (isSchedulable(delayMs)) {
              return false;
            }
            log.info("Request #".concat(retries + 1, " is not retried because its wait of ").concat(delayMs, " ms cannot be scheduled"));
            return true;
          }; // Nor does one whose signal aborted while its attempt was being prepared.
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context9.next = 5;
            break;
          }
          throw cancellation(signal);
        case 5:
          log.debug("Sending request #".concat(retries + 1, ": ").concat(requestOptions.method, " ").concat(url));
          log.debug('Sending options:', requestOptions);

          // Those logs reach the application's logger, which may itself cancel the call: then no request is sent either.
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context9.next = 6;
            break;
          }
          throw cancellation(signal);
        case 6:
          attempt = startAttempt(signal, timeoutSecs); // A body with attachments is encoded afresh for each attempt, and stops with it.
          attachmentBody = requestOptions.body instanceof _attachmentBody.AttachmentBody ? requestOptions.body : null;
          attachmentAttempt = attachmentBody === null || attachmentBody === void 0 ? void 0 : attachmentBody.open(attempt.signal); // What the attempt has come to as its requests are sent (see fetchWithRedirects).
          progress = {
            answered: false,
            beforeDispatch: policy.beforeDispatch,
            onDispatch: policy.onDispatch
          }; // At DEBUG, a stream body is sent in a stream of the SDK's own that logs each chunk as the HTTP client reads it (see
          // observedRequestBody), which gives up the caller's stream once the attempt has ended, however it ends: a body the
          // HTTP client read to its end, or cancelled, has settled already.
          observeRequest = payloadObserver(config, 'Request Data: ');
          sentBody = function sentBody(body) {
            if (!observeRequest || !isStreamBody(body)) {
              return body;
            }
            var observed = observedRequestBody(body, observeRequest);
            attempt.onEnd(function () {
              return observed.settle(abortError());
            });
            return observed.body;
          };
          _context9.prev = 7;
          attemptOptions = attachmentAttempt ? _objectSpread(_objectSpread({}, requestOptions), {}, {
            body: sentBody(attachmentAttempt.body),
            signal: attachmentAttempt.signal
          }) : _objectSpread(_objectSpread({}, requestOptions), {}, {
            signal: attempt.signal
          });
          if (!attachmentAttempt && observeRequest && isStreamBody(requestOptions.body)) {
            attemptOptions = _objectSpread(_objectSpread({}, attemptOptions), {}, {
              body: sentBody(requestOptions.body)
            });
          }
          _context9.next = 8;
          return _fetchWithRedirects(url, attemptOptions, transport, progress);
        case 8:
          received = _context9.sent;
          crossedOrigin = received.crossedOrigin;
          response = received.response;
          responseUrl = received.url;
          _context9.next = 18;
          break;
        case 9:
          _context9.prev = 9;
          _t9 = _context9["catch"](7);
          attachmentAttempt === null || attachmentAttempt === void 0 || attachmentAttempt.abort();
          attempt.end();
          log.info("Request #".concat(retries + 1, " failed"));
          log.debug("Request #".concat(retries + 1, " failed: ").concat((_error$message = _t9 === null || _t9 === void 0 ? void 0 : _t9.message) !== null && _error$message !== void 0 ? _error$message : _t9));

          // An attachment that could not be read or encoded is the request's error, rather than the aborted request.
          if (!(attachmentAttempt !== null && attachmentAttempt !== void 0 && attachmentAttempt.failure)) {
            _context9.next = 10;
            break;
          }
          throw attachmentAttempt.failure;
        case 10:
          // Cancelled by the caller's signal while under way, the call is over. An attempt that ran out of time is retried as
          // a network failure is.
          failure = attempt.failure(_t9);
          if (!isCancellation(failure)) {
            _context9.next = 11;
            break;
          }
          throw failure;
        case 11:
          if (!expiredAtDispatch.has(failure)) {
            _context9.next = 13;
            break;
          }
          if (!((_policy$redispatch = policy.redispatch) !== null && _policy$redispatch !== void 0 && _policy$redispatch.call(policy, retries))) {
            _context9.next = 12;
            break;
          }
          return _context9.abrupt("return", _fetchWithRetry(url, options, retries, transport, config, policy, previousFailure));
        case 12:
          throw failure;
        case 13:
          if (!(retries >= maxRetries || isPermanentFailure(failure, url) || !policy.mayRetryFailure(failure, progress.answered))) {
            _context9.next = 14;
            break;
          }
          throw failure;
        case 14:
          if (!(attachmentBody && !attachmentBody.canReplay())) {
            _context9.next = 15;
            break;
          }
          log.info("Request #".concat(retries + 1, " is not retried because an attachment stream has already been read"));
          throw failure;
        case 15:
          if (!(!attachmentBody && !canResend(requestOptions.body))) {
            _context9.next = 16;
            break;
          }
          throw failure;
        case 16:
          failureDelayMs = policy.delayMs(config, retries, null);
          if (!isUnschedulable(failureDelayMs)) {
            _context9.next = 17;
            break;
          }
          throw failure;
        case 17:
          return _context9.abrupt("return", retry('a network error', failureDelayMs, failure));
        case 18:
          // A request of any method that was rate limited or hit a transient server error is sent again within the same retry
          // budget, unless its policy leaves it, as it does once the request's server has answered it with a redirect when its
          // outcome must be known, or its body cannot be sent again. Nor is it retried once the call's own signal has been
          // aborted: the abort has already stopped the attempt, so reading its response then fails as the call's cancellation.
          // An abort after the response has been discarded is retry()'s to stop.
          mayRetry = policy.mayRetryStatus(response.status, progress.answered) && retries < maxRetries && !(signal !== null && signal !== void 0 && signal.aborted) && canResend(requestOptions.body);
          statusDelayMs = mayRetry ? policy.delayMs(config, retries, response) : null;
          if (!(mayRetry && !isUnschedulable(statusDelayMs))) {
            _context9.next = 22;
            break;
          }
          log.info("Request #".concat(retries + 1, " failed with HTTP ").concat(response.status));

          // What the attempt failed with, should the request not be sent again after all (see storageRetries).
          _failure = {
            response: {
              data: undefined,
              headers: Object.fromEntries(response.headers.entries()),
              reason: response.statusText,
              status: response.status
            }
          }; // The discarded body's outcome is observed within its attempt, whether it was read, drained or stopped, before the
          // attempt ends and a retry may start.
          _context9.prev = 19;
          _context9.next = 20;
          return logAndDiscardResponse(response, config, attempt);
        case 20:
          _context9.prev = 20;
          attempt.end();
          return _context9.finish(20);
        case 21:
          return _context9.abrupt("return", retry("HTTP ".concat(response.status), statusDelayMs, _failure));
        case 22:
          return _context9.abrupt("return", {
            attempt: attempt,
            crossedOrigin: crossedOrigin,
            response: response,
            responseUrl: responseUrl,
            retries: retries
          });
        case 23:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[7, 9], [19,, 20, 21]]);
  }));
  return function fetchWithRetry(_x18, _x19, _x20, _x21, _x22, _x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();

// The option of a storage download (see Api._openStorageDownload) by which the download itself chooses each request's
// agent from its URL, redirects included, and alone: no client's chooser is asked besides, so that the agent the
// download chose for a URL before its last checks, none included, is the one the request is sent with.
var downloadAgents = Symbol('downloadAgents');

// The option of a storage download by which the download lets each of its requests go, a redirect's included, once
// every caller callback of that send has run, deciding in the same turn as the request is handed to the HTTP client
// (see whenSendable in fetchWithRedirects): while it is paused, the request waits; once it has stopped, it is not sent.
var downloadGate = Symbol('downloadGate');

// The transport of a call's requests (see fetchWithRedirects), made with config, its client or Files, client, if any,
// and its own fetch, getAgentForUrl and other options. Each request's agent, redirects included, is the one the call's
// own getAgentForUrl, agent, httpsAgent and httpAgent choose for its URL; only when they choose none do the client's
// settings. Each request is sent by the call's own fetch, or else its settings', or else the SDK's own, cross-fetch.
var transportOf = function transportOf(config, client, callFetch, getAgentForUrl, options) {
  var _ref16, _config$getFetch;
  var clientAgentChooser = client === null || client === void 0 ? void 0 : client._agentChooser();
  var agentForUrl = clientAgentChooser && !(options.agent || options.httpsAgent || options.httpAgent) ? function (requestUrl) {
    return (getAgentForUrl === null || getAgentForUrl === void 0 ? void 0 : getAgentForUrl(requestUrl)) || clientAgentChooser(requestUrl);
  } : getAgentForUrl;
  return {
    getAgentForUrl: agentForUrl,
    send: (_ref16 = callFetch !== null && callFetch !== void 0 ? callFetch : (_config$getFetch = config.getFetch) === null || _config$getFetch === void 0 ? void 0 : _config$getFetch.call(config)) !== null && _ref16 !== void 0 ? _ref16 : _crossFetch.default
  };
};
var Api = /*#__PURE__*/(0, _createClass2.default)(function Api() {
  (0, _classCallCheck2.default)(this, Api);
});
_Api = Api;
(0, _defineProperty2.default)(Api, "_sendVerbatim", /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee1(path, verb, optionsRaw) {
    var _options$retryPolicy, _optionsRaw$requestCr;
    var _ref18, client, callFetch, getAgentForUrl, options, config, log, policy, settlesBody, oneAttempt, transport, isExternal, credential, operation, settingsBaseUrl, baseUrl, apiUrl, url, settingsSite, attempt, handedOn, requestOptions, _respond, received, _attempt, _t1;
    return _regenerator.default.wrap(function (_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          // The client is the call's settings, and fetch the HTTP client that sends its requests, not options of the requests.
          _ref18 = optionsRaw || {}, client = _ref18.client, callFetch = _ref18.fetch, getAgentForUrl = _ref18.getAgentForUrl, options = (0, _objectWithoutProperties2.default)(_ref18, _excluded2);
          config = client !== null && client !== void 0 ? client : _Files.default;
          log = loggerFor(config);
          policy = (_options$retryPolicy = options[retryPolicy]) !== null && _options$retryPolicy !== void 0 ? _options$retryPolicy : apiRetries;
          settlesBody = options[settlingBody] === true;
          oneAttempt = options[singleAttempt] === true;
          delete options[retryPolicy];
          delete options[settlingBody];
          delete options[singleAttempt];
          transport = transportOf(config, client, callFetch, getAgentForUrl, options);
          isExternal = /^[a-zA-Z]+:\/\//.test(path); // A request of an operation goes to the site its context was taken with, or for a later request, to the host a
          // lockout region mismatch rerouted the operation to (see Api.sendRequest). Any other request goes to its settings'
          // site.
          credential = (_optionsRaw$requestCr = optionsRaw === null || optionsRaw === void 0 ? void 0 : optionsRaw[requestCredential]) !== null && _optionsRaw$requestCr !== void 0 ? _optionsRaw$requestCr : null;
          operation = optionsRaw ? operationContexts.get(optionsRaw) : undefined;
          settingsBaseUrl = config.getBaseUrl();
          baseUrl = operation ? operation.origin : settingsBaseUrl;
          if (!(!isExternal && !baseUrl)) {
            _context1.next = 1;
            break;
          }
          throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it');
        case 1:
          apiUrl = function apiUrl(origin) {
            return "".concat(origin).concat(_Files.default.getEndpointPrefix()).concat(path);
          };
          url = isExternal ? path : apiUrl(baseUrl); // The settings' site the request is sent to, which a mismatch it follows may move, or null when it is sent elsewhere.
          settingsSite = baseUrl === settingsBaseUrl ? settingsBaseUrl : null;
          attempt = null;
          handedOn = false;
          _context1.prev = 2;
          requestOptions = _objectSpread({
            method: verb,
            timeoutSecs: config.getNetworkTimeout()
          }, options); // Sends the request to requestUrl, as its retries'th retry, and reads the response within that attempt. A lockout
          // region mismatch that is followed sends the same request, method, path, query, body, headers and credentials
          // included, to the host the API named, as the next retry, which shares the call's one retry budget.
          _respond = /*#__PURE__*/function () {
            var _ref19 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee0(requestUrl, retries) {
              var sent, response, headers, text, from, isOwnAnswer, contentType, data, normalizedResponse, mismatch, _options$signal2, route, movesSettings, nextRetries, _body2, _t0;
              return _regenerator.default.wrap(function (_context0) {
                while (1) switch (_context0.prev = _context0.next) {
                  case 0:
                    _context0.next = 1;
                    return _fetchWithRetry(requestUrl, requestOptions, retries, transport, config, policy);
                  case 1:
                    sent = _context0.sent;
                    response = sent.response;
                    attempt = sent.attempt;
                    headers = Object.fromEntries(response.headers.entries());
                    logResponseHead(response, headers, log);

                    // One attempt to storage resolves with its outcome, for its transfer to classify (see Api._sendStorageAttempt):
                    // an accepted response once its body is settled, which stands whatever becomes of that body, or a refused one
                    // with what a bounded read of its body gives.
                    if (!oneAttempt) {
                      _context0.next = 5;
                      break;
                    }
                    if (!response.ok) {
                      _context0.next = 3;
                      break;
                    }
                    _context0.next = 2;
                    return drainResponse(response, attempt.signal, payloadObserver(config, 'Response Data: '));
                  case 2:
                    return _context0.abrupt("return", {
                      headers: headers,
                      ok: true,
                      reason: response.statusText,
                      status: response.status
                    });
                  case 3:
                    _context0.next = 4;
                    return boundedText(response, attempt.signal, REFUSED_TEXT_BYTES);
                  case 4:
                    text = _context0.sent;
                    log.debug('Response Data: ');
                    log.debug(text);
                    return _context0.abrupt("return", {
                      data: text,
                      headers: headers,
                      ok: false,
                      reason: response.statusText,
                      status: response.status
                    });
                  case 5:
                    // Only the API's own answer can move the call's credentials to another host: a response from the origin the
                    // request was sent to, redirects within it included. A request to another site never is, nor is a response
                    // after a redirect that led away from that origin, even back to it, which the credentials did not follow.
                    from = isExternal ? null : new URL(requestUrl).origin;
                    isOwnAnswer = from !== null && !sent.crossedOrigin && new URL(sent.responseUrl).origin === from; // The body is read within the same attempt, and so within the same timeout budget, as the response headers.
                    contentType = headers['content-type'] || '';
                    _context0.prev = 6;
                    if (!contentType.includes('application/json')) {
                      _context0.next = 10;
                      break;
                    }
                    if (!hasNoContent(response.status, headers)) {
                      _context0.next = 7;
                      break;
                    }
                    data = response.body;
                    _context0.next = 9;
                    break;
                  case 7:
                    _context0.next = 8;
                    return response.json();
                  case 8:
                    data = _context0.sent;
                  case 9:
                    _context0.next = 17;
                    break;
                  case 10:
                    if (!contentType.includes('text/')) {
                      _context0.next = 12;
                      break;
                    }
                    _context0.next = 11;
                    return response.text();
                  case 11:
                    data = _context0.sent;
                    _context0.next = 17;
                    break;
                  case 12:
                    if (!contentType.includes('multipart/form-data')) {
                      _context0.next = 14;
                      break;
                    }
                    _context0.next = 13;
                    return response.formData();
                  case 13:
                    data = _context0.sent;
                    _context0.next = 17;
                    break;
                  case 14:
                    if (!(isOwnAnswer && response.status === 403 && !contentType && headers['x-files-host'])) {
                      _context0.next = 16;
                      break;
                    }
                    _context0.next = 15;
                    return response.text();
                  case 15:
                    data = _context0.sent;
                    _context0.next = 17;
                    break;
                  case 16:
                    data = response.body;
                  case 17:
                    _context0.next = 19;
                    break;
                  case 18:
                    _context0.prev = 18;
                    _t0 = _context0["catch"](6);
                    throw attempt.failure(_t0);
                  case 19:
                    // Only a body read above is logged; an unread stream stays untouched for the caller.
                    if (data !== response.body) {
                      log.debug('Response Data: ');
                      log.debug(data);
                    }
                    normalizedResponse = {
                      data: data,
                      headers: headers,
                      reason: response.statusText,
                      status: response.status
                    };
                    mismatch = isOwnAnswer ? regionMismatchOf(response.status, headers, data) : null;
                    if (!mismatch) {
                      _context0.next = 22;
                      break;
                    }
                    route = regionRouteOf(mismatch, from, config, sent.retries, requestOptions.body);
                    if (route.follow) {
                      _context0.next = 20;
                      break;
                    }
                    throw {
                      regionMismatch: route.details,
                      response: normalizedResponse
                    };
                  case 20:
                    attempt.end();
                    attempt = null;

                    // As for any retry, a call whose own signal has been aborted by then is cancelled rather than sent again.
                    if (!((_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted)) {
                      _context0.next = 21;
                      break;
                    }
                    throw cancellation(options.signal);
                  case 21:
                    // The rest of the operation goes there too, in the context its first request was sent with, so that its later
                    // pages keep its credential, workspace and other headers, whatever the settings become. So do the settings'
                    // later requests, but only when this request was sent to their site with their own credential and workspace,
                    // and they still have all three: a call's own API key, session or workspace, a request that sent no
                    // credential, such as a session's creation, and one whose settings have changed since its operation began
                    // move only the operation.
                    if (operation) {
                      operationContexts.set(optionsRaw, _objectSpread(_objectSpread({}, operation), {}, {
                        origin: route.origin
                      }));
                    }
                    movesSettings = Boolean(credential === null || credential === void 0 ? void 0 : credential.settings) && settingsSite !== null && config.getBaseUrl() === settingsSite && isSameCredential(settingsCredentialOf(config), credential);
                    if (movesSettings) {
                      if (config === _Files.default) {
                        _Files.default.setBaseUrl(route.origin);
                      } else {
                        config._useRegionOrigin(route.origin);
                      }
                      settingsSite = route.origin;
                    } else {
                      settingsSite = null;
                    }
                    nextRetries = sent.retries + 1;
                    log.info("Retrying request (retry ".concat(nextRetries, " of ").concat(config.getMaxNetworkRetries(), ") at ").concat(route.origin, " after a lockout region mismatch"));
                    return _context0.abrupt("return", _respond(apiUrl(route.origin), nextRetries));
                  case 22:
                    if (response.ok) {
                      _context0.next = 25;
                      break;
                    }
                    if (!(data && data === response.body)) {
                      _context0.next = 24;
                      break;
                    }
                    _context0.next = 23;
                    return boundedText(response, attempt.signal, REFUSED_TEXT_BYTES);
                  case 23:
                    normalizedResponse.data = _context0.sent;
                    log.debug('Response Data: ');
                    log.debug(normalizedResponse.data);
                  case 24:
                    throw {
                      response: normalizedResponse
                    };
                  case 25:
                    if (!(settlesBody && data === response.body)) {
                      _context0.next = 27;
                      break;
                    }
                    _context0.next = 26;
                    return drainResponse(response, attempt.signal, payloadObserver(config, 'Response Data: '));
                  case 26:
                    return _context0.abrupt("return", _objectSpread(_objectSpread({}, normalizedResponse), {}, {
                      data: null
                    }));
                  case 27:
                    if (!(data && data === response.body)) {
                      _context0.next = 28;
                      break;
                    }
                    _body2 = attempt.endWithBody(data, hasNoContent(response.status, headers), payloadObserver(config, 'Response Data: '));
                    handedOn = true;
                    return _context0.abrupt("return", _objectSpread(_objectSpread({}, normalizedResponse), {}, {
                      data: _body2
                    }));
                  case 28:
                    return _context0.abrupt("return", normalizedResponse);
                  case 29:
                  case "end":
                    return _context0.stop();
                }
              }, _callee0, null, [[6, 18]]);
            }));
            return function respond(_x31, _x32) {
              return _ref19.apply(this, arguments);
            };
          }();
          _context1.next = 3;
          return _respond(url, 0);
        case 3:
          received = _context1.sent;
          return _context1.abrupt("return", received);
        case 4:
          _context1.prev = 4;
          _t1 = _context1["catch"](2);
          if (!isCancellation(_t1)) {
            _context1.next = 5;
            break;
          }
          throw _t1.reason;
        case 5:
          if (!ownFailures.has(_t1)) {
            _context1.next = 6;
            break;
          }
          throw _t1.failure;
        case 6:
          if (!oneAttempt) {
            _context1.next = 7;
            break;
          }
          return _context1.abrupt("return", {
            dispatched: policy.dispatched === true,
            expired: expiredUrlErrors.has(_t1),
            failure: _t1,
            permanent: isPermanentFailure(_t1, url)
          });
        case 7:
          errors.handleErrorResponse(_t1, log);
          return _context1.abrupt("return", null);
        case 8:
          _context1.prev = 8;
          // The timeout budget and the caller's signal keep applying to a body handed on unread until it has been read to
          // its end, fails, closes or is cancelled; stopping it before then fails the stream itself, as the call has
          // already resolved. Any other attempt ends with the call.
          if (!handedOn) {
            (_attempt = attempt) === null || _attempt === void 0 || _attempt.end();
          }
          return _context1.finish(8);
        case 9:
        case "end":
          return _context1.stop();
      }
    }, _callee1, null, [[2, 4, 8, 9]]);
  }));
  return function (_x28, _x29, _x30) {
    return _ref17.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendFilePart", function (externalUrl, verb, data) {
  var optionsRaw = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return _Api._sendStorageRequest({
    headers: optionsRaw === null || optionsRaw === void 0 ? void 0 : optionsRaw.headers,
    method: verb,
    url: externalUrl
  }, data, optionsRaw);
});
// Not public: one request to storage, of body, to target: { url, method, headers, agent, expires, replay }, its signed
// URL, its method and headers, as an upload part's negotiation gives them, the agent to send it through, if chosen
// already, when the API said it expires, if it did, and whether it may be sent again, true unless false. It is sent
// with optionsRaw's signal, timeoutSecs, agent options, fetch and client, whose network and log settings apply, but
// never the API's credentials or workspace, nor any other headers. It is retried as storage is (see storageRetries),
// in this one loop, and renew(), if given, gives the target to send it to instead of one that has expired.
//
// With settleBody, a response body that would be returned unread, such as an upload part's acknowledgement, is
// drained instead, a Node.js stream and a WHATWG one alike, within the attempt's budget and signal, and the call
// resolves, with data null, only once its outcome has been observed: an accepted response stands whatever becomes of
// its body. Without it, such a body is returned unread, as Api.sendFilePart() returns it.
(0, _defineProperty2.default)(Api, "_sendStorageRequest", function (target, body) {
  var optionsRaw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var renew = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var _ref20 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
    _ref20$settleBody = _ref20.settleBody,
    settleBody = _ref20$settleBody === void 0 ? false : _ref20$settleBody;
  var _ref21 = optionsRaw || {},
    headers = _ref21.headers,
    options = (0, _objectWithoutProperties2.default)(_ref21, _excluded3);
  return _Api._sendVerbatim(target.url, target.method, _objectSpread(_objectSpread(_objectSpread({}, options), target.agent ? {
    agent: target.agent
  } : {}), {}, (0, _defineProperty2.default)((0, _defineProperty2.default)({
    body: body,
    headers: storageHeadersOf(target.headers)
  }, retryPolicy, storageRetries(target, renew)), settlingBody, settleBody)));
});
// Not public: one attempt of a request to storage, as _sendStorageRequest makes it, for a transfer that owns its
// retries, renewals and replay permission (see storageAttempt): never retried here, and never sent once target is
// known to have expired. Resolves with { headers, ok: true, reason, status } once an accepted response's body has been
// settled; with { data, headers, ok: false, reason, status } for any other response, data the text of at most
// REFUSED_TEXT_BYTES of its body; or with { dispatched, expired, failure, permanent } when the attempt had no
// response: failure is what it failed with, the budget's "Request timed out" FilesError included; dispatched whether
// any of its requests had been handed to the HTTP client, so that it may have been carried out; expired whether a URL
// of it was known to have expired, its request never sent, which leaves the attempt unsent only when nothing was
// dispatched before, as a redirect to an expired URL was not; and permanent whether sending it again would fail the
// same way. Rejects only when cancelled, with the signal's reason.
(0, _defineProperty2.default)(Api, "_sendStorageAttempt", function (target, body) {
  var optionsRaw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _ref22 = optionsRaw || {},
    headers = _ref22.headers,
    options = (0, _objectWithoutProperties2.default)(_ref22, _excluded4);
  return _Api._sendVerbatim(target.url, target.method, _objectSpread(_objectSpread(_objectSpread({}, options), target.agent ? {
    agent: target.agent
  } : {}), {}, (0, _defineProperty2.default)((0, _defineProperty2.default)({
    body: body,
    headers: storageHeadersOf(target.headers)
  }, retryPolicy, storageAttempt(target)), singleAttempt, true)));
});
// Not public: options for a request, of a call made with options, whose outcome must be known, such as an upload's
// finalization: it is retried only after a failure that shows it was not carried out (see unambiguousApiRetries).
(0, _defineProperty2.default)(Api, "_withUnambiguousRetries", function (options) {
  return _objectSpread(_objectSpread({}, options), {}, (0, _defineProperty2.default)({}, retryPolicy, unambiguousApiRetries));
});
// Not public: what the transfers that own their own retries (see Upload.js and isomorphic/File.node.js) need of the
// request layer: the logger of a call's settings; whether a storage target, { expires, url }, is known to have
// expired, and when a signed URL expires by its own signature, in milliseconds; the wait a Retry-After asks for;
// whether a status may be different when sent again; whether a failure without a response would fail the same way if
// sent again to url; whether an error is the expired-URL one; and whether a download's attempt failed with it before
// sending anything (see Api._openStorageDownload).
(0, _defineProperty2.default)(Api, "_loggerFor", loggerFor);
(0, _defineProperty2.default)(Api, "_storageExpired", function (target) {
  return hasExpired(target);
});
(0, _defineProperty2.default)(Api, "_urlExpiresAt", function (url) {
  return signedUrlExpiryOf(url);
});
(0, _defineProperty2.default)(Api, "_retryAfterMs", function (value) {
  return retryAfterMs(value);
});
(0, _defineProperty2.default)(Api, "_isTransientStatus", function (status) {
  return isTransientStatus(status);
});
(0, _defineProperty2.default)(Api, "_isPermanentStorageFailure", function (error, url) {
  return isPermanentFailure(error, url);
});
(0, _defineProperty2.default)(Api, "_isExpiredUrlError", function (error) {
  return expiredUrlErrors.has(error);
});
(0, _defineProperty2.default)(Api, "_isUnsentExpiry", function (error) {
  return unsentExpiries.has(error);
});
// Not public: the options by which a storage download chooses its requests' agents itself (see downloadAgents), and
// lets each of them go (see downloadGate).
(0, _defineProperty2.default)(Api, "_downloadAgents", downloadAgents);
(0, _defineProperty2.default)(Api, "_downloadGate", downloadGate);
// Not public: a download from storage at url, one GET with only headers, never the API's credentials or workspace,
// through the transport optionsRaw choose (see transportOf): their agent options and fetch, or their client's, with
// their signal and timeoutSecs and their client's network and log settings, or else the global ones; or, with their
// [Api._downloadAgents] option, the agent it alone chooses for each request's URL; and, with their [Api._downloadGate]
// option, sent, a redirect's request included, only once that lets it go. It is retried
// as storage's requests are (see storageRetries), and never sent once its URL is known to have expired. With
// attemptOnly, as for a download that owns its retries (see isomorphic/File.node.js), it is one attempt, never
// retried here, which rejects with the failure of an attempt that had no response, such as the expired-URL error.
//
// Resolves with its response, whatever its status, once any retries are over: { body, closed, failure, headers,
// status, statusText, stop }. Its body is unread, made a Node.js readable stream by nodeStream(body) and handed on in
// its attempt's own (see startAttempt), and stays within its attempt's budget until it has been read to its end, failed
// or closed. stop() ends the request, its body included, at once. closed resolves once the attempt has ended and both
// the body handed on and the HTTP client's own body have had their outcome, ended, failed or closed, not merely once
// either is being destroyed. failure(error) is what reading the body fails with when it failed with error: the
// budget's "Request timed out" FilesError, or the caller's signal's reason, when either stopped the attempt and its
// HTTP client reported that as an abort; otherwise error itself. Rejects with the request's failure, or a cancelled
// one with its signal's reason; with attemptOnly, an expired URL found before any request of the attempt was sent is
// one that Api._isUnsentExpiry() tells, which renewing it may answer without counting a send.
(0, _defineProperty2.default)(Api, "_openStorageDownload", /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee10(url, optionsRaw, headers, nodeStream) {
    var _ref24,
      _ref24$attemptOnly,
      attemptOnly,
      _ref25,
      client,
      callFetch,
      getAgentForUrl,
      agentFor,
      whenSendable,
      options,
      config,
      transport,
      requestOptions,
      sent,
      policy,
      _sent,
      attempt,
      response,
      body,
      responseHeaders,
      received,
      ended,
      _body3,
      _args10 = arguments,
      _t10,
      _t11;
    return _regenerator.default.wrap(function (_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _ref24 = _args10.length > 4 && _args10[4] !== undefined ? _args10[4] : {}, _ref24$attemptOnly = _ref24.attemptOnly, attemptOnly = _ref24$attemptOnly === void 0 ? false : _ref24$attemptOnly;
          _ref25 = optionsRaw || {}, client = _ref25.client, callFetch = _ref25.fetch, getAgentForUrl = _ref25.getAgentForUrl, agentFor = _ref25[downloadAgents], whenSendable = _ref25[downloadGate], options = (0, _objectWithoutProperties2.default)(_ref25, ["client", "fetch", "getAgentForUrl", downloadAgents, downloadGate].map(_toPropertyKey));
          config = client !== null && client !== void 0 ? client : _Files.default;
          transport = _objectSpread(_objectSpread(_objectSpread({}, transportOf(config, client, callFetch, getAgentForUrl, options)), agentFor ? {
            getAgentForUrl: agentFor
          } : {}), whenSendable ? {
            whenSendable: whenSendable
          } : {});
          requestOptions = _objectSpread(_objectSpread({
            method: 'GET',
            timeoutSecs: config.getNetworkTimeout()
          }, options), {}, {
            headers: storageHeadersOf(headers)
          });
          policy = attemptOnly ? storageAttempt({
            method: 'GET',
            url: url
          }) : storageRetries({
            method: 'GET',
            url: url
          }, null);
          _context10.prev = 1;
          _context10.next = 2;
          return _fetchWithRetry(url, requestOptions, 0, transport, config, policy);
        case 2:
          sent = _context10.sent;
          _context10.next = 5;
          break;
        case 3:
          _context10.prev = 3;
          _t10 = _context10["catch"](1);
          if (!isCancellation(_t10)) {
            _context10.next = 4;
            break;
          }
          throw _t10.reason;
        case 4:
          if (attemptOnly && expiredUrlErrors.has(_t10) && policy.dispatched !== true) {
            unsentExpiries.add(_t10);
          }
          throw ownFailures.has(_t10) ? _t10.failure : _t10;
        case 5:
          _sent = sent, attempt = _sent.attempt, response = _sent.response;
          body = null;
          _context10.prev = 6;
          responseHeaders = Object.fromEntries(response.headers.entries());
          logResponseHead(response, responseHeaders, loggerFor(config));
          received = nodeStream(response.body);
          body = attempt.endWithBody(received);
          ended = new Promise(function (resolve) {
            attempt.onEnd(resolve);
          });
          return _context10.abrupt("return", {
            body: body,
            closed: Promise.all([readableOutcome(body), readableOutcome(received), ended]).then(function () {}),
            failure: function failure(error) {
              var failure = attempt.failure(error);
              return isCancellation(failure) ? failure.reason : failure;
            },
            headers: responseHeaders,
            status: response.status,
            statusText: response.statusText,
            stop: function stop() {
              attempt.end();
              body.destroy();
            }
          });
        case 7:
          _context10.prev = 7;
          _t11 = _context10["catch"](6);
          attempt.end();
          (_body3 = body) === null || _body3 === void 0 || _body3.destroy();
          throw _t11;
        case 8:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 3], [6, 7]]);
  }));
  return function (_x33, _x34, _x35, _x36) {
    return _ref23.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "_autoPaginate", /*#__PURE__*/function () {
  var _ref26 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee11(path, verb, params, options, response, metadata) {
    var _options$autoPaginate, _options$client;
    var nextCursor, _ref27, autoPaginateCount, previousAutoPaginateData, nextPage, nextParams, nextMetadata;
    return _regenerator.default.wrap(function (_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          if (!((_options$autoPaginate = options.autoPaginate) !== null && _options$autoPaginate !== void 0 ? _options$autoPaginate : ((_options$client = options.client) !== null && _options$client !== void 0 ? _options$client : _Files.default).getAutoPaginate())) {
            _context11.next = 2;
            break;
          }
          nextCursor = nextCursorOf(response);
          _ref27 = metadata || {}, autoPaginateCount = _ref27.autoPaginateCount, previousAutoPaginateData = _ref27.previousAutoPaginateData;
          if (!nextCursor) {
            _context11.next = 1;
            break;
          }
          nextPage = (Number(params === null || params === void 0 ? void 0 : params.page) || 1) + 1;
          nextParams = _objectSpread(_objectSpread({}, params), {}, {
            cursor: nextCursor,
            page: nextPage
          });
          nextMetadata = {
            autoPaginateCount: (autoPaginateCount || 1) + 1,
            previousAutoPaginateData: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData || []), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          };
          return _context11.abrupt("return", _Api.sendRequest(path, verb, nextParams, options, nextMetadata));
        case 1:
          if (!previousAutoPaginateData) {
            _context11.next = 2;
            break;
          }
          return _context11.abrupt("return", _objectSpread(_objectSpread({}, response), {}, {
            autoPaginateRequests: autoPaginateCount,
            data: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          }));
        case 2:
          return _context11.abrupt("return", response);
        case 3:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x37, _x38, _x39, _x40, _x41, _x42) {
    return _ref26.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendRequest", /*#__PURE__*/function () {
  var _ref28 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee12(path, verb) {
    var _options$client2, _config$getHeaders;
    var params,
      options,
      metadata,
      config,
      hasWorkspaceIdOption,
      workspaceId,
      languageHeader,
      isExternal,
      continued,
      headers,
      credential,
      hasApiKey,
      callSessionId,
      sessionId,
      workspace,
      isCreatingSession,
      apiKey,
      updatedOptions,
      requestPath,
      hasParams,
      _params,
      _i,
      _Object$entries,
      _Object$entries$_i,
      key,
      value,
      _i2,
      _Object$entries2,
      _Object$entries2$_i,
      key2,
      value2,
      pairs,
      attachmentBody,
      response,
      _log,
      takePage,
      _args12 = arguments,
      _t12;
    return _regenerator.default.wrap(function (_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          params = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : null;
          options = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
          metadata = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : null;
          // The settings of the client the call was made through, never the global ones; or, for a call made without a
          // client, the global settings of Files.
          config = (_options$client2 = options.client) !== null && _options$client2 !== void 0 ? _options$client2 : _Files.default;
          hasWorkspaceIdOption = Object.prototype.hasOwnProperty.call(options, 'workspaceId');
          workspaceId = hasWorkspaceIdOption ? options.workspaceId : config.getWorkspaceId();
          languageHeader = config.getLanguage() ? {
            'Accept-Language': config.getLanguage()
          } : {};
          isExternal = /^[a-zA-Z]+:\/\//.test(path); // A later request of an operation, such as its next page, is sent with the context the operation's first request was
          // sent with: its site, or the host a lockout region mismatch rerouted it to, and a copy of its headers, its credential
          // and workspace included, whatever the settings have become since (see Api._sendVerbatim). It takes the context, so
          // that nothing else made with the same options continues the operation. Any other request is made with the settings
          // and options as they are now, and its context is taken below, before anything else can change them.
          continued = isExternal ? undefined : operationContexts.get(options);
          operationContexts.delete(options);

          // A client's own headers go under the call's. Files has none: getHeaders is a client's.
          headers = continued ? _objectSpread({}, continued.headers) : _objectSpread(_objectSpread(_objectSpread(_objectSpread({
            Accept: 'application/json'
          }, languageHeader), (_config$getHeaders = config.getHeaders) === null || _config$getHeaders === void 0 ? void 0 : _config$getHeaders.call(config)), options.headers), {}, {
            'User-Agent': config.getUserAgent()
          }); // The credential the request sends, in its workspace, which a lockout region mismatch's routing is tied to (see
          // Api._sendVerbatim).
          credential = continued ? continued.credential : null;
          if (!(!isExternal && !continued)) {
            _context12.next = 4;
            break;
          }
          hasApiKey = options.apiKey !== undefined && options.apiKey !== null;
          callSessionId = hasApiKey ? null : options.sessionId || options.session_id;
          sessionId = hasApiKey ? null : callSessionId || config.getSessionId();
          workspace = workspaceOf(workspaceId);
          if (!sessionId) {
            _context12.next = 1;
            break;
          }
          headers['X-FilesAPI-Auth'] = sessionId;
          credential = {
            name: 'X-FilesAPI-Auth',
            settings: !callSessionId && !hasWorkspaceIdOption,
            value: sessionId,
            workspace: workspace
          };
          _context12.next = 3;
          break;
        case 1:
          isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'; // api key cannot be used when creating a session
          if (isCreatingSession) {
            _context12.next = 3;
            break;
          }
          apiKey = options.apiKey || config.getApiKey();
          if (apiKey) {
            _context12.next = 2;
            break;
          }
          throw new errors.ConfigurationError(config === _Files.default || globalSettingsCopies.has(config) ? 'API key has not been set - use Files.setApiKey() to set it' : 'API key has not been set - give the client an apiKey or a sessionId');
        case 2:
          headers['X-FilesAPI-Key'] = apiKey;
          credential = {
            name: 'X-FilesAPI-Key',
            settings: !options.apiKey && !hasWorkspaceIdOption,
            value: apiKey,
            workspace: workspace
          };
        case 3:
          if (workspace !== null) {
            headers['X-Files-Workspace-Id'] = workspaceId;
          }
        case 4:
          // Each request records the credential it sends: its own, or for an operation's later request, the one the
          // operation's first request sent.
          updatedOptions = _objectSpread(_objectSpread({}, options), {}, (0, _defineProperty2.default)({
            headers: headers
          }, requestCredential, credential)); // The operation's context, as this request sends it, is taken now, its site included: before its body is prepared
          // or anything is logged, both of which can run the caller's code.
          if (!isExternal) {
            operationContexts.set(updatedOptions, continued !== null && continued !== void 0 ? continued : {
              credential: credential,
              headers: _objectSpread({}, headers),
              origin: config.getBaseUrl()
            });
          }
          requestPath = path;
          hasParams = (0, _utils.isObject)(params) && !(0, _utils.isEmpty)(params);
          if (hasParams) {
            if (verb.toUpperCase() === 'GET') {
              _params = {};
              for (_i = 0, _Object$entries = Object.entries(params); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                if ((0, _utils.isObject)(value)) {
                  for (_i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
                    _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2), key2 = _Object$entries2$_i[0], value2 = _Object$entries2$_i[1];
                    _params["".concat(key, "[").concat(key2, "]")] = value2;
                  }
                } else {
                  _params[key] = value;
                }
              }
              pairs = Object.entries(_params).map(function (_ref29) {
                var _ref30 = (0, _slicedToArray2.default)(_ref29, 2),
                  key = _ref30[0],
                  value = _ref30[1];
                return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
              });
              requestPath += path.includes('?') ? '&' : '?';
              requestPath += pairs.join('&');
            } else {
              updatedOptions.body = (0, _attachmentBody.jsonBody)(params);
              headers['Content-Type'] = 'application/json';
            }
          }

          // A body with attachments holds its streams from serialization until the request ends, however it ends: everything
          // after serialization, including logging, is inside this try.
          attachmentBody = updatedOptions.body instanceof _attachmentBody.AttachmentBody ? updatedOptions.body : null;
          _context12.prev = 5;
          if (attachmentBody && attachmentBody.length !== null) {
            headers['Content-Length'] = "".concat(attachmentBody.length);
          }
          if (config.shouldDebugRequest()) {
            _log = loggerFor(config);
            _log.debug('Request Options:');
            _log.debug(_objectSpread(_objectSpread({}, updatedOptions), {}, {
              body: hasParams ? "payload keys: ".concat(Object.keys(params).join(', ')) : '(none)'
            }));
          }
          _context12.next = 6;
          return _Api._sendVerbatim(requestPath, verb, updatedOptions);
        case 6:
          response = _context12.sent;
          _context12.next = 8;
          break;
        case 7:
          _context12.prev = 7;
          _t12 = _context12["catch"](5);
          // A failed request closes whatever its latest attempt still has open, and fails with its own error.
          attachmentBody === null || attachmentBody === void 0 || attachmentBody.abort();
          throw _t12;
        case 8:
          _context12.prev = 8;
          // A stream that was never read can then be sent again.
          attachmentBody === null || attachmentBody === void 0 || attachmentBody.release();
          return _context12.finish(8);
        case 9:
          // A page an item iterator requested goes back to it, with its operation's context, at the host a lockout region
          // mismatch rerouted it to, if any, and the iterator requests the next page itself.
          takePage = pageResponses.get(options);
          if (!takePage) {
            _context12.next = 10;
            break;
          }
          takePage(response, operationContexts.get(updatedOptions));
          return _context12.abrupt("return", response);
        case 10:
          return _context12.abrupt("return", _Api._autoPaginate(path, verb, params, updatedOptions, response, metadata));
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[5, 7, 8, 9]]);
  }));
  return function (_x43, _x44) {
    return _ref28.apply(this, arguments);
  };
}());
// Sends an action's request, a copy, a move or a deletion, as sendRequest() sends it, with the caller's options as
// they are, and resolves with { action, response }: its response, and what waiting for the action's completion needs
// (see ActionWait.js), which the SDK keeps privately for the FileAction or response that reports it.
//
// - action.operation is the context the request was sent with (see sendRequest()), its site, credential, workspace
//   and other headers, at the host a lockout region mismatch rerouted it to, if any; or null when the request gave
//   none back.
// - action.options are the options of the action's later requests: the call's own, its client, credentials and
//   headers included, but not its signal, which cancels that call alone; and, for a call made without a client, a copy
//   of the global settings as they are as the action is sent (Files._currentSettings()), so that changing them later
//   changes no later request of the action.
(0, _defineProperty2.default)(Api, "_sendAction", /*#__PURE__*/function () {
  var _ref31 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee13(path, verb, params) {
    var _options$client3;
    var options,
      client,
      _ref32,
      signal,
      retained,
      action,
      callOptions,
      response,
      _args13 = arguments;
    return _regenerator.default.wrap(function (_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
          client = (_options$client3 = options === null || options === void 0 ? void 0 : options.client) !== null && _options$client3 !== void 0 ? _options$client3 : _Files.default._currentSettings();
          if (client !== (options === null || options === void 0 ? void 0 : options.client)) {
            globalSettingsCopies.add(client);
          }
          _ref32 = options !== null && options !== void 0 ? options : {}, signal = _ref32.signal, retained = (0, _objectWithoutProperties2.default)(_ref32, _excluded5);
          action = {
            operation: null,
            options: _objectSpread(_objectSpread({}, retained), {}, {
              client: client,
              headers: _objectSpread({}, retained.headers)
            })
          };
          callOptions = _objectSpread({}, options);
          pageResponses.set(callOptions, function (response, context) {
            action.operation = context !== null && context !== void 0 ? context : null;
          });
          _context13.next = 1;
          return _Api.sendRequest(path, verb, params, callOptions);
        case 1:
          response = _context13.sent;
          return _context13.abrupt("return", {
            action: action,
            response: response
          });
        case 2:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x45, _x46, _x47) {
    return _ref31.apply(this, arguments);
  };
}());
// Sends a later GET request of an action (see _sendAction()) to path, such as a poll of its File Migration, with the
// action's options and signal, if given, in the context of the action's request before, whatever the settings have
// become since. Resolves with its response and the context it leaves for the next request, at the host a lockout
// region mismatch rerouted it to, if any.
(0, _defineProperty2.default)(Api, "_continueAction", /*#__PURE__*/function () {
  var _ref33 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee14(action, path, signal) {
    var _action$options;
    var requestOptions, operation, response;
    return _regenerator.default.wrap(function (_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          requestOptions = _objectSpread(_objectSpread({}, action.options), {}, {
            headers: _objectSpread({}, (_action$options = action.options) === null || _action$options === void 0 ? void 0 : _action$options.headers)
          }, signal ? {
            signal: signal
          } : {});
          operation = action.operation;
          pageResponses.set(requestOptions, function (response, context) {
            operation = context !== null && context !== void 0 ? context : operation;
          });
          if (operation) {
            operationContexts.set(requestOptions, operation);
          }
          _context14.next = 1;
          return _Api.sendRequest(path, 'GET', {}, requestOptions);
        case 1:
          response = _context14.sent;
          return _context14.abrupt("return", {
            operation: operation,
            response: response
          });
        case 2:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x48, _x49, _x50) {
    return _ref33.apply(this, arguments);
  };
}());
// The items of a cursor-paginated list operation, one at a time, as an async iterator. listPage(params, options) is
// the operation's own list method, so each page is checked, requested and made into models just as a list call is;
// the iterator decides only when to request a page, and with which cursor.
//
// - Nothing is requested before the first next(). The call's params, with their JSON-like containers at every depth,
//   and its options, headers included, are copied now, so changing the caller's objects later changes no page;
//   agents and other functions are kept as given. Params that are not an object are kept as given too, for the list
//   method to reject when the first page is requested.
// - The settings are taken now as well: the call's client, or for a call made without one, a copy of the global
//   settings as they are now (Files._currentSettings()), so changing them later changes no page. Each page is
//   requested with them, as a client's call is, and its models keep them, with the call's options but not its signal.
// - The next page is requested only once every item of the current one has been taken, and only the current page's
//   remaining items are kept. Each page has its own copy of the headers, which its models keep, so changing one
//   model's headers changes no other page.
// - Each cursor is sent as the API returned it. A page without a next cursor is the last, while an empty page with one
//   is not. A page whose next cursor is the one it was requested with fails, rather than being requested again.
// - next() and return() calls run one at a time, in the order made, so at most one page is being requested. return(),
//   as leaving a for await loop calls it, drops the current page and requests nothing more; it waits for a request
//   already under way, which only options.signal cancels, without a retry. A failed request, a cancelled one
//   included, rejects next() and ends the iteration.
// - Once options.signal has aborted, the next next() rejects with its reason, unchanged, even for the rest of a page
//   already received, which is dropped, and no further page is requested. An iteration already ended stays ended.
// - Every later page is requested with the context the first page's request was sent with, its headers, credential
//   and workspace included, at its site, or at the host a lockout region mismatch rerouted an earlier page to (see
//   Api.sendRequest).
(0, _defineProperty2.default)(Api, "_iterate", function (params, options, listPage) {
  var _options$client4;
  var callParams = (0, _utils.isObject)(params) ? _copyContainers(_objectSpread({}, params)) : params;
  var client = (_options$client4 = options === null || options === void 0 ? void 0 : options.client) !== null && _options$client4 !== void 0 ? _options$client4 : _Files.default._currentSettings();
  if (client !== (options === null || options === void 0 ? void 0 : options.client)) {
    globalSettingsCopies.add(client);
  }
  var callOptions = _objectSpread(_objectSpread({}, options), {}, {
    client: client,
    headers: _objectSpread({}, options === null || options === void 0 ? void 0 : options.headers)
  });
  var signal = callOptions.signal;
  var items = [];
  var requested = false;
  var finished = false;
  var nextCursor = callParams === null || callParams === void 0 ? void 0 : callParams.cursor;
  var operation;
  var queue = Promise.resolve();
  var finish = function finish() {
    finished = true;
    items = [];
  };

  // Requests the next page, whose items become the current ones, and reads the cursor of the page after it. Each page
  // after the first is requested in the operation's context, as the page before it left it: from the host a lockout
  // region mismatch rerouted an earlier page to, if any. A page's context is kept only once its request is done, so
  // that a call its models make later, with the same options, changes no page.
  var requestPage = /*#__PURE__*/function () {
    var _ref34 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee15() {
      var pageCursor, pageOptions, pageResponse, pageOperation, _t13;
      return _regenerator.default.wrap(function (_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            pageCursor = nextCursor;
            pageOptions = _objectSpread(_objectSpread({}, callOptions), {}, {
              headers: _objectSpread({}, callOptions.headers)
            });
            pageResponses.set(pageOptions, function (response, context) {
              pageResponse = response;
              pageOperation = context;
            });
            if (operation) {
              operationContexts.set(pageOptions, operation);
            }
            _context15.prev = 1;
            _context15.next = 2;
            return listPage(requested ? _objectSpread(_objectSpread({}, callParams), {}, {
              cursor: pageCursor
            }) : callParams, pageOptions);
          case 2:
            items = _context15.sent;
            _context15.next = 4;
            break;
          case 3:
            _context15.prev = 3;
            _t13 = _context15["catch"](1);
            finish();
            throw _t13;
          case 4:
            requested = true;
            operation = pageOperation !== null && pageOperation !== void 0 ? pageOperation : operation;
            nextCursor = nextCursorOf(pageResponse);
            if (!(nextCursor && nextCursor === pageCursor)) {
              _context15.next = 5;
              break;
            }
            finish();
            throw new errors.FilesError('The API gave the same cursor for the next page as for this one, so the list cannot go on');
          case 5:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[1, 3]]);
    }));
    return function requestPage() {
      return _ref34.apply(this, arguments);
    };
  }();

  // Settles with the next item, or the end, requesting pages one after another until one has items. Each request is
  // made from the callback of the one before and settles this one promise, rather than a promise awaiting the next, so
  // a run of empty pages, however long, holds nothing but the current page and the request under way. Once a page has
  // been received and the call's signal has aborted, the iteration is cancelled before anything more is given or
  // requested: it rejects with the signal's reason, as a cancelled call does, and the current page is dropped. An
  // iteration that has ended already stays ended.
  var take = function take() {
    return new Promise(function (resolve, reject) {
      var _step = function step() {
        if (finished) {
          resolve({
            done: true,
            value: undefined
          });
        } else if (requested && signal !== null && signal !== void 0 && signal.aborted) {
          finish();
          reject(abortReason(signal));
        } else if (items.length > 0) {
          resolve({
            done: false,
            value: items.shift()
          });
        } else if (requested && !nextCursor) {
          finish();
          resolve({
            done: true,
            value: undefined
          });
        } else {
          requestPage().then(_step).catch(reject);
        }
      };
      _step();
    });
  };
  var inTurn = function inTurn(step) {
    var result = queue.then(step);
    queue = result.then(function () {}, function () {});
    return result;
  };
  return (0, _defineProperty2.default)({
    next: function next() {
      return inTurn(take);
    },
    return: function _return(value) {
      return inTurn(function () {
        finish();
        return {
          done: true,
          value: value
        };
      });
    }
  }, Symbol.asyncIterator, function () {
    return this;
  });
});
var _default = exports.default = Api;
module.exports = Api;
module.exports.default = Api;