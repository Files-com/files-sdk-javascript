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
 * Class FormFieldSet
 */
var FormFieldSet = /*#__PURE__*/(0, _createClass2.default)(function FormFieldSet() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, FormFieldSet);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Form field set id
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Title to be displayed
  (0, _defineProperty2.default)(this, "getTitle", function () {
    return _this.attributes.title;
  });
  (0, _defineProperty2.default)(this, "setTitle", function (value) {
    _this.attributes.title = value;
  });
  // array # Layout of the form
  (0, _defineProperty2.default)(this, "getFormLayout", function () {
    return _this.attributes.form_layout;
  });
  (0, _defineProperty2.default)(this, "setFormLayout", function (value) {
    _this.attributes.form_layout = value;
  });
  // array # Associated form fields
  (0, _defineProperty2.default)(this, "getFormFields", function () {
    return _this.attributes.form_fields;
  });
  (0, _defineProperty2.default)(this, "setFormFields", function (value) {
    _this.attributes.form_fields = value;
  });
  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing name
  (0, _defineProperty2.default)(this, "getSkipName", function () {
    return _this.attributes.skip_name;
  });
  (0, _defineProperty2.default)(this, "setSkipName", function (value) {
    _this.attributes.skip_name = value;
  });
  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing email
  (0, _defineProperty2.default)(this, "getSkipEmail", function () {
    return _this.attributes.skip_email;
  });
  (0, _defineProperty2.default)(this, "setSkipEmail", function (value) {
    _this.attributes.skip_email = value;
  });
  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing company
  (0, _defineProperty2.default)(this, "getSkipCompany", function () {
    return _this.attributes.skip_company;
  });
  (0, _defineProperty2.default)(this, "setSkipCompany", function (value) {
    _this.attributes.skip_company = value;
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // Parameters:
  //   title - string - Title to be displayed
  //   skip_email - boolean - Skip validating form email
  //   skip_name - boolean - Skip validating form name
  //   skip_company - boolean - Skip validating company
  //   form_fields - array(object)
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
          if (!(params['title'] && !(0, _utils.isString)(params['title']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: title must be of type String, received ".concat((0, _utils.getType)(title)));
        case 10:
          if (!(params['form_fields'] && !(0, _utils.isArray)(params['form_fields']))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: form_fields must be of type Array, received ".concat((0, _utils.getType)(form_fields)));
        case 12:
          if (params['id']) {
            _context.next = 18;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 17;
            break;
          }
          params['id'] = _this.id;
          _context.next = 18;
          break;
        case 17:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 18:
          _context.next = 20;
          return _Api.default.sendRequest("/form_field_sets/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 20:
          response = _context.sent;
          return _context.abrupt("return", new FormFieldSet(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 22:
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
          return _Api.default.sendRequest("/form_field_sets/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
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
      var newObject = FormFieldSet.create(_this.attributes, _this.options);
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
(0, _defineProperty2.default)(FormFieldSet, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
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
        return _Api.default.sendRequest("/form_field_sets", 'GET', params, options);
      case 10:
        response = _context3.sent;
        return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new FormFieldSet(obj, options);
        })) || []);
      case 12:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(FormFieldSet, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return FormFieldSet.list(params, options);
});
// Parameters:
//   id (required) - int64 - Form Field Set ID.
(0, _defineProperty2.default)(FormFieldSet, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
    var params,
      options,
      response,
      _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context4.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context4.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context4.next = 11;
          return _Api.default.sendRequest("/form_field_sets/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context4.sent;
          return _context4.abrupt("return", new FormFieldSet(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x) {
    return _ref6.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(FormFieldSet, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return FormFieldSet.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   title - string - Title to be displayed
//   skip_email - boolean - Skip validating form email
//   skip_name - boolean - Skip validating form name
//   skip_company - boolean - Skip validating company
//   form_fields - array(object)
(0, _defineProperty2.default)(FormFieldSet, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context5.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['title'] && !(0, _utils.isString)(params['title']))) {
          _context5.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: title must be of type String, received ".concat((0, _utils.getType)(params['title'])));
      case 6:
        if (!(params['form_fields'] && !(0, _utils.isArray)(params['form_fields']))) {
          _context5.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: form_fields must be of type Array, received ".concat((0, _utils.getType)(params['form_fields'])));
      case 8:
        _context5.next = 10;
        return _Api.default.sendRequest("/form_field_sets", 'POST', params, options);
      case 10:
        response = _context5.sent;
        return _context5.abrupt("return", new FormFieldSet(response === null || response === void 0 ? void 0 : response.data, options));
      case 12:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
var _default = FormFieldSet;
exports.default = _default;