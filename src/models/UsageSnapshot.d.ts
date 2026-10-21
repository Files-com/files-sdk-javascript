import Files from '../Files'
import UsageByTopLevelDir from './UsageByTopLevelDir'

/**
 * A UsageSnapshot is a site-wide utilization report of storage, bandwidth, APIs, and user accounts of your Files.com
 * site for the given time period.
 */
declare class UsageSnapshot {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UsageSnapshot.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UsageSnapshot.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Usage snapshot ID */
  readonly id?: number | null

  /** Usage snapshot start date/time */
  readonly start_at?: Files.DateTimeString | null

  /** Usage snapshot end date/time */
  readonly end_at?: Files.DateTimeString | null

  /** Highest user count number in time period */
  readonly high_water_user_count?: number | null

  /**
   * Total Transformation and AI credits used in this usage period. Updated daily. Does not include credits consumed
   * today.
   */
  readonly transformation_credits_usage?: number | null

  /** Current total Storage Usage GB as of end date (not necessarily high water mark, which is used for billing) */
  readonly current_storage?: number | null

  /** Highest Storage Usage GB recorded in time period (used for billing) */
  readonly high_water_storage?: number | null

  /** Storage Usage for root folder as of end date (not necessarily high water mark, which is used for billing) */
  readonly root_storage?: number | null

  /**
   * Storage Usage for files that are deleted but uploaded within last 30 days as of end date (not necessarily high
   * water mark, which is used for billing)
   */
  readonly deleted_files_counted_in_minimum?: number | null

  /**
   * Storage Usage for files that are deleted but retained as backups as of end date (not necessarily high water mark,
   * which is used for billing)
   */
  readonly deleted_files_storage?: number | null

  /** Storage + Transfer Usage - Total Billable amount */
  readonly total_billable_usage?: number | null

  /** Transfer usage for period - Total Billable amount */
  readonly total_billable_transfer_usage?: number | null

  /** Transfer Usage for period - Outbound GB from Files Native Storage */
  readonly bytes_sent?: number | null

  /** Transfer Usage for period - Inbound GB to Remote Servers (Sync/Mount) */
  readonly sync_bytes_received?: number | null

  /** Transfer Usage for period - Outbound GB from Remote Servers (Sync/Mount) */
  readonly sync_bytes_sent?: number | null

  /**
   * Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used
   * for billing)
   */
  readonly usage_by_top_level_dir?: UsageByTopLevelDir.Attributes[] | null

  /** Usage snapshot ID */
  getId(): number | null | undefined

  /** Usage snapshot start date/time */
  getStartAt(): Files.DateTimeString | null | undefined

  /** Usage snapshot end date/time */
  getEndAt(): Files.DateTimeString | null | undefined

  /** Highest user count number in time period */
  getHighWaterUserCount(): number | null | undefined

  /**
   * Total Transformation and AI credits used in this usage period. Updated daily. Does not include credits consumed
   * today.
   */
  getTransformationCreditsUsage(): number | null | undefined

  /** Current total Storage Usage GB as of end date (not necessarily high water mark, which is used for billing) */
  getCurrentStorage(): number | null | undefined

  /** Highest Storage Usage GB recorded in time period (used for billing) */
  getHighWaterStorage(): number | null | undefined

  /** Storage Usage for root folder as of end date (not necessarily high water mark, which is used for billing) */
  getRootStorage(): number | null | undefined

  /**
   * Storage Usage for files that are deleted but uploaded within last 30 days as of end date (not necessarily high
   * water mark, which is used for billing)
   */
  getDeletedFilesCountedInMinimum(): number | null | undefined

  /**
   * Storage Usage for files that are deleted but retained as backups as of end date (not necessarily high water mark,
   * which is used for billing)
   */
  getDeletedFilesStorage(): number | null | undefined

  /** Storage + Transfer Usage - Total Billable amount */
  getTotalBillableUsage(): number | null | undefined

  /** Transfer usage for period - Total Billable amount */
  getTotalBillableTransferUsage(): number | null | undefined

  /** Transfer Usage for period - Outbound GB from Files Native Storage */
  getBytesSent(): number | null | undefined

  /** Transfer Usage for period - Inbound GB to Remote Servers (Sync/Mount) */
  getSyncBytesReceived(): number | null | undefined

  /** Transfer Usage for period - Outbound GB from Remote Servers (Sync/Mount) */
  getSyncBytesSent(): number | null | undefined

  /**
   * Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used
   * for billing)
   */
  getUsageByTopLevelDir(): UsageByTopLevelDir.Attributes[] | null | undefined

  /** List Usage Snapshots */
  static list(params?: UsageSnapshot.ListParams, options?: Files.RequestOptions): Promise<UsageSnapshot[]>

  /** Alias of `list()`. */
  static all(params?: UsageSnapshot.ListParams, options?: Files.RequestOptions): Promise<UsageSnapshot[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UsageSnapshot.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UsageSnapshot>
}

declare namespace UsageSnapshot {
  /** The fields of `UsageSnapshot` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Usage snapshot ID */
    id?: number | null

    /** Usage snapshot start date/time */
    start_at?: Files.DateTimeString | null

    /** Usage snapshot end date/time */
    end_at?: Files.DateTimeString | null

    /** Highest user count number in time period */
    high_water_user_count?: number | null

    /**
     * Total Transformation and AI credits used in this usage period. Updated daily. Does not include credits consumed
     * today.
     */
    transformation_credits_usage?: number | null

    /** Current total Storage Usage GB as of end date (not necessarily high water mark, which is used for billing) */
    current_storage?: number | null

    /** Highest Storage Usage GB recorded in time period (used for billing) */
    high_water_storage?: number | null

    /** Storage Usage for root folder as of end date (not necessarily high water mark, which is used for billing) */
    root_storage?: number | null

    /**
     * Storage Usage for files that are deleted but uploaded within last 30 days as of end date (not necessarily high
     * water mark, which is used for billing)
     */
    deleted_files_counted_in_minimum?: number | null

    /**
     * Storage Usage for files that are deleted but retained as backups as of end date (not necessarily high water mark,
     * which is used for billing)
     */
    deleted_files_storage?: number | null

    /** Storage + Transfer Usage - Total Billable amount */
    total_billable_usage?: number | null

    /** Transfer usage for period - Total Billable amount */
    total_billable_transfer_usage?: number | null

    /** Transfer Usage for period - Outbound GB from Files Native Storage */
    bytes_sent?: number | null

    /** Transfer Usage for period - Inbound GB to Remote Servers (Sync/Mount) */
    sync_bytes_received?: number | null

    /** Transfer Usage for period - Outbound GB from Remote Servers (Sync/Mount) */
    sync_bytes_sent?: number | null

    /**
     * Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used
     * for billing)
     */
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
  }
}

export default UsageSnapshot
