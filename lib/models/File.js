"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _readableStream = _interopRequireDefault(require("readable-stream"));
var _safeBuffer = require("safe-buffer");
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _excluded = ["determinePartUploadUri"];
var _class;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class File
 */
var File = /*#__PURE__*/(0, _createClass2.default)(function File() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, File);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "downloadToStream", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(writableStream) {
      var downloadUri, _require, saveUrlToStream;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context.next = 2;
              break;
            }
            throw new errors.NotImplementedError('Stream downloads are only available in a NodeJS environment');
          case 2:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context.next = 5;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 5:
            _require = require('../isomorphic/File.node.js'), saveUrlToStream = _require.saveUrlToStream;
            return _context.abrupt("return", saveUrlToStream(downloadUri, writableStream));
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "downloadToString", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var downloadUri, _require2, saveUrlToString;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(0, _utils.isBrowser)()) {
            _context2.next = 2;
            break;
          }
          throw new errors.NotImplementedError('String downloads are only available in a NodeJS environment');
        case 2:
          downloadUri = _this.getDownloadUri();
          if (downloadUri) {
            _context2.next = 5;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no download URI');
        case 5:
          _require2 = require('../isomorphic/File.node.js'), saveUrlToString = _require2.saveUrlToString;
          return _context2.abrupt("return", saveUrlToString(downloadUri));
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "downloadToFile", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(destinationPath) {
      var downloadUri, _require3, saveUrlToFile;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context3.next = 2;
              break;
            }
            throw new errors.NotImplementedError('Disk file downloads are only available in a NodeJS environment');
          case 2:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context3.next = 5;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 5:
            _require3 = require('../isomorphic/File.node.js'), saveUrlToFile = _require3.saveUrlToFile;
            return _context3.abrupt("return", saveUrlToFile(downloadUri, destinationPath));
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "copyTo", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(destinationFilePath, options) {
      var params;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            params = {
              destination: destinationFilePath
            };
            return _context4.abrupt("return", _Api.default.sendRequest("/file_actions/copy/".concat(encodeURIComponent(_this.path)), 'POST', params, options));
          case 2:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x3, _x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "moveTo", /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(destinationFilePath, options) {
      var params;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            params = {
              destination: destinationFilePath
            };
            return _context5.abrupt("return", _Api.default.sendRequest("/file_actions/move/".concat(encodeURIComponent(_this.path)), 'POST', params, options));
          case 2:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }());
  // string # File/Folder path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // string # File/Folder display name
  (0, _defineProperty2.default)(this, "getDisplayName", function () {
    return _this.attributes.display_name;
  });
  (0, _defineProperty2.default)(this, "setDisplayName", function (value) {
    _this.attributes.display_name = value;
  });
  // string # Type: `directory` or `file`.
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
  });
  // int64 # File/Folder size
  (0, _defineProperty2.default)(this, "getSize", function () {
    return _this.attributes.size;
  });
  (0, _defineProperty2.default)(this, "setSize", function (value) {
    _this.attributes.size = value;
  });
  // date-time # File created date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # File last modified date/time, according to the server.  This is the timestamp of the last Files.com operation of the file, regardless of what modified timestamp was sent.
  (0, _defineProperty2.default)(this, "getMtime", function () {
    return _this.attributes.mtime;
  });
  (0, _defineProperty2.default)(this, "setMtime", function (value) {
    _this.attributes.mtime = value;
  });
  // date-time # File last modified date/time, according to the client who set it.  Files.com allows desktop, FTP, SFTP, and WebDAV clients to set modified at times.  This allows Desktop<->Cloud syncing to preserve modified at times.
  (0, _defineProperty2.default)(this, "getProvidedMtime", function () {
    return _this.attributes.provided_mtime;
  });
  (0, _defineProperty2.default)(this, "setProvidedMtime", function (value) {
    _this.attributes.provided_mtime = value;
  });
  // string # File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getCrc32", function () {
    return _this.attributes.crc32;
  });
  (0, _defineProperty2.default)(this, "setCrc32", function (value) {
    _this.attributes.crc32 = value;
  });
  // string # File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getMd5", function () {
    return _this.attributes.md5;
  });
  (0, _defineProperty2.default)(this, "setMd5", function (value) {
    _this.attributes.md5 = value;
  });
  // string # MIME Type.  This is determined by the filename extension and is not stored separately internally.
  (0, _defineProperty2.default)(this, "getMimeType", function () {
    return _this.attributes.mime_type;
  });
  (0, _defineProperty2.default)(this, "setMimeType", function (value) {
    _this.attributes.mime_type = value;
  });
  // string # Region location
  (0, _defineProperty2.default)(this, "getRegion", function () {
    return _this.attributes.region;
  });
  (0, _defineProperty2.default)(this, "setRegion", function (value) {
    _this.attributes.region = value;
  });
  // string # A short string representing the current user's permissions.  Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List) or any combination
  (0, _defineProperty2.default)(this, "getPermissions", function () {
    return _this.attributes.permissions;
  });
  (0, _defineProperty2.default)(this, "setPermissions", function (value) {
    _this.attributes.permissions = value;
  });
  // boolean # Are subfolders locked and unable to be modified?
  (0, _defineProperty2.default)(this, "getSubfoldersLocked", function () {
    return _this.attributes.subfolders_locked;
  });
  (0, _defineProperty2.default)(this, "setSubfoldersLocked", function (value) {
    _this.attributes.subfolders_locked = value;
  });
  // boolean # Is this folder locked and unable to be modified?
  (0, _defineProperty2.default)(this, "getIsLocked", function () {
    return _this.attributes.is_locked;
  });
  (0, _defineProperty2.default)(this, "setIsLocked", function (value) {
    _this.attributes.is_locked = value;
  });
  // string # Link to download file. Provided only in response to a download request.
  (0, _defineProperty2.default)(this, "getDownloadUri", function () {
    return _this.attributes.download_uri;
  });
  (0, _defineProperty2.default)(this, "setDownloadUri", function (value) {
    _this.attributes.download_uri = value;
  });
  // string # Bookmark/priority color of file/folder
  (0, _defineProperty2.default)(this, "getPriorityColor", function () {
    return _this.attributes.priority_color;
  });
  (0, _defineProperty2.default)(this, "setPriorityColor", function (value) {
    _this.attributes.priority_color = value;
  });
  // int64 # File preview ID
  (0, _defineProperty2.default)(this, "getPreviewId", function () {
    return _this.attributes.preview_id;
  });
  (0, _defineProperty2.default)(this, "setPreviewId", function (value) {
    _this.attributes.preview_id = value;
  });
  // Preview # File preview
  (0, _defineProperty2.default)(this, "getPreview", function () {
    return _this.attributes.preview;
  });
  (0, _defineProperty2.default)(this, "setPreview", function (value) {
    _this.attributes.preview = value;
  });
  // string # The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
  });
  // int64 # Length of file.
  (0, _defineProperty2.default)(this, "getLength", function () {
    return _this.attributes.length;
  });
  (0, _defineProperty2.default)(this, "setLength", function (value) {
    _this.attributes.length = value;
  });
  // boolean # Create parent directories if they do not exist?
  (0, _defineProperty2.default)(this, "getMkdirParents", function () {
    return _this.attributes.mkdir_parents;
  });
  (0, _defineProperty2.default)(this, "setMkdirParents", function (value) {
    _this.attributes.mkdir_parents = value;
  });
  // int64 # Part if uploading a part.
  (0, _defineProperty2.default)(this, "getPart", function () {
    return _this.attributes.part;
  });
  (0, _defineProperty2.default)(this, "setPart", function (value) {
    _this.attributes.part = value;
  });
  // int64 # How many parts to fetch?
  (0, _defineProperty2.default)(this, "getParts", function () {
    return _this.attributes.parts;
  });
  (0, _defineProperty2.default)(this, "setParts", function (value) {
    _this.attributes.parts = value;
  });
  // string #
  (0, _defineProperty2.default)(this, "getRef", function () {
    return _this.attributes.ref;
  });
  (0, _defineProperty2.default)(this, "setRef", function (value) {
    _this.attributes.ref = value;
  });
  // int64 # File byte offset to restart from.
  (0, _defineProperty2.default)(this, "getRestart", function () {
    return _this.attributes.restart;
  });
  (0, _defineProperty2.default)(this, "setRestart", function (value) {
    _this.attributes.restart = value;
  });
  // string # If copying folder, copy just the structure?
  (0, _defineProperty2.default)(this, "getStructure", function () {
    return _this.attributes.structure;
  });
  (0, _defineProperty2.default)(this, "setStructure", function (value) {
    _this.attributes.structure = value;
  });
  // boolean # Allow file rename instead of overwrite?
  (0, _defineProperty2.default)(this, "getWithRename", function () {
    return _this.attributes.with_rename;
  });
  (0, _defineProperty2.default)(this, "setWithRename", function (value) {
    _this.attributes.with_rename = value;
  });
  // Download file
  //
  // Parameters:
  //   action - string - Can be blank, `redirect` or `stat`.  If set to `stat`, we will return file information but without a download URL, and without logging a download.  If set to `redirect` we will serve a 302 redirect directly to the file.  This is used for integrations with Zapier, and is not recommended for most integrations.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  (0, _defineProperty2.default)(this, "download", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
    var params,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
          if (_this.attributes.path) {
            _context6.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context6.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context6.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (!(params.action && !(0, _utils.isString)(params.action))) {
            _context6.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 10:
          if (!(params.preview_size && !(0, _utils.isString)(params.preview_size))) {
            _context6.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 12:
          if (params.path) {
            _context6.next = 18;
            break;
          }
          if (!_this.attributes.path) {
            _context6.next = 17;
            break;
          }
          params.path = _this.path;
          _context6.next = 18;
          break;
        case 17:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 18:
          _context6.next = 20;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'GET', params, _this.options);
        case 20:
          response = _context6.sent;
          return _context6.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  // Parameters:
  //   provided_mtime - string - Modified time of file.
  //   priority_color - string - Priority/Bookmark color of file.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
    var params,
      response,
      _args7 = arguments;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
          if (_this.attributes.path) {
            _context7.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context7.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context7.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (!(params.provided_mtime && !(0, _utils.isString)(params.provided_mtime))) {
            _context7.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 10:
          if (!(params.priority_color && !(0, _utils.isString)(params.priority_color))) {
            _context7.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: priority_color must be of type String, received ".concat((0, _utils.getType)(params.priority_color)));
        case 12:
          if (params.path) {
            _context7.next = 18;
            break;
          }
          if (!_this.attributes.path) {
            _context7.next = 17;
            break;
          }
          params.path = _this.path;
          _context7.next = 18;
          break;
        case 17:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 18:
          _context7.next = 20;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'PATCH', params, _this.options);
        case 20:
          response = _context7.sent;
          return _context7.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  // Parameters:
  //   recursive - boolean - If true, will recursively delete folers.  Otherwise, will error on non-empty folders.
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
    var params,
      _args8 = arguments;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
          if (_this.attributes.path) {
            _context8.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context8.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context8.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (params.path) {
            _context8.next = 14;
            break;
          }
          if (!_this.attributes.path) {
            _context8.next = 13;
            break;
          }
          params.path = _this.path;
          _context8.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 14:
          _context8.next = 16;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'DELETE', params, _this.options);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  // Copy file/folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   structure - boolean - Copy structure only?
  (0, _defineProperty2.default)(this, "copy", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
    var params,
      response,
      FileAction,
      _args9 = arguments;
    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          params = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
          if (_this.attributes.path) {
            _context9.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context9.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context9.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (!(params.destination && !(0, _utils.isString)(params.destination))) {
            _context9.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 10:
          if (params.path) {
            _context9.next = 16;
            break;
          }
          if (!_this.attributes.path) {
            _context9.next = 15;
            break;
          }
          params.path = _this.path;
          _context9.next = 16;
          break;
        case 15:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 16:
          if (params.destination) {
            _context9.next = 22;
            break;
          }
          if (!_this.attributes.destination) {
            _context9.next = 21;
            break;
          }
          params.destination = _this.destination;
          _context9.next = 22;
          break;
        case 21:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 22:
          _context9.next = 24;
          return _Api.default.sendRequest("/file_actions/copy/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 24:
          response = _context9.sent;
          FileAction = require('./FileAction.js').default;
          return _context9.abrupt("return", new FileAction(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 27:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  // Move file/folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  (0, _defineProperty2.default)(this, "move", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
    var params,
      response,
      FileAction,
      _args10 = arguments;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          params = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
          if (_this.attributes.path) {
            _context10.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context10.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context10.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (!(params.destination && !(0, _utils.isString)(params.destination))) {
            _context10.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 10:
          if (params.path) {
            _context10.next = 16;
            break;
          }
          if (!_this.attributes.path) {
            _context10.next = 15;
            break;
          }
          params.path = _this.path;
          _context10.next = 16;
          break;
        case 15:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 16:
          if (params.destination) {
            _context10.next = 22;
            break;
          }
          if (!_this.attributes.destination) {
            _context10.next = 21;
            break;
          }
          params.destination = _this.destination;
          _context10.next = 22;
          break;
        case 21:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 22:
          _context10.next = 24;
          return _Api.default.sendRequest("/file_actions/move/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 24:
          response = _context10.sent;
          FileAction = require('./FileAction.js').default;
          return _context10.abrupt("return", new FileAction(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 27:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  // Begin file upload
  //
  // Parameters:
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Total bytes of file being uploaded (include bytes being retained if appending/restarting).
  //   with_rename - boolean - Allow file rename instead of overwrite?
  (0, _defineProperty2.default)(this, "beginUpload", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
    var _response$data;
    var params,
      response,
      FileUploadPart,
      _args11 = arguments;
    return _regenerator.default.wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          params = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
          if (_this.attributes.path) {
            _context11.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context11.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context11.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (!(params.part && !(0, _utils.isInt)(params.part))) {
            _context11.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(params.part)));
        case 10:
          if (!(params.parts && !(0, _utils.isInt)(params.parts))) {
            _context11.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(params.parts)));
        case 12:
          if (!(params.ref && !(0, _utils.isString)(params.ref))) {
            _context11.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(params.ref)));
        case 14:
          if (!(params.restart && !(0, _utils.isInt)(params.restart))) {
            _context11.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(params.restart)));
        case 16:
          if (!(params.size && !(0, _utils.isInt)(params.size))) {
            _context11.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(params.size)));
        case 18:
          if (params.path) {
            _context11.next = 24;
            break;
          }
          if (!_this.attributes.path) {
            _context11.next = 23;
            break;
          }
          params.path = _this.path;
          _context11.next = 24;
          break;
        case 23:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 24:
          _context11.next = 26;
          return _Api.default.sendRequest("/file_actions/begin_upload/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 26:
          response = _context11.sent;
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context11.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new FileUploadPart(obj, _this.options);
          })) || []);
        case 29:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
    var newObject;
    return _regenerator.default.wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return File.create(_this.attributes.path, _this.attributes, _this.options);
        case 2:
          newObject = _context12.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context12.abrupt("return", true);
        case 5:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
  Object.entries(attributes).forEach(function (_ref13) {
    var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
      key = _ref14[0],
      value = _ref14[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, _options);
});
_class = File;
(0, _defineProperty2.default)(File, "_openUpload", /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(path, paramsRaw, options) {
    var params, response, partData, FileUploadPart;
    return _regenerator.default.wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          params = _objectSpread(_objectSpread({}, paramsRaw), {}, {
            action: 'put'
          });
          _context13.next = 3;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'POST', params, options);
        case 3:
          response = _context13.sent;
          if (response) {
            _context13.next = 6;
            break;
          }
          return _context13.abrupt("return", null);
        case 6:
          partData = _objectSpread(_objectSpread({}, response.data), {}, {
            headers: response.headers,
            parameters: params
          });
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context13.abrupt("return", new FileUploadPart(partData));
        case 9:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x7, _x8, _x9) {
    return _ref15.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "_continueUpload", /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(path, partNumber, firstFileUploadPart, options) {
    var params, response, partData, FileUploadPart;
    return _regenerator.default.wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          params = {
            action: 'put',
            part: partNumber,
            ref: firstFileUploadPart.ref
          };
          _context14.next = 3;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'POST', params, options);
        case 3:
          response = _context14.sent;
          if (response) {
            _context14.next = 6;
            break;
          }
          return _context14.abrupt("return", null);
        case 6:
          partData = _objectSpread(_objectSpread({}, response.data), {}, {
            headers: response.headers,
            parameters: params
          });
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context14.abrupt("return", new FileUploadPart(partData));
        case 9:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x10, _x11, _x12, _x13) {
    return _ref16.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "_completeUpload", /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(firstFileUploadPart, options) {
    var params;
    return _regenerator.default.wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          params = {
            action: 'end',
            ref: firstFileUploadPart.ref
          };
          return _context15.abrupt("return", _Api.default.sendRequest("/files/".concat(encodeURIComponent(firstFileUploadPart.path)), 'POST', params, options));
        case 2:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function (_x14, _x15) {
    return _ref17.apply(this, arguments);
  };
}());
/**
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadStream", /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18(destinationPath, readableStream, params, optionsRaw) {
    var _ref19, determinePartUploadUriRaw, options, firstFileUploadPart, determinePartUploadUri, file;
    return _regenerator.default.wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _ref19 = optionsRaw || {}, determinePartUploadUriRaw = _ref19.determinePartUploadUri, options = (0, _objectWithoutProperties2.default)(_ref19, _excluded);
          _context18.next = 3;
          return _class._openUpload(destinationPath, params, options);
        case 3:
          firstFileUploadPart = _context18.sent;
          if (firstFileUploadPart) {
            _context18.next = 6;
            break;
          }
          return _context18.abrupt("return", null);
        case 6:
          determinePartUploadUri = determinePartUploadUriRaw || function (fileUploadPart) {
            return fileUploadPart.upload_uri;
          };
          _context18.prev = 7;
          _context18.next = 10;
          return new Promise(function (resolve, reject) {
            var part = 0;
            var chunks = [];
            var length = 0;
            var concurrentUploads = [];
            var chunkBuffer = null;
            var streamEnded = false;
            var handleStreamEnd = /*#__PURE__*/function () {
              var _ref20 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
                var _options$getAgentForU, buffer, nextFileUploadPart, uploadUri, agent, response, createdFile;
                return _regenerator.default.wrap(function _callee16$(_context16) {
                  while (1) switch (_context16.prev = _context16.next) {
                    case 0:
                      if (!(chunkBuffer !== null || !streamEnded)) {
                        _context16.next = 2;
                        break;
                      }
                      return _context16.abrupt("return");
                    case 2:
                      _context16.prev = 2;
                      if (!(chunks.length > 0)) {
                        _context16.next = 11;
                        break;
                      }
                      buffer = _safeBuffer.Buffer.concat(chunks);
                      _context16.next = 7;
                      return _class._continueUpload(destinationPath, ++part, firstFileUploadPart, options);
                    case 7:
                      nextFileUploadPart = _context16.sent;
                      uploadUri = determinePartUploadUri(nextFileUploadPart); // instantiate an httpsAgent dynamically if needed
                      agent = ((_options$getAgentForU = options.getAgentForUrl) === null || _options$getAgentForU === void 0 ? void 0 : _options$getAgentForU.call(options, uploadUri)) || (options === null || options === void 0 ? void 0 : options.agent);
                      concurrentUploads.push(_Api.default.sendFilePart(uploadUri, 'PUT', buffer, {
                        agent: agent
                      }));
                    case 11:
                      _context16.next = 13;
                      return Promise.all(concurrentUploads);
                    case 13:
                      _context16.next = 15;
                      return _class._completeUpload(firstFileUploadPart, options);
                    case 15:
                      response = _context16.sent;
                      createdFile = new _class(response.data, options);
                      resolve(createdFile);
                      _context16.next = 23;
                      break;
                    case 20:
                      _context16.prev = 20;
                      _context16.t0 = _context16["catch"](2);
                      reject(_context16.t0);
                    case 23:
                    case "end":
                      return _context16.stop();
                  }
                }, _callee16, null, [[2, 20]]);
              }));
              return function handleStreamEnd() {
                return _ref20.apply(this, arguments);
              };
            }();
            readableStream.on('error', function (error) {
              reject(error);
            });

            // note that for a network stream, each chunk is typically less than partsize * 2, but
            // if a stream has been created based on very large data, it's possible for a chunk to
            // contain the entire file and we could get a single chunk with length >= partsize * 3
            readableStream.on('data', /*#__PURE__*/function () {
              var _ref21 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(chunk) {
                var excessLength, _options$getAgentForU2, lengthForEndOfCurrentPart, lastChunkForCurrentPart, chunkBufferAfterCurrentPart, buffer, nextFileUploadPart, uploadUri, agent, uploadPromise, isNextChunkAtLeastOnePart;
                return _regenerator.default.wrap(function _callee17$(_context17) {
                  while (1) switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.prev = 0;
                      excessLength = length + chunk.length - firstFileUploadPart.partsize;
                      chunkBuffer = _safeBuffer.Buffer.from(chunk);
                      if (!(excessLength > 0)) {
                        _context17.next = 30;
                        break;
                      }
                      readableStream.pause();
                    case 5:
                      if (!chunkBuffer) {
                        _context17.next = 27;
                        break;
                      }
                      // the amount to append this last part with to make it exactly the full partsize
                      lengthForEndOfCurrentPart = chunkBuffer.length - excessLength;
                      lastChunkForCurrentPart = chunkBuffer.subarray(0, lengthForEndOfCurrentPart);
                      chunkBufferAfterCurrentPart = chunkBuffer.subarray(lengthForEndOfCurrentPart);
                      chunks.push(lastChunkForCurrentPart);
                      buffer = _safeBuffer.Buffer.concat(chunks);
                      /* eslint-disable-next-line no-await-in-loop */
                      _context17.next = 13;
                      return _class._continueUpload(destinationPath, ++part, firstFileUploadPart, options);
                    case 13:
                      nextFileUploadPart = _context17.sent;
                      uploadUri = determinePartUploadUri(nextFileUploadPart); // instantiate an httpsAgent dynamically if needed
                      agent = ((_options$getAgentForU2 = options.getAgentForUrl) === null || _options$getAgentForU2 === void 0 ? void 0 : _options$getAgentForU2.call(options, uploadUri)) || (options === null || options === void 0 ? void 0 : options.agent);
                      uploadPromise = _Api.default.sendFilePart(uploadUri, 'PUT', buffer, {
                        agent: agent
                      });
                      if (!firstFileUploadPart.parallel_parts) {
                        _context17.next = 21;
                        break;
                      }
                      concurrentUploads.push(uploadPromise);
                      _context17.next = 23;
                      break;
                    case 21:
                      _context17.next = 23;
                      return uploadPromise;
                    case 23:
                      // determine if the remainder of the excess chunk data is too large to be a single part
                      isNextChunkAtLeastOnePart = chunkBufferAfterCurrentPart.length >= firstFileUploadPart.partsize; // the excess data contains >= 1 full part, so we'll loop again to enqueue
                      // the next part for upload and continue processing any excess beyond that
                      if (isNextChunkAtLeastOnePart) {
                        chunks = [];
                        length = 0;
                        chunkBuffer = chunkBufferAfterCurrentPart;
                        excessLength = chunkBuffer.length - firstFileUploadPart.partsize;
                        // the excess data is less than a full part, so we'll enqueue it
                      } else if (chunkBufferAfterCurrentPart.length > 0) {
                        chunks = [chunkBufferAfterCurrentPart];
                        length = chunkBufferAfterCurrentPart.length;
                        chunkBuffer = null;
                      } else {
                        chunkBuffer = null;
                      }
                      _context17.next = 5;
                      break;
                    case 27:
                      readableStream.resume();
                      _context17.next = 33;
                      break;
                    case 30:
                      chunks.push(chunkBuffer);
                      length += chunk.length;
                      chunkBuffer = null;
                    case 33:
                      if (streamEnded) {
                        handleStreamEnd();
                      }
                      _context17.next = 39;
                      break;
                    case 36:
                      _context17.prev = 36;
                      _context17.t0 = _context17["catch"](0);
                      reject(_context17.t0);
                    case 39:
                    case "end":
                      return _context17.stop();
                  }
                }, _callee17, null, [[0, 36]]);
              }));
              return function (_x20) {
                return _ref21.apply(this, arguments);
              };
            }());

            // note that this event may occur while there is still data being processed above
            readableStream.on('end', function () {
              streamEnded = true;
              handleStreamEnd();
            });
          });
        case 10:
          file = _context18.sent;
          return _context18.abrupt("return", file);
        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](7);
          errors.handleErrorResponse(_context18.t0);
          return _context18.abrupt("return", null);
        case 18:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[7, 14]]);
  }));
  return function (_x16, _x17, _x18, _x19) {
    return _ref18.apply(this, arguments);
  };
}());
/**
 * data - string, Buffer, Stream, any object implementing Symbol.iterator or Symbol.asyncIterator
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadData", /*#__PURE__*/function () {
  var _ref22 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(destinationPath, data, params, options) {
    return _regenerator.default.wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          if (data) {
            _context19.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Upload data was not provided');
        case 2:
          return _context19.abrupt("return", _class.uploadStream(destinationPath, _readableStream.default.from(data), params, options));
        case 3:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function (_x21, _x22, _x23, _x24) {
    return _ref22.apply(this, arguments);
  };
}());
/**
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadFile", /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(destinationPath, sourceFilePath, params, options) {
    var _require4, openDiskFileReadStream, stream;
    return _regenerator.default.wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          if (!(0, _utils.isBrowser)()) {
            _context20.next = 2;
            break;
          }
          throw new errors.NotImplementedError('Disk file uploads are only available in a NodeJS environment');
        case 2:
          _require4 = require('../isomorphic/File.node.js'), openDiskFileReadStream = _require4.openDiskFileReadStream;
          stream = openDiskFileReadStream(sourceFilePath);
          return _context20.abrupt("return", _class.uploadStream(destinationPath, stream, params, options));
        case 5:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function (_x25, _x26, _x27, _x28) {
    return _ref23.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path to operate on.
//   action - string - The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
//   etags[etag] (required) - array(string) - etag identifier.
//   etags[part] (required) - array(int64) - Part number.
//   length - int64 - Length of file.
//   mkdir_parents - boolean - Create parent directories if they do not exist?
//   part - int64 - Part if uploading a part.
//   parts - int64 - How many parts to fetch?
//   provided_mtime - string - User provided modification time.
//   ref - string -
//   restart - int64 - File byte offset to restart from.
//   size - int64 - Size of file.
//   structure - string - If copying folder, copy just the structure?
//   with_rename - boolean - Allow file rename instead of overwrite?
(0, _defineProperty2.default)(File, "create", /*#__PURE__*/function () {
  var _ref24 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21(path) {
    var params,
      options,
      response,
      _args21 = arguments;
    return _regenerator.default.wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          params = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : {};
          options = _args21.length > 2 && _args21[2] !== undefined ? _args21[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context21.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params.path = path;
          if (params.path) {
            _context21.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context21.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 9:
          if (!(params.action && !(0, _utils.isString)(params.action))) {
            _context21.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 11:
          if (!(params.length && !(0, _utils.isInt)(params.length))) {
            _context21.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: length must be of type Int, received ".concat((0, _utils.getType)(params.length)));
        case 13:
          if (!(params.part && !(0, _utils.isInt)(params.part))) {
            _context21.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(params.part)));
        case 15:
          if (!(params.parts && !(0, _utils.isInt)(params.parts))) {
            _context21.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(params.parts)));
        case 17:
          if (!(params.provided_mtime && !(0, _utils.isString)(params.provided_mtime))) {
            _context21.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 19:
          if (!(params.ref && !(0, _utils.isString)(params.ref))) {
            _context21.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(params.ref)));
        case 21:
          if (!(params.restart && !(0, _utils.isInt)(params.restart))) {
            _context21.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(params.restart)));
        case 23:
          if (!(params.size && !(0, _utils.isInt)(params.size))) {
            _context21.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(params.size)));
        case 25:
          if (!(params.structure && !(0, _utils.isString)(params.structure))) {
            _context21.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: structure must be of type String, received ".concat((0, _utils.getType)(params.structure)));
        case 27:
          _context21.next = 29;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 29:
          response = _context21.sent;
          return _context21.abrupt("return", new _class(response === null || response === void 0 ? void 0 : response.data, options));
        case 31:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function (_x29) {
    return _ref24.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path to operate on.
//   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
//   with_previews - boolean - Include file preview information?
//   with_priority_color - boolean - Include file priority color information?
(0, _defineProperty2.default)(File, "find", /*#__PURE__*/function () {
  var _ref25 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee22(path) {
    var params,
      options,
      response,
      _args22 = arguments;
    return _regenerator.default.wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          params = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : {};
          options = _args22.length > 2 && _args22[2] !== undefined ? _args22[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context22.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params.path = path;
          if (params.path) {
            _context22.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context22.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 9:
          if (!(params.preview_size && !(0, _utils.isString)(params.preview_size))) {
            _context22.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 11:
          _context22.next = 13;
          return _Api.default.sendRequest("/file_actions/metadata/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 13:
          response = _context22.sent;
          return _context22.abrupt("return", new _class(response === null || response === void 0 ? void 0 : response.data, options));
        case 15:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function (_x30) {
    return _ref25.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "get", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _class.find(path, params, options);
});
var _default = exports.default = File;
module.exports = File;
module.exports.default = File;