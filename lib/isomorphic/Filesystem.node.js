"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RemoteStats = exports.RemoteFilesystem = exports.RemoteFileHandle = exports.RemoteDirent = exports.RemoteDir = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _awaitAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/awaitAsyncGenerator"));
var _wrapAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapAsyncGenerator"));
var _events = require("events");
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _path = _interopRequireDefault(require("path"));
var _readline = _interopRequireDefault(require("readline"));
var _stream = require("stream");
var _util = _interopRequireDefault(require("util"));
var errors = _interopRequireWildcard(require("../Errors"));
var _Transfer = require("../Transfer");
var _Symbol$asyncDispose, _Symbol$dispose;
/* eslint-disable max-classes-per-file */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

var File = function File() {
  return require('../models/File.js').default;
};
var Folder = function Folder() {
  return require('../models/Folder.js').default;
};
var asyncDispose = (_Symbol$asyncDispose = Symbol.asyncDispose) !== null && _Symbol$asyncDispose !== void 0 ? _Symbol$asyncDispose : Symbol.for('nodejs.asyncDispose');
var syncDispose = (_Symbol$dispose = Symbol.dispose) !== null && _Symbol$dispose !== void 0 ? _Symbol$dispose : Symbol.for('nodejs.dispose');

// The prefix of the directory each file handle's stage is in, in the operating system's temporary directory.
var STAGE_PREFIX = 'files-sdk-fs-';

// The errors with which Node.js refuses a call's arguments. Only for a call that checks them all before it touches its
// file, as write(), writev() and truncate() do, does such a failure show that nothing changed (see changed()).
var ARGUMENT_ERRORS = ['ERR_BUFFER_OUT_OF_BOUNDS', 'ERR_INVALID_ARG_TYPE', 'ERR_INVALID_ARG_VALUE', 'ERR_OUT_OF_RANGE'];

// The API's error types for a path that is not there. Only these become ENOENT: any other failure, one of
// authentication or routing included, whatever its HTTP status, is the SDK's own error, as it is.
var NOT_FOUND_TYPES = ['not-found/file-not-found', 'not-found/folder-not-found'];

// A value, as a message shows it.
var shown = function shown(value) {
  return typeof value === 'string' ? "'".concat(value, "'") : String(value);
};
var isSignal = function isSignal(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.aborted) === 'boolean' && typeof value.addEventListener === 'function';
};
var isOptions = function isOptions(value) {
  return value !== null && (0, _typeof2.default)(value) === 'object' && !Array.isArray(value);
};
var invalid = function invalid(message) {
  return new errors.InvalidParameterError("Bad parameter: ".concat(message));
};
var nodeError = function nodeError(code, message) {
  return Object.assign(new Error(message), {
    code: code
  });
};

// The errno and description Node.js gives a system error code, such as ENOENT, on this platform.
var systemErrors = new Map();
var systemErrorOf = function systemErrorOf(code) {
  if (!systemErrors.has(code)) {
    var found = (0, _toConsumableArray2.default)(_util.default.getSystemErrorMap()).find(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        _ref2$ = (0, _slicedToArray2.default)(_ref2[1], 1),
        name = _ref2$[0];
      return name === code;
    });
    systemErrors.set(code, found ? {
      description: found[1][1],
      errno: found[0]
    } : {
      description: code,
      errno: undefined
    });
  }
  return systemErrors.get(code);
};

// An error as Node.js's own filesystem gives one: its code, errno, syscall and, when given, the path, in its message too.
// cause, when given, is the SDK's own error it stands for, unchanged, its numeric code included.
var fsError = function fsError(code, syscall, remotePath, cause) {
  var _systemErrorOf = systemErrorOf(code),
    description = _systemErrorOf.description,
    errno = _systemErrorOf.errno;
  var where = remotePath === undefined ? '' : " '".concat(remotePath, "'");
  var error = new Error("".concat(code, ": ").concat(description, ", ").concat(syscall).concat(where), cause === undefined ? undefined : {
    cause: cause
  });
  error.errno = errno;
  error.code = code;
  error.syscall = syscall;
  if (remotePath !== undefined) {
    error.path = remotePath;
  }
  return error;
};

// What a closed handle's methods reject with, as Node.js's FileHandle does.
var closedHandle = function closedHandle(syscall) {
  return Object.assign(new Error('file closed'), {
    code: 'EBADF',
    syscall: syscall
  });
};
var dirClosed = function dirClosed() {
  return nodeError('ERR_DIR_CLOSED', 'Directory handle was closed');
};

// Whether error is the SDK's error for a path the API says is not there, by the error type the API gave it.
var isNotFound = function isNotFound(error) {
  return error instanceof errors.FilesError && NOT_FOUND_TYPES.includes(error.type);
};

// The error a call on remotePath fails with for error: ENOENT, caused by error, for a path the API says is not there;
// otherwise error itself.
var pathError = function pathError(error, syscall, remotePath) {
  return isNotFound(error) ? fsError('ENOENT', syscall, remotePath, error) : error;
};

// What a handle's method the API has no primitive for rejects with: the NotImplementedError of message, or, once the
// handle has begun to close, what any of its methods rejects with then.
var notSupported = function notSupported(state, syscall, message) {
  return Promise.reject(state.status === 'open' ? new errors.NotImplementedError(message) : closedHandle(syscall));
};

// A handle's fd, which a Files.com file does not have: reading it throws, whatever the handle's state.
var descriptorOf = function descriptorOf(state) {
  throw new errors.NotImplementedError("A Files.com file handle has no file descriptor: ".concat(state.remotePath, " is not a file of this process"));
};

// A Files.com path as a method takes it: a string, as given, or bytes of UTF-8, as the string they encode. A URL, which
// could name a file on local disk, and bytes that are not UTF-8 are refused before anything is sent.
var utf8 = new globalThis.TextDecoder('utf-8', {
  fatal: true
});
var remotePathOf = function remotePathOf(target) {
  var remotePath = target;
  if (target instanceof URL) {
    throw new errors.NotImplementedError('A URL is not a Files.com path: give the path itself, as a string');
  }
  if (target instanceof Uint8Array) {
    try {
      remotePath = utf8.decode(target);
    } catch (_unused) {
      throw new errors.NotImplementedError('A path of bytes that are not UTF-8 is not supported: Files.com paths are text');
    }
  }
  if (typeof remotePath !== 'string') {
    throw invalid("path must be a string or a Buffer, received ".concat((0, _typeof2.default)(target)));
  }
  if (remotePath.includes("\0")) {
    throw invalid('path must not contain a null character');
  }
  return remotePath;
};

// The flags Node.js accepts as strings, as it reads them. Of these, only r, r+, w and w+ open a Files.com path: the
// others need guarantees the API has no primitive for.
var FLAG_STRINGS = ['a', 'a+', 'as', 'as+', 'ax', 'ax+', 'r', 'r+', 'rs', 'rs+', 'sa', 'sa+', 'sr', 'sr+', 'w', 'w+', 'wx', 'wx+', 'xa', 'xa+', 'xw', 'xw+'];
var STRING_ACCESS = {
  r: {
    create: false,
    read: true,
    truncate: false,
    write: false
  },
  'r+': {
    create: false,
    read: true,
    truncate: false,
    write: true
  },
  w: {
    create: true,
    read: false,
    truncate: true,
    write: true
  },
  'w+': {
    create: true,
    read: true,
    truncate: true,
    write: true
  }
};
var APPEND = 'Appending is not supported: the API has no atomic append, so a write to the end could lose another writer\'s data';
var EXCLUSIVE = 'Exclusive creation is not supported: the API has no atomic create-if-absent';
var SYNCHRONOUS = 'Synchronous I/O is not supported: the SDK cannot confirm that a write has reached a physical device';

// How flags, a string or a number of fs.constants' O_ flags, open a Files.com path: { create, read, truncate, write },
// with stageFlags, how its stage is opened. Unsupported flags are refused before anything is sent.
var accessOf = function accessOf() {
  var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'r';
  var access;
  if (flags === null || flags === undefined) {
    access = STRING_ACCESS.r;
  } else if (typeof flags === 'string') {
    if (!FLAG_STRINGS.includes(flags)) {
      throw invalid("flags ".concat(shown(flags), " are not flags Node.js knows"));
    }
    if (flags.includes('a')) {
      throw new errors.NotImplementedError(APPEND);
    }
    if (flags.includes('x')) {
      throw new errors.NotImplementedError(EXCLUSIVE);
    }
    if (flags.includes('s')) {
      throw new errors.NotImplementedError(SYNCHRONOUS);
    }
    access = STRING_ACCESS[flags];
  } else if (Number.isSafeInteger(flags) && flags >= 0) {
    var _fs$constants = _fs.default.constants,
      O_APPEND = _fs$constants.O_APPEND,
      O_CREAT = _fs$constants.O_CREAT,
      O_DSYNC = _fs$constants.O_DSYNC,
      O_EXCL = _fs$constants.O_EXCL,
      _O_RDWR = _fs$constants.O_RDWR,
      O_SYNC = _fs$constants.O_SYNC,
      O_TRUNC = _fs$constants.O_TRUNC,
      _O_WRONLY = _fs$constants.O_WRONLY;

    // The checks below see only the low 32 bits, as JavaScript's bitwise operators do: a number with bits above them,
    // which no O_ flag is, is refused first, so that those bits are never dropped and the rest taken for supported flags.
    if (flags > 0xFFFFFFFF) {
      throw new errors.NotImplementedError("Open flags ".concat(flags, " include flags a Files.com path does not support"));
    }
    var has = function has(flag) {
      return flag !== undefined && (flags & flag) !== 0;
    }; // eslint-disable-line no-bitwise

    if (has(O_APPEND)) {
      throw new errors.NotImplementedError(APPEND);
    }
    if (has(O_EXCL)) {
      throw new errors.NotImplementedError(EXCLUSIVE);
    }
    if (has(O_SYNC) || has(O_DSYNC)) {
      throw new errors.NotImplementedError(SYNCHRONOUS);
    }

    // eslint-disable-next-line no-bitwise
    if ((flags & ~(_O_WRONLY | _O_RDWR | O_CREAT | O_TRUNC)) !== 0) {
      throw new errors.NotImplementedError("Open flags ".concat(flags, " include flags a Files.com path does not support"));
    }

    // eslint-disable-next-line no-bitwise
    var mode = flags & (_O_WRONLY | _O_RDWR);
    if (mode === (_O_WRONLY | _O_RDWR)) {
      // eslint-disable-line no-bitwise
      throw invalid("flags ".concat(flags, " ask for both write-only and read-write access"));
    }
    access = {
      create: has(O_CREAT),
      read: mode !== _O_WRONLY,
      truncate: has(O_TRUNC),
      write: mode !== 0
    };
    if (access.truncate && !access.write) {
      throw new errors.NotImplementedError('Truncating a file opened only for reading is not supported');
    }
  } else {
    throw invalid("flags must be a string or a number, received ".concat((0, _typeof2.default)(flags)));
  }
  var _fs$constants2 = _fs.default.constants,
    O_RDONLY = _fs$constants2.O_RDONLY,
    O_RDWR = _fs$constants2.O_RDWR,
    O_WRONLY = _fs$constants2.O_WRONLY;
  var stageFlags = O_RDONLY;
  if (access.write) {
    stageFlags = access.read ? O_RDWR : O_WRONLY;
  }
  return _objectSpread(_objectSpread({}, access), {}, {
    stageFlags: stageFlags
  });
};

// The type of the entry whose metadata the API gave, 'file' or 'directory'. Any other fails rather than being guessed.
var entryTypeOf = function entryTypeOf(attributes, remotePath) {
  var type = attributes === null || attributes === void 0 ? void 0 : attributes.type;
  if (type !== 'file' && type !== 'directory') {
    throw new errors.FilesError("The API gave ".concat(shown(remotePath), " the type ").concat(shown(type), ", which is neither a file nor a directory"));
  }
  return type;
};

// Metadata of remotePath (GET /file_actions/metadata/{path}), as the client's File.find() gives it.
var metadataOf = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(client, remotePath, syscall) {
    var _t;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 1;
          return File().find(remotePath, {}, {
            client: client
          });
        case 1:
          return _context.abrupt("return", _context.sent.attributes);
        case 2:
          _context.prev = 2;
          _t = _context["catch"](0);
          throw pathError(_t, syscall, remotePath);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function metadataOf(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
var dateOf = function dateOf(value) {
  var date = typeof value === 'string' && value !== '' ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};

/**
 * The stats of a Files.com path, as Node.js's stat() gives a path's, with what the API reports and nothing else: its
 * type; its size; its modification time on the server, mtime; and its creation time, birthtime. With bigint, numbers are
 * bigints, with nanosecond times beside. The API has no device, inode, mode, link count, owner, block size or count, or
 * access and change times: those fields are absent, not made up. A file or a directory is all a Files.com path can be,
 * so the other type predicates are false.
 */
var _type = /*#__PURE__*/new WeakMap();
var RemoteStats = exports.RemoteStats = /*#__PURE__*/function () {
  function RemoteStats(attributes, remotePath, bigint) {
    var _this2 = this;
    (0, _classCallCheck2.default)(this, RemoteStats);
    _classPrivateFieldInitSpec(this, _type, void 0);
    _classPrivateFieldSet(_type, this, entryTypeOf(attributes, remotePath));
    var number = function number(value) {
      return bigint ? BigInt(value) : value;
    };
    if (Number.isSafeInteger(attributes.size) && attributes.size >= 0) {
      this.size = number(attributes.size);
    }
    var times = {
      birthtime: dateOf(attributes.created_at),
      mtime: dateOf(attributes.mtime)
    };
    Object.entries(times).filter(function (_ref4) {
      var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
        date = _ref5[1];
      return date !== null;
    }).forEach(function (_ref6) {
      var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
        name = _ref7[0],
        date = _ref7[1];
      _this2["".concat(name, "Ms")] = number(date.getTime());
      if (bigint) {
        _this2["".concat(name, "Ns")] = BigInt(date.getTime()) * BigInt(1000000);
      }
      _this2[name] = date;
    });
  }
  return (0, _createClass2.default)(RemoteStats, [{
    key: "isBlockDevice",
    value: function isBlockDevice() {
      return _classPrivateFieldGet(_type, this) === 'block-device';
    }
  }, {
    key: "isCharacterDevice",
    value: function isCharacterDevice() {
      return _classPrivateFieldGet(_type, this) === 'character-device';
    }
  }, {
    key: "isDirectory",
    value: function isDirectory() {
      return _classPrivateFieldGet(_type, this) === 'directory';
    }
  }, {
    key: "isFIFO",
    value: function isFIFO() {
      return _classPrivateFieldGet(_type, this) === 'fifo';
    }
  }, {
    key: "isFile",
    value: function isFile() {
      return _classPrivateFieldGet(_type, this) === 'file';
    }
  }, {
    key: "isSocket",
    value: function isSocket() {
      return _classPrivateFieldGet(_type, this) === 'socket';
    }
  }, {
    key: "isSymbolicLink",
    value: function isSymbolicLink() {
      return _classPrivateFieldGet(_type, this) === 'symbolic-link';
    }
  }]);
}();
var statsOf = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(client, remotePath, syscall, options) {
    var attributes;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(options !== undefined && options !== null && !isOptions(options))) {
            _context2.next = 1;
            break;
          }
          throw invalid('options must be an object');
        case 1:
          _context2.next = 2;
          return metadataOf(client, remotePath, syscall);
        case 2:
          attributes = _context2.sent;
          return _context2.abrupt("return", new RemoteStats(attributes, remotePath, (options === null || options === void 0 ? void 0 : options.bigint) === true));
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function statsOf(_x4, _x5, _x6, _x7) {
    return _ref8.apply(this, arguments);
  };
}();

// The relative path of each entry from the directory a recursive listing began in, for readdir().
var relativePaths = new WeakMap();

/**
 * An entry of a Files.com directory, as Node.js's Dirent gives one: its name, from the API's display_name, in the
 * directory's encoding, and parentPath, the path of the directory it is in, as the caller gave it, never the path the
 * API returns. A file or a directory is all a Files.com path can be, so the other type predicates are false.
 */
var _type2 = /*#__PURE__*/new WeakMap();
var RemoteDirent = exports.RemoteDirent = /*#__PURE__*/function () {
  function RemoteDirent(name, parentPath, type) {
    (0, _classCallCheck2.default)(this, RemoteDirent);
    _classPrivateFieldInitSpec(this, _type2, void 0);
    this.name = name;
    this.parentPath = parentPath;
    _classPrivateFieldSet(_type2, this, type);
  }
  return (0, _createClass2.default)(RemoteDirent, [{
    key: "isBlockDevice",
    value: function isBlockDevice() {
      return _classPrivateFieldGet(_type2, this) === 'block-device';
    }
  }, {
    key: "isCharacterDevice",
    value: function isCharacterDevice() {
      return _classPrivateFieldGet(_type2, this) === 'character-device';
    }
  }, {
    key: "isDirectory",
    value: function isDirectory() {
      return _classPrivateFieldGet(_type2, this) === 'directory';
    }
  }, {
    key: "isFIFO",
    value: function isFIFO() {
      return _classPrivateFieldGet(_type2, this) === 'fifo';
    }
  }, {
    key: "isFile",
    value: function isFile() {
      return _classPrivateFieldGet(_type2, this) === 'file';
    }
  }, {
    key: "isSocket",
    value: function isSocket() {
      return _classPrivateFieldGet(_type2, this) === 'socket';
    }
  }, {
    key: "isSymbolicLink",
    value: function isSymbolicLink() {
      return _classPrivateFieldGet(_type2, this) === 'symbolic-link';
    }
  }]);
}(); // A path within base: name after base's own, with one slash between.
var joined = function joined(base, name) {
  if (name === '') {
    return base;
  }
  if (base === '') {
    return name;
  }
  return base.endsWith('/') ? "".concat(base).concat(name) : "".concat(base, "/").concat(name);
};

// The name of a listed entry: its display_name, or else the last segment of its path.
var nameOf = function nameOf(attributes) {
  var _attributes$path;
  var name = typeof attributes.display_name === 'string' && attributes.display_name !== '' ? attributes.display_name : "".concat((_attributes$path = attributes.path) !== null && _attributes$path !== void 0 ? _attributes$path : '').split('/').filter(function (segment) {
    return segment !== '';
  }).pop();
  if (!name) {
    throw new errors.FilesError('The API listed a directory entry without a name');
  }
  return name;
};

// text in encoding: a Buffer for 'buffer', otherwise a string.
var encoded = function encoded(text, encoding) {
  if (encoding === 'buffer') {
    return Buffer.from(text, 'utf8');
  }
  return encoding === 'utf8' ? text : Buffer.from(text, 'utf8').toString(encoding);
};
var encodingOf = function encodingOf(encoding) {
  if (encoding === undefined || encoding === null || encoding === 'utf8' || encoding === 'utf-8') {
    return 'utf8';
  }
  if (encoding !== 'buffer' && (typeof encoding !== 'string' || !Buffer.isEncoding(encoding))) {
    throw invalid("encoding ".concat(shown(encoding), " is not an encoding Node.js knows"));
  }
  return encoding;
};
var checkCallback = function checkCallback(callback) {
  if (typeof callback !== 'function') {
    throw invalid('callback must be a function');
  }
};

// Runs work once everything the directory was asked before has settled, counting it as busy meanwhile.
var serially = function serially(state, work) {
  state.busy += 1;
  var result = state.tail.then(work);
  state.tail = result.then(function () {}, function () {});
  result.then(function () {
    state.busy -= 1;
  }, function () {
    state.busy -= 1;
  });
  return result;
};

// The next entry of a directory, or null once there are none: from the page its listing holds, or, once that is used
// up, from the next page, which the lazy Folder iterator requests only then (see Api._iterate). A recursive listing then
// lists the directories it found, one after another, each with its own iterator.
var nextEntry = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(state) {
    var level, _yield$state$current$, done, value, _value$attributes, _attributes$path2, _level, attributes, type, name, relative, entry;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (state.current) {
            _context3.next = 2;
            break;
          }
          level = state.levels.shift();
          if (level) {
            _context3.next = 1;
            break;
          }
          return _context3.abrupt("return", null);
        case 1:
          state.current = _objectSpread(_objectSpread({}, level), {}, {
            iterator: Folder().listForIterator(level.remotePath, state.perPage ? {
              per_page: state.perPage
            } : {}, {
              client: state.client
            })
          });
        case 2:
          _context3.next = 3;
          return state.current.iterator.next();
        case 3:
          _yield$state$current$ = _context3.sent;
          done = _yield$state$current$.done;
          value = _yield$state$current$.value;
          if (done) {
            _context3.next = 4;
            break;
          }
          _level = state.current;
          attributes = (_value$attributes = value === null || value === void 0 ? void 0 : value.attributes) !== null && _value$attributes !== void 0 ? _value$attributes : {};
          type = entryTypeOf(attributes, (_attributes$path2 = attributes.path) !== null && _attributes$path2 !== void 0 ? _attributes$path2 : _level.remotePath);
          name = nameOf(attributes);
          relative = joined(_level.relative, name);
          if (state.recursive && type === 'directory') {
            state.levels.push({
              relative: relative,
              remotePath: joined(_level.remotePath, name)
            });
          }
          entry = new RemoteDirent(encoded(name, state.encoding), joined(state.path, _level.relative), type);
          relativePaths.set(entry, relative);
          return _context3.abrupt("return", entry);
        case 4:
          state.current = null;
        case 5:
          _context3.next = 0;
          break;
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function nextEntry(_x8) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * A Files.com directory, as Node.js's Dir gives one: read() its entries one at a time, by promise or callback, null once
 * there are none, or iterate it with for await, which closes it however the loop ends. The entries come from the
 * client's lazy Folder listing (GET /folders/{path}), which holds one page at a time and requests the next only once the
 * page before has been read; reads and close() run one at a time, in the order asked. close() waits for a read under
 * way, then requests nothing more. A closed directory's read() and close() fail with ERR_DIR_CLOSED.
 */
var _state = /*#__PURE__*/new WeakMap();
var RemoteDir = exports.RemoteDir = /*#__PURE__*/function () {
  function RemoteDir(state) {
    (0, _classCallCheck2.default)(this, RemoteDir);
    _classPrivateFieldInitSpec(this, _state, void 0);
    _classPrivateFieldSet(_state, this, state);
  }
  return (0, _createClass2.default)(RemoteDir, [{
    key: "path",
    get: function get() {
      return _classPrivateFieldGet(_state, this).path;
    }
  }, {
    key: "read",
    value: function read(callback) {
      var state = _classPrivateFieldGet(_state, this);
      if (callback === undefined) {
        return state.status === 'open' ? serially(state, function () {
          return nextEntry(state);
        }) : Promise.reject(dirClosed());
      }
      checkCallback(callback);
      if (state.status !== 'open') {
        throw dirClosed();
      }
      serially(state, function () {
        return nextEntry(state);
      }).then(function (entry) {
        return process.nextTick(callback, null, entry);
      }, function (error) {
        return process.nextTick(callback, error);
      });
      return undefined;
    }

    // Reading a Files.com directory takes network requests, which cannot be made synchronously.
  }, {
    key: "readSync",
    value: function readSync() {
      if (_classPrivateFieldGet(_state, this).status !== 'open') {
        throw dirClosed();
      }
      throw new errors.NotImplementedError('readSync() is not supported: reading a Files.com directory takes network requests, which cannot be made synchronously');
    }
  }, {
    key: "close",
    value: function close(callback) {
      var state = _classPrivateFieldGet(_state, this);
      if (callback !== undefined) {
        checkCallback(callback);
      }
      if (state.status !== 'open') {
        if (callback === undefined) {
          return Promise.reject(dirClosed());
        }
        process.nextTick(callback, dirClosed());
        return undefined;
      }
      state.status = 'closing';
      var closing = serially(state, /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var current;
        return _regenerator.default.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              current = state.current;
              state.current = null;
              state.levels = [];
              state.status = 'closed';
              _context4.next = 1;
              return current === null || current === void 0 ? void 0 : current.iterator.return();
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      })));
      if (callback === undefined) {
        return closing;
      }
      closing.then(function () {
        return process.nextTick(callback, null);
      }, function (error) {
        return process.nextTick(callback, error);
      });
      return undefined;
    }

    // Closes the directory at once, which it can only while nothing it was asked is under way.
  }, {
    key: "closeSync",
    value: function closeSync() {
      var state = _classPrivateFieldGet(_state, this);
      if (state.status !== 'open') {
        throw dirClosed();
      }
      if (state.busy > 0) {
        throw nodeError('ERR_DIR_CONCURRENT_OPERATION', 'Cannot do synchronous work on directory handle with concurrent asynchronous operations');
      }
      var current = state.current;
      state.current = null;
      state.levels = [];
      state.status = 'closed';
      current === null || current === void 0 || current.iterator.return().catch(function () {});
    }
  }, {
    key: Symbol.asyncIterator,
    value: function value() {
      var _this = this;
      return (0, _wrapAsyncGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var entry;
        return _regenerator.default.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
            case 1:
              _context5.next = 2;
              return (0, _awaitAsyncGenerator2.default)(_this.read());
            case 2:
              entry = _context5.sent;
              if (!(entry === null)) {
                _context5.next = 3;
                break;
              }
              return _context5.abrupt("continue", 5);
            case 3:
              _context5.next = 4;
              return entry;
            case 4:
              _context5.next = 1;
              break;
            case 5:
              _context5.prev = 5;
              _context5.next = 6;
              return (0, _awaitAsyncGenerator2.default)(_this.close());
            case 6:
              return _context5.finish(5);
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0,, 5, 7]]);
      }))();
    }
  }, {
    key: asyncDispose,
    value: function value() {
      return _classPrivateFieldGet(_state, this).status === 'open' ? this.close() : Promise.resolve();
    }
  }, {
    key: syncDispose,
    value: function value() {
      if (_classPrivateFieldGet(_state, this).status === 'open') {
        this.closeSync();
      }
    }
  }]);
}(); // The options of opendir(): { encoding, bufferSize, recursive }. bufferSize, when given, is how many entries each page
// of the listing has (per_page); without it, the API's own page size.
var dirOptionsOf = function dirOptionsOf(options) {
  if (options !== undefined && options !== null && !isOptions(options)) {
    throw invalid('options must be an object');
  }
  var _ref1 = options !== null && options !== void 0 ? options : {},
    bufferSize = _ref1.bufferSize,
    encoding = _ref1.encoding,
    _ref1$recursive = _ref1.recursive,
    recursive = _ref1$recursive === void 0 ? false : _ref1$recursive;
  if (bufferSize !== undefined && bufferSize !== null && (!Number.isSafeInteger(bufferSize) || bufferSize < 1 || bufferSize > 4294967295)) {
    throw invalid('bufferSize must be a whole number from 1 to 4294967295');
  }
  if (typeof recursive !== 'boolean') {
    throw invalid('recursive must be a boolean');
  }
  return {
    bufferSize: bufferSize !== null && bufferSize !== void 0 ? bufferSize : null,
    encoding: encodingOf(encoding),
    recursive: recursive
  };
};
var openDir = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(client, target, options) {
    var remotePath, _dirOptionsOf, bufferSize, encoding, recursive, _t2, _t3;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          remotePath = remotePathOf(target);
          _dirOptionsOf = dirOptionsOf(options), bufferSize = _dirOptionsOf.bufferSize, encoding = _dirOptionsOf.encoding, recursive = _dirOptionsOf.recursive;
          _t2 = entryTypeOf;
          _context6.next = 1;
          return metadataOf(client, remotePath, 'opendir');
        case 1:
          _t3 = _t2(_context6.sent, remotePath);
          if (!(_t3 !== 'directory')) {
            _context6.next = 2;
            break;
          }
          throw fsError('ENOTDIR', 'opendir', remotePath);
        case 2:
          return _context6.abrupt("return", new RemoteDir({
            busy: 0,
            client: client,
            current: null,
            encoding: encoding,
            levels: [{
              relative: '',
              remotePath: remotePath
            }],
            path: remotePath,
            perPage: bufferSize,
            recursive: recursive,
            status: 'open',
            tail: Promise.resolve()
          }));
        case 3:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function openDir(_x9, _x0, _x1) {
    return _ref10.apply(this, arguments);
  };
}();
var readDirectory = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(client, target, options) {
    var given, _ref12, encoding, _ref12$recursive, recursive, _ref12$withFileTypes, withFileTypes, dir, entries, entry;
    return _regenerator.default.wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          given = typeof options === 'string' ? {
            encoding: options
          } : options;
          if (!(given !== undefined && given !== null && !isOptions(given))) {
            _context7.next = 1;
            break;
          }
          throw invalid('options must be an object or an encoding');
        case 1:
          _ref12 = given !== null && given !== void 0 ? given : {}, encoding = _ref12.encoding, _ref12$recursive = _ref12.recursive, recursive = _ref12$recursive === void 0 ? false : _ref12$recursive, _ref12$withFileTypes = _ref12.withFileTypes, withFileTypes = _ref12$withFileTypes === void 0 ? false : _ref12$withFileTypes;
          _context7.next = 2;
          return openDir(client, target, {
            encoding: encoding,
            recursive: recursive
          });
        case 2:
          dir = _context7.sent;
          entries = [];
          _context7.prev = 3;
        case 4:
          _context7.next = 5;
          return dir.read();
        case 5:
          entry = _context7.sent;
          if (!(entry === null)) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("continue", 8);
        case 6:
          entries.push(withFileTypes ? entry : encoded(relativePaths.get(entry), encodingOf(encoding)));
        case 7:
          _context7.next = 4;
          break;
        case 8:
          _context7.prev = 8;
          _context7.next = 9;
          return dir.close();
        case 9:
          return _context7.finish(8);
        case 10:
          return _context7.abrupt("return", entries);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3,, 8, 10]]);
  }));
  return function readDirectory(_x10, _x11, _x12) {
    return _ref11.apply(this, arguments);
  };
}();

// The stage's directory is removed when its handle is collected unclosed, as a safety net: close() removes it otherwise.
// A handle cannot be collected while anything it was asked is still to run or under way: its state, which every such
// operation holds, holds the handle too (see RemoteFileHandle), so the directory is never removed beneath one.
var abandoned = typeof globalThis.FinalizationRegistry === 'function' ? new globalThis.FinalizationRegistry(function (directory) {
  try {
    _fs.default.rmSync(directory, {
      force: true,
      recursive: true
    });
  } catch (_unused2) {
    // Nothing more can be done for it.
  }
}) : null;

// Closes the stage, if it is open, and removes its directory, failing with the first failure of either.
var releaseStage = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8(state) {
    var failure, _t4, _t5;
    return _regenerator.default.wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          failure = null;
          if (!state.stage) {
            _context8.next = 5;
            break;
          }
          _context8.prev = 1;
          _context8.next = 2;
          return state.stage.close();
        case 2:
          _context8.next = 4;
          break;
        case 3:
          _context8.prev = 3;
          _t4 = _context8["catch"](1);
          failure = {
            error: _t4
          };
        case 4:
          state.stage = null;
        case 5:
          _context8.prev = 5;
          _context8.next = 6;
          return _fs.default.promises.rm(state.directory, {
            force: true,
            recursive: true
          });
        case 6:
          _context8.next = 8;
          break;
        case 7:
          _context8.prev = 7;
          _t5 = _context8["catch"](5);
          failure = failure !== null && failure !== void 0 ? failure : {
            error: _t5
          };
        case 8:
          abandoned === null || abandoned === void 0 || abandoned.unregister(state);
          if (!failure) {
            _context8.next = 9;
            break;
          }
          throw failure.error;
        case 9:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 3], [5, 7]]);
  }));
  return function releaseStage(_x13) {
    return _ref13.apply(this, arguments);
  };
}();

// Uploads the whole stage to the remote path, as File.uploadFile() does, with the handle's client.
var publish = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9(state, signal) {
    return _regenerator.default.wrap(function (_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 1;
          return File().uploadFile(state.remotePath, state.stagePath, {}, signal ? {
            client: state.client,
            signal: signal
          } : {
            client: state.client
          });
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function publish(_x14, _x15) {
    return _ref14.apply(this, arguments);
  };
}();

// The stage, open with the handle's flags; downloaded first, as File.downloadToFile() does, when the handle has not
// read or written its file yet. A download that fails leaves no stage, and the next call downloads it again. The
// download is the bound File's own: a File of the handle's path, with its client and the call's signal, whose
// download() (GET /files/{path}) gives the download_uri, and so a File that keeps those same options. The path's
// metadata, known since the handle was opened, is not asked for again.
var staged = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee0(state, syscall, signal) {
    var options, RemoteFile, file, _t6, _t7;
    return _regenerator.default.wrap(function (_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          if (!state.stage) {
            _context0.next = 1;
            break;
          }
          return _context0.abrupt("return", state.stage);
        case 1:
          options = signal ? {
            client: state.client,
            signal: signal
          } : {
            client: state.client
          };
          RemoteFile = File();
          _context0.prev = 2;
          _context0.next = 3;
          return new RemoteFile({
            path: state.remotePath
          }, options).download({});
        case 3:
          file = _context0.sent;
          _context0.next = 5;
          break;
        case 4:
          _context0.prev = 4;
          _t6 = _context0["catch"](2);
          throw pathError(_t6, syscall, state.remotePath);
        case 5:
          _context0.prev = 5;
          _context0.next = 6;
          return file.downloadToFile(state.stagePath, signal ? {
            signal: signal
          } : undefined);
        case 6:
          _context0.next = 7;
          return _fs.default.promises.open(state.stagePath, state.access.stageFlags);
        case 7:
          state.stage = _context0.sent;
          _context0.next = 10;
          break;
        case 8:
          _context0.prev = 8;
          _t7 = _context0["catch"](5);
          _context0.next = 9;
          return _fs.default.promises.rm(state.stagePath, {
            force: true
          }).catch(function () {});
        case 9:
          throw _t7;
        case 10:
          return _context0.abrupt("return", state.stage);
        case 11:
        case "end":
          return _context0.stop();
      }
    }, _callee0, null, [[2, 4], [5, 8]]);
  }));
  return function staged(_x16, _x17, _x18) {
    return _ref15.apply(this, arguments);
  };
}();

// Runs work once everything the handle was asked before has settled, unless it has closed or failed.
var inTurn = function inTurn(state, syscall, work) {
  if (state.status !== 'open') {
    return Promise.reject(closedHandle(syscall));
  }
  var result = state.tail.then(function () {
    if (state.failure) {
      throw state.failure.error;
    }
    return work();
  });
  state.tail = result.then(function () {}, function () {});
  return result;
};

// Whether error is what Node.js's own readFile() or writeFile() of the stage rejects with once signal has stopped it:
// an AbortError whose cause is the signal's reason. A call of the SDK's rejects with that reason itself instead.
var isLocalAbort = function isLocalAbort(error, signal) {
  return (signal === null || signal === void 0 ? void 0 : signal.aborted) === true && (error === null || error === void 0 ? void 0 : error.name) === 'AbortError' && Object.is(error.cause, signal.reason);
};

// What a local operation of the stage that failed with error, given signal, rejects with: the signal's reason, unchanged,
// whatever it is, null and 0 included, when signal stopped it, or else error itself, any earlier failure included.
var failureOf = function failureOf(error, signal) {
  return isLocalAbort(error, signal) ? (0, _Transfer.abortReason)(signal) : error;
};

// A read of the stage, in turn, with signal, when given, for the stage's download and its local read. A signal aborted
// already reads nothing.
var observe = function observe(state, syscall, read, signal) {
  return inTurn(state, syscall, /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee1() {
    var stage, _t8;
    return _regenerator.default.wrap(function (_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context1.next = 1;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 1:
          _context1.next = 2;
          return staged(state, syscall, signal);
        case 2:
          stage = _context1.sent;
          _context1.prev = 3;
          _context1.next = 4;
          return read(stage);
        case 4:
          return _context1.abrupt("return", _context1.sent);
        case 5:
          _context1.prev = 5;
          _t8 = _context1["catch"](3);
          throw failureOf(_t8, signal);
        case 6:
        case "end":
          return _context1.stop();
      }
    }, _callee1, null, [[3, 5]]);
  })));
};

// A change of the stage, in turn, published before it resolves with change's own result, with signal, when given, for
// the stage's download, its change and its publication. A handle not opened for writing refuses it, as Node.js does,
// and a signal aborted already stops it, before anything changes.
//
// validated says whether Node.js checks every argument of the change before it touches the stage, as it does for
// write(), writev() and truncate(), whose one write or truncation comes after: their argument errors changed nothing,
// and leave the handle as it was. Any other failure of a change may follow part of it, such as writeFile()'s of an
// iterable whose later chunk is invalid once earlier ones have been written: it fails the handle, as a publication that
// fails does, so that no later change ever publishes what it left in the stage.
var changed = function changed(state, syscall, change) {
  var _ref17 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
    signal = _ref17.signal,
    _ref17$validated = _ref17.validated,
    validated = _ref17$validated === void 0 ? false : _ref17$validated;
  return inTurn(state, syscall, /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee10() {
    var stage, result, failure, _t9, _t0;
    return _regenerator.default.wrap(function (_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (state.access.write) {
            _context10.next = 1;
            break;
          }
          throw fsError('EBADF', syscall);
        case 1:
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context10.next = 2;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 2:
          _context10.next = 3;
          return staged(state, syscall, signal);
        case 3:
          stage = _context10.sent;
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context10.next = 4;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 4:
          _context10.prev = 4;
          _context10.next = 5;
          return change(stage);
        case 5:
          result = _context10.sent;
          _context10.next = 7;
          break;
        case 6:
          _context10.prev = 6;
          _t9 = _context10["catch"](4);
          failure = failureOf(_t9, signal);
          if (!(validated && ARGUMENT_ERRORS.includes(_t9 === null || _t9 === void 0 ? void 0 : _t9.code))) {
            state.failure = {
              error: failure
            };
          }
          throw failure;
        case 7:
          _context10.prev = 7;
          _context10.next = 8;
          return publish(state, signal);
        case 8:
          _context10.next = 10;
          break;
        case 9:
          _context10.prev = 9;
          _t0 = _context10["catch"](7);
          state.failure = {
            error: _t0
          };
          throw _t0;
        case 10:
          return _context10.abrupt("return", result);
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[4, 6], [7, 9]]);
  })));
};
var signalOf = function signalOf(options) {
  return isOptions(options) && isSignal(options.signal) ? options.signal : undefined;
};

// Settles a stream's destruction with error once closing, the handle's close() when the stream closes it, has settled.
var settled = function settled(closing, error, callback) {
  if (!closing) {
    callback(error);
    return;
  }
  closing.then(function () {
    return callback(error);
  }, function (closeError) {
    return callback(error !== null && error !== void 0 ? error : closeError);
  });
};
var positionOption = function positionOption(name, value) {
  if (value !== undefined && (!Number.isSafeInteger(value) || value < 0)) {
    throw invalid("".concat(name, " must be a whole number of 0 or more"));
  }
  return value;
};

// What a read stream stopped by its signal fails with, for the signal's reason: the reason itself whenever it is truthy,
// an Error, with its own identity, or any other value, as the SDK's other streams fail (see nodeStreamError in Api.js);
// or, for a falsy reason (null, false, 0, NaN, ''), with which a Node.js stream cannot fail, an Error named AbortError,
// with code ABORT_ERR and the reason as its cause, as Node.js's own addAbortSignal() fails a stream.
var streamFailureOf = function streamFailureOf(reason) {
  return reason || Object.assign(new Error('The operation was aborted', {
    cause: reason
  }), {
    code: 'ABORT_ERR',
    name: 'AbortError'
  });
};

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
var readStreamOf = function readStreamOf(handle, state, options) {
  var given = typeof options === 'string' ? {
    encoding: options
  } : options !== null && options !== void 0 ? options : {};
  var _given$autoClose = given.autoClose,
    autoClose = _given$autoClose === void 0 ? true : _given$autoClose,
    _given$emitClose = given.emitClose,
    emitClose = _given$emitClose === void 0 ? true : _given$emitClose,
    encoding = given.encoding,
    _given$highWaterMark = given.highWaterMark,
    highWaterMark = _given$highWaterMark === void 0 ? 64 * 1024 : _given$highWaterMark,
    signal = given.signal;
  var start = positionOption('start', given.start);
  var end = given.end === undefined || given.end === Infinity ? Infinity : positionOption('end', given.end);
  if (start !== undefined && start > end) {
    throw invalid('start must not be after end');
  }
  if (signal !== undefined && signal !== null && !isSignal(signal)) {
    throw invalid('signal must be an AbortSignal');
  }
  var position = start === undefined ? null : start;
  var pending = null;
  var onAbort = null;
  var owned = new AbortController();
  var stream = new _stream.Readable({
    destroy: function destroy(error, callback) {
      signal === null || signal === void 0 || signal.removeEventListener('abort', onAbort);
      if (!owned.signal.aborted) {
        owned.abort(error !== null && error !== void 0 ? error : new Error('The read stream was destroyed'));
      }
      var joined = pending ? pending.then(function () {}, function () {}) : Promise.resolve();
      joined.then(function () {
        return settled(autoClose ? handle.close() : null, error, callback);
      });
    },
    emitClose: emitClose,
    encoding: encoding,
    highWaterMark: highWaterMark,
    read: function read(size) {
      var length = Math.min(size, position === null ? end - stream.bytesRead + 1 : end - position + 1);
      if (length <= 0) {
        stream.push(null);
        return;
      }
      var buffer = Buffer.allocUnsafe(length);
      var reading = observe(state, 'read', function (stage) {
        return stage.read(buffer, 0, length, position);
      }, owned.signal);
      pending = reading;
      reading.then(function (_ref19) {
        var bytesRead = _ref19.bytesRead;
        pending = null;
        if (position !== null) {
          position += bytesRead;
        }
        stream.bytesRead += bytesRead;
        stream.push(bytesRead > 0 ? buffer.subarray(0, bytesRead) : null);
      }, function (error) {
        pending = null;
        stream.destroy(error);
      });
    }
  });
  stream.bytesRead = 0;
  if (signal) {
    onAbort = function onAbort() {
      return stream.destroy(streamFailureOf((0, _Transfer.abortReason)(signal)));
    };
    if (signal.aborted) {
      onAbort();
    } else {
      signal.addEventListener('abort', onAbort, {
        once: true
      });
    }
  }
  return stream;
};

// The views of buffers after their first count bytes, which a write has written already.
var after = function after(buffers, count) {
  var rest = [];
  var skip = count;
  buffers.forEach(function (buffer) {
    if (skip >= buffer.length) {
      skip -= buffer.length;
    } else {
      rest.push(skip > 0 ? buffer.subarray(skip) : buffer);
      skip = 0;
    }
  });
  return rest;
};

// A write stream of handle, as FileHandle's createWriteStream() gives one: at start, when given, or else at the handle's
// position. Each batch of chunks is written with writev(), each one published before it resolves, until every byte of
// the batch has been written, before the batch's callback: a writev() that writes only part of what it was given, as
// Node.js's may, is followed by one of the rest, and one that writes nothing of it fails the stream, as does one that
// fails, with its own error. So 'finish' comes only once every chunk has been written and published.
var writeStreamOf = function writeStreamOf(handle, options) {
  var given = typeof options === 'string' ? {
    encoding: options
  } : options !== null && options !== void 0 ? options : {};
  var _given$autoClose2 = given.autoClose,
    autoClose = _given$autoClose2 === void 0 ? true : _given$autoClose2,
    _given$emitClose2 = given.emitClose,
    emitClose = _given$emitClose2 === void 0 ? true : _given$emitClose2,
    _given$encoding = given.encoding,
    encoding = _given$encoding === void 0 ? 'utf8' : _given$encoding,
    _given$flush = given.flush,
    flush = _given$flush === void 0 ? false : _given$flush,
    highWaterMark = given.highWaterMark;
  var start = positionOption('start', given.start);
  if (flush === true) {
    throw new errors.NotImplementedError('flush is not supported: the SDK cannot confirm that a write has reached a physical device');
  }
  var position = start === undefined ? null : start;
  var stream = null;
  var writeAll = /*#__PURE__*/function () {
    var _ref20 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee11(buffers) {
      var rest, left, _yield$handle$writev, bytesWritten;
      return _regenerator.default.wrap(function (_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            rest = buffers;
            left = rest.reduce(function (total, buffer) {
              return total + buffer.length;
            }, 0);
          case 1:
            if (!(left > 0)) {
              _context11.next = 4;
              break;
            }
            _context11.next = 2;
            return handle.writev(rest, position);
          case 2:
            _yield$handle$writev = _context11.sent;
            bytesWritten = _yield$handle$writev.bytesWritten;
            if (bytesWritten > 0) {
              _context11.next = 3;
              break;
            }
            throw new errors.FilesError("A write of the stream wrote nothing of the ".concat(left, " bytes it had left to write"));
          case 3:
            if (position !== null) {
              position += bytesWritten;
            }
            stream.bytesWritten += bytesWritten;
            left -= bytesWritten;
            rest = after(rest, bytesWritten);
            _context11.next = 1;
            break;
          case 4:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }));
    return function writeAll(_x19) {
      return _ref20.apply(this, arguments);
    };
  }();
  stream = new _stream.Writable({
    decodeStrings: true,
    defaultEncoding: encoding,
    destroy: function destroy(error, callback) {
      return settled(autoClose ? handle.close() : null, error, callback);
    },
    emitClose: emitClose,
    highWaterMark: highWaterMark,
    writev: function writev(chunks, callback) {
      writeAll(chunks.map(function (_ref21) {
        var chunk = _ref21.chunk;
        return chunk;
      })).then(function () {
        return callback();
      }, callback);
    }
  });
  stream.bytesWritten = 0;
  return stream;
};

// A WHATWG byte stream of handle's file from its position, as FileHandle's readableWebStream() gives one. The handle is
// locked while it is read.
var webStreamOf = function webStreamOf(handle, state, options) {
  if (state.status !== 'open') {
    throw nodeError('ERR_INVALID_STATE', "Invalid state: The FileHandle is ".concat(state.status));
  }
  if (state.locked) {
    throw nodeError('ERR_INVALID_STATE', 'Invalid state: The FileHandle is locked');
  }
  if (options !== undefined && options !== null && options.type !== undefined && options.type !== 'bytes') {
    throw invalid('type must be \'bytes\'');
  }
  state.locked = true;
  var unlock = function unlock() {
    state.locked = false;
  };
  return new globalThis.ReadableStream({
    autoAllocateChunkSize: 16384,
    cancel: unlock,
    pull: function () {
      var _pull = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee12(controller) {
        var view, bytesRead, _yield$handle$read, _t1;
        return _regenerator.default.wrap(function (_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              view = controller.byobRequest.view;
              _context12.prev = 1;
              _context12.next = 2;
              return handle.read(view, 0, view.byteLength, null);
            case 2:
              _yield$handle$read = _context12.sent;
              bytesRead = _yield$handle$read.bytesRead;
              _context12.next = 4;
              break;
            case 3:
              _context12.prev = 3;
              _t1 = _context12["catch"](1);
              unlock();
              throw _t1;
            case 4:
              if (bytesRead === 0) {
                unlock();
                controller.close();
              }
              controller.byobRequest.respond(bytesRead);
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[1, 3]]);
      }));
      function pull(_x20) {
        return _pull.apply(this, arguments);
      }
      return pull;
    }(),
    type: 'bytes'
  });
};

/**
 * A Files.com file open for reading, writing or both, as Node.js's FileHandle gives a file, by `client.fs.open()`. See
 * the module's comment for how it reads, publishes and closes, and Files.RemoteFileHandle for each method.
 */
var _state2 = /*#__PURE__*/new WeakMap();
var RemoteFileHandle = exports.RemoteFileHandle = /*#__PURE__*/function (_EventEmitter) {
  function RemoteFileHandle(state) {
    var _this3;
    (0, _classCallCheck2.default)(this, RemoteFileHandle);
    _this3 = _callSuper(this, RemoteFileHandle);
    _classPrivateFieldInitSpec(_this3, _state2, void 0);
    _classPrivateFieldSet(_state2, _this3, state);

    // The operations admitted in turn hold only the state: through it, they hold the handle as well, so that the
    // handle, whose collection removes the stage's directory, outlives every one of them, queued or under way.
    state.handle = _this3;
    abandoned === null || abandoned === void 0 || abandoned.register(_this3, state.directory, state);
    return _this3;
  }

  // A Files.com file has no descriptor of this process: the stage's own is the SDK's, and never exposed.
  (0, _inherits2.default)(RemoteFileHandle, _EventEmitter);
  return (0, _createClass2.default)(RemoteFileHandle, [{
    key: "fd",
    get: function get() {
      return descriptorOf(_classPrivateFieldGet(_state2, this));
    }
  }, {
    key: "appendFile",
    value: function appendFile(data, options) {
      return this.writeFile(data, options);
    }
  }, {
    key: "chmod",
    value: function chmod() {
      return notSupported(_classPrivateFieldGet(_state2, this), 'fchmod', 'chmod() is not supported: Files.com paths have no file modes');
    }
  }, {
    key: "chown",
    value: function chown() {
      return notSupported(_classPrivateFieldGet(_state2, this), 'fchown', 'chown() is not supported: Files.com paths have no owners');
    }

    // Closes the handle once everything asked before has settled: closes and removes the stage, and emits 'close'.
    // Resolves at once when it has closed already. Rejects with the handle's first failure, or else the stage's.
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;
      var state = _classPrivateFieldGet(_state2, this);
      if (state.status === 'closed') {
        return Promise.resolve();
      }
      if (state.closing) {
        return state.closing;
      }
      state.status = 'closing';
      state.closing = state.tail.then(/*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var failure, _t10;
        return _regenerator.default.wrap(function (_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              failure = state.failure;
              _context13.prev = 1;
              _context13.next = 2;
              return releaseStage(state);
            case 2:
              _context13.next = 4;
              break;
            case 3:
              _context13.prev = 3;
              _t10 = _context13["catch"](1);
              failure = failure !== null && failure !== void 0 ? failure : {
                error: _t10
              };
            case 4:
              state.status = 'closed';
              _this4.emit('close');
              if (!failure) {
                _context13.next = 5;
                break;
              }
              throw failure.error;
            case 5:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[1, 3]]);
      })));
      return state.closing;
    }
  }, {
    key: "createReadStream",
    value: function createReadStream(options) {
      return readStreamOf(this, _classPrivateFieldGet(_state2, this), options);
    }
  }, {
    key: "createWriteStream",
    value: function createWriteStream(options) {
      return writeStreamOf(this, options);
    }
  }, {
    key: "datasync",
    value: function datasync() {
      return notSupported(_classPrivateFieldGet(_state2, this), 'fdatasync', 'datasync() is not supported: the SDK cannot confirm that a write has reached a physical device');
    }
  }, {
    key: "read",
    value: function read() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return observe(_classPrivateFieldGet(_state2, this), 'read', function (stage) {
        return stage.read.apply(stage, args);
      });
    }
  }, {
    key: "readableWebStream",
    value: function readableWebStream(options) {
      return webStreamOf(this, _classPrivateFieldGet(_state2, this), options);
    }
  }, {
    key: "readFile",
    value: function readFile(options) {
      return observe(_classPrivateFieldGet(_state2, this), 'read', function (stage) {
        return stage.readFile(options);
      }, signalOf(options));
    }
  }, {
    key: "readLines",
    value: function readLines(options) {
      return _readline.default.createInterface({
        crlfDelay: Infinity,
        input: this.createReadStream(options)
      });
    }
  }, {
    key: "readv",
    value: function readv(buffers, position) {
      return observe(_classPrivateFieldGet(_state2, this), 'read', function (stage) {
        return stage.readv(buffers, position);
      });
    }

    // The remote file's stats (see RemoteStats), as the API has them now: every change before has been published.
  }, {
    key: "stat",
    value: function stat(options) {
      var state = _classPrivateFieldGet(_state2, this);
      return inTurn(state, 'fstat', function () {
        return statsOf(state.client, state.remotePath, 'fstat', options);
      });
    }
  }, {
    key: "sync",
    value: function sync() {
      return notSupported(_classPrivateFieldGet(_state2, this), 'fsync', 'sync() is not supported: the SDK cannot confirm that a write has reached a physical device');
    }
  }, {
    key: "truncate",
    value: function truncate(len) {
      return changed(_classPrivateFieldGet(_state2, this), 'ftruncate', function (stage) {
        return stage.truncate(len);
      }, {
        validated: true
      });
    }
  }, {
    key: "utimes",
    value: function utimes() {
      return notSupported(_classPrivateFieldGet(_state2, this), 'futime', 'utimes() is not supported: the API keeps its own modification time, and no access time');
    }
  }, {
    key: "write",
    value: function write() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return changed(_classPrivateFieldGet(_state2, this), 'write', function (stage) {
        return stage.write.apply(stage, args);
      }, {
        validated: true
      });
    }
  }, {
    key: "writeFile",
    value: function writeFile(data, options) {
      var signal = signalOf(options);
      return changed(_classPrivateFieldGet(_state2, this), 'write', function (stage) {
        return stage.writeFile(data, options);
      }, {
        signal: signal
      });
    }

    // As Node.js's: it may write fewer bytes than it was given, which bytesWritten says, and publishes what it wrote.
  }, {
    key: "writev",
    value: function writev(buffers, position) {
      return changed(_classPrivateFieldGet(_state2, this), 'write', function (stage) {
        return stage.writev(buffers, position);
      }, {
        validated: true
      });
    }
  }, {
    key: asyncDispose,
    value: function value() {
      return this.close();
    }
  }]);
}(_events.EventEmitter); // Opens remotePath with flags (see accessOf), checking its metadata first: a path that is not there fails with ENOENT
// unless the flags create it, and a directory with EISDIR. A path the flags create or truncate is published empty before
// the handle is given, unless publishOnOpen is false, for a writeFile() that publishes its whole data at once. A mode is
// refused for flags that create the file, and ignored otherwise, as Node.js ignores it. signal, a whole-file call's own,
// stops the metadata request and the publication, which then reject with its reason, unchanged, the stage released.
var openHandle = /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee14(client, target, flags, mode, publishOnOpen, signal) {
    var remotePath, access, existing, directory, state, _t11, _t12, _t13;
    return _regenerator.default.wrap(function (_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          remotePath = remotePathOf(target);
          access = accessOf(flags);
          if (!(access.create && mode !== undefined && mode !== null)) {
            _context14.next = 1;
            break;
          }
          throw new errors.NotImplementedError('A file mode is not supported: Files.com paths have no file modes');
        case 1:
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context14.next = 2;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 2:
          existing = null;
          _context14.prev = 3;
          _context14.next = 4;
          return File().find(remotePath, {}, signal ? {
            client: client,
            signal: signal
          } : {
            client: client
          });
        case 4:
          existing = _context14.sent.attributes;
          _context14.next = 6;
          break;
        case 5:
          _context14.prev = 5;
          _t11 = _context14["catch"](3);
          if (!(!access.create || !isNotFound(_t11))) {
            _context14.next = 6;
            break;
          }
          throw pathError(_t11, 'open', remotePath);
        case 6:
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context14.next = 7;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 7:
          if (!(existing && entryTypeOf(existing, remotePath) === 'directory')) {
            _context14.next = 8;
            break;
          }
          throw fsError('EISDIR', 'open', remotePath);
        case 8:
          _context14.next = 9;
          return _fs.default.promises.mkdtemp(_path.default.join(_os.default.tmpdir(), STAGE_PREFIX));
        case 9:
          directory = _context14.sent;
          state = {
            access: access,
            client: client,
            closing: null,
            directory: directory,
            failure: null,
            locked: false,
            remotePath: remotePath,
            stage: null,
            stagePath: _path.default.join(directory, 'stage'),
            status: 'open',
            tail: Promise.resolve()
          };
          _context14.prev = 10;
          if (!(!existing || access.truncate)) {
            _context14.next = 16;
            break;
          }
          _context14.next = 11;
          return _fs.default.promises.writeFile(state.stagePath, '', {
            mode: 384
          });
        case 11:
          _context14.next = 12;
          return _fs.default.promises.open(state.stagePath, access.stageFlags);
        case 12:
          state.stage = _context14.sent;
          if (!publishOnOpen) {
            _context14.next = 16;
            break;
          }
          _context14.prev = 13;
          _context14.next = 14;
          return publish(state, signal);
        case 14:
          _context14.next = 16;
          break;
        case 15:
          _context14.prev = 15;
          _t12 = _context14["catch"](13);
          throw pathError(_t12, 'open', remotePath);
        case 16:
          _context14.next = 19;
          break;
        case 17:
          _context14.prev = 17;
          _t13 = _context14["catch"](10);
          _context14.next = 18;
          return releaseStage(state).catch(function () {});
        case 18:
          throw _t13;
        case 19:
          return _context14.abrupt("return", new RemoteFileHandle(state));
        case 20:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[3, 5], [10, 17], [13, 15]]);
  }));
  return function openHandle(_x21, _x22, _x23, _x24, _x25, _x26) {
    return _ref23.apply(this, arguments);
  };
}();
var readFileOptionsOf = function readFileOptionsOf(options) {
  var given = typeof options === 'string' ? {
    encoding: options
  } : options;
  if (given !== undefined && given !== null && !isOptions(given)) {
    throw invalid('options must be an object or an encoding');
  }
  var _ref24 = given !== null && given !== void 0 ? given : {},
    _ref24$encoding = _ref24.encoding,
    encoding = _ref24$encoding === void 0 ? null : _ref24$encoding,
    _ref24$flag = _ref24.flag,
    flag = _ref24$flag === void 0 ? 'r' : _ref24$flag,
    signal = _ref24.signal;
  if (encoding !== null) {
    encodingOf(encoding);
  }
  if (signal !== undefined && !isSignal(signal)) {
    throw invalid('signal must be an AbortSignal');
  }
  return {
    encoding: encoding,
    flag: flag,
    signal: signal
  };
};

// readFile(): through the handle given, or else a handle of the path opened with the flag, with signal for its whole
// operation, and closed once read. A read that fails rejects with its own failure, even when closing then fails too,
// which is still awaited; a close that fails after a read that did not rejects with the close's failure.
var readWhole = /*#__PURE__*/function () {
  var _ref25 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee15(client, target, options) {
    var _readFileOptionsOf, encoding, flag, signal, handle, contents, _t14;
    return _regenerator.default.wrap(function (_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _readFileOptionsOf = readFileOptionsOf(options), encoding = _readFileOptionsOf.encoding, flag = _readFileOptionsOf.flag, signal = _readFileOptionsOf.signal;
          if (!(target instanceof RemoteFileHandle)) {
            _context15.next = 1;
            break;
          }
          return _context15.abrupt("return", target.readFile({
            encoding: encoding,
            signal: signal
          }));
        case 1:
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context15.next = 2;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 2:
          _context15.next = 3;
          return openHandle(client, target, flag, undefined, true, signal);
        case 3:
          handle = _context15.sent;
          _context15.prev = 4;
          _context15.next = 5;
          return handle.readFile({
            encoding: encoding,
            signal: signal
          });
        case 5:
          contents = _context15.sent;
          _context15.next = 8;
          break;
        case 6:
          _context15.prev = 6;
          _t14 = _context15["catch"](4);
          _context15.next = 7;
          return handle.close().catch(function () {});
        case 7:
          throw _t14;
        case 8:
          _context15.next = 9;
          return handle.close();
        case 9:
          return _context15.abrupt("return", contents);
        case 10:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[4, 6]]);
  }));
  return function readWhole(_x27, _x28, _x29) {
    return _ref25.apply(this, arguments);
  };
}();
var writeFileOptionsOf = function writeFileOptionsOf(options, defaultFlag) {
  var given = typeof options === 'string' ? {
    encoding: options
  } : options;
  if (given !== undefined && given !== null && !isOptions(given)) {
    throw invalid('options must be an object or an encoding');
  }
  var _ref26 = given !== null && given !== void 0 ? given : {},
    _ref26$encoding = _ref26.encoding,
    encoding = _ref26$encoding === void 0 ? 'utf8' : _ref26$encoding,
    _ref26$flag = _ref26.flag,
    flag = _ref26$flag === void 0 ? defaultFlag : _ref26$flag,
    _ref26$flush = _ref26.flush,
    flush = _ref26$flush === void 0 ? false : _ref26$flush,
    mode = _ref26.mode,
    signal = _ref26.signal;
  if (signal !== undefined && !isSignal(signal)) {
    throw invalid('signal must be an AbortSignal');
  }
  return {
    encoding: encoding,
    flag: flag,
    flush: flush,
    mode: mode,
    signal: signal
  };
};

// writeFile(), and appendFile() with defaultFlag 'a': through the handle given, or else a handle of the path opened
// with the flag, with signal for its whole operation, its metadata request and publications included. appendFile()'s
// default 'a' is refused, as every append flag is; a flag that does not append, given explicitly, works as it does for
// writeFile(). A flag that creates and truncates, such as w, publishes the whole data in one upload, so that the remote
// file is replaced once, and left as it was when the data cannot be written.
var writeWhole = /*#__PURE__*/function () {
  var _ref27 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee16(client, target, data, options, defaultFlag) {
    var _writeFileOptionsOf, encoding, flag, flush, mode, signal, access, handle, _t15;
    return _regenerator.default.wrap(function (_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _writeFileOptionsOf = writeFileOptionsOf(options, defaultFlag), encoding = _writeFileOptionsOf.encoding, flag = _writeFileOptionsOf.flag, flush = _writeFileOptionsOf.flush, mode = _writeFileOptionsOf.mode, signal = _writeFileOptionsOf.signal;
          if (!(flush === true)) {
            _context16.next = 1;
            break;
          }
          throw new errors.NotImplementedError('flush is not supported: the SDK cannot confirm that a write has reached a physical device');
        case 1:
          if (!(target instanceof RemoteFileHandle)) {
            _context16.next = 2;
            break;
          }
          return _context16.abrupt("return", target.writeFile(data, {
            encoding: encoding,
            signal: signal
          }));
        case 2:
          access = accessOf(flag);
          if (!(signal !== null && signal !== void 0 && signal.aborted)) {
            _context16.next = 3;
            break;
          }
          throw (0, _Transfer.abortReason)(signal);
        case 3:
          _context16.next = 4;
          return openHandle(client, target, flag, mode, !(access.create && access.truncate), signal);
        case 4:
          handle = _context16.sent;
          _context16.prev = 5;
          _context16.next = 6;
          return handle.writeFile(data, {
            encoding: encoding,
            signal: signal
          });
        case 6:
          _context16.next = 9;
          break;
        case 7:
          _context16.prev = 7;
          _t15 = _context16["catch"](5);
          _context16.next = 8;
          return handle.close().catch(function () {});
        case 8:
          throw _t15;
        case 9:
          return _context16.abrupt("return", handle.close());
        case 10:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[5, 7]]);
  }));
  return function writeWhole(_x30, _x31, _x32, _x33, _x34) {
    return _ref27.apply(this, arguments);
  };
}();
var statPath = /*#__PURE__*/function () {
  var _ref28 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee17(client, target, options) {
    return _regenerator.default.wrap(function (_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          return _context17.abrupt("return", statsOf(client, remotePathOf(target), 'stat', options));
        case 1:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function statPath(_x35, _x36, _x37) {
    return _ref28.apply(this, arguments);
  };
}();

/**
 * The Files.com filesystem of a client, as `client.fs` gives it (see Files.Filesystem): Node.js's fs/promises
 * conventions over the client's Files.com paths.
 */
var _client = /*#__PURE__*/new WeakMap();
var RemoteFilesystem = exports.RemoteFilesystem = /*#__PURE__*/function () {
  function RemoteFilesystem(client) {
    (0, _classCallCheck2.default)(this, RemoteFilesystem);
    _classPrivateFieldInitSpec(this, _client, void 0);
    _classPrivateFieldSet(_client, this, client);
  }
  return (0, _createClass2.default)(RemoteFilesystem, [{
    key: "appendFile",
    value: function appendFile(file, data, options) {
      return writeWhole(_classPrivateFieldGet(_client, this), file, data, options, 'a');
    }
  }, {
    key: "open",
    value: function open(file, flags, mode) {
      return openHandle(_classPrivateFieldGet(_client, this), file, flags, mode, true);
    }
  }, {
    key: "opendir",
    value: function opendir(dirPath, options) {
      return openDir(_classPrivateFieldGet(_client, this), dirPath, options);
    }
  }, {
    key: "readdir",
    value: function readdir(dirPath, options) {
      return readDirectory(_classPrivateFieldGet(_client, this), dirPath, options);
    }
  }, {
    key: "readFile",
    value: function readFile(file, options) {
      return readWhole(_classPrivateFieldGet(_client, this), file, options);
    }
  }, {
    key: "stat",
    value: function stat(file, options) {
      return statPath(_classPrivateFieldGet(_client, this), file, options);
    }
  }, {
    key: "writeFile",
    value: function writeFile(file, data, options) {
      return writeWhole(_classPrivateFieldGet(_client, this), file, data, options, 'w');
    }
  }]);
}();