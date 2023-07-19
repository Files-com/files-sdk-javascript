"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _crossFetch = _interopRequireDefault(require("cross-fetch"));
var _Files = _interopRequireDefault(require("./Files"));
var errors = _interopRequireWildcard(require("./Errors"));
var _Logger = _interopRequireDefault(require("./Logger"));
var _utils = require("./utils");
var _excluded = ["timeoutSecs"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _fetchWithTimeout = function _fetchWithTimeout(url) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    timeoutSecs = _ref.timeoutSecs,
    options = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return timeoutSecs <= 0 ? (0, _crossFetch.default)(url, options) : Promise.race([(0, _crossFetch.default)(url, options), new Promise(function (_, reject) {
    setTimeout(function () {
      return reject(new errors.FilesError('Request timed out'));
    }, timeoutSecs * 1000);
  })]);
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
          return _fetchWithTimeout(url, options);
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
            return setTimeout(resolve, delaySecs * 1000);
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
(0, _defineProperty2.default)(Api, "_sendVerbatim", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path, verb, options) {
    var isExternal, baseUrl, url, agent, response, headers, contentType, data, normalizedResponse;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          isExternal = /^[a-zA-Z]+:\/\//.test(path);
          baseUrl = _Files.default.getBaseUrl();
          if (!(!isExternal && !baseUrl)) {
            _context2.next = 4;
            break;
          }
          throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it');
        case 4:
          url = isExternal ? path : "".concat(baseUrl).concat(_Files.default.getEndpointPrefix()).concat(path);
          _Logger.default.debug("Sending request: ".concat(verb, " ").concat(url));
          _Logger.default.debug('Sending options:', _objectSpread(_objectSpread({
            method: verb
          }, options), {}, {
            headers: _objectSpread(_objectSpread({}, options.headers), {}, {
              'X-FilesAPI-Key': '<redacted>'
            })
          }));
          _context2.prev = 7;
          agent = (options === null || options === void 0 ? void 0 : options.agent) || (options === null || options === void 0 ? void 0 : options.httpsAgent) || (options === null || options === void 0 ? void 0 : options.httpAgent);
          _context2.next = 11;
          return fetchWithRetry(url, _objectSpread({
            agent: agent,
            method: verb,
            timeoutSecs: _Files.default.getNetworkTimeout()
          }, options));
        case 11:
          response = _context2.sent;
          headers = Object.fromEntries(response.headers.entries());
          _Logger.default.debug("Status: ".concat(response.status, " ").concat(response.statusText));
          if (_Files.default.shouldDebugResponseHeaders()) {
            _Logger.default.debug('Response Headers: ');
            _Logger.default.debug(headers);
          }
          contentType = headers['content-type'] || '';
          if (!contentType.includes('application/json')) {
            _context2.next = 22;
            break;
          }
          _context2.next = 19;
          return response.json();
        case 19:
          data = _context2.sent;
          _context2.next = 35;
          break;
        case 22:
          if (!contentType.includes('text/')) {
            _context2.next = 28;
            break;
          }
          _context2.next = 25;
          return response.text();
        case 25:
          data = _context2.sent;
          _context2.next = 35;
          break;
        case 28:
          if (!contentType.includes('multipart/form-data')) {
            _context2.next = 34;
            break;
          }
          _context2.next = 31;
          return response.formData();
        case 31:
          data = _context2.sent;
          _context2.next = 35;
          break;
        case 34:
          data = response.body;
        case 35:
          normalizedResponse = {
            status: response.status,
            reason: response.statusText,
            headers: headers,
            data: data
          };
          if (response.ok) {
            _context2.next = 38;
            break;
          }
          throw {
            response: normalizedResponse
          };
        case 38:
          return _context2.abrupt("return", normalizedResponse);
        case 41:
          _context2.prev = 41;
          _context2.t0 = _context2["catch"](7);
          errors.handleErrorResponse(_context2.t0);
        case 44:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[7, 41]]);
  }));
  return function (_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendFilePart", function (externalUrl, verb, data) {
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var params = {
    body: data
  };
  if (headers) {
    params.headers = headers;
  }
  return Api._sendVerbatim(externalUrl, verb, params);
});
(0, _defineProperty2.default)(Api, "_autoPaginate", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(path, verb, params, options, response, metadata) {
    var _options$autoPaginate;
    var _response$headers, nextCursor, _ref5, autoPaginateCount, previousAutoPaginateData, nextPage, nextParams, nextMetadata;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!((_options$autoPaginate = options.autoPaginate) !== null && _options$autoPaginate !== void 0 ? _options$autoPaginate : _Files.default.getAutoPaginate())) {
            _context3.next = 12;
            break;
          }
          nextCursor = response === null || response === void 0 || (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers['x-files-cursor'];
          _ref5 = metadata || {}, autoPaginateCount = _ref5.autoPaginateCount, previousAutoPaginateData = _ref5.previousAutoPaginateData;
          if (!nextCursor) {
            _context3.next = 10;
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
          return _context3.abrupt("return", Api.sendRequest(path, verb, nextParams, options, nextMetadata));
        case 10:
          if (!previousAutoPaginateData) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", _objectSpread(_objectSpread({}, response), {}, {
            autoPaginateRequests: autoPaginateCount,
            data: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
          }));
        case 12:
          return _context3.abrupt("return", response);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendRequest", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(path, verb) {
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
              pairs = Object.entries(params).map(function (_ref7) {
                var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
                  key = _ref8[0],
                  value = _ref8[1];
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
          return Api._sendVerbatim(requestPath, verb, updatedOptions);
        case 24:
          response = _context4.sent;
          return _context4.abrupt("return", Api._autoPaginate(path, verb, params, updatedOptions, response, metadata));
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = Api;
exports.default = _default;
module.exports = Api;
module.exports.default = Api;