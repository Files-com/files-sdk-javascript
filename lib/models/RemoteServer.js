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
 * Class RemoteServer
 */
var RemoteServer = /*#__PURE__*/(0, _createClass2.default)(function RemoteServer() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, RemoteServer);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # Remote server ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // boolean # If true, this server has been disabled due to failures.  Make any change or set disabled to false to clear this flag.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
  });
  // string # Type of authentication method
  (0, _defineProperty2.default)(this, "getAuthenticationMethod", function () {
    return _this.attributes.authentication_method;
  });
  (0, _defineProperty2.default)(this, "setAuthenticationMethod", function (value) {
    _this.attributes.authentication_method = value;
  });
  // string # Hostname or IP address
  (0, _defineProperty2.default)(this, "getHostname", function () {
    return _this.attributes.hostname;
  });
  (0, _defineProperty2.default)(this, "setHostname", function (value) {
    _this.attributes.hostname = value;
  });
  // string # Initial home folder on remote server
  (0, _defineProperty2.default)(this, "getRemoteHomePath", function () {
    return _this.attributes.remote_home_path;
  });
  (0, _defineProperty2.default)(this, "setRemoteHomePath", function (value) {
    _this.attributes.remote_home_path = value;
  });
  // string # Internal name for your reference
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // int64 # Port for remote server.  Not needed for S3.
  (0, _defineProperty2.default)(this, "getPort", function () {
    return _this.attributes.port;
  });
  (0, _defineProperty2.default)(this, "setPort", function (value) {
    _this.attributes.port = value;
  });
  // int64 # Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  (0, _defineProperty2.default)(this, "getMaxConnections", function () {
    return _this.attributes.max_connections;
  });
  (0, _defineProperty2.default)(this, "setMaxConnections", function (value) {
    _this.attributes.max_connections = value;
  });
  // boolean # If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a sitewide setting which will force it to true.
  (0, _defineProperty2.default)(this, "getPinToSiteRegion", function () {
    return _this.attributes.pin_to_site_region;
  });
  (0, _defineProperty2.default)(this, "setPinToSiteRegion", function (value) {
    _this.attributes.pin_to_site_region = value;
  });
  // string # If set, all communciations with this remote server are made through the provided region.
  (0, _defineProperty2.default)(this, "getPinnedRegion", function () {
    return _this.attributes.pinned_region;
  });
  (0, _defineProperty2.default)(this, "setPinnedRegion", function (value) {
    _this.attributes.pinned_region = value;
  });
  // string # S3 bucket name
  (0, _defineProperty2.default)(this, "getS3Bucket", function () {
    return _this.attributes.s3_bucket;
  });
  (0, _defineProperty2.default)(this, "setS3Bucket", function (value) {
    _this.attributes.s3_bucket = value;
  });
  // string # S3 region
  (0, _defineProperty2.default)(this, "getS3Region", function () {
    return _this.attributes.s3_region;
  });
  (0, _defineProperty2.default)(this, "setS3Region", function (value) {
    _this.attributes.s3_region = value;
  });
  // string # AWS Access Key.
  (0, _defineProperty2.default)(this, "getAwsAccessKey", function () {
    return _this.attributes.aws_access_key;
  });
  (0, _defineProperty2.default)(this, "setAwsAccessKey", function (value) {
    _this.attributes.aws_access_key = value;
  });
  // string # Remote server certificate
  (0, _defineProperty2.default)(this, "getServerCertificate", function () {
    return _this.attributes.server_certificate;
  });
  (0, _defineProperty2.default)(this, "setServerCertificate", function (value) {
    _this.attributes.server_certificate = value;
  });
  // string # Remote server SSH Host Key. If provided, we will require that the server host key matches the provided key. Uses OpenSSH format similar to what would go into ~/.ssh/known_hosts
  (0, _defineProperty2.default)(this, "getServerHostKey", function () {
    return _this.attributes.server_host_key;
  });
  (0, _defineProperty2.default)(this, "setServerHostKey", function (value) {
    _this.attributes.server_host_key = value;
  });
  // string # Remote server type.
  (0, _defineProperty2.default)(this, "getServerType", function () {
    return _this.attributes.server_type;
  });
  (0, _defineProperty2.default)(this, "setServerType", function (value) {
    _this.attributes.server_type = value;
  });
  // string # Should we require SSL?
  (0, _defineProperty2.default)(this, "getSsl", function () {
    return _this.attributes.ssl;
  });
  (0, _defineProperty2.default)(this, "setSsl", function (value) {
    _this.attributes.ssl = value;
  });
  // string # Remote server username.  Not needed for S3 buckets.
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // string # Google Cloud Storage bucket name
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageBucket", function () {
    return _this.attributes.google_cloud_storage_bucket;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageBucket", function (value) {
    _this.attributes.google_cloud_storage_bucket = value;
  });
  // string # Google Cloud Project ID
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageProjectId", function () {
    return _this.attributes.google_cloud_storage_project_id;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageProjectId", function (value) {
    _this.attributes.google_cloud_storage_project_id = value;
  });
  // string # Backblaze B2 Cloud Storage S3 Endpoint
  (0, _defineProperty2.default)(this, "getBackblazeB2S3Endpoint", function () {
    return _this.attributes.backblaze_b2_s3_endpoint;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2S3Endpoint", function (value) {
    _this.attributes.backblaze_b2_s3_endpoint = value;
  });
  // string # Backblaze B2 Cloud Storage Bucket name
  (0, _defineProperty2.default)(this, "getBackblazeB2Bucket", function () {
    return _this.attributes.backblaze_b2_bucket;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2Bucket", function (value) {
    _this.attributes.backblaze_b2_bucket = value;
  });
  // string # Wasabi Bucket name
  (0, _defineProperty2.default)(this, "getWasabiBucket", function () {
    return _this.attributes.wasabi_bucket;
  });
  (0, _defineProperty2.default)(this, "setWasabiBucket", function (value) {
    _this.attributes.wasabi_bucket = value;
  });
  // string # Wasabi region
  (0, _defineProperty2.default)(this, "getWasabiRegion", function () {
    return _this.attributes.wasabi_region;
  });
  (0, _defineProperty2.default)(this, "setWasabiRegion", function (value) {
    _this.attributes.wasabi_region = value;
  });
  // string # Wasabi access key.
  (0, _defineProperty2.default)(this, "getWasabiAccessKey", function () {
    return _this.attributes.wasabi_access_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiAccessKey", function (value) {
    _this.attributes.wasabi_access_key = value;
  });
  // string # Rackspace username used to login to the Rackspace Cloud Control Panel.
  (0, _defineProperty2.default)(this, "getRackspaceUsername", function () {
    return _this.attributes.rackspace_username;
  });
  (0, _defineProperty2.default)(this, "setRackspaceUsername", function (value) {
    _this.attributes.rackspace_username = value;
  });
  // string # Three letter airport code for Rackspace region. See https://support.rackspace.com/how-to/about-regions/
  (0, _defineProperty2.default)(this, "getRackspaceRegion", function () {
    return _this.attributes.rackspace_region;
  });
  (0, _defineProperty2.default)(this, "setRackspaceRegion", function (value) {
    _this.attributes.rackspace_region = value;
  });
  // string # The name of the container (top level directory) where files will sync.
  (0, _defineProperty2.default)(this, "getRackspaceContainer", function () {
    return _this.attributes.rackspace_container;
  });
  (0, _defineProperty2.default)(this, "setRackspaceContainer", function (value) {
    _this.attributes.rackspace_container = value;
  });
  // string # Returns link to login with an Oauth provider
  (0, _defineProperty2.default)(this, "getAuthSetupLink", function () {
    return _this.attributes.auth_setup_link;
  });
  (0, _defineProperty2.default)(this, "setAuthSetupLink", function (value) {
    _this.attributes.auth_setup_link = value;
  });
  // string # Either `in_setup` or `complete`
  (0, _defineProperty2.default)(this, "getAuthStatus", function () {
    return _this.attributes.auth_status;
  });
  (0, _defineProperty2.default)(this, "setAuthStatus", function (value) {
    _this.attributes.auth_status = value;
  });
  // string # Describes the authorized account
  (0, _defineProperty2.default)(this, "getAuthAccountName", function () {
    return _this.attributes.auth_account_name;
  });
  (0, _defineProperty2.default)(this, "setAuthAccountName", function (value) {
    _this.attributes.auth_account_name = value;
  });
  // string # Either personal or business_other account types
  (0, _defineProperty2.default)(this, "getOneDriveAccountType", function () {
    return _this.attributes.one_drive_account_type;
  });
  (0, _defineProperty2.default)(this, "setOneDriveAccountType", function (value) {
    _this.attributes.one_drive_account_type = value;
  });
  // string # Azure Blob Storage Account name
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccount", function () {
    return _this.attributes.azure_blob_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccount", function (value) {
    _this.attributes.azure_blob_storage_account = value;
  });
  // string # Shared Access Signature (SAS) token
  (0, _defineProperty2.default)(this, "getAzureBlobStorageSasToken", function () {
    return _this.attributes.azure_blob_storage_sas_token;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageSasToken", function (value) {
    _this.attributes.azure_blob_storage_sas_token = value;
  });
  // string # Azure Blob Storage Container name
  (0, _defineProperty2.default)(this, "getAzureBlobStorageContainer", function () {
    return _this.attributes.azure_blob_storage_container;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageContainer", function (value) {
    _this.attributes.azure_blob_storage_container = value;
  });
  // string # Azure File Storage Account name
  (0, _defineProperty2.default)(this, "getAzureFilesStorageAccount", function () {
    return _this.attributes.azure_files_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageAccount", function (value) {
    _this.attributes.azure_files_storage_account = value;
  });
  // string # Shared Access Signature (SAS) token
  (0, _defineProperty2.default)(this, "getAzureFilesStorageSasToken", function () {
    return _this.attributes.azure_files_storage_sas_token;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageSasToken", function (value) {
    _this.attributes.azure_files_storage_sas_token = value;
  });
  // string # Azure File Storage Share name
  (0, _defineProperty2.default)(this, "getAzureFilesStorageShareName", function () {
    return _this.attributes.azure_files_storage_share_name;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageShareName", function (value) {
    _this.attributes.azure_files_storage_share_name = value;
  });
  // string # S3-compatible Bucket name
  (0, _defineProperty2.default)(this, "getS3CompatibleBucket", function () {
    return _this.attributes.s3_compatible_bucket;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleBucket", function (value) {
    _this.attributes.s3_compatible_bucket = value;
  });
  // string # S3-compatible endpoint
  (0, _defineProperty2.default)(this, "getS3CompatibleEndpoint", function () {
    return _this.attributes.s3_compatible_endpoint;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleEndpoint", function (value) {
    _this.attributes.s3_compatible_endpoint = value;
  });
  // string # S3-compatible endpoint
  (0, _defineProperty2.default)(this, "getS3CompatibleRegion", function () {
    return _this.attributes.s3_compatible_region;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleRegion", function (value) {
    _this.attributes.s3_compatible_region = value;
  });
  // string # S3-compatible Access Key.
  (0, _defineProperty2.default)(this, "getS3CompatibleAccessKey", function () {
    return _this.attributes.s3_compatible_access_key;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleAccessKey", function (value) {
    _this.attributes.s3_compatible_access_key = value;
  });
  // boolean # `true` if remote server only accepts connections from dedicated IPs
  (0, _defineProperty2.default)(this, "getEnableDedicatedIps", function () {
    return _this.attributes.enable_dedicated_ips;
  });
  (0, _defineProperty2.default)(this, "setEnableDedicatedIps", function (value) {
    _this.attributes.enable_dedicated_ips = value;
  });
  // string # Local permissions for files agent. read_only, write_only, or read_write
  (0, _defineProperty2.default)(this, "getFilesAgentPermissionSet", function () {
    return _this.attributes.files_agent_permission_set;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentPermissionSet", function (value) {
    _this.attributes.files_agent_permission_set = value;
  });
  // string # Agent local root path
  (0, _defineProperty2.default)(this, "getFilesAgentRoot", function () {
    return _this.attributes.files_agent_root;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentRoot", function (value) {
    _this.attributes.files_agent_root = value;
  });
  // string # Files Agent API Token
  (0, _defineProperty2.default)(this, "getFilesAgentApiToken", function () {
    return _this.attributes.files_agent_api_token;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentApiToken", function (value) {
    _this.attributes.files_agent_api_token = value;
  });
  // string # Filebase Bucket name
  (0, _defineProperty2.default)(this, "getFilebaseBucket", function () {
    return _this.attributes.filebase_bucket;
  });
  (0, _defineProperty2.default)(this, "setFilebaseBucket", function (value) {
    _this.attributes.filebase_bucket = value;
  });
  // string # Filebase Access Key.
  (0, _defineProperty2.default)(this, "getFilebaseAccessKey", function () {
    return _this.attributes.filebase_access_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseAccessKey", function (value) {
    _this.attributes.filebase_access_key = value;
  });
  // string # Cloudflare Bucket name
  (0, _defineProperty2.default)(this, "getCloudflareBucket", function () {
    return _this.attributes.cloudflare_bucket;
  });
  (0, _defineProperty2.default)(this, "setCloudflareBucket", function (value) {
    _this.attributes.cloudflare_bucket = value;
  });
  // string # Cloudflare Access Key.
  (0, _defineProperty2.default)(this, "getCloudflareAccessKey", function () {
    return _this.attributes.cloudflare_access_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareAccessKey", function (value) {
    _this.attributes.cloudflare_access_key = value;
  });
  // string # Cloudflare endpoint
  (0, _defineProperty2.default)(this, "getCloudflareEndpoint", function () {
    return _this.attributes.cloudflare_endpoint;
  });
  (0, _defineProperty2.default)(this, "setCloudflareEndpoint", function (value) {
    _this.attributes.cloudflare_endpoint = value;
  });
  // boolean # List Team folders in root
  (0, _defineProperty2.default)(this, "getDropboxTeams", function () {
    return _this.attributes.dropbox_teams;
  });
  (0, _defineProperty2.default)(this, "setDropboxTeams", function (value) {
    _this.attributes.dropbox_teams = value;
  });
  // string # Linode Bucket name
  (0, _defineProperty2.default)(this, "getLinodeBucket", function () {
    return _this.attributes.linode_bucket;
  });
  (0, _defineProperty2.default)(this, "setLinodeBucket", function (value) {
    _this.attributes.linode_bucket = value;
  });
  // string # Linode Access Key.
  (0, _defineProperty2.default)(this, "getLinodeAccessKey", function () {
    return _this.attributes.linode_access_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeAccessKey", function (value) {
    _this.attributes.linode_access_key = value;
  });
  // string # Linode region
  (0, _defineProperty2.default)(this, "getLinodeRegion", function () {
    return _this.attributes.linode_region;
  });
  (0, _defineProperty2.default)(this, "setLinodeRegion", function (value) {
    _this.attributes.linode_region = value;
  });
  // string # AWS secret key.
  (0, _defineProperty2.default)(this, "getAwsSecretKey", function () {
    return _this.attributes.aws_secret_key;
  });
  (0, _defineProperty2.default)(this, "setAwsSecretKey", function (value) {
    _this.attributes.aws_secret_key = value;
  });
  // string # Password if needed.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  // string # Private key if needed.
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
  // string # SSL client certificate.
  (0, _defineProperty2.default)(this, "getSslCertificate", function () {
    return _this.attributes.ssl_certificate;
  });
  (0, _defineProperty2.default)(this, "setSslCertificate", function (value) {
    _this.attributes.ssl_certificate = value;
  });
  // string # A JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageCredentialsJson", function () {
    return _this.attributes.google_cloud_storage_credentials_json;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageCredentialsJson", function (value) {
    _this.attributes.google_cloud_storage_credentials_json = value;
  });
  // string # Wasabi secret key.
  (0, _defineProperty2.default)(this, "getWasabiSecretKey", function () {
    return _this.attributes.wasabi_secret_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiSecretKey", function (value) {
    _this.attributes.wasabi_secret_key = value;
  });
  // string # Backblaze B2 Cloud Storage keyID.
  (0, _defineProperty2.default)(this, "getBackblazeB2KeyId", function () {
    return _this.attributes.backblaze_b2_key_id;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2KeyId", function (value) {
    _this.attributes.backblaze_b2_key_id = value;
  });
  // string # Backblaze B2 Cloud Storage applicationKey.
  (0, _defineProperty2.default)(this, "getBackblazeB2ApplicationKey", function () {
    return _this.attributes.backblaze_b2_application_key;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2ApplicationKey", function (value) {
    _this.attributes.backblaze_b2_application_key = value;
  });
  // string # Rackspace API key from the Rackspace Cloud Control Panel.
  (0, _defineProperty2.default)(this, "getRackspaceApiKey", function () {
    return _this.attributes.rackspace_api_key;
  });
  (0, _defineProperty2.default)(this, "setRackspaceApiKey", function (value) {
    _this.attributes.rackspace_api_key = value;
  });
  // boolean # Reset authenticated account
  (0, _defineProperty2.default)(this, "getResetAuthentication", function () {
    return _this.attributes.reset_authentication;
  });
  (0, _defineProperty2.default)(this, "setResetAuthentication", function (value) {
    _this.attributes.reset_authentication = value;
  });
  // string # Azure Blob Storage secret key.
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccessKey", function () {
    return _this.attributes.azure_blob_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccessKey", function (value) {
    _this.attributes.azure_blob_storage_access_key = value;
  });
  // string # Azure File Storage access key.
  (0, _defineProperty2.default)(this, "getAzureFilesStorageAccessKey", function () {
    return _this.attributes.azure_files_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageAccessKey", function (value) {
    _this.attributes.azure_files_storage_access_key = value;
  });
  // string # S3-compatible secret key
  (0, _defineProperty2.default)(this, "getS3CompatibleSecretKey", function () {
    return _this.attributes.s3_compatible_secret_key;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleSecretKey", function (value) {
    _this.attributes.s3_compatible_secret_key = value;
  });
  // string # Filebase secret key
  (0, _defineProperty2.default)(this, "getFilebaseSecretKey", function () {
    return _this.attributes.filebase_secret_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseSecretKey", function (value) {
    _this.attributes.filebase_secret_key = value;
  });
  // string # Cloudflare secret key
  (0, _defineProperty2.default)(this, "getCloudflareSecretKey", function () {
    return _this.attributes.cloudflare_secret_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareSecretKey", function (value) {
    _this.attributes.cloudflare_secret_key = value;
  });
  // string # Linode secret key
  (0, _defineProperty2.default)(this, "getLinodeSecretKey", function () {
    return _this.attributes.linode_secret_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeSecretKey", function (value) {
    _this.attributes.linode_secret_key = value;
  });
  // Post local changes, check in, and download configuration file (used by some Remote Server integrations, such as the Files.com Agent)
  //
  // Parameters:
  //   api_token - string - Files Agent API Token
  //   permission_set - string -
  //   root - string - Agent local root path
  //   hostname - string
  //   port - int64 - Incoming port for files agent connections
  //   status - string - either running or shutdown
  //   config_version - string - agent config version
  //   private_key - string - private key
  //   public_key - string - public key
  //   server_host_key - string
  //   subdomain - string
  (0, _defineProperty2.default)(this, "configurationFile", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
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
          if (!(params['api_token'] && !(0, _utils.isString)(params['api_token']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: api_token must be of type String, received ".concat((0, _utils.getType)(api_token)));
        case 10:
          if (!(params['permission_set'] && !(0, _utils.isString)(params['permission_set']))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(permission_set)));
        case 12:
          if (!(params['root'] && !(0, _utils.isString)(params['root']))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: root must be of type String, received ".concat((0, _utils.getType)(root)));
        case 14:
          if (!(params['hostname'] && !(0, _utils.isString)(params['hostname']))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(hostname)));
        case 16:
          if (!(params['port'] && !(0, _utils.isInt)(params['port']))) {
            _context.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(port)));
        case 18:
          if (!(params['status'] && !(0, _utils.isString)(params['status']))) {
            _context.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: status must be of type String, received ".concat((0, _utils.getType)(status)));
        case 20:
          if (!(params['config_version'] && !(0, _utils.isString)(params['config_version']))) {
            _context.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: config_version must be of type String, received ".concat((0, _utils.getType)(config_version)));
        case 22:
          if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
            _context.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(private_key)));
        case 24:
          if (!(params['public_key'] && !(0, _utils.isString)(params['public_key']))) {
            _context.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(public_key)));
        case 26:
          if (!(params['server_host_key'] && !(0, _utils.isString)(params['server_host_key']))) {
            _context.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(server_host_key)));
        case 28:
          if (!(params['subdomain'] && !(0, _utils.isString)(params['subdomain']))) {
            _context.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: subdomain must be of type String, received ".concat((0, _utils.getType)(subdomain)));
        case 30:
          if (params['id']) {
            _context.next = 36;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 35;
            break;
          }
          params['id'] = _this.id;
          _context.next = 36;
          break;
        case 35:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 36:
          _context.next = 38;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params['id']), "/configuration_file"), 'POST', params, _this.options);
        case 38:
          response = _context.sent;
          return _context.abrupt("return", new RemoteServerConfigurationFile(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 40:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Parameters:
  //   aws_access_key - string - AWS Access Key.
  //   aws_secret_key - string - AWS secret key.
  //   password - string - Password if needed.
  //   private_key - string - Private key if needed.
  //   private_key_passphrase - string - Passphrase for private key if needed.
  //   ssl_certificate - string - SSL client certificate.
  //   google_cloud_storage_credentials_json - string - A JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  //   wasabi_access_key - string - Wasabi access key.
  //   wasabi_secret_key - string - Wasabi secret key.
  //   backblaze_b2_key_id - string - Backblaze B2 Cloud Storage keyID.
  //   backblaze_b2_application_key - string - Backblaze B2 Cloud Storage applicationKey.
  //   rackspace_api_key - string - Rackspace API key from the Rackspace Cloud Control Panel.
  //   reset_authentication - boolean - Reset authenticated account
  //   azure_blob_storage_access_key - string - Azure Blob Storage secret key.
  //   azure_files_storage_access_key - string - Azure File Storage access key.
  //   hostname - string - Hostname or IP address
  //   name - string - Internal name for your reference
  //   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  //   pin_to_site_region - boolean - If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a sitewide setting which will force it to true.
  //   port - int64 - Port for remote server.  Not needed for S3.
  //   s3_bucket - string - S3 bucket name
  //   s3_region - string - S3 region
  //   server_certificate - string - Remote server certificate
  //   server_host_key - string - Remote server SSH Host Key. If provided, we will require that the server host key matches the provided key. Uses OpenSSH format similar to what would go into ~/.ssh/known_hosts
  //   server_type - string - Remote server type.
  //   ssl - string - Should we require SSL?
  //   username - string - Remote server username.  Not needed for S3 buckets.
  //   google_cloud_storage_bucket - string - Google Cloud Storage bucket name
  //   google_cloud_storage_project_id - string - Google Cloud Project ID
  //   backblaze_b2_bucket - string - Backblaze B2 Cloud Storage Bucket name
  //   backblaze_b2_s3_endpoint - string - Backblaze B2 Cloud Storage S3 Endpoint
  //   wasabi_bucket - string - Wasabi Bucket name
  //   wasabi_region - string - Wasabi region
  //   rackspace_username - string - Rackspace username used to login to the Rackspace Cloud Control Panel.
  //   rackspace_region - string - Three letter airport code for Rackspace region. See https://support.rackspace.com/how-to/about-regions/
  //   rackspace_container - string - The name of the container (top level directory) where files will sync.
  //   one_drive_account_type - string - Either personal or business_other account types
  //   azure_blob_storage_account - string - Azure Blob Storage Account name
  //   azure_blob_storage_container - string - Azure Blob Storage Container name
  //   azure_blob_storage_sas_token - string - Shared Access Signature (SAS) token
  //   azure_files_storage_account - string - Azure File Storage Account name
  //   azure_files_storage_share_name - string - Azure File Storage Share name
  //   azure_files_storage_sas_token - string - Shared Access Signature (SAS) token
  //   s3_compatible_bucket - string - S3-compatible Bucket name
  //   s3_compatible_endpoint - string - S3-compatible endpoint
  //   s3_compatible_region - string - S3-compatible endpoint
  //   enable_dedicated_ips - boolean - `true` if remote server only accepts connections from dedicated IPs
  //   s3_compatible_access_key - string - S3-compatible Access Key.
  //   s3_compatible_secret_key - string - S3-compatible secret key
  //   files_agent_root - string - Agent local root path
  //   files_agent_permission_set - string - Local permissions for files agent. read_only, write_only, or read_write
  //   filebase_access_key - string - Filebase Access Key.
  //   filebase_secret_key - string - Filebase secret key
  //   filebase_bucket - string - Filebase Bucket name
  //   cloudflare_access_key - string - Cloudflare Access Key.
  //   cloudflare_secret_key - string - Cloudflare secret key
  //   cloudflare_bucket - string - Cloudflare Bucket name
  //   cloudflare_endpoint - string - Cloudflare endpoint
  //   dropbox_teams - boolean - List Team folders in root
  //   linode_access_key - string - Linode Access Key.
  //   linode_secret_key - string - Linode secret key
  //   linode_bucket - string - Linode Bucket name
  //   linode_region - string - Linode region
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
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
          if (!(params['aws_access_key'] && !(0, _utils.isString)(params['aws_access_key']))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(aws_access_key)));
        case 10:
          if (!(params['aws_secret_key'] && !(0, _utils.isString)(params['aws_secret_key']))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(aws_secret_key)));
        case 12:
          if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));
        case 14:
          if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(private_key)));
        case 16:
          if (!(params['private_key_passphrase'] && !(0, _utils.isString)(params['private_key_passphrase']))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(private_key_passphrase)));
        case 18:
          if (!(params['ssl_certificate'] && !(0, _utils.isString)(params['ssl_certificate']))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(ssl_certificate)));
        case 20:
          if (!(params['google_cloud_storage_credentials_json'] && !(0, _utils.isString)(params['google_cloud_storage_credentials_json']))) {
            _context2.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_credentials_json)));
        case 22:
          if (!(params['wasabi_access_key'] && !(0, _utils.isString)(params['wasabi_access_key']))) {
            _context2.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(wasabi_access_key)));
        case 24:
          if (!(params['wasabi_secret_key'] && !(0, _utils.isString)(params['wasabi_secret_key']))) {
            _context2.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(wasabi_secret_key)));
        case 26:
          if (!(params['backblaze_b2_key_id'] && !(0, _utils.isString)(params['backblaze_b2_key_id']))) {
            _context2.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_key_id)));
        case 28:
          if (!(params['backblaze_b2_application_key'] && !(0, _utils.isString)(params['backblaze_b2_application_key']))) {
            _context2.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_application_key)));
        case 30:
          if (!(params['rackspace_api_key'] && !(0, _utils.isString)(params['rackspace_api_key']))) {
            _context2.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: rackspace_api_key must be of type String, received ".concat((0, _utils.getType)(rackspace_api_key)));
        case 32:
          if (!(params['azure_blob_storage_access_key'] && !(0, _utils.isString)(params['azure_blob_storage_access_key']))) {
            _context2.next = 34;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_access_key)));
        case 34:
          if (!(params['azure_files_storage_access_key'] && !(0, _utils.isString)(params['azure_files_storage_access_key']))) {
            _context2.next = 36;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(azure_files_storage_access_key)));
        case 36:
          if (!(params['hostname'] && !(0, _utils.isString)(params['hostname']))) {
            _context2.next = 38;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(hostname)));
        case 38:
          if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
            _context2.next = 40;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(name)));
        case 40:
          if (!(params['max_connections'] && !(0, _utils.isInt)(params['max_connections']))) {
            _context2.next = 42;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(max_connections)));
        case 42:
          if (!(params['port'] && !(0, _utils.isInt)(params['port']))) {
            _context2.next = 44;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(port)));
        case 44:
          if (!(params['s3_bucket'] && !(0, _utils.isString)(params['s3_bucket']))) {
            _context2.next = 46;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(s3_bucket)));
        case 46:
          if (!(params['s3_region'] && !(0, _utils.isString)(params['s3_region']))) {
            _context2.next = 48;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(s3_region)));
        case 48:
          if (!(params['server_certificate'] && !(0, _utils.isString)(params['server_certificate']))) {
            _context2.next = 50;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(server_certificate)));
        case 50:
          if (!(params['server_host_key'] && !(0, _utils.isString)(params['server_host_key']))) {
            _context2.next = 52;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(server_host_key)));
        case 52:
          if (!(params['server_type'] && !(0, _utils.isString)(params['server_type']))) {
            _context2.next = 54;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(server_type)));
        case 54:
          if (!(params['ssl'] && !(0, _utils.isString)(params['ssl']))) {
            _context2.next = 56;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(ssl)));
        case 56:
          if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
            _context2.next = 58;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(username)));
        case 58:
          if (!(params['google_cloud_storage_bucket'] && !(0, _utils.isString)(params['google_cloud_storage_bucket']))) {
            _context2.next = 60;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_bucket)));
        case 60:
          if (!(params['google_cloud_storage_project_id'] && !(0, _utils.isString)(params['google_cloud_storage_project_id']))) {
            _context2.next = 62;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(google_cloud_storage_project_id)));
        case 62:
          if (!(params['backblaze_b2_bucket'] && !(0, _utils.isString)(params['backblaze_b2_bucket']))) {
            _context2.next = 64;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_bucket)));
        case 64:
          if (!(params['backblaze_b2_s3_endpoint'] && !(0, _utils.isString)(params['backblaze_b2_s3_endpoint']))) {
            _context2.next = 66;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(backblaze_b2_s3_endpoint)));
        case 66:
          if (!(params['wasabi_bucket'] && !(0, _utils.isString)(params['wasabi_bucket']))) {
            _context2.next = 68;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(wasabi_bucket)));
        case 68:
          if (!(params['wasabi_region'] && !(0, _utils.isString)(params['wasabi_region']))) {
            _context2.next = 70;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(wasabi_region)));
        case 70:
          if (!(params['rackspace_username'] && !(0, _utils.isString)(params['rackspace_username']))) {
            _context2.next = 72;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: rackspace_username must be of type String, received ".concat((0, _utils.getType)(rackspace_username)));
        case 72:
          if (!(params['rackspace_region'] && !(0, _utils.isString)(params['rackspace_region']))) {
            _context2.next = 74;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: rackspace_region must be of type String, received ".concat((0, _utils.getType)(rackspace_region)));
        case 74:
          if (!(params['rackspace_container'] && !(0, _utils.isString)(params['rackspace_container']))) {
            _context2.next = 76;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: rackspace_container must be of type String, received ".concat((0, _utils.getType)(rackspace_container)));
        case 76:
          if (!(params['one_drive_account_type'] && !(0, _utils.isString)(params['one_drive_account_type']))) {
            _context2.next = 78;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(one_drive_account_type)));
        case 78:
          if (!(params['azure_blob_storage_account'] && !(0, _utils.isString)(params['azure_blob_storage_account']))) {
            _context2.next = 80;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_account)));
        case 80:
          if (!(params['azure_blob_storage_container'] && !(0, _utils.isString)(params['azure_blob_storage_container']))) {
            _context2.next = 82;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_container)));
        case 82:
          if (!(params['azure_blob_storage_sas_token'] && !(0, _utils.isString)(params['azure_blob_storage_sas_token']))) {
            _context2.next = 84;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(azure_blob_storage_sas_token)));
        case 84:
          if (!(params['azure_files_storage_account'] && !(0, _utils.isString)(params['azure_files_storage_account']))) {
            _context2.next = 86;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_account must be of type String, received ".concat((0, _utils.getType)(azure_files_storage_account)));
        case 86:
          if (!(params['azure_files_storage_share_name'] && !(0, _utils.isString)(params['azure_files_storage_share_name']))) {
            _context2.next = 88;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_share_name must be of type String, received ".concat((0, _utils.getType)(azure_files_storage_share_name)));
        case 88:
          if (!(params['azure_files_storage_sas_token'] && !(0, _utils.isString)(params['azure_files_storage_sas_token']))) {
            _context2.next = 90;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(azure_files_storage_sas_token)));
        case 90:
          if (!(params['s3_compatible_bucket'] && !(0, _utils.isString)(params['s3_compatible_bucket']))) {
            _context2.next = 92;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_bucket must be of type String, received ".concat((0, _utils.getType)(s3_compatible_bucket)));
        case 92:
          if (!(params['s3_compatible_endpoint'] && !(0, _utils.isString)(params['s3_compatible_endpoint']))) {
            _context2.next = 94;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint must be of type String, received ".concat((0, _utils.getType)(s3_compatible_endpoint)));
        case 94:
          if (!(params['s3_compatible_region'] && !(0, _utils.isString)(params['s3_compatible_region']))) {
            _context2.next = 96;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_region must be of type String, received ".concat((0, _utils.getType)(s3_compatible_region)));
        case 96:
          if (!(params['s3_compatible_access_key'] && !(0, _utils.isString)(params['s3_compatible_access_key']))) {
            _context2.next = 98;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(s3_compatible_access_key)));
        case 98:
          if (!(params['s3_compatible_secret_key'] && !(0, _utils.isString)(params['s3_compatible_secret_key']))) {
            _context2.next = 100;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(s3_compatible_secret_key)));
        case 100:
          if (!(params['files_agent_root'] && !(0, _utils.isString)(params['files_agent_root']))) {
            _context2.next = 102;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_root must be of type String, received ".concat((0, _utils.getType)(files_agent_root)));
        case 102:
          if (!(params['files_agent_permission_set'] && !(0, _utils.isString)(params['files_agent_permission_set']))) {
            _context2.next = 104;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_permission_set must be of type String, received ".concat((0, _utils.getType)(files_agent_permission_set)));
        case 104:
          if (!(params['filebase_access_key'] && !(0, _utils.isString)(params['filebase_access_key']))) {
            _context2.next = 106;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(filebase_access_key)));
        case 106:
          if (!(params['filebase_secret_key'] && !(0, _utils.isString)(params['filebase_secret_key']))) {
            _context2.next = 108;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(filebase_secret_key)));
        case 108:
          if (!(params['filebase_bucket'] && !(0, _utils.isString)(params['filebase_bucket']))) {
            _context2.next = 110;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_bucket must be of type String, received ".concat((0, _utils.getType)(filebase_bucket)));
        case 110:
          if (!(params['cloudflare_access_key'] && !(0, _utils.isString)(params['cloudflare_access_key']))) {
            _context2.next = 112;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(cloudflare_access_key)));
        case 112:
          if (!(params['cloudflare_secret_key'] && !(0, _utils.isString)(params['cloudflare_secret_key']))) {
            _context2.next = 114;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(cloudflare_secret_key)));
        case 114:
          if (!(params['cloudflare_bucket'] && !(0, _utils.isString)(params['cloudflare_bucket']))) {
            _context2.next = 116;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_bucket must be of type String, received ".concat((0, _utils.getType)(cloudflare_bucket)));
        case 116:
          if (!(params['cloudflare_endpoint'] && !(0, _utils.isString)(params['cloudflare_endpoint']))) {
            _context2.next = 118;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_endpoint must be of type String, received ".concat((0, _utils.getType)(cloudflare_endpoint)));
        case 118:
          if (!(params['linode_access_key'] && !(0, _utils.isString)(params['linode_access_key']))) {
            _context2.next = 120;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(linode_access_key)));
        case 120:
          if (!(params['linode_secret_key'] && !(0, _utils.isString)(params['linode_secret_key']))) {
            _context2.next = 122;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(linode_secret_key)));
        case 122:
          if (!(params['linode_bucket'] && !(0, _utils.isString)(params['linode_bucket']))) {
            _context2.next = 124;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_bucket must be of type String, received ".concat((0, _utils.getType)(linode_bucket)));
        case 124:
          if (!(params['linode_region'] && !(0, _utils.isString)(params['linode_region']))) {
            _context2.next = 126;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_region must be of type String, received ".concat((0, _utils.getType)(linode_region)));
        case 126:
          if (params['id']) {
            _context2.next = 132;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 131;
            break;
          }
          params['id'] = _this.id;
          _context2.next = 132;
          break;
        case 131:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 132:
          _context2.next = 134;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 134:
          response = _context2.sent;
          return _context2.abrupt("return", new RemoteServer(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 136:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
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
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
        case 16:
          response = _context3.sent;
          return _context3.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
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
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(RemoteServer, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 4:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context4.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 6:
        _context4.next = 8;
        return _Api.default.sendRequest("/remote_servers", 'GET', params, options);
      case 8:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new RemoteServer(obj, options);
        })) || []);
      case 10:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(RemoteServer, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return RemoteServer.list(params, options);
});
// Parameters:
//   id (required) - int64 - Remote Server ID.
(0, _defineProperty2.default)(RemoteServer, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context5.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context5.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context5.next = 11;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context5.sent;
          return _context5.abrupt("return", new RemoteServer(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(RemoteServer, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return RemoteServer.find(id, params, options);
});
// Parameters:
//   id (required) - int64 - Remote Server ID.
(0, _defineProperty2.default)(RemoteServer, "findConfigurationFile", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(id) {
    var params,
      options,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context6.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context6.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context6.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context6.next = 11;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params['id']), "/configuration_file"), 'GET', params, options);
        case 11:
          response = _context6.sent;
          return _context6.abrupt("return", new RemoteServerConfigurationFile(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x2) {
    return _ref8.apply(this, arguments);
  };
}());
// Parameters:
//   aws_access_key - string - AWS Access Key.
//   aws_secret_key - string - AWS secret key.
//   password - string - Password if needed.
//   private_key - string - Private key if needed.
//   private_key_passphrase - string - Passphrase for private key if needed.
//   ssl_certificate - string - SSL client certificate.
//   google_cloud_storage_credentials_json - string - A JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
//   wasabi_access_key - string - Wasabi access key.
//   wasabi_secret_key - string - Wasabi secret key.
//   backblaze_b2_key_id - string - Backblaze B2 Cloud Storage keyID.
//   backblaze_b2_application_key - string - Backblaze B2 Cloud Storage applicationKey.
//   rackspace_api_key - string - Rackspace API key from the Rackspace Cloud Control Panel.
//   reset_authentication - boolean - Reset authenticated account
//   azure_blob_storage_access_key - string - Azure Blob Storage secret key.
//   azure_files_storage_access_key - string - Azure File Storage access key.
//   hostname - string - Hostname or IP address
//   name - string - Internal name for your reference
//   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
//   pin_to_site_region - boolean - If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a sitewide setting which will force it to true.
//   port - int64 - Port for remote server.  Not needed for S3.
//   s3_bucket - string - S3 bucket name
//   s3_region - string - S3 region
//   server_certificate - string - Remote server certificate
//   server_host_key - string - Remote server SSH Host Key. If provided, we will require that the server host key matches the provided key. Uses OpenSSH format similar to what would go into ~/.ssh/known_hosts
//   server_type - string - Remote server type.
//   ssl - string - Should we require SSL?
//   username - string - Remote server username.  Not needed for S3 buckets.
//   google_cloud_storage_bucket - string - Google Cloud Storage bucket name
//   google_cloud_storage_project_id - string - Google Cloud Project ID
//   backblaze_b2_bucket - string - Backblaze B2 Cloud Storage Bucket name
//   backblaze_b2_s3_endpoint - string - Backblaze B2 Cloud Storage S3 Endpoint
//   wasabi_bucket - string - Wasabi Bucket name
//   wasabi_region - string - Wasabi region
//   rackspace_username - string - Rackspace username used to login to the Rackspace Cloud Control Panel.
//   rackspace_region - string - Three letter airport code for Rackspace region. See https://support.rackspace.com/how-to/about-regions/
//   rackspace_container - string - The name of the container (top level directory) where files will sync.
//   one_drive_account_type - string - Either personal or business_other account types
//   azure_blob_storage_account - string - Azure Blob Storage Account name
//   azure_blob_storage_container - string - Azure Blob Storage Container name
//   azure_blob_storage_sas_token - string - Shared Access Signature (SAS) token
//   azure_files_storage_account - string - Azure File Storage Account name
//   azure_files_storage_share_name - string - Azure File Storage Share name
//   azure_files_storage_sas_token - string - Shared Access Signature (SAS) token
//   s3_compatible_bucket - string - S3-compatible Bucket name
//   s3_compatible_endpoint - string - S3-compatible endpoint
//   s3_compatible_region - string - S3-compatible endpoint
//   enable_dedicated_ips - boolean - `true` if remote server only accepts connections from dedicated IPs
//   s3_compatible_access_key - string - S3-compatible Access Key.
//   s3_compatible_secret_key - string - S3-compatible secret key
//   files_agent_root - string - Agent local root path
//   files_agent_permission_set - string - Local permissions for files agent. read_only, write_only, or read_write
//   filebase_access_key - string - Filebase Access Key.
//   filebase_secret_key - string - Filebase secret key
//   filebase_bucket - string - Filebase Bucket name
//   cloudflare_access_key - string - Cloudflare Access Key.
//   cloudflare_secret_key - string - Cloudflare secret key
//   cloudflare_bucket - string - Cloudflare Bucket name
//   cloudflare_endpoint - string - Cloudflare endpoint
//   dropbox_teams - boolean - List Team folders in root
//   linode_access_key - string - Linode Access Key.
//   linode_secret_key - string - Linode secret key
//   linode_bucket - string - Linode Bucket name
//   linode_region - string - Linode region
(0, _defineProperty2.default)(RemoteServer, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function _callee7$(_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (!(params['aws_access_key'] && !(0, _utils.isString)(params['aws_access_key']))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params['aws_access_key'])));
      case 4:
        if (!(params['aws_secret_key'] && !(0, _utils.isString)(params['aws_secret_key']))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params['aws_secret_key'])));
      case 6:
        if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params['password'])));
      case 8:
        if (!(params['private_key'] && !(0, _utils.isString)(params['private_key']))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params['private_key'])));
      case 10:
        if (!(params['private_key_passphrase'] && !(0, _utils.isString)(params['private_key_passphrase']))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params['private_key_passphrase'])));
      case 12:
        if (!(params['ssl_certificate'] && !(0, _utils.isString)(params['ssl_certificate']))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(params['ssl_certificate'])));
      case 14:
        if (!(params['google_cloud_storage_credentials_json'] && !(0, _utils.isString)(params['google_cloud_storage_credentials_json']))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params['google_cloud_storage_credentials_json'])));
      case 16:
        if (!(params['wasabi_access_key'] && !(0, _utils.isString)(params['wasabi_access_key']))) {
          _context7.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params['wasabi_access_key'])));
      case 18:
        if (!(params['wasabi_secret_key'] && !(0, _utils.isString)(params['wasabi_secret_key']))) {
          _context7.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params['wasabi_secret_key'])));
      case 20:
        if (!(params['backblaze_b2_key_id'] && !(0, _utils.isString)(params['backblaze_b2_key_id']))) {
          _context7.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params['backblaze_b2_key_id'])));
      case 22:
        if (!(params['backblaze_b2_application_key'] && !(0, _utils.isString)(params['backblaze_b2_application_key']))) {
          _context7.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params['backblaze_b2_application_key'])));
      case 24:
        if (!(params['rackspace_api_key'] && !(0, _utils.isString)(params['rackspace_api_key']))) {
          _context7.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: rackspace_api_key must be of type String, received ".concat((0, _utils.getType)(params['rackspace_api_key'])));
      case 26:
        if (!(params['azure_blob_storage_access_key'] && !(0, _utils.isString)(params['azure_blob_storage_access_key']))) {
          _context7.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params['azure_blob_storage_access_key'])));
      case 28:
        if (!(params['azure_files_storage_access_key'] && !(0, _utils.isString)(params['azure_files_storage_access_key']))) {
          _context7.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params['azure_files_storage_access_key'])));
      case 30:
        if (!(params['hostname'] && !(0, _utils.isString)(params['hostname']))) {
          _context7.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(params['hostname'])));
      case 32:
        if (!(params['name'] && !(0, _utils.isString)(params['name']))) {
          _context7.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params['name'])));
      case 34:
        if (!(params['max_connections'] && !(0, _utils.isInt)(params['max_connections']))) {
          _context7.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(params['max_connections'])));
      case 36:
        if (!(params['port'] && !(0, _utils.isInt)(params['port']))) {
          _context7.next = 38;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(params['port'])));
      case 38:
        if (!(params['s3_bucket'] && !(0, _utils.isString)(params['s3_bucket']))) {
          _context7.next = 40;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(params['s3_bucket'])));
      case 40:
        if (!(params['s3_region'] && !(0, _utils.isString)(params['s3_region']))) {
          _context7.next = 42;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(params['s3_region'])));
      case 42:
        if (!(params['server_certificate'] && !(0, _utils.isString)(params['server_certificate']))) {
          _context7.next = 44;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params['server_certificate'])));
      case 44:
        if (!(params['server_host_key'] && !(0, _utils.isString)(params['server_host_key']))) {
          _context7.next = 46;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(params['server_host_key'])));
      case 46:
        if (!(params['server_type'] && !(0, _utils.isString)(params['server_type']))) {
          _context7.next = 48;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params['server_type'])));
      case 48:
        if (!(params['ssl'] && !(0, _utils.isString)(params['ssl']))) {
          _context7.next = 50;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(params['ssl'])));
      case 50:
        if (!(params['username'] && !(0, _utils.isString)(params['username']))) {
          _context7.next = 52;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params['username'])));
      case 52:
        if (!(params['google_cloud_storage_bucket'] && !(0, _utils.isString)(params['google_cloud_storage_bucket']))) {
          _context7.next = 54;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(params['google_cloud_storage_bucket'])));
      case 54:
        if (!(params['google_cloud_storage_project_id'] && !(0, _utils.isString)(params['google_cloud_storage_project_id']))) {
          _context7.next = 56;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(params['google_cloud_storage_project_id'])));
      case 56:
        if (!(params['backblaze_b2_bucket'] && !(0, _utils.isString)(params['backblaze_b2_bucket']))) {
          _context7.next = 58;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(params['backblaze_b2_bucket'])));
      case 58:
        if (!(params['backblaze_b2_s3_endpoint'] && !(0, _utils.isString)(params['backblaze_b2_s3_endpoint']))) {
          _context7.next = 60;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(params['backblaze_b2_s3_endpoint'])));
      case 60:
        if (!(params['wasabi_bucket'] && !(0, _utils.isString)(params['wasabi_bucket']))) {
          _context7.next = 62;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(params['wasabi_bucket'])));
      case 62:
        if (!(params['wasabi_region'] && !(0, _utils.isString)(params['wasabi_region']))) {
          _context7.next = 64;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(params['wasabi_region'])));
      case 64:
        if (!(params['rackspace_username'] && !(0, _utils.isString)(params['rackspace_username']))) {
          _context7.next = 66;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: rackspace_username must be of type String, received ".concat((0, _utils.getType)(params['rackspace_username'])));
      case 66:
        if (!(params['rackspace_region'] && !(0, _utils.isString)(params['rackspace_region']))) {
          _context7.next = 68;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: rackspace_region must be of type String, received ".concat((0, _utils.getType)(params['rackspace_region'])));
      case 68:
        if (!(params['rackspace_container'] && !(0, _utils.isString)(params['rackspace_container']))) {
          _context7.next = 70;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: rackspace_container must be of type String, received ".concat((0, _utils.getType)(params['rackspace_container'])));
      case 70:
        if (!(params['one_drive_account_type'] && !(0, _utils.isString)(params['one_drive_account_type']))) {
          _context7.next = 72;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(params['one_drive_account_type'])));
      case 72:
        if (!(params['azure_blob_storage_account'] && !(0, _utils.isString)(params['azure_blob_storage_account']))) {
          _context7.next = 74;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(params['azure_blob_storage_account'])));
      case 74:
        if (!(params['azure_blob_storage_container'] && !(0, _utils.isString)(params['azure_blob_storage_container']))) {
          _context7.next = 76;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(params['azure_blob_storage_container'])));
      case 76:
        if (!(params['azure_blob_storage_sas_token'] && !(0, _utils.isString)(params['azure_blob_storage_sas_token']))) {
          _context7.next = 78;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params['azure_blob_storage_sas_token'])));
      case 78:
        if (!(params['azure_files_storage_account'] && !(0, _utils.isString)(params['azure_files_storage_account']))) {
          _context7.next = 80;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_account must be of type String, received ".concat((0, _utils.getType)(params['azure_files_storage_account'])));
      case 80:
        if (!(params['azure_files_storage_share_name'] && !(0, _utils.isString)(params['azure_files_storage_share_name']))) {
          _context7.next = 82;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_share_name must be of type String, received ".concat((0, _utils.getType)(params['azure_files_storage_share_name'])));
      case 82:
        if (!(params['azure_files_storage_sas_token'] && !(0, _utils.isString)(params['azure_files_storage_sas_token']))) {
          _context7.next = 84;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params['azure_files_storage_sas_token'])));
      case 84:
        if (!(params['s3_compatible_bucket'] && !(0, _utils.isString)(params['s3_compatible_bucket']))) {
          _context7.next = 86;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_bucket must be of type String, received ".concat((0, _utils.getType)(params['s3_compatible_bucket'])));
      case 86:
        if (!(params['s3_compatible_endpoint'] && !(0, _utils.isString)(params['s3_compatible_endpoint']))) {
          _context7.next = 88;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint must be of type String, received ".concat((0, _utils.getType)(params['s3_compatible_endpoint'])));
      case 88:
        if (!(params['s3_compatible_region'] && !(0, _utils.isString)(params['s3_compatible_region']))) {
          _context7.next = 90;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_region must be of type String, received ".concat((0, _utils.getType)(params['s3_compatible_region'])));
      case 90:
        if (!(params['s3_compatible_access_key'] && !(0, _utils.isString)(params['s3_compatible_access_key']))) {
          _context7.next = 92;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params['s3_compatible_access_key'])));
      case 92:
        if (!(params['s3_compatible_secret_key'] && !(0, _utils.isString)(params['s3_compatible_secret_key']))) {
          _context7.next = 94;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params['s3_compatible_secret_key'])));
      case 94:
        if (!(params['files_agent_root'] && !(0, _utils.isString)(params['files_agent_root']))) {
          _context7.next = 96;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_root must be of type String, received ".concat((0, _utils.getType)(params['files_agent_root'])));
      case 96:
        if (!(params['files_agent_permission_set'] && !(0, _utils.isString)(params['files_agent_permission_set']))) {
          _context7.next = 98;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_permission_set must be of type String, received ".concat((0, _utils.getType)(params['files_agent_permission_set'])));
      case 98:
        if (!(params['filebase_access_key'] && !(0, _utils.isString)(params['filebase_access_key']))) {
          _context7.next = 100;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params['filebase_access_key'])));
      case 100:
        if (!(params['filebase_secret_key'] && !(0, _utils.isString)(params['filebase_secret_key']))) {
          _context7.next = 102;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params['filebase_secret_key'])));
      case 102:
        if (!(params['filebase_bucket'] && !(0, _utils.isString)(params['filebase_bucket']))) {
          _context7.next = 104;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_bucket must be of type String, received ".concat((0, _utils.getType)(params['filebase_bucket'])));
      case 104:
        if (!(params['cloudflare_access_key'] && !(0, _utils.isString)(params['cloudflare_access_key']))) {
          _context7.next = 106;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params['cloudflare_access_key'])));
      case 106:
        if (!(params['cloudflare_secret_key'] && !(0, _utils.isString)(params['cloudflare_secret_key']))) {
          _context7.next = 108;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params['cloudflare_secret_key'])));
      case 108:
        if (!(params['cloudflare_bucket'] && !(0, _utils.isString)(params['cloudflare_bucket']))) {
          _context7.next = 110;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_bucket must be of type String, received ".concat((0, _utils.getType)(params['cloudflare_bucket'])));
      case 110:
        if (!(params['cloudflare_endpoint'] && !(0, _utils.isString)(params['cloudflare_endpoint']))) {
          _context7.next = 112;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_endpoint must be of type String, received ".concat((0, _utils.getType)(params['cloudflare_endpoint'])));
      case 112:
        if (!(params['linode_access_key'] && !(0, _utils.isString)(params['linode_access_key']))) {
          _context7.next = 114;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params['linode_access_key'])));
      case 114:
        if (!(params['linode_secret_key'] && !(0, _utils.isString)(params['linode_secret_key']))) {
          _context7.next = 116;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params['linode_secret_key'])));
      case 116:
        if (!(params['linode_bucket'] && !(0, _utils.isString)(params['linode_bucket']))) {
          _context7.next = 118;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_bucket must be of type String, received ".concat((0, _utils.getType)(params['linode_bucket'])));
      case 118:
        if (!(params['linode_region'] && !(0, _utils.isString)(params['linode_region']))) {
          _context7.next = 120;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_region must be of type String, received ".concat((0, _utils.getType)(params['linode_region'])));
      case 120:
        _context7.next = 122;
        return _Api.default.sendRequest("/remote_servers", 'POST', params, options);
      case 122:
        response = _context7.sent;
        return _context7.abrupt("return", new RemoteServer(response === null || response === void 0 ? void 0 : response.data, options));
      case 124:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = RemoteServer;
exports.default = _default;