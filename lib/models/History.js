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
 * Class History
 */
var History = function History() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, History);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "getWhen", function () {
    return _this.attributes.when;
  });
  (0, _defineProperty2.default)(this, "getDestination", function () {
    return _this.attributes.destination;
  });
  (0, _defineProperty2.default)(this, "getDisplay", function () {
    return _this.attributes.display;
  });
  (0, _defineProperty2.default)(this, "getIp", function () {
    return _this.attributes.ip;
  });
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "getTargets", function () {
    return _this.attributes.targets;
  });
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  (0, _defineProperty2.default)(this, "getFailureType", function () {
    return _this.attributes.failure_type;
  });
  (0, _defineProperty2.default)(this, "getInterface", function () {
    return _this.attributes.interface;
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

(0, _defineProperty2.default)(History, "listForFile", /*#__PURE__*/function () {
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

            if (params['path']) {
              _context.next = 7;
              break;
            }

            throw new Error('Parameter missing: path');

          case 7:
            if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
              _context.next = 9;
              break;
            }

            throw new Error("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(start_at)));

          case 9:
            if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
              _context.next = 11;
              break;
            }

            throw new Error("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(end_at)));

          case 11:
            if (!(params['display'] && !(0, _utils.isString)(params['display']))) {
              _context.next = 13;
              break;
            }

            throw new Error("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(display)));

          case 13:
            if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
              _context.next = 15;
              break;
            }

            throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

          case 15:
            if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
              _context.next = 17;
              break;
            }

            throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

          case 17:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context.next = 19;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 19:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context.next = 21;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 21:
            _context.next = 23;
            return _Api.default.sendRequest("/history/files(/*path)", 'GET', params, options);

          case 23:
            response = _context.sent;
            return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
              return new Action(obj, options);
            })) || []);

          case 25:
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
(0, _defineProperty2.default)(History, "listForFolder", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(path) {
    var _response$data2;

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
            if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
              _context2.next = 9;
              break;
            }

            throw new Error("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(start_at)));

          case 9:
            if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
              _context2.next = 11;
              break;
            }

            throw new Error("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(end_at)));

          case 11:
            if (!(params['display'] && !(0, _utils.isString)(params['display']))) {
              _context2.next = 13;
              break;
            }

            throw new Error("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(display)));

          case 13:
            if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
              _context2.next = 15;
              break;
            }

            throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

          case 15:
            if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
              _context2.next = 17;
              break;
            }

            throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

          case 17:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context2.next = 19;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 19:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context2.next = 21;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 21:
            _context2.next = 23;
            return _Api.default.sendRequest("/history/folders(/*path)", 'GET', params, options);

          case 23:
            response = _context2.sent;
            return _context2.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.map(function (obj) {
              return new Action(obj, options);
            })) || []);

          case 25:
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
(0, _defineProperty2.default)(History, "listForUser", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(user_id) {
    var _response$data3;

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
            params['user_id'] = user_id;

            if (params['user_id']) {
              _context3.next = 7;
              break;
            }

            throw new Error('Parameter missing: user_id');

          case 7:
            if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
              _context3.next = 9;
              break;
            }

            throw new Error("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(start_at)));

          case 9:
            if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
              _context3.next = 11;
              break;
            }

            throw new Error("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(end_at)));

          case 11:
            if (!(params['display'] && !(0, _utils.isString)(params['display']))) {
              _context3.next = 13;
              break;
            }

            throw new Error("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(display)));

          case 13:
            if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
              _context3.next = 15;
              break;
            }

            throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

          case 15:
            if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
              _context3.next = 17;
              break;
            }

            throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

          case 17:
            if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
              _context3.next = 19;
              break;
            }

            throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

          case 19:
            if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
              _context3.next = 21;
              break;
            }

            throw new Error("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(user_id)));

          case 21:
            _context3.next = 23;
            return _Api.default.sendRequest("/history/users/' . params['user_id'] . '", 'GET', params, options);

          case 23:
            response = _context3.sent;
            return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.map(function (obj) {
              return new Action(obj, options);
            })) || []);

          case 25:
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
(0, _defineProperty2.default)(History, "listLogins", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data4;

  var params,
      options,
      response,
      _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
          options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};

          if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
            _context4.next = 4;
            break;
          }

          throw new Error("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(start_at)));

        case 4:
          if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
            _context4.next = 6;
            break;
          }

          throw new Error("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(end_at)));

        case 6:
          if (!(params['display'] && !(0, _utils.isString)(params['display']))) {
            _context4.next = 8;
            break;
          }

          throw new Error("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(display)));

        case 8:
          if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
            _context4.next = 10;
            break;
          }

          throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

        case 10:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context4.next = 12;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 12:
          if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
            _context4.next = 14;
            break;
          }

          throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

        case 14:
          _context4.next = 16;
          return _Api.default.sendRequest("/history/login", 'GET', params, options);

        case 16:
          response = _context4.sent;
          return _context4.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.map(function (obj) {
            return new Action(obj, options);
          })) || []);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(History, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _response$data5;

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

          if (!(params['start_at'] && !(0, _utils.isString)(params['start_at']))) {
            _context5.next = 4;
            break;
          }

          throw new Error("Bad parameter: start_at must be of type String, received ".concat((0, _utils.getType)(start_at)));

        case 4:
          if (!(params['end_at'] && !(0, _utils.isString)(params['end_at']))) {
            _context5.next = 6;
            break;
          }

          throw new Error("Bad parameter: end_at must be of type String, received ".concat((0, _utils.getType)(end_at)));

        case 6:
          if (!(params['display'] && !(0, _utils.isString)(params['display']))) {
            _context5.next = 8;
            break;
          }

          throw new Error("Bad parameter: display must be of type String, received ".concat((0, _utils.getType)(display)));

        case 8:
          if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
            _context5.next = 10;
            break;
          }

          throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

        case 10:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context5.next = 12;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 12:
          if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
            _context5.next = 14;
            break;
          }

          throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

        case 14:
          _context5.next = 16;
          return _Api.default.sendRequest("/history", 'GET', params, options);

        case 16:
          response = _context5.sent;
          return _context5.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.map(function (obj) {
            return new Action(obj, options);
          })) || []);

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(History, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return History.list(params, options);
});
var _default = History;
exports.default = _default;