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
var _ExpectationEvaluation;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class ExpectationEvaluation
 */
var ExpectationEvaluation = /*#__PURE__*/(0, _createClass2.default)(function ExpectationEvaluation() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ExpectationEvaluation);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # ExpectationEvaluation ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // int64 # Workspace ID. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  // int64 # Expectation ID.
  (0, _defineProperty2.default)(this, "getExpectationId", function () {
    return _this.attributes.expectation_id;
  });
  // string # Evaluation status.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // string # How the evaluation window was opened.
  (0, _defineProperty2.default)(this, "getOpenedVia", function () {
    return _this.attributes.opened_via;
  });
  // date-time # When the evaluation row was opened.
  (0, _defineProperty2.default)(this, "getOpenedAt", function () {
    return _this.attributes.opened_at;
  });
  // date-time # Logical start of the candidate window.
  (0, _defineProperty2.default)(this, "getWindowStartAt", function () {
    return _this.attributes.window_start_at;
  });
  // date-time # Actual candidate cutoff boundary for the window.
  (0, _defineProperty2.default)(this, "getWindowEndAt", function () {
    return _this.attributes.window_end_at;
  });
  // date-time # Logical due boundary for schedule-driven windows.
  (0, _defineProperty2.default)(this, "getDeadlineAt", function () {
    return _this.attributes.deadline_at;
  });
  // date-time # Logical cutoff for late acceptance, when present.
  (0, _defineProperty2.default)(this, "getLateAcceptanceCutoffAt", function () {
    return _this.attributes.late_acceptance_cutoff_at;
  });
  // date-time # Hard stop after which the window may not remain open.
  (0, _defineProperty2.default)(this, "getHardCloseAt", function () {
    return _this.attributes.hard_close_at;
  });
  // date-time # When the evaluation row was finalized.
  (0, _defineProperty2.default)(this, "getClosedAt", function () {
    return _this.attributes.closed_at;
  });
  // array(object) # Captured evidence for files that matched the window.
  (0, _defineProperty2.default)(this, "getMatchedFiles", function () {
    return _this.attributes.matched_files;
  });
  // array(object) # Captured evidence for required files that were missing.
  (0, _defineProperty2.default)(this, "getMissingFiles", function () {
    return _this.attributes.missing_files;
  });
  // array(string) # Captured criteria failures for the window.
  (0, _defineProperty2.default)(this, "getCriteriaErrors", function () {
    return _this.attributes.criteria_errors;
  });
  // object # Compact evaluator summary payload.
  (0, _defineProperty2.default)(this, "getSummary", function () {
    return _this.attributes.summary;
  });
  // date-time # Creation time.
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # Last update time.
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
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
_ExpectationEvaluation = ExpectationEvaluation;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `created_at` or `expectation_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `expectation_id` and `workspace_id`. Valid field combinations are `[ workspace_id, expectation_id ]`.
(0, _defineProperty2.default)(ExpectationEvaluation, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;
  var params,
    options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context.next = 3;
        return _Api.default.sendRequest('/expectation_evaluations', 'GET', params, options);
      case 3:
        response = _context.sent;
        return _context.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _ExpectationEvaluation(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(ExpectationEvaluation, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ExpectationEvaluation.list(params, options);
});
// Parameters:
//   id (required) - int64 - Expectation Evaluation ID.
(0, _defineProperty2.default)(ExpectationEvaluation, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
    var params,
      options,
      response,
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
          params.id = id;
          if (params.id) {
            _context2.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context2.next = 4;
          return _Api.default.sendRequest("/expectation_evaluations/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", new _ExpectationEvaluation(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ExpectationEvaluation, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _ExpectationEvaluation.find(id, params, options);
});
var _default = exports.default = ExpectationEvaluation;
module.exports = ExpectationEvaluation;
module.exports.default = ExpectationEvaluation;