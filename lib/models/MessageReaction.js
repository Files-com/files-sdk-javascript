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
var _MessageReaction;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class MessageReaction
 */
var MessageReaction = /*#__PURE__*/(0, _createClass2.default)(function MessageReaction() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, MessageReaction);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Reaction ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Emoji used in the reaction.
  (0, _defineProperty2.default)(this, "getEmoji", function () {
    return _this.attributes.emoji;
  });
  (0, _defineProperty2.default)(this, "setEmoji", function (value) {
    _this.attributes.emoji = value;
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
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
          if (params.id) {
            _context.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          params.id = _this.id;
          _context.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context.next = 6;
          return _Api.default.sendRequest("/message_reactions/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
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
          if (!_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The MessageReaction object doesn\'t support updates.');
        case 1:
          _context2.next = 2;
          return MessageReaction.create(_this.attributes, _this.options);
        case 2:
          newObject = _context2.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context2.abrupt("return", true);
        case 3:
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
_MessageReaction = MessageReaction;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   message_id (required) - int64 - Message to return reactions for.
(0, _defineProperty2.default)(MessageReaction, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (params.message_id) {
          _context3.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: message_id');
      case 1:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
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
        if (!(params.message_id && !(0, _utils.isInt)(params.message_id))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: message_id must be of type Int, received ".concat((0, _utils.getType)(params.message_id)));
      case 5:
        _context3.next = 6;
        return _Api.default.sendRequest('/message_reactions', 'GET', params, options);
      case 6:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _MessageReaction(obj, options);
        })) || []);
      case 7:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(MessageReaction, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _MessageReaction.list(params, options);
});
// Parameters:
//   id (required) - int64 - Message Reaction ID.
(0, _defineProperty2.default)(MessageReaction, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
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
          params.id = id;
          if (params.id) {
            _context4.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context4.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context4.next = 4;
          return _Api.default.sendRequest("/message_reactions/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context4.sent;
          return _context4.abrupt("return", new _MessageReaction(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x) {
    return _ref6.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(MessageReaction, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _MessageReaction.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   emoji (required) - string - Emoji to react with.
(0, _defineProperty2.default)(MessageReaction, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (params.emoji) {
          _context5.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: emoji');
      case 1:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.emoji && !(0, _utils.isString)(params.emoji))) {
          _context5.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: emoji must be of type String, received ".concat((0, _utils.getType)(params.emoji)));
      case 3:
        _context5.next = 4;
        return _Api.default.sendRequest('/message_reactions', 'POST', params, options);
      case 4:
        response = _context5.sent;
        return _context5.abrupt("return", new _MessageReaction(response === null || response === void 0 ? void 0 : response.data, options));
      case 5:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
var _default = exports.default = MessageReaction;
module.exports = MessageReaction;
module.exports.default = MessageReaction;