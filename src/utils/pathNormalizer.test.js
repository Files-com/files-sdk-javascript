import pathNormalizer from './pathNormalizer'

import normalizationForComparisonTestData from '../../../common/shared/normalization_for_comparison_test_data.json'

describe('pathNormalizer', () => {
  it('normalizes paths for comparison', () => {
    normalizationForComparisonTestData.forEach(([input, expected]) => {
      expect(pathNormalizer.same(input, expected)).toBe(true)

      const startOfExpected = expected.substring(0, 3)
      expect(pathNormalizer.startsWith(input, startOfExpected)).toBe(true)
    })
  })

  it('looks up keys in a map', () => {
    const map = {
      '': { list: true },
      foo: { readonly: true },
      'foo/bar': { read: false, write: true },
    }

    expect(pathNormalizer.keyLookup(map, 'foo/bar')).toEqual({ read: false, write: true })
    expect(pathNormalizer.keyLookup(map, '/foo/bar')).toEqual({ read: false, write: true })
    expect(pathNormalizer.keyLookup(map, '.')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, './..')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '/')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '/ ')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '// ')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '////')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '/foo')).toEqual({ readonly: true })
    expect(pathNormalizer.keyLookup(map, '/////foo')).toEqual({ readonly: true })
    expect(pathNormalizer.keyLookup(map, '/////foo/')).toEqual({ readonly: true })
  })
})