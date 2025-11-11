"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * Class Folder
 */
var Folder = /*#__PURE__*/(0, _createClass2.default)(function Folder() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Folder);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
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
  // boolean # Create parent directories if they do not exist?
  (0, _defineProperty2.default)(this, "getMkdirParents", function () {
    return _this.attributes.mkdir_parents;
  });
  (0, _defineProperty2.default)(this, "setMkdirParents", function (value) {
    _this.attributes.mkdir_parents = value;
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return Folder.create(_this.attributes.path, _this.attributes, _this.options);
        case 1:
          newObject = _context.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context.abrupt("return", true);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  Object.entries(attributes).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
// Parameters:
//   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   path (required) - string - Path to operate on.
//   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
//   sort_by - object - Search by field and direction. Valid fields are `path`, `size`, `modified_at_datetime`, `provided_modified_at`.  Valid directions are `asc` and `desc`.  Defaults to `{"path":"asc"}`.
//   search - string - If specified, will search the folders/files list by name. Ignores text before last `/`. This is the same API used by the search bar in the web UI when running 'Search This Folder'.  Search results are a best effort, not real time, and not guaranteed to perfectly match the latest folder listing.  Results may be truncated if more than 1,000 possible matches exist.  This field should only be used for ad-hoc (human) searching, and not as part of an automated process.
//   search_custom_metadata_key - string - If provided, the search string in `search` will search for files where this custom metadata key matches the value sent in `search`.  Set this to `*` to allow any metadata key to match the value sent in `search`.
//   search_all - boolean - Search entire site?  If true, we will search the entire site.  Do not provide a path when using this parameter.  This is the same API used by the search bar in the web UI when running 'Search All Files'.  Search results are a best effort, not real time, and not guaranteed to match every file.  This field should only be used for ad-hoc (human) searching, and not as part of an automated process.
//   with_previews - boolean - Include file previews?
//   with_priority_color - boolean - Include file priority color information?
//   type - string - Type of objects to return.  Can be `folder` or `file`.
//   modified_at_datetime - string - If provided, will only return files/folders modified after this time. Can be used only in combination with `type` filter.
(0, _defineProperty2.default)(Folder, "listFor", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(path) {
    var _response$data;
    var params,
      options,
      response,
      File,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context2.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context2.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 3:
          if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 4:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 5:
          if (!(params.preview_size && !(0, _utils.isString)(params.preview_size))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 6:
          if (!(params.search && !(0, _utils.isString)(params.search))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: search must be of type String, received ".concat((0, _utils.getType)(params.search)));
        case 7:
          if (!(params.search_custom_metadata_key && !(0, _utils.isString)(params.search_custom_metadata_key))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: search_custom_metadata_key must be of type String, received ".concat((0, _utils.getType)(params.search_custom_metadata_key)));
        case 8:
          if (!(params.type && !(0, _utils.isString)(params.type))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: type must be of type String, received ".concat((0, _utils.getType)(params.type)));
        case 9:
          if (!(params.modified_at_datetime && !(0, _utils.isString)(params.modified_at_datetime))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: modified_at_datetime must be of type String, received ".concat((0, _utils.getType)(params.modified_at_datetime)));
        case 10:
          _context2.next = 11;
          return _Api.default.sendRequest("/folders/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 11:
          response = _context2.sent;
          File = require('./File.js').default;
          return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new File(obj, options);
          })) || []);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path to operate on.
//   mkdir_parents - boolean - Create parent directories if they do not exist?
//   provided_mtime - string - User provided modification time.
(0, _defineProperty2.default)(Folder, "create", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(path) {
    var params,
      options,
      response,
      File,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context3.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.provided_mtime && !(0, _utils.isString)(params.provided_mtime))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 4:
          _context3.next = 5;
          return _Api.default.sendRequest("/folders/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 5:
          response = _context3.sent;
          File = require('./File.js').default;
          return _context3.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, options));
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x2) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = exports.default = Folder;
module.exports = Folder;
module.exports.default = Folder;