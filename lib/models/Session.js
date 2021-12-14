"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Class Session
 */
var Session = /*#__PURE__*/(0, _createClass2.default)(function Session() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Session);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  (0, _defineProperty2.default)(this, "getLanguage", function () {
    return _this.attributes.language;
  });
  (0, _defineProperty2.default)(this, "setLanguage", function (value) {
    _this.attributes.language = value;
  });
  (0, _defineProperty2.default)(this, "getLoginToken", function () {
    return _this.attributes.login_token;
  });
  (0, _defineProperty2.default)(this, "setLoginToken", function (value) {
    _this.attributes.login_token = value;
  });
  (0, _defineProperty2.default)(this, "getLoginTokenDomain", function () {
    return _this.attributes.login_token_domain;
  });
  (0, _defineProperty2.default)(this, "setLoginTokenDomain", function (value) {
    _this.attributes.login_token_domain = value;
  });
  (0, _defineProperty2.default)(this, "getMaxDirListingSize", function () {
    return _this.attributes.max_dir_listing_size;
  });
  (0, _defineProperty2.default)(this, "setMaxDirListingSize", function (value) {
    _this.attributes.max_dir_listing_size = value;
  });
  (0, _defineProperty2.default)(this, "getMultipleRegions", function () {
    return _this.attributes.multiple_regions;
  });
  (0, _defineProperty2.default)(this, "setMultipleRegions", function (value) {
    _this.attributes.multiple_regions = value;
  });
  (0, _defineProperty2.default)(this, "getReadOnly", function () {
    return _this.attributes.read_only;
  });
  (0, _defineProperty2.default)(this, "setReadOnly", function (value) {
    _this.attributes.read_only = value;
  });
  (0, _defineProperty2.default)(this, "getRootPath", function () {
    return _this.attributes.root_path;
  });
  (0, _defineProperty2.default)(this, "setRootPath", function (value) {
    _this.attributes.root_path = value;
  });
  (0, _defineProperty2.default)(this, "getSftpInsecureCiphers", function () {
    return _this.attributes.sftp_insecure_ciphers;
  });
  (0, _defineProperty2.default)(this, "setSftpInsecureCiphers", function (value) {
    _this.attributes.sftp_insecure_ciphers = value;
  });
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
  });
  (0, _defineProperty2.default)(this, "getSslRequired", function () {
    return _this.attributes.ssl_required;
  });
  (0, _defineProperty2.default)(this, "setSslRequired", function (value) {
    _this.attributes.ssl_required = value;
  });
  (0, _defineProperty2.default)(this, "getTlsDisabled", function () {
    return _this.attributes.tls_disabled;
  });
  (0, _defineProperty2.default)(this, "setTlsDisabled", function (value) {
    _this.attributes.tls_disabled = value;
  });
  (0, _defineProperty2.default)(this, "getTwoFactorSetupNeeded", function () {
    return _this.attributes.two_factor_setup_needed;
  });
  (0, _defineProperty2.default)(this, "setTwoFactorSetupNeeded", function (value) {
    _this.attributes.two_factor_setup_needed = value;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodSms", function () {
    return _this.attributes.allowed_2fa_method_sms;
  });
  (0, _defineProperty2.default)(this, "setAllowed2faMethodSms", function (value) {
    _this.attributes.allowed_2fa_method_sms = value;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodTotp", function () {
    return _this.attributes.allowed_2fa_method_totp;
  });
  (0, _defineProperty2.default)(this, "setAllowed2faMethodTotp", function (value) {
    _this.attributes.allowed_2fa_method_totp = value;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodU2f", function () {
    return _this.attributes.allowed_2fa_method_u2f;
  });
  (0, _defineProperty2.default)(this, "setAllowed2faMethodU2f", function (value) {
    _this.attributes.allowed_2fa_method_u2f = value;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodYubi", function () {
    return _this.attributes.allowed_2fa_method_yubi;
  });
  (0, _defineProperty2.default)(this, "setAllowed2faMethodYubi", function (value) {
    _this.attributes.allowed_2fa_method_yubi = value;
  });
  (0, _defineProperty2.default)(this, "getUseProvidedModifiedAt", function () {
    return _this.attributes.use_provided_modified_at;
  });
  (0, _defineProperty2.default)(this, "setUseProvidedModifiedAt", function (value) {
    _this.attributes.use_provided_modified_at = value;
  });
  (0, _defineProperty2.default)(this, "getWindowsModeFtp", function () {
    return _this.attributes.windows_mode_ftp;
  });
  (0, _defineProperty2.default)(this, "setWindowsModeFtp", function (value) {
    _this.attributes.windows_mode_ftp = value;
  });
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  (0, _defineProperty2.default)(this, "getOtp", function () {
    return _this.attributes.otp;
  });
  (0, _defineProperty2.default)(this, "setOtp", function (value) {
    _this.attributes.otp = value;
  });
  (0, _defineProperty2.default)(this, "getPartialSessionId", function () {
    return _this.attributes.partial_session_id;
  });
  (0, _defineProperty2.default)(this, "setPartialSessionId", function (value) {
    _this.attributes.partial_session_id = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new Error('The Session object doesn\'t support updates.');
    } else {
      var newObject = Session.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
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
(0, _defineProperty2.default)(Session, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var params,
      options,
      response,
      _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
            _context.next = 4;
            break;
          }

          throw new Error("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));

        case 4:
          if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));

        case 6:
          if (!(params['otp'] && !(0, _utils.isString)(params['otp']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: otp must be of type String, received ".concat((0, _utils.getType)(otp)));

        case 8:
          if (!(params['partial_session_id'] && !(0, _utils.isString)(params['partial_session_id']))) {
            _context.next = 10;
            break;
          }

          throw new Error("Bad parameter: partial_session_id must be of type String, received ".concat((0, _utils.getType)(partial_session_id)));

        case 10:
          _context.next = 12;
          return _Api.default.sendRequest("/sessions", 'POST', params, options);

        case 12:
          response = _context.sent;
          return _context.abrupt("return", new Session(response === null || response === void 0 ? void 0 : response.data, options));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(Session, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var params,
      options,
      response,
      _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 4;
          return _Api.default.sendRequest("/sessions", 'DELETE', options);

        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(Session, "destroy", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Session.delete(params, options);
});
var _default = Session;
exports.default = _default;