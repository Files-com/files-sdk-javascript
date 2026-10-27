import Files = require('../Files')
import Attachment = require('../Attachment')

/** A Behavior is an API resource for what are also known as Folder Settings. */
declare class Behavior {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Behavior.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Behavior.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Folder behavior ID */
  readonly id?: number | null

  /**
   * Folder path. Note that Behavior paths cannot be updated once initially set. You will need to remove and re-create
   * the behavior on the new path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
   * of 5000 characters.
   */
  readonly path?: string | null

  /** URL for attached file */
  readonly attachment_url?: string | null

  /** Behavior type. */
  readonly behavior?: 'webhook' | 'file_expiration' | 'auto_encrypt' | 'lock_subfolders' | 'storage_region' | 'serve_publicly' | 'create_user_folders' | 'inbox' | 'limit_file_extensions' | 'limit_file_regex' | 'amazon_sns' | 'watermark' | 'remote_server_mount' | 'slack_webhook' | 'auto_decrypt' | 'override_upload_filename' | 'permission_fence' | 'limit_filename_length' | 'organize_files_into_subfolders' | 'teams_webhook' | 'google_pub_sub' | 'archive_overwritten_or_deleted_files' | 'auto_recrypt' | 'metadata_category' | 'auto_unzip' | 'remote_server_metadata_index' | 'malware_scanning' | Files.OtherString | null

  /** Name for this behavior. */
  readonly name?: string | null

  /** Description for this behavior. */
  readonly description?: string | null

  /**
   * Settings for this behavior. See the section above for an example value to provide here. Formatting is different for
   * each Behavior type. May be sent as nested JSON or a single JSON-encoded string. If using XML encoding for the API
   * call, this data must be sent as a JSON-encoded string.
   */
  readonly value?: Behavior.Value | null

  /**
   * Public URL for this publicly hosted folder when the `Serve Publicly` behavior has a key configured. When a Custom
   * Domain with `public_hosting` destination is attached to this behavior, the URL uses that domain. Otherwise it uses
   * the site's `subdomain.hosted-by-files.com` host, unless `custom_domain_only` is enabled, in which case no URL is
   * returned.
   */
  readonly public_hosting_url?: string | null

  /**
   * If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that child
   * folders may override, and requires recursive to be true. Rejected for all other behavior types.
   */
  readonly disable_parent_folder_behavior?: boolean | null

  /**
   * Whether this behavior is recursive for this record. `always` behaviors are always `true`, `never` behaviors are
   * always `false`, and `sometimes` behaviors may be either value.
   */
  readonly recursive?: boolean | null

  /** If true, this behavior is inherited from a higher scope rather than owned by the requested workspace. */
  readonly inherited?: boolean | null

  /** If true, this behavior is controlled by a parent-site policy and cannot be modified locally. */
  readonly managed?: boolean | null

  /**
   * If true, this behavior may only be modified by a site admin because it is at the site root or disables a root
   * behavior.
   */
  readonly root_behavior_site_admin_only?: boolean | null

  /**
   * Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach
   * that file here.
   */
  readonly attachment_file?: Attachment

  /** If `true`, delete the file stored in `attachment`. */
  readonly attachment_delete?: boolean

  /** Folder behavior ID */
  getId(): number | null | undefined

  /**
   * Folder path. Note that Behavior paths cannot be updated once initially set. You will need to remove and re-create
   * the behavior on the new path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
   * of 5000 characters.
   */
  getPath(): string | null | undefined

  /** URL for attached file */
  getAttachmentUrl(): string | null | undefined

  /** Behavior type. */
  getBehavior(): 'webhook' | 'file_expiration' | 'auto_encrypt' | 'lock_subfolders' | 'storage_region' | 'serve_publicly' | 'create_user_folders' | 'inbox' | 'limit_file_extensions' | 'limit_file_regex' | 'amazon_sns' | 'watermark' | 'remote_server_mount' | 'slack_webhook' | 'auto_decrypt' | 'override_upload_filename' | 'permission_fence' | 'limit_filename_length' | 'organize_files_into_subfolders' | 'teams_webhook' | 'google_pub_sub' | 'archive_overwritten_or_deleted_files' | 'auto_recrypt' | 'metadata_category' | 'auto_unzip' | 'remote_server_metadata_index' | 'malware_scanning' | Files.OtherString | null | undefined

  /** Name for this behavior. */
  getName(): string | null | undefined

  /** Description for this behavior. */
  getDescription(): string | null | undefined

  /**
   * Settings for this behavior. See the section above for an example value to provide here. Formatting is different for
   * each Behavior type. May be sent as nested JSON or a single JSON-encoded string. If using XML encoding for the API
   * call, this data must be sent as a JSON-encoded string.
   */
  getValue(): Behavior.Value | null | undefined

  /**
   * Public URL for this publicly hosted folder when the `Serve Publicly` behavior has a key configured. When a Custom
   * Domain with `public_hosting` destination is attached to this behavior, the URL uses that domain. Otherwise it uses
   * the site's `subdomain.hosted-by-files.com` host, unless `custom_domain_only` is enabled, in which case no URL is
   * returned.
   */
  getPublicHostingUrl(): string | null | undefined

  /**
   * If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that child
   * folders may override, and requires recursive to be true. Rejected for all other behavior types.
   */
  getDisableParentFolderBehavior(): boolean | null | undefined

  /**
   * Whether this behavior is recursive for this record. `always` behaviors are always `true`, `never` behaviors are
   * always `false`, and `sometimes` behaviors may be either value.
   */
  getRecursive(): boolean | null | undefined

  /** If true, this behavior is inherited from a higher scope rather than owned by the requested workspace. */
  getInherited(): boolean | null | undefined

  /** If true, this behavior is controlled by a parent-site policy and cannot be modified locally. */
  getManaged(): boolean | null | undefined

  /**
   * If true, this behavior may only be modified by a site admin because it is at the site root or disables a root
   * behavior.
   */
  getRootBehaviorSiteAdminOnly(): boolean | null | undefined

  /**
   * Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach
   * that file here.
   */
  getAttachmentFile(): Attachment | undefined

  /** If `true`, delete the file stored in `attachment`. */
  getAttachmentDelete(): boolean | undefined

  /** Folder behavior ID */
  setId(value: number): void

  /**
   * Folder path. Note that Behavior paths cannot be updated once initially set. You will need to remove and re-create
   * the behavior on the new path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
   * of 5000 characters.
   */
  setPath(value: string): void

  /** URL for attached file */
  setAttachmentUrl(value: string): void

  /** Behavior type. */
  setBehavior(value: string): void

  /** Name for this behavior. */
  setName(value: string): void

  /** Description for this behavior. */
  setDescription(value: string): void

  /**
   * Settings for this behavior. See the section above for an example value to provide here. Formatting is different for
   * each Behavior type. May be sent as nested JSON or a single JSON-encoded string. If using XML encoding for the API
   * call, this data must be sent as a JSON-encoded string.
   */
  setValue(value: Behavior.Value): void

  /**
   * Public URL for this publicly hosted folder when the `Serve Publicly` behavior has a key configured. When a Custom
   * Domain with `public_hosting` destination is attached to this behavior, the URL uses that domain. Otherwise it uses
   * the site's `subdomain.hosted-by-files.com` host, unless `custom_domain_only` is enabled, in which case no URL is
   * returned.
   */
  setPublicHostingUrl(value: string): void

  /**
   * If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that child
   * folders may override, and requires recursive to be true. Rejected for all other behavior types.
   */
  setDisableParentFolderBehavior(value: boolean): void

  /**
   * Whether this behavior is recursive for this record. `always` behaviors are always `true`, `never` behaviors are
   * always `false`, and `sometimes` behaviors may be either value.
   */
  setRecursive(value: boolean): void

  /** If true, this behavior is inherited from a higher scope rather than owned by the requested workspace. */
  setInherited(value: boolean): void

  /** If true, this behavior is controlled by a parent-site policy and cannot be modified locally. */
  setManaged(value: boolean): void

  /**
   * If true, this behavior may only be modified by a site admin because it is at the site root or disables a root
   * behavior.
   */
  setRootBehaviorSiteAdminOnly(value: boolean): void

  /**
   * Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach
   * that file here.
   */
  setAttachmentFile(value: Attachment): void

  /** If `true`, delete the file stored in `attachment`. */
  setAttachmentDelete(value: boolean): void

  /** Update Behavior */
  update(params?: Behavior.UpdateParams): Promise<this>

  /** Delete Behavior */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Behaviors */
  static list(params?: Behavior.ListParams, options?: Files.RequestOptions): Promise<Behavior[]>

  /** Alias of `list()`. */
  static all(params?: Behavior.ListParams, options?: Files.RequestOptions): Promise<Behavior[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Behavior.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Behavior>

  /**
   * Show Behavior
   * @param id - Behavior ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Behavior>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Behavior>

  /**
   * List Behaviors by Path
   * @param path - Path to operate on.
   */
  static listFor(path: string, params?: Behavior.ListForParams, options?: Files.RequestOptions): Promise<Behavior[]>

  /**
   * The models `listFor()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForIterator(path: string, params?: Behavior.ListForParams, options?: Files.RequestOptions): AsyncIterableIterator<Behavior>

  /** Create Behavior */
  static create(params: Behavior.CreateParams, options?: Files.RequestOptions): Promise<Behavior>

  /** Test Webhook */
  static webhookTest(params: Behavior.WebhookTestParams, options?: Files.RequestOptions): Promise<void>

  static default: typeof Behavior
}

declare namespace Behavior {
  /** The fields of `Behavior` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Folder behavior ID */
    id?: number | null

    /**
     * Folder path. Note that Behavior paths cannot be updated once initially set. You will need to remove and re-create
     * the behavior on the new path. This must be slash-delimited, but it must neither start nor end with a slash.
     * Maximum of 5000 characters.
     */
    path?: string | null

    /** URL for attached file */
    attachment_url?: string | null

    /** Behavior type. */
    behavior?: 'webhook' | 'file_expiration' | 'auto_encrypt' | 'lock_subfolders' | 'storage_region' | 'serve_publicly' | 'create_user_folders' | 'inbox' | 'limit_file_extensions' | 'limit_file_regex' | 'amazon_sns' | 'watermark' | 'remote_server_mount' | 'slack_webhook' | 'auto_decrypt' | 'override_upload_filename' | 'permission_fence' | 'limit_filename_length' | 'organize_files_into_subfolders' | 'teams_webhook' | 'google_pub_sub' | 'archive_overwritten_or_deleted_files' | 'auto_recrypt' | 'metadata_category' | 'auto_unzip' | 'remote_server_metadata_index' | 'malware_scanning' | Files.OtherString | null

    /** Name for this behavior. */
    name?: string | null

    /** Description for this behavior. */
    description?: string | null

    /**
     * Settings for this behavior. See the section above for an example value to provide here. Formatting is different
     * for each Behavior type. May be sent as nested JSON or a single JSON-encoded string. If using XML encoding for the
     * API call, this data must be sent as a JSON-encoded string.
     */
    value?: Behavior.Value | null

    /**
     * Public URL for this publicly hosted folder when the `Serve Publicly` behavior has a key configured. When a Custom
     * Domain with `public_hosting` destination is attached to this behavior, the URL uses that domain. Otherwise it
     * uses the site's `subdomain.hosted-by-files.com` host, unless `custom_domain_only` is enabled, in which case no
     * URL is returned.
     */
    public_hosting_url?: string | null

    /**
     * If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that
     * child folders may override, and requires recursive to be true. Rejected for all other behavior types.
     */
    disable_parent_folder_behavior?: boolean | null

    /**
     * Whether this behavior is recursive for this record. `always` behaviors are always `true`, `never` behaviors are
     * always `false`, and `sometimes` behaviors may be either value.
     */
    recursive?: boolean | null

    /** If true, this behavior is inherited from a higher scope rather than owned by the requested workspace. */
    inherited?: boolean | null

    /** If true, this behavior is controlled by a parent-site policy and cannot be modified locally. */
    managed?: boolean | null

    /**
     * If true, this behavior may only be modified by a site admin because it is at the site root or disables a root
     * behavior.
     */
    root_behavior_site_admin_only?: boolean | null

    /**
     * Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach
     * that file here.
     */
    attachment_file?: Attachment

    /** If `true`, delete the file stored in `attachment`. */
    attachment_delete?: boolean
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `behavior`. */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `clickwrap_id`,
     * `form_field_set_id`, `impacts_ui`, `remote_server_id` or `behavior`. Valid field combinations are `[ impacts_ui,
     * behavior ]` and `[ behavior, remote_server_id ]`.
     */
    filter?: Files.JsonObject
  }

  interface ListForParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `behavior`. */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `impacts_ui`
     * and `behavior`. Valid field combinations are `[ impacts_ui, behavior ]`.
     */
    filter?: Files.JsonObject

    /** If `true`, behaviors above this path are shown. */
    ancestor_behaviors?: boolean
  }

  interface CreateParams {
    /**
     * This field stores data specific to the type of behavior. See The Behavior Types section for the accepted value
     * for each type of behavior.
     */
    value?: Behavior.Value

    /**
     * Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach
     * that file here.
     */
    attachment_file?: Attachment

    /**
     * If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that
     * child folders may override, and requires recursive to be true. Rejected for all other behavior types.
     */
    disable_parent_folder_behavior?: boolean

    /**
     * Whether the behavior should apply to child folders. This is only configurable for behavior types whose recursion
     * mode is `sometimes`; `always` behaviors stay recursive and `never` behaviors stay non-recursive.
     */
    recursive?: boolean

    /** Name for this behavior. */
    name?: string

    /** Description for this behavior. */
    description?: string

    /** Path where this behavior should apply. */
    path: string

    /** Behavior type. */
    behavior: string
  }

  interface WebhookTestParams {
    /** URL for testing the webhook. */
    url: string

    /** HTTP request method (GET or POST). */
    method?: string

    /** Encoding type for the webhook payload. Can be JSON, XML, or RAW (form data). */
    encoding?: string

    /** Additional request headers to send via HTTP. */
    headers?: Files.JsonObject

    /** Additional body parameters to include in the webhook payload. */
    body?: Files.JsonObject

    /** Action for test body. */
    action?: string
  }

  interface UpdateParams {
    /**
     * This field stores data specific to the type of behavior. See The Behavior Types section for the accepted value
     * for each type of behavior.
     */
    value?: Behavior.Value

    /**
     * Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach
     * that file here.
     */
    attachment_file?: Attachment

    /**
     * If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that
     * child folders may override, and requires recursive to be true. Rejected for all other behavior types.
     */
    disable_parent_folder_behavior?: boolean

    /**
     * Whether the behavior should apply to child folders. This is only configurable for behavior types whose recursion
     * mode is `sometimes`; `always` behaviors stay recursive and `never` behaviors stay non-recursive.
     */
    recursive?: boolean

    /** Name for this behavior. */
    name?: string

    /** Description for this behavior. */
    description?: string

    /** If `true`, delete the file stored in `attachment`. */
    attachment_delete?: boolean
  }

  /** Settings for a Behavior. The accepted value shape is selected by the sibling `behavior` property. */
  type Value =
    | Behavior.Value.Webhook
    | Behavior.Value.FileExpiration
    | Behavior.Value.AutoEncrypt
    | Behavior.Value.LockSubfolders
    | Behavior.Value.StorageRegion
    | Behavior.Value.ServePublicly
    | Behavior.Value.CreateUserFolders
    | Behavior.Value.Inbox
    | Behavior.Value.LimitFileExtensions
    | Behavior.Value.LimitFileRegex
    | Behavior.Value.AmazonSns
    | Behavior.Value.Watermark
    | Behavior.Value.RemoteServerMount
    | Behavior.Value.SlackWebhook
    | Behavior.Value.AutoDecrypt
    | Behavior.Value.OverrideUploadFilename
    | Behavior.Value.PermissionFence
    | Behavior.Value.LimitFilenameLength
    | Behavior.Value.OrganizeFilesIntoSubfolders
    | Behavior.Value.TeamsWebhook
    | Behavior.Value.GooglePubSub
    | Behavior.Value.ArchiveOverwrittenOrDeletedFiles
    | Behavior.Value.AutoRecrypt
    | Behavior.Value.MetadataCategory
    | Behavior.Value.AutoUnzip
    | Behavior.Value.RemoteServerMetadataIndex
    | Behavior.Value.MalwareScanning

  namespace Value {
    type Triggers = Array<'*' | 'create' | 'copy' | 'move' | 'archived_delete' | 'update' | 'read' | 'destroy'>

    type GpgKeyId = number

    type GpgKeyIds = Behavior.Value.GpgKeyId[]

    type PartnerId = number

    /** Requested upload slot */
    interface RequestedUploadSlot {
      /**
       * Upload slot label and destination subfolder name. Must be a valid single folder name without trailing
       * whitespace, and unique regardless of letter case or accents.
       */
      name: string
    }

    /** AWS credentials */
    interface AwsCredentials {
      access_key_id: string

      region?: string

      /** Accepted in requests; never returned by the API. */
      secret_access_key?: string
    }

    /** Google service account credentials */
    interface GoogleCredentials {
      type?: string

      project_id?: string

      private_key_id?: string

      /** Accepted in requests; never returned by the API. */
      private_key?: string

      client_email?: string

      client_id?: string

      auth_uri?: string

      token_uri?: string

      auth_provider_x509_cert_url?: string

      client_x509_cert_url?: string

      universe_domain?: string

      quota_project_id?: string
    }

    /** Google Pub/Sub project and topic */
    interface GoogleProjectTopic {
      project_id: string
      topic_id: string
    }

    /** An object containing JSON values. */
    type JsonObject = {
      [key: string]: Files.JsonValue
    }

    /** Webhook value */
    interface Webhook {
      /** Array of URLs to send the webhook to. */
      urls: string[]

      /** Default: `GET`.  May also be set to `POST`. */
      method?: string

      /**
       * Leave blank or use `*` to send webhooks on any action on this folder. Otherwise, specify an array of action
       * types.
       */
      triggers?: Behavior.Value.Triggers

      /**
       * Leave blank to trigger webhooks on any file in this folder. Or you may specify an array of filenames (possibly
       * with wildcards) to match for action path.
       */
      triggering_filenames?: string[]

      /**
       * Leave blank and no files will be excluded. Or specify an array of filenames (with optional wildcards) to
       * exclude certain files from triggering the webhook based on their name. This setting takes precedence over the
       * `triggering_filenames` setting if a path matches both settings.
       */
      exclude_filenames?: string[]

      /**
       * May be `JSON`, `XML`, `RAW`, `EV1`, or `EV2`. If set to `RAW` or left blank, we will deliver the webhook using
       * the HTTP GET params or POST body. If JSON or XML, we will encode the payload accordingly and send a matching
       * `Content-Type` header. If set to EV1, we will encode the payload to emulate ExaVault's version 1 webhook
       * format. If set to EV2, we will encode the payload to emulate ExaVault's version 2.0 webhook format.
       */
      encoding?: string

      /** Hash of HTTP Headers to send. */
      headers?: {
        [key: string]: string
      }

      /** Hash of Body Params to send. */
      body?: Behavior.Value.JsonObject

      /**
       * If provided, signs webhook messages. X-Files-Signature-V2 is the lowercase hexadecimal HMAC-SHA256 of the exact
       * POST body or GET query string (without the leading ?), using this token as the key. X-Files-Signature remains
       * available for existing integrations.
       */
      verification_token?: string

      /**
       * A string specifying the name of a form field containing the contents of the file that triggered this webhook
       * send. If this value is present, the webhook will submit a `multipart/form-data` POST with no request body
       * encoding.
       */
      file_form_field?: string

      /**
       * When sending webhook requests, submit the contents of the file that triggered this webhook send as the request
       * body.
       */
      file_as_body?: boolean

      /**
       * If set to true, we will send webhooks from dedicated IPs. This is useful if you need to whitelist IPs for your
       * webhook endpoint.
       */
      use_dedicated_ips?: boolean
    }

    /** File expiration value */
    interface FileExpiration {
      /** Number of days to keep files around. */
      days_to_retain: number

      /**
       * If `true`, delete empty folders inside this tree after expired files are removed. Folders with explicit
       * configuration, such as permissions, notifications, or behaviors, are preserved.
       * @defaultValue false
       */
      delete_empty_folders?: boolean
    }

    /** Auto encrypt value */
    interface AutoEncrypt {
      /**
       * Your GPG Key ID object to use for this operation.
       * @deprecated
       */
      gpg_key_id?: Behavior.Value.GpgKeyId

      /** Your GPG Key ID objects to use for this operation. */
      gpg_key_ids?: Behavior.Value.GpgKeyIds

      /**
       * Must be set to `PGP/GPG`.  If we support other options in the future (like OpenSSL), we will amend this option.
       */
      algorithm: 'PGP/GPG'

      /** Optional GPG Key ID object to use for signing the encrypted file. */
      signing_key_id?: Behavior.Value.GpgKeyId

      /** Suffix to apply to filenames once they've been uploaded. */
      suffix?: string

      /** If `true`, encrypted files are written as ASCII text. */
      armor?: boolean

      /** If set, use the Partner's key for encryption. */
      gpg_key_partner_id?: Behavior.Value.PartnerId

      /**
       * MD5 digest of the configured public key material.
       * Returned by the API; not accepted in requests.
       */
      key_md5?: string

      /**
       * MD5 digest of the configured private key material.
       * Returned by the API; not accepted in requests.
       */
      private_key_md5?: string

      /**
       * MD5 digest of the configured private key password.
       * Returned by the API; not accepted in requests.
       */
      private_key_password_md5?: string

      /**
       * MD5 digest of the configured signing key material.
       * Returned by the API; not accepted in requests.
       */
      signing_key_md5?: string

      /**
       * MD5 digest of the configured signing key password.
       * Returned by the API; not accepted in requests.
       */
      signing_key_password_md5?: string
    }

    /** Lock subfolders value */
    interface LockSubfolders {
      /** Which folders the lock applies to. Can be `children_recursive` (default), `children`, `self`, or `none`. */
      level?: 'children_recursive' | 'children' | 'self' | 'none'
    }

    /** Valid AWS region. */
    type StorageRegion = 'us-east-1' | 'eu-west-1'

    /** Serve publicly value */
    interface ServePublicly {
      /**
       * URL path for where the stuff is publicly hosted. It will look like
       * `https://SUBDOMAIN.hosted-by-files.com/{key}/`.
       */
      key?: string

      /**
       * If true, show an index page listing the folder contents.
       * @defaultValue false
       */
      show_index?: boolean

      /**
       * If true, send the Content-Disposition: attachment header, instructing browsers to always download files and not
       * display them in the browser.
       * @defaultValue false
       */
      force_download?: boolean

      /**
       * Serve hosted content with Content-Security-Policy: sandbox to give HTML an opaque origin and disable scripts,
       * forms, and popups. Enable this for any hosted folder writable by someone other than an administrator.
       * @defaultValue false
       */
      sandbox_html?: boolean

      /**
       * Serve this folder only on additional custom domains bound to it. Requires a bound Public Hosting custom domain.
       * The shared hosting address no longer serves this folder.
       * @defaultValue false
       */
      custom_domain_only?: boolean

      /**
       * Username required to access the publicly hosted folder. Returned only to site administrators and users with
       * administrative permission on this behavior's folder.
       */
      username?: string

      /**
       * Password required to access the publicly hosted folder.
       * Accepted in requests; never returned by the API.
       */
      password?: string

      /**
       * Whether password authentication is configured.
       * Returned by the API; not accepted in requests.
       */
      password_required?: boolean

      /**
       * Enable CORS headers for cross-origin requests
       * @defaultValue false
       */
      cors_enabled?: boolean

      /**
       * Exact HTTP or HTTPS origins allowed to access this folder through CORS. Include nondefault ports when needed.
       * Wildcards and null origins are not supported. An omitted or empty list allows any non-null origin for folders
       * without site authentication. Cross-origin requests to folders requiring site authentication need an explicit
       * allowed origin. Applies only when cors_enabled is true.
       */
      cors_allowed_origins?: string[]

      /**
       * Require Files.com site authentication before visitors can access this publicly hosted folder.
       * @defaultValue false
       */
      require_site_authentication?: boolean
    }

    /** Create user folders value */
    interface CreateUserFolders {
      /**
       * What permission level to give the user on his or her new folder? Takes the same options as the Permissions
       * endpoint.
       */
      permission?: 'full' | 'readonly' | 'writeonly' | 'list' | 'history' | 'admin' | 'bundle' | 'site_admin' | 'readonly_site_admin' | 'previewonly'

      /**
       * Additional permission level to give the user on his or her new folder. Used to apply a second permission. Takes
       * the same options as the Permissions endpoint.
       */
      additional_permission?: 'full' | 'readonly' | 'writeonly' | 'list' | 'history' | 'admin' | 'bundle' | 'site_admin' | 'readonly_site_admin' | 'previewonly'

      /**
       * Apply this behavior to existing users or only newly added users?
       * @defaultValue false
       */
      existing_users?: boolean

      /** Only apply this behavior to users who are members of this group ID. */
      group_id?: number

      /**
       * What to name the new folder. Currently we support `name` and `username`. `name` will fall back to `username` if
       * not present or not a valid folder name. Default value is `name`. If the path already exists, a numbered suffix
       * is used to create a separate folder.
       */
      new_folder_name?: 'name' | 'username'

      /** Subfolders to create within the new folder. */
      subfolders?: string[]
    }

    /** Inbox value */
    interface Inbox {
      /** URL key used for the inbox.  May only contain lowercase alphabetic characters, numbers, and dashes. */
      key: string

      /**
       * Do not create subfolders for files uploaded to this inbox. Note: there are subtle security pitfalls with
       * allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this
       * option unless absolutely required.
       * @defaultValue false
       */
      dont_separate_submissions_by_folder?: boolean

      /**
       * Do not create subfolders for inbound email uploads to this inbox. This exists for backwards compatibility for
       * older inboxes that already used inbound email.
       * @defaultValue false
       */
      dont_separate_submissions_by_folder_for_inbound_email?: boolean

      /**
       * If set to `true`, will prevent folders from being created inside an inbox submission. Useful for certain
       * automation use cases where nested folders don't work well.
       * @defaultValue false
       */
      dont_allow_folders_in_uploads?: boolean

      /**
       * If set to `true`, requires that the inbox be shared with specific recipients rather than being accessed via a
       * URL directly.
       * @defaultValue false
       */
      require_inbox_recipient?: boolean

      /**
       * Show this inbox on the login page of your website.  Only settable by admins.
       * @defaultValue false
       */
      show_on_login_page?: boolean

      /** Clickwrap ID required before submitting to the Inbox. */
      clickwrap_id?: number

      /** Form Field Set ID used by the Inbox. */
      form_field_set_id?: number

      /** Title of the Inbox. Must be unique per site. */
      title: string

      /** Description of the inbox shown on the actual inbox page. */
      description?: string

      /** Help text shown on the inbox page. */
      help_text?: string

      /**
       * Show a registration page that captures the uploader's name and email address?
       * @defaultValue false
       */
      require_registration?: boolean

      /**
       * Password to authenticate to inbox.
       * Accepted in requests; never returned by the API.
       */
      password?: string

      /**
       * Whether password authentication is configured.
       * Returned by the API; not accepted in requests.
       */
      has_password_hash?: boolean

      /**
       * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company,
       * `strftime` directives, and any custom form data.
       */
      path_template?: string

      /** Timezone to use when rendering timestamps in path templates. */
      path_template_time_zone?: string

      /**
       * This is only used when creating/updating a behavior. If set to `true`, will generate inbound_email_address to
       * this folder. If set to `false`, will remove inbound_email_address to this folder. Please note that the uploads
       * via email doesn't work if require_registration or password options are set to `true`.
       * Accepted in requests; never returned by the API.
       */
      enable_inbound_email_address?: boolean

      /**
       * Generated inbound email address.
       * Returned by the API; not accepted in requests.
       */
      inbound_email_address?: string

      /**
       * If `true`, notify the sender on successful uploads via email.
       * @defaultValue false
       */
      notify_senders_on_successful_uploads_via_email?: boolean

      /**
       * Notify senders on successful uploads via web. Please note that the notifications on web uploads only works if
       * require_registration is set to `true`.
       * @defaultValue false
       */
      notify_senders_on_successful_uploads_via_web?: boolean

      /**
       * If `true`, only allow uploads from whitelisted email addresses and domains. This only applies to uploads via
       * email when enabled.
       * @defaultValue false
       */
      allow_whitelisting?: boolean

      /**
       * Comma-separated string of whitelisted email addresses and domains. This only applies to uploads via email when
       * enabled
       */
      whitelist?: string

      /**
       * If `true`, disable the upload URL.
       * @defaultValue false
       */
      disable_web_upload?: boolean

      /** If set, the plain-text body of email submissions will be saved with this name. */
      capture_email_body_filename?: string

      /**
       * If set, the HTML body of email submissions will be saved with this name when the message contains HTML. Can be
       * enabled alongside body and raw email capture.
       */
      capture_email_body_html_filename?: string

      /**
       * If set, the complete received email, including headers, body, and attachments, will be saved with this name
       * alongside extracted attachments.
       */
      capture_email_raw_filename?: string

      /**
       * Upload slots requested on the public Inbox page. Each slot name is used as its label and destination subfolder
       * name. Names must be valid single folder names without trailing whitespace, and unique regardless of letter case
       * or accents.
       */
      requested_upload_slots?: Behavior.Value.RequestedUploadSlot[]
    }

    /** Limit file extensions value */
    interface LimitFileExtensions {
      /** Array of whitelisted/blacklisted file extensions, depending on `mode`. */
      extensions: string[]

      /**
       * Controls whether the behavior acts as a whitelist or as a blacklist. Default is `whitelist`.
       * @defaultValue 'whitelist'
       */
      mode?: 'whitelist' | 'blacklist'
    }

    /** Single-element Array (not a hash) containing the regular expression, which must start and end with slashes. */
    type LimitFileRegex = string[]

    /** Amazon sns value */
    interface AmazonSns {
      /** Array of ARNs to send the notifications to. */
      arns: string[]

      /**
       * Leave blank or use `*` to send an SNS notification on any action on this folder. Otherwise, specify an array of
       * action types.
       */
      triggers?: Behavior.Value.Triggers

      /** AWS IAM Credentials to use for sending SNS requests. Must include `access_key_id`, and `secret_access_key`. */
      aws_credentials?: Behavior.Value.AwsCredentials

      /** Additional body parameters to include in the notification. */
      body?: Behavior.Value.JsonObject
    }

    /** Watermark value */
    interface Watermark {
      /**
       * Where to locate the watermark? Valid values: `Center`, `East`, `NorthEast`, `North`, `NorthWest`, `SouthEast`,
       * `South`, `SouthWest`, `West`.
       */
      gravity?: 'Center' | 'East' | 'NorthEast' | 'North' | 'NorthWest' | 'SouthEast' | 'South' | 'SouthWest' | 'West'

      /** Max width/height as percent of image preview. */
      max_height_or_width?: number

      /** Percentage applied to the watermark. */
      transparency?: number

      /** Watermark text. Use {{user}} to embed a username into the string. */
      dynamic_text?: string
    }

    /** Remote server mount value */
    interface RemoteServerMount {
      /** ID of the remote server to mount.  See the Remote Servers API resource for managing these. */
      remote_server_id: number

      /**
       * Path on remote server to treat as the root of this mount. This should be an absolute path on the remote server.
       * This must be slash-delimited, but it must neither start nor end with a slash, and it must not contain relative
       * path components.
       */
      remote_path?: string
    }

    /** Slack webhook value */
    interface SlackWebhook {
      /**
       * Send each activity immediately, or summarize file activity by first-level subfolder. Nested files contribute to
       * their first-level subfolder.
       * @defaultValue 'immediate'
       */
      delivery_mode?: 'immediate' | 'subfolder_summary'

      /**
       * Seconds without new matching activity before sending a subfolder summary. Continuous activity closes the
       * summary after 10 minutes.
       * @defaultValue 60
       */
      summary_delay?: number

      /** Slack issued URL to send the webhook to. */
      url: string

      /** Username to display in Slack. */
      username?: string

      /** Channel is send the webhook to. */
      channel?: string

      /** Slack emoji to display in Slack, e.g. :robot_face:. */
      icon_emoji?: string

      /**
       * Leave blank or use `*` to send webhooks on any action on this folder. Otherwise, specify an array of action
       * types.
       */
      triggers?: Behavior.Value.Triggers
    }

    /** Auto decrypt value */
    interface AutoDecrypt {
      /**
       * Your GPG Key ID object to use for this operation.
       * @deprecated
       */
      gpg_key_id?: Behavior.Value.GpgKeyId

      /** Your GPG Key ID objects to use for this operation. */
      gpg_key_ids?: Behavior.Value.GpgKeyIds

      /**
       * Must be set to `PGP/GPG`.  If we support other options in the future (like OpenSSL), we will amend this option.
       */
      algorithm: 'PGP/GPG'

      /** Filename suffix that if present will be removed after decryption. */
      suffix?: string

      /** Set to true if you want to ignore any errors from the MDC (modification detection code) check. */
      ignore_mdc_error?: boolean

      /** If set, use the Partner's key for decryption. */
      gpg_key_partner_id?: Behavior.Value.PartnerId

      /**
       * If set, use every accessible private GPG key in this behavior's workspace for decryption instead of specific
       * GPG key IDs.
       */
      use_all_private_keys?: boolean

      /**
       * MD5 digest of the configured public key material.
       * Returned by the API; not accepted in requests.
       */
      key_md5?: string

      /**
       * MD5 digest of the configured private key material.
       * Returned by the API; not accepted in requests.
       */
      private_key_md5?: string

      /**
       * MD5 digest of the configured private key password.
       * Returned by the API; not accepted in requests.
       */
      private_key_password_md5?: string
    }

    /** Override upload filename value */
    interface OverrideUploadFilename {
      /**
       * Format for filename override. You may use anything from the list `%Fl, %Ff, %Fe, %Fb, %Fp, %Fb, %Fn, %pX, %PX`.
       * You can mix flags with regular chars and use anything accepted by the standard UNIX `date` command or
       * `strftime`.
       */
      filename_override_pattern?: string

      /**
       * If provided, we will replace this string in the filename with the value in `filename_replace_to`. This
       * replacement is performed after the other patterns are applied.
       */
      filename_replace_from?: string

      /**
       * If `filename_replace_from` is provided, this value will be used to replace it in the filename. This replacement
       * is performed after the other patterns are applied.
       */
      filename_replace_to?: string

      /**
       * If provided, we will replace text matched by this regular expression in the filename with the value in
       * `filename_regex_replace_to`. Capture groups may be referenced in `filename_regex_replace_to` using Ruby-style
       * backreferences such as `\1` or named backreferences such as `\k<name>`. JavaScript-style backreferences such as
       * `$1` and `${name}` are also accepted. This replacement is performed after simple filename replacement.
       */
      filename_regex_replace_from?: string

      /**
       * If `filename_regex_replace_from` is provided, this value will replace regular expression matches in the
       * filename. Capture groups may be referenced using `\1`, `\k<name>`, `$1`, or `${name}`. This replacement is
       * performed after simple filename replacement.
       */
      filename_regex_replace_to?: string

      /**
       * Accepts any valid timezone value from the web interface (e.g. "Eastern Time (US & Canada)") or a UTC offset
       * ("-05:00"). Omit parameter for UTC time.
       */
      time_zone?: string
    }

    /** Permission fence value */
    interface PermissionFence {
      /** Which permissions to fence. Currently only 'all' is supported. */
      fenced_permissions?: 'all'
    }

    /** Limit filename length value */
    interface LimitFilenameLength {
      /** Number of characters to limit filenames to. */
      max_length: number

      /**
       * Shorten the filename if it exceeds the maximum length.
       * @defaultValue false
       */
      shorten?: boolean
    }

    /** Organize files into subfolders value */
    interface OrganizeFilesIntoSubfolders {
      /** Subfolder creation type for this folder. */
      subfolder_name_type: 'regex' | 'extension' | 'created_at' | 'provided_modified_at'

      /**
       * Valid regular expression used to determine the subfolder name. This is used when `subfolder_name_type` is
       * `regex`.
       */
      regex?: string

      /**
       * DateTime string format used to determine the subfolder name. This is used when `subfolder_name_type` is
       * `created_at` or `provided_modified_at`.
       */
      strftime_format?: string

      /**
       * Time zone (in Rails TimeZone name format) to be used when interpreting `strftime_format`. If not set, UTC will
       * be used.
       */
      time_zone?: string

      /**
       * If `true`, apply the current behavior (new or existing) to the files in the folder.
       * Accepted in requests; never returned by the API.
       */
      apply_behavior?: boolean
    }

    /** Teams webhook value */
    interface TeamsWebhook {
      /**
       * Send each activity immediately, or summarize file activity by first-level subfolder. Nested files contribute to
       * their first-level subfolder.
       * @defaultValue 'immediate'
       */
      delivery_mode?: 'immediate' | 'subfolder_summary'

      /**
       * Seconds without new matching activity before sending a subfolder summary. Continuous activity closes the
       * summary after 10 minutes.
       * @defaultValue 60
       */
      summary_delay?: number

      /** Teams issued URL to send the webhook to. */
      url: string

      /**
       * Leave blank or use `*` to send webhooks on any action on this folder. Otherwise, specify an array of action
       * types.
       */
      triggers?: Behavior.Value.Triggers
    }

    /** Google pub sub value */
    interface GooglePubSub {
      /**
       * Array of pairs of project_id => topic_id to send the notification to. topic_id must be the Pub/Sub topic ID,
       * not a full resource path or publish endpoint.
       */
      projects_topics: Behavior.Value.GoogleProjectTopic[]

      /**
       * Leave blank or use `*` to publish a notification on any action on this folder. Otherwise, specify an array of
       * action types.
       */
      triggers?: Behavior.Value.Triggers

      /**
       * Google Service Account credentials used to send Google Pub/Sub requests, as an object. The key file contents as
       * a JSON string are also accepted. Responses omit private_key.
       */
      google_credentials: Behavior.Value.GoogleCredentials

      /** Additional body parameters to include in the notification. */
      body?: Behavior.Value.JsonObject
    }

    /** Archive overwritten or deleted files value */
    interface ArchiveOverwrittenOrDeletedFiles {
      /** Absolute path where deleted or overwritten items will be relocated. */
      archive_path: string
    }

    /** Auto recrypt value */
    interface AutoRecrypt {
      /** Your GPG Key ID object(s) to use for decryption. */
      decrypt_gpg_key_ids?: Behavior.Value.GpgKeyIds

      /** Your GPG Key ID object(s) to use for encryption. */
      encrypt_gpg_key_ids?: Behavior.Value.GpgKeyIds

      /** If set, use the Partner's key for decryption. */
      decrypt_gpg_key_partner_id?: Behavior.Value.PartnerId

      /** If set, use the Partner's key for encryption. */
      encrypt_gpg_key_partner_id?: Behavior.Value.PartnerId

      /** Set to true if you want to ignore any errors from the MDC (modification detection code) check. */
      ignore_mdc_error?: boolean

      /** Optional GPG Key ID object to use for signing the encrypted file. */
      signing_key_id?: Behavior.Value.GpgKeyId

      /** If `true`, encrypted files are written as ASCII text. */
      armor?: boolean
    }

    /** Metadata category value */
    interface MetadataCategory {
      /** ID of the MetadataCategory to assign to this folder. */
      metadata_category_id: number
    }

    /** Auto unzip value */
    interface AutoUnzip {
      /**
       * Full destination folder path, relative to the site root or the selected workspace root, where ZIP contents will
       * be extracted. Must be strictly below the behavior's folder; for a behavior at `foo/bar`, use
       * `foo/bar/unzipped/%Y/%m/%d`. Path normalization discards `.` and `..` segments rather than resolving them to a
       * parent folder. Supports automation-style path tokens such as strftime directives, `%p1`, `%P1`, `%Ff`, and
       * `%tf`.
       */
      destination_path: string

      /** Timezone to use when rendering timestamp tokens in destination_path. */
      path_time_zone?: string
    }

    /** Remote server metadata index value */
    interface RemoteServerMetadataIndex {
      /**
       * Frequency, in minutes, for polling the remote folder and indexing remote metadata locally.
       * @defaultValue 1440
       */
      interval_minutes?: number

      /**
       * System-managed flag that indicates whether the initial metadata index scan has completed.
       * Returned by the API; not accepted in requests.
       */
      initial_scan_completed?: boolean
    }

    /** Malware scanning value */
    type MalwareScanning = { [key: string]: never }
  }
}

export = Behavior
