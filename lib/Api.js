"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
var _Files = _interopRequireDefault(require("./Files"));
var errors = _interopRequireWildcard(require("./Errors"));
var _Logger = _interopRequireDefault(require("./Logger"));
var _utils = require("./utils");
var _Api;
var _excluded = ["timeoutSecs"],
  _excluded2 = ["getAgentForUrl"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var withTimeout = function withTimeout(promise, timeoutSecs) {
  var timeoutId;
  return timeoutSecs <= 0 ? promise : Promise.race([promise, new Promise(function (_, reject) {
    timeoutId = setTimeout(function () {
      return reject(new errors.FilesError('Request timed out'));
    }, timeoutSecs * 1000);
  })]).finally(function () {
    return clearTimeout(timeoutId);
  });
};
var FILES_AUTH_HEADERS = ['X-FilesAPI-Key', 'X-FilesAPI-Auth', 'X-Files-Workspace-Id'];
var NODE_FETCH_SENSITIVE_HEADERS = ['authorization', 'www-authenticate', 'cookie', 'cookie2'];
var REDIRECT_STATUSES = [301, 302, 303, 307, 308];
var MAX_REDIRECTS = 20;
var withoutHeaders = function withoutHeaders(headers, names) {
  var normalizedNames = names.map(function (name) {
    return name.toLowerCase();
  });
  return Object.fromEntries(Object.entries(headers || {}).filter(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
      name = _ref2[0];
    return !normalizedNames.includes(name.toLowerCase());
  }));
};
var isDomainOrSubdomain = function isDomainOrSubdomain(originalUrl, destinationUrl) {
  var originalHostname = new URL(originalUrl).hostname;
  var destinationHostname = new URL(destinationUrl).hostname;
  return originalHostname === destinationHostname || destinationHostname.endsWith(".".concat(originalHostname));
};
var isSameProtocol = function isSameProtocol(firstUrl, secondUrl) {
  return new URL(firstUrl).protocol === new URL(secondUrl).protocol;
};
var drainResponse = function drainResponse(response) {
  if (response.body && typeof response.body.resume === 'function') {
    response.body.resume();
  }
};
var _fetchWithRedirects = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(url, options, getAgentForUrl) {
    var _options$follow;
    var redirectCount,
      agent,
      redirectMode,
      response,
      location,
      maxRedirects,
      redirectUrl,
      redirectedHeaders,
      redirectedOptions,
      method,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          redirectCount = _args.length > 3 && _args[3] !== undefined ? _args[3] : 0;
          agent = (getAgentForUrl === null || getAgentForUrl === void 0 ? void 0 : getAgentForUrl(url)) || options.agent || options.httpsAgent || options.httpAgent;
          redirectMode = options.redirect || 'follow';
          _context.next = 1;
          return (0, _crossFetch.default)(url, _objectSpread(_objectSpread({}, options), {}, {
            agent: agent,
            redirect: redirectMode === 'follow' ? 'manual' : redirectMode
          }));
        case 1:
          response = _context.sent;
          location = response.headers.get('location');
          if (!(redirectMode !== 'follow' || !REDIRECT_STATUSES.includes(response.status) || !location)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", response);
        case 2:
          maxRedirects = (_options$follow = options.follow) !== null && _options$follow !== void 0 ? _options$follow : MAX_REDIRECTS;
          if (!(redirectCount >= maxRedirects)) {
            _context.next = 3;
            break;
          }
          drainResponse(response);
          throw new errors.FilesError("maximum redirect reached at: ".concat(url));
        case 3:
          redirectUrl = new URL(location, url).toString();
          redirectedHeaders = new URL(url).origin === new URL(redirectUrl).origin ? options.headers : withoutHeaders(options.headers, FILES_AUTH_HEADERS);
          if (!isDomainOrSubdomain(url, redirectUrl) || !isSameProtocol(url, redirectUrl)) {
            redirectedHeaders = withoutHeaders(redirectedHeaders, NODE_FETCH_SENSITIVE_HEADERS);
          }
          redirectedOptions = _objectSpread(_objectSpread({}, options), {}, {
            headers: redirectedHeaders
          });
          method = (redirectedOptions.method || 'GET').toUpperCase();
          if (!(response.status !== 303 && redirectedOptions.body && typeof redirectedOptions.body.pipe === 'function')) {
            _context.next = 4;
            break;
          }
          drainResponse(response);
          throw new errors.FilesError('Cannot follow redirect with body being a readable stream');
        case 4:
          if (response.status === 303 || [301, 302].includes(response.status) && method === 'POST') {
            redirectedOptions.method = 'GET';
            delete redirectedOptions.body;
            redirectedOptions.headers = withoutHeaders(redirectedOptions.headers, ['content-length']);
          }
          drainResponse(response);
          return _context.abrupt("return", _fetchWithRedirects(redirectUrl, redirectedOptions, getAgentForUrl, redirectCount + 1));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchWithRedirects(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
var _fetchWithRetry = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(url, options) {
    var retries,
      getAgentForUrl,
      maxRetries,
      minRetryDelaySecs,
      maxRetryDelaySecs,
      timeoutSecs,
      requestOptions,
      nextRetries,
      delaySecs,
      _args2 = arguments,
      _t;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          retries = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 0;
          getAgentForUrl = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : null;
          maxRetries = _Files.default.getMaxNetworkRetries();
          minRetryDelaySecs = _Files.default.getMinNetworkRetryDelay();
          maxRetryDelaySecs = _Files.default.getMaxNetworkRetryDelay();
          _context2.prev = 1;
          timeoutSecs = options.timeoutSecs, requestOptions = (0, _objectWithoutProperties2.default)(options, _excluded);
          _context2.next = 2;
          return withTimeout(_fetchWithRedirects(url, requestOptions, getAgentForUrl), timeoutSecs);
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
          _context2.prev = 3;
          _t = _context2["catch"](1);
          _Logger.default.info("Request #".concat(retries + 1, " failed"));
          _Logger.default.debug("Request #".concat(retries + 1, " failed: ").concat(_t.message));
          if (!(retries >= maxRetries)) {
            _context2.next = 4;
            break;
          }
          throw _t;
        case 4:
          nextRetries = retries + 1;
          _Logger.default.info("Retrying request (retry ".concat(nextRetries, " of ").concat(maxRetries, ")"));
          delaySecs = Math.min(minRetryDelaySecs * Math.pow(2, retries), maxRetryDelaySecs); // exponential backoff
          _context2.next = 5;
          return new Promise(function (resolve) {
            setTimeout(resolve, delaySecs * 1000);
          });
        case 5:
          return _context2.abrupt("return", _fetchWithRetry(url, options, nextRetries, getAgentForUrl));
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return function fetchWithRetry(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var Api = /*#__PURE__*/(0, _createClass2.default)(function Api() {
  (0, _classCallCheck2.default)(this, Api);
});
_Api = Api;
(0, _defineProperty2.default)(Api, "_sendVerbatim", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(path, verb, optionsRaw) {
    var _ref6, getAgentForUrl, options, isExternal, baseUrl, url, response, headers, contentType, data, normalizedResponse, _t2;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _ref6 = optionsRaw || {}, getAgentForUrl = _ref6.getAgentForUrl, options = (0, _objectWithoutProperties2.default)(_ref6, _excluded2);
          isExternal = /^[a-zA-Z]+:\/\//.test(path);
          baseUrl = _Files.default.getBaseUrl();
          if (!(!isExternal && !baseUrl)) {
            _context3.next = 1;
            break;
          }
          throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it');
        case 1:
          url = isExternal ? path : "".concat(baseUrl).concat(_Files.default.getEndpointPrefix()).concat(path);
          _Logger.default.debug("Sending request: ".concat(verb, " ").concat(url));
          _Logger.default.debug('Sending options:', _objectSpread({
            method: verb
          }, options));
          _context3.prev = 2;
          _context3.next = 3;
          return _fetchWithRetry(url, _objectSpread({
            method: verb,
            timeoutSecs: _Files.default.getNetworkTimeout()
          }, options), 0, getAgentForUrl);
        case 3:
          response = _context3.sent;
          headers = Object.fromEntries(response.headers.entries());
          _Logger.default.debug("Status: ".concat(response.status, " ").concat(response.statusText));
          if (_Files.default.shouldDebugResponseHeaders()) {
            _Logger.default.debug('Response Headers: ');
            _Logger.default.debug(headers);
          }
          contentType = headers['content-type'] || '';
          if (!contentType.includes('application/json')) {
            _context3.next = 7;
            break;
          }
          if (!(headers['content-length'] === '0')) {
            _context3.next = 4;
            break;
          }
          data = response.body;
          _context3.next = 6;
          break;
        case 4:
          _context3.next = 5;
          return response.json();
        case 5:
          data = _context3.sent;
        case 6:
          _context3.next = 12;
          break;
        case 7:
          if (!contentType.includes('text/')) {
            _context3.next = 9;
            break;
          }
          _context3.next = 8;
          return response.text();
        case 8:
          data = _context3.sent;
          _context3.next = 12;
          break;
        case 9:
          if (!contentType.includes('multipart/form-data')) {
            _context3.next = 11;
            break;
          }
          _context3.next = 10;
          return response.formData();
        case 10:
          data = _context3.sent;
          _context3.next = 12;
          break;
        case 11:
          data = response.body;
        case 12:
          normalizedResponse = {
            data: data,
            headers: headers,
            reason: response.statusText,
            status: response.status
          };
          if (response.ok) {
            _context3.next = 13;
            break;
          }
          throw {
            response: normalizedResponse
          };
        case 13:
          return _context3.abrupt("return", normalizedResponse);
        case 14:
          _context3.prev = 14;
          _t2 = _context3["catch"](2);
          errors.handleErrorResponse(_t2);
          return _context3.abrupt("return", null);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 14]]);
  }));
  return function (_x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendFilePart", function (externalUrl, verb, data) {
  var optionsRaw = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var options = _objectSpread(_objectSpread({}, optionsRaw), {}, {
    body: data
  });
  return _Api._sendVerbatim(externalUrl, verb, options);
});
(0, _defineProperty2.default)(Api, "_autoPaginate", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(path, verb, params, options, response, metadata) {
    var _options$autoPaginate;
    var _response$headers, nextCursor, _ref8, autoPaginateCount, previousAutoPaginateData, nextPage, nextParams, nextMetadata;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!((_options$autoPaginate = options.autoPaginate) !== null && _options$autoPaginate !== void 0 ? _options$autoPaginate : _Files.default.getAutoPaginate())) {
            _context4.next = 2;
            break;
          }
          nextCursor = response === null || response === void 0 || (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers['x-files-cursor'];
          _ref8 = metadata || {}, autoPaginateCount = _ref8.autoPaginateCount, previousAutoPaginateData = _ref8.previousAutoPaginateData;
          if (!nextCursor) {
            _context4.next = 1;
            break;
          }
          nextPage = (Number(params === null || params === void 0 ? void 0 : params.page) || 1) + 1;
          nextParams = _objectSpread(_objectSpread({}, params), {}, {
            cursor: nextCursor,
            page: nextPage
          });
          nextMetadata = {
            autoPaginateCount: (autoPaginateCount || 1) + 1,
            previousAutoPaginateData: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData || []), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          };
          return _context4.abrupt("return", _Api.sendRequest(path, verb, nextParams, options, nextMetadata));
        case 1:
          if (!previousAutoPaginateData) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return", _objectSpread(_objectSpread({}, response), {}, {
            autoPaginateRequests: autoPaginateCount,
            data: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          }));
        case 2:
          return _context4.abrupt("return", response);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x9, _x0, _x1, _x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendRequest", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(path, verb) {
    var params,
      options,
      metadata,
      hasWorkspaceIdOption,
      workspaceId,
      languageHeader,
      headers,
      isExternal,
      hasApiKey,
      sessionId,
      isCreatingSession,
      apiKey,
      updatedOptions,
      requestPath,
      hasParams,
      _params,
      _i,
      _Object$entries,
      _Object$entries$_i,
      key,
      value,
      _i2,
      _Object$entries2,
      _Object$entries2$_i,
      key2,
      value2,
      pairs,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : null;
          options = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
          metadata = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : null;
          hasWorkspaceIdOption = Object.prototype.hasOwnProperty.call(options, 'workspaceId');
          workspaceId = hasWorkspaceIdOption ? options.workspaceId : _Files.default.getWorkspaceId();
          languageHeader = _Files.default.getLanguage() ? {
            'Accept-Language': _Files.default.getLanguage()
          } : {};
          headers = _objectSpread(_objectSpread(_objectSpread({
            Accept: 'application/json'
          }, languageHeader), options.headers), {}, {
            'User-Agent': _Files.default.getUserAgent()
          });
          isExternal = /^[a-zA-Z]+:\/\//.test(path);
          if (isExternal) {
            _context5.next = 4;
            break;
          }
          hasApiKey = options.apiKey !== undefined && options.apiKey !== null;
          sessionId = hasApiKey ? null : options.sessionId || options.session_id || _Files.default.getSessionId();
          if (!sessionId) {
            _context5.next = 1;
            break;
          }
          headers['X-FilesAPI-Auth'] = sessionId;
          _context5.next = 3;
          break;
        case 1:
          isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'; // api key cannot be used when creating a session
          if (isCreatingSession) {
            _context5.next = 3;
            break;
          }
          apiKey = options.apiKey || _Files.default.getApiKey();
          if (apiKey) {
            _context5.next = 2;
            break;
          }
          throw new errors.ConfigurationError('API key has not been set - use Files.setApiKey() to set it');
        case 2:
          headers['X-FilesAPI-Key'] = apiKey;
        case 3:
          if (workspaceId !== null && workspaceId !== undefined && "".concat(workspaceId) !== '') {
            headers['X-Files-Workspace-Id'] = workspaceId;
          }
        case 4:
          updatedOptions = _objectSpread(_objectSpread({}, options), {}, {
            headers: headers
          });
          requestPath = path;
          hasParams = (0, _utils.isObject)(params) && !(0, _utils.isEmpty)(params);
          if (hasParams) {
            if (verb.toUpperCase() === 'GET') {
              _params = {};
              for (_i = 0, _Object$entries = Object.entries(params); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                if ((0, _utils.isObject)(value)) {
                  for (_i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
                    _Object$entries2$_i = (0, _slicedToArray2.default)(_Object$entries2[_i2], 2), key2 = _Object$entries2$_i[0], value2 = _Object$entries2$_i[1];
                    _params["".concat(key, "[").concat(key2, "]")] = value2;
                  }
                } else {
                  _params[key] = value;
                }
              }
              pairs = Object.entries(_params).map(function (_ref0) {
                var _ref1 = (0, _slicedToArray2.default)(_ref0, 2),
                  key = _ref1[0],
                  value = _ref1[1];
                return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
              });
              requestPath += path.includes('?') ? '&' : '?';
              requestPath += pairs.join('&');
            } else {
              updatedOptions.body = JSON.stringify(params);
              headers['Content-Type'] = 'application/json';
            }
          }
          if (_Files.default.shouldDebugRequest()) {
            _Logger.default.debug('Request Options:');
            _Logger.default.debug(_objectSpread(_objectSpread({}, updatedOptions), {}, {
              body: hasParams ? "payload keys: ".concat(Object.keys(params).join(', ')) : '(none)'
            }));
          }
          _context5.next = 5;
          return _Api._sendVerbatim(requestPath, verb, updatedOptions);
        case 5:
          response = _context5.sent;
          return _context5.abrupt("return", _Api._autoPaginate(path, verb, params, updatedOptions, response, metadata));
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}());
var _default = exports.default = Api;
module.exports = Api;
module.exports.default = Api;