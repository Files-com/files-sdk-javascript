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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * Class InvoiceLineItem
 */
var InvoiceLineItem = /*#__PURE__*/(0, _createClass2.default)(function InvoiceLineItem() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, InvoiceLineItem);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Invoice Line item Id
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // double # Invoice line item amount
  (0, _defineProperty2.default)(this, "getAmount", function () {
    return _this.attributes.amount;
  });
  // date-time # Invoice line item created at date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # Invoice line item description
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  // string # Invoice line item type
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  // date-time # Invoice line item service end date/time
  (0, _defineProperty2.default)(this, "getServiceEndAt", function () {
    return _this.attributes.service_end_at;
  });
  // date-time # Invoice line item service start date/time
  (0, _defineProperty2.default)(this, "getServiceStartAt", function () {
    return _this.attributes.service_start_at;
  });
  // string # Plan name
  (0, _defineProperty2.default)(this, "getPlan", function () {
    return _this.attributes.plan;
  });
  // string # Site name
  (0, _defineProperty2.default)(this, "getSite", function () {
    return _this.attributes.site;
  });
  // int64 # Prepaid bytes purchased for this invoice line item
  (0, _defineProperty2.default)(this, "getPrepaidBytes", function () {
    return _this.attributes.prepaid_bytes;
  });
  // date-time # When the prepaid bytes expire
  (0, _defineProperty2.default)(this, "getPrepaidBytesExpireAt", function () {
    return _this.attributes.prepaid_bytes_expire_at;
  });
  // int64 # Total prepaid bytes used for this invoice line item
  (0, _defineProperty2.default)(this, "getPrepaidBytesUsed", function () {
    return _this.attributes.prepaid_bytes_used;
  });
  // int64 # Available prepaid bytes for this invoice line item
  (0, _defineProperty2.default)(this, "getPrepaidBytesAvaliable", function () {
    return _this.attributes.prepaid_bytes_avaliable;
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
var _default = exports.default = InvoiceLineItem;
module.exports = InvoiceLineItem;
module.exports.default = InvoiceLineItem;