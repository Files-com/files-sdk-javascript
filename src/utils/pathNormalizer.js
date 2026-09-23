import comparisonData from '../../shared/path_comparison.json'

const comparisonMap = new Map(Object.keys(comparisonData.mapping).map(hex => [
  String.fromCodePoint(parseInt(hex, 16)), comparisonData.mapping[hex],
]))

// converting the path to UTF-8 is not necessary in JS as it's the default
const normalize = path => {
  // Remove any characters with byte value of 0
  let cleaned = (typeof path === 'string' ? path : '').replace(/\0/g, '')

  // Convert any backslash (\) characters to a forward slash (/)
  cleaned = cleaned.replace(/\\/g, '/')

  // Remove any trailing or leading slashes
  cleaned = cleaned.replace(/^\/+|\/+$/g, '')

  // Remove any path parts that are . or ..
  cleaned = cleaned.split('/').filter(part => part !== '.' && part !== '..').join('/')

  // Replace any duplicate forward slashes (such as ///) with a single forward slash (/)
  cleaned = cleaned.replace(/\/+/g, '/')

  return cleaned
}

const normalizeForComparisonCache = new Map()

const normalizeForComparison = path => {
  if (normalizeForComparisonCache.has(path)) {
    return normalizeForComparisonCache.get(path)
  }

  const normalized = normalize(path).replace(/[^ -@[-~]/gu, character => {
    const replacement = comparisonMap.get(character)

    return replacement === undefined ? character : replacement
  })

  normalizeForComparisonCache.set(path, normalized)

  return normalized
}

const same = (path1, path2) => typeof path1 === 'string' && typeof path2 === 'string'
  && normalizeForComparison(path1) === normalizeForComparison(path2)

const startsWith = (path1, path2) => typeof path1 === 'string' && typeof path2 === 'string'
  && normalizeForComparison(path1).startsWith(normalizeForComparison(path2))

const keyLookup = (object, path) => {
  const key = Object.keys(object || {}).find(itemKey => same(itemKey, path))
  return typeof key === 'string' ? object[key] : undefined
}

const pathNormalizer = {
  keyLookup,
  normalize,
  normalizeForComparison,
  same,
  startsWith,
}

export default pathNormalizer

module.exports = pathNormalizer
module.exports.default = pathNormalizer
