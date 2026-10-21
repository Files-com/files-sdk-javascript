"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * Class AutomationExecutionNode
 */
var AutomationExecutionNode = /*#__PURE__*/(0, _createClass2.default)(function AutomationExecutionNode() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, AutomationExecutionNode);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # Node ID from the pinned Automation definition.
  (0, _defineProperty2.default)(this, "getNodeId", function () {
    return _this.attributes.node_id;
  });
  // string # Node type.
  (0, _defineProperty2.default)(this, "getNodeType", function () {
    return _this.attributes.node_type;
  });
  // string # Node status.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // string # Current node execution stage.
  (0, _defineProperty2.default)(this, "getRunStage", function () {
    return _this.attributes.run_stage;
  });
  // boolean # Whether this node reused persisted output from an earlier run.
  (0, _defineProperty2.default)(this, "getReused", function () {
    return _this.attributes.reused;
  });
  // int64 # Count of successful operations in this node.
  (0, _defineProperty2.default)(this, "getSuccessfulOperations", function () {
    return _this.attributes.successful_operations;
  });
  // int64 # Count of failed operations in this node.
  (0, _defineProperty2.default)(this, "getFailedOperations", function () {
    return _this.attributes.failed_operations;
  });
  // date-time # When this node started.
  (0, _defineProperty2.default)(this, "getStartedAt", function () {
    return _this.attributes.started_at;
  });
  // date-time # When this node completed.
  (0, _defineProperty2.default)(this, "getCompletedAt", function () {
    return _this.attributes.completed_at;
  });
  // int64 # Node runtime in milliseconds.
  (0, _defineProperty2.default)(this, "getDurationMs", function () {
    return _this.attributes.duration_ms;
  });
  // array(object) # Ordered inbound edge references.
  (0, _defineProperty2.default)(this, "getInputs", function () {
    return _this.attributes.inputs;
  });
  // object # Output counts, item kinds, and typed-error summaries by outlet.
  (0, _defineProperty2.default)(this, "getOutputs", function () {
    return _this.attributes.outputs;
  });
  // object # Materialized input items currently available, grouped by inlet.
  (0, _defineProperty2.default)(this, "getInputItems", function () {
    return _this.attributes.input_items;
  });
  // object # Materialized output items grouped by outlet.
  (0, _defineProperty2.default)(this, "getOutputItems", function () {
    return _this.attributes.output_items;
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
var _default = exports.default = AutomationExecutionNode;
module.exports = AutomationExecutionNode;
module.exports.default = AutomationExecutionNode;