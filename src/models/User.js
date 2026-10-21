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
 * Class User
 */
class User {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # User ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # User's username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
    exposeAttributes(this, ['username'])
  }

  // array(int64) # List of group IDs of which this user is an administrator
  getAdminGroupIds = () => this.attributes.admin_group_ids

  setAdminGroupIds = value => {
    this.attributes.admin_group_ids = value
    exposeAttributes(this, ['admin_group_ids'])
  }

  // string # A list of allowed IPs if applicable.  Newline delimited
  getAllowedIps = () => this.attributes.allowed_ips

  setAllowedIps = value => {
    this.attributes.allowed_ips = value
    exposeAttributes(this, ['allowed_ips'])
  }

  // boolean # If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead.
  getAttachmentsPermission = () => this.attributes.attachments_permission

  setAttachmentsPermission = value => {
    this.attributes.attachments_permission = value
    exposeAttributes(this, ['attachments_permission'])
  }

  // int64 # Number of API keys associated with this user
  getApiKeysCount = () => this.attributes.api_keys_count

  setApiKeysCount = value => {
    this.attributes.api_keys_count = value
    exposeAttributes(this, ['api_keys_count'])
  }

  // date-time # Scheduled Date/Time at which user will be deactivated
  getAuthenticateUntil = () => this.attributes.authenticate_until

  setAuthenticateUntil = value => {
    this.attributes.authenticate_until = value
    exposeAttributes(this, ['authenticate_until'])
  }

  // string # How is this user authenticated?
  getAuthenticationMethod = () => this.attributes.authentication_method

  setAuthenticationMethod = value => {
    this.attributes.authentication_method = value
    exposeAttributes(this, ['authentication_method'])
  }

  // string # URL holding the user's avatar
  getAvatarUrl = () => this.attributes.avatar_url

  setAvatarUrl = value => {
    this.attributes.avatar_url = value
    exposeAttributes(this, ['avatar_url'])
  }

  // boolean # Is this a billable user record?
  getBillable = () => this.attributes.billable

  setBillable = value => {
    this.attributes.billable = value
    exposeAttributes(this, ['billable'])
  }

  // boolean # Allow this user to perform operations on the account, payments, and invoices?
  getBillingPermission = () => this.attributes.billing_permission

  setBillingPermission = value => {
    this.attributes.billing_permission = value
    exposeAttributes(this, ['billing_permission'])
  }

  // boolean # Allow this user to skip site-wide IP blacklists?
  getBypassSiteAllowedIps = () => this.attributes.bypass_site_allowed_ips

  setBypassSiteAllowedIps = value => {
    this.attributes.bypass_site_allowed_ips = value
    exposeAttributes(this, ['bypass_site_allowed_ips'])
  }

  // boolean # Exempt this user from user lifecycle rules?
  getBypassUserLifecycleRules = () => this.attributes.bypass_user_lifecycle_rules

  setBypassUserLifecycleRules = value => {
    this.attributes.bypass_user_lifecycle_rules = value
    exposeAttributes(this, ['bypass_user_lifecycle_rules'])
  }

  // date-time # When this user was created
  getCreatedAt = () => this.attributes.created_at

  // boolean # Can the user connect with WebDAV?
  getDavPermission = () => this.attributes.dav_permission

  setDavPermission = value => {
    this.attributes.dav_permission = value
    exposeAttributes(this, ['dav_permission'])
  }

  // boolean # Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
    exposeAttributes(this, ['disabled'])
  }

  // boolean # Computed property that returns true if user disabled or expired or inactive.
  getDisabledExpiredOrInactive = () => this.attributes.disabled_expired_or_inactive

  setDisabledExpiredOrInactive = value => {
    this.attributes.disabled_expired_or_inactive = value
    exposeAttributes(this, ['disabled_expired_or_inactive'])
  }

  // int64 # AI Assistant Personality ID assigned directly to this user, if any.
  getAiAssistantPersonalityId = () => this.attributes.ai_assistant_personality_id

  setAiAssistantPersonalityId = value => {
    this.attributes.ai_assistant_personality_id = value
    exposeAttributes(this, ['ai_assistant_personality_id'])
  }

  // int64 # Desktop Configuration Profile ID assigned directly to this user, if any.
  getDesktopConfigurationProfileId = () => this.attributes.desktop_configuration_profile_id

  setDesktopConfigurationProfileId = value => {
    this.attributes.desktop_configuration_profile_id = value
    exposeAttributes(this, ['desktop_configuration_profile_id'])
  }

  // int64 # Integration Centric Profile ID assigned directly to this user, if any.
  getIntegrationCentricProfileId = () => this.attributes.integration_centric_profile_id

  setIntegrationCentricProfileId = value => {
    this.attributes.integration_centric_profile_id = value
    exposeAttributes(this, ['integration_centric_profile_id'])
  }

  // email # User email address
  getEmail = () => this.attributes.email

  setEmail = value => {
    this.attributes.email = value
    exposeAttributes(this, ['email'])
  }

  // string # File system layout
  getFilesystemLayout = () => this.attributes.filesystem_layout

  setFilesystemLayout = value => {
    this.attributes.filesystem_layout = value
    exposeAttributes(this, ['filesystem_layout'])
  }

  // date-time # User's first login time
  getFirstLoginAt = () => this.attributes.first_login_at

  setFirstLoginAt = value => {
    this.attributes.first_login_at = value
    exposeAttributes(this, ['first_login_at'])
  }

  // boolean # Can the user access with FTP/FTPS?
  getFtpPermission = () => this.attributes.ftp_permission

  setFtpPermission = value => {
    this.attributes.ftp_permission = value
    exposeAttributes(this, ['ftp_permission'])
  }

  // string # Comma-separated list of group IDs of which this user is a member
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
    exposeAttributes(this, ['group_ids'])
  }

  // string # Text to display to the user in the header of the UI
  getHeaderText = () => this.attributes.header_text

  setHeaderText = value => {
    this.attributes.header_text = value
    exposeAttributes(this, ['header_text'])
  }

  // string # Preferred language
  getLanguage = () => this.attributes.language

  setLanguage = value => {
    this.attributes.language = value
    exposeAttributes(this, ['language'])
  }

  // date-time # User's most recent login time via any protocol
  getLastLoginAt = () => this.attributes.last_login_at

  setLastLoginAt = value => {
    this.attributes.last_login_at = value
    exposeAttributes(this, ['last_login_at'])
  }

  // date-time # User's most recent login time via web
  getLastWebLoginAt = () => this.attributes.last_web_login_at

  setLastWebLoginAt = value => {
    this.attributes.last_web_login_at = value
    exposeAttributes(this, ['last_web_login_at'])
  }

  // date-time # User's most recent login time via FTP
  getLastFtpLoginAt = () => this.attributes.last_ftp_login_at

  setLastFtpLoginAt = value => {
    this.attributes.last_ftp_login_at = value
    exposeAttributes(this, ['last_ftp_login_at'])
  }

  // date-time # User's most recent login time via SFTP
  getLastSftpLoginAt = () => this.attributes.last_sftp_login_at

  setLastSftpLoginAt = value => {
    this.attributes.last_sftp_login_at = value
    exposeAttributes(this, ['last_sftp_login_at'])
  }

  // date-time # User's most recent login time via WebDAV
  getLastDavLoginAt = () => this.attributes.last_dav_login_at

  setLastDavLoginAt = value => {
    this.attributes.last_dav_login_at = value
    exposeAttributes(this, ['last_dav_login_at'])
  }

  // date-time # User's most recent login time via Desktop app
  getLastDesktopLoginAt = () => this.attributes.last_desktop_login_at

  setLastDesktopLoginAt = value => {
    this.attributes.last_desktop_login_at = value
    exposeAttributes(this, ['last_desktop_login_at'])
  }

  // date-time # User's most recent login time via Rest API
  getLastRestapiLoginAt = () => this.attributes.last_restapi_login_at

  setLastRestapiLoginAt = value => {
    this.attributes.last_restapi_login_at = value
    exposeAttributes(this, ['last_restapi_login_at'])
  }

  // date-time # User's most recent API use time
  getLastApiUseAt = () => this.attributes.last_api_use_at

  setLastApiUseAt = value => {
    this.attributes.last_api_use_at = value
    exposeAttributes(this, ['last_api_use_at'])
  }

  // date-time # User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or creation
  getLastActiveAt = () => this.attributes.last_active_at

  setLastActiveAt = value => {
    this.attributes.last_active_at = value
    exposeAttributes(this, ['last_active_at'])
  }

  // string # The most recent protocol and cipher used
  getLastProtocolCipher = () => this.attributes.last_protocol_cipher

  setLastProtocolCipher = value => {
    this.attributes.last_protocol_cipher = value
    exposeAttributes(this, ['last_protocol_cipher'])
  }

  // date-time # Time in the future that the user will no longer be locked out if applicable
  getLockoutExpires = () => this.attributes.lockout_expires

  setLockoutExpires = value => {
    this.attributes.lockout_expires = value
    exposeAttributes(this, ['lockout_expires'])
  }

  // string # User's full name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # User's company
  getCompany = () => this.attributes.company

  setCompany = value => {
    this.attributes.company = value
    exposeAttributes(this, ['company'])
  }

  // string # Any internal notes on the user
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
    exposeAttributes(this, ['notes'])
  }

  // int64 # Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  getNotificationDailySendTime = () => this.attributes.notification_daily_send_time

  setNotificationDailySendTime = value => {
    this.attributes.notification_daily_send_time = value
    exposeAttributes(this, ['notification_daily_send_time'])
  }

  // boolean # Enable integration with Office for the web?
  getOfficeIntegrationEnabled = () => this.attributes.office_integration_enabled

  setOfficeIntegrationEnabled = value => {
    this.attributes.office_integration_enabled = value
    exposeAttributes(this, ['office_integration_enabled'])
  }

  // boolean # Is this user a Partner administrator?
  getPartnerAdmin = () => this.attributes.partner_admin

  setPartnerAdmin = value => {
    this.attributes.partner_admin = value
    exposeAttributes(this, ['partner_admin'])
  }

  // int64 # Partner ID if this user belongs to a Partner
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
    exposeAttributes(this, ['partner_id'])
  }

  // string # Name of the Partner if this user belongs to a Partner
  getPartnerName = () => this.attributes.partner_name

  setPartnerName = value => {
    this.attributes.partner_name = value
    exposeAttributes(this, ['partner_name'])
  }

  // date-time # Last time the user's password was set
  getPasswordSetAt = () => this.attributes.password_set_at

  setPasswordSetAt = value => {
    this.attributes.password_set_at = value
    exposeAttributes(this, ['password_set_at'])
  }

  // int64 # Number of days to allow user to use the same password
  getPasswordValidityDays = () => this.attributes.password_validity_days

  setPasswordValidityDays = value => {
    this.attributes.password_validity_days = value
    exposeAttributes(this, ['password_validity_days'])
  }

  // int64 # Primary group ID for Group Admin scoping
  getPrimaryGroupId = () => this.attributes.primary_group_id

  setPrimaryGroupId = value => {
    this.attributes.primary_group_id = value
    exposeAttributes(this, ['primary_group_id'])
  }

  // int64 # Number of public keys associated with this user
  getPublicKeysCount = () => this.attributes.public_keys_count

  setPublicKeysCount = value => {
    this.attributes.public_keys_count = value
    exposeAttributes(this, ['public_keys_count'])
  }

  // boolean # Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead.
  getReceiveAdminAlerts = () => this.attributes.receive_admin_alerts

  setReceiveAdminAlerts = value => {
    this.attributes.receive_admin_alerts = value
    exposeAttributes(this, ['receive_admin_alerts'])
  }

  // boolean # Should the user receive site warnings via email?
  getNotifyOnAllSiteWarnings = () => this.attributes.notify_on_all_site_warnings

  setNotifyOnAllSiteWarnings = value => {
    this.attributes.notify_on_all_site_warnings = value
    exposeAttributes(this, ['notify_on_all_site_warnings'])
  }

  // boolean # Should the user receive sso/scim/ldap configuration/sync failures via email?
  getNotifyOnAllSsoFailures = () => this.attributes.notify_on_all_sso_failures

  setNotifyOnAllSsoFailures = value => {
    this.attributes.notify_on_all_sso_failures = value
    exposeAttributes(this, ['notify_on_all_sso_failures'])
  }

  // boolean # Should the user receive user security events via email?
  getNotifyOnAllUserSecurityEvents = () => this.attributes.notify_on_all_user_security_events

  setNotifyOnAllUserSecurityEvents = value => {
    this.attributes.notify_on_all_user_security_events = value
    exposeAttributes(this, ['notify_on_all_user_security_events'])
  }

  // boolean # Should the user receive pending work failures via email?
  getNotifyOnAllPendingWorkFailures = () => this.attributes.notify_on_all_pending_work_failures

  setNotifyOnAllPendingWorkFailures = value => {
    this.attributes.notify_on_all_pending_work_failures = value
    exposeAttributes(this, ['notify_on_all_pending_work_failures'])
  }

  // boolean # Should the user receive siem failures via email?
  getNotifyOnAllSiemHttpDestinationFailures = () => this.attributes.notify_on_all_siem_http_destination_failures

  setNotifyOnAllSiemHttpDestinationFailures = value => {
    this.attributes.notify_on_all_siem_http_destination_failures = value
    exposeAttributes(this, ['notify_on_all_siem_http_destination_failures'])
  }

  // boolean # Should the user receive sync failures via email?
  getNotifyOnAllSyncFailures = () => this.attributes.notify_on_all_sync_failures

  setNotifyOnAllSyncFailures = value => {
    this.attributes.notify_on_all_sync_failures = value
    exposeAttributes(this, ['notify_on_all_sync_failures'])
  }

  // boolean # Should the user receive automation failures via email?
  getNotifyOnAllAutomationFailures = () => this.attributes.notify_on_all_automation_failures

  setNotifyOnAllAutomationFailures = value => {
    this.attributes.notify_on_all_automation_failures = value
    exposeAttributes(this, ['notify_on_all_automation_failures'])
  }

  // boolean # Should the user receive expectation failures and misses via email?
  getNotifyOnAllExpectationFailures = () => this.attributes.notify_on_all_expectation_failures

  setNotifyOnAllExpectationFailures = value => {
    this.attributes.notify_on_all_expectation_failures = value
    exposeAttributes(this, ['notify_on_all_expectation_failures'])
  }

  // string # 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require` and `never_require` override the site-wide setting when user-level overrides are allowed.
  getRequire2fa = () => this.attributes.require_2fa

  setRequire2fa = value => {
    this.attributes.require_2fa = value
    exposeAttributes(this, ['require_2fa'])
  }

  // date-time # Require user to login by specified date otherwise it will be disabled.
  getRequireLoginBy = () => this.attributes.require_login_by

  setRequireLoginBy = value => {
    this.attributes.require_login_by = value
    exposeAttributes(this, ['require_login_by'])
  }

  // boolean # Is 2fa active for the user?
  getActive2fa = () => this.attributes.active_2fa

  setActive2fa = value => {
    this.attributes.active_2fa = value
    exposeAttributes(this, ['active_2fa'])
  }

  // boolean # Is a password change required upon next user login?
  getRequirePasswordChange = () => this.attributes.require_password_change

  setRequirePasswordChange = value => {
    this.attributes.require_password_change = value
    exposeAttributes(this, ['require_password_change'])
  }

  // boolean # Is user's password expired?
  getPasswordExpired = () => this.attributes.password_expired

  setPasswordExpired = value => {
    this.attributes.password_expired = value
    exposeAttributes(this, ['password_expired'])
  }

  // int64 # ID of the internal Group responsible for this Partner User, overriding the Partner default.
  getResponsibleGroupId = () => this.attributes.responsible_group_id

  setResponsibleGroupId = value => {
    this.attributes.responsible_group_id = value
    exposeAttributes(this, ['responsible_group_id'])
  }

  // int64 # ID of the internal User responsible for this Partner User, overriding the Partner default.
  getResponsibleUserId = () => this.attributes.responsible_user_id

  setResponsibleUserId = value => {
    this.attributes.responsible_user_id = value
    exposeAttributes(this, ['responsible_user_id'])
  }

  // boolean # Is the user an allowed to view all (non-billing) site configuration for this site?
  getReadonlySiteAdmin = () => this.attributes.readonly_site_admin

  setReadonlySiteAdmin = value => {
    this.attributes.readonly_site_admin = value
    exposeAttributes(this, ['readonly_site_admin'])
  }

  // boolean # Can this user access the Web app, Desktop app, SDKs, or REST API?  (All of these tools use the API internally, so this is one unified permission set.)
  getRestapiPermission = () => this.attributes.restapi_permission

  setRestapiPermission = value => {
    this.attributes.restapi_permission = value
    exposeAttributes(this, ['restapi_permission'])
  }

  // boolean # Can the user access the S3-compatible endpoint? Defaults to true.
  getS3CompatibleEndpointPermission = () => this.attributes.s3_compatible_endpoint_permission

  setS3CompatibleEndpointPermission = value => {
    this.attributes.s3_compatible_endpoint_permission = value
    exposeAttributes(this, ['s3_compatible_endpoint_permission'])
  }

  // boolean # Does this user manage it's own credentials or is it a shared/bot user?
  getSelfManaged = () => this.attributes.self_managed

  setSelfManaged = value => {
    this.attributes.self_managed = value
    exposeAttributes(this, ['self_managed'])
  }

  // boolean # Can the user access with SFTP?
  getSftpPermission = () => this.attributes.sftp_permission

  setSftpPermission = value => {
    this.attributes.sftp_permission = value
    exposeAttributes(this, ['sftp_permission'])
  }

  // boolean # Is the user an administrator for this site?
  getSiteAdmin = () => this.attributes.site_admin

  setSiteAdmin = value => {
    this.attributes.site_admin = value
    exposeAttributes(this, ['site_admin'])
  }

  // boolean # Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted through Permissions.
  getWorkspaceAdmin = () => this.attributes.workspace_admin

  setWorkspaceAdmin = value => {
    this.attributes.workspace_admin = value
    exposeAttributes(this, ['workspace_admin'])
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
    exposeAttributes(this, ['site_id'])
  }

  // int64 # ID of the Workspace the user belongs to. 0 is the Default Workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // int64 # Workspace ID the user should land in by default when more than one Workspace is available.
  getDefaultWorkspaceId = () => this.attributes.default_workspace_id

  setDefaultWorkspaceId = value => {
    this.attributes.default_workspace_id = value
    exposeAttributes(this, ['default_workspace_id'])
  }

  // boolean # Skip Welcome page in the UI?
  getSkipWelcomeScreen = () => this.attributes.skip_welcome_screen

  setSkipWelcomeScreen = value => {
    this.attributes.skip_welcome_screen = value
    exposeAttributes(this, ['skip_welcome_screen'])
  }

  // string # SSL required setting
  getSslRequired = () => this.attributes.ssl_required

  setSslRequired = value => {
    this.attributes.ssl_required = value
    exposeAttributes(this, ['ssl_required'])
  }

  // int64 # SSO (Single Sign On) strategy ID for the user, if applicable.
  getSsoStrategyId = () => this.attributes.sso_strategy_id

  setSsoStrategyId = value => {
    this.attributes.sso_strategy_id = value
    exposeAttributes(this, ['sso_strategy_id'])
  }

  // boolean # Is the user subscribed to the newsletter?
  getSubscribeToNewsletter = () => this.attributes.subscribe_to_newsletter

  setSubscribeToNewsletter = value => {
    this.attributes.subscribe_to_newsletter = value
    exposeAttributes(this, ['subscribe_to_newsletter'])
  }

  // boolean # Is this user managed by a SsoStrategy?
  getExternallyManaged = () => this.attributes.externally_managed

  setExternallyManaged = value => {
    this.attributes.externally_managed = value
    exposeAttributes(this, ['externally_managed'])
  }

  // string # Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  getTags = () => this.attributes.tags

  setTags = value => {
    this.attributes.tags = value
    exposeAttributes(this, ['tags'])
  }

  // string # User time zone
  getTimeZone = () => this.attributes.time_zone

  setTimeZone = value => {
    this.attributes.time_zone = value
    exposeAttributes(this, ['time_zone'])
  }

  // string # Type(s) of 2FA methods in use, for programmatic use.  Will be either `sms`, `totp`, `webauthn`, `yubi`, `email`, or multiple values sorted alphabetically and joined by an underscore.  Does not specify whether user has more than one of a given method.
  getTypeOf2fa = () => this.attributes.type_of_2fa

  setTypeOf2fa = value => {
    this.attributes.type_of_2fa = value
    exposeAttributes(this, ['type_of_2fa'])
  }

  // string # Type(s) of 2FA methods in use, formatted for displaying in the UI.  Unlike `type_of_2fa`, this value will make clear when a user has more than 1 of the same type of method.
  getTypeOf2faForDisplay = () => this.attributes.type_of_2fa_for_display

  setTypeOf2faForDisplay = value => {
    this.attributes.type_of_2fa_for_display = value
    exposeAttributes(this, ['type_of_2fa_for_display'])
  }

  // string # If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this path is not applied to the API, Desktop, or Web interface.
  getUserRoot = () => this.attributes.user_root

  setUserRoot = value => {
    this.attributes.user_root = value
    exposeAttributes(this, ['user_root'])
  }

  // string # Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other interface.
  getUserHome = () => this.attributes.user_home

  setUserHome = value => {
    this.attributes.user_home = value
    exposeAttributes(this, ['user_home'])
  }

  // int64 # Number of days remaining until password expires
  getDaysRemainingUntilPasswordExpire = () => this.attributes.days_remaining_until_password_expire

  setDaysRemainingUntilPasswordExpire = value => {
    this.attributes.days_remaining_until_password_expire = value
    exposeAttributes(this, ['days_remaining_until_password_expire'])
  }

  // date-time # Password expiration datetime
  getPasswordExpireAt = () => this.attributes.password_expire_at

  setPasswordExpireAt = value => {
    this.attributes.password_expire_at = value
    exposeAttributes(this, ['password_expire_at'])
  }

  // file # An image file for your user avatar.
  getAvatarFile = () => this.attributes.avatar_file

  setAvatarFile = value => {
    this.attributes.avatar_file = value
    exposeAttributes(this, ['avatar_file'])
  }

  // boolean # If true, the avatar will be deleted.
  getAvatarDelete = () => this.attributes.avatar_delete

  setAvatarDelete = value => {
    this.attributes.avatar_delete = value
    exposeAttributes(this, ['avatar_delete'])
  }

  // string # Used for changing a password on an existing user.
  getChangePassword = () => this.attributes.change_password

  setChangePassword = value => {
    this.attributes.change_password = value
    exposeAttributes(this, ['change_password'])
  }

  // string # Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  getChangePasswordConfirmation = () => this.attributes.change_password_confirmation

  setChangePasswordConfirmation = value => {
    this.attributes.change_password_confirmation = value
    exposeAttributes(this, ['change_password_confirmation'])
  }

  // string # Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`, `write`, `list`, `read+write`, `list+write`, or `history`.
  getGrantPermission = () => this.attributes.grant_permission

  setGrantPermission = value => {
    this.attributes.grant_permission = value
    exposeAttributes(this, ['grant_permission'])
  }

  // int64 # Group ID to associate this user with.
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
    exposeAttributes(this, ['group_id'])
  }

  // string # Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash methods are MD5, SHA1, and SHA256.
  getImportedPasswordHash = () => this.attributes.imported_password_hash

  setImportedPasswordHash = value => {
    this.attributes.imported_password_hash = value
    exposeAttributes(this, ['imported_password_hash'])
  }

  // string # User password.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
    exposeAttributes(this, ['password'])
  }

  // string # Optional, but if provided, we will ensure that it matches the value sent in `password`.
  getPasswordConfirmation = () => this.attributes.password_confirmation

  setPasswordConfirmation = value => {
    this.attributes.password_confirmation = value
    exposeAttributes(this, ['password_confirmation'])
  }

  // boolean # Signifies that the user has read all the announcements in the UI.
  getAnnouncementsRead = () => this.attributes.announcements_read

  setAnnouncementsRead = value => {
    this.attributes.announcements_read = value
    exposeAttributes(this, ['announcements_read'])
  }

  // boolean # If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in all other cases.
  getClear2fa = () => this.attributes.clear_2fa

  setClear2fa = value => {
    this.attributes.clear_2fa = value
    exposeAttributes(this, ['clear_2fa'])
  }

  // boolean # Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the partner_id provided.
  getConvertToPartnerUser = () => this.attributes.convert_to_partner_user

  setConvertToPartnerUser = value => {
    this.attributes.convert_to_partner_user = value
    exposeAttributes(this, ['convert_to_partner_user'])
  }

  // Unlock user who has been locked out due to failed logins
  unlock = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/users/${encodeURIComponent(params.id)}/unlock`, 'POST', params, this.options)
  }

  // Resend user welcome email
  resendWelcomeEmail = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/users/${encodeURIComponent(params.id)}/resend_welcome_email`, 'POST', params, this.options)
  }

  // Trigger 2FA Reset process for user who has lost access to their existing 2FA methods
  user2faReset = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/users/${encodeURIComponent(params.id)}/2fa/reset`, 'POST', params, this.options)
  }

  // Parameters:
  //   avatar_file - file - An image file for your user avatar.
  //   avatar_delete - boolean - If true, the avatar will be deleted.
  //   change_password - string - Used for changing a password on an existing user.
  //   change_password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  //   email - string - User's email.
  //   grant_permission - string - Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`, `write`, `list`, `read+write`, `list+write`, or `history`.
  //   group_id - int64 - Group ID to associate this user with.
  //   group_ids - string - A list of group ids to associate this user with.  Comma delimited.
  //   imported_password_hash - string - Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash methods are MD5, SHA1, and SHA256.
  //   password - string - User password.
  //   password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `password`.
  //   announcements_read - boolean - Signifies that the user has read all the announcements in the UI.
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned directly to this user, if any.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   attachments_permission - boolean - DEPRECATED: If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead.
  //   authenticate_until - string - Scheduled Date/Time at which user will be deactivated
  //   authentication_method - string - How is this user authenticated?
  //   billing_permission - boolean - Allow this user to perform operations on the account, payments, and invoices?
  //   bypass_user_lifecycle_rules - boolean - Exempt this user from user lifecycle rules?
  //   bypass_site_allowed_ips - boolean - Allow this user to skip site-wide IP blacklists?
  //   dav_permission - boolean - Can the user connect with WebDAV?
  //   desktop_configuration_profile_id - int64 - Desktop Configuration Profile ID assigned directly to this user, if any.
  //   default_workspace_id - int64 - Workspace ID the user should land in by default when more than one Workspace is available.
  //   disabled - boolean - Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
  //   filesystem_layout - string - File system layout
  //   ftp_permission - boolean - Can the user access with FTP/FTPS?
  //   header_text - string - Text to display to the user in the header of the UI
  //   integration_centric_profile_id - int64 - Integration Centric Profile ID assigned directly to this user, if any.
  //   language - string - Preferred language
  //   notification_daily_send_time - int64 - Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  //   name - string - User's full name
  //   company - string - User's company
  //   notes - string - Any internal notes on the user
  //   office_integration_enabled - boolean - Enable integration with Office for the web?
  //   partner_admin - boolean - Is this user a Partner administrator?
  //   partner_id - int64 - Partner ID if this user belongs to a Partner
  //   password_validity_days - int64 - Number of days to allow user to use the same password
  //   primary_group_id - int64 - Primary group ID for Group Admin scoping
  //   readonly_site_admin - boolean - Is the user an allowed to view all (non-billing) site configuration for this site?
  //   receive_admin_alerts - boolean - Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead.
  //   notify_on_all_site_warnings - boolean - Should the user receive site warnings via email?
  //   notify_on_all_sso_failures - boolean - Should the user receive sso/scim/ldap configuration/sync failures via email?
  //   notify_on_all_user_security_events - boolean - Should the user receive user security events via email?
  //   notify_on_all_pending_work_failures - boolean - Should the user receive pending work failures via email?
  //   notify_on_all_siem_http_destination_failures - boolean - Should the user receive siem failures via email?
  //   notify_on_all_sync_failures - boolean - Should the user receive sync failures via email?
  //   notify_on_all_automation_failures - boolean - Should the user receive automation failures via email?
  //   notify_on_all_expectation_failures - boolean - Should the user receive expectation failures and misses via email?
  //   require_login_by - string - Require user to login by specified date otherwise it will be disabled.
  //   require_password_change - boolean - Is a password change required upon next user login?
  //   responsible_group_id - int64 - ID of the internal Group responsible for this Partner User, overriding the Partner default.
  //   responsible_user_id - int64 - ID of the internal User responsible for this Partner User, overriding the Partner default.
  //   restapi_permission - boolean - Can this user access the Web app, Desktop app, SDKs, or REST API?  (All of these tools use the API internally, so this is one unified permission set.)
  //   s3_compatible_endpoint_permission - boolean - Can the user access the S3-compatible endpoint? Defaults to true.
  //   self_managed - boolean - Does this user manage it's own credentials or is it a shared/bot user?
  //   sftp_permission - boolean - Can the user access with SFTP?
  //   site_admin - boolean - Is the user an administrator for this site?
  //   skip_welcome_screen - boolean - Skip Welcome page in the UI?
  //   ssl_required - string - SSL required setting
  //   sso_strategy_id - int64 - SSO (Single Sign On) strategy ID for the user, if applicable.
  //   subscribe_to_newsletter - boolean - Is the user subscribed to the newsletter?
  //   require_2fa - string - 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require` and `never_require` override the site-wide setting when user-level overrides are allowed.
  //   tags - string - Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  //   time_zone - string - User time zone
  //   user_root - string - If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this path is not applied to the API, Desktop, or Web interface.
  //   user_home - string - Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other interface.
  //   workspace_admin - boolean - Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted through Permissions.
  //   username - string - User's username
  //   workspace_id - int64 - Workspace ID. Only Site Administrators can change this field. Values supplied by Workspace Administrators, Group Administrators, or other non-Site Administrators using `/user` are ignored.
  //   clear_2fa - boolean - If true when changing authentication_method from `password` to `sso`, remove all two-factor methods. Ignored in all other cases.
  //   convert_to_partner_user - boolean - Required when assigning a Partner to an existing non-Partner user. If true, convert the user by assigning the partner_id provided.
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (isArray(params.avatar_delete) || isObject(params.avatar_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: avatar_delete must be of type Boolean, received ${getType(params.avatar_delete)}`)
    }

    if (params.change_password !== undefined && params.change_password !== null && !isString(params.change_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password must be of type String, received ${getType(params.change_password)}`)
    }

    if (params.change_password_confirmation !== undefined && params.change_password_confirmation !== null && !isString(params.change_password_confirmation)) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password_confirmation must be of type String, received ${getType(params.change_password_confirmation)}`)
    }

    if (params.email !== undefined && params.email !== null && !isString(params.email)) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params.email)}`)
    }

    if (params.grant_permission !== undefined && params.grant_permission !== null && !isString(params.grant_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: grant_permission must be of type String, received ${getType(params.grant_permission)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
    }

    if (params.imported_password_hash !== undefined && params.imported_password_hash !== null && !isString(params.imported_password_hash)) {
      throw new errors.InvalidParameterError(`Bad parameter: imported_password_hash must be of type String, received ${getType(params.imported_password_hash)}`)
    }

    if (params.password !== undefined && params.password !== null && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (params.password_confirmation !== undefined && params.password_confirmation !== null && !isString(params.password_confirmation)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_confirmation must be of type String, received ${getType(params.password_confirmation)}`)
    }

    if (isArray(params.announcements_read) || isObject(params.announcements_read)) {
      throw new errors.InvalidParameterError(`Bad parameter: announcements_read must be of type Boolean, received ${getType(params.announcements_read)}`)
    }

    if (params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !isInt(params.ai_assistant_personality_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ai_assistant_personality_id must be of type Int, received ${getType(params.ai_assistant_personality_id)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (isArray(params.attachments_permission) || isObject(params.attachments_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: attachments_permission must be of type Boolean, received ${getType(params.attachments_permission)}`)
    }

    if (params.authenticate_until !== undefined && params.authenticate_until !== null && !isString(params.authenticate_until)) {
      throw new errors.InvalidParameterError(`Bad parameter: authenticate_until must be of type String, received ${getType(params.authenticate_until)}`)
    }

    if (params.authentication_method !== undefined && params.authentication_method !== null && !isString(params.authentication_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params.authentication_method)}`)
    }

    if (isArray(params.billing_permission) || isObject(params.billing_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: billing_permission must be of type Boolean, received ${getType(params.billing_permission)}`)
    }

    if (isArray(params.bypass_user_lifecycle_rules) || isObject(params.bypass_user_lifecycle_rules)) {
      throw new errors.InvalidParameterError(`Bad parameter: bypass_user_lifecycle_rules must be of type Boolean, received ${getType(params.bypass_user_lifecycle_rules)}`)
    }

    if (isArray(params.bypass_site_allowed_ips) || isObject(params.bypass_site_allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: bypass_site_allowed_ips must be of type Boolean, received ${getType(params.bypass_site_allowed_ips)}`)
    }

    if (isArray(params.dav_permission) || isObject(params.dav_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: dav_permission must be of type Boolean, received ${getType(params.dav_permission)}`)
    }

    if (params.desktop_configuration_profile_id !== undefined && params.desktop_configuration_profile_id !== null && !isInt(params.desktop_configuration_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_configuration_profile_id must be of type Int, received ${getType(params.desktop_configuration_profile_id)}`)
    }

    if (params.default_workspace_id !== undefined && params.default_workspace_id !== null && !isInt(params.default_workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_workspace_id must be of type Int, received ${getType(params.default_workspace_id)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.filesystem_layout !== undefined && params.filesystem_layout !== null && !isString(params.filesystem_layout)) {
      throw new errors.InvalidParameterError(`Bad parameter: filesystem_layout must be of type String, received ${getType(params.filesystem_layout)}`)
    }

    if (isArray(params.ftp_permission) || isObject(params.ftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: ftp_permission must be of type Boolean, received ${getType(params.ftp_permission)}`)
    }

    if (params.header_text !== undefined && params.header_text !== null && !isString(params.header_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: header_text must be of type String, received ${getType(params.header_text)}`)
    }

    if (params.integration_centric_profile_id !== undefined && params.integration_centric_profile_id !== null && !isInt(params.integration_centric_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: integration_centric_profile_id must be of type Int, received ${getType(params.integration_centric_profile_id)}`)
    }

    if (params.language !== undefined && params.language !== null && !isString(params.language)) {
      throw new errors.InvalidParameterError(`Bad parameter: language must be of type String, received ${getType(params.language)}`)
    }

    if (params.notification_daily_send_time !== undefined && params.notification_daily_send_time !== null && !isInt(params.notification_daily_send_time)) {
      throw new errors.InvalidParameterError(`Bad parameter: notification_daily_send_time must be of type Int, received ${getType(params.notification_daily_send_time)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.company !== undefined && params.company !== null && !isString(params.company)) {
      throw new errors.InvalidParameterError(`Bad parameter: company must be of type String, received ${getType(params.company)}`)
    }

    if (params.notes !== undefined && params.notes !== null && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (isArray(params.office_integration_enabled) || isObject(params.office_integration_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: office_integration_enabled must be of type Boolean, received ${getType(params.office_integration_enabled)}`)
    }

    if (isArray(params.partner_admin) || isObject(params.partner_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_admin must be of type Boolean, received ${getType(params.partner_admin)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.password_validity_days !== undefined && params.password_validity_days !== null && !isInt(params.password_validity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_validity_days must be of type Int, received ${getType(params.password_validity_days)}`)
    }

    if (params.primary_group_id !== undefined && params.primary_group_id !== null && !isInt(params.primary_group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: primary_group_id must be of type Int, received ${getType(params.primary_group_id)}`)
    }

    if (isArray(params.readonly_site_admin) || isObject(params.readonly_site_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: readonly_site_admin must be of type Boolean, received ${getType(params.readonly_site_admin)}`)
    }

    if (isArray(params.receive_admin_alerts) || isObject(params.receive_admin_alerts)) {
      throw new errors.InvalidParameterError(`Bad parameter: receive_admin_alerts must be of type Boolean, received ${getType(params.receive_admin_alerts)}`)
    }

    if (isArray(params.notify_on_all_site_warnings) || isObject(params.notify_on_all_site_warnings)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_site_warnings must be of type Boolean, received ${getType(params.notify_on_all_site_warnings)}`)
    }

    if (isArray(params.notify_on_all_sso_failures) || isObject(params.notify_on_all_sso_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_sso_failures must be of type Boolean, received ${getType(params.notify_on_all_sso_failures)}`)
    }

    if (isArray(params.notify_on_all_user_security_events) || isObject(params.notify_on_all_user_security_events)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_user_security_events must be of type Boolean, received ${getType(params.notify_on_all_user_security_events)}`)
    }

    if (isArray(params.notify_on_all_pending_work_failures) || isObject(params.notify_on_all_pending_work_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_pending_work_failures must be of type Boolean, received ${getType(params.notify_on_all_pending_work_failures)}`)
    }

    if (isArray(params.notify_on_all_siem_http_destination_failures) || isObject(params.notify_on_all_siem_http_destination_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_siem_http_destination_failures must be of type Boolean, received ${getType(params.notify_on_all_siem_http_destination_failures)}`)
    }

    if (isArray(params.notify_on_all_sync_failures) || isObject(params.notify_on_all_sync_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_sync_failures must be of type Boolean, received ${getType(params.notify_on_all_sync_failures)}`)
    }

    if (isArray(params.notify_on_all_automation_failures) || isObject(params.notify_on_all_automation_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_automation_failures must be of type Boolean, received ${getType(params.notify_on_all_automation_failures)}`)
    }

    if (isArray(params.notify_on_all_expectation_failures) || isObject(params.notify_on_all_expectation_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_expectation_failures must be of type Boolean, received ${getType(params.notify_on_all_expectation_failures)}`)
    }

    if (params.require_login_by !== undefined && params.require_login_by !== null && !isString(params.require_login_by)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_login_by must be of type String, received ${getType(params.require_login_by)}`)
    }

    if (isArray(params.require_password_change) || isObject(params.require_password_change)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_password_change must be of type Boolean, received ${getType(params.require_password_change)}`)
    }

    if (params.responsible_group_id !== undefined && params.responsible_group_id !== null && !isInt(params.responsible_group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_group_id must be of type Int, received ${getType(params.responsible_group_id)}`)
    }

    if (params.responsible_user_id !== undefined && params.responsible_user_id !== null && !isInt(params.responsible_user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_user_id must be of type Int, received ${getType(params.responsible_user_id)}`)
    }

    if (isArray(params.restapi_permission) || isObject(params.restapi_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: restapi_permission must be of type Boolean, received ${getType(params.restapi_permission)}`)
    }

    if (isArray(params.s3_compatible_endpoint_permission) || isObject(params.s3_compatible_endpoint_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint_permission must be of type Boolean, received ${getType(params.s3_compatible_endpoint_permission)}`)
    }

    if (isArray(params.self_managed) || isObject(params.self_managed)) {
      throw new errors.InvalidParameterError(`Bad parameter: self_managed must be of type Boolean, received ${getType(params.self_managed)}`)
    }

    if (isArray(params.sftp_permission) || isObject(params.sftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_permission must be of type Boolean, received ${getType(params.sftp_permission)}`)
    }

    if (isArray(params.site_admin) || isObject(params.site_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_admin must be of type Boolean, received ${getType(params.site_admin)}`)
    }

    if (isArray(params.skip_welcome_screen) || isObject(params.skip_welcome_screen)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_welcome_screen must be of type Boolean, received ${getType(params.skip_welcome_screen)}`)
    }

    if (params.ssl_required !== undefined && params.ssl_required !== null && !isString(params.ssl_required)) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_required must be of type String, received ${getType(params.ssl_required)}`)
    }

    if (params.sso_strategy_id !== undefined && params.sso_strategy_id !== null && !isInt(params.sso_strategy_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: sso_strategy_id must be of type Int, received ${getType(params.sso_strategy_id)}`)
    }

    if (isArray(params.subscribe_to_newsletter) || isObject(params.subscribe_to_newsletter)) {
      throw new errors.InvalidParameterError(`Bad parameter: subscribe_to_newsletter must be of type Boolean, received ${getType(params.subscribe_to_newsletter)}`)
    }

    if (params.require_2fa !== undefined && params.require_2fa !== null && !isString(params.require_2fa)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa must be of type String, received ${getType(params.require_2fa)}`)
    }

    if (params.tags !== undefined && params.tags !== null && !isString(params.tags)) {
      throw new errors.InvalidParameterError(`Bad parameter: tags must be of type String, received ${getType(params.tags)}`)
    }

    if (params.time_zone !== undefined && params.time_zone !== null && !isString(params.time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: time_zone must be of type String, received ${getType(params.time_zone)}`)
    }

    if (params.user_root !== undefined && params.user_root !== null && !isString(params.user_root)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_root must be of type String, received ${getType(params.user_root)}`)
    }

    if (params.user_home !== undefined && params.user_home !== null && !isString(params.user_home)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_home must be of type String, received ${getType(params.user_home)}`)
    }

    if (isArray(params.workspace_admin) || isObject(params.workspace_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_admin must be of type Boolean, received ${getType(params.workspace_admin)}`)
    }

    if (params.username !== undefined && params.username !== null && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.clear_2fa) || isObject(params.clear_2fa)) {
      throw new errors.InvalidParameterError(`Bad parameter: clear_2fa must be of type Boolean, received ${getType(params.clear_2fa)}`)
    }

    if (isArray(params.convert_to_partner_user) || isObject(params.convert_to_partner_user)) {
      throw new errors.InvalidParameterError(`Bad parameter: convert_to_partner_user must be of type Boolean, received ${getType(params.convert_to_partner_user)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
  }

  // Parameters:
  //   new_owner_id - int64 - Provide a User ID here to transfer ownership of certain resources such as Automations and Share Links (Bundles) to that new user.
  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.new_owner_id !== undefined && params.new_owner_id !== null && !isInt(params.new_owner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: new_owner_id must be of type Int, received ${getType(params.new_owner_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/users/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await User.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `workspace_id`, `company`, `name`, `disabled`, `authenticate_until`, `username`, `email`, `site_admin`, `last_desktop_login_at`, `last_login_at`, `password_validity_days` or `ssl_required`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `username`, `name`, `email`, `company`, `site_admin`, `password_validity_days`, `ssl_required`, `last_login_at`, `authenticate_until`, `not_site_admin`, `disabled`, `partner_id`, `primary_group_id` or `workspace_id`. Valid field combinations are `[ site_admin, username ]`, `[ not_site_admin, username ]`, `[ workspace_id, username ]`, `[ company, name ]`, `[ workspace_id, name ]`, `[ workspace_id, email ]`, `[ workspace_id, company ]`, `[ workspace_id, site_admin ]`, `[ workspace_id, not_site_admin ]`, `[ workspace_id, disabled ]`, `[ workspace_id, partner_id ]`, `[ workspace_id, site_admin, username ]`, `[ workspace_id, not_site_admin, username ]`, `[ workspace_id, disabled, username ]`, `[ workspace_id, partner_id, username ]` or `[ workspace_id, company, name ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `username`, `name`, `email` or `company`. Valid field combinations are `[ company, name ]`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   ids - string - comma-separated list of User IDs
  //   include_parent_site_users - boolean - Include users from the parent site.
  //   include_default_workspace_users - boolean - When scoped to a Custom Workspace, include Default Workspace users who have permissions in that Workspace. Available to Site Administrators, and to Workspace Administrators and Folder Admins in that Workspace when the site shares its Default Workspace directory with Workspaces.
  //   search - string - Searches for partial matches of name, username, or email.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.ids !== undefined && params.ids !== null && !isString(params.ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: ids must be of type String, received ${getType(params.ids)}`)
    }

    if (isArray(params.include_parent_site_users) || isObject(params.include_parent_site_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_parent_site_users must be of type Boolean, received ${getType(params.include_parent_site_users)}`)
    }

    if (isArray(params.include_default_workspace_users) || isObject(params.include_default_workspace_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_default_workspace_users must be of type Boolean, received ${getType(params.include_default_workspace_users)}`)
    }

    if (params.search !== undefined && params.search !== null && !isString(params.search)) {
      throw new errors.InvalidParameterError(`Bad parameter: search must be of type String, received ${getType(params.search)}`)
    }

    const response = await Api.sendRequest('/users', 'GET', params, options)

    return response?.data?.map(obj => new User(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    User.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      User.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - User ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new User(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    User.find(id, params, options)

  // Parameters:
  //   avatar_file - file - An image file for your user avatar.
  //   avatar_delete - boolean - If true, the avatar will be deleted.
  //   change_password - string - Used for changing a password on an existing user.
  //   change_password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  //   email - string - User's email.
  //   grant_permission - string - Permission to grant on the User Root upon creation, or on the Workspace root when the User Root is blank. For the Default Workspace, a blank User Root uses the site root. `admin` on a Custom Workspace's root grants Workspace Administrator access; on a subfolder it grants Folder Admin access. Can be blank or `admin`, `full`, `read`, `write`, `list`, `read+write`, `list+write`, or `history`.
  //   group_id - int64 - Group ID to associate this user with.
  //   group_ids - string - A list of group ids to associate this user with.  Comma delimited.
  //   imported_password_hash - string - Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash methods are MD5, SHA1, and SHA256.
  //   password - string - User password.
  //   password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `password`.
  //   announcements_read - boolean - Signifies that the user has read all the announcements in the UI.
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned directly to this user, if any.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   attachments_permission - boolean - DEPRECATED: If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead.
  //   authenticate_until - string - Scheduled Date/Time at which user will be deactivated
  //   authentication_method - string - How is this user authenticated?
  //   billing_permission - boolean - Allow this user to perform operations on the account, payments, and invoices?
  //   bypass_user_lifecycle_rules - boolean - Exempt this user from user lifecycle rules?
  //   bypass_site_allowed_ips - boolean - Allow this user to skip site-wide IP blacklists?
  //   dav_permission - boolean - Can the user connect with WebDAV?
  //   desktop_configuration_profile_id - int64 - Desktop Configuration Profile ID assigned directly to this user, if any.
  //   default_workspace_id - int64 - Workspace ID the user should land in by default when more than one Workspace is available.
  //   disabled - boolean - Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
  //   filesystem_layout - string - File system layout
  //   ftp_permission - boolean - Can the user access with FTP/FTPS?
  //   header_text - string - Text to display to the user in the header of the UI
  //   integration_centric_profile_id - int64 - Integration Centric Profile ID assigned directly to this user, if any.
  //   language - string - Preferred language
  //   notification_daily_send_time - int64 - Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  //   name - string - User's full name
  //   company - string - User's company
  //   notes - string - Any internal notes on the user
  //   office_integration_enabled - boolean - Enable integration with Office for the web?
  //   partner_admin - boolean - Is this user a Partner administrator?
  //   partner_id - int64 - Partner ID if this user belongs to a Partner
  //   password_validity_days - int64 - Number of days to allow user to use the same password
  //   primary_group_id - int64 - Primary group ID for Group Admin scoping
  //   readonly_site_admin - boolean - Is the user an allowed to view all (non-billing) site configuration for this site?
  //   receive_admin_alerts - boolean - Deprecated. Use notify_on_all_site_warnings and granular failure notification preferences instead.
  //   notify_on_all_site_warnings - boolean - Should the user receive site warnings via email?
  //   notify_on_all_sso_failures - boolean - Should the user receive sso/scim/ldap configuration/sync failures via email?
  //   notify_on_all_user_security_events - boolean - Should the user receive user security events via email?
  //   notify_on_all_pending_work_failures - boolean - Should the user receive pending work failures via email?
  //   notify_on_all_siem_http_destination_failures - boolean - Should the user receive siem failures via email?
  //   notify_on_all_sync_failures - boolean - Should the user receive sync failures via email?
  //   notify_on_all_automation_failures - boolean - Should the user receive automation failures via email?
  //   notify_on_all_expectation_failures - boolean - Should the user receive expectation failures and misses via email?
  //   require_login_by - string - Require user to login by specified date otherwise it will be disabled.
  //   require_password_change - boolean - Is a password change required upon next user login?
  //   responsible_group_id - int64 - ID of the internal Group responsible for this Partner User, overriding the Partner default.
  //   responsible_user_id - int64 - ID of the internal User responsible for this Partner User, overriding the Partner default.
  //   restapi_permission - boolean - Can this user access the Web app, Desktop app, SDKs, or REST API?  (All of these tools use the API internally, so this is one unified permission set.)
  //   s3_compatible_endpoint_permission - boolean - Can the user access the S3-compatible endpoint? Defaults to true.
  //   self_managed - boolean - Does this user manage it's own credentials or is it a shared/bot user?
  //   sftp_permission - boolean - Can the user access with SFTP?
  //   site_admin - boolean - Is the user an administrator for this site?
  //   skip_welcome_screen - boolean - Skip Welcome page in the UI?
  //   ssl_required - string - SSL required setting
  //   sso_strategy_id - int64 - SSO (Single Sign On) strategy ID for the user, if applicable.
  //   subscribe_to_newsletter - boolean - Is the user subscribed to the newsletter?
  //   require_2fa - string - 2FA required setting. `use_system_setting` uses the site-wide setting, including SSO exemptions. `always_require` and `never_require` override the site-wide setting when user-level overrides are allowed.
  //   tags - string - Comma-separated list of Tags for this user. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  //   time_zone - string - User time zone
  //   user_root - string - If filesystem layout is user_root, this path is the root path the user is fixed to for all interfaces. If the filesystem layout is site_root or partner_root, this acts as a root folder only for FTP and SFTP (SFTP applicability also requires a site-wide setting to be set). For partner_root layout, this path is relative to the Partner root folder for all callers and blank opts out of an additional protocol root. In this situation, this path is not applied to the API, Desktop, or Web interface.
  //   user_home - string - Home folder for FTP/SFTP. For users with the partner_root filesystem layout, this path is relative to the Partner root folder. In all other cases, it is an absolute path. Only applies to FTP and SFTP, and not any other interface.
  //   workspace_admin - boolean - Whether the user is an administrator of their own Custom Workspace. Does not reflect administration granted through Permissions.
  //   username (required) - string - User's username
  //   workspace_id - int64 - ID of the Workspace the user belongs to. 0 is the Default Workspace.
  static create = async (params = {}, options = {}) => {
    if (!params.username) {
      throw new errors.MissingParameterError('Parameter missing: username')
    }

    if (isArray(params.avatar_delete) || isObject(params.avatar_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: avatar_delete must be of type Boolean, received ${getType(params.avatar_delete)}`)
    }

    if (params.change_password !== undefined && params.change_password !== null && !isString(params.change_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password must be of type String, received ${getType(params.change_password)}`)
    }

    if (params.change_password_confirmation !== undefined && params.change_password_confirmation !== null && !isString(params.change_password_confirmation)) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password_confirmation must be of type String, received ${getType(params.change_password_confirmation)}`)
    }

    if (params.email !== undefined && params.email !== null && !isString(params.email)) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params.email)}`)
    }

    if (params.grant_permission !== undefined && params.grant_permission !== null && !isString(params.grant_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: grant_permission must be of type String, received ${getType(params.grant_permission)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
    }

    if (params.imported_password_hash !== undefined && params.imported_password_hash !== null && !isString(params.imported_password_hash)) {
      throw new errors.InvalidParameterError(`Bad parameter: imported_password_hash must be of type String, received ${getType(params.imported_password_hash)}`)
    }

    if (params.password !== undefined && params.password !== null && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (params.password_confirmation !== undefined && params.password_confirmation !== null && !isString(params.password_confirmation)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_confirmation must be of type String, received ${getType(params.password_confirmation)}`)
    }

    if (isArray(params.announcements_read) || isObject(params.announcements_read)) {
      throw new errors.InvalidParameterError(`Bad parameter: announcements_read must be of type Boolean, received ${getType(params.announcements_read)}`)
    }

    if (params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !isInt(params.ai_assistant_personality_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ai_assistant_personality_id must be of type Int, received ${getType(params.ai_assistant_personality_id)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (isArray(params.attachments_permission) || isObject(params.attachments_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: attachments_permission must be of type Boolean, received ${getType(params.attachments_permission)}`)
    }

    if (params.authenticate_until !== undefined && params.authenticate_until !== null && !isString(params.authenticate_until)) {
      throw new errors.InvalidParameterError(`Bad parameter: authenticate_until must be of type String, received ${getType(params.authenticate_until)}`)
    }

    if (params.authentication_method !== undefined && params.authentication_method !== null && !isString(params.authentication_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params.authentication_method)}`)
    }

    if (isArray(params.billing_permission) || isObject(params.billing_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: billing_permission must be of type Boolean, received ${getType(params.billing_permission)}`)
    }

    if (isArray(params.bypass_user_lifecycle_rules) || isObject(params.bypass_user_lifecycle_rules)) {
      throw new errors.InvalidParameterError(`Bad parameter: bypass_user_lifecycle_rules must be of type Boolean, received ${getType(params.bypass_user_lifecycle_rules)}`)
    }

    if (isArray(params.bypass_site_allowed_ips) || isObject(params.bypass_site_allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: bypass_site_allowed_ips must be of type Boolean, received ${getType(params.bypass_site_allowed_ips)}`)
    }

    if (isArray(params.dav_permission) || isObject(params.dav_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: dav_permission must be of type Boolean, received ${getType(params.dav_permission)}`)
    }

    if (params.desktop_configuration_profile_id !== undefined && params.desktop_configuration_profile_id !== null && !isInt(params.desktop_configuration_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_configuration_profile_id must be of type Int, received ${getType(params.desktop_configuration_profile_id)}`)
    }

    if (params.default_workspace_id !== undefined && params.default_workspace_id !== null && !isInt(params.default_workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_workspace_id must be of type Int, received ${getType(params.default_workspace_id)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.filesystem_layout !== undefined && params.filesystem_layout !== null && !isString(params.filesystem_layout)) {
      throw new errors.InvalidParameterError(`Bad parameter: filesystem_layout must be of type String, received ${getType(params.filesystem_layout)}`)
    }

    if (isArray(params.ftp_permission) || isObject(params.ftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: ftp_permission must be of type Boolean, received ${getType(params.ftp_permission)}`)
    }

    if (params.header_text !== undefined && params.header_text !== null && !isString(params.header_text)) {
      throw new errors.InvalidParameterError(`Bad parameter: header_text must be of type String, received ${getType(params.header_text)}`)
    }

    if (params.integration_centric_profile_id !== undefined && params.integration_centric_profile_id !== null && !isInt(params.integration_centric_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: integration_centric_profile_id must be of type Int, received ${getType(params.integration_centric_profile_id)}`)
    }

    if (params.language !== undefined && params.language !== null && !isString(params.language)) {
      throw new errors.InvalidParameterError(`Bad parameter: language must be of type String, received ${getType(params.language)}`)
    }

    if (params.notification_daily_send_time !== undefined && params.notification_daily_send_time !== null && !isInt(params.notification_daily_send_time)) {
      throw new errors.InvalidParameterError(`Bad parameter: notification_daily_send_time must be of type Int, received ${getType(params.notification_daily_send_time)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.company !== undefined && params.company !== null && !isString(params.company)) {
      throw new errors.InvalidParameterError(`Bad parameter: company must be of type String, received ${getType(params.company)}`)
    }

    if (params.notes !== undefined && params.notes !== null && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (isArray(params.office_integration_enabled) || isObject(params.office_integration_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: office_integration_enabled must be of type Boolean, received ${getType(params.office_integration_enabled)}`)
    }

    if (isArray(params.partner_admin) || isObject(params.partner_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_admin must be of type Boolean, received ${getType(params.partner_admin)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.password_validity_days !== undefined && params.password_validity_days !== null && !isInt(params.password_validity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: password_validity_days must be of type Int, received ${getType(params.password_validity_days)}`)
    }

    if (params.primary_group_id !== undefined && params.primary_group_id !== null && !isInt(params.primary_group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: primary_group_id must be of type Int, received ${getType(params.primary_group_id)}`)
    }

    if (isArray(params.readonly_site_admin) || isObject(params.readonly_site_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: readonly_site_admin must be of type Boolean, received ${getType(params.readonly_site_admin)}`)
    }

    if (isArray(params.receive_admin_alerts) || isObject(params.receive_admin_alerts)) {
      throw new errors.InvalidParameterError(`Bad parameter: receive_admin_alerts must be of type Boolean, received ${getType(params.receive_admin_alerts)}`)
    }

    if (isArray(params.notify_on_all_site_warnings) || isObject(params.notify_on_all_site_warnings)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_site_warnings must be of type Boolean, received ${getType(params.notify_on_all_site_warnings)}`)
    }

    if (isArray(params.notify_on_all_sso_failures) || isObject(params.notify_on_all_sso_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_sso_failures must be of type Boolean, received ${getType(params.notify_on_all_sso_failures)}`)
    }

    if (isArray(params.notify_on_all_user_security_events) || isObject(params.notify_on_all_user_security_events)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_user_security_events must be of type Boolean, received ${getType(params.notify_on_all_user_security_events)}`)
    }

    if (isArray(params.notify_on_all_pending_work_failures) || isObject(params.notify_on_all_pending_work_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_pending_work_failures must be of type Boolean, received ${getType(params.notify_on_all_pending_work_failures)}`)
    }

    if (isArray(params.notify_on_all_siem_http_destination_failures) || isObject(params.notify_on_all_siem_http_destination_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_siem_http_destination_failures must be of type Boolean, received ${getType(params.notify_on_all_siem_http_destination_failures)}`)
    }

    if (isArray(params.notify_on_all_sync_failures) || isObject(params.notify_on_all_sync_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_sync_failures must be of type Boolean, received ${getType(params.notify_on_all_sync_failures)}`)
    }

    if (isArray(params.notify_on_all_automation_failures) || isObject(params.notify_on_all_automation_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_automation_failures must be of type Boolean, received ${getType(params.notify_on_all_automation_failures)}`)
    }

    if (isArray(params.notify_on_all_expectation_failures) || isObject(params.notify_on_all_expectation_failures)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_all_expectation_failures must be of type Boolean, received ${getType(params.notify_on_all_expectation_failures)}`)
    }

    if (params.require_login_by !== undefined && params.require_login_by !== null && !isString(params.require_login_by)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_login_by must be of type String, received ${getType(params.require_login_by)}`)
    }

    if (isArray(params.require_password_change) || isObject(params.require_password_change)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_password_change must be of type Boolean, received ${getType(params.require_password_change)}`)
    }

    if (params.responsible_group_id !== undefined && params.responsible_group_id !== null && !isInt(params.responsible_group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_group_id must be of type Int, received ${getType(params.responsible_group_id)}`)
    }

    if (params.responsible_user_id !== undefined && params.responsible_user_id !== null && !isInt(params.responsible_user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: responsible_user_id must be of type Int, received ${getType(params.responsible_user_id)}`)
    }

    if (isArray(params.restapi_permission) || isObject(params.restapi_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: restapi_permission must be of type Boolean, received ${getType(params.restapi_permission)}`)
    }

    if (isArray(params.s3_compatible_endpoint_permission) || isObject(params.s3_compatible_endpoint_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint_permission must be of type Boolean, received ${getType(params.s3_compatible_endpoint_permission)}`)
    }

    if (isArray(params.self_managed) || isObject(params.self_managed)) {
      throw new errors.InvalidParameterError(`Bad parameter: self_managed must be of type Boolean, received ${getType(params.self_managed)}`)
    }

    if (isArray(params.sftp_permission) || isObject(params.sftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_permission must be of type Boolean, received ${getType(params.sftp_permission)}`)
    }

    if (isArray(params.site_admin) || isObject(params.site_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_admin must be of type Boolean, received ${getType(params.site_admin)}`)
    }

    if (isArray(params.skip_welcome_screen) || isObject(params.skip_welcome_screen)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_welcome_screen must be of type Boolean, received ${getType(params.skip_welcome_screen)}`)
    }

    if (params.ssl_required !== undefined && params.ssl_required !== null && !isString(params.ssl_required)) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_required must be of type String, received ${getType(params.ssl_required)}`)
    }

    if (params.sso_strategy_id !== undefined && params.sso_strategy_id !== null && !isInt(params.sso_strategy_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: sso_strategy_id must be of type Int, received ${getType(params.sso_strategy_id)}`)
    }

    if (isArray(params.subscribe_to_newsletter) || isObject(params.subscribe_to_newsletter)) {
      throw new errors.InvalidParameterError(`Bad parameter: subscribe_to_newsletter must be of type Boolean, received ${getType(params.subscribe_to_newsletter)}`)
    }

    if (params.require_2fa !== undefined && params.require_2fa !== null && !isString(params.require_2fa)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa must be of type String, received ${getType(params.require_2fa)}`)
    }

    if (params.tags !== undefined && params.tags !== null && !isString(params.tags)) {
      throw new errors.InvalidParameterError(`Bad parameter: tags must be of type String, received ${getType(params.tags)}`)
    }

    if (params.time_zone !== undefined && params.time_zone !== null && !isString(params.time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: time_zone must be of type String, received ${getType(params.time_zone)}`)
    }

    if (params.user_root !== undefined && params.user_root !== null && !isString(params.user_root)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_root must be of type String, received ${getType(params.user_root)}`)
    }

    if (params.user_home !== undefined && params.user_home !== null && !isString(params.user_home)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_home must be of type String, received ${getType(params.user_home)}`)
    }

    if (isArray(params.workspace_admin) || isObject(params.workspace_admin)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_admin must be of type Boolean, received ${getType(params.workspace_admin)}`)
    }

    if (params.username !== undefined && params.username !== null && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/users', 'POST', params, options)

    return new User(response?.data, retainedOptions(options))
  }
}

export default User

module.exports = User
module.exports.default = User
