import Files from '../Files'

/** A Secret stores named, typed secret material for later use by features that reference the Secret by ID. */
declare class Secret {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Secret.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Secret.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Secret ID. */
  readonly id?: number | null

  /** Workspace ID. 0 means the default workspace. */
  readonly workspace_id?: number | null

  /** Secret name. */
  readonly name?: string | null

  /** Internal description for your reference. */
  readonly description?: string | null

  /** Secret type. */
  readonly secret_type?: 'basic' | 'token' | 'headers' | 'certificate' | 'key_value' | Files.OtherString | null

  /** Non-secret metadata for the Secret type. */
  readonly metadata?: Secret.Metadata | null

  /** Names of configured secret value fields. Secret values are never returned. */
  readonly value_field_names?: string[] | null

  /** Secret create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Secret update date/time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Secret ID. */
  getId(): number | null | undefined

  /** Workspace ID. 0 means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Secret name. */
  getName(): string | null | undefined

  /** Internal description for your reference. */
  getDescription(): string | null | undefined

  /** Secret type. */
  getSecretType(): 'basic' | 'token' | 'headers' | 'certificate' | 'key_value' | Files.OtherString | null | undefined

  /** Non-secret metadata for the Secret type. */
  getMetadata(): Secret.Metadata | null | undefined

  /** Names of configured secret value fields. Secret values are never returned. */
  getValueFieldNames(): string[] | null | undefined

  /** Secret create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Secret update date/time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Secret ID. */
  setId(value: number): void

  /** Workspace ID. 0 means the default workspace. */
  setWorkspaceId(value: number): void

  /** Secret name. */
  setName(value: string): void

  /** Internal description for your reference. */
  setDescription(value: string): void

  /** Secret type. */
  setSecretType(value: 'basic' | 'token' | 'headers' | 'certificate' | 'key_value'): void

  /** Non-secret metadata for the Secret type. */
  setMetadata(value: Secret.Metadata): void

  /** Names of configured secret value fields. Secret values are never returned. */
  setValueFieldNames(value: string[]): void

  /** Update Secret */
  update(params?: Secret.UpdateParams): Promise<this>

  /** Delete Secret */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Secrets */
  static list(params?: Secret.ListParams, options?: Files.RequestOptions): Promise<Secret[]>

  /** Alias of `list()`. */
  static all(params?: Secret.ListParams, options?: Files.RequestOptions): Promise<Secret[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Secret.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Secret>

  /**
   * Show Secret
   * @param id - Secret ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Secret>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Secret>

  /** Create Secret */
  static create(params: Secret.CreateParams, options?: Files.RequestOptions): Promise<Secret>
}

declare namespace Secret {
  /** The fields of `Secret` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Secret ID. */
    id?: number | null

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number | null

    /** Secret name. */
    name?: string | null

    /** Internal description for your reference. */
    description?: string | null

    /** Secret type. */
    secret_type?: 'basic' | 'token' | 'headers' | 'certificate' | 'key_value' | Files.OtherString | null

    /** Non-secret metadata for the Secret type. */
    metadata?: Secret.Metadata | null

    /** Names of configured secret value fields. Secret values are never returned. */
    value_field_names?: string[] | null

    /** Secret create date/time. */
    created_at?: Files.DateTimeString | null

    /** Secret update date/time. */
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

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `name` or `secret_type`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`,
     * `name` or `secret_type`. Valid field combinations are `[ workspace_id, name ]`, `[ workspace_id, secret_type ]`,
     * `[ secret_type, name ]` or `[ workspace_id, secret_type, name ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`. */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** Secret name. */
    name: string

    /** Internal description for your reference. */
    description?: string

    /** Secret type. */
    secret_type: 'basic' | 'token' | 'headers' | 'certificate' | 'key_value'

    /** Non-secret metadata for the Secret type. */
    metadata?: Secret.Metadata

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Secret name. */
    name?: string

    /** Internal description for your reference. */
    description?: string

    /** Secret type. */
    secret_type?: 'basic' | 'token' | 'headers' | 'certificate' | 'key_value'

    /** Non-secret metadata for the Secret type. */
    metadata?: Secret.Metadata
  }

  /** Secret metadata */
  interface Metadata {
    /** Required for basic secrets. Not allowed for other secret types. */
    username?: string

    /** For token secrets only. Cannot be combined with query_parameter_name. */
    header_name?: string

    /** For token secrets only. Cannot be combined with header_name. */
    query_parameter_name?: string
  }
}

export default Secret
