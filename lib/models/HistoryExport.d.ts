import Files = require('../Files')

/** A History Export is a resource on the API that is used to export historical action (history) logs. */
declare class HistoryExport {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: HistoryExport.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: HistoryExport.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Workspace of the export. 0 represents the default workspace. A null value means a site-wide export. */
  readonly workspace_id?: number | null

  /** History Export ID */
  readonly id?: number | null

  /** Version of the history for the export. */
  readonly history_version?: string | null

  /** Start date/time of export range. */
  readonly start_at?: Files.DateTimeString | null

  /** End date/time of export range. */
  readonly end_at?: Files.DateTimeString | null

  /** Status of export.  Will be: `building`, `ready`, or `failed` */
  readonly status?: string | null

  /**
   * Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`,
   * `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`,
   * `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`,
   * `archived_delete`
   */
  readonly query_action?: string | null

  /**
   * Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`,
   * `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
   */
  readonly query_interface?: string | null

  /** Return results that are actions performed by the user indicated by this User ID */
  readonly query_user_id?: string | null

  /** Return results that are file actions related to the file indicated by this File ID */
  readonly query_file_id?: string | null

  /** Return results that are file actions inside the parent folder specified by this folder ID */
  readonly query_parent_id?: string | null

  /** Return results that are file actions related to paths matching this pattern. */
  readonly query_path?: string | null

  /** Return results that are file actions related to files or folders inside folder paths matching this pattern. */
  readonly query_folder?: string | null

  /** Return results that are file moves originating from paths matching this pattern. */
  readonly query_src?: string | null

  /** Return results that are file moves with paths matching this pattern as destination. */
  readonly query_destination?: string | null

  /** Filter results by this IP address. */
  readonly query_ip?: string | null

  /** Filter results by this username. */
  readonly query_username?: string | null

  /**
   * If searching for Histories about login failures, this parameter restricts results to failures of this specific
   * type. Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`,
   * `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`,
   * `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`,
   * `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`,
   * `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`, `no_s3_compatible_endpoint_permission`,
   * `mobile_ip_mismatch`, `mobile_api_key_not_used_quickly_enough`, `desktop_app_disabled`, `mobile_app_disabled`
   */
  readonly query_failure_type?: string | null

  /**
   * If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results to
   * objects that match this ID.
   */
  readonly query_target_id?: string | null

  /**
   * If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to
   * objects with this name/username.
   */
  readonly query_target_name?: string | null

  /** If searching for Histories about Permissions, this parameter restricts results to permissions of this level. */
  readonly query_target_permission?: string | null

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user
   * ID.
   */
  readonly query_target_user_id?: string | null

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this
   * username.
   */
  readonly query_target_username?: string | null

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys associated with this
   * platform.
   */
  readonly query_target_platform?: string | null

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
   */
  readonly query_target_permission_set?: string | null

  /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
  readonly results_url?: string | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** Workspace of the export. 0 represents the default workspace. A null value means a site-wide export. */
  getWorkspaceId(): number | null | undefined

  /** History Export ID */
  getId(): number | null | undefined

  /** Version of the history for the export. */
  getHistoryVersion(): string | null | undefined

  /** Start date/time of export range. */
  getStartAt(): Files.DateTimeString | null | undefined

  /** End date/time of export range. */
  getEndAt(): Files.DateTimeString | null | undefined

  /** Status of export.  Will be: `building`, `ready`, or `failed` */
  getStatus(): string | null | undefined

  /**
   * Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`,
   * `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`,
   * `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`,
   * `archived_delete`
   */
  getQueryAction(): string | null | undefined

  /**
   * Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`,
   * `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
   */
  getQueryInterface(): string | null | undefined

  /** Return results that are actions performed by the user indicated by this User ID */
  getQueryUserId(): string | null | undefined

  /** Return results that are file actions related to the file indicated by this File ID */
  getQueryFileId(): string | null | undefined

  /** Return results that are file actions inside the parent folder specified by this folder ID */
  getQueryParentId(): string | null | undefined

  /** Return results that are file actions related to paths matching this pattern. */
  getQueryPath(): string | null | undefined

  /** Return results that are file actions related to files or folders inside folder paths matching this pattern. */
  getQueryFolder(): string | null | undefined

  /** Return results that are file moves originating from paths matching this pattern. */
  getQuerySrc(): string | null | undefined

  /** Return results that are file moves with paths matching this pattern as destination. */
  getQueryDestination(): string | null | undefined

  /** Filter results by this IP address. */
  getQueryIp(): string | null | undefined

  /** Filter results by this username. */
  getQueryUsername(): string | null | undefined

  /**
   * If searching for Histories about login failures, this parameter restricts results to failures of this specific
   * type. Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`,
   * `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`,
   * `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`,
   * `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`,
   * `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`, `no_s3_compatible_endpoint_permission`,
   * `mobile_ip_mismatch`, `mobile_api_key_not_used_quickly_enough`, `desktop_app_disabled`, `mobile_app_disabled`
   */
  getQueryFailureType(): string | null | undefined

  /**
   * If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results to
   * objects that match this ID.
   */
  getQueryTargetId(): string | null | undefined

  /**
   * If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to
   * objects with this name/username.
   */
  getQueryTargetName(): string | null | undefined

  /** If searching for Histories about Permissions, this parameter restricts results to permissions of this level. */
  getQueryTargetPermission(): string | null | undefined

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user
   * ID.
   */
  getQueryTargetUserId(): string | null | undefined

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this
   * username.
   */
  getQueryTargetUsername(): string | null | undefined

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys associated with this
   * platform.
   */
  getQueryTargetPlatform(): string | null | undefined

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
   */
  getQueryTargetPermissionSet(): string | null | undefined

  /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
  getResultsUrl(): string | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** Workspace of the export. 0 represents the default workspace. A null value means a site-wide export. */
  setWorkspaceId(value: number): void

  /** History Export ID */
  setId(value: number): void

  /** Version of the history for the export. */
  setHistoryVersion(value: string): void

  /** Start date/time of export range. */
  setStartAt(value: Files.DateTimeString): void

  /** End date/time of export range. */
  setEndAt(value: Files.DateTimeString): void

  /** Status of export.  Will be: `building`, `ready`, or `failed` */
  setStatus(value: string): void

  /**
   * Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`,
   * `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`,
   * `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`,
   * `archived_delete`
   */
  setQueryAction(value: string): void

  /**
   * Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`,
   * `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
   */
  setQueryInterface(value: string): void

  /** Return results that are actions performed by the user indicated by this User ID */
  setQueryUserId(value: string): void

  /** Return results that are file actions related to the file indicated by this File ID */
  setQueryFileId(value: string): void

  /** Return results that are file actions inside the parent folder specified by this folder ID */
  setQueryParentId(value: string): void

  /** Return results that are file actions related to paths matching this pattern. */
  setQueryPath(value: string): void

  /** Return results that are file actions related to files or folders inside folder paths matching this pattern. */
  setQueryFolder(value: string): void

  /** Return results that are file moves originating from paths matching this pattern. */
  setQuerySrc(value: string): void

  /** Return results that are file moves with paths matching this pattern as destination. */
  setQueryDestination(value: string): void

  /** Filter results by this IP address. */
  setQueryIp(value: string): void

  /** Filter results by this username. */
  setQueryUsername(value: string): void

  /**
   * If searching for Histories about login failures, this parameter restricts results to failures of this specific
   * type. Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`,
   * `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`,
   * `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`,
   * `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`,
   * `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`, `no_s3_compatible_endpoint_permission`,
   * `mobile_ip_mismatch`, `mobile_api_key_not_used_quickly_enough`, `desktop_app_disabled`, `mobile_app_disabled`
   */
  setQueryFailureType(value: string): void

  /**
   * If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results to
   * objects that match this ID.
   */
  setQueryTargetId(value: string): void

  /**
   * If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to
   * objects with this name/username.
   */
  setQueryTargetName(value: string): void

  /** If searching for Histories about Permissions, this parameter restricts results to permissions of this level. */
  setQueryTargetPermission(value: string): void

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user
   * ID.
   */
  setQueryTargetUserId(value: string): void

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this
   * username.
   */
  setQueryTargetUsername(value: string): void

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys associated with this
   * platform.
   */
  setQueryTargetPlatform(value: string): void

  /**
   * If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
   */
  setQueryTargetPermissionSet(value: string): void

  /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
  setResultsUrl(value: string): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /**
   * Show History Export
   * @param id - History Export ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<HistoryExport>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<HistoryExport>

  /** Create History Export */
  static create(params?: HistoryExport.CreateParams, options?: Files.RequestOptions): Promise<HistoryExport>

  static default: typeof HistoryExport
}

declare namespace HistoryExport {
  /** The fields of `HistoryExport` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Workspace of the export. 0 represents the default workspace. A null value means a site-wide export. */
    workspace_id?: number | null

    /** History Export ID */
    id?: number | null

    /** Version of the history for the export. */
    history_version?: string | null

    /** Start date/time of export range. */
    start_at?: Files.DateTimeString | null

    /** End date/time of export range. */
    end_at?: Files.DateTimeString | null

    /** Status of export.  Will be: `building`, `ready`, or `failed` */
    status?: string | null

    /**
     * Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`,
     * `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`,
     * `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`,
     * `api_key_destroy`, `archived_delete`
     */
    query_action?: string | null

    /**
     * Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`,
     * `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
     */
    query_interface?: string | null

    /** Return results that are actions performed by the user indicated by this User ID */
    query_user_id?: string | null

    /** Return results that are file actions related to the file indicated by this File ID */
    query_file_id?: string | null

    /** Return results that are file actions inside the parent folder specified by this folder ID */
    query_parent_id?: string | null

    /** Return results that are file actions related to paths matching this pattern. */
    query_path?: string | null

    /** Return results that are file actions related to files or folders inside folder paths matching this pattern. */
    query_folder?: string | null

    /** Return results that are file moves originating from paths matching this pattern. */
    query_src?: string | null

    /** Return results that are file moves with paths matching this pattern as destination. */
    query_destination?: string | null

    /** Filter results by this IP address. */
    query_ip?: string | null

    /** Filter results by this username. */
    query_username?: string | null

    /**
     * If searching for Histories about login failures, this parameter restricts results to failures of this specific
     * type. Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`,
     * `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`,
     * `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`,
     * `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`,
     * `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`,
     * `no_s3_compatible_endpoint_permission`, `mobile_ip_mismatch`, `mobile_api_key_not_used_quickly_enough`,
     * `desktop_app_disabled`, `mobile_app_disabled`
     */
    query_failure_type?: string | null

    /**
     * If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results
     * to objects that match this ID.
     */
    query_target_id?: string | null

    /**
     * If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to
     * objects with this name/username.
     */
    query_target_name?: string | null

    /** If searching for Histories about Permissions, this parameter restricts results to permissions of this level. */
    query_target_permission?: string | null

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user
     * ID.
     */
    query_target_user_id?: string | null

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this
     * username.
     */
    query_target_username?: string | null

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys associated with this
     * platform.
     */
    query_target_platform?: string | null

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
     */
    query_target_permission_set?: string | null

    /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
    results_url?: string | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Start date/time of export range. */
    start_at?: Files.DateTimeString

    /** End date/time of export range. */
    end_at?: Files.DateTimeString

    /**
     * Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`,
     * `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`,
     * `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`,
     * `api_key_destroy`, `archived_delete`
     */
    query_action?: string

    /**
     * Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`,
     * `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`, `inbound_s3`
     */
    query_interface?: string

    /** Return results that are actions performed by the user indicated by this User ID */
    query_user_id?: string

    /** Return results that are file actions related to the file indicated by this File ID */
    query_file_id?: string

    /** Return results that are file actions inside the parent folder specified by this folder ID */
    query_parent_id?: string

    /** Return results that are file actions related to paths matching this pattern. */
    query_path?: string

    /** Return results that are file actions related to files or folders inside folder paths matching this pattern. */
    query_folder?: string

    /** Return results that are file moves originating from paths matching this pattern. */
    query_src?: string

    /** Return results that are file moves with paths matching this pattern as destination. */
    query_destination?: string

    /** Filter results by this IP address. */
    query_ip?: string

    /** Filter results by this username. */
    query_username?: string

    /**
     * If searching for Histories about login failures, this parameter restricts results to failures of this specific
     * type. Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`,
     * `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`,
     * `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`,
     * `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`,
     * `disabled`, `country_mismatch`, `insecure_ftp`, `insecure_cipher`, `rate_limited`,
     * `no_s3_compatible_endpoint_permission`, `mobile_ip_mismatch`, `mobile_api_key_not_used_quickly_enough`,
     * `desktop_app_disabled`, `mobile_app_disabled`
     */
    query_failure_type?: string

    /**
     * If searching for Histories about specific objects (such as Users, or API Keys), this parameter restricts results
     * to objects that match this ID.
     */
    query_target_id?: string

    /**
     * If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to
     * objects with this name/username.
     */
    query_target_name?: string

    /** If searching for Histories about Permissions, this parameter restricts results to permissions of this level. */
    query_target_permission?: string

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user
     * ID.
     */
    query_target_user_id?: string

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys created by/for this
     * username.
     */
    query_target_username?: string

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys associated with this
     * platform.
     */
    query_target_platform?: string

    /**
     * If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
     */
    query_target_permission_set?: string
  }
}

export = HistoryExport
