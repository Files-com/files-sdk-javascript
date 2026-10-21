import Files = require('../Files')

/**
 * A SiteSubdomainRedirect object represents an old Files.com subdomain that continues to work after the site's
 * Files.com subdomain changes.
 */
declare class SiteSubdomainRedirect {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SiteSubdomainRedirect.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SiteSubdomainRedirect.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Site subdomain redirect ID. */
  readonly id?: number | null

  /** Files.com subdomain that continues to route to the current site subdomain. */
  readonly subdomain?: string | null

  /** When this redirect was created. */
  readonly created_at?: Files.DateTimeString | null

  /** When this redirect was last updated. */
  readonly updated_at?: Files.DateTimeString | null

  /** Site subdomain redirect ID. */
  getId(): number | null | undefined

  /** Files.com subdomain that continues to route to the current site subdomain. */
  getSubdomain(): string | null | undefined

  /** When this redirect was created. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** When this redirect was last updated. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Delete Site Subdomain Redirect */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /** List Site Subdomain Redirects */
  static list(params?: SiteSubdomainRedirect.ListParams, options?: Files.RequestOptions): Promise<SiteSubdomainRedirect[]>

  /** Alias of `list()`. */
  static all(params?: SiteSubdomainRedirect.ListParams, options?: Files.RequestOptions): Promise<SiteSubdomainRedirect[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SiteSubdomainRedirect.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SiteSubdomainRedirect>

  /**
   * Show Site Subdomain Redirect
   * @param id - Site Subdomain Redirect ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SiteSubdomainRedirect>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SiteSubdomainRedirect>

  static default: typeof SiteSubdomainRedirect
}

declare namespace SiteSubdomainRedirect {
  /** The fields of `SiteSubdomainRedirect` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Site subdomain redirect ID. */
    id?: number | null

    /** Files.com subdomain that continues to route to the current site subdomain. */
    subdomain?: string | null

    /** When this redirect was created. */
    created_at?: Files.DateTimeString | null

    /** When this redirect was last updated. */
    updated_at?: Files.DateTimeString | null
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `id`. */
    sort_by?: Files.JsonObject
  }
}

export = SiteSubdomainRedirect
