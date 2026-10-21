import Files from '../Files'

declare class UserAdditionalEmailRecipient {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UserAdditionalEmailRecipient.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UserAdditionalEmailRecipient.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** User additional email recipient ID */
  readonly id?: number | null

  /** User ID */
  readonly user_id?: number | null

  /** Workspace ID (0 for default workspace). */
  readonly workspace_id?: number | null

  /** Additional email recipient address */
  readonly email?: string | null

  /** Created at date/time */
  readonly created_at?: Files.DateTimeString | null

  /** User additional email recipient ID */
  getId(): number | null | undefined

  /** User ID */
  getUserId(): number | null | undefined

  /** Workspace ID (0 for default workspace). */
  getWorkspaceId(): number | null | undefined

  /** Additional email recipient address */
  getEmail(): string | null | undefined

  /** Created at date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** User additional email recipient ID */
  setId(value: number): void

  /** User ID */
  setUserId(value: number): void

  /** Workspace ID (0 for default workspace). */
  setWorkspaceId(value: number): void

  /** Additional email recipient address */
  setEmail(value: string): void

  /** Update User Additional Email Recipient */
  update(params?: UserAdditionalEmailRecipient.UpdateParams): Promise<this>

  /** Delete User Additional Email Recipient */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List User Additional Email Recipients */
  static list(params?: UserAdditionalEmailRecipient.ListParams, options?: Files.RequestOptions): Promise<UserAdditionalEmailRecipient[]>

  /** Alias of `list()`. */
  static all(params?: UserAdditionalEmailRecipient.ListParams, options?: Files.RequestOptions): Promise<UserAdditionalEmailRecipient[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UserAdditionalEmailRecipient.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UserAdditionalEmailRecipient>

  /**
   * Show User Additional Email Recipient
   * @param id - User Additional Email Recipient ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserAdditionalEmailRecipient>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserAdditionalEmailRecipient>

  /** Create User Additional Email Recipient */
  static create(params: UserAdditionalEmailRecipient.CreateParams, options?: Files.RequestOptions): Promise<UserAdditionalEmailRecipient>
}

declare namespace UserAdditionalEmailRecipient {
  /** The fields of `UserAdditionalEmailRecipient` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** User additional email recipient ID */
    id?: number | null

    /** User ID */
    user_id?: number | null

    /** Workspace ID (0 for default workspace). */
    workspace_id?: number | null

    /** Additional email recipient address */
    email?: string | null

    /** Created at date/time */
    created_at?: Files.DateTimeString | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `email`,
     * `user_id` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `email`,
     * `workspace_id` or `user_id`. Valid field combinations are `[ workspace_id, email ]`, `[ user_id, email ]`, `[
     * workspace_id, user_id ]` or `[ workspace_id, user_id, email ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `email`. */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Additional email recipient address */
    email: string
  }

  interface UpdateParams {
    /** Additional email recipient address */
    email?: string
  }
}

export default UserAdditionalEmailRecipient
