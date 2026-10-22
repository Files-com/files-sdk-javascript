"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _GpgKey;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

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
    exposeAttributes(_this, ['id']);
  });
  // int64 # Workspace ID (0 for default workspace).
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // date-time # GPG key expiration date.
  (0, _defineProperty2.default)(this, "getExpiresAt", function () {
    return _this.attributes.expires_at;
  });
  (0, _defineProperty2.default)(this, "setExpiresAt", function (value) {
    _this.attributes.expires_at = value;
    exposeAttributes(_this, ['expires_at']);
  });
  // string # GPG key name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // int64 # Partner ID who owns this GPG Key, if applicable.
  (0, _defineProperty2.default)(this, "getPartnerId", function () {
    return _this.attributes.partner_id;
  });
  (0, _defineProperty2.default)(this, "setPartnerId", function (value) {
    _this.attributes.partner_id = value;
    exposeAttributes(_this, ['partner_id']);
  });
  // string # Name of the Partner who owns this GPG Key, if applicable.
  (0, _defineProperty2.default)(this, "getPartnerName", function () {
    return _this.attributes.partner_name;
  });
  (0, _defineProperty2.default)(this, "setPartnerName", function (value) {
    _this.attributes.partner_name = value;
    exposeAttributes(_this, ['partner_name']);
  });
  // int64 # User ID who owns this GPG Key, if applicable.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // string # MD5 hash of the GPG public key
  (0, _defineProperty2.default)(this, "getPublicKeyMd5", function () {
    return _this.attributes.public_key_md5;
  });
  (0, _defineProperty2.default)(this, "setPublicKeyMd5", function (value) {
    _this.attributes.public_key_md5 = value;
    exposeAttributes(_this, ['public_key_md5']);
  });
  // string # MD5 hash of the GPG private key.
  (0, _defineProperty2.default)(this, "getPrivateKeyMd5", function () {
    return _this.attributes.private_key_md5;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyMd5", function (value) {
    _this.attributes.private_key_md5 = value;
    exposeAttributes(_this, ['private_key_md5']);
  });
  // string # GPG public key
  (0, _defineProperty2.default)(this, "getGeneratedPublicKey", function () {
    return _this.attributes.generated_public_key;
  });
  (0, _defineProperty2.default)(this, "setGeneratedPublicKey", function (value) {
    _this.attributes.generated_public_key = value;
    exposeAttributes(_this, ['generated_public_key']);
  });
  // string # GPG private key.
  (0, _defineProperty2.default)(this, "getGeneratedPrivateKey", function () {
    return _this.attributes.generated_private_key;
  });
  (0, _defineProperty2.default)(this, "setGeneratedPrivateKey", function (value) {
    _this.attributes.generated_private_key = value;
    exposeAttributes(_this, ['generated_private_key']);
  });
  // string # GPG private key password. Only required for password protected keys.
  (0, _defineProperty2.default)(this, "getPrivateKeyPasswordMd5", function () {
    return _this.attributes.private_key_password_md5;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPasswordMd5", function (value) {
    _this.attributes.private_key_password_md5 = value;
    exposeAttributes(_this, ['private_key_password_md5']);
  });
  // string # The GPG public key
  (0, _defineProperty2.default)(this, "getPublicKey", function () {
    return _this.attributes.public_key;
  });
  (0, _defineProperty2.default)(this, "setPublicKey", function (value) {
    _this.attributes.public_key = value;
    exposeAttributes(_this, ['public_key']);
  });
  // string # The GPG private key
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
    exposeAttributes(_this, ['private_key']);
  });
  // string # The GPG private key password
  (0, _defineProperty2.default)(this, "getPrivateKeyPassword", function () {
    return _this.attributes.private_key_password;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPassword", function (value) {
    _this.attributes.private_key_password = value;
    exposeAttributes(_this, ['private_key_password']);
  });
  // string # Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateExpiresAt", function () {
    return _this.attributes.generate_expires_at;
  });
  (0, _defineProperty2.default)(this, "setGenerateExpiresAt", function (value) {
    _this.attributes.generate_expires_at = value;
    exposeAttributes(_this, ['generate_expires_at']);
  });
  // boolean # If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
  (0, _defineProperty2.default)(this, "getGenerateKeypair", function () {
    return _this.attributes.generate_keypair;
  });
  (0, _defineProperty2.default)(this, "setGenerateKeypair", function (value) {
    _this.attributes.generate_keypair = value;
    exposeAttributes(_this, ['generate_keypair']);
  });
  // string # Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateFullName", function () {
    return _this.attributes.generate_full_name;
  });
  (0, _defineProperty2.default)(this, "setGenerateFullName", function (value) {
    _this.attributes.generate_full_name = value;
    exposeAttributes(_this, ['generate_full_name']);
  });
  // string # Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  (0, _defineProperty2.default)(this, "getGenerateEmail", function () {
    return _this.attributes.generate_email;
  });
  (0, _defineProperty2.default)(this, "setGenerateEmail", function (value) {
    _this.attributes.generate_email = value;
    exposeAttributes(_this, ['generate_email']);
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.partner_id !== undefined && params.partner_id !== null && !(0, _utils.isInt)(params.partner_id))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: partner_id must be of type Int, received ".concat((0, _utils.getType)(params.partner_id)));
        case 4:
          if (!(params.public_key !== undefined && params.public_key !== null && !(0, _utils.isString)(params.public_key))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(params.public_key)));
        case 5:
          if (!(params.private_key !== undefined && params.private_key !== null && !(0, _utils.isString)(params.private_key))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
        case 6:
          if (!(params.private_key_password !== undefined && params.private_key_password !== null && !(0, _utils.isString)(params.private_key_password))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(params.private_key_password)));
        case 7:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
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
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
    var newObject;
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
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return GpgKey.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_GpgKey = GpgKey;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `expires_at`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`, `partner_id` or `expires_at`. Valid field combinations are `[ workspace_id, partner_id ]`, `[ workspace_id, expires_at ]`, `[ partner_id, expires_at ]` or `[ workspace_id, partner_id, expires_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `expires_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `expires_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `expires_at`.
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
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
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
          return new _GpgKey(obj, retainedOptions(options));
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
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(GpgKey, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _GpgKey.list(pageParams, pageOptions);
  });
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/gpg_keys/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _GpgKey(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
//   workspace_id - int64 - Workspace ID (0 for default workspace).
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
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.partner_id !== undefined && params.partner_id !== null && !(0, _utils.isInt)(params.partner_id))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: partner_id must be of type Int, received ".concat((0, _utils.getType)(params.partner_id)));
      case 3:
        if (!(params.public_key !== undefined && params.public_key !== null && !(0, _utils.isString)(params.public_key))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(params.public_key)));
      case 4:
        if (!(params.private_key !== undefined && params.private_key !== null && !(0, _utils.isString)(params.private_key))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 5:
        if (!(params.private_key_password !== undefined && params.private_key_password !== null && !(0, _utils.isString)(params.private_key_password))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_password must be of type String, received ".concat((0, _utils.getType)(params.private_key_password)));
      case 6:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 7:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 8:
        if (!(params.generate_expires_at !== undefined && params.generate_expires_at !== null && !(0, _utils.isString)(params.generate_expires_at))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_expires_at must be of type String, received ".concat((0, _utils.getType)(params.generate_expires_at)));
      case 9:
        if (!((0, _utils.isArray)(params.generate_keypair) || (0, _utils.isObject)(params.generate_keypair))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_keypair must be of type Boolean, received ".concat((0, _utils.getType)(params.generate_keypair)));
      case 10:
        if (!(params.generate_full_name !== undefined && params.generate_full_name !== null && !(0, _utils.isString)(params.generate_full_name))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_full_name must be of type String, received ".concat((0, _utils.getType)(params.generate_full_name)));
      case 11:
        if (!(params.generate_email !== undefined && params.generate_email !== null && !(0, _utils.isString)(params.generate_email))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generate_email must be of type String, received ".concat((0, _utils.getType)(params.generate_email)));
      case 12:
        _context6.next = 13;
        return _Api.default.sendRequest('/gpg_keys', 'POST', params, options);
      case 13:
        response = _context6.sent;
        return _context6.abrupt("return", new _GpgKey(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 14:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = GpgKey;
module.exports = GpgKey;
module.exports.default = GpgKey;