"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Errors = require("./Errors");
var _FilesClient = _interopRequireDefault(require("./FilesClient"));
var _Logger = require("./Logger");
var _Transfer = require("./Transfer");
var _utils = require("./utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var endpointPrefix = '/api/rest/v1';
var version = '2.0.2';

// The SDK's declared defaults for the settings of a request, its logging included. The global settings start from them,
// and so does every client, from new FilesClient() or Files.createClient(), whatever the global settings have become
// since. Only a client has agent settings: a call without one takes its agent from its own options.
//
// An API request is retried after 100 ms, then 200 and 400 ms. Each attempt has one budget for its response, headers
// and body together: 110 seconds, so that 30 to connect and 80 to read always fit within it.
var defaults = Object.freeze({
  agent: undefined,
  apiKey: undefined,
  autoPaginate: true,
  baseUrl: 'https://app.files.com',
  debugRequest: false,
  debugResponseHeaders: false,
  fetch: undefined,
  followRegionMismatch: true,
  getAgentForUrl: undefined,
  language: null,
  logger: null,
  logLevel: _Logger.LogLevel.INFO,
  maxNetworkRetries: 3,
  maxNetworkRetryDelay: 1.5,
  minNetworkRetryDelay: 0.1,
  networkTimeout: 110.0,
  sessionId: null,
  trustRegionHost: undefined,
  userAgent: "Files.com JavaScript SDK v".concat(version),
  workspaceId: null
});
var apiKey = defaults.apiKey,
  autoPaginate = defaults.autoPaginate,
  baseUrl = defaults.baseUrl,
  debugRequest = defaults.debugRequest,
  debugResponseHeaders = defaults.debugResponseHeaders,
  fetchSetting = defaults.fetch,
  followRegionMismatch = defaults.followRegionMismatch,
  language = defaults.language,
  logger = defaults.logger,
  logLevel = defaults.logLevel,
  maxNetworkRetries = defaults.maxNetworkRetries,
  maxNetworkRetryDelay = defaults.maxNetworkRetryDelay,
  minNetworkRetryDelay = defaults.minNetworkRetryDelay,
  networkTimeout = defaults.networkTimeout,
  sessionId = defaults.sessionId,
  trustRegionHost = defaults.trustRegionHost,
  userAgent = defaults.userAgent,
  workspaceId = defaults.workspaceId;
var loggerMethods = ['error', 'warn', 'info', 'debug'];

// An application logger is any object with error, warn, info and debug methods; null or undefined means the console.
var checkLogger = function checkLogger(value) {
  if (value !== null && value !== undefined && !loggerMethods.every(function (method) {
    return typeof value[method] === 'function';
  })) {
    throw new _Errors.ConfigurationError("Logger must provide ".concat(loggerMethods.join(', '), " methods"));
  }
};

// trustRegionHost is a function that trusts a host outside Files.com for a lockout region mismatch (see Api.js), or
// null or undefined for none.
var checkTrustRegionHost = function checkTrustRegionHost(value) {
  if (value !== null && value !== undefined && typeof value !== 'function') {
    throw new _Errors.ConfigurationError('trustRegionHost must be a function');
  }
};

// fetch is the HTTP client that sends requests in place of the SDK's own, a function like the standard fetch() (see
// Api.js), or null or undefined for the SDK's own.
var checkFetch = function checkFetch(value) {
  if (value !== null && value !== undefined && typeof value !== 'function') {
    throw new _Errors.ConfigurationError('fetch must be a function');
  }
};
var Files = /*#__PURE__*/(0, _createClass2.default)(function Files() {
  (0, _classCallCheck2.default)(this, Files);
});
// A client with Files.com settings of its own: the same as new FilesClient(config).
(0, _defineProperty2.default)(Files, "createClient", function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _FilesClient.default(config);
});
// What pauses and resumes transfers given it, and the scope in which the transfers of one job share their learning and
// budgets (see Transfer.js).
(0, _defineProperty2.default)(Files, "TransferControl", _Transfer.TransferControl);
(0, _defineProperty2.default)(Files, "TransferJob", _Transfer.TransferJob);
// Not public: the settings of a client made with config, by new FilesClient(config) or Files.createClient(config):
// the declared defaults, with config's settings and headers copied over them. They never come from the global
// settings below, so later changes to them, or to config, do not change the client.
(0, _defineProperty2.default)(Files, "_clientSettings", function (config) {
  checkLogger(config === null || config === void 0 ? void 0 : config.logger);
  checkTrustRegionHost(config === null || config === void 0 ? void 0 : config.trustRegionHost);
  checkFetch(config === null || config === void 0 ? void 0 : config.fetch);
  if (!(0, _utils.isObject)(config)) {
    throw new _Errors.ConfigurationError('Client settings must be an object');
  }
  Object.keys(config).forEach(function (name) {
    if (name !== 'headers' && !Object.prototype.hasOwnProperty.call(defaults, name)) {
      throw new _Errors.ConfigurationError("Unknown client setting: ".concat(name));
    }
  });

  // As Files.configureNetwork() does, a setting given as undefined keeps its default. The application logger, like a
  // header value, is kept as given, not copied.
  var given = Object.fromEntries(Object.entries(config).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      value = _ref2[1];
    return value !== undefined;
  }));
  return _objectSpread(_objectSpread(_objectSpread({}, defaults), given), {}, {
    headers: config.headers
  });
});
// The global settings as they are now, every one of them, as a client of their own that later changes to them do not
// change. They are the client's settings, not a config, so each is kept exactly, undefined included. The application
// logger is used, not copied, and, as the global settings have none, the client has no agent settings. Not public: an
// item iterator made without a client requests its pages with one (see Api._iterate).
(0, _defineProperty2.default)(Files, "_currentSettings", function () {
  return _FilesClient.default._withSettings({
    apiKey: apiKey,
    autoPaginate: autoPaginate,
    baseUrl: baseUrl,
    debugRequest: debugRequest,
    debugResponseHeaders: debugResponseHeaders,
    fetch: fetchSetting,
    followRegionMismatch: followRegionMismatch,
    language: language,
    logger: logger,
    logLevel: logLevel,
    maxNetworkRetries: maxNetworkRetries,
    maxNetworkRetryDelay: maxNetworkRetryDelay,
    minNetworkRetryDelay: minNetworkRetryDelay,
    networkTimeout: networkTimeout,
    sessionId: sessionId,
    trustRegionHost: trustRegionHost,
    userAgent: userAgent,
    workspaceId: workspaceId
  });
});
(0, _defineProperty2.default)(Files, "setUserAgent", function (value) {
  userAgent = value;
});
(0, _defineProperty2.default)(Files, "getUserAgent", function () {
  return userAgent;
});
(0, _defineProperty2.default)(Files, "setApiKey", function (value) {
  apiKey = value;
});
(0, _defineProperty2.default)(Files, "getApiKey", function () {
  return apiKey;
});
(0, _defineProperty2.default)(Files, "setBaseUrl", function (value) {
  baseUrl = value;
});
(0, _defineProperty2.default)(Files, "getBaseUrl", function () {
  return baseUrl;
});
(0, _defineProperty2.default)(Files, "setSessionId", function (value) {
  sessionId = value;
});
(0, _defineProperty2.default)(Files, "getSessionId", function () {
  return sessionId;
});
(0, _defineProperty2.default)(Files, "setWorkspaceId", function (value) {
  workspaceId = value;
});
(0, _defineProperty2.default)(Files, "getWorkspaceId", function () {
  return workspaceId;
});
(0, _defineProperty2.default)(Files, "getLanguage", function () {
  return language;
});
(0, _defineProperty2.default)(Files, "setLanguage", function (value) {
  language = value;
});
(0, _defineProperty2.default)(Files, "getEndpointPrefix", function () {
  return endpointPrefix;
});
(0, _defineProperty2.default)(Files, "setLogLevel", function (value) {
  logLevel = value;
});
(0, _defineProperty2.default)(Files, "getLogLevel", function () {
  return logLevel;
});
// Sends SDK log messages to an application logger with error, warn, info and debug methods instead of the console;
// null restores the console. The log level still decides which messages are sent.
(0, _defineProperty2.default)(Files, "setLogger", function (value) {
  checkLogger(value);
  logger = value !== null && value !== void 0 ? value : null;
});
(0, _defineProperty2.default)(Files, "getLogger", function () {
  return logger;
});
(0, _defineProperty2.default)(Files, "configureDebugging", function (options) {
  if (typeof options.debugRequest !== 'undefined') {
    debugRequest = options.debugRequest;
  }
  if (typeof options.debugResponseHeaders !== 'undefined') {
    debugResponseHeaders = options.debugResponseHeaders;
  }
});
(0, _defineProperty2.default)(Files, "shouldDebugRequest", function () {
  return debugRequest;
});
(0, _defineProperty2.default)(Files, "shouldDebugResponseHeaders", function () {
  return debugResponseHeaders;
});
(0, _defineProperty2.default)(Files, "configureNetwork", function (options) {
  if (typeof options.maxNetworkRetries !== 'undefined') {
    maxNetworkRetries = options.maxNetworkRetries;
  }
  if (typeof options.minNetworkRetryDelay !== 'undefined') {
    minNetworkRetryDelay = options.minNetworkRetryDelay;
  }
  if (typeof options.maxNetworkRetryDelay !== 'undefined') {
    maxNetworkRetryDelay = options.maxNetworkRetryDelay;
  }
  if (typeof options.networkTimeout !== 'undefined') {
    networkTimeout = options.networkTimeout;
  }
  if (typeof options.autoPaginate !== 'undefined') {
    autoPaginate = options.autoPaginate;
  }
  if (typeof options.followRegionMismatch !== 'undefined') {
    followRegionMismatch = options.followRegionMismatch;
  }
  if (typeof options.trustRegionHost !== 'undefined') {
    checkTrustRegionHost(options.trustRegionHost);
    trustRegionHost = options.trustRegionHost;
  }
  if (typeof options.fetch !== 'undefined') {
    checkFetch(options.fetch);
    fetchSetting = options.fetch;
  }
});
(0, _defineProperty2.default)(Files, "getMaxNetworkRetries", function () {
  return maxNetworkRetries;
});
(0, _defineProperty2.default)(Files, "getMinNetworkRetryDelay", function () {
  return minNetworkRetryDelay;
});
(0, _defineProperty2.default)(Files, "getMaxNetworkRetryDelay", function () {
  return maxNetworkRetryDelay;
});
(0, _defineProperty2.default)(Files, "getNetworkTimeout", function () {
  return networkTimeout;
});
(0, _defineProperty2.default)(Files, "getAutoPaginate", function () {
  return autoPaginate;
});
(0, _defineProperty2.default)(Files, "getFollowRegionMismatch", function () {
  return followRegionMismatch;
});
(0, _defineProperty2.default)(Files, "getTrustRegionHost", function () {
  return trustRegionHost;
});
(0, _defineProperty2.default)(Files, "getFetch", function () {
  return fetchSetting;
});
var _default = exports.default = Files;
module.exports = Files;
module.exports.default = Files;