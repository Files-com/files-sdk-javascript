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
var _Style;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class Style
 */
var Style = /*#__PURE__*/(0, _createClass2.default)(function Style() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Style);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
  // int64 # Style ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // Image # Logo
  (0, _defineProperty2.default)(this, "getLogo", function () {
    return _this.attributes.logo;
  });
  (0, _defineProperty2.default)(this, "setLogo", function (value) {
    _this.attributes.logo = value;
  });
  // Image # Logo thumbnail
  (0, _defineProperty2.default)(this, "getThumbnail", function () {
    return _this.attributes.thumbnail;
  });
  (0, _defineProperty2.default)(this, "setThumbnail", function (value) {
    _this.attributes.thumbnail = value;
  });
  // file # Logo for custom branding.
  (0, _defineProperty2.default)(this, "getFile", function () {
    return _this.attributes.file;
  });
  (0, _defineProperty2.default)(this, "setFile", function (value) {
    _this.attributes.file = value;
  });
  // Parameters:
  //   file (required) - file - Logo for custom branding.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.path) {
            _context.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (params.path) {
            _context.next = 14;
            break;
          }
          if (!_this.attributes.path) {
            _context.next = 13;
            break;
          }
          params.path = _this.path;
          _context.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 14:
          if (params.file) {
            _context.next = 20;
            break;
          }
          if (!_this.attributes.file) {
            _context.next = 19;
            break;
          }
          params.file = _this.file;
          _context.next = 20;
          break;
        case 19:
          throw new errors.MissingParameterError('Parameter missing: file');
        case 20:
          _context.next = 22;
          return _Api.default.sendRequest("/styles/".concat(encodeURIComponent(params.path)), 'PATCH', params, _this.options);
        case 22:
          response = _context.sent;
          return _context.abrupt("return", new Style(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.path) {
            _context2.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          if (params.path) {
            _context2.next = 14;
            break;
          }
          if (!_this.attributes.path) {
            _context2.next = 13;
            break;
          }
          params.path = _this.path;
          _context2.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 14:
          _context2.next = 16;
          return _Api.default.sendRequest("/styles/".concat(encodeURIComponent(params.path)), 'DELETE', params, _this.options);
        case 16:
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
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _this.update(_this.attributes);
        case 2:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 5:
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
_Style = Style;
// Parameters:
//   path (required) - string - Style path.
(0, _defineProperty2.default)(Style, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(path) {
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
          params.path = path;
          if (params.path) {
            _context4.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context4.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 9:
          _context4.next = 11;
          return _Api.default.sendRequest("/styles/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 11:
          response = _context4.sent;
          return _context4.abrupt("return", new _Style(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(Style, "get", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Style.find(path, params, options);
});
var _default = exports.default = Style;
module.exports = Style;
module.exports.default = Style;