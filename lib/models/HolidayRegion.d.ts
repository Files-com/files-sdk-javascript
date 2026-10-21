import Files = require('../Files')

declare class HolidayRegion {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: HolidayRegion.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: HolidayRegion.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The code representing a region */
  readonly code?: string | null

  /** The name of the region */
  readonly name?: string | null

  /** The code representing a region */
  getCode(): string | null | undefined

  /** The name of the region */
  getName(): string | null | undefined

  /** List all possible holiday regions */
  static getSupported(params?: HolidayRegion.GetSupportedParams, options?: Files.RequestOptions): Promise<HolidayRegion[]>

  /**
   * The models `getSupported()` lists, one at a time: nothing is requested before the first `next()`, and each page
   * only once the models before it have been taken. The params, options and settings are taken when the iterator is
   * made, the global settings as they are then unless `options.client` is given, and every page and model uses them.
   * Leaving a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is
   * not retried.
   */
  static getSupportedIterator(params?: HolidayRegion.GetSupportedParams, options?: Files.RequestOptions): AsyncIterableIterator<HolidayRegion>

  static default: typeof HolidayRegion
}

declare namespace HolidayRegion {
  /** The fields of `HolidayRegion` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The code representing a region */
    code?: string | null

    /** The name of the region */
    name?: string | null
  }

  interface GetSupportedParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number
  }
}

export = HolidayRegion
