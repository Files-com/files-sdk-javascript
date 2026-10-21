import Files from '../Files'

/**
 * A RemoteServerCredential is a way to store a credential for Remote Servers in a centralized vault and then reference
 * it from Remote Server definitions.
 */
declare class RemoteServerCredential {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: RemoteServerCredential.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: RemoteServerCredential.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Remote Server Credential ID */
  readonly id?: number | null

  /** Workspace ID (0 for default workspace) */
  readonly workspace_id?: number | null

  /** Internal name for your reference */
  readonly name?: string | null

  /** Internal description for your reference */
  readonly description?: string | null

  /** Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server. */
  readonly server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

  /** AWS Access Key. */
  readonly aws_access_key?: string | null

  /** AWS IAM Role ARN for AssumeRole authentication. */
  readonly s3_assume_role_arn?: string | null

  /** Session duration in seconds for AssumeRole authentication (900-43200). */
  readonly s3_assume_role_duration_seconds?: number | null

  /** External ID for AssumeRole authentication. */
  readonly s3_assume_role_external_id?: string | null

  /** Google Cloud Storage: S3-compatible Access Key. */
  readonly google_cloud_storage_s3_compatible_access_key?: string | null

  /** Wasabi: Access Key. */
  readonly wasabi_access_key?: string | null

  /** S3-compatible: Access Key */
  readonly s3_compatible_access_key?: string | null

  /** Filebase: Access Key. */
  readonly filebase_access_key?: string | null

  /** Cloudflare: Access Key. */
  readonly cloudflare_access_key?: string | null

  /** Linode: Access Key */
  readonly linode_access_key?: string | null

  /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
  readonly sharepoint_tenant_id?: string | null

  /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
  readonly sharepoint_client_id?: string | null

  /** SharePoint: App-only credential type. Either secret or certificate. */
  readonly sharepoint_app_credential_type?: string | null

  /** Remote server username. */
  readonly username?: string | null

  /** Password, if needed. */
  readonly password?: string

  /** Private key, if needed. */
  readonly private_key?: string

  /** Passphrase for private key if needed. */
  readonly private_key_passphrase?: string

  /** AWS: secret key. */
  readonly aws_secret_key?: string

  /** Azure Blob Storage: Access Key */
  readonly azure_blob_storage_access_key?: string

  /** Azure Blob Storage: Shared Access Signature (SAS) token */
  readonly azure_blob_storage_sas_token?: string

  /** Azure File Storage: Access Key */
  readonly azure_files_storage_access_key?: string

  /** Azure File Storage: Shared Access Signature (SAS) token */
  readonly azure_files_storage_sas_token?: string

  /** Backblaze B2 Cloud Storage: applicationKey */
  readonly backblaze_b2_application_key?: string

  /** Backblaze B2 Cloud Storage: keyID */
  readonly backblaze_b2_key_id?: string

  /** Cloudflare: Secret Key */
  readonly cloudflare_secret_key?: string

  /** Filebase: Secret Key */
  readonly filebase_secret_key?: string

  /**
   * Google Cloud Storage: JSON file that contains the private key. To generate see
   * https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
   */
  readonly google_cloud_storage_credentials_json?: string

  /** Google Cloud Storage: S3-compatible secret key */
  readonly google_cloud_storage_s3_compatible_secret_key?: string

  /** Linode: Secret Key */
  readonly linode_secret_key?: string

  /** S3-compatible: Secret Key */
  readonly s3_compatible_secret_key?: string

  /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
  readonly sharepoint_client_certificate?: string

  /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
  readonly sharepoint_client_secret?: string

  /** Wasabi: Secret Key */
  readonly wasabi_secret_key?: string

  /** ID of Remote Server Credential to copy omitted values from. */
  readonly copy_values_from_credential_id?: number

  /** Remote Server Credential ID */
  getId(): number | null | undefined

  /** Workspace ID (0 for default workspace) */
  getWorkspaceId(): number | null | undefined

  /** Internal name for your reference */
  getName(): string | null | undefined

  /** Internal description for your reference */
  getDescription(): string | null | undefined

  /** Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server. */
  getServerType(): 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null | undefined

  /** AWS Access Key. */
  getAwsAccessKey(): string | null | undefined

  /** AWS IAM Role ARN for AssumeRole authentication. */
  getS3AssumeRoleArn(): string | null | undefined

  /** Session duration in seconds for AssumeRole authentication (900-43200). */
  getS3AssumeRoleDurationSeconds(): number | null | undefined

  /** External ID for AssumeRole authentication. */
  getS3AssumeRoleExternalId(): string | null | undefined

  /** Google Cloud Storage: S3-compatible Access Key. */
  getGoogleCloudStorageS3CompatibleAccessKey(): string | null | undefined

  /** Wasabi: Access Key. */
  getWasabiAccessKey(): string | null | undefined

  /** S3-compatible: Access Key */
  getS3CompatibleAccessKey(): string | null | undefined

  /** Filebase: Access Key. */
  getFilebaseAccessKey(): string | null | undefined

  /** Cloudflare: Access Key. */
  getCloudflareAccessKey(): string | null | undefined

  /** Linode: Access Key */
  getLinodeAccessKey(): string | null | undefined

  /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
  getSharepointTenantId(): string | null | undefined

  /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
  getSharepointClientId(): string | null | undefined

  /** SharePoint: App-only credential type. Either secret or certificate. */
  getSharepointAppCredentialType(): string | null | undefined

  /** Remote server username. */
  getUsername(): string | null | undefined

  /** Password, if needed. */
  getPassword(): string | undefined

  /** Private key, if needed. */
  getPrivateKey(): string | undefined

  /** Passphrase for private key if needed. */
  getPrivateKeyPassphrase(): string | undefined

  /** AWS: secret key. */
  getAwsSecretKey(): string | undefined

  /** Azure Blob Storage: Access Key */
  getAzureBlobStorageAccessKey(): string | undefined

  /** Azure Blob Storage: Shared Access Signature (SAS) token */
  getAzureBlobStorageSasToken(): string | undefined

  /** Azure File Storage: Access Key */
  getAzureFilesStorageAccessKey(): string | undefined

  /** Azure File Storage: Shared Access Signature (SAS) token */
  getAzureFilesStorageSasToken(): string | undefined

  /** Backblaze B2 Cloud Storage: applicationKey */
  getBackblazeB2ApplicationKey(): string | undefined

  /** Backblaze B2 Cloud Storage: keyID */
  getBackblazeB2KeyId(): string | undefined

  /** Cloudflare: Secret Key */
  getCloudflareSecretKey(): string | undefined

  /** Filebase: Secret Key */
  getFilebaseSecretKey(): string | undefined

  /**
   * Google Cloud Storage: JSON file that contains the private key. To generate see
   * https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
   */
  getGoogleCloudStorageCredentialsJson(): string | undefined

  /** Google Cloud Storage: S3-compatible secret key */
  getGoogleCloudStorageS3CompatibleSecretKey(): string | undefined

  /** Linode: Secret Key */
  getLinodeSecretKey(): string | undefined

  /** S3-compatible: Secret Key */
  getS3CompatibleSecretKey(): string | undefined

  /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
  getSharepointClientCertificate(): string | undefined

  /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
  getSharepointClientSecret(): string | undefined

  /** Wasabi: Secret Key */
  getWasabiSecretKey(): string | undefined

  /** ID of Remote Server Credential to copy omitted values from. */
  getCopyValuesFromCredentialId(): number | undefined

  /** Remote Server Credential ID */
  setId(value: number): void

  /** Workspace ID (0 for default workspace) */
  setWorkspaceId(value: number): void

  /** Internal name for your reference */
  setName(value: string): void

  /** Internal description for your reference */
  setDescription(value: string): void

  /** Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server. */
  setServerType(value: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com'): void

  /** AWS Access Key. */
  setAwsAccessKey(value: string): void

  /** AWS IAM Role ARN for AssumeRole authentication. */
  setS3AssumeRoleArn(value: string): void

  /** Session duration in seconds for AssumeRole authentication (900-43200). */
  setS3AssumeRoleDurationSeconds(value: number): void

  /** External ID for AssumeRole authentication. */
  setS3AssumeRoleExternalId(value: string): void

  /** Google Cloud Storage: S3-compatible Access Key. */
  setGoogleCloudStorageS3CompatibleAccessKey(value: string): void

  /** Wasabi: Access Key. */
  setWasabiAccessKey(value: string): void

  /** S3-compatible: Access Key */
  setS3CompatibleAccessKey(value: string): void

  /** Filebase: Access Key. */
  setFilebaseAccessKey(value: string): void

  /** Cloudflare: Access Key. */
  setCloudflareAccessKey(value: string): void

  /** Linode: Access Key */
  setLinodeAccessKey(value: string): void

  /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
  setSharepointTenantId(value: string): void

  /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
  setSharepointClientId(value: string): void

  /** SharePoint: App-only credential type. Either secret or certificate. */
  setSharepointAppCredentialType(value: string): void

  /** Remote server username. */
  setUsername(value: string): void

  /** Password, if needed. */
  setPassword(value: string): void

  /** Private key, if needed. */
  setPrivateKey(value: string): void

  /** Passphrase for private key if needed. */
  setPrivateKeyPassphrase(value: string): void

  /** AWS: secret key. */
  setAwsSecretKey(value: string): void

  /** Azure Blob Storage: Access Key */
  setAzureBlobStorageAccessKey(value: string): void

  /** Azure Blob Storage: Shared Access Signature (SAS) token */
  setAzureBlobStorageSasToken(value: string): void

  /** Azure File Storage: Access Key */
  setAzureFilesStorageAccessKey(value: string): void

  /** Azure File Storage: Shared Access Signature (SAS) token */
  setAzureFilesStorageSasToken(value: string): void

  /** Backblaze B2 Cloud Storage: applicationKey */
  setBackblazeB2ApplicationKey(value: string): void

  /** Backblaze B2 Cloud Storage: keyID */
  setBackblazeB2KeyId(value: string): void

  /** Cloudflare: Secret Key */
  setCloudflareSecretKey(value: string): void

  /** Filebase: Secret Key */
  setFilebaseSecretKey(value: string): void

  /**
   * Google Cloud Storage: JSON file that contains the private key. To generate see
   * https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
   */
  setGoogleCloudStorageCredentialsJson(value: string): void

  /** Google Cloud Storage: S3-compatible secret key */
  setGoogleCloudStorageS3CompatibleSecretKey(value: string): void

  /** Linode: Secret Key */
  setLinodeSecretKey(value: string): void

  /** S3-compatible: Secret Key */
  setS3CompatibleSecretKey(value: string): void

  /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
  setSharepointClientCertificate(value: string): void

  /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
  setSharepointClientSecret(value: string): void

  /** Wasabi: Secret Key */
  setWasabiSecretKey(value: string): void

  /** ID of Remote Server Credential to copy omitted values from. */
  setCopyValuesFromCredentialId(value: number): void

  /** Update Remote Server Credential */
  update(params?: RemoteServerCredential.UpdateParams): Promise<this>

  /** Delete Remote Server Credential */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Remote Server Credentials */
  static list(params?: RemoteServerCredential.ListParams, options?: Files.RequestOptions): Promise<RemoteServerCredential[]>

  /** Alias of `list()`. */
  static all(params?: RemoteServerCredential.ListParams, options?: Files.RequestOptions): Promise<RemoteServerCredential[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: RemoteServerCredential.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<RemoteServerCredential>

  /**
   * Show Remote Server Credential
   * @param id - Remote Server Credential ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteServerCredential>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteServerCredential>

  /** Create Remote Server Credential */
  static create(params?: RemoteServerCredential.CreateParams, options?: Files.RequestOptions): Promise<RemoteServerCredential>
}

declare namespace RemoteServerCredential {
  /** The fields of `RemoteServerCredential` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Remote Server Credential ID */
    id?: number | null

    /** Workspace ID (0 for default workspace) */
    workspace_id?: number | null

    /** Internal name for your reference */
    name?: string | null

    /** Internal description for your reference */
    description?: string | null

    /** Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server. */
    server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

    /** AWS Access Key. */
    aws_access_key?: string | null

    /** AWS IAM Role ARN for AssumeRole authentication. */
    s3_assume_role_arn?: string | null

    /** Session duration in seconds for AssumeRole authentication (900-43200). */
    s3_assume_role_duration_seconds?: number | null

    /** External ID for AssumeRole authentication. */
    s3_assume_role_external_id?: string | null

    /** Google Cloud Storage: S3-compatible Access Key. */
    google_cloud_storage_s3_compatible_access_key?: string | null

    /** Wasabi: Access Key. */
    wasabi_access_key?: string | null

    /** S3-compatible: Access Key */
    s3_compatible_access_key?: string | null

    /** Filebase: Access Key. */
    filebase_access_key?: string | null

    /** Cloudflare: Access Key. */
    cloudflare_access_key?: string | null

    /** Linode: Access Key */
    linode_access_key?: string | null

    /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
    sharepoint_tenant_id?: string | null

    /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
    sharepoint_client_id?: string | null

    /** SharePoint: App-only credential type. Either secret or certificate. */
    sharepoint_app_credential_type?: string | null

    /** Remote server username. */
    username?: string | null

    /** Password, if needed. */
    password?: string

    /** Private key, if needed. */
    private_key?: string

    /** Passphrase for private key if needed. */
    private_key_passphrase?: string

    /** AWS: secret key. */
    aws_secret_key?: string

    /** Azure Blob Storage: Access Key */
    azure_blob_storage_access_key?: string

    /** Azure Blob Storage: Shared Access Signature (SAS) token */
    azure_blob_storage_sas_token?: string

    /** Azure File Storage: Access Key */
    azure_files_storage_access_key?: string

    /** Azure File Storage: Shared Access Signature (SAS) token */
    azure_files_storage_sas_token?: string

    /** Backblaze B2 Cloud Storage: applicationKey */
    backblaze_b2_application_key?: string

    /** Backblaze B2 Cloud Storage: keyID */
    backblaze_b2_key_id?: string

    /** Cloudflare: Secret Key */
    cloudflare_secret_key?: string

    /** Filebase: Secret Key */
    filebase_secret_key?: string

    /**
     * Google Cloud Storage: JSON file that contains the private key. To generate see
     * https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
     */
    google_cloud_storage_credentials_json?: string

    /** Google Cloud Storage: S3-compatible secret key */
    google_cloud_storage_s3_compatible_secret_key?: string

    /** Linode: Secret Key */
    linode_secret_key?: string

    /** S3-compatible: Secret Key */
    s3_compatible_secret_key?: string

    /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
    sharepoint_client_certificate?: string

    /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
    sharepoint_client_secret?: string

    /** Wasabi: Secret Key */
    wasabi_secret_key?: string

    /** ID of Remote Server Credential to copy omitted values from. */
    copy_values_from_credential_id?: number
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`
     * and `name`. Valid field combinations are `[ workspace_id, name ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`. */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** Internal name for your reference */
    name?: string

    /** Internal description for your reference */
    description?: string

    /** Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server. */
    server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com'

    /** AWS Access Key. */
    aws_access_key?: string

    /** AWS IAM Role ARN for AssumeRole authentication. */
    s3_assume_role_arn?: string

    /** Session duration in seconds for AssumeRole authentication (900-43200). */
    s3_assume_role_duration_seconds?: number

    /** Cloudflare: Access Key. */
    cloudflare_access_key?: string

    /** Filebase: Access Key. */
    filebase_access_key?: string

    /** Google Cloud Storage: S3-compatible Access Key. */
    google_cloud_storage_s3_compatible_access_key?: string

    /** Linode: Access Key */
    linode_access_key?: string

    /** S3-compatible: Access Key */
    s3_compatible_access_key?: string

    /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
    sharepoint_client_id?: string

    /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
    sharepoint_tenant_id?: string

    /** Remote server username. */
    username?: string

    /** Wasabi: Access Key. */
    wasabi_access_key?: string

    /** Password, if needed. */
    password?: string

    /** Private key, if needed. */
    private_key?: string

    /** Passphrase for private key if needed. */
    private_key_passphrase?: string

    /** AWS: secret key. */
    aws_secret_key?: string

    /** Azure Blob Storage: Access Key */
    azure_blob_storage_access_key?: string

    /** Azure Blob Storage: Shared Access Signature (SAS) token */
    azure_blob_storage_sas_token?: string

    /** Azure File Storage: Access Key */
    azure_files_storage_access_key?: string

    /** Azure File Storage: Shared Access Signature (SAS) token */
    azure_files_storage_sas_token?: string

    /** Backblaze B2 Cloud Storage: applicationKey */
    backblaze_b2_application_key?: string

    /** Backblaze B2 Cloud Storage: keyID */
    backblaze_b2_key_id?: string

    /** Cloudflare: Secret Key */
    cloudflare_secret_key?: string

    /** Filebase: Secret Key */
    filebase_secret_key?: string

    /**
     * Google Cloud Storage: JSON file that contains the private key. To generate see
     * https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
     */
    google_cloud_storage_credentials_json?: string

    /** Google Cloud Storage: S3-compatible secret key */
    google_cloud_storage_s3_compatible_secret_key?: string

    /** Linode: Secret Key */
    linode_secret_key?: string

    /** S3-compatible: Secret Key */
    s3_compatible_secret_key?: string

    /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
    sharepoint_client_certificate?: string

    /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
    sharepoint_client_secret?: string

    /** Wasabi: Secret Key */
    wasabi_secret_key?: string

    /** Workspace ID (0 for default workspace) */
    workspace_id?: number

    /** ID of Remote Server Credential to copy omitted values from. */
    copy_values_from_credential_id?: number
  }

  interface UpdateParams {
    /** Internal name for your reference */
    name?: string

    /** Internal description for your reference */
    description?: string

    /** Remote server type.  Remote Server Credentials are only valid for a single type of Remote Server. */
    server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com'

    /** AWS Access Key. */
    aws_access_key?: string

    /** AWS IAM Role ARN for AssumeRole authentication. */
    s3_assume_role_arn?: string

    /** Session duration in seconds for AssumeRole authentication (900-43200). */
    s3_assume_role_duration_seconds?: number

    /** Cloudflare: Access Key. */
    cloudflare_access_key?: string

    /** Filebase: Access Key. */
    filebase_access_key?: string

    /** Google Cloud Storage: S3-compatible Access Key. */
    google_cloud_storage_s3_compatible_access_key?: string

    /** Linode: Access Key */
    linode_access_key?: string

    /** S3-compatible: Access Key */
    s3_compatible_access_key?: string

    /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
    sharepoint_client_id?: string

    /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
    sharepoint_tenant_id?: string

    /** Remote server username. */
    username?: string

    /** Wasabi: Access Key. */
    wasabi_access_key?: string

    /** Password, if needed. */
    password?: string

    /** Private key, if needed. */
    private_key?: string

    /** Passphrase for private key if needed. */
    private_key_passphrase?: string

    /** AWS: secret key. */
    aws_secret_key?: string

    /** Azure Blob Storage: Access Key */
    azure_blob_storage_access_key?: string

    /** Azure Blob Storage: Shared Access Signature (SAS) token */
    azure_blob_storage_sas_token?: string

    /** Azure File Storage: Access Key */
    azure_files_storage_access_key?: string

    /** Azure File Storage: Shared Access Signature (SAS) token */
    azure_files_storage_sas_token?: string

    /** Backblaze B2 Cloud Storage: applicationKey */
    backblaze_b2_application_key?: string

    /** Backblaze B2 Cloud Storage: keyID */
    backblaze_b2_key_id?: string

    /** Cloudflare: Secret Key */
    cloudflare_secret_key?: string

    /** Filebase: Secret Key */
    filebase_secret_key?: string

    /**
     * Google Cloud Storage: JSON file that contains the private key. To generate see
     * https://cloud.google.com/storage/docs/json_api/v1/how-tos/authorizing#APIKey
     */
    google_cloud_storage_credentials_json?: string

    /** Google Cloud Storage: S3-compatible secret key */
    google_cloud_storage_s3_compatible_secret_key?: string

    /** Linode: Secret Key */
    linode_secret_key?: string

    /** S3-compatible: Secret Key */
    s3_compatible_secret_key?: string

    /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
    sharepoint_client_certificate?: string

    /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
    sharepoint_client_secret?: string

    /** Wasabi: Secret Key */
    wasabi_secret_key?: string
  }
}

export default RemoteServerCredential
