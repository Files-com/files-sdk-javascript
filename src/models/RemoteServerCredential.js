/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class RemoteServerCredential
 */
class RemoteServerCredential {
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

  // int64 # Remote Server Credential ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Workspace ID (0 for default workspace)
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # Internal name for your reference
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Internal description for your reference
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // string # Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server.
  getServerType = () => this.attributes.server_type

  setServerType = value => {
    this.attributes.server_type = value
  }

  // string # AWS Access Key.
  getAwsAccessKey = () => this.attributes.aws_access_key

  setAwsAccessKey = value => {
    this.attributes.aws_access_key = value
  }

  // string # Google Cloud Storage: S3-compatible Access Key.
  getGoogleCloudStorageS3CompatibleAccessKey = () => this.attributes.google_cloud_storage_s3_compatible_access_key

  setGoogleCloudStorageS3CompatibleAccessKey = value => {
    this.attributes.google_cloud_storage_s3_compatible_access_key = value
  }

  // string # Wasabi: Access Key.
  getWasabiAccessKey = () => this.attributes.wasabi_access_key

  setWasabiAccessKey = value => {
    this.attributes.wasabi_access_key = value
  }

  // string # Azure Blob Storage: Account name
  getAzureBlobStorageAccount = () => this.attributes.azure_blob_storage_account

  setAzureBlobStorageAccount = value => {
    this.attributes.azure_blob_storage_account = value
  }

  // string # Azure Files: Storage Account name
  getAzureFilesStorageAccount = () => this.attributes.azure_files_storage_account

  setAzureFilesStorageAccount = value => {
    this.attributes.azure_files_storage_account = value
  }

  // string # S3-compatible: Access Key
  getS3CompatibleAccessKey = () => this.attributes.s3_compatible_access_key

  setS3CompatibleAccessKey = value => {
    this.attributes.s3_compatible_access_key = value
  }

  // string # Filebase: Access Key.
  getFilebaseAccessKey = () => this.attributes.filebase_access_key

  setFilebaseAccessKey = value => {
    this.attributes.filebase_access_key = value
  }

  // string # Cloudflare: Access Key.
  getCloudflareAccessKey = () => this.attributes.cloudflare_access_key

  setCloudflareAccessKey = value => {
    this.attributes.cloudflare_access_key = value
  }

  // string # Linode: Access Key
  getLinodeAccessKey = () => this.attributes.linode_access_key

  setLinodeAccessKey = value => {
    this.attributes.linode_access_key = value
  }

  // string # Remote server username.
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // string # Password, if needed.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
  }

  // string # Private key, if needed.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
  }

  // string # Passphrase for private key if needed.
  getPrivateKeyPassphrase = () => this.attributes.private_key_passphrase

  setPrivateKeyPassphrase = value => {
    this.attributes.private_key_passphrase = value
  }

  // string # AWS: secret key.
  getAwsSecretKey = () => this.attributes.aws_secret_key

  setAwsSecretKey = value => {
    this.attributes.aws_secret_key = value
  }

  // string # Azure Blob Storage: Access Key
  getAzureBlobStorageAccessKey = () => this.attributes.azure_blob_storage_access_key

  setAzureBlobStorageAccessKey = value => {
    this.attributes.azure_blob_storage_access_key = value
  }

  // string # Azure Blob Storage: Shared Access Signature (SAS) token
  getAzureBlobStorageSasToken = () => this.attributes.azure_blob_storage_sas_token

  setAzureBlobStorageSasToken = value => {
    this.attributes.azure_blob_storage_sas_token = value
  }

  // string # Azure File Storage: Access Key
  getAzureFilesStorageAccessKey = () => this.attributes.azure_files_storage_access_key

  setAzureFilesStorageAccessKey = value => {
    this.attributes.azure_files_storage_access_key = value
  }

  // string # Azure File Storage: Shared Access Signature (SAS) token
  getAzureFilesStorageSasToken = () => this.attributes.azure_files_storage_sas_token

  setAzureFilesStorageSasToken = value => {
    this.attributes.azure_files_storage_sas_token = value
  }

  // string # Backblaze B2 Cloud Storage: applicationKey
  getBackblazeB2ApplicationKey = () => this.attributes.backblaze_b2_application_key

  setBackblazeB2ApplicationKey = value => {
    this.attributes.backblaze_b2_application_key = value
  }

  // string # Backblaze B2 Cloud Storage: keyID
  getBackblazeB2KeyId = () => this.attributes.backblaze_b2_key_id

  setBackblazeB2KeyId = value => {
    this.attributes.backblaze_b2_key_id = value
  }

  // string # Cloudflare: Secret Key
  getCloudflareSecretKey = () => this.attributes.cloudflare_secret_key

  setCloudflareSecretKey = value => {
    this.attributes.cloudflare_secret_key = value
  }

  // string # Filebase: Secret Key
  getFilebaseSecretKey = () => this.attributes.filebase_secret_key

  setFilebaseSecretKey = value => {
    this.attributes.filebase_secret_key = value
  }

  // string # Google Cloud Storage: JSON file that contains the private key. To generate see https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
  getGoogleCloudStorageCredentialsJson = () => this.attributes.google_cloud_storage_credentials_json

  setGoogleCloudStorageCredentialsJson = value => {
    this.attributes.google_cloud_storage_credentials_json = value
  }

  // string # Google Cloud Storage: S3-compatible secret key
  getGoogleCloudStorageS3CompatibleSecretKey = () => this.attributes.google_cloud_storage_s3_compatible_secret_key

  setGoogleCloudStorageS3CompatibleSecretKey = value => {
    this.attributes.google_cloud_storage_s3_compatible_secret_key = value
  }

  // string # Linode: Secret Key
  getLinodeSecretKey = () => this.attributes.linode_secret_key

  setLinodeSecretKey = value => {
    this.attributes.linode_secret_key = value
  }

  // string # S3-compatible: Secret Key
  getS3CompatibleSecretKey = () => this.attributes.s3_compatible_secret_key

  setS3CompatibleSecretKey = value => {
    this.attributes.s3_compatible_secret_key = value
  }

  // string # Wasabi: Secret Key
  getWasabiSecretKey = () => this.attributes.wasabi_secret_key

  setWasabiSecretKey = value => {
    this.attributes.wasabi_secret_key = value
  }

  // Parameters:
  //   workspace_id - int64 - Workspace ID (0 for default workspace)
  //   name - string - Internal name for your reference
  //   description - string - Internal description for your reference
  //   server_type - string - Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server.
  //   aws_access_key - string - AWS Access Key.
  //   azure_blob_storage_account - string - Azure Blob Storage: Account name
  //   azure_files_storage_account - string - Azure Files: Storage Account name
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
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.server_type && !isString(params.server_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: server_type must be of type String, received ${getType(params.server_type)}`)
    }

    if (params.aws_access_key && !isString(params.aws_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_access_key must be of type String, received ${getType(params.aws_access_key)}`)
    }

    if (params.azure_blob_storage_account && !isString(params.azure_blob_storage_account)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_account must be of type String, received ${getType(params.azure_blob_storage_account)}`)
    }

    if (params.azure_files_storage_account && !isString(params.azure_files_storage_account)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_account must be of type String, received ${getType(params.azure_files_storage_account)}`)
    }

    if (params.cloudflare_access_key && !isString(params.cloudflare_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_access_key must be of type String, received ${getType(params.cloudflare_access_key)}`)
    }

    if (params.filebase_access_key && !isString(params.filebase_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_access_key must be of type String, received ${getType(params.filebase_access_key)}`)
    }

    if (params.google_cloud_storage_s3_compatible_access_key && !isString(params.google_cloud_storage_s3_compatible_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ${getType(params.google_cloud_storage_s3_compatible_access_key)}`)
    }

    if (params.linode_access_key && !isString(params.linode_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_access_key must be of type String, received ${getType(params.linode_access_key)}`)
    }

    if (params.s3_compatible_access_key && !isString(params.s3_compatible_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_access_key must be of type String, received ${getType(params.s3_compatible_access_key)}`)
    }

    if (params.username && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.wasabi_access_key && !isString(params.wasabi_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_access_key must be of type String, received ${getType(params.wasabi_access_key)}`)
    }

    if (params.password && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (params.private_key && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_passphrase && !isString(params.private_key_passphrase)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_passphrase must be of type String, received ${getType(params.private_key_passphrase)}`)
    }

    if (params.aws_secret_key && !isString(params.aws_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_secret_key must be of type String, received ${getType(params.aws_secret_key)}`)
    }

    if (params.azure_blob_storage_access_key && !isString(params.azure_blob_storage_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_access_key must be of type String, received ${getType(params.azure_blob_storage_access_key)}`)
    }

    if (params.azure_blob_storage_sas_token && !isString(params.azure_blob_storage_sas_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_sas_token must be of type String, received ${getType(params.azure_blob_storage_sas_token)}`)
    }

    if (params.azure_files_storage_access_key && !isString(params.azure_files_storage_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_access_key must be of type String, received ${getType(params.azure_files_storage_access_key)}`)
    }

    if (params.azure_files_storage_sas_token && !isString(params.azure_files_storage_sas_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_sas_token must be of type String, received ${getType(params.azure_files_storage_sas_token)}`)
    }

    if (params.backblaze_b2_application_key && !isString(params.backblaze_b2_application_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_application_key must be of type String, received ${getType(params.backblaze_b2_application_key)}`)
    }

    if (params.backblaze_b2_key_id && !isString(params.backblaze_b2_key_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_key_id must be of type String, received ${getType(params.backblaze_b2_key_id)}`)
    }

    if (params.cloudflare_secret_key && !isString(params.cloudflare_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_secret_key must be of type String, received ${getType(params.cloudflare_secret_key)}`)
    }

    if (params.filebase_secret_key && !isString(params.filebase_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_secret_key must be of type String, received ${getType(params.filebase_secret_key)}`)
    }

    if (params.google_cloud_storage_credentials_json && !isString(params.google_cloud_storage_credentials_json)) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_credentials_json must be of type String, received ${getType(params.google_cloud_storage_credentials_json)}`)
    }

    if (params.google_cloud_storage_s3_compatible_secret_key && !isString(params.google_cloud_storage_s3_compatible_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ${getType(params.google_cloud_storage_s3_compatible_secret_key)}`)
    }

    if (params.linode_secret_key && !isString(params.linode_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_secret_key must be of type String, received ${getType(params.linode_secret_key)}`)
    }

    if (params.s3_compatible_secret_key && !isString(params.s3_compatible_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_secret_key must be of type String, received ${getType(params.s3_compatible_secret_key)}`)
    }

    if (params.wasabi_secret_key && !isString(params.wasabi_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_secret_key must be of type String, received ${getType(params.wasabi_secret_key)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/remote_server_credentials/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new RemoteServerCredential(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/remote_server_credentials/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await RemoteServerCredential.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id` and `name`. Valid field combinations are `[ workspace_id, name ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/remote_server_credentials', 'GET', params, options)

    return response?.data?.map(obj => new RemoteServerCredential(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    RemoteServerCredential.list(params, options)

  // Parameters:
  //   id (required) - int64 - Remote Server Credential ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/remote_server_credentials/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new RemoteServerCredential(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    RemoteServerCredential.find(id, params, options)

  // Parameters:
  //   workspace_id - int64 - Workspace ID (0 for default workspace)
  //   name - string - Internal name for your reference
  //   description - string - Internal description for your reference
  //   server_type - string - Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server.
  //   aws_access_key - string - AWS Access Key.
  //   azure_blob_storage_account - string - Azure Blob Storage: Account name
  //   azure_files_storage_account - string - Azure Files: Storage Account name
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
  static create = async (params = {}, options = {}) => {
    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.server_type && !isString(params.server_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: server_type must be of type String, received ${getType(params.server_type)}`)
    }

    if (params.aws_access_key && !isString(params.aws_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_access_key must be of type String, received ${getType(params.aws_access_key)}`)
    }

    if (params.azure_blob_storage_account && !isString(params.azure_blob_storage_account)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_account must be of type String, received ${getType(params.azure_blob_storage_account)}`)
    }

    if (params.azure_files_storage_account && !isString(params.azure_files_storage_account)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_account must be of type String, received ${getType(params.azure_files_storage_account)}`)
    }

    if (params.cloudflare_access_key && !isString(params.cloudflare_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_access_key must be of type String, received ${getType(params.cloudflare_access_key)}`)
    }

    if (params.filebase_access_key && !isString(params.filebase_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_access_key must be of type String, received ${getType(params.filebase_access_key)}`)
    }

    if (params.google_cloud_storage_s3_compatible_access_key && !isString(params.google_cloud_storage_s3_compatible_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_s3_compatible_access_key must be of type String, received ${getType(params.google_cloud_storage_s3_compatible_access_key)}`)
    }

    if (params.linode_access_key && !isString(params.linode_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_access_key must be of type String, received ${getType(params.linode_access_key)}`)
    }

    if (params.s3_compatible_access_key && !isString(params.s3_compatible_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_access_key must be of type String, received ${getType(params.s3_compatible_access_key)}`)
    }

    if (params.username && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.wasabi_access_key && !isString(params.wasabi_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_access_key must be of type String, received ${getType(params.wasabi_access_key)}`)
    }

    if (params.password && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (params.private_key && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_passphrase && !isString(params.private_key_passphrase)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_passphrase must be of type String, received ${getType(params.private_key_passphrase)}`)
    }

    if (params.aws_secret_key && !isString(params.aws_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_secret_key must be of type String, received ${getType(params.aws_secret_key)}`)
    }

    if (params.azure_blob_storage_access_key && !isString(params.azure_blob_storage_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_access_key must be of type String, received ${getType(params.azure_blob_storage_access_key)}`)
    }

    if (params.azure_blob_storage_sas_token && !isString(params.azure_blob_storage_sas_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_blob_storage_sas_token must be of type String, received ${getType(params.azure_blob_storage_sas_token)}`)
    }

    if (params.azure_files_storage_access_key && !isString(params.azure_files_storage_access_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_access_key must be of type String, received ${getType(params.azure_files_storage_access_key)}`)
    }

    if (params.azure_files_storage_sas_token && !isString(params.azure_files_storage_sas_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_files_storage_sas_token must be of type String, received ${getType(params.azure_files_storage_sas_token)}`)
    }

    if (params.backblaze_b2_application_key && !isString(params.backblaze_b2_application_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_application_key must be of type String, received ${getType(params.backblaze_b2_application_key)}`)
    }

    if (params.backblaze_b2_key_id && !isString(params.backblaze_b2_key_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: backblaze_b2_key_id must be of type String, received ${getType(params.backblaze_b2_key_id)}`)
    }

    if (params.cloudflare_secret_key && !isString(params.cloudflare_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: cloudflare_secret_key must be of type String, received ${getType(params.cloudflare_secret_key)}`)
    }

    if (params.filebase_secret_key && !isString(params.filebase_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: filebase_secret_key must be of type String, received ${getType(params.filebase_secret_key)}`)
    }

    if (params.google_cloud_storage_credentials_json && !isString(params.google_cloud_storage_credentials_json)) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_credentials_json must be of type String, received ${getType(params.google_cloud_storage_credentials_json)}`)
    }

    if (params.google_cloud_storage_s3_compatible_secret_key && !isString(params.google_cloud_storage_s3_compatible_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: google_cloud_storage_s3_compatible_secret_key must be of type String, received ${getType(params.google_cloud_storage_s3_compatible_secret_key)}`)
    }

    if (params.linode_secret_key && !isString(params.linode_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: linode_secret_key must be of type String, received ${getType(params.linode_secret_key)}`)
    }

    if (params.s3_compatible_secret_key && !isString(params.s3_compatible_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_secret_key must be of type String, received ${getType(params.s3_compatible_secret_key)}`)
    }

    if (params.wasabi_secret_key && !isString(params.wasabi_secret_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: wasabi_secret_key must be of type String, received ${getType(params.wasabi_secret_key)}`)
    }

    const response = await Api.sendRequest('/remote_server_credentials', 'POST', params, options)

    return new RemoteServerCredential(response?.data, options)
  }
}

export default RemoteServerCredential

module.exports = RemoteServerCredential
module.exports.default = RemoteServerCredential
