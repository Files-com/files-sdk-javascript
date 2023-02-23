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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  // string # Return results that are actions performed by the user indiciated by this User ID
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
  // string # Return results that are file actions related to this path.
  (0, _defineProperty2.default)(this, "getQueryPath", function () {
    return _this.attributes.query_path;
  });
  (0, _defineProperty2.default)(this, "setQueryPath", function (value) {
    _this.attributes.query_path = value;
  });
  // string # Return results that are file actions related to files or folders inside this folder path.
  (0, _defineProperty2.default)(this, "getQueryFolder", function () {
    return _this.attributes.query_folder;
  });
  (0, _defineProperty2.default)(this, "setQueryFolder", function (value) {
    _this.attributes.query_folder = value;
  });
  // string # Return results that are file moves originating from this path.
  (0, _defineProperty2.default)(this, "getQuerySrc", function () {
    return _this.attributes.query_src;
  });
  (0, _defineProperty2.default)(this, "setQuerySrc", function (value) {
    _this.attributes.query_src = value;
  });
  // string # Return results that are file moves with this path as destination.
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
  // string # If searching for Histories about login failures, this parameter restricts results to failures of this specific type.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`
  (0, _defineProperty2.default)(this, "getQueryFailureType", function () {
    return _this.attributes.query_failure_type;
  });
  (0, _defineProperty2.default)(this, "setQueryFailureType", function (value) {
    _this.attributes.query_failure_type = value;
  });
  // string # If searching for Histories about specific objects (such as Users, or API Keys), this paremeter restricts results to objects that match this ID.
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
  // string # If searching for Histories about Permisisons, this parameter restricts results to permissions of this level.
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
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new errors.NotImplementedError('The HistoryExport object doesn\'t support updates.');
    } else {
      var newObject = HistoryExport.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
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
// Parameters:
//   id (required) - int64 - History Export ID.
(0, _defineProperty2.default)(HistoryExport, "find", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
    var params,
      options,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context.next = 11;
          return _Api.default.sendRequest("/history_exports/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context.sent;
          return _context.abrupt("return", new HistoryExport(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(HistoryExport, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return HistoryExport.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   start_at - string - Start date/time of export range.
//   end_at - string - End date/time of export range.
//   query_action - string - Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
//   query_interface - string - Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`
//   query_user_id - string - Return results that are actions performed by the user indiciated by this User ID
//   query_file_id - string - Return results that are file actions related to the file indicated by this File ID
//   query_parent_id - string - Return results that are file actions inside the parent folder specified by this folder ID
//   query_path - string - Return results that are file actions related to this path.
//   query_folder - string - Return results that are file actions related to files or folders inside this folder path.
//   query_src - string - Return results that are file moves originating from this path.
//   query_destination - string - Return results that are file moves with this path as destination.
//   query_ip - string - Filter results by this IP address.
//   query_username - string - Filter results by this username.
//   query_failure_type - string - If searching for Histories about login failures, this parameter restricts results to failures of this specific type.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`
//   query_target_id - string - If searching for Histories about specific objects (such as Users, or API Keys), this paremeter restricts results to objects that match this ID.
//   query_target_name - string - If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to objects with this name/username.
//   query_target_permission - string - If searching for Histories about Permisisons, this parameter restricts results to permissions of this level.
//   query_target_user_id - string - If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user ID.
//   query_target_username - string - If searching for Histories about API keys, this parameter restricts results to API keys created by/for this username.
//   query_target_platform - string - If searching for Histories about API keys, this parameter restricts results to API keys associated with this platform.
//   query_target_permission_set - string - If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
(0, _defineProperty2.default)(HistoryExport, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context2.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
          _context2.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params['start_at'])));
      case 6:
        if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
          _context2.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params['end_at'])));
      case 8:
        if (!(params['query_action'] && !(0, _utils.isString)(params['query_action']))) {
          _context2.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_action must be of type String, received ".concat((0, _utils.getType)(params['query_action'])));
      case 10:
        if (!(params['query_interface'] && !(0, _utils.isString)(params['query_interface']))) {
          _context2.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_interface must be of type String, received ".concat((0, _utils.getType)(params['query_interface'])));
      case 12:
        if (!(params['query_user_id'] && !(0, _utils.isString)(params['query_user_id']))) {
          _context2.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_user_id must be of type String, received ".concat((0, _utils.getType)(params['query_user_id'])));
      case 14:
        if (!(params['query_file_id'] && !(0, _utils.isString)(params['query_file_id']))) {
          _context2.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_file_id must be of type String, received ".concat((0, _utils.getType)(params['query_file_id'])));
      case 16:
        if (!(params['query_parent_id'] && !(0, _utils.isString)(params['query_parent_id']))) {
          _context2.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_parent_id must be of type String, received ".concat((0, _utils.getType)(params['query_parent_id'])));
      case 18:
        if (!(params['query_path'] && !(0, _utils.isString)(params['query_path']))) {
          _context2.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_path must be of type String, received ".concat((0, _utils.getType)(params['query_path'])));
      case 20:
        if (!(params['query_folder'] && !(0, _utils.isString)(params['query_folder']))) {
          _context2.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_folder must be of type String, received ".concat((0, _utils.getType)(params['query_folder'])));
      case 22:
        if (!(params['query_src'] && !(0, _utils.isString)(params['query_src']))) {
          _context2.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_src must be of type String, received ".concat((0, _utils.getType)(params['query_src'])));
      case 24:
        if (!(params['query_destination'] && !(0, _utils.isString)(params['query_destination']))) {
          _context2.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_destination must be of type String, received ".concat((0, _utils.getType)(params['query_destination'])));
      case 26:
        if (!(params['query_ip'] && !(0, _utils.isString)(params['query_ip']))) {
          _context2.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_ip must be of type String, received ".concat((0, _utils.getType)(params['query_ip'])));
      case 28:
        if (!(params['query_username'] && !(0, _utils.isString)(params['query_username']))) {
          _context2.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_username must be of type String, received ".concat((0, _utils.getType)(params['query_username'])));
      case 30:
        if (!(params['query_failure_type'] && !(0, _utils.isString)(params['query_failure_type']))) {
          _context2.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_failure_type must be of type String, received ".concat((0, _utils.getType)(params['query_failure_type'])));
      case 32:
        if (!(params['query_target_id'] && !(0, _utils.isString)(params['query_target_id']))) {
          _context2.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_id must be of type String, received ".concat((0, _utils.getType)(params['query_target_id'])));
      case 34:
        if (!(params['query_target_name'] && !(0, _utils.isString)(params['query_target_name']))) {
          _context2.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_name must be of type String, received ".concat((0, _utils.getType)(params['query_target_name'])));
      case 36:
        if (!(params['query_target_permission'] && !(0, _utils.isString)(params['query_target_permission']))) {
          _context2.next = 38;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_permission must be of type String, received ".concat((0, _utils.getType)(params['query_target_permission'])));
      case 38:
        if (!(params['query_target_user_id'] && !(0, _utils.isString)(params['query_target_user_id']))) {
          _context2.next = 40;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_user_id must be of type String, received ".concat((0, _utils.getType)(params['query_target_user_id'])));
      case 40:
        if (!(params['query_target_username'] && !(0, _utils.isString)(params['query_target_username']))) {
          _context2.next = 42;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_username must be of type String, received ".concat((0, _utils.getType)(params['query_target_username'])));
      case 42:
        if (!(params['query_target_platform'] && !(0, _utils.isString)(params['query_target_platform']))) {
          _context2.next = 44;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_platform must be of type String, received ".concat((0, _utils.getType)(params['query_target_platform'])));
      case 44:
        if (!(params['query_target_permission_set'] && !(0, _utils.isString)(params['query_target_permission_set']))) {
          _context2.next = 46;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_target_permission_set must be of type String, received ".concat((0, _utils.getType)(params['query_target_permission_set'])));
      case 46:
        _context2.next = 48;
        return _Api.default.sendRequest("/history_exports", 'POST', params, options);
      case 48:
        response = _context2.sent;
        return _context2.abrupt("return", new HistoryExport(response === null || response === void 0 ? void 0 : response.data, options));
      case 50:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
var _default = HistoryExport;
exports.default = _default;