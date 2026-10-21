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
var _InboxRecipient;
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
 * Class InboxRecipient
 */
var InboxRecipient = /*#__PURE__*/(0, _createClass2.default)(function InboxRecipient() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, InboxRecipient);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # The recipient's company.
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  (0, _defineProperty2.default)(this, "setCompany", function (value) {
    _this.attributes.company = value;
    exposeAttributes(_this, ['company']);
  });
  // string # The recipient's name.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # A note sent to the recipient with the inbox.
  (0, _defineProperty2.default)(this, "getNote", function () {
    return _this.attributes.note;
  });
  (0, _defineProperty2.default)(this, "setNote", function (value) {
    _this.attributes.note = value;
    exposeAttributes(_this, ['note']);
  });
  // string # The recipient's email address.
  (0, _defineProperty2.default)(this, "getRecipient", function () {
    return _this.attributes.recipient;
  });
  (0, _defineProperty2.default)(this, "setRecipient", function (value) {
    _this.attributes.recipient = value;
    exposeAttributes(_this, ['recipient']);
  });
  // date-time # When the Inbox was shared with this recipient.
  (0, _defineProperty2.default)(this, "getSentAt", function () {
    return _this.attributes.sent_at;
  });
  (0, _defineProperty2.default)(this, "setSentAt", function (value) {
    _this.attributes.sent_at = value;
    exposeAttributes(_this, ['sent_at']);
  });
  // int64 # Inbox to share.
  (0, _defineProperty2.default)(this, "getInboxId", function () {
    return _this.attributes.inbox_id;
  });
  (0, _defineProperty2.default)(this, "setInboxId", function (value) {
    _this.attributes.inbox_id = value;
    exposeAttributes(_this, ['inbox_id']);
  });
  // boolean # Set to true to share the link with the recipient upon creation.
  (0, _defineProperty2.default)(this, "getShareAfterCreate", function () {
    return _this.attributes.share_after_create;
  });
  (0, _defineProperty2.default)(this, "setShareAfterCreate", function (value) {
    _this.attributes.share_after_create = value;
    exposeAttributes(_this, ['share_after_create']);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The InboxRecipient object doesn\'t support updates.');
        case 1:
          _context.next = 2;
          return InboxRecipient.create(_this.attributes, _this.options);
        case 2:
          newObject = _context.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context.abrupt("return", true);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_InboxRecipient = InboxRecipient;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `has_registrations`.
//   inbox_id (required) - int64 - List recipients for the inbox with this ID.
(0, _defineProperty2.default)(InboxRecipient, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (params.inbox_id) {
          _context2.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: inbox_id');
      case 1:
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        if (!(params.inbox_id !== undefined && params.inbox_id !== null && !(0, _utils.isInt)(params.inbox_id))) {
          _context2.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params.inbox_id)));
      case 4:
        _context2.next = 5;
        return _Api.default.sendRequest('/inbox_recipients', 'GET', params, options);
      case 5:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _InboxRecipient(obj, retainedOptions(options));
        })) || []);
      case 6:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(InboxRecipient, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _InboxRecipient.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(InboxRecipient, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _InboxRecipient.list(pageParams, pageOptions);
  });
});
// Parameters:
//   inbox_id (required) - int64 - Inbox to share.
//   recipient (required) - string - Email address to share this inbox with.
//   name - string - Name of recipient.
//   company - string - Company of recipient.
//   note - string - Note to include in email.
//   share_after_create - boolean - Set to true to share the link with the recipient upon creation.
(0, _defineProperty2.default)(InboxRecipient, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (params.inbox_id) {
          _context3.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: inbox_id');
      case 1:
        if (params.recipient) {
          _context3.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: recipient');
      case 2:
        if (!(params.inbox_id !== undefined && params.inbox_id !== null && !(0, _utils.isInt)(params.inbox_id))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params.inbox_id)));
      case 3:
        if (!(params.recipient !== undefined && params.recipient !== null && !(0, _utils.isString)(params.recipient))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recipient must be of type String, received ".concat((0, _utils.getType)(params.recipient)));
      case 4:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 5:
        if (!(params.company !== undefined && params.company !== null && !(0, _utils.isString)(params.company))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(params.company)));
      case 6:
        if (!(params.note !== undefined && params.note !== null && !(0, _utils.isString)(params.note))) {
          _context3.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
      case 7:
        if (!((0, _utils.isArray)(params.share_after_create) || (0, _utils.isObject)(params.share_after_create))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: share_after_create must be of type Boolean, received ".concat((0, _utils.getType)(params.share_after_create)));
      case 8:
        _context3.next = 9;
        return _Api.default.sendRequest('/inbox_recipients', 'POST', params, options);
      case 9:
        response = _context3.sent;
        return _context3.abrupt("return", new _InboxRecipient(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 10:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = InboxRecipient;
module.exports = InboxRecipient;
module.exports.default = InboxRecipient;