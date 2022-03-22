"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Class As2IncomingMessage
 */
var As2IncomingMessage = /*#__PURE__*/(0, _createClass2.default)(function As2IncomingMessage() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, As2IncomingMessage);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getAs2PartnerId", function () {
    return _this.attributes.as2_partner_id;
  });
  (0, _defineProperty2.default)(this, "getUuid", function () {
    return _this.attributes.uuid;
  });
  (0, _defineProperty2.default)(this, "getContentType", function () {
    return _this.attributes.content_type;
  });
  (0, _defineProperty2.default)(this, "getHttpHeaders", function () {
    return _this.attributes.http_headers;
  });
  (0, _defineProperty2.default)(this, "getActivityLog", function () {
    return _this.attributes.activity_log;
  });
  (0, _defineProperty2.default)(this, "getProcessingResult", function () {
    return _this.attributes.processing_result;
  });
  (0, _defineProperty2.default)(this, "getAs2To", function () {
    return _this.attributes.as2_to;
  });
  (0, _defineProperty2.default)(this, "getAs2From", function () {
    return _this.attributes.as2_from;
  });
  (0, _defineProperty2.default)(this, "getMessageId", function () {
    return _this.attributes.message_id;
  });
  (0, _defineProperty2.default)(this, "getSubject", function () {
    return _this.attributes.subject;
  });
  (0, _defineProperty2.default)(this, "getBodySize", function () {
    return _this.attributes.body_size;
  });
  (0, _defineProperty2.default)(this, "getAttachmentFilename", function () {
    return _this.attributes.attachment_filename;
  });
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
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
});
(0, _defineProperty2.default)(As2IncomingMessage, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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

          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context.next = 4;
            break;
          }

          throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 6:
          if (!(params['as2_partner_id'] && !(0, _utils.isInt)(params['as2_partner_id']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: as2_partner_id must be of type Int, received ".concat((0, _utils.getType)(as2_partner_id)));

        case 8:
          _context.next = 10;
          return _Api.default.sendRequest("/as2_incoming_messages", 'GET', params, options);

        case 10:
          response = _context.sent;
          return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new As2IncomingMessage(obj, options);
          })) || []);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(As2IncomingMessage, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return As2IncomingMessage.list(params, options);
});
var _default = As2IncomingMessage;
exports.default = _default;