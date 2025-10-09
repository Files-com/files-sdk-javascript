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
var _SsoStrategy;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class SsoStrategy
 */
var SsoStrategy = /*#__PURE__*/(0, _createClass2.default)(function SsoStrategy() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, SsoStrategy);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # SSO Protocol
  (0, _defineProperty2.default)(this, "getProtocol", function () {
    return _this.attributes.protocol;
  });
  // string # Provider name
  (0, _defineProperty2.default)(this, "getProvider", function () {
    return _this.attributes.provider;
  });
  // string # Custom label for the SSO provider on the login page.
  (0, _defineProperty2.default)(this, "getLabel", function () {
    return _this.attributes.label;
  });
  // string # URL holding a custom logo for the SSO provider on the login page.
  (0, _defineProperty2.default)(this, "getLogoUrl", function () {
    return _this.attributes.logo_url;
  });
  // int64 # ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  // int64 # Count of users with this SSO Strategy
  (0, _defineProperty2.default)(this, "getUserCount", function () {
    return _this.attributes.user_count;
  });
  // string # Identity provider sha256 cert fingerprint if saml_provider_metadata_url is not available.
  (0, _defineProperty2.default)(this, "getSamlProviderCertFingerprint", function () {
    return _this.attributes.saml_provider_cert_fingerprint;
  });
  // string # Identity provider issuer url
  (0, _defineProperty2.default)(this, "getSamlProviderIssuerUrl", function () {
    return _this.attributes.saml_provider_issuer_url;
  });
  // string # Custom identity provider metadata
  (0, _defineProperty2.default)(this, "getSamlProviderMetadataContent", function () {
    return _this.attributes.saml_provider_metadata_content;
  });
  // string # Metadata URL for the SAML identity provider
  (0, _defineProperty2.default)(this, "getSamlProviderMetadataUrl", function () {
    return _this.attributes.saml_provider_metadata_url;
  });
  // string # Identity provider SLO endpoint
  (0, _defineProperty2.default)(this, "getSamlProviderSloTargetUrl", function () {
    return _this.attributes.saml_provider_slo_target_url;
  });
  // string # Identity provider SSO endpoint if saml_provider_metadata_url is not available.
  (0, _defineProperty2.default)(this, "getSamlProviderSsoTargetUrl", function () {
    return _this.attributes.saml_provider_sso_target_url;
  });
  // string # SCIM authentication type.
  (0, _defineProperty2.default)(this, "getScimAuthenticationMethod", function () {
    return _this.attributes.scim_authentication_method;
  });
  // string # SCIM username.
  (0, _defineProperty2.default)(this, "getScimUsername", function () {
    return _this.attributes.scim_username;
  });
  // string # SCIM OAuth Access Token.
  (0, _defineProperty2.default)(this, "getScimOauthAccessToken", function () {
    return _this.attributes.scim_oauth_access_token;
  });
  // string # SCIM OAuth Access Token Expiration Time.
  (0, _defineProperty2.default)(this, "getScimOauthAccessTokenExpiresAt", function () {
    return _this.attributes.scim_oauth_access_token_expires_at;
  });
  // string # Subdomain or domain name for your auth provider.   Example: `https://[subdomain].okta.com/`
  (0, _defineProperty2.default)(this, "getSubdomain", function () {
    return _this.attributes.subdomain;
  });
  // boolean # Auto-provision users?
  (0, _defineProperty2.default)(this, "getProvisionUsers", function () {
    return _this.attributes.provision_users;
  });
  // boolean # Auto-provision group membership based on group memberships on the SSO side?
  (0, _defineProperty2.default)(this, "getProvisionGroups", function () {
    return _this.attributes.provision_groups;
  });
  // boolean # Auto-deprovision users?
  (0, _defineProperty2.default)(this, "getDeprovisionUsers", function () {
    return _this.attributes.deprovision_users;
  });
  // boolean # Auto-deprovision group membership based on group memberships on the SSO side?
  (0, _defineProperty2.default)(this, "getDeprovisionGroups", function () {
    return _this.attributes.deprovision_groups;
  });
  // string # Method used for deprovisioning users.
  (0, _defineProperty2.default)(this, "getDeprovisionBehavior", function () {
    return _this.attributes.deprovision_behavior;
  });
  // string # Comma-separated list of group names for groups to automatically add all auto-provisioned users to.
  (0, _defineProperty2.default)(this, "getProvisionGroupDefault", function () {
    return _this.attributes.provision_group_default;
  });
  // string # Comma-separated list of group names for groups (with optional wildcards) that will be excluded from auto-provisioning.
  (0, _defineProperty2.default)(this, "getProvisionGroupExclusion", function () {
    return _this.attributes.provision_group_exclusion;
  });
  // string # Comma-separated list of group names for groups (with optional wildcards) that will be auto-provisioned.
  (0, _defineProperty2.default)(this, "getProvisionGroupInclusion", function () {
    return _this.attributes.provision_group_inclusion;
  });
  // string # Comma or newline separated list of group names (with optional wildcards) to require membership for user provisioning.
  (0, _defineProperty2.default)(this, "getProvisionGroupRequired", function () {
    return _this.attributes.provision_group_required;
  });
  // string # Comma-separated list of group names whose members will be created with email_signup authentication.
  (0, _defineProperty2.default)(this, "getProvisionEmailSignupGroups", function () {
    return _this.attributes.provision_email_signup_groups;
  });
  // string # Comma-separated list of group names whose members will be created as Read-Only Site Admins.
  (0, _defineProperty2.default)(this, "getProvisionReadonlySiteAdminGroups", function () {
    return _this.attributes.provision_readonly_site_admin_groups;
  });
  // string # Comma-separated list of group names whose members will be created as Site Admins.
  (0, _defineProperty2.default)(this, "getProvisionSiteAdminGroups", function () {
    return _this.attributes.provision_site_admin_groups;
  });
  // string # Comma-separated list of group names whose members will be provisioned as Group Admins.
  (0, _defineProperty2.default)(this, "getProvisionGroupAdminGroups", function () {
    return _this.attributes.provision_group_admin_groups;
  });
  // boolean
  (0, _defineProperty2.default)(this, "getProvisionAttachmentsPermission", function () {
    return _this.attributes.provision_attachments_permission;
  });
  // boolean # Auto-provisioned users get WebDAV permission?
  (0, _defineProperty2.default)(this, "getProvisionDavPermission", function () {
    return _this.attributes.provision_dav_permission;
  });
  // boolean # Auto-provisioned users get FTP permission?
  (0, _defineProperty2.default)(this, "getProvisionFtpPermission", function () {
    return _this.attributes.provision_ftp_permission;
  });
  // boolean # Auto-provisioned users get SFTP permission?
  (0, _defineProperty2.default)(this, "getProvisionSftpPermission", function () {
    return _this.attributes.provision_sftp_permission;
  });
  // string # Default time zone for auto provisioned users.
  (0, _defineProperty2.default)(this, "getProvisionTimeZone", function () {
    return _this.attributes.provision_time_zone;
  });
  // string # Default company for auto provisioned users.
  (0, _defineProperty2.default)(this, "getProvisionCompany", function () {
    return _this.attributes.provision_company;
  });
  // string # 2FA required setting for auto provisioned users.
  (0, _defineProperty2.default)(this, "getProvisionRequire2fa", function () {
    return _this.attributes.provision_require_2fa;
  });
  // string # File System layout to use for auto provisioned users.
  (0, _defineProperty2.default)(this, "getProvisionFilesystemLayout", function () {
    return _this.attributes.provision_filesystem_layout;
  });
  // string # URL-friendly, unique identifier for Azure SAML configuration
  (0, _defineProperty2.default)(this, "getProviderIdentifier", function () {
    return _this.attributes.provider_identifier;
  });
  // string # Base DN for looking up users in LDAP server
  (0, _defineProperty2.default)(this, "getLdapBaseDn", function () {
    return _this.attributes.ldap_base_dn;
  });
  // string # Domain name that will be appended to LDAP usernames
  (0, _defineProperty2.default)(this, "getLdapDomain", function () {
    return _this.attributes.ldap_domain;
  });
  // boolean # Is strategy enabled?  This may become automatically set to `false` after a high number and duration of failures.
  (0, _defineProperty2.default)(this, "getEnabled", function () {
    return _this.attributes.enabled;
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
  // string # Username for signing in to LDAP server.
  (0, _defineProperty2.default)(this, "getLdapUsername", function () {
    return _this.attributes.ldap_username;
  });
  // string # LDAP username field
  (0, _defineProperty2.default)(this, "getLdapUsernameField", function () {
    return _this.attributes.ldap_username_field;
  });
  // Synchronize provisioning data with the SSO remote server
  (0, _defineProperty2.default)(this, "sync", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          return _Api.default.sendRequest("/sso_strategies/".concat(encodeURIComponent(params.id), "/sync"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  Object.entries(attributes).forEach(function (_ref2) {
    var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_SsoStrategy = SsoStrategy;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
(0, _defineProperty2.default)(SsoStrategy, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
  var _response$data;
  var params,
    options,
    response,
    _args2 = arguments;
  return _regenerator.default.wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
        options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context2.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context2.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context2.next = 3;
        return _Api.default.sendRequest('/sso_strategies', 'GET', params, options);
      case 3:
        response = _context2.sent;
        return _context2.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _SsoStrategy(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
(0, _defineProperty2.default)(SsoStrategy, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _SsoStrategy.list(params, options);
});
// Parameters:
//   id (required) - int64 - Sso Strategy ID.
(0, _defineProperty2.default)(SsoStrategy, "find", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(id) {
    var params,
      options,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context3.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context3.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context3.next = 4;
          return _Api.default.sendRequest("/sso_strategies/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", new _SsoStrategy(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref5.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(SsoStrategy, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _SsoStrategy.find(id, params, options);
});
var _default = exports.default = SsoStrategy;
module.exports = SsoStrategy;
module.exports.default = SsoStrategy;