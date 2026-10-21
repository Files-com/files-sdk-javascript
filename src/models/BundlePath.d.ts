import Files from '../Files'

/** A BundlePath is a single bundlepath in the associated Bundle. */
declare class BundlePath {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BundlePath.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BundlePath.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Allow access to subfolders content? */
  readonly recursive?: boolean | null

  /**
   * The path to the resource relative to filesystem. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Allow access to subfolders content? */
  getRecursive(): boolean | null | undefined

  /**
   * The path to the resource relative to filesystem. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined
}

declare namespace BundlePath {
  /** The fields of `BundlePath` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Allow access to subfolders content? */
    recursive?: boolean | null

    /**
     * The path to the resource relative to filesystem. This must be slash-delimited, but it must neither start nor end
     * with a slash. Maximum of 5000 characters.
     */
    path?: string | null
  }
}

export default BundlePath
