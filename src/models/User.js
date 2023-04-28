import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class User
 */
class User {
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
  // int64 # User ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # User's username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // array # List of group IDs of which this user is an administrator
  getAdminGroupIds = () => this.attributes.admin_group_ids

  setAdminGroupIds = value => {
    this.attributes.admin_group_ids = value
  }

  // string # A list of allowed IPs if applicable.  Newline delimited
  getAllowedIps = () => this.attributes.allowed_ips

  setAllowedIps = value => {
    this.attributes.allowed_ips = value
  }

  // boolean # DEPRECATED: Can the user create Bundles (aka Share Links)? Use the bundle permission instead.
  getAttachmentsPermission = () => this.attributes.attachments_permission

  setAttachmentsPermission = value => {
    this.attributes.attachments_permission = value
  }

  // int64 # Number of api keys associated with this user
  getApiKeysCount = () => this.attributes.api_keys_count

  setApiKeysCount = value => {
    this.attributes.api_keys_count = value
  }

  // date-time # Scheduled Date/Time at which user will be deactivated
  getAuthenticateUntil = () => this.attributes.authenticate_until

  setAuthenticateUntil = value => {
    this.attributes.authenticate_until = value
  }

  // string # How is this user authenticated?
  getAuthenticationMethod = () => this.attributes.authentication_method

  setAuthenticationMethod = value => {
    this.attributes.authentication_method = value
  }

  // string # URL holding the user's avatar
  getAvatarUrl = () => this.attributes.avatar_url

  setAvatarUrl = value => {
    this.attributes.avatar_url = value
  }

  // boolean # Allow this user to perform operations on the account, payments, and invoices?
  getBillingPermission = () => this.attributes.billing_permission

  setBillingPermission = value => {
    this.attributes.billing_permission = value
  }

  // boolean # Allow this user to skip site-wide IP blacklists?
  getBypassSiteAllowedIps = () => this.attributes.bypass_site_allowed_ips

  setBypassSiteAllowedIps = value => {
    this.attributes.bypass_site_allowed_ips = value
  }

  // boolean # Exempt this user from being disabled based on inactivity?
  getBypassInactiveDisable = () => this.attributes.bypass_inactive_disable

  setBypassInactiveDisable = value => {
    this.attributes.bypass_inactive_disable = value
  }

  // date-time # When this user was created
  getCreatedAt = () => this.attributes.created_at

  // boolean # Can the user connect with WebDAV?
  getDavPermission = () => this.attributes.dav_permission

  setDavPermission = value => {
    this.attributes.dav_permission = value
  }

  // boolean # Is user disabled? Disabled users cannot log in, and do not count for billing purposes.  Users can be automatically disabled after an inactivity period via a Site setting.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // email # User email address
  getEmail = () => this.attributes.email

  setEmail = value => {
    this.attributes.email = value
  }

  // date-time # User's first login time
  getFirstLoginAt = () => this.attributes.first_login_at

  setFirstLoginAt = value => {
    this.attributes.first_login_at = value
  }

  // boolean # Can the user access with FTP/FTPS?
  getFtpPermission = () => this.attributes.ftp_permission

  setFtpPermission = value => {
    this.attributes.ftp_permission = value
  }

  // string # Comma-separated list of group IDs of which this user is a member
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
  }

  // string # Text to display to the user in the header of the UI
  getHeaderText = () => this.attributes.header_text

  setHeaderText = value => {
    this.attributes.header_text = value
  }

  // string # Preferred language
  getLanguage = () => this.attributes.language

  setLanguage = value => {
    this.attributes.language = value
  }

  // date-time # User's most recent login time via any protocol
  getLastLoginAt = () => this.attributes.last_login_at

  setLastLoginAt = value => {
    this.attributes.last_login_at = value
  }

  // date-time # User's most recent login time via web
  getLastWebLoginAt = () => this.attributes.last_web_login_at

  setLastWebLoginAt = value => {
    this.attributes.last_web_login_at = value
  }

  // date-time # User's most recent login time via FTP
  getLastFtpLoginAt = () => this.attributes.last_ftp_login_at

  setLastFtpLoginAt = value => {
    this.attributes.last_ftp_login_at = value
  }

  // date-time # User's most recent login time via SFTP
  getLastSftpLoginAt = () => this.attributes.last_sftp_login_at

  setLastSftpLoginAt = value => {
    this.attributes.last_sftp_login_at = value
  }

  // date-time # User's most recent login time via WebDAV
  getLastDavLoginAt = () => this.attributes.last_dav_login_at

  setLastDavLoginAt = value => {
    this.attributes.last_dav_login_at = value
  }

  // date-time # User's most recent login time via Desktop app
  getLastDesktopLoginAt = () => this.attributes.last_desktop_login_at

  setLastDesktopLoginAt = value => {
    this.attributes.last_desktop_login_at = value
  }

  // date-time # User's most recent login time via Rest API
  getLastRestapiLoginAt = () => this.attributes.last_restapi_login_at

  setLastRestapiLoginAt = value => {
    this.attributes.last_restapi_login_at = value
  }

  // date-time # User's most recent API use time
  getLastApiUseAt = () => this.attributes.last_api_use_at

  setLastApiUseAt = value => {
    this.attributes.last_api_use_at = value
  }

  // date-time # User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or creation
  getLastActiveAt = () => this.attributes.last_active_at

  setLastActiveAt = value => {
    this.attributes.last_active_at = value
  }

  // string # The most recent protocol and cipher used
  getLastProtocolCipher = () => this.attributes.last_protocol_cipher

  setLastProtocolCipher = value => {
    this.attributes.last_protocol_cipher = value
  }

  // date-time # Time in the future that the user will no longer be locked out if applicable
  getLockoutExpires = () => this.attributes.lockout_expires

  setLockoutExpires = value => {
    this.attributes.lockout_expires = value
  }

  // string # User's full name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # User's company
  getCompany = () => this.attributes.company

  setCompany = value => {
    this.attributes.company = value
  }

  // string # Any internal notes on the user
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
  }

  // int64 # Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  getNotificationDailySendTime = () => this.attributes.notification_daily_send_time

  setNotificationDailySendTime = value => {
    this.attributes.notification_daily_send_time = value
  }

  // boolean # Enable integration with Office for the web?
  getOfficeIntegrationEnabled = () => this.attributes.office_integration_enabled

  setOfficeIntegrationEnabled = value => {
    this.attributes.office_integration_enabled = value
  }

  // date-time # Last time the user's password was set
  getPasswordSetAt = () => this.attributes.password_set_at

  setPasswordSetAt = value => {
    this.attributes.password_set_at = value
  }

  // int64 # Number of days to allow user to use the same password
  getPasswordValidityDays = () => this.attributes.password_validity_days

  setPasswordValidityDays = value => {
    this.attributes.password_validity_days = value
  }

  // int64 # Number of public keys associated with this user
  getPublicKeysCount = () => this.attributes.public_keys_count

  setPublicKeysCount = value => {
    this.attributes.public_keys_count = value
  }

  // boolean # Should the user receive admin alerts such a certificate expiration notifications and overages?
  getReceiveAdminAlerts = () => this.attributes.receive_admin_alerts

  setReceiveAdminAlerts = value => {
    this.attributes.receive_admin_alerts = value
  }

  // string # 2FA required setting
  getRequire2fa = () => this.attributes.require_2fa

  setRequire2fa = value => {
    this.attributes.require_2fa = value
  }

  // boolean # Is 2fa active for the user?
  getActive2fa = () => this.attributes.active_2fa

  setActive2fa = value => {
    this.attributes.active_2fa = value
  }

  // boolean # Is a password change required upon next user login?
  getRequirePasswordChange = () => this.attributes.require_password_change

  setRequirePasswordChange = value => {
    this.attributes.require_password_change = value
  }

  // boolean # Is user's password expired?
  getPasswordExpired = () => this.attributes.password_expired

  setPasswordExpired = value => {
    this.attributes.password_expired = value
  }

  // boolean # Can this user access the REST API?
  getRestapiPermission = () => this.attributes.restapi_permission

  setRestapiPermission = value => {
    this.attributes.restapi_permission = value
  }

  // boolean # Does this user manage it's own credentials or is it a shared/bot user?
  getSelfManaged = () => this.attributes.self_managed

  setSelfManaged = value => {
    this.attributes.self_managed = value
  }

  // boolean # Can the user access with SFTP?
  getSftpPermission = () => this.attributes.sftp_permission

  setSftpPermission = value => {
    this.attributes.sftp_permission = value
  }

  // boolean # Is the user an administrator for this site?
  getSiteAdmin = () => this.attributes.site_admin

  setSiteAdmin = value => {
    this.attributes.site_admin = value
  }

  // boolean # Skip Welcome page in the UI?
  getSkipWelcomeScreen = () => this.attributes.skip_welcome_screen

  setSkipWelcomeScreen = value => {
    this.attributes.skip_welcome_screen = value
  }

  // string # SSL required setting
  getSslRequired = () => this.attributes.ssl_required

  setSslRequired = value => {
    this.attributes.ssl_required = value
  }

  // int64 # SSO (Single Sign On) strategy ID for the user, if applicable.
  getSsoStrategyId = () => this.attributes.sso_strategy_id

  setSsoStrategyId = value => {
    this.attributes.sso_strategy_id = value
  }

  // boolean # Is the user subscribed to the newsletter?
  getSubscribeToNewsletter = () => this.attributes.subscribe_to_newsletter

  setSubscribeToNewsletter = value => {
    this.attributes.subscribe_to_newsletter = value
  }

  // boolean # Is this user managed by a SsoStrategy?
  getExternallyManaged = () => this.attributes.externally_managed

  setExternallyManaged = value => {
    this.attributes.externally_managed = value
  }

  // string # User time zone
  getTimeZone = () => this.attributes.time_zone

  setTimeZone = value => {
    this.attributes.time_zone = value
  }

  // string # Type(s) of 2FA methods in use.  Will be either `sms`, `totp`, `u2f`, `yubi`, or multiple values sorted alphabetically and joined by an underscore.
  getTypeOf2fa = () => this.attributes.type_of_2fa

  setTypeOf2fa = value => {
    this.attributes.type_of_2fa = value
  }

  // string # Root folder for FTP (and optionally SFTP if the appropriate site-wide setting is set.)  Note that this is not used for API, Desktop, or Web interface.
  getUserRoot = () => this.attributes.user_root

  setUserRoot = value => {
    this.attributes.user_root = value
  }

  // int64 # Number of days remaining until password expires
  getDaysRemainingUntilPasswordExpire = () => this.attributes.days_remaining_until_password_expire

  setDaysRemainingUntilPasswordExpire = value => {
    this.attributes.days_remaining_until_password_expire = value
  }

  // date-time # Password expiration datetime
  getPasswordExpireAt = () => this.attributes.password_expire_at

  setPasswordExpireAt = value => {
    this.attributes.password_expire_at = value
  }

  // file # An image file for your user avatar.
  getAvatarFile = () => this.attributes.avatar_file

  setAvatarFile = value => {
    this.attributes.avatar_file = value
  }

  // boolean # If true, the avatar will be deleted.
  getAvatarDelete = () => this.attributes.avatar_delete

  setAvatarDelete = value => {
    this.attributes.avatar_delete = value
  }

  // string # Used for changing a password on an existing user.
  getChangePassword = () => this.attributes.change_password

  setChangePassword = value => {
    this.attributes.change_password = value
  }

  // string # Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  getChangePasswordConfirmation = () => this.attributes.change_password_confirmation

  setChangePasswordConfirmation = value => {
    this.attributes.change_password_confirmation = value
  }

  // string # Permission to grant on the user root.  Can be blank or `full`, `read`, `write`, `list`, `read+write`, or `list+write`
  getGrantPermission = () => this.attributes.grant_permission

  setGrantPermission = value => {
    this.attributes.grant_permission = value
  }

  // int64 # Group ID to associate this user with.
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
  }

  // string # Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash menthods are MD5, SHA1, and SHA256.
  getImportedPasswordHash = () => this.attributes.imported_password_hash

  setImportedPasswordHash = value => {
    this.attributes.imported_password_hash = value
  }

  // string # User password.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
  }

  // string # Optional, but if provided, we will ensure that it matches the value sent in `password`.
  getPasswordConfirmation = () => this.attributes.password_confirmation

  setPasswordConfirmation = value => {
    this.attributes.password_confirmation = value
  }

  // boolean # Signifies that the user has read all the announcements in the UI.
  getAnnouncementsRead = () => this.attributes.announcements_read

  setAnnouncementsRead = value => {
    this.attributes.announcements_read = value
  }


  // Unlock user who has been locked out due to failed logins
  unlock = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params['id'])}/unlock`, 'POST', params, this.options)

    return response?.data
  }

  // Resend user welcome email
  resendWelcomeEmail = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params['id'])}/resend_welcome_email`, 'POST', params, this.options)

    return response?.data
  }

  // Trigger 2FA Reset process for user who has lost access to their existing 2FA methods
  user2faReset = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params['id'])}/2fa/reset`, 'POST', params, this.options)

    return response?.data
  }

  // Parameters:
  //   avatar_file - file - An image file for your user avatar.
  //   avatar_delete - boolean - If true, the avatar will be deleted.
  //   change_password - string - Used for changing a password on an existing user.
  //   change_password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  //   email - string - User's email.
  //   grant_permission - string - Permission to grant on the user root.  Can be blank or `full`, `read`, `write`, `list`, `read+write`, or `list+write`
  //   group_id - int64 - Group ID to associate this user with.
  //   group_ids - string - A list of group ids to associate this user with.  Comma delimited.
  //   imported_password_hash - string - Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash menthods are MD5, SHA1, and SHA256.
  //   password - string - User password.
  //   password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `password`.
  //   announcements_read - boolean - Signifies that the user has read all the announcements in the UI.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   attachments_permission - boolean - DEPRECATED: Can the user create Bundles (aka Share Links)? Use the bundle permission instead.
  //   authenticate_until - string - Scheduled Date/Time at which user will be deactivated
  //   authentication_method - string - How is this user authenticated?
  //   billing_permission - boolean - Allow this user to perform operations on the account, payments, and invoices?
  //   bypass_inactive_disable - boolean - Exempt this user from being disabled based on inactivity?
  //   bypass_site_allowed_ips - boolean - Allow this user to skip site-wide IP blacklists?
  //   dav_permission - boolean - Can the user connect with WebDAV?
  //   disabled - boolean - Is user disabled? Disabled users cannot log in, and do not count for billing purposes.  Users can be automatically disabled after an inactivity period via a Site setting.
  //   ftp_permission - boolean - Can the user access with FTP/FTPS?
  //   header_text - string - Text to display to the user in the header of the UI
  //   language - string - Preferred language
  //   notification_daily_send_time - int64 - Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  //   name - string - User's full name
  //   company - string - User's company
  //   notes - string - Any internal notes on the user
  //   office_integration_enabled - boolean - Enable integration with Office for the web?
  //   password_validity_days - int64 - Number of days to allow user to use the same password
  //   receive_admin_alerts - boolean - Should the user receive admin alerts such a certificate expiration notifications and overages?
  //   require_password_change - boolean - Is a password change required upon next user login?
  //   restapi_permission - boolean - Can this user access the REST API?
  //   self_managed - boolean - Does this user manage it's own credentials or is it a shared/bot user?
  //   sftp_permission - boolean - Can the user access with SFTP?
  //   site_admin - boolean - Is the user an administrator for this site?
  //   skip_welcome_screen - boolean - Skip Welcome page in the UI?
  //   ssl_required - string - SSL required setting
  //   sso_strategy_id - int64 - SSO (Single Sign On) strategy ID for the user, if applicable.
  //   subscribe_to_newsletter - boolean - Is the user subscribed to the newsletter?
  //   require_2fa - string - 2FA required setting
  //   time_zone - string - User time zone
  //   user_root - string - Root folder for FTP (and optionally SFTP if the appropriate site-wide setting is set.)  Note that this is not used for API, Desktop, or Web interface.
  //   username - string - User's username
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['change_password'] && !isString(params['change_password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password must be of type String, received ${getType(change_password)}`)
    }
    if (params['change_password_confirmation'] && !isString(params['change_password_confirmation'])) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password_confirmation must be of type String, received ${getType(change_password_confirmation)}`)
    }
    if (params['email'] && !isString(params['email'])) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(email)}`)
    }
    if (params['grant_permission'] && !isString(params['grant_permission'])) {
      throw new errors.InvalidParameterError(`Bad parameter: grant_permission must be of type String, received ${getType(grant_permission)}`)
    }
    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(group_id)}`)
    }
    if (params['group_ids'] && !isString(params['group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(group_ids)}`)
    }
    if (params['imported_password_hash'] && !isString(params['imported_password_hash'])) {
      throw new errors.InvalidParameterError(`Bad parameter: imported_password_hash must be of type String, received ${getType(imported_password_hash)}`)
    }
    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }
    if (params['password_confirmation'] && !isString(params['password_confirmation'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password_confirmation must be of type String, received ${getType(password_confirmation)}`)
    }
    if (params['allowed_ips'] && !isString(params['allowed_ips'])) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(allowed_ips)}`)
    }
    if (params['authenticate_until'] && !isString(params['authenticate_until'])) {
      throw new errors.InvalidParameterError(`Bad parameter: authenticate_until must be of type String, received ${getType(authenticate_until)}`)
    }
    if (params['authentication_method'] && !isString(params['authentication_method'])) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(authentication_method)}`)
    }
    if (params['header_text'] && !isString(params['header_text'])) {
      throw new errors.InvalidParameterError(`Bad parameter: header_text must be of type String, received ${getType(header_text)}`)
    }
    if (params['language'] && !isString(params['language'])) {
      throw new errors.InvalidParameterError(`Bad parameter: language must be of type String, received ${getType(language)}`)
    }
    if (params['notification_daily_send_time'] && !isInt(params['notification_daily_send_time'])) {
      throw new errors.InvalidParameterError(`Bad parameter: notification_daily_send_time must be of type Int, received ${getType(notification_daily_send_time)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['company'] && !isString(params['company'])) {
      throw new errors.InvalidParameterError(`Bad parameter: company must be of type String, received ${getType(company)}`)
    }
    if (params['notes'] && !isString(params['notes'])) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(notes)}`)
    }
    if (params['password_validity_days'] && !isInt(params['password_validity_days'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password_validity_days must be of type Int, received ${getType(password_validity_days)}`)
    }
    if (params['ssl_required'] && !isString(params['ssl_required'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_required must be of type String, received ${getType(ssl_required)}`)
    }
    if (params['sso_strategy_id'] && !isInt(params['sso_strategy_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: sso_strategy_id must be of type Int, received ${getType(sso_strategy_id)}`)
    }
    if (params['require_2fa'] && !isString(params['require_2fa'])) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa must be of type String, received ${getType(require_2fa)}`)
    }
    if (params['time_zone'] && !isString(params['time_zone'])) {
      throw new errors.InvalidParameterError(`Bad parameter: time_zone must be of type String, received ${getType(time_zone)}`)
    }
    if (params['user_root'] && !isString(params['user_root'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_root must be of type String, received ${getType(user_root)}`)
    }
    if (params['username'] && !isString(params['username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new User(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = User.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[authenticate_until]=desc`). Valid fields are `authenticate_until`, `email`, `last_desktop_login_at`, `last_login_at`, `username`, `company`, `name`, `site_admin`, `receive_admin_alerts`, `password_validity_days`, `ssl_required` or `not_site_admin`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `username`, `email`, `company`, `site_admin`, `password_validity_days`, `ssl_required`, `last_login_at`, `authenticate_until` or `not_site_admin`. Valid field combinations are `[ not_site_admin, username ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `username`, `email` or `company`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
  //   ids - string - comma-separated list of User IDs
  //   q[username] - string - List users matching username.
  //   q[email] - string - List users matching email.
  //   q[notes] - string - List users matching notes field.
  //   q[admin] - string - If `true`, list only admin users.
  //   q[allowed_ips] - string - If set, list only users with overridden allowed IP setting.
  //   q[password_validity_days] - string - If set, list only users with overridden password validity days setting.
  //   q[ssl_required] - string - If set, list only users with overridden SSL required setting.
  //   search - string - Searches for partial matches of name, username, or email.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['ids'] && !isString(params['ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ids must be of type String, received ${getType(params['ids'])}`)
    }

    if (params['search'] && !isString(params['search'])) {
      throw new errors.InvalidParameterError(`Bad parameter: search must be of type String, received ${getType(params['search'])}`)
    }

    const response = await Api.sendRequest(`/users`, 'GET', params, options)

    return response?.data?.map(obj => new User(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    User.list(params, options)

  // Parameters:
  //   id (required) - int64 - User ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/users/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new User(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    User.find(id, params, options)

  // Parameters:
  //   avatar_file - file - An image file for your user avatar.
  //   avatar_delete - boolean - If true, the avatar will be deleted.
  //   change_password - string - Used for changing a password on an existing user.
  //   change_password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  //   email - string - User's email.
  //   grant_permission - string - Permission to grant on the user root.  Can be blank or `full`, `read`, `write`, `list`, `read+write`, or `list+write`
  //   group_id - int64 - Group ID to associate this user with.
  //   group_ids - string - A list of group ids to associate this user with.  Comma delimited.
  //   imported_password_hash - string - Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash menthods are MD5, SHA1, and SHA256.
  //   password - string - User password.
  //   password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `password`.
  //   announcements_read - boolean - Signifies that the user has read all the announcements in the UI.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   attachments_permission - boolean - DEPRECATED: Can the user create Bundles (aka Share Links)? Use the bundle permission instead.
  //   authenticate_until - string - Scheduled Date/Time at which user will be deactivated
  //   authentication_method - string - How is this user authenticated?
  //   billing_permission - boolean - Allow this user to perform operations on the account, payments, and invoices?
  //   bypass_inactive_disable - boolean - Exempt this user from being disabled based on inactivity?
  //   bypass_site_allowed_ips - boolean - Allow this user to skip site-wide IP blacklists?
  //   dav_permission - boolean - Can the user connect with WebDAV?
  //   disabled - boolean - Is user disabled? Disabled users cannot log in, and do not count for billing purposes.  Users can be automatically disabled after an inactivity period via a Site setting.
  //   ftp_permission - boolean - Can the user access with FTP/FTPS?
  //   header_text - string - Text to display to the user in the header of the UI
  //   language - string - Preferred language
  //   notification_daily_send_time - int64 - Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  //   name - string - User's full name
  //   company - string - User's company
  //   notes - string - Any internal notes on the user
  //   office_integration_enabled - boolean - Enable integration with Office for the web?
  //   password_validity_days - int64 - Number of days to allow user to use the same password
  //   receive_admin_alerts - boolean - Should the user receive admin alerts such a certificate expiration notifications and overages?
  //   require_password_change - boolean - Is a password change required upon next user login?
  //   restapi_permission - boolean - Can this user access the REST API?
  //   self_managed - boolean - Does this user manage it's own credentials or is it a shared/bot user?
  //   sftp_permission - boolean - Can the user access with SFTP?
  //   site_admin - boolean - Is the user an administrator for this site?
  //   skip_welcome_screen - boolean - Skip Welcome page in the UI?
  //   ssl_required - string - SSL required setting
  //   sso_strategy_id - int64 - SSO (Single Sign On) strategy ID for the user, if applicable.
  //   subscribe_to_newsletter - boolean - Is the user subscribed to the newsletter?
  //   require_2fa - string - 2FA required setting
  //   time_zone - string - User time zone
  //   user_root - string - Root folder for FTP (and optionally SFTP if the appropriate site-wide setting is set.)  Note that this is not used for API, Desktop, or Web interface.
  //   username - string - User's username
  static create = async (params = {}, options = {}) => {
    if (params['change_password'] && !isString(params['change_password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password must be of type String, received ${getType(params['change_password'])}`)
    }

    if (params['change_password_confirmation'] && !isString(params['change_password_confirmation'])) {
      throw new errors.InvalidParameterError(`Bad parameter: change_password_confirmation must be of type String, received ${getType(params['change_password_confirmation'])}`)
    }

    if (params['email'] && !isString(params['email'])) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params['email'])}`)
    }

    if (params['grant_permission'] && !isString(params['grant_permission'])) {
      throw new errors.InvalidParameterError(`Bad parameter: grant_permission must be of type String, received ${getType(params['grant_permission'])}`)
    }

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params['group_id'])}`)
    }

    if (params['group_ids'] && !isString(params['group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params['group_ids'])}`)
    }

    if (params['imported_password_hash'] && !isString(params['imported_password_hash'])) {
      throw new errors.InvalidParameterError(`Bad parameter: imported_password_hash must be of type String, received ${getType(params['imported_password_hash'])}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params['password'])}`)
    }

    if (params['password_confirmation'] && !isString(params['password_confirmation'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password_confirmation must be of type String, received ${getType(params['password_confirmation'])}`)
    }

    if (params['allowed_ips'] && !isString(params['allowed_ips'])) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params['allowed_ips'])}`)
    }

    if (params['authenticate_until'] && !isString(params['authenticate_until'])) {
      throw new errors.InvalidParameterError(`Bad parameter: authenticate_until must be of type String, received ${getType(params['authenticate_until'])}`)
    }

    if (params['authentication_method'] && !isString(params['authentication_method'])) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params['authentication_method'])}`)
    }

    if (params['header_text'] && !isString(params['header_text'])) {
      throw new errors.InvalidParameterError(`Bad parameter: header_text must be of type String, received ${getType(params['header_text'])}`)
    }

    if (params['language'] && !isString(params['language'])) {
      throw new errors.InvalidParameterError(`Bad parameter: language must be of type String, received ${getType(params['language'])}`)
    }

    if (params['notification_daily_send_time'] && !isInt(params['notification_daily_send_time'])) {
      throw new errors.InvalidParameterError(`Bad parameter: notification_daily_send_time must be of type Int, received ${getType(params['notification_daily_send_time'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['company'] && !isString(params['company'])) {
      throw new errors.InvalidParameterError(`Bad parameter: company must be of type String, received ${getType(params['company'])}`)
    }

    if (params['notes'] && !isString(params['notes'])) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params['notes'])}`)
    }

    if (params['password_validity_days'] && !isInt(params['password_validity_days'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password_validity_days must be of type Int, received ${getType(params['password_validity_days'])}`)
    }

    if (params['ssl_required'] && !isString(params['ssl_required'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_required must be of type String, received ${getType(params['ssl_required'])}`)
    }

    if (params['sso_strategy_id'] && !isInt(params['sso_strategy_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: sso_strategy_id must be of type Int, received ${getType(params['sso_strategy_id'])}`)
    }

    if (params['require_2fa'] && !isString(params['require_2fa'])) {
      throw new errors.InvalidParameterError(`Bad parameter: require_2fa must be of type String, received ${getType(params['require_2fa'])}`)
    }

    if (params['time_zone'] && !isString(params['time_zone'])) {
      throw new errors.InvalidParameterError(`Bad parameter: time_zone must be of type String, received ${getType(params['time_zone'])}`)
    }

    if (params['user_root'] && !isString(params['user_root'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_root must be of type String, received ${getType(params['user_root'])}`)
    }

    if (params['username'] && !isString(params['username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params['username'])}`)
    }

    const response = await Api.sendRequest(`/users`, 'POST', params, options)

    return new User(response?.data, options)
  }
}

export default User
