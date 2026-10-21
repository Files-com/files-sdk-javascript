import Files = require('../Files')

declare class ZipListEntry {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ZipListEntry.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ZipListEntry.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /**
   * Entry path inside the ZIP. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of
   * 5000 characters.
   */
  readonly path?: string | null

  /** Uncompressed size in bytes. */
  readonly size?: number | null

  /**
   * Entry path inside the ZIP. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of
   * 5000 characters.
   */
  getPath(): string | null | undefined

  /** Uncompressed size in bytes. */
  getSize(): number | null | undefined

  static default: typeof ZipListEntry
}

declare namespace ZipListEntry {
  /** The fields of `ZipListEntry` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * Entry path inside the ZIP. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
     * of 5000 characters.
     */
    path?: string | null

    /** Uncompressed size in bytes. */
    size?: number | null
  }
}

export = ZipListEntry
