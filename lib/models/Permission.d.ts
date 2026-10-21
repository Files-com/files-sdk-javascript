import Files = require('../Files')

/** A Permission object represents a grant of access permission on a specific Path to a User or Group. */
declare class Permission {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Permission.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Permission.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Permission ID */
  readonly id?: number | null

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** User ID */
  readonly user_id?: number | null

  /** Username (if applicable) */
  readonly username?: string | null

  /** Group ID */
  readonly group_id?: number | null

  /** Group name (if applicable) */
  readonly group_name?: string | null

  /** Group IDs when this Permission requires membership in every listed group. */
  readonly group_ids?: number[] | string | null

  /** Group names when this permission requires multiple groups */
  readonly group_names?: string[] | null

  /** Partner ID (if applicable) */
  readonly partner_id?: number | null

  /** Partner name (if applicable) */
  readonly partner_name?: string | null

  /** Permission type.  See the table referenced in the documentation for an explanation of each permission. */
  readonly permission?: 'full' | 'readonly' | 'writeonly' | 'list' | 'history' | 'admin' | 'bundle' | 'site_admin' | 'readonly_site_admin' | 'previewonly' | Files.OtherString | null

  /** Whether this Permission applies to subfolders. Must be true for `admin` Permissions. */
  readonly recursive?: boolean | null

  /** Site ID */
  readonly site_id?: number | null

  /** Permission ID */
  getId(): number | null | undefined

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** User ID */
  getUserId(): number | null | undefined

  /** Username (if applicable) */
  getUsername(): string | null | undefined

  /** Group ID */
  getGroupId(): number | null | undefined

  /** Group name (if applicable) */
  getGroupName(): string | null | undefined

  /** Group IDs when this Permission requires membership in every listed group. */
  getGroupIds(): number[] | string | null | undefined

  /** Group names when this permission requires multiple groups */
  getGroupNames(): string[] | null | undefined

  /** Partner ID (if applicable) */
  getPartnerId(): number | null | undefined

  /** Partner name (if applicable) */
  getPartnerName(): string | null | undefined

  /** Permission type.  See the table referenced in the documentation for an explanation of each permission. */
  getPermission(): 'full' | 'readonly' | 'writeonly' | 'list' | 'history' | 'admin' | 'bundle' | 'site_admin' | 'readonly_site_admin' | 'previewonly' | Files.OtherString | null | undefined

  /** Whether this Permission applies to subfolders. Must be true for `admin` Permissions. */
  getRecursive(): boolean | null | undefined

  /** Site ID */
  getSiteId(): number | null | undefined

  /** Permission ID */
  setId(value: number): void

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  setPath(value: string): void

  /** User ID */
  setUserId(value: number): void

  /** Username (if applicable) */
  setUsername(value: string): void

  /** Group ID */
  setGroupId(value: number): void

  /** Group name (if applicable) */
  setGroupName(value: string): void

  /** Group IDs when this Permission requires membership in every listed group. */
  setGroupIds(value: string): void

  /** Group names when this permission requires multiple groups */
  setGroupNames(value: string[]): void

  /** Partner ID (if applicable) */
  setPartnerId(value: number): void

  /** Partner name (if applicable) */
  setPartnerName(value: string): void

  /** Permission type.  See the table referenced in the documentation for an explanation of each permission. */
  setPermission(value: string): void

  /** Whether this Permission applies to subfolders. Must be true for `admin` Permissions. */
  setRecursive(value: boolean): void

  /** Site ID */
  setSiteId(value: number): void

  /** Delete Permission */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List Permissions */
  static list(params?: Permission.ListParams, options?: Files.RequestOptions): Promise<Permission[]>

  /** Alias of `list()`. */
  static all(params?: Permission.ListParams, options?: Files.RequestOptions): Promise<Permission[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Permission.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Permission>

  /** Create Permission */
  static create(params: Permission.CreateParams, options?: Files.RequestOptions): Promise<Permission>

  static default: typeof Permission
}

declare namespace Permission {
  /** The fields of `Permission` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Permission ID */
    id?: number | null

    /**
     * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** User ID */
    user_id?: number | null

    /** Username (if applicable) */
    username?: string | null

    /** Group ID */
    group_id?: number | null

    /** Group name (if applicable) */
    group_name?: string | null

    /** Group IDs when this Permission requires membership in every listed group. */
    group_ids?: number[] | string | null

    /** Group names when this permission requires multiple groups */
    group_names?: string[] | null

    /** Partner ID (if applicable) */
    partner_id?: number | null

    /** Partner name (if applicable) */
    partner_name?: string | null

    /** Permission type.  See the table referenced in the documentation for an explanation of each permission. */
    permission?: 'full' | 'readonly' | 'writeonly' | 'list' | 'history' | 'admin' | 'bundle' | 'site_admin' | 'readonly_site_admin' | 'previewonly' | Files.OtherString | null

    /** Whether this Permission applies to subfolders. Must be true for `admin` Permissions. */
    recursive?: boolean | null

    /** Site ID */
    site_id?: number | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`,
     * `group_id`, `path`, `user_id`, `partner_id` or `id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `path`,
     * `group_id`, `partner_id` or `user_id`. Valid field combinations are `[ group_id, path ]`, `[ partner_id, path ]`,
     * `[ user_id, path ]`, `[ user_id, group_id ]`, `[ user_id, group_id, path ]`, `[ user_id, group_id, partner_id ]`
     * or `[ user_id, group_id, partner_id, path ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`. */
    filter_prefix?: Files.JsonObject

    /** Permission path.  If provided, will scope all permissions(including upward) to this path. */
    path?: string

    /** If searching by user or group, also include user's permissions that are inherited from its groups? */
    include_groups?: boolean

    group_id?: string

    partner_id?: string

    user_id?: string
  }

  interface CreateParams {
    /** Folder path */
    path: string

    /** Group ID. Provide `group_name` or `group_id` */
    group_id?: number

    /**
     * Group IDs when the Permission requires membership in every listed group. If sent as a string, it should be
     * comma-delimited.
     */
    group_ids?: string

    /** Permission type.  Can be `admin`, `full`, `readonly`, `writeonly`, `list`, or `history` */
    permission?: string

    /** Apply to subfolders recursively? Must be true for `admin` Permissions. */
    recursive?: boolean

    /** Partner ID if this Permission belongs to a partner. */
    partner_id?: number

    /** User ID.  Provide `username` or `user_id` */
    user_id?: number

    /** User username.  Provide `username` or `user_id` */
    username?: string

    /** Group name.  Provide `group_name` or `group_id` */
    group_name?: string

    /** Site ID. If not provided, will default to current site. Used when creating a permission for a child site. */
    site_id?: number
  }
}

export = Permission
