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
var _AiTask;
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
    exposeAttributes(_this, ['id']);
  });
  // int64 # Workspace ID. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // string # AI Task name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # AI Task description.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
    exposeAttributes(_this, ['description']);
  });
  // string # Prompt sent when this AI Task is invoked.
  (0, _defineProperty2.default)(this, "getPrompt", function () {
    return _this.attributes.prompt;
  });
  (0, _defineProperty2.default)(this, "setPrompt", function (value) {
    _this.attributes.prompt = value;
    exposeAttributes(_this, ['prompt']);
  });
  // string # Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  (0, _defineProperty2.default)(this, "getPermissionSet", function () {
    return _this.attributes.permission_set;
  });
  (0, _defineProperty2.default)(this, "setPermissionSet", function (value) {
    _this.attributes.permission_set = value;
    exposeAttributes(_this, ['permission_set']);
  });
  // string # Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
    exposeAttributes(_this, ['path']);
  });
  // string # Source glob used with `path` for action-triggered AI Tasks.
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "setSource", function (value) {
    _this.attributes.source = value;
    exposeAttributes(_this, ['source']);
  });
  // boolean # If true, this AI Task will not run.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
    exposeAttributes(_this, ['disabled']);
  });
  // string # How this AI Task is triggered.
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
    exposeAttributes(_this, ['trigger']);
  });
  // array(string) # If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
  (0, _defineProperty2.default)(this, "getTriggerActions", function () {
    return _this.attributes.trigger_actions;
  });
  (0, _defineProperty2.default)(this, "setTriggerActions", function (value) {
    _this.attributes.trigger_actions = value;
    exposeAttributes(_this, ['trigger_actions']);
  });
  // string # If trigger is `daily`, this specifies how often to run the AI Task.
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
  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields.
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
  // array(string) # Times of day in HH:MM format for the AI Task schedule.
  (0, _defineProperty2.default)(this, "getScheduleTimesOfDay", function () {
    return _this.attributes.schedule_times_of_day;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimesOfDay", function (value) {
    _this.attributes.schedule_times_of_day = value;
    exposeAttributes(_this, ['schedule_times_of_day']);
  });
  // string # Time zone used by the AI Task schedule.
  (0, _defineProperty2.default)(this, "getScheduleTimeZone", function () {
    return _this.attributes.schedule_time_zone;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimeZone", function (value) {
    _this.attributes.schedule_time_zone = value;
    exposeAttributes(_this, ['schedule_time_zone']);
  });
  // string # Optional holiday region used by the AI Task schedule.
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
  // date-time # Most recent successful invocation time.
  (0, _defineProperty2.default)(this, "getLastRunAt", function () {
    return _this.attributes.last_run_at;
  });
  (0, _defineProperty2.default)(this, "setLastRunAt", function (value) {
    _this.attributes.last_run_at = value;
    exposeAttributes(_this, ['last_run_at']);
  });
  // int64 # Master User ID used for AI Task invocations.
  (0, _defineProperty2.default)(this, "getMasterAdminUserId", function () {
    return _this.attributes.master_admin_user_id;
  });
  (0, _defineProperty2.default)(this, "setMasterAdminUserId", function (value) {
    _this.attributes.master_admin_user_id = value;
    exposeAttributes(_this, ['master_admin_user_id']);
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
  //   holiday_region - string - Optional holiday region used by the AI Task schedule.
  //   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
  //   name - string - AI Task name.
  //   path - string - Path scope used for action-triggered AI Tasks.
  //   permission_set - string - Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  //   prompt - string - Prompt sent when this AI Task is invoked.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_time_zone - string - Time zone used by the AI Task schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the AI Task schedule.
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 4:
          if (!((0, _utils.isArray)(params.disabled) || (0, _utils.isObject)(params.disabled))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: disabled must be of type Boolean, received ".concat((0, _utils.getType)(params.disabled)));
        case 5:
          if (!(params.holiday_region !== undefined && params.holiday_region !== null && !(0, _utils.isString)(params.holiday_region))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
        case 6:
          if (!(params.interval !== undefined && params.interval !== null && !(0, _utils.isString)(params.interval))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
        case 7:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 8:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 9:
          if (!(params.permission_set !== undefined && params.permission_set !== null && !(0, _utils.isString)(params.permission_set))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
        case 10:
          if (!(params.prompt !== undefined && params.prompt !== null && !(0, _utils.isString)(params.prompt))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: prompt must be of type String, received ".concat((0, _utils.getType)(params.prompt)));
        case 11:
          if (!(params.recurring_day !== undefined && params.recurring_day !== null && !(0, _utils.isInt)(params.recurring_day))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
        case 12:
          if (!(params.recurring_days !== undefined && params.recurring_days !== null && !(0, _utils.isArray)(params.recurring_days))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_days must be of type Array, received ".concat((0, _utils.getType)(params.recurring_days)));
        case 13:
          if (!(params.schedule_id !== undefined && params.schedule_id !== null && !(0, _utils.isInt)(params.schedule_id))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_id must be of type Int, received ".concat((0, _utils.getType)(params.schedule_id)));
        case 14:
          if (!(params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !(0, _utils.isArray)(params.schedule_days_of_week))) {
            _context2.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
        case 15:
          if (!(params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !(0, _utils.isString)(params.schedule_time_zone))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
        case 16:
          if (!(params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !(0, _utils.isArray)(params.schedule_times_of_day))) {
            _context2.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
        case 17:
          if (!(params.source !== undefined && params.source !== null && !(0, _utils.isString)(params.source))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
        case 18:
          if (!(params.trigger !== undefined && params.trigger !== null && !(0, _utils.isString)(params.trigger))) {
            _context2.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
        case 19:
          if (!(params.trigger_actions !== undefined && params.trigger_actions !== null && !(0, _utils.isArray)(params.trigger_actions))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
        case 20:
          if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
            _context2.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
        case 21:
          if (params.id) {
            _context2.next = 23;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 22;
            break;
          }
          params.id = _this.id;
          _context2.next = 23;
          break;
        case 22:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 23:
          _context2.next = 24;
          return _Api.default.sendRequest("/ai_tasks/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 24:
          response = _context2.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context2.abrupt("return", _this);
        case 25:
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
    var newObject;
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
          return _context4.abrupt("return", true);
        case 2:
          _context4.next = 3;
          return AiTask.create(_this.attributes, _this.options);
        case 3:
          newObject = _context4.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context4.abrupt("return", true);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_AiTask = AiTask;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name`, `disabled` or `updated_at`.
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
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
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
          return new _AiTask(obj, retainedOptions(options));
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
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(AiTask, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _AiTask.list(pageParams, pageOptions);
  });
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context6.next = 4;
          return _Api.default.sendRequest("/ai_tasks/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _AiTask(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
//   holiday_region - string - Optional holiday region used by the AI Task schedule.
//   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
//   name (required) - string - AI Task name.
//   path - string - Path scope used for action-triggered AI Tasks.
//   permission_set - string - Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
//   prompt (required) - string - Prompt sent when this AI Task is invoked.
//   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
//   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
//   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields.
//   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
//   schedule_time_zone - string - Time zone used by the AI Task schedule.
//   schedule_times_of_day - array(string) - Times of day in HH:MM format for the AI Task schedule.
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
        if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 3:
        if (!((0, _utils.isArray)(params.disabled) || (0, _utils.isObject)(params.disabled))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disabled must be of type Boolean, received ".concat((0, _utils.getType)(params.disabled)));
      case 4:
        if (!(params.holiday_region !== undefined && params.holiday_region !== null && !(0, _utils.isString)(params.holiday_region))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
      case 5:
        if (!(params.interval !== undefined && params.interval !== null && !(0, _utils.isString)(params.interval))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
      case 6:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 7:
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 8:
        if (!(params.permission_set !== undefined && params.permission_set !== null && !(0, _utils.isString)(params.permission_set))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
      case 9:
        if (!(params.prompt !== undefined && params.prompt !== null && !(0, _utils.isString)(params.prompt))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: prompt must be of type String, received ".concat((0, _utils.getType)(params.prompt)));
      case 10:
        if (!(params.recurring_day !== undefined && params.recurring_day !== null && !(0, _utils.isInt)(params.recurring_day))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
      case 11:
        if (!(params.recurring_days !== undefined && params.recurring_days !== null && !(0, _utils.isArray)(params.recurring_days))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_days must be of type Array, received ".concat((0, _utils.getType)(params.recurring_days)));
      case 12:
        if (!(params.schedule_id !== undefined && params.schedule_id !== null && !(0, _utils.isInt)(params.schedule_id))) {
          _context7.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_id must be of type Int, received ".concat((0, _utils.getType)(params.schedule_id)));
      case 13:
        if (!(params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !(0, _utils.isArray)(params.schedule_days_of_week))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
      case 14:
        if (!(params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !(0, _utils.isString)(params.schedule_time_zone))) {
          _context7.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
      case 15:
        if (!(params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !(0, _utils.isArray)(params.schedule_times_of_day))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
      case 16:
        if (!(params.source !== undefined && params.source !== null && !(0, _utils.isString)(params.source))) {
          _context7.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
      case 17:
        if (!(params.trigger !== undefined && params.trigger !== null && !(0, _utils.isString)(params.trigger))) {
          _context7.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
      case 18:
        if (!(params.trigger_actions !== undefined && params.trigger_actions !== null && !(0, _utils.isArray)(params.trigger_actions))) {
          _context7.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
      case 19:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context7.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 20:
        _context7.next = 21;
        return _Api.default.sendRequest('/ai_tasks', 'POST', params, options);
      case 21:
        response = _context7.sent;
        return _context7.abrupt("return", new _AiTask(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 22:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = AiTask;
module.exports = AiTask;
module.exports.default = AiTask;