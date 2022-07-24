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

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  (0, _defineProperty2.default)(this, "getAdminGroupIds", function () {
    return _this.attributes.admin_group_ids;
  });
  (0, _defineProperty2.default)(this, "setAdminGroupIds", function (value) {
    _this.attributes.admin_group_ids = value;
  });
  (0, _defineProperty2.default)(this, "getAllowedIps", function () {
    return _this.attributes.allowed_ips;
  });
  (0, _defineProperty2.default)(this, "setAllowedIps", function (value) {
    _this.attributes.allowed_ips = value;
  });
  (0, _defineProperty2.default)(this, "getAttachmentsPermission", function () {
    return _this.attributes.attachments_permission;
  });
  (0, _defineProperty2.default)(this, "setAttachmentsPermission", function (value) {
    _this.attributes.attachments_permission = value;
  });
  (0, _defineProperty2.default)(this, "getApiKeysCount", function () {
    return _this.attributes.api_keys_count;
  });
  (0, _defineProperty2.default)(this, "setApiKeysCount", function (value) {
    _this.attributes.api_keys_count = value;
  });
  (0, _defineProperty2.default)(this, "getAuthenticateUntil", function () {
    return _this.attributes.authenticate_until;
  });
  (0, _defineProperty2.default)(this, "setAuthenticateUntil", function (value) {
    _this.attributes.authenticate_until = value;
  });
  (0, _defineProperty2.default)(this, "getAuthenticationMethod", function () {
    return _this.attributes.authentication_method;
  });
  (0, _defineProperty2.default)(this, "setAuthenticationMethod", function (value) {
    _this.attributes.authentication_method = value;
  });
  (0, _defineProperty2.default)(this, "getAvatarUrl", function () {
    return _this.attributes.avatar_url;
  });
  (0, _defineProperty2.default)(this, "setAvatarUrl", function (value) {
    _this.attributes.avatar_url = value;
  });
  (0, _defineProperty2.default)(this, "getBillingPermission", function () {
    return _this.attributes.billing_permission;
  });
  (0, _defineProperty2.default)(this, "setBillingPermission", function (value) {
    _this.attributes.billing_permission = value;
  });
  (0, _defineProperty2.default)(this, "getBypassSiteAllowedIps", function () {
    return _this.attributes.bypass_site_allowed_ips;
  });
  (0, _defineProperty2.default)(this, "setBypassSiteAllowedIps", function (value) {
    _this.attributes.bypass_site_allowed_ips = value;
  });
  (0, _defineProperty2.default)(this, "getBypassInactiveDisable", function () {
    return _this.attributes.bypass_inactive_disable;
  });
  (0, _defineProperty2.default)(this, "setBypassInactiveDisable", function (value) {
    _this.attributes.bypass_inactive_disable = value;
  });
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  (0, _defineProperty2.default)(this, "getDavPermission", function () {
    return _this.attributes.dav_permission;
  });
  (0, _defineProperty2.default)(this, "setDavPermission", function (value) {
    _this.attributes.dav_permission = value;
  });
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  (0, _defineProperty2.default)(this, "getEmail", function () {
    return _this.attributes.email;
  });
  (0, _defineProperty2.default)(this, "setEmail", function (value) {
    _this.attributes.email = value;
  });
  (0, _defineProperty2.default)(this, "getFtpPermission", function () {
    return _this.attributes.ftp_permission;
  });
  (0, _defineProperty2.default)(this, "setFtpPermission", function (value) {
    _this.attributes.ftp_permission = value;
  });
  (0, _defineProperty2.default)(this, "getGroupIds", function () {
    return _this.attributes.group_ids;
  });
  (0, _defineProperty2.default)(this, "setGroupIds", function (value) {
    _this.attributes.group_ids = value;
  });
  (0, _defineProperty2.default)(this, "getHeaderText", function () {
    return _this.attributes.header_text;
  });
  (0, _defineProperty2.default)(this, "setHeaderText", function (value) {
    _this.attributes.header_text = value;
  });
  (0, _defineProperty2.default)(this, "getLanguage", function () {
    return _this.attributes.language;
  });
  (0, _defineProperty2.default)(this, "setLanguage", function (value) {
    _this.attributes.language = value;
  });
  (0, _defineProperty2.default)(this, "getLastLoginAt", function () {
    return _this.attributes.last_login_at;
  });
  (0, _defineProperty2.default)(this, "setLastLoginAt", function (value) {
    _this.attributes.last_login_at = value;
  });
  (0, _defineProperty2.default)(this, "getLastProtocolCipher", function () {
    return _this.attributes.last_protocol_cipher;
  });
  (0, _defineProperty2.default)(this, "setLastProtocolCipher", function (value) {
    _this.attributes.last_protocol_cipher = value;
  });
  (0, _defineProperty2.default)(this, "getLockoutExpires", function () {
    return _this.attributes.lockout_expires;
  });
  (0, _defineProperty2.default)(this, "setLockoutExpires", function (value) {
    _this.attributes.lockout_expires = value;
  });
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  (0, _defineProperty2.default)(this, "getCompany", function () {
    return _this.attributes.company;
  });
  (0, _defineProperty2.default)(this, "setCompany", function (value) {
    _this.attributes.company = value;
  });
  (0, _defineProperty2.default)(this, "getNotes", function () {
    return _this.attributes.notes;
  });
  (0, _defineProperty2.default)(this, "setNotes", function (value) {
    _this.attributes.notes = value;
  });
  (0, _defineProperty2.default)(this, "getNotificationDailySendTime", function () {
    return _this.attributes.notification_daily_send_time;
  });
  (0, _defineProperty2.default)(this, "setNotificationDailySendTime", function (value) {
    _this.attributes.notification_daily_send_time = value;
  });
  (0, _defineProperty2.default)(this, "getOfficeIntegrationEnabled", function () {
    return _this.attributes.office_integration_enabled;
  });
  (0, _defineProperty2.default)(this, "setOfficeIntegrationEnabled", function (value) {
    _this.attributes.office_integration_enabled = value;
  });
  (0, _defineProperty2.default)(this, "getPasswordSetAt", function () {
    return _this.attributes.password_set_at;
  });
  (0, _defineProperty2.default)(this, "setPasswordSetAt", function (value) {
    _this.attributes.password_set_at = value;
  });
  (0, _defineProperty2.default)(this, "getPasswordValidityDays", function () {
    return _this.attributes.password_validity_days;
  });
  (0, _defineProperty2.default)(this, "setPasswordValidityDays", function (value) {
    _this.attributes.password_validity_days = value;
  });
  (0, _defineProperty2.default)(this, "getPublicKeysCount", function () {
    return _this.attributes.public_keys_count;
  });
  (0, _defineProperty2.default)(this, "setPublicKeysCount", function (value) {
    _this.attributes.public_keys_count = value;
  });
  (0, _defineProperty2.default)(this, "getReceiveAdminAlerts", function () {
    return _this.attributes.receive_admin_alerts;
  });
  (0, _defineProperty2.default)(this, "setReceiveAdminAlerts", function (value) {
    _this.attributes.receive_admin_alerts = value;
  });
  (0, _defineProperty2.default)(this, "getRequire2fa", function () {
    return _this.attributes.require_2fa;
  });
  (0, _defineProperty2.default)(this, "setRequire2fa", function (value) {
    _this.attributes.require_2fa = value;
  });
  (0, _defineProperty2.default)(this, "getActive2fa", function () {
    return _this.attributes.active_2fa;
  });
  (0, _defineProperty2.default)(this, "setActive2fa", function (value) {
    _this.attributes.active_2fa = value;
  });
  (0, _defineProperty2.default)(this, "getRequirePasswordChange", function () {
    return _this.attributes.require_password_change;
  });
  (0, _defineProperty2.default)(this, "setRequirePasswordChange", function (value) {
    _this.attributes.require_password_change = value;
  });
  (0, _defineProperty2.default)(this, "getPasswordExpired", function () {
    return _this.attributes.password_expired;
  });
  (0, _defineProperty2.default)(this, "setPasswordExpired", function (value) {
    _this.attributes.password_expired = value;
  });
  (0, _defineProperty2.default)(this, "getRestapiPermission", function () {
    return _this.attributes.restapi_permission;
  });
  (0, _defineProperty2.default)(this, "setRestapiPermission", function (value) {
    _this.attributes.restapi_permission = value;
  });
  (0, _defineProperty2.default)(this, "getSelfManaged", function () {
    return _this.attributes.self_managed;
  });
  (0, _defineProperty2.default)(this, "setSelfManaged", function (value) {
    _this.attributes.self_managed = value;
  });
  (0, _defineProperty2.default)(this, "getSftpPermission", function () {
    return _this.attributes.sftp_permission;
  });
  (0, _defineProperty2.default)(this, "setSftpPermission", function (value) {
    _this.attributes.sftp_permission = value;
  });
  (0, _defineProperty2.default)(this, "getSiteAdmin", function () {
    return _this.attributes.site_admin;
  });
  (0, _defineProperty2.default)(this, "setSiteAdmin", function (value) {
    _this.attributes.site_admin = value;
  });
  (0, _defineProperty2.default)(this, "getSkipWelcomeScreen", function () {
    return _this.attributes.skip_welcome_screen;
  });
  (0, _defineProperty2.default)(this, "setSkipWelcomeScreen", function (value) {
    _this.attributes.skip_welcome_screen = value;
  });
  (0, _defineProperty2.default)(this, "getSslRequired", function () {
    return _this.attributes.ssl_required;
  });
  (0, _defineProperty2.default)(this, "setSslRequired", function (value) {
    _this.attributes.ssl_required = value;
  });
  (0, _defineProperty2.default)(this, "getSsoStrategyId", function () {
    return _this.attributes.sso_strategy_id;
  });
  (0, _defineProperty2.default)(this, "setSsoStrategyId", function (value) {
    _this.attributes.sso_strategy_id = value;
  });
  (0, _defineProperty2.default)(this, "getSubscribeToNewsletter", function () {
    return _this.attributes.subscribe_to_newsletter;
  });
  (0, _defineProperty2.default)(this, "setSubscribeToNewsletter", function (value) {
    _this.attributes.subscribe_to_newsletter = value;
  });
  (0, _defineProperty2.default)(this, "getExternallyManaged", function () {
    return _this.attributes.externally_managed;
  });
  (0, _defineProperty2.default)(this, "setExternallyManaged", function (value) {
    _this.attributes.externally_managed = value;
  });
  (0, _defineProperty2.default)(this, "getTimeZone", function () {
    return _this.attributes.time_zone;
  });
  (0, _defineProperty2.default)(this, "setTimeZone", function (value) {
    _this.attributes.time_zone = value;
  });
  (0, _defineProperty2.default)(this, "getTypeOf2fa", function () {
    return _this.attributes.type_of_2fa;
  });
  (0, _defineProperty2.default)(this, "setTypeOf2fa", function (value) {
    _this.attributes.type_of_2fa = value;
  });
  (0, _defineProperty2.default)(this, "getUserRoot", function () {
    return _this.attributes.user_root;
  });
  (0, _defineProperty2.default)(this, "setUserRoot", function (value) {
    _this.attributes.user_root = value;
  });
  (0, _defineProperty2.default)(this, "getAvatarFile", function () {
    return _this.attributes.avatar_file;
  });
  (0, _defineProperty2.default)(this, "setAvatarFile", function (value) {
    _this.attributes.avatar_file = value;
  });
  (0, _defineProperty2.default)(this, "getAvatarDelete", function () {
    return _this.attributes.avatar_delete;
  });
  (0, _defineProperty2.default)(this, "setAvatarDelete", function (value) {
    _this.attributes.avatar_delete = value;
  });
  (0, _defineProperty2.default)(this, "getChangePassword", function () {
    return _this.attributes.change_password;
  });
  (0, _defineProperty2.default)(this, "setChangePassword", function (value) {
    _this.attributes.change_password = value;
  });
  (0, _defineProperty2.default)(this, "getChangePasswordConfirmation", function () {
    return _this.attributes.change_password_confirmation;
  });
  (0, _defineProperty2.default)(this, "setChangePasswordConfirmation", function (value) {
    _this.attributes.change_password_confirmation = value;
  });
  (0, _defineProperty2.default)(this, "getGrantPermission", function () {
    return _this.attributes.grant_permission;
  });
  (0, _defineProperty2.default)(this, "setGrantPermission", function (value) {
    _this.attributes.grant_permission = value;
  });
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
  });
  (0, _defineProperty2.default)(this, "getImportedPasswordHash", function () {
    return _this.attributes.imported_password_hash;
  });
  (0, _defineProperty2.default)(this, "setImportedPasswordHash", function (value) {
    _this.attributes.imported_password_hash = value;
  });
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  (0, _defineProperty2.default)(this, "getPasswordConfirmation", function () {
    return _this.attributes.password_confirmation;
  });
  (0, _defineProperty2.default)(this, "setPasswordConfirmation", function (value) {
    _this.attributes.password_confirmation = value;
  });
  (0, _defineProperty2.default)(this, "getAnnouncementsRead", function () {
    return _this.attributes.announcements_read;
  });
  (0, _defineProperty2.default)(this, "setAnnouncementsRead", function (value) {
    _this.attributes.announcements_read = value;
  });
  (0, _defineProperty2.default)(this, "unlock", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
        response,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

            if (_this.attributes.id) {
              _context.next = 3;
              break;
            }

            throw new errors.EmptyPropertyError('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context.next = 5;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context.next = 8;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (params['id']) {
              _context.next = 14;
              break;
            }

            if (!_this.attributes.id) {
              _context.next = 13;
              break;
            }

            params['id'] = _this.id;
            _context.next = 14;
            break;

          case 13:
            throw new errors.MissingParameterError('Parameter missing: id');

          case 14:
            _context.next = 16;
            return _Api.default.sendRequest("/users/".concat(params['id'], "/unlock"), 'POST', params, _this.options);

          case 16:
            response = _context.sent;
            return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "resendWelcomeEmail", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
        response,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};

            if (_this.attributes.id) {
              _context2.next = 3;
              break;
            }

            throw new errors.EmptyPropertyError('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context2.next = 5;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context2.next = 8;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (params['id']) {
              _context2.next = 14;
              break;
            }

            if (!_this.attributes.id) {
              _context2.next = 13;
              break;
            }

            params['id'] = _this.id;
            _context2.next = 14;
            break;

          case 13:
            throw new errors.MissingParameterError('Parameter missing: id');

          case 14:
            _context2.next = 16;
            return _Api.default.sendRequest("/users/".concat(params['id'], "/resend_welcome_email"), 'POST', params, _this.options);

          case 16:
            response = _context2.sent;
            return _context2.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "user2faReset", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
        response,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};

            if (_this.attributes.id) {
              _context3.next = 3;
              break;
            }

            throw new errors.EmptyPropertyError('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context3.next = 5;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context3.next = 8;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (params['id']) {
              _context3.next = 14;
              break;
            }

            if (!_this.attributes.id) {
              _context3.next = 13;
              break;
            }

            params['id'] = _this.id;
            _context3.next = 14;
            break;

          case 13:
            throw new errors.MissingParameterError('Parameter missing: id');

          case 14:
            _context3.next = 16;
            return _Api.default.sendRequest("/users/".concat(params['id'], "/2fa/reset"), 'POST', params, _this.options);

          case 16:
            response = _context3.sent;
            return _context3.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var params,
        response,
        _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};

            if (_this.attributes.id) {
              _context4.next = 3;
              break;
            }

            throw new errors.EmptyPropertyError('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context4.next = 5;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context4.next = 8;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (!(params['change_password'] && !(0, _utils.isString)(params['change_password']))) {
              _context4.next = 10;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: change_password must be of type String, received ".concat((0, _utils.getType)(change_password)));

          case 10:
            if (!(params['change_password_confirmation'] && !(0, _utils.isString)(params['change_password_confirmation']))) {
              _context4.next = 12;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: change_password_confirmation must be of type String, received ".concat((0, _utils.getType)(change_password_confirmation)));

          case 12:
            if (!(params['email'] && !(0, _utils.isString)(params['email']))) {
              _context4.next = 14;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(email)));

          case 14:
            if (!(params['grant_permission'] && !(0, _utils.isString)(params['grant_permission']))) {
              _context4.next = 16;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: grant_permission must be of type String, received ".concat((0, _utils.getType)(grant_permission)));

          case 16:
            if (!(params['group_id'] && !(0, _utils.isInt)(params['group_id']))) {
              _context4.next = 18;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(group_id)));

          case 18:
            if (!(params['group_ids'] && !(0, _utils.isString)(params['group_ids']))) {
              _context4.next = 20;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(group_ids)));

          case 20:
            if (!(params['imported_password_hash'] && !(0, _utils.isString)(params['imported_password_hash']))) {
              _context4.next = 22;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: imported_password_hash must be of type String, received ".concat((0, _utils.getType)(imported_password_hash)));

          case 22:
            if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
              _context4.next = 24;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));

          case 24:
            if (!(params['password_confirmation'] && !(0, _utils.isString)(params['password_confirmation']))) {
              _context4.next = 26;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: password_confirmation must be of type String, received ".concat((0, _utils.getType)(password_confirmation)));

          case 26:
            if (!(params['allowed_ips'] && !(0, _utils.isString)(params['allowed_ips']))) {
              _context4.next = 28;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(allowed_ips)));

          case 28:
            if (!(params['authenticate_until'] && !(0, _utils.isString)(params['authenticate_until']))) {
              _context4.next = 30;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: authenticate_until must be of type String, received ".concat((0, _utils.getType)(authenticate_until)));

          case 30:
            if (!(params['authentication_method'] && !(0, _utils.isString)(params['authentication_method']))) {
              _context4.next = 32;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: authentication_method must be of type String, received ".concat((0, _utils.getType)(authentication_method)));

          case 32:
            if (!(params['header_text'] && !(0, _utils.isString)(params['header_text']))) {
              _context4.next = 34;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: header_text must be of type String, received ".concat((0, _utils.getType)(header_text)));

          case 34:
            if (!(params['language'] && !(0, _utils.isString)(params['language']))) {
              _context4.next = 36;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(language)));

          case 36:
            if (!(params['notification_daily_send_time'] && !(0, _utils.isInt)(params['notification_daily_send_time']))) {
              _context4.next = 38;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: notification_daily_send_time must be of type Int, received ".concat((0, _utils.getType)(notification_daily_send_time)));

          case 38:
            if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
              _context4.next = 40;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

          case 40:
            if (!(params['company'] && !(0, _utils.isString)(params['company']))) {
              _context4.next = 42;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(company)));

          case 42:
            if (!(params['notes'] && !(0, _utils.isString)(params['notes']))) {
              _context4.next = 44;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(notes)));

          case 44:
            if (!(params['password_validity_days'] && !(0, _utils.isInt)(params['password_validity_days']))) {
              _context4.next = 46;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(password_validity_days)));

          case 46:
            if (!(params['ssl_required'] && !(0, _utils.isString)(params['ssl_required']))) {
              _context4.next = 48;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: ssl_required must be of type String, received ".concat((0, _utils.getType)(ssl_required)));

          case 48:
            if (!(params['sso_strategy_id'] && !(0, _utils.isInt)(params['sso_strategy_id']))) {
              _context4.next = 50;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: sso_strategy_id must be of type Int, received ".concat((0, _utils.getType)(sso_strategy_id)));

          case 50:
            if (!(params['require_2fa'] && !(0, _utils.isString)(params['require_2fa']))) {
              _context4.next = 52;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: require_2fa must be of type String, received ".concat((0, _utils.getType)(require_2fa)));

          case 52:
            if (!(params['time_zone'] && !(0, _utils.isString)(params['time_zone']))) {
              _context4.next = 54;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: time_zone must be of type String, received ".concat((0, _utils.getType)(time_zone)));

          case 54:
            if (!(params['user_root'] && !(0, _utils.isString)(params['user_root']))) {
              _context4.next = 56;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: user_root must be of type String, received ".concat((0, _utils.getType)(user_root)));

          case 56:
            if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
              _context4.next = 58;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));

          case 58:
            if (params['id']) {
              _context4.next = 64;
              break;
            }

            if (!_this.attributes.id) {
              _context4.next = 63;
              break;
            }

            params['id'] = _this.id;
            _context4.next = 64;
            break;

          case 63:
            throw new errors.MissingParameterError('Parameter missing: id');

          case 64:
            _context4.next = 66;
            return _Api.default.sendRequest("/users/".concat(params['id']), 'PATCH', params, _this.options);

          case 66:
            response = _context4.sent;
            return _context4.abrupt("return", new User(response === null || response === void 0 ? void 0 : response.data, _this.options));

          case 68:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
    var params,
        response,
        _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};

            if (_this.attributes.id) {
              _context5.next = 3;
              break;
            }

            throw new errors.EmptyPropertyError('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context5.next = 5;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context5.next = 8;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (params['id']) {
              _context5.next = 14;
              break;
            }

            if (!_this.attributes.id) {
              _context5.next = 13;
              break;
            }

            params['id'] = _this.id;
            _context5.next = 14;
            break;

          case 13:
            throw new errors.MissingParameterError('Parameter missing: id');

          case 14:
            _context5.next = 16;
            return _Api.default.sendRequest("/users/".concat(params['id']), 'DELETE', params, _this.options);

          case 16:
            response = _context5.sent;
            return _context5.abrupt("return", response === null || response === void 0 ? void 0 : response.data);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = User.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref6) {
    var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
        key = _ref7[0],
        value = _ref7[1];

    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
(0, _defineProperty2.default)(User, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var _response$data;

  var params,
      options,
      response,
      _args6 = arguments;
  return _regenerator.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
          options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};

          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context6.next = 4;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context6.next = 6;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 6:
          if (!(params['ids'] && !(0, _utils.isString)(params['ids']))) {
            _context6.next = 8;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: ids must be of type String, received ".concat((0, _utils.getType)(ids)));

        case 8:
          if (!(params['search'] && !(0, _utils.isString)(params['search']))) {
            _context6.next = 10;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: search must be of type String, received ".concat((0, _utils.getType)(search)));

        case 10:
          _context6.next = 12;
          return _Api.default.sendRequest("/users", 'GET', params, options);

        case 12:
          response = _context6.sent;
          return _context6.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new User(obj, options);
          })) || []);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
(0, _defineProperty2.default)(User, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return User.list(params, options);
});
(0, _defineProperty2.default)(User, "find", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(id) {
    var params,
        options,
        response,
        _args7 = arguments;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
            options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context7.next = 4;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['id'] = id;

            if (params['id']) {
              _context7.next = 7;
              break;
            }

            throw new errors.MissingParameterError('Parameter missing: id');

          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context7.next = 9;
              break;
            }

            throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 9:
            _context7.next = 11;
            return _Api.default.sendRequest("/users/".concat(params['id']), 'GET', params, options);

          case 11:
            response = _context7.sent;
            return _context7.abrupt("return", new User(response === null || response === void 0 ? void 0 : response.data, options));

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x) {
    return _ref9.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(User, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return User.find(id, params, options);
});
(0, _defineProperty2.default)(User, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var params,
      options,
      response,
      _args8 = arguments;
  return _regenerator.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
          options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};

          if (!(params['change_password'] && !(0, _utils.isString)(params['change_password']))) {
            _context8.next = 4;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: change_password must be of type String, received ".concat((0, _utils.getType)(change_password)));

        case 4:
          if (!(params['change_password_confirmation'] && !(0, _utils.isString)(params['change_password_confirmation']))) {
            _context8.next = 6;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: change_password_confirmation must be of type String, received ".concat((0, _utils.getType)(change_password_confirmation)));

        case 6:
          if (!(params['email'] && !(0, _utils.isString)(params['email']))) {
            _context8.next = 8;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: email must be of type String, received ".concat((0, _utils.getType)(email)));

        case 8:
          if (!(params['grant_permission'] && !(0, _utils.isString)(params['grant_permission']))) {
            _context8.next = 10;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: grant_permission must be of type String, received ".concat((0, _utils.getType)(grant_permission)));

        case 10:
          if (!(params['group_id'] && !(0, _utils.isInt)(params['group_id']))) {
            _context8.next = 12;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(group_id)));

        case 12:
          if (!(params['group_ids'] && !(0, _utils.isString)(params['group_ids']))) {
            _context8.next = 14;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: group_ids must be of type String, received ".concat((0, _utils.getType)(group_ids)));

        case 14:
          if (!(params['imported_password_hash'] && !(0, _utils.isString)(params['imported_password_hash']))) {
            _context8.next = 16;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: imported_password_hash must be of type String, received ".concat((0, _utils.getType)(imported_password_hash)));

        case 16:
          if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
            _context8.next = 18;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));

        case 18:
          if (!(params['password_confirmation'] && !(0, _utils.isString)(params['password_confirmation']))) {
            _context8.next = 20;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: password_confirmation must be of type String, received ".concat((0, _utils.getType)(password_confirmation)));

        case 20:
          if (!(params['allowed_ips'] && !(0, _utils.isString)(params['allowed_ips']))) {
            _context8.next = 22;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: allowed_ips must be of type String, received ".concat((0, _utils.getType)(allowed_ips)));

        case 22:
          if (!(params['authenticate_until'] && !(0, _utils.isString)(params['authenticate_until']))) {
            _context8.next = 24;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: authenticate_until must be of type String, received ".concat((0, _utils.getType)(authenticate_until)));

        case 24:
          if (!(params['authentication_method'] && !(0, _utils.isString)(params['authentication_method']))) {
            _context8.next = 26;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: authentication_method must be of type String, received ".concat((0, _utils.getType)(authentication_method)));

        case 26:
          if (!(params['header_text'] && !(0, _utils.isString)(params['header_text']))) {
            _context8.next = 28;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: header_text must be of type String, received ".concat((0, _utils.getType)(header_text)));

        case 28:
          if (!(params['language'] && !(0, _utils.isString)(params['language']))) {
            _context8.next = 30;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: language must be of type String, received ".concat((0, _utils.getType)(language)));

        case 30:
          if (!(params['notification_daily_send_time'] && !(0, _utils.isInt)(params['notification_daily_send_time']))) {
            _context8.next = 32;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: notification_daily_send_time must be of type Int, received ".concat((0, _utils.getType)(notification_daily_send_time)));

        case 32:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context8.next = 34;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

        case 34:
          if (!(params['company'] && !(0, _utils.isString)(params['company']))) {
            _context8.next = 36;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: company must be of type String, received ".concat((0, _utils.getType)(company)));

        case 36:
          if (!(params['notes'] && !(0, _utils.isString)(params['notes']))) {
            _context8.next = 38;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: notes must be of type String, received ".concat((0, _utils.getType)(notes)));

        case 38:
          if (!(params['password_validity_days'] && !(0, _utils.isInt)(params['password_validity_days']))) {
            _context8.next = 40;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: password_validity_days must be of type Int, received ".concat((0, _utils.getType)(password_validity_days)));

        case 40:
          if (!(params['ssl_required'] && !(0, _utils.isString)(params['ssl_required']))) {
            _context8.next = 42;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: ssl_required must be of type String, received ".concat((0, _utils.getType)(ssl_required)));

        case 42:
          if (!(params['sso_strategy_id'] && !(0, _utils.isInt)(params['sso_strategy_id']))) {
            _context8.next = 44;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: sso_strategy_id must be of type Int, received ".concat((0, _utils.getType)(sso_strategy_id)));

        case 44:
          if (!(params['require_2fa'] && !(0, _utils.isString)(params['require_2fa']))) {
            _context8.next = 46;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: require_2fa must be of type String, received ".concat((0, _utils.getType)(require_2fa)));

        case 46:
          if (!(params['time_zone'] && !(0, _utils.isString)(params['time_zone']))) {
            _context8.next = 48;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: time_zone must be of type String, received ".concat((0, _utils.getType)(time_zone)));

        case 48:
          if (!(params['user_root'] && !(0, _utils.isString)(params['user_root']))) {
            _context8.next = 50;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: user_root must be of type String, received ".concat((0, _utils.getType)(user_root)));

        case 50:
          if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
            _context8.next = 52;
            break;
          }

          throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));

        case 52:
          _context8.next = 54;
          return _Api.default.sendRequest("/users", 'POST', params, options);

        case 54:
          response = _context8.sent;
          return _context8.abrupt("return", new User(response === null || response === void 0 ? void 0 : response.data, options));

        case 56:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));
var _default = User;
exports.default = _default;