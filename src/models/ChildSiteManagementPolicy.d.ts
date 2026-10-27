import Files from '../Files'

/**
 * A Child Site Management Policy is a centralized policy defined by a parent site to enforce consistent configurations
 * across child sites.
 */
declare class ChildSiteManagementPolicy {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ChildSiteManagementPolicy.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ChildSiteManagementPolicy.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Policy ID. */
  readonly id?: number | null

  /** Type of policy.  Valid values: `settings`. */
  readonly policy_type?: 'settings' | Files.OtherString | null

  /** Name for this policy. */
  readonly name?: string | null

  /** Description for this policy. */
  readonly description?: string | null

  /**
   * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies
   * accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites.
   * For more information, refer to the Value Hash section of the developer documentation.
   */
  readonly value?: ChildSiteManagementPolicy.Value | null

  /** IDs of child sites that this policy has been applied to. This field is read-only. */
  readonly applied_child_site_ids?: number[] | null

  /** IDs of child sites excluded from this default policy. */
  readonly skip_child_site_ids?: number[] | null

  /** IDs of child sites explicitly assigned to this non-default policy. */
  readonly child_site_ids?: number[] | null

  /** Whether this policy applies to child sites not explicitly assigned to another policy. */
  readonly default_policy?: boolean | null

  /** When this policy was created. */
  readonly created_at?: Files.DateTimeString | null

  /** When this policy was last updated. */
  readonly updated_at?: Files.DateTimeString | null

  /** Policy ID. */
  getId(): number | null | undefined

  /** Type of policy.  Valid values: `settings`. */
  getPolicyType(): 'settings' | Files.OtherString | null | undefined

  /** Name for this policy. */
  getName(): string | null | undefined

  /** Description for this policy. */
  getDescription(): string | null | undefined

  /**
   * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies
   * accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites.
   * For more information, refer to the Value Hash section of the developer documentation.
   */
  getValue(): ChildSiteManagementPolicy.Value | null | undefined

  /** IDs of child sites that this policy has been applied to. This field is read-only. */
  getAppliedChildSiteIds(): number[] | null | undefined

  /** IDs of child sites excluded from this default policy. */
  getSkipChildSiteIds(): number[] | null | undefined

  /** IDs of child sites explicitly assigned to this non-default policy. */
  getChildSiteIds(): number[] | null | undefined

  /** Whether this policy applies to child sites not explicitly assigned to another policy. */
  getDefaultPolicy(): boolean | null | undefined

  /** When this policy was created. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** When this policy was last updated. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Policy ID. */
  setId(value: number): void

  /** Type of policy.  Valid values: `settings`. */
  setPolicyType(value: 'settings'): void

  /** Name for this policy. */
  setName(value: string): void

  /** Description for this policy. */
  setDescription(value: string): void

  /**
   * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies
   * accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites.
   * For more information, refer to the Value Hash section of the developer documentation.
   */
  setValue(value: ChildSiteManagementPolicy.Value): void

  /** IDs of child sites that this policy has been applied to. This field is read-only. */
  setAppliedChildSiteIds(value: number[]): void

  /** IDs of child sites excluded from this default policy. */
  setSkipChildSiteIds(value: number[]): void

  /** IDs of child sites explicitly assigned to this non-default policy. */
  setChildSiteIds(value: number[]): void

  /** Whether this policy applies to child sites not explicitly assigned to another policy. */
  setDefaultPolicy(value: boolean): void

  /** Update Child Site Management Policy */
  update(params?: ChildSiteManagementPolicy.UpdateParams): Promise<this>

  /** Delete Child Site Management Policy */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /**
   * List Child Site Management Policies. On a Child Site, returns only the policy covering that site. Its value
   * contains managed setting names with null values
   */
  static list(params?: ChildSiteManagementPolicy.ListParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy[]>

  /** Alias of `list()`. */
  static all(params?: ChildSiteManagementPolicy.ListParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ChildSiteManagementPolicy.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ChildSiteManagementPolicy>

  /**
   * Show Child Site Management Policy
   * @param id - Child Site Management Policy ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy>

  /** Create Child Site Management Policy */
  static create(params: ChildSiteManagementPolicy.CreateParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy>
}

declare namespace ChildSiteManagementPolicy {
  /** The fields of `ChildSiteManagementPolicy` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Policy ID. */
    id?: number | null

    /** Type of policy.  Valid values: `settings`. */
    policy_type?: 'settings' | Files.OtherString | null

    /** Name for this policy. */
    name?: string | null

    /** Description for this policy. */
    description?: string | null

    /**
     * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings
     * policies accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on
     * child sites. For more information, refer to the Value Hash section of the developer documentation.
     */
    value?: ChildSiteManagementPolicy.Value | null

    /** IDs of child sites that this policy has been applied to. This field is read-only. */
    applied_child_site_ids?: number[] | null

    /** IDs of child sites excluded from this default policy. */
    skip_child_site_ids?: number[] | null

    /** IDs of child sites explicitly assigned to this non-default policy. */
    child_site_ids?: number[] | null

    /** Whether this policy applies to child sites not explicitly assigned to another policy. */
    default_policy?: boolean | null

    /** When this policy was created. */
    created_at?: Files.DateTimeString | null

    /** When this policy was last updated. */
    updated_at?: Files.DateTimeString | null
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
  }

  interface CreateParams {
    /**
     * Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash
     * section of the developer documentation.
     */
    value?: ChildSiteManagementPolicy.Value

    /** IDs of child sites excluded from this default policy. */
    skip_child_site_ids?: number[]

    /** IDs of child sites explicitly assigned to this non-default policy. */
    child_site_ids?: number[]

    /** Whether this policy applies to child sites not explicitly assigned to another policy. */
    default_policy?: boolean

    /** Type of policy.  Valid values: `settings`. */
    policy_type: 'settings'

    /** Name for this policy. */
    name?: string

    /** Description for this policy. */
    description?: string
  }

  interface UpdateParams {
    /**
     * Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash
     * section of the developer documentation.
     */
    value?: ChildSiteManagementPolicy.Value

    /** IDs of child sites excluded from this default policy. */
    skip_child_site_ids?: number[]

    /** IDs of child sites explicitly assigned to this non-default policy. */
    child_site_ids?: number[]

    /** Whether this policy applies to child sites not explicitly assigned to another policy. */
    default_policy?: boolean

    /** Type of policy.  Valid values: `settings`. */
    policy_type?: 'settings'

    /** Name for this policy. */
    name?: string

    /** Description for this policy. */
    description?: string
  }

  /**
   * Site settings and root folder behaviors that a settings policy manages on applicable Child Sites. On the parent
   * site, values follow the same validation as Site settings and Behaviors, so a setting can be null only where that
   * Site setting accepts null. Older policies may hold boolean and integer settings as strings, such as `"false"` or
   * `"30"`. Child sites receive the converted value. Unsupported keys are removed when the policy is saved. When
   * policies are listed from a Child Site, the values are hidden: each managed key is present with a null value,
   * whatever its type on the parent site.
   */
  interface Value {
    /** Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain? */
    domain_hsts_header?: boolean | null

    /** Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026. */
    domain_letsencrypt_chain?: 'default' | 'isrg_root_x1' | 'dst_root_ca_x3' | null

    /** Main email for this site */
    email?: string | null

    /** Reply-to email for this site */
    reply_to_email?: string | null

    /** Are manual Bundle names allowed? */
    allow_bundle_names?: boolean | null

    /** Site-wide Bundle expiration in days */
    bundle_expiration?: number | null

    /** Will the welcome email be sent to new users? */
    welcome_email_enabled?: boolean | null

    /**
     * If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
     */
    ask_about_overwrites?: boolean | null

    /**
     * Create parent directories if they do not exist during uploads? This is primarily used to work around broken
     * upload clients that assume servers will perform this step.
     */
    always_mkdir_parents?: boolean | null

    /** Include this email in welcome emails if enabled */
    welcome_email_cc?: string | null

    /** Include this email subject in welcome emails if enabled */
    welcome_email_subject?: string | null

    /** Custom text send in user welcome email */
    welcome_custom_text?: string | null

    /** Site default language */
    language?: string | null

    /** Does FTP user Windows emulation mode? */
    windows_mode_ftp?: boolean | null

    /** Site default time zone */
    default_time_zone?: string | null

    /** Is the desktop app enabled? */
    desktop_app?: boolean | null

    /** Is desktop app session IP pinning enabled? */
    desktop_app_session_ip_pinning?: boolean | null

    /** Desktop app session lifetime (in hours) */
    desktop_app_session_lifetime?: number | null

    /** Is the mobile app enabled? */
    mobile_app?: boolean | null

    /** Is mobile app session IP pinning enabled? */
    mobile_app_session_ip_pinning?: boolean | null

    /** Mobile app session lifetime (in hours) */
    mobile_app_session_lifetime?: number | null

    /** If true, permissions for this site must be bound to a group (not a user). */
    folder_permissions_groups_only?: boolean | null

    /** If true, allows users to use a document editing integration. */
    office_integration_available?: boolean | null

    /** Which document editing integration to support. Files.com Editor or Microsoft Office for the Web. */
    office_integration_type?: 'only_office' | 'office_365' | 'disabled' | null

    /**
     * If true, we will ensure that all internal communications with any remote server are made through the primary
     * region of the site. This setting overrides individual remote server settings.
     */
    pin_all_remote_servers_to_site_region?: boolean | null

    /** A message to show users when they connect via FTP or SFTP. */
    motd_text?: string | null

    /** Show message to users connecting via FTP */
    motd_use_for_ftp?: boolean | null

    /** Show message to users connecting via SFTP */
    motd_use_for_sftp?: boolean | null

    /** Visibility settings for account navigation */
    left_navigation_visibility?: {
      sharing: {
        /** If true, site admins see this section. */
        admin: boolean

        /** If true, every user sees this section. Requires `admin` to be true. */
        all: boolean
      }
      automation_flow: {
        /** If true, site admins see this section. */
        admin: boolean

        /** If true, every user sees this section. Requires `admin` to be true. */
        all: boolean
      }
      integrations: {
        /** If true, site admins see this section. */
        admin: boolean

        /** If true, every user sees this section. Requires `admin` to be true. */
        all: boolean
      }
      clients_protocols: {
        /** If true, site admins see this section. */
        admin: boolean

        /** If true, every user sees this section. Requires `admin` to be true. */
        all: boolean
      }
    } | null

    /** If true, all AI features are disabled for this site. */
    disable_all_ai_features?: boolean | null

    /**
     * Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins,
     * and all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group
     * in group_ids get access regardless of the other options. All availability options are additive: any enabled
     * option matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this
     * site, from any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not
     * affect other options. Disabling all AI features overrides these settings.
     */
    ai_feature_availability?: {
      /**
       * Options are additive: any enabled option that matches the user grants access. Disabling all AI features
       * overrides these options.
       */
      in_app_ai_assistant: ChildSiteManagementPolicy.Value.FeatureAvailability
    } | null

    /** Is OAuth DCR (dynamic client registration) for MCP enabled? */
    mcp_dcr_enabled?: boolean | null

    /** Additional extensions that are considered text files */
    additional_text_file_types?: string[] | null

    /** Do Bundles require internal notes? */
    bundle_require_note?: boolean | null

    /** Do Bundle creators receive receipts of invitations? */
    bundle_send_shared_receipts?: boolean | null

    /** If true, new Share Links created by a user with a primary group will default to that group as owner. */
    bundles_default_owned_by_primary_group?: boolean | null

    /** Calculate CRC32 checksums for files? */
    calculate_file_checksums_crc32?: boolean | null

    /** Calculate MD5 checksums for files? */
    calculate_file_checksums_md5?: boolean | null

    /** Calculate SHA1 checksums for files? */
    calculate_file_checksums_sha1?: boolean | null

    /** Calculate SHA256 checksums for files? */
    calculate_file_checksums_sha256?: boolean | null

    /** If true, we will migrate all remote server syncs to the new Sync model. */
    migrate_remote_server_sync_to_sync?: boolean | null

    /** Number of days to retain AS2 messages (incoming and outgoing). */
    as2_message_retention_days?: number | null

    /**
     * If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to
     * false; subscription filters and workspace access still control delivery.
     */
    file_activity_events_enabled?: boolean | null

    /**
     * How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`,
     * `full_name_company`, or `full_name_username_company`.
     */
    username_display?: 'username_only' | 'full_name_only' | 'full_name_username' | 'full_name_company' | 'full_name_username_company' | null

    /** Session expiry in minutes */
    session_expiry_minutes?: number | null

    /** Is SSL required?  Disabling this is insecure. */
    ssl_required?: boolean | null

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

    /** Are FedRAMP security restrictions enabled for this site? */
    fedramp?: boolean | null

    /** Will users be locked out after incorrect login attempts? */
    user_lockout?: boolean | null

    /** Number of login tries within `user_lockout_within` hours before users are locked out */
    user_lockout_tries?: number | null

    /** Number of hours for user lockout window */
    user_lockout_within?: number | null

    /** How many hours to lock user out for failed password? */
    user_lockout_lock_period?: number | null

    /** Include password in emails to new users? */
    include_password_in_welcome_email?: boolean | null

    /** Comma separated list of allowed Country codes */
    allowed_countries?: string | null

    /** List of allowed IP addresses */
    allowed_ips?: string | null

    /** Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis? */
    allow_user_level_2fa_override?: boolean | null

    /** Allow the site-wide allowed IP restriction to be overriden on a per-user-basis? */
    allow_user_level_allowed_ip_override?: boolean | null

    /** Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis? */
    allow_user_level_ssl_override?: boolean | null

    /**
     * Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their
     * existing IP restrictions. Applies to all Workspaces. Defaults to false.
     */
    enforce_parent_site_user_ip_restrictions?: boolean | null

    /** Comma separated list of disallowed Country codes */
    disallowed_countries?: string | null

    /** Number of days to keep deleted files */
    days_to_retain_backups?: number | null

    /** Number of prior passwords to disallow */
    max_prior_passwords?: number | null

    /** Number of days password is valid */
    password_validity_days?: number | null

    /** Shortest password length for users */
    password_min_length?: number | null

    /** Require a letter in passwords? */
    password_require_letter?: boolean | null

    /** Require lower and upper case letters in passwords? */
    password_require_mixed?: boolean | null

    /** Require special characters in password? */
    password_require_special?: boolean | null

    /** Require a number in passwords? */
    password_require_number?: boolean | null

    /** Require passwords that have not been previously breached? (see https://haveibeenpwned.com/) */
    password_require_unbreached?: boolean | null

    /**
     * If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user
     * logout and log back in every time they visit the page.
     */
    require_logout_from_bundles_and_inboxes?: boolean | null

    /** Use user FTP roots also for WebDAV? */
    dav_user_root_enabled?: boolean | null

    /** Use user FTP roots also for SFTP? */
    sftp_user_root_enabled?: boolean | null

    /** Is password reset disabled? */
    disable_password_reset?: boolean | null

    /** Are files protected from modification? */
    immutable_files?: boolean | null

    /** Custom error message to show when bundle is not found. */
    bundle_not_found_message?: string | null

    /** Do Bundles require password protection? */
    bundle_password_required?: boolean | null

    /** Do Bundles require registration? */
    bundle_require_registration?: boolean | null

    /** Do Bundles require recipients for sharing? */
    bundle_require_share_recipient?: boolean | null

    /**
     * If true, new Share Links must send a one-time password to the recipient when they register. Requires
     * bundle_require_share_recipient and cannot be enabled with bundle_password_required.
     */
    bundle_send_one_time_password_to_recipient_at_registration?: boolean | null

    /** Do Bundle owners receive registration notification? */
    bundle_registration_notifications?: 'never' | 'always' | 'per_bundle_setting' | null

    /** Do Bundle owners receive activity notifications? */
    bundle_activity_notifications?: 'never' | 'always' | 'per_bundle_setting' | null

    /** Do Bundle uploaders receive upload confirmation notifications? */
    bundle_upload_receipt_notifications?: 'never' | 'always' | 'per_bundle_setting' | null

    /** If true, allow public viewers of Bundles with full permissions to use document editing integrations. */
    document_edits_in_bundle_allowed?: boolean | null

    /**
     * Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same
     * requirements as users' passwords?
     */
    password_requirements_apply_to_bundles?: boolean | null

    /**
     * If true, we will prevent non-administrators from receiving any permissions directly on the root folder. This is
     * commonly used to prevent the accidental application of permissions.
     */
    prevent_root_permissions_for_non_site_admins?: boolean | null

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

    /** Use servers in the USA only? */
    opt_out_global?: boolean | null

    /** Allow uploaders to set `provided_modified_at` for uploaded files? */
    use_provided_modified_at?: boolean | null

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

    /** Allow bundle creation */
    sharing_enabled?: boolean | null

    /** Allow snapshot share links creation */
    snapshot_sharing_enabled?: boolean | null

    /** Enable User Requests feature */
    user_requests_enabled?: boolean | null

    /** Send email to site admins when a user request is received? */
    user_requests_notify_admins?: boolean | null

    /** Is WebDAV enabled? */
    dav_enabled?: boolean | null

    /**
     * Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults
     * to true and applies to all keys and workspaces on this site. When false, new pairings and access through existing
     * connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with
     * usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
     */
    files_com_remote_server_enabled?: boolean | null

    /** Is FTP enabled? */
    ftp_enabled?: boolean | null

    /**
     * Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false,
     * user and group S3 permissions do not allow access.
     */
    s3_compatible_endpoint_enabled?: boolean | null

    /** Is SFTP enabled? */
    sftp_enabled?: boolean | null

    /** Finalize partial SFTP uploads from interrupted connections? Default: true. */
    sftp_finalize_partial_uploads?: boolean | null

    /** Allow users to create their own API keys? */
    users_can_create_api_keys?: boolean | null

    /** Allow users to create their own SSH keys? */
    users_can_create_ssh_keys?: boolean | null

    /** Show log in link in user notifications? */
    show_user_notifications_log_in_link?: boolean | null

    /** Sftp Host Key Type */
    sftp_host_key_type?: 'default' | 'exavault' | 'custom' | 'smartfile' | null

    /** Id of the currently selected custom SFTP Host Key */
    active_sftp_host_key_id?: number | null

    /** Ids of the selected custom SFTP Host Keys */
    active_sftp_host_key_ids?: number[] | null

    /**
     * If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups
     * will be honored. Make sure that your current user is a member of a group with API permission when changing this
     * value to avoid locking yourself out of your site.
     */
    protocol_access_groups_only?: boolean | null

    /** Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period. */
    revoke_bundle_access_on_disable_or_delete?: boolean | null

    /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
    bundle_watermark_value?: {
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
    } | null

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

    /** Disallow free email domains for Bundle/Inbox recipients? */
    bundle_recipient_blacklist_free_email_domains?: boolean | null

    /** List of email domains to disallow when entering a Bundle/Inbox recipients */
    bundle_recipient_blacklist_domains?: string[] | null

    /** Allow admins to bypass the locked subfolders setting. */
    admins_bypass_locked_subfolders?: boolean | null

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

    /** Require two-factor authentication for all users? */
    require_2fa?: boolean | null

    /**
     * If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide
     * two-factor authentication requirement.
     */
    require_2fa_exempt_all_sso_users?: boolean | null

    /**
     * What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
     */
    require_2fa_user_type?: 'all' | 'folder_and_site_admins' | 'site_admins' | null

    /** Top bar background color */
    color2_top?: string | null

    /** Page link and button color */
    color2_left?: string | null

    /** Top bar link color */
    color2_link?: string | null

    /** Page link and button color */
    color2_text?: string | null

    /** Top bar text color */
    color2_top_text?: string | null

    /** Custom site header text for authenticated pages */
    site_header?: string | null

    /** Custom site footer text for authenticated pages */
    site_footer?: string | null

    /** Custom site header text for public pages */
    site_public_header?: string | null

    /** Custom site footer text for public pages */
    site_public_footer?: string | null

    /** Login help text */
    login_help_text?: string | null

    /** If using custom SMTP, should we use dedicated IPs to deliver emails? */
    use_dedicated_ips_for_smtp?: boolean | null

    /**
     * Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like
     * %Y (4-digit year), %m (month), %d (day).
     */
    email_footer_custom_text?: string | null

    /** SMTP server hostname or IP */
    smtp_address?: string | null

    /** SMTP server authentication type */
    smtp_authentication?: string | null

    /** From address to use when mailing through custom SMTP */
    smtp_from?: string | null

    /** SMTP server username */
    smtp_username?: string | null

    /** Setting: Smtp password */
    smtp_password?: string | null

    /** SMTP server port */
    smtp_port?: number | null

    /**
     * Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials
     * and messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to
     * require unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication;
     * require_implicit uses TLS from connection start; never disables TLS. TLS verifies the server certificate against
     * smtp_address. Encryption is never automatically downgraded.
     */
    smtp_ssl?: 'if_available' | 'require' | 'require_implicit' | 'never' | null

    /** Main LDAP setting: is LDAP enabled? */
    ldap_enabled?: boolean | null

    /** LDAP type */
    ldap_type?: string | null

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

    /** Username for signing in to LDAP server. */
    ldap_username?: string | null

    /** LDAP username field */
    ldap_username_field?: string | null

    /** Domain name that will be appended to usernames */
    ldap_domain?: string | null

    /** Should we sync users from LDAP server? */
    ldap_user_action?: string | null

    /** Should we sync groups from LDAP server? */
    ldap_group_action?: string | null

    /**
     * Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these
     * groups will be added or synced.
     */
    ldap_user_include_groups?: string | null

    /** Comma or newline separated list of group names (with optional wildcards) to exclude when syncing. */
    ldap_group_exclusion?: string | null

    /** Comma or newline separated list of group names (with optional wildcards) to include when syncing. */
    ldap_group_inclusion?: string | null

    /** Base DN for looking up users in LDAP server */
    ldap_base_dn?: string | null

    /** Setting: Ldap password change */
    ldap_password_change?: string | null

    /** Setting: Ldap password change confirmation */
    ldap_password_change_confirmation?: string | null

    /**
     * Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email
     * Automations in every Workspace on this site?
     */
    uploads_via_email_authentication?: boolean | null

    /**
     * Root folder behaviors to configure and manage on applicable child sites. Currently available behavior types:
     * malware_scanning, file_expiration, limit_file_extensions, limit_file_regex.
     */
    folder_behaviors?: Array<{
      /** Behavior type. Each behavior type can appear once. */
      behavior: 'malware_scanning'

      /** Behavior value. Its fields match the value of a Behavior of this type. */
      value: ChildSiteManagementPolicy.Value.MalwareScanning
    } | {
      /** Behavior type. Each behavior type can appear once. */
      behavior: 'file_expiration'

      /** Behavior value. Its fields match the value of a Behavior of this type. */
      value: ChildSiteManagementPolicy.Value.FileExpiration
    } | {
      /** Behavior type. Each behavior type can appear once. */
      behavior: 'limit_file_extensions'

      /** Behavior value. Its fields match the value of a Behavior of this type. */
      value: ChildSiteManagementPolicy.Value.LimitFileExtensions
    } | {
      /** Behavior type. Each behavior type can appear once. */
      behavior: 'limit_file_regex'

      /** Behavior value. Its fields match the value of a Behavior of this type. */
      value: ChildSiteManagementPolicy.Value.LimitFileRegex
    }> | null
  }

  namespace Value {
    /** Malware scanning value */
    type MalwareScanning = { [key: string]: never }

    /** File expiration value */
    interface FileExpiration {
      /** Number of days to keep files around. */
      days_to_retain: number

      /**
       * If `true`, delete empty folders inside this tree after expired files are removed. Folders with explicit
       * configuration, such as permissions, notifications, or behaviors, are preserved.
       * @defaultValue false
       */
      delete_empty_folders?: boolean
    }

    /** Limit file extensions value */
    interface LimitFileExtensions {
      /** Array of whitelisted/blacklisted file extensions, depending on `mode`. */
      extensions: string[]

      /**
       * Controls whether the behavior acts as a whitelist or as a blacklist. Default is `whitelist`.
       * @defaultValue 'whitelist'
       */
      mode?: 'whitelist' | 'blacklist'
    }

    /** Single-element Array (not a hash) containing the regular expression, which must start and end with slashes. */
    type LimitFileRegex = string[]

    /**
     * Options are additive: any enabled option that matches the user grants access. Disabling all AI features overrides
     * these options.
     */
    interface FeatureAvailability {
      /** If true, site admins have access. Null disables the option. */
      site_admins: ChildSiteManagementPolicy.Value.Enabled

      /** If true, workspace admins have access. Null disables the option. */
      workspace_admins: ChildSiteManagementPolicy.Value.Enabled

      /** If true, folder admins have access. Null disables the option. */
      folder_admins: ChildSiteManagementPolicy.Value.Enabled

      /** If true, all users have access. Null disables the option. */
      all_users: ChildSiteManagementPolicy.Value.Enabled

      /**
       * If true, members of at least one group in group_ids have access. Defaults to false. Null disables the option.
       */
      selected_group_members?: ChildSiteManagementPolicy.Value.Enabled

      /**
       * IDs of active groups on this site, from any workspace. Omitted or empty group_ids grants no access through
       * selected_group_members.
       */
      group_ids?: number[]
    }

    type Enabled = boolean | null
  }
}

export default ChildSiteManagementPolicy
