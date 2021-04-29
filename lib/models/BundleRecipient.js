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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class BundleRecipient
 */
var BundleRecipient = function BundleRecipient() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, BundleRecipient);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  (0, _defineProperty2.default)(this, "setCompany", function (value) {
    _this.attributes.company = value;
  });
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  (0, _defineProperty2.default)(this, "getNote", function () {
    return _this.attributes.note;
  });
  (0, _defineProperty2.default)(this, "setNote", function (value) {
    _this.attributes.note = value;
  });
  (0, _defineProperty2.default)(this, "getRecipient", function () {
    return _this.attributes.recipient;
  });
  (0, _defineProperty2.default)(this, "setRecipient", function (value) {
    _this.attributes.recipient = value;
  });
  (0, _defineProperty2.default)(this, "getSentAt", function () {
    return _this.attributes.sent_at;
  });
  (0, _defineProperty2.default)(this, "setSentAt", function (value) {
    _this.attributes.sent_at = value;
  });
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  (0, _defineProperty2.default)(this, "getBundleId", function () {
    return _this.attributes.bundle_id;
  });
  (0, _defineProperty2.default)(this, "setBundleId", function (value) {
    _this.attributes.bundle_id = value;
  });
  (0, _defineProperty2.default)(this, "getShareAfterCreate", function () {
    return _this.attributes.share_after_create;
  });
  (0, _defineProperty2.default)(this, "setShareAfterCreate", function (value) {
    _this.attributes.share_after_create = value;
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      throw new Error('The BundleRecipient object doesn\'t support updates.');
    } else {
      var newObject = BundleRecipient.create(_this.attributes, _this.options);
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

(0, _defineProperty2.default)(BundleRecipient, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;

  var params,
      options,
      response,
      _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

          if (params['bundle_id']) {
            _context.next = 4;
            break;
          }

          throw new Error('Parameter missing: bundle_id');

        case 4:
          if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(user_id)));

        case 6:
          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 8:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context.next = 10;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 10:
          if (!(params['bundle_id'] && !(0, _utils.isInt)(params['bundle_id']))) {
            _context.next = 12;
            break;
          }

          throw new Error("Bad parameter: bundle_id must be of type Int, received ".concat((0, _utils.getType)(bundle_id)));

        case 12:
          _context.next = 14;
          return _Api.default.sendRequest("/bundle_recipients", 'GET', params, options);

        case 14:
          response = _context.sent;
          return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new BundleRecipient(obj, options);
          })) || []);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(BundleRecipient, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return BundleRecipient.list(params, options);
});
(0, _defineProperty2.default)(BundleRecipient, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var params,
      options,
      response,
      _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

          if (params['bundle_id']) {
            _context2.next = 4;
            break;
          }

          throw new Error('Parameter missing: bundle_id');

        case 4:
          if (params['recipient']) {
            _context2.next = 6;
            break;
          }

          throw new Error('Parameter missing: recipient');

        case 6:
          if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
            _context2.next = 8;
            break;
          }

          throw new Error("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(user_id)));

        case 8:
          if (!(params['bundle_id'] && !(0, _utils.isInt)(params['bundle_id']))) {
            _context2.next = 10;
            break;
          }

          throw new Error("Bad parameter: bundle_id must be of type Int, received ".concat((0, _utils.getType)(bundle_id)));

        case 10:
          if (!(params['recipient'] && !(0, _utils.isString)(params['recipient']))) {
            _context2.next = 12;
            break;
          }

          throw new Error("Bad parameter: recipient must be of type String, received ".concat((0, _utils.getType)(recipient)));

        case 12:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context2.next = 14;
            break;
          }

          throw new Error("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

        case 14:
          if (!(params['company'] && !(0, _utils.isString)(params['company']))) {
            _context2.next = 16;
            break;
          }

          throw new Error("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(company)));

        case 16:
          if (!(params['note'] && !(0, _utils.isString)(params['note']))) {
            _context2.next = 18;
            break;
          }

          throw new Error("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(note)));

        case 18:
          _context2.next = 20;
          return _Api.default.sendRequest("/bundle_recipients", 'POST', params, options);

        case 20:
          response = _context2.sent;
          return _context2.abrupt("return", new BundleRecipient(response === null || response === void 0 ? void 0 : response.data, options));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
var _default = BundleRecipient;
exports.default = _default;