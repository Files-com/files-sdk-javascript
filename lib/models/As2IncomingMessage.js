"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _As2IncomingMessage;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

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
  // int64 # ID of this AS2 incoming message record.
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // int64 # ID of the incoming message record this message was replayed from. Empty for messages received directly from a trading partner.
  (0, _defineProperty2.default)(this, "getReplayedFromMessageId", function () {
    return _this.attributes.replayed_from_message_id;
  });
  // int64 # ID of the Workspace associated with this AS2 Incoming Message.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  // int64 # Id of the AS2 Partner associated with this message.
  (0, _defineProperty2.default)(this, "getAs2PartnerId", function () {
    return _this.attributes.as2_partner_id;
  });
  // int64 # Id of the AS2 Station associated with this message.
  (0, _defineProperty2.default)(this, "getAs2StationId", function () {
    return _this.attributes.as2_station_id;
  });
  // string # UUID assigned to this message.
  (0, _defineProperty2.default)(this, "getUuid", function () {
    return _this.attributes.uuid;
  });
  // string # Content Type header of the incoming message.
  (0, _defineProperty2.default)(this, "getContentType", function () {
    return _this.attributes.content_type;
  });
  // object # HTTP Headers sent with this message.
  (0, _defineProperty2.default)(this, "getHttpHeaders", function () {
    return _this.attributes.http_headers;
  });
  // string # Result of processing.
  (0, _defineProperty2.default)(this, "getProcessingResult", function () {
    return _this.attributes.processing_result;
  });
  // string # Result of processing description.
  (0, _defineProperty2.default)(this, "getProcessingResultDescription", function () {
    return _this.attributes.processing_result_description;
  });
  // string # AS2 Message Integrity Check
  (0, _defineProperty2.default)(this, "getMic", function () {
    return _this.attributes.mic;
  });
  // string # AS2 Message Integrity Check Algorithm Used
  (0, _defineProperty2.default)(this, "getMicAlgo", function () {
    return _this.attributes.mic_algo;
  });
  // string # AS2 TO header of message
  (0, _defineProperty2.default)(this, "getAs2To", function () {
    return _this.attributes.as2_to;
  });
  // string # AS2 FROM header of message
  (0, _defineProperty2.default)(this, "getAs2From", function () {
    return _this.attributes.as2_from;
  });
  // string # AS2 Message Id
  (0, _defineProperty2.default)(this, "getMessageId", function () {
    return _this.attributes.message_id;
  });
  // string # AS2 Subject Header
  (0, _defineProperty2.default)(this, "getSubject", function () {
    return _this.attributes.subject;
  });
  // string # Date Header
  (0, _defineProperty2.default)(this, "getDate", function () {
    return _this.attributes.date;
  });
  // string # Encrypted Payload Body Size
  (0, _defineProperty2.default)(this, "getBodySize", function () {
    return _this.attributes.body_size;
  });
  // string # Filename of the file being received.
  (0, _defineProperty2.default)(this, "getAttachmentFilename", function () {
    return _this.attributes.attachment_filename;
  });
  // string # IP Address of the Sender
  (0, _defineProperty2.default)(this, "getIp", function () {
    return _this.attributes.ip;
  });
  // date-time # Message creation date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # HTTP Response Code sent for this message
  (0, _defineProperty2.default)(this, "getHttpResponseCode", function () {
    return _this.attributes.http_response_code;
  });
  // object # HTTP Headers sent for this message.
  (0, _defineProperty2.default)(this, "getHttpResponseHeaders", function () {
    return _this.attributes.http_response_headers;
  });
  // string # Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial
  (0, _defineProperty2.default)(this, "getRecipientSerial", function () {
    return _this.attributes.recipient_serial;
  });
  // string # Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial in hex format.
  (0, _defineProperty2.default)(this, "getHexRecipientSerial", function () {
    return _this.attributes.hex_recipient_serial;
  });
  // string # Incoming Message Recipient(the Client Cert used to encrypt this message)'s issuer
  (0, _defineProperty2.default)(this, "getRecipientIssuer", function () {
    return _this.attributes.recipient_issuer;
  });
  // boolean # Message body received?
  (0, _defineProperty2.default)(this, "getMessageReceived", function () {
    return _this.attributes.message_received;
  });
  // boolean # Message decrypted successfully?
  (0, _defineProperty2.default)(this, "getMessageDecrypted", function () {
    return _this.attributes.message_decrypted;
  });
  // boolean # Message signature verified?
  (0, _defineProperty2.default)(this, "getMessageSignatureVerified", function () {
    return _this.attributes.message_signature_verified;
  });
  // boolean # Message processed successfully?
  (0, _defineProperty2.default)(this, "getMessageProcessingSuccess", function () {
    return _this.attributes.message_processing_success;
  });
  // boolean # MDN returned?
  (0, _defineProperty2.default)(this, "getMessageMdnReturned", function () {
    return _this.attributes.message_mdn_returned;
  });
  // string # URL to download the encrypted signed smime that is to sent as AS2 body
  (0, _defineProperty2.default)(this, "getEncryptedUri", function () {
    return _this.attributes.encrypted_uri;
  });
  // string # URL to download the file contents as smime with signature
  (0, _defineProperty2.default)(this, "getSmimeSignedUri", function () {
    return _this.attributes.smime_signed_uri;
  });
  // string # URL to download the file contents encoded as smime
  (0, _defineProperty2.default)(this, "getSmimeUri", function () {
    return _this.attributes.smime_uri;
  });
  // string # URL to download the original file contents
  (0, _defineProperty2.default)(this, "getRawUri", function () {
    return _this.attributes.raw_uri;
  });
  // string # URL to download the http response body
  (0, _defineProperty2.default)(this, "getMdnResponseUri", function () {
    return _this.attributes.mdn_response_uri;
  });
  // Replay AS2 Incoming Message
  (0, _defineProperty2.default)(this, "replay", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          params.id = _this.id;
          _context.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context.next = 6;
          return _Api.default.sendRequest("/as2_incoming_messages/".concat(encodeURIComponent(params.id), "/replay"), 'POST', params, _this.options);
        case 6:
          response = _context.sent;
          return _context.abrupt("return", new As2IncomingMessage(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_As2IncomingMessage = As2IncomingMessage;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `created_at` or `as2_partner_id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `as2_station_id`, `workspace_id` or `as2_partner_id`. Valid field combinations are `[ as2_station_id, created_at ]`, `[ workspace_id, created_at ]`, `[ as2_partner_id, created_at ]`, `[ workspace_id, as2_station_id ]`, `[ workspace_id, as2_partner_id ]`, `[ workspace_id, as2_station_id, created_at ]` or `[ workspace_id, as2_partner_id, created_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
(0, _defineProperty2.default)(As2IncomingMessage, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context2.next = 3;
        return _Api.default.sendRequest('/as2_incoming_messages', 'GET', params, options);
      case 3:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _As2IncomingMessage(obj, retainedOptions(options));
        })) || []);
      case 4:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(As2IncomingMessage, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _As2IncomingMessage.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(As2IncomingMessage, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _As2IncomingMessage.list(pageParams, pageOptions);
  });
});
var _default = exports.default = As2IncomingMessage;
module.exports = As2IncomingMessage;
module.exports.default = As2IncomingMessage;