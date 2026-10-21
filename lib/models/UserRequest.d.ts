import Files = require('../Files')

/**
 * A UserRequest is an operation that allows anonymous users to place a request for access on the login screen to the
 * site administrator.
 */
declare class UserRequest {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UserRequest.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UserRequest.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** ID */
  readonly id?: number | null

  /** User's full name */
  readonly name?: string | null

  /** User email address */
  readonly email?: string | null

  /** Details of the user's request */
  readonly details?: string | null

  /** User's company name */
  readonly company?: string | null

  /** ID */
  getId(): number | null | undefined

  /** User's full name */
  getName(): string | null | undefined

  /** User email address */
  getEmail(): string | null | undefined

  /** Details of the user's request */
  getDetails(): string | null | undefined

  /** User's company name */
  getCompany(): string | null | undefined

  /** ID */
  setId(value: number): void

  /** User's full name */
  setName(value: string): void

  /** User email address */
  setEmail(value: string): void

  /** Details of the user's request */
  setDetails(value: string): void

  /** User's company name */
  setCompany(value: string): void

  /** Delete User Request */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List User Requests */
  static list(params?: UserRequest.ListParams, options?: Files.RequestOptions): Promise<UserRequest[]>

  /** Alias of `list()`. */
  static all(params?: UserRequest.ListParams, options?: Files.RequestOptions): Promise<UserRequest[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UserRequest.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UserRequest>

  /**
   * Show User Request
   * @param id - User Request ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserRequest>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<UserRequest>

  /** Create User Request */
  static create(params: UserRequest.CreateParams, options?: Files.RequestOptions): Promise<UserRequest>

  static default: typeof UserRequest
}

declare namespace UserRequest {
  /** The fields of `UserRequest` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** ID */
    id?: number | null

    /** User's full name */
    name?: string | null

    /** User email address */
    email?: string | null

    /** Details of the user's request */
    details?: string | null

    /** User's company name */
    company?: string | null
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
    /** Name of user requested */
    name: string

    /** Email of user requested */
    email: string

    /** Details of the user request */
    details: string

    /** Company of the user requested */
    company?: string
  }
}

export = UserRequest
