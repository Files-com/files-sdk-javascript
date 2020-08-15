"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class Lock
 */
var Lock = function Lock() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Lock);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  (0, _defineProperty2.default)(this, "getTimeout", function () {
    return _this.attributes.timeout;
  });
  (0, _defineProperty2.default)(this, "setTimeout", function (value) {
    _this.attributes.timeout = value;
  });
  (0, _defineProperty2.default)(this, "getDepth", function () {
    return _this.attributes.depth;
  });
  (0, _defineProperty2.default)(this, "setDepth", function (value) {
    _this.attributes.depth = value;
  });
  (0, _defineProperty2.default)(this, "getOwner", function () {
    return _this.attributes.owner;
  });
  (0, _defineProperty2.default)(this, "setOwner", function (value) {
    _this.attributes.owner = value;
  });
  (0, _defineProperty2.default)(this, "getScope", function () {
    return _this.attributes.scope;
  });
  (0, _defineProperty2.default)(this, "setScope", function (value) {
    _this.attributes.scope = value;
  });
  (0, _defineProperty2.default)(this, "getToken", function () {
    return _this.attributes.token;
  });
  (0, _defineProperty2.default)(this, "setToken", function (value) {
    _this.attributes.token = value;
  });
  (0, _defineProperty2.default)(this, "getType", function () {
    return _this.attributes.type;
  });
  (0, _defineProperty2.default)(this, "setType", function (value) {
    _this.attributes.type = value;
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
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

            if (_this.attributes.id) {
              _context.next = 3;
              break;
            }

            throw new Error('Current object has no ID');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (!(params['token'] && !(0, _utils.isString)(params['token']))) {
              _context.next = 10;
              break;
            }

            throw new Error("Bad parameter: token must be of type String, received ".concat((0, _utils.getType)(token)));

          case 10:
            if (params['path']) {
              _context.next = 16;
              break;
            }

            if (!_this.attributes.path) {
              _context.next = 15;
              break;
            }

            params['path'] = _this.path;
            _context.next = 16;
            break;

          case 15:
            throw new Error('Parameter missing: path');

          case 16:
            if (params['token']) {
              _context.next = 22;
              break;
            }

            if (!_this.attributes.token) {
              _context.next = 21;
              break;
            }

            params['token'] = _this.token;
            _context.next = 22;
            break;

          case 21:
            throw new Error('Parameter missing: token');

          case 22:
            return _context.abrupt("return", _Api.default.sendRequest("/locks/' . params['path'] . '", 'DELETE', params, _this.options));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    var newObject = Lock.create(_this.attributes.path, _this.attributes, _this.options);
    _this.attributes = _objectSpread({}, newObject.attributes);
    return true;
  });
  Object.entries(attributes).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
};

(0, _defineProperty2.default)(Lock, "listFor", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path) {
    var _response$data;

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

            if (params['path']) {
              _context2.next = 7;
              break;
            }

            throw new Error('Parameter missing: path');

          case 7:
            if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
              _context2.next = 9;
              break;
            }

            throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

          case 9:
            if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
              _context2.next = 11;
              break;
            }

            throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

          case 11:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context2.next = 13;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 13:
            if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
              _context2.next = 15;
              break;
            }

            throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

          case 15:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context2.next = 17;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 17:
            _context2.next = 19;
            return _Api.default.sendRequest("/locks/' . params['path'] . '", 'GET', params, options);

          case 19:
            response = _context2.sent;
            return _context2.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
              return new Lock(obj, options);
            })) || []);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Lock, "create", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(path) {
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
            params['path'] = path;

            if (params['path']) {
              _context3.next = 7;
              break;
            }

            throw new Error('Parameter missing: path');

          case 7:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context3.next = 9;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 9:
            if (!(params['timeout'] && !(0, _utils.isInt)(params['timeout']))) {
              _context3.next = 11;
              break;
            }

            throw new Error("Bad parameter: timeout must be of type Int, received ".concat((0, _utils.getType)(timeout)));

          case 11:
            _context3.next = 13;
            return _Api.default.sendRequest("/locks/' . params['path'] . '", 'POST', params, options);

          case 13:
            response = _context3.sent;
            return _context3.abrupt("return", new Lock(response === null || response === void 0 ? void 0 : response.data, options));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x2) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = Lock;
exports.default = _default;