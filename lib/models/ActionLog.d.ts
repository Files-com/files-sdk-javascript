import Files = require('../Files')

/** An ActionLog is an audit log of file actions performed by users or the system. */
declare class ActionLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ActionLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ActionLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The type of action performed */
  readonly action?: string | null

  /** Time the action was performed */
  readonly created_at?: Files.DateTimeString | null

  /** Destination path, for moves and copies */
  readonly destination?: string | null

  /** Failure type, if applicable */
  readonly failure_type?: string | null

  /** Folder involved in the action */
  readonly folder?: string | null

  /** Interface used to perform the action */
  readonly interface?: string | null

  /** IP address from which the action was performed */
  readonly ip?: string | null

  /** File or Folder ID associated with the action */
  readonly metadata_dm_id?: number | null

  /** Parent File or Folder ID associated with the action */
  readonly parent_metadata_dm_id?: number | null

  /**
   * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Site ID where the action took place */
  readonly site_id?: number | null

  /** Source path, for moves and copies */
  readonly src?: string | null

  /** User ID who performed the action */
  readonly user_id?: number | null

  /** Username who performed the action */
  readonly username?: string | null

  /** The type of action performed */
  getAction(): string | null | undefined

  /** Time the action was performed */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Destination path, for moves and copies */
  getDestination(): string | null | undefined

  /** Failure type, if applicable */
  getFailureType(): string | null | undefined

  /** Folder involved in the action */
  getFolder(): string | null | undefined

  /** Interface used to perform the action */
  getInterface(): string | null | undefined

  /** IP address from which the action was performed */
  getIp(): string | null | undefined

  /** File or Folder ID associated with the action */
  getMetadataDmId(): number | null | undefined

  /** Parent File or Folder ID associated with the action */
  getParentMetadataDmId(): number | null | undefined

  /**
   * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Site ID where the action took place */
  getSiteId(): number | null | undefined

  /** Source path, for moves and copies */
  getSrc(): string | null | undefined

  /** User ID who performed the action */
  getUserId(): number | null | undefined

  /** Username who performed the action */
  getUsername(): string | null | undefined

  /** List Action Logs */
  static list(params?: ActionLog.ListParams, options?: Files.RequestOptions): Promise<ActionLog[]>

  /** Alias of `list()`. */
  static all(params?: ActionLog.ListParams, options?: Files.RequestOptions): Promise<ActionLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ActionLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ActionLog>

  static default: typeof ActionLog
}

declare namespace ActionLog {
  /** The fields of `ActionLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The type of action performed */
    action?: string | null

    /** Time the action was performed */
    created_at?: Files.DateTimeString | null

    /** Destination path, for moves and copies */
    destination?: string | null

    /** Failure type, if applicable */
    failure_type?: string | null

    /** Folder involved in the action */
    folder?: string | null

    /** Interface used to perform the action */
    interface?: string | null

    /** IP address from which the action was performed */
    ip?: string | null

    /** File or Folder ID associated with the action */
    metadata_dm_id?: number | null

    /** Parent File or Folder ID associated with the action */
    parent_metadata_dm_id?: number | null

    /**
     * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Site ID where the action took place */
    site_id?: number | null

    /** Source path, for moves and copies */
    src?: string | null

    /** User ID who performed the action */
    user_id?: number | null

    /** Username who performed the action */
    username?: string | null
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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `folder`,
     * `path`, `src`, `destination`, `created_at`, `user_id` or `username`. Valid field combinations are any combination
     * of `folder`, `path`, `src`, `destination`, `created_at`, `user_id` and `username`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `folder`, `path`, `src`, `destination`,
     * `created_at`, `user_id` and `username`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `folder`, `path`, `src`, `destination`,
     * `created_at`, `user_id` and `username`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `folder`,
     * `path`, `src`, `destination` or `username`. Valid field combinations are any combination of `folder`, `path`,
     * `src`, `destination`, `created_at`, `user_id` and `username`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `folder`, `path`, `src`, `destination`, `created_at`, `user_id`
     * and `username`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `folder`, `path`, `src`, `destination`,
     * `created_at`, `user_id` and `username`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = ActionLog
