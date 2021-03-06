import Api from '../Api'
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

  // string # Azure Blob Storage Container name
  getAzureBlobStorageContainer = () => this.attributes.azure_blob_storage_container

  setAzureBlobStorageContainer = value => {
    this.attributes.azure_blob_storage_container = value
  }

  // string # S3-compatible Bucket name
  getS3CompatibleBucket = () => this.attributes.s3_compatible_bucket

  setS3CompatibleBucket = value => {
    this.attributes.s3_compatible_bucket = value
  }

  // string # S3-compatible Bucket name
  getS3CompatibleRegion = () => this.attributes.s3_compatible_region

  setS3CompatibleRegion = value => {
    this.attributes.s3_compatible_region = value
  }

  // string # S3-compatible endpoint
  getS3CompatibleEndpoint = () => this.attributes.s3_compatible_endpoint

  setS3CompatibleEndpoint = value => {
    this.attributes.s3_compatible_endpoint = value
  }

  // string # AWS Access Key.
  getAwsAccessKey = () => this.attributes.aws_access_key

  setAwsAccessKey = value => {
    this.attributes.aws_access_key = value
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

  // string # Wasabi access key.
  getWasabiAccessKey = () => this.attributes.wasabi_access_key

  setWasabiAccessKey = value => {
    this.attributes.wasabi_access_key = value
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

  // string # S3-compatible access key
  getS3CompatibleAccessKey = () => this.attributes.s3_compatible_access_key

  setS3CompatibleAccessKey = value => {
    this.attributes.s3_compatible_access_key = value
  }

  // string # S3-compatible secret key
  getS3CompatibleSecretKey = () => this.attributes.s3_compatible_secret_key

  setS3CompatibleSecretKey = value => {
    this.attributes.s3_compatible_secret_key = value
  }


  // Parameters:
  //   aws_access_key - string - AWS Access Key.
  //   aws_secret_key - string - AWS secret key.
  //   password - string - Password if needed.
  //   private_key - string - Private key if needed.
  //   ssl_certificate - string - SSL client certificate.
  //   google_cloud_storage_credentials_json - string - A JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  //   wasabi_access_key - string - Wasabi access key.
  //   wasabi_secret_key - string - Wasabi secret key.
  //   backblaze_b2_key_id - string - Backblaze B2 Cloud Storage keyID.
  //   backblaze_b2_application_key - string - Backblaze B2 Cloud Storage applicationKey.
  //   rackspace_api_key - string - Rackspace API key from the Rackspace Cloud Control Panel.
  //   reset_authentication - boolean - Reset authenticated account
  //   azure_blob_storage_access_key - string - Azure Blob Storage secret key.
  //   hostname - string - Hostname or IP address
  //   name - string - Internal name for your reference
  //   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
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
  //   s3_compatible_bucket - string - S3-compatible Bucket name
  //   s3_compatible_region - string - S3-compatible Bucket name
  //   s3_compatible_endpoint - string - S3-compatible endpoint
  //   s3_compatible_access_key - string - S3-compatible access key
  //   s3_compatible_secret_key - string - S3-compatible secret key
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['aws_access_key'] && !isString(params['aws_access_key'])) {
      throw new Error(`Bad parameter: aws_access_key must be of type String, received ${getType(aws_access_key)}`)
    }
    if (params['aws_secret_key'] && !isString(params['aws_secret_key'])) {
      throw new Error(`Bad parameter: aws_secret_key must be of type String, received ${getType(aws_secret_key)}`)
    }
    if (params['password'] && !isString(params['password'])) {
      throw new Error(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }
    if (params['private_key'] && !isString(params['private_key'])) {
      throw new Error(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }
    if (params['ssl_certificate'] && !isString(params['ssl_certificate'])) {
      throw new Error(`Bad parameter: ssl_certificate must be of type String, received ${getType(ssl_certificate)}`)
    }
    if (params['google_cloud_storage_credentials_json'] && !isString(params['google_cloud_storage_credentials_json'])) {
      throw new Error(`Bad parameter: google_cloud_storage_credentials_json must be of type String, received ${getType(google_cloud_storage_credentials_json)}`)
    }
    if (params['wasabi_access_key'] && !isString(params['wasabi_access_key'])) {
      throw new Error(`Bad parameter: wasabi_access_key must be of type String, received ${getType(wasabi_access_key)}`)
    }
    if (params['wasabi_secret_key'] && !isString(params['wasabi_secret_key'])) {
      throw new Error(`Bad parameter: wasabi_secret_key must be of type String, received ${getType(wasabi_secret_key)}`)
    }
    if (params['backblaze_b2_key_id'] && !isString(params['backblaze_b2_key_id'])) {
      throw new Error(`Bad parameter: backblaze_b2_key_id must be of type String, received ${getType(backblaze_b2_key_id)}`)
    }
    if (params['backblaze_b2_application_key'] && !isString(params['backblaze_b2_application_key'])) {
      throw new Error(`Bad parameter: backblaze_b2_application_key must be of type String, received ${getType(backblaze_b2_application_key)}`)
    }
    if (params['rackspace_api_key'] && !isString(params['rackspace_api_key'])) {
      throw new Error(`Bad parameter: rackspace_api_key must be of type String, received ${getType(rackspace_api_key)}`)
    }
    if (params['azure_blob_storage_access_key'] && !isString(params['azure_blob_storage_access_key'])) {
      throw new Error(`Bad parameter: azure_blob_storage_access_key must be of type String, received ${getType(azure_blob_storage_access_key)}`)
    }
    if (params['hostname'] && !isString(params['hostname'])) {
      throw new Error(`Bad parameter: hostname must be of type String, received ${getType(hostname)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['max_connections'] && !isInt(params['max_connections'])) {
      throw new Error(`Bad parameter: max_connections must be of type Int, received ${getType(max_connections)}`)
    }
    if (params['port'] && !isInt(params['port'])) {
      throw new Error(`Bad parameter: port must be of type Int, received ${getType(port)}`)
    }
    if (params['s3_bucket'] && !isString(params['s3_bucket'])) {
      throw new Error(`Bad parameter: s3_bucket must be of type String, received ${getType(s3_bucket)}`)
    }
    if (params['s3_region'] && !isString(params['s3_region'])) {
      throw new Error(`Bad parameter: s3_region must be of type String, received ${getType(s3_region)}`)
    }
    if (params['server_certificate'] && !isString(params['server_certificate'])) {
      throw new Error(`Bad parameter: server_certificate must be of type String, received ${getType(server_certificate)}`)
    }
    if (params['server_host_key'] && !isString(params['server_host_key'])) {
      throw new Error(`Bad parameter: server_host_key must be of type String, received ${getType(server_host_key)}`)
    }
    if (params['server_type'] && !isString(params['server_type'])) {
      throw new Error(`Bad parameter: server_type must be of type String, received ${getType(server_type)}`)
    }
    if (params['ssl'] && !isString(params['ssl'])) {
      throw new Error(`Bad parameter: ssl must be of type String, received ${getType(ssl)}`)
    }
    if (params['username'] && !isString(params['username'])) {
      throw new Error(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }
    if (params['google_cloud_storage_bucket'] && !isString(params['google_cloud_storage_bucket'])) {
      throw new Error(`Bad parameter: google_cloud_storage_bucket must be of type String, received ${getType(google_cloud_storage_bucket)}`)
    }
    if (params['google_cloud_storage_project_id'] && !isString(params['google_cloud_storage_project_id'])) {
      throw new Error(`Bad parameter: google_cloud_storage_project_id must be of type String, received ${getType(google_cloud_storage_project_id)}`)
    }
    if (params['backblaze_b2_bucket'] && !isString(params['backblaze_b2_bucket'])) {
      throw new Error(`Bad parameter: backblaze_b2_bucket must be of type String, received ${getType(backblaze_b2_bucket)}`)
    }
    if (params['backblaze_b2_s3_endpoint'] && !isString(params['backblaze_b2_s3_endpoint'])) {
      throw new Error(`Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ${getType(backblaze_b2_s3_endpoint)}`)
    }
    if (params['wasabi_bucket'] && !isString(params['wasabi_bucket'])) {
      throw new Error(`Bad parameter: wasabi_bucket must be of type String, received ${getType(wasabi_bucket)}`)
    }
    if (params['wasabi_region'] && !isString(params['wasabi_region'])) {
      throw new Error(`Bad parameter: wasabi_region must be of type String, received ${getType(wasabi_region)}`)
    }
    if (params['rackspace_username'] && !isString(params['rackspace_username'])) {
      throw new Error(`Bad parameter: rackspace_username must be of type String, received ${getType(rackspace_username)}`)
    }
    if (params['rackspace_region'] && !isString(params['rackspace_region'])) {
      throw new Error(`Bad parameter: rackspace_region must be of type String, received ${getType(rackspace_region)}`)
    }
    if (params['rackspace_container'] && !isString(params['rackspace_container'])) {
      throw new Error(`Bad parameter: rackspace_container must be of type String, received ${getType(rackspace_container)}`)
    }
    if (params['one_drive_account_type'] && !isString(params['one_drive_account_type'])) {
      throw new Error(`Bad parameter: one_drive_account_type must be of type String, received ${getType(one_drive_account_type)}`)
    }
    if (params['azure_blob_storage_account'] && !isString(params['azure_blob_storage_account'])) {
      throw new Error(`Bad parameter: azure_blob_storage_account must be of type String, received ${getType(azure_blob_storage_account)}`)
    }
    if (params['azure_blob_storage_container'] && !isString(params['azure_blob_storage_container'])) {
      throw new Error(`Bad parameter: azure_blob_storage_container must be of type String, received ${getType(azure_blob_storage_container)}`)
    }
    if (params['s3_compatible_bucket'] && !isString(params['s3_compatible_bucket'])) {
      throw new Error(`Bad parameter: s3_compatible_bucket must be of type String, received ${getType(s3_compatible_bucket)}`)
    }
    if (params['s3_compatible_region'] && !isString(params['s3_compatible_region'])) {
      throw new Error(`Bad parameter: s3_compatible_region must be of type String, received ${getType(s3_compatible_region)}`)
    }
    if (params['s3_compatible_endpoint'] && !isString(params['s3_compatible_endpoint'])) {
      throw new Error(`Bad parameter: s3_compatible_endpoint must be of type String, received ${getType(s3_compatible_endpoint)}`)
    }
    if (params['s3_compatible_access_key'] && !isString(params['s3_compatible_access_key'])) {
      throw new Error(`Bad parameter: s3_compatible_access_key must be of type String, received ${getType(s3_compatible_access_key)}`)
    }
    if (params['s3_compatible_secret_key'] && !isString(params['s3_compatible_secret_key'])) {
      throw new Error(`Bad parameter: s3_compatible_secret_key must be of type String, received ${getType(s3_compatible_secret_key)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/remote_servers/${params['id']}`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/remote_servers/${params['id']}`, 'DELETE', params, this.options)
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
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
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
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/remote_servers/${params['id']}`, 'GET', params, options)

    return new RemoteServer(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    RemoteServer.find(id, params, options)

  // Parameters:
  //   aws_access_key - string - AWS Access Key.
  //   aws_secret_key - string - AWS secret key.
  //   password - string - Password if needed.
  //   private_key - string - Private key if needed.
  //   ssl_certificate - string - SSL client certificate.
  //   google_cloud_storage_credentials_json - string - A JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  //   wasabi_access_key - string - Wasabi access key.
  //   wasabi_secret_key - string - Wasabi secret key.
  //   backblaze_b2_key_id - string - Backblaze B2 Cloud Storage keyID.
  //   backblaze_b2_application_key - string - Backblaze B2 Cloud Storage applicationKey.
  //   rackspace_api_key - string - Rackspace API key from the Rackspace Cloud Control Panel.
  //   reset_authentication - boolean - Reset authenticated account
  //   azure_blob_storage_access_key - string - Azure Blob Storage secret key.
  //   hostname - string - Hostname or IP address
  //   name - string - Internal name for your reference
  //   max_connections - int64 - Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
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
  //   s3_compatible_bucket - string - S3-compatible Bucket name
  //   s3_compatible_region - string - S3-compatible Bucket name
  //   s3_compatible_endpoint - string - S3-compatible endpoint
  //   s3_compatible_access_key - string - S3-compatible access key
  //   s3_compatible_secret_key - string - S3-compatible secret key
  static create = async (params = {}, options = {}) => {
    if (params['aws_access_key'] && !isString(params['aws_access_key'])) {
      throw new Error(`Bad parameter: aws_access_key must be of type String, received ${getType(aws_access_key)}`)
    }

    if (params['aws_secret_key'] && !isString(params['aws_secret_key'])) {
      throw new Error(`Bad parameter: aws_secret_key must be of type String, received ${getType(aws_secret_key)}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new Error(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }

    if (params['private_key'] && !isString(params['private_key'])) {
      throw new Error(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }

    if (params['ssl_certificate'] && !isString(params['ssl_certificate'])) {
      throw new Error(`Bad parameter: ssl_certificate must be of type String, received ${getType(ssl_certificate)}`)
    }

    if (params['google_cloud_storage_credentials_json'] && !isString(params['google_cloud_storage_credentials_json'])) {
      throw new Error(`Bad parameter: google_cloud_storage_credentials_json must be of type String, received ${getType(google_cloud_storage_credentials_json)}`)
    }

    if (params['wasabi_access_key'] && !isString(params['wasabi_access_key'])) {
      throw new Error(`Bad parameter: wasabi_access_key must be of type String, received ${getType(wasabi_access_key)}`)
    }

    if (params['wasabi_secret_key'] && !isString(params['wasabi_secret_key'])) {
      throw new Error(`Bad parameter: wasabi_secret_key must be of type String, received ${getType(wasabi_secret_key)}`)
    }

    if (params['backblaze_b2_key_id'] && !isString(params['backblaze_b2_key_id'])) {
      throw new Error(`Bad parameter: backblaze_b2_key_id must be of type String, received ${getType(backblaze_b2_key_id)}`)
    }

    if (params['backblaze_b2_application_key'] && !isString(params['backblaze_b2_application_key'])) {
      throw new Error(`Bad parameter: backblaze_b2_application_key must be of type String, received ${getType(backblaze_b2_application_key)}`)
    }

    if (params['rackspace_api_key'] && !isString(params['rackspace_api_key'])) {
      throw new Error(`Bad parameter: rackspace_api_key must be of type String, received ${getType(rackspace_api_key)}`)
    }

    if (params['azure_blob_storage_access_key'] && !isString(params['azure_blob_storage_access_key'])) {
      throw new Error(`Bad parameter: azure_blob_storage_access_key must be of type String, received ${getType(azure_blob_storage_access_key)}`)
    }

    if (params['hostname'] && !isString(params['hostname'])) {
      throw new Error(`Bad parameter: hostname must be of type String, received ${getType(hostname)}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (params['max_connections'] && !isInt(params['max_connections'])) {
      throw new Error(`Bad parameter: max_connections must be of type Int, received ${getType(max_connections)}`)
    }

    if (params['port'] && !isInt(params['port'])) {
      throw new Error(`Bad parameter: port must be of type Int, received ${getType(port)}`)
    }

    if (params['s3_bucket'] && !isString(params['s3_bucket'])) {
      throw new Error(`Bad parameter: s3_bucket must be of type String, received ${getType(s3_bucket)}`)
    }

    if (params['s3_region'] && !isString(params['s3_region'])) {
      throw new Error(`Bad parameter: s3_region must be of type String, received ${getType(s3_region)}`)
    }

    if (params['server_certificate'] && !isString(params['server_certificate'])) {
      throw new Error(`Bad parameter: server_certificate must be of type String, received ${getType(server_certificate)}`)
    }

    if (params['server_host_key'] && !isString(params['server_host_key'])) {
      throw new Error(`Bad parameter: server_host_key must be of type String, received ${getType(server_host_key)}`)
    }

    if (params['server_type'] && !isString(params['server_type'])) {
      throw new Error(`Bad parameter: server_type must be of type String, received ${getType(server_type)}`)
    }

    if (params['ssl'] && !isString(params['ssl'])) {
      throw new Error(`Bad parameter: ssl must be of type String, received ${getType(ssl)}`)
    }

    if (params['username'] && !isString(params['username'])) {
      throw new Error(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }

    if (params['google_cloud_storage_bucket'] && !isString(params['google_cloud_storage_bucket'])) {
      throw new Error(`Bad parameter: google_cloud_storage_bucket must be of type String, received ${getType(google_cloud_storage_bucket)}`)
    }

    if (params['google_cloud_storage_project_id'] && !isString(params['google_cloud_storage_project_id'])) {
      throw new Error(`Bad parameter: google_cloud_storage_project_id must be of type String, received ${getType(google_cloud_storage_project_id)}`)
    }

    if (params['backblaze_b2_bucket'] && !isString(params['backblaze_b2_bucket'])) {
      throw new Error(`Bad parameter: backblaze_b2_bucket must be of type String, received ${getType(backblaze_b2_bucket)}`)
    }

    if (params['backblaze_b2_s3_endpoint'] && !isString(params['backblaze_b2_s3_endpoint'])) {
      throw new Error(`Bad parameter: backblaze_b2_s3_endpoint must be of type String, received ${getType(backblaze_b2_s3_endpoint)}`)
    }

    if (params['wasabi_bucket'] && !isString(params['wasabi_bucket'])) {
      throw new Error(`Bad parameter: wasabi_bucket must be of type String, received ${getType(wasabi_bucket)}`)
    }

    if (params['wasabi_region'] && !isString(params['wasabi_region'])) {
      throw new Error(`Bad parameter: wasabi_region must be of type String, received ${getType(wasabi_region)}`)
    }

    if (params['rackspace_username'] && !isString(params['rackspace_username'])) {
      throw new Error(`Bad parameter: rackspace_username must be of type String, received ${getType(rackspace_username)}`)
    }

    if (params['rackspace_region'] && !isString(params['rackspace_region'])) {
      throw new Error(`Bad parameter: rackspace_region must be of type String, received ${getType(rackspace_region)}`)
    }

    if (params['rackspace_container'] && !isString(params['rackspace_container'])) {
      throw new Error(`Bad parameter: rackspace_container must be of type String, received ${getType(rackspace_container)}`)
    }

    if (params['one_drive_account_type'] && !isString(params['one_drive_account_type'])) {
      throw new Error(`Bad parameter: one_drive_account_type must be of type String, received ${getType(one_drive_account_type)}`)
    }

    if (params['azure_blob_storage_account'] && !isString(params['azure_blob_storage_account'])) {
      throw new Error(`Bad parameter: azure_blob_storage_account must be of type String, received ${getType(azure_blob_storage_account)}`)
    }

    if (params['azure_blob_storage_container'] && !isString(params['azure_blob_storage_container'])) {
      throw new Error(`Bad parameter: azure_blob_storage_container must be of type String, received ${getType(azure_blob_storage_container)}`)
    }

    if (params['s3_compatible_bucket'] && !isString(params['s3_compatible_bucket'])) {
      throw new Error(`Bad parameter: s3_compatible_bucket must be of type String, received ${getType(s3_compatible_bucket)}`)
    }

    if (params['s3_compatible_region'] && !isString(params['s3_compatible_region'])) {
      throw new Error(`Bad parameter: s3_compatible_region must be of type String, received ${getType(s3_compatible_region)}`)
    }

    if (params['s3_compatible_endpoint'] && !isString(params['s3_compatible_endpoint'])) {
      throw new Error(`Bad parameter: s3_compatible_endpoint must be of type String, received ${getType(s3_compatible_endpoint)}`)
    }

    if (params['s3_compatible_access_key'] && !isString(params['s3_compatible_access_key'])) {
      throw new Error(`Bad parameter: s3_compatible_access_key must be of type String, received ${getType(s3_compatible_access_key)}`)
    }

    if (params['s3_compatible_secret_key'] && !isString(params['s3_compatible_secret_key'])) {
      throw new Error(`Bad parameter: s3_compatible_secret_key must be of type String, received ${getType(s3_compatible_secret_key)}`)
    }

    const response = await Api.sendRequest(`/remote_servers`, 'POST', params, options)

    return new RemoteServer(response?.data, options)
  }
}

export default RemoteServer
