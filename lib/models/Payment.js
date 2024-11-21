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
var _Payment;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class Payment
 */
var Payment = /*#__PURE__*/(0, _createClass2.default)(function Payment() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Payment);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Line item Id
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // double # Line item amount
  (0, _defineProperty2.default)(this, "getAmount", function () {
    return _this.attributes.amount;
  });
  // double # Line item balance
  (0, _defineProperty2.default)(this, "getBalance", function () {
    return _this.attributes.balance;
  });
  // date-time # Line item created at
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # Line item currency
  (0, _defineProperty2.default)(this, "getCurrency", function () {
    return _this.attributes.currency;
  });
  // string # Line item download uri
  (0, _defineProperty2.default)(this, "getDownloadUri", function () {
    return _this.attributes.download_uri;
  });
  // array(object) # Associated invoice line items
  (0, _defineProperty2.default)(this, "getInvoiceLineItems", function () {
    return _this.attributes.invoice_line_items;
  });
  // string # Line item payment method
  (0, _defineProperty2.default)(this, "getMethod", function () {
    return _this.attributes.method;
  });
  // array(object) # Associated payment line items
  (0, _defineProperty2.default)(this, "getPaymentLineItems", function () {
    return _this.attributes.payment_line_items;
  });
  // date-time # Date/time payment was reversed if applicable
  (0, _defineProperty2.default)(this, "getPaymentReversedAt", function () {
    return _this.attributes.payment_reversed_at;
  });
  // string # Type of payment if applicable
  (0, _defineProperty2.default)(this, "getPaymentType", function () {
    return _this.attributes.payment_type;
  });
  // string # Site name this line item is for
  (0, _defineProperty2.default)(this, "getSiteName", function () {
    return _this.attributes.site_name;
  });
  // string # Type of line item, either payment or invoice
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
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
_Payment = Payment;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(Payment, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    AccountLineItem,
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
        return _Api.default.sendRequest('/payments', 'GET', params, options);
      case 8:
        response = _context.sent;
        AccountLineItem = require('./AccountLineItem.js').default;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new AccountLineItem(obj, options);
        })) || []);
      case 11:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(Payment, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Payment.list(params, options);
});
// Parameters:
//   id (required) - int64 - Payment ID.
(0, _defineProperty2.default)(Payment, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
    var params,
      options,
      response,
      AccountLineItem,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params.id = id;
          if (params.id) {
            _context2.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 9:
          _context2.next = 11;
          return _Api.default.sendRequest("/payments/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 11:
          response = _context2.sent;
          AccountLineItem = require('./AccountLineItem.js').default;
          return _context2.abrupt("return", new AccountLineItem(response === null || response === void 0 ? void 0 : response.data, options));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Payment, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Payment.find(id, params, options);
});
(0, _defineProperty2.default)(Payment, "createExport", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data2;
  var options,
    response,
    Export,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        _context3.next = 3;
        return _Api.default.sendRequest('/payments/create_export', 'POST', {}, options);
      case 3:
        response = _context3.sent;
        Export = require('./Export.js').default;
        return _context3.abrupt("return", (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
          return new Export(obj, options);
        })) || []);
      case 6:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = Payment;
module.exports = Payment;
module.exports.default = Payment;