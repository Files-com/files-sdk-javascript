import Files = require('../Files')

/**
 * A Scheduled Export defines a recurring schedule for generating one of the built-in CSV exports and e-mailing it to a
 * Site Admin recipient.
 */
declare class ScheduledExport {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ScheduledExport.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ScheduledExport.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Scheduled Export ID */
  readonly id?: number | null

  /** Name for this scheduled export. */
  readonly name?: string | null

  /** Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit */
  readonly export_type?: string | null

  /** Human-readable report name. */
  readonly report_name?: string | null

  /** Report-specific options. `permission_audit` supports `group_by` with `user` or `path`. */
  readonly export_options?: Files.JsonObject | null

  /** Site Admin user who receives the completed export e-mail. */
  readonly user_id?: number | null

  /** If true, this scheduled export will not run. */
  readonly disabled?: boolean | null

  /** Schedule trigger type: `daily` or `custom_schedule`. */
  readonly trigger?: 'daily' | 'custom_schedule' | Files.OtherString | null

  /** If trigger is `daily`, this specifies how often to run the scheduled export. */
  readonly interval?: string | null

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  readonly recurring_day?: number | null

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  readonly recurring_days?: number[] | null

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields. */
  readonly schedule_id?: number | null

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  readonly schedule_days_of_week?: number[] | null

  /** Times of day in HH:MM format for the scheduled export schedule. */
  readonly schedule_times_of_day?: string[] | null

  /** Time zone used by the scheduled export schedule. */
  readonly schedule_time_zone?: string | null

  /** Optional holiday region used by the scheduled export schedule. */
  readonly holiday_region?: string | null

  /** Human-readable schedule description. */
  readonly human_readable_schedule?: string | null

  /** Most recent scheduled attempt time, including attempts that failed validation. */
  readonly last_run_at?: Files.DateTimeString | null

  /** Most recent Export ID created by this schedule. */
  readonly last_export_id?: number | null

  /**
   * Validation error from the most recent scheduled attempt. The schedule remains enabled and retries at its next
   * scheduled time. Cleared when an export is successfully created; does not describe errors during export generation.
   */
  readonly last_error?: string | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Scheduled Export ID */
  getId(): number | null | undefined

  /** Name for this scheduled export. */
  getName(): string | null | undefined

  /** Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit */
  getExportType(): string | null | undefined

  /** Human-readable report name. */
  getReportName(): string | null | undefined

  /** Report-specific options. `permission_audit` supports `group_by` with `user` or `path`. */
  getExportOptions(): Files.JsonObject | null | undefined

  /** Site Admin user who receives the completed export e-mail. */
  getUserId(): number | null | undefined

  /** If true, this scheduled export will not run. */
  getDisabled(): boolean | null | undefined

  /** Schedule trigger type: `daily` or `custom_schedule`. */
  getTrigger(): 'daily' | 'custom_schedule' | Files.OtherString | null | undefined

  /** If trigger is `daily`, this specifies how often to run the scheduled export. */
  getInterval(): string | null | undefined

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  getRecurringDay(): number | null | undefined

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  getRecurringDays(): number[] | null | undefined

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields. */
  getScheduleId(): number | null | undefined

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  getScheduleDaysOfWeek(): number[] | null | undefined

  /** Times of day in HH:MM format for the scheduled export schedule. */
  getScheduleTimesOfDay(): string[] | null | undefined

  /** Time zone used by the scheduled export schedule. */
  getScheduleTimeZone(): string | null | undefined

  /** Optional holiday region used by the scheduled export schedule. */
  getHolidayRegion(): string | null | undefined

  /** Human-readable schedule description. */
  getHumanReadableSchedule(): string | null | undefined

  /** Most recent scheduled attempt time, including attempts that failed validation. */
  getLastRunAt(): Files.DateTimeString | null | undefined

  /** Most recent Export ID created by this schedule. */
  getLastExportId(): number | null | undefined

  /**
   * Validation error from the most recent scheduled attempt. The schedule remains enabled and retries at its next
   * scheduled time. Cleared when an export is successfully created; does not describe errors during export generation.
   */
  getLastError(): string | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Scheduled Export ID */
  setId(value: number): void

  /** Name for this scheduled export. */
  setName(value: string): void

  /** Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit */
  setExportType(value: string): void

  /** Human-readable report name. */
  setReportName(value: string): void

  /** Report-specific options. `permission_audit` supports `group_by` with `user` or `path`. */
  setExportOptions(value: Files.JsonObject): void

  /** Site Admin user who receives the completed export e-mail. */
  setUserId(value: number): void

  /** If true, this scheduled export will not run. */
  setDisabled(value: boolean): void

  /** Schedule trigger type: `daily` or `custom_schedule`. */
  setTrigger(value: 'daily' | 'custom_schedule'): void

  /** If trigger is `daily`, this specifies how often to run the scheduled export. */
  setInterval(value: string): void

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  setRecurringDay(value: number): void

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  setRecurringDays(value: number[]): void

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields. */
  setScheduleId(value: number): void

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  setScheduleDaysOfWeek(value: number[]): void

  /** Times of day in HH:MM format for the scheduled export schedule. */
  setScheduleTimesOfDay(value: string[]): void

  /** Time zone used by the scheduled export schedule. */
  setScheduleTimeZone(value: string): void

  /** Optional holiday region used by the scheduled export schedule. */
  setHolidayRegion(value: string): void

  /** Human-readable schedule description. */
  setHumanReadableSchedule(value: string): void

  /** Most recent scheduled attempt time, including attempts that failed validation. */
  setLastRunAt(value: Files.DateTimeString): void

  /** Most recent Export ID created by this schedule. */
  setLastExportId(value: number): void

  /**
   * Validation error from the most recent scheduled attempt. The schedule remains enabled and retries at its next
   * scheduled time. Cleared when an export is successfully created; does not describe errors during export generation.
   */
  setLastError(value: string): void

  /** Update Scheduled Export */
  update(params?: ScheduledExport.UpdateParams): Promise<this>

  /** Delete Scheduled Export */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Scheduled Exports */
  static list(params?: ScheduledExport.ListParams, options?: Files.RequestOptions): Promise<ScheduledExport[]>

  /** Alias of `list()`. */
  static all(params?: ScheduledExport.ListParams, options?: Files.RequestOptions): Promise<ScheduledExport[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ScheduledExport.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ScheduledExport>

  /**
   * Show Scheduled Export
   * @param id - Scheduled Export ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ScheduledExport>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ScheduledExport>

  /** Create Scheduled Export */
  static create(params: ScheduledExport.CreateParams, options?: Files.RequestOptions): Promise<ScheduledExport>

  static default: typeof ScheduledExport
}

declare namespace ScheduledExport {
  /** The fields of `ScheduledExport` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Scheduled Export ID */
    id?: number | null

    /** Name for this scheduled export. */
    name?: string | null

    /**
     * Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
     */
    export_type?: string | null

    /** Human-readable report name. */
    report_name?: string | null

    /** Report-specific options. `permission_audit` supports `group_by` with `user` or `path`. */
    export_options?: Files.JsonObject | null

    /** Site Admin user who receives the completed export e-mail. */
    user_id?: number | null

    /** If true, this scheduled export will not run. */
    disabled?: boolean | null

    /** Schedule trigger type: `daily` or `custom_schedule`. */
    trigger?: 'daily' | 'custom_schedule' | Files.OtherString | null

    /** If trigger is `daily`, this specifies how often to run the scheduled export. */
    interval?: string | null

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number | null

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[] | null

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields. */
    schedule_id?: number | null

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[] | null

    /** Times of day in HH:MM format for the scheduled export schedule. */
    schedule_times_of_day?: string[] | null

    /** Time zone used by the scheduled export schedule. */
    schedule_time_zone?: string | null

    /** Optional holiday region used by the scheduled export schedule. */
    holiday_region?: string | null

    /** Human-readable schedule description. */
    human_readable_schedule?: string | null

    /** Most recent scheduled attempt time, including attempts that failed validation. */
    last_run_at?: Files.DateTimeString | null

    /** Most recent Export ID created by this schedule. */
    last_export_id?: number | null

    /**
     * Validation error from the most recent scheduled attempt. The schedule remains enabled and retries at its next
     * scheduled time. Cleared when an export is successfully created; does not describe errors during export
     * generation.
     */
    last_error?: string | null

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`,
     * `export_type` or `disabled`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled` and
     * `export_type`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are
     * `export_type`.
     */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** Name for this scheduled export. */
    name: string

    /**
     * Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
     */
    export_type: string

    /** Report-specific options. `permission_audit` supports `group_by` with `user` or `path`. */
    export_options?: Files.JsonObject

    /** Site Admin user who receives the completed export e-mail. */
    user_id?: number

    /** If true, this scheduled export will not run. */
    disabled?: boolean

    /** Schedule trigger type: `daily` or `custom_schedule`. */
    trigger?: 'daily' | 'custom_schedule'

    /** If trigger is `daily`, this specifies how often to run the scheduled export. */
    interval?: string

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields. */
    schedule_id?: number

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[]

    /** Times of day in HH:MM format for the scheduled export schedule. */
    schedule_times_of_day?: string[]

    /** Time zone used by the scheduled export schedule. */
    schedule_time_zone?: string

    /** Optional holiday region used by the scheduled export schedule. */
    holiday_region?: string
  }

  interface UpdateParams {
    /** Name for this scheduled export. */
    name?: string

    /**
     * Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
     */
    export_type?: string

    /** Report-specific options. `permission_audit` supports `group_by` with `user` or `path`. */
    export_options?: Files.JsonObject

    /** Site Admin user who receives the completed export e-mail. */
    user_id?: number

    /** If true, this scheduled export will not run. */
    disabled?: boolean

    /** Schedule trigger type: `daily` or `custom_schedule`. */
    trigger?: 'daily' | 'custom_schedule'

    /** If trigger is `daily`, this specifies how often to run the scheduled export. */
    interval?: string

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields. */
    schedule_id?: number

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[]

    /** Times of day in HH:MM format for the scheduled export schedule. */
    schedule_times_of_day?: string[]

    /** Time zone used by the scheduled export schedule. */
    schedule_time_zone?: string

    /** Optional holiday region used by the scheduled export schedule. */
    holiday_region?: string
  }
}

export = ScheduledExport
