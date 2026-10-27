"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _ScheduledExport;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

/**
 * Class ScheduledExport
 */
var ScheduledExport = /*#__PURE__*/(0, _createClass2.default)(function ScheduledExport() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ScheduledExport);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Scheduled Export ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // string # Name for this scheduled export.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
  (0, _defineProperty2.default)(this, "getExportType", function () {
    return _this.attributes.export_type;
  });
  (0, _defineProperty2.default)(this, "setExportType", function (value) {
    _this.attributes.export_type = value;
    exposeAttributes(_this, ['export_type']);
  });
  // string # Human-readable report name.
  (0, _defineProperty2.default)(this, "getReportName", function () {
    return _this.attributes.report_name;
  });
  (0, _defineProperty2.default)(this, "setReportName", function (value) {
    _this.attributes.report_name = value;
    exposeAttributes(_this, ['report_name']);
  });
  // object # Options for the report selected by export_type.
  (0, _defineProperty2.default)(this, "getExportOptions", function () {
    return _this.attributes.export_options;
  });
  (0, _defineProperty2.default)(this, "setExportOptions", function (value) {
    _this.attributes.export_options = value;
    exposeAttributes(_this, ['export_options']);
  });
  // int64 # Site Admin user who receives the completed export e-mail.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // boolean # If true, this scheduled export will not run.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
    exposeAttributes(_this, ['disabled']);
  });
  // string # Schedule trigger type: `daily` or `custom_schedule`.
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
    exposeAttributes(_this, ['trigger']);
  });
  // string # If trigger is `daily`, this specifies how often to run the scheduled export.
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
    exposeAttributes(_this, ['interval']);
  });
  // int64 # If trigger is `daily`, this selects the day number inside the chosen interval.
  (0, _defineProperty2.default)(this, "getRecurringDay", function () {
    return _this.attributes.recurring_day;
  });
  (0, _defineProperty2.default)(this, "setRecurringDay", function (value) {
    _this.attributes.recurring_day = value;
    exposeAttributes(_this, ['recurring_day']);
  });
  // array(int64) # If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  (0, _defineProperty2.default)(this, "getRecurringDays", function () {
    return _this.attributes.recurring_days;
  });
  (0, _defineProperty2.default)(this, "setRecurringDays", function (value) {
    _this.attributes.recurring_days = value;
    exposeAttributes(_this, ['recurring_days']);
  });
  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields.
  (0, _defineProperty2.default)(this, "getScheduleId", function () {
    return _this.attributes.schedule_id;
  });
  (0, _defineProperty2.default)(this, "setScheduleId", function (value) {
    _this.attributes.schedule_id = value;
    exposeAttributes(_this, ['schedule_id']);
  });
  // array(int64) # If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  (0, _defineProperty2.default)(this, "getScheduleDaysOfWeek", function () {
    return _this.attributes.schedule_days_of_week;
  });
  (0, _defineProperty2.default)(this, "setScheduleDaysOfWeek", function (value) {
    _this.attributes.schedule_days_of_week = value;
    exposeAttributes(_this, ['schedule_days_of_week']);
  });
  // array(string) # Times of day in HH:MM format for the scheduled export schedule.
  (0, _defineProperty2.default)(this, "getScheduleTimesOfDay", function () {
    return _this.attributes.schedule_times_of_day;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimesOfDay", function (value) {
    _this.attributes.schedule_times_of_day = value;
    exposeAttributes(_this, ['schedule_times_of_day']);
  });
  // string # Time zone used by the scheduled export schedule.
  (0, _defineProperty2.default)(this, "getScheduleTimeZone", function () {
    return _this.attributes.schedule_time_zone;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimeZone", function (value) {
    _this.attributes.schedule_time_zone = value;
    exposeAttributes(_this, ['schedule_time_zone']);
  });
  // string # Optional holiday region used by the scheduled export schedule.
  (0, _defineProperty2.default)(this, "getHolidayRegion", function () {
    return _this.attributes.holiday_region;
  });
  (0, _defineProperty2.default)(this, "setHolidayRegion", function (value) {
    _this.attributes.holiday_region = value;
    exposeAttributes(_this, ['holiday_region']);
  });
  // string # Human-readable schedule description.
  (0, _defineProperty2.default)(this, "getHumanReadableSchedule", function () {
    return _this.attributes.human_readable_schedule;
  });
  (0, _defineProperty2.default)(this, "setHumanReadableSchedule", function (value) {
    _this.attributes.human_readable_schedule = value;
    exposeAttributes(_this, ['human_readable_schedule']);
  });
  // date-time # Most recent scheduled attempt time, including attempts that failed validation.
  (0, _defineProperty2.default)(this, "getLastRunAt", function () {
    return _this.attributes.last_run_at;
  });
  (0, _defineProperty2.default)(this, "setLastRunAt", function (value) {
    _this.attributes.last_run_at = value;
    exposeAttributes(_this, ['last_run_at']);
  });
  // int64 # Most recent Export ID created by this schedule.
  (0, _defineProperty2.default)(this, "getLastExportId", function () {
    return _this.attributes.last_export_id;
  });
  (0, _defineProperty2.default)(this, "setLastExportId", function (value) {
    _this.attributes.last_export_id = value;
    exposeAttributes(_this, ['last_export_id']);
  });
  // string # Validation error from the most recent scheduled attempt. The schedule remains enabled and retries at its next scheduled time. Cleared when an export is successfully created; does not describe errors during export generation.
  (0, _defineProperty2.default)(this, "getLastError", function () {
    return _this.attributes.last_error;
  });
  (0, _defineProperty2.default)(this, "setLastError", function (value) {
    _this.attributes.last_error = value;
    exposeAttributes(_this, ['last_error']);
  });
  // date-time # Creation time.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # Last update time.
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  // Parameters:
  //   name - string - Name for this scheduled export.
  //   export_type - string - Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
  //   export_options - object - Options for the report selected by export_type.
  //   user_id - int64 - Site Admin user who receives the completed export e-mail.
  //   disabled - boolean - If true, this scheduled export will not run.
  //   trigger - string - Schedule trigger type: `daily` or `custom_schedule`.
  //   interval - string - If trigger is `daily`, this specifies how often to run the scheduled export.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the scheduled export schedule.
  //   schedule_time_zone - string - Time zone used by the scheduled export schedule.
  //   holiday_region - string - Optional holiday region used by the scheduled export schedule.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 4:
          if (!(params.export_type !== undefined && params.export_type !== null && !(0, _utils.isString)(params.export_type))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: export_type must be of type String, received ".concat((0, _utils.getType)(params.export_type)));
        case 5:
          if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
        case 6:
          if (!((0, _utils.isArray)(params.disabled) || (0, _utils.isObject)(params.disabled))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: disabled must be of type Boolean, received ".concat((0, _utils.getType)(params.disabled)));
        case 7:
          if (!(params.trigger !== undefined && params.trigger !== null && !(0, _utils.isString)(params.trigger))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
        case 8:
          if (!(params.interval !== undefined && params.interval !== null && !(0, _utils.isString)(params.interval))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
        case 9:
          if (!(params.recurring_day !== undefined && params.recurring_day !== null && !(0, _utils.isInt)(params.recurring_day))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
        case 10:
          if (!(params.recurring_days !== undefined && params.recurring_days !== null && !(0, _utils.isArray)(params.recurring_days))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_days must be of type Array, received ".concat((0, _utils.getType)(params.recurring_days)));
        case 11:
          if (!(params.schedule_id !== undefined && params.schedule_id !== null && !(0, _utils.isInt)(params.schedule_id))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_id must be of type Int, received ".concat((0, _utils.getType)(params.schedule_id)));
        case 12:
          if (!(params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !(0, _utils.isArray)(params.schedule_days_of_week))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
        case 13:
          if (!(params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !(0, _utils.isArray)(params.schedule_times_of_day))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
        case 14:
          if (!(params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !(0, _utils.isString)(params.schedule_time_zone))) {
            _context.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
        case 15:
          if (!(params.holiday_region !== undefined && params.holiday_region !== null && !(0, _utils.isString)(params.holiday_region))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
        case 16:
          if (params.id) {
            _context.next = 18;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 17;
            break;
          }
          params.id = _this.id;
          _context.next = 18;
          break;
        case 17:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 18:
          _context.next = 19;
          return _Api.default.sendRequest("/scheduled_exports/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 19:
          response = _context.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/scheduled_exports/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var newObject;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!_this.attributes.id) {
            _context3.next = 2;
            break;
          }
          _context3.next = 1;
          return _this.update(_this.attributes);
        case 1:
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return ScheduledExport.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_ScheduledExport = ScheduledExport;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`, `export_type` or `disabled`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled` and `export_type`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `export_type`.
(0, _defineProperty2.default)(ScheduledExport, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context4.next = 3;
        return _Api.default.sendRequest('/scheduled_exports', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _ScheduledExport(obj, retainedOptions(options));
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(ScheduledExport, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ScheduledExport.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(ScheduledExport, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _ScheduledExport.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Scheduled Export ID.
(0, _defineProperty2.default)(ScheduledExport, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/scheduled_exports/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _ScheduledExport(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ScheduledExport, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _ScheduledExport.find(id, params, options);
});
// Parameters:
//   name (required) - string - Name for this scheduled export.
//   export_type (required) - string - Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
//   export_options - object - Options for the report selected by export_type.
//   user_id - int64 - Site Admin user who receives the completed export e-mail.
//   disabled - boolean - If true, this scheduled export will not run.
//   trigger - string - Schedule trigger type: `daily` or `custom_schedule`.
//   interval - string - If trigger is `daily`, this specifies how often to run the scheduled export.
//   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
//   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
//   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields.
//   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
//   schedule_times_of_day - array(string) - Times of day in HH:MM format for the scheduled export schedule.
//   schedule_time_zone - string - Time zone used by the scheduled export schedule.
//   holiday_region - string - Optional holiday region used by the scheduled export schedule.
(0, _defineProperty2.default)(ScheduledExport, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.name) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 1:
        if (params.export_type) {
          _context6.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: export_type');
      case 2:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 3:
        if (!(params.export_type !== undefined && params.export_type !== null && !(0, _utils.isString)(params.export_type))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: export_type must be of type String, received ".concat((0, _utils.getType)(params.export_type)));
      case 4:
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 5:
        if (!((0, _utils.isArray)(params.disabled) || (0, _utils.isObject)(params.disabled))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disabled must be of type Boolean, received ".concat((0, _utils.getType)(params.disabled)));
      case 6:
        if (!(params.trigger !== undefined && params.trigger !== null && !(0, _utils.isString)(params.trigger))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
      case 7:
        if (!(params.interval !== undefined && params.interval !== null && !(0, _utils.isString)(params.interval))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
      case 8:
        if (!(params.recurring_day !== undefined && params.recurring_day !== null && !(0, _utils.isInt)(params.recurring_day))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
      case 9:
        if (!(params.recurring_days !== undefined && params.recurring_days !== null && !(0, _utils.isArray)(params.recurring_days))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_days must be of type Array, received ".concat((0, _utils.getType)(params.recurring_days)));
      case 10:
        if (!(params.schedule_id !== undefined && params.schedule_id !== null && !(0, _utils.isInt)(params.schedule_id))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_id must be of type Int, received ".concat((0, _utils.getType)(params.schedule_id)));
      case 11:
        if (!(params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !(0, _utils.isArray)(params.schedule_days_of_week))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
      case 12:
        if (!(params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !(0, _utils.isArray)(params.schedule_times_of_day))) {
          _context6.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
      case 13:
        if (!(params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !(0, _utils.isString)(params.schedule_time_zone))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
      case 14:
        if (!(params.holiday_region !== undefined && params.holiday_region !== null && !(0, _utils.isString)(params.holiday_region))) {
          _context6.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
      case 15:
        _context6.next = 16;
        return _Api.default.sendRequest('/scheduled_exports', 'POST', params, options);
      case 16:
        response = _context6.sent;
        return _context6.abrupt("return", new _ScheduledExport(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 17:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = ScheduledExport;
module.exports = ScheduledExport;
module.exports.default = ScheduledExport;