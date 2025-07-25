"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _User;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class User
 */
var User = /*#__PURE__*/(0, _createClass2.default)(function User() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, User);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # User ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # User's username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // array(int64) # List of group IDs of which this user is an administrator
  (0, _defineProperty2.default)(this, "getAdminGroupIds", function () {
    return _this.attributes.admin_group_ids;
  });
  (0, _defineProperty2.default)(this, "setAdminGroupIds", function (value) {
    _this.attributes.admin_group_ids = value;
  });
  // string # A list of allowed IPs if applicable.  Newline delimited
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  (0, _defineProperty2.default)(this, "setAllowedIps", function (value) {
    _this.attributes.allowed_ips = value;
  });
  // boolean # If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead.
  (0, _defineProperty2.default)(this, "getAttachmentsPermission", function () {
    return _this.attributes.attachments_permission;
  });
  (0, _defineProperty2.default)(this, "setAttachmentsPermission", function (value) {
    _this.attributes.attachments_permission = value;
  });
  // int64 # Number of API keys associated with this user
  (0, _defineProperty2.default)(this, "getApiKeysCount", function () {
    return _this.attributes.api_keys_count;
  });
  (0, _defineProperty2.default)(this, "setApiKeysCount", function (value) {
    _this.attributes.api_keys_count = value;
  });
  // date-time # Scheduled Date/Time at which user will be deactivated
  (0, _defineProperty2.default)(this, "getAuthenticateUntil", function () {
    return _this.attributes.authenticate_until;
  });
  (0, _defineProperty2.default)(this, "setAuthenticateUntil", function (value) {
    _this.attributes.authenticate_until = value;
  });
  // string # How is this user authenticated?
  (0, _defineProperty2.default)(this, "getAuthenticationMethod", function () {
    return _this.attributes.authentication_method;
  });
  (0, _defineProperty2.default)(this, "setAuthenticationMethod", function (value) {
    _this.attributes.authentication_method = value;
  });
  // string # URL holding the user's avatar
  (0, _defineProperty2.default)(this, "getAvatarUrl", function () {
    return _this.attributes.avatar_url;
  });
  (0, _defineProperty2.default)(this, "setAvatarUrl", function (value) {
    _this.attributes.avatar_url = value;
  });
  // boolean # Is this a billable user record?
  (0, _defineProperty2.default)(this, "getBillable", function () {
    return _this.attributes.billable;
  });
  (0, _defineProperty2.default)(this, "setBillable", function (value) {
    _this.attributes.billable = value;
  });
  // boolean # Allow this user to perform operations on the account, payments, and invoices?
  (0, _defineProperty2.default)(this, "getBillingPermission", function () {
    return _this.attributes.billing_permission;
  });
  (0, _defineProperty2.default)(this, "setBillingPermission", function (value) {
    _this.attributes.billing_permission = value;
  });
  // boolean # Allow this user to skip site-wide IP blacklists?
  (0, _defineProperty2.default)(this, "getBypassSiteAllowedIps", function () {
    return _this.attributes.bypass_site_allowed_ips;
  });
  (0, _defineProperty2.default)(this, "setBypassSiteAllowedIps", function (value) {
    _this.attributes.bypass_site_allowed_ips = value;
  });
  // boolean # Exempt this user from user lifecycle rules?
  (0, _defineProperty2.default)(this, "getBypassUserLifecycleRules", function () {
    return _this.attributes.bypass_user_lifecycle_rules;
  });
  (0, _defineProperty2.default)(this, "setBypassUserLifecycleRules", function (value) {
    _this.attributes.bypass_user_lifecycle_rules = value;
  });
  // date-time # When this user was created
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // boolean # Can the user connect with WebDAV?
  (0, _defineProperty2.default)(this, "getDavPermission", function () {
    return _this.attributes.dav_permission;
  });
  (0, _defineProperty2.default)(this, "setDavPermission", function (value) {
    _this.attributes.dav_permission = value;
  });
  // boolean # Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  // boolean # Computed property that returns true if user disabled or expired or inactive.
  (0, _defineProperty2.default)(this, "getDisabledExpiredOrInactive", function () {
    return _this.attributes.disabled_expired_or_inactive;
  });
  (0, _defineProperty2.default)(this, "setDisabledExpiredOrInactive", function (value) {
    _this.attributes.disabled_expired_or_inactive = value;
  });
  // email # User email address
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  (0, _defineProperty2.default)(this, "setEmail", function (value) {
    _this.attributes.email = value;
  });
  // date-time # User's first login time
  (0, _defineProperty2.default)(this, "getFirstLoginAt", function () {
    return _this.attributes.first_login_at;
  });
  (0, _defineProperty2.default)(this, "setFirstLoginAt", function (value) {
    _this.attributes.first_login_at = value;
  });
  // boolean # Can the user access with FTP/FTPS?
  (0, _defineProperty2.default)(this, "getFtpPermission", function () {
    return _this.attributes.ftp_permission;
  });
  (0, _defineProperty2.default)(this, "setFtpPermission", function (value) {
    _this.attributes.ftp_permission = value;
  });
  // string # Comma-separated list of group IDs of which this user is a member
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
  });
  // string # Text to display to the user in the header of the UI
  (0, _defineProperty2.default)(this, "getHeaderText", function () {
    return _this.attributes.header_text;
  });
  (0, _defineProperty2.default)(this, "setHeaderText", function (value) {
    _this.attributes.header_text = value;
  });
  // string # Preferred language
  (0, _defineProperty2.default)(this, "getLanguage", function () {
    return _this.attributes.language;
  });
  (0, _defineProperty2.default)(this, "setLanguage", function (value) {
    _this.attributes.language = value;
  });
  // date-time # User's most recent login time via any protocol
  (0, _defineProperty2.default)(this, "getLastLoginAt", function () {
    return _this.attributes.last_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastLoginAt", function (value) {
    _this.attributes.last_login_at = value;
  });
  // date-time # User's most recent login time via web
  (0, _defineProperty2.default)(this, "getLastWebLoginAt", function () {
    return _this.attributes.last_web_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastWebLoginAt", function (value) {
    _this.attributes.last_web_login_at = value;
  });
  // date-time # User's most recent login time via FTP
  (0, _defineProperty2.default)(this, "getLastFtpLoginAt", function () {
    return _this.attributes.last_ftp_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastFtpLoginAt", function (value) {
    _this.attributes.last_ftp_login_at = value;
  });
  // date-time # User's most recent login time via SFTP
  (0, _defineProperty2.default)(this, "getLastSftpLoginAt", function () {
    return _this.attributes.last_sftp_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastSftpLoginAt", function (value) {
    _this.attributes.last_sftp_login_at = value;
  });
  // date-time # User's most recent login time via WebDAV
  (0, _defineProperty2.default)(this, "getLastDavLoginAt", function () {
    return _this.attributes.last_dav_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastDavLoginAt", function (value) {
    _this.attributes.last_dav_login_at = value;
  });
  // date-time # User's most recent login time via Desktop app
  (0, _defineProperty2.default)(this, "getLastDesktopLoginAt", function () {
    return _this.attributes.last_desktop_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastDesktopLoginAt", function (value) {
    _this.attributes.last_desktop_login_at = value;
  });
  // date-time # User's most recent login time via Rest API
  (0, _defineProperty2.default)(this, "getLastRestapiLoginAt", function () {
    return _this.attributes.last_restapi_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastRestapiLoginAt", function (value) {
    _this.attributes.last_restapi_login_at = value;
  });
  // date-time # User's most recent API use time
  (0, _defineProperty2.default)(this, "getLastApiUseAt", function () {
    return _this.attributes.last_api_use_at;
  });
  (0, _defineProperty2.default)(this, "setLastApiUseAt", function (value) {
    _this.attributes.last_api_use_at = value;
  });
  // date-time # User's most recent activity time, which is the latest of most recent login, most recent API use, enablement, or creation
  (0, _defineProperty2.default)(this, "getLastActiveAt", function () {
    return _this.attributes.last_active_at;
  });
  (0, _defineProperty2.default)(this, "setLastActiveAt", function (value) {
    _this.attributes.last_active_at = value;
  });
  // string # The most recent protocol and cipher used
  (0, _defineProperty2.default)(this, "getLastProtocolCipher", function () {
    return _this.attributes.last_protocol_cipher;
  });
  (0, _defineProperty2.default)(this, "setLastProtocolCipher", function (value) {
    _this.attributes.last_protocol_cipher = value;
  });
  // date-time # Time in the future that the user will no longer be locked out if applicable
  (0, _defineProperty2.default)(this, "getLockoutExpires", function () {
    return _this.attributes.lockout_expires;
  });
  (0, _defineProperty2.default)(this, "setLockoutExpires", function (value) {
    _this.attributes.lockout_expires = value;
  });
  // string # User's full name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # User's company
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  (0, _defineProperty2.default)(this, "setCompany", function (value) {
    _this.attributes.company = value;
  });
  // string # Any internal notes on the user
  (0, _defineProperty2.default)(this, "getNotes", function () {
    return _this.attributes.notes;
  });
  (0, _defineProperty2.default)(this, "setNotes", function (value) {
    _this.attributes.notes = value;
  });
  // int64 # Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  (0, _defineProperty2.default)(this, "getNotificationDailySendTime", function () {
    return _this.attributes.notification_daily_send_time;
  });
  (0, _defineProperty2.default)(this, "setNotificationDailySendTime", function (value) {
    _this.attributes.notification_daily_send_time = value;
  });
  // boolean # Enable integration with Office for the web?
  (0, _defineProperty2.default)(this, "getOfficeIntegrationEnabled", function () {
    return _this.attributes.office_integration_enabled;
  });
  (0, _defineProperty2.default)(this, "setOfficeIntegrationEnabled", function (value) {
    _this.attributes.office_integration_enabled = value;
  });
  // date-time # Last time the user's password was set
  (0, _defineProperty2.default)(this, "getPasswordSetAt", function () {
    return _this.attributes.password_set_at;
  });
  (0, _defineProperty2.default)(this, "setPasswordSetAt", function (value) {
    _this.attributes.password_set_at = value;
  });
  // int64 # Number of days to allow user to use the same password
  (0, _defineProperty2.default)(this, "getPasswordValidityDays", function () {
    return _this.attributes.password_validity_days;
  });
  (0, _defineProperty2.default)(this, "setPasswordValidityDays", function (value) {
    _this.attributes.password_validity_days = value;
  });
  // int64 # Number of public keys associated with this user
  (0, _defineProperty2.default)(this, "getPublicKeysCount", function () {
    return _this.attributes.public_keys_count;
  });
  (0, _defineProperty2.default)(this, "setPublicKeysCount", function (value) {
    _this.attributes.public_keys_count = value;
  });
  // boolean # Should the user receive admin alerts such a certificate expiration notifications and overages?
  (0, _defineProperty2.default)(this, "getReceiveAdminAlerts", function () {
    return _this.attributes.receive_admin_alerts;
  });
  (0, _defineProperty2.default)(this, "setReceiveAdminAlerts", function (value) {
    _this.attributes.receive_admin_alerts = value;
  });
  // string # 2FA required setting
  (0, _defineProperty2.default)(this, "getRequire2fa", function () {
    return _this.attributes.require_2fa;
  });
  (0, _defineProperty2.default)(this, "setRequire2fa", function (value) {
    _this.attributes.require_2fa = value;
  });
  // date-time # Require user to login by specified date otherwise it will be disabled.
  (0, _defineProperty2.default)(this, "getRequireLoginBy", function () {
    return _this.attributes.require_login_by;
  });
  (0, _defineProperty2.default)(this, "setRequireLoginBy", function (value) {
    _this.attributes.require_login_by = value;
  });
  // boolean # Is 2fa active for the user?
  (0, _defineProperty2.default)(this, "getActive2fa", function () {
    return _this.attributes.active_2fa;
  });
  (0, _defineProperty2.default)(this, "setActive2fa", function (value) {
    _this.attributes.active_2fa = value;
  });
  // boolean # Is a password change required upon next user login?
  (0, _defineProperty2.default)(this, "getRequirePasswordChange", function () {
    return _this.attributes.require_password_change;
  });
  (0, _defineProperty2.default)(this, "setRequirePasswordChange", function (value) {
    _this.attributes.require_password_change = value;
  });
  // boolean # Is user's password expired?
  (0, _defineProperty2.default)(this, "getPasswordExpired", function () {
    return _this.attributes.password_expired;
  });
  (0, _defineProperty2.default)(this, "setPasswordExpired", function (value) {
    _this.attributes.password_expired = value;
  });
  // boolean # Is the user an allowed to view all (non-billing) site configuration for this site?
  (0, _defineProperty2.default)(this, "getReadonlySiteAdmin", function () {
    return _this.attributes.readonly_site_admin;
  });
  (0, _defineProperty2.default)(this, "setReadonlySiteAdmin", function (value) {
    _this.attributes.readonly_site_admin = value;
  });
  // boolean # Can this user access the Web app, Desktop app, SDKs, or REST API?  (All of these tools use the API internally, so this is one unified permission set.)
  (0, _defineProperty2.default)(this, "getRestapiPermission", function () {
    return _this.attributes.restapi_permission;
  });
  (0, _defineProperty2.default)(this, "setRestapiPermission", function (value) {
    _this.attributes.restapi_permission = value;
  });
  // boolean # Does this user manage it's own credentials or is it a shared/bot user?
  (0, _defineProperty2.default)(this, "getSelfManaged", function () {
    return _this.attributes.self_managed;
  });
  (0, _defineProperty2.default)(this, "setSelfManaged", function (value) {
    _this.attributes.self_managed = value;
  });
  // boolean # Can the user access with SFTP?
  (0, _defineProperty2.default)(this, "getSftpPermission", function () {
    return _this.attributes.sftp_permission;
  });
  (0, _defineProperty2.default)(this, "setSftpPermission", function (value) {
    _this.attributes.sftp_permission = value;
  });
  // boolean # Is the user an administrator for this site?
  (0, _defineProperty2.default)(this, "getSiteAdmin", function () {
    return _this.attributes.site_admin;
  });
  (0, _defineProperty2.default)(this, "setSiteAdmin", function (value) {
    _this.attributes.site_admin = value;
  });
  // int64 # Site ID
  (0, _defineProperty2.default)(this, "getSiteId", function () {
    return _this.attributes.site_id;
  });
  (0, _defineProperty2.default)(this, "setSiteId", function (value) {
    _this.attributes.site_id = value;
  });
  // boolean # Skip Welcome page in the UI?
  (0, _defineProperty2.default)(this, "getSkipWelcomeScreen", function () {
    return _this.attributes.skip_welcome_screen;
  });
  (0, _defineProperty2.default)(this, "setSkipWelcomeScreen", function (value) {
    _this.attributes.skip_welcome_screen = value;
  });
  // string # SSL required setting
  (0, _defineProperty2.default)(this, "getSslRequired", function () {
    return _this.attributes.ssl_required;
  });
  (0, _defineProperty2.default)(this, "setSslRequired", function (value) {
    _this.attributes.ssl_required = value;
  });
  // int64 # SSO (Single Sign On) strategy ID for the user, if applicable.
  (0, _defineProperty2.default)(this, "getSsoStrategyId", function () {
    return _this.attributes.sso_strategy_id;
  });
  (0, _defineProperty2.default)(this, "setSsoStrategyId", function (value) {
    _this.attributes.sso_strategy_id = value;
  });
  // boolean # Is the user subscribed to the newsletter?
  (0, _defineProperty2.default)(this, "getSubscribeToNewsletter", function () {
    return _this.attributes.subscribe_to_newsletter;
  });
  (0, _defineProperty2.default)(this, "setSubscribeToNewsletter", function (value) {
    _this.attributes.subscribe_to_newsletter = value;
  });
  // boolean # Is this user managed by a SsoStrategy?
  (0, _defineProperty2.default)(this, "getExternallyManaged", function () {
    return _this.attributes.externally_managed;
  });
  (0, _defineProperty2.default)(this, "setExternallyManaged", function (value) {
    _this.attributes.externally_managed = value;
  });
  // string # User time zone
  (0, _defineProperty2.default)(this, "getTimeZone", function () {
    return _this.attributes.time_zone;
  });
  (0, _defineProperty2.default)(this, "setTimeZone", function (value) {
    _this.attributes.time_zone = value;
  });
  // string # Type(s) of 2FA methods in use, for programmatic use.  Will be either `sms`, `totp`, `webauthn`, `yubi`, `email`, or multiple values sorted alphabetically and joined by an underscore.  Does not specify whether user has more than one of a given method.
  (0, _defineProperty2.default)(this, "getTypeOf2fa", function () {
    return _this.attributes.type_of_2fa;
  });
  (0, _defineProperty2.default)(this, "setTypeOf2fa", function (value) {
    _this.attributes.type_of_2fa = value;
  });
  // string # Type(s) of 2FA methods in use, formatted for displaying in the UI.  Unlike `type_of_2fa`, this value will make clear when a user has more than 1 of the same type of method.
  (0, _defineProperty2.default)(this, "getTypeOf2faForDisplay", function () {
    return _this.attributes.type_of_2fa_for_display;
  });
  (0, _defineProperty2.default)(this, "setTypeOf2faForDisplay", function (value) {
    _this.attributes.type_of_2fa_for_display = value;
  });
  // string # Root folder for FTP (and optionally SFTP if the appropriate site-wide setting is set).  Note that this is not used for API, Desktop, or Web interface.
  (0, _defineProperty2.default)(this, "getUserRoot", function () {
    return _this.attributes.user_root;
  });
  (0, _defineProperty2.default)(this, "setUserRoot", function (value) {
    _this.attributes.user_root = value;
  });
  // string # Home folder for FTP/SFTP.  Note that this is not used for API, Desktop, or Web interface.
  (0, _defineProperty2.default)(this, "getUserHome", function () {
    return _this.attributes.user_home;
  });
  (0, _defineProperty2.default)(this, "setUserHome", function (value) {
    _this.attributes.user_home = value;
  });
  // int64 # Number of days remaining until password expires
  (0, _defineProperty2.default)(this, "getDaysRemainingUntilPasswordExpire", function () {
    return _this.attributes.days_remaining_until_password_expire;
  });
  (0, _defineProperty2.default)(this, "setDaysRemainingUntilPasswordExpire", function (value) {
    _this.attributes.days_remaining_until_password_expire = value;
  });
  // date-time # Password expiration datetime
  (0, _defineProperty2.default)(this, "getPasswordExpireAt", function () {
    return _this.attributes.password_expire_at;
  });
  (0, _defineProperty2.default)(this, "setPasswordExpireAt", function (value) {
    _this.attributes.password_expire_at = value;
  });
  // file # An image file for your user avatar.
  (0, _defineProperty2.default)(this, "getAvatarFile", function () {
    return _this.attributes.avatar_file;
  });
  (0, _defineProperty2.default)(this, "setAvatarFile", function (value) {
    _this.attributes.avatar_file = value;
  });
  // boolean # If true, the avatar will be deleted.
  (0, _defineProperty2.default)(this, "getAvatarDelete", function () {
    return _this.attributes.avatar_delete;
  });
  (0, _defineProperty2.default)(this, "setAvatarDelete", function (value) {
    _this.attributes.avatar_delete = value;
  });
  // string # Used for changing a password on an existing user.
  (0, _defineProperty2.default)(this, "getChangePassword", function () {
    return _this.attributes.change_password;
  });
  (0, _defineProperty2.default)(this, "setChangePassword", function (value) {
    _this.attributes.change_password = value;
  });
  // string # Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  (0, _defineProperty2.default)(this, "getChangePasswordConfirmation", function () {
    return _this.attributes.change_password_confirmation;
  });
  (0, _defineProperty2.default)(this, "setChangePasswordConfirmation", function (value) {
    _this.attributes.change_password_confirmation = value;
  });
  // string # Permission to grant on the User Root upon user creation. Can be blank or `full`, `read`, `write`, `list`, `read+write`, or `list+write`
  (0, _defineProperty2.default)(this, "getGrantPermission", function () {
    return _this.attributes.grant_permission;
  });
  (0, _defineProperty2.default)(this, "setGrantPermission", function (value) {
    _this.attributes.grant_permission = value;
  });
  // int64 # Group ID to associate this user with.
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
  });
  // string # Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash methods are MD5, SHA1, and SHA256.
  (0, _defineProperty2.default)(this, "getImportedPasswordHash", function () {
    return _this.attributes.imported_password_hash;
  });
  (0, _defineProperty2.default)(this, "setImportedPasswordHash", function (value) {
    _this.attributes.imported_password_hash = value;
  });
  // string # User password.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  // string # Optional, but if provided, we will ensure that it matches the value sent in `password`.
  (0, _defineProperty2.default)(this, "getPasswordConfirmation", function () {
    return _this.attributes.password_confirmation;
  });
  (0, _defineProperty2.default)(this, "setPasswordConfirmation", function (value) {
    _this.attributes.password_confirmation = value;
  });
  // boolean # Signifies that the user has read all the announcements in the UI.
  (0, _defineProperty2.default)(this, "getAnnouncementsRead", function () {
    return _this.attributes.announcements_read;
  });
  (0, _defineProperty2.default)(this, "setAnnouncementsRead", function (value) {
    _this.attributes.announcements_read = value;
  });
  // Unlock user who has been locked out due to failed logins
  (0, _defineProperty2.default)(this, "unlock", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 4;
            break;
          }
          params.id = _this.id;
          _context.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context.next = 6;
          return _Api.default.sendRequest("/users/".concat(encodeURIComponent(params.id), "/unlock"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Resend user welcome email
  (0, _defineProperty2.default)(this, "resendWelcomeEmail", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context2.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 4;
            break;
          }
          params.id = _this.id;
          _context2.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context2.next = 6;
          return _Api.default.sendRequest("/users/".concat(encodeURIComponent(params.id), "/resend_welcome_email"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  // Trigger 2FA Reset process for user who has lost access to their existing 2FA methods
  (0, _defineProperty2.default)(this, "user2faReset", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          if (_this.attributes.id) {
            _context3.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context3.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context3.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 4;
            break;
          }
          params.id = _this.id;
          _context3.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context3.next = 6;
          return _Api.default.sendRequest("/users/".concat(encodeURIComponent(params.id), "/2fa/reset"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  // Parameters:
  //   avatar_file - file - An image file for your user avatar.
  //   avatar_delete - boolean - If true, the avatar will be deleted.
  //   change_password - string - Used for changing a password on an existing user.
  //   change_password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
  //   email - string - User's email.
  //   grant_permission - string - Permission to grant on the User Root upon user creation. Can be blank or `full`, `read`, `write`, `list`, `read+write`, or `list+write`
  //   group_id - int64 - Group ID to associate this user with.
  //   group_ids - string - A list of group ids to associate this user with.  Comma delimited.
  //   imported_password_hash - string - Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash methods are MD5, SHA1, and SHA256.
  //   password - string - User password.
  //   password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `password`.
  //   announcements_read - boolean - Signifies that the user has read all the announcements in the UI.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   attachments_permission - boolean - DEPRECATED: If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead.
  //   authenticate_until - string - Scheduled Date/Time at which user will be deactivated
  //   authentication_method - string - How is this user authenticated?
  //   billing_permission - boolean - Allow this user to perform operations on the account, payments, and invoices?
  //   bypass_user_lifecycle_rules - boolean - Exempt this user from user lifecycle rules?
  //   bypass_site_allowed_ips - boolean - Allow this user to skip site-wide IP blacklists?
  //   dav_permission - boolean - Can the user connect with WebDAV?
  //   disabled - boolean - Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
  //   ftp_permission - boolean - Can the user access with FTP/FTPS?
  //   header_text - string - Text to display to the user in the header of the UI
  //   language - string - Preferred language
  //   notification_daily_send_time - int64 - Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
  //   name - string - User's full name
  //   company - string - User's company
  //   notes - string - Any internal notes on the user
  //   office_integration_enabled - boolean - Enable integration with Office for the web?
  //   password_validity_days - int64 - Number of days to allow user to use the same password
  //   readonly_site_admin - boolean - Is the user an allowed to view all (non-billing) site configuration for this site?
  //   receive_admin_alerts - boolean - Should the user receive admin alerts such a certificate expiration notifications and overages?
  //   require_login_by - string - Require user to login by specified date otherwise it will be disabled.
  //   require_password_change - boolean - Is a password change required upon next user login?
  //   restapi_permission - boolean - Can this user access the Web app, Desktop app, SDKs, or REST API?  (All of these tools use the API internally, so this is one unified permission set.)
  //   self_managed - boolean - Does this user manage it's own credentials or is it a shared/bot user?
  //   sftp_permission - boolean - Can the user access with SFTP?
  //   site_admin - boolean - Is the user an administrator for this site?
  //   skip_welcome_screen - boolean - Skip Welcome page in the UI?
  //   ssl_required - string - SSL required setting
  //   sso_strategy_id - int64 - SSO (Single Sign On) strategy ID for the user, if applicable.
  //   subscribe_to_newsletter - boolean - Is the user subscribed to the newsletter?
  //   require_2fa - string - 2FA required setting
  //   time_zone - string - User time zone
  //   user_root - string - Root folder for FTP (and optionally SFTP if the appropriate site-wide setting is set).  Note that this is not used for API, Desktop, or Web interface.
  //   user_home - string - Home folder for FTP/SFTP.  Note that this is not used for API, Desktop, or Web interface.
  //   username - string - User's username
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var params,
      response,
      _args4 = arguments;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
          if (_this.attributes.id) {
            _context4.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context4.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context4.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.change_password && !(0, _utils.isString)(params.change_password))) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: change_password must be of type String, received ".concat((0, _utils.getType)(params.change_password)));
        case 4:
          if (!(params.change_password_confirmation && !(0, _utils.isString)(params.change_password_confirmation))) {
            _context4.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: change_password_confirmation must be of type String, received ".concat((0, _utils.getType)(params.change_password_confirmation)));
        case 5:
          if (!(params.email && !(0, _utils.isString)(params.email))) {
            _context4.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(params.email)));
        case 6:
          if (!(params.grant_permission && !(0, _utils.isString)(params.grant_permission))) {
            _context4.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: grant_permission must be of type String, received ".concat((0, _utils.getType)(params.grant_permission)));
        case 7:
          if (!(params.group_id && !(0, _utils.isInt)(params.group_id))) {
            _context4.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params.group_id)));
        case 8:
          if (!(params.group_ids && !(0, _utils.isString)(params.group_ids))) {
            _context4.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
        case 9:
          if (!(params.imported_password_hash && !(0, _utils.isString)(params.imported_password_hash))) {
            _context4.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: imported_password_hash must be of type String, received ".concat((0, _utils.getType)(params.imported_password_hash)));
        case 10:
          if (!(params.password && !(0, _utils.isString)(params.password))) {
            _context4.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
        case 11:
          if (!(params.password_confirmation && !(0, _utils.isString)(params.password_confirmation))) {
            _context4.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password_confirmation must be of type String, received ".concat((0, _utils.getType)(params.password_confirmation)));
        case 12:
          if (!(params.allowed_ips && !(0, _utils.isString)(params.allowed_ips))) {
            _context4.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
        case 13:
          if (!(params.authenticate_until && !(0, _utils.isString)(params.authenticate_until))) {
            _context4.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: authenticate_until must be of type String, received ".concat((0, _utils.getType)(params.authenticate_until)));
        case 14:
          if (!(params.authentication_method && !(0, _utils.isString)(params.authentication_method))) {
            _context4.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: authentication_method must be of type String, received ".concat((0, _utils.getType)(params.authentication_method)));
        case 15:
          if (!(params.header_text && !(0, _utils.isString)(params.header_text))) {
            _context4.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: header_text must be of type String, received ".concat((0, _utils.getType)(params.header_text)));
        case 16:
          if (!(params.language && !(0, _utils.isString)(params.language))) {
            _context4.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(params.language)));
        case 17:
          if (!(params.notification_daily_send_time && !(0, _utils.isInt)(params.notification_daily_send_time))) {
            _context4.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notification_daily_send_time must be of type Int, received ".concat((0, _utils.getType)(params.notification_daily_send_time)));
        case 18:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context4.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 19:
          if (!(params.company && !(0, _utils.isString)(params.company))) {
            _context4.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(params.company)));
        case 20:
          if (!(params.notes && !(0, _utils.isString)(params.notes))) {
            _context4.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(params.notes)));
        case 21:
          if (!(params.password_validity_days && !(0, _utils.isInt)(params.password_validity_days))) {
            _context4.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(params.password_validity_days)));
        case 22:
          if (!(params.require_login_by && !(0, _utils.isString)(params.require_login_by))) {
            _context4.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: require_login_by must be of type String, received ".concat((0, _utils.getType)(params.require_login_by)));
        case 23:
          if (!(params.ssl_required && !(0, _utils.isString)(params.ssl_required))) {
            _context4.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl_required must be of type String, received ".concat((0, _utils.getType)(params.ssl_required)));
        case 24:
          if (!(params.sso_strategy_id && !(0, _utils.isInt)(params.sso_strategy_id))) {
            _context4.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sso_strategy_id must be of type Int, received ".concat((0, _utils.getType)(params.sso_strategy_id)));
        case 25:
          if (!(params.require_2fa && !(0, _utils.isString)(params.require_2fa))) {
            _context4.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: require_2fa must be of type String, received ".concat((0, _utils.getType)(params.require_2fa)));
        case 26:
          if (!(params.time_zone && !(0, _utils.isString)(params.time_zone))) {
            _context4.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: time_zone must be of type String, received ".concat((0, _utils.getType)(params.time_zone)));
        case 27:
          if (!(params.user_root && !(0, _utils.isString)(params.user_root))) {
            _context4.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_root must be of type String, received ".concat((0, _utils.getType)(params.user_root)));
        case 28:
          if (!(params.user_home && !(0, _utils.isString)(params.user_home))) {
            _context4.next = 29;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_home must be of type String, received ".concat((0, _utils.getType)(params.user_home)));
        case 29:
          if (!(params.username && !(0, _utils.isString)(params.username))) {
            _context4.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
        case 30:
          if (params.id) {
            _context4.next = 32;
            break;
          }
          if (!_this.attributes.id) {
            _context4.next = 31;
            break;
          }
          params.id = _this.id;
          _context4.next = 32;
          break;
        case 31:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 32:
          _context4.next = 33;
          return _Api.default.sendRequest("/users/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 33:
          response = _context4.sent;
          return _context4.abrupt("return", new User(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 34:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  // Parameters:
  //   new_owner_id - int64 - Provide a User ID here to transfer ownership of certain resources such as Automations and Share Links (Bundles) to that new user.
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
    var params,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          if (_this.attributes.id) {
            _context5.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context5.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.new_owner_id && !(0, _utils.isInt)(params.new_owner_id))) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: new_owner_id must be of type Int, received ".concat((0, _utils.getType)(params.new_owner_id)));
        case 4:
          if (params.id) {
            _context5.next = 6;
            break;
          }
          if (!_this.attributes.id) {
            _context5.next = 5;
            break;
          }
          params.id = _this.id;
          _context5.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 6:
          _context5.next = 7;
          return _Api.default.sendRequest("/users/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!_this.attributes.id) {
            _context6.next = 2;
            break;
          }
          _context6.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context6.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context6.abrupt("return", true);
        case 2:
          _context6.next = 3;
          return User.create(_this.attributes, _this.options);
        case 3:
          newObject = _context6.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context6.abrupt("return", true);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  Object.entries(attributes).forEach(function (_ref7) {
    var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
      key = _ref8[0],
      value = _ref8[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_User = User;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `authenticate_until`, `email`, `last_desktop_login_at`, `last_login_at`, `name`, `company`, `password_validity_days`, `ssl_required`, `username`, `site_admin` or `disabled`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `username`, `name`, `email`, `company`, `site_admin`, `password_validity_days`, `ssl_required`, `last_login_at`, `authenticate_until`, `not_site_admin` or `disabled`. Valid field combinations are `[ site_admin, username ]`, `[ not_site_admin, username ]` or `[ company, name ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `username`, `name`, `email` or `company`. Valid field combinations are `[ company, name ]`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `password_validity_days`, `last_login_at` or `authenticate_until`.
//   ids - string - comma-separated list of User IDs
//   include_parent_site_users - boolean - Include users from the parent site.
//   search - string - Searches for partial matches of name, username, or email.
(0, _defineProperty2.default)(User, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var _response$data;
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context7.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        if (!(params.ids && !(0, _utils.isString)(params.ids))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ids must be of type String, received ".concat((0, _utils.getType)(params.ids)));
      case 3:
        if (!(params.search && !(0, _utils.isString)(params.search))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: search must be of type String, received ".concat((0, _utils.getType)(params.search)));
      case 4:
        _context7.next = 5;
        return _Api.default.sendRequest('/users', 'GET', params, options);
      case 5:
        response = _context7.sent;
        return _context7.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _User(obj, options);
        })) || []);
      case 6:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
(0, _defineProperty2.default)(User, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _User.list(params, options);
});
// Parameters:
//   id (required) - int64 - User ID.
(0, _defineProperty2.default)(User, "find", /*#__PURE__*/function () {
  var _ref0 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8(id) {
    var params,
      options,
      response,
      _args8 = arguments;
    return _regenerator.default.wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          params = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
          options = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context8.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context8.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context8.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context8.next = 4;
          return _Api.default.sendRequest("/users/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context8.sent;
          return _context8.abrupt("return", new _User(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x) {
    return _ref0.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(User, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _User.find(id, params, options);
});
// Parameters:
//   avatar_file - file - An image file for your user avatar.
//   avatar_delete - boolean - If true, the avatar will be deleted.
//   change_password - string - Used for changing a password on an existing user.
//   change_password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `change_password`.
//   email - string - User's email.
//   grant_permission - string - Permission to grant on the User Root upon user creation. Can be blank or `full`, `read`, `write`, `list`, `read+write`, or `list+write`
//   group_id - int64 - Group ID to associate this user with.
//   group_ids - string - A list of group ids to associate this user with.  Comma delimited.
//   imported_password_hash - string - Pre-calculated hash of the user's password. If supplied, this will be used to authenticate the user on first login. Supported hash methods are MD5, SHA1, and SHA256.
//   password - string - User password.
//   password_confirmation - string - Optional, but if provided, we will ensure that it matches the value sent in `password`.
//   announcements_read - boolean - Signifies that the user has read all the announcements in the UI.
//   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
//   attachments_permission - boolean - DEPRECATED: If `true`, the user can user create Bundles (aka Share Links). Use the bundle permission instead.
//   authenticate_until - string - Scheduled Date/Time at which user will be deactivated
//   authentication_method - string - How is this user authenticated?
//   billing_permission - boolean - Allow this user to perform operations on the account, payments, and invoices?
//   bypass_user_lifecycle_rules - boolean - Exempt this user from user lifecycle rules?
//   bypass_site_allowed_ips - boolean - Allow this user to skip site-wide IP blacklists?
//   dav_permission - boolean - Can the user connect with WebDAV?
//   disabled - boolean - Is user disabled? Disabled users cannot log in, and do not count for billing purposes. Users can be automatically disabled after an inactivity period via a Site setting or schedule to be deactivated after specific date.
//   ftp_permission - boolean - Can the user access with FTP/FTPS?
//   header_text - string - Text to display to the user in the header of the UI
//   language - string - Preferred language
//   notification_daily_send_time - int64 - Hour of the day at which daily notifications should be sent. Can be in range 0 to 23
//   name - string - User's full name
//   company - string - User's company
//   notes - string - Any internal notes on the user
//   office_integration_enabled - boolean - Enable integration with Office for the web?
//   password_validity_days - int64 - Number of days to allow user to use the same password
//   readonly_site_admin - boolean - Is the user an allowed to view all (non-billing) site configuration for this site?
//   receive_admin_alerts - boolean - Should the user receive admin alerts such a certificate expiration notifications and overages?
//   require_login_by - string - Require user to login by specified date otherwise it will be disabled.
//   require_password_change - boolean - Is a password change required upon next user login?
//   restapi_permission - boolean - Can this user access the Web app, Desktop app, SDKs, or REST API?  (All of these tools use the API internally, so this is one unified permission set.)
//   self_managed - boolean - Does this user manage it's own credentials or is it a shared/bot user?
//   sftp_permission - boolean - Can the user access with SFTP?
//   site_admin - boolean - Is the user an administrator for this site?
//   skip_welcome_screen - boolean - Skip Welcome page in the UI?
//   ssl_required - string - SSL required setting
//   sso_strategy_id - int64 - SSO (Single Sign On) strategy ID for the user, if applicable.
//   subscribe_to_newsletter - boolean - Is the user subscribed to the newsletter?
//   require_2fa - string - 2FA required setting
//   time_zone - string - User time zone
//   user_root - string - Root folder for FTP (and optionally SFTP if the appropriate site-wide setting is set).  Note that this is not used for API, Desktop, or Web interface.
//   user_home - string - Home folder for FTP/SFTP.  Note that this is not used for API, Desktop, or Web interface.
//   username (required) - string - User's username
(0, _defineProperty2.default)(User, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9() {
  var params,
    options,
    response,
    _args9 = arguments;
  return _regenerator.default.wrap(function (_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        params = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
        options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
        if (params.username) {
          _context9.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: username');
      case 1:
        if (!(params.change_password && !(0, _utils.isString)(params.change_password))) {
          _context9.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: change_password must be of type String, received ".concat((0, _utils.getType)(params.change_password)));
      case 2:
        if (!(params.change_password_confirmation && !(0, _utils.isString)(params.change_password_confirmation))) {
          _context9.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: change_password_confirmation must be of type String, received ".concat((0, _utils.getType)(params.change_password_confirmation)));
      case 3:
        if (!(params.email && !(0, _utils.isString)(params.email))) {
          _context9.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(params.email)));
      case 4:
        if (!(params.grant_permission && !(0, _utils.isString)(params.grant_permission))) {
          _context9.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: grant_permission must be of type String, received ".concat((0, _utils.getType)(params.grant_permission)));
      case 5:
        if (!(params.group_id && !(0, _utils.isInt)(params.group_id))) {
          _context9.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params.group_id)));
      case 6:
        if (!(params.group_ids && !(0, _utils.isString)(params.group_ids))) {
          _context9.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(params.group_ids)));
      case 7:
        if (!(params.imported_password_hash && !(0, _utils.isString)(params.imported_password_hash))) {
          _context9.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: imported_password_hash must be of type String, received ".concat((0, _utils.getType)(params.imported_password_hash)));
      case 8:
        if (!(params.password && !(0, _utils.isString)(params.password))) {
          _context9.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 9:
        if (!(params.password_confirmation && !(0, _utils.isString)(params.password_confirmation))) {
          _context9.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_confirmation must be of type String, received ".concat((0, _utils.getType)(params.password_confirmation)));
      case 10:
        if (!(params.allowed_ips && !(0, _utils.isString)(params.allowed_ips))) {
          _context9.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
      case 11:
        if (!(params.authenticate_until && !(0, _utils.isString)(params.authenticate_until))) {
          _context9.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: authenticate_until must be of type String, received ".concat((0, _utils.getType)(params.authenticate_until)));
      case 12:
        if (!(params.authentication_method && !(0, _utils.isString)(params.authentication_method))) {
          _context9.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: authentication_method must be of type String, received ".concat((0, _utils.getType)(params.authentication_method)));
      case 13:
        if (!(params.header_text && !(0, _utils.isString)(params.header_text))) {
          _context9.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: header_text must be of type String, received ".concat((0, _utils.getType)(params.header_text)));
      case 14:
        if (!(params.language && !(0, _utils.isString)(params.language))) {
          _context9.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(params.language)));
      case 15:
        if (!(params.notification_daily_send_time && !(0, _utils.isInt)(params.notification_daily_send_time))) {
          _context9.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notification_daily_send_time must be of type Int, received ".concat((0, _utils.getType)(params.notification_daily_send_time)));
      case 16:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context9.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 17:
        if (!(params.company && !(0, _utils.isString)(params.company))) {
          _context9.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(params.company)));
      case 18:
        if (!(params.notes && !(0, _utils.isString)(params.notes))) {
          _context9.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(params.notes)));
      case 19:
        if (!(params.password_validity_days && !(0, _utils.isInt)(params.password_validity_days))) {
          _context9.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(params.password_validity_days)));
      case 20:
        if (!(params.require_login_by && !(0, _utils.isString)(params.require_login_by))) {
          _context9.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_login_by must be of type String, received ".concat((0, _utils.getType)(params.require_login_by)));
      case 21:
        if (!(params.ssl_required && !(0, _utils.isString)(params.ssl_required))) {
          _context9.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl_required must be of type String, received ".concat((0, _utils.getType)(params.ssl_required)));
      case 22:
        if (!(params.sso_strategy_id && !(0, _utils.isInt)(params.sso_strategy_id))) {
          _context9.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sso_strategy_id must be of type Int, received ".concat((0, _utils.getType)(params.sso_strategy_id)));
      case 23:
        if (!(params.require_2fa && !(0, _utils.isString)(params.require_2fa))) {
          _context9.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_2fa must be of type String, received ".concat((0, _utils.getType)(params.require_2fa)));
      case 24:
        if (!(params.time_zone && !(0, _utils.isString)(params.time_zone))) {
          _context9.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: time_zone must be of type String, received ".concat((0, _utils.getType)(params.time_zone)));
      case 25:
        if (!(params.user_root && !(0, _utils.isString)(params.user_root))) {
          _context9.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_root must be of type String, received ".concat((0, _utils.getType)(params.user_root)));
      case 26:
        if (!(params.user_home && !(0, _utils.isString)(params.user_home))) {
          _context9.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_home must be of type String, received ".concat((0, _utils.getType)(params.user_home)));
      case 27:
        if (!(params.username && !(0, _utils.isString)(params.username))) {
          _context9.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
      case 28:
        _context9.next = 29;
        return _Api.default.sendRequest('/users', 'POST', params, options);
      case 29:
        response = _context9.sent;
        return _context9.abrupt("return", new _User(response === null || response === void 0 ? void 0 : response.data, options));
      case 30:
      case "end":
        return _context9.stop();
    }
  }, _callee9);
})));
var _default = exports.default = User;
module.exports = User;
module.exports.default = User;