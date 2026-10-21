/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
const exposeAttributes = (model, names) => {
  names.forEach(name => {
    if (!(name in model)) {
      Object.defineProperty(model, name, { get: () => model.attributes[name] })
    }
  })
}

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
const adoptAttributes = (model, attributes = {}) => {
  const adopted = {}
  Object.entries(attributes).forEach(([key, value]) => {
    adopted[key.replace('?', '')] = value
  })

  model.attributes = adopted
  exposeAttributes(model, Object.keys(adopted))
}

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
const retainedOptions = options => {
  if (!options?.client) {
    return options
  }

  const { signal, ...context } = options
  return context
}

/**
 * Class Site
 */
class Site {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Site Id
  getId = () => this.attributes.id

  // string # Site name
  getName = () => this.attributes.name

  // array(string) # Additional extensions that are considered text files
  getAdditionalTextFileTypes = () => this.attributes.additional_text_file_types

  // object # Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins, and all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group in group_ids get access regardless of the other options. All availability options are additive: any enabled option matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this site, from any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not affect other options. Disabling all AI features overrides these settings.
  getAiFeatureAvailability = () => this.attributes.ai_feature_availability

  // boolean # Is SMS two factor authentication allowed?
  getAllowed2faMethodSms = () => this.attributes.allowed_2fa_method_sms

  // boolean # Is TOTP two factor authentication allowed?
  getAllowed2faMethodTotp = () => this.attributes.allowed_2fa_method_totp

  // boolean # Is WebAuthn two factor authentication allowed?
  getAllowed2faMethodWebauthn = () => this.attributes.allowed_2fa_method_webauthn

  // boolean # Is yubikey two factor authentication allowed?
  getAllowed2faMethodYubi = () => this.attributes.allowed_2fa_method_yubi

  // boolean # Is OTP via email two factor authentication allowed?
  getAllowed2faMethodEmail = () => this.attributes.allowed_2fa_method_email

  // boolean # Is OTP via static codes for two factor authentication allowed?
  getAllowed2faMethodStatic = () => this.attributes.allowed_2fa_method_static

  // boolean # Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV?
  getAllowed2faMethodBypassForFtpSftpDav = () => this.attributes.allowed_2fa_method_bypass_for_ftp_sftp_dav

  // int64 # User ID for the main site administrator
  getAdminUserId = () => this.attributes.admin_user_id

  // boolean # Allow admins to bypass the locked subfolders setting.
  getAdminsBypassLockedSubfolders = () => this.attributes.admins_bypass_locked_subfolders

  // boolean # Are manual Bundle names allowed?
  getAllowBundleNames = () => this.attributes.allow_bundle_names

  // boolean # Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis?
  getAllowUserLevel2faOverride = () => this.attributes.allow_user_level_2fa_override

  // boolean # Allow the site-wide allowed IP restriction to be overriden on a per-user-basis?
  getAllowUserLevelAllowedIpOverride = () => this.attributes.allow_user_level_allowed_ip_override

  // boolean # Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis?
  getAllowUserLevelSslOverride = () => this.attributes.allow_user_level_ssl_override

  // string # Comma separated list of allowed Country codes
  getAllowedCountries = () => this.attributes.allowed_countries

  // string # List of allowed IP addresses
  getAllowedIps = () => this.attributes.allowed_ips

  // boolean # Create parent directories if they do not exist during uploads?  This is primarily used to work around broken upload clients that assume servers will perform this step.
  getAlwaysMkdirParents = () => this.attributes.always_mkdir_parents

  // int64 # Number of days to retain AS2 messages (incoming and outgoing).
  getAs2MessageRetentionDays = () => this.attributes.as2_message_retention_days

  // boolean # If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
  getAskAboutOverwrites = () => this.attributes.ask_about_overwrites

  // string # Do Bundle owners receive activity notifications?
  getBundleActivityNotifications = () => this.attributes.bundle_activity_notifications

  // int64 # Site-wide Bundle expiration in days
  getBundleExpiration = () => this.attributes.bundle_expiration

  // string # Custom error message to show when bundle is not found.
  getBundleNotFoundMessage = () => this.attributes.bundle_not_found_message

  // boolean # Do Bundles require password protection?
  getBundlePasswordRequired = () => this.attributes.bundle_password_required

  // boolean # If true, new Share Links created by a user with a primary group will default to that group as owner.
  getBundlesDefaultOwnedByPrimaryGroup = () => this.attributes.bundles_default_owned_by_primary_group

  // array(string) # List of email domains to disallow when entering a Bundle/Inbox recipients
  getBundleRecipientBlacklistDomains = () => this.attributes.bundle_recipient_blacklist_domains

  // boolean # Disallow free email domains for Bundle/Inbox recipients?
  getBundleRecipientBlacklistFreeEmailDomains = () => this.attributes.bundle_recipient_blacklist_free_email_domains

  // string # Do Bundle owners receive registration notification?
  getBundleRegistrationNotifications = () => this.attributes.bundle_registration_notifications

  // boolean # Do Bundles require registration?
  getBundleRequireRegistration = () => this.attributes.bundle_require_registration

  // boolean # Do Bundles require recipients for sharing?
  getBundleRequireShareRecipient = () => this.attributes.bundle_require_share_recipient

  // boolean # If true, new Share Links must send a one-time password to the recipient when they register. Requires bundle_require_share_recipient and cannot be enabled with bundle_password_required.
  getBundleSendOneTimePasswordToRecipientAtRegistration = () => this.attributes.bundle_send_one_time_password_to_recipient_at_registration

  // boolean # Do Bundles require internal notes?
  getBundleRequireNote = () => this.attributes.bundle_require_note

  // boolean # Do Bundle creators receive receipts of invitations?
  getBundleSendSharedReceipts = () => this.attributes.bundle_send_shared_receipts

  // string # Do Bundle uploaders receive upload confirmation notifications?
  getBundleUploadReceiptNotifications = () => this.attributes.bundle_upload_receipt_notifications

  // Image # Preview watermark image applied to all bundle items.
  getBundleWatermarkAttachment = () => this.attributes.bundle_watermark_attachment

  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  getBundleWatermarkValue = () => this.attributes.bundle_watermark_value

  // boolean # Calculate CRC32 checksums for files?
  getCalculateFileChecksumsCrc32 = () => this.attributes.calculate_file_checksums_crc32

  // boolean # Calculate MD5 checksums for files?
  getCalculateFileChecksumsMd5 = () => this.attributes.calculate_file_checksums_md5

  // boolean # Calculate SHA1 checksums for files?
  getCalculateFileChecksumsSha1 = () => this.attributes.calculate_file_checksums_sha1

  // boolean # Calculate SHA256 checksums for files?
  getCalculateFileChecksumsSha256 = () => this.attributes.calculate_file_checksums_sha256

  // boolean # If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default Workspace users and groups and grant them folder permissions and notifications on Child Site paths.
  getChildSiteFolderAdminsCanSeeParentSiteDirectory = () => this.attributes.child_site_folder_admins_can_see_parent_site_directory

  // boolean # If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users and groups that have permissions in that Workspace and choose them as Email Notification recipients.
  getWorkspaceFolderAdminsCanSeeDefaultWorkspaceDirectory = () => this.attributes.workspace_folder_admins_can_see_default_workspace_directory

  // boolean # Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email Automations in every Workspace on this site?
  getUploadsViaEmailAuthentication = () => this.attributes.uploads_via_email_authentication

  // string # Page link and button color
  getColor2Left = () => this.attributes.color2_left

  // string # Top bar link color
  getColor2Link = () => this.attributes.color2_link

  // string # Page link and button color
  getColor2Text = () => this.attributes.color2_text

  // string # Top bar background color
  getColor2Top = () => this.attributes.color2_top

  // string # Top bar text color
  getColor2TopText = () => this.attributes.color2_top_text

  // string # Site main contact name
  getContactName = () => this.attributes.contact_name

  // date-time # Time this site was created
  getCreatedAt = () => this.attributes.created_at

  // string # Preferred currency
  getCurrency = () => this.attributes.currency

  // boolean # Is this site using a custom namespace for users?
  getCustomNamespace = () => this.attributes.custom_namespace

  // boolean # Is WebDAV enabled?
  getDavEnabled = () => this.attributes.dav_enabled

  // boolean # Use user FTP roots also for WebDAV?
  getDavUserRootEnabled = () => this.attributes.dav_user_root_enabled

  // int64 # Number of days to keep deleted files
  getDaysToRetainBackups = () => this.attributes.days_to_retain_backups

  // boolean # If true, allow public viewers of Bundles with full permissions to use document editing integrations.
  getDocumentEditsInBundleAllowed = () => this.attributes.document_edits_in_bundle_allowed

  // string # Site default time zone
  getDefaultTimeZone = () => this.attributes.default_time_zone

  // boolean # Is the desktop app enabled?
  getDesktopApp = () => this.attributes.desktop_app

  // boolean # Is desktop app session IP pinning enabled?
  getDesktopAppSessionIpPinning = () => this.attributes.desktop_app_session_ip_pinning

  // int64 # Desktop app session lifetime (in hours)
  getDesktopAppSessionLifetime = () => this.attributes.desktop_app_session_lifetime

  // boolean # Use legacy checksums mode?
  getLegacyChecksumsMode = () => this.attributes.legacy_checksums_mode

  // boolean # If true, we will migrate all remote server syncs to the new Sync model.
  getMigrateRemoteServerSyncToSync = () => this.attributes.migrate_remote_server_sync_to_sync

  // boolean # Is OAuth DCR (dynamic client registration) for MCP enabled?
  getMcpDcrEnabled = () => this.attributes.mcp_dcr_enabled

  // boolean # Is the mobile app enabled?
  getMobileApp = () => this.attributes.mobile_app

  // boolean # Is mobile app session IP pinning enabled?
  getMobileAppSessionIpPinning = () => this.attributes.mobile_app_session_ip_pinning

  // int64 # Mobile app session lifetime (in hours)
  getMobileAppSessionLifetime = () => this.attributes.mobile_app_session_lifetime

  // string # Comma separated list of disallowed Country codes
  getDisallowedCountries = () => this.attributes.disallowed_countries

  // boolean # If true, all AI features are disabled for this site.
  getDisableAllAiFeatures = () => this.attributes.disable_all_ai_features

  // boolean # If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
  getDisableFilesCertificateGeneration = () => this.attributes.disable_files_certificate_generation

  // boolean # Are notifications disabled?
  getDisableNotifications = () => this.attributes.disable_notifications

  // boolean # If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to false; subscription filters and workspace access still control delivery.
  getFileActivityEventsEnabled = () => this.attributes.file_activity_events_enabled

  // boolean # Is password reset disabled?
  getDisablePasswordReset = () => this.attributes.disable_password_reset

  // string # Custom domain
  getDomain = () => this.attributes.domain

  // boolean # Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain?
  getDomainHstsHeader = () => this.attributes.domain_hsts_header

  // string # Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026.
  getDomainLetsencryptChain = () => this.attributes.domain_letsencrypt_chain

  // email # Main email for this site
  getEmail = () => this.attributes.email

  // boolean # Are FedRAMP security restrictions enabled for this site?
  getFedramp = () => this.attributes.fedramp

  // boolean # Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults to true and applies to all keys and workspaces on this site. When false, new pairings and access through existing connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
  getFilesComRemoteServerEnabled = () => this.attributes.files_com_remote_server_enabled

  // boolean # Is FTP enabled?
  getFtpEnabled = () => this.attributes.ftp_enabled

  // email # Reply-to email for this site
  getReplyToEmail = () => this.attributes.reply_to_email

  // boolean # If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed via your SSO provider.
  getNonSsoGroupsAllowed = () => this.attributes.non_sso_groups_allowed

  // boolean # If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed via your SSO provider.
  getNonSsoUsersAllowed = () => this.attributes.non_sso_users_allowed

  // boolean # If true, permissions for this site must be bound to a group (not a user).
  getFolderPermissionsGroupsOnly = () => this.attributes.folder_permissions_groups_only

  // boolean # Allow group admins to create users in their groups
  getGroupAdminsCanAddUsers = () => this.attributes.group_admins_can_add_users

  // boolean # Allow group admins to add or remove existing users in their groups
  getGroupAdminsCanManageGroupMemberships = () => this.attributes.group_admins_can_manage_group_memberships

  // boolean # Allow group admins to delete users in their groups
  getGroupAdminsCanDeleteUsers = () => this.attributes.group_admins_can_delete_users

  // boolean # Allow group admins to enable or disable users in their groups
  getGroupAdminsCanEnableDisableUsers = () => this.attributes.group_admins_can_enable_disable_users

  // boolean # Allow group admins to modify users in their groups
  getGroupAdminsCanModifyUsers = () => this.attributes.group_admins_can_modify_users

  // boolean # Allow group admins to exempt users in their groups from lifecycle rules
  getGroupAdminsCanBypassUserLifecycleRules = () => this.attributes.group_admins_can_bypass_user_lifecycle_rules

  // boolean # Allow group admins to reset passwords for users in their groups
  getGroupAdminsCanResetPasswords = () => this.attributes.group_admins_can_reset_passwords

  // boolean # Allow group admins to set password authentication method
  getGroupAdminsCanSetUserPassword = () => this.attributes.group_admins_can_set_user_password

  // boolean # Is there a signed HIPAA BAA between Files.com and this site?
  getHipaa = () => this.attributes.hipaa

  // Image # Branded icon 128x128
  getIcon128 = () => this.attributes.icon128

  // Image # Branded icon 16x16
  getIcon16 = () => this.attributes.icon16

  // Image # Branded icon 32x32
  getIcon32 = () => this.attributes.icon32

  // Image # Branded icon 48x48
  getIcon48 = () => this.attributes.icon48

  // date-time # Can files be modified?
  getImmutableFilesSetAt = () => this.attributes.immutable_files_set_at

  // boolean # Include password in emails to new users?
  getIncludePasswordInWelcomeEmail = () => this.attributes.include_password_in_welcome_email

  // string # Site default language
  getLanguage = () => this.attributes.language

  // string # Base DN for looking up users in LDAP server
  getLdapBaseDn = () => this.attributes.ldap_base_dn

  // string # Domain name that will be appended to usernames
  getLdapDomain = () => this.attributes.ldap_domain

  // boolean # Main LDAP setting: is LDAP enabled?
  getLdapEnabled = () => this.attributes.ldap_enabled

  // string # Should we sync groups from LDAP server?
  getLdapGroupAction = () => this.attributes.ldap_group_action

  // string # Comma or newline separated list of group names (with optional wildcards) to exclude when syncing.
  getLdapGroupExclusion = () => this.attributes.ldap_group_exclusion

  // string # Comma or newline separated list of group names (with optional wildcards) to include when syncing.
  getLdapGroupInclusion = () => this.attributes.ldap_group_inclusion

  // string # LDAP host
  getLdapHost = () => this.attributes.ldap_host

  // string # LDAP backup host
  getLdapHost2 = () => this.attributes.ldap_host_2

  // string # LDAP backup host
  getLdapHost3 = () => this.attributes.ldap_host_3

  // int64 # LDAP port
  getLdapPort = () => this.attributes.ldap_port

  // boolean # Use secure LDAP?
  getLdapSecure = () => this.attributes.ldap_secure

  // string # How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname; `allow_any` disables certificate validation.
  getLdapServerCertificate = () => this.attributes.ldap_server_certificate

  // string # LDAP type
  getLdapType = () => this.attributes.ldap_type

  // string # Should we sync users from LDAP server?
  getLdapUserAction = () => this.attributes.ldap_user_action

  // string # Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these groups will be added or synced.
  getLdapUserIncludeGroups = () => this.attributes.ldap_user_include_groups

  // string # Username for signing in to LDAP server.
  getLdapUsername = () => this.attributes.ldap_username

  // string # LDAP username field
  getLdapUsernameField = () => this.attributes.ldap_username_field

  // string # Login help text
  getLoginHelpText = () => this.attributes.login_help_text

  // Image # Branded logo
  getLogo = () => this.attributes.logo

  // Image # Branded login page background
  getLoginPageBackgroundImage = () => this.attributes.login_page_background_image

  // int64 # Number of prior passwords to disallow
  getMaxPriorPasswords = () => this.attributes.max_prior_passwords

  // object # Site settings managed by the parent site. Each key identifies a managed setting, with a null value. Non-secret effective values are returned in their own Site settings fields.
  getManagedSiteSettings = () => this.attributes.managed_site_settings

  // string # A message to show users when they connect via FTP or SFTP.
  getMotdText = () => this.attributes.motd_text

  // boolean # Show message to users connecting via FTP
  getMotdUseForFtp = () => this.attributes.motd_use_for_ftp

  // boolean # Show message to users connecting via SFTP
  getMotdUseForSftp = () => this.attributes.motd_use_for_sftp

  // decimal # Next billing amount
  getNextBillingAmount = () => this.attributes.next_billing_amount

  // string # Next billing date
  getNextBillingDate = () => this.attributes.next_billing_date

  // boolean # If true, allows users to use a document editing integration.
  getOfficeIntegrationAvailable = () => this.attributes.office_integration_available

  // string # Which document editing integration to support. Files.com Editor or Microsoft Office for the Web.
  getOfficeIntegrationType = () => this.attributes.office_integration_type

  // string # Link to scheduling a meeting with our Sales team
  getOncehubLink = () => this.attributes.oncehub_link

  // boolean # Use servers in the USA only?
  getOptOutGlobal = () => this.attributes.opt_out_global

  // boolean # Is this site's billing overdue?
  getOverdue = () => this.attributes.overdue

  // int64 # Shortest password length for users
  getPasswordMinLength = () => this.attributes.password_min_length

  // boolean # Require a letter in passwords?
  getPasswordRequireLetter = () => this.attributes.password_require_letter

  // boolean # Require lower and upper case letters in passwords?
  getPasswordRequireMixed = () => this.attributes.password_require_mixed

  // boolean # Require a number in passwords?
  getPasswordRequireNumber = () => this.attributes.password_require_number

  // boolean # Require special characters in password?
  getPasswordRequireSpecial = () => this.attributes.password_require_special

  // boolean # Require passwords that have not been previously breached? (see https://haveibeenpwned.com/)
  getPasswordRequireUnbreached = () => this.attributes.password_require_unbreached

  // boolean # Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same requirements as users' passwords?
  getPasswordRequirementsApplyToBundles = () => this.attributes.password_requirements_apply_to_bundles

  // int64 # Number of days password is valid
  getPasswordValidityDays = () => this.attributes.password_validity_days

  // string # Site phone number
  getPhone = () => this.attributes.phone

  // boolean # If true, we will ensure that all internal communications with any remote server are made through the primary region of the site. This setting overrides individual remote server settings.
  getPinAllRemoteServersToSiteRegion = () => this.attributes.pin_all_remote_servers_to_site_region

  // boolean # If true, we will prevent non-administrators from receiving any permissions directly on the root folder.  This is commonly used to prevent the accidental application of permissions.
  getPreventRootPermissionsForNonSiteAdmins = () => this.attributes.prevent_root_permissions_for_non_site_admins

  // boolean # If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups will be honored.  Make sure that your current user is a member of a group with API permission when changing this value to avoid locking yourself out of your site.
  getProtocolAccessGroupsOnly = () => this.attributes.protocol_access_groups_only

  // boolean # Require two-factor authentication for all users?
  getRequire2fa = () => this.attributes.require_2fa

  // boolean # If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would disable one.
  getRestrictRootFolderBehaviorsToSiteAdmins = () => this.attributes.restrict_root_folder_behaviors_to_site_admins

  // boolean # If true, supported protective behaviors at the site root also apply within named workspaces. Requires restrict_root_folder_behaviors_to_site_admins to be enabled.
  getRootFolderBehaviorsApplyToWorkspaces = () => this.attributes.root_folder_behaviors_apply_to_workspaces

  // boolean # If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide two-factor authentication requirement.
  getRequire2faExemptAllSsoUsers = () => this.attributes.require_2fa_exempt_all_sso_users

  // date-time # If set, requirement for two-factor authentication has been scheduled to end on this date-time.
  getRequire2faStopTime = () => this.attributes.require_2fa_stop_time

  // boolean # Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period.
  getRevokeBundleAccessOnDisableOrDelete = () => this.attributes.revoke_bundle_access_on_disable_or_delete

  // string # What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
  getRequire2faUserType = () => this.attributes.require_2fa_user_type

  // boolean # If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user logout and log back in every time they visit the page.
  getRequireLogoutFromBundlesAndInboxes = () => this.attributes.require_logout_from_bundles_and_inboxes

  // Session # Current session
  getSession = () => this.attributes.session

  // boolean # Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false, user and group S3 permissions do not allow access.
  getS3CompatibleEndpointEnabled = () => this.attributes.s3_compatible_endpoint_enabled

  // boolean # Is SFTP enabled?
  getSftpEnabled = () => this.attributes.sftp_enabled

  // boolean # Finalize partial SFTP uploads from interrupted connections? Default: true.
  getSftpFinalizePartialUploads = () => this.attributes.sftp_finalize_partial_uploads

  // string # Sftp Host Key Type
  getSftpHostKeyType = () => this.attributes.sftp_host_key_type

  // int64 # Id of the currently selected custom SFTP Host Key
  getActiveSftpHostKeyId = () => this.attributes.active_sftp_host_key_id

  // array(int64) # Ids of the selected custom SFTP Host Keys
  getActiveSftpHostKeyIds = () => this.attributes.active_sftp_host_key_ids

  // boolean # If true, we will allow weak and known insecure ciphers to be used for SFTP connections.  Enabling this setting severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
  getSftpInsecureCiphers = () => this.attributes.sftp_insecure_ciphers

  // boolean # If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on our secure list.  This has the effect of making the cipher weaker than our normal threshold for security, but is required to support certain legacy or broken SSH and MFT clients.  Enabling this weakens security, but not nearly as much as enabling the full `sftp_insecure_ciphers` option.
  getSftpInsecureDiffieHellman = () => this.attributes.sftp_insecure_diffie_hellman

  // boolean # Use user FTP roots also for SFTP?
  getSftpUserRootEnabled = () => this.attributes.sftp_user_root_enabled

  // boolean # Allow bundle creation
  getSharingEnabled = () => this.attributes.sharing_enabled

  // boolean # Show log in link in user notifications?
  getShowUserNotificationsLogInLink = () => this.attributes.show_user_notifications_log_in_link

  // boolean # Show request access link for users without access?  Currently unused.
  getShowRequestAccessLink = () => this.attributes.show_request_access_link

  // string # Custom site footer text for authenticated pages
  getSiteFooter = () => this.attributes.site_footer

  // string # Custom site header text for authenticated pages
  getSiteHeader = () => this.attributes.site_header

  // string # Custom site footer text for public pages
  getSitePublicFooter = () => this.attributes.site_public_footer

  // string # Custom site header text for public pages
  getSitePublicHeader = () => this.attributes.site_public_header

  // string # SMTP server hostname or IP
  getSmtpAddress = () => this.attributes.smtp_address

  // string # SMTP server authentication type
  getSmtpAuthentication = () => this.attributes.smtp_authentication

  // string # From address to use when mailing through custom SMTP
  getSmtpFrom = () => this.attributes.smtp_from

  // int64 # SMTP server port
  getSmtpPort = () => this.attributes.smtp_port

  // string # Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials and messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to require unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication; require_implicit uses TLS from connection start; never disables TLS. TLS verifies the server certificate against smtp_address. Encryption is never automatically downgraded.
  getSmtpSsl = () => this.attributes.smtp_ssl

  // string # SMTP server username
  getSmtpUsername = () => this.attributes.smtp_username

  // int64 # Session expiry in minutes
  getSessionExpiryMinutes = () => this.attributes.session_expiry_minutes

  // boolean # Allow snapshot share links creation
  getSnapshotSharingEnabled = () => this.attributes.snapshot_sharing_enabled

  // boolean # Is SSL required?  Disabling this is insecure.
  getSslRequired = () => this.attributes.ssl_required

  // string # Site subdomain
  getSubdomain = () => this.attributes.subdomain

  // date-time # If switching plans, when does the new plan take effect?
  getSwitchToPlanDate = () => this.attributes.switch_to_plan_date

  // int64 # Number of days left in trial
  getTrialDaysLeft = () => this.attributes.trial_days_left

  // date-time # When does this Site trial expire?
  getTrialUntil = () => this.attributes.trial_until

  // boolean # If using custom SMTP, should we use dedicated IPs to deliver emails?
  getUseDedicatedIpsForSmtp = () => this.attributes.use_dedicated_ips_for_smtp

  // boolean # Allow uploaders to set `provided_modified_at` for uploaded files?
  getUseProvidedModifiedAt = () => this.attributes.use_provided_modified_at

  // User # User of current session
  getUser = () => this.attributes.user

  // boolean # Will users be locked out after incorrect login attempts?
  getUserLockout = () => this.attributes.user_lockout

  // int64 # How many hours to lock user out for failed password?
  getUserLockoutLockPeriod = () => this.attributes.user_lockout_lock_period

  // int64 # Number of login tries within `user_lockout_within` hours before users are locked out
  getUserLockoutTries = () => this.attributes.user_lockout_tries

  // int64 # Number of hours for user lockout window
  getUserLockoutWithin = () => this.attributes.user_lockout_within

  // boolean # Enable User Requests feature
  getUserRequestsEnabled = () => this.attributes.user_requests_enabled

  // boolean # Send email to site admins when a user request is received?
  getUserRequestsNotifyAdmins = () => this.attributes.user_requests_notify_admins

  // boolean # Allow users to create their own API keys?
  getUsersCanCreateApiKeys = () => this.attributes.users_can_create_api_keys

  // boolean # Allow users to create their own SSH keys?
  getUsersCanCreateSshKeys = () => this.attributes.users_can_create_ssh_keys

  // string # How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`, `full_name_company`, or `full_name_username_company`.
  getUsernameDisplay = () => this.attributes.username_display

  // string # Custom text send in user welcome email
  getWelcomeCustomText = () => this.attributes.welcome_custom_text

  // string # Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like %Y (4-digit year), %m (month), %d (day).
  getEmailFooterCustomText = () => this.attributes.email_footer_custom_text

  // email # Include this email in welcome emails if enabled
  getWelcomeEmailCc = () => this.attributes.welcome_email_cc

  // string # Include this email subject in welcome emails if enabled
  getWelcomeEmailSubject = () => this.attributes.welcome_email_subject

  // boolean # Will the welcome email be sent to new users?
  getWelcomeEmailEnabled = () => this.attributes.welcome_email_enabled

  // string # Does the welcome screen appear?
  getWelcomeScreen = () => this.attributes.welcome_screen

  // boolean # Does FTP user Windows emulation mode?
  getWindowsModeFtp = () => this.attributes.windows_mode_ftp

  static get = async (options = {}) => {
    const response = await Api.sendRequest('/site', 'GET', {}, options)

    return new Site(response?.data, retainedOptions(options))
  }

  static getUsage = async (options = {}) => {
    const response = await Api.sendRequest('/site/usage', 'GET', {}, options)

    const UsageSnapshot = require('./UsageSnapshot.js').default
    return new UsageSnapshot(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   name - string - Site name
  //   subdomain - string - Site subdomain
  //   domain - string - Custom domain
  //   domain_hsts_header - boolean - Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain?
  //   domain_letsencrypt_chain - string - Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026.
  //   email - string - Main email for this site
  //   reply_to_email - string - Reply-to email for this site
  //   allow_bundle_names - boolean - Are manual Bundle names allowed?
  //   bundle_expiration - int64 - Site-wide Bundle expiration in days
  //   welcome_email_enabled - boolean - Will the welcome email be sent to new users?
  //   ask_about_overwrites - boolean - If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
  //   show_request_access_link - boolean - Show request access link for users without access?  Currently unused.
  //   always_mkdir_parents - boolean - Create parent directories if they do not exist during uploads?  This is primarily used to work around broken upload clients that assume servers will perform this step.
  //   welcome_email_cc - string - Include this email in welcome emails if enabled
  //   welcome_email_subject - string - Include this email subject in welcome emails if enabled
  //   welcome_custom_text - string - Custom text send in user welcome email
  //   language - string - Site default language
  //   windows_mode_ftp - boolean - Does FTP user Windows emulation mode?
  //   default_time_zone - string - Site default time zone
  //   desktop_app - boolean - Is the desktop app enabled?
  //   desktop_app_session_ip_pinning - boolean - Is desktop app session IP pinning enabled?
  //   desktop_app_session_lifetime - int64 - Desktop app session lifetime (in hours)
  //   mobile_app - boolean - Is the mobile app enabled?
  //   mobile_app_session_ip_pinning - boolean - Is mobile app session IP pinning enabled?
  //   mobile_app_session_lifetime - int64 - Mobile app session lifetime (in hours)
  //   folder_permissions_groups_only - boolean - If true, permissions for this site must be bound to a group (not a user).
  //   welcome_screen - string - Does the welcome screen appear?
  //   office_integration_available - boolean - If true, allows users to use a document editing integration.
  //   office_integration_type - string - Which document editing integration to support. Files.com Editor or Microsoft Office for the Web.
  //   pin_all_remote_servers_to_site_region - boolean - If true, we will ensure that all internal communications with any remote server are made through the primary region of the site. This setting overrides individual remote server settings.
  //   motd_text - string - A message to show users when they connect via FTP or SFTP.
  //   motd_use_for_ftp - boolean - Show message to users connecting via FTP
  //   motd_use_for_sftp - boolean - Show message to users connecting via SFTP
  //   left_navigation_visibility - object - Visibility settings for account navigation
  //   disable_all_ai_features - boolean - If true, all AI features are disabled for this site.
  //   ai_feature_availability - object - Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins, and all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group in group_ids get access regardless of the other options. All availability options are additive: any enabled option matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this site, from any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not affect other options. Disabling all AI features overrides these settings.
  //   mcp_dcr_enabled - boolean - Is OAuth DCR (dynamic client registration) for MCP enabled?
  //   additional_text_file_types - array(string) - Additional extensions that are considered text files
  //   bundle_require_note - boolean - Do Bundles require internal notes?
  //   bundle_send_shared_receipts - boolean - Do Bundle creators receive receipts of invitations?
  //   bundles_default_owned_by_primary_group - boolean - If true, new Share Links created by a user with a primary group will default to that group as owner.
  //   calculate_file_checksums_crc32 - boolean - Calculate CRC32 checksums for files?
  //   calculate_file_checksums_md5 - boolean - Calculate MD5 checksums for files?
  //   calculate_file_checksums_sha1 - boolean - Calculate SHA1 checksums for files?
  //   calculate_file_checksums_sha256 - boolean - Calculate SHA256 checksums for files?
  //   legacy_checksums_mode - boolean - Use legacy checksums mode?
  //   migrate_remote_server_sync_to_sync - boolean - If true, we will migrate all remote server syncs to the new Sync model.
  //   as2_message_retention_days - int64 - Number of days to retain AS2 messages (incoming and outgoing).
  //   file_activity_events_enabled - boolean - If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to false; subscription filters and workspace access still control delivery.
  //   username_display - string - How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`, `full_name_company`, or `full_name_username_company`.
  //   session_expiry_minutes - int64 - Session expiry in minutes
  //   ssl_required - boolean - Is SSL required?  Disabling this is insecure.
  //   sftp_insecure_ciphers - boolean - If true, we will allow weak and known insecure ciphers to be used for SFTP connections.  Enabling this setting severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
  //   sftp_insecure_diffie_hellman - boolean - If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on our secure list.  This has the effect of making the cipher weaker than our normal threshold for security, but is required to support certain legacy or broken SSH and MFT clients.  Enabling this weakens security, but not nearly as much as enabling the full `sftp_insecure_ciphers` option.
  //   disable_files_certificate_generation - boolean - If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
  //   fedramp - boolean - Are FedRAMP security restrictions enabled for this site?
  //   user_lockout - boolean - Will users be locked out after incorrect login attempts?
  //   user_lockout_tries - int64 - Number of login tries within `user_lockout_within` hours before users are locked out
  //   user_lockout_within - int64 - Number of hours for user lockout window
  //   user_lockout_lock_period - int64 - How many hours to lock user out for failed password?
  //   include_password_in_welcome_email - boolean - Include password in emails to new users?
  //   allowed_countries - string - Comma separated list of allowed Country codes
  //   allowed_ips - string - List of allowed IP addresses
  //   allow_user_level_2fa_override - boolean - Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis?
  //   allow_user_level_allowed_ip_override - boolean - Allow the site-wide allowed IP restriction to be overriden on a per-user-basis?
  //   allow_user_level_ssl_override - boolean - Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis?
  //   disallowed_countries - string - Comma separated list of disallowed Country codes
  //   days_to_retain_backups - int64 - Number of days to keep deleted files
  //   max_prior_passwords - int64 - Number of prior passwords to disallow
  //   password_validity_days - int64 - Number of days password is valid
  //   password_min_length - int64 - Shortest password length for users
  //   password_require_letter - boolean - Require a letter in passwords?
  //   password_require_mixed - boolean - Require lower and upper case letters in passwords?
  //   password_require_special - boolean - Require special characters in password?
  //   password_require_number - boolean - Require a number in passwords?
  //   password_require_unbreached - boolean - Require passwords that have not been previously breached? (see https://haveibeenpwned.com/)
  //   require_logout_from_bundles_and_inboxes - boolean - If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user logout and log back in every time they visit the page.
  //   dav_user_root_enabled - boolean - Use user FTP roots also for WebDAV?
  //   sftp_user_root_enabled - boolean - Use user FTP roots also for SFTP?
  //   disable_password_reset - boolean - Is password reset disabled?
  //   immutable_files - boolean - Are files protected from modification?
  //   bundle_not_found_message - string - Custom error message to show when bundle is not found.
  //   bundle_password_required - boolean - Do Bundles require password protection?
  //   bundle_require_registration - boolean - Do Bundles require registration?
  //   bundle_require_share_recipient - boolean - Do Bundles require recipients for sharing?
  //   bundle_send_one_time_password_to_recipient_at_registration - boolean - If true, new Share Links must send a one-time password to the recipient when they register. Requires bundle_require_share_recipient and cannot be enabled with bundle_password_required.
  //   bundle_registration_notifications - string - Do Bundle owners receive registration notification?
  //   bundle_activity_notifications - string - Do Bundle owners receive activity notifications?
  //   bundle_upload_receipt_notifications - string - Do Bundle uploaders receive upload confirmation notifications?
  //   document_edits_in_bundle_allowed - boolean - If true, allow public viewers of Bundles with full permissions to use document editing integrations.
  //   password_requirements_apply_to_bundles - boolean - Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same requirements as users' passwords?
  //   prevent_root_permissions_for_non_site_admins - boolean - If true, we will prevent non-administrators from receiving any permissions directly on the root folder.  This is commonly used to prevent the accidental application of permissions.
  //   restrict_root_folder_behaviors_to_site_admins - boolean - If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would disable one.
  //   root_folder_behaviors_apply_to_workspaces - boolean - If true, supported protective behaviors at the site root also apply within named workspaces. Requires restrict_root_folder_behaviors_to_site_admins to be enabled.
  //   opt_out_global - boolean - Use servers in the USA only?
  //   use_provided_modified_at - boolean - Allow uploaders to set `provided_modified_at` for uploaded files?
  //   custom_namespace - boolean - Is this site using a custom namespace for users?
  //   non_sso_groups_allowed - boolean - If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed via your SSO provider.
  //   non_sso_users_allowed - boolean - If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed via your SSO provider.
  //   sharing_enabled - boolean - Allow bundle creation
  //   snapshot_sharing_enabled - boolean - Allow snapshot share links creation
  //   user_requests_enabled - boolean - Enable User Requests feature
  //   user_requests_notify_admins - boolean - Send email to site admins when a user request is received?
  //   dav_enabled - boolean - Is WebDAV enabled?
  //   files_com_remote_server_enabled - boolean - Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults to true and applies to all keys and workspaces on this site. When false, new pairings and access through existing connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
  //   ftp_enabled - boolean - Is FTP enabled?
  //   s3_compatible_endpoint_enabled - boolean - Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false, user and group S3 permissions do not allow access.
  //   sftp_enabled - boolean - Is SFTP enabled?
  //   sftp_finalize_partial_uploads - boolean - Finalize partial SFTP uploads from interrupted connections? Default: true.
  //   users_can_create_api_keys - boolean - Allow users to create their own API keys?
  //   users_can_create_ssh_keys - boolean - Allow users to create their own SSH keys?
  //   show_user_notifications_log_in_link - boolean - Show log in link in user notifications?
  //   sftp_host_key_type - string - Sftp Host Key Type
  //   active_sftp_host_key_id - int64 - Id of the currently selected custom SFTP Host Key
  //   active_sftp_host_key_ids - array(int64) - Ids of the selected custom SFTP Host Keys
  //   protocol_access_groups_only - boolean - If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups will be honored.  Make sure that your current user is a member of a group with API permission when changing this value to avoid locking yourself out of your site.
  //   revoke_bundle_access_on_disable_or_delete - boolean - Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period.
  //   group_admins_can_add_users - boolean - Allow group admins to create users in their groups
  //   group_admins_can_manage_group_memberships - boolean - Allow group admins to add or remove existing users in their groups
  //   group_admins_can_delete_users - boolean - Allow group admins to delete users in their groups
  //   group_admins_can_enable_disable_users - boolean - Allow group admins to enable or disable users in their groups
  //   group_admins_can_modify_users - boolean - Allow group admins to modify users in their groups
  //   group_admins_can_bypass_user_lifecycle_rules - boolean - Allow group admins to exempt users in their groups from lifecycle rules
  //   group_admins_can_reset_passwords - boolean - Allow group admins to reset passwords for users in their groups
  //   group_admins_can_set_user_password - boolean - Allow group admins to set password authentication method
  //   child_site_folder_admins_can_see_parent_site_directory - boolean - If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default Workspace users and groups and grant them folder permissions and notifications on Child Site paths.
  //   workspace_folder_admins_can_see_default_workspace_directory - boolean - If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users and groups that have permissions in that Workspace and choose them as Email Notification recipients.
  //   bundle_recipient_blacklist_free_email_domains - boolean - Disallow free email domains for Bundle/Inbox recipients?
  //   bundle_recipient_blacklist_domains - array(string) - List of email domains to disallow when entering a Bundle/Inbox recipients
  //   admins_bypass_locked_subfolders - boolean - Allow admins to bypass the locked subfolders setting.
  //   allowed_2fa_method_sms - boolean - Is SMS two factor authentication allowed?
  //   allowed_2fa_method_totp - boolean - Is TOTP two factor authentication allowed?
  //   allowed_2fa_method_webauthn - boolean - Is WebAuthn two factor authentication allowed?
  //   allowed_2fa_method_yubi - boolean - Is yubikey two factor authentication allowed?
  //   allowed_2fa_method_email - boolean - Is OTP via email two factor authentication allowed?
  //   allowed_2fa_method_static - boolean - Is OTP via static codes for two factor authentication allowed?
  //   allowed_2fa_method_bypass_for_ftp_sftp_dav - boolean - Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV?
  //   require_2fa - boolean - Require two-factor authentication for all users?
  //   require_2fa_exempt_all_sso_users - boolean - If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide two-factor authentication requirement.
  //   require_2fa_user_type - string - What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
  //   color2_top - string - Top bar background color
  //   color2_left - string - Page link and button color
  //   color2_link - string - Top bar link color
  //   color2_text - string - Page link and button color
  //   color2_top_text - string - Top bar text color
  //   site_header - string - Custom site header text for authenticated pages
  //   site_footer - string - Custom site footer text for authenticated pages
  //   site_public_header - string - Custom site header text for public pages
  //   site_public_footer - string - Custom site footer text for public pages
  //   login_help_text - string - Login help text
  //   use_dedicated_ips_for_smtp - boolean - If using custom SMTP, should we use dedicated IPs to deliver emails?
  //   email_footer_custom_text - string - Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like %Y (4-digit year), %m (month), %d (day).
  //   smtp_address - string - SMTP server hostname or IP
  //   smtp_authentication - string - SMTP server authentication type
  //   smtp_from - string - From address to use when mailing through custom SMTP
  //   smtp_username - string - SMTP server username
  //   smtp_port - int64 - SMTP server port
  //   smtp_ssl - string - Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials and messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to require unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication; require_implicit uses TLS from connection start; never disables TLS. TLS verifies the server certificate against smtp_address. Encryption is never automatically downgraded.
  //   ldap_enabled - boolean - Main LDAP setting: is LDAP enabled?
  //   ldap_type - string - LDAP type
  //   ldap_host - string - LDAP host
  //   ldap_host_2 - string - LDAP backup host
  //   ldap_host_3 - string - LDAP backup host
  //   ldap_port - int64 - LDAP port
  //   ldap_secure - boolean - Use secure LDAP?
  //   ldap_server_certificate - string - How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname; `allow_any` disables certificate validation.
  //   ldap_username - string - Username for signing in to LDAP server.
  //   ldap_username_field - string - LDAP username field
  //   ldap_domain - string - Domain name that will be appended to usernames
  //   ldap_user_action - string - Should we sync users from LDAP server?
  //   ldap_group_action - string - Should we sync groups from LDAP server?
  //   ldap_user_include_groups - string - Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these groups will be added or synced.
  //   ldap_group_exclusion - string - Comma or newline separated list of group names (with optional wildcards) to exclude when syncing.
  //   ldap_group_inclusion - string - Comma or newline separated list of group names (with optional wildcards) to include when syncing.
  //   ldap_base_dn - string - Base DN for looking up users in LDAP server
  //   uploads_via_email_authentication - boolean - Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email Automations in every Workspace on this site?
  //   bundle_watermark_value - object - Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  //   icon16_file - file
  //   icon16_delete - boolean - If true, will delete the file stored in icon16
  //   icon32_file - file
  //   icon32_delete - boolean - If true, will delete the file stored in icon32
  //   icon48_file - file
  //   icon48_delete - boolean - If true, will delete the file stored in icon48
  //   icon128_file - file
  //   icon128_delete - boolean - If true, will delete the file stored in icon128
  //   logo_file - file
  //   logo_delete - boolean - If true, will delete the file stored in logo
  //   bundle_watermark_attachment_file - file
  //   bundle_watermark_attachment_delete - boolean - If true, will delete the file stored in bundle_watermark_attachment
  //   login_page_background_image_file - file
  //   login_page_background_image_delete - boolean - If true, will delete the file stored in login_page_background_image
  //   disable_2fa_with_delay - boolean - If set to true, we will begin the process of disabling 2FA on this site.
  //   ldap_password_change - string - New LDAP password.
  //   ldap_password_change_confirmation - string - Confirm new LDAP password.
  //   redirect_old_subdomain - boolean - If true, and if changing the site subdomain, then create a redirect from the previous Files.com subdomain to the new Files.com subdomain.
  //   smtp_password - string - Password for SMTP server.
  static update = async (params = {}, options = {}) => {
    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.subdomain !== undefined && params.subdomain !== null && !isString(params.subdomain)) {
      throw new errors.InvalidParameterError(`Bad parameter: subdomain must be of type String, received ${getType(params.subdomain)}`)
    }

    if (params.domain !== undefined && params.domain !== null && !isString(params.domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain must be of type String, received ${getType(params.domain)}`)
    }

    if (isArray(params.domain_hsts_header) || isObject(params.domain_hsts_header)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain_hsts_header must be of type Boolean, received ${getType(params.domain_hsts_header)}`)
    }

    if (params.domain_letsencrypt_chain !== undefined && params.domain_letsencrypt_chain !== null && !isString(params.domain_letsencrypt_chain)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain_letsencrypt_chain must be of type String, received ${getType(params.domain_letsencrypt_chain)}`)
    }

    if (params.email !== undefined && params.email !== null && !isString(params.email)) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params.email)}`)
    }

    if (params.reply_to_email !== undefined && params.reply_to_email !== null && !isString(params.reply_to_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: reply_to_email must be of type String, received ${getType(params.reply_to_email)}`)
    }

    if (isArray(params.allow_bundle_names) || isObject(params.allow_bundle_names)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_bundle_names must be of type Boolean, received ${getType(params.allow_bundle_names)}`)
    }

    if (params.bundle_expiration !== undefined && params.bundle_expiration !== null && !isInt(params.bundle_expiration)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_expiration must be of type Int, received ${getType(params.bundle_expiration)}`)
    }

    if (isArray(params.welcome_email_enabled) || isObject(params.welcome_email_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_email_enabled must be of type Boolean, received ${getType(params.welcome_email_enabled)}`)
    }

    if (isArray(params.ask_about_overwrites) || isObject(params.ask_about_overwrites)) {
      throw new errors.InvalidParameterError(`Bad parameter: ask_about_overwrites must be of type Boolean, received ${getType(params.ask_about_overwrites)}`)
    }

    if (isArray(params.show_request_access_link) || isObject(params.show_request_access_link)) {
      throw new errors.InvalidParameterError(`Bad parameter: show_request_access_link must be of type Boolean, received ${getType(params.show_request_access_link)}`)
    }

    if (isArray(params.always_mkdir_parents) || isObject(params.always_mkdir_parents)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_mkdir_parents must be of type Boolean, received ${getType(params.always_mkdir_parents)}`)
    }

    if (params.welcome_email_cc !== undefined && params.welcome_email_cc !== null && !isString(params.welcome_email_cc)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_email_cc must be of type String, received ${getType(params.welcome_email_cc)}`)
    }

    if (params.welcome_email_subject !== undefined && params.welcome_email_subject !== null && !isString(params.welcome_email_subject)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_email_subject must be of type String, received ${getType(params.welcome_email_subject)}`)
    }

    if (params.welcome_custom_text !== undefined && params.welcome_custom_text !== null && !isString(params.welcome_custom_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_custom_text must be of type String, received ${getType(params.welcome_custom_text)}`)
    }

    if (params.language !== undefined && params.language !== null && !isString(params.language)) {
      throw new errors.InvalidParameterError(`Bad parameter: language must be of type String, received ${getType(params.language)}`)
    }

    if (isArray(params.windows_mode_ftp) || isObject(params.windows_mode_ftp)) {
      throw new errors.InvalidParameterError(`Bad parameter: windows_mode_ftp must be of type Boolean, received ${getType(params.windows_mode_ftp)}`)
    }

    if (params.default_time_zone !== undefined && params.default_time_zone !== null && !isString(params.default_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_time_zone must be of type String, received ${getType(params.default_time_zone)}`)
    }

    if (isArray(params.desktop_app) || isObject(params.desktop_app)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_app must be of type Boolean, received ${getType(params.desktop_app)}`)
    }

    if (isArray(params.desktop_app_session_ip_pinning) || isObject(params.desktop_app_session_ip_pinning)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_app_session_ip_pinning must be of type Boolean, received ${getType(params.desktop_app_session_ip_pinning)}`)
    }

    if (params.desktop_app_session_lifetime !== undefined && params.desktop_app_session_lifetime !== null && !isInt(params.desktop_app_session_lifetime)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_app_session_lifetime must be of type Int, received ${getType(params.desktop_app_session_lifetime)}`)
    }

    if (isArray(params.mobile_app) || isObject(params.mobile_app)) {
      throw new errors.InvalidParameterError(`Bad parameter: mobile_app must be of type Boolean, received ${getType(params.mobile_app)}`)
    }

    if (isArray(params.mobile_app_session_ip_pinning) || isObject(params.mobile_app_session_ip_pinning)) {
      throw new errors.InvalidParameterError(`Bad parameter: mobile_app_session_ip_pinning must be of type Boolean, received ${getType(params.mobile_app_session_ip_pinning)}`)
    }

    if (params.mobile_app_session_lifetime !== undefined && params.mobile_app_session_lifetime !== null && !isInt(params.mobile_app_session_lifetime)) {
      throw new errors.InvalidParameterError(`Bad parameter: mobile_app_session_lifetime must be of type Int, received ${getType(params.mobile_app_session_lifetime)}`)
    }

    if (isArray(params.folder_permissions_groups_only) || isObject(params.folder_permissions_groups_only)) {
      throw new errors.InvalidParameterError(`Bad parameter: folder_permissions_groups_only must be of type Boolean, received ${getType(params.folder_permissions_groups_only)}`)
    }

    if (params.welcome_screen !== undefined && params.welcome_screen !== null && !isString(params.welcome_screen)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_screen must be of type String, received ${getType(params.welcome_screen)}`)
    }

    if (isArray(params.office_integration_available) || isObject(params.office_integration_available)) {
      throw new errors.InvalidParameterError(`Bad parameter: office_integration_available must be of type Boolean, received ${getType(params.office_integration_available)}`)
    }

    if (params.office_integration_type !== undefined && params.office_integration_type !== null && !isString(params.office_integration_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: office_integration_type must be of type String, received ${getType(params.office_integration_type)}`)
    }

    if (isArray(params.pin_all_remote_servers_to_site_region) || isObject(params.pin_all_remote_servers_to_site_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: pin_all_remote_servers_to_site_region must be of type Boolean, received ${getType(params.pin_all_remote_servers_to_site_region)}`)
    }

    if (params.motd_text !== undefined && params.motd_text !== null && !isString(params.motd_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: motd_text must be of type String, received ${getType(params.motd_text)}`)
    }

    if (isArray(params.motd_use_for_ftp) || isObject(params.motd_use_for_ftp)) {
      throw new errors.InvalidParameterError(`Bad parameter: motd_use_for_ftp must be of type Boolean, received ${getType(params.motd_use_for_ftp)}`)
    }

    if (isArray(params.motd_use_for_sftp) || isObject(params.motd_use_for_sftp)) {
      throw new errors.InvalidParameterError(`Bad parameter: motd_use_for_sftp must be of type Boolean, received ${getType(params.motd_use_for_sftp)}`)
    }

    if (isArray(params.disable_all_ai_features) || isObject(params.disable_all_ai_features)) {
      throw new errors.InvalidParameterError(`Bad parameter: disable_all_ai_features must be of type Boolean, received ${getType(params.disable_all_ai_features)}`)
    }

    if (isArray(params.mcp_dcr_enabled) || isObject(params.mcp_dcr_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: mcp_dcr_enabled must be of type Boolean, received ${getType(params.mcp_dcr_enabled)}`)
    }

    if (params.additional_text_file_types !== undefined && params.additional_text_file_types !== null && !isArray(params.additional_text_file_types)) {
      throw new errors.InvalidParameterError(`Bad parameter: additional_text_file_types must be of type Array, received ${getType(params.additional_text_file_types)}`)
    }

    if (isArray(params.bundle_require_note) || isObject(params.bundle_require_note)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_require_note must be of type Boolean, received ${getType(params.bundle_require_note)}`)
    }

    if (isArray(params.bundle_send_shared_receipts) || isObject(params.bundle_send_shared_receipts)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_send_shared_receipts must be of type Boolean, received ${getType(params.bundle_send_shared_receipts)}`)
    }

    if (isArray(params.bundles_default_owned_by_primary_group) || isObject(params.bundles_default_owned_by_primary_group)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundles_default_owned_by_primary_group must be of type Boolean, received ${getType(params.bundles_default_owned_by_primary_group)}`)
    }

    if (isArray(params.calculate_file_checksums_crc32) || isObject(params.calculate_file_checksums_crc32)) {
      throw new errors.InvalidParameterError(`Bad parameter: calculate_file_checksums_crc32 must be of type Boolean, received ${getType(params.calculate_file_checksums_crc32)}`)
    }

    if (isArray(params.calculate_file_checksums_md5) || isObject(params.calculate_file_checksums_md5)) {
      throw new errors.InvalidParameterError(`Bad parameter: calculate_file_checksums_md5 must be of type Boolean, received ${getType(params.calculate_file_checksums_md5)}`)
    }

    if (isArray(params.calculate_file_checksums_sha1) || isObject(params.calculate_file_checksums_sha1)) {
      throw new errors.InvalidParameterError(`Bad parameter: calculate_file_checksums_sha1 must be of type Boolean, received ${getType(params.calculate_file_checksums_sha1)}`)
    }

    if (isArray(params.calculate_file_checksums_sha256) || isObject(params.calculate_file_checksums_sha256)) {
      throw new errors.InvalidParameterError(`Bad parameter: calculate_file_checksums_sha256 must be of type Boolean, received ${getType(params.calculate_file_checksums_sha256)}`)
    }

    if (isArray(params.legacy_checksums_mode) || isObject(params.legacy_checksums_mode)) {
      throw new errors.InvalidParameterError(`Bad parameter: legacy_checksums_mode must be of type Boolean, received ${getType(params.legacy_checksums_mode)}`)
    }

    if (isArray(params.migrate_remote_server_sync_to_sync) || isObject(params.migrate_remote_server_sync_to_sync)) {
      throw new errors.InvalidParameterError(`Bad parameter: migrate_remote_server_sync_to_sync must be of type Boolean, received ${getType(params.migrate_remote_server_sync_to_sync)}`)
    }

    if (params.as2_message_retention_days !== undefined && params.as2_message_retention_days !== null && !isInt(params.as2_message_retention_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: as2_message_retention_days must be of type Int, received ${getType(params.as2_message_retention_days)}`)
    }

    if (isArray(params.file_activity_events_enabled) || isObject(params.file_activity_events_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_activity_events_enabled must be of type Boolean, received ${getType(params.file_activity_events_enabled)}`)
    }

    if (params.username_display !== undefined && params.username_display !== null && !isString(params.username_display)) {
      throw new errors.InvalidParameterError(`Bad parameter: username_display must be of type String, received ${getType(params.username_display)}`)
    }

    if (params.session_expiry_minutes !== undefined && params.session_expiry_minutes !== null && !isInt(params.session_expiry_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: session_expiry_minutes must be of type Int, received ${getType(params.session_expiry_minutes)}`)
    }

    if (isArray(params.ssl_required) || isObject(params.ssl_required)) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_required must be of type Boolean, received ${getType(params.ssl_required)}`)
    }

    if (isArray(params.sftp_insecure_ciphers) || isObject(params.sftp_insecure_ciphers)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_insecure_ciphers must be of type Boolean, received ${getType(params.sftp_insecure_ciphers)}`)
    }

    if (isArray(params.sftp_insecure_diffie_hellman) || isObject(params.sftp_insecure_diffie_hellman)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_insecure_diffie_hellman must be of type Boolean, received ${getType(params.sftp_insecure_diffie_hellman)}`)
    }

    if (isArray(params.disable_files_certificate_generation) || isObject(params.disable_files_certificate_generation)) {
      throw new errors.InvalidParameterError(`Bad parameter: disable_files_certificate_generation must be of type Boolean, received ${getType(params.disable_files_certificate_generation)}`)
    }

    if (isArray(params.fedramp) || isObject(params.fedramp)) {
      throw new errors.InvalidParameterError(`Bad parameter: fedramp must be of type Boolean, received ${getType(params.fedramp)}`)
    }

    if (isArray(params.user_lockout) || isObject(params.user_lockout)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout must be of type Boolean, received ${getType(params.user_lockout)}`)
    }

    if (params.user_lockout_tries !== undefined && params.user_lockout_tries !== null && !isInt(params.user_lockout_tries)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout_tries must be of type Int, received ${getType(params.user_lockout_tries)}`)
    }

    if (params.user_lockout_within !== undefined && params.user_lockout_within !== null && !isInt(params.user_lockout_within)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout_within must be of type Int, received ${getType(params.user_lockout_within)}`)
    }

    if (params.user_lockout_lock_period !== undefined && params.user_lockout_lock_period !== null && !isInt(params.user_lockout_lock_period)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout_lock_period must be of type Int, received ${getType(params.user_lockout_lock_period)}`)
    }

    if (isArray(params.include_password_in_welcome_email) || isObject(params.include_password_in_welcome_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_password_in_welcome_email must be of type Boolean, received ${getType(params.include_password_in_welcome_email)}`)
    }

    if (params.allowed_countries !== undefined && params.allowed_countries !== null && !isString(params.allowed_countries)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_countries must be of type String, received ${getType(params.allowed_countries)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (isArray(params.allow_user_level_2fa_override) || isObject(params.allow_user_level_2fa_override)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_user_level_2fa_override must be of type Boolean, received ${getType(params.allow_user_level_2fa_override)}`)
    }

    if (isArray(params.allow_user_level_allowed_ip_override) || isObject(params.allow_user_level_allowed_ip_override)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_user_level_allowed_ip_override must be of type Boolean, received ${getType(params.allow_user_level_allowed_ip_override)}`)
    }

    if (isArray(params.allow_user_level_ssl_override) || isObject(params.allow_user_level_ssl_override)) {
      throw new errors.InvalidParameterError(`Bad parameter: allow_user_level_ssl_override must be of type Boolean, received ${getType(params.allow_user_level_ssl_override)}`)
    }

    if (params.disallowed_countries !== undefined && params.disallowed_countries !== null && !isString(params.disallowed_countries)) {
      throw new errors.InvalidParameterError(`Bad parameter: disallowed_countries must be of type String, received ${getType(params.disallowed_countries)}`)
    }

    if (params.days_to_retain_backups !== undefined && params.days_to_retain_backups !== null && !isInt(params.days_to_retain_backups)) {
      throw new errors.InvalidParameterError(`Bad parameter: days_to_retain_backups must be of type Int, received ${getType(params.days_to_retain_backups)}`)
    }

    if (params.max_prior_passwords !== undefined && params.max_prior_passwords !== null && !isInt(params.max_prior_passwords)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_prior_passwords must be of type Int, received ${getType(params.max_prior_passwords)}`)
    }

    if (params.password_validity_days !== undefined && params.password_validity_days !== null && !isInt(params.password_validity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_validity_days must be of type Int, received ${getType(params.password_validity_days)}`)
    }

    if (params.password_min_length !== undefined && params.password_min_length !== null && !isInt(params.password_min_length)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_min_length must be of type Int, received ${getType(params.password_min_length)}`)
    }

    if (isArray(params.password_require_letter) || isObject(params.password_require_letter)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_require_letter must be of type Boolean, received ${getType(params.password_require_letter)}`)
    }

    if (isArray(params.password_require_mixed) || isObject(params.password_require_mixed)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_require_mixed must be of type Boolean, received ${getType(params.password_require_mixed)}`)
    }

    if (isArray(params.password_require_special) || isObject(params.password_require_special)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_require_special must be of type Boolean, received ${getType(params.password_require_special)}`)
    }

    if (isArray(params.password_require_number) || isObject(params.password_require_number)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_require_number must be of type Boolean, received ${getType(params.password_require_number)}`)
    }

    if (isArray(params.password_require_unbreached) || isObject(params.password_require_unbreached)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_require_unbreached must be of type Boolean, received ${getType(params.password_require_unbreached)}`)
    }

    if (isArray(params.require_logout_from_bundles_and_inboxes) || isObject(params.require_logout_from_bundles_and_inboxes)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_logout_from_bundles_and_inboxes must be of type Boolean, received ${getType(params.require_logout_from_bundles_and_inboxes)}`)
    }

    if (isArray(params.dav_user_root_enabled) || isObject(params.dav_user_root_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: dav_user_root_enabled must be of type Boolean, received ${getType(params.dav_user_root_enabled)}`)
    }

    if (isArray(params.sftp_user_root_enabled) || isObject(params.sftp_user_root_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_user_root_enabled must be of type Boolean, received ${getType(params.sftp_user_root_enabled)}`)
    }

    if (isArray(params.disable_password_reset) || isObject(params.disable_password_reset)) {
      throw new errors.InvalidParameterError(`Bad parameter: disable_password_reset must be of type Boolean, received ${getType(params.disable_password_reset)}`)
    }

    if (isArray(params.immutable_files) || isObject(params.immutable_files)) {
      throw new errors.InvalidParameterError(`Bad parameter: immutable_files must be of type Boolean, received ${getType(params.immutable_files)}`)
    }

    if (params.bundle_not_found_message !== undefined && params.bundle_not_found_message !== null && !isString(params.bundle_not_found_message)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_not_found_message must be of type String, received ${getType(params.bundle_not_found_message)}`)
    }

    if (isArray(params.bundle_password_required) || isObject(params.bundle_password_required)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_password_required must be of type Boolean, received ${getType(params.bundle_password_required)}`)
    }

    if (isArray(params.bundle_require_registration) || isObject(params.bundle_require_registration)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_require_registration must be of type Boolean, received ${getType(params.bundle_require_registration)}`)
    }

    if (isArray(params.bundle_require_share_recipient) || isObject(params.bundle_require_share_recipient)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_require_share_recipient must be of type Boolean, received ${getType(params.bundle_require_share_recipient)}`)
    }

    if (isArray(params.bundle_send_one_time_password_to_recipient_at_registration) || isObject(params.bundle_send_one_time_password_to_recipient_at_registration)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_send_one_time_password_to_recipient_at_registration must be of type Boolean, received ${getType(params.bundle_send_one_time_password_to_recipient_at_registration)}`)
    }

    if (params.bundle_registration_notifications !== undefined && params.bundle_registration_notifications !== null && !isString(params.bundle_registration_notifications)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_registration_notifications must be of type String, received ${getType(params.bundle_registration_notifications)}`)
    }

    if (params.bundle_activity_notifications !== undefined && params.bundle_activity_notifications !== null && !isString(params.bundle_activity_notifications)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_activity_notifications must be of type String, received ${getType(params.bundle_activity_notifications)}`)
    }

    if (params.bundle_upload_receipt_notifications !== undefined && params.bundle_upload_receipt_notifications !== null && !isString(params.bundle_upload_receipt_notifications)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_upload_receipt_notifications must be of type String, received ${getType(params.bundle_upload_receipt_notifications)}`)
    }

    if (isArray(params.document_edits_in_bundle_allowed) || isObject(params.document_edits_in_bundle_allowed)) {
      throw new errors.InvalidParameterError(`Bad parameter: document_edits_in_bundle_allowed must be of type Boolean, received ${getType(params.document_edits_in_bundle_allowed)}`)
    }

    if (isArray(params.password_requirements_apply_to_bundles) || isObject(params.password_requirements_apply_to_bundles)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_requirements_apply_to_bundles must be of type Boolean, received ${getType(params.password_requirements_apply_to_bundles)}`)
    }

    if (isArray(params.prevent_root_permissions_for_non_site_admins) || isObject(params.prevent_root_permissions_for_non_site_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: prevent_root_permissions_for_non_site_admins must be of type Boolean, received ${getType(params.prevent_root_permissions_for_non_site_admins)}`)
    }

    if (isArray(params.restrict_root_folder_behaviors_to_site_admins) || isObject(params.restrict_root_folder_behaviors_to_site_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: restrict_root_folder_behaviors_to_site_admins must be of type Boolean, received ${getType(params.restrict_root_folder_behaviors_to_site_admins)}`)
    }

    if (isArray(params.root_folder_behaviors_apply_to_workspaces) || isObject(params.root_folder_behaviors_apply_to_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: root_folder_behaviors_apply_to_workspaces must be of type Boolean, received ${getType(params.root_folder_behaviors_apply_to_workspaces)}`)
    }

    if (isArray(params.opt_out_global) || isObject(params.opt_out_global)) {
      throw new errors.InvalidParameterError(`Bad parameter: opt_out_global must be of type Boolean, received ${getType(params.opt_out_global)}`)
    }

    if (isArray(params.use_provided_modified_at) || isObject(params.use_provided_modified_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_provided_modified_at must be of type Boolean, received ${getType(params.use_provided_modified_at)}`)
    }

    if (isArray(params.custom_namespace) || isObject(params.custom_namespace)) {
      throw new errors.InvalidParameterError(`Bad parameter: custom_namespace must be of type Boolean, received ${getType(params.custom_namespace)}`)
    }

    if (isArray(params.non_sso_groups_allowed) || isObject(params.non_sso_groups_allowed)) {
      throw new errors.InvalidParameterError(`Bad parameter: non_sso_groups_allowed must be of type Boolean, received ${getType(params.non_sso_groups_allowed)}`)
    }

    if (isArray(params.non_sso_users_allowed) || isObject(params.non_sso_users_allowed)) {
      throw new errors.InvalidParameterError(`Bad parameter: non_sso_users_allowed must be of type Boolean, received ${getType(params.non_sso_users_allowed)}`)
    }

    if (isArray(params.sharing_enabled) || isObject(params.sharing_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: sharing_enabled must be of type Boolean, received ${getType(params.sharing_enabled)}`)
    }

    if (isArray(params.snapshot_sharing_enabled) || isObject(params.snapshot_sharing_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: snapshot_sharing_enabled must be of type Boolean, received ${getType(params.snapshot_sharing_enabled)}`)
    }

    if (isArray(params.user_requests_enabled) || isObject(params.user_requests_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_requests_enabled must be of type Boolean, received ${getType(params.user_requests_enabled)}`)
    }

    if (isArray(params.user_requests_notify_admins) || isObject(params.user_requests_notify_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_requests_notify_admins must be of type Boolean, received ${getType(params.user_requests_notify_admins)}`)
    }

    if (isArray(params.dav_enabled) || isObject(params.dav_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: dav_enabled must be of type Boolean, received ${getType(params.dav_enabled)}`)
    }

    if (isArray(params.files_com_remote_server_enabled) || isObject(params.files_com_remote_server_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: files_com_remote_server_enabled must be of type Boolean, received ${getType(params.files_com_remote_server_enabled)}`)
    }

    if (isArray(params.ftp_enabled) || isObject(params.ftp_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: ftp_enabled must be of type Boolean, received ${getType(params.ftp_enabled)}`)
    }

    if (isArray(params.s3_compatible_endpoint_enabled) || isObject(params.s3_compatible_endpoint_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint_enabled must be of type Boolean, received ${getType(params.s3_compatible_endpoint_enabled)}`)
    }

    if (isArray(params.sftp_enabled) || isObject(params.sftp_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_enabled must be of type Boolean, received ${getType(params.sftp_enabled)}`)
    }

    if (isArray(params.sftp_finalize_partial_uploads) || isObject(params.sftp_finalize_partial_uploads)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_finalize_partial_uploads must be of type Boolean, received ${getType(params.sftp_finalize_partial_uploads)}`)
    }

    if (isArray(params.users_can_create_api_keys) || isObject(params.users_can_create_api_keys)) {
      throw new errors.InvalidParameterError(`Bad parameter: users_can_create_api_keys must be of type Boolean, received ${getType(params.users_can_create_api_keys)}`)
    }

    if (isArray(params.users_can_create_ssh_keys) || isObject(params.users_can_create_ssh_keys)) {
      throw new errors.InvalidParameterError(`Bad parameter: users_can_create_ssh_keys must be of type Boolean, received ${getType(params.users_can_create_ssh_keys)}`)
    }

    if (isArray(params.show_user_notifications_log_in_link) || isObject(params.show_user_notifications_log_in_link)) {
      throw new errors.InvalidParameterError(`Bad parameter: show_user_notifications_log_in_link must be of type Boolean, received ${getType(params.show_user_notifications_log_in_link)}`)
    }

    if (params.sftp_host_key_type !== undefined && params.sftp_host_key_type !== null && !isString(params.sftp_host_key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_host_key_type must be of type String, received ${getType(params.sftp_host_key_type)}`)
    }

    if (params.active_sftp_host_key_id !== undefined && params.active_sftp_host_key_id !== null && !isInt(params.active_sftp_host_key_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: active_sftp_host_key_id must be of type Int, received ${getType(params.active_sftp_host_key_id)}`)
    }

    if (params.active_sftp_host_key_ids !== undefined && params.active_sftp_host_key_ids !== null && !isArray(params.active_sftp_host_key_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: active_sftp_host_key_ids must be of type Array, received ${getType(params.active_sftp_host_key_ids)}`)
    }

    if (isArray(params.protocol_access_groups_only) || isObject(params.protocol_access_groups_only)) {
      throw new errors.InvalidParameterError(`Bad parameter: protocol_access_groups_only must be of type Boolean, received ${getType(params.protocol_access_groups_only)}`)
    }

    if (isArray(params.revoke_bundle_access_on_disable_or_delete) || isObject(params.revoke_bundle_access_on_disable_or_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: revoke_bundle_access_on_disable_or_delete must be of type Boolean, received ${getType(params.revoke_bundle_access_on_disable_or_delete)}`)
    }

    if (isArray(params.group_admins_can_add_users) || isObject(params.group_admins_can_add_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_add_users must be of type Boolean, received ${getType(params.group_admins_can_add_users)}`)
    }

    if (isArray(params.group_admins_can_manage_group_memberships) || isObject(params.group_admins_can_manage_group_memberships)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_manage_group_memberships must be of type Boolean, received ${getType(params.group_admins_can_manage_group_memberships)}`)
    }

    if (isArray(params.group_admins_can_delete_users) || isObject(params.group_admins_can_delete_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_delete_users must be of type Boolean, received ${getType(params.group_admins_can_delete_users)}`)
    }

    if (isArray(params.group_admins_can_enable_disable_users) || isObject(params.group_admins_can_enable_disable_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_enable_disable_users must be of type Boolean, received ${getType(params.group_admins_can_enable_disable_users)}`)
    }

    if (isArray(params.group_admins_can_modify_users) || isObject(params.group_admins_can_modify_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_modify_users must be of type Boolean, received ${getType(params.group_admins_can_modify_users)}`)
    }

    if (isArray(params.group_admins_can_bypass_user_lifecycle_rules) || isObject(params.group_admins_can_bypass_user_lifecycle_rules)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_bypass_user_lifecycle_rules must be of type Boolean, received ${getType(params.group_admins_can_bypass_user_lifecycle_rules)}`)
    }

    if (isArray(params.group_admins_can_reset_passwords) || isObject(params.group_admins_can_reset_passwords)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_reset_passwords must be of type Boolean, received ${getType(params.group_admins_can_reset_passwords)}`)
    }

    if (isArray(params.group_admins_can_set_user_password) || isObject(params.group_admins_can_set_user_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_admins_can_set_user_password must be of type Boolean, received ${getType(params.group_admins_can_set_user_password)}`)
    }

    if (isArray(params.child_site_folder_admins_can_see_parent_site_directory) || isObject(params.child_site_folder_admins_can_see_parent_site_directory)) {
      throw new errors.InvalidParameterError(`Bad parameter: child_site_folder_admins_can_see_parent_site_directory must be of type Boolean, received ${getType(params.child_site_folder_admins_can_see_parent_site_directory)}`)
    }

    if (isArray(params.workspace_folder_admins_can_see_default_workspace_directory) || isObject(params.workspace_folder_admins_can_see_default_workspace_directory)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_folder_admins_can_see_default_workspace_directory must be of type Boolean, received ${getType(params.workspace_folder_admins_can_see_default_workspace_directory)}`)
    }

    if (isArray(params.bundle_recipient_blacklist_free_email_domains) || isObject(params.bundle_recipient_blacklist_free_email_domains)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_recipient_blacklist_free_email_domains must be of type Boolean, received ${getType(params.bundle_recipient_blacklist_free_email_domains)}`)
    }

    if (params.bundle_recipient_blacklist_domains !== undefined && params.bundle_recipient_blacklist_domains !== null && !isArray(params.bundle_recipient_blacklist_domains)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_recipient_blacklist_domains must be of type Array, received ${getType(params.bundle_recipient_blacklist_domains)}`)
    }

    if (isArray(params.admins_bypass_locked_subfolders) || isObject(params.admins_bypass_locked_subfolders)) {
      throw new errors.InvalidParameterError(`Bad parameter: admins_bypass_locked_subfolders must be of type Boolean, received ${getType(params.admins_bypass_locked_subfolders)}`)
    }

    if (isArray(params.allowed_2fa_method_sms) || isObject(params.allowed_2fa_method_sms)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_sms must be of type Boolean, received ${getType(params.allowed_2fa_method_sms)}`)
    }

    if (isArray(params.allowed_2fa_method_totp) || isObject(params.allowed_2fa_method_totp)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_totp must be of type Boolean, received ${getType(params.allowed_2fa_method_totp)}`)
    }

    if (isArray(params.allowed_2fa_method_webauthn) || isObject(params.allowed_2fa_method_webauthn)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_webauthn must be of type Boolean, received ${getType(params.allowed_2fa_method_webauthn)}`)
    }

    if (isArray(params.allowed_2fa_method_yubi) || isObject(params.allowed_2fa_method_yubi)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_yubi must be of type Boolean, received ${getType(params.allowed_2fa_method_yubi)}`)
    }

    if (isArray(params.allowed_2fa_method_email) || isObject(params.allowed_2fa_method_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_email must be of type Boolean, received ${getType(params.allowed_2fa_method_email)}`)
    }

    if (isArray(params.allowed_2fa_method_static) || isObject(params.allowed_2fa_method_static)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_static must be of type Boolean, received ${getType(params.allowed_2fa_method_static)}`)
    }

    if (isArray(params.allowed_2fa_method_bypass_for_ftp_sftp_dav) || isObject(params.allowed_2fa_method_bypass_for_ftp_sftp_dav)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_2fa_method_bypass_for_ftp_sftp_dav must be of type Boolean, received ${getType(params.allowed_2fa_method_bypass_for_ftp_sftp_dav)}`)
    }

    if (isArray(params.require_2fa) || isObject(params.require_2fa)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa must be of type Boolean, received ${getType(params.require_2fa)}`)
    }

    if (isArray(params.require_2fa_exempt_all_sso_users) || isObject(params.require_2fa_exempt_all_sso_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa_exempt_all_sso_users must be of type Boolean, received ${getType(params.require_2fa_exempt_all_sso_users)}`)
    }

    if (params.require_2fa_user_type !== undefined && params.require_2fa_user_type !== null && !isString(params.require_2fa_user_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa_user_type must be of type String, received ${getType(params.require_2fa_user_type)}`)
    }

    if (params.color2_top !== undefined && params.color2_top !== null && !isString(params.color2_top)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_top must be of type String, received ${getType(params.color2_top)}`)
    }

    if (params.color2_left !== undefined && params.color2_left !== null && !isString(params.color2_left)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_left must be of type String, received ${getType(params.color2_left)}`)
    }

    if (params.color2_link !== undefined && params.color2_link !== null && !isString(params.color2_link)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_link must be of type String, received ${getType(params.color2_link)}`)
    }

    if (params.color2_text !== undefined && params.color2_text !== null && !isString(params.color2_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_text must be of type String, received ${getType(params.color2_text)}`)
    }

    if (params.color2_top_text !== undefined && params.color2_top_text !== null && !isString(params.color2_top_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_top_text must be of type String, received ${getType(params.color2_top_text)}`)
    }

    if (params.site_header !== undefined && params.site_header !== null && !isString(params.site_header)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_header must be of type String, received ${getType(params.site_header)}`)
    }

    if (params.site_footer !== undefined && params.site_footer !== null && !isString(params.site_footer)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_footer must be of type String, received ${getType(params.site_footer)}`)
    }

    if (params.site_public_header !== undefined && params.site_public_header !== null && !isString(params.site_public_header)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_public_header must be of type String, received ${getType(params.site_public_header)}`)
    }

    if (params.site_public_footer !== undefined && params.site_public_footer !== null && !isString(params.site_public_footer)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_public_footer must be of type String, received ${getType(params.site_public_footer)}`)
    }

    if (params.login_help_text !== undefined && params.login_help_text !== null && !isString(params.login_help_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: login_help_text must be of type String, received ${getType(params.login_help_text)}`)
    }

    if (isArray(params.use_dedicated_ips_for_smtp) || isObject(params.use_dedicated_ips_for_smtp)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_dedicated_ips_for_smtp must be of type Boolean, received ${getType(params.use_dedicated_ips_for_smtp)}`)
    }

    if (params.email_footer_custom_text !== undefined && params.email_footer_custom_text !== null && !isString(params.email_footer_custom_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: email_footer_custom_text must be of type String, received ${getType(params.email_footer_custom_text)}`)
    }

    if (params.smtp_address !== undefined && params.smtp_address !== null && !isString(params.smtp_address)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_address must be of type String, received ${getType(params.smtp_address)}`)
    }

    if (params.smtp_authentication !== undefined && params.smtp_authentication !== null && !isString(params.smtp_authentication)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_authentication must be of type String, received ${getType(params.smtp_authentication)}`)
    }

    if (params.smtp_from !== undefined && params.smtp_from !== null && !isString(params.smtp_from)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_from must be of type String, received ${getType(params.smtp_from)}`)
    }

    if (params.smtp_username !== undefined && params.smtp_username !== null && !isString(params.smtp_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_username must be of type String, received ${getType(params.smtp_username)}`)
    }

    if (params.smtp_port !== undefined && params.smtp_port !== null && !isInt(params.smtp_port)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_port must be of type Int, received ${getType(params.smtp_port)}`)
    }

    if (params.smtp_ssl !== undefined && params.smtp_ssl !== null && !isString(params.smtp_ssl)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_ssl must be of type String, received ${getType(params.smtp_ssl)}`)
    }

    if (isArray(params.ldap_enabled) || isObject(params.ldap_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_enabled must be of type Boolean, received ${getType(params.ldap_enabled)}`)
    }

    if (params.ldap_type !== undefined && params.ldap_type !== null && !isString(params.ldap_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_type must be of type String, received ${getType(params.ldap_type)}`)
    }

    if (params.ldap_host !== undefined && params.ldap_host !== null && !isString(params.ldap_host)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_host must be of type String, received ${getType(params.ldap_host)}`)
    }

    if (params.ldap_host_2 !== undefined && params.ldap_host_2 !== null && !isString(params.ldap_host_2)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_host_2 must be of type String, received ${getType(params.ldap_host_2)}`)
    }

    if (params.ldap_host_3 !== undefined && params.ldap_host_3 !== null && !isString(params.ldap_host_3)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_host_3 must be of type String, received ${getType(params.ldap_host_3)}`)
    }

    if (params.ldap_port !== undefined && params.ldap_port !== null && !isInt(params.ldap_port)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_port must be of type Int, received ${getType(params.ldap_port)}`)
    }

    if (isArray(params.ldap_secure) || isObject(params.ldap_secure)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_secure must be of type Boolean, received ${getType(params.ldap_secure)}`)
    }

    if (params.ldap_server_certificate !== undefined && params.ldap_server_certificate !== null && !isString(params.ldap_server_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_server_certificate must be of type String, received ${getType(params.ldap_server_certificate)}`)
    }

    if (params.ldap_username !== undefined && params.ldap_username !== null && !isString(params.ldap_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_username must be of type String, received ${getType(params.ldap_username)}`)
    }

    if (params.ldap_username_field !== undefined && params.ldap_username_field !== null && !isString(params.ldap_username_field)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_username_field must be of type String, received ${getType(params.ldap_username_field)}`)
    }

    if (params.ldap_domain !== undefined && params.ldap_domain !== null && !isString(params.ldap_domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_domain must be of type String, received ${getType(params.ldap_domain)}`)
    }

    if (params.ldap_user_action !== undefined && params.ldap_user_action !== null && !isString(params.ldap_user_action)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_user_action must be of type String, received ${getType(params.ldap_user_action)}`)
    }

    if (params.ldap_group_action !== undefined && params.ldap_group_action !== null && !isString(params.ldap_group_action)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_group_action must be of type String, received ${getType(params.ldap_group_action)}`)
    }

    if (params.ldap_user_include_groups !== undefined && params.ldap_user_include_groups !== null && !isString(params.ldap_user_include_groups)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_user_include_groups must be of type String, received ${getType(params.ldap_user_include_groups)}`)
    }

    if (params.ldap_group_exclusion !== undefined && params.ldap_group_exclusion !== null && !isString(params.ldap_group_exclusion)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_group_exclusion must be of type String, received ${getType(params.ldap_group_exclusion)}`)
    }

    if (params.ldap_group_inclusion !== undefined && params.ldap_group_inclusion !== null && !isString(params.ldap_group_inclusion)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_group_inclusion must be of type String, received ${getType(params.ldap_group_inclusion)}`)
    }

    if (params.ldap_base_dn !== undefined && params.ldap_base_dn !== null && !isString(params.ldap_base_dn)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_base_dn must be of type String, received ${getType(params.ldap_base_dn)}`)
    }

    if (isArray(params.uploads_via_email_authentication) || isObject(params.uploads_via_email_authentication)) {
      throw new errors.InvalidParameterError(`Bad parameter: uploads_via_email_authentication must be of type Boolean, received ${getType(params.uploads_via_email_authentication)}`)
    }

    if (isArray(params.icon16_delete) || isObject(params.icon16_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: icon16_delete must be of type Boolean, received ${getType(params.icon16_delete)}`)
    }

    if (isArray(params.icon32_delete) || isObject(params.icon32_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: icon32_delete must be of type Boolean, received ${getType(params.icon32_delete)}`)
    }

    if (isArray(params.icon48_delete) || isObject(params.icon48_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: icon48_delete must be of type Boolean, received ${getType(params.icon48_delete)}`)
    }

    if (isArray(params.icon128_delete) || isObject(params.icon128_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: icon128_delete must be of type Boolean, received ${getType(params.icon128_delete)}`)
    }

    if (isArray(params.logo_delete) || isObject(params.logo_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: logo_delete must be of type Boolean, received ${getType(params.logo_delete)}`)
    }

    if (isArray(params.bundle_watermark_attachment_delete) || isObject(params.bundle_watermark_attachment_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_watermark_attachment_delete must be of type Boolean, received ${getType(params.bundle_watermark_attachment_delete)}`)
    }

    if (isArray(params.login_page_background_image_delete) || isObject(params.login_page_background_image_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: login_page_background_image_delete must be of type Boolean, received ${getType(params.login_page_background_image_delete)}`)
    }

    if (isArray(params.disable_2fa_with_delay) || isObject(params.disable_2fa_with_delay)) {
      throw new errors.InvalidParameterError(`Bad parameter: disable_2fa_with_delay must be of type Boolean, received ${getType(params.disable_2fa_with_delay)}`)
    }

    if (params.ldap_password_change !== undefined && params.ldap_password_change !== null && !isString(params.ldap_password_change)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_password_change must be of type String, received ${getType(params.ldap_password_change)}`)
    }

    if (params.ldap_password_change_confirmation !== undefined && params.ldap_password_change_confirmation !== null && !isString(params.ldap_password_change_confirmation)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_password_change_confirmation must be of type String, received ${getType(params.ldap_password_change_confirmation)}`)
    }

    if (isArray(params.redirect_old_subdomain) || isObject(params.redirect_old_subdomain)) {
      throw new errors.InvalidParameterError(`Bad parameter: redirect_old_subdomain must be of type Boolean, received ${getType(params.redirect_old_subdomain)}`)
    }

    if (params.smtp_password !== undefined && params.smtp_password !== null && !isString(params.smtp_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_password must be of type String, received ${getType(params.smtp_password)}`)
    }

    const response = await Api.sendRequest('/site', 'PATCH', params, options)

    return new Site(response?.data, retainedOptions(options))
  }
}

export default Site

module.exports = Site
module.exports.default = Site
