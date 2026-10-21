import Files = require('../Files')

/**
 * A UserLifecycleRule represents a rule that applies to users based on their inactivity, state and authentication
 * method.
 */
declare class UserLifecycleRule {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UserLifecycleRule.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UserLifecycleRule.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** User Lifecycle Rule ID */
  readonly id?: number | null

  /**
   * User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO authentication
   * method with one rule.
   */
  readonly authentication_method?: 'all' | 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | 'all_non_sso' | Files.OtherString | null

  /** Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users. */
  readonly group_ids?: number[] | null

  /** Action to take on inactive users (disable or delete) */
  readonly action?: 'disable' | 'delete' | Files.OtherString | null

  /** Number of days of inactivity before the rule applies */
  readonly inactivity_days?: number | null

  /** If true, the rule will apply to folder admins. */
  readonly include_folder_admins?: boolean | null

  /**
   * If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled
   * when `workspace_id` is `0`.
   */
  readonly include_site_admins?: boolean | null

  /**
   * If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when
   * `workspace_id` is `0`.
   */
  readonly apply_to_all_workspaces?: boolean | null

  /** User Lifecycle Rule name */
  readonly name?: string | null

  /** If true, users will be emailed before the rule disables or deletes them. */
  readonly notify_users?: boolean | null

  /**
   * If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags
   * must only contain lowercase letters, numbers, and hyphens.
   */
  readonly partner_tag?: string | null

  /** Site ID */
  readonly site_id?: number | null

  /**
   * Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only to
   * users who belong to that Workspace, regardless of access granted to other users.
   */
  readonly workspace_id?: number | null

  /** State of the users to apply the rule to (inactive or disabled) */
  readonly user_state?: 'inactive' | 'disabled' | Files.OtherString | null

  /**
   * If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters,
   * numbers, and hyphens.
   */
  readonly user_tag?: string | null

  /** User Lifecycle Rule ID */
  getId(): number | null | undefined

  /**
   * User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO authentication
   * method with one rule.
   */
  getAuthenticationMethod(): 'all' | 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | 'all_non_sso' | Files.OtherString | null | undefined

  /** Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users. */
  getGroupIds(): number[] | null | undefined

  /** Action to take on inactive users (disable or delete) */
  getAction(): 'disable' | 'delete' | Files.OtherString | null | undefined

  /** Number of days of inactivity before the rule applies */
  getInactivityDays(): number | null | undefined

  /** If true, the rule will apply to folder admins. */
  getIncludeFolderAdmins(): boolean | null | undefined

  /**
   * If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled
   * when `workspace_id` is `0`.
   */
  getIncludeSiteAdmins(): boolean | null | undefined

  /**
   * If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when
   * `workspace_id` is `0`.
   */
  getApplyToAllWorkspaces(): boolean | null | undefined

  /** User Lifecycle Rule name */
  getName(): string | null | undefined

  /** If true, users will be emailed before the rule disables or deletes them. */
  getNotifyUsers(): boolean | null | undefined

  /**
   * If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags
   * must only contain lowercase letters, numbers, and hyphens.
   */
  getPartnerTag(): string | null | undefined

  /** Site ID */
  getSiteId(): number | null | undefined

  /**
   * Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only to
   * users who belong to that Workspace, regardless of access granted to other users.
   */
  getWorkspaceId(): number | null | undefined

  /** State of the users to apply the rule to (inactive or disabled) */
  getUserState(): 'inactive' | 'disabled' | Files.OtherString | null | undefined

  /**
   * If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters,
   * numbers, and hyphens.
   */
  getUserTag(): string | null | undefined

  /** User Lifecycle Rule ID */
  setId(value: number): void

  /**
   * User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO authentication
   * method with one rule.
   */
  setAuthenticationMethod(value: 'all' | 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | 'all_non_sso'): void

  /** Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users. */
  setGroupIds(value: number[]): void

  /** Action to take on inactive users (disable or delete) */
  setAction(value: 'disable' | 'delete'): void

  /** Number of days of inactivity before the rule applies */
  setInactivityDays(value: number): void

  /** If true, the rule will apply to folder admins. */
  setIncludeFolderAdmins(value: boolean): void

  /**
   * If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled
   * when `workspace_id` is `0`.
   */
  setIncludeSiteAdmins(value: boolean): void

  /**
   * If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when
   * `workspace_id` is `0`.
   */
  setApplyToAllWorkspaces(value: boolean): void

  /** User Lifecycle Rule name */
  setName(value: string): void

  /** If true, users will be emailed before the rule disables or deletes them. */
  setNotifyUsers(value: boolean): void

  /**
   * If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags
   * must only contain lowercase letters, numbers, and hyphens.
   */
  setPartnerTag(value: string): void

  /** Site ID */
  setSiteId(value: number): void

  /**
   * Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only to
   * users who belong to that Workspace, regardless of access granted to other users.
   */
  setWorkspaceId(value: number): void

  /** State of the users to apply the rule to (inactive or disabled) */
  setUserState(value: 'inactive' | 'disabled'): void

  /**
   * If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters,
   * numbers, and hyphens.
   */
  setUserTag(value: string): void

  /** Update User Lifecycle Rule */
  update(params?: UserLifecycleRule.UpdateParams): Promise<this>

  /** Delete User Lifecycle Rule */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List User Lifecycle Rules */
  static list(params?: UserLifecycleRule.ListParams, options?: Files.RequestOptions): Promise<UserLifecycleRule[]>

  /** Alias of `list()`. */
  static all(params?: UserLifecycleRule.ListParams, options?: Files.RequestOptions): Promise<UserLifecycleRule[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UserLifecycleRule.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UserLifecycleRule>

  /**
   * Show User Lifecycle Rule
   * @param id - User Lifecycle Rule ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserLifecycleRule>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserLifecycleRule>

  /** Create User Lifecycle Rule */
  static create(params?: UserLifecycleRule.CreateParams, options?: Files.RequestOptions): Promise<UserLifecycleRule>

  static default: typeof UserLifecycleRule
}

declare namespace UserLifecycleRule {
  /** The fields of `UserLifecycleRule` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** User Lifecycle Rule ID */
    id?: number | null

    /**
     * User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO
     * authentication method with one rule.
     */
    authentication_method?: 'all' | 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | 'all_non_sso' | Files.OtherString | null

    /** Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users. */
    group_ids?: number[] | null

    /** Action to take on inactive users (disable or delete) */
    action?: 'disable' | 'delete' | Files.OtherString | null

    /** Number of days of inactivity before the rule applies */
    inactivity_days?: number | null

    /** If true, the rule will apply to folder admins. */
    include_folder_admins?: boolean | null

    /**
     * If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled
     * when `workspace_id` is `0`.
     */
    include_site_admins?: boolean | null

    /**
     * If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when
     * `workspace_id` is `0`.
     */
    apply_to_all_workspaces?: boolean | null

    /** User Lifecycle Rule name */
    name?: string | null

    /** If true, users will be emailed before the rule disables or deletes them. */
    notify_users?: boolean | null

    /**
     * If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule.
     * Tags must only contain lowercase letters, numbers, and hyphens.
     */
    partner_tag?: string | null

    /** Site ID */
    site_id?: number | null

    /**
     * Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only
     * to users who belong to that Workspace, regardless of access granted to other users.
     */
    workspace_id?: number | null

    /** State of the users to apply the rule to (inactive or disabled) */
    user_state?: 'inactive' | 'disabled' | Files.OtherString | null

    /**
     * If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters,
     * numbers, and hyphens.
     */
    user_tag?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id` and
     * `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Action to take on inactive users (disable or delete) */
    action?: 'disable' | 'delete'

    /**
     * If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when
     * `workspace_id` is `0`.
     */
    apply_to_all_workspaces?: boolean

    /**
     * User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO
     * authentication method with one rule.
     */
    authentication_method?: 'all' | 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | 'all_non_sso'

    /** Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users. */
    group_ids?: number[]

    /** Number of days of inactivity before the rule applies */
    inactivity_days?: number

    /**
     * If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled
     * when `workspace_id` is `0`.
     */
    include_site_admins?: boolean

    /** If true, the rule will apply to folder admins. */
    include_folder_admins?: boolean

    /** User Lifecycle Rule name */
    name?: string

    /** If true, users will be emailed before the rule disables or deletes them. */
    notify_users?: boolean

    /**
     * If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule.
     * Tags must only contain lowercase letters, numbers, and hyphens.
     */
    partner_tag?: string

    /** State of the users to apply the rule to (inactive or disabled) */
    user_state?: 'inactive' | 'disabled'

    /**
     * If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters,
     * numbers, and hyphens.
     */
    user_tag?: string

    /**
     * Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only
     * to users who belong to that Workspace, regardless of access granted to other users.
     */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Action to take on inactive users (disable or delete) */
    action?: 'disable' | 'delete'

    /**
     * If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when
     * `workspace_id` is `0`.
     */
    apply_to_all_workspaces?: boolean

    /**
     * User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO
     * authentication method with one rule.
     */
    authentication_method?: 'all' | 'password' | 'sso' | 'none' | 'email_signup' | 'password_with_imported_hash' | 'password_and_ssh_key' | 'all_non_sso'

    /** Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users. */
    group_ids?: number[]

    /** Number of days of inactivity before the rule applies */
    inactivity_days?: number

    /**
     * If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled
     * when `workspace_id` is `0`.
     */
    include_site_admins?: boolean

    /** If true, the rule will apply to folder admins. */
    include_folder_admins?: boolean

    /** User Lifecycle Rule name */
    name?: string

    /** If true, users will be emailed before the rule disables or deletes them. */
    notify_users?: boolean

    /**
     * If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule.
     * Tags must only contain lowercase letters, numbers, and hyphens.
     */
    partner_tag?: string

    /** State of the users to apply the rule to (inactive or disabled) */
    user_state?: 'inactive' | 'disabled'

    /**
     * If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters,
     * numbers, and hyphens.
     */
    user_tag?: string

    /**
     * Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only
     * to users who belong to that Workspace, regardless of access granted to other users.
     */
    workspace_id?: number
  }
}

export = UserLifecycleRule
