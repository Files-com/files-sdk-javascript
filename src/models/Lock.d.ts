import Files from '../Files'

/** A Lock can be used by your custom-developed applications to implement file locking and concurrency features. */
declare class Lock {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Lock.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Lock.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `path`. */
  isLoaded(): boolean

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  readonly path?: string | null

  /** Lock timeout in seconds */
  readonly timeout?: number | null

  readonly depth?: string | null

  /** Does lock apply to subfolders? */
  readonly recursive?: boolean | null

  /** Arbitrary descriptive label for the lock. Does not change the lock creator or permissions. */
  readonly owner?: string | null

  readonly scope?: string | null

  /** Is lock exclusive? */
  readonly exclusive?: boolean | null

  /** Lock token.  Use to release lock. */
  readonly token?: string | null

  readonly type?: string | null

  /** Can lock be modified by users other than its creator? */
  readonly allow_access_by_any_user?: boolean | null

  /** Lock creator user ID */
  readonly user_id?: number | null

  /** Lock creator username */
  readonly username?: string | null

  /**
   * Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to
   * refresh, or a different value to replace.
   */
  readonly expected_token?: string

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  getPath(): string | null | undefined

  /** Lock timeout in seconds */
  getTimeout(): number | null | undefined

  getDepth(): string | null | undefined

  /** Does lock apply to subfolders? */
  getRecursive(): boolean | null | undefined

  /** Arbitrary descriptive label for the lock. Does not change the lock creator or permissions. */
  getOwner(): string | null | undefined

  getScope(): string | null | undefined

  /** Is lock exclusive? */
  getExclusive(): boolean | null | undefined

  /** Lock token.  Use to release lock. */
  getToken(): string | null | undefined

  getType(): string | null | undefined

  /** Can lock be modified by users other than its creator? */
  getAllowAccessByAnyUser(): boolean | null | undefined

  /** Lock creator user ID */
  getUserId(): number | null | undefined

  /** Lock creator username */
  getUsername(): string | null | undefined

  /**
   * Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to
   * refresh, or a different value to replace.
   */
  getExpectedToken(): string | undefined

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  setPath(value: string): void

  /** Lock timeout in seconds */
  setTimeout(value: number): void

  setDepth(value: string): void

  /** Does lock apply to subfolders? */
  setRecursive(value: boolean): void

  /** Arbitrary descriptive label for the lock. Does not change the lock creator or permissions. */
  setOwner(value: string): void

  setScope(value: string): void

  /** Is lock exclusive? */
  setExclusive(value: boolean): void

  /** Lock token.  Use to release lock. */
  setToken(value: string): void

  setType(value: string): void

  /** Can lock be modified by users other than its creator? */
  setAllowAccessByAnyUser(value: boolean): void

  /** Lock creator user ID */
  setUserId(value: number): void

  /** Lock creator username */
  setUsername(value: string): void

  /**
   * Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to
   * refresh, or a different value to replace.
   */
  setExpectedToken(value: string): void

  /** Delete Lock */
  delete(params?: Lock.DeleteParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Lock.DeleteParams): Promise<void>

  /** Creates this object from its attributes. Its attributes then become those the API returns. */
  save(): Promise<true>

  /**
   * List Locks by Path
   * @param path - Path to operate on.
   */
  static listFor(path: string, params?: Lock.ListForParams, options?: Files.RequestOptions): Promise<Lock[]>

  /**
   * The models `listFor()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForIterator(path: string, params?: Lock.ListForParams, options?: Files.RequestOptions): AsyncIterableIterator<Lock>

  /**
   * Create Lock
   * @param path - Path
   */
  static create(path: string, params?: Lock.CreateParams, options?: Files.RequestOptions): Promise<Lock>
}

declare namespace Lock {
  /** The fields of `Lock` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Lock timeout in seconds */
    timeout?: number | null

    depth?: string | null

    /** Does lock apply to subfolders? */
    recursive?: boolean | null

    /** Arbitrary descriptive label for the lock. Does not change the lock creator or permissions. */
    owner?: string | null

    scope?: string | null

    /** Is lock exclusive? */
    exclusive?: boolean | null

    /** Lock token.  Use to release lock. */
    token?: string | null

    type?: string | null

    /** Can lock be modified by users other than its creator? */
    allow_access_by_any_user?: boolean | null

    /** Lock creator user ID */
    user_id?: number | null

    /** Lock creator username */
    username?: string | null

    /**
     * Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to
     * refresh, or a different value to replace.
     */
    expected_token?: string
  }

  interface ListForParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** Include locks from children objects? */
    include_children?: boolean
  }

  interface CreateParams {
    /**
     * Lock token. With expected_token, use the same value to refresh or a different value to replace the existing
     * token.
     */
    token?: string

    /**
     * Require this existing, unexpired token before refreshing or replacing a lock. Set token to the same value to
     * refresh, or a different value to replace.
     */
    expected_token?: string

    /** Can lock be modified by users other than its creator? */
    allow_access_by_any_user?: boolean

    /** Is lock exclusive? */
    exclusive?: boolean

    /** Does lock apply to subfolders? */
    recursive?: boolean

    /** Arbitrary descriptive label for the lock. Does not change the lock creator or permissions. */
    owner?: string

    /** Lock timeout in seconds */
    timeout?: number
  }

  interface DeleteParams {
    /** Required: when not given, this object's `token` is used. Lock token */
    token?: string
  }
}

export default Lock
