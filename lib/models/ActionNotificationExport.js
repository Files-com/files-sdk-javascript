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
 * Class ActionNotificationExport
 */
var ActionNotificationExport = /*#__PURE__*/(0, _createClass2.default)(function ActionNotificationExport() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ActionNotificationExport);
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
  (0, _defineProperty2.default)(this, "getExportVersion", function () {
    return _this.attributes.export_version;
  });
  (0, _defineProperty2.default)(this, "setExportVersion", function (value) {
    _this.attributes.export_version = value;
  });
  (0, _defineProperty2.default)(this, "getStartAt", function () {
    return _this.attributes.start_at;
  });
  (0, _defineProperty2.default)(this, "setStartAt", function (value) {
    _this.attributes.start_at = value;
  });
  (0, _defineProperty2.default)(this, "getEndAt", function () {
    return _this.attributes.end_at;
  });
  (0, _defineProperty2.default)(this, "setEndAt", function (value) {
    _this.attributes.end_at = value;
  });
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  (0, _defineProperty2.default)(this, "getQueryPath", function () {
    return _this.attributes.query_path;
  });
  (0, _defineProperty2.default)(this, "setQueryPath", function (value) {
    _this.attributes.query_path = value;
  });
  (0, _defineProperty2.default)(this, "getQueryFolder", function () {
    return _this.attributes.query_folder;
  });
  (0, _defineProperty2.default)(this, "setQueryFolder", function (value) {
    _this.attributes.query_folder = value;
  });
  (0, _defineProperty2.default)(this, "getQueryMessage", function () {
    return _this.attributes.query_message;
  });
  (0, _defineProperty2.default)(this, "setQueryMessage", function (value) {
    _this.attributes.query_message = value;
  });
  (0, _defineProperty2.default)(this, "getQueryRequestMethod", function () {
    return _this.attributes.query_request_method;
  });
  (0, _defineProperty2.default)(this, "setQueryRequestMethod", function (value) {
    _this.attributes.query_request_method = value;
  });
  (0, _defineProperty2.default)(this, "getQueryRequestUrl", function () {
    return _this.attributes.query_request_url;
  });
  (0, _defineProperty2.default)(this, "setQueryRequestUrl", function (value) {
    _this.attributes.query_request_url = value;
  });
  (0, _defineProperty2.default)(this, "getQueryStatus", function () {
    return _this.attributes.query_status;
  });
  (0, _defineProperty2.default)(this, "setQueryStatus", function (value) {
    _this.attributes.query_status = value;
  });
  (0, _defineProperty2.default)(this, "getQuerySuccess", function () {
    return _this.attributes.query_success;
  });
  (0, _defineProperty2.default)(this, "setQuerySuccess", function (value) {
    _this.attributes.query_success = value;
  });
  (0, _defineProperty2.default)(this, "getResultsUrl", function () {
    return _this.attributes.results_url;
  });
  (0, _defineProperty2.default)(this, "setResultsUrl", function (value) {
    _this.attributes.results_url = value;
  });
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new errors.NotImplementedError('The ActionNotificationExport object doesn\'t support updates.');
    } else {
      var newObject = ActionNotificationExport.create(_this.attributes, _this.options);
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
(0, _defineProperty2.default)(ActionNotificationExport, "find", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
    var params,
      options,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            if ((0, _utils.isObject)(params)) {
              _context.next = 4;
              break;
            }
            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
          case 4:
            params['id'] = id;
            if (params['id']) {
              _context.next = 7;
              break;
            }
            throw new errors.MissingParameterError('Parameter missing: id');
          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context.next = 9;
              break;
            }
            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
          case 9:
            _context.next = 11;
            return _Api.default.sendRequest("/action_notification_exports/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
          case 11:
            response = _context.sent;
            return _context.abrupt("return", new ActionNotificationExport(response === null || response === void 0 ? void 0 : response.data, options));
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ActionNotificationExport, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return ActionNotificationExport.find(id, params, options);
});
(0, _defineProperty2.default)(ActionNotificationExport, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
          if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
        case 4:
          if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params['start_at'])));
        case 6:
          if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params['end_at'])));
        case 8:
          if (!(params['query_message'] && !(0, _utils.isString)(params['query_message']))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: query_message must be of type String, received ".concat((0, _utils.getType)(params['query_message'])));
        case 10:
          if (!(params['query_request_method'] && !(0, _utils.isString)(params['query_request_method']))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: query_request_method must be of type String, received ".concat((0, _utils.getType)(params['query_request_method'])));
        case 12:
          if (!(params['query_request_url'] && !(0, _utils.isString)(params['query_request_url']))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: query_request_url must be of type String, received ".concat((0, _utils.getType)(params['query_request_url'])));
        case 14:
          if (!(params['query_status'] && !(0, _utils.isString)(params['query_status']))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: query_status must be of type String, received ".concat((0, _utils.getType)(params['query_status'])));
        case 16:
          if (!(params['query_path'] && !(0, _utils.isString)(params['query_path']))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: query_path must be of type String, received ".concat((0, _utils.getType)(params['query_path'])));
        case 18:
          if (!(params['query_folder'] && !(0, _utils.isString)(params['query_folder']))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: query_folder must be of type String, received ".concat((0, _utils.getType)(params['query_folder'])));
        case 20:
          _context2.next = 22;
          return _Api.default.sendRequest("/action_notification_exports", 'POST', params, options);
        case 22:
          response = _context2.sent;
          return _context2.abrupt("return", new ActionNotificationExport(response === null || response === void 0 ? void 0 : response.data, options));
        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
var _default = ActionNotificationExport;
exports.default = _default;