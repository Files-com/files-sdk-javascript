import Files from '../Files'

/** An AS2Station is a remote AS2 server that can send data into Files.com and receive data from Files.com. */
declare class As2Station {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: As2Station.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: As2Station.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Id of the AS2 Station. */
  readonly id?: number | null

  /** ID of the Workspace associated with this AS2 Station. */
  readonly workspace_id?: number | null

  /** The station's formal AS2 name. */
  readonly name?: string | null

  /** Public URI for sending AS2 message to. */
  readonly uri?: string | null

  /** The station's AS2 domain name. */
  readonly domain?: string | null

  /** Serial of public certificate used for message security in hex format. */
  readonly hex_public_certificate_serial?: string | null

  /** MD5 hash of public certificate used for message security. */
  readonly public_certificate_md5?: string | null

  /** Public certificate used for message security. */
  readonly public_certificate?: string | null

  /** MD5 hash of private key used for message security. */
  readonly private_key_md5?: string | null

  /** Subject of public certificate used for message security. */
  readonly public_certificate_subject?: string | null

  /** Issuer of public certificate used for message security. */
  readonly public_certificate_issuer?: string | null

  /** Serial of public certificate used for message security. */
  readonly public_certificate_serial?: string | null

  /** Not before value of public certificate used for message security. */
  readonly public_certificate_not_before?: string | null

  /** Not after value of public certificate used for message security. */
  readonly public_certificate_not_after?: string | null

  /** MD5 hash of private key password used for message security. */
  readonly private_key_password_md5?: string | null

  /** PEM-encoded private key matching public_certificate. */
  readonly private_key?: string

  /** Password for the PEM-encoded private key. */
  readonly private_key_password?: string

  /**
   * Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this
   * instead of public_certificate and private_key.
   */
  readonly pkcs12?: string

  /**
   * Password for pkcs12. The file and password are used only for import; the extracted certificate and private key are
   * stored as PEM.
   */
  readonly pkcs12_password?: string

  /** Id of the AS2 Station. */
  getId(): number | null | undefined

  /** ID of the Workspace associated with this AS2 Station. */
  getWorkspaceId(): number | null | undefined

  /** The station's formal AS2 name. */
  getName(): string | null | undefined

  /** Public URI for sending AS2 message to. */
  getUri(): string | null | undefined

  /** The station's AS2 domain name. */
  getDomain(): string | null | undefined

  /** Serial of public certificate used for message security in hex format. */
  getHexPublicCertificateSerial(): string | null | undefined

  /** MD5 hash of public certificate used for message security. */
  getPublicCertificateMd5(): string | null | undefined

  /** Public certificate used for message security. */
  getPublicCertificate(): string | null | undefined

  /** MD5 hash of private key used for message security. */
  getPrivateKeyMd5(): string | null | undefined

  /** Subject of public certificate used for message security. */
  getPublicCertificateSubject(): string | null | undefined

  /** Issuer of public certificate used for message security. */
  getPublicCertificateIssuer(): string | null | undefined

  /** Serial of public certificate used for message security. */
  getPublicCertificateSerial(): string | null | undefined

  /** Not before value of public certificate used for message security. */
  getPublicCertificateNotBefore(): string | null | undefined

  /** Not after value of public certificate used for message security. */
  getPublicCertificateNotAfter(): string | null | undefined

  /** MD5 hash of private key password used for message security. */
  getPrivateKeyPasswordMd5(): string | null | undefined

  /** PEM-encoded private key matching public_certificate. */
  getPrivateKey(): string | undefined

  /** Password for the PEM-encoded private key. */
  getPrivateKeyPassword(): string | undefined

  /**
   * Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this
   * instead of public_certificate and private_key.
   */
  getPkcs12(): string | undefined

  /**
   * Password for pkcs12. The file and password are used only for import; the extracted certificate and private key are
   * stored as PEM.
   */
  getPkcs12Password(): string | undefined

  /** Id of the AS2 Station. */
  setId(value: number): void

  /** ID of the Workspace associated with this AS2 Station. */
  setWorkspaceId(value: number): void

  /** The station's formal AS2 name. */
  setName(value: string): void

  /** Public URI for sending AS2 message to. */
  setUri(value: string): void

  /** The station's AS2 domain name. */
  setDomain(value: string): void

  /** Serial of public certificate used for message security in hex format. */
  setHexPublicCertificateSerial(value: string): void

  /** MD5 hash of public certificate used for message security. */
  setPublicCertificateMd5(value: string): void

  /** Public certificate used for message security. */
  setPublicCertificate(value: string): void

  /** MD5 hash of private key used for message security. */
  setPrivateKeyMd5(value: string): void

  /** Subject of public certificate used for message security. */
  setPublicCertificateSubject(value: string): void

  /** Issuer of public certificate used for message security. */
  setPublicCertificateIssuer(value: string): void

  /** Serial of public certificate used for message security. */
  setPublicCertificateSerial(value: string): void

  /** Not before value of public certificate used for message security. */
  setPublicCertificateNotBefore(value: string): void

  /** Not after value of public certificate used for message security. */
  setPublicCertificateNotAfter(value: string): void

  /** MD5 hash of private key password used for message security. */
  setPrivateKeyPasswordMd5(value: string): void

  /** PEM-encoded private key matching public_certificate. */
  setPrivateKey(value: string): void

  /** Password for the PEM-encoded private key. */
  setPrivateKeyPassword(value: string): void

  /**
   * Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this
   * instead of public_certificate and private_key.
   */
  setPkcs12(value: string): void

  /**
   * Password for pkcs12. The file and password are used only for import; the extracted certificate and private key are
   * stored as PEM.
   */
  setPkcs12Password(value: string): void

  /** Update AS2 Station */
  update(params?: As2Station.UpdateParams): Promise<this>

  /** Delete AS2 Station */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List AS2 Stations */
  static list(params?: As2Station.ListParams, options?: Files.RequestOptions): Promise<As2Station[]>

  /** Alias of `list()`. */
  static all(params?: As2Station.ListParams, options?: Files.RequestOptions): Promise<As2Station[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: As2Station.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<As2Station>

  /**
   * Show AS2 Station
   * @param id - As2 Station ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<As2Station>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<As2Station>

  /** Create AS2 Station */
  static create(params: As2Station.CreateParams, options?: Files.RequestOptions): Promise<As2Station>
}

declare namespace As2Station {
  /** The fields of `As2Station` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Id of the AS2 Station. */
    id?: number | null

    /** ID of the Workspace associated with this AS2 Station. */
    workspace_id?: number | null

    /** The station's formal AS2 name. */
    name?: string | null

    /** Public URI for sending AS2 message to. */
    uri?: string | null

    /** The station's AS2 domain name. */
    domain?: string | null

    /** Serial of public certificate used for message security in hex format. */
    hex_public_certificate_serial?: string | null

    /** MD5 hash of public certificate used for message security. */
    public_certificate_md5?: string | null

    /** Public certificate used for message security. */
    public_certificate?: string | null

    /** MD5 hash of private key used for message security. */
    private_key_md5?: string | null

    /** Subject of public certificate used for message security. */
    public_certificate_subject?: string | null

    /** Issuer of public certificate used for message security. */
    public_certificate_issuer?: string | null

    /** Serial of public certificate used for message security. */
    public_certificate_serial?: string | null

    /** Not before value of public certificate used for message security. */
    public_certificate_not_before?: string | null

    /** Not after value of public certificate used for message security. */
    public_certificate_not_after?: string | null

    /** MD5 hash of private key password used for message security. */
    private_key_password_md5?: string | null

    /** PEM-encoded private key matching public_certificate. */
    private_key?: string

    /** Password for the PEM-encoded private key. */
    private_key_password?: string

    /**
     * Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this
     * instead of public_certificate and private_key.
     */
    pkcs12?: string

    /**
     * Password for pkcs12. The file and password are used only for import; the extracted certificate and private key
     * are stored as PEM.
     */
    pkcs12_password?: string
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** The station's formal AS2 name. */
    name: string

    /** ID of the Workspace associated with this AS2 Station. */
    workspace_id?: number

    /** Public certificate used for message security. */
    public_certificate?: string

    /** PEM-encoded private key matching public_certificate. */
    private_key?: string

    /** Password for the PEM-encoded private key. */
    private_key_password?: string

    /**
     * Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this
     * instead of public_certificate and private_key.
     */
    pkcs12?: string

    /**
     * Password for pkcs12. The file and password are used only for import; the extracted certificate and private key
     * are stored as PEM.
     */
    pkcs12_password?: string
  }

  interface UpdateParams {
    /** The station's formal AS2 name. */
    name?: string

    /** Public certificate used for message security. */
    public_certificate?: string

    /** PEM-encoded private key matching public_certificate. */
    private_key?: string

    /** Password for the PEM-encoded private key. */
    private_key_password?: string

    /**
     * Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's replacement certificate and private key.
     * Provide this instead of public_certificate and private_key.
     */
    pkcs12?: string

    /**
     * Password for pkcs12. The file and password are used only for import; the extracted certificate and private key
     * are stored as PEM.
     */
    pkcs12_password?: string
  }
}

export default As2Station
