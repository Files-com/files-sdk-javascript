"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _path_comparison = _interopRequireDefault(require("../../shared/path_comparison.json"));
var comparisonMap = new Map(Object.keys(_path_comparison.default.mapping).map(function (hex) {
  return [String.fromCodePoint(parseInt(hex, 16)), _path_comparison.default.mapping[hex]];
}));

// converting the path to UTF-8 is not necessary in JS as it's the default
var normalize = function normalize(path) {
  // Remove any characters with byte value of 0
  var cleaned = (typeof path === 'string' ? path : '').replace(/\0/g, '');

  // Convert any backslash (\) characters to a forward slash (/)
  cleaned = cleaned.replace(/\\/g, '/');

  // Remove any trailing or leading slashes
  cleaned = cleaned.replace(/^\/+|\/+$/g, '');

  // Remove any path parts that are . or ..
  cleaned = cleaned.split('/').filter(function (part) {
    return part !== '.' && part !== '..';
  }).join('/');

  // Replace any duplicate forward slashes (such as ///) with a single forward slash (/)
  cleaned = cleaned.replace(/\/+/g, '/');
  return cleaned;
};
var normalizeForComparisonCache = new Map();
var normalizeForComparison = function normalizeForComparison(path) {
  if (normalizeForComparisonCache.has(path)) {
    return normalizeForComparisonCache.get(path);
  }
  var normalized = normalize(path).replace(/(?:[\0-\x1FA-Z\x7F-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, function (character) {
    var replacement = comparisonMap.get(character);
    return replacement === undefined ? character : replacement;
  });
  normalizeForComparisonCache.set(path, normalized);
  return normalized;
};
var same = function same(path1, path2) {
  return typeof path1 === 'string' && typeof path2 === 'string' && normalizeForComparison(path1) === normalizeForComparison(path2);
};
var startsWith = function startsWith(path1, path2) {
  return typeof path1 === 'string' && typeof path2 === 'string' && normalizeForComparison(path1).startsWith(normalizeForComparison(path2));
};
var keyLookup = function keyLookup(object, path) {
  var key = Object.keys(object || {}).find(function (itemKey) {
    return same(itemKey, path);
  });
  return typeof key === 'string' ? object[key] : undefined;
};
var pathNormalizer = {
  keyLookup: keyLookup,
  normalize: normalize,
  normalizeForComparison: normalizeForComparison,
  same: same,
  startsWith: startsWith
};
var _default = exports.default = pathNormalizer;
module.exports = pathNormalizer;
module.exports.default = pathNormalizer;