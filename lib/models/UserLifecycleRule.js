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
var _UserLifecycleRule;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class UserLifecycleRule
 */
var UserLifecycleRule = /*#__PURE__*/(0, _createClass2.default)(function UserLifecycleRule() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, UserLifecycleRule);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # User Lifecycle Rule ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # User authentication method for the rule
  (0, _defineProperty2.default)(this, "getAuthenticationMethod", function () {
    return _this.attributes.authentication_method;
  });
  (0, _defineProperty2.default)(this, "setAuthenticationMethod", function (value) {
    _this.attributes.authentication_method = value;
  });
  // int64 # Number of days of inactivity before the rule applies
  (0, _defineProperty2.default)(this, "getInactivityDays", function () {
    return _this.attributes.inactivity_days;
  });
  (0, _defineProperty2.default)(this, "setInactivityDays", function (value) {
    _this.attributes.inactivity_days = value;
  });
  // boolean # Include folder admins in the rule
  (0, _defineProperty2.default)(this, "getIncludeFolderAdmins", function () {
    return _this.attributes.include_folder_admins;
  });
  (0, _defineProperty2.default)(this, "setIncludeFolderAdmins", function (value) {
    _this.attributes.include_folder_admins = value;
  });
  // boolean # Include site admins in the rule
  (0, _defineProperty2.default)(this, "getIncludeSiteAdmins", function () {
    return _this.attributes.include_site_admins;
  });
  (0, _defineProperty2.default)(this, "setIncludeSiteAdmins", function (value) {
    _this.attributes.include_site_admins = value;
  });
  // string # Action to take on inactive users (disable or delete)
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "setAction", function (value) {
    _this.attributes.action = value;
  });
  // string # State of the users to apply the rule to (inactive or disabled)
  (0, _defineProperty2.default)(this, "getUserState", function () {
    return _this.attributes.user_state;
  });
  (0, _defineProperty2.default)(this, "setUserState", function (value) {
    _this.attributes.user_state = value;
  });
  // string # User Lifecycle Rule name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // int64 # Site ID
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
  });
  // Parameters:
  //   action - string - Action to take on inactive users (disable or delete)
  //   authentication_method - string - User authentication method for the rule
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies
  //   include_site_admins - boolean - Include site admins in the rule
  //   include_folder_admins - boolean - Include folder admins in the rule
  //   user_state - string - State of the users to apply the rule to (inactive or disabled)
  //   name - string - User Lifecycle Rule name
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.action && !(0, _utils.isString)(params.action))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
        case 4:
          if (!(params.authentication_method && !(0, _utils.isString)(params.authentication_method))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: authentication_method must be of type String, received ".concat((0, _utils.getType)(params.authentication_method)));
        case 5:
          if (!(params.inactivity_days && !(0, _utils.isInt)(params.inactivity_days))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: inactivity_days must be of type Int, received ".concat((0, _utils.getType)(params.inactivity_days)));
        case 6:
          if (!(params.user_state && !(0, _utils.isString)(params.user_state))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_state must be of type String, received ".concat((0, _utils.getType)(params.user_state)));
        case 7:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 8:
          if (params.id) {
            _context.next = 10;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 9;
            break;
          }
          params.id = _this.id;
          _context.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 10:
          _context.next = 11;
          return _Api.default.sendRequest("/user_lifecycle_rules/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 11:
          response = _context.sent;
          return _context.abrupt("return", new UserLifecycleRule(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context2.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 4;
            break;
          }
          params.id = _this.id;
          _context2.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context2.next = 6;
          return _Api.default.sendRequest("/user_lifecycle_rules/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
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
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!_this.attributes.id) {
            _context3.next = 2;
            break;
          }
          _context3.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context3.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return UserLifecycleRule.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
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
_UserLifecycleRule = UserLifecycleRule;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(UserLifecycleRule, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context4.next = 3;
        return _Api.default.sendRequest('/user_lifecycle_rules', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _UserLifecycleRule(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(UserLifecycleRule, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _UserLifecycleRule.list(params, options);
});
// Parameters:
//   id (required) - int64 - User Lifecycle Rule ID.
(0, _defineProperty2.default)(UserLifecycleRule, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/user_lifecycle_rules/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _UserLifecycleRule(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(UserLifecycleRule, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _UserLifecycleRule.find(id, params, options);
});
// Parameters:
//   action - string - Action to take on inactive users (disable or delete)
//   authentication_method - string - User authentication method for the rule
//   inactivity_days - int64 - Number of days of inactivity before the rule applies
//   include_site_admins - boolean - Include site admins in the rule
//   include_folder_admins - boolean - Include folder admins in the rule
//   user_state - string - State of the users to apply the rule to (inactive or disabled)
//   name - string - User Lifecycle Rule name
(0, _defineProperty2.default)(UserLifecycleRule, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params.action && !(0, _utils.isString)(params.action))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
      case 1:
        if (!(params.authentication_method && !(0, _utils.isString)(params.authentication_method))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: authentication_method must be of type String, received ".concat((0, _utils.getType)(params.authentication_method)));
      case 2:
        if (!(params.inactivity_days && !(0, _utils.isInt)(params.inactivity_days))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: inactivity_days must be of type Int, received ".concat((0, _utils.getType)(params.inactivity_days)));
      case 3:
        if (!(params.user_state && !(0, _utils.isString)(params.user_state))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_state must be of type String, received ".concat((0, _utils.getType)(params.user_state)));
      case 4:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 5:
        _context6.next = 6;
        return _Api.default.sendRequest('/user_lifecycle_rules', 'POST', params, options);
      case 6:
        response = _context6.sent;
        return _context6.abrupt("return", new _UserLifecycleRule(response === null || response === void 0 ? void 0 : response.data, options));
      case 7:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = UserLifecycleRule;
module.exports = UserLifecycleRule;
module.exports.default = UserLifecycleRule;