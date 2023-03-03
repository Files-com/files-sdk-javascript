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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  // string # Path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
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
  // string # DEPRECATED: Lock depth
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
  // string # DEPRECATED: Lock scope
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
  // string # DEPRECATED: Lock type
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
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));
        case 8:
          if (!(params['token'] && !(0, _utils.isString)(params['token']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: token must be of type String, received ".concat((0, _utils.getType)(token)));
        case 10:
          if (params['path']) {
            _context.next = 16;
            break;
          }
          if (!_this.attributes.path) {
            _context.next = 15;
            break;
          }
          params['path'] = _this.path;
          _context.next = 16;
          break;
        case 15:
          throw new errors.MissingParameterError('Parameter missing: path');
        case 16:
          if (params['token']) {
            _context.next = 22;
            break;
          }
          if (!_this.attributes.token) {
            _context.next = 21;
            break;
          }
          params['token'] = _this.token;
          _context.next = 22;
          break;
        case 21:
          throw new errors.MissingParameterError('Parameter missing: token');
        case 22:
          _context.next = 24;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params['path'])), 'DELETE', params, _this.options);
        case 24:
          response = _context.sent;
          return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    var newObject = Lock.create(_this.attributes.path, _this.attributes, _this.options);
    _this.attributes = _objectSpread({}, newObject.attributes);
    return true;
  });
  Object.entries(attributes).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
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
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   path (required) - string - Path to operate on.
//   include_children - boolean - Include locks from children objects?
(0, _defineProperty2.default)(Lock, "listFor", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path) {
    var _response$data;
    var params,
      options,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['path'] = path;
          if (params['path']) {
            _context2.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
        case 9:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
        case 11:
          if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params['path'])));
        case 13:
          _context2.next = 15;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params['path'])), 'GET', params, options);
        case 15:
          response = _context2.sent;
          return _context2.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new Lock(obj, options);
          })) || []);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
// Parameters:
//   path (required) - string - Path
//   allow_access_by_any_user - boolean - Allow lock to be updated by any user?
//   exclusive - boolean - Is lock exclusive?
//   recursive - string - Does lock apply to subfolders?
//   timeout - int64 - Lock timeout length
(0, _defineProperty2.default)(Lock, "create", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(path) {
    var params,
      options,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['path'] = path;
          if (params['path']) {
            _context3.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 7:
          if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
            _context3.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params['path'])));
        case 9:
          if (!(params['recursive'] && !(0, _utils.isString)(params['recursive']))) {
            _context3.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recursive must be of type String, received ".concat((0, _utils.getType)(params['recursive'])));
        case 11:
          if (!(params['timeout'] && !(0, _utils.isInt)(params['timeout']))) {
            _context3.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: timeout must be of type Int, received ".concat((0, _utils.getType)(params['timeout'])));
        case 13:
          _context3.next = 15;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params['path'])), 'POST', params, options);
        case 15:
          response = _context3.sent;
          return _context3.abrupt("return", new Lock(response === null || response === void 0 ? void 0 : response.data, options));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x2) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = Lock;
exports.default = _default;