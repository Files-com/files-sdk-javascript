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
var _utils = require("../utils");
var _History;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class History
 */
var History = /*#__PURE__*/(0, _createClass2.default)(function History() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, History);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
  // int64 # Action ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // string # Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  // date-time # Action occurrence date/time
  (0, _defineProperty2.default)(this, "getWhen", function () {
    return _this.attributes.when;
  });
  // string # The destination path for this action, if applicable
  (0, _defineProperty2.default)(this, "getDestination", function () {
    return _this.attributes.destination;
  });
  // string # Friendly displayed output
  (0, _defineProperty2.default)(this, "getDisplay", function () {
    return _this.attributes.display;
  });
  // string # IP Address that performed this action
  (0, _defineProperty2.default)(this, "getIp", function () {
    return _this.attributes.ip;
  });
  // string # The source path for this action, if applicable
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  // object # Targets
  (0, _defineProperty2.default)(this, "getTargets", function () {
    return _this.attributes.targets;
  });
  // int64 # User ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  // string # Username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  // boolean # true if this change was performed by a user on a parent site.
  (0, _defineProperty2.default)(this, "getUserIsFromParentSite", function () {
    return _this.attributes.user_is_from_parent_site;
  });
  // string # Type of action
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  // string # Failure type.  If action was a user login or session failure, why did it fail?
  (0, _defineProperty2.default)(this, "getFailureType", function () {
    return _this.attributes.failure_type;
  });
  // string # Interface on which this action occurred.
  (0, _defineProperty2.default)(this, "getInterface", function () {
    return _this.attributes.interface;
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
_History = History;
// Parameters:
//   start_at - string - Leave blank or set to a date/time to filter earlier entries.
//   end_at - string - Leave blank or set to a date/time to filter later entries.
//   display - string - Display format. Leave blank or set to `full` or `parent`.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
//   path (required) - string - Path to operate on.
(0, _defineProperty2.default)(History, "listForFile", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(path) {
    var _response$data;
    var params,
      options,
      response,
      Action,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.start_at && !(0, _utils.isString)(params.start_at))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
        case 3:
          if (!(params.end_at && !(0, _utils.isString)(params.end_at))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
        case 4:
          if (!(params.display && !(0, _utils.isString)(params.display))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(params.display)));
        case 5:
          if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 6:
          if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 7:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          _context.next = 9;
          return _Api.default.sendRequest("/history/files/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 9:
          response = _context.sent;
          Action = require('./Action.js').default;
          return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new Action(obj, options);
          })) || []);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());
// Parameters:
//   start_at - string - Leave blank or set to a date/time to filter earlier entries.
//   end_at - string - Leave blank or set to a date/time to filter later entries.
//   display - string - Display format. Leave blank or set to `full` or `parent`.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
//   path (required) - string - Path to operate on.
(0, _defineProperty2.default)(History, "listForFolder", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(path) {
    var _response$data2;
    var params,
      options,
      response,
      Action,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context2.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.path = path;
          if (params.path) {
            _context2.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.start_at && !(0, _utils.isString)(params.start_at))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
        case 3:
          if (!(params.end_at && !(0, _utils.isString)(params.end_at))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
        case 4:
          if (!(params.display && !(0, _utils.isString)(params.display))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(params.display)));
        case 5:
          if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 6:
          if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 7:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 8:
          _context2.next = 9;
          return _Api.default.sendRequest("/history/folders/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 9:
          response = _context2.sent;
          Action = require('./Action.js').default;
          return _context2.abrupt("return", (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
            return new Action(obj, options);
          })) || []);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}());
// Parameters:
//   start_at - string - Leave blank or set to a date/time to filter earlier entries.
//   end_at - string - Leave blank or set to a date/time to filter later entries.
//   display - string - Display format. Leave blank or set to `full` or `parent`.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
//   user_id (required) - int64 - User ID.
(0, _defineProperty2.default)(History, "listForUser", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(userId) {
    var _response$data3;
    var params,
      options,
      response,
      Action,
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
          params.user_id = userId;
          if (params.user_id) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: user_id');
        case 2:
          if (!(params.start_at && !(0, _utils.isString)(params.start_at))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
        case 3:
          if (!(params.end_at && !(0, _utils.isString)(params.end_at))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
        case 4:
          if (!(params.display && !(0, _utils.isString)(params.display))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(params.display)));
        case 5:
          if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
            _context3.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 6:
          if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
            _context3.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 7:
          if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
            _context3.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
        case 8:
          _context3.next = 9;
          return _Api.default.sendRequest("/history/users/".concat(encodeURIComponent(params.user_id)), 'GET', params, options);
        case 9:
          response = _context3.sent;
          Action = require('./Action.js').default;
          return _context3.abrupt("return", (response === null || response === void 0 || (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.map(function (obj) {
            return new Action(obj, options);
          })) || []);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}());
// Parameters:
//   start_at - string - Leave blank or set to a date/time to filter earlier entries.
//   end_at - string - Leave blank or set to a date/time to filter later entries.
//   display - string - Display format. Leave blank or set to `full` or `parent`.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
(0, _defineProperty2.default)(History, "listLogins", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data4;
  var params,
    options,
    response,
    Action,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params.start_at && !(0, _utils.isString)(params.start_at))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
      case 1:
        if (!(params.end_at && !(0, _utils.isString)(params.end_at))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
      case 2:
        if (!(params.display && !(0, _utils.isString)(params.display))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(params.display)));
      case 3:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 4:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 5:
        _context4.next = 6;
        return _Api.default.sendRequest('/history/login', 'GET', params, options);
      case 6:
        response = _context4.sent;
        Action = require('./Action.js').default;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.map(function (obj) {
          return new Action(obj, options);
        })) || []);
      case 7:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
// Parameters:
//   start_at - string - Leave blank or set to a date/time to filter earlier entries.
//   end_at - string - Leave blank or set to a date/time to filter later entries.
//   display - string - Display format. Leave blank or set to `full` or `parent`.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `user_id`, `folder` or `path`. Valid field combinations are `[  ]`, `[ path ]`, `[ path ]` or `[ path ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
(0, _defineProperty2.default)(History, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _response$data5;
  var params,
    options,
    response,
    Action,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params.start_at && !(0, _utils.isString)(params.start_at))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
      case 1:
        if (!(params.end_at && !(0, _utils.isString)(params.end_at))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
      case 2:
        if (!(params.display && !(0, _utils.isString)(params.display))) {
          _context5.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(params.display)));
      case 3:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 4:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context5.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 5:
        _context5.next = 6;
        return _Api.default.sendRequest('/history', 'GET', params, options);
      case 6:
        response = _context5.sent;
        Action = require('./Action.js').default;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.map(function (obj) {
          return new Action(obj, options);
        })) || []);
      case 7:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(History, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _History.list(params, options);
});
var _default = exports.default = History;
module.exports = History;
module.exports.default = History;