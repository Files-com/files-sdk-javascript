import Files = require('../Files')

/** An SsoEvent is a log record for SSO-related activity such as LDAP syncs and SSO login attempts. */
declare class SsoEvent {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SsoEvent.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SsoEvent.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event ID */
  readonly id?: number | null

  /** Type of SSO event being recorded. */
  readonly event_type?: 'ldap_sync' | 'ldap_login' | 'saml_login' | Files.OtherString | null

  /** Status of event. */
  readonly status?: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null

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

  /** Username on Files.com for the SSO login attempt. */
  readonly username?: string | null

  /** Identity Provider UID for the SSO login attempt. */
  readonly idp_uid?: string | null

  /** SSO provider for the SSO login attempt. */
  readonly provider?: string | null

  /** SSO provider label for the SSO login attempt. */
  readonly provider_label?: string | null

  /** IP address for the SSO login attempt. */
  readonly ip?: string | null

  /** Region for the SSO login attempt. */
  readonly region?: string | null

  /** Event ID */
  getId(): number | null | undefined

  /** Type of SSO event being recorded. */
  getEventType(): 'ldap_sync' | 'ldap_login' | 'saml_login' | Files.OtherString | null | undefined

  /** Status of event. */
  getStatus(): 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null | undefined

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

  /** Username on Files.com for the SSO login attempt. */
  getUsername(): string | null | undefined

  /** Identity Provider UID for the SSO login attempt. */
  getIdpUid(): string | null | undefined

  /** SSO provider for the SSO login attempt. */
  getProvider(): string | null | undefined

  /** SSO provider label for the SSO login attempt. */
  getProviderLabel(): string | null | undefined

  /** IP address for the SSO login attempt. */
  getIp(): string | null | undefined

  /** Region for the SSO login attempt. */
  getRegion(): string | null | undefined

  /** List SSO Events */
  static list(params?: SsoEvent.ListParams, options?: Files.RequestOptions): Promise<SsoEvent[]>

  /** Alias of `list()`. */
  static all(params?: SsoEvent.ListParams, options?: Files.RequestOptions): Promise<SsoEvent[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SsoEvent.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SsoEvent>

  /**
   * Show SSO Event
   * @param id - Sso Event ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SsoEvent>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SsoEvent>

  static default: typeof SsoEvent
}

declare namespace SsoEvent {
  /** The fields of `SsoEvent` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event ID */
    id?: number | null

    /** Type of SSO event being recorded. */
    event_type?: 'ldap_sync' | 'ldap_login' | 'saml_login' | Files.OtherString | null

    /** Status of event. */
    status?: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null

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

    /** Username on Files.com for the SSO login attempt. */
    username?: string | null

    /** Identity Provider UID for the SSO login attempt. */
    idp_uid?: string | null

    /** SSO provider for the SSO login attempt. */
    provider?: string | null

    /** SSO provider label for the SSO login attempt. */
    provider_label?: string | null

    /** IP address for the SSO login attempt. */
    ip?: string | null

    /** Region for the SSO login attempt. */
    region?: string | null
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
     * `event_type`, `status` or `user_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `event_type`, `idp_uid`, `ip`, `provider`, `status`, `user_id` or `username`. Valid field combinations are `[
     * event_type, created_at ]`, `[ idp_uid, created_at ]`, `[ ip, created_at ]`, `[ provider, created_at ]`, `[
     * status, created_at ]`, `[ user_id, created_at ]`, `[ username, created_at ]`, `[ event_type, status ]`, `[
     * idp_uid, status ]`, `[ ip, status ]`, `[ provider, status ]`, `[ user_id, status ]`, `[ username, status ]`, `[
     * event_type, status, created_at ]`, `[ idp_uid, status, created_at ]`, `[ ip, status, created_at ]`, `[ provider,
     * status, created_at ]`, `[ user_id, status, created_at ]` or `[ username, status, created_at ]`.
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
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `idp_uid`,
     * `ip`, `provider` or `username`.
     */
    filter_prefix?: Files.JsonObject

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

export = SsoEvent
