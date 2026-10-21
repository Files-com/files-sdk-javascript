import Files = require('../Files')

/**
 * A KeyLifecycleRule represents a rule that applies to API keys, GPG keys, and SSH keys (also called User Public Keys)
 * based on their inactivity or age.
 */
declare class KeyLifecycleRule {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: KeyLifecycleRule.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: KeyLifecycleRule.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Key Lifecycle Rule ID */
  readonly id?: number | null

  /** Key type for which the rule will apply (gpg, ssh, or api). */
  readonly key_type?: 'gpg' | 'ssh' | 'api' | Files.OtherString | null

  /** Number of days of inactivity before the rule applies. */
  readonly inactivity_days?: number | null

  /** Number of days after creation before an SSH key expires. Applies only to SSH keys. */
  readonly expiration_days?: number | null

  /** If true, a default-workspace rule also applies to keys in all workspaces. */
  readonly apply_to_all_workspaces?: boolean | null

  /** Key Lifecycle Rule name */
  readonly name?: string | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Key Lifecycle Rule ID */
  getId(): number | null | undefined

  /** Key type for which the rule will apply (gpg, ssh, or api). */
  getKeyType(): 'gpg' | 'ssh' | 'api' | Files.OtherString | null | undefined

  /** Number of days of inactivity before the rule applies. */
  getInactivityDays(): number | null | undefined

  /** Number of days after creation before an SSH key expires. Applies only to SSH keys. */
  getExpirationDays(): number | null | undefined

  /** If true, a default-workspace rule also applies to keys in all workspaces. */
  getApplyToAllWorkspaces(): boolean | null | undefined

  /** Key Lifecycle Rule name */
  getName(): string | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Key Lifecycle Rule ID */
  setId(value: number): void

  /** Key type for which the rule will apply (gpg, ssh, or api). */
  setKeyType(value: 'gpg' | 'ssh' | 'api'): void

  /** Number of days of inactivity before the rule applies. */
  setInactivityDays(value: number): void

  /** Number of days after creation before an SSH key expires. Applies only to SSH keys. */
  setExpirationDays(value: number): void

  /** If true, a default-workspace rule also applies to keys in all workspaces. */
  setApplyToAllWorkspaces(value: boolean): void

  /** Key Lifecycle Rule name */
  setName(value: string): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** Update Key Lifecycle Rule */
  update(params?: KeyLifecycleRule.UpdateParams): Promise<this>

  /** Delete Key Lifecycle Rule */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Key Lifecycle Rules */
  static list(params?: KeyLifecycleRule.ListParams, options?: Files.RequestOptions): Promise<KeyLifecycleRule[]>

  /** Alias of `list()`. */
  static all(params?: KeyLifecycleRule.ListParams, options?: Files.RequestOptions): Promise<KeyLifecycleRule[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: KeyLifecycleRule.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<KeyLifecycleRule>

  /**
   * Show Key Lifecycle Rule
   * @param id - Key Lifecycle Rule ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<KeyLifecycleRule>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<KeyLifecycleRule>

  /** Create Key Lifecycle Rule */
  static create(params?: KeyLifecycleRule.CreateParams, options?: Files.RequestOptions): Promise<KeyLifecycleRule>

  static default: typeof KeyLifecycleRule
}

declare namespace KeyLifecycleRule {
  /** The fields of `KeyLifecycleRule` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Key Lifecycle Rule ID */
    id?: number | null

    /** Key type for which the rule will apply (gpg, ssh, or api). */
    key_type?: 'gpg' | 'ssh' | 'api' | Files.OtherString | null

    /** Number of days of inactivity before the rule applies. */
    inactivity_days?: number | null

    /** Number of days after creation before an SSH key expires. Applies only to SSH keys. */
    expiration_days?: number | null

    /** If true, a default-workspace rule also applies to keys in all workspaces. */
    apply_to_all_workspaces?: boolean | null

    /** Key Lifecycle Rule name */
    name?: string | null

    /** Workspace ID. `0` means the default workspace. */
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `key_type`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `key_type` and
     * `workspace_id`. Valid field combinations are `[ workspace_id, key_type ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** If true, a default-workspace rule also applies to keys in all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Number of days after creation before an SSH key expires. Applies only to SSH keys. */
    expiration_days?: number

    /** Key type for which the rule will apply (gpg, ssh, or api). */
    key_type?: 'gpg' | 'ssh' | 'api'

    /** Number of days of inactivity before the rule applies. */
    inactivity_days?: number

    /** Key Lifecycle Rule name */
    name?: string

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** If true, a default-workspace rule also applies to keys in all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Number of days after creation before an SSH key expires. Applies only to SSH keys. */
    expiration_days?: number

    /** Key type for which the rule will apply (gpg, ssh, or api). */
    key_type?: 'gpg' | 'ssh' | 'api'

    /** Number of days of inactivity before the rule applies. */
    inactivity_days?: number

    /** Key Lifecycle Rule name */
    name?: string

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }
}

export = KeyLifecycleRule
