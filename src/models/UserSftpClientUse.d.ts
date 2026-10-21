import Files from '../Files'

/** A UserSftpClientUse is a way to see the exact set of SFTP clients used by a given user. */
declare class UserSftpClientUse {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UserSftpClientUse.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UserSftpClientUse.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** UserSftpClientUse ID */
  readonly id?: number | null

  /** The SFTP client used */
  readonly sftp_client?: string | null

  /** The earliest recorded use of this SFTP client (for this user) */
  readonly created_at?: Files.DateTimeString | null

  /** The most recent use of this SFTP client (for this user) */
  readonly updated_at?: Files.DateTimeString | null

  /** ID of the user who performed this access */
  readonly user_id?: number | null

  /** UserSftpClientUse ID */
  getId(): number | null | undefined

  /** The SFTP client used */
  getSftpClient(): string | null | undefined

  /** The earliest recorded use of this SFTP client (for this user) */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** The most recent use of this SFTP client (for this user) */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** ID of the user who performed this access */
  getUserId(): number | null | undefined

  /** List User SFTP Client Uses */
  static list(params?: UserSftpClientUse.ListParams, options?: Files.RequestOptions): Promise<UserSftpClientUse[]>

  /** Alias of `list()`. */
  static all(params?: UserSftpClientUse.ListParams, options?: Files.RequestOptions): Promise<UserSftpClientUse[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UserSftpClientUse.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UserSftpClientUse>
}

declare namespace UserSftpClientUse {
  /** The fields of `UserSftpClientUse` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** UserSftpClientUse ID */
    id?: number | null

    /** The SFTP client used */
    sftp_client?: string | null

    /** The earliest recorded use of this SFTP client (for this user) */
    created_at?: Files.DateTimeString | null

    /** The most recent use of this SFTP client (for this user) */
    updated_at?: Files.DateTimeString | null

    /** ID of the user who performed this access */
    user_id?: number | null
  }

  interface ListParams {
    /** User ID. If provided, will return uses for this user. */
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
     */
    sort_by?: Files.JsonObject
  }
}

export default UserSftpClientUse
