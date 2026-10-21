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
var _WebhookTest;
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
    exposeAttributes(_this, ['code']);
  });
  // string # Error message
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  (0, _defineProperty2.default)(this, "setMessage", function (value) {
    _this.attributes.message = value;
    exposeAttributes(_this, ['message']);
  });
  // string # Status message
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
    exposeAttributes(_this, ['status']);
  });
  // Auto # Additional data
  (0, _defineProperty2.default)(this, "getData", function () {
    return _this.attributes.data;
  });
  (0, _defineProperty2.default)(this, "setData", function (value) {
    _this.attributes.data = value;
    exposeAttributes(_this, ['data']);
  });
  // boolean # The success status of the webhook test
  (0, _defineProperty2.default)(this, "getSuccess", function () {
    return _this.attributes.success;
  });
  (0, _defineProperty2.default)(this, "setSuccess", function (value) {
    _this.attributes.success = value;
    exposeAttributes(_this, ['success']);
  });
  // string # URL for testing the webhook.
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
    exposeAttributes(_this, ['url']);
  });
  // string # HTTP method(GET or POST).
  (0, _defineProperty2.default)(this, "getMethod", function () {
    return _this.attributes.method;
  });
  (0, _defineProperty2.default)(this, "setMethod", function (value) {
    _this.attributes.method = value;
    exposeAttributes(_this, ['method']);
  });
  // string # HTTP encoding method.  Can be JSON, XML, or RAW (form data).
  (0, _defineProperty2.default)(this, "getEncoding", function () {
    return _this.attributes.encoding;
  });
  (0, _defineProperty2.default)(this, "setEncoding", function (value) {
    _this.attributes.encoding = value;
    exposeAttributes(_this, ['encoding']);
  });
  // object # Additional request headers.
  (0, _defineProperty2.default)(this, "getHeaders", function () {
    return _this.attributes.headers;
  });
  (0, _defineProperty2.default)(this, "setHeaders", function (value) {
    _this.attributes.headers = value;
    exposeAttributes(_this, ['headers']);
  });
  // object # Additional body parameters.
  (0, _defineProperty2.default)(this, "getBody", function () {
    return _this.attributes.body;
  });
  (0, _defineProperty2.default)(this, "setBody", function (value) {
    _this.attributes.body = value;
    exposeAttributes(_this, ['body']);
  });
  // string # raw body text
  (0, _defineProperty2.default)(this, "getRawBody", function () {
    return _this.attributes.raw_body;
  });
  (0, _defineProperty2.default)(this, "setRawBody", function (value) {
    _this.attributes.raw_body = value;
    exposeAttributes(_this, ['raw_body']);
  });
  // boolean # Send the file data as the request body?
  (0, _defineProperty2.default)(this, "getFileAsBody", function () {
    return _this.attributes.file_as_body;
  });
  (0, _defineProperty2.default)(this, "setFileAsBody", function (value) {
    _this.attributes.file_as_body = value;
    exposeAttributes(_this, ['file_as_body']);
  });
  // string # Send the file data as a named parameter in the request POST body
  (0, _defineProperty2.default)(this, "getFileFormField", function () {
    return _this.attributes.file_form_field;
  });
  (0, _defineProperty2.default)(this, "setFileFormField", function (value) {
    _this.attributes.file_form_field = value;
    exposeAttributes(_this, ['file_form_field']);
  });
  // string # action for test body
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
    exposeAttributes(_this, ['action']);
  });
  // boolean # Use dedicated IPs for sending the webhook?
  (0, _defineProperty2.default)(this, "getUseDedicatedIps", function () {
    return _this.attributes.use_dedicated_ips;
  });
  (0, _defineProperty2.default)(this, "setUseDedicatedIps", function (value) {
    _this.attributes.use_dedicated_ips = value;
    exposeAttributes(_this, ['use_dedicated_ips']);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The WebhookTest object doesn\'t support updates.');
        case 1:
          _context.next = 2;
          return WebhookTest.create(_this.attributes, _this.options);
        case 2:
          newObject = _context.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context.abrupt("return", true);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_WebhookTest = WebhookTest;
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
//   use_dedicated_ips - boolean - Use dedicated IPs for sending the webhook?
(0, _defineProperty2.default)(WebhookTest, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (params.url) {
          _context2.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: url');
      case 1:
        if (!(params.url !== undefined && params.url !== null && !(0, _utils.isString)(params.url))) {
          _context2.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: url must be of type String, received ".concat((0, _utils.getType)(params.url)));
      case 2:
        if (!(params.method !== undefined && params.method !== null && !(0, _utils.isString)(params.method))) {
          _context2.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: method must be of type String, received ".concat((0, _utils.getType)(params.method)));
      case 3:
        if (!(params.encoding !== undefined && params.encoding !== null && !(0, _utils.isString)(params.encoding))) {
          _context2.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: encoding must be of type String, received ".concat((0, _utils.getType)(params.encoding)));
      case 4:
        if (!(params.raw_body !== undefined && params.raw_body !== null && !(0, _utils.isString)(params.raw_body))) {
          _context2.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: raw_body must be of type String, received ".concat((0, _utils.getType)(params.raw_body)));
      case 5:
        if (!((0, _utils.isArray)(params.file_as_body) || (0, _utils.isObject)(params.file_as_body))) {
          _context2.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_as_body must be of type Boolean, received ".concat((0, _utils.getType)(params.file_as_body)));
      case 6:
        if (!(params.file_form_field !== undefined && params.file_form_field !== null && !(0, _utils.isString)(params.file_form_field))) {
          _context2.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_form_field must be of type String, received ".concat((0, _utils.getType)(params.file_form_field)));
      case 7:
        if (!(params.action !== undefined && params.action !== null && !(0, _utils.isString)(params.action))) {
          _context2.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
      case 8:
        if (!((0, _utils.isArray)(params.use_dedicated_ips) || (0, _utils.isObject)(params.use_dedicated_ips))) {
          _context2.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: use_dedicated_ips must be of type Boolean, received ".concat((0, _utils.getType)(params.use_dedicated_ips)));
      case 9:
        _context2.next = 10;
        return _Api.default.sendRequest('/webhook_tests', 'POST', params, options);
      case 10:
        response = _context2.sent;
        return _context2.abrupt("return", new _WebhookTest(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 11:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
var _default = exports.default = WebhookTest;
module.exports = WebhookTest;
module.exports.default = WebhookTest;