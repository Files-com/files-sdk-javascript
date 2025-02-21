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
var _ExternalEvent;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class ExternalEvent
 */
var ExternalEvent = /*#__PURE__*/(0, _createClass2.default)(function ExternalEvent() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ExternalEvent);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Event ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Type of event being recorded.
  (0, _defineProperty2.default)(this, "getEventType", function () {
    return _this.attributes.event_type;
  });
  (0, _defineProperty2.default)(this, "setEventType", function (value) {
    _this.attributes.event_type = value;
  });
  // string # Status of event.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // string # Event body
  (0, _defineProperty2.default)(this, "getBody", function () {
    return _this.attributes.body;
  });
  (0, _defineProperty2.default)(this, "setBody", function (value) {
    _this.attributes.body = value;
  });
  // date-time # External event create date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # Link to log file.
  (0, _defineProperty2.default)(this, "getBodyUrl", function () {
    return _this.attributes.body_url;
  });
  (0, _defineProperty2.default)(this, "setBodyUrl", function (value) {
    _this.attributes.body_url = value;
  });
  // int64 # Folder Behavior ID
  (0, _defineProperty2.default)(this, "getFolderBehaviorId", function () {
    return _this.attributes.folder_behavior_id;
  });
  (0, _defineProperty2.default)(this, "setFolderBehaviorId", function (value) {
    _this.attributes.folder_behavior_id = value;
  });
  // int64 # SIEM HTTP Destination ID.
  (0, _defineProperty2.default)(this, "getSiemHttpDestinationId", function () {
    return _this.attributes.siem_http_destination_id;
  });
  (0, _defineProperty2.default)(this, "setSiemHttpDestinationId", function (value) {
    _this.attributes.siem_http_destination_id = value;
  });
  // int64 # For sync events, the number of files handled successfully.
  (0, _defineProperty2.default)(this, "getSuccessfulFiles", function () {
    return _this.attributes.successful_files;
  });
  (0, _defineProperty2.default)(this, "setSuccessfulFiles", function (value) {
    _this.attributes.successful_files = value;
  });
  // int64 # For sync events, the number of files that encountered errors.
  (0, _defineProperty2.default)(this, "getErroredFiles", function () {
    return _this.attributes.errored_files;
  });
  (0, _defineProperty2.default)(this, "setErroredFiles", function (value) {
    _this.attributes.errored_files = value;
  });
  // int64 # For sync events, the total number of bytes synced.
  (0, _defineProperty2.default)(this, "getBytesSynced", function () {
    return _this.attributes.bytes_synced;
  });
  (0, _defineProperty2.default)(this, "setBytesSynced", function (value) {
    _this.attributes.bytes_synced = value;
  });
  // int64 # For sync events, the number of files considered for the sync.
  (0, _defineProperty2.default)(this, "getComparedFiles", function () {
    return _this.attributes.compared_files;
  });
  (0, _defineProperty2.default)(this, "setComparedFiles", function (value) {
    _this.attributes.compared_files = value;
  });
  // int64 # For sync events, the number of folders listed and considered for the sync.
  (0, _defineProperty2.default)(this, "getComparedFolders", function () {
    return _this.attributes.compared_folders;
  });
  (0, _defineProperty2.default)(this, "setComparedFolders", function (value) {
    _this.attributes.compared_folders = value;
  });
  // string # Associated Remote Server type, if any
  (0, _defineProperty2.default)(this, "getRemoteServerType", function () {
    return _this.attributes.remote_server_type;
  });
  (0, _defineProperty2.default)(this, "setRemoteServerType", function (value) {
    _this.attributes.remote_server_type = value;
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          throw new errors.NotImplementedError('The ExternalEvent object doesn\'t support updates.');
        case 4:
          _context.next = 6;
          return ExternalEvent.create(_this.attributes, _this.options);
        case 6:
          newObject = _context.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context.abrupt("return", true);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
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
_ExternalEvent = ExternalEvent;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `remote_server_type`, `siem_http_destination_id`, `created_at`, `event_type`, `status` or `folder_behavior_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type`, `status`, `folder_behavior_id` or `siem_http_destination_id`. Valid field combinations are `[ event_type, created_at ]`, `[ remote_server_type, created_at ]`, `[ status, created_at ]`, `[ folder_behavior_id, created_at ]`, `[ event_type, status ]` or `[ event_type, status, created_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `remote_server_type`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
(0, _defineProperty2.default)(ExternalEvent, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 4:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 6:
        _context2.next = 8;
        return _Api.default.sendRequest('/external_events', 'GET', params, options);
      case 8:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _ExternalEvent(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(ExternalEvent, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ExternalEvent.list(params, options);
});
// Parameters:
//   id (required) - int64 - External Event ID.
(0, _defineProperty2.default)(ExternalEvent, "find", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(id) {
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
          params.id = id;
          if (params.id) {
            _context3.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context3.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 9:
          _context3.next = 11;
          return _Api.default.sendRequest("/external_events/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 11:
          response = _context3.sent;
          return _context3.abrupt("return", new _ExternalEvent(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ExternalEvent, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _ExternalEvent.find(id, params, options);
});
// Parameters:
//   status (required) - string - Status of event.
//   body (required) - string - Event body
(0, _defineProperty2.default)(ExternalEvent, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (params.status) {
          _context4.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: status');
      case 4:
        if (params.body) {
          _context4.next = 6;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: body');
      case 6:
        if (!(params.status && !(0, _utils.isString)(params.status))) {
          _context4.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: status must be of type String, received ".concat((0, _utils.getType)(params.status)));
      case 8:
        if (!(params.body && !(0, _utils.isString)(params.body))) {
          _context4.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: body must be of type String, received ".concat((0, _utils.getType)(params.body)));
      case 10:
        _context4.next = 12;
        return _Api.default.sendRequest('/external_events', 'POST', params, options);
      case 12:
        response = _context4.sent;
        return _context4.abrupt("return", new _ExternalEvent(response === null || response === void 0 ? void 0 : response.data, options));
      case 14:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
var _default = exports.default = ExternalEvent;
module.exports = ExternalEvent;
module.exports.default = ExternalEvent;