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
var _RemoteServerCredential;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class RemoteServerCredential
 */
var RemoteServerCredential = /*#__PURE__*/(0, _createClass2.default)(function RemoteServerCredential() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, RemoteServerCredential);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Remote Server Credential ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // int64 # Workspace ID (0 for default workspace)
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
  });
  // string # Internal name for your reference
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Internal description for your reference
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // string # Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server.
  (0, _defineProperty2.default)(this, "getServerType", function () {
    return _this.attributes.server_type;
  });
  (0, _defineProperty2.default)(this, "setServerType", function (value) {
    _this.attributes.server_type = value;
  });
  // string # AWS Access Key.
  (0, _defineProperty2.default)(this, "getAwsAccessKey", function () {
    return _this.attributes.aws_access_key;
  });
  (0, _defineProperty2.default)(this, "setAwsAccessKey", function (value) {
    _this.attributes.aws_access_key = value;
  });
  // string # AWS IAM Role ARN for AssumeRole authentication.
  (0, _defineProperty2.default)(this, "getS3AssumeRoleArn", function () {
    return _this.attributes.s3_assume_role_arn;
  });
  (0, _defineProperty2.default)(this, "setS3AssumeRoleArn", function (value) {
    _this.attributes.s3_assume_role_arn = value;
  });
  // int64 # Session duration in seconds for AssumeRole authentication (900-43200).
  (0, _defineProperty2.default)(this, "getS3AssumeRoleDurationSeconds", function () {
    return _this.attributes.s3_assume_role_duration_seconds;
  });
  (0, _defineProperty2.default)(this, "setS3AssumeRoleDurationSeconds", function (value) {
    _this.attributes.s3_assume_role_duration_seconds = value;
  });
  // string # External ID for AssumeRole authentication.
  (0, _defineProperty2.default)(this, "getS3AssumeRoleExternalId", function () {
    return _this.attributes.s3_assume_role_external_id;
  });
  (0, _defineProperty2.default)(this, "setS3AssumeRoleExternalId", function (value) {
    _this.attributes.s3_assume_role_external_id = value;
  });
  // string # Google Cloud Storage: S3-compatible Access Key.
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageS3CompatibleAccessKey", function () {
    return _this.attributes.google_cloud_storage_s3_compatible_access_key;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageS3CompatibleAccessKey", function (value) {
    _this.attributes.google_cloud_storage_s3_compatible_access_key = value;
  });
  // string # Wasabi: Access Key.
  (0, _defineProperty2.default)(this, "getWasabiAccessKey", function () {
    return _this.attributes.wasabi_access_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiAccessKey", function (value) {
    _this.attributes.wasabi_access_key = value;
  });
  // string # S3-compatible: Access Key
  (0, _defineProperty2.default)(this, "getS3CompatibleAccessKey", function () {
    return _this.attributes.s3_compatible_access_key;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleAccessKey", function (value) {
    _this.attributes.s3_compatible_access_key = value;
  });
  // string # Filebase: Access Key.
  (0, _defineProperty2.default)(this, "getFilebaseAccessKey", function () {
    return _this.attributes.filebase_access_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseAccessKey", function (value) {
    _this.attributes.filebase_access_key = value;
  });
  // string # Cloudflare: Access Key.
  (0, _defineProperty2.default)(this, "getCloudflareAccessKey", function () {
    return _this.attributes.cloudflare_access_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareAccessKey", function (value) {
    _this.attributes.cloudflare_access_key = value;
  });
  // string # Linode: Access Key
  (0, _defineProperty2.default)(this, "getLinodeAccessKey", function () {
    return _this.attributes.linode_access_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeAccessKey", function (value) {
    _this.attributes.linode_access_key = value;
  });
  // string # Remote server username.
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // string # Password, if needed.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  // string # Private key, if needed.
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
  });
  // string # Passphrase for private key if needed.
  (0, _defineProperty2.default)(this, "getPrivateKeyPassphrase", function () {
    return _this.attributes.private_key_passphrase;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPassphrase", function (value) {
    _this.attributes.private_key_passphrase = value;
  });
  // string # AWS: secret key.
  (0, _defineProperty2.default)(this, "getAwsSecretKey", function () {
    return _this.attributes.aws_secret_key;
  });
  (0, _defineProperty2.default)(this, "setAwsSecretKey", function (value) {
    _this.attributes.aws_secret_key = value;
  });
  // string # Azure Blob Storage: Access Key
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccessKey", function () {
    return _this.attributes.azure_blob_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccessKey", function (value) {
    _this.attributes.azure_blob_storage_access_key = value;
  });
  // string # Azure Blob Storage: Shared Access Signature (SAS) token
  (0, _defineProperty2.default)(this, "getAzureBlobStorageSasToken", function () {
    return _this.attributes.azure_blob_storage_sas_token;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageSasToken", function (value) {
    _this.attributes.azure_blob_storage_sas_token = value;
  });
  // string # Azure File Storage: Access Key
  (0, _defineProperty2.default)(this, "getAzureFilesStorageAccessKey", function () {
    return _this.attributes.azure_files_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageAccessKey", function (value) {
    _this.attributes.azure_files_storage_access_key = value;
  });
  // string # Azure File Storage: Shared Access Signature (SAS) token
  (0, _defineProperty2.default)(this, "getAzureFilesStorageSasToken", function () {
    return _this.attributes.azure_files_storage_sas_token;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageSasToken", function (value) {
    _this.attributes.azure_files_storage_sas_token = value;
  });
  // string # Backblaze B2 Cloud Storage: applicationKey
  (0, _defineProperty2.default)(this, "getBackblazeB2ApplicationKey", function () {
    return _this.attributes.backblaze_b2_application_key;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2ApplicationKey", function (value) {
    _this.attributes.backblaze_b2_application_key = value;
  });
  // string # Backblaze B2 Cloud Storage: keyID
  (0, _defineProperty2.default)(this, "getBackblazeB2KeyId", function () {
    return _this.attributes.backblaze_b2_key_id;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2KeyId", function (value) {
    _this.attributes.backblaze_b2_key_id = value;
  });
  // string # Cloudflare: Secret Key
  (0, _defineProperty2.default)(this, "getCloudflareSecretKey", function () {
    return _this.attributes.cloudflare_secret_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareSecretKey", function (value) {
    _this.attributes.cloudflare_secret_key = value;
  });
  // string # Filebase: Secret Key
  (0, _defineProperty2.default)(this, "getFilebaseSecretKey", function () {
    return _this.attributes.filebase_secret_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseSecretKey", function (value) {
    _this.attributes.filebase_secret_key = value;
  });
  // string # Google Cloud Storage: JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageCredentialsJson", function () {
    return _this.attributes.google_cloud_storage_credentials_json;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageCredentialsJson", function (value) {
    _this.attributes.google_cloud_storage_credentials_json = value;
  });
  // string # Google Cloud Storage: S3-compatible secret key
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageS3CompatibleSecretKey", function () {
    return _this.attributes.google_cloud_storage_s3_compatible_secret_key;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageS3CompatibleSecretKey", function (value) {
    _this.attributes.google_cloud_storage_s3_compatible_secret_key = value;
  });
  // string # Linode: Secret Key
  (0, _defineProperty2.default)(this, "getLinodeSecretKey", function () {
    return _this.attributes.linode_secret_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeSecretKey", function (value) {
    _this.attributes.linode_secret_key = value;
  });
  // string # S3-compatible: Secret Key
  (0, _defineProperty2.default)(this, "getS3CompatibleSecretKey", function () {
    return _this.attributes.s3_compatible_secret_key;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleSecretKey", function (value) {
    _this.attributes.s3_compatible_secret_key = value;
  });
  // string # Wasabi: Secret Key
  (0, _defineProperty2.default)(this, "getWasabiSecretKey", function () {
    return _this.attributes.wasabi_secret_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiSecretKey", function (value) {
    _this.attributes.wasabi_secret_key = value;
  });
  // Parameters:
  //   name - string - Internal name for your reference
  //   description - string - Internal description for your reference
  //   server_type - string - Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server.
  //   aws_access_key - string - AWS Access Key.
  //   s3_assume_role_arn - string - AWS IAM Role ARN for AssumeRole authentication.
  //   s3_assume_role_duration_seconds - int64 - Session duration in seconds for AssumeRole authentication (900-43200).
  //   cloudflare_access_key - string - Cloudflare: Access Key.
  //   filebase_access_key - string - Filebase: Access Key.
  //   google_cloud_storage_s3_compatible_access_key - string - Google Cloud Storage: S3-compatible Access Key.
  //   linode_access_key - string - Linode: Access Key
  //   s3_compatible_access_key - string - S3-compatible: Access Key
  //   username - string - Remote server username.
  //   wasabi_access_key - string - Wasabi: Access Key.
  //   password - string - Password, if needed.
  //   private_key - string - Private key, if needed.
  //   private_key_passphrase - string - Passphrase for private key if needed.
  //   aws_secret_key - string - AWS: secret key.
  //   azure_blob_storage_access_key - string - Azure Blob Storage: Access Key
  //   azure_blob_storage_sas_token - string - Azure Blob Storage: Shared Access Signature (SAS) token
  //   azure_files_storage_access_key - string - Azure File Storage: Access Key
  //   azure_files_storage_sas_token - string - Azure File Storage: Shared Access Signature (SAS) token
  //   backblaze_b2_application_key - string - Backblaze B2 Cloud Storage: applicationKey
  //   backblaze_b2_key_id - string - Backblaze B2 Cloud Storage: keyID
  //   cloudflare_secret_key - string - Cloudflare: Secret Key
  //   filebase_secret_key - string - Filebase: Secret Key
  //   google_cloud_storage_credentials_json - string - Google Cloud Storage: JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  //   google_cloud_storage_s3_compatible_secret_key - string - Google Cloud Storage: S3-compatible secret key
  //   linode_secret_key - string - Linode: Secret Key
  //   s3_compatible_secret_key - string - S3-compatible: Secret Key
  //   wasabi_secret_key - string - Wasabi: Secret Key
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
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
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 4:
          if (!(params.description && !(0, _utils.isString)(params.description))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 5:
          if (!(params.server_type && !(0, _utils.isString)(params.server_type))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params.server_type)));
        case 6:
          if (!(params.aws_access_key && !(0, _utils.isString)(params.aws_access_key))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params.aws_access_key)));
        case 7:
          if (!(params.s3_assume_role_arn && !(0, _utils.isString)(params.s3_assume_role_arn))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_arn must be of type String, received ".concat((0, _utils.getType)(params.s3_assume_role_arn)));
        case 8:
          if (!(params.s3_assume_role_duration_seconds && !(0, _utils.isInt)(params.s3_assume_role_duration_seconds))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_duration_seconds must be of type Int, received ".concat((0, _utils.getType)(params.s3_assume_role_duration_seconds)));
        case 9:
          if (!(params.cloudflare_access_key && !(0, _utils.isString)(params.cloudflare_access_key))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_access_key)));
        case 10:
          if (!(params.filebase_access_key && !(0, _utils.isString)(params.filebase_access_key))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_access_key)));
        case 11:
          if (!(params.google_cloud_storage_s3_compatible_access_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_access_key))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_access_key)));
        case 12:
          if (!(params.linode_access_key && !(0, _utils.isString)(params.linode_access_key))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params.linode_access_key)));
        case 13:
          if (!(params.s3_compatible_access_key && !(0, _utils.isString)(params.s3_compatible_access_key))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_access_key)));
        case 14:
          if (!(params.username && !(0, _utils.isString)(params.username))) {
            _context.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
        case 15:
          if (!(params.wasabi_access_key && !(0, _utils.isString)(params.wasabi_access_key))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_access_key)));
        case 16:
          if (!(params.password && !(0, _utils.isString)(params.password))) {
            _context.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
        case 17:
          if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
            _context.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
        case 18:
          if (!(params.private_key_passphrase && !(0, _utils.isString)(params.private_key_passphrase))) {
            _context.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params.private_key_passphrase)));
        case 19:
          if (!(params.aws_secret_key && !(0, _utils.isString)(params.aws_secret_key))) {
            _context.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params.aws_secret_key)));
        case 20:
          if (!(params.azure_blob_storage_access_key && !(0, _utils.isString)(params.azure_blob_storage_access_key))) {
            _context.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_access_key)));
        case 21:
          if (!(params.azure_blob_storage_sas_token && !(0, _utils.isString)(params.azure_blob_storage_sas_token))) {
            _context.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_sas_token)));
        case 22:
          if (!(params.azure_files_storage_access_key && !(0, _utils.isString)(params.azure_files_storage_access_key))) {
            _context.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_access_key)));
        case 23:
          if (!(params.azure_files_storage_sas_token && !(0, _utils.isString)(params.azure_files_storage_sas_token))) {
            _context.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_sas_token)));
        case 24:
          if (!(params.backblaze_b2_application_key && !(0, _utils.isString)(params.backblaze_b2_application_key))) {
            _context.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_application_key)));
        case 25:
          if (!(params.backblaze_b2_key_id && !(0, _utils.isString)(params.backblaze_b2_key_id))) {
            _context.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_key_id)));
        case 26:
          if (!(params.cloudflare_secret_key && !(0, _utils.isString)(params.cloudflare_secret_key))) {
            _context.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_secret_key)));
        case 27:
          if (!(params.filebase_secret_key && !(0, _utils.isString)(params.filebase_secret_key))) {
            _context.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_secret_key)));
        case 28:
          if (!(params.google_cloud_storage_credentials_json && !(0, _utils.isString)(params.google_cloud_storage_credentials_json))) {
            _context.next = 29;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_credentials_json)));
        case 29:
          if (!(params.google_cloud_storage_s3_compatible_secret_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_secret_key))) {
            _context.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_secret_key)));
        case 30:
          if (!(params.linode_secret_key && !(0, _utils.isString)(params.linode_secret_key))) {
            _context.next = 31;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params.linode_secret_key)));
        case 31:
          if (!(params.s3_compatible_secret_key && !(0, _utils.isString)(params.s3_compatible_secret_key))) {
            _context.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_secret_key)));
        case 32:
          if (!(params.wasabi_secret_key && !(0, _utils.isString)(params.wasabi_secret_key))) {
            _context.next = 33;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_secret_key)));
        case 33:
          if (params.id) {
            _context.next = 35;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 34;
            break;
          }
          params.id = _this.id;
          _context.next = 35;
          break;
        case 34:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 35:
          _context.next = 36;
          return _Api.default.sendRequest("/remote_server_credentials/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 36:
          response = _context.sent;
          return _context.abrupt("return", new RemoteServerCredential(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 37:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
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
          return _Api.default.sendRequest("/remote_server_credentials/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!_this.attributes.id) {
            _context3.next = 2;
            break;
          }
          _context3.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context3.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return RemoteServerCredential.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_RemoteServerCredential = RemoteServerCredential;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `id`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id` and `name`. Valid field combinations are `[ workspace_id, name ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
(0, _defineProperty2.default)(RemoteServerCredential, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context4.next = 3;
        return _Api.default.sendRequest('/remote_server_credentials', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _RemoteServerCredential(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(RemoteServerCredential, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _RemoteServerCredential.list(params, options);
});
// Parameters:
//   id (required) - int64 - Remote Server Credential ID.
(0, _defineProperty2.default)(RemoteServerCredential, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/remote_server_credentials/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _RemoteServerCredential(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(RemoteServerCredential, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _RemoteServerCredential.find(id, params, options);
});
// Parameters:
//   name - string - Internal name for your reference
//   description - string - Internal description for your reference
//   server_type - string - Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server.
//   aws_access_key - string - AWS Access Key.
//   s3_assume_role_arn - string - AWS IAM Role ARN for AssumeRole authentication.
//   s3_assume_role_duration_seconds - int64 - Session duration in seconds for AssumeRole authentication (900-43200).
//   cloudflare_access_key - string - Cloudflare: Access Key.
//   filebase_access_key - string - Filebase: Access Key.
//   google_cloud_storage_s3_compatible_access_key - string - Google Cloud Storage: S3-compatible Access Key.
//   linode_access_key - string - Linode: Access Key
//   s3_compatible_access_key - string - S3-compatible: Access Key
//   username - string - Remote server username.
//   wasabi_access_key - string - Wasabi: Access Key.
//   password - string - Password, if needed.
//   private_key - string - Private key, if needed.
//   private_key_passphrase - string - Passphrase for private key if needed.
//   aws_secret_key - string - AWS: secret key.
//   azure_blob_storage_access_key - string - Azure Blob Storage: Access Key
//   azure_blob_storage_sas_token - string - Azure Blob Storage: Shared Access Signature (SAS) token
//   azure_files_storage_access_key - string - Azure File Storage: Access Key
//   azure_files_storage_sas_token - string - Azure File Storage: Shared Access Signature (SAS) token
//   backblaze_b2_application_key - string - Backblaze B2 Cloud Storage: applicationKey
//   backblaze_b2_key_id - string - Backblaze B2 Cloud Storage: keyID
//   cloudflare_secret_key - string - Cloudflare: Secret Key
//   filebase_secret_key - string - Filebase: Secret Key
//   google_cloud_storage_credentials_json - string - Google Cloud Storage: JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
//   google_cloud_storage_s3_compatible_secret_key - string - Google Cloud Storage: S3-compatible secret key
//   linode_secret_key - string - Linode: Secret Key
//   s3_compatible_secret_key - string - S3-compatible: Secret Key
//   wasabi_secret_key - string - Wasabi: Secret Key
//   workspace_id - int64 - Workspace ID (0 for default workspace)
(0, _defineProperty2.default)(RemoteServerCredential, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 1:
        if (!(params.description && !(0, _utils.isString)(params.description))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 2:
        if (!(params.server_type && !(0, _utils.isString)(params.server_type))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params.server_type)));
      case 3:
        if (!(params.aws_access_key && !(0, _utils.isString)(params.aws_access_key))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params.aws_access_key)));
      case 4:
        if (!(params.s3_assume_role_arn && !(0, _utils.isString)(params.s3_assume_role_arn))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_arn must be of type String, received ".concat((0, _utils.getType)(params.s3_assume_role_arn)));
      case 5:
        if (!(params.s3_assume_role_duration_seconds && !(0, _utils.isInt)(params.s3_assume_role_duration_seconds))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_duration_seconds must be of type Int, received ".concat((0, _utils.getType)(params.s3_assume_role_duration_seconds)));
      case 6:
        if (!(params.cloudflare_access_key && !(0, _utils.isString)(params.cloudflare_access_key))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_access_key)));
      case 7:
        if (!(params.filebase_access_key && !(0, _utils.isString)(params.filebase_access_key))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_access_key)));
      case 8:
        if (!(params.google_cloud_storage_s3_compatible_access_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_access_key))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_access_key)));
      case 9:
        if (!(params.linode_access_key && !(0, _utils.isString)(params.linode_access_key))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params.linode_access_key)));
      case 10:
        if (!(params.s3_compatible_access_key && !(0, _utils.isString)(params.s3_compatible_access_key))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_access_key)));
      case 11:
        if (!(params.username && !(0, _utils.isString)(params.username))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
      case 12:
        if (!(params.wasabi_access_key && !(0, _utils.isString)(params.wasabi_access_key))) {
          _context6.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_access_key)));
      case 13:
        if (!(params.password && !(0, _utils.isString)(params.password))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 14:
        if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
          _context6.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 15:
        if (!(params.private_key_passphrase && !(0, _utils.isString)(params.private_key_passphrase))) {
          _context6.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params.private_key_passphrase)));
      case 16:
        if (!(params.aws_secret_key && !(0, _utils.isString)(params.aws_secret_key))) {
          _context6.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params.aws_secret_key)));
      case 17:
        if (!(params.azure_blob_storage_access_key && !(0, _utils.isString)(params.azure_blob_storage_access_key))) {
          _context6.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_access_key)));
      case 18:
        if (!(params.azure_blob_storage_sas_token && !(0, _utils.isString)(params.azure_blob_storage_sas_token))) {
          _context6.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_sas_token)));
      case 19:
        if (!(params.azure_files_storage_access_key && !(0, _utils.isString)(params.azure_files_storage_access_key))) {
          _context6.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_access_key)));
      case 20:
        if (!(params.azure_files_storage_sas_token && !(0, _utils.isString)(params.azure_files_storage_sas_token))) {
          _context6.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_sas_token)));
      case 21:
        if (!(params.backblaze_b2_application_key && !(0, _utils.isString)(params.backblaze_b2_application_key))) {
          _context6.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_application_key)));
      case 22:
        if (!(params.backblaze_b2_key_id && !(0, _utils.isString)(params.backblaze_b2_key_id))) {
          _context6.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_key_id)));
      case 23:
        if (!(params.cloudflare_secret_key && !(0, _utils.isString)(params.cloudflare_secret_key))) {
          _context6.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_secret_key)));
      case 24:
        if (!(params.filebase_secret_key && !(0, _utils.isString)(params.filebase_secret_key))) {
          _context6.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_secret_key)));
      case 25:
        if (!(params.google_cloud_storage_credentials_json && !(0, _utils.isString)(params.google_cloud_storage_credentials_json))) {
          _context6.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_credentials_json)));
      case 26:
        if (!(params.google_cloud_storage_s3_compatible_secret_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_secret_key))) {
          _context6.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_secret_key)));
      case 27:
        if (!(params.linode_secret_key && !(0, _utils.isString)(params.linode_secret_key))) {
          _context6.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params.linode_secret_key)));
      case 28:
        if (!(params.s3_compatible_secret_key && !(0, _utils.isString)(params.s3_compatible_secret_key))) {
          _context6.next = 29;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_secret_key)));
      case 29:
        if (!(params.wasabi_secret_key && !(0, _utils.isString)(params.wasabi_secret_key))) {
          _context6.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_secret_key)));
      case 30:
        if (!(params.workspace_id && !(0, _utils.isInt)(params.workspace_id))) {
          _context6.next = 31;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 31:
        _context6.next = 32;
        return _Api.default.sendRequest('/remote_server_credentials', 'POST', params, options);
      case 32:
        response = _context6.sent;
        return _context6.abrupt("return", new _RemoteServerCredential(response === null || response === void 0 ? void 0 : response.data, options));
      case 33:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = exports.default = RemoteServerCredential;
module.exports = RemoteServerCredential;
module.exports.default = RemoteServerCredential;