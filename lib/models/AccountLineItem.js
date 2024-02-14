"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * Class AccountLineItem
 */
var AccountLineItem = /*#__PURE__*/(0, _createClass2.default)(function AccountLineItem() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, AccountLineItem);
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
  // array # Associated invoice line items
  (0, _defineProperty2.default)(this, "getInvoiceLineItems", function () {
    return _this.attributes.invoice_line_items;
  });
  // string # Line item payment method
  (0, _defineProperty2.default)(this, "getMethod", function () {
    return _this.attributes.method;
  });
  // array # Associated payment line items
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
var _default = exports.default = AccountLineItem;
module.exports = AccountLineItem;
module.exports.default = AccountLineItem;