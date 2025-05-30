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
var _UsageDailySnapshot;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class UsageDailySnapshot
 */
var UsageDailySnapshot = /*#__PURE__*/(0, _createClass2.default)(function UsageDailySnapshot() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, UsageDailySnapshot);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # ID of the usage record
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // date # The date of this usage record
  (0, _defineProperty2.default)(this, "getDate", function () {
    return _this.attributes.date;
  });
  // boolean # True if the API usage fields `read_api_usage` and `write_api_usage` can be relied upon.  If this is false, we suggest hiding that value from any UI.
  (0, _defineProperty2.default)(this, "getApiUsageAvailable", function () {
    return _this.attributes.api_usage_available;
  });
  // int64 # Read API Calls used on this day. Note: only updated for days before the current day.
  (0, _defineProperty2.default)(this, "getReadApiUsage", function () {
    return _this.attributes.read_api_usage;
  });
  // int64 # Write API Calls used on this day. Note: only updated for days before the current day.
  (0, _defineProperty2.default)(this, "getWriteApiUsage", function () {
    return _this.attributes.write_api_usage;
  });
  // int64 # Number of billable users as of this day.
  (0, _defineProperty2.default)(this, "getUserCount", function () {
    return _this.attributes.user_count;
  });
  // double # GB of Files Native Storage used on this day.
  (0, _defineProperty2.default)(this, "getCurrentStorage", function () {
    return _this.attributes.current_storage;
  });
  // double # GB of Files Native Storage used on this day for files that have been deleted and are stored as backups.
  (0, _defineProperty2.default)(this, "getDeletedFilesStorage", function () {
    return _this.attributes.deleted_files_storage;
  });
  // double # GB of Files Native Storage used on this day for files that have been permanently deleted but were uploaded less than 30 days ago, and are still billable.
  (0, _defineProperty2.default)(this, "getDeletedFilesCountedInMinimum", function () {
    return _this.attributes.deleted_files_counted_in_minimum;
  });
  // double # GB of Files Native Storage used for the root folder.  Included here because this value will not be part of `usage_by_top_level_dir`
  (0, _defineProperty2.default)(this, "getRootStorage", function () {
    return _this.attributes.root_storage;
  });
  // array(object) # Usage broken down by each top-level folder
  (0, _defineProperty2.default)(this, "getUsageByTopLevelDir", function () {
    return _this.attributes.usage_by_top_level_dir;
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
_UsageDailySnapshot = UsageDailySnapshot;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `date`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`. Valid field combinations are `[ usage_snapshot_id, date ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `date`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `date`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `date`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `date`.
(0, _defineProperty2.default)(UsageDailySnapshot, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        return _Api.default.sendRequest('/usage_daily_snapshots', 'GET', params, options);
      case 3:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _UsageDailySnapshot(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(UsageDailySnapshot, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _UsageDailySnapshot.list(params, options);
});
var _default = exports.default = UsageDailySnapshot;
module.exports = UsageDailySnapshot;
module.exports.default = UsageDailySnapshot;