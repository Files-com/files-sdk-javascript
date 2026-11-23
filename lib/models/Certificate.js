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
var _Certificate;
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
 * Class Certificate
 */
var Certificate = /*#__PURE__*/(0, _createClass2.default)(function Certificate() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Certificate);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Certificate ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // string # Descriptive name of certificate
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // int64 # Custom Domain that owns this certificate, including while the certificate is inactive.
  (0, _defineProperty2.default)(this, "getCustomDomainId", function () {
    return _this.attributes.custom_domain_id;
  });
  (0, _defineProperty2.default)(this, "setCustomDomainId", function (value) {
    _this.attributes.custom_domain_id = value;
    exposeAttributes(_this, ['custom_domain_id']);
  });
  // string # Full text of SSL certificate
  (0, _defineProperty2.default)(this, "getCertificate", function () {
    return _this.attributes.certificate;
  });
  (0, _defineProperty2.default)(this, "setCertificate", function (value) {
    _this.attributes.certificate = value;
    exposeAttributes(_this, ['certificate']);
  });
  // date-time # Certificate created at
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // string # Certificate status. (One of `Request Generated`, `New`, `Active`, `Active/Expired`, `Expired`, or `Available`)
  (0, _defineProperty2.default)(this, "getDisplayStatus", function () {
    return _this.attributes.display_status;
  });
  (0, _defineProperty2.default)(this, "setDisplayStatus", function (value) {
    _this.attributes.display_status = value;
    exposeAttributes(_this, ['display_status']);
  });
  // array(string) # Domains on this certificate other than files.com domains
  (0, _defineProperty2.default)(this, "getDomains", function () {
    return _this.attributes.domains;
  });
  (0, _defineProperty2.default)(this, "setDomains", function (value) {
    _this.attributes.domains = value;
    exposeAttributes(_this, ['domains']);
  });
  // date-time # Certificate expiration date/time
  (0, _defineProperty2.default)(this, "getExpiresAt", function () {
    return _this.attributes.expires_at;
  });
  (0, _defineProperty2.default)(this, "setExpiresAt", function (value) {
    _this.attributes.expires_at = value;
    exposeAttributes(_this, ['expires_at']);
  });
  // boolean # Is this certificate automatically managed and renewed by Files.com?
  (0, _defineProperty2.default)(this, "getBrickManaged", function () {
    return _this.attributes.brick_managed;
  });
  (0, _defineProperty2.default)(this, "setBrickManaged", function (value) {
    _this.attributes.brick_managed = value;
    exposeAttributes(_this, ['brick_managed']);
  });
  // string # Intermediate certificates
  (0, _defineProperty2.default)(this, "getIntermediates", function () {
    return _this.attributes.intermediates;
  });
  (0, _defineProperty2.default)(this, "setIntermediates", function (value) {
    _this.attributes.intermediates = value;
    exposeAttributes(_this, ['intermediates']);
  });
  // array(string) # A list of IP addresses associated with this SSL Certificate
  (0, _defineProperty2.default)(this, "getIpAddresses", function () {
    return _this.attributes.ip_addresses;
  });
  (0, _defineProperty2.default)(this, "setIpAddresses", function (value) {
    _this.attributes.ip_addresses = value;
    exposeAttributes(_this, ['ip_addresses']);
  });
  // string # X509 issuer
  (0, _defineProperty2.default)(this, "getIssuer", function () {
    return _this.attributes.issuer;
  });
  (0, _defineProperty2.default)(this, "setIssuer", function (value) {
    _this.attributes.issuer = value;
    exposeAttributes(_this, ['issuer']);
  });
  // string # Type of key
  (0, _defineProperty2.default)(this, "getKeyType", function () {
    return _this.attributes.key_type;
  });
  (0, _defineProperty2.default)(this, "setKeyType", function (value) {
    _this.attributes.key_type = value;
    exposeAttributes(_this, ['key_type']);
  });
  // string # Certificate signing request text
  (0, _defineProperty2.default)(this, "getRequest", function () {
    return _this.attributes.request;
  });
  (0, _defineProperty2.default)(this, "setRequest", function (value) {
    _this.attributes.request = value;
    exposeAttributes(_this, ['request']);
  });
  // string # Certificate status (Request Generated, New, Active, Active/Expired, Expired, or Available)
  (0, _defineProperty2.default)(this, "getStatus", function () {
    return _this.attributes.status;
  });
  (0, _defineProperty2.default)(this, "setStatus", function (value) {
    _this.attributes.status = value;
    exposeAttributes(_this, ['status']);
  });
  // string # X509 Subject name
  (0, _defineProperty2.default)(this, "getSubject", function () {
    return _this.attributes.subject;
  });
  (0, _defineProperty2.default)(this, "setSubject", function (value) {
    _this.attributes.subject = value;
    exposeAttributes(_this, ['subject']);
  });
  // string # Domain for certificate.
  (0, _defineProperty2.default)(this, "getCertificateDomain", function () {
    return _this.attributes.certificate_domain;
  });
  (0, _defineProperty2.default)(this, "setCertificateDomain", function (value) {
    _this.attributes.certificate_domain = value;
    exposeAttributes(_this, ['certificate_domain']);
  });
  // array(string) # Additional domains for the certificate CSR.
  (0, _defineProperty2.default)(this, "getCertificateExtraDomains", function () {
    return _this.attributes.certificate_extra_domains;
  });
  (0, _defineProperty2.default)(this, "setCertificateExtraDomains", function (value) {
    _this.attributes.certificate_extra_domains = value;
    exposeAttributes(_this, ['certificate_extra_domains']);
  });
  // string # Country.
  (0, _defineProperty2.default)(this, "getCertificateCountry", function () {
    return _this.attributes.certificate_country;
  });
  (0, _defineProperty2.default)(this, "setCertificateCountry", function (value) {
    _this.attributes.certificate_country = value;
    exposeAttributes(_this, ['certificate_country']);
  });
  // string # State or province.
  (0, _defineProperty2.default)(this, "getCertificateStateOrProvince", function () {
    return _this.attributes.certificate_state_or_province;
  });
  (0, _defineProperty2.default)(this, "setCertificateStateOrProvince", function (value) {
    _this.attributes.certificate_state_or_province = value;
    exposeAttributes(_this, ['certificate_state_or_province']);
  });
  // string # City or locale.
  (0, _defineProperty2.default)(this, "getCertificateCityOrLocale", function () {
    return _this.attributes.certificate_city_or_locale;
  });
  (0, _defineProperty2.default)(this, "setCertificateCityOrLocale", function (value) {
    _this.attributes.certificate_city_or_locale = value;
    exposeAttributes(_this, ['certificate_city_or_locale']);
  });
  // string # Company name.
  (0, _defineProperty2.default)(this, "getCertificateCompanyName", function () {
    return _this.attributes.certificate_company_name;
  });
  (0, _defineProperty2.default)(this, "setCertificateCompanyName", function (value) {
    _this.attributes.certificate_company_name = value;
    exposeAttributes(_this, ['certificate_company_name']);
  });
  // string # Department name or organization unit 1
  (0, _defineProperty2.default)(this, "getCsrOu1", function () {
    return _this.attributes.csr_ou1;
  });
  (0, _defineProperty2.default)(this, "setCsrOu1", function (value) {
    _this.attributes.csr_ou1 = value;
    exposeAttributes(_this, ['csr_ou1']);
  });
  // string # Department name or organization unit 2
  (0, _defineProperty2.default)(this, "getCsrOu2", function () {
    return _this.attributes.csr_ou2;
  });
  (0, _defineProperty2.default)(this, "setCsrOu2", function (value) {
    _this.attributes.csr_ou2 = value;
    exposeAttributes(_this, ['csr_ou2']);
  });
  // string # Department name or organization unit 3
  (0, _defineProperty2.default)(this, "getCsrOu3", function () {
    return _this.attributes.csr_ou3;
  });
  (0, _defineProperty2.default)(this, "setCsrOu3", function (value) {
    _this.attributes.csr_ou3 = value;
    exposeAttributes(_this, ['csr_ou3']);
  });
  // string # Email address for the certificate owner.
  (0, _defineProperty2.default)(this, "getCertificateEmailAddress", function () {
    return _this.attributes.certificate_email_address;
  });
  (0, _defineProperty2.default)(this, "setCertificateEmailAddress", function (value) {
    _this.attributes.certificate_email_address = value;
    exposeAttributes(_this, ['certificate_email_address']);
  });
  // string # Certificate private key.
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
    exposeAttributes(_this, ['private_key']);
  });
  // string # Certificate password.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
    exposeAttributes(_this, ['password']);
  });
  // Activate SSL Certificate
  //
  // Parameters:
  //   replace_cert - string - Leave blank or set to `any` to replace any currently active certificate, if applicable.  Set to `new_ips` to activate this certificate as an additional certificate on your Site by allocating a new set of Dedicated IPs (may require a Plan upgrade).  Set to the ID of a currently active certificate to replace that certificate on its set of dedicated IPs.  A certificate belonging to a Custom Domain activates only for that domain: leave blank, use `any`, or specify that domain's current certificate ID.
  (0, _defineProperty2.default)(this, "activate", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.replace_cert !== undefined && params.replace_cert !== null && !(0, _utils.isString)(params.replace_cert))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: replace_cert must be of type String, received ".concat((0, _utils.getType)(params.replace_cert)));
        case 4:
          if (params.id) {
            _context.next = 6;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 5;
            break;
          }
          params.id = _this.id;
          _context.next = 6;
          break;
        case 5:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 6:
          _context.next = 7;
          return _Api.default.sendRequest("/certificates/".concat(encodeURIComponent(params.id), "/activate"), 'POST', params, _this.options);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Deactivate SSL Certificate
  (0, _defineProperty2.default)(this, "deactivate", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/certificates/".concat(encodeURIComponent(params.id), "/deactivate"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  // Replace this active custom SSL Certificate for the Primary Custom Domain with a Files.com SSL Certificate.  The Primary Custom Domain's CNAME record must point at the Site's subdomain.  The Files.com certificate is issued and activated in the background
  (0, _defineProperty2.default)(this, "replaceWithFiles", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/certificates/".concat(encodeURIComponent(params.id), "/replace_with_files_certificate"), 'POST', params, _this.options);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  // Parameters:
  //   name - string - Internal certificate name.
  //   intermediates - string - Any intermediate certificates.  PEM or PKCS7 formats accepted.
  //   certificate - string - The certificate.  PEM or PKCS7 formats accepted.
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context4.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context4.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 4:
          if (!(params.intermediates !== undefined && params.intermediates !== null && !(0, _utils.isString)(params.intermediates))) {
            _context4.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: intermediates must be of type String, received ".concat((0, _utils.getType)(params.intermediates)));
        case 5:
          if (!(params.certificate !== undefined && params.certificate !== null && !(0, _utils.isString)(params.certificate))) {
            _context4.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: certificate must be of type String, received ".concat((0, _utils.getType)(params.certificate)));
        case 6:
          if (params.id) {
            _context4.next = 8;
            break;
          }
          if (!_this.attributes.id) {
            _context4.next = 7;
            break;
          }
          params.id = _this.id;
          _context4.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 8:
          _context4.next = 9;
          return _Api.default.sendRequest("/certificates/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 9:
          response = _context4.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context4.abrupt("return", _this);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
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
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context5.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context5.next = 4;
            break;
          }
          params.id = _this.id;
          _context5.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context5.next = 6;
          return _Api.default.sendRequest("/certificates/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
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
    var newObject;
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
          return _context6.abrupt("return", true);
        case 2:
          _context6.next = 3;
          return Certificate.create(_this.attributes, _this.options);
        case 3:
          newObject = _context6.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context6.abrupt("return", true);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Certificate = Certificate;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
(0, _defineProperty2.default)(Certificate, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
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
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context7.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context7.next = 3;
        return _Api.default.sendRequest('/certificates', 'GET', params, options);
      case 3:
        response = _context7.sent;
        return _context7.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Certificate(obj, retainedOptions(options));
        })) || []);
      case 4:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
(0, _defineProperty2.default)(Certificate, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Certificate.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Certificate, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Certificate.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Certificate ID.
(0, _defineProperty2.default)(Certificate, "find", /*#__PURE__*/function () {
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context8.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context8.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context8.next = 4;
          return _Api.default.sendRequest("/certificates/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context8.sent;
          return _context8.abrupt("return", new _Certificate(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
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
(0, _defineProperty2.default)(Certificate, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Certificate.find(id, params, options);
});
// Parameters:
//   name (required) - string - Internal name of the SSL certificate.
//   certificate_domain - string - Domain for certificate.
//   certificate_extra_domains - array(string) - Additional domains for the certificate CSR.
//   certificate_country - string - Country.
//   certificate_state_or_province - string - State or province.
//   certificate_city_or_locale - string - City or locale.
//   certificate_company_name - string - Company name.
//   csr_ou1 - string - Department name or organization unit 1
//   csr_ou2 - string - Department name or organization unit 2
//   csr_ou3 - string - Department name or organization unit 3
//   certificate_email_address - string - Email address for the certificate owner.
//   key_type - string - Any supported key type.  Defaults to `RSA-4096`.
//   certificate - string - The certificate.  PEM or PKCS7 formats accepted.
//   private_key - string - Certificate private key.
//   password - string - Certificate password.
//   intermediates - string - Intermediate certificates.  PEM or PKCS7 formats accepted.
(0, _defineProperty2.default)(Certificate, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9() {
  var params,
    options,
    response,
    _args9 = arguments;
  return _regenerator.default.wrap(function (_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        params = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
        options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
        if (params.name) {
          _context9.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: name');
      case 1:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context9.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 2:
        if (!(params.certificate_domain !== undefined && params.certificate_domain !== null && !(0, _utils.isString)(params.certificate_domain))) {
          _context9.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_domain must be of type String, received ".concat((0, _utils.getType)(params.certificate_domain)));
      case 3:
        if (!(params.certificate_extra_domains !== undefined && params.certificate_extra_domains !== null && !(0, _utils.isArray)(params.certificate_extra_domains))) {
          _context9.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_extra_domains must be of type Array, received ".concat((0, _utils.getType)(params.certificate_extra_domains)));
      case 4:
        if (!(params.certificate_country !== undefined && params.certificate_country !== null && !(0, _utils.isString)(params.certificate_country))) {
          _context9.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_country must be of type String, received ".concat((0, _utils.getType)(params.certificate_country)));
      case 5:
        if (!(params.certificate_state_or_province !== undefined && params.certificate_state_or_province !== null && !(0, _utils.isString)(params.certificate_state_or_province))) {
          _context9.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_state_or_province must be of type String, received ".concat((0, _utils.getType)(params.certificate_state_or_province)));
      case 6:
        if (!(params.certificate_city_or_locale !== undefined && params.certificate_city_or_locale !== null && !(0, _utils.isString)(params.certificate_city_or_locale))) {
          _context9.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_city_or_locale must be of type String, received ".concat((0, _utils.getType)(params.certificate_city_or_locale)));
      case 7:
        if (!(params.certificate_company_name !== undefined && params.certificate_company_name !== null && !(0, _utils.isString)(params.certificate_company_name))) {
          _context9.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_company_name must be of type String, received ".concat((0, _utils.getType)(params.certificate_company_name)));
      case 8:
        if (!(params.csr_ou1 !== undefined && params.csr_ou1 !== null && !(0, _utils.isString)(params.csr_ou1))) {
          _context9.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: csr_ou1 must be of type String, received ".concat((0, _utils.getType)(params.csr_ou1)));
      case 9:
        if (!(params.csr_ou2 !== undefined && params.csr_ou2 !== null && !(0, _utils.isString)(params.csr_ou2))) {
          _context9.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: csr_ou2 must be of type String, received ".concat((0, _utils.getType)(params.csr_ou2)));
      case 10:
        if (!(params.csr_ou3 !== undefined && params.csr_ou3 !== null && !(0, _utils.isString)(params.csr_ou3))) {
          _context9.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: csr_ou3 must be of type String, received ".concat((0, _utils.getType)(params.csr_ou3)));
      case 11:
        if (!(params.certificate_email_address !== undefined && params.certificate_email_address !== null && !(0, _utils.isString)(params.certificate_email_address))) {
          _context9.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate_email_address must be of type String, received ".concat((0, _utils.getType)(params.certificate_email_address)));
      case 12:
        if (!(params.key_type !== undefined && params.key_type !== null && !(0, _utils.isString)(params.key_type))) {
          _context9.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: key_type must be of type String, received ".concat((0, _utils.getType)(params.key_type)));
      case 13:
        if (!(params.certificate !== undefined && params.certificate !== null && !(0, _utils.isString)(params.certificate))) {
          _context9.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: certificate must be of type String, received ".concat((0, _utils.getType)(params.certificate)));
      case 14:
        if (!(params.private_key !== undefined && params.private_key !== null && !(0, _utils.isString)(params.private_key))) {
          _context9.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 15:
        if (!(params.password !== undefined && params.password !== null && !(0, _utils.isString)(params.password))) {
          _context9.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 16:
        if (!(params.intermediates !== undefined && params.intermediates !== null && !(0, _utils.isString)(params.intermediates))) {
          _context9.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: intermediates must be of type String, received ".concat((0, _utils.getType)(params.intermediates)));
      case 17:
        _context9.next = 18;
        return _Api.default.sendRequest('/certificates', 'POST', params, options);
      case 18:
        response = _context9.sent;
        return _context9.abrupt("return", new _Certificate(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 19:
      case "end":
        return _context9.stop();
    }
  }, _callee9);
})));
var _default = exports.default = Certificate;
module.exports = Certificate;
module.exports.default = Certificate;