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
var _AutomationLog;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class AutomationLog
 */
var AutomationLog = /*#__PURE__*/(0, _createClass2.default)(function AutomationLog() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, AutomationLog);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // date-time # Start Time of Action. Deprecrated: Use created_at.
  (0, _defineProperty2.default)(this, "getTimestamp", function () {
    return _this.attributes.timestamp;
  });
  // int64 # Automation ID
  (0, _defineProperty2.default)(this, "getAutomationId", function () {
    return _this.attributes.automation_id;
  });
  // int64 # Automation Run ID
  (0, _defineProperty2.default)(this, "getAutomationRunId", function () {
    return _this.attributes.automation_run_id;
  });
  // string # Destination path, for moves and copies
  (0, _defineProperty2.default)(this, "getDestPath", function () {
    return _this.attributes.dest_path;
  });
  // string # Error type, if applicable
  (0, _defineProperty2.default)(this, "getErrorType", function () {
    return _this.attributes.error_type;
  });
  // string # Message
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  // string # Operation type
  (0, _defineProperty2.default)(this, "getOperation", function () {
    return _this.attributes.operation;
  });
  // string # File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  // string # Status
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // date-time # Start Time of Action
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
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
_AutomationLog = AutomationLog;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `automation_id`, `automation_run_id`, `operation`, `path`, `status` or `created_at`. Valid field combinations are `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ created_at ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_id, created_at ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ automation_run_id, created_at ]`, `[ operation, path ]`, `[ operation, status ]`, `[ operation, created_at ]`, `[ path, status ]`, `[ path, created_at ]`, `[ status, created_at ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, automation_run_id, created_at ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, operation, created_at ]`, `[ automation_id, path, status ]`, `[ automation_id, path, created_at ]`, `[ automation_id, status, created_at ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, operation, created_at ]`, `[ automation_run_id, path, status ]`, `[ automation_run_id, path, created_at ]`, `[ automation_run_id, status, created_at ]`, `[ operation, path, status ]`, `[ operation, path, created_at ]`, `[ operation, status, created_at ]`, `[ path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, operation, created_at ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, automation_run_id, path, created_at ]`, `[ automation_id, automation_run_id, status, created_at ]`, `[ automation_id, operation, path, status ]`, `[ automation_id, operation, path, created_at ]`, `[ automation_id, operation, status, created_at ]`, `[ automation_id, path, status, created_at ]`, `[ automation_run_id, operation, path, status ]`, `[ automation_run_id, operation, path, created_at ]`, `[ automation_run_id, operation, status, created_at ]`, `[ automation_run_id, path, status, created_at ]`, `[ operation, path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, created_at ]`, `[ automation_id, automation_run_id, operation, status, created_at ]`, `[ automation_id, automation_run_id, path, status, created_at ]`, `[ automation_id, operation, path, status, created_at ]`, `[ automation_run_id, operation, path, status, created_at ]` or `[ automation_id, automation_run_id, operation, path, status, created_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ created_at ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_id, created_at ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ automation_run_id, created_at ]`, `[ operation, path ]`, `[ operation, status ]`, `[ operation, created_at ]`, `[ path, status ]`, `[ path, created_at ]`, `[ status, created_at ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, automation_run_id, created_at ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, operation, created_at ]`, `[ automation_id, path, status ]`, `[ automation_id, path, created_at ]`, `[ automation_id, status, created_at ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, operation, created_at ]`, `[ automation_run_id, path, status ]`, `[ automation_run_id, path, created_at ]`, `[ automation_run_id, status, created_at ]`, `[ operation, path, status ]`, `[ operation, path, created_at ]`, `[ operation, status, created_at ]`, `[ path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, operation, created_at ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, automation_run_id, path, created_at ]`, `[ automation_id, automation_run_id, status, created_at ]`, `[ automation_id, operation, path, status ]`, `[ automation_id, operation, path, created_at ]`, `[ automation_id, operation, status, created_at ]`, `[ automation_id, path, status, created_at ]`, `[ automation_run_id, operation, path, status ]`, `[ automation_run_id, operation, path, created_at ]`, `[ automation_run_id, operation, status, created_at ]`, `[ automation_run_id, path, status, created_at ]`, `[ operation, path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, created_at ]`, `[ automation_id, automation_run_id, operation, status, created_at ]`, `[ automation_id, automation_run_id, path, status, created_at ]`, `[ automation_id, operation, path, status, created_at ]`, `[ automation_run_id, operation, path, status, created_at ]` or `[ automation_id, automation_run_id, operation, path, status, created_at ]`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ created_at ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_id, created_at ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ automation_run_id, created_at ]`, `[ operation, path ]`, `[ operation, status ]`, `[ operation, created_at ]`, `[ path, status ]`, `[ path, created_at ]`, `[ status, created_at ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, automation_run_id, created_at ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, operation, created_at ]`, `[ automation_id, path, status ]`, `[ automation_id, path, created_at ]`, `[ automation_id, status, created_at ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, operation, created_at ]`, `[ automation_run_id, path, status ]`, `[ automation_run_id, path, created_at ]`, `[ automation_run_id, status, created_at ]`, `[ operation, path, status ]`, `[ operation, path, created_at ]`, `[ operation, status, created_at ]`, `[ path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, operation, created_at ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, automation_run_id, path, created_at ]`, `[ automation_id, automation_run_id, status, created_at ]`, `[ automation_id, operation, path, status ]`, `[ automation_id, operation, path, created_at ]`, `[ automation_id, operation, status, created_at ]`, `[ automation_id, path, status, created_at ]`, `[ automation_run_id, operation, path, status ]`, `[ automation_run_id, operation, path, created_at ]`, `[ automation_run_id, operation, status, created_at ]`, `[ automation_run_id, path, status, created_at ]`, `[ operation, path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, created_at ]`, `[ automation_id, automation_run_id, operation, status, created_at ]`, `[ automation_id, automation_run_id, path, status, created_at ]`, `[ automation_id, operation, path, status, created_at ]`, `[ automation_run_id, operation, path, status, created_at ]` or `[ automation_id, automation_run_id, operation, path, status, created_at ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `operation`, `path` or `status`. Valid field combinations are `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ created_at ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_id, created_at ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ automation_run_id, created_at ]`, `[ operation, path ]`, `[ operation, status ]`, `[ operation, created_at ]`, `[ path, status ]`, `[ path, created_at ]`, `[ status, created_at ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, automation_run_id, created_at ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, operation, created_at ]`, `[ automation_id, path, status ]`, `[ automation_id, path, created_at ]`, `[ automation_id, status, created_at ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, operation, created_at ]`, `[ automation_run_id, path, status ]`, `[ automation_run_id, path, created_at ]`, `[ automation_run_id, status, created_at ]`, `[ operation, path, status ]`, `[ operation, path, created_at ]`, `[ operation, status, created_at ]`, `[ path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, operation, created_at ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, automation_run_id, path, created_at ]`, `[ automation_id, automation_run_id, status, created_at ]`, `[ automation_id, operation, path, status ]`, `[ automation_id, operation, path, created_at ]`, `[ automation_id, operation, status, created_at ]`, `[ automation_id, path, status, created_at ]`, `[ automation_run_id, operation, path, status ]`, `[ automation_run_id, operation, path, created_at ]`, `[ automation_run_id, operation, status, created_at ]`, `[ automation_run_id, path, status, created_at ]`, `[ operation, path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, created_at ]`, `[ automation_id, automation_run_id, operation, status, created_at ]`, `[ automation_id, automation_run_id, path, status, created_at ]`, `[ automation_id, operation, path, status, created_at ]`, `[ automation_run_id, operation, path, status, created_at ]` or `[ automation_id, automation_run_id, operation, path, status, created_at ]`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ created_at ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_id, created_at ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ automation_run_id, created_at ]`, `[ operation, path ]`, `[ operation, status ]`, `[ operation, created_at ]`, `[ path, status ]`, `[ path, created_at ]`, `[ status, created_at ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, automation_run_id, created_at ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, operation, created_at ]`, `[ automation_id, path, status ]`, `[ automation_id, path, created_at ]`, `[ automation_id, status, created_at ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, operation, created_at ]`, `[ automation_run_id, path, status ]`, `[ automation_run_id, path, created_at ]`, `[ automation_run_id, status, created_at ]`, `[ operation, path, status ]`, `[ operation, path, created_at ]`, `[ operation, status, created_at ]`, `[ path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, operation, created_at ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, automation_run_id, path, created_at ]`, `[ automation_id, automation_run_id, status, created_at ]`, `[ automation_id, operation, path, status ]`, `[ automation_id, operation, path, created_at ]`, `[ automation_id, operation, status, created_at ]`, `[ automation_id, path, status, created_at ]`, `[ automation_run_id, operation, path, status ]`, `[ automation_run_id, operation, path, created_at ]`, `[ automation_run_id, operation, status, created_at ]`, `[ automation_run_id, path, status, created_at ]`, `[ operation, path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, created_at ]`, `[ automation_id, automation_run_id, operation, status, created_at ]`, `[ automation_id, automation_run_id, path, status, created_at ]`, `[ automation_id, operation, path, status, created_at ]`, `[ automation_run_id, operation, path, status, created_at ]` or `[ automation_id, automation_run_id, operation, path, status, created_at ]`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ created_at ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_id, created_at ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ automation_run_id, created_at ]`, `[ operation, path ]`, `[ operation, status ]`, `[ operation, created_at ]`, `[ path, status ]`, `[ path, created_at ]`, `[ status, created_at ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, automation_run_id, created_at ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, operation, created_at ]`, `[ automation_id, path, status ]`, `[ automation_id, path, created_at ]`, `[ automation_id, status, created_at ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, operation, created_at ]`, `[ automation_run_id, path, status ]`, `[ automation_run_id, path, created_at ]`, `[ automation_run_id, status, created_at ]`, `[ operation, path, status ]`, `[ operation, path, created_at ]`, `[ operation, status, created_at ]`, `[ path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, operation, created_at ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, automation_run_id, path, created_at ]`, `[ automation_id, automation_run_id, status, created_at ]`, `[ automation_id, operation, path, status ]`, `[ automation_id, operation, path, created_at ]`, `[ automation_id, operation, status, created_at ]`, `[ automation_id, path, status, created_at ]`, `[ automation_run_id, operation, path, status ]`, `[ automation_run_id, operation, path, created_at ]`, `[ automation_run_id, operation, status, created_at ]`, `[ automation_run_id, path, status, created_at ]`, `[ operation, path, status, created_at ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, created_at ]`, `[ automation_id, automation_run_id, operation, status, created_at ]`, `[ automation_id, automation_run_id, path, status, created_at ]`, `[ automation_id, operation, path, status, created_at ]`, `[ automation_run_id, operation, path, status, created_at ]` or `[ automation_id, automation_run_id, operation, path, status, created_at ]`.
(0, _defineProperty2.default)(AutomationLog, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context.next = 3;
        return _Api.default.sendRequest('/automation_logs', 'GET', params, options);
      case 3:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _AutomationLog(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(AutomationLog, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _AutomationLog.list(params, options);
});
var _default = exports.default = AutomationLog;
module.exports = AutomationLog;
module.exports.default = AutomationLog;