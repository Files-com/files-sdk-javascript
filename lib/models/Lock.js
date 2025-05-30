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
var _Lock;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class Lock
 */
var Lock = /*#__PURE__*/(0, _createClass2.default)(function Lock() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Lock);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
  // string # Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // int64 # Lock timeout in seconds
  (0, _defineProperty2.default)(this, "getTimeout", function () {
    return _this.attributes.timeout;
  });
  (0, _defineProperty2.default)(this, "setTimeout", function (value) {
    _this.attributes.timeout = value;
  });
  // string
  (0, _defineProperty2.default)(this, "getDepth", function () {
    return _this.attributes.depth;
  });
  (0, _defineProperty2.default)(this, "setDepth", function (value) {
    _this.attributes.depth = value;
  });
  // boolean # Does lock apply to subfolders?
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
  });
  // string # Owner of the lock.  This can be any arbitrary string.
  (0, _defineProperty2.default)(this, "getOwner", function () {
    return _this.attributes.owner;
  });
  (0, _defineProperty2.default)(this, "setOwner", function (value) {
    _this.attributes.owner = value;
  });
  // string
  (0, _defineProperty2.default)(this, "getScope", function () {
    return _this.attributes.scope;
  });
  (0, _defineProperty2.default)(this, "setScope", function (value) {
    _this.attributes.scope = value;
  });
  // boolean # Is lock exclusive?
  (0, _defineProperty2.default)(this, "getExclusive", function () {
    return _this.attributes.exclusive;
  });
  (0, _defineProperty2.default)(this, "setExclusive", function (value) {
    _this.attributes.exclusive = value;
  });
  // string # Lock token.  Use to release lock.
  (0, _defineProperty2.default)(this, "getToken", function () {
    return _this.attributes.token;
  });
  (0, _defineProperty2.default)(this, "setToken", function (value) {
    _this.attributes.token = value;
  });
  // string
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
  });
  // boolean # Can lock be modified by users other than its creator?
  (0, _defineProperty2.default)(this, "getAllowAccessByAnyUser", function () {
    return _this.attributes.allow_access_by_any_user;
  });
  (0, _defineProperty2.default)(this, "setAllowAccessByAnyUser", function (value) {
    _this.attributes.allow_access_by_any_user = value;
  });
  // int64 # Lock creator user ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // string # Lock creator username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // Parameters:
  //   token (required) - string - Lock token
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.path) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no path');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.path = _this.attributes.path;
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.token && !(0, _utils.isString)(params.token))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: token must be of type String, received ".concat((0, _utils.getType)(params.token)));
        case 4:
          if (params.path) {
            _context.next = 6;
            break;
          }
          if (!_this.attributes.path) {
            _context.next = 5;
            break;
          }
          params.path = _this.path;
          _context.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 6:
          if (params.token) {
            _context.next = 8;
            break;
          }
          if (!_this.attributes.token) {
            _context.next = 7;
            break;
          }
          params.token = _this.token;
          _context.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: token');
        case 8:
          _context.next = 9;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params.path)), 'DELETE', params, _this.options);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var newObject;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 1;
          return Lock.create(_this.attributes.path, _this.attributes, _this.options);
        case 1:
          newObject = _context2.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context2.abrupt("return", true);
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  Object.entries(attributes).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_Lock = Lock;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   path (required) - string - Path to operate on.
//   include_children - boolean - Include locks from children objects?
(0, _defineProperty2.default)(Lock, "listFor", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(path) {
    var _response$data;
    var params,
      options,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context3.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 3:
          if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 4:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 5:
          _context3.next = 6;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 6:
          response = _context3.sent;
          return _context3.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new _Lock(obj, options);
          })) || []);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref5.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path
//   allow_access_by_any_user - boolean - Can lock be modified by users other than its creator?
//   exclusive - boolean - Is lock exclusive?
//   recursive - boolean - Does lock apply to subfolders?
//   timeout - int64 - Lock timeout in seconds
(0, _defineProperty2.default)(Lock, "create", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(path) {
    var params,
      options,
      response,
      _args4 = arguments;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context4.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context4.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context4.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.timeout && !(0, _utils.isInt)(params.timeout))) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: timeout must be of type Int, received ".concat((0, _utils.getType)(params.timeout)));
        case 4:
          _context4.next = 5;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 5:
          response = _context4.sent;
          return _context4.abrupt("return", new _Lock(response === null || response === void 0 ? void 0 : response.data, options));
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x2) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = exports.default = Lock;
module.exports = Lock;
module.exports.default = Lock;