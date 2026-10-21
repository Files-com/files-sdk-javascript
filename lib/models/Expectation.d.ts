import Files = require('../Files')
import ExpectationEvaluation = require('./ExpectationEvaluation')

/**
 * Expectations let your Files.com site define what “correct” file delivery looks like, continuously evaluate whether it
 * happened, and keep history when it did not.
 */
declare class Expectation {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Expectation.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Expectation.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Expectation ID */
  readonly id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Expectation name. */
  readonly name?: string | null

  /** Expectation description. */
  readonly description?: string | null

  /**
   * Path scope for the expectation. Supports workspace-relative presentation. This must be slash-delimited, but it must
   * neither start nor end with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Source glob used to select candidate files. */
  readonly source?: string | null

  /** Optional source exclusion glob. */
  readonly exclude_pattern?: string | null

  /** If true, the expectation is disabled. */
  readonly disabled?: boolean | null

  /** Criteria schema version for this expectation. */
  readonly expectations_version?: number | null

  /** How this expectation opens windows. */
  readonly trigger?: 'manual' | 'upload' | 'daily' | 'custom_schedule' | Files.OtherString | null

  /** If trigger is `daily`, this specifies how often to run the expectation. */
  readonly interval?: string | null

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  readonly recurring_day?: number | null

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  readonly recurring_days?: number[] | null

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields. */
  readonly schedule_id?: number | null

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  readonly schedule_days_of_week?: number[] | null

  /** Times of day in HH:MM format for the Expectation schedule. */
  readonly schedule_times_of_day?: string[] | null

  /** Time zone used by the Expectation schedule. */
  readonly schedule_time_zone?: string | null

  /** Optional holiday region used by the Expectation schedule. */
  readonly holiday_region?: string | null

  /** How many seconds before the due boundary the window starts. */
  readonly lookback_interval?: number | null

  /** How many seconds a schedule-driven window may remain eligible to close as late. */
  readonly late_acceptance_interval?: number | null

  /** How many quiet seconds are required before final closure. */
  readonly inactivity_interval?: number | null

  /** Hard-stop duration in seconds for unscheduled expectations. */
  readonly max_open_interval?: number | null

  /** Versioned success criteria definition for the expectation. Criteria v2 supports optional FTS content validation. */
  readonly criteria?: Expectation.Criteria | null

  /** Last time this expectation was evaluated. */
  readonly last_evaluated_at?: Files.DateTimeString | null

  /** Last time this expectation closed successfully. */
  readonly last_success_at?: Files.DateTimeString | null

  /** Last time this expectation closed with a failure result. */
  readonly last_failure_at?: Files.DateTimeString | null

  /** Most recent terminal result for this expectation. */
  readonly last_result?: 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Expectation ID */
  getId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Expectation name. */
  getName(): string | null | undefined

  /** Expectation description. */
  getDescription(): string | null | undefined

  /**
   * Path scope for the expectation. Supports workspace-relative presentation. This must be slash-delimited, but it must
   * neither start nor end with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Source glob used to select candidate files. */
  getSource(): string | null | undefined

  /** Optional source exclusion glob. */
  getExcludePattern(): string | null | undefined

  /** If true, the expectation is disabled. */
  getDisabled(): boolean | null | undefined

  /** Criteria schema version for this expectation. */
  getExpectationsVersion(): number | null | undefined

  /** How this expectation opens windows. */
  getTrigger(): 'manual' | 'upload' | 'daily' | 'custom_schedule' | Files.OtherString | null | undefined

  /** If trigger is `daily`, this specifies how often to run the expectation. */
  getInterval(): string | null | undefined

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  getRecurringDay(): number | null | undefined

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  getRecurringDays(): number[] | null | undefined

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields. */
  getScheduleId(): number | null | undefined

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  getScheduleDaysOfWeek(): number[] | null | undefined

  /** Times of day in HH:MM format for the Expectation schedule. */
  getScheduleTimesOfDay(): string[] | null | undefined

  /** Time zone used by the Expectation schedule. */
  getScheduleTimeZone(): string | null | undefined

  /** Optional holiday region used by the Expectation schedule. */
  getHolidayRegion(): string | null | undefined

  /** How many seconds before the due boundary the window starts. */
  getLookbackInterval(): number | null | undefined

  /** How many seconds a schedule-driven window may remain eligible to close as late. */
  getLateAcceptanceInterval(): number | null | undefined

  /** How many quiet seconds are required before final closure. */
  getInactivityInterval(): number | null | undefined

  /** Hard-stop duration in seconds for unscheduled expectations. */
  getMaxOpenInterval(): number | null | undefined

  /** Versioned success criteria definition for the expectation. Criteria v2 supports optional FTS content validation. */
  getCriteria(): Expectation.Criteria | null | undefined

  /** Last time this expectation was evaluated. */
  getLastEvaluatedAt(): Files.DateTimeString | null | undefined

  /** Last time this expectation closed successfully. */
  getLastSuccessAt(): Files.DateTimeString | null | undefined

  /** Last time this expectation closed with a failure result. */
  getLastFailureAt(): Files.DateTimeString | null | undefined

  /** Most recent terminal result for this expectation. */
  getLastResult(): 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Expectation ID */
  setId(value: number): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** Expectation name. */
  setName(value: string): void

  /** Expectation description. */
  setDescription(value: string): void

  /**
   * Path scope for the expectation. Supports workspace-relative presentation. This must be slash-delimited, but it must
   * neither start nor end with a slash. Maximum of 5000 characters.
   */
  setPath(value: string): void

  /** Source glob used to select candidate files. */
  setSource(value: string): void

  /** Optional source exclusion glob. */
  setExcludePattern(value: string): void

  /** If true, the expectation is disabled. */
  setDisabled(value: boolean): void

  /** Criteria schema version for this expectation. */
  setExpectationsVersion(value: number): void

  /** How this expectation opens windows. */
  setTrigger(value: 'manual' | 'upload' | 'daily' | 'custom_schedule'): void

  /** If trigger is `daily`, this specifies how often to run the expectation. */
  setInterval(value: string): void

  /** If trigger is `daily`, this selects the day number inside the chosen interval. */
  setRecurringDay(value: number): void

  /**
   * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
   * interval.
   */
  setRecurringDays(value: number[]): void

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields. */
  setScheduleId(value: number): void

  /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
  setScheduleDaysOfWeek(value: number[]): void

  /** Times of day in HH:MM format for the Expectation schedule. */
  setScheduleTimesOfDay(value: string[]): void

  /** Time zone used by the Expectation schedule. */
  setScheduleTimeZone(value: string): void

  /** Optional holiday region used by the Expectation schedule. */
  setHolidayRegion(value: string): void

  /** How many seconds before the due boundary the window starts. */
  setLookbackInterval(value: number): void

  /** How many seconds a schedule-driven window may remain eligible to close as late. */
  setLateAcceptanceInterval(value: number): void

  /** How many quiet seconds are required before final closure. */
  setInactivityInterval(value: number): void

  /** Hard-stop duration in seconds for unscheduled expectations. */
  setMaxOpenInterval(value: number): void

  /** Versioned success criteria definition for the expectation. Criteria v2 supports optional FTS content validation. */
  setCriteria(value: Expectation.Criteria): void

  /** Last time this expectation was evaluated. */
  setLastEvaluatedAt(value: Files.DateTimeString): void

  /** Last time this expectation closed successfully. */
  setLastSuccessAt(value: Files.DateTimeString): void

  /** Last time this expectation closed with a failure result. */
  setLastFailureAt(value: Files.DateTimeString): void

  /** Most recent terminal result for this expectation. */
  setLastResult(value: 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString): void

  /** Manually open an Expectation window */
  triggerEvaluation(params?: Files.NoParams): Promise<ExpectationEvaluation>

  /** Update Expectation */
  update(params?: Expectation.UpdateParams): Promise<this>

  /** Delete Expectation */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Expectations */
  static list(params?: Expectation.ListParams, options?: Files.RequestOptions): Promise<Expectation[]>

  /** Alias of `list()`. */
  static all(params?: Expectation.ListParams, options?: Files.RequestOptions): Promise<Expectation[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Expectation.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Expectation>

  /**
   * Show Expectation
   * @param id - Expectation ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Expectation>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Expectation>

  /** Create Expectation */
  static create(params?: Expectation.CreateParams, options?: Files.RequestOptions): Promise<Expectation>

  static default: typeof Expectation
}

declare namespace Expectation {
  /** The fields of `Expectation` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Expectation ID */
    id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Expectation name. */
    name?: string | null

    /** Expectation description. */
    description?: string | null

    /**
     * Path scope for the expectation. Supports workspace-relative presentation. This must be slash-delimited, but it
     * must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Source glob used to select candidate files. */
    source?: string | null

    /** Optional source exclusion glob. */
    exclude_pattern?: string | null

    /** If true, the expectation is disabled. */
    disabled?: boolean | null

    /** Criteria schema version for this expectation. */
    expectations_version?: number | null

    /** How this expectation opens windows. */
    trigger?: 'manual' | 'upload' | 'daily' | 'custom_schedule' | Files.OtherString | null

    /** If trigger is `daily`, this specifies how often to run the expectation. */
    interval?: string | null

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number | null

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[] | null

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields. */
    schedule_id?: number | null

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[] | null

    /** Times of day in HH:MM format for the Expectation schedule. */
    schedule_times_of_day?: string[] | null

    /** Time zone used by the Expectation schedule. */
    schedule_time_zone?: string | null

    /** Optional holiday region used by the Expectation schedule. */
    holiday_region?: string | null

    /** How many seconds before the due boundary the window starts. */
    lookback_interval?: number | null

    /** How many seconds a schedule-driven window may remain eligible to close as late. */
    late_acceptance_interval?: number | null

    /** How many quiet seconds are required before final closure. */
    inactivity_interval?: number | null

    /** Hard-stop duration in seconds for unscheduled expectations. */
    max_open_interval?: number | null

    /**
     * Versioned success criteria definition for the expectation. Criteria v2 supports optional FTS content validation.
     */
    criteria?: Expectation.Criteria | null

    /** Last time this expectation was evaluated. */
    last_evaluated_at?: Files.DateTimeString | null

    /** Last time this expectation closed successfully. */
    last_success_at?: Files.DateTimeString | null

    /** Last time this expectation closed with a failure result. */
    last_failure_at?: Files.DateTimeString | null

    /** Most recent terminal result for this expectation. */
    last_result?: 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString | null

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
     * `name` or `disabled`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled` and
     * `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Expectation name. */
    name?: string

    /** Expectation description. */
    description?: string

    /** Path scope for the expectation. Supports workspace-relative presentation. */
    path?: string

    /** Source glob used to select candidate files. */
    source?: string

    /** Optional source exclusion glob. */
    exclude_pattern?: string

    /** If true, the expectation is disabled. */
    disabled?: boolean

    /** How this expectation opens windows. */
    trigger?: 'manual' | 'upload' | 'daily' | 'custom_schedule'

    /** If trigger is `daily`, this specifies how often to run the expectation. */
    interval?: string

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields. */
    schedule_id?: number

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[]

    /** Times of day in HH:MM format for the Expectation schedule. */
    schedule_times_of_day?: string[]

    /** Time zone used by the Expectation schedule. */
    schedule_time_zone?: string

    /** Optional holiday region used by the Expectation schedule. */
    holiday_region?: string

    /** How many seconds before the due boundary the window starts. */
    lookback_interval?: number

    /** How many seconds a schedule-driven window may remain eligible to close as late. */
    late_acceptance_interval?: number

    /** How many quiet seconds are required before final closure. */
    inactivity_interval?: number

    /** Hard-stop duration in seconds for unscheduled expectations. */
    max_open_interval?: number

    /**
     * Versioned success criteria definition for the expectation, including optional Files Transform Script content
     * validation in criteria v2.
     */
    criteria?: Expectation.Criteria

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Expectation name. */
    name?: string

    /** Expectation description. */
    description?: string

    /** Path scope for the expectation. Supports workspace-relative presentation. */
    path?: string

    /** Source glob used to select candidate files. */
    source?: string

    /** Optional source exclusion glob. */
    exclude_pattern?: string

    /** If true, the expectation is disabled. */
    disabled?: boolean

    /** How this expectation opens windows. */
    trigger?: 'manual' | 'upload' | 'daily' | 'custom_schedule'

    /** If trigger is `daily`, this specifies how often to run the expectation. */
    interval?: string

    /** If trigger is `daily`, this selects the day number inside the chosen interval. */
    recurring_day?: number

    /**
     * If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year`
     * interval.
     */
    recurring_days?: number[]

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields. */
    schedule_id?: number

    /** If trigger is `custom_schedule`, the 0-based weekdays used by the schedule. */
    schedule_days_of_week?: number[]

    /** Times of day in HH:MM format for the Expectation schedule. */
    schedule_times_of_day?: string[]

    /** Time zone used by the Expectation schedule. */
    schedule_time_zone?: string

    /** Optional holiday region used by the Expectation schedule. */
    holiday_region?: string

    /** How many seconds before the due boundary the window starts. */
    lookback_interval?: number

    /** How many seconds a schedule-driven window may remain eligible to close as late. */
    late_acceptance_interval?: number

    /** How many quiet seconds are required before final closure. */
    inactivity_interval?: number

    /** Hard-stop duration in seconds for unscheduled expectations. */
    max_open_interval?: number

    /**
     * Versioned success criteria definition for the expectation, including optional Files Transform Script content
     * validation in criteria v2.
     */
    criteria?: Expectation.Criteria

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  /** Expectation criteria */
  interface Criteria {
    /** Number of matched files. exact cannot be combined with min or max. min must not exceed max. */
    count?: Expectation.Criteria.NumericConstraint

    /** Allowed file extensions. */
    extensions?: string[]

    /** Regular expression matched against each file's basename. Uses Ruby regular expression syntax. */
    filename_regex?: string

    /** Combined size of matched files, in bytes. exact cannot be combined with min or max. min must not exceed max. */
    total_bytes?: Expectation.Criteria.NumericConstraint

    /** Basename glob patterns for files that must not be present. */
    forbidden_files?: string[]

    /**
     * Rules for specific file names or basename glob patterns. Literal names default to count.exact = 1 when count is
     * omitted. Glob patterns have no default count. Overlapping globs are rejected.
     */
    required_files?: {
      [key: string]: {
        /** Number of files matching this entry. exact cannot be combined with min or max. min must not exceed max. */
        count?: Expectation.Criteria.NumericConstraint

        /** Allowed extensions for files matching this entry. */
        extensions?: string[]

        /** Regular expression matched against each matching file's basename. Uses Ruby regular expression syntax. */
        filename_regex?: string

        /** Size of each matching file, in bytes. exact cannot be combined with min or max. min must not exceed max. */
        size_bytes?: Expectation.Criteria.NumericConstraint
      }
    }

    /** File content validation using Files Transform Script. Requires expectations_version = 2. */
    content_validation?: {
      /** Whether to validate each file separately or the whole batch. */
      mode: 'per_file' | 'whole_batch'

      /** Files Transform Script used to validate file contents. */
      fts: string
    }
  }

  namespace Criteria {
    /** exact cannot be combined with min or max. min must not exceed max. */
    interface NumericConstraint {
      /** Exact value. */
      exact?: number

      /** Maximum value. */
      max?: number

      /** Minimum value. */
      min?: number
    }
  }
}

export = Expectation
