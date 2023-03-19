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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var _default = FileUploadPart;
exports.default = _default;