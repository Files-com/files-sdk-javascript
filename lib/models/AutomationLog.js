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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  // date-time # Start Time of Action
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
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date`, `automation_id`, `automation_run_id`, `operation`, `path` or `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, automation_id ]`, `[ start_date, automation_run_id ]`, `[ start_date, operation ]`, `[ start_date, path ]`, `[ start_date, status ]`, `[ end_date, automation_id ]`, `[ end_date, automation_run_id ]`, `[ end_date, operation ]`, `[ end_date, path ]`, `[ end_date, status ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ operation, path ]`, `[ operation, status ]`, `[ path, status ]`, `[ start_date, end_date, automation_id ]`, `[ start_date, end_date, automation_run_id ]`, `[ start_date, end_date, operation ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, status ]`, `[ start_date, automation_id, automation_run_id ]`, `[ start_date, automation_id, operation ]`, `[ start_date, automation_id, path ]`, `[ start_date, automation_id, status ]`, `[ start_date, automation_run_id, operation ]`, `[ start_date, automation_run_id, path ]`, `[ start_date, automation_run_id, status ]`, `[ start_date, operation, path ]`, `[ start_date, operation, status ]`, `[ start_date, path, status ]`, `[ end_date, automation_id, automation_run_id ]`, `[ end_date, automation_id, operation ]`, `[ end_date, automation_id, path ]`, `[ end_date, automation_id, status ]`, `[ end_date, automation_run_id, operation ]`, `[ end_date, automation_run_id, path ]`, `[ end_date, automation_run_id, status ]`, `[ end_date, operation, path ]`, `[ end_date, operation, status ]`, `[ end_date, path, status ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, path, status ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, path, status ]`, `[ operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id ]`, `[ start_date, end_date, automation_id, operation ]`, `[ start_date, end_date, automation_id, path ]`, `[ start_date, end_date, automation_id, status ]`, `[ start_date, end_date, automation_run_id, operation ]`, `[ start_date, end_date, automation_run_id, path ]`, `[ start_date, end_date, automation_run_id, status ]`, `[ start_date, end_date, operation, path ]`, `[ start_date, end_date, operation, status ]`, `[ start_date, end_date, path, status ]`, `[ start_date, automation_id, automation_run_id, operation ]`, `[ start_date, automation_id, automation_run_id, path ]`, `[ start_date, automation_id, automation_run_id, status ]`, `[ start_date, automation_id, operation, path ]`, `[ start_date, automation_id, operation, status ]`, `[ start_date, automation_id, path, status ]`, `[ start_date, automation_run_id, operation, path ]`, `[ start_date, automation_run_id, operation, status ]`, `[ start_date, automation_run_id, path, status ]`, `[ start_date, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation ]`, `[ end_date, automation_id, automation_run_id, path ]`, `[ end_date, automation_id, automation_run_id, status ]`, `[ end_date, automation_id, operation, path ]`, `[ end_date, automation_id, operation, status ]`, `[ end_date, automation_id, path, status ]`, `[ end_date, automation_run_id, operation, path ]`, `[ end_date, automation_run_id, operation, status ]`, `[ end_date, automation_run_id, path, status ]`, `[ end_date, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, operation, path, status ]`, `[ automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation ]`, `[ start_date, end_date, automation_id, automation_run_id, path ]`, `[ start_date, end_date, automation_id, automation_run_id, status ]`, `[ start_date, end_date, automation_id, operation, path ]`, `[ start_date, end_date, automation_id, operation, status ]`, `[ start_date, end_date, automation_id, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_run_id, path, status ]`, `[ start_date, end_date, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, automation_id, automation_run_id, path, status ]`, `[ start_date, automation_id, operation, path, status ]`, `[ start_date, automation_run_id, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation, path ]`, `[ end_date, automation_id, automation_run_id, operation, status ]`, `[ end_date, automation_id, automation_run_id, path, status ]`, `[ end_date, automation_id, operation, path, status ]`, `[ end_date, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_id, automation_run_id, path, status ]`, `[ start_date, end_date, automation_id, operation, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path, status ]` or `[ end_date, automation_id, automation_run_id, operation, path, status ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `operation`, `path` or `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, automation_id ]`, `[ start_date, automation_run_id ]`, `[ start_date, operation ]`, `[ start_date, path ]`, `[ start_date, status ]`, `[ end_date, automation_id ]`, `[ end_date, automation_run_id ]`, `[ end_date, operation ]`, `[ end_date, path ]`, `[ end_date, status ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ operation, path ]`, `[ operation, status ]`, `[ path, status ]`, `[ start_date, end_date, automation_id ]`, `[ start_date, end_date, automation_run_id ]`, `[ start_date, end_date, operation ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, status ]`, `[ start_date, automation_id, automation_run_id ]`, `[ start_date, automation_id, operation ]`, `[ start_date, automation_id, path ]`, `[ start_date, automation_id, status ]`, `[ start_date, automation_run_id, operation ]`, `[ start_date, automation_run_id, path ]`, `[ start_date, automation_run_id, status ]`, `[ start_date, operation, path ]`, `[ start_date, operation, status ]`, `[ start_date, path, status ]`, `[ end_date, automation_id, automation_run_id ]`, `[ end_date, automation_id, operation ]`, `[ end_date, automation_id, path ]`, `[ end_date, automation_id, status ]`, `[ end_date, automation_run_id, operation ]`, `[ end_date, automation_run_id, path ]`, `[ end_date, automation_run_id, status ]`, `[ end_date, operation, path ]`, `[ end_date, operation, status ]`, `[ end_date, path, status ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, path, status ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, path, status ]`, `[ operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id ]`, `[ start_date, end_date, automation_id, operation ]`, `[ start_date, end_date, automation_id, path ]`, `[ start_date, end_date, automation_id, status ]`, `[ start_date, end_date, automation_run_id, operation ]`, `[ start_date, end_date, automation_run_id, path ]`, `[ start_date, end_date, automation_run_id, status ]`, `[ start_date, end_date, operation, path ]`, `[ start_date, end_date, operation, status ]`, `[ start_date, end_date, path, status ]`, `[ start_date, automation_id, automation_run_id, operation ]`, `[ start_date, automation_id, automation_run_id, path ]`, `[ start_date, automation_id, automation_run_id, status ]`, `[ start_date, automation_id, operation, path ]`, `[ start_date, automation_id, operation, status ]`, `[ start_date, automation_id, path, status ]`, `[ start_date, automation_run_id, operation, path ]`, `[ start_date, automation_run_id, operation, status ]`, `[ start_date, automation_run_id, path, status ]`, `[ start_date, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation ]`, `[ end_date, automation_id, automation_run_id, path ]`, `[ end_date, automation_id, automation_run_id, status ]`, `[ end_date, automation_id, operation, path ]`, `[ end_date, automation_id, operation, status ]`, `[ end_date, automation_id, path, status ]`, `[ end_date, automation_run_id, operation, path ]`, `[ end_date, automation_run_id, operation, status ]`, `[ end_date, automation_run_id, path, status ]`, `[ end_date, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, operation, path, status ]`, `[ automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation ]`, `[ start_date, end_date, automation_id, automation_run_id, path ]`, `[ start_date, end_date, automation_id, automation_run_id, status ]`, `[ start_date, end_date, automation_id, operation, path ]`, `[ start_date, end_date, automation_id, operation, status ]`, `[ start_date, end_date, automation_id, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_run_id, path, status ]`, `[ start_date, end_date, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, automation_id, automation_run_id, path, status ]`, `[ start_date, automation_id, operation, path, status ]`, `[ start_date, automation_run_id, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation, path ]`, `[ end_date, automation_id, automation_run_id, operation, status ]`, `[ end_date, automation_id, automation_run_id, path, status ]`, `[ end_date, automation_id, operation, path, status ]`, `[ end_date, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_id, automation_run_id, path, status ]`, `[ start_date, end_date, automation_id, operation, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path, status ]` or `[ end_date, automation_id, automation_run_id, operation, path, status ]`.
(0, _defineProperty2.default)(AutomationLog, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        _context.next = 8;
        return _Api.default.sendRequest('/automation_logs', 'GET', params, options);
      case 8:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _AutomationLog(obj, options);
        })) || []);
      case 10:
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