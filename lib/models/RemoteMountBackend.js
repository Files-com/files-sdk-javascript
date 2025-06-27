"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _RemoteMountBackend;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class RemoteMountBackend
 */
var RemoteMountBackend = /*#__PURE__*/(0, _createClass2.default)(function RemoteMountBackend() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, RemoteMountBackend);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # Path to the canary file used for health checks.
  (0, _defineProperty2.default)(this, "getCanaryFilePath", function () {
    return _this.attributes.canary_file_path;
  });
  (0, _defineProperty2.default)(this, "setCanaryFilePath", function (value) {
    _this.attributes.canary_file_path = value;
  });
  // boolean # True if this backend is enabled.
  (0, _defineProperty2.default)(this, "getEnabled", function () {
    return _this.attributes.enabled;
  });
  (0, _defineProperty2.default)(this, "setEnabled", function (value) {
    _this.attributes.enabled = value;
  });
  // int64 # Number of consecutive failures before considering the backend unhealthy.
  (0, _defineProperty2.default)(this, "getFall", function () {
    return _this.attributes.fall;
  });
  (0, _defineProperty2.default)(this, "setFall", function (value) {
    _this.attributes.fall = value;
  });
  // boolean # True if health checks are enabled for this backend.
  (0, _defineProperty2.default)(this, "getHealthCheckEnabled", function () {
    return _this.attributes.health_check_enabled;
  });
  (0, _defineProperty2.default)(this, "setHealthCheckEnabled", function (value) {
    _this.attributes.health_check_enabled = value;
  });
  // string # Type of health check to perform.
  (0, _defineProperty2.default)(this, "getHealthCheckType", function () {
    return _this.attributes.health_check_type;
  });
  (0, _defineProperty2.default)(this, "setHealthCheckType", function (value) {
    _this.attributes.health_check_type = value;
  });
  // int64 # Unique identifier for this backend.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # Interval in seconds between health checks.
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
  });
  // double # Minimum free CPU percentage required for this backend to be considered healthy.
  (0, _defineProperty2.default)(this, "getMinFreeCpu", function () {
    return _this.attributes.min_free_cpu;
  });
  (0, _defineProperty2.default)(this, "setMinFreeCpu", function (value) {
    _this.attributes.min_free_cpu = value;
  });
  // double # Minimum free memory percentage required for this backend to be considered healthy.
  (0, _defineProperty2.default)(this, "getMinFreeMem", function () {
    return _this.attributes.min_free_mem;
  });
  (0, _defineProperty2.default)(this, "setMinFreeMem", function (value) {
    _this.attributes.min_free_mem = value;
  });
  // int64 # Priority of this backend.
  (0, _defineProperty2.default)(this, "getPriority", function () {
    return _this.attributes.priority;
  });
  (0, _defineProperty2.default)(this, "setPriority", function (value) {
    _this.attributes.priority = value;
  });
  // string # Path on the remote server to treat as the root of this mount.
  (0, _defineProperty2.default)(this, "getRemotePath", function () {
    return _this.attributes.remote_path;
  });
  (0, _defineProperty2.default)(this, "setRemotePath", function (value) {
    _this.attributes.remote_path = value;
  });
  // int64 # The remote server that this backend is associated with.
  (0, _defineProperty2.default)(this, "getRemoteServerId", function () {
    return _this.attributes.remote_server_id;
  });
  (0, _defineProperty2.default)(this, "setRemoteServerId", function (value) {
    _this.attributes.remote_server_id = value;
  });
  // int64 # The mount ID of the Remote Server Mount that this backend is associated with.
  (0, _defineProperty2.default)(this, "getRemoteServerMountId", function () {
    return _this.attributes.remote_server_mount_id;
  });
  (0, _defineProperty2.default)(this, "setRemoteServerMountId", function (value) {
    _this.attributes.remote_server_mount_id = value;
  });
  // int64 # Number of consecutive successes before considering the backend healthy.
  (0, _defineProperty2.default)(this, "getRise", function () {
    return _this.attributes.rise;
  });
  (0, _defineProperty2.default)(this, "setRise", function (value) {
    _this.attributes.rise = value;
  });
  // string # Status of this backend.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // boolean # True if this backend is undergoing maintenance.
  (0, _defineProperty2.default)(this, "getUndergoingMaintenance", function () {
    return _this.attributes.undergoing_maintenance;
  });
  (0, _defineProperty2.default)(this, "setUndergoingMaintenance", function (value) {
    _this.attributes.undergoing_maintenance = value;
  });
  // Reset backend status to healthy
  (0, _defineProperty2.default)(this, "resetStatus", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          params.id = _this.id;
          _context.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context.next = 6;
          return _Api.default.sendRequest("/remote_mount_backends/".concat(encodeURIComponent(params.id), "/reset_status"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Parameters:
  //   enabled - boolean - True if this backend is enabled.
  //   fall - int64 - Number of consecutive failures before considering the backend unhealthy.
  //   health_check_enabled - boolean - True if health checks are enabled for this backend.
  //   health_check_type - string - Type of health check to perform.
  //   interval - int64 - Interval in seconds between health checks.
  //   min_free_cpu - double - Minimum free CPU percentage required for this backend to be considered healthy.
  //   min_free_mem - double - Minimum free memory percentage required for this backend to be considered healthy.
  //   priority - int64 - Priority of this backend.
  //   remote_path - string - Path on the remote server to treat as the root of this mount.
  //   rise - int64 - Number of consecutive successes before considering the backend healthy.
  //   canary_file_path - string - Path to the canary file used for health checks.
  //   remote_server_id - int64 - The remote server that this backend is associated with.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.fall && !(0, _utils.isInt)(params.fall))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: fall must be of type Int, received ".concat((0, _utils.getType)(params.fall)));
        case 4:
          if (!(params.health_check_type && !(0, _utils.isString)(params.health_check_type))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: health_check_type must be of type String, received ".concat((0, _utils.getType)(params.health_check_type)));
        case 5:
          if (!(params.interval && !(0, _utils.isInt)(params.interval))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: interval must be of type Int, received ".concat((0, _utils.getType)(params.interval)));
        case 6:
          if (!(params.priority && !(0, _utils.isInt)(params.priority))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: priority must be of type Int, received ".concat((0, _utils.getType)(params.priority)));
        case 7:
          if (!(params.remote_path && !(0, _utils.isString)(params.remote_path))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: remote_path must be of type String, received ".concat((0, _utils.getType)(params.remote_path)));
        case 8:
          if (!(params.rise && !(0, _utils.isInt)(params.rise))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: rise must be of type Int, received ".concat((0, _utils.getType)(params.rise)));
        case 9:
          if (!(params.canary_file_path && !(0, _utils.isString)(params.canary_file_path))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: canary_file_path must be of type String, received ".concat((0, _utils.getType)(params.canary_file_path)));
        case 10:
          if (!(params.remote_server_id && !(0, _utils.isInt)(params.remote_server_id))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: remote_server_id must be of type Int, received ".concat((0, _utils.getType)(params.remote_server_id)));
        case 11:
          if (params.id) {
            _context2.next = 13;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 12;
            break;
          }
          params.id = _this.id;
          _context2.next = 13;
          break;
        case 12:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 13:
          _context2.next = 14;
          return _Api.default.sendRequest("/remote_mount_backends/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 14:
          response = _context2.sent;
          return _context2.abrupt("return", new RemoteMountBackend(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          if (_this.attributes.id) {
            _context3.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context3.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context3.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 4;
            break;
          }
          params.id = _this.id;
          _context3.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context3.next = 6;
          return _Api.default.sendRequest("/remote_mount_backends/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!_this.attributes.id) {
            _context4.next = 2;
            break;
          }
          _context4.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context4.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context4.abrupt("return", true);
        case 2:
          _context4.next = 3;
          return RemoteMountBackend.create(_this.attributes, _this.options);
        case 3:
          newObject = _context4.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context4.abrupt("return", true);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  Object.entries(attributes).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_RemoteMountBackend = RemoteMountBackend;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `remote_server_mount_id`.
(0, _defineProperty2.default)(RemoteMountBackend, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _response$data;
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context5.next = 3;
        return _Api.default.sendRequest('/remote_mount_backends', 'GET', params, options);
      case 3:
        response = _context5.sent;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _RemoteMountBackend(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(RemoteMountBackend, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _RemoteMountBackend.list(params, options);
});
// Parameters:
//   id (required) - int64 - Remote Mount Backend ID.
(0, _defineProperty2.default)(RemoteMountBackend, "find", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(id) {
    var params,
      options,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context6.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context6.next = 4;
          return _Api.default.sendRequest("/remote_mount_backends/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _RemoteMountBackend(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x) {
    return _ref8.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(RemoteMountBackend, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _RemoteMountBackend.find(id, params, options);
});
// Parameters:
//   enabled - boolean - True if this backend is enabled.
//   fall - int64 - Number of consecutive failures before considering the backend unhealthy.
//   health_check_enabled - boolean - True if health checks are enabled for this backend.
//   health_check_type - string - Type of health check to perform.
//   interval - int64 - Interval in seconds between health checks.
//   min_free_cpu - double - Minimum free CPU percentage required for this backend to be considered healthy.
//   min_free_mem - double - Minimum free memory percentage required for this backend to be considered healthy.
//   priority - int64 - Priority of this backend.
//   remote_path - string - Path on the remote server to treat as the root of this mount.
//   rise - int64 - Number of consecutive successes before considering the backend healthy.
//   canary_file_path (required) - string - Path to the canary file used for health checks.
//   remote_server_mount_id (required) - int64 - The mount ID of the Remote Server Mount that this backend is associated with.
//   remote_server_id (required) - int64 - The remote server that this backend is associated with.
(0, _defineProperty2.default)(RemoteMountBackend, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.canary_file_path) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: canary_file_path');
      case 1:
        if (params.remote_server_mount_id) {
          _context7.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: remote_server_mount_id');
      case 2:
        if (params.remote_server_id) {
          _context7.next = 3;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: remote_server_id');
      case 3:
        if (!(params.fall && !(0, _utils.isInt)(params.fall))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: fall must be of type Int, received ".concat((0, _utils.getType)(params.fall)));
      case 4:
        if (!(params.health_check_type && !(0, _utils.isString)(params.health_check_type))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: health_check_type must be of type String, received ".concat((0, _utils.getType)(params.health_check_type)));
      case 5:
        if (!(params.interval && !(0, _utils.isInt)(params.interval))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: interval must be of type Int, received ".concat((0, _utils.getType)(params.interval)));
      case 6:
        if (!(params.priority && !(0, _utils.isInt)(params.priority))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: priority must be of type Int, received ".concat((0, _utils.getType)(params.priority)));
      case 7:
        if (!(params.remote_path && !(0, _utils.isString)(params.remote_path))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: remote_path must be of type String, received ".concat((0, _utils.getType)(params.remote_path)));
      case 8:
        if (!(params.rise && !(0, _utils.isInt)(params.rise))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: rise must be of type Int, received ".concat((0, _utils.getType)(params.rise)));
      case 9:
        if (!(params.canary_file_path && !(0, _utils.isString)(params.canary_file_path))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: canary_file_path must be of type String, received ".concat((0, _utils.getType)(params.canary_file_path)));
      case 10:
        if (!(params.remote_server_mount_id && !(0, _utils.isInt)(params.remote_server_mount_id))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: remote_server_mount_id must be of type Int, received ".concat((0, _utils.getType)(params.remote_server_mount_id)));
      case 11:
        if (!(params.remote_server_id && !(0, _utils.isInt)(params.remote_server_id))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: remote_server_id must be of type Int, received ".concat((0, _utils.getType)(params.remote_server_id)));
      case 12:
        _context7.next = 13;
        return _Api.default.sendRequest('/remote_mount_backends', 'POST', params, options);
      case 13:
        response = _context7.sent;
        return _context7.abrupt("return", new _RemoteMountBackend(response === null || response === void 0 ? void 0 : response.data, options));
      case 14:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = RemoteMountBackend;
module.exports = RemoteMountBackend;
module.exports.default = RemoteMountBackend;