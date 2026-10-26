"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _Site;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

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
  // int64 # Site Id
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // string # Site name
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  // array(string) # Additional extensions that are considered text files
  (0, _defineProperty2.default)(this, "getAdditionalTextFileTypes", function () {
    return _this.attributes.additional_text_file_types;
  });
  // object # Availability settings for AI features. Each feature requires the site_admins, workspace_admins, folder_admins, and all_users keys. Optional selected_group_members defaults to false; when true, members of at least one group in group_ids get access regardless of the other options. All availability options are additive: any enabled option matching the user grants access. Optional group_ids is an array of integer IDs of active groups on this site, from any workspace. Omitted or empty group_ids grants no access through selected_group_members and does not affect other options. Disabling all AI features overrides these settings.
  (0, _defineProperty2.default)(this, "getAiFeatureAvailability", function () {
    return _this.attributes.ai_feature_availability;
  });
  // boolean # Is SMS two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodSms", function () {
    return _this.attributes.allowed_2fa_method_sms;
  });
  // boolean # Is TOTP two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodTotp", function () {
    return _this.attributes.allowed_2fa_method_totp;
  });
  // boolean # Is WebAuthn two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodWebauthn", function () {
    return _this.attributes.allowed_2fa_method_webauthn;
  });
  // boolean # Is yubikey two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodYubi", function () {
    return _this.attributes.allowed_2fa_method_yubi;
  });
  // boolean # Is OTP via email two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodEmail", function () {
    return _this.attributes.allowed_2fa_method_email;
  });
  // boolean # Is OTP via static codes for two factor authentication allowed?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodStatic", function () {
    return _this.attributes.allowed_2fa_method_static;
  });
  // boolean # Are users allowed to configure their two factor authentication to be bypassed for FTP/SFTP/WebDAV?
  (0, _defineProperty2.default)(this, "getAllowed2faMethodBypassForFtpSftpDav", function () {
    return _this.attributes.allowed_2fa_method_bypass_for_ftp_sftp_dav;
  });
  // int64 # User ID for the main site administrator
  (0, _defineProperty2.default)(this, "getAdminUserId", function () {
    return _this.attributes.admin_user_id;
  });
  // boolean # Allow admins to bypass the locked subfolders setting.
  (0, _defineProperty2.default)(this, "getAdminsBypassLockedSubfolders", function () {
    return _this.attributes.admins_bypass_locked_subfolders;
  });
  // boolean # Are manual Bundle names allowed?
  (0, _defineProperty2.default)(this, "getAllowBundleNames", function () {
    return _this.attributes.allow_bundle_names;
  });
  // boolean # Allow the site-wide two-factor authentication requirement to be overriden on a per-user-basis?
  (0, _defineProperty2.default)(this, "getAllowUserLevel2faOverride", function () {
    return _this.attributes.allow_user_level_2fa_override;
  });
  // boolean # Allow the site-wide allowed IP restriction to be overriden on a per-user-basis?
  (0, _defineProperty2.default)(this, "getAllowUserLevelAllowedIpOverride", function () {
    return _this.attributes.allow_user_level_allowed_ip_override;
  });
  // boolean # Allow the site-wide FTP SSL requirement to be overriden on a per-user-basis?
  (0, _defineProperty2.default)(this, "getAllowUserLevelSslOverride", function () {
    return _this.attributes.allow_user_level_ssl_override;
  });
  // string # Comma separated list of allowed Country codes
  (0, _defineProperty2.default)(this, "getAllowedCountries", function () {
    return _this.attributes.allowed_countries;
  });
  // string # List of allowed IP addresses
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  // boolean # Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their existing IP restrictions. Applies to all Workspaces. Defaults to false.
  (0, _defineProperty2.default)(this, "getEnforceParentSiteUserIpRestrictions", function () {
    return _this.attributes.enforce_parent_site_user_ip_restrictions;
  });
  // boolean # Create parent directories if they do not exist during uploads?  This is primarily used to work around broken upload clients that assume servers will perform this step.
  (0, _defineProperty2.default)(this, "getAlwaysMkdirParents", function () {
    return _this.attributes.always_mkdir_parents;
  });
  // int64 # Number of days to retain AS2 messages (incoming and outgoing).
  (0, _defineProperty2.default)(this, "getAs2MessageRetentionDays", function () {
    return _this.attributes.as2_message_retention_days;
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
  // string # Custom error message to show when bundle is not found.
  (0, _defineProperty2.default)(this, "getBundleNotFoundMessage", function () {
    return _this.attributes.bundle_not_found_message;
  });
  // boolean # Do Bundles require password protection?
  (0, _defineProperty2.default)(this, "getBundlePasswordRequired", function () {
    return _this.attributes.bundle_password_required;
  });
  // boolean # If true, new Share Links created by a user with a primary group will default to that group as owner.
  (0, _defineProperty2.default)(this, "getBundlesDefaultOwnedByPrimaryGroup", function () {
    return _this.attributes.bundles_default_owned_by_primary_group;
  });
  // array(string) # List of email domains to disallow when entering a Bundle/Inbox recipients
  (0, _defineProperty2.default)(this, "getBundleRecipientBlacklistDomains", function () {
    return _this.attributes.bundle_recipient_blacklist_domains;
  });
  // boolean # Disallow free email domains for Bundle/Inbox recipients?
  (0, _defineProperty2.default)(this, "getBundleRecipientBlacklistFreeEmailDomains", function () {
    return _this.attributes.bundle_recipient_blacklist_free_email_domains;
  });
  // string # Do Bundle owners receive registration notification?
  (0, _defineProperty2.default)(this, "getBundleRegistrationNotifications", function () {
    return _this.attributes.bundle_registration_notifications;
  });
  // boolean # Do Bundles require registration?
  (0, _defineProperty2.default)(this, "getBundleRequireRegistration", function () {
    return _this.attributes.bundle_require_registration;
  });
  // boolean # Do Bundles require recipients for sharing?
  (0, _defineProperty2.default)(this, "getBundleRequireShareRecipient", function () {
    return _this.attributes.bundle_require_share_recipient;
  });
  // boolean # If true, new Share Links must send a one-time password to the recipient when they register. Requires bundle_require_share_recipient and cannot be enabled with bundle_password_required.
  (0, _defineProperty2.default)(this, "getBundleSendOneTimePasswordToRecipientAtRegistration", function () {
    return _this.attributes.bundle_send_one_time_password_to_recipient_at_registration;
  });
  // boolean # Do Bundles require internal notes?
  (0, _defineProperty2.default)(this, "getBundleRequireNote", function () {
    return _this.attributes.bundle_require_note;
  });
  // boolean # Do Bundle creators receive receipts of invitations?
  (0, _defineProperty2.default)(this, "getBundleSendSharedReceipts", function () {
    return _this.attributes.bundle_send_shared_receipts;
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
  // boolean # Calculate CRC32 checksums for files?
  (0, _defineProperty2.default)(this, "getCalculateFileChecksumsCrc32", function () {
    return _this.attributes.calculate_file_checksums_crc32;
  });
  // boolean # Calculate MD5 checksums for files?
  (0, _defineProperty2.default)(this, "getCalculateFileChecksumsMd5", function () {
    return _this.attributes.calculate_file_checksums_md5;
  });
  // boolean # Calculate SHA1 checksums for files?
  (0, _defineProperty2.default)(this, "getCalculateFileChecksumsSha1", function () {
    return _this.attributes.calculate_file_checksums_sha1;
  });
  // boolean # Calculate SHA256 checksums for files?
  (0, _defineProperty2.default)(this, "getCalculateFileChecksumsSha256", function () {
    return _this.attributes.calculate_file_checksums_sha256;
  });
  // boolean # If true, administrators on this site's Child Sites, including Folder Admins, can list this site's Default Workspace users and groups and grant them folder permissions and notifications on Child Site paths.
  (0, _defineProperty2.default)(this, "getChildSiteFolderAdminsCanSeeParentSiteDirectory", function () {
    return _this.attributes.child_site_folder_admins_can_see_parent_site_directory;
  });
  // boolean # If true, Workspace Administrators and Folder Admins in a Custom Workspace can list the Default Workspace users and groups that have permissions in that Workspace and choose them as Email Notification recipients.
  (0, _defineProperty2.default)(this, "getWorkspaceFolderAdminsCanSeeDefaultWorkspaceDirectory", function () {
    return _this.attributes.workspace_folder_admins_can_see_default_workspace_directory;
  });
  // boolean # Require email authentication, virus, and spam checks for incoming emails to Inboxes and Incoming Email Automations in every Workspace on this site?
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
  // boolean # Is WebDAV enabled?
  (0, _defineProperty2.default)(this, "getDavEnabled", function () {
    return _this.attributes.dav_enabled;
  });
  // boolean # Use user FTP roots also for WebDAV?
  (0, _defineProperty2.default)(this, "getDavUserRootEnabled", function () {
    return _this.attributes.dav_user_root_enabled;
  });
  // int64 # Number of days to keep deleted files
  (0, _defineProperty2.default)(this, "getDaysToRetainBackups", function () {
    return _this.attributes.days_to_retain_backups;
  });
  // boolean # If true, allow public viewers of Bundles with full permissions to use document editing integrations.
  (0, _defineProperty2.default)(this, "getDocumentEditsInBundleAllowed", function () {
    return _this.attributes.document_edits_in_bundle_allowed;
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
  // boolean # Use legacy checksums mode?
  (0, _defineProperty2.default)(this, "getLegacyChecksumsMode", function () {
    return _this.attributes.legacy_checksums_mode;
  });
  // boolean # If true, we will migrate all remote server syncs to the new Sync model.
  (0, _defineProperty2.default)(this, "getMigrateRemoteServerSyncToSync", function () {
    return _this.attributes.migrate_remote_server_sync_to_sync;
  });
  // boolean # Is OAuth DCR (dynamic client registration) for MCP enabled?
  (0, _defineProperty2.default)(this, "getMcpDcrEnabled", function () {
    return _this.attributes.mcp_dcr_enabled;
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
  // string # Comma separated list of disallowed Country codes
  (0, _defineProperty2.default)(this, "getDisallowedCountries", function () {
    return _this.attributes.disallowed_countries;
  });
  // boolean # If true, all AI features are disabled for this site.
  (0, _defineProperty2.default)(this, "getDisableAllAiFeatures", function () {
    return _this.attributes.disable_all_ai_features;
  });
  // boolean # If set, Files.com will not set the CAA records required to generate future SSL certificates for this domain.
  (0, _defineProperty2.default)(this, "getDisableFilesCertificateGeneration", function () {
    return _this.attributes.disable_files_certificate_generation;
  });
  // boolean # Are notifications disabled?
  (0, _defineProperty2.default)(this, "getDisableNotifications", function () {
    return _this.attributes.disable_notifications;
  });
  // boolean # If true, file operations produce file_action.activity.v1 EventChannel events in all workspaces. Defaults to false; subscription filters and workspace access still control delivery.
  (0, _defineProperty2.default)(this, "getFileActivityEventsEnabled", function () {
    return _this.attributes.file_activity_events_enabled;
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
  // string # Letsencrypt chain to use when registering SSL Certificate for domain. No longer used as of 2026.
  (0, _defineProperty2.default)(this, "getDomainLetsencryptChain", function () {
    return _this.attributes.domain_letsencrypt_chain;
  });
  // email # Main email for this site
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  // boolean # Are FedRAMP security restrictions enabled for this site?
  (0, _defineProperty2.default)(this, "getFedramp", function () {
    return _this.attributes.fedramp;
  });
  // boolean # Allow other Files.com sites to use this site's API keys for native Files.com Remote Server connections? Defaults to true and applies to all keys and workspaces on this site. When false, new pairings and access through existing connections are rejected without revoking keys or deleting connections. Re-enabling permits access again with usable keys. Does not disable this site's connections to other sites, ordinary API access, or Connected Sites.
  (0, _defineProperty2.default)(this, "getFilesComRemoteServerEnabled", function () {
    return _this.attributes.files_com_remote_server_enabled;
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
  // boolean # If true, permissions for this site must be bound to a group (not a user).
  (0, _defineProperty2.default)(this, "getFolderPermissionsGroupsOnly", function () {
    return _this.attributes.folder_permissions_groups_only;
  });
  // boolean # Allow group admins to create users in their groups
  (0, _defineProperty2.default)(this, "getGroupAdminsCanAddUsers", function () {
    return _this.attributes.group_admins_can_add_users;
  });
  // boolean # Allow group admins to add or remove existing users in their groups
  (0, _defineProperty2.default)(this, "getGroupAdminsCanManageGroupMemberships", function () {
    return _this.attributes.group_admins_can_manage_group_memberships;
  });
  // boolean # Allow group admins to delete users in their groups
  (0, _defineProperty2.default)(this, "getGroupAdminsCanDeleteUsers", function () {
    return _this.attributes.group_admins_can_delete_users;
  });
  // boolean # Allow group admins to enable or disable users in their groups
  (0, _defineProperty2.default)(this, "getGroupAdminsCanEnableDisableUsers", function () {
    return _this.attributes.group_admins_can_enable_disable_users;
  });
  // boolean # Allow group admins to modify users in their groups
  (0, _defineProperty2.default)(this, "getGroupAdminsCanModifyUsers", function () {
    return _this.attributes.group_admins_can_modify_users;
  });
  // boolean # Allow group admins to exempt users in their groups from lifecycle rules
  (0, _defineProperty2.default)(this, "getGroupAdminsCanBypassUserLifecycleRules", function () {
    return _this.attributes.group_admins_can_bypass_user_lifecycle_rules;
  });
  // boolean # Allow group admins to reset passwords for users in their groups
  (0, _defineProperty2.default)(this, "getGroupAdminsCanResetPasswords", function () {
    return _this.attributes.group_admins_can_reset_passwords;
  });
  // boolean # Allow group admins to set password authentication method
  (0, _defineProperty2.default)(this, "getGroupAdminsCanSetUserPassword", function () {
    return _this.attributes.group_admins_can_set_user_password;
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
  // string # How to validate the LDAP server certificate. `require_match` validates the certificate chain and hostname; `allow_any` disables certificate validation.
  (0, _defineProperty2.default)(this, "getLdapServerCertificate", function () {
    return _this.attributes.ldap_server_certificate;
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
  // Image # Branded login page background
  (0, _defineProperty2.default)(this, "getLoginPageBackgroundImage", function () {
    return _this.attributes.login_page_background_image;
  });
  // int64 # Number of prior passwords to disallow
  (0, _defineProperty2.default)(this, "getMaxPriorPasswords", function () {
    return _this.attributes.max_prior_passwords;
  });
  // object # Site settings managed by the parent site. Each key identifies a managed setting, with a null value. Non-secret effective values are returned in their own Site settings fields.
  (0, _defineProperty2.default)(this, "getManagedSiteSettings", function () {
    return _this.attributes.managed_site_settings;
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
  // decimal # Next billing amount
  (0, _defineProperty2.default)(this, "getNextBillingAmount", function () {
    return _this.attributes.next_billing_amount;
  });
  // string # Next billing date
  (0, _defineProperty2.default)(this, "getNextBillingDate", function () {
    return _this.attributes.next_billing_date;
  });
  // boolean # If true, allows users to use a document editing integration.
  (0, _defineProperty2.default)(this, "getOfficeIntegrationAvailable", function () {
    return _this.attributes.office_integration_available;
  });
  // string # Which document editing integration to support. Files.com Editor or Microsoft Office for the Web.
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
  // boolean # If true, protocol access permissions on users will be ignored, and only protocol access permissions set on Groups will be honored.  Make sure that your current user is a member of a group with API permission when changing this value to avoid locking yourself out of your site.
  (0, _defineProperty2.default)(this, "getProtocolAccessGroupsOnly", function () {
    return _this.attributes.protocol_access_groups_only;
  });
  // boolean # Require two-factor authentication for all users?
  (0, _defineProperty2.default)(this, "getRequire2fa", function () {
    return _this.attributes.require_2fa;
  });
  // boolean # If true, only site admins may create, modify, or delete any behavior at the site root, or a skip that would disable one.
  (0, _defineProperty2.default)(this, "getRestrictRootFolderBehaviorsToSiteAdmins", function () {
    return _this.attributes.restrict_root_folder_behaviors_to_site_admins;
  });
  // boolean # If true, supported protective behaviors at the site root also apply within named workspaces. Requires restrict_root_folder_behaviors_to_site_admins to be enabled.
  (0, _defineProperty2.default)(this, "getRootFolderBehaviorsApplyToWorkspaces", function () {
    return _this.attributes.root_folder_behaviors_apply_to_workspaces;
  });
  // boolean # If true, SSO users using the default user-level two-factor authentication setting are exempt from the site-wide two-factor authentication requirement.
  (0, _defineProperty2.default)(this, "getRequire2faExemptAllSsoUsers", function () {
    return _this.attributes.require_2fa_exempt_all_sso_users;
  });
  // date-time # If set, requirement for two-factor authentication has been scheduled to end on this date-time.
  (0, _defineProperty2.default)(this, "getRequire2faStopTime", function () {
    return _this.attributes.require_2fa_stop_time;
  });
  // boolean # Auto-removes bundles for disabled/deleted users and enforces bundle expiry within user access period.
  (0, _defineProperty2.default)(this, "getRevokeBundleAccessOnDisableOrDelete", function () {
    return _this.attributes.revoke_bundle_access_on_disable_or_delete;
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
  // boolean # Is the S3-compatible endpoint enabled for all users and workspaces on this site? Defaults to true. When false, user and group S3 permissions do not allow access.
  (0, _defineProperty2.default)(this, "getS3CompatibleEndpointEnabled", function () {
    return _this.attributes.s3_compatible_endpoint_enabled;
  });
  // boolean # Is SFTP enabled?
  (0, _defineProperty2.default)(this, "getSftpEnabled", function () {
    return _this.attributes.sftp_enabled;
  });
  // boolean # Finalize partial SFTP uploads from interrupted connections? Default: true.
  (0, _defineProperty2.default)(this, "getSftpFinalizePartialUploads", function () {
    return _this.attributes.sftp_finalize_partial_uploads;
  });
  // string # Sftp Host Key Type
  (0, _defineProperty2.default)(this, "getSftpHostKeyType", function () {
    return _this.attributes.sftp_host_key_type;
  });
  // int64 # Id of the currently selected custom SFTP Host Key
  (0, _defineProperty2.default)(this, "getActiveSftpHostKeyId", function () {
    return _this.attributes.active_sftp_host_key_id;
  });
  // array(int64) # Ids of the selected custom SFTP Host Keys
  (0, _defineProperty2.default)(this, "getActiveSftpHostKeyIds", function () {
    return _this.attributes.active_sftp_host_key_ids;
  });
  // boolean # If true, we will allow weak and known insecure ciphers to be used for SFTP connections.  Enabling this setting severely weakens the security of your site and it is not recommend, except as a last resort for compatibility.
  (0, _defineProperty2.default)(this, "getSftpInsecureCiphers", function () {
    return _this.attributes.sftp_insecure_ciphers;
  });
  // boolean # If true, we will allow weak Diffie Hellman parameters to be used within ciphers for SFTP that are otherwise on our secure list.  This has the effect of making the cipher weaker than our normal threshold for security, but is required to support certain legacy or broken SSH and MFT clients.  Enabling this weakens security, but not nearly as much as enabling the full `sftp_insecure_ciphers` option.
  (0, _defineProperty2.default)(this, "getSftpInsecureDiffieHellman", function () {
    return _this.attributes.sftp_insecure_diffie_hellman;
  });
  // boolean # Use user FTP roots also for SFTP?
  (0, _defineProperty2.default)(this, "getSftpUserRootEnabled", function () {
    return _this.attributes.sftp_user_root_enabled;
  });
  // boolean # Allow bundle creation
  (0, _defineProperty2.default)(this, "getSharingEnabled", function () {
    return _this.attributes.sharing_enabled;
  });
  // boolean # Show log in link in user notifications?
  (0, _defineProperty2.default)(this, "getShowUserNotificationsLogInLink", function () {
    return _this.attributes.show_user_notifications_log_in_link;
  });
  // boolean # Show request access link for users without access?  Currently unused.
  (0, _defineProperty2.default)(this, "getShowRequestAccessLink", function () {
    return _this.attributes.show_request_access_link;
  });
  // string # Custom site footer text for authenticated pages
  (0, _defineProperty2.default)(this, "getSiteFooter", function () {
    return _this.attributes.site_footer;
  });
  // string # Custom site header text for authenticated pages
  (0, _defineProperty2.default)(this, "getSiteHeader", function () {
    return _this.attributes.site_header;
  });
  // string # Custom site footer text for public pages
  (0, _defineProperty2.default)(this, "getSitePublicFooter", function () {
    return _this.attributes.site_public_footer;
  });
  // string # Custom site header text for public pages
  (0, _defineProperty2.default)(this, "getSitePublicHeader", function () {
    return _this.attributes.site_public_header;
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
  // string # Custom SMTP encryption mode: if_available (default) uses STARTTLS when offered and otherwise sends credentials and messages unencrypted. A certificate-verified STARTTLS connection automatically changes if_available to require unless smtp_ssl is managed by a parent policy. require requires STARTTLS before authentication; require_implicit uses TLS from connection start; never disables TLS. TLS verifies the server certificate against smtp_address. Encryption is never automatically downgraded.
  (0, _defineProperty2.default)(this, "getSmtpSsl", function () {
    return _this.attributes.smtp_ssl;
  });
  // string # SMTP server username
  (0, _defineProperty2.default)(this, "getSmtpUsername", function () {
    return _this.attributes.smtp_username;
  });
  // int64 # Session expiry in minutes
  (0, _defineProperty2.default)(this, "getSessionExpiryMinutes", function () {
    return _this.attributes.session_expiry_minutes;
  });
  // boolean # Allow snapshot share links creation
  (0, _defineProperty2.default)(this, "getSnapshotSharingEnabled", function () {
    return _this.attributes.snapshot_sharing_enabled;
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
  // int64 # Number of days left in trial
  (0, _defineProperty2.default)(this, "getTrialDaysLeft", function () {
    return _this.attributes.trial_days_left;
  });
  // date-time # When does this Site trial expire?
  (0, _defineProperty2.default)(this, "getTrialUntil", function () {
    return _this.attributes.trial_until;
  });
  // boolean # If using custom SMTP, should we use dedicated IPs to deliver emails?
  (0, _defineProperty2.default)(this, "getUseDedicatedIpsForSmtp", function () {
    return _this.attributes.use_dedicated_ips_for_smtp;
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
  // boolean # Allow users to create their own API keys?
  (0, _defineProperty2.default)(this, "getUsersCanCreateApiKeys", function () {
    return _this.attributes.users_can_create_api_keys;
  });
  // boolean # Allow users to create their own SSH keys?
  (0, _defineProperty2.default)(this, "getUsersCanCreateSshKeys", function () {
    return _this.attributes.users_can_create_ssh_keys;
  });
  // string # How usernames are displayed in the web UI. Can be `username_only`, `full_name_only`, `full_name_username`, `full_name_company`, or `full_name_username_company`.
  (0, _defineProperty2.default)(this, "getUsernameDisplay", function () {
    return _this.attributes.username_display;
  });
  // string # Custom text send in user welcome email
  (0, _defineProperty2.default)(this, "getWelcomeCustomText", function () {
    return _this.attributes.welcome_custom_text;
  });
  // string # Custom footer text for system-generated emails (as Markdown). Supports standard strftime date/time patterns like %Y (4-digit year), %m (month), %d (day).
  (0, _defineProperty2.default)(this, "getEmailFooterCustomText", function () {
    return _this.attributes.email_footer_custom_text;
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
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Site = Site;
(0, _defineProperty2.default)(Site, "get", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
  var options,
    response,
    _args = arguments;
  return _regenerator.default.wrap(function (_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
        _context.next = 1;
        return _Api.default.sendRequest('/site', 'GET', {}, options);
      case 1:
        response = _context.sent;
        return _context.abrupt("return", new _Site(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 2:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
(0, _defineProperty2.default)(Site, "getUsage", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var options,
    response,
    UsageSnapshot,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        _context2.next = 1;
        return _Api.default.sendRequest('/site/usage', 'GET', {}, options);
      case 1:
        response = _context2.sent;
        UsageSnapshot = require('./UsageSnapshot.js').default;
        return _context2.abrupt("return", new UsageSnapshot(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 2:
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
//   enforce_parent_site_user_ip_restrictions - boolean - Require Parent Site users entering this Child Site to match its allowed IP addresses in addition to their existing IP restrictions. Applies to all Workspaces. Defaults to false.
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
(0, _defineProperty2.default)(Site, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
    options,
    response,
    _args3 = arguments;
  return _regenerator.default.wrap(function (_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
        options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context3.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 1:
        if (!(params.subdomain !== undefined && params.subdomain !== null && !(0, _utils.isString)(params.subdomain))) {
          _context3.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: subdomain must be of type String, received ".concat((0, _utils.getType)(params.subdomain)));
      case 2:
        if (!(params.domain !== undefined && params.domain !== null && !(0, _utils.isString)(params.domain))) {
          _context3.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: domain must be of type String, received ".concat((0, _utils.getType)(params.domain)));
      case 3:
        if (!((0, _utils.isArray)(params.domain_hsts_header) || (0, _utils.isObject)(params.domain_hsts_header))) {
          _context3.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: domain_hsts_header must be of type Boolean, received ".concat((0, _utils.getType)(params.domain_hsts_header)));
      case 4:
        if (!(params.domain_letsencrypt_chain !== undefined && params.domain_letsencrypt_chain !== null && !(0, _utils.isString)(params.domain_letsencrypt_chain))) {
          _context3.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: domain_letsencrypt_chain must be of type String, received ".concat((0, _utils.getType)(params.domain_letsencrypt_chain)));
      case 5:
        if (!(params.email !== undefined && params.email !== null && !(0, _utils.isString)(params.email))) {
          _context3.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(params.email)));
      case 6:
        if (!(params.reply_to_email !== undefined && params.reply_to_email !== null && !(0, _utils.isString)(params.reply_to_email))) {
          _context3.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: reply_to_email must be of type String, received ".concat((0, _utils.getType)(params.reply_to_email)));
      case 7:
        if (!((0, _utils.isArray)(params.allow_bundle_names) || (0, _utils.isObject)(params.allow_bundle_names))) {
          _context3.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allow_bundle_names must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_bundle_names)));
      case 8:
        if (!(params.bundle_expiration !== undefined && params.bundle_expiration !== null && !(0, _utils.isInt)(params.bundle_expiration))) {
          _context3.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_expiration must be of type Int, received ".concat((0, _utils.getType)(params.bundle_expiration)));
      case 9:
        if (!((0, _utils.isArray)(params.welcome_email_enabled) || (0, _utils.isObject)(params.welcome_email_enabled))) {
          _context3.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_email_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.welcome_email_enabled)));
      case 10:
        if (!((0, _utils.isArray)(params.ask_about_overwrites) || (0, _utils.isObject)(params.ask_about_overwrites))) {
          _context3.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ask_about_overwrites must be of type Boolean, received ".concat((0, _utils.getType)(params.ask_about_overwrites)));
      case 11:
        if (!((0, _utils.isArray)(params.show_request_access_link) || (0, _utils.isObject)(params.show_request_access_link))) {
          _context3.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: show_request_access_link must be of type Boolean, received ".concat((0, _utils.getType)(params.show_request_access_link)));
      case 12:
        if (!((0, _utils.isArray)(params.always_mkdir_parents) || (0, _utils.isObject)(params.always_mkdir_parents))) {
          _context3.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: always_mkdir_parents must be of type Boolean, received ".concat((0, _utils.getType)(params.always_mkdir_parents)));
      case 13:
        if (!(params.welcome_email_cc !== undefined && params.welcome_email_cc !== null && !(0, _utils.isString)(params.welcome_email_cc))) {
          _context3.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_email_cc must be of type String, received ".concat((0, _utils.getType)(params.welcome_email_cc)));
      case 14:
        if (!(params.welcome_email_subject !== undefined && params.welcome_email_subject !== null && !(0, _utils.isString)(params.welcome_email_subject))) {
          _context3.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_email_subject must be of type String, received ".concat((0, _utils.getType)(params.welcome_email_subject)));
      case 15:
        if (!(params.welcome_custom_text !== undefined && params.welcome_custom_text !== null && !(0, _utils.isString)(params.welcome_custom_text))) {
          _context3.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_custom_text must be of type String, received ".concat((0, _utils.getType)(params.welcome_custom_text)));
      case 16:
        if (!(params.language !== undefined && params.language !== null && !(0, _utils.isString)(params.language))) {
          _context3.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(params.language)));
      case 17:
        if (!((0, _utils.isArray)(params.windows_mode_ftp) || (0, _utils.isObject)(params.windows_mode_ftp))) {
          _context3.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: windows_mode_ftp must be of type Boolean, received ".concat((0, _utils.getType)(params.windows_mode_ftp)));
      case 18:
        if (!(params.default_time_zone !== undefined && params.default_time_zone !== null && !(0, _utils.isString)(params.default_time_zone))) {
          _context3.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: default_time_zone must be of type String, received ".concat((0, _utils.getType)(params.default_time_zone)));
      case 19:
        if (!((0, _utils.isArray)(params.desktop_app) || (0, _utils.isObject)(params.desktop_app))) {
          _context3.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: desktop_app must be of type Boolean, received ".concat((0, _utils.getType)(params.desktop_app)));
      case 20:
        if (!((0, _utils.isArray)(params.desktop_app_session_ip_pinning) || (0, _utils.isObject)(params.desktop_app_session_ip_pinning))) {
          _context3.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: desktop_app_session_ip_pinning must be of type Boolean, received ".concat((0, _utils.getType)(params.desktop_app_session_ip_pinning)));
      case 21:
        if (!(params.desktop_app_session_lifetime !== undefined && params.desktop_app_session_lifetime !== null && !(0, _utils.isInt)(params.desktop_app_session_lifetime))) {
          _context3.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: desktop_app_session_lifetime must be of type Int, received ".concat((0, _utils.getType)(params.desktop_app_session_lifetime)));
      case 22:
        if (!((0, _utils.isArray)(params.mobile_app) || (0, _utils.isObject)(params.mobile_app))) {
          _context3.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: mobile_app must be of type Boolean, received ".concat((0, _utils.getType)(params.mobile_app)));
      case 23:
        if (!((0, _utils.isArray)(params.mobile_app_session_ip_pinning) || (0, _utils.isObject)(params.mobile_app_session_ip_pinning))) {
          _context3.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: mobile_app_session_ip_pinning must be of type Boolean, received ".concat((0, _utils.getType)(params.mobile_app_session_ip_pinning)));
      case 24:
        if (!(params.mobile_app_session_lifetime !== undefined && params.mobile_app_session_lifetime !== null && !(0, _utils.isInt)(params.mobile_app_session_lifetime))) {
          _context3.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: mobile_app_session_lifetime must be of type Int, received ".concat((0, _utils.getType)(params.mobile_app_session_lifetime)));
      case 25:
        if (!((0, _utils.isArray)(params.folder_permissions_groups_only) || (0, _utils.isObject)(params.folder_permissions_groups_only))) {
          _context3.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: folder_permissions_groups_only must be of type Boolean, received ".concat((0, _utils.getType)(params.folder_permissions_groups_only)));
      case 26:
        if (!(params.welcome_screen !== undefined && params.welcome_screen !== null && !(0, _utils.isString)(params.welcome_screen))) {
          _context3.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: welcome_screen must be of type String, received ".concat((0, _utils.getType)(params.welcome_screen)));
      case 27:
        if (!((0, _utils.isArray)(params.office_integration_available) || (0, _utils.isObject)(params.office_integration_available))) {
          _context3.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: office_integration_available must be of type Boolean, received ".concat((0, _utils.getType)(params.office_integration_available)));
      case 28:
        if (!(params.office_integration_type !== undefined && params.office_integration_type !== null && !(0, _utils.isString)(params.office_integration_type))) {
          _context3.next = 29;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: office_integration_type must be of type String, received ".concat((0, _utils.getType)(params.office_integration_type)));
      case 29:
        if (!((0, _utils.isArray)(params.pin_all_remote_servers_to_site_region) || (0, _utils.isObject)(params.pin_all_remote_servers_to_site_region))) {
          _context3.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: pin_all_remote_servers_to_site_region must be of type Boolean, received ".concat((0, _utils.getType)(params.pin_all_remote_servers_to_site_region)));
      case 30:
        if (!(params.motd_text !== undefined && params.motd_text !== null && !(0, _utils.isString)(params.motd_text))) {
          _context3.next = 31;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: motd_text must be of type String, received ".concat((0, _utils.getType)(params.motd_text)));
      case 31:
        if (!((0, _utils.isArray)(params.motd_use_for_ftp) || (0, _utils.isObject)(params.motd_use_for_ftp))) {
          _context3.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: motd_use_for_ftp must be of type Boolean, received ".concat((0, _utils.getType)(params.motd_use_for_ftp)));
      case 32:
        if (!((0, _utils.isArray)(params.motd_use_for_sftp) || (0, _utils.isObject)(params.motd_use_for_sftp))) {
          _context3.next = 33;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: motd_use_for_sftp must be of type Boolean, received ".concat((0, _utils.getType)(params.motd_use_for_sftp)));
      case 33:
        if (!((0, _utils.isArray)(params.disable_all_ai_features) || (0, _utils.isObject)(params.disable_all_ai_features))) {
          _context3.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disable_all_ai_features must be of type Boolean, received ".concat((0, _utils.getType)(params.disable_all_ai_features)));
      case 34:
        if (!((0, _utils.isArray)(params.mcp_dcr_enabled) || (0, _utils.isObject)(params.mcp_dcr_enabled))) {
          _context3.next = 35;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: mcp_dcr_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.mcp_dcr_enabled)));
      case 35:
        if (!(params.additional_text_file_types !== undefined && params.additional_text_file_types !== null && !(0, _utils.isArray)(params.additional_text_file_types))) {
          _context3.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: additional_text_file_types must be of type Array, received ".concat((0, _utils.getType)(params.additional_text_file_types)));
      case 36:
        if (!((0, _utils.isArray)(params.bundle_require_note) || (0, _utils.isObject)(params.bundle_require_note))) {
          _context3.next = 37;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_require_note must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_require_note)));
      case 37:
        if (!((0, _utils.isArray)(params.bundle_send_shared_receipts) || (0, _utils.isObject)(params.bundle_send_shared_receipts))) {
          _context3.next = 38;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_send_shared_receipts must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_send_shared_receipts)));
      case 38:
        if (!((0, _utils.isArray)(params.bundles_default_owned_by_primary_group) || (0, _utils.isObject)(params.bundles_default_owned_by_primary_group))) {
          _context3.next = 39;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundles_default_owned_by_primary_group must be of type Boolean, received ".concat((0, _utils.getType)(params.bundles_default_owned_by_primary_group)));
      case 39:
        if (!((0, _utils.isArray)(params.calculate_file_checksums_crc32) || (0, _utils.isObject)(params.calculate_file_checksums_crc32))) {
          _context3.next = 40;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: calculate_file_checksums_crc32 must be of type Boolean, received ".concat((0, _utils.getType)(params.calculate_file_checksums_crc32)));
      case 40:
        if (!((0, _utils.isArray)(params.calculate_file_checksums_md5) || (0, _utils.isObject)(params.calculate_file_checksums_md5))) {
          _context3.next = 41;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: calculate_file_checksums_md5 must be of type Boolean, received ".concat((0, _utils.getType)(params.calculate_file_checksums_md5)));
      case 41:
        if (!((0, _utils.isArray)(params.calculate_file_checksums_sha1) || (0, _utils.isObject)(params.calculate_file_checksums_sha1))) {
          _context3.next = 42;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: calculate_file_checksums_sha1 must be of type Boolean, received ".concat((0, _utils.getType)(params.calculate_file_checksums_sha1)));
      case 42:
        if (!((0, _utils.isArray)(params.calculate_file_checksums_sha256) || (0, _utils.isObject)(params.calculate_file_checksums_sha256))) {
          _context3.next = 43;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: calculate_file_checksums_sha256 must be of type Boolean, received ".concat((0, _utils.getType)(params.calculate_file_checksums_sha256)));
      case 43:
        if (!((0, _utils.isArray)(params.legacy_checksums_mode) || (0, _utils.isObject)(params.legacy_checksums_mode))) {
          _context3.next = 44;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: legacy_checksums_mode must be of type Boolean, received ".concat((0, _utils.getType)(params.legacy_checksums_mode)));
      case 44:
        if (!((0, _utils.isArray)(params.migrate_remote_server_sync_to_sync) || (0, _utils.isObject)(params.migrate_remote_server_sync_to_sync))) {
          _context3.next = 45;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: migrate_remote_server_sync_to_sync must be of type Boolean, received ".concat((0, _utils.getType)(params.migrate_remote_server_sync_to_sync)));
      case 45:
        if (!(params.as2_message_retention_days !== undefined && params.as2_message_retention_days !== null && !(0, _utils.isInt)(params.as2_message_retention_days))) {
          _context3.next = 46;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: as2_message_retention_days must be of type Int, received ".concat((0, _utils.getType)(params.as2_message_retention_days)));
      case 46:
        if (!((0, _utils.isArray)(params.file_activity_events_enabled) || (0, _utils.isObject)(params.file_activity_events_enabled))) {
          _context3.next = 47;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_activity_events_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.file_activity_events_enabled)));
      case 47:
        if (!(params.username_display !== undefined && params.username_display !== null && !(0, _utils.isString)(params.username_display))) {
          _context3.next = 48;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username_display must be of type String, received ".concat((0, _utils.getType)(params.username_display)));
      case 48:
        if (!(params.session_expiry_minutes !== undefined && params.session_expiry_minutes !== null && !(0, _utils.isInt)(params.session_expiry_minutes))) {
          _context3.next = 49;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: session_expiry_minutes must be of type Int, received ".concat((0, _utils.getType)(params.session_expiry_minutes)));
      case 49:
        if (!((0, _utils.isArray)(params.ssl_required) || (0, _utils.isObject)(params.ssl_required))) {
          _context3.next = 50;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl_required must be of type Boolean, received ".concat((0, _utils.getType)(params.ssl_required)));
      case 50:
        if (!((0, _utils.isArray)(params.sftp_insecure_ciphers) || (0, _utils.isObject)(params.sftp_insecure_ciphers))) {
          _context3.next = 51;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_insecure_ciphers must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_insecure_ciphers)));
      case 51:
        if (!((0, _utils.isArray)(params.sftp_insecure_diffie_hellman) || (0, _utils.isObject)(params.sftp_insecure_diffie_hellman))) {
          _context3.next = 52;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_insecure_diffie_hellman must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_insecure_diffie_hellman)));
      case 52:
        if (!((0, _utils.isArray)(params.disable_files_certificate_generation) || (0, _utils.isObject)(params.disable_files_certificate_generation))) {
          _context3.next = 53;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disable_files_certificate_generation must be of type Boolean, received ".concat((0, _utils.getType)(params.disable_files_certificate_generation)));
      case 53:
        if (!((0, _utils.isArray)(params.fedramp) || (0, _utils.isObject)(params.fedramp))) {
          _context3.next = 54;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: fedramp must be of type Boolean, received ".concat((0, _utils.getType)(params.fedramp)));
      case 54:
        if (!((0, _utils.isArray)(params.user_lockout) || (0, _utils.isObject)(params.user_lockout))) {
          _context3.next = 55;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout must be of type Boolean, received ".concat((0, _utils.getType)(params.user_lockout)));
      case 55:
        if (!(params.user_lockout_tries !== undefined && params.user_lockout_tries !== null && !(0, _utils.isInt)(params.user_lockout_tries))) {
          _context3.next = 56;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout_tries must be of type Int, received ".concat((0, _utils.getType)(params.user_lockout_tries)));
      case 56:
        if (!(params.user_lockout_within !== undefined && params.user_lockout_within !== null && !(0, _utils.isInt)(params.user_lockout_within))) {
          _context3.next = 57;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout_within must be of type Int, received ".concat((0, _utils.getType)(params.user_lockout_within)));
      case 57:
        if (!(params.user_lockout_lock_period !== undefined && params.user_lockout_lock_period !== null && !(0, _utils.isInt)(params.user_lockout_lock_period))) {
          _context3.next = 58;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_lockout_lock_period must be of type Int, received ".concat((0, _utils.getType)(params.user_lockout_lock_period)));
      case 58:
        if (!((0, _utils.isArray)(params.include_password_in_welcome_email) || (0, _utils.isObject)(params.include_password_in_welcome_email))) {
          _context3.next = 59;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: include_password_in_welcome_email must be of type Boolean, received ".concat((0, _utils.getType)(params.include_password_in_welcome_email)));
      case 59:
        if (!(params.allowed_countries !== undefined && params.allowed_countries !== null && !(0, _utils.isString)(params.allowed_countries))) {
          _context3.next = 60;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_countries must be of type String, received ".concat((0, _utils.getType)(params.allowed_countries)));
      case 60:
        if (!(params.allowed_ips !== undefined && params.allowed_ips !== null && !(0, _utils.isString)(params.allowed_ips))) {
          _context3.next = 61;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(params.allowed_ips)));
      case 61:
        if (!((0, _utils.isArray)(params.allow_user_level_2fa_override) || (0, _utils.isObject)(params.allow_user_level_2fa_override))) {
          _context3.next = 62;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allow_user_level_2fa_override must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_user_level_2fa_override)));
      case 62:
        if (!((0, _utils.isArray)(params.allow_user_level_allowed_ip_override) || (0, _utils.isObject)(params.allow_user_level_allowed_ip_override))) {
          _context3.next = 63;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allow_user_level_allowed_ip_override must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_user_level_allowed_ip_override)));
      case 63:
        if (!((0, _utils.isArray)(params.allow_user_level_ssl_override) || (0, _utils.isObject)(params.allow_user_level_ssl_override))) {
          _context3.next = 64;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allow_user_level_ssl_override must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_user_level_ssl_override)));
      case 64:
        if (!((0, _utils.isArray)(params.enforce_parent_site_user_ip_restrictions) || (0, _utils.isObject)(params.enforce_parent_site_user_ip_restrictions))) {
          _context3.next = 65;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: enforce_parent_site_user_ip_restrictions must be of type Boolean, received ".concat((0, _utils.getType)(params.enforce_parent_site_user_ip_restrictions)));
      case 65:
        if (!(params.disallowed_countries !== undefined && params.disallowed_countries !== null && !(0, _utils.isString)(params.disallowed_countries))) {
          _context3.next = 66;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disallowed_countries must be of type String, received ".concat((0, _utils.getType)(params.disallowed_countries)));
      case 66:
        if (!(params.days_to_retain_backups !== undefined && params.days_to_retain_backups !== null && !(0, _utils.isInt)(params.days_to_retain_backups))) {
          _context3.next = 67;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: days_to_retain_backups must be of type Int, received ".concat((0, _utils.getType)(params.days_to_retain_backups)));
      case 67:
        if (!(params.max_prior_passwords !== undefined && params.max_prior_passwords !== null && !(0, _utils.isInt)(params.max_prior_passwords))) {
          _context3.next = 68;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_prior_passwords must be of type Int, received ".concat((0, _utils.getType)(params.max_prior_passwords)));
      case 68:
        if (!(params.password_validity_days !== undefined && params.password_validity_days !== null && !(0, _utils.isInt)(params.password_validity_days))) {
          _context3.next = 69;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(params.password_validity_days)));
      case 69:
        if (!(params.password_min_length !== undefined && params.password_min_length !== null && !(0, _utils.isInt)(params.password_min_length))) {
          _context3.next = 70;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_min_length must be of type Int, received ".concat((0, _utils.getType)(params.password_min_length)));
      case 70:
        if (!((0, _utils.isArray)(params.password_require_letter) || (0, _utils.isObject)(params.password_require_letter))) {
          _context3.next = 71;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_require_letter must be of type Boolean, received ".concat((0, _utils.getType)(params.password_require_letter)));
      case 71:
        if (!((0, _utils.isArray)(params.password_require_mixed) || (0, _utils.isObject)(params.password_require_mixed))) {
          _context3.next = 72;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_require_mixed must be of type Boolean, received ".concat((0, _utils.getType)(params.password_require_mixed)));
      case 72:
        if (!((0, _utils.isArray)(params.password_require_special) || (0, _utils.isObject)(params.password_require_special))) {
          _context3.next = 73;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_require_special must be of type Boolean, received ".concat((0, _utils.getType)(params.password_require_special)));
      case 73:
        if (!((0, _utils.isArray)(params.password_require_number) || (0, _utils.isObject)(params.password_require_number))) {
          _context3.next = 74;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_require_number must be of type Boolean, received ".concat((0, _utils.getType)(params.password_require_number)));
      case 74:
        if (!((0, _utils.isArray)(params.password_require_unbreached) || (0, _utils.isObject)(params.password_require_unbreached))) {
          _context3.next = 75;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_require_unbreached must be of type Boolean, received ".concat((0, _utils.getType)(params.password_require_unbreached)));
      case 75:
        if (!((0, _utils.isArray)(params.require_logout_from_bundles_and_inboxes) || (0, _utils.isObject)(params.require_logout_from_bundles_and_inboxes))) {
          _context3.next = 76;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_logout_from_bundles_and_inboxes must be of type Boolean, received ".concat((0, _utils.getType)(params.require_logout_from_bundles_and_inboxes)));
      case 76:
        if (!((0, _utils.isArray)(params.dav_user_root_enabled) || (0, _utils.isObject)(params.dav_user_root_enabled))) {
          _context3.next = 77;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dav_user_root_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.dav_user_root_enabled)));
      case 77:
        if (!((0, _utils.isArray)(params.sftp_user_root_enabled) || (0, _utils.isObject)(params.sftp_user_root_enabled))) {
          _context3.next = 78;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_user_root_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_user_root_enabled)));
      case 78:
        if (!((0, _utils.isArray)(params.disable_password_reset) || (0, _utils.isObject)(params.disable_password_reset))) {
          _context3.next = 79;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disable_password_reset must be of type Boolean, received ".concat((0, _utils.getType)(params.disable_password_reset)));
      case 79:
        if (!((0, _utils.isArray)(params.immutable_files) || (0, _utils.isObject)(params.immutable_files))) {
          _context3.next = 80;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: immutable_files must be of type Boolean, received ".concat((0, _utils.getType)(params.immutable_files)));
      case 80:
        if (!(params.bundle_not_found_message !== undefined && params.bundle_not_found_message !== null && !(0, _utils.isString)(params.bundle_not_found_message))) {
          _context3.next = 81;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_not_found_message must be of type String, received ".concat((0, _utils.getType)(params.bundle_not_found_message)));
      case 81:
        if (!((0, _utils.isArray)(params.bundle_password_required) || (0, _utils.isObject)(params.bundle_password_required))) {
          _context3.next = 82;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_password_required must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_password_required)));
      case 82:
        if (!((0, _utils.isArray)(params.bundle_require_registration) || (0, _utils.isObject)(params.bundle_require_registration))) {
          _context3.next = 83;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_require_registration must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_require_registration)));
      case 83:
        if (!((0, _utils.isArray)(params.bundle_require_share_recipient) || (0, _utils.isObject)(params.bundle_require_share_recipient))) {
          _context3.next = 84;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_require_share_recipient must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_require_share_recipient)));
      case 84:
        if (!((0, _utils.isArray)(params.bundle_send_one_time_password_to_recipient_at_registration) || (0, _utils.isObject)(params.bundle_send_one_time_password_to_recipient_at_registration))) {
          _context3.next = 85;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_send_one_time_password_to_recipient_at_registration must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_send_one_time_password_to_recipient_at_registration)));
      case 85:
        if (!(params.bundle_registration_notifications !== undefined && params.bundle_registration_notifications !== null && !(0, _utils.isString)(params.bundle_registration_notifications))) {
          _context3.next = 86;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_registration_notifications must be of type String, received ".concat((0, _utils.getType)(params.bundle_registration_notifications)));
      case 86:
        if (!(params.bundle_activity_notifications !== undefined && params.bundle_activity_notifications !== null && !(0, _utils.isString)(params.bundle_activity_notifications))) {
          _context3.next = 87;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_activity_notifications must be of type String, received ".concat((0, _utils.getType)(params.bundle_activity_notifications)));
      case 87:
        if (!(params.bundle_upload_receipt_notifications !== undefined && params.bundle_upload_receipt_notifications !== null && !(0, _utils.isString)(params.bundle_upload_receipt_notifications))) {
          _context3.next = 88;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_upload_receipt_notifications must be of type String, received ".concat((0, _utils.getType)(params.bundle_upload_receipt_notifications)));
      case 88:
        if (!((0, _utils.isArray)(params.document_edits_in_bundle_allowed) || (0, _utils.isObject)(params.document_edits_in_bundle_allowed))) {
          _context3.next = 89;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: document_edits_in_bundle_allowed must be of type Boolean, received ".concat((0, _utils.getType)(params.document_edits_in_bundle_allowed)));
      case 89:
        if (!((0, _utils.isArray)(params.password_requirements_apply_to_bundles) || (0, _utils.isObject)(params.password_requirements_apply_to_bundles))) {
          _context3.next = 90;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password_requirements_apply_to_bundles must be of type Boolean, received ".concat((0, _utils.getType)(params.password_requirements_apply_to_bundles)));
      case 90:
        if (!((0, _utils.isArray)(params.prevent_root_permissions_for_non_site_admins) || (0, _utils.isObject)(params.prevent_root_permissions_for_non_site_admins))) {
          _context3.next = 91;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: prevent_root_permissions_for_non_site_admins must be of type Boolean, received ".concat((0, _utils.getType)(params.prevent_root_permissions_for_non_site_admins)));
      case 91:
        if (!((0, _utils.isArray)(params.restrict_root_folder_behaviors_to_site_admins) || (0, _utils.isObject)(params.restrict_root_folder_behaviors_to_site_admins))) {
          _context3.next = 92;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: restrict_root_folder_behaviors_to_site_admins must be of type Boolean, received ".concat((0, _utils.getType)(params.restrict_root_folder_behaviors_to_site_admins)));
      case 92:
        if (!((0, _utils.isArray)(params.root_folder_behaviors_apply_to_workspaces) || (0, _utils.isObject)(params.root_folder_behaviors_apply_to_workspaces))) {
          _context3.next = 93;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: root_folder_behaviors_apply_to_workspaces must be of type Boolean, received ".concat((0, _utils.getType)(params.root_folder_behaviors_apply_to_workspaces)));
      case 93:
        if (!((0, _utils.isArray)(params.opt_out_global) || (0, _utils.isObject)(params.opt_out_global))) {
          _context3.next = 94;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: opt_out_global must be of type Boolean, received ".concat((0, _utils.getType)(params.opt_out_global)));
      case 94:
        if (!((0, _utils.isArray)(params.use_provided_modified_at) || (0, _utils.isObject)(params.use_provided_modified_at))) {
          _context3.next = 95;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: use_provided_modified_at must be of type Boolean, received ".concat((0, _utils.getType)(params.use_provided_modified_at)));
      case 95:
        if (!((0, _utils.isArray)(params.custom_namespace) || (0, _utils.isObject)(params.custom_namespace))) {
          _context3.next = 96;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: custom_namespace must be of type Boolean, received ".concat((0, _utils.getType)(params.custom_namespace)));
      case 96:
        if (!((0, _utils.isArray)(params.non_sso_groups_allowed) || (0, _utils.isObject)(params.non_sso_groups_allowed))) {
          _context3.next = 97;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: non_sso_groups_allowed must be of type Boolean, received ".concat((0, _utils.getType)(params.non_sso_groups_allowed)));
      case 97:
        if (!((0, _utils.isArray)(params.non_sso_users_allowed) || (0, _utils.isObject)(params.non_sso_users_allowed))) {
          _context3.next = 98;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: non_sso_users_allowed must be of type Boolean, received ".concat((0, _utils.getType)(params.non_sso_users_allowed)));
      case 98:
        if (!((0, _utils.isArray)(params.sharing_enabled) || (0, _utils.isObject)(params.sharing_enabled))) {
          _context3.next = 99;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sharing_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.sharing_enabled)));
      case 99:
        if (!((0, _utils.isArray)(params.snapshot_sharing_enabled) || (0, _utils.isObject)(params.snapshot_sharing_enabled))) {
          _context3.next = 100;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: snapshot_sharing_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.snapshot_sharing_enabled)));
      case 100:
        if (!((0, _utils.isArray)(params.user_requests_enabled) || (0, _utils.isObject)(params.user_requests_enabled))) {
          _context3.next = 101;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_requests_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.user_requests_enabled)));
      case 101:
        if (!((0, _utils.isArray)(params.user_requests_notify_admins) || (0, _utils.isObject)(params.user_requests_notify_admins))) {
          _context3.next = 102;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_requests_notify_admins must be of type Boolean, received ".concat((0, _utils.getType)(params.user_requests_notify_admins)));
      case 102:
        if (!((0, _utils.isArray)(params.dav_enabled) || (0, _utils.isObject)(params.dav_enabled))) {
          _context3.next = 103;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dav_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.dav_enabled)));
      case 103:
        if (!((0, _utils.isArray)(params.files_com_remote_server_enabled) || (0, _utils.isObject)(params.files_com_remote_server_enabled))) {
          _context3.next = 104;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_com_remote_server_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.files_com_remote_server_enabled)));
      case 104:
        if (!((0, _utils.isArray)(params.ftp_enabled) || (0, _utils.isObject)(params.ftp_enabled))) {
          _context3.next = 105;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ftp_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.ftp_enabled)));
      case 105:
        if (!((0, _utils.isArray)(params.s3_compatible_endpoint_enabled) || (0, _utils.isObject)(params.s3_compatible_endpoint_enabled))) {
          _context3.next = 106;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint_enabled)));
      case 106:
        if (!((0, _utils.isArray)(params.sftp_enabled) || (0, _utils.isObject)(params.sftp_enabled))) {
          _context3.next = 107;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_enabled)));
      case 107:
        if (!((0, _utils.isArray)(params.sftp_finalize_partial_uploads) || (0, _utils.isObject)(params.sftp_finalize_partial_uploads))) {
          _context3.next = 108;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_finalize_partial_uploads must be of type Boolean, received ".concat((0, _utils.getType)(params.sftp_finalize_partial_uploads)));
      case 108:
        if (!((0, _utils.isArray)(params.users_can_create_api_keys) || (0, _utils.isObject)(params.users_can_create_api_keys))) {
          _context3.next = 109;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: users_can_create_api_keys must be of type Boolean, received ".concat((0, _utils.getType)(params.users_can_create_api_keys)));
      case 109:
        if (!((0, _utils.isArray)(params.users_can_create_ssh_keys) || (0, _utils.isObject)(params.users_can_create_ssh_keys))) {
          _context3.next = 110;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: users_can_create_ssh_keys must be of type Boolean, received ".concat((0, _utils.getType)(params.users_can_create_ssh_keys)));
      case 110:
        if (!((0, _utils.isArray)(params.show_user_notifications_log_in_link) || (0, _utils.isObject)(params.show_user_notifications_log_in_link))) {
          _context3.next = 111;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: show_user_notifications_log_in_link must be of type Boolean, received ".concat((0, _utils.getType)(params.show_user_notifications_log_in_link)));
      case 111:
        if (!(params.sftp_host_key_type !== undefined && params.sftp_host_key_type !== null && !(0, _utils.isString)(params.sftp_host_key_type))) {
          _context3.next = 112;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sftp_host_key_type must be of type String, received ".concat((0, _utils.getType)(params.sftp_host_key_type)));
      case 112:
        if (!(params.active_sftp_host_key_id !== undefined && params.active_sftp_host_key_id !== null && !(0, _utils.isInt)(params.active_sftp_host_key_id))) {
          _context3.next = 113;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: active_sftp_host_key_id must be of type Int, received ".concat((0, _utils.getType)(params.active_sftp_host_key_id)));
      case 113:
        if (!(params.active_sftp_host_key_ids !== undefined && params.active_sftp_host_key_ids !== null && !(0, _utils.isArray)(params.active_sftp_host_key_ids))) {
          _context3.next = 114;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: active_sftp_host_key_ids must be of type Array, received ".concat((0, _utils.getType)(params.active_sftp_host_key_ids)));
      case 114:
        if (!((0, _utils.isArray)(params.protocol_access_groups_only) || (0, _utils.isObject)(params.protocol_access_groups_only))) {
          _context3.next = 115;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: protocol_access_groups_only must be of type Boolean, received ".concat((0, _utils.getType)(params.protocol_access_groups_only)));
      case 115:
        if (!((0, _utils.isArray)(params.revoke_bundle_access_on_disable_or_delete) || (0, _utils.isObject)(params.revoke_bundle_access_on_disable_or_delete))) {
          _context3.next = 116;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: revoke_bundle_access_on_disable_or_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.revoke_bundle_access_on_disable_or_delete)));
      case 116:
        if (!((0, _utils.isArray)(params.group_admins_can_add_users) || (0, _utils.isObject)(params.group_admins_can_add_users))) {
          _context3.next = 117;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_add_users must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_add_users)));
      case 117:
        if (!((0, _utils.isArray)(params.group_admins_can_manage_group_memberships) || (0, _utils.isObject)(params.group_admins_can_manage_group_memberships))) {
          _context3.next = 118;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_manage_group_memberships must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_manage_group_memberships)));
      case 118:
        if (!((0, _utils.isArray)(params.group_admins_can_delete_users) || (0, _utils.isObject)(params.group_admins_can_delete_users))) {
          _context3.next = 119;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_delete_users must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_delete_users)));
      case 119:
        if (!((0, _utils.isArray)(params.group_admins_can_enable_disable_users) || (0, _utils.isObject)(params.group_admins_can_enable_disable_users))) {
          _context3.next = 120;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_enable_disable_users must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_enable_disable_users)));
      case 120:
        if (!((0, _utils.isArray)(params.group_admins_can_modify_users) || (0, _utils.isObject)(params.group_admins_can_modify_users))) {
          _context3.next = 121;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_modify_users must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_modify_users)));
      case 121:
        if (!((0, _utils.isArray)(params.group_admins_can_bypass_user_lifecycle_rules) || (0, _utils.isObject)(params.group_admins_can_bypass_user_lifecycle_rules))) {
          _context3.next = 122;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_bypass_user_lifecycle_rules must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_bypass_user_lifecycle_rules)));
      case 122:
        if (!((0, _utils.isArray)(params.group_admins_can_reset_passwords) || (0, _utils.isObject)(params.group_admins_can_reset_passwords))) {
          _context3.next = 123;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_reset_passwords must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_reset_passwords)));
      case 123:
        if (!((0, _utils.isArray)(params.group_admins_can_set_user_password) || (0, _utils.isObject)(params.group_admins_can_set_user_password))) {
          _context3.next = 124;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_admins_can_set_user_password must be of type Boolean, received ".concat((0, _utils.getType)(params.group_admins_can_set_user_password)));
      case 124:
        if (!((0, _utils.isArray)(params.child_site_folder_admins_can_see_parent_site_directory) || (0, _utils.isObject)(params.child_site_folder_admins_can_see_parent_site_directory))) {
          _context3.next = 125;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: child_site_folder_admins_can_see_parent_site_directory must be of type Boolean, received ".concat((0, _utils.getType)(params.child_site_folder_admins_can_see_parent_site_directory)));
      case 125:
        if (!((0, _utils.isArray)(params.workspace_folder_admins_can_see_default_workspace_directory) || (0, _utils.isObject)(params.workspace_folder_admins_can_see_default_workspace_directory))) {
          _context3.next = 126;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_folder_admins_can_see_default_workspace_directory must be of type Boolean, received ".concat((0, _utils.getType)(params.workspace_folder_admins_can_see_default_workspace_directory)));
      case 126:
        if (!((0, _utils.isArray)(params.bundle_recipient_blacklist_free_email_domains) || (0, _utils.isObject)(params.bundle_recipient_blacklist_free_email_domains))) {
          _context3.next = 127;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_recipient_blacklist_free_email_domains must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_recipient_blacklist_free_email_domains)));
      case 127:
        if (!(params.bundle_recipient_blacklist_domains !== undefined && params.bundle_recipient_blacklist_domains !== null && !(0, _utils.isArray)(params.bundle_recipient_blacklist_domains))) {
          _context3.next = 128;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_recipient_blacklist_domains must be of type Array, received ".concat((0, _utils.getType)(params.bundle_recipient_blacklist_domains)));
      case 128:
        if (!((0, _utils.isArray)(params.admins_bypass_locked_subfolders) || (0, _utils.isObject)(params.admins_bypass_locked_subfolders))) {
          _context3.next = 129;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: admins_bypass_locked_subfolders must be of type Boolean, received ".concat((0, _utils.getType)(params.admins_bypass_locked_subfolders)));
      case 129:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_sms) || (0, _utils.isObject)(params.allowed_2fa_method_sms))) {
          _context3.next = 130;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_sms must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_sms)));
      case 130:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_totp) || (0, _utils.isObject)(params.allowed_2fa_method_totp))) {
          _context3.next = 131;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_totp must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_totp)));
      case 131:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_webauthn) || (0, _utils.isObject)(params.allowed_2fa_method_webauthn))) {
          _context3.next = 132;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_webauthn must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_webauthn)));
      case 132:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_yubi) || (0, _utils.isObject)(params.allowed_2fa_method_yubi))) {
          _context3.next = 133;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_yubi must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_yubi)));
      case 133:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_email) || (0, _utils.isObject)(params.allowed_2fa_method_email))) {
          _context3.next = 134;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_email must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_email)));
      case 134:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_static) || (0, _utils.isObject)(params.allowed_2fa_method_static))) {
          _context3.next = 135;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_static must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_static)));
      case 135:
        if (!((0, _utils.isArray)(params.allowed_2fa_method_bypass_for_ftp_sftp_dav) || (0, _utils.isObject)(params.allowed_2fa_method_bypass_for_ftp_sftp_dav))) {
          _context3.next = 136;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allowed_2fa_method_bypass_for_ftp_sftp_dav must be of type Boolean, received ".concat((0, _utils.getType)(params.allowed_2fa_method_bypass_for_ftp_sftp_dav)));
      case 136:
        if (!((0, _utils.isArray)(params.require_2fa) || (0, _utils.isObject)(params.require_2fa))) {
          _context3.next = 137;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_2fa must be of type Boolean, received ".concat((0, _utils.getType)(params.require_2fa)));
      case 137:
        if (!((0, _utils.isArray)(params.require_2fa_exempt_all_sso_users) || (0, _utils.isObject)(params.require_2fa_exempt_all_sso_users))) {
          _context3.next = 138;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_2fa_exempt_all_sso_users must be of type Boolean, received ".concat((0, _utils.getType)(params.require_2fa_exempt_all_sso_users)));
      case 138:
        if (!(params.require_2fa_user_type !== undefined && params.require_2fa_user_type !== null && !(0, _utils.isString)(params.require_2fa_user_type))) {
          _context3.next = 139;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_2fa_user_type must be of type String, received ".concat((0, _utils.getType)(params.require_2fa_user_type)));
      case 139:
        if (!(params.color2_top !== undefined && params.color2_top !== null && !(0, _utils.isString)(params.color2_top))) {
          _context3.next = 140;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_top must be of type String, received ".concat((0, _utils.getType)(params.color2_top)));
      case 140:
        if (!(params.color2_left !== undefined && params.color2_left !== null && !(0, _utils.isString)(params.color2_left))) {
          _context3.next = 141;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_left must be of type String, received ".concat((0, _utils.getType)(params.color2_left)));
      case 141:
        if (!(params.color2_link !== undefined && params.color2_link !== null && !(0, _utils.isString)(params.color2_link))) {
          _context3.next = 142;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_link must be of type String, received ".concat((0, _utils.getType)(params.color2_link)));
      case 142:
        if (!(params.color2_text !== undefined && params.color2_text !== null && !(0, _utils.isString)(params.color2_text))) {
          _context3.next = 143;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_text must be of type String, received ".concat((0, _utils.getType)(params.color2_text)));
      case 143:
        if (!(params.color2_top_text !== undefined && params.color2_top_text !== null && !(0, _utils.isString)(params.color2_top_text))) {
          _context3.next = 144;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: color2_top_text must be of type String, received ".concat((0, _utils.getType)(params.color2_top_text)));
      case 144:
        if (!(params.site_header !== undefined && params.site_header !== null && !(0, _utils.isString)(params.site_header))) {
          _context3.next = 145;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_header must be of type String, received ".concat((0, _utils.getType)(params.site_header)));
      case 145:
        if (!(params.site_footer !== undefined && params.site_footer !== null && !(0, _utils.isString)(params.site_footer))) {
          _context3.next = 146;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_footer must be of type String, received ".concat((0, _utils.getType)(params.site_footer)));
      case 146:
        if (!(params.site_public_header !== undefined && params.site_public_header !== null && !(0, _utils.isString)(params.site_public_header))) {
          _context3.next = 147;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_public_header must be of type String, received ".concat((0, _utils.getType)(params.site_public_header)));
      case 147:
        if (!(params.site_public_footer !== undefined && params.site_public_footer !== null && !(0, _utils.isString)(params.site_public_footer))) {
          _context3.next = 148;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: site_public_footer must be of type String, received ".concat((0, _utils.getType)(params.site_public_footer)));
      case 148:
        if (!(params.login_help_text !== undefined && params.login_help_text !== null && !(0, _utils.isString)(params.login_help_text))) {
          _context3.next = 149;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: login_help_text must be of type String, received ".concat((0, _utils.getType)(params.login_help_text)));
      case 149:
        if (!((0, _utils.isArray)(params.use_dedicated_ips_for_smtp) || (0, _utils.isObject)(params.use_dedicated_ips_for_smtp))) {
          _context3.next = 150;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: use_dedicated_ips_for_smtp must be of type Boolean, received ".concat((0, _utils.getType)(params.use_dedicated_ips_for_smtp)));
      case 150:
        if (!(params.email_footer_custom_text !== undefined && params.email_footer_custom_text !== null && !(0, _utils.isString)(params.email_footer_custom_text))) {
          _context3.next = 151;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: email_footer_custom_text must be of type String, received ".concat((0, _utils.getType)(params.email_footer_custom_text)));
      case 151:
        if (!(params.smtp_address !== undefined && params.smtp_address !== null && !(0, _utils.isString)(params.smtp_address))) {
          _context3.next = 152;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_address must be of type String, received ".concat((0, _utils.getType)(params.smtp_address)));
      case 152:
        if (!(params.smtp_authentication !== undefined && params.smtp_authentication !== null && !(0, _utils.isString)(params.smtp_authentication))) {
          _context3.next = 153;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_authentication must be of type String, received ".concat((0, _utils.getType)(params.smtp_authentication)));
      case 153:
        if (!(params.smtp_from !== undefined && params.smtp_from !== null && !(0, _utils.isString)(params.smtp_from))) {
          _context3.next = 154;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_from must be of type String, received ".concat((0, _utils.getType)(params.smtp_from)));
      case 154:
        if (!(params.smtp_username !== undefined && params.smtp_username !== null && !(0, _utils.isString)(params.smtp_username))) {
          _context3.next = 155;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_username must be of type String, received ".concat((0, _utils.getType)(params.smtp_username)));
      case 155:
        if (!(params.smtp_port !== undefined && params.smtp_port !== null && !(0, _utils.isInt)(params.smtp_port))) {
          _context3.next = 156;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_port must be of type Int, received ".concat((0, _utils.getType)(params.smtp_port)));
      case 156:
        if (!(params.smtp_ssl !== undefined && params.smtp_ssl !== null && !(0, _utils.isString)(params.smtp_ssl))) {
          _context3.next = 157;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_ssl must be of type String, received ".concat((0, _utils.getType)(params.smtp_ssl)));
      case 157:
        if (!((0, _utils.isArray)(params.ldap_enabled) || (0, _utils.isObject)(params.ldap_enabled))) {
          _context3.next = 158;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_enabled must be of type Boolean, received ".concat((0, _utils.getType)(params.ldap_enabled)));
      case 158:
        if (!(params.ldap_type !== undefined && params.ldap_type !== null && !(0, _utils.isString)(params.ldap_type))) {
          _context3.next = 159;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_type must be of type String, received ".concat((0, _utils.getType)(params.ldap_type)));
      case 159:
        if (!(params.ldap_host !== undefined && params.ldap_host !== null && !(0, _utils.isString)(params.ldap_host))) {
          _context3.next = 160;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_host must be of type String, received ".concat((0, _utils.getType)(params.ldap_host)));
      case 160:
        if (!(params.ldap_host_2 !== undefined && params.ldap_host_2 !== null && !(0, _utils.isString)(params.ldap_host_2))) {
          _context3.next = 161;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_host_2 must be of type String, received ".concat((0, _utils.getType)(params.ldap_host_2)));
      case 161:
        if (!(params.ldap_host_3 !== undefined && params.ldap_host_3 !== null && !(0, _utils.isString)(params.ldap_host_3))) {
          _context3.next = 162;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_host_3 must be of type String, received ".concat((0, _utils.getType)(params.ldap_host_3)));
      case 162:
        if (!(params.ldap_port !== undefined && params.ldap_port !== null && !(0, _utils.isInt)(params.ldap_port))) {
          _context3.next = 163;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_port must be of type Int, received ".concat((0, _utils.getType)(params.ldap_port)));
      case 163:
        if (!((0, _utils.isArray)(params.ldap_secure) || (0, _utils.isObject)(params.ldap_secure))) {
          _context3.next = 164;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_secure must be of type Boolean, received ".concat((0, _utils.getType)(params.ldap_secure)));
      case 164:
        if (!(params.ldap_server_certificate !== undefined && params.ldap_server_certificate !== null && !(0, _utils.isString)(params.ldap_server_certificate))) {
          _context3.next = 165;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_server_certificate must be of type String, received ".concat((0, _utils.getType)(params.ldap_server_certificate)));
      case 165:
        if (!(params.ldap_username !== undefined && params.ldap_username !== null && !(0, _utils.isString)(params.ldap_username))) {
          _context3.next = 166;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_username must be of type String, received ".concat((0, _utils.getType)(params.ldap_username)));
      case 166:
        if (!(params.ldap_username_field !== undefined && params.ldap_username_field !== null && !(0, _utils.isString)(params.ldap_username_field))) {
          _context3.next = 167;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_username_field must be of type String, received ".concat((0, _utils.getType)(params.ldap_username_field)));
      case 167:
        if (!(params.ldap_domain !== undefined && params.ldap_domain !== null && !(0, _utils.isString)(params.ldap_domain))) {
          _context3.next = 168;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_domain must be of type String, received ".concat((0, _utils.getType)(params.ldap_domain)));
      case 168:
        if (!(params.ldap_user_action !== undefined && params.ldap_user_action !== null && !(0, _utils.isString)(params.ldap_user_action))) {
          _context3.next = 169;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_user_action must be of type String, received ".concat((0, _utils.getType)(params.ldap_user_action)));
      case 169:
        if (!(params.ldap_group_action !== undefined && params.ldap_group_action !== null && !(0, _utils.isString)(params.ldap_group_action))) {
          _context3.next = 170;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_group_action must be of type String, received ".concat((0, _utils.getType)(params.ldap_group_action)));
      case 170:
        if (!(params.ldap_user_include_groups !== undefined && params.ldap_user_include_groups !== null && !(0, _utils.isString)(params.ldap_user_include_groups))) {
          _context3.next = 171;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_user_include_groups must be of type String, received ".concat((0, _utils.getType)(params.ldap_user_include_groups)));
      case 171:
        if (!(params.ldap_group_exclusion !== undefined && params.ldap_group_exclusion !== null && !(0, _utils.isString)(params.ldap_group_exclusion))) {
          _context3.next = 172;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_group_exclusion must be of type String, received ".concat((0, _utils.getType)(params.ldap_group_exclusion)));
      case 172:
        if (!(params.ldap_group_inclusion !== undefined && params.ldap_group_inclusion !== null && !(0, _utils.isString)(params.ldap_group_inclusion))) {
          _context3.next = 173;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_group_inclusion must be of type String, received ".concat((0, _utils.getType)(params.ldap_group_inclusion)));
      case 173:
        if (!(params.ldap_base_dn !== undefined && params.ldap_base_dn !== null && !(0, _utils.isString)(params.ldap_base_dn))) {
          _context3.next = 174;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_base_dn must be of type String, received ".concat((0, _utils.getType)(params.ldap_base_dn)));
      case 174:
        if (!((0, _utils.isArray)(params.uploads_via_email_authentication) || (0, _utils.isObject)(params.uploads_via_email_authentication))) {
          _context3.next = 175;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: uploads_via_email_authentication must be of type Boolean, received ".concat((0, _utils.getType)(params.uploads_via_email_authentication)));
      case 175:
        if (!((0, _utils.isArray)(params.icon16_delete) || (0, _utils.isObject)(params.icon16_delete))) {
          _context3.next = 176;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: icon16_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.icon16_delete)));
      case 176:
        if (!((0, _utils.isArray)(params.icon32_delete) || (0, _utils.isObject)(params.icon32_delete))) {
          _context3.next = 177;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: icon32_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.icon32_delete)));
      case 177:
        if (!((0, _utils.isArray)(params.icon48_delete) || (0, _utils.isObject)(params.icon48_delete))) {
          _context3.next = 178;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: icon48_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.icon48_delete)));
      case 178:
        if (!((0, _utils.isArray)(params.icon128_delete) || (0, _utils.isObject)(params.icon128_delete))) {
          _context3.next = 179;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: icon128_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.icon128_delete)));
      case 179:
        if (!((0, _utils.isArray)(params.logo_delete) || (0, _utils.isObject)(params.logo_delete))) {
          _context3.next = 180;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: logo_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.logo_delete)));
      case 180:
        if (!((0, _utils.isArray)(params.bundle_watermark_attachment_delete) || (0, _utils.isObject)(params.bundle_watermark_attachment_delete))) {
          _context3.next = 181;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bundle_watermark_attachment_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.bundle_watermark_attachment_delete)));
      case 181:
        if (!((0, _utils.isArray)(params.login_page_background_image_delete) || (0, _utils.isObject)(params.login_page_background_image_delete))) {
          _context3.next = 182;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: login_page_background_image_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.login_page_background_image_delete)));
      case 182:
        if (!((0, _utils.isArray)(params.disable_2fa_with_delay) || (0, _utils.isObject)(params.disable_2fa_with_delay))) {
          _context3.next = 183;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: disable_2fa_with_delay must be of type Boolean, received ".concat((0, _utils.getType)(params.disable_2fa_with_delay)));
      case 183:
        if (!(params.ldap_password_change !== undefined && params.ldap_password_change !== null && !(0, _utils.isString)(params.ldap_password_change))) {
          _context3.next = 184;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_password_change must be of type String, received ".concat((0, _utils.getType)(params.ldap_password_change)));
      case 184:
        if (!(params.ldap_password_change_confirmation !== undefined && params.ldap_password_change_confirmation !== null && !(0, _utils.isString)(params.ldap_password_change_confirmation))) {
          _context3.next = 185;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ldap_password_change_confirmation must be of type String, received ".concat((0, _utils.getType)(params.ldap_password_change_confirmation)));
      case 185:
        if (!((0, _utils.isArray)(params.redirect_old_subdomain) || (0, _utils.isObject)(params.redirect_old_subdomain))) {
          _context3.next = 186;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: redirect_old_subdomain must be of type Boolean, received ".concat((0, _utils.getType)(params.redirect_old_subdomain)));
      case 186:
        if (!(params.smtp_password !== undefined && params.smtp_password !== null && !(0, _utils.isString)(params.smtp_password))) {
          _context3.next = 187;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: smtp_password must be of type String, received ".concat((0, _utils.getType)(params.smtp_password)));
      case 187:
        _context3.next = 188;
        return _Api.default.sendRequest('/site', 'PATCH', params, options);
      case 188:
        response = _context3.sent;
        return _context3.abrupt("return", new _Site(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 189:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
})));
var _default = exports.default = Site;
module.exports = Site;
module.exports.default = Site;