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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  // string # Associated Remote Server type, if any
  (0, _defineProperty2.default)(this, "getRemoteServerType", function () {
    return _this.attributes.remote_server_type;
  });
  (0, _defineProperty2.default)(this, "setRemoteServerType", function (value) {
    _this.attributes.remote_server_type = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new errors.NotImplementedError('The ExternalEvent object doesn\'t support updates.');
    } else {
      var newObject = ExternalEvent.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
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
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[remote_server_type]=desc`). Valid fields are `remote_server_type`, `site_id`, `folder_behavior_id`, `event_type`, `created_at` or `status`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type`, `status` or `folder_behavior_id`. Valid field combinations are `[ event_type, status, created_at ]`, `[ event_type, created_at ]` or `[ status, created_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `remote_server_type`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
(0, _defineProperty2.default)(ExternalEvent, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 4:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 6:
        _context.next = 8;
        return _Api.default.sendRequest("/external_events", 'GET', params, options);
      case 8:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new ExternalEvent(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(ExternalEvent, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return ExternalEvent.list(params, options);
});
// Parameters:
//   id (required) - int64 - External Event ID.
(0, _defineProperty2.default)(ExternalEvent, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
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
          params['id'] = id;
          if (params['id']) {
            _context2.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context2.next = 11;
          return _Api.default.sendRequest("/external_events/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context2.sent;
          return _context2.abrupt("return", new ExternalEvent(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ExternalEvent, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return ExternalEvent.find(id, params, options);
});
// Parameters:
//   status (required) - string - Status of event.
//   body (required) - string - Event body
(0, _defineProperty2.default)(ExternalEvent, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (params['status']) {
          _context3.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: status');
      case 4:
        if (params['body']) {
          _context3.next = 6;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: body');
      case 6:
        if (!(params['status'] && !(0, _utils.isString)(params['status']))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: status must be of type String, received ".concat((0, _utils.getType)(params['status'])));
      case 8:
        if (!(params['body'] && !(0, _utils.isString)(params['body']))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: body must be of type String, received ".concat((0, _utils.getType)(params['body'])));
      case 10:
        _context3.next = 12;
        return _Api.default.sendRequest("/external_events", 'POST', params, options);
      case 12:
        response = _context3.sent;
        return _context3.abrupt("return", new ExternalEvent(response === null || response === void 0 ? void 0 : response.data, options));
      case 14:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = ExternalEvent;
exports.default = _default;