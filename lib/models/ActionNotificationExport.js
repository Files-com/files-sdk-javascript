"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _ActionNotificationExport;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

/**
 * Class ActionNotificationExport
 */
var ActionNotificationExport = /*#__PURE__*/(0, _createClass2.default)(function ActionNotificationExport() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ActionNotificationExport);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # History Export ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // int64 # Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // string # Version of the underlying records for the export.
  (0, _defineProperty2.default)(this, "getExportVersion", function () {
    return _this.attributes.export_version;
  });
  (0, _defineProperty2.default)(this, "setExportVersion", function (value) {
    _this.attributes.export_version = value;
    exposeAttributes(_this, ['export_version']);
  });
  // date-time # Start date/time of export range.
  (0, _defineProperty2.default)(this, "getStartAt", function () {
    return _this.attributes.start_at;
  });
  (0, _defineProperty2.default)(this, "setStartAt", function (value) {
    _this.attributes.start_at = value;
    exposeAttributes(_this, ['start_at']);
  });
  // date-time # End date/time of export range.
  (0, _defineProperty2.default)(this, "getEndAt", function () {
    return _this.attributes.end_at;
  });
  (0, _defineProperty2.default)(this, "setEndAt", function (value) {
    _this.attributes.end_at = value;
    exposeAttributes(_this, ['end_at']);
  });
  // string # Status of export.  Valid values: `building`, `ready`, or `failed`
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
    exposeAttributes(_this, ['status']);
  });
  // string # Return notifications that were triggered by actions on this specific path.
  (0, _defineProperty2.default)(this, "getQueryPath", function () {
    return _this.attributes.query_path;
  });
  (0, _defineProperty2.default)(this, "setQueryPath", function (value) {
    _this.attributes.query_path = value;
    exposeAttributes(_this, ['query_path']);
  });
  // string # Return notifications that were triggered by actions in this folder.
  (0, _defineProperty2.default)(this, "getQueryFolder", function () {
    return _this.attributes.query_folder;
  });
  (0, _defineProperty2.default)(this, "setQueryFolder", function (value) {
    _this.attributes.query_folder = value;
    exposeAttributes(_this, ['query_folder']);
  });
  // string # Error message associated with the request, if any.
  (0, _defineProperty2.default)(this, "getQueryMessage", function () {
    return _this.attributes.query_message;
  });
  (0, _defineProperty2.default)(this, "setQueryMessage", function (value) {
    _this.attributes.query_message = value;
    exposeAttributes(_this, ['query_message']);
  });
  // string # The HTTP request method used by the webhook.
  (0, _defineProperty2.default)(this, "getQueryRequestMethod", function () {
    return _this.attributes.query_request_method;
  });
  (0, _defineProperty2.default)(this, "setQueryRequestMethod", function (value) {
    _this.attributes.query_request_method = value;
    exposeAttributes(_this, ['query_request_method']);
  });
  // string # The target webhook URL.
  (0, _defineProperty2.default)(this, "getQueryRequestUrl", function () {
    return _this.attributes.query_request_url;
  });
  (0, _defineProperty2.default)(this, "setQueryRequestUrl", function (value) {
    _this.attributes.query_request_url = value;
    exposeAttributes(_this, ['query_request_url']);
  });
  // string # The HTTP status returned from the server in response to the webhook request.
  (0, _defineProperty2.default)(this, "getQueryStatus", function () {
    return _this.attributes.query_status;
  });
  (0, _defineProperty2.default)(this, "setQueryStatus", function (value) {
    _this.attributes.query_status = value;
    exposeAttributes(_this, ['query_status']);
  });
  // boolean # true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise.
  (0, _defineProperty2.default)(this, "getQuerySuccess", function () {
    return _this.attributes.query_success;
  });
  (0, _defineProperty2.default)(this, "setQuerySuccess", function (value) {
    _this.attributes.query_success = value;
    exposeAttributes(_this, ['query_success']);
  });
  // string # If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV.
  (0, _defineProperty2.default)(this, "getResultsUrl", function () {
    return _this.attributes.results_url;
  });
  (0, _defineProperty2.default)(this, "setResultsUrl", function (value) {
    _this.attributes.results_url = value;
    exposeAttributes(_this, ['results_url']);
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var newObject;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The ActionNotificationExport object doesn\'t support updates.');
        case 1:
          _context.next = 2;
          return ActionNotificationExport.create(_this.attributes, _this.options);
        case 2:
          newObject = _context.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context.abrupt("return", true);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_ActionNotificationExport = ActionNotificationExport;
// Parameters:
//   id (required) - int64 - Action Notification Export ID.
(0, _defineProperty2.default)(ActionNotificationExport, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
    var params,
      options,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context2.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context2.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context2.next = 4;
          return _Api.default.sendRequest("/action_notification_exports/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", new _ActionNotificationExport(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ActionNotificationExport, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _ActionNotificationExport.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   workspace_id - int64 - Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export.
//   start_at - string - Start date/time of export range.
//   end_at - string - End date/time of export range.
//   query_message - string - Error message associated with the request, if any.
//   query_request_method - string - The HTTP request method used by the webhook.
//   query_request_url - string - The target webhook URL.
//   query_status - string - The HTTP status returned from the server in response to the webhook request.
//   query_success - boolean - true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise.
//   query_path - string - Return notifications that were triggered by actions on this specific path.
//   query_folder - string - Return notifications that were triggered by actions in this folder.
(0, _defineProperty2.default)(ActionNotificationExport, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context3.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 2:
        if (!(params.start_at !== undefined && params.start_at !== null && !(0, _utils.isString)(params.start_at))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(params.start_at)));
      case 3:
        if (!(params.end_at !== undefined && params.end_at !== null && !(0, _utils.isString)(params.end_at))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(params.end_at)));
      case 4:
        if (!(params.query_message !== undefined && params.query_message !== null && !(0, _utils.isString)(params.query_message))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_message must be of type String, received ".concat((0, _utils.getType)(params.query_message)));
      case 5:
        if (!(params.query_request_method !== undefined && params.query_request_method !== null && !(0, _utils.isString)(params.query_request_method))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_request_method must be of type String, received ".concat((0, _utils.getType)(params.query_request_method)));
      case 6:
        if (!(params.query_request_url !== undefined && params.query_request_url !== null && !(0, _utils.isString)(params.query_request_url))) {
          _context3.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_request_url must be of type String, received ".concat((0, _utils.getType)(params.query_request_url)));
      case 7:
        if (!(params.query_status !== undefined && params.query_status !== null && !(0, _utils.isString)(params.query_status))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_status must be of type String, received ".concat((0, _utils.getType)(params.query_status)));
      case 8:
        if (!((0, _utils.isArray)(params.query_success) || (0, _utils.isObject)(params.query_success))) {
          _context3.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_success must be of type Boolean, received ".concat((0, _utils.getType)(params.query_success)));
      case 9:
        if (!(params.query_path !== undefined && params.query_path !== null && !(0, _utils.isString)(params.query_path))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_path must be of type String, received ".concat((0, _utils.getType)(params.query_path)));
      case 10:
        if (!(params.query_folder !== undefined && params.query_folder !== null && !(0, _utils.isString)(params.query_folder))) {
          _context3.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: query_folder must be of type String, received ".concat((0, _utils.getType)(params.query_folder)));
      case 11:
        _context3.next = 12;
        return _Api.default.sendRequest('/action_notification_exports', 'POST', params, options);
      case 12:
        response = _context3.sent;
        return _context3.abrupt("return", new _ActionNotificationExport(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 13:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = ActionNotificationExport;
module.exports = ActionNotificationExport;
module.exports.default = ActionNotificationExport;