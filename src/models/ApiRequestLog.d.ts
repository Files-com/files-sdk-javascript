import Files from '../Files'

/** An ApiRequestLog is an audit log for monitoring and troubleshooting requests made via API to your site. */
declare class ApiRequestLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ApiRequestLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ApiRequestLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** API Key ID, if applicable */
  readonly api_key_id?: number | null

  /** API Key Prefix, if applicable */
  readonly api_key_prefix?: string | null

  /** User ID */
  readonly user_id?: number | null

  /** Username */
  readonly username?: string | null

  /** true if this change was performed by a user on a parent site. */
  readonly user_is_from_parent_site?: boolean | null

  /** API Interface */
  readonly interface?: string | null

  /** HTTP Method */
  readonly request_method?: string | null

  /** Request path */
  readonly request_path?: string | null

  /** IP of requesting client */
  readonly request_ip?: string | null

  /** Hostname the request was sent to */
  readonly request_host?: string | null

  /** Unique Id of the Request */
  readonly request_id?: string | null

  /** Name of API Endpoint */
  readonly api_name?: string | null

  /** User-Agent */
  readonly user_agent?: string | null

  /** Error type, if applicable */
  readonly error_type?: string | null

  /** Error message, if applicable */
  readonly error_message?: string | null

  /** HTTP Response Code */
  readonly response_code?: number | null

  /** `false` if HTTP Response Code is 4xx or 5xx */
  readonly success?: boolean | null

  /** Duration (in milliseconds) */
  readonly duration_ms?: number | null

  /** User ID of Site Admin user impersonating this user via a Read-Only session. */
  readonly impersonator_user_id?: number | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** API Key ID, if applicable */
  getApiKeyId(): number | null | undefined

  /** API Key Prefix, if applicable */
  getApiKeyPrefix(): string | null | undefined

  /** User ID */
  getUserId(): number | null | undefined

  /** Username */
  getUsername(): string | null | undefined

  /** true if this change was performed by a user on a parent site. */
  getUserIsFromParentSite(): boolean | null | undefined

  /** API Interface */
  getInterface(): string | null | undefined

  /** HTTP Method */
  getRequestMethod(): string | null | undefined

  /** Request path */
  getRequestPath(): string | null | undefined

  /** IP of requesting client */
  getRequestIp(): string | null | undefined

  /** Hostname the request was sent to */
  getRequestHost(): string | null | undefined

  /** Unique Id of the Request */
  getRequestId(): string | null | undefined

  /** Name of API Endpoint */
  getApiName(): string | null | undefined

  /** User-Agent */
  getUserAgent(): string | null | undefined

  /** Error type, if applicable */
  getErrorType(): string | null | undefined

  /** Error message, if applicable */
  getErrorMessage(): string | null | undefined

  /** HTTP Response Code */
  getResponseCode(): number | null | undefined

  /** `false` if HTTP Response Code is 4xx or 5xx */
  getSuccess(): boolean | null | undefined

  /** Duration (in milliseconds) */
  getDurationMs(): number | null | undefined

  /** User ID of Site Admin user impersonating this user via a Read-Only session. */
  getImpersonatorUserId(): number | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List API Request Logs */
  static list(params?: ApiRequestLog.ListParams, options?: Files.RequestOptions): Promise<ApiRequestLog[]>

  /** Alias of `list()`. */
  static all(params?: ApiRequestLog.ListParams, options?: Files.RequestOptions): Promise<ApiRequestLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ApiRequestLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ApiRequestLog>
}

declare namespace ApiRequestLog {
  /** The fields of `ApiRequestLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** API Key ID, if applicable */
    api_key_id?: number | null

    /** API Key Prefix, if applicable */
    api_key_prefix?: string | null

    /** User ID */
    user_id?: number | null

    /** Username */
    username?: string | null

    /** true if this change was performed by a user on a parent site. */
    user_is_from_parent_site?: boolean | null

    /** API Interface */
    interface?: string | null

    /** HTTP Method */
    request_method?: string | null

    /** Request path */
    request_path?: string | null

    /** IP of requesting client */
    request_ip?: string | null

    /** Hostname the request was sent to */
    request_host?: string | null

    /** Unique Id of the Request */
    request_id?: string | null

    /** Name of API Endpoint */
    api_name?: string | null

    /** User-Agent */
    user_agent?: string | null

    /** Error type, if applicable */
    error_type?: string | null

    /** Error message, if applicable */
    error_message?: string | null

    /** HTTP Response Code */
    response_code?: number | null

    /** `false` if HTTP Response Code is 4xx or 5xx */
    success?: boolean | null

    /** Duration (in milliseconds) */
    duration_ms?: number | null

    /** User ID of Site Admin user impersonating this user via a Read-Only session. */
    impersonator_user_id?: number | null

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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `api_key_id`,
     * `interface`, `request_id`, `request_ip`, `request_method`, `success`, `user_id` or `created_at`. Valid field
     * combinations are any combination of `api_key_id`, `interface`, `request_id`, `request_ip`, `request_method`,
     * `success`, `user_id` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `api_key_id`, `interface`, `request_id`,
     * `request_ip`, `request_method`, `success`, `user_id` and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `api_key_id`, `interface`, `request_id`,
     * `request_ip`, `request_method`, `success`, `user_id` and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `interface`,
     * `request_id`, `request_ip` or `request_method`. Valid field combinations are any combination of `api_key_id`,
     * `interface`, `request_id`, `request_ip`, `request_method`, `success`, `user_id` and `created_at`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `api_key_id`, `interface`, `request_id`, `request_ip`,
     * `request_method`, `success`, `user_id` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `api_key_id`, `interface`, `request_id`,
     * `request_ip`, `request_method`, `success`, `user_id` and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default ApiRequestLog
