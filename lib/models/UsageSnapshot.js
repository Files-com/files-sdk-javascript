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
 * Class UsageSnapshot
 */
var UsageSnapshot = /*#__PURE__*/(0, _createClass2.default)(function UsageSnapshot() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, UsageSnapshot);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Usage snapshot ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // date-time # Usage snapshot start date/time
  (0, _defineProperty2.default)(this, "getStartAt", function () {
    return _this.attributes.start_at;
  });
  // date-time # Usage snapshot end date/time
  (0, _defineProperty2.default)(this, "getEndAt", function () {
    return _this.attributes.end_at;
  });
  // double # Highest user count number in time period
  (0, _defineProperty2.default)(this, "getHighWaterUserCount", function () {
    return _this.attributes.high_water_user_count;
  });
  // double # Current total Storage Usage GB as of end date (not necessarily high water mark, which is used for billing)
  (0, _defineProperty2.default)(this, "getCurrentStorage", function () {
    return _this.attributes.current_storage;
  });
  // double # Highest Storage Usage GB recorded in time period (used for billing)
  (0, _defineProperty2.default)(this, "getHighWaterStorage", function () {
    return _this.attributes.high_water_storage;
  });
  // object # Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used for billing)
  (0, _defineProperty2.default)(this, "getUsageByTopLevelDir", function () {
    return _this.attributes.usage_by_top_level_dir;
  });
  // double # Storage Usage for root folder as of end date (not necessarily high water mark, which is used for billing)
  (0, _defineProperty2.default)(this, "getRootStorage", function () {
    return _this.attributes.root_storage;
  });
  // double # Storage Usage for files that are deleted but uploaded within last 30 days as of end date (not necessarily high water mark, which is used for billing)
  (0, _defineProperty2.default)(this, "getDeletedFilesCountedInMinimum", function () {
    return _this.attributes.deleted_files_counted_in_minimum;
  });
  // double # Storage Usage for files that are deleted but retained as backups as of end date (not necessarily high water mark, which is used for billing)
  (0, _defineProperty2.default)(this, "getDeletedFilesStorage", function () {
    return _this.attributes.deleted_files_storage;
  });
  // double # Storage + Transfer Usage - Total Billable amount
  (0, _defineProperty2.default)(this, "getTotalBillableUsage", function () {
    return _this.attributes.total_billable_usage;
  });
  // double # Transfer usage for period - Total Billable amount
  (0, _defineProperty2.default)(this, "getTotalBillableTransferUsage", function () {
    return _this.attributes.total_billable_transfer_usage;
  });
  // double # Transfer Usage for period - Outbound GB from Files Native Storage
  (0, _defineProperty2.default)(this, "getBytesSent", function () {
    return _this.attributes.bytes_sent;
  });
  // double # Transfer Usage for period - Inbound GB to Remote Servers (Sync/Mount)
  (0, _defineProperty2.default)(this, "getSyncBytesReceived", function () {
    return _this.attributes.sync_bytes_received;
  });
  // double # Transfer Usage for period - Outbound GB from Remote Servers (Sync/Mount)
  (0, _defineProperty2.default)(this, "getSyncBytesSent", function () {
    return _this.attributes.sync_bytes_sent;
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
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(UsageSnapshot, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 4:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 6:
        _context.next = 8;
        return _Api.default.sendRequest("/usage_snapshots", 'GET', params, options);
      case 8:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new UsageSnapshot(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(UsageSnapshot, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return UsageSnapshot.list(params, options);
});
var _default = UsageSnapshot;
exports.default = _default;