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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  (0, _defineProperty2.default)(this, "getPublicCertificate", function () {
    return _this.attributes.public_certificate;
  });
  (0, _defineProperty2.default)(this, "setPublicCertificate", function (value) {
    _this.attributes.public_certificate = value;
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
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));
        case 10:
          if (!(params['public_certificate'] && !(0, _utils.isString)(params['public_certificate']))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_certificate must be of type String, received ".concat((0, _utils.getType)(public_certificate)));
        case 12:
          if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(private_key)));
        case 14:
          if (!(params['private_key_password'] && !(0, _utils.isString)(params['private_key_password']))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(private_key_password)));
        case 16:
          if (params['id']) {
            _context.next = 22;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 21;
            break;
          }
          params['id'] = _this.id;
          _context.next = 22;
          break;
        case 21:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 22:
          _context.next = 24;
          return _Api.default.sendRequest("/as2_stations/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 24:
          response = _context.sent;
          return _context.abrupt("return", new As2Station(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (params['id']) {
            _context2.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 13;
            break;
          }
          params['id'] = _this.id;
          _context2.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context2.next = 16;
          return _Api.default.sendRequest("/as2_stations/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
        case 16:
          response = _context2.sent;
          return _context2.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = As2Station.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
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
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(As2Station, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 4:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 6:
        _context3.next = 8;
        return _Api.default.sendRequest("/as2_stations", 'GET', params, options);
      case 8:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new As2Station(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(As2Station, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return As2Station.list(params, options);
});
// Parameters:
//   id (required) - int64 - As2 Station ID.
(0, _defineProperty2.default)(As2Station, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
    var params,
      options,
      response,
      _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context4.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context4.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context4.next = 11;
          return _Api.default.sendRequest("/as2_stations/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context4.sent;
          return _context4.abrupt("return", new As2Station(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x) {
    return _ref6.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(As2Station, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return As2Station.find(id, params, options);
});
// Parameters:
//   name (required) - string - AS2 Name
//   public_certificate (required) - string
//   private_key (required) - string
//   private_key_password - string
(0, _defineProperty2.default)(As2Station, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (params['name']) {
          _context5.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 4:
        if (params['public_certificate']) {
          _context5.next = 6;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: public_certificate');
      case 6:
        if (params['private_key']) {
          _context5.next = 8;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: private_key');
      case 8:
        if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
          _context5.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params['name'])));
      case 10:
        if (!(params['public_certificate'] && !(0, _utils.isString)(params['public_certificate']))) {
          _context5.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: public_certificate must be of type String, received ".concat((0, _utils.getType)(params['public_certificate'])));
      case 12:
        if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
          _context5.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params['private_key'])));
      case 14:
        if (!(params['private_key_password'] && !(0, _utils.isString)(params['private_key_password']))) {
          _context5.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(params['private_key_password'])));
      case 16:
        _context5.next = 18;
        return _Api.default.sendRequest("/as2_stations", 'POST', params, options);
      case 18:
        response = _context5.sent;
        return _context5.abrupt("return", new As2Station(response === null || response === void 0 ? void 0 : response.data, options));
      case 20:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
var _default = As2Station;
exports.default = _default;