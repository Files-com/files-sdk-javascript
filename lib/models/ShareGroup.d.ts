import Files = require('../Files')

/**
 * A ShareGroup is a way for you to store and name groups of email contacts to be used for sending share and inbox
 * invitations.
 */
declare class ShareGroup {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ShareGroup.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ShareGroup.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Share Group ID */
  readonly id?: number | null

  /** Name of the share group */
  readonly name?: string | null

  /** Additional notes of the share group */
  readonly notes?: string | null

  /** Owner User ID */
  readonly user_id?: number | null

  /** A list of share group members */
  readonly members?: ShareGroup.Members | null

  /** Share Group ID */
  getId(): number | null | undefined

  /** Name of the share group */
  getName(): string | null | undefined

  /** Additional notes of the share group */
  getNotes(): string | null | undefined

  /** Owner User ID */
  getUserId(): number | null | undefined

  /** A list of share group members */
  getMembers(): ShareGroup.Members | null | undefined

  /** Share Group ID */
  setId(value: number): void

  /** Name of the share group */
  setName(value: string): void

  /** Additional notes of the share group */
  setNotes(value: string): void

  /** Owner User ID */
  setUserId(value: number): void

  /** A list of share group members */
  setMembers(value: ShareGroup.Members): void

  /** Update Share Group */
  update(params?: ShareGroup.UpdateParams): Promise<this>

  /** Delete Share Group */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Share Groups */
  static list(params?: ShareGroup.ListParams, options?: Files.RequestOptions): Promise<ShareGroup[]>

  /** Alias of `list()`. */
  static all(params?: ShareGroup.ListParams, options?: Files.RequestOptions): Promise<ShareGroup[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ShareGroup.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ShareGroup>

  /**
   * Show Share Group
   * @param id - Share Group ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ShareGroup>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ShareGroup>

  /** Create Share Group */
  static create(params: ShareGroup.CreateParams, options?: Files.RequestOptions): Promise<ShareGroup>

  static default: typeof ShareGroup
}

declare namespace ShareGroup {
  /** The fields of `ShareGroup` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Share Group ID */
    id?: number | null

    /** Name of the share group */
    name?: string | null

    /** Additional notes of the share group */
    notes?: string | null

    /** Owner User ID */
    user_id?: number | null

    /** A list of share group members */
    members?: ShareGroup.Members | null
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
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Additional notes of the share group */
    notes?: string

    /** Name of the share group */
    name: string

    /** A list of share group members. */
    members: ShareGroup.Members
  }

  interface UpdateParams {
    /** Additional notes of the share group */
    notes?: string

    /** Name of the share group */
    name?: string

    /** A list of share group members. */
    members?: ShareGroup.Members
  }

  /**
   * Contacts in this share group. Creating a share group requires at least one member. An update replaces the members
   * with this list, and an empty list leaves them unchanged. Existing members are matched by email and keep their
   * stored email address.
   */
  type Members = Array<{
    /** Email of the share group member */
    email: string

    /** Name of the share group member */
    name?: string | null

    /** Company of the share group member */
    company?: string | null
  }>
}

export = ShareGroup
