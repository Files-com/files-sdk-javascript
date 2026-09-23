import pathNormalizer from './pathNormalizer'

import normalizationForComparisonTestData from '../../shared/normalization_for_comparison_test_data.json'
import comparisonExamples from '../../shared/comparison_examples.json'

describe('pathNormalizer', () => {
  it('normalizes paths for comparison', () => {
    normalizationForComparisonTestData.forEach(([input, expected]) => {
      expect(pathNormalizer.normalizeForComparison(input)).toBe(expected)
      expect(pathNormalizer.normalizeForComparison(expected)).toBe(expected)
      expect(pathNormalizer.same(input, expected)).toBe(true)

      const startOfExpected = expected.substring(0, 3)
      expect(pathNormalizer.startsWith(input, startOfExpected)).toBe(true)
    })
  })

  it('uses the server comparison examples without rewriting the result', () => {
    comparisonExamples.forEach(([input, expected]) => {
      expect(pathNormalizer.normalizeForComparison(input)).toBe(expected)
    })
  })

  it('matches Unicode paths while preserving significant spaces', () => {
    expect(pathNormalizer.same('q\u0301/カ.txt', 'q/か.txt')).toBe(true)
    expect(pathNormalizer.same('file.txt ', 'file.txt')).toBe(false)
    expect(pathNormalizer.same('Ა', 'ა')).toBe(false)
    expect(pathNormalizer.startsWith('q\u0301/カ.txt', 'q/か')).toBe(true)
    expect(pathNormalizer.startsWith('folder/file.txt', 'folder /')).toBe(false)
    const map = { 'q/か.txt': 'plain', 'q/か.txt ': 'space' }
    expect(pathNormalizer.keyLookup(map, 'q\u0301/カ.txt')).toBe('plain')
    expect(pathNormalizer.keyLookup(map, 'q\u0301/カ.txt ')).toBe('space')
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

  it('normalizes API paths without changing path identity', () => {
    expect(pathNormalizer.normalize('/../../remote\\path//./to/file.txt')).toBe('remote/path/to/file.txt')
    expect(pathNormalizer.normalize('remote/../path/to/file.txt')).toBe('remote/path/to/file.txt')
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
    expect(pathNormalizer.keyLookup(map, '/ ')).toBeUndefined()
    expect(pathNormalizer.keyLookup(map, '// ')).toBeUndefined()
    expect(pathNormalizer.keyLookup(map, '////')).toEqual({ list: true })
    expect(pathNormalizer.keyLookup(map, '/foo')).toEqual({ readonly: true })
    expect(pathNormalizer.keyLookup(map, '/////foo')).toEqual({ readonly: true })
    expect(pathNormalizer.keyLookup(map, '/////foo/')).toEqual({ readonly: true })
  })
})
