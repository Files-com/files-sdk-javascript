"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var errors = _interopRequireWildcard(require("./Errors"));
var _utils = require("./utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// A client's Files.com filesystem, client.fs (see FilesClient.js): Node.js's fs/promises conventions over the paths of
// the client's Files.com site and workspace, with file handles that read and write the remote file and directories that
// list it (see isomorphic/Filesystem.node.js). Node.js only: in a browser, which leaves that module out of its bundle,
// every method rejects with a NotImplementedError, before anything is sent.

var METHODS = ['appendFile', 'open', 'opendir', 'readdir', 'readFile', 'stat', 'writeFile'];
var unavailable = function unavailable() {
  return Object.freeze(Object.fromEntries(METHODS.map(function (name) {
    return [name, /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            throw new errors.NotImplementedError("client.fs.".concat(name, "() is only available in a NodeJS environment"));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))];
  })));
};
var filesystemOf = function filesystemOf(client) {
  if ((0, _utils.isBrowser)()) {
    return unavailable();
  }
  var _require = require('./isomorphic/Filesystem.node.js'),
    RemoteFilesystem = _require.RemoteFilesystem;
  return new RemoteFilesystem(client);
};
var _default = exports.default = filesystemOf;