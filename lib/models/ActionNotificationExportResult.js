"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _ActionNotificationExportResult;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class ActionNotificationExportResult
 */
var ActionNotificationExportResult = /*#__PURE__*/(0, _createClass2.default)(function ActionNotificationExportResult() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ActionNotificationExportResult);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Notification ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // int64 # When the notification was sent.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // int64 # HTTP status code returned in the webhook response.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // string # A message indicating the overall status of the webhook notification.
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  // boolean # `true` if the webhook succeeded by receiving a 200 or 204 response.
  (0, _defineProperty2.default)(this, "getSuccess", function () {
    return _this.attributes.success;
  });
  // string # A JSON-encoded string with headers that were sent with the webhook.
  (0, _defineProperty2.default)(this, "getRequestHeaders", function () {
    return _this.attributes.request_headers;
  });
  // string # The HTTP verb used to perform the webhook.
  (0, _defineProperty2.default)(this, "getRequestMethod", function () {
    return _this.attributes.request_method;
  });
  // string # The webhook request URL.
  (0, _defineProperty2.default)(this, "getRequestUrl", function () {
    return _this.attributes.request_url;
  });
  // string # The path to the actual file that triggered this notification. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  // string # The folder associated with the triggering action for this notification.
  (0, _defineProperty2.default)(this, "getFolder", function () {
    return _this.attributes.folder;
  });
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_ActionNotificationExportResult = ActionNotificationExportResult;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   action_notification_export_id (required) - int64 - ID of the associated action notification export.
(0, _defineProperty2.default)(ActionNotificationExportResult, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (params.action_notification_export_id) {
          _context.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: action_notification_export_id');
      case 4:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 6:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 8:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 10:
        if (!(params.action_notification_export_id && !(0, _utils.isInt)(params.action_notification_export_id))) {
          _context.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action_notification_export_id must be of type Int, received ".concat((0, _utils.getType)(params.action_notification_export_id)));
      case 12:
        _context.next = 14;
        return _Api.default.sendRequest('/action_notification_export_results', 'GET', params, options);
      case 14:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _ActionNotificationExportResult(obj, options);
        })) || []);
      case 16:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(ActionNotificationExportResult, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ActionNotificationExportResult.list(params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   action_notification_export_id (required) - int64 - ID of the associated action notification export.
(0, _defineProperty2.default)(ActionNotificationExportResult, "createExport", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data2;
  var params,
    options,
    response,
    Export,
    _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (params.action_notification_export_id) {
          _context2.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: action_notification_export_id');
      case 4:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context2.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 6:
        if (!(params.action_notification_export_id && !(0, _utils.isInt)(params.action_notification_export_id))) {
          _context2.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action_notification_export_id must be of type Int, received ".concat((0, _utils.getType)(params.action_notification_export_id)));
      case 8:
        _context2.next = 10;
        return _Api.default.sendRequest('/action_notification_export_results/create_export', 'POST', params, options);
      case 10:
        response = _context2.sent;
        Export = require('./Export.js').default;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
          return new Export(obj, options);
        })) || []);
      case 13:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
var _default = exports.default = ActionNotificationExportResult;
module.exports = ActionNotificationExportResult;
module.exports.default = ActionNotificationExportResult;