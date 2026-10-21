import Files = require('../Files')

/** An SSOStrategy is a way for users to sign in via another identity provider, such as Okta or Auth0. */
declare class SsoStrategy {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SsoStrategy.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SsoStrategy.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** SSO Protocol */
  readonly protocol?: 'oauth2' | 'saml' | 'active_directory' | 'open_ldap' | 'scim' | Files.OtherString | null

  /** Provider name */
  readonly provider?: 'google' | 'auth0' | 'okta' | 'azure' | 'box' | 'dropbox' | 'slack' | 'onelogin' | 'saml' | 'idaptive' | 'ldap' | 'scim' | 'jumpcloud' | 'duo' | Files.OtherString | null

  /** Custom label for the SSO provider on the login page. */
  readonly label?: string | null

  /** URL holding a custom logo for the SSO provider on the login page. */
  readonly logo_url?: string | null

  /** ID */
  readonly id?: number | null

  /** Is strategy enabled?  This may become automatically set to `false` after a high number and duration of failures. */
  readonly enabled?: boolean | null

  /** Count of users with this SSO Strategy */
  readonly user_count?: number | null

  /** Identity provider sha256 cert fingerprint if saml_provider_metadata_url is not available. */
  readonly saml_provider_cert_fingerprint?: string | null

  /** Identity provider issuer url */
  readonly saml_provider_issuer_url?: string | null

  /** Custom identity provider metadata */
  readonly saml_provider_metadata_content?: string | null

  /** Metadata URL for the SAML identity provider */
  readonly saml_provider_metadata_url?: string | null

  /** Identity provider SLO endpoint */
  readonly saml_provider_slo_target_url?: string | null

  /** Identity provider SSO endpoint if saml_provider_metadata_url is not available. */
  readonly saml_provider_sso_target_url?: string | null

  /** SCIM authentication type. */
  readonly scim_authentication_method?: 'none' | 'basic' | 'token' | Files.OtherString | null

  /** SCIM username. */
  readonly scim_username?: string | null

  /** SCIM OAuth Access Token. Only returned when the token is first issued or reset. */
  readonly scim_oauth_access_token?: string | null

  /** SCIM OAuth Access Token Expiration Time. */
  readonly scim_oauth_access_token_expires_at?: string | null

  /** Subdomain or domain name for your auth provider.   Example: `https://[subdomain].okta.com/` */
  readonly subdomain?: string | null

  /** Auto-provision users? */
  readonly provision_users?: boolean | null

  /** Auto-provision group membership based on group memberships on the SSO side? */
  readonly provision_groups?: boolean | null

  /** Auto-deprovision users? */
  readonly deprovision_users?: boolean | null

  /** Auto-deprovision group membership based on group memberships on the SSO side? */
  readonly deprovision_groups?: boolean | null

  /** Method used for deprovisioning users. */
  readonly deprovision_behavior?: 'disable' | 'delete' | Files.OtherString | null

  /** Comma-separated list of group names for groups to automatically add all auto-provisioned users to. */
  readonly provision_group_default?: string | null

  /**
   * Comma-separated list of group names for groups (with optional wildcards) that will be excluded from
   * auto-provisioning.
   */
  readonly provision_group_exclusion?: string | null

  /** Comma-separated list of group names for groups (with optional wildcards) that will be auto-provisioned. */
  readonly provision_group_inclusion?: string | null

  /**
   * Comma or newline separated list of group names (with optional wildcards) to require membership for user
   * provisioning.
   */
  readonly provision_group_required?: string | null

  /** Comma-separated list of group names whose members will be created with email_signup authentication. */
  readonly provision_email_signup_groups?: string | null

  /**
   * Comma-separated list of group names used to grant or remove Read-Only Site Admin access for users on this SSO
   * provider. When this list is nonempty and a directory sync changes a user's group membership, membership in at least
   * one listed group grants this access; membership in none removes it, including access granted manually. Directory
   * syncs include SCIM requests from any provider on the site, LDAP syncs, and sign-ins that set the user's groups from
   * the identity provider. Membership changes made any other way, including through the web app, API, SDKs, or CLI, do
   * not affect administrator access.
   */
  readonly provision_readonly_site_admin_groups?: string | null

  /**
   * Comma-separated list of group names used to grant or remove Site Admin access for users on this SSO provider. When
   * this list is nonempty and a directory sync changes a user's group membership, membership in at least one listed
   * group grants this access; membership in none removes it, including access granted manually. Directory syncs include
   * SCIM requests from any provider on the site, LDAP syncs, and sign-ins that set the user's groups from the identity
   * provider. Membership changes made any other way, including through the web app, API, SDKs, or CLI, do not affect
   * administrator access.
   */
  readonly provision_site_admin_groups?: string | null

  /** Comma-separated list of group names whose members will be provisioned as Group Admins. */
  readonly provision_group_admin_groups?: string | null

  readonly provision_attachments_permission?: boolean | null

  /** Auto-provisioned users get WebDAV permission? */
  readonly provision_dav_permission?: boolean | null

  /** Auto-provisioned users get FTP permission? */
  readonly provision_ftp_permission?: boolean | null

  /** Auto-provisioned users get SFTP permission? */
  readonly provision_sftp_permission?: boolean | null

  /** Default time zone for auto provisioned users. */
  readonly provision_time_zone?: string | null

  /** Default company for auto provisioned users. */
  readonly provision_company?: string | null

  /**
   * 2FA required setting for auto provisioned users. `use_system_setting` uses the site-wide setting, including SSO
   * exemptions. `always_require` and `never_require` override the site-wide setting when user-level overrides are
   * allowed.
   */
  readonly provision_require_2fa?: 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null

  /** File System layout to use for auto provisioned users. */
  readonly provision_filesystem_layout?: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | Files.OtherString | null

  /** URL-friendly, unique identifier for Azure SAML configuration */
  readonly provider_identifier?: string | null

  /** Base DN for looking up users in LDAP server */
  readonly ldap_base_dn?: string | null

  /** Domain name that will be appended to LDAP usernames */
  readonly ldap_domain?: string | null

  /** Should this strategy be displayed on the login page? */
  readonly display_on_login_page?: boolean | null

  /** LDAP host */
  readonly ldap_host?: string | null

  /** LDAP backup host */
  readonly ldap_host_2?: string | null

  /** LDAP backup host */
  readonly ldap_host_3?: string | null

  /** LDAP port */
  readonly ldap_port?: number | null

  /** Use LDAP server settings for scheduled provisioning while using this SSO provider for authentication? */
  readonly ldap_provisioning_enabled?: boolean | null

  /** Use secure LDAP? */
  readonly ldap_secure?: boolean | null

  /**
   * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
   * `allow_any` disables certificate validation.
   */
  readonly ldap_server_certificate?: 'require_match' | 'allow_any' | Files.OtherString | null

  /** LDAP server type */
  readonly ldap_type?: 'active_directory' | 'open_ldap' | Files.OtherString | null

  /** Username for signing in to LDAP server. */
  readonly ldap_username?: string | null

  /** LDAP username field */
  readonly ldap_username_field?: 'sAMAccountName' | 'userPrincipalName' | Files.OtherString | null

  /** SSO Protocol */
  getProtocol(): 'oauth2' | 'saml' | 'active_directory' | 'open_ldap' | 'scim' | Files.OtherString | null | undefined

  /** Provider name */
  getProvider(): 'google' | 'auth0' | 'okta' | 'azure' | 'box' | 'dropbox' | 'slack' | 'onelogin' | 'saml' | 'idaptive' | 'ldap' | 'scim' | 'jumpcloud' | 'duo' | Files.OtherString | null | undefined

  /** Custom label for the SSO provider on the login page. */
  getLabel(): string | null | undefined

  /** URL holding a custom logo for the SSO provider on the login page. */
  getLogoUrl(): string | null | undefined

  /** ID */
  getId(): number | null | undefined

  /** Is strategy enabled?  This may become automatically set to `false` after a high number and duration of failures. */
  getEnabled(): boolean | null | undefined

  /** Count of users with this SSO Strategy */
  getUserCount(): number | null | undefined

  /** Identity provider sha256 cert fingerprint if saml_provider_metadata_url is not available. */
  getSamlProviderCertFingerprint(): string | null | undefined

  /** Identity provider issuer url */
  getSamlProviderIssuerUrl(): string | null | undefined

  /** Custom identity provider metadata */
  getSamlProviderMetadataContent(): string | null | undefined

  /** Metadata URL for the SAML identity provider */
  getSamlProviderMetadataUrl(): string | null | undefined

  /** Identity provider SLO endpoint */
  getSamlProviderSloTargetUrl(): string | null | undefined

  /** Identity provider SSO endpoint if saml_provider_metadata_url is not available. */
  getSamlProviderSsoTargetUrl(): string | null | undefined

  /** SCIM authentication type. */
  getScimAuthenticationMethod(): 'none' | 'basic' | 'token' | Files.OtherString | null | undefined

  /** SCIM username. */
  getScimUsername(): string | null | undefined

  /** SCIM OAuth Access Token. Only returned when the token is first issued or reset. */
  getScimOauthAccessToken(): string | null | undefined

  /** SCIM OAuth Access Token Expiration Time. */
  getScimOauthAccessTokenExpiresAt(): string | null | undefined

  /** Subdomain or domain name for your auth provider.   Example: `https://[subdomain].okta.com/` */
  getSubdomain(): string | null | undefined

  /** Auto-provision users? */
  getProvisionUsers(): boolean | null | undefined

  /** Auto-provision group membership based on group memberships on the SSO side? */
  getProvisionGroups(): boolean | null | undefined

  /** Auto-deprovision users? */
  getDeprovisionUsers(): boolean | null | undefined

  /** Auto-deprovision group membership based on group memberships on the SSO side? */
  getDeprovisionGroups(): boolean | null | undefined

  /** Method used for deprovisioning users. */
  getDeprovisionBehavior(): 'disable' | 'delete' | Files.OtherString | null | undefined

  /** Comma-separated list of group names for groups to automatically add all auto-provisioned users to. */
  getProvisionGroupDefault(): string | null | undefined

  /**
   * Comma-separated list of group names for groups (with optional wildcards) that will be excluded from
   * auto-provisioning.
   */
  getProvisionGroupExclusion(): string | null | undefined

  /** Comma-separated list of group names for groups (with optional wildcards) that will be auto-provisioned. */
  getProvisionGroupInclusion(): string | null | undefined

  /**
   * Comma or newline separated list of group names (with optional wildcards) to require membership for user
   * provisioning.
   */
  getProvisionGroupRequired(): string | null | undefined

  /** Comma-separated list of group names whose members will be created with email_signup authentication. */
  getProvisionEmailSignupGroups(): string | null | undefined

  /**
   * Comma-separated list of group names used to grant or remove Read-Only Site Admin access for users on this SSO
   * provider. When this list is nonempty and a directory sync changes a user's group membership, membership in at least
   * one listed group grants this access; membership in none removes it, including access granted manually. Directory
   * syncs include SCIM requests from any provider on the site, LDAP syncs, and sign-ins that set the user's groups from
   * the identity provider. Membership changes made any other way, including through the web app, API, SDKs, or CLI, do
   * not affect administrator access.
   */
  getProvisionReadonlySiteAdminGroups(): string | null | undefined

  /**
   * Comma-separated list of group names used to grant or remove Site Admin access for users on this SSO provider. When
   * this list is nonempty and a directory sync changes a user's group membership, membership in at least one listed
   * group grants this access; membership in none removes it, including access granted manually. Directory syncs include
   * SCIM requests from any provider on the site, LDAP syncs, and sign-ins that set the user's groups from the identity
   * provider. Membership changes made any other way, including through the web app, API, SDKs, or CLI, do not affect
   * administrator access.
   */
  getProvisionSiteAdminGroups(): string | null | undefined

  /** Comma-separated list of group names whose members will be provisioned as Group Admins. */
  getProvisionGroupAdminGroups(): string | null | undefined

  getProvisionAttachmentsPermission(): boolean | null | undefined

  /** Auto-provisioned users get WebDAV permission? */
  getProvisionDavPermission(): boolean | null | undefined

  /** Auto-provisioned users get FTP permission? */
  getProvisionFtpPermission(): boolean | null | undefined

  /** Auto-provisioned users get SFTP permission? */
  getProvisionSftpPermission(): boolean | null | undefined

  /** Default time zone for auto provisioned users. */
  getProvisionTimeZone(): string | null | undefined

  /** Default company for auto provisioned users. */
  getProvisionCompany(): string | null | undefined

  /**
   * 2FA required setting for auto provisioned users. `use_system_setting` uses the site-wide setting, including SSO
   * exemptions. `always_require` and `never_require` override the site-wide setting when user-level overrides are
   * allowed.
   */
  getProvisionRequire2fa(): 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null | undefined

  /** File System layout to use for auto provisioned users. */
  getProvisionFilesystemLayout(): 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | Files.OtherString | null | undefined

  /** URL-friendly, unique identifier for Azure SAML configuration */
  getProviderIdentifier(): string | null | undefined

  /** Base DN for looking up users in LDAP server */
  getLdapBaseDn(): string | null | undefined

  /** Domain name that will be appended to LDAP usernames */
  getLdapDomain(): string | null | undefined

  /** Should this strategy be displayed on the login page? */
  getDisplayOnLoginPage(): boolean | null | undefined

  /** LDAP host */
  getLdapHost(): string | null | undefined

  /** LDAP backup host */
  getLdapHost2(): string | null | undefined

  /** LDAP backup host */
  getLdapHost3(): string | null | undefined

  /** LDAP port */
  getLdapPort(): number | null | undefined

  /** Use LDAP server settings for scheduled provisioning while using this SSO provider for authentication? */
  getLdapProvisioningEnabled(): boolean | null | undefined

  /** Use secure LDAP? */
  getLdapSecure(): boolean | null | undefined

  /**
   * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
   * `allow_any` disables certificate validation.
   */
  getLdapServerCertificate(): 'require_match' | 'allow_any' | Files.OtherString | null | undefined

  /** LDAP server type */
  getLdapType(): 'active_directory' | 'open_ldap' | Files.OtherString | null | undefined

  /** Username for signing in to LDAP server. */
  getLdapUsername(): string | null | undefined

  /** LDAP username field */
  getLdapUsernameField(): 'sAMAccountName' | 'userPrincipalName' | Files.OtherString | null | undefined

  /** Synchronize provisioning data with the SSO remote server */
  sync(params?: Files.NoParams): Promise<void>

  /** List SSO Strategies */
  static list(params?: SsoStrategy.ListParams, options?: Files.RequestOptions): Promise<SsoStrategy[]>

  /** Alias of `list()`. */
  static all(params?: SsoStrategy.ListParams, options?: Files.RequestOptions): Promise<SsoStrategy[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SsoStrategy.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SsoStrategy>

  /**
   * Show SSO Strategy
   * @param id - Sso Strategy ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SsoStrategy>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SsoStrategy>

  static default: typeof SsoStrategy
}

declare namespace SsoStrategy {
  /** The fields of `SsoStrategy` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** SSO Protocol */
    protocol?: 'oauth2' | 'saml' | 'active_directory' | 'open_ldap' | 'scim' | Files.OtherString | null

    /** Provider name */
    provider?: 'google' | 'auth0' | 'okta' | 'azure' | 'box' | 'dropbox' | 'slack' | 'onelogin' | 'saml' | 'idaptive' | 'ldap' | 'scim' | 'jumpcloud' | 'duo' | Files.OtherString | null

    /** Custom label for the SSO provider on the login page. */
    label?: string | null

    /** URL holding a custom logo for the SSO provider on the login page. */
    logo_url?: string | null

    /** ID */
    id?: number | null

    /**
     * Is strategy enabled?  This may become automatically set to `false` after a high number and duration of failures.
     */
    enabled?: boolean | null

    /** Count of users with this SSO Strategy */
    user_count?: number | null

    /** Identity provider sha256 cert fingerprint if saml_provider_metadata_url is not available. */
    saml_provider_cert_fingerprint?: string | null

    /** Identity provider issuer url */
    saml_provider_issuer_url?: string | null

    /** Custom identity provider metadata */
    saml_provider_metadata_content?: string | null

    /** Metadata URL for the SAML identity provider */
    saml_provider_metadata_url?: string | null

    /** Identity provider SLO endpoint */
    saml_provider_slo_target_url?: string | null

    /** Identity provider SSO endpoint if saml_provider_metadata_url is not available. */
    saml_provider_sso_target_url?: string | null

    /** SCIM authentication type. */
    scim_authentication_method?: 'none' | 'basic' | 'token' | Files.OtherString | null

    /** SCIM username. */
    scim_username?: string | null

    /** SCIM OAuth Access Token. Only returned when the token is first issued or reset. */
    scim_oauth_access_token?: string | null

    /** SCIM OAuth Access Token Expiration Time. */
    scim_oauth_access_token_expires_at?: string | null

    /** Subdomain or domain name for your auth provider.   Example: `https://[subdomain].okta.com/` */
    subdomain?: string | null

    /** Auto-provision users? */
    provision_users?: boolean | null

    /** Auto-provision group membership based on group memberships on the SSO side? */
    provision_groups?: boolean | null

    /** Auto-deprovision users? */
    deprovision_users?: boolean | null

    /** Auto-deprovision group membership based on group memberships on the SSO side? */
    deprovision_groups?: boolean | null

    /** Method used for deprovisioning users. */
    deprovision_behavior?: 'disable' | 'delete' | Files.OtherString | null

    /** Comma-separated list of group names for groups to automatically add all auto-provisioned users to. */
    provision_group_default?: string | null

    /**
     * Comma-separated list of group names for groups (with optional wildcards) that will be excluded from
     * auto-provisioning.
     */
    provision_group_exclusion?: string | null

    /** Comma-separated list of group names for groups (with optional wildcards) that will be auto-provisioned. */
    provision_group_inclusion?: string | null

    /**
     * Comma or newline separated list of group names (with optional wildcards) to require membership for user
     * provisioning.
     */
    provision_group_required?: string | null

    /** Comma-separated list of group names whose members will be created with email_signup authentication. */
    provision_email_signup_groups?: string | null

    /**
     * Comma-separated list of group names used to grant or remove Read-Only Site Admin access for users on this SSO
     * provider. When this list is nonempty and a directory sync changes a user's group membership, membership in at
     * least one listed group grants this access; membership in none removes it, including access granted manually.
     * Directory syncs include SCIM requests from any provider on the site, LDAP syncs, and sign-ins that set the user's
     * groups from the identity provider. Membership changes made any other way, including through the web app, API,
     * SDKs, or CLI, do not affect administrator access.
     */
    provision_readonly_site_admin_groups?: string | null

    /**
     * Comma-separated list of group names used to grant or remove Site Admin access for users on this SSO provider.
     * When this list is nonempty and a directory sync changes a user's group membership, membership in at least one
     * listed group grants this access; membership in none removes it, including access granted manually. Directory
     * syncs include SCIM requests from any provider on the site, LDAP syncs, and sign-ins that set the user's groups
     * from the identity provider. Membership changes made any other way, including through the web app, API, SDKs, or
     * CLI, do not affect administrator access.
     */
    provision_site_admin_groups?: string | null

    /** Comma-separated list of group names whose members will be provisioned as Group Admins. */
    provision_group_admin_groups?: string | null

    provision_attachments_permission?: boolean | null

    /** Auto-provisioned users get WebDAV permission? */
    provision_dav_permission?: boolean | null

    /** Auto-provisioned users get FTP permission? */
    provision_ftp_permission?: boolean | null

    /** Auto-provisioned users get SFTP permission? */
    provision_sftp_permission?: boolean | null

    /** Default time zone for auto provisioned users. */
    provision_time_zone?: string | null

    /** Default company for auto provisioned users. */
    provision_company?: string | null

    /**
     * 2FA required setting for auto provisioned users. `use_system_setting` uses the site-wide setting, including SSO
     * exemptions. `always_require` and `never_require` override the site-wide setting when user-level overrides are
     * allowed.
     */
    provision_require_2fa?: 'use_system_setting' | 'always_require' | 'never_require' | Files.OtherString | null

    /** File System layout to use for auto provisioned users. */
    provision_filesystem_layout?: 'site_root' | 'user_root' | 'partner_root' | 'integration_centric' | Files.OtherString | null

    /** URL-friendly, unique identifier for Azure SAML configuration */
    provider_identifier?: string | null

    /** Base DN for looking up users in LDAP server */
    ldap_base_dn?: string | null

    /** Domain name that will be appended to LDAP usernames */
    ldap_domain?: string | null

    /** Should this strategy be displayed on the login page? */
    display_on_login_page?: boolean | null

    /** LDAP host */
    ldap_host?: string | null

    /** LDAP backup host */
    ldap_host_2?: string | null

    /** LDAP backup host */
    ldap_host_3?: string | null

    /** LDAP port */
    ldap_port?: number | null

    /** Use LDAP server settings for scheduled provisioning while using this SSO provider for authentication? */
    ldap_provisioning_enabled?: boolean | null

    /** Use secure LDAP? */
    ldap_secure?: boolean | null

    /**
     * How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname;
     * `allow_any` disables certificate validation.
     */
    ldap_server_certificate?: 'require_match' | 'allow_any' | Files.OtherString | null

    /** LDAP server type */
    ldap_type?: 'active_directory' | 'open_ldap' | Files.OtherString | null

    /** Username for signing in to LDAP server. */
    ldap_username?: string | null

    /** LDAP username field */
    ldap_username_field?: 'sAMAccountName' | 'userPrincipalName' | Files.OtherString | null
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject
  }
}

export = SsoStrategy
