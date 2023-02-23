"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
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
  // string # Session ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Session language
  (0, _defineProperty2.default)(this, "getLanguage", function () {
    return _this.attributes.language;
  });
  (0, _defineProperty2.default)(this, "setLanguage", function (value) {
    _this.attributes.language = value;
  });
  // boolean # Is this session read only?
  (0, _defineProperty2.default)(this, "getReadOnly", function () {
    return _this.attributes.read_only;
  });
  (0, _defineProperty2.default)(this, "setReadOnly", function (value) {
    _this.attributes.read_only = value;
  });
  // boolean # Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled that it is ok to use less secure SSH ciphers for this user.)
  (0, _defineProperty2.default)(this, "getSftpInsecureCiphers", function () {
    return _this.attributes.sftp_insecure_ciphers;
  });
  (0, _defineProperty2.default)(this, "setSftpInsecureCiphers", function (value) {
    _this.attributes.sftp_insecure_ciphers = value;
  });
  // string # Username to sign in as
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // string # Password for sign in
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  // string # If this user has a 2FA device, provide its OTP or code here.
  (0, _defineProperty2.default)(this, "getOtp", function () {
    return _this.attributes.otp;
  });
  (0, _defineProperty2.default)(this, "setOtp", function (value) {
    _this.attributes.otp = value;
  });
  // string # Identifier for a partially-completed login
  (0, _defineProperty2.default)(this, "getPartialSessionId", function () {
    return _this.attributes.partial_session_id;
  });
  (0, _defineProperty2.default)(this, "setPartialSessionId", function (value) {
    _this.attributes.partial_session_id = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new errors.NotImplementedError('The Session object doesn\'t support updates.');
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
// Parameters:
//   username - string - Username to sign in as
//   password - string - Password for sign in
//   otp - string - If this user has a 2FA device, provide its OTP or code here.
//   partial_session_id - string - Identifier for a partially-completed login
(0, _defineProperty2.default)(Session, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params['username'])));
      case 4:
        if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params['password'])));
      case 6:
        if (!(params['otp'] && !(0, _utils.isString)(params['otp']))) {
          _context.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: otp must be of type String, received ".concat((0, _utils.getType)(params['otp'])));
      case 8:
        if (!(params['partial_session_id'] && !(0, _utils.isString)(params['partial_session_id']))) {
          _context.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: partial_session_id must be of type String, received ".concat((0, _utils.getType)(params['partial_session_id'])));
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
  }, _callee);
})));
(0, _defineProperty2.default)(Session, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        _context2.next = 3;
        return _Api.default.sendRequest("/sessions", 'DELETE', {}, options);
      case 3:
        response = _context2.sent;
        return _context2.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
      case 5:
      case "end":
        return _context2.stop();
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