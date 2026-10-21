import Files = require('../Files')

/**
 * A GPGKey object on Files.com is used to securely store both the private and public keys associated with a GPG (GNU
 * Privacy Guard) encryption key pair.
 */
declare class GpgKey {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: GpgKey.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: GpgKey.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** GPG key ID. */
  readonly id?: number | null

  /** Workspace ID (0 for default workspace). */
  readonly workspace_id?: number | null

  /** GPG key expiration date. */
  readonly expires_at?: Files.DateTimeString | null

  /** GPG key name. */
  readonly name?: string | null

  /** Partner ID who owns this GPG Key, if applicable. */
  readonly partner_id?: number | null

  /** Name of the Partner who owns this GPG Key, if applicable. */
  readonly partner_name?: string | null

  /** User ID who owns this GPG Key, if applicable. */
  readonly user_id?: number | null

  /** MD5 hash of the GPG public key */
  readonly public_key_md5?: string | null

  /** MD5 hash of the GPG private key. */
  readonly private_key_md5?: string | null

  /** GPG public key */
  readonly generated_public_key?: string | null

  /** GPG private key. */
  readonly generated_private_key?: string | null

  /** GPG private key password. Only required for password protected keys. */
  readonly private_key_password_md5?: string | null

  /** The GPG public key */
  readonly public_key?: string

  /** The GPG private key */
  readonly private_key?: string

  /** The GPG private key password */
  readonly private_key_password?: string

  /** Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false. */
  readonly generate_expires_at?: Files.DateTimeString

  /** If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key` */
  readonly generate_keypair?: boolean

  /** Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false. */
  readonly generate_full_name?: string

  /**
   * Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
   */
  readonly generate_email?: string

  /** GPG key ID. */
  getId(): number | null | undefined

  /** Workspace ID (0 for default workspace). */
  getWorkspaceId(): number | null | undefined

  /** GPG key expiration date. */
  getExpiresAt(): Files.DateTimeString | null | undefined

  /** GPG key name. */
  getName(): string | null | undefined

  /** Partner ID who owns this GPG Key, if applicable. */
  getPartnerId(): number | null | undefined

  /** Name of the Partner who owns this GPG Key, if applicable. */
  getPartnerName(): string | null | undefined

  /** User ID who owns this GPG Key, if applicable. */
  getUserId(): number | null | undefined

  /** MD5 hash of the GPG public key */
  getPublicKeyMd5(): string | null | undefined

  /** MD5 hash of the GPG private key. */
  getPrivateKeyMd5(): string | null | undefined

  /** GPG public key */
  getGeneratedPublicKey(): string | null | undefined

  /** GPG private key. */
  getGeneratedPrivateKey(): string | null | undefined

  /** GPG private key password. Only required for password protected keys. */
  getPrivateKeyPasswordMd5(): string | null | undefined

  /** The GPG public key */
  getPublicKey(): string | undefined

  /** The GPG private key */
  getPrivateKey(): string | undefined

  /** The GPG private key password */
  getPrivateKeyPassword(): string | undefined

  /** Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false. */
  getGenerateExpiresAt(): Files.DateTimeString | undefined

  /** If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key` */
  getGenerateKeypair(): boolean | undefined

  /** Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false. */
  getGenerateFullName(): string | undefined

  /**
   * Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
   */
  getGenerateEmail(): string | undefined

  /** GPG key ID. */
  setId(value: number): void

  /** Workspace ID (0 for default workspace). */
  setWorkspaceId(value: number): void

  /** GPG key expiration date. */
  setExpiresAt(value: Files.DateTimeString): void

  /** GPG key name. */
  setName(value: string): void

  /** Partner ID who owns this GPG Key, if applicable. */
  setPartnerId(value: number): void

  /** Name of the Partner who owns this GPG Key, if applicable. */
  setPartnerName(value: string): void

  /** User ID who owns this GPG Key, if applicable. */
  setUserId(value: number): void

  /** MD5 hash of the GPG public key */
  setPublicKeyMd5(value: string): void

  /** MD5 hash of the GPG private key. */
  setPrivateKeyMd5(value: string): void

  /** GPG public key */
  setGeneratedPublicKey(value: string): void

  /** GPG private key. */
  setGeneratedPrivateKey(value: string): void

  /** GPG private key password. Only required for password protected keys. */
  setPrivateKeyPasswordMd5(value: string): void

  /** The GPG public key */
  setPublicKey(value: string): void

  /** The GPG private key */
  setPrivateKey(value: string): void

  /** The GPG private key password */
  setPrivateKeyPassword(value: string): void

  /** Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false. */
  setGenerateExpiresAt(value: Files.DateTimeString): void

  /** If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key` */
  setGenerateKeypair(value: boolean): void

  /** Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false. */
  setGenerateFullName(value: string): void

  /**
   * Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
   */
  setGenerateEmail(value: string): void

  /** Update GPG Key */
  update(params?: GpgKey.UpdateParams): Promise<this>

  /** Delete GPG Key */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List GPG Keys */
  static list(params?: GpgKey.ListParams, options?: Files.RequestOptions): Promise<GpgKey[]>

  /** Alias of `list()`. */
  static all(params?: GpgKey.ListParams, options?: Files.RequestOptions): Promise<GpgKey[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: GpgKey.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<GpgKey>

  /**
   * Show GPG Key
   * @param id - Gpg Key ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<GpgKey>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<GpgKey>

  /** Create GPG Key */
  static create(params: GpgKey.CreateParams, options?: Files.RequestOptions): Promise<GpgKey>

  static default: typeof GpgKey
}

declare namespace GpgKey {
  /** The fields of `GpgKey` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** GPG key ID. */
    id?: number | null

    /** Workspace ID (0 for default workspace). */
    workspace_id?: number | null

    /** GPG key expiration date. */
    expires_at?: Files.DateTimeString | null

    /** GPG key name. */
    name?: string | null

    /** Partner ID who owns this GPG Key, if applicable. */
    partner_id?: number | null

    /** Name of the Partner who owns this GPG Key, if applicable. */
    partner_name?: string | null

    /** User ID who owns this GPG Key, if applicable. */
    user_id?: number | null

    /** MD5 hash of the GPG public key */
    public_key_md5?: string | null

    /** MD5 hash of the GPG private key. */
    private_key_md5?: string | null

    /** GPG public key */
    generated_public_key?: string | null

    /** GPG private key. */
    generated_private_key?: string | null

    /** GPG private key password. Only required for password protected keys. */
    private_key_password_md5?: string | null

    /** The GPG public key */
    public_key?: string

    /** The GPG private key */
    private_key?: string

    /** The GPG private key password */
    private_key_password?: string

    /**
     * Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
     */
    generate_expires_at?: Files.DateTimeString

    /** If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key` */
    generate_keypair?: boolean

    /**
     * Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
     */
    generate_full_name?: string

    /**
     * Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is
     * false.
     */
    generate_email?: string
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
     * `name` or `expires_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`,
     * `partner_id` or `expires_at`. Valid field combinations are `[ workspace_id, expires_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `expires_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `expires_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `expires_at`.
     */
    filter_lteq?: Files.JsonObject
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Partner ID who owns this GPG Key, if applicable. */
    partner_id?: number

    /** The GPG public key */
    public_key?: string

    /** The GPG private key */
    private_key?: string

    /** The GPG private key password */
    private_key_password?: string

    /** GPG key name. */
    name: string

    /** Workspace ID (0 for default workspace). */
    workspace_id?: number

    /**
     * Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
     */
    generate_expires_at?: Files.DateTimeString

    /** If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key` */
    generate_keypair?: boolean

    /**
     * Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
     */
    generate_full_name?: string

    /**
     * Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is
     * false.
     */
    generate_email?: string
  }

  interface UpdateParams {
    /** Partner ID who owns this GPG Key, if applicable. */
    partner_id?: number

    /** The GPG public key */
    public_key?: string

    /** The GPG private key */
    private_key?: string

    /** The GPG private key password */
    private_key_password?: string

    /** GPG key name. */
    name?: string
  }
}

export = GpgKey
