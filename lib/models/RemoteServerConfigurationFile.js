"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
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

/**
 * Class RemoteServerConfigurationFile
 */
var RemoteServerConfigurationFile = /*#__PURE__*/(0, _createClass2.default)(function RemoteServerConfigurationFile() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, RemoteServerConfigurationFile);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # The remote server ID of the agent
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // string # The permission set for the agent ['read_write', 'read_only', 'write_only']
  (0, _defineProperty2.default)(this, "getPermissionSet", function () {
    return _this.attributes.permission_set;
  });
  // string # The private key for the agent
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  // string # Files.com subdomain site name
  (0, _defineProperty2.default)(this, "getSubdomain", function () {
    return _this.attributes.subdomain;
  });
  // string # The root directory for the agent
  (0, _defineProperty2.default)(this, "getRoot", function () {
    return _this.attributes.root;
  });
  // string # Optional customer-facing name for this Agent installation
  (0, _defineProperty2.default)(this, "getNodeName", function () {
    return _this.attributes.node_name;
  });
  // boolean # Follow symlinks when traversing directories
  (0, _defineProperty2.default)(this, "getFollowLinks", function () {
    return _this.attributes.follow_links;
  });
  // string # Preferred network protocol ['udp', 'tcp'] (default udp)
  (0, _defineProperty2.default)(this, "getPreferProtocol", function () {
    return _this.attributes.prefer_protocol;
  });
  // string # DNS lookup method ['auto','doh','system'] (default auto)
  (0, _defineProperty2.default)(this, "getDns", function () {
    return _this.attributes.dns;
  });
  // boolean # Proxy all outbound traffic through files.com proxy server
  (0, _defineProperty2.default)(this, "getProxyAllOutbound", function () {
    return _this.attributes.proxy_all_outbound;
  });
  // string # Custom site endpoint URL
  (0, _defineProperty2.default)(this, "getEndpointOverride", function () {
    return _this.attributes.endpoint_override;
  });
  // string # Log file name and location
  (0, _defineProperty2.default)(this, "getLogFile", function () {
    return _this.attributes.log_file;
  });
  // string # Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal'] (default info)
  (0, _defineProperty2.default)(this, "getLogLevel", function () {
    return _this.attributes.log_level;
  });
  // int64 # Log route for agent logs. (default 5)
  (0, _defineProperty2.default)(this, "getLogRotateNum", function () {
    return _this.attributes.log_rotate_num;
  });
  // int64 # Log route size in MB for agent logs. (default 20)
  (0, _defineProperty2.default)(this, "getLogRotateSize", function () {
    return _this.attributes.log_rotate_size;
  });
  // int64 # Maximum number of concurrent jobs (default 500)
  (0, _defineProperty2.default)(this, "getOverrideMaxConcurrentJobs", function () {
    return _this.attributes.override_max_concurrent_jobs;
  });
  // int64 # Graceful shutdown timeout in seconds (default 15)
  (0, _defineProperty2.default)(this, "getGracefulShutdownTimeout", function () {
    return _this.attributes.graceful_shutdown_timeout;
  });
  // string # File transfer (upload/download) rate limit
  //  `<limit>-<period>`, with the given periods:
  // * 'S': second
  // * 'M': minute
  // * 'H': hour
  // * 'D': day
  // Examples:
  // * 5 requests/second: '5-S'
  // * 10 requests/minute: '10-M'
  // * 1000 requests/hour: '1000-H'
  // * 2000 requests/day: '2000-D'
  (0, _defineProperty2.default)(this, "getTransferRateLimit", function () {
    return _this.attributes.transfer_rate_limit;
  });
  // string # Auto update policy ['manual_trigger', 'critical_only', 'always', 'never'] (default always)
  (0, _defineProperty2.default)(this, "getAutoUpdatePolicy", function () {
    return _this.attributes.auto_update_policy;
  });
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
var _default = exports.default = RemoteServerConfigurationFile;
module.exports = RemoteServerConfigurationFile;
module.exports.default = RemoteServerConfigurationFile;