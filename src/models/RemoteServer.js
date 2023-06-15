import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class RemoteServer
 */
class RemoteServer {
  attributes = {}
  options = {}

  constructor(attributes = {}, options = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      const normalizedKey = key.replace('?', '')

      this.attributes[normalizedKey] = value

      Object.defineProperty(this, normalizedKey, { value, writable: false })
    })

    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id
  // int64 # Remote server ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // boolean # If true, this server has been disabled due to failures.  Make any change or set disabled to false to clear this flag.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // string # Type of authentication method
  getAuthenticationMethod = () => this.attributes.authentication_method

  setAuthenticationMethod = value => {
    this.attributes.authentication_method = value
  }

  // string # Hostname or IP address
  getHostname = () => this.attributes.hostname

  setHostname = value => {
    this.attributes.hostname = value
  }

  // string # Initial home folder on remote server
  getRemoteHomePath = () => this.attributes.remote_home_path

  setRemoteHomePath = value => {
    this.attributes.remote_home_path = value
  }

  // string # Internal name for your reference
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // int64 # Port for remote server.  Not needed for S3.
  getPort = () => this.attributes.port

  setPort = value => {
    this.attributes.port = value
  }

  // int64 # Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
  getMaxConnections = () => this.attributes.max_connections

  setMaxConnections = value => {
    this.attributes.max_connections = value
  }

  // boolean # If true, we will ensure that all communications with this remote server are made through the primary region of the site.  This setting can also be overridden by a sitewide setting which will force it to true.
  getPinToSiteRegion = () => this.attributes.pin_to_site_region

  setPinToSiteRegion = value => {
    this.attributes.pin_to_site_region = value
  }

  // string # If set, all communciations with this remote server are made through the provided region.
  getPinnedRegion = () => this.attributes.pinned_region

  setPinnedRegion = value => {
    this.attributes.pinned_region = value
  }

  // string # S3 bucket name
  getS3Bucket = () => this.attributes.s3_bucket

  setS3Bucket = value => {
    this.attributes.s3_bucket = value
  }

  // string # S3 region
  getS3Region = () => this.attributes.s3_region

  setS3Region = value => {
    this.attributes.s3_region = value
  }

  // string # AWS Access Key.
  getAwsAccessKey = () => this.attributes.aws_access_key

  setAwsAccessKey = value => {
    this.attributes.aws_access_key = value
  }

  // string # Remote server certificate
  getServerCertificate = () => this.attributes.server_certificate

  setServerCertificate = value => {
    this.attributes.server_certificate = value
  }

  // string # Remote server SSH Host Key. If provided, we will require that the server host key matches the provided key. Uses OpenSSH format similar to what would go into ~/.ssh/known_hosts
  getServerHostKey = () => this.attributes.server_host_key

  setServerHostKey = value => {
    this.attributes.server_host_key = value
  }

  // string # Remote server type.
  getServerType = () => this.attributes.server_type

  setServerType = value => {
    this.attributes.server_type = value
  }

  // string # Should we require SSL?
  getSsl = () => this.attributes.ssl

  setSsl = value => {
    this.attributes.ssl = value
  }

  // string # Remote server username.  Not needed for S3 buckets.
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // string # Google Cloud Storage bucket name
  getGoogleCloudStorageBucket = () => this.attributes.google_cloud_storage_bucket

  setGoogleCloudStorageBucket = value => {
    this.attributes.google_cloud_storage_bucket = value
  }

  // string # Google Cloud Project ID
  getGoogleCloudStorageProjectId = () => this.attributes.google_cloud_storage_project_id

  setGoogleCloudStorageProjectId = value => {
    this.attributes.google_cloud_storage_project_id = value
  }

  // string # Backblaze B2 Cloud Storage S3 Endpoint
  getBackblazeB2S3Endpoint = () => this.attributes.backblaze_b2_s3_endpoint

  setBackblazeB2S3Endpoint = value => {
    this.attributes.backblaze_b2_s3_endpoint = value
  }

  // string # Backblaze B2 Cloud Storage Bucket name
  getBackblazeB2Bucket = () => this.attributes.backblaze_b2_bucket

  setBackblazeB2Bucket = value => {
    this.attributes.backblaze_b2_bucket = value
  }

  // string # Wasabi Bucket name
  getWasabiBucket = () => this.attributes.wasabi_bucket

  setWasabiBucket = value => {
    this.attributes.wasabi_bucket = value
  }

  // string # Wasabi region
  getWasabiRegion = () => this.attributes.wasabi_region

  setWasabiRegion = value => {
    this.attributes.wasabi_region = value
  }

  // string # Wasabi access key.
  getWasabiAccessKey = () => this.attributes.wasabi_access_key

  setWasabiAccessKey = value => {
    this.attributes.wasabi_access_key = value
  }

  // string # Rackspace username used to login to the Rackspace Cloud Control Panel.
  getRackspaceUsername = () => this.attributes.rackspace_username

  setRackspaceUsername = value => {
    this.attributes.rackspace_username = value
  }

  // string # Three letter airport code for Rackspace region. See https://support.rackspace.com/how-to/about-regions/
  getRackspaceRegion = () => this.attributes.rackspace_region

  setRackspaceRegion = value => {
    this.attributes.rackspace_region = value
  }

  // string # The name of the container (top level directory) where files will sync.
  getRackspaceContainer = () => this.attributes.rackspace_container

  setRackspaceContainer = value => {
    this.attributes.rackspace_container = value
  }

  // string # Returns link to login with an Oauth provider
  getAuthSetupLink = () => this.attributes.auth_setup_link

  setAuthSetupLink = value => {
    this.attributes.auth_setup_link = value
  }

  // string # Either `in_setup` or `complete`
  getAuthStatus = () => this.attributes.auth_status

  setAuthStatus = value => {
    this.attributes.auth_status = value
  }

  // string # Describes the authorized account
  getAuthAccountName = () => this.attributes.auth_account_name

  setAuthAccountName = value => {
    this.attributes.auth_account_name = value
  }

  // string # Either personal or business_other account types
  getOneDriveAccountType = () => this.attributes.one_drive_account_type

  setOneDriveAccountType = value => {
    this.attributes.one_drive_account_type = value
  }

  // string # Azure Blob Storage Account name
  getAzureBlobStorageAccount = () => this.attributes.azure_blob_storage_account

  setAzureBlobStorageAccount = value => {
    this.attributes.azure_blob_storage_account = value
  }

  // string # Shared Access Signature (SAS) token
  getAzureBlobStorageSasToken = () => this.attributes.azure_blob_storage_sas_token

  setAzureBlobStorageSasToken = value => {
    this.attributes.azure_blob_storage_sas_token = value
  }

  // string # Azure Blob Storage Container name
  getAzureBlobStorageContainer = () => this.attributes.azure_blob_storage_container

  setAzureBlobStorageContainer = value => {
    this.attributes.azure_blob_storage_container = value
  }

  // string # Azure File Storage Account name
  getAzureFilesStorageAccount = () => this.attributes.azure_files_storage_account

  setAzureFilesStorageAccount = value => {
    this.attributes.azure_files_storage_account = value
  }

  // string # Shared Access Signature (SAS) token
  getAzureFilesStorageSasToken = () => this.attributes.azure_files_storage_sas_token

  setAzureFilesStorageSasToken = value => {
    this.attributes.azure_files_storage_sas_token = value
  }

  // string # Azure File Storage Share name
  getAzureFilesStorageShareName = () => this.attributes.azure_files_storage_share_name

  setAzureFilesStorageShareName = value => {
    this.attributes.azure_files_storage_share_name = value
  }

  // string # S3-compatible Bucket name
  getS3CompatibleBucket = () => this.attributes.s3_compatible_bucket

  setS3CompatibleBucket = value => {
    this.attributes.s3_compatible_bucket = value
  }

  // string # S3-compatible endpoint
  getS3CompatibleEndpoint = () => this.attributes.s3_compatible_endpoint

  setS3CompatibleEndpoint = value => {
    this.attributes.s3_compatible_endpoint = value
  }

  // string # S3-compatible endpoint
  getS3CompatibleRegion = () => this.attributes.s3_compatible_region

  setS3CompatibleRegion = value => {
    this.attributes.s3_compatible_region = value
  }

  // string # S3-compatible Access Key.
  getS3CompatibleAccessKey = () => this.attributes.s3_compatible_access_key

  setS3CompatibleAccessKey = value => {
    this.attributes.s3_compatible_access_key = value
  }

  // boolean # `true` if remote server only accepts connections from dedicated IPs
  getEnableDedicatedIps = () => this.attributes.enable_dedicated_ips

  setEnableDedicatedIps = value => {
    this.attributes.enable_dedicated_ips = value
  }

  // string # Local permissions for files agent. read_only, write_only, or read_write
  getFilesAgentPermissionSet = () => this.attributes.files_agent_permission_set

  setFilesAgentPermissionSet = value => {
    this.attributes.files_agent_permission_set = value
  }

  // string # Agent local root path
  getFilesAgentRoot = () => this.attributes.files_agent_root

  setFilesAgentRoot = value => {
    this.attributes.files_agent_root = value
  }

  // string # Files Agent API Token
  getFilesAgentApiToken = () => this.attributes.files_agent_api_token

  setFilesAgentApiToken = value => {
    this.attributes.files_agent_api_token = value
  }

  // string # Filebase Bucket name
  getFilebaseBucket = () => this.attributes.filebase_bucket

  setFilebaseBucket = value => {
    this.attributes.filebase_bucket = value
  }

  // string # Filebase Access Key.
  getFilebaseAccessKey = () => this.attributes.filebase_access_key

  setFilebaseAccessKey = value => {
    this.attributes.filebase_access_key = value
  }

  // string # Cloudflare Bucket name
  getCloudflareBucket = () => this.attributes.cloudflare_bucket

  setCloudflareBucket = value => {
    this.attributes.cloudflare_bucket = value
  }

  // string # Cloudflare Access Key.
  getCloudflareAccessKey = () => this.attributes.cloudflare_access_key

  setCloudflareAccessKey = value => {
    this.attributes.cloudflare_access_key = value
  }

  // string # Cloudflare endpoint
  getCloudflareEndpoint = () => this.attributes.cloudflare_endpoint

  setCloudflareEndpoint = value => {
    this.attributes.cloudflare_endpoint = value
  }

  // boolean # List Team folders in root
  getDropboxTeams = () => this.attributes.dropbox_teams

  setDropboxTeams = value => {
    this.attributes.dropbox_teams = value
  }

  // string # Linode Bucket name
  getLinodeBucket = () => this.attributes.linode_bucket

  setLinodeBucket = value => {
    this.attributes.linode_bucket = value
  }

  // string # Linode Access Key.
  getLinodeAccessKey = () => this.attributes.linode_access_key

  setLinodeAccessKey = value => {
    this.attributes.linode_access_key = value
  }

  // string # Linode region
  getLinodeRegion = () => this.attributes.linode_region

  setLinodeRegion = value => {
    this.attributes.linode_region = value
  }

  // string # AWS secret key.
  getAwsSecretKey = () => this.attributes.aws_secret_key

  setAwsSecretKey = value => {
    this.attributes.aws_secret_key = value
  }

  // string # Password if needed.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
  }

  // string # Private key if needed.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
  }

  // string # Passphrase for private key if needed.
  getPrivateKeyPassphrase = () => this.attributes.private_key_passphrase

  setPrivateKeyPassphrase = value => {
    this.attributes.private_key_passphrase = value
  }

  // string # SSL client certificate.
  getSslCertificate = () => this.attributes.ssl_certificate

  setSslCertificate = value => {
    this.attributes.ssl_certificate = value
  }

  // string # A JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  getGoogleCloudStorageCredentialsJson = () => this.attributes.google_cloud_storage_credentials_json

  setGoogleCloudStorageCredentialsJson = value => {
    this.attributes.google_cloud_storage_credentials_json = value
  }

  // string # Wasabi secret key.
  getWasabiSecretKey = () => this.attributes.wasabi_secret_key

  setWasabiSecretKey = value => {
    this.attributes.wasabi_secret_key = value
  }

  // string # Backblaze B2 Cloud Storage keyID.
  getBackblazeB2KeyId = () => this.attributes.backblaze_b2_key_id

  setBackblazeB2KeyId = value => {
    this.attributes.backblaze_b2_key_id = value
  }

  // string # Backblaze B2 Cloud Storage applicationKey.
  getBackblazeB2ApplicationKey = () => this.attributes.backblaze_b2_application_key

  setBackblazeB2ApplicationKey = value => {
    this.attributes.backblaze_b2_application_key = value
  }

  // string # Rackspace API key from the Rackspace Cloud Control Panel.
  getRackspaceApiKey = () => this.attributes.rackspace_api_key

  setRackspaceApiKey = value => {
    this.attributes.rackspace_api_key = value
  }

  // boolean # Reset authenticated account
  getResetAuthentication = () => this.attributes.reset_authentication

  setResetAuthentication = value => {
    this.attributes.reset_authentication = value
  }

  // string # Azure Blob Storage secret key.
  getAzureBlobStorageAccessKey = () => this.attributes.azure_blob_storage_access_key

  setAzureBlobStorageAccessKey = value => {
    this.attributes.azure_blob_storage_access_key = value
  }

  // string # Azure File Storage access key.
  getAzureFilesStorageAccessKey = () => this.attributes.azure_files_storage_access_key

  setAzureFilesStorageAccessKey = value => {
    this.attributes.azure_files_storage_access_key = value
  }

  // string # S3-compatible secret key
  getS3CompatibleSecretKey = () => this.attributes.s3_compatible_secret_key

  setS3CompatibleSecretKey = value => {
    this.attributes.s3_compatible_secret_key = value
  }

  // string # Filebase secret key
  getFilebaseSecretKey = () => this.attributes.filebase_secret_key

  setFilebaseSecretKey = value => {
    this.attributes.filebase_secret_key = value
  }

  // string # Cloudflare secret key
  getCloudflareSecretKey = () => this.attributes.cloudflare_secret_key

  setCloudflareSecretKey = value => {
    this.attributes.cloudflare_secret_key = value
  }

  // string # Linode secret key
  getLinodeSecretKey = () => this.attributes.linode_secret_key

  setLinodeSecretKey = value => {
    this.attributes.linode_secret_key = value
  }


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
  configurationFile = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['api_token'] && !isString(params['api_token'])) {
      throw new errors.InvalidParameterError(`Bad parameter: api_token must be of type String, received ${getType(api_token)}`)
    }
    if (params['permission_set'] && !isString(params['permission_set'])) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(permission_set)}`)
    }
    if (params['root'] && !isString(params['root'])) {
      throw new errors.InvalidParameterError(`Bad parameter: root must be of type String, received ${getType(root)}`)
    }
    if (params['hostname'] && !isString(params['hostname'])) {
      throw new errors.InvalidParameterError(`Bad parameter: hostname must be of type String, received ${getType(hostname)}`)
    }
    if (params['port'] && !isInt(params['port'])) {
      throw new errors.InvalidParameterError(`Bad parameter: port must be of type Int, received ${getType(port)}`)
    }
    if (params['status'] && !isString(params['status'])) {
      throw new errors.InvalidParameterError(`Bad parameter: status must be of type String, received ${getType(status)}`)
    }
    if (params['config_version'] && !isString(params['config_version'])) {
      throw new errors.InvalidParameterError(`Bad parameter: config_version must be of type String, received ${getType(config_version)}`)
    }
    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }
    if (params['public_key'] && !isString(params['public_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(public_key)}`)
    }
    if (params['server_host_key'] && !isString(params['server_host_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_host_key must be of type String, received ${getType(server_host_key)}`)
    }
    if (params['subdomain'] && !isString(params['subdomain'])) {
      throw new errors.InvalidParameterError(`Bad parameter: subdomain must be of type String, received ${getType(subdomain)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/remote_servers/${encodeURIComponent(params['id'])}/configuration_file`, 'POST', params, this.options)

    return new RemoteServerConfigurationFile(response?.data, this.options)
  }

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
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['aws_access_key'] && !isString(params['aws_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_access_key must be of type String, received ${getType(aws_access_key)}`)
    }
    if (params['aws_secret_key'] && !isString(params['aws_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_secret_key must be of type String, received ${getType(aws_secret_key)}`)
    }
    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }
    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }
    if (params['private_key_passphrase'] && !isString(params['private_key_passphrase'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_passphrase must be of type String, received ${getType(private_key_passphrase)}`)
    }
    if (params['ssl_certificate'] && !isString(params['ssl_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_certificate must be of type String, received ${getType(ssl_certificate)}`)
    }
    if (params['google_cloud_storage_credentials_json'] && !isString(params['google_cloud_storage_credentials_json'])) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_credentials_json must be of type String, received ${getType(google_cloud_storage_credentials_json)}`)
    }
    if (params['wasabi_access_key'] && !isString(params['wasabi_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_access_key must be of type String, received ${getType(wasabi_access_key)}`)
    }
    if (params['wasabi_secret_key'] && !isString(params['wasabi_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_secret_key must be of type String, received ${getType(wasabi_secret_key)}`)
    }
    if (params['backblaze_b2_key_id'] && !isString(params['backblaze_b2_key_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_key_id must be of type String, received ${getType(backblaze_b2_key_id)}`)
    }
    if (params['backblaze_b2_application_key'] && !isString(params['backblaze_b2_application_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_application_key must be of type String, received ${getType(backblaze_b2_application_key)}`)
    }
    if (params['rackspace_api_key'] && !isString(params['rackspace_api_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_api_key must be of type String, received ${getType(rackspace_api_key)}`)
    }
    if (params['azure_blob_storage_access_key'] && !isString(params['azure_blob_storage_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_access_key must be of type String, received ${getType(azure_blob_storage_access_key)}`)
    }
    if (params['azure_files_storage_access_key'] && !isString(params['azure_files_storage_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_access_key must be of type String, received ${getType(azure_files_storage_access_key)}`)
    }
    if (params['hostname'] && !isString(params['hostname'])) {
      throw new errors.InvalidParameterError(`Bad parameter: hostname must be of type String, received ${getType(hostname)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['max_connections'] && !isInt(params['max_connections'])) {
      throw new errors.InvalidParameterError(`Bad parameter: max_connections must be of type Int, received ${getType(max_connections)}`)
    }
    if (params['port'] && !isInt(params['port'])) {
      throw new errors.InvalidParameterError(`Bad parameter: port must be of type Int, received ${getType(port)}`)
    }
    if (params['s3_bucket'] && !isString(params['s3_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_bucket must be of type String, received ${getType(s3_bucket)}`)
    }
    if (params['s3_region'] && !isString(params['s3_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_region must be of type String, received ${getType(s3_region)}`)
    }
    if (params['server_certificate'] && !isString(params['server_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(server_certificate)}`)
    }
    if (params['server_host_key'] && !isString(params['server_host_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_host_key must be of type String, received ${getType(server_host_key)}`)
    }
    if (params['server_type'] && !isString(params['server_type'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_type must be of type String, received ${getType(server_type)}`)
    }
    if (params['ssl'] && !isString(params['ssl'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl must be of type String, received ${getType(ssl)}`)
    }
    if (params['username'] && !isString(params['username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }
    if (params['google_cloud_storage_bucket'] && !isString(params['google_cloud_storage_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_bucket must be of type String, received ${getType(google_cloud_storage_bucket)}`)
    }
    if (params['google_cloud_storage_project_id'] && !isString(params['google_cloud_storage_project_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_project_id must be of type String, received ${getType(google_cloud_storage_project_id)}`)
    }
    if (params['backblaze_b2_bucket'] && !isString(params['backblaze_b2_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_bucket must be of type String, received ${getType(backblaze_b2_bucket)}`)
    }
    if (params['backblaze_b2_s3_endpoint'] && !isString(params['backblaze_b2_s3_endpoint'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ${getType(backblaze_b2_s3_endpoint)}`)
    }
    if (params['wasabi_bucket'] && !isString(params['wasabi_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_bucket must be of type String, received ${getType(wasabi_bucket)}`)
    }
    if (params['wasabi_region'] && !isString(params['wasabi_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_region must be of type String, received ${getType(wasabi_region)}`)
    }
    if (params['rackspace_username'] && !isString(params['rackspace_username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_username must be of type String, received ${getType(rackspace_username)}`)
    }
    if (params['rackspace_region'] && !isString(params['rackspace_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_region must be of type String, received ${getType(rackspace_region)}`)
    }
    if (params['rackspace_container'] && !isString(params['rackspace_container'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_container must be of type String, received ${getType(rackspace_container)}`)
    }
    if (params['one_drive_account_type'] && !isString(params['one_drive_account_type'])) {
      throw new errors.InvalidParameterError(`Bad parameter: one_drive_account_type must be of type String, received ${getType(one_drive_account_type)}`)
    }
    if (params['azure_blob_storage_account'] && !isString(params['azure_blob_storage_account'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_account must be of type String, received ${getType(azure_blob_storage_account)}`)
    }
    if (params['azure_blob_storage_container'] && !isString(params['azure_blob_storage_container'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_container must be of type String, received ${getType(azure_blob_storage_container)}`)
    }
    if (params['azure_blob_storage_sas_token'] && !isString(params['azure_blob_storage_sas_token'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_sas_token must be of type String, received ${getType(azure_blob_storage_sas_token)}`)
    }
    if (params['azure_files_storage_account'] && !isString(params['azure_files_storage_account'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_account must be of type String, received ${getType(azure_files_storage_account)}`)
    }
    if (params['azure_files_storage_share_name'] && !isString(params['azure_files_storage_share_name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_share_name must be of type String, received ${getType(azure_files_storage_share_name)}`)
    }
    if (params['azure_files_storage_sas_token'] && !isString(params['azure_files_storage_sas_token'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_sas_token must be of type String, received ${getType(azure_files_storage_sas_token)}`)
    }
    if (params['s3_compatible_bucket'] && !isString(params['s3_compatible_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_bucket must be of type String, received ${getType(s3_compatible_bucket)}`)
    }
    if (params['s3_compatible_endpoint'] && !isString(params['s3_compatible_endpoint'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint must be of type String, received ${getType(s3_compatible_endpoint)}`)
    }
    if (params['s3_compatible_region'] && !isString(params['s3_compatible_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_region must be of type String, received ${getType(s3_compatible_region)}`)
    }
    if (params['s3_compatible_access_key'] && !isString(params['s3_compatible_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_access_key must be of type String, received ${getType(s3_compatible_access_key)}`)
    }
    if (params['s3_compatible_secret_key'] && !isString(params['s3_compatible_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_secret_key must be of type String, received ${getType(s3_compatible_secret_key)}`)
    }
    if (params['files_agent_root'] && !isString(params['files_agent_root'])) {
      throw new errors.InvalidParameterError(`Bad parameter: files_agent_root must be of type String, received ${getType(files_agent_root)}`)
    }
    if (params['files_agent_permission_set'] && !isString(params['files_agent_permission_set'])) {
      throw new errors.InvalidParameterError(`Bad parameter: files_agent_permission_set must be of type String, received ${getType(files_agent_permission_set)}`)
    }
    if (params['filebase_access_key'] && !isString(params['filebase_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_access_key must be of type String, received ${getType(filebase_access_key)}`)
    }
    if (params['filebase_secret_key'] && !isString(params['filebase_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_secret_key must be of type String, received ${getType(filebase_secret_key)}`)
    }
    if (params['filebase_bucket'] && !isString(params['filebase_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_bucket must be of type String, received ${getType(filebase_bucket)}`)
    }
    if (params['cloudflare_access_key'] && !isString(params['cloudflare_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_access_key must be of type String, received ${getType(cloudflare_access_key)}`)
    }
    if (params['cloudflare_secret_key'] && !isString(params['cloudflare_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_secret_key must be of type String, received ${getType(cloudflare_secret_key)}`)
    }
    if (params['cloudflare_bucket'] && !isString(params['cloudflare_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_bucket must be of type String, received ${getType(cloudflare_bucket)}`)
    }
    if (params['cloudflare_endpoint'] && !isString(params['cloudflare_endpoint'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_endpoint must be of type String, received ${getType(cloudflare_endpoint)}`)
    }
    if (params['linode_access_key'] && !isString(params['linode_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_access_key must be of type String, received ${getType(linode_access_key)}`)
    }
    if (params['linode_secret_key'] && !isString(params['linode_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_secret_key must be of type String, received ${getType(linode_secret_key)}`)
    }
    if (params['linode_bucket'] && !isString(params['linode_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_bucket must be of type String, received ${getType(linode_bucket)}`)
    }
    if (params['linode_region'] && !isString(params['linode_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_region must be of type String, received ${getType(linode_region)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/remote_servers/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new RemoteServer(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/remote_servers/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = RemoteServer.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/remote_servers`, 'GET', params, options)

    return response?.data?.map(obj => new RemoteServer(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    RemoteServer.list(params, options)

  // Parameters:
  //   id (required) - int64 - Remote Server ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/remote_servers/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new RemoteServer(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    RemoteServer.find(id, params, options)

  // Parameters:
  //   id (required) - int64 - Remote Server ID.
  static findConfigurationFile = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/remote_servers/${encodeURIComponent(params['id'])}/configuration_file`, 'GET', params, options)

    return new RemoteServerConfigurationFile(response?.data, options)
  }

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
  static create = async (params = {}, options = {}) => {
    if (params['aws_access_key'] && !isString(params['aws_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_access_key must be of type String, received ${getType(params['aws_access_key'])}`)
    }

    if (params['aws_secret_key'] && !isString(params['aws_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_secret_key must be of type String, received ${getType(params['aws_secret_key'])}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params['password'])}`)
    }

    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params['private_key'])}`)
    }

    if (params['private_key_passphrase'] && !isString(params['private_key_passphrase'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_passphrase must be of type String, received ${getType(params['private_key_passphrase'])}`)
    }

    if (params['ssl_certificate'] && !isString(params['ssl_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_certificate must be of type String, received ${getType(params['ssl_certificate'])}`)
    }

    if (params['google_cloud_storage_credentials_json'] && !isString(params['google_cloud_storage_credentials_json'])) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_credentials_json must be of type String, received ${getType(params['google_cloud_storage_credentials_json'])}`)
    }

    if (params['wasabi_access_key'] && !isString(params['wasabi_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_access_key must be of type String, received ${getType(params['wasabi_access_key'])}`)
    }

    if (params['wasabi_secret_key'] && !isString(params['wasabi_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_secret_key must be of type String, received ${getType(params['wasabi_secret_key'])}`)
    }

    if (params['backblaze_b2_key_id'] && !isString(params['backblaze_b2_key_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_key_id must be of type String, received ${getType(params['backblaze_b2_key_id'])}`)
    }

    if (params['backblaze_b2_application_key'] && !isString(params['backblaze_b2_application_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_application_key must be of type String, received ${getType(params['backblaze_b2_application_key'])}`)
    }

    if (params['rackspace_api_key'] && !isString(params['rackspace_api_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_api_key must be of type String, received ${getType(params['rackspace_api_key'])}`)
    }

    if (params['azure_blob_storage_access_key'] && !isString(params['azure_blob_storage_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_access_key must be of type String, received ${getType(params['azure_blob_storage_access_key'])}`)
    }

    if (params['azure_files_storage_access_key'] && !isString(params['azure_files_storage_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_access_key must be of type String, received ${getType(params['azure_files_storage_access_key'])}`)
    }

    if (params['hostname'] && !isString(params['hostname'])) {
      throw new errors.InvalidParameterError(`Bad parameter: hostname must be of type String, received ${getType(params['hostname'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['max_connections'] && !isInt(params['max_connections'])) {
      throw new errors.InvalidParameterError(`Bad parameter: max_connections must be of type Int, received ${getType(params['max_connections'])}`)
    }

    if (params['port'] && !isInt(params['port'])) {
      throw new errors.InvalidParameterError(`Bad parameter: port must be of type Int, received ${getType(params['port'])}`)
    }

    if (params['s3_bucket'] && !isString(params['s3_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_bucket must be of type String, received ${getType(params['s3_bucket'])}`)
    }

    if (params['s3_region'] && !isString(params['s3_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_region must be of type String, received ${getType(params['s3_region'])}`)
    }

    if (params['server_certificate'] && !isString(params['server_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(params['server_certificate'])}`)
    }

    if (params['server_host_key'] && !isString(params['server_host_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_host_key must be of type String, received ${getType(params['server_host_key'])}`)
    }

    if (params['server_type'] && !isString(params['server_type'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_type must be of type String, received ${getType(params['server_type'])}`)
    }

    if (params['ssl'] && !isString(params['ssl'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl must be of type String, received ${getType(params['ssl'])}`)
    }

    if (params['username'] && !isString(params['username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params['username'])}`)
    }

    if (params['google_cloud_storage_bucket'] && !isString(params['google_cloud_storage_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_bucket must be of type String, received ${getType(params['google_cloud_storage_bucket'])}`)
    }

    if (params['google_cloud_storage_project_id'] && !isString(params['google_cloud_storage_project_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_project_id must be of type String, received ${getType(params['google_cloud_storage_project_id'])}`)
    }

    if (params['backblaze_b2_bucket'] && !isString(params['backblaze_b2_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_bucket must be of type String, received ${getType(params['backblaze_b2_bucket'])}`)
    }

    if (params['backblaze_b2_s3_endpoint'] && !isString(params['backblaze_b2_s3_endpoint'])) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ${getType(params['backblaze_b2_s3_endpoint'])}`)
    }

    if (params['wasabi_bucket'] && !isString(params['wasabi_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_bucket must be of type String, received ${getType(params['wasabi_bucket'])}`)
    }

    if (params['wasabi_region'] && !isString(params['wasabi_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_region must be of type String, received ${getType(params['wasabi_region'])}`)
    }

    if (params['rackspace_username'] && !isString(params['rackspace_username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_username must be of type String, received ${getType(params['rackspace_username'])}`)
    }

    if (params['rackspace_region'] && !isString(params['rackspace_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_region must be of type String, received ${getType(params['rackspace_region'])}`)
    }

    if (params['rackspace_container'] && !isString(params['rackspace_container'])) {
      throw new errors.InvalidParameterError(`Bad parameter: rackspace_container must be of type String, received ${getType(params['rackspace_container'])}`)
    }

    if (params['one_drive_account_type'] && !isString(params['one_drive_account_type'])) {
      throw new errors.InvalidParameterError(`Bad parameter: one_drive_account_type must be of type String, received ${getType(params['one_drive_account_type'])}`)
    }

    if (params['azure_blob_storage_account'] && !isString(params['azure_blob_storage_account'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_account must be of type String, received ${getType(params['azure_blob_storage_account'])}`)
    }

    if (params['azure_blob_storage_container'] && !isString(params['azure_blob_storage_container'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_container must be of type String, received ${getType(params['azure_blob_storage_container'])}`)
    }

    if (params['azure_blob_storage_sas_token'] && !isString(params['azure_blob_storage_sas_token'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_sas_token must be of type String, received ${getType(params['azure_blob_storage_sas_token'])}`)
    }

    if (params['azure_files_storage_account'] && !isString(params['azure_files_storage_account'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_account must be of type String, received ${getType(params['azure_files_storage_account'])}`)
    }

    if (params['azure_files_storage_share_name'] && !isString(params['azure_files_storage_share_name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_share_name must be of type String, received ${getType(params['azure_files_storage_share_name'])}`)
    }

    if (params['azure_files_storage_sas_token'] && !isString(params['azure_files_storage_sas_token'])) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_sas_token must be of type String, received ${getType(params['azure_files_storage_sas_token'])}`)
    }

    if (params['s3_compatible_bucket'] && !isString(params['s3_compatible_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_bucket must be of type String, received ${getType(params['s3_compatible_bucket'])}`)
    }

    if (params['s3_compatible_endpoint'] && !isString(params['s3_compatible_endpoint'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint must be of type String, received ${getType(params['s3_compatible_endpoint'])}`)
    }

    if (params['s3_compatible_region'] && !isString(params['s3_compatible_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_region must be of type String, received ${getType(params['s3_compatible_region'])}`)
    }

    if (params['s3_compatible_access_key'] && !isString(params['s3_compatible_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_access_key must be of type String, received ${getType(params['s3_compatible_access_key'])}`)
    }

    if (params['s3_compatible_secret_key'] && !isString(params['s3_compatible_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_secret_key must be of type String, received ${getType(params['s3_compatible_secret_key'])}`)
    }

    if (params['files_agent_root'] && !isString(params['files_agent_root'])) {
      throw new errors.InvalidParameterError(`Bad parameter: files_agent_root must be of type String, received ${getType(params['files_agent_root'])}`)
    }

    if (params['files_agent_permission_set'] && !isString(params['files_agent_permission_set'])) {
      throw new errors.InvalidParameterError(`Bad parameter: files_agent_permission_set must be of type String, received ${getType(params['files_agent_permission_set'])}`)
    }

    if (params['filebase_access_key'] && !isString(params['filebase_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_access_key must be of type String, received ${getType(params['filebase_access_key'])}`)
    }

    if (params['filebase_secret_key'] && !isString(params['filebase_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_secret_key must be of type String, received ${getType(params['filebase_secret_key'])}`)
    }

    if (params['filebase_bucket'] && !isString(params['filebase_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_bucket must be of type String, received ${getType(params['filebase_bucket'])}`)
    }

    if (params['cloudflare_access_key'] && !isString(params['cloudflare_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_access_key must be of type String, received ${getType(params['cloudflare_access_key'])}`)
    }

    if (params['cloudflare_secret_key'] && !isString(params['cloudflare_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_secret_key must be of type String, received ${getType(params['cloudflare_secret_key'])}`)
    }

    if (params['cloudflare_bucket'] && !isString(params['cloudflare_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_bucket must be of type String, received ${getType(params['cloudflare_bucket'])}`)
    }

    if (params['cloudflare_endpoint'] && !isString(params['cloudflare_endpoint'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_endpoint must be of type String, received ${getType(params['cloudflare_endpoint'])}`)
    }

    if (params['linode_access_key'] && !isString(params['linode_access_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_access_key must be of type String, received ${getType(params['linode_access_key'])}`)
    }

    if (params['linode_secret_key'] && !isString(params['linode_secret_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_secret_key must be of type String, received ${getType(params['linode_secret_key'])}`)
    }

    if (params['linode_bucket'] && !isString(params['linode_bucket'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_bucket must be of type String, received ${getType(params['linode_bucket'])}`)
    }

    if (params['linode_region'] && !isString(params['linode_region'])) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_region must be of type String, received ${getType(params['linode_region'])}`)
    }

    const response = await Api.sendRequest(`/remote_servers`, 'POST', params, options)

    return new RemoteServer(response?.data, options)
  }
}

export default RemoteServer
