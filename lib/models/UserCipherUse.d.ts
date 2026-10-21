import Files = require('../Files')

/** A UserCipherUse is a way to see the exact set of encryption ciphers and protocols used by a given user. */
declare class UserCipherUse {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: UserCipherUse.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: UserCipherUse.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** UserCipherUse ID */
  readonly id?: number | null

  /** ID of the user who performed this access */
  readonly user_id?: number | null

  /** Username of the user who performed this access */
  readonly username?: string | null

  /** The protocol and cipher employed */
  readonly protocol_cipher?: string | null

  /** The earliest recorded use of this combination of interface and protocol and cipher (for this user) */
  readonly created_at?: Files.DateTimeString | null

  /** Is this cipher considered insecure? */
  readonly insecure?: boolean | null

  /** The interface accessed */
  readonly interface?: 'web' | 'ftp' | 'sftp' | 'dav' | 'desktop' | 'restapi' | 'robot' | 'jsapi' | 'inbound_s3' | Files.OtherString | null

  /** The most recent use of this combination of interface and protocol and cipher (for this user) */
  readonly updated_at?: Files.DateTimeString | null

  /** UserCipherUse ID */
  getId(): number | null | undefined

  /** ID of the user who performed this access */
  getUserId(): number | null | undefined

  /** Username of the user who performed this access */
  getUsername(): string | null | undefined

  /** The protocol and cipher employed */
  getProtocolCipher(): string | null | undefined

  /** The earliest recorded use of this combination of interface and protocol and cipher (for this user) */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Is this cipher considered insecure? */
  getInsecure(): boolean | null | undefined

  /** The interface accessed */
  getInterface(): 'web' | 'ftp' | 'sftp' | 'dav' | 'desktop' | 'restapi' | 'robot' | 'jsapi' | 'inbound_s3' | Files.OtherString | null | undefined

  /** The most recent use of this combination of interface and protocol and cipher (for this user) */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** List User Cipher Uses */
  static list(params?: UserCipherUse.ListParams, options?: Files.RequestOptions): Promise<UserCipherUse[]>

  /** Alias of `list()`. */
  static all(params?: UserCipherUse.ListParams, options?: Files.RequestOptions): Promise<UserCipherUse[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: UserCipherUse.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<UserCipherUse>

  static default: typeof UserCipherUse
}

declare namespace UserCipherUse {
  /** The fields of `UserCipherUse` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** UserCipherUse ID */
    id?: number | null

    /** ID of the user who performed this access */
    user_id?: number | null

    /** Username of the user who performed this access */
    username?: string | null

    /** The protocol and cipher employed */
    protocol_cipher?: string | null

    /** The earliest recorded use of this combination of interface and protocol and cipher (for this user) */
    created_at?: Files.DateTimeString | null

    /** Is this cipher considered insecure? */
    insecure?: boolean | null

    /** The interface accessed */
    interface?: 'web' | 'ftp' | 'sftp' | 'dav' | 'desktop' | 'restapi' | 'robot' | 'jsapi' | 'inbound_s3' | Files.OtherString | null

    /** The most recent use of this combination of interface and protocol and cipher (for this user) */
    updated_at?: Files.DateTimeString | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `updated_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `insecure` and
     * `updated_at`. Valid field combinations are `[ insecure, updated_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `updated_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `updated_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `updated_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `updated_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = UserCipherUse
