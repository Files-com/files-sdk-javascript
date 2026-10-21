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
var _RemoteServer;
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
  // int64 # Remote Server ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // boolean # If true, this Remote Server is disabled. Updating it clears this flag, except for retired Agent v1 records, which remain disabled.
  (0, _defineProperty2.default)(this, "getDisabled", function () {
    return _this.attributes.disabled;
  });
  (0, _defineProperty2.default)(this, "setDisabled", function (value) {
    _this.attributes.disabled = value;
    exposeAttributes(_this, ['disabled']);
  });
  // string # Type of authentication method to use
  (0, _defineProperty2.default)(this, "getAuthenticationMethod", function () {
    return _this.attributes.authentication_method;
  });
  (0, _defineProperty2.default)(this, "setAuthenticationMethod", function (value) {
    _this.attributes.authentication_method = value;
    exposeAttributes(_this, ['authentication_method']);
  });
  // string # Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not change the running Agent.
  (0, _defineProperty2.default)(this, "getHostname", function () {
    return _this.attributes.hostname;
  });
  (0, _defineProperty2.default)(this, "setHostname", function (value) {
    _this.attributes.hostname = value;
    exposeAttributes(_this, ['hostname']);
  });
  // string # Initial home folder on remote server
  (0, _defineProperty2.default)(this, "getRemoteHomePath", function () {
    return _this.attributes.remote_home_path;
  });
  (0, _defineProperty2.default)(this, "setRemoteHomePath", function (value) {
    _this.attributes.remote_home_path = value;
    exposeAttributes(_this, ['remote_home_path']);
  });
  // string # Upload staging path.  Applies to SFTP only.  If a path is provided here, files will first be uploaded to this path on the remote folder and the moved into the final correct path via an SFTP move command.  This is required by some remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
  (0, _defineProperty2.default)(this, "getUploadStagingPath", function () {
    return _this.attributes.upload_staging_path;
  });
  (0, _defineProperty2.default)(this, "setUploadStagingPath", function (value) {
    _this.attributes.upload_staging_path = value;
    exposeAttributes(_this, ['upload_staging_path']);
  });
  // boolean # Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to the user's home directory.
  (0, _defineProperty2.default)(this, "getAllowRelativePaths", function () {
    return _this.attributes.allow_relative_paths;
  });
  (0, _defineProperty2.default)(this, "setAllowRelativePaths", function (value) {
    _this.attributes.allow_relative_paths = value;
    exposeAttributes(_this, ['allow_relative_paths']);
  });
  // string # Internal name for your reference
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
    exposeAttributes(_this, ['name']);
  });
  // string # Internal description for your reference
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
    exposeAttributes(_this, ['description']);
  });
  // int64 # Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not change the running Agent.
  (0, _defineProperty2.default)(this, "getPort", function () {
    return _this.attributes.port;
  });
  (0, _defineProperty2.default)(this, "setPort", function (value) {
    _this.attributes.port = value;
    exposeAttributes(_this, ['port']);
  });
  // string # If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote server. This can improve performance in certain access patterns, such as high-latency connections.  It will cause data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to be a benefit in a given situation.
  (0, _defineProperty2.default)(this, "getBufferUploads", function () {
    return _this.attributes.buffer_uploads;
  });
  (0, _defineProperty2.default)(this, "setBufferUploads", function (value) {
    _this.attributes.buffer_uploads = value;
    exposeAttributes(_this, ['buffer_uploads']);
  });
  // int64 # Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  (0, _defineProperty2.default)(this, "getMaxConnections", function () {
    return _this.attributes.max_connections;
  });
  (0, _defineProperty2.default)(this, "setMaxConnections", function (value) {
    _this.attributes.max_connections = value;
    exposeAttributes(_this, ['max_connections']);
  });
  // boolean # If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a site-wide setting which will force it to true.
  (0, _defineProperty2.default)(this, "getPinToSiteRegion", function () {
    return _this.attributes.pin_to_site_region;
  });
  (0, _defineProperty2.default)(this, "setPinToSiteRegion", function (value) {
    _this.attributes.pin_to_site_region = value;
    exposeAttributes(_this, ['pin_to_site_region']);
  });
  // string # If set, all communications with this remote server are made through the provided region.
  (0, _defineProperty2.default)(this, "getPinnedRegion", function () {
    return _this.attributes.pinned_region;
  });
  (0, _defineProperty2.default)(this, "setPinnedRegion", function (value) {
    _this.attributes.pinned_region = value;
    exposeAttributes(_this, ['pinned_region']);
  });
  // int64 # ID of Remote Server Credential, if applicable.
  (0, _defineProperty2.default)(this, "getRemoteServerCredentialId", function () {
    return _this.attributes.remote_server_credential_id;
  });
  (0, _defineProperty2.default)(this, "setRemoteServerCredentialId", function (value) {
    _this.attributes.remote_server_credential_id = value;
    exposeAttributes(_this, ['remote_server_credential_id']);
  });
  // string # S3 bucket name
  (0, _defineProperty2.default)(this, "getS3Bucket", function () {
    return _this.attributes.s3_bucket;
  });
  (0, _defineProperty2.default)(this, "setS3Bucket", function (value) {
    _this.attributes.s3_bucket = value;
    exposeAttributes(_this, ['s3_bucket']);
  });
  // string # S3 region
  (0, _defineProperty2.default)(this, "getS3Region", function () {
    return _this.attributes.s3_region;
  });
  (0, _defineProperty2.default)(this, "setS3Region", function (value) {
    _this.attributes.s3_region = value;
    exposeAttributes(_this, ['s3_region']);
  });
  // string # ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket requires a specific key.
  (0, _defineProperty2.default)(this, "getS3KmsKeyId", function () {
    return _this.attributes.s3_kms_key_id;
  });
  (0, _defineProperty2.default)(this, "setS3KmsKeyId", function (value) {
    _this.attributes.s3_kms_key_id = value;
    exposeAttributes(_this, ['s3_kms_key_id']);
  });
  // string # AWS Access Key.
  (0, _defineProperty2.default)(this, "getAwsAccessKey", function () {
    return _this.attributes.aws_access_key;
  });
  (0, _defineProperty2.default)(this, "setAwsAccessKey", function (value) {
    _this.attributes.aws_access_key = value;
    exposeAttributes(_this, ['aws_access_key']);
  });
  // string # AWS IAM Role ARN for AssumeRole authentication.
  (0, _defineProperty2.default)(this, "getS3AssumeRoleArn", function () {
    return _this.attributes.s3_assume_role_arn;
  });
  (0, _defineProperty2.default)(this, "setS3AssumeRoleArn", function (value) {
    _this.attributes.s3_assume_role_arn = value;
    exposeAttributes(_this, ['s3_assume_role_arn']);
  });
  // int64 # Session duration in seconds for AssumeRole authentication (900-43200).
  (0, _defineProperty2.default)(this, "getS3AssumeRoleDurationSeconds", function () {
    return _this.attributes.s3_assume_role_duration_seconds;
  });
  (0, _defineProperty2.default)(this, "setS3AssumeRoleDurationSeconds", function (value) {
    _this.attributes.s3_assume_role_duration_seconds = value;
    exposeAttributes(_this, ['s3_assume_role_duration_seconds']);
  });
  // string # External ID for AssumeRole authentication.
  (0, _defineProperty2.default)(this, "getS3AssumeRoleExternalId", function () {
    return _this.attributes.s3_assume_role_external_id;
  });
  (0, _defineProperty2.default)(this, "setS3AssumeRoleExternalId", function (value) {
    _this.attributes.s3_assume_role_external_id = value;
    exposeAttributes(_this, ['s3_assume_role_external_id']);
  });
  // string # Remote server certificate
  (0, _defineProperty2.default)(this, "getServerCertificate", function () {
    return _this.attributes.server_certificate;
  });
  (0, _defineProperty2.default)(this, "setServerCertificate", function (value) {
    _this.attributes.server_certificate = value;
    exposeAttributes(_this, ['server_certificate']);
  });
  // string # Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key, preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged. Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone does not end the pin. Update `server_host_key` to replace the pin.
  (0, _defineProperty2.default)(this, "getServerHostKey", function () {
    return _this.attributes.server_host_key;
  });
  (0, _defineProperty2.default)(this, "setServerHostKey", function (value) {
    _this.attributes.server_host_key = value;
    exposeAttributes(_this, ['server_host_key']);
  });
  // string # Remote server type.
  (0, _defineProperty2.default)(this, "getServerType", function () {
    return _this.attributes.server_type;
  });
  (0, _defineProperty2.default)(this, "setServerType", function (value) {
    _this.attributes.server_type = value;
    exposeAttributes(_this, ['server_type']);
  });
  // int64 # Workspace ID (0 for default workspace)
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // string # Should we require SSL?
  (0, _defineProperty2.default)(this, "getSsl", function () {
    return _this.attributes.ssl;
  });
  (0, _defineProperty2.default)(this, "setSsl", function (value) {
    _this.attributes.ssl = value;
    exposeAttributes(_this, ['ssl']);
  });
  // string # Remote server username.
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
    exposeAttributes(_this, ['username']);
  });
  // string # Google Cloud Storage: Bucket Name
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageBucket", function () {
    return _this.attributes.google_cloud_storage_bucket;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageBucket", function (value) {
    _this.attributes.google_cloud_storage_bucket = value;
    exposeAttributes(_this, ['google_cloud_storage_bucket']);
  });
  // string # Google Cloud Storage: Authentication method. Can be json, hmac, or oauth.
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageAuthenticationMethod", function () {
    return _this.attributes.google_cloud_storage_authentication_method;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageAuthenticationMethod", function (value) {
    _this.attributes.google_cloud_storage_authentication_method = value;
    exposeAttributes(_this, ['google_cloud_storage_authentication_method']);
  });
  // string # Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or https://www.googleapis.com/auth/devstorage.read_write.
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageOauthScope", function () {
    return _this.attributes.google_cloud_storage_oauth_scope;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageOauthScope", function (value) {
    _this.attributes.google_cloud_storage_oauth_scope = value;
    exposeAttributes(_this, ['google_cloud_storage_oauth_scope']);
  });
  // string # Google Cloud Storage: Project ID
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageProjectId", function () {
    return _this.attributes.google_cloud_storage_project_id;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageProjectId", function (value) {
    _this.attributes.google_cloud_storage_project_id = value;
    exposeAttributes(_this, ['google_cloud_storage_project_id']);
  });
  // string # Google Cloud Storage: S3-compatible Access Key.
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageS3CompatibleAccessKey", function () {
    return _this.attributes.google_cloud_storage_s3_compatible_access_key;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageS3CompatibleAccessKey", function (value) {
    _this.attributes.google_cloud_storage_s3_compatible_access_key = value;
    exposeAttributes(_this, ['google_cloud_storage_s3_compatible_access_key']);
  });
  // string # Backblaze B2 Cloud Storage: S3 Endpoint
  (0, _defineProperty2.default)(this, "getBackblazeB2S3Endpoint", function () {
    return _this.attributes.backblaze_b2_s3_endpoint;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2S3Endpoint", function (value) {
    _this.attributes.backblaze_b2_s3_endpoint = value;
    exposeAttributes(_this, ['backblaze_b2_s3_endpoint']);
  });
  // string # Backblaze B2 Cloud Storage: Bucket name
  (0, _defineProperty2.default)(this, "getBackblazeB2Bucket", function () {
    return _this.attributes.backblaze_b2_bucket;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2Bucket", function (value) {
    _this.attributes.backblaze_b2_bucket = value;
    exposeAttributes(_this, ['backblaze_b2_bucket']);
  });
  // string # Wasabi: Bucket name
  (0, _defineProperty2.default)(this, "getWasabiBucket", function () {
    return _this.attributes.wasabi_bucket;
  });
  (0, _defineProperty2.default)(this, "setWasabiBucket", function (value) {
    _this.attributes.wasabi_bucket = value;
    exposeAttributes(_this, ['wasabi_bucket']);
  });
  // string # Wasabi: Region
  (0, _defineProperty2.default)(this, "getWasabiRegion", function () {
    return _this.attributes.wasabi_region;
  });
  (0, _defineProperty2.default)(this, "setWasabiRegion", function (value) {
    _this.attributes.wasabi_region = value;
    exposeAttributes(_this, ['wasabi_region']);
  });
  // string # Wasabi: Access Key.
  (0, _defineProperty2.default)(this, "getWasabiAccessKey", function () {
    return _this.attributes.wasabi_access_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiAccessKey", function (value) {
    _this.attributes.wasabi_access_key = value;
    exposeAttributes(_this, ['wasabi_access_key']);
  });
  // string # Either `in_setup` or `complete`
  (0, _defineProperty2.default)(this, "getAuthStatus", function () {
    return _this.attributes.auth_status;
  });
  (0, _defineProperty2.default)(this, "setAuthStatus", function (value) {
    _this.attributes.auth_status = value;
    exposeAttributes(_this, ['auth_status']);
  });
  // string # Describes the authorized account
  (0, _defineProperty2.default)(this, "getAuthAccountName", function () {
    return _this.attributes.auth_account_name;
  });
  (0, _defineProperty2.default)(this, "setAuthAccountName", function (value) {
    _this.attributes.auth_account_name = value;
    exposeAttributes(_this, ['auth_account_name']);
  });
  // string # OneDrive: Either personal or business_other account types
  (0, _defineProperty2.default)(this, "getOneDriveAccountType", function () {
    return _this.attributes.one_drive_account_type;
  });
  (0, _defineProperty2.default)(this, "setOneDriveAccountType", function (value) {
    _this.attributes.one_drive_account_type = value;
    exposeAttributes(_this, ['one_drive_account_type']);
  });
  // string # SharePoint: Microsoft Entra tenant ID for app-only authentication.
  (0, _defineProperty2.default)(this, "getSharepointTenantId", function () {
    return _this.attributes.sharepoint_tenant_id;
  });
  (0, _defineProperty2.default)(this, "setSharepointTenantId", function (value) {
    _this.attributes.sharepoint_tenant_id = value;
    exposeAttributes(_this, ['sharepoint_tenant_id']);
  });
  // string # SharePoint: Microsoft Entra application client ID for app-only authentication.
  (0, _defineProperty2.default)(this, "getSharepointClientId", function () {
    return _this.attributes.sharepoint_client_id;
  });
  (0, _defineProperty2.default)(this, "setSharepointClientId", function (value) {
    _this.attributes.sharepoint_client_id = value;
    exposeAttributes(_this, ['sharepoint_client_id']);
  });
  // boolean # SharePoint: If true, this remote server uses Microsoft Entra app-only authentication.
  (0, _defineProperty2.default)(this, "getSharepointAppAuthentication", function () {
    return _this.attributes.sharepoint_app_authentication;
  });
  (0, _defineProperty2.default)(this, "setSharepointAppAuthentication", function (value) {
    _this.attributes.sharepoint_app_authentication = value;
    exposeAttributes(_this, ['sharepoint_app_authentication']);
  });
  // string # SharePoint: App-only credential type. Either secret or certificate.
  (0, _defineProperty2.default)(this, "getSharepointAppCredentialType", function () {
    return _this.attributes.sharepoint_app_credential_type;
  });
  (0, _defineProperty2.default)(this, "setSharepointAppCredentialType", function (value) {
    _this.attributes.sharepoint_app_credential_type = value;
    exposeAttributes(_this, ['sharepoint_app_credential_type']);
  });
  // string # SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites.
  (0, _defineProperty2.default)(this, "getSharepointSiteUrl", function () {
    return _this.attributes.sharepoint_site_url;
  });
  (0, _defineProperty2.default)(this, "setSharepointSiteUrl", function (value) {
    _this.attributes.sharepoint_site_url = value;
    exposeAttributes(_this, ['sharepoint_site_url']);
  });
  // string # Azure Blob Storage: Account name
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccount", function () {
    return _this.attributes.azure_blob_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccount", function (value) {
    _this.attributes.azure_blob_storage_account = value;
    exposeAttributes(_this, ['azure_blob_storage_account']);
  });
  // string # Azure Blob Storage: Container name
  (0, _defineProperty2.default)(this, "getAzureBlobStorageContainer", function () {
    return _this.attributes.azure_blob_storage_container;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageContainer", function (value) {
    _this.attributes.azure_blob_storage_container = value;
    exposeAttributes(_this, ['azure_blob_storage_container']);
  });
  // boolean # Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled?
  (0, _defineProperty2.default)(this, "getAzureBlobStorageHierarchicalNamespace", function () {
    return _this.attributes.azure_blob_storage_hierarchical_namespace;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageHierarchicalNamespace", function (value) {
    _this.attributes.azure_blob_storage_hierarchical_namespace = value;
    exposeAttributes(_this, ['azure_blob_storage_hierarchical_namespace']);
  });
  // string # Azure Blob Storage: Custom DNS suffix
  (0, _defineProperty2.default)(this, "getAzureBlobStorageDnsSuffix", function () {
    return _this.attributes.azure_blob_storage_dns_suffix;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageDnsSuffix", function (value) {
    _this.attributes.azure_blob_storage_dns_suffix = value;
    exposeAttributes(_this, ['azure_blob_storage_dns_suffix']);
  });
  // string # Azure Files: Storage Account name
  (0, _defineProperty2.default)(this, "getAzureFilesStorageAccount", function () {
    return _this.attributes.azure_files_storage_account;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageAccount", function (value) {
    _this.attributes.azure_files_storage_account = value;
    exposeAttributes(_this, ['azure_files_storage_account']);
  });
  // string # Azure Files:  Storage Share name
  (0, _defineProperty2.default)(this, "getAzureFilesStorageShareName", function () {
    return _this.attributes.azure_files_storage_share_name;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageShareName", function (value) {
    _this.attributes.azure_files_storage_share_name = value;
    exposeAttributes(_this, ['azure_files_storage_share_name']);
  });
  // string # Azure Files: Custom DNS suffix
  (0, _defineProperty2.default)(this, "getAzureFilesStorageDnsSuffix", function () {
    return _this.attributes.azure_files_storage_dns_suffix;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageDnsSuffix", function (value) {
    _this.attributes.azure_files_storage_dns_suffix = value;
    exposeAttributes(_this, ['azure_files_storage_dns_suffix']);
  });
  // string # S3-compatible: Bucket name
  (0, _defineProperty2.default)(this, "getS3CompatibleBucket", function () {
    return _this.attributes.s3_compatible_bucket;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleBucket", function (value) {
    _this.attributes.s3_compatible_bucket = value;
    exposeAttributes(_this, ['s3_compatible_bucket']);
  });
  // string # S3-compatible: endpoint
  (0, _defineProperty2.default)(this, "getS3CompatibleEndpoint", function () {
    return _this.attributes.s3_compatible_endpoint;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleEndpoint", function (value) {
    _this.attributes.s3_compatible_endpoint = value;
    exposeAttributes(_this, ['s3_compatible_endpoint']);
  });
  // string # S3-compatible: region
  (0, _defineProperty2.default)(this, "getS3CompatibleRegion", function () {
    return _this.attributes.s3_compatible_region;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleRegion", function (value) {
    _this.attributes.s3_compatible_region = value;
    exposeAttributes(_this, ['s3_compatible_region']);
  });
  // boolean # S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs
  (0, _defineProperty2.default)(this, "getS3CompatibleVirtualHostedStyle", function () {
    return _this.attributes.s3_compatible_virtual_hosted_style;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleVirtualHostedStyle", function (value) {
    _this.attributes.s3_compatible_virtual_hosted_style = value;
    exposeAttributes(_this, ['s3_compatible_virtual_hosted_style']);
  });
  // string # S3-compatible: Access Key
  (0, _defineProperty2.default)(this, "getS3CompatibleAccessKey", function () {
    return _this.attributes.s3_compatible_access_key;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleAccessKey", function (value) {
    _this.attributes.s3_compatible_access_key = value;
    exposeAttributes(_this, ['s3_compatible_access_key']);
  });
  // boolean # `true` if remote server only accepts connections from dedicated IPs
  (0, _defineProperty2.default)(this, "getEnableDedicatedIps", function () {
    return _this.attributes.enable_dedicated_ips;
  });
  (0, _defineProperty2.default)(this, "setEnableDedicatedIps", function (value) {
    _this.attributes.enable_dedicated_ips = value;
    exposeAttributes(_this, ['enable_dedicated_ips']);
  });
  // int64 # Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an outbound Agent. Set to null to use the site's default dedicated IPs.
  (0, _defineProperty2.default)(this, "getCustomDomainId", function () {
    return _this.attributes.custom_domain_id;
  });
  (0, _defineProperty2.default)(this, "setCustomDomainId", function (value) {
    _this.attributes.custom_domain_id = value;
    exposeAttributes(_this, ['custom_domain_id']);
  });
  // array(string) # Current eligible public IP addresses for the selected Custom Domain. Any address in this list may originate a connection. Empty when no domain is selected or its configuration is unavailable. Only included in responses for a single Remote Server.
  (0, _defineProperty2.default)(this, "getOutboundIpAddresses", function () {
    return _this.attributes.outbound_ip_addresses;
  });
  (0, _defineProperty2.default)(this, "setOutboundIpAddresses", function (value) {
    _this.attributes.outbound_ip_addresses = value;
    exposeAttributes(_this, ['outbound_ip_addresses']);
  });
  // string # Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as `permission_set` in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the permissions in its local configuration file, controlled by the host's system administrator, and reports them at registration, replacing the stored value.
  (0, _defineProperty2.default)(this, "getFilesAgentPermissionSet", function () {
    return _this.attributes.files_agent_permission_set;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentPermissionSet", function (value) {
    _this.attributes.files_agent_permission_set = value;
    exposeAttributes(_this, ['files_agent_permission_set']);
  });
  // string # Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the root in its local configuration file, controlled by the host's system administrator, and reports it at registration, replacing the stored value.
  (0, _defineProperty2.default)(this, "getFilesAgentRoot", function () {
    return _this.attributes.files_agent_root;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentRoot", function (value) {
    _this.attributes.files_agent_root = value;
    exposeAttributes(_this, ['files_agent_root']);
  });
  // string # Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not update the running Agent.
  (0, _defineProperty2.default)(this, "getFilesAgentVersion", function () {
    return _this.attributes.files_agent_version;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentVersion", function (value) {
    _this.attributes.files_agent_version = value;
    exposeAttributes(_this, ['files_agent_version']);
  });
  // boolean # If true, the Files Agent is up to date.
  (0, _defineProperty2.default)(this, "getFilesAgentUpToDate", function () {
    return _this.attributes.files_agent_up_to_date;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentUpToDate", function (value) {
    _this.attributes.files_agent_up_to_date = value;
    exposeAttributes(_this, ['files_agent_up_to_date']);
  });
  // string # Latest available Files Agent version
  (0, _defineProperty2.default)(this, "getFilesAgentLatestVersion", function () {
    return _this.attributes.files_agent_latest_version;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentLatestVersion", function (value) {
    _this.attributes.files_agent_latest_version = value;
    exposeAttributes(_this, ['files_agent_latest_version']);
  });
  // boolean # Files Agent supports receiving push updates
  (0, _defineProperty2.default)(this, "getFilesAgentSupportsPushUpdates", function () {
    return _this.attributes.files_agent_supports_push_updates;
  });
  (0, _defineProperty2.default)(this, "setFilesAgentSupportsPushUpdates", function (value) {
    _this.attributes.files_agent_supports_push_updates = value;
    exposeAttributes(_this, ['files_agent_supports_push_updates']);
  });
  // boolean # Whether the Files Agent Proxy recently validated a direct transfer connection. `true` means a direct connection was recently validated (actual availability can vary by client network), `false` means direct transfers are enabled but not currently available, and `null` means direct transfers are disabled or unsupported. Only provided for a connected Files Agent when showing a single Remote Server.
  (0, _defineProperty2.default)(this, "getDirectTransferAvailable", function () {
    return _this.attributes.direct_transfer_available;
  });
  (0, _defineProperty2.default)(this, "setDirectTransferAvailable", function (value) {
    _this.attributes.direct_transfer_available = value;
    exposeAttributes(_this, ['direct_transfer_available']);
  });
  // int64 # Route traffic to outbound on a files-agent
  (0, _defineProperty2.default)(this, "getOutboundAgentId", function () {
    return _this.attributes.outbound_agent_id;
  });
  (0, _defineProperty2.default)(this, "setOutboundAgentId", function (value) {
    _this.attributes.outbound_agent_id = value;
    exposeAttributes(_this, ['outbound_agent_id']);
  });
  // string # Filebase: Bucket name
  (0, _defineProperty2.default)(this, "getFilebaseBucket", function () {
    return _this.attributes.filebase_bucket;
  });
  (0, _defineProperty2.default)(this, "setFilebaseBucket", function (value) {
    _this.attributes.filebase_bucket = value;
    exposeAttributes(_this, ['filebase_bucket']);
  });
  // string # Filebase: Access Key.
  (0, _defineProperty2.default)(this, "getFilebaseAccessKey", function () {
    return _this.attributes.filebase_access_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseAccessKey", function (value) {
    _this.attributes.filebase_access_key = value;
    exposeAttributes(_this, ['filebase_access_key']);
  });
  // string # Files.com direct link: paired API key prefix.
  (0, _defineProperty2.default)(this, "getFilesApiKeyPrefix", function () {
    return _this.attributes.files_api_key_prefix;
  });
  (0, _defineProperty2.default)(this, "setFilesApiKeyPrefix", function (value) {
    _this.attributes.files_api_key_prefix = value;
    exposeAttributes(_this, ['files_api_key_prefix']);
  });
  // string # Cloudflare: Bucket name
  (0, _defineProperty2.default)(this, "getCloudflareBucket", function () {
    return _this.attributes.cloudflare_bucket;
  });
  (0, _defineProperty2.default)(this, "setCloudflareBucket", function (value) {
    _this.attributes.cloudflare_bucket = value;
    exposeAttributes(_this, ['cloudflare_bucket']);
  });
  // string # Cloudflare: Access Key.
  (0, _defineProperty2.default)(this, "getCloudflareAccessKey", function () {
    return _this.attributes.cloudflare_access_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareAccessKey", function (value) {
    _this.attributes.cloudflare_access_key = value;
    exposeAttributes(_this, ['cloudflare_access_key']);
  });
  // string # Cloudflare: endpoint
  (0, _defineProperty2.default)(this, "getCloudflareEndpoint", function () {
    return _this.attributes.cloudflare_endpoint;
  });
  (0, _defineProperty2.default)(this, "setCloudflareEndpoint", function (value) {
    _this.attributes.cloudflare_endpoint = value;
    exposeAttributes(_this, ['cloudflare_endpoint']);
  });
  // boolean # Dropbox: If true, list Team folders in root?
  (0, _defineProperty2.default)(this, "getDropboxTeams", function () {
    return _this.attributes.dropbox_teams;
  });
  (0, _defineProperty2.default)(this, "setDropboxTeams", function (value) {
    _this.attributes.dropbox_teams = value;
    exposeAttributes(_this, ['dropbox_teams']);
  });
  // string # Linode: Bucket name
  (0, _defineProperty2.default)(this, "getLinodeBucket", function () {
    return _this.attributes.linode_bucket;
  });
  (0, _defineProperty2.default)(this, "setLinodeBucket", function (value) {
    _this.attributes.linode_bucket = value;
    exposeAttributes(_this, ['linode_bucket']);
  });
  // string # Linode: Access Key
  (0, _defineProperty2.default)(this, "getLinodeAccessKey", function () {
    return _this.attributes.linode_access_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeAccessKey", function (value) {
    _this.attributes.linode_access_key = value;
    exposeAttributes(_this, ['linode_access_key']);
  });
  // string # Linode: region
  (0, _defineProperty2.default)(this, "getLinodeRegion", function () {
    return _this.attributes.linode_region;
  });
  (0, _defineProperty2.default)(this, "setLinodeRegion", function (value) {
    _this.attributes.linode_region = value;
    exposeAttributes(_this, ['linode_region']);
  });
  // boolean # If true, this remote server supports file versioning. This value is determined automatically by Files.com.
  (0, _defineProperty2.default)(this, "getSupportsVersioning", function () {
    return _this.attributes.supports_versioning;
  });
  (0, _defineProperty2.default)(this, "setSupportsVersioning", function (value) {
    _this.attributes.supports_versioning = value;
    exposeAttributes(_this, ['supports_versioning']);
  });
  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // string # Password, if needed.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
    exposeAttributes(_this, ['password']);
  });
  // string # Private key, if needed.
  (0, _defineProperty2.default)(this, "getPrivateKey", function () {
    return _this.attributes.private_key;
  });
  (0, _defineProperty2.default)(this, "setPrivateKey", function (value) {
    _this.attributes.private_key = value;
    exposeAttributes(_this, ['private_key']);
  });
  // string # Passphrase for private key if needed.
  (0, _defineProperty2.default)(this, "getPrivateKeyPassphrase", function () {
    return _this.attributes.private_key_passphrase;
  });
  (0, _defineProperty2.default)(this, "setPrivateKeyPassphrase", function (value) {
    _this.attributes.private_key_passphrase = value;
    exposeAttributes(_this, ['private_key_passphrase']);
  });
  // boolean # Reset authenticated account?
  (0, _defineProperty2.default)(this, "getResetAuthentication", function () {
    return _this.attributes.reset_authentication;
  });
  (0, _defineProperty2.default)(this, "setResetAuthentication", function (value) {
    _this.attributes.reset_authentication = value;
    exposeAttributes(_this, ['reset_authentication']);
  });
  // string # SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication.
  (0, _defineProperty2.default)(this, "getSharepointClientCertificate", function () {
    return _this.attributes.sharepoint_client_certificate;
  });
  (0, _defineProperty2.default)(this, "setSharepointClientCertificate", function (value) {
    _this.attributes.sharepoint_client_certificate = value;
    exposeAttributes(_this, ['sharepoint_client_certificate']);
  });
  // string # SharePoint: Microsoft Entra application client secret for app-only authentication.
  (0, _defineProperty2.default)(this, "getSharepointClientSecret", function () {
    return _this.attributes.sharepoint_client_secret;
  });
  (0, _defineProperty2.default)(this, "setSharepointClientSecret", function (value) {
    _this.attributes.sharepoint_client_secret = value;
    exposeAttributes(_this, ['sharepoint_client_secret']);
  });
  // string # SSL client certificate.
  (0, _defineProperty2.default)(this, "getSslCertificate", function () {
    return _this.attributes.ssl_certificate;
  });
  (0, _defineProperty2.default)(this, "setSslCertificate", function (value) {
    _this.attributes.ssl_certificate = value;
    exposeAttributes(_this, ['ssl_certificate']);
  });
  // string # AWS: secret key.
  (0, _defineProperty2.default)(this, "getAwsSecretKey", function () {
    return _this.attributes.aws_secret_key;
  });
  (0, _defineProperty2.default)(this, "setAwsSecretKey", function (value) {
    _this.attributes.aws_secret_key = value;
    exposeAttributes(_this, ['aws_secret_key']);
  });
  // string # Azure Blob Storage: Access Key
  (0, _defineProperty2.default)(this, "getAzureBlobStorageAccessKey", function () {
    return _this.attributes.azure_blob_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageAccessKey", function (value) {
    _this.attributes.azure_blob_storage_access_key = value;
    exposeAttributes(_this, ['azure_blob_storage_access_key']);
  });
  // string # Azure Blob Storage: Shared Access Signature (SAS) token
  (0, _defineProperty2.default)(this, "getAzureBlobStorageSasToken", function () {
    return _this.attributes.azure_blob_storage_sas_token;
  });
  (0, _defineProperty2.default)(this, "setAzureBlobStorageSasToken", function (value) {
    _this.attributes.azure_blob_storage_sas_token = value;
    exposeAttributes(_this, ['azure_blob_storage_sas_token']);
  });
  // string # Azure File Storage: Access Key
  (0, _defineProperty2.default)(this, "getAzureFilesStorageAccessKey", function () {
    return _this.attributes.azure_files_storage_access_key;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageAccessKey", function (value) {
    _this.attributes.azure_files_storage_access_key = value;
    exposeAttributes(_this, ['azure_files_storage_access_key']);
  });
  // string # Azure File Storage: Shared Access Signature (SAS) token
  (0, _defineProperty2.default)(this, "getAzureFilesStorageSasToken", function () {
    return _this.attributes.azure_files_storage_sas_token;
  });
  (0, _defineProperty2.default)(this, "setAzureFilesStorageSasToken", function (value) {
    _this.attributes.azure_files_storage_sas_token = value;
    exposeAttributes(_this, ['azure_files_storage_sas_token']);
  });
  // string # Backblaze B2 Cloud Storage: applicationKey
  (0, _defineProperty2.default)(this, "getBackblazeB2ApplicationKey", function () {
    return _this.attributes.backblaze_b2_application_key;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2ApplicationKey", function (value) {
    _this.attributes.backblaze_b2_application_key = value;
    exposeAttributes(_this, ['backblaze_b2_application_key']);
  });
  // string # Backblaze B2 Cloud Storage: keyID
  (0, _defineProperty2.default)(this, "getBackblazeB2KeyId", function () {
    return _this.attributes.backblaze_b2_key_id;
  });
  (0, _defineProperty2.default)(this, "setBackblazeB2KeyId", function (value) {
    _this.attributes.backblaze_b2_key_id = value;
    exposeAttributes(_this, ['backblaze_b2_key_id']);
  });
  // string # Cloudflare: Secret Key
  (0, _defineProperty2.default)(this, "getCloudflareSecretKey", function () {
    return _this.attributes.cloudflare_secret_key;
  });
  (0, _defineProperty2.default)(this, "setCloudflareSecretKey", function (value) {
    _this.attributes.cloudflare_secret_key = value;
    exposeAttributes(_this, ['cloudflare_secret_key']);
  });
  // string # Filebase: Secret Key
  (0, _defineProperty2.default)(this, "getFilebaseSecretKey", function () {
    return _this.attributes.filebase_secret_key;
  });
  (0, _defineProperty2.default)(this, "setFilebaseSecretKey", function (value) {
    _this.attributes.filebase_secret_key = value;
    exposeAttributes(_this, ['filebase_secret_key']);
  });
  // string # Google Cloud Storage: JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageCredentialsJson", function () {
    return _this.attributes.google_cloud_storage_credentials_json;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageCredentialsJson", function (value) {
    _this.attributes.google_cloud_storage_credentials_json = value;
    exposeAttributes(_this, ['google_cloud_storage_credentials_json']);
  });
  // string # Google Cloud Storage: S3-compatible secret key
  (0, _defineProperty2.default)(this, "getGoogleCloudStorageS3CompatibleSecretKey", function () {
    return _this.attributes.google_cloud_storage_s3_compatible_secret_key;
  });
  (0, _defineProperty2.default)(this, "setGoogleCloudStorageS3CompatibleSecretKey", function (value) {
    _this.attributes.google_cloud_storage_s3_compatible_secret_key = value;
    exposeAttributes(_this, ['google_cloud_storage_s3_compatible_secret_key']);
  });
  // string # Linode: Secret Key
  (0, _defineProperty2.default)(this, "getLinodeSecretKey", function () {
    return _this.attributes.linode_secret_key;
  });
  (0, _defineProperty2.default)(this, "setLinodeSecretKey", function (value) {
    _this.attributes.linode_secret_key = value;
    exposeAttributes(_this, ['linode_secret_key']);
  });
  // string # S3-compatible: Secret Key
  (0, _defineProperty2.default)(this, "getS3CompatibleSecretKey", function () {
    return _this.attributes.s3_compatible_secret_key;
  });
  (0, _defineProperty2.default)(this, "setS3CompatibleSecretKey", function (value) {
    _this.attributes.s3_compatible_secret_key = value;
    exposeAttributes(_this, ['s3_compatible_secret_key']);
  });
  // string # Wasabi: Secret Key
  (0, _defineProperty2.default)(this, "getWasabiSecretKey", function () {
    return _this.attributes.wasabi_secret_key;
  });
  (0, _defineProperty2.default)(this, "setWasabiSecretKey", function (value) {
    _this.attributes.wasabi_secret_key = value;
    exposeAttributes(_this, ['wasabi_secret_key']);
  });
  // string # Files.com direct link: API key used once to pair the remote server.
  (0, _defineProperty2.default)(this, "getFilesApiKey", function () {
    return _this.attributes.files_api_key;
  });
  (0, _defineProperty2.default)(this, "setFilesApiKey", function (value) {
    _this.attributes.files_api_key = value;
    exposeAttributes(_this, ['files_api_key']);
  });
  // List Files.com Agent nodes
  (0, _defineProperty2.default)(this, "agentNodes", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      AgentNode,
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
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id), "/agent_nodes"), 'GET', params, _this.options);
        case 6:
          response = _context.sent;
          AgentNode = require('./AgentNode.js').default;
          return _context.abrupt("return", new AgentNode(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  // Push update to Files Agent
  (0, _defineProperty2.default)(this, "agentPushUpdate", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      AgentPushUpdate,
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
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id), "/agent_push_update"), 'POST', params, _this.options);
        case 6:
          response = _context2.sent;
          AgentPushUpdate = require('./AgentPushUpdate.js').default;
          return _context2.abrupt("return", new AgentPushUpdate(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  // Parameters:
  //   password - string - Password, if needed.
  //   private_key - string - Private key, if needed.
  //   private_key_passphrase - string - Passphrase for private key if needed.
  //   reset_authentication - boolean - Reset authenticated account?
  //   sharepoint_client_certificate - string - SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication.
  //   sharepoint_client_secret - string - SharePoint: Microsoft Entra application client secret for app-only authentication.
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
  //   allow_relative_paths - boolean - Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to the user's home directory.
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
  //   description - string - Internal description for your reference
  //   dropbox_teams - boolean - Dropbox: If true, list Team folders in root?
  //   enable_dedicated_ips - boolean - `true` if remote server only accepts connections from dedicated IPs
  //   filebase_access_key - string - Filebase: Access Key.
  //   filebase_bucket - string - Filebase: Bucket name
  //   files_api_key - string - Files.com direct link: API key used once to pair the remote server.
  //   files_agent_permission_set - string - Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as `permission_set` in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the permissions in its local configuration file, controlled by the host's system administrator, and reports them at registration, replacing the stored value.
  //   files_agent_root - string - Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the root in its local configuration file, controlled by the host's system administrator, and reports it at registration, replacing the stored value.
  //   files_agent_version - string - Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not update the running Agent.
  //   outbound_agent_id - int64 - Route traffic to outbound on a files-agent
  //   custom_domain_id - int64 - Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an outbound Agent. Set to null to use the site's default dedicated IPs.
  //   google_cloud_storage_authentication_method - string - Google Cloud Storage: Authentication method. Can be json, hmac, or oauth.
  //   google_cloud_storage_bucket - string - Google Cloud Storage: Bucket Name
  //   google_cloud_storage_oauth_scope - string - Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or https://www.googleapis.com/auth/devstorage.read_write.
  //   google_cloud_storage_project_id - string - Google Cloud Storage: Project ID
  //   google_cloud_storage_s3_compatible_access_key - string - Google Cloud Storage: S3-compatible Access Key.
  //   hostname - string - Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not change the running Agent.
  //   linode_access_key - string - Linode: Access Key
  //   linode_bucket - string - Linode: Bucket name
  //   linode_region - string - Linode: region
  //   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  //   name - string - Internal name for your reference
  //   one_drive_account_type - string - OneDrive: Either personal or business_other account types
  //   pin_to_site_region - boolean - If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a site-wide setting which will force it to true.
  //   port - int64 - Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not change the running Agent.
  //   upload_staging_path - string - Upload staging path.  Applies to SFTP only.  If a path is provided here, files will first be uploaded to this path on the remote folder and the moved into the final correct path via an SFTP move command.  This is required by some remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
  //   remote_server_credential_id - int64 - ID of Remote Server Credential, if applicable.
  //   s3_assume_role_arn - string - AWS IAM Role ARN for AssumeRole authentication.
  //   s3_assume_role_duration_seconds - int64 - Session duration in seconds for AssumeRole authentication (900-43200).
  //   s3_bucket - string - S3 bucket name
  //   s3_compatible_access_key - string - S3-compatible: Access Key
  //   s3_compatible_bucket - string - S3-compatible: Bucket name
  //   s3_compatible_endpoint - string - S3-compatible: endpoint
  //   s3_compatible_region - string - S3-compatible: region
  //   s3_compatible_virtual_hosted_style - boolean - S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs
  //   s3_kms_key_id - string - ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket requires a specific key.
  //   s3_region - string - S3 region
  //   server_certificate - string - Remote server certificate
  //   server_host_key - string - Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key, preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged. Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone does not end the pin. Update `server_host_key` to replace the pin.
  //   server_type - string - Remote server type.
  //   sharepoint_client_id - string - SharePoint: Microsoft Entra application client ID for app-only authentication.
  //   sharepoint_site_url - string - SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites.
  //   sharepoint_tenant_id - string - SharePoint: Microsoft Entra tenant ID for app-only authentication.
  //   ssl - string - Should we require SSL?
  //   username - string - Remote server username.
  //   wasabi_access_key - string - Wasabi: Access Key.
  //   wasabi_bucket - string - Wasabi: Bucket name
  //   wasabi_region - string - Wasabi: Region
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      response,
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
          if (!(params.password !== undefined && params.password !== null && !(0, _utils.isString)(params.password))) {
            _context3.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
        case 4:
          if (!(params.private_key !== undefined && params.private_key !== null && !(0, _utils.isString)(params.private_key))) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
        case 5:
          if (!(params.private_key_passphrase !== undefined && params.private_key_passphrase !== null && !(0, _utils.isString)(params.private_key_passphrase))) {
            _context3.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params.private_key_passphrase)));
        case 6:
          if (!((0, _utils.isArray)(params.reset_authentication) || (0, _utils.isObject)(params.reset_authentication))) {
            _context3.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: reset_authentication must be of type Boolean, received ".concat((0, _utils.getType)(params.reset_authentication)));
        case 7:
          if (!(params.sharepoint_client_certificate !== undefined && params.sharepoint_client_certificate !== null && !(0, _utils.isString)(params.sharepoint_client_certificate))) {
            _context3.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sharepoint_client_certificate must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_client_certificate)));
        case 8:
          if (!(params.sharepoint_client_secret !== undefined && params.sharepoint_client_secret !== null && !(0, _utils.isString)(params.sharepoint_client_secret))) {
            _context3.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sharepoint_client_secret must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_client_secret)));
        case 9:
          if (!(params.ssl_certificate !== undefined && params.ssl_certificate !== null && !(0, _utils.isString)(params.ssl_certificate))) {
            _context3.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(params.ssl_certificate)));
        case 10:
          if (!(params.aws_secret_key !== undefined && params.aws_secret_key !== null && !(0, _utils.isString)(params.aws_secret_key))) {
            _context3.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params.aws_secret_key)));
        case 11:
          if (!(params.azure_blob_storage_access_key !== undefined && params.azure_blob_storage_access_key !== null && !(0, _utils.isString)(params.azure_blob_storage_access_key))) {
            _context3.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_access_key)));
        case 12:
          if (!(params.azure_blob_storage_sas_token !== undefined && params.azure_blob_storage_sas_token !== null && !(0, _utils.isString)(params.azure_blob_storage_sas_token))) {
            _context3.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_sas_token)));
        case 13:
          if (!(params.azure_files_storage_access_key !== undefined && params.azure_files_storage_access_key !== null && !(0, _utils.isString)(params.azure_files_storage_access_key))) {
            _context3.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_access_key)));
        case 14:
          if (!(params.azure_files_storage_sas_token !== undefined && params.azure_files_storage_sas_token !== null && !(0, _utils.isString)(params.azure_files_storage_sas_token))) {
            _context3.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_sas_token)));
        case 15:
          if (!(params.backblaze_b2_application_key !== undefined && params.backblaze_b2_application_key !== null && !(0, _utils.isString)(params.backblaze_b2_application_key))) {
            _context3.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_application_key)));
        case 16:
          if (!(params.backblaze_b2_key_id !== undefined && params.backblaze_b2_key_id !== null && !(0, _utils.isString)(params.backblaze_b2_key_id))) {
            _context3.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_key_id)));
        case 17:
          if (!(params.cloudflare_secret_key !== undefined && params.cloudflare_secret_key !== null && !(0, _utils.isString)(params.cloudflare_secret_key))) {
            _context3.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_secret_key)));
        case 18:
          if (!(params.filebase_secret_key !== undefined && params.filebase_secret_key !== null && !(0, _utils.isString)(params.filebase_secret_key))) {
            _context3.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_secret_key)));
        case 19:
          if (!(params.google_cloud_storage_credentials_json !== undefined && params.google_cloud_storage_credentials_json !== null && !(0, _utils.isString)(params.google_cloud_storage_credentials_json))) {
            _context3.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_credentials_json)));
        case 20:
          if (!(params.google_cloud_storage_s3_compatible_secret_key !== undefined && params.google_cloud_storage_s3_compatible_secret_key !== null && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_secret_key))) {
            _context3.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_secret_key)));
        case 21:
          if (!(params.linode_secret_key !== undefined && params.linode_secret_key !== null && !(0, _utils.isString)(params.linode_secret_key))) {
            _context3.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params.linode_secret_key)));
        case 22:
          if (!(params.s3_compatible_secret_key !== undefined && params.s3_compatible_secret_key !== null && !(0, _utils.isString)(params.s3_compatible_secret_key))) {
            _context3.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_secret_key)));
        case 23:
          if (!(params.wasabi_secret_key !== undefined && params.wasabi_secret_key !== null && !(0, _utils.isString)(params.wasabi_secret_key))) {
            _context3.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_secret_key)));
        case 24:
          if (!((0, _utils.isArray)(params.allow_relative_paths) || (0, _utils.isObject)(params.allow_relative_paths))) {
            _context3.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: allow_relative_paths must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_relative_paths)));
        case 25:
          if (!(params.aws_access_key !== undefined && params.aws_access_key !== null && !(0, _utils.isString)(params.aws_access_key))) {
            _context3.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params.aws_access_key)));
        case 26:
          if (!(params.azure_blob_storage_account !== undefined && params.azure_blob_storage_account !== null && !(0, _utils.isString)(params.azure_blob_storage_account))) {
            _context3.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_account)));
        case 27:
          if (!(params.azure_blob_storage_container !== undefined && params.azure_blob_storage_container !== null && !(0, _utils.isString)(params.azure_blob_storage_container))) {
            _context3.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_container)));
        case 28:
          if (!(params.azure_blob_storage_dns_suffix !== undefined && params.azure_blob_storage_dns_suffix !== null && !(0, _utils.isString)(params.azure_blob_storage_dns_suffix))) {
            _context3.next = 29;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_dns_suffix)));
        case 29:
          if (!((0, _utils.isArray)(params.azure_blob_storage_hierarchical_namespace) || (0, _utils.isObject)(params.azure_blob_storage_hierarchical_namespace))) {
            _context3.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_hierarchical_namespace must be of type Boolean, received ".concat((0, _utils.getType)(params.azure_blob_storage_hierarchical_namespace)));
        case 30:
          if (!(params.azure_files_storage_account !== undefined && params.azure_files_storage_account !== null && !(0, _utils.isString)(params.azure_files_storage_account))) {
            _context3.next = 31;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_account)));
        case 31:
          if (!(params.azure_files_storage_dns_suffix !== undefined && params.azure_files_storage_dns_suffix !== null && !(0, _utils.isString)(params.azure_files_storage_dns_suffix))) {
            _context3.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_dns_suffix)));
        case 32:
          if (!(params.azure_files_storage_share_name !== undefined && params.azure_files_storage_share_name !== null && !(0, _utils.isString)(params.azure_files_storage_share_name))) {
            _context3.next = 33;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_share_name must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_share_name)));
        case 33:
          if (!(params.backblaze_b2_bucket !== undefined && params.backblaze_b2_bucket !== null && !(0, _utils.isString)(params.backblaze_b2_bucket))) {
            _context3.next = 34;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_bucket)));
        case 34:
          if (!(params.backblaze_b2_s3_endpoint !== undefined && params.backblaze_b2_s3_endpoint !== null && !(0, _utils.isString)(params.backblaze_b2_s3_endpoint))) {
            _context3.next = 35;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_s3_endpoint)));
        case 35:
          if (!(params.buffer_uploads !== undefined && params.buffer_uploads !== null && !(0, _utils.isString)(params.buffer_uploads))) {
            _context3.next = 36;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: buffer_uploads must be of type String, received ".concat((0, _utils.getType)(params.buffer_uploads)));
        case 36:
          if (!(params.cloudflare_access_key !== undefined && params.cloudflare_access_key !== null && !(0, _utils.isString)(params.cloudflare_access_key))) {
            _context3.next = 37;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_access_key)));
        case 37:
          if (!(params.cloudflare_bucket !== undefined && params.cloudflare_bucket !== null && !(0, _utils.isString)(params.cloudflare_bucket))) {
            _context3.next = 38;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_bucket must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_bucket)));
        case 38:
          if (!(params.cloudflare_endpoint !== undefined && params.cloudflare_endpoint !== null && !(0, _utils.isString)(params.cloudflare_endpoint))) {
            _context3.next = 39;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: cloudflare_endpoint must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_endpoint)));
        case 39:
          if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
            _context3.next = 40;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 40:
          if (!((0, _utils.isArray)(params.dropbox_teams) || (0, _utils.isObject)(params.dropbox_teams))) {
            _context3.next = 41;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: dropbox_teams must be of type Boolean, received ".concat((0, _utils.getType)(params.dropbox_teams)));
        case 41:
          if (!((0, _utils.isArray)(params.enable_dedicated_ips) || (0, _utils.isObject)(params.enable_dedicated_ips))) {
            _context3.next = 42;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: enable_dedicated_ips must be of type Boolean, received ".concat((0, _utils.getType)(params.enable_dedicated_ips)));
        case 42:
          if (!(params.filebase_access_key !== undefined && params.filebase_access_key !== null && !(0, _utils.isString)(params.filebase_access_key))) {
            _context3.next = 43;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_access_key)));
        case 43:
          if (!(params.filebase_bucket !== undefined && params.filebase_bucket !== null && !(0, _utils.isString)(params.filebase_bucket))) {
            _context3.next = 44;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: filebase_bucket must be of type String, received ".concat((0, _utils.getType)(params.filebase_bucket)));
        case 44:
          if (!(params.files_api_key !== undefined && params.files_api_key !== null && !(0, _utils.isString)(params.files_api_key))) {
            _context3.next = 45;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_api_key must be of type String, received ".concat((0, _utils.getType)(params.files_api_key)));
        case 45:
          if (!(params.files_agent_permission_set !== undefined && params.files_agent_permission_set !== null && !(0, _utils.isString)(params.files_agent_permission_set))) {
            _context3.next = 46;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_permission_set must be of type String, received ".concat((0, _utils.getType)(params.files_agent_permission_set)));
        case 46:
          if (!(params.files_agent_root !== undefined && params.files_agent_root !== null && !(0, _utils.isString)(params.files_agent_root))) {
            _context3.next = 47;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_root must be of type String, received ".concat((0, _utils.getType)(params.files_agent_root)));
        case 47:
          if (!(params.files_agent_version !== undefined && params.files_agent_version !== null && !(0, _utils.isString)(params.files_agent_version))) {
            _context3.next = 48;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: files_agent_version must be of type String, received ".concat((0, _utils.getType)(params.files_agent_version)));
        case 48:
          if (!(params.outbound_agent_id !== undefined && params.outbound_agent_id !== null && !(0, _utils.isInt)(params.outbound_agent_id))) {
            _context3.next = 49;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: outbound_agent_id must be of type Int, received ".concat((0, _utils.getType)(params.outbound_agent_id)));
        case 49:
          if (!(params.custom_domain_id !== undefined && params.custom_domain_id !== null && !(0, _utils.isInt)(params.custom_domain_id))) {
            _context3.next = 50;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: custom_domain_id must be of type Int, received ".concat((0, _utils.getType)(params.custom_domain_id)));
        case 50:
          if (!(params.google_cloud_storage_authentication_method !== undefined && params.google_cloud_storage_authentication_method !== null && !(0, _utils.isString)(params.google_cloud_storage_authentication_method))) {
            _context3.next = 51;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_authentication_method must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_authentication_method)));
        case 51:
          if (!(params.google_cloud_storage_bucket !== undefined && params.google_cloud_storage_bucket !== null && !(0, _utils.isString)(params.google_cloud_storage_bucket))) {
            _context3.next = 52;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_bucket)));
        case 52:
          if (!(params.google_cloud_storage_oauth_scope !== undefined && params.google_cloud_storage_oauth_scope !== null && !(0, _utils.isString)(params.google_cloud_storage_oauth_scope))) {
            _context3.next = 53;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_oauth_scope must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_oauth_scope)));
        case 53:
          if (!(params.google_cloud_storage_project_id !== undefined && params.google_cloud_storage_project_id !== null && !(0, _utils.isString)(params.google_cloud_storage_project_id))) {
            _context3.next = 54;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_project_id)));
        case 54:
          if (!(params.google_cloud_storage_s3_compatible_access_key !== undefined && params.google_cloud_storage_s3_compatible_access_key !== null && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_access_key))) {
            _context3.next = 55;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_access_key)));
        case 55:
          if (!(params.hostname !== undefined && params.hostname !== null && !(0, _utils.isString)(params.hostname))) {
            _context3.next = 56;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(params.hostname)));
        case 56:
          if (!(params.linode_access_key !== undefined && params.linode_access_key !== null && !(0, _utils.isString)(params.linode_access_key))) {
            _context3.next = 57;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params.linode_access_key)));
        case 57:
          if (!(params.linode_bucket !== undefined && params.linode_bucket !== null && !(0, _utils.isString)(params.linode_bucket))) {
            _context3.next = 58;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_bucket must be of type String, received ".concat((0, _utils.getType)(params.linode_bucket)));
        case 58:
          if (!(params.linode_region !== undefined && params.linode_region !== null && !(0, _utils.isString)(params.linode_region))) {
            _context3.next = 59;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: linode_region must be of type String, received ".concat((0, _utils.getType)(params.linode_region)));
        case 59:
          if (!(params.max_connections !== undefined && params.max_connections !== null && !(0, _utils.isInt)(params.max_connections))) {
            _context3.next = 60;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(params.max_connections)));
        case 60:
          if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
            _context3.next = 61;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 61:
          if (!(params.one_drive_account_type !== undefined && params.one_drive_account_type !== null && !(0, _utils.isString)(params.one_drive_account_type))) {
            _context3.next = 62;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(params.one_drive_account_type)));
        case 62:
          if (!((0, _utils.isArray)(params.pin_to_site_region) || (0, _utils.isObject)(params.pin_to_site_region))) {
            _context3.next = 63;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: pin_to_site_region must be of type Boolean, received ".concat((0, _utils.getType)(params.pin_to_site_region)));
        case 63:
          if (!(params.port !== undefined && params.port !== null && !(0, _utils.isInt)(params.port))) {
            _context3.next = 64;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(params.port)));
        case 64:
          if (!(params.upload_staging_path !== undefined && params.upload_staging_path !== null && !(0, _utils.isString)(params.upload_staging_path))) {
            _context3.next = 65;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: upload_staging_path must be of type String, received ".concat((0, _utils.getType)(params.upload_staging_path)));
        case 65:
          if (!(params.remote_server_credential_id !== undefined && params.remote_server_credential_id !== null && !(0, _utils.isInt)(params.remote_server_credential_id))) {
            _context3.next = 66;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: remote_server_credential_id must be of type Int, received ".concat((0, _utils.getType)(params.remote_server_credential_id)));
        case 66:
          if (!(params.s3_assume_role_arn !== undefined && params.s3_assume_role_arn !== null && !(0, _utils.isString)(params.s3_assume_role_arn))) {
            _context3.next = 67;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_arn must be of type String, received ".concat((0, _utils.getType)(params.s3_assume_role_arn)));
        case 67:
          if (!(params.s3_assume_role_duration_seconds !== undefined && params.s3_assume_role_duration_seconds !== null && !(0, _utils.isInt)(params.s3_assume_role_duration_seconds))) {
            _context3.next = 68;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_duration_seconds must be of type Int, received ".concat((0, _utils.getType)(params.s3_assume_role_duration_seconds)));
        case 68:
          if (!(params.s3_bucket !== undefined && params.s3_bucket !== null && !(0, _utils.isString)(params.s3_bucket))) {
            _context3.next = 69;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_bucket)));
        case 69:
          if (!(params.s3_compatible_access_key !== undefined && params.s3_compatible_access_key !== null && !(0, _utils.isString)(params.s3_compatible_access_key))) {
            _context3.next = 70;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_access_key)));
        case 70:
          if (!(params.s3_compatible_bucket !== undefined && params.s3_compatible_bucket !== null && !(0, _utils.isString)(params.s3_compatible_bucket))) {
            _context3.next = 71;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_bucket)));
        case 71:
          if (!(params.s3_compatible_endpoint !== undefined && params.s3_compatible_endpoint !== null && !(0, _utils.isString)(params.s3_compatible_endpoint))) {
            _context3.next = 72;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint)));
        case 72:
          if (!(params.s3_compatible_region !== undefined && params.s3_compatible_region !== null && !(0, _utils.isString)(params.s3_compatible_region))) {
            _context3.next = 73;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_region must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_region)));
        case 73:
          if (!((0, _utils.isArray)(params.s3_compatible_virtual_hosted_style) || (0, _utils.isObject)(params.s3_compatible_virtual_hosted_style))) {
            _context3.next = 74;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_compatible_virtual_hosted_style must be of type Boolean, received ".concat((0, _utils.getType)(params.s3_compatible_virtual_hosted_style)));
        case 74:
          if (!(params.s3_kms_key_id !== undefined && params.s3_kms_key_id !== null && !(0, _utils.isString)(params.s3_kms_key_id))) {
            _context3.next = 75;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_kms_key_id must be of type String, received ".concat((0, _utils.getType)(params.s3_kms_key_id)));
        case 75:
          if (!(params.s3_region !== undefined && params.s3_region !== null && !(0, _utils.isString)(params.s3_region))) {
            _context3.next = 76;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(params.s3_region)));
        case 76:
          if (!(params.server_certificate !== undefined && params.server_certificate !== null && !(0, _utils.isString)(params.server_certificate))) {
            _context3.next = 77;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params.server_certificate)));
        case 77:
          if (!(params.server_host_key !== undefined && params.server_host_key !== null && !(0, _utils.isString)(params.server_host_key))) {
            _context3.next = 78;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(params.server_host_key)));
        case 78:
          if (!(params.server_type !== undefined && params.server_type !== null && !(0, _utils.isString)(params.server_type))) {
            _context3.next = 79;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params.server_type)));
        case 79:
          if (!(params.sharepoint_client_id !== undefined && params.sharepoint_client_id !== null && !(0, _utils.isString)(params.sharepoint_client_id))) {
            _context3.next = 80;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sharepoint_client_id must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_client_id)));
        case 80:
          if (!(params.sharepoint_site_url !== undefined && params.sharepoint_site_url !== null && !(0, _utils.isString)(params.sharepoint_site_url))) {
            _context3.next = 81;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sharepoint_site_url must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_site_url)));
        case 81:
          if (!(params.sharepoint_tenant_id !== undefined && params.sharepoint_tenant_id !== null && !(0, _utils.isString)(params.sharepoint_tenant_id))) {
            _context3.next = 82;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: sharepoint_tenant_id must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_tenant_id)));
        case 82:
          if (!(params.ssl !== undefined && params.ssl !== null && !(0, _utils.isString)(params.ssl))) {
            _context3.next = 83;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(params.ssl)));
        case 83:
          if (!(params.username !== undefined && params.username !== null && !(0, _utils.isString)(params.username))) {
            _context3.next = 84;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
        case 84:
          if (!(params.wasabi_access_key !== undefined && params.wasabi_access_key !== null && !(0, _utils.isString)(params.wasabi_access_key))) {
            _context3.next = 85;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_access_key)));
        case 85:
          if (!(params.wasabi_bucket !== undefined && params.wasabi_bucket !== null && !(0, _utils.isString)(params.wasabi_bucket))) {
            _context3.next = 86;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(params.wasabi_bucket)));
        case 86:
          if (!(params.wasabi_region !== undefined && params.wasabi_region !== null && !(0, _utils.isString)(params.wasabi_region))) {
            _context3.next = 87;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(params.wasabi_region)));
        case 87:
          if (params.id) {
            _context3.next = 89;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 88;
            break;
          }
          params.id = _this.id;
          _context3.next = 89;
          break;
        case 88:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 89:
          _context3.next = 90;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 90:
          response = _context3.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context3.abrupt("return", _this);
        case 91:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var params,
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
          if (params.id) {
            _context4.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context4.next = 4;
            break;
          }
          params.id = _this.id;
          _context4.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context4.next = 6;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
    var newObject;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!_this.attributes.id) {
            _context5.next = 2;
            break;
          }
          _context5.next = 1;
          return _this.update(_this.attributes);
        case 1:
          return _context5.abrupt("return", true);
        case 2:
          _context5.next = 3;
          return RemoteServer.create(_this.attributes, _this.options);
        case 3:
          newObject = _context5.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context5.abrupt("return", true);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_RemoteServer = RemoteServer;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name`, `server_type`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name`, `server_type`, `workspace_id`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`. Valid field combinations are `[ server_type, name ]`, `[ workspace_id, name ]`, `[ backblaze_b2_bucket, name ]`, `[ google_cloud_storage_bucket, name ]`, `[ wasabi_bucket, name ]`, `[ s3_bucket, name ]`, `[ azure_blob_storage_container, name ]`, `[ azure_files_storage_share_name, name ]`, `[ s3_compatible_bucket, name ]`, `[ filebase_bucket, name ]`, `[ cloudflare_bucket, name ]`, `[ linode_bucket, name ]`, `[ workspace_id, server_type ]` or `[ workspace_id, server_type, name ]`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`. Valid field combinations are `[ backblaze_b2_bucket, name ]`, `[ google_cloud_storage_bucket, name ]`, `[ wasabi_bucket, name ]`, `[ s3_bucket, name ]`, `[ azure_blob_storage_container, name ]`, `[ azure_files_storage_share_name, name ]`, `[ s3_compatible_bucket, name ]`, `[ filebase_bucket, name ]`, `[ cloudflare_bucket, name ]` or `[ linode_bucket, name ]`.
(0, _defineProperty2.default)(RemoteServer, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var _response$data;
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context6.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        _context6.next = 4;
        return _Api.default.sendRequest('/remote_servers', 'GET', params, options);
      case 4:
        response = _context6.sent;
        return _context6.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _RemoteServer(obj, retainedOptions(options));
        })) || []);
      case 5:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
(0, _defineProperty2.default)(RemoteServer, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _RemoteServer.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(RemoteServer, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _RemoteServer.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Remote Server ID.
(0, _defineProperty2.default)(RemoteServer, "find", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7(id) {
    var params,
      options,
      response,
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
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context7.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context7.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context7.next = 4;
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context7.sent;
          return _context7.abrupt("return", new _RemoteServer(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x) {
    return _ref9.apply(this, arguments);
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
  var _ref0 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee8(id) {
    var params,
      options,
      response,
      RemoteServerConfigurationFile,
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
          return _Api.default.sendRequest("/remote_servers/".concat(encodeURIComponent(params.id), "/configuration_file"), 'GET', params, options);
        case 4:
          response = _context8.sent;
          RemoteServerConfigurationFile = require('./RemoteServerConfigurationFile.js').default;
          return _context8.abrupt("return", new RemoteServerConfigurationFile(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x2) {
    return _ref0.apply(this, arguments);
  };
}());
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   password - string - Password, if needed.
//   private_key - string - Private key, if needed.
//   private_key_passphrase - string - Passphrase for private key if needed.
//   reset_authentication - boolean - Reset authenticated account?
//   sharepoint_client_certificate - string - SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication.
//   sharepoint_client_secret - string - SharePoint: Microsoft Entra application client secret for app-only authentication.
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
//   allow_relative_paths - boolean - Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to the user's home directory.
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
//   description - string - Internal description for your reference
//   dropbox_teams - boolean - Dropbox: If true, list Team folders in root?
//   enable_dedicated_ips - boolean - `true` if remote server only accepts connections from dedicated IPs
//   filebase_access_key - string - Filebase: Access Key.
//   filebase_bucket - string - Filebase: Bucket name
//   files_api_key - string - Files.com direct link: API key used once to pair the remote server.
//   files_agent_permission_set - string - Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as `permission_set` in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the permissions in its local configuration file, controlled by the host's system administrator, and reports them at registration, replacing the stored value.
//   files_agent_root - string - Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the root in its local configuration file, controlled by the host's system administrator, and reports it at registration, replacing the stored value.
//   files_agent_version - string - Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not update the running Agent.
//   outbound_agent_id - int64 - Route traffic to outbound on a files-agent
//   custom_domain_id - int64 - Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an outbound Agent. Set to null to use the site's default dedicated IPs.
//   google_cloud_storage_authentication_method - string - Google Cloud Storage: Authentication method. Can be json, hmac, or oauth.
//   google_cloud_storage_bucket - string - Google Cloud Storage: Bucket Name
//   google_cloud_storage_oauth_scope - string - Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or https://www.googleapis.com/auth/devstorage.read_write.
//   google_cloud_storage_project_id - string - Google Cloud Storage: Project ID
//   google_cloud_storage_s3_compatible_access_key - string - Google Cloud Storage: S3-compatible Access Key.
//   hostname - string - Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not change the running Agent.
//   linode_access_key - string - Linode: Access Key
//   linode_bucket - string - Linode: Bucket name
//   linode_region - string - Linode: region
//   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
//   name - string - Internal name for your reference
//   one_drive_account_type - string - OneDrive: Either personal or business_other account types
//   pin_to_site_region - boolean - If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a site-wide setting which will force it to true.
//   port - int64 - Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each registration, replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on Create or Update does not change the running Agent.
//   upload_staging_path - string - Upload staging path.  Applies to SFTP only.  If a path is provided here, files will first be uploaded to this path on the remote folder and the moved into the final correct path via an SFTP move command.  This is required by some remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
//   remote_server_credential_id - int64 - ID of Remote Server Credential, if applicable.
//   s3_assume_role_arn - string - AWS IAM Role ARN for AssumeRole authentication.
//   s3_assume_role_duration_seconds - int64 - Session duration in seconds for AssumeRole authentication (900-43200).
//   s3_bucket - string - S3 bucket name
//   s3_compatible_access_key - string - S3-compatible: Access Key
//   s3_compatible_bucket - string - S3-compatible: Bucket name
//   s3_compatible_endpoint - string - S3-compatible: endpoint
//   s3_compatible_region - string - S3-compatible: region
//   s3_compatible_virtual_hosted_style - boolean - S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs
//   s3_kms_key_id - string - ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket requires a specific key.
//   s3_region - string - S3 region
//   server_certificate - string - Remote server certificate
//   server_host_key - string - Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key, preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged. Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone does not end the pin. Update `server_host_key` to replace the pin.
//   server_type - string - Remote server type.
//   sharepoint_client_id - string - SharePoint: Microsoft Entra application client ID for app-only authentication.
//   sharepoint_site_url - string - SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites.
//   sharepoint_tenant_id - string - SharePoint: Microsoft Entra tenant ID for app-only authentication.
//   ssl - string - Should we require SSL?
//   username - string - Remote server username.
//   wasabi_access_key - string - Wasabi: Access Key.
//   wasabi_bucket - string - Wasabi: Bucket name
//   wasabi_region - string - Wasabi: Region
//   workspace_id - int64 - Workspace ID (0 for default workspace)
(0, _defineProperty2.default)(RemoteServer, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee9() {
  var params,
    options,
    response,
    _args9 = arguments;
  return _regenerator.default.wrap(function (_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        params = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
        options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context9.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.password !== undefined && params.password !== null && !(0, _utils.isString)(params.password))) {
          _context9.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 2:
        if (!(params.private_key !== undefined && params.private_key !== null && !(0, _utils.isString)(params.private_key))) {
          _context9.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key must be of type String, received ".concat((0, _utils.getType)(params.private_key)));
      case 3:
        if (!(params.private_key_passphrase !== undefined && params.private_key_passphrase !== null && !(0, _utils.isString)(params.private_key_passphrase))) {
          _context9.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: private_key_passphrase must be of type String, received ".concat((0, _utils.getType)(params.private_key_passphrase)));
      case 4:
        if (!((0, _utils.isArray)(params.reset_authentication) || (0, _utils.isObject)(params.reset_authentication))) {
          _context9.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: reset_authentication must be of type Boolean, received ".concat((0, _utils.getType)(params.reset_authentication)));
      case 5:
        if (!(params.sharepoint_client_certificate !== undefined && params.sharepoint_client_certificate !== null && !(0, _utils.isString)(params.sharepoint_client_certificate))) {
          _context9.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sharepoint_client_certificate must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_client_certificate)));
      case 6:
        if (!(params.sharepoint_client_secret !== undefined && params.sharepoint_client_secret !== null && !(0, _utils.isString)(params.sharepoint_client_secret))) {
          _context9.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sharepoint_client_secret must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_client_secret)));
      case 7:
        if (!(params.ssl_certificate !== undefined && params.ssl_certificate !== null && !(0, _utils.isString)(params.ssl_certificate))) {
          _context9.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl_certificate must be of type String, received ".concat((0, _utils.getType)(params.ssl_certificate)));
      case 8:
        if (!(params.aws_secret_key !== undefined && params.aws_secret_key !== null && !(0, _utils.isString)(params.aws_secret_key))) {
          _context9.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_secret_key must be of type String, received ".concat((0, _utils.getType)(params.aws_secret_key)));
      case 9:
        if (!(params.azure_blob_storage_access_key !== undefined && params.azure_blob_storage_access_key !== null && !(0, _utils.isString)(params.azure_blob_storage_access_key))) {
          _context9.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_access_key)));
      case 10:
        if (!(params.azure_blob_storage_sas_token !== undefined && params.azure_blob_storage_sas_token !== null && !(0, _utils.isString)(params.azure_blob_storage_sas_token))) {
          _context9.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_sas_token)));
      case 11:
        if (!(params.azure_files_storage_access_key !== undefined && params.azure_files_storage_access_key !== null && !(0, _utils.isString)(params.azure_files_storage_access_key))) {
          _context9.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_access_key must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_access_key)));
      case 12:
        if (!(params.azure_files_storage_sas_token !== undefined && params.azure_files_storage_sas_token !== null && !(0, _utils.isString)(params.azure_files_storage_sas_token))) {
          _context9.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_sas_token must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_sas_token)));
      case 13:
        if (!(params.backblaze_b2_application_key !== undefined && params.backblaze_b2_application_key !== null && !(0, _utils.isString)(params.backblaze_b2_application_key))) {
          _context9.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_application_key must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_application_key)));
      case 14:
        if (!(params.backblaze_b2_key_id !== undefined && params.backblaze_b2_key_id !== null && !(0, _utils.isString)(params.backblaze_b2_key_id))) {
          _context9.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_key_id must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_key_id)));
      case 15:
        if (!(params.cloudflare_secret_key !== undefined && params.cloudflare_secret_key !== null && !(0, _utils.isString)(params.cloudflare_secret_key))) {
          _context9.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_secret_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_secret_key)));
      case 16:
        if (!(params.filebase_secret_key !== undefined && params.filebase_secret_key !== null && !(0, _utils.isString)(params.filebase_secret_key))) {
          _context9.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_secret_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_secret_key)));
      case 17:
        if (!(params.google_cloud_storage_credentials_json !== undefined && params.google_cloud_storage_credentials_json !== null && !(0, _utils.isString)(params.google_cloud_storage_credentials_json))) {
          _context9.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_credentials_json must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_credentials_json)));
      case 18:
        if (!(params.google_cloud_storage_s3_compatible_secret_key !== undefined && params.google_cloud_storage_s3_compatible_secret_key !== null && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_secret_key))) {
          _context9.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_secret_key)));
      case 19:
        if (!(params.linode_secret_key !== undefined && params.linode_secret_key !== null && !(0, _utils.isString)(params.linode_secret_key))) {
          _context9.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_secret_key must be of type String, received ".concat((0, _utils.getType)(params.linode_secret_key)));
      case 20:
        if (!(params.s3_compatible_secret_key !== undefined && params.s3_compatible_secret_key !== null && !(0, _utils.isString)(params.s3_compatible_secret_key))) {
          _context9.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_secret_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_secret_key)));
      case 21:
        if (!(params.wasabi_secret_key !== undefined && params.wasabi_secret_key !== null && !(0, _utils.isString)(params.wasabi_secret_key))) {
          _context9.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_secret_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_secret_key)));
      case 22:
        if (!((0, _utils.isArray)(params.allow_relative_paths) || (0, _utils.isObject)(params.allow_relative_paths))) {
          _context9.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: allow_relative_paths must be of type Boolean, received ".concat((0, _utils.getType)(params.allow_relative_paths)));
      case 23:
        if (!(params.aws_access_key !== undefined && params.aws_access_key !== null && !(0, _utils.isString)(params.aws_access_key))) {
          _context9.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: aws_access_key must be of type String, received ".concat((0, _utils.getType)(params.aws_access_key)));
      case 24:
        if (!(params.azure_blob_storage_account !== undefined && params.azure_blob_storage_account !== null && !(0, _utils.isString)(params.azure_blob_storage_account))) {
          _context9.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_account)));
      case 25:
        if (!(params.azure_blob_storage_container !== undefined && params.azure_blob_storage_container !== null && !(0, _utils.isString)(params.azure_blob_storage_container))) {
          _context9.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_container must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_container)));
      case 26:
        if (!(params.azure_blob_storage_dns_suffix !== undefined && params.azure_blob_storage_dns_suffix !== null && !(0, _utils.isString)(params.azure_blob_storage_dns_suffix))) {
          _context9.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_blob_storage_dns_suffix)));
      case 27:
        if (!((0, _utils.isArray)(params.azure_blob_storage_hierarchical_namespace) || (0, _utils.isObject)(params.azure_blob_storage_hierarchical_namespace))) {
          _context9.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_blob_storage_hierarchical_namespace must be of type Boolean, received ".concat((0, _utils.getType)(params.azure_blob_storage_hierarchical_namespace)));
      case 28:
        if (!(params.azure_files_storage_account !== undefined && params.azure_files_storage_account !== null && !(0, _utils.isString)(params.azure_files_storage_account))) {
          _context9.next = 29;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_account must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_account)));
      case 29:
        if (!(params.azure_files_storage_dns_suffix !== undefined && params.azure_files_storage_dns_suffix !== null && !(0, _utils.isString)(params.azure_files_storage_dns_suffix))) {
          _context9.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_dns_suffix must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_dns_suffix)));
      case 30:
        if (!(params.azure_files_storage_share_name !== undefined && params.azure_files_storage_share_name !== null && !(0, _utils.isString)(params.azure_files_storage_share_name))) {
          _context9.next = 31;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_files_storage_share_name must be of type String, received ".concat((0, _utils.getType)(params.azure_files_storage_share_name)));
      case 31:
        if (!(params.backblaze_b2_bucket !== undefined && params.backblaze_b2_bucket !== null && !(0, _utils.isString)(params.backblaze_b2_bucket))) {
          _context9.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_bucket must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_bucket)));
      case 32:
        if (!(params.backblaze_b2_s3_endpoint !== undefined && params.backblaze_b2_s3_endpoint !== null && !(0, _utils.isString)(params.backblaze_b2_s3_endpoint))) {
          _context9.next = 33;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ".concat((0, _utils.getType)(params.backblaze_b2_s3_endpoint)));
      case 33:
        if (!(params.buffer_uploads !== undefined && params.buffer_uploads !== null && !(0, _utils.isString)(params.buffer_uploads))) {
          _context9.next = 34;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: buffer_uploads must be of type String, received ".concat((0, _utils.getType)(params.buffer_uploads)));
      case 34:
        if (!(params.cloudflare_access_key !== undefined && params.cloudflare_access_key !== null && !(0, _utils.isString)(params.cloudflare_access_key))) {
          _context9.next = 35;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_access_key must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_access_key)));
      case 35:
        if (!(params.cloudflare_bucket !== undefined && params.cloudflare_bucket !== null && !(0, _utils.isString)(params.cloudflare_bucket))) {
          _context9.next = 36;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_bucket must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_bucket)));
      case 36:
        if (!(params.cloudflare_endpoint !== undefined && params.cloudflare_endpoint !== null && !(0, _utils.isString)(params.cloudflare_endpoint))) {
          _context9.next = 37;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cloudflare_endpoint must be of type String, received ".concat((0, _utils.getType)(params.cloudflare_endpoint)));
      case 37:
        if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
          _context9.next = 38;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 38:
        if (!((0, _utils.isArray)(params.dropbox_teams) || (0, _utils.isObject)(params.dropbox_teams))) {
          _context9.next = 39;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dropbox_teams must be of type Boolean, received ".concat((0, _utils.getType)(params.dropbox_teams)));
      case 39:
        if (!((0, _utils.isArray)(params.enable_dedicated_ips) || (0, _utils.isObject)(params.enable_dedicated_ips))) {
          _context9.next = 40;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: enable_dedicated_ips must be of type Boolean, received ".concat((0, _utils.getType)(params.enable_dedicated_ips)));
      case 40:
        if (!(params.filebase_access_key !== undefined && params.filebase_access_key !== null && !(0, _utils.isString)(params.filebase_access_key))) {
          _context9.next = 41;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_access_key must be of type String, received ".concat((0, _utils.getType)(params.filebase_access_key)));
      case 41:
        if (!(params.filebase_bucket !== undefined && params.filebase_bucket !== null && !(0, _utils.isString)(params.filebase_bucket))) {
          _context9.next = 42;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: filebase_bucket must be of type String, received ".concat((0, _utils.getType)(params.filebase_bucket)));
      case 42:
        if (!(params.files_api_key !== undefined && params.files_api_key !== null && !(0, _utils.isString)(params.files_api_key))) {
          _context9.next = 43;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_api_key must be of type String, received ".concat((0, _utils.getType)(params.files_api_key)));
      case 43:
        if (!(params.files_agent_permission_set !== undefined && params.files_agent_permission_set !== null && !(0, _utils.isString)(params.files_agent_permission_set))) {
          _context9.next = 44;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_permission_set must be of type String, received ".concat((0, _utils.getType)(params.files_agent_permission_set)));
      case 44:
        if (!(params.files_agent_root !== undefined && params.files_agent_root !== null && !(0, _utils.isString)(params.files_agent_root))) {
          _context9.next = 45;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_root must be of type String, received ".concat((0, _utils.getType)(params.files_agent_root)));
      case 45:
        if (!(params.files_agent_version !== undefined && params.files_agent_version !== null && !(0, _utils.isString)(params.files_agent_version))) {
          _context9.next = 46;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: files_agent_version must be of type String, received ".concat((0, _utils.getType)(params.files_agent_version)));
      case 46:
        if (!(params.outbound_agent_id !== undefined && params.outbound_agent_id !== null && !(0, _utils.isInt)(params.outbound_agent_id))) {
          _context9.next = 47;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: outbound_agent_id must be of type Int, received ".concat((0, _utils.getType)(params.outbound_agent_id)));
      case 47:
        if (!(params.custom_domain_id !== undefined && params.custom_domain_id !== null && !(0, _utils.isInt)(params.custom_domain_id))) {
          _context9.next = 48;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: custom_domain_id must be of type Int, received ".concat((0, _utils.getType)(params.custom_domain_id)));
      case 48:
        if (!(params.google_cloud_storage_authentication_method !== undefined && params.google_cloud_storage_authentication_method !== null && !(0, _utils.isString)(params.google_cloud_storage_authentication_method))) {
          _context9.next = 49;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_authentication_method must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_authentication_method)));
      case 49:
        if (!(params.google_cloud_storage_bucket !== undefined && params.google_cloud_storage_bucket !== null && !(0, _utils.isString)(params.google_cloud_storage_bucket))) {
          _context9.next = 50;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_bucket must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_bucket)));
      case 50:
        if (!(params.google_cloud_storage_oauth_scope !== undefined && params.google_cloud_storage_oauth_scope !== null && !(0, _utils.isString)(params.google_cloud_storage_oauth_scope))) {
          _context9.next = 51;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_oauth_scope must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_oauth_scope)));
      case 51:
        if (!(params.google_cloud_storage_project_id !== undefined && params.google_cloud_storage_project_id !== null && !(0, _utils.isString)(params.google_cloud_storage_project_id))) {
          _context9.next = 52;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_project_id must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_project_id)));
      case 52:
        if (!(params.google_cloud_storage_s3_compatible_access_key !== undefined && params.google_cloud_storage_s3_compatible_access_key !== null && !(0, _utils.isString)(params.google_cloud_storage_s3_compatible_access_key))) {
          _context9.next = 53;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.google_cloud_storage_s3_compatible_access_key)));
      case 53:
        if (!(params.hostname !== undefined && params.hostname !== null && !(0, _utils.isString)(params.hostname))) {
          _context9.next = 54;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: hostname must be of type String, received ".concat((0, _utils.getType)(params.hostname)));
      case 54:
        if (!(params.linode_access_key !== undefined && params.linode_access_key !== null && !(0, _utils.isString)(params.linode_access_key))) {
          _context9.next = 55;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_access_key must be of type String, received ".concat((0, _utils.getType)(params.linode_access_key)));
      case 55:
        if (!(params.linode_bucket !== undefined && params.linode_bucket !== null && !(0, _utils.isString)(params.linode_bucket))) {
          _context9.next = 56;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_bucket must be of type String, received ".concat((0, _utils.getType)(params.linode_bucket)));
      case 56:
        if (!(params.linode_region !== undefined && params.linode_region !== null && !(0, _utils.isString)(params.linode_region))) {
          _context9.next = 57;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: linode_region must be of type String, received ".concat((0, _utils.getType)(params.linode_region)));
      case 57:
        if (!(params.max_connections !== undefined && params.max_connections !== null && !(0, _utils.isInt)(params.max_connections))) {
          _context9.next = 58;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_connections must be of type Int, received ".concat((0, _utils.getType)(params.max_connections)));
      case 58:
        if (!(params.name !== undefined && params.name !== null && !(0, _utils.isString)(params.name))) {
          _context9.next = 59;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 59:
        if (!(params.one_drive_account_type !== undefined && params.one_drive_account_type !== null && !(0, _utils.isString)(params.one_drive_account_type))) {
          _context9.next = 60;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: one_drive_account_type must be of type String, received ".concat((0, _utils.getType)(params.one_drive_account_type)));
      case 60:
        if (!((0, _utils.isArray)(params.pin_to_site_region) || (0, _utils.isObject)(params.pin_to_site_region))) {
          _context9.next = 61;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: pin_to_site_region must be of type Boolean, received ".concat((0, _utils.getType)(params.pin_to_site_region)));
      case 61:
        if (!(params.port !== undefined && params.port !== null && !(0, _utils.isInt)(params.port))) {
          _context9.next = 62;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: port must be of type Int, received ".concat((0, _utils.getType)(params.port)));
      case 62:
        if (!(params.upload_staging_path !== undefined && params.upload_staging_path !== null && !(0, _utils.isString)(params.upload_staging_path))) {
          _context9.next = 63;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: upload_staging_path must be of type String, received ".concat((0, _utils.getType)(params.upload_staging_path)));
      case 63:
        if (!(params.remote_server_credential_id !== undefined && params.remote_server_credential_id !== null && !(0, _utils.isInt)(params.remote_server_credential_id))) {
          _context9.next = 64;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: remote_server_credential_id must be of type Int, received ".concat((0, _utils.getType)(params.remote_server_credential_id)));
      case 64:
        if (!(params.s3_assume_role_arn !== undefined && params.s3_assume_role_arn !== null && !(0, _utils.isString)(params.s3_assume_role_arn))) {
          _context9.next = 65;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_arn must be of type String, received ".concat((0, _utils.getType)(params.s3_assume_role_arn)));
      case 65:
        if (!(params.s3_assume_role_duration_seconds !== undefined && params.s3_assume_role_duration_seconds !== null && !(0, _utils.isInt)(params.s3_assume_role_duration_seconds))) {
          _context9.next = 66;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_assume_role_duration_seconds must be of type Int, received ".concat((0, _utils.getType)(params.s3_assume_role_duration_seconds)));
      case 66:
        if (!(params.s3_bucket !== undefined && params.s3_bucket !== null && !(0, _utils.isString)(params.s3_bucket))) {
          _context9.next = 67;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_bucket)));
      case 67:
        if (!(params.s3_compatible_access_key !== undefined && params.s3_compatible_access_key !== null && !(0, _utils.isString)(params.s3_compatible_access_key))) {
          _context9.next = 68;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_access_key must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_access_key)));
      case 68:
        if (!(params.s3_compatible_bucket !== undefined && params.s3_compatible_bucket !== null && !(0, _utils.isString)(params.s3_compatible_bucket))) {
          _context9.next = 69;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_bucket must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_bucket)));
      case 69:
        if (!(params.s3_compatible_endpoint !== undefined && params.s3_compatible_endpoint !== null && !(0, _utils.isString)(params.s3_compatible_endpoint))) {
          _context9.next = 70;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_endpoint must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_endpoint)));
      case 70:
        if (!(params.s3_compatible_region !== undefined && params.s3_compatible_region !== null && !(0, _utils.isString)(params.s3_compatible_region))) {
          _context9.next = 71;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_region must be of type String, received ".concat((0, _utils.getType)(params.s3_compatible_region)));
      case 71:
        if (!((0, _utils.isArray)(params.s3_compatible_virtual_hosted_style) || (0, _utils.isObject)(params.s3_compatible_virtual_hosted_style))) {
          _context9.next = 72;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_compatible_virtual_hosted_style must be of type Boolean, received ".concat((0, _utils.getType)(params.s3_compatible_virtual_hosted_style)));
      case 72:
        if (!(params.s3_kms_key_id !== undefined && params.s3_kms_key_id !== null && !(0, _utils.isString)(params.s3_kms_key_id))) {
          _context9.next = 73;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_kms_key_id must be of type String, received ".concat((0, _utils.getType)(params.s3_kms_key_id)));
      case 73:
        if (!(params.s3_region !== undefined && params.s3_region !== null && !(0, _utils.isString)(params.s3_region))) {
          _context9.next = 74;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: s3_region must be of type String, received ".concat((0, _utils.getType)(params.s3_region)));
      case 74:
        if (!(params.server_certificate !== undefined && params.server_certificate !== null && !(0, _utils.isString)(params.server_certificate))) {
          _context9.next = 75;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_certificate must be of type String, received ".concat((0, _utils.getType)(params.server_certificate)));
      case 75:
        if (!(params.server_host_key !== undefined && params.server_host_key !== null && !(0, _utils.isString)(params.server_host_key))) {
          _context9.next = 76;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_host_key must be of type String, received ".concat((0, _utils.getType)(params.server_host_key)));
      case 76:
        if (!(params.server_type !== undefined && params.server_type !== null && !(0, _utils.isString)(params.server_type))) {
          _context9.next = 77;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: server_type must be of type String, received ".concat((0, _utils.getType)(params.server_type)));
      case 77:
        if (!(params.sharepoint_client_id !== undefined && params.sharepoint_client_id !== null && !(0, _utils.isString)(params.sharepoint_client_id))) {
          _context9.next = 78;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sharepoint_client_id must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_client_id)));
      case 78:
        if (!(params.sharepoint_site_url !== undefined && params.sharepoint_site_url !== null && !(0, _utils.isString)(params.sharepoint_site_url))) {
          _context9.next = 79;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sharepoint_site_url must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_site_url)));
      case 79:
        if (!(params.sharepoint_tenant_id !== undefined && params.sharepoint_tenant_id !== null && !(0, _utils.isString)(params.sharepoint_tenant_id))) {
          _context9.next = 80;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: sharepoint_tenant_id must be of type String, received ".concat((0, _utils.getType)(params.sharepoint_tenant_id)));
      case 80:
        if (!(params.ssl !== undefined && params.ssl !== null && !(0, _utils.isString)(params.ssl))) {
          _context9.next = 81;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: ssl must be of type String, received ".concat((0, _utils.getType)(params.ssl)));
      case 81:
        if (!(params.username !== undefined && params.username !== null && !(0, _utils.isString)(params.username))) {
          _context9.next = 82;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: username must be of type String, received ".concat((0, _utils.getType)(params.username)));
      case 82:
        if (!(params.wasabi_access_key !== undefined && params.wasabi_access_key !== null && !(0, _utils.isString)(params.wasabi_access_key))) {
          _context9.next = 83;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_access_key must be of type String, received ".concat((0, _utils.getType)(params.wasabi_access_key)));
      case 83:
        if (!(params.wasabi_bucket !== undefined && params.wasabi_bucket !== null && !(0, _utils.isString)(params.wasabi_bucket))) {
          _context9.next = 84;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_bucket must be of type String, received ".concat((0, _utils.getType)(params.wasabi_bucket)));
      case 84:
        if (!(params.wasabi_region !== undefined && params.wasabi_region !== null && !(0, _utils.isString)(params.wasabi_region))) {
          _context9.next = 85;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: wasabi_region must be of type String, received ".concat((0, _utils.getType)(params.wasabi_region)));
      case 85:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context9.next = 86;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 86:
        _context9.next = 87;
        return _Api.default.sendRequest('/remote_servers', 'POST', params, options);
      case 87:
        response = _context9.sent;
        return _context9.abrupt("return", new _RemoteServer(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 88:
      case "end":
        return _context9.stop();
    }
  }, _callee9);
})));
var _default = exports.default = RemoteServer;
module.exports = RemoteServer;
module.exports.default = RemoteServer;