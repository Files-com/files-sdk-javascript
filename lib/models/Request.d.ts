import Files = require('../Files')

/** A Request is a file that *should* be uploaded by a specific user or group. */
declare class Request {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Request.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Request.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Request ID */
  readonly id?: number | null

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Source filename, if applicable */
  readonly source?: string | null

  /** Destination filename */
  readonly destination?: string | null

  /** ID of automation that created request */
  readonly automation_id?: number | null

  /** User making the request (if applicable) */
  readonly user_display_name?: string | null

  /** A list of user IDs to request the file from. If sent as a string, it should be comma-delimited. */
  readonly user_ids?: string

  /** A list of group IDs to request the file from. If sent as a string, it should be comma-delimited. */
  readonly group_ids?: string

  /** Request ID */
  getId(): number | null | undefined

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Source filename, if applicable */
  getSource(): string | null | undefined

  /** Destination filename */
  getDestination(): string | null | undefined

  /** ID of automation that created request */
  getAutomationId(): number | null | undefined

  /** User making the request (if applicable) */
  getUserDisplayName(): string | null | undefined

  /** A list of user IDs to request the file from. If sent as a string, it should be comma-delimited. */
  getUserIds(): string | undefined

  /** A list of group IDs to request the file from. If sent as a string, it should be comma-delimited. */
  getGroupIds(): string | undefined

  /** Request ID */
  setId(value: number): void

  /**
   * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  setPath(value: string): void

  /** Source filename, if applicable */
  setSource(value: string): void

  /** Destination filename */
  setDestination(value: string): void

  /** ID of automation that created request */
  setAutomationId(value: number): void

  /** User making the request (if applicable) */
  setUserDisplayName(value: string): void

  /** A list of user IDs to request the file from. If sent as a string, it should be comma-delimited. */
  setUserIds(value: string): void

  /** A list of group IDs to request the file from. If sent as a string, it should be comma-delimited. */
  setGroupIds(value: string): void

  /** Delete Request */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List Requests */
  static list(params?: Request.ListParams, options?: Files.RequestOptions): Promise<Request[]>

  /** Alias of `list()`. */
  static all(params?: Request.ListParams, options?: Files.RequestOptions): Promise<Request[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Request.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Request>

  /**
   * List Requests
   * @param path - Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory.
   */
  static getFolder(path: string, params?: Request.GetFolderParams, options?: Files.RequestOptions): Promise<Request[]>

  /**
   * The models `getFolder()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static getFolderIterator(path: string, params?: Request.GetFolderParams, options?: Files.RequestOptions): AsyncIterableIterator<Request>

  /** Create Request */
  static create(params: Request.CreateParams, options?: Files.RequestOptions): Promise<Request>

  static default: typeof Request
}

declare namespace Request {
  /** The fields of `Request` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Request ID */
    id?: number | null

    /**
     * Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Source filename, if applicable */
    source?: string | null

    /** Destination filename */
    destination?: string | null

    /** ID of automation that created request */
    automation_id?: number | null

    /** User making the request (if applicable) */
    user_display_name?: string | null

    /** A list of user IDs to request the file from. If sent as a string, it should be comma-delimited. */
    user_ids?: string

    /** A list of group IDs to request the file from. If sent as a string, it should be comma-delimited. */
    group_ids?: string
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject

    /** Only show requests of the current user?  (Defaults to true if current user is not a site admin.) */
    mine?: boolean

    /** Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory. */
    path?: string
  }

  interface GetFolderParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject

    /** Only show requests of the current user?  (Defaults to true if current user is not a site admin.) */
    mine?: boolean
  }

  interface CreateParams {
    /** Folder path on which to request the file. */
    path: string

    /** Destination filename (without extension) to request. */
    destination: string

    /** A list of user IDs to request the file from. If sent as a string, it should be comma-delimited. */
    user_ids?: string

    /** A list of group IDs to request the file from. If sent as a string, it should be comma-delimited. */
    group_ids?: string
  }
}

export = Request
