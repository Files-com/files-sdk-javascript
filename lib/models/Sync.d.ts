import Files = require('../Files')
import SyncRun = require('./SyncRun')

/**
 * A Sync represents a file synchronization job between two locations (local-remote, remote-remote, local-child_site,
 * etc).
 */
declare class Sync {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Sync.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Sync.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Sync ID */
  readonly id?: number | null

  /** Name for this sync job */
  readonly name?: string | null

  /** Description for this sync job */
  readonly description?: string | null

  /** Site ID this sync belongs to */
  readonly site_id?: number | null

  /** Workspace ID this sync belongs to */
  readonly workspace_id?: number | null

  /** User who created or owns this sync */
  readonly user_id?: number | null

  /** Absolute source path for the sync */
  readonly src_path?: string | null

  /** Absolute destination path for the sync */
  readonly dest_path?: string | null

  /** Remote server ID for the source (if remote) */
  readonly src_remote_server_id?: number | null

  /** Remote server ID for the destination (if remote) */
  readonly dest_remote_server_id?: number | null

  /** Source site ID if syncing from a child or partner site */
  readonly src_site_id?: number | null

  /** Destination site ID if syncing to a child or partner site */
  readonly dest_site_id?: number | null

  /** Is this a two-way sync? */
  readonly two_way?: boolean | null

  /** Keep files after copying? */
  readonly keep_after_copy?: boolean | null

  /** Delete empty folders after sync? */
  readonly delete_empty_folders?: boolean | null

  /** Is this sync disabled? */
  readonly disabled?: boolean | null

  /** Trigger type: daily, custom_schedule, or manual */
  readonly trigger?: 'daily' | 'custom_schedule' | 'manual' | Files.OtherString | null

  /**
   * Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin
   * further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
   */
  readonly trigger_file?: string | null

  /** If true, the trigger file will be sent at the end of a successful sync even when no files were transferred. */
  readonly always_write_trigger_file?: boolean | null

  /** Array of glob patterns to include */
  readonly include_patterns?: string[] | null

  /** Array of glob patterns to exclude */
  readonly exclude_patterns?: string[] | null

  /** When this sync was created */
  readonly created_at?: Files.DateTimeString | null

  /** When this sync was last updated */
  readonly updated_at?: Files.DateTimeString | null

  /**
   * Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval`
   * value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used
   * if `trigger` is empty.
   */
  readonly sync_interval_minutes?: number | null

  /**
   * If trigger is `daily`, this specifies how often to run this sync. One of: `day`, `week`, `week_end`, `month`,
   * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
   */
  readonly interval?: string | null

  /**
   * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`,
   * `quarter`, `year`.
   */
  readonly recurring_day?: number | null

  /**
   * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
   * `week`, `month`, `quarter`, `year`.
   */
  readonly recurring_days?: number[] | null

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields. */
  readonly schedule_id?: number | null

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the
   * week. 0 is Sunday, 1 is Monday, etc.
   */
  readonly schedule_days_of_week?: number[] | null

  /**
   * Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For
   * `daily`, run at these times on the scheduled interval date.
   */
  readonly schedule_times_of_day?: string[] | null

  /** Time zone for the schedule. If not set, times are interpreted as UTC. */
  readonly schedule_time_zone?: string | null

  /** Skip the sync if there is a formal, observed holiday for this region. */
  readonly holiday_region?: string | null

  /** The latest run of this sync */
  readonly latest_sync_run?: SyncRun.Attributes | null

  /** Sync ID */
  getId(): number | null | undefined

  /** Name for this sync job */
  getName(): string | null | undefined

  /** Description for this sync job */
  getDescription(): string | null | undefined

  /** Site ID this sync belongs to */
  getSiteId(): number | null | undefined

  /** Workspace ID this sync belongs to */
  getWorkspaceId(): number | null | undefined

  /** User who created or owns this sync */
  getUserId(): number | null | undefined

  /** Absolute source path for the sync */
  getSrcPath(): string | null | undefined

  /** Absolute destination path for the sync */
  getDestPath(): string | null | undefined

  /** Remote server ID for the source (if remote) */
  getSrcRemoteServerId(): number | null | undefined

  /** Remote server ID for the destination (if remote) */
  getDestRemoteServerId(): number | null | undefined

  /** Source site ID if syncing from a child or partner site */
  getSrcSiteId(): number | null | undefined

  /** Destination site ID if syncing to a child or partner site */
  getDestSiteId(): number | null | undefined

  /** Is this a two-way sync? */
  getTwoWay(): boolean | null | undefined

  /** Keep files after copying? */
  getKeepAfterCopy(): boolean | null | undefined

  /** Delete empty folders after sync? */
  getDeleteEmptyFolders(): boolean | null | undefined

  /** Is this sync disabled? */
  getDisabled(): boolean | null | undefined

  /** Trigger type: daily, custom_schedule, or manual */
  getTrigger(): 'daily' | 'custom_schedule' | 'manual' | Files.OtherString | null | undefined

  /**
   * Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin
   * further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
   */
  getTriggerFile(): string | null | undefined

  /** If true, the trigger file will be sent at the end of a successful sync even when no files were transferred. */
  getAlwaysWriteTriggerFile(): boolean | null | undefined

  /** Array of glob patterns to include */
  getIncludePatterns(): string[] | null | undefined

  /** Array of glob patterns to exclude */
  getExcludePatterns(): string[] | null | undefined

  /** When this sync was created */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** When this sync was last updated */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /**
   * Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval`
   * value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used
   * if `trigger` is empty.
   */
  getSyncIntervalMinutes(): number | null | undefined

  /**
   * If trigger is `daily`, this specifies how often to run this sync. One of: `day`, `week`, `week_end`, `month`,
   * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
   */
  getInterval(): string | null | undefined

  /**
   * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`,
   * `quarter`, `year`.
   */
  getRecurringDay(): number | null | undefined

  /**
   * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
   * `week`, `month`, `quarter`, `year`.
   */
  getRecurringDays(): number[] | null | undefined

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields. */
  getScheduleId(): number | null | undefined

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the
   * week. 0 is Sunday, 1 is Monday, etc.
   */
  getScheduleDaysOfWeek(): number[] | null | undefined

  /**
   * Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For
   * `daily`, run at these times on the scheduled interval date.
   */
  getScheduleTimesOfDay(): string[] | null | undefined

  /** Time zone for the schedule. If not set, times are interpreted as UTC. */
  getScheduleTimeZone(): string | null | undefined

  /** Skip the sync if there is a formal, observed holiday for this region. */
  getHolidayRegion(): string | null | undefined

  /** The latest run of this sync */
  getLatestSyncRun(): SyncRun.Attributes | null | undefined

  /** Sync ID */
  setId(value: number): void

  /** Name for this sync job */
  setName(value: string): void

  /** Description for this sync job */
  setDescription(value: string): void

  /** Site ID this sync belongs to */
  setSiteId(value: number): void

  /** Workspace ID this sync belongs to */
  setWorkspaceId(value: number): void

  /** User who created or owns this sync */
  setUserId(value: number): void

  /** Absolute source path for the sync */
  setSrcPath(value: string): void

  /** Absolute destination path for the sync */
  setDestPath(value: string): void

  /** Remote server ID for the source (if remote) */
  setSrcRemoteServerId(value: number): void

  /** Remote server ID for the destination (if remote) */
  setDestRemoteServerId(value: number): void

  /** Source site ID if syncing from a child or partner site */
  setSrcSiteId(value: number): void

  /** Destination site ID if syncing to a child or partner site */
  setDestSiteId(value: number): void

  /** Is this a two-way sync? */
  setTwoWay(value: boolean): void

  /** Keep files after copying? */
  setKeepAfterCopy(value: boolean): void

  /** Delete empty folders after sync? */
  setDeleteEmptyFolders(value: boolean): void

  /** Is this sync disabled? */
  setDisabled(value: boolean): void

  /** Trigger type: daily, custom_schedule, or manual */
  setTrigger(value: 'daily' | 'custom_schedule' | 'manual'): void

  /**
   * Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin
   * further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
   */
  setTriggerFile(value: string): void

  /** If true, the trigger file will be sent at the end of a successful sync even when no files were transferred. */
  setAlwaysWriteTriggerFile(value: boolean): void

  /** Array of glob patterns to include */
  setIncludePatterns(value: string[]): void

  /** Array of glob patterns to exclude */
  setExcludePatterns(value: string[]): void

  /**
   * Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval`
   * value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used
   * if `trigger` is empty.
   */
  setSyncIntervalMinutes(value: number): void

  /**
   * If trigger is `daily`, this specifies how often to run this sync. One of: `day`, `week`, `week_end`, `month`,
   * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
   */
  setInterval(value: string): void

  /**
   * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`,
   * `quarter`, `year`.
   */
  setRecurringDay(value: number): void

  /**
   * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
   * `week`, `month`, `quarter`, `year`.
   */
  setRecurringDays(value: number[]): void

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields. */
  setScheduleId(value: number): void

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the
   * week. 0 is Sunday, 1 is Monday, etc.
   */
  setScheduleDaysOfWeek(value: number[]): void

  /**
   * Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For
   * `daily`, run at these times on the scheduled interval date.
   */
  setScheduleTimesOfDay(value: string[]): void

  /** Time zone for the schedule. If not set, times are interpreted as UTC. */
  setScheduleTimeZone(value: string): void

  /** Skip the sync if there is a formal, observed holiday for this region. */
  setHolidayRegion(value: string): void

  /** The latest run of this sync */
  setLatestSyncRun(value: SyncRun.Attributes): void

  /** Dry Run Sync */
  dryRun(params?: Files.NoParams): Promise<void>

  /** Manually Run Sync */
  manualRun(params?: Files.NoParams): Promise<void>

  /** Update Sync */
  update(params?: Sync.UpdateParams): Promise<this>

  /** Delete Sync */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Syncs */
  static list(params?: Sync.ListParams, options?: Files.RequestOptions): Promise<Sync[]>

  /** Alias of `list()`. */
  static all(params?: Sync.ListParams, options?: Files.RequestOptions): Promise<Sync[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Sync.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Sync>

  /**
   * Show Sync
   * @param id - Sync ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Sync>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Sync>

  /** Create Sync */
  static create(params?: Sync.CreateParams, options?: Files.RequestOptions): Promise<Sync>

  static default: typeof Sync
}

declare namespace Sync {
  /** The fields of `Sync` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Sync ID */
    id?: number | null

    /** Name for this sync job */
    name?: string | null

    /** Description for this sync job */
    description?: string | null

    /** Site ID this sync belongs to */
    site_id?: number | null

    /** Workspace ID this sync belongs to */
    workspace_id?: number | null

    /** User who created or owns this sync */
    user_id?: number | null

    /** Absolute source path for the sync */
    src_path?: string | null

    /** Absolute destination path for the sync */
    dest_path?: string | null

    /** Remote server ID for the source (if remote) */
    src_remote_server_id?: number | null

    /** Remote server ID for the destination (if remote) */
    dest_remote_server_id?: number | null

    /** Source site ID if syncing from a child or partner site */
    src_site_id?: number | null

    /** Destination site ID if syncing to a child or partner site */
    dest_site_id?: number | null

    /** Is this a two-way sync? */
    two_way?: boolean | null

    /** Keep files after copying? */
    keep_after_copy?: boolean | null

    /** Delete empty folders after sync? */
    delete_empty_folders?: boolean | null

    /** Is this sync disabled? */
    disabled?: boolean | null

    /** Trigger type: daily, custom_schedule, or manual */
    trigger?: 'daily' | 'custom_schedule' | 'manual' | Files.OtherString | null

    /**
     * Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can
     * begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
     */
    trigger_file?: string | null

    /** If true, the trigger file will be sent at the end of a successful sync even when no files were transferred. */
    always_write_trigger_file?: boolean | null

    /** Array of glob patterns to include */
    include_patterns?: string[] | null

    /** Array of glob patterns to exclude */
    exclude_patterns?: string[] | null

    /** When this sync was created */
    created_at?: Files.DateTimeString | null

    /** When this sync was last updated */
    updated_at?: Files.DateTimeString | null

    /**
     * Frequency in minutes between syncs. If set, this value must be greater than or equal to the
     * `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used.
     * This setting is only used if `trigger` is empty.
     */
    sync_interval_minutes?: number | null

    /**
     * If trigger is `daily`, this specifies how often to run this sync. One of: `day`, `week`, `week_end`, `month`,
     * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
     */
    interval?: string | null

    /**
     * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`,
     * `month`, `quarter`, `year`.
     */
    recurring_day?: number | null

    /**
     * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
     * `week`, `month`, `quarter`, `year`.
     */
    recurring_days?: number[] | null

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields. */
    schedule_id?: number | null

    /**
     * If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the
     * week. 0 is Sunday, 1 is Monday, etc.
     */
    schedule_days_of_week?: number[] | null

    /**
     * Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For
     * `daily`, run at these times on the scheduled interval date.
     */
    schedule_times_of_day?: string[] | null

    /** Time zone for the schedule. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string | null

    /** Skip the sync if there is a formal, observed holiday for this region. */
    holiday_region?: string | null

    /** The latest run of this sync */
    latest_sync_run?: SyncRun.Attributes | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`,
     * `workspace_id` or `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`,
     * `disabled`, `src_remote_server_id` or `dest_remote_server_id`. Valid field combinations are `[ workspace_id,
     * disabled ]`, `[ workspace_id, src_remote_server_id ]`, `[ workspace_id, dest_remote_server_id ]`, `[ disabled,
     * src_remote_server_id ]`, `[ disabled, dest_remote_server_id ]`, `[ workspace_id, disabled, src_remote_server_id
     * ]` or `[ workspace_id, disabled, dest_remote_server_id ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Delete empty folders after sync? */
    delete_empty_folders?: boolean

    /** Description for this sync job */
    description?: string

    /** Absolute destination path for the sync */
    dest_path?: string

    /** Remote server ID for the destination (if remote) */
    dest_remote_server_id?: number

    /** Is this sync disabled? */
    disabled?: boolean

    /** Array of glob patterns to exclude */
    exclude_patterns?: string[]

    /** Skip the sync if there is a formal, observed holiday for this region. */
    holiday_region?: string

    /** Array of glob patterns to include */
    include_patterns?: string[]

    /**
     * If trigger is `daily`, this specifies how often to run this sync. One of: `day`, `week`, `week_end`, `month`,
     * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
     */
    interval?: string

    /** Keep files after copying? */
    keep_after_copy?: boolean

    /** Name for this sync job */
    name?: string

    /**
     * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`,
     * `month`, `quarter`, `year`.
     */
    recurring_day?: number

    /**
     * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
     * `week`, `month`, `quarter`, `year`.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields. */
    schedule_id?: number

    /**
     * If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the
     * week. 0 is Sunday, 1 is Monday, etc.
     */
    schedule_days_of_week?: number[]

    /** Time zone for the schedule. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string

    /**
     * Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For
     * `daily`, run at these times on the scheduled interval date.
     */
    schedule_times_of_day?: string[]

    /** Absolute source path for the sync */
    src_path?: string

    /** Remote server ID for the source (if remote) */
    src_remote_server_id?: number

    /**
     * Frequency in minutes between syncs. If set, this value must be greater than or equal to the
     * `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used.
     * This setting is only used if `trigger` is empty.
     */
    sync_interval_minutes?: number

    /** Trigger type: daily, custom_schedule, or manual */
    trigger?: 'daily' | 'custom_schedule' | 'manual'

    /**
     * Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can
     * begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
     */
    trigger_file?: string

    /** If true, the trigger file will be sent at the end of a successful sync even when no files were transferred. */
    always_write_trigger_file?: boolean

    /** Workspace ID this sync belongs to */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Delete empty folders after sync? */
    delete_empty_folders?: boolean

    /** Description for this sync job */
    description?: string

    /** Absolute destination path for the sync */
    dest_path?: string

    /** Remote server ID for the destination (if remote) */
    dest_remote_server_id?: number

    /** Is this sync disabled? */
    disabled?: boolean

    /** Array of glob patterns to exclude */
    exclude_patterns?: string[]

    /** Skip the sync if there is a formal, observed holiday for this region. */
    holiday_region?: string

    /** Array of glob patterns to include */
    include_patterns?: string[]

    /**
     * If trigger is `daily`, this specifies how often to run this sync. One of: `day`, `week`, `week_end`, `month`,
     * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
     */
    interval?: string

    /** Keep files after copying? */
    keep_after_copy?: boolean

    /** Name for this sync job */
    name?: string

    /**
     * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`,
     * `month`, `quarter`, `year`.
     */
    recurring_day?: number

    /**
     * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
     * `week`, `month`, `quarter`, `year`.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields. */
    schedule_id?: number

    /**
     * If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the
     * week. 0 is Sunday, 1 is Monday, etc.
     */
    schedule_days_of_week?: number[]

    /** Time zone for the schedule. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string

    /**
     * Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For
     * `daily`, run at these times on the scheduled interval date.
     */
    schedule_times_of_day?: string[]

    /** Absolute source path for the sync */
    src_path?: string

    /** Remote server ID for the source (if remote) */
    src_remote_server_id?: number

    /**
     * Frequency in minutes between syncs. If set, this value must be greater than or equal to the
     * `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used.
     * This setting is only used if `trigger` is empty.
     */
    sync_interval_minutes?: number

    /** Trigger type: daily, custom_schedule, or manual */
    trigger?: 'daily' | 'custom_schedule' | 'manual'

    /**
     * Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can
     * begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
     */
    trigger_file?: string

    /** If true, the trigger file will be sent at the end of a successful sync even when no files were transferred. */
    always_write_trigger_file?: boolean
  }
}

export = Sync
