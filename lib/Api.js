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
var _class;
var _excluded = ["timeoutSecs"],
  _excluded2 = ["getAgentForUrl"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
var fetchWithRetry = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url, options) {
    var retries,
      maxRetries,
      minRetryDelaySecs,
      maxRetryDelaySecs,
      nextRetries,
      delaySecs,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          retries = _args.length > 2 && _args[2] !== undefined ? _args[2] : 0;
          maxRetries = _Files.default.getMaxNetworkRetries();
          minRetryDelaySecs = _Files.default.getMinNetworkRetryDelay();
          maxRetryDelaySecs = _Files.default.getMaxNetworkRetryDelay();
          _context.prev = 4;
          _context.next = 7;
          return fetchWithTimeout(url, options);
        case 7:
          return _context.abrupt("return", _context.sent);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          _Logger.default.info("Request #".concat(retries + 1, " failed: ").concat(_context.t0.message));
          if (!(retries >= maxRetries)) {
            _context.next = 17;
            break;
          }
          throw _context.t0;
        case 17:
          nextRetries = retries + 1;
          _Logger.default.info("Retrying request (retry ".concat(nextRetries, " of ").concat(maxRetries, ")"));
          delaySecs = Math.min(minRetryDelaySecs * Math.pow(2, retries), maxRetryDelaySecs); // exponential backoff
          _context.next = 22;
          return new Promise(function (resolve) {
            setTimeout(resolve, delaySecs * 1000);
          });
        case 22:
          return _context.abrupt("return", fetchWithRetry(url, options, nextRetries));
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 10]]);
  }));
  return function fetchWithRetry(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var Api = /*#__PURE__*/(0, _createClass2.default)(function Api() {
  (0, _classCallCheck2.default)(this, Api);
});
_class = Api;
(0, _defineProperty2.default)(Api, "_sendVerbatim", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path, verb, optionsRaw) {
    var _ref4, getAgentForUrl, options, isExternal, baseUrl, url, agent, response, headers, contentType, data, normalizedResponse;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref4 = optionsRaw || {}, getAgentForUrl = _ref4.getAgentForUrl, options = (0, _objectWithoutProperties2.default)(_ref4, _excluded2);
          isExternal = /^[a-zA-Z]+:\/\//.test(path);
          baseUrl = _Files.default.getBaseUrl();
          if (!(!isExternal && !baseUrl)) {
            _context2.next = 5;
            break;
          }
          throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it');
        case 5:
          url = isExternal ? path : "".concat(baseUrl).concat(_Files.default.getEndpointPrefix()).concat(path);
          _Logger.default.debug("Sending request: ".concat(verb, " ").concat(url));
          _Logger.default.debug('Sending options:', _objectSpread(_objectSpread({
            method: verb
          }, options), {}, {
            headers: _objectSpread(_objectSpread({}, options.headers), {}, {
              'X-FilesAPI-Key': '<redacted>'
            })
          }));
          _context2.prev = 8;
          agent = (getAgentForUrl === null || getAgentForUrl === void 0 ? void 0 : getAgentForUrl(url)) || (options === null || options === void 0 ? void 0 : options.agent) || (options === null || options === void 0 ? void 0 : options.httpsAgent) || (options === null || options === void 0 ? void 0 : options.httpAgent);
          _context2.next = 12;
          return fetchWithRetry(url, _objectSpread({
            agent: agent,
            method: verb,
            timeoutSecs: _Files.default.getNetworkTimeout()
          }, options));
        case 12:
          response = _context2.sent;
          headers = Object.fromEntries(response.headers.entries());
          _Logger.default.debug("Status: ".concat(response.status, " ").concat(response.statusText));
          if (_Files.default.shouldDebugResponseHeaders()) {
            _Logger.default.debug('Response Headers: ');
            _Logger.default.debug(headers);
          }
          contentType = headers['content-type'] || '';
          if (!contentType.includes('application/json')) {
            _context2.next = 27;
            break;
          }
          if (!(headers['content-length'] === '0')) {
            _context2.next = 22;
            break;
          }
          data = response.body;
          _context2.next = 25;
          break;
        case 22:
          _context2.next = 24;
          return response.json();
        case 24:
          data = _context2.sent;
        case 25:
          _context2.next = 40;
          break;
        case 27:
          if (!contentType.includes('text/')) {
            _context2.next = 33;
            break;
          }
          _context2.next = 30;
          return response.text();
        case 30:
          data = _context2.sent;
          _context2.next = 40;
          break;
        case 33:
          if (!contentType.includes('multipart/form-data')) {
            _context2.next = 39;
            break;
          }
          _context2.next = 36;
          return response.formData();
        case 36:
          data = _context2.sent;
          _context2.next = 40;
          break;
        case 39:
          data = response.body;
        case 40:
          normalizedResponse = {
            data: data,
            headers: headers,
            reason: response.statusText,
            status: response.status
          };
          if (response.ok) {
            _context2.next = 43;
            break;
          }
          throw {
            response: normalizedResponse
          };
        case 43:
          return _context2.abrupt("return", normalizedResponse);
        case 46:
          _context2.prev = 46;
          _context2.t0 = _context2["catch"](8);
          errors.handleErrorResponse(_context2.t0);
          return _context2.abrupt("return", null);
        case 50:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[8, 46]]);
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
  return _class._sendVerbatim(externalUrl, verb, options);
});
(0, _defineProperty2.default)(Api, "_autoPaginate", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(path, verb, params, options, response, metadata) {
    var _options$autoPaginate;
    var _response$headers, nextCursor, _ref6, autoPaginateCount, previousAutoPaginateData, nextPage, nextParams, nextMetadata;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!((_options$autoPaginate = options.autoPaginate) !== null && _options$autoPaginate !== void 0 ? _options$autoPaginate : _Files.default.getAutoPaginate())) {
            _context3.next = 10;
            break;
          }
          nextCursor = response === null || response === void 0 || (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers['x-files-cursor'];
          _ref6 = metadata || {}, autoPaginateCount = _ref6.autoPaginateCount, previousAutoPaginateData = _ref6.previousAutoPaginateData;
          if (!nextCursor) {
            _context3.next = 8;
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
          return _context3.abrupt("return", _class.sendRequest(path, verb, nextParams, options, nextMetadata));
        case 8:
          if (!previousAutoPaginateData) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", _objectSpread(_objectSpread({}, response), {}, {
            autoPaginateRequests: autoPaginateCount,
            data: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          }));
        case 10:
          return _context3.abrupt("return", response);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendRequest", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(path, verb) {
    var params,
      options,
      metadata,
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
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
          options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
          metadata = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;
          headers = _objectSpread(_objectSpread({
            Accept: 'application/json'
          }, options.headers), {}, {
            'User-Agent': _Files.default.getUserAgent()
          });
          isExternal = /^[a-zA-Z]+:\/\//.test(path);
          if (isExternal) {
            _context4.next = 17;
            break;
          }
          sessionId = options.sessionId || _Files.default.getSessionId();
          if (!sessionId) {
            _context4.next = 11;
            break;
          }
          headers['X-FilesAPI-Auth'] = sessionId;
          _context4.next = 17;
          break;
        case 11:
          isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'; // api key cannot be used when creating a session
          if (isCreatingSession) {
            _context4.next = 17;
            break;
          }
          apiKey = options.apiKey || _Files.default.getApiKey();
          if (apiKey) {
            _context4.next = 16;
            break;
          }
          throw new errors.ConfigurationError('API key has not been set - use Files.setApiKey() to set it');
        case 16:
          headers['X-FilesAPI-Key'] = apiKey;
        case 17:
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
          _context4.next = 24;
          return _class._sendVerbatim(requestPath, verb, updatedOptions);
        case 24:
          response = _context4.sent;
          return _context4.abrupt("return", _class._autoPaginate(path, verb, params, updatedOptions, response, metadata));
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = exports.default = Api;
module.exports = Api;
module.exports.default = Api;