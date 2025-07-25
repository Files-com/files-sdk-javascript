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
var _As2Station;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class As2Station
 */
var As2Station = /*#__PURE__*/(0, _createClass2.default)(function As2Station() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, As2Station);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Id of the AS2 Station.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # The station's formal AS2 name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Public URI for sending AS2 message to.
  (0, _defineProperty2.default)(this, "getUri", function () {
    return _this.attributes.uri;
  });
  (0, _defineProperty2.default)(this, "setUri", function (value) {
    _this.attributes.uri = value;
  });
  // string # The station's AS2 domain name.
  (0, _defineProperty2.default)(this, "getDomain", function () {
    return _this.attributes.domain;
  });
  (0, _defineProperty2.default)(this, "setDomain", function (value) {
    _this.attributes.domain = value;
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
  // string # Public certificate used for message security.
  (0, _defineProperty2.default)(this, "getPublicCertificate", function () {
    return _this.attributes.public_certificate;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificate", function (value) {
    _this.attributes.public_certificate = value;
  });
  // string # MD5 hash of private key used for message security.
  (0, _defineProperty2.default)(this, "getPrivateKeyMd5", function () {
    return _this.attributes.private_key_md5;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyMd5", function (value) {
    _this.attributes.private_key_md5 = value;
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
  // string # MD5 hash of private key password used for message security.
  (0, _defineProperty2.default)(this, "getPrivateKeyPasswordMd5", function () {
    return _this.attributes.private_key_password_md5;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPasswordMd5", function (value) {
    _this.attributes.private_key_password_md5 = value;
  });
  // string
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
  });
  // string
  (0, _defineProperty2.default)(this, "getPrivateKeyPassword", function () {
    return _this.attributes.private_key_password;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPassword", function (value) {
    _this.attributes.private_key_password = value;
  });
  // Parameters:
  //   name - string - AS2 Name
  //   public_certificate - string
  //   private_key - string
  //   private_key_password - string
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
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 4:
          if (!(params.public_certificate && !(0, _utils.isString)(params.public_certificate))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_certificate must be of type String, received ".concat((0, _utils.getType)(params.public_certificate)));
        case 5:
          if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
        case 6:
          if (!(params.private_key_password && !(0, _utils.isString)(params.private_key_password))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(params.private_key_password)));
        case 7:
          if (params.id) {
            _context.next = 9;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 8;
            break;
          }
          params.id = _this.id;
          _context.next = 9;
          break;
        case 8:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 9:
          _context.next = 10;
          return _Api.default.sendRequest("/as2_stations/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 10:
          response = _context.sent;
          return _context.abrupt("return", new As2Station(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 11:
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
          return _Api.default.sendRequest("/as2_stations/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return As2Station.create(_this.attributes, _this.options);
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
_As2Station = As2Station;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`.
(0, _defineProperty2.default)(As2Station, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        return _Api.default.sendRequest('/as2_stations', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _As2Station(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(As2Station, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _As2Station.list(params, options);
});
// Parameters:
//   id (required) - int64 - As2 Station ID.
(0, _defineProperty2.default)(As2Station, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/as2_stations/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _As2Station(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(As2Station, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _As2Station.find(id, params, options);
});
// Parameters:
//   name (required) - string - AS2 Name
//   public_certificate (required) - string
//   private_key (required) - string
//   private_key_password - string
(0, _defineProperty2.default)(As2Station, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
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
        if (params.public_certificate) {
          _context6.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: public_certificate');
      case 2:
        if (params.private_key) {
          _context6.next = 3;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: private_key');
      case 3:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 4:
        if (!(params.public_certificate && !(0, _utils.isString)(params.public_certificate))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: public_certificate must be of type String, received ".concat((0, _utils.getType)(params.public_certificate)));
      case 5:
        if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 6:
        if (!(params.private_key_password && !(0, _utils.isString)(params.private_key_password))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(params.private_key_password)));
      case 7:
        _context6.next = 8;
        return _Api.default.sendRequest('/as2_stations', 'POST', params, options);
      case 8:
        response = _context6.sent;
        return _context6.abrupt("return", new _As2Station(response === null || response === void 0 ? void 0 : response.data, options));
      case 9:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = As2Station;
module.exports = As2Station;
module.exports.default = As2Station;