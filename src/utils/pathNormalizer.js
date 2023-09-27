// This implements the algorithm for path normalization described here:
// https://www.files.com/docs/topics/file-system-semantics#exact-algorithm-for-path-normalization

/* eslint-disable sort-keys */
const transliterationMap = {
  À: 'A',
  Á: 'A',
  Â: 'A',
  Ã: 'A',
  Ä: 'A',
  Å: 'A',
  Æ: 'AE',
  Ç: 'C',
  È: 'E',
  É: 'E',
  Ê: 'E',
  Ë: 'E',
  Ì: 'I',
  Í: 'I',
  Î: 'I',
  Ï: 'I',
  Ð: 'D',
  Ñ: 'N',
  Ò: 'O',
  Ó: 'O',
  Ô: 'O',
  Õ: 'O',
  Ö: 'O',
  Ø: 'O',
  Ù: 'U',
  Ú: 'U',
  Û: 'U',
  Ü: 'U',
  Ý: 'Y',
  ß: 'ss',
  à: 'a',
  á: 'a',
  â: 'a',
  ã: 'a',
  ä: 'a',
  å: 'a',
  æ: 'ae',
  ç: 'c',
  è: 'e',
  é: 'e',
  ê: 'e',
  ë: 'e',
  ì: 'i',
  í: 'i',
  î: 'i',
  ï: 'i',
  ð: 'd',
  ñ: 'n',
  ò: 'o',
  ó: 'o',
  ô: 'o',
  õ: 'o',
  ö: 'o',
  ø: 'o',
  ù: 'u',
  ú: 'u',
  û: 'u',
  ü: 'u',
  ý: 'y',
  ÿ: 'y',
  Ā: 'A',
  ā: 'a',
  Ă: 'A',
  ă: 'a',
  Ą: 'A',
  ą: 'a',
  Ć: 'C',
  ć: 'c',
  Ĉ: 'C',
  ĉ: 'c',
  Ċ: 'C',
  ċ: 'c',
  Č: 'C',
  č: 'c',
  Ď: 'D',
  ď: 'd',
  Đ: 'D',
  đ: 'd',
  Ē: 'E',
  ē: 'e',
  Ĕ: 'E',
  ĕ: 'e',
  Ė: 'E',
  ė: 'e',
  Ę: 'E',
  ę: 'e',
  Ě: 'E',
  ě: 'e',
  Ĝ: 'G',
  ĝ: 'g',
  Ğ: 'G',
  ğ: 'g',
  Ġ: 'G',
  ġ: 'g',
  Ģ: 'G',
  ģ: 'g',
  Ĥ: 'H',
  ĥ: 'h',
  Ħ: 'H',
  ħ: 'h',
  Ĩ: 'I',
  ĩ: 'i',
  Ī: 'I',
  ī: 'i',
  Ĭ: 'I',
  ĭ: 'i',
  Į: 'I',
  į: 'i',
  İ: 'I',
  Ĳ: 'IJ',
  ĳ: 'ij',
  Ĵ: 'J',
  ĵ: 'j',
  Ķ: 'K',
  ķ: 'k',
  Ĺ: 'L',
  ĺ: 'l',
  Ļ: 'L',
  ļ: 'l',
  Ľ: 'L',
  ľ: 'l',
  Ł: 'L',
  ł: 'l',
  Ń: 'N',
  ń: 'n',
  Ņ: 'N',
  ņ: 'n',
  Ň: 'N',
  ň: 'n',
  ŉ: '\'n',
  Ō: 'O',
  ō: 'o',
  Ŏ: 'O',
  ŏ: 'o',
  Ő: 'O',
  ő: 'o',
  Œ: 'OE',
  œ: 'oe',
  Ŕ: 'R',
  ŕ: 'r',
  Ŗ: 'R',
  ŗ: 'r',
  Ř: 'R',
  ř: 'r',
  Ś: 'S',
  ś: 's',
  Ŝ: 'S',
  ŝ: 's',
  Ş: 'S',
  ş: 's',
  Š: 'S',
  š: 's',
  Ţ: 'T',
  ţ: 't',
  Ť: 'T',
  ť: 't',
  Ũ: 'U',
  ũ: 'u',
  Ū: 'U',
  ū: 'u',
  Ŭ: 'U',
  ŭ: 'u',
  Ů: 'U',
  ů: 'u',
  Ű: 'U',
  ű: 'u',
  Ų: 'U',
  ų: 'u',
  Ŵ: 'W',
  ŵ: 'w',
  Ŷ: 'Y',
  ŷ: 'y',
  Ÿ: 'Y',
  Ź: 'Z',
  ź: 'z',
  Ż: 'Z',
  ż: 'z',
  Ž: 'Z',
  ž: 'z',
}
/* eslint-enable sort-keys */

const transliterate = str =>
  Array.from(str)
    .map(char => transliterationMap[char] || char)
    .join('')

// converting the path to UTF-8 is not necessary in JS as it's the default
const normalize = path => {
  // Remove any characters with byte value of 0
  let cleaned = (path || '').replace(/\0/g, '')

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

  // Run the path through the Normalize Algorithm
  let normalized = normalize(path)

  // Unicode Normalize the Path using Unicode NFKC algorithm
  normalized = normalized.normalize('NFKC')

  // Transliterate and remove accent marks
  normalized = transliterate(normalized)

  // Convert the Path to lowercase
  normalized = normalized.toLowerCase()

  // Remove any trailing whitespace (\r, \n, \t or the space character)
  normalized = normalized.replace(/[\r\n\t ]+$/g, '')

  normalizeForComparisonCache.set(path, normalized)

  return normalized
}

const same = (path1, path2) =>
  normalizeForComparison(path1) === normalizeForComparison(path2)

const startsWith = (path1, path2) =>
  normalizeForComparison(path1).startsWith(normalizeForComparison(path2))

const keyLookup = (object, path) => {
  const key = Object.keys(object).find(key => same(key, path))
  return typeof key === 'string' ? object[key] : undefined
}

const pathNormalizer = {
  keyLookup,
  normalize,
  same,
  startsWith,
}

export default pathNormalizer

module.exports = pathNormalizer
module.exports.default = pathNormalizer
