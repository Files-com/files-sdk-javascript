"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * Class Action
 */
var Action = /*#__PURE__*/(0, _createClass2.default)(function Action() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Action);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
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
var _default = exports.default = Action;
module.exports = Action;
module.exports.default = Action;