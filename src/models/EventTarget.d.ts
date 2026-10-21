import Files from '../Files'

/** An EventTarget is a delivery destination for EventRecords. */
declare class EventTarget {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EventTarget.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EventTarget.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event Target ID */
  readonly id?: number | null

  /** Event Target name. */
  readonly name?: string | null

  /** Event Target type. */
  readonly target_type?: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder' | Files.OtherString | null

  /** Workspace ID. 0 means the default workspace or site-wide. */
  readonly workspace_id?: number | null

  /** If true, this default-workspace target can receive events from all workspaces. */
  readonly apply_to_all_workspaces?: boolean | null

  /** Whether this Event Target can receive events. */
  readonly enabled?: boolean | null

  /** Event Target configuration. Folder targets accept path and format (json or csv). */
  readonly config?: Files.JsonObject | null

  /**
   * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
   * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and
   * summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other
   * matching events retain immediate delivery.
   */
  readonly delivery_policy?: Files.JsonObject | null

  /** Event Target create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Event Target update date/time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Event Target ID */
  getId(): number | null | undefined

  /** Event Target name. */
  getName(): string | null | undefined

  /** Event Target type. */
  getTargetType(): 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder' | Files.OtherString | null | undefined

  /** Workspace ID. 0 means the default workspace or site-wide. */
  getWorkspaceId(): number | null | undefined

  /** If true, this default-workspace target can receive events from all workspaces. */
  getApplyToAllWorkspaces(): boolean | null | undefined

  /** Whether this Event Target can receive events. */
  getEnabled(): boolean | null | undefined

  /** Event Target configuration. Folder targets accept path and format (json or csv). */
  getConfig(): Files.JsonObject | null | undefined

  /**
   * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
   * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and
   * summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other
   * matching events retain immediate delivery.
   */
  getDeliveryPolicy(): Files.JsonObject | null | undefined

  /** Event Target create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Event Target update date/time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Event Target ID */
  setId(value: number): void

  /** Event Target name. */
  setName(value: string): void

  /** Event Target type. */
  setTargetType(value: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder'): void

  /** Workspace ID. 0 means the default workspace or site-wide. */
  setWorkspaceId(value: number): void

  /** If true, this default-workspace target can receive events from all workspaces. */
  setApplyToAllWorkspaces(value: boolean): void

  /** Whether this Event Target can receive events. */
  setEnabled(value: boolean): void

  /** Event Target configuration. Folder targets accept path and format (json or csv). */
  setConfig(value: Files.JsonObject): void

  /**
   * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
   * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and
   * summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other
   * matching events retain immediate delivery.
   */
  setDeliveryPolicy(value: Files.JsonObject): void

  /** Update Event Target */
  update(params?: EventTarget.UpdateParams): Promise<this>

  /** Delete Event Target */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Event Targets */
  static list(params?: EventTarget.ListParams, options?: Files.RequestOptions): Promise<EventTarget[]>

  /** Alias of `list()`. */
  static all(params?: EventTarget.ListParams, options?: Files.RequestOptions): Promise<EventTarget[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EventTarget.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EventTarget>

  /**
   * Show Event Target
   * @param id - Event Target ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventTarget>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventTarget>

  /** Create Event Target */
  static create(params: EventTarget.CreateParams, options?: Files.RequestOptions): Promise<EventTarget>
}

declare namespace EventTarget {
  /** The fields of `EventTarget` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event Target ID */
    id?: number | null

    /** Event Target name. */
    name?: string | null

    /** Event Target type. */
    target_type?: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder' | Files.OtherString | null

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number | null

    /** If true, this default-workspace target can receive events from all workspaces. */
    apply_to_all_workspaces?: boolean | null

    /** Whether this Event Target can receive events. */
    enabled?: boolean | null

    /** Event Target configuration. Folder targets accept path and format (json or csv). */
    config?: Files.JsonObject | null

    /**
     * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
     * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root),
     * and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path;
     * other matching events retain immediate delivery.
     */
    delivery_policy?: Files.JsonObject | null

    /** Event Target create date/time. */
    created_at?: Files.DateTimeString | null

    /** Event Target update date/time. */
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
     * `enabled` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`,
     * `target_type` or `workspace_id`. Valid field combinations are `[ enabled, target_type ]`, `[ workspace_id,
     * enabled ]` or `[ workspace_id, enabled, target_type ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Event Target name. */
    name: string

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number

    /** If true, this default-workspace target can receive events from all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Whether this Event Target can receive events. */
    enabled?: boolean

    /** Event Target configuration. Folder targets accept path and format (json or csv). */
    config: Files.JsonObject

    /**
     * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
     * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root),
     * and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path;
     * other matching events retain immediate delivery.
     */
    delivery_policy?: Files.JsonObject

    /** Event Target type. */
    target_type: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder'
  }

  interface UpdateParams {
    /** Event Target name. */
    name?: string

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number

    /** If true, this default-workspace target can receive events from all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Whether this Event Target can receive events. */
    enabled?: boolean

    /** Event Target configuration. Folder targets accept path and format (json or csv). */
    config?: Files.JsonObject

    /**
     * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
     * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root),
     * and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path;
     * other matching events retain immediate delivery.
     */
    delivery_policy?: Files.JsonObject
  }
}

export default EventTarget
