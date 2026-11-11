"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isUrlExpiredResponse = exports.isUrlExpired = exports.getUrlExpiration = exports.URL_EXPIRED_RESPONSE_BYTES = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
// The query parameters of a signed storage URL that give when it was signed and for how many seconds it is valid: S3's,
// Files.com's and Google Cloud Storage's.
var SIGNED_URL_VALIDITIES = [['x-amz-date', 'x-amz-expires'], ['x-files-date', 'x-files-expires'], ['x-goog-date', 'x-goog-expires']];

// A time a signature gives, in milliseconds: in the basic ISO 8601 form signatures use, such as 20261019T120000Z, or in
// any form Date.parse() reads; or null.
var signedTimeOf = function signedTimeOf(value) {
  var basic = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value !== null && value !== void 0 ? value : '');
  if (basic) {
    var _basic$slice$map = basic.slice(1).map(Number),
      _basic$slice$map2 = (0, _slicedToArray2.default)(_basic$slice$map, 6),
      year = _basic$slice$map2[0],
      month = _basic$slice$map2[1],
      day = _basic$slice$map2[2],
      hours = _basic$slice$map2[3],
      minutes = _basic$slice$map2[4],
      seconds = _basic$slice$map2[5];
    return Date.UTC(year, month - 1, day, hours, minutes, seconds);
  }
  var time = Date.parse(value !== null && value !== void 0 ? value : '');
  return Number.isFinite(time) ? time : null;
};

// When a signed URL expires, in milliseconds, by its own query: its signing time plus its seconds, or, for an Azure
// shared access signature, its se; the earliest, when it gives several; or null when it gives none.
var signedUrlExpiryOf = function signedUrlExpiryOf(url) {
  var query;
  try {
    query = (0, _toConsumableArray2.default)(new URL(url).searchParams.entries());
  } catch (_unused) {
    return null;
  }
  var parameter = function parameter(name) {
    var _query$find$, _query$find;
    return (_query$find$ = (_query$find = query.find(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        key = _ref2[0];
      return key.toLowerCase() === name;
    })) === null || _query$find === void 0 ? void 0 : _query$find[1]) !== null && _query$find$ !== void 0 ? _query$find$ : null;
  };
  var expiries = SIGNED_URL_VALIDITIES.map(function (_ref3) {
    var _parameter;
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
      dateName = _ref4[0],
      secondsName = _ref4[1];
    var signedAt = signedTimeOf(parameter(dateName));
    var seconds = (_parameter = parameter(secondsName)) !== null && _parameter !== void 0 ? _parameter : '';
    return signedAt !== null && /^\d+$/.test(seconds) ? signedAt + Number(seconds) * 1000 : null;
  });
  if (parameter('sig') !== null) {
    expiries.push(signedTimeOf(parameter('se')));
  }
  var known = expiries.filter(function (expiry) {
    return expiry !== null;
  });
  return known.length > 0 ? Math.min.apply(Math, (0, _toConsumableArray2.default)(known)) : null;
};

/**
 * Returns the earliest known expiration in epoch milliseconds, or null when unknown.
 * expires is an optional ISO date-time supplied by the API. This only reads the URL;
 * it does not validate its signature or obtain a replacement URL.
 */
var getUrlExpiration = exports.getUrlExpiration = function getUrlExpiration(url, expires) {
  var given = typeof expires === 'string' ? Date.parse(expires) : NaN;
  var known = [Number.isFinite(given) ? given : null, signedUrlExpiryOf(url)].filter(function (expiry) {
    return expiry !== null;
  });
  return known.length > 0 ? Math.min.apply(Math, (0, _toConsumableArray2.default)(known)) : null;
};

/** Whether a known expiration is at or before the local clock. Unknown is false, not proof of validity. */
var isUrlExpired = exports.isUrlExpired = function isUrlExpired(url, expires) {
  var expiry = getUrlExpiration(url, expires);
  return expiry !== null && expiry <= Date.now();
};

/** The most leading bytes of a response's body isUrlExpiredResponse() examines. */
var URL_EXPIRED_RESPONSE_BYTES = exports.URL_EXPIRED_RESPONSE_BYTES = 4096;

// Storage's own expiry answers, S3's, Amazon's and Google's ExpiredToken, and Azure's, matched without regard to case
// as the Python and .NET SDKs match them.
var EXPIRED_RESPONSE_MARKERS = ['request has expired', '<code>expiredtoken</code>', 'signature not valid in the specified time frame'];
var EXPIRED_RESPONSE_TYPES = ['download_request_expired', 'upload_request_expired'];

// The text of at most URL_EXPIRED_RESPONSE_BYTES leading bytes of body, as UTF-8, and whether they are all of it; or
// null for a body of another kind.
var leadingOf = function leadingOf(body) {
  var bytes = null;
  if (typeof body === 'string') {
    // One character more than that many is more than that many bytes.
    bytes = new globalThis.TextEncoder().encode(body.slice(0, URL_EXPIRED_RESPONSE_BYTES + 1));
  } else if (ArrayBuffer.isView(body)) {
    bytes = new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
  } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    bytes = new Uint8Array(body);
  }
  return bytes === null ? null : {
    complete: bytes.length <= URL_EXPIRED_RESPONSE_BYTES,
    text: new globalThis.TextDecoder().decode(bytes.subarray(0, URL_EXPIRED_RESPONSE_BYTES))
  };
};

// Whether the leading text of a body, complete when it is all of it, says its URL has expired. Text that starts as JSON,
// an object, array or string, only as a whole body that parses to an object of an exact top-level Files.com type; any
// other text by storage's own markers, anywhere in it.
var saysExpired = function saysExpired(_ref5) {
  var complete = _ref5.complete,
    text = _ref5.text;
  if (!/^\s*["[{]/.test(text)) {
    var lowered = text.toLowerCase();
    return EXPIRED_RESPONSE_MARKERS.some(function (marker) {
      return lowered.includes(marker);
    });
  }
  if (!complete) {
    return false;
  }
  try {
    var parsed = JSON.parse(text);
    return parsed !== null && (0, _typeof2.default)(parsed) === 'object' && !Array.isArray(parsed) && EXPIRED_RESPONSE_TYPES.includes(parsed.type);
  } catch (_unused2) {
    return false;
  }
};

/**
 * Whether a storage response, its status and the body it gave, says the signed URL the request was sent to has
 * expired, whatever the URL's own query or the local clock say: only a 400 or 403 whose first
 * URL_EXPIRED_RESPONSE_BYTES bytes say so. It only reads what it is given; nothing is kept or logged.
 */
var isUrlExpiredResponse = exports.isUrlExpiredResponse = function isUrlExpiredResponse(status, body) {
  if (status !== 400 && status !== 403) {
    return false;
  }
  var leading = leadingOf(body);
  return leading !== null && saysExpired(leading);
};