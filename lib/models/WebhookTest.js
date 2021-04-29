"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class WebhookTest
 */
var WebhookTest = function WebhookTest() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, WebhookTest);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getCode", function () {
    return _this.attributes.code;
  });
  (0, _defineProperty2.default)(this, "setCode", function (value) {
    _this.attributes.code = value;
  });
  (0, _defineProperty2.default)(this, "getMessage", function () {
    return _this.attributes.message;
  });
  (0, _defineProperty2.default)(this, "setMessage", function (value) {
    _this.attributes.message = value;
  });
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  (0, _defineProperty2.default)(this, "getData", function () {
    return _this.attributes.data;
  });
  (0, _defineProperty2.default)(this, "setData", function (value) {
    _this.attributes.data = value;
  });
  (0, _defineProperty2.default)(this, "getSuccess", function () {
    return _this.attributes.success;
  });
  (0, _defineProperty2.default)(this, "setSuccess", function (value) {
    _this.attributes.success = value;
  });
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
  });
  (0, _defineProperty2.default)(this, "getMethod", function () {
    return _this.attributes.method;
  });
  (0, _defineProperty2.default)(this, "setMethod", function (value) {
    _this.attributes.method = value;
  });
  (0, _defineProperty2.default)(this, "getEncoding", function () {
    return _this.attributes.encoding;
  });
  (0, _defineProperty2.default)(this, "setEncoding", function (value) {
    _this.attributes.encoding = value;
  });
  (0, _defineProperty2.default)(this, "getHeaders", function () {
    return _this.attributes.headers;
  });
  (0, _defineProperty2.default)(this, "setHeaders", function (value) {
    _this.attributes.headers = value;
  });
  (0, _defineProperty2.default)(this, "getBody", function () {
    return _this.attributes.body;
  });
  (0, _defineProperty2.default)(this, "setBody", function (value) {
    _this.attributes.body = value;
  });
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new Error('The WebhookTest object doesn\'t support updates.');
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
};

(0, _defineProperty2.default)(WebhookTest, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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

          if (params['url']) {
            _context.next = 4;
            break;
          }

          throw new Error('Parameter missing: url');

        case 4:
          if (!(params['url'] && !(0, _utils.isString)(params['url']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: url must be of type String, received ".concat((0, _utils.getType)(url)));

        case 6:
          if (!(params['method'] && !(0, _utils.isString)(params['method']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: method must be of type String, received ".concat((0, _utils.getType)(method)));

        case 8:
          if (!(params['encoding'] && !(0, _utils.isString)(params['encoding']))) {
            _context.next = 10;
            break;
          }

          throw new Error("Bad parameter: encoding must be of type String, received ".concat((0, _utils.getType)(encoding)));

        case 10:
          if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
            _context.next = 12;
            break;
          }

          throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

        case 12:
          _context.next = 14;
          return _Api.default.sendRequest("/webhook_tests", 'POST', params, options);

        case 14:
          response = _context.sent;
          return _context.abrupt("return", new WebhookTest(response === null || response === void 0 ? void 0 : response.data, options));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
var _default = WebhookTest;
exports.default = _default;