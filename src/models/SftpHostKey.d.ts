import Files from '../Files'

/** An SFTP Host Key is a cryptographic key used to verify the identity of the server during an SFTP connection. */
declare class SftpHostKey {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SftpHostKey.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SftpHostKey.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** If true, use this SFTP Host Key. */
  readonly active?: boolean | null

  /** Custom Domain ID. If set, this key is used only for that Custom Domain. */
  readonly custom_domain_id?: number | null

  /** SFTP Host Key ID */
  readonly id?: number | null

  /** The friendly name of this SFTP Host Key. */
  readonly name?: string | null

  /** SSH key type */
  readonly key_type?: string | null

  /** MD5 Fingerprint of the public key */
  readonly fingerprint_md5?: string | null

  /** SHA256 Fingerprint of the public key */
  readonly fingerprint_sha256?: string | null

  /** The private key data. */
  readonly private_key?: string

  /** If true, use this SFTP Host Key. */
  getActive(): boolean | null | undefined

  /** Custom Domain ID. If set, this key is used only for that Custom Domain. */
  getCustomDomainId(): number | null | undefined

  /** SFTP Host Key ID */
  getId(): number | null | undefined

  /** The friendly name of this SFTP Host Key. */
  getName(): string | null | undefined

  /** SSH key type */
  getKeyType(): string | null | undefined

  /** MD5 Fingerprint of the public key */
  getFingerprintMd5(): string | null | undefined

  /** SHA256 Fingerprint of the public key */
  getFingerprintSha256(): string | null | undefined

  /** The private key data. */
  getPrivateKey(): string | undefined

  /** If true, use this SFTP Host Key. */
  setActive(value: boolean): void

  /** Custom Domain ID. If set, this key is used only for that Custom Domain. */
  setCustomDomainId(value: number): void

  /** SFTP Host Key ID */
  setId(value: number): void

  /** The friendly name of this SFTP Host Key. */
  setName(value: string): void

  /** SSH key type */
  setKeyType(value: string): void

  /** MD5 Fingerprint of the public key */
  setFingerprintMd5(value: string): void

  /** SHA256 Fingerprint of the public key */
  setFingerprintSha256(value: string): void

  /** The private key data. */
  setPrivateKey(value: string): void

  /** Update SFTP Host Key */
  update(params?: SftpHostKey.UpdateParams): Promise<this>

  /** Delete SFTP Host Key */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List SFTP Host Keys */
  static list(params?: SftpHostKey.ListParams, options?: Files.RequestOptions): Promise<SftpHostKey[]>

  /** Alias of `list()`. */
  static all(params?: SftpHostKey.ListParams, options?: Files.RequestOptions): Promise<SftpHostKey[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SftpHostKey.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SftpHostKey>

  /**
   * Show SFTP Host Key
   * @param id - Sftp Host Key ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SftpHostKey>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SftpHostKey>

  /** Create SFTP Host Key */
  static create(params?: SftpHostKey.CreateParams, options?: Files.RequestOptions): Promise<SftpHostKey>
}

declare namespace SftpHostKey {
  /** The fields of `SftpHostKey` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** If true, use this SFTP Host Key. */
    active?: boolean | null

    /** Custom Domain ID. If set, this key is used only for that Custom Domain. */
    custom_domain_id?: number | null

    /** SFTP Host Key ID */
    id?: number | null

    /** The friendly name of this SFTP Host Key. */
    name?: string | null

    /** SSH key type */
    key_type?: string | null

    /** MD5 Fingerprint of the public key */
    fingerprint_md5?: string | null

    /** SHA256 Fingerprint of the public key */
    fingerprint_sha256?: string | null

    /** The private key data. */
    private_key?: string
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
    /** If true, use this SFTP Host Key. */
    active?: boolean

    /** Custom Domain ID. If set, this key is used only for that Custom Domain. */
    custom_domain_id?: number

    /** The friendly name of this SFTP Host Key. */
    name?: string

    /** The private key data. */
    private_key?: string
  }

  interface UpdateParams {
    /** If true, use this SFTP Host Key. */
    active?: boolean

    /** Custom Domain ID. If set, this key is used only for that Custom Domain. */
    custom_domain_id?: number

    /** The friendly name of this SFTP Host Key. */
    name?: string

    /** The private key data. */
    private_key?: string
  }
}

export default SftpHostKey
