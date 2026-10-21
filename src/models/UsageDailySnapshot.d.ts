import Files from '../Files'
import UsageByTopLevelDir from './UsageByTopLevelDir'

/** A UsageDailySnapshot is a detailed site-wide usage report for the day. */
declare class UsageDailySnapshot {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UsageDailySnapshot.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UsageDailySnapshot.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** ID of the usage record */
  readonly id?: number | null

  /** The date of this usage record */
  readonly date?: string | null

  /**
   * True if the API usage fields `read_api_usage` and `write_api_usage` can be relied upon. If this is false, we
   * suggest hiding that value from any UI.
   */
  readonly api_usage_available?: boolean | null

  /** Read API Calls used on this day. Note: only updated for days before the current day. */
  readonly read_api_usage?: number | null

  /** Write API Calls used on this day. Note: only updated for days before the current day. */
  readonly write_api_usage?: number | null

  /** Transformation and AI credits used on this day. Note: only updated for days before the current day. */
  readonly transformation_credits_usage?: number | null

  /** Number of billable users as of this day. */
  readonly user_count?: number | null

  /** GB of Files Native Storage used on this day. */
  readonly current_storage?: number | null

  /** GB of Files Native Storage used on this day for files that have been deleted and are stored as backups. */
  readonly deleted_files_storage?: number | null

  /**
   * GB of Files Native Storage used on this day for files that have been permanently deleted but were uploaded less
   * than 30 days ago, and are still billable.
   */
  readonly deleted_files_counted_in_minimum?: number | null

  /**
   * GB of Files Native Storage used for the root folder. Included here because this value will not be part of
   * `usage_by_top_level_dir`
   */
  readonly root_storage?: number | null

  /** Usage broken down by each top-level folder */
  readonly usage_by_top_level_dir?: UsageByTopLevelDir.Attributes[] | null

  /** ID of the usage record */
  getId(): number | null | undefined

  /** The date of this usage record */
  getDate(): string | null | undefined

  /**
   * True if the API usage fields `read_api_usage` and `write_api_usage` can be relied upon. If this is false, we
   * suggest hiding that value from any UI.
   */
  getApiUsageAvailable(): boolean | null | undefined

  /** Read API Calls used on this day. Note: only updated for days before the current day. */
  getReadApiUsage(): number | null | undefined

  /** Write API Calls used on this day. Note: only updated for days before the current day. */
  getWriteApiUsage(): number | null | undefined

  /** Transformation and AI credits used on this day. Note: only updated for days before the current day. */
  getTransformationCreditsUsage(): number | null | undefined

  /** Number of billable users as of this day. */
  getUserCount(): number | null | undefined

  /** GB of Files Native Storage used on this day. */
  getCurrentStorage(): number | null | undefined

  /** GB of Files Native Storage used on this day for files that have been deleted and are stored as backups. */
  getDeletedFilesStorage(): number | null | undefined

  /**
   * GB of Files Native Storage used on this day for files that have been permanently deleted but were uploaded less
   * than 30 days ago, and are still billable.
   */
  getDeletedFilesCountedInMinimum(): number | null | undefined

  /**
   * GB of Files Native Storage used for the root folder. Included here because this value will not be part of
   * `usage_by_top_level_dir`
   */
  getRootStorage(): number | null | undefined

  /** Usage broken down by each top-level folder */
  getUsageByTopLevelDir(): UsageByTopLevelDir.Attributes[] | null | undefined

  /** List Usage Daily Snapshots */
  static list(params?: UsageDailySnapshot.ListParams, options?: Files.RequestOptions): Promise<UsageDailySnapshot[]>

  /** Alias of `list()`. */
  static all(params?: UsageDailySnapshot.ListParams, options?: Files.RequestOptions): Promise<UsageDailySnapshot[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UsageDailySnapshot.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UsageDailySnapshot>
}

declare namespace UsageDailySnapshot {
  /** The fields of `UsageDailySnapshot` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** ID of the usage record */
    id?: number | null

    /** The date of this usage record */
    date?: string | null

    /**
     * True if the API usage fields `read_api_usage` and `write_api_usage` can be relied upon. If this is false, we
     * suggest hiding that value from any UI.
     */
    api_usage_available?: boolean | null

    /** Read API Calls used on this day. Note: only updated for days before the current day. */
    read_api_usage?: number | null

    /** Write API Calls used on this day. Note: only updated for days before the current day. */
    write_api_usage?: number | null

    /** Transformation and AI credits used on this day. Note: only updated for days before the current day. */
    transformation_credits_usage?: number | null

    /** Number of billable users as of this day. */
    user_count?: number | null

    /** GB of Files Native Storage used on this day. */
    current_storage?: number | null

    /** GB of Files Native Storage used on this day for files that have been deleted and are stored as backups. */
    deleted_files_storage?: number | null

    /**
     * GB of Files Native Storage used on this day for files that have been permanently deleted but were uploaded less
     * than 30 days ago, and are still billable.
     */
    deleted_files_counted_in_minimum?: number | null

    /**
     * GB of Files Native Storage used for the root folder. Included here because this value will not be part of
     * `usage_by_top_level_dir`
     */
    root_storage?: number | null

    /** Usage broken down by each top-level folder */
    usage_by_top_level_dir?: UsageByTopLevelDir.Attributes[] | null
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `date`. */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `date` and
     * `usage_snapshot_id`. Valid field combinations are `[ usage_snapshot_id, date ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is greater than the supplied value. Valid fields are `date`. */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `date`.
     */
    filter_gteq?: Files.JsonObject

    /** If set, return records where the specified field is less than the supplied value. Valid fields are `date`. */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `date`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default UsageDailySnapshot
