import Files from '../Files'

/** An AS2Partner is a counterparty of the Files.com site's AS2 connectivity. */
declare class As2Partner {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: As2Partner.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: As2Partner.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** ID of the AS2 Partner. */
  readonly id?: number | null

  /** ID of the Workspace associated with this AS2 Partner. */
  readonly workspace_id?: number | null

  /** ID of the AS2 Station associated with this partner. */
  readonly as2_station_id?: number | null

  /** The partner's formal AS2 name. */
  readonly name?: string | null

  /** Public URI where we will send the AS2 messages (via HTTP/HTTPS). */
  readonly uri?: string | null

  /**
   * Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to
   * Outgoing AS2 message from Files.com to a Partner.)
   */
  readonly server_certificate?: 'require_match' | 'allow_any' | Files.OtherString | null

  /** Username to send to server for HTTP Authentication. */
  readonly http_auth_username?: string | null

  /** Additional HTTP Headers for outgoing message sent to this partner. */
  readonly additional_http_headers?: As2Partner.AdditionalHttpHeaders | null

  /** Default mime type of the file attached to the encrypted message */
  readonly default_mime_type?: string | null

  /**
   * How should Files.com evaluate message transfer success based on a partner's MDN response? This setting does not
   * affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational
   * purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and
   * Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow
   * signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for
   * this setting based on next mdn received.
   */
  readonly mdn_validation_level?: 'none' | 'weak' | 'normal' | 'strict' | 'auto' | Files.OtherString | null

  /**
   * Should Files.com require signatures on incoming AS2 messages? `normal`: require that incoming messages are signed
   * with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting state.
   * The next message received is always accepted and switches this to `normal` if it carries a valid signature, or
   * `none` if it does not.
   */
  readonly signature_validation_level?: 'normal' | 'none' | 'auto' | Files.OtherString | null

  /** If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner. */
  readonly enable_dedicated_ips?: boolean | null

  /** Serial of public certificate used for message security in hex format. */
  readonly hex_public_certificate_serial?: string | null

  /** Public certificate used for message security. */
  readonly public_certificate?: string | null

  /** MD5 hash of public certificate used for message security. */
  readonly public_certificate_md5?: string | null

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

  /** Password to send to server for HTTP Authentication. */
  readonly http_auth_password?: string

  /**
   * Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of
   * public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one
   * certificate.
   */
  readonly pkcs12?: string

  /**
   * Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored as
   * PEM.
   */
  readonly pkcs12_password?: string

  /** ID of the AS2 Partner. */
  getId(): number | null | undefined

  /** ID of the Workspace associated with this AS2 Partner. */
  getWorkspaceId(): number | null | undefined

  /** ID of the AS2 Station associated with this partner. */
  getAs2StationId(): number | null | undefined

  /** The partner's formal AS2 name. */
  getName(): string | null | undefined

  /** Public URI where we will send the AS2 messages (via HTTP/HTTPS). */
  getUri(): string | null | undefined

  /**
   * Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to
   * Outgoing AS2 message from Files.com to a Partner.)
   */
  getServerCertificate(): 'require_match' | 'allow_any' | Files.OtherString | null | undefined

  /** Username to send to server for HTTP Authentication. */
  getHttpAuthUsername(): string | null | undefined

  /** Additional HTTP Headers for outgoing message sent to this partner. */
  getAdditionalHttpHeaders(): As2Partner.AdditionalHttpHeaders | null | undefined

  /** Default mime type of the file attached to the encrypted message */
  getDefaultMimeType(): string | null | undefined

  /**
   * How should Files.com evaluate message transfer success based on a partner's MDN response? This setting does not
   * affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational
   * purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and
   * Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow
   * signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for
   * this setting based on next mdn received.
   */
  getMdnValidationLevel(): 'none' | 'weak' | 'normal' | 'strict' | 'auto' | Files.OtherString | null | undefined

  /**
   * Should Files.com require signatures on incoming AS2 messages? `normal`: require that incoming messages are signed
   * with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting state.
   * The next message received is always accepted and switches this to `normal` if it carries a valid signature, or
   * `none` if it does not.
   */
  getSignatureValidationLevel(): 'normal' | 'none' | 'auto' | Files.OtherString | null | undefined

  /** If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner. */
  getEnableDedicatedIps(): boolean | null | undefined

  /** Serial of public certificate used for message security in hex format. */
  getHexPublicCertificateSerial(): string | null | undefined

  /** Public certificate used for message security. */
  getPublicCertificate(): string | null | undefined

  /** MD5 hash of public certificate used for message security. */
  getPublicCertificateMd5(): string | null | undefined

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

  /** Password to send to server for HTTP Authentication. */
  getHttpAuthPassword(): string | undefined

  /**
   * Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of
   * public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one
   * certificate.
   */
  getPkcs12(): string | undefined

  /**
   * Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored as
   * PEM.
   */
  getPkcs12Password(): string | undefined

  /** ID of the AS2 Partner. */
  setId(value: number): void

  /** ID of the Workspace associated with this AS2 Partner. */
  setWorkspaceId(value: number): void

  /** ID of the AS2 Station associated with this partner. */
  setAs2StationId(value: number): void

  /** The partner's formal AS2 name. */
  setName(value: string): void

  /** Public URI where we will send the AS2 messages (via HTTP/HTTPS). */
  setUri(value: string): void

  /**
   * Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to
   * Outgoing AS2 message from Files.com to a Partner.)
   */
  setServerCertificate(value: 'require_match' | 'allow_any'): void

  /** Username to send to server for HTTP Authentication. */
  setHttpAuthUsername(value: string): void

  /** Additional HTTP Headers for outgoing message sent to this partner. */
  setAdditionalHttpHeaders(value: As2Partner.AdditionalHttpHeaders): void

  /** Default mime type of the file attached to the encrypted message */
  setDefaultMimeType(value: string): void

  /**
   * How should Files.com evaluate message transfer success based on a partner's MDN response? This setting does not
   * affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational
   * purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and
   * Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow
   * signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for
   * this setting based on next mdn received.
   */
  setMdnValidationLevel(value: 'none' | 'weak' | 'normal' | 'strict' | 'auto'): void

  /**
   * Should Files.com require signatures on incoming AS2 messages? `normal`: require that incoming messages are signed
   * with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting state.
   * The next message received is always accepted and switches this to `normal` if it carries a valid signature, or
   * `none` if it does not.
   */
  setSignatureValidationLevel(value: 'normal' | 'none' | 'auto'): void

  /** If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner. */
  setEnableDedicatedIps(value: boolean): void

  /** Serial of public certificate used for message security in hex format. */
  setHexPublicCertificateSerial(value: string): void

  /** Public certificate used for message security. */
  setPublicCertificate(value: string): void

  /** MD5 hash of public certificate used for message security. */
  setPublicCertificateMd5(value: string): void

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

  /** Password to send to server for HTTP Authentication. */
  setHttpAuthPassword(value: string): void

  /**
   * Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of
   * public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one
   * certificate.
   */
  setPkcs12(value: string): void

  /**
   * Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored as
   * PEM.
   */
  setPkcs12Password(value: string): void

  /** Update AS2 Partner */
  update(params?: As2Partner.UpdateParams): Promise<this>

  /** Delete AS2 Partner */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List AS2 Partners */
  static list(params?: As2Partner.ListParams, options?: Files.RequestOptions): Promise<As2Partner[]>

  /** Alias of `list()`. */
  static all(params?: As2Partner.ListParams, options?: Files.RequestOptions): Promise<As2Partner[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: As2Partner.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<As2Partner>

  /**
   * Show AS2 Partner
   * @param id - As2 Partner ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<As2Partner>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<As2Partner>

  /** Create AS2 Partner */
  static create(params: As2Partner.CreateParams, options?: Files.RequestOptions): Promise<As2Partner>
}

declare namespace As2Partner {
  /** The fields of `As2Partner` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** ID of the AS2 Partner. */
    id?: number | null

    /** ID of the Workspace associated with this AS2 Partner. */
    workspace_id?: number | null

    /** ID of the AS2 Station associated with this partner. */
    as2_station_id?: number | null

    /** The partner's formal AS2 name. */
    name?: string | null

    /** Public URI where we will send the AS2 messages (via HTTP/HTTPS). */
    uri?: string | null

    /**
     * Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to
     * Outgoing AS2 message from Files.com to a Partner.)
     */
    server_certificate?: 'require_match' | 'allow_any' | Files.OtherString | null

    /** Username to send to server for HTTP Authentication. */
    http_auth_username?: string | null

    /** Additional HTTP Headers for outgoing message sent to this partner. */
    additional_http_headers?: As2Partner.AdditionalHttpHeaders | null

    /** Default mime type of the file attached to the encrypted message */
    default_mime_type?: string | null

    /**
     * How should Files.com evaluate message transfer success based on a partner's MDN response? This setting does not
     * affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational
     * purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and
     * Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow
     * signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for
     * this setting based on next mdn received.
     */
    mdn_validation_level?: 'none' | 'weak' | 'normal' | 'strict' | 'auto' | Files.OtherString | null

    /**
     * Should Files.com require signatures on incoming AS2 messages? `normal`: require that incoming messages are signed
     * with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting
     * state. The next message received is always accepted and switches this to `normal` if it carries a valid
     * signature, or `none` if it does not.
     */
    signature_validation_level?: 'normal' | 'none' | 'auto' | Files.OtherString | null

    /** If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner. */
    enable_dedicated_ips?: boolean | null

    /** Serial of public certificate used for message security in hex format. */
    hex_public_certificate_serial?: string | null

    /** Public certificate used for message security. */
    public_certificate?: string | null

    /** MD5 hash of public certificate used for message security. */
    public_certificate_md5?: string | null

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

    /** Password to send to server for HTTP Authentication. */
    http_auth_password?: string

    /**
     * Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of
     * public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one
     * certificate.
     */
    pkcs12?: string

    /**
     * Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored
     * as PEM.
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `as2_station_id` or `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `as2_station_id` and `workspace_id`. Valid field combinations are `[ workspace_id, as2_station_id ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner. */
    enable_dedicated_ips?: boolean

    /** Username to send to server for HTTP Authentication. */
    http_auth_username?: string

    /** Password to send to server for HTTP Authentication. */
    http_auth_password?: string

    /**
     * How should Files.com evaluate message transfer success based on a partner's MDN response? This setting does not
     * affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational
     * purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and
     * Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow
     * signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for
     * this setting based on next mdn received.
     */
    mdn_validation_level?: 'none' | 'weak' | 'normal' | 'strict' | 'auto'

    /**
     * Should Files.com require signatures on incoming AS2 messages? `normal`: require that incoming messages are signed
     * with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting
     * state. The next message received is always accepted and switches this to `normal` if it carries a valid
     * signature, or `none` if it does not.
     */
    signature_validation_level?: 'normal' | 'none' | 'auto'

    /**
     * Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to
     * Outgoing AS2 message from Files.com to a Partner.)
     */
    server_certificate?: 'require_match' | 'allow_any'

    /** Default mime type of the file attached to the encrypted message */
    default_mime_type?: string

    /** Additional HTTP Headers for outgoing message sent to this partner. */
    additional_http_headers?: As2Partner.AdditionalHttpHeaders

    /** ID of the AS2 Station associated with this partner. */
    as2_station_id: number

    /** The partner's formal AS2 name. */
    name: string

    /** Public URI where we will send the AS2 messages (via HTTP/HTTPS). */
    uri: string

    /**
     * Public certificate for AS2 Partner. Note: This is the certificate for AS2 message security, not a certificate
     * used for HTTPS authentication.
     */
    public_certificate?: string

    /**
     * Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of
     * public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one
     * certificate.
     */
    pkcs12?: string

    /**
     * Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored
     * as PEM.
     */
    pkcs12_password?: string
  }

  interface UpdateParams {
    /** If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner. */
    enable_dedicated_ips?: boolean

    /** Username to send to server for HTTP Authentication. */
    http_auth_username?: string

    /** Password to send to server for HTTP Authentication. */
    http_auth_password?: string

    /**
     * How should Files.com evaluate message transfer success based on a partner's MDN response? This setting does not
     * affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational
     * purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and
     * Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow
     * signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for
     * this setting based on next mdn received.
     */
    mdn_validation_level?: 'none' | 'weak' | 'normal' | 'strict' | 'auto'

    /**
     * Should Files.com require signatures on incoming AS2 messages? `normal`: require that incoming messages are signed
     * with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting
     * state. The next message received is always accepted and switches this to `normal` if it carries a valid
     * signature, or `none` if it does not.
     */
    signature_validation_level?: 'normal' | 'none' | 'auto'

    /**
     * Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to
     * Outgoing AS2 message from Files.com to a Partner.)
     */
    server_certificate?: 'require_match' | 'allow_any'

    /** Default mime type of the file attached to the encrypted message */
    default_mime_type?: string

    /** Additional HTTP Headers for outgoing message sent to this partner. */
    additional_http_headers?: As2Partner.AdditionalHttpHeaders

    /** The partner's formal AS2 name. */
    name?: string

    /** Public URI where we will send the AS2 messages (via HTTP/HTTPS). */
    uri?: string

    /**
     * Public certificate for AS2 Partner. Note: This is the certificate for AS2 message security, not a certificate
     * used for HTTPS authentication.
     */
    public_certificate?: string

    /**
     * Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of
     * public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one
     * certificate.
     */
    pkcs12?: string

    /**
     * Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored
     * as PEM.
     */
    pkcs12_password?: string
  }

  /** Additional HTTP Headers for outgoing message sent to this partner. */
  type AdditionalHttpHeaders = {
    [key: string]: string
  }
}

export default As2Partner
