import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

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
  // string # Site name
  getName = () => this.attributes.name

  // boolean # Is SMS two factor authentication allowed?
  getAllowed2faMethodSms = () => this.attributes.allowed_2fa_method_sms

  // boolean # Is TOTP two factor authentication allowed?
  getAllowed2faMethodTotp = () => this.attributes.allowed_2fa_method_totp

  // boolean # Is U2F two factor authentication allowed?
  getAllowed2faMethodU2f = () => this.attributes.allowed_2fa_method_u2f

  // boolean # Is yubikey two factor authentication allowed?
  getAllowed2faMethodYubi = () => this.attributes.allowed_2fa_method_yubi

  // int64 # User ID for the main site administrator
  getAdminUserId = () => this.attributes.admin_user_id

  // boolean # Are manual Bundle names allowed?
  getAllowBundleNames = () => this.attributes.allow_bundle_names

  // string # Comma seperated list of allowed Country codes
  getAllowedCountries = () => this.attributes.allowed_countries

  // string # List of allowed IP addresses
  getAllowedIps = () => this.attributes.allowed_ips

  // boolean # If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
  getAskAboutOverwrites = () => this.attributes.ask_about_overwrites

  // int64 # Site-wide Bundle expiration in days
  getBundleExpiration = () => this.attributes.bundle_expiration

  // boolean # Do Bundles require password protection?
  getBundlePasswordRequired = () => this.attributes.bundle_password_required

  // boolean # Do Bundles require recipients for sharing?
  getBundleRequireShareRecipient = () => this.attributes.bundle_require_share_recipient

  // Preview watermark image applied to all bundle items.
  getBundleWatermarkAttachment = () => this.attributes.bundle_watermark_attachment

  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  getBundleWatermarkValue = () => this.attributes.bundle_watermark_value

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

  // int64 # Number of days to keep deleted files
  getDaysToRetainBackups = () => this.attributes.days_to_retain_backups

  // string # Site default time zone
  getDefaultTimeZone = () => this.attributes.default_time_zone

  // boolean # Is the desktop app enabled?
  getDesktopApp = () => this.attributes.desktop_app

  // boolean # Is desktop app session IP pinning enabled?
  getDesktopAppSessionIpPinning = () => this.attributes.desktop_app_session_ip_pinning

  // int64 # Desktop app session lifetime (in hours)
  getDesktopAppSessionLifetime = () => this.attributes.desktop_app_session_lifetime

  // boolean # Is the mobile app enabled?
  getMobileApp = () => this.attributes.mobile_app

  // boolean # Is mobile app session IP pinning enabled?
  getMobileAppSessionIpPinning = () => this.attributes.mobile_app_session_ip_pinning

  // int64 # Mobile app session lifetime (in hours)
  getMobileAppSessionLifetime = () => this.attributes.mobile_app_session_lifetime

  // string # Comma seperated list of disallowed Country codes
  getDisallowedCountries = () => this.attributes.disallowed_countries

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

  // boolean # If true, permissions for this site must be bound to a group (not a user). Otherwise, permissions must be bound to a user.
  getFolderPermissionsGroupsOnly = () => this.attributes.folder_permissions_groups_only

  // boolean # Is there a signed HIPAA BAA between Files.com and this site?
  getHipaa = () => this.attributes.hipaa

  // Branded icon 128x128
  getIcon128 = () => this.attributes.icon128

  // Branded icon 16x16
  getIcon16 = () => this.attributes.icon16

  // Branded icon 32x32
  getIcon32 = () => this.attributes.icon32

  // Branded icon 48x48
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

  // Branded logo
  getLogo = () => this.attributes.logo

  // int64 # Number of prior passwords to disallow
  getMaxPriorPasswords = () => this.attributes.max_prior_passwords

  // double # Next billing amount
  getNextBillingAmount = () => this.attributes.next_billing_amount

  // string # Next billing date
  getNextBillingDate = () => this.attributes.next_billing_date

  // boolean # Allow users to use Office for the web?
  getOfficeIntegrationAvailable = () => this.attributes.office_integration_available

  // string # Link to scheduling a meeting with our Sales team
  getOncehubLink = () => this.attributes.oncehub_link

  // boolean # Use servers in the USA only?
  getOptOutGlobal = () => this.attributes.opt_out_global

  // date-time # Last time the site was notified about an overage
  getOverageNotifiedAt = () => this.attributes.overage_notified_at

  // boolean # Notify site email of overages?
  getOverageNotify = () => this.attributes.overage_notify

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

  // boolean # Require two-factor authentication for all users?
  getRequire2fa = () => this.attributes.require_2fa

  // date-time # If set, requirement for two-factor authentication has been scheduled to end on this date-time.
  getRequire2faStopTime = () => this.attributes.require_2fa_stop_time

  // string # What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
  getRequire2faUserType = () => this.attributes.require_2fa_user_type

  // Current session
  getSession = () => this.attributes.session

  // boolean # Are sessions locked to the same IP? (i.e. do users need to log in again if they change IPs?)
  getSessionPinnedByIp = () => this.attributes.session_pinned_by_ip

  // boolean # Is SFTP enabled?
  getSftpEnabled = () => this.attributes.sftp_enabled

  // boolean # Are Insecure Ciphers allowed for SFTP?  Note:  Settting TLS Disabled -> True will always allow insecure ciphers for SFTP as well.  Enabling this is insecure.
  getSftpInsecureCiphers = () => this.attributes.sftp_insecure_ciphers

  // boolean # Use user FTP roots also for SFTP?
  getSftpUserRootEnabled = () => this.attributes.sftp_user_root_enabled

  // boolean # Allow bundle creation
  getSharingEnabled = () => this.attributes.sharing_enabled

  // boolean # Show request access link for users without access?  Currently unused.
  getShowRequestAccessLink = () => this.attributes.show_request_access_link

  // string # Custom site footer text
  getSiteFooter = () => this.attributes.site_footer

  // string # Custom site header text
  getSiteHeader = () => this.attributes.site_header

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

  // double # Session expiry in hours
  getSessionExpiry = () => this.attributes.session_expiry

  // boolean # Is SSL required?  Disabling this is insecure.
  getSslRequired = () => this.attributes.ssl_required

  // string # Site subdomain
  getSubdomain = () => this.attributes.subdomain

  // date-time # If switching plans, when does the new plan take effect?
  getSwitchToPlanDate = () => this.attributes.switch_to_plan_date

  // boolean # Are Insecure TLS and SFTP Ciphers allowed?  Enabling this is insecure.
  getTlsDisabled = () => this.attributes.tls_disabled

  // int64 # Number of days left in trial
  getTrialDaysLeft = () => this.attributes.trial_days_left

  // date-time # When does this Site trial expire?
  getTrialUntil = () => this.attributes.trial_until

  // date-time # Last time this Site was updated
  getUpdatedAt = () => this.attributes.updated_at

  // boolean # Allow uploaders to set `provided_modified_at` for uploaded files?
  getUseProvidedModifiedAt = () => this.attributes.use_provided_modified_at

  // User of current session
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

  // string # Custom text send in user welcome email
  getWelcomeCustomText = () => this.attributes.welcome_custom_text

  // email # Include this email in welcome emails if enabled
  getWelcomeEmailCc = () => this.attributes.welcome_email_cc

  // boolean # Will the welcome email be sent to new users?
  getWelcomeEmailEnabled = () => this.attributes.welcome_email_enabled

  // string # Does the welcome screen appear?
  getWelcomeScreen = () => this.attributes.welcome_screen

  // boolean # Does FTP user Windows emulation mode?
  getWindowsModeFtp = () => this.attributes.windows_mode_ftp

  // int64 # If greater than zero, users will unable to login if they do not show activity within this number of days.
  getDisableUsersFromInactivityPeriodDays = () => this.attributes.disable_users_from_inactivity_period_days


  static get = async (params = {}, options = {}) => {
    const response = await Api.sendRequest(`/site`, 'GET', options)

    return new Site(response?.data, options)
  }

  static getUsage = async (params = {}, options = {}) => {
    const response = await Api.sendRequest(`/site/usage`, 'GET', options)

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
  //   overage_notify - boolean - Notify site email of overages?
  //   welcome_email_enabled - boolean - Will the welcome email be sent to new users?
  //   ask_about_overwrites - boolean - If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
  //   show_request_access_link - boolean - Show request access link for users without access?  Currently unused.
  //   welcome_email_cc - string - Include this email in welcome emails if enabled
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
  //   folder_permissions_groups_only - boolean - If true, permissions for this site must be bound to a group (not a user). Otherwise, permissions must be bound to a user.
  //   welcome_screen - string - Does the welcome screen appear?
  //   office_integration_available - boolean - Allow users to use Office for the web?
  //   session_expiry - double - Session expiry in hours
  //   ssl_required - boolean - Is SSL required?  Disabling this is insecure.
  //   tls_disabled - boolean - Are Insecure TLS and SFTP Ciphers allowed?  Enabling this is insecure.
  //   sftp_insecure_ciphers - boolean - Are Insecure Ciphers allowed for SFTP?  Note:  Settting TLS Disabled -> True will always allow insecure ciphers for SFTP as well.  Enabling this is insecure.
  //   user_lockout - boolean - Will users be locked out after incorrect login attempts?
  //   user_lockout_tries - int64 - Number of login tries within `user_lockout_within` hours before users are locked out
  //   user_lockout_within - int64 - Number of hours for user lockout window
  //   user_lockout_lock_period - int64 - How many hours to lock user out for failed password?
  //   include_password_in_welcome_email - boolean - Include password in emails to new users?
  //   allowed_countries - string - Comma seperated list of allowed Country codes
  //   allowed_ips - string - List of allowed IP addresses
  //   disallowed_countries - string - Comma seperated list of disallowed Country codes
  //   days_to_retain_backups - int64 - Number of days to keep deleted files
  //   max_prior_passwords - int64 - Number of prior passwords to disallow
  //   password_validity_days - int64 - Number of days password is valid
  //   password_min_length - int64 - Shortest password length for users
  //   password_require_letter - boolean - Require a letter in passwords?
  //   password_require_mixed - boolean - Require lower and upper case letters in passwords?
  //   password_require_special - boolean - Require special characters in password?
  //   password_require_number - boolean - Require a number in passwords?
  //   password_require_unbreached - boolean - Require passwords that have not been previously breached? (see https://haveibeenpwned.com/)
  //   sftp_user_root_enabled - boolean - Use user FTP roots also for SFTP?
  //   disable_password_reset - boolean - Is password reset disabled?
  //   immutable_files - boolean - Are files protected from modification?
  //   session_pinned_by_ip - boolean - Are sessions locked to the same IP? (i.e. do users need to log in again if they change IPs?)
  //   bundle_password_required - boolean - Do Bundles require password protection?
  //   bundle_require_share_recipient - boolean - Do Bundles require recipients for sharing?
  //   password_requirements_apply_to_bundles - boolean - Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same requirements as users' passwords?
  //   opt_out_global - boolean - Use servers in the USA only?
  //   use_provided_modified_at - boolean - Allow uploaders to set `provided_modified_at` for uploaded files?
  //   custom_namespace - boolean - Is this site using a custom namespace for users?
  //   disable_users_from_inactivity_period_days - int64 - If greater than zero, users will unable to login if they do not show activity within this number of days.
  //   non_sso_groups_allowed - boolean - If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed via your SSO provider.
  //   non_sso_users_allowed - boolean - If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed via your SSO provider.
  //   sharing_enabled - boolean - Allow bundle creation
  //   user_requests_enabled - boolean - Enable User Requests feature
  //   ftp_enabled - boolean - Is FTP enabled?
  //   sftp_enabled - boolean - Is SFTP enabled?
  //   allowed_2fa_method_sms - boolean - Is SMS two factor authentication allowed?
  //   allowed_2fa_method_u2f - boolean - Is U2F two factor authentication allowed?
  //   allowed_2fa_method_totp - boolean - Is TOTP two factor authentication allowed?
  //   allowed_2fa_method_yubi - boolean - Is yubikey two factor authentication allowed?
  //   require_2fa - boolean - Require two-factor authentication for all users?
  //   require_2fa_user_type - string - What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
  //   color2_top - string - Top bar background color
  //   color2_left - string - Page link and button color
  //   color2_link - string - Top bar link color
  //   color2_text - string - Page link and button color
  //   color2_top_text - string - Top bar text color
  //   site_header - string - Custom site header text
  //   site_footer - string - Custom site footer text
  //   login_help_text - string - Login help text
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
  //   disable_2fa_with_delay - boolean - If set to true, we will begin the process of disabling 2FA on this site.
  //   ldap_password_change - string - New LDAP password.
  //   ldap_password_change_confirmation - string - Confirm new LDAP password.
  //   smtp_password - string - Password for SMTP server.
  static update = async (params = {}, options = {}) => {
    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (params['subdomain'] && !isString(params['subdomain'])) {
      throw new Error(`Bad parameter: subdomain must be of type String, received ${getType(subdomain)}`)
    }

    if (params['domain'] && !isString(params['domain'])) {
      throw new Error(`Bad parameter: domain must be of type String, received ${getType(domain)}`)
    }

    if (params['domain_letsencrypt_chain'] && !isString(params['domain_letsencrypt_chain'])) {
      throw new Error(`Bad parameter: domain_letsencrypt_chain must be of type String, received ${getType(domain_letsencrypt_chain)}`)
    }

    if (params['email'] && !isString(params['email'])) {
      throw new Error(`Bad parameter: email must be of type String, received ${getType(email)}`)
    }

    if (params['reply_to_email'] && !isString(params['reply_to_email'])) {
      throw new Error(`Bad parameter: reply_to_email must be of type String, received ${getType(reply_to_email)}`)
    }

    if (params['bundle_expiration'] && !isInt(params['bundle_expiration'])) {
      throw new Error(`Bad parameter: bundle_expiration must be of type Int, received ${getType(bundle_expiration)}`)
    }

    if (params['welcome_email_cc'] && !isString(params['welcome_email_cc'])) {
      throw new Error(`Bad parameter: welcome_email_cc must be of type String, received ${getType(welcome_email_cc)}`)
    }

    if (params['welcome_custom_text'] && !isString(params['welcome_custom_text'])) {
      throw new Error(`Bad parameter: welcome_custom_text must be of type String, received ${getType(welcome_custom_text)}`)
    }

    if (params['language'] && !isString(params['language'])) {
      throw new Error(`Bad parameter: language must be of type String, received ${getType(language)}`)
    }

    if (params['default_time_zone'] && !isString(params['default_time_zone'])) {
      throw new Error(`Bad parameter: default_time_zone must be of type String, received ${getType(default_time_zone)}`)
    }

    if (params['desktop_app_session_lifetime'] && !isInt(params['desktop_app_session_lifetime'])) {
      throw new Error(`Bad parameter: desktop_app_session_lifetime must be of type Int, received ${getType(desktop_app_session_lifetime)}`)
    }

    if (params['mobile_app_session_lifetime'] && !isInt(params['mobile_app_session_lifetime'])) {
      throw new Error(`Bad parameter: mobile_app_session_lifetime must be of type Int, received ${getType(mobile_app_session_lifetime)}`)
    }

    if (params['welcome_screen'] && !isString(params['welcome_screen'])) {
      throw new Error(`Bad parameter: welcome_screen must be of type String, received ${getType(welcome_screen)}`)
    }

    if (params['user_lockout_tries'] && !isInt(params['user_lockout_tries'])) {
      throw new Error(`Bad parameter: user_lockout_tries must be of type Int, received ${getType(user_lockout_tries)}`)
    }

    if (params['user_lockout_within'] && !isInt(params['user_lockout_within'])) {
      throw new Error(`Bad parameter: user_lockout_within must be of type Int, received ${getType(user_lockout_within)}`)
    }

    if (params['user_lockout_lock_period'] && !isInt(params['user_lockout_lock_period'])) {
      throw new Error(`Bad parameter: user_lockout_lock_period must be of type Int, received ${getType(user_lockout_lock_period)}`)
    }

    if (params['allowed_countries'] && !isString(params['allowed_countries'])) {
      throw new Error(`Bad parameter: allowed_countries must be of type String, received ${getType(allowed_countries)}`)
    }

    if (params['allowed_ips'] && !isString(params['allowed_ips'])) {
      throw new Error(`Bad parameter: allowed_ips must be of type String, received ${getType(allowed_ips)}`)
    }

    if (params['disallowed_countries'] && !isString(params['disallowed_countries'])) {
      throw new Error(`Bad parameter: disallowed_countries must be of type String, received ${getType(disallowed_countries)}`)
    }

    if (params['days_to_retain_backups'] && !isInt(params['days_to_retain_backups'])) {
      throw new Error(`Bad parameter: days_to_retain_backups must be of type Int, received ${getType(days_to_retain_backups)}`)
    }

    if (params['max_prior_passwords'] && !isInt(params['max_prior_passwords'])) {
      throw new Error(`Bad parameter: max_prior_passwords must be of type Int, received ${getType(max_prior_passwords)}`)
    }

    if (params['password_validity_days'] && !isInt(params['password_validity_days'])) {
      throw new Error(`Bad parameter: password_validity_days must be of type Int, received ${getType(password_validity_days)}`)
    }

    if (params['password_min_length'] && !isInt(params['password_min_length'])) {
      throw new Error(`Bad parameter: password_min_length must be of type Int, received ${getType(password_min_length)}`)
    }

    if (params['disable_users_from_inactivity_period_days'] && !isInt(params['disable_users_from_inactivity_period_days'])) {
      throw new Error(`Bad parameter: disable_users_from_inactivity_period_days must be of type Int, received ${getType(disable_users_from_inactivity_period_days)}`)
    }

    if (params['require_2fa_user_type'] && !isString(params['require_2fa_user_type'])) {
      throw new Error(`Bad parameter: require_2fa_user_type must be of type String, received ${getType(require_2fa_user_type)}`)
    }

    if (params['color2_top'] && !isString(params['color2_top'])) {
      throw new Error(`Bad parameter: color2_top must be of type String, received ${getType(color2_top)}`)
    }

    if (params['color2_left'] && !isString(params['color2_left'])) {
      throw new Error(`Bad parameter: color2_left must be of type String, received ${getType(color2_left)}`)
    }

    if (params['color2_link'] && !isString(params['color2_link'])) {
      throw new Error(`Bad parameter: color2_link must be of type String, received ${getType(color2_link)}`)
    }

    if (params['color2_text'] && !isString(params['color2_text'])) {
      throw new Error(`Bad parameter: color2_text must be of type String, received ${getType(color2_text)}`)
    }

    if (params['color2_top_text'] && !isString(params['color2_top_text'])) {
      throw new Error(`Bad parameter: color2_top_text must be of type String, received ${getType(color2_top_text)}`)
    }

    if (params['site_header'] && !isString(params['site_header'])) {
      throw new Error(`Bad parameter: site_header must be of type String, received ${getType(site_header)}`)
    }

    if (params['site_footer'] && !isString(params['site_footer'])) {
      throw new Error(`Bad parameter: site_footer must be of type String, received ${getType(site_footer)}`)
    }

    if (params['login_help_text'] && !isString(params['login_help_text'])) {
      throw new Error(`Bad parameter: login_help_text must be of type String, received ${getType(login_help_text)}`)
    }

    if (params['smtp_address'] && !isString(params['smtp_address'])) {
      throw new Error(`Bad parameter: smtp_address must be of type String, received ${getType(smtp_address)}`)
    }

    if (params['smtp_authentication'] && !isString(params['smtp_authentication'])) {
      throw new Error(`Bad parameter: smtp_authentication must be of type String, received ${getType(smtp_authentication)}`)
    }

    if (params['smtp_from'] && !isString(params['smtp_from'])) {
      throw new Error(`Bad parameter: smtp_from must be of type String, received ${getType(smtp_from)}`)
    }

    if (params['smtp_username'] && !isString(params['smtp_username'])) {
      throw new Error(`Bad parameter: smtp_username must be of type String, received ${getType(smtp_username)}`)
    }

    if (params['smtp_port'] && !isInt(params['smtp_port'])) {
      throw new Error(`Bad parameter: smtp_port must be of type Int, received ${getType(smtp_port)}`)
    }

    if (params['ldap_type'] && !isString(params['ldap_type'])) {
      throw new Error(`Bad parameter: ldap_type must be of type String, received ${getType(ldap_type)}`)
    }

    if (params['ldap_host'] && !isString(params['ldap_host'])) {
      throw new Error(`Bad parameter: ldap_host must be of type String, received ${getType(ldap_host)}`)
    }

    if (params['ldap_host_2'] && !isString(params['ldap_host_2'])) {
      throw new Error(`Bad parameter: ldap_host_2 must be of type String, received ${getType(ldap_host_2)}`)
    }

    if (params['ldap_host_3'] && !isString(params['ldap_host_3'])) {
      throw new Error(`Bad parameter: ldap_host_3 must be of type String, received ${getType(ldap_host_3)}`)
    }

    if (params['ldap_port'] && !isInt(params['ldap_port'])) {
      throw new Error(`Bad parameter: ldap_port must be of type Int, received ${getType(ldap_port)}`)
    }

    if (params['ldap_username'] && !isString(params['ldap_username'])) {
      throw new Error(`Bad parameter: ldap_username must be of type String, received ${getType(ldap_username)}`)
    }

    if (params['ldap_username_field'] && !isString(params['ldap_username_field'])) {
      throw new Error(`Bad parameter: ldap_username_field must be of type String, received ${getType(ldap_username_field)}`)
    }

    if (params['ldap_domain'] && !isString(params['ldap_domain'])) {
      throw new Error(`Bad parameter: ldap_domain must be of type String, received ${getType(ldap_domain)}`)
    }

    if (params['ldap_user_action'] && !isString(params['ldap_user_action'])) {
      throw new Error(`Bad parameter: ldap_user_action must be of type String, received ${getType(ldap_user_action)}`)
    }

    if (params['ldap_group_action'] && !isString(params['ldap_group_action'])) {
      throw new Error(`Bad parameter: ldap_group_action must be of type String, received ${getType(ldap_group_action)}`)
    }

    if (params['ldap_user_include_groups'] && !isString(params['ldap_user_include_groups'])) {
      throw new Error(`Bad parameter: ldap_user_include_groups must be of type String, received ${getType(ldap_user_include_groups)}`)
    }

    if (params['ldap_group_exclusion'] && !isString(params['ldap_group_exclusion'])) {
      throw new Error(`Bad parameter: ldap_group_exclusion must be of type String, received ${getType(ldap_group_exclusion)}`)
    }

    if (params['ldap_group_inclusion'] && !isString(params['ldap_group_inclusion'])) {
      throw new Error(`Bad parameter: ldap_group_inclusion must be of type String, received ${getType(ldap_group_inclusion)}`)
    }

    if (params['ldap_base_dn'] && !isString(params['ldap_base_dn'])) {
      throw new Error(`Bad parameter: ldap_base_dn must be of type String, received ${getType(ldap_base_dn)}`)
    }

    if (params['ldap_password_change'] && !isString(params['ldap_password_change'])) {
      throw new Error(`Bad parameter: ldap_password_change must be of type String, received ${getType(ldap_password_change)}`)
    }

    if (params['ldap_password_change_confirmation'] && !isString(params['ldap_password_change_confirmation'])) {
      throw new Error(`Bad parameter: ldap_password_change_confirmation must be of type String, received ${getType(ldap_password_change_confirmation)}`)
    }

    if (params['smtp_password'] && !isString(params['smtp_password'])) {
      throw new Error(`Bad parameter: smtp_password must be of type String, received ${getType(smtp_password)}`)
    }

    const response = await Api.sendRequest(`/site`, 'PATCH', params, options)

    return new Site(response?.data, options)
  }
}

export default Site
