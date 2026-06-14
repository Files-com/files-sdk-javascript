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
var _PartnerSiteRequest;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class PartnerSiteRequest
 */
var PartnerSiteRequest = /*#__PURE__*/(0, _createClass2.default)(function PartnerSiteRequest() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, PartnerSiteRequest);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Partner Site Request ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # Host Partner ID
  (0, _defineProperty2.default)(this, "getHostPartnerId", function () {
    return _this.attributes.host_partner_id;
  });
  (0, _defineProperty2.default)(this, "setHostPartnerId", function (value) {
    _this.attributes.host_partner_id = value;
  });
  // string # Guest Site URL
  (0, _defineProperty2.default)(this, "getGuestSiteUrl", function () {
    return _this.attributes.guest_site_url;
  });
  (0, _defineProperty2.default)(this, "setGuestSiteUrl", function (value) {
    _this.attributes.guest_site_url = value;
  });
  // string # Request status (pending, approved, rejected)
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // string # Host Site Name
  (0, _defineProperty2.default)(this, "getHostSiteName", function () {
    return _this.attributes.host_site_name;
  });
  (0, _defineProperty2.default)(this, "setHostSiteName", function (value) {
    _this.attributes.host_site_name = value;
  });
  // string # Pairing key used to approve this request on the Guest Site
  (0, _defineProperty2.default)(this, "getPairingKey", function () {
    return _this.attributes.pairing_key;
  });
  (0, _defineProperty2.default)(this, "setPairingKey", function (value) {
    _this.attributes.pairing_key = value;
  });
  // date-time # Request creation date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # Request last updated date/time
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          params.id = _this.id;
          _context.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context.next = 6;
          return _Api.default.sendRequest("/partner_site_requests/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var newObject;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The PartnerSiteRequest object doesn\'t support updates.');
        case 1:
          _context2.next = 2;
          return PartnerSiteRequest.create(_this.attributes, _this.options);
        case 2:
          newObject = _context2.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context2.abrupt("return", true);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
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
_PartnerSiteRequest = PartnerSiteRequest;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `host_partner_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `host_partner_id`.
(0, _defineProperty2.default)(PartnerSiteRequest, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context3.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context3.next = 3;
        return _Api.default.sendRequest('/partner_site_requests', 'GET', params, options);
      case 3:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _PartnerSiteRequest(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(PartnerSiteRequest, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _PartnerSiteRequest.list(params, options);
});
// Parameters:
//   pairing_key (required) - string - Pairing key for the partner site request
(0, _defineProperty2.default)(PartnerSiteRequest, "findByPairingKey", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var params,
    options,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (params.pairing_key) {
          _context4.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: pairing_key');
      case 1:
        if (!(params.pairing_key && !(0, _utils.isString)(params.pairing_key))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: pairing_key must be of type String, received ".concat((0, _utils.getType)(params.pairing_key)));
      case 2:
        _context4.next = 3;
        return _Api.default.sendRequest('/partner_site_requests/find_by_pairing_key', 'GET', params, options);
      case 3:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
// Parameters:
//   host_partner_id (required) - int64 - Host Partner ID to link with
//   guest_site_url (required) - string - Guest Site URL to link to
(0, _defineProperty2.default)(PartnerSiteRequest, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (params.host_partner_id) {
          _context5.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: host_partner_id');
      case 1:
        if (params.guest_site_url) {
          _context5.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: guest_site_url');
      case 2:
        if (!(params.host_partner_id && !(0, _utils.isInt)(params.host_partner_id))) {
          _context5.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: host_partner_id must be of type Int, received ".concat((0, _utils.getType)(params.host_partner_id)));
      case 3:
        if (!(params.guest_site_url && !(0, _utils.isString)(params.guest_site_url))) {
          _context5.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: guest_site_url must be of type String, received ".concat((0, _utils.getType)(params.guest_site_url)));
      case 4:
        _context5.next = 5;
        return _Api.default.sendRequest('/partner_site_requests', 'POST', params, options);
      case 5:
        response = _context5.sent;
        return _context5.abrupt("return", new _PartnerSiteRequest(response === null || response === void 0 ? void 0 : response.data, options));
      case 6:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
// Parameters:
//   pairing_key (required) - string - Pairing key for the partner site request
(0, _defineProperty2.default)(PartnerSiteRequest, "reject", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.pairing_key) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: pairing_key');
      case 1:
        if (!(params.pairing_key && !(0, _utils.isString)(params.pairing_key))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: pairing_key must be of type String, received ".concat((0, _utils.getType)(params.pairing_key)));
      case 2:
        _context6.next = 3;
        return _Api.default.sendRequest('/partner_site_requests/reject', 'POST', params, options);
      case 3:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
// Parameters:
//   pairing_key (required) - string - Pairing key for the partner site request
(0, _defineProperty2.default)(PartnerSiteRequest, "approve", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.pairing_key) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: pairing_key');
      case 1:
        if (!(params.pairing_key && !(0, _utils.isString)(params.pairing_key))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: pairing_key must be of type String, received ".concat((0, _utils.getType)(params.pairing_key)));
      case 2:
        _context7.next = 3;
        return _Api.default.sendRequest('/partner_site_requests/approve', 'POST', params, options);
      case 3:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = PartnerSiteRequest;
module.exports = PartnerSiteRequest;
module.exports.default = PartnerSiteRequest;