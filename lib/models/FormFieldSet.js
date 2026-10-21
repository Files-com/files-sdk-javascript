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
var _FormFieldSet;
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
    exposeAttributes(_this, ['id']);
  });
  // string # Title to be displayed
  (0, _defineProperty2.default)(this, "getTitle", function () {
    return _this.attributes.title;
  });
  (0, _defineProperty2.default)(this, "setTitle", function (value) {
    _this.attributes.title = value;
    exposeAttributes(_this, ['title']);
  });
  // boolean # Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
  (0, _defineProperty2.default)(this, "getRequireCompleteMetadataCapture", function () {
    return _this.attributes.require_complete_metadata_capture;
  });
  (0, _defineProperty2.default)(this, "setRequireCompleteMetadataCapture", function (value) {
    _this.attributes.require_complete_metadata_capture = value;
    exposeAttributes(_this, ['require_complete_metadata_capture']);
  });
  // array(int64) # Layout of the form
  (0, _defineProperty2.default)(this, "getFormLayout", function () {
    return _this.attributes.form_layout;
  });
  (0, _defineProperty2.default)(this, "setFormLayout", function (value) {
    _this.attributes.form_layout = value;
    exposeAttributes(_this, ['form_layout']);
  });
  // array(object) # Associated form field definitions; authenticated form field set responses include historical definitions, while form_layout identifies current fields
  (0, _defineProperty2.default)(this, "getFormFields", function () {
    return _this.attributes.form_fields;
  });
  (0, _defineProperty2.default)(this, "setFormFields", function (value) {
    _this.attributes.form_fields = value;
    exposeAttributes(_this, ['form_fields']);
  });
  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing name
  (0, _defineProperty2.default)(this, "getSkipName", function () {
    return _this.attributes.skip_name;
  });
  (0, _defineProperty2.default)(this, "setSkipName", function (value) {
    _this.attributes.skip_name = value;
    exposeAttributes(_this, ['skip_name']);
  });
  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing email
  (0, _defineProperty2.default)(this, "getSkipEmail", function () {
    return _this.attributes.skip_email;
  });
  (0, _defineProperty2.default)(this, "setSkipEmail", function (value) {
    _this.attributes.skip_email = value;
    exposeAttributes(_this, ['skip_email']);
  });
  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing company
  (0, _defineProperty2.default)(this, "getSkipCompany", function () {
    return _this.attributes.skip_company;
  });
  (0, _defineProperty2.default)(this, "setSkipCompany", function (value) {
    _this.attributes.skip_company = value;
    exposeAttributes(_this, ['skip_company']);
  });
  // boolean # Form Field Set is in use by an active Inbox / Bundle / Inbox Registration / Bundle Registration
  (0, _defineProperty2.default)(this, "getInUse", function () {
    return _this.attributes.in_use;
  });
  (0, _defineProperty2.default)(this, "setInUse", function (value) {
    _this.attributes.in_use = value;
    exposeAttributes(_this, ['in_use']);
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
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
  //   title - string - Title to be displayed
  //   require_complete_metadata_capture - boolean - Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
  //   workspace_id - int64 - Workspace ID
  //   skip_email - boolean - Skip validating form email
  //   skip_name - boolean - Skip validating form name
  //   skip_company - boolean - Skip validating company
  //   form_fields - array(object)
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
          if (!(params.title !== undefined && params.title !== null && !(0, _utils.isString)(params.title))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: title must be of type String, received ".concat((0, _utils.getType)(params.title)));
        case 4:
          if (!((0, _utils.isArray)(params.require_complete_metadata_capture) || (0, _utils.isObject)(params.require_complete_metadata_capture))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: require_complete_metadata_capture must be of type Boolean, received ".concat((0, _utils.getType)(params.require_complete_metadata_capture)));
        case 5:
          if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
        case 6:
          if (!((0, _utils.isArray)(params.skip_email) || (0, _utils.isObject)(params.skip_email))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_email must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_email)));
        case 7:
          if (!((0, _utils.isArray)(params.skip_name) || (0, _utils.isObject)(params.skip_name))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_name must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_name)));
        case 8:
          if (!((0, _utils.isArray)(params.skip_company) || (0, _utils.isObject)(params.skip_company))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_company must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_company)));
        case 9:
          if (!(params.form_fields !== undefined && params.form_fields !== null && !(0, _utils.isArray)(params.form_fields))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: form_fields must be of type Array, received ".concat((0, _utils.getType)(params.form_fields)));
        case 10:
          if (params.id) {
            _context.next = 12;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 11;
            break;
          }
          params.id = _this.id;
          _context.next = 12;
          break;
        case 11:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 12:
          _context.next = 13;
          return _Api.default.sendRequest("/form_field_sets/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 13:
          response = _context.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context.abrupt("return", _this);
        case 14:
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
          return _Api.default.sendRequest("/form_field_sets/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return FormFieldSet.create(_this.attributes, _this.options);
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
_FormFieldSet = FormFieldSet;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
(0, _defineProperty2.default)(FormFieldSet, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        return _Api.default.sendRequest('/form_field_sets', 'GET', params, options);
      case 4:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _FormFieldSet(obj, retainedOptions(options));
        })) || []);
      case 5:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(FormFieldSet, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _FormFieldSet.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(FormFieldSet, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _FormFieldSet.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Form Field Set ID.
(0, _defineProperty2.default)(FormFieldSet, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/form_field_sets/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _FormFieldSet(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
(0, _defineProperty2.default)(FormFieldSet, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _FormFieldSet.find(id, params, options);
});
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   title - string - Title to be displayed
//   require_complete_metadata_capture - boolean - Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
//   workspace_id - int64 - Workspace ID
//   skip_email - boolean - Skip validating form email
//   skip_name - boolean - Skip validating form name
//   skip_company - boolean - Skip validating company
//   form_fields - array(object)
(0, _defineProperty2.default)(FormFieldSet, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.title !== undefined && params.title !== null && !(0, _utils.isString)(params.title))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: title must be of type String, received ".concat((0, _utils.getType)(params.title)));
      case 2:
        if (!((0, _utils.isArray)(params.require_complete_metadata_capture) || (0, _utils.isObject)(params.require_complete_metadata_capture))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_complete_metadata_capture must be of type Boolean, received ".concat((0, _utils.getType)(params.require_complete_metadata_capture)));
      case 3:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 4:
        if (!((0, _utils.isArray)(params.skip_email) || (0, _utils.isObject)(params.skip_email))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_email must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_email)));
      case 5:
        if (!((0, _utils.isArray)(params.skip_name) || (0, _utils.isObject)(params.skip_name))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_name must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_name)));
      case 6:
        if (!((0, _utils.isArray)(params.skip_company) || (0, _utils.isObject)(params.skip_company))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_company must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_company)));
      case 7:
        if (!(params.form_fields !== undefined && params.form_fields !== null && !(0, _utils.isArray)(params.form_fields))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: form_fields must be of type Array, received ".concat((0, _utils.getType)(params.form_fields)));
      case 8:
        _context6.next = 9;
        return _Api.default.sendRequest('/form_field_sets', 'POST', params, options);
      case 9:
        response = _context6.sent;
        return _context6.abrupt("return", new _FormFieldSet(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 10:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = FormFieldSet;
module.exports = FormFieldSet;
module.exports.default = FormFieldSet;