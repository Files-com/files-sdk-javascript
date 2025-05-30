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
var _HistoryExport;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class HistoryExport
 */
var HistoryExport = /*#__PURE__*/(0, _createClass2.default)(function HistoryExport() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, HistoryExport);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # History Export ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Version of the history for the export.
  (0, _defineProperty2.default)(this, "getHistoryVersion", function () {
    return _this.attributes.history_version;
  });
  (0, _defineProperty2.default)(this, "setHistoryVersion", function (value) {
    _this.attributes.history_version = value;
  });
  // date-time # Start date/time of export range.
  (0, _defineProperty2.default)(this, "getStartAt", function () {
    return _this.attributes.start_at;
  });
  (0, _defineProperty2.default)(this, "setStartAt", function (value) {
    _this.attributes.start_at = value;
  });
  // date-time # End date/time of export range.
  (0, _defineProperty2.default)(this, "getEndAt", function () {
    return _this.attributes.end_at;
  });
  (0, _defineProperty2.default)(this, "setEndAt", function (value) {
    _this.attributes.end_at = value;
  });
  // string # Status of export.  Will be: `building`, `ready`, or `failed`
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // string # Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
  (0, _defineProperty2.default)(this, "getQueryAction", function () {
    return _this.attributes.query_action;
  });
  (0, _defineProperty2.default)(this, "setQueryAction", function (value) {
    _this.attributes.query_action = value;
  });
  // string # Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`
  (0, _defineProperty2.default)(this, "getQueryInterface", function () {
    return _this.attributes.query_interface;
  });
  (0, _defineProperty2.default)(this, "setQueryInterface", function (value) {
    _this.attributes.query_interface = value;
  });
  // string # Return results that are actions performed by the user indicated by this User ID
  (0, _defineProperty2.default)(this, "getQueryUserId", function () {
    return _this.attributes.query_user_id;
  });
  (0, _defineProperty2.default)(this, "setQueryUserId", function (value) {
    _this.attributes.query_user_id = value;
  });
  // string # Return results that are file actions related to the file indicated by this File ID
  (0, _defineProperty2.default)(this, "getQueryFileId", function () {
    return _this.attributes.query_file_id;
  });
  (0, _defineProperty2.default)(this, "setQueryFileId", function (value) {
    _this.attributes.query_file_id = value;
  });
  // string # Return results that are file actions inside the parent folder specified by this folder ID
  (0, _defineProperty2.default)(this, "getQueryParentId", function () {
    return _this.attributes.query_parent_id;
  });
  (0, _defineProperty2.default)(this, "setQueryParentId", function (value) {
    _this.attributes.query_parent_id = value;
  });
  // string # Return results that are file actions related to paths matching this pattern.
  (0, _defineProperty2.default)(this, "getQueryPath", function () {
    return _this.attributes.query_path;
  });
  (0, _defineProperty2.default)(this, "setQueryPath", function (value) {
    _this.attributes.query_path = value;
  });
  // string # Return results that are file actions related to files or folders inside folder paths matching this pattern.
  (0, _defineProperty2.default)(this, "getQueryFolder", function () {
    return _this.attributes.query_folder;
  });
  (0, _defineProperty2.default)(this, "setQueryFolder", function (value) {
    _this.attributes.query_folder = value;
  });
  // string # Return results that are file moves originating from paths matching this pattern.
  (0, _defineProperty2.default)(this, "getQuerySrc", function () {
    return _this.attributes.query_src;
  });
  (0, _defineProperty2.default)(this, "setQuerySrc", function (value) {
    _this.attributes.query_src = value;
  });
  // string # Return results that are file moves with paths matching this pattern as destination.
  (0, _defineProperty2.default)(this, "getQueryDestination", function () {
    return _this.attributes.query_destination;
  });
  (0, _defineProperty2.default)(this, "setQueryDestination", function (value) {
    _this.attributes.query_destination = value;
  });
  // string # Filter results by this IP address.
  (0, _defineProperty2.default)(this, "getQueryIp", function () {
    return _this.attributes.query_ip;
  });
  (0, _defineProperty2.default)(this, "setQueryIp", function (value) {
    _this.attributes.query_ip = value;
  });
  // string # Filter results by this username.
  (0, _defineProperty2.default)(this, "getQueryUsername", function () {
    return _this.attributes.query_username;
  });
  (0, _defineProperty2.default)(this, "setQueryUsername", function (value) {
    _this.attributes.query_username = value;
  });
  // string # If searching for Histories about login failures, this parameter restricts results to failures of this specific type.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`
  (0, _defineProperty2.default)(this, "getQueryFailureType", function () {
    return _this.attributes.query_failure_type;
  });
  (0, _defineProperty2.default)(this, "setQueryFailureType", function (value) {
    _this.attributes.query_failure_type = value;
  });
  // string # If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results to objects that match this ID.
  (0, _defineProperty2.default)(this, "getQueryTargetId", function () {
    return _this.attributes.query_target_id;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetId", function (value) {
    _this.attributes.query_target_id = value;
  });
  // string # If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to objects with this name/username.
  (0, _defineProperty2.default)(this, "getQueryTargetName", function () {
    return _this.attributes.query_target_name;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetName", function (value) {
    _this.attributes.query_target_name = value;
  });
  // string # If searching for Histories about Permissions, this parameter restricts results to permissions of this level.
  (0, _defineProperty2.default)(this, "getQueryTargetPermission", function () {
    return _this.attributes.query_target_permission;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetPermission", function (value) {
    _this.attributes.query_target_permission = value;
  });
  // string # If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user ID.
  (0, _defineProperty2.default)(this, "getQueryTargetUserId", function () {
    return _this.attributes.query_target_user_id;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetUserId", function (value) {
    _this.attributes.query_target_user_id = value;
  });
  // string # If searching for Histories about API keys, this parameter restricts results to API keys created by/for this username.
  (0, _defineProperty2.default)(this, "getQueryTargetUsername", function () {
    return _this.attributes.query_target_username;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetUsername", function (value) {
    _this.attributes.query_target_username = value;
  });
  // string # If searching for Histories about API keys, this parameter restricts results to API keys associated with this platform.
  (0, _defineProperty2.default)(this, "getQueryTargetPlatform", function () {
    return _this.attributes.query_target_platform;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetPlatform", function (value) {
    _this.attributes.query_target_platform = value;
  });
  // string # If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
  (0, _defineProperty2.default)(this, "getQueryTargetPermissionSet", function () {
    return _this.attributes.query_target_permission_set;
  });
  (0, _defineProperty2.default)(this, "setQueryTargetPermissionSet", function (value) {
    _this.attributes.query_target_permission_set = value;
  });
  // string # If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV.
  (0, _defineProperty2.default)(this, "getResultsUrl", function () {
    return _this.attributes.results_url;
  });
  (0, _defineProperty2.default)(this, "setResultsUrl", function (value) {
    _this.attributes.results_url = value;
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The HistoryExport object doesn\'t support updates.');
        case 1:
          _context.next = 2;
          return HistoryExport.create(_this.attributes, _this.options);
        case 2:
          newObject = _context.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context.abrupt("return", true);
        case 3:
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
_HistoryExport = HistoryExport;
// Parameters:
//   id (required) - int64 - History Export ID.
(0, _defineProperty2.default)(HistoryExport, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
    var params,
      options,
      response,
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
          params.id = id;
          if (params.id) {
            _context2.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context2.next = 4;
          return _Api.default.sendRequest("/history_exports/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", new _HistoryExport(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(HistoryExport, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _HistoryExport.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   start_at - string - Start date/time of export range.
//   end_at - string - End date/time of export range.
//   query_action - string - Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
//   query_interface - string - Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`
//   query_user_id - string - Return results that are actions performed by the user indicated by this User ID
//   query_file_id - string - Return results that are file actions related to the file indicated by this File ID
//   query_parent_id - string - Return results that are file actions inside the parent folder specified by this folder ID
//   query_path - string - Return results that are file actions related to paths matching this pattern.
//   query_folder - string - Return results that are file actions related to files or folders inside folder paths matching this pattern.
//   query_src - string - Return results that are file moves originating from paths matching this pattern.
//   query_destination - string - Return results that are file moves with paths matching this pattern as destination.
//   query_ip - string - Filter results by this IP address.
//   query_username - string - Filter results by this username.
//   query_failure_type - string - If searching for Histories about login failures, this parameter restricts results to failures of this specific type.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`
//   query_target_id - string - If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results to objects that match this ID.
//   query_target_name - string - If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to objects with this name/username.
//   query_target_permission - string - If searching for Histories about Permissions, this parameter restricts results to permissions of this level.
//   query_target_user_id - string - If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user ID.
//   query_target_username - string - If searching for Histories about API keys, this parameter restricts results to API keys created by/for this username.
//   query_target_platform - string - If searching for Histories about API keys, this parameter restricts results to API keys associated with this platform.
//   query_target_permission_set - string - If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
(0, _defineProperty2.default)(HistoryExport, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context3.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.start_at && !(0, _utils.isString)(params.start_at))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
      case 2:
        if (!(params.end_at && !(0, _utils.isString)(params.end_at))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
      case 3:
        if (!(params.query_action && !(0, _utils.isString)(params.query_action))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_action must be of type String, received ".concat((0, _utils.getType)(params.query_action)));
      case 4:
        if (!(params.query_interface && !(0, _utils.isString)(params.query_interface))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_interface must be of type String, received ".concat((0, _utils.getType)(params.query_interface)));
      case 5:
        if (!(params.query_user_id && !(0, _utils.isString)(params.query_user_id))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_user_id must be of type String, received ".concat((0, _utils.getType)(params.query_user_id)));
      case 6:
        if (!(params.query_file_id && !(0, _utils.isString)(params.query_file_id))) {
          _context3.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_file_id must be of type String, received ".concat((0, _utils.getType)(params.query_file_id)));
      case 7:
        if (!(params.query_parent_id && !(0, _utils.isString)(params.query_parent_id))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_parent_id must be of type String, received ".concat((0, _utils.getType)(params.query_parent_id)));
      case 8:
        if (!(params.query_path && !(0, _utils.isString)(params.query_path))) {
          _context3.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_path must be of type String, received ".concat((0, _utils.getType)(params.query_path)));
      case 9:
        if (!(params.query_folder && !(0, _utils.isString)(params.query_folder))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_folder must be of type String, received ".concat((0, _utils.getType)(params.query_folder)));
      case 10:
        if (!(params.query_src && !(0, _utils.isString)(params.query_src))) {
          _context3.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_src must be of type String, received ".concat((0, _utils.getType)(params.query_src)));
      case 11:
        if (!(params.query_destination && !(0, _utils.isString)(params.query_destination))) {
          _context3.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_destination must be of type String, received ".concat((0, _utils.getType)(params.query_destination)));
      case 12:
        if (!(params.query_ip && !(0, _utils.isString)(params.query_ip))) {
          _context3.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_ip must be of type String, received ".concat((0, _utils.getType)(params.query_ip)));
      case 13:
        if (!(params.query_username && !(0, _utils.isString)(params.query_username))) {
          _context3.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_username must be of type String, received ".concat((0, _utils.getType)(params.query_username)));
      case 14:
        if (!(params.query_failure_type && !(0, _utils.isString)(params.query_failure_type))) {
          _context3.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_failure_type must be of type String, received ".concat((0, _utils.getType)(params.query_failure_type)));
      case 15:
        if (!(params.query_target_id && !(0, _utils.isString)(params.query_target_id))) {
          _context3.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_id must be of type String, received ".concat((0, _utils.getType)(params.query_target_id)));
      case 16:
        if (!(params.query_target_name && !(0, _utils.isString)(params.query_target_name))) {
          _context3.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_name must be of type String, received ".concat((0, _utils.getType)(params.query_target_name)));
      case 17:
        if (!(params.query_target_permission && !(0, _utils.isString)(params.query_target_permission))) {
          _context3.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_permission must be of type String, received ".concat((0, _utils.getType)(params.query_target_permission)));
      case 18:
        if (!(params.query_target_user_id && !(0, _utils.isString)(params.query_target_user_id))) {
          _context3.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_user_id must be of type String, received ".concat((0, _utils.getType)(params.query_target_user_id)));
      case 19:
        if (!(params.query_target_username && !(0, _utils.isString)(params.query_target_username))) {
          _context3.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_username must be of type String, received ".concat((0, _utils.getType)(params.query_target_username)));
      case 20:
        if (!(params.query_target_platform && !(0, _utils.isString)(params.query_target_platform))) {
          _context3.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_platform must be of type String, received ".concat((0, _utils.getType)(params.query_target_platform)));
      case 21:
        if (!(params.query_target_permission_set && !(0, _utils.isString)(params.query_target_permission_set))) {
          _context3.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_permission_set must be of type String, received ".concat((0, _utils.getType)(params.query_target_permission_set)));
      case 22:
        _context3.next = 23;
        return _Api.default.sendRequest('/history_exports', 'POST', params, options);
      case 23:
        response = _context3.sent;
        return _context3.abrupt("return", new _HistoryExport(response === null || response === void 0 ? void 0 : response.data, options));
      case 24:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = HistoryExport;
module.exports = HistoryExport;
module.exports.default = HistoryExport;