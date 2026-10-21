import Files from '../Files'

/** A RemoteBandwidthSnapshot is a remote bandwidth report for the given date. */
declare class RemoteBandwidthSnapshot {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: RemoteBandwidthSnapshot.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: RemoteBandwidthSnapshot.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Site bandwidth ID */
  readonly id?: number | null

  /** Site sync bandwidth report bytes received */
  readonly sync_bytes_received?: number | null

  /** Site sync bandwidth report bytes sent */
  readonly sync_bytes_sent?: number | null

  /** Time the site bandwidth report was logged */
  readonly logged_at?: Files.DateTimeString | null

  /** ID of related Remote Server */
  readonly remote_server_id?: number | null

  /** Site bandwidth ID */
  getId(): number | null | undefined

  /** Site sync bandwidth report bytes received */
  getSyncBytesReceived(): number | null | undefined

  /** Site sync bandwidth report bytes sent */
  getSyncBytesSent(): number | null | undefined

  /** Time the site bandwidth report was logged */
  getLoggedAt(): Files.DateTimeString | null | undefined

  /** ID of related Remote Server */
  getRemoteServerId(): number | null | undefined

  /** List Remote Bandwidth Snapshots */
  static list(params?: RemoteBandwidthSnapshot.ListParams, options?: Files.RequestOptions): Promise<RemoteBandwidthSnapshot[]>

  /** Alias of `list()`. */
  static all(params?: RemoteBandwidthSnapshot.ListParams, options?: Files.RequestOptions): Promise<RemoteBandwidthSnapshot[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: RemoteBandwidthSnapshot.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<RemoteBandwidthSnapshot>
}

declare namespace RemoteBandwidthSnapshot {
  /** The fields of `RemoteBandwidthSnapshot` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Site bandwidth ID */
    id?: number | null

    /** Site sync bandwidth report bytes received */
    sync_bytes_received?: number | null

    /** Site sync bandwidth report bytes sent */
    sync_bytes_sent?: number | null

    /** Time the site bandwidth report was logged */
    logged_at?: Files.DateTimeString | null

    /** ID of related Remote Server */
    remote_server_id?: number | null
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

export default RemoteBandwidthSnapshot
