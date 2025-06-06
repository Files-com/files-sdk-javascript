"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
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
var fetchWithTimeout = function fetchWithTimeout(url) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    timeoutSecs = _ref.timeoutSecs,
    options = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var timeoutId;
  return timeoutSecs <= 0 ? (0, _crossFetch.default)(url, options) : Promise.race([(0, _crossFetch.default)(url, options), new Promise(function (_, reject) {
    timeoutId = setTimeout(function () {
      return reject(new errors.FilesError('Request timed out'));
    }, timeoutSecs * 1000);
  })]).finally(function () {
    return clearTimeout(timeoutId);
  });
};
var _fetchWithRetry = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(url, options) {
    var retries,
      maxRetries,
      minRetryDelaySecs,
      maxRetryDelaySecs,
      nextRetries,
      delaySecs,
      _args = arguments,
      _t;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          retries = _args.length > 2 && _args[2] !== undefined ? _args[2] : 0;
          maxRetries = _Files.default.getMaxNetworkRetries();
          minRetryDelaySecs = _Files.default.getMinNetworkRetryDelay();
          maxRetryDelaySecs = _Files.default.getMaxNetworkRetryDelay();
          _context.prev = 1;
          _context.next = 2;
          return fetchWithTimeout(url, options);
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
          _context.prev = 3;
          _t = _context["catch"](1);
          _Logger.default.info("Request #".concat(retries + 1, " failed: ").concat(_t.message));
          if (!(retries >= maxRetries)) {
            _context.next = 4;
            break;
          }
          throw _t;
        case 4:
          nextRetries = retries + 1;
          _Logger.default.info("Retrying request (retry ".concat(nextRetries, " of ").concat(maxRetries, ")"));
          delaySecs = Math.min(minRetryDelaySecs * Math.pow(2, retries), maxRetryDelaySecs); // exponential backoff
          _context.next = 5;
          return new Promise(function (resolve) {
            setTimeout(resolve, delaySecs * 1000);
          });
        case 5:
          return _context.abrupt("return", _fetchWithRetry(url, options, nextRetries));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 3]]);
  }));
  return function fetchWithRetry(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var Api = /*#__PURE__*/(0, _createClass2.default)(function Api() {
  (0, _classCallCheck2.default)(this, Api);
});
_Api = Api;
(0, _defineProperty2.default)(Api, "_sendVerbatim", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(path, verb, optionsRaw) {
    var _ref4, getAgentForUrl, options, isExternal, baseUrl, url, agent, response, headers, contentType, data, normalizedResponse, _t2;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref4 = optionsRaw || {}, getAgentForUrl = _ref4.getAgentForUrl, options = (0, _objectWithoutProperties2.default)(_ref4, _excluded2);
          isExternal = /^[a-zA-Z]+:\/\//.test(path);
          baseUrl = _Files.default.getBaseUrl();
          if (!(!isExternal && !baseUrl)) {
            _context2.next = 1;
            break;
          }
          throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it');
        case 1:
          url = isExternal ? path : "".concat(baseUrl).concat(_Files.default.getEndpointPrefix()).concat(path);
          _Logger.default.debug("Sending request: ".concat(verb, " ").concat(url));
          _Logger.default.debug('Sending options:', _objectSpread(_objectSpread({
            method: verb
          }, options), {}, {
            headers: _objectSpread(_objectSpread({}, options.headers), {}, {
              'X-FilesAPI-Key': '<redacted>'
            })
          }));
          _context2.prev = 2;
          agent = (getAgentForUrl === null || getAgentForUrl === void 0 ? void 0 : getAgentForUrl(url)) || (options === null || options === void 0 ? void 0 : options.agent) || (options === null || options === void 0 ? void 0 : options.httpsAgent) || (options === null || options === void 0 ? void 0 : options.httpAgent);
          _context2.next = 3;
          return _fetchWithRetry(url, _objectSpread({
            agent: agent,
            method: verb,
            timeoutSecs: _Files.default.getNetworkTimeout()
          }, options));
        case 3:
          response = _context2.sent;
          headers = Object.fromEntries(response.headers.entries());
          _Logger.default.debug("Status: ".concat(response.status, " ").concat(response.statusText));
          if (_Files.default.shouldDebugResponseHeaders()) {
            _Logger.default.debug('Response Headers: ');
            _Logger.default.debug(headers);
          }
          contentType = headers['content-type'] || '';
          if (!contentType.includes('application/json')) {
            _context2.next = 7;
            break;
          }
          if (!(headers['content-length'] === '0')) {
            _context2.next = 4;
            break;
          }
          data = response.body;
          _context2.next = 6;
          break;
        case 4:
          _context2.next = 5;
          return response.json();
        case 5:
          data = _context2.sent;
        case 6:
          _context2.next = 12;
          break;
        case 7:
          if (!contentType.includes('text/')) {
            _context2.next = 9;
            break;
          }
          _context2.next = 8;
          return response.text();
        case 8:
          data = _context2.sent;
          _context2.next = 12;
          break;
        case 9:
          if (!contentType.includes('multipart/form-data')) {
            _context2.next = 11;
            break;
          }
          _context2.next = 10;
          return response.formData();
        case 10:
          data = _context2.sent;
          _context2.next = 12;
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
            _context2.next = 13;
            break;
          }
          throw {
            response: normalizedResponse
          };
        case 13:
          return _context2.abrupt("return", normalizedResponse);
        case 14:
          _context2.prev = 14;
          _t2 = _context2["catch"](2);
          errors.handleErrorResponse(_t2);
          return _context2.abrupt("return", null);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 14]]);
  }));
  return function (_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
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
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(path, verb, params, options, response, metadata) {
    var _options$autoPaginate;
    var _response$headers, nextCursor, _ref6, autoPaginateCount, previousAutoPaginateData, nextPage, nextParams, nextMetadata;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!((_options$autoPaginate = options.autoPaginate) !== null && _options$autoPaginate !== void 0 ? _options$autoPaginate : _Files.default.getAutoPaginate())) {
            _context3.next = 2;
            break;
          }
          nextCursor = response === null || response === void 0 || (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers['x-files-cursor'];
          _ref6 = metadata || {}, autoPaginateCount = _ref6.autoPaginateCount, previousAutoPaginateData = _ref6.previousAutoPaginateData;
          if (!nextCursor) {
            _context3.next = 1;
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
          return _context3.abrupt("return", _Api.sendRequest(path, verb, nextParams, options, nextMetadata));
        case 1:
          if (!previousAutoPaginateData) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return", _objectSpread(_objectSpread({}, response), {}, {
            autoPaginateRequests: autoPaginateCount,
            data: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          }));
        case 2:
          return _context3.abrupt("return", response);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x6, _x7, _x8, _x9, _x0, _x1) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendRequest", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(path, verb) {
    var params,
      options,
      metadata,
      languageHeader,
      headers,
      isExternal,
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
      _args4 = arguments;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
          options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
          metadata = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;
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
            _context4.next = 3;
            break;
          }
          sessionId = options.sessionId || _Files.default.getSessionId();
          if (!sessionId) {
            _context4.next = 1;
            break;
          }
          headers['X-FilesAPI-Auth'] = sessionId;
          _context4.next = 3;
          break;
        case 1:
          isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'; // api key cannot be used when creating a session
          if (isCreatingSession) {
            _context4.next = 3;
            break;
          }
          apiKey = options.apiKey || _Files.default.getApiKey();
          if (apiKey) {
            _context4.next = 2;
            break;
          }
          throw new errors.ConfigurationError('API key has not been set - use Files.setApiKey() to set it');
        case 2:
          headers['X-FilesAPI-Key'] = apiKey;
        case 3:
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
              pairs = Object.entries(_params).map(function (_ref8) {
                var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
                  key = _ref9[0],
                  value = _ref9[1];
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
              body: hasParams ? "payload keys: ".concat(Object.keys(params).join(', ')) : '(none)',
              headers: _objectSpread(_objectSpread({}, headers), {}, {
                'X-FilesAPI-Key': '<redacted>'
              })
            }));
          }
          _context4.next = 4;
          return _Api._sendVerbatim(requestPath, verb, updatedOptions);
        case 4:
          response = _context4.sent;
          return _context4.abrupt("return", _Api._autoPaginate(path, verb, params, updatedOptions, response, metadata));
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = exports.default = Api;
module.exports = Api;
module.exports.default = Api;