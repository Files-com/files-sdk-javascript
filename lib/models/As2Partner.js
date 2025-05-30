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
var _As2Partner;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class As2Partner
 */
var As2Partner = /*#__PURE__*/(0, _createClass2.default)(function As2Partner() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, As2Partner);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # ID of the AS2 Partner.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # ID of the AS2 Station associated with this partner.
  (0, _defineProperty2.default)(this, "getAs2StationId", function () {
    return _this.attributes.as2_station_id;
  });
  (0, _defineProperty2.default)(this, "setAs2StationId", function (value) {
    _this.attributes.as2_station_id = value;
  });
  // string # The partner's formal AS2 name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  (0, _defineProperty2.default)(this, "getUri", function () {
    return _this.attributes.uri;
  });
  (0, _defineProperty2.default)(this, "setUri", function (value) {
    _this.attributes.uri = value;
  });
  // string # Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS?
  (0, _defineProperty2.default)(this, "getServerCertificate", function () {
    return _this.attributes.server_certificate;
  });
  (0, _defineProperty2.default)(this, "setServerCertificate", function (value) {
    _this.attributes.server_certificate = value;
  });
  // string # Username to send to server for HTTP Authentication.
  (0, _defineProperty2.default)(this, "getHttpAuthUsername", function () {
    return _this.attributes.http_auth_username;
  });
  (0, _defineProperty2.default)(this, "setHttpAuthUsername", function (value) {
    _this.attributes.http_auth_username = value;
  });
  // object # Additional HTTP Headers for outgoing message sent to this partner.
  (0, _defineProperty2.default)(this, "getAdditionalHttpHeaders", function () {
    return _this.attributes.additional_http_headers;
  });
  (0, _defineProperty2.default)(this, "setAdditionalHttpHeaders", function (value) {
    _this.attributes.additional_http_headers = value;
  });
  // string # Default mime type of the file attached to the encrypted message
  (0, _defineProperty2.default)(this, "getDefaultMimeType", function () {
    return _this.attributes.default_mime_type;
  });
  (0, _defineProperty2.default)(this, "setDefaultMimeType", function (value) {
    _this.attributes.default_mime_type = value;
  });
  // string # How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates.
  (0, _defineProperty2.default)(this, "getMdnValidationLevel", function () {
    return _this.attributes.mdn_validation_level;
  });
  (0, _defineProperty2.default)(this, "setMdnValidationLevel", function (value) {
    _this.attributes.mdn_validation_level = value;
  });
  // boolean # If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  (0, _defineProperty2.default)(this, "getEnableDedicatedIps", function () {
    return _this.attributes.enable_dedicated_ips;
  });
  (0, _defineProperty2.default)(this, "setEnableDedicatedIps", function (value) {
    _this.attributes.enable_dedicated_ips = value;
  });
  // string # Serial of public certificate used for message security in hex format.
  (0, _defineProperty2.default)(this, "getHexPublicCertificateSerial", function () {
    return _this.attributes.hex_public_certificate_serial;
  });
  (0, _defineProperty2.default)(this, "setHexPublicCertificateSerial", function (value) {
    _this.attributes.hex_public_certificate_serial = value;
  });
  // string # MD5 hash of public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificateMd5", function () {
    return _this.attributes.public_certificate_md5;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificateMd5", function (value) {
    _this.attributes.public_certificate_md5 = value;
  });
  // string # Subject of public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificateSubject", function () {
    return _this.attributes.public_certificate_subject;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificateSubject", function (value) {
    _this.attributes.public_certificate_subject = value;
  });
  // string # Issuer of public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificateIssuer", function () {
    return _this.attributes.public_certificate_issuer;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificateIssuer", function (value) {
    _this.attributes.public_certificate_issuer = value;
  });
  // string # Serial of public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificateSerial", function () {
    return _this.attributes.public_certificate_serial;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificateSerial", function (value) {
    _this.attributes.public_certificate_serial = value;
  });
  // string # Not before value of public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificateNotBefore", function () {
    return _this.attributes.public_certificate_not_before;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificateNotBefore", function (value) {
    _this.attributes.public_certificate_not_before = value;
  });
  // string # Not after value of public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificateNotAfter", function () {
    return _this.attributes.public_certificate_not_after;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificateNotAfter", function (value) {
    _this.attributes.public_certificate_not_after = value;
  });
  // string # Password to send to server for HTTP Authentication.
  (0, _defineProperty2.default)(this, "getHttpAuthPassword", function () {
    return _this.attributes.http_auth_password;
  });
  (0, _defineProperty2.default)(this, "setHttpAuthPassword", function (value) {
    _this.attributes.http_auth_password = value;
  });
  // string # Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
  (0, _defineProperty2.default)(this, "getPublicCertificate", function () {
    return _this.attributes.public_certificate;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificate", function (value) {
    _this.attributes.public_certificate = value;
  });
  // Parameters:
  //   enable_dedicated_ips - boolean - If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  //   http_auth_username - string - Username to send to server for HTTP Authentication.
  //   http_auth_password - string - Password to send to server for HTTP Authentication.
  //   mdn_validation_level - string - How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates.
  //   server_certificate - string - Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS?
  //   default_mime_type - string - Default mime type of the file attached to the encrypted message
  //   additional_http_headers - object - Additional HTTP Headers for outgoing message sent to this partner.
  //   name - string - The partner's formal AS2 name.
  //   uri - string - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  //   public_certificate - string - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.http_auth_username && !(0, _utils.isString)(params.http_auth_username))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: http_auth_username must be of type String, received ".concat((0, _utils.getType)(params.http_auth_username)));
        case 4:
          if (!(params.http_auth_password && !(0, _utils.isString)(params.http_auth_password))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: http_auth_password must be of type String, received ".concat((0, _utils.getType)(params.http_auth_password)));
        case 5:
          if (!(params.mdn_validation_level && !(0, _utils.isString)(params.mdn_validation_level))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: mdn_validation_level must be of type String, received ".concat((0, _utils.getType)(params.mdn_validation_level)));
        case 6:
          if (!(params.server_certificate && !(0, _utils.isString)(params.server_certificate))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params.server_certificate)));
        case 7:
          if (!(params.default_mime_type && !(0, _utils.isString)(params.default_mime_type))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: default_mime_type must be of type String, received ".concat((0, _utils.getType)(params.default_mime_type)));
        case 8:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 9:
          if (!(params.uri && !(0, _utils.isString)(params.uri))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: uri must be of type String, received ".concat((0, _utils.getType)(params.uri)));
        case 10:
          if (!(params.public_certificate && !(0, _utils.isString)(params.public_certificate))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_certificate must be of type String, received ".concat((0, _utils.getType)(params.public_certificate)));
        case 11:
          if (params.id) {
            _context.next = 13;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 12;
            break;
          }
          params.id = _this.id;
          _context.next = 13;
          break;
        case 12:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 13:
          _context.next = 14;
          return _Api.default.sendRequest("/as2_partners/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 14:
          response = _context.sent;
          return _context.abrupt("return", new As2Partner(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 15:
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/as2_partners/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
    var _newObject, newObject;
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
          _newObject = _context3.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return As2Partner.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_As2Partner = As2Partner;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(As2Partner, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context4.next = 3;
        return _Api.default.sendRequest('/as2_partners', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _As2Partner(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(As2Partner, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _As2Partner.list(params, options);
});
// Parameters:
//   id (required) - int64 - As2 Partner ID.
(0, _defineProperty2.default)(As2Partner, "find", /*#__PURE__*/function () {
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
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/as2_partners/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _As2Partner(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(As2Partner, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _As2Partner.find(id, params, options);
});
// Parameters:
//   enable_dedicated_ips - boolean - If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
//   http_auth_username - string - Username to send to server for HTTP Authentication.
//   http_auth_password - string - Password to send to server for HTTP Authentication.
//   mdn_validation_level - string - How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates.
//   server_certificate - string - Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS?
//   default_mime_type - string - Default mime type of the file attached to the encrypted message
//   additional_http_headers - object - Additional HTTP Headers for outgoing message sent to this partner.
//   as2_station_id (required) - int64 - ID of the AS2 Station associated with this partner.
//   name (required) - string - The partner's formal AS2 name.
//   uri (required) - string - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
//   public_certificate (required) - string - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
(0, _defineProperty2.default)(As2Partner, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.as2_station_id) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: as2_station_id');
      case 1:
        if (params.name) {
          _context6.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 2:
        if (params.uri) {
          _context6.next = 3;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: uri');
      case 3:
        if (params.public_certificate) {
          _context6.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: public_certificate');
      case 4:
        if (!(params.http_auth_username && !(0, _utils.isString)(params.http_auth_username))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: http_auth_username must be of type String, received ".concat((0, _utils.getType)(params.http_auth_username)));
      case 5:
        if (!(params.http_auth_password && !(0, _utils.isString)(params.http_auth_password))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: http_auth_password must be of type String, received ".concat((0, _utils.getType)(params.http_auth_password)));
      case 6:
        if (!(params.mdn_validation_level && !(0, _utils.isString)(params.mdn_validation_level))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: mdn_validation_level must be of type String, received ".concat((0, _utils.getType)(params.mdn_validation_level)));
      case 7:
        if (!(params.server_certificate && !(0, _utils.isString)(params.server_certificate))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params.server_certificate)));
      case 8:
        if (!(params.default_mime_type && !(0, _utils.isString)(params.default_mime_type))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: default_mime_type must be of type String, received ".concat((0, _utils.getType)(params.default_mime_type)));
      case 9:
        if (!(params.as2_station_id && !(0, _utils.isInt)(params.as2_station_id))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: as2_station_id must be of type Int, received ".concat((0, _utils.getType)(params.as2_station_id)));
      case 10:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 11:
        if (!(params.uri && !(0, _utils.isString)(params.uri))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: uri must be of type String, received ".concat((0, _utils.getType)(params.uri)));
      case 12:
        if (!(params.public_certificate && !(0, _utils.isString)(params.public_certificate))) {
          _context6.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: public_certificate must be of type String, received ".concat((0, _utils.getType)(params.public_certificate)));
      case 13:
        _context6.next = 14;
        return _Api.default.sendRequest('/as2_partners', 'POST', params, options);
      case 14:
        response = _context6.sent;
        return _context6.abrupt("return", new _As2Partner(response === null || response === void 0 ? void 0 : response.data, options));
      case 15:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = As2Partner;
module.exports = As2Partner;
module.exports.default = As2Partner;