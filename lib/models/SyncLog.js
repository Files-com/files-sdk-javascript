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
var _SyncLog;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class SyncLog
 */
var SyncLog = /*#__PURE__*/(0, _createClass2.default)(function SyncLog() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, SyncLog);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // date-time # Start Time of Action. Deprecrated: Use created_at.
  (0, _defineProperty2.default)(this, "getTimestamp", function () {
    return _this.attributes.timestamp;
  });
  // int64 # Sync ID
  (0, _defineProperty2.default)(this, "getSyncId", function () {
    return _this.attributes.sync_id;
  });
  // int64 # External Event ID used by legacy syncs
  (0, _defineProperty2.default)(this, "getExternalEventId", function () {
    return _this.attributes.external_event_id;
  });
  // int64 # Sync Run ID
  (0, _defineProperty2.default)(this, "getSyncRunId", function () {
    return _this.attributes.sync_run_id;
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
  // int64 # File size
  (0, _defineProperty2.default)(this, "getSize", function () {
    return _this.attributes.size;
  });
  // string # File type
  (0, _defineProperty2.default)(this, "getFileType", function () {
    return _this.attributes.file_type;
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
_SyncLog = SyncLog;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `external_event_id`, `operation`, `status`, `sync_id`, `created_at` or `sync_run_id`. Valid field combinations are `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ created_at ]`, `[ sync_run_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ external_event_id, created_at ]`, `[ external_event_id, sync_run_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ operation, created_at ]`, `[ operation, sync_run_id ]`, `[ status, sync_id ]`, `[ status, created_at ]`, `[ status, sync_run_id ]`, `[ sync_id, created_at ]`, `[ sync_id, sync_run_id ]`, `[ created_at, sync_run_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, operation, created_at ]`, `[ external_event_id, operation, sync_run_id ]`, `[ external_event_id, status, sync_id ]`, `[ external_event_id, status, created_at ]`, `[ external_event_id, status, sync_run_id ]`, `[ external_event_id, sync_id, created_at ]`, `[ external_event_id, sync_id, sync_run_id ]`, `[ external_event_id, created_at, sync_run_id ]`, `[ operation, status, sync_id ]`, `[ operation, status, created_at ]`, `[ operation, status, sync_run_id ]`, `[ operation, sync_id, created_at ]`, `[ operation, sync_id, sync_run_id ]`, `[ operation, created_at, sync_run_id ]`, `[ status, sync_id, created_at ]`, `[ status, sync_id, sync_run_id ]`, `[ status, created_at, sync_run_id ]`, `[ sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ external_event_id, operation, status, created_at ]`, `[ external_event_id, operation, status, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at ]`, `[ external_event_id, operation, sync_id, sync_run_id ]`, `[ external_event_id, operation, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at ]`, `[ external_event_id, status, sync_id, sync_run_id ]`, `[ external_event_id, status, created_at, sync_run_id ]`, `[ external_event_id, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at ]`, `[ operation, status, sync_id, sync_run_id ]`, `[ operation, status, created_at, sync_run_id ]`, `[ operation, sync_id, created_at, sync_run_id ]`, `[ status, sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id, created_at ]`, `[ external_event_id, operation, status, sync_id, sync_run_id ]`, `[ external_event_id, operation, status, created_at, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at, sync_run_id ]` or `[ external_event_id, operation, status, sync_id, created_at, sync_run_id ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ created_at ]`, `[ sync_run_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ external_event_id, created_at ]`, `[ external_event_id, sync_run_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ operation, created_at ]`, `[ operation, sync_run_id ]`, `[ status, sync_id ]`, `[ status, created_at ]`, `[ status, sync_run_id ]`, `[ sync_id, created_at ]`, `[ sync_id, sync_run_id ]`, `[ created_at, sync_run_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, operation, created_at ]`, `[ external_event_id, operation, sync_run_id ]`, `[ external_event_id, status, sync_id ]`, `[ external_event_id, status, created_at ]`, `[ external_event_id, status, sync_run_id ]`, `[ external_event_id, sync_id, created_at ]`, `[ external_event_id, sync_id, sync_run_id ]`, `[ external_event_id, created_at, sync_run_id ]`, `[ operation, status, sync_id ]`, `[ operation, status, created_at ]`, `[ operation, status, sync_run_id ]`, `[ operation, sync_id, created_at ]`, `[ operation, sync_id, sync_run_id ]`, `[ operation, created_at, sync_run_id ]`, `[ status, sync_id, created_at ]`, `[ status, sync_id, sync_run_id ]`, `[ status, created_at, sync_run_id ]`, `[ sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ external_event_id, operation, status, created_at ]`, `[ external_event_id, operation, status, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at ]`, `[ external_event_id, operation, sync_id, sync_run_id ]`, `[ external_event_id, operation, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at ]`, `[ external_event_id, status, sync_id, sync_run_id ]`, `[ external_event_id, status, created_at, sync_run_id ]`, `[ external_event_id, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at ]`, `[ operation, status, sync_id, sync_run_id ]`, `[ operation, status, created_at, sync_run_id ]`, `[ operation, sync_id, created_at, sync_run_id ]`, `[ status, sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id, created_at ]`, `[ external_event_id, operation, status, sync_id, sync_run_id ]`, `[ external_event_id, operation, status, created_at, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at, sync_run_id ]` or `[ external_event_id, operation, status, sync_id, created_at, sync_run_id ]`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ created_at ]`, `[ sync_run_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ external_event_id, created_at ]`, `[ external_event_id, sync_run_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ operation, created_at ]`, `[ operation, sync_run_id ]`, `[ status, sync_id ]`, `[ status, created_at ]`, `[ status, sync_run_id ]`, `[ sync_id, created_at ]`, `[ sync_id, sync_run_id ]`, `[ created_at, sync_run_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, operation, created_at ]`, `[ external_event_id, operation, sync_run_id ]`, `[ external_event_id, status, sync_id ]`, `[ external_event_id, status, created_at ]`, `[ external_event_id, status, sync_run_id ]`, `[ external_event_id, sync_id, created_at ]`, `[ external_event_id, sync_id, sync_run_id ]`, `[ external_event_id, created_at, sync_run_id ]`, `[ operation, status, sync_id ]`, `[ operation, status, created_at ]`, `[ operation, status, sync_run_id ]`, `[ operation, sync_id, created_at ]`, `[ operation, sync_id, sync_run_id ]`, `[ operation, created_at, sync_run_id ]`, `[ status, sync_id, created_at ]`, `[ status, sync_id, sync_run_id ]`, `[ status, created_at, sync_run_id ]`, `[ sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ external_event_id, operation, status, created_at ]`, `[ external_event_id, operation, status, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at ]`, `[ external_event_id, operation, sync_id, sync_run_id ]`, `[ external_event_id, operation, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at ]`, `[ external_event_id, status, sync_id, sync_run_id ]`, `[ external_event_id, status, created_at, sync_run_id ]`, `[ external_event_id, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at ]`, `[ operation, status, sync_id, sync_run_id ]`, `[ operation, status, created_at, sync_run_id ]`, `[ operation, sync_id, created_at, sync_run_id ]`, `[ status, sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id, created_at ]`, `[ external_event_id, operation, status, sync_id, sync_run_id ]`, `[ external_event_id, operation, status, created_at, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at, sync_run_id ]` or `[ external_event_id, operation, status, sync_id, created_at, sync_run_id ]`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ created_at ]`, `[ sync_run_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ external_event_id, created_at ]`, `[ external_event_id, sync_run_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ operation, created_at ]`, `[ operation, sync_run_id ]`, `[ status, sync_id ]`, `[ status, created_at ]`, `[ status, sync_run_id ]`, `[ sync_id, created_at ]`, `[ sync_id, sync_run_id ]`, `[ created_at, sync_run_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, operation, created_at ]`, `[ external_event_id, operation, sync_run_id ]`, `[ external_event_id, status, sync_id ]`, `[ external_event_id, status, created_at ]`, `[ external_event_id, status, sync_run_id ]`, `[ external_event_id, sync_id, created_at ]`, `[ external_event_id, sync_id, sync_run_id ]`, `[ external_event_id, created_at, sync_run_id ]`, `[ operation, status, sync_id ]`, `[ operation, status, created_at ]`, `[ operation, status, sync_run_id ]`, `[ operation, sync_id, created_at ]`, `[ operation, sync_id, sync_run_id ]`, `[ operation, created_at, sync_run_id ]`, `[ status, sync_id, created_at ]`, `[ status, sync_id, sync_run_id ]`, `[ status, created_at, sync_run_id ]`, `[ sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ external_event_id, operation, status, created_at ]`, `[ external_event_id, operation, status, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at ]`, `[ external_event_id, operation, sync_id, sync_run_id ]`, `[ external_event_id, operation, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at ]`, `[ external_event_id, status, sync_id, sync_run_id ]`, `[ external_event_id, status, created_at, sync_run_id ]`, `[ external_event_id, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at ]`, `[ operation, status, sync_id, sync_run_id ]`, `[ operation, status, created_at, sync_run_id ]`, `[ operation, sync_id, created_at, sync_run_id ]`, `[ status, sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id, created_at ]`, `[ external_event_id, operation, status, sync_id, sync_run_id ]`, `[ external_event_id, operation, status, created_at, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at, sync_run_id ]` or `[ external_event_id, operation, status, sync_id, created_at, sync_run_id ]`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ external_event_id ]`, `[ operation ]`, `[ status ]`, `[ sync_id ]`, `[ created_at ]`, `[ sync_run_id ]`, `[ external_event_id, operation ]`, `[ external_event_id, status ]`, `[ external_event_id, sync_id ]`, `[ external_event_id, created_at ]`, `[ external_event_id, sync_run_id ]`, `[ operation, status ]`, `[ operation, sync_id ]`, `[ operation, created_at ]`, `[ operation, sync_run_id ]`, `[ status, sync_id ]`, `[ status, created_at ]`, `[ status, sync_run_id ]`, `[ sync_id, created_at ]`, `[ sync_id, sync_run_id ]`, `[ created_at, sync_run_id ]`, `[ external_event_id, operation, status ]`, `[ external_event_id, operation, sync_id ]`, `[ external_event_id, operation, created_at ]`, `[ external_event_id, operation, sync_run_id ]`, `[ external_event_id, status, sync_id ]`, `[ external_event_id, status, created_at ]`, `[ external_event_id, status, sync_run_id ]`, `[ external_event_id, sync_id, created_at ]`, `[ external_event_id, sync_id, sync_run_id ]`, `[ external_event_id, created_at, sync_run_id ]`, `[ operation, status, sync_id ]`, `[ operation, status, created_at ]`, `[ operation, status, sync_run_id ]`, `[ operation, sync_id, created_at ]`, `[ operation, sync_id, sync_run_id ]`, `[ operation, created_at, sync_run_id ]`, `[ status, sync_id, created_at ]`, `[ status, sync_id, sync_run_id ]`, `[ status, created_at, sync_run_id ]`, `[ sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id ]`, `[ external_event_id, operation, status, created_at ]`, `[ external_event_id, operation, status, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at ]`, `[ external_event_id, operation, sync_id, sync_run_id ]`, `[ external_event_id, operation, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at ]`, `[ external_event_id, status, sync_id, sync_run_id ]`, `[ external_event_id, status, created_at, sync_run_id ]`, `[ external_event_id, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at ]`, `[ operation, status, sync_id, sync_run_id ]`, `[ operation, status, created_at, sync_run_id ]`, `[ operation, sync_id, created_at, sync_run_id ]`, `[ status, sync_id, created_at, sync_run_id ]`, `[ external_event_id, operation, status, sync_id, created_at ]`, `[ external_event_id, operation, status, sync_id, sync_run_id ]`, `[ external_event_id, operation, status, created_at, sync_run_id ]`, `[ external_event_id, operation, sync_id, created_at, sync_run_id ]`, `[ external_event_id, status, sync_id, created_at, sync_run_id ]`, `[ operation, status, sync_id, created_at, sync_run_id ]` or `[ external_event_id, operation, status, sync_id, created_at, sync_run_id ]`.
(0, _defineProperty2.default)(SyncLog, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        return _Api.default.sendRequest('/sync_logs', 'GET', params, options);
      case 3:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _SyncLog(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(SyncLog, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _SyncLog.list(params, options);
});
var _default = exports.default = SyncLog;
module.exports = SyncLog;
module.exports.default = SyncLog;