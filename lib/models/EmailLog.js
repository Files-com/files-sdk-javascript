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
var _EmailLog;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class EmailLog
 */
var EmailLog = /*#__PURE__*/(0, _createClass2.default)(function EmailLog() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, EmailLog);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // date-time # Start Time of Action
  (0, _defineProperty2.default)(this, "getTimestamp", function () {
    return _this.attributes.timestamp;
  });
  // string # Log Message
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  // string # Status of E-Mail delivery
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // string # Subject line of E-Mail
  (0, _defineProperty2.default)(this, "getSubject", function () {
    return _this.attributes.subject;
  });
  // string # To field of E-Mail
  (0, _defineProperty2.default)(this, "getTo", function () {
    return _this.attributes.to;
  });
  // string # CC field of E-Mail
  (0, _defineProperty2.default)(this, "getCc", function () {
    return _this.attributes.cc;
  });
  // string # How was the email delivered?  `customer_smtp` or `files.com`
  (0, _defineProperty2.default)(this, "getDeliveryMethod", function () {
    return _this.attributes.delivery_method;
  });
  // string # Customer SMTP Hostname used.
  (0, _defineProperty2.default)(this, "getSmtpHostname", function () {
    return _this.attributes.smtp_hostname;
  });
  // string # Customer SMTP IP address as resolved for use (useful for troubleshooting DNS issues with customer SMTP).
  (0, _defineProperty2.default)(this, "getSmtpIp", function () {
    return _this.attributes.smtp_ip;
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
_EmailLog = EmailLog;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date` or `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, status ]` or `[ end_date, status ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, status ]` or `[ end_date, status ]`.
(0, _defineProperty2.default)(EmailLog, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 4:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 6:
        _context.next = 8;
        return _Api.default.sendRequest('/email_logs', 'GET', params, options);
      case 8:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _EmailLog(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(EmailLog, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _EmailLog.list(params, options);
});
// Parameters:
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date` or `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, status ]` or `[ end_date, status ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, status ]` or `[ end_date, status ]`.
(0, _defineProperty2.default)(EmailLog, "createExport", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
        _context2.next = 4;
        return _Api.default.sendRequest('/email_logs/create_export', 'POST', params, options);
      case 4:
        response = _context2.sent;
        Export = require('./Export.js').default;
        return _context2.abrupt("return", new Export(response === null || response === void 0 ? void 0 : response.data, options));
      case 7:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
var _default = exports.default = EmailLog;
module.exports = EmailLog;
module.exports.default = EmailLog;