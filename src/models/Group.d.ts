import Files from '../Files'

/** A Group is a powerful tool for permissions and user management on Files.com. */
declare class Group {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Group.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Group.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Group ID */
  readonly id?: number | null

  /** Group name */
  readonly name?: string | null

  /** A list of allowed IPs if applicable.  Newline delimited */
  readonly allowed_ips?: string | null

  /** Comma-delimited list of user IDs who are group administrators (separated by commas) */
  readonly admin_ids?: string | null

  /** Notes about this group */
  readonly notes?: string | null

  /** Comma-delimited list of user IDs who belong to this group (separated by commas) */
  readonly user_ids?: string | null

  /** Comma-delimited list of usernames who belong to this group (separated by commas) */
  readonly usernames?: string | null

  /**
   * AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user
   * or Partner assignment overrides it.
   */
  readonly ai_assistant_personality_id?: number | null

  /**
   * If true, users in this group can use FTP to login. This will override a false value of `ftp_permission` on the user
   * level.
   */
  readonly ftp_permission?: boolean | null

  /**
   * If true, users in this group can use SFTP to login. This will override a false value of `sftp_permission` on the
   * user level.
   */
  readonly sftp_permission?: boolean | null

  /**
   * If true, users in this group can use WebDAV to login. This will override a false value of `dav_permission` on the
   * user level.
   */
  readonly dav_permission?: boolean | null

  /**
   * If true, users in this group can use the REST API to login. This will override a false value of
   * `restapi_permission` on the user level.
   */
  readonly restapi_permission?: boolean | null

  /**
   * If true, users in this group can access the S3-compatible endpoint. This will override a false value of
   * `s3_compatible_endpoint_permission` on the user level. Defaults to false.
   */
  readonly s3_compatible_endpoint_permission?: boolean | null

  /**
   * Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
   * per-user assignment overrides it.
   */
  readonly desktop_configuration_profile_id?: number | null

  /**
   * Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
   * per-user assignment overrides it.
   */
  readonly integration_centric_profile_id?: number | null

  /** Site ID */
  readonly site_id?: number | null

  /** Workspace ID */
  readonly workspace_id?: number | null

  /** Group ID */
  getId(): number | null | undefined

  /** Group name */
  getName(): string | null | undefined

  /** A list of allowed IPs if applicable.  Newline delimited */
  getAllowedIps(): string | null | undefined

  /** Comma-delimited list of user IDs who are group administrators (separated by commas) */
  getAdminIds(): string | null | undefined

  /** Notes about this group */
  getNotes(): string | null | undefined

  /** Comma-delimited list of user IDs who belong to this group (separated by commas) */
  getUserIds(): string | null | undefined

  /** Comma-delimited list of usernames who belong to this group (separated by commas) */
  getUsernames(): string | null | undefined

  /**
   * AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user
   * or Partner assignment overrides it.
   */
  getAiAssistantPersonalityId(): number | null | undefined

  /**
   * If true, users in this group can use FTP to login. This will override a false value of `ftp_permission` on the user
   * level.
   */
  getFtpPermission(): boolean | null | undefined

  /**
   * If true, users in this group can use SFTP to login. This will override a false value of `sftp_permission` on the
   * user level.
   */
  getSftpPermission(): boolean | null | undefined

  /**
   * If true, users in this group can use WebDAV to login. This will override a false value of `dav_permission` on the
   * user level.
   */
  getDavPermission(): boolean | null | undefined

  /**
   * If true, users in this group can use the REST API to login. This will override a false value of
   * `restapi_permission` on the user level.
   */
  getRestapiPermission(): boolean | null | undefined

  /**
   * If true, users in this group can access the S3-compatible endpoint. This will override a false value of
   * `s3_compatible_endpoint_permission` on the user level. Defaults to false.
   */
  getS3CompatibleEndpointPermission(): boolean | null | undefined

  /**
   * Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
   * per-user assignment overrides it.
   */
  getDesktopConfigurationProfileId(): number | null | undefined

  /**
   * Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
   * per-user assignment overrides it.
   */
  getIntegrationCentricProfileId(): number | null | undefined

  /** Site ID */
  getSiteId(): number | null | undefined

  /** Workspace ID */
  getWorkspaceId(): number | null | undefined

  /** Group ID */
  setId(value: number): void

  /** Group name */
  setName(value: string): void

  /** A list of allowed IPs if applicable.  Newline delimited */
  setAllowedIps(value: string): void

  /** Comma-delimited list of user IDs who are group administrators (separated by commas) */
  setAdminIds(value: string): void

  /** Notes about this group */
  setNotes(value: string): void

  /** Comma-delimited list of user IDs who belong to this group (separated by commas) */
  setUserIds(value: string): void

  /** Comma-delimited list of usernames who belong to this group (separated by commas) */
  setUsernames(value: string): void

  /**
   * AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user
   * or Partner assignment overrides it.
   */
  setAiAssistantPersonalityId(value: number): void

  /**
   * If true, users in this group can use FTP to login. This will override a false value of `ftp_permission` on the user
   * level.
   */
  setFtpPermission(value: boolean): void

  /**
   * If true, users in this group can use SFTP to login. This will override a false value of `sftp_permission` on the
   * user level.
   */
  setSftpPermission(value: boolean): void

  /**
   * If true, users in this group can use WebDAV to login. This will override a false value of `dav_permission` on the
   * user level.
   */
  setDavPermission(value: boolean): void

  /**
   * If true, users in this group can use the REST API to login. This will override a false value of
   * `restapi_permission` on the user level.
   */
  setRestapiPermission(value: boolean): void

  /**
   * If true, users in this group can access the S3-compatible endpoint. This will override a false value of
   * `s3_compatible_endpoint_permission` on the user level. Defaults to false.
   */
  setS3CompatibleEndpointPermission(value: boolean): void

  /**
   * Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
   * per-user assignment overrides it.
   */
  setDesktopConfigurationProfileId(value: number): void

  /**
   * Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
   * per-user assignment overrides it.
   */
  setIntegrationCentricProfileId(value: number): void

  /** Site ID */
  setSiteId(value: number): void

  /** Workspace ID */
  setWorkspaceId(value: number): void

  /** Update Group */
  update(params?: Group.UpdateParams): Promise<this>

  /** Delete Group */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Groups */
  static list(params?: Group.ListParams, options?: Files.RequestOptions): Promise<Group[]>

  /** Alias of `list()`. */
  static all(params?: Group.ListParams, options?: Files.RequestOptions): Promise<Group[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Group.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Group>

  /**
   * Show Group
   * @param id - Group ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Group>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Group>

  /** Create Group */
  static create(params: Group.CreateParams, options?: Files.RequestOptions): Promise<Group>
}

declare namespace Group {
  /** The fields of `Group` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Group ID */
    id?: number | null

    /** Group name */
    name?: string | null

    /** A list of allowed IPs if applicable.  Newline delimited */
    allowed_ips?: string | null

    /** Comma-delimited list of user IDs who are group administrators (separated by commas) */
    admin_ids?: string | null

    /** Notes about this group */
    notes?: string | null

    /** Comma-delimited list of user IDs who belong to this group (separated by commas) */
    user_ids?: string | null

    /** Comma-delimited list of usernames who belong to this group (separated by commas) */
    usernames?: string | null

    /**
     * AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user or Partner assignment overrides it.
     */
    ai_assistant_personality_id?: number | null

    /**
     * If true, users in this group can use FTP to login. This will override a false value of `ftp_permission` on the
     * user level.
     */
    ftp_permission?: boolean | null

    /**
     * If true, users in this group can use SFTP to login. This will override a false value of `sftp_permission` on the
     * user level.
     */
    sftp_permission?: boolean | null

    /**
     * If true, users in this group can use WebDAV to login. This will override a false value of `dav_permission` on the
     * user level.
     */
    dav_permission?: boolean | null

    /**
     * If true, users in this group can use the REST API to login. This will override a false value of
     * `restapi_permission` on the user level.
     */
    restapi_permission?: boolean | null

    /**
     * If true, users in this group can access the S3-compatible endpoint. This will override a false value of
     * `s3_compatible_endpoint_permission` on the user level. Defaults to false.
     */
    s3_compatible_endpoint_permission?: boolean | null

    /**
     * Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user assignment overrides it.
     */
    desktop_configuration_profile_id?: number | null

    /**
     * Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user assignment overrides it.
     */
    integration_centric_profile_id?: number | null

    /** Site ID */
    site_id?: number | null

    /** Workspace ID */
    workspace_id?: number | null
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
     * `workspace_id` or `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and
     * `workspace_id`. Valid field combinations are `[ workspace_id, name ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`. */
    filter_prefix?: Files.JsonObject

    /** Comma-separated list of group ids to include in results. */
    ids?: string

    /** Include groups from the parent site. */
    include_parent_site_groups?: boolean

    /**
     * When scoped to a Custom Workspace, include Default Workspace groups that have permissions in that Workspace.
     * Available to Site Administrators, and to Workspace Administrators and Folder Admins in that Workspace when the
     * site shares its Default Workspace directory with Workspaces.
     */
    include_default_workspace_groups?: boolean
  }

  interface CreateParams {
    /** Group notes. */
    notes?: string

    /** A list of user ids. If sent as a string, should be comma-delimited. */
    user_ids?: string

    /** A list of group admin user ids. If sent as a string, should be comma-delimited. */
    admin_ids?: string

    /**
     * AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user or Partner assignment overrides it.
     */
    ai_assistant_personality_id?: number

    /**
     * If true, users in this group can use FTP to login. This will override a false value of `ftp_permission` on the
     * user level.
     */
    ftp_permission?: boolean

    /**
     * If true, users in this group can use SFTP to login. This will override a false value of `sftp_permission` on the
     * user level.
     */
    sftp_permission?: boolean

    /**
     * If true, users in this group can use WebDAV to login. This will override a false value of `dav_permission` on the
     * user level.
     */
    dav_permission?: boolean

    /**
     * If true, users in this group can use the REST API to login. This will override a false value of
     * `restapi_permission` on the user level.
     */
    restapi_permission?: boolean

    /**
     * If true, users in this group can access the S3-compatible endpoint. This will override a false value of
     * `s3_compatible_endpoint_permission` on the user level. Defaults to false.
     */
    s3_compatible_endpoint_permission?: boolean

    /**
     * Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user assignment overrides it.
     */
    desktop_configuration_profile_id?: number

    /**
     * Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user assignment overrides it.
     */
    integration_centric_profile_id?: number

    /** A list of allowed IPs if applicable.  Newline delimited */
    allowed_ips?: string

    /** Group name. */
    name: string

    /** Workspace ID */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Group notes. */
    notes?: string

    /** A list of user ids. If sent as a string, should be comma-delimited. */
    user_ids?: string

    /** A list of group admin user ids. If sent as a string, should be comma-delimited. */
    admin_ids?: string

    /**
     * AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user or Partner assignment overrides it.
     */
    ai_assistant_personality_id?: number

    /**
     * If true, users in this group can use FTP to login. This will override a false value of `ftp_permission` on the
     * user level.
     */
    ftp_permission?: boolean

    /**
     * If true, users in this group can use SFTP to login. This will override a false value of `sftp_permission` on the
     * user level.
     */
    sftp_permission?: boolean

    /**
     * If true, users in this group can use WebDAV to login. This will override a false value of `dav_permission` on the
     * user level.
     */
    dav_permission?: boolean

    /**
     * If true, users in this group can use the REST API to login. This will override a false value of
     * `restapi_permission` on the user level.
     */
    restapi_permission?: boolean

    /**
     * If true, users in this group can access the S3-compatible endpoint. This will override a false value of
     * `s3_compatible_endpoint_permission` on the user level. Defaults to false.
     */
    s3_compatible_endpoint_permission?: boolean

    /**
     * Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user assignment overrides it.
     */
    desktop_configuration_profile_id?: number

    /**
     * Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct
     * per-user assignment overrides it.
     */
    integration_centric_profile_id?: number

    /** A list of allowed IPs if applicable.  Newline delimited */
    allowed_ips?: string

    /** Group name. */
    name?: string
  }
}

export default Group
