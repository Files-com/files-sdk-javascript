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
var _EventSubscription;
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
 * Class EventSubscription
 */
var EventSubscription = /*#__PURE__*/(0, _createClass2.default)(function EventSubscription() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, EventSubscription);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Event Subscription ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // int64 # Event Channel ID
  (0, _defineProperty2.default)(this, "getEventChannelId", function () {
    return _this.attributes.event_channel_id;
  });
  (0, _defineProperty2.default)(this, "setEventChannelId", function (value) {
    _this.attributes.event_channel_id = value;
    exposeAttributes(_this, ['event_channel_id']);
  });
  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // boolean # If true, this default-workspace subscription applies to events from all workspaces.
  (0, _defineProperty2.default)(this, "getApplyToAllWorkspaces", function () {
    return _this.attributes.apply_to_all_workspaces;
  });
  (0, _defineProperty2.default)(this, "setApplyToAllWorkspaces", function (value) {
    _this.attributes.apply_to_all_workspaces = value;
    exposeAttributes(_this, ['apply_to_all_workspaces']);
  });
  // string # Event Subscription name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # Custom subject line to use for notification emails.
  (0, _defineProperty2.default)(this, "getSubject", function () {
    return _this.attributes.subject;
  });
  (0, _defineProperty2.default)(this, "setSubject", function (value) {
    _this.attributes.subject = value;
    exposeAttributes(_this, ['subject']);
  });
  // string # Custom message to include in notification emails.
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  (0, _defineProperty2.default)(this, "setMessage", function (value) {
    _this.attributes.message = value;
    exposeAttributes(_this, ['message']);
  });
  // boolean # If true, notification email bodies contain only the custom message, omitting event details and the review button. Requires a custom message, defaults to false, and does not affect non-email targets.
  (0, _defineProperty2.default)(this, "getMessageOnly", function () {
    return _this.attributes.message_only;
  });
  (0, _defineProperty2.default)(this, "setMessageOnly", function (value) {
    _this.attributes.message_only = value;
    exposeAttributes(_this, ['message_only']);
  });
  // boolean # Whether this Event Subscription can dispatch events.
  (0, _defineProperty2.default)(this, "getEnabled", function () {
    return _this.attributes.enabled;
  });
  (0, _defineProperty2.default)(this, "setEnabled", function (value) {
    _this.attributes.enabled = value;
    exposeAttributes(_this, ['enabled']);
  });
  // array(string) # Event type strings matched by this subscription. Blank means all event types. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
  (0, _defineProperty2.default)(this, "getEventTypes", function () {
    return _this.attributes.event_types;
  });
  (0, _defineProperty2.default)(this, "setEventTypes", function (value) {
    _this.attributes.event_types = value;
    exposeAttributes(_this, ['event_types']);
  });
  // object # Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All conditions must match.
  (0, _defineProperty2.default)(this, "getFilter", function () {
    return _this.attributes.filter;
  });
  (0, _defineProperty2.default)(this, "setFilter", function (value) {
    _this.attributes.filter = value;
    exposeAttributes(_this, ['filter']);
  });
  // object # Event Subscription delivery policy.
  (0, _defineProperty2.default)(this, "getDeliveryPolicy", function () {
    return _this.attributes.delivery_policy;
  });
  (0, _defineProperty2.default)(this, "setDeliveryPolicy", function (value) {
    _this.attributes.delivery_policy = value;
    exposeAttributes(_this, ['delivery_policy']);
  });
  // array(int64) # Event Target IDs this subscription sends to.
  (0, _defineProperty2.default)(this, "getEventTargetIds", function () {
    return _this.attributes.event_target_ids;
  });
  (0, _defineProperty2.default)(this, "setEventTargetIds", function (value) {
    _this.attributes.event_target_ids = value;
    exposeAttributes(_this, ['event_target_ids']);
  });
  // date-time # Event Subscription create date/time.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # Event Subscription update date/time.
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  // Parameters:
  //   event_channel_id - int64 - Event Channel ID
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace subscription applies to events from all workspaces.
  //   name - string - Event Subscription name.
  //   subject - string - Custom subject line to use for notification emails.
  //   message - string - Custom message to include in notification emails.
  //   message_only - boolean - If true, notification email bodies contain only the custom message, omitting event details and the review button. Requires a custom message, defaults to false, and does not affect non-email targets.
  //   enabled - boolean - Whether this Event Subscription can dispatch events.
  //   event_types - array(string) - Event type strings matched by this subscription. Blank means all event types. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
  //   filter - object - Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All conditions must match.
  //   delivery_policy - object - Event Subscription delivery policy.
  //   event_target_ids - array(int64) - Event Target IDs this subscription sends to.
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
          if (!(params.event_channel_id !== undefined && params.event_channel_id !== null && !(0, _utils.isInt)(params.event_channel_id))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: event_channel_id must be of type Int, received ".concat((0, _utils.getType)(params.event_channel_id)));
        case 4:
          if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
        case 5:
          if (!((0, _utils.isArray)(params.apply_to_all_workspaces) || (0, _utils.isObject)(params.apply_to_all_workspaces))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: apply_to_all_workspaces must be of type Boolean, received ".concat((0, _utils.getType)(params.apply_to_all_workspaces)));
        case 6:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 7:
          if (!(params.subject !== undefined && params.subject !== null && !(0, _utils.isString)(params.subject))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: subject must be of type String, received ".concat((0, _utils.getType)(params.subject)));
        case 8:
          if (!(params.message !== undefined && params.message !== null && !(0, _utils.isString)(params.message))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: message must be of type String, received ".concat((0, _utils.getType)(params.message)));
        case 9:
          if (!((0, _utils.isArray)(params.message_only) || (0, _utils.isObject)(params.message_only))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: message_only must be of type Boolean, received ".concat((0, _utils.getType)(params.message_only)));
        case 10:
          if (!((0, _utils.isArray)(params.enabled) || (0, _utils.isObject)(params.enabled))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.enabled)));
        case 11:
          if (!(params.event_types !== undefined && params.event_types !== null && !(0, _utils.isArray)(params.event_types))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: event_types must be of type Array, received ".concat((0, _utils.getType)(params.event_types)));
        case 12:
          if (!(params.event_target_ids !== undefined && params.event_target_ids !== null && !(0, _utils.isArray)(params.event_target_ids))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: event_target_ids must be of type Array, received ".concat((0, _utils.getType)(params.event_target_ids)));
        case 13:
          if (params.id) {
            _context.next = 15;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 14;
            break;
          }
          params.id = _this.id;
          _context.next = 15;
          break;
        case 14:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 15:
          _context.next = 16;
          return _Api.default.sendRequest("/event_subscriptions/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 16:
          response = _context.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
        case 17:
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
          return _Api.default.sendRequest("/event_subscriptions/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return EventSubscription.create(_this.attributes, _this.options);
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
_EventSubscription = EventSubscription;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`, `enabled`, `event_channel_id` or `workspace_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`, `event_channel_id` or `workspace_id`. Valid field combinations are `[ enabled, event_channel_id ]`, `[ workspace_id, enabled ]`, `[ workspace_id, event_channel_id ]` or `[ workspace_id, enabled, event_channel_id ]`.
(0, _defineProperty2.default)(EventSubscription, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        return _Api.default.sendRequest('/event_subscriptions', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _EventSubscription(obj, retainedOptions(options));
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(EventSubscription, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _EventSubscription.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(EventSubscription, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _EventSubscription.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Event Subscription ID.
(0, _defineProperty2.default)(EventSubscription, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/event_subscriptions/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _EventSubscription(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
(0, _defineProperty2.default)(EventSubscription, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _EventSubscription.find(id, params, options);
});
// Parameters:
//   event_channel_id - int64 - Event Channel ID
//   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
//   apply_to_all_workspaces - boolean - If true, this default-workspace subscription applies to events from all workspaces.
//   name (required) - string - Event Subscription name.
//   subject - string - Custom subject line to use for notification emails.
//   message - string - Custom message to include in notification emails.
//   message_only - boolean - If true, notification email bodies contain only the custom message, omitting event details and the review button. Requires a custom message, defaults to false, and does not affect non-email targets.
//   enabled - boolean - Whether this Event Subscription can dispatch events.
//   event_types - array(string) - Event type strings matched by this subscription. Blank means all event types. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
//   filter - object - Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All conditions must match.
//   delivery_policy - object - Event Subscription delivery policy.
//   event_target_ids - array(int64) - Event Target IDs this subscription sends to.
(0, _defineProperty2.default)(EventSubscription, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
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
        if (!(params.event_channel_id !== undefined && params.event_channel_id !== null && !(0, _utils.isInt)(params.event_channel_id))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: event_channel_id must be of type Int, received ".concat((0, _utils.getType)(params.event_channel_id)));
      case 2:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 3:
        if (!((0, _utils.isArray)(params.apply_to_all_workspaces) || (0, _utils.isObject)(params.apply_to_all_workspaces))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: apply_to_all_workspaces must be of type Boolean, received ".concat((0, _utils.getType)(params.apply_to_all_workspaces)));
      case 4:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 5:
        if (!(params.subject !== undefined && params.subject !== null && !(0, _utils.isString)(params.subject))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: subject must be of type String, received ".concat((0, _utils.getType)(params.subject)));
      case 6:
        if (!(params.message !== undefined && params.message !== null && !(0, _utils.isString)(params.message))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: message must be of type String, received ".concat((0, _utils.getType)(params.message)));
      case 7:
        if (!((0, _utils.isArray)(params.message_only) || (0, _utils.isObject)(params.message_only))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: message_only must be of type Boolean, received ".concat((0, _utils.getType)(params.message_only)));
      case 8:
        if (!((0, _utils.isArray)(params.enabled) || (0, _utils.isObject)(params.enabled))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.enabled)));
      case 9:
        if (!(params.event_types !== undefined && params.event_types !== null && !(0, _utils.isArray)(params.event_types))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: event_types must be of type Array, received ".concat((0, _utils.getType)(params.event_types)));
      case 10:
        if (!(params.event_target_ids !== undefined && params.event_target_ids !== null && !(0, _utils.isArray)(params.event_target_ids))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: event_target_ids must be of type Array, received ".concat((0, _utils.getType)(params.event_target_ids)));
      case 11:
        _context6.next = 12;
        return _Api.default.sendRequest('/event_subscriptions', 'POST', params, options);
      case 12:
        response = _context6.sent;
        return _context6.abrupt("return", new _EventSubscription(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 13:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = EventSubscription;
module.exports = EventSubscription;
module.exports.default = EventSubscription;