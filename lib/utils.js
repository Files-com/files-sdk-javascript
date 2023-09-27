"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isString = exports.isObject = exports.isInt = exports.isEmpty = exports.isBrowser = exports.isArray = exports.getType = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _pathNormalizer = _interopRequireDefault(require("./utils/pathNormalizer"));
exports.pathNormalizer = _pathNormalizer.default;
var isArray = exports.isArray = function isArray(value) {
  return Array.isArray(value);
};
var isInt = exports.isInt = function isInt(value) {
  return typeof value === 'number';
};
var isObject = exports.isObject = function isObject(value) {
  return value && (0, _typeof2.default)(value) === 'object' && !Array.isArray(value);
};
var isString = exports.isString = function isString(value) {
  return typeof value === 'string';
};
var isEmpty = exports.isEmpty = function isEmpty(value) {
  return !value || isArray(value) && value.length === 0 || isObject(value) && Object.keys(value).length === 0;
};
var getType = exports.getType = function getType(value) {
  return isArray(value) ? 'array' : (0, _typeof2.default)(value);
};
var isBrowser = exports.isBrowser = function isBrowser() {
  return typeof self !== 'undefined' && typeof self.document !== 'undefined';
};