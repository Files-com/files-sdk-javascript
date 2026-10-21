import Files = require('../Files')

/** An APIKey is a key that allows programmatic access to your Site. */
declare class ApiKey {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ApiKey.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ApiKey.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** API Key ID */
  readonly id?: number | null

  /**
   * Unique label that describes this API key. Useful for external systems where you may have API keys from multiple
   * accounts and want a human-readable label for each key.
   */
  readonly descriptive_label?: string | null

  /** User-supplied description of API key. */
  readonly description?: string | null

  /** Time which API Key was created */
  readonly created_at?: Files.DateTimeString | null

  /** API Key expiration date */
  readonly expires_at?: Files.DateTimeString | null

  /** API Key actual key string */
  readonly key?: string | null

  /**
   * If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
   */
  readonly aws_style_credentials?: boolean | null

  /** AWS Access Key ID to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
  readonly aws_access_key_id?: string | null

  /** AWS Secret Key to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
  readonly aws_secret_key?: string | null

  /**
   * API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be
   * up to 3 hours later than this timestamp.
   */
  readonly last_use_at?: Files.DateTimeString | null

  /** Internal name for the API Key.  For your use. */
  readonly name?: string | null

  /**
   * Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions
   * provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only
   * perform the functions provided by our Mobile App (File and Share Link operations). Keys with the
   * `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with
   * office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and
   * file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations
   * as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`.
   * On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned
   * keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and
   * destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is
   * a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide
   * migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use
   * site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user.
   * Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`.
   * Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
   */
  readonly permission_set?: 'none' | 'full' | 'desktop_app' | 'sync_app' | 'office_integration' | 'mobile_app' | 'files_only' | Files.OtherString | null

  /** If this API key represents a Desktop app, what platform was it created on? */
  readonly platform?: string | null

  /** Site ID */
  readonly site_id?: number | null

  /** Site Name */
  readonly site_name?: string | null

  /** URL for API host. */
  readonly url?: string | null

  /** User ID for the owner of this API Key.  May be blank for Site-wide API Keys. */
  readonly user_id?: number | null

  /** Workspace ID for this API Key. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /**
   * Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions
   * endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET
   * /file_migrations/{id}`, a key with a path can read only migrations it started. Other endpoints do not apply the
   * path restriction; use the `files_only` permission set to confine a key to file operations and their supporting
   * lookups. Does not grant access beyond the owning user's permissions. Optional except for `office_integration` keys,
   * which require a path the owning user can read.
   */
  readonly path?: string

  /** API Key ID */
  getId(): number | null | undefined

  /**
   * Unique label that describes this API key. Useful for external systems where you may have API keys from multiple
   * accounts and want a human-readable label for each key.
   */
  getDescriptiveLabel(): string | null | undefined

  /** User-supplied description of API key. */
  getDescription(): string | null | undefined

  /** Time which API Key was created */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** API Key expiration date */
  getExpiresAt(): Files.DateTimeString | null | undefined

  /** API Key actual key string */
  getKey(): string | null | undefined

  /**
   * If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
   */
  getAwsStyleCredentials(): boolean | null | undefined

  /** AWS Access Key ID to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
  getAwsAccessKeyId(): string | null | undefined

  /** AWS Secret Key to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
  getAwsSecretKey(): string | null | undefined

  /**
   * API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be
   * up to 3 hours later than this timestamp.
   */
  getLastUseAt(): Files.DateTimeString | null | undefined

  /** Internal name for the API Key.  For your use. */
  getName(): string | null | undefined

  /**
   * Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions
   * provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only
   * perform the functions provided by our Mobile App (File and Share Link operations). Keys with the
   * `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with
   * office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and
   * file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations
   * as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`.
   * On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned
   * keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and
   * destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is
   * a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide
   * migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use
   * site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user.
   * Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`.
   * Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
   */
  getPermissionSet(): 'none' | 'full' | 'desktop_app' | 'sync_app' | 'office_integration' | 'mobile_app' | 'files_only' | Files.OtherString | null | undefined

  /** If this API key represents a Desktop app, what platform was it created on? */
  getPlatform(): string | null | undefined

  /** Site ID */
  getSiteId(): number | null | undefined

  /** Site Name */
  getSiteName(): string | null | undefined

  /** URL for API host. */
  getUrl(): string | null | undefined

  /** User ID for the owner of this API Key.  May be blank for Site-wide API Keys. */
  getUserId(): number | null | undefined

  /** Workspace ID for this API Key. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /**
   * Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions
   * endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET
   * /file_migrations/{id}`, a key with a path can read only migrations it started. Other endpoints do not apply the
   * path restriction; use the `files_only` permission set to confine a key to file operations and their supporting
   * lookups. Does not grant access beyond the owning user's permissions. Optional except for `office_integration` keys,
   * which require a path the owning user can read.
   */
  getPath(): string | undefined

  /** API Key ID */
  setId(value: number): void

  /**
   * Unique label that describes this API key. Useful for external systems where you may have API keys from multiple
   * accounts and want a human-readable label for each key.
   */
  setDescriptiveLabel(value: string): void

  /** User-supplied description of API key. */
  setDescription(value: string): void

  /** API Key expiration date */
  setExpiresAt(value: Files.DateTimeString): void

  /** API Key actual key string */
  setKey(value: string): void

  /**
   * If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
   */
  setAwsStyleCredentials(value: boolean): void

  /** AWS Access Key ID to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
  setAwsAccessKeyId(value: string): void

  /** AWS Secret Key to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
  setAwsSecretKey(value: string): void

  /**
   * API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be
   * up to 3 hours later than this timestamp.
   */
  setLastUseAt(value: Files.DateTimeString): void

  /** Internal name for the API Key.  For your use. */
  setName(value: string): void

  /**
   * Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions
   * provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only
   * perform the functions provided by our Mobile App (File and Share Link operations). Keys with the
   * `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with
   * office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and
   * file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations
   * as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`.
   * On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned
   * keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and
   * destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is
   * a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide
   * migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use
   * site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user.
   * Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`.
   * Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
   */
  setPermissionSet(value: 'none' | 'full' | 'desktop_app' | 'sync_app' | 'office_integration' | 'mobile_app' | 'files_only'): void

  /** If this API key represents a Desktop app, what platform was it created on? */
  setPlatform(value: string): void

  /** Site ID */
  setSiteId(value: number): void

  /** Site Name */
  setSiteName(value: string): void

  /** URL for API host. */
  setUrl(value: string): void

  /** User ID for the owner of this API Key.  May be blank for Site-wide API Keys. */
  setUserId(value: number): void

  /** Workspace ID for this API Key. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /**
   * Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions
   * endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET
   * /file_migrations/{id}`, a key with a path can read only migrations it started. Other endpoints do not apply the
   * path restriction; use the `files_only` permission set to confine a key to file operations and their supporting
   * lookups. Does not grant access beyond the owning user's permissions. Optional except for `office_integration` keys,
   * which require a path the owning user can read.
   */
  setPath(value: string): void

  /** Update API Key */
  update(params?: ApiKey.UpdateParams): Promise<this>

  /** Delete API Key */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List API Keys */
  static list(params?: ApiKey.ListParams, options?: Files.RequestOptions): Promise<ApiKey[]>

  /** Alias of `list()`. */
  static all(params?: ApiKey.ListParams, options?: Files.RequestOptions): Promise<ApiKey[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ApiKey.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ApiKey>

  /** Show information about current API key.  (Requires current API connection to be using an API key.) */
  static findCurrent(options?: Files.RequestOptions): Promise<ApiKey>

  /**
   * Show API Key
   * @param id - Api Key ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ApiKey>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ApiKey>

  /** Create API Key */
  static create(params: ApiKey.CreateParams, options?: Files.RequestOptions): Promise<ApiKey>

  /** Update current API key.  (Requires current API connection to be using an API key.) */
  static updateCurrent(params?: ApiKey.UpdateCurrentParams, options?: Files.RequestOptions): Promise<ApiKey>

  /** Delete current API key.  (Requires current API connection to be using an API key.) */
  static deleteCurrent(options?: Files.RequestOptions): Promise<void>

  static default: typeof ApiKey
}

declare namespace ApiKey {
  /** The fields of `ApiKey` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** API Key ID */
    id?: number | null

    /**
     * Unique label that describes this API key. Useful for external systems where you may have API keys from multiple
     * accounts and want a human-readable label for each key.
     */
    descriptive_label?: string | null

    /** User-supplied description of API key. */
    description?: string | null

    /** Time which API Key was created */
    created_at?: Files.DateTimeString | null

    /** API Key expiration date */
    expires_at?: Files.DateTimeString | null

    /** API Key actual key string */
    key?: string | null

    /**
     * If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
     */
    aws_style_credentials?: boolean | null

    /** AWS Access Key ID to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
    aws_access_key_id?: string | null

    /** AWS Secret Key to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint. */
    aws_secret_key?: string | null

    /**
     * API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may
     * be up to 3 hours later than this timestamp.
     */
    last_use_at?: Files.DateTimeString | null

    /** Internal name for the API Key.  For your use. */
    name?: string | null

    /**
     * Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the
     * functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set
     * can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the
     * `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with
     * office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and
     * file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file
     * operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and
     * `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a
     * `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose
     * source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including
     * Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace
     * retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with
     * `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing
     * privileges from the owning user. Both GPG file actions and every other endpoint deny them with
     * `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to
     * files uploaded with a `files_only` key.
     */
    permission_set?: 'none' | 'full' | 'desktop_app' | 'sync_app' | 'office_integration' | 'mobile_app' | 'files_only' | Files.OtherString | null

    /** If this API key represents a Desktop app, what platform was it created on? */
    platform?: string | null

    /** Site ID */
    site_id?: number | null

    /** Site Name */
    site_name?: string | null

    /** URL for API host. */
    url?: string | null

    /** User ID for the owner of this API Key.  May be blank for Site-wide API Keys. */
    user_id?: number | null

    /** Workspace ID for this API Key. `0` means the default workspace. */
    workspace_id?: number | null

    /**
     * Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions
     * endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET
     * /file_migrations/{id}`, a key with a path can read only migrations it started. Other endpoints do not apply the
     * path restriction; use the `files_only` permission set to confine a key to file operations and their supporting
     * lookups. Does not grant access beyond the owning user's permissions. Optional except for `office_integration`
     * keys, which require a path the owning user can read.
     */
    path?: string
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id` and
     * `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `aws_style_credentials` and `expires_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `expires_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `expires_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `expires_at`.
     */
    filter_lteq?: Files.JsonObject
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** User-supplied description of API key. */
    description?: string

    /** API Key expiration date */
    expires_at?: Files.DateTimeString

    /** Internal name for the API Key.  For your use. */
    name: string

    /**
     * If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
     */
    aws_style_credentials?: boolean

    /**
     * Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions
     * endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET
     * /file_migrations/{id}`, a key with a path can read only migrations it started. Other endpoints do not apply the
     * path restriction; use the `files_only` permission set to confine a key to file operations and their supporting
     * lookups. Does not grant access beyond the owning user's permissions. Optional except for `office_integration`
     * keys, which require a path the owning user can read.
     */
    path?: string

    /**
     * Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the
     * functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set
     * can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the
     * `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with
     * office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and
     * file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file
     * operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and
     * `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a
     * `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose
     * source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including
     * Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace
     * retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with
     * `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing
     * privileges from the owning user. Both GPG file actions and every other endpoint deny them with
     * `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to
     * files uploaded with a `files_only` key.
     */
    permission_set?: 'none' | 'full' | 'desktop_app' | 'sync_app' | 'office_integration' | 'mobile_app' | 'files_only'

    /** Workspace ID for this API Key. `0` means the default workspace. */
    workspace_id?: number
  }

  interface UpdateCurrentParams {
    /** API Key expiration date */
    expires_at?: Files.DateTimeString

    /** Internal name for the API Key.  For your use. */
    name?: string

    /**
     * Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the
     * functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set
     * can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the
     * `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with
     * office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and
     * file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file
     * operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and
     * `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a
     * `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose
     * source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including
     * Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace
     * retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with
     * `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing
     * privileges from the owning user. Both GPG file actions and every other endpoint deny them with
     * `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to
     * files uploaded with a `files_only` key.
     */
    permission_set?: 'none' | 'full' | 'desktop_app' | 'sync_app' | 'office_integration' | 'mobile_app' | 'files_only'
  }

  interface UpdateParams {
    /** User-supplied description of API key. */
    description?: string

    /** API Key expiration date */
    expires_at?: Files.DateTimeString

    /** Internal name for the API Key.  For your use. */
    name?: string
  }
}

export = ApiKey
