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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class SsoStrategy
 */
var SsoStrategy = function SsoStrategy() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, SsoStrategy);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getProtocol", function () {
    return _this.attributes.protocol;
  });
  (0, _defineProperty2.default)(this, "getProvider", function () {
    return _this.attributes.provider;
  });
  (0, _defineProperty2.default)(this, "getLabel", function () {
    return _this.attributes.label;
  });
  (0, _defineProperty2.default)(this, "getLogoUrl", function () {
    return _this.attributes.logo_url;
  });
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "getSamlProviderCertFingerprint", function () {
    return _this.attributes.saml_provider_cert_fingerprint;
  });
  (0, _defineProperty2.default)(this, "getSamlProviderIssuerUrl", function () {
    return _this.attributes.saml_provider_issuer_url;
  });
  (0, _defineProperty2.default)(this, "getSamlProviderMetadataUrl", function () {
    return _this.attributes.saml_provider_metadata_url;
  });
  (0, _defineProperty2.default)(this, "getSamlProviderSloTargetUrl", function () {
    return _this.attributes.saml_provider_slo_target_url;
  });
  (0, _defineProperty2.default)(this, "getSamlProviderSsoTargetUrl", function () {
    return _this.attributes.saml_provider_sso_target_url;
  });
  (0, _defineProperty2.default)(this, "getScimAuthenticationMethod", function () {
    return _this.attributes.scim_authentication_method;
  });
  (0, _defineProperty2.default)(this, "getScimUsername", function () {
    return _this.attributes.scim_username;
  });
  (0, _defineProperty2.default)(this, "getSubdomain", function () {
    return _this.attributes.subdomain;
  });
  (0, _defineProperty2.default)(this, "getProvisionUsers", function () {
    return _this.attributes.provision_users;
  });
  (0, _defineProperty2.default)(this, "getProvisionGroups", function () {
    return _this.attributes.provision_groups;
  });
  (0, _defineProperty2.default)(this, "getDeprovisionUsers", function () {
    return _this.attributes.deprovision_users;
  });
  (0, _defineProperty2.default)(this, "getDeprovisionGroups", function () {
    return _this.attributes.deprovision_groups;
  });
  (0, _defineProperty2.default)(this, "getProvisionGroupDefault", function () {
    return _this.attributes.provision_group_default;
  });
  (0, _defineProperty2.default)(this, "getProvisionGroupExclusion", function () {
    return _this.attributes.provision_group_exclusion;
  });
  (0, _defineProperty2.default)(this, "getProvisionGroupInclusion", function () {
    return _this.attributes.provision_group_inclusion;
  });
  (0, _defineProperty2.default)(this, "getProvisionGroupRequired", function () {
    return _this.attributes.provision_group_required;
  });
  (0, _defineProperty2.default)(this, "getProvisionAttachmentsPermission", function () {
    return _this.attributes.provision_attachments_permission;
  });
  (0, _defineProperty2.default)(this, "getProvisionDavPermission", function () {
    return _this.attributes.provision_dav_permission;
  });
  (0, _defineProperty2.default)(this, "getProvisionFtpPermission", function () {
    return _this.attributes.provision_ftp_permission;
  });
  (0, _defineProperty2.default)(this, "getProvisionSftpPermission", function () {
    return _this.attributes.provision_sftp_permission;
  });
  (0, _defineProperty2.default)(this, "getProvisionTimeZone", function () {
    return _this.attributes.provision_time_zone;
  });
  (0, _defineProperty2.default)(this, "getLdapBaseDn", function () {
    return _this.attributes.ldap_base_dn;
  });
  (0, _defineProperty2.default)(this, "getLdapDomain", function () {
    return _this.attributes.ldap_domain;
  });
  (0, _defineProperty2.default)(this, "getEnabled", function () {
    return _this.attributes.enabled;
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
  (0, _defineProperty2.default)(this, "getLdapUsername", function () {
    return _this.attributes.ldap_username;
  });
  (0, _defineProperty2.default)(this, "getLdapUsernameField", function () {
    return _this.attributes.ldap_username_field;
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

(0, _defineProperty2.default)(SsoStrategy, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
  var _response$data;

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

          if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
            _context.next = 4;
            break;
          }

          throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context.next = 6;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 6:
          if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
            _context.next = 8;
            break;
          }

          throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

        case 8:
          _context.next = 10;
          return _Api.default.sendRequest("/sso_strategies", 'GET', params, options);

        case 10:
          response = _context.sent;
          return _context.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new SsoStrategy(obj, options);
          })) || []);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
(0, _defineProperty2.default)(SsoStrategy, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return SsoStrategy.list(params, options);
});
(0, _defineProperty2.default)(SsoStrategy, "find", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
    var params,
        options,
        response,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context2.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['id'] = id;

            if (params['id']) {
              _context2.next = 7;
              break;
            }

            throw new Error('Parameter missing: id');

          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context2.next = 9;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 9:
            _context2.next = 11;
            return _Api.default.sendRequest("/sso_strategies/' . params['id'] . '", 'GET', params, options);

          case 11:
            response = _context2.sent;
            return _context2.abrupt("return", new SsoStrategy(response === null || response === void 0 ? void 0 : response.data, options));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(SsoStrategy, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return SsoStrategy.find(id, params, options);
});
var _default = SsoStrategy;
exports.default = _default;