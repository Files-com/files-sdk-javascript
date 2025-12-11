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
var _Sync;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class Sync
 */
var Sync = /*#__PURE__*/(0, _createClass2.default)(function Sync() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Sync);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Sync ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Name for this sync job
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Description for this sync job
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // int64 # Site ID this sync belongs to
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
  });
  // int64 # User who created or owns this sync
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // string # Absolute source path for the sync
  (0, _defineProperty2.default)(this, "getSrcPath", function () {
    return _this.attributes.src_path;
  });
  (0, _defineProperty2.default)(this, "setSrcPath", function (value) {
    _this.attributes.src_path = value;
  });
  // string # Absolute destination path for the sync
  (0, _defineProperty2.default)(this, "getDestPath", function () {
    return _this.attributes.dest_path;
  });
  (0, _defineProperty2.default)(this, "setDestPath", function (value) {
    _this.attributes.dest_path = value;
  });
  // int64 # Remote server ID for the source (if remote)
  (0, _defineProperty2.default)(this, "getSrcRemoteServerId", function () {
    return _this.attributes.src_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setSrcRemoteServerId", function (value) {
    _this.attributes.src_remote_server_id = value;
  });
  // int64 # Remote server ID for the destination (if remote)
  (0, _defineProperty2.default)(this, "getDestRemoteServerId", function () {
    return _this.attributes.dest_remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setDestRemoteServerId", function (value) {
    _this.attributes.dest_remote_server_id = value;
  });
  // boolean # Is this a two-way sync?
  (0, _defineProperty2.default)(this, "getTwoWay", function () {
    return _this.attributes.two_way;
  });
  (0, _defineProperty2.default)(this, "setTwoWay", function (value) {
    _this.attributes.two_way = value;
  });
  // boolean # Keep files after copying?
  (0, _defineProperty2.default)(this, "getKeepAfterCopy", function () {
    return _this.attributes.keep_after_copy;
  });
  (0, _defineProperty2.default)(this, "setKeepAfterCopy", function (value) {
    _this.attributes.keep_after_copy = value;
  });
  // boolean # Delete empty folders after sync?
  (0, _defineProperty2.default)(this, "getDeleteEmptyFolders", function () {
    return _this.attributes.delete_empty_folders;
  });
  (0, _defineProperty2.default)(this, "setDeleteEmptyFolders", function (value) {
    _this.attributes.delete_empty_folders = value;
  });
  // boolean # Is this sync disabled?
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  // string # Trigger type: daily, custom_schedule, or manual
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
  });
  // string # Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  (0, _defineProperty2.default)(this, "getTriggerFile", function () {
    return _this.attributes.trigger_file;
  });
  (0, _defineProperty2.default)(this, "setTriggerFile", function (value) {
    _this.attributes.trigger_file = value;
  });
  // array(string) # Array of glob patterns to include
  (0, _defineProperty2.default)(this, "getIncludePatterns", function () {
    return _this.attributes.include_patterns;
  });
  (0, _defineProperty2.default)(this, "setIncludePatterns", function (value) {
    _this.attributes.include_patterns = value;
  });
  // array(string) # Array of glob patterns to exclude
  (0, _defineProperty2.default)(this, "getExcludePatterns", function () {
    return _this.attributes.exclude_patterns;
  });
  (0, _defineProperty2.default)(this, "setExcludePatterns", function (value) {
    _this.attributes.exclude_patterns = value;
  });
  // date-time # When this sync was created
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # When this sync was last updated
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  // int64 # Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
  (0, _defineProperty2.default)(this, "getSyncIntervalMinutes", function () {
    return _this.attributes.sync_interval_minutes;
  });
  (0, _defineProperty2.default)(this, "setSyncIntervalMinutes", function (value) {
    _this.attributes.sync_interval_minutes = value;
  });
  // string # If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
  });
  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  (0, _defineProperty2.default)(this, "getRecurringDay", function () {
    return _this.attributes.recurring_day;
  });
  (0, _defineProperty2.default)(this, "setRecurringDay", function (value) {
    _this.attributes.recurring_day = value;
  });
  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  (0, _defineProperty2.default)(this, "getScheduleDaysOfWeek", function () {
    return _this.attributes.schedule_days_of_week;
  });
  (0, _defineProperty2.default)(this, "setScheduleDaysOfWeek", function (value) {
    _this.attributes.schedule_days_of_week = value;
  });
  // array(string) # If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. Times of day in HH:MM format.
  (0, _defineProperty2.default)(this, "getScheduleTimesOfDay", function () {
    return _this.attributes.schedule_times_of_day;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimesOfDay", function (value) {
    _this.attributes.schedule_times_of_day = value;
  });
  // string # If trigger is `custom_schedule`, Custom schedule Time Zone for when the sync should be run.
  (0, _defineProperty2.default)(this, "getScheduleTimeZone", function () {
    return _this.attributes.schedule_time_zone;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimeZone", function (value) {
    _this.attributes.schedule_time_zone = value;
  });
  // string # If trigger is `custom_schedule`, the sync will check if there is a formal, observed holiday for the region, and if so, it will not run.
  (0, _defineProperty2.default)(this, "getHolidayRegion", function () {
    return _this.attributes.holiday_region;
  });
  (0, _defineProperty2.default)(this, "setHolidayRegion", function (value) {
    _this.attributes.holiday_region = value;
  });
  // SyncRun # The latest run of this sync
  (0, _defineProperty2.default)(this, "getLatestSyncRun", function () {
    return _this.attributes.latest_sync_run;
  });
  (0, _defineProperty2.default)(this, "setLatestSyncRun", function (value) {
    _this.attributes.latest_sync_run = value;
  });
  // Dry Run Sync
  (0, _defineProperty2.default)(this, "dryRun", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          params.id = _this.id;
          _context.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context.next = 6;
          return _Api.default.sendRequest("/syncs/".concat(encodeURIComponent(params.id), "/dry_run"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Manually Run Sync
  (0, _defineProperty2.default)(this, "manualRun", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context2.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 4;
            break;
          }
          params.id = _this.id;
          _context2.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context2.next = 6;
          return _Api.default.sendRequest("/syncs/".concat(encodeURIComponent(params.id), "/manual_run"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  // Parameters:
  //   name - string - Name for this sync job
  //   description - string - Description for this sync job
  //   src_path - string - Absolute source path
  //   dest_path - string - Absolute destination path
  //   src_remote_server_id - int64 - Remote server ID for the source
  //   dest_remote_server_id - int64 - Remote server ID for the destination
  //   keep_after_copy - boolean - Keep files after copying?
  //   delete_empty_folders - boolean - Delete empty folders after sync?
  //   disabled - boolean - Is this sync disabled?
  //   interval - string - If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   trigger - string - Trigger type: daily, custom_schedule, or manual
  //   trigger_file - string - Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  //   holiday_region - string - If trigger is `custom_schedule`, the sync will check if there is a formal, observed holiday for the region, and if so, it will not run.
  //   sync_interval_minutes - int64 - Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   schedule_time_zone - string - If trigger is `custom_schedule`, Custom schedule Time Zone for when the sync should be run.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. Times of day in HH:MM format.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          if (_this.attributes.id) {
            _context3.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context3.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 4:
          if (!(params.description && !(0, _utils.isString)(params.description))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 5:
          if (!(params.src_path && !(0, _utils.isString)(params.src_path))) {
            _context3.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: src_path must be of type String, received ".concat((0, _utils.getType)(params.src_path)));
        case 6:
          if (!(params.dest_path && !(0, _utils.isString)(params.dest_path))) {
            _context3.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: dest_path must be of type String, received ".concat((0, _utils.getType)(params.dest_path)));
        case 7:
          if (!(params.src_remote_server_id && !(0, _utils.isInt)(params.src_remote_server_id))) {
            _context3.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: src_remote_server_id must be of type Int, received ".concat((0, _utils.getType)(params.src_remote_server_id)));
        case 8:
          if (!(params.dest_remote_server_id && !(0, _utils.isInt)(params.dest_remote_server_id))) {
            _context3.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: dest_remote_server_id must be of type Int, received ".concat((0, _utils.getType)(params.dest_remote_server_id)));
        case 9:
          if (!(params.interval && !(0, _utils.isString)(params.interval))) {
            _context3.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
        case 10:
          if (!(params.trigger && !(0, _utils.isString)(params.trigger))) {
            _context3.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
        case 11:
          if (!(params.trigger_file && !(0, _utils.isString)(params.trigger_file))) {
            _context3.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_file must be of type String, received ".concat((0, _utils.getType)(params.trigger_file)));
        case 12:
          if (!(params.holiday_region && !(0, _utils.isString)(params.holiday_region))) {
            _context3.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
        case 13:
          if (!(params.sync_interval_minutes && !(0, _utils.isInt)(params.sync_interval_minutes))) {
            _context3.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sync_interval_minutes must be of type Int, received ".concat((0, _utils.getType)(params.sync_interval_minutes)));
        case 14:
          if (!(params.recurring_day && !(0, _utils.isInt)(params.recurring_day))) {
            _context3.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
        case 15:
          if (!(params.schedule_time_zone && !(0, _utils.isString)(params.schedule_time_zone))) {
            _context3.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
        case 16:
          if (!(params.schedule_days_of_week && !(0, _utils.isArray)(params.schedule_days_of_week))) {
            _context3.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
        case 17:
          if (!(params.schedule_times_of_day && !(0, _utils.isArray)(params.schedule_times_of_day))) {
            _context3.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
        case 18:
          if (params.id) {
            _context3.next = 20;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 19;
            break;
          }
          params.id = _this.id;
          _context3.next = 20;
          break;
        case 19:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 20:
          _context3.next = 21;
          return _Api.default.sendRequest("/syncs/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 21:
          response = _context3.sent;
          return _context3.abrupt("return", new Sync(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var params,
      _args4 = arguments;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
          if (_this.attributes.id) {
            _context4.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context4.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context4.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context4.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context4.next = 4;
            break;
          }
          params.id = _this.id;
          _context4.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context4.next = 6;
          return _Api.default.sendRequest("/syncs/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!_this.attributes.id) {
            _context5.next = 2;
            break;
          }
          _context5.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context5.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context5.abrupt("return", true);
        case 2:
          _context5.next = 3;
          return Sync.create(_this.attributes, _this.options);
        case 3:
          newObject = _context5.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context5.abrupt("return", true);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  Object.entries(attributes).forEach(function (_ref6) {
    var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
      key = _ref7[0],
      value = _ref7[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_Sync = Sync;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `src_remote_server_id` and `dest_remote_server_id`.
(0, _defineProperty2.default)(Sync, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var _response$data;
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context6.next = 3;
        return _Api.default.sendRequest('/syncs', 'GET', params, options);
      case 3:
        response = _context6.sent;
        return _context6.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Sync(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
(0, _defineProperty2.default)(Sync, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Sync.list(params, options);
});
// Parameters:
//   id (required) - int64 - Sync ID.
(0, _defineProperty2.default)(Sync, "find", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(id) {
    var params,
      options,
      response,
      _args7 = arguments;
    return _regenerator.default.wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
          options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context7.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context7.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context7.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context7.next = 4;
          return _Api.default.sendRequest("/syncs/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context7.sent;
          return _context7.abrupt("return", new _Sync(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x) {
    return _ref9.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Sync, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Sync.find(id, params, options);
});
// Parameters:
//   name - string - Name for this sync job
//   description - string - Description for this sync job
//   src_path - string - Absolute source path
//   dest_path - string - Absolute destination path
//   src_remote_server_id - int64 - Remote server ID for the source
//   dest_remote_server_id - int64 - Remote server ID for the destination
//   keep_after_copy - boolean - Keep files after copying?
//   delete_empty_folders - boolean - Delete empty folders after sync?
//   disabled - boolean - Is this sync disabled?
//   interval - string - If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
//   trigger - string - Trigger type: daily, custom_schedule, or manual
//   trigger_file - string - Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
//   holiday_region - string - If trigger is `custom_schedule`, the sync will check if there is a formal, observed holiday for the region, and if so, it will not run.
//   sync_interval_minutes - int64 - Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
//   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
//   schedule_time_zone - string - If trigger is `custom_schedule`, Custom schedule Time Zone for when the sync should be run.
//   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
//   schedule_times_of_day - array(string) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. Times of day in HH:MM format.
(0, _defineProperty2.default)(Sync, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var params,
    options,
    response,
    _args8 = arguments;
  return _regenerator.default.wrap(function (_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
        options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context8.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 1:
        if (!(params.description && !(0, _utils.isString)(params.description))) {
          _context8.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 2:
        if (!(params.src_path && !(0, _utils.isString)(params.src_path))) {
          _context8.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: src_path must be of type String, received ".concat((0, _utils.getType)(params.src_path)));
      case 3:
        if (!(params.dest_path && !(0, _utils.isString)(params.dest_path))) {
          _context8.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dest_path must be of type String, received ".concat((0, _utils.getType)(params.dest_path)));
      case 4:
        if (!(params.src_remote_server_id && !(0, _utils.isInt)(params.src_remote_server_id))) {
          _context8.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: src_remote_server_id must be of type Int, received ".concat((0, _utils.getType)(params.src_remote_server_id)));
      case 5:
        if (!(params.dest_remote_server_id && !(0, _utils.isInt)(params.dest_remote_server_id))) {
          _context8.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dest_remote_server_id must be of type Int, received ".concat((0, _utils.getType)(params.dest_remote_server_id)));
      case 6:
        if (!(params.interval && !(0, _utils.isString)(params.interval))) {
          _context8.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
      case 7:
        if (!(params.trigger && !(0, _utils.isString)(params.trigger))) {
          _context8.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
      case 8:
        if (!(params.trigger_file && !(0, _utils.isString)(params.trigger_file))) {
          _context8.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_file must be of type String, received ".concat((0, _utils.getType)(params.trigger_file)));
      case 9:
        if (!(params.holiday_region && !(0, _utils.isString)(params.holiday_region))) {
          _context8.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
      case 10:
        if (!(params.sync_interval_minutes && !(0, _utils.isInt)(params.sync_interval_minutes))) {
          _context8.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sync_interval_minutes must be of type Int, received ".concat((0, _utils.getType)(params.sync_interval_minutes)));
      case 11:
        if (!(params.recurring_day && !(0, _utils.isInt)(params.recurring_day))) {
          _context8.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
      case 12:
        if (!(params.schedule_time_zone && !(0, _utils.isString)(params.schedule_time_zone))) {
          _context8.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
      case 13:
        if (!(params.schedule_days_of_week && !(0, _utils.isArray)(params.schedule_days_of_week))) {
          _context8.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
      case 14:
        if (!(params.schedule_times_of_day && !(0, _utils.isArray)(params.schedule_times_of_day))) {
          _context8.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
      case 15:
        _context8.next = 16;
        return _Api.default.sendRequest('/syncs', 'POST', params, options);
      case 16:
        response = _context8.sent;
        return _context8.abrupt("return", new _Sync(response === null || response === void 0 ? void 0 : response.data, options));
      case 17:
      case "end":
        return _context8.stop();
    }
  }, _callee8);
})));
var _default = exports.default = Sync;
module.exports = Sync;
module.exports.default = Sync;