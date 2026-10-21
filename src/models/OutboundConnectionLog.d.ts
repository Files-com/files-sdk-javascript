import Files from '../Files'

/**
 * An OutboundConnectionLog is an audit log for monitoring and troubleshooting actions performed by your Remote Servers
 * and Files.com on-premise Agents.
 */
declare class OutboundConnectionLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: OutboundConnectionLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: OutboundConnectionLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /**
   * Remote Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** End User IP */
  readonly client_ip?: string | null

  /** Source Remote Server ID */
  readonly src_remote_server_id?: number | null

  /** Source Remote Server name */
  readonly src_remote_server_name?: string | null

  /** Destination Remote Server ID */
  readonly dest_remote_server_id?: number | null

  /** Destination Remote Server name */
  readonly dest_remote_server_name?: string | null

  /** Operation Type */
  readonly operation?: 'copy_file' | 'delete' | 'download_request' | 'home_path' | 'list' | 'list_recursive' | 'list_recursive_with_download' | 'list_with_download' | 'metadata' | 'mkdir' | 'move_file' | 'ping' | 'rmdir_r' | 'upload' | 'upload_finalize' | 'upload_request' | Files.OtherString | null

  /** Error message, if applicable */
  readonly error_message?: string | null

  /** Error operation, if applicable */
  readonly error_operation?: string | null

  /** Error type, if applicable */
  readonly error_type?: string | null

  /** Status */
  readonly status?: 'complete' | 'error' | Files.OtherString | null

  /** Duration (in milliseconds) */
  readonly duration_ms?: number | null

  /** Data Length in Bytes. Present for upload actions that transfer data. */
  readonly bytes_uploaded?: number | null

  /** Data Length in Bytes. Present for download actions that transfer data. */
  readonly bytes_downloaded?: number | null

  /** Number of entries returned for a folder list action. */
  readonly list_count?: number | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /**
   * Remote Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** End User IP */
  getClientIp(): string | null | undefined

  /** Source Remote Server ID */
  getSrcRemoteServerId(): number | null | undefined

  /** Source Remote Server name */
  getSrcRemoteServerName(): string | null | undefined

  /** Destination Remote Server ID */
  getDestRemoteServerId(): number | null | undefined

  /** Destination Remote Server name */
  getDestRemoteServerName(): string | null | undefined

  /** Operation Type */
  getOperation(): 'copy_file' | 'delete' | 'download_request' | 'home_path' | 'list' | 'list_recursive' | 'list_recursive_with_download' | 'list_with_download' | 'metadata' | 'mkdir' | 'move_file' | 'ping' | 'rmdir_r' | 'upload' | 'upload_finalize' | 'upload_request' | Files.OtherString | null | undefined

  /** Error message, if applicable */
  getErrorMessage(): string | null | undefined

  /** Error operation, if applicable */
  getErrorOperation(): string | null | undefined

  /** Error type, if applicable */
  getErrorType(): string | null | undefined

  /** Status */
  getStatus(): 'complete' | 'error' | Files.OtherString | null | undefined

  /** Duration (in milliseconds) */
  getDurationMs(): number | null | undefined

  /** Data Length in Bytes. Present for upload actions that transfer data. */
  getBytesUploaded(): number | null | undefined

  /** Data Length in Bytes. Present for download actions that transfer data. */
  getBytesDownloaded(): number | null | undefined

  /** Number of entries returned for a folder list action. */
  getListCount(): number | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Outbound Connection Logs */
  static list(params?: OutboundConnectionLog.ListParams, options?: Files.RequestOptions): Promise<OutboundConnectionLog[]>

  /** Alias of `list()`. */
  static all(params?: OutboundConnectionLog.ListParams, options?: Files.RequestOptions): Promise<OutboundConnectionLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: OutboundConnectionLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<OutboundConnectionLog>
}

declare namespace OutboundConnectionLog {
  /** The fields of `OutboundConnectionLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /**
     * Remote Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** End User IP */
    client_ip?: string | null

    /** Source Remote Server ID */
    src_remote_server_id?: number | null

    /** Source Remote Server name */
    src_remote_server_name?: string | null

    /** Destination Remote Server ID */
    dest_remote_server_id?: number | null

    /** Destination Remote Server name */
    dest_remote_server_name?: string | null

    /** Operation Type */
    operation?: 'copy_file' | 'delete' | 'download_request' | 'home_path' | 'list' | 'list_recursive' | 'list_recursive_with_download' | 'list_with_download' | 'metadata' | 'mkdir' | 'move_file' | 'ping' | 'rmdir_r' | 'upload' | 'upload_finalize' | 'upload_request' | Files.OtherString | null

    /** Error message, if applicable */
    error_message?: string | null

    /** Error operation, if applicable */
    error_operation?: string | null

    /** Error type, if applicable */
    error_type?: string | null

    /** Status */
    status?: 'complete' | 'error' | Files.OtherString | null

    /** Duration (in milliseconds) */
    duration_ms?: number | null

    /** Data Length in Bytes. Present for upload actions that transfer data. */
    bytes_uploaded?: number | null

    /** Data Length in Bytes. Present for download actions that transfer data. */
    bytes_downloaded?: number | null

    /** Number of entries returned for a folder list action. */
    list_count?: number | null

    /** Start Time of Action */
    created_at?: Files.DateTimeString | null
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 1000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `operation`,
     * `status`, `src_remote_server_id`, `dest_remote_server_id`, `path`, `client_ip` or `created_at`. Valid field
     * combinations are any combination of `operation`, `status`, `src_remote_server_id`, `dest_remote_server_id`,
     * `path`, `client_ip` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `operation`, `status`, `src_remote_server_id`,
     * `dest_remote_server_id`, `path`, `client_ip` and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `operation`, `status`, `src_remote_server_id`,
     * `dest_remote_server_id`, `path`, `client_ip` and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
     * Valid field combinations are any combination of `operation`, `status`, `src_remote_server_id`,
     * `dest_remote_server_id`, `path`, `client_ip` and `created_at`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `operation`, `status`, `src_remote_server_id`,
     * `dest_remote_server_id`, `path`, `client_ip` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `operation`, `status`, `src_remote_server_id`,
     * `dest_remote_server_id`, `path`, `client_ip` and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default OutboundConnectionLog
