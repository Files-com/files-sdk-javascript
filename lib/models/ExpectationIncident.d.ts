import Files = require('../Files')

/** An ExpectationIncident groups ongoing failure behavior for an Expectation over time. */
declare class ExpectationIncident {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ExpectationIncident.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ExpectationIncident.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Expectation Incident ID */
  readonly id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Expectation ID. */
  readonly expectation_id?: number | null

  /** Incident status. */
  readonly status?: 'open' | 'acknowledged' | 'snoozed' | 'resolved' | Files.OtherString | null

  /** When the incident was opened. */
  readonly opened_at?: Files.DateTimeString | null

  /** When the most recent failing evaluation contributing to the incident occurred. */
  readonly last_failed_at?: Files.DateTimeString | null

  /** When the incident was acknowledged. */
  readonly acknowledged_at?: Files.DateTimeString | null

  /** When the current snooze expires. */
  readonly snoozed_until?: Files.DateTimeString | null

  /** When the incident was resolved. */
  readonly resolved_at?: Files.DateTimeString | null

  /** Evaluation that first opened the incident. */
  readonly opened_by_evaluation_id?: number | null

  /** Most recent evaluation linked to the incident. */
  readonly last_evaluation_id?: number | null

  /** Evaluation that resolved the incident. */
  readonly resolved_by_evaluation_id?: number | null

  /** Compact incident summary payload. */
  readonly summary?: Files.JsonObject | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Expectation Incident ID */
  getId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Expectation ID. */
  getExpectationId(): number | null | undefined

  /** Incident status. */
  getStatus(): 'open' | 'acknowledged' | 'snoozed' | 'resolved' | Files.OtherString | null | undefined

  /** When the incident was opened. */
  getOpenedAt(): Files.DateTimeString | null | undefined

  /** When the most recent failing evaluation contributing to the incident occurred. */
  getLastFailedAt(): Files.DateTimeString | null | undefined

  /** When the incident was acknowledged. */
  getAcknowledgedAt(): Files.DateTimeString | null | undefined

  /** When the current snooze expires. */
  getSnoozedUntil(): Files.DateTimeString | null | undefined

  /** When the incident was resolved. */
  getResolvedAt(): Files.DateTimeString | null | undefined

  /** Evaluation that first opened the incident. */
  getOpenedByEvaluationId(): number | null | undefined

  /** Most recent evaluation linked to the incident. */
  getLastEvaluationId(): number | null | undefined

  /** Evaluation that resolved the incident. */
  getResolvedByEvaluationId(): number | null | undefined

  /** Compact incident summary payload. */
  getSummary(): Files.JsonObject | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Resolve an expectation incident */
  resolve(params?: Files.NoParams): Promise<ExpectationIncident>

  /** Snooze an expectation incident until a specified time */
  snooze(params?: ExpectationIncident.SnoozeParams): Promise<ExpectationIncident>

  /** Acknowledge an expectation incident */
  acknowledge(params?: Files.NoParams): Promise<ExpectationIncident>

  /** List Expectation Incidents */
  static list(params?: ExpectationIncident.ListParams, options?: Files.RequestOptions): Promise<ExpectationIncident[]>

  /** Alias of `list()`. */
  static all(params?: ExpectationIncident.ListParams, options?: Files.RequestOptions): Promise<ExpectationIncident[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ExpectationIncident.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ExpectationIncident>

  /**
   * Show Expectation Incident
   * @param id - Expectation Incident ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ExpectationIncident>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ExpectationIncident>

  static default: typeof ExpectationIncident
}

declare namespace ExpectationIncident {
  /** The fields of `ExpectationIncident` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Expectation Incident ID */
    id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Expectation ID. */
    expectation_id?: number | null

    /** Incident status. */
    status?: 'open' | 'acknowledged' | 'snoozed' | 'resolved' | Files.OtherString | null

    /** When the incident was opened. */
    opened_at?: Files.DateTimeString | null

    /** When the most recent failing evaluation contributing to the incident occurred. */
    last_failed_at?: Files.DateTimeString | null

    /** When the incident was acknowledged. */
    acknowledged_at?: Files.DateTimeString | null

    /** When the current snooze expires. */
    snoozed_until?: Files.DateTimeString | null

    /** When the incident was resolved. */
    resolved_at?: Files.DateTimeString | null

    /** Evaluation that first opened the incident. */
    opened_by_evaluation_id?: number | null

    /** Most recent evaluation linked to the incident. */
    last_evaluation_id?: number | null

    /** Evaluation that resolved the incident. */
    resolved_by_evaluation_id?: number | null

    /** Compact incident summary payload. */
    summary?: Files.JsonObject | null

    /** Creation time. */
    created_at?: Files.DateTimeString | null

    /** Last update time. */
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `created_at` or `expectation_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `expectation_id` and `workspace_id`. Valid field combinations are `[ workspace_id, expectation_id ]`.
     */
    filter?: Files.JsonObject
  }

  interface SnoozeParams {
    /**
     * Required: when not given, this object's `snoozed_until` is used. Time until which the incident should remain
     * snoozed.
     */
    snoozed_until?: Files.DateTimeString
  }
}

export = ExpectationIncident
