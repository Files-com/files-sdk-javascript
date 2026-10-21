import Files from '../Files'

/** A Holiday Calendar defines site-wide holiday dates and optional partial-day windows that scheduled resources skip. */
declare class HolidayCalendar {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: HolidayCalendar.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: HolidayCalendar.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /**
   * Holiday Calendar ID. Set a scheduled resource's `holiday_region` to `custom_` followed by this ID to make it skip
   * the days in this calendar.
   */
  readonly id?: number | null

  /** Holiday Calendar name. */
  readonly name?: string | null

  /** Holiday rules for the calendar. */
  readonly definition?: HolidayCalendar.Definition | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /**
   * Holiday Calendar ID. Set a scheduled resource's `holiday_region` to `custom_` followed by this ID to make it skip
   * the days in this calendar.
   */
  getId(): number | null | undefined

  /** Holiday Calendar name. */
  getName(): string | null | undefined

  /** Holiday rules for the calendar. */
  getDefinition(): HolidayCalendar.Definition | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /**
   * Holiday Calendar ID. Set a scheduled resource's `holiday_region` to `custom_` followed by this ID to make it skip
   * the days in this calendar.
   */
  setId(value: number): void

  /** Holiday Calendar name. */
  setName(value: string): void

  /** Holiday rules for the calendar. */
  setDefinition(value: HolidayCalendar.Definition): void

  /** Update Holiday Calendar */
  update(params?: HolidayCalendar.UpdateParams): Promise<this>

  /** Delete Holiday Calendar */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Holiday Calendars */
  static list(params?: HolidayCalendar.ListParams, options?: Files.RequestOptions): Promise<HolidayCalendar[]>

  /** Alias of `list()`. */
  static all(params?: HolidayCalendar.ListParams, options?: Files.RequestOptions): Promise<HolidayCalendar[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: HolidayCalendar.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<HolidayCalendar>

  /**
   * Show Holiday Calendar
   * @param id - Holiday Calendar ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<HolidayCalendar>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<HolidayCalendar>

  /** Create Holiday Calendar */
  static create(params: HolidayCalendar.CreateParams, options?: Files.RequestOptions): Promise<HolidayCalendar>
}

declare namespace HolidayCalendar {
  /** The fields of `HolidayCalendar` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * Holiday Calendar ID. Set a scheduled resource's `holiday_region` to `custom_` followed by this ID to make it skip
     * the days in this calendar.
     */
    id?: number | null

    /** Holiday Calendar name. */
    name?: string | null

    /** Holiday rules for the calendar. */
    definition?: HolidayCalendar.Definition | null

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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject
  }

  interface CreateParams {
    /** Holiday rules for the calendar. */
    definition: HolidayCalendar.Definition

    /** Holiday Calendar name. */
    name: string
  }

  interface UpdateParams {
    /** Holiday rules for the calendar. */
    definition?: HolidayCalendar.Definition

    /** Holiday Calendar name. */
    name?: string
  }

  /**
   * Holiday rules grouped by month. A definition may contain at most 366 rules and its encoded JSON may be at most
   * 65535 bytes.
   */
  interface Definition {
    /**
     * Keys 1 through 12 contain rules for that month. Key 0 contains calculated-date rules. At most 366 rules are
     * allowed across all months.
     */
    months: {
      [key: string]: HolidayCalendar.Definition.CalculatedRule[] | Array<HolidayCalendar.Definition.FixedRule | HolidayCalendar.Definition.WeekdayRule>
    }
  }

  namespace Definition {
    /** Weekday rule */
    interface WeekdayRule {
      /** Optional rule name. */
      name?: string

      /** Optional function used to move the selected date when it falls on a weekend. */
      observed?: 'to_monday_if_sunday(date)' | 'to_monday_if_weekend(date)' | 'to_tuesday_if_sunday_or_monday_if_saturday(date)' | 'to_weekday_if_boxing_weekend(date)' | 'to_weekday_if_weekend(date)'

      /** Inclusive start of a partial-day window in 24-hour HH:MM or HH:MM:SS format. Must be earlier than end_time. */
      start_time?: string

      /** Exclusive end of a partial-day window in 24-hour HH:MM or HH:MM:SS format. Must be later than start_time. */
      end_time?: string

      /** Optional inclusive year restriction. */
      year_ranges?: HolidayCalendar.Definition.YearRanges

      /** Occurrence of the weekday in the month. Negative values count from the end of the month. */
      week: 1 | 2 | 3 | 4 | 5 | -1 | -2 | -3

      /** Day of the week, where 0 is Sunday and 6 is Saturday. */
      wday: number
    }

    /** Calculated-date rule */
    interface CalculatedRule {
      /** Optional rule name. */
      name?: string

      /** Optional function used to move the selected date when it falls on a weekend. */
      observed?: 'to_monday_if_sunday(date)' | 'to_monday_if_weekend(date)' | 'to_tuesday_if_sunday_or_monday_if_saturday(date)' | 'to_weekday_if_boxing_weekend(date)' | 'to_weekday_if_weekend(date)'

      /** Inclusive start of a partial-day window in 24-hour HH:MM or HH:MM:SS format. Must be earlier than end_time. */
      start_time?: string

      /** Exclusive end of a partial-day window in 24-hour HH:MM or HH:MM:SS format. Must be later than start_time. */
      end_time?: string

      /** Optional inclusive year restriction. */
      year_ranges?: HolidayCalendar.Definition.YearRanges

      /** Supported calculated-date function. */
      function: 'easter(year)' | 'orthodox_easter(year)' | 'orthodox_easter_julian(year)' | 'to_weekday_if_boxing_weekend_from_year(year)' | 'to_weekday_if_boxing_weekend_from_year_or_to_tuesday_if_monday(year)'

      /** Number of days to add to or subtract from the calculated date. */
      function_modifier?: number
    }

    /** Fixed-date rule */
    interface FixedRule {
      /** Optional rule name. */
      name?: string

      /** Optional function used to move the selected date when it falls on a weekend. */
      observed?: 'to_monday_if_sunday(date)' | 'to_monday_if_weekend(date)' | 'to_tuesday_if_sunday_or_monday_if_saturday(date)' | 'to_weekday_if_boxing_weekend(date)' | 'to_weekday_if_weekend(date)'

      /** Inclusive start of a partial-day window in 24-hour HH:MM or HH:MM:SS format. Must be earlier than end_time. */
      start_time?: string

      /** Exclusive end of a partial-day window in 24-hour HH:MM or HH:MM:SS format. Must be later than start_time. */
      end_time?: string

      /** Optional inclusive year restriction. */
      year_ranges?: HolidayCalendar.Definition.YearRanges

      /** Day of the month. Must be valid for the selected month. */
      mday: number
    }

    type YearRanges =
      | HolidayCalendar.Definition.YearRangeFrom
      | HolidayCalendar.Definition.YearRangeUntil
      | HolidayCalendar.Definition.YearRangeBetween
      | HolidayCalendar.Definition.YearRangeLimited

    /** Apply from this year onward. */
    interface YearRangeFrom {
      /** First year in which the rule applies. */
      from: number
    }

    /** Apply through this year. */
    interface YearRangeUntil {
      /** Last year in which the rule applies. */
      until: number
    }

    /** Apply between the inclusive start and end years. start must not be later than end. */
    interface YearRangeBetween {
      /** Required start and end years. */
      between: {
        start: number
        end: number
      }
    }

    /** Apply only in these years. */
    interface YearRangeLimited {
      /** Years in which the rule applies. */
      limited: number[]
    }
  }
}

export default HolidayCalendar
