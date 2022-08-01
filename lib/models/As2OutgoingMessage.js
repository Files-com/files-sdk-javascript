"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var errors = _interopRequireWildcard(require("../Errors"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Class As2OutgoingMessage
 */
var As2OutgoingMessage = /*#__PURE__*/(0, _createClass2.default)(function As2OutgoingMessage() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, As2OutgoingMessage);
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
  (0, _defineProperty2.default)(this, "getAs2StationId", function () {
    return _this.attributes.as2_station_id;
  });
  (0, _defineProperty2.default)(this, "getUuid", function () {
    return _this.attributes.uuid;
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
  (0, _defineProperty2.default)(this, "getProcessingResultDescription", function () {
    return _this.attributes.processing_result_description;
  });
  (0, _defineProperty2.default)(this, "getMic", function () {
    return _this.attributes.mic;
  });
  (0, _defineProperty2.default)(this, "getMicSha256", function () {
    return _this.attributes.mic_sha_256;
  });
  (0, _defineProperty2.default)(this, "getAs2To", function () {
    return _this.attributes.as2_to;
  });
  (0, _defineProperty2.default)(this, "getAs2From", function () {
    return _this.attributes.as2_from;
  });
  (0, _defineProperty2.default)(this, "getDate", function () {
    return _this.attributes.date;
  });
  (0, _defineProperty2.default)(this, "getMessageId", function () {
    return _this.attributes.message_id;
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
  (0, _defineProperty2.default)(this, "getHttpResponseCode", function () {
    return _this.attributes.http_response_code;
  });
  (0, _defineProperty2.default)(this, "getHttpResponseHeaders", function () {
    return _this.attributes.http_response_headers;
  });
  (0, _defineProperty2.default)(this, "getHttpTransmissionDuration", function () {
    return _this.attributes.http_transmission_duration;
  });
  (0, _defineProperty2.default)(this, "getMdnReceived", function () {
    return _this.attributes.mdn_received;
  });
  (0, _defineProperty2.default)(this, "getMdnValid", function () {
    return _this.attributes.mdn_valid;
  });
  (0, _defineProperty2.default)(this, "getMdnSignatureVerified", function () {
    return _this.attributes.mdn_signature_verified;
  });
  (0, _defineProperty2.default)(this, "getMdnMessageIdMatched", function () {
    return _this.attributes.mdn_message_id_matched;
  });
  (0, _defineProperty2.default)(this, "getMdnMicMatched", function () {
    return _this.attributes.mdn_mic_matched;
  });
  (0, _defineProperty2.default)(this, "getMdnProcessingSuccess", function () {
    return _this.attributes.mdn_processing_success;
  });
  (0, _defineProperty2.default)(this, "getRawUri", function () {
    return _this.attributes.raw_uri;
  });
  (0, _defineProperty2.default)(this, "getSmimeUri", function () {
    return _this.attributes.smime_uri;
  });
  (0, _defineProperty2.default)(this, "getSmimeSignedUri", function () {
    return _this.attributes.smime_signed_uri;
  });
  (0, _defineProperty2.default)(this, "getEncryptedUri", function () {
    return _this.attributes.encrypted_uri;
  });
  (0, _defineProperty2.default)(this, "getMdnResponseUri", function () {
    return _this.attributes.mdn_response_uri;
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
(0, _defineProperty2.default)(As2OutgoingMessage, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
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

          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context.next = 6;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));

        case 6:
          if (!(params['as2_partner_id'] && !(0, _utils.isInt)(params['as2_partner_id']))) {
            _context.next = 8;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: as2_partner_id must be of type Int, received ".concat((0, _utils.getType)(params['as2_partner_id'])));

        case 8:
          _context.next = 10;
          return _Api.default.sendRequest("/as2_outgoing_messages", 'GET', params, options);

        case 10:
          response = _context.sent;
          return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new As2OutgoingMessage(obj, options);
          })) || []);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(As2OutgoingMessage, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return As2OutgoingMessage.list(params, options);
});
var _default = As2OutgoingMessage;
exports.default = _default;