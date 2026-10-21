import Files from '../Files'

/**
 * An Integration Centric Profile defines the Remote Server integrations a user is expected to add and connect during
 * integration-centric onboarding.
 */
declare class IntegrationCentricProfile {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: IntegrationCentricProfile.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: IntegrationCentricProfile.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Integration Centric Profile ID */
  readonly id?: number | null

  /** Profile name */
  readonly name?: string | null

  /** Workspace ID */
  readonly workspace_id?: number | null

  /** Whether this profile applies to all users in the Workspace by default */
  readonly use_for_all_users?: boolean | null

  /**
   * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
   * include a display `name`.
   */
  readonly expected_remote_servers?: IntegrationCentricProfile.ExpectedRemoteServers | null

  /** Integration Centric Profile ID */
  getId(): number | null | undefined

  /** Profile name */
  getName(): string | null | undefined

  /** Workspace ID */
  getWorkspaceId(): number | null | undefined

  /** Whether this profile applies to all users in the Workspace by default */
  getUseForAllUsers(): boolean | null | undefined

  /**
   * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
   * include a display `name`.
   */
  getExpectedRemoteServers(): IntegrationCentricProfile.ExpectedRemoteServers | null | undefined

  /** Integration Centric Profile ID */
  setId(value: number): void

  /** Profile name */
  setName(value: string): void

  /** Workspace ID */
  setWorkspaceId(value: number): void

  /** Whether this profile applies to all users in the Workspace by default */
  setUseForAllUsers(value: boolean): void

  /**
   * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
   * include a display `name`.
   */
  setExpectedRemoteServers(value: IntegrationCentricProfile.ExpectedRemoteServers): void

  /** Update Integration Centric Profile */
  update(params?: IntegrationCentricProfile.UpdateParams): Promise<this>

  /** Delete Integration Centric Profile */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Integration Centric Profiles */
  static list(params?: IntegrationCentricProfile.ListParams, options?: Files.RequestOptions): Promise<IntegrationCentricProfile[]>

  /** Alias of `list()`. */
  static all(params?: IntegrationCentricProfile.ListParams, options?: Files.RequestOptions): Promise<IntegrationCentricProfile[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: IntegrationCentricProfile.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<IntegrationCentricProfile>

  /**
   * Show Integration Centric Profile
   * @param id - Integration Centric Profile ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<IntegrationCentricProfile>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<IntegrationCentricProfile>

  /** Create Integration Centric Profile */
  static create(params: IntegrationCentricProfile.CreateParams, options?: Files.RequestOptions): Promise<IntegrationCentricProfile>
}

declare namespace IntegrationCentricProfile {
  /** The fields of `IntegrationCentricProfile` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Integration Centric Profile ID */
    id?: number | null

    /** Profile name */
    name?: string | null

    /** Workspace ID */
    workspace_id?: number | null

    /** Whether this profile applies to all users in the Workspace by default */
    use_for_all_users?: boolean | null

    /**
     * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
     * include a display `name`.
     */
    expected_remote_servers?: IntegrationCentricProfile.ExpectedRemoteServers | null
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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Profile name */
    name: string

    /**
     * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
     * include a display `name`.
     */
    expected_remote_servers: IntegrationCentricProfile.ExpectedRemoteServers

    /** Workspace ID */
    workspace_id?: number

    /** Whether this profile applies to all users in the Workspace by default */
    use_for_all_users?: boolean
  }

  interface UpdateParams {
    /** Profile name */
    name?: string

    /** Workspace ID */
    workspace_id?: number

    /**
     * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
     * include a display `name`.
     */
    expected_remote_servers?: IntegrationCentricProfile.ExpectedRemoteServers

    /** Whether this profile applies to all users in the Workspace by default */
    use_for_all_users?: boolean
  }

  /**
   * Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may
   * include a display `name`. Names are trimmed. Blank names are omitted. Each server_type/name pair must be unique.
   * Name comparisons ignore letter case.
   */
  type ExpectedRemoteServers = Array<{
    /** Remote Server type. */
    server_type: string

    /** Display name for the Remote Server. */
    name?: string
  }>
}

export default IntegrationCentricProfile
