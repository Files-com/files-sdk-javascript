"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; } /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
/**
 * Class FileUploadPart
 */
var FileUploadPart = /*#__PURE__*/(0, _createClass2.default)(function FileUploadPart() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, FileUploadPart);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // object # Content-Type and File to send
  (0, _defineProperty2.default)(this, "getSend", function () {
    return _this.attributes.send;
  });
  // string # Type of upload
  (0, _defineProperty2.default)(this, "getAction", function () {
    return _this.attributes.action;
  });
  // boolean # If `true`, this file exists and you may wish to ask the user for overwrite confirmation
  (0, _defineProperty2.default)(this, "getAskAboutOverwrites", function () {
    return _this.attributes.ask_about_overwrites;
  });
  // int64 # Number of parts in the upload
  (0, _defineProperty2.default)(this, "getAvailableParts", function () {
    return _this.attributes.available_parts;
  });
  // string # Date/time of when this Upload part expires and the URL cannot be used any more
  (0, _defineProperty2.default)(this, "getExpires", function () {
    return _this.attributes.expires;
  });
  // object # Additional upload headers to provide as part of the upload
  (0, _defineProperty2.default)(this, "getHeaders", function () {
    return _this.attributes.headers;
  });
  // string # HTTP Method to use for uploading the part, usually `PUT`
  (0, _defineProperty2.default)(this, "getHttpMethod", function () {
    return _this.attributes.http_method;
  });
  // int64 # Size in bytes for this part
  (0, _defineProperty2.default)(this, "getNextPartsize", function () {
    return _this.attributes.next_partsize;
  });
  // boolean # If `true`, multiple parts may be uploaded in parallel.  If `false`, be sure to only upload one part at a time, in order.
  (0, _defineProperty2.default)(this, "getParallelParts", function () {
    return _this.attributes.parallel_parts;
  });
  // boolean # If `true`, parts may be retried. If `false`, a part cannot be retried and the upload should be restarted.
  (0, _defineProperty2.default)(this, "getRetryParts", function () {
    return _this.attributes.retry_parts;
  });
  // object # Additional HTTP parameters to send with the upload
  (0, _defineProperty2.default)(this, "getParameters", function () {
    return _this.attributes.parameters;
  });
  // int64 # Number of this upload part
  (0, _defineProperty2.default)(this, "getPartNumber", function () {
    return _this.attributes.part_number;
  });
  // int64 # Size in bytes for the next upload part
  (0, _defineProperty2.default)(this, "getPartsize", function () {
    return _this.attributes.partsize;
  });
  // string # New file path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  (0, _defineProperty2.default)(this, "getPath", function () {
    return _this.attributes.path;
  });
  // string # Reference name for this upload part
  (0, _defineProperty2.default)(this, "getRef", function () {
    return _this.attributes.ref;
  });
  // string # URI to upload this part to
  (0, _defineProperty2.default)(this, "getUploadUri", function () {
    return _this.attributes.upload_uri;
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
var _default = exports.default = FileUploadPart;
module.exports = FileUploadPart;
module.exports.default = FileUploadPart;