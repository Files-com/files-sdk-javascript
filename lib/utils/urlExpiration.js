"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isUrlExpired = exports.getUrlExpiration = void 0;
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