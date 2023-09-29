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

  it('handles non-string params', () => {
    expect(pathNormalizer.normalize([])).toBe('')
    expect(pathNormalizer.normalize({})).toBe('')
    expect(pathNormalizer.normalize(null)).toBe('')
    expect(pathNormalizer.normalize(undefined)).toBe('')

    expect(pathNormalizer.same([], '')).toBe(false)
    expect(pathNormalizer.same(null, '')).toBe(false)
    expect(pathNormalizer.same([], null)).toBe(false)
    expect(pathNormalizer.same(undefined, undefined)).toBe(false)

    expect(pathNormalizer.startsWith(null, '')).toBe(false)
    expect(pathNormalizer.startsWith(null, [])).toBe(false)
    expect(pathNormalizer.startsWith([], null)).toBe(false)
    expect(pathNormalizer.startsWith(undefined, undefined)).toBe(false)

    expect(pathNormalizer.keyLookup(null, '')).toBe(undefined)
    expect(pathNormalizer.keyLookup(null, [])).toBe(undefined)
    expect(pathNormalizer.keyLookup([], null)).toBe(undefined)
    expect(pathNormalizer.keyLookup(undefined, undefined)).toBe(undefined)
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