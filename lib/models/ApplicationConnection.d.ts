import Files = require('../Files')

declare class ApplicationConnection {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ApplicationConnection.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ApplicationConnection.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Connection ID. */
  readonly id?: number | null

  /** Workspace that owns this connection. */
  readonly workspace_id?: number | null

  /** Connection display name. */
  readonly name?: string | null

  /** Application key from the Automation applications list. */
  readonly application_key?: string | null

  /** HTTPS origin for this connection. */
  readonly origin?: string | null

  /** ID of the credential in the Secret Store, if the connection uses a credential. */
  readonly secret_id?: number | null

  /** Current credential type and placement, without the secret value. */
  readonly authentication?: Files.JsonObject | null

  /** Time the connection was created. */
  readonly created_at?: Files.DateTimeString | null

  /** Time the connection was updated. */
  readonly updated_at?: Files.DateTimeString | null

  /** Connection ID. */
  getId(): number | null | undefined

  /** Workspace that owns this connection. */
  getWorkspaceId(): number | null | undefined

  /** Connection display name. */
  getName(): string | null | undefined

  /** Application key from the Automation applications list. */
  getApplicationKey(): string | null | undefined

  /** HTTPS origin for this connection. */
  getOrigin(): string | null | undefined

  /** ID of the credential in the Secret Store, if the connection uses a credential. */
  getSecretId(): number | null | undefined

  /** Current credential type and placement, without the secret value. */
  getAuthentication(): Files.JsonObject | null | undefined

  /** Time the connection was created. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Time the connection was updated. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Connection ID. */
  setId(value: number): void

  /** Workspace that owns this connection. */
  setWorkspaceId(value: number): void

  /** Connection display name. */
  setName(value: string): void

  /** Application key from the Automation applications list. */
  setApplicationKey(value: string): void

  /** HTTPS origin for this connection. */
  setOrigin(value: string): void

  /** ID of the credential in the Secret Store, if the connection uses a credential. */
  setSecretId(value: number): void

  /** Current credential type and placement, without the secret value. */
  setAuthentication(value: Files.JsonObject): void

  /** Update Application Connection */
  update(params?: ApplicationConnection.UpdateParams): Promise<this>

  /** Delete Application Connection */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Application Connections */
  static list(params?: ApplicationConnection.ListParams, options?: Files.RequestOptions): Promise<ApplicationConnection[]>

  /** Alias of `list()`. */
  static all(params?: ApplicationConnection.ListParams, options?: Files.RequestOptions): Promise<ApplicationConnection[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ApplicationConnection.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ApplicationConnection>

  /**
   * Show Application Connection
   * @param id - Application Connection ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ApplicationConnection>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ApplicationConnection>

  /** Create Application Connection */
  static create(params: ApplicationConnection.CreateParams, options?: Files.RequestOptions): Promise<ApplicationConnection>

  static default: typeof ApplicationConnection
}

declare namespace ApplicationConnection {
  /** The fields of `ApplicationConnection` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Connection ID. */
    id?: number | null

    /** Workspace that owns this connection. */
    workspace_id?: number | null

    /** Connection display name. */
    name?: string | null

    /** Application key from the Automation applications list. */
    application_key?: string | null

    /** HTTPS origin for this connection. */
    origin?: string | null

    /** ID of the credential in the Secret Store, if the connection uses a credential. */
    secret_id?: number | null

    /** Current credential type and placement, without the secret value. */
    authentication?: Files.JsonObject | null

    /** Time the connection was created. */
    created_at?: Files.DateTimeString | null

    /** Time the connection was updated. */
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
     * `name` or `application_key`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`
     * and `application_key`. Valid field combinations are `[ workspace_id, application_key ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are
     * `application_key`.
     */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** Connection display name. */
    name: string

    /** ID of the credential in the Secret Store, if the connection uses a credential. */
    secret_id?: number

    /** Application key from the Automation applications list. */
    application_key: string

    /** HTTPS origin for this connection. */
    origin: string

    /** Workspace that owns this connection. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Connection display name. */
    name?: string

    /** ID of the credential in the Secret Store, if the connection uses a credential. */
    secret_id?: number
  }
}

export = ApplicationConnection
