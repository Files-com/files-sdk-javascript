"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _worker_threads = require("worker_threads");
var _DownloadWorkersNode = require("./DownloadWorkers.node.js");
var _FileNode = require("./File.node.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// One of the SDK's download threads (see DownloadWorkers.node.js). It sends each request the download's thread gives it,
// with the same httpsExchange() and its budget as that thread would: everything the request needs made ready first, its
// agent included, then one last check of the download's stop, its pause and its URL's expiry, with nothing between that
// check and the request. It takes the request's body with the same pump(), copying it into the request's one buffer,
// which goes back to the download's thread to be written once it is full, and once the body has been taken, and takes no
// more of the body until it comes back. A request that fails while its body is being taken, or whose response closes
// before it is complete, waits for nothing more, however much of its response had been received or taken: its failure
// is its outcome. The thread writes no file, has no file's descriptor or path, and calls none of the caller's callbacks:
// the download's thread does all of that.

// The requests this thread was given and sent, by number, until nothing more can come of them.
var requests = new Map();

// Agents made as https's global agent is here, with the CA certificates of the download thread's agent, by those.
var agents = new Map();
var post = function post(message) {
  var transfer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _worker_threads.parentPort.postMessage(message, transfer);
};
var isStopped = function isStopped(request) {
  return request.stopped || Atomics.load(request.counts, _DownloadWorkersNode.STOP) === 1;
};
var isPaused = function isPaused(request) {
  return request.paused !== null && Atomics.load(request.paused, 0) === 1;
};

// What a body that closed before its end without an error of its own fails with, as Node.js's own stream utilities name
// it: pump() reports it as the download's incomplete-response error, or as the budget's error when the budget ended it.
var prematureClose = function prematureClose() {
  return Object.assign(new Error('Premature close'), {
    code: 'ERR_STREAM_PREMATURE_CLOSE'
  });
};

// The agent a request goes through: https's global agent here, which the download's thread found set up as its own (see
// laneFor()), or, with ca, CA certificates of that one's, an agent made as this one is but with them, one for each set
// of them, so that its sockets serve every request with the same.
var agentWith = function agentWith(ca) {
  var https = require('https');
  if (ca === undefined) {
    return https.globalAgent;
  }
  var _require = require('crypto'),
    createHash = _require.createHash;
  var hash = createHash('sha256');
  var parts = Array.isArray(ca) ? ca : [ca];
  parts.forEach(function (part) {
    if (typeof part === 'string') {
      hash.update("string ".concat(part.length, "\n"));
      hash.update(part);
    } else {
      hash.update("bytes ".concat(part.byteLength, "\n"));
      hash.update(new Uint8Array(part.buffer, part.byteOffset, part.byteLength));
    }
  });
  var key = hash.digest('hex');
  if (!agents.has(key)) {
    agents.set(key, new https.Agent(_objectSpread(_objectSpread({}, https.globalAgent.options), {}, {
      ca: ca
    })));
  }
  return agents.get(key);
};

// Lets a request go once nothing more can come of it: once it has closed and its body has been read, or it was
// stopped, or it failed before it was answered.
var forget = function forget(request) {
  if (request.closed && (request.outcome || request.toldToStop || request.refused)) {
    requests.delete(request.id);
  }
};

// Tells the request's witness, which only the SDK's own tests give (see forTests in DownloadWorkers.node.js), how the
// request stood as it broke: whether its response had been received and parsed to its end, whether some of its body
// was still to be taken, and whether a batch of it was waiting to be given back.
var witnessBreak = function witnessBreak(request) {
  var witness = request.witness;
  if (witness !== null) {
    Atomics.store(witness, 1, request.opened.complete() ? 1 : 0);
    Atomics.store(witness, 2, request.copied < request.expected ? 1 : 0);
    Atomics.store(witness, 3, request.credit === null ? 0 : 1);
    Atomics.store(witness, 0, 1);
  }
};

// The request broke while its body was being taken: its request or response failed, as the body's own error, failure,
// the first the exchange saw (see httpsExchange()), or its budget's running out tells, however much of its response had
// been received, parsed or taken, every byte it was to read included; or, without a failure, its response closed before
// it was complete. No more of it can come, so the waits that would let more of it be taken end, as that failure: a
// batch waiting to be given back is then given up, paused or not, and the body's failure is the request's outcome (see
// read()). A response that closed complete, without a failure, as one does once read to its end, has not broken.
var breakOff = function breakOff(request, failure) {
  var _ref, _request$bodyError, _request$credit, _request$resume;
  if (!request.pumping || request.broken !== null) {
    return;
  }
  var failed = (_ref = (_request$bodyError = request.bodyError) !== null && _request$bodyError !== void 0 ? _request$bodyError : failure) !== null && _ref !== void 0 ? _ref : request.opened.failure(null);
  if (failed === null && request.opened.complete()) {
    return;
  }
  witnessBreak(request);
  request.failed = failed;
  request.broken = failed !== null && failed !== void 0 ? failed : prematureClose();
  (_request$credit = request.credit) === null || _request$credit === void 0 || _request$credit.call(request, {
    broken: true
  });
  (_request$resume = request.resume) === null || _request$resume === void 0 || _request$resume.call(request);
};

// Waits, before the request's body is read any further, for the download to be resumed, when it is paused, telling the
// download's thread so; or for it to be stopped, or the request to have broken.
var running = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(request) {
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(!isStopped(request) && request.broken === null && isPaused(request))) {
            _context.next = 2;
            break;
          }
          post({
            task: request.id,
            type: 'paused'
          });

          // eslint-disable-next-line no-await-in-loop
          _context.next = 1;
          return new Promise(function (resolve) {
            request.resume = resolve;
          });
        case 1:
          request.resume = null;
          _context.next = 0;
          break;
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function running(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// A writer, for pump(), of a request's body into the request's buffer: each chunk is copied into it as it comes, and,
// once it is full, it goes to the download's thread, and nothing more is taken, the rest of the same chunk included,
// until it comes back, the download running; flush() gives what is held, for the last time. Resolves add() and flush()
// with nothing more done once the request has stopped or broken, and fails them when the download's thread could not
// write the batch.
var batchesOf = function batchesOf(request) {
  // Gives the buffer, as far as it is filled, to the download's thread, and resolves with whether the request goes on,
  // the buffer back, and, unless it was the last, the download running and the request not broken. The last comes once
  // the body has been taken, to its end or its failure, so that nothing of the request's breaking concerns it.
  var give = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(last) {
      var buffer, filled, answer;
      return _regenerator.default.wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            buffer = request.buffer, filled = request.filled;
            request.buffer = null;
            request.filled = 0;
            post({
              buffer: buffer,
              last: last,
              length: filled,
              task: request.id,
              type: 'batch'
            }, [buffer]);
            _context2.next = 1;
            return new Promise(function (resolve) {
              request.credit = resolve;
            });
          case 1:
            answer = _context2.sent;
            request.credit = null;
            if (!answer.failed) {
              _context2.next = 2;
              break;
            }
            throw new Error('The download could not write a batch of the response');
          case 2:
            if (!(answer.broken || answer.buffer === undefined)) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", false);
          case 3:
            request.buffer = answer.buffer;
            if (!last) {
              _context2.next = 4;
              break;
            }
            return _context2.abrupt("return", !isStopped(request));
          case 4:
            _context2.next = 5;
            return running(request);
          case 5:
            return _context2.abrupt("return", !isStopped(request) && request.broken === null);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function give(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  return {
    add: function add(chunk) {
      if (chunk.length < request.buffer.byteLength - request.filled) {
        new Uint8Array(request.buffer, request.filled, chunk.length).set(chunk);
        request.filled += chunk.length;
        request.copied += chunk.length;
        return undefined;
      }
      return (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var taken, part, _t;
        return _regenerator.default.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              taken = 0;
            case 1:
              if (!(taken < chunk.length)) {
                _context3.next = 5;
                break;
              }
              part = Math.min(request.buffer.byteLength - request.filled, chunk.length - taken);
              new Uint8Array(request.buffer, request.filled, part).set(chunk.subarray(taken, taken + part));
              request.filled += part;
              request.copied += part;
              taken += part;

              // eslint-disable-next-line no-await-in-loop
              _t = request.filled === request.buffer.byteLength;
              if (!_t) {
                _context3.next = 3;
                break;
              }
              _context3.next = 2;
              return give(false);
            case 2:
              _t = !_context3.sent;
            case 3:
              if (!_t) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return");
            case 4:
              _context3.next = 1;
              break;
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    flush: function () {
      var _flush = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", request.buffer === null || request.filled === 0 ? !isStopped(request) : give(true));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function flush() {
        return _flush.apply(this, arguments);
      }
      return flush;
    }()
  };
};
var stoppedError = function stoppedError() {
  return new Error('Download request stopped');
};

// The request's outcome, as pump() gave it, for the download's thread.
var settle = function settle(request, _ref5) {
  var error = _ref5.error,
    excludedMs = _ref5.excludedMs,
    kind = _ref5.kind,
    ok = _ref5.ok,
    received = _ref5.received;
  request.outcome = true;
  post({
    error: ok ? null : (0, _DownloadWorkersNode.describeError)(error),
    excludedMs: excludedMs,
    kind: ok ? null : kind,
    ok: ok,
    received: received,
    task: request.id,
    type: 'outcome'
  });
  forget(request);
};

// Sends a request, unless, at this last check, the download has stopped, is paused, or the URL has expired by this
// thread's clock, telling the download's thread either way; then tells it the request's response, or its failure, as
// unanswered() judges it, and once it has closed. Everything the request needs, its agent included, is made ready
// before that check, so that nothing comes between the check and the request. gate, given only by the SDK's own tests
// (see forTests in DownloadWorkers.node.js), holds the request between the two; witness, given only by them too, is
// told how the request stood if it breaks (see breakOff()).
var send = function send(_ref6) {
  var ca = _ref6.ca,
    counts = _ref6.counts,
    gate = _ref6.gate,
    headers = _ref6.headers,
    highWaterMark = _ref6.highWaterMark,
    paused = _ref6.paused,
    task = _ref6.task,
    timeoutSecs = _ref6.timeoutSecs,
    url = _ref6.url,
    witness = _ref6.witness;
  var request = {
    bodyError: null,
    broken: null,
    buffer: null,
    closed: false,
    copied: 0,
    counts: counts,
    credit: null,
    exchange: null,
    expected: 0,
    failed: null,
    filled: 0,
    id: task,
    opened: null,
    outcome: false,
    paused: paused,
    pumping: false,
    refused: false,
    resume: null,
    stopped: false,
    toldToStop: false,
    witness: witness !== null && witness !== void 0 ? witness : null
  };
  var agent = null;
  var unsent = null;
  try {
    agent = agentWith(ca);
    if (gate !== null && gate !== undefined) {
      Atomics.store(gate, 1, 1);
      Atomics.wait(gate, 0, 0);
    }
    if (isStopped(request)) {
      unsent = 'stopped';
    } else if (isPaused(request)) {
      unsent = 'paused';
    } else if (require('../Api.js').default._storageExpired({
      url: url
    })) {
      unsent = 'expired';
    } else {
      request.exchange = (0, _FileNode.httpsExchange)(url, {
        agent: agent,
        highWaterMark: highWaterMark
      }, headers, _FileNode.silentLog, timeoutSecs);
    }
  } catch (error) {
    post({
      error: (0, _DownloadWorkersNode.describeError)(error),
      task: task,
      terminal: (0, _FileNode.isPermanent)(error, url),
      type: 'unsent',
      why: 'refused'
    });
    return;
  }
  if (unsent !== null) {
    post({
      task: task,
      type: 'unsent',
      why: unsent
    });
    return;
  }
  requests.set(task, request);
  post({
    task: task,
    type: 'sent'
  });
  request.exchange.response.then(function (opened) {
    request.opened = opened;
    opened.body.on('error', function (error) {
      if (request.bodyError === null) {
        request.bodyError = error;
      }
    });
    post({
      headers: _objectSpread({}, opened.headers),
      status: opened.status,
      statusText: opened.statusText,
      task: task,
      type: 'head'
    });
  }, function (error) {
    var failed = (0, _FileNode.unanswered)(error, url);
    request.refused = true;
    post({
      error: (0, _DownloadWorkersNode.describeError)(failed.error),
      expired: failed.expired === true,
      task: task,
      terminal: failed.terminal === true,
      type: 'failed',
      unsent: failed.unsent === true
    });
    forget(request);
  });
  request.exchange.broken.then(function (failure) {
    return breakOff(request, failure);
  });
  request.exchange.closed.then(function () {
    request.closed = true;
    post({
      task: task,
      type: 'closed'
    });
    forget(request);
  });
};

// Reads a request's body, expected bytes, as readRangeBytes() in File.node.js reads one, into buffer, the request's one
// buffer, and gives the rest of it to the download's thread once read to its end or broken; ends the request's budget
// once the body has been read and written, or stops the request otherwise; and tells the download's thread the outcome.
// Once the request has broken, as its pause shows pump(), no chunk of it is taken, and the pause's wait ends as the
// body's failure; one that broke with a failure has that failure, its budget's first, as its outcome.
var read = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(_ref7) {
    var buffer, expected, task, request, writer, outcome, _t2, _t3, _t4, _t5, _t6, _t7, _t8, _t9, _t0, _t1, _t10;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          buffer = _ref7.buffer, expected = _ref7.expected, task = _ref7.task;
          request = requests.get(task);
          if (!(request === undefined)) {
            _context6.next = 1;
            break;
          }
          post({
            error: (0, _DownloadWorkersNode.describeError)(stoppedError()),
            excludedMs: 0,
            kind: 'stopped',
            ok: false,
            received: 0,
            task: task,
            type: 'outcome'
          });
          return _context6.abrupt("return");
        case 1:
          request.buffer = buffer;
          request.expected = expected;
          request.filled = 0;
          if (!(isStopped(request) || request.opened === null)) {
            _context6.next = 2;
            break;
          }
          settle(request, {
            error: stoppedError(),
            excludedMs: 0,
            kind: 'stopped',
            ok: false,
            received: 0
          });
          return _context6.abrupt("return");
        case 2:
          writer = batchesOf(request);
          request.pumping = true;
          _t2 = _FileNode.pump;
          _t3 = function () {
            var _whenRunning2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
              return _regenerator.default.wrap(function (_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 1;
                    return running(request);
                  case 1:
                    if (!(request.broken !== null)) {
                      _context5.next = 2;
                      break;
                    }
                    throw request.broken;
                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            function _whenRunning() {
              return _whenRunning2.apply(this, arguments);
            }
            return _whenRunning;
          }();
          _t4 = {
            _whenRunning: _t3,
            get paused() {
              return request.broken !== null || isPaused(request);
            }
          };
          _t5 = expected;
          _t6 = _FileNode.silentLog;
          _t7 = request.opened;
          _t8 = {
            sent: function sent(bytes) {
              Atomics.add(request.counts, _DownloadWorkersNode.RECEIVED, bytes);
            }
          };
          _t9 = undefined;
          _t0 = {
            get aborted() {
              return isStopped(request);
            },
            reason: _t9
          };
          _t1 = writer;
          _context6.next = 3;
          return _t2({
            control: _t4,
            expected: _t5,
            log: _t6,
            offset: 0,
            opened: _t7,
            progress: _t8,
            signal: _t0,
            writer: _t1
          });
        case 3:
          outcome = _context6.sent;
          request.pumping = false;

          // Whatever pump() made of the end of the body that followed a failure the request broke with, it tells nothing of
          // the body: nothing more of it was taken once the request broke, not even the rest of a chunk pump() had counted.
          if (request.failed !== null && (outcome.ok || outcome.kind === 'body')) {
            outcome = _objectSpread(_objectSpread({}, outcome), {}, {
              error: request.opened.failure(request.failed),
              kind: 'body',
              ok: false
            });
          }
          if (!(outcome.ok || outcome.kind === 'body')) {
            _context6.next = 8;
            break;
          }
          _context6.prev = 4;
          _context6.next = 5;
          return writer.flush();
        case 5:
          if (_context6.sent) {
            _context6.next = 6;
            break;
          }
          outcome = _objectSpread(_objectSpread({}, outcome), {}, {
            error: stoppedError(),
            kind: 'stopped',
            ok: false
          });
        case 6:
          _context6.next = 8;
          break;
        case 7:
          _context6.prev = 7;
          _t10 = _context6["catch"](4);
          outcome = _objectSpread(_objectSpread({}, outcome), {}, {
            error: _t10,
            kind: 'terminal',
            ok: false
          });
        case 8:
          if (outcome.ok) {
            request.exchange.finish();
          } else {
            request.exchange.stop();
          }
          settle(request, outcome);
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 7]]);
  }));
  return function read(_x3) {
    return _ref8.apply(this, arguments);
  };
}();
var credit = function credit(_ref9) {
  var _requests$get, _requests$get$credit;
  var buffer = _ref9.buffer,
    failed = _ref9.failed,
    task = _ref9.task;
  (_requests$get = requests.get(task)) === null || _requests$get === void 0 || (_requests$get$credit = _requests$get.credit) === null || _requests$get$credit === void 0 || _requests$get$credit.call(_requests$get, failed ? {
    failed: true
  } : {
    buffer: buffer
  });
};

// The download's thread has stopped the request: it is stopped here at once, and any wait of its body ends.
var stop = function stop(_ref0) {
  var _request$credit2, _request$resume2;
  var task = _ref0.task;
  var request = requests.get(task);
  if (request === undefined) {
    return;
  }
  request.stopped = true;
  request.toldToStop = true;
  request.exchange.stop();
  (_request$credit2 = request.credit) === null || _request$credit2 === void 0 || _request$credit2.call(request, {});
  (_request$resume2 = request.resume) === null || _request$resume2 === void 0 || _request$resume2.call(request);
  forget(request);
};
var resume = function resume(_ref1) {
  var _requests$get2, _requests$get2$resume;
  var task = _ref1.task;
  (_requests$get2 = requests.get(task)) === null || _requests$get2 === void 0 || (_requests$get2$resume = _requests$get2.resume) === null || _requests$get2$resume === void 0 || _requests$get2$resume.call(_requests$get2);
};
if (_worker_threads.parentPort !== null && (_worker_threads.workerData === null || _worker_threads.workerData === void 0 ? void 0 : _worker_threads.workerData.filesDownloadThread) === true) {
  _worker_threads.parentPort.on('message', function (message) {
    switch (message === null || message === void 0 ? void 0 : message.type) {
      case 'send':
        send(message);
        break;
      case 'read':
        read(message);
        break;
      case 'credit':
        credit(message);
        break;
      case 'stop':
        stop(message);
        break;
      case 'resume':
        resume(message);
        break;
      default:
        break;
    }
  });

  // The SDK's own judgments of URLs and failures (see send()) are loaded before the thread is ready, so that none of
  // its requests waits for them, and a thread that cannot load them is never used.
  require('../Api.js');
  post({
    defaults: (0, _DownloadWorkersNode.describeDefaults)(),
    type: 'ready'
  });
}