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
 * Class InboxRegistration
 */
var InboxRegistration = function InboxRegistration() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, InboxRegistration);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getCode", function () {
    return _this.attributes.code;
  });
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  (0, _defineProperty2.default)(this, "getClickwrapBody", function () {
    return _this.attributes.clickwrap_body;
  });
  (0, _defineProperty2.default)(this, "getFormFieldSetId", function () {
    return _this.attributes.form_field_set_id;
  });
  (0, _defineProperty2.default)(this, "getFormFieldData", function () {
    return _this.attributes.form_field_data;
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

(0, _defineProperty2.default)(InboxRegistration, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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

          if (params['folder_behavior_id']) {
            _context.next = 4;
            break;
          }

          throw new Error('Parameter missing: folder_behavior_id');

        case 4:
          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 6:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 8:
          if (!(params['folder_behavior_id'] && !(0, _utils.isInt)(params['folder_behavior_id']))) {
            _context.next = 10;
            break;
          }

          throw new Error("Bad parameter: folder_behavior_id must be of type Int, received ".concat((0, _utils.getType)(folder_behavior_id)));

        case 10:
          _context.next = 12;
          return _Api.default.sendRequest("/inbox_registrations", 'GET', params, options);

        case 12:
          response = _context.sent;
          return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new InboxRegistration(obj, options);
          })) || []);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(InboxRegistration, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return InboxRegistration.list(params, options);
});
var _default = InboxRegistration;
exports.default = _default;