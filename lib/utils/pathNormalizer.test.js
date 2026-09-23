"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _pathNormalizer = _interopRequireDefault(require("./pathNormalizer"));
var _normalization_for_comparison_test_data = _interopRequireDefault(require("../../shared/normalization_for_comparison_test_data.json"));
var _comparison_examples = _interopRequireDefault(require("../../shared/comparison_examples.json"));
describe('pathNormalizer', function () {
  it('normalizes paths for comparison', function () {
    _normalization_for_comparison_test_data.default.forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        input = _ref2[0],
        expected = _ref2[1];
      expect(_pathNormalizer.default.normalizeForComparison(input)).toBe(expected);
      expect(_pathNormalizer.default.normalizeForComparison(expected)).toBe(expected);
      expect(_pathNormalizer.default.same(input, expected)).toBe(true);
      var startOfExpected = expected.substring(0, 3);
      expect(_pathNormalizer.default.startsWith(input, startOfExpected)).toBe(true);
    });
  });
  it('uses the server comparison examples without rewriting the result', function () {
    _comparison_examples.default.forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        input = _ref4[0],
        expected = _ref4[1];
      expect(_pathNormalizer.default.normalizeForComparison(input)).toBe(expected);
    });
  });
  it('matches Unicode paths while preserving significant spaces', function () {
    expect(_pathNormalizer.default.same("q\u0301/\u30AB.txt", 'q/か.txt')).toBe(true);
    expect(_pathNormalizer.default.same('file.txt ', 'file.txt')).toBe(false);
    expect(_pathNormalizer.default.same('Ა', 'ა')).toBe(false);
    expect(_pathNormalizer.default.startsWith("q\u0301/\u30AB.txt", 'q/か')).toBe(true);
    expect(_pathNormalizer.default.startsWith('folder/file.txt', 'folder /')).toBe(false);
    var map = {
      'q/か.txt': 'plain',
      'q/か.txt ': 'space'
    };
    expect(_pathNormalizer.default.keyLookup(map, "q\u0301/\u30AB.txt")).toBe('plain');
    expect(_pathNormalizer.default.keyLookup(map, "q\u0301/\u30AB.txt ")).toBe('space');
  });
  it('handles non-string params', function () {
    expect(_pathNormalizer.default.normalize([])).toBe('');
    expect(_pathNormalizer.default.normalize({})).toBe('');
    expect(_pathNormalizer.default.normalize(null)).toBe('');
    expect(_pathNormalizer.default.normalize(undefined)).toBe('');
    expect(_pathNormalizer.default.same([], '')).toBe(false);
    expect(_pathNormalizer.default.same(null, '')).toBe(false);
    expect(_pathNormalizer.default.same([], null)).toBe(false);
    expect(_pathNormalizer.default.same(undefined, undefined)).toBe(false);
    expect(_pathNormalizer.default.startsWith(null, '')).toBe(false);
    expect(_pathNormalizer.default.startsWith(null, [])).toBe(false);
    expect(_pathNormalizer.default.startsWith([], null)).toBe(false);
    expect(_pathNormalizer.default.startsWith(undefined, undefined)).toBe(false);
    expect(_pathNormalizer.default.keyLookup(null, '')).toBe(undefined);
    expect(_pathNormalizer.default.keyLookup(null, [])).toBe(undefined);
    expect(_pathNormalizer.default.keyLookup([], null)).toBe(undefined);
    expect(_pathNormalizer.default.keyLookup(undefined, undefined)).toBe(undefined);
  });
  it('normalizes API paths without changing path identity', function () {
    expect(_pathNormalizer.default.normalize('/../../remote\\path//./to/file.txt')).toBe('remote/path/to/file.txt');
    expect(_pathNormalizer.default.normalize('remote/../path/to/file.txt')).toBe('remote/path/to/file.txt');
  });
  it('looks up keys in a map', function () {
    var map = {
      '': {
        list: true
      },
      foo: {
        readonly: true
      },
      'foo/bar': {
        read: false,
        write: true
      }
    };
    expect(_pathNormalizer.default.keyLookup(map, 'foo/bar')).toEqual({
      read: false,
      write: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '/foo/bar')).toEqual({
      read: false,
      write: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '.')).toEqual({
      list: true
    });
    expect(_pathNormalizer.default.keyLookup(map, './..')).toEqual({
      list: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '')).toEqual({
      list: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '/')).toEqual({
      list: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '/ ')).toBeUndefined();
    expect(_pathNormalizer.default.keyLookup(map, '// ')).toBeUndefined();
    expect(_pathNormalizer.default.keyLookup(map, '////')).toEqual({
      list: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '/foo')).toEqual({
      readonly: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '/////foo')).toEqual({
      readonly: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '/////foo/')).toEqual({
      readonly: true
    });
  });
});