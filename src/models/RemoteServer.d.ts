import Files from '../Files'
import AgentNode from './AgentNode'
import AgentPushUpdate from './AgentPushUpdate'
import RemoteServerConfigurationFile from './RemoteServerConfigurationFile'

/** A RemoteServer is a specific type of Behavior called `remote_server_sync`. */
declare class RemoteServer {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: RemoteServer.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: RemoteServer.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Remote Server ID */
  readonly id?: number | null

  /**
   * If true, this Remote Server is disabled. Updating it clears this flag, except for retired Agent v1 records, which
   * remain disabled.
   */
  readonly disabled?: boolean | null

  /** Type of authentication method to use */
  readonly authentication_method?: string | null

  /**
   * Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each
   * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
   * Setting it on Create or Update does not change the running Agent.
   */
  readonly hostname?: string | null

  /** Initial home folder on remote server */
  readonly remote_home_path?: string | null

  /**
   * Upload staging path. Applies to SFTP only. If a path is provided here, files will first be uploaded to this path on
   * the remote folder and the moved into the final correct path via an SFTP move command. This is required by some
   * remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
   */
  readonly upload_staging_path?: string | null

  /**
   * Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to the
   * user's home directory.
   */
  readonly allow_relative_paths?: boolean | null

  /** Internal name for your reference */
  readonly name?: string | null

  /** Internal description for your reference */
  readonly description?: string | null

  /**
   * Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each registration,
   * replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on
   * Create or Update does not change the running Agent.
   */
  readonly port?: number | null

  /**
   * If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote
   * server. This can improve performance in certain access patterns, such as high-latency connections. It will cause
   * data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to
   * be a benefit in a given situation.
   */
  readonly buffer_uploads?: 'auto' | 'always' | 'never' | Files.OtherString | null

  /** Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible). */
  readonly max_connections?: number | null

  /**
   * If true, we will ensure that all communications with this remote server are made through the primary region of the
   * site. This setting can also be overridden by a site-wide setting which will force it to true.
   */
  readonly pin_to_site_region?: boolean | null

  /** If set, all communications with this remote server are made through the provided region. */
  readonly pinned_region?: string | null

  /** ID of Remote Server Credential, if applicable. */
  readonly remote_server_credential_id?: number | null

  /** S3 bucket name */
  readonly s3_bucket?: string | null

  /** S3 region */
  readonly s3_region?: string | null

  /**
   * ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket requires
   * a specific key.
   */
  readonly s3_kms_key_id?: string | null

  /** AWS Access Key. */
  readonly aws_access_key?: string | null

  /** AWS IAM Role ARN for AssumeRole authentication. */
  readonly s3_assume_role_arn?: string | null

  /** Session duration in seconds for AssumeRole authentication (900-43200). */
  readonly s3_assume_role_duration_seconds?: number | null

  /** External ID for AssumeRole authentication. */
  readonly s3_assume_role_external_id?: string | null

  /** Remote server certificate */
  readonly server_certificate?: 'require_match' | 'allow_any' | Files.OtherString | null

  /**
   * Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key,
   * preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must
   * present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is
   * compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged.
   * Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone
   * does not end the pin. Update `server_host_key` to replace the pin.
   */
  readonly server_host_key?: string | null

  /** Remote server type. */
  readonly server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

  /** Workspace ID (0 for default workspace) */
  readonly workspace_id?: number | null

  /** Should we require SSL? */
  readonly ssl?: 'if_available' | 'require' | 'require_implicit' | 'never' | Files.OtherString | null

  /** Remote server username. */
  readonly username?: string | null

  /** Google Cloud Storage: Bucket Name */
  readonly google_cloud_storage_bucket?: string | null

  /** Google Cloud Storage: Authentication method. Can be json, hmac, or oauth. */
  readonly google_cloud_storage_authentication_method?: 'json' | 'hmac' | 'oauth' | Files.OtherString | null

  /**
   * Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or
   * https://www.googleapis.com/auth/devstorage.read_write.
   */
  readonly google_cloud_storage_oauth_scope?: string | null

  /** Google Cloud Storage: Project ID */
  readonly google_cloud_storage_project_id?: string | null

  /** Google Cloud Storage: S3-compatible Access Key. */
  readonly google_cloud_storage_s3_compatible_access_key?: string | null

  /** Backblaze B2 Cloud Storage: S3 Endpoint */
  readonly backblaze_b2_s3_endpoint?: string | null

  /** Backblaze B2 Cloud Storage: Bucket name */
  readonly backblaze_b2_bucket?: string | null

  /** Wasabi: Bucket name */
  readonly wasabi_bucket?: string | null

  /** Wasabi: Region */
  readonly wasabi_region?: string | null

  /** Wasabi: Access Key. */
  readonly wasabi_access_key?: string | null

  /** Either `in_setup` or `complete` */
  readonly auth_status?: 'not_applicable' | 'in_setup' | 'complete' | 'reauthenticate' | Files.OtherString | null

  /** Describes the authorized account */
  readonly auth_account_name?: string | null

  /** OneDrive: Either personal or business_other account types */
  readonly one_drive_account_type?: 'personal' | 'business_other' | Files.OtherString | null

  /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
  readonly sharepoint_tenant_id?: string | null

  /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
  readonly sharepoint_client_id?: string | null

  /** SharePoint: If true, this remote server uses Microsoft Entra app-only authentication. */
  readonly sharepoint_app_authentication?: boolean | null

  /** SharePoint: App-only credential type. Either secret or certificate. */
  readonly sharepoint_app_credential_type?: string | null

  /** SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites. */
  readonly sharepoint_site_url?: string | null

  /** Azure Blob Storage: Account name */
  readonly azure_blob_storage_account?: string | null

  /** Azure Blob Storage: Container name */
  readonly azure_blob_storage_container?: string | null

  /** Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled? */
  readonly azure_blob_storage_hierarchical_namespace?: boolean | null

  /** Azure Blob Storage: Custom DNS suffix */
  readonly azure_blob_storage_dns_suffix?: string | null

  /** Azure Files: Storage Account name */
  readonly azure_files_storage_account?: string | null

  /** Azure Files:  Storage Share name */
  readonly azure_files_storage_share_name?: string | null

  /** Azure Files: Custom DNS suffix */
  readonly azure_files_storage_dns_suffix?: string | null

  /** S3-compatible: Bucket name */
  readonly s3_compatible_bucket?: string | null

  /** S3-compatible: endpoint */
  readonly s3_compatible_endpoint?: string | null

  /** S3-compatible: region */
  readonly s3_compatible_region?: string | null

  /** S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs */
  readonly s3_compatible_virtual_hosted_style?: boolean | null

  /** S3-compatible: Access Key */
  readonly s3_compatible_access_key?: string | null

  /** `true` if remote server only accepts connections from dedicated IPs */
  readonly enable_dedicated_ips?: boolean | null

  /**
   * Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be
   * available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an outbound
   * Agent. Set to null to use the site's default dedicated IPs.
   */
  readonly custom_domain_id?: number | null

  /**
   * Current eligible public IP addresses for the selected Custom Domain. Any address in this list may originate a
   * connection. Empty when no domain is selected or its configuration is unavailable. Only included in responses for a
   * single Remote Server.
   */
  readonly outbound_ip_addresses?: string[] | null

  /**
   * Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as `permission_set`
   * in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated
   * file, not a running Agent. The Agent enforces the permissions in its local configuration file, controlled by the
   * host's system administrator, and reports them at registration, replacing the stored value.
   */
  readonly files_agent_permission_set?: 'read_write' | 'read_only' | 'write_only' | Files.OtherString | null

  /**
   * Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote
   * Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the root
   * in its local configuration file, controlled by the host's system administrator, and reports it at registration,
   * replacing the stored value.
   */
  readonly files_agent_root?: string | null

  /**
   * Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not
   * included in the generated Agent configuration file. Setting it on Create or Update does not update the running
   * Agent.
   */
  readonly files_agent_version?: string | null

  /** If true, the Files Agent is up to date. */
  readonly files_agent_up_to_date?: boolean | null

  /** Latest available Files Agent version */
  readonly files_agent_latest_version?: string | null

  /** Files Agent supports receiving push updates */
  readonly files_agent_supports_push_updates?: boolean | null

  /**
   * Whether the Files Agent Proxy recently validated a direct transfer connection. `true` means a direct connection was
   * recently validated (actual availability can vary by client network), `false` means direct transfers are enabled but
   * not currently available, and `null` means direct transfers are disabled or unsupported. Only provided for a
   * connected Files Agent when showing a single Remote Server.
   */
  readonly direct_transfer_available?: boolean | null

  /** Route traffic to outbound on a files-agent */
  readonly outbound_agent_id?: number | null

  /** Filebase: Bucket name */
  readonly filebase_bucket?: string | null

  /** Filebase: Access Key. */
  readonly filebase_access_key?: string | null

  /** Files.com direct link: paired API key prefix. */
  readonly files_api_key_prefix?: string | null

  /** Cloudflare: Bucket name */
  readonly cloudflare_bucket?: string | null

  /** Cloudflare: Access Key. */
  readonly cloudflare_access_key?: string | null

  /** Cloudflare: endpoint */
  readonly cloudflare_endpoint?: string | null

  /** Dropbox: If true, list Team folders in root? */
  readonly dropbox_teams?: boolean | null

  /** Linode: Bucket name */
  readonly linode_bucket?: string | null

  /** Linode: Access Key */
  readonly linode_access_key?: string | null

  /** Linode: region */
  readonly linode_region?: string | null

  /** If true, this remote server supports file versioning. This value is determined automatically by Files.com. */
  readonly supports_versioning?: boolean | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** Password, if needed. */
  readonly password?: string

  /** Private key, if needed. */
  readonly private_key?: string

  /** Passphrase for private key if needed. */
  readonly private_key_passphrase?: string

  /** Reset authenticated account? */
  readonly reset_authentication?: boolean

  /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
  readonly sharepoint_client_certificate?: string

  /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
  readonly sharepoint_client_secret?: string

  /** SSL client certificate. */
  readonly ssl_certificate?: string

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

  /** Wasabi: Secret Key */
  readonly wasabi_secret_key?: string

  /** Files.com direct link: API key used once to pair the remote server. */
  readonly files_api_key?: string

  /** Remote Server ID */
  getId(): number | null | undefined

  /**
   * If true, this Remote Server is disabled. Updating it clears this flag, except for retired Agent v1 records, which
   * remain disabled.
   */
  getDisabled(): boolean | null | undefined

  /** Type of authentication method to use */
  getAuthenticationMethod(): string | null | undefined

  /**
   * Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each
   * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
   * Setting it on Create or Update does not change the running Agent.
   */
  getHostname(): string | null | undefined

  /** Initial home folder on remote server */
  getRemoteHomePath(): string | null | undefined

  /**
   * Upload staging path. Applies to SFTP only. If a path is provided here, files will first be uploaded to this path on
   * the remote folder and the moved into the final correct path via an SFTP move command. This is required by some
   * remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
   */
  getUploadStagingPath(): string | null | undefined

  /**
   * Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to the
   * user's home directory.
   */
  getAllowRelativePaths(): boolean | null | undefined

  /** Internal name for your reference */
  getName(): string | null | undefined

  /** Internal description for your reference */
  getDescription(): string | null | undefined

  /**
   * Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each registration,
   * replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on
   * Create or Update does not change the running Agent.
   */
  getPort(): number | null | undefined

  /**
   * If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote
   * server. This can improve performance in certain access patterns, such as high-latency connections. It will cause
   * data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to
   * be a benefit in a given situation.
   */
  getBufferUploads(): 'auto' | 'always' | 'never' | Files.OtherString | null | undefined

  /** Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible). */
  getMaxConnections(): number | null | undefined

  /**
   * If true, we will ensure that all communications with this remote server are made through the primary region of the
   * site. This setting can also be overridden by a site-wide setting which will force it to true.
   */
  getPinToSiteRegion(): boolean | null | undefined

  /** If set, all communications with this remote server are made through the provided region. */
  getPinnedRegion(): string | null | undefined

  /** ID of Remote Server Credential, if applicable. */
  getRemoteServerCredentialId(): number | null | undefined

  /** S3 bucket name */
  getS3Bucket(): string | null | undefined

  /** S3 region */
  getS3Region(): string | null | undefined

  /**
   * ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket requires
   * a specific key.
   */
  getS3KmsKeyId(): string | null | undefined

  /** AWS Access Key. */
  getAwsAccessKey(): string | null | undefined

  /** AWS IAM Role ARN for AssumeRole authentication. */
  getS3AssumeRoleArn(): string | null | undefined

  /** Session duration in seconds for AssumeRole authentication (900-43200). */
  getS3AssumeRoleDurationSeconds(): number | null | undefined

  /** External ID for AssumeRole authentication. */
  getS3AssumeRoleExternalId(): string | null | undefined

  /** Remote server certificate */
  getServerCertificate(): 'require_match' | 'allow_any' | Files.OtherString | null | undefined

  /**
   * Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key,
   * preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must
   * present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is
   * compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged.
   * Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone
   * does not end the pin. Update `server_host_key` to replace the pin.
   */
  getServerHostKey(): string | null | undefined

  /** Remote server type. */
  getServerType(): 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null | undefined

  /** Workspace ID (0 for default workspace) */
  getWorkspaceId(): number | null | undefined

  /** Should we require SSL? */
  getSsl(): 'if_available' | 'require' | 'require_implicit' | 'never' | Files.OtherString | null | undefined

  /** Remote server username. */
  getUsername(): string | null | undefined

  /** Google Cloud Storage: Bucket Name */
  getGoogleCloudStorageBucket(): string | null | undefined

  /** Google Cloud Storage: Authentication method. Can be json, hmac, or oauth. */
  getGoogleCloudStorageAuthenticationMethod(): 'json' | 'hmac' | 'oauth' | Files.OtherString | null | undefined

  /**
   * Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or
   * https://www.googleapis.com/auth/devstorage.read_write.
   */
  getGoogleCloudStorageOauthScope(): string | null | undefined

  /** Google Cloud Storage: Project ID */
  getGoogleCloudStorageProjectId(): string | null | undefined

  /** Google Cloud Storage: S3-compatible Access Key. */
  getGoogleCloudStorageS3CompatibleAccessKey(): string | null | undefined

  /** Backblaze B2 Cloud Storage: S3 Endpoint */
  getBackblazeB2S3Endpoint(): string | null | undefined

  /** Backblaze B2 Cloud Storage: Bucket name */
  getBackblazeB2Bucket(): string | null | undefined

  /** Wasabi: Bucket name */
  getWasabiBucket(): string | null | undefined

  /** Wasabi: Region */
  getWasabiRegion(): string | null | undefined

  /** Wasabi: Access Key. */
  getWasabiAccessKey(): string | null | undefined

  /** Either `in_setup` or `complete` */
  getAuthStatus(): 'not_applicable' | 'in_setup' | 'complete' | 'reauthenticate' | Files.OtherString | null | undefined

  /** Describes the authorized account */
  getAuthAccountName(): string | null | undefined

  /** OneDrive: Either personal or business_other account types */
  getOneDriveAccountType(): 'personal' | 'business_other' | Files.OtherString | null | undefined

  /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
  getSharepointTenantId(): string | null | undefined

  /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
  getSharepointClientId(): string | null | undefined

  /** SharePoint: If true, this remote server uses Microsoft Entra app-only authentication. */
  getSharepointAppAuthentication(): boolean | null | undefined

  /** SharePoint: App-only credential type. Either secret or certificate. */
  getSharepointAppCredentialType(): string | null | undefined

  /** SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites. */
  getSharepointSiteUrl(): string | null | undefined

  /** Azure Blob Storage: Account name */
  getAzureBlobStorageAccount(): string | null | undefined

  /** Azure Blob Storage: Container name */
  getAzureBlobStorageContainer(): string | null | undefined

  /** Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled? */
  getAzureBlobStorageHierarchicalNamespace(): boolean | null | undefined

  /** Azure Blob Storage: Custom DNS suffix */
  getAzureBlobStorageDnsSuffix(): string | null | undefined

  /** Azure Files: Storage Account name */
  getAzureFilesStorageAccount(): string | null | undefined

  /** Azure Files:  Storage Share name */
  getAzureFilesStorageShareName(): string | null | undefined

  /** Azure Files: Custom DNS suffix */
  getAzureFilesStorageDnsSuffix(): string | null | undefined

  /** S3-compatible: Bucket name */
  getS3CompatibleBucket(): string | null | undefined

  /** S3-compatible: endpoint */
  getS3CompatibleEndpoint(): string | null | undefined

  /** S3-compatible: region */
  getS3CompatibleRegion(): string | null | undefined

  /** S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs */
  getS3CompatibleVirtualHostedStyle(): boolean | null | undefined

  /** S3-compatible: Access Key */
  getS3CompatibleAccessKey(): string | null | undefined

  /** `true` if remote server only accepts connections from dedicated IPs */
  getEnableDedicatedIps(): boolean | null | undefined

  /**
   * Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be
   * available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an outbound
   * Agent. Set to null to use the site's default dedicated IPs.
   */
  getCustomDomainId(): number | null | undefined

  /**
   * Current eligible public IP addresses for the selected Custom Domain. Any address in this list may originate a
   * connection. Empty when no domain is selected or its configuration is unavailable. Only included in responses for a
   * single Remote Server.
   */
  getOutboundIpAddresses(): string[] | null | undefined

  /**
   * Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as `permission_set`
   * in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated
   * file, not a running Agent. The Agent enforces the permissions in its local configuration file, controlled by the
   * host's system administrator, and reports them at registration, replacing the stored value.
   */
  getFilesAgentPermissionSet(): 'read_write' | 'read_only' | 'write_only' | Files.OtherString | null | undefined

  /**
   * Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote
   * Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the root
   * in its local configuration file, controlled by the host's system administrator, and reports it at registration,
   * replacing the stored value.
   */
  getFilesAgentRoot(): string | null | undefined

  /**
   * Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not
   * included in the generated Agent configuration file. Setting it on Create or Update does not update the running
   * Agent.
   */
  getFilesAgentVersion(): string | null | undefined

  /** If true, the Files Agent is up to date. */
  getFilesAgentUpToDate(): boolean | null | undefined

  /** Latest available Files Agent version */
  getFilesAgentLatestVersion(): string | null | undefined

  /** Files Agent supports receiving push updates */
  getFilesAgentSupportsPushUpdates(): boolean | null | undefined

  /**
   * Whether the Files Agent Proxy recently validated a direct transfer connection. `true` means a direct connection was
   * recently validated (actual availability can vary by client network), `false` means direct transfers are enabled but
   * not currently available, and `null` means direct transfers are disabled or unsupported. Only provided for a
   * connected Files Agent when showing a single Remote Server.
   */
  getDirectTransferAvailable(): boolean | null | undefined

  /** Route traffic to outbound on a files-agent */
  getOutboundAgentId(): number | null | undefined

  /** Filebase: Bucket name */
  getFilebaseBucket(): string | null | undefined

  /** Filebase: Access Key. */
  getFilebaseAccessKey(): string | null | undefined

  /** Files.com direct link: paired API key prefix. */
  getFilesApiKeyPrefix(): string | null | undefined

  /** Cloudflare: Bucket name */
  getCloudflareBucket(): string | null | undefined

  /** Cloudflare: Access Key. */
  getCloudflareAccessKey(): string | null | undefined

  /** Cloudflare: endpoint */
  getCloudflareEndpoint(): string | null | undefined

  /** Dropbox: If true, list Team folders in root? */
  getDropboxTeams(): boolean | null | undefined

  /** Linode: Bucket name */
  getLinodeBucket(): string | null | undefined

  /** Linode: Access Key */
  getLinodeAccessKey(): string | null | undefined

  /** Linode: region */
  getLinodeRegion(): string | null | undefined

  /** If true, this remote server supports file versioning. This value is determined automatically by Files.com. */
  getSupportsVersioning(): boolean | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** Password, if needed. */
  getPassword(): string | undefined

  /** Private key, if needed. */
  getPrivateKey(): string | undefined

  /** Passphrase for private key if needed. */
  getPrivateKeyPassphrase(): string | undefined

  /** Reset authenticated account? */
  getResetAuthentication(): boolean | undefined

  /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
  getSharepointClientCertificate(): string | undefined

  /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
  getSharepointClientSecret(): string | undefined

  /** SSL client certificate. */
  getSslCertificate(): string | undefined

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

  /** Wasabi: Secret Key */
  getWasabiSecretKey(): string | undefined

  /** Files.com direct link: API key used once to pair the remote server. */
  getFilesApiKey(): string | undefined

  /** Remote Server ID */
  setId(value: number): void

  /**
   * If true, this Remote Server is disabled. Updating it clears this flag, except for retired Agent v1 records, which
   * remain disabled.
   */
  setDisabled(value: boolean): void

  /** Type of authentication method to use */
  setAuthenticationMethod(value: string): void

  /**
   * Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each
   * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
   * Setting it on Create or Update does not change the running Agent.
   */
  setHostname(value: string): void

  /** Initial home folder on remote server */
  setRemoteHomePath(value: string): void

  /**
   * Upload staging path. Applies to SFTP only. If a path is provided here, files will first be uploaded to this path on
   * the remote folder and the moved into the final correct path via an SFTP move command. This is required by some
   * remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
   */
  setUploadStagingPath(value: string): void

  /**
   * Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to the
   * user's home directory.
   */
  setAllowRelativePaths(value: boolean): void

  /** Internal name for your reference */
  setName(value: string): void

  /** Internal description for your reference */
  setDescription(value: string): void

  /**
   * Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each registration,
   * replacing the stored value. This field is not included in the generated Agent configuration file. Setting it on
   * Create or Update does not change the running Agent.
   */
  setPort(value: number): void

  /**
   * If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote
   * server. This can improve performance in certain access patterns, such as high-latency connections. It will cause
   * data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to
   * be a benefit in a given situation.
   */
  setBufferUploads(value: 'auto' | 'always' | 'never'): void

  /** Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible). */
  setMaxConnections(value: number): void

  /**
   * If true, we will ensure that all communications with this remote server are made through the primary region of the
   * site. This setting can also be overridden by a site-wide setting which will force it to true.
   */
  setPinToSiteRegion(value: boolean): void

  /** If set, all communications with this remote server are made through the provided region. */
  setPinnedRegion(value: string): void

  /** ID of Remote Server Credential, if applicable. */
  setRemoteServerCredentialId(value: number): void

  /** S3 bucket name */
  setS3Bucket(value: string): void

  /** S3 region */
  setS3Region(value: string): void

  /**
   * ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket requires
   * a specific key.
   */
  setS3KmsKeyId(value: string): void

  /** AWS Access Key. */
  setAwsAccessKey(value: string): void

  /** AWS IAM Role ARN for AssumeRole authentication. */
  setS3AssumeRoleArn(value: string): void

  /** Session duration in seconds for AssumeRole authentication (900-43200). */
  setS3AssumeRoleDurationSeconds(value: number): void

  /** External ID for AssumeRole authentication. */
  setS3AssumeRoleExternalId(value: string): void

  /** Remote server certificate */
  setServerCertificate(value: 'require_match' | 'allow_any'): void

  /**
   * Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key,
   * preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must
   * present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is
   * compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged.
   * Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone
   * does not end the pin. Update `server_host_key` to replace the pin.
   */
  setServerHostKey(value: string): void

  /** Remote server type. */
  setServerType(value: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com'): void

  /** Workspace ID (0 for default workspace) */
  setWorkspaceId(value: number): void

  /** Should we require SSL? */
  setSsl(value: 'if_available' | 'require' | 'require_implicit' | 'never'): void

  /** Remote server username. */
  setUsername(value: string): void

  /** Google Cloud Storage: Bucket Name */
  setGoogleCloudStorageBucket(value: string): void

  /** Google Cloud Storage: Authentication method. Can be json, hmac, or oauth. */
  setGoogleCloudStorageAuthenticationMethod(value: 'json' | 'hmac' | 'oauth'): void

  /**
   * Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or
   * https://www.googleapis.com/auth/devstorage.read_write.
   */
  setGoogleCloudStorageOauthScope(value: string): void

  /** Google Cloud Storage: Project ID */
  setGoogleCloudStorageProjectId(value: string): void

  /** Google Cloud Storage: S3-compatible Access Key. */
  setGoogleCloudStorageS3CompatibleAccessKey(value: string): void

  /** Backblaze B2 Cloud Storage: S3 Endpoint */
  setBackblazeB2S3Endpoint(value: string): void

  /** Backblaze B2 Cloud Storage: Bucket name */
  setBackblazeB2Bucket(value: string): void

  /** Wasabi: Bucket name */
  setWasabiBucket(value: string): void

  /** Wasabi: Region */
  setWasabiRegion(value: string): void

  /** Wasabi: Access Key. */
  setWasabiAccessKey(value: string): void

  /** Either `in_setup` or `complete` */
  setAuthStatus(value: 'not_applicable' | 'in_setup' | 'complete' | 'reauthenticate' | Files.OtherString): void

  /** Describes the authorized account */
  setAuthAccountName(value: string): void

  /** OneDrive: Either personal or business_other account types */
  setOneDriveAccountType(value: 'personal' | 'business_other'): void

  /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
  setSharepointTenantId(value: string): void

  /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
  setSharepointClientId(value: string): void

  /** SharePoint: If true, this remote server uses Microsoft Entra app-only authentication. */
  setSharepointAppAuthentication(value: boolean): void

  /** SharePoint: App-only credential type. Either secret or certificate. */
  setSharepointAppCredentialType(value: string): void

  /** SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites. */
  setSharepointSiteUrl(value: string): void

  /** Azure Blob Storage: Account name */
  setAzureBlobStorageAccount(value: string): void

  /** Azure Blob Storage: Container name */
  setAzureBlobStorageContainer(value: string): void

  /** Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled? */
  setAzureBlobStorageHierarchicalNamespace(value: boolean): void

  /** Azure Blob Storage: Custom DNS suffix */
  setAzureBlobStorageDnsSuffix(value: string): void

  /** Azure Files: Storage Account name */
  setAzureFilesStorageAccount(value: string): void

  /** Azure Files:  Storage Share name */
  setAzureFilesStorageShareName(value: string): void

  /** Azure Files: Custom DNS suffix */
  setAzureFilesStorageDnsSuffix(value: string): void

  /** S3-compatible: Bucket name */
  setS3CompatibleBucket(value: string): void

  /** S3-compatible: endpoint */
  setS3CompatibleEndpoint(value: string): void

  /** S3-compatible: region */
  setS3CompatibleRegion(value: string): void

  /** S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs */
  setS3CompatibleVirtualHostedStyle(value: boolean): void

  /** S3-compatible: Access Key */
  setS3CompatibleAccessKey(value: string): void

  /** `true` if remote server only accepts connections from dedicated IPs */
  setEnableDedicatedIps(value: boolean): void

  /**
   * Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be
   * available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an outbound
   * Agent. Set to null to use the site's default dedicated IPs.
   */
  setCustomDomainId(value: number): void

  /**
   * Current eligible public IP addresses for the selected Custom Domain. Any address in this list may originate a
   * connection. Empty when no domain is selected or its configuration is unavailable. Only included in responses for a
   * single Remote Server.
   */
  setOutboundIpAddresses(value: string[]): void

  /**
   * Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as `permission_set`
   * in the configuration file generated for this Remote Server. Setting it on Create or Update changes the generated
   * file, not a running Agent. The Agent enforces the permissions in its local configuration file, controlled by the
   * host's system administrator, and reports them at registration, replacing the stored value.
   */
  setFilesAgentPermissionSet(value: 'read_write' | 'read_only' | 'write_only'): void

  /**
   * Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote
   * Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the root
   * in its local configuration file, controlled by the host's system administrator, and reports it at registration,
   * replacing the stored value.
   */
  setFilesAgentRoot(value: string): void

  /**
   * Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not
   * included in the generated Agent configuration file. Setting it on Create or Update does not update the running
   * Agent.
   */
  setFilesAgentVersion(value: string): void

  /** If true, the Files Agent is up to date. */
  setFilesAgentUpToDate(value: boolean): void

  /** Latest available Files Agent version */
  setFilesAgentLatestVersion(value: string): void

  /** Files Agent supports receiving push updates */
  setFilesAgentSupportsPushUpdates(value: boolean): void

  /**
   * Whether the Files Agent Proxy recently validated a direct transfer connection. `true` means a direct connection was
   * recently validated (actual availability can vary by client network), `false` means direct transfers are enabled but
   * not currently available, and `null` means direct transfers are disabled or unsupported. Only provided for a
   * connected Files Agent when showing a single Remote Server.
   */
  setDirectTransferAvailable(value: boolean): void

  /** Route traffic to outbound on a files-agent */
  setOutboundAgentId(value: number): void

  /** Filebase: Bucket name */
  setFilebaseBucket(value: string): void

  /** Filebase: Access Key. */
  setFilebaseAccessKey(value: string): void

  /** Files.com direct link: paired API key prefix. */
  setFilesApiKeyPrefix(value: string): void

  /** Cloudflare: Bucket name */
  setCloudflareBucket(value: string): void

  /** Cloudflare: Access Key. */
  setCloudflareAccessKey(value: string): void

  /** Cloudflare: endpoint */
  setCloudflareEndpoint(value: string): void

  /** Dropbox: If true, list Team folders in root? */
  setDropboxTeams(value: boolean): void

  /** Linode: Bucket name */
  setLinodeBucket(value: string): void

  /** Linode: Access Key */
  setLinodeAccessKey(value: string): void

  /** Linode: region */
  setLinodeRegion(value: string): void

  /** If true, this remote server supports file versioning. This value is determined automatically by Files.com. */
  setSupportsVersioning(value: boolean): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /** Password, if needed. */
  setPassword(value: string): void

  /** Private key, if needed. */
  setPrivateKey(value: string): void

  /** Passphrase for private key if needed. */
  setPrivateKeyPassphrase(value: string): void

  /** Reset authenticated account? */
  setResetAuthentication(value: boolean): void

  /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
  setSharepointClientCertificate(value: string): void

  /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
  setSharepointClientSecret(value: string): void

  /** SSL client certificate. */
  setSslCertificate(value: string): void

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

  /** Wasabi: Secret Key */
  setWasabiSecretKey(value: string): void

  /** Files.com direct link: API key used once to pair the remote server. */
  setFilesApiKey(value: string): void

  /** List Files.com Agent nodes */
  agentNodes(params?: Files.NoParams): Promise<AgentNode>

  /** Push update to Files Agent */
  agentPushUpdate(params?: Files.NoParams): Promise<AgentPushUpdate>

  /** Update Remote Server */
  update(params?: RemoteServer.UpdateParams): Promise<this>

  /** Delete Remote Server */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Remote Servers */
  static list(params?: RemoteServer.ListParams, options?: Files.RequestOptions): Promise<RemoteServer[]>

  /** Alias of `list()`. */
  static all(params?: RemoteServer.ListParams, options?: Files.RequestOptions): Promise<RemoteServer[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: RemoteServer.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<RemoteServer>

  /**
   * Show Remote Server
   * @param id - Remote Server ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteServer>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteServer>

  /**
   * Download configuration file (required for some Remote Server integrations, such as the Files.com Agent)
   * @param id - Remote Server ID.
   */
  static findConfigurationFile(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteServerConfigurationFile>

  /** Create Remote Server */
  static create(params?: RemoteServer.CreateParams, options?: Files.RequestOptions): Promise<RemoteServer>
}

declare namespace RemoteServer {
  /** The fields of `RemoteServer` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Remote Server ID */
    id?: number | null

    /**
     * If true, this Remote Server is disabled. Updating it clears this flag, except for retired Agent v1 records, which
     * remain disabled.
     */
    disabled?: boolean | null

    /** Type of authentication method to use */
    authentication_method?: string | null

    /**
     * Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each
     * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
     * Setting it on Create or Update does not change the running Agent.
     */
    hostname?: string | null

    /** Initial home folder on remote server */
    remote_home_path?: string | null

    /**
     * Upload staging path. Applies to SFTP only. If a path is provided here, files will first be uploaded to this path
     * on the remote folder and the moved into the final correct path via an SFTP move command. This is required by some
     * remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
     */
    upload_staging_path?: string | null

    /**
     * Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to
     * the user's home directory.
     */
    allow_relative_paths?: boolean | null

    /** Internal name for your reference */
    name?: string | null

    /** Internal description for your reference */
    description?: string | null

    /**
     * Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each
     * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
     * Setting it on Create or Update does not change the running Agent.
     */
    port?: number | null

    /**
     * If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote
     * server. This can improve performance in certain access patterns, such as high-latency connections. It will cause
     * data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to
     * be a benefit in a given situation.
     */
    buffer_uploads?: 'auto' | 'always' | 'never' | Files.OtherString | null

    /**
     * Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
     */
    max_connections?: number | null

    /**
     * If true, we will ensure that all communications with this remote server are made through the primary region of
     * the site. This setting can also be overridden by a site-wide setting which will force it to true.
     */
    pin_to_site_region?: boolean | null

    /** If set, all communications with this remote server are made through the provided region. */
    pinned_region?: string | null

    /** ID of Remote Server Credential, if applicable. */
    remote_server_credential_id?: number | null

    /** S3 bucket name */
    s3_bucket?: string | null

    /** S3 region */
    s3_region?: string | null

    /**
     * ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket
     * requires a specific key.
     */
    s3_kms_key_id?: string | null

    /** AWS Access Key. */
    aws_access_key?: string | null

    /** AWS IAM Role ARN for AssumeRole authentication. */
    s3_assume_role_arn?: string | null

    /** Session duration in seconds for AssumeRole authentication (900-43200). */
    s3_assume_role_duration_seconds?: number | null

    /** External ID for AssumeRole authentication. */
    s3_assume_role_external_id?: string | null

    /** Remote server certificate */
    server_certificate?: 'require_match' | 'allow_any' | Files.OtherString | null

    /**
     * Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key,
     * preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must
     * present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is
     * compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged.
     * Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone
     * does not end the pin. Update `server_host_key` to replace the pin.
     */
    server_host_key?: string | null

    /** Remote server type. */
    server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

    /** Workspace ID (0 for default workspace) */
    workspace_id?: number | null

    /** Should we require SSL? */
    ssl?: 'if_available' | 'require' | 'require_implicit' | 'never' | Files.OtherString | null

    /** Remote server username. */
    username?: string | null

    /** Google Cloud Storage: Bucket Name */
    google_cloud_storage_bucket?: string | null

    /** Google Cloud Storage: Authentication method. Can be json, hmac, or oauth. */
    google_cloud_storage_authentication_method?: 'json' | 'hmac' | 'oauth' | Files.OtherString | null

    /**
     * Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or
     * https://www.googleapis.com/auth/devstorage.read_write.
     */
    google_cloud_storage_oauth_scope?: string | null

    /** Google Cloud Storage: Project ID */
    google_cloud_storage_project_id?: string | null

    /** Google Cloud Storage: S3-compatible Access Key. */
    google_cloud_storage_s3_compatible_access_key?: string | null

    /** Backblaze B2 Cloud Storage: S3 Endpoint */
    backblaze_b2_s3_endpoint?: string | null

    /** Backblaze B2 Cloud Storage: Bucket name */
    backblaze_b2_bucket?: string | null

    /** Wasabi: Bucket name */
    wasabi_bucket?: string | null

    /** Wasabi: Region */
    wasabi_region?: string | null

    /** Wasabi: Access Key. */
    wasabi_access_key?: string | null

    /** Either `in_setup` or `complete` */
    auth_status?: 'not_applicable' | 'in_setup' | 'complete' | 'reauthenticate' | Files.OtherString | null

    /** Describes the authorized account */
    auth_account_name?: string | null

    /** OneDrive: Either personal or business_other account types */
    one_drive_account_type?: 'personal' | 'business_other' | Files.OtherString | null

    /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
    sharepoint_tenant_id?: string | null

    /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
    sharepoint_client_id?: string | null

    /** SharePoint: If true, this remote server uses Microsoft Entra app-only authentication. */
    sharepoint_app_authentication?: boolean | null

    /** SharePoint: App-only credential type. Either secret or certificate. */
    sharepoint_app_credential_type?: string | null

    /** SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites. */
    sharepoint_site_url?: string | null

    /** Azure Blob Storage: Account name */
    azure_blob_storage_account?: string | null

    /** Azure Blob Storage: Container name */
    azure_blob_storage_container?: string | null

    /** Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled? */
    azure_blob_storage_hierarchical_namespace?: boolean | null

    /** Azure Blob Storage: Custom DNS suffix */
    azure_blob_storage_dns_suffix?: string | null

    /** Azure Files: Storage Account name */
    azure_files_storage_account?: string | null

    /** Azure Files:  Storage Share name */
    azure_files_storage_share_name?: string | null

    /** Azure Files: Custom DNS suffix */
    azure_files_storage_dns_suffix?: string | null

    /** S3-compatible: Bucket name */
    s3_compatible_bucket?: string | null

    /** S3-compatible: endpoint */
    s3_compatible_endpoint?: string | null

    /** S3-compatible: region */
    s3_compatible_region?: string | null

    /** S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs */
    s3_compatible_virtual_hosted_style?: boolean | null

    /** S3-compatible: Access Key */
    s3_compatible_access_key?: string | null

    /** `true` if remote server only accepts connections from dedicated IPs */
    enable_dedicated_ips?: boolean | null

    /**
     * Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be
     * available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an
     * outbound Agent. Set to null to use the site's default dedicated IPs.
     */
    custom_domain_id?: number | null

    /**
     * Current eligible public IP addresses for the selected Custom Domain. Any address in this list may originate a
     * connection. Empty when no domain is selected or its configuration is unavailable. Only included in responses for
     * a single Remote Server.
     */
    outbound_ip_addresses?: string[] | null

    /**
     * Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as
     * `permission_set` in the configuration file generated for this Remote Server. Setting it on Create or Update
     * changes the generated file, not a running Agent. The Agent enforces the permissions in its local configuration
     * file, controlled by the host's system administrator, and reports them at registration, replacing the stored
     * value.
     */
    files_agent_permission_set?: 'read_write' | 'read_only' | 'write_only' | Files.OtherString | null

    /**
     * Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote
     * Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the
     * root in its local configuration file, controlled by the host's system administrator, and reports it at
     * registration, replacing the stored value.
     */
    files_agent_root?: string | null

    /**
     * Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not
     * included in the generated Agent configuration file. Setting it on Create or Update does not update the running
     * Agent.
     */
    files_agent_version?: string | null

    /** If true, the Files Agent is up to date. */
    files_agent_up_to_date?: boolean | null

    /** Latest available Files Agent version */
    files_agent_latest_version?: string | null

    /** Files Agent supports receiving push updates */
    files_agent_supports_push_updates?: boolean | null

    /**
     * Whether the Files Agent Proxy recently validated a direct transfer connection. `true` means a direct connection
     * was recently validated (actual availability can vary by client network), `false` means direct transfers are
     * enabled but not currently available, and `null` means direct transfers are disabled or unsupported. Only provided
     * for a connected Files Agent when showing a single Remote Server.
     */
    direct_transfer_available?: boolean | null

    /** Route traffic to outbound on a files-agent */
    outbound_agent_id?: number | null

    /** Filebase: Bucket name */
    filebase_bucket?: string | null

    /** Filebase: Access Key. */
    filebase_access_key?: string | null

    /** Files.com direct link: paired API key prefix. */
    files_api_key_prefix?: string | null

    /** Cloudflare: Bucket name */
    cloudflare_bucket?: string | null

    /** Cloudflare: Access Key. */
    cloudflare_access_key?: string | null

    /** Cloudflare: endpoint */
    cloudflare_endpoint?: string | null

    /** Dropbox: If true, list Team folders in root? */
    dropbox_teams?: boolean | null

    /** Linode: Bucket name */
    linode_bucket?: string | null

    /** Linode: Access Key */
    linode_access_key?: string | null

    /** Linode: region */
    linode_region?: string | null

    /** If true, this remote server supports file versioning. This value is determined automatically by Files.com. */
    supports_versioning?: boolean | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Password, if needed. */
    password?: string

    /** Private key, if needed. */
    private_key?: string

    /** Passphrase for private key if needed. */
    private_key_passphrase?: string

    /** Reset authenticated account? */
    reset_authentication?: boolean

    /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
    sharepoint_client_certificate?: string

    /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
    sharepoint_client_secret?: string

    /** SSL client certificate. */
    ssl_certificate?: string

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

    /** Wasabi: Secret Key */
    wasabi_secret_key?: string

    /** Files.com direct link: API key used once to pair the remote server. */
    files_api_key?: string
  }

  interface ListParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `name`, `server_type`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`,
     * `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`,
     * `cloudflare_bucket` or `linode_bucket`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `name`,
     * `server_type`, `workspace_id`, `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`,
     * `s3_bucket`, `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`,
     * `filebase_bucket`, `cloudflare_bucket` or `linode_bucket`. Valid field combinations are `[ server_type, name ]`,
     * `[ workspace_id, name ]`, `[ backblaze_b2_bucket, name ]`, `[ google_cloud_storage_bucket, name ]`, `[
     * wasabi_bucket, name ]`, `[ s3_bucket, name ]`, `[ azure_blob_storage_container, name ]`, `[
     * azure_files_storage_share_name, name ]`, `[ s3_compatible_bucket, name ]`, `[ filebase_bucket, name ]`, `[
     * cloudflare_bucket, name ]`, `[ linode_bucket, name ]`, `[ workspace_id, server_type ]` or `[ workspace_id,
     * server_type, name ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`,
     * `backblaze_b2_bucket`, `google_cloud_storage_bucket`, `wasabi_bucket`, `s3_bucket`,
     * `azure_blob_storage_container`, `azure_files_storage_share_name`, `s3_compatible_bucket`, `filebase_bucket`,
     * `cloudflare_bucket` or `linode_bucket`. Valid field combinations are `[ backblaze_b2_bucket, name ]`, `[
     * google_cloud_storage_bucket, name ]`, `[ wasabi_bucket, name ]`, `[ s3_bucket, name ]`, `[
     * azure_blob_storage_container, name ]`, `[ azure_files_storage_share_name, name ]`, `[ s3_compatible_bucket, name
     * ]`, `[ filebase_bucket, name ]`, `[ cloudflare_bucket, name ]` or `[ linode_bucket, name ]`.
     */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Password, if needed. */
    password?: string

    /** Private key, if needed. */
    private_key?: string

    /** Passphrase for private key if needed. */
    private_key_passphrase?: string

    /** Reset authenticated account? */
    reset_authentication?: boolean

    /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
    sharepoint_client_certificate?: string

    /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
    sharepoint_client_secret?: string

    /** SSL client certificate. */
    ssl_certificate?: string

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

    /** Wasabi: Secret Key */
    wasabi_secret_key?: string

    /**
     * Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to
     * the user's home directory.
     */
    allow_relative_paths?: boolean

    /** AWS Access Key. */
    aws_access_key?: string

    /** Azure Blob Storage: Account name */
    azure_blob_storage_account?: string

    /** Azure Blob Storage: Container name */
    azure_blob_storage_container?: string

    /** Azure Blob Storage: Custom DNS suffix */
    azure_blob_storage_dns_suffix?: string

    /** Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled? */
    azure_blob_storage_hierarchical_namespace?: boolean

    /** Azure Files: Storage Account name */
    azure_files_storage_account?: string

    /** Azure Files: Custom DNS suffix */
    azure_files_storage_dns_suffix?: string

    /** Azure Files:  Storage Share name */
    azure_files_storage_share_name?: string

    /** Backblaze B2 Cloud Storage: Bucket name */
    backblaze_b2_bucket?: string

    /** Backblaze B2 Cloud Storage: S3 Endpoint */
    backblaze_b2_s3_endpoint?: string

    /**
     * If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote
     * server. This can improve performance in certain access patterns, such as high-latency connections. It will cause
     * data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to
     * be a benefit in a given situation.
     */
    buffer_uploads?: 'auto' | 'always' | 'never'

    /** Cloudflare: Access Key. */
    cloudflare_access_key?: string

    /** Cloudflare: Bucket name */
    cloudflare_bucket?: string

    /** Cloudflare: endpoint */
    cloudflare_endpoint?: string

    /** Internal description for your reference */
    description?: string

    /** Dropbox: If true, list Team folders in root? */
    dropbox_teams?: boolean

    /** `true` if remote server only accepts connections from dedicated IPs */
    enable_dedicated_ips?: boolean

    /** Filebase: Access Key. */
    filebase_access_key?: string

    /** Filebase: Bucket name */
    filebase_bucket?: string

    /** Files.com direct link: API key used once to pair the remote server. */
    files_api_key?: string

    /**
     * Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as
     * `permission_set` in the configuration file generated for this Remote Server. Setting it on Create or Update
     * changes the generated file, not a running Agent. The Agent enforces the permissions in its local configuration
     * file, controlled by the host's system administrator, and reports them at registration, replacing the stored
     * value.
     */
    files_agent_permission_set?: 'read_write' | 'read_only' | 'write_only'

    /**
     * Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote
     * Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the
     * root in its local configuration file, controlled by the host's system administrator, and reports it at
     * registration, replacing the stored value.
     */
    files_agent_root?: string

    /**
     * Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not
     * included in the generated Agent configuration file. Setting it on Create or Update does not update the running
     * Agent.
     */
    files_agent_version?: string

    /** Route traffic to outbound on a files-agent */
    outbound_agent_id?: number

    /**
     * Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be
     * available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an
     * outbound Agent. Set to null to use the site's default dedicated IPs.
     */
    custom_domain_id?: number

    /** Google Cloud Storage: Authentication method. Can be json, hmac, or oauth. */
    google_cloud_storage_authentication_method?: 'json' | 'hmac' | 'oauth'

    /** Google Cloud Storage: Bucket Name */
    google_cloud_storage_bucket?: string

    /**
     * Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or
     * https://www.googleapis.com/auth/devstorage.read_write.
     */
    google_cloud_storage_oauth_scope?: string

    /** Google Cloud Storage: Project ID */
    google_cloud_storage_project_id?: string

    /** Google Cloud Storage: S3-compatible Access Key. */
    google_cloud_storage_s3_compatible_access_key?: string

    /**
     * Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each
     * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
     * Setting it on Create or Update does not change the running Agent.
     */
    hostname?: string

    /** Linode: Access Key */
    linode_access_key?: string

    /** Linode: Bucket name */
    linode_bucket?: string

    /** Linode: region */
    linode_region?: string

    /**
     * Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
     */
    max_connections?: number

    /** Internal name for your reference */
    name?: string

    /** OneDrive: Either personal or business_other account types */
    one_drive_account_type?: 'personal' | 'business_other'

    /**
     * If true, we will ensure that all communications with this remote server are made through the primary region of
     * the site. This setting can also be overridden by a site-wide setting which will force it to true.
     */
    pin_to_site_region?: boolean

    /**
     * Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each
     * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
     * Setting it on Create or Update does not change the running Agent.
     */
    port?: number

    /**
     * Upload staging path. Applies to SFTP only. If a path is provided here, files will first be uploaded to this path
     * on the remote folder and the moved into the final correct path via an SFTP move command. This is required by some
     * remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
     */
    upload_staging_path?: string

    /** ID of Remote Server Credential, if applicable. */
    remote_server_credential_id?: number

    /** AWS IAM Role ARN for AssumeRole authentication. */
    s3_assume_role_arn?: string

    /** Session duration in seconds for AssumeRole authentication (900-43200). */
    s3_assume_role_duration_seconds?: number

    /** S3 bucket name */
    s3_bucket?: string

    /** S3-compatible: Access Key */
    s3_compatible_access_key?: string

    /** S3-compatible: Bucket name */
    s3_compatible_bucket?: string

    /** S3-compatible: endpoint */
    s3_compatible_endpoint?: string

    /** S3-compatible: region */
    s3_compatible_region?: string

    /** S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs */
    s3_compatible_virtual_hosted_style?: boolean

    /**
     * ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket
     * requires a specific key.
     */
    s3_kms_key_id?: string

    /** S3 region */
    s3_region?: string

    /** Remote server certificate */
    server_certificate?: 'require_match' | 'allow_any'

    /**
     * Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key,
     * preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must
     * present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is
     * compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged.
     * Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone
     * does not end the pin. Update `server_host_key` to replace the pin.
     */
    server_host_key?: string

    /** Remote server type. */
    server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com'

    /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
    sharepoint_client_id?: string

    /** SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites. */
    sharepoint_site_url?: string

    /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
    sharepoint_tenant_id?: string

    /** Should we require SSL? */
    ssl?: 'if_available' | 'require' | 'require_implicit' | 'never'

    /** Remote server username. */
    username?: string

    /** Wasabi: Access Key. */
    wasabi_access_key?: string

    /** Wasabi: Bucket name */
    wasabi_bucket?: string

    /** Wasabi: Region */
    wasabi_region?: string

    /** Workspace ID (0 for default workspace) */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Password, if needed. */
    password?: string

    /** Private key, if needed. */
    private_key?: string

    /** Passphrase for private key if needed. */
    private_key_passphrase?: string

    /** Reset authenticated account? */
    reset_authentication?: boolean

    /** SharePoint: PEM-encoded certificate and unencrypted private key for app-only authentication. */
    sharepoint_client_certificate?: string

    /** SharePoint: Microsoft Entra application client secret for app-only authentication. */
    sharepoint_client_secret?: string

    /** SSL client certificate. */
    ssl_certificate?: string

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

    /** Wasabi: Secret Key */
    wasabi_secret_key?: string

    /**
     * Allow relative paths in SFTP. If true, paths will not be forced to be absolute, allowing operations relative to
     * the user's home directory.
     */
    allow_relative_paths?: boolean

    /** AWS Access Key. */
    aws_access_key?: string

    /** Azure Blob Storage: Account name */
    azure_blob_storage_account?: string

    /** Azure Blob Storage: Container name */
    azure_blob_storage_container?: string

    /** Azure Blob Storage: Custom DNS suffix */
    azure_blob_storage_dns_suffix?: string

    /** Azure Blob Storage: Does the storage account has hierarchical namespace feature enabled? */
    azure_blob_storage_hierarchical_namespace?: boolean

    /** Azure Files: Storage Account name */
    azure_files_storage_account?: string

    /** Azure Files: Custom DNS suffix */
    azure_files_storage_dns_suffix?: string

    /** Azure Files:  Storage Share name */
    azure_files_storage_share_name?: string

    /** Backblaze B2 Cloud Storage: Bucket name */
    backblaze_b2_bucket?: string

    /** Backblaze B2 Cloud Storage: S3 Endpoint */
    backblaze_b2_s3_endpoint?: string

    /**
     * If set to always, uploads to this server will be uploaded first to Files.com before being sent to the remote
     * server. This can improve performance in certain access patterns, such as high-latency connections. It will cause
     * data to be temporarily stored in Files.com. If set to auto, we will perform this optimization if we believe it to
     * be a benefit in a given situation.
     */
    buffer_uploads?: 'auto' | 'always' | 'never'

    /** Cloudflare: Access Key. */
    cloudflare_access_key?: string

    /** Cloudflare: Bucket name */
    cloudflare_bucket?: string

    /** Cloudflare: endpoint */
    cloudflare_endpoint?: string

    /** Internal description for your reference */
    description?: string

    /** Dropbox: If true, list Team folders in root? */
    dropbox_teams?: boolean

    /** `true` if remote server only accepts connections from dedicated IPs */
    enable_dedicated_ips?: boolean

    /** Filebase: Access Key. */
    filebase_access_key?: string

    /** Filebase: Bucket name */
    filebase_bucket?: string

    /** Files.com direct link: API key used once to pair the remote server. */
    files_api_key?: string

    /**
     * Agent file permissions: `read_only`, `write_only`, or `read_write`. Files.com writes this value as
     * `permission_set` in the configuration file generated for this Remote Server. Setting it on Create or Update
     * changes the generated file, not a running Agent. The Agent enforces the permissions in its local configuration
     * file, controlled by the host's system administrator, and reports them at registration, replacing the stored
     * value.
     */
    files_agent_permission_set?: 'read_write' | 'read_only' | 'write_only'

    /**
     * Agent local root path. Files.com writes this value as `root` in the configuration file generated for this Remote
     * Server. Setting it on Create or Update changes the generated file, not a running Agent. The Agent enforces the
     * root in its local configuration file, controlled by the host's system administrator, and reports it at
     * registration, replacing the stored value.
     */
    files_agent_root?: string

    /**
     * Files.com Agent version reported by the Agent at each registration, replacing the stored value. This field is not
     * included in the generated Agent configuration file. Setting it on Create or Update does not update the running
     * Agent.
     */
    files_agent_version?: string

    /** Route traffic to outbound on a files-agent */
    outbound_agent_id?: number

    /**
     * Custom Domain ID whose dedicated IP addresses are selected when this Remote Server uses dedicated IPs. Must be
     * available to this Remote Server's workspace. Requires enable_dedicated_ips and cannot be combined with an
     * outbound Agent. Set to null to use the site's default dedicated IPs.
     */
    custom_domain_id?: number

    /** Google Cloud Storage: Authentication method. Can be json, hmac, or oauth. */
    google_cloud_storage_authentication_method?: 'json' | 'hmac' | 'oauth'

    /** Google Cloud Storage: Bucket Name */
    google_cloud_storage_bucket?: string

    /**
     * Google Cloud Storage: OAuth scope. Can be https://www.googleapis.com/auth/devstorage.read_only or
     * https://www.googleapis.com/auth/devstorage.read_write.
     */
    google_cloud_storage_oauth_scope?: string

    /** Google Cloud Storage: Project ID */
    google_cloud_storage_project_id?: string

    /** Google Cloud Storage: S3-compatible Access Key. */
    google_cloud_storage_s3_compatible_access_key?: string

    /**
     * Hostname or IP address. For Agent Remote Servers, the Agent reports the hostname it connects from at each
     * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
     * Setting it on Create or Update does not change the running Agent.
     */
    hostname?: string

    /** Linode: Access Key */
    linode_access_key?: string

    /** Linode: Bucket name */
    linode_bucket?: string

    /** Linode: region */
    linode_region?: string

    /**
     * Max number of parallel connections.  Ignored for S3 connections (we will parallelize these as much as possible).
     */
    max_connections?: number

    /** Internal name for your reference */
    name?: string

    /** OneDrive: Either personal or business_other account types */
    one_drive_account_type?: 'personal' | 'business_other'

    /**
     * If true, we will ensure that all communications with this remote server are made through the primary region of
     * the site. This setting can also be overridden by a site-wide setting which will force it to true.
     */
    pin_to_site_region?: boolean

    /**
     * Port for remote server. For Agent Remote Servers, the Agent reports its downstream proxy port at each
     * registration, replacing the stored value. This field is not included in the generated Agent configuration file.
     * Setting it on Create or Update does not change the running Agent.
     */
    port?: number

    /**
     * Upload staging path. Applies to SFTP only. If a path is provided here, files will first be uploaded to this path
     * on the remote folder and the moved into the final correct path via an SFTP move command. This is required by some
     * remote MFT systems to emulate atomic uploads, which are otherwise not supoprted by SFTP.
     */
    upload_staging_path?: string

    /** ID of Remote Server Credential, if applicable. */
    remote_server_credential_id?: number

    /** AWS IAM Role ARN for AssumeRole authentication. */
    s3_assume_role_arn?: string

    /** Session duration in seconds for AssumeRole authentication (900-43200). */
    s3_assume_role_duration_seconds?: number

    /** S3 bucket name */
    s3_bucket?: string

    /** S3-compatible: Access Key */
    s3_compatible_access_key?: string

    /** S3-compatible: Bucket name */
    s3_compatible_bucket?: string

    /** S3-compatible: endpoint */
    s3_compatible_endpoint?: string

    /** S3-compatible: region */
    s3_compatible_region?: string

    /** S3-compatible: If true, use virtual-hosted-style URLs instead of path-style URLs */
    s3_compatible_virtual_hosted_style?: boolean

    /**
     * ARN of the AWS KMS key that encrypts files written to the bucket (SSE-KMS). Leave blank unless your bucket
     * requires a specific key.
     */
    s3_kms_key_id?: string

    /** S3 region */
    s3_region?: string

    /** Remote server certificate */
    server_certificate?: 'require_match' | 'allow_any'

    /**
     * Pinned SSH host key or OpenSSH host certificate for SFTP. If omitted, Files.com detects and stores a host key,
     * preferring plain keys over certificates. With `server_certificate=require_match` (the default), the server must
     * present the exact pinned key or certificate and prove it holds the matching private key. A pinned certificate is
     * compared in full, so renewal can require updating `server_host_key` even when its underlying key is unchanged.
     * Files.com does not check certificate CA signatures, principals, or validity periods. Certificate expiration alone
     * does not end the pin. Update `server_host_key` to replace the pin.
     */
    server_host_key?: string

    /** Remote server type. */
    server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com'

    /** SharePoint: Microsoft Entra application client ID for app-only authentication. */
    sharepoint_client_id?: string

    /** SharePoint: Site URL to scope app-only authentication to a single site. Leave blank to browse all sites. */
    sharepoint_site_url?: string

    /** SharePoint: Microsoft Entra tenant ID for app-only authentication. */
    sharepoint_tenant_id?: string

    /** Should we require SSL? */
    ssl?: 'if_available' | 'require' | 'require_implicit' | 'never'

    /** Remote server username. */
    username?: string

    /** Wasabi: Access Key. */
    wasabi_access_key?: string

    /** Wasabi: Bucket name */
    wasabi_bucket?: string

    /** Wasabi: Region */
    wasabi_region?: string
  }
}

export default RemoteServer
