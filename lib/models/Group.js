"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class Group
 */
var Group = function Group() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Group);
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
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  (0, _defineProperty2.default)(this, "getAdminIds", function () {
    return _this.attributes.admin_ids;
  });
  (0, _defineProperty2.default)(this, "setAdminIds", function (value) {
    _this.attributes.admin_ids = value;
  });
  (0, _defineProperty2.default)(this, "getNotes", function () {
    return _this.attributes.notes;
  });
  (0, _defineProperty2.default)(this, "setNotes", function (value) {
    _this.attributes.notes = value;
  });
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
  });
  (0, _defineProperty2.default)(this, "getUsernames", function () {
    return _this.attributes.usernames;
  });
  (0, _defineProperty2.default)(this, "setUsernames", function (value) {
    _this.attributes.usernames = value;
  });
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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

            throw new Error('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context.next = 8;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
              _context.next = 10;
              break;
            }

            throw new Error("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

          case 10:
            if (!(params['notes'] && !(0, _utils.isString)(params['notes']))) {
              _context.next = 12;
              break;
            }

            throw new Error("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(notes)));

          case 12:
            if (!(params['user_ids'] && !(0, _utils.isString)(params['user_ids']))) {
              _context.next = 14;
              break;
            }

            throw new Error("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(user_ids)));

          case 14:
            if (!(params['admin_ids'] && !(0, _utils.isString)(params['admin_ids']))) {
              _context.next = 16;
              break;
            }

            throw new Error("Bad parameter: admin_ids must be of type String, received ".concat((0, _utils.getType)(admin_ids)));

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
            throw new Error('Parameter missing: id');

          case 22:
            return _context.abrupt("return", _Api.default.sendRequest("/groups/".concat(params['id']), 'PATCH', params, _this.options));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};

            if (_this.attributes.id) {
              _context2.next = 3;
              break;
            }

            throw new Error('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context2.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context2.next = 8;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

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
            throw new Error('Parameter missing: id');

          case 14:
            return _context2.abrupt("return", _Api.default.sendRequest("/groups/".concat(params['id']), 'DELETE', params, _this.options));

          case 15:
          case "end":
            return _context2.stop();
        }
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
      var newObject = Group.create(_this.attributes, _this.options);
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
};

(0, _defineProperty2.default)(Group, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;

  var params,
      options,
      response,
      _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};

          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context3.next = 4;
            break;
          }

          throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context3.next = 6;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 6:
          if (!(params['ids'] && !(0, _utils.isString)(params['ids']))) {
            _context3.next = 8;
            break;
          }

          throw new Error("Bad parameter: ids must be of type String, received ".concat((0, _utils.getType)(ids)));

        case 8:
          _context3.next = 10;
          return _Api.default.sendRequest("/groups", 'GET', params, options);

        case 10:
          response = _context3.sent;
          return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new Group(obj, options);
          })) || []);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(Group, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Group.list(params, options);
});
(0, _defineProperty2.default)(Group, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
    var params,
        options,
        response,
        _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context4.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['id'] = id;

            if (params['id']) {
              _context4.next = 7;
              break;
            }

            throw new Error('Parameter missing: id');

          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context4.next = 9;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 9:
            _context4.next = 11;
            return _Api.default.sendRequest("/groups/".concat(params['id']), 'GET', params, options);

          case 11:
            response = _context4.sent;
            return _context4.abrupt("return", new Group(response === null || response === void 0 ? void 0 : response.data, options));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x) {
    return _ref6.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Group, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Group.find(id, params, options);
});
(0, _defineProperty2.default)(Group, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
      options,
      response,
      _args5 = arguments;
  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};

          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context5.next = 4;
            break;
          }

          throw new Error("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

        case 4:
          if (!(params['notes'] && !(0, _utils.isString)(params['notes']))) {
            _context5.next = 6;
            break;
          }

          throw new Error("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(notes)));

        case 6:
          if (!(params['user_ids'] && !(0, _utils.isString)(params['user_ids']))) {
            _context5.next = 8;
            break;
          }

          throw new Error("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(user_ids)));

        case 8:
          if (!(params['admin_ids'] && !(0, _utils.isString)(params['admin_ids']))) {
            _context5.next = 10;
            break;
          }

          throw new Error("Bad parameter: admin_ids must be of type String, received ".concat((0, _utils.getType)(admin_ids)));

        case 10:
          _context5.next = 12;
          return _Api.default.sendRequest("/groups", 'POST', params, options);

        case 12:
          response = _context5.sent;
          return _context5.abrupt("return", new Group(response === null || response === void 0 ? void 0 : response.data, options));

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
var _default = Group;
exports.default = _default;