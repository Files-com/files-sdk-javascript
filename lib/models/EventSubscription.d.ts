import Files = require('../Files')

/** An EventSubscription selects EventRecords for an EventChannel and sends them to one or more EventTargets. */
declare class EventSubscription {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EventSubscription.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EventSubscription.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event Subscription ID */
  readonly id?: number | null

  /** Event Channel ID */
  readonly event_channel_id?: number | null

  /** Workspace ID. 0 means the default workspace or site-wide. */
  readonly workspace_id?: number | null

  /** If true, this default-workspace subscription applies to events from all workspaces. */
  readonly apply_to_all_workspaces?: boolean | null

  /** Event Subscription name. */
  readonly name?: string | null

  /** Custom subject line to use for notification emails. */
  readonly subject?: string | null

  /** Custom message to include in notification emails. */
  readonly message?: string | null

  /**
   * If true, notification email bodies contain only the custom message, omitting event details and the review button.
   * Requires a custom message, defaults to false, and does not affect non-email targets.
   */
  readonly message_only?: boolean | null

  /** Whether this Event Subscription can dispatch events. */
  readonly enabled?: boolean | null

  /**
   * Event type strings matched by this subscription. Blank means all event types. Valid values:
   * `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`,
   * `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`,
   * `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`,
   * `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`,
   * `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`,
   * `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`,
   * `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`,
   * `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`,
   * `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`,
   * `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`,
   * `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`,
   * `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`,
   * `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`,
   * `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`,
   * `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`,
   * `user_security_event.lockout.v1`
   */
  readonly event_types?: string[] | null

  /**
   * Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All
   * conditions must match.
   */
  readonly filter?: EventSubscription.Filter | null

  /** Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy. */
  readonly delivery_policy?: EventSubscription.DeliveryPolicy | null

  /** Event Target IDs this subscription sends to. */
  readonly event_target_ids?: number[] | null

  /** Event Subscription create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Event Subscription update date/time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Event Subscription ID */
  getId(): number | null | undefined

  /** Event Channel ID */
  getEventChannelId(): number | null | undefined

  /** Workspace ID. 0 means the default workspace or site-wide. */
  getWorkspaceId(): number | null | undefined

  /** If true, this default-workspace subscription applies to events from all workspaces. */
  getApplyToAllWorkspaces(): boolean | null | undefined

  /** Event Subscription name. */
  getName(): string | null | undefined

  /** Custom subject line to use for notification emails. */
  getSubject(): string | null | undefined

  /** Custom message to include in notification emails. */
  getMessage(): string | null | undefined

  /**
   * If true, notification email bodies contain only the custom message, omitting event details and the review button.
   * Requires a custom message, defaults to false, and does not affect non-email targets.
   */
  getMessageOnly(): boolean | null | undefined

  /** Whether this Event Subscription can dispatch events. */
  getEnabled(): boolean | null | undefined

  /**
   * Event type strings matched by this subscription. Blank means all event types. Valid values:
   * `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`,
   * `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`,
   * `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`,
   * `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`,
   * `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`,
   * `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`,
   * `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`,
   * `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`,
   * `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`,
   * `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`,
   * `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`,
   * `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`,
   * `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`,
   * `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`,
   * `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`,
   * `user_security_event.lockout.v1`
   */
  getEventTypes(): string[] | null | undefined

  /**
   * Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All
   * conditions must match.
   */
  getFilter(): EventSubscription.Filter | null | undefined

  /** Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy. */
  getDeliveryPolicy(): EventSubscription.DeliveryPolicy | null | undefined

  /** Event Target IDs this subscription sends to. */
  getEventTargetIds(): number[] | null | undefined

  /** Event Subscription create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Event Subscription update date/time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Event Subscription ID */
  setId(value: number): void

  /** Event Channel ID */
  setEventChannelId(value: number): void

  /** Workspace ID. 0 means the default workspace or site-wide. */
  setWorkspaceId(value: number): void

  /** If true, this default-workspace subscription applies to events from all workspaces. */
  setApplyToAllWorkspaces(value: boolean): void

  /** Event Subscription name. */
  setName(value: string): void

  /** Custom subject line to use for notification emails. */
  setSubject(value: string): void

  /** Custom message to include in notification emails. */
  setMessage(value: string): void

  /**
   * If true, notification email bodies contain only the custom message, omitting event details and the review button.
   * Requires a custom message, defaults to false, and does not affect non-email targets.
   */
  setMessageOnly(value: boolean): void

  /** Whether this Event Subscription can dispatch events. */
  setEnabled(value: boolean): void

  /**
   * Event type strings matched by this subscription. Blank means all event types. Valid values:
   * `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`,
   * `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`,
   * `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`,
   * `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`,
   * `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`,
   * `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`,
   * `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`,
   * `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`,
   * `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`,
   * `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`,
   * `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`,
   * `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`,
   * `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`,
   * `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`,
   * `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`,
   * `user_security_event.lockout.v1`
   */
  setEventTypes(value: string[]): void

  /**
   * Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All
   * conditions must match.
   */
  setFilter(value: EventSubscription.Filter): void

  /** Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy. */
  setDeliveryPolicy(value: EventSubscription.DeliveryPolicy): void

  /** Event Target IDs this subscription sends to. */
  setEventTargetIds(value: number[]): void

  /** Update Event Subscription */
  update(params?: EventSubscription.UpdateParams): Promise<this>

  /** Delete Event Subscription */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Event Subscriptions */
  static list(params?: EventSubscription.ListParams, options?: Files.RequestOptions): Promise<EventSubscription[]>

  /** Alias of `list()`. */
  static all(params?: EventSubscription.ListParams, options?: Files.RequestOptions): Promise<EventSubscription[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EventSubscription.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EventSubscription>

  /**
   * Show Event Subscription
   * @param id - Event Subscription ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventSubscription>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventSubscription>

  /** Create Event Subscription */
  static create(params: EventSubscription.CreateParams, options?: Files.RequestOptions): Promise<EventSubscription>

  static default: typeof EventSubscription
}

declare namespace EventSubscription {
  /** The fields of `EventSubscription` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event Subscription ID */
    id?: number | null

    /** Event Channel ID */
    event_channel_id?: number | null

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number | null

    /** If true, this default-workspace subscription applies to events from all workspaces. */
    apply_to_all_workspaces?: boolean | null

    /** Event Subscription name. */
    name?: string | null

    /** Custom subject line to use for notification emails. */
    subject?: string | null

    /** Custom message to include in notification emails. */
    message?: string | null

    /**
     * If true, notification email bodies contain only the custom message, omitting event details and the review button.
     * Requires a custom message, defaults to false, and does not affect non-email targets.
     */
    message_only?: boolean | null

    /** Whether this Event Subscription can dispatch events. */
    enabled?: boolean | null

    /**
     * Event type strings matched by this subscription. Blank means all event types. Valid values:
     * `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`,
     * `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`,
     * `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`,
     * `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`,
     * `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`,
     * `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`,
     * `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`,
     * `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`,
     * `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`,
     * `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`,
     * `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`,
     * `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`,
     * `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`,
     * `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`,
     * `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`,
     * `user_security_event.lockout.v1`
     */
    event_types?: string[] | null

    /**
     * Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All
     * conditions must match.
     */
    filter?: EventSubscription.Filter | null

    /** Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy. */
    delivery_policy?: EventSubscription.DeliveryPolicy | null

    /** Event Target IDs this subscription sends to. */
    event_target_ids?: number[] | null

    /** Event Subscription create date/time. */
    created_at?: Files.DateTimeString | null

    /** Event Subscription update date/time. */
    updated_at?: Files.DateTimeString | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`,
     * `enabled`, `event_channel_id` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`,
     * `event_channel_id` or `workspace_id`. Valid field combinations are `[ enabled, event_channel_id ]`, `[
     * workspace_id, enabled ]`, `[ workspace_id, event_channel_id ]` or `[ workspace_id, enabled, event_channel_id ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Event Channel ID */
    event_channel_id?: number

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number

    /** If true, this default-workspace subscription applies to events from all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Event Subscription name. */
    name: string

    /** Custom subject line to use for notification emails. */
    subject?: string

    /** Custom message to include in notification emails. */
    message?: string

    /**
     * If true, notification email bodies contain only the custom message, omitting event details and the review button.
     * Requires a custom message, defaults to false, and does not affect non-email targets.
     */
    message_only?: boolean

    /** Whether this Event Subscription can dispatch events. */
    enabled?: boolean

    /**
     * Event type strings matched by this subscription. Blank means all event types. Valid values:
     * `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`,
     * `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`,
     * `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`,
     * `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`,
     * `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`,
     * `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`,
     * `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`,
     * `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`,
     * `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`,
     * `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`,
     * `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`,
     * `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`,
     * `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`,
     * `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`,
     * `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`,
     * `user_security_event.lockout.v1`
     */
    event_types?: string[]

    /**
     * Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All
     * conditions must match.
     */
    filter?: EventSubscription.Filter

    /** Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy. */
    delivery_policy?: EventSubscription.DeliveryPolicy

    /** Event Target IDs this subscription sends to. */
    event_target_ids?: number[]
  }

  interface UpdateParams {
    /** Event Channel ID */
    event_channel_id?: number

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number

    /** If true, this default-workspace subscription applies to events from all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Event Subscription name. */
    name?: string

    /** Custom subject line to use for notification emails. */
    subject?: string

    /** Custom message to include in notification emails. */
    message?: string

    /**
     * If true, notification email bodies contain only the custom message, omitting event details and the review button.
     * Requires a custom message, defaults to false, and does not affect non-email targets.
     */
    message_only?: boolean

    /** Whether this Event Subscription can dispatch events. */
    enabled?: boolean

    /**
     * Event type strings matched by this subscription. Blank means all event types. Valid values:
     * `automation_run.canceled.v1`, `automation_run.failure.v1`, `automation_run.failure_will_retry.v1`,
     * `automation_run.partial_failure.v1`, `automation_run.partial_failure_will_retry.v1`, `automation_run.skipped.v1`,
     * `automation_run.success.v1`, `expectation_evaluation.invalid.v1`, `expectation_evaluation.late.v1`,
     * `expectation_evaluation.missing.v1`, `expectation_evaluation.success.v1`, `expectation_incident.acknowledged.v1`,
     * `expectation_incident.open.v1`, `expectation_incident.resolved.v1`, `expectation_incident.snoozed.v1`,
     * `external_event.client_log.failure.v1`, `external_event.client_log.partial_failure.v1`,
     * `external_event.client_log.skipped.v1`, `external_event.client_log.success.v1`, `pending_work_event.failure.v1`,
     * `pending_work_event.partial_failure.v1`, `pending_work_event.skipped.v1`, `pending_work_event.success.v1`,
     * `siem_http_destination_event.failure.v1`, `siem_http_destination_event.partial_failure.v1`,
     * `siem_http_destination_event.skipped.v1`, `siem_http_destination_event.success.v1`,
     * `sso_event.ldap_login.failure.v1`, `sso_event.ldap_login.partial_failure.v1`, `sso_event.ldap_login.skipped.v1`,
     * `sso_event.ldap_login.success.v1`, `sso_event.ldap_sync.failure.v1`, `sso_event.ldap_sync.partial_failure.v1`,
     * `sso_event.ldap_sync.skipped.v1`, `sso_event.ldap_sync.success.v1`, `sso_event.saml_login.failure.v1`,
     * `sso_event.saml_login.partial_failure.v1`, `sso_event.saml_login.skipped.v1`, `sso_event.saml_login.success.v1`,
     * `sync_run.failure.v1`, `sync_run.partial_failure.v1`, `sync_run.skipped.v1`, `sync_run.success.v1`,
     * `user_security_event.lockout.v1`
     */
    event_types?: string[]

    /**
     * Conditions on event fields that an event must meet to be delivered, keyed by dot-notation field path. All
     * conditions must match.
     */
    filter?: EventSubscription.Filter

    /** Event Subscription delivery policy. Overrides retry settings from each Event Target's delivery policy. */
    delivery_policy?: EventSubscription.DeliveryPolicy

    /** Event Target IDs this subscription sends to. */
    event_target_ids?: number[]
  }

  /**
   * Each key is the full dot-notation path to a field in the event JSON that webhook targets receive, such as
   * `payload.status`. Paths can reference top-level fields such as `type`, `workspace_id`, and `occurred_at`, actor
   * fields such as `actor.username`, human-readable fields such as `human.title`, and event-specific fields under
   * `payload`, such as `payload.status`, `payload.sync_name`, or `payload.automation_name`. Fields under `payload` vary
   * by event type. Every segment of a path must name an object key.
   * Each value is the condition that field must meet: a plain value, an array of values, or an object with exactly one
   * operator key. A plain value works the same as `equals`, and an array works the same as `one_of`.
   * An event matches only when every condition matches. An empty object matches every event of the subscription's event
   * types.
   */
  type Filter = {
    [key: string]: EventSubscription.Filter.Condition
  }

  namespace Filter {
    type Condition =
      | string | number | boolean
      | Files.JsonValue[]
      | EventSubscription.Filter.Equals
      | EventSubscription.Filter.OneOf
      | EventSubscription.Filter.Prefix
      | EventSubscription.Filter.Exists

    /** Equals */
    interface Equals {
      /** Matches when the field equals this value exactly, including its JSON type. */
      equals: Files.JsonValue
    }

    /** One of */
    interface OneOf {
      /** Matches when the field equals any value in this array. */
      one_of: Files.JsonValue[]
    }

    /** Starts with */
    interface Prefix {
      /** Matches when the field's text starts with this value. The comparison is case-sensitive. */
      prefix: string
    }

    /** Exists */
    interface Exists {
      /**
       * When `true`, matches when the field is present and not null. When `false`, matches when the field is missing or
       * null.
       */
      exists: boolean
    }
  }

  /**
   * Retry settings for deliveries from this subscription. Each omitted key uses the value from the Event Target's
   * delivery_policy, and then the default.
   */
  interface DeliveryPolicy {
    /**
     * Maximum delivery attempts, including the first attempt. A value below 1 uses the default of 5. Null works like an
     * omitted key.
     */
    max_attempts?: number | null

    /**
     * Minutes to wait before each retry. The last value is used for any later retries, so a list with one value applies
     * it to every retry. An empty list uses the default of [1,5,15,60,180]. Null works like an omitted key.
     */
    retry_delay_minutes?: number[] | null
  }
}

export = EventSubscription
