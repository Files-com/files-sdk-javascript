import Files = require('../Files')
import SyncRunLiveTransfer = require('./SyncRunLiveTransfer')

/** A SyncRun represents a single execution (run) of a Sync job. */
declare class SyncRun {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SyncRun.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SyncRun.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** SyncRun ID */
  readonly id?: number | null

  /** Log or summary body for this run */
  readonly body?: string | null

  /** Total bytes synced in this run */
  readonly bytes_synced?: number | null

  /** Number of files compared */
  readonly compared_files?: number | null

  /** Number of folders compared */
  readonly compared_folders?: number | null

  /** When this run was completed */
  readonly completed_at?: Files.DateTimeString | null

  /** When this run was created */
  readonly created_at?: Files.DateTimeString | null

  /** Destination remote server type, if any */
  readonly dest_remote_server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

  /** Whether this run was a dry run (no actual changes made) */
  readonly dry_run?: boolean | null

  /** Number of files that errored */
  readonly errored_files?: number | null

  /** Estimated bytes count for this run */
  readonly estimated_bytes_count?: number | null

  /** Array of errors encountered during the run */
  readonly event_errors?: string[] | null

  /** Link to external log file. */
  readonly log_url?: string | null

  /** Total runtime in seconds */
  readonly runtime?: number | null

  /** Site ID */
  readonly site_id?: number | null

  /** Workspace ID */
  readonly workspace_id?: number | null

  /** Source remote server type, if any */
  readonly src_remote_server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

  /** Status of the sync run (success, failure, partial_failure, in_progress, skipped) */
  readonly status?: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null

  /** Number of files successfully synced */
  readonly successful_files?: number | null

  /** ID of the Sync this run belongs to */
  readonly sync_id?: number | null

  /** Name of the Sync this run belongs to */
  readonly sync_name?: string | null

  /** When this run was last updated */
  readonly updated_at?: Files.DateTimeString | null

  /** Array of in-progress file transfers with progress data. Only present when the sync run status is in_progress. */
  readonly live_transfers?: SyncRunLiveTransfer.Attributes[] | null

  /** SyncRun ID */
  getId(): number | null | undefined

  /** Log or summary body for this run */
  getBody(): string | null | undefined

  /** Total bytes synced in this run */
  getBytesSynced(): number | null | undefined

  /** Number of files compared */
  getComparedFiles(): number | null | undefined

  /** Number of folders compared */
  getComparedFolders(): number | null | undefined

  /** When this run was completed */
  getCompletedAt(): Files.DateTimeString | null | undefined

  /** When this run was created */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Destination remote server type, if any */
  getDestRemoteServerType(): 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null | undefined

  /** Whether this run was a dry run (no actual changes made) */
  getDryRun(): boolean | null | undefined

  /** Number of files that errored */
  getErroredFiles(): number | null | undefined

  /** Estimated bytes count for this run */
  getEstimatedBytesCount(): number | null | undefined

  /** Array of errors encountered during the run */
  getEventErrors(): string[] | null | undefined

  /** Link to external log file. */
  getLogUrl(): string | null | undefined

  /** Total runtime in seconds */
  getRuntime(): number | null | undefined

  /** Site ID */
  getSiteId(): number | null | undefined

  /** Workspace ID */
  getWorkspaceId(): number | null | undefined

  /** Source remote server type, if any */
  getSrcRemoteServerType(): 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null | undefined

  /** Status of the sync run (success, failure, partial_failure, in_progress, skipped) */
  getStatus(): 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null | undefined

  /** Number of files successfully synced */
  getSuccessfulFiles(): number | null | undefined

  /** ID of the Sync this run belongs to */
  getSyncId(): number | null | undefined

  /** Name of the Sync this run belongs to */
  getSyncName(): string | null | undefined

  /** When this run was last updated */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Array of in-progress file transfers with progress data. Only present when the sync run status is in_progress. */
  getLiveTransfers(): SyncRunLiveTransfer.Attributes[] | null | undefined

  /** List Sync Runs */
  static list(params?: SyncRun.ListParams, options?: Files.RequestOptions): Promise<SyncRun[]>

  /** Alias of `list()`. */
  static all(params?: SyncRun.ListParams, options?: Files.RequestOptions): Promise<SyncRun[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SyncRun.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SyncRun>

  /**
   * Show Sync Run
   * @param id - Sync Run ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SyncRun>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SyncRun>

  static default: typeof SyncRun
}

declare namespace SyncRun {
  /** The fields of `SyncRun` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** SyncRun ID */
    id?: number | null

    /** Log or summary body for this run */
    body?: string | null

    /** Total bytes synced in this run */
    bytes_synced?: number | null

    /** Number of files compared */
    compared_files?: number | null

    /** Number of folders compared */
    compared_folders?: number | null

    /** When this run was completed */
    completed_at?: Files.DateTimeString | null

    /** When this run was created */
    created_at?: Files.DateTimeString | null

    /** Destination remote server type, if any */
    dest_remote_server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

    /** Whether this run was a dry run (no actual changes made) */
    dry_run?: boolean | null

    /** Number of files that errored */
    errored_files?: number | null

    /** Estimated bytes count for this run */
    estimated_bytes_count?: number | null

    /** Array of errors encountered during the run */
    event_errors?: string[] | null

    /** Link to external log file. */
    log_url?: string | null

    /** Total runtime in seconds */
    runtime?: number | null

    /** Site ID */
    site_id?: number | null

    /** Workspace ID */
    workspace_id?: number | null

    /** Source remote server type, if any */
    src_remote_server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

    /** Status of the sync run (success, failure, partial_failure, in_progress, skipped) */
    status?: 'success' | 'failure' | 'partial_failure' | 'in_progress' | 'skipped' | Files.OtherString | null

    /** Number of files successfully synced */
    successful_files?: number | null

    /** ID of the Sync this run belongs to */
    sync_id?: number | null

    /** Name of the Sync this run belongs to */
    sync_name?: string | null

    /** When this run was last updated */
    updated_at?: Files.DateTimeString | null

    /** Array of in-progress file transfers with progress data. Only present when the sync run status is in_progress. */
    live_transfers?: SyncRunLiveTransfer.Attributes[] | null
  }

  interface ListParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

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
     * `workspace_id`, `sync_id`, `created_at` or `status`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `status`, `dry_run`, `workspace_id`, `src_remote_server_type`, `dest_remote_server_type` or `sync_id`. Valid
     * field combinations are `[ status, created_at ]`, `[ workspace_id, created_at ]`, `[ src_remote_server_type,
     * created_at ]`, `[ dest_remote_server_type, created_at ]`, `[ sync_id, created_at ]`, `[ workspace_id, status ]`,
     * `[ src_remote_server_type, status ]`, `[ dest_remote_server_type, status ]`, `[ sync_id, status ]`, `[
     * workspace_id, src_remote_server_type ]`, `[ workspace_id, dest_remote_server_type ]`, `[ workspace_id, sync_id
     * ]`, `[ workspace_id, status, created_at ]`, `[ src_remote_server_type, status, created_at ]`, `[
     * dest_remote_server_type, status, created_at ]`, `[ sync_id, status, created_at ]`, `[ workspace_id,
     * src_remote_server_type, created_at ]`, `[ workspace_id, dest_remote_server_type, created_at ]`, `[ workspace_id,
     * sync_id, created_at ]`, `[ workspace_id, src_remote_server_type, status ]`, `[ workspace_id,
     * dest_remote_server_type, status ]`, `[ workspace_id, sync_id, status ]`, `[ workspace_id, src_remote_server_type,
     * status, created_at ]`, `[ workspace_id, dest_remote_server_type, status, created_at ]` or `[ workspace_id,
     * sync_id, status, created_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = SyncRun
