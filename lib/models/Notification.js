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
 * Class Notification
 */
var Notification = /*#__PURE__*/(0, _createClass2.default)(function Notification() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Notification);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Notification ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Folder path to notify on This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // int64 # Notification group id
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
  });
  // string # Group name if applicable
  (0, _defineProperty2.default)(this, "getGroupName", function () {
    return _this.attributes.group_name;
  });
  (0, _defineProperty2.default)(this, "setGroupName", function (value) {
    _this.attributes.group_name = value;
  });
  // array # Only notify on actions made by a member of one of the specified groups
  (0, _defineProperty2.default)(this, "getTriggeringGroupIds", function () {
    return _this.attributes.triggering_group_ids;
  });
  (0, _defineProperty2.default)(this, "setTriggeringGroupIds", function (value) {
    _this.attributes.triggering_group_ids = value;
  });
  // array # Only notify on actions made one of the specified users
  (0, _defineProperty2.default)(this, "getTriggeringUserIds", function () {
    return _this.attributes.triggering_user_ids;
  });
  (0, _defineProperty2.default)(this, "setTriggeringUserIds", function (value) {
    _this.attributes.triggering_user_ids = value;
  });
  // boolean # Notify when actions are performed by a share recipient?
  (0, _defineProperty2.default)(this, "getTriggerByShareRecipients", function () {
    return _this.attributes.trigger_by_share_recipients;
  });
  (0, _defineProperty2.default)(this, "setTriggerByShareRecipients", function (value) {
    _this.attributes.trigger_by_share_recipients = value;
  });
  // boolean # Trigger notification on notification user actions?
  (0, _defineProperty2.default)(this, "getNotifyUserActions", function () {
    return _this.attributes.notify_user_actions;
  });
  (0, _defineProperty2.default)(this, "setNotifyUserActions", function (value) {
    _this.attributes.notify_user_actions = value;
  });
  // boolean # Triggers notification when copying files to this path
  (0, _defineProperty2.default)(this, "getNotifyOnCopy", function () {
    return _this.attributes.notify_on_copy;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnCopy", function (value) {
    _this.attributes.notify_on_copy = value;
  });
  // boolean # Triggers notification when deleting files from this path
  (0, _defineProperty2.default)(this, "getNotifyOnDelete", function () {
    return _this.attributes.notify_on_delete;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnDelete", function (value) {
    _this.attributes.notify_on_delete = value;
  });
  // boolean # Triggers notification when downloading files from this path
  (0, _defineProperty2.default)(this, "getNotifyOnDownload", function () {
    return _this.attributes.notify_on_download;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnDownload", function (value) {
    _this.attributes.notify_on_download = value;
  });
  // boolean # Triggers notification when moving files to this path
  (0, _defineProperty2.default)(this, "getNotifyOnMove", function () {
    return _this.attributes.notify_on_move;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnMove", function (value) {
    _this.attributes.notify_on_move = value;
  });
  // boolean # Triggers notification when uploading new files to this path
  (0, _defineProperty2.default)(this, "getNotifyOnUpload", function () {
    return _this.attributes.notify_on_upload;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnUpload", function (value) {
    _this.attributes.notify_on_upload = value;
  });
  // boolean # Enable notifications for each subfolder in this path
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
  });
  // string # The time interval that notifications are aggregated to
  (0, _defineProperty2.default)(this, "getSendInterval", function () {
    return _this.attributes.send_interval;
  });
  (0, _defineProperty2.default)(this, "setSendInterval", function (value) {
    _this.attributes.send_interval = value;
  });
  // string # Custom message to include in notification emails.
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  (0, _defineProperty2.default)(this, "setMessage", function (value) {
    _this.attributes.message = value;
  });
  // array # Array of filenames (possibly with wildcards) to match for action path
  (0, _defineProperty2.default)(this, "getTriggeringFilenames", function () {
    return _this.attributes.triggering_filenames;
  });
  (0, _defineProperty2.default)(this, "setTriggeringFilenames", function (value) {
    _this.attributes.triggering_filenames = value;
  });
  // boolean # Is the user unsubscribed from this notification?
  (0, _defineProperty2.default)(this, "getUnsubscribed", function () {
    return _this.attributes.unsubscribed;
  });
  (0, _defineProperty2.default)(this, "setUnsubscribed", function (value) {
    _this.attributes.unsubscribed = value;
  });
  // string # The reason that the user unsubscribed
  (0, _defineProperty2.default)(this, "getUnsubscribedReason", function () {
    return _this.attributes.unsubscribed_reason;
  });
  (0, _defineProperty2.default)(this, "setUnsubscribedReason", function (value) {
    _this.attributes.unsubscribed_reason = value;
  });
  // int64 # Notification user ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // string # Notification username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // boolean # If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had their email "hard bounce", which means that we are unable to send mail to this user's current email address. Notifications will resume if the user changes their email address.
  (0, _defineProperty2.default)(this, "getSuppressedEmail", function () {
    return _this.attributes.suppressed_email;
  });
  (0, _defineProperty2.default)(this, "setSuppressedEmail", function (value) {
    _this.attributes.suppressed_email = value;
  });
  // Parameters:
  //   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
  //   notify_on_delete - boolean - Triggers notification when deleting files from this path
  //   notify_on_download - boolean - Triggers notification when downloading files from this path
  //   notify_on_move - boolean - Triggers notification when moving files to this path
  //   notify_on_upload - boolean - Triggers notification when uploading new files to this path
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   message - string - Custom message to include in notification emails.
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to match for action path
  //   triggering_group_ids - array(int64) - Only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - Only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          if (!(params['send_interval'] && !(0, _utils.isString)(params['send_interval']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: send_interval must be of type String, received ".concat((0, _utils.getType)(send_interval)));
        case 10:
          if (!(params['message'] && !(0, _utils.isString)(params['message']))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: message must be of type String, received ".concat((0, _utils.getType)(message)));
        case 12:
          if (!(params['triggering_filenames'] && !(0, _utils.isArray)(params['triggering_filenames']))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: triggering_filenames must be of type Array, received ".concat((0, _utils.getType)(triggering_filenames)));
        case 14:
          if (!(params['triggering_group_ids'] && !(0, _utils.isArray)(params['triggering_group_ids']))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: triggering_group_ids must be of type Array, received ".concat((0, _utils.getType)(triggering_group_ids)));
        case 16:
          if (!(params['triggering_user_ids'] && !(0, _utils.isArray)(params['triggering_user_ids']))) {
            _context.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: triggering_user_ids must be of type Array, received ".concat((0, _utils.getType)(triggering_user_ids)));
        case 18:
          if (params['id']) {
            _context.next = 24;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 23;
            break;
          }
          params['id'] = _this.id;
          _context.next = 24;
          break;
        case 23:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 24:
          _context.next = 26;
          return _Api.default.sendRequest("/notifications/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 26:
          response = _context.sent;
          return _context.abrupt("return", new Notification(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
          if (params['id']) {
            _context2.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 13;
            break;
          }
          params['id'] = _this.id;
          _context2.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context2.next = 16;
          return _Api.default.sendRequest("/notifications/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
        case 16:
          response = _context2.sent;
          return _context2.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = Notification.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
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
//   user_id - int64 - DEPRECATED: Show notifications for this User ID. Use `filter[user_id]` instead.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[path]=desc`). Valid fields are `path`, `user_id` or `group_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `user_id` or `group_id`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
//   path - string - Show notifications for this Path.
//   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
//   group_id - string
(0, _defineProperty2.default)(Notification, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 6:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 8:
        if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params['path'])));
      case 10:
        if (!(params['group_id'] && !(0, _utils.isString)(params['group_id']))) {
          _context3.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type String, received ".concat((0, _utils.getType)(params['group_id'])));
      case 12:
        _context3.next = 14;
        return _Api.default.sendRequest("/notifications", 'GET', params, options);
      case 14:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new Notification(obj, options);
        })) || []);
      case 16:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(Notification, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Notification.list(params, options);
});
// Parameters:
//   id (required) - int64 - Notification ID.
(0, _defineProperty2.default)(Notification, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
    var params,
      options,
      response,
      _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context4.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context4.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context4.next = 11;
          return _Api.default.sendRequest("/notifications/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context4.sent;
          return _context4.abrupt("return", new Notification(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x) {
    return _ref6.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Notification, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Notification.find(id, params, options);
});
// Parameters:
//   user_id - int64 - The id of the user to notify. Provide `user_id`, `username` or `group_id`.
//   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
//   notify_on_delete - boolean - Triggers notification when deleting files from this path
//   notify_on_download - boolean - Triggers notification when downloading files from this path
//   notify_on_move - boolean - Triggers notification when moving files to this path
//   notify_on_upload - boolean - Triggers notification when uploading new files to this path
//   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
//   recursive - boolean - If `true`, enable notifications for each subfolder in this path
//   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
//   message - string - Custom message to include in notification emails.
//   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to match for action path
//   triggering_group_ids - array(int64) - Only notify on actions made by a member of one of the specified groups
//   triggering_user_ids - array(int64) - Only notify on actions made one of the specified users
//   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
//   group_id - int64 - The ID of the group to notify.  Provide `user_id`, `username` or `group_id`.
//   path - string - Path
//   username - string - The username of the user to notify.  Provide `user_id`, `username` or `group_id`.
(0, _defineProperty2.default)(Notification, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context5.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['send_interval'] && !(0, _utils.isString)(params['send_interval']))) {
          _context5.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: send_interval must be of type String, received ".concat((0, _utils.getType)(params['send_interval'])));
      case 6:
        if (!(params['message'] && !(0, _utils.isString)(params['message']))) {
          _context5.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: message must be of type String, received ".concat((0, _utils.getType)(params['message'])));
      case 8:
        if (!(params['triggering_filenames'] && !(0, _utils.isArray)(params['triggering_filenames']))) {
          _context5.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: triggering_filenames must be of type Array, received ".concat((0, _utils.getType)(params['triggering_filenames'])));
      case 10:
        if (!(params['triggering_group_ids'] && !(0, _utils.isArray)(params['triggering_group_ids']))) {
          _context5.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: triggering_group_ids must be of type Array, received ".concat((0, _utils.getType)(params['triggering_group_ids'])));
      case 12:
        if (!(params['triggering_user_ids'] && !(0, _utils.isArray)(params['triggering_user_ids']))) {
          _context5.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: triggering_user_ids must be of type Array, received ".concat((0, _utils.getType)(params['triggering_user_ids'])));
      case 14:
        if (!(params['group_id'] && !(0, _utils.isInt)(params['group_id']))) {
          _context5.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params['group_id'])));
      case 16:
        if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
          _context5.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params['path'])));
      case 18:
        if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
          _context5.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params['username'])));
      case 20:
        _context5.next = 22;
        return _Api.default.sendRequest("/notifications", 'POST', params, options);
      case 22:
        response = _context5.sent;
        return _context5.abrupt("return", new Notification(response === null || response === void 0 ? void 0 : response.data, options));
      case 24:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
var _default = Notification;
exports.default = _default;