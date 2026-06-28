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
var _AiTask;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class AiTask
 */
var AiTask = /*#__PURE__*/(0, _createClass2.default)(function AiTask() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, AiTask);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # AI Task ID.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # Workspace ID. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
  });
  // string # AI Task name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # AI Task description.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // string # Prompt sent when this AI Task is invoked.
  (0, _defineProperty2.default)(this, "getPrompt", function () {
    return _this.attributes.prompt;
  });
  (0, _defineProperty2.default)(this, "setPrompt", function (value) {
    _this.attributes.prompt = value;
  });
  // string # Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  (0, _defineProperty2.default)(this, "getPermissionSet", function () {
    return _this.attributes.permission_set;
  });
  (0, _defineProperty2.default)(this, "setPermissionSet", function (value) {
    _this.attributes.permission_set = value;
  });
  // string # Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // string # Source glob used with `path` for action-triggered AI Tasks.
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "setSource", function (value) {
    _this.attributes.source = value;
  });
  // boolean # If true, this AI Task will not run.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  // string # How this AI Task is triggered.
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
  });
  // array(string) # If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
  (0, _defineProperty2.default)(this, "getTriggerActions", function () {
    return _this.attributes.trigger_actions;
  });
  (0, _defineProperty2.default)(this, "setTriggerActions", function (value) {
    _this.attributes.trigger_actions = value;
  });
  // string # If trigger is `daily`, this specifies how often to run the AI Task.
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
  });
  // int64 # If trigger is `daily`, this selects the day number inside the chosen interval.
  (0, _defineProperty2.default)(this, "getRecurringDay", function () {
    return _this.attributes.recurring_day;
  });
  (0, _defineProperty2.default)(this, "setRecurringDay", function (value) {
    _this.attributes.recurring_day = value;
  });
  // array(int64) # If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  (0, _defineProperty2.default)(this, "getScheduleDaysOfWeek", function () {
    return _this.attributes.schedule_days_of_week;
  });
  (0, _defineProperty2.default)(this, "setScheduleDaysOfWeek", function (value) {
    _this.attributes.schedule_days_of_week = value;
  });
  // array(string) # Times of day in HH:MM format for scheduled AI Tasks.
  (0, _defineProperty2.default)(this, "getScheduleTimesOfDay", function () {
    return _this.attributes.schedule_times_of_day;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimesOfDay", function (value) {
    _this.attributes.schedule_times_of_day = value;
  });
  // string # Time zone used by the AI Task schedule.
  (0, _defineProperty2.default)(this, "getScheduleTimeZone", function () {
    return _this.attributes.schedule_time_zone;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimeZone", function (value) {
    _this.attributes.schedule_time_zone = value;
  });
  // string # Optional holiday region used by scheduled AI Tasks.
  (0, _defineProperty2.default)(this, "getHolidayRegion", function () {
    return _this.attributes.holiday_region;
  });
  (0, _defineProperty2.default)(this, "setHolidayRegion", function (value) {
    _this.attributes.holiday_region = value;
  });
  // string # Human-readable schedule description.
  (0, _defineProperty2.default)(this, "getHumanReadableSchedule", function () {
    return _this.attributes.human_readable_schedule;
  });
  (0, _defineProperty2.default)(this, "setHumanReadableSchedule", function (value) {
    _this.attributes.human_readable_schedule = value;
  });
  // date-time # Most recent successful invocation time.
  (0, _defineProperty2.default)(this, "getLastRunAt", function () {
    return _this.attributes.last_run_at;
  });
  (0, _defineProperty2.default)(this, "setLastRunAt", function (value) {
    _this.attributes.last_run_at = value;
  });
  // int64 # Master User ID used for AI Task invocations.
  (0, _defineProperty2.default)(this, "getMasterAdminUserId", function () {
    return _this.attributes.master_admin_user_id;
  });
  (0, _defineProperty2.default)(this, "setMasterAdminUserId", function (value) {
    _this.attributes.master_admin_user_id = value;
  });
  // date-time # Creation time.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # Last update time.
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  // Manually Run AI Task
  (0, _defineProperty2.default)(this, "manualRun", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          return _Api.default.sendRequest("/ai_tasks/".concat(encodeURIComponent(params.id), "/manual_run"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Parameters:
  //   description - string - AI Task description.
  //   disabled - boolean - If true, this AI Task will not run.
  //   holiday_region - string - Optional holiday region used by scheduled AI Tasks.
  //   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
  //   name - string - AI Task name.
  //   path - string - Path scope used for action-triggered AI Tasks.
  //   permission_set - string - Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  //   prompt - string - Prompt sent when this AI Task is invoked.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_time_zone - string - Time zone used by the AI Task schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for scheduled AI Tasks.
  //   source - string - Source glob used with `path` for action-triggered AI Tasks.
  //   trigger - string - How this AI Task is triggered.
  //   trigger_actions - array(string) - If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
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
          if (!(params.description && !(0, _utils.isString)(params.description))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 4:
          if (!(params.holiday_region && !(0, _utils.isString)(params.holiday_region))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
        case 5:
          if (!(params.interval && !(0, _utils.isString)(params.interval))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
        case 6:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 7:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (!(params.permission_set && !(0, _utils.isString)(params.permission_set))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
        case 9:
          if (!(params.prompt && !(0, _utils.isString)(params.prompt))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: prompt must be of type String, received ".concat((0, _utils.getType)(params.prompt)));
        case 10:
          if (!(params.recurring_day && !(0, _utils.isInt)(params.recurring_day))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
        case 11:
          if (!(params.schedule_days_of_week && !(0, _utils.isArray)(params.schedule_days_of_week))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
        case 12:
          if (!(params.schedule_time_zone && !(0, _utils.isString)(params.schedule_time_zone))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
        case 13:
          if (!(params.schedule_times_of_day && !(0, _utils.isArray)(params.schedule_times_of_day))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
        case 14:
          if (!(params.source && !(0, _utils.isString)(params.source))) {
            _context2.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
        case 15:
          if (!(params.trigger && !(0, _utils.isString)(params.trigger))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
        case 16:
          if (!(params.trigger_actions && !(0, _utils.isArray)(params.trigger_actions))) {
            _context2.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
        case 17:
          if (!(params.workspace_id && !(0, _utils.isInt)(params.workspace_id))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
        case 18:
          if (params.id) {
            _context2.next = 20;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 19;
            break;
          }
          params.id = _this.id;
          _context2.next = 20;
          break;
        case 19:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 20:
          _context2.next = 21;
          return _Api.default.sendRequest("/ai_tasks/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 21:
          response = _context2.sent;
          return _context2.abrupt("return", new AiTask(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
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
          if (params.id) {
            _context3.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 4;
            break;
          }
          params.id = _this.id;
          _context3.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context3.next = 6;
          return _Api.default.sendRequest("/ai_tasks/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!_this.attributes.id) {
            _context4.next = 2;
            break;
          }
          _context4.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context4.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context4.abrupt("return", true);
        case 2:
          _context4.next = 3;
          return AiTask.create(_this.attributes, _this.options);
        case 3:
          newObject = _context4.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context4.abrupt("return", true);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  Object.entries(attributes).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_AiTask = AiTask;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `id`, `disabled` or `updated_at`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `trigger` or `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
(0, _defineProperty2.default)(AiTask, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _response$data;
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context5.next = 3;
        return _Api.default.sendRequest('/ai_tasks', 'GET', params, options);
      case 3:
        response = _context5.sent;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _AiTask(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(AiTask, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _AiTask.list(params, options);
});
// Parameters:
//   id (required) - int64 - Ai Task ID.
(0, _defineProperty2.default)(AiTask, "find", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(id) {
    var params,
      options,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context6.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context6.next = 4;
          return _Api.default.sendRequest("/ai_tasks/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _AiTask(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x) {
    return _ref8.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(AiTask, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _AiTask.find(id, params, options);
});
// Parameters:
//   description - string - AI Task description.
//   disabled - boolean - If true, this AI Task will not run.
//   holiday_region - string - Optional holiday region used by scheduled AI Tasks.
//   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
//   name (required) - string - AI Task name.
//   path - string - Path scope used for action-triggered AI Tasks.
//   permission_set - string - Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
//   prompt (required) - string - Prompt sent when this AI Task is invoked.
//   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
//   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
//   schedule_time_zone - string - Time zone used by the AI Task schedule.
//   schedule_times_of_day - array(string) - Times of day in HH:MM format for scheduled AI Tasks.
//   source - string - Source glob used with `path` for action-triggered AI Tasks.
//   trigger - string - How this AI Task is triggered.
//   trigger_actions - array(string) - If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
//   workspace_id - int64 - Workspace ID. `0` means the default workspace.
(0, _defineProperty2.default)(AiTask, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.name) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 1:
        if (params.prompt) {
          _context7.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: prompt');
      case 2:
        if (!(params.description && !(0, _utils.isString)(params.description))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 3:
        if (!(params.holiday_region && !(0, _utils.isString)(params.holiday_region))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
      case 4:
        if (!(params.interval && !(0, _utils.isString)(params.interval))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
      case 5:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 6:
        if (!(params.path && !(0, _utils.isString)(params.path))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 7:
        if (!(params.permission_set && !(0, _utils.isString)(params.permission_set))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
      case 8:
        if (!(params.prompt && !(0, _utils.isString)(params.prompt))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: prompt must be of type String, received ".concat((0, _utils.getType)(params.prompt)));
      case 9:
        if (!(params.recurring_day && !(0, _utils.isInt)(params.recurring_day))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
      case 10:
        if (!(params.schedule_days_of_week && !(0, _utils.isArray)(params.schedule_days_of_week))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
      case 11:
        if (!(params.schedule_time_zone && !(0, _utils.isString)(params.schedule_time_zone))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
      case 12:
        if (!(params.schedule_times_of_day && !(0, _utils.isArray)(params.schedule_times_of_day))) {
          _context7.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
      case 13:
        if (!(params.source && !(0, _utils.isString)(params.source))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
      case 14:
        if (!(params.trigger && !(0, _utils.isString)(params.trigger))) {
          _context7.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
      case 15:
        if (!(params.trigger_actions && !(0, _utils.isArray)(params.trigger_actions))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
      case 16:
        if (!(params.workspace_id && !(0, _utils.isInt)(params.workspace_id))) {
          _context7.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 17:
        _context7.next = 18;
        return _Api.default.sendRequest('/ai_tasks', 'POST', params, options);
      case 18:
        response = _context7.sent;
        return _context7.abrupt("return", new _AiTask(response === null || response === void 0 ? void 0 : response.data, options));
      case 19:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = AiTask;
module.exports = AiTask;
module.exports.default = AiTask;