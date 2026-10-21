import Files = require('../Files')

/** A GroupUser is a record about membership of a User within a Group. */
declare class GroupUser {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: GroupUser.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: GroupUser.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Group name */
  readonly group_name?: string | null

  /** Group ID */
  readonly group_id?: number | null

  /** User ID */
  readonly user_id?: number | null

  /** Is this user an administrator of this group? */
  readonly admin?: boolean | null

  /** Username of the user */
  readonly username?: string | null

  /** Group User ID. */
  readonly id?: number

  /** Group name */
  getGroupName(): string | null | undefined

  /** Group ID */
  getGroupId(): number | null | undefined

  /** User ID */
  getUserId(): number | null | undefined

  /** Is this user an administrator of this group? */
  getAdmin(): boolean | null | undefined

  /** Username of the user */
  getUsername(): string | null | undefined

  /** Group User ID. */
  getId(): number | undefined

  /** Group name */
  setGroupName(value: string): void

  /** Group ID */
  setGroupId(value: number): void

  /** User ID */
  setUserId(value: number): void

  /** Is this user an administrator of this group? */
  setAdmin(value: boolean): void

  /** Username of the user */
  setUsername(value: string): void

  /** Group User ID. */
  setId(value: number): void

  /** Update Group User */
  update(params?: GroupUser.UpdateParams): Promise<this>

  /** Delete Group User */
  delete(params?: GroupUser.DeleteParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: GroupUser.DeleteParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Group Users */
  static list(params?: GroupUser.ListParams, options?: Files.RequestOptions): Promise<GroupUser[]>

  /** Alias of `list()`. */
  static all(params?: GroupUser.ListParams, options?: Files.RequestOptions): Promise<GroupUser[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: GroupUser.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<GroupUser>

  /** Create Group User */
  static create(params: GroupUser.CreateParams, options?: Files.RequestOptions): Promise<GroupUser>

  static default: typeof GroupUser
}

declare namespace GroupUser {
  /** The fields of `GroupUser` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Group name */
    group_name?: string | null

    /** Group ID */
    group_id?: number | null

    /** User ID */
    user_id?: number | null

    /** Is this user an administrator of this group? */
    admin?: boolean | null

    /** Username of the user */
    username?: string | null

    /** Group User ID. */
    id?: number
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
     * Group ID. If provided, returns memberships of this group. Requires a Site Administrator, a Read-only
     * Administrator, a Workspace Administrator for the group's workspace, or a Group Administrator of this group.
     */
    group_id?: number

    /** User ID.  If provided, will return group_users of this user. */
    user_id?: number
  }

  interface CreateParams {
    /** Group ID to add user to. */
    group_id: number

    /** User ID to add to group. */
    user_id: number

    /** Is the user a group administrator? */
    admin?: boolean
  }

  interface UpdateParams {
    /** Required: when not given, this object's `group_id` is used. Group ID to add user to. */
    group_id?: number

    /** Required: when not given, this object's `user_id` is used. User ID to add to group. */
    user_id?: number

    /** Is the user a group administrator? */
    admin?: boolean
  }

  interface DeleteParams {
    /** Required: when not given, this object's `group_id` is used. Group ID from which to remove user. */
    group_id?: number

    /** Required: when not given, this object's `user_id` is used. User ID to remove from group. */
    user_id?: number
  }
}

export = GroupUser
