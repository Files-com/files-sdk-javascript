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
var _AutomationRun;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
  // int64 # ID of the immutable Automation version pinned by this run.
  (0, _defineProperty2.default)(this, "getAutomationVersionId", function () {
    return _this.attributes.automation_version_id;
  });
  // int64 # Workspace ID.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  // date-time # Date/time at which cancellation was requested.
  (0, _defineProperty2.default)(this, "getCancelRequestedAt", function () {
    return _this.attributes.cancel_requested_at;
  });
  // date-time # Automation run completion/failure date/time.
  (0, _defineProperty2.default)(this, "getCompletedAt", function () {
    return _this.attributes.completed_at;
  });
  // date-time # Automation run start date/time.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # If set, this automation will be retried at this date/time due to `failure` or `partial_failure`.
  (0, _defineProperty2.default)(this, "getRetryAt", function () {
    return _this.attributes.retry_at;
  });
  // date-time # If set, this Automation run was retried due to `failure` or `partial_failure`.
  (0, _defineProperty2.default)(this, "getRetriedAt", function () {
    return _this.attributes.retried_at;
  });
  // int64 # ID of the run that is or will be retrying this run.
  (0, _defineProperty2.default)(this, "getRetriedInRunId", function () {
    return _this.attributes.retried_in_run_id;
  });
  // int64 # ID of the original run that this run is retrying.
  (0, _defineProperty2.default)(this, "getRetryOfRunId", function () {
    return _this.attributes.retry_of_run_id;
  });
  // int64 # ID of the run whose persisted node outputs this run reused.
  (0, _defineProperty2.default)(this, "getRerunOfRunId", function () {
    return _this.attributes.rerun_of_run_id;
  });
  // string # Node at which this run resumed execution.
  (0, _defineProperty2.default)(this, "getRerunFromNodeId", function () {
    return _this.attributes.rerun_from_node_id;
  });
  // double # Automation run runtime.
  (0, _defineProperty2.default)(this, "getRuntime", function () {
    return _this.attributes.runtime;
  });
  // string # The status of the AutomationRun. One of `queued`, `running`, `success`, `partial_failure`, `failure`, `skipped`, or `canceled`.
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
  // object # Automation definition snapshot pinned by this run. For performance reasons, this is not provided when listing Automation runs.
  (0, _defineProperty2.default)(this, "getDefinition", function () {
    return _this.attributes.definition;
  });
  // object # Status and execution stage for each node in this run. For performance reasons, this is not provided when listing Automation runs.
  (0, _defineProperty2.default)(this, "getNodeStates", function () {
    return _this.attributes.node_states;
  });
  // array(object) # Execution status, timing, and bounded output summaries for each node. For performance reasons, this is not provided when listing Automation runs.
  (0, _defineProperty2.default)(this, "getExecutionNodes", function () {
    return _this.attributes.execution_nodes;
  });
  // string # Link to the run journal artifact.
  (0, _defineProperty2.default)(this, "getJournalUrl", function () {
    return _this.attributes.journal_url;
  });
  // string # Link to status messages log file.
  (0, _defineProperty2.default)(this, "getStatusMessagesUrl", function () {
    return _this.attributes.status_messages_url;
  });
  // Cancel Automation Run
  (0, _defineProperty2.default)(this, "cancel", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          return _Api.default.sendRequest("/automation_runs/".concat(encodeURIComponent(params.id), "/cancel"), 'POST', params, _this.options);
        case 6:
          response = _context.sent;
          return _context.abrupt("return", new AutomationRun(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Re-run Automation from Node
  //
  // Parameters:
  //   node_id (required) - string - Node ID at which execution should resume.
  (0, _defineProperty2.default)(this, "rerun", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
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
          if (!(params.node_id && !(0, _utils.isString)(params.node_id))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: node_id must be of type String, received ".concat((0, _utils.getType)(params.node_id)));
        case 4:
          if (params.id) {
            _context2.next = 6;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 5;
            break;
          }
          params.id = _this.id;
          _context2.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 6:
          if (params.node_id) {
            _context2.next = 8;
            break;
          }
          if (!_this.attributes.node_id) {
            _context2.next = 7;
            break;
          }
          params.node_id = _this.node_id;
          _context2.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: node_id');
        case 8:
          _context2.next = 9;
          return _Api.default.sendRequest("/automation_runs/".concat(encodeURIComponent(params.id), "/rerun"), 'POST', params, _this.options);
        case 9:
          response = _context2.sent;
          return _context2.abrupt("return", new AutomationRun(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 10:
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
_AutomationRun = AutomationRun;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation_id`, `created_at` or `status`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status`, `workspace_id` or `automation_id`. Valid field combinations are `[ workspace_id, status ]`, `[ automation_id, status ]`, `[ workspace_id, automation_id ]` or `[ workspace_id, automation_id, status ]`.
//   automation_id (required) - int64 - ID of the associated Automation.
(0, _defineProperty2.default)(AutomationRun, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
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
        if (params.automation_id) {
          _context3.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: automation_id');
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
        if (!(params.automation_id && !(0, _utils.isInt)(params.automation_id))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: automation_id must be of type Int, received ".concat((0, _utils.getType)(params.automation_id)));
      case 5:
        _context3.next = 6;
        return _Api.default.sendRequest('/automation_runs', 'GET', params, options);
      case 6:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _AutomationRun(obj, options);
        })) || []);
      case 7:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(AutomationRun, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _AutomationRun.list(params, options);
});
// Parameters:
//   id (required) - int64 - Automation Run ID.
(0, _defineProperty2.default)(AutomationRun, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/automation_runs/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context4.sent;
          return _context4.abrupt("return", new _AutomationRun(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(AutomationRun, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _AutomationRun.find(id, params, options);
});
// Parameters:
//   id (required) - int64 - Automation Run ID.
//   node_id (required) - string - Node ID from the pinned Automation definition.
(0, _defineProperty2.default)(AutomationRun, "findNode", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      AutomationExecutionNode,
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
          if (params.node_id) {
            _context5.next = 3;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: node_id');
        case 3:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 4:
          if (!(params.node_id && !(0, _utils.isString)(params.node_id))) {
            _context5.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: node_id must be of type String, received ".concat((0, _utils.getType)(params.node_id)));
        case 5:
          _context5.next = 6;
          return _Api.default.sendRequest("/automation_runs/".concat(encodeURIComponent(params.id), "/node"), 'GET', params, options);
        case 6:
          response = _context5.sent;
          AutomationExecutionNode = require('./AutomationExecutionNode.js').default;
          return _context5.abrupt("return", new AutomationExecutionNode(response === null || response === void 0 ? void 0 : response.data, options));
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x2) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = exports.default = AutomationRun;
module.exports = AutomationRun;
module.exports.default = AutomationRun;