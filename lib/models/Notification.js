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
var _Notification;
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
    exposeAttributes(_this, ['id']);
  });
  // string # Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
    exposeAttributes(_this, ['path']);
  });
  // int64 # ID of Group to receive notifications
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
    exposeAttributes(_this, ['group_id']);
  });
  // string # Group name, if a Group ID is set
  (0, _defineProperty2.default)(this, "getGroupName", function () {
    return _this.attributes.group_name;
  });
  (0, _defineProperty2.default)(this, "setGroupName", function (value) {
    _this.attributes.group_name = value;
    exposeAttributes(_this, ['group_name']);
  });
  // array(int64) # Group IDs when the notification requires multiple groups
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
    exposeAttributes(_this, ['group_ids']);
  });
  // array(string) # Group names when the notification requires multiple groups
  (0, _defineProperty2.default)(this, "getGroupNames", function () {
    return _this.attributes.group_names;
  });
  (0, _defineProperty2.default)(this, "setGroupNames", function (value) {
    _this.attributes.group_names = value;
    exposeAttributes(_this, ['group_names']);
  });
  // array(int64) # If set, will only notify on actions made by a member of one of the specified groups
  (0, _defineProperty2.default)(this, "getTriggeringGroupIds", function () {
    return _this.attributes.triggering_group_ids;
  });
  (0, _defineProperty2.default)(this, "setTriggeringGroupIds", function (value) {
    _this.attributes.triggering_group_ids = value;
    exposeAttributes(_this, ['triggering_group_ids']);
  });
  // array(int64) # If set, will only notify on actions made one of the specified users
  (0, _defineProperty2.default)(this, "getTriggeringUserIds", function () {
    return _this.attributes.triggering_user_ids;
  });
  (0, _defineProperty2.default)(this, "setTriggeringUserIds", function (value) {
    _this.attributes.triggering_user_ids = value;
    exposeAttributes(_this, ['triggering_user_ids']);
  });
  // boolean # Notify when actions are performed by a share recipient?
  (0, _defineProperty2.default)(this, "getTriggerByShareRecipients", function () {
    return _this.attributes.trigger_by_share_recipients;
  });
  (0, _defineProperty2.default)(this, "setTriggerByShareRecipients", function (value) {
    _this.attributes.trigger_by_share_recipients = value;
    exposeAttributes(_this, ['trigger_by_share_recipients']);
  });
  // boolean # If true, will send notifications about a user's own activity to that user.  If false, only activity performed by other users (or anonymous users) will be sent in notifications.
  (0, _defineProperty2.default)(this, "getNotifyUserActions", function () {
    return _this.attributes.notify_user_actions;
  });
  (0, _defineProperty2.default)(this, "setNotifyUserActions", function (value) {
    _this.attributes.notify_user_actions = value;
    exposeAttributes(_this, ['notify_user_actions']);
  });
  // boolean # Trigger on files copied to this path?
  (0, _defineProperty2.default)(this, "getNotifyOnCopy", function () {
    return _this.attributes.notify_on_copy;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnCopy", function (value) {
    _this.attributes.notify_on_copy = value;
    exposeAttributes(_this, ['notify_on_copy']);
  });
  // boolean # Trigger on files deleted in this path?
  (0, _defineProperty2.default)(this, "getNotifyOnDelete", function () {
    return _this.attributes.notify_on_delete;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnDelete", function (value) {
    _this.attributes.notify_on_delete = value;
    exposeAttributes(_this, ['notify_on_delete']);
  });
  // boolean # Trigger on files downloaded in this path?
  (0, _defineProperty2.default)(this, "getNotifyOnDownload", function () {
    return _this.attributes.notify_on_download;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnDownload", function (value) {
    _this.attributes.notify_on_download = value;
    exposeAttributes(_this, ['notify_on_download']);
  });
  // boolean # Trigger on files moved to this path?
  (0, _defineProperty2.default)(this, "getNotifyOnMove", function () {
    return _this.attributes.notify_on_move;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnMove", function (value) {
    _this.attributes.notify_on_move = value;
    exposeAttributes(_this, ['notify_on_move']);
  });
  // boolean # Trigger on files created/uploaded/updated/changed in this path?
  (0, _defineProperty2.default)(this, "getNotifyOnUpload", function () {
    return _this.attributes.notify_on_upload;
  });
  (0, _defineProperty2.default)(this, "setNotifyOnUpload", function (value) {
    _this.attributes.notify_on_upload = value;
    exposeAttributes(_this, ['notify_on_upload']);
  });
  // boolean # Apply notification recursively?  This will enable notifications for each subfolder.
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
    exposeAttributes(_this, ['recursive']);
  });
  // string # The time interval that notifications are aggregated to
  (0, _defineProperty2.default)(this, "getSendInterval", function () {
    return _this.attributes.send_interval;
  });
  (0, _defineProperty2.default)(this, "setSendInterval", function (value) {
    _this.attributes.send_interval = value;
    exposeAttributes(_this, ['send_interval']);
  });
  // string # Custom subject line to use for notification emails
  (0, _defineProperty2.default)(this, "getSubject", function () {
    return _this.attributes.subject;
  });
  (0, _defineProperty2.default)(this, "setSubject", function (value) {
    _this.attributes.subject = value;
    exposeAttributes(_this, ['subject']);
  });
  // string # Custom message to include in notification emails
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  (0, _defineProperty2.default)(this, "setMessage", function (value) {
    _this.attributes.message = value;
    exposeAttributes(_this, ['message']);
  });
  // array(string) # Array of filenames (possibly with wildcards) to scope trigger
  (0, _defineProperty2.default)(this, "getTriggeringFilenames", function () {
    return _this.attributes.triggering_filenames;
  });
  (0, _defineProperty2.default)(this, "setTriggeringFilenames", function (value) {
    _this.attributes.triggering_filenames = value;
    exposeAttributes(_this, ['triggering_filenames']);
  });
  // int64 # Workspace ID. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // boolean # Is the user unsubscribed from this notification?
  (0, _defineProperty2.default)(this, "getUnsubscribed", function () {
    return _this.attributes.unsubscribed;
  });
  (0, _defineProperty2.default)(this, "setUnsubscribed", function (value) {
    _this.attributes.unsubscribed = value;
    exposeAttributes(_this, ['unsubscribed']);
  });
  // string # The reason that the user unsubscribed
  (0, _defineProperty2.default)(this, "getUnsubscribedReason", function () {
    return _this.attributes.unsubscribed_reason;
  });
  (0, _defineProperty2.default)(this, "setUnsubscribedReason", function (value) {
    _this.attributes.unsubscribed_reason = value;
    exposeAttributes(_this, ['unsubscribed_reason']);
  });
  // int64 # Notification user ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // string # Notification username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
    exposeAttributes(_this, ['username']);
  });
  // boolean # If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had their email "hard bounce", which means that we are unable to send mail to this user's current email address. Notifications will resume if the user changes their email address.
  (0, _defineProperty2.default)(this, "getSuppressedEmail", function () {
    return _this.attributes.suppressed_email;
  });
  (0, _defineProperty2.default)(this, "setSuppressedEmail", function (value) {
    _this.attributes.suppressed_email = value;
    exposeAttributes(_this, ['suppressed_email']);
  });
  // Parameters:
  //   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
  //   notify_on_delete - boolean - Trigger on files deleted in this path?
  //   notify_on_download - boolean - Trigger on files downloaded in this path?
  //   notify_on_move - boolean - Trigger on files moved to this path?
  //   notify_on_upload - boolean - Trigger on files created/uploaded/updated/changed in this path?
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   subject - string - Custom subject line to use for notification emails
  //   message - string - Custom message to include in notification emails
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to scope trigger
  //   triggering_group_ids - array(int64) - If set, will only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - If set, will only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
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
          if (!((0, _utils.isArray)(params.notify_on_copy) || (0, _utils.isObject)(params.notify_on_copy))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notify_on_copy must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_copy)));
        case 4:
          if (!((0, _utils.isArray)(params.notify_on_delete) || (0, _utils.isObject)(params.notify_on_delete))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notify_on_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_delete)));
        case 5:
          if (!((0, _utils.isArray)(params.notify_on_download) || (0, _utils.isObject)(params.notify_on_download))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notify_on_download must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_download)));
        case 6:
          if (!((0, _utils.isArray)(params.notify_on_move) || (0, _utils.isObject)(params.notify_on_move))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notify_on_move must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_move)));
        case 7:
          if (!((0, _utils.isArray)(params.notify_on_upload) || (0, _utils.isObject)(params.notify_on_upload))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notify_on_upload must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_upload)));
        case 8:
          if (!((0, _utils.isArray)(params.notify_user_actions) || (0, _utils.isObject)(params.notify_user_actions))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notify_user_actions must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_user_actions)));
        case 9:
          if (!((0, _utils.isArray)(params.recursive) || (0, _utils.isObject)(params.recursive))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recursive must be of type Boolean, received ".concat((0, _utils.getType)(params.recursive)));
        case 10:
          if (!(params.send_interval !== undefined && params.send_interval !== null && !(0, _utils.isString)(params.send_interval))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: send_interval must be of type String, received ".concat((0, _utils.getType)(params.send_interval)));
        case 11:
          if (!(params.subject !== undefined && params.subject !== null && !(0, _utils.isString)(params.subject))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: subject must be of type String, received ".concat((0, _utils.getType)(params.subject)));
        case 12:
          if (!(params.message !== undefined && params.message !== null && !(0, _utils.isString)(params.message))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: message must be of type String, received ".concat((0, _utils.getType)(params.message)));
        case 13:
          if (!(params.triggering_filenames !== undefined && params.triggering_filenames !== null && !(0, _utils.isArray)(params.triggering_filenames))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: triggering_filenames must be of type Array, received ".concat((0, _utils.getType)(params.triggering_filenames)));
        case 14:
          if (!(params.triggering_group_ids !== undefined && params.triggering_group_ids !== null && !(0, _utils.isArray)(params.triggering_group_ids))) {
            _context.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: triggering_group_ids must be of type Array, received ".concat((0, _utils.getType)(params.triggering_group_ids)));
        case 15:
          if (!(params.triggering_user_ids !== undefined && params.triggering_user_ids !== null && !(0, _utils.isArray)(params.triggering_user_ids))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: triggering_user_ids must be of type Array, received ".concat((0, _utils.getType)(params.triggering_user_ids)));
        case 16:
          if (!((0, _utils.isArray)(params.trigger_by_share_recipients) || (0, _utils.isObject)(params.trigger_by_share_recipients))) {
            _context.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: trigger_by_share_recipients must be of type Boolean, received ".concat((0, _utils.getType)(params.trigger_by_share_recipients)));
        case 17:
          if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
            _context.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
        case 18:
          if (params.id) {
            _context.next = 20;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 19;
            break;
          }
          params.id = _this.id;
          _context.next = 20;
          break;
        case 19:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 20:
          _context.next = 21;
          return _Api.default.sendRequest("/notifications/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 21:
          response = _context.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
        case 22:
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
          return _Api.default.sendRequest("/notifications/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return Notification.create(_this.attributes, _this.options);
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
_Notification = Notification;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `path`, `user_id` or `group_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `user_id`, `workspace_id` or `group_id`. Valid field combinations are `[ workspace_id, path ]`, `[ workspace_id, user_id ]`, `[ workspace_id, group_id ]` or `[ workspace_id, user_id, path ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
//   path - string - Show notifications for this Path.
//   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
//   group_id - string
(0, _defineProperty2.default)(Notification, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 3:
        if (!((0, _utils.isArray)(params.include_ancestors) || (0, _utils.isObject)(params.include_ancestors))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: include_ancestors must be of type Boolean, received ".concat((0, _utils.getType)(params.include_ancestors)));
      case 4:
        if (!(params.group_id !== undefined && params.group_id !== null && !(0, _utils.isString)(params.group_id))) {
          _context4.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type String, received ".concat((0, _utils.getType)(params.group_id)));
      case 5:
        _context4.next = 6;
        return _Api.default.sendRequest('/notifications', 'GET', params, options);
      case 6:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Notification(obj, retainedOptions(options));
        })) || []);
      case 7:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(Notification, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Notification.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Notification, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Notification.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Notification ID.
(0, _defineProperty2.default)(Notification, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/notifications/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _Notification(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
(0, _defineProperty2.default)(Notification, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Notification.find(id, params, options);
});
// Parameters:
//   user_id - int64 - The id of the user to notify. Provide `user_id`, `username` or `group_id`.
//   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
//   notify_on_delete - boolean - Trigger on files deleted in this path?
//   notify_on_download - boolean - Trigger on files downloaded in this path?
//   notify_on_move - boolean - Trigger on files moved to this path?
//   notify_on_upload - boolean - Trigger on files created/uploaded/updated/changed in this path?
//   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
//   recursive - boolean - If `true`, enable notifications for each subfolder in this path
//   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
//   subject - string - Custom subject line to use for notification emails
//   message - string - Custom message to include in notification emails
//   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to scope trigger
//   triggering_group_ids - array(int64) - If set, will only notify on actions made by a member of one of the specified groups
//   triggering_user_ids - array(int64) - If set, will only notify on actions made one of the specified users
//   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
//   workspace_id - int64 - Workspace ID. `0` means the default workspace.
//   group_id - int64 - The ID of the group to notify.  Provide `user_id`, `username` or `group_id`.
//   group_ids - string - Group IDs when the notification requires multiple groups. If sent as a string, it should be comma-delimited.
//   path - string - Path
//   username - string - The username of the user to notify.  Provide `user_id`, `username` or `group_id`.
(0, _defineProperty2.default)(Notification, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!((0, _utils.isArray)(params.notify_on_copy) || (0, _utils.isObject)(params.notify_on_copy))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notify_on_copy must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_copy)));
      case 2:
        if (!((0, _utils.isArray)(params.notify_on_delete) || (0, _utils.isObject)(params.notify_on_delete))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notify_on_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_delete)));
      case 3:
        if (!((0, _utils.isArray)(params.notify_on_download) || (0, _utils.isObject)(params.notify_on_download))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notify_on_download must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_download)));
      case 4:
        if (!((0, _utils.isArray)(params.notify_on_move) || (0, _utils.isObject)(params.notify_on_move))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notify_on_move must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_move)));
      case 5:
        if (!((0, _utils.isArray)(params.notify_on_upload) || (0, _utils.isObject)(params.notify_on_upload))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notify_on_upload must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_on_upload)));
      case 6:
        if (!((0, _utils.isArray)(params.notify_user_actions) || (0, _utils.isObject)(params.notify_user_actions))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notify_user_actions must be of type Boolean, received ".concat((0, _utils.getType)(params.notify_user_actions)));
      case 7:
        if (!((0, _utils.isArray)(params.recursive) || (0, _utils.isObject)(params.recursive))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recursive must be of type Boolean, received ".concat((0, _utils.getType)(params.recursive)));
      case 8:
        if (!(params.send_interval !== undefined && params.send_interval !== null && !(0, _utils.isString)(params.send_interval))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: send_interval must be of type String, received ".concat((0, _utils.getType)(params.send_interval)));
      case 9:
        if (!(params.subject !== undefined && params.subject !== null && !(0, _utils.isString)(params.subject))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: subject must be of type String, received ".concat((0, _utils.getType)(params.subject)));
      case 10:
        if (!(params.message !== undefined && params.message !== null && !(0, _utils.isString)(params.message))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: message must be of type String, received ".concat((0, _utils.getType)(params.message)));
      case 11:
        if (!(params.triggering_filenames !== undefined && params.triggering_filenames !== null && !(0, _utils.isArray)(params.triggering_filenames))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: triggering_filenames must be of type Array, received ".concat((0, _utils.getType)(params.triggering_filenames)));
      case 12:
        if (!(params.triggering_group_ids !== undefined && params.triggering_group_ids !== null && !(0, _utils.isArray)(params.triggering_group_ids))) {
          _context6.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: triggering_group_ids must be of type Array, received ".concat((0, _utils.getType)(params.triggering_group_ids)));
      case 13:
        if (!(params.triggering_user_ids !== undefined && params.triggering_user_ids !== null && !(0, _utils.isArray)(params.triggering_user_ids))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: triggering_user_ids must be of type Array, received ".concat((0, _utils.getType)(params.triggering_user_ids)));
      case 14:
        if (!((0, _utils.isArray)(params.trigger_by_share_recipients) || (0, _utils.isObject)(params.trigger_by_share_recipients))) {
          _context6.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: trigger_by_share_recipients must be of type Boolean, received ".concat((0, _utils.getType)(params.trigger_by_share_recipients)));
      case 15:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context6.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 16:
        if (!(params.group_id !== undefined && params.group_id !== null && !(0, _utils.isInt)(params.group_id))) {
          _context6.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params.group_id)));
      case 17:
        if (!(params.group_ids !== undefined && params.group_ids !== null && !(0, _utils.isString)(params.group_ids))) {
          _context6.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
      case 18:
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context6.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 19:
        if (!(params.username !== undefined && params.username !== null && !(0, _utils.isString)(params.username))) {
          _context6.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
      case 20:
        _context6.next = 21;
        return _Api.default.sendRequest('/notifications', 'POST', params, options);
      case 21:
        response = _context6.sent;
        return _context6.abrupt("return", new _Notification(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 22:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = Notification;
module.exports = Notification;
module.exports.default = Notification;