import Files from '../Files'

/** A BandwidthSnapshot is information about site bandwidth usage for the given date. */
declare class BandwidthSnapshot {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BandwidthSnapshot.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BandwidthSnapshot.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Site bandwidth ID */
  readonly id?: number | null

  /** Site bandwidth report bytes received */
  readonly bytes_received?: number | null

  /** Site bandwidth report bytes sent */
  readonly bytes_sent?: number | null

  /** Site sync bandwidth report bytes received */
  readonly sync_bytes_received?: number | null

  /** Site sync bandwidth report bytes sent */
  readonly sync_bytes_sent?: number | null

  /** Site bandwidth report get requests */
  readonly requests_get?: number | null

  /** Site bandwidth report put requests */
  readonly requests_put?: number | null

  /** Site bandwidth report other requests */
  readonly requests_other?: number | null

  /** Time the site bandwidth report was logged */
  readonly logged_at?: Files.DateTimeString | null

  /** Site bandwidth ID */
  getId(): number | null | undefined

  /** Site bandwidth report bytes received */
  getBytesReceived(): number | null | undefined

  /** Site bandwidth report bytes sent */
  getBytesSent(): number | null | undefined

  /** Site sync bandwidth report bytes received */
  getSyncBytesReceived(): number | null | undefined

  /** Site sync bandwidth report bytes sent */
  getSyncBytesSent(): number | null | undefined

  /** Site bandwidth report get requests */
  getRequestsGet(): number | null | undefined

  /** Site bandwidth report put requests */
  getRequestsPut(): number | null | undefined

  /** Site bandwidth report other requests */
  getRequestsOther(): number | null | undefined

  /** Time the site bandwidth report was logged */
  getLoggedAt(): Files.DateTimeString | null | undefined

  /** List Bandwidth Snapshots */
  static list(params?: BandwidthSnapshot.ListParams, options?: Files.RequestOptions): Promise<BandwidthSnapshot[]>

  /** Alias of `list()`. */
  static all(params?: BandwidthSnapshot.ListParams, options?: Files.RequestOptions): Promise<BandwidthSnapshot[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: BandwidthSnapshot.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<BandwidthSnapshot>
}

declare namespace BandwidthSnapshot {
  /** The fields of `BandwidthSnapshot` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Site bandwidth ID */
    id?: number | null

    /** Site bandwidth report bytes received */
    bytes_received?: number | null

    /** Site bandwidth report bytes sent */
    bytes_sent?: number | null

    /** Site sync bandwidth report bytes received */
    sync_bytes_received?: number | null

    /** Site sync bandwidth report bytes sent */
    sync_bytes_sent?: number | null

    /** Site bandwidth report get requests */
    requests_get?: number | null

    /** Site bandwidth report put requests */
    requests_put?: number | null

    /** Site bandwidth report other requests */
    requests_other?: number | null

    /** Time the site bandwidth report was logged */
    logged_at?: Files.DateTimeString | null
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `logged_at`. */
    sort_by?: Files.JsonObject

    /** If set, return records where the specified field is equal to the supplied value. Valid fields are `logged_at`. */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `logged_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `logged_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `logged_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `logged_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default BandwidthSnapshot
