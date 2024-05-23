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
var _MessageComment;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class MessageComment
 */
var MessageComment = /*#__PURE__*/(0, _createClass2.default)(function MessageComment() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, MessageComment);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Message Comment ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Comment body.
  (0, _defineProperty2.default)(this, "getBody", function () {
    return _this.attributes.body;
  });
  (0, _defineProperty2.default)(this, "setBody", function (value) {
    _this.attributes.body = value;
  });
  // array(object) # Reactions to this comment.
  (0, _defineProperty2.default)(this, "getReactions", function () {
    return _this.attributes.reactions;
  });
  (0, _defineProperty2.default)(this, "setReactions", function (value) {
    _this.attributes.reactions = value;
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // Parameters:
  //   body (required) - string - Comment body.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 8:
          if (!(params.body && !(0, _utils.isString)(params.body))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: body must be of type String, received ".concat((0, _utils.getType)(params.body)));
        case 10:
          if (params.id) {
            _context.next = 16;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 15;
            break;
          }
          params.id = _this.id;
          _context.next = 16;
          break;
        case 15:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 16:
          if (params.body) {
            _context.next = 22;
            break;
          }
          if (!_this.attributes.body) {
            _context.next = 21;
            break;
          }
          params.body = _this.body;
          _context.next = 22;
          break;
        case 21:
          throw new errors.MissingParameterError('Parameter missing: body');
        case 22:
          _context.next = 24;
          return _Api.default.sendRequest("/message_comments/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 24:
          response = _context.sent;
          return _context.abrupt("return", new MessageComment(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 8:
          if (params.id) {
            _context2.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 13;
            break;
          }
          params.id = _this.id;
          _context2.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context2.next = 16;
          return _Api.default.sendRequest("/message_comments/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!_this.attributes.id) {
            _context3.next = 6;
            break;
          }
          _context3.next = 3;
          return _this.update(_this.attributes);
        case 3:
          _newObject = _context3.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context3.abrupt("return", true);
        case 6:
          _context3.next = 8;
          return MessageComment.create(_this.attributes, _this.options);
        case 8:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 11:
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
_MessageComment = MessageComment;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   message_id (required) - int64 - Message comment to return comments for.
(0, _defineProperty2.default)(MessageComment, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (params.message_id) {
          _context4.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: message_id');
      case 4:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context4.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 6:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 8:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 10:
        if (!(params.message_id && !(0, _utils.isInt)(params.message_id))) {
          _context4.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: message_id must be of type Int, received ".concat((0, _utils.getType)(params.message_id)));
      case 12:
        _context4.next = 14;
        return _Api.default.sendRequest('/message_comments', 'GET', params, options);
      case 14:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _MessageComment(obj, options);
        })) || []);
      case 16:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(MessageComment, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _MessageComment.list(params, options);
});
// Parameters:
//   id (required) - int64 - Message Comment ID.
(0, _defineProperty2.default)(MessageComment, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params.id = id;
          if (params.id) {
            _context5.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 9:
          _context5.next = 11;
          return _Api.default.sendRequest("/message_comments/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 11:
          response = _context5.sent;
          return _context5.abrupt("return", new _MessageComment(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(MessageComment, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _MessageComment.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   body (required) - string - Comment body.
(0, _defineProperty2.default)(MessageComment, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.body) {
          _context6.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: body');
      case 4:
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 6:
        if (!(params.body && !(0, _utils.isString)(params.body))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: body must be of type String, received ".concat((0, _utils.getType)(params.body)));
      case 8:
        _context6.next = 10;
        return _Api.default.sendRequest('/message_comments', 'POST', params, options);
      case 10:
        response = _context6.sent;
        return _context6.abrupt("return", new _MessageComment(response === null || response === void 0 ? void 0 : response.data, options));
      case 12:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = MessageComment;
module.exports = MessageComment;
module.exports.default = MessageComment;