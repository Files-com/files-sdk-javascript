"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class Permission
 */
var Permission = function Permission() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Permission);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
  });
  (0, _defineProperty2.default)(this, "getGroupName", function () {
    return _this.attributes.group_name;
  });
  (0, _defineProperty2.default)(this, "setGroupName", function (value) {
    _this.attributes.group_name = value;
  });
  (0, _defineProperty2.default)(this, "getPermission", function () {
    return _this.attributes.permission;
  });
  (0, _defineProperty2.default)(this, "setPermission", function (value) {
    _this.attributes.permission = value;
  });
  (0, _defineProperty2.default)(this, "getRecursive", function () {
    return _this.attributes.recursive;
  });
  (0, _defineProperty2.default)(this, "setRecursive", function (value) {
    _this.attributes.recursive = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['path']) {
      throw new Error('The Permission object doesn\'t support updates.');
    } else {
      var newObject = Permission.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
};

(0, _defineProperty2.default)(Permission, "list", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(path) {
    var _response$data;

    var params,
        options,
        response,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['path'] = path;

            if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
              _context.next = 7;
              break;
            }

            throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

          case 7:
            if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
              _context.next = 9;
              break;
            }

            throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

          case 9:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context.next = 11;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 11:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context.next = 13;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 13:
            if (!(params['group_id'] && !(0, _utils.isString)(params['group_id']))) {
              _context.next = 15;
              break;
            }

            throw new Error("Bad parameter: group_id must be of type String, received ".concat((0, _utils.getType)(group_id)));

          case 15:
            if (!(params['user_id'] && !(0, _utils.isString)(params['user_id']))) {
              _context.next = 17;
              break;
            }

            throw new Error("Bad parameter: user_id must be of type String, received ".concat((0, _utils.getType)(user_id)));

          case 17:
            _context.next = 19;
            return _Api.default.sendRequest("/permissions", 'GET', params, options);

          case 19:
            response = _context.sent;
            return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
              return new Permission(obj, options);
            })) || []);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Permission, "all", function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Permission.list(path, params, options);
});
(0, _defineProperty2.default)(Permission, "create", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path) {
    var params,
        options,
        response,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context2.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['path'] = path;

            if (!(params['group_id'] && !(0, _utils.isInt)(params['group_id']))) {
              _context2.next = 7;
              break;
            }

            throw new Error("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(group_id)));

          case 7:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context2.next = 9;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 9:
            if (!(params['permission'] && !(0, _utils.isString)(params['permission']))) {
              _context2.next = 11;
              break;
            }

            throw new Error("Bad parameter: permission must be of type String, received ".concat((0, _utils.getType)(permission)));

          case 11:
            if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
              _context2.next = 13;
              break;
            }

            throw new Error("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(user_id)));

          case 13:
            if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
              _context2.next = 15;
              break;
            }

            throw new Error("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));

          case 15:
            _context2.next = 17;
            return _Api.default.sendRequest("/permissions", 'POST', params, options);

          case 17:
            response = _context2.sent;
            return _context2.abrupt("return", new Permission(response === null || response === void 0 ? void 0 : response.data, options));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Permission, "delete", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(id) {
    var params,
        options,
        response,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context3.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['id'] = id;

            if (params['id']) {
              _context3.next = 7;
              break;
            }

            throw new Error('Parameter missing: id');

          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context3.next = 9;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 9:
            _context3.next = 11;
            return _Api.default.sendRequest("/permissions/' . params['id'] . '", 'DELETE', params, options);

          case 11:
            response = _context3.sent;
            return _context3.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Permission, "destroy", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Permission.delete(id, params, options);
});
var _default = Permission;
exports.default = _default;