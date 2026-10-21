import Files = require('../Files')

/**
 * Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used for
 * billing)
 */
declare class UsageByTopLevelDir {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UsageByTopLevelDir.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UsageByTopLevelDir.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Directory name */
  readonly dir?: string | null

  /** Usage */
  readonly size?: number | null

  /** File count */
  readonly count?: number | null

  /** Directory name */
  getDir(): string | null | undefined

  /** Usage */
  getSize(): number | null | undefined

  /** File count */
  getCount(): number | null | undefined

  static default: typeof UsageByTopLevelDir
}

declare namespace UsageByTopLevelDir {
  /** The fields of `UsageByTopLevelDir` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Directory name */
    dir?: string | null

    /** Usage */
    size?: number | null

    /** File count */
    count?: number | null
  }
}

export = UsageByTopLevelDir
