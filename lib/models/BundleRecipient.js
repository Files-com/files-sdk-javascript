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
var _BundleRecipient;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class BundleRecipient
 */
var BundleRecipient = /*#__PURE__*/(0, _createClass2.default)(function BundleRecipient() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, BundleRecipient);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # The recipient's company.
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  (0, _defineProperty2.default)(this, "setCompany", function (value) {
    _this.attributes.company = value;
  });
  // string # The recipient's name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # A note sent to the recipient with the bundle.
  (0, _defineProperty2.default)(this, "getNote", function () {
    return _this.attributes.note;
  });
  (0, _defineProperty2.default)(this, "setNote", function (value) {
    _this.attributes.note = value;
  });
  // string # The recipient's email address.
  (0, _defineProperty2.default)(this, "getRecipient", function () {
    return _this.attributes.recipient;
  });
  (0, _defineProperty2.default)(this, "setRecipient", function (value) {
    _this.attributes.recipient = value;
  });
  // date-time # When the Bundle was shared with this recipient.
  (0, _defineProperty2.default)(this, "getSentAt", function () {
    return _this.attributes.sent_at;
  });
  (0, _defineProperty2.default)(this, "setSentAt", function (value) {
    _this.attributes.sent_at = value;
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // int64 # Bundle to share.
  (0, _defineProperty2.default)(this, "getBundleId", function () {
    return _this.attributes.bundle_id;
  });
  (0, _defineProperty2.default)(this, "setBundleId", function (value) {
    _this.attributes.bundle_id = value;
  });
  // boolean # Set to true to share the link with the recipient upon creation.
  (0, _defineProperty2.default)(this, "getShareAfterCreate", function () {
    return _this.attributes.share_after_create;
  });
  (0, _defineProperty2.default)(this, "setShareAfterCreate", function (value) {
    _this.attributes.share_after_create = value;
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          throw new errors.NotImplementedError('The BundleRecipient object doesn\'t support updates.');
        case 4:
          _context.next = 6;
          return BundleRecipient.create(_this.attributes, _this.options);
        case 6:
          newObject = _context.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context.abrupt("return", true);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  Object.entries(attributes).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_BundleRecipient = BundleRecipient;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `has_registrations`.
//   bundle_id (required) - int64 - List recipients for the bundle with this ID.
(0, _defineProperty2.default)(BundleRecipient, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (params.bundle_id) {
          _context2.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: bundle_id');
      case 4:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context2.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 6:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 8:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 10:
        if (!(params.bundle_id && !(0, _utils.isInt)(params.bundle_id))) {
          _context2.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_id must be of type Int, received ".concat((0, _utils.getType)(params.bundle_id)));
      case 12:
        _context2.next = 14;
        return _Api.default.sendRequest('/bundle_recipients', 'GET', params, options);
      case 14:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _BundleRecipient(obj, options);
        })) || []);
      case 16:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(BundleRecipient, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _BundleRecipient.list(params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   bundle_id (required) - int64 - Bundle to share.
//   recipient (required) - string - Email addresses to share this bundle with.
//   name - string - Name of recipient.
//   company - string - Company of recipient.
//   note - string - Note to include in email.
//   share_after_create - boolean - Set to true to share the link with the recipient upon creation.
(0, _defineProperty2.default)(BundleRecipient, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (params.bundle_id) {
          _context3.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: bundle_id');
      case 4:
        if (params.recipient) {
          _context3.next = 6;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: recipient');
      case 6:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 8:
        if (!(params.bundle_id && !(0, _utils.isInt)(params.bundle_id))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_id must be of type Int, received ".concat((0, _utils.getType)(params.bundle_id)));
      case 10:
        if (!(params.recipient && !(0, _utils.isString)(params.recipient))) {
          _context3.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recipient must be of type String, received ".concat((0, _utils.getType)(params.recipient)));
      case 12:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context3.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 14:
        if (!(params.company && !(0, _utils.isString)(params.company))) {
          _context3.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(params.company)));
      case 16:
        if (!(params.note && !(0, _utils.isString)(params.note))) {
          _context3.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
      case 18:
        _context3.next = 20;
        return _Api.default.sendRequest('/bundle_recipients', 'POST', params, options);
      case 20:
        response = _context3.sent;
        return _context3.abrupt("return", new _BundleRecipient(response === null || response === void 0 ? void 0 : response.data, options));
      case 22:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = BundleRecipient;
module.exports = BundleRecipient;
module.exports.default = BundleRecipient;