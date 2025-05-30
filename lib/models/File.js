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
var _File;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
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
    var _ref = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(writableStream) {
      var downloadUri, _require, saveUrlToStream;
      return _regenerator.default.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context.next = 1;
              break;
            }
            throw new errors.NotImplementedError('Stream downloads are only available in a NodeJS environment');
          case 1:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context.next = 2;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 2:
            _require = require('../isomorphic/File.node.js'), saveUrlToStream = _require.saveUrlToStream;
            return _context.abrupt("return", saveUrlToStream(downloadUri, writableStream));
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "downloadToString", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var downloadUri, _require2, saveUrlToString;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(0, _utils.isBrowser)()) {
            _context2.next = 1;
            break;
          }
          throw new errors.NotImplementedError('String downloads are only available in a NodeJS environment');
        case 1:
          downloadUri = _this.getDownloadUri();
          if (downloadUri) {
            _context2.next = 2;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no download URI');
        case 2:
          _require2 = require('../isomorphic/File.node.js'), saveUrlToString = _require2.saveUrlToString;
          return _context2.abrupt("return", saveUrlToString(downloadUri));
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "downloadToFile", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(destinationPath) {
      var downloadUri, _require3, saveUrlToFile;
      return _regenerator.default.wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(0, _utils.isBrowser)()) {
              _context3.next = 1;
              break;
            }
            throw new errors.NotImplementedError('Disk file downloads are only available in a NodeJS environment');
          case 1:
            downloadUri = _this.getDownloadUri();
            if (downloadUri) {
              _context3.next = 2;
              break;
            }
            throw new errors.EmptyPropertyError('Current object has no download URI');
          case 2:
            _require3 = require('../isomorphic/File.node.js'), saveUrlToFile = _require3.saveUrlToFile;
            return _context3.abrupt("return", saveUrlToFile(downloadUri, destinationPath));
          case 3:
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
    var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(destinationFilePath, options) {
      var params;
      return _regenerator.default.wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            params = {
              destination: destinationFilePath
            };
            return _context4.abrupt("return", _Api.default.sendRequest("/file_actions/copy/".concat(encodeURIComponent(_this.path)), 'POST', params, options));
          case 1:
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
    var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(destinationFilePath, options) {
      var params;
      return _regenerator.default.wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            params = {
              destination: destinationFilePath
            };
            return _context5.abrupt("return", _Api.default.sendRequest("/file_actions/move/".concat(encodeURIComponent(_this.path)), 'POST', params, options));
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x5, _x6) {
      return _ref5.apply(this, arguments);
    };
  }());
  // string # File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // int64 # User ID of the User who created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedById", function () {
    return _this.attributes.created_by_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedById", function (value) {
    _this.attributes.created_by_id = value;
  });
  // int64 # ID of the API key that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByApiKeyId", function () {
    return _this.attributes.created_by_api_key_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByApiKeyId", function (value) {
    _this.attributes.created_by_api_key_id = value;
  });
  // int64 # ID of the AS2 Incoming Message that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByAs2IncomingMessageId", function () {
    return _this.attributes.created_by_as2_incoming_message_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByAs2IncomingMessageId", function (value) {
    _this.attributes.created_by_as2_incoming_message_id = value;
  });
  // int64 # ID of the Automation that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByAutomationId", function () {
    return _this.attributes.created_by_automation_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByAutomationId", function (value) {
    _this.attributes.created_by_automation_id = value;
  });
  // int64 # ID of the Bundle Registration that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByBundleRegistrationId", function () {
    return _this.attributes.created_by_bundle_registration_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByBundleRegistrationId", function (value) {
    _this.attributes.created_by_bundle_registration_id = value;
  });
  // int64 # ID of the Inbox that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByInboxId", function () {
    return _this.attributes.created_by_inbox_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByInboxId", function (value) {
    _this.attributes.created_by_inbox_id = value;
  });
  // int64 # ID of the Remote Server that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByRemoteServerId", function () {
    return _this.attributes.created_by_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByRemoteServerId", function (value) {
    _this.attributes.created_by_remote_server_id = value;
  });
  // int64 # ID of the Remote Server Sync that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByRemoteServerSyncId", function () {
    return _this.attributes.created_by_remote_server_sync_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByRemoteServerSyncId", function (value) {
    _this.attributes.created_by_remote_server_sync_id = value;
  });
  // object # Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  (0, _defineProperty2.default)(this, "getCustomMetadata", function () {
    return _this.attributes.custom_metadata;
  });
  (0, _defineProperty2.default)(this, "setCustomMetadata", function (value) {
    _this.attributes.custom_metadata = value;
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
  // int64 # User ID of the User who last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedById", function () {
    return _this.attributes.last_modified_by_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedById", function (value) {
    _this.attributes.last_modified_by_id = value;
  });
  // int64 # ID of the API key that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByApiKeyId", function () {
    return _this.attributes.last_modified_by_api_key_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByApiKeyId", function (value) {
    _this.attributes.last_modified_by_api_key_id = value;
  });
  // int64 # ID of the Automation that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByAutomationId", function () {
    return _this.attributes.last_modified_by_automation_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByAutomationId", function (value) {
    _this.attributes.last_modified_by_automation_id = value;
  });
  // int64 # ID of the Bundle Registration that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByBundleRegistrationId", function () {
    return _this.attributes.last_modified_by_bundle_registration_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByBundleRegistrationId", function (value) {
    _this.attributes.last_modified_by_bundle_registration_id = value;
  });
  // int64 # ID of the Remote Server that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByRemoteServerId", function () {
    return _this.attributes.last_modified_by_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByRemoteServerId", function (value) {
    _this.attributes.last_modified_by_remote_server_id = value;
  });
  // int64 # ID of the Remote Server Sync that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByRemoteServerSyncId", function () {
    return _this.attributes.last_modified_by_remote_server_sync_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByRemoteServerSyncId", function (value) {
    _this.attributes.last_modified_by_remote_server_sync_id = value;
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
  // string # File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getSha1", function () {
    return _this.attributes.sha1;
  });
  (0, _defineProperty2.default)(this, "setSha1", function (value) {
    _this.attributes.sha1 = value;
  });
  // string # File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getSha256", function () {
    return _this.attributes.sha256;
  });
  (0, _defineProperty2.default)(this, "setSha256", function (value) {
    _this.attributes.sha256 = value;
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
  // Download File
  //
  // Parameters:
  //   action - string - Can be blank, `redirect` or `stat`.  If set to `stat`, we will return file information but without a download URL, and without logging a download.  If set to `redirect` we will serve a 302 redirect directly to the file.  This is used for integrations with Zapier, and is not recommended for most integrations.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  (0, _defineProperty2.default)(this, "download", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
    var params,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
          if (_this.attributes.path) {
            _context6.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context6.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.action && !(0, _utils.isString)(params.action))) {
            _context6.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 4:
          if (!(params.preview_size && !(0, _utils.isString)(params.preview_size))) {
            _context6.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 5:
          if (params.path) {
            _context6.next = 7;
            break;
          }
          if (!_this.attributes.path) {
            _context6.next = 6;
            break;
          }
          params.path = _this.path;
          _context6.next = 7;
          break;
        case 6:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          _context6.next = 8;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'GET', params, _this.options);
        case 8:
          response = _context6.sent;
          return _context6.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  // Parameters:
  //   custom_metadata - object - Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  //   provided_mtime - string - Modified time of file.
  //   priority_color - string - Priority/Bookmark color of file.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
    var params,
      response,
      _args7 = arguments;
    return _regenerator.default.wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
          if (_this.attributes.path) {
            _context7.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context7.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context7.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.provided_mtime && !(0, _utils.isString)(params.provided_mtime))) {
            _context7.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 4:
          if (!(params.priority_color && !(0, _utils.isString)(params.priority_color))) {
            _context7.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: priority_color must be of type String, received ".concat((0, _utils.getType)(params.priority_color)));
        case 5:
          if (params.path) {
            _context7.next = 7;
            break;
          }
          if (!_this.attributes.path) {
            _context7.next = 6;
            break;
          }
          params.path = _this.path;
          _context7.next = 7;
          break;
        case 6:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          _context7.next = 8;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'PATCH', params, _this.options);
        case 8:
          response = _context7.sent;
          return _context7.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 9:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  // Parameters:
  //   recursive - boolean - If true, will recursively delete folders.  Otherwise, will error on non-empty folders.
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8() {
    var params,
      _args8 = arguments;
    return _regenerator.default.wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
          if (_this.attributes.path) {
            _context8.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context8.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context8.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (params.path) {
            _context8.next = 5;
            break;
          }
          if (!_this.attributes.path) {
            _context8.next = 4;
            break;
          }
          params.path = _this.path;
          _context8.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 5:
          _context8.next = 6;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  // Copy File/Folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   structure - boolean - Copy structure only?
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  (0, _defineProperty2.default)(this, "copy", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9() {
    var params,
      response,
      FileAction,
      _args9 = arguments;
    return _regenerator.default.wrap(function (_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          params = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
          if (_this.attributes.path) {
            _context9.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context9.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context9.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination && !(0, _utils.isString)(params.destination))) {
            _context9.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (params.path) {
            _context9.next = 6;
            break;
          }
          if (!_this.attributes.path) {
            _context9.next = 5;
            break;
          }
          params.path = _this.path;
          _context9.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 6:
          if (params.destination) {
            _context9.next = 8;
            break;
          }
          if (!_this.attributes.destination) {
            _context9.next = 7;
            break;
          }
          params.destination = _this.destination;
          _context9.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 8:
          _context9.next = 9;
          return _Api.default.sendRequest("/file_actions/copy/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 9:
          response = _context9.sent;
          FileAction = require('./FileAction.js').default;
          return _context9.abrupt("return", new FileAction(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  // Move File/Folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  (0, _defineProperty2.default)(this, "move", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee0() {
    var params,
      response,
      FileAction,
      _args0 = arguments;
    return _regenerator.default.wrap(function (_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          params = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : {};
          if (_this.attributes.path) {
            _context0.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context0.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context0.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.destination && !(0, _utils.isString)(params.destination))) {
            _context0.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params.destination)));
        case 4:
          if (params.path) {
            _context0.next = 6;
            break;
          }
          if (!_this.attributes.path) {
            _context0.next = 5;
            break;
          }
          params.path = _this.path;
          _context0.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 6:
          if (params.destination) {
            _context0.next = 8;
            break;
          }
          if (!_this.attributes.destination) {
            _context0.next = 7;
            break;
          }
          params.destination = _this.destination;
          _context0.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: destination');
        case 8:
          _context0.next = 9;
          return _Api.default.sendRequest("/file_actions/move/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 9:
          response = _context0.sent;
          FileAction = require('./FileAction.js').default;
          return _context0.abrupt("return", new FileAction(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 10:
        case "end":
          return _context0.stop();
      }
    }, _callee0);
  })));
  // Begin File Upload
  //
  // Parameters:
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Total bytes of file being uploaded (include bytes being retained if appending/restarting).
  //   with_rename - boolean - Allow file rename instead of overwrite?
  (0, _defineProperty2.default)(this, "beginUpload", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee1() {
    var _response$data;
    var params,
      response,
      FileUploadPart,
      _args1 = arguments;
    return _regenerator.default.wrap(function (_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          params = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : {};
          if (_this.attributes.path) {
            _context1.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context1.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context1.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.part && !(0, _utils.isInt)(params.part))) {
            _context1.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(params.part)));
        case 4:
          if (!(params.parts && !(0, _utils.isInt)(params.parts))) {
            _context1.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(params.parts)));
        case 5:
          if (!(params.ref && !(0, _utils.isString)(params.ref))) {
            _context1.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(params.ref)));
        case 6:
          if (!(params.restart && !(0, _utils.isInt)(params.restart))) {
            _context1.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(params.restart)));
        case 7:
          if (!(params.size && !(0, _utils.isInt)(params.size))) {
            _context1.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(params.size)));
        case 8:
          if (params.path) {
            _context1.next = 10;
            break;
          }
          if (!_this.attributes.path) {
            _context1.next = 9;
            break;
          }
          params.path = _this.path;
          _context1.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 10:
          _context1.next = 11;
          return _Api.default.sendRequest("/file_actions/begin_upload/".concat(encodeURIComponent(params.path)), 'POST', params, _this.options);
        case 11:
          response = _context1.sent;
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context1.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new FileUploadPart(obj, _this.options);
          })) || []);
        case 12:
        case "end":
          return _context1.stop();
      }
    }, _callee1);
  })));
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee10() {
    var newObject;
    return _regenerator.default.wrap(function (_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 1;
          return File.create(_this.attributes.path, _this.attributes, _this.options);
        case 1:
          newObject = _context10.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context10.abrupt("return", true);
        case 2:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  Object.entries(attributes).forEach(function (_ref11) {
    var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
      key = _ref12[0],
      value = _ref12[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, _options);
});
_File = File;
(0, _defineProperty2.default)(File, "_openUpload", /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee11(path, paramsRaw, options) {
    var params, response, partData, FileUploadPart;
    return _regenerator.default.wrap(function (_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          params = _objectSpread(_objectSpread({}, paramsRaw), {}, {
            action: 'put'
          });
          _context11.next = 1;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'POST', params, options);
        case 1:
          response = _context11.sent;
          if (response) {
            _context11.next = 2;
            break;
          }
          return _context11.abrupt("return", null);
        case 2:
          partData = _objectSpread(_objectSpread({}, response.data), {}, {
            headers: response.headers,
            parameters: params
          });
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context11.abrupt("return", new FileUploadPart(partData));
        case 3:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x7, _x8, _x9) {
    return _ref13.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "_continueUpload", /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee12(path, partNumber, firstFileUploadPart, options) {
    var params, response, partData, FileUploadPart;
    return _regenerator.default.wrap(function (_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          params = {
            action: 'put',
            part: partNumber,
            ref: firstFileUploadPart.ref
          };
          _context12.next = 1;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(path)), 'POST', params, options);
        case 1:
          response = _context12.sent;
          if (response) {
            _context12.next = 2;
            break;
          }
          return _context12.abrupt("return", null);
        case 2:
          partData = _objectSpread(_objectSpread({}, response.data), {}, {
            headers: response.headers,
            parameters: params
          });
          FileUploadPart = require('./FileUploadPart.js').default;
          return _context12.abrupt("return", new FileUploadPart(partData));
        case 3:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x0, _x1, _x10, _x11) {
    return _ref14.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "_completeUpload", /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee13(firstFileUploadPart, options) {
    var params;
    return _regenerator.default.wrap(function (_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          params = {
            action: 'end',
            ref: firstFileUploadPart.ref
          };
          return _context13.abrupt("return", _Api.default.sendRequest("/files/".concat(encodeURIComponent(firstFileUploadPart.path)), 'POST', params, options));
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x12, _x13) {
    return _ref15.apply(this, arguments);
  };
}());
/**
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadStream", /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee16(destinationPath, readableStream, params, optionsRaw) {
    var _ref17, determinePartUploadUriRaw, options, firstFileUploadPart, determinePartUploadUri, file, _t3;
    return _regenerator.default.wrap(function (_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _ref17 = optionsRaw || {}, determinePartUploadUriRaw = _ref17.determinePartUploadUri, options = (0, _objectWithoutProperties2.default)(_ref17, _excluded);
          _context16.next = 1;
          return _File._openUpload(destinationPath, params, options);
        case 1:
          firstFileUploadPart = _context16.sent;
          if (firstFileUploadPart) {
            _context16.next = 2;
            break;
          }
          return _context16.abrupt("return", null);
        case 2:
          determinePartUploadUri = determinePartUploadUriRaw || function (fileUploadPart) {
            return fileUploadPart.upload_uri;
          };
          _context16.prev = 3;
          _context16.next = 4;
          return new Promise(function (resolve, reject) {
            var part = 0;
            var chunks = [];
            var length = 0;
            var concurrentUploads = [];
            var chunkBuffer = null;
            var streamEnded = false;
            var handleStreamEnd = /*#__PURE__*/function () {
              var _ref18 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee14() {
                var _options$getAgentForU, buffer, nextFileUploadPart, uploadUri, agent, response, createdFile, _t;
                return _regenerator.default.wrap(function (_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      if (!(chunkBuffer !== null || !streamEnded)) {
                        _context14.next = 1;
                        break;
                      }
                      return _context14.abrupt("return");
                    case 1:
                      _context14.prev = 1;
                      if (!(chunks.length > 0)) {
                        _context14.next = 3;
                        break;
                      }
                      buffer = _safeBuffer.Buffer.concat(chunks);
                      _context14.next = 2;
                      return _File._continueUpload(destinationPath, ++part, firstFileUploadPart, options);
                    case 2:
                      nextFileUploadPart = _context14.sent;
                      uploadUri = determinePartUploadUri(nextFileUploadPart); // instantiate an httpsAgent dynamically if needed
                      agent = ((_options$getAgentForU = options.getAgentForUrl) === null || _options$getAgentForU === void 0 ? void 0 : _options$getAgentForU.call(options, uploadUri)) || (options === null || options === void 0 ? void 0 : options.agent);
                      concurrentUploads.push(_Api.default.sendFilePart(uploadUri, 'PUT', buffer, {
                        agent: agent
                      }));
                    case 3:
                      _context14.next = 4;
                      return Promise.all(concurrentUploads);
                    case 4:
                      _context14.next = 5;
                      return _File._completeUpload(firstFileUploadPart, options);
                    case 5:
                      response = _context14.sent;
                      createdFile = new _File(response.data, options);
                      resolve(createdFile);
                      _context14.next = 7;
                      break;
                    case 6:
                      _context14.prev = 6;
                      _t = _context14["catch"](1);
                      reject(_t);
                    case 7:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee14, null, [[1, 6]]);
              }));
              return function handleStreamEnd() {
                return _ref18.apply(this, arguments);
              };
            }();
            readableStream.on('error', function (error) {
              reject(error);
            });

            // note that for a network stream, each chunk is typically less than partsize * 2, but
            // if a stream has been created based on very large data, it's possible for a chunk to
            // contain the entire file and we could get a single chunk with length >= partsize * 3
            readableStream.on('data', /*#__PURE__*/function () {
              var _ref19 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee15(chunk) {
                var excessLength, _options$getAgentForU2, lengthForEndOfCurrentPart, lastChunkForCurrentPart, chunkBufferAfterCurrentPart, buffer, nextFileUploadPart, uploadUri, agent, uploadPromise, isNextChunkAtLeastOnePart, _t2;
                return _regenerator.default.wrap(function (_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.prev = 0;
                      excessLength = length + chunk.length - firstFileUploadPart.partsize;
                      chunkBuffer = _safeBuffer.Buffer.from(chunk);
                      if (!(excessLength > 0)) {
                        _context15.next = 6;
                        break;
                      }
                      readableStream.pause();
                    case 1:
                      if (!chunkBuffer) {
                        _context15.next = 5;
                        break;
                      }
                      // the amount to append this last part with to make it exactly the full partsize
                      lengthForEndOfCurrentPart = chunkBuffer.length - excessLength;
                      lastChunkForCurrentPart = chunkBuffer.subarray(0, lengthForEndOfCurrentPart);
                      chunkBufferAfterCurrentPart = chunkBuffer.subarray(lengthForEndOfCurrentPart);
                      chunks.push(lastChunkForCurrentPart);
                      buffer = _safeBuffer.Buffer.concat(chunks);
                      /* eslint-disable-next-line no-await-in-loop */
                      _context15.next = 2;
                      return _File._continueUpload(destinationPath, ++part, firstFileUploadPart, options);
                    case 2:
                      nextFileUploadPart = _context15.sent;
                      uploadUri = determinePartUploadUri(nextFileUploadPart); // instantiate an httpsAgent dynamically if needed
                      agent = ((_options$getAgentForU2 = options.getAgentForUrl) === null || _options$getAgentForU2 === void 0 ? void 0 : _options$getAgentForU2.call(options, uploadUri)) || (options === null || options === void 0 ? void 0 : options.agent);
                      uploadPromise = _Api.default.sendFilePart(uploadUri, 'PUT', buffer, {
                        agent: agent
                      });
                      if (!firstFileUploadPart.parallel_parts) {
                        _context15.next = 3;
                        break;
                      }
                      concurrentUploads.push(uploadPromise);
                      _context15.next = 4;
                      break;
                    case 3:
                      _context15.next = 4;
                      return uploadPromise;
                    case 4:
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
                      _context15.next = 1;
                      break;
                    case 5:
                      readableStream.resume();
                      _context15.next = 7;
                      break;
                    case 6:
                      chunks.push(chunkBuffer);
                      length += chunk.length;
                      chunkBuffer = null;
                    case 7:
                      if (streamEnded) {
                        handleStreamEnd();
                      }
                      _context15.next = 9;
                      break;
                    case 8:
                      _context15.prev = 8;
                      _t2 = _context15["catch"](0);
                      reject(_t2);
                    case 9:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15, null, [[0, 8]]);
              }));
              return function (_x18) {
                return _ref19.apply(this, arguments);
              };
            }());

            // note that this event may occur while there is still data being processed above
            readableStream.on('end', function () {
              streamEnded = true;
              handleStreamEnd();
            });
          });
        case 4:
          file = _context16.sent;
          return _context16.abrupt("return", file);
        case 5:
          _context16.prev = 5;
          _t3 = _context16["catch"](3);
          errors.handleErrorResponse(_t3);
          return _context16.abrupt("return", null);
        case 6:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[3, 5]]);
  }));
  return function (_x14, _x15, _x16, _x17) {
    return _ref16.apply(this, arguments);
  };
}());
/**
 * data - string, Buffer, Stream, any object implementing Symbol.iterator or Symbol.asyncIterator
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadData", /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee17(destinationPath, data, params, options) {
    return _regenerator.default.wrap(function (_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          if (data) {
            _context17.next = 1;
            break;
          }
          throw new errors.MissingParameterError('Upload data was not provided');
        case 1:
          return _context17.abrupt("return", _File.uploadStream(destinationPath, _readableStream.default.from(data), params, options));
        case 2:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function (_x19, _x20, _x21, _x22) {
    return _ref20.apply(this, arguments);
  };
}());
/**
 * @note see File.copy() for list of supported params
 */
(0, _defineProperty2.default)(File, "uploadFile", /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee18(destinationPath, sourceFilePath, params, options) {
    var _require4, openDiskFileReadStream, stream;
    return _regenerator.default.wrap(function (_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          if (!(0, _utils.isBrowser)()) {
            _context18.next = 1;
            break;
          }
          throw new errors.NotImplementedError('Disk file uploads are only available in a NodeJS environment');
        case 1:
          _require4 = require('../isomorphic/File.node.js'), openDiskFileReadStream = _require4.openDiskFileReadStream;
          stream = openDiskFileReadStream(sourceFilePath);
          return _context18.abrupt("return", _File.uploadStream(destinationPath, stream, params, options));
        case 2:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function (_x23, _x24, _x25, _x26) {
    return _ref21.apply(this, arguments);
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
  var _ref22 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee19(path) {
    var params,
      options,
      response,
      _args19 = arguments;
    return _regenerator.default.wrap(function (_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          params = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : {};
          options = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context19.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context19.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context19.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.action && !(0, _utils.isString)(params.action))) {
            _context19.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 4:
          if (!(params.length && !(0, _utils.isInt)(params.length))) {
            _context19.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: length must be of type Int, received ".concat((0, _utils.getType)(params.length)));
        case 5:
          if (!(params.part && !(0, _utils.isInt)(params.part))) {
            _context19.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(params.part)));
        case 6:
          if (!(params.parts && !(0, _utils.isInt)(params.parts))) {
            _context19.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(params.parts)));
        case 7:
          if (!(params.provided_mtime && !(0, _utils.isString)(params.provided_mtime))) {
            _context19.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 8:
          if (!(params.ref && !(0, _utils.isString)(params.ref))) {
            _context19.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(params.ref)));
        case 9:
          if (!(params.restart && !(0, _utils.isInt)(params.restart))) {
            _context19.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(params.restart)));
        case 10:
          if (!(params.size && !(0, _utils.isInt)(params.size))) {
            _context19.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: size must be of type Int, received ".concat((0, _utils.getType)(params.size)));
        case 11:
          if (!(params.structure && !(0, _utils.isString)(params.structure))) {
            _context19.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: structure must be of type String, received ".concat((0, _utils.getType)(params.structure)));
        case 12:
          _context19.next = 13;
          return _Api.default.sendRequest("/files/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 13:
          response = _context19.sent;
          return _context19.abrupt("return", new _File(response === null || response === void 0 ? void 0 : response.data, options));
        case 14:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function (_x27) {
    return _ref22.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path to operate on.
//   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
//   with_previews - boolean - Include file preview information?
//   with_priority_color - boolean - Include file priority color information?
(0, _defineProperty2.default)(File, "find", /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee20(path) {
    var params,
      options,
      response,
      _args20 = arguments;
    return _regenerator.default.wrap(function (_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          params = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : {};
          options = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context20.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context20.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context20.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.preview_size && !(0, _utils.isString)(params.preview_size))) {
            _context20.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 4:
          _context20.next = 5;
          return _Api.default.sendRequest("/file_actions/metadata/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 5:
          response = _context20.sent;
          return _context20.abrupt("return", new _File(response === null || response === void 0 ? void 0 : response.data, options));
        case 6:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function (_x28) {
    return _ref23.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(File, "get", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _File.find(path, params, options);
});
var _default = exports.default = File;
module.exports = File;
module.exports.default = File;