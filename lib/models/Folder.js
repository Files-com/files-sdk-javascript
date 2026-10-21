"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _Folder;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

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
    exposeAttributes(_this, ['path']);
  });
  // int64 # User ID of the User who created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedById", function () {
    return _this.attributes.created_by_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedById", function (value) {
    _this.attributes.created_by_id = value;
    exposeAttributes(_this, ['created_by_id']);
  });
  // int64 # ID of the API key that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByApiKeyId", function () {
    return _this.attributes.created_by_api_key_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByApiKeyId", function (value) {
    _this.attributes.created_by_api_key_id = value;
    exposeAttributes(_this, ['created_by_api_key_id']);
  });
  // int64 # ID of the AS2 Incoming Message that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByAs2IncomingMessageId", function () {
    return _this.attributes.created_by_as2_incoming_message_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByAs2IncomingMessageId", function (value) {
    _this.attributes.created_by_as2_incoming_message_id = value;
    exposeAttributes(_this, ['created_by_as2_incoming_message_id']);
  });
  // int64 # ID of the Automation that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByAutomationId", function () {
    return _this.attributes.created_by_automation_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByAutomationId", function (value) {
    _this.attributes.created_by_automation_id = value;
    exposeAttributes(_this, ['created_by_automation_id']);
  });
  // int64 # ID of the Bundle Registration that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByBundleRegistrationId", function () {
    return _this.attributes.created_by_bundle_registration_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByBundleRegistrationId", function (value) {
    _this.attributes.created_by_bundle_registration_id = value;
    exposeAttributes(_this, ['created_by_bundle_registration_id']);
  });
  // int64 # ID of the Inbox that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByInboxId", function () {
    return _this.attributes.created_by_inbox_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByInboxId", function (value) {
    _this.attributes.created_by_inbox_id = value;
    exposeAttributes(_this, ['created_by_inbox_id']);
  });
  // int64 # ID of the Remote Server that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedByRemoteServerId", function () {
    return _this.attributes.created_by_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedByRemoteServerId", function (value) {
    _this.attributes.created_by_remote_server_id = value;
    exposeAttributes(_this, ['created_by_remote_server_id']);
  });
  // int64 # ID of the Sync that created the file/folder
  (0, _defineProperty2.default)(this, "getCreatedBySyncId", function () {
    return _this.attributes.created_by_sync_id;
  });
  (0, _defineProperty2.default)(this, "setCreatedBySyncId", function (value) {
    _this.attributes.created_by_sync_id = value;
    exposeAttributes(_this, ['created_by_sync_id']);
  });
  // object # Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  (0, _defineProperty2.default)(this, "getCustomMetadata", function () {
    return _this.attributes.custom_metadata;
  });
  (0, _defineProperty2.default)(this, "setCustomMetadata", function (value) {
    _this.attributes.custom_metadata = value;
    exposeAttributes(_this, ['custom_metadata']);
  });
  // string # File/Folder display name
  (0, _defineProperty2.default)(this, "getDisplayName", function () {
    return _this.attributes.display_name;
  });
  (0, _defineProperty2.default)(this, "setDisplayName", function (value) {
    _this.attributes.display_name = value;
    exposeAttributes(_this, ['display_name']);
  });
  // string # Type: `directory` or `file`.
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
    exposeAttributes(_this, ['type']);
  });
  // int64 # File/Folder size
  (0, _defineProperty2.default)(this, "getSize", function () {
    return _this.attributes.size;
  });
  (0, _defineProperty2.default)(this, "setSize", function (value) {
    _this.attributes.size = value;
    exposeAttributes(_this, ['size']);
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
    exposeAttributes(_this, ['last_modified_by_id']);
  });
  // int64 # ID of the API key that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByApiKeyId", function () {
    return _this.attributes.last_modified_by_api_key_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByApiKeyId", function (value) {
    _this.attributes.last_modified_by_api_key_id = value;
    exposeAttributes(_this, ['last_modified_by_api_key_id']);
  });
  // int64 # ID of the Automation that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByAutomationId", function () {
    return _this.attributes.last_modified_by_automation_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByAutomationId", function (value) {
    _this.attributes.last_modified_by_automation_id = value;
    exposeAttributes(_this, ['last_modified_by_automation_id']);
  });
  // int64 # ID of the Bundle Registration that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByBundleRegistrationId", function () {
    return _this.attributes.last_modified_by_bundle_registration_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByBundleRegistrationId", function (value) {
    _this.attributes.last_modified_by_bundle_registration_id = value;
    exposeAttributes(_this, ['last_modified_by_bundle_registration_id']);
  });
  // int64 # ID of the Remote Server that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedByRemoteServerId", function () {
    return _this.attributes.last_modified_by_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedByRemoteServerId", function (value) {
    _this.attributes.last_modified_by_remote_server_id = value;
    exposeAttributes(_this, ['last_modified_by_remote_server_id']);
  });
  // int64 # ID of the Sync that last modified the file/folder
  (0, _defineProperty2.default)(this, "getLastModifiedBySyncId", function () {
    return _this.attributes.last_modified_by_sync_id;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedBySyncId", function (value) {
    _this.attributes.last_modified_by_sync_id = value;
    exposeAttributes(_this, ['last_modified_by_sync_id']);
  });
  // date-time # File last modified date/time, according to the server.  This is the timestamp of the last Files.com operation of the file, regardless of what modified timestamp was sent.
  (0, _defineProperty2.default)(this, "getMtime", function () {
    return _this.attributes.mtime;
  });
  (0, _defineProperty2.default)(this, "setMtime", function (value) {
    _this.attributes.mtime = value;
    exposeAttributes(_this, ['mtime']);
  });
  // date-time # File last modified date/time, according to the client who set it.  Files.com allows desktop, FTP, SFTP, and WebDAV clients to set modified at times.  This allows Desktop<->Cloud syncing to preserve modified at times.
  (0, _defineProperty2.default)(this, "getProvidedMtime", function () {
    return _this.attributes.provided_mtime;
  });
  (0, _defineProperty2.default)(this, "setProvidedMtime", function (value) {
    _this.attributes.provided_mtime = value;
    exposeAttributes(_this, ['provided_mtime']);
  });
  // string # File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getCrc32", function () {
    return _this.attributes.crc32;
  });
  (0, _defineProperty2.default)(this, "setCrc32", function (value) {
    _this.attributes.crc32 = value;
    exposeAttributes(_this, ['crc32']);
  });
  // string # File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getMd5", function () {
    return _this.attributes.md5;
  });
  (0, _defineProperty2.default)(this, "setMd5", function (value) {
    _this.attributes.md5 = value;
    exposeAttributes(_this, ['md5']);
  });
  // string # File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getSha1", function () {
    return _this.attributes.sha1;
  });
  (0, _defineProperty2.default)(this, "setSha1", function (value) {
    _this.attributes.sha1 = value;
    exposeAttributes(_this, ['sha1']);
  });
  // string # File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  (0, _defineProperty2.default)(this, "getSha256", function () {
    return _this.attributes.sha256;
  });
  (0, _defineProperty2.default)(this, "setSha256", function (value) {
    _this.attributes.sha256 = value;
    exposeAttributes(_this, ['sha256']);
  });
  // string # MIME Type.  This is determined by the filename extension and is not stored separately internally.
  (0, _defineProperty2.default)(this, "getMimeType", function () {
    return _this.attributes.mime_type;
  });
  (0, _defineProperty2.default)(this, "setMimeType", function (value) {
    _this.attributes.mime_type = value;
    exposeAttributes(_this, ['mime_type']);
  });
  // string # Region location
  (0, _defineProperty2.default)(this, "getRegion", function () {
    return _this.attributes.region;
  });
  (0, _defineProperty2.default)(this, "setRegion", function (value) {
    _this.attributes.region = value;
    exposeAttributes(_this, ['region']);
  });
  // string # A short string representing the current user's permissions.  Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List) or any combination
  (0, _defineProperty2.default)(this, "getPermissions", function () {
    return _this.attributes.permissions;
  });
  (0, _defineProperty2.default)(this, "setPermissions", function (value) {
    _this.attributes.permissions = value;
    exposeAttributes(_this, ['permissions']);
  });
  // boolean # Are subfolders locked and unable to be modified?
  (0, _defineProperty2.default)(this, "getSubfoldersLocked", function () {
    return _this.attributes.subfolders_locked;
  });
  (0, _defineProperty2.default)(this, "setSubfoldersLocked", function (value) {
    _this.attributes.subfolders_locked = value;
    exposeAttributes(_this, ['subfolders_locked']);
  });
  // boolean # Is this folder locked and unable to be modified?
  (0, _defineProperty2.default)(this, "getIsLocked", function () {
    return _this.attributes.is_locked;
  });
  (0, _defineProperty2.default)(this, "setIsLocked", function (value) {
    _this.attributes.is_locked = value;
    exposeAttributes(_this, ['is_locked']);
  });
  // string # Link to download file. Provided only in response to a download request.
  (0, _defineProperty2.default)(this, "getDownloadUri", function () {
    return _this.attributes.download_uri;
  });
  (0, _defineProperty2.default)(this, "setDownloadUri", function (value) {
    _this.attributes.download_uri = value;
    exposeAttributes(_this, ['download_uri']);
  });
  // DirectConnectionInfo # Optional direct connection information for direct Agent transfer attempts
  (0, _defineProperty2.default)(this, "getDirectConnectionInfo", function () {
    return _this.attributes.direct_connection_info;
  });
  (0, _defineProperty2.default)(this, "setDirectConnectionInfo", function (value) {
    _this.attributes.direct_connection_info = value;
    exposeAttributes(_this, ['direct_connection_info']);
  });
  // string # Bookmark/priority color of file/folder
  (0, _defineProperty2.default)(this, "getPriorityColor", function () {
    return _this.attributes.priority_color;
  });
  (0, _defineProperty2.default)(this, "setPriorityColor", function (value) {
    _this.attributes.priority_color = value;
    exposeAttributes(_this, ['priority_color']);
  });
  // int64 # File preview ID
  (0, _defineProperty2.default)(this, "getPreviewId", function () {
    return _this.attributes.preview_id;
  });
  (0, _defineProperty2.default)(this, "setPreviewId", function (value) {
    _this.attributes.preview_id = value;
    exposeAttributes(_this, ['preview_id']);
  });
  // Preview # File preview
  (0, _defineProperty2.default)(this, "getPreview", function () {
    return _this.attributes.preview;
  });
  (0, _defineProperty2.default)(this, "setPreview", function (value) {
    _this.attributes.preview = value;
    exposeAttributes(_this, ['preview']);
  });
  // boolean # Create parent directories if they do not exist?
  (0, _defineProperty2.default)(this, "getMkdirParents", function () {
    return _this.attributes.mkdir_parents;
  });
  (0, _defineProperty2.default)(this, "setMkdirParents", function (value) {
    _this.attributes.mkdir_parents = value;
    exposeAttributes(_this, ['mkdir_parents']);
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
          adoptAttributes(_this, newObject.attributes);
          return _context.abrupt("return", true);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Folder = Folder;
// Parameters:
//   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.path = path;
          if (params.path) {
            _context2.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 3:
          if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 4:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 5:
          if (!(params.preview_size !== undefined && params.preview_size !== null && !(0, _utils.isString)(params.preview_size))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: preview_size must be of type String, received ".concat((0, _utils.getType)(params.preview_size)));
        case 6:
          if (!(params.search !== undefined && params.search !== null && !(0, _utils.isString)(params.search))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: search must be of type String, received ".concat((0, _utils.getType)(params.search)));
        case 7:
          if (!(params.search_custom_metadata_key !== undefined && params.search_custom_metadata_key !== null && !(0, _utils.isString)(params.search_custom_metadata_key))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: search_custom_metadata_key must be of type String, received ".concat((0, _utils.getType)(params.search_custom_metadata_key)));
        case 8:
          if (!((0, _utils.isArray)(params.search_all) || (0, _utils.isObject)(params.search_all))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: search_all must be of type Boolean, received ".concat((0, _utils.getType)(params.search_all)));
        case 9:
          if (!((0, _utils.isArray)(params.with_previews) || (0, _utils.isObject)(params.with_previews))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_previews must be of type Boolean, received ".concat((0, _utils.getType)(params.with_previews)));
        case 10:
          if (!((0, _utils.isArray)(params.with_priority_color) || (0, _utils.isObject)(params.with_priority_color))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: with_priority_color must be of type Boolean, received ".concat((0, _utils.getType)(params.with_priority_color)));
        case 11:
          if (!(params.type !== undefined && params.type !== null && !(0, _utils.isString)(params.type))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: type must be of type String, received ".concat((0, _utils.getType)(params.type)));
        case 12:
          if (!(params.modified_at_datetime !== undefined && params.modified_at_datetime !== null && !(0, _utils.isString)(params.modified_at_datetime))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: modified_at_datetime must be of type String, received ".concat((0, _utils.getType)(params.modified_at_datetime)));
        case 13:
          _context2.next = 14;
          return _Api.default.sendRequest("/folders/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 14:
          response = _context2.sent;
          File = require('./File.js').default;
          return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new File(obj, retainedOptions(options));
          })) || []);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
// The items listFor() lists, one at a time: an async iterator that requests each page
// through listFor() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Folder, "listForIterator", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Folder.listFor(path, pageParams, pageOptions);
  });
});
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.path = path;
          if (params.path) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!((0, _utils.isArray)(params.mkdir_parents) || (0, _utils.isObject)(params.mkdir_parents))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: mkdir_parents must be of type Boolean, received ".concat((0, _utils.getType)(params.mkdir_parents)));
        case 4:
          if (!(params.provided_mtime !== undefined && params.provided_mtime !== null && !(0, _utils.isString)(params.provided_mtime))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: provided_mtime must be of type String, received ".concat((0, _utils.getType)(params.provided_mtime)));
        case 5:
          _context3.next = 6;
          return _Api.default.sendRequest("/folders/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 6:
          response = _context3.sent;
          File = require('./File.js').default;
          return _context3.abrupt("return", new File(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 7:
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