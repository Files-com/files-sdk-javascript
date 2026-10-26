import Files = require('../Files')
import Attachment = require('../Attachment')
import Image = require('./Image')
import Session = require('./Session')
import UsageSnapshot = require('./UsageSnapshot')
import User = require('./User')

/** A Site is the place you'll come to update site settings, as well as manage site-wide API keys. */
declare class Site {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Site.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Site.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Site Id */
  readonly id?: number | null

  /** Site name */
  readonly name?: string | null

  /** Additional extensions that are considered text files */
  readonly additional_text_file_types?: string[] | null

  /**
   * Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins, and
   * all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group in
   * group_ids get access regardless of the other options. All availability options are additive: any enabled option
   * matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this site, from
   * any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not affect other
   * options. Disabling all AI features overrides these settings.
   */
  readonly ai_feature_availability?: Files.JsonObject | null

  /** Is SMS two factor authentication allowed? */
  readonly allowed_2fa_method_sms?: boolean | null

  /** Is TOTP two factor authentication allowed? */
  readonly allowed_2fa_method_totp?: boolean | null

  /** Is WebAuthn two factor authentication allowed? */
  readonly allowed_2fa_method_webauthn?: boolean | null

  /** Is yubikey two factor authentication allowed? */
  readonly allowed_2fa_method_yubi?: boolean | null

  /** Is OTP via email two factor authentication allowed? */
  readonly allowed_2fa_method_email?: boolean | null

  /** Is OTP via static codes for two factor authentication allowed? */
  readonly allowed_2fa_method_static?: boolean | null

  /** Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV? */
  readonly allowed_2fa_method_bypass_for_ftp_sftp_dav?: boolean | null

  /** User ID for the main site administrator */
  readonly admin_user_id?: number | null

  /** Allow admins to bypass the locked subfolders setting. */
  readonly admins_bypass_locked_subfolders?: boolean | null

  /** Are manual Bundle names allowed? */
  readonly allow_bundle_names?: boolean | null

  /** Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis? */
  readonly allow_user_level_2fa_override?: boolean | null

  /** Allow the site-wide allowed IP restriction to be overriden on a per-user-basis? */
  readonly allow_user_level_allowed_ip_override?: boolean | null

  /** Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis? */
  readonly allow_user_level_ssl_override?: boolean | null

  /** Comma separated list of allowed Country codes */
  readonly allowed_countries?: string | null

  /** List of allowed IP addresses */
  readonly allowed_ips?: string | null

  /**
   * Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their existing
   * IP restrictions. Applies to all Workspaces. Defaults to false.
   */
  readonly enforce_parent_site_user_ip_restrictions?: boolean | null

  /**
   * Create parent directories if they do not exist during uploads? This is primarily used to work around broken upload
   * clients that assume servers will perform this step.
   */
  readonly always_mkdir_parents?: boolean | null

  /** Number of days to retain AS2 messages (incoming and outgoing). */
  readonly as2_message_retention_days?: number | null

  /** If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface. */
  readonly ask_about_overwrites?: boolean | null

  /** Do Bundle owners receive activity notifications? */
  readonly bundle_activity_notifications?: 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null

  /** Site-wide Bundle expiration in days */
  readonly bundle_expiration?: number | null

  /** Custom error message to show when bundle is not found. */
  readonly bundle_not_found_message?: string | null

  /** Do Bundles require password protection? */
  readonly bundle_password_required?: boolean | null

  /** If true, new Share Links created by a user with a primary group will default to that group as owner. */
  readonly bundles_default_owned_by_primary_group?: boolean | null

  /** List of email domains to disallow when entering a Bundle/Inbox recipients */
  readonly bundle_recipient_blacklist_domains?: string[] | null

  /** Disallow free email domains for Bundle/Inbox recipients? */
  readonly bundle_recipient_blacklist_free_email_domains?: boolean | null

  /** Do Bundle owners receive registration notification? */
  readonly bundle_registration_notifications?: 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null

  /** Do Bundles require registration? */
  readonly bundle_require_registration?: boolean | null

  /** Do Bundles require recipients for sharing? */
  readonly bundle_require_share_recipient?: boolean | null

  /**
   * If true, new Share Links must send a one-time password to the recipient when they register. Requires
   * bundle_require_share_recipient and cannot be enabled with bundle_password_required.
   */
  readonly bundle_send_one_time_password_to_recipient_at_registration?: boolean | null

  /** Do Bundles require internal notes? */
  readonly bundle_require_note?: boolean | null

  /** Do Bundle creators receive receipts of invitations? */
  readonly bundle_send_shared_receipts?: boolean | null

  /** Do Bundle uploaders receive upload confirmation notifications? */
  readonly bundle_upload_receipt_notifications?: 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null

  /** Preview watermark image applied to all bundle items. */
  readonly bundle_watermark_attachment?: Image.Attributes | null

  /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
  readonly bundle_watermark_value?: Site.BundleWatermarkValue | null

  /** Calculate CRC32 checksums for files? */
  readonly calculate_file_checksums_crc32?: boolean | null

  /** Calculate MD5 checksums for files? */
  readonly calculate_file_checksums_md5?: boolean | null

  /** Calculate SHA1 checksums for files? */
  readonly calculate_file_checksums_sha1?: boolean | null

  /** Calculate SHA256 checksums for files? */
  readonly calculate_file_checksums_sha256?: boolean | null

  /**
   * If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default Workspace
   * users and groups and grant them folder permissions and notifications on Child Site paths.
   */
  readonly child_site_folder_admins_can_see_parent_site_directory?: boolean | null

  /**
   * If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users and
   * groups that have permissions in that Workspace and choose them as Email Notification recipients.
   */
  readonly workspace_folder_admins_can_see_default_workspace_directory?: boolean | null

  /**
   * Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email Automations
   * in every Workspace on this site?
   */
  readonly uploads_via_email_authentication?: boolean | null

  /** Page link and button color */
  readonly color2_left?: string | null

  /** Top bar link color */
  readonly color2_link?: string | null

  /** Page link and button color */
  readonly color2_text?: string | null

  /** Top bar background color */
  readonly color2_top?: string | null

  /** Top bar text color */
  readonly color2_top_text?: string | null

  /** Site main contact name */
  readonly contact_name?: string | null

  /** Time this site was created */
  readonly created_at?: Files.DateTimeString | null

  /** Preferred currency */
  readonly currency?: string | null

  /** Is this site using a custom namespace for users? */
  readonly custom_namespace?: boolean | null

  /** Is WebDAV enabled? */
  readonly dav_enabled?: boolean | null

  /** Use user FTP roots also for WebDAV? */
  readonly dav_user_root_enabled?: boolean | null

  /** Number of days to keep deleted files */
  readonly days_to_retain_backups?: number | null

  /** If true, allow public viewers of Bundles with full permissions to use document editing integrations. */
  readonly document_edits_in_bundle_allowed?: boolean | null

  /** Site default time zone */
  readonly default_time_zone?: string | null

  /** Is the desktop app enabled? */
  readonly desktop_app?: boolean | null

  /** Is desktop app session IP pinning enabled? */
  readonly desktop_app_session_ip_pinning?: boolean | null

  /** Desktop app session lifetime (in hours) */
  readonly desktop_app_session_lifetime?: number | null

  /** Use legacy checksums mode? */
  readonly legacy_checksums_mode?: boolean | null

  /** If true, we will migrate all remote server syncs to the new Sync model. */
  readonly migrate_remote_server_sync_to_sync?: boolean | null

  /** Is OAuth DCR (dynamic client registration) for MCP enabled? */
  readonly mcp_dcr_enabled?: boolean | null

  /** Is the mobile app enabled? */
  readonly mobile_app?: boolean | null

  /** Is mobile app session IP pinning enabled? */
  readonly mobile_app_session_ip_pinning?: boolean | null

  /** Mobile app session lifetime (in hours) */
  readonly mobile_app_session_lifetime?: number | null

  /** Comma separated list of disallowed Country codes */
  readonly disallowed_countries?: string | null

  /** If true, all AI features are disabled for this site. */
  readonly disable_all_ai_features?: boolean | null

  /** If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain. */
  readonly disable_files_certificate_generation?: boolean | null

  /** Are notifications disabled? */
  readonly disable_notifications?: boolean | null

  /**
   * If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to false;
   * subscription filters and workspace access still control delivery.
   */
  readonly file_activity_events_enabled?: boolean | null

  /** Is password reset disabled? */
  readonly disable_password_reset?: boolean | null

  /** Custom domain */
  readonly domain?: string | null

  /** Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain? */
  readonly domain_hsts_header?: boolean | null

  /** Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026. */
  readonly domain_letsencrypt_chain?: 'default' | 'isrg_root_x1' | 'dst_root_ca_x3' | Files.OtherString | null

  /** Main email for this site */
  readonly email?: string | null

  /** Are FedRAMP security restrictions enabled for this site? */
  readonly fedramp?: boolean | null

  /**
   * Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults to
   * true and applies to all keys and workspaces on this site. When false, new pairings and access through existing
   * connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with
   * usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
   */
  readonly files_com_remote_server_enabled?: boolean | null

  /** Is FTP enabled? */
  readonly ftp_enabled?: boolean | null

  /** Reply-to email for this site */
  readonly reply_to_email?: string | null

  /**
   * If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed
   * via your SSO provider.
   */
  readonly non_sso_groups_allowed?: boolean | null

  /**
   * If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed
   * via your SSO provider.
   */
  readonly non_sso_users_allowed?: boolean | null

  /** If true, permissions for this site must be bound to a group (not a user). */
  readonly folder_permissions_groups_only?: boolean | null

  /** Allow group admins to create users in their groups */
  readonly group_admins_can_add_users?: boolean | null

  /** Allow group admins to add or remove existing users in their groups */
  readonly group_admins_can_manage_group_memberships?: boolean | null

  /** Allow group admins to delete users in their groups */
  readonly group_admins_can_delete_users?: boolean | null

  /** Allow group admins to enable or disable users in their groups */
  readonly group_admins_can_enable_disable_users?: boolean | null

  /** Allow group admins to modify users in their groups */
  readonly group_admins_can_modify_users?: boolean | null

  /** Allow group admins to exempt users in their groups from lifecycle rules */
  readonly group_admins_can_bypass_user_lifecycle_rules?: boolean | null

  /** Allow group admins to reset passwords for users in their groups */
  readonly group_admins_can_reset_passwords?: boolean | null

  /** Allow group admins to set password authentication method */
  readonly group_admins_can_set_user_password?: boolean | null

  /** Is there a signed HIPAA BAA between Files.com and this site? */
  readonly hipaa?: boolean | null

  /** Branded icon 128x128 */
  readonly icon128?: Image.Attributes | null

  /** Branded icon 16x16 */
  readonly icon16?: Image.Attributes | null

  /** Branded icon 32x32 */
  readonly icon32?: Image.Attributes | null

  /** Branded icon 48x48 */
  readonly icon48?: Image.Attributes | null

  /** Can files be modified? */
  readonly immutable_files_set_at?: Files.DateTimeString | null

  /** Include password in emails to new users? */
  readonly include_password_in_welcome_email?: boolean | null

  /** Site default language */
  readonly language?: string | null

  /** Base DN for looking up users in LDAP server */
  readonly ldap_base_dn?: string | null

  /** Domain name that will be appended to usernames */
  readonly ldap_domain?: string | null

  /** Main LDAP setting: is LDAP enabled? */
  readonly ldap_enabled?: boolean | null

  /** Should we sync groups from LDAP server? */
  readonly ldap_group_action?: string | null

  /** Comma or newline separated list of group names (with optional wildcards) to exclude when syncing. */
  readonly ldap_group_exclusion?: string | null

  /** Comma or newline separated list of group names (with optional wildcards) to include when syncing. */
  readonly ldap_group_inclusion?: string | null

  /** LDAP host */
  readonly ldap_host?: string | null

  /** LDAP backup host */
  readonly ldap_host_2?: string | null

  /** LDAP backup host */
  readonly ldap_host_3?: string | null

  /** LDAP port */
  readonly ldap_port?: number | null

  /** Use secure LDAP? */
  readonly ldap_secure?: boolean | null

  /**
   * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
   * `allow_any` disables certificate validation.
   */
  readonly ldap_server_certificate?: string | null

  /** LDAP type */
  readonly ldap_type?: string | null

  /** Should we sync users from LDAP server? */
  readonly ldap_user_action?: string | null

  /**
   * Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these groups
   * will be added or synced.
   */
  readonly ldap_user_include_groups?: string | null

  /** Username for signing in to LDAP server. */
  readonly ldap_username?: string | null

  /** LDAP username field */
  readonly ldap_username_field?: string | null

  /** Login help text */
  readonly login_help_text?: string | null

  /** Branded logo */
  readonly logo?: Image.Attributes | null

  /** Branded login page background */
  readonly login_page_background_image?: Image.Attributes | null

  /** Number of prior passwords to disallow */
  readonly max_prior_passwords?: number | null

  /**
   * Site settings managed by the parent site. Each key identifies a managed setting, with a null value. Non-secret
   * effective values are returned in their own Site settings fields.
   */
  readonly managed_site_settings?: Files.JsonObject | null

  /** A message to show users when they connect via FTP or SFTP. */
  readonly motd_text?: string | null

  /** Show message to users connecting via FTP */
  readonly motd_use_for_ftp?: boolean | null

  /** Show message to users connecting via SFTP */
  readonly motd_use_for_sftp?: boolean | null

  /** Next billing amount */
  readonly next_billing_amount?: Files.DecimalString | null

  /** Next billing date */
  readonly next_billing_date?: string | null

  /** If true, allows users to use a document editing integration. */
  readonly office_integration_available?: boolean | null

  /** Which document editing integration to support. Files.com Editor or Microsoft Office for the Web. */
  readonly office_integration_type?: 'only_office' | 'office_365' | 'disabled' | Files.OtherString | null

  /** Link to scheduling a meeting with our Sales team */
  readonly oncehub_link?: string | null

  /** Use servers in the USA only? */
  readonly opt_out_global?: boolean | null

  /** Is this site's billing overdue? */
  readonly overdue?: boolean | null

  /** Shortest password length for users */
  readonly password_min_length?: number | null

  /** Require a letter in passwords? */
  readonly password_require_letter?: boolean | null

  /** Require lower and upper case letters in passwords? */
  readonly password_require_mixed?: boolean | null

  /** Require a number in passwords? */
  readonly password_require_number?: boolean | null

  /** Require special characters in password? */
  readonly password_require_special?: boolean | null

  /** Require passwords that have not been previously breached? (see https://haveibeenpwned.com/) */
  readonly password_require_unbreached?: boolean | null

  /**
   * Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same
   * requirements as users' passwords?
   */
  readonly password_requirements_apply_to_bundles?: boolean | null

  /** Number of days password is valid */
  readonly password_validity_days?: number | null

  /** Site phone number */
  readonly phone?: string | null

  /**
   * If true, we will ensure that all internal communications with any remote server are made through the primary region
   * of the site. This setting overrides individual remote server settings.
   */
  readonly pin_all_remote_servers_to_site_region?: boolean | null

  /**
   * If true, we will prevent non-administrators from receiving any permissions directly on the root folder. This is
   * commonly used to prevent the accidental application of permissions.
   */
  readonly prevent_root_permissions_for_non_site_admins?: boolean | null

  /**
   * If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups
   * will be honored. Make sure that your current user is a member of a group with API permission when changing this
   * value to avoid locking yourself out of your site.
   */
  readonly protocol_access_groups_only?: boolean | null

  /** Require two-factor authentication for all users? */
  readonly require_2fa?: boolean | null

  /**
   * If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would disable
   * one.
   */
  readonly restrict_root_folder_behaviors_to_site_admins?: boolean | null

  /**
   * If true, supported protective behaviors at the site root also apply within named workspaces. Requires
   * restrict_root_folder_behaviors_to_site_admins to be enabled.
   */
  readonly root_folder_behaviors_apply_to_workspaces?: boolean | null

  /**
   * If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide
   * two-factor authentication requirement.
   */
  readonly require_2fa_exempt_all_sso_users?: boolean | null

  /** If set, requirement for two-factor authentication has been scheduled to end on this date-time. */
  readonly require_2fa_stop_time?: Files.DateTimeString | null

  /** Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period. */
  readonly revoke_bundle_access_on_disable_or_delete?: boolean | null

  /**
   * What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
   */
  readonly require_2fa_user_type?: 'all' | 'folder_and_site_admins' | 'site_admins' | Files.OtherString | null

  /**
   * If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user logout
   * and log back in every time they visit the page.
   */
  readonly require_logout_from_bundles_and_inboxes?: boolean | null

  /** Current session */
  readonly session?: Session.Attributes | null

  /**
   * Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false, user
   * and group S3 permissions do not allow access.
   */
  readonly s3_compatible_endpoint_enabled?: boolean | null

  /** Is SFTP enabled? */
  readonly sftp_enabled?: boolean | null

  /** Finalize partial SFTP uploads from interrupted connections? Default: true. */
  readonly sftp_finalize_partial_uploads?: boolean | null

  /** Sftp Host Key Type */
  readonly sftp_host_key_type?: 'default' | 'exavault' | 'custom' | 'smartfile' | Files.OtherString | null

  /** Id of the currently selected custom SFTP Host Key */
  readonly active_sftp_host_key_id?: number | null

  /** Ids of the selected custom SFTP Host Keys */
  readonly active_sftp_host_key_ids?: number[] | null

  /**
   * If true, we will allow weak and known insecure ciphers to be used for SFTP connections. Enabling this setting
   * severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
   */
  readonly sftp_insecure_ciphers?: boolean | null

  /**
   * If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on our
   * secure list. This has the effect of making the cipher weaker than our normal threshold for security, but is
   * required to support certain legacy or broken SSH and MFT clients. Enabling this weakens security, but not nearly as
   * much as enabling the full `sftp_insecure_ciphers` option.
   */
  readonly sftp_insecure_diffie_hellman?: boolean | null

  /** Use user FTP roots also for SFTP? */
  readonly sftp_user_root_enabled?: boolean | null

  /** Allow bundle creation */
  readonly sharing_enabled?: boolean | null

  /** Show log in link in user notifications? */
  readonly show_user_notifications_log_in_link?: boolean | null

  /** Show request access link for users without access?  Currently unused. */
  readonly show_request_access_link?: boolean | null

  /** Custom site footer text for authenticated pages */
  readonly site_footer?: string | null

  /** Custom site header text for authenticated pages */
  readonly site_header?: string | null

  /** Custom site footer text for public pages */
  readonly site_public_footer?: string | null

  /** Custom site header text for public pages */
  readonly site_public_header?: string | null

  /** SMTP server hostname or IP */
  readonly smtp_address?: string | null

  /** SMTP server authentication type */
  readonly smtp_authentication?: string | null

  /** From address to use when mailing through custom SMTP */
  readonly smtp_from?: string | null

  /** SMTP server port */
  readonly smtp_port?: number | null

  /**
   * Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials and
   * messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to require
   * unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication; require_implicit
   * uses TLS from connection start; never disables TLS. TLS verifies the server certificate against smtp_address.
   * Encryption is never automatically downgraded.
   */
  readonly smtp_ssl?: 'if_available' | 'require' | 'require_implicit' | 'never' | Files.OtherString | null

  /** SMTP server username */
  readonly smtp_username?: string | null

  /** Session expiry in minutes */
  readonly session_expiry_minutes?: number | null

  /** Allow snapshot share links creation */
  readonly snapshot_sharing_enabled?: boolean | null

  /** Is SSL required?  Disabling this is insecure. */
  readonly ssl_required?: boolean | null

  /** Site subdomain */
  readonly subdomain?: string | null

  /** If switching plans, when does the new plan take effect? */
  readonly switch_to_plan_date?: Files.DateTimeString | null

  /** Number of days left in trial */
  readonly trial_days_left?: number | null

  /** When does this Site trial expire? */
  readonly trial_until?: Files.DateTimeString | null

  /** If using custom SMTP, should we use dedicated IPs to deliver emails? */
  readonly use_dedicated_ips_for_smtp?: boolean | null

  /** Allow uploaders to set `provided_modified_at` for uploaded files? */
  readonly use_provided_modified_at?: boolean | null

  /** User of current session */
  readonly user?: User.Attributes | null

  /** Will users be locked out after incorrect login attempts? */
  readonly user_lockout?: boolean | null

  /** How many hours to lock user out for failed password? */
  readonly user_lockout_lock_period?: number | null

  /** Number of login tries within `user_lockout_within` hours before users are locked out */
  readonly user_lockout_tries?: number | null

  /** Number of hours for user lockout window */
  readonly user_lockout_within?: number | null

  /** Enable User Requests feature */
  readonly user_requests_enabled?: boolean | null

  /** Send email to site admins when a user request is received? */
  readonly user_requests_notify_admins?: boolean | null

  /** Allow users to create their own API keys? */
  readonly users_can_create_api_keys?: boolean | null

  /** Allow users to create their own SSH keys? */
  readonly users_can_create_ssh_keys?: boolean | null

  /**
   * How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`,
   * `full_name_company`, or `full_name_username_company`.
   */
  readonly username_display?: 'username_only' | 'full_name_only' | 'full_name_username' | 'full_name_company' | 'full_name_username_company' | Files.OtherString | null

  /** Custom text send in user welcome email */
  readonly welcome_custom_text?: string | null

  /**
   * Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like %Y
   * (4-digit year), %m (month), %d (day).
   */
  readonly email_footer_custom_text?: string | null

  /** Include this email in welcome emails if enabled */
  readonly welcome_email_cc?: string | null

  /** Include this email subject in welcome emails if enabled */
  readonly welcome_email_subject?: string | null

  /** Will the welcome email be sent to new users? */
  readonly welcome_email_enabled?: boolean | null

  /** Does the welcome screen appear? */
  readonly welcome_screen?: 'enabled' | 'hidden' | 'disabled' | Files.OtherString | null

  /** Does FTP user Windows emulation mode? */
  readonly windows_mode_ftp?: boolean | null

  /** Site Id */
  getId(): number | null | undefined

  /** Site name */
  getName(): string | null | undefined

  /** Additional extensions that are considered text files */
  getAdditionalTextFileTypes(): string[] | null | undefined

  /**
   * Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins, and
   * all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group in
   * group_ids get access regardless of the other options. All availability options are additive: any enabled option
   * matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this site, from
   * any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not affect other
   * options. Disabling all AI features overrides these settings.
   */
  getAiFeatureAvailability(): Files.JsonObject | null | undefined

  /** Is SMS two factor authentication allowed? */
  getAllowed2faMethodSms(): boolean | null | undefined

  /** Is TOTP two factor authentication allowed? */
  getAllowed2faMethodTotp(): boolean | null | undefined

  /** Is WebAuthn two factor authentication allowed? */
  getAllowed2faMethodWebauthn(): boolean | null | undefined

  /** Is yubikey two factor authentication allowed? */
  getAllowed2faMethodYubi(): boolean | null | undefined

  /** Is OTP via email two factor authentication allowed? */
  getAllowed2faMethodEmail(): boolean | null | undefined

  /** Is OTP via static codes for two factor authentication allowed? */
  getAllowed2faMethodStatic(): boolean | null | undefined

  /** Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV? */
  getAllowed2faMethodBypassForFtpSftpDav(): boolean | null | undefined

  /** User ID for the main site administrator */
  getAdminUserId(): number | null | undefined

  /** Allow admins to bypass the locked subfolders setting. */
  getAdminsBypassLockedSubfolders(): boolean | null | undefined

  /** Are manual Bundle names allowed? */
  getAllowBundleNames(): boolean | null | undefined

  /** Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis? */
  getAllowUserLevel2faOverride(): boolean | null | undefined

  /** Allow the site-wide allowed IP restriction to be overriden on a per-user-basis? */
  getAllowUserLevelAllowedIpOverride(): boolean | null | undefined

  /** Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis? */
  getAllowUserLevelSslOverride(): boolean | null | undefined

  /** Comma separated list of allowed Country codes */
  getAllowedCountries(): string | null | undefined

  /** List of allowed IP addresses */
  getAllowedIps(): string | null | undefined

  /**
   * Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their existing
   * IP restrictions. Applies to all Workspaces. Defaults to false.
   */
  getEnforceParentSiteUserIpRestrictions(): boolean | null | undefined

  /**
   * Create parent directories if they do not exist during uploads? This is primarily used to work around broken upload
   * clients that assume servers will perform this step.
   */
  getAlwaysMkdirParents(): boolean | null | undefined

  /** Number of days to retain AS2 messages (incoming and outgoing). */
  getAs2MessageRetentionDays(): number | null | undefined

  /** If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface. */
  getAskAboutOverwrites(): boolean | null | undefined

  /** Do Bundle owners receive activity notifications? */
  getBundleActivityNotifications(): 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null | undefined

  /** Site-wide Bundle expiration in days */
  getBundleExpiration(): number | null | undefined

  /** Custom error message to show when bundle is not found. */
  getBundleNotFoundMessage(): string | null | undefined

  /** Do Bundles require password protection? */
  getBundlePasswordRequired(): boolean | null | undefined

  /** If true, new Share Links created by a user with a primary group will default to that group as owner. */
  getBundlesDefaultOwnedByPrimaryGroup(): boolean | null | undefined

  /** List of email domains to disallow when entering a Bundle/Inbox recipients */
  getBundleRecipientBlacklistDomains(): string[] | null | undefined

  /** Disallow free email domains for Bundle/Inbox recipients? */
  getBundleRecipientBlacklistFreeEmailDomains(): boolean | null | undefined

  /** Do Bundle owners receive registration notification? */
  getBundleRegistrationNotifications(): 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null | undefined

  /** Do Bundles require registration? */
  getBundleRequireRegistration(): boolean | null | undefined

  /** Do Bundles require recipients for sharing? */
  getBundleRequireShareRecipient(): boolean | null | undefined

  /**
   * If true, new Share Links must send a one-time password to the recipient when they register. Requires
   * bundle_require_share_recipient and cannot be enabled with bundle_password_required.
   */
  getBundleSendOneTimePasswordToRecipientAtRegistration(): boolean | null | undefined

  /** Do Bundles require internal notes? */
  getBundleRequireNote(): boolean | null | undefined

  /** Do Bundle creators receive receipts of invitations? */
  getBundleSendSharedReceipts(): boolean | null | undefined

  /** Do Bundle uploaders receive upload confirmation notifications? */
  getBundleUploadReceiptNotifications(): 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null | undefined

  /** Preview watermark image applied to all bundle items. */
  getBundleWatermarkAttachment(): Image.Attributes | null | undefined

  /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
  getBundleWatermarkValue(): Site.BundleWatermarkValue | null | undefined

  /** Calculate CRC32 checksums for files? */
  getCalculateFileChecksumsCrc32(): boolean | null | undefined

  /** Calculate MD5 checksums for files? */
  getCalculateFileChecksumsMd5(): boolean | null | undefined

  /** Calculate SHA1 checksums for files? */
  getCalculateFileChecksumsSha1(): boolean | null | undefined

  /** Calculate SHA256 checksums for files? */
  getCalculateFileChecksumsSha256(): boolean | null | undefined

  /**
   * If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default Workspace
   * users and groups and grant them folder permissions and notifications on Child Site paths.
   */
  getChildSiteFolderAdminsCanSeeParentSiteDirectory(): boolean | null | undefined

  /**
   * If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users and
   * groups that have permissions in that Workspace and choose them as Email Notification recipients.
   */
  getWorkspaceFolderAdminsCanSeeDefaultWorkspaceDirectory(): boolean | null | undefined

  /**
   * Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email Automations
   * in every Workspace on this site?
   */
  getUploadsViaEmailAuthentication(): boolean | null | undefined

  /** Page link and button color */
  getColor2Left(): string | null | undefined

  /** Top bar link color */
  getColor2Link(): string | null | undefined

  /** Page link and button color */
  getColor2Text(): string | null | undefined

  /** Top bar background color */
  getColor2Top(): string | null | undefined

  /** Top bar text color */
  getColor2TopText(): string | null | undefined

  /** Site main contact name */
  getContactName(): string | null | undefined

  /** Time this site was created */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Preferred currency */
  getCurrency(): string | null | undefined

  /** Is this site using a custom namespace for users? */
  getCustomNamespace(): boolean | null | undefined

  /** Is WebDAV enabled? */
  getDavEnabled(): boolean | null | undefined

  /** Use user FTP roots also for WebDAV? */
  getDavUserRootEnabled(): boolean | null | undefined

  /** Number of days to keep deleted files */
  getDaysToRetainBackups(): number | null | undefined

  /** If true, allow public viewers of Bundles with full permissions to use document editing integrations. */
  getDocumentEditsInBundleAllowed(): boolean | null | undefined

  /** Site default time zone */
  getDefaultTimeZone(): string | null | undefined

  /** Is the desktop app enabled? */
  getDesktopApp(): boolean | null | undefined

  /** Is desktop app session IP pinning enabled? */
  getDesktopAppSessionIpPinning(): boolean | null | undefined

  /** Desktop app session lifetime (in hours) */
  getDesktopAppSessionLifetime(): number | null | undefined

  /** Use legacy checksums mode? */
  getLegacyChecksumsMode(): boolean | null | undefined

  /** If true, we will migrate all remote server syncs to the new Sync model. */
  getMigrateRemoteServerSyncToSync(): boolean | null | undefined

  /** Is OAuth DCR (dynamic client registration) for MCP enabled? */
  getMcpDcrEnabled(): boolean | null | undefined

  /** Is the mobile app enabled? */
  getMobileApp(): boolean | null | undefined

  /** Is mobile app session IP pinning enabled? */
  getMobileAppSessionIpPinning(): boolean | null | undefined

  /** Mobile app session lifetime (in hours) */
  getMobileAppSessionLifetime(): number | null | undefined

  /** Comma separated list of disallowed Country codes */
  getDisallowedCountries(): string | null | undefined

  /** If true, all AI features are disabled for this site. */
  getDisableAllAiFeatures(): boolean | null | undefined

  /** If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain. */
  getDisableFilesCertificateGeneration(): boolean | null | undefined

  /** Are notifications disabled? */
  getDisableNotifications(): boolean | null | undefined

  /**
   * If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to false;
   * subscription filters and workspace access still control delivery.
   */
  getFileActivityEventsEnabled(): boolean | null | undefined

  /** Is password reset disabled? */
  getDisablePasswordReset(): boolean | null | undefined

  /** Custom domain */
  getDomain(): string | null | undefined

  /** Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain? */
  getDomainHstsHeader(): boolean | null | undefined

  /** Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026. */
  getDomainLetsencryptChain(): 'default' | 'isrg_root_x1' | 'dst_root_ca_x3' | Files.OtherString | null | undefined

  /** Main email for this site */
  getEmail(): string | null | undefined

  /** Are FedRAMP security restrictions enabled for this site? */
  getFedramp(): boolean | null | undefined

  /**
   * Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults to
   * true and applies to all keys and workspaces on this site. When false, new pairings and access through existing
   * connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with
   * usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
   */
  getFilesComRemoteServerEnabled(): boolean | null | undefined

  /** Is FTP enabled? */
  getFtpEnabled(): boolean | null | undefined

  /** Reply-to email for this site */
  getReplyToEmail(): string | null | undefined

  /**
   * If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed
   * via your SSO provider.
   */
  getNonSsoGroupsAllowed(): boolean | null | undefined

  /**
   * If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed
   * via your SSO provider.
   */
  getNonSsoUsersAllowed(): boolean | null | undefined

  /** If true, permissions for this site must be bound to a group (not a user). */
  getFolderPermissionsGroupsOnly(): boolean | null | undefined

  /** Allow group admins to create users in their groups */
  getGroupAdminsCanAddUsers(): boolean | null | undefined

  /** Allow group admins to add or remove existing users in their groups */
  getGroupAdminsCanManageGroupMemberships(): boolean | null | undefined

  /** Allow group admins to delete users in their groups */
  getGroupAdminsCanDeleteUsers(): boolean | null | undefined

  /** Allow group admins to enable or disable users in their groups */
  getGroupAdminsCanEnableDisableUsers(): boolean | null | undefined

  /** Allow group admins to modify users in their groups */
  getGroupAdminsCanModifyUsers(): boolean | null | undefined

  /** Allow group admins to exempt users in their groups from lifecycle rules */
  getGroupAdminsCanBypassUserLifecycleRules(): boolean | null | undefined

  /** Allow group admins to reset passwords for users in their groups */
  getGroupAdminsCanResetPasswords(): boolean | null | undefined

  /** Allow group admins to set password authentication method */
  getGroupAdminsCanSetUserPassword(): boolean | null | undefined

  /** Is there a signed HIPAA BAA between Files.com and this site? */
  getHipaa(): boolean | null | undefined

  /** Branded icon 128x128 */
  getIcon128(): Image.Attributes | null | undefined

  /** Branded icon 16x16 */
  getIcon16(): Image.Attributes | null | undefined

  /** Branded icon 32x32 */
  getIcon32(): Image.Attributes | null | undefined

  /** Branded icon 48x48 */
  getIcon48(): Image.Attributes | null | undefined

  /** Can files be modified? */
  getImmutableFilesSetAt(): Files.DateTimeString | null | undefined

  /** Include password in emails to new users? */
  getIncludePasswordInWelcomeEmail(): boolean | null | undefined

  /** Site default language */
  getLanguage(): string | null | undefined

  /** Base DN for looking up users in LDAP server */
  getLdapBaseDn(): string | null | undefined

  /** Domain name that will be appended to usernames */
  getLdapDomain(): string | null | undefined

  /** Main LDAP setting: is LDAP enabled? */
  getLdapEnabled(): boolean | null | undefined

  /** Should we sync groups from LDAP server? */
  getLdapGroupAction(): string | null | undefined

  /** Comma or newline separated list of group names (with optional wildcards) to exclude when syncing. */
  getLdapGroupExclusion(): string | null | undefined

  /** Comma or newline separated list of group names (with optional wildcards) to include when syncing. */
  getLdapGroupInclusion(): string | null | undefined

  /** LDAP host */
  getLdapHost(): string | null | undefined

  /** LDAP backup host */
  getLdapHost2(): string | null | undefined

  /** LDAP backup host */
  getLdapHost3(): string | null | undefined

  /** LDAP port */
  getLdapPort(): number | null | undefined

  /** Use secure LDAP? */
  getLdapSecure(): boolean | null | undefined

  /**
   * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
   * `allow_any` disables certificate validation.
   */
  getLdapServerCertificate(): string | null | undefined

  /** LDAP type */
  getLdapType(): string | null | undefined

  /** Should we sync users from LDAP server? */
  getLdapUserAction(): string | null | undefined

  /**
   * Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these groups
   * will be added or synced.
   */
  getLdapUserIncludeGroups(): string | null | undefined

  /** Username for signing in to LDAP server. */
  getLdapUsername(): string | null | undefined

  /** LDAP username field */
  getLdapUsernameField(): string | null | undefined

  /** Login help text */
  getLoginHelpText(): string | null | undefined

  /** Branded logo */
  getLogo(): Image.Attributes | null | undefined

  /** Branded login page background */
  getLoginPageBackgroundImage(): Image.Attributes | null | undefined

  /** Number of prior passwords to disallow */
  getMaxPriorPasswords(): number | null | undefined

  /**
   * Site settings managed by the parent site. Each key identifies a managed setting, with a null value. Non-secret
   * effective values are returned in their own Site settings fields.
   */
  getManagedSiteSettings(): Files.JsonObject | null | undefined

  /** A message to show users when they connect via FTP or SFTP. */
  getMotdText(): string | null | undefined

  /** Show message to users connecting via FTP */
  getMotdUseForFtp(): boolean | null | undefined

  /** Show message to users connecting via SFTP */
  getMotdUseForSftp(): boolean | null | undefined

  /** Next billing amount */
  getNextBillingAmount(): Files.DecimalString | null | undefined

  /** Next billing date */
  getNextBillingDate(): string | null | undefined

  /** If true, allows users to use a document editing integration. */
  getOfficeIntegrationAvailable(): boolean | null | undefined

  /** Which document editing integration to support. Files.com Editor or Microsoft Office for the Web. */
  getOfficeIntegrationType(): 'only_office' | 'office_365' | 'disabled' | Files.OtherString | null | undefined

  /** Link to scheduling a meeting with our Sales team */
  getOncehubLink(): string | null | undefined

  /** Use servers in the USA only? */
  getOptOutGlobal(): boolean | null | undefined

  /** Is this site's billing overdue? */
  getOverdue(): boolean | null | undefined

  /** Shortest password length for users */
  getPasswordMinLength(): number | null | undefined

  /** Require a letter in passwords? */
  getPasswordRequireLetter(): boolean | null | undefined

  /** Require lower and upper case letters in passwords? */
  getPasswordRequireMixed(): boolean | null | undefined

  /** Require a number in passwords? */
  getPasswordRequireNumber(): boolean | null | undefined

  /** Require special characters in password? */
  getPasswordRequireSpecial(): boolean | null | undefined

  /** Require passwords that have not been previously breached? (see https://haveibeenpwned.com/) */
  getPasswordRequireUnbreached(): boolean | null | undefined

  /**
   * Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same
   * requirements as users' passwords?
   */
  getPasswordRequirementsApplyToBundles(): boolean | null | undefined

  /** Number of days password is valid */
  getPasswordValidityDays(): number | null | undefined

  /** Site phone number */
  getPhone(): string | null | undefined

  /**
   * If true, we will ensure that all internal communications with any remote server are made through the primary region
   * of the site. This setting overrides individual remote server settings.
   */
  getPinAllRemoteServersToSiteRegion(): boolean | null | undefined

  /**
   * If true, we will prevent non-administrators from receiving any permissions directly on the root folder. This is
   * commonly used to prevent the accidental application of permissions.
   */
  getPreventRootPermissionsForNonSiteAdmins(): boolean | null | undefined

  /**
   * If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups
   * will be honored. Make sure that your current user is a member of a group with API permission when changing this
   * value to avoid locking yourself out of your site.
   */
  getProtocolAccessGroupsOnly(): boolean | null | undefined

  /** Require two-factor authentication for all users? */
  getRequire2fa(): boolean | null | undefined

  /**
   * If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would disable
   * one.
   */
  getRestrictRootFolderBehaviorsToSiteAdmins(): boolean | null | undefined

  /**
   * If true, supported protective behaviors at the site root also apply within named workspaces. Requires
   * restrict_root_folder_behaviors_to_site_admins to be enabled.
   */
  getRootFolderBehaviorsApplyToWorkspaces(): boolean | null | undefined

  /**
   * If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide
   * two-factor authentication requirement.
   */
  getRequire2faExemptAllSsoUsers(): boolean | null | undefined

  /** If set, requirement for two-factor authentication has been scheduled to end on this date-time. */
  getRequire2faStopTime(): Files.DateTimeString | null | undefined

  /** Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period. */
  getRevokeBundleAccessOnDisableOrDelete(): boolean | null | undefined

  /**
   * What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
   */
  getRequire2faUserType(): 'all' | 'folder_and_site_admins' | 'site_admins' | Files.OtherString | null | undefined

  /**
   * If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user logout
   * and log back in every time they visit the page.
   */
  getRequireLogoutFromBundlesAndInboxes(): boolean | null | undefined

  /** Current session */
  getSession(): Session.Attributes | null | undefined

  /**
   * Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false, user
   * and group S3 permissions do not allow access.
   */
  getS3CompatibleEndpointEnabled(): boolean | null | undefined

  /** Is SFTP enabled? */
  getSftpEnabled(): boolean | null | undefined

  /** Finalize partial SFTP uploads from interrupted connections? Default: true. */
  getSftpFinalizePartialUploads(): boolean | null | undefined

  /** Sftp Host Key Type */
  getSftpHostKeyType(): 'default' | 'exavault' | 'custom' | 'smartfile' | Files.OtherString | null | undefined

  /** Id of the currently selected custom SFTP Host Key */
  getActiveSftpHostKeyId(): number | null | undefined

  /** Ids of the selected custom SFTP Host Keys */
  getActiveSftpHostKeyIds(): number[] | null | undefined

  /**
   * If true, we will allow weak and known insecure ciphers to be used for SFTP connections. Enabling this setting
   * severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
   */
  getSftpInsecureCiphers(): boolean | null | undefined

  /**
   * If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on our
   * secure list. This has the effect of making the cipher weaker than our normal threshold for security, but is
   * required to support certain legacy or broken SSH and MFT clients. Enabling this weakens security, but not nearly as
   * much as enabling the full `sftp_insecure_ciphers` option.
   */
  getSftpInsecureDiffieHellman(): boolean | null | undefined

  /** Use user FTP roots also for SFTP? */
  getSftpUserRootEnabled(): boolean | null | undefined

  /** Allow bundle creation */
  getSharingEnabled(): boolean | null | undefined

  /** Show log in link in user notifications? */
  getShowUserNotificationsLogInLink(): boolean | null | undefined

  /** Show request access link for users without access?  Currently unused. */
  getShowRequestAccessLink(): boolean | null | undefined

  /** Custom site footer text for authenticated pages */
  getSiteFooter(): string | null | undefined

  /** Custom site header text for authenticated pages */
  getSiteHeader(): string | null | undefined

  /** Custom site footer text for public pages */
  getSitePublicFooter(): string | null | undefined

  /** Custom site header text for public pages */
  getSitePublicHeader(): string | null | undefined

  /** SMTP server hostname or IP */
  getSmtpAddress(): string | null | undefined

  /** SMTP server authentication type */
  getSmtpAuthentication(): string | null | undefined

  /** From address to use when mailing through custom SMTP */
  getSmtpFrom(): string | null | undefined

  /** SMTP server port */
  getSmtpPort(): number | null | undefined

  /**
   * Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials and
   * messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to require
   * unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication; require_implicit
   * uses TLS from connection start; never disables TLS. TLS verifies the server certificate against smtp_address.
   * Encryption is never automatically downgraded.
   */
  getSmtpSsl(): 'if_available' | 'require' | 'require_implicit' | 'never' | Files.OtherString | null | undefined

  /** SMTP server username */
  getSmtpUsername(): string | null | undefined

  /** Session expiry in minutes */
  getSessionExpiryMinutes(): number | null | undefined

  /** Allow snapshot share links creation */
  getSnapshotSharingEnabled(): boolean | null | undefined

  /** Is SSL required?  Disabling this is insecure. */
  getSslRequired(): boolean | null | undefined

  /** Site subdomain */
  getSubdomain(): string | null | undefined

  /** If switching plans, when does the new plan take effect? */
  getSwitchToPlanDate(): Files.DateTimeString | null | undefined

  /** Number of days left in trial */
  getTrialDaysLeft(): number | null | undefined

  /** When does this Site trial expire? */
  getTrialUntil(): Files.DateTimeString | null | undefined

  /** If using custom SMTP, should we use dedicated IPs to deliver emails? */
  getUseDedicatedIpsForSmtp(): boolean | null | undefined

  /** Allow uploaders to set `provided_modified_at` for uploaded files? */
  getUseProvidedModifiedAt(): boolean | null | undefined

  /** User of current session */
  getUser(): User.Attributes | null | undefined

  /** Will users be locked out after incorrect login attempts? */
  getUserLockout(): boolean | null | undefined

  /** How many hours to lock user out for failed password? */
  getUserLockoutLockPeriod(): number | null | undefined

  /** Number of login tries within `user_lockout_within` hours before users are locked out */
  getUserLockoutTries(): number | null | undefined

  /** Number of hours for user lockout window */
  getUserLockoutWithin(): number | null | undefined

  /** Enable User Requests feature */
  getUserRequestsEnabled(): boolean | null | undefined

  /** Send email to site admins when a user request is received? */
  getUserRequestsNotifyAdmins(): boolean | null | undefined

  /** Allow users to create their own API keys? */
  getUsersCanCreateApiKeys(): boolean | null | undefined

  /** Allow users to create their own SSH keys? */
  getUsersCanCreateSshKeys(): boolean | null | undefined

  /**
   * How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`,
   * `full_name_company`, or `full_name_username_company`.
   */
  getUsernameDisplay(): 'username_only' | 'full_name_only' | 'full_name_username' | 'full_name_company' | 'full_name_username_company' | Files.OtherString | null | undefined

  /** Custom text send in user welcome email */
  getWelcomeCustomText(): string | null | undefined

  /**
   * Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like %Y
   * (4-digit year), %m (month), %d (day).
   */
  getEmailFooterCustomText(): string | null | undefined

  /** Include this email in welcome emails if enabled */
  getWelcomeEmailCc(): string | null | undefined

  /** Include this email subject in welcome emails if enabled */
  getWelcomeEmailSubject(): string | null | undefined

  /** Will the welcome email be sent to new users? */
  getWelcomeEmailEnabled(): boolean | null | undefined

  /** Does the welcome screen appear? */
  getWelcomeScreen(): 'enabled' | 'hidden' | 'disabled' | Files.OtherString | null | undefined

  /** Does FTP user Windows emulation mode? */
  getWindowsModeFtp(): boolean | null | undefined

  /** Show Site Settings */
  static get(options?: Files.RequestOptions): Promise<Site>

  /** Get the most recent usage snapshot (usage data for billing purposes) for a Site */
  static getUsage(options?: Files.RequestOptions): Promise<UsageSnapshot>

  /** Update Site Settings */
  static update(params?: Site.UpdateParams, options?: Files.RequestOptions): Promise<Site>

  static default: typeof Site
}

declare namespace Site {
  /** The fields of `Site` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Site Id */
    id?: number | null

    /** Site name */
    name?: string | null

    /** Additional extensions that are considered text files */
    additional_text_file_types?: string[] | null

    /**
     * Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins,
     * and all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group
     * in group_ids get access regardless of the other options. All availability options are additive: any enabled
     * option matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this
     * site, from any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not
     * affect other options. Disabling all AI features overrides these settings.
     */
    ai_feature_availability?: Files.JsonObject | null

    /** Is SMS two factor authentication allowed? */
    allowed_2fa_method_sms?: boolean | null

    /** Is TOTP two factor authentication allowed? */
    allowed_2fa_method_totp?: boolean | null

    /** Is WebAuthn two factor authentication allowed? */
    allowed_2fa_method_webauthn?: boolean | null

    /** Is yubikey two factor authentication allowed? */
    allowed_2fa_method_yubi?: boolean | null

    /** Is OTP via email two factor authentication allowed? */
    allowed_2fa_method_email?: boolean | null

    /** Is OTP via static codes for two factor authentication allowed? */
    allowed_2fa_method_static?: boolean | null

    /** Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV? */
    allowed_2fa_method_bypass_for_ftp_sftp_dav?: boolean | null

    /** User ID for the main site administrator */
    admin_user_id?: number | null

    /** Allow admins to bypass the locked subfolders setting. */
    admins_bypass_locked_subfolders?: boolean | null

    /** Are manual Bundle names allowed? */
    allow_bundle_names?: boolean | null

    /** Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis? */
    allow_user_level_2fa_override?: boolean | null

    /** Allow the site-wide allowed IP restriction to be overriden on a per-user-basis? */
    allow_user_level_allowed_ip_override?: boolean | null

    /** Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis? */
    allow_user_level_ssl_override?: boolean | null

    /** Comma separated list of allowed Country codes */
    allowed_countries?: string | null

    /** List of allowed IP addresses */
    allowed_ips?: string | null

    /**
     * Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their
     * existing IP restrictions. Applies to all Workspaces. Defaults to false.
     */
    enforce_parent_site_user_ip_restrictions?: boolean | null

    /**
     * Create parent directories if they do not exist during uploads? This is primarily used to work around broken
     * upload clients that assume servers will perform this step.
     */
    always_mkdir_parents?: boolean | null

    /** Number of days to retain AS2 messages (incoming and outgoing). */
    as2_message_retention_days?: number | null

    /**
     * If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
     */
    ask_about_overwrites?: boolean | null

    /** Do Bundle owners receive activity notifications? */
    bundle_activity_notifications?: 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null

    /** Site-wide Bundle expiration in days */
    bundle_expiration?: number | null

    /** Custom error message to show when bundle is not found. */
    bundle_not_found_message?: string | null

    /** Do Bundles require password protection? */
    bundle_password_required?: boolean | null

    /** If true, new Share Links created by a user with a primary group will default to that group as owner. */
    bundles_default_owned_by_primary_group?: boolean | null

    /** List of email domains to disallow when entering a Bundle/Inbox recipients */
    bundle_recipient_blacklist_domains?: string[] | null

    /** Disallow free email domains for Bundle/Inbox recipients? */
    bundle_recipient_blacklist_free_email_domains?: boolean | null

    /** Do Bundle owners receive registration notification? */
    bundle_registration_notifications?: 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null

    /** Do Bundles require registration? */
    bundle_require_registration?: boolean | null

    /** Do Bundles require recipients for sharing? */
    bundle_require_share_recipient?: boolean | null

    /**
     * If true, new Share Links must send a one-time password to the recipient when they register. Requires
     * bundle_require_share_recipient and cannot be enabled with bundle_password_required.
     */
    bundle_send_one_time_password_to_recipient_at_registration?: boolean | null

    /** Do Bundles require internal notes? */
    bundle_require_note?: boolean | null

    /** Do Bundle creators receive receipts of invitations? */
    bundle_send_shared_receipts?: boolean | null

    /** Do Bundle uploaders receive upload confirmation notifications? */
    bundle_upload_receipt_notifications?: 'never' | 'always' | 'per_bundle_setting' | Files.OtherString | null

    /** Preview watermark image applied to all bundle items. */
    bundle_watermark_attachment?: Image.Attributes | null

    /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
    bundle_watermark_value?: Site.BundleWatermarkValue | null

    /** Calculate CRC32 checksums for files? */
    calculate_file_checksums_crc32?: boolean | null

    /** Calculate MD5 checksums for files? */
    calculate_file_checksums_md5?: boolean | null

    /** Calculate SHA1 checksums for files? */
    calculate_file_checksums_sha1?: boolean | null

    /** Calculate SHA256 checksums for files? */
    calculate_file_checksums_sha256?: boolean | null

    /**
     * If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default
     * Workspace users and groups and grant them folder permissions and notifications on Child Site paths.
     */
    child_site_folder_admins_can_see_parent_site_directory?: boolean | null

    /**
     * If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users
     * and groups that have permissions in that Workspace and choose them as Email Notification recipients.
     */
    workspace_folder_admins_can_see_default_workspace_directory?: boolean | null

    /**
     * Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email
     * Automations in every Workspace on this site?
     */
    uploads_via_email_authentication?: boolean | null

    /** Page link and button color */
    color2_left?: string | null

    /** Top bar link color */
    color2_link?: string | null

    /** Page link and button color */
    color2_text?: string | null

    /** Top bar background color */
    color2_top?: string | null

    /** Top bar text color */
    color2_top_text?: string | null

    /** Site main contact name */
    contact_name?: string | null

    /** Time this site was created */
    created_at?: Files.DateTimeString | null

    /** Preferred currency */
    currency?: string | null

    /** Is this site using a custom namespace for users? */
    custom_namespace?: boolean | null

    /** Is WebDAV enabled? */
    dav_enabled?: boolean | null

    /** Use user FTP roots also for WebDAV? */
    dav_user_root_enabled?: boolean | null

    /** Number of days to keep deleted files */
    days_to_retain_backups?: number | null

    /** If true, allow public viewers of Bundles with full permissions to use document editing integrations. */
    document_edits_in_bundle_allowed?: boolean | null

    /** Site default time zone */
    default_time_zone?: string | null

    /** Is the desktop app enabled? */
    desktop_app?: boolean | null

    /** Is desktop app session IP pinning enabled? */
    desktop_app_session_ip_pinning?: boolean | null

    /** Desktop app session lifetime (in hours) */
    desktop_app_session_lifetime?: number | null

    /** Use legacy checksums mode? */
    legacy_checksums_mode?: boolean | null

    /** If true, we will migrate all remote server syncs to the new Sync model. */
    migrate_remote_server_sync_to_sync?: boolean | null

    /** Is OAuth DCR (dynamic client registration) for MCP enabled? */
    mcp_dcr_enabled?: boolean | null

    /** Is the mobile app enabled? */
    mobile_app?: boolean | null

    /** Is mobile app session IP pinning enabled? */
    mobile_app_session_ip_pinning?: boolean | null

    /** Mobile app session lifetime (in hours) */
    mobile_app_session_lifetime?: number | null

    /** Comma separated list of disallowed Country codes */
    disallowed_countries?: string | null

    /** If true, all AI features are disabled for this site. */
    disable_all_ai_features?: boolean | null

    /** If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain. */
    disable_files_certificate_generation?: boolean | null

    /** Are notifications disabled? */
    disable_notifications?: boolean | null

    /**
     * If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to
     * false; subscription filters and workspace access still control delivery.
     */
    file_activity_events_enabled?: boolean | null

    /** Is password reset disabled? */
    disable_password_reset?: boolean | null

    /** Custom domain */
    domain?: string | null

    /** Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain? */
    domain_hsts_header?: boolean | null

    /** Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026. */
    domain_letsencrypt_chain?: 'default' | 'isrg_root_x1' | 'dst_root_ca_x3' | Files.OtherString | null

    /** Main email for this site */
    email?: string | null

    /** Are FedRAMP security restrictions enabled for this site? */
    fedramp?: boolean | null

    /**
     * Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults
     * to true and applies to all keys and workspaces on this site. When false, new pairings and access through existing
     * connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with
     * usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
     */
    files_com_remote_server_enabled?: boolean | null

    /** Is FTP enabled? */
    ftp_enabled?: boolean | null

    /** Reply-to email for this site */
    reply_to_email?: string | null

    /**
     * If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be
     * managed via your SSO provider.
     */
    non_sso_groups_allowed?: boolean | null

    /**
     * If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed
     * via your SSO provider.
     */
    non_sso_users_allowed?: boolean | null

    /** If true, permissions for this site must be bound to a group (not a user). */
    folder_permissions_groups_only?: boolean | null

    /** Allow group admins to create users in their groups */
    group_admins_can_add_users?: boolean | null

    /** Allow group admins to add or remove existing users in their groups */
    group_admins_can_manage_group_memberships?: boolean | null

    /** Allow group admins to delete users in their groups */
    group_admins_can_delete_users?: boolean | null

    /** Allow group admins to enable or disable users in their groups */
    group_admins_can_enable_disable_users?: boolean | null

    /** Allow group admins to modify users in their groups */
    group_admins_can_modify_users?: boolean | null

    /** Allow group admins to exempt users in their groups from lifecycle rules */
    group_admins_can_bypass_user_lifecycle_rules?: boolean | null

    /** Allow group admins to reset passwords for users in their groups */
    group_admins_can_reset_passwords?: boolean | null

    /** Allow group admins to set password authentication method */
    group_admins_can_set_user_password?: boolean | null

    /** Is there a signed HIPAA BAA between Files.com and this site? */
    hipaa?: boolean | null

    /** Branded icon 128x128 */
    icon128?: Image.Attributes | null

    /** Branded icon 16x16 */
    icon16?: Image.Attributes | null

    /** Branded icon 32x32 */
    icon32?: Image.Attributes | null

    /** Branded icon 48x48 */
    icon48?: Image.Attributes | null

    /** Can files be modified? */
    immutable_files_set_at?: Files.DateTimeString | null

    /** Include password in emails to new users? */
    include_password_in_welcome_email?: boolean | null

    /** Site default language */
    language?: string | null

    /** Base DN for looking up users in LDAP server */
    ldap_base_dn?: string | null

    /** Domain name that will be appended to usernames */
    ldap_domain?: string | null

    /** Main LDAP setting: is LDAP enabled? */
    ldap_enabled?: boolean | null

    /** Should we sync groups from LDAP server? */
    ldap_group_action?: string | null

    /** Comma or newline separated list of group names (with optional wildcards) to exclude when syncing. */
    ldap_group_exclusion?: string | null

    /** Comma or newline separated list of group names (with optional wildcards) to include when syncing. */
    ldap_group_inclusion?: string | null

    /** LDAP host */
    ldap_host?: string | null

    /** LDAP backup host */
    ldap_host_2?: string | null

    /** LDAP backup host */
    ldap_host_3?: string | null

    /** LDAP port */
    ldap_port?: number | null

    /** Use secure LDAP? */
    ldap_secure?: boolean | null

    /**
     * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
     * `allow_any` disables certificate validation.
     */
    ldap_server_certificate?: string | null

    /** LDAP type */
    ldap_type?: string | null

    /** Should we sync users from LDAP server? */
    ldap_user_action?: string | null

    /**
     * Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these
     * groups will be added or synced.
     */
    ldap_user_include_groups?: string | null

    /** Username for signing in to LDAP server. */
    ldap_username?: string | null

    /** LDAP username field */
    ldap_username_field?: string | null

    /** Login help text */
    login_help_text?: string | null

    /** Branded logo */
    logo?: Image.Attributes | null

    /** Branded login page background */
    login_page_background_image?: Image.Attributes | null

    /** Number of prior passwords to disallow */
    max_prior_passwords?: number | null

    /**
     * Site settings managed by the parent site. Each key identifies a managed setting, with a null value. Non-secret
     * effective values are returned in their own Site settings fields.
     */
    managed_site_settings?: Files.JsonObject | null

    /** A message to show users when they connect via FTP or SFTP. */
    motd_text?: string | null

    /** Show message to users connecting via FTP */
    motd_use_for_ftp?: boolean | null

    /** Show message to users connecting via SFTP */
    motd_use_for_sftp?: boolean | null

    /** Next billing amount */
    next_billing_amount?: Files.DecimalString | null

    /** Next billing date */
    next_billing_date?: string | null

    /** If true, allows users to use a document editing integration. */
    office_integration_available?: boolean | null

    /** Which document editing integration to support. Files.com Editor or Microsoft Office for the Web. */
    office_integration_type?: 'only_office' | 'office_365' | 'disabled' | Files.OtherString | null

    /** Link to scheduling a meeting with our Sales team */
    oncehub_link?: string | null

    /** Use servers in the USA only? */
    opt_out_global?: boolean | null

    /** Is this site's billing overdue? */
    overdue?: boolean | null

    /** Shortest password length for users */
    password_min_length?: number | null

    /** Require a letter in passwords? */
    password_require_letter?: boolean | null

    /** Require lower and upper case letters in passwords? */
    password_require_mixed?: boolean | null

    /** Require a number in passwords? */
    password_require_number?: boolean | null

    /** Require special characters in password? */
    password_require_special?: boolean | null

    /** Require passwords that have not been previously breached? (see https://haveibeenpwned.com/) */
    password_require_unbreached?: boolean | null

    /**
     * Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same
     * requirements as users' passwords?
     */
    password_requirements_apply_to_bundles?: boolean | null

    /** Number of days password is valid */
    password_validity_days?: number | null

    /** Site phone number */
    phone?: string | null

    /**
     * If true, we will ensure that all internal communications with any remote server are made through the primary
     * region of the site. This setting overrides individual remote server settings.
     */
    pin_all_remote_servers_to_site_region?: boolean | null

    /**
     * If true, we will prevent non-administrators from receiving any permissions directly on the root folder. This is
     * commonly used to prevent the accidental application of permissions.
     */
    prevent_root_permissions_for_non_site_admins?: boolean | null

    /**
     * If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups
     * will be honored. Make sure that your current user is a member of a group with API permission when changing this
     * value to avoid locking yourself out of your site.
     */
    protocol_access_groups_only?: boolean | null

    /** Require two-factor authentication for all users? */
    require_2fa?: boolean | null

    /**
     * If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would
     * disable one.
     */
    restrict_root_folder_behaviors_to_site_admins?: boolean | null

    /**
     * If true, supported protective behaviors at the site root also apply within named workspaces. Requires
     * restrict_root_folder_behaviors_to_site_admins to be enabled.
     */
    root_folder_behaviors_apply_to_workspaces?: boolean | null

    /**
     * If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide
     * two-factor authentication requirement.
     */
    require_2fa_exempt_all_sso_users?: boolean | null

    /** If set, requirement for two-factor authentication has been scheduled to end on this date-time. */
    require_2fa_stop_time?: Files.DateTimeString | null

    /** Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period. */
    revoke_bundle_access_on_disable_or_delete?: boolean | null

    /**
     * What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
     */
    require_2fa_user_type?: 'all' | 'folder_and_site_admins' | 'site_admins' | Files.OtherString | null

    /**
     * If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user
     * logout and log back in every time they visit the page.
     */
    require_logout_from_bundles_and_inboxes?: boolean | null

    /** Current session */
    session?: Session.Attributes | null

    /**
     * Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false,
     * user and group S3 permissions do not allow access.
     */
    s3_compatible_endpoint_enabled?: boolean | null

    /** Is SFTP enabled? */
    sftp_enabled?: boolean | null

    /** Finalize partial SFTP uploads from interrupted connections? Default: true. */
    sftp_finalize_partial_uploads?: boolean | null

    /** Sftp Host Key Type */
    sftp_host_key_type?: 'default' | 'exavault' | 'custom' | 'smartfile' | Files.OtherString | null

    /** Id of the currently selected custom SFTP Host Key */
    active_sftp_host_key_id?: number | null

    /** Ids of the selected custom SFTP Host Keys */
    active_sftp_host_key_ids?: number[] | null

    /**
     * If true, we will allow weak and known insecure ciphers to be used for SFTP connections. Enabling this setting
     * severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
     */
    sftp_insecure_ciphers?: boolean | null

    /**
     * If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on
     * our secure list. This has the effect of making the cipher weaker than our normal threshold for security, but is
     * required to support certain legacy or broken SSH and MFT clients. Enabling this weakens security, but not nearly
     * as much as enabling the full `sftp_insecure_ciphers` option.
     */
    sftp_insecure_diffie_hellman?: boolean | null

    /** Use user FTP roots also for SFTP? */
    sftp_user_root_enabled?: boolean | null

    /** Allow bundle creation */
    sharing_enabled?: boolean | null

    /** Show log in link in user notifications? */
    show_user_notifications_log_in_link?: boolean | null

    /** Show request access link for users without access?  Currently unused. */
    show_request_access_link?: boolean | null

    /** Custom site footer text for authenticated pages */
    site_footer?: string | null

    /** Custom site header text for authenticated pages */
    site_header?: string | null

    /** Custom site footer text for public pages */
    site_public_footer?: string | null

    /** Custom site header text for public pages */
    site_public_header?: string | null

    /** SMTP server hostname or IP */
    smtp_address?: string | null

    /** SMTP server authentication type */
    smtp_authentication?: string | null

    /** From address to use when mailing through custom SMTP */
    smtp_from?: string | null

    /** SMTP server port */
    smtp_port?: number | null

    /**
     * Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials
     * and messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to
     * require unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication;
     * require_implicit uses TLS from connection start; never disables TLS. TLS verifies the server certificate against
     * smtp_address. Encryption is never automatically downgraded.
     */
    smtp_ssl?: 'if_available' | 'require' | 'require_implicit' | 'never' | Files.OtherString | null

    /** SMTP server username */
    smtp_username?: string | null

    /** Session expiry in minutes */
    session_expiry_minutes?: number | null

    /** Allow snapshot share links creation */
    snapshot_sharing_enabled?: boolean | null

    /** Is SSL required?  Disabling this is insecure. */
    ssl_required?: boolean | null

    /** Site subdomain */
    subdomain?: string | null

    /** If switching plans, when does the new plan take effect? */
    switch_to_plan_date?: Files.DateTimeString | null

    /** Number of days left in trial */
    trial_days_left?: number | null

    /** When does this Site trial expire? */
    trial_until?: Files.DateTimeString | null

    /** If using custom SMTP, should we use dedicated IPs to deliver emails? */
    use_dedicated_ips_for_smtp?: boolean | null

    /** Allow uploaders to set `provided_modified_at` for uploaded files? */
    use_provided_modified_at?: boolean | null

    /** User of current session */
    user?: User.Attributes | null

    /** Will users be locked out after incorrect login attempts? */
    user_lockout?: boolean | null

    /** How many hours to lock user out for failed password? */
    user_lockout_lock_period?: number | null

    /** Number of login tries within `user_lockout_within` hours before users are locked out */
    user_lockout_tries?: number | null

    /** Number of hours for user lockout window */
    user_lockout_within?: number | null

    /** Enable User Requests feature */
    user_requests_enabled?: boolean | null

    /** Send email to site admins when a user request is received? */
    user_requests_notify_admins?: boolean | null

    /** Allow users to create their own API keys? */
    users_can_create_api_keys?: boolean | null

    /** Allow users to create their own SSH keys? */
    users_can_create_ssh_keys?: boolean | null

    /**
     * How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`,
     * `full_name_company`, or `full_name_username_company`.
     */
    username_display?: 'username_only' | 'full_name_only' | 'full_name_username' | 'full_name_company' | 'full_name_username_company' | Files.OtherString | null

    /** Custom text send in user welcome email */
    welcome_custom_text?: string | null

    /**
     * Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like
     * %Y (4-digit year), %m (month), %d (day).
     */
    email_footer_custom_text?: string | null

    /** Include this email in welcome emails if enabled */
    welcome_email_cc?: string | null

    /** Include this email subject in welcome emails if enabled */
    welcome_email_subject?: string | null

    /** Will the welcome email be sent to new users? */
    welcome_email_enabled?: boolean | null

    /** Does the welcome screen appear? */
    welcome_screen?: 'enabled' | 'hidden' | 'disabled' | Files.OtherString | null

    /** Does FTP user Windows emulation mode? */
    windows_mode_ftp?: boolean | null
  }

  interface UpdateParams {
    /** Site name */
    name?: string

    /** Site subdomain */
    subdomain?: string

    /** Custom domain */
    domain?: string

    /** Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain? */
    domain_hsts_header?: boolean

    /** Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026. */
    domain_letsencrypt_chain?: string

    /** Main email for this site */
    email?: string

    /** Reply-to email for this site */
    reply_to_email?: string

    /** Are manual Bundle names allowed? */
    allow_bundle_names?: boolean

    /** Site-wide Bundle expiration in days */
    bundle_expiration?: number

    /** Will the welcome email be sent to new users? */
    welcome_email_enabled?: boolean

    /**
     * If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
     */
    ask_about_overwrites?: boolean

    /** Show request access link for users without access?  Currently unused. */
    show_request_access_link?: boolean

    /**
     * Create parent directories if they do not exist during uploads? This is primarily used to work around broken
     * upload clients that assume servers will perform this step.
     */
    always_mkdir_parents?: boolean

    /** Include this email in welcome emails if enabled */
    welcome_email_cc?: string

    /** Include this email subject in welcome emails if enabled */
    welcome_email_subject?: string

    /** Custom text send in user welcome email */
    welcome_custom_text?: string

    /** Site default language */
    language?: string

    /** Does FTP user Windows emulation mode? */
    windows_mode_ftp?: boolean

    /** Site default time zone */
    default_time_zone?: string

    /** Is the desktop app enabled? */
    desktop_app?: boolean

    /** Is desktop app session IP pinning enabled? */
    desktop_app_session_ip_pinning?: boolean

    /** Desktop app session lifetime (in hours) */
    desktop_app_session_lifetime?: number

    /** Is the mobile app enabled? */
    mobile_app?: boolean

    /** Is mobile app session IP pinning enabled? */
    mobile_app_session_ip_pinning?: boolean

    /** Mobile app session lifetime (in hours) */
    mobile_app_session_lifetime?: number

    /** If true, permissions for this site must be bound to a group (not a user). */
    folder_permissions_groups_only?: boolean

    /** Does the welcome screen appear? */
    welcome_screen?: string

    /** If true, allows users to use a document editing integration. */
    office_integration_available?: boolean

    /** Which document editing integration to support. Files.com Editor or Microsoft Office for the Web. */
    office_integration_type?: string

    /**
     * If true, we will ensure that all internal communications with any remote server are made through the primary
     * region of the site. This setting overrides individual remote server settings.
     */
    pin_all_remote_servers_to_site_region?: boolean

    /** A message to show users when they connect via FTP or SFTP. */
    motd_text?: string

    /** Show message to users connecting via FTP */
    motd_use_for_ftp?: boolean

    /** Show message to users connecting via SFTP */
    motd_use_for_sftp?: boolean

    /** Visibility settings for account navigation */
    left_navigation_visibility?: Files.JsonObject

    /** If true, all AI features are disabled for this site. */
    disable_all_ai_features?: boolean

    /**
     * Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins,
     * and all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group
     * in group_ids get access regardless of the other options. All availability options are additive: any enabled
     * option matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this
     * site, from any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not
     * affect other options. Disabling all AI features overrides these settings.
     */
    ai_feature_availability?: Files.JsonObject

    /** Is OAuth DCR (dynamic client registration) for MCP enabled? */
    mcp_dcr_enabled?: boolean

    /** Additional extensions that are considered text files */
    additional_text_file_types?: string[]

    /** Do Bundles require internal notes? */
    bundle_require_note?: boolean

    /** Do Bundle creators receive receipts of invitations? */
    bundle_send_shared_receipts?: boolean

    /** If true, new Share Links created by a user with a primary group will default to that group as owner. */
    bundles_default_owned_by_primary_group?: boolean

    /** Calculate CRC32 checksums for files? */
    calculate_file_checksums_crc32?: boolean

    /** Calculate MD5 checksums for files? */
    calculate_file_checksums_md5?: boolean

    /** Calculate SHA1 checksums for files? */
    calculate_file_checksums_sha1?: boolean

    /** Calculate SHA256 checksums for files? */
    calculate_file_checksums_sha256?: boolean

    /** Use legacy checksums mode? */
    legacy_checksums_mode?: boolean

    /** If true, we will migrate all remote server syncs to the new Sync model. */
    migrate_remote_server_sync_to_sync?: boolean

    /** Number of days to retain AS2 messages (incoming and outgoing). */
    as2_message_retention_days?: number

    /**
     * If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to
     * false; subscription filters and workspace access still control delivery.
     */
    file_activity_events_enabled?: boolean

    /**
     * How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`,
     * `full_name_company`, or `full_name_username_company`.
     */
    username_display?: string

    /** Session expiry in minutes */
    session_expiry_minutes?: number

    /** Is SSL required?  Disabling this is insecure. */
    ssl_required?: boolean

    /**
     * If true, we will allow weak and known insecure ciphers to be used for SFTP connections. Enabling this setting
     * severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
     */
    sftp_insecure_ciphers?: boolean

    /**
     * If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on
     * our secure list. This has the effect of making the cipher weaker than our normal threshold for security, but is
     * required to support certain legacy or broken SSH and MFT clients. Enabling this weakens security, but not nearly
     * as much as enabling the full `sftp_insecure_ciphers` option.
     */
    sftp_insecure_diffie_hellman?: boolean

    /** If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain. */
    disable_files_certificate_generation?: boolean

    /** Are FedRAMP security restrictions enabled for this site? */
    fedramp?: boolean

    /** Will users be locked out after incorrect login attempts? */
    user_lockout?: boolean

    /** Number of login tries within `user_lockout_within` hours before users are locked out */
    user_lockout_tries?: number

    /** Number of hours for user lockout window */
    user_lockout_within?: number

    /** How many hours to lock user out for failed password? */
    user_lockout_lock_period?: number

    /** Include password in emails to new users? */
    include_password_in_welcome_email?: boolean

    /** Comma separated list of allowed Country codes */
    allowed_countries?: string

    /** List of allowed IP addresses */
    allowed_ips?: string

    /** Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis? */
    allow_user_level_2fa_override?: boolean

    /** Allow the site-wide allowed IP restriction to be overriden on a per-user-basis? */
    allow_user_level_allowed_ip_override?: boolean

    /** Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis? */
    allow_user_level_ssl_override?: boolean

    /**
     * Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their
     * existing IP restrictions. Applies to all Workspaces. Defaults to false.
     */
    enforce_parent_site_user_ip_restrictions?: boolean

    /** Comma separated list of disallowed Country codes */
    disallowed_countries?: string

    /** Number of days to keep deleted files */
    days_to_retain_backups?: number

    /** Number of prior passwords to disallow */
    max_prior_passwords?: number

    /** Number of days password is valid */
    password_validity_days?: number

    /** Shortest password length for users */
    password_min_length?: number

    /** Require a letter in passwords? */
    password_require_letter?: boolean

    /** Require lower and upper case letters in passwords? */
    password_require_mixed?: boolean

    /** Require special characters in password? */
    password_require_special?: boolean

    /** Require a number in passwords? */
    password_require_number?: boolean

    /** Require passwords that have not been previously breached? (see https://haveibeenpwned.com/) */
    password_require_unbreached?: boolean

    /**
     * If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user
     * logout and log back in every time they visit the page.
     */
    require_logout_from_bundles_and_inboxes?: boolean

    /** Use user FTP roots also for WebDAV? */
    dav_user_root_enabled?: boolean

    /** Use user FTP roots also for SFTP? */
    sftp_user_root_enabled?: boolean

    /** Is password reset disabled? */
    disable_password_reset?: boolean

    /** Are files protected from modification? */
    immutable_files?: boolean

    /** Custom error message to show when bundle is not found. */
    bundle_not_found_message?: string

    /** Do Bundles require password protection? */
    bundle_password_required?: boolean

    /** Do Bundles require registration? */
    bundle_require_registration?: boolean

    /** Do Bundles require recipients for sharing? */
    bundle_require_share_recipient?: boolean

    /**
     * If true, new Share Links must send a one-time password to the recipient when they register. Requires
     * bundle_require_share_recipient and cannot be enabled with bundle_password_required.
     */
    bundle_send_one_time_password_to_recipient_at_registration?: boolean

    /** Do Bundle owners receive registration notification? */
    bundle_registration_notifications?: string

    /** Do Bundle owners receive activity notifications? */
    bundle_activity_notifications?: string

    /** Do Bundle uploaders receive upload confirmation notifications? */
    bundle_upload_receipt_notifications?: string

    /** If true, allow public viewers of Bundles with full permissions to use document editing integrations. */
    document_edits_in_bundle_allowed?: boolean

    /**
     * Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same
     * requirements as users' passwords?
     */
    password_requirements_apply_to_bundles?: boolean

    /**
     * If true, we will prevent non-administrators from receiving any permissions directly on the root folder. This is
     * commonly used to prevent the accidental application of permissions.
     */
    prevent_root_permissions_for_non_site_admins?: boolean

    /**
     * If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would
     * disable one.
     */
    restrict_root_folder_behaviors_to_site_admins?: boolean

    /**
     * If true, supported protective behaviors at the site root also apply within named workspaces. Requires
     * restrict_root_folder_behaviors_to_site_admins to be enabled.
     */
    root_folder_behaviors_apply_to_workspaces?: boolean

    /** Use servers in the USA only? */
    opt_out_global?: boolean

    /** Allow uploaders to set `provided_modified_at` for uploaded files? */
    use_provided_modified_at?: boolean

    /** Is this site using a custom namespace for users? */
    custom_namespace?: boolean

    /**
     * If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be
     * managed via your SSO provider.
     */
    non_sso_groups_allowed?: boolean

    /**
     * If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed
     * via your SSO provider.
     */
    non_sso_users_allowed?: boolean

    /** Allow bundle creation */
    sharing_enabled?: boolean

    /** Allow snapshot share links creation */
    snapshot_sharing_enabled?: boolean

    /** Enable User Requests feature */
    user_requests_enabled?: boolean

    /** Send email to site admins when a user request is received? */
    user_requests_notify_admins?: boolean

    /** Is WebDAV enabled? */
    dav_enabled?: boolean

    /**
     * Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults
     * to true and applies to all keys and workspaces on this site. When false, new pairings and access through existing
     * connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with
     * usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
     */
    files_com_remote_server_enabled?: boolean

    /** Is FTP enabled? */
    ftp_enabled?: boolean

    /**
     * Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false,
     * user and group S3 permissions do not allow access.
     */
    s3_compatible_endpoint_enabled?: boolean

    /** Is SFTP enabled? */
    sftp_enabled?: boolean

    /** Finalize partial SFTP uploads from interrupted connections? Default: true. */
    sftp_finalize_partial_uploads?: boolean

    /** Allow users to create their own API keys? */
    users_can_create_api_keys?: boolean

    /** Allow users to create their own SSH keys? */
    users_can_create_ssh_keys?: boolean

    /** Show log in link in user notifications? */
    show_user_notifications_log_in_link?: boolean

    /** Sftp Host Key Type */
    sftp_host_key_type?: string

    /** Id of the currently selected custom SFTP Host Key */
    active_sftp_host_key_id?: number

    /** Ids of the selected custom SFTP Host Keys */
    active_sftp_host_key_ids?: number[]

    /**
     * If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups
     * will be honored. Make sure that your current user is a member of a group with API permission when changing this
     * value to avoid locking yourself out of your site.
     */
    protocol_access_groups_only?: boolean

    /** Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period. */
    revoke_bundle_access_on_disable_or_delete?: boolean

    /** Allow group admins to create users in their groups */
    group_admins_can_add_users?: boolean

    /** Allow group admins to add or remove existing users in their groups */
    group_admins_can_manage_group_memberships?: boolean

    /** Allow group admins to delete users in their groups */
    group_admins_can_delete_users?: boolean

    /** Allow group admins to enable or disable users in their groups */
    group_admins_can_enable_disable_users?: boolean

    /** Allow group admins to modify users in their groups */
    group_admins_can_modify_users?: boolean

    /** Allow group admins to exempt users in their groups from lifecycle rules */
    group_admins_can_bypass_user_lifecycle_rules?: boolean

    /** Allow group admins to reset passwords for users in their groups */
    group_admins_can_reset_passwords?: boolean

    /** Allow group admins to set password authentication method */
    group_admins_can_set_user_password?: boolean

    /**
     * If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default
     * Workspace users and groups and grant them folder permissions and notifications on Child Site paths.
     */
    child_site_folder_admins_can_see_parent_site_directory?: boolean

    /**
     * If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users
     * and groups that have permissions in that Workspace and choose them as Email Notification recipients.
     */
    workspace_folder_admins_can_see_default_workspace_directory?: boolean

    /** Disallow free email domains for Bundle/Inbox recipients? */
    bundle_recipient_blacklist_free_email_domains?: boolean

    /** List of email domains to disallow when entering a Bundle/Inbox recipients */
    bundle_recipient_blacklist_domains?: string[]

    /** Allow admins to bypass the locked subfolders setting. */
    admins_bypass_locked_subfolders?: boolean

    /** Is SMS two factor authentication allowed? */
    allowed_2fa_method_sms?: boolean

    /** Is TOTP two factor authentication allowed? */
    allowed_2fa_method_totp?: boolean

    /** Is WebAuthn two factor authentication allowed? */
    allowed_2fa_method_webauthn?: boolean

    /** Is yubikey two factor authentication allowed? */
    allowed_2fa_method_yubi?: boolean

    /** Is OTP via email two factor authentication allowed? */
    allowed_2fa_method_email?: boolean

    /** Is OTP via static codes for two factor authentication allowed? */
    allowed_2fa_method_static?: boolean

    /** Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV? */
    allowed_2fa_method_bypass_for_ftp_sftp_dav?: boolean

    /** Require two-factor authentication for all users? */
    require_2fa?: boolean

    /**
     * If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide
     * two-factor authentication requirement.
     */
    require_2fa_exempt_all_sso_users?: boolean

    /**
     * What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
     */
    require_2fa_user_type?: string

    /** Top bar background color */
    color2_top?: string

    /** Page link and button color */
    color2_left?: string

    /** Top bar link color */
    color2_link?: string

    /** Page link and button color */
    color2_text?: string

    /** Top bar text color */
    color2_top_text?: string

    /** Custom site header text for authenticated pages */
    site_header?: string

    /** Custom site footer text for authenticated pages */
    site_footer?: string

    /** Custom site header text for public pages */
    site_public_header?: string

    /** Custom site footer text for public pages */
    site_public_footer?: string

    /** Login help text */
    login_help_text?: string

    /** If using custom SMTP, should we use dedicated IPs to deliver emails? */
    use_dedicated_ips_for_smtp?: boolean

    /**
     * Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like
     * %Y (4-digit year), %m (month), %d (day).
     */
    email_footer_custom_text?: string

    /** SMTP server hostname or IP */
    smtp_address?: string

    /** SMTP server authentication type */
    smtp_authentication?: string

    /** From address to use when mailing through custom SMTP */
    smtp_from?: string

    /** SMTP server username */
    smtp_username?: string

    /** SMTP server port */
    smtp_port?: number

    /**
     * Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials
     * and messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to
     * require unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication;
     * require_implicit uses TLS from connection start; never disables TLS. TLS verifies the server certificate against
     * smtp_address. Encryption is never automatically downgraded.
     */
    smtp_ssl?: string

    /** Main LDAP setting: is LDAP enabled? */
    ldap_enabled?: boolean

    /** LDAP type */
    ldap_type?: string

    /** LDAP host */
    ldap_host?: string

    /** LDAP backup host */
    ldap_host_2?: string

    /** LDAP backup host */
    ldap_host_3?: string

    /** LDAP port */
    ldap_port?: number

    /** Use secure LDAP? */
    ldap_secure?: boolean

    /**
     * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
     * `allow_any` disables certificate validation.
     */
    ldap_server_certificate?: string

    /** Username for signing in to LDAP server. */
    ldap_username?: string

    /** LDAP username field */
    ldap_username_field?: string

    /** Domain name that will be appended to usernames */
    ldap_domain?: string

    /** Should we sync users from LDAP server? */
    ldap_user_action?: string

    /** Should we sync groups from LDAP server? */
    ldap_group_action?: string

    /**
     * Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these
     * groups will be added or synced.
     */
    ldap_user_include_groups?: string

    /** Comma or newline separated list of group names (with optional wildcards) to exclude when syncing. */
    ldap_group_exclusion?: string

    /** Comma or newline separated list of group names (with optional wildcards) to include when syncing. */
    ldap_group_inclusion?: string

    /** Base DN for looking up users in LDAP server */
    ldap_base_dn?: string

    /**
     * Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email
     * Automations in every Workspace on this site?
     */
    uploads_via_email_authentication?: boolean

    /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
    bundle_watermark_value?: Site.BundleWatermarkValue

    icon16_file?: Attachment

    /** If true, will delete the file stored in icon16 */
    icon16_delete?: boolean

    icon32_file?: Attachment

    /** If true, will delete the file stored in icon32 */
    icon32_delete?: boolean

    icon48_file?: Attachment

    /** If true, will delete the file stored in icon48 */
    icon48_delete?: boolean

    icon128_file?: Attachment

    /** If true, will delete the file stored in icon128 */
    icon128_delete?: boolean

    logo_file?: Attachment

    /** If true, will delete the file stored in logo */
    logo_delete?: boolean

    bundle_watermark_attachment_file?: Attachment

    /** If true, will delete the file stored in bundle_watermark_attachment */
    bundle_watermark_attachment_delete?: boolean

    login_page_background_image_file?: Attachment

    /** If true, will delete the file stored in login_page_background_image */
    login_page_background_image_delete?: boolean

    /** If set to true, we will begin the process of disabling 2FA on this site. */
    disable_2fa_with_delay?: boolean

    /** New LDAP password. */
    ldap_password_change?: string

    /** Confirm new LDAP password. */
    ldap_password_change_confirmation?: string

    /**
     * If true, and if changing the site subdomain, then create a redirect from the previous Files.com subdomain to the
     * new Files.com subdomain.
     */
    redirect_old_subdomain?: boolean

    /** Password for SMTP server. */
    smtp_password?: string
  }

  /** Share Link watermark settings */
  interface BundleWatermarkValue {
    /**
     * Where to locate the watermark? Valid values: `Center`, `East`, `NorthEast`, `North`, `NorthWest`, `SouthEast`,
     * `South`, `SouthWest`, `West`.
     */
    gravity?: 'Center' | 'East' | 'NorthEast' | 'North' | 'NorthWest' | 'SouthEast' | 'South' | 'SouthWest' | 'West'

    /** Max width/height as percent of image preview. */
    max_height_or_width?: number

    /** Percentage applied to the watermark. */
    transparency?: number

    /** Watermark text. Use {{user}} to embed a username into the string. */
    dynamic_text?: string
  }
}

export = Site
