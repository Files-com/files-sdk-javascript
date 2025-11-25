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
var _RemoteServer;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
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
  // string # If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote server. This can improve performance in certain access patterns, such as high-latency connections.  It will cause data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to be a benefit in a given situation.
  (0, _defineProperty2.default)(this, "getBufferUploads", function () {
    return _this.attributes.buffer_uploads;
  });
  (0, _defineProperty2.default)(this, "setBufferUploads", function (value) {
    _this.attributes.buffer_uploads = value;
  });
  // int64 # Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  (0, _defineProperty2.default)(this, "getMaxConnections", function () {
    return _this.attributes.max_connections;
  });
  (0, _defineProperty2.default)(this, "setMaxConnections", function (value) {
    _this.attributes.max_connections = value;
  });
  // boolean # If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a site-wide setting which will force it to true.
  (0, _defineProperty2.default)(this, "getPinToSiteRegion", function () {
    return _this.attributes.pin_to_site_region;
  });
  (0, _defineProperty2.default)(this, "setPinToSiteRegion", function (value) {
    _this.attributes.pin_to_site_region = value;
  });
  // string # If set, all communications with this remote server are made through the provided region.
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
  // string # Google Cloud Storage: Bucket Name
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageBucket", function () {
    return _this.attributes.google_cloud_storage_bucket;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageBucket", function (value) {
    _this.attributes.google_cloud_storage_bucket = value;
  });
  // string # Google Cloud Storage: Project ID
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageProjectId", function () {
    return _this.attributes.google_cloud_storage_project_id;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageProjectId", function (value) {
    _this.attributes.google_cloud_storage_project_id = value;
  });
  // string # Google Cloud Storage: S3-compatible Access Key.
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageS3CompatibleAccessKey", function () {
    return _this.attributes.google_cloud_storage_s3_compatible_access_key;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageS3CompatibleAccessKey", function (value) {
    _this.attributes.google_cloud_storage_s3_compatible_access_key = value;
  });
  // string # Backblaze B2 Cloud Storage: S3 Endpoint
  (0, _defineProperty2.default)(this, "getBackblazeB2S3Endpoint", function () {
    return _this.attributes.backblaze_b2_s3_endpoint;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2S3Endpoint", function (value) {
    _this.attributes.backblaze_b2_s3_endpoint = value;
  });
  // string # Backblaze B2 Cloud Storage: Bucket name
  (0, _defineProperty2.default)(this, "getBackblazeB2Bucket", function () {
    return _this.attributes.backblaze_b2_bucket;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2Bucket", function (value) {
    _this.attributes.backblaze_b2_bucket = value;
  });
  // string # Wasabi: Bucket name
  (0, _defineProperty2.default)(this, "getWasabiBucket", function () {
    return _this.attributes.wasabi_bucket;
  });
  (0, _defineProperty2.default)(this, "setWasabiBucket", function (value) {
    _this.attributes.wasabi_bucket = value;
  });
  // string # Wasabi: Region
  (0, _defineProperty2.default)(this, "getWasabiRegion", function () {
    return _this.attributes.wasabi_region;
  });
  (0, _defineProperty2.default)(this, "setWasabiRegion", function (value) {
    _this.attributes.wasabi_region = value;
  });
  // string # Wasabi: Access Key.
  (0, _defineProperty2.default)(this, "getWasabiAccessKey", function () {
    return _this.attributes.wasabi_access_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiAccessKey", function (value) {
    _this.attributes.wasabi_access_key = value;
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
  // string # OneDrive: Either personal or business_other account types
  (0, _defineProperty2.default)(this, "getOneDriveAccountType", function () {
    return _this.attributes.one_drive_account_type;
  });
  (0, _defineProperty2.default)(this, "setOneDriveAccountType", function (value) {
    _this.attributes.one_drive_account_type = value;
  });
  // string # Azure Blob Storage: Account name
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccount", function () {
    return _this.attributes.azure_blob_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccount", function (value) {
    _this.attributes.azure_blob_storage_account = value;
  });
  // string # Azure Blob Storage: Container name
  (0, _defineProperty2.default)(this, "getAzureBlobStorageContainer", function () {
    return _this.attributes.azure_blob_storage_container;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageContainer", function (value) {
    _this.attributes.azure_blob_storage_container = value;
  });
  // boolean # Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled?
  (0, _defineProperty2.default)(this, "getAzureBlobStorageHierarchicalNamespace", function () {
    return _this.attributes.azure_blob_storage_hierarchical_namespace;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageHierarchicalNamespace", function (value) {
    _this.attributes.azure_blob_storage_hierarchical_namespace = value;
  });
  // string # Azure Blob Storage: Custom DNS suffix
  (0, _defineProperty2.default)(this, "getAzureBlobStorageDnsSuffix", function () {
    return _this.attributes.azure_blob_storage_dns_suffix;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageDnsSuffix", function (value) {
    _this.attributes.azure_blob_storage_dns_suffix = value;
  });
  // string # Azure Files: Storage Account name
  (0, _defineProperty2.default)(this, "getAzureFilesStorageAccount", function () {
    return _this.attributes.azure_files_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageAccount", function (value) {
    _this.attributes.azure_files_storage_account = value;
  });
  // string # Azure Files:  Storage Share name
  (0, _defineProperty2.default)(this, "getAzureFilesStorageShareName", function () {
    return _this.attributes.azure_files_storage_share_name;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageShareName", function (value) {
    _this.attributes.azure_files_storage_share_name = value;
  });
  // string # Azure Files: Custom DNS suffix
  (0, _defineProperty2.default)(this, "getAzureFilesStorageDnsSuffix", function () {
    return _this.attributes.azure_files_storage_dns_suffix;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageDnsSuffix", function (value) {
    _this.attributes.azure_files_storage_dns_suffix = value;
  });
  // string # S3-compatible: Bucket name
  (0, _defineProperty2.default)(this, "getS3CompatibleBucket", function () {
    return _this.attributes.s3_compatible_bucket;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleBucket", function (value) {
    _this.attributes.s3_compatible_bucket = value;
  });
  // string # S3-compatible: endpoint
  (0, _defineProperty2.default)(this, "getS3CompatibleEndpoint", function () {
    return _this.attributes.s3_compatible_endpoint;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleEndpoint", function (value) {
    _this.attributes.s3_compatible_endpoint = value;
  });
  // string # S3-compatible: region
  (0, _defineProperty2.default)(this, "getS3CompatibleRegion", function () {
    return _this.attributes.s3_compatible_region;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleRegion", function (value) {
    _this.attributes.s3_compatible_region = value;
  });
  // string # S3-compatible: Access Key
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
  // string # Files Agent version
  (0, _defineProperty2.default)(this, "getFilesAgentVersion", function () {
    return _this.attributes.files_agent_version;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentVersion", function (value) {
    _this.attributes.files_agent_version = value;
  });
  // string # Filebase: Bucket name
  (0, _defineProperty2.default)(this, "getFilebaseBucket", function () {
    return _this.attributes.filebase_bucket;
  });
  (0, _defineProperty2.default)(this, "setFilebaseBucket", function (value) {
    _this.attributes.filebase_bucket = value;
  });
  // string # Filebase: Access Key.
  (0, _defineProperty2.default)(this, "getFilebaseAccessKey", function () {
    return _this.attributes.filebase_access_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseAccessKey", function (value) {
    _this.attributes.filebase_access_key = value;
  });
  // string # Cloudflare: Bucket name
  (0, _defineProperty2.default)(this, "getCloudflareBucket", function () {
    return _this.attributes.cloudflare_bucket;
  });
  (0, _defineProperty2.default)(this, "setCloudflareBucket", function (value) {
    _this.attributes.cloudflare_bucket = value;
  });
  // string # Cloudflare: Access Key.
  (0, _defineProperty2.default)(this, "getCloudflareAccessKey", function () {
    return _this.attributes.cloudflare_access_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareAccessKey", function (value) {
    _this.attributes.cloudflare_access_key = value;
  });
  // string # Cloudflare: endpoint
  (0, _defineProperty2.default)(this, "getCloudflareEndpoint", function () {
    return _this.attributes.cloudflare_endpoint;
  });
  (0, _defineProperty2.default)(this, "setCloudflareEndpoint", function (value) {
    _this.attributes.cloudflare_endpoint = value;
  });
  // boolean # Dropbox: If true, list Team folders in root?
  (0, _defineProperty2.default)(this, "getDropboxTeams", function () {
    return _this.attributes.dropbox_teams;
  });
  (0, _defineProperty2.default)(this, "setDropboxTeams", function (value) {
    _this.attributes.dropbox_teams = value;
  });
  // string # Linode: Bucket name
  (0, _defineProperty2.default)(this, "getLinodeBucket", function () {
    return _this.attributes.linode_bucket;
  });
  (0, _defineProperty2.default)(this, "setLinodeBucket", function (value) {
    _this.attributes.linode_bucket = value;
  });
  // string # Linode: Access Key
  (0, _defineProperty2.default)(this, "getLinodeAccessKey", function () {
    return _this.attributes.linode_access_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeAccessKey", function (value) {
    _this.attributes.linode_access_key = value;
  });
  // string # Linode: region
  (0, _defineProperty2.default)(this, "getLinodeRegion", function () {
    return _this.attributes.linode_region;
  });
  (0, _defineProperty2.default)(this, "setLinodeRegion", function (value) {
    _this.attributes.linode_region = value;
  });
  // boolean # If true, this remote server supports file versioning. This value is determined automatically by Files.com.
  (0, _defineProperty2.default)(this, "getSupportsVersioning", function () {
    return _this.attributes.supports_versioning;
  });
  (0, _defineProperty2.default)(this, "setSupportsVersioning", function (value) {
    _this.attributes.supports_versioning = value;
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
  // boolean # Reset authenticated account?
  (0, _defineProperty2.default)(this, "getResetAuthentication", function () {
    return _this.attributes.reset_authentication;
  });
  (0, _defineProperty2.default)(this, "setResetAuthentication", function (value) {
    _this.attributes.reset_authentication = value;
  });
  // string # SSL client certificate.
  (0, _defineProperty2.default)(this, "getSslCertificate", function () {
    return _this.attributes.ssl_certificate;
  });
  (0, _defineProperty2.default)(this, "setSslCertificate", function (value) {
    _this.attributes.ssl_certificate = value;
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
  // Post local changes, check in, and download configuration file (used by some Remote Server integrations, such as the Files.com Agent)
  //
  // Parameters:
  //   api_token - string - Files Agent API Token
  //   permission_set - string - The permission set for the agent ['read_write', 'read_only', 'write_only']
  //   root - string - The root directory for the agent
  //   hostname - string
  //   port - int64 - Incoming port for files agent connections
  //   status - string - either running or shutdown
  //   config_version - string - agent config version
  //   private_key - string - The private key for the agent
  //   public_key - string - public key
  //   server_host_key - string
  //   subdomain - string - Files.com subdomain site name
  (0, _defineProperty2.default)(this, "configurationFile", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      RemoteServerConfigurationFile,
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
          if (!(params.api_token && !(0, _utils.isString)(params.api_token))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: api_token must be of type String, received ".concat((0, _utils.getType)(params.api_token)));
        case 4:
          if (!(params.permission_set && !(0, _utils.isString)(params.permission_set))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permission_set must be of type String, received ".concat((0, _utils.getType)(params.permission_set)));
        case 5:
          if (!(params.root && !(0, _utils.isString)(params.root))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: root must be of type String, received ".concat((0, _utils.getType)(params.root)));
        case 6:
          if (!(params.hostname && !(0, _utils.isString)(params.hostname))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(params.hostname)));
        case 7:
          if (!(params.port && !(0, _utils.isInt)(params.port))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(params.port)));
        case 8:
          if (!(params.status && !(0, _utils.isString)(params.status))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: status must be of type String, received ".concat((0, _utils.getType)(params.status)));
        case 9:
          if (!(params.config_version && !(0, _utils.isString)(params.config_version))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: config_version must be of type String, received ".concat((0, _utils.getType)(params.config_version)));
        case 10:
          if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
        case 11:
          if (!(params.public_key && !(0, _utils.isString)(params.public_key))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: public_key must be of type String, received ".concat((0, _utils.getType)(params.public_key)));
        case 12:
          if (!(params.server_host_key && !(0, _utils.isString)(params.server_host_key))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(params.server_host_key)));
        case 13:
          if (!(params.subdomain && !(0, _utils.isString)(params.subdomain))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: subdomain must be of type String, received ".concat((0, _utils.getType)(params.subdomain)));
        case 14:
          if (params.id) {
            _context.next = 16;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 15;
            break;
          }
          params.id = _this.id;
          _context.next = 16;
          break;
        case 15:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 16:
          _context.next = 17;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id), "/configuration_file"), 'POST', params, _this.options);
        case 17:
          response = _context.sent;
          RemoteServerConfigurationFile = require('./RemoteServerConfigurationFile.js').default;
          return _context.abrupt("return", new RemoteServerConfigurationFile(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Parameters:
  //   password - string - Password, if needed.
  //   private_key - string - Private key, if needed.
  //   private_key_passphrase - string - Passphrase for private key if needed.
  //   reset_authentication - boolean - Reset authenticated account?
  //   ssl_certificate - string - SSL client certificate.
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
  //   aws_access_key - string - AWS Access Key.
  //   azure_blob_storage_account - string - Azure Blob Storage: Account name
  //   azure_blob_storage_container - string - Azure Blob Storage: Container name
  //   azure_blob_storage_dns_suffix - string - Azure Blob Storage: Custom DNS suffix
  //   azure_blob_storage_hierarchical_namespace - boolean - Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled?
  //   azure_files_storage_account - string - Azure Files: Storage Account name
  //   azure_files_storage_dns_suffix - string - Azure Files: Custom DNS suffix
  //   azure_files_storage_share_name - string - Azure Files:  Storage Share name
  //   backblaze_b2_bucket - string - Backblaze B2 Cloud Storage: Bucket name
  //   backblaze_b2_s3_endpoint - string - Backblaze B2 Cloud Storage: S3 Endpoint
  //   buffer_uploads - string - If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote server. This can improve performance in certain access patterns, such as high-latency connections.  It will cause data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to be a benefit in a given situation.
  //   cloudflare_access_key - string - Cloudflare: Access Key.
  //   cloudflare_bucket - string - Cloudflare: Bucket name
  //   cloudflare_endpoint - string - Cloudflare: endpoint
  //   dropbox_teams - boolean - Dropbox: If true, list Team folders in root?
  //   enable_dedicated_ips - boolean - `true` if remote server only accepts connections from dedicated IPs
  //   filebase_access_key - string - Filebase: Access Key.
  //   filebase_bucket - string - Filebase: Bucket name
  //   files_agent_permission_set - string - Local permissions for files agent. read_only, write_only, or read_write
  //   files_agent_root - string - Agent local root path
  //   files_agent_version - string - Files Agent version
  //   google_cloud_storage_bucket - string - Google Cloud Storage: Bucket Name
  //   google_cloud_storage_project_id - string - Google Cloud Storage: Project ID
  //   google_cloud_storage_s3_compatible_access_key - string - Google Cloud Storage: S3-compatible Access Key.
  //   hostname - string - Hostname or IP address
  //   linode_access_key - string - Linode: Access Key
  //   linode_bucket - string - Linode: Bucket name
  //   linode_region - string - Linode: region
  //   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  //   name - string - Internal name for your reference
  //   one_drive_account_type - string - OneDrive: Either personal or business_other account types
  //   pin_to_site_region - boolean - If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a site-wide setting which will force it to true.
  //   port - int64 - Port for remote server.  Not needed for S3.
  //   s3_bucket - string - S3 bucket name
  //   s3_compatible_access_key - string - S3-compatible: Access Key
  //   s3_compatible_bucket - string - S3-compatible: Bucket name
  //   s3_compatible_endpoint - string - S3-compatible: endpoint
  //   s3_compatible_region - string - S3-compatible: region
  //   s3_region - string - S3 region
  //   server_certificate - string - Remote server certificate
  //   server_host_key - string - Remote server SSH Host Key. If provided, we will require that the server host key matches the provided key. Uses OpenSSH format similar to what would go into ~/.ssh/known_hosts
  //   server_type - string - Remote server type.
  //   ssl - string - Should we require SSL?
  //   username - string - Remote server username.  Not needed for S3 buckets.
  //   wasabi_access_key - string - Wasabi: Access Key.
  //   wasabi_bucket - string - Wasabi: Bucket name
  //   wasabi_region - string - Wasabi: Region
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
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
          if (!(params.password && !(0, _utils.isString)(params.password))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
        case 4:
          if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
        case 5:
          if (!(params.private_key_passphrase && !(0, _utils.isString)(params.private_key_passphrase))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params.private_key_passphrase)));
        case 6:
          if (!(params.ssl_certificate && !(0, _utils.isString)(params.ssl_certificate))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(params.ssl_certificate)));
        case 7:
          if (!(params.aws_secret_key && !(0, _utils.isString)(params.aws_secret_key))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params.aws_secret_key)));
        case 8:
          if (!(params.azure_blob_storage_access_key && !(0, _utils.isString)(params.azure_blob_storage_access_key))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_access_key)));
        case 9:
          if (!(params.azure_blob_storage_sas_token && !(0, _utils.isString)(params.azure_blob_storage_sas_token))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_sas_token)));
        case 10:
          if (!(params.azure_files_storage_access_key && !(0, _utils.isString)(params.azure_files_storage_access_key))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_access_key)));
        case 11:
          if (!(params.azure_files_storage_sas_token && !(0, _utils.isString)(params.azure_files_storage_sas_token))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_sas_token)));
        case 12:
          if (!(params.backblaze_b2_application_key && !(0, _utils.isString)(params.backblaze_b2_application_key))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_application_key)));
        case 13:
          if (!(params.backblaze_b2_key_id && !(0, _utils.isString)(params.backblaze_b2_key_id))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_key_id)));
        case 14:
          if (!(params.cloudflare_secret_key && !(0, _utils.isString)(params.cloudflare_secret_key))) {
            _context2.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_secret_key)));
        case 15:
          if (!(params.filebase_secret_key && !(0, _utils.isString)(params.filebase_secret_key))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_secret_key)));
        case 16:
          if (!(params.google_cloud_storage_credentials_json && !(0, _utils.isString)(params.google_cloud_storage_credentials_json))) {
            _context2.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_credentials_json)));
        case 17:
          if (!(params.google_cloud_storage_s3_compatible_secret_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_secret_key))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_secret_key)));
        case 18:
          if (!(params.linode_secret_key && !(0, _utils.isString)(params.linode_secret_key))) {
            _context2.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params.linode_secret_key)));
        case 19:
          if (!(params.s3_compatible_secret_key && !(0, _utils.isString)(params.s3_compatible_secret_key))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_secret_key)));
        case 20:
          if (!(params.wasabi_secret_key && !(0, _utils.isString)(params.wasabi_secret_key))) {
            _context2.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_secret_key)));
        case 21:
          if (!(params.aws_access_key && !(0, _utils.isString)(params.aws_access_key))) {
            _context2.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params.aws_access_key)));
        case 22:
          if (!(params.azure_blob_storage_account && !(0, _utils.isString)(params.azure_blob_storage_account))) {
            _context2.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_account)));
        case 23:
          if (!(params.azure_blob_storage_container && !(0, _utils.isString)(params.azure_blob_storage_container))) {
            _context2.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_container)));
        case 24:
          if (!(params.azure_blob_storage_dns_suffix && !(0, _utils.isString)(params.azure_blob_storage_dns_suffix))) {
            _context2.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_dns_suffix)));
        case 25:
          if (!(params.azure_files_storage_account && !(0, _utils.isString)(params.azure_files_storage_account))) {
            _context2.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_account)));
        case 26:
          if (!(params.azure_files_storage_dns_suffix && !(0, _utils.isString)(params.azure_files_storage_dns_suffix))) {
            _context2.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_dns_suffix)));
        case 27:
          if (!(params.azure_files_storage_share_name && !(0, _utils.isString)(params.azure_files_storage_share_name))) {
            _context2.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_share_name must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_share_name)));
        case 28:
          if (!(params.backblaze_b2_bucket && !(0, _utils.isString)(params.backblaze_b2_bucket))) {
            _context2.next = 29;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_bucket)));
        case 29:
          if (!(params.backblaze_b2_s3_endpoint && !(0, _utils.isString)(params.backblaze_b2_s3_endpoint))) {
            _context2.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_s3_endpoint)));
        case 30:
          if (!(params.buffer_uploads && !(0, _utils.isString)(params.buffer_uploads))) {
            _context2.next = 31;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: buffer_uploads must be of type String, received ".concat((0, _utils.getType)(params.buffer_uploads)));
        case 31:
          if (!(params.cloudflare_access_key && !(0, _utils.isString)(params.cloudflare_access_key))) {
            _context2.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_access_key)));
        case 32:
          if (!(params.cloudflare_bucket && !(0, _utils.isString)(params.cloudflare_bucket))) {
            _context2.next = 33;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_bucket must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_bucket)));
        case 33:
          if (!(params.cloudflare_endpoint && !(0, _utils.isString)(params.cloudflare_endpoint))) {
            _context2.next = 34;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_endpoint must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_endpoint)));
        case 34:
          if (!(params.filebase_access_key && !(0, _utils.isString)(params.filebase_access_key))) {
            _context2.next = 35;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_access_key)));
        case 35:
          if (!(params.filebase_bucket && !(0, _utils.isString)(params.filebase_bucket))) {
            _context2.next = 36;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_bucket must be of type String, received ".concat((0, _utils.getType)(params.filebase_bucket)));
        case 36:
          if (!(params.files_agent_permission_set && !(0, _utils.isString)(params.files_agent_permission_set))) {
            _context2.next = 37;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_permission_set must be of type String, received ".concat((0, _utils.getType)(params.files_agent_permission_set)));
        case 37:
          if (!(params.files_agent_root && !(0, _utils.isString)(params.files_agent_root))) {
            _context2.next = 38;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_root must be of type String, received ".concat((0, _utils.getType)(params.files_agent_root)));
        case 38:
          if (!(params.files_agent_version && !(0, _utils.isString)(params.files_agent_version))) {
            _context2.next = 39;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_version must be of type String, received ".concat((0, _utils.getType)(params.files_agent_version)));
        case 39:
          if (!(params.google_cloud_storage_bucket && !(0, _utils.isString)(params.google_cloud_storage_bucket))) {
            _context2.next = 40;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_bucket)));
        case 40:
          if (!(params.google_cloud_storage_project_id && !(0, _utils.isString)(params.google_cloud_storage_project_id))) {
            _context2.next = 41;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_project_id)));
        case 41:
          if (!(params.google_cloud_storage_s3_compatible_access_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_access_key))) {
            _context2.next = 42;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_access_key)));
        case 42:
          if (!(params.hostname && !(0, _utils.isString)(params.hostname))) {
            _context2.next = 43;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(params.hostname)));
        case 43:
          if (!(params.linode_access_key && !(0, _utils.isString)(params.linode_access_key))) {
            _context2.next = 44;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params.linode_access_key)));
        case 44:
          if (!(params.linode_bucket && !(0, _utils.isString)(params.linode_bucket))) {
            _context2.next = 45;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_bucket must be of type String, received ".concat((0, _utils.getType)(params.linode_bucket)));
        case 45:
          if (!(params.linode_region && !(0, _utils.isString)(params.linode_region))) {
            _context2.next = 46;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_region must be of type String, received ".concat((0, _utils.getType)(params.linode_region)));
        case 46:
          if (!(params.max_connections && !(0, _utils.isInt)(params.max_connections))) {
            _context2.next = 47;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(params.max_connections)));
        case 47:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context2.next = 48;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 48:
          if (!(params.one_drive_account_type && !(0, _utils.isString)(params.one_drive_account_type))) {
            _context2.next = 49;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(params.one_drive_account_type)));
        case 49:
          if (!(params.port && !(0, _utils.isInt)(params.port))) {
            _context2.next = 50;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(params.port)));
        case 50:
          if (!(params.s3_bucket && !(0, _utils.isString)(params.s3_bucket))) {
            _context2.next = 51;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_bucket)));
        case 51:
          if (!(params.s3_compatible_access_key && !(0, _utils.isString)(params.s3_compatible_access_key))) {
            _context2.next = 52;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_access_key)));
        case 52:
          if (!(params.s3_compatible_bucket && !(0, _utils.isString)(params.s3_compatible_bucket))) {
            _context2.next = 53;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_bucket)));
        case 53:
          if (!(params.s3_compatible_endpoint && !(0, _utils.isString)(params.s3_compatible_endpoint))) {
            _context2.next = 54;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint)));
        case 54:
          if (!(params.s3_compatible_region && !(0, _utils.isString)(params.s3_compatible_region))) {
            _context2.next = 55;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_region must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_region)));
        case 55:
          if (!(params.s3_region && !(0, _utils.isString)(params.s3_region))) {
            _context2.next = 56;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(params.s3_region)));
        case 56:
          if (!(params.server_certificate && !(0, _utils.isString)(params.server_certificate))) {
            _context2.next = 57;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params.server_certificate)));
        case 57:
          if (!(params.server_host_key && !(0, _utils.isString)(params.server_host_key))) {
            _context2.next = 58;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(params.server_host_key)));
        case 58:
          if (!(params.server_type && !(0, _utils.isString)(params.server_type))) {
            _context2.next = 59;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params.server_type)));
        case 59:
          if (!(params.ssl && !(0, _utils.isString)(params.ssl))) {
            _context2.next = 60;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(params.ssl)));
        case 60:
          if (!(params.username && !(0, _utils.isString)(params.username))) {
            _context2.next = 61;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
        case 61:
          if (!(params.wasabi_access_key && !(0, _utils.isString)(params.wasabi_access_key))) {
            _context2.next = 62;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_access_key)));
        case 62:
          if (!(params.wasabi_bucket && !(0, _utils.isString)(params.wasabi_bucket))) {
            _context2.next = 63;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(params.wasabi_bucket)));
        case 63:
          if (!(params.wasabi_region && !(0, _utils.isString)(params.wasabi_region))) {
            _context2.next = 64;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(params.wasabi_region)));
        case 64:
          if (params.id) {
            _context2.next = 66;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 65;
            break;
          }
          params.id = _this.id;
          _context2.next = 66;
          break;
        case 65:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 66:
          _context2.next = 67;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 67:
          response = _context2.sent;
          return _context2.abrupt("return", new RemoteServer(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 68:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
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
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!_this.attributes.id) {
            _context4.next = 2;
            break;
          }
          _context4.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context4.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context4.abrupt("return", true);
        case 2:
          _context4.next = 3;
          return RemoteServer.create(_this.attributes, _this.options);
        case 3:
          newObject = _context4.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context4.abrupt("return", true);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  Object.entries(attributes).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_RemoteServer = RemoteServer;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`, `server_type`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name`, `server_type`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`. Valid field combinations are `[ server_type, name ]`, `[ backblaze_b2_bucket, name ]`, `[ google_cloud_storage_bucket, name ]`, `[ wasabi_bucket, name ]`, `[ s3_bucket, name ]`, `[ azure_blob_storage_container, name ]`, `[ azure_files_storage_share_name, name ]`, `[ s3_compatible_bucket, name ]`, `[ filebase_bucket, name ]`, `[ cloudflare_bucket, name ]` or `[ linode_bucket, name ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`. Valid field combinations are `[ backblaze_b2_bucket, name ]`, `[ google_cloud_storage_bucket, name ]`, `[ wasabi_bucket, name ]`, `[ s3_bucket, name ]`, `[ azure_blob_storage_container, name ]`, `[ azure_files_storage_share_name, name ]`, `[ s3_compatible_bucket, name ]`, `[ filebase_bucket, name ]`, `[ cloudflare_bucket, name ]` or `[ linode_bucket, name ]`.
(0, _defineProperty2.default)(RemoteServer, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _response$data;
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context5.next = 3;
        return _Api.default.sendRequest('/remote_servers', 'GET', params, options);
      case 3:
        response = _context5.sent;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _RemoteServer(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(RemoteServer, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _RemoteServer.list(params, options);
});
// Parameters:
//   id (required) - int64 - Remote Server ID.
(0, _defineProperty2.default)(RemoteServer, "find", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(id) {
    var params,
      options,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context6.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context6.next = 4;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _RemoteServer(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x) {
    return _ref8.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(RemoteServer, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _RemoteServer.find(id, params, options);
});
// Parameters:
//   id (required) - int64 - Remote Server ID.
(0, _defineProperty2.default)(RemoteServer, "findConfigurationFile", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(id) {
    var params,
      options,
      response,
      RemoteServerConfigurationFile,
      _args7 = arguments;
    return _regenerator.default.wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
          options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context7.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context7.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context7.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context7.next = 4;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id), "/configuration_file"), 'GET', params, options);
        case 4:
          response = _context7.sent;
          RemoteServerConfigurationFile = require('./RemoteServerConfigurationFile.js').default;
          return _context7.abrupt("return", new RemoteServerConfigurationFile(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x2) {
    return _ref9.apply(this, arguments);
  };
}());
// Parameters:
//   password - string - Password, if needed.
//   private_key - string - Private key, if needed.
//   private_key_passphrase - string - Passphrase for private key if needed.
//   reset_authentication - boolean - Reset authenticated account?
//   ssl_certificate - string - SSL client certificate.
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
//   aws_access_key - string - AWS Access Key.
//   azure_blob_storage_account - string - Azure Blob Storage: Account name
//   azure_blob_storage_container - string - Azure Blob Storage: Container name
//   azure_blob_storage_dns_suffix - string - Azure Blob Storage: Custom DNS suffix
//   azure_blob_storage_hierarchical_namespace - boolean - Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled?
//   azure_files_storage_account - string - Azure Files: Storage Account name
//   azure_files_storage_dns_suffix - string - Azure Files: Custom DNS suffix
//   azure_files_storage_share_name - string - Azure Files:  Storage Share name
//   backblaze_b2_bucket - string - Backblaze B2 Cloud Storage: Bucket name
//   backblaze_b2_s3_endpoint - string - Backblaze B2 Cloud Storage: S3 Endpoint
//   buffer_uploads - string - If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote server. This can improve performance in certain access patterns, such as high-latency connections.  It will cause data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to be a benefit in a given situation.
//   cloudflare_access_key - string - Cloudflare: Access Key.
//   cloudflare_bucket - string - Cloudflare: Bucket name
//   cloudflare_endpoint - string - Cloudflare: endpoint
//   dropbox_teams - boolean - Dropbox: If true, list Team folders in root?
//   enable_dedicated_ips - boolean - `true` if remote server only accepts connections from dedicated IPs
//   filebase_access_key - string - Filebase: Access Key.
//   filebase_bucket - string - Filebase: Bucket name
//   files_agent_permission_set - string - Local permissions for files agent. read_only, write_only, or read_write
//   files_agent_root - string - Agent local root path
//   files_agent_version - string - Files Agent version
//   google_cloud_storage_bucket - string - Google Cloud Storage: Bucket Name
//   google_cloud_storage_project_id - string - Google Cloud Storage: Project ID
//   google_cloud_storage_s3_compatible_access_key - string - Google Cloud Storage: S3-compatible Access Key.
//   hostname - string - Hostname or IP address
//   linode_access_key - string - Linode: Access Key
//   linode_bucket - string - Linode: Bucket name
//   linode_region - string - Linode: region
//   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
//   name - string - Internal name for your reference
//   one_drive_account_type - string - OneDrive: Either personal or business_other account types
//   pin_to_site_region - boolean - If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a site-wide setting which will force it to true.
//   port - int64 - Port for remote server.  Not needed for S3.
//   s3_bucket - string - S3 bucket name
//   s3_compatible_access_key - string - S3-compatible: Access Key
//   s3_compatible_bucket - string - S3-compatible: Bucket name
//   s3_compatible_endpoint - string - S3-compatible: endpoint
//   s3_compatible_region - string - S3-compatible: region
//   s3_region - string - S3 region
//   server_certificate - string - Remote server certificate
//   server_host_key - string - Remote server SSH Host Key. If provided, we will require that the server host key matches the provided key. Uses OpenSSH format similar to what would go into ~/.ssh/known_hosts
//   server_type - string - Remote server type.
//   ssl - string - Should we require SSL?
//   username - string - Remote server username.  Not needed for S3 buckets.
//   wasabi_access_key - string - Wasabi: Access Key.
//   wasabi_bucket - string - Wasabi: Bucket name
//   wasabi_region - string - Wasabi: Region
(0, _defineProperty2.default)(RemoteServer, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8() {
  var params,
    options,
    response,
    _args8 = arguments;
  return _regenerator.default.wrap(function (_context8) {
    while (1) switch (_context8.prev = _context8.next) {
      case 0:
        params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
        options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
        if (!(params.password && !(0, _utils.isString)(params.password))) {
          _context8.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 1:
        if (!(params.private_key && !(0, _utils.isString)(params.private_key))) {
          _context8.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 2:
        if (!(params.private_key_passphrase && !(0, _utils.isString)(params.private_key_passphrase))) {
          _context8.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params.private_key_passphrase)));
      case 3:
        if (!(params.ssl_certificate && !(0, _utils.isString)(params.ssl_certificate))) {
          _context8.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(params.ssl_certificate)));
      case 4:
        if (!(params.aws_secret_key && !(0, _utils.isString)(params.aws_secret_key))) {
          _context8.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params.aws_secret_key)));
      case 5:
        if (!(params.azure_blob_storage_access_key && !(0, _utils.isString)(params.azure_blob_storage_access_key))) {
          _context8.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_access_key)));
      case 6:
        if (!(params.azure_blob_storage_sas_token && !(0, _utils.isString)(params.azure_blob_storage_sas_token))) {
          _context8.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_sas_token)));
      case 7:
        if (!(params.azure_files_storage_access_key && !(0, _utils.isString)(params.azure_files_storage_access_key))) {
          _context8.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_access_key)));
      case 8:
        if (!(params.azure_files_storage_sas_token && !(0, _utils.isString)(params.azure_files_storage_sas_token))) {
          _context8.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_sas_token)));
      case 9:
        if (!(params.backblaze_b2_application_key && !(0, _utils.isString)(params.backblaze_b2_application_key))) {
          _context8.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_application_key)));
      case 10:
        if (!(params.backblaze_b2_key_id && !(0, _utils.isString)(params.backblaze_b2_key_id))) {
          _context8.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_key_id)));
      case 11:
        if (!(params.cloudflare_secret_key && !(0, _utils.isString)(params.cloudflare_secret_key))) {
          _context8.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_secret_key)));
      case 12:
        if (!(params.filebase_secret_key && !(0, _utils.isString)(params.filebase_secret_key))) {
          _context8.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_secret_key)));
      case 13:
        if (!(params.google_cloud_storage_credentials_json && !(0, _utils.isString)(params.google_cloud_storage_credentials_json))) {
          _context8.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_credentials_json)));
      case 14:
        if (!(params.google_cloud_storage_s3_compatible_secret_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_secret_key))) {
          _context8.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_secret_key)));
      case 15:
        if (!(params.linode_secret_key && !(0, _utils.isString)(params.linode_secret_key))) {
          _context8.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params.linode_secret_key)));
      case 16:
        if (!(params.s3_compatible_secret_key && !(0, _utils.isString)(params.s3_compatible_secret_key))) {
          _context8.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_secret_key)));
      case 17:
        if (!(params.wasabi_secret_key && !(0, _utils.isString)(params.wasabi_secret_key))) {
          _context8.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_secret_key)));
      case 18:
        if (!(params.aws_access_key && !(0, _utils.isString)(params.aws_access_key))) {
          _context8.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params.aws_access_key)));
      case 19:
        if (!(params.azure_blob_storage_account && !(0, _utils.isString)(params.azure_blob_storage_account))) {
          _context8.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_account)));
      case 20:
        if (!(params.azure_blob_storage_container && !(0, _utils.isString)(params.azure_blob_storage_container))) {
          _context8.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_container)));
      case 21:
        if (!(params.azure_blob_storage_dns_suffix && !(0, _utils.isString)(params.azure_blob_storage_dns_suffix))) {
          _context8.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_dns_suffix)));
      case 22:
        if (!(params.azure_files_storage_account && !(0, _utils.isString)(params.azure_files_storage_account))) {
          _context8.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_account)));
      case 23:
        if (!(params.azure_files_storage_dns_suffix && !(0, _utils.isString)(params.azure_files_storage_dns_suffix))) {
          _context8.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_dns_suffix)));
      case 24:
        if (!(params.azure_files_storage_share_name && !(0, _utils.isString)(params.azure_files_storage_share_name))) {
          _context8.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_share_name must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_share_name)));
      case 25:
        if (!(params.backblaze_b2_bucket && !(0, _utils.isString)(params.backblaze_b2_bucket))) {
          _context8.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_bucket)));
      case 26:
        if (!(params.backblaze_b2_s3_endpoint && !(0, _utils.isString)(params.backblaze_b2_s3_endpoint))) {
          _context8.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_s3_endpoint)));
      case 27:
        if (!(params.buffer_uploads && !(0, _utils.isString)(params.buffer_uploads))) {
          _context8.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: buffer_uploads must be of type String, received ".concat((0, _utils.getType)(params.buffer_uploads)));
      case 28:
        if (!(params.cloudflare_access_key && !(0, _utils.isString)(params.cloudflare_access_key))) {
          _context8.next = 29;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_access_key)));
      case 29:
        if (!(params.cloudflare_bucket && !(0, _utils.isString)(params.cloudflare_bucket))) {
          _context8.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_bucket must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_bucket)));
      case 30:
        if (!(params.cloudflare_endpoint && !(0, _utils.isString)(params.cloudflare_endpoint))) {
          _context8.next = 31;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_endpoint must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_endpoint)));
      case 31:
        if (!(params.filebase_access_key && !(0, _utils.isString)(params.filebase_access_key))) {
          _context8.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_access_key)));
      case 32:
        if (!(params.filebase_bucket && !(0, _utils.isString)(params.filebase_bucket))) {
          _context8.next = 33;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_bucket must be of type String, received ".concat((0, _utils.getType)(params.filebase_bucket)));
      case 33:
        if (!(params.files_agent_permission_set && !(0, _utils.isString)(params.files_agent_permission_set))) {
          _context8.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_permission_set must be of type String, received ".concat((0, _utils.getType)(params.files_agent_permission_set)));
      case 34:
        if (!(params.files_agent_root && !(0, _utils.isString)(params.files_agent_root))) {
          _context8.next = 35;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_root must be of type String, received ".concat((0, _utils.getType)(params.files_agent_root)));
      case 35:
        if (!(params.files_agent_version && !(0, _utils.isString)(params.files_agent_version))) {
          _context8.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_version must be of type String, received ".concat((0, _utils.getType)(params.files_agent_version)));
      case 36:
        if (!(params.google_cloud_storage_bucket && !(0, _utils.isString)(params.google_cloud_storage_bucket))) {
          _context8.next = 37;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_bucket)));
      case 37:
        if (!(params.google_cloud_storage_project_id && !(0, _utils.isString)(params.google_cloud_storage_project_id))) {
          _context8.next = 38;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_project_id)));
      case 38:
        if (!(params.google_cloud_storage_s3_compatible_access_key && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_access_key))) {
          _context8.next = 39;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_access_key)));
      case 39:
        if (!(params.hostname && !(0, _utils.isString)(params.hostname))) {
          _context8.next = 40;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(params.hostname)));
      case 40:
        if (!(params.linode_access_key && !(0, _utils.isString)(params.linode_access_key))) {
          _context8.next = 41;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params.linode_access_key)));
      case 41:
        if (!(params.linode_bucket && !(0, _utils.isString)(params.linode_bucket))) {
          _context8.next = 42;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_bucket must be of type String, received ".concat((0, _utils.getType)(params.linode_bucket)));
      case 42:
        if (!(params.linode_region && !(0, _utils.isString)(params.linode_region))) {
          _context8.next = 43;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_region must be of type String, received ".concat((0, _utils.getType)(params.linode_region)));
      case 43:
        if (!(params.max_connections && !(0, _utils.isInt)(params.max_connections))) {
          _context8.next = 44;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(params.max_connections)));
      case 44:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context8.next = 45;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 45:
        if (!(params.one_drive_account_type && !(0, _utils.isString)(params.one_drive_account_type))) {
          _context8.next = 46;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(params.one_drive_account_type)));
      case 46:
        if (!(params.port && !(0, _utils.isInt)(params.port))) {
          _context8.next = 47;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(params.port)));
      case 47:
        if (!(params.s3_bucket && !(0, _utils.isString)(params.s3_bucket))) {
          _context8.next = 48;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_bucket)));
      case 48:
        if (!(params.s3_compatible_access_key && !(0, _utils.isString)(params.s3_compatible_access_key))) {
          _context8.next = 49;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_access_key)));
      case 49:
        if (!(params.s3_compatible_bucket && !(0, _utils.isString)(params.s3_compatible_bucket))) {
          _context8.next = 50;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_bucket)));
      case 50:
        if (!(params.s3_compatible_endpoint && !(0, _utils.isString)(params.s3_compatible_endpoint))) {
          _context8.next = 51;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint)));
      case 51:
        if (!(params.s3_compatible_region && !(0, _utils.isString)(params.s3_compatible_region))) {
          _context8.next = 52;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_region must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_region)));
      case 52:
        if (!(params.s3_region && !(0, _utils.isString)(params.s3_region))) {
          _context8.next = 53;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(params.s3_region)));
      case 53:
        if (!(params.server_certificate && !(0, _utils.isString)(params.server_certificate))) {
          _context8.next = 54;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params.server_certificate)));
      case 54:
        if (!(params.server_host_key && !(0, _utils.isString)(params.server_host_key))) {
          _context8.next = 55;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(params.server_host_key)));
      case 55:
        if (!(params.server_type && !(0, _utils.isString)(params.server_type))) {
          _context8.next = 56;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params.server_type)));
      case 56:
        if (!(params.ssl && !(0, _utils.isString)(params.ssl))) {
          _context8.next = 57;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(params.ssl)));
      case 57:
        if (!(params.username && !(0, _utils.isString)(params.username))) {
          _context8.next = 58;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
      case 58:
        if (!(params.wasabi_access_key && !(0, _utils.isString)(params.wasabi_access_key))) {
          _context8.next = 59;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_access_key)));
      case 59:
        if (!(params.wasabi_bucket && !(0, _utils.isString)(params.wasabi_bucket))) {
          _context8.next = 60;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(params.wasabi_bucket)));
      case 60:
        if (!(params.wasabi_region && !(0, _utils.isString)(params.wasabi_region))) {
          _context8.next = 61;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(params.wasabi_region)));
      case 61:
        _context8.next = 62;
        return _Api.default.sendRequest('/remote_servers', 'POST', params, options);
      case 62:
        response = _context8.sent;
        return _context8.abrupt("return", new _RemoteServer(response === null || response === void 0 ? void 0 : response.data, options));
      case 63:
      case "end":
        return _context8.stop();
    }
  }, _callee8);
})));
var _default = exports.default = RemoteServer;
module.exports = RemoteServer;
module.exports.default = RemoteServer;