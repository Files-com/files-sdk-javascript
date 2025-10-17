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
var _PublicKey;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class PublicKey
 */
var PublicKey = /*#__PURE__*/(0, _createClass2.default)(function PublicKey() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, PublicKey);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Public key ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Public key title
  (0, _defineProperty2.default)(this, "getTitle", function () {
    return _this.attributes.title;
  });
  (0, _defineProperty2.default)(this, "setTitle", function (value) {
    _this.attributes.title = value;
  });
  // date-time # Public key created at date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # Public key fingerprint (MD5)
  (0, _defineProperty2.default)(this, "getFingerprint", function () {
    return _this.attributes.fingerprint;
  });
  (0, _defineProperty2.default)(this, "setFingerprint", function (value) {
    _this.attributes.fingerprint = value;
  });
  // string # Public key fingerprint (SHA256)
  (0, _defineProperty2.default)(this, "getFingerprintSha256", function () {
    return _this.attributes.fingerprint_sha256;
  });
  (0, _defineProperty2.default)(this, "setFingerprintSha256", function (value) {
    _this.attributes.fingerprint_sha256 = value;
  });
  // string # Only returned when generating keys. Can be invalid, not_generated, generating, complete
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // date-time # Key's most recent login time via SFTP
  (0, _defineProperty2.default)(this, "getLastLoginAt", function () {
    return _this.attributes.last_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastLoginAt", function (value) {
    _this.attributes.last_login_at = value;
  });
  // string # Only returned when generating keys. Private key generated for the user.
  (0, _defineProperty2.default)(this, "getGeneratedPrivateKey", function () {
    return _this.attributes.generated_private_key;
  });
  (0, _defineProperty2.default)(this, "setGeneratedPrivateKey", function (value) {
    _this.attributes.generated_private_key = value;
  });
  // string # Only returned when generating keys. Public key generated for the user.
  (0, _defineProperty2.default)(this, "getGeneratedPublicKey", function () {
    return _this.attributes.generated_public_key;
  });
  (0, _defineProperty2.default)(this, "setGeneratedPublicKey", function (value) {
    _this.attributes.generated_public_key = value;
  });
  // string # Username of the user this public key is associated with
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // int64 # User ID this public key is associated with
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // string # Actual contents of SSH key.
  (0, _defineProperty2.default)(this, "getPublicKey", function () {
    return _this.attributes.public_key;
  });
  (0, _defineProperty2.default)(this, "setPublicKey", function (value) {
    _this.attributes.public_key = value;
  });
  // boolean # If true, generate a new SSH key pair. Can not be used with `public_key`
  (0, _defineProperty2.default)(this, "getGenerateKeypair", function () {
    return _this.attributes.generate_keypair;
  });
  (0, _defineProperty2.default)(this, "setGenerateKeypair", function (value) {
    _this.attributes.generate_keypair = value;
  });
  // string # Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGeneratePrivateKeyPassword", function () {
    return _this.attributes.generate_private_key_password;
  });
  (0, _defineProperty2.default)(this, "setGeneratePrivateKeyPassword", function (value) {
    _this.attributes.generate_private_key_password = value;
  });
  // string # Type of key to generate.  One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateAlgorithm", function () {
    return _this.attributes.generate_algorithm;
  });
  (0, _defineProperty2.default)(this, "setGenerateAlgorithm", function (value) {
    _this.attributes.generate_algorithm = value;
  });
  // int64 # Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateLength", function () {
    return _this.attributes.generate_length;
  });
  (0, _defineProperty2.default)(this, "setGenerateLength", function (value) {
    _this.attributes.generate_length = value;
  });
  // Parameters:
  //   title (required) - string - Internal reference for key.
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
          if (!(params.title && !(0, _utils.isString)(params.title))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: title must be of type String, received ".concat((0, _utils.getType)(params.title)));
        case 4:
          if (params.id) {
            _context.next = 6;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 5;
            break;
          }
          params.id = _this.id;
          _context.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 6:
          if (params.title) {
            _context.next = 8;
            break;
          }
          if (!_this.attributes.title) {
            _context.next = 7;
            break;
          }
          params.title = _this.title;
          _context.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: title');
        case 8:
          _context.next = 9;
          return _Api.default.sendRequest("/public_keys/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 9:
          response = _context.sent;
          return _context.abrupt("return", new PublicKey(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 10:
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
          return _Api.default.sendRequest("/public_keys/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return PublicKey.create(_this.attributes, _this.options);
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
_PublicKey = PublicKey;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `title`, `created_at` or `user_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
(0, _defineProperty2.default)(PublicKey, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        return _Api.default.sendRequest('/public_keys', 'GET', params, options);
      case 4:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _PublicKey(obj, options);
        })) || []);
      case 5:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(PublicKey, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _PublicKey.list(params, options);
});
// Parameters:
//   id (required) - int64 - Public Key ID.
(0, _defineProperty2.default)(PublicKey, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/public_keys/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _PublicKey(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(PublicKey, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _PublicKey.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   title (required) - string - Internal reference for key.
//   public_key - string - Actual contents of SSH key.
//   generate_keypair - boolean - If true, generate a new SSH key pair. Can not be used with `public_key`
//   generate_private_key_password - string - Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
//   generate_algorithm - string - Type of key to generate.  One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
//   generate_length - int64 - Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
(0, _defineProperty2.default)(PublicKey, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.title) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: title');
      case 1:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.title && !(0, _utils.isString)(params.title))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: title must be of type String, received ".concat((0, _utils.getType)(params.title)));
      case 3:
        if (!(params.public_key && !(0, _utils.isString)(params.public_key))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(params.public_key)));
      case 4:
        if (!(params.generate_private_key_password && !(0, _utils.isString)(params.generate_private_key_password))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_private_key_password must be of type String, received ".concat((0, _utils.getType)(params.generate_private_key_password)));
      case 5:
        if (!(params.generate_algorithm && !(0, _utils.isString)(params.generate_algorithm))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_algorithm must be of type String, received ".concat((0, _utils.getType)(params.generate_algorithm)));
      case 6:
        if (!(params.generate_length && !(0, _utils.isInt)(params.generate_length))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_length must be of type Int, received ".concat((0, _utils.getType)(params.generate_length)));
      case 7:
        _context6.next = 8;
        return _Api.default.sendRequest('/public_keys', 'POST', params, options);
      case 8:
        response = _context6.sent;
        return _context6.abrupt("return", new _PublicKey(response === null || response === void 0 ? void 0 : response.data, options));
      case 9:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = PublicKey;
module.exports = PublicKey;
module.exports.default = PublicKey;