/** Files.com path normalization and comparison, as the API compares paths. */
interface PathNormalizer {
  /** The path without null characters, backslashes, `.` and `..` parts or leading, trailing and repeated slashes. */
  normalize(path: string): string

  /** The normalized path with the characters the API treats as equivalent replaced, for comparing paths. */
  normalizeForComparison(path: string): string

  /** Whether the API treats both paths as the same. */
  same(path1: string, path2: string): boolean

  /** Whether the API treats `path1` as starting with `path2`. */
  startsWith(path1: string, path2: string): boolean

  /** The value of the object's key that is the same path as `path`. */
  keyLookup<T>(object: { readonly [key: string]: T } | null | undefined, path: string): T | undefined

  default: PathNormalizer
}

declare const pathNormalizer: PathNormalizer

export = pathNormalizer
