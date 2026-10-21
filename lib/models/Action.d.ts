import Files = require('../Files')

/** An Action is a single record in our history log. */
declare class Action {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Action.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Action.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
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

  static default: typeof Action
}

declare namespace Action {
  /** The fields of `Action` objects. Any of them can be missing, and those the API returns can be null. */
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
}

export = Action
