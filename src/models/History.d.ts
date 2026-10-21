import Files from '../Files'
import Action from './Action'

/** An Action is a single record in our history log. */
declare class History {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: History.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: History.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `path`. */
  isLoaded(): boolean

  /** Action ID */
  readonly id?: number | null

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  readonly path?: string | null

  /** Action occurrence date/time */
  readonly when?: Files.DateTimeString | null

  /** The destination path for this action, if applicable */
  readonly destination?: string | null

  /** Friendly displayed output */
  readonly display?: string | null

  /** IP Address that performed this action */
  readonly ip?: string | null

  /** The source path for this action, if applicable */
  readonly source?: string | null

  /** Targets */
  readonly targets?: Files.JsonObject | null

  /** User ID */
  readonly user_id?: number | null

  /** Username */
  readonly username?: string | null

  /** true if this change was performed by a user on a parent site. */
  readonly user_is_from_parent_site?: boolean | null

  /** Type of action */
  readonly action?: 'create' | 'read' | 'update' | 'destroy' | 'move' | 'login' | 'failedlogin' | 'copy' | 'user_create' | 'user_update' | 'user_destroy' | 'group_create' | 'group_update' | 'group_destroy' | 'permission_create' | 'permission_destroy' | 'api_key_create' | 'api_key_update' | 'api_key_destroy' | 'archived_delete' | Files.OtherString | null

  /** Failure type.  If action was a user login or session failure, why did it fail? */
  readonly failure_type?: 'expired_trial' | 'account_overdue' | 'locked_out' | 'ip_mismatch' | 'password_mismatch' | 'site_mismatch' | 'username_not_found' | 'none' | 'no_ftp_permission' | 'no_web_permission' | 'no_directory' | 'errno_enoent' | 'no_sftp_permission' | 'no_dav_permission' | 'no_restapi_permission' | 'key_mismatch' | 'region_mismatch' | 'expired_access' | 'desktop_ip_mismatch' | 'desktop_api_key_not_used_quickly_enough' | 'disabled' | 'country_mismatch' | 'insecure_ftp' | 'insecure_cipher' | 'rate_limited' | 'no_s3_compatible_endpoint_permission' | 'mobile_ip_mismatch' | 'mobile_api_key_not_used_quickly_enough' | 'desktop_app_disabled' | 'mobile_app_disabled' | Files.OtherString | null

  /** Interface on which this action occurred. */
  readonly interface?: 'web' | 'ftp' | 'robot' | 'jsapi' | 'webdesktopapi' | 'sftp' | 'dav' | 'desktop' | 'restapi' | 'scim' | 'office' | 'mobile' | 'as2' | 'inbound_email' | 'remote' | 'inbound_s3' | Files.OtherString | null

  /** Action ID */
  getId(): number | null | undefined

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  getPath(): string | null | undefined

  /** Action occurrence date/time */
  getWhen(): Files.DateTimeString | null | undefined

  /** The destination path for this action, if applicable */
  getDestination(): string | null | undefined

  /** Friendly displayed output */
  getDisplay(): string | null | undefined

  /** IP Address that performed this action */
  getIp(): string | null | undefined

  /** The source path for this action, if applicable */
  getSource(): string | null | undefined

  /** Targets */
  getTargets(): Files.JsonObject | null | undefined

  /** User ID */
  getUserId(): number | null | undefined

  /** Username */
  getUsername(): string | null | undefined

  /** true if this change was performed by a user on a parent site. */
  getUserIsFromParentSite(): boolean | null | undefined

  /** Type of action */
  getAction(): 'create' | 'read' | 'update' | 'destroy' | 'move' | 'login' | 'failedlogin' | 'copy' | 'user_create' | 'user_update' | 'user_destroy' | 'group_create' | 'group_update' | 'group_destroy' | 'permission_create' | 'permission_destroy' | 'api_key_create' | 'api_key_update' | 'api_key_destroy' | 'archived_delete' | Files.OtherString | null | undefined

  /** Failure type.  If action was a user login or session failure, why did it fail? */
  getFailureType(): 'expired_trial' | 'account_overdue' | 'locked_out' | 'ip_mismatch' | 'password_mismatch' | 'site_mismatch' | 'username_not_found' | 'none' | 'no_ftp_permission' | 'no_web_permission' | 'no_directory' | 'errno_enoent' | 'no_sftp_permission' | 'no_dav_permission' | 'no_restapi_permission' | 'key_mismatch' | 'region_mismatch' | 'expired_access' | 'desktop_ip_mismatch' | 'desktop_api_key_not_used_quickly_enough' | 'disabled' | 'country_mismatch' | 'insecure_ftp' | 'insecure_cipher' | 'rate_limited' | 'no_s3_compatible_endpoint_permission' | 'mobile_ip_mismatch' | 'mobile_api_key_not_used_quickly_enough' | 'desktop_app_disabled' | 'mobile_app_disabled' | Files.OtherString | null | undefined

  /** Interface on which this action occurred. */
  getInterface(): 'web' | 'ftp' | 'robot' | 'jsapi' | 'webdesktopapi' | 'sftp' | 'dav' | 'desktop' | 'restapi' | 'scim' | 'office' | 'mobile' | 'as2' | 'inbound_email' | 'remote' | 'inbound_s3' | Files.OtherString | null | undefined

  /**
   * List history for specific file
   * @param path - Path to operate on.
   */
  static listForFile(path: string, params?: History.ListForFileParams, options?: Files.RequestOptions): Promise<Action[]>

  /**
   * The models `listForFile()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForFileIterator(path: string, params?: History.ListForFileParams, options?: Files.RequestOptions): AsyncIterableIterator<Action>

  /**
   * List history for specific folder
   * @param path - Path to operate on.
   */
  static listForFolder(path: string, params?: History.ListForFolderParams, options?: Files.RequestOptions): Promise<Action[]>

  /**
   * The models `listForFolder()` lists, one at a time: nothing is requested before the first `next()`, and each page
   * only once the models before it have been taken. The params, options and settings are taken when the iterator is
   * made, the global settings as they are then unless `options.client` is given, and every page and model uses them.
   * Leaving a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is
   * not retried.
   */
  static listForFolderIterator(path: string, params?: History.ListForFolderParams, options?: Files.RequestOptions): AsyncIterableIterator<Action>

  /**
   * List history for specific user
   * @param userId - User ID.
   */
  static listForUser(userId: number, params?: History.ListForUserParams, options?: Files.RequestOptions): Promise<Action[]>

  /**
   * The models `listForUser()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForUserIterator(userId: number, params?: History.ListForUserParams, options?: Files.RequestOptions): AsyncIterableIterator<Action>

  /** List site login history */
  static listLogins(params?: History.ListLoginsParams, options?: Files.RequestOptions): Promise<Action[]>

  /**
   * The models `listLogins()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listLoginsIterator(params?: History.ListLoginsParams, options?: Files.RequestOptions): AsyncIterableIterator<Action>

  /** List site full action history */
  static list(params?: History.ListParams, options?: Files.RequestOptions): Promise<Action[]>

  /** Alias of `list()`. */
  static all(params?: History.ListParams, options?: Files.RequestOptions): Promise<Action[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: History.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Action>
}

declare namespace History {
  /** The fields of `History` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Action ID */
    id?: number | null

    /**
     * Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Action occurrence date/time */
    when?: Files.DateTimeString | null

    /** The destination path for this action, if applicable */
    destination?: string | null

    /** Friendly displayed output */
    display?: string | null

    /** IP Address that performed this action */
    ip?: string | null

    /** The source path for this action, if applicable */
    source?: string | null

    /** Targets */
    targets?: Files.JsonObject | null

    /** User ID */
    user_id?: number | null

    /** Username */
    username?: string | null

    /** true if this change was performed by a user on a parent site. */
    user_is_from_parent_site?: boolean | null

    /** Type of action */
    action?: 'create' | 'read' | 'update' | 'destroy' | 'move' | 'login' | 'failedlogin' | 'copy' | 'user_create' | 'user_update' | 'user_destroy' | 'group_create' | 'group_update' | 'group_destroy' | 'permission_create' | 'permission_destroy' | 'api_key_create' | 'api_key_update' | 'api_key_destroy' | 'archived_delete' | Files.OtherString | null

    /** Failure type.  If action was a user login or session failure, why did it fail? */
    failure_type?: 'expired_trial' | 'account_overdue' | 'locked_out' | 'ip_mismatch' | 'password_mismatch' | 'site_mismatch' | 'username_not_found' | 'none' | 'no_ftp_permission' | 'no_web_permission' | 'no_directory' | 'errno_enoent' | 'no_sftp_permission' | 'no_dav_permission' | 'no_restapi_permission' | 'key_mismatch' | 'region_mismatch' | 'expired_access' | 'desktop_ip_mismatch' | 'desktop_api_key_not_used_quickly_enough' | 'disabled' | 'country_mismatch' | 'insecure_ftp' | 'insecure_cipher' | 'rate_limited' | 'no_s3_compatible_endpoint_permission' | 'mobile_ip_mismatch' | 'mobile_api_key_not_used_quickly_enough' | 'desktop_app_disabled' | 'mobile_app_disabled' | Files.OtherString | null

    /** Interface on which this action occurred. */
    interface?: 'web' | 'ftp' | 'robot' | 'jsapi' | 'webdesktopapi' | 'sftp' | 'dav' | 'desktop' | 'restapi' | 'scim' | 'office' | 'mobile' | 'as2' | 'inbound_email' | 'remote' | 'inbound_s3' | Files.OtherString | null
  }

  interface ListForFileParams {
    /** Leave blank or set to a date/time to filter earlier entries. */
    start_at?: Files.DateTimeString

    /** Leave blank or set to a date/time to filter later entries. */
    end_at?: Files.DateTimeString

    /** Display format. Leave blank or set to `full` or `parent`. */
    display?: string

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject
  }

  interface ListForFolderParams {
    /** Leave blank or set to a date/time to filter earlier entries. */
    start_at?: Files.DateTimeString

    /** Leave blank or set to a date/time to filter later entries. */
    end_at?: Files.DateTimeString

    /** Display format. Leave blank or set to `full` or `parent`. */
    display?: string

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject
  }

  interface ListForUserParams {
    /** Leave blank or set to a date/time to filter earlier entries. */
    start_at?: Files.DateTimeString

    /** Leave blank or set to a date/time to filter later entries. */
    end_at?: Files.DateTimeString

    /** Display format. Leave blank or set to `full` or `parent`. */
    display?: string

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject
  }

  interface ListLoginsParams {
    /** Leave blank or set to a date/time to filter earlier entries. */
    start_at?: Files.DateTimeString

    /** Leave blank or set to a date/time to filter later entries. */
    end_at?: Files.DateTimeString

    /** Display format. Leave blank or set to `full` or `parent`. */
    display?: string

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject
  }

  interface ListParams {
    /** Leave blank or set to a date/time to filter earlier entries. */
    start_at?: Files.DateTimeString

    /** Leave blank or set to a date/time to filter later entries. */
    end_at?: Files.DateTimeString

    /** Display format. Leave blank or set to `full` or `parent`. */
    display?: string

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `user_id`,
     * `folder` or `path`. Valid field combinations are `[ ]`, `[ path ]`, `[ path ]` or `[ path ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`. */
    filter_prefix?: Files.JsonObject
  }
}

export default History
