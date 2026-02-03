/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Site
 */
class Site {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      const normalizedKey = key.replace('?', '')

      this.attributes[normalizedKey] = value

      Object.defineProperty(this, normalizedKey, { value, writable: false })
    })

    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Site Id
  getId = () => this.attributes.id

  // string # Site name
  getName = () => this.attributes.name

  // array(string) # Additional extensions that are considered text files
  getAdditionalTextFileTypes = () => this.attributes.additional_text_file_types

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

  // boolean # Do incoming emails in the Inboxes require checking for SPF/DKIM/DMARC?
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

  // boolean # Is the mobile app enabled?
  getMobileApp = () => this.attributes.mobile_app

  // boolean # Is mobile app session IP pinning enabled?
  getMobileAppSessionIpPinning = () => this.attributes.mobile_app_session_ip_pinning

  // int64 # Mobile app session lifetime (in hours)
  getMobileAppSessionLifetime = () => this.attributes.mobile_app_session_lifetime

  // string # Comma separated list of disallowed Country codes
  getDisallowedCountries = () => this.attributes.disallowed_countries

  // boolean # If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
  getDisableFilesCertificateGeneration = () => this.attributes.disable_files_certificate_generation

  // boolean # Are notifications disabled?
  getDisableNotifications = () => this.attributes.disable_notifications

  // boolean # Is password reset disabled?
  getDisablePasswordReset = () => this.attributes.disable_password_reset

  // string # Custom domain
  getDomain = () => this.attributes.domain

  // boolean # Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain?
  getDomainHstsHeader = () => this.attributes.domain_hsts_header

  // string # Letsencrypt chain to use when registering SSL Certificate for domain.
  getDomainLetsencryptChain = () => this.attributes.domain_letsencrypt_chain

  // email # Main email for this site
  getEmail = () => this.attributes.email

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

  // object # List of site settings managed by the parent site
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

  // boolean # Is SFTP enabled?
  getSftpEnabled = () => this.attributes.sftp_enabled

  // string # Sftp Host Key Type
  getSftpHostKeyType = () => this.attributes.sftp_host_key_type

  // int64 # Id of the currently selected custom SFTP Host Key
  getActiveSftpHostKeyId = () => this.attributes.active_sftp_host_key_id

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

  // string # Custom text send in user welcome email
  getWelcomeCustomText = () => this.attributes.welcome_custom_text

  // string # Custom footer text for system-generated emails. Supports standard strftime date/time patterns like %Y (4-digit year), %m (month), %d (day).
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

  // boolean # Allow group admins set password authentication method
  getGroupAdminsCanSetUserPassword = () => this.attributes.group_admins_can_set_user_password

  static get = async (options = {}) => {
    const response = await Api.sendRequest('/site', 'GET', {}, options)

    return new Site(response?.data, options)
  }

  static getUsage = async (options = {}) => {
    const response = await Api.sendRequest('/site/usage', 'GET', {}, options)

    const UsageSnapshot = require('./UsageSnapshot.js').default
    return new UsageSnapshot(response?.data, options)
  }

  // Parameters:
  //   name - string - Site name
  //   subdomain - string - Site subdomain
  //   domain - string - Custom domain
  //   domain_hsts_header - boolean - Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain?
  //   domain_letsencrypt_chain - string - Letsencrypt chain to use when registering SSL Certificate for domain.
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
  //   additional_text_file_types - array(string) - Additional extensions that are considered text files
  //   bundle_require_note - boolean - Do Bundles require internal notes?
  //   bundle_send_shared_receipts - boolean - Do Bundle creators receive receipts of invitations?
  //   calculate_file_checksums_crc32 - boolean - Calculate CRC32 checksums for files?
  //   calculate_file_checksums_md5 - boolean - Calculate MD5 checksums for files?
  //   calculate_file_checksums_sha1 - boolean - Calculate SHA1 checksums for files?
  //   calculate_file_checksums_sha256 - boolean - Calculate SHA256 checksums for files?
  //   legacy_checksums_mode - boolean - Use legacy checksums mode?
  //   migrate_remote_server_sync_to_sync - boolean - If true, we will migrate all remote server syncs to the new Sync model.
  //   as2_message_retention_days - int64 - Number of days to retain AS2 messages (incoming and outgoing).
  //   session_expiry_minutes - int64 - Session expiry in minutes
  //   ssl_required - boolean - Is SSL required?  Disabling this is insecure.
  //   sftp_insecure_ciphers - boolean - If true, we will allow weak and known insecure ciphers to be used for SFTP connections.  Enabling this setting severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
  //   sftp_insecure_diffie_hellman - boolean - If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on our secure list.  This has the effect of making the cipher weaker than our normal threshold for security, but is required to support certain legacy or broken SSH and MFT clients.  Enabling this weakens security, but not nearly as much as enabling the full `sftp_insecure_ciphers` option.
  //   disable_files_certificate_generation - boolean - If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
  //   user_lockout - boolean - Will users be locked out after incorrect login attempts?
  //   user_lockout_tries - int64 - Number of login tries within `user_lockout_within` hours before users are locked out
  //   user_lockout_within - int64 - Number of hours for user lockout window
  //   user_lockout_lock_period - int64 - How many hours to lock user out for failed password?
  //   include_password_in_welcome_email - boolean - Include password in emails to new users?
  //   allowed_countries - string - Comma separated list of allowed Country codes
  //   allowed_ips - string - List of allowed IP addresses
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
  //   bundle_registration_notifications - string - Do Bundle owners receive registration notification?
  //   bundle_activity_notifications - string - Do Bundle owners receive activity notifications?
  //   bundle_upload_receipt_notifications - string - Do Bundle uploaders receive upload confirmation notifications?
  //   document_edits_in_bundle_allowed - boolean - If true, allow public viewers of Bundles with full permissions to use document editing integrations.
  //   password_requirements_apply_to_bundles - boolean - Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same requirements as users' passwords?
  //   prevent_root_permissions_for_non_site_admins - boolean - If true, we will prevent non-administrators from receiving any permissions directly on the root folder.  This is commonly used to prevent the accidental application of permissions.
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
  //   ftp_enabled - boolean - Is FTP enabled?
  //   sftp_enabled - boolean - Is SFTP enabled?
  //   users_can_create_api_keys - boolean - Allow users to create their own API keys?
  //   users_can_create_ssh_keys - boolean - Allow users to create their own SSH keys?
  //   show_user_notifications_log_in_link - boolean - Show log in link in user notifications?
  //   sftp_host_key_type - string - Sftp Host Key Type
  //   active_sftp_host_key_id - int64 - Id of the currently selected custom SFTP Host Key
  //   protocol_access_groups_only - boolean - If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups will be honored.  Make sure that your current user is a member of a group with API permission when changing this value to avoid locking yourself out of your site.
  //   revoke_bundle_access_on_disable_or_delete - boolean - Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period.
  //   bundle_watermark_value - object - Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  //   group_admins_can_set_user_password - boolean - Allow group admins set password authentication method
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
  //   email_footer_custom_text - string - Custom footer text for system-generated emails. Supports standard strftime date/time patterns like %Y (4-digit year), %m (month), %d (day).
  //   smtp_address - string - SMTP server hostname or IP
  //   smtp_authentication - string - SMTP server authentication type
  //   smtp_from - string - From address to use when mailing through custom SMTP
  //   smtp_username - string - SMTP server username
  //   smtp_port - int64 - SMTP server port
  //   ldap_enabled - boolean - Main LDAP setting: is LDAP enabled?
  //   ldap_type - string - LDAP type
  //   ldap_host - string - LDAP host
  //   ldap_host_2 - string - LDAP backup host
  //   ldap_host_3 - string - LDAP backup host
  //   ldap_port - int64 - LDAP port
  //   ldap_secure - boolean - Use secure LDAP?
  //   ldap_username - string - Username for signing in to LDAP server.
  //   ldap_username_field - string - LDAP username field
  //   ldap_domain - string - Domain name that will be appended to usernames
  //   ldap_user_action - string - Should we sync users from LDAP server?
  //   ldap_group_action - string - Should we sync groups from LDAP server?
  //   ldap_user_include_groups - string - Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these groups will be added or synced.
  //   ldap_group_exclusion - string - Comma or newline separated list of group names (with optional wildcards) to exclude when syncing.
  //   ldap_group_inclusion - string - Comma or newline separated list of group names (with optional wildcards) to include when syncing.
  //   ldap_base_dn - string - Base DN for looking up users in LDAP server
  //   uploads_via_email_authentication - boolean - Do incoming emails in the Inboxes require checking for SPF/DKIM/DMARC?
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
  //   smtp_password - string - Password for SMTP server.
  static update = async (params = {}, options = {}) => {
    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.subdomain && !isString(params.subdomain)) {
      throw new errors.InvalidParameterError(`Bad parameter: subdomain must be of type String, received ${getType(params.subdomain)}`)
    }

    if (params.domain && !isString(params.domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain must be of type String, received ${getType(params.domain)}`)
    }

    if (params.domain_letsencrypt_chain && !isString(params.domain_letsencrypt_chain)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain_letsencrypt_chain must be of type String, received ${getType(params.domain_letsencrypt_chain)}`)
    }

    if (params.email && !isString(params.email)) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params.email)}`)
    }

    if (params.reply_to_email && !isString(params.reply_to_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: reply_to_email must be of type String, received ${getType(params.reply_to_email)}`)
    }

    if (params.bundle_expiration && !isInt(params.bundle_expiration)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_expiration must be of type Int, received ${getType(params.bundle_expiration)}`)
    }

    if (params.welcome_email_cc && !isString(params.welcome_email_cc)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_email_cc must be of type String, received ${getType(params.welcome_email_cc)}`)
    }

    if (params.welcome_email_subject && !isString(params.welcome_email_subject)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_email_subject must be of type String, received ${getType(params.welcome_email_subject)}`)
    }

    if (params.welcome_custom_text && !isString(params.welcome_custom_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_custom_text must be of type String, received ${getType(params.welcome_custom_text)}`)
    }

    if (params.language && !isString(params.language)) {
      throw new errors.InvalidParameterError(`Bad parameter: language must be of type String, received ${getType(params.language)}`)
    }

    if (params.default_time_zone && !isString(params.default_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_time_zone must be of type String, received ${getType(params.default_time_zone)}`)
    }

    if (params.desktop_app_session_lifetime && !isInt(params.desktop_app_session_lifetime)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_app_session_lifetime must be of type Int, received ${getType(params.desktop_app_session_lifetime)}`)
    }

    if (params.mobile_app_session_lifetime && !isInt(params.mobile_app_session_lifetime)) {
      throw new errors.InvalidParameterError(`Bad parameter: mobile_app_session_lifetime must be of type Int, received ${getType(params.mobile_app_session_lifetime)}`)
    }

    if (params.welcome_screen && !isString(params.welcome_screen)) {
      throw new errors.InvalidParameterError(`Bad parameter: welcome_screen must be of type String, received ${getType(params.welcome_screen)}`)
    }

    if (params.office_integration_type && !isString(params.office_integration_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: office_integration_type must be of type String, received ${getType(params.office_integration_type)}`)
    }

    if (params.motd_text && !isString(params.motd_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: motd_text must be of type String, received ${getType(params.motd_text)}`)
    }

    if (params.additional_text_file_types && !isArray(params.additional_text_file_types)) {
      throw new errors.InvalidParameterError(`Bad parameter: additional_text_file_types must be of type Array, received ${getType(params.additional_text_file_types)}`)
    }

    if (params.as2_message_retention_days && !isInt(params.as2_message_retention_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: as2_message_retention_days must be of type Int, received ${getType(params.as2_message_retention_days)}`)
    }

    if (params.session_expiry_minutes && !isInt(params.session_expiry_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: session_expiry_minutes must be of type Int, received ${getType(params.session_expiry_minutes)}`)
    }

    if (params.user_lockout_tries && !isInt(params.user_lockout_tries)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout_tries must be of type Int, received ${getType(params.user_lockout_tries)}`)
    }

    if (params.user_lockout_within && !isInt(params.user_lockout_within)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout_within must be of type Int, received ${getType(params.user_lockout_within)}`)
    }

    if (params.user_lockout_lock_period && !isInt(params.user_lockout_lock_period)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_lockout_lock_period must be of type Int, received ${getType(params.user_lockout_lock_period)}`)
    }

    if (params.allowed_countries && !isString(params.allowed_countries)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_countries must be of type String, received ${getType(params.allowed_countries)}`)
    }

    if (params.allowed_ips && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (params.disallowed_countries && !isString(params.disallowed_countries)) {
      throw new errors.InvalidParameterError(`Bad parameter: disallowed_countries must be of type String, received ${getType(params.disallowed_countries)}`)
    }

    if (params.days_to_retain_backups && !isInt(params.days_to_retain_backups)) {
      throw new errors.InvalidParameterError(`Bad parameter: days_to_retain_backups must be of type Int, received ${getType(params.days_to_retain_backups)}`)
    }

    if (params.max_prior_passwords && !isInt(params.max_prior_passwords)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_prior_passwords must be of type Int, received ${getType(params.max_prior_passwords)}`)
    }

    if (params.password_validity_days && !isInt(params.password_validity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_validity_days must be of type Int, received ${getType(params.password_validity_days)}`)
    }

    if (params.password_min_length && !isInt(params.password_min_length)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_min_length must be of type Int, received ${getType(params.password_min_length)}`)
    }

    if (params.bundle_not_found_message && !isString(params.bundle_not_found_message)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_not_found_message must be of type String, received ${getType(params.bundle_not_found_message)}`)
    }

    if (params.bundle_registration_notifications && !isString(params.bundle_registration_notifications)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_registration_notifications must be of type String, received ${getType(params.bundle_registration_notifications)}`)
    }

    if (params.bundle_activity_notifications && !isString(params.bundle_activity_notifications)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_activity_notifications must be of type String, received ${getType(params.bundle_activity_notifications)}`)
    }

    if (params.bundle_upload_receipt_notifications && !isString(params.bundle_upload_receipt_notifications)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_upload_receipt_notifications must be of type String, received ${getType(params.bundle_upload_receipt_notifications)}`)
    }

    if (params.sftp_host_key_type && !isString(params.sftp_host_key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_host_key_type must be of type String, received ${getType(params.sftp_host_key_type)}`)
    }

    if (params.active_sftp_host_key_id && !isInt(params.active_sftp_host_key_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: active_sftp_host_key_id must be of type Int, received ${getType(params.active_sftp_host_key_id)}`)
    }

    if (params.bundle_recipient_blacklist_domains && !isArray(params.bundle_recipient_blacklist_domains)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_recipient_blacklist_domains must be of type Array, received ${getType(params.bundle_recipient_blacklist_domains)}`)
    }

    if (params.require_2fa_user_type && !isString(params.require_2fa_user_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa_user_type must be of type String, received ${getType(params.require_2fa_user_type)}`)
    }

    if (params.color2_top && !isString(params.color2_top)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_top must be of type String, received ${getType(params.color2_top)}`)
    }

    if (params.color2_left && !isString(params.color2_left)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_left must be of type String, received ${getType(params.color2_left)}`)
    }

    if (params.color2_link && !isString(params.color2_link)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_link must be of type String, received ${getType(params.color2_link)}`)
    }

    if (params.color2_text && !isString(params.color2_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_text must be of type String, received ${getType(params.color2_text)}`)
    }

    if (params.color2_top_text && !isString(params.color2_top_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: color2_top_text must be of type String, received ${getType(params.color2_top_text)}`)
    }

    if (params.site_header && !isString(params.site_header)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_header must be of type String, received ${getType(params.site_header)}`)
    }

    if (params.site_footer && !isString(params.site_footer)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_footer must be of type String, received ${getType(params.site_footer)}`)
    }

    if (params.site_public_header && !isString(params.site_public_header)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_public_header must be of type String, received ${getType(params.site_public_header)}`)
    }

    if (params.site_public_footer && !isString(params.site_public_footer)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_public_footer must be of type String, received ${getType(params.site_public_footer)}`)
    }

    if (params.login_help_text && !isString(params.login_help_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: login_help_text must be of type String, received ${getType(params.login_help_text)}`)
    }

    if (params.email_footer_custom_text && !isString(params.email_footer_custom_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: email_footer_custom_text must be of type String, received ${getType(params.email_footer_custom_text)}`)
    }

    if (params.smtp_address && !isString(params.smtp_address)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_address must be of type String, received ${getType(params.smtp_address)}`)
    }

    if (params.smtp_authentication && !isString(params.smtp_authentication)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_authentication must be of type String, received ${getType(params.smtp_authentication)}`)
    }

    if (params.smtp_from && !isString(params.smtp_from)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_from must be of type String, received ${getType(params.smtp_from)}`)
    }

    if (params.smtp_username && !isString(params.smtp_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_username must be of type String, received ${getType(params.smtp_username)}`)
    }

    if (params.smtp_port && !isInt(params.smtp_port)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_port must be of type Int, received ${getType(params.smtp_port)}`)
    }

    if (params.ldap_type && !isString(params.ldap_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_type must be of type String, received ${getType(params.ldap_type)}`)
    }

    if (params.ldap_host && !isString(params.ldap_host)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_host must be of type String, received ${getType(params.ldap_host)}`)
    }

    if (params.ldap_host_2 && !isString(params.ldap_host_2)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_host_2 must be of type String, received ${getType(params.ldap_host_2)}`)
    }

    if (params.ldap_host_3 && !isString(params.ldap_host_3)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_host_3 must be of type String, received ${getType(params.ldap_host_3)}`)
    }

    if (params.ldap_port && !isInt(params.ldap_port)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_port must be of type Int, received ${getType(params.ldap_port)}`)
    }

    if (params.ldap_username && !isString(params.ldap_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_username must be of type String, received ${getType(params.ldap_username)}`)
    }

    if (params.ldap_username_field && !isString(params.ldap_username_field)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_username_field must be of type String, received ${getType(params.ldap_username_field)}`)
    }

    if (params.ldap_domain && !isString(params.ldap_domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_domain must be of type String, received ${getType(params.ldap_domain)}`)
    }

    if (params.ldap_user_action && !isString(params.ldap_user_action)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_user_action must be of type String, received ${getType(params.ldap_user_action)}`)
    }

    if (params.ldap_group_action && !isString(params.ldap_group_action)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_group_action must be of type String, received ${getType(params.ldap_group_action)}`)
    }

    if (params.ldap_user_include_groups && !isString(params.ldap_user_include_groups)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_user_include_groups must be of type String, received ${getType(params.ldap_user_include_groups)}`)
    }

    if (params.ldap_group_exclusion && !isString(params.ldap_group_exclusion)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_group_exclusion must be of type String, received ${getType(params.ldap_group_exclusion)}`)
    }

    if (params.ldap_group_inclusion && !isString(params.ldap_group_inclusion)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_group_inclusion must be of type String, received ${getType(params.ldap_group_inclusion)}`)
    }

    if (params.ldap_base_dn && !isString(params.ldap_base_dn)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_base_dn must be of type String, received ${getType(params.ldap_base_dn)}`)
    }

    if (params.ldap_password_change && !isString(params.ldap_password_change)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_password_change must be of type String, received ${getType(params.ldap_password_change)}`)
    }

    if (params.ldap_password_change_confirmation && !isString(params.ldap_password_change_confirmation)) {
      throw new errors.InvalidParameterError(`Bad parameter: ldap_password_change_confirmation must be of type String, received ${getType(params.ldap_password_change_confirmation)}`)
    }

    if (params.smtp_password && !isString(params.smtp_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: smtp_password must be of type String, received ${getType(params.smtp_password)}`)
    }

    const response = await Api.sendRequest('/site', 'PATCH', params, options)

    return new Site(response?.data, options)
  }
}

export default Site

module.exports = Site
module.exports.default = Site
