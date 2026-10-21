import Files from '../Files'

/**
 * A BundleNotification is an E-Mail sent out to users when certain actions are performed on or within a shared set of
 * files and folders.
 */
declare class BundleNotification {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BundleNotification.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BundleNotification.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Bundle ID to notify on */
  readonly bundle_id?: number | null

  /** Bundle Notification ID */
  readonly id?: number | null

  /** Triggers bundle notification when a registration action occurs for it. */
  readonly notify_on_registration?: boolean | null

  /** Triggers bundle notification when a upload action occurs for it. */
  readonly notify_on_upload?: boolean | null

  /** Is the current user the user to notify? */
  readonly notify_current_user?: boolean | null

  /** The id of the user to notify. */
  readonly notify_user_id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** Bundle ID to notify on */
  getBundleId(): number | null | undefined

  /** Bundle Notification ID */
  getId(): number | null | undefined

  /** Triggers bundle notification when a registration action occurs for it. */
  getNotifyOnRegistration(): boolean | null | undefined

  /** Triggers bundle notification when a upload action occurs for it. */
  getNotifyOnUpload(): boolean | null | undefined

  /** Is the current user the user to notify? */
  getNotifyCurrentUser(): boolean | null | undefined

  /** The id of the user to notify. */
  getNotifyUserId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** Bundle ID to notify on */
  setBundleId(value: number): void

  /** Bundle Notification ID */
  setId(value: number): void

  /** Triggers bundle notification when a registration action occurs for it. */
  setNotifyOnRegistration(value: boolean): void

  /** Triggers bundle notification when a upload action occurs for it. */
  setNotifyOnUpload(value: boolean): void

  /** Is the current user the user to notify? */
  setNotifyCurrentUser(value: boolean): void

  /** The id of the user to notify. */
  setNotifyUserId(value: number): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /** Update Share Link Notification */
  update(params?: BundleNotification.UpdateParams): Promise<this>

  /** Delete Share Link Notification */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Share Link Notifications */
  static list(params?: BundleNotification.ListParams, options?: Files.RequestOptions): Promise<BundleNotification[]>

  /** Alias of `list()`. */
  static all(params?: BundleNotification.ListParams, options?: Files.RequestOptions): Promise<BundleNotification[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: BundleNotification.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<BundleNotification>

  /**
   * Show Share Link Notification
   * @param id - Bundle Notification ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<BundleNotification>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<BundleNotification>

  /** Create Share Link Notification */
  static create(params: BundleNotification.CreateParams, options?: Files.RequestOptions): Promise<BundleNotification>
}

declare namespace BundleNotification {
  /** The fields of `BundleNotification` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Bundle ID to notify on */
    bundle_id?: number | null

    /** Bundle Notification ID */
    id?: number | null

    /** Triggers bundle notification when a registration action occurs for it. */
    notify_on_registration?: boolean | null

    /** Triggers bundle notification when a upload action occurs for it. */
    notify_on_upload?: boolean | null

    /** Is the current user the user to notify? */
    notify_current_user?: boolean | null

    /** The id of the user to notify. */
    notify_user_id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `bundle_id`.
     */
    sort_by?: Files.JsonObject

    /** If set, return records where the specified field is equal to the supplied value. Valid fields are `bundle_id`. */
    filter?: Files.JsonObject

    /** Bundle ID */
    bundle_id?: number
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Bundle ID to notify on */
    bundle_id: number

    /** The id of the user to notify. */
    notify_user_id?: number

    /** Triggers bundle notification when a registration action occurs for it. */
    notify_on_registration?: boolean

    /** Triggers bundle notification when a upload action occurs for it. */
    notify_on_upload?: boolean
  }

  interface UpdateParams {
    /** Triggers bundle notification when a registration action occurs for it. */
    notify_on_registration?: boolean

    /** Triggers bundle notification when a upload action occurs for it. */
    notify_on_upload?: boolean
  }
}

export default BundleNotification
