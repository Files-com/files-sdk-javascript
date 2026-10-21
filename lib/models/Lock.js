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
var _Lock;
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
    exposeAttributes(_this, ['path']);
  });
  // int64 # Lock timeout in seconds
  (0, _defineProperty2.default)(this, "getTimeout", function () {
    return _this.attributes.timeout;
  });
  (0, _defineProperty2.default)(this, "setTimeout", function (value) {
    _this.attributes.timeout = value;
    exposeAttributes(_this, ['timeout']);
  });
  // string
  (0, _defineProperty2.default)(this, "getDepth", function () {
    return _this.attributes.depth;
  });
  (0, _defineProperty2.default)(this, "setDepth", function (value) {
    _this.attributes.depth = value;
    exposeAttributes(_this, ['depth']);
  });
  // boolean # Does lock apply to subfolders?
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
    exposeAttributes(_this, ['recursive']);
  });
  // string # Arbitrary descriptive label for the lock. Does not change the lock creator or permissions.
  (0, _defineProperty2.default)(this, "getOwner", function () {
    return _this.attributes.owner;
  });
  (0, _defineProperty2.default)(this, "setOwner", function (value) {
    _this.attributes.owner = value;
    exposeAttributes(_this, ['owner']);
  });
  // string
  (0, _defineProperty2.default)(this, "getScope", function () {
    return _this.attributes.scope;
  });
  (0, _defineProperty2.default)(this, "setScope", function (value) {
    _this.attributes.scope = value;
    exposeAttributes(_this, ['scope']);
  });
  // boolean # Is lock exclusive?
  (0, _defineProperty2.default)(this, "getExclusive", function () {
    return _this.attributes.exclusive;
  });
  (0, _defineProperty2.default)(this, "setExclusive", function (value) {
    _this.attributes.exclusive = value;
    exposeAttributes(_this, ['exclusive']);
  });
  // string # Lock token.  Use to release lock.
  (0, _defineProperty2.default)(this, "getToken", function () {
    return _this.attributes.token;
  });
  (0, _defineProperty2.default)(this, "setToken", function (value) {
    _this.attributes.token = value;
    exposeAttributes(_this, ['token']);
  });
  // string
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
    exposeAttributes(_this, ['type']);
  });
  // boolean # Can lock be modified by users other than its creator?
  (0, _defineProperty2.default)(this, "getAllowAccessByAnyUser", function () {
    return _this.attributes.allow_access_by_any_user;
  });
  (0, _defineProperty2.default)(this, "setAllowAccessByAnyUser", function (value) {
    _this.attributes.allow_access_by_any_user = value;
    exposeAttributes(_this, ['allow_access_by_any_user']);
  });
  // int64 # Lock creator user ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // string # Lock creator username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
    exposeAttributes(_this, ['username']);
  });
  // string # Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to refresh, or a different value to replace.
  (0, _defineProperty2.default)(this, "getExpectedToken", function () {
    return _this.attributes.expected_token;
  });
  (0, _defineProperty2.default)(this, "setExpectedToken", function (value) {
    _this.attributes.expected_token = value;
    exposeAttributes(_this, ['expected_token']);
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.path = _this.attributes.path;
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.token !== undefined && params.token !== null && !(0, _utils.isString)(params.token))) {
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
          adoptAttributes(_this, newObject.attributes);
          return _context2.abrupt("return", true);
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Lock = Lock;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.path = path;
          if (params.path) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 3:
          if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 4:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 5:
          if (!((0, _utils.isArray)(params.include_children) || (0, _utils.isObject)(params.include_children))) {
            _context3.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: include_children must be of type Boolean, received ".concat((0, _utils.getType)(params.include_children)));
        case 6:
          _context3.next = 7;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 7:
          response = _context3.sent;
          return _context3.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new _Lock(obj, retainedOptions(options));
          })) || []);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref5.apply(this, arguments);
  };
}());
// The items listFor() lists, one at a time: an async iterator that requests each page
// through listFor() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Lock, "listForIterator", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Lock.listFor(path, pageParams, pageOptions);
  });
});
// Parameters:
//   path (required) - string - Path
//   token - string - Lock token. With expected_token, use the same value to refresh or a different value to replace the existing token.
//   expected_token - string - Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to refresh, or a different value to replace.
//   allow_access_by_any_user - boolean - Can lock be modified by users other than its creator?
//   exclusive - boolean - Is lock exclusive?
//   recursive - boolean - Does lock apply to subfolders?
//   owner - string - Arbitrary descriptive label for the lock. Does not change the lock creator or permissions.
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.path = path;
          if (params.path) {
            _context4.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
            _context4.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 3:
          if (!(params.token !== undefined && params.token !== null && !(0, _utils.isString)(params.token))) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: token must be of type String, received ".concat((0, _utils.getType)(params.token)));
        case 4:
          if (!(params.expected_token !== undefined && params.expected_token !== null && !(0, _utils.isString)(params.expected_token))) {
            _context4.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: expected_token must be of type String, received ".concat((0, _utils.getType)(params.expected_token)));
        case 5:
          if (!((0, _utils.isArray)(params.allow_access_by_any_user) || (0, _utils.isObject)(params.allow_access_by_any_user))) {
            _context4.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: allow_access_by_any_user must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_access_by_any_user)));
        case 6:
          if (!((0, _utils.isArray)(params.exclusive) || (0, _utils.isObject)(params.exclusive))) {
            _context4.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: exclusive must be of type Boolean, received ".concat((0, _utils.getType)(params.exclusive)));
        case 7:
          if (!((0, _utils.isArray)(params.recursive) || (0, _utils.isObject)(params.recursive))) {
            _context4.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recursive must be of type Boolean, received ".concat((0, _utils.getType)(params.recursive)));
        case 8:
          if (!(params.owner !== undefined && params.owner !== null && !(0, _utils.isString)(params.owner))) {
            _context4.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: owner must be of type String, received ".concat((0, _utils.getType)(params.owner)));
        case 9:
          if (!(params.timeout !== undefined && params.timeout !== null && !(0, _utils.isInt)(params.timeout))) {
            _context4.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: timeout must be of type Int, received ".concat((0, _utils.getType)(params.timeout)));
        case 10:
          _context4.next = 11;
          return _Api.default.sendRequest("/locks/".concat(encodeURIComponent(params.path)), 'POST', params, options);
        case 11:
          response = _context4.sent;
          return _context4.abrupt("return", new _Lock(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 12:
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