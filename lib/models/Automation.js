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
 * Class Automation
 */
var Automation = function Automation() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Automation);
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
  (0, _defineProperty2.default)(this, "getAutomation", function () {
    return _this.attributes.automation;
  });
  (0, _defineProperty2.default)(this, "setAutomation", function (value) {
    _this.attributes.automation = value;
  });
  (0, _defineProperty2.default)(this, "getSource", function () {
    return _this.attributes.source;
  });
  (0, _defineProperty2.default)(this, "setSource", function (value) {
    _this.attributes.source = value;
  });
  (0, _defineProperty2.default)(this, "getDestination", function () {
    return _this.attributes.destination;
  });
  (0, _defineProperty2.default)(this, "setDestination", function (value) {
    _this.attributes.destination = value;
  });
  (0, _defineProperty2.default)(this, "getDestinationReplaceFrom", function () {
    return _this.attributes.destination_replace_from;
  });
  (0, _defineProperty2.default)(this, "setDestinationReplaceFrom", function (value) {
    _this.attributes.destination_replace_from = value;
  });
  (0, _defineProperty2.default)(this, "getDestinationReplaceTo", function () {
    return _this.attributes.destination_replace_to;
  });
  (0, _defineProperty2.default)(this, "setDestinationReplaceTo", function (value) {
    _this.attributes.destination_replace_to = value;
  });
  (0, _defineProperty2.default)(this, "getInterval", function () {
    return _this.attributes.interval;
  });
  (0, _defineProperty2.default)(this, "setInterval", function (value) {
    _this.attributes.interval = value;
  });
  (0, _defineProperty2.default)(this, "getNextProcessOn", function () {
    return _this.attributes.next_process_on;
  });
  (0, _defineProperty2.default)(this, "setNextProcessOn", function (value) {
    _this.attributes.next_process_on = value;
  });
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "setPath", function (value) {
    _this.attributes.path = value;
  });
  (0, _defineProperty2.default)(this, "getRealtime", function () {
    return _this.attributes.realtime;
  });
  (0, _defineProperty2.default)(this, "setRealtime", function (value) {
    _this.attributes.realtime = value;
  });
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  (0, _defineProperty2.default)(this, "getUserIds", function () {
    return _this.attributes.user_ids;
  });
  (0, _defineProperty2.default)(this, "setUserIds", function (value) {
    _this.attributes.user_ids = value;
  });
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
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

            throw new Error('Current object has no ID');

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
            if (!(params['automation'] && !(0, _utils.isString)(params['automation']))) {
              _context.next = 10;
              break;
            }

            throw new Error("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(automation)));

          case 10:
            if (!(params['source'] && !(0, _utils.isString)(params['source']))) {
              _context.next = 12;
              break;
            }

            throw new Error("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(source)));

          case 12:
            if (!(params['destination'] && !(0, _utils.isString)(params['destination']))) {
              _context.next = 14;
              break;
            }

            throw new Error("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(destination)));

          case 14:
            if (!(params['destination_replace_from'] && !(0, _utils.isString)(params['destination_replace_from']))) {
              _context.next = 16;
              break;
            }

            throw new Error("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(destination_replace_from)));

          case 16:
            if (!(params['destination_replace_to'] && !(0, _utils.isString)(params['destination_replace_to']))) {
              _context.next = 18;
              break;
            }

            throw new Error("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(destination_replace_to)));

          case 18:
            if (!(params['interval'] && !(0, _utils.isString)(params['interval']))) {
              _context.next = 20;
              break;
            }

            throw new Error("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(interval)));

          case 20:
            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context.next = 22;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 22:
            if (!(params['user_ids'] && !(0, _utils.isString)(params['user_ids']))) {
              _context.next = 24;
              break;
            }

            throw new Error("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(user_ids)));

          case 24:
            if (!(params['group_ids'] && !(0, _utils.isString)(params['group_ids']))) {
              _context.next = 26;
              break;
            }

            throw new Error("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(group_ids)));

          case 26:
            if (params['id']) {
              _context.next = 32;
              break;
            }

            if (!_this.attributes.id) {
              _context.next = 31;
              break;
            }

            params['id'] = _this.id;
            _context.next = 32;
            break;

          case 31:
            throw new Error('Parameter missing: id');

          case 32:
            if (params['automation']) {
              _context.next = 38;
              break;
            }

            if (!_this.attributes.automation) {
              _context.next = 37;
              break;
            }

            params['automation'] = _this.automation;
            _context.next = 38;
            break;

          case 37:
            throw new Error('Parameter missing: automation');

          case 38:
            return _context.abrupt("return", _Api.default.sendRequest("/automations/' . params['id'] . '", 'PATCH', params, _this.options));

          case 39:
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

            throw new Error('Current object has no ID');

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
            return _context2.abrupt("return", _Api.default.sendRequest("/automations/' . params['id'] . '", 'DELETE', params, _this.options));

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
      var newObject = Automation.create(_this.attributes, _this.options);
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

(0, _defineProperty2.default)(Automation, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
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

          if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
            _context3.next = 4;
            break;
          }

          throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context3.next = 6;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 6:
          if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
            _context3.next = 8;
            break;
          }

          throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

        case 8:
          if (!(params['automation'] && !(0, _utils.isString)(params['automation']))) {
            _context3.next = 10;
            break;
          }

          throw new Error("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(automation)));

        case 10:
          _context3.next = 12;
          return _Api.default.sendRequest("/automations", 'GET', params, options);

        case 12:
          response = _context3.sent;
          return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new Automation(obj, options);
          })) || []);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(Automation, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Automation.list(params, options);
});
(0, _defineProperty2.default)(Automation, "find", /*#__PURE__*/function () {
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
            return _Api.default.sendRequest("/automations/' . params['id'] . '", 'GET', params, options);

          case 11:
            response = _context4.sent;
            return _context4.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, options));

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
(0, _defineProperty2.default)(Automation, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Automation.find(id, params, options);
});
(0, _defineProperty2.default)(Automation, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
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

          if (params['automation']) {
            _context5.next = 4;
            break;
          }

          throw new Error('Parameter missing: automation');

        case 4:
          if (!(params['automation'] && !(0, _utils.isString)(params['automation']))) {
            _context5.next = 6;
            break;
          }

          throw new Error("Bad parameter: automation must be of type String, received ".concat((0, _utils.getType)(automation)));

        case 6:
          if (!(params['source'] && !(0, _utils.isString)(params['source']))) {
            _context5.next = 8;
            break;
          }

          throw new Error("Bad parameter: source must be of type String, received ".concat((0, _utils.getType)(source)));

        case 8:
          if (!(params['destination'] && !(0, _utils.isString)(params['destination']))) {
            _context5.next = 10;
            break;
          }

          throw new Error("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(destination)));

        case 10:
          if (!(params['destination_replace_from'] && !(0, _utils.isString)(params['destination_replace_from']))) {
            _context5.next = 12;
            break;
          }

          throw new Error("Bad parameter: destination_replace_from must be of type String, received ".concat((0, _utils.getType)(destination_replace_from)));

        case 12:
          if (!(params['destination_replace_to'] && !(0, _utils.isString)(params['destination_replace_to']))) {
            _context5.next = 14;
            break;
          }

          throw new Error("Bad parameter: destination_replace_to must be of type String, received ".concat((0, _utils.getType)(destination_replace_to)));

        case 14:
          if (!(params['interval'] && !(0, _utils.isString)(params['interval']))) {
            _context5.next = 16;
            break;
          }

          throw new Error("Bad parameter: interval must be of type String, received ".concat((0, _utils.getType)(interval)));

        case 16:
          if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
            _context5.next = 18;
            break;
          }

          throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

        case 18:
          if (!(params['user_ids'] && !(0, _utils.isString)(params['user_ids']))) {
            _context5.next = 20;
            break;
          }

          throw new Error("Bad parameter: user_ids must be of type String, received ".concat((0, _utils.getType)(user_ids)));

        case 20:
          if (!(params['group_ids'] && !(0, _utils.isString)(params['group_ids']))) {
            _context5.next = 22;
            break;
          }

          throw new Error("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(group_ids)));

        case 22:
          _context5.next = 24;
          return _Api.default.sendRequest("/automations", 'POST', params, options);

        case 24:
          response = _context5.sent;
          return _context5.abrupt("return", new Automation(response === null || response === void 0 ? void 0 : response.data, options));

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
var _default = Automation;
exports.default = _default;