import Files = require('../Files')

/** An EventChannel is a named grouping of EventSubscriptions. */
declare class EventChannel {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EventChannel.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EventChannel.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event Channel ID */
  readonly id?: number | null

  /** Event Channel name. */
  readonly name?: string | null

  /** Workspace ID. 0 means the default workspace. */
  readonly workspace_id?: number | null

  /** Event Channel description. */
  readonly description?: string | null

  /** Whether this Event Channel can dispatch events. */
  readonly enabled?: boolean | null

  /** Whether this Event Channel is the default destination for newly published events. */
  readonly default_channel?: boolean | null

  /** Event Channel create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Event Channel update date/time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Event Channel ID */
  getId(): number | null | undefined

  /** Event Channel name. */
  getName(): string | null | undefined

  /** Workspace ID. 0 means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Event Channel description. */
  getDescription(): string | null | undefined

  /** Whether this Event Channel can dispatch events. */
  getEnabled(): boolean | null | undefined

  /** Whether this Event Channel is the default destination for newly published events. */
  getDefaultChannel(): boolean | null | undefined

  /** Event Channel create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Event Channel update date/time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Event Channel ID */
  setId(value: number): void

  /** Event Channel name. */
  setName(value: string): void

  /** Workspace ID. 0 means the default workspace. */
  setWorkspaceId(value: number): void

  /** Event Channel description. */
  setDescription(value: string): void

  /** Whether this Event Channel can dispatch events. */
  setEnabled(value: boolean): void

  /** Whether this Event Channel is the default destination for newly published events. */
  setDefaultChannel(value: boolean): void

  /** Update Event Channel */
  update(params?: EventChannel.UpdateParams): Promise<this>

  /** Delete Event Channel */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Event Channels */
  static list(params?: EventChannel.ListParams, options?: Files.RequestOptions): Promise<EventChannel[]>

  /** Alias of `list()`. */
  static all(params?: EventChannel.ListParams, options?: Files.RequestOptions): Promise<EventChannel[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EventChannel.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EventChannel>

  /**
   * Show Event Channel
   * @param id - Event Channel ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventChannel>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventChannel>

  /** Create Event Channel */
  static create(params: EventChannel.CreateParams, options?: Files.RequestOptions): Promise<EventChannel>

  static default: typeof EventChannel
}

declare namespace EventChannel {
  /** The fields of `EventChannel` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event Channel ID */
    id?: number | null

    /** Event Channel name. */
    name?: string | null

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number | null

    /** Event Channel description. */
    description?: string | null

    /** Whether this Event Channel can dispatch events. */
    enabled?: boolean | null

    /** Whether this Event Channel is the default destination for newly published events. */
    default_channel?: boolean | null

    /** Event Channel create date/time. */
    created_at?: Files.DateTimeString | null

    /** Event Channel update date/time. */
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
     * `enabled`, `default_channel` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`,
     * `default_channel` or `workspace_id`. Valid field combinations are `[ workspace_id, enabled ]` and `[
     * workspace_id, default_channel ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Event Channel name. */
    name: string

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number

    /** Event Channel description. */
    description?: string

    /** Whether this Event Channel can dispatch events. */
    enabled?: boolean

    /** Whether this Event Channel is the default destination for newly published events. */
    default_channel?: boolean
  }

  interface UpdateParams {
    /** Event Channel name. */
    name?: string

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number

    /** Event Channel description. */
    description?: string

    /** Whether this Event Channel can dispatch events. */
    enabled?: boolean

    /** Whether this Event Channel is the default destination for newly published events. */
    default_channel?: boolean
  }
}

export = EventChannel
