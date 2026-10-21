import Files from '../Files'

/** An EventRecord is a durable event emitted by Files.com for routing through Event Channels. */
declare class EventRecord {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EventRecord.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EventRecord.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event Record ID */
  readonly id?: number | null

  /** Workspace ID. 0 means the default workspace or site-wide. */
  readonly workspace_id?: number | null

  /** Stable event UUID. */
  readonly event_uuid?: string | null

  /**
   * Versioned event type string. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`,
   * `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`,
   * `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`,
   * `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`,
   * `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`,
   * `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`,
   * `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`,
   * `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`,
   * `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`,
   * `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`,
   * `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`,
   * `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`,
   * `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`,
   * `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`,
   * `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`,
   * `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
   */
  readonly event_type?: string | null

  /** Event severity. */
  readonly severity?: 'info' | 'warning' | 'error' | 'critical' | Files.OtherString | null

  /** Source record type. */
  readonly source_type?: string | null

  /** Source record ID. */
  readonly source_id?: number | null

  /** Event occurrence date/time. */
  readonly occurred_at?: Files.DateTimeString | null

  /** Human-readable event title. */
  readonly human_title?: string | null

  /** Human-readable event summary. */
  readonly human_summary?: string | null

  /** Human-readable event detail fields. */
  readonly human_fields?: Files.JsonObject[] | null

  /** Actor associated with the event. */
  readonly actor?: Files.JsonObject | null

  /** Resources associated with the event. */
  readonly resources?: Files.JsonObject[] | null

  /** Event payload. */
  readonly payload?: Files.JsonObject | null

  /** Event Record create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Event Record ID */
  getId(): number | null | undefined

  /** Workspace ID. 0 means the default workspace or site-wide. */
  getWorkspaceId(): number | null | undefined

  /** Stable event UUID. */
  getEventUuid(): string | null | undefined

  /**
   * Versioned event type string. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`,
   * `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`,
   * `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`,
   * `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`,
   * `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`,
   * `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`,
   * `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`,
   * `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`,
   * `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`,
   * `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`,
   * `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`,
   * `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`,
   * `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`,
   * `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`,
   * `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`,
   * `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
   */
  getEventType(): string | null | undefined

  /** Event severity. */
  getSeverity(): 'info' | 'warning' | 'error' | 'critical' | Files.OtherString | null | undefined

  /** Source record type. */
  getSourceType(): string | null | undefined

  /** Source record ID. */
  getSourceId(): number | null | undefined

  /** Event occurrence date/time. */
  getOccurredAt(): Files.DateTimeString | null | undefined

  /** Human-readable event title. */
  getHumanTitle(): string | null | undefined

  /** Human-readable event summary. */
  getHumanSummary(): string | null | undefined

  /** Human-readable event detail fields. */
  getHumanFields(): Files.JsonObject[] | null | undefined

  /** Actor associated with the event. */
  getActor(): Files.JsonObject | null | undefined

  /** Resources associated with the event. */
  getResources(): Files.JsonObject[] | null | undefined

  /** Event payload. */
  getPayload(): Files.JsonObject | null | undefined

  /** Event Record create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Event Records */
  static list(params?: EventRecord.ListParams, options?: Files.RequestOptions): Promise<EventRecord[]>

  /** Alias of `list()`. */
  static all(params?: EventRecord.ListParams, options?: Files.RequestOptions): Promise<EventRecord[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EventRecord.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EventRecord>

  /**
   * Show Event Record
   * @param id - Event Record ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventRecord>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventRecord>
}

declare namespace EventRecord {
  /** The fields of `EventRecord` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event Record ID */
    id?: number | null

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number | null

    /** Stable event UUID. */
    event_uuid?: string | null

    /**
     * Versioned event type string. Valid values: `automation_run.canceled.v1`, `automation_run.failure.v1`,
     * `automation_run.failure_will_retry.v1`, `automation_run.partial_failure.v1`,
     * `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`, `automation_run.success.v1`,
     * `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`, `expectation_evaluation.missing.v1`,
     * `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`, `expectation_incident.open.v1`,
     * `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`, `external_event.client_log.failure.v1`,
     * `external_event.client_log.partial_failure.v1`, `external_event.client_log.skipped.v1`,
     * `external_event.client_log.success.v1`, `pending_work_event.failure.v1`, `pending_work_event.partial_failure.v1`,
     * `pending_work_event.skipped.v1`, `pending_work_event.success.v1`, `siem_http_destination_event.failure.v1`,
     * `siem_http_destination_event.partial_failure.v1`, `siem_http_destination_event.skipped.v1`,
     * `siem_http_destination_event.success.v1`, `sso_event.ldap_login.failure.v1`,
     * `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`, `sso_event.ldap_login.success.v1`,
     * `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`, `sso_event.ldap_sync.skipped.v1`,
     * `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`, `sso_event.saml_login.partial_failure.v1`,
     * `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`, `sync_run.failure.v1`,
     * `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`, `user_security_event.lockout.v1`
     */
    event_type?: string | null

    /** Event severity. */
    severity?: 'info' | 'warning' | 'error' | 'critical' | Files.OtherString | null

    /** Source record type. */
    source_type?: string | null

    /** Source record ID. */
    source_id?: number | null

    /** Event occurrence date/time. */
    occurred_at?: Files.DateTimeString | null

    /** Human-readable event title. */
    human_title?: string | null

    /** Human-readable event summary. */
    human_summary?: string | null

    /** Human-readable event detail fields. */
    human_fields?: Files.JsonObject[] | null

    /** Actor associated with the event. */
    actor?: Files.JsonObject | null

    /** Resources associated with the event. */
    resources?: Files.JsonObject[] | null

    /** Event payload. */
    payload?: Files.JsonObject | null

    /** Event Record create date/time. */
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

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `event_type`,
     * `created_at` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `event_type` or `workspace_id`. Valid field combinations are `[ event_type, created_at ]`, `[ workspace_id,
     * created_at ]`, `[ workspace_id, event_type ]` or `[ workspace_id, event_type, created_at ]`.
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
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are
     * `event_type`.
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

export default EventRecord
