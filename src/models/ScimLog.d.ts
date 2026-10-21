import Files from '../Files'

/** A SCIM log entry represents a single SCIM request made to the system. */
declare class ScimLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ScimLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ScimLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The unique ID of this SCIM request. */
  readonly id?: number | null

  /** The date and time when this SCIM request occurred. */
  readonly created_at?: string | null

  /** The path portion of the URL requested. */
  readonly request_path?: string | null

  /** The HTTP method used for this request. */
  readonly request_method?: string | null

  /** The HTTP response code returned for this request. */
  readonly http_response_code?: string | null

  /** The User-Agent header sent with the request. */
  readonly user_agent?: string | null

  /** The JSON payload sent with the request. */
  readonly request_json?: string | null

  /** The JSON payload returned in the response. */
  readonly response_json?: string | null

  /** The unique ID of this SCIM request. */
  getId(): number | null | undefined

  /** The date and time when this SCIM request occurred. */
  getCreatedAt(): string | null | undefined

  /** The path portion of the URL requested. */
  getRequestPath(): string | null | undefined

  /** The HTTP method used for this request. */
  getRequestMethod(): string | null | undefined

  /** The HTTP response code returned for this request. */
  getHttpResponseCode(): string | null | undefined

  /** The User-Agent header sent with the request. */
  getUserAgent(): string | null | undefined

  /** The JSON payload sent with the request. */
  getRequestJson(): string | null | undefined

  /** The JSON payload returned in the response. */
  getResponseJson(): string | null | undefined

  /** List Scim Logs */
  static list(params?: ScimLog.ListParams, options?: Files.RequestOptions): Promise<ScimLog[]>

  /** Alias of `list()`. */
  static all(params?: ScimLog.ListParams, options?: Files.RequestOptions): Promise<ScimLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ScimLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ScimLog>

  /**
   * Show Scim Log
   * @param id - Scim Log ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ScimLog>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ScimLog>
}

declare namespace ScimLog {
  /** The fields of `ScimLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The unique ID of this SCIM request. */
    id?: number | null

    /** The date and time when this SCIM request occurred. */
    created_at?: string | null

    /** The path portion of the URL requested. */
    request_path?: string | null

    /** The HTTP method used for this request. */
    request_method?: string | null

    /** The HTTP response code returned for this request. */
    http_response_code?: string | null

    /** The User-Agent header sent with the request. */
    user_agent?: string | null

    /** The JSON payload sent with the request. */
    request_json?: string | null

    /** The JSON payload returned in the response. */
    response_json?: string | null
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

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject
  }
}

export default ScimLog
