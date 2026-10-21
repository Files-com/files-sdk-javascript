import Files = require('../Files')

/** An AI Task defines a Files.com AI prompt that can run on a schedule or in response to file actions. */
declare class AiTask {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AiTask.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AiTask.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** AI Task ID. */
  readonly id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** AI Task name. */
  readonly name?: string | null

  /** AI Task description. */
  readonly description?: string | null

  /** Prompt sent when this AI Task is invoked. */
  readonly prompt?: string | null

  /** Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`. */
  readonly permission_set?: 'full' | 'files_only' | Files.OtherString | null

  /**
   * Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with
   * a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Source glob used with `path` for action-triggered AI Tasks. */
  readonly source?: string | null

  /** If true, this AI Task will not run. */
  readonly disabled?: boolean | null

  /** How this AI Task is triggered. */
  readonly trigger?: 'manual' | 'daily' | 'custom_schedule' | 'action' | Files.OtherString | null

  /**
   * If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move,
   * archived_delete, update, read, destroy.
   */
  readonly trigger_actions?: string[] | null

  /** If trigger is `daily`, this specifies how often to run the AI Task. */
  readonly interval?: string | null

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  readonly recurring_day?: number | null

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  readonly recurring_days?: number[] | null

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields. */
  readonly schedule_id?: number | null

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  readonly schedule_days_of_week?: number[] | null

  /** Times of day in HH:MM format for the AI Task schedule. */
  readonly schedule_times_of_day?: string[] | null

  /** Time zone used by the AI Task schedule. */
  readonly schedule_time_zone?: string | null

  /** Optional holiday region used by the AI Task schedule. */
  readonly holiday_region?: string | null

  /** Human-readable schedule description. */
  readonly human_readable_schedule?: string | null

  /** Most recent successful invocation time. */
  readonly last_run_at?: Files.DateTimeString | null

  /** Master User ID used for AI Task invocations. */
  readonly master_admin_user_id?: number | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** AI Task ID. */
  getId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** AI Task name. */
  getName(): string | null | undefined

  /** AI Task description. */
  getDescription(): string | null | undefined

  /** Prompt sent when this AI Task is invoked. */
  getPrompt(): string | null | undefined

  /** Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`. */
  getPermissionSet(): 'full' | 'files_only' | Files.OtherString | null | undefined

  /**
   * Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with
   * a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Source glob used with `path` for action-triggered AI Tasks. */
  getSource(): string | null | undefined

  /** If true, this AI Task will not run. */
  getDisabled(): boolean | null | undefined

  /** How this AI Task is triggered. */
  getTrigger(): 'manual' | 'daily' | 'custom_schedule' | 'action' | Files.OtherString | null | undefined

  /**
   * If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move,
   * archived_delete, update, read, destroy.
   */
  getTriggerActions(): string[] | null | undefined

  /** If trigger is `daily`, this specifies how often to run the AI Task. */
  getInterval(): string | null | undefined

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  getRecurringDay(): number | null | undefined

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  getRecurringDays(): number[] | null | undefined

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields. */
  getScheduleId(): number | null | undefined

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  getScheduleDaysOfWeek(): number[] | null | undefined

  /** Times of day in HH:MM format for the AI Task schedule. */
  getScheduleTimesOfDay(): string[] | null | undefined

  /** Time zone used by the AI Task schedule. */
  getScheduleTimeZone(): string | null | undefined

  /** Optional holiday region used by the AI Task schedule. */
  getHolidayRegion(): string | null | undefined

  /** Human-readable schedule description. */
  getHumanReadableSchedule(): string | null | undefined

  /** Most recent successful invocation time. */
  getLastRunAt(): Files.DateTimeString | null | undefined

  /** Master User ID used for AI Task invocations. */
  getMasterAdminUserId(): number | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** AI Task ID. */
  setId(value: number): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** AI Task name. */
  setName(value: string): void

  /** AI Task description. */
  setDescription(value: string): void

  /** Prompt sent when this AI Task is invoked. */
  setPrompt(value: string): void

  /** Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`. */
  setPermissionSet(value: 'full' | 'files_only'): void

  /**
   * Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with
   * a slash. Maximum of 5000 characters.
   */
  setPath(value: string): void

  /** Source glob used with `path` for action-triggered AI Tasks. */
  setSource(value: string): void

  /** If true, this AI Task will not run. */
  setDisabled(value: boolean): void

  /** How this AI Task is triggered. */
  setTrigger(value: 'manual' | 'daily' | 'custom_schedule' | 'action'): void

  /**
   * If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move,
   * archived_delete, update, read, destroy.
   */
  setTriggerActions(value: string[]): void

  /** If trigger is `daily`, this specifies how often to run the AI Task. */
  setInterval(value: string): void

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  setRecurringDay(value: number): void

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  setRecurringDays(value: number[]): void

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields. */
  setScheduleId(value: number): void

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  setScheduleDaysOfWeek(value: number[]): void

  /** Times of day in HH:MM format for the AI Task schedule. */
  setScheduleTimesOfDay(value: string[]): void

  /** Time zone used by the AI Task schedule. */
  setScheduleTimeZone(value: string): void

  /** Optional holiday region used by the AI Task schedule. */
  setHolidayRegion(value: string): void

  /** Human-readable schedule description. */
  setHumanReadableSchedule(value: string): void

  /** Most recent successful invocation time. */
  setLastRunAt(value: Files.DateTimeString): void

  /** Master User ID used for AI Task invocations. */
  setMasterAdminUserId(value: number): void

  /** Manually Run AI Task */
  manualRun(params?: Files.NoParams): Promise<void>

  /** Update Ai Task */
  update(params?: AiTask.UpdateParams): Promise<this>

  /** Delete Ai Task */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Ai Tasks */
  static list(params?: AiTask.ListParams, options?: Files.RequestOptions): Promise<AiTask[]>

  /** Alias of `list()`. */
  static all(params?: AiTask.ListParams, options?: Files.RequestOptions): Promise<AiTask[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: AiTask.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<AiTask>

  /**
   * Show Ai Task
   * @param id - Ai Task ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AiTask>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AiTask>

  /** Create Ai Task */
  static create(params: AiTask.CreateParams, options?: Files.RequestOptions): Promise<AiTask>

  static default: typeof AiTask
}

declare namespace AiTask {
  /** The fields of `AiTask` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** AI Task ID. */
    id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** AI Task name. */
    name?: string | null

    /** AI Task description. */
    description?: string | null

    /** Prompt sent when this AI Task is invoked. */
    prompt?: string | null

    /** Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`. */
    permission_set?: 'full' | 'files_only' | Files.OtherString | null

    /**
     * Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end
     * with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Source glob used with `path` for action-triggered AI Tasks. */
    source?: string | null

    /** If true, this AI Task will not run. */
    disabled?: boolean | null

    /** How this AI Task is triggered. */
    trigger?: 'manual' | 'daily' | 'custom_schedule' | 'action' | Files.OtherString | null

    /**
     * If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move,
     * archived_delete, update, read, destroy.
     */
    trigger_actions?: string[] | null

    /** If trigger is `daily`, this specifies how often to run the AI Task. */
    interval?: string | null

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number | null

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[] | null

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields. */
    schedule_id?: number | null

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[] | null

    /** Times of day in HH:MM format for the AI Task schedule. */
    schedule_times_of_day?: string[] | null

    /** Time zone used by the AI Task schedule. */
    schedule_time_zone?: string | null

    /** Optional holiday region used by the AI Task schedule. */
    holiday_region?: string | null

    /** Human-readable schedule description. */
    human_readable_schedule?: string | null

    /** Most recent successful invocation time. */
    last_run_at?: Files.DateTimeString | null

    /** Master User ID used for AI Task invocations. */
    master_admin_user_id?: number | null

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
     * `name`, `disabled` or `updated_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`,
     * `trigger` or `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** AI Task description. */
    description?: string

    /** If true, this AI Task will not run. */
    disabled?: boolean

    /** Optional holiday region used by the AI Task schedule. */
    holiday_region?: string

    /** If trigger is `daily`, this specifies how often to run the AI Task. */
    interval?: string

    /** AI Task name. */
    name: string

    /** Path scope used for action-triggered AI Tasks. */
    path?: string

    /** Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`. */
    permission_set?: 'full' | 'files_only'

    /** Prompt sent when this AI Task is invoked. */
    prompt: string

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields. */
    schedule_id?: number

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[]

    /** Time zone used by the AI Task schedule. */
    schedule_time_zone?: string

    /** Times of day in HH:MM format for the AI Task schedule. */
    schedule_times_of_day?: string[]

    /** Source glob used with `path` for action-triggered AI Tasks. */
    source?: string

    /** How this AI Task is triggered. */
    trigger?: 'manual' | 'daily' | 'custom_schedule' | 'action'

    /**
     * If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move,
     * archived_delete, update, read, destroy.
     */
    trigger_actions?: string[]

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** AI Task description. */
    description?: string

    /** If true, this AI Task will not run. */
    disabled?: boolean

    /** Optional holiday region used by the AI Task schedule. */
    holiday_region?: string

    /** If trigger is `daily`, this specifies how often to run the AI Task. */
    interval?: string

    /** AI Task name. */
    name?: string

    /** Path scope used for action-triggered AI Tasks. */
    path?: string

    /** Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`. */
    permission_set?: 'full' | 'files_only'

    /** Prompt sent when this AI Task is invoked. */
    prompt?: string

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields. */
    schedule_id?: number

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[]

    /** Time zone used by the AI Task schedule. */
    schedule_time_zone?: string

    /** Times of day in HH:MM format for the AI Task schedule. */
    schedule_times_of_day?: string[]

    /** Source glob used with `path` for action-triggered AI Tasks. */
    source?: string

    /** How this AI Task is triggered. */
    trigger?: 'manual' | 'daily' | 'custom_schedule' | 'action'

    /**
     * If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move,
     * archived_delete, update, read, destroy.
     */
    trigger_actions?: string[]

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }
}

export = AiTask
