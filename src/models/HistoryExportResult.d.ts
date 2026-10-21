import Files from '../Files'

/** A HistoryExportResult is a single record with historical information about actions that happened in your site. */
declare class HistoryExportResult {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: HistoryExportResult.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: HistoryExportResult.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Action ID */
  readonly id?: number | null

  /** When the action happened */
  readonly created_at?: number | null

  /** When the action happened, in ISO8601 format. */
  readonly created_at_iso8601?: string | null

  /** User ID */
  readonly user_id?: number | null

  /** File ID related to the action */
  readonly file_id?: number | null

  /** ID of the parent folder */
  readonly parent_id?: number | null

  /**
   * Path of the related action. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
   * of 5000 characters.
   */
  readonly path?: string | null

  /** Folder in which the action occurred */
  readonly folder?: string | null

  /** File move originated from this path */
  readonly src?: string | null

  /** File moved to this destination folder */
  readonly destination?: string | null

  /** Client IP that performed the action */
  readonly ip?: string | null

  /** Username of the user that performed the action */
  readonly username?: string | null

  /** true if this change was performed by a user on a parent site. */
  readonly user_is_from_parent_site?: boolean | null

  /**
   * What action was taken. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`,
   * `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`,
   * `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`, `archived_delete`
   */
  readonly action?: string | null

  /**
   * The type of login failure, if applicable. Valid values: `expired_trial`, `account_overdue`, `locked_out`,
   * `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`,
   * `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`,
   * `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`,
   * `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`,
   * `rate_limited`, `no_s3_compatible_endpoint_permission`, `mobile_ip_mismatch`,
   * `mobile_api_key_not_used_quickly_enough`, `desktop_app_disabled`, `mobile_app_disabled`
   */
  readonly failure_type?: string | null

  /**
   * Interface through which the action was taken. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`,
   * `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
   */
  readonly interface?: string | null

  /** ID of the object (such as Users, or API Keys) on which the action was taken */
  readonly target_id?: number | null

  /** Name of the User, Group or other object with a name related to this action */
  readonly target_name?: string | null

  /** Permission level of the action */
  readonly target_permission?: string | null

  /** Whether or not the action was recursive */
  readonly target_recursive?: boolean | null

  /**
   * If searching for Histories about API keys, this is when the API key will expire. Represented as a Unix timestamp.
   */
  readonly target_expires_at?: number | null

  /** If searching for Histories about API keys, this is when the API key will expire. Represented in ISO8601 format. */
  readonly target_expires_at_iso8601?: string | null

  /** If searching for Histories about API keys, this represents the permission set of the associated  API key */
  readonly target_permission_set?: string | null

  /** If searching for Histories about API keys, this is the platform on which the action was taken */
  readonly target_platform?: string | null

  /** If searching for Histories about API keys, this is the username on which the action was taken */
  readonly target_username?: string | null

  /** If searching for Histories about API keys, this is the User ID on which the action was taken */
  readonly target_user_id?: number | null

  /** Action ID */
  getId(): number | null | undefined

  /** When the action happened */
  getCreatedAt(): number | null | undefined

  /** When the action happened, in ISO8601 format. */
  getCreatedAtIso8601(): string | null | undefined

  /** User ID */
  getUserId(): number | null | undefined

  /** File ID related to the action */
  getFileId(): number | null | undefined

  /** ID of the parent folder */
  getParentId(): number | null | undefined

  /**
   * Path of the related action. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
   * of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Folder in which the action occurred */
  getFolder(): string | null | undefined

  /** File move originated from this path */
  getSrc(): string | null | undefined

  /** File moved to this destination folder */
  getDestination(): string | null | undefined

  /** Client IP that performed the action */
  getIp(): string | null | undefined

  /** Username of the user that performed the action */
  getUsername(): string | null | undefined

  /** true if this change was performed by a user on a parent site. */
  getUserIsFromParentSite(): boolean | null | undefined

  /**
   * What action was taken. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`,
   * `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`,
   * `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`, `archived_delete`
   */
  getAction(): string | null | undefined

  /**
   * The type of login failure, if applicable. Valid values: `expired_trial`, `account_overdue`, `locked_out`,
   * `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`,
   * `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`,
   * `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`,
   * `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`,
   * `rate_limited`, `no_s3_compatible_endpoint_permission`, `mobile_ip_mismatch`,
   * `mobile_api_key_not_used_quickly_enough`, `desktop_app_disabled`, `mobile_app_disabled`
   */
  getFailureType(): string | null | undefined

  /**
   * Interface through which the action was taken. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`,
   * `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
   */
  getInterface(): string | null | undefined

  /** ID of the object (such as Users, or API Keys) on which the action was taken */
  getTargetId(): number | null | undefined

  /** Name of the User, Group or other object with a name related to this action */
  getTargetName(): string | null | undefined

  /** Permission level of the action */
  getTargetPermission(): string | null | undefined

  /** Whether or not the action was recursive */
  getTargetRecursive(): boolean | null | undefined

  /**
   * If searching for Histories about API keys, this is when the API key will expire. Represented as a Unix timestamp.
   */
  getTargetExpiresAt(): number | null | undefined

  /** If searching for Histories about API keys, this is when the API key will expire. Represented in ISO8601 format. */
  getTargetExpiresAtIso8601(): string | null | undefined

  /** If searching for Histories about API keys, this represents the permission set of the associated  API key */
  getTargetPermissionSet(): string | null | undefined

  /** If searching for Histories about API keys, this is the platform on which the action was taken */
  getTargetPlatform(): string | null | undefined

  /** If searching for Histories about API keys, this is the username on which the action was taken */
  getTargetUsername(): string | null | undefined

  /** If searching for Histories about API keys, this is the User ID on which the action was taken */
  getTargetUserId(): number | null | undefined

  /** List History Export Results */
  static list(params: HistoryExportResult.ListParams, options?: Files.RequestOptions): Promise<HistoryExportResult[]>

  /** Alias of `list()`. */
  static all(params: HistoryExportResult.ListParams, options?: Files.RequestOptions): Promise<HistoryExportResult[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params: HistoryExportResult.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<HistoryExportResult>
}

declare namespace HistoryExportResult {
  /** The fields of `HistoryExportResult` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Action ID */
    id?: number | null

    /** When the action happened */
    created_at?: number | null

    /** When the action happened, in ISO8601 format. */
    created_at_iso8601?: string | null

    /** User ID */
    user_id?: number | null

    /** File ID related to the action */
    file_id?: number | null

    /** ID of the parent folder */
    parent_id?: number | null

    /**
     * Path of the related action. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
     * of 5000 characters.
     */
    path?: string | null

    /** Folder in which the action occurred */
    folder?: string | null

    /** File move originated from this path */
    src?: string | null

    /** File moved to this destination folder */
    destination?: string | null

    /** Client IP that performed the action */
    ip?: string | null

    /** Username of the user that performed the action */
    username?: string | null

    /** true if this change was performed by a user on a parent site. */
    user_is_from_parent_site?: boolean | null

    /**
     * What action was taken. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`,
     * `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`,
     * `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`,
     * `archived_delete`
     */
    action?: string | null

    /**
     * The type of login failure, if applicable. Valid values: `expired_trial`, `account_overdue`, `locked_out`,
     * `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`,
     * `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`,
     * `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`,
     * `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`,
     * `rate_limited`, `no_s3_compatible_endpoint_permission`, `mobile_ip_mismatch`,
     * `mobile_api_key_not_used_quickly_enough`, `desktop_app_disabled`, `mobile_app_disabled`
     */
    failure_type?: string | null

    /**
     * Interface through which the action was taken. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`,
     * `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
     */
    interface?: string | null

    /** ID of the object (such as Users, or API Keys) on which the action was taken */
    target_id?: number | null

    /** Name of the User, Group or other object with a name related to this action */
    target_name?: string | null

    /** Permission level of the action */
    target_permission?: string | null

    /** Whether or not the action was recursive */
    target_recursive?: boolean | null

    /**
     * If searching for Histories about API keys, this is when the API key will expire. Represented as a Unix timestamp.
     */
    target_expires_at?: number | null

    /**
     * If searching for Histories about API keys, this is when the API key will expire. Represented in ISO8601 format.
     */
    target_expires_at_iso8601?: string | null

    /** If searching for Histories about API keys, this represents the permission set of the associated  API key */
    target_permission_set?: string | null

    /** If searching for Histories about API keys, this is the platform on which the action was taken */
    target_platform?: string | null

    /** If searching for Histories about API keys, this is the username on which the action was taken */
    target_username?: string | null

    /** If searching for Histories about API keys, this is the User ID on which the action was taken */
    target_user_id?: number | null
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

    /** ID of the associated history export. */
    history_export_id: number
  }
}

export default HistoryExportResult
