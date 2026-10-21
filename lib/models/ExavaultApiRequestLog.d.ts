import Files = require('../Files')

/** An ExavaultApiRequestLog is an audit log for monitoring and troubleshooting requests to the ExaVault API. */
declare class ExavaultApiRequestLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ExavaultApiRequestLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ExavaultApiRequestLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** Name of API Endpoint */
  readonly endpoint?: string | null

  /** Exavault API Version */
  readonly version?: number | null

  /** IP of requesting client */
  readonly request_ip?: string | null

  /** HTTP Method */
  readonly request_method?: string | null

  /** Error type, if applicable */
  readonly error_type?: string | null

  /** Error message, if applicable */
  readonly error_message?: string | null

  /** User-Agent */
  readonly user_agent?: string | null

  /** HTTP Response Code */
  readonly response_code?: number | null

  /** `false` if HTTP Response Code is 4xx or 5xx */
  readonly success?: boolean | null

  /** Duration (in milliseconds) */
  readonly duration_ms?: number | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** Name of API Endpoint */
  getEndpoint(): string | null | undefined

  /** Exavault API Version */
  getVersion(): number | null | undefined

  /** IP of requesting client */
  getRequestIp(): string | null | undefined

  /** HTTP Method */
  getRequestMethod(): string | null | undefined

  /** Error type, if applicable */
  getErrorType(): string | null | undefined

  /** Error message, if applicable */
  getErrorMessage(): string | null | undefined

  /** User-Agent */
  getUserAgent(): string | null | undefined

  /** HTTP Response Code */
  getResponseCode(): number | null | undefined

  /** `false` if HTTP Response Code is 4xx or 5xx */
  getSuccess(): boolean | null | undefined

  /** Duration (in milliseconds) */
  getDurationMs(): number | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Exavault API Request Logs */
  static list(params?: ExavaultApiRequestLog.ListParams, options?: Files.RequestOptions): Promise<ExavaultApiRequestLog[]>

  /** Alias of `list()`. */
  static all(params?: ExavaultApiRequestLog.ListParams, options?: Files.RequestOptions): Promise<ExavaultApiRequestLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ExavaultApiRequestLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ExavaultApiRequestLog>

  static default: typeof ExavaultApiRequestLog
}

declare namespace ExavaultApiRequestLog {
  /** The fields of `ExavaultApiRequestLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** Name of API Endpoint */
    endpoint?: string | null

    /** Exavault API Version */
    version?: number | null

    /** IP of requesting client */
    request_ip?: string | null

    /** HTTP Method */
    request_method?: string | null

    /** Error type, if applicable */
    error_type?: string | null

    /** Error message, if applicable */
    error_message?: string | null

    /** User-Agent */
    user_agent?: string | null

    /** HTTP Response Code */
    response_code?: number | null

    /** `false` if HTTP Response Code is 4xx or 5xx */
    success?: boolean | null

    /** Duration (in milliseconds) */
    duration_ms?: number | null

    /** Start Time of Action */
    created_at?: Files.DateTimeString | null
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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `request_ip`,
     * `request_method`, `success` or `created_at`. Valid field combinations are any combination of `request_ip`,
     * `request_method`, `success` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `request_ip`, `request_method`, `success` and
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `request_ip`, `request_method`, `success` and
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `request_ip`
     * and `request_method`. Valid field combinations are any combination of `request_ip`, `request_method`, `success`
     * and `created_at`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `request_ip`, `request_method`, `success` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `request_ip`, `request_method`, `success` and
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = ExavaultApiRequestLog
