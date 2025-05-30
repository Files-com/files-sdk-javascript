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
var _Restore;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class Restore
 */
var Restore = /*#__PURE__*/(0, _createClass2.default)(function Restore() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Restore);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // date-time # Restore all files deleted after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
  (0, _defineProperty2.default)(this, "getEarliestDate", function () {
    return _this.attributes.earliest_date;
  });
  (0, _defineProperty2.default)(this, "setEarliestDate", function (value) {
    _this.attributes.earliest_date = value;
  });
  // int64 # Restore Record ID.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # Number of directories that were successfully restored.
  (0, _defineProperty2.default)(this, "getDirsRestored", function () {
    return _this.attributes.dirs_restored;
  });
  (0, _defineProperty2.default)(this, "setDirsRestored", function (value) {
    _this.attributes.dirs_restored = value;
  });
  // int64 # Number of directories that were not able to be restored.
  (0, _defineProperty2.default)(this, "getDirsErrored", function () {
    return _this.attributes.dirs_errored;
  });
  (0, _defineProperty2.default)(this, "setDirsErrored", function (value) {
    _this.attributes.dirs_errored = value;
  });
  // int64 # Total number of directories processed.
  (0, _defineProperty2.default)(this, "getDirsTotal", function () {
    return _this.attributes.dirs_total;
  });
  (0, _defineProperty2.default)(this, "setDirsTotal", function (value) {
    _this.attributes.dirs_total = value;
  });
  // int64 # Number of files successfully restored.
  (0, _defineProperty2.default)(this, "getFilesRestored", function () {
    return _this.attributes.files_restored;
  });
  (0, _defineProperty2.default)(this, "setFilesRestored", function (value) {
    _this.attributes.files_restored = value;
  });
  // int64 # Number of files that were not able to be restored.
  (0, _defineProperty2.default)(this, "getFilesErrored", function () {
    return _this.attributes.files_errored;
  });
  (0, _defineProperty2.default)(this, "setFilesErrored", function (value) {
    _this.attributes.files_errored = value;
  });
  // int64 # Total number of files processed.
  (0, _defineProperty2.default)(this, "getFilesTotal", function () {
    return _this.attributes.files_total;
  });
  (0, _defineProperty2.default)(this, "setFilesTotal", function (value) {
    _this.attributes.files_total = value;
  });
  // string # Prefix of the files/folders to restore. To restore a folder, add a trailing slash to the folder name. Do not use a leading slash. To restore all deleted items, specify an empty string (`''`) in the prefix field or omit the field from the request.
  (0, _defineProperty2.default)(this, "getPrefix", function () {
    return _this.attributes.prefix;
  });
  (0, _defineProperty2.default)(this, "setPrefix", function (value) {
    _this.attributes.prefix = value;
  });
  // boolean # If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
  (0, _defineProperty2.default)(this, "getRestoreInPlace", function () {
    return _this.attributes.restore_in_place;
  });
  (0, _defineProperty2.default)(this, "setRestoreInPlace", function (value) {
    _this.attributes.restore_in_place = value;
  });
  // boolean # If true, we will also restore any Permissions that match the same path prefix from the same dates.
  (0, _defineProperty2.default)(this, "getRestoreDeletedPermissions", function () {
    return _this.attributes.restore_deleted_permissions;
  });
  (0, _defineProperty2.default)(this, "setRestoreDeletedPermissions", function (value) {
    _this.attributes.restore_deleted_permissions = value;
  });
  // string # Status of the restoration process.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
  });
  // boolean # If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
  (0, _defineProperty2.default)(this, "getUpdateTimestamps", function () {
    return _this.attributes.update_timestamps;
  });
  (0, _defineProperty2.default)(this, "setUpdateTimestamps", function (value) {
    _this.attributes.update_timestamps = value;
  });
  // array(string) # Error messages received while restoring files and/or directories. Only present if there were errors.
  (0, _defineProperty2.default)(this, "getErrorMessages", function () {
    return _this.attributes.error_messages;
  });
  (0, _defineProperty2.default)(this, "setErrorMessages", function (value) {
    _this.attributes.error_messages = value;
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
          throw new errors.NotImplementedError('The Restore object doesn\'t support updates.');
        case 1:
          _context.next = 2;
          return Restore.create(_this.attributes, _this.options);
        case 2:
          newObject = _context.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context.abrupt("return", true);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  Object.entries(attributes).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_Restore = Restore;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(Restore, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context2.next = 3;
        return _Api.default.sendRequest('/restores', 'GET', params, options);
      case 3:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Restore(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(Restore, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Restore.list(params, options);
});
// Parameters:
//   earliest_date (required) - string - Restore all files deleted after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
//   prefix - string - Prefix of the files/folders to restore. To restore a folder, add a trailing slash to the folder name. Do not use a leading slash. To restore all deleted items, specify an empty string (`''`) in the prefix field or omit the field from the request.
//   restore_deleted_permissions - boolean - If true, we will also restore any Permissions that match the same path prefix from the same dates.
//   restore_in_place - boolean - If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
//   update_timestamps - boolean - If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
(0, _defineProperty2.default)(Restore, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (params.earliest_date) {
          _context3.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: earliest_date');
      case 1:
        if (!(params.earliest_date && !(0, _utils.isString)(params.earliest_date))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: earliest_date must be of type String, received ".concat((0, _utils.getType)(params.earliest_date)));
      case 2:
        if (!(params.prefix && !(0, _utils.isString)(params.prefix))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: prefix must be of type String, received ".concat((0, _utils.getType)(params.prefix)));
      case 3:
        _context3.next = 4;
        return _Api.default.sendRequest('/restores', 'POST', params, options);
      case 4:
        response = _context3.sent;
        return _context3.abrupt("return", new _Restore(response === null || response === void 0 ? void 0 : response.data, options));
      case 5:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = Restore;
module.exports = Restore;
module.exports.default = Restore;