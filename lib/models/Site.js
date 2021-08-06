"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class Site
 */
var Site = function Site() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Site);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodSms", function () {
    return _this.attributes.allowed_2fa_method_sms;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodTotp", function () {
    return _this.attributes.allowed_2fa_method_totp;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodU2f", function () {
    return _this.attributes.allowed_2fa_method_u2f;
  });
  (0, _defineProperty2.default)(this, "getAllowed2faMethodYubi", function () {
    return _this.attributes.allowed_2fa_method_yubi;
  });
  (0, _defineProperty2.default)(this, "getAdminUserId", function () {
    return _this.attributes.admin_user_id;
  });
  (0, _defineProperty2.default)(this, "getAllowBundleNames", function () {
    return _this.attributes.allow_bundle_names;
  });
  (0, _defineProperty2.default)(this, "getAllowedCountries", function () {
    return _this.attributes.allowed_countries;
  });
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  (0, _defineProperty2.default)(this, "getAskAboutOverwrites", function () {
    return _this.attributes.ask_about_overwrites;
  });
  (0, _defineProperty2.default)(this, "getBundleExpiration", function () {
    return _this.attributes.bundle_expiration;
  });
  (0, _defineProperty2.default)(this, "getBundlePasswordRequired", function () {
    return _this.attributes.bundle_password_required;
  });
  (0, _defineProperty2.default)(this, "getBundleRequireShareRecipient", function () {
    return _this.attributes.bundle_require_share_recipient;
  });
  (0, _defineProperty2.default)(this, "getColor2Left", function () {
    return _this.attributes.color2_left;
  });
  (0, _defineProperty2.default)(this, "getColor2Link", function () {
    return _this.attributes.color2_link;
  });
  (0, _defineProperty2.default)(this, "getColor2Text", function () {
    return _this.attributes.color2_text;
  });
  (0, _defineProperty2.default)(this, "getColor2Top", function () {
    return _this.attributes.color2_top;
  });
  (0, _defineProperty2.default)(this, "getColor2TopText", function () {
    return _this.attributes.color2_top_text;
  });
  (0, _defineProperty2.default)(this, "getContactName", function () {
    return _this.attributes.contact_name;
  });
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  (0, _defineProperty2.default)(this, "getCurrency", function () {
    return _this.attributes.currency;
  });
  (0, _defineProperty2.default)(this, "getCustomNamespace", function () {
    return _this.attributes.custom_namespace;
  });
  (0, _defineProperty2.default)(this, "getDaysToRetainBackups", function () {
    return _this.attributes.days_to_retain_backups;
  });
  (0, _defineProperty2.default)(this, "getDefaultTimeZone", function () {
    return _this.attributes.default_time_zone;
  });
  (0, _defineProperty2.default)(this, "getDesktopApp", function () {
    return _this.attributes.desktop_app;
  });
  (0, _defineProperty2.default)(this, "getDesktopAppSessionIpPinning", function () {
    return _this.attributes.desktop_app_session_ip_pinning;
  });
  (0, _defineProperty2.default)(this, "getDesktopAppSessionLifetime", function () {
    return _this.attributes.desktop_app_session_lifetime;
  });
  (0, _defineProperty2.default)(this, "getMobileApp", function () {
    return _this.attributes.mobile_app;
  });
  (0, _defineProperty2.default)(this, "getMobileAppSessionIpPinning", function () {
    return _this.attributes.mobile_app_session_ip_pinning;
  });
  (0, _defineProperty2.default)(this, "getMobileAppSessionLifetime", function () {
    return _this.attributes.mobile_app_session_lifetime;
  });
  (0, _defineProperty2.default)(this, "getDisallowedCountries", function () {
    return _this.attributes.disallowed_countries;
  });
  (0, _defineProperty2.default)(this, "getDisableNotifications", function () {
    return _this.attributes.disable_notifications;
  });
  (0, _defineProperty2.default)(this, "getDisablePasswordReset", function () {
    return _this.attributes.disable_password_reset;
  });
  (0, _defineProperty2.default)(this, "getDomain", function () {
    return _this.attributes.domain;
  });
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  (0, _defineProperty2.default)(this, "getReplyToEmail", function () {
    return _this.attributes.reply_to_email;
  });
  (0, _defineProperty2.default)(this, "getNonSsoGroupsAllowed", function () {
    return _this.attributes.non_sso_groups_allowed;
  });
  (0, _defineProperty2.default)(this, "getNonSsoUsersAllowed", function () {
    return _this.attributes.non_sso_users_allowed;
  });
  (0, _defineProperty2.default)(this, "getFolderPermissionsGroupsOnly", function () {
    return _this.attributes.folder_permissions_groups_only;
  });
  (0, _defineProperty2.default)(this, "getHipaa", function () {
    return _this.attributes.hipaa;
  });
  (0, _defineProperty2.default)(this, "getIcon128", function () {
    return _this.attributes.icon128;
  });
  (0, _defineProperty2.default)(this, "getIcon16", function () {
    return _this.attributes.icon16;
  });
  (0, _defineProperty2.default)(this, "getIcon32", function () {
    return _this.attributes.icon32;
  });
  (0, _defineProperty2.default)(this, "getIcon48", function () {
    return _this.attributes.icon48;
  });
  (0, _defineProperty2.default)(this, "getImmutableFilesSetAt", function () {
    return _this.attributes.immutable_files_set_at;
  });
  (0, _defineProperty2.default)(this, "getIncludePasswordInWelcomeEmail", function () {
    return _this.attributes.include_password_in_welcome_email;
  });
  (0, _defineProperty2.default)(this, "getLanguage", function () {
    return _this.attributes.language;
  });
  (0, _defineProperty2.default)(this, "getLdapBaseDn", function () {
    return _this.attributes.ldap_base_dn;
  });
  (0, _defineProperty2.default)(this, "getLdapDomain", function () {
    return _this.attributes.ldap_domain;
  });
  (0, _defineProperty2.default)(this, "getLdapEnabled", function () {
    return _this.attributes.ldap_enabled;
  });
  (0, _defineProperty2.default)(this, "getLdapGroupAction", function () {
    return _this.attributes.ldap_group_action;
  });
  (0, _defineProperty2.default)(this, "getLdapGroupExclusion", function () {
    return _this.attributes.ldap_group_exclusion;
  });
  (0, _defineProperty2.default)(this, "getLdapGroupInclusion", function () {
    return _this.attributes.ldap_group_inclusion;
  });
  (0, _defineProperty2.default)(this, "getLdapHost", function () {
    return _this.attributes.ldap_host;
  });
  (0, _defineProperty2.default)(this, "getLdapHost2", function () {
    return _this.attributes.ldap_host_2;
  });
  (0, _defineProperty2.default)(this, "getLdapHost3", function () {
    return _this.attributes.ldap_host_3;
  });
  (0, _defineProperty2.default)(this, "getLdapPort", function () {
    return _this.attributes.ldap_port;
  });
  (0, _defineProperty2.default)(this, "getLdapSecure", function () {
    return _this.attributes.ldap_secure;
  });
  (0, _defineProperty2.default)(this, "getLdapType", function () {
    return _this.attributes.ldap_type;
  });
  (0, _defineProperty2.default)(this, "getLdapUserAction", function () {
    return _this.attributes.ldap_user_action;
  });
  (0, _defineProperty2.default)(this, "getLdapUserIncludeGroups", function () {
    return _this.attributes.ldap_user_include_groups;
  });
  (0, _defineProperty2.default)(this, "getLdapUsername", function () {
    return _this.attributes.ldap_username;
  });
  (0, _defineProperty2.default)(this, "getLdapUsernameField", function () {
    return _this.attributes.ldap_username_field;
  });
  (0, _defineProperty2.default)(this, "getLoginHelpText", function () {
    return _this.attributes.login_help_text;
  });
  (0, _defineProperty2.default)(this, "getLogo", function () {
    return _this.attributes.logo;
  });
  (0, _defineProperty2.default)(this, "getMaxPriorPasswords", function () {
    return _this.attributes.max_prior_passwords;
  });
  (0, _defineProperty2.default)(this, "getNextBillingAmount", function () {
    return _this.attributes.next_billing_amount;
  });
  (0, _defineProperty2.default)(this, "getNextBillingDate", function () {
    return _this.attributes.next_billing_date;
  });
  (0, _defineProperty2.default)(this, "getOfficeIntegrationAvailable", function () {
    return _this.attributes.office_integration_available;
  });
  (0, _defineProperty2.default)(this, "getOncehubLink", function () {
    return _this.attributes.oncehub_link;
  });
  (0, _defineProperty2.default)(this, "getOptOutGlobal", function () {
    return _this.attributes.opt_out_global;
  });
  (0, _defineProperty2.default)(this, "getOverageNotifiedAt", function () {
    return _this.attributes.overage_notified_at;
  });
  (0, _defineProperty2.default)(this, "getOverageNotify", function () {
    return _this.attributes.overage_notify;
  });
  (0, _defineProperty2.default)(this, "getOverdue", function () {
    return _this.attributes.overdue;
  });
  (0, _defineProperty2.default)(this, "getPasswordMinLength", function () {
    return _this.attributes.password_min_length;
  });
  (0, _defineProperty2.default)(this, "getPasswordRequireLetter", function () {
    return _this.attributes.password_require_letter;
  });
  (0, _defineProperty2.default)(this, "getPasswordRequireMixed", function () {
    return _this.attributes.password_require_mixed;
  });
  (0, _defineProperty2.default)(this, "getPasswordRequireNumber", function () {
    return _this.attributes.password_require_number;
  });
  (0, _defineProperty2.default)(this, "getPasswordRequireSpecial", function () {
    return _this.attributes.password_require_special;
  });
  (0, _defineProperty2.default)(this, "getPasswordRequireUnbreached", function () {
    return _this.attributes.password_require_unbreached;
  });
  (0, _defineProperty2.default)(this, "getPasswordRequirementsApplyToBundles", function () {
    return _this.attributes.password_requirements_apply_to_bundles;
  });
  (0, _defineProperty2.default)(this, "getPasswordValidityDays", function () {
    return _this.attributes.password_validity_days;
  });
  (0, _defineProperty2.default)(this, "getPhone", function () {
    return _this.attributes.phone;
  });
  (0, _defineProperty2.default)(this, "getRequire2fa", function () {
    return _this.attributes.require_2fa;
  });
  (0, _defineProperty2.default)(this, "getRequire2faStopTime", function () {
    return _this.attributes.require_2fa_stop_time;
  });
  (0, _defineProperty2.default)(this, "getRequire2faUserType", function () {
    return _this.attributes.require_2fa_user_type;
  });
  (0, _defineProperty2.default)(this, "getSession", function () {
    return _this.attributes.session;
  });
  (0, _defineProperty2.default)(this, "getSessionPinnedByIp", function () {
    return _this.attributes.session_pinned_by_ip;
  });
  (0, _defineProperty2.default)(this, "getSftpUserRootEnabled", function () {
    return _this.attributes.sftp_user_root_enabled;
  });
  (0, _defineProperty2.default)(this, "getSharingEnabled", function () {
    return _this.attributes.sharing_enabled;
  });
  (0, _defineProperty2.default)(this, "getShowRequestAccessLink", function () {
    return _this.attributes.show_request_access_link;
  });
  (0, _defineProperty2.default)(this, "getSiteFooter", function () {
    return _this.attributes.site_footer;
  });
  (0, _defineProperty2.default)(this, "getSiteHeader", function () {
    return _this.attributes.site_header;
  });
  (0, _defineProperty2.default)(this, "getSmtpAddress", function () {
    return _this.attributes.smtp_address;
  });
  (0, _defineProperty2.default)(this, "getSmtpAuthentication", function () {
    return _this.attributes.smtp_authentication;
  });
  (0, _defineProperty2.default)(this, "getSmtpFrom", function () {
    return _this.attributes.smtp_from;
  });
  (0, _defineProperty2.default)(this, "getSmtpPort", function () {
    return _this.attributes.smtp_port;
  });
  (0, _defineProperty2.default)(this, "getSmtpUsername", function () {
    return _this.attributes.smtp_username;
  });
  (0, _defineProperty2.default)(this, "getSessionExpiry", function () {
    return _this.attributes.session_expiry;
  });
  (0, _defineProperty2.default)(this, "getSslRequired", function () {
    return _this.attributes.ssl_required;
  });
  (0, _defineProperty2.default)(this, "getSubdomain", function () {
    return _this.attributes.subdomain;
  });
  (0, _defineProperty2.default)(this, "getSwitchToPlanDate", function () {
    return _this.attributes.switch_to_plan_date;
  });
  (0, _defineProperty2.default)(this, "getTlsDisabled", function () {
    return _this.attributes.tls_disabled;
  });
  (0, _defineProperty2.default)(this, "getTrialDaysLeft", function () {
    return _this.attributes.trial_days_left;
  });
  (0, _defineProperty2.default)(this, "getTrialUntil", function () {
    return _this.attributes.trial_until;
  });
  (0, _defineProperty2.default)(this, "getUpdatedAt", function () {
    return _this.attributes.updated_at;
  });
  (0, _defineProperty2.default)(this, "getUseProvidedModifiedAt", function () {
    return _this.attributes.use_provided_modified_at;
  });
  (0, _defineProperty2.default)(this, "getUser", function () {
    return _this.attributes.user;
  });
  (0, _defineProperty2.default)(this, "getUserLockout", function () {
    return _this.attributes.user_lockout;
  });
  (0, _defineProperty2.default)(this, "getUserLockoutLockPeriod", function () {
    return _this.attributes.user_lockout_lock_period;
  });
  (0, _defineProperty2.default)(this, "getUserLockoutTries", function () {
    return _this.attributes.user_lockout_tries;
  });
  (0, _defineProperty2.default)(this, "getUserLockoutWithin", function () {
    return _this.attributes.user_lockout_within;
  });
  (0, _defineProperty2.default)(this, "getUserRequestsEnabled", function () {
    return _this.attributes.user_requests_enabled;
  });
  (0, _defineProperty2.default)(this, "getWelcomeCustomText", function () {
    return _this.attributes.welcome_custom_text;
  });
  (0, _defineProperty2.default)(this, "getWelcomeEmailCc", function () {
    return _this.attributes.welcome_email_cc;
  });
  (0, _defineProperty2.default)(this, "getWelcomeEmailEnabled", function () {
    return _this.attributes.welcome_email_enabled;
  });
  (0, _defineProperty2.default)(this, "getWelcomeScreen", function () {
    return _this.attributes.welcome_screen;
  });
  (0, _defineProperty2.default)(this, "getWindowsModeFtp", function () {
    return _this.attributes.windows_mode_ftp;
  });
  (0, _defineProperty2.default)(this, "getDisableUsersFromInactivityPeriodDays", function () {
    return _this.attributes.disable_users_from_inactivity_period_days;
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
};

(0, _defineProperty2.default)(Site, "get", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var params,
      options,
      response,
      _args = arguments;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.next = 4;
          return _Api.default.sendRequest("/site", 'GET', options);

        case 4:
          response = _context.sent;
          return _context.abrupt("return", new Site(response === null || response === void 0 ? void 0 : response.data, options));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(Site, "getUsage", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var params,
      options,
      response,
      _args2 = arguments;
  return _regenerator.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 4;
          return _Api.default.sendRequest("/site/usage", 'GET', options);

        case 4:
          response = _context2.sent;
          return _context2.abrupt("return", new UsageSnapshot(response === null || response === void 0 ? void 0 : response.data, options));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(Site, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var params,
      options,
      response,
      _args3 = arguments;
  return _regenerator.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};

          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context3.next = 4;
            break;
          }

          throw new Error("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

        case 4:
          if (!(params['subdomain'] && !(0, _utils.isString)(params['subdomain']))) {
            _context3.next = 6;
            break;
          }

          throw new Error("Bad parameter: subdomain must be of type String, received ".concat((0, _utils.getType)(subdomain)));

        case 6:
          if (!(params['domain'] && !(0, _utils.isString)(params['domain']))) {
            _context3.next = 8;
            break;
          }

          throw new Error("Bad parameter: domain must be of type String, received ".concat((0, _utils.getType)(domain)));

        case 8:
          if (!(params['email'] && !(0, _utils.isString)(params['email']))) {
            _context3.next = 10;
            break;
          }

          throw new Error("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(email)));

        case 10:
          if (!(params['reply_to_email'] && !(0, _utils.isString)(params['reply_to_email']))) {
            _context3.next = 12;
            break;
          }

          throw new Error("Bad parameter: reply_to_email must be of type String, received ".concat((0, _utils.getType)(reply_to_email)));

        case 12:
          if (!(params['bundle_expiration'] && !(0, _utils.isInt)(params['bundle_expiration']))) {
            _context3.next = 14;
            break;
          }

          throw new Error("Bad parameter: bundle_expiration must be of type Int, received ".concat((0, _utils.getType)(bundle_expiration)));

        case 14:
          if (!(params['welcome_email_cc'] && !(0, _utils.isString)(params['welcome_email_cc']))) {
            _context3.next = 16;
            break;
          }

          throw new Error("Bad parameter: welcome_email_cc must be of type String, received ".concat((0, _utils.getType)(welcome_email_cc)));

        case 16:
          if (!(params['welcome_custom_text'] && !(0, _utils.isString)(params['welcome_custom_text']))) {
            _context3.next = 18;
            break;
          }

          throw new Error("Bad parameter: welcome_custom_text must be of type String, received ".concat((0, _utils.getType)(welcome_custom_text)));

        case 18:
          if (!(params['language'] && !(0, _utils.isString)(params['language']))) {
            _context3.next = 20;
            break;
          }

          throw new Error("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(language)));

        case 20:
          if (!(params['default_time_zone'] && !(0, _utils.isString)(params['default_time_zone']))) {
            _context3.next = 22;
            break;
          }

          throw new Error("Bad parameter: default_time_zone must be of type String, received ".concat((0, _utils.getType)(default_time_zone)));

        case 22:
          if (!(params['desktop_app_session_lifetime'] && !(0, _utils.isInt)(params['desktop_app_session_lifetime']))) {
            _context3.next = 24;
            break;
          }

          throw new Error("Bad parameter: desktop_app_session_lifetime must be of type Int, received ".concat((0, _utils.getType)(desktop_app_session_lifetime)));

        case 24:
          if (!(params['mobile_app_session_lifetime'] && !(0, _utils.isInt)(params['mobile_app_session_lifetime']))) {
            _context3.next = 26;
            break;
          }

          throw new Error("Bad parameter: mobile_app_session_lifetime must be of type Int, received ".concat((0, _utils.getType)(mobile_app_session_lifetime)));

        case 26:
          if (!(params['welcome_screen'] && !(0, _utils.isString)(params['welcome_screen']))) {
            _context3.next = 28;
            break;
          }

          throw new Error("Bad parameter: welcome_screen must be of type String, received ".concat((0, _utils.getType)(welcome_screen)));

        case 28:
          if (!(params['user_lockout_tries'] && !(0, _utils.isInt)(params['user_lockout_tries']))) {
            _context3.next = 30;
            break;
          }

          throw new Error("Bad parameter: user_lockout_tries must be of type Int, received ".concat((0, _utils.getType)(user_lockout_tries)));

        case 30:
          if (!(params['user_lockout_within'] && !(0, _utils.isInt)(params['user_lockout_within']))) {
            _context3.next = 32;
            break;
          }

          throw new Error("Bad parameter: user_lockout_within must be of type Int, received ".concat((0, _utils.getType)(user_lockout_within)));

        case 32:
          if (!(params['user_lockout_lock_period'] && !(0, _utils.isInt)(params['user_lockout_lock_period']))) {
            _context3.next = 34;
            break;
          }

          throw new Error("Bad parameter: user_lockout_lock_period must be of type Int, received ".concat((0, _utils.getType)(user_lockout_lock_period)));

        case 34:
          if (!(params['allowed_countries'] && !(0, _utils.isString)(params['allowed_countries']))) {
            _context3.next = 36;
            break;
          }

          throw new Error("Bad parameter: allowed_countries must be of type String, received ".concat((0, _utils.getType)(allowed_countries)));

        case 36:
          if (!(params['allowed_ips'] && !(0, _utils.isString)(params['allowed_ips']))) {
            _context3.next = 38;
            break;
          }

          throw new Error("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(allowed_ips)));

        case 38:
          if (!(params['disallowed_countries'] && !(0, _utils.isString)(params['disallowed_countries']))) {
            _context3.next = 40;
            break;
          }

          throw new Error("Bad parameter: disallowed_countries must be of type String, received ".concat((0, _utils.getType)(disallowed_countries)));

        case 40:
          if (!(params['days_to_retain_backups'] && !(0, _utils.isInt)(params['days_to_retain_backups']))) {
            _context3.next = 42;
            break;
          }

          throw new Error("Bad parameter: days_to_retain_backups must be of type Int, received ".concat((0, _utils.getType)(days_to_retain_backups)));

        case 42:
          if (!(params['max_prior_passwords'] && !(0, _utils.isInt)(params['max_prior_passwords']))) {
            _context3.next = 44;
            break;
          }

          throw new Error("Bad parameter: max_prior_passwords must be of type Int, received ".concat((0, _utils.getType)(max_prior_passwords)));

        case 44:
          if (!(params['password_validity_days'] && !(0, _utils.isInt)(params['password_validity_days']))) {
            _context3.next = 46;
            break;
          }

          throw new Error("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(password_validity_days)));

        case 46:
          if (!(params['password_min_length'] && !(0, _utils.isInt)(params['password_min_length']))) {
            _context3.next = 48;
            break;
          }

          throw new Error("Bad parameter: password_min_length must be of type Int, received ".concat((0, _utils.getType)(password_min_length)));

        case 48:
          if (!(params['disable_users_from_inactivity_period_days'] && !(0, _utils.isInt)(params['disable_users_from_inactivity_period_days']))) {
            _context3.next = 50;
            break;
          }

          throw new Error("Bad parameter: disable_users_from_inactivity_period_days must be of type Int, received ".concat((0, _utils.getType)(disable_users_from_inactivity_period_days)));

        case 50:
          if (!(params['require_2fa_user_type'] && !(0, _utils.isString)(params['require_2fa_user_type']))) {
            _context3.next = 52;
            break;
          }

          throw new Error("Bad parameter: require_2fa_user_type must be of type String, received ".concat((0, _utils.getType)(require_2fa_user_type)));

        case 52:
          if (!(params['color2_top'] && !(0, _utils.isString)(params['color2_top']))) {
            _context3.next = 54;
            break;
          }

          throw new Error("Bad parameter: color2_top must be of type String, received ".concat((0, _utils.getType)(color2_top)));

        case 54:
          if (!(params['color2_left'] && !(0, _utils.isString)(params['color2_left']))) {
            _context3.next = 56;
            break;
          }

          throw new Error("Bad parameter: color2_left must be of type String, received ".concat((0, _utils.getType)(color2_left)));

        case 56:
          if (!(params['color2_link'] && !(0, _utils.isString)(params['color2_link']))) {
            _context3.next = 58;
            break;
          }

          throw new Error("Bad parameter: color2_link must be of type String, received ".concat((0, _utils.getType)(color2_link)));

        case 58:
          if (!(params['color2_text'] && !(0, _utils.isString)(params['color2_text']))) {
            _context3.next = 60;
            break;
          }

          throw new Error("Bad parameter: color2_text must be of type String, received ".concat((0, _utils.getType)(color2_text)));

        case 60:
          if (!(params['color2_top_text'] && !(0, _utils.isString)(params['color2_top_text']))) {
            _context3.next = 62;
            break;
          }

          throw new Error("Bad parameter: color2_top_text must be of type String, received ".concat((0, _utils.getType)(color2_top_text)));

        case 62:
          if (!(params['site_header'] && !(0, _utils.isString)(params['site_header']))) {
            _context3.next = 64;
            break;
          }

          throw new Error("Bad parameter: site_header must be of type String, received ".concat((0, _utils.getType)(site_header)));

        case 64:
          if (!(params['site_footer'] && !(0, _utils.isString)(params['site_footer']))) {
            _context3.next = 66;
            break;
          }

          throw new Error("Bad parameter: site_footer must be of type String, received ".concat((0, _utils.getType)(site_footer)));

        case 66:
          if (!(params['login_help_text'] && !(0, _utils.isString)(params['login_help_text']))) {
            _context3.next = 68;
            break;
          }

          throw new Error("Bad parameter: login_help_text must be of type String, received ".concat((0, _utils.getType)(login_help_text)));

        case 68:
          if (!(params['smtp_address'] && !(0, _utils.isString)(params['smtp_address']))) {
            _context3.next = 70;
            break;
          }

          throw new Error("Bad parameter: smtp_address must be of type String, received ".concat((0, _utils.getType)(smtp_address)));

        case 70:
          if (!(params['smtp_authentication'] && !(0, _utils.isString)(params['smtp_authentication']))) {
            _context3.next = 72;
            break;
          }

          throw new Error("Bad parameter: smtp_authentication must be of type String, received ".concat((0, _utils.getType)(smtp_authentication)));

        case 72:
          if (!(params['smtp_from'] && !(0, _utils.isString)(params['smtp_from']))) {
            _context3.next = 74;
            break;
          }

          throw new Error("Bad parameter: smtp_from must be of type String, received ".concat((0, _utils.getType)(smtp_from)));

        case 74:
          if (!(params['smtp_username'] && !(0, _utils.isString)(params['smtp_username']))) {
            _context3.next = 76;
            break;
          }

          throw new Error("Bad parameter: smtp_username must be of type String, received ".concat((0, _utils.getType)(smtp_username)));

        case 76:
          if (!(params['smtp_port'] && !(0, _utils.isInt)(params['smtp_port']))) {
            _context3.next = 78;
            break;
          }

          throw new Error("Bad parameter: smtp_port must be of type Int, received ".concat((0, _utils.getType)(smtp_port)));

        case 78:
          if (!(params['ldap_type'] && !(0, _utils.isString)(params['ldap_type']))) {
            _context3.next = 80;
            break;
          }

          throw new Error("Bad parameter: ldap_type must be of type String, received ".concat((0, _utils.getType)(ldap_type)));

        case 80:
          if (!(params['ldap_host'] && !(0, _utils.isString)(params['ldap_host']))) {
            _context3.next = 82;
            break;
          }

          throw new Error("Bad parameter: ldap_host must be of type String, received ".concat((0, _utils.getType)(ldap_host)));

        case 82:
          if (!(params['ldap_host_2'] && !(0, _utils.isString)(params['ldap_host_2']))) {
            _context3.next = 84;
            break;
          }

          throw new Error("Bad parameter: ldap_host_2 must be of type String, received ".concat((0, _utils.getType)(ldap_host_2)));

        case 84:
          if (!(params['ldap_host_3'] && !(0, _utils.isString)(params['ldap_host_3']))) {
            _context3.next = 86;
            break;
          }

          throw new Error("Bad parameter: ldap_host_3 must be of type String, received ".concat((0, _utils.getType)(ldap_host_3)));

        case 86:
          if (!(params['ldap_port'] && !(0, _utils.isInt)(params['ldap_port']))) {
            _context3.next = 88;
            break;
          }

          throw new Error("Bad parameter: ldap_port must be of type Int, received ".concat((0, _utils.getType)(ldap_port)));

        case 88:
          if (!(params['ldap_username'] && !(0, _utils.isString)(params['ldap_username']))) {
            _context3.next = 90;
            break;
          }

          throw new Error("Bad parameter: ldap_username must be of type String, received ".concat((0, _utils.getType)(ldap_username)));

        case 90:
          if (!(params['ldap_username_field'] && !(0, _utils.isString)(params['ldap_username_field']))) {
            _context3.next = 92;
            break;
          }

          throw new Error("Bad parameter: ldap_username_field must be of type String, received ".concat((0, _utils.getType)(ldap_username_field)));

        case 92:
          if (!(params['ldap_domain'] && !(0, _utils.isString)(params['ldap_domain']))) {
            _context3.next = 94;
            break;
          }

          throw new Error("Bad parameter: ldap_domain must be of type String, received ".concat((0, _utils.getType)(ldap_domain)));

        case 94:
          if (!(params['ldap_user_action'] && !(0, _utils.isString)(params['ldap_user_action']))) {
            _context3.next = 96;
            break;
          }

          throw new Error("Bad parameter: ldap_user_action must be of type String, received ".concat((0, _utils.getType)(ldap_user_action)));

        case 96:
          if (!(params['ldap_group_action'] && !(0, _utils.isString)(params['ldap_group_action']))) {
            _context3.next = 98;
            break;
          }

          throw new Error("Bad parameter: ldap_group_action must be of type String, received ".concat((0, _utils.getType)(ldap_group_action)));

        case 98:
          if (!(params['ldap_user_include_groups'] && !(0, _utils.isString)(params['ldap_user_include_groups']))) {
            _context3.next = 100;
            break;
          }

          throw new Error("Bad parameter: ldap_user_include_groups must be of type String, received ".concat((0, _utils.getType)(ldap_user_include_groups)));

        case 100:
          if (!(params['ldap_group_exclusion'] && !(0, _utils.isString)(params['ldap_group_exclusion']))) {
            _context3.next = 102;
            break;
          }

          throw new Error("Bad parameter: ldap_group_exclusion must be of type String, received ".concat((0, _utils.getType)(ldap_group_exclusion)));

        case 102:
          if (!(params['ldap_group_inclusion'] && !(0, _utils.isString)(params['ldap_group_inclusion']))) {
            _context3.next = 104;
            break;
          }

          throw new Error("Bad parameter: ldap_group_inclusion must be of type String, received ".concat((0, _utils.getType)(ldap_group_inclusion)));

        case 104:
          if (!(params['ldap_base_dn'] && !(0, _utils.isString)(params['ldap_base_dn']))) {
            _context3.next = 106;
            break;
          }

          throw new Error("Bad parameter: ldap_base_dn must be of type String, received ".concat((0, _utils.getType)(ldap_base_dn)));

        case 106:
          if (!(params['ldap_password_change'] && !(0, _utils.isString)(params['ldap_password_change']))) {
            _context3.next = 108;
            break;
          }

          throw new Error("Bad parameter: ldap_password_change must be of type String, received ".concat((0, _utils.getType)(ldap_password_change)));

        case 108:
          if (!(params['ldap_password_change_confirmation'] && !(0, _utils.isString)(params['ldap_password_change_confirmation']))) {
            _context3.next = 110;
            break;
          }

          throw new Error("Bad parameter: ldap_password_change_confirmation must be of type String, received ".concat((0, _utils.getType)(ldap_password_change_confirmation)));

        case 110:
          if (!(params['smtp_password'] && !(0, _utils.isString)(params['smtp_password']))) {
            _context3.next = 112;
            break;
          }

          throw new Error("Bad parameter: smtp_password must be of type String, received ".concat((0, _utils.getType)(smtp_password)));

        case 112:
          _context3.next = 114;
          return _Api.default.sendRequest("/site", 'PATCH', params, options);

        case 114:
          response = _context3.sent;
          return _context3.abrupt("return", new Site(response === null || response === void 0 ? void 0 : response.data, options));

        case 116:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
var _default = Site;
exports.default = _default;