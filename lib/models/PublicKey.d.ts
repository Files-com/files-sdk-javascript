import Files = require('../Files')

/** A PublicKey is used to authenticate to Files.com via SFTP (SSH File Transfer Protocol). */
declare class PublicKey {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PublicKey.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PublicKey.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Public key ID */
  readonly id?: number | null

  /** Workspace ID (0 for default workspace). */
  readonly workspace_id?: number | null

  /** Public key title */
  readonly title?: string | null

  /** Public key created at date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Public key expiration date/time */
  readonly expires_at?: Files.DateTimeString | null

  /** Is this public key expired? */
  readonly expired?: boolean | null

  /** Public key fingerprint (MD5) */
  readonly fingerprint?: string | null

  /** Public key fingerprint (SHA256) */
  readonly fingerprint_sha256?: string | null

  /** Only returned when generating keys. Can be invalid, not_generated, generating, complete */
  readonly status?: 'error' | 'not_set' | 'to_be_generated' | 'generating' | 'complete' | Files.OtherString | null

  /** Key's most recent login time via SFTP */
  readonly last_login_at?: Files.DateTimeString | null

  /** Only returned when generating keys. Private key generated for the user. */
  readonly generated_private_key?: string | null

  /** Only returned when generating keys. Public key generated for the user. */
  readonly generated_public_key?: string | null

  /** Username of the user this public key is associated with */
  readonly username?: string | null

  /** User ID this public key is associated with */
  readonly user_id?: number | null

  /** Actual contents of SSH key. */
  readonly public_key?: string

  /** If true, generate a new SSH key pair. Can not be used with `public_key` */
  readonly generate_keypair?: boolean

  /**
   * Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
   */
  readonly generate_private_key_password?: string

  /**
   * Type of key to generate. One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if
   * `generate_keypair` is false.
   */
  readonly generate_algorithm?: string

  /**
   * Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key.
   * Will be ignored if `generate_keypair` is false.
   */
  readonly generate_length?: number

  /** Public key ID */
  getId(): number | null | undefined

  /** Workspace ID (0 for default workspace). */
  getWorkspaceId(): number | null | undefined

  /** Public key title */
  getTitle(): string | null | undefined

  /** Public key created at date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Public key expiration date/time */
  getExpiresAt(): Files.DateTimeString | null | undefined

  /** Is this public key expired? */
  getExpired(): boolean | null | undefined

  /** Public key fingerprint (MD5) */
  getFingerprint(): string | null | undefined

  /** Public key fingerprint (SHA256) */
  getFingerprintSha256(): string | null | undefined

  /** Only returned when generating keys. Can be invalid, not_generated, generating, complete */
  getStatus(): 'error' | 'not_set' | 'to_be_generated' | 'generating' | 'complete' | Files.OtherString | null | undefined

  /** Key's most recent login time via SFTP */
  getLastLoginAt(): Files.DateTimeString | null | undefined

  /** Only returned when generating keys. Private key generated for the user. */
  getGeneratedPrivateKey(): string | null | undefined

  /** Only returned when generating keys. Public key generated for the user. */
  getGeneratedPublicKey(): string | null | undefined

  /** Username of the user this public key is associated with */
  getUsername(): string | null | undefined

  /** User ID this public key is associated with */
  getUserId(): number | null | undefined

  /** Actual contents of SSH key. */
  getPublicKey(): string | undefined

  /** If true, generate a new SSH key pair. Can not be used with `public_key` */
  getGenerateKeypair(): boolean | undefined

  /**
   * Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
   */
  getGeneratePrivateKeyPassword(): string | undefined

  /**
   * Type of key to generate. One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if
   * `generate_keypair` is false.
   */
  getGenerateAlgorithm(): string | undefined

  /**
   * Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key.
   * Will be ignored if `generate_keypair` is false.
   */
  getGenerateLength(): number | undefined

  /** Public key ID */
  setId(value: number): void

  /** Workspace ID (0 for default workspace). */
  setWorkspaceId(value: number): void

  /** Public key title */
  setTitle(value: string): void

  /** Public key expiration date/time */
  setExpiresAt(value: Files.DateTimeString): void

  /** Is this public key expired? */
  setExpired(value: boolean): void

  /** Public key fingerprint (MD5) */
  setFingerprint(value: string): void

  /** Public key fingerprint (SHA256) */
  setFingerprintSha256(value: string): void

  /** Only returned when generating keys. Can be invalid, not_generated, generating, complete */
  setStatus(value: 'error' | 'not_set' | 'to_be_generated' | 'generating' | 'complete' | Files.OtherString): void

  /** Key's most recent login time via SFTP */
  setLastLoginAt(value: Files.DateTimeString): void

  /** Only returned when generating keys. Private key generated for the user. */
  setGeneratedPrivateKey(value: string): void

  /** Only returned when generating keys. Public key generated for the user. */
  setGeneratedPublicKey(value: string): void

  /** Username of the user this public key is associated with */
  setUsername(value: string): void

  /** User ID this public key is associated with */
  setUserId(value: number): void

  /** Actual contents of SSH key. */
  setPublicKey(value: string): void

  /** If true, generate a new SSH key pair. Can not be used with `public_key` */
  setGenerateKeypair(value: boolean): void

  /**
   * Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
   */
  setGeneratePrivateKeyPassword(value: string): void

  /**
   * Type of key to generate. One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if
   * `generate_keypair` is false.
   */
  setGenerateAlgorithm(value: string): void

  /**
   * Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key.
   * Will be ignored if `generate_keypair` is false.
   */
  setGenerateLength(value: number): void

  /** Update Public Key */
  update(params?: PublicKey.UpdateParams): Promise<this>

  /** Delete Public Key */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Public Keys */
  static list(params?: PublicKey.ListParams, options?: Files.RequestOptions): Promise<PublicKey[]>

  /** Alias of `list()`. */
  static all(params?: PublicKey.ListParams, options?: Files.RequestOptions): Promise<PublicKey[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: PublicKey.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<PublicKey>

  /**
   * Show Public Key
   * @param id - Public Key ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<PublicKey>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<PublicKey>

  /** Create Public Key */
  static create(params: PublicKey.CreateParams, options?: Files.RequestOptions): Promise<PublicKey>

  static default: typeof PublicKey
}

declare namespace PublicKey {
  /** The fields of `PublicKey` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Public key ID */
    id?: number | null

    /** Workspace ID (0 for default workspace). */
    workspace_id?: number | null

    /** Public key title */
    title?: string | null

    /** Public key created at date/time */
    created_at?: Files.DateTimeString | null

    /** Public key expiration date/time */
    expires_at?: Files.DateTimeString | null

    /** Is this public key expired? */
    expired?: boolean | null

    /** Public key fingerprint (MD5) */
    fingerprint?: string | null

    /** Public key fingerprint (SHA256) */
    fingerprint_sha256?: string | null

    /** Only returned when generating keys. Can be invalid, not_generated, generating, complete */
    status?: 'error' | 'not_set' | 'to_be_generated' | 'generating' | 'complete' | Files.OtherString | null

    /** Key's most recent login time via SFTP */
    last_login_at?: Files.DateTimeString | null

    /** Only returned when generating keys. Private key generated for the user. */
    generated_private_key?: string | null

    /** Only returned when generating keys. Public key generated for the user. */
    generated_public_key?: string | null

    /** Username of the user this public key is associated with */
    username?: string | null

    /** User ID this public key is associated with */
    user_id?: number | null

    /** Actual contents of SSH key. */
    public_key?: string

    /** If true, generate a new SSH key pair. Can not be used with `public_key` */
    generate_keypair?: boolean

    /**
     * Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
     */
    generate_private_key_password?: string

    /**
     * Type of key to generate. One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if
     * `generate_keypair` is false.
     */
    generate_algorithm?: string

    /**
     * Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key.
     * Will be ignored if `generate_keypair` is false.
     */
    generate_length?: number
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `user_id`, `title` or `created_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`
     * and `workspace_id`. Valid field combinations are `[ workspace_id, created_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Internal reference for key. */
    title: string

    /** Actual contents of SSH key. */
    public_key?: string

    /** If true, generate a new SSH key pair. Can not be used with `public_key` */
    generate_keypair?: boolean

    /**
     * Password for the private key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
     */
    generate_private_key_password?: string

    /**
     * Type of key to generate. One of rsa, dsa, ecdsa, ed25519. Used for the generation of the key. Will be ignored if
     * `generate_keypair` is false.
     */
    generate_algorithm?: string

    /**
     * Length of key to generate. If algorithm is ecdsa, this is the signature size. Used for the generation of the key.
     * Will be ignored if `generate_keypair` is false.
     */
    generate_length?: number
  }

  interface UpdateParams {
    /** Required: when not given, this object's `title` is used. Internal reference for key. */
    title?: string
  }
}

export = PublicKey
