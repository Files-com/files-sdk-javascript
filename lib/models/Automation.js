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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  // boolean # If true, this automation will not run.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  // string # How this automation is triggered to run. One of: `realtime`, `daily`, `custom_schedule`, `webhook`, `email`, or `action`.
  (0, _defineProperty2.default)(this, "getTrigger", function () {
    return _this.attributes.trigger;
  });
  (0, _defineProperty2.default)(this, "setTrigger", function (value) {
    _this.attributes.trigger = value;
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
  // string # Name for this automation.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // object # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run.
  (0, _defineProperty2.default)(this, "getSchedule", function () {
    return _this.attributes.schedule;
  });
  (0, _defineProperty2.default)(this, "setSchedule", function (value) {
    _this.attributes.schedule = value;
  });
  // string # Source Path
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "setSource", function (value) {
    _this.attributes.source = value;
  });
  // array # Destination Path
  (0, _defineProperty2.default)(this, "getDestinations", function () {
    return _this.attributes.destinations;
  });
  (0, _defineProperty2.default)(this, "setDestinations", function (value) {
    _this.attributes.destinations = value;
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
  // string # Description for the this Automation.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  (0, _defineProperty2.default)(this, "getRecurringDay", function () {
    return _this.attributes.recurring_day;
  });
  (0, _defineProperty2.default)(this, "setRecurringDay", function (value) {
    _this.attributes.recurring_day = value;
  });
  // string # Path on which this Automation runs.  Supports globs. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // int64 # User ID of the Automation's creator.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // array # IDs of remote sync folder behaviors to run by this Automation
  (0, _defineProperty2.default)(this, "getSyncIds", function () {
    return _this.attributes.sync_ids;
  });
  (0, _defineProperty2.default)(this, "setSyncIds", function (value) {
    _this.attributes.sync_ids = value;
  });
  // array # IDs of Users for the Automation (i.e. who to Request File from)
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
  });
  // array # IDs of Groups for the Automation (i.e. who to Request File from)
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
  });
  // string # If trigger is `webhook`, this is the URL of the webhook to trigger the Automation.
  (0, _defineProperty2.default)(this, "getWebhookUrl", function () {
    return _this.attributes.webhook_url;
  });
  (0, _defineProperty2.default)(this, "setWebhookUrl", function (value) {
    _this.attributes.webhook_url = value;
  });
  // array # If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  (0, _defineProperty2.default)(this, "getTriggerActions", function () {
    return _this.attributes.trigger_actions;
  });
  (0, _defineProperty2.default)(this, "setTriggerActions", function (value) {
    _this.attributes.trigger_actions = value;
  });
  // object # A Hash of attributes specific to the automation type.
  (0, _defineProperty2.default)(this, "getValue", function () {
    return _this.attributes.value;
  });
  (0, _defineProperty2.default)(this, "setValue", function (value) {
    _this.attributes.value = value;
  });
  // string # DEPRECATED: Destination Path. Use `destinations` instead.
  (0, _defineProperty2.default)(this, "getDestination", function () {
    return _this.attributes.destination;
  });
  (0, _defineProperty2.default)(this, "setDestination", function (value) {
    _this.attributes.destination = value;
  });
  // Manually run automation
  (0, _defineProperty2.default)(this, "manualRun", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (params['id']) {
            _context.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 13;
            break;
          }
          params['id'] = _this.id;
          _context.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context.next = 16;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params['id']), "/manual_run"), 'POST', params, _this.options);
        case 16:
          response = _context.sent;
          return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Parameters:
  //   source - string - Source Path
  //   destination - string - DEPRECATED: Destination Path. Use `destinations` instead.
  //   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule - object - Custom schedule for running this automation.
  //   description - string - Description for the this Automation.
  //   disabled - boolean - If true, this automation will not run.
  //   name - string - Name for this automation.
  //   trigger - string - How this automation is triggered to run. One of: `realtime`, `daily`, `custom_schedule`, `webhook`, `email`, or `action`.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation - string - Automation type
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (!(params['source'] && !(0, _utils.isString)(params['source']))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(source)));
        case 10:
          if (!(params['destination'] && !(0, _utils.isString)(params['destination']))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(destination)));
        case 12:
          if (!(params['destinations'] && !(0, _utils.isArray)(params['destinations']))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destinations must be of type Array, received ".concat((0, _utils.getType)(destinations)));
        case 14:
          if (!(params['destination_replace_from'] && !(0, _utils.isString)(params['destination_replace_from']))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(destination_replace_from)));
        case 16:
          if (!(params['destination_replace_to'] && !(0, _utils.isString)(params['destination_replace_to']))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(destination_replace_to)));
        case 18:
          if (!(params['interval'] && !(0, _utils.isString)(params['interval']))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(interval)));
        case 20:
          if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
            _context2.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));
        case 22:
          if (!(params['sync_ids'] && !(0, _utils.isString)(params['sync_ids']))) {
            _context2.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sync_ids must be of type String, received ".concat((0, _utils.getType)(sync_ids)));
        case 24:
          if (!(params['user_ids'] && !(0, _utils.isString)(params['user_ids']))) {
            _context2.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(user_ids)));
        case 26:
          if (!(params['group_ids'] && !(0, _utils.isString)(params['group_ids']))) {
            _context2.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(group_ids)));
        case 28:
          if (!(params['description'] && !(0, _utils.isString)(params['description']))) {
            _context2.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(description)));
        case 30:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context2.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));
        case 32:
          if (!(params['trigger'] && !(0, _utils.isString)(params['trigger']))) {
            _context2.next = 34;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(trigger)));
        case 34:
          if (!(params['trigger_actions'] && !(0, _utils.isArray)(params['trigger_actions']))) {
            _context2.next = 36;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(trigger_actions)));
        case 36:
          if (!(params['recurring_day'] && !(0, _utils.isInt)(params['recurring_day']))) {
            _context2.next = 38;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(recurring_day)));
        case 38:
          if (!(params['automation'] && !(0, _utils.isString)(params['automation']))) {
            _context2.next = 40;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(automation)));
        case 40:
          if (params['id']) {
            _context2.next = 46;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 45;
            break;
          }
          params['id'] = _this.id;
          _context2.next = 46;
          break;
        case 45:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 46:
          _context2.next = 48;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 48:
          response = _context2.sent;
          return _context2.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 50:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          if (_this.attributes.id) {
            _context3.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context3.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (params['id']) {
            _context3.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 13;
            break;
          }
          params['id'] = _this.id;
          _context3.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context3.next = 16;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
        case 16:
          response = _context3.sent;
          return _context3.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = Automation.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
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
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[automation]=desc`). Valid fields are `automation`, `disabled`, `last_modified_at` or `name`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `last_modified_at` or `automation`. Valid field combinations are `[ automation, disabled ]` and `[ disabled, automation ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `last_modified_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `last_modified_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `last_modified_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `last_modified_at`.
//   with_deleted - boolean - Set to true to include deleted automations in the results.
(0, _defineProperty2.default)(Automation, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 4:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context4.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 6:
        _context4.next = 8;
        return _Api.default.sendRequest("/automations", 'GET', params, options);
      case 8:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new Automation(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(Automation, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Automation.list(params, options);
});
// Parameters:
//   id (required) - int64 - Automation ID.
(0, _defineProperty2.default)(Automation, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context5.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context5.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context5.next = 11;
          return _Api.default.sendRequest("/automations/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context5.sent;
          return _context5.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Automation, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Automation.find(id, params, options);
});
// Parameters:
//   source - string - Source Path
//   destination - string - DEPRECATED: Destination Path. Use `destinations` instead.
//   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
//   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
//   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
//   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
//   path - string - Path on which this Automation runs.  Supports globs.
//   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
//   schedule - object - Custom schedule for running this automation.
//   description - string - Description for the this Automation.
//   disabled - boolean - If true, this automation will not run.
//   name - string - Name for this automation.
//   trigger - string - How this automation is triggered to run. One of: `realtime`, `daily`, `custom_schedule`, `webhook`, `email`, or `action`.
//   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
//   value - object - A Hash of attributes specific to the automation type.
//   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
//   automation (required) - string - Automation type
(0, _defineProperty2.default)(Automation, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params['automation']) {
          _context6.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: automation');
      case 4:
        if (!(params['source'] && !(0, _utils.isString)(params['source']))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(params['source'])));
      case 6:
        if (!(params['destination'] && !(0, _utils.isString)(params['destination']))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(params['destination'])));
      case 8:
        if (!(params['destinations'] && !(0, _utils.isArray)(params['destinations']))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destinations must be of type Array, received ".concat((0, _utils.getType)(params['destinations'])));
      case 10:
        if (!(params['destination_replace_from'] && !(0, _utils.isString)(params['destination_replace_from']))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(params['destination_replace_from'])));
      case 12:
        if (!(params['destination_replace_to'] && !(0, _utils.isString)(params['destination_replace_to']))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(params['destination_replace_to'])));
      case 14:
        if (!(params['interval'] && !(0, _utils.isString)(params['interval']))) {
          _context6.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(params['interval'])));
      case 16:
        if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
          _context6.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params['path'])));
      case 18:
        if (!(params['sync_ids'] && !(0, _utils.isString)(params['sync_ids']))) {
          _context6.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sync_ids must be of type String, received ".concat((0, _utils.getType)(params['sync_ids'])));
      case 20:
        if (!(params['user_ids'] && !(0, _utils.isString)(params['user_ids']))) {
          _context6.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params['user_ids'])));
      case 22:
        if (!(params['group_ids'] && !(0, _utils.isString)(params['group_ids']))) {
          _context6.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params['group_ids'])));
      case 24:
        if (!(params['description'] && !(0, _utils.isString)(params['description']))) {
          _context6.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params['description'])));
      case 26:
        if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
          _context6.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params['name'])));
      case 28:
        if (!(params['trigger'] && !(0, _utils.isString)(params['trigger']))) {
          _context6.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger must be of type String, received ".concat((0, _utils.getType)(params['trigger'])));
      case 30:
        if (!(params['trigger_actions'] && !(0, _utils.isArray)(params['trigger_actions']))) {
          _context6.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_actions must be of type Array, received ".concat((0, _utils.getType)(params['trigger_actions'])));
      case 32:
        if (!(params['recurring_day'] && !(0, _utils.isInt)(params['recurring_day']))) {
          _context6.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recurring_day must be of type Int, received ".concat((0, _utils.getType)(params['recurring_day'])));
      case 34:
        if (!(params['automation'] && !(0, _utils.isString)(params['automation']))) {
          _context6.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(params['automation'])));
      case 36:
        _context6.next = 38;
        return _Api.default.sendRequest("/automations", 'POST', params, options);
      case 38:
        response = _context6.sent;
        return _context6.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, options));
      case 40:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = Automation;
exports.default = _default;