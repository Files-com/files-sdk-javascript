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
var _AutomationRun;
/* eslint-disable no-unused-vars */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class AutomationRun
 */
var AutomationRun = /*#__PURE__*/(0, _createClass2.default)(function AutomationRun() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, AutomationRun);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # ID.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // int64 # ID of the associated Automation.
  (0, _defineProperty2.default)(this, "getAutomationId", function () {
    return _this.attributes.automation_id;
  });
  // date-time # Automation run completion/failure date/time.
  (0, _defineProperty2.default)(this, "getCompletedAt", function () {
    return _this.attributes.completed_at;
  });
  // date-time # Automation run start date/time.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // double # Automation run runtime.
  (0, _defineProperty2.default)(this, "getRuntime", function () {
    return _this.attributes.runtime;
  });
  // string # The success status of the AutomationRun. One of `running`, `success`, `partial_failure`, or `failure`.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // int64 # Count of successful operations.
  (0, _defineProperty2.default)(this, "getSuccessfulOperations", function () {
    return _this.attributes.successful_operations;
  });
  // int64 # Count of failed operations.
  (0, _defineProperty2.default)(this, "getFailedOperations", function () {
    return _this.attributes.failed_operations;
  });
  // string # Link to status messages log file.
  (0, _defineProperty2.default)(this, "getStatusMessagesUrl", function () {
    return _this.attributes.status_messages_url;
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
_AutomationRun = AutomationRun;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation_id`, `created_at` or `status`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status` and `automation_id`. Valid field combinations are `[ status, automation_id ]`.
//   automation_id (required) - int64 - ID of the associated Automation.
(0, _defineProperty2.default)(AutomationRun, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
        if (params.automation_id) {
          _context.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: automation_id');
      case 4:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 6:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 8:
        if (!(params.automation_id && !(0, _utils.isInt)(params.automation_id))) {
          _context.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: automation_id must be of type Int, received ".concat((0, _utils.getType)(params.automation_id)));
      case 10:
        _context.next = 12;
        return _Api.default.sendRequest('/automation_runs', 'GET', params, options);
      case 12:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _AutomationRun(obj, options);
        })) || []);
      case 14:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(AutomationRun, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _AutomationRun.list(params, options);
});
// Parameters:
//   id (required) - int64 - Automation Run ID.
(0, _defineProperty2.default)(AutomationRun, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
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
          params.id = id;
          if (params.id) {
            _context2.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 9:
          _context2.next = 11;
          return _Api.default.sendRequest("/automation_runs/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 11:
          response = _context2.sent;
          return _context2.abrupt("return", new _AutomationRun(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(AutomationRun, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _AutomationRun.find(id, params, options);
});
// Parameters:
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation_id`, `created_at` or `status`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status` and `automation_id`. Valid field combinations are `[ status, automation_id ]`.
//   automation_id (required) - int64 - ID of the associated Automation.
(0, _defineProperty2.default)(AutomationRun, "createExport", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data2;
  var params,
    options,
    response,
    Export,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (params.automation_id) {
          _context3.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: automation_id');
      case 4:
        if (!(params.automation_id && !(0, _utils.isInt)(params.automation_id))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: automation_id must be of type Int, received ".concat((0, _utils.getType)(params.automation_id)));
      case 6:
        _context3.next = 8;
        return _Api.default.sendRequest('/automation_runs/create_export', 'POST', params, options);
      case 8:
        response = _context3.sent;
        Export = require('./Export.js').default;
        return _context3.abrupt("return", (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
          return new Export(obj, options);
        })) || []);
      case 11:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = AutomationRun;
module.exports = AutomationRun;
module.exports.default = AutomationRun;