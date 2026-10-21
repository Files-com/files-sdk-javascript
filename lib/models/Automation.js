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
var _Automation;
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
 * Class Automation
 */
var Automation = /*#__PURE__*/(0, _createClass2.default)(function Automation() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Automation);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Automation ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // int64 # Workspace ID
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // boolean # Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  (0, _defineProperty2.default)(this, "getAlwaysSerializeJobs", function () {
    return _this.attributes.always_serialize_jobs;
  });
  (0, _defineProperty2.default)(this, "setAlwaysSerializeJobs", function (value) {
    _this.attributes.always_serialize_jobs = value;
    exposeAttributes(_this, ['always_serialize_jobs']);
  });
  // boolean # Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  (0, _defineProperty2.default)(this, "getAlwaysOverwriteSizeMatchingFiles", function () {
    return _this.attributes.always_overwrite_size_matching_files;
  });
  (0, _defineProperty2.default)(this, "setAlwaysOverwriteSizeMatchingFiles", function (value) {
    _this.attributes.always_overwrite_size_matching_files = value;
    exposeAttributes(_this, ['always_overwrite_size_matching_files']);
  });
  // string # Automation type
  (0, _defineProperty2.default)(this, "getAutomation", function () {
    return _this.attributes.automation;
  });
  (0, _defineProperty2.default)(this, "setAutomation", function (value) {
    _this.attributes.automation = value;
    exposeAttributes(_this, ['automation']);
  });
  // boolean # Indicates if the automation has been deleted.
  (0, _defineProperty2.default)(this, "getDeleted", function () {
    return _this.attributes.deleted;
  });
  (0, _defineProperty2.default)(this, "setDeleted", function (value) {
    _this.attributes.deleted = value;
    exposeAttributes(_this, ['deleted']);
  });
  // string # Description for the this Automation.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
    exposeAttributes(_this, ['description']);
  });
  // object # Automation v2 graph definition.
  (0, _defineProperty2.default)(this, "getDefinition", function () {
    return _this.attributes.definition;
  });
  (0, _defineProperty2.default)(this, "setDefinition", function (value) {
    _this.attributes.definition = value;
    exposeAttributes(_this, ['definition']);
  });
  // string # If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  (0, _defineProperty2.default)(this, "getDestinationReplaceFrom", function () {
    return _this.attributes.destination_replace_from;
  });
  (0, _defineProperty2.default)(this, "setDestinationReplaceFrom", function (value) {
    _this.attributes.destination_replace_from = value;
    exposeAttributes(_this, ['destination_replace_from']);
  });
  // string # If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  (0, _defineProperty2.default)(this, "getDestinationReplaceTo", function () {
    return _this.attributes.destination_replace_to;
  });
  (0, _defineProperty2.default)(this, "setDestinationReplaceTo", function (value) {
    _this.attributes.destination_replace_to = value;
    exposeAttributes(_this, ['destination_replace_to']);
  });
  // array(string) # Destination Paths
  (0, _defineProperty2.default)(this, "getDestinations", function () {
    return _this.attributes.destinations;
  });
  (0, _defineProperty2.default)(this, "setDestinations", function (value) {
    _this.attributes.destinations = value;
    exposeAttributes(_this, ['destinations']);
  });
  // boolean # If true, this automation will not run.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
    exposeAttributes(_this, ['disabled']);
  });
  // string # If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  (0, _defineProperty2.default)(this, "getExcludePattern", function () {
    return _this.attributes.exclude_pattern;
  });
  (0, _defineProperty2.default)(this, "setExcludePattern", function (value) {
    _this.attributes.exclude_pattern = value;
    exposeAttributes(_this, ['exclude_pattern']);
  });
  // array(object) # List of URLs to be imported and names to be used.
  (0, _defineProperty2.default)(this, "getImportUrls", function () {
    return _this.attributes.import_urls;
  });
  (0, _defineProperty2.default)(this, "setImportUrls", function (value) {
    _this.attributes.import_urls = value;
    exposeAttributes(_this, ['import_urls']);
  });
  // string # If trigger is `email`, this is the address that triggers the Automation.
  (0, _defineProperty2.default)(this, "getInboundEmailAddress", function () {
    return _this.attributes.inbound_email_address;
  });
  (0, _defineProperty2.default)(this, "setInboundEmailAddress", function (value) {
    _this.attributes.inbound_email_address = value;
    exposeAttributes(_this, ['inbound_email_address']);
  });
  // boolean # Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  (0, _defineProperty2.default)(this, "getFlattenDestinationStructure", function () {
    return _this.attributes.flatten_destination_structure;
  });
  (0, _defineProperty2.default)(this, "setFlattenDestinationStructure", function (value) {
    _this.attributes.flatten_destination_structure = value;
    exposeAttributes(_this, ['flatten_destination_structure']);
  });
  // array(int64) # IDs of Groups for the Automation (i.e. who to Request File from)
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
    exposeAttributes(_this, ['group_ids']);
  });
  // boolean # If true, the Lock Folders behavior will be disregarded for automated actions.
  (0, _defineProperty2.default)(this, "getIgnoreLockedFolders", function () {
    return _this.attributes.ignore_locked_folders;
  });
  (0, _defineProperty2.default)(this, "setIgnoreLockedFolders", function (value) {
    _this.attributes.ignore_locked_folders = value;
    exposeAttributes(_this, ['ignore_locked_folders']);
  });
  // string # If trigger is `daily`, this specifies how often to run this automation.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
    exposeAttributes(_this, ['interval']);
  });
  // date-time # Time when automation was last modified. Does not change for name or description updates.
  (0, _defineProperty2.default)(this, "getLastModifiedAt", function () {
    return _this.attributes.last_modified_at;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedAt", function (value) {
    _this.attributes.last_modified_at = value;
    exposeAttributes(_this, ['last_modified_at']);
  });
  // boolean # If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  (0, _defineProperty2.default)(this, "getLegacyFolderMatching", function () {
    return _this.attributes.legacy_folder_matching;
  });
  (0, _defineProperty2.default)(this, "setLegacyFolderMatching", function (value) {
    _this.attributes.legacy_folder_matching = value;
    exposeAttributes(_this, ['legacy_folder_matching']);
  });
  // string # Name for this automation.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // boolean # If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
  (0, _defineProperty2.default)(this, "getOverwriteFiles", function () {
    return _this.attributes.overwrite_files;
  });
  (0, _defineProperty2.default)(this, "setOverwriteFiles", function (value) {
    _this.attributes.overwrite_files = value;
    exposeAttributes(_this, ['overwrite_files']);
  });
  // string # Path on which this Automation runs.  Supports globs, except on remote mounts. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
    exposeAttributes(_this, ['path']);
  });
  // string # Timezone to use when rendering timestamps in paths.
  (0, _defineProperty2.default)(this, "getPathTimeZone", function () {
    return _this.attributes.path_time_zone;
  });
  (0, _defineProperty2.default)(this, "setPathTimeZone", function (value) {
    _this.attributes.path_time_zone = value;
    exposeAttributes(_this, ['path_time_zone']);
  });
  // int64 # Current Automation v2 definition version.
  (0, _defineProperty2.default)(this, "getVersion", function () {
    return _this.attributes.version;
  });
  (0, _defineProperty2.default)(this, "setVersion", function (value) {
    _this.attributes.version = value;
    exposeAttributes(_this, ['version']);
  });
  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  (0, _defineProperty2.default)(this, "getRecurringDay", function () {
    return _this.attributes.recurring_day;
  });
  (0, _defineProperty2.default)(this, "setRecurringDay", function (value) {
    _this.attributes.recurring_day = value;
    exposeAttributes(_this, ['recurring_day']);
  });
  // array(int64) # If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  (0, _defineProperty2.default)(this, "getRecurringDays", function () {
    return _this.attributes.recurring_days;
  });
  (0, _defineProperty2.default)(this, "setRecurringDays", function (value) {
    _this.attributes.recurring_days = value;
    exposeAttributes(_this, ['recurring_days']);
  });
  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields.
  (0, _defineProperty2.default)(this, "getScheduleId", function () {
    return _this.attributes.schedule_id;
  });
  (0, _defineProperty2.default)(this, "setScheduleId", function (value) {
    _this.attributes.schedule_id = value;
    exposeAttributes(_this, ['schedule_id']);
  });
  // int64 # If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
  (0, _defineProperty2.default)(this, "getRetryOnFailureIntervalInMinutes", function () {
    return _this.attributes.retry_on_failure_interval_in_minutes;
  });
  (0, _defineProperty2.default)(this, "setRetryOnFailureIntervalInMinutes", function (value) {
    _this.attributes.retry_on_failure_interval_in_minutes = value;
    exposeAttributes(_this, ['retry_on_failure_interval_in_minutes']);
  });
  // int64 # If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
  (0, _defineProperty2.default)(this, "getRetryOnFailureNumberOfAttempts", function () {
    return _this.attributes.retry_on_failure_number_of_attempts;
  });
  (0, _defineProperty2.default)(this, "setRetryOnFailureNumberOfAttempts", function (value) {
    _this.attributes.retry_on_failure_number_of_attempts = value;
    exposeAttributes(_this, ['retry_on_failure_number_of_attempts']);
  });
  // object # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
  (0, _defineProperty2.default)(this, "getSchedule", function () {
    return _this.attributes.schedule;
  });
  (0, _defineProperty2.default)(this, "setSchedule", function (value) {
    _this.attributes.schedule = value;
    exposeAttributes(_this, ['schedule']);
  });
  // string # If trigger is `custom_schedule` or `daily` with times, Human readable schedule description for when the automation should be run.
  (0, _defineProperty2.default)(this, "getHumanReadableSchedule", function () {
    return _this.attributes.human_readable_schedule;
  });
  (0, _defineProperty2.default)(this, "setHumanReadableSchedule", function (value) {
    _this.attributes.human_readable_schedule = value;
    exposeAttributes(_this, ['human_readable_schedule']);
  });
  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0 is Sunday, 1 is Monday, etc.
  (0, _defineProperty2.default)(this, "getScheduleDaysOfWeek", function () {
    return _this.attributes.schedule_days_of_week;
  });
  (0, _defineProperty2.default)(this, "setScheduleDaysOfWeek", function (value) {
    _this.attributes.schedule_days_of_week = value;
    exposeAttributes(_this, ['schedule_days_of_week']);
  });
  // array(string) # Times of day to run in HH:MM format (24-hour). For `custom_schedule`, run at these times on specified days of week. For `daily`, run at these times on the scheduled interval date.
  (0, _defineProperty2.default)(this, "getScheduleTimesOfDay", function () {
    return _this.attributes.schedule_times_of_day;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimesOfDay", function (value) {
    _this.attributes.schedule_times_of_day = value;
    exposeAttributes(_this, ['schedule_times_of_day']);
  });
  // string # Time zone for the schedule. If not set, times are interpreted as UTC.
  (0, _defineProperty2.default)(this, "getScheduleTimeZone", function () {
    return _this.attributes.schedule_time_zone;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimeZone", function (value) {
    _this.attributes.schedule_time_zone = value;
    exposeAttributes(_this, ['schedule_time_zone']);
  });
  // string # Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "setSource", function (value) {
    _this.attributes.source = value;
    exposeAttributes(_this, ['source']);
  });
  // array(int64) # IDs of Syncs to run by this Automation.
  (0, _defineProperty2.default)(this, "getSyncIds", function () {
    return _this.attributes.sync_ids;
  });
  (0, _defineProperty2.default)(this, "setSyncIds", function (value) {
    _this.attributes.sync_ids = value;
    exposeAttributes(_this, ['sync_ids']);
  });
  // array(string) # If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, copy, move, archived_delete, update, read, destroy
  (0, _defineProperty2.default)(this, "getTriggerActions", function () {
    return _this.attributes.trigger_actions;
  });
  (0, _defineProperty2.default)(this, "setTriggerActions", function (value) {
    _this.attributes.trigger_actions = value;
    exposeAttributes(_this, ['trigger_actions']);
  });
  // string # How this automation is triggered to run.
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
    exposeAttributes(_this, ['trigger']);
  });
  // int64 # User ID of the Automation's creator.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // array(int64) # IDs of Users for the Automation (i.e. who to Request File from)
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
    exposeAttributes(_this, ['user_ids']);
  });
  // object # A Hash of attributes specific to the automation type.
  (0, _defineProperty2.default)(this, "getValue", function () {
    return _this.attributes.value;
  });
  (0, _defineProperty2.default)(this, "setValue", function (value) {
    _this.attributes.value = value;
    exposeAttributes(_this, ['value']);
  });
  // string # If trigger is `webhook`, this is the URL of the webhook to trigger the Automation.
  (0, _defineProperty2.default)(this, "getWebhookUrl", function () {
    return _this.attributes.webhook_url;
  });
  (0, _defineProperty2.default)(this, "setWebhookUrl", function (value) {
    _this.attributes.webhook_url = value;
    exposeAttributes(_this, ['webhook_url']);
  });
  // string # Skip the automation if there is a formal, observed holiday for this region.
  (0, _defineProperty2.default)(this, "getHolidayRegion", function () {
    return _this.attributes.holiday_region;
  });
  (0, _defineProperty2.default)(this, "setHolidayRegion", function (value) {
    _this.attributes.holiday_region = value;
    exposeAttributes(_this, ['holiday_region']);
  });
  // Upgrade a legacy Automation to Automation v2
  (0, _defineProperty2.default)(this, "upgrade", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id), "/upgrade"), 'POST', params, _this.options);
        case 6:
          response = _context.sent;
          return _context.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Manually Run Automation
  //
  // Parameters:
  //   items - array(object) - Initial items for a v2 manual trigger. Each item contains exactly one `file` path or `data` object.
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.items !== undefined && params.items !== null && !(0, _utils.isArray)(params.items))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: items must be of type Array, received ".concat((0, _utils.getType)(params.items)));
        case 4:
          if (params.id) {
            _context2.next = 6;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 5;
            break;
          }
          params.id = _this.id;
          _context2.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 6:
          _context2.next = 7;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id), "/manual_run"), 'POST', params, _this.options);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  // Parameters:
  //   source - string - Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  //   destinations - array(string) - A list of destination paths. Use a trailing slash for folder destinations and omit it for file destinations.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs, except on remote mounts.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule` without `schedule_id`, a list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - Times of day to run in HH:MM format (24-hour). Required for `custom_schedule` without `schedule_id`. Optional for `daily` triggers; if not set, runs at midnight UTC.
  //   schedule_time_zone - string - Time zone for schedule fields. Optional for `custom_schedule` without `schedule_id` and for `daily`. If not set, times are interpreted as UTC.
  //   holiday_region - string - Skip automation on holidays in this region. Optional for `custom_schedule` without `schedule_id` and for `daily`.
  //   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  //   always_serialize_jobs - boolean - Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  //   description - string - Description for the this Automation.
  //   definition - object - Automation v2 graph definition.
  //   disabled - boolean - If true, this automation will not run.
  //   exclude_pattern - string - If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  //   import_urls - array(object) - List of URLs to be imported and names to be used.
  //   flatten_destination_structure - boolean - Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  //   ignore_locked_folders - boolean - If true, the Lock Folders behavior will be disregarded for automated actions.
  //   legacy_folder_matching - boolean - DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  //   name - string - Name for this automation.
  //   overwrite_files - boolean - If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
  //   path_time_zone - string - Timezone to use when rendering timestamps in paths.
  //   retry_on_failure_interval_in_minutes - int64 - If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
  //   retry_on_failure_number_of_attempts - int64 - If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
  //   trigger - string - How this automation is triggered to run.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, copy, move, archived_delete, update, read, destroy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   recurring_days - array(int64) - If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation - string - Automation type
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.source !== undefined && params.source !== null && !(0, _utils.isString)(params.source))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
        case 4:
          if (!(params.destinations !== undefined && params.destinations !== null && !(0, _utils.isArray)(params.destinations))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destinations must be of type Array, received ".concat((0, _utils.getType)(params.destinations)));
        case 5:
          if (!(params.destination_replace_from !== undefined && params.destination_replace_from !== null && !(0, _utils.isString)(params.destination_replace_from))) {
            _context3.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_from)));
        case 6:
          if (!(params.destination_replace_to !== undefined && params.destination_replace_to !== null && !(0, _utils.isString)(params.destination_replace_to))) {
            _context3.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_to)));
        case 7:
          if (!(params.interval !== undefined && params.interval !== null && !(0, _utils.isString)(params.interval))) {
            _context3.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
        case 8:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context3.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 9:
          if (!(params.sync_ids !== undefined && params.sync_ids !== null && !(0, _utils.isString)(params.sync_ids))) {
            _context3.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sync_ids must be of type String, received ".concat((0, _utils.getType)(params.sync_ids)));
        case 10:
          if (!(params.user_ids !== undefined && params.user_ids !== null && !(0, _utils.isString)(params.user_ids))) {
            _context3.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
        case 11:
          if (!(params.group_ids !== undefined && params.group_ids !== null && !(0, _utils.isString)(params.group_ids))) {
            _context3.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
        case 12:
          if (!(params.schedule_id !== undefined && params.schedule_id !== null && !(0, _utils.isInt)(params.schedule_id))) {
            _context3.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_id must be of type Int, received ".concat((0, _utils.getType)(params.schedule_id)));
        case 13:
          if (!(params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !(0, _utils.isArray)(params.schedule_days_of_week))) {
            _context3.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
        case 14:
          if (!(params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !(0, _utils.isArray)(params.schedule_times_of_day))) {
            _context3.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
        case 15:
          if (!(params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !(0, _utils.isString)(params.schedule_time_zone))) {
            _context3.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
        case 16:
          if (!(params.holiday_region !== undefined && params.holiday_region !== null && !(0, _utils.isString)(params.holiday_region))) {
            _context3.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
        case 17:
          if (!((0, _utils.isArray)(params.always_overwrite_size_matching_files) || (0, _utils.isObject)(params.always_overwrite_size_matching_files))) {
            _context3.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: always_overwrite_size_matching_files must be of type Boolean, received ".concat((0, _utils.getType)(params.always_overwrite_size_matching_files)));
        case 18:
          if (!((0, _utils.isArray)(params.always_serialize_jobs) || (0, _utils.isObject)(params.always_serialize_jobs))) {
            _context3.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: always_serialize_jobs must be of type Boolean, received ".concat((0, _utils.getType)(params.always_serialize_jobs)));
        case 19:
          if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
            _context3.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 20:
          if (!((0, _utils.isArray)(params.disabled) || (0, _utils.isObject)(params.disabled))) {
            _context3.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: disabled must be of type Boolean, received ".concat((0, _utils.getType)(params.disabled)));
        case 21:
          if (!(params.exclude_pattern !== undefined && params.exclude_pattern !== null && !(0, _utils.isString)(params.exclude_pattern))) {
            _context3.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: exclude_pattern must be of type String, received ".concat((0, _utils.getType)(params.exclude_pattern)));
        case 22:
          if (!(params.import_urls !== undefined && params.import_urls !== null && !(0, _utils.isArray)(params.import_urls))) {
            _context3.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: import_urls must be of type Array, received ".concat((0, _utils.getType)(params.import_urls)));
        case 23:
          if (!((0, _utils.isArray)(params.flatten_destination_structure) || (0, _utils.isObject)(params.flatten_destination_structure))) {
            _context3.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: flatten_destination_structure must be of type Boolean, received ".concat((0, _utils.getType)(params.flatten_destination_structure)));
        case 24:
          if (!((0, _utils.isArray)(params.ignore_locked_folders) || (0, _utils.isObject)(params.ignore_locked_folders))) {
            _context3.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ignore_locked_folders must be of type Boolean, received ".concat((0, _utils.getType)(params.ignore_locked_folders)));
        case 25:
          if (!((0, _utils.isArray)(params.legacy_folder_matching) || (0, _utils.isObject)(params.legacy_folder_matching))) {
            _context3.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: legacy_folder_matching must be of type Boolean, received ".concat((0, _utils.getType)(params.legacy_folder_matching)));
        case 26:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context3.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 27:
          if (!((0, _utils.isArray)(params.overwrite_files) || (0, _utils.isObject)(params.overwrite_files))) {
            _context3.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: overwrite_files must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite_files)));
        case 28:
          if (!(params.path_time_zone !== undefined && params.path_time_zone !== null && !(0, _utils.isString)(params.path_time_zone))) {
            _context3.next = 29;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_time_zone)));
        case 29:
          if (!(params.retry_on_failure_interval_in_minutes !== undefined && params.retry_on_failure_interval_in_minutes !== null && !(0, _utils.isInt)(params.retry_on_failure_interval_in_minutes))) {
            _context3.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_interval_in_minutes must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_interval_in_minutes)));
        case 30:
          if (!(params.retry_on_failure_number_of_attempts !== undefined && params.retry_on_failure_number_of_attempts !== null && !(0, _utils.isInt)(params.retry_on_failure_number_of_attempts))) {
            _context3.next = 31;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_number_of_attempts must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_number_of_attempts)));
        case 31:
          if (!(params.trigger !== undefined && params.trigger !== null && !(0, _utils.isString)(params.trigger))) {
            _context3.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
        case 32:
          if (!(params.trigger_actions !== undefined && params.trigger_actions !== null && !(0, _utils.isArray)(params.trigger_actions))) {
            _context3.next = 33;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
        case 33:
          if (!(params.recurring_day !== undefined && params.recurring_day !== null && !(0, _utils.isInt)(params.recurring_day))) {
            _context3.next = 34;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
        case 34:
          if (!(params.recurring_days !== undefined && params.recurring_days !== null && !(0, _utils.isArray)(params.recurring_days))) {
            _context3.next = 35;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_days must be of type Array, received ".concat((0, _utils.getType)(params.recurring_days)));
        case 35:
          if (!(params.automation !== undefined && params.automation !== null && !(0, _utils.isString)(params.automation))) {
            _context3.next = 36;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(params.automation)));
        case 36:
          if (params.id) {
            _context3.next = 38;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 37;
            break;
          }
          params.id = _this.id;
          _context3.next = 38;
          break;
        case 37:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 38:
          _context3.next = 39;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 39:
          response = _context3.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context3.abrupt("return", _this);
        case 40:
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
    var newObject;
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
          return _context5.abrupt("return", true);
        case 2:
          _context5.next = 3;
          return Automation.create(_this.attributes, _this.options);
        case 3:
          newObject = _context5.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context5.abrupt("return", true);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Automation = Automation;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name`, `automation`, `last_modified_at` or `disabled`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `last_modified_at`, `workspace_id` or `automation`. Valid field combinations are `[ disabled, last_modified_at ]`, `[ workspace_id, disabled ]`, `[ disabled, automation ]`, `[ workspace_id, last_modified_at ]`, `[ automation, last_modified_at ]`, `[ workspace_id, automation ]`, `[ workspace_id, disabled, last_modified_at ]`, `[ disabled, automation, last_modified_at ]`, `[ workspace_id, disabled, automation ]`, `[ workspace_id, automation, last_modified_at ]` or `[ workspace_id, disabled, automation, last_modified_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `last_modified_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `last_modified_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `last_modified_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `last_modified_at`.
(0, _defineProperty2.default)(Automation, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
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
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context6.next = 3;
        return _Api.default.sendRequest('/automations', 'GET', params, options);
      case 3:
        response = _context6.sent;
        return _context6.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Automation(obj, retainedOptions(options));
        })) || []);
      case 4:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
(0, _defineProperty2.default)(Automation, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Automation.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Automation, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Automation.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Automation ID.
(0, _defineProperty2.default)(Automation, "find", /*#__PURE__*/function () {
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context7.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context7.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context7.next = 4;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context7.sent;
          return _context7.abrupt("return", new _Automation(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
(0, _defineProperty2.default)(Automation, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Automation.find(id, params, options);
});
(0, _defineProperty2.default)(Automation, "getAuthoringSchema", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var options,
    response,
    AutomationAuthoringSchema,
    _args8 = arguments;
  return _regenerator.default.wrap(function (_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
        _context8.next = 1;
        return _Api.default.sendRequest('/automations/authoring_schema', 'GET', {}, options);
      case 1:
        response = _context8.sent;
        AutomationAuthoringSchema = require('./AutomationAuthoringSchema.js').default;
        return _context8.abrupt("return", new AutomationAuthoringSchema(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 2:
      case "end":
        return _context8.stop();
    }
  }, _callee8);
})));
// Parameters:
//   source - string - Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
//   destinations - array(string) - A list of destination paths. Use a trailing slash for folder destinations and omit it for file destinations.
//   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
//   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
//   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
//   path - string - Path on which this Automation runs.  Supports globs, except on remote mounts.
//   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields.
//   schedule_days_of_week - array(int64) - If trigger is `custom_schedule` without `schedule_id`, a list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
//   schedule_times_of_day - array(string) - Times of day to run in HH:MM format (24-hour). Required for `custom_schedule` without `schedule_id`. Optional for `daily` triggers; if not set, runs at midnight UTC.
//   schedule_time_zone - string - Time zone for schedule fields. Optional for `custom_schedule` without `schedule_id` and for `daily`. If not set, times are interpreted as UTC.
//   holiday_region - string - Skip automation on holidays in this region. Optional for `custom_schedule` without `schedule_id` and for `daily`.
//   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
//   always_serialize_jobs - boolean - Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
//   description - string - Description for the this Automation.
//   definition - object - Automation v2 graph definition.
//   disabled - boolean - If true, this automation will not run.
//   exclude_pattern - string - If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
//   import_urls - array(object) - List of URLs to be imported and names to be used.
//   flatten_destination_structure - boolean - Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
//   ignore_locked_folders - boolean - If true, the Lock Folders behavior will be disregarded for automated actions.
//   legacy_folder_matching - boolean - DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
//   name - string - Name for this automation.
//   overwrite_files - boolean - If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
//   path_time_zone - string - Timezone to use when rendering timestamps in paths.
//   retry_on_failure_interval_in_minutes - int64 - If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
//   retry_on_failure_number_of_attempts - int64 - If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
//   trigger - string - How this automation is triggered to run.
//   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, copy, move, archived_delete, update, read, destroy
//   value - object - A Hash of attributes specific to the automation type.
//   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
//   recurring_days - array(int64) - If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
//   automation (required) - string - Automation type
//   workspace_id - int64 - Workspace ID
(0, _defineProperty2.default)(Automation, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9() {
  var params,
    options,
    response,
    _args9 = arguments;
  return _regenerator.default.wrap(function (_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        params = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
        options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
        if (params.automation) {
          _context9.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: automation');
      case 1:
        if (!(params.source !== undefined && params.source !== null && !(0, _utils.isString)(params.source))) {
          _context9.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
      case 2:
        if (!(params.destinations !== undefined && params.destinations !== null && !(0, _utils.isArray)(params.destinations))) {
          _context9.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destinations must be of type Array, received ".concat((0, _utils.getType)(params.destinations)));
      case 3:
        if (!(params.destination_replace_from !== undefined && params.destination_replace_from !== null && !(0, _utils.isString)(params.destination_replace_from))) {
          _context9.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_from)));
      case 4:
        if (!(params.destination_replace_to !== undefined && params.destination_replace_to !== null && !(0, _utils.isString)(params.destination_replace_to))) {
          _context9.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_to)));
      case 5:
        if (!(params.interval !== undefined && params.interval !== null && !(0, _utils.isString)(params.interval))) {
          _context9.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
      case 6:
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context9.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 7:
        if (!(params.sync_ids !== undefined && params.sync_ids !== null && !(0, _utils.isString)(params.sync_ids))) {
          _context9.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sync_ids must be of type String, received ".concat((0, _utils.getType)(params.sync_ids)));
      case 8:
        if (!(params.user_ids !== undefined && params.user_ids !== null && !(0, _utils.isString)(params.user_ids))) {
          _context9.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
      case 9:
        if (!(params.group_ids !== undefined && params.group_ids !== null && !(0, _utils.isString)(params.group_ids))) {
          _context9.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
      case 10:
        if (!(params.schedule_id !== undefined && params.schedule_id !== null && !(0, _utils.isInt)(params.schedule_id))) {
          _context9.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_id must be of type Int, received ".concat((0, _utils.getType)(params.schedule_id)));
      case 11:
        if (!(params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !(0, _utils.isArray)(params.schedule_days_of_week))) {
          _context9.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
      case 12:
        if (!(params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !(0, _utils.isArray)(params.schedule_times_of_day))) {
          _context9.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
      case 13:
        if (!(params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !(0, _utils.isString)(params.schedule_time_zone))) {
          _context9.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
      case 14:
        if (!(params.holiday_region !== undefined && params.holiday_region !== null && !(0, _utils.isString)(params.holiday_region))) {
          _context9.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
      case 15:
        if (!((0, _utils.isArray)(params.always_overwrite_size_matching_files) || (0, _utils.isObject)(params.always_overwrite_size_matching_files))) {
          _context9.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: always_overwrite_size_matching_files must be of type Boolean, received ".concat((0, _utils.getType)(params.always_overwrite_size_matching_files)));
      case 16:
        if (!((0, _utils.isArray)(params.always_serialize_jobs) || (0, _utils.isObject)(params.always_serialize_jobs))) {
          _context9.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: always_serialize_jobs must be of type Boolean, received ".concat((0, _utils.getType)(params.always_serialize_jobs)));
      case 17:
        if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
          _context9.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 18:
        if (!((0, _utils.isArray)(params.disabled) || (0, _utils.isObject)(params.disabled))) {
          _context9.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disabled must be of type Boolean, received ".concat((0, _utils.getType)(params.disabled)));
      case 19:
        if (!(params.exclude_pattern !== undefined && params.exclude_pattern !== null && !(0, _utils.isString)(params.exclude_pattern))) {
          _context9.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: exclude_pattern must be of type String, received ".concat((0, _utils.getType)(params.exclude_pattern)));
      case 20:
        if (!(params.import_urls !== undefined && params.import_urls !== null && !(0, _utils.isArray)(params.import_urls))) {
          _context9.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: import_urls must be of type Array, received ".concat((0, _utils.getType)(params.import_urls)));
      case 21:
        if (!((0, _utils.isArray)(params.flatten_destination_structure) || (0, _utils.isObject)(params.flatten_destination_structure))) {
          _context9.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: flatten_destination_structure must be of type Boolean, received ".concat((0, _utils.getType)(params.flatten_destination_structure)));
      case 22:
        if (!((0, _utils.isArray)(params.ignore_locked_folders) || (0, _utils.isObject)(params.ignore_locked_folders))) {
          _context9.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ignore_locked_folders must be of type Boolean, received ".concat((0, _utils.getType)(params.ignore_locked_folders)));
      case 23:
        if (!((0, _utils.isArray)(params.legacy_folder_matching) || (0, _utils.isObject)(params.legacy_folder_matching))) {
          _context9.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: legacy_folder_matching must be of type Boolean, received ".concat((0, _utils.getType)(params.legacy_folder_matching)));
      case 24:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context9.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 25:
        if (!((0, _utils.isArray)(params.overwrite_files) || (0, _utils.isObject)(params.overwrite_files))) {
          _context9.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: overwrite_files must be of type Boolean, received ".concat((0, _utils.getType)(params.overwrite_files)));
      case 26:
        if (!(params.path_time_zone !== undefined && params.path_time_zone !== null && !(0, _utils.isString)(params.path_time_zone))) {
          _context9.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_time_zone)));
      case 27:
        if (!(params.retry_on_failure_interval_in_minutes !== undefined && params.retry_on_failure_interval_in_minutes !== null && !(0, _utils.isInt)(params.retry_on_failure_interval_in_minutes))) {
          _context9.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_interval_in_minutes must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_interval_in_minutes)));
      case 28:
        if (!(params.retry_on_failure_number_of_attempts !== undefined && params.retry_on_failure_number_of_attempts !== null && !(0, _utils.isInt)(params.retry_on_failure_number_of_attempts))) {
          _context9.next = 29;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_number_of_attempts must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_number_of_attempts)));
      case 29:
        if (!(params.trigger !== undefined && params.trigger !== null && !(0, _utils.isString)(params.trigger))) {
          _context9.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
      case 30:
        if (!(params.trigger_actions !== undefined && params.trigger_actions !== null && !(0, _utils.isArray)(params.trigger_actions))) {
          _context9.next = 31;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
      case 31:
        if (!(params.recurring_day !== undefined && params.recurring_day !== null && !(0, _utils.isInt)(params.recurring_day))) {
          _context9.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
      case 32:
        if (!(params.recurring_days !== undefined && params.recurring_days !== null && !(0, _utils.isArray)(params.recurring_days))) {
          _context9.next = 33;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_days must be of type Array, received ".concat((0, _utils.getType)(params.recurring_days)));
      case 33:
        if (!(params.automation !== undefined && params.automation !== null && !(0, _utils.isString)(params.automation))) {
          _context9.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(params.automation)));
      case 34:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context9.next = 35;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 35:
        _context9.next = 36;
        return _Api.default.sendRequest('/automations', 'POST', params, options);
      case 36:
        response = _context9.sent;
        return _context9.abrupt("return", new _Automation(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 37:
      case "end":
        return _context9.stop();
    }
  }, _callee9);
})));
var _default = exports.default = Automation;
module.exports = Automation;
module.exports.default = Automation;