import Files from '../Files'

/** A Certificate is a way to store your custom SSL certificate for your Files.com site. */
declare class Certificate {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Certificate.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Certificate.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Certificate ID */
  readonly id?: number | null

  /** Descriptive name of certificate */
  readonly name?: string | null

  /** Custom Domain that owns this certificate, including while the certificate is inactive. */
  readonly custom_domain_id?: number | null

  /** Full text of SSL certificate */
  readonly certificate?: string | null

  /** Certificate created at */
  readonly created_at?: Files.DateTimeString | null

  /** Certificate status. (One of `Request Generated`, `New`, `Active`, `Active/Expired`, `Expired`, or `Available`) */
  readonly display_status?: string | null

  /** Domains on this certificate other than files.com domains */
  readonly domains?: string[] | null

  /** Certificate expiration date/time */
  readonly expires_at?: Files.DateTimeString | null

  /** Is this certificate automatically managed and renewed by Files.com? */
  readonly brick_managed?: boolean | null

  /** Intermediate certificates */
  readonly intermediates?: string | null

  /** A list of IP addresses associated with this SSL Certificate */
  readonly ip_addresses?: string[] | null

  /** X509 issuer */
  readonly issuer?: string | null

  /** Type of key */
  readonly key_type?: string | null

  /** Certificate signing request text */
  readonly request?: string | null

  /** Certificate status (Request Generated, New, Active, Active/Expired, Expired, or Available) */
  readonly status?: string | null

  /** X509 Subject name */
  readonly subject?: string | null

  /** Domain for certificate. */
  readonly certificate_domain?: string

  /** Additional domains for the certificate CSR. */
  readonly certificate_extra_domains?: string[]

  /** Country. */
  readonly certificate_country?: string

  /** State or province. */
  readonly certificate_state_or_province?: string

  /** City or locale. */
  readonly certificate_city_or_locale?: string

  /** Company name. */
  readonly certificate_company_name?: string

  /** Department name or organization unit 1 */
  readonly csr_ou1?: string

  /** Department name or organization unit 2 */
  readonly csr_ou2?: string

  /** Department name or organization unit 3 */
  readonly csr_ou3?: string

  /** Email address for the certificate owner. */
  readonly certificate_email_address?: string

  /** Certificate private key. */
  readonly private_key?: string

  /** Certificate password. */
  readonly password?: string

  /** Certificate ID */
  getId(): number | null | undefined

  /** Descriptive name of certificate */
  getName(): string | null | undefined

  /** Custom Domain that owns this certificate, including while the certificate is inactive. */
  getCustomDomainId(): number | null | undefined

  /** Full text of SSL certificate */
  getCertificate(): string | null | undefined

  /** Certificate created at */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Certificate status. (One of `Request Generated`, `New`, `Active`, `Active/Expired`, `Expired`, or `Available`) */
  getDisplayStatus(): string | null | undefined

  /** Domains on this certificate other than files.com domains */
  getDomains(): string[] | null | undefined

  /** Certificate expiration date/time */
  getExpiresAt(): Files.DateTimeString | null | undefined

  /** Is this certificate automatically managed and renewed by Files.com? */
  getBrickManaged(): boolean | null | undefined

  /** Intermediate certificates */
  getIntermediates(): string | null | undefined

  /** A list of IP addresses associated with this SSL Certificate */
  getIpAddresses(): string[] | null | undefined

  /** X509 issuer */
  getIssuer(): string | null | undefined

  /** Type of key */
  getKeyType(): string | null | undefined

  /** Certificate signing request text */
  getRequest(): string | null | undefined

  /** Certificate status (Request Generated, New, Active, Active/Expired, Expired, or Available) */
  getStatus(): string | null | undefined

  /** X509 Subject name */
  getSubject(): string | null | undefined

  /** Domain for certificate. */
  getCertificateDomain(): string | undefined

  /** Additional domains for the certificate CSR. */
  getCertificateExtraDomains(): string[] | undefined

  /** Country. */
  getCertificateCountry(): string | undefined

  /** State or province. */
  getCertificateStateOrProvince(): string | undefined

  /** City or locale. */
  getCertificateCityOrLocale(): string | undefined

  /** Company name. */
  getCertificateCompanyName(): string | undefined

  /** Department name or organization unit 1 */
  getCsrOu1(): string | undefined

  /** Department name or organization unit 2 */
  getCsrOu2(): string | undefined

  /** Department name or organization unit 3 */
  getCsrOu3(): string | undefined

  /** Email address for the certificate owner. */
  getCertificateEmailAddress(): string | undefined

  /** Certificate private key. */
  getPrivateKey(): string | undefined

  /** Certificate password. */
  getPassword(): string | undefined

  /** Certificate ID */
  setId(value: number): void

  /** Descriptive name of certificate */
  setName(value: string): void

  /** Custom Domain that owns this certificate, including while the certificate is inactive. */
  setCustomDomainId(value: number): void

  /** Full text of SSL certificate */
  setCertificate(value: string): void

  /** Certificate status. (One of `Request Generated`, `New`, `Active`, `Active/Expired`, `Expired`, or `Available`) */
  setDisplayStatus(value: string): void

  /** Domains on this certificate other than files.com domains */
  setDomains(value: string[]): void

  /** Certificate expiration date/time */
  setExpiresAt(value: Files.DateTimeString): void

  /** Is this certificate automatically managed and renewed by Files.com? */
  setBrickManaged(value: boolean): void

  /** Intermediate certificates */
  setIntermediates(value: string): void

  /** A list of IP addresses associated with this SSL Certificate */
  setIpAddresses(value: string[]): void

  /** X509 issuer */
  setIssuer(value: string): void

  /** Type of key */
  setKeyType(value: string): void

  /** Certificate signing request text */
  setRequest(value: string): void

  /** Certificate status (Request Generated, New, Active, Active/Expired, Expired, or Available) */
  setStatus(value: string): void

  /** X509 Subject name */
  setSubject(value: string): void

  /** Domain for certificate. */
  setCertificateDomain(value: string): void

  /** Additional domains for the certificate CSR. */
  setCertificateExtraDomains(value: string[]): void

  /** Country. */
  setCertificateCountry(value: string): void

  /** State or province. */
  setCertificateStateOrProvince(value: string): void

  /** City or locale. */
  setCertificateCityOrLocale(value: string): void

  /** Company name. */
  setCertificateCompanyName(value: string): void

  /** Department name or organization unit 1 */
  setCsrOu1(value: string): void

  /** Department name or organization unit 2 */
  setCsrOu2(value: string): void

  /** Department name or organization unit 3 */
  setCsrOu3(value: string): void

  /** Email address for the certificate owner. */
  setCertificateEmailAddress(value: string): void

  /** Certificate private key. */
  setPrivateKey(value: string): void

  /** Certificate password. */
  setPassword(value: string): void

  /** Activate SSL Certificate */
  activate(params?: Certificate.ActivateParams): Promise<void>

  /** Deactivate SSL Certificate */
  deactivate(params?: Files.NoParams): Promise<void>

  /**
   * Replace this active custom SSL Certificate for the Primary Custom Domain with a Files.com SSL Certificate. The
   * Primary Custom Domain's CNAME record must point at the Site's subdomain. The Files.com certificate is issued and
   * activated in the background
   */
  replaceWithFiles(params?: Files.NoParams): Promise<void>

  /** Update Certificate */
  update(params?: Certificate.UpdateParams): Promise<this>

  /** Delete Certificate */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Certificates */
  static list(params?: Certificate.ListParams, options?: Files.RequestOptions): Promise<Certificate[]>

  /** Alias of `list()`. */
  static all(params?: Certificate.ListParams, options?: Files.RequestOptions): Promise<Certificate[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Certificate.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Certificate>

  /**
   * Show Certificate
   * @param id - Certificate ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Certificate>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Certificate>

  /** Create CSR or import existing SSL Certificate */
  static create(params: Certificate.CreateParams, options?: Files.RequestOptions): Promise<Certificate>
}

declare namespace Certificate {
  /** The fields of `Certificate` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Certificate ID */
    id?: number | null

    /** Descriptive name of certificate */
    name?: string | null

    /** Custom Domain that owns this certificate, including while the certificate is inactive. */
    custom_domain_id?: number | null

    /** Full text of SSL certificate */
    certificate?: string | null

    /** Certificate created at */
    created_at?: Files.DateTimeString | null

    /** Certificate status. (One of `Request Generated`, `New`, `Active`, `Active/Expired`, `Expired`, or `Available`) */
    display_status?: string | null

    /** Domains on this certificate other than files.com domains */
    domains?: string[] | null

    /** Certificate expiration date/time */
    expires_at?: Files.DateTimeString | null

    /** Is this certificate automatically managed and renewed by Files.com? */
    brick_managed?: boolean | null

    /** Intermediate certificates */
    intermediates?: string | null

    /** A list of IP addresses associated with this SSL Certificate */
    ip_addresses?: string[] | null

    /** X509 issuer */
    issuer?: string | null

    /** Type of key */
    key_type?: string | null

    /** Certificate signing request text */
    request?: string | null

    /** Certificate status (Request Generated, New, Active, Active/Expired, Expired, or Available) */
    status?: string | null

    /** X509 Subject name */
    subject?: string | null

    /** Domain for certificate. */
    certificate_domain?: string

    /** Additional domains for the certificate CSR. */
    certificate_extra_domains?: string[]

    /** Country. */
    certificate_country?: string

    /** State or province. */
    certificate_state_or_province?: string

    /** City or locale. */
    certificate_city_or_locale?: string

    /** Company name. */
    certificate_company_name?: string

    /** Department name or organization unit 1 */
    csr_ou1?: string

    /** Department name or organization unit 2 */
    csr_ou2?: string

    /** Department name or organization unit 3 */
    csr_ou3?: string

    /** Email address for the certificate owner. */
    certificate_email_address?: string

    /** Certificate private key. */
    private_key?: string

    /** Certificate password. */
    password?: string
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
    /** Internal name of the SSL certificate. */
    name: string

    /** Domain for certificate. */
    certificate_domain?: string

    /** Additional domains for the certificate CSR. */
    certificate_extra_domains?: string[]

    /** Country. */
    certificate_country?: string

    /** State or province. */
    certificate_state_or_province?: string

    /** City or locale. */
    certificate_city_or_locale?: string

    /** Company name. */
    certificate_company_name?: string

    /** Department name or organization unit 1 */
    csr_ou1?: string

    /** Department name or organization unit 2 */
    csr_ou2?: string

    /** Department name or organization unit 3 */
    csr_ou3?: string

    /** Email address for the certificate owner. */
    certificate_email_address?: string

    /** Any supported key type.  Defaults to `RSA-4096`. */
    key_type?: string

    /** The certificate.  PEM or PKCS7 formats accepted. */
    certificate?: string

    /** Certificate private key. */
    private_key?: string

    /** Certificate password. */
    password?: string

    /** Intermediate certificates.  PEM or PKCS7 formats accepted. */
    intermediates?: string
  }

  interface ActivateParams {
    /**
     * Leave blank or set to `any` to replace any currently active certificate, if applicable. Set to `new_ips` to
     * activate this certificate as an additional certificate on your Site by allocating a new set of Dedicated IPs (may
     * require a Plan upgrade). Set to the ID of a currently active certificate to replace that certificate on its set
     * of dedicated IPs. A certificate belonging to a Custom Domain activates only for that domain: leave blank, use
     * `any`, or specify that domain's current certificate ID.
     */
    replace_cert?: string
  }

  interface UpdateParams {
    /** Internal certificate name. */
    name?: string

    /** Any intermediate certificates.  PEM or PKCS7 formats accepted. */
    intermediates?: string

    /** The certificate.  PEM or PKCS7 formats accepted. */
    certificate?: string
  }
}

export default Certificate
