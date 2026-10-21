import Files = require('../Files')

/** A UserSecurityEvent is a log record for user security activity such as user lockouts. */
declare class UserSecurityEvent {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UserSecurityEvent.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UserSecurityEvent.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event ID */
  readonly id?: number | null

  /** Type of user security event being recorded. */
  readonly event_type?: 'lockout' | Files.OtherString | null

  /** Event body. */
  readonly body?: string | null

  /** Event errors. */
  readonly event_errors?: string[] | null

  /** Event create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Link to log file. */
  readonly body_url?: string | null

  /** User ID. */
  readonly user_id?: number | null

  /** Event ID */
  getId(): number | null | undefined

  /** Type of user security event being recorded. */
  getEventType(): 'lockout' | Files.OtherString | null | undefined

  /** Event body. */
  getBody(): string | null | undefined

  /** Event errors. */
  getEventErrors(): string[] | null | undefined

  /** Event create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Link to log file. */
  getBodyUrl(): string | null | undefined

  /** User ID. */
  getUserId(): number | null | undefined

  /** List User Security Events */
  static list(params?: UserSecurityEvent.ListParams, options?: Files.RequestOptions): Promise<UserSecurityEvent[]>

  /** Alias of `list()`. */
  static all(params?: UserSecurityEvent.ListParams, options?: Files.RequestOptions): Promise<UserSecurityEvent[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UserSecurityEvent.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UserSecurityEvent>

  /**
   * Show User Security Event
   * @param id - User Security Event ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserSecurityEvent>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserSecurityEvent>

  static default: typeof UserSecurityEvent
}

declare namespace UserSecurityEvent {
  /** The fields of `UserSecurityEvent` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event ID */
    id?: number | null

    /** Type of user security event being recorded. */
    event_type?: 'lockout' | Files.OtherString | null

    /** Event body. */
    body?: string | null

    /** Event errors. */
    event_errors?: string[] | null

    /** Event create date/time. */
    created_at?: Files.DateTimeString | null

    /** Link to log file. */
    body_url?: string | null

    /** User ID. */
    user_id?: number | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`
     * and `user_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`
     * and `user_id`. Valid field combinations are `[ user_id, created_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = UserSecurityEvent
