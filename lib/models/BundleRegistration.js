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
var _BundleRegistration;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class BundleRegistration
 */
var BundleRegistration = /*#__PURE__*/(0, _createClass2.default)(function BundleRegistration() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, BundleRegistration);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # Registration cookie code
  (0, _defineProperty2.default)(this, "getCode", function () {
    return _this.attributes.code;
  });
  // string # Registrant name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  // string # Registrant company name
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  // string # Registrant email address
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  // string # Registrant IP Address
  (0, _defineProperty2.default)(this, "getIp", function () {
    return _this.attributes.ip;
  });
  // string # InboxRegistration cookie code, if there is an associated InboxRegistration
  (0, _defineProperty2.default)(this, "getInboxCode", function () {
    return _this.attributes.inbox_code;
  });
  // string # Clickwrap text that was shown to the registrant
  (0, _defineProperty2.default)(this, "getClickwrapBody", function () {
    return _this.attributes.clickwrap_body;
  });
  // int64 # Id of associated form field set
  (0, _defineProperty2.default)(this, "getFormFieldSetId", function () {
    return _this.attributes.form_field_set_id;
  });
  // object # Data for form field set with form field ids as keys and user data as values
  (0, _defineProperty2.default)(this, "getFormFieldData", function () {
    return _this.attributes.form_field_data;
  });
  // string # Bundle URL code
  (0, _defineProperty2.default)(this, "getBundleCode", function () {
    return _this.attributes.bundle_code;
  });
  // int64 # Id of associated bundle
  (0, _defineProperty2.default)(this, "getBundleId", function () {
    return _this.attributes.bundle_id;
  });
  // int64 # Id of associated bundle recipient
  (0, _defineProperty2.default)(this, "getBundleRecipientId", function () {
    return _this.attributes.bundle_recipient_id;
  });
  // date-time # Registration creation date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
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
_BundleRegistration = BundleRegistration;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `bundle_id`.
//   bundle_id - int64 - ID of the associated Bundle
(0, _defineProperty2.default)(BundleRegistration, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        if (!(params.bundle_id && !(0, _utils.isInt)(params.bundle_id))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_id must be of type Int, received ".concat((0, _utils.getType)(params.bundle_id)));
      case 4:
        _context.next = 5;
        return _Api.default.sendRequest('/bundle_registrations', 'GET', params, options);
      case 5:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _BundleRegistration(obj, options);
        })) || []);
      case 6:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(BundleRegistration, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _BundleRegistration.list(params, options);
});
var _default = exports.default = BundleRegistration;
module.exports = BundleRegistration;
module.exports.default = BundleRegistration;