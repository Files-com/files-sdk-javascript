"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Class Site
 */
var Site = /*#__PURE__*/(0, _createClass2.default)(function Site() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Site);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # Site name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  // boolean # Is SMS two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodSms", function () {
    return _this.attributes.allowed_2fa_method_sms;
  });
  // boolean # Is TOTP two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodTotp", function () {
    return _this.attributes.allowed_2fa_method_totp;
  });
  // boolean # Is U2F two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodU2f", function () {
    return _this.attributes.allowed_2fa_method_u2f;
  });
  // boolean # Is WebAuthn two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodWebauthn", function () {
    return _this.attributes.allowed_2fa_method_webauthn;
  });
  // boolean # Is yubikey two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodYubi", function () {
    return _this.attributes.allowed_2fa_method_yubi;
  });
  // boolean # Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodBypassForFtpSftpDav", function () {
    return _this.attributes.allowed_2fa_method_bypass_for_ftp_sftp_dav;
  });
  // int64 # User ID for the main site administrator
  (0, _defineProperty2.default)(this, "getAdminUserId", function () {
    return _this.attributes.admin_user_id;
  });
  // boolean # Are manual Bundle names allowed?
  (0, _defineProperty2.default)(this, "getAllowBundleNames", function () {
    return _this.attributes.allow_bundle_names;
  });
  // string # Comma seperated list of allowed Country codes
  (0, _defineProperty2.default)(this, "getAllowedCountries", function () {
    return _this.attributes.allowed_countries;
  });
  // string # List of allowed IP addresses
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  // boolean # If false, rename conflicting files instead of asking for overwrite confirmation.  Only applies to web interface.
  (0, _defineProperty2.default)(this, "getAskAboutOverwrites", function () {
    return _this.attributes.ask_about_overwrites;
  });
  // string # Do Bundle owners receive activity notifications?
  (0, _defineProperty2.default)(this, "getBundleActivityNotifications", function () {
    return _this.attributes.bundle_activity_notifications;
  });
  // int64 # Site-wide Bundle expiration in days
  (0, _defineProperty2.default)(this, "getBundleExpiration", function () {
    return _this.attributes.bundle_expiration;
  });
  // boolean # Do Bundles require password protection?
  (0, _defineProperty2.default)(this, "getBundlePasswordRequired", function () {
    return _this.attributes.bundle_password_required;
  });
  // string # Do Bundle owners receive registration notification?
  (0, _defineProperty2.default)(this, "getBundleRegistrationNotifications", function () {
    return _this.attributes.bundle_registration_notifications;
  });
  // boolean # Do Bundles require recipients for sharing?
  (0, _defineProperty2.default)(this, "getBundleRequireShareRecipient", function () {
    return _this.attributes.bundle_require_share_recipient;
  });
  // string # Do Bundle uploaders receive upload confirmation notifications?
  (0, _defineProperty2.default)(this, "getBundleUploadReceiptNotifications", function () {
    return _this.attributes.bundle_upload_receipt_notifications;
  });
  // Image # Preview watermark image applied to all bundle items.
  (0, _defineProperty2.default)(this, "getBundleWatermarkAttachment", function () {
    return _this.attributes.bundle_watermark_attachment;
  });
  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  (0, _defineProperty2.default)(this, "getBundleWatermarkValue", function () {
    return _this.attributes.bundle_watermark_value;
  });
  // boolean # Do incoming emails in the Inboxes require checking for SPF/DKIM/DMARC?
  (0, _defineProperty2.default)(this, "getUploadsViaEmailAuthentication", function () {
    return _this.attributes.uploads_via_email_authentication;
  });
  // string # Page link and button color
  (0, _defineProperty2.default)(this, "getColor2Left", function () {
    return _this.attributes.color2_left;
  });
  // string # Top bar link color
  (0, _defineProperty2.default)(this, "getColor2Link", function () {
    return _this.attributes.color2_link;
  });
  // string # Page link and button color
  (0, _defineProperty2.default)(this, "getColor2Text", function () {
    return _this.attributes.color2_text;
  });
  // string # Top bar background color
  (0, _defineProperty2.default)(this, "getColor2Top", function () {
    return _this.attributes.color2_top;
  });
  // string # Top bar text color
  (0, _defineProperty2.default)(this, "getColor2TopText", function () {
    return _this.attributes.color2_top_text;
  });
  // string # Site main contact name
  (0, _defineProperty2.default)(this, "getContactName", function () {
    return _this.attributes.contact_name;
  });
  // date-time # Time this site was created
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # Preferred currency
  (0, _defineProperty2.default)(this, "getCurrency", function () {
    return _this.attributes.currency;
  });
  // boolean # Is this site using a custom namespace for users?
  (0, _defineProperty2.default)(this, "getCustomNamespace", function () {
    return _this.attributes.custom_namespace;
  });
  // int64 # Number of days to keep deleted files
  (0, _defineProperty2.default)(this, "getDaysToRetainBackups", function () {
    return _this.attributes.days_to_retain_backups;
  });
  // string # Site default time zone
  (0, _defineProperty2.default)(this, "getDefaultTimeZone", function () {
    return _this.attributes.default_time_zone;
  });
  // boolean # Is the desktop app enabled?
  (0, _defineProperty2.default)(this, "getDesktopApp", function () {
    return _this.attributes.desktop_app;
  });
  // boolean # Is desktop app session IP pinning enabled?
  (0, _defineProperty2.default)(this, "getDesktopAppSessionIpPinning", function () {
    return _this.attributes.desktop_app_session_ip_pinning;
  });
  // int64 # Desktop app session lifetime (in hours)
  (0, _defineProperty2.default)(this, "getDesktopAppSessionLifetime", function () {
    return _this.attributes.desktop_app_session_lifetime;
  });
  // boolean # Is the mobile app enabled?
  (0, _defineProperty2.default)(this, "getMobileApp", function () {
    return _this.attributes.mobile_app;
  });
  // boolean # Is mobile app session IP pinning enabled?
  (0, _defineProperty2.default)(this, "getMobileAppSessionIpPinning", function () {
    return _this.attributes.mobile_app_session_ip_pinning;
  });
  // int64 # Mobile app session lifetime (in hours)
  (0, _defineProperty2.default)(this, "getMobileAppSessionLifetime", function () {
    return _this.attributes.mobile_app_session_lifetime;
  });
  // string # Comma seperated list of disallowed Country codes
  (0, _defineProperty2.default)(this, "getDisallowedCountries", function () {
    return _this.attributes.disallowed_countries;
  });
  // boolean # If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
  (0, _defineProperty2.default)(this, "getDisableFilesCertificateGeneration", function () {
    return _this.attributes.disable_files_certificate_generation;
  });
  // boolean # Are notifications disabled?
  (0, _defineProperty2.default)(this, "getDisableNotifications", function () {
    return _this.attributes.disable_notifications;
  });
  // boolean # Is password reset disabled?
  (0, _defineProperty2.default)(this, "getDisablePasswordReset", function () {
    return _this.attributes.disable_password_reset;
  });
  // string # Custom domain
  (0, _defineProperty2.default)(this, "getDomain", function () {
    return _this.attributes.domain;
  });
  // boolean # Send HSTS (HTTP Strict Transport Security) header when visitors access the site via a custom domain?
  (0, _defineProperty2.default)(this, "getDomainHstsHeader", function () {
    return _this.attributes.domain_hsts_header;
  });
  // string # Letsencrypt chain to use when registering SSL Certificate for domain.
  (0, _defineProperty2.default)(this, "getDomainLetsencryptChain", function () {
    return _this.attributes.domain_letsencrypt_chain;
  });
  // email # Main email for this site
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  // boolean # Is FTP enabled?
  (0, _defineProperty2.default)(this, "getFtpEnabled", function () {
    return _this.attributes.ftp_enabled;
  });
  // email # Reply-to email for this site
  (0, _defineProperty2.default)(this, "getReplyToEmail", function () {
    return _this.attributes.reply_to_email;
  });
  // boolean # If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed via your SSO provider.
  (0, _defineProperty2.default)(this, "getNonSsoGroupsAllowed", function () {
    return _this.attributes.non_sso_groups_allowed;
  });
  // boolean # If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed via your SSO provider.
  (0, _defineProperty2.default)(this, "getNonSsoUsersAllowed", function () {
    return _this.attributes.non_sso_users_allowed;
  });
  // boolean # If true, permissions for this site must be bound to a group (not a user). Otherwise, permissions must be bound to a user.
  (0, _defineProperty2.default)(this, "getFolderPermissionsGroupsOnly", function () {
    return _this.attributes.folder_permissions_groups_only;
  });
  // boolean # Is there a signed HIPAA BAA between Files.com and this site?
  (0, _defineProperty2.default)(this, "getHipaa", function () {
    return _this.attributes.hipaa;
  });
  // Image # Branded icon 128x128
  (0, _defineProperty2.default)(this, "getIcon128", function () {
    return _this.attributes.icon128;
  });
  // Image # Branded icon 16x16
  (0, _defineProperty2.default)(this, "getIcon16", function () {
    return _this.attributes.icon16;
  });
  // Image # Branded icon 32x32
  (0, _defineProperty2.default)(this, "getIcon32", function () {
    return _this.attributes.icon32;
  });
  // Image # Branded icon 48x48
  (0, _defineProperty2.default)(this, "getIcon48", function () {
    return _this.attributes.icon48;
  });
  // date-time # Can files be modified?
  (0, _defineProperty2.default)(this, "getImmutableFilesSetAt", function () {
    return _this.attributes.immutable_files_set_at;
  });
  // boolean # Include password in emails to new users?
  (0, _defineProperty2.default)(this, "getIncludePasswordInWelcomeEmail", function () {
    return _this.attributes.include_password_in_welcome_email;
  });
  // string # Site default language
  (0, _defineProperty2.default)(this, "getLanguage", function () {
    return _this.attributes.language;
  });
  // string # Base DN for looking up users in LDAP server
  (0, _defineProperty2.default)(this, "getLdapBaseDn", function () {
    return _this.attributes.ldap_base_dn;
  });
  // string # Domain name that will be appended to usernames
  (0, _defineProperty2.default)(this, "getLdapDomain", function () {
    return _this.attributes.ldap_domain;
  });
  // boolean # Main LDAP setting: is LDAP enabled?
  (0, _defineProperty2.default)(this, "getLdapEnabled", function () {
    return _this.attributes.ldap_enabled;
  });
  // string # Should we sync groups from LDAP server?
  (0, _defineProperty2.default)(this, "getLdapGroupAction", function () {
    return _this.attributes.ldap_group_action;
  });
  // string # Comma or newline separated list of group names (with optional wildcards) to exclude when syncing.
  (0, _defineProperty2.default)(this, "getLdapGroupExclusion", function () {
    return _this.attributes.ldap_group_exclusion;
  });
  // string # Comma or newline separated list of group names (with optional wildcards) to include when syncing.
  (0, _defineProperty2.default)(this, "getLdapGroupInclusion", function () {
    return _this.attributes.ldap_group_inclusion;
  });
  // string # LDAP host
  (0, _defineProperty2.default)(this, "getLdapHost", function () {
    return _this.attributes.ldap_host;
  });
  // string # LDAP backup host
  (0, _defineProperty2.default)(this, "getLdapHost2", function () {
    return _this.attributes.ldap_host_2;
  });
  // string # LDAP backup host
  (0, _defineProperty2.default)(this, "getLdapHost3", function () {
    return _this.attributes.ldap_host_3;
  });
  // int64 # LDAP port
  (0, _defineProperty2.default)(this, "getLdapPort", function () {
    return _this.attributes.ldap_port;
  });
  // boolean # Use secure LDAP?
  (0, _defineProperty2.default)(this, "getLdapSecure", function () {
    return _this.attributes.ldap_secure;
  });
  // string # LDAP type
  (0, _defineProperty2.default)(this, "getLdapType", function () {
    return _this.attributes.ldap_type;
  });
  // string # Should we sync users from LDAP server?
  (0, _defineProperty2.default)(this, "getLdapUserAction", function () {
    return _this.attributes.ldap_user_action;
  });
  // string # Comma or newline separated list of group names (with optional wildcards) - if provided, only users in these groups will be added or synced.
  (0, _defineProperty2.default)(this, "getLdapUserIncludeGroups", function () {
    return _this.attributes.ldap_user_include_groups;
  });
  // string # Username for signing in to LDAP server.
  (0, _defineProperty2.default)(this, "getLdapUsername", function () {
    return _this.attributes.ldap_username;
  });
  // string # LDAP username field
  (0, _defineProperty2.default)(this, "getLdapUsernameField", function () {
    return _this.attributes.ldap_username_field;
  });
  // string # Login help text
  (0, _defineProperty2.default)(this, "getLoginHelpText", function () {
    return _this.attributes.login_help_text;
  });
  // Image # Branded logo
  (0, _defineProperty2.default)(this, "getLogo", function () {
    return _this.attributes.logo;
  });
  // int64 # Number of prior passwords to disallow
  (0, _defineProperty2.default)(this, "getMaxPriorPasswords", function () {
    return _this.attributes.max_prior_passwords;
  });
  // string # A message to show users when they connect via FTP or SFTP.
  (0, _defineProperty2.default)(this, "getMotdText", function () {
    return _this.attributes.motd_text;
  });
  // boolean # Show message to users connecting via FTP
  (0, _defineProperty2.default)(this, "getMotdUseForFtp", function () {
    return _this.attributes.motd_use_for_ftp;
  });
  // boolean # Show message to users connecting via SFTP
  (0, _defineProperty2.default)(this, "getMotdUseForSftp", function () {
    return _this.attributes.motd_use_for_sftp;
  });
  // double # Next billing amount
  (0, _defineProperty2.default)(this, "getNextBillingAmount", function () {
    return _this.attributes.next_billing_amount;
  });
  // string # Next billing date
  (0, _defineProperty2.default)(this, "getNextBillingDate", function () {
    return _this.attributes.next_billing_date;
  });
  // boolean # Allow users to use Office for the web?
  (0, _defineProperty2.default)(this, "getOfficeIntegrationAvailable", function () {
    return _this.attributes.office_integration_available;
  });
  // string # Office integration application used to edit and view the MS Office documents
  (0, _defineProperty2.default)(this, "getOfficeIntegrationType", function () {
    return _this.attributes.office_integration_type;
  });
  // string # Link to scheduling a meeting with our Sales team
  (0, _defineProperty2.default)(this, "getOncehubLink", function () {
    return _this.attributes.oncehub_link;
  });
  // boolean # Use servers in the USA only?
  (0, _defineProperty2.default)(this, "getOptOutGlobal", function () {
    return _this.attributes.opt_out_global;
  });
  // boolean # Is this site's billing overdue?
  (0, _defineProperty2.default)(this, "getOverdue", function () {
    return _this.attributes.overdue;
  });
  // int64 # Shortest password length for users
  (0, _defineProperty2.default)(this, "getPasswordMinLength", function () {
    return _this.attributes.password_min_length;
  });
  // boolean # Require a letter in passwords?
  (0, _defineProperty2.default)(this, "getPasswordRequireLetter", function () {
    return _this.attributes.password_require_letter;
  });
  // boolean # Require lower and upper case letters in passwords?
  (0, _defineProperty2.default)(this, "getPasswordRequireMixed", function () {
    return _this.attributes.password_require_mixed;
  });
  // boolean # Require a number in passwords?
  (0, _defineProperty2.default)(this, "getPasswordRequireNumber", function () {
    return _this.attributes.password_require_number;
  });
  // boolean # Require special characters in password?
  (0, _defineProperty2.default)(this, "getPasswordRequireSpecial", function () {
    return _this.attributes.password_require_special;
  });
  // boolean # Require passwords that have not been previously breached? (see https://haveibeenpwned.com/)
  (0, _defineProperty2.default)(this, "getPasswordRequireUnbreached", function () {
    return _this.attributes.password_require_unbreached;
  });
  // boolean # Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same requirements as users' passwords?
  (0, _defineProperty2.default)(this, "getPasswordRequirementsApplyToBundles", function () {
    return _this.attributes.password_requirements_apply_to_bundles;
  });
  // int64 # Number of days password is valid
  (0, _defineProperty2.default)(this, "getPasswordValidityDays", function () {
    return _this.attributes.password_validity_days;
  });
  // string # Site phone number
  (0, _defineProperty2.default)(this, "getPhone", function () {
    return _this.attributes.phone;
  });
  // boolean # If true, we will ensure that all internal communications with any remote server are made through the primary region of the site. This setting overrides individual remote server settings.
  (0, _defineProperty2.default)(this, "getPinAllRemoteServersToSiteRegion", function () {
    return _this.attributes.pin_all_remote_servers_to_site_region;
  });
  // boolean # If true, we will prevent non-administrators from receiving any permissions directly on the root folder.  This is commonly used to prevent the accidental application of permissions.
  (0, _defineProperty2.default)(this, "getPreventRootPermissionsForNonSiteAdmins", function () {
    return _this.attributes.prevent_root_permissions_for_non_site_admins;
  });
  // boolean # Require two-factor authentication for all users?
  (0, _defineProperty2.default)(this, "getRequire2fa", function () {
    return _this.attributes.require_2fa;
  });
  // date-time # If set, requirement for two-factor authentication has been scheduled to end on this date-time.
  (0, _defineProperty2.default)(this, "getRequire2faStopTime", function () {
    return _this.attributes.require_2fa_stop_time;
  });
  // string # What type of user is required to use two-factor authentication (when require_2fa is set to `true` for this site)?
  (0, _defineProperty2.default)(this, "getRequire2faUserType", function () {
    return _this.attributes.require_2fa_user_type;
  });
  // boolean # If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user logout and log back in every time they visit the page.
  (0, _defineProperty2.default)(this, "getRequireLogoutFromBundlesAndInboxes", function () {
    return _this.attributes.require_logout_from_bundles_and_inboxes;
  });
  // Session # Current session
  (0, _defineProperty2.default)(this, "getSession", function () {
    return _this.attributes.session;
  });
  // boolean # Are sessions locked to the same IP? (i.e. do users need to log in again if they change IPs?)
  (0, _defineProperty2.default)(this, "getSessionPinnedByIp", function () {
    return _this.attributes.session_pinned_by_ip;
  });
  // boolean # Is SFTP enabled?
  (0, _defineProperty2.default)(this, "getSftpEnabled", function () {
    return _this.attributes.sftp_enabled;
  });
  // string # Sftp Host Key Type
  (0, _defineProperty2.default)(this, "getSftpHostKeyType", function () {
    return _this.attributes.sftp_host_key_type;
  });
  // int64 # Id of the currently selected custom SFTP Host Key
  (0, _defineProperty2.default)(this, "getActiveSftpHostKeyId", function () {
    return _this.attributes.active_sftp_host_key_id;
  });
  // boolean # Are Insecure Ciphers allowed for SFTP?  Note:  Settting TLS Disabled -> True will always allow insecure ciphers for SFTP as well.  Enabling this is insecure.
  (0, _defineProperty2.default)(this, "getSftpInsecureCiphers", function () {
    return _this.attributes.sftp_insecure_ciphers;
  });
  // boolean # Use user FTP roots also for SFTP?
  (0, _defineProperty2.default)(this, "getSftpUserRootEnabled", function () {
    return _this.attributes.sftp_user_root_enabled;
  });
  // boolean # Allow bundle creation
  (0, _defineProperty2.default)(this, "getSharingEnabled", function () {
    return _this.attributes.sharing_enabled;
  });
  // boolean # Show request access link for users without access?  Currently unused.
  (0, _defineProperty2.default)(this, "getShowRequestAccessLink", function () {
    return _this.attributes.show_request_access_link;
  });
  // string # Custom site footer text
  (0, _defineProperty2.default)(this, "getSiteFooter", function () {
    return _this.attributes.site_footer;
  });
  // string # Custom site header text
  (0, _defineProperty2.default)(this, "getSiteHeader", function () {
    return _this.attributes.site_header;
  });
  // string # SMTP server hostname or IP
  (0, _defineProperty2.default)(this, "getSmtpAddress", function () {
    return _this.attributes.smtp_address;
  });
  // string # SMTP server authentication type
  (0, _defineProperty2.default)(this, "getSmtpAuthentication", function () {
    return _this.attributes.smtp_authentication;
  });
  // string # From address to use when mailing through custom SMTP
  (0, _defineProperty2.default)(this, "getSmtpFrom", function () {
    return _this.attributes.smtp_from;
  });
  // int64 # SMTP server port
  (0, _defineProperty2.default)(this, "getSmtpPort", function () {
    return _this.attributes.smtp_port;
  });
  // string # SMTP server username
  (0, _defineProperty2.default)(this, "getSmtpUsername", function () {
    return _this.attributes.smtp_username;
  });
  // double # Session expiry in hours
  (0, _defineProperty2.default)(this, "getSessionExpiry", function () {
    return _this.attributes.session_expiry;
  });
  // int64 # Session expiry in minutes
  (0, _defineProperty2.default)(this, "getSessionExpiryMinutes", function () {
    return _this.attributes.session_expiry_minutes;
  });
  // boolean # Is SSL required?  Disabling this is insecure.
  (0, _defineProperty2.default)(this, "getSslRequired", function () {
    return _this.attributes.ssl_required;
  });
  // string # Site subdomain
  (0, _defineProperty2.default)(this, "getSubdomain", function () {
    return _this.attributes.subdomain;
  });
  // date-time # If switching plans, when does the new plan take effect?
  (0, _defineProperty2.default)(this, "getSwitchToPlanDate", function () {
    return _this.attributes.switch_to_plan_date;
  });
  // boolean # Are Insecure TLS and SFTP Ciphers allowed?  Enabling this is insecure.
  (0, _defineProperty2.default)(this, "getTlsDisabled", function () {
    return _this.attributes.tls_disabled;
  });
  // int64 # Number of days left in trial
  (0, _defineProperty2.default)(this, "getTrialDaysLeft", function () {
    return _this.attributes.trial_days_left;
  });
  // date-time # When does this Site trial expire?
  (0, _defineProperty2.default)(this, "getTrialUntil", function () {
    return _this.attributes.trial_until;
  });
  // date-time # Last time this Site was updated
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  // boolean # Allow uploaders to set `provided_modified_at` for uploaded files?
  (0, _defineProperty2.default)(this, "getUseProvidedModifiedAt", function () {
    return _this.attributes.use_provided_modified_at;
  });
  // User # User of current session
  (0, _defineProperty2.default)(this, "getUser", function () {
    return _this.attributes.user;
  });
  // boolean # Will users be locked out after incorrect login attempts?
  (0, _defineProperty2.default)(this, "getUserLockout", function () {
    return _this.attributes.user_lockout;
  });
  // int64 # How many hours to lock user out for failed password?
  (0, _defineProperty2.default)(this, "getUserLockoutLockPeriod", function () {
    return _this.attributes.user_lockout_lock_period;
  });
  // int64 # Number of login tries within `user_lockout_within` hours before users are locked out
  (0, _defineProperty2.default)(this, "getUserLockoutTries", function () {
    return _this.attributes.user_lockout_tries;
  });
  // int64 # Number of hours for user lockout window
  (0, _defineProperty2.default)(this, "getUserLockoutWithin", function () {
    return _this.attributes.user_lockout_within;
  });
  // boolean # Enable User Requests feature
  (0, _defineProperty2.default)(this, "getUserRequestsEnabled", function () {
    return _this.attributes.user_requests_enabled;
  });
  // boolean # Send email to site admins when a user request is received?
  (0, _defineProperty2.default)(this, "getUserRequestsNotifyAdmins", function () {
    return _this.attributes.user_requests_notify_admins;
  });
  // string # Custom text send in user welcome email
  (0, _defineProperty2.default)(this, "getWelcomeCustomText", function () {
    return _this.attributes.welcome_custom_text;
  });
  // email # Include this email in welcome emails if enabled
  (0, _defineProperty2.default)(this, "getWelcomeEmailCc", function () {
    return _this.attributes.welcome_email_cc;
  });
  // string # Include this email subject in welcome emails if enabled
  (0, _defineProperty2.default)(this, "getWelcomeEmailSubject", function () {
    return _this.attributes.welcome_email_subject;
  });
  // boolean # Will the welcome email be sent to new users?
  (0, _defineProperty2.default)(this, "getWelcomeEmailEnabled", function () {
    return _this.attributes.welcome_email_enabled;
  });
  // string # Does the welcome screen appear?
  (0, _defineProperty2.default)(this, "getWelcomeScreen", function () {
    return _this.attributes.welcome_screen;
  });
  // boolean # Does FTP user Windows emulation mode?
  (0, _defineProperty2.default)(this, "getWindowsModeFtp", function () {
    return _this.attributes.windows_mode_ftp;
  });
  // int64 # If greater than zero, users will unable to login if they do not show activity within this number of days.
  (0, _defineProperty2.default)(this, "getDisableUsersFromInactivityPeriodDays", function () {
    return _this.attributes.disable_users_from_inactivity_period_days;
  });
  // boolean # Allow group admins set password authentication method
  (0, _defineProperty2.default)(this, "getGroupAdminsCanSetUserPassword", function () {
    return _this.attributes.group_admins_can_set_user_password;
  });
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
(0, _defineProperty2.default)(Site, "get", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        _context.next = 3;
        return _Api.default.sendRequest("/site", 'GET', {}, options);
      case 3:
        response = _context.sent;
        return _context.abrupt("return", new Site(response === null || response === void 0 ? void 0 : response.data, options));
      case 5:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(Site, "getUsage", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        _context2.next = 3;
        return _Api.default.sendRequest("/site/usage", 'GET', {}, options);
      case 3:
        response = _context2.sent;
        return _context2.abrupt("return", new UsageSnapshot(response === null || response === void 0 ? void 0 : response.data, options));
      case 5:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
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
//   folder_permissions_groups_only - boolean - If true, permissions for this site must be bound to a group (not a user). Otherwise, permissions must be bound to a user.
//   welcome_screen - string - Does the welcome screen appear?
//   office_integration_available - boolean - Allow users to use Office for the web?
//   office_integration_type - string - Office integration application used to edit and view the MS Office documents
//   pin_all_remote_servers_to_site_region - boolean - If true, we will ensure that all internal communications with any remote server are made through the primary region of the site. This setting overrides individual remote server settings.
//   motd_text - string - A message to show users when they connect via FTP or SFTP.
//   motd_use_for_ftp - boolean - Show message to users connecting via FTP
//   motd_use_for_sftp - boolean - Show message to users connecting via SFTP
//   session_expiry - double - Session expiry in hours
//   ssl_required - boolean - Is SSL required?  Disabling this is insecure.
//   tls_disabled - boolean - Are Insecure TLS and SFTP Ciphers allowed?  Enabling this is insecure.
//   sftp_insecure_ciphers - boolean - Are Insecure Ciphers allowed for SFTP?  Note:  Settting TLS Disabled -> True will always allow insecure ciphers for SFTP as well.  Enabling this is insecure.
//   disable_files_certificate_generation - boolean - If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
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
//   require_logout_from_bundles_and_inboxes - boolean - If true, we will hide the 'Remember Me' box on Inbox and Bundle registration pages, requiring that the user logout and log back in every time they visit the page.
//   sftp_user_root_enabled - boolean - Use user FTP roots also for SFTP?
//   disable_password_reset - boolean - Is password reset disabled?
//   immutable_files - boolean - Are files protected from modification?
//   session_pinned_by_ip - boolean - Are sessions locked to the same IP? (i.e. do users need to log in again if they change IPs?)
//   bundle_password_required - boolean - Do Bundles require password protection?
//   bundle_require_share_recipient - boolean - Do Bundles require recipients for sharing?
//   bundle_registration_notifications - string - Do Bundle owners receive registration notification?
//   bundle_activity_notifications - string - Do Bundle owners receive activity notifications?
//   bundle_upload_receipt_notifications - string - Do Bundle uploaders receive upload confirmation notifications?
//   password_requirements_apply_to_bundles - boolean - Require bundles' passwords, and passwords for other items (inboxes, public shares, etc.) to conform to the same requirements as users' passwords?
//   prevent_root_permissions_for_non_site_admins - boolean - If true, we will prevent non-administrators from receiving any permissions directly on the root folder.  This is commonly used to prevent the accidental application of permissions.
//   opt_out_global - boolean - Use servers in the USA only?
//   use_provided_modified_at - boolean - Allow uploaders to set `provided_modified_at` for uploaded files?
//   custom_namespace - boolean - Is this site using a custom namespace for users?
//   disable_users_from_inactivity_period_days - int64 - If greater than zero, users will unable to login if they do not show activity within this number of days.
//   non_sso_groups_allowed - boolean - If true, groups can be manually created / modified / deleted by Site Admins. Otherwise, groups can only be managed via your SSO provider.
//   non_sso_users_allowed - boolean - If true, users can be manually created / modified / deleted by Site Admins. Otherwise, users can only be managed via your SSO provider.
//   sharing_enabled - boolean - Allow bundle creation
//   user_requests_enabled - boolean - Enable User Requests feature
//   user_requests_notify_admins - boolean - Send email to site admins when a user request is received?
//   ftp_enabled - boolean - Is FTP enabled?
//   sftp_enabled - boolean - Is SFTP enabled?
//   sftp_host_key_type - string - Sftp Host Key Type
//   active_sftp_host_key_id - int64 - Id of the currently selected custom SFTP Host Key
//   bundle_watermark_value - object - Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
//   group_admins_can_set_user_password - boolean - Allow group admins set password authentication method
//   allowed_2fa_method_sms - boolean - Is SMS two factor authentication allowed?
//   allowed_2fa_method_u2f - boolean - Is U2F two factor authentication allowed?
//   allowed_2fa_method_totp - boolean - Is TOTP two factor authentication allowed?
//   allowed_2fa_method_webauthn - boolean - Is WebAuthn two factor authentication allowed?
//   allowed_2fa_method_yubi - boolean - Is yubikey two factor authentication allowed?
//   allowed_2fa_method_bypass_for_ftp_sftp_dav - boolean - Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV?
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
//   disable_2fa_with_delay - boolean - If set to true, we will begin the process of disabling 2FA on this site.
//   ldap_password_change - string - New LDAP password.
//   ldap_password_change_confirmation - string - Confirm new LDAP password.
//   smtp_password - string - Password for SMTP server.
//   session_expiry_minutes - int64 - Session expiry in minutes
(0, _defineProperty2.default)(Site, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params['name'])));
      case 4:
        if (!(params['subdomain'] && !(0, _utils.isString)(params['subdomain']))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: subdomain must be of type String, received ".concat((0, _utils.getType)(params['subdomain'])));
      case 6:
        if (!(params['domain'] && !(0, _utils.isString)(params['domain']))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: domain must be of type String, received ".concat((0, _utils.getType)(params['domain'])));
      case 8:
        if (!(params['domain_letsencrypt_chain'] && !(0, _utils.isString)(params['domain_letsencrypt_chain']))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: domain_letsencrypt_chain must be of type String, received ".concat((0, _utils.getType)(params['domain_letsencrypt_chain'])));
      case 10:
        if (!(params['email'] && !(0, _utils.isString)(params['email']))) {
          _context3.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(params['email'])));
      case 12:
        if (!(params['reply_to_email'] && !(0, _utils.isString)(params['reply_to_email']))) {
          _context3.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: reply_to_email must be of type String, received ".concat((0, _utils.getType)(params['reply_to_email'])));
      case 14:
        if (!(params['bundle_expiration'] && !(0, _utils.isInt)(params['bundle_expiration']))) {
          _context3.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_expiration must be of type Int, received ".concat((0, _utils.getType)(params['bundle_expiration'])));
      case 16:
        if (!(params['welcome_email_cc'] && !(0, _utils.isString)(params['welcome_email_cc']))) {
          _context3.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_email_cc must be of type String, received ".concat((0, _utils.getType)(params['welcome_email_cc'])));
      case 18:
        if (!(params['welcome_email_subject'] && !(0, _utils.isString)(params['welcome_email_subject']))) {
          _context3.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_email_subject must be of type String, received ".concat((0, _utils.getType)(params['welcome_email_subject'])));
      case 20:
        if (!(params['welcome_custom_text'] && !(0, _utils.isString)(params['welcome_custom_text']))) {
          _context3.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_custom_text must be of type String, received ".concat((0, _utils.getType)(params['welcome_custom_text'])));
      case 22:
        if (!(params['language'] && !(0, _utils.isString)(params['language']))) {
          _context3.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(params['language'])));
      case 24:
        if (!(params['default_time_zone'] && !(0, _utils.isString)(params['default_time_zone']))) {
          _context3.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: default_time_zone must be of type String, received ".concat((0, _utils.getType)(params['default_time_zone'])));
      case 26:
        if (!(params['desktop_app_session_lifetime'] && !(0, _utils.isInt)(params['desktop_app_session_lifetime']))) {
          _context3.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: desktop_app_session_lifetime must be of type Int, received ".concat((0, _utils.getType)(params['desktop_app_session_lifetime'])));
      case 28:
        if (!(params['mobile_app_session_lifetime'] && !(0, _utils.isInt)(params['mobile_app_session_lifetime']))) {
          _context3.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: mobile_app_session_lifetime must be of type Int, received ".concat((0, _utils.getType)(params['mobile_app_session_lifetime'])));
      case 30:
        if (!(params['welcome_screen'] && !(0, _utils.isString)(params['welcome_screen']))) {
          _context3.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_screen must be of type String, received ".concat((0, _utils.getType)(params['welcome_screen'])));
      case 32:
        if (!(params['office_integration_type'] && !(0, _utils.isString)(params['office_integration_type']))) {
          _context3.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: office_integration_type must be of type String, received ".concat((0, _utils.getType)(params['office_integration_type'])));
      case 34:
        if (!(params['motd_text'] && !(0, _utils.isString)(params['motd_text']))) {
          _context3.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: motd_text must be of type String, received ".concat((0, _utils.getType)(params['motd_text'])));
      case 36:
        if (!(params['user_lockout_tries'] && !(0, _utils.isInt)(params['user_lockout_tries']))) {
          _context3.next = 38;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout_tries must be of type Int, received ".concat((0, _utils.getType)(params['user_lockout_tries'])));
      case 38:
        if (!(params['user_lockout_within'] && !(0, _utils.isInt)(params['user_lockout_within']))) {
          _context3.next = 40;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout_within must be of type Int, received ".concat((0, _utils.getType)(params['user_lockout_within'])));
      case 40:
        if (!(params['user_lockout_lock_period'] && !(0, _utils.isInt)(params['user_lockout_lock_period']))) {
          _context3.next = 42;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout_lock_period must be of type Int, received ".concat((0, _utils.getType)(params['user_lockout_lock_period'])));
      case 42:
        if (!(params['allowed_countries'] && !(0, _utils.isString)(params['allowed_countries']))) {
          _context3.next = 44;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_countries must be of type String, received ".concat((0, _utils.getType)(params['allowed_countries'])));
      case 44:
        if (!(params['allowed_ips'] && !(0, _utils.isString)(params['allowed_ips']))) {
          _context3.next = 46;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params['allowed_ips'])));
      case 46:
        if (!(params['disallowed_countries'] && !(0, _utils.isString)(params['disallowed_countries']))) {
          _context3.next = 48;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disallowed_countries must be of type String, received ".concat((0, _utils.getType)(params['disallowed_countries'])));
      case 48:
        if (!(params['days_to_retain_backups'] && !(0, _utils.isInt)(params['days_to_retain_backups']))) {
          _context3.next = 50;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: days_to_retain_backups must be of type Int, received ".concat((0, _utils.getType)(params['days_to_retain_backups'])));
      case 50:
        if (!(params['max_prior_passwords'] && !(0, _utils.isInt)(params['max_prior_passwords']))) {
          _context3.next = 52;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_prior_passwords must be of type Int, received ".concat((0, _utils.getType)(params['max_prior_passwords'])));
      case 52:
        if (!(params['password_validity_days'] && !(0, _utils.isInt)(params['password_validity_days']))) {
          _context3.next = 54;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(params['password_validity_days'])));
      case 54:
        if (!(params['password_min_length'] && !(0, _utils.isInt)(params['password_min_length']))) {
          _context3.next = 56;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_min_length must be of type Int, received ".concat((0, _utils.getType)(params['password_min_length'])));
      case 56:
        if (!(params['bundle_registration_notifications'] && !(0, _utils.isString)(params['bundle_registration_notifications']))) {
          _context3.next = 58;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_registration_notifications must be of type String, received ".concat((0, _utils.getType)(params['bundle_registration_notifications'])));
      case 58:
        if (!(params['bundle_activity_notifications'] && !(0, _utils.isString)(params['bundle_activity_notifications']))) {
          _context3.next = 60;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_activity_notifications must be of type String, received ".concat((0, _utils.getType)(params['bundle_activity_notifications'])));
      case 60:
        if (!(params['bundle_upload_receipt_notifications'] && !(0, _utils.isString)(params['bundle_upload_receipt_notifications']))) {
          _context3.next = 62;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_upload_receipt_notifications must be of type String, received ".concat((0, _utils.getType)(params['bundle_upload_receipt_notifications'])));
      case 62:
        if (!(params['disable_users_from_inactivity_period_days'] && !(0, _utils.isInt)(params['disable_users_from_inactivity_period_days']))) {
          _context3.next = 64;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disable_users_from_inactivity_period_days must be of type Int, received ".concat((0, _utils.getType)(params['disable_users_from_inactivity_period_days'])));
      case 64:
        if (!(params['sftp_host_key_type'] && !(0, _utils.isString)(params['sftp_host_key_type']))) {
          _context3.next = 66;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_host_key_type must be of type String, received ".concat((0, _utils.getType)(params['sftp_host_key_type'])));
      case 66:
        if (!(params['active_sftp_host_key_id'] && !(0, _utils.isInt)(params['active_sftp_host_key_id']))) {
          _context3.next = 68;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: active_sftp_host_key_id must be of type Int, received ".concat((0, _utils.getType)(params['active_sftp_host_key_id'])));
      case 68:
        if (!(params['require_2fa_user_type'] && !(0, _utils.isString)(params['require_2fa_user_type']))) {
          _context3.next = 70;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_2fa_user_type must be of type String, received ".concat((0, _utils.getType)(params['require_2fa_user_type'])));
      case 70:
        if (!(params['color2_top'] && !(0, _utils.isString)(params['color2_top']))) {
          _context3.next = 72;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_top must be of type String, received ".concat((0, _utils.getType)(params['color2_top'])));
      case 72:
        if (!(params['color2_left'] && !(0, _utils.isString)(params['color2_left']))) {
          _context3.next = 74;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_left must be of type String, received ".concat((0, _utils.getType)(params['color2_left'])));
      case 74:
        if (!(params['color2_link'] && !(0, _utils.isString)(params['color2_link']))) {
          _context3.next = 76;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_link must be of type String, received ".concat((0, _utils.getType)(params['color2_link'])));
      case 76:
        if (!(params['color2_text'] && !(0, _utils.isString)(params['color2_text']))) {
          _context3.next = 78;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_text must be of type String, received ".concat((0, _utils.getType)(params['color2_text'])));
      case 78:
        if (!(params['color2_top_text'] && !(0, _utils.isString)(params['color2_top_text']))) {
          _context3.next = 80;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_top_text must be of type String, received ".concat((0, _utils.getType)(params['color2_top_text'])));
      case 80:
        if (!(params['site_header'] && !(0, _utils.isString)(params['site_header']))) {
          _context3.next = 82;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_header must be of type String, received ".concat((0, _utils.getType)(params['site_header'])));
      case 82:
        if (!(params['site_footer'] && !(0, _utils.isString)(params['site_footer']))) {
          _context3.next = 84;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_footer must be of type String, received ".concat((0, _utils.getType)(params['site_footer'])));
      case 84:
        if (!(params['login_help_text'] && !(0, _utils.isString)(params['login_help_text']))) {
          _context3.next = 86;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: login_help_text must be of type String, received ".concat((0, _utils.getType)(params['login_help_text'])));
      case 86:
        if (!(params['smtp_address'] && !(0, _utils.isString)(params['smtp_address']))) {
          _context3.next = 88;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_address must be of type String, received ".concat((0, _utils.getType)(params['smtp_address'])));
      case 88:
        if (!(params['smtp_authentication'] && !(0, _utils.isString)(params['smtp_authentication']))) {
          _context3.next = 90;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_authentication must be of type String, received ".concat((0, _utils.getType)(params['smtp_authentication'])));
      case 90:
        if (!(params['smtp_from'] && !(0, _utils.isString)(params['smtp_from']))) {
          _context3.next = 92;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_from must be of type String, received ".concat((0, _utils.getType)(params['smtp_from'])));
      case 92:
        if (!(params['smtp_username'] && !(0, _utils.isString)(params['smtp_username']))) {
          _context3.next = 94;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_username must be of type String, received ".concat((0, _utils.getType)(params['smtp_username'])));
      case 94:
        if (!(params['smtp_port'] && !(0, _utils.isInt)(params['smtp_port']))) {
          _context3.next = 96;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_port must be of type Int, received ".concat((0, _utils.getType)(params['smtp_port'])));
      case 96:
        if (!(params['ldap_type'] && !(0, _utils.isString)(params['ldap_type']))) {
          _context3.next = 98;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_type must be of type String, received ".concat((0, _utils.getType)(params['ldap_type'])));
      case 98:
        if (!(params['ldap_host'] && !(0, _utils.isString)(params['ldap_host']))) {
          _context3.next = 100;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_host must be of type String, received ".concat((0, _utils.getType)(params['ldap_host'])));
      case 100:
        if (!(params['ldap_host_2'] && !(0, _utils.isString)(params['ldap_host_2']))) {
          _context3.next = 102;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_host_2 must be of type String, received ".concat((0, _utils.getType)(params['ldap_host_2'])));
      case 102:
        if (!(params['ldap_host_3'] && !(0, _utils.isString)(params['ldap_host_3']))) {
          _context3.next = 104;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_host_3 must be of type String, received ".concat((0, _utils.getType)(params['ldap_host_3'])));
      case 104:
        if (!(params['ldap_port'] && !(0, _utils.isInt)(params['ldap_port']))) {
          _context3.next = 106;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_port must be of type Int, received ".concat((0, _utils.getType)(params['ldap_port'])));
      case 106:
        if (!(params['ldap_username'] && !(0, _utils.isString)(params['ldap_username']))) {
          _context3.next = 108;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_username must be of type String, received ".concat((0, _utils.getType)(params['ldap_username'])));
      case 108:
        if (!(params['ldap_username_field'] && !(0, _utils.isString)(params['ldap_username_field']))) {
          _context3.next = 110;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_username_field must be of type String, received ".concat((0, _utils.getType)(params['ldap_username_field'])));
      case 110:
        if (!(params['ldap_domain'] && !(0, _utils.isString)(params['ldap_domain']))) {
          _context3.next = 112;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_domain must be of type String, received ".concat((0, _utils.getType)(params['ldap_domain'])));
      case 112:
        if (!(params['ldap_user_action'] && !(0, _utils.isString)(params['ldap_user_action']))) {
          _context3.next = 114;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_user_action must be of type String, received ".concat((0, _utils.getType)(params['ldap_user_action'])));
      case 114:
        if (!(params['ldap_group_action'] && !(0, _utils.isString)(params['ldap_group_action']))) {
          _context3.next = 116;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_group_action must be of type String, received ".concat((0, _utils.getType)(params['ldap_group_action'])));
      case 116:
        if (!(params['ldap_user_include_groups'] && !(0, _utils.isString)(params['ldap_user_include_groups']))) {
          _context3.next = 118;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_user_include_groups must be of type String, received ".concat((0, _utils.getType)(params['ldap_user_include_groups'])));
      case 118:
        if (!(params['ldap_group_exclusion'] && !(0, _utils.isString)(params['ldap_group_exclusion']))) {
          _context3.next = 120;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_group_exclusion must be of type String, received ".concat((0, _utils.getType)(params['ldap_group_exclusion'])));
      case 120:
        if (!(params['ldap_group_inclusion'] && !(0, _utils.isString)(params['ldap_group_inclusion']))) {
          _context3.next = 122;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_group_inclusion must be of type String, received ".concat((0, _utils.getType)(params['ldap_group_inclusion'])));
      case 122:
        if (!(params['ldap_base_dn'] && !(0, _utils.isString)(params['ldap_base_dn']))) {
          _context3.next = 124;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_base_dn must be of type String, received ".concat((0, _utils.getType)(params['ldap_base_dn'])));
      case 124:
        if (!(params['ldap_password_change'] && !(0, _utils.isString)(params['ldap_password_change']))) {
          _context3.next = 126;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_password_change must be of type String, received ".concat((0, _utils.getType)(params['ldap_password_change'])));
      case 126:
        if (!(params['ldap_password_change_confirmation'] && !(0, _utils.isString)(params['ldap_password_change_confirmation']))) {
          _context3.next = 128;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_password_change_confirmation must be of type String, received ".concat((0, _utils.getType)(params['ldap_password_change_confirmation'])));
      case 128:
        if (!(params['smtp_password'] && !(0, _utils.isString)(params['smtp_password']))) {
          _context3.next = 130;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_password must be of type String, received ".concat((0, _utils.getType)(params['smtp_password'])));
      case 130:
        if (!(params['session_expiry_minutes'] && !(0, _utils.isInt)(params['session_expiry_minutes']))) {
          _context3.next = 132;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: session_expiry_minutes must be of type Int, received ".concat((0, _utils.getType)(params['session_expiry_minutes'])));
      case 132:
        _context3.next = 134;
        return _Api.default.sendRequest("/site", 'PATCH', params, options);
      case 134:
        response = _context3.sent;
        return _context3.abrupt("return", new Site(response === null || response === void 0 ? void 0 : response.data, options));
      case 136:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = Site;
exports.default = _default;