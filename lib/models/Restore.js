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
var _Restore;
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
  // date-time # Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
  (0, _defineProperty2.default)(this, "getEarliestDate", function () {
    return _this.attributes.earliest_date;
  });
  (0, _defineProperty2.default)(this, "setEarliestDate", function (value) {
    _this.attributes.earliest_date = value;
    exposeAttributes(_this, ['earliest_date']);
  });
  // int64 # Restore Record ID.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // int64 # Number of directories that were successfully restored.
  (0, _defineProperty2.default)(this, "getDirsRestored", function () {
    return _this.attributes.dirs_restored;
  });
  (0, _defineProperty2.default)(this, "setDirsRestored", function (value) {
    _this.attributes.dirs_restored = value;
    exposeAttributes(_this, ['dirs_restored']);
  });
  // int64 # Number of directories that were not able to be restored.
  (0, _defineProperty2.default)(this, "getDirsErrored", function () {
    return _this.attributes.dirs_errored;
  });
  (0, _defineProperty2.default)(this, "setDirsErrored", function (value) {
    _this.attributes.dirs_errored = value;
    exposeAttributes(_this, ['dirs_errored']);
  });
  // int64 # Total number of directories processed.
  (0, _defineProperty2.default)(this, "getDirsTotal", function () {
    return _this.attributes.dirs_total;
  });
  (0, _defineProperty2.default)(this, "setDirsTotal", function (value) {
    _this.attributes.dirs_total = value;
    exposeAttributes(_this, ['dirs_total']);
  });
  // int64 # Number of files successfully restored.
  (0, _defineProperty2.default)(this, "getFilesRestored", function () {
    return _this.attributes.files_restored;
  });
  (0, _defineProperty2.default)(this, "setFilesRestored", function (value) {
    _this.attributes.files_restored = value;
    exposeAttributes(_this, ['files_restored']);
  });
  // int64 # Number of files that were not able to be restored.
  (0, _defineProperty2.default)(this, "getFilesErrored", function () {
    return _this.attributes.files_errored;
  });
  (0, _defineProperty2.default)(this, "setFilesErrored", function (value) {
    _this.attributes.files_errored = value;
    exposeAttributes(_this, ['files_errored']);
  });
  // int64 # Total number of files processed.
  (0, _defineProperty2.default)(this, "getFilesTotal", function () {
    return _this.attributes.files_total;
  });
  (0, _defineProperty2.default)(this, "setFilesTotal", function (value) {
    _this.attributes.files_total = value;
    exposeAttributes(_this, ['files_total']);
  });
  // string # Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not use a leading slash. To restore all deleted items of the selected restoration type within the selected site or workspace scope, specify an empty string (`''`) or omit the field.
  (0, _defineProperty2.default)(this, "getPrefix", function () {
    return _this.attributes.prefix;
  });
  (0, _defineProperty2.default)(this, "setPrefix", function (value) {
    _this.attributes.prefix = value;
    exposeAttributes(_this, ['prefix']);
  });
  // string # Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
  (0, _defineProperty2.default)(this, "getRestorationType", function () {
    return _this.attributes.restoration_type;
  });
  (0, _defineProperty2.default)(this, "setRestorationType", function (value) {
    _this.attributes.restoration_type = value;
    exposeAttributes(_this, ['restoration_type']);
  });
  // boolean # If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
  (0, _defineProperty2.default)(this, "getRestoreInPlace", function () {
    return _this.attributes.restore_in_place;
  });
  (0, _defineProperty2.default)(this, "setRestoreInPlace", function (value) {
    _this.attributes.restore_in_place = value;
    exposeAttributes(_this, ['restore_in_place']);
  });
  // boolean # If true, a user restore restores permissions deleted along with the selected users, including permissions removed independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`, remain deleted. An in-place file restore restores user and group permissions on returned folders and their subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including permissions removed independently within that window. File restores into a new folder do not restore permissions.
  (0, _defineProperty2.default)(this, "getRestoreDeletedPermissions", function () {
    return _this.attributes.restore_deleted_permissions;
  });
  (0, _defineProperty2.default)(this, "setRestoreDeletedPermissions", function (value) {
    _this.attributes.restore_deleted_permissions = value;
    exposeAttributes(_this, ['restore_deleted_permissions']);
  });
  // int64 # Number of users successfully restored (only present for `restoration_type=users`).
  (0, _defineProperty2.default)(this, "getUsersRestored", function () {
    return _this.attributes.users_restored;
  });
  (0, _defineProperty2.default)(this, "setUsersRestored", function (value) {
    _this.attributes.users_restored = value;
    exposeAttributes(_this, ['users_restored']);
  });
  // int64 # Number of users that failed to restore (only present for `restoration_type=users`).
  (0, _defineProperty2.default)(this, "getUsersErrored", function () {
    return _this.attributes.users_errored;
  });
  (0, _defineProperty2.default)(this, "setUsersErrored", function (value) {
    _this.attributes.users_errored = value;
    exposeAttributes(_this, ['users_errored']);
  });
  // int64 # Total number of users processed (only present for `restoration_type=users`).
  (0, _defineProperty2.default)(this, "getUsersTotal", function () {
    return _this.attributes.users_total;
  });
  (0, _defineProperty2.default)(this, "setUsersTotal", function (value) {
    _this.attributes.users_total = value;
    exposeAttributes(_this, ['users_total']);
  });
  // int64 # Number of API keys restored (only present for `restoration_type=users`).
  (0, _defineProperty2.default)(this, "getApiKeysRestored", function () {
    return _this.attributes.api_keys_restored;
  });
  (0, _defineProperty2.default)(this, "setApiKeysRestored", function (value) {
    _this.attributes.api_keys_restored = value;
    exposeAttributes(_this, ['api_keys_restored']);
  });
  // int64 # Number of public keys restored (only present for `restoration_type=users`).
  (0, _defineProperty2.default)(this, "getPublicKeysRestored", function () {
    return _this.attributes.public_keys_restored;
  });
  (0, _defineProperty2.default)(this, "setPublicKeysRestored", function (value) {
    _this.attributes.public_keys_restored = value;
    exposeAttributes(_this, ['public_keys_restored']);
  });
  // int64 # Number of two factor authentication methods restored (only present for `restoration_type=users`).
  (0, _defineProperty2.default)(this, "getTwoFactorAuthenticationMethodsRestored", function () {
    return _this.attributes.two_factor_authentication_methods_restored;
  });
  (0, _defineProperty2.default)(this, "setTwoFactorAuthenticationMethodsRestored", function (value) {
    _this.attributes.two_factor_authentication_methods_restored = value;
    exposeAttributes(_this, ['two_factor_authentication_methods_restored']);
  });
  // string # Status of the restoration process.
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
    exposeAttributes(_this, ['status']);
  });
  // boolean # If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
  (0, _defineProperty2.default)(this, "getUpdateTimestamps", function () {
    return _this.attributes.update_timestamps;
  });
  (0, _defineProperty2.default)(this, "setUpdateTimestamps", function (value) {
    _this.attributes.update_timestamps = value;
    exposeAttributes(_this, ['update_timestamps']);
  });
  // int64 # Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // array(string) # Error messages received while restoring files and/or directories. Only present if there were errors.
  (0, _defineProperty2.default)(this, "getErrorMessages", function () {
    return _this.attributes.error_messages;
  });
  (0, _defineProperty2.default)(this, "setErrorMessages", function (value) {
    _this.attributes.error_messages = value;
    exposeAttributes(_this, ['error_messages']);
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
_Restore = Restore;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `restoration_type`.
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
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
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
          return new _Restore(obj, retainedOptions(options));
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
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Restore, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Restore.list(pageParams, pageOptions);
  });
});
// Parameters:
//   earliest_date (required) - string - Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
//   prefix - string - Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not use a leading slash. To restore all deleted items of the selected restoration type within the selected site or workspace scope, specify an empty string (`''`) or omit the field.
//   restoration_type - string - Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
//   restore_deleted_permissions - boolean - If true, a user restore restores permissions deleted along with the selected users, including permissions removed independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`, remain deleted. An in-place file restore restores user and group permissions on returned folders and their subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including permissions removed independently within that window. File restores into a new folder do not restore permissions.
//   restore_in_place - boolean - If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
//   update_timestamps - boolean - If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
//   workspace_id - int64 - Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope.
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
        if (!(params.earliest_date !== undefined && params.earliest_date !== null && !(0, _utils.isString)(params.earliest_date))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: earliest_date must be of type String, received ".concat((0, _utils.getType)(params.earliest_date)));
      case 2:
        if (!(params.prefix !== undefined && params.prefix !== null && !(0, _utils.isString)(params.prefix))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: prefix must be of type String, received ".concat((0, _utils.getType)(params.prefix)));
      case 3:
        if (!(params.restoration_type !== undefined && params.restoration_type !== null && !(0, _utils.isString)(params.restoration_type))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: restoration_type must be of type String, received ".concat((0, _utils.getType)(params.restoration_type)));
      case 4:
        if (!((0, _utils.isArray)(params.restore_deleted_permissions) || (0, _utils.isObject)(params.restore_deleted_permissions))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: restore_deleted_permissions must be of type Boolean, received ".concat((0, _utils.getType)(params.restore_deleted_permissions)));
      case 5:
        if (!((0, _utils.isArray)(params.restore_in_place) || (0, _utils.isObject)(params.restore_in_place))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: restore_in_place must be of type Boolean, received ".concat((0, _utils.getType)(params.restore_in_place)));
      case 6:
        if (!((0, _utils.isArray)(params.update_timestamps) || (0, _utils.isObject)(params.update_timestamps))) {
          _context3.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: update_timestamps must be of type Boolean, received ".concat((0, _utils.getType)(params.update_timestamps)));
      case 7:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 8:
        _context3.next = 9;
        return _Api.default.sendRequest('/restores', 'POST', params, options);
      case 9:
        response = _context3.sent;
        return _context3.abrupt("return", new _Restore(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 10:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = Restore;
module.exports = Restore;
module.exports.default = Restore;