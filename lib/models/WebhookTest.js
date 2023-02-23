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
 * Class WebhookTest
 */
var WebhookTest = /*#__PURE__*/(0, _createClass2.default)(function WebhookTest() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, WebhookTest);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Status HTTP code
  (0, _defineProperty2.default)(this, "getCode", function () {
    return _this.attributes.code;
  });
  (0, _defineProperty2.default)(this, "setCode", function (value) {
    _this.attributes.code = value;
  });
  // string # Error message
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  (0, _defineProperty2.default)(this, "setMessage", function (value) {
    _this.attributes.message = value;
  });
  // string # Status message
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // Auto # Additional data
  (0, _defineProperty2.default)(this, "getData", function () {
    return _this.attributes.data;
  });
  (0, _defineProperty2.default)(this, "setData", function (value) {
    _this.attributes.data = value;
  });
  // boolean # The success status of the webhook test
  (0, _defineProperty2.default)(this, "getSuccess", function () {
    return _this.attributes.success;
  });
  (0, _defineProperty2.default)(this, "setSuccess", function (value) {
    _this.attributes.success = value;
  });
  // string # URL for testing the webhook.
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
  });
  // string # HTTP method(GET or POST).
  (0, _defineProperty2.default)(this, "getMethod", function () {
    return _this.attributes.method;
  });
  (0, _defineProperty2.default)(this, "setMethod", function (value) {
    _this.attributes.method = value;
  });
  // string # HTTP encoding method.  Can be JSON, XML, or RAW (form data).
  (0, _defineProperty2.default)(this, "getEncoding", function () {
    return _this.attributes.encoding;
  });
  (0, _defineProperty2.default)(this, "setEncoding", function (value) {
    _this.attributes.encoding = value;
  });
  // object # Additional request headers.
  (0, _defineProperty2.default)(this, "getHeaders", function () {
    return _this.attributes.headers;
  });
  (0, _defineProperty2.default)(this, "setHeaders", function (value) {
    _this.attributes.headers = value;
  });
  // object # Additional body parameters.
  (0, _defineProperty2.default)(this, "getBody", function () {
    return _this.attributes.body;
  });
  (0, _defineProperty2.default)(this, "setBody", function (value) {
    _this.attributes.body = value;
  });
  // string # raw body text
  (0, _defineProperty2.default)(this, "getRawBody", function () {
    return _this.attributes.raw_body;
  });
  (0, _defineProperty2.default)(this, "setRawBody", function (value) {
    _this.attributes.raw_body = value;
  });
  // boolean # Send the file data as the request body?
  (0, _defineProperty2.default)(this, "getFileAsBody", function () {
    return _this.attributes.file_as_body;
  });
  (0, _defineProperty2.default)(this, "setFileAsBody", function (value) {
    _this.attributes.file_as_body = value;
  });
  // string # Send the file data as a named parameter in the request POST body
  (0, _defineProperty2.default)(this, "getFileFormField", function () {
    return _this.attributes.file_form_field;
  });
  (0, _defineProperty2.default)(this, "setFileFormField", function (value) {
    _this.attributes.file_form_field = value;
  });
  // string # action for test body
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new errors.NotImplementedError('The WebhookTest object doesn\'t support updates.');
    } else {
      var newObject = WebhookTest.create(_this.attributes, _this.options);
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
//   url (required) - string - URL for testing the webhook.
//   method - string - HTTP method(GET or POST).
//   encoding - string - HTTP encoding method.  Can be JSON, XML, or RAW (form data).
//   headers - object - Additional request headers.
//   body - object - Additional body parameters.
//   raw_body - string - raw body text
//   file_as_body - boolean - Send the file data as the request body?
//   file_form_field - string - Send the file data as a named parameter in the request POST body
//   action - string - action for test body
(0, _defineProperty2.default)(WebhookTest, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (params['url']) {
          _context.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: url');
      case 4:
        if (!(params['url'] && !(0, _utils.isString)(params['url']))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: url must be of type String, received ".concat((0, _utils.getType)(params['url'])));
      case 6:
        if (!(params['method'] && !(0, _utils.isString)(params['method']))) {
          _context.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: method must be of type String, received ".concat((0, _utils.getType)(params['method'])));
      case 8:
        if (!(params['encoding'] && !(0, _utils.isString)(params['encoding']))) {
          _context.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: encoding must be of type String, received ".concat((0, _utils.getType)(params['encoding'])));
      case 10:
        if (!(params['raw_body'] && !(0, _utils.isString)(params['raw_body']))) {
          _context.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: raw_body must be of type String, received ".concat((0, _utils.getType)(params['raw_body'])));
      case 12:
        if (!(params['file_form_field'] && !(0, _utils.isString)(params['file_form_field']))) {
          _context.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_form_field must be of type String, received ".concat((0, _utils.getType)(params['file_form_field'])));
      case 14:
        if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
          _context.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params['action'])));
      case 16:
        _context.next = 18;
        return _Api.default.sendRequest("/webhook_tests", 'POST', params, options);
      case 18:
        response = _context.sent;
        return _context.abrupt("return", new WebhookTest(response === null || response === void 0 ? void 0 : response.data, options));
      case 20:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
var _default = WebhookTest;
exports.default = _default;