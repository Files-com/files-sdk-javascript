import Files from '../Files'

/** An ExternalEvent is a log that is sent to the cloud from a client application such as the Files.com CLI. */
declare class ExternalEvent {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ExternalEvent.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ExternalEvent.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event ID */
  readonly id?: number | null

  /** Type of event being recorded. */
  readonly event_type?: 'ldap_sync' | 'remote_server_sync' | 'lockout' | 'ldap_login' | 'saml_login' | 'client_log' | 'pending_work' | 'siem_http_destination' | Files.OtherString | null

  /** Status of event. */
  readonly status?: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null

  /** Event body */
  readonly body?: string | null

  /** External event create date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Link to log file. */
  readonly body_url?: string | null

  /** Event ID */
  getId(): number | null | undefined

  /** Type of event being recorded. */
  getEventType(): 'ldap_sync' | 'remote_server_sync' | 'lockout' | 'ldap_login' | 'saml_login' | 'client_log' | 'pending_work' | 'siem_http_destination' | Files.OtherString | null | undefined

  /** Status of event. */
  getStatus(): 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null | undefined

  /** Event body */
  getBody(): string | null | undefined

  /** External event create date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Link to log file. */
  getBodyUrl(): string | null | undefined

  /** Event ID */
  setId(value: number): void

  /** Type of event being recorded. */
  setEventType(value: 'ldap_sync' | 'remote_server_sync' | 'lockout' | 'ldap_login' | 'saml_login' | 'client_log' | 'pending_work' | 'siem_http_destination' | Files.OtherString): void

  /** Status of event. */
  setStatus(value: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped'): void

  /** Event body */
  setBody(value: string): void

  /** Link to log file. */
  setBodyUrl(value: string): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List External Events */
  static list(params?: ExternalEvent.ListParams, options?: Files.RequestOptions): Promise<ExternalEvent[]>

  /** Alias of `list()`. */
  static all(params?: ExternalEvent.ListParams, options?: Files.RequestOptions): Promise<ExternalEvent[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ExternalEvent.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ExternalEvent>

  /**
   * Show External Event
   * @param id - External Event ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ExternalEvent>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ExternalEvent>

  /** Create External Event */
  static create(params: ExternalEvent.CreateParams, options?: Files.RequestOptions): Promise<ExternalEvent>
}

declare namespace ExternalEvent {
  /** The fields of `ExternalEvent` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event ID */
    id?: number | null

    /** Type of event being recorded. */
    event_type?: 'ldap_sync' | 'remote_server_sync' | 'lockout' | 'ldap_login' | 'saml_login' | 'client_log' | 'pending_work' | 'siem_http_destination' | Files.OtherString | null

    /** Status of event. */
    status?: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null

    /** Event body */
    body?: string | null

    /** External event create date/time */
    created_at?: Files.DateTimeString | null

    /** Link to log file. */
    body_url?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`,
     * `status` or `event_type`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`
     * and `status`. Valid field combinations are `[ status, created_at ]`.
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

  interface CreateParams {
    /** Status of event. */
    status: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped'

    /** Event body */
    body: string
  }
}

export default ExternalEvent
