import Files = require('../Files')

/**
 * A PublicHostingRequestLog is an audit log for monitoring requests we received to access your publicly served folders.
 */
declare class PublicHostingRequestLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PublicHostingRequestLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PublicHostingRequestLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** IP Address of Public Hosting Client. */
  readonly remote_ip?: string | null

  /** IP Address of Public Hosting Server. */
  readonly server_ip?: string | null

  /** HTTP Request Hostname. */
  readonly hostname?: string | null

  /**
   * HTTP Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** HTTP Response Code. */
  readonly responseCode?: number | null

  /** Whether SFTP Action was successful. */
  readonly success?: boolean | null

  /** Duration (in milliseconds). */
  readonly duration_ms?: number | null

  /** Start Time of Action. */
  readonly created_at?: Files.DateTimeString | null

  /** The number of bytes transferred for file downloads. */
  readonly bytes_transferred?: number | null

  /** Method of the HTTP call. */
  readonly http_method?: string | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** IP Address of Public Hosting Client. */
  getRemoteIp(): string | null | undefined

  /** IP Address of Public Hosting Server. */
  getServerIp(): string | null | undefined

  /** HTTP Request Hostname. */
  getHostname(): string | null | undefined

  /**
   * HTTP Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** HTTP Response Code. */
  getResponseCode(): number | null | undefined

  /** Whether SFTP Action was successful. */
  getSuccess(): boolean | null | undefined

  /** Duration (in milliseconds). */
  getDurationMs(): number | null | undefined

  /** Start Time of Action. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** The number of bytes transferred for file downloads. */
  getBytesTransferred(): number | null | undefined

  /** Method of the HTTP call. */
  getHttpMethod(): string | null | undefined

  /** List Public Hosting Request Logs */
  static list(params?: PublicHostingRequestLog.ListParams, options?: Files.RequestOptions): Promise<PublicHostingRequestLog[]>

  /** Alias of `list()`. */
  static all(params?: PublicHostingRequestLog.ListParams, options?: Files.RequestOptions): Promise<PublicHostingRequestLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: PublicHostingRequestLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<PublicHostingRequestLog>

  static default: typeof PublicHostingRequestLog
}

declare namespace PublicHostingRequestLog {
  /** The fields of `PublicHostingRequestLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** IP Address of Public Hosting Client. */
    remote_ip?: string | null

    /** IP Address of Public Hosting Server. */
    server_ip?: string | null

    /** HTTP Request Hostname. */
    hostname?: string | null

    /**
     * HTTP Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** HTTP Response Code. */
    responseCode?: number | null

    /** Whether SFTP Action was successful. */
    success?: boolean | null

    /** Duration (in milliseconds). */
    duration_ms?: number | null

    /** Start Time of Action. */
    created_at?: Files.DateTimeString | null

    /** The number of bytes transferred for file downloads. */
    bytes_transferred?: number | null

    /** Method of the HTTP call. */
    http_method?: string | null
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 1000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `path`,
     * `remote_ip`, `success` or `created_at`. Valid field combinations are any combination of `path`, `remote_ip`,
     * `success` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `path`, `remote_ip`, `success` and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `path`, `remote_ip`, `success` and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
     * Valid field combinations are any combination of `path`, `remote_ip`, `success` and `created_at`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `path`, `remote_ip`, `success` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `path`, `remote_ip`, `success` and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = PublicHostingRequestLog
