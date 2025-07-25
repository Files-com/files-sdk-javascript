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
var _Automation;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
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
  });
  // boolean # Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  (0, _defineProperty2.default)(this, "getAlwaysSerializeJobs", function () {
    return _this.attributes.always_serialize_jobs;
  });
  (0, _defineProperty2.default)(this, "setAlwaysSerializeJobs", function (value) {
    _this.attributes.always_serialize_jobs = value;
  });
  // boolean # Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  (0, _defineProperty2.default)(this, "getAlwaysOverwriteSizeMatchingFiles", function () {
    return _this.attributes.always_overwrite_size_matching_files;
  });
  (0, _defineProperty2.default)(this, "setAlwaysOverwriteSizeMatchingFiles", function (value) {
    _this.attributes.always_overwrite_size_matching_files = value;
  });
  // string # Automation type
  (0, _defineProperty2.default)(this, "getAutomation", function () {
    return _this.attributes.automation;
  });
  (0, _defineProperty2.default)(this, "setAutomation", function (value) {
    _this.attributes.automation = value;
  });
  // boolean # Indicates if the automation has been deleted.
  (0, _defineProperty2.default)(this, "getDeleted", function () {
    return _this.attributes.deleted;
  });
  (0, _defineProperty2.default)(this, "setDeleted", function (value) {
    _this.attributes.deleted = value;
  });
  // string # Description for the this Automation.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // string # If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  (0, _defineProperty2.default)(this, "getDestinationReplaceFrom", function () {
    return _this.attributes.destination_replace_from;
  });
  (0, _defineProperty2.default)(this, "setDestinationReplaceFrom", function (value) {
    _this.attributes.destination_replace_from = value;
  });
  // string # If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  (0, _defineProperty2.default)(this, "getDestinationReplaceTo", function () {
    return _this.attributes.destination_replace_to;
  });
  (0, _defineProperty2.default)(this, "setDestinationReplaceTo", function (value) {
    _this.attributes.destination_replace_to = value;
  });
  // array(string) # Destination Paths
  (0, _defineProperty2.default)(this, "getDestinations", function () {
    return _this.attributes.destinations;
  });
  (0, _defineProperty2.default)(this, "setDestinations", function (value) {
    _this.attributes.destinations = value;
  });
  // boolean # If true, this automation will not run.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  // string # If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  (0, _defineProperty2.default)(this, "getExcludePattern", function () {
    return _this.attributes.exclude_pattern;
  });
  (0, _defineProperty2.default)(this, "setExcludePattern", function (value) {
    _this.attributes.exclude_pattern = value;
  });
  // array(object) # List of URLs to be imported and names to be used.
  (0, _defineProperty2.default)(this, "getImportUrls", function () {
    return _this.attributes.import_urls;
  });
  (0, _defineProperty2.default)(this, "setImportUrls", function (value) {
    _this.attributes.import_urls = value;
  });
  // boolean # Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  (0, _defineProperty2.default)(this, "getFlattenDestinationStructure", function () {
    return _this.attributes.flatten_destination_structure;
  });
  (0, _defineProperty2.default)(this, "setFlattenDestinationStructure", function (value) {
    _this.attributes.flatten_destination_structure = value;
  });
  // array(int64) # IDs of Groups for the Automation (i.e. who to Request File from)
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
  });
  // boolean # If true, the Lock Folders behavior will be disregarded for automated actions.
  (0, _defineProperty2.default)(this, "getIgnoreLockedFolders", function () {
    return _this.attributes.ignore_locked_folders;
  });
  (0, _defineProperty2.default)(this, "setIgnoreLockedFolders", function (value) {
    _this.attributes.ignore_locked_folders = value;
  });
  // string # If trigger is `daily`, this specifies how often to run this automation.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
  });
  // date-time # Time when automation was last modified. Does not change for name or description updates.
  (0, _defineProperty2.default)(this, "getLastModifiedAt", function () {
    return _this.attributes.last_modified_at;
  });
  (0, _defineProperty2.default)(this, "setLastModifiedAt", function (value) {
    _this.attributes.last_modified_at = value;
  });
  // boolean # If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  (0, _defineProperty2.default)(this, "getLegacyFolderMatching", function () {
    return _this.attributes.legacy_folder_matching;
  });
  (0, _defineProperty2.default)(this, "setLegacyFolderMatching", function (value) {
    _this.attributes.legacy_folder_matching = value;
  });
  // string # Name for this automation.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // boolean # If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
  (0, _defineProperty2.default)(this, "getOverwriteFiles", function () {
    return _this.attributes.overwrite_files;
  });
  (0, _defineProperty2.default)(this, "setOverwriteFiles", function (value) {
    _this.attributes.overwrite_files = value;
  });
  // string # Path on which this Automation runs.  Supports globs, except on remote mounts. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // string # Timezone to use when rendering timestamps in paths.
  (0, _defineProperty2.default)(this, "getPathTimeZone", function () {
    return _this.attributes.path_time_zone;
  });
  (0, _defineProperty2.default)(this, "setPathTimeZone", function (value) {
    _this.attributes.path_time_zone = value;
  });
  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  (0, _defineProperty2.default)(this, "getRecurringDay", function () {
    return _this.attributes.recurring_day;
  });
  (0, _defineProperty2.default)(this, "setRecurringDay", function (value) {
    _this.attributes.recurring_day = value;
  });
  // int64 # If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
  (0, _defineProperty2.default)(this, "getRetryOnFailureIntervalInMinutes", function () {
    return _this.attributes.retry_on_failure_interval_in_minutes;
  });
  (0, _defineProperty2.default)(this, "setRetryOnFailureIntervalInMinutes", function (value) {
    _this.attributes.retry_on_failure_interval_in_minutes = value;
  });
  // int64 # If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
  (0, _defineProperty2.default)(this, "getRetryOnFailureNumberOfAttempts", function () {
    return _this.attributes.retry_on_failure_number_of_attempts;
  });
  (0, _defineProperty2.default)(this, "setRetryOnFailureNumberOfAttempts", function (value) {
    _this.attributes.retry_on_failure_number_of_attempts = value;
  });
  // object # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
  (0, _defineProperty2.default)(this, "getSchedule", function () {
    return _this.attributes.schedule;
  });
  (0, _defineProperty2.default)(this, "setSchedule", function (value) {
    _this.attributes.schedule = value;
  });
  // string # If trigger is `custom_schedule`, Human readable Custom schedule description for when the automation should be run.
  (0, _defineProperty2.default)(this, "getHumanReadableSchedule", function () {
    return _this.attributes.human_readable_schedule;
  });
  (0, _defineProperty2.default)(this, "setHumanReadableSchedule", function (value) {
    _this.attributes.human_readable_schedule = value;
  });
  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  (0, _defineProperty2.default)(this, "getScheduleDaysOfWeek", function () {
    return _this.attributes.schedule_days_of_week;
  });
  (0, _defineProperty2.default)(this, "setScheduleDaysOfWeek", function (value) {
    _this.attributes.schedule_days_of_week = value;
  });
  // array(string) # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. Times of day in HH:MM format.
  (0, _defineProperty2.default)(this, "getScheduleTimesOfDay", function () {
    return _this.attributes.schedule_times_of_day;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimesOfDay", function (value) {
    _this.attributes.schedule_times_of_day = value;
  });
  // string # If trigger is `custom_schedule`, Custom schedule Time Zone for when the automation should be run.
  (0, _defineProperty2.default)(this, "getScheduleTimeZone", function () {
    return _this.attributes.schedule_time_zone;
  });
  (0, _defineProperty2.default)(this, "setScheduleTimeZone", function (value) {
    _this.attributes.schedule_time_zone = value;
  });
  // string # Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "setSource", function (value) {
    _this.attributes.source = value;
  });
  // array(int64) # IDs of remote sync folder behaviors to run by this Automation
  (0, _defineProperty2.default)(this, "getLegacySyncIds", function () {
    return _this.attributes.legacy_sync_ids;
  });
  (0, _defineProperty2.default)(this, "setLegacySyncIds", function (value) {
    _this.attributes.legacy_sync_ids = value;
  });
  // array(int64) # IDs of syncs to run by this Automation. This is the new way to specify syncs, and it is recommended to use this instead of `legacy_sync_ids`.
  (0, _defineProperty2.default)(this, "getSyncIds", function () {
    return _this.attributes.sync_ids;
  });
  (0, _defineProperty2.default)(this, "setSyncIds", function (value) {
    _this.attributes.sync_ids = value;
  });
  // array(string) # If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  (0, _defineProperty2.default)(this, "getTriggerActions", function () {
    return _this.attributes.trigger_actions;
  });
  (0, _defineProperty2.default)(this, "setTriggerActions", function (value) {
    _this.attributes.trigger_actions = value;
  });
  // string # How this automation is triggered to run.
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
  });
  // int64 # User ID of the Automation's creator.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // array(int64) # IDs of Users for the Automation (i.e. who to Request File from)
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
  });
  // object # A Hash of attributes specific to the automation type.
  (0, _defineProperty2.default)(this, "getValue", function () {
    return _this.attributes.value;
  });
  (0, _defineProperty2.default)(this, "setValue", function (value) {
    _this.attributes.value = value;
  });
  // string # If trigger is `webhook`, this is the URL of the webhook to trigger the Automation.
  (0, _defineProperty2.default)(this, "getWebhookUrl", function () {
    return _this.attributes.webhook_url;
  });
  (0, _defineProperty2.default)(this, "setWebhookUrl", function (value) {
    _this.attributes.webhook_url = value;
  });
  // string # If trigger is `custom_schedule`, the Automation will check if there is a formal, observed holiday for the region, and if so, it will not run.
  (0, _defineProperty2.default)(this, "getHolidayRegion", function () {
    return _this.attributes.holiday_region;
  });
  (0, _defineProperty2.default)(this, "setHolidayRegion", function (value) {
    _this.attributes.holiday_region = value;
  });
  // Manually Run Automation
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
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id), "/manual_run"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Parameters:
  //   source - string - Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  //   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs, except on remote mounts.
  //   legacy_sync_ids - string - A list of legacy sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`. A list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - If trigger is `custom_schedule`. A list of times of day to run this automation. 24-hour time format.
  //   schedule_time_zone - string - If trigger is `custom_schedule`. Time zone for the schedule.
  //   holiday_region - string - If trigger is `custom_schedule`, the Automation will check if there is a formal, observed holiday for the region, and if so, it will not run.
  //   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  //   always_serialize_jobs - boolean - Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  //   description - string - Description for the this Automation.
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
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation - string - Automation type
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
          if (!(params.source && !(0, _utils.isString)(params.source))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
        case 4:
          if (!(params.destinations && !(0, _utils.isArray)(params.destinations))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destinations must be of type Array, received ".concat((0, _utils.getType)(params.destinations)));
        case 5:
          if (!(params.destination_replace_from && !(0, _utils.isString)(params.destination_replace_from))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_from)));
        case 6:
          if (!(params.destination_replace_to && !(0, _utils.isString)(params.destination_replace_to))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_to)));
        case 7:
          if (!(params.interval && !(0, _utils.isString)(params.interval))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
        case 8:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 9:
          if (!(params.legacy_sync_ids && !(0, _utils.isString)(params.legacy_sync_ids))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: legacy_sync_ids must be of type String, received ".concat((0, _utils.getType)(params.legacy_sync_ids)));
        case 10:
          if (!(params.sync_ids && !(0, _utils.isString)(params.sync_ids))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sync_ids must be of type String, received ".concat((0, _utils.getType)(params.sync_ids)));
        case 11:
          if (!(params.user_ids && !(0, _utils.isString)(params.user_ids))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
        case 12:
          if (!(params.group_ids && !(0, _utils.isString)(params.group_ids))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
        case 13:
          if (!(params.schedule_days_of_week && !(0, _utils.isArray)(params.schedule_days_of_week))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
        case 14:
          if (!(params.schedule_times_of_day && !(0, _utils.isArray)(params.schedule_times_of_day))) {
            _context2.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
        case 15:
          if (!(params.schedule_time_zone && !(0, _utils.isString)(params.schedule_time_zone))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
        case 16:
          if (!(params.holiday_region && !(0, _utils.isString)(params.holiday_region))) {
            _context2.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
        case 17:
          if (!(params.description && !(0, _utils.isString)(params.description))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 18:
          if (!(params.exclude_pattern && !(0, _utils.isString)(params.exclude_pattern))) {
            _context2.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: exclude_pattern must be of type String, received ".concat((0, _utils.getType)(params.exclude_pattern)));
        case 19:
          if (!(params.import_urls && !(0, _utils.isArray)(params.import_urls))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: import_urls must be of type Array, received ".concat((0, _utils.getType)(params.import_urls)));
        case 20:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context2.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 21:
          if (!(params.path_time_zone && !(0, _utils.isString)(params.path_time_zone))) {
            _context2.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_time_zone)));
        case 22:
          if (!(params.retry_on_failure_interval_in_minutes && !(0, _utils.isInt)(params.retry_on_failure_interval_in_minutes))) {
            _context2.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_interval_in_minutes must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_interval_in_minutes)));
        case 23:
          if (!(params.retry_on_failure_number_of_attempts && !(0, _utils.isInt)(params.retry_on_failure_number_of_attempts))) {
            _context2.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_number_of_attempts must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_number_of_attempts)));
        case 24:
          if (!(params.trigger && !(0, _utils.isString)(params.trigger))) {
            _context2.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
        case 25:
          if (!(params.trigger_actions && !(0, _utils.isArray)(params.trigger_actions))) {
            _context2.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
        case 26:
          if (!(params.recurring_day && !(0, _utils.isInt)(params.recurring_day))) {
            _context2.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
        case 27:
          if (!(params.automation && !(0, _utils.isString)(params.automation))) {
            _context2.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(params.automation)));
        case 28:
          if (params.id) {
            _context2.next = 30;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 29;
            break;
          }
          params.id = _this.id;
          _context2.next = 30;
          break;
        case 29:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 30:
          _context2.next = 31;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 31:
          response = _context2.sent;
          return _context2.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 32:
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
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return Automation.create(_this.attributes, _this.options);
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
_Automation = Automation;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation`, `disabled`, `last_modified_at` or `name`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `last_modified_at` or `automation`. Valid field combinations are `[ disabled, last_modified_at ]`, `[ automation, disabled ]`, `[ automation, last_modified_at ]` or `[ automation, disabled, last_modified_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `last_modified_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `last_modified_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `last_modified_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `last_modified_at`.
(0, _defineProperty2.default)(Automation, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
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
        return _Api.default.sendRequest('/automations', 'GET', params, options);
      case 3:
        response = _context5.sent;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Automation(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(Automation, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Automation.list(params, options);
});
// Parameters:
//   id (required) - int64 - Automation ID.
(0, _defineProperty2.default)(Automation, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _Automation(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(Automation, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Automation.find(id, params, options);
});
// Parameters:
//   source - string - Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
//   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
//   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
//   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
//   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
//   path - string - Path on which this Automation runs.  Supports globs, except on remote mounts.
//   legacy_sync_ids - string - A list of legacy sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`. A list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
//   schedule_times_of_day - array(string) - If trigger is `custom_schedule`. A list of times of day to run this automation. 24-hour time format.
//   schedule_time_zone - string - If trigger is `custom_schedule`. Time zone for the schedule.
//   holiday_region - string - If trigger is `custom_schedule`, the Automation will check if there is a formal, observed holiday for the region, and if so, it will not run.
//   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
//   always_serialize_jobs - boolean - Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
//   description - string - Description for the this Automation.
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
//   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
//   value - object - A Hash of attributes specific to the automation type.
//   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
//   automation (required) - string - Automation type
(0, _defineProperty2.default)(Automation, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.automation) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: automation');
      case 1:
        if (!(params.source && !(0, _utils.isString)(params.source))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params.source)));
      case 2:
        if (!(params.destinations && !(0, _utils.isArray)(params.destinations))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destinations must be of type Array, received ".concat((0, _utils.getType)(params.destinations)));
      case 3:
        if (!(params.destination_replace_from && !(0, _utils.isString)(params.destination_replace_from))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_from)));
      case 4:
        if (!(params.destination_replace_to && !(0, _utils.isString)(params.destination_replace_to))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(params.destination_replace_to)));
      case 5:
        if (!(params.interval && !(0, _utils.isString)(params.interval))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params.interval)));
      case 6:
        if (!(params.path && !(0, _utils.isString)(params.path))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 7:
        if (!(params.legacy_sync_ids && !(0, _utils.isString)(params.legacy_sync_ids))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: legacy_sync_ids must be of type String, received ".concat((0, _utils.getType)(params.legacy_sync_ids)));
      case 8:
        if (!(params.sync_ids && !(0, _utils.isString)(params.sync_ids))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sync_ids must be of type String, received ".concat((0, _utils.getType)(params.sync_ids)));
      case 9:
        if (!(params.user_ids && !(0, _utils.isString)(params.user_ids))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
      case 10:
        if (!(params.group_ids && !(0, _utils.isString)(params.group_ids))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
      case 11:
        if (!(params.schedule_days_of_week && !(0, _utils.isArray)(params.schedule_days_of_week))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_days_of_week must be of type Array, received ".concat((0, _utils.getType)(params.schedule_days_of_week)));
      case 12:
        if (!(params.schedule_times_of_day && !(0, _utils.isArray)(params.schedule_times_of_day))) {
          _context7.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_times_of_day must be of type Array, received ".concat((0, _utils.getType)(params.schedule_times_of_day)));
      case 13:
        if (!(params.schedule_time_zone && !(0, _utils.isString)(params.schedule_time_zone))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: schedule_time_zone must be of type String, received ".concat((0, _utils.getType)(params.schedule_time_zone)));
      case 14:
        if (!(params.holiday_region && !(0, _utils.isString)(params.holiday_region))) {
          _context7.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: holiday_region must be of type String, received ".concat((0, _utils.getType)(params.holiday_region)));
      case 15:
        if (!(params.description && !(0, _utils.isString)(params.description))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 16:
        if (!(params.exclude_pattern && !(0, _utils.isString)(params.exclude_pattern))) {
          _context7.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: exclude_pattern must be of type String, received ".concat((0, _utils.getType)(params.exclude_pattern)));
      case 17:
        if (!(params.import_urls && !(0, _utils.isArray)(params.import_urls))) {
          _context7.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: import_urls must be of type Array, received ".concat((0, _utils.getType)(params.import_urls)));
      case 18:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context7.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 19:
        if (!(params.path_time_zone && !(0, _utils.isString)(params.path_time_zone))) {
          _context7.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_time_zone)));
      case 20:
        if (!(params.retry_on_failure_interval_in_minutes && !(0, _utils.isInt)(params.retry_on_failure_interval_in_minutes))) {
          _context7.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_interval_in_minutes must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_interval_in_minutes)));
      case 21:
        if (!(params.retry_on_failure_number_of_attempts && !(0, _utils.isInt)(params.retry_on_failure_number_of_attempts))) {
          _context7.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: retry_on_failure_number_of_attempts must be of type Int, received ".concat((0, _utils.getType)(params.retry_on_failure_number_of_attempts)));
      case 22:
        if (!(params.trigger && !(0, _utils.isString)(params.trigger))) {
          _context7.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params.trigger)));
      case 23:
        if (!(params.trigger_actions && !(0, _utils.isArray)(params.trigger_actions))) {
          _context7.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params.trigger_actions)));
      case 24:
        if (!(params.recurring_day && !(0, _utils.isInt)(params.recurring_day))) {
          _context7.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params.recurring_day)));
      case 25:
        if (!(params.automation && !(0, _utils.isString)(params.automation))) {
          _context7.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(params.automation)));
      case 26:
        _context7.next = 27;
        return _Api.default.sendRequest('/automations', 'POST', params, options);
      case 27:
        response = _context7.sent;
        return _context7.abrupt("return", new _Automation(response === null || response === void 0 ? void 0 : response.data, options));
      case 28:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = Automation;
module.exports = Automation;
module.exports.default = Automation;