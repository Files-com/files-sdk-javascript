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
var _Group;
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
 * Class Group
 */
var Group = /*#__PURE__*/(0, _createClass2.default)(function Group() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Group);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Group ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // string # Group name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # A list of allowed IPs if applicable.  Newline delimited
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  (0, _defineProperty2.default)(this, "setAllowedIps", function (value) {
    _this.attributes.allowed_ips = value;
    exposeAttributes(_this, ['allowed_ips']);
  });
  // string # Comma-delimited list of user IDs who are group administrators (separated by commas)
  (0, _defineProperty2.default)(this, "getAdminIds", function () {
    return _this.attributes.admin_ids;
  });
  (0, _defineProperty2.default)(this, "setAdminIds", function (value) {
    _this.attributes.admin_ids = value;
    exposeAttributes(_this, ['admin_ids']);
  });
  // string # Notes about this group
  (0, _defineProperty2.default)(this, "getNotes", function () {
    return _this.attributes.notes;
  });
  (0, _defineProperty2.default)(this, "setNotes", function (value) {
    _this.attributes.notes = value;
    exposeAttributes(_this, ['notes']);
  });
  // string # Comma-delimited list of user IDs who belong to this group (separated by commas)
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
    exposeAttributes(_this, ['user_ids']);
  });
  // string # Comma-delimited list of usernames who belong to this group (separated by commas)
  (0, _defineProperty2.default)(this, "getUsernames", function () {
    return _this.attributes.usernames;
  });
  (0, _defineProperty2.default)(this, "setUsernames", function (value) {
    _this.attributes.usernames = value;
    exposeAttributes(_this, ['usernames']);
  });
  // int64 # AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user or Partner assignment overrides it.
  (0, _defineProperty2.default)(this, "getAiAssistantPersonalityId", function () {
    return _this.attributes.ai_assistant_personality_id;
  });
  (0, _defineProperty2.default)(this, "setAiAssistantPersonalityId", function (value) {
    _this.attributes.ai_assistant_personality_id = value;
    exposeAttributes(_this, ['ai_assistant_personality_id']);
  });
  // boolean # If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  (0, _defineProperty2.default)(this, "getFtpPermission", function () {
    return _this.attributes.ftp_permission;
  });
  (0, _defineProperty2.default)(this, "setFtpPermission", function (value) {
    _this.attributes.ftp_permission = value;
    exposeAttributes(_this, ['ftp_permission']);
  });
  // boolean # If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  (0, _defineProperty2.default)(this, "getSftpPermission", function () {
    return _this.attributes.sftp_permission;
  });
  (0, _defineProperty2.default)(this, "setSftpPermission", function (value) {
    _this.attributes.sftp_permission = value;
    exposeAttributes(_this, ['sftp_permission']);
  });
  // boolean # If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  (0, _defineProperty2.default)(this, "getDavPermission", function () {
    return _this.attributes.dav_permission;
  });
  (0, _defineProperty2.default)(this, "setDavPermission", function (value) {
    _this.attributes.dav_permission = value;
    exposeAttributes(_this, ['dav_permission']);
  });
  // boolean # If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
  (0, _defineProperty2.default)(this, "getRestapiPermission", function () {
    return _this.attributes.restapi_permission;
  });
  (0, _defineProperty2.default)(this, "setRestapiPermission", function (value) {
    _this.attributes.restapi_permission = value;
    exposeAttributes(_this, ['restapi_permission']);
  });
  // boolean # If true, users in this group can access the S3-compatible endpoint. This will override a false value of `s3_compatible_endpoint_permission` on the user level. Defaults to false.
  (0, _defineProperty2.default)(this, "getS3CompatibleEndpointPermission", function () {
    return _this.attributes.s3_compatible_endpoint_permission;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleEndpointPermission", function (value) {
    _this.attributes.s3_compatible_endpoint_permission = value;
    exposeAttributes(_this, ['s3_compatible_endpoint_permission']);
  });
  // int64 # Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  (0, _defineProperty2.default)(this, "getDesktopConfigurationProfileId", function () {
    return _this.attributes.desktop_configuration_profile_id;
  });
  (0, _defineProperty2.default)(this, "setDesktopConfigurationProfileId", function (value) {
    _this.attributes.desktop_configuration_profile_id = value;
    exposeAttributes(_this, ['desktop_configuration_profile_id']);
  });
  // int64 # Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  (0, _defineProperty2.default)(this, "getIntegrationCentricProfileId", function () {
    return _this.attributes.integration_centric_profile_id;
  });
  (0, _defineProperty2.default)(this, "setIntegrationCentricProfileId", function (value) {
    _this.attributes.integration_centric_profile_id = value;
    exposeAttributes(_this, ['integration_centric_profile_id']);
  });
  // int64 # Site ID
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
    exposeAttributes(_this, ['site_id']);
  });
  // int64 # Workspace ID
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // Parameters:
  //   notes - string - Group notes.
  //   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
  //   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user or Partner assignment overrides it.
  //   ftp_permission - boolean - If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  //   sftp_permission - boolean - If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  //   dav_permission - boolean - If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  //   restapi_permission - boolean - If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
  //   s3_compatible_endpoint_permission - boolean - If true, users in this group can access the S3-compatible endpoint. This will override a false value of `s3_compatible_endpoint_permission` on the user level. Defaults to false.
  //   desktop_configuration_profile_id - int64 - Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  //   integration_centric_profile_id - int64 - Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   name - string - Group name.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.notes !== undefined && params.notes !== null && !(0, _utils.isString)(params.notes))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(params.notes)));
        case 4:
          if (!(params.user_ids !== undefined && params.user_ids !== null && !(0, _utils.isString)(params.user_ids))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
        case 5:
          if (!(params.admin_ids !== undefined && params.admin_ids !== null && !(0, _utils.isString)(params.admin_ids))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: admin_ids must be of type String, received ".concat((0, _utils.getType)(params.admin_ids)));
        case 6:
          if (!(params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !(0, _utils.isInt)(params.ai_assistant_personality_id))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ai_assistant_personality_id must be of type Int, received ".concat((0, _utils.getType)(params.ai_assistant_personality_id)));
        case 7:
          if (!((0, _utils.isArray)(params.ftp_permission) || (0, _utils.isObject)(params.ftp_permission))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ftp_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.ftp_permission)));
        case 8:
          if (!((0, _utils.isArray)(params.sftp_permission) || (0, _utils.isObject)(params.sftp_permission))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sftp_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_permission)));
        case 9:
          if (!((0, _utils.isArray)(params.dav_permission) || (0, _utils.isObject)(params.dav_permission))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: dav_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.dav_permission)));
        case 10:
          if (!((0, _utils.isArray)(params.restapi_permission) || (0, _utils.isObject)(params.restapi_permission))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: restapi_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.restapi_permission)));
        case 11:
          if (!((0, _utils.isArray)(params.s3_compatible_endpoint_permission) || (0, _utils.isObject)(params.s3_compatible_endpoint_permission))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint_permission)));
        case 12:
          if (!(params.desktop_configuration_profile_id !== undefined && params.desktop_configuration_profile_id !== null && !(0, _utils.isInt)(params.desktop_configuration_profile_id))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: desktop_configuration_profile_id must be of type Int, received ".concat((0, _utils.getType)(params.desktop_configuration_profile_id)));
        case 13:
          if (!(params.integration_centric_profile_id !== undefined && params.integration_centric_profile_id !== null && !(0, _utils.isInt)(params.integration_centric_profile_id))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: integration_centric_profile_id must be of type Int, received ".concat((0, _utils.getType)(params.integration_centric_profile_id)));
        case 14:
          if (!(params.allowed_ips !== undefined && params.allowed_ips !== null && !(0, _utils.isString)(params.allowed_ips))) {
            _context.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
        case 15:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 16:
          if (params.id) {
            _context.next = 18;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 17;
            break;
          }
          params.id = _this.id;
          _context.next = 18;
          break;
        case 17:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 18:
          _context.next = 19;
          return _Api.default.sendRequest("/groups/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 19:
          response = _context.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context2.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 4;
            break;
          }
          params.id = _this.id;
          _context2.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context2.next = 6;
          return _Api.default.sendRequest("/groups/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var newObject;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!_this.attributes.id) {
            _context3.next = 2;
            break;
          }
          _context3.next = 1;
          return _this.update(_this.attributes);
        case 1:
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return Group.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Group = Group;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `workspace_id` or `name`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and `workspace_id`. Valid field combinations are `[ workspace_id, name ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
//   ids - string - Comma-separated list of group ids to include in results.
//   include_parent_site_groups - boolean - Include groups from the parent site.
//   include_default_workspace_groups - boolean - When scoped to a Custom Workspace, include Default Workspace groups that have permissions in that Workspace. Available to Site Administrators, and to Workspace Administrators and Folder Admins in that Workspace when the site shares its Default Workspace directory with Workspaces.
(0, _defineProperty2.default)(Group, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        if (!(params.ids !== undefined && params.ids !== null && !(0, _utils.isString)(params.ids))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ids must be of type String, received ".concat((0, _utils.getType)(params.ids)));
      case 3:
        if (!((0, _utils.isArray)(params.include_parent_site_groups) || (0, _utils.isObject)(params.include_parent_site_groups))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: include_parent_site_groups must be of type Boolean, received ".concat((0, _utils.getType)(params.include_parent_site_groups)));
      case 4:
        if (!((0, _utils.isArray)(params.include_default_workspace_groups) || (0, _utils.isObject)(params.include_default_workspace_groups))) {
          _context4.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: include_default_workspace_groups must be of type Boolean, received ".concat((0, _utils.getType)(params.include_default_workspace_groups)));
      case 5:
        _context4.next = 6;
        return _Api.default.sendRequest('/groups', 'GET', params, options);
      case 6:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Group(obj, retainedOptions(options));
        })) || []);
      case 7:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(Group, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Group.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Group, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Group.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Group ID.
(0, _defineProperty2.default)(Group, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/groups/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _Group(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Group, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Group.find(id, params, options);
});
// Parameters:
//   notes - string - Group notes.
//   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
//   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
//   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user or Partner assignment overrides it.
//   ftp_permission - boolean - If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
//   sftp_permission - boolean - If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
//   dav_permission - boolean - If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
//   restapi_permission - boolean - If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
//   s3_compatible_endpoint_permission - boolean - If true, users in this group can access the S3-compatible endpoint. This will override a false value of `s3_compatible_endpoint_permission` on the user level. Defaults to false.
//   desktop_configuration_profile_id - int64 - Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
//   integration_centric_profile_id - int64 - Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
//   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
//   name (required) - string - Group name.
//   workspace_id - int64 - Workspace ID
(0, _defineProperty2.default)(Group, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.name) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 1:
        if (!(params.notes !== undefined && params.notes !== null && !(0, _utils.isString)(params.notes))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(params.notes)));
      case 2:
        if (!(params.user_ids !== undefined && params.user_ids !== null && !(0, _utils.isString)(params.user_ids))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
      case 3:
        if (!(params.admin_ids !== undefined && params.admin_ids !== null && !(0, _utils.isString)(params.admin_ids))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: admin_ids must be of type String, received ".concat((0, _utils.getType)(params.admin_ids)));
      case 4:
        if (!(params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !(0, _utils.isInt)(params.ai_assistant_personality_id))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ai_assistant_personality_id must be of type Int, received ".concat((0, _utils.getType)(params.ai_assistant_personality_id)));
      case 5:
        if (!((0, _utils.isArray)(params.ftp_permission) || (0, _utils.isObject)(params.ftp_permission))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ftp_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.ftp_permission)));
      case 6:
        if (!((0, _utils.isArray)(params.sftp_permission) || (0, _utils.isObject)(params.sftp_permission))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_permission)));
      case 7:
        if (!((0, _utils.isArray)(params.dav_permission) || (0, _utils.isObject)(params.dav_permission))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dav_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.dav_permission)));
      case 8:
        if (!((0, _utils.isArray)(params.restapi_permission) || (0, _utils.isObject)(params.restapi_permission))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: restapi_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.restapi_permission)));
      case 9:
        if (!((0, _utils.isArray)(params.s3_compatible_endpoint_permission) || (0, _utils.isObject)(params.s3_compatible_endpoint_permission))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint_permission must be of type Boolean, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint_permission)));
      case 10:
        if (!(params.desktop_configuration_profile_id !== undefined && params.desktop_configuration_profile_id !== null && !(0, _utils.isInt)(params.desktop_configuration_profile_id))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: desktop_configuration_profile_id must be of type Int, received ".concat((0, _utils.getType)(params.desktop_configuration_profile_id)));
      case 11:
        if (!(params.integration_centric_profile_id !== undefined && params.integration_centric_profile_id !== null && !(0, _utils.isInt)(params.integration_centric_profile_id))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: integration_centric_profile_id must be of type Int, received ".concat((0, _utils.getType)(params.integration_centric_profile_id)));
      case 12:
        if (!(params.allowed_ips !== undefined && params.allowed_ips !== null && !(0, _utils.isString)(params.allowed_ips))) {
          _context6.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
      case 13:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 14:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context6.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 15:
        _context6.next = 16;
        return _Api.default.sendRequest('/groups', 'POST', params, options);
      case 16:
        response = _context6.sent;
        return _context6.abrupt("return", new _Group(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 17:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = Group;
module.exports = Group;
module.exports.default = Group;