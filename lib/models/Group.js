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
var _Group;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
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
  });
  // string # Group name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # A list of allowed IPs if applicable.  Newline delimited
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  (0, _defineProperty2.default)(this, "setAllowedIps", function (value) {
    _this.attributes.allowed_ips = value;
  });
  // string # Comma-delimited list of user IDs who are group administrators (separated by commas)
  (0, _defineProperty2.default)(this, "getAdminIds", function () {
    return _this.attributes.admin_ids;
  });
  (0, _defineProperty2.default)(this, "setAdminIds", function (value) {
    _this.attributes.admin_ids = value;
  });
  // string # Notes about this group
  (0, _defineProperty2.default)(this, "getNotes", function () {
    return _this.attributes.notes;
  });
  (0, _defineProperty2.default)(this, "setNotes", function (value) {
    _this.attributes.notes = value;
  });
  // string # Comma-delimited list of user IDs who belong to this group (separated by commas)
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
  });
  // string # Comma-delimited list of usernames who belong to this group (separated by commas)
  (0, _defineProperty2.default)(this, "getUsernames", function () {
    return _this.attributes.usernames;
  });
  (0, _defineProperty2.default)(this, "setUsernames", function (value) {
    _this.attributes.usernames = value;
  });
  // boolean # If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  (0, _defineProperty2.default)(this, "getFtpPermission", function () {
    return _this.attributes.ftp_permission;
  });
  (0, _defineProperty2.default)(this, "setFtpPermission", function (value) {
    _this.attributes.ftp_permission = value;
  });
  // boolean # If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  (0, _defineProperty2.default)(this, "getSftpPermission", function () {
    return _this.attributes.sftp_permission;
  });
  (0, _defineProperty2.default)(this, "setSftpPermission", function (value) {
    _this.attributes.sftp_permission = value;
  });
  // boolean # If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  (0, _defineProperty2.default)(this, "getDavPermission", function () {
    return _this.attributes.dav_permission;
  });
  (0, _defineProperty2.default)(this, "setDavPermission", function (value) {
    _this.attributes.dav_permission = value;
  });
  // boolean # If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
  (0, _defineProperty2.default)(this, "getRestapiPermission", function () {
    return _this.attributes.restapi_permission;
  });
  (0, _defineProperty2.default)(this, "setRestapiPermission", function (value) {
    _this.attributes.restapi_permission = value;
  });
  // int64 # Site ID
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
  });
  // Parameters:
  //   notes - string - Group notes.
  //   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
  //   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
  //   ftp_permission - boolean - If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  //   sftp_permission - boolean - If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  //   dav_permission - boolean - If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  //   restapi_permission - boolean - If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.notes && !(0, _utils.isString)(params.notes))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(params.notes)));
        case 4:
          if (!(params.user_ids && !(0, _utils.isString)(params.user_ids))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
        case 5:
          if (!(params.admin_ids && !(0, _utils.isString)(params.admin_ids))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: admin_ids must be of type String, received ".concat((0, _utils.getType)(params.admin_ids)));
        case 6:
          if (!(params.allowed_ips && !(0, _utils.isString)(params.allowed_ips))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
        case 7:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 8:
          if (params.id) {
            _context.next = 10;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 9;
            break;
          }
          params.id = _this.id;
          _context.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 10:
          _context.next = 11;
          return _Api.default.sendRequest("/groups/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 11:
          response = _context.sent;
          return _context.abrupt("return", new Group(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 12:
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
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
    var _newObject, newObject;
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
          _newObject = _context3.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return Group.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_Group = Group;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id` and `name`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
//   ids - string - Comma-separated list of group ids to include in results.
//   include_parent_site_groups - boolean - Include groups from the parent site.
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
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        if (!(params.ids && !(0, _utils.isString)(params.ids))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ids must be of type String, received ".concat((0, _utils.getType)(params.ids)));
      case 3:
        _context4.next = 4;
        return _Api.default.sendRequest('/groups', 'GET', params, options);
      case 4:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Group(obj, options);
        })) || []);
      case 5:
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
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/groups/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _Group(response === null || response === void 0 ? void 0 : response.data, options));
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
//   ftp_permission - boolean - If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
//   sftp_permission - boolean - If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
//   dav_permission - boolean - If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
//   restapi_permission - boolean - If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
//   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
//   name (required) - string - Group name.
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
        if (!(params.notes && !(0, _utils.isString)(params.notes))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(params.notes)));
      case 2:
        if (!(params.user_ids && !(0, _utils.isString)(params.user_ids))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(params.user_ids)));
      case 3:
        if (!(params.admin_ids && !(0, _utils.isString)(params.admin_ids))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: admin_ids must be of type String, received ".concat((0, _utils.getType)(params.admin_ids)));
      case 4:
        if (!(params.allowed_ips && !(0, _utils.isString)(params.allowed_ips))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
      case 5:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 6:
        _context6.next = 7;
        return _Api.default.sendRequest('/groups', 'POST', params, options);
      case 7:
        response = _context6.sent;
        return _context6.abrupt("return", new _Group(response === null || response === void 0 ? void 0 : response.data, options));
      case 8:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = Group;
module.exports = Group;
module.exports.default = Group;