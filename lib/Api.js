"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var _axiosRetry = _interopRequireDefault(require("axios-retry"));

var _Files = _interopRequireDefault(require("./Files"));

var _Logger = _interopRequireDefault(require("./Logger"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Api = function Api() {
  (0, _classCallCheck2.default)(this, Api);
};

(0, _defineProperty2.default)(Api, "_configureAutoRetry", function () {
  (0, _axiosRetry.default)(_axios.default, {
    retries: _Files.default.getMaxNetworkRetries(),
    retryDelay: function retryDelay(retries) {
      _Logger.default.info("Retrying request (retry ".concat(retries, " of ").concat(_Files.default.getMaxNetworkRetries(), ")"));

      return Math.min(retries * _Files.default.getMinNetworkRetryDelay() * 1000, _Files.default.getMaxNetworkRetryDelay() * 1000);
    }
  });
});
(0, _defineProperty2.default)(Api, "_sendVerbatim", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(path, verb, options) {
    var isExternal, baseUrl, url, response;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isExternal = /^[a-zA-Z]+:\/\//.test(path);
            baseUrl = _Files.default.getBaseUrl();

            if (!(!isExternal && !baseUrl)) {
              _context.next = 4;
              break;
            }

            throw new Error('Base URL has not been set - use Files.setBaseUrl() to set it');

          case 4:
            url = isExternal ? path : "".concat(baseUrl).concat(_Files.default.getEndpointPrefix()).concat(path);

            _Logger.default.debug("Sending request: ".concat(verb, " ").concat(url));

            _Logger.default.debug('Sending options:', options);

            Api._configureAutoRetry();

            _context.prev = 8;
            _context.next = 11;
            return (0, _axios.default)(_objectSpread({
              method: verb,
              timeout: _Files.default.getNetworkTimeout() * 1000,
              url: url
            }, options));

          case 11:
            response = _context.sent;

            _Logger.default.debug("Status: ".concat(response.status, " ").concat(response.statusText));

            if (_Files.default.shouldDebugResponseHeaders()) {
              _Logger.default.debug('Response Headers: ');

              _Logger.default.debug(response.headers);
            }

            return _context.abrupt("return", {
              status: response.status,
              reason: response.statusText,
              headers: response.headers,
              data: response.data
            });

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](8);

            if (_context.t0.response) {
              _Logger.default.error('Exception >', _context.t0.response.status, _context.t0.response.statusText);
            }

            _Logger.default.error('Exception >', _context.t0.toString());

            return _context.abrupt("return", null);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 17]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendFilePart", function (externalUrl, verb, data) {
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var params = {
    data: data
  };

  if (headers) {
    params.headers = headers;
  }

  return Api._sendVerbatim(externalUrl, verb, params);
});
(0, _defineProperty2.default)(Api, "_autoPaginate", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path, verb, params, options, response, metadata) {
    var _response$headers, nextCursor, _ref3, autoPaginateCount, previousAutoPaginateData, nextPage, nextParams, nextMetadata;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!_Files.default.getAutoPaginate()) {
              _context2.next = 12;
              break;
            }

            nextCursor = response === null || response === void 0 ? void 0 : (_response$headers = response.headers) === null || _response$headers === void 0 ? void 0 : _response$headers['x-files-cursor'];
            _ref3 = metadata || {}, autoPaginateCount = _ref3.autoPaginateCount, previousAutoPaginateData = _ref3.previousAutoPaginateData;

            if (!nextCursor) {
              _context2.next = 10;
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
            return _context2.abrupt("return", Api.sendRequest(path, verb, nextParams, options, nextMetadata));

          case 10:
            if (!previousAutoPaginateData) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", _objectSpread(_objectSpread({}, response), {}, {
              autoPaginateRequests: autoPaginateCount,
              data: [].concat((0, _toConsumableArray2.default)(previousAutoPaginateData), (0, _toConsumableArray2.default)((response === null || response === void 0 ? void 0 : response.data) || []))
            }));

          case 12:
            return _context2.abrupt("return", response);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Api, "sendRequest", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(path, verb) {
    var params,
        options,
        metadata,
        headers,
        isExternal,
        sessionId,
        isCreatingSession,
        apiKey,
        requestPath,
        hasParams,
        pairs,
        response,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
            options = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
            metadata = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : null;
            headers = _objectSpread(_objectSpread({}, options.headers), {}, {
              Accept: 'application/json',
              'User-Agent': 'Files.com JavaScript SDK v1.0'
            });
            isExternal = /^[a-zA-Z]+:\/\//.test(path);

            if (isExternal) {
              _context3.next = 17;
              break;
            }

            sessionId = options.sessionId || _Files.default.getSessionId();

            if (!sessionId) {
              _context3.next = 11;
              break;
            }

            headers['X-FilesAPI-Auth'] = sessionId;
            _context3.next = 17;
            break;

          case 11:
            isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'; // api key cannot be used when creating a session

            if (isCreatingSession) {
              _context3.next = 17;
              break;
            }

            apiKey = options.apiKey || _Files.default.getApiKey();

            if (apiKey) {
              _context3.next = 16;
              break;
            }

            throw new Error('API key has not been set - use Files.setApiKey() to set it');

          case 16:
            headers['X-FilesAPI-Key'] = apiKey;

          case 17:
            requestPath = path;
            hasParams = (0, _utils.isObject)(params) && !(0, _utils.isEmpty)(params);

            if (hasParams) {
              if (verb.toUpperCase() === 'GET') {
                pairs = Object.entries(params).map(function (_ref5) {
                  var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
                      key = _ref6[0],
                      value = _ref6[1];

                  return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
                });
                requestPath += path.includes('?') ? '&' : '?';
                requestPath += pairs.join('&');
              } else {
                options.data = JSON.stringify(params);
                headers['Content-Type'] = 'application/json';
              }
            }

            options.headers = headers;

            if (_Files.default.shouldDebugRequest()) {
              _Logger.default.debug('Request Options:');

              _Logger.default.debug(_objectSpread(_objectSpread({}, options), {}, {
                data: hasParams ? "payload keys: ".concat(Object.keys(params).join(', ')) : '(none)',
                headers: _objectSpread(_objectSpread({}, headers), {}, {
                  'X-FilesAPI-Key': '<redacted>'
                })
              }));
            }

            _context3.next = 24;
            return Api._sendVerbatim(requestPath, verb, options);

          case 24:
            response = _context3.sent;
            return _context3.abrupt("return", Api._autoPaginate(path, verb, params, options, response, metadata));

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = Api;
exports.default = _default;