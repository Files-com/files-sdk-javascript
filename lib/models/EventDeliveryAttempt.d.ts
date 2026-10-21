import Files = require('../Files')

/** An EventDeliveryAttempt records delivery state for an EventRecord and EventTarget. */
declare class EventDeliveryAttempt {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EventDeliveryAttempt.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EventDeliveryAttempt.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event Delivery Attempt ID */
  readonly id?: number | null

  /** Event Record ID */
  readonly event_record_id?: number | null

  /** Event Subscription ID */
  readonly event_subscription_id?: number | null

  /** Event Target ID */
  readonly event_target_id?: number | null

  /**
   * Shared summary ID when this event is delivered in a Slack or Teams subfolder summary. All events in a summary share
   * its delivery outcome.
   */
  readonly activity_notification_batch_id?: number | null

  /** Workspace ID. 0 means the default workspace or site-wide. */
  readonly workspace_id?: number | null

  /** Delivery status. */
  readonly status?: 'queued' | 'success' | 'retrying' | 'failed' | Files.OtherString | null

  /** Number of delivery attempts made. */
  readonly attempt_number?: number | null

  /** HTTP response code, if applicable. */
  readonly response_code?: number | null

  /** Delivery error message, if applicable. */
  readonly error_message?: string | null

  /** Delivery response body, if applicable. */
  readonly response_body?: string | null

  /** Delivery latency in milliseconds. */
  readonly latency_ms?: number | null

  /** Successful delivery date/time. */
  readonly delivered_at?: Files.DateTimeString | null

  /** Most recent attempt date/time. */
  readonly last_attempted_at?: Files.DateTimeString | null

  /** Next scheduled attempt date/time. */
  readonly next_attempt_at?: Files.DateTimeString | null

  /** Delivery Attempt create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Event Delivery Attempt ID */
  getId(): number | null | undefined

  /** Event Record ID */
  getEventRecordId(): number | null | undefined

  /** Event Subscription ID */
  getEventSubscriptionId(): number | null | undefined

  /** Event Target ID */
  getEventTargetId(): number | null | undefined

  /**
   * Shared summary ID when this event is delivered in a Slack or Teams subfolder summary. All events in a summary share
   * its delivery outcome.
   */
  getActivityNotificationBatchId(): number | null | undefined

  /** Workspace ID. 0 means the default workspace or site-wide. */
  getWorkspaceId(): number | null | undefined

  /** Delivery status. */
  getStatus(): 'queued' | 'success' | 'retrying' | 'failed' | Files.OtherString | null | undefined

  /** Number of delivery attempts made. */
  getAttemptNumber(): number | null | undefined

  /** HTTP response code, if applicable. */
  getResponseCode(): number | null | undefined

  /** Delivery error message, if applicable. */
  getErrorMessage(): string | null | undefined

  /** Delivery response body, if applicable. */
  getResponseBody(): string | null | undefined

  /** Delivery latency in milliseconds. */
  getLatencyMs(): number | null | undefined

  /** Successful delivery date/time. */
  getDeliveredAt(): Files.DateTimeString | null | undefined

  /** Most recent attempt date/time. */
  getLastAttemptedAt(): Files.DateTimeString | null | undefined

  /** Next scheduled attempt date/time. */
  getNextAttemptAt(): Files.DateTimeString | null | undefined

  /** Delivery Attempt create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Event Delivery Attempts */
  static list(params?: EventDeliveryAttempt.ListParams, options?: Files.RequestOptions): Promise<EventDeliveryAttempt[]>

  /** Alias of `list()`. */
  static all(params?: EventDeliveryAttempt.ListParams, options?: Files.RequestOptions): Promise<EventDeliveryAttempt[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EventDeliveryAttempt.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EventDeliveryAttempt>

  /**
   * Show Event Delivery Attempt
   * @param id - Event Delivery Attempt ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventDeliveryAttempt>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventDeliveryAttempt>

  static default: typeof EventDeliveryAttempt
}

declare namespace EventDeliveryAttempt {
  /** The fields of `EventDeliveryAttempt` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event Delivery Attempt ID */
    id?: number | null

    /** Event Record ID */
    event_record_id?: number | null

    /** Event Subscription ID */
    event_subscription_id?: number | null

    /** Event Target ID */
    event_target_id?: number | null

    /**
     * Shared summary ID when this event is delivered in a Slack or Teams subfolder summary. All events in a summary
     * share its delivery outcome.
     */
    activity_notification_batch_id?: number | null

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number | null

    /** Delivery status. */
    status?: 'queued' | 'success' | 'retrying' | 'failed' | Files.OtherString | null

    /** Number of delivery attempts made. */
    attempt_number?: number | null

    /** HTTP response code, if applicable. */
    response_code?: number | null

    /** Delivery error message, if applicable. */
    error_message?: string | null

    /** Delivery response body, if applicable. */
    response_body?: string | null

    /** Delivery latency in milliseconds. */
    latency_ms?: number | null

    /** Successful delivery date/time. */
    delivered_at?: Files.DateTimeString | null

    /** Most recent attempt date/time. */
    last_attempted_at?: Files.DateTimeString | null

    /** Next scheduled attempt date/time. */
    next_attempt_at?: Files.DateTimeString | null

    /** Delivery Attempt create date/time. */
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`,
     * `status`, `event_record_id`, `event_target_id` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `status`,
     * `workspace_id`, `event_record_id` or `event_target_id`. Valid field combinations are `[ workspace_id, status ]`,
     * `[ workspace_id, event_record_id ]` or `[ workspace_id, event_target_id ]`.
     */
    filter?: Files.JsonObject
  }
}

export = EventDeliveryAttempt
