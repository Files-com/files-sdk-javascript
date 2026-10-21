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
var _Permission;
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
 * Class Permission
 */
var Permission = /*#__PURE__*/(0, _createClass2.default)(function Permission() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Permission);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Permission ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // string # Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
    exposeAttributes(_this, ['path']);
  });
  // int64 # User ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // string # Username (if applicable)
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
    exposeAttributes(_this, ['username']);
  });
  // int64 # Group ID
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
    exposeAttributes(_this, ['group_id']);
  });
  // string # Group name (if applicable)
  (0, _defineProperty2.default)(this, "getGroupName", function () {
    return _this.attributes.group_name;
  });
  (0, _defineProperty2.default)(this, "setGroupName", function (value) {
    _this.attributes.group_name = value;
    exposeAttributes(_this, ['group_name']);
  });
  // array(int64) # Group IDs when this Permission requires membership in every listed group.
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
    exposeAttributes(_this, ['group_ids']);
  });
  // array(string) # Group names when this permission requires multiple groups
  (0, _defineProperty2.default)(this, "getGroupNames", function () {
    return _this.attributes.group_names;
  });
  (0, _defineProperty2.default)(this, "setGroupNames", function (value) {
    _this.attributes.group_names = value;
    exposeAttributes(_this, ['group_names']);
  });
  // int64 # Partner ID (if applicable)
  (0, _defineProperty2.default)(this, "getPartnerId", function () {
    return _this.attributes.partner_id;
  });
  (0, _defineProperty2.default)(this, "setPartnerId", function (value) {
    _this.attributes.partner_id = value;
    exposeAttributes(_this, ['partner_id']);
  });
  // string # Partner name (if applicable)
  (0, _defineProperty2.default)(this, "getPartnerName", function () {
    return _this.attributes.partner_name;
  });
  (0, _defineProperty2.default)(this, "setPartnerName", function (value) {
    _this.attributes.partner_name = value;
    exposeAttributes(_this, ['partner_name']);
  });
  // string # Permission type.  See the table referenced in the documentation for an explanation of each permission.
  (0, _defineProperty2.default)(this, "getPermission", function () {
    return _this.attributes.permission;
  });
  (0, _defineProperty2.default)(this, "setPermission", function (value) {
    _this.attributes.permission = value;
    exposeAttributes(_this, ['permission']);
  });
  // boolean # Whether this Permission applies to subfolders. Must be true for `admin` Permissions.
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
    exposeAttributes(_this, ['recursive']);
  });
  // int64 # Site ID
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
    exposeAttributes(_this, ['site_id']);
  });
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/permissions/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var newObject;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.NotImplementedError('The Permission object doesn\'t support updates.');
        case 1:
          _context2.next = 2;
          return Permission.create(_this.attributes, _this.options);
        case 2:
          newObject = _context2.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context2.abrupt("return", true);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Permission = Permission;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `group_id`, `path`, `user_id`, `partner_id` or `id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `group_id`, `partner_id` or `user_id`. Valid field combinations are `[ group_id, path ]`, `[ partner_id, path ]`, `[ user_id, path ]`, `[ user_id, group_id ]`, `[ user_id, group_id, path ]`, `[ user_id, group_id, partner_id ]` or `[ user_id, group_id, partner_id, path ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
//   path - string - Permission path.  If provided, will scope all permissions(including upward) to this path.
//   include_groups - boolean - If searching by user or group, also include user's permissions that are inherited from its groups?
//   group_id - string
//   partner_id - string
//   user_id - string
(0, _defineProperty2.default)(Permission, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context3.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 3:
        if (!((0, _utils.isArray)(params.include_groups) || (0, _utils.isObject)(params.include_groups))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: include_groups must be of type Boolean, received ".concat((0, _utils.getType)(params.include_groups)));
      case 4:
        if (!(params.group_id !== undefined && params.group_id !== null && !(0, _utils.isString)(params.group_id))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type String, received ".concat((0, _utils.getType)(params.group_id)));
      case 5:
        if (!(params.partner_id !== undefined && params.partner_id !== null && !(0, _utils.isString)(params.partner_id))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: partner_id must be of type String, received ".concat((0, _utils.getType)(params.partner_id)));
      case 6:
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isString)(params.user_id))) {
          _context3.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type String, received ".concat((0, _utils.getType)(params.user_id)));
      case 7:
        _context3.next = 8;
        return _Api.default.sendRequest('/permissions', 'GET', params, options);
      case 8:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Permission(obj, retainedOptions(options));
        })) || []);
      case 9:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(Permission, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Permission.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Permission, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Permission.list(pageParams, pageOptions);
  });
});
// Parameters:
//   path (required) - string - Folder path
//   group_id - int64 - Group ID. Provide `group_name` or `group_id`
//   group_ids - string - Group IDs when the Permission requires membership in every listed group. If sent as a string, it should be comma-delimited.
//   permission - string - Permission type.  Can be `admin`, `full`, `readonly`, `writeonly`, `list`, or `history`
//   recursive - boolean - Apply to subfolders recursively? Must be true for `admin` Permissions.
//   partner_id - int64 - Partner ID if this Permission belongs to a partner.
//   user_id - int64 - User ID.  Provide `username` or `user_id`
//   username - string - User username.  Provide `username` or `user_id`
//   group_name - string - Group name.  Provide `group_name` or `group_id`
//   site_id - int64 - Site ID. If not provided, will default to current site. Used when creating a permission for a child site.
(0, _defineProperty2.default)(Permission, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (params.path) {
          _context4.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: path');
      case 1:
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 2:
        if (!(params.group_id !== undefined && params.group_id !== null && !(0, _utils.isInt)(params.group_id))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params.group_id)));
      case 3:
        if (!(params.group_ids !== undefined && params.group_ids !== null && !(0, _utils.isString)(params.group_ids))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
      case 4:
        if (!(params.permission !== undefined && params.permission !== null && !(0, _utils.isString)(params.permission))) {
          _context4.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission must be of type String, received ".concat((0, _utils.getType)(params.permission)));
      case 5:
        if (!((0, _utils.isArray)(params.recursive) || (0, _utils.isObject)(params.recursive))) {
          _context4.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: recursive must be of type Boolean, received ".concat((0, _utils.getType)(params.recursive)));
      case 6:
        if (!(params.partner_id !== undefined && params.partner_id !== null && !(0, _utils.isInt)(params.partner_id))) {
          _context4.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: partner_id must be of type Int, received ".concat((0, _utils.getType)(params.partner_id)));
      case 7:
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context4.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 8:
        if (!(params.username !== undefined && params.username !== null && !(0, _utils.isString)(params.username))) {
          _context4.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
      case 9:
        if (!(params.group_name !== undefined && params.group_name !== null && !(0, _utils.isString)(params.group_name))) {
          _context4.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_name must be of type String, received ".concat((0, _utils.getType)(params.group_name)));
      case 10:
        if (!(params.site_id !== undefined && params.site_id !== null && !(0, _utils.isInt)(params.site_id))) {
          _context4.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_id must be of type Int, received ".concat((0, _utils.getType)(params.site_id)));
      case 11:
        _context4.next = 12;
        return _Api.default.sendRequest('/permissions', 'POST', params, options);
      case 12:
        response = _context4.sent;
        return _context4.abrupt("return", new _Permission(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 13:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
var _default = exports.default = Permission;
module.exports = Permission;
module.exports.default = Permission;