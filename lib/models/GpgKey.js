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
var _GpgKey;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class GpgKey
 */
var GpgKey = /*#__PURE__*/(0, _createClass2.default)(function GpgKey() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, GpgKey);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # GPG key ID.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // date-time # GPG key expiration date.
  (0, _defineProperty2.default)(this, "getExpiresAt", function () {
    return _this.attributes.expires_at;
  });
  (0, _defineProperty2.default)(this, "setExpiresAt", function (value) {
    _this.attributes.expires_at = value;
  });
  // string # GPG key name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // int64 # Partner ID who owns this GPG Key, if applicable.
  (0, _defineProperty2.default)(this, "getPartnerId", function () {
    return _this.attributes.partner_id;
  });
  (0, _defineProperty2.default)(this, "setPartnerId", function (value) {
    _this.attributes.partner_id = value;
  });
  // string # Name of the Partner who owns this GPG Key, if applicable.
  (0, _defineProperty2.default)(this, "getPartnerName", function () {
    return _this.attributes.partner_name;
  });
  (0, _defineProperty2.default)(this, "setPartnerName", function (value) {
    _this.attributes.partner_name = value;
  });
  // int64 # User ID who owns this GPG Key, if applicable.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // string # MD5 hash of the GPG public key
  (0, _defineProperty2.default)(this, "getPublicKeyMd5", function () {
    return _this.attributes.public_key_md5;
  });
  (0, _defineProperty2.default)(this, "setPublicKeyMd5", function (value) {
    _this.attributes.public_key_md5 = value;
  });
  // string # MD5 hash of the GPG private key.
  (0, _defineProperty2.default)(this, "getPrivateKeyMd5", function () {
    return _this.attributes.private_key_md5;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyMd5", function (value) {
    _this.attributes.private_key_md5 = value;
  });
  // string # GPG public key
  (0, _defineProperty2.default)(this, "getGeneratedPublicKey", function () {
    return _this.attributes.generated_public_key;
  });
  (0, _defineProperty2.default)(this, "setGeneratedPublicKey", function (value) {
    _this.attributes.generated_public_key = value;
  });
  // string # GPG private key.
  (0, _defineProperty2.default)(this, "getGeneratedPrivateKey", function () {
    return _this.attributes.generated_private_key;
  });
  (0, _defineProperty2.default)(this, "setGeneratedPrivateKey", function (value) {
    _this.attributes.generated_private_key = value;
  });
  // string # GPG private key password. Only required for password protected keys.
  (0, _defineProperty2.default)(this, "getPrivateKeyPasswordMd5", function () {
    return _this.attributes.private_key_password_md5;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPasswordMd5", function (value) {
    _this.attributes.private_key_password_md5 = value;
  });
  // string # The GPG public key
  (0, _defineProperty2.default)(this, "getPublicKey", function () {
    return _this.attributes.public_key;
  });
  (0, _defineProperty2.default)(this, "setPublicKey", function (value) {
    _this.attributes.public_key = value;
  });
  // string # The GPG private key
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
  });
  // string # The GPG private key password
  (0, _defineProperty2.default)(this, "getPrivateKeyPassword", function () {
    return _this.attributes.private_key_password;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPassword", function (value) {
    _this.attributes.private_key_password = value;
  });
  // string # Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateExpiresAt", function () {
    return _this.attributes.generate_expires_at;
  });
  (0, _defineProperty2.default)(this, "setGenerateExpiresAt", function (value) {
    _this.attributes.generate_expires_at = value;
  });
  // boolean # If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
  (0, _defineProperty2.default)(this, "getGenerateKeypair", function () {
    return _this.attributes.generate_keypair;
  });
  (0, _defineProperty2.default)(this, "setGenerateKeypair", function (value) {
    _this.attributes.generate_keypair = value;
  });
  // string # Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateFullName", function () {
    return _this.attributes.generate_full_name;
  });
  (0, _defineProperty2.default)(this, "setGenerateFullName", function (value) {
    _this.attributes.generate_full_name = value;
  });
  // string # Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateEmail", function () {
    return _this.attributes.generate_email;
  });
  (0, _defineProperty2.default)(this, "setGenerateEmail", function (value) {
    _this.attributes.generate_email = value;
  });
  // Parameters:
  //   partner_id - int64 - Partner ID who owns this GPG Key, if applicable.
  //   public_key - string - The GPG public key
  //   private_key - string - The GPG private key
  //   private_key_password - string - The GPG private key password
  //   name - string - GPG key name.
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
          if (!(params.partner_id && !(0, _utils.isInt)(params.partner_id))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: partner_id must be of type Int, received ".concat((0, _utils.getType)(params.partner_id)));
        case 4:
          if (!(params.public_key && !(0, _utils.isString)(params.public_key))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(params.public_key)));
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
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 8:
          if (params.id) {
            _context.next = 10;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 9;
            break;
          }
          params.id = _this.id;
          _context.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 10:
          _context.next = 11;
          return _Api.default.sendRequest("/gpg_keys/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 11:
          response = _context.sent;
          return _context.abrupt("return", new GpgKey(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 12:
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
          return _Api.default.sendRequest("/gpg_keys/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return GpgKey.create(_this.attributes, _this.options);
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
_GpgKey = GpgKey;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name` and `expires_at`.
(0, _defineProperty2.default)(GpgKey, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        _context4.next = 4;
        return _Api.default.sendRequest('/gpg_keys', 'GET', params, options);
      case 4:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _GpgKey(obj, options);
        })) || []);
      case 5:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(GpgKey, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _GpgKey.list(params, options);
});
// Parameters:
//   id (required) - int64 - Gpg Key ID.
(0, _defineProperty2.default)(GpgKey, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/gpg_keys/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _GpgKey(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(GpgKey, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _GpgKey.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   partner_id - int64 - Partner ID who owns this GPG Key, if applicable.
//   public_key - string - The GPG public key
//   private_key - string - The GPG private key
//   private_key_password - string - The GPG private key password
//   name (required) - string - GPG key name.
//   generate_expires_at - string - Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
//   generate_keypair - boolean - If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
//   generate_full_name - string - Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
//   generate_email - string - Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
(0, _defineProperty2.default)(GpgKey, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
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
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.partner_id && !(0, _utils.isInt)(params.partner_id))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: partner_id must be of type Int, received ".concat((0, _utils.getType)(params.partner_id)));
      case 3:
        if (!(params.public_key && !(0, _utils.isString)(params.public_key))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(params.public_key)));
      case 4:
        if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 5:
        if (!(params.private_key_password && !(0, _utils.isString)(params.private_key_password))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(params.private_key_password)));
      case 6:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 7:
        if (!(params.generate_expires_at && !(0, _utils.isString)(params.generate_expires_at))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_expires_at must be of type String, received ".concat((0, _utils.getType)(params.generate_expires_at)));
      case 8:
        if (!(params.generate_full_name && !(0, _utils.isString)(params.generate_full_name))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_full_name must be of type String, received ".concat((0, _utils.getType)(params.generate_full_name)));
      case 9:
        if (!(params.generate_email && !(0, _utils.isString)(params.generate_email))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_email must be of type String, received ".concat((0, _utils.getType)(params.generate_email)));
      case 10:
        _context6.next = 11;
        return _Api.default.sendRequest('/gpg_keys', 'POST', params, options);
      case 11:
        response = _context6.sent;
        return _context6.abrupt("return", new _GpgKey(response === null || response === void 0 ? void 0 : response.data, options));
      case 12:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = GpgKey;
module.exports = GpgKey;
module.exports.default = GpgKey;