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
var _ChildSiteManagementPolicy;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class ChildSiteManagementPolicy
 */
var ChildSiteManagementPolicy = /*#__PURE__*/(0, _createClass2.default)(function ChildSiteManagementPolicy() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, ChildSiteManagementPolicy);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # ChildSiteManagementPolicy ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # ID of the Site managing the policy
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
  });
  // string # The name of the setting that is managed by the policy
  (0, _defineProperty2.default)(this, "getSiteSettingName", function () {
    return _this.attributes.site_setting_name;
  });
  (0, _defineProperty2.default)(this, "setSiteSettingName", function (value) {
    _this.attributes.site_setting_name = value;
  });
  // string # The value for the setting that will be enforced for all child sites that are not exempt
  (0, _defineProperty2.default)(this, "getManagedValue", function () {
    return _this.attributes.managed_value;
  });
  (0, _defineProperty2.default)(this, "setManagedValue", function (value) {
    _this.attributes.managed_value = value;
  });
  // array(int64) # The list of child site IDs that are exempt from this policy
  (0, _defineProperty2.default)(this, "getSkipChildSiteIds", function () {
    return _this.attributes.skip_child_site_ids;
  });
  (0, _defineProperty2.default)(this, "setSkipChildSiteIds", function (value) {
    _this.attributes.skip_child_site_ids = value;
  });
  // Parameters:
  //   site_setting_name (required) - string - The name of the setting that is managed by the policy
  //   managed_value (required) - string - The value for the setting that will be enforced for all child sites that are not exempt
  //   skip_child_site_ids - array(int64) - The list of child site IDs that are exempt from this policy
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
          if (!(params.site_setting_name && !(0, _utils.isString)(params.site_setting_name))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: site_setting_name must be of type String, received ".concat((0, _utils.getType)(params.site_setting_name)));
        case 4:
          if (!(params.managed_value && !(0, _utils.isString)(params.managed_value))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: managed_value must be of type String, received ".concat((0, _utils.getType)(params.managed_value)));
        case 5:
          if (!(params.skip_child_site_ids && !(0, _utils.isArray)(params.skip_child_site_ids))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_child_site_ids must be of type Array, received ".concat((0, _utils.getType)(params.skip_child_site_ids)));
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
          if (params.site_setting_name) {
            _context.next = 10;
            break;
          }
          if (!_this.attributes.site_setting_name) {
            _context.next = 9;
            break;
          }
          params.site_setting_name = _this.site_setting_name;
          _context.next = 10;
          break;
        case 9:
          throw new errors.MissingParameterError('Parameter missing: site_setting_name');
        case 10:
          if (params.managed_value) {
            _context.next = 12;
            break;
          }
          if (!_this.attributes.managed_value) {
            _context.next = 11;
            break;
          }
          params.managed_value = _this.managed_value;
          _context.next = 12;
          break;
        case 11:
          throw new errors.MissingParameterError('Parameter missing: managed_value');
        case 12:
          _context.next = 13;
          return _Api.default.sendRequest("/child_site_management_policies/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 13:
          response = _context.sent;
          return _context.abrupt("return", new ChildSiteManagementPolicy(response === null || response === void 0 ? void 0 : response.data, _this.options));
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
          return _Api.default.sendRequest("/child_site_management_policies/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
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
          return ChildSiteManagementPolicy.create(_this.attributes, _this.options);
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
_ChildSiteManagementPolicy = ChildSiteManagementPolicy;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(ChildSiteManagementPolicy, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
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
        return _Api.default.sendRequest('/child_site_management_policies', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _ChildSiteManagementPolicy(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(ChildSiteManagementPolicy, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _ChildSiteManagementPolicy.list(params, options);
});
// Parameters:
//   id (required) - int64 - Child Site Management Policy ID.
(0, _defineProperty2.default)(ChildSiteManagementPolicy, "find", /*#__PURE__*/function () {
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
          return _Api.default.sendRequest("/child_site_management_policies/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _ChildSiteManagementPolicy(response === null || response === void 0 ? void 0 : response.data, options));
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
(0, _defineProperty2.default)(ChildSiteManagementPolicy, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _ChildSiteManagementPolicy.find(id, params, options);
});
// Parameters:
//   site_setting_name (required) - string - The name of the setting that is managed by the policy
//   managed_value (required) - string - The value for the setting that will be enforced for all child sites that are not exempt
//   skip_child_site_ids - array(int64) - The list of child site IDs that are exempt from this policy
(0, _defineProperty2.default)(ChildSiteManagementPolicy, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.site_setting_name) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: site_setting_name');
      case 1:
        if (params.managed_value) {
          _context6.next = 2;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: managed_value');
      case 2:
        if (!(params.site_setting_name && !(0, _utils.isString)(params.site_setting_name))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_setting_name must be of type String, received ".concat((0, _utils.getType)(params.site_setting_name)));
      case 3:
        if (!(params.managed_value && !(0, _utils.isString)(params.managed_value))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: managed_value must be of type String, received ".concat((0, _utils.getType)(params.managed_value)));
      case 4:
        if (!(params.skip_child_site_ids && !(0, _utils.isArray)(params.skip_child_site_ids))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_child_site_ids must be of type Array, received ".concat((0, _utils.getType)(params.skip_child_site_ids)));
      case 5:
        _context6.next = 6;
        return _Api.default.sendRequest('/child_site_management_policies', 'POST', params, options);
      case 6:
        response = _context6.sent;
        return _context6.abrupt("return", new _ChildSiteManagementPolicy(response === null || response === void 0 ? void 0 : response.data, options));
      case 7:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = ChildSiteManagementPolicy;
module.exports = ChildSiteManagementPolicy;
module.exports.default = ChildSiteManagementPolicy;