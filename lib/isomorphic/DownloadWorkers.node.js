"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.prepare = exports.laneFor = exports.forTests = exports.describeError = exports.describeDefaults = exports.STOP = exports.RECEIVED = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _util = require("util");
var errors = _interopRequireWildcard(require("../Errors"));
var _Transfer = require("../Transfer");
var _FileNode = require("./File.node.js");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// The SDK's download threads: at most two, made on the process's main thread only, as a split download to disk first
// needs them, on which the later ranges of such a download can be read (see run() in File.node.js), so that the work of
// the network and of taking response bodies is not all on one thread. A download thread (see DownloadWorker.node.js) only
// sends the request it is given and takes its body. Everything else stays with the download on its own thread: its
// admission and permits, its URL and its renewal, its retries, the verdict on each response, every write to its file,
// every count of its progress and every call of its callbacks. No thread is given the file, its descriptor or its path.
//
// A request's body comes back from its thread one batch at a time, in memory of the download's own: one buffer for the
// request, made as its body is to be read, which is its thread's while it fills it and the download's while it writes
// it. The download gives it back only once that batch has been written, and its progress counted and callbacks run,
// and not while the download is paused or after it has stopped; the thread takes no more of the body until then. So a
// request holds no more of its body than one read on the download's own thread does, and only while it holds its permits.
// A request is the download's until it has closed and its outcome has come, once every batch of it being written has
// been: a stop of the download reaches its thread whenever it comes, and a request that breaks while a batch of it waits
// to be given back ends with that failure, paused or not.
//
// A thread that is not ready yet, or is set up otherwise than the download's own (see describeDefaults()), is not used,
// and a request it is not given is sent on the download's own thread as before, never having gone anywhere. No thread is
// made in a process started to run a program of its own before or in place of a thread's (see startsPrograms()), which
// every thread made with the process's options would run again. A thread that stops unexpectedly fails, for good, every
// request it was given, sent or not, once what of them the download had to write has been written; and no request is
// given to any download thread from then on.

// The most download threads there are at once in the process.
var MAX_THREADS = 2;

// How long a download thread with nothing to do is kept before it is stopped.
var IDLE_MS = 5000;

// The elements of the counts a request's thread and the download share (see open()): STOP, 1 once the download has
// stopped the request; and RECEIVED, the bytes of its body the thread has taken.
var STOP = exports.STOP = 0;
var RECEIVED = exports.RECEIVED = 1;

// The most CA certificates, and bytes of them, a request takes along to its thread (see canonicalCertificates()).
var MAX_CERTIFICATES = 4096;
var MAX_CERTIFICATE_BYTES = 16 * 1024 * 1024;

// The own properties of https's global agent that hold what it is doing rather than how it is set up: its requests,
// sockets, sessions and listeners, the last described apart, and its options, described apart too.
var AGENT_STATE = ['_events', '_eventsCount', '_sessionCache', 'freeSockets', 'options', 'requests', 'sockets', 'totalSocketCount'];

// The options that make Node.js run a program before a thread's own, or in its place (see startsPrograms()).
var PROGRAM_OPTIONS = ['--eval', '--experimental-loader', '--import', '--loader', '--print', '--require', '-e', '-p', '-r'];

// The fields of an error a download thread made that a download may read besides its class and message.
var ERROR_FIELDS = ['code', 'errno', 'name', 'syscall'];
var ERROR_CLASSES = {
  Error: Error,
  RangeError: RangeError,
  TypeError: TypeError
};
var PLAIN_TYPES = ['bigint', 'boolean', 'number', 'string', 'undefined'];
var TYPED_ARRAY_PROTOTYPE = Object.getPrototypeOf(Uint8Array.prototype);
var isPlainValue = function isPlainValue(value) {
  return value === null || PLAIN_TYPES.includes((0, _typeof2.default)(value));
};
var byName = function byName(_ref, _ref2) {
  var _ref3 = (0, _slicedToArray2.default)(_ref, 1),
    left = _ref3[0];
  var _ref4 = (0, _slicedToArray2.default)(_ref2, 1),
    right = _ref4[0];
  return left < right ? -1 : Number(left > right);
};

// The own properties of target, but those named in skipped, as [name, value] entries in order of name; or null when any
// is not a plain value: an accessor, a function or an object.
var plainEntries = function plainEntries(target) {
  var skipped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var entries = [];
  var plain = Reflect.ownKeys(target).filter(function (key) {
    return !skipped.includes(key);
  }).every(function (key) {
    var descriptor = Reflect.getOwnPropertyDescriptor(target, key);
    if (!('value' in descriptor) || !isPlainValue(descriptor.value)) {
      return false;
    }
    entries.push([(0, _typeof2.default)(key) === 'symbol' ? "symbol ".concat(key.description) : "string ".concat(key), descriptor.value]);
    return true;
  });
  return plain ? entries.sort(byName) : null;
};

// A typed array's own buffer, byteOffset or byteLength, as the language's own getters give it, whatever the array has
// of its own.
var typedArrayField = function typedArrayField(view, name) {
  return Reflect.apply(Reflect.getOwnPropertyDescriptor(TYPED_ARRAY_PROTOTYPE, name).get, view, []);
};

// One CA certificate as data of the SDK's own, with its size: a string, as it is, or a copy of a typed array's bytes, of
// at most room of them; or null for anything else, or anything larger.
var canonicalCertificate = function canonicalCertificate(value, room) {
  if (typeof value === 'string') {
    return value.length <= room ? {
      bytes: value.length,
      certificate: value
    } : null;
  }
  if (!_util.types.isTypedArray(value)) {
    return null;
  }
  var bytes = typedArrayField(value, 'byteLength');
  if (bytes > room) {
    return null;
  }
  var view = new Uint8Array(typedArrayField(value, 'buffer'), typedArrayField(value, 'byteOffset'), bytes);
  return {
    bytes: bytes,
    certificate: view.slice()
  };
};

// The CA certificates of https's global agent's options as data of the SDK's own, which any thread can be given: one
// certificate (see canonicalCertificate()), or an array of them, of at most MAX_CERTIFICATES, every element its own
// value and no other property of its own; MAX_CERTIFICATE_BYTES of them in all at most. Anything else is null, an
// accessor or a proxy included, and nothing of it is called to tell.
var canonicalCertificates = function canonicalCertificates(value) {
  if (!Array.isArray(value)) {
    var _canonicalCertificate, _canonicalCertificate2;
    return (_canonicalCertificate = (_canonicalCertificate2 = canonicalCertificate(value, MAX_CERTIFICATE_BYTES)) === null || _canonicalCertificate2 === void 0 ? void 0 : _canonicalCertificate2.certificate) !== null && _canonicalCertificate !== void 0 ? _canonicalCertificate : null;
  }
  if (_util.types.isProxy(value)) {
    return null;
  }
  var _Reflect$getOwnProper = Reflect.getOwnPropertyDescriptor(value, 'length'),
    length = _Reflect$getOwnProper.value;
  if (length > MAX_CERTIFICATES || Reflect.ownKeys(value).length !== length + 1) {
    return null;
  }
  var certificates = [];
  var room = MAX_CERTIFICATE_BYTES;
  for (var index = 0; index < length; index += 1) {
    var descriptor = Reflect.getOwnPropertyDescriptor(value, String(index));
    var taken = descriptor && 'value' in descriptor ? canonicalCertificate(descriptor.value, room) : null;
    if (taken === null) {
      return null;
    }
    room -= taken.bytes;
    certificates.push(taken.certificate);
  }
  return certificates;
};

// How https's global agent, Node.js's TLS defaults and its DNS lookups' default order are set up on this thread, as
// data another thread can be given and compare with its own: { agent, ca, defaultCA, dnsResultOrder, listeners,
// options, tls }. It is null when that cannot be told so, as when the agent is not Node.js's own https.Agent, or has
// an accessor, a function or an object of its own beyond its options and connection state, an option that is not a
// plain value, or CA certificates other than those canonicalCertificates() takes; or when Node.js does not tell the
// order of its DNS lookups. Nothing of it is called to tell, a getter or a proxy included. ca is its options' CA
// certificates, the one setting a download thread takes on, described apart, as data of the SDK's own. defaultCA is the
// default CA certificates where Node.js lets one thread set its own (tls.setDefaultCACertificates()), as
// tls.getCACertificates() gives them; and else null, as no thread can then have its own. dnsResultOrder is the order
// in which dns.lookup(), and so the agent, gives a host's addresses by default, as dns.getDefaultResultOrder() gives
// it: every thread has its own, which dns.setDefaultResultOrder() on another does not change.
var describeDefaults = exports.describeDefaults = function describeDefaults() {
  var dns = require('dns');
  var https = require('https');
  var tls = require('tls');
  var agent = https.globalAgent;
  if ((0, _typeof2.default)(agent) !== 'object' || agent === null || _util.types.isProxy(agent) || Object.getPrototypeOf(agent) !== https.Agent.prototype) {
    return null;
  }
  var optionsDescriptor = Reflect.getOwnPropertyDescriptor(agent, 'options');
  if (!optionsDescriptor || !('value' in optionsDescriptor) || (0, _typeof2.default)(optionsDescriptor.value) !== 'object' || optionsDescriptor.value === null || _util.types.isProxy(optionsDescriptor.value)) {
    return null;
  }
  var options = optionsDescriptor.value;
  var caDescriptor = Reflect.getOwnPropertyDescriptor(options, 'ca');
  if (caDescriptor && !('value' in caDescriptor)) {
    return null;
  }
  var ca = caDescriptor === undefined || caDescriptor.value === undefined ? undefined : canonicalCertificates(caDescriptor.value);
  if (ca === null) {
    return null;
  }
  var agentEntries = plainEntries(agent, AGENT_STATE);
  var optionEntries = plainEntries(options, ['ca']);
  if (agentEntries === null || optionEntries === null || typeof dns.getDefaultResultOrder !== 'function') {
    return null;
  }
  var defaultCA = null;
  if (typeof tls.setDefaultCACertificates === 'function') {
    defaultCA = typeof tls.getCACertificates === 'function' ? tls.getCACertificates('default') : null;
    if (!Array.isArray(defaultCA)) {
      return null;
    }
  }
  return {
    agent: agentEntries,
    ca: ca,
    defaultCA: defaultCA,
    dnsResultOrder: dns.getDefaultResultOrder(),
    listeners: agent.eventNames().map(function (name) {
      return [String(name), agent.listenerCount(name)];
    }).sort(byName),
    options: optionEntries,
    tls: [tls.DEFAULT_CIPHERS, tls.DEFAULT_ECDH_CURVE, tls.DEFAULT_MAX_VERSION, tls.DEFAULT_MIN_VERSION]
  };
};
var sameEntries = function sameEntries(left, right) {
  return left.length === right.length && left.every(function (_ref5, index) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
      name = _ref6[0],
      value = _ref6[1];
    return name === right[index][0] && Object.is(value, right[index][1]);
  });
};

// Whether default CA certificates are the same as another thread's, every one, in order: both null, as no thread has
// its own, or both the same.
var sameCertificates = function sameCertificates(current, theirs) {
  if (current === null || theirs === null) {
    return current === theirs;
  }
  return current.length === theirs.length && current.every(function (certificate, index) {
    return certificate === theirs[index];
  });
};

// Whether current, this thread's setup now (see describeDefaults()), is a thread's, theirs, but for the CA certificates
// of the agent's options.
var sameDefaults = function sameDefaults(current, theirs) {
  return sameEntries(current.agent, theirs.agent) && sameEntries(current.options, theirs.options) && sameEntries(current.listeners, theirs.listeners) && current.tls.length === theirs.tls.length && current.tls.every(function (value, index) {
    return Object.is(value, theirs.tls[index]);
  }) && sameCertificates(current.defaultCA, theirs.defaultCA) && current.dnsResultOrder === theirs.dnsResultOrder;
};

// Whether an argument of the process's command line, or of its NODE_OPTIONS, is one of PROGRAM_OPTIONS, given as Node.js
// takes it: alone, or with its value after =, a name's _ standing for -, and, in NODE_OPTIONS, quoted.
var isProgramOption = function isProgramOption(argument) {
  return PROGRAM_OPTIONS.includes(argument.replace(/^["']+|["']+$/g, '').split('=')[0].replace(/_/g, '-'));
};

// Whether the process was started to run a program of its own before a thread's, preloaded with --require or --import,
// or a module loader, or in its place, with --eval or --print: on its command line or in NODE_OPTIONS. A thread made
// with the process's options, as one is by default, would run that program again (see Node.js's worker_threads), so
// such a process makes no download thread, and downloads as it always has, its options all its own.
var startsPrograms = function startsPrograms() {
  var _process$env$NODE_OPT;
  return process.execArgv.some(isProgramOption) || "".concat((_process$env$NODE_OPT = process.env.NODE_OPTIONS) !== null && _process$env$NODE_OPT !== void 0 ? _process$env$NODE_OPT : '').split(/\s+/).filter(Boolean).some(isProgramOption);
};

// An error a download thread made, as data the download's thread can be given (see errorFrom()): its class, among those
// it can be made again as, its message, and the fields of ERROR_FIELDS a retry's judgment may read.
var describeError = exports.describeError = function describeError(error) {
  if ((0, _typeof2.default)(error) !== 'object' || error === null) {
    return {
      errorClass: 'Error',
      message: String(error)
    };
  }
  var errorClass = 'Error';
  if (error instanceof errors.FilesError) {
    errorClass = 'FilesError';
  } else if (error instanceof TypeError) {
    errorClass = 'TypeError';
  } else if (error instanceof RangeError) {
    errorClass = 'RangeError';
  }
  var described = {
    errorClass: errorClass,
    message: String(error.message)
  };
  ERROR_FIELDS.filter(function (name) {
    return error[name] !== undefined && isPlainValue(error[name]);
  }).forEach(function (name) {
    described[name] = error[name];
  });
  return described;
};

// The error a download thread described (see describeError()), made again on this thread: an error of the same class,
// message and fields, not the same object, which never existed here.
var errorFrom = function errorFrom(described) {
  var _ERROR_CLASSES$descri;
  var ErrorClass = described.errorClass === 'FilesError' ? errors.FilesError : (_ERROR_CLASSES$descri = ERROR_CLASSES[described.errorClass]) !== null && _ERROR_CLASSES$descri !== void 0 ? _ERROR_CLASSES$descri : Error;
  var error = new ErrorClass(described.message);
  ERROR_FIELDS.filter(function (name) {
    return described[name] !== undefined && error[name] !== described[name];
  }).forEach(function (name) {
    error[name] = described[name];
  });
  return error;
};

// What a request fails with, for good, when its thread stopped unexpectedly, whatever had become of it.
var threadStopped = function threadStopped() {
  return new errors.FilesError('The download failed because the SDK\'s download thread reading part of it stopped unexpectedly');
};
var threads = [];
var readinessWatchers = new Set();
var disabled = false;
var lastRequest = 0;
var sentRequests = 0;
var nextSendGate = null;
var nextSendWitness = null;
var notifyReadiness = function notifyReadiness() {
  return (0, _toConsumableArray2.default)(readinessWatchers).forEach(function (watch) {
    return watch();
  });
};

// Whether download threads can be made here: only on the process's main thread, so that SDK calls on a thread of the
// application's own make none, where threads can share memory, and in a process started to run no program of its own
// that a thread would run again (see startsPrograms()). Told before any thread is made.
var canMakeThreads = function canMakeThreads() {
  var _require = require('worker_threads'),
    isMainThread = _require.isMainThread;
  return isMainThread && typeof SharedArrayBuffer === 'function' && (typeof Atomics === "undefined" ? "undefined" : (0, _typeof2.default)(Atomics)) === 'object' && !startsPrograms();
};

// Lets thread go once it has had nothing to do for IDLE_MS, or at once when no download thread is to be used any more,
// keeping the process alive meanwhile no longer.
var idle = function idle(thread) {
  var _thread$idleTimer$unr, _thread$idleTimer;
  if (!thread.alive) {
    return;
  }
  thread.worker.unref();
  clearTimeout(thread.idleTimer);
  thread.idleTimer = setTimeout(function () {
    if (thread.alive && thread.tasks.size === 0) {
      thread.retiring = true;
      thread.worker.terminate().catch(function () {});
    }
  }, disabled ? 0 : IDLE_MS);
  (_thread$idleTimer$unr = (_thread$idleTimer = thread.idleTimer).unref) === null || _thread$idleTimer$unr === void 0 || _thread$idleTimer$unr.call(_thread$idleTimer);
};

// Keeps thread, and the process, alive while it has a request.
var busy = function busy(thread) {
  clearTimeout(thread.idleTimer);
  thread.idleTimer = null;
  thread.worker.ref();
};

// A thread that failed or stopped unexpectedly: its requests fail for good, and no download thread is used from then
// on, those idle let go at once.
var failThread = function failThread(thread) {
  if (thread.failed) {
    return;
  }
  thread.failed = true;
  disabled = true;
  Array.from(thread.tasks.values()).forEach(function (task) {
    return task.crash();
  });
  threads.filter(function (other) {
    return other.alive && other.tasks.size === 0;
  }).forEach(idle);
  notifyReadiness();
};
var exited = function exited(thread) {
  thread.alive = false;
  clearTimeout(thread.idleTimer);
  if (!thread.retiring) {
    failThread(thread);
  }
  Array.from(thread.tasks.values()).forEach(function (task) {
    return task.exit();
  });
  thread.tasks.clear();
  var index = threads.indexOf(thread);
  if (index !== -1) {
    threads.splice(index, 1);
  }
  thread.markExited();
  notifyReadiness();
};
var receive = function receive(thread, message) {
  var _thread$tasks$get;
  if ((message === null || message === void 0 ? void 0 : message.type) === 'ready') {
    var _message$defaults;
    thread.ready = true;
    thread.defaults = (_message$defaults = message.defaults) !== null && _message$defaults !== void 0 ? _message$defaults : null;
    if (thread.tasks.size === 0) {
      idle(thread);
    }
    notifyReadiness();
    return;
  }
  (_thread$tasks$get = thread.tasks.get(message === null || message === void 0 ? void 0 : message.task)) === null || _thread$tasks$get === void 0 || _thread$tasks$get.receive(message);
};
var startThread = function startThread() {
  var _require2 = require('worker_threads'),
    Worker = _require2.Worker;
  var thread = {
    alive: true,
    defaults: null,
    failed: false,
    idleTimer: null,
    ready: false,
    retiring: false,
    tasks: new Map()
  };
  thread.exited = new Promise(function (resolve) {
    thread.markExited = resolve;
  });
  thread.worker = new Worker(require.resolve('./DownloadWorker.node.js'), {
    workerData: {
      filesDownloadThread: true
    }
  });
  thread.worker.unref();
  thread.worker.on('message', function (message) {
    return receive(thread, message);
  });
  thread.worker.on('error', function () {
    return failThread(thread);
  });
  thread.worker.on('messageerror', function () {
    failThread(thread);
    thread.worker.terminate().catch(function () {});
  });
  thread.worker.on('exit', function () {
    return exited(thread);
  });
  return thread;
};

// Makes the download threads not under way yet, up to MAX_THREADS, when they can be made and are still to be used. A
// thread that cannot be made means that none is used.
var prepare = exports.prepare = function prepare() {
  if (disabled || !canMakeThreads()) {
    return;
  }
  try {
    while (threads.length < MAX_THREADS) {
      threads.push(startThread());
    }
  } catch (_unused) {
    disabled = true;
    threads.filter(function (thread) {
      return thread.alive && thread.tasks.size === 0;
    }).forEach(idle);
    notifyReadiness();
  }
};

// Gives thread a request to send and read: url with headers, through an agent set up as https's global agent is on the
// download's thread, with ca, its CA certificates, as the request's socket buffer, highWaterMark, and its budget of
// timeoutSecs (see httpsExchange() in File.node.js); paused is the download's paused flag (see TransferControl), or
// null. Returns the request as an exchange of File.node.js's, with besides:
// - decision: resolves with { sent } once the thread has sent it; with { unsent, error, terminal } once the thread, at
//   its last check, has not, unsent saying why: 'stopped', 'paused', 'expired' for its URL, or 'refused' with the error
//   sending it failed with; or with { crashed } when the thread stopped before telling.
// - response: its response, { headers, status, statusText }, logged to log as one on the download's thread is, once the
//   thread has it; or it rejects with its failure, which failed() then gives as unanswered() judged it on the thread.
// - readInto({ control, expected, signal, writer }): reads its body, expected bytes, into writer on the download's
//   thread, a batch at a time, writing each before its thread may take more, and resolves with what pump() would have,
//   once every batch of it being written has been. signal, the download's split's, stops the request whenever it
//   aborts, the request closed or not.
// - received(): the bytes of its body its thread has taken.
// Or returns null when the thread could not be given the request at all, which has then gone nowhere. Its budget runs
// on its thread, as httpsExchange() keeps it: through the wait for the download's verdict on its response and every
// wait for a batch to be written, until its body has been read and written, or it has closed; finish() does nothing
// more here.
var _open = function open(thread, _ref7) {
  var ca = _ref7.ca,
    headers = _ref7.headers,
    highWaterMark = _ref7.highWaterMark,
    log = _ref7.log,
    paused = _ref7.paused,
    timeoutSecs = _ref7.timeoutSecs,
    url = _ref7.url;
  lastRequest += 1;
  var id = lastRequest;
  var counts = new Int32Array(new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT));
  var halted = new AbortController();
  var gate = nextSendGate;
  var witness = nextSendWitness;
  nextSendGate = null;
  nextSendWitness = null;
  var decide = null;
  var answer = null;
  var refuse = null;
  var markClosed = null;
  var decision = new Promise(function (resolve) {
    decide = resolve;
  });
  var response = new Promise(function (resolve, reject) {
    answer = resolve;
    refuse = reject;
  });
  var closed = new Promise(function (resolve) {
    markClosed = resolve;
  });
  response.catch(function () {});
  var decided = false;
  var answered = false;
  var refused = false;
  var failedAs = null;
  var _isClosed = false;
  var stopped = false;
  var crashed = false;
  var retired = false;
  var reading = null;
  var outcome = null;

  // Gives the thread a message about the request: whether it could be given. The SDK's own data always can be while the
  // thread is alive (see describeDefaults()).
  var deliver = function deliver(message) {
    var transfer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!thread.alive) {
      return false;
    }
    try {
      thread.worker.postMessage(_objectSpread(_objectSpread({}, message), {}, {
        task: id
      }), transfer);
      return true;
    } catch (_unused2) {
      return false;
    }
  };

  // Gives the thread a message about the request it has been given. One that cannot be given leaves the thread's side
  // of the request unknown, so the thread is stopped, failing its requests for good (see failThread()), rather than
  // waited on.
  var post = function post(message) {
    var transfer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!deliver(message, transfer) && thread.alive) {
      failThread(thread);
      thread.worker.terminate().catch(function () {});
    }
  };
  var settleDecision = function settleDecision(value) {
    if (!decided) {
      decided = true;
      decide(value);
    }
  };
  var respond = function respond(opened) {
    if (!answered) {
      answered = true;
      answer(opened);
    }
  };
  var refuseWith = function refuseWith(error, judged) {
    if (!answered) {
      answered = true;
      refused = true;
      failedAs = judged;
      refuse(error);
    }
  };
  var close = function close() {
    if (!_isClosed) {
      _isClosed = true;
      markClosed();
    }
  };

  // Lets the request go, its waits ended.
  var forget = function forget() {
    if (!retired) {
      retired = true;
      halted.abort();
      if (thread.tasks.delete(id) && thread.tasks.size === 0) {
        idle(thread);
      }
    }
  };

  // Lets the request go once nothing more can come of it: once it has closed and its body has been read, or it had been
  // stopped, refused or failed with its thread before its body was to be read.
  var retire = function retire() {
    if (_isClosed && (reading === null ? stopped || refused || crashed : outcome !== null)) {
      forget();
    }
  };
  var stop = function stop() {
    if (!stopped) {
      stopped = true;
      Atomics.store(counts, STOP, 1);
      post({
        type: 'stop'
      });
      halted.abort();
      retire();
    }
  };

  // Ends the reading of the request's body, with result.
  var finishReading = function finishReading(current, result) {
    current.signal.removeEventListener('abort', current.onAbort);
    current.resolve(result);
  };

  // The thread has stopped unexpectedly: the request fails for good, once any batch of it being written here has been.
  // Its first failure stands: a write's or callback's here, when one came before the thread stopped, or else the
  // thread's stopping.
  var crash = function crash() {
    if (crashed || retired) {
      return;
    }
    crashed = true;
    var error = threadStopped();
    settleDecision({
      crashed: true
    });
    refuseWith(error, {
      error: error,
      terminal: true
    });
    var current = reading;
    if (current !== null && outcome === null) {
      var _current$failed;
      var first = (_current$failed = current.failed) !== null && _current$failed !== void 0 ? _current$failed : {
        error: error
      };
      outcome = {
        ok: false
      };
      current.released.abort();
      current.writing.then(function () {
        return finishReading(current, {
          error: first.error,
          excludedMs: 0,
          kind: 'terminal',
          ok: false,
          received: Atomics.load(counts, RECEIVED)
        });
      });
    }
    halted.abort();
  };
  var exit = function exit() {
    crash();
    close();
    forget();
  };
  var onHead = function onHead(_ref8) {
    var answeredHeaders = _ref8.headers,
      status = _ref8.status,
      statusText = _ref8.statusText;
    try {
      (0, _FileNode.logDownloadResponse)(log, {
        headers: answeredHeaders,
        statusCode: status,
        statusMessage: statusText
      });
    } catch (error) {
      // A log that throws is the request's failure, as it is for a request sent on the download's thread.
      stop();
      refuseWith(error, null);
      return;
    }
    respond({
      body: null,
      complete: function complete() {
        return true;
      },
      failure: function failure(error) {
        return error;
      },
      headers: answeredHeaders,
      status: status,
      statusText: statusText
    });
  };

  // A batch of the body, length bytes of buffer: written to the download's writer, as a batch read on the download's own
  // thread is, then given back to the thread, unless the request has stopped or ended meanwhile, and only once the
  // download is not paused, but for the last, after which the thread reads nothing more. A batch that comes once the
  // request has stopped is not written: its bytes stay received only. A write or callback that fails keeps its own
  // failure for the request, the first one of it, and tells the thread to take no more.
  var onBatch = function onBatch(_ref9) {
    var buffer = _ref9.buffer,
      last = _ref9.last,
      length = _ref9.length;
    var current = reading;
    if (current === null || current.holding || outcome !== null || !_util.types.isArrayBuffer(buffer) || !Number.isSafeInteger(length) || length <= 0 || length > buffer.byteLength) {
      // No thread gives a batch so: the request fails, as one whose thread failed does.
      if (current !== null && current.failed === null) {
        current.failed = {
          error: threadStopped()
        };
      }
      stop();
      return;
    }

    // Whether the thread may take more of the body: not once the request has stopped or ended, nor once the download's
    // split has stopped, which stops the request too, so that its thread hears of it.
    var goesOn = function goesOn() {
      if (current.signal.aborted) {
        stop();
      }
      return !stopped && !crashed && !current.released.signal.aborted;
    };
    current.holding = true;
    current.writing = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _current$control, _t, _t2;
      return _regenerator.default.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (goesOn()) {
              _context.next = 1;
              break;
            }
            return _context.abrupt("return");
          case 1:
            _context.prev = 1;
            _context.next = 2;
            return current.writer.add(Buffer.from(buffer, 0, length));
          case 2:
            _context.next = 3;
            return current.writer.flush();
          case 3:
            _context.next = 5;
            break;
          case 4:
            _context.prev = 4;
            _t = _context["catch"](1);
            if (current.failed === null) {
              current.failed = {
                error: _t
              };
            }
            post({
              failed: true,
              type: 'credit'
            });
            return _context.abrupt("return");
          case 5:
            _context.prev = 5;
          case 6:
            if (!(!last && (_current$control = current.control) !== null && _current$control !== void 0 && _current$control.paused && goesOn())) {
              _context.next = 8;
              break;
            }
            _context.next = 7;
            return current.control._whenRunning((0, _Transfer.linkedSignal)([current.signal, halted.signal, current.released.signal]));
          case 7:
            _context.next = 6;
            break;
          case 8:
            _context.next = 10;
            break;
          case 9:
            _context.prev = 9;
            _t2 = _context["catch"](5);
          case 10:
            if (goesOn()) {
              post({
                buffer: buffer,
                type: 'credit'
              }, [buffer]);
            }
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 4], [5, 9]]);
    }))().finally(function () {
      current.holding = false;
    });
  };

  // The thread found the download paused as it was about to take a chunk: it goes on once the download is resumed.
  var onPaused = function onPaused() {
    var current = reading;
    if (current === null || outcome !== null) {
      return;
    }
    var resume = function resume() {
      if (!stopped && !crashed) {
        post({
          type: 'resume'
        });
      }
    };
    if (!current.control) {
      resume();
      return;
    }
    current.control._whenRunning((0, _Transfer.linkedSignal)([current.signal, halted.signal, current.released.signal])).then(resume, function () {});
  };

  // The thread has read what it was to, or stopped, or its request broke: the request's outcome, once any batch of it
  // being written here has been, with the failure of a write or callback here as it was, and the download's own stop as
  // its reason. No batch is given back from then on, a paused one's wait included.
  var onOutcome = function onOutcome(_ref1) {
    var error = _ref1.error,
      excludedMs = _ref1.excludedMs,
      kind = _ref1.kind,
      ok = _ref1.ok,
      received = _ref1.received;
    var current = reading;
    if (current === null || outcome !== null) {
      return;
    }
    outcome = {
      ok: ok
    };
    current.released.abort();
    current.writing.then(function () {
      var measured = {
        excludedMs: excludedMs !== null && excludedMs !== void 0 ? excludedMs : 0,
        received: received !== null && received !== void 0 ? received : 0
      };
      if (current.failed !== null) {
        finishReading(current, _objectSpread(_objectSpread({}, measured), {}, {
          error: current.failed.error,
          kind: 'terminal',
          ok: false
        }));
      } else if (ok && !stopped) {
        finishReading(current, _objectSpread(_objectSpread({}, measured), {}, {
          ok: true
        }));
      } else if (stopped || kind === 'stopped' || current.signal.aborted) {
        var reason = current.signal.aborted ? (0, _Transfer.abortReason)(current.signal) : errorFrom(error !== null && error !== void 0 ? error : {
          errorClass: 'Error',
          message: 'Download request stopped'
        });
        finishReading(current, _objectSpread(_objectSpread({}, measured), {}, {
          error: reason,
          kind: 'stopped',
          ok: false
        }));
      } else {
        finishReading(current, _objectSpread(_objectSpread({}, measured), {}, {
          error: errorFrom(error),
          kind: kind,
          ok: false
        }));
      }
    });
    retire();
  };
  var receiveMessage = function receiveMessage(message) {
    switch (message.type) {
      case 'unsent':
        settleDecision({
          error: message.error ? errorFrom(message.error) : null,
          terminal: message.terminal === true,
          unsent: message.why
        });
        close();
        forget();
        break;
      case 'sent':
        sentRequests += 1;
        settleDecision({
          sent: true
        });
        break;
      case 'head':
        onHead(message);
        break;
      case 'failed':
        {
          var error = errorFrom(message.error);
          refuseWith(error, {
            error: error,
            expired: message.expired === true,
            terminal: message.terminal === true,
            unsent: message.unsent === true
          });
          retire();
          break;
        }
      case 'batch':
        onBatch(message);
        break;
      case 'paused':
        onPaused();
        break;
      case 'outcome':
        onOutcome(message);
        break;
      case 'closed':
        close();
        // A request that closed with neither a response nor a failure fails.
        refuseWith(new Error('Download request closed before it was answered'), null);
        retire();
        break;
      default:
        break;
    }
  };
  var readInto = function readInto(_ref10) {
    var control = _ref10.control,
      expected = _ref10.expected,
      signal = _ref10.signal,
      writer = _ref10.writer;
    return new Promise(function (resolve) {
      if (crashed) {
        resolve({
          error: threadStopped(),
          excludedMs: 0,
          kind: 'terminal',
          ok: false,
          received: 0
        });
        return;
      }
      if (signal.aborted || stopped || reading !== null || !answered || refused) {
        // Nothing of its body is read, and its thread, which may still have the request, is told so.
        if (signal.aborted) {
          stop();
        }
        resolve({
          error: signal.aborted ? (0, _Transfer.abortReason)(signal) : new Error('Download request stopped before its body was read'),
          excludedMs: 0,
          kind: 'stopped',
          ok: false,
          received: 0
        });
        return;
      }
      var current = {
        control: control,
        failed: null,
        holding: false,
        onAbort: function onAbort() {
          return stop();
        },
        released: new AbortController(),
        resolve: resolve,
        signal: signal,
        writer: writer,
        writing: Promise.resolve()
      };
      signal.addEventListener('abort', current.onAbort, {
        once: true
      });
      reading = current;

      // The request's one buffer, made only now that its body is to be read, while it holds its permits.
      var buffer = new ArrayBuffer(Math.max(1, Math.min(_FileNode.WRITE_BATCH_BYTES, expected)));
      post({
        buffer: buffer,
        expected: expected,
        type: 'read'
      }, [buffer]);
    });
  };
  if (thread.tasks.size === 0) {
    busy(thread);
  }
  thread.tasks.set(id, {
    crash: crash,
    exit: exit,
    isClosed: function isClosed() {
      return _isClosed;
    },
    receive: receiveMessage
  });

  // A request its thread could not be given was never sent: it is let go at once, for the download to send it itself.
  if (!deliver({
    ca: ca,
    counts: counts,
    gate: gate,
    headers: headers,
    highWaterMark: highWaterMark,
    paused: paused,
    timeoutSecs: timeoutSecs,
    type: 'send',
    url: url,
    witness: witness
  })) {
    forget();
    return null;
  }
  return {
    broken: new Promise(function () {}),
    closed: closed,
    decision: decision,
    failed: function failed() {
      return failedAs;
    },
    finish: function finish() {},
    isIntact: function isIntact() {
      return true;
    },
    readInto: readInto,
    received: function received() {
      return Atomics.load(counts, RECEIVED);
    },
    response: response,
    stop: stop
  };
};

// A ready download thread to read a request on, the one with the fewest, as { open(request) } (see open()), while
// download threads are used and the download's thread is set up as they are, https's global agent, the TLS defaults and
// the DNS lookups' default order alike but for the agent's CA certificates, which the request takes along; or null, for
// the request to be sent on the download's own thread. It is told for each request, as it is about to be sent, with
// this thread's setup as it is then.
var laneFor = exports.laneFor = function laneFor() {
  if (disabled) {
    return null;
  }
  var ready = threads.filter(function (thread) {
    return thread.ready && thread.alive && !thread.retiring && !thread.failed && thread.defaults !== null;
  });
  if (ready.length === 0) {
    return null;
  }
  var thread = ready.reduce(function (least, candidate) {
    return candidate.tasks.size < least.tasks.size ? candidate : least;
  });
  var current = null;
  try {
    current = describeDefaults();
  } catch (_unused4) {
    return null;
  }
  if (current === null || !sameDefaults(current, thread.defaults)) {
    return null;
  }
  return {
    open: function open(request) {
      return _open(thread, _objectSpread(_objectSpread({}, request), {}, {
        ca: current.ca
      }));
    }
  };
};

// Not public: for the SDK's own tests of its download threads.
var forTests = exports.forTests = {
  // Holds the next request given to a download thread there, once the thread has made ready all it needs to send it,
  // and before its last checks of the download's stop, pause and URL, until release(); waiting() tells whether it is
  // held there.
  holdNextSend: function holdNextSend() {
    var gate = new Int32Array(new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT));
    nextSendGate = gate;
    return {
      release: function release() {
        Atomics.store(gate, 0, 1);
        Atomics.notify(gate, 0);
      },
      waiting: function waiting() {
        return Atomics.load(gate, 1) === 1;
      }
    };
  },
  // Makes the download threads, and resolves once both are ready, each kept for at least IDLE_MS more; or rejects when
  // none can be used.
  ready: function ready() {
    return new Promise(function (resolve, reject) {
      var _watch = function watch() {
        prepare();
        if (disabled || !canMakeThreads()) {
          readinessWatchers.delete(_watch);
          reject(new Error('No download thread can be used'));
          return true;
        }
        if (threads.length === MAX_THREADS && threads.every(function (thread) {
          return thread.ready && !thread.retiring;
        })) {
          readinessWatchers.delete(_watch);
          threads.filter(function (thread) {
            return thread.tasks.size === 0;
          }).forEach(idle);
          resolve();
          return true;
        }
        return false;
      };
      if (!_watch()) {
        readinessWatchers.add(_watch);
      }
    });
  },
  // Lets download threads be used again once every one has stopped.
  restore: function () {
    var _restore = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
      return _regenerator.default.wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 1;
            return Promise.all(threads.map(function (thread) {
              return thread.exited;
            }));
          case 1:
            disabled = false;
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function restore() {
      return _restore.apply(this, arguments);
    }
    return restore;
  }(),
  // The requests given to download threads and not yet let go, whether they are used, how many are ready, how many
  // requests they have sent in all, and how many of the requests not let go have not closed.
  stats: function stats() {
    return {
      active: threads.reduce(function (total, thread) {
        return total + thread.tasks.size;
      }, 0),
      disabled: disabled,
      ready: threads.filter(function (thread) {
        return thread.ready && !thread.retiring;
      }).length,
      sent: sentRequests,
      unclosed: threads.reduce(function (total, thread) {
        return total + Array.from(thread.tasks.values()).filter(function (task) {
          return !task.isClosed();
        }).length;
      }, 0)
    };
  },
  // Stops every download thread at once, as a thread that stops unexpectedly does.
  stop: function stop() {
    return Promise.all(threads.map(function (thread) {
      return thread.worker.terminate().catch(function () {});
    }));
  },
  // Has the next request given to a download thread there tell, if it breaks while its body is being taken, how it
  // stood then (see breakOff() in DownloadWorker.node.js): state() is null until it has, and then whether its response
  // had been received and parsed to its end (complete), whether some of its body was still to be taken (untaken), and
  // whether a batch of it was waiting to be given back (waitingForBatch).
  watchNextBreak: function watchNextBreak() {
    var witness = new Int32Array(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT));
    nextSendWitness = witness;
    return {
      state: function state() {
        return Atomics.load(witness, 0) === 1 ? {
          complete: Atomics.load(witness, 1) === 1,
          untaken: Atomics.load(witness, 2) === 1,
          waitingForBatch: Atomics.load(witness, 3) === 1
        } : null;
      }
    };
  }
};