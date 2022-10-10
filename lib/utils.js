"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isString = exports.isObject = exports.isInt = exports.isEmpty = exports.isBrowser = exports.isArray = exports.getType = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var isArray = function isArray(value) {
  return Array.isArray(value);
};
exports.isArray = isArray;
var isInt = function isInt(value) {
  return typeof value === 'number';
};
exports.isInt = isInt;
var isObject = function isObject(value) {
  return value && (0, _typeof2.default)(value) === 'object' && !Array.isArray(value);
};
exports.isObject = isObject;
var isString = function isString(value) {
  return typeof value === 'string';
};
exports.isString = isString;
var isEmpty = function isEmpty(value) {
  return !value || isArray(value) && value.length === 0 || isObject(value) && Object.keys(value).length === 0;
};
exports.isEmpty = isEmpty;
var getType = function getType(value) {
  return isArray(value) ? 'array' : (0, _typeof2.default)(value);
};
exports.getType = getType;
var isBrowser = function isBrowser() {
  return typeof self !== 'undefined' && typeof self.document !== 'undefined';
};
exports.isBrowser = isBrowser;