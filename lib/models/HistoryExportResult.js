"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class HistoryExportResult
 */
var HistoryExportResult = function HistoryExportResult() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, HistoryExportResult);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "getFileId", function () {
    return _this.attributes.file_id;
  });
  (0, _defineProperty2.default)(this, "getParentId", function () {
    return _this.attributes.parent_id;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "getFolder", function () {
    return _this.attributes.folder;
  });
  (0, _defineProperty2.default)(this, "getSrc", function () {
    return _this.attributes.src;
  });
  (0, _defineProperty2.default)(this, "getDestination", function () {
    return _this.attributes.destination;
  });
  (0, _defineProperty2.default)(this, "getIp", function () {
    return _this.attributes.ip;
  });
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "getFailureType", function () {
    return _this.attributes.failure_type;
  });
  (0, _defineProperty2.default)(this, "getInterface", function () {
    return _this.attributes.interface;
  });
  (0, _defineProperty2.default)(this, "getTargetId", function () {
    return _this.attributes.target_id;
  });
  (0, _defineProperty2.default)(this, "getTargetName", function () {
    return _this.attributes.target_name;
  });
  (0, _defineProperty2.default)(this, "getTargetPermission", function () {
    return _this.attributes.target_permission;
  });
  (0, _defineProperty2.default)(this, "getTargetRecursive", function () {
    return _this.attributes.target_recursive;
  });
  (0, _defineProperty2.default)(this, "getTargetExpiresAt", function () {
    return _this.attributes.target_expires_at;
  });
  (0, _defineProperty2.default)(this, "getTargetPermissionSet", function () {
    return _this.attributes.target_permission_set;
  });
  (0, _defineProperty2.default)(this, "getTargetPlatform", function () {
    return _this.attributes.target_platform;
  });
  (0, _defineProperty2.default)(this, "getTargetUsername", function () {
    return _this.attributes.target_username;
  });
  (0, _defineProperty2.default)(this, "getTargetUserId", function () {
    return _this.attributes.target_user_id;
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
};

(0, _defineProperty2.default)(HistoryExportResult, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;

  var params,
      options,
      response,
      _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (params['history_export_id']) {
            _context.next = 4;
            break;
          }

          throw new Error('Parameter missing: history_export_id');

        case 4:
          if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(user_id)));

        case 6:
          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 8:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context.next = 10;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 10:
          if (!(params['history_export_id'] && !(0, _utils.isInt)(params['history_export_id']))) {
            _context.next = 12;
            break;
          }

          throw new Error("Bad parameter: history_export_id must be of type Int, received ".concat((0, _utils.getType)(history_export_id)));

        case 12:
          _context.next = 14;
          return _Api.default.sendRequest("/history_export_results", 'GET', params, options);

        case 14:
          response = _context.sent;
          return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new HistoryExportResult(obj, options);
          })) || []);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(HistoryExportResult, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return HistoryExportResult.list(params, options);
});
var _default = HistoryExportResult;
exports.default = _default;