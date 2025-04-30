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
  // string # Files Agent API Token
  (0, _defineProperty2.default)(this, "getApiToken", function () {
    return _this.attributes.api_token;
  });
  // int64 # Incoming port for files agent connections
  (0, _defineProperty2.default)(this, "getPort", function () {
    return _this.attributes.port;
  });
  // string
  (0, _defineProperty2.default)(this, "getHostname", function () {
    return _this.attributes.hostname;
  });
  // string # public key
  (0, _defineProperty2.default)(this, "getPublicKey", function () {
    return _this.attributes.public_key;
  });
  // string # either running or shutdown
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  // string
  (0, _defineProperty2.default)(this, "getServerHostKey", function () {
    return _this.attributes.server_host_key;
  });
  // string # agent config version
  (0, _defineProperty2.default)(this, "getConfigVersion", function () {
    return _this.attributes.config_version;
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
var _default = exports.default = RemoteServerConfigurationFile;
module.exports = RemoteServerConfigurationFile;
module.exports.default = RemoteServerConfigurationFile;