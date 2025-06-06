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
var _HistoryExportResult;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class HistoryExportResult
 */
var HistoryExportResult = /*#__PURE__*/(0, _createClass2.default)(function HistoryExportResult() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, HistoryExportResult);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Action ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // int64 # When the action happened
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # When the action happened, in ISO8601 format.
  (0, _defineProperty2.default)(this, "getCreatedAtIso8601", function () {
    return _this.attributes.created_at_iso8601;
  });
  // int64 # User ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  // int64 # File ID related to the action
  (0, _defineProperty2.default)(this, "getFileId", function () {
    return _this.attributes.file_id;
  });
  // int64 # ID of the parent folder
  (0, _defineProperty2.default)(this, "getParentId", function () {
    return _this.attributes.parent_id;
  });
  // string # Path of the related action. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  // string # Folder in which the action occurred
  (0, _defineProperty2.default)(this, "getFolder", function () {
    return _this.attributes.folder;
  });
  // string # File move originated from this path
  (0, _defineProperty2.default)(this, "getSrc", function () {
    return _this.attributes.src;
  });
  // string # File moved to this destination folder
  (0, _defineProperty2.default)(this, "getDestination", function () {
    return _this.attributes.destination;
  });
  // string # Client IP that performed the action
  (0, _defineProperty2.default)(this, "getIp", function () {
    return _this.attributes.ip;
  });
  // string # Username of the user that performed the action
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  // boolean # true if this change was performed by a user on a parent site.
  (0, _defineProperty2.default)(this, "getUserIsFromParentSite", function () {
    return _this.attributes.user_is_from_parent_site;
  });
  // string # What action was taken. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  // string # The type of login failure, if applicable.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`
  (0, _defineProperty2.default)(this, "getFailureType", function () {
    return _this.attributes.failure_type;
  });
  // string # Interface through which the action was taken. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`
  (0, _defineProperty2.default)(this, "getInterface", function () {
    return _this.attributes.interface;
  });
  // int64 # ID of the object (such as Users, or API Keys) on which the action was taken
  (0, _defineProperty2.default)(this, "getTargetId", function () {
    return _this.attributes.target_id;
  });
  // string # Name of the User, Group or other object with a name related to this action
  (0, _defineProperty2.default)(this, "getTargetName", function () {
    return _this.attributes.target_name;
  });
  // string # Permission level of the action
  (0, _defineProperty2.default)(this, "getTargetPermission", function () {
    return _this.attributes.target_permission;
  });
  // boolean # Whether or not the action was recursive
  (0, _defineProperty2.default)(this, "getTargetRecursive", function () {
    return _this.attributes.target_recursive;
  });
  // int64 # If searching for Histories about API keys, this is when the API key will expire. Represented as a Unix timestamp.
  (0, _defineProperty2.default)(this, "getTargetExpiresAt", function () {
    return _this.attributes.target_expires_at;
  });
  // string # If searching for Histories about API keys, this is when the API key will expire. Represented in ISO8601 format.
  (0, _defineProperty2.default)(this, "getTargetExpiresAtIso8601", function () {
    return _this.attributes.target_expires_at_iso8601;
  });
  // string # If searching for Histories about API keys, this represents the permission set of the associated  API key
  (0, _defineProperty2.default)(this, "getTargetPermissionSet", function () {
    return _this.attributes.target_permission_set;
  });
  // string # If searching for Histories about API keys, this is the platform on which the action was taken
  (0, _defineProperty2.default)(this, "getTargetPlatform", function () {
    return _this.attributes.target_platform;
  });
  // string # If searching for Histories about API keys, this is the username on which the action was taken
  (0, _defineProperty2.default)(this, "getTargetUsername", function () {
    return _this.attributes.target_username;
  });
  // int64 # If searching for Histories about API keys, this is the User ID on which the action was taken
  (0, _defineProperty2.default)(this, "getTargetUserId", function () {
    return _this.attributes.target_user_id;
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
_HistoryExportResult = HistoryExportResult;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   history_export_id (required) - int64 - ID of the associated history export.
(0, _defineProperty2.default)(HistoryExportResult, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (params.history_export_id) {
          _context.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: history_export_id');
      case 1:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 3:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 4:
        if (!(params.history_export_id && !(0, _utils.isInt)(params.history_export_id))) {
          _context.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: history_export_id must be of type Int, received ".concat((0, _utils.getType)(params.history_export_id)));
      case 5:
        _context.next = 6;
        return _Api.default.sendRequest('/history_export_results', 'GET', params, options);
      case 6:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _HistoryExportResult(obj, options);
        })) || []);
      case 7:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(HistoryExportResult, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _HistoryExportResult.list(params, options);
});
var _default = exports.default = HistoryExportResult;
module.exports = HistoryExportResult;
module.exports.default = HistoryExportResult;