"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _pathNormalizer = _interopRequireDefault(require("./pathNormalizer"));
var _normalization_for_comparison_test_data = _interopRequireDefault(require("../../../common/shared/normalization_for_comparison_test_data.json"));
describe('pathNormalizer', function () {
  it('normalizes paths for comparison', function () {
    _normalization_for_comparison_test_data.default.forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        input = _ref2[0],
        expected = _ref2[1];
      expect(_pathNormalizer.default.same(input, expected)).toBe(true);
      var startOfExpected = expected.substring(0, 3);
      expect(_pathNormalizer.default.startsWith(input, startOfExpected)).toBe(true);
    });
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
    expect(_pathNormalizer.default.keyLookup(map, '/ ')).toEqual({
      list: true
    });
    expect(_pathNormalizer.default.keyLookup(map, '// ')).toEqual({
      list: true
    });
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