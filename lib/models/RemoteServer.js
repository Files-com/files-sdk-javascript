"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Api = _interopRequireDefault(require("../Api"));

var _Logger = _interopRequireDefault(require("../Logger"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Class RemoteServer
 */
var RemoteServer = function RemoteServer() {
  var _this = this;

  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, RemoteServer);
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
  (0, _defineProperty2.default)(this, "getAuthenticationMethod", function () {
    return _this.attributes.authentication_method;
  });
  (0, _defineProperty2.default)(this, "setAuthenticationMethod", function (value) {
    _this.attributes.authentication_method = value;
  });
  (0, _defineProperty2.default)(this, "getHostname", function () {
    return _this.attributes.hostname;
  });
  (0, _defineProperty2.default)(this, "setHostname", function (value) {
    _this.attributes.hostname = value;
  });
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  (0, _defineProperty2.default)(this, "getPort", function () {
    return _this.attributes.port;
  });
  (0, _defineProperty2.default)(this, "setPort", function (value) {
    _this.attributes.port = value;
  });
  (0, _defineProperty2.default)(this, "getMaxConnections", function () {
    return _this.attributes.max_connections;
  });
  (0, _defineProperty2.default)(this, "setMaxConnections", function (value) {
    _this.attributes.max_connections = value;
  });
  (0, _defineProperty2.default)(this, "getS3Bucket", function () {
    return _this.attributes.s3_bucket;
  });
  (0, _defineProperty2.default)(this, "setS3Bucket", function (value) {
    _this.attributes.s3_bucket = value;
  });
  (0, _defineProperty2.default)(this, "getS3Region", function () {
    return _this.attributes.s3_region;
  });
  (0, _defineProperty2.default)(this, "setS3Region", function (value) {
    _this.attributes.s3_region = value;
  });
  (0, _defineProperty2.default)(this, "getServerCertificate", function () {
    return _this.attributes.server_certificate;
  });
  (0, _defineProperty2.default)(this, "setServerCertificate", function (value) {
    _this.attributes.server_certificate = value;
  });
  (0, _defineProperty2.default)(this, "getServerHostKey", function () {
    return _this.attributes.server_host_key;
  });
  (0, _defineProperty2.default)(this, "setServerHostKey", function (value) {
    _this.attributes.server_host_key = value;
  });
  (0, _defineProperty2.default)(this, "getServerType", function () {
    return _this.attributes.server_type;
  });
  (0, _defineProperty2.default)(this, "setServerType", function (value) {
    _this.attributes.server_type = value;
  });
  (0, _defineProperty2.default)(this, "getSsl", function () {
    return _this.attributes.ssl;
  });
  (0, _defineProperty2.default)(this, "setSsl", function (value) {
    _this.attributes.ssl = value;
  });
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageBucket", function () {
    return _this.attributes.google_cloud_storage_bucket;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageBucket", function (value) {
    _this.attributes.google_cloud_storage_bucket = value;
  });
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageProjectId", function () {
    return _this.attributes.google_cloud_storage_project_id;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageProjectId", function (value) {
    _this.attributes.google_cloud_storage_project_id = value;
  });
  (0, _defineProperty2.default)(this, "getBackblazeB2S3Endpoint", function () {
    return _this.attributes.backblaze_b2_s3_endpoint;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2S3Endpoint", function (value) {
    _this.attributes.backblaze_b2_s3_endpoint = value;
  });
  (0, _defineProperty2.default)(this, "getBackblazeB2Bucket", function () {
    return _this.attributes.backblaze_b2_bucket;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2Bucket", function (value) {
    _this.attributes.backblaze_b2_bucket = value;
  });
  (0, _defineProperty2.default)(this, "getWasabiBucket", function () {
    return _this.attributes.wasabi_bucket;
  });
  (0, _defineProperty2.default)(this, "setWasabiBucket", function (value) {
    _this.attributes.wasabi_bucket = value;
  });
  (0, _defineProperty2.default)(this, "getWasabiRegion", function () {
    return _this.attributes.wasabi_region;
  });
  (0, _defineProperty2.default)(this, "setWasabiRegion", function (value) {
    _this.attributes.wasabi_region = value;
  });
  (0, _defineProperty2.default)(this, "getRackspaceUsername", function () {
    return _this.attributes.rackspace_username;
  });
  (0, _defineProperty2.default)(this, "setRackspaceUsername", function (value) {
    _this.attributes.rackspace_username = value;
  });
  (0, _defineProperty2.default)(this, "getRackspaceRegion", function () {
    return _this.attributes.rackspace_region;
  });
  (0, _defineProperty2.default)(this, "setRackspaceRegion", function (value) {
    _this.attributes.rackspace_region = value;
  });
  (0, _defineProperty2.default)(this, "getRackspaceContainer", function () {
    return _this.attributes.rackspace_container;
  });
  (0, _defineProperty2.default)(this, "setRackspaceContainer", function (value) {
    _this.attributes.rackspace_container = value;
  });
  (0, _defineProperty2.default)(this, "getAuthSetupLink", function () {
    return _this.attributes.auth_setup_link;
  });
  (0, _defineProperty2.default)(this, "setAuthSetupLink", function (value) {
    _this.attributes.auth_setup_link = value;
  });
  (0, _defineProperty2.default)(this, "getAuthStatus", function () {
    return _this.attributes.auth_status;
  });
  (0, _defineProperty2.default)(this, "setAuthStatus", function (value) {
    _this.attributes.auth_status = value;
  });
  (0, _defineProperty2.default)(this, "getAuthAccountName", function () {
    return _this.attributes.auth_account_name;
  });
  (0, _defineProperty2.default)(this, "setAuthAccountName", function (value) {
    _this.attributes.auth_account_name = value;
  });
  (0, _defineProperty2.default)(this, "getOneDriveAccountType", function () {
    return _this.attributes.one_drive_account_type;
  });
  (0, _defineProperty2.default)(this, "setOneDriveAccountType", function (value) {
    _this.attributes.one_drive_account_type = value;
  });
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccount", function () {
    return _this.attributes.azure_blob_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccount", function (value) {
    _this.attributes.azure_blob_storage_account = value;
  });
  (0, _defineProperty2.default)(this, "getAzureBlobStorageContainer", function () {
    return _this.attributes.azure_blob_storage_container;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageContainer", function (value) {
    _this.attributes.azure_blob_storage_container = value;
  });
  (0, _defineProperty2.default)(this, "getAwsAccessKey", function () {
    return _this.attributes.aws_access_key;
  });
  (0, _defineProperty2.default)(this, "setAwsAccessKey", function (value) {
    _this.attributes.aws_access_key = value;
  });
  (0, _defineProperty2.default)(this, "getAwsSecretKey", function () {
    return _this.attributes.aws_secret_key;
  });
  (0, _defineProperty2.default)(this, "setAwsSecretKey", function (value) {
    _this.attributes.aws_secret_key = value;
  });
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
  });
  (0, _defineProperty2.default)(this, "getSslCertificate", function () {
    return _this.attributes.ssl_certificate;
  });
  (0, _defineProperty2.default)(this, "setSslCertificate", function (value) {
    _this.attributes.ssl_certificate = value;
  });
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageCredentialsJson", function () {
    return _this.attributes.google_cloud_storage_credentials_json;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageCredentialsJson", function (value) {
    _this.attributes.google_cloud_storage_credentials_json = value;
  });
  (0, _defineProperty2.default)(this, "getWasabiAccessKey", function () {
    return _this.attributes.wasabi_access_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiAccessKey", function (value) {
    _this.attributes.wasabi_access_key = value;
  });
  (0, _defineProperty2.default)(this, "getWasabiSecretKey", function () {
    return _this.attributes.wasabi_secret_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiSecretKey", function (value) {
    _this.attributes.wasabi_secret_key = value;
  });
  (0, _defineProperty2.default)(this, "getBackblazeB2KeyId", function () {
    return _this.attributes.backblaze_b2_key_id;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2KeyId", function (value) {
    _this.attributes.backblaze_b2_key_id = value;
  });
  (0, _defineProperty2.default)(this, "getBackblazeB2ApplicationKey", function () {
    return _this.attributes.backblaze_b2_application_key;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2ApplicationKey", function (value) {
    _this.attributes.backblaze_b2_application_key = value;
  });
  (0, _defineProperty2.default)(this, "getRackspaceApiKey", function () {
    return _this.attributes.rackspace_api_key;
  });
  (0, _defineProperty2.default)(this, "setRackspaceApiKey", function (value) {
    _this.attributes.rackspace_api_key = value;
  });
  (0, _defineProperty2.default)(this, "getResetAuthentication", function () {
    return _this.attributes.reset_authentication;
  });
  (0, _defineProperty2.default)(this, "setResetAuthentication", function (value) {
    _this.attributes.reset_authentication = value;
  });
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccessKey", function () {
    return _this.attributes.azure_blob_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccessKey", function (value) {
    _this.attributes.azure_blob_storage_access_key = value;
  });
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
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

            throw new Error('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context.next = 8;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 8:
            if (!(params['aws_access_key'] && !(0, _utils.isString)(params['aws_access_key']))) {
              _context.next = 10;
              break;
            }

            throw new Error("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(aws_access_key)));

          case 10:
            if (!(params['aws_secret_key'] && !(0, _utils.isString)(params['aws_secret_key']))) {
              _context.next = 12;
              break;
            }

            throw new Error("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(aws_secret_key)));

          case 12:
            if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
              _context.next = 14;
              break;
            }

            throw new Error("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));

          case 14:
            if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
              _context.next = 16;
              break;
            }

            throw new Error("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(private_key)));

          case 16:
            if (!(params['ssl_certificate'] && !(0, _utils.isString)(params['ssl_certificate']))) {
              _context.next = 18;
              break;
            }

            throw new Error("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(ssl_certificate)));

          case 18:
            if (!(params['google_cloud_storage_credentials_json'] && !(0, _utils.isString)(params['google_cloud_storage_credentials_json']))) {
              _context.next = 20;
              break;
            }

            throw new Error("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_credentials_json)));

          case 20:
            if (!(params['wasabi_access_key'] && !(0, _utils.isString)(params['wasabi_access_key']))) {
              _context.next = 22;
              break;
            }

            throw new Error("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(wasabi_access_key)));

          case 22:
            if (!(params['wasabi_secret_key'] && !(0, _utils.isString)(params['wasabi_secret_key']))) {
              _context.next = 24;
              break;
            }

            throw new Error("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(wasabi_secret_key)));

          case 24:
            if (!(params['backblaze_b2_key_id'] && !(0, _utils.isString)(params['backblaze_b2_key_id']))) {
              _context.next = 26;
              break;
            }

            throw new Error("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_key_id)));

          case 26:
            if (!(params['backblaze_b2_application_key'] && !(0, _utils.isString)(params['backblaze_b2_application_key']))) {
              _context.next = 28;
              break;
            }

            throw new Error("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_application_key)));

          case 28:
            if (!(params['rackspace_api_key'] && !(0, _utils.isString)(params['rackspace_api_key']))) {
              _context.next = 30;
              break;
            }

            throw new Error("Bad parameter: rackspace_api_key must be of type String, received ".concat((0, _utils.getType)(rackspace_api_key)));

          case 30:
            if (!(params['azure_blob_storage_access_key'] && !(0, _utils.isString)(params['azure_blob_storage_access_key']))) {
              _context.next = 32;
              break;
            }

            throw new Error("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_access_key)));

          case 32:
            if (!(params['hostname'] && !(0, _utils.isString)(params['hostname']))) {
              _context.next = 34;
              break;
            }

            throw new Error("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(hostname)));

          case 34:
            if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
              _context.next = 36;
              break;
            }

            throw new Error("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

          case 36:
            if (!(params['max_connections'] && !(0, _utils.isInt)(params['max_connections']))) {
              _context.next = 38;
              break;
            }

            throw new Error("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(max_connections)));

          case 38:
            if (!(params['port'] && !(0, _utils.isInt)(params['port']))) {
              _context.next = 40;
              break;
            }

            throw new Error("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(port)));

          case 40:
            if (!(params['s3_bucket'] && !(0, _utils.isString)(params['s3_bucket']))) {
              _context.next = 42;
              break;
            }

            throw new Error("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(s3_bucket)));

          case 42:
            if (!(params['s3_region'] && !(0, _utils.isString)(params['s3_region']))) {
              _context.next = 44;
              break;
            }

            throw new Error("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(s3_region)));

          case 44:
            if (!(params['server_certificate'] && !(0, _utils.isString)(params['server_certificate']))) {
              _context.next = 46;
              break;
            }

            throw new Error("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(server_certificate)));

          case 46:
            if (!(params['server_host_key'] && !(0, _utils.isString)(params['server_host_key']))) {
              _context.next = 48;
              break;
            }

            throw new Error("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(server_host_key)));

          case 48:
            if (!(params['server_type'] && !(0, _utils.isString)(params['server_type']))) {
              _context.next = 50;
              break;
            }

            throw new Error("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(server_type)));

          case 50:
            if (!(params['ssl'] && !(0, _utils.isString)(params['ssl']))) {
              _context.next = 52;
              break;
            }

            throw new Error("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(ssl)));

          case 52:
            if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
              _context.next = 54;
              break;
            }

            throw new Error("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));

          case 54:
            if (!(params['google_cloud_storage_bucket'] && !(0, _utils.isString)(params['google_cloud_storage_bucket']))) {
              _context.next = 56;
              break;
            }

            throw new Error("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_bucket)));

          case 56:
            if (!(params['google_cloud_storage_project_id'] && !(0, _utils.isString)(params['google_cloud_storage_project_id']))) {
              _context.next = 58;
              break;
            }

            throw new Error("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_project_id)));

          case 58:
            if (!(params['backblaze_b2_bucket'] && !(0, _utils.isString)(params['backblaze_b2_bucket']))) {
              _context.next = 60;
              break;
            }

            throw new Error("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_bucket)));

          case 60:
            if (!(params['backblaze_b2_s3_endpoint'] && !(0, _utils.isString)(params['backblaze_b2_s3_endpoint']))) {
              _context.next = 62;
              break;
            }

            throw new Error("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_s3_endpoint)));

          case 62:
            if (!(params['wasabi_bucket'] && !(0, _utils.isString)(params['wasabi_bucket']))) {
              _context.next = 64;
              break;
            }

            throw new Error("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(wasabi_bucket)));

          case 64:
            if (!(params['wasabi_region'] && !(0, _utils.isString)(params['wasabi_region']))) {
              _context.next = 66;
              break;
            }

            throw new Error("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(wasabi_region)));

          case 66:
            if (!(params['rackspace_username'] && !(0, _utils.isString)(params['rackspace_username']))) {
              _context.next = 68;
              break;
            }

            throw new Error("Bad parameter: rackspace_username must be of type String, received ".concat((0, _utils.getType)(rackspace_username)));

          case 68:
            if (!(params['rackspace_region'] && !(0, _utils.isString)(params['rackspace_region']))) {
              _context.next = 70;
              break;
            }

            throw new Error("Bad parameter: rackspace_region must be of type String, received ".concat((0, _utils.getType)(rackspace_region)));

          case 70:
            if (!(params['rackspace_container'] && !(0, _utils.isString)(params['rackspace_container']))) {
              _context.next = 72;
              break;
            }

            throw new Error("Bad parameter: rackspace_container must be of type String, received ".concat((0, _utils.getType)(rackspace_container)));

          case 72:
            if (!(params['one_drive_account_type'] && !(0, _utils.isString)(params['one_drive_account_type']))) {
              _context.next = 74;
              break;
            }

            throw new Error("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(one_drive_account_type)));

          case 74:
            if (!(params['azure_blob_storage_account'] && !(0, _utils.isString)(params['azure_blob_storage_account']))) {
              _context.next = 76;
              break;
            }

            throw new Error("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_account)));

          case 76:
            if (!(params['azure_blob_storage_container'] && !(0, _utils.isString)(params['azure_blob_storage_container']))) {
              _context.next = 78;
              break;
            }

            throw new Error("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_container)));

          case 78:
            if (params['id']) {
              _context.next = 84;
              break;
            }

            if (!_this.attributes.id) {
              _context.next = 83;
              break;
            }

            params['id'] = _this.id;
            _context.next = 84;
            break;

          case 83:
            throw new Error('Parameter missing: id');

          case 84:
            return _context.abrupt("return", _Api.default.sendRequest("/remote_servers/".concat(params['id']), 'PATCH', params, _this.options));

          case 85:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
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

            throw new Error('Current object has no id');

          case 3:
            if ((0, _utils.isObject)(params)) {
              _context2.next = 5;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 5:
            params.id = _this.attributes.id;

            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context2.next = 8;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

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
            throw new Error('Parameter missing: id');

          case 14:
            return _context2.abrupt("return", _Api.default.sendRequest("/remote_servers/".concat(params['id']), 'DELETE', params, _this.options));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = RemoteServer.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
};

(0, _defineProperty2.default)(RemoteServer, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
  var _response$data;

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

          if (!(params['page'] && !(0, _utils.isInt)(params['page']))) {
            _context3.next = 4;
            break;
          }

          throw new Error("Bad parameter: page must be of type Int, received ".concat((0, _utils.getType)(page)));

        case 4:
          if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
            _context3.next = 6;
            break;
          }

          throw new Error("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(per_page)));

        case 6:
          if (!(params['action'] && !(0, _utils.isString)(params['action']))) {
            _context3.next = 8;
            break;
          }

          throw new Error("Bad parameter: action must be of type String, received ".concat((0, _utils.getType)(action)));

        case 8:
          if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
            _context3.next = 10;
            break;
          }

          throw new Error("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(cursor)));

        case 10:
          _context3.next = 12;
          return _Api.default.sendRequest("/remote_servers", 'GET', params, options);

        case 12:
          response = _context3.sent;
          return _context3.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
            return new RemoteServer(obj, options);
          })) || []);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
(0, _defineProperty2.default)(RemoteServer, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return RemoteServer.list(params, options);
});
(0, _defineProperty2.default)(RemoteServer, "find", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
    var params,
        options,
        response,
        _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};

            if ((0, _utils.isObject)(params)) {
              _context4.next = 4;
              break;
            }

            throw new Error("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));

          case 4:
            params['id'] = id;

            if (params['id']) {
              _context4.next = 7;
              break;
            }

            throw new Error('Parameter missing: id');

          case 7:
            if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
              _context4.next = 9;
              break;
            }

            throw new Error("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));

          case 9:
            _context4.next = 11;
            return _Api.default.sendRequest("/remote_servers/".concat(params['id']), 'GET', params, options);

          case 11:
            response = _context4.sent;
            return _context4.abrupt("return", new RemoteServer(response === null || response === void 0 ? void 0 : response.data, options));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x) {
    return _ref6.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(RemoteServer, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return RemoteServer.find(id, params, options);
});
(0, _defineProperty2.default)(RemoteServer, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var params,
      options,
      response,
      _args5 = arguments;
  return _regenerator.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};

          if (!(params['aws_access_key'] && !(0, _utils.isString)(params['aws_access_key']))) {
            _context5.next = 4;
            break;
          }

          throw new Error("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(aws_access_key)));

        case 4:
          if (!(params['aws_secret_key'] && !(0, _utils.isString)(params['aws_secret_key']))) {
            _context5.next = 6;
            break;
          }

          throw new Error("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(aws_secret_key)));

        case 6:
          if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
            _context5.next = 8;
            break;
          }

          throw new Error("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));

        case 8:
          if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
            _context5.next = 10;
            break;
          }

          throw new Error("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(private_key)));

        case 10:
          if (!(params['ssl_certificate'] && !(0, _utils.isString)(params['ssl_certificate']))) {
            _context5.next = 12;
            break;
          }

          throw new Error("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(ssl_certificate)));

        case 12:
          if (!(params['google_cloud_storage_credentials_json'] && !(0, _utils.isString)(params['google_cloud_storage_credentials_json']))) {
            _context5.next = 14;
            break;
          }

          throw new Error("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_credentials_json)));

        case 14:
          if (!(params['wasabi_access_key'] && !(0, _utils.isString)(params['wasabi_access_key']))) {
            _context5.next = 16;
            break;
          }

          throw new Error("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(wasabi_access_key)));

        case 16:
          if (!(params['wasabi_secret_key'] && !(0, _utils.isString)(params['wasabi_secret_key']))) {
            _context5.next = 18;
            break;
          }

          throw new Error("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(wasabi_secret_key)));

        case 18:
          if (!(params['backblaze_b2_key_id'] && !(0, _utils.isString)(params['backblaze_b2_key_id']))) {
            _context5.next = 20;
            break;
          }

          throw new Error("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_key_id)));

        case 20:
          if (!(params['backblaze_b2_application_key'] && !(0, _utils.isString)(params['backblaze_b2_application_key']))) {
            _context5.next = 22;
            break;
          }

          throw new Error("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_application_key)));

        case 22:
          if (!(params['rackspace_api_key'] && !(0, _utils.isString)(params['rackspace_api_key']))) {
            _context5.next = 24;
            break;
          }

          throw new Error("Bad parameter: rackspace_api_key must be of type String, received ".concat((0, _utils.getType)(rackspace_api_key)));

        case 24:
          if (!(params['azure_blob_storage_access_key'] && !(0, _utils.isString)(params['azure_blob_storage_access_key']))) {
            _context5.next = 26;
            break;
          }

          throw new Error("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_access_key)));

        case 26:
          if (!(params['hostname'] && !(0, _utils.isString)(params['hostname']))) {
            _context5.next = 28;
            break;
          }

          throw new Error("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(hostname)));

        case 28:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context5.next = 30;
            break;
          }

          throw new Error("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));

        case 30:
          if (!(params['max_connections'] && !(0, _utils.isInt)(params['max_connections']))) {
            _context5.next = 32;
            break;
          }

          throw new Error("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(max_connections)));

        case 32:
          if (!(params['port'] && !(0, _utils.isInt)(params['port']))) {
            _context5.next = 34;
            break;
          }

          throw new Error("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(port)));

        case 34:
          if (!(params['s3_bucket'] && !(0, _utils.isString)(params['s3_bucket']))) {
            _context5.next = 36;
            break;
          }

          throw new Error("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(s3_bucket)));

        case 36:
          if (!(params['s3_region'] && !(0, _utils.isString)(params['s3_region']))) {
            _context5.next = 38;
            break;
          }

          throw new Error("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(s3_region)));

        case 38:
          if (!(params['server_certificate'] && !(0, _utils.isString)(params['server_certificate']))) {
            _context5.next = 40;
            break;
          }

          throw new Error("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(server_certificate)));

        case 40:
          if (!(params['server_host_key'] && !(0, _utils.isString)(params['server_host_key']))) {
            _context5.next = 42;
            break;
          }

          throw new Error("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(server_host_key)));

        case 42:
          if (!(params['server_type'] && !(0, _utils.isString)(params['server_type']))) {
            _context5.next = 44;
            break;
          }

          throw new Error("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(server_type)));

        case 44:
          if (!(params['ssl'] && !(0, _utils.isString)(params['ssl']))) {
            _context5.next = 46;
            break;
          }

          throw new Error("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(ssl)));

        case 46:
          if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
            _context5.next = 48;
            break;
          }

          throw new Error("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));

        case 48:
          if (!(params['google_cloud_storage_bucket'] && !(0, _utils.isString)(params['google_cloud_storage_bucket']))) {
            _context5.next = 50;
            break;
          }

          throw new Error("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_bucket)));

        case 50:
          if (!(params['google_cloud_storage_project_id'] && !(0, _utils.isString)(params['google_cloud_storage_project_id']))) {
            _context5.next = 52;
            break;
          }

          throw new Error("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_project_id)));

        case 52:
          if (!(params['backblaze_b2_bucket'] && !(0, _utils.isString)(params['backblaze_b2_bucket']))) {
            _context5.next = 54;
            break;
          }

          throw new Error("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_bucket)));

        case 54:
          if (!(params['backblaze_b2_s3_endpoint'] && !(0, _utils.isString)(params['backblaze_b2_s3_endpoint']))) {
            _context5.next = 56;
            break;
          }

          throw new Error("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_s3_endpoint)));

        case 56:
          if (!(params['wasabi_bucket'] && !(0, _utils.isString)(params['wasabi_bucket']))) {
            _context5.next = 58;
            break;
          }

          throw new Error("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(wasabi_bucket)));

        case 58:
          if (!(params['wasabi_region'] && !(0, _utils.isString)(params['wasabi_region']))) {
            _context5.next = 60;
            break;
          }

          throw new Error("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(wasabi_region)));

        case 60:
          if (!(params['rackspace_username'] && !(0, _utils.isString)(params['rackspace_username']))) {
            _context5.next = 62;
            break;
          }

          throw new Error("Bad parameter: rackspace_username must be of type String, received ".concat((0, _utils.getType)(rackspace_username)));

        case 62:
          if (!(params['rackspace_region'] && !(0, _utils.isString)(params['rackspace_region']))) {
            _context5.next = 64;
            break;
          }

          throw new Error("Bad parameter: rackspace_region must be of type String, received ".concat((0, _utils.getType)(rackspace_region)));

        case 64:
          if (!(params['rackspace_container'] && !(0, _utils.isString)(params['rackspace_container']))) {
            _context5.next = 66;
            break;
          }

          throw new Error("Bad parameter: rackspace_container must be of type String, received ".concat((0, _utils.getType)(rackspace_container)));

        case 66:
          if (!(params['one_drive_account_type'] && !(0, _utils.isString)(params['one_drive_account_type']))) {
            _context5.next = 68;
            break;
          }

          throw new Error("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(one_drive_account_type)));

        case 68:
          if (!(params['azure_blob_storage_account'] && !(0, _utils.isString)(params['azure_blob_storage_account']))) {
            _context5.next = 70;
            break;
          }

          throw new Error("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_account)));

        case 70:
          if (!(params['azure_blob_storage_container'] && !(0, _utils.isString)(params['azure_blob_storage_container']))) {
            _context5.next = 72;
            break;
          }

          throw new Error("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_container)));

        case 72:
          _context5.next = 74;
          return _Api.default.sendRequest("/remote_servers", 'POST', params, options);

        case 74:
          response = _context5.sent;
          return _context5.abrupt("return", new RemoteServer(response === null || response === void 0 ? void 0 : response.data, options));

        case 76:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
var _default = RemoteServer;
exports.default = _default;