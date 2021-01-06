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
 * Class FileAction
 */
var FileAction = function FileAction() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, FileAction);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.path;
  });
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "getFileMigrationId", function () {
    return _this.attributes.file_migration_id;
  });
  (0, _defineProperty2.default)(this, "copy", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

            if (_this.attributes.path) {
              _context.next = 3;
              break;
            }

            throw new Error('Current object has no path');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.path = _this.attributes.path;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (!(params['destination'] && !(0, _utils.isString)(params['destination']))) {
              _context.next = 10;
              break;
            }

            throw new Error("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(destination)));

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
            if (params['destination']) {
              _context.next = 22;
              break;
            }

            if (!_this.attributes.destination) {
              _context.next = 21;
              break;
            }

            params['destination'] = _this.destination;
            _context.next = 22;
            break;

          case 21:
            throw new Error('Parameter missing: destination');

          case 22:
            return _context.abrupt("return", _Api.default.sendRequest("/file_actions/copy/".concat(params['path']), 'POST', params, _this.options));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "move", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};

            if (_this.attributes.path) {
              _context2.next = 3;
              break;
            }

            throw new Error('Current object has no path');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context2.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.path = _this.attributes.path;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context2.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (!(params['destination'] && !(0, _utils.isString)(params['destination']))) {
              _context2.next = 10;
              break;
            }

            throw new Error("Bad parameter: destination must be of type String, received ".concat((0, _utils.getType)(destination)));

          case 10:
            if (params['path']) {
              _context2.next = 16;
              break;
            }

            if (!_this.attributes.path) {
              _context2.next = 15;
              break;
            }

            params['path'] = _this.path;
            _context2.next = 16;
            break;

          case 15:
            throw new Error('Parameter missing: path');

          case 16:
            if (params['destination']) {
              _context2.next = 22;
              break;
            }

            if (!_this.attributes.destination) {
              _context2.next = 21;
              break;
            }

            params['destination'] = _this.destination;
            _context2.next = 22;
            break;

          case 21:
            throw new Error('Parameter missing: destination');

          case 22:
            return _context2.abrupt("return", _Api.default.sendRequest("/file_actions/move/".concat(params['path']), 'POST', params, _this.options));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "beginUpload", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};

            if (_this.attributes.path) {
              _context3.next = 3;
              break;
            }

            throw new Error('Current object has no path');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context3.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.path = _this.attributes.path;

            if (!(params['path'] && !(0, _utils.isString)(params['path']))) {
              _context3.next = 8;
              break;
            }

            throw new Error("Bad parameter: path must be of type String, received ".concat((0, _utils.getType)(path)));

          case 8:
            if (!(params['part'] && !(0, _utils.isInt)(params['part']))) {
              _context3.next = 10;
              break;
            }

            throw new Error("Bad parameter: part must be of type Int, received ".concat((0, _utils.getType)(part)));

          case 10:
            if (!(params['parts'] && !(0, _utils.isInt)(params['parts']))) {
              _context3.next = 12;
              break;
            }

            throw new Error("Bad parameter: parts must be of type Int, received ".concat((0, _utils.getType)(parts)));

          case 12:
            if (!(params['ref'] && !(0, _utils.isString)(params['ref']))) {
              _context3.next = 14;
              break;
            }

            throw new Error("Bad parameter: ref must be of type String, received ".concat((0, _utils.getType)(ref)));

          case 14:
            if (!(params['restart'] && !(0, _utils.isInt)(params['restart']))) {
              _context3.next = 16;
              break;
            }

            throw new Error("Bad parameter: restart must be of type Int, received ".concat((0, _utils.getType)(restart)));

          case 16:
            if (params['path']) {
              _context3.next = 22;
              break;
            }

            if (!_this.attributes.path) {
              _context3.next = 21;
              break;
            }

            params['path'] = _this.path;
            _context3.next = 22;
            break;

          case 21:
            throw new Error('Parameter missing: path');

          case 22:
            return _context3.abrupt("return", _Api.default.sendRequest("/file_actions/begin_upload/".concat(params['path']), 'POST', params, _this.options));

          case 23:
          case "end":
            return _context3.stop();
        }
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
};

var _default = FileAction;
exports.default = _default;