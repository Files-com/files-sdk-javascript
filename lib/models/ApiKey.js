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
var _ApiKey;
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
 * Class ApiKey
 */
var ApiKey = /*#__PURE__*/(0, _createClass2.default)(function ApiKey() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ApiKey);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # API Key ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // string # Unique label that describes this API key.  Useful for external systems where you may have API keys from multiple accounts and want a human-readable label for each key.
  (0, _defineProperty2.default)(this, "getDescriptiveLabel", function () {
    return _this.attributes.descriptive_label;
  });
  (0, _defineProperty2.default)(this, "setDescriptiveLabel", function (value) {
    _this.attributes.descriptive_label = value;
    exposeAttributes(_this, ['descriptive_label']);
  });
  // string # User-supplied description of API key.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
    exposeAttributes(_this, ['description']);
  });
  // date-time # Time which API Key was created
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // date-time # API Key expiration date
  (0, _defineProperty2.default)(this, "getExpiresAt", function () {
    return _this.attributes.expires_at;
  });
  (0, _defineProperty2.default)(this, "setExpiresAt", function (value) {
    _this.attributes.expires_at = value;
    exposeAttributes(_this, ['expires_at']);
  });
  // string # API Key actual key string
  (0, _defineProperty2.default)(this, "getKey", function () {
    return _this.attributes.key;
  });
  (0, _defineProperty2.default)(this, "setKey", function (value) {
    _this.attributes.key = value;
    exposeAttributes(_this, ['key']);
  });
  // boolean # If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  (0, _defineProperty2.default)(this, "getAwsStyleCredentials", function () {
    return _this.attributes.aws_style_credentials;
  });
  (0, _defineProperty2.default)(this, "setAwsStyleCredentials", function (value) {
    _this.attributes.aws_style_credentials = value;
    exposeAttributes(_this, ['aws_style_credentials']);
  });
  // string # AWS Access Key ID to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  (0, _defineProperty2.default)(this, "getAwsAccessKeyId", function () {
    return _this.attributes.aws_access_key_id;
  });
  (0, _defineProperty2.default)(this, "setAwsAccessKeyId", function (value) {
    _this.attributes.aws_access_key_id = value;
    exposeAttributes(_this, ['aws_access_key_id']);
  });
  // string # AWS Secret Key to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  (0, _defineProperty2.default)(this, "getAwsSecretKey", function () {
    return _this.attributes.aws_secret_key;
  });
  (0, _defineProperty2.default)(this, "setAwsSecretKey", function (value) {
    _this.attributes.aws_secret_key = value;
    exposeAttributes(_this, ['aws_secret_key']);
  });
  // date-time # API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be up to 3 hours later than this timestamp.
  (0, _defineProperty2.default)(this, "getLastUseAt", function () {
    return _this.attributes.last_use_at;
  });
  (0, _defineProperty2.default)(this, "setLastUseAt", function (value) {
    _this.attributes.last_use_at = value;
    exposeAttributes(_this, ['last_use_at']);
  });
  // string # Internal name for the API Key.  For your use.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user. Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
  (0, _defineProperty2.default)(this, "getPermissionSet", function () {
    return _this.attributes.permission_set;
  });
  (0, _defineProperty2.default)(this, "setPermissionSet", function (value) {
    _this.attributes.permission_set = value;
    exposeAttributes(_this, ['permission_set']);
  });
  // string # If this API key represents a Desktop app, what platform was it created on?
  (0, _defineProperty2.default)(this, "getPlatform", function () {
    return _this.attributes.platform;
  });
  (0, _defineProperty2.default)(this, "setPlatform", function (value) {
    _this.attributes.platform = value;
    exposeAttributes(_this, ['platform']);
  });
  // int64 # Site ID
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
    exposeAttributes(_this, ['site_id']);
  });
  // string # Site Name
  (0, _defineProperty2.default)(this, "getSiteName", function () {
    return _this.attributes.site_name;
  });
  (0, _defineProperty2.default)(this, "setSiteName", function (value) {
    _this.attributes.site_name = value;
    exposeAttributes(_this, ['site_name']);
  });
  // string # URL for API host.
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
    exposeAttributes(_this, ['url']);
  });
  // int64 # User ID for the owner of this API Key.  May be blank for Site-wide API Keys.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // int64 # Workspace ID for this API Key. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // string # Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET /file_migrations/{id}`, a key with a path can read only migrations it started. Does not grant access beyond the owning user's permissions. Optional for `files_only` keys and required for `office_integration` keys, which need a path the owning user can read. Keys with any other permission set cannot have a path.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
    exposeAttributes(_this, ['path']);
  });
  // Parameters:
  //   description - string - User-supplied description of API key.
  //   expires_at - string - API Key expiration date
  //   name - string - Internal name for the API Key.  For your use.
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
          if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 4:
          if (!(params.expires_at !== undefined && params.expires_at !== null && !(0, _utils.isString)(params.expires_at))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
        case 5:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 6:
          if (params.id) {
            _context.next = 8;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 7;
            break;
          }
          params.id = _this.id;
          _context.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 8:
          _context.next = 9;
          return _Api.default.sendRequest("/api_keys/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 9:
          response = _context.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
        case 10:
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
          return _Api.default.sendRequest("/api_keys/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return ApiKey.create(_this.attributes, _this.options);
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
_ApiKey = ApiKey;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id` and `workspace_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `aws_style_credentials` and `expires_at`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `expires_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `expires_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `expires_at`.
(0, _defineProperty2.default)(ApiKey, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        _context4.next = 4;
        return _Api.default.sendRequest('/api_keys', 'GET', params, options);
      case 4:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _ApiKey(obj, retainedOptions(options));
        })) || []);
      case 5:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(ApiKey, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ApiKey.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(ApiKey, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _ApiKey.list(pageParams, pageOptions);
  });
});
(0, _defineProperty2.default)(ApiKey, "findCurrent", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        _context5.next = 1;
        return _Api.default.sendRequest('/api_key', 'GET', {}, options);
      case 1:
        response = _context5.sent;
        return _context5.abrupt("return", new _ApiKey(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 2:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
// Parameters:
//   id (required) - int64 - Api Key ID.
(0, _defineProperty2.default)(ApiKey, "find", /*#__PURE__*/function () {
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context6.next = 4;
          return _Api.default.sendRequest("/api_keys/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _ApiKey(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
(0, _defineProperty2.default)(ApiKey, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _ApiKey.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   description - string - User-supplied description of API key.
//   expires_at - string - API Key expiration date
//   name (required) - string - Internal name for the API Key.  For your use.
//   aws_style_credentials - boolean - If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
//   path - string - Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET /file_migrations/{id}`, a key with a path can read only migrations it started. Does not grant access beyond the owning user's permissions. Optional for `files_only` keys and required for `office_integration` keys, which need a path the owning user can read. Keys with any other permission set cannot have a path.
//   permission_set - string - Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user. Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
//   workspace_id - int64 - Workspace ID for this API Key. `0` means the default workspace.
(0, _defineProperty2.default)(ApiKey, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.name) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 1:
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 3:
        if (!(params.expires_at !== undefined && params.expires_at !== null && !(0, _utils.isString)(params.expires_at))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
      case 4:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 5:
        if (!((0, _utils.isArray)(params.aws_style_credentials) || (0, _utils.isObject)(params.aws_style_credentials))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_style_credentials must be of type Boolean, received ".concat((0, _utils.getType)(params.aws_style_credentials)));
      case 6:
        if (!(params.path !== undefined && params.path !== null && !(0, _utils.isString)(params.path))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 7:
        if (!(params.permission_set !== undefined && params.permission_set !== null && !(0, _utils.isString)(params.permission_set))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
      case 8:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 9:
        _context7.next = 10;
        return _Api.default.sendRequest('/api_keys', 'POST', params, options);
      case 10:
        response = _context7.sent;
        return _context7.abrupt("return", new _ApiKey(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 11:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
// Parameters:
//   expires_at - string - API Key expiration date
//   name - string - Internal name for the API Key.  For your use.
//   permission_set - string - Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user. Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
(0, _defineProperty2.default)(ApiKey, "updateCurrent", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var params,
    options,
    response,
    _args8 = arguments;
  return _regenerator.default.wrap(function (_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
        options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
        if (!(params.expires_at !== undefined && params.expires_at !== null && !(0, _utils.isString)(params.expires_at))) {
          _context8.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
      case 1:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context8.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 2:
        if (!(params.permission_set !== undefined && params.permission_set !== null && !(0, _utils.isString)(params.permission_set))) {
          _context8.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
      case 3:
        _context8.next = 4;
        return _Api.default.sendRequest('/api_key', 'PATCH', params, options);
      case 4:
        response = _context8.sent;
        return _context8.abrupt("return", new _ApiKey(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 5:
      case "end":
        return _context8.stop();
    }
  }, _callee8);
})));
(0, _defineProperty2.default)(ApiKey, "deleteCurrent", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9() {
  var options,
    _args9 = arguments;
  return _regenerator.default.wrap(function (_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
        _context9.next = 1;
        return _Api.default.sendRequest('/api_key', 'DELETE', {}, options);
      case 1:
      case "end":
        return _context9.stop();
    }
  }, _callee9);
})));
var _default = exports.default = ApiKey;
module.exports = ApiKey;
module.exports.default = ApiKey;