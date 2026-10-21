import Files from '../Files'
import Attachment from '../Attachment'

/**
 * A User represents a human or system/service user with the ability to connect to Files.com via any of the available
 * connectivity methods (unless restricted to specific protocols).
 */
declare class User {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: User.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: User.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** User ID */
  readonly id?: number | null

  /** User's username */
  readonly username?: string | null

  /** List of group IDs of which this user is an administrator */
  readonly admin_group_ids?: number[] | null

  /** A list of allowed IPs if applicable.  Newline delimited */
  readonly allowed_ips?: string | null

  /** If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead. */
  readonly attachments_permission?: boolean | null

  /** Number of API keys associated with this user */
  readonly api_keys_count?: number | null

  /** Scheduled Date/Time at which user will be deactivated */
  readonly authenticate_until?: Files.DateTimeString | null

  /** How is this user authenticated? */
  readonly authentication_method?: 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | Files.OtherString | null

  /** URL holding the user's avatar */
  readonly avatar_url?: string | null

  /** Is this a billable user record? */
  readonly billable?: boolean | null

  /** Allow this user to perform operations on the account, payments, and invoices? */
  readonly billing_permission?: boolean | null

  /** Allow this user to skip site-wide IP blacklists? */
  readonly bypass_site_allowed_ips?: boolean | null

  /** Exempt this user from user lifecycle rules? */
  readonly bypass_user_lifecycle_rules?: boolean | null

  /** When this user was created */
  readonly created_at?: Files.DateTimeString | null

  /** Can the user connect with WebDAV? */
  readonly dav_permission?: boolean | null

  /**
   * Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically
   * disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
   */
  readonly disabled?: boolean | null

  /** Computed property that returns true if user disabled or expired or inactive. */
  readonly disabled_expired_or_inactive?: boolean | null

  /** AI Assistant Personality ID assigned directly to this user, if any. */
  readonly ai_assistant_personality_id?: number | null

  /** Desktop Configuration Profile ID assigned directly to this user, if any. */
  readonly desktop_configuration_profile_id?: number | null

  /** Integration Centric Profile ID assigned directly to this user, if any. */
  readonly integration_centric_profile_id?: number | null

  /** User email address */
  readonly email?: string | null

  /** File system layout */
  readonly filesystem_layout?: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | 'workspace_root' | Files.OtherString | null

  /** User's first login time */
  readonly first_login_at?: Files.DateTimeString | null

  /** Can the user access with FTP/FTPS? */
  readonly ftp_permission?: boolean | null

  /** Comma-separated list of group IDs of which this user is a member */
  readonly group_ids?: string | null

  /** Text to display to the user in the header of the UI */
  readonly header_text?: string | null

  /** Preferred language */
  readonly language?: string | null

  /** User's most recent login time via any protocol */
  readonly last_login_at?: Files.DateTimeString | null

  /** User's most recent login time via web */
  readonly last_web_login_at?: Files.DateTimeString | null

  /** User's most recent login time via FTP */
  readonly last_ftp_login_at?: Files.DateTimeString | null

  /** User's most recent login time via SFTP */
  readonly last_sftp_login_at?: Files.DateTimeString | null

  /** User's most recent login time via WebDAV */
  readonly last_dav_login_at?: Files.DateTimeString | null

  /** User's most recent login time via Desktop app */
  readonly last_desktop_login_at?: Files.DateTimeString | null

  /** User's most recent login time via Rest API */
  readonly last_restapi_login_at?: Files.DateTimeString | null

  /** User's most recent API use time */
  readonly last_api_use_at?: Files.DateTimeString | null

  /**
   * User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or
   * creation
   */
  readonly last_active_at?: Files.DateTimeString | null

  /** The most recent protocol and cipher used */
  readonly last_protocol_cipher?: string | null

  /** Time in the future that the user will no longer be locked out if applicable */
  readonly lockout_expires?: Files.DateTimeString | null

  /** User's full name */
  readonly name?: string | null

  /** User's company */
  readonly company?: string | null

  /** Any internal notes on the user */
  readonly notes?: string | null

  /** Hour of the day at which daily notifications should be sent. Can be in range 0 to 23 */
  readonly notification_daily_send_time?: number | null

  /** Enable integration with Office for the web? */
  readonly office_integration_enabled?: boolean | null

  /** Is this user a Partner administrator? */
  readonly partner_admin?: boolean | null

  /** Partner ID if this user belongs to a Partner */
  readonly partner_id?: number | null

  /** Name of the Partner if this user belongs to a Partner */
  readonly partner_name?: string | null

  /** Last time the user's password was set */
  readonly password_set_at?: Files.DateTimeString | null

  /** Number of days to allow user to use the same password */
  readonly password_validity_days?: number | null

  /** Primary group ID for Group Admin scoping */
  readonly primary_group_id?: number | null

  /** Number of public keys associated with this user */
  readonly public_keys_count?: number | null

  /** Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead. */
  readonly receive_admin_alerts?: boolean | null

  /** Should the user receive site warnings via email? */
  readonly notify_on_all_site_warnings?: boolean | null

  /** Should the user receive sso/scim/ldap configuration/sync failures via email? */
  readonly notify_on_all_sso_failures?: boolean | null

  /** Should the user receive user security events via email? */
  readonly notify_on_all_user_security_events?: boolean | null

  /** Should the user receive pending work failures via email? */
  readonly notify_on_all_pending_work_failures?: boolean | null

  /** Should the user receive siem failures via email? */
  readonly notify_on_all_siem_http_destination_failures?: boolean | null

  /** Should the user receive sync failures via email? */
  readonly notify_on_all_sync_failures?: boolean | null

  /** Should the user receive automation failures via email? */
  readonly notify_on_all_automation_failures?: boolean | null

  /** Should the user receive expectation failures and misses via email? */
  readonly notify_on_all_expectation_failures?: boolean | null

  /**
   * 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require`
   * and `never_require` override the site-wide setting when user-level overrides are allowed.
   */
  readonly require_2fa?: 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null

  /** Require user to login by specified date otherwise it will be disabled. */
  readonly require_login_by?: Files.DateTimeString | null

  /** Is 2fa active for the user? */
  readonly active_2fa?: boolean | null

  /** Is a password change required upon next user login? */
  readonly require_password_change?: boolean | null

  /** Is user's password expired? */
  readonly password_expired?: boolean | null

  /** ID of the internal Group responsible for this Partner User, overriding the Partner default. */
  readonly responsible_group_id?: number | null

  /** ID of the internal User responsible for this Partner User, overriding the Partner default. */
  readonly responsible_user_id?: number | null

  /** Is the user an allowed to view all (non-billing) site configuration for this site? */
  readonly readonly_site_admin?: boolean | null

  /**
   * Can this user access the Web app, Desktop app, SDKs, or REST API? (All of these tools use the API internally, so
   * this is one unified permission set.)
   */
  readonly restapi_permission?: boolean | null

  /** Can the user access the S3-compatible endpoint? Defaults to true. */
  readonly s3_compatible_endpoint_permission?: boolean | null

  /** Does this user manage it's own credentials or is it a shared/bot user? */
  readonly self_managed?: boolean | null

  /** Can the user access with SFTP? */
  readonly sftp_permission?: boolean | null

  /** Is the user an administrator for this site? */
  readonly site_admin?: boolean | null

  /**
   * Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted through
   * Permissions.
   */
  readonly workspace_admin?: boolean | null

  /** Site ID */
  readonly site_id?: number | null

  /** ID of the Workspace the user belongs to. 0 is the Default Workspace. */
  readonly workspace_id?: number | null

  /** Workspace ID the user should land in by default when more than one Workspace is available. */
  readonly default_workspace_id?: number | null

  /** Skip Welcome page in the UI? */
  readonly skip_welcome_screen?: boolean | null

  /** SSL required setting */
  readonly ssl_required?: 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null

  /** SSO (Single Sign On) strategy ID for the user, if applicable. */
  readonly sso_strategy_id?: number | null

  /** Is the user subscribed to the newsletter? */
  readonly subscribe_to_newsletter?: boolean | null

  /** Is this user managed by a SsoStrategy? */
  readonly externally_managed?: boolean | null

  /**
   * Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which can
   * target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
   */
  readonly tags?: string | null

  /** User time zone */
  readonly time_zone?: string | null

  /**
   * Type(s) of 2FA methods in use, for programmatic use. Will be either `sms`, `totp`, `webauthn`, `yubi`, `email`, or
   * multiple values sorted alphabetically and joined by an underscore. Does not specify whether user has more than one
   * of a given method.
   */
  readonly type_of_2fa?: string | null

  /**
   * Type(s) of 2FA methods in use, formatted for displaying in the UI. Unlike `type_of_2fa`, this value will make clear
   * when a user has more than 1 of the same type of method.
   */
  readonly type_of_2fa_for_display?: string | null

  /**
   * If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the
   * filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP
   * applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the
   * Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this path
   * is not applied to the API, Desktop, or Web interface.
   */
  readonly user_root?: string | null

  /**
   * Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner
   * root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other interface.
   */
  readonly user_home?: string | null

  /** Number of days remaining until password expires */
  readonly days_remaining_until_password_expire?: number | null

  /** Password expiration datetime */
  readonly password_expire_at?: Files.DateTimeString | null

  /** An image file for your user avatar. */
  readonly avatar_file?: Attachment

  /** If true, the avatar will be deleted. */
  readonly avatar_delete?: boolean

  /** Used for changing a password on an existing user. */
  readonly change_password?: string

  /** Optional, but if provided, we will ensure that it matches the value sent in `change_password`. */
  readonly change_password_confirmation?: string

  /**
   * Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the
   * Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace
   * Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`,
   * `write`, `list`, `read+write`, `list+write`, or `history`.
   */
  readonly grant_permission?: string

  /** Group ID to associate this user with. */
  readonly group_id?: number

  /**
   * Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login.
   * Supported hash methods are MD5, SHA1, and SHA256.
   */
  readonly imported_password_hash?: string

  /** User password. */
  readonly password?: string

  /** Optional, but if provided, we will ensure that it matches the value sent in `password`. */
  readonly password_confirmation?: string

  /** Signifies that the user has read all the announcements in the UI. */
  readonly announcements_read?: boolean

  /**
   * If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in all
   * other cases.
   */
  readonly clear_2fa?: boolean

  /**
   * Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the
   * partner_id provided.
   */
  readonly convert_to_partner_user?: boolean

  /** User ID */
  getId(): number | null | undefined

  /** User's username */
  getUsername(): string | null | undefined

  /** List of group IDs of which this user is an administrator */
  getAdminGroupIds(): number[] | null | undefined

  /** A list of allowed IPs if applicable.  Newline delimited */
  getAllowedIps(): string | null | undefined

  /** If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead. */
  getAttachmentsPermission(): boolean | null | undefined

  /** Number of API keys associated with this user */
  getApiKeysCount(): number | null | undefined

  /** Scheduled Date/Time at which user will be deactivated */
  getAuthenticateUntil(): Files.DateTimeString | null | undefined

  /** How is this user authenticated? */
  getAuthenticationMethod(): 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | Files.OtherString | null | undefined

  /** URL holding the user's avatar */
  getAvatarUrl(): string | null | undefined

  /** Is this a billable user record? */
  getBillable(): boolean | null | undefined

  /** Allow this user to perform operations on the account, payments, and invoices? */
  getBillingPermission(): boolean | null | undefined

  /** Allow this user to skip site-wide IP blacklists? */
  getBypassSiteAllowedIps(): boolean | null | undefined

  /** Exempt this user from user lifecycle rules? */
  getBypassUserLifecycleRules(): boolean | null | undefined

  /** When this user was created */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Can the user connect with WebDAV? */
  getDavPermission(): boolean | null | undefined

  /**
   * Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically
   * disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
   */
  getDisabled(): boolean | null | undefined

  /** Computed property that returns true if user disabled or expired or inactive. */
  getDisabledExpiredOrInactive(): boolean | null | undefined

  /** AI Assistant Personality ID assigned directly to this user, if any. */
  getAiAssistantPersonalityId(): number | null | undefined

  /** Desktop Configuration Profile ID assigned directly to this user, if any. */
  getDesktopConfigurationProfileId(): number | null | undefined

  /** Integration Centric Profile ID assigned directly to this user, if any. */
  getIntegrationCentricProfileId(): number | null | undefined

  /** User email address */
  getEmail(): string | null | undefined

  /** File system layout */
  getFilesystemLayout(): 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | 'workspace_root' | Files.OtherString | null | undefined

  /** User's first login time */
  getFirstLoginAt(): Files.DateTimeString | null | undefined

  /** Can the user access with FTP/FTPS? */
  getFtpPermission(): boolean | null | undefined

  /** Comma-separated list of group IDs of which this user is a member */
  getGroupIds(): string | null | undefined

  /** Text to display to the user in the header of the UI */
  getHeaderText(): string | null | undefined

  /** Preferred language */
  getLanguage(): string | null | undefined

  /** User's most recent login time via any protocol */
  getLastLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent login time via web */
  getLastWebLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent login time via FTP */
  getLastFtpLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent login time via SFTP */
  getLastSftpLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent login time via WebDAV */
  getLastDavLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent login time via Desktop app */
  getLastDesktopLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent login time via Rest API */
  getLastRestapiLoginAt(): Files.DateTimeString | null | undefined

  /** User's most recent API use time */
  getLastApiUseAt(): Files.DateTimeString | null | undefined

  /**
   * User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or
   * creation
   */
  getLastActiveAt(): Files.DateTimeString | null | undefined

  /** The most recent protocol and cipher used */
  getLastProtocolCipher(): string | null | undefined

  /** Time in the future that the user will no longer be locked out if applicable */
  getLockoutExpires(): Files.DateTimeString | null | undefined

  /** User's full name */
  getName(): string | null | undefined

  /** User's company */
  getCompany(): string | null | undefined

  /** Any internal notes on the user */
  getNotes(): string | null | undefined

  /** Hour of the day at which daily notifications should be sent. Can be in range 0 to 23 */
  getNotificationDailySendTime(): number | null | undefined

  /** Enable integration with Office for the web? */
  getOfficeIntegrationEnabled(): boolean | null | undefined

  /** Is this user a Partner administrator? */
  getPartnerAdmin(): boolean | null | undefined

  /** Partner ID if this user belongs to a Partner */
  getPartnerId(): number | null | undefined

  /** Name of the Partner if this user belongs to a Partner */
  getPartnerName(): string | null | undefined

  /** Last time the user's password was set */
  getPasswordSetAt(): Files.DateTimeString | null | undefined

  /** Number of days to allow user to use the same password */
  getPasswordValidityDays(): number | null | undefined

  /** Primary group ID for Group Admin scoping */
  getPrimaryGroupId(): number | null | undefined

  /** Number of public keys associated with this user */
  getPublicKeysCount(): number | null | undefined

  /** Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead. */
  getReceiveAdminAlerts(): boolean | null | undefined

  /** Should the user receive site warnings via email? */
  getNotifyOnAllSiteWarnings(): boolean | null | undefined

  /** Should the user receive sso/scim/ldap configuration/sync failures via email? */
  getNotifyOnAllSsoFailures(): boolean | null | undefined

  /** Should the user receive user security events via email? */
  getNotifyOnAllUserSecurityEvents(): boolean | null | undefined

  /** Should the user receive pending work failures via email? */
  getNotifyOnAllPendingWorkFailures(): boolean | null | undefined

  /** Should the user receive siem failures via email? */
  getNotifyOnAllSiemHttpDestinationFailures(): boolean | null | undefined

  /** Should the user receive sync failures via email? */
  getNotifyOnAllSyncFailures(): boolean | null | undefined

  /** Should the user receive automation failures via email? */
  getNotifyOnAllAutomationFailures(): boolean | null | undefined

  /** Should the user receive expectation failures and misses via email? */
  getNotifyOnAllExpectationFailures(): boolean | null | undefined

  /**
   * 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require`
   * and `never_require` override the site-wide setting when user-level overrides are allowed.
   */
  getRequire2fa(): 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null | undefined

  /** Require user to login by specified date otherwise it will be disabled. */
  getRequireLoginBy(): Files.DateTimeString | null | undefined

  /** Is 2fa active for the user? */
  getActive2fa(): boolean | null | undefined

  /** Is a password change required upon next user login? */
  getRequirePasswordChange(): boolean | null | undefined

  /** Is user's password expired? */
  getPasswordExpired(): boolean | null | undefined

  /** ID of the internal Group responsible for this Partner User, overriding the Partner default. */
  getResponsibleGroupId(): number | null | undefined

  /** ID of the internal User responsible for this Partner User, overriding the Partner default. */
  getResponsibleUserId(): number | null | undefined

  /** Is the user an allowed to view all (non-billing) site configuration for this site? */
  getReadonlySiteAdmin(): boolean | null | undefined

  /**
   * Can this user access the Web app, Desktop app, SDKs, or REST API? (All of these tools use the API internally, so
   * this is one unified permission set.)
   */
  getRestapiPermission(): boolean | null | undefined

  /** Can the user access the S3-compatible endpoint? Defaults to true. */
  getS3CompatibleEndpointPermission(): boolean | null | undefined

  /** Does this user manage it's own credentials or is it a shared/bot user? */
  getSelfManaged(): boolean | null | undefined

  /** Can the user access with SFTP? */
  getSftpPermission(): boolean | null | undefined

  /** Is the user an administrator for this site? */
  getSiteAdmin(): boolean | null | undefined

  /**
   * Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted through
   * Permissions.
   */
  getWorkspaceAdmin(): boolean | null | undefined

  /** Site ID */
  getSiteId(): number | null | undefined

  /** ID of the Workspace the user belongs to. 0 is the Default Workspace. */
  getWorkspaceId(): number | null | undefined

  /** Workspace ID the user should land in by default when more than one Workspace is available. */
  getDefaultWorkspaceId(): number | null | undefined

  /** Skip Welcome page in the UI? */
  getSkipWelcomeScreen(): boolean | null | undefined

  /** SSL required setting */
  getSslRequired(): 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null | undefined

  /** SSO (Single Sign On) strategy ID for the user, if applicable. */
  getSsoStrategyId(): number | null | undefined

  /** Is the user subscribed to the newsletter? */
  getSubscribeToNewsletter(): boolean | null | undefined

  /** Is this user managed by a SsoStrategy? */
  getExternallyManaged(): boolean | null | undefined

  /**
   * Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which can
   * target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
   */
  getTags(): string | null | undefined

  /** User time zone */
  getTimeZone(): string | null | undefined

  /**
   * Type(s) of 2FA methods in use, for programmatic use. Will be either `sms`, `totp`, `webauthn`, `yubi`, `email`, or
   * multiple values sorted alphabetically and joined by an underscore. Does not specify whether user has more than one
   * of a given method.
   */
  getTypeOf2fa(): string | null | undefined

  /**
   * Type(s) of 2FA methods in use, formatted for displaying in the UI. Unlike `type_of_2fa`, this value will make clear
   * when a user has more than 1 of the same type of method.
   */
  getTypeOf2faForDisplay(): string | null | undefined

  /**
   * If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the
   * filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP
   * applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the
   * Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this path
   * is not applied to the API, Desktop, or Web interface.
   */
  getUserRoot(): string | null | undefined

  /**
   * Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner
   * root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other interface.
   */
  getUserHome(): string | null | undefined

  /** Number of days remaining until password expires */
  getDaysRemainingUntilPasswordExpire(): number | null | undefined

  /** Password expiration datetime */
  getPasswordExpireAt(): Files.DateTimeString | null | undefined

  /** An image file for your user avatar. */
  getAvatarFile(): Attachment | undefined

  /** If true, the avatar will be deleted. */
  getAvatarDelete(): boolean | undefined

  /** Used for changing a password on an existing user. */
  getChangePassword(): string | undefined

  /** Optional, but if provided, we will ensure that it matches the value sent in `change_password`. */
  getChangePasswordConfirmation(): string | undefined

  /**
   * Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the
   * Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace
   * Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`,
   * `write`, `list`, `read+write`, `list+write`, or `history`.
   */
  getGrantPermission(): string | undefined

  /** Group ID to associate this user with. */
  getGroupId(): number | undefined

  /**
   * Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login.
   * Supported hash methods are MD5, SHA1, and SHA256.
   */
  getImportedPasswordHash(): string | undefined

  /** User password. */
  getPassword(): string | undefined

  /** Optional, but if provided, we will ensure that it matches the value sent in `password`. */
  getPasswordConfirmation(): string | undefined

  /** Signifies that the user has read all the announcements in the UI. */
  getAnnouncementsRead(): boolean | undefined

  /**
   * If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in all
   * other cases.
   */
  getClear2fa(): boolean | undefined

  /**
   * Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the
   * partner_id provided.
   */
  getConvertToPartnerUser(): boolean | undefined

  /** User ID */
  setId(value: number): void

  /** User's username */
  setUsername(value: string): void

  /** List of group IDs of which this user is an administrator */
  setAdminGroupIds(value: number[]): void

  /** A list of allowed IPs if applicable.  Newline delimited */
  setAllowedIps(value: string): void

  /** If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead. */
  setAttachmentsPermission(value: boolean): void

  /** Number of API keys associated with this user */
  setApiKeysCount(value: number): void

  /** Scheduled Date/Time at which user will be deactivated */
  setAuthenticateUntil(value: Files.DateTimeString): void

  /** How is this user authenticated? */
  setAuthenticationMethod(value: 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key'): void

  /** URL holding the user's avatar */
  setAvatarUrl(value: string): void

  /** Is this a billable user record? */
  setBillable(value: boolean): void

  /** Allow this user to perform operations on the account, payments, and invoices? */
  setBillingPermission(value: boolean): void

  /** Allow this user to skip site-wide IP blacklists? */
  setBypassSiteAllowedIps(value: boolean): void

  /** Exempt this user from user lifecycle rules? */
  setBypassUserLifecycleRules(value: boolean): void

  /** Can the user connect with WebDAV? */
  setDavPermission(value: boolean): void

  /**
   * Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically
   * disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
   */
  setDisabled(value: boolean): void

  /** Computed property that returns true if user disabled or expired or inactive. */
  setDisabledExpiredOrInactive(value: boolean): void

  /** AI Assistant Personality ID assigned directly to this user, if any. */
  setAiAssistantPersonalityId(value: number): void

  /** Desktop Configuration Profile ID assigned directly to this user, if any. */
  setDesktopConfigurationProfileId(value: number): void

  /** Integration Centric Profile ID assigned directly to this user, if any. */
  setIntegrationCentricProfileId(value: number): void

  /** User email address */
  setEmail(value: string): void

  /** File system layout */
  setFilesystemLayout(value: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | 'workspace_root'): void

  /** User's first login time */
  setFirstLoginAt(value: Files.DateTimeString): void

  /** Can the user access with FTP/FTPS? */
  setFtpPermission(value: boolean): void

  /** Comma-separated list of group IDs of which this user is a member */
  setGroupIds(value: string): void

  /** Text to display to the user in the header of the UI */
  setHeaderText(value: string): void

  /** Preferred language */
  setLanguage(value: string): void

  /** User's most recent login time via any protocol */
  setLastLoginAt(value: Files.DateTimeString): void

  /** User's most recent login time via web */
  setLastWebLoginAt(value: Files.DateTimeString): void

  /** User's most recent login time via FTP */
  setLastFtpLoginAt(value: Files.DateTimeString): void

  /** User's most recent login time via SFTP */
  setLastSftpLoginAt(value: Files.DateTimeString): void

  /** User's most recent login time via WebDAV */
  setLastDavLoginAt(value: Files.DateTimeString): void

  /** User's most recent login time via Desktop app */
  setLastDesktopLoginAt(value: Files.DateTimeString): void

  /** User's most recent login time via Rest API */
  setLastRestapiLoginAt(value: Files.DateTimeString): void

  /** User's most recent API use time */
  setLastApiUseAt(value: Files.DateTimeString): void

  /**
   * User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or
   * creation
   */
  setLastActiveAt(value: Files.DateTimeString): void

  /** The most recent protocol and cipher used */
  setLastProtocolCipher(value: string): void

  /** Time in the future that the user will no longer be locked out if applicable */
  setLockoutExpires(value: Files.DateTimeString): void

  /** User's full name */
  setName(value: string): void

  /** User's company */
  setCompany(value: string): void

  /** Any internal notes on the user */
  setNotes(value: string): void

  /** Hour of the day at which daily notifications should be sent. Can be in range 0 to 23 */
  setNotificationDailySendTime(value: number): void

  /** Enable integration with Office for the web? */
  setOfficeIntegrationEnabled(value: boolean): void

  /** Is this user a Partner administrator? */
  setPartnerAdmin(value: boolean): void

  /** Partner ID if this user belongs to a Partner */
  setPartnerId(value: number): void

  /** Name of the Partner if this user belongs to a Partner */
  setPartnerName(value: string): void

  /** Last time the user's password was set */
  setPasswordSetAt(value: Files.DateTimeString): void

  /** Number of days to allow user to use the same password */
  setPasswordValidityDays(value: number): void

  /** Primary group ID for Group Admin scoping */
  setPrimaryGroupId(value: number): void

  /** Number of public keys associated with this user */
  setPublicKeysCount(value: number): void

  /** Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead. */
  setReceiveAdminAlerts(value: boolean): void

  /** Should the user receive site warnings via email? */
  setNotifyOnAllSiteWarnings(value: boolean): void

  /** Should the user receive sso/scim/ldap configuration/sync failures via email? */
  setNotifyOnAllSsoFailures(value: boolean): void

  /** Should the user receive user security events via email? */
  setNotifyOnAllUserSecurityEvents(value: boolean): void

  /** Should the user receive pending work failures via email? */
  setNotifyOnAllPendingWorkFailures(value: boolean): void

  /** Should the user receive siem failures via email? */
  setNotifyOnAllSiemHttpDestinationFailures(value: boolean): void

  /** Should the user receive sync failures via email? */
  setNotifyOnAllSyncFailures(value: boolean): void

  /** Should the user receive automation failures via email? */
  setNotifyOnAllAutomationFailures(value: boolean): void

  /** Should the user receive expectation failures and misses via email? */
  setNotifyOnAllExpectationFailures(value: boolean): void

  /**
   * 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require`
   * and `never_require` override the site-wide setting when user-level overrides are allowed.
   */
  setRequire2fa(value: 'use_system_setting' | 'always_require' | 'never_require'): void

  /** Require user to login by specified date otherwise it will be disabled. */
  setRequireLoginBy(value: Files.DateTimeString): void

  /** Is 2fa active for the user? */
  setActive2fa(value: boolean): void

  /** Is a password change required upon next user login? */
  setRequirePasswordChange(value: boolean): void

  /** Is user's password expired? */
  setPasswordExpired(value: boolean): void

  /** ID of the internal Group responsible for this Partner User, overriding the Partner default. */
  setResponsibleGroupId(value: number): void

  /** ID of the internal User responsible for this Partner User, overriding the Partner default. */
  setResponsibleUserId(value: number): void

  /** Is the user an allowed to view all (non-billing) site configuration for this site? */
  setReadonlySiteAdmin(value: boolean): void

  /**
   * Can this user access the Web app, Desktop app, SDKs, or REST API? (All of these tools use the API internally, so
   * this is one unified permission set.)
   */
  setRestapiPermission(value: boolean): void

  /** Can the user access the S3-compatible endpoint? Defaults to true. */
  setS3CompatibleEndpointPermission(value: boolean): void

  /** Does this user manage it's own credentials or is it a shared/bot user? */
  setSelfManaged(value: boolean): void

  /** Can the user access with SFTP? */
  setSftpPermission(value: boolean): void

  /** Is the user an administrator for this site? */
  setSiteAdmin(value: boolean): void

  /**
   * Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted through
   * Permissions.
   */
  setWorkspaceAdmin(value: boolean): void

  /** Site ID */
  setSiteId(value: number): void

  /** ID of the Workspace the user belongs to. 0 is the Default Workspace. */
  setWorkspaceId(value: number): void

  /** Workspace ID the user should land in by default when more than one Workspace is available. */
  setDefaultWorkspaceId(value: number): void

  /** Skip Welcome page in the UI? */
  setSkipWelcomeScreen(value: boolean): void

  /** SSL required setting */
  setSslRequired(value: 'use_system_setting' | 'always_require' | 'never_require'): void

  /** SSO (Single Sign On) strategy ID for the user, if applicable. */
  setSsoStrategyId(value: number): void

  /** Is the user subscribed to the newsletter? */
  setSubscribeToNewsletter(value: boolean): void

  /** Is this user managed by a SsoStrategy? */
  setExternallyManaged(value: boolean): void

  /**
   * Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which can
   * target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
   */
  setTags(value: string): void

  /** User time zone */
  setTimeZone(value: string): void

  /**
   * Type(s) of 2FA methods in use, for programmatic use. Will be either `sms`, `totp`, `webauthn`, `yubi`, `email`, or
   * multiple values sorted alphabetically and joined by an underscore. Does not specify whether user has more than one
   * of a given method.
   */
  setTypeOf2fa(value: string): void

  /**
   * Type(s) of 2FA methods in use, formatted for displaying in the UI. Unlike `type_of_2fa`, this value will make clear
   * when a user has more than 1 of the same type of method.
   */
  setTypeOf2faForDisplay(value: string): void

  /**
   * If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the
   * filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP
   * applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the
   * Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this path
   * is not applied to the API, Desktop, or Web interface.
   */
  setUserRoot(value: string): void

  /**
   * Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner
   * root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other interface.
   */
  setUserHome(value: string): void

  /** Number of days remaining until password expires */
  setDaysRemainingUntilPasswordExpire(value: number): void

  /** Password expiration datetime */
  setPasswordExpireAt(value: Files.DateTimeString): void

  /** An image file for your user avatar. */
  setAvatarFile(value: Attachment): void

  /** If true, the avatar will be deleted. */
  setAvatarDelete(value: boolean): void

  /** Used for changing a password on an existing user. */
  setChangePassword(value: string): void

  /** Optional, but if provided, we will ensure that it matches the value sent in `change_password`. */
  setChangePasswordConfirmation(value: string): void

  /**
   * Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the
   * Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace
   * Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`,
   * `write`, `list`, `read+write`, `list+write`, or `history`.
   */
  setGrantPermission(value: string): void

  /** Group ID to associate this user with. */
  setGroupId(value: number): void

  /**
   * Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login.
   * Supported hash methods are MD5, SHA1, and SHA256.
   */
  setImportedPasswordHash(value: string): void

  /** User password. */
  setPassword(value: string): void

  /** Optional, but if provided, we will ensure that it matches the value sent in `password`. */
  setPasswordConfirmation(value: string): void

  /** Signifies that the user has read all the announcements in the UI. */
  setAnnouncementsRead(value: boolean): void

  /**
   * If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in all
   * other cases.
   */
  setClear2fa(value: boolean): void

  /**
   * Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the
   * partner_id provided.
   */
  setConvertToPartnerUser(value: boolean): void

  /** Unlock user who has been locked out due to failed logins */
  unlock(params?: Files.NoParams): Promise<void>

  /** Resend user welcome email */
  resendWelcomeEmail(params?: Files.NoParams): Promise<void>

  /** Trigger 2FA Reset process for user who has lost access to their existing 2FA methods */
  user2faReset(params?: Files.NoParams): Promise<void>

  /** Update User */
  update(params?: User.UpdateParams): Promise<this>

  /** Delete User */
  delete(params?: User.DeleteParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: User.DeleteParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Users */
  static list(params?: User.ListParams, options?: Files.RequestOptions): Promise<User[]>

  /** Alias of `list()`. */
  static all(params?: User.ListParams, options?: Files.RequestOptions): Promise<User[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: User.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<User>

  /**
   * Show User
   * @param id - User ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<User>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<User>

  /** Create User */
  static create(params: User.CreateParams, options?: Files.RequestOptions): Promise<User>
}

declare namespace User {
  /** The fields of `User` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** User ID */
    id?: number | null

    /** User's username */
    username?: string | null

    /** List of group IDs of which this user is an administrator */
    admin_group_ids?: number[] | null

    /** A list of allowed IPs if applicable.  Newline delimited */
    allowed_ips?: string | null

    /** If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead. */
    attachments_permission?: boolean | null

    /** Number of API keys associated with this user */
    api_keys_count?: number | null

    /** Scheduled Date/Time at which user will be deactivated */
    authenticate_until?: Files.DateTimeString | null

    /** How is this user authenticated? */
    authentication_method?: 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | Files.OtherString | null

    /** URL holding the user's avatar */
    avatar_url?: string | null

    /** Is this a billable user record? */
    billable?: boolean | null

    /** Allow this user to perform operations on the account, payments, and invoices? */
    billing_permission?: boolean | null

    /** Allow this user to skip site-wide IP blacklists? */
    bypass_site_allowed_ips?: boolean | null

    /** Exempt this user from user lifecycle rules? */
    bypass_user_lifecycle_rules?: boolean | null

    /** When this user was created */
    created_at?: Files.DateTimeString | null

    /** Can the user connect with WebDAV? */
    dav_permission?: boolean | null

    /**
     * Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically
     * disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
     */
    disabled?: boolean | null

    /** Computed property that returns true if user disabled or expired or inactive. */
    disabled_expired_or_inactive?: boolean | null

    /** AI Assistant Personality ID assigned directly to this user, if any. */
    ai_assistant_personality_id?: number | null

    /** Desktop Configuration Profile ID assigned directly to this user, if any. */
    desktop_configuration_profile_id?: number | null

    /** Integration Centric Profile ID assigned directly to this user, if any. */
    integration_centric_profile_id?: number | null

    /** User email address */
    email?: string | null

    /** File system layout */
    filesystem_layout?: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | 'workspace_root' | Files.OtherString | null

    /** User's first login time */
    first_login_at?: Files.DateTimeString | null

    /** Can the user access with FTP/FTPS? */
    ftp_permission?: boolean | null

    /** Comma-separated list of group IDs of which this user is a member */
    group_ids?: string | null

    /** Text to display to the user in the header of the UI */
    header_text?: string | null

    /** Preferred language */
    language?: string | null

    /** User's most recent login time via any protocol */
    last_login_at?: Files.DateTimeString | null

    /** User's most recent login time via web */
    last_web_login_at?: Files.DateTimeString | null

    /** User's most recent login time via FTP */
    last_ftp_login_at?: Files.DateTimeString | null

    /** User's most recent login time via SFTP */
    last_sftp_login_at?: Files.DateTimeString | null

    /** User's most recent login time via WebDAV */
    last_dav_login_at?: Files.DateTimeString | null

    /** User's most recent login time via Desktop app */
    last_desktop_login_at?: Files.DateTimeString | null

    /** User's most recent login time via Rest API */
    last_restapi_login_at?: Files.DateTimeString | null

    /** User's most recent API use time */
    last_api_use_at?: Files.DateTimeString | null

    /**
     * User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or
     * creation
     */
    last_active_at?: Files.DateTimeString | null

    /** The most recent protocol and cipher used */
    last_protocol_cipher?: string | null

    /** Time in the future that the user will no longer be locked out if applicable */
    lockout_expires?: Files.DateTimeString | null

    /** User's full name */
    name?: string | null

    /** User's company */
    company?: string | null

    /** Any internal notes on the user */
    notes?: string | null

    /** Hour of the day at which daily notifications should be sent. Can be in range 0 to 23 */
    notification_daily_send_time?: number | null

    /** Enable integration with Office for the web? */
    office_integration_enabled?: boolean | null

    /** Is this user a Partner administrator? */
    partner_admin?: boolean | null

    /** Partner ID if this user belongs to a Partner */
    partner_id?: number | null

    /** Name of the Partner if this user belongs to a Partner */
    partner_name?: string | null

    /** Last time the user's password was set */
    password_set_at?: Files.DateTimeString | null

    /** Number of days to allow user to use the same password */
    password_validity_days?: number | null

    /** Primary group ID for Group Admin scoping */
    primary_group_id?: number | null

    /** Number of public keys associated with this user */
    public_keys_count?: number | null

    /** Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead. */
    receive_admin_alerts?: boolean | null

    /** Should the user receive site warnings via email? */
    notify_on_all_site_warnings?: boolean | null

    /** Should the user receive sso/scim/ldap configuration/sync failures via email? */
    notify_on_all_sso_failures?: boolean | null

    /** Should the user receive user security events via email? */
    notify_on_all_user_security_events?: boolean | null

    /** Should the user receive pending work failures via email? */
    notify_on_all_pending_work_failures?: boolean | null

    /** Should the user receive siem failures via email? */
    notify_on_all_siem_http_destination_failures?: boolean | null

    /** Should the user receive sync failures via email? */
    notify_on_all_sync_failures?: boolean | null

    /** Should the user receive automation failures via email? */
    notify_on_all_automation_failures?: boolean | null

    /** Should the user receive expectation failures and misses via email? */
    notify_on_all_expectation_failures?: boolean | null

    /**
     * 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require`
     * and `never_require` override the site-wide setting when user-level overrides are allowed.
     */
    require_2fa?: 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null

    /** Require user to login by specified date otherwise it will be disabled. */
    require_login_by?: Files.DateTimeString | null

    /** Is 2fa active for the user? */
    active_2fa?: boolean | null

    /** Is a password change required upon next user login? */
    require_password_change?: boolean | null

    /** Is user's password expired? */
    password_expired?: boolean | null

    /** ID of the internal Group responsible for this Partner User, overriding the Partner default. */
    responsible_group_id?: number | null

    /** ID of the internal User responsible for this Partner User, overriding the Partner default. */
    responsible_user_id?: number | null

    /** Is the user an allowed to view all (non-billing) site configuration for this site? */
    readonly_site_admin?: boolean | null

    /**
     * Can this user access the Web app, Desktop app, SDKs, or REST API? (All of these tools use the API internally, so
     * this is one unified permission set.)
     */
    restapi_permission?: boolean | null

    /** Can the user access the S3-compatible endpoint? Defaults to true. */
    s3_compatible_endpoint_permission?: boolean | null

    /** Does this user manage it's own credentials or is it a shared/bot user? */
    self_managed?: boolean | null

    /** Can the user access with SFTP? */
    sftp_permission?: boolean | null

    /** Is the user an administrator for this site? */
    site_admin?: boolean | null

    /**
     * Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted
     * through Permissions.
     */
    workspace_admin?: boolean | null

    /** Site ID */
    site_id?: number | null

    /** ID of the Workspace the user belongs to. 0 is the Default Workspace. */
    workspace_id?: number | null

    /** Workspace ID the user should land in by default when more than one Workspace is available. */
    default_workspace_id?: number | null

    /** Skip Welcome page in the UI? */
    skip_welcome_screen?: boolean | null

    /** SSL required setting */
    ssl_required?: 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null

    /** SSO (Single Sign On) strategy ID for the user, if applicable. */
    sso_strategy_id?: number | null

    /** Is the user subscribed to the newsletter? */
    subscribe_to_newsletter?: boolean | null

    /** Is this user managed by a SsoStrategy? */
    externally_managed?: boolean | null

    /**
     * Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which
     * can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
     */
    tags?: string | null

    /** User time zone */
    time_zone?: string | null

    /**
     * Type(s) of 2FA methods in use, for programmatic use. Will be either `sms`, `totp`, `webauthn`, `yubi`, `email`,
     * or multiple values sorted alphabetically and joined by an underscore. Does not specify whether user has more than
     * one of a given method.
     */
    type_of_2fa?: string | null

    /**
     * Type(s) of 2FA methods in use, formatted for displaying in the UI. Unlike `type_of_2fa`, this value will make
     * clear when a user has more than 1 of the same type of method.
     */
    type_of_2fa_for_display?: string | null

    /**
     * If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the
     * filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP
     * applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the
     * Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this
     * path is not applied to the API, Desktop, or Web interface.
     */
    user_root?: string | null

    /**
     * Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner
     * root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other
     * interface.
     */
    user_home?: string | null

    /** Number of days remaining until password expires */
    days_remaining_until_password_expire?: number | null

    /** Password expiration datetime */
    password_expire_at?: Files.DateTimeString | null

    /** An image file for your user avatar. */
    avatar_file?: Attachment

    /** If true, the avatar will be deleted. */
    avatar_delete?: boolean

    /** Used for changing a password on an existing user. */
    change_password?: string

    /** Optional, but if provided, we will ensure that it matches the value sent in `change_password`. */
    change_password_confirmation?: string

    /**
     * Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the
     * Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace
     * Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`,
     * `write`, `list`, `read+write`, `list+write`, or `history`.
     */
    grant_permission?: string

    /** Group ID to associate this user with. */
    group_id?: number

    /**
     * Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first
     * login. Supported hash methods are MD5, SHA1, and SHA256.
     */
    imported_password_hash?: string

    /** User password. */
    password?: string

    /** Optional, but if provided, we will ensure that it matches the value sent in `password`. */
    password_confirmation?: string

    /** Signifies that the user has read all the announcements in the UI. */
    announcements_read?: boolean

    /**
     * If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in
     * all other cases.
     */
    clear_2fa?: boolean

    /**
     * Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the
     * partner_id provided.
     */
    convert_to_partner_user?: boolean
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

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`,
     * `workspace_id`, `company`, `name`, `disabled`, `authenticate_until`, `username`, `email`, `site_admin`,
     * `last_desktop_login_at`, `last_login_at`, `password_validity_days` or `ssl_required`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `username`,
     * `name`, `email`, `company`, `site_admin`, `password_validity_days`, `ssl_required`, `last_login_at`,
     * `authenticate_until`, `not_site_admin`, `disabled`, `partner_id`, `primary_group_id` or `workspace_id`. Valid
     * field combinations are `[ site_admin, username ]`, `[ not_site_admin, username ]`, `[ workspace_id, username ]`,
     * `[ company, name ]`, `[ workspace_id, name ]`, `[ workspace_id, email ]`, `[ workspace_id, company ]`, `[
     * workspace_id, site_admin ]`, `[ workspace_id, not_site_admin ]`, `[ workspace_id, disabled ]`, `[ workspace_id,
     * partner_id ]`, `[ workspace_id, site_admin, username ]`, `[ workspace_id, not_site_admin, username ]`, `[
     * workspace_id, disabled, username ]`, `[ workspace_id, partner_id, username ]` or `[ workspace_id, company, name
     * ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `password_validity_days`, `last_login_at` or `authenticate_until`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `password_validity_days`, `last_login_at` or `authenticate_until`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `username`,
     * `name`, `email` or `company`. Valid field combinations are `[ company, name ]`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are
     * `password_validity_days`, `last_login_at` or `authenticate_until`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `password_validity_days`, `last_login_at` or `authenticate_until`.
     */
    filter_lteq?: Files.JsonObject

    /** comma-separated list of User IDs */
    ids?: string

    /** Include users from the parent site. */
    include_parent_site_users?: boolean

    /**
     * When scoped to a Custom Workspace, include Default Workspace users who have permissions in that Workspace.
     * Available to Site Administrators, and to Workspace Administrators and Folder Admins in that Workspace when the
     * site shares its Default Workspace directory with Workspaces.
     */
    include_default_workspace_users?: boolean

    /** Searches for partial matches of name, username, or email. */
    search?: string
  }

  interface CreateParams {
    /** An image file for your user avatar. */
    avatar_file?: Attachment

    /** If true, the avatar will be deleted. */
    avatar_delete?: boolean

    /** Used for changing a password on an existing user. */
    change_password?: string

    /** Optional, but if provided, we will ensure that it matches the value sent in `change_password`. */
    change_password_confirmation?: string

    /** User's email. */
    email?: string

    /**
     * Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the
     * Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace
     * Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`,
     * `write`, `list`, `read+write`, `list+write`, or `history`.
     */
    grant_permission?: string

    /** Group ID to associate this user with. */
    group_id?: number

    /** A list of group ids to associate this user with.  Comma delimited. */
    group_ids?: string

    /**
     * Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first
     * login. Supported hash methods are MD5, SHA1, and SHA256.
     */
    imported_password_hash?: string

    /** User password. */
    password?: string

    /** Optional, but if provided, we will ensure that it matches the value sent in `password`. */
    password_confirmation?: string

    /** Signifies that the user has read all the announcements in the UI. */
    announcements_read?: boolean

    /** AI Assistant Personality ID assigned directly to this user, if any. */
    ai_assistant_personality_id?: number

    /** A list of allowed IPs if applicable.  Newline delimited */
    allowed_ips?: string

    /** DEPRECATED: If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead. */
    attachments_permission?: boolean

    /** Scheduled Date/Time at which user will be deactivated */
    authenticate_until?: Files.DateTimeString

    /** How is this user authenticated? */
    authentication_method?: 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key'

    /** Allow this user to perform operations on the account, payments, and invoices? */
    billing_permission?: boolean

    /** Exempt this user from user lifecycle rules? */
    bypass_user_lifecycle_rules?: boolean

    /** Allow this user to skip site-wide IP blacklists? */
    bypass_site_allowed_ips?: boolean

    /** Can the user connect with WebDAV? */
    dav_permission?: boolean

    /** Desktop Configuration Profile ID assigned directly to this user, if any. */
    desktop_configuration_profile_id?: number

    /** Workspace ID the user should land in by default when more than one Workspace is available. */
    default_workspace_id?: number

    /**
     * Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically
     * disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
     */
    disabled?: boolean

    /** File system layout */
    filesystem_layout?: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | 'workspace_root'

    /** Can the user access with FTP/FTPS? */
    ftp_permission?: boolean

    /** Text to display to the user in the header of the UI */
    header_text?: string

    /** Integration Centric Profile ID assigned directly to this user, if any. */
    integration_centric_profile_id?: number

    /** Preferred language */
    language?: string

    /** Hour of the day at which daily notifications should be sent. Can be in range 0 to 23 */
    notification_daily_send_time?: number

    /** User's full name */
    name?: string

    /** User's company */
    company?: string

    /** Any internal notes on the user */
    notes?: string

    /** Enable integration with Office for the web? */
    office_integration_enabled?: boolean

    /** Is this user a Partner administrator? */
    partner_admin?: boolean

    /** Partner ID if this user belongs to a Partner */
    partner_id?: number

    /** Number of days to allow user to use the same password */
    password_validity_days?: number

    /** Primary group ID for Group Admin scoping */
    primary_group_id?: number

    /** Is the user an allowed to view all (non-billing) site configuration for this site? */
    readonly_site_admin?: boolean

    /** Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead. */
    receive_admin_alerts?: boolean

    /** Should the user receive site warnings via email? */
    notify_on_all_site_warnings?: boolean

    /** Should the user receive sso/scim/ldap configuration/sync failures via email? */
    notify_on_all_sso_failures?: boolean

    /** Should the user receive user security events via email? */
    notify_on_all_user_security_events?: boolean

    /** Should the user receive pending work failures via email? */
    notify_on_all_pending_work_failures?: boolean

    /** Should the user receive siem failures via email? */
    notify_on_all_siem_http_destination_failures?: boolean

    /** Should the user receive sync failures via email? */
    notify_on_all_sync_failures?: boolean

    /** Should the user receive automation failures via email? */
    notify_on_all_automation_failures?: boolean

    /** Should the user receive expectation failures and misses via email? */
    notify_on_all_expectation_failures?: boolean

    /** Require user to login by specified date otherwise it will be disabled. */
    require_login_by?: Files.DateTimeString

    /** Is a password change required upon next user login? */
    require_password_change?: boolean

    /** ID of the internal Group responsible for this Partner User, overriding the Partner default. */
    responsible_group_id?: number

    /** ID of the internal User responsible for this Partner User, overriding the Partner default. */
    responsible_user_id?: number

    /**
     * Can this user access the Web app, Desktop app, SDKs, or REST API? (All of these tools use the API internally, so
     * this is one unified permission set.)
     */
    restapi_permission?: boolean

    /** Can the user access the S3-compatible endpoint? Defaults to true. */
    s3_compatible_endpoint_permission?: boolean

    /** Does this user manage it's own credentials or is it a shared/bot user? */
    self_managed?: boolean

    /** Can the user access with SFTP? */
    sftp_permission?: boolean

    /** Is the user an administrator for this site? */
    site_admin?: boolean

    /** Skip Welcome page in the UI? */
    skip_welcome_screen?: boolean

    /** SSL required setting */
    ssl_required?: 'use_system_setting' | 'always_require' | 'never_require'

    /** SSO (Single Sign On) strategy ID for the user, if applicable. */
    sso_strategy_id?: number

    /** Is the user subscribed to the newsletter? */
    subscribe_to_newsletter?: boolean

    /**
     * 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require`
     * and `never_require` override the site-wide setting when user-level overrides are allowed.
     */
    require_2fa?: 'use_system_setting' | 'always_require' | 'never_require'

    /**
     * Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which
     * can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
     */
    tags?: string

    /** User time zone */
    time_zone?: string

    /**
     * If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the
     * filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP
     * applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the
     * Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this
     * path is not applied to the API, Desktop, or Web interface.
     */
    user_root?: string

    /**
     * Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner
     * root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other
     * interface.
     */
    user_home?: string

    /**
     * Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted
     * through Permissions.
     */
    workspace_admin?: boolean

    /** User's username */
    username: string

    /** ID of the Workspace the user belongs to. 0 is the Default Workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** An image file for your user avatar. */
    avatar_file?: Attachment

    /** If true, the avatar will be deleted. */
    avatar_delete?: boolean

    /** Used for changing a password on an existing user. */
    change_password?: string

    /** Optional, but if provided, we will ensure that it matches the value sent in `change_password`. */
    change_password_confirmation?: string

    /** User's email. */
    email?: string

    /**
     * Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the
     * Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace
     * Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`,
     * `write`, `list`, `read+write`, `list+write`, or `history`.
     */
    grant_permission?: string

    /** Group ID to associate this user with. */
    group_id?: number

    /** A list of group ids to associate this user with.  Comma delimited. */
    group_ids?: string

    /**
     * Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first
     * login. Supported hash methods are MD5, SHA1, and SHA256.
     */
    imported_password_hash?: string

    /** User password. */
    password?: string

    /** Optional, but if provided, we will ensure that it matches the value sent in `password`. */
    password_confirmation?: string

    /** Signifies that the user has read all the announcements in the UI. */
    announcements_read?: boolean

    /** AI Assistant Personality ID assigned directly to this user, if any. */
    ai_assistant_personality_id?: number

    /** A list of allowed IPs if applicable.  Newline delimited */
    allowed_ips?: string

    /** DEPRECATED: If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead. */
    attachments_permission?: boolean

    /** Scheduled Date/Time at which user will be deactivated */
    authenticate_until?: Files.DateTimeString

    /** How is this user authenticated? */
    authentication_method?: 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key'

    /** Allow this user to perform operations on the account, payments, and invoices? */
    billing_permission?: boolean

    /** Exempt this user from user lifecycle rules? */
    bypass_user_lifecycle_rules?: boolean

    /** Allow this user to skip site-wide IP blacklists? */
    bypass_site_allowed_ips?: boolean

    /** Can the user connect with WebDAV? */
    dav_permission?: boolean

    /** Desktop Configuration Profile ID assigned directly to this user, if any. */
    desktop_configuration_profile_id?: number

    /** Workspace ID the user should land in by default when more than one Workspace is available. */
    default_workspace_id?: number

    /**
     * Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically
     * disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
     */
    disabled?: boolean

    /** File system layout */
    filesystem_layout?: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | 'workspace_root'

    /** Can the user access with FTP/FTPS? */
    ftp_permission?: boolean

    /** Text to display to the user in the header of the UI */
    header_text?: string

    /** Integration Centric Profile ID assigned directly to this user, if any. */
    integration_centric_profile_id?: number

    /** Preferred language */
    language?: string

    /** Hour of the day at which daily notifications should be sent. Can be in range 0 to 23 */
    notification_daily_send_time?: number

    /** User's full name */
    name?: string

    /** User's company */
    company?: string

    /** Any internal notes on the user */
    notes?: string

    /** Enable integration with Office for the web? */
    office_integration_enabled?: boolean

    /** Is this user a Partner administrator? */
    partner_admin?: boolean

    /** Partner ID if this user belongs to a Partner */
    partner_id?: number

    /** Number of days to allow user to use the same password */
    password_validity_days?: number

    /** Primary group ID for Group Admin scoping */
    primary_group_id?: number

    /** Is the user an allowed to view all (non-billing) site configuration for this site? */
    readonly_site_admin?: boolean

    /** Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead. */
    receive_admin_alerts?: boolean

    /** Should the user receive site warnings via email? */
    notify_on_all_site_warnings?: boolean

    /** Should the user receive sso/scim/ldap configuration/sync failures via email? */
    notify_on_all_sso_failures?: boolean

    /** Should the user receive user security events via email? */
    notify_on_all_user_security_events?: boolean

    /** Should the user receive pending work failures via email? */
    notify_on_all_pending_work_failures?: boolean

    /** Should the user receive siem failures via email? */
    notify_on_all_siem_http_destination_failures?: boolean

    /** Should the user receive sync failures via email? */
    notify_on_all_sync_failures?: boolean

    /** Should the user receive automation failures via email? */
    notify_on_all_automation_failures?: boolean

    /** Should the user receive expectation failures and misses via email? */
    notify_on_all_expectation_failures?: boolean

    /** Require user to login by specified date otherwise it will be disabled. */
    require_login_by?: Files.DateTimeString

    /** Is a password change required upon next user login? */
    require_password_change?: boolean

    /** ID of the internal Group responsible for this Partner User, overriding the Partner default. */
    responsible_group_id?: number

    /** ID of the internal User responsible for this Partner User, overriding the Partner default. */
    responsible_user_id?: number

    /**
     * Can this user access the Web app, Desktop app, SDKs, or REST API? (All of these tools use the API internally, so
     * this is one unified permission set.)
     */
    restapi_permission?: boolean

    /** Can the user access the S3-compatible endpoint? Defaults to true. */
    s3_compatible_endpoint_permission?: boolean

    /** Does this user manage it's own credentials or is it a shared/bot user? */
    self_managed?: boolean

    /** Can the user access with SFTP? */
    sftp_permission?: boolean

    /** Is the user an administrator for this site? */
    site_admin?: boolean

    /** Skip Welcome page in the UI? */
    skip_welcome_screen?: boolean

    /** SSL required setting */
    ssl_required?: 'use_system_setting' | 'always_require' | 'never_require'

    /** SSO (Single Sign On) strategy ID for the user, if applicable. */
    sso_strategy_id?: number

    /** Is the user subscribed to the newsletter? */
    subscribe_to_newsletter?: boolean

    /**
     * 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require`
     * and `never_require` override the site-wide setting when user-level overrides are allowed.
     */
    require_2fa?: 'use_system_setting' | 'always_require' | 'never_require'

    /**
     * Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which
     * can target specific tags. Tags must only contain lowercase letters, numbers, and hyphens.
     */
    tags?: string

    /** User time zone */
    time_zone?: string

    /**
     * If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the
     * filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP
     * applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the
     * Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this
     * path is not applied to the API, Desktop, or Web interface.
     */
    user_root?: string

    /**
     * Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner
     * root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other
     * interface.
     */
    user_home?: string

    /**
     * Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted
     * through Permissions.
     */
    workspace_admin?: boolean

    /** User's username */
    username?: string

    /**
     * Workspace ID. Only Site Administrators can change this field. Values supplied by Workspace Administrators, Group
     * Administrators, or other non-Site Administrators using `/user` are ignored.
     */
    workspace_id?: number

    /**
     * If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in
     * all other cases.
     */
    clear_2fa?: boolean

    /**
     * Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the
     * partner_id provided.
     */
    convert_to_partner_user?: boolean
  }

  interface DeleteParams {
    /**
     * Provide a User ID here to transfer ownership of certain resources such as Automations and Share Links (Bundles)
     * to that new user.
     */
    new_owner_id?: number
  }
}

export default User
