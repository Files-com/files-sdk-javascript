import Files from '../Files'

/**
 * A Child Site Management Policy is a centralized policy defined by a parent site to enforce consistent configurations
 * across child sites.
 */
declare class ChildSiteManagementPolicy {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ChildSiteManagementPolicy.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ChildSiteManagementPolicy.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Policy ID. */
  readonly id?: number | null

  /** Type of policy.  Valid values: `settings`. */
  readonly policy_type?: 'settings' | Files.OtherString | null

  /** Name for this policy. */
  readonly name?: string | null

  /** Description for this policy. */
  readonly description?: string | null

  /**
   * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies
   * accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites.
   * For more information, refer to the Value Hash section of the developer documentation.
   */
  readonly value?: Files.JsonObject | null

  /** IDs of child sites that this policy has been applied to. This field is read-only. */
  readonly applied_child_site_ids?: number[] | null

  /** IDs of child sites excluded from this default policy. */
  readonly skip_child_site_ids?: number[] | null

  /** IDs of child sites explicitly assigned to this non-default policy. */
  readonly child_site_ids?: number[] | null

  /** Whether this policy applies to child sites not explicitly assigned to another policy. */
  readonly default_policy?: boolean | null

  /** When this policy was created. */
  readonly created_at?: Files.DateTimeString | null

  /** When this policy was last updated. */
  readonly updated_at?: Files.DateTimeString | null

  /** Policy ID. */
  getId(): number | null | undefined

  /** Type of policy.  Valid values: `settings`. */
  getPolicyType(): 'settings' | Files.OtherString | null | undefined

  /** Name for this policy. */
  getName(): string | null | undefined

  /** Description for this policy. */
  getDescription(): string | null | undefined

  /**
   * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies
   * accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites.
   * For more information, refer to the Value Hash section of the developer documentation.
   */
  getValue(): Files.JsonObject | null | undefined

  /** IDs of child sites that this policy has been applied to. This field is read-only. */
  getAppliedChildSiteIds(): number[] | null | undefined

  /** IDs of child sites excluded from this default policy. */
  getSkipChildSiteIds(): number[] | null | undefined

  /** IDs of child sites explicitly assigned to this non-default policy. */
  getChildSiteIds(): number[] | null | undefined

  /** Whether this policy applies to child sites not explicitly assigned to another policy. */
  getDefaultPolicy(): boolean | null | undefined

  /** When this policy was created. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** When this policy was last updated. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Policy ID. */
  setId(value: number): void

  /** Type of policy.  Valid values: `settings`. */
  setPolicyType(value: 'settings'): void

  /** Name for this policy. */
  setName(value: string): void

  /** Description for this policy. */
  setDescription(value: string): void

  /**
   * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies
   * accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites.
   * For more information, refer to the Value Hash section of the developer documentation.
   */
  setValue(value: Files.JsonObject): void

  /** IDs of child sites that this policy has been applied to. This field is read-only. */
  setAppliedChildSiteIds(value: number[]): void

  /** IDs of child sites excluded from this default policy. */
  setSkipChildSiteIds(value: number[]): void

  /** IDs of child sites explicitly assigned to this non-default policy. */
  setChildSiteIds(value: number[]): void

  /** Whether this policy applies to child sites not explicitly assigned to another policy. */
  setDefaultPolicy(value: boolean): void

  /** Update Child Site Management Policy */
  update(params?: ChildSiteManagementPolicy.UpdateParams): Promise<this>

  /** Delete Child Site Management Policy */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /**
   * List Child Site Management Policies. On a Child Site, returns only the policy covering that site. Its value
   * contains managed setting names with null values
   */
  static list(params?: ChildSiteManagementPolicy.ListParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy[]>

  /** Alias of `list()`. */
  static all(params?: ChildSiteManagementPolicy.ListParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ChildSiteManagementPolicy.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ChildSiteManagementPolicy>

  /**
   * Show Child Site Management Policy
   * @param id - Child Site Management Policy ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy>

  /** Create Child Site Management Policy */
  static create(params: ChildSiteManagementPolicy.CreateParams, options?: Files.RequestOptions): Promise<ChildSiteManagementPolicy>
}

declare namespace ChildSiteManagementPolicy {
  /** The fields of `ChildSiteManagementPolicy` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Policy ID. */
    id?: number | null

    /** Type of policy.  Valid values: `settings`. */
    policy_type?: 'settings' | Files.OtherString | null

    /** Name for this policy. */
    name?: string | null

    /** Description for this policy. */
    description?: string | null

    /**
     * Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings
     * policies accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on
     * child sites. For more information, refer to the Value Hash section of the developer documentation.
     */
    value?: Files.JsonObject | null

    /** IDs of child sites that this policy has been applied to. This field is read-only. */
    applied_child_site_ids?: number[] | null

    /** IDs of child sites excluded from this default policy. */
    skip_child_site_ids?: number[] | null

    /** IDs of child sites explicitly assigned to this non-default policy. */
    child_site_ids?: number[] | null

    /** Whether this policy applies to child sites not explicitly assigned to another policy. */
    default_policy?: boolean | null

    /** When this policy was created. */
    created_at?: Files.DateTimeString | null

    /** When this policy was last updated. */
    updated_at?: Files.DateTimeString | null
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
  }

  interface CreateParams {
    /**
     * Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash
     * section of the developer documentation.
     */
    value?: Files.JsonObject

    /** IDs of child sites excluded from this default policy. */
    skip_child_site_ids?: number[]

    /** IDs of child sites explicitly assigned to this non-default policy. */
    child_site_ids?: number[]

    /** Whether this policy applies to child sites not explicitly assigned to another policy. */
    default_policy?: boolean

    /** Type of policy.  Valid values: `settings`. */
    policy_type: 'settings'

    /** Name for this policy. */
    name?: string

    /** Description for this policy. */
    description?: string
  }

  interface UpdateParams {
    /**
     * Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash
     * section of the developer documentation.
     */
    value?: Files.JsonObject

    /** IDs of child sites excluded from this default policy. */
    skip_child_site_ids?: number[]

    /** IDs of child sites explicitly assigned to this non-default policy. */
    child_site_ids?: number[]

    /** Whether this policy applies to child sites not explicitly assigned to another policy. */
    default_policy?: boolean

    /** Type of policy.  Valid values: `settings`. */
    policy_type?: 'settings'

    /** Name for this policy. */
    name?: string

    /** Description for this policy. */
    description?: string
  }
}

export default ChildSiteManagementPolicy
