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
var _Behavior;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class Behavior
 */
var Behavior = /*#__PURE__*/(0, _createClass2.default)(function Behavior() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Behavior);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Folder behavior ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Folder path.  Note that Behavior paths cannot be updated once initially set.  You will need to remove and re-create the behavior on the new path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  // string # URL for attached file
  (0, _defineProperty2.default)(this, "getAttachmentUrl", function () {
    return _this.attributes.attachment_url;
  });
  (0, _defineProperty2.default)(this, "setAttachmentUrl", function (value) {
    _this.attributes.attachment_url = value;
  });
  // string # Behavior type.
  (0, _defineProperty2.default)(this, "getBehavior", function () {
    return _this.attributes.behavior;
  });
  (0, _defineProperty2.default)(this, "setBehavior", function (value) {
    _this.attributes.behavior = value;
  });
  // string # Name for this behavior.
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Description for this behavior.
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // object # Settings for this behavior.  See the section above for an example value to provide here.  Formatting is different for each Behavior type.  May be sent as nested JSON or a single JSON-encoded string.  If using XML encoding for the API call, this data must be sent as a JSON-encoded string.
  (0, _defineProperty2.default)(this, "getValue", function () {
    return _this.attributes.value;
  });
  (0, _defineProperty2.default)(this, "setValue", function (value) {
    _this.attributes.value = value;
  });
  // boolean # If true, the parent folder's behavior will be disabled for this folder and its children.
  (0, _defineProperty2.default)(this, "getDisableParentFolderBehavior", function () {
    return _this.attributes.disable_parent_folder_behavior;
  });
  (0, _defineProperty2.default)(this, "setDisableParentFolderBehavior", function (value) {
    _this.attributes.disable_parent_folder_behavior = value;
  });
  // boolean # Is behavior recursive?
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
  });
  // file # Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach that file here.
  (0, _defineProperty2.default)(this, "getAttachmentFile", function () {
    return _this.attributes.attachment_file;
  });
  (0, _defineProperty2.default)(this, "setAttachmentFile", function (value) {
    _this.attributes.attachment_file = value;
  });
  // boolean # If `true`, delete the file stored in `attachment`.
  (0, _defineProperty2.default)(this, "getAttachmentDelete", function () {
    return _this.attributes.attachment_delete;
  });
  (0, _defineProperty2.default)(this, "setAttachmentDelete", function (value) {
    _this.attributes.attachment_delete = value;
  });
  // Parameters:
  //   value - string - This field stores a hash of data specific to the type of behavior. See The Behavior Types section for example values for each type of behavior.
  //   attachment_file - file - Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach that file here.
  //   disable_parent_folder_behavior - boolean - If `true`, the parent folder's behavior will be disabled for this folder and its children. This is the main mechanism for canceling out a `recursive` behavior higher in the folder tree.
  //   recursive - boolean - If `true`, behavior is treated as recursive, meaning that it impacts child folders as well.
  //   name - string - Name for this behavior.
  //   description - string - Description for this behavior.
  //   attachment_delete - boolean - If `true`, delete the file stored in `attachment`.
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
          if (!(params.value && !(0, _utils.isString)(params.value))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: value must be of type String, received ".concat((0, _utils.getType)(params.value)));
        case 4:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 5:
          if (!(params.description && !(0, _utils.isString)(params.description))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
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
          return _Api.default.sendRequest("/behaviors/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 9:
          response = _context.sent;
          return _context.abrupt("return", new Behavior(response === null || response === void 0 ? void 0 : response.data, _this.options));
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
          return _Api.default.sendRequest("/behaviors/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return Behavior.create(_this.attributes, _this.options);
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
_Behavior = Behavior;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `behavior`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `impacts_ui` and `behavior`.
(0, _defineProperty2.default)(Behavior, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        _context4.next = 3;
        return _Api.default.sendRequest('/behaviors', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Behavior(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(Behavior, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Behavior.list(params, options);
});
// Parameters:
//   id (required) - int64 - Behavior ID.
(0, _defineProperty2.default)(Behavior, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/behaviors/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _Behavior(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(Behavior, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Behavior.find(id, params, options);
});
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `behavior`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `impacts_ui` and `behavior`.
//   path (required) - string - Path to operate on.
//   ancestor_behaviors - boolean - If `true`, behaviors above this path are shown.
(0, _defineProperty2.default)(Behavior, "listFor", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(path) {
    var _response$data2;
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
          params.path = path;
          if (params.path) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: path');
        case 2:
          if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
        case 3:
          if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
            _context6.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
        case 4:
          if (!(params.path && !(0, _utils.isString)(params.path))) {
            _context6.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
        case 5:
          _context6.next = 6;
          return _Api.default.sendRequest("/behaviors/folders/".concat(encodeURIComponent(params.path)), 'GET', params, options);
        case 6:
          response = _context6.sent;
          return _context6.abrupt("return", (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
            return new _Behavior(obj, options);
          })) || []);
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x2) {
    return _ref8.apply(this, arguments);
  };
}());
// Parameters:
//   value - string - This field stores a hash of data specific to the type of behavior. See The Behavior Types section for example values for each type of behavior.
//   attachment_file - file - Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach that file here.
//   disable_parent_folder_behavior - boolean - If `true`, the parent folder's behavior will be disabled for this folder and its children. This is the main mechanism for canceling out a `recursive` behavior higher in the folder tree.
//   recursive - boolean - If `true`, behavior is treated as recursive, meaning that it impacts child folders as well.
//   name - string - Name for this behavior.
//   description - string - Description for this behavior.
//   path (required) - string - Path where this behavior should apply.
//   behavior (required) - string - Behavior type.
(0, _defineProperty2.default)(Behavior, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.path) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: path');
      case 1:
        if (params.behavior) {
          _context7.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: behavior');
      case 2:
        if (!(params.value && !(0, _utils.isString)(params.value))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: value must be of type String, received ".concat((0, _utils.getType)(params.value)));
      case 3:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 4:
        if (!(params.description && !(0, _utils.isString)(params.description))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 5:
        if (!(params.path && !(0, _utils.isString)(params.path))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(params.path)));
      case 6:
        if (!(params.behavior && !(0, _utils.isString)(params.behavior))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: behavior must be of type String, received ".concat((0, _utils.getType)(params.behavior)));
      case 7:
        _context7.next = 8;
        return _Api.default.sendRequest('/behaviors', 'POST', params, options);
      case 8:
        response = _context7.sent;
        return _context7.abrupt("return", new _Behavior(response === null || response === void 0 ? void 0 : response.data, options));
      case 9:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
// Parameters:
//   url (required) - string - URL for testing the webhook.
//   method - string - HTTP request method (GET or POST).
//   encoding - string - Encoding type for the webhook payload. Can be JSON, XML, or RAW (form data).
//   headers - object - Additional request headers to send via HTTP.
//   body - object - Additional body parameters to include in the webhook payload.
//   action - string - Action for test body.
(0, _defineProperty2.default)(Behavior, "webhookTest", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var params,
    options,
    _args8 = arguments;
  return _regenerator.default.wrap(function (_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
        options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
        if (params.url) {
          _context8.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: url');
      case 1:
        if (!(params.url && !(0, _utils.isString)(params.url))) {
          _context8.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: url must be of type String, received ".concat((0, _utils.getType)(params.url)));
      case 2:
        if (!(params.method && !(0, _utils.isString)(params.method))) {
          _context8.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: method must be of type String, received ".concat((0, _utils.getType)(params.method)));
      case 3:
        if (!(params.encoding && !(0, _utils.isString)(params.encoding))) {
          _context8.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: encoding must be of type String, received ".concat((0, _utils.getType)(params.encoding)));
      case 4:
        if (!(params.action && !(0, _utils.isString)(params.action))) {
          _context8.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(params.action)));
      case 5:
        _context8.next = 6;
        return _Api.default.sendRequest('/behaviors/webhook/test', 'POST', params, options);
      case 6:
      case "end":
        return _context8.stop();
    }
  }, _callee8);
})));
var _default = exports.default = Behavior;
module.exports = Behavior;
module.exports.default = Behavior;