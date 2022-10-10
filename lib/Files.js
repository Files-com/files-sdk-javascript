"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Logger = require("./Logger");
var endpointPrefix = '/api/rest/v1';
var apiKey;
var baseUrl = 'https://app.files.com';
var sessionId = null;
var userAgent = 'Files.com JavaScript SDK v1.0';
var logLevel = _Logger.LogLevel.INFO;
var debugRequest = false;
var debugResponseHeaders = false;
var maxNetworkRetries = 3;
var minNetworkRetryDelay = 0.5;
var maxNetworkRetryDelay = 1.5;
var networkTimeout = 30.0;
var autoPaginate = true;
var Files = /*#__PURE__*/(0, _createClass2.default)(function Files() {
  (0, _classCallCheck2.default)(this, Files);
});
(0, _defineProperty2.default)(Files, "setUserAgent", function (value) {
  return userAgent = value;
});
(0, _defineProperty2.default)(Files, "getUserAgent", function () {
  return userAgent;
});
(0, _defineProperty2.default)(Files, "setApiKey", function (value) {
  return apiKey = value;
});
(0, _defineProperty2.default)(Files, "getApiKey", function () {
  return apiKey;
});
(0, _defineProperty2.default)(Files, "setBaseUrl", function (value) {
  return baseUrl = value;
});
(0, _defineProperty2.default)(Files, "getBaseUrl", function () {
  return baseUrl;
});
(0, _defineProperty2.default)(Files, "setSessionId", function (value) {
  return sessionId = value;
});
(0, _defineProperty2.default)(Files, "getSessionId", function () {
  return sessionId;
});
(0, _defineProperty2.default)(Files, "getEndpointPrefix", function () {
  return endpointPrefix;
});
(0, _defineProperty2.default)(Files, "setLogLevel", function (value) {
  return logLevel = value;
});
(0, _defineProperty2.default)(Files, "getLogLevel", function () {
  return logLevel;
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
var _default = Files;
exports.default = _default;