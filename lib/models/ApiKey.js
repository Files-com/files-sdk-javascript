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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  });
  // string # Unique label that describes this API key.  Useful for external systems where you may have API keys from multiple accounts and want a human-readable label for each key.
  (0, _defineProperty2.default)(this, "getDescriptiveLabel", function () {
    return _this.attributes.descriptive_label;
  });
  (0, _defineProperty2.default)(this, "setDescriptiveLabel", function (value) {
    _this.attributes.descriptive_label = value;
  });
  // string # User-supplied description of API key.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
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
  });
  // string # API Key actual key string
  (0, _defineProperty2.default)(this, "getKey", function () {
    return _this.attributes.key;
  });
  (0, _defineProperty2.default)(this, "setKey", function (value) {
    _this.attributes.key = value;
  });
  // date-time # API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be up to 3 hours later than this timestamp.
  (0, _defineProperty2.default)(this, "getLastUseAt", function () {
    return _this.attributes.last_use_at;
  });
  (0, _defineProperty2.default)(this, "setLastUseAt", function (value) {
    _this.attributes.last_use_at = value;
  });
  // string # Internal name for the API Key.  For your use.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Folder path restriction for this api key. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // string # Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
  (0, _defineProperty2.default)(this, "getPermissionSet", function () {
    return _this.attributes.permission_set;
  });
  (0, _defineProperty2.default)(this, "setPermissionSet", function (value) {
    _this.attributes.permission_set = value;
  });
  // string # If this API key represents a Desktop app, what platform was it created on?
  (0, _defineProperty2.default)(this, "getPlatform", function () {
    return _this.attributes.platform;
  });
  (0, _defineProperty2.default)(this, "setPlatform", function (value) {
    _this.attributes.platform = value;
  });
  // string # URL for API host.
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
  });
  // int64 # User ID for the owner of this API Key.  May be blank for Site-wide API Keys.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // Parameters:
  //   name - string - Internal name for the API Key.  For your use.
  //   description - string - User-supplied description of API key.
  //   expires_at - string - API Key expiration date
  //   permission_set - string - Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));
        case 10:
          if (!(params['description'] && !(0, _utils.isString)(params['description']))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(description)));
        case 12:
          if (!(params['expires_at'] && !(0, _utils.isString)(params['expires_at']))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(expires_at)));
        case 14:
          if (!(params['permission_set'] && !(0, _utils.isString)(params['permission_set']))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(permission_set)));
        case 16:
          if (params['id']) {
            _context.next = 22;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 21;
            break;
          }
          params['id'] = _this.id;
          _context.next = 22;
          break;
        case 21:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 22:
          _context.next = 24;
          return _Api.default.sendRequest("/api_keys/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 24:
          response = _context.sent;
          return _context.abrupt("return", new ApiKey(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (params['id']) {
            _context2.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 13;
            break;
          }
          params['id'] = _this.id;
          _context2.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context2.next = 16;
          return _Api.default.sendRequest("/api_keys/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
        case 16:
          response = _context2.sent;
          return _context2.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = ApiKey.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
      key = _ref4[0],
      value = _ref4[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[expires_at]=desc`). Valid fields are `expires_at`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `expires_at`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `expires_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `expires_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `expires_at`.
(0, _defineProperty2.default)(ApiKey, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 6:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 8:
        _context3.next = 10;
        return _Api.default.sendRequest("/api_keys", 'GET', params, options);
      case 10:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new ApiKey(obj, options);
        })) || []);
      case 12:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(ApiKey, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return ApiKey.list(params, options);
});
(0, _defineProperty2.default)(ApiKey, "findCurrent", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        _context4.next = 3;
        return _Api.default.sendRequest("/api_key", 'GET', {}, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", new ApiKey(response === null || response === void 0 ? void 0 : response.data, options));
      case 5:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
// Parameters:
//   id (required) - int64 - Api Key ID.
(0, _defineProperty2.default)(ApiKey, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context5.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context5.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context5.next = 11;
          return _Api.default.sendRequest("/api_keys/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context5.sent;
          return _context5.abrupt("return", new ApiKey(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(ApiKey, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return ApiKey.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   name - string - Internal name for the API Key.  For your use.
//   description - string - User-supplied description of API key.
//   expires_at - string - API Key expiration date
//   permission_set - string - Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
//   path - string - Folder path restriction for this api key.
(0, _defineProperty2.default)(ApiKey, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params['name'])));
      case 6:
        if (!(params['description'] && !(0, _utils.isString)(params['description']))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params['description'])));
      case 8:
        if (!(params['expires_at'] && !(0, _utils.isString)(params['expires_at']))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params['expires_at'])));
      case 10:
        if (!(params['permission_set'] && !(0, _utils.isString)(params['permission_set']))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params['permission_set'])));
      case 12:
        if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params['path'])));
      case 14:
        _context6.next = 16;
        return _Api.default.sendRequest("/api_keys", 'POST', params, options);
      case 16:
        response = _context6.sent;
        return _context6.abrupt("return", new ApiKey(response === null || response === void 0 ? void 0 : response.data, options));
      case 18:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
// Parameters:
//   expires_at - string - API Key expiration date
//   name - string - Internal name for the API Key.  For your use.
//   permission_set - string - Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
(0, _defineProperty2.default)(ApiKey, "updateCurrent", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function _callee7$(_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (!(params['expires_at'] && !(0, _utils.isString)(params['expires_at']))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params['expires_at'])));
      case 4:
        if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params['name'])));
      case 6:
        if (!(params['permission_set'] && !(0, _utils.isString)(params['permission_set']))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params['permission_set'])));
      case 8:
        _context7.next = 10;
        return _Api.default.sendRequest("/api_key", 'PATCH', params, options);
      case 10:
        response = _context7.sent;
        return _context7.abrupt("return", new ApiKey(response === null || response === void 0 ? void 0 : response.data, options));
      case 12:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
(0, _defineProperty2.default)(ApiKey, "deleteCurrent", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var options,
    response,
    _args8 = arguments;
  return _regenerator.default.wrap(function _callee8$(_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
        _context8.next = 3;
        return _Api.default.sendRequest("/api_key", 'DELETE', {}, options);
      case 3:
        response = _context8.sent;
        return _context8.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
      case 5:
      case "end":
        return _context8.stop();
    }
  }, _callee8);
})));
var _default = ApiKey;
exports.default = _default;