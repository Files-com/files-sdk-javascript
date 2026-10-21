import Files = require('../Files')

/** A FileMigrationLog is an audit log for monitoring and troubleshooting File Migrations in your site. */
declare class FileMigrationLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FileMigrationLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FileMigrationLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** File Migration ID */
  readonly file_migration_id?: number | null

  /** Destination path, for moves and copies */
  readonly dest_path?: string | null

  /** Error type, if applicable */
  readonly error_type?: string | null

  /** Message */
  readonly message?: string | null

  /** Operation type */
  readonly operation?: 'copy' | 'delete' | 'delete_for_overwrite' | 'mkdir' | 'move' | 'organize' | 'regional_migration' | Files.OtherString | null

  /**
   * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Status */
  readonly status?: 'success' | 'failure' | 'skipped' | 'retried_failure' | Files.OtherString | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** File Migration ID */
  getFileMigrationId(): number | null | undefined

  /** Destination path, for moves and copies */
  getDestPath(): string | null | undefined

  /** Error type, if applicable */
  getErrorType(): string | null | undefined

  /** Message */
  getMessage(): string | null | undefined

  /** Operation type */
  getOperation(): 'copy' | 'delete' | 'delete_for_overwrite' | 'mkdir' | 'move' | 'organize' | 'regional_migration' | Files.OtherString | null | undefined

  /**
   * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Status */
  getStatus(): 'success' | 'failure' | 'skipped' | 'retried_failure' | Files.OtherString | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List File Migration Logs */
  static list(params?: FileMigrationLog.ListParams, options?: Files.RequestOptions): Promise<FileMigrationLog[]>

  /** Alias of `list()`. */
  static all(params?: FileMigrationLog.ListParams, options?: Files.RequestOptions): Promise<FileMigrationLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: FileMigrationLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<FileMigrationLog>

  static default: typeof FileMigrationLog
}

declare namespace FileMigrationLog {
  /** The fields of `FileMigrationLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** File Migration ID */
    file_migration_id?: number | null

    /** Destination path, for moves and copies */
    dest_path?: string | null

    /** Error type, if applicable */
    error_type?: string | null

    /** Message */
    message?: string | null

    /** Operation type */
    operation?: 'copy' | 'delete' | 'delete_for_overwrite' | 'mkdir' | 'move' | 'organize' | 'regional_migration' | Files.OtherString | null

    /**
     * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Status */
    status?: 'success' | 'failure' | 'skipped' | 'retried_failure' | Files.OtherString | null

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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `file_migration_id`, `operation`, `status`, `type` or `created_at`. Valid field combinations are any combination
     * of `file_migration_id`, `operation`, `status`, `type` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `file_migration_id`, `operation`, `status`, `type`
     * and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `file_migration_id`, `operation`, `status`, `type`
     * and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `file_migration_id`, `operation`, `status`, `type` and
     * `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `file_migration_id`, `operation`, `status`, `type`
     * and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = FileMigrationLog
