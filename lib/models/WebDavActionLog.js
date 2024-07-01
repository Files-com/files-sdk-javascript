"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _WebDavActionLog;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class WebDavActionLog
 */
var WebDavActionLog = /*#__PURE__*/(0, _createClass2.default)(function WebDavActionLog() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, WebDavActionLog);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // date-time # Start Time of Action
  (0, _defineProperty2.default)(this, "getTimestamp", function () {
    return _this.attributes.timestamp;
  });
  // string # IP Address of WebDAV Client
  (0, _defineProperty2.default)(this, "getRemoteIp", function () {
    return _this.attributes.remote_ip;
  });
  // string # IP Address of WebDAV Server
  (0, _defineProperty2.default)(this, "getServerIp", function () {
    return _this.attributes.server_ip;
  });
  // string # Username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  // string # Authentication Ciphers
  (0, _defineProperty2.default)(this, "getAuthCiphers", function () {
    return _this.attributes.auth_ciphers;
  });
  // string # Action Type
  (0, _defineProperty2.default)(this, "getActionType", function () {
    return _this.attributes.action_type;
  });
  // string # Path as sent by the Client (may not match Files.com path due to user root folders for WebDAV). This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  // string # Path on Files.com
  (0, _defineProperty2.default)(this, "getTruePath", function () {
    return _this.attributes.true_path;
  });
  // string # Name of File
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  // string # Method of the HTTP call.
  (0, _defineProperty2.default)(this, "getHttpMethod", function () {
    return _this.attributes.http_method;
  });
  // string # Path of the HTTP call.
  (0, _defineProperty2.default)(this, "getHttpPath", function () {
    return _this.attributes.http_path;
  });
  // int64 # HTTP Response Code returned to the WebDAV Client.
  (0, _defineProperty2.default)(this, "getHttpResponseCode", function () {
    return _this.attributes.http_response_code;
  });
  // int64 # Size of File That was Uploaded or Downloaded.
  (0, _defineProperty2.default)(this, "getSize", function () {
    return _this.attributes.size;
  });
  // int64 # Number of entries returned when listing files and folders
  (0, _defineProperty2.default)(this, "getEntriesReturned", function () {
    return _this.attributes.entries_returned;
  });
  // boolean # Whether WebDAV Action was successful.
  (0, _defineProperty2.default)(this, "getSuccess", function () {
    return _this.attributes.success;
  });
  // int64 # Duration (in milliseconds)
  (0, _defineProperty2.default)(this, "getDurationMs", function () {
    return _this.attributes.duration_ms;
  });
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_WebDavActionLog = WebDavActionLog;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   action - string
//   page - int64
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date`, `path`, `true_path`, `remote_ip`, `success`, `action_type` or `username`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ true_path ]`, `[ remote_ip ]`, `[ success ]`, `[ action_type ]`, `[ username ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, true_path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, action_type ]`, `[ start_date, username ]`, `[ end_date, path ]`, `[ end_date, true_path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, action_type ]`, `[ end_date, username ]`, `[ path, true_path ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, action_type ]`, `[ path, username ]`, `[ true_path, remote_ip ]`, `[ true_path, success ]`, `[ true_path, action_type ]`, `[ true_path, username ]`, `[ remote_ip, success ]`, `[ remote_ip, action_type ]`, `[ remote_ip, username ]`, `[ success, action_type ]`, `[ success, username ]`, `[ action_type, username ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, true_path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, action_type ]`, `[ start_date, end_date, username ]`, `[ start_date, path, true_path ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, action_type ]`, `[ start_date, path, username ]`, `[ start_date, true_path, remote_ip ]`, `[ start_date, true_path, success ]`, `[ start_date, true_path, action_type ]`, `[ start_date, true_path, username ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, action_type ]`, `[ start_date, remote_ip, username ]`, `[ start_date, success, action_type ]`, `[ start_date, success, username ]`, `[ start_date, action_type, username ]`, `[ end_date, path, true_path ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, action_type ]`, `[ end_date, path, username ]`, `[ end_date, true_path, remote_ip ]`, `[ end_date, true_path, success ]`, `[ end_date, true_path, action_type ]`, `[ end_date, true_path, username ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, action_type ]`, `[ end_date, remote_ip, username ]`, `[ end_date, success, action_type ]`, `[ end_date, success, username ]`, `[ end_date, action_type, username ]`, `[ path, true_path, remote_ip ]`, `[ path, true_path, success ]`, `[ path, true_path, action_type ]`, `[ path, true_path, username ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, action_type ]`, `[ path, remote_ip, username ]`, `[ path, success, action_type ]`, `[ path, success, username ]`, `[ path, action_type, username ]`, `[ true_path, remote_ip, success ]`, `[ true_path, remote_ip, action_type ]`, `[ true_path, remote_ip, username ]`, `[ true_path, success, action_type ]`, `[ true_path, success, username ]`, `[ true_path, action_type, username ]`, `[ remote_ip, success, action_type ]`, `[ remote_ip, success, username ]`, `[ remote_ip, action_type, username ]`, `[ success, action_type, username ]`, `[ start_date, end_date, path, true_path ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, action_type ]`, `[ start_date, end_date, path, username ]`, `[ start_date, end_date, true_path, remote_ip ]`, `[ start_date, end_date, true_path, success ]`, `[ start_date, end_date, true_path, action_type ]`, `[ start_date, end_date, true_path, username ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, action_type ]`, `[ start_date, end_date, remote_ip, username ]`, `[ start_date, end_date, success, action_type ]`, `[ start_date, end_date, success, username ]`, `[ start_date, end_date, action_type, username ]`, `[ start_date, path, true_path, remote_ip ]`, `[ start_date, path, true_path, success ]`, `[ start_date, path, true_path, action_type ]`, `[ start_date, path, true_path, username ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, action_type ]`, `[ start_date, path, remote_ip, username ]`, `[ start_date, path, success, action_type ]`, `[ start_date, path, success, username ]`, `[ start_date, path, action_type, username ]`, `[ start_date, true_path, remote_ip, success ]`, `[ start_date, true_path, remote_ip, action_type ]`, `[ start_date, true_path, remote_ip, username ]`, `[ start_date, true_path, success, action_type ]`, `[ start_date, true_path, success, username ]`, `[ start_date, true_path, action_type, username ]`, `[ start_date, remote_ip, success, action_type ]`, `[ start_date, remote_ip, success, username ]`, `[ start_date, remote_ip, action_type, username ]`, `[ start_date, success, action_type, username ]`, `[ end_date, path, true_path, remote_ip ]`, `[ end_date, path, true_path, success ]`, `[ end_date, path, true_path, action_type ]`, `[ end_date, path, true_path, username ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, action_type ]`, `[ end_date, path, remote_ip, username ]`, `[ end_date, path, success, action_type ]`, `[ end_date, path, success, username ]`, `[ end_date, path, action_type, username ]`, `[ end_date, true_path, remote_ip, success ]`, `[ end_date, true_path, remote_ip, action_type ]`, `[ end_date, true_path, remote_ip, username ]`, `[ end_date, true_path, success, action_type ]`, `[ end_date, true_path, success, username ]`, `[ end_date, true_path, action_type, username ]`, `[ end_date, remote_ip, success, action_type ]`, `[ end_date, remote_ip, success, username ]`, `[ end_date, remote_ip, action_type, username ]`, `[ end_date, success, action_type, username ]`, `[ path, true_path, remote_ip, success ]`, `[ path, true_path, remote_ip, action_type ]`, `[ path, true_path, remote_ip, username ]`, `[ path, true_path, success, action_type ]`, `[ path, true_path, success, username ]`, `[ path, true_path, action_type, username ]`, `[ path, remote_ip, success, action_type ]`, `[ path, remote_ip, success, username ]`, `[ path, remote_ip, action_type, username ]`, `[ path, success, action_type, username ]`, `[ true_path, remote_ip, success, action_type ]`, `[ true_path, remote_ip, success, username ]`, `[ true_path, remote_ip, action_type, username ]`, `[ true_path, success, action_type, username ]`, `[ remote_ip, success, action_type, username ]`, `[ start_date, end_date, path, true_path, remote_ip ]`, `[ start_date, end_date, path, true_path, success ]`, `[ start_date, end_date, path, true_path, action_type ]`, `[ start_date, end_date, path, true_path, username ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, action_type ]`, `[ start_date, end_date, path, remote_ip, username ]`, `[ start_date, end_date, path, success, action_type ]`, `[ start_date, end_date, path, success, username ]`, `[ start_date, end_date, path, action_type, username ]`, `[ start_date, end_date, true_path, remote_ip, success ]`, `[ start_date, end_date, true_path, remote_ip, action_type ]`, `[ start_date, end_date, true_path, remote_ip, username ]`, `[ start_date, end_date, true_path, success, action_type ]`, `[ start_date, end_date, true_path, success, username ]`, `[ start_date, end_date, true_path, action_type, username ]`, `[ start_date, end_date, remote_ip, success, action_type ]`, `[ start_date, end_date, remote_ip, success, username ]`, `[ start_date, end_date, remote_ip, action_type, username ]`, `[ start_date, end_date, success, action_type, username ]`, `[ start_date, path, true_path, remote_ip, success ]`, `[ start_date, path, true_path, remote_ip, action_type ]`, `[ start_date, path, true_path, remote_ip, username ]`, `[ start_date, path, true_path, success, action_type ]`, `[ start_date, path, true_path, success, username ]`, `[ start_date, path, true_path, action_type, username ]`, `[ start_date, path, remote_ip, success, action_type ]`, `[ start_date, path, remote_ip, success, username ]`, `[ start_date, path, remote_ip, action_type, username ]`, `[ start_date, path, success, action_type, username ]`, `[ start_date, true_path, remote_ip, success, action_type ]`, `[ start_date, true_path, remote_ip, success, username ]`, `[ start_date, true_path, remote_ip, action_type, username ]`, `[ start_date, true_path, success, action_type, username ]`, `[ start_date, remote_ip, success, action_type, username ]`, `[ end_date, path, true_path, remote_ip, success ]`, `[ end_date, path, true_path, remote_ip, action_type ]`, `[ end_date, path, true_path, remote_ip, username ]`, `[ end_date, path, true_path, success, action_type ]`, `[ end_date, path, true_path, success, username ]`, `[ end_date, path, true_path, action_type, username ]`, `[ end_date, path, remote_ip, success, action_type ]`, `[ end_date, path, remote_ip, success, username ]`, `[ end_date, path, remote_ip, action_type, username ]`, `[ end_date, path, success, action_type, username ]`, `[ end_date, true_path, remote_ip, success, action_type ]`, `[ end_date, true_path, remote_ip, success, username ]`, `[ end_date, true_path, remote_ip, action_type, username ]`, `[ end_date, true_path, success, action_type, username ]`, `[ end_date, remote_ip, success, action_type, username ]`, `[ path, true_path, remote_ip, success, action_type ]`, `[ path, true_path, remote_ip, success, username ]`, `[ path, true_path, remote_ip, action_type, username ]`, `[ path, true_path, success, action_type, username ]`, `[ path, remote_ip, success, action_type, username ]`, `[ true_path, remote_ip, success, action_type, username ]`, `[ start_date, end_date, path, true_path, remote_ip, success ]`, `[ start_date, end_date, path, true_path, remote_ip, action_type ]`, `[ start_date, end_date, path, true_path, remote_ip, username ]`, `[ start_date, end_date, path, true_path, success, action_type ]`, `[ start_date, end_date, path, true_path, success, username ]`, `[ start_date, end_date, path, true_path, action_type, username ]`, `[ start_date, end_date, path, remote_ip, success, action_type ]`, `[ start_date, end_date, path, remote_ip, success, username ]`, `[ start_date, end_date, path, remote_ip, action_type, username ]`, `[ start_date, end_date, path, success, action_type, username ]`, `[ start_date, end_date, true_path, remote_ip, success, action_type ]`, `[ start_date, end_date, true_path, remote_ip, success, username ]`, `[ start_date, end_date, true_path, remote_ip, action_type, username ]`, `[ start_date, end_date, true_path, success, action_type, username ]`, `[ start_date, end_date, remote_ip, success, action_type, username ]`, `[ start_date, path, true_path, remote_ip, success, action_type ]`, `[ start_date, path, true_path, remote_ip, success, username ]`, `[ start_date, path, true_path, remote_ip, action_type, username ]`, `[ start_date, path, true_path, success, action_type, username ]`, `[ start_date, path, remote_ip, success, action_type, username ]`, `[ start_date, true_path, remote_ip, success, action_type, username ]`, `[ end_date, path, true_path, remote_ip, success, action_type ]`, `[ end_date, path, true_path, remote_ip, success, username ]`, `[ end_date, path, true_path, remote_ip, action_type, username ]`, `[ end_date, path, true_path, success, action_type, username ]`, `[ end_date, path, remote_ip, success, action_type, username ]`, `[ end_date, true_path, remote_ip, success, action_type, username ]`, `[ path, true_path, remote_ip, success, action_type, username ]`, `[ start_date, end_date, path, true_path, remote_ip, success, action_type ]`, `[ start_date, end_date, path, true_path, remote_ip, success, username ]`, `[ start_date, end_date, path, true_path, remote_ip, action_type, username ]`, `[ start_date, end_date, path, true_path, success, action_type, username ]`, `[ start_date, end_date, path, remote_ip, success, action_type, username ]`, `[ start_date, end_date, true_path, remote_ip, success, action_type, username ]`, `[ start_date, path, true_path, remote_ip, success, action_type, username ]` or `[ end_date, path, true_path, remote_ip, success, action_type, username ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`, `true_path`, `action_type` or `username`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ true_path ]`, `[ remote_ip ]`, `[ success ]`, `[ action_type ]`, `[ username ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, true_path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, action_type ]`, `[ start_date, username ]`, `[ end_date, path ]`, `[ end_date, true_path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, action_type ]`, `[ end_date, username ]`, `[ path, true_path ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, action_type ]`, `[ path, username ]`, `[ true_path, remote_ip ]`, `[ true_path, success ]`, `[ true_path, action_type ]`, `[ true_path, username ]`, `[ remote_ip, success ]`, `[ remote_ip, action_type ]`, `[ remote_ip, username ]`, `[ success, action_type ]`, `[ success, username ]`, `[ action_type, username ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, true_path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, action_type ]`, `[ start_date, end_date, username ]`, `[ start_date, path, true_path ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, action_type ]`, `[ start_date, path, username ]`, `[ start_date, true_path, remote_ip ]`, `[ start_date, true_path, success ]`, `[ start_date, true_path, action_type ]`, `[ start_date, true_path, username ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, action_type ]`, `[ start_date, remote_ip, username ]`, `[ start_date, success, action_type ]`, `[ start_date, success, username ]`, `[ start_date, action_type, username ]`, `[ end_date, path, true_path ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, action_type ]`, `[ end_date, path, username ]`, `[ end_date, true_path, remote_ip ]`, `[ end_date, true_path, success ]`, `[ end_date, true_path, action_type ]`, `[ end_date, true_path, username ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, action_type ]`, `[ end_date, remote_ip, username ]`, `[ end_date, success, action_type ]`, `[ end_date, success, username ]`, `[ end_date, action_type, username ]`, `[ path, true_path, remote_ip ]`, `[ path, true_path, success ]`, `[ path, true_path, action_type ]`, `[ path, true_path, username ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, action_type ]`, `[ path, remote_ip, username ]`, `[ path, success, action_type ]`, `[ path, success, username ]`, `[ path, action_type, username ]`, `[ true_path, remote_ip, success ]`, `[ true_path, remote_ip, action_type ]`, `[ true_path, remote_ip, username ]`, `[ true_path, success, action_type ]`, `[ true_path, success, username ]`, `[ true_path, action_type, username ]`, `[ remote_ip, success, action_type ]`, `[ remote_ip, success, username ]`, `[ remote_ip, action_type, username ]`, `[ success, action_type, username ]`, `[ start_date, end_date, path, true_path ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, action_type ]`, `[ start_date, end_date, path, username ]`, `[ start_date, end_date, true_path, remote_ip ]`, `[ start_date, end_date, true_path, success ]`, `[ start_date, end_date, true_path, action_type ]`, `[ start_date, end_date, true_path, username ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, action_type ]`, `[ start_date, end_date, remote_ip, username ]`, `[ start_date, end_date, success, action_type ]`, `[ start_date, end_date, success, username ]`, `[ start_date, end_date, action_type, username ]`, `[ start_date, path, true_path, remote_ip ]`, `[ start_date, path, true_path, success ]`, `[ start_date, path, true_path, action_type ]`, `[ start_date, path, true_path, username ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, action_type ]`, `[ start_date, path, remote_ip, username ]`, `[ start_date, path, success, action_type ]`, `[ start_date, path, success, username ]`, `[ start_date, path, action_type, username ]`, `[ start_date, true_path, remote_ip, success ]`, `[ start_date, true_path, remote_ip, action_type ]`, `[ start_date, true_path, remote_ip, username ]`, `[ start_date, true_path, success, action_type ]`, `[ start_date, true_path, success, username ]`, `[ start_date, true_path, action_type, username ]`, `[ start_date, remote_ip, success, action_type ]`, `[ start_date, remote_ip, success, username ]`, `[ start_date, remote_ip, action_type, username ]`, `[ start_date, success, action_type, username ]`, `[ end_date, path, true_path, remote_ip ]`, `[ end_date, path, true_path, success ]`, `[ end_date, path, true_path, action_type ]`, `[ end_date, path, true_path, username ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, action_type ]`, `[ end_date, path, remote_ip, username ]`, `[ end_date, path, success, action_type ]`, `[ end_date, path, success, username ]`, `[ end_date, path, action_type, username ]`, `[ end_date, true_path, remote_ip, success ]`, `[ end_date, true_path, remote_ip, action_type ]`, `[ end_date, true_path, remote_ip, username ]`, `[ end_date, true_path, success, action_type ]`, `[ end_date, true_path, success, username ]`, `[ end_date, true_path, action_type, username ]`, `[ end_date, remote_ip, success, action_type ]`, `[ end_date, remote_ip, success, username ]`, `[ end_date, remote_ip, action_type, username ]`, `[ end_date, success, action_type, username ]`, `[ path, true_path, remote_ip, success ]`, `[ path, true_path, remote_ip, action_type ]`, `[ path, true_path, remote_ip, username ]`, `[ path, true_path, success, action_type ]`, `[ path, true_path, success, username ]`, `[ path, true_path, action_type, username ]`, `[ path, remote_ip, success, action_type ]`, `[ path, remote_ip, success, username ]`, `[ path, remote_ip, action_type, username ]`, `[ path, success, action_type, username ]`, `[ true_path, remote_ip, success, action_type ]`, `[ true_path, remote_ip, success, username ]`, `[ true_path, remote_ip, action_type, username ]`, `[ true_path, success, action_type, username ]`, `[ remote_ip, success, action_type, username ]`, `[ start_date, end_date, path, true_path, remote_ip ]`, `[ start_date, end_date, path, true_path, success ]`, `[ start_date, end_date, path, true_path, action_type ]`, `[ start_date, end_date, path, true_path, username ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, action_type ]`, `[ start_date, end_date, path, remote_ip, username ]`, `[ start_date, end_date, path, success, action_type ]`, `[ start_date, end_date, path, success, username ]`, `[ start_date, end_date, path, action_type, username ]`, `[ start_date, end_date, true_path, remote_ip, success ]`, `[ start_date, end_date, true_path, remote_ip, action_type ]`, `[ start_date, end_date, true_path, remote_ip, username ]`, `[ start_date, end_date, true_path, success, action_type ]`, `[ start_date, end_date, true_path, success, username ]`, `[ start_date, end_date, true_path, action_type, username ]`, `[ start_date, end_date, remote_ip, success, action_type ]`, `[ start_date, end_date, remote_ip, success, username ]`, `[ start_date, end_date, remote_ip, action_type, username ]`, `[ start_date, end_date, success, action_type, username ]`, `[ start_date, path, true_path, remote_ip, success ]`, `[ start_date, path, true_path, remote_ip, action_type ]`, `[ start_date, path, true_path, remote_ip, username ]`, `[ start_date, path, true_path, success, action_type ]`, `[ start_date, path, true_path, success, username ]`, `[ start_date, path, true_path, action_type, username ]`, `[ start_date, path, remote_ip, success, action_type ]`, `[ start_date, path, remote_ip, success, username ]`, `[ start_date, path, remote_ip, action_type, username ]`, `[ start_date, path, success, action_type, username ]`, `[ start_date, true_path, remote_ip, success, action_type ]`, `[ start_date, true_path, remote_ip, success, username ]`, `[ start_date, true_path, remote_ip, action_type, username ]`, `[ start_date, true_path, success, action_type, username ]`, `[ start_date, remote_ip, success, action_type, username ]`, `[ end_date, path, true_path, remote_ip, success ]`, `[ end_date, path, true_path, remote_ip, action_type ]`, `[ end_date, path, true_path, remote_ip, username ]`, `[ end_date, path, true_path, success, action_type ]`, `[ end_date, path, true_path, success, username ]`, `[ end_date, path, true_path, action_type, username ]`, `[ end_date, path, remote_ip, success, action_type ]`, `[ end_date, path, remote_ip, success, username ]`, `[ end_date, path, remote_ip, action_type, username ]`, `[ end_date, path, success, action_type, username ]`, `[ end_date, true_path, remote_ip, success, action_type ]`, `[ end_date, true_path, remote_ip, success, username ]`, `[ end_date, true_path, remote_ip, action_type, username ]`, `[ end_date, true_path, success, action_type, username ]`, `[ end_date, remote_ip, success, action_type, username ]`, `[ path, true_path, remote_ip, success, action_type ]`, `[ path, true_path, remote_ip, success, username ]`, `[ path, true_path, remote_ip, action_type, username ]`, `[ path, true_path, success, action_type, username ]`, `[ path, remote_ip, success, action_type, username ]`, `[ true_path, remote_ip, success, action_type, username ]`, `[ start_date, end_date, path, true_path, remote_ip, success ]`, `[ start_date, end_date, path, true_path, remote_ip, action_type ]`, `[ start_date, end_date, path, true_path, remote_ip, username ]`, `[ start_date, end_date, path, true_path, success, action_type ]`, `[ start_date, end_date, path, true_path, success, username ]`, `[ start_date, end_date, path, true_path, action_type, username ]`, `[ start_date, end_date, path, remote_ip, success, action_type ]`, `[ start_date, end_date, path, remote_ip, success, username ]`, `[ start_date, end_date, path, remote_ip, action_type, username ]`, `[ start_date, end_date, path, success, action_type, username ]`, `[ start_date, end_date, true_path, remote_ip, success, action_type ]`, `[ start_date, end_date, true_path, remote_ip, success, username ]`, `[ start_date, end_date, true_path, remote_ip, action_type, username ]`, `[ start_date, end_date, true_path, success, action_type, username ]`, `[ start_date, end_date, remote_ip, success, action_type, username ]`, `[ start_date, path, true_path, remote_ip, success, action_type ]`, `[ start_date, path, true_path, remote_ip, success, username ]`, `[ start_date, path, true_path, remote_ip, action_type, username ]`, `[ start_date, path, true_path, success, action_type, username ]`, `[ start_date, path, remote_ip, success, action_type, username ]`, `[ start_date, true_path, remote_ip, success, action_type, username ]`, `[ end_date, path, true_path, remote_ip, success, action_type ]`, `[ end_date, path, true_path, remote_ip, success, username ]`, `[ end_date, path, true_path, remote_ip, action_type, username ]`, `[ end_date, path, true_path, success, action_type, username ]`, `[ end_date, path, remote_ip, success, action_type, username ]`, `[ end_date, true_path, remote_ip, success, action_type, username ]`, `[ path, true_path, remote_ip, success, action_type, username ]`, `[ start_date, end_date, path, true_path, remote_ip, success, action_type ]`, `[ start_date, end_date, path, true_path, remote_ip, success, username ]`, `[ start_date, end_date, path, true_path, remote_ip, action_type, username ]`, `[ start_date, end_date, path, true_path, success, action_type, username ]`, `[ start_date, end_date, path, remote_ip, success, action_type, username ]`, `[ start_date, end_date, true_path, remote_ip, success, action_type, username ]`, `[ start_date, path, true_path, remote_ip, success, action_type, username ]` or `[ end_date, path, true_path, remote_ip, success, action_type, username ]`.
(0, _defineProperty2.default)(WebDavActionLog, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 4:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 6:
        if (!(params.action && !(0, _utils.isString)(params.action))) {
          _context.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
      case 8:
        if (!(params.page && !(0, _utils.isInt)(params.page))) {
          _context.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(params.page)));
      case 10:
        _context.next = 12;
        return _Api.default.sendRequest('/web_dav_action_logs', 'GET', params, options);
      case 12:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _WebDavActionLog(obj, options);
        })) || []);
      case 14:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(WebDavActionLog, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _WebDavActionLog.list(params, options);
});
var _default = exports.default = WebDavActionLog;
module.exports = WebDavActionLog;
module.exports.default = WebDavActionLog;