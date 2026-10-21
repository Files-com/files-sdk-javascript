import Files = require('../Files')

/** A Schedule is a named, reusable weekday-and-time schedule shared by scheduled resources across a Site. */
declare class Schedule {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Schedule.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Schedule.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Schedule ID. */
  readonly id?: number | null

  /** Schedule name. */
  readonly name?: string | null

  /** 0-based weekdays used by the Schedule. 0 is Sunday. */
  readonly schedule_days_of_week?: number[] | null

  /** Times of day in HH:MM format (24-hour). */
  readonly schedule_times_of_day?: string[] | null

  /** Time zone for scheduled times. If not set, times are interpreted as UTC. */
  readonly schedule_time_zone?: string | null

  /** Optional holiday region on which linked resources do not run. */
  readonly holiday_region?: string | null

  /** Human-readable Schedule description. */
  readonly human_readable_schedule?: string | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Schedule ID. */
  getId(): number | null | undefined

  /** Schedule name. */
  getName(): string | null | undefined

  /** 0-based weekdays used by the Schedule. 0 is Sunday. */
  getScheduleDaysOfWeek(): number[] | null | undefined

  /** Times of day in HH:MM format (24-hour). */
  getScheduleTimesOfDay(): string[] | null | undefined

  /** Time zone for scheduled times. If not set, times are interpreted as UTC. */
  getScheduleTimeZone(): string | null | undefined

  /** Optional holiday region on which linked resources do not run. */
  getHolidayRegion(): string | null | undefined

  /** Human-readable Schedule description. */
  getHumanReadableSchedule(): string | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Schedule ID. */
  setId(value: number): void

  /** Schedule name. */
  setName(value: string): void

  /** 0-based weekdays used by the Schedule. 0 is Sunday. */
  setScheduleDaysOfWeek(value: number[]): void

  /** Times of day in HH:MM format (24-hour). */
  setScheduleTimesOfDay(value: string[]): void

  /** Time zone for scheduled times. If not set, times are interpreted as UTC. */
  setScheduleTimeZone(value: string): void

  /** Optional holiday region on which linked resources do not run. */
  setHolidayRegion(value: string): void

  /** Human-readable Schedule description. */
  setHumanReadableSchedule(value: string): void

  /** Update Schedule */
  update(params?: Schedule.UpdateParams): Promise<this>

  /** Delete Schedule */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Schedules */
  static list(params?: Schedule.ListParams, options?: Files.RequestOptions): Promise<Schedule[]>

  /** Alias of `list()`. */
  static all(params?: Schedule.ListParams, options?: Files.RequestOptions): Promise<Schedule[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Schedule.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Schedule>

  /**
   * Show Schedule
   * @param id - Schedule ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Schedule>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Schedule>

  /** Create Schedule */
  static create(params: Schedule.CreateParams, options?: Files.RequestOptions): Promise<Schedule>

  static default: typeof Schedule
}

declare namespace Schedule {
  /** The fields of `Schedule` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Schedule ID. */
    id?: number | null

    /** Schedule name. */
    name?: string | null

    /** 0-based weekdays used by the Schedule. 0 is Sunday. */
    schedule_days_of_week?: number[] | null

    /** Times of day in HH:MM format (24-hour). */
    schedule_times_of_day?: string[] | null

    /** Time zone for scheduled times. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string | null

    /** Optional holiday region on which linked resources do not run. */
    holiday_region?: string | null

    /** Human-readable Schedule description. */
    human_readable_schedule?: string | null

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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`. */
    sort_by?: Files.JsonObject
  }

  interface CreateParams {
    /** Schedule name. */
    name: string

    /** 0-based weekdays used by the Schedule. 0 is Sunday. */
    schedule_days_of_week: number[]

    /** Times of day in HH:MM format (24-hour). */
    schedule_times_of_day: string[]

    /** Time zone for scheduled times. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string

    /** Optional holiday region on which linked resources do not run. */
    holiday_region?: string
  }

  interface UpdateParams {
    /** Schedule name. */
    name?: string

    /** 0-based weekdays used by the Schedule. 0 is Sunday. */
    schedule_days_of_week?: number[]

    /** Times of day in HH:MM format (24-hour). */
    schedule_times_of_day?: string[]

    /** Time zone for scheduled times. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string

    /** Optional holiday region on which linked resources do not run. */
    holiday_region?: string
  }
}

export = Schedule
